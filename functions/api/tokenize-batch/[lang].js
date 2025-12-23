/**
 * Batch Tokenization API (Cloudflare Function)
 * Tokenizes multiple texts at once and caches as single entry per video
 * - Reduces KV writes from ~200 to 1 per video
 * - Supports Japanese (kuromoji), Korean (Intl.Segmenter), Chinese (Intl.Segmenter)
 */

import * as kuromoji from '@patdx/kuromoji';
import { pinyin } from 'pinyin-pro';
import { convert as romanizeKorean } from 'hangul-romanization';
import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../../_shared/utils.js';

const SUPPORTED_LANGUAGES = new Set(['ja', 'ko', 'zh']);

// Kanji detection (CJK Unified Ideographs)
const KANJI_REGEX = /[\u4E00-\u9FFF]/;
function hasKanji(text) {
    return KANJI_REGEX.test(text);
}

// ============================================================================
// Kuromoji Tokenizer (Japanese)
// ============================================================================

let tokenizerPromise = null;

const cdnLoader = {
    async loadArrayBuffer(url) {
        url = url.replace('.gz', '');
        const cdnUrl = 'https://cdn.jsdelivr.net/npm/@aiktb/kuromoji@1.0.2/dict/' + url;
        const res = await fetch(cdnUrl);
        if (!res.ok) {
            throw new Error(`Failed to fetch dictionary: ${cdnUrl}, status: ${res.status}`);
        }
        return res.arrayBuffer();
    }
};

async function getKuromojiTokenizer() {
    if (!tokenizerPromise) {
        console.log('[Tokenize Batch] Initializing kuromoji tokenizer...');
        tokenizerPromise = new kuromoji.TokenizerBuilder({
            loader: cdnLoader
        }).build();
    }
    return tokenizerPromise;
}

function katakanaToHiragana(str) {
    return str.replace(/[\u30A1-\u30F6]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0x60)
    );
}

async function tokenizeJapanese(text) {
    const tokenizer = await getKuromojiTokenizer();
    const kuromojiTokens = tokenizer.tokenize(text);

    return kuromojiTokens.map(t => {
        const token = { surface: t.surface_form };

        if (t.reading && hasKanji(t.surface_form)) {
            token.reading = katakanaToHiragana(t.reading);
        }

        if (t.basic_form && t.basic_form !== t.surface_form && t.basic_form !== '*') {
            token.baseForm = t.basic_form;
        }

        if (t.pos && t.pos !== '*') {
            token.partOfSpeech = t.pos;
        }

        return token;
    });
}

function tokenizeKoreanChinese(text, lang) {
    const segmenter = new Intl.Segmenter(lang, { granularity: 'word' });
    const segments = [...segmenter.segment(text)];

    return segments
        .filter(seg => seg.isWordLike || seg.segment.trim())
        .map(seg => {
            const token = { surface: seg.segment };

            if (lang === 'zh') {
                try {
                    const py = pinyin(token.surface, { toneType: 'symbol', type: 'string' });
                    if (py !== token.surface) {
                        token.pinyin = py;
                    }
                } catch (e) { }
            }

            if (lang === 'ko') {
                try {
                    token.romanization = romanizeKorean(token.surface);
                } catch (e) { }
            }

            return token;
        });
}

// ============================================================================
// Main Handler
// ============================================================================

export async function onRequest(context) {
    const { request, params, env } = context;
    const lang = params.lang;
    const TOKEN_CACHE = env.TRANSCRIPT_CACHE;

    if (request.method === 'OPTIONS') {
        return handleOptions(['POST', 'OPTIONS']);
    }

    if (!SUPPORTED_LANGUAGES.has(lang)) {
        return jsonResponse(
            { error: `Unsupported language: ${lang}. Supported: ja, ko, zh` },
            400
        );
    }

    if (request.method !== 'POST') {
        return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    try {
        const body = await request.json();
        const { texts, videoId } = body;

        if (!Array.isArray(texts) || texts.length === 0) {
            return jsonResponse({ error: 'Missing or invalid "texts" array' }, 400);
        }

        if (!videoId || !validateVideoId(videoId)) {
            return jsonResponse({ error: 'Missing or invalid "videoId"' }, 400);
        }

        // Check cache first - ONE read for entire video
        const cacheKey = `tokens:${lang}:${videoId}`;
        if (TOKEN_CACHE) {
            try {
                const cached = await TOKEN_CACHE.get(cacheKey, 'json');
                if (cached) {
                    console.log(`[Tokenize Batch] Cache hit for ${videoId}`);
                    return jsonResponse(cached);
                }
            } catch (e) {
                // Cache read failed, continue
            }
        }

        console.log(`[Tokenize Batch] Tokenizing ${texts.length} texts for ${videoId} (${lang})`);

        // Tokenize all texts
        const allTokens = [];
        for (const text of texts) {
            if (!text || typeof text !== 'string') {
                allTokens.push([]);
                continue;
            }

            if (lang === 'ja') {
                allTokens.push(await tokenizeJapanese(text));
            } else {
                allTokens.push(tokenizeKoreanChinese(text, lang));
            }
        }

        const result = { tokens: allTokens };

        // Cache as ONE write for entire video (30 day TTL)
        if (TOKEN_CACHE) {
            try {
                await TOKEN_CACHE.put(cacheKey, JSON.stringify(result), {
                    expirationTtl: 60 * 60 * 24 * 30
                });
                console.log(`[Tokenize Batch] Cached tokens for ${videoId}`);
            } catch (e) {
                console.error('[Tokenize Batch] Cache write failed:', e.message);
            }
        }

        return jsonResponse(result);

    } catch (error) {
        console.error(`[Tokenize Batch ${lang.toUpperCase()}] Error:`, error);
        return errorResponse(error.message);
    }
}
