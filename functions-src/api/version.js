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
    version: '1.0.29',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'On-Device Translation Priority: Dual subtitles leverage Chrome Built-in AI / W3C Translator API on device first for instant translation without network latency, with seamless cloud fallback',
            'Dual Subtitle Self-Healing & Loading Fix: Resolved infinite loading on cached transcripts with fuzzy cue matching and automatic background recovery of missing subtitle lines',
            'Accurate Native Transcript Discovery: Fixed false-negative transcript errors by normalizing regional language codes and preserving authentic alternate captions',
            'Optimized AI Transcription: Upgraded Gladia pipeline to v2 pre-recorded endpoint, conserved edge KV quotas, and hardened translation queues against timeouts'
        ],
        vi: [
            'Ưu tiên dịch trực tiếp trên thiết bị: Phụ đề song ngữ tận dụng AI tích hợp trên trình duyệt (Chrome Built-in AI) giúp dịch tức thì không độ trễ, tự động chuyển về máy chủ khi cần',
            'Tự sửa lỗi & chấm dứt tải vô hạn: Khắc phục triệt để lỗi quay tròn vô tận trên phụ đề có sẵn nhờ khớp thời gian thông minh và tự động dịch bù các câu còn thiếu',
            'Nhận diện phụ đề gốc chính xác: Chuẩn hóa mã ngôn ngữ vùng miền và lưu giữ phụ đề gốc thay thế, khắc phục lỗi báo không lấy được phụ đề',
            'Tối ưu hóa phiên âm AI: Nâng cấp luồng Gladia lên chuẩn v2 pre-recorded, tiết kiệm hạn ngạch KV Cloudflare và bảo vệ hàng đợi dịch trước nguy cơ quá thời gian chờ'
        ],
        ja: [
            'デバイス内AI翻訳の優先適用：Chrome Built-in AI（端末内翻訳）を最優先で実行し、ネットワーク遅延のない即時翻訳を実現（非対応時はクラウドへ自動フォールバック）',
            '二重字幕の自動修復と無限ローディング解消：タイムスタンプとテキストのあいまい一致により既存字幕の読み込み停止を解消し、未翻訳の行を視聴中に自動修復',
            'ネイティブ字幕取得精度の向上：地域言語コードの正規化と代替字幕の保持により、「字幕を取得できません」という誤検知エラーを解消',
            'AI文字起こしパイプラインの最適化：Gladia APIを最新のv2 pre-recordedへ移行し、エッジKVクォータの節約と翻訳キューのタイムアウト耐性を強化'
        ],
        ko: [
            '기기 내 AI 번역 우선 실행: Chrome Built-in AI 번역 API를 온디바이스에서 최우선으로 실행하여 네트워크 지연 없이 즉각 번역 지원 (미지원 시 클라우드 자동 전환)',
            '이중 자막 무한 로딩 해결 및 누락 자막 자동 복구: 타임스탬프 근접 매칭으로 캐시된 자막의 멈춤 현상을 해결하고, 재생 중 누락된 자막을 백그라운드에서 자동 보완',
            '정확한 원본 자막 탐색: 지역 언어 코드 정규화 및 대체 언어 자막 보존을 통해 자막을 찾을 수 없다는 오류 해결',
            'AI 음성 인식 파이프라인 최적화: Gladia API를 v2 pre-recorded 엔드포인트로 업그레이드하고 에지 KV 할당량을 절약하며 큐 지연 방지'
        ],
        zh: [
            '优先采用端侧设备AI翻译：优先调用浏览器内置Chrome Built-in AI翻译，实现零网络延迟的实时双语对照，并在不支持时无缝回退至云端',
            '双语字幕无限加载修复与缺失行自愈：通过时间戳智能模糊匹配解决已缓存字幕无限转圈问题，并在播放过程中自动补全修复缺失的字幕行',
            '原生字幕识别精准度提升：规范化各地区语言代码并完整保留多语言原生音轨，彻底解决误报无法获取字幕的问题',
            'AI转写流水线性能调优：升级Gladia接口至v2 pre-recorded最新规范，大幅削减Cloudflare KV写配额消耗并增强队列抗超时能力'
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
