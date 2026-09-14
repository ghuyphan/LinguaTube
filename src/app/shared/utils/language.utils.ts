/**
 * Language Utilities
 * 
 * Consolidated language detection, normalization, and text analysis functions.
 */

// Unicode ranges for language detection
export const UNICODE_RANGES = {
    // Japanese
    hiragana: /[\u3040-\u309F]/,
    katakana: /[\u30A0-\u30FF]/,
    japanese: /[\u3040-\u309F\u30A0-\u30FF]/,

    // Korean
    hangul: /[\uAC00-\uD7AF]/,
    hangulJamo: /[\u1100-\u11FF\u3130-\u318F]/,
    korean: /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/,

    // Chinese / Kanji (CJK Unified Ideographs)
    hanzi: /[\u4E00-\u9FFF]/,

    // Basic Latin
    latin: /[a-zA-Z]/,
} as const;

// Comprehensive punctuation pattern for CJK + Western
export const PUNCTUATION_REGEX = /^[\s\p{P}\p{S}【】「」『』（）〔〕［］｛｝〈〉《》〖〗〘〙〚〛｟｠、。・ー〜～！？：；，．""''…—–*]+$/u;

export type SupportedLanguage = 'ja' | 'zh' | 'ko' | 'en';

/**
 * Normalize language codes from YouTube, Gladia, or external providers to canonical 2-letter codes.
 * Handles null/undefined safely, splits on '-' and '_', and maps STT aliases (cmn, mandarin, yue -> zh).
 */
export function normalizeLanguageCode(lang?: string | null): string {
    if (!lang || typeof lang !== 'string') return '';
    const clean = lang.trim().toLowerCase().split('-')[0].split('_')[0];
    if (clean === 'ja' || clean === 'japanese' || clean === 'jpn') return 'ja';
    if (clean === 'ko' || clean === 'korean' || clean === 'kor') return 'ko';
    if (clean === 'zh' || clean === 'chinese' || clean === 'cmn' || clean === 'mandarin' || clean === 'yue' || clean === 'zho' || clean === 'chi') return 'zh';
    if (clean === 'en' || clean === 'english' || clean === 'eng') return 'en';
    return clean;
}

/**
 * Detect language from text based on character types.
 * Context-aware: When pure Hanzi/Kanji is encountered, checks activeLanguage to distinguish Japanese Kanji from Chinese.
 */
export function detectLanguage(text: string, contextLanguage?: string): SupportedLanguage {
    if (!text || text.trim().length === 0) return 'en';

    // Check for Korean (Hangul)
    if (UNICODE_RANGES.korean.test(text)) {
        return 'ko';
    }

    // Check for Japanese-specific kana (Hiragana/Katakana)
    if (UNICODE_RANGES.hiragana.test(text) || UNICODE_RANGES.katakana.test(text)) {
        return 'ja';
    }

    // Check for CJK ideographs (Kanji/Hanzi)
    if (UNICODE_RANGES.hanzi.test(text)) {
        const normContext = normalizeLanguageCode(contextLanguage);
        if (normContext === 'ja' || normContext === 'zh') {
            return normContext as SupportedLanguage;
        }
        return 'zh';
    }

    // Default to English
    return 'en';
}

/**
 * Detect language of a subtitle cue list by sampling non-empty cues.
 */
export function detectSubtitleLanguage(cues: { text: string }[], preferredLang?: string): SupportedLanguage {
    if (!cues || cues.length === 0) {
        const norm = normalizeLanguageCode(preferredLang);
        return (norm === 'ja' || norm === 'zh' || norm === 'ko' || norm === 'en') ? (norm as SupportedLanguage) : 'en';
    }
    const sample = cues.slice(0, 15).map(c => c.text).filter(Boolean).join(' ');
    if (!sample.trim()) {
        const norm = normalizeLanguageCode(preferredLang);
        return (norm === 'ja' || norm === 'zh' || norm === 'ko' || norm === 'en') ? (norm as SupportedLanguage) : 'en';
    }
    return detectLanguage(sample, preferredLang);
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
