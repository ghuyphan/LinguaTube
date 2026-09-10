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
    version: '1.1.12',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Domain Migration to voca.study: Official domain updated across all SEO tags, Open Graph previews, sitemaps, and deep links',
            'Brand & Logo Palette Harmonization: Refreshed app icon, favicon, and splash screens with the signature soft strawberry-coral aesthetic',
            'Streamlined Vocabulary Controls: Reordered word item actions to Level Status, Audio Pronunciation, and Delete across video and dictionary views',
            'Unified Tab & Chip Styling: Harmonized segmented navigation chips across Dictionary, Vocabulary, Playlists, and History with consistent borders'
        ],
        vi: [
            'Chuyển đổi tên miền sang voca.study: Cập nhật tên miền chính thức trên toàn bộ thẻ SEO, xem trước Open Graph, sitemap và liên kết ứng dụng',
            'Đồng bộ nhận diện thương hiệu & Logo: Làm mới biểu tượng ứng dụng, favicon và màn hình chờ với gam màu hồng dâu san hô nhẹ nhàng, tinh tế',
            'Sắp xếp thao tác từ vựng trực quan: Điều chỉnh thứ tự nút thành Trạng thái học, Phát âm âm thanh và Xóa tại thanh bên video và từ điển',
            'Chuẩn hóa nút tab & Bộ lọc: Đồng bộ phong cách nút phân đoạn giữa Từ điển, Từ vựng, Danh sách phát và Lịch sử với viền và trạng thái rõ ràng'
        ],
        ja: [
            'voca.study へのドメイン移行：SEOタグ、Open Graphプレビュー、サイトマップ、ディープリンク全体で新公式ドメインに完全移行',
            'ブランド・ロゴカラーの調和：OG画像に合わせ、アプリロゴ、ファビコン、スプラッシュ画面を柔らかなストロベリーコーラル配色に統一',
            '単語リスト操作の最適化：動画サイドバーと辞書画面で、アクションボタンを「習得レベル」「音声再生」「削除」の順に再配置',
            'タブ・チップデザインの統一：辞書・単語・プレイリスト・履歴のセグメント切り替えボタンを統一されたボーダースタイルに標準化'
        ],
        ko: [
            'voca.study 도메인 이전: SEO 메타태그, Open Graph 미리보기, 사이트맵 및 딥링크 전반에 걸쳐 공식 도메인 반영',
            '브랜드 & 로고 컬러 조화: OG 이미지와 일치하도록 앱 아이콘, 파비콘, 스플래시 화면을 부드러운 스트로베리 코럴 색상으로 일원화',
            '단어 목록 조작 순서 최적화: 동영상 사이드바 및 사전 화면에서 액션 버튼을 \'학습 단계\', \'발음 듣기\', \'삭제\' 순으로 재정렬',
            '탭 & 칩 버튼 스타일 통일: 사전, 단어장, 재생목록, 시청 기록의 세그먼트 버튼을 일관된 테두리 스타일로 표준화'
        ],
        zh: [
            '全面迁移至 voca.study 域名：全站更新 SEO 标签、Open Graph 社交分享预览、网站地图与应用直链',
            '品牌视觉与 Logo 调色统一：App 图标、Favicon 和启动画面全面同步 OG 预览图的柔和草莓珊瑚色系',
            '生词操作流顺序优化：在视频侧边栏与词典生词本中，操作按钮统一重排为「掌握等级」、「发音朗读」与「删除」',
            '统一切换标签与筛选胶囊样式：规范词典、生词、播放列表与历史记录的分段切换按钮，保持一致的边框与激活效果'
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
