/**
 * Language Utilities
 * 
 * Consolidated language detection, normalization, and text analysis functions.
 */

import type { SupportedLearningLanguage } from '../../models/language.constants';

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

    // Chinese / Kanji (CJK Unified Ideographs, Extensions A-I, Compatibility Ideographs)
    hanzi: /\p{Script=Han}/u,

    // Vietnamese-distinctive Latin diacritics (ă, đ, ơ, ư, tones on â/ê/ô/ă/ơ/ư, stacked tones)
    vietnamese: /[àáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵăđơưÀÁẢÃẠẰẮẲẴẶẦẤẨẪẬÈÉẺẼẸỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌỒỐỔỖỘỜỚỞỠỢÙÚỦŨỤỪỨỬỮỰỲÝỶỸỴĂĐƠƯ]/,

    // Basic Latin
    latin: /[a-zA-Z]/,
} as const;

// Comprehensive punctuation pattern for CJK + Western
export const PUNCTUATION_REGEX = /^[\s\p{P}\p{S}【】「」『』（）〔〕［］｛｝〈〉《》〖〗〘〙〚〛｟｠、。・ー〜～！？：；，．""''…—–*]+$/u;

export type SupportedLanguage = SupportedLearningLanguage;
export type SupportedLanguageCode = SupportedLanguage;

const LANGUAGE_CODE_ALIASES: Record<string, SupportedLanguage> = {
    ja: 'ja', japanese: 'ja', jpn: 'ja',
    ko: 'ko', korean: 'ko', kor: 'ko',
    zh: 'zh', chinese: 'zh', cmn: 'zh', mandarin: 'zh', yue: 'zh', zho: 'zh', chi: 'zh',
    en: 'en', english: 'en', eng: 'en',
    vi: 'vi', vietnamese: 'vi', vie: 'vi', vn: 'vi',
};

/**
 * Normalize language codes from YouTube, Gladia, or external providers to canonical 2-letter codes.
 * Handles null/undefined safely, splits on '-' and '_', and maps STT aliases (cmn, mandarin, yue -> zh).
 */
export function normalizeLanguageCode(lang?: string | null): string {
    if (!lang || typeof lang !== 'string') return '';
    const clean = lang.trim().toLowerCase().split('-')[0].split('_')[0];
    return LANGUAGE_CODE_ALIASES[clean] ?? clean;
}

/**
 * Detect language from text based on character types.
 * Context-aware: When pure Hanzi/Kanji is encountered, checks contextLanguage to distinguish Japanese Kanji from Chinese,
 * and distinguishes Vietnamese diacritics from plain English Latin script.
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
            return normContext;
        }
        return 'zh';
    }

    // Check for Vietnamese diacritics before defaulting to English
    if (UNICODE_RANGES.vietnamese.test(text)) {
        return 'vi';
    }

    const normContext = normalizeLanguageCode(contextLanguage);
    if (normContext === 'vi' && UNICODE_RANGES.latin.test(text)) {
        return 'vi';
    }

    // Default to English
    return 'en';
}

/**
 * Detect language of a subtitle cue list by sampling non-empty cues.
 */
export function detectSubtitleLanguage(cues: { text: string }[], preferredLang?: string): SupportedLanguage {
    const normPreferred = normalizeLanguageCode(preferredLang);
    const fallback: SupportedLanguage = Object.hasOwn(LANGUAGE_CODE_ALIASES, normPreferred) ? LANGUAGE_CODE_ALIASES[normPreferred] : 'en';
    if (!cues || cues.length === 0) {
        return fallback;
    }
    const sample = cues.slice(0, 15).map(c => c.text).filter(Boolean).join(' ');
    if (!sample.trim()) {
        return fallback;
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

/**
 * Get i18n translation key for a given reading display mode and learning language.
 */
export function getReadingDisplayLabelKey(
    mode: string,
    language: string
): string {
    if (language === 'en') {
        return 'settings.textOnly';
    }

    switch (language) {
        case 'ja':
            if (mode === 'native') return 'settings.kanjiOnly';
            if (mode === 'annotated') return 'settings.kanjiFurigana';
            if (mode === 'annotatedRomanized') return 'settings.kanjiRomaji';
            if (mode === 'romanized') return 'settings.romajiOnly';
            return 'settings.kanaOnly';
        case 'zh':
            if (mode === 'native') return 'settings.hanziOnly';
            if (mode === 'annotated') return 'settings.hanziPinyin';
            return 'settings.pinyinOnly';
        case 'ko':
            if (mode === 'native') return 'settings.hangulOnly';
            if (mode === 'annotated') return 'settings.hangulRomanization';
            return 'settings.romanizationOnly';
        default:
            return 'settings.textOnly';
    }
}

/**
 * Get localized display label for a reading display mode.
 */
export function getReadingDisplayLabel(
    mode: string,
    language: string,
    t: (key: string) => string
): string {
    return t(getReadingDisplayLabelKey(mode, language));
}

