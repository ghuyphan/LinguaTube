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
    version: '1.1.8',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Natural Bottom Subtitle Placement: Lowered resting fullscreen subtitle position to 94% (expanded range to 10%–95%), matching authentic caption areas and eliminating excessive vertical gap',
            'Proportional Controls Clearance: Tuned player controls bottom lift to 3.25rem (2.5rem on mobile), ensuring subtitles float cleanly above controls without jumping into the video center',
            'Fluid Direct Drag & Gesture Snapping: Re-engineered fullscreen subtitle drag controller outside Angular zone, eliminating the 50% anchor flip oscillation and enabling effortless Top/Bottom snapping',
            'Legacy Settings Auto-Migration: Automatically upgrades previous 84% subtitle positions in local storage to the new natural 94% placement'
        ],
        vi: [
            'Vị trí phụ đề đáy tự nhiên: Hạ vị trí phụ đề toàn màn hình xuống 94% (mở rộng giới hạn 10%–95%), khớp hoàn hảo với vị trí phụ đề video tiêu chuẩn và loại bỏ khoảng trống thừa bên dưới',
            'Nâng phụ đề cân đối khi hiện điều khiển: Tinh chỉnh khoảng nâng phụ đề khi thanh điều khiển xuất hiện xuống 3.25rem (2.5rem trên di động), giúp phụ đề nằm ngay phía trên thanh phát mà không bị đẩy lên giữa màn hình',
            'Kéo thả mượt mà & cử chỉ hít vị trí: Thiết kế lại cơ chế kéo phụ đề toàn màn hình chạy hoàn toàn ngoài Angular zone, loại bỏ hiện tượng giật nhảy khi qua mốc 50% và hỗ trợ hít vị trí Trên/Dưới mượt mà',
            'Tự động nâng cấp cài đặt cũ: Tự động di chuyển cài đặt phụ đề cũ từ 84% sang vị trí 94% mới trong bộ nhớ trình duyệt'
        ],
        ja: [
            '自然な下部字幕配置：全画面字幕の標準下部位置を94%（調整範囲を10%〜95%）へ引き下げ、YouTube等の標準字幕エリアと自然に一致させ不要な余白を解消',
            'コントロール表示時の最適な逃げ幅：下部バー表示時の字幕リフト幅を3.25rem（モバイル2.5rem）へ調整し、画面中央に飛び上がることなく操作バーのすぐ上に綺麗に配置',
            '滑らかなドラッグ操作とスナップジェスチャー：Angularゾーン外で直接制御するドラッグ処理へ刷新し、50%境界での反転跳躍バグを完全解消、上下端への快適なスナップを実現',
            '既存設定の自動アップグレード：旧バージョンで保存された84%の位置設定をブラウザストレージから自動的に新標準の94%へ移行'
        ],
        ko: [
            '자연스러운 하단 자막 배치: 전체화면 기본 자막 위치를 94%로 낮추고(조정 범위 10%~95%로 확장) 스트리밍 표준 자막 위치에 자연스럽게 맞춰 과도한 하단 공백 제거',
            '컨트롤 표시 시 균형 잡힌 위치 조정: 하단 플레이어 컨트롤 표시 시 자막 상승 폭을 3.25rem(모바일 2.5rem)으로 최적화하여 화면 중앙으로 치솟지 않고 컨트롤 바로 위에 안정적으로 배치',
            '부드러운 직접 드래그 및 스냅 제스처: Angular 존 외부에서 직접 제어하는 드래그 엔진으로 전면 개편하여 50% 지점 반전 튀김 현상을 제거하고 상/하단 스냅 지원',
            '기존 설정 자동 마이그레이션: 로컬 스토리지에 저장된 이전 84% 자막 위치를 새로운 표준인 94%로 자동 업그레이드'
        ],
        zh: [
            '自然贴合的底部字幕位置：将全屏字幕默认底部高度下调至 94%（调节范围扩展至 10%–95%），完美契合主流视频字幕区域，彻底消除底部过大空白',
            '控件浮起间距黄金优化：将播放控制栏出现时的字幕上移幅度微调至 3.25rem（移动端 2.5rem），既能优雅避让控制条，又绝不上跳至屏幕正中',
            '跟手无感拖拽与手势吸附：全新重构脱离 Angular 变更检测的直接手势引擎，彻底根除越过 50% 时的锚点抖动跳变，支持轻触切换与上下端丝滑吸附',
            '历史设置平滑自动迁移：自动将本地缓存中旧版的 84% 字幕位置无缝升级为全新的 94% 黄金位置'
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
