/**
 * Unified Tokenization API (Cloudflare Function)
 * Japanese, Korean, and Chinese tokenization
 * - Japanese: kuromoji morphological analyzer with CDN dictionaries
 * - Korean: Intl.Segmenter + hangul-romanization
 * - Chinese: Intl.Segmenter + pinyin-pro
 */

import * as kuromoji from '@patdx/kuromoji';
import { pinyin } from 'pinyin-pro';
import { convert as romanizeKorean } from 'hangul-romanization';
import { jsonResponse, handleOptions, errorResponse } from '../../_shared/utils.js';

const SUPPORTED_LANGUAGES = new Set(['ja', 'ko', 'zh']);

// Kanji detection (CJK Unified Ideographs)
const KANJI_REGEX = /[\u4E00-\u9FFF]/;
function hasKanji(text) {
    return KANJI_REGEX.test(text);
}

// ============================================================================
// Kuromoji Tokenizer (Japanese)
// ============================================================================

// Singleton tokenizer promise
let tokenizerPromise = null;

/**
 * Custom loader that fetches dictionary files from jsDelivr CDN
 */
const cdnLoader = {
    async loadArrayBuffer(url) {
        // Strip .gz extension (CDN has uncompressed files)
        url = url.replace('.gz', '');
        const cdnUrl = 'https://cdn.jsdelivr.net/npm/@aiktb/kuromoji@1.0.2/dict/' + url;

        const res = await fetch(cdnUrl);
        if (!res.ok) {
            throw new Error(`Failed to fetch dictionary: ${cdnUrl}, status: ${res.status}`);
        }
        return res.arrayBuffer();
    }
};

/**
 * Get or create the kuromoji tokenizer
 */
async function getKuromojiTokenizer() {
    if (!tokenizerPromise) {
        console.log('[Tokenize JA] Initializing kuromoji tokenizer...');
        tokenizerPromise = new kuromoji.TokenizerBuilder({
            loader: cdnLoader
        }).build();
    }
    return tokenizerPromise;
}

/**
 * Tokenize Japanese text with kuromoji
 * Only adds reading (furigana) for tokens containing kanji
 */
async function tokenizeJapanese(text) {
    const tokenizer = await getKuromojiTokenizer();
    const kuromojiTokens = tokenizer.tokenize(text);

    return kuromojiTokens.map(t => {
        const token = { surface: t.surface_form };

        // Only add reading for tokens containing kanji
        // (hiragana/katakana-only tokens don't need furigana)
        if (t.reading && hasKanji(t.surface_form)) {
            // Kuromoji returns reading in katakana, convert to hiragana
            token.reading = katakanaToHiragana(t.reading);
        }

        // Add base form if different from surface
        if (t.basic_form && t.basic_form !== t.surface_form && t.basic_form !== '*') {
            token.baseForm = t.basic_form;
        }

        // Add part of speech
        if (t.pos && t.pos !== '*') {
            token.partOfSpeech = t.pos;
        }

        return token;
    });
}

/**
 * Convert katakana to hiragana
 */
function katakanaToHiragana(str) {
    return str.replace(/[\u30A1-\u30F6]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0x60)
    );
}

// ============================================================================
// Caching Utilities
// ============================================================================

/**
 * Simple hash function for cache keys (djb2 algorithm)
 */
function hashText(text) {
    let hash = 5381;
    for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) + hash) + text.charCodeAt(i);
        hash = hash >>> 0; // Convert to unsigned 32-bit
    }
    return hash.toString(36);
}

// ============================================================================
// Main Handler
// ============================================================================

export async function onRequest(context) {
    const { request, params, env } = context;
    const lang = params.lang;
    const TOKEN_CACHE = env.TRANSCRIPT_CACHE; // Reuse same KV namespace

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return handleOptions(['POST', 'OPTIONS']);
    }

    // Validate language
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
        const { text } = await request.json();

        if (!text || typeof text !== 'string') {
            return jsonResponse({ error: 'Missing or invalid "text" field' }, 400);
        }

        // Check cache first
        const cacheKey = `tokens:${lang}:${hashText(text)}`;
        if (TOKEN_CACHE) {
            try {
                const cached = await TOKEN_CACHE.get(cacheKey, 'json');
                if (cached) {
                    return jsonResponse(cached);
                }
            } catch (e) {
                // Cache read failed, continue with tokenization
            }
        }

        let tokens;

        // Japanese: Use kuromoji for proper morphological analysis
        if (lang === 'ja') {
            tokens = await tokenizeJapanese(text);
        } else {
            // Korean & Chinese: Use Intl.Segmenter
            const segmenter = new Intl.Segmenter(lang, { granularity: 'word' });
            const segments = [...segmenter.segment(text)];

            tokens = segments
                .filter(seg => seg.isWordLike || seg.segment.trim())
                .map(seg => {
                    const token = { surface: seg.segment };

                    // Add Chinese Pinyin
                    if (lang === 'zh') {
                        try {
                            const py = pinyin(token.surface, { toneType: 'symbol', type: 'string' });
                            if (py !== token.surface) {
                                token.pinyin = py;
                            }
                        } catch (e) {
                            // Ignore errors
                        }
                    }

                    // Add Korean Romanization
                    if (lang === 'ko') {
                        try {
                            token.romanization = romanizeKorean(token.surface);
                        } catch (e) {
                            // Ignore errors
                        }
                    }

                    return token;
                });
        }

        const result = { tokens };

        // Cache the result (30 days TTL)
        if (TOKEN_CACHE) {
            try {
                await TOKEN_CACHE.put(cacheKey, JSON.stringify(result), {
                    expirationTtl: 60 * 60 * 24 * 30
                });
            } catch (e) {
                // Cache write failed, continue
            }
        }

        return jsonResponse(result);

    } catch (error) {
        console.error(`[Tokenize ${lang.toUpperCase()}] Error:`, error);
        return errorResponse(error.message);
    }
}

