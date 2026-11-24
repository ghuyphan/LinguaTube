/**
 * Shared Tokenization Utilities
 * Provides Japanese (kuromoji), Korean (Intl.Segmenter + romanization),
 * Chinese (Intl.Segmenter + pinyin), English (Intl.Segmenter + compromise),
 * and Vietnamese (Intl.Segmenter + MIT compound longest-match) tokenization.
 */

import * as kuromoji from '@patdx/kuromoji';
import { getJapaneseRomaji, isJapaneseKanaText, katakanaToHiragana } from './japanese-romaji.js';
import { SUPPORTED_LEARNING_LANGUAGE_SET } from './utils.js';
import {
    getVietnameseCompounds,
    getLoadedVietnameseCompounds,
    isVietnameseCompoundsReady,
    setVietnameseCompounds
} from '../data/vi-compounds-loader.js';
import { VI_VTB_LEXICON } from '../data/vi-vtb-lexicon.js';

export { isVietnameseCompoundsReady, setVietnameseCompounds };

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

export function isTokenizerReady(lang) {
    if (lang === 'ja') return kuromojiReady;
    if (lang === 'vi') return isVietnameseCompoundsReady();
    return true;
}

const cdnLoader = {
    async loadArrayBuffer(url) {
        if (typeof globalThis !== 'undefined' && globalThis.process?.versions?.node) {
            try {
                const fs = await import('fs');
                const path = await import('path');
                const zlib = await import('zlib');
                const gzName = url.endsWith('.gz') ? url : url + '.gz';
                const localGz = path.resolve('node_modules/@patdx/kuromoji/dict', gzName);
                if (fs.existsSync(localGz)) {
                    const buf = fs.readFileSync(localGz);
                    const decompressed = zlib.gunzipSync(buf);
                    return decompressed.buffer.slice(decompressed.byteOffset, decompressed.byteOffset + decompressed.byteLength);
                }
            } catch {
                // Fallback to CDN fetch
            }
        }
        url = url.replace('.gz', '');
        const cdnUrl = 'https://cdn.jsdelivr.net/npm/@aiktb/kuromoji@1.0.2/dict/' + url;
        const res = await fetch(cdnUrl, { signal: AbortSignal.timeout(60000) });
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

const JP_NUMERAL_BEFORE_PERSON_REGEX = /[0-9０-９十百千万億兆〇零一二三四五六七八九]$/u;

/**
 * Corrects well-known Kuromoji/IPADIC misreadings and split compounds
 * (e.g. 一+人 -> 一人(ひとり), 二+人 -> 二人(ふたり), Xの間 -> 間(あいだ)).
 */
function applyJapaneseReadingFixes(tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) return tokens;

    const merged = [];
    for (let i = 0; i < tokens.length; i++) {
        const cur = tokens[i];
        const next = tokens[i + 1];
        const prev = merged.length > 0 ? merged[merged.length - 1] : null;
        const afterNext = tokens[i + 2];

        // Merge split 一+人 -> 一人(ひとり) and 二+人 -> 二人(ふたり)
        // Guard against compound numerals (二十一人 -> にじゅういちにん) and lexicalized compounds (一人称, 二人称, 二人三脚, 二人羽織)
        if (
            next &&
            next.surface === '人' &&
            (cur.surface === '一' || cur.surface === '二') &&
            !(prev && JP_NUMERAL_BEFORE_PERSON_REGEX.test(prev.surface || '')) &&
            !(afterNext && /^(?:前|称|三|羽)/u.test(afterNext.surface || ''))
        ) {
            const surface = cur.surface + next.surface;
            const reading = cur.surface === '一' ? 'ひとり' : 'ふたり';
            merged.push({
                surface,
                reading,
                rubyParts: segmentJapaneseRuby(surface, reading),
                romanization: getJapaneseRomaji(reading, surface),
                partOfSpeech: '名詞'
            });
            i++; // consume next
            continue;
        }

        // Merge split スネ + 夫 -> スネ夫(すねお) (IPADIC splits スネ + 夫[おっと])
        if (next && cur.surface === 'スネ' && next.surface === '夫') {
            const surface = 'スネ夫';
            const reading = 'すねお';
            merged.push({
                surface,
                reading,
                rubyParts: segmentJapaneseRuby(surface, reading),
                romanization: getJapaneseRomaji(reading, surface),
                partOfSpeech: '名詞'
            });
            i++; // consume next
            continue;
        }

        merged.push(cur);
    }

    // Context-aware single-token reading fixes
    for (let i = 0; i < merged.length; i++) {
        const cur = merged[i];
        const prev = i > 0 ? merged[i - 1] : null;
        const next = i + 1 < merged.length ? merged[i + 1] : null;
        const afterNext = i + 2 < merged.length ? merged[i + 2] : null;

        // X の 間 -> あいだ (IPADIC frequently misreads standalone 間 as ま)
        // Preserve いつの間にか (いつのまにか) if ever split into いつ + の + 間 + に + か
        if (
            cur.surface === '間' &&
            cur.reading === 'ま' &&
            prev?.surface === 'の' &&
            !(next?.surface === 'に' && afterNext?.surface === 'か')
        ) {
            cur.reading = 'あいだ';
            cur.rubyParts = segmentJapaneseRuby('間', 'あいだ');
            cur.romanization = getJapaneseRomaji('あいだ', '間');
            continue;
        }

        // Single-token 一人/二人 read as いちにん/ににん outside compound suffixes
        if (
            cur.surface === '一人' &&
            cur.reading === 'いちにん' &&
            !(prev && JP_NUMERAL_BEFORE_PERSON_REGEX.test(prev.surface || '')) &&
            !(next && /^(?:前|称)/u.test(next.surface || ''))
        ) {
            cur.reading = 'ひとり';
            cur.rubyParts = segmentJapaneseRuby('一人', 'ひとり');
            cur.romanization = getJapaneseRomaji('ひとり', '一人');
        } else if (
            cur.surface === '二人' &&
            cur.reading === 'ににん' &&
            !(prev && JP_NUMERAL_BEFORE_PERSON_REGEX.test(prev.surface || '')) &&
            !(next && /^(?:称|三|羽)/u.test(next.surface || ''))
        ) {
            cur.reading = 'ふたり';
            cur.rubyParts = segmentJapaneseRuby('二人', 'ふたり');
            cur.romanization = getJapaneseRomaji('ふたり', '二人');
        }
    }

    return merged;
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
        return applyJapaneseReadingFixes(allTokens);
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

const EN_CONTRACTIONS = Object.freeze({
    "don't": { pos: 'Verb', baseForm: 'do' },
    "doesn't": { pos: 'Verb', baseForm: 'do' },
    "didn't": { pos: 'Verb', baseForm: 'do' },
    "won't": { pos: 'Verb', baseForm: 'will' },
    "wouldn't": { pos: 'Verb', baseForm: 'would' },
    "can't": { pos: 'Verb', baseForm: 'can' },
    "cannot": { pos: 'Verb', baseForm: 'can' },
    "couldn't": { pos: 'Verb', baseForm: 'can' },
    "shouldn't": { pos: 'Verb', baseForm: 'should' },
    "mustn't": { pos: 'Verb', baseForm: 'must' },
    "mightn't": { pos: 'Verb', baseForm: 'might' },
    "shan't": { pos: 'Verb', baseForm: 'shall' },
    "needn't": { pos: 'Verb', baseForm: 'need' },
    "isn't": { pos: 'Verb', baseForm: 'be' },
    "aren't": { pos: 'Verb', baseForm: 'be' },
    "wasn't": { pos: 'Verb', baseForm: 'be' },
    "weren't": { pos: 'Verb', baseForm: 'be' },
    "ain't": { pos: 'Verb', baseForm: 'be' },
    "haven't": { pos: 'Verb', baseForm: 'have' },
    "hasn't": { pos: 'Verb', baseForm: 'have' },
    "hadn't": { pos: 'Verb', baseForm: 'have' },
    "i'm": { pos: 'Pronoun', baseForm: 'i' },
    "you're": { pos: 'Pronoun', baseForm: 'you' },
    "we're": { pos: 'Pronoun', baseForm: 'we' },
    "they're": { pos: 'Pronoun', baseForm: 'they' },
    "i've": { pos: 'Pronoun', baseForm: 'i' },
    "you've": { pos: 'Pronoun', baseForm: 'you' },
    "we've": { pos: 'Pronoun', baseForm: 'we' },
    "they've": { pos: 'Pronoun', baseForm: 'they' },
    "i'll": { pos: 'Pronoun', baseForm: 'i' },
    "you'll": { pos: 'Pronoun', baseForm: 'you' },
    "he'll": { pos: 'Pronoun', baseForm: 'he' },
    "she'll": { pos: 'Pronoun', baseForm: 'she' },
    "it'll": { pos: 'Pronoun', baseForm: 'it' },
    "we'll": { pos: 'Pronoun', baseForm: 'we' },
    "they'll": { pos: 'Pronoun', baseForm: 'they' },
    "i'd": { pos: 'Pronoun', baseForm: 'i' },
    "you'd": { pos: 'Pronoun', baseForm: 'you' },
    "he'd": { pos: 'Pronoun', baseForm: 'he' },
    "she'd": { pos: 'Pronoun', baseForm: 'she' },
    "we'd": { pos: 'Pronoun', baseForm: 'we' },
    "they'd": { pos: 'Pronoun', baseForm: 'they' },
    "it's": { pos: 'Pronoun', baseForm: 'it' },
    "he's": { pos: 'Pronoun', baseForm: 'he' },
    "she's": { pos: 'Pronoun', baseForm: 'she' },
    "that's": { pos: 'Determiner', baseForm: 'that' },
    "there's": { pos: 'Pronoun', baseForm: 'there' },
    "here's": { pos: 'Adverb', baseForm: 'here' },
    "what's": { pos: 'Pronoun', baseForm: 'what' },
    "who's": { pos: 'Pronoun', baseForm: 'who' },
    "where's": { pos: 'Adverb', baseForm: 'where' },
    "let's": { pos: 'Verb', baseForm: 'let' },
    "should've": { pos: 'Verb', baseForm: 'should' },
    "shouldn't've": { pos: 'Verb', baseForm: 'should' },
    "could've": { pos: 'Verb', baseForm: 'could' },
    "couldn't've": { pos: 'Verb', baseForm: 'could' },
    "would've": { pos: 'Verb', baseForm: 'would' },
    "wouldn't've": { pos: 'Verb', baseForm: 'would' },
    "must've": { pos: 'Verb', baseForm: 'must' },
    "might've": { pos: 'Verb', baseForm: 'might' },
    "gonna": { pos: 'Verb', baseForm: 'go' },
    "wanna": { pos: 'Verb', baseForm: 'want' },
    "gotta": { pos: 'Verb', baseForm: 'get' }
});

const EN_COPULA_FORMS = new Set(['am', 'is', 'are', 'was', 'were', 'been', 'being']);

/**
 * Tokenize English text using Intl.Segmenter and Compromise NLP.
 * Attaches span-accurate partOfSpeech and baseForm (lemmatization),
 * including contraction and possessive resolution.
 */
export async function tokenizeEnglish(text) {
    if (!text || typeof text !== 'string') return [];

    const segmenter = new Intl.Segmenter('en', { granularity: 'word' });
    const segments = [...segmenter.segment(text)];
    const nlp = await getNlp();
    const doc = nlp(text);
    if (typeof doc.compute === 'function') {
        doc.compute('root');
    }
    const json = doc.json({ terms: true, offset: true, root: true });
    const terms = json.flatMap(s => s.terms || []).filter(t => t.text && t.offset);

    const filteredSegments = segments.filter(seg => seg.isWordLike || seg.segment.trim());

    return filteredSegments.map(seg => {
        const token = { surface: seg.segment };
        if (!seg.isWordLike || isPunctuation(seg.segment)) {
            token.isPunctuation = true;
            return token;
        }

        const normalizedApostrophe = seg.segment.replace(/’/g, "'").toLowerCase();
        const contraction = EN_CONTRACTIONS[normalizedApostrophe];
        if (contraction) {
            token.partOfSpeech = contraction.pos;
            if (contraction.baseForm && contraction.baseForm !== token.surface.toLowerCase()) {
                token.baseForm = contraction.baseForm;
            }
            return token;
        }

        // Possessive nouns (e.g. John's, teachers')
        const possessiveMatch = seg.segment.match(/^(.+?)(?:['’]s|['’])$/);
        if (possessiveMatch && possessiveMatch[1]) {
            token.partOfSpeech = 'Noun';
            token.baseForm = possessiveMatch[1];
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

        const tags = primaryTerm.tags || [];
        if (tags.length > 0) {
            token.partOfSpeech = tags.includes('Pronoun') ? 'Pronoun' : tags[0];
        }

        const normal = primaryTerm.normal || primaryTerm.text.toLowerCase();
        let lemma = primaryTerm.root || normal;

        if (EN_COPULA_FORMS.has(normal)) {
            lemma = 'be';
        } else if (!primaryTerm.root && tags.length > 0) {
            if (tags.includes('Verb') && (tags.includes('PastTense') || tags.includes('Gerund') || tags.includes('Participle'))) {
                lemma = nlp(primaryTerm.text).verbs().toInfinitive().text().toLowerCase() || normal;
            } else if (tags.includes('Noun') && tags.includes('Plural')) {
                lemma = nlp(primaryTerm.text).nouns().toSingular().text().toLowerCase() || normal;
            } else if (tags.includes('Comparative') || tags.includes('Superlative')) {
                lemma = nlp(primaryTerm.text).adjectives().conjugate()[0]?.Adjective || normal;
            }
        }

        if (lemma && lemma.toLowerCase() !== token.surface.toLowerCase()) {
            token.baseForm = tags.includes('ProperNoun') ? lemma : lemma.toLowerCase();
        }

        return token;
    });
}

const viSegmenter = new Intl.Segmenter('vi', { granularity: 'word' });
const MAX_VI_COMPOUND_SYLLABLES = 4;

const VI_PROPER_COMPOUNDS = new Set([
    'việt nam', 'hà nội', 'hồ chí minh', 'đà nẵng', 'sài gòn', 'huế',
    'tiếng việt', 'tiếng anh', 'tiếng nhật', 'tiếng hàn', 'tiếng trung'
]);

const VI_LEADING_BOUNDARY_WORDS = new Set([
    'đã', 'đang', 'sẽ', 'vừa', 'mới', 'không', 'chưa', 'của', 'cho', 'với',
    'từ', 'về', 'nếu', 'vì', 'khi', 'mà', 'thì', 'là', 'cũng', 'vẫn'
]);

const VI_ALLOWED_FUNCTION_COMPOUNDS = new Set([
    'không khí', 'không gian', 'không những', 'không chỉ', 'không phải', 'không thể', 'không ngờ', 'không khỏi',
    'đã từng', 'đang khi', 'sẽ không', 'vừa mới', 'mới đây', 'vì vậy', 'vì sao', 'vì thế', 'cho nên',
    'từ trước', 'từ lâu', 'về mặt', 'nếu như', 'khi nào', 'mà còn', 'thì ra', 'cũng như'
]);

const VI_PRONOUNS = new Set([
    'tôi', 'bạn', 'mình', 'ta', 'chúng tôi', 'chúng ta', 'họ', 'chúng',
    'nó', 'hắn', 'anh ấy', 'cô ấy', 'chị ấy', 'ông ấy', 'bà ấy', 'em ấy',
    'người ta', 'ai', 'gì', 'đâu', 'nào', 'đây', 'đó', 'kia', 'này', 'ấy', 'mọi người', 'các bạn'
]);

const VI_AUXILIARIES = new Set([
    'đang', 'đã', 'sẽ', 'sắp', 'vừa', 'từng', 'đã từng', 'vẫn', 'còn',
    'có thể', 'không thể', 'phải', 'cần', 'nên', 'hãy', 'đừng', 'chớ', 'bị', 'được'
]);

const VI_CLASSIFIERS = new Set([
    'cái', 'con', 'chiếc', 'cuốn', 'quyển', 'bức', 'tấm', 'tờ', 'bài', 'ngôi',
    'cây', 'quả', 'trái', 'bông', 'đóa', 'căn', 'tòa', 'chiến', 'viên', 'hạt',
    'bộ', 'đôi', 'cặp', 'món', 'vụ', 'cuộc', 'cơn', 'trận', 'chuyến', 'người'
]);

const VI_CONJUNCTIONS = new Set([
    'và', 'hay', 'hoặc', 'nhưng', 'nhưng mà', 'tuy', 'tuy nhiên', 'mặc dù', 'dù', 'dẫu',
    'vì', 'bởi vì', 'nên', 'cho nên', 'vì vậy', 'do đó', 'nếu', 'thì', 'mà', 'song',
    'ngoài ra', 'hơn nữa', 'đồng thời', 'miễn là', 'trừ khi', 'trừ phi', 'hóa ra', 'tóm lại', 'trái lại'
]);

const VI_PREPOSITIONS = new Set([
    'của', 'ở', 'tại', 'trong', 'ngoài', 'trên', 'dưới', 'trước', 'sau', 'bên', 'giữa',
    'với', 'cho', 'từ', 'đến', 'tới', 'về', 'theo', 'bằng', 'qua', 'sang', 'đối với', 'so với', 'dựa trên', 'xét về', 'về mặt'
]);

const VI_ADVERBS = new Set([
    'không', 'chưa', 'chẳng', 'chả', 'rất', 'hơi', 'quá', 'lắm', 'khá', 'cực kỳ', 'vô cùng',
    'cũng', 'đều', 'chỉ', 'lại', 'luôn', 'ngay', 'thậm chí', 'dần dần', 'hầu như', 'đặc biệt', 'thường xuyên'
]);

const VI_DEGREE_ADVERBS = new Set(['rất', 'hơi', 'khá', 'quá', 'cực kỳ', 'vô cùng', 'hết sức']);

const VI_FINAL_PARTICLES = new Set([
    'nhé', 'nha', 'nhỉ', 'ạ', 'à', 'ư', 'hả', 'đấy', 'đó', 'cơ', 'chứ', 'thôi', 'đâu', 'vậy', 'sao', 'nữa'
]);

const VI_INTERJECTIONS = new Set([
    'xin chào', 'chào', 'cảm ơn', 'tạm biệt', 'xin lỗi', 'vâng', 'dạ', 'ừ', 'ờ', 'ôi', 'trời ơi', 'á'
]);

const VI_NUMERALS = new Set([
    'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười',
    'trăm', 'nghìn', 'ngàn', 'triệu', 'tỷ', 'vài', 'mấy', 'nhiều', 'ít', 'mỗi', 'mọi', 'từng', 'những', 'các'
]);

const VI_SENTENCE_END_RE = /^[.!?…]$/;

function isStartsUpper(str) {
    if (!str) return false;
    const first = str[0];
    return first !== first.toLowerCase() && first === first.toUpperCase();
}

function getVtbFreq(phrase) {
    const entry = VI_VTB_LEXICON[phrase];
    return entry ? entry[0] : 0;
}

/**
 * Segment Vietnamese text using Intl.Segmenter('vi') plus corpus-informed
 * 4->2 syllable compound merging with proper-name and function-word boundary guards.
 */
export function mergeVietnameseCompounds(text, compounds = getLoadedVietnameseCompounds()) {
    if (!text || typeof text !== 'string') return [];

    const rawSegments = [...viSegmenter.segment(text)];
    // Normalize each word-like syllable once to avoid repeated NFC + lowercase work inside lookahead loops
    const normSegments = rawSegments.map(s => (s.isWordLike ? s.segment.normalize('NFC').toLowerCase() : ''));
    const tokens = [];

    for (let i = 0; i < rawSegments.length; i++) {
        const seg = rawSegments[i];
        if (!seg.isWordLike || isPunctuation(seg.segment)) {
            if (seg.segment.trim()) {
                tokens.push({ surface: seg.segment, isPunctuation: true });
            }
            continue;
        }

        // Collect up to 4 contiguous word-like segments separated strictly by whitespace
        const wordIndices = [i];
        let cursor = i + 1;
        while (wordIndices.length < MAX_VI_COMPOUND_SYLLABLES && cursor + 1 < rawSegments.length) {
            const gap = rawSegments[cursor];
            const next = rawSegments[cursor + 1];
            if (gap.isWordLike || gap.segment.trim() !== '') break;
            if (!next.isWordLike || isPunctuation(next.segment)) break;
            wordIndices.push(cursor + 1);
            cursor += 2;
        }

        let matched = null;
        for (let len = wordIndices.length; len >= 2; len--) {
            let normalized = normSegments[wordIndices[0]];
            let hasLowerToUpperBoundary = false;
            const firstUpper = isStartsUpper(rawSegments[wordIndices[0]].segment);
            for (let k = 1; k < len; k++) {
                const idx = wordIndices[k];
                normalized += ' ' + normSegments[idx];
                if (!firstUpper && isStartsUpper(rawSegments[idx].segment)) {
                    hasLowerToUpperBoundary = true;
                }
            }

            if (!compounds.has(normalized) && !VI_VTB_LEXICON[normalized]) continue;

            // Guard 1: Do not glue lowercase function/pronoun word to capitalized mid-sentence proper noun
            if (hasLowerToUpperBoundary && !VI_PROPER_COMPOUNDS.has(normalized)) {
                continue;
            }

            // Guard 2: Protect core leading function markers unless compound is verified in VTB or allowlist
            const firstLower = normSegments[wordIndices[0]];
            if (
                VI_LEADING_BOUNDARY_WORDS.has(firstLower) &&
                !VI_ALLOWED_FUNCTION_COMPOUNDS.has(normalized) &&
                getVtbFreq(normalized) < 3
            ) {
                continue;
            }

            // Guard 3: If candidate is absent from gold VTB corpus, yield to a frequent VTB compound starting at syllable 2
            if (getVtbFreq(normalized) === 0 && wordIndices.length >= 3) {
                let tailHasStrongVtb = false;
                for (let tailLen = Math.min(wordIndices.length - 1, 3); tailLen >= 2; tailLen--) {
                    let tailNorm = normSegments[wordIndices[1]];
                    for (let k = 2; k <= tailLen; k++) {
                        tailNorm += ' ' + normSegments[wordIndices[k]];
                    }
                    if (getVtbFreq(tailNorm) >= 5) {
                        tailHasStrongVtb = true;
                        break;
                    }
                }
                if (tailHasStrongVtb) continue;
            }

            const startIdx = seg.index;
            const lastIdx = wordIndices[len - 1];
            const lastSeg = rawSegments[lastIdx];
            const surface = text.slice(startIdx, lastSeg.index + lastSeg.segment.length);
            matched = {
                token: normalized !== surface ? { surface, baseForm: normalized } : { surface },
                lastSegIndex: lastIdx
            };
            break;
        }

        if (matched) {
            tokens.push(matched.token);
            i = matched.lastSegIndex;
        } else {
            const normalized = normSegments[i];
            tokens.push(normalized !== seg.segment ? { surface: seg.segment, baseForm: normalized } : { surface: seg.segment });
        }
    }

    return tokens;
}

/**
 * Attach contextual Part-of-Speech tags to Vietnamese tokens using the compiled
 * UD_Vietnamese-VTB lexicon, closed-class lexicons, and neighbor disambiguation.
 */
export function tagVietnameseTokens(tokens) {
    if (!Array.isArray(tokens) || tokens.length === 0) return tokens;

    const wordPositions = [];
    for (let i = 0; i < tokens.length; i++) {
        if (!tokens[i].isPunctuation) wordPositions.push(i);
    }

    const posByIdx = new Array(tokens.length).fill(undefined);

    // Pass 1: Closed-class & VTB lexical lookup
    for (const idx of wordPositions) {
        const t = tokens[idx];
        const norm = (t.baseForm || t.surface).normalize('NFC').toLowerCase();

        if (/^\d+(?:[.,:/-]\d+)*$/.test(norm)) {
            posByIdx[idx] = 'Numeral';
            continue;
        }
        if (VI_INTERJECTIONS.has(norm)) {
            posByIdx[idx] = 'Interjection';
            continue;
        }
        if (VI_AUXILIARIES.has(norm)) {
            posByIdx[idx] = 'Auxiliary';
            continue;
        }
        if (VI_PRONOUNS.has(norm)) {
            posByIdx[idx] = 'Pronoun';
            continue;
        }
        if (VI_CONJUNCTIONS.has(norm)) {
            posByIdx[idx] = 'Conjunction';
            continue;
        }
        if (VI_PREPOSITIONS.has(norm)) {
            posByIdx[idx] = 'Preposition';
            continue;
        }
        if (VI_ADVERBS.has(norm)) {
            posByIdx[idx] = 'Adverb';
            continue;
        }
        if (VI_NUMERALS.has(norm)) {
            posByIdx[idx] = 'Numeral';
            continue;
        }

        const vtb = VI_VTB_LEXICON[norm];
        if (vtb) {
            posByIdx[idx] = vtb[1];
        } else if (VI_CLASSIFIERS.has(norm)) {
            posByIdx[idx] = 'Classifier';
        } else if (VI_FINAL_PARTICLES.has(norm)) {
            posByIdx[idx] = 'Particle';
        }
    }

    // Pass 2: Neighbor-based contextual disambiguation
    for (let w = 0; w < wordPositions.length; w++) {
        const idx = wordPositions[w];
        const t = tokens[idx];
        const norm = (t.baseForm || t.surface).normalize('NFC').toLowerCase();
        const prevIdx = w > 0 ? wordPositions[w - 1] : -1;
        const nextIdx = w + 1 < wordPositions.length ? wordPositions[w + 1] : -1;
        const prevNorm = prevIdx !== -1 ? (tokens[prevIdx].baseForm || tokens[prevIdx].surface).toLowerCase() : '';
        const nextNorm = nextIdx !== -1 ? (tokens[nextIdx].baseForm || tokens[nextIdx].surface).toLowerCase() : '';
        const nextRawToken = idx + 1 < tokens.length ? tokens[idx + 1] : null;
        const atClauseEnd = nextIdx === -1 || (nextRawToken?.isPunctuation && VI_SENTENCE_END_RE.test(nextRawToken.surface.trim()));

        if (atClauseEnd && (VI_FINAL_PARTICLES.has(norm) || norm === 'không' || norm === 'chưa' || norm === 'rồi')) {
            posByIdx[idx] = 'Particle';
            continue;
        }

        if (norm === 'hay') {
            if (VI_DEGREE_ADVERBS.has(prevNorm)) {
                posByIdx[idx] = 'Adjective';
            } else if (posByIdx[nextIdx] === 'Verb' && (posByIdx[prevIdx] === 'Pronoun' || posByIdx[prevIdx] === 'Noun')) {
                posByIdx[idx] = 'Adverb';
            } else {
                posByIdx[idx] = 'Conjunction';
            }
            continue;
        }

        if (norm === 'mới') {
            if (posByIdx[prevIdx] === 'Noun' && (atClauseEnd || posByIdx[nextIdx] === 'Preposition' || posByIdx[nextIdx] === 'Conjunction')) {
                posByIdx[idx] = 'Adjective';
            } else if (posByIdx[nextIdx] === 'Verb' || posByIdx[nextIdx] === 'Auxiliary') {
                posByIdx[idx] = 'Adverb';
            }
            continue;
        }

        if (norm === 'vừa') {
            if (VI_DEGREE_ADVERBS.has(prevNorm) || (posByIdx[prevIdx] === 'Verb' && atClauseEnd)) {
                posByIdx[idx] = 'Adjective';
            } else if (posByIdx[nextIdx] === 'Verb' || posByIdx[nextIdx] === 'Adjective') {
                posByIdx[idx] = 'Adverb';
            }
            continue;
        }

        if (norm === 'được' || norm === 'bị') {
            if (VI_DEGREE_ADVERBS.has(prevNorm) || (norm === 'được' && nextNorm === 'rồi')) {
                posByIdx[idx] = 'Adjective';
            } else if (posByIdx[nextIdx] === 'Verb' || posByIdx[nextIdx] === 'Noun' || posByIdx[nextIdx] === 'Pronoun' || posByIdx[prevIdx] === 'Verb') {
                posByIdx[idx] = 'Auxiliary';
            } else {
                posByIdx[idx] = 'Verb';
            }
            continue;
        }

        if (VI_CLASSIFIERS.has(norm)) {
            if (nextIdx !== -1 && (posByIdx[nextIdx] === 'Noun' || !posByIdx[nextIdx])) {
                posByIdx[idx] = 'Classifier';
                if (!posByIdx[nextIdx]) posByIdx[nextIdx] = 'Noun';
            } else if (!posByIdx[idx]) {
                posByIdx[idx] = 'Noun';
            }
            continue;
        }

        if (!posByIdx[idx]) {
            if (posByIdx[prevIdx] === 'Classifier' || prevNorm === 'những' || prevNorm === 'các' || prevNorm === 'mỗi') {
                posByIdx[idx] = 'Noun';
            } else if (VI_DEGREE_ADVERBS.has(prevNorm)) {
                posByIdx[idx] = 'Adjective';
            } else if (posByIdx[prevIdx] === 'Auxiliary' && prevNorm !== 'được' && prevNorm !== 'bị') {
                posByIdx[idx] = 'Verb';
            }
        }
    }

    return tokens.map((t, i) => (posByIdx[i] && !t.isPunctuation) ? { ...t, partOfSpeech: posByIdx[i] } : t);
}

export async function tokenizeVietnamese(text, options = {}) {
    if (!text || typeof text !== 'string') return [];
    const compounds = options?.compounds instanceof Set
        ? options.compounds
        : await getVietnameseCompounds(options);
    const merged = mergeVietnameseCompounds(text, compounds);
    return tagVietnameseTokens(merged);
}

/**
 * Tokenize text based on language
 */
export async function tokenize(text, lang, options = {}) {
    if (!text || typeof text !== 'string') {
        return [];
    }

    if (lang === 'ja') {
        return tokenizeJapanese(text);
    }

    if (lang === 'en') {
        return tokenizeEnglish(text);
    }

    if (lang === 'vi') {
        return tokenizeVietnamese(text, options);
    }

    return tokenizeKoreanChinese(text, lang);
}

/**
 * Whether a single transcript segment still needs morphological enrichment.
 * Japanese segments require POS tags (and readings when kanji are present),
 * so degraded Intl.Segmenter fallback tokens are re-enriched once Kuromoji is ready.
 */
export function segmentNeedsEnrichment(segment, lang) {
    if (!segment) return false;
    const text = segment.text || '';
    if (!text.trim()) return false;
    if (!Array.isArray(segment.tokens) || segment.tokens.length === 0) return true;
    const normLang = (lang || '').split('-')[0].toLowerCase();
    if (normLang === 'ja') {
        const words = segment.tokens.filter(t => t && !t.isPunctuation && (t.surface || '').trim());
        if (words.length > 0 && !words.some(t => typeof t.partOfSpeech === 'string' && t.partOfSpeech.trim())) {
            return true;
        }
        if (hasKanji(text) && !segment.tokens.some(t => t.reading || t.rubyParts)) {
            return true;
        }
    }
    return false;
}

export function segmentsNeedEnrichment(segments, lang) {
    if (!Array.isArray(segments) || segments.length === 0) return false;
    const normLang = (lang || '').split('-')[0].toLowerCase();
    if (!SUPPORTED_LEARNING_LANGUAGE_SET.has(normLang)) return false;
    return segments.some(s => segmentNeedsEnrichment(s, normLang));
}

/**
 * Enrich an array of transcript segments with morphological tokens.
 * - Leaves already-rich segment.tokens untouched (idempotent).
 * - Only tokenizes supported learning languages (ja, zh, ko, en, vi).
 * - Safe against null/undefined segments or empty texts.
 *
 * @param {Array<{id?: number|string, text: string, start: number, duration: number, tokens?: Array}>} segments
 * @param {string} lang - Target language code
 * @param {{allowFallback?: boolean, kuromojiTimeoutMs?: number, assets?: any, requestUrl?: string}} [options]
 * @returns {Promise<Array|null>} Enriched segments, or null if allowFallback is false and Kuromoji is unavailable
 */
export async function enrichSegmentsWithTokens(segments, lang, { allowFallback = true, kuromojiTimeoutMs = 1500, assets, requestUrl } = {}) {
    if (!Array.isArray(segments) || segments.length === 0) {
        return [];
    }

    const normLang = (lang || '').split('-')[0].toLowerCase();
    if (!SUPPORTED_LEARNING_LANGUAGE_SET.has(normLang)) {
        return segments;
    }

    if (!segmentsNeedEnrichment(segments, normLang)) {
        return segments;
    }

    // Pre-initialize tokenizer modules for performance before the map loop with a bounded timeout
    let kuromojiAvailable = false;
    if (normLang === 'ja') {
        kuromojiAvailable = await Promise.race([
            getKuromojiTokenizer().then(() => true),
            new Promise(resolve => setTimeout(() => resolve(false), kuromojiTimeoutMs))
        ]).catch(() => false);
        if (!kuromojiAvailable && !allowFallback) {
            return null;
        }
    }
    if (normLang === 'zh') await getPinyin().catch(() => null);
    if (normLang === 'ko') await getRomanizeKorean().catch(() => null);
    if (normLang === 'en') await getNlp().catch(() => null);
    if (normLang === 'vi') await getVietnameseCompounds({ assets, requestUrl }).catch(() => null);

    const tokenizeOptions = normLang === 'vi' ? { assets, requestUrl } : undefined;
    const enriched = await Promise.all(
        segments.map(async (segment) => {
            if (!segment) return segment;
            if (!segmentNeedsEnrichment(segment, normLang)) {
                return segment;
            }

            const text = segment.text || '';
            if (!text.trim()) {
                return { ...segment, tokens: [] };
            }

            try {
                const tokens = (normLang === 'ja' && !kuromojiAvailable)
                    ? tokenizeJapaneseFast(text)
                    : await tokenize(text, normLang, tokenizeOptions);
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
