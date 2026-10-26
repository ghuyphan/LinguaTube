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
        if (typeof mod.customPinyin === 'function') {
            mod.customPinyin({
                '行长': 'háng zhǎng',
                '行長': 'háng zhǎng',
                '银行行长': 'yín háng háng zhǎng',
                '銀行行長': 'yín háng háng zhǎng',
                '銀行': 'yín háng'
            });
        }
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

// Han ideograph detection (CJK Unified Ideographs, Extensions A-I, Compatibility Ideographs, etc.)
const KANJI_REGEX = /\p{Script=Han}/u;

export function hasKanji(text) {
    if (!text || typeof text !== 'string') return false;
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
let kuromojiReady = false;

export function isKuromojiReady() {
    return kuromojiReady;
}

const cdnLoader = {
    async loadArrayBuffer(url) {
        url = url.replace('.gz', '');
        const cdnUrl = 'https://cdn.jsdelivr.net/npm/@aiktb/kuromoji@1.0.2/dict/' + url;
        const res = await fetch(cdnUrl, { signal: AbortSignal.timeout(15000) });
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
        }).build().then(t => {
            kuromojiReady = true;
            return t;
        }).catch(err => {
            console.error('[Tokenizer] Initialization failed:', err.message);
            tokenizerPromise = null; // Reset on failure to allow retry
            kuromojiReady = false;
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
        const interiorKanaMatch = surface.match(/^([\p{Script=Han}]+)([\u3040-\u309F\u30A0-\u30FFー]+)([\p{Script=Han}]+)$/u);
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
 * Fast-path Japanese tokenization using native V8 Intl.Segmenter (< 0.2ms CPU)
 * Zero dictionary downloads; protects against Worker CPU 1102 limits on cold starts.
 */
export function tokenizeJapaneseFast(text) {
    if (!text || typeof text !== 'string') return [];
    const segmenter = new Intl.Segmenter('ja', { granularity: 'word' });
    const segments = [...segmenter.segment(text)];

    return segments
        .filter(seg => seg.isWordLike || seg.segment.trim())
        .map(seg => {
            const surface = seg.segment;
            const isPunc = isPunctuation(surface) && !hasKanji(surface);
            const token = { surface };
            if (isPunc) {
                token.isPunctuation = true;
                return token;
            }

            const nfkc = surface.normalize('NFKC');
            const isKana = isJapaneseKanaText(surface) || isJapaneseKanaText(nfkc);
            const kanaReading = isKana ? katakanaToHiragana(nfkc) : undefined;
            if (kanaReading) {
                token.romanization = getJapaneseRomaji(kanaReading, nfkc);
            }
            return token;
        });
}

const UNSAFE_KUROMOJI_PATTERN = /[^\u0000-\uFFFF]|[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F\u3099\u309A\u200B-\u200D\uFEFF\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/u;

function partitionJapaneseText(text) {
    const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });
    const spans = [];
    let current = null;
    for (const { segment } of segmenter.segment(text)) {
        const isSafe = !UNSAFE_KUROMOJI_PATTERN.test(segment);
        if (!current || current.isSafe !== isSafe) {
            current = { isSafe, text: segment };
            spans.push(current);
        } else {
            current.text += segment;
        }
    }
    return spans;
}

function _tokenizeKuromojiSafeSpan(spanText, tokenizer) {
    const kuromojiTokens = tokenizer.tokenize(spanText);
    const compact = s => s.replace(/\s/gu, '');
    const surfaceStr = kuromojiTokens.map(t => t.surface_form).join('');
    if (compact(surfaceStr) !== compact(spanText)) {
        // Fallback if Kuromoji dropped anything
        return tokenizeJapaneseFast(spanText);
    }

    return kuromojiTokens.map(t => {
        const token = { surface: t.surface_form };
        const isPunc = (t.pos === '記号' || t.pos === '空白' || isPunctuation(t.surface_form)) && !hasKanji(t.surface_form);
        if (isPunc) {
            token.isPunctuation = true;
        }

        const nfkc = t.surface_form.normalize('NFKC');
        const isKana = isJapaneseKanaText(t.surface_form) || isJapaneseKanaText(nfkc);
        let kanaReading = !isPunc && t.reading
            ? katakanaToHiragana(t.reading)
            : !isPunc && isKana
                ? katakanaToHiragana(nfkc)
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
            token.romanization = getJapaneseRomaji(kanaReading, nfkc);
        }

        // Add base form if different from surface
        if (t.basic_form && t.basic_form !== t.surface_form && t.basic_form !== '*') {
            token.baseForm = t.basic_form;
        }

        // Add part of speech
        if (t.pos && t.pos !== '*' && !isPunc) {
            token.partOfSpeech = t.pos;
        }

        return token;
    });
}

/**
 * Tokenize Japanese text with kuromoji
 * Only adds reading (furigana) for tokens containing kanji
 * Automatically falls back to fast Intl.Segmenter if Kuromoji initialization times out (>2000ms)
 */
export async function tokenizeJapanese(text) {
    if (!text || typeof text !== 'string') return [];
    try {
        const tokenizer = await Promise.race([
            getKuromojiTokenizer(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Kuromoji init timeout')), 10000))
        ]);

        const spans = partitionJapaneseText(text);
        const allTokens = [];
        for (const span of spans) {
            if (span.isSafe) {
                allTokens.push(..._tokenizeKuromojiSafeSpan(span.text, tokenizer));
            } else {
                allTokens.push(...tokenizeJapaneseFast(span.text));
            }
        }
        return allTokens;
    } catch (err) {
        console.warn('[Tokenizer] Kuromoji unavailable or timed out, falling back to Intl.Segmenter:', err?.message || err);
        return tokenizeJapaneseFast(text);
    }
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

const PROTECTED_KOREAN_WORDS = new Set([
    '서로', '도로', '놀이', '종이', '나이', '오이', '회의', '아이', '사이', '바위', '가위',
    '같이', '많이', '없이', '굳이', '차라리', '미리', '멀리', '빨리', '달리', '특히', '히',
    '동안', '만큼', '그만', '다만', '얼마나', '설마', '아마', '보통', '가장', '정말', '진짜',
    '오늘', '내일', '매일', '모레', '어제', '언제', '이제', '아직', '벌써', '다시', '거의',
    '지도', '온도', '태도', '속도', '제도', '포도', '기도', '시도'
]);

const PROTECTED_EUN_ADJECTIVE_STEMS = new Set([
    '같', '좋', '작', '많', '적', '높', '낮', '넓', '좁', '길', '짧', '깊', '얕',
    '밝', '어둡', '젊', '늙', '굵', '가는', '괜찮', '싫', '옳', '곧'
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

    if (PROTECTED_KOREAN_WORDS.has(word)) return null;

    // Do not strip particles from conjugated verb/adjective endings (-지만, -하는/-되는/-있는/-없는, -아도/-어도/-해도)
    if (/(?:지만|하는|되는|있는|없는|않는|시는|아도|어도|해도|워도|봐도)$/.test(word)) {
        return null;
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
    const stem1 = word.slice(0, -1);

    if (last === '는' && !prevBatchim) return { stem: stem1, particle: '는' };
    if (last === '은' && prevBatchim) {
        if (PROTECTED_EUN_ADJECTIVE_STEMS.has(stem1)) return null;
        return { stem: stem1, particle: '은' };
    }
    if (last === '를' && !prevBatchim) return { stem: stem1, particle: '를' };
    if (last === '을' && prevBatchim) return { stem: stem1, particle: '을' };
    if (last === '가' && !prevBatchim) {
        if (word.length === 2 && PROTECTED_GA_NOUNS.has(word)) {
            return null;
        }
        return { stem: stem1, particle: '가' };
    }
    if (last === '이' && prevBatchim) return { stem: stem1, particle: '이' };
    if (last === '와' && !prevBatchim) return { stem: stem1, particle: '와' };
    if (last === '과' && prevBatchim) return { stem: stem1, particle: '과' };
    // 로: used when NO batchim OR with ㄹ batchim (batchim === 8)
    if (last === '로' && (!prevBatchim || prevBatchimCode === 8)) {
        return { stem: stem1, particle: '로' };
    }

    // Neutral 1-syllable particles (stem >= 1 character, e.g. 책도, 집에, 나만, 나의)
    if (word.length >= 2 && (last === '의' || last === '도' || last === '만' || last === '에')) {
        return { stem: stem1, particle: last };
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
    const json = doc.json({ terms: true, offset: true });
    const terms = json.flatMap(s => s.terms || []).filter(t => t.text && t.offset);

    const filteredSegments = segments.filter(seg => seg.isWordLike || seg.segment.trim());

    return filteredSegments.map(seg => {
        const token = { surface: seg.segment };
        if (!seg.isWordLike || isPunctuation(seg.segment)) {
            token.isPunctuation = true;
            return token;
        }

        const segStart = seg.index;
        const segEnd = seg.index + seg.segment.length;

        // Find terms that overlap with this segment's exact span
        const matchingTerms = terms.filter(t => {
            const termStart = t.offset.start;
            const termEnd = termStart + t.offset.length;
            return (segStart <= termStart && segEnd >= termEnd) ||
                   (termStart <= segStart && termEnd >= segEnd);
        });

        if (matchingTerms.length === 0) {
            return token;
        }

        const primaryTerm = matchingTerms[0];
        const isEmailOrUrl = primaryTerm.tags?.some(tag => tag === 'Email' || tag === 'Url');
        if (isEmailOrUrl && primaryTerm.text !== seg.segment) {
            return token;
        }

        if (primaryTerm.tags && primaryTerm.tags.length > 0) {
            token.partOfSpeech = primaryTerm.tags[0];
        }

        const normal = primaryTerm.normal || primaryTerm.text.toLowerCase();
        let lemma = normal;
        if (primaryTerm.tags && primaryTerm.tags.includes('Verb')) {
            lemma = doc.match(primaryTerm.text).verbs().conjugate()[0]?.Infinitive || normal;
        } else if (primaryTerm.tags && primaryTerm.tags.includes('Noun')) {
            lemma = doc.match(primaryTerm.text).nouns().conjugate()[0]?.Singular || normal;
        } else if (primaryTerm.tags && (primaryTerm.tags.includes('Adjective') || primaryTerm.tags.includes('Comparative') || primaryTerm.tags.includes('Superlative'))) {
            lemma = doc.match(primaryTerm.text).adjectives().conjugate()[0]?.Adjective || normal;
        }

        if (lemma && lemma.toLowerCase() !== token.surface.toLowerCase()) {
            token.baseForm = lemma;
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

    // Check if every segment already has valid full tokens (not degraded fallback tokens)
    const allHaveFullTokens = segments.every(s => {
        if (!s || !Array.isArray(s.tokens) || s.tokens.length === 0) return false;
        if (normLang === 'ja' && hasKanji(s.text)) {
            return s.tokens.some(t => t.reading || t.rubyParts);
        }
        return true;
    });
    if (allHaveFullTokens) {
        return segments;
    }

    // Pre-initialize tokenizer modules for performance before the map loop with a bounded timeout
    let kuromojiAvailable = false;
    if (normLang === 'ja') {
        kuromojiAvailable = await Promise.race([
            getKuromojiTokenizer().then(() => true),
            new Promise(resolve => setTimeout(() => resolve(false), 1500))
        ]).catch(() => false);
    }
    if (normLang === 'zh') await getPinyin().catch(() => null);
    if (normLang === 'ko') await getRomanizeKorean().catch(() => null);
    if (normLang === 'en') await getNlp().catch(() => null);

    const enriched = await Promise.all(
        segments.map(async (segment) => {
            if (!segment) return segment;
            const hasFullTokens = Array.isArray(segment.tokens) && segment.tokens.length > 0 &&
                (normLang !== 'ja' || !hasKanji(segment.text) || segment.tokens.some(t => t.reading || t.rubyParts));
            if (hasFullTokens) {
                return segment;
            }

            const text = segment.text || '';
            if (!text.trim()) {
                return { ...segment, tokens: [] };
            }

            try {
                const tokens = (normLang === 'ja' && !kuromojiAvailable)
                    ? tokenizeJapaneseFast(text)
                    : await tokenize(text, normLang);
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
