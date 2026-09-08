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
    version: '1.0.0',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-08',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Lightweight Service Worker updates (under 150KB)',
            'In-app update checker and version viewer in Settings',
            'Corrupted cache auto-recovery and infinite reload protection',
            'Persistent update indicator badges on navigation items'
        ],
        vi: [
            'Cập nhật Service Worker siêu nhẹ (dưới 150KB)',
            'Nút kiểm tra cập nhật và xem phiên bản trong Cài đặt',
            'Tự động khôi phục khi bộ nhớ đệm lỗi và chống lặp tải lại',
            'Huy hiệu chấm báo cập nhật trên thanh điều hướng'
        ],
        ja: [
            '150KB未満の超高速サービスワーカーアップデート',
            '設定画面にアップデート確認ボタンとバージョン表示を追加',
            'キャッシュ破損時の自動復旧と無限リロード防止ガード',
            'ナビゲーションに更新通知ドットバッジを表示'
        ],
        ko: [
            '150KB 미만의 초고속 서비스 워커 업데이트',
            '설정에 업데이트 확인 버튼 및 버전 뷰어 추가',
            '손상된 캐시 자동 복구 및 무한 새로고침 방지',
            '내비게이션에 지속적인 업데이트 알림 점 표시'
        ],
        zh: [
            '低于150KB的极速Service Worker更新',
            '设置中新增检查更新按钮与版本查看',
            '损坏缓存自动恢复与防无限刷新保护',
            '导航栏常驻更新提示圆点徽标'
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
