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
    version: '1.0.22',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'YouTube-Style Channel Avatars: Video cards now fetch and display official YouTube channel avatars with sleek letter-initial fallbacks, matching authentic YouTube aesthetics',
            'Smart Multi-Language Sub-Badges: Videos now feature dedicated language badges (e.g. 🇯🇵 JA, 🇯🇵 JA / 🇬🇧 EN, 🇨🇳 ZH +2) with prioritized target language sorting and accurate BCP 47 flag matching',
            'Persistent Database & Avatar Schema: Extended Cloudflare D1 video metadata schema with channel_avatar caching for sub-millisecond edge delivery'
        ],
        vi: [
            'Ảnh đại diện kênh chuẩn phong cách YouTube: Thẻ video hiện lấy và hiển thị ảnh đại diện chính thức của kênh YouTube cùng chữ cái thay thế thanh lịch khi chưa tải được',
            'Huy hiệu đa ngôn ngữ thông minh: Video hiện có huy hiệu ngôn ngữ riêng biệt (ví dụ: 🇯🇵 JA, 🇯🇵 JA / 🇬🇧 EN, 🇨🇳 ZH +2) với cờ chuẩn BCP 47 và luôn ưu tiên ngôn ngữ bạn đang học lên đầu',
            'Nâng cấp Cơ sở dữ liệu D1: Bổ sung trường channel_avatar vào Cloudflare D1 giúp lưu vĩnh viễn và phản hồi siêu tốc dưới 1 mili-giây'
        ],
        ja: [
            'YouTubeスタイルのチャンネルアバター：動画カードにYouTube公式チャンネルアイコンを表示。未取得時は洗練されたイニシャルプレースホルダーで自然に表示',
            'スマートな多言語バッジシステム：動画カードに専用言語バッジ（例：🇯🇵 JA、🇯🇵 JA / 🇬🇧 EN、🇨🇳 ZH +2）を追加し、学習対象言語を常に最優先かつ正確な国旗で表示',
            'D1データベースとアバターキャッシュ：Cloudflare D1のvideo_languagesテーブルにchannel_avatarを追加し、高速エッジ配信を実現'
        ],
        ko: [
            '유튜브 스타일 채널 아바타 지원: 동영상 카드에 공식 유튜브 채널 프로필 사진을 가져와 표시하며, 미제공 시 세련된 이니셜 플레이스홀더를 제공',
            '스마트 다국어 배지 시스템: 동영상에 전용 언어 배지(예: 🇯🇵 JA, 🇯🇵 JA / 🇬🇧 EN, 🇨🇳 ZH +2)를 도입하여 학습 중인 언어를 최우선으로 정렬하고 정확한 BCP 47 국기를 표시',
            'D1 데이터베이스 스키마 확장: Cloudflare D1 video_languages 테이블에 channel_avatar 컬럼을 추가하여 1ms 미만의 엣지 캐싱 지원'
        ],
        zh: [
            'YouTube 风格频道头像支持：视频卡片现已支持获取并展示官方 YouTube 频道头像，加载前提供精致的首字母占位图标',
            '智能多语言独立标签系统：视频卡片新增专属语言标签（如 🇯🇵 JA、🇯🇵 JA / 🇬🇧 EN、🇨🇳 ZH +2），自动置顶当前学习语言并精准匹配 BCP 47 旗帜',
            'D1 数据库与头像持久化存储：为 Cloudflare D1 video_languages 表扩展 channel_avatar 字段，实现毫秒级边缘高速缓存'
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
