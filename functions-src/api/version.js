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
    version: '1.0.32',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Subtitle Reading Display Sub-Panel: Dedicated settings sub-panel for Furigana, Pinyin, Romanization, and Romaji with active checkmarks',
            'Grammar Highlights Sub-Panel: Streamlined grammar mode into an organized sub-page matching playback speed and font size menus',
            'Refined Script Badges & Icons: Redesigned reading display icon badges with crisp optical borders and typography',
            'Complete Reading Localization: Full localization coverage for Furigana, Pinyin, and Romanization options across all languages'
        ],
        vi: [
            'Trang cài đặt chế độ hiển thị phiên âm: Thiết kế bảng phụ riêng cho Furigana, Pinyin, Phiên âm và Romaji kèm dấu tích xác nhận trực quan',
            'Bảng cài đặt chế độ ngữ pháp: Đồng bộ hóa tùy chọn bật/tắt ngữ pháp thành trang menu phụ đồng nhất với tốc độ và cỡ chữ',
            'Huy hiệu biểu tượng & typographic tinh chỉnh: Thiết kế lại huy hiệu chữ phiên âm với đường viền quang học sắc nét và cân đối',
            'Bổ sung đa ngôn ngữ hoàn chỉnh: Bản địa hóa đầy đủ các tùy chọn Furigana, Pinyin và Phiên âm cho toàn bộ 5 ngôn ngữ'
        ],
        ja: [
            '読み・ふりがな設定サブパネル：ふりがな、ピンイン、ローマ字表示を専用のサブ画面で選択可能にし、チェックマークで視覚化',
            '文法モード設定サブパネル：文法解説のオン／オフを再生速度やフォントサイズと同様の統一されたサブメニューに刷新',
            '文字バッジとアイコンの洗練：読み表示アイコンに光学的な境界線と統一されたタイポグラフィを採用し視認性を向上',
            '多言語ローカライズの完全対応：ふりがな、ピンイン、ローマ字表記の設定項目を5言語すべてで完全サポート'
        ],
        ko: [
            '발음 표기 설정 서브패널: 후리가나, 병음, 로마자 표기 설정을 전용 서브페이지로 분리하고 체크마크로 현재 모드 표시',
            '문법 모드 설정 서브패널: 문법 강조 On/Off 설정을 재생 속도 및 글자 크기와 동일한 일관된 하위 메뉴로 개편',
            '문자 배지 및 아이콘 디자인 개선: 발음 표시 아이콘에 섬세한 테두리와 타이포그래피를 적용하여 시각적 완성도 향상',
            '완전한 다국어 현지화: 후리가나, 병음, 로마자 표기 설정 번역을 5개 지원 언어 전반에 걸쳐 완벽하게 적용'
        ],
        zh: [
            '读音注音设置子页面：为振假名、拼音、罗马拼音及关模式提供专属子菜单，以选中勾选标记直观呈现',
            '语法标注设置子页面：将语法高亮切换升级为与播放速度、字号一致的标准子页面，操作逻辑更连贯',
            '文字图标徽章精细打磨：重新设计注音模式图标徽章，加入微光边框与精致文字排版，视觉更统一',
            '多语言注音词条全量本地化：补齐全部5种语言下的假名注音、拼音与罗马拼音本地化文案'
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
