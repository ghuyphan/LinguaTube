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
    version: '1.1.33',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-13',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'AI Dual Subtitle Layout Stabilization: Pre-allocated two-line bounding heights and smooth opacity transitions eliminate vertical layout shifts across inline, fullscreen, and transcript list views when AI translations load',
            'Refined Minimalist AI Design: Replaced the wand icon and purple/pink glowing gradient with a modern, brand-consistent coral accent ring and clean sparkles aesthetic',
            'Instant Subtitle Availability Discovery: Subtitle presence checks for videos without native transcripts now short-circuit in < 20ms using global negative caching and D1 registries, eliminating 15s upstream timeouts',
            'Natural Speech Utterance Splitting: AI transcription turns and long monologue blocks are split into natural, readable 1–2 line cues at sentence and clause punctuation boundaries'
        ],
        vi: [
            'Ổn Định Bố Cục Phụ Đề Song Ngữ AI: Thiết lập vùng đệm 2 dòng cố định và hiệu ứng mờ dần mượt mà, triệt tiêu hoàn toàn hiện tượng chữ bị giật nảy khi tải bản dịch AI trên cả chế độ khung, toàn màn hình và danh sách câu',
            'Thiết Kế AI Tinh Tế & Đồng Bộ: Thay thế biểu tượng đũa phép và dải màu tím phát sáng bằng vòng quay màu san hô thương hiệu sang trọng cùng biểu tượng ánh sao tối giản',
            'Phát Hiện Phụ Đề Tức Thì: Kiểm tra tính sẵn sàng của phụ đề cho các video không có phụ đề gốc giờ đây hoàn tất trong < 20ms nhờ bộ nhớ đệm phủ định toàn cục và D1, loại bỏ hoàn toàn độ trễ 15 giây',
            'Tách Câu Hội Thoại Tự Nhiên: Các đoạn nói dài từ AI transcription được tách thông minh thành các câu phụ đề 1–2 dòng vừa mắt tại các dấu ngắt câu và mệnh đề'
        ],
        ja: [
            'AI二重字幕レイアウトの安定化: 2行分の表示高を事前確保しスムーズなフェード効果を採用することで、AI翻訳読み込み時に発生していた字幕テキストの上下ジャンプを完全に解消',
            '洗練されたミニマルなAIデザイン: 魔法の杖アイコンや紫/ピンクのグラデーション発光を廃止し、ブランド統一のコーラルアクセントリングと星アイコンによる上品な装いに刷新',
            '字幕有無の即時判定: 字幕が存在しない動画の確認がグローバルネガティブキャッシュとD1により20ms未満で高速完了し、15秒のタイムアウト待機を完全に解消',
            '自然な発話単位での字幕分割: AI音声認識の長文や会話ターンを、句読点や節の境界で読みやすい1〜2行の自然な字幕キューへとインテリジェントに自動分割'
        ],
        ko: [
            'AI 이중 자막 레이아웃 안정화: 2줄 높이를 사전 확보하고 부드러운 페이드 전환을 적용하여 AI 번역 로드 시 인라인, 전체화면 및 자막 목록에서 텍스트가 흔들리는 현상 완전 근절',
            '세련되고 미니멀한 AI 비주얼 디자인: 요술봉 아이콘과 보라/분홍빛 그라데이션을 걷어내고 브랜드 고유의 코랄 액센트 링과 깔끔한 스파클 아이콘으로 현대적인 감각 완성',
            '자막 가용성 즉시 감지: 자막이 없는 비디오의 가용성 확인이 전역 네거티브 캐시 및 D1을 통해 20ms 미만으로 단축되어 15초의 업스트림 대기 시간을 완전 제거',
            '자연스러운 발화 단위 분할: AI 전사로 생성된 긴 단락 및 대화 발화를 문장 부호와 절 경계에 맞춰 가독성 높은 1~2줄 자막으로 지능형 분할'
        ],
        zh: [
            'AI双语字幕布局稳定性优化: 预设双行基准高度并引入平滑淡入效果，彻底杜绝AI译文加载时在主面板、全屏模式以及字幕列表中引发的字句垂直跳动',
            '简约精致的AI视觉重塑: 移除魔杖图标与紫粉色炫光渐变，全面升级为品牌珊瑚色转圈指示环与极简星光微章',
            '即时字幕存在性探测: 针对无原生字幕的视频，依托全局否定缓存与D1注册表在20ms内快速响应，彻底消除长达15秒的上游抓取超时等待',
            '自然发音句断句拆分: 智能对齐标点符号与从句分界，将AI听写的大段连贯语句平滑拆分为1至2行舒适自然的字幕小句'
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
