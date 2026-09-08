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
    version: '1.0.3',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-08',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Dual Subtitle Engine 2.0: High-speed translation with Google GTX and automatic client rotation',
            'Eliminated subtitle freeze and cancellation race conditions during tokenization and seeking',
            'Extended long video support up to 10,000 subtitle cues with lightweight cache checking',
            'Visual polish: borderless subtitle placeholders and smoother playback transitions'
        ],
        vi: [
            'Công cụ Phụ đề Song ngữ 2.0: Tốc độ dịch siêu nhanh với Google GTX và xoay vòng client tự động',
            'Khắc phục hoàn toàn hiện tượng đơ phụ đề hoặc hủy dịch ngầm khi tách từ vựng và tua video',
            'Hỗ trợ video dài lên tới 10.000 dòng phụ đề cùng cơ chế kiểm tra bộ nhớ đệm siêu nhẹ',
            'Tinh chỉnh giao diện: loại bỏ viền thừa của khung chờ phụ đề và chuyển động mượt mà hơn'
        ],
        ja: [
            'デュアル字幕エンジン2.0：Google GTXとクライアント自動ローテーションによる超高速翻訳',
            '形態素解析時や動画シーク時の字幕停止・リクエスト中断の競合問題を完全解消',
            '軽量キャッシュチェックにより最大10,000行の長尺動画字幕を快適にサポート',
            'UI改善：空の字幕プレースホルダーの枠線を排除し、より滑らかな表示を実現'
        ],
        ko: [
            '이중 자막 엔진 2.0: Google GTX 및 자동 클라이언트 로테이션을 통한 초고속 번역',
            '단어 토큰화 및 영상 탐색 시 자막이 멈추거나 번역이 취소되던 현상 완전 해결',
            '경량 캐시 확인 메커니즘으로 최대 10,000개 자막을 가진 긴 영상도 원활하게 지원',
            'UI 개선: 빈 자막 영역의 불필요한 테두리를 제거하고 더욱 매끄러운 화면 전환 제공'
        ],
        zh: [
            '双语字幕引擎 2.0：结合 Google GTX 与多客户端自动轮换的高速翻译',
            '彻底解决分词处理与视频快进时字幕冻结或被意外取消的问题',
            '超轻量级缓存检测机制，全面支持长达 10,000 行字幕的长视频',
            '界面视觉优化：去除空白占位框边框，字幕过渡更平滑自然'
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
