/**
 * Spoken / Primary Language Classification for Recommendation Discovery
 * Prevents translated captions on foreign-audio videos from polluting target language feeds.
 */

import { SUPPORTED_LEARNING_LANGUAGE_SET } from '../utils/utils.js';
import { SCRIPT_REGEX } from '../utils/transcript-utils.js';

const LANG_ALIASES = { jp: 'ja', jpn: 'ja', cn: 'zh', cmn: 'zh', zho: 'zh', kr: 'ko', kor: 'ko', eng: 'en', vie: 'vi', vn: 'vi' };

const KANA_REGEX = new RegExp(SCRIPT_REGEX.kana.source, 'g');
const HANGUL_REGEX = new RegExp(SCRIPT_REGEX.hangul.source, 'g');
const HANZI_REGEX = new RegExp(SCRIPT_REGEX.han.source, 'g');
const VIETNAMESE_SPECIFIC_REGEX = SCRIPT_REGEX.vietnameseSpecific;
const OTHER_NON_TARGET_SCRIPT_REGEX = SCRIPT_REGEX.otherNonTarget;

/**
 * Normalize a BCP-47 or shorthand language code into 'ja' | 'zh' | 'ko' | 'en' | 'other' | null.
 * @param {string|null|undefined} raw
 * @returns {'ja' | 'zh' | 'ko' | 'en' | 'other' | null}
 */
export function normalizePrimaryLanguage(raw) {
    if (typeof raw !== 'string') return null;
    const cleaned = raw.trim().toLowerCase();
    if (!cleaned || cleaned === 'und' || cleaned === 'zxx' || cleaned === 'mul') return null;
    if (cleaned === 'other') return 'other';
    const base = cleaned.split(/[-_]/)[0];
    const mapped = LANG_ALIASES[base] || base;
    if (SUPPORTED_LEARNING_LANGUAGE_SET.has(mapped)) return mapped;
    return /^[a-z]{2,3}$/.test(mapped) ? 'other' : null;
}

/**
 * Detect explicit dub/cover/lesson spoken-language cues from title/channel/tags.
 * Checked before script counting so bilingual titles like "Love Trial (English Cover) 恋愛裁判"
 * or "Cover Tiếng Nhật" map to their true sung/spoken audio language.
 */
// Excludes '的' which also appears in Japanese Kanji compounds (e.g. 圧倒的, 目的).
const CHINESE_MARKER_REGEX = /[这们说么为实欢听书了吗呢吧啊哦呀哪誰谁怎沒没還还個个這們說]/;

function detectExplicitSpokenCue(text) {
    if (/(?<![a-z])(?:english|eng)\s*(?:ver(?:sion)?|cover|dub|podcast|listening)(?![a-z])|\(\s*english\s*\)|【\s*english\s*】|ti[eế]ng\s*anh/i.test(text)) {
        return 'en';
    }
    if (/(?<![a-z])(?:japanese|jpn?)\s*(?:ver(?:sion)?|cover|dub|podcast|listening)(?![a-z])|cover\s*(?:full\s*)?ti[eế]ng\s*nh[aậ]t|ti[eế]ng\s*nh[aậ]t|日本語\s*(?:ver|カバー|版|教室|ポッドキャスト)|\(\s*japanese\s*\)|【\s*japanese\s*】/i.test(text)) {
        return 'ja';
    }
    if (/(?<![a-z])(?:korean|kor)\s*(?:ver(?:sion)?|cover|dub|podcast|listening)(?![a-z])|cover\s*(?:full\s*)?ti[eế]ng\s*h[aà]n|ti[eế]ng\s*h[aà]n|한국어\s*(?:버전|커버)|\(\s*korean\s*\)|【\s*korean\s*】/i.test(text)) {
        return 'ko';
    }
    if (/(?<![a-z])(?:chinese|mandarin|cantonese|chn)\s*(?:ver(?:sion)?|cover|dub|podcast|listening)(?![a-z])|(?<![a-z])chinese\s*podcast(?![a-z])|(?<![a-z])pinyin(?![a-z])|ti[eế]ng\s*trung|中文\s*(?:版|翻唱)|\(\s*chinese\s*\)|【\s*chinese\s*】/i.test(text)) {
        return 'zh';
    }
    return null;
}

function detectTopicLanguageCue(text) {
    if (/(?<![a-z])(?:japanese|jlpt)(?![a-z])/i.test(text)) return 'ja';
    if (/(?<![a-z])(?:chinese|mandarin|cantonese|hsk|tocfl)(?![a-z])/i.test(text)) return 'zh';
    if (/(?<![a-z])(?:korean|topik)(?![a-z])/i.test(text)) return 'ko';
    if (/(?<![a-z])(?:english|cefr|bbc\s+learning\s+english|bbc\s+english)(?![a-z])/i.test(text)) return 'en';
    if (/(?<![a-z])vietnamese(?![a-z])|ti[eế]ng\s*vi[eệ]t/i.test(text)) return 'vi';
    return null;
}

function hasStrongScriptCue(text, lang) {
    if (!text) return false;
    if (lang === 'vi') return VIETNAMESE_SPECIFIC_REGEX.test(text);
    if (lang === 'ja') return KANA_REGEX.test(text);
    if (lang === 'ko') return HANGUL_REGEX.test(text);
    if (lang === 'zh') return (text.match(HANZI_REGEX) || []).length >= 2 && !KANA_REGEX.test(text) && !HANGUL_REGEX.test(text);
    return false;
}

const LEARNER_CONTENT_CUE_REGEX = /(?<![a-z])(?:learn|hsk|jlpt|topik|tocfl|genki|podcast|listening|vlog|beginner)(?![a-z])/i;

function recoverStudioDefaultEnglish(combined, titleChannel, verifiedLangs, defaultDocLang = null) {
    const explicitCue = detectExplicitSpokenCue(combined);
    if (explicitCue === 'en') return null;
    if (explicitCue && verifiedLangs.has(explicitCue)) return explicitCue;
    if (defaultDocLang && defaultDocLang !== 'en' && defaultDocLang !== 'other'
        && hasStrongScriptCue(titleChannel, defaultDocLang)) {
        return defaultDocLang;
    }
    const topicCue = detectTopicLanguageCue(combined);
    if (topicCue && topicCue !== 'en' && verifiedLangs.has(topicCue)
        && !/(?<![a-z])english(?![a-z])/i.test(titleChannel)
        && (hasStrongScriptCue(titleChannel, topicCue) || LEARNER_CONTENT_CUE_REGEX.test(combined))) {
        return topicCue;
    }
    const nonEnTracks = [...verifiedLangs].filter(l => l !== 'en' && l !== 'other');
    if (!verifiedLangs.has('en') && nonEnTracks.length === 1) {
        const trackLang = nonEnTracks[0];
        if (hasStrongScriptCue(titleChannel, trackLang) || topicCue === trackLang) {
            return trackLang;
        }
    }
    return null;
}

/**
 * Infer a video's primary spoken/sung language from official audio metadata, scripts, and AI tracks.
 * Returns null only when evidence is genuinely absent/ambiguous.
 * @param {object} meta
 * @returns {'ja' | 'zh' | 'ko' | 'en' | 'vi' | 'other' | null}
 */
export function inferSpokenLanguage(meta = {}) {
    const storedPrimary = normalizePrimaryLanguage(meta.primaryLanguage);
    if (storedPrimary && storedPrimary !== 'en') return storedPrimary;

    const title = typeof meta.title === 'string' ? meta.title.trim() : '';
    const channel = typeof meta.channel === 'string' ? meta.channel.trim() : '';
    const tags = Array.isArray(meta.tags) ? meta.tags.filter(t => typeof t === 'string').join(' ') : '';
    const combined = `${title} ${channel} ${tags}`.trim();
    const titleChannel = `${title} ${channel}`.trim();

    const aiLanguages = Array.isArray(meta.aiLanguages) ? meta.aiLanguages : [];
    const availableLanguages = Array.isArray(meta.availableLanguages) ? meta.availableLanguages : [];
    const subLanguages = Array.isArray(meta.subLanguages) ? meta.subLanguages : [];
    const verifiedTrackLangs = new Set([...aiLanguages, ...subLanguages].map(normalizePrimaryLanguage).filter(Boolean));
    // Prefer verified/ingested caption tracks over noisy YouTube community-translated availableLanguages.
    const primaryTrackSource = (aiLanguages.length || subLanguages.length)
        ? [...aiLanguages, ...subLanguages]
        : availableLanguages;
    const knownLangs = new Set(primaryTrackSource.map(normalizePrimaryLanguage).filter(Boolean));

    if (storedPrimary === 'en') {
        return recoverStudioDefaultEnglish(combined, titleChannel, verifiedTrackLangs) || 'en';
    }

    const audioLang = normalizePrimaryLanguage(meta.defaultAudioLanguage);
    if (audioLang) {
        const defaultDocLang = normalizePrimaryLanguage(meta.defaultLanguage);
        // YouTube creators frequently leave defaultAudioLanguage at the Studio 'en' default
        // even when defaultLanguage, verified tracks, or title/channel indicate another language.
        if (audioLang === 'en') {
            return recoverStudioDefaultEnglish(combined, titleChannel, verifiedTrackLangs, defaultDocLang) || 'en';
        }
        return audioLang;
    }

    if (!combined) {
        if (aiLanguages.length === 1) return normalizePrimaryLanguage(aiLanguages[0]);
        return null;
    }

    const explicitCue = detectExplicitSpokenCue(combined);
    if (explicitCue) return explicitCue;

    const titleHangul = (title.match(HANGUL_REGEX) || []).length;
    const titleKana = (title.match(KANA_REGEX) || []).length;
    const titleHanzi = (title.match(HANZI_REGEX) || []).length;
    const allHangul = (combined.match(HANGUL_REGEX) || []).length;
    const allKana = (combined.match(KANA_REGEX) || []).length;

    if (titleHangul > 0) return 'ko';
    if (titleKana > 0 && !(titleHanzi >= titleKana * 4 && CHINESE_MARKER_REGEX.test(title))) return 'ja';
    if (titleHanzi < 4) {
        if (allHangul > 0 && allKana === 0) return 'ko';
        if (allKana > 0 && allHangul === 0) return 'ja';
    }
    const titleLatin = (title.replace(/[\s\d\p{P}\p{S}]/gu, '').match(/[a-zA-Z]/g) || []).length;

    // English song/clip titles re-uploaded with brief Chinese bracket notes (e.g. 【...唱歌】Artist - Song)
    if (titleHanzi >= 2) {
        const englishDominatedClip = titleLatin >= titleHanzi * 3
            && knownLangs.has('en')
            && !knownLangs.has('zh')
            && !knownLangs.has('ja')
            && !aiLanguages.includes('zh');
        if (englishDominatedClip) return 'en';
        if (knownLangs.has('ja') && !knownLangs.has('zh') && (aiLanguages.includes('ja') || !CHINESE_MARKER_REGEX.test(combined))) {
            return 'ja';
        }
        // Kanji-only titles (e.g. 米津玄師 - Lemon) with both ja & zh subs are ambiguous without Chinese markers or audio metadata.
        if (knownLangs.has('ja') && knownLangs.has('zh') && !CHINESE_MARKER_REGEX.test(combined) && !aiLanguages.includes('zh')) {
            return aiLanguages.includes('ja') ? 'ja' : null;
        }
        return 'zh';
    }

    if (aiLanguages.length === 1) {
        const aiLang = normalizePrimaryLanguage(aiLanguages[0]);
        if (aiLang) return aiLang;
    }

    const topicCue = detectTopicLanguageCue(combined);
    if (topicCue) {
        // Vietnamese narration about another language (e.g. JLPT prep in Vietnamese) with only Vietnamese captions
        if (topicCue !== 'vi' && VIETNAMESE_SPECIFIC_REGEX.test(combined) && !knownLangs.has(topicCue)) {
            return 'vi';
        }
        return topicCue;
    }

    if (VIETNAMESE_SPECIFIC_REGEX.test(combined)) {
        return 'vi';
    }
    if (OTHER_NON_TARGET_SCRIPT_REGEX.test(combined)) {
        return 'other';
    }

    if (titleLatin >= 3 && knownLangs.has('en')) {
        const hasOtherTargetSub = knownLangs.has('ja') || knownLangs.has('zh') || knownLangs.has('ko') || knownLangs.has('vi');
        if (!hasOtherTargetSub || /(?<![a-z])tedx?(?![a-z])/i.test(combined)) {
            return 'en';
        }
    }

    return null;
}
