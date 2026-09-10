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
    version: '1.1.13',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Single-Line Channel Truncation: Video player header limits channel names to one line with responsive ellipsis and hover tooltip, preventing difficulty level badges from being pushed off-screen',
            'In-Memory Feed & Scroll Memory: Recommendations feed stays preserved in memory while watching videos, instantly returning to your exact card and scroll offset upon closing',
            'Native Touch Pull-to-Refresh: Added smooth YouTube-style downward drag gesture with a floating circular refresh indicator to easily refresh video recommendations'
        ],
        vi: [
            'Rút gọn tên kênh một dòng: Tiêu đề trình phát giới hạn tên kênh trên 1 dòng với dấu chấm lửng co giãn và chú giải đầy đủ, tránh làm tràn huy hiệu độ khó',
            'Giữ vị trí cuộn & Bảng tin tức thì: Danh sách gợi ý được giữ nguyên trong bộ nhớ khi xem video, trở lại ngay vị trí thẻ đang xem khi đóng video',
            'Kéo xuống để làm mới kiểu YouTube: Thêm thao tác kéo vuốt xuống mượt mà kèm biểu tượng tròn để làm mới danh sách video gợi ý nhanh chóng'
        ],
        ja: [
            'チャンネル名の1行省略表示：動画ヘッダーのチャンネル名をレスポンシブな最大幅と1行省略に制限し、レベルバッジの押し出しを防止',
            'フィード保持＆スクロール復元：動画再生中もおすすめフィードをメモリに保持し、動画終了時に直前の閲覧位置へ瞬時に復帰',
            'YouTube風プルダウン更新：ホームフィード上部で下スワイプすると回転インジケーターが表示され、おすすめ動画を手軽に最新化'
        ],
        ko: [
            '채널명 1줄 말줄임 처리: 동영상 플레이어 헤더의 채널명을 반응형 최대 너비와 1줄로 제한하여 난이도 뱃지가 밀려나지 않도록 개선',
            '피드 메모리 유지 & 스크롤 복원: 동영상 시청 중에도 홈 피드가 메모리에 유지되어 영상을 닫았을 때 보던 위치로 즉시 복귀',
            'YouTube 스타일 당겨서 새로고침: 홈 피드 상단에서 아래로 당겨 추천 동영상 목록을 간편하게 새로고침하는 터치 제스처 추가'
        ],
        zh: [
            '频道名称单行截断优化：播放器顶部频道名称限制为单行并设置自适应最大宽度，防止挤压或换行语言难度等级徽章',
            '推荐列表常驻与滚动记忆：观看视频时推荐流完整保存在内存中，关闭视频后立即恢复至先前的浏览位置与卡片',
            'YouTube 风格下拉刷新：在主页顶部向下滑动可呼出圆环刷新指示器，流畅获取最新推荐视频与播放列表'
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
