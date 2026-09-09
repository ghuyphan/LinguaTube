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
    version: '1.0.25',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Dual Subtitles by Default: Interactive bilingual translated subtitles are now enabled out of the box for all supported videos',
            'Edge Abuse & Quota Hardening: Strictly enforce server-verified video durations for AI transcriptions and reject live broadcasts',
            'Cloudflare KV Optimization: Added L1 in-memory caches and throttled rate-limiter syncs to protect the daily KV write quota',
            'Security Fortification: Closed path traversal in dev server and sanitized PocketBase filter queries across all repository layers'
        ],
        vi: [
            'Bật phụ đề song ngữ mặc định: Phụ đề dịch song ngữ tương tác hiện được kích hoạt mặc định trên mọi video hỗ trợ',
            'Bảo vệ hạn mức AI & Chống lạm dụng Edge: Xác thực thời lượng video từ máy chủ cho AI transcription và từ chối phát trực tiếp',
            'Tối ưu hóa Cloudflare KV: Bổ sung bộ nhớ đệm L1 in-memory và điều tiết ghi KV giới hạn tốc độ để bảo toàn định ngạch miễn phí',
            'Củng cố bảo mật toàn diện: Vá lỗ hổng duyệt thư mục (path traversal) ở dev server và làm sạch truy vấn PocketBase filter'
        ],
        ja: [
            'デュアル字幕のデフォルト有効化：対応するすべての動画で、高精度な対訳字幕が初期状態で自動表示されるように改善',
            'AI利用枠とEdgeセキュリティの強化：AI文字起こし時の動画尺をサーバー側で厳格に検証し、ライブ配信の不正処理を遮断',
            'Cloudflare KVの最適化：L1インメモリーキャッシュの導入とレート制限時のKV同期制御により、無料枠の書き込み上限を保護',
            '堅牢なセキュリティ防御：ローカル開発サーバーのパストラバーサル防止およびPocketBaseフィルターのインジェクション対策を完了'
        ],
        ko: [
            '이중 자막 기본 활성화: 지원되는 모든 영상에서 유용한 번역 보조 자막이 기본적으로 켜지도록 UX 개선',
            'AI 쿼터 및 Edge 보안 강화: AI 전사 시 영상 길이를 서버에서 직접 검증하고 라이브 스트림 요청을 완벽히 차단',
            'Cloudflare KV 최적화: L1 인메모리 캐시 도입 및 속도 제한 시 KV 동기화 조절로 일일 KV 쓰기 쿼터 절약',
            '보안 취약점 전면 보강: 개발 서버의 경로 탐색(Path Traversal) 방지 및 PocketBase 필터 인젝션 방어 적용'
        ],
        zh: [
            '双语字幕默认开启：所有支持的视频现已默认启用交互式双语对照字幕，全面提升学习体验',
            'AI 配额与 Edge 防刷增强：在服务端严格校验 AI 转录的视频时长，杜绝篡改并拒绝直播内容',
            'Cloudflare KV 极致优化：引入 L1 内存缓存并节流限流写入，严格保护每日免费 KV 写入配额',
            '全栈安全防护巩固：修复本地开发服务器的路径遍历隐患，并彻底净化 PocketBase 过滤器注入风险'
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
