/**
 * Shared Tokenization Utilities
 * Provides Japanese (kuromoji), Korean (Intl.Segmenter + romanization), and Chinese (Intl.Segmenter + pinyin) tokenization
 */

import * as kuromoji from '@patdx/kuromoji';
import { pinyin } from 'pinyin-pro';
import { convert as romanizeKorean } from 'hangul-romanization';

// Kanji detection (CJK Unified Ideographs)
const KANJI_REGEX = /[\u4E00-\u9FFF]/;

export function hasKanji(text) {
    return KANJI_REGEX.test(text);
}

// ============================================================================
// Kuromoji Tokenizer (Japanese) - Singleton
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

/**
 * Get or create the kuromoji tokenizer (singleton)
 */
export async function getKuromojiTokenizer() {
    if (!tokenizerPromise) {
        console.log('[Tokenizer] Initializing kuromoji tokenizer...');
        tokenizerPromise = new kuromoji.TokenizerBuilder({
            loader: cdnLoader
        }).build();
    }
    return tokenizerPromise;
}

/**
 * Convert katakana to hiragana
 */
export function katakanaToHiragana(str) {
    return str.replace(/[\u30A1-\u30F6]/g, (match) =>
        String.fromCharCode(match.charCodeAt(0) - 0x60)
    );
}

/**
 * Tokenize Japanese text with kuromoji
 * Only adds reading (furigana) for tokens containing kanji
 */
export async function tokenizeJapanese(text) {
    const tokenizer = await getKuromojiTokenizer();
    const kuromojiTokens = tokenizer.tokenize(text);

    return kuromojiTokens.map(t => {
        const token = { surface: t.surface_form };

        // Only add reading for tokens containing kanji
        if (t.reading && hasKanji(t.surface_form)) {
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
 * Tokenize Korean or Chinese text using Intl.Segmenter
 * Adds pinyin for Chinese and romanization for Korean
 */
export function tokenizeKoreanChinese(text, lang) {
    const segmenter = new Intl.Segmenter(lang, { granularity: 'word' });
    const segments = [...segmenter.segment(text)];

    return segments
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
                } catch (e) { }
            }

            // Add Korean Romanization
            if (lang === 'ko') {
                try {
                    token.romanization = romanizeKorean(token.surface);
                } catch (e) { }
            }

            return token;
        });
}

/**
 * Tokenize text based on language
 */
export async function tokenize(text, lang) {
    if (!text || typeof text !== 'string') {
        return [];
    }

    if (lang === 'ja') {
        return tokenizeJapanese(text);
    }

    return tokenizeKoreanChinese(text, lang);
}
