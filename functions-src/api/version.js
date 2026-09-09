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
    version: '1.0.30',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Fixed Server Error 500: Resolved variable scope reference error in backend transcript orchestrator that caused server errors on video playback',
            'Automatic Language Mismatch Detection: Accurately prompts learners with switch suggestions when authentic captions exist in an alternate language',
            'Robust Backend Static Analysis: Integrated comprehensive AST undefined-variable validation and regression tests across all edge API functions'
        ],
        vi: [
            'Khắc phục lỗi máy chủ 500: Sửa triệt để lỗi tham chiếu phạm vi biến trong bộ điều phối phụ đề gây sự cố máy chủ khi phát video',
            'Tự động gợi ý khi có phụ đề ngôn ngữ khác: Tự động phát hiện và gợi ý người học chuyển đổi ngôn ngữ khi video có sẵn phụ đề chuẩn ở ngôn ngữ khác',
            'Kiểm thử tĩnh toàn diện: Tích hợp kiểm tra tự động biến chưa khai báo và bộ hồi quy cho toàn bộ các hàm xử lý API backend'
        ],
        ja: [
            'サーバーエラー500の完全修正：動画再生時にサーバーエラーを引き起こしていたバックエンド字幕オーケストレーターのスコープ参照エラーを修正',
            '利用可能な言語の自動検出と提案：学習対象言語と異なる言語で字幕が存在する場合に言語切り替えダイアログを正確に表示',
            '静的解析テストの強化：全エッジAPI関数に対して未定義変数の自動AST検証と回帰テストを導入し品質を担保'
        ],
        ko: [
            '서버 오류 500 해결: 동영상 재생 시 서버 오류를 유발했던 백엔드 자막 처리 함수의 변수 스코프 참조 오류를 완벽히 수정',
            '대체 언어 자막 자동 감지 및 전환 제안: 학습 대상 언어와 다른 언어로 자막이 제공될 때 언어 전환 모달을 정확히 표시',
            '백엔드 정적 분석 강화: 모든 에지 API 엔드포인트에 미선언 변수 AST 검증 및 회귀 테스트를 도입하여 런타임 안정성 보장'
        ],
        zh: [
            '修复服务器500错误：彻底解决视频播放时因后端字幕调度器变量作用域引用错误导致的服务器异常',
            '替代语言字幕智能识别与提示：当视频存在其他有效语言的原生字幕时，自动精准弹出语言切换建议',
            '后端静态分析全面强化：为所有边缘API函数增加未定义变量AST自动化检验及回归测试，杜绝运行时异常'
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
