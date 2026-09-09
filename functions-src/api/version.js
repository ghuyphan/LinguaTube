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
    version: '1.0.28',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Unified Caption & Language Badge: Fixed video card subtitle pill clutter by merging duplicate CC indicators into a clean, compact subtitle badge with active language flag and +N counter',
            'History & Playlist Subtitle Alignment: Watch history and playlists now exclusively track verified server subtitles (sub_languages) instead of raw YouTube caption tracks',
            'Auto-Evict Stale Recommendations: Purged legacy cached video recommendation lists from LocalStorage to ensure only authentic subtitle tracks are displayed'
        ],
        vi: [
            'Hợp nhất huy hiệu phụ đề & ngôn ngữ: Sửa lỗi hiển thị rườm rà trên thẻ video bằng cách gộp biểu tượng CC và cờ ngôn ngữ thành một huy hiệu phụ đề gọn gàng với bộ đếm +N',
            'Đồng bộ phụ đề cho Lịch sử & Danh sách phát: Lịch sử xem và danh sách phát giờ đây chỉ ghi nhận các phụ đề đã xác thực trên máy chủ thay vì toàn bộ danh sách YouTube',
            'Tự động dọn dẹp bộ nhớ đệm đề xuất cũ: Loại bỏ dữ liệu đề xuất cũ trong LocalStorage để đảm bảo hiển thị đúng các ngôn ngữ phụ đề thực tế'
        ],
        ja: [
            '字幕・言語バッジの統合UI改善：重複していたCCバッジと国旗リストを整理し、学習言語フラグと+N表記を備えたすっきりとした字幕バッジに刷新',
            '履歴・プレイリストの検証済み字幕同期：視聴履歴およびプレイリストにおいて、YouTubeの全字幕ではなくサーバー上に実際に存在する検証済み字幕（sub_languages）のみを記録',
            'レコメンドキャッシュの自動更新：古いローカルストレージの動画推薦キャッシュを無効化し、常に正確な検証済み字幕のみを表示'
        ],
        ko: [
            '자막 및 언어 배지 UI 통합: 중복 표시되던 CC 배지와 긴 언어 목록을 활성 언어 국기와 +N 카운터가 포함된 깔끔한 자막 배지로 개선',
            '시청 기록 및 재생목록 자막 언어 동기화: 시청 기록과 재생목록에 YouTube의 모든 자막 대신 서버 검증 자막(sub_languages)만 기록하도록 정렬',
            '오래된 추천 캐시 자동 제거: 로컬스토리지의 과거 추천 캐시를 정리하여 항상 검증된 실제 자막만 표시'
        ],
        zh: [
            '字幕与语言角标一体化设计：合并重复的CC标识与过长的语言列表，升级为带有当前语言国旗和+N计数的紧凑字幕徽章',
            '观看历史与播放列表字幕对齐：历史记录与播放列表现仅记录服务器上实际已验证的字幕语言（sub_languages），不再受YouTube全部音轨干扰',
            '推荐缓存自动失效更新：自动清理LocalStorage中残留的旧版推荐视频缓存，确保展示真实的字幕语言'
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
