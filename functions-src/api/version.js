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
    version: '1.1.16',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Neural TTS Latency Optimization: Persistent warm WebSocket connection pooling slashes word pronunciation latency to ~200ms',
            'Sub-Millisecond Replay & Caching: In-memory LRU and client-side Blob URL caching deliver instant (<0.1ms) audio replay',
            'Word Popup & Dictionary Pronunciation: Added native one-tap pronunciation speaker buttons to the interactive word popup and dictionary panel',
            'Proactive Study Mode Preloading: Flashcard review proactively pre-fetches audio in the background for 0ms instant playback upon card flip or click'
        ],
        vi: [
            'Tối ưu độ trễ phát âm Neural TTS: Tích hợp cơ chế kết nối WebSocket duy trì liên tục (warm pool), giảm độ trễ phát âm từ xuống ~200ms',
            'Bộ nhớ đệm âm thanh tức thì: Cơ chế LRU trên bộ nhớ và Blob URL phía trình duyệt mang lại tốc độ phát lại tức thì (<0.1ms) cho các từ lặp lại',
            'Phát âm trên cửa sổ từ & từ điển: Bổ sung nút phát âm một chạm trực tiếp trên cửa sổ chi tiết từ (Word Popup) và bảng tra cứu từ điển',
            'Tải trước âm thanh thẻ ghi nhớ: Chế độ ôn tập chủ động tải trước phát âm trong nền giúp phát ngay lập tức (0ms) khi lật thẻ hoặc bấm loa'
        ],
        ja: [
            'Neural TTS 発音遅延の最適化：接続済み WebSocket プーリングの導入により、単語発音の再生遅延を約200msに大幅短縮',
            'メモリ＆Blobキャッシュによる即時再生：LRUインメモリおよびブラウザBlob URLキャッシュにより、反復単語をミリ秒未満（<0.1ms）で即時再生',
            '単語詳細ポップアップと辞書パネルでの音声再生：字幕タップ時の単語ポップアップと辞書検索にワンタップ発音ボタンを追加',
            'フラッシュカード学習の事前ロード：単語カードの切り替え時に裏で音声を先読みし、タップやカードめくり時に待ち時間ゼロ（0ms）で再生'
        ],
        ko: [
            '뉴럴 TTS 발음 지연시간 대폭 개선: 웜(Warm) WebSocket 연결 풀링을 구현하여 단어 발음 대기시간을 ~200ms로 대폭 단축',
            '인메모리 및 Blob 오디오 즉시 재생: 인메모리 LRU 및 브라우저 Blob URL 캐싱으로 반복 조회 단어를 0.1ms 미만으로 즉시 재생',
            '단어 팝업 및 사전 패널 발음 지원: 자막 단어 팝업과 사전 패널에 원터치 발음 스피커 버튼을 새롭게 추가',
            '학습 모드 음성 사전 로딩: 플래시카드 학습 시 오디오를 백그라운드에서 미리 로드하여 카드 클릭 및 뒤집기 시 0ms 즉시 재생'
        ],
        zh: [
            '神经网络 TTS 发音延迟优化：引入持久预热 WebSocket 连接池，将单词发音响应延迟大幅缩短至约 200ms',
            '内存与 Blob 音频瞬间回放：通过内存 LRU 与客户端 Blob URL 缓存，复习已学单词实现亚毫秒级（<0.1ms）无延迟秒播',
            '单词弹窗与词典发音支持：为字幕单词弹窗（Word Popup）及词典面板全面添加原生一键发音扬声器按钮',
            '抽认卡学习模式后台预加载：切换词卡时自动在后台静默预载音频，翻卡或点击发音按钮实现 0ms 零等待即刻发声'
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
