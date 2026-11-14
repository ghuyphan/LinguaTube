/**
 * Spoken / Primary Language Classification for Recommendation Discovery
 * Prevents translated captions on foreign-audio videos from polluting target language feeds.
 */

const TARGET_LANGUAGES = new Set(['ja', 'zh', 'ko', 'en']);
const LANG_ALIASES = { jp: 'ja', jpn: 'ja', cn: 'zh', cmn: 'zh', zho: 'zh', kr: 'ko', kor: 'ko', eng: 'en' };

const KANA_REGEX = /[\u3040-\u309F\u30A0-\u30FF]/g;
const HANGUL_REGEX = /[\uAC00-\uD7AF\u1100-\u11FF]/g;
const HANZI_REGEX = /[\u4E00-\u9FFF]/g;
const VIETNAMESE_SPECIFIC_REGEX = /[ăđơưĂĐƠƯảãạằắẳẵặầấẩẫậẻẽẹềếểễệỉĩịỏọồốổỗộờớởỡợủũụừứửữựỷỹỵ]/i;
const OTHER_NON_TARGET_SCRIPT_REGEX = /[\u0400-\u04FF\u0600-\u06FF\u0E00-\u0E7F\u0900-\u097F]/;

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
    if (TARGET_LANGUAGES.has(mapped)) return mapped;
    return /^[a-z]{2,3}$/.test(mapped) ? 'other' : null;
}

/**
 * Detect explicit dub/cover/lesson spoken-language cues from title/channel/tags.
 * Checked before script counting so bilingual titles like "Love Trial (English Cover) 恋愛裁判"
 * or "Cover Tiếng Nhật" map to their true sung/spoken audio language.
 */
const CHINESE_MARKER_REGEX = /[这们说么为实欢听书的了吗呢吧啊哦呀哪誰谁怎沒没還还個个這們說]/;

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
    return null;
}

/**
 * Infer a video's primary spoken/sung language from official audio metadata, scripts, and AI tracks.
 * Returns null only when evidence is genuinely absent/ambiguous.
 * @param {object} meta
 * @returns {'ja' | 'zh' | 'ko' | 'en' | 'other' | null}
 */
export function inferSpokenLanguage(meta = {}) {
    const stored = normalizePrimaryLanguage(meta.primaryLanguage)
        || normalizePrimaryLanguage(meta.defaultAudioLanguage);
    if (stored) return stored;

    const title = typeof meta.title === 'string' ? meta.title.trim() : '';
    const channel = typeof meta.channel === 'string' ? meta.channel.trim() : '';
    const tags = Array.isArray(meta.tags) ? meta.tags.filter(t => typeof t === 'string').join(' ') : '';
    const aiLanguages = Array.isArray(meta.aiLanguages) ? meta.aiLanguages : [];
    const availableLanguages = Array.isArray(meta.availableLanguages) ? meta.availableLanguages : [];
    const subLanguages = Array.isArray(meta.subLanguages) ? meta.subLanguages : [];
    // Prefer verified/ingested caption tracks over noisy YouTube community-translated availableLanguages.
    const primaryTrackSource = (aiLanguages.length || subLanguages.length)
        ? [...aiLanguages, ...subLanguages]
        : availableLanguages;
    const knownLangs = new Set(primaryTrackSource.map(normalizePrimaryLanguage).filter(Boolean));

    const combined = `${title} ${channel} ${tags}`.trim();
    if (!combined) {
        if (aiLanguages.length === 1) return normalizePrimaryLanguage(aiLanguages[0]);
        return null;
    }

    const explicitCue = detectExplicitSpokenCue(combined);
    if (explicitCue) return explicitCue;

    const titleHangul = (title.match(HANGUL_REGEX) || []).length;
    const titleKana = (title.match(KANA_REGEX) || []).length;
    const allHangul = (combined.match(HANGUL_REGEX) || []).length;
    const allKana = (combined.match(KANA_REGEX) || []).length;

    if (titleHangul > 0 || (allHangul > 0 && allKana === 0)) return 'ko';
    if (titleKana > 0 || (allKana > 0 && titleHangul === 0)) return 'ja';

    const titleHanzi = (title.match(HANZI_REGEX) || []).length;
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
        // Guard non-target study recaps (e.g. Vietnamese JLPT prep only having Vietnamese captions)
        if (VIETNAMESE_SPECIFIC_REGEX.test(combined) && !knownLangs.has(topicCue)) {
            return 'other';
        }
        return topicCue;
    }

    if (VIETNAMESE_SPECIFIC_REGEX.test(combined) || OTHER_NON_TARGET_SCRIPT_REGEX.test(combined)) {
        return 'other';
    }

    if (titleLatin >= 3 && knownLangs.has('en')) {
        const hasOtherTargetSub = knownLangs.has('ja') || knownLangs.has('zh') || knownLangs.has('ko');
        if (!hasOtherTargetSub || /(?<![a-z])tedx?(?![a-z])/i.test(combined)) {
            return 'en';
        }
    }

    return null;
}
