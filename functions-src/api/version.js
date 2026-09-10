/**
 * Version & Changelog API (Cloudflare Pages Function)
 * Route: GET /api/version
 * 
 * Provides current server version, minimum supported version for breaking changes,
 * maintenance mode status, and localized "What's New" release highlights.
 * 
 * Optimized for edge execution:
 * - Pre-serialized in-memory JSON (0 runtime serialization cost)
 * - ETag conditional validation (HTTP 304 Not Modified, 0-byte transfer on revalidation)
 * - Sub-millisecond execution with zero external I/O (no D1, KV, or external calls)
 */

import { handleOptions } from '../utils/utils.js';

const APP_VERSION_DATA = {
    version: '1.1.17',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Tablet & Responsive Layout Polish: Collapsed multi-column layouts into comfortable full-width feeds on tablet screens (<=1024px), preventing sidebar squeeze',
            'Header & Toolbar Anti-Collision: Prevented badge overlap on panel titles and enabled flexible wrapping for search bars, action buttons, and filter chips',
            'Enhanced Video Card Readability: Expanded video title display in the resume banner and removed dead/duplicate CSS rules across panels'
        ],
        vi: [
            'Tối ưu giao diện máy tính bảng: Thu gọn bố cục nhiều cột thành dạng danh sách toàn chiều rộng tối ưu trên tablet (<=1024px), chống ép hẹp nội dung',
            'Chống đè chữ tiêu đề & thanh công cụ: Khắc phục hiện tượng huy hiệu đè lên tiêu đề thẻ, hỗ trợ thanh tìm kiếm và bộ lọc tự động xuống dòng linh hoạt',
            'Cải thiện hiển thị thẻ video: Mở rộng không gian hiển thị tiêu đề video đang xem dở và loại bỏ các đoạn mã CSS trùng lặp'
        ],
        ja: [
            'タブレット表示＆レスポンシブ最適化：タブレット端末（<=1024px）で複数列レイアウトを快適な全幅表示に統合し、サイドバーによる圧迫を解消',
            'ヘッダー＆ツールバーの重なり防止：パネルタイトルのバッジ衝突を防ぎ、検索バーやフィルターボタンが柔軟に折り返されるよう改善',
            '動画カード視認性の向上：視聴再開バナーのタイトル表示行数を拡張し、各パネルの重複CSSコードを整理・最適化'
        ],
        ko: [
            '태블릿 반응형 레이아웃 최적화: 태블릿 화면(<=1024px)에서 다중 열을 쾌적한 전체 너비 피드로 자동 전환하여 사이드바 압박 현상 해결',
            '헤더 및 툴바 겹침 방지: 패널 제목과 배지의 겹침을 방지하고, 검색창 및 필터 칩이 부드럽게 줄바꿈되도록 유연성 향상',
            '동영상 카드 가독성 개선: 이어보기 배너의 동영상 제목 표시를 2줄로 확대하고 중복 CSS 스타일을 말끔히 정리'
        ],
        zh: [
            '平板端与响应式布局优化：针对平板屏幕（<=1024px）自动收起次级侧边栏并转为舒适的全宽单列，消除内容挤压变形',
            '标题与工具栏防重叠改进：修复状态徽章覆盖面板标题的问题，支持搜索框、操作按钮和筛选芯片自适应换行',
            '视频卡片可读性提升：拓展继续观看横幅中的标题展示空间，并全面精简剔除各面板中的冗余重复 CSS 样式'
        ]
    }
};

// In-memory isolate state with 60-second KV check interval
let currentVersionData = APP_VERSION_DATA;
let currentJsonString = JSON.stringify(APP_VERSION_DATA);
let currentEtag = `"${APP_VERSION_DATA.version}-${APP_VERSION_DATA.buildDate}"`;
let lastKvCheckTime = 0;
const KV_CHECK_INTERVAL_MS = 60_000; // 60s warm isolate TTL to conserve KV reads

export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request, env } = context;

    // Check Cloudflare KV for dynamic operational overrides (maintenance, force update, or emergency patch)
    const kv = env?.TRANSCRIPT_CACHE;
    const now = Date.now();
    if (kv && (now - lastKvCheckTime > KV_CHECK_INTERVAL_MS)) {
        lastKvCheckTime = now;
        try {
            const override = await kv.get('app_version_override', 'json');
            if (override && typeof override === 'object') {
                currentVersionData = {
                    ...APP_VERSION_DATA,
                    ...override,
                    highlights: {
                        ...APP_VERSION_DATA.highlights,
                        ...(override.highlights || {})
                    }
                };
                currentJsonString = JSON.stringify(currentVersionData);
                const versionTag = currentVersionData.version || APP_VERSION_DATA.version;
                const dateTag = override.updatedAt || currentVersionData.buildDate;
                currentEtag = `"${versionTag}-${dateTag}"`;
            } else if (currentVersionData !== APP_VERSION_DATA) {
                // Override removed from KV: revert cleanly to compiled release info
                currentVersionData = APP_VERSION_DATA;
                currentJsonString = JSON.stringify(APP_VERSION_DATA);
                currentEtag = `"${APP_VERSION_DATA.version}-${APP_VERSION_DATA.buildDate}"`;
            }
        } catch (err) {
            console.warn('[VersionAPI] Failed to read app_version_override from KV:', err);
        }
    }

    // Fast-path: HTTP 304 Not Modified if client's cached ETag matches
    const ifNoneMatch = request?.headers?.get('if-none-match');
    if (ifNoneMatch && (ifNoneMatch === currentEtag || ifNoneMatch === `W/${currentEtag}`)) {
        return new Response(null, {
            status: 304,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, must-revalidate',
                'ETag': currentEtag
            }
        });
    }

    return new Response(currentJsonString, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Cache-Control': 'no-cache, must-revalidate',
            'ETag': currentEtag,
            'Vary': 'Accept-Encoding'
        }
    });
}
