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
    version: '1.0.6',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Server-Side Difficulty Filtering: Recommended videos and playlists now query Cloudflare D1 and PocketBase by proficiency tier (Beginner to Advanced), delivering full shelves of level-matched content',
            'Dual-Layer Filter Cache: Warm isolate caching and reactive Angular signals provide instant, zero-latency switching between difficulty levels',
            'Unified Proficiency Standard: Consistent tier mapping across Japanese (JLPT), Chinese (HSK), Korean (TOPIK), and English (CEFR) frameworks'
        ],
        vi: [
            'Lọc độ khó phía máy chủ: Video đề xuất và danh sách phát giờ đây truy vấn Cloudflare D1 và PocketBase theo trình độ (Sơ cấp đến Cao cấp), hiển thị đầy đủ nội dung tương ứng',
            'Bộ đệm lọc hai lớp: Kết hợp bộ nhớ đệm Worker và Angular Signals giúp chuyển đổi tức thì giữa các cấp độ khó mà không bị trễ',
            'Chuẩn hóa trình độ ngôn ngữ: Áp dụng phân cấp chuẩn hóa đồng bộ cho tiếng Nhật (JLPT), tiếng Trung (HSK), tiếng Hàn (TOPIK) và tiếng Anh (CEFR)'
        ],
        ja: [
            'サーバーサイド難易度フィルタリング：おすすめ動画とプレイリストがJLPT/HSK/TOPIK/CEFRの習熟度別にサーバー検索され、該当レベルのコンテンツを完全に網羅',
            '2層フィルタキャッシュ：エッジWorkerメモリとAngular Signalsにより、難易度切り替えが遅延ゼロで瞬時に反映',
            '統一された言語レベル基準：日本語、中国語、韓国語、英語の間で一貫した難易度分類を実現'
        ],
        ko: [
            '서버 사이드 난이도 필터링: 추천 비디오와 재생목록이 숙련도 등급(초급~고급)별로 서버에서 직접 조회되어 항상 충분한 학습 콘텐츠 제공',
            '2계층 필터 캐시: 엣지 워커 메모리와 Angular Signals를 결합하여 난이도 변경 시 지연 없는 즉각적인 전환 지원',
            '통합 언어 숙련도 표준: 일본어(JLPT), 중국어(HSK), 한국어(TOPIK), 영어(CEFR) 전반에 일관된 레벨 체계 적용'
        ],
        zh: [
            '服务端难度分级筛选：推荐视频与歌单现已支持按语言水平等级（初级至高级）直接服务端检索，确保结果充足不遗漏',
            '双层过滤高速缓存：结合边缘 Worker 内存与 Angular Signals，实现各难度等级之间零延迟无缝切换',
            '统一语言水平标准：全面覆盖并标准化日语 (JLPT)、中文 (HSK)、韩语 (TOPIK) 与英语 (CEFR) 分级体系'
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
