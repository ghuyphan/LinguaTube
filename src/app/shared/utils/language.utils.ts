/**
 * Language Utilities
 * 
 * Consolidated language detection and text analysis functions
 * Previously duplicated across:
 * - dictionary.service.ts (detectLanguage)
 * - subtitle.service.ts (getCharType, isPunctuation)
 * - innertube.js (verifyLanguage)
 */

// Unicode ranges for language detection
const UNICODE_RANGES = {
    // Japanese
    hiragana: /[\u3040-\u309F]/,
    katakana: /[\u30A0-\u30FF]/,
    japanese: /[\u3040-\u309F\u30A0-\u30FF]/g,

    // Korean
    hangul: /[\uAC00-\uD7AF]/g,
    hangulJamo: /[\u1100-\u11FF\u3130-\u318F]/,
    korean: /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/,

    // Chinese (CJK Unified Ideographs)
    hanzi: /[\u4E00-\u9FFF]/g,

    // Basic Latin
    latin: /[a-zA-Z]/g,
} as const;

// Comprehensive punctuation pattern for CJK + Western
const PUNCTUATION_REGEX = /^[\s\p{P}\p{S}【】「」『』（）〔〕［］｛｝〈〉《》〖〗〘〙〚〛｟｠、。・ー〜～！？：；，．""''…—–*]+$/u;

export type SupportedLanguage = 'ja' | 'zh' | 'ko' | 'en';

/**
 * Detect language from text based on character types
 */
export function detectLanguage(text: string): SupportedLanguage {
    if (!text || text.trim().length === 0) return 'en';

    // Check for Korean (Hangul)
    if (UNICODE_RANGES.korean.test(text)) {
        return 'ko';
    }

    // Check for Japanese-specific characters (Hiragana/Katakana)
    if (UNICODE_RANGES.hiragana.test(text) || UNICODE_RANGES.katakana.test(text)) {
        return 'ja';
    }

    // Check for CJK ideographs (Chinese)
    if (UNICODE_RANGES.hanzi.test(text)) {
        return 'zh';
    }

    // Default to English for Latin characters
    return 'en';
}

/**
 * Get character type for tokenization
 */
export function getCharType(char: string): string {
    if (UNICODE_RANGES.hiragana.test(char)) return 'hiragana';
    if (UNICODE_RANGES.katakana.test(char)) return 'katakana';
    if (isPunctuation(char)) return 'punctuation';
    return 'other';
}

/**
 * Check if text is punctuation/whitespace (CJK + Western)
 */
export function isPunctuation(text: string): boolean {
    if (!text) return false;
    return PUNCTUATION_REGEX.test(text);
}

/**
 * Verify that text matches expected language
 * Used to detect when APIs silently return wrong language
 */
export function verifyLanguage(text: string, expectedLang: SupportedLanguage): boolean {
    if (!text || text.length < 50) return true; // Too short to verify

    const sample = text.slice(0, 1000);

    switch (expectedLang) {
        case 'ja': {
            // Japanese should have hiragana/katakana
            const kanaCount = (sample.match(UNICODE_RANGES.japanese) || []).length;
            return kanaCount > 5;
        }

        case 'ko': {
            // Korean should have Hangul, not dominated by Japanese
            const hangulCount = (sample.match(UNICODE_RANGES.hangul) || []).length;
            const kanaCount = (sample.match(UNICODE_RANGES.japanese) || []).length;
            if (kanaCount > hangulCount * 2) return false;
            return hangulCount > 5;
        }

        case 'zh': {
            // Chinese should have Hanzi but no/minimal kana/hangul
            const hanziCount = (sample.match(UNICODE_RANGES.hanzi) || []).length;
            const kanaCount = (sample.match(UNICODE_RANGES.japanese) || []).length;
            const hangulCount = (sample.match(UNICODE_RANGES.hangul) || []).length;
            return hanziCount > 10 && kanaCount < 5 && hangulCount < 5;
        }

        default:
            return true;
    }
}

/**
 * Check if language is a supported CJK language
 */
export function isCJKLanguage(lang: string): boolean {
    return ['ja', 'zh', 'ko'].includes(lang);
}

/**
 * Normalize language code (handle variants like zh-CN, ja-JP)
 */
export function normalizeLanguageCode(lang: string): SupportedLanguage {
    const base = lang.split('-')[0].toLowerCase();
    if (['ja', 'zh', 'ko', 'en'].includes(base)) {
        return base as SupportedLanguage;
    }
    return 'en';
}
