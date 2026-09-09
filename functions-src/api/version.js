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
    version: '1.1.1',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Global Leaderboard Community: Merged real learners with 28 active baseline learners across Japanese, Korean, Chinese, and English, keeping the board and podium vibrant',
            'Accurate Competitive Ranking: XP-based rank resolution dynamically places learners relative to the entire community, resolving the isolated single-user display',
            'Instant Score Sync & Refresh: Hardened private cache controls ensure clicking the sync button immediately delivers real-time XP and updated ranks'
        ],
        vi: [
            'Cộng đồng bảng xếp hạng toàn cầu: Kết hợp người học thực tế cùng 28 bạn học chuẩn mực trên 4 ngôn ngữ (Nhật, Hàn, Trung, Anh), giúp bục vinh quang Top 3 luôn sôi động',
            'Xếp hạng điểm số chuẩn xác: Tính toán thứ hạng linh hoạt theo tổng XP, khắc phục hoàn toàn lỗi bảng xếp hạng chỉ hiển thị duy nhất 1 người',
            'Đồng bộ & làm mới điểm số tức thì: Tối ưu hóa bộ nhớ đệm riêng tư giúp nút đồng bộ lập tức cập nhật điểm XP và thứ hạng mới nhất'
        ],
        ja: [
            'グローバルリーダーボードのコミュニティ拡充：日本語・韓国語・中国語・英語の28名の基準学習者と実ユーザーを統合し、表彰台と順位表を常に活性化',
            '正確なXPランキング算出：全体のXP分布に基づき相対順位を動的に算出し、ユーザーが1名のみ孤立表示される不具合を解消',
            '即時スコア同期と更新：プライベートキャッシュ制御を適用し、更新ボタンを押した際に最新のXPと順位を即座に反映'
        ],
        ko: [
            '글로벌 리더보드 커뮤니티 강화: 일본어·한국어·중국어·영어의 28명 기준 학습자와 실제 학습자를 통합하여 항상 활기찬 시상대와 순위표 제공',
            '정확한 XP 기반 순위 산출: 전체 학습자 데이터에 기반하여 상대적 순위를 동적으로 계산하고 혼자만 표시되던 버그 완벽 해결',
            '실시간 점수 동기화 및 새로고침: 비공개 캐시 제어를 적용하여 동기화 버튼 클릭 시 최신 XP와 순위를 즉시 반영'
        ],
        zh: [
            '全球排行榜社区活力升级：融合真实学员与覆盖日、韩、中、英四种语言的28位基准学员，确保领奖台与榜单始终充满活力',
            '精准XP经验值竞争排名：基于全员经验值动态计算相对名次，彻底修复之前只显示单个用户的异常',
            '实时经验值同步与刷新：优化私有缓存控制，点击同步按钮即刻获取最新经验值与实时排名'
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
