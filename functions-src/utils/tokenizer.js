/**
 * Shared Tokenization Utilities
 * Provides Japanese (kuromoji), Korean (Intl.Segmenter + romanization), and Chinese (Intl.Segmenter + pinyin) tokenization
 */

import * as kuromoji from '@patdx/kuromoji';
import { getJapaneseRomaji, isJapaneseKanaText, katakanaToHiragana } from './japanese-romaji.js';

let nlpModule = null;
async function getNlp() {
    if (!nlpModule) {
        const mod = await import('compromise');
        nlpModule = mod.default || mod;
    }
    return nlpModule;
}

let pinyinModule = null;
async function getPinyin() {
    if (!pinyinModule) {
        const mod = await import('pinyin-pro');
        pinyinModule = mod.pinyin || mod;
    }
    return pinyinModule;
}

let romanizeKoreanModule = null;
async function getRomanizeKorean() {
    if (!romanizeKoreanModule) {
        const mod = await import('hangul-romanization');
        romanizeKoreanModule = mod.convert || mod;
    }
    return romanizeKoreanModule;
}

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
 * Get or create the kuromoji tokenizer (singleton with failure recovery)
 * 
 * NOTE: If initialization fails (e.g., network error fetching dictionary),
 * the promise is reset so subsequent calls can retry. This prevents a
 * permanent failure state from a single transient error.
 */
export async function getKuromojiTokenizer() {
    if (!tokenizerPromise) {
        console.log('[Tokenizer] Initializing kuromoji tokenizer...');
        tokenizerPromise = new kuromoji.TokenizerBuilder({
            loader: cdnLoader
        }).build().catch(err => {
            console.error('[Tokenizer] Initialization failed:', err.message);
            tokenizerPromise = null; // Reset on failure to allow retry
            throw err;
        });
    }
    return tokenizerPromise;
}

export { katakanaToHiragana };

/**
 * Segments kanji stem and okurigana for ruby annotations (e.g. 食べる -> 食(た) + べる)
 * Handles leading kana prefixes (お茶), trailing okurigana (食べる),
 * and compound verbs with interior okurigana (思い出す, 行き交う).
 */
export function segmentJapaneseRuby(surface, reading) {
    if (!surface || !reading || !hasKanji(surface)) {
        return null;
    }

    const parts = [];

    // 1. Strip matching leading kana (e.g. お茶 -> お + 茶)
    let headLen = 0;
    while (
        headLen < surface.length &&
        headLen < reading.length &&
        katakanaToHiragana(surface[headLen]) === reading[headLen] &&
        isJapaneseKanaText(surface[headLen])
    ) {
        headLen++;
    }

    if (headLen > 0) {
        parts.push({ text: surface.slice(0, headLen) });
        surface = surface.slice(headLen);
        reading = reading.slice(headLen);
    }

    // 2. Strip matching trailing kana (e.g. 食べる -> 食 + べる, 消しゴム -> 消し + ゴム)
    let tailLen = 0;
    while (
        tailLen < surface.length &&
        tailLen < reading.length &&
        katakanaToHiragana(surface[surface.length - 1 - tailLen]) === reading[reading.length - 1 - tailLen] &&
        isJapaneseKanaText(surface[surface.length - 1 - tailLen])
    ) {
        tailLen++;
    }

    let tailPart = null;
    if (tailLen > 0) {
        tailPart = { text: surface.slice(surface.length - tailLen) };
        surface = surface.slice(0, surface.length - tailLen);
        reading = reading.slice(0, reading.length - tailLen);
    }

    // 3. If remaining surface has interior kana (e.g. 思い出 / おもいだ, 行き交 / いきか)
    if (hasKanji(surface)) {
        const interiorKanaMatch = surface.match(/^([\u4E00-\u9FFF]+)([\u3040-\u309F\u30A0-\u30FFー]+)([\u4E00-\u9FFF]+)$/);
        if (interiorKanaMatch) {
            const [, kanji1, kanaMid, kanji2] = interiorKanaMatch;
            const midHiragana = katakanaToHiragana(kanaMid);
            const midReadingIdx = reading.indexOf(midHiragana);
            if (midReadingIdx > 0 && midReadingIdx + midHiragana.length < reading.length) {
                const reading1 = reading.slice(0, midReadingIdx);
                const reading2 = reading.slice(midReadingIdx + midHiragana.length);
                parts.push({ text: kanji1, reading: reading1 });
                parts.push({ text: kanaMid });
                parts.push({ text: kanji2, reading: reading2 });
            } else {
                parts.push({ text: surface, reading });
            }
        } else {
            parts.push({ text: surface, reading });
        }
    } else if (surface) {
        parts.push({ text: surface });
    }

    if (tailPart) {
        parts.push(tailPart);
    }

    return parts.length > 0 ? parts : [{ text: surface, reading }];
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

        let kanaReading = !isPunc && t.reading
            ? katakanaToHiragana(t.reading)
            : !isPunc && isJapaneseKanaText(t.surface_form)
                ? katakanaToHiragana(t.surface_form)
                : undefined;

        // Correct spoken particle pronunciation for は (wa) and へ (e)
        if (t.pos === '助詞' || t.pos_detail_1?.includes('助詞')) {
            if (t.surface_form === 'は') {
                kanaReading = 'わ';
            } else if (t.surface_form === 'へ') {
                kanaReading = 'え';
            }
        }

        // Only add reading for tokens containing kanji (skip punctuation)
        if (kanaReading && hasKanji(t.surface_form)) {
            token.reading = kanaReading;
            const parts = segmentJapaneseRuby(t.surface_form, kanaReading);
            if (parts && parts.length > 0) {
                token.rubyParts = parts;
            }
        }

        if (kanaReading) {
            token.romanization = getJapaneseRomaji(kanaReading, t.surface_form);
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

// Hangul batchim (final consonant) detection: (code - 0xAC00) % 28
function getHangulBatchim(char) {
    if (!char) return 0;
    const code = char.charCodeAt(0);
    if (code < 0xAC00 || code > 0xD7AF) return 0;
    return (code - 0xAC00) % 28;
}

function hasHangulBatchim(char) {
    return getHangulBatchim(char) !== 0;
}

const PROTECTED_GA_NOUNS = new Set([
    '휴가', '국가', '작가', '화가', '물가', '농가', '상가', '단가',
    '참가', '추가', '평가', '원가', '시가', '치가', '도가', '초가'
]);

/**
 * Heuristic Korean postpositional particle (조사) detachment
 * Extracts canonical noun baseForm while preserving natural inflected surface
 */
export function detachKoreanParticle(word) {
    if (!word || typeof word !== 'string' || word.length < 2) return null;
    for (let i = 0; i < word.length; i++) {
        const code = word.charCodeAt(i);
        if (code < 0xAC00 || code > 0xD7AF) return null;
    }

    // 3-syllable compound particles
    const particles3 = ['에서는', '에서도', '에게는', '에게도', '께서는'];
    for (const p of particles3) {
        if (word.endsWith(p) && word.length > 3) {
            return { stem: word.slice(0, -3), particle: p };
        }
    }

    // 2-syllable particles
    const particles2 = ['에서', '에게', '한테', '부터', '까지', '하고', '처럼', '보다', '마저', '조차', '께서', '께도'];
    for (const p of particles2) {
        if (word.endsWith(p) && word.length > 2) {
            return { stem: word.slice(0, -2), particle: p };
        }
    }

    // 으로 (requires batchim except ㄹ: batchim > 0 && batchim !== 8)
    if (word.endsWith('으로') && word.length > 2) {
        const prev = word[word.length - 3];
        const batchim = getHangulBatchim(prev);
        if (batchim > 0 && batchim !== 8) {
            return { stem: word.slice(0, -2), particle: '으로' };
        }
    }

    // 1-syllable particles with phonological constraints:
    const last = word[word.length - 1];
    const prev = word[word.length - 2];
    const prevBatchim = hasHangulBatchim(prev);
    const prevBatchimCode = getHangulBatchim(prev);

    if (last === '는' && !prevBatchim) return { stem: word.slice(0, -1), particle: '는' };
    if (last === '은' && prevBatchim) return { stem: word.slice(0, -1), particle: '은' };
    if (last === '를' && !prevBatchim) return { stem: word.slice(0, -1), particle: '를' };
    if (last === '을' && prevBatchim) return { stem: word.slice(0, -1), particle: '을' };
    if (last === '가' && !prevBatchim) {
        if (word.length === 2 && PROTECTED_GA_NOUNS.has(word)) {
            return null;
        }
        return { stem: word.slice(0, -1), particle: '가' };
    }
    if (last === '이' && prevBatchim) return { stem: word.slice(0, -1), particle: '이' };
    if (last === '와' && !prevBatchim) return { stem: word.slice(0, -1), particle: '와' };
    if (last === '과' && prevBatchim) return { stem: word.slice(0, -1), particle: '과' };
    // 로: used when NO batchim OR with ㄹ batchim (batchim === 8)
    if (last === '로' && (!prevBatchim || prevBatchimCode === 8)) {
        return { stem: word.slice(0, -1), particle: '로' };
    }

    // Neutral 1-syllable particles (stem >= 2 characters to avoid over-stripping roots)
    if (word.length >= 3 && (last === '의' || last === '도' || last === '만' || last === '에')) {
        return { stem: word.slice(0, -1), particle: last };
    }

    return null;
}

/**
 * Tokenize Korean or Chinese text using Intl.Segmenter
 * Adds contextual pinyin for Chinese and romanization + particle detachment for Korean
 */
export async function tokenizeKoreanChinese(text, lang) {
    const segmenter = new Intl.Segmenter(lang, { granularity: 'word' });
    const segments = [...segmenter.segment(text)];

    let pinyinFn = null;
    let pinyinList = null;
    let codePointIndices = null;
    if (lang === 'zh') {
        pinyinFn = await getPinyin();
        if (pinyinFn) {
            try {
                // Pass the complete sentence to pinyin-pro to capture n-gram context for polyphones (多音字)
                pinyinList = pinyinFn(text, { toneType: 'symbol', type: 'all' });
                // Precompute UTF-16 offset to pinyinList index mapping to handle emoji/surrogate pairs
                codePointIndices = new Map();
                let u16Offset = 0;
                for (let i = 0; i < pinyinList.length; i++) {
                    codePointIndices.set(u16Offset, i);
                    u16Offset += (pinyinList[i].origin || '').length;
                }
            } catch { }
        }
    }

    let romanizeFn = null;
    if (lang === 'ko') {
        romanizeFn = await getRomanizeKorean();
    }

    return segments
        .filter(seg => seg.isWordLike || seg.segment.trim())
        .map(seg => {
            const token = { surface: seg.segment };

            // Check for punctuation
            if (isPunctuation(seg.segment)) {
                token.isPunctuation = true;
                return token; // Skip pronunciation for punctuation
            }

            // Add Chinese Pinyin (context-aware from full sentence)
            if (lang === 'zh') {
                const hasChinese = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(token.surface);
                if (hasChinese) {
                    let slice = null;
                    if (pinyinList && codePointIndices && codePointIndices.has(seg.index)) {
                        const startIdx = codePointIndices.get(seg.index);
                        let endIdx = startIdx;
                        let u16Span = 0;
                        while (endIdx < pinyinList.length && u16Span < seg.segment.length) {
                            u16Span += (pinyinList[endIdx].origin || '').length;
                            endIdx++;
                        }
                        slice = pinyinList.slice(startIdx, endIdx);
                    } else if (pinyinList && pinyinList.length >= seg.index + seg.segment.length) {
                        slice = pinyinList.slice(seg.index, seg.index + seg.segment.length);
                    }

                    if (slice && slice.length > 0) {
                        const py = slice.map(s => s.pinyin || s.origin).filter(Boolean).join(' ');
                        if (py && py !== token.surface) {
                            token.pinyin = py;
                        }

                        // Character-level ruby parts for mono-ruby alignment
                        if (slice.some(s => s.pinyin)) {
                            token.rubyParts = slice.map(s => ({
                                text: s.origin,
                                reading: s.pinyin || undefined
                            }));
                        }
                    } else if (pinyinFn) {
                        try {
                            const py = pinyinFn(token.surface, { toneType: 'symbol', type: 'string' });
                            if (py !== token.surface) {
                                token.pinyin = py;
                            }
                        } catch { }
                    }
                }
            }

            // Add Korean Romanization & Particle Detachment
            if (lang === 'ko') {
                const detached = detachKoreanParticle(token.surface);
                if (detached) {
                    token.baseForm = detached.stem;
                    token.particle = detached.particle;
                }

                if (romanizeFn) {
                    try {
                        token.romanization = romanizeFn(token.surface);
                    } catch { }
                }
            }

            return token;
        });
}

/**
 * Tokenize English text using Intl.Segmenter and Compromise NLP
 * Attaches partOfSpeech and baseForm (lemmatization) to word tokens
 */
export async function tokenizeEnglish(text) {
    if (!text || typeof text !== 'string') return [];

    const segmenter = new Intl.Segmenter('en', { granularity: 'word' });
    const segments = [...segmenter.segment(text)];
    const nlp = await getNlp();
    const doc = nlp(text);
    const json = doc.json({ terms: true });
    const terms = json.flatMap(s => s.terms || []).filter(t => t.text);

    let termIndex = 0;

    return segments
        .filter(seg => seg.isWordLike || seg.segment.trim())
        .map(seg => {
            const token = { surface: seg.segment };
            if (!seg.isWordLike || isPunctuation(seg.segment)) {
                token.isPunctuation = true;
                return token;
            }

            if (termIndex < terms.length) {
                let term = terms[termIndex];
                const cleanSeg = seg.segment.toLowerCase().replace(/[^a-z0-9]/gi, '');
                let termClean = (term.text || '').toLowerCase().replace(/[^a-z0-9]/gi, '');

                // Align termIndex forward if behind
                while (termIndex < terms.length && termClean && !cleanSeg.startsWith(termClean) && !termClean.startsWith(cleanSeg)) {
                    termIndex++;
                    if (termIndex < terms.length) {
                        term = terms[termIndex];
                        termClean = (term.text || '').toLowerCase().replace(/[^a-z0-9]/gi, '');
                    }
                }

                // Advance termIndex past all terms that belong to this segment (e.g. contractions like "don't" -> "do" + "not")
                let combinedTermText = termClean;
                let consumedTerms = 1;
                while (
                    cleanSeg.length > combinedTermText.length &&
                    termIndex + consumedTerms < terms.length
                ) {
                    const nextTermText = (terms[termIndex + consumedTerms].text || '').toLowerCase().replace(/[^a-z0-9]/gi, '');
                    if (cleanSeg.startsWith(combinedTermText + nextTermText) || (combinedTermText + nextTermText).startsWith(cleanSeg)) {
                        combinedTermText += nextTermText;
                        consumedTerms++;
                    } else {
                        break;
                    }
                }
                termIndex += consumedTerms;

                if (term.tags && term.tags.length > 0) {
                    token.partOfSpeech = term.tags[0];
                }

                const normal = term.normal || term.text.toLowerCase();
                let lemma = normal;
                if (term.tags && term.tags.includes('Verb')) {
                    lemma = doc.match(term.text).verbs().conjugate()[0]?.Infinitive || normal;
                } else if (term.tags && term.tags.includes('Noun')) {
                    lemma = doc.match(term.text).nouns().conjugate()[0]?.Singular || normal;
                } else if (term.tags && (term.tags.includes('Adjective') || term.tags.includes('Comparative') || term.tags.includes('Superlative'))) {
                    lemma = doc.match(term.text).adjectives().conjugate()[0]?.Adjective || normal;
                }
                if (lemma && lemma.toLowerCase() !== token.surface.toLowerCase()) {
                    token.baseForm = lemma;
                }
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

/**
 * Enrich an array of transcript segments with morphological tokens.
 * - Leaves non-empty segment.tokens untouched (idempotent).
 * - Only tokenizes supported languages (ja, zh, ko, en).
 * - Safe against null/undefined segments or empty texts.
 *
 * @param {Array<{id?: number|string, text: string, start: number, duration: number, tokens?: Array}>} segments
 * @param {string} lang - Target language code
 * @returns {Promise<Array>} Enriched segments
 */
export async function enrichSegmentsWithTokens(segments, lang) {
    if (!Array.isArray(segments) || segments.length === 0) {
        return [];
    }

    const normLang = (lang || '').split('-')[0].toLowerCase();
    if (!['ja', 'zh', 'ko', 'en'].includes(normLang)) {
        return segments;
    }

    // Check if every segment already has valid tokens
    const allHaveTokens = segments.every(s => s && Array.isArray(s.tokens) && s.tokens.length > 0);
    if (allHaveTokens) {
        return segments;
    }

    // Pre-initialize tokenizer modules for performance before the map loop
    if (normLang === 'ja') await getKuromojiTokenizer().catch(() => null);
    if (normLang === 'zh') await getPinyin().catch(() => null);
    if (normLang === 'ko') await getRomanizeKorean().catch(() => null);
    if (normLang === 'en') await getNlp().catch(() => null);

    const enriched = await Promise.all(
        segments.map(async (segment) => {
            if (!segment) return segment;
            if (Array.isArray(segment.tokens) && segment.tokens.length > 0) {
                return segment;
            }

            const text = segment.text || '';
            if (!text.trim()) {
                return { ...segment, tokens: [] };
            }

            try {
                const tokens = await tokenize(text, normLang);
                return {
                    ...segment,
                    tokens: Array.isArray(tokens) ? tokens : []
                };
            } catch (err) {
                console.warn(`[Tokenizer] Segment tokenization failed for "${text}":`, err?.message);
                return {
                    ...segment,
                    tokens: []
                };
            }
        })
    );

    return enriched;
}
