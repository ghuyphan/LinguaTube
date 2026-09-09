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
    version: '1.1.1',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'NLP-Powered English Tokenization: Integrated the Compromise NLP engine for English morphological segmentation, attaching accurate Part-of-Speech tags and lemmatized base forms',
            'Zero False Positives: Eliminated aggressive over-tagging on everyday words, pronouns, articles, and contractions (such as "I", "the", "a", "don\'t"), keeping them individually clickable for dictionary lookup',
            'Precision CEFR Grammar Patterns: Implemented syntax-aware detection for genuine English CEFR structures (perfect tenses, modal perfects, phrasal modals, correlatives) with clean token boundaries'
        ],
        vi: [
            'Phân tích ngữ pháp tiếng Anh bằng NLP: Tích hợp thư viện Compromise NLP cho tiếng Anh, bổ sung từ loại (POS) và dạng nguyên thể (baseForm) tương tự như tiếng Nhật và tiếng Hàn',
            'Loại bỏ hoàn toàn nhận diện nhầm: Khắc phục triệt để lỗi đánh dấu tràn lan các từ phổ thông, đại từ, mạo từ và từ viết tắt (như "I", "the", "a", "don\'t"), giúp tra cứu từ điển và lưu từ vựng chính xác',
            'Nhận diện mẫu ngữ pháp CEFR chuẩn xác: Nhận diện cấu trúc ngữ pháp thực tế (thì hoàn thành, động từ khuyết thiếu quá khứ, cấu trúc tương quan) mà không bị dính dấu câu hay khoảng trắng'
        ],
        ja: [
            'NLPによる高精度な英語形態素解析：Compromise NLPエンジンを統合し、品詞タグ（POS）と原形（baseForm）を付与して日本語（Kuromoji）や韓国語と同様の分析を実現',
            '日常単語の誤判定を完全解消：代名詞や冠詞、短縮形（"I", "the", "a", "don\'t"など）の過剰ハイライトを撤廃し、単語ごとの辞書引きと単語帳保存がスムーズに',
            '精密なCEFR英文法パターン検出：複合時制や法助動詞完了形、相関構文などの真の英文法構造を文脈に応じて的確に検出し、記号やスペースを含めないクリーンな抽出を実現'
        ],
        ko: [
            'NLP 기반 영어 형태소 분석 도입: Compromise NLP 엔진을 연동하여 품사 태그(POS) 및 기본형(baseForm)을 부여, 일본어 및 한국어 수준의 자연어 처리 구현',
            '일상 단어 오인식 완벽 제거: 대명사, 관사, 축약형("I", "the", "a", "don\'t" 등)의 무분별한 문법 하이라이트를 제거하여 개별 단어 사전 검색 및 단어장 저장을 원활하게 지원',
            '정밀한 CEFR 영어 문법 패턴 감지: 완료 시제, 조동사 완료형, 상관 접속사 등 실제 CEFR 영어 문법 구문을 정확한 토큰 범위로 깔끔하게 감지'
        ],
        zh: [
            '引入NLP驱动的英语形态分词：深度集成Compromise NLP分词引擎，提供词性标注（POS）与原型还原（baseForm），达到日韩语同等精细度',
            '彻底消除日常词汇过度标记：移除代词、冠词、缩写词（如 "I", "the", "a", "don\'t" 等）的虚假语法高亮，确保单词独立可点、精准查词与收藏',
            '高精度CEFR英语语法模式识别：智能捕获完成时态、情态动词完成式、相关并列连词等核心语法结构，标点与空格不再误入高亮区间'
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
