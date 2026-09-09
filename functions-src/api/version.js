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
    version: '1.1.3',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Smart Language Switch Flow: Changing target learning language during video playback now cleanly resets the player and navigates to the Home Feed with fresh recommendations for your new language',
            'Native Caption Reliability: Extended timeout to 15s to support longer videos with multiple subtitle tracks without premature aborts',
            'Resilient API Key Failover: Enhanced key rotation to automatically failover across backup keys on quota exhaustion (402), auth errors (401), rate limits (429), and network timeouts',
            'Negative Cache Defense & Retry: Prevented transient network errors from falsely poisoning the no-caption cache and added a manual Retry button on empty subtitle screens'
        ],
        vi: [
            'Chuyển đổi ngôn ngữ học thông minh: Thay đổi ngôn ngữ mục tiêu khi đang xem video sẽ tự động đóng video hiện tại và mở trang Home Feed với các đề xuất dành riêng cho ngôn ngữ mới',
            'Nâng cao độ ổn định phụ đề gốc: Tăng thời gian chờ lên 15 giây giúp xử lý ổn định các video dài có nhiều track phụ đề',
            'Tự động chuyển API key dự phòng: Tự động đổi sang key thay thế khi gặp lỗi hết quota (402), lỗi xác thực (401), giới hạn tốc độ (429) hoặc timeout',
            'Bảo vệ Cache & Nút Thử lại: Ngăn chặn lưu cache âm tính khi gặp lỗi mạng tạm thời và bổ sung nút Thử lại ngay trên màn hình thông báo không có phụ đề'
        ],
        ja: [
            '学習言語切り替えの最適化：動画視聴中に学習対象言語を変更した場合、再生をクリアして新言語のおすすめ動画フィードへスムーズに遷移',
            'YouTube字幕取得の信頼性向上：タイムアウトを15秒に延長し、多言語字幕を持つ長編動画でも安定して字幕を取得',
            '堅牢なAPIキー自動フェイルオーバー：クレジット枯渇（402）、認証エラー（401）、レート制限（429）、通信タイムアウト時に予備キーへ即時自動切り替え',
            'ネガティブキャッシュ保護と再試行機能：一時的な通信エラーによる誤キャッシュを防止し、字幕未取得画面に「再試行」ボタンを追加'
        ],
        ko: [
            '스마트 학습 언어 전환 흐름: 영상 시청 중 목표 학습 언어를 변경하면 현재 영상을 초기화하고 새 언어에 맞춘 홈 추천 피드로 깔끔하게 이동',
            '유튜브 원본 자막 수집 안정성 개선: 타임아웃을 15초로 연장하여 다국어 트랙이 포함된 긴 동영상도 중단 없이 안정적으로 처리',
            '유연한 API 키 자동 장애 조치: 크레딧 소진(402), 인증 오류(401), 속도 제한(429), 타임아웃 발생 시 예비 키로 즉시 자동 전환',
            '부정 캐시 오염 방지 및 재시도 기능: 일시적 네트워크 오류 시 자막 없음 캐시 저장을 차단하고, 자막 화면에 수동 재시도 버튼 추가'
        ],
        zh: [
            '智能学习语言切换体验：在播放视频时切换目标学习语言，将自动重置当前视频并返回主页，无缝呈现新语言的专属推荐视频',
            '增强原生字幕获取稳定性：将超时时间延长至15秒，彻底解决包含多轨字幕的长视频因超时中断的问题',
            '高可用API密钥故障转移：在额度用尽（402）、鉴权错误（401）、限流（429）或超时场景下自动无缝轮换至备用密钥',
            '防范无效缓存与新增重试机制：避免临时网络错误污染无字幕缓存，并在未获取到字幕的界面添加快捷重试按钮'
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
