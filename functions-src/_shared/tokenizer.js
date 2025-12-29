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

/**
 * Check if string is punctuation/whitespace (CJK + Western)
 * Matches the client-side logic in SubtitleService
 */
const PUNCTUATION_REGEX = /^[\s\p{P}\p{S}【】「」『』（）〔〕［］｛｝〈〉《》〖〗〘〙〚〛｟｠、。・ー〜～！？：；，．""''…—–*]+$/u;

export function isPunctuation(text) {
    return PUNCTUATION_REGEX.test(text);
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

        // Check for punctuation using kuromoji POS or regex
        // Kuromoji marks punctuation as 記号 (symbol) or with pos_detail_1 containing punctuation types
        const isPunc = t.pos === '記号' || t.pos === '空白' || isPunctuation(t.surface_form);
        if (isPunc) {
            token.isPunctuation = true;
        }

        // Only add reading for tokens containing kanji (skip punctuation)
        if (!isPunc && t.reading && hasKanji(t.surface_form)) {
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

            // Check for punctuation
            if (isPunctuation(seg.segment)) {
                token.isPunctuation = true;
                return token; // Skip pronunciation for punctuation
            }

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
 * Tokenize English text using Intl.Segmenter
 * Returns only word-like tokens (no punctuation or whitespace)
 */
export function tokenizeEnglish(text) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'word' });
    const segments = [...segmenter.segment(text)];

    // Return all segments, marking non-words as punctuation
    return segments
        .filter(seg => seg.isWordLike || seg.segment.trim())
        .map(seg => {
            const token = { surface: seg.segment };
            if (!seg.isWordLike) {
                token.isPunctuation = true;
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

    if (lang === 'en') {
        return tokenizeEnglish(text);
    }

    return tokenizeKoreanChinese(text, lang);
}

