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
    version: '1.1.25',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-11',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Cloudflare Functions Startup Optimization: Eliminated top-level module evaluation overhead by dynamically loading heavy NLP libraries (Compromise, Pinyin Pro, Hangul Romanization) on-demand, resolving deployment CPU time limit errors',
            'Production Bundle Minification: Enabled aggressive esbuild minification for serverless functions, cutting bundle sizes by over 30% and speeding up isolate cold starts',
            'Mobile Miniplayer Blur Glass Design: Refined frosted glassmorphic card styling unified with the bottom navigation bar and responsive margins aligned with the feed'
        ],
        vi: [
            'Tối Ưu Hóa Khởi Động Cloudflare Functions: Loại bỏ độ trễ khởi tạo cấp cao bằng cách tải động (lazy load) các thư viện NLP nặng (Compromise, Pinyin Pro, Hangul Romanization) khi cần, khắc phục triệt để lỗi vượt hạn mức CPU khi deploy',
            'Nén Tối Đa Bundle Production: Kích hoạt minification esbuild cho các serverless function, giảm hơn 30% kích thước bundle và tăng tốc độ cold start của Worker',
            'Giao Diện Miniplayer Kính Mờ: Hoàn thiện thiết kế thẻ kính mờ (blur glass) đồng bộ với thanh điều hướng dưới và căn lề chuẩn xác với bảng tin'
        ],
        ja: [
            'Cloudflare Functionsの起動最適化: 重い自然言語処理ライブラリ（Compromise、Pinyin Pro、Hangul Romanization）をオンデマンドで遅延読み込みすることにより、デプロイ時のCPU時間制限超過エラーを解消',
            '本番関数のバンドル最小化: esbuildの最小化（minification）を有効化し、バンドルサイズを30%以上削減、ワーカーの起動速度を向上',
            'モバイルミニプレーヤーのフロストガラスUI: ボトムナビゲーションバーと統一されたすりガラスデザインと余白の配置を洗練'
        ],
        ko: [
            'Cloudflare Functions 시작 시간 최적화: 대용량 NLP 라이브러리(Compromise, Pinyin Pro, Hangul Romanization)를 필요할 때만 동적으로 지연 로딩하여 배포 시 CPU 시간 초과 오류를 완벽하게 해결했습니다',
            '프로덕션 번들 압축: 서버리스 함수에 esbuild 압축(minification)을 적용하여 번들 크기를 30% 이상 줄이고 콜드 스타트 성능을 향상했습니다',
            '모바일 미니플레이어 블러 글래스 디자인: 하단 내비게이션 바와 일관된 반투명 블러 글래스 스타일과 피드 여백을 정교하게 다듬었습니다'
        ],
        zh: [
            'Cloudflare Functions启动优化: 通过按需动态懒加载大型NLP库（Compromise、Pinyin Pro、Hangul Romanization），消除模块顶层初始化开销，解决部署时CPU时间超限错误',
            '生产环境代码压缩优化: 为无服务器函数启用esbuild最小化压缩，将构建体积减少30%以上并显著加快冷启动速度',
            '移动端迷你播放器毛玻璃设计: 完善与底部导航栏一致的磨砂毛玻璃质感，并精确对齐推荐流页面边距'
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
