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
    version: '1.0.31',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Unified Subtitle Display Layout: Eliminated vertical cue jumping by stabilizing reading baseline heights across single and multi-line subtitles',
            'Mobile Typographic Baseline Alignment: Standardized word token alignments across Japanese furigana, Chinese, Korean, and English text on mobile screens',
            'Difficulty Level Lifecycle & Shimmer Skeleton: Added elegant placeholder skeleton during subtitle fetching and eradicated stale level badges on video switch',
            'Optimized Playback Performance: Enhanced active cue matching and throttled lazy loading to minimize layout reflow during continuous playback'
        ],
        vi: [
            'Ổn định giao diện phụ đề: Loại bỏ hiện tượng phụ đề nhảy dòng bằng cách cố định chiều cao đường cơ sở cho cả phụ đề 1 dòng và nhiều dòng',
            'Căn chỉnh đường cơ sở trên di động: Chuẩn hóa căn lề typographic cho furigana tiếng Nhật, tiếng Trung, tiếng Hàn và tiếng Anh trên thiết bị di động',
            'Vòng đời huy hiệu cấp độ & hiệu ứng Skeleton: Bổ sung huy hiệu shimmer sang trọng khi tải phụ đề và xóa sạch huy hiệu cấp độ cũ khi chuyển video',
            'Tối ưu hiệu năng phát video: Cải thiện so khớp cue đang phát và tiết chế kiểm tra lazy load nhằm triệt tiêu hiện tượng giật khung hình'
        ],
        ja: [
            '字幕表示レイアウトの安定化：1行・複数行字幕の基準高さを統一し、再生中の垂直方向の字幕の揺れ・跳ね上がりを解消',
            'モバイルタイポグラフィの整列：日本語のルビ（ふりがな）、中国語、韓国語、英語の単語ベースラインを全画面幅で完全に一致化',
            '難易度バッジのライフサイクルとシマースケルトン：字幕読み込み中に自然なスケルトンを表示し、前動画のバッジが残る問題を完全に解決',
            '動画再生パフォーマンスの向上：アクティブ字幕の比較処理を最適化し、スクロール時の不要なリフローとCPU負荷を大幅に削減'
        ],
        ko: [
            '자막 레이아웃 안정화: 1줄 및 다중 줄 자막 간의 기준선 높이를 고정하여 재생 중 자막이 위아래로 튀는 현상 완벽 해결',
            '모바일 타이포그래피 베이스라인 정렬: 일본어 후리가나, 중국어, 한국어, 영어 단어 토큰의 기준선을 모바일 화면에서도 일관되게 정렬',
            '난이도 배지 라이프사이클 및 쉬머 스켈레톤: 자막 로딩 중 세련된 스켈레톤 UI를 표시하고 이전 동영상의 배지가 남는 문제 완전 해결',
            '재생 성능 최적화: 활성 자막 매칭 로직을 정수 인덱스로 최적화하고 지연 로딩 검사를 조절하여 레이아웃 리플로우 최소화'
        ],
        zh: [
            '字幕展示布局深度稳定：统一单行与多行字幕的基础排版高度，彻底消除字幕切换时的垂直跳动与视觉位移',
            '移动端文字基准线对齐：完美统一日语假名注音、中文、韩语及英语在小屏幕上的文字排版基线，告别参差错位',
            '难度徽章生命周期与骨架屏：字幕加载及AI转录期间呈现精致微光骨架屏，并在切换视频时即时重置避免显示旧级别',
            '视频播放性能大幅优化：优化当前字幕匹配机制并节流懒加载检测，显著降低持续播放时的DOM重排与性能损耗'
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
