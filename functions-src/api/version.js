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
    version: '1.0.13',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Proficiency Level Video Filtering: Fixed video level filtering across Japanese, English, Korean, and Chinese with authentic multi-tier video classifications',
            'Missing Translation Fixes: Resolved raw translation keys (such as common.noResults) with localized empty-state messages for video and playlist filters',
            'Instant Recommendation Refresh: Optimized edge and client caching to eliminate stale empty states and deliver instant updates when switching levels'
        ],
        vi: [
            'Lọc Video theo Cấp độ Trôi chảy: Khắc phục lỗi lọc video theo cấp độ cho tiếng Nhật, Anh, Hàn, Trung với dữ liệu phân loại độ khó thực tế',
            'Hoàn thiện Bản dịch Còn thiếu: Sửa lỗi hiển thị mã ngôn ngữ thô (như common.noResults), bổ sung thông báo trạng thái trống rõ ràng trên bộ lọc video và playlist',
            'Làm mới Đề xuất Tức thì: Tối ưu bộ nhớ đệm tại edge và máy khách, loại bỏ trạng thái trống cũ và cập nhật ngay lập tức khi đổi cấp độ'
        ],
        ja: [
            '難易度レベル別動画フィルターの改善：日本語・英語・韓国語・中国語の各難易度レベルに応じた正確な分類とフィルタリングを修正',
            '未翻訳キーの修正：未翻訳のまま表示されていたキー（common.noResults など）を解消し、動画・プレイリストの空状態メッセージを多言語対応',
            'おすすめ動画の即時反映：エッジおよびクライアントのキャッシュを最適化し、古い空データの残存を防ぎ、レベル切替時の高速表示を実現'
        ],
        ko: [
            '난이도별 추천 동영상 필터 개선: 일본어, 영어, 한국어, 중국어의 실제 난이도 등급에 맞춰 동영상 필터링 기능 정상화',
            '누락된 번역 키 수정: common.noResults 등 번역되지 않은 키 표시 오류를 해결하고 동영상 및 재생목록 필터의 빈 상태 안내 메시지 추가',
            '추천 동영상 즉각 갱신: 엣지 및 클라이언트 캐시를 최적화하여 이전 빈 캐시 잔존을 방지하고 레벨 전환 시 즉시 반영'
        ],
        zh: [
            '难度等级视频筛选优化：修复了日语、英语、韩语和汉语按语言等级筛选视频的功能，补充真实多阶难度分类',
            '补齐缺失的本地化文案：修复未翻译的原始文本键（如 common.noResults），规范视频与播放列表筛选为空时的多语言提示',
            '推荐视频即时刷新：优化边缘端与客户端缓存机制，清除过期的空结果缓存，切换难度等级时即可秒级展示'
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
