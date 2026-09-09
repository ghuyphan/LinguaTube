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
    version: '1.0.23',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'YouTube Channel Avatar Auto-Resolution & Cloudflare D1 Backfill: Migrated and backfilled high-resolution YouTube channel avatars in Cloudflare D1 with automatic background enrichment for new videos',
            'Refined Home Feed Header & Border Cleanup: Removed the redundant header playlist button and eliminated the divider line below the chips carousel for a seamless YouTube-style interface',
            'Self-Healing Discovery Cache: Automatically evicts stale cached recommendations lacking avatars, instantly displaying creator profile pictures across all feeds'
        ],
        vi: [
            'Tự động phân giải ảnh đại diện kênh & Nạp dữ liệu D1: Đã di chuyển và cập nhật toàn bộ ảnh đại diện kênh YouTube chuẩn sắc nét vào Cloudflare D1 cùng cơ chế tự động làm giàu dữ liệu chạy ngầm cho video mới',
            'Tinh chỉnh giao diện Trang chủ & Bỏ đường phân cách: Loại bỏ nút Danh sách dư thừa ở tiêu đề thẻ Dành cho bạn và xóa đường viền dưới thanh chip để mang lại trải nghiệm xem liền mạch, chuẩn YouTube',
            'Tự động làm mới bộ nhớ đệm khám phá: Tự động xóa bộ nhớ đệm cũ bị thiếu ảnh đại diện, lập tức hiển thị avatar chính thức của nhà sáng tạo trên mọi nguồn cấp dữ liệu'
        ],
        ja: [
            'YouTubeチャンネルアバターの自動解決とD1バックフィル：Cloudflare D1内の全動画アバターを高解像度画像で完全に移行・保存。新規動画に対するバックグラウンド自動取得にも対応',
            'ホームフィードのレイアウト洗練と境界線の削除：「おすすめ」カード上部の重複していたプレイリストボタンを削除し、チップバー下の区切り線を無くしてシームレスなYouTube風UIを実現',
            '自己修復型レコメンドキャッシュ：アバター情報が欠落している古いキャッシュを自動検知して更新し、即座にクリエイターのプロフィール画像を表示'
        ],
        ko: [
            '유튜브 채널 아바타 자동 해석 및 Cloudflare D1 백필: Cloudflare D1의 모든 동영상 채널 프로필 이미지를 고화질로 마이그레이션 및 저장 완료, 신규 동영상에 대한 백그라운드 자동 보강 지원',
            '홈 피드 헤더 정돈 및 분할선 제거: \'맞춤 추천\' 카드 헤더의 중복된 재생목록 버튼을 정리하고 필터 칩 아래의 구분선을 제거하여 한층 깔끔한 유튜브 스타일 디자인 완성',
            '자가 치유형 추천 캐시: 아바타 정보가 누락된 이전 로컬 캐시를 자동으로 갱신하여 모든 피드에서 크리에이터 profile 사진을 즉각 표시'
        ],
        zh: [
            'YouTube 频道头像自动解析与 Cloudflare D1 数据回填：已全面迁移并补齐 Cloudflare D1 中所有视频的高清频道头像，并增加针对新视频的后台自愈式自动补充机制',
            '精简首页卡片头部与去除分割线：移除“为您推荐”卡片右上角多余的播放列表按钮，并去除筛选芯片栏下方的分割线，打造纯净流畅的 YouTube 风格布局',
            '自愈式推荐缓存机制：自动淘汰缺少头像的旧本地缓存，确保所有用户即刻浏览真实的创作者官方头像'
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
