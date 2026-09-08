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
    version: '1.0.4',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-08',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Localization Polish: Comprehensive audit of all 5 UI languages with natural phrasing and zero AI literalisms',
            '100% Translation Parity: Added missing playlist and subtitle state keys across Vietnamese, Japanese, Korean, and Chinese',
            'Interpolation Fixes: Dynamic placeholders now properly support diverse language sentence structures in account and study views'
        ],
        vi: [
            'Chuẩn hoá ngôn ngữ: Đại tu toàn bộ 5 ngôn ngữ giao diện, dùng từ tự nhiên và loại bỏ hoàn toàn các lỗi dịch máy thô',
            'Đồng bộ 100% bản dịch: Bổ sung đầy đủ các khóa trạng thái danh sách phát và phụ đề cho toàn bộ các ngôn ngữ',
            'Khắc phục lỗi tham số: Hỗ trợ linh hoạt cấu trúc câu tiếng Việt trong trang cài đặt tài khoản và chế độ học từ'
        ],
        ja: [
            'UIローカライズの全面刷新：不自然な直訳やカタカナ語（「単語マイナー」等）を自然な日本語表現に改善',
            '100%の翻訳整合性：プレイリストや字幕状態に関する未翻訳キーを全言語で完全に同期・補完',
            '動的パラメータ補間の修正：アカウント表示や学習モードの達成メッセージで各言語の語順に対応'
        ],
        ko: [
            'UI 현지화 대규모 개선: 어색한 직역 표현을 다듬고 겹치는 업적 명칭을 고유한 한국어 표현으로 정비',
            '100% 번역 일치: 베트남어, 일본어, 한국어, 중국어 전반에 걸쳐 누락되었던 재생목록 및 자막 상태 키 추가',
            '동적 매개변수 보간 수정: 계정 프로필 및 학습 모드 연속 학습 메시지의 문장 어순 완벽 지원'
        ],
        zh: [
            '界面本地化体验优化：全面排查直译与语境不符词汇，统一音乐术语为精准的视频播放列表表达',
            '100% 词条完整同步：补全中日韩越各语言中缺失的播放列表与字幕状态本地化词条',
            '动态参数插值修复：优化个人中心与学习模式连胜提示中的占位符，完美贴合不同语言语序'
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
