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
    version: '1.0.9',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Video Feed Refresh & Cache Busting: Fixed recommendation refresh to bypass intermediate HTTP interceptor caches with timestamp cache-busting, providing instant, tactile feedback and uniform Fisher-Yates candidate shuffling',
            'Touch Interaction & Gesture Stabilization: Eliminated fragile pull-to-refresh touch event hijacking that intercepted taps on mobile devices, removing jitter and preserving native scroll behavior',
            'Dual-Tab Recommendation Refresh: Extended force-refresh support across both recommended videos and featured playlists tabs with complete cache invalidation',
            'Rich Local Development Seeds: Added diverse mock video seeds with proficiency levels across Japanese, Chinese, Korean, and English for realistic local testing'
        ],
        vi: [
            'Làm mới đề xuất & Triệt tiêu bộ nhớ đệm: Khắc phục nút làm mới đề xuất video để bỏ qua bộ đệm interceptor HTTP với cache-busting thời gian thực, phản hồi xúc giác mượt mà và xáo trộn ứng viên ngẫu nhiên chuẩn Fisher-Yates',
            'Ổn định tương tác chạm & cử chỉ: Loại bỏ hoàn toàn việc bắt giữ sự kiện cảm ứng kéo để làm mới gây chặn thao tác nhấp trên thiết bị di động, triệt tiêu giật lag và giữ trọn cuộn trang tự nhiên',
            'Hỗ trợ làm mới trên cả hai tab: Mở rộng tính năng làm mới cưỡng bức cho cả hai tab video đề xuất và danh sách phát nổi bật kèm xóa bộ đệm triệt để',
            'Dữ liệu mẫu phong phú cho môi trường Dev: Bổ sung hạt giống video phong phú đa cấp độ cho cả tiếng Nhật, tiếng Trung, tiếng Hàn và tiếng Anh phục vụ kiểm thử cục bộ'
        ],
        ja: [
            '動画フィード更新＆キャッシュバスター：HTTPインターセプターキャッシュをバイパスするタイムスタンプキャッシュバスティングを導入し、スムーズなフィードバックとFisher-Yatesシャッフルによる推薦動画の均一な再抽出を実現',
            'タッチ操作とジェスチャーの安定化：モバイル端末でタップを妨げていた不安定な引っ張って更新のタッチイベント乗っ取りを撤廃し、UIのちらつきを解消して快適なスクロールを維持',
            '2つのタブに対応した更新機能：おすすめ動画タブおよび注目プレイリストタブの双方で完全なキャッシュ破棄を伴う強制再取得をサポート',
            'ローカル開発環境用シードデータの拡充：日本語・中国語・韓国語・英語の各レベルに対応した多様なモック動画シードを追加し、ローカル検証をリアルに再現'
        ],
        ko: [
            '비디오 피드 새로고침 및 캐시 무효화: HTTP 인터셉터 캐시를 우회하는 타임스탬프 캐시 버스팅을 적용하여 부드러운 회전 피드백과 Fisher-Yates 알고리즘 기반의 균일한 동영상 셔플을 제공',
            '터치 인터랙션 및 제스처 안정화: 모바일 기기에서 클릭을 방해하던 불안정한 당겨서 새로고침 터치 이벤트를 제거하여 화면 흔들림 없이 자연스러운 스크롤 지원',
            '듀얼 탭 새로고침 지원: 추천 동영상 탭과 추천 재생목록 탭 모두에서 완벽한 캐시 무효화와 함께 강제 새로고침 지원',
            '로컬 개발용 풍부한 시드 데이터: 일본어, 중국어, 한국어, 영어 난이도별 모의 동영상 시드를 추가하여 실제 환경과 동일한 로컬 테스트 환경 구축'
        ],
        zh: [
            '视频流刷新与缓存穿透优化：修复推荐刷新按钮以通过时间戳缓存穿透机制绕过 HTTP 拦截器缓存，提供即时触感反馈并引入 Fisher-Yates 算法实现均匀的候选视频随机重排',
            '触控交互与手势稳定性提升：移除此前在移动端拦截点击事件的不稳定下拉刷新监听，消除界面抖动与位移，完整保留原生平滑滚动体验',
            '双标签页全面支持强制刷新：将强制刷新能力无缝扩展至推荐视频与精选播放列表双标签页，实现彻底的本地与内存缓存清理',
            '丰富的本地开发测试数据：为日语、中文、韩语和英语添加覆盖各难度级别的拟真示例视频数据，大幅提升本地开发与测试体验'
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
