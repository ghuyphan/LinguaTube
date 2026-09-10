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
    version: '1.1.20',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'YouTube-Style Infinite Scroll & Card Grid: Standardized History and Playlists to use automatic infinite scrolling with IntersectionObserver sentinels and modern multi-column card grids, identical to the "For You" feed',
            'Theater Mode & Player Sizing: Added an expansive YouTube-style Theater Mode ("T" key) and responsive layout options for distraction-free subtitle immersion',
            'Refined Thumbnail & Card Design: Polished 16:9 thumbnail cards with duration badges, watch progress, and hover play overlays while eliminating top shadow lines',
            'Fluid Skeleton Wave Shimmer: Restored responsive multi-column skeleton wave gradient animations across thumbnails, avatars, and text lines during initial page loads'
        ],
        vi: [
            'Cuộn vô tận & Lưới thẻ kiểu YouTube: Chuẩn hóa Lịch sử và Danh sách phát với tính năng tự động tải tiếp qua IntersectionObserver và lưới thẻ đa cột hiện đại, mượt mà tương tự nguồn cấp "Dành cho bạn"',
            'Chế độ Rạp chiếu phim & Kích thước trình phát: Bổ sung Chế độ Rạp chiếu phim chuẩn YouTube (phím tắt "T") giúp trải nghiệm học phụ đề tập trung và rộng rãi hơn',
            'Thiết kế thẻ & Ảnh thu nhỏ tinh gọn: Tinh chỉnh thẻ ảnh 16:9 với huy hiệu thời lượng, tiến trình xem và lớp phủ phát mượt mà, loại bỏ đường viền bóng thừa',
            'Hiệu ứng Shimmer Skeleton mượt mà: Chuẩn hóa lưới khung xương tải trang với hiệu ứng sóng chuyển động gradient trên cả ảnh đại diện, thumbnail và tiêu đề'
        ],
        ja: [
            'YouTubeスタイルの無限スクロール＆カードグリッド：履歴とプレイリストに「おすすめ」同様のIntersectionObserver無限スクロールと複数カラムカードグリッドを導入し、クリック不要でスムーズな読み込みを実現',
            'シアターモード＆プレイヤー表示切り替え：YouTube風のシアターモード（ショートカットキー "T"）を追加し、字幕学習に集中できるワイド表示に対応',
            '洗練されたサムネイル＆カードデザイン：不要な上部境界線やシャドウを除去し、16:9サムネイル、再生時間バッジ、視聴進捗バー、ホバー再生オーバーレイを最適化',
            '滑らかなスケルトン波形アニメーション：初回読み込み時のスケルトンカードにグラデーション波形アニメーションを適用し、複数カラムグリッドの表示崩れを解消'
        ],
        ko: [
            'YouTube 스타일 무한 스크롤 및 카드 그리드: 시청 기록 및 재생목록에 "맞춤 추천"과 동일한 IntersectionObserver 기반 자동 무한 스크롤을 도입하여 버튼 클릭 없이 매끄럽게 콘텐츠를 탐색',
            '영화관 모드 및 플레이어 확장: 방해 요소 없이 자막 학습에 몰입할 수 있도록 YouTube 스타일 영화관 모드(단축키 "T") 및 반응형 레이아웃 추가',
            '정돈된 썸네일 및 카드 디자인: 상단 그림자/경계선을 제거하고 16:9 썸네일, 재생 시간 배지, 시청 진행률 표시줄, 호버 재생 오버레이 정돈',
            '유려한 스켈레톤 웨이브 애니메이션: 썸네일, 아바타, 텍스트 라인 전반에 반응형 멀티 컬럼 스켈레톤 그라디언트 웨이브 애니메이션 적용'
        ],
        zh: [
            'YouTube风格无限滚动与卡片网格：在历史记录与播放列表页面全面引入与“推荐”一致的IntersectionObserver自动无限加载，无需手动点击即可流畅畅览',
            '影院模式与播放器扩展：新增标准YouTube影院模式（快捷键 "T"），提供全宽沉浸式双语字幕学习体验',
            '精致卡片与缩略图优化：彻底消除顶部突兀的阴影边框，优化16:9缩略图、时长徽章、观看进度条与悬浮播放遮罩',
            '流畅骨架屏波浪动画：修复多列卡片骨架屏布局并注入渐变波浪微光动画，提供更加丝滑的初始加载过渡'
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
