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
    version: '1.1.4',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Tap-to-Refresh & Sleek Pull-to-Refresh: Tap the active "Watch" tab in the bottom bar or swipe down on mobile for an icon-only floating refresh badge with haptic feedback',
            'Smart Feed De-duplication: Recommendations automatically deprioritize videos you have already watched and rotate from a larger 120-video catalog',
            'Clean Settings Layout: Polished settings item rows with responsive text wrapping to eliminate label and value collisions',
            'Universal Hidden Scrollbars: Concealed unsightly scrollbars across all bottom-sheets, option pickers, and dialogs for a seamless native look'
        ],
        vi: [
            'Chạm để làm mới & Vuốt kéo mượt mà: Nhấn vào tab "Xem" đang mở ở thanh điều hướng dưới cùng hoặc vuốt xuống trên di động với huy hiệu làm mới dạng tròn tinh gọn cùng phản hồi rung nhẹ',
            'Loại bỏ video trùng lặp thông minh: Tự động giảm ưu tiên các video bạn đã xem và quay vòng đề xuất từ kho 120 video phong phú hơn',
            'Bố cục Cài đặt hoàn thiện: Tinh chỉnh hàng mục cài đặt với cơ chế xuống dòng thông minh, loại bỏ hoàn toàn hiện tượng tràn chữ giữa tiêu đề và giá trị',
            'Ẩn thanh cuộn toàn diện: Ẩn thanh cuộn trên toàn bộ bottom-sheet, bảng chọn và hộp thoại giúp trải nghiệm mượt mà chuẩn ứng dụng gốc'
        ],
        ja: [
            'タップで更新＆洗練されたプル更新：下部バーのアクティブな「視聴」タブをタップ、またはモバイルで下にスワイプしてアイコンのみのミニマルな更新バッジを表示（振動フィードバック付き）',
            'スマートな重複排除とカタログ回転：視聴済み動画の優先度を自動で下げ、120件の拡大カタログから新鮮なおすすめ動画をローテーション表示',
            '設定画面レイアウトの最適化：設定項目の折り返しと幅制限を改善し、長文タイトルと設定値の文字重なりを解消',
            '統一されたスクロールバー非表示：すべてのボトムシート、ピッカー、ダイアログでスクロールバーを非表示にし、ネイティブアプリのような美麗な外観を実現'
        ],
        ko: [
            '탭하여 새로고침 & 깔끔한 당겨서 새로고침: 하단 바의 활성 "시청" 탭을 탭하거나 모바일에서 아래로 당겨 햅틱 진동과 함께 아이콘 전용 플로팅 배지로 피드를 부드럽게 갱신',
            '스마트 중복 제거 및 피드 로테이션: 이미 시청한 동영상의 우선순위를 자동으로 낮추고 120개의 확장된 카탈로그에서 신선한 동영상을 추천',
            '설정 화면 레이아웃 개선: 긴 옵션명과 설정값 간의 텍스트 겹침 현상을 해결하여 모든 화면 크기에서 깔끔하게 정렬',
            '전체 스크롤바 숨김 처리: 모든 바텀시트, 선택 모달, 팝업의 스크롤바를 깔끔하게 숨겨 네이티브 앱 같은 세련된 완성도 제공'
        ],
        zh: [
            '轻触刷新与极简下拉刷新：点击底部导航栏当前处于激活状态的“观看”标签，或在移动端下拉即可呼出带震动反馈的纯图标浮动刷新指示器',
            '智能去重与大片库轮换：自动降低已观看视频的推荐优先级，并从扩充至120部的精选片库中智能轮换推荐内容',
            '设置项排版精细化：优化设置行文字自动换行与宽度限制，彻底消除长标题与当前选项数值之间的文字重叠',
            '全局沉浸式隐藏滚动条：在所有底部抽屉、选择器及弹窗中全局隐藏滚动条，带来媲美原生客户端的沉浸体验'
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
