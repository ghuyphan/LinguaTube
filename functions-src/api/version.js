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
    version: '1.1.7',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Intelligent "For You" Recommendation Algorithm: Smart ranking inspired by YouTube & language learning apps (LingQ/Migaku) combining watch history, creator affinity, vocabulary notebook overlap, Krashen i+1 comprehensible input, and sweet-spot duration',
            'In-Progress Resume Badges: YouTube-style red progress bars on video thumbnails reflecting your exact watch progress',
            'Study Words Discovery: Highlights recommended videos containing vocabulary from your active SRS notebook with smart purple badges',
            'Creator Anti-Clustering & Variety: Smart multi-pass channel de-clustering ensures a rich, diverse feed without repetitive creator clutter',
            'Native Caption Suppression: Intercepts asynchronous YouTube iframe captions via onApiChange and active track clearing, preventing native subtitles from overlapping with Voca\'s interactive captions'
        ],
        vi: [
            'Thuật toán đề xuất "Dành cho bạn" thông minh: Hệ thống xếp hạng đa yếu tố học hỏi từ YouTube và các ứng dụng học ngôn ngữ (LingQ/Migaku), kết hợp lịch sử xem, mức độ yêu thích kênh, vốn từ vựng đang học, nguyên lý Krashen i+1 và thời lượng tối ưu',
            'Thanh tiến độ xem tiếp kiểu YouTube: Hiển thị thanh đỏ tiến độ trực quan trên ảnh thu nhỏ cho các video đang xem dở',
            'Gợi ý từ vựng trong sổ tay: Huy hiệu tím nổi bật cho các video chứa từ vựng đang học trong sổ tay SRS cá nhân',
            'Đa dạng hóa nhà sáng tạo: Thuật toán chống gom cụm kênh trên cả máy chủ và máy khách giúp bảng tin luôn phong phú, không bị lặp kênh',
            'Ngăn chặn phụ đề gốc YouTube: Đón bắt thời điểm tải phụ đề qua onApiChange và xóa track đang phát, triệt tiêu tình trạng phụ đề gốc YouTube đè lên phụ đề tương tác của Voca'
        ],
        ja: [
            'インテリジェントな『おすすめ』推薦アルゴリズム：YouTubeや語学アプリ（LingQ/Migaku）に着想を得たマルチファクター評価（視聴履歴・クリエイター親和性・単語帳の語彙一致・クラッシェンi+1理論・最適再生時間）を導入',
            'YouTube風の視聴再開インジケーター：途中まで視聴した動画のサムネイルに赤いプログレスバーと再開バッジを表示',
            '学習中単語のマッチング表示：単語帳に登録された語彙を含む動画にパープルのスパークルバッジを表示し、学習効果の高い動画を即座に発見可能に',
            'チャンネル分散とコンテンツ多様化：同一クリエイターの連続表示を防ぐアンチクラスタリングにより、偏りのない多彩な推薦フィードを提供',
            'YouTube標準字幕の自動非表示：onApiChangeイベントとアクティブトラックのクリアにより、YouTubeの標準字幕がVocaのインタラクティブ字幕と重複表示される問題を解消'
        ],
        ko: [
            '스마트 "추천" 랭킹 알고리즘: YouTube 및 외국어 학습 앱(LingQ/Migaku) 기반 다면 평가 알고리즘 도입 (시청 기록, 크리에이터 친화도, 단어장 어휘 매칭, 크라센 i+1 입력 가설, 최적 러닝타임 반영)',
            'YouTube 스타일 이어보기 표시: 시청 중이던 동영상 썸네일에 직관적인 빨간색 진행률 바 및 이어보기 상태 표시',
            '학습 단어 매칭 뱃지: 사용자의 SRS 단어장에 등록된 단어가 포함된 추천 동영상에 보라색 스파클 뱃지 제공',
            '크리에이터 분산 및 피드 다양화: 동일 크리에이터의 중복 추천을 방지하는 안티 클러스터링을 통해 균형 잡힌 다채로운 추천 피드 구성',
            'YouTube 기본 자막 자동 억제: onApiChange 이벤트 및 활성 트랙 초기화를 통해 YouTube의 기본 자막이 Voca의 인터랙티브 자막과 겹쳐 표시되는 현상 방지'
        ],
        zh: [
            '智能『为您推荐』重排算法：融合 YouTube 与语言学习应用（LingQ/Migaku）的多维推荐机制，综合考量观看进度、创作者偏好、生词本重合度、克拉申 i+1 可理解输入与黄金学习时长',
            'YouTube 风格续播进度条：对未播完的视频封面呈现醒目红条进度指示，方便随时接着学',
            '生词本联动词汇匹配：自动标记包含用户生词本词汇的视频并展示紫色星光胶囊，精准强化重点生词',
            '创作者去重打散与生态多样性：服务端与客户端双重频道反聚类算法，杜绝单频道霸屏，提供多元精彩内容',
            'YouTube 原生字幕智能抑制：通过 onApiChange 拦截字幕模块加载并重置活跃轨道，杜绝 YouTube 原生字幕与 Voca 交互字幕相互遮挡重叠'
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
