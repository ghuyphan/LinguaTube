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
 */
async function tokenizeJapanese(text) {
    const tokenizer = await getKuromojiTokenizer();
    const kuromojiTokens = tokenizer.tokenize(text);

    return kuromojiTokens.map(t => {
        const token = { surface: t.surface_form };

        // Add reading (hiragana) if different from surface
        if (t.reading && t.reading !== t.surface_form) {
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
// Main Handler
// ============================================================================

export async function onRequest(context) {
    const { request, params } = context;
    const lang = params.lang;

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

        return jsonResponse({ tokens });

    } catch (error) {
        console.error(`[Tokenize ${lang.toUpperCase()}] Error:`, error);
        return errorResponse(error.message);
    }
}
