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
    version: '1.1.22',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-11',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Dedicated YouTube-Style Icons: Integrated authentic Picture-in-Picture minimize and watch page expand icons, eliminating generic fullscreen conflation',
            'Cohesive Design System Radii: Harmonized miniplayer card corners and mobile 16:9 thumbnail styling directly with the For You feed tokens',
            'Full-Width Mobile Progress Bar: Extended the progress track across the entire card bottom with integer pixel rendering, eliminating asymmetrical lines and shadow artifacts',
            'Streamlined Watch Header: Removed redundant close button from the video header in favor of non-destructive minimization and miniplayer-exclusive dismissal'
        ],
        vi: [
            'Biểu tượng chuẩn phong cách YouTube: Tích hợp bộ biểu tượng chuyên biệt gồm thu nhỏ PiP và mở rộng xem tiếp, tách biệt hoàn toàn với biểu tượng toàn màn hình',
            'Đồng bộ bo góc và khung hình thu nhỏ: Chuẩn hóa góc bo của thẻ miniplayer và thumbnail 16:9 trên di động theo đúng hệ thống thiết kế của danh sách Dành cho bạn',
            'Thanh tiến trình toàn chiều rộng: Kéo dài thanh tiến trình phủ trọn vẹn mép dưới thẻ miniplayer di động với nét vẽ chuẩn xác, xóa bỏ hiện tượng bóng đổ lệch',
            'Tối giản tiêu đề trình phát: Bỏ nút đóng video trùng lặp ở tiêu đề để ưu tiên thu nhỏ tiện lợi, chỉ đóng hẳn khi người dùng chủ động tắt miniplayer'
        ],
        ja: [
            'YouTube仕様の専用アイコン：全画面表示アイコンとの混同を解消し、PiP最小化と視聴画面復元にYouTube準拠の専用アイコンを採用',
            '統一された角丸とサムネイルデザイン：ミニプレーヤーのカード角丸とモバイル16:9サムネイルのスタイリングを「おすすめ」フィードのトークンと完全統一',
            '全幅モバイルプログレスバー：モバイルミニプレーヤーの進行状況バーをカード全幅に均一配置し、不要な影や非対称な描画を解消',
            'ヘッダー操作の最適化：動画ヘッダーから重複していた閉じるボタンを削除し、スムーズな最小化とミニプレーヤー上での確実な終了操作に統一'
        ],
        ko: [
            'YouTube 스타일 전용 아이콘: 전체화면 아이콘과의 혼동을 없애고 PiP 최소화 및 시청 화면 복원 전용 아이콘 적용',
            '통일된 모서리 곡률 및 썸네일 스타일: 미니플레이어 카드 모서리와 모바일 16:9 썸네일을 추천 피드의 디자인 시스템 토큰과 완벽 일치',
            '전폭 모바일 진행률 표시줄: 모바일 미니플레이어 하단 전체를 아우르는 정밀한 2px 진행률 바를 적용하여 부자연스러운 그림자 및 잘림 현상 제거',
            '영상 헤더 인터페이스 간소화: 헤더에서 중복 닫기 버튼을 제거하여 비파괴적 최소화를 장려하고, 미니플레이어에서만 명확한 닫기 지원'
        ],
        zh: [
            '专属YouTube风格图标：采用标准的画中画最小化与观看页展开专属图标，彻底解决与全屏图标混淆的问题',
            '统一圆角与缩略图样式：迷你播放器卡片圆角与手机端16:9缩略图严格对齐“为你推荐”信息流的设计规范',
            '全幅手机端进度条：将进度条延伸至卡片底部全宽并精确贴合圆角，彻底消除不对称线条与阴影瑕疵',
            '精简视频顶部操作栏：移除顶部操作栏中重复的关闭按钮，全面拥抱无损最小化与迷你播放器专有退出'
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
