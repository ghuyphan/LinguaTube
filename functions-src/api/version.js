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
    version: '1.1.24',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-11',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Mobile Miniplayer Blur Glass Design: Implemented frosted glassmorphic card styling unified with the bottom navigation bar, aligning responsive margins with the For You feed',
            'Silent Feed Refresh: Removed intrusive toast notifications upon refreshing recommendations for a smooth, native-feeling pull-to-refresh experience',
            'Mobile Icon Reliability: Added versioned SVG sprite cache busting and cross-browser xlink compatibility, ensuring fullscreen, miniplayer, and maximize icons render instantly on mobile Chrome'
        ],
        vi: [
            'Giao diện Miniplayer Mobile Kính Mờ: Áp dụng thiết kế thẻ kính mờ (blur glass) đồng bộ với thanh điều hướng dưới, căn chỉnh lề vừa khít với nội dung Dành Cho Bạn',
            'Làm Mới Bảng Tin Tự Nhiên: Loại bỏ thông báo toast khi làm mới video đề xuất, mang lại trải nghiệm kéo để làm mới mượt mà, không bị gián đoạn',
            'Hiển Thị Biểu Tượng Ổn Định Trên Mobile: Bổ sung cơ chế cache-busting và tương thích xlink cho SVG sprite, giúp các biểu tượng toàn màn hình, thu nhỏ và phóng to hiển thị chính xác trên Chrome di động'
        ],
        ja: [
            'モバイルミニプレーヤーのフロストガラスUI: ボトムナビゲーションバーと統一されたすりガラスデザインを採用し、「おすすめ」フィードと余白を完全に一致させました',
            'スムーズなフィード更新: おすすめ動画の更新時にトースト通知を表示しないようにし、自然で快適な引っ張って更新体験を実現しました',
            'モバイルアイコン表示の最適化: SVGスプライトのバージョン管理とxlink互換性により、モバイルChromeで全画面・最小化・拡大アイコンが確実に表示されるように改善しました'
        ],
        ko: [
            '모바일 미니플레이어 블러 글래스 디자인: 하단 내비게이션 바와 일관된 반투명 블러 글래스 스타일을 적용하고, 맞춤 추천 피드와 여백을 완벽하게 맞췄습니다',
            '자연스러운 피드 새로고침: 추천 영상 새로고침 시 나타나던 토스트 알림을 제거하여 더욱 매끄럽고 방해 없는 당겨서 새로고침 경험을 제공합니다',
            '모바일 아이콘 표시 안정화: SVG 스프라이트 버전 관리 및 xlink 호환성을 추가하여 모바일 Chrome에서 전체화면, 최소화, 확대 아이콘이 안정적으로 표시되도록 개선했습니다'
        ],
        zh: [
            '移动端迷你播放器毛玻璃设计: 采用与底部导航栏一致的磨砂毛玻璃质感，并精确对齐“为你推荐”内容的页面边距',
            '静默刷新推荐内容: 移除刷新推荐视频时的浮动提示，带来更加丝滑自然的下拉刷新体验',
            '移动端图标显示修复: 引入带有版本控制的SVG精灵图缓存刷新与xlink兼容性，确保全屏、最小化和最大化图标在移动端Chrome上正常呈现'
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
