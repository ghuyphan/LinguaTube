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
    version: '1.0.2',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-08',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Introducing Voca Premium: 25 Diamonds capacity, 4-minute regeneration, and AI transcription up to 45 minutes',
            'Redesigned Pro plan at an affordable price (49,000 VND/mo) with 10 Diamonds and 20-minute video limit',
            'Brand-new subscription tier switcher with real-time benefit comparisons in the Upgrade Dialog',
            'Dynamic duration-based Diamond billing and higher rate limit allocations for paid subscribers'
        ],
        vi: [
            'Ra mắt gói Voca Premium: Sức chứa 25 Kim Cương, hồi phục mỗi 4 phút và phiên âm video AI lên tới 45 phút',
            'Gói Voca Pro mới với mức giá tiết kiệm (49.000đ/tháng), 10 Kim Cương và hỗ trợ video tới 20 phút',
            'Giao diện nâng cấp tài khoản hoàn toàn mới, dễ dàng so sánh quyền lợi giữa Pro và Premium',
            'Cơ chế tiêu thụ Kim Cương linh hoạt theo độ dài video cùng giới hạn gọi API mở rộng cho thành viên trả phí'
        ],
        ja: [
            '新プラン「Voca Premium」登場：ダイヤ上限25個、4分回復、最長45分のAI文字起こし対応',
            'より手軽になった新「Voca Pro」プラン（月額49,000 VND）：ダイヤ上限10個、20分動画対応',
            'ProとPremiumの特典をひと目で比較できる刷新されたアップグレード画面',
            '動画の長さに応じたダイヤ消費と、有料会員向けの高レートリミット枠の最適化'
        ],
        ko: [
            '새로운 Voca Premium 출시: 다이아몬드 최대 25개, 4분마다 충전, 최대 45분 AI 영상 자막 생성',
            '합리적인 가격의 새로운 Voca Pro 플랜 (월 49,000 VND): 다이아몬드 10개, 20분 영상 지원',
            'Pro와 Premium 혜택을 한눈에 비교하고 선택할 수 있는 업그레이드 다이얼로그 개편',
            '영상 길이에 맞춘 다이내믹 다이아몬드 차감 및 유료 회원을 위한 확장된 API 처리량 제공'
        ],
        zh: [
            '全新推出 Voca Premium 会员：25颗钻石上限、4分钟极速恢复，支持长达45分钟的AI视频听写',
            '全新轻量 Pro 会员更实惠（月费 49,000 VND）：10颗钻石上限与20分钟视频支持',
            '全新升级窗口，支持一键切换并直观对比 Pro 与 Premium 专属权益',
            '按视频时长动态消耗钻石，并为付费会员提供更高规格的 API 速率配额'
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
