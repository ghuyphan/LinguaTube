/**
 * Stateless Edge Grammar Detection Service for English (`en`) and Vietnamese (`vi`).
 *
 * Powers `POST /api/grammar-detect` using the exact same shared rules exported
 * to Flutter (`public/data/grammar/rules/{en,vi}.json`).
 */

import { EN_GRAMMAR_RULES, VI_GRAMMAR_RULES } from '../data/grammar-rules.js';
import { tokenizeEnglish, tokenizeVietnamese } from '../utils/tokenizer.js';

let nlpPromise = null;
async function getCompromise() {
    if (!nlpPromise) {
        nlpPromise = import('compromise').then(mod => mod.default || mod);
    }
    return nlpPromise;
}

const CLAUSE_BREAK_RE = /[.?!;]/;
const PHRASAL_STOP_PUNCT_RE = /[.?!;:,]/;
const EN_VERB_TAGS = new Set(['Verb', 'Infinitive', 'Imperative', 'Gerund', 'PastTense', 'Participle']);
const EN_AUX_PHRASAL_ALLOWED = new Set(['get', 'be', 'have']);

function compileSplitRules(rules) {
    return rules.map(rule => ({
        ...rule,
        leftParts: rule.left.toLowerCase().split(/\s+/),
        rightParts: rule.right.toLowerCase().split(/\s+/)
    }));
}

function compilePhrasalIndex(phrasalVerbs) {
    const byVerb = new Map();
    for (const pv of phrasalVerbs) {
        let list = byVerb.get(pv.verb);
        if (!list) {
            list = [];
            byVerb.set(pv.verb, list);
        }
        list.push(pv);
    }
    return byVerb;
}

function compileViSequenceRules(sequenceRules) {
    return sequenceRules.map(rule => {
        const patLower = rule.pattern.toLowerCase();
        return {
            ...rule,
            patLower,
            patParts: patLower.split(/\s+/),
            excludePrevSet: Array.isArray(rule.excludePrevTokens) ? new Set(rule.excludePrevTokens) : null,
            excludeNextSet: Array.isArray(rule.excludeNextTokens) ? new Set(rule.excludeNextTokens) : null,
            prevPosSet: Array.isArray(rule.requiredPrevPos) ? new Set(rule.requiredPrevPos) : null,
            nextPosSet: Array.isArray(rule.requiredNextPos) ? new Set(rule.requiredNextPos) : null
        };
    });
}

const COMPILED_EN_SPLIT_RULES = compileSplitRules(EN_GRAMMAR_RULES.splitRules);
const PHRASAL_BY_VERB = compilePhrasalIndex(EN_GRAMMAR_RULES.phrasalVerbs);
const COMPILED_VI_SEQ_RULES = compileViSequenceRules(VI_GRAMMAR_RULES.sequenceRules);
const COMPILED_VI_SPLIT_RULES = compileSplitRules(VI_GRAMMAR_RULES.splitRules);

/**
 * Compute character span `{ start, end }` for each token inside `text`,
 * falling back smoothly if token surfaces don't align 1:1.
 */
function alignTokensToText(text, tokens) {
    const spans = [];
    let cursor = 0;

    for (let i = 0; i < tokens.length; i++) {
        const tok = tokens[i];
        const surface = tok?.surface || '';
        if (!surface) {
            spans.push({ index: i, token: tok, start: cursor, end: cursor, isPunctuation: true });
            continue;
        }
        const idx = text.indexOf(surface, cursor);
        if (idx !== -1 && idx - cursor <= 12) {
            spans.push({
                index: i,
                token: tok,
                start: idx,
                end: idx + surface.length,
                isPunctuation: Boolean(tok.isPunctuation)
            });
            cursor = idx + surface.length;
        } else {
            spans.push({
                index: i,
                token: tok,
                start: cursor,
                end: cursor + surface.length,
                isPunctuation: Boolean(tok.isPunctuation)
            });
            cursor += surface.length;
        }
    }

    return spans;
}

function mapRangeToTokenIndices(tokenSpans, startChar, endChar) {
    const indices = [];
    for (const span of tokenSpans) {
        if (!span.isPunctuation && span.start < endChar && span.end > startChar) {
            indices.push(span.index);
        }
    }
    return indices;
}

function deduplicateMatches(candidates) {
    if (!candidates || candidates.length === 0) return [];

    // Higher priority wins; ties prefer wider token span then earlier position.
    const sorted = [...candidates].sort((a, b) =>
        (b.priority - a.priority) ||
        (b.tokenIndices.length - a.tokenIndices.length) ||
        ((b.endChar - b.startChar) - (a.endChar - a.startChar)) ||
        (a.startChar - b.startChar)
    );

    const usedTokens = new Set();
    const accepted = [];

    for (const m of sorted) {
        if (!m.tokenIndices || m.tokenIndices.length === 0) continue;
        if (m.tokenIndices.some(idx => usedTokens.has(idx))) continue;
        for (const idx of m.tokenIndices) usedTokens.add(idx);
        accepted.push(m);
    }

    return accepted.sort((a, b) => a.startChar - b.startChar || a.tokenIndices[0] - b.tokenIndices[0]);
}

/**
 * Shared phrase matcher supporting both exact multi-token windows and Vietnamese
 * pre-merged compound tokens whose space-joined string equals `targetParts.join(' ')`.
 */
function matchPhraseAtWords(wordsLower, idx, targetParts, targetJoined, hasBreakBeforeWord = null) {
    if (wordsLower[idx] === targetJoined) {
        return { start: idx, end: idx };
    }
    if (targetParts.length <= 1) return null;

    let joined = wordsLower[idx];
    let cursor = idx;
    while (joined.length < targetJoined.length && cursor + 1 < wordsLower.length) {
        if (hasBreakBeforeWord && hasBreakBeforeWord(cursor + 1)) return null;
        cursor++;
        joined += ' ' + wordsLower[cursor];
    }
    return joined === targetJoined ? { start: idx, end: cursor } : null;
}

/**
 * Unified clause-bounded split correlative matcher shared by EN and VI.
 */
function findSplitRuleMatches(text, wordSpans, wordsLower, compiledRules, hasBreakAfterWord = null) {
    const matches = [];
    if (wordSpans.length < 2) return matches;

    const hasBreakBefore = hasBreakAfterWord ? (wordIdx => hasBreakAfterWord(wordIdx - 1)) : null;

    for (const rule of compiledRules) {
        const leftJoined = rule.left;
        const rightJoined = rule.right;
        if (wordSpans.length < 2) continue;

        for (let i = 0; i < wordSpans.length; i++) {
            const leftHit = matchPhraseAtWords(wordsLower, i, rule.leftParts, leftJoined, hasBreakBefore);
            if (!leftHit) continue;

            const leftCharStart = wordSpans[leftHit.start].start;
            const leftCharEnd = wordSpans[leftHit.end].end;

            for (let j = leftHit.end + 1; j < wordSpans.length; j++) {
                const rightHit = matchPhraseAtWords(wordsLower, j, rule.rightParts, rightJoined, hasBreakBefore);
                if (!rightHit) continue;

                if (rule.requireMiddleWords && rightHit.start - leftHit.end <= 1) continue;
                const rightCharStart = wordSpans[rightHit.start].start;
                const rightCharEnd = wordSpans[rightHit.end].end;
                if (rule.maxSpanChars && (rightCharEnd - leftCharStart) > rule.maxSpanChars) break;

                if (rule.sameClauseOnly && CLAUSE_BREAK_RE.test(text.slice(leftCharEnd, rightCharStart))) {
                    break;
                }

                const tokenIndices = [];
                for (let k = leftHit.start; k <= leftHit.end; k++) tokenIndices.push(wordSpans[k].index);
                for (let k = rightHit.start; k <= rightHit.end; k++) tokenIndices.push(wordSpans[k].index);

                matches.push({
                    patternId: rule.id,
                    matchedText: `${text.slice(leftCharStart, leftCharEnd)} ... ${text.slice(rightCharStart, rightCharEnd)}`,
                    tokenIndices,
                    startChar: leftCharStart,
                    endChar: rightCharEnd,
                    priority: rule.priority || 88,
                    source: 'split'
                });
                break; // First matching right marker per left marker
            }
        }
    }

    return matches;
}

/**
 * Detect English grammar patterns using compromise + O(N) phrasal verb root matcher + split rules.
 */
async function detectEnglish(text, providedTokens = null) {
    if (!text || typeof text !== 'string' || !text.trim()) return [];
    const tokens = Array.isArray(providedTokens) && providedTokens.length > 0
        ? providedTokens
        : await tokenizeEnglish(text);

    const spans = alignTokensToText(text, tokens);
    const wordSpans = spans.filter(s => !s.isPunctuation);
    if (wordSpans.length === 0) return [];
    const wordsLower = wordSpans.map(s => (s.token.surface || '').toLowerCase());

    const nlp = await getCompromise();
    const doc = nlp(text);
    doc.compute('root');

    const candidates = [];

    // 1. Declarative compromise syntactic rules
    for (const rule of EN_GRAMMAR_RULES.nlpRules) {
        let matched = doc.match(rule.match);
        if (!matched.found) continue;
        if (rule.notMatch) {
            matched = matched.not(rule.notMatch);
            if (!matched.found) continue;
        }
        for (const entry of matched.json({ terms: true, offset: true })) {
            const start = entry.offset?.start;
            const len = entry.offset?.length;
            if (typeof start !== 'number' || typeof len !== 'number' || len <= 0) continue;
            const end = start + len;
            const tokenIndices = mapRangeToTokenIndices(spans, start, end);
            if (tokenIndices.length === 0) continue;

            candidates.push({
                patternId: rule.id,
                matchedText: text.slice(start, end).trim() || entry.text,
                tokenIndices,
                startChar: start,
                endChar: end,
                priority: rule.priority || 85,
                source: 'nlp'
            });
        }
    }

    // 2. Single-pass phrasal verbs via root lemma index (supports separated pronouns/nouns)
    const flatTerms = doc.json({ terms: true, offset: true }).flatMap(s => s.terms || []);
    for (let i = 0; i < flatTerms.length - 1; i++) {
        const term = flatTerms[i];
        const root = (term.root || term.normal || term.text || '').toLowerCase();
        const pvList = PHRASAL_BY_VERB.get(root);
        if (!pvList) continue;

        const tags = term.tags || [];
        if (!tags.some(t => EN_VERB_TAGS.has(t))) continue;
        if (tags.includes('Auxiliary') && !EN_AUX_PHRASAL_ALLOWED.has(root)) continue;

        const vStart = term.offset?.start;
        const vLen = term.offset?.length;
        if (typeof vStart !== 'number') continue;

        for (const pv of pvList) {
            const maxLookahead = pv.separable ? Math.min(flatTerms.length - 1, i + 4) : i + 1;
            for (let j = i + 1; j <= maxLookahead; j++) {
                if (j > i + 1 && PHRASAL_STOP_PUNCT_RE.test(flatTerms[j - 1].post || '')) break;
                const cand = flatTerms[j];
                const candNormal = (cand.normal || '').toLowerCase();
                if (candNormal === pv.particle) {
                    const pStart = cand.offset?.start;
                    const pLen = cand.offset?.length;
                    if (typeof pStart !== 'number') break;

                    const vTokens = mapRangeToTokenIndices(spans, vStart, vStart + vLen);
                    const pTokens = mapRangeToTokenIndices(spans, pStart, pStart + pLen);
                    const tokenIndices = [...new Set([...vTokens, ...pTokens])];
                    if (tokenIndices.length === 0) break;

                    candidates.push({
                        patternId: pv.id,
                        matchedText: j === i + 1
                            ? text.slice(vStart, pStart + pLen).trim()
                            : `${text.slice(vStart, vStart + vLen)} ... ${text.slice(pStart, pStart + pLen)}`,
                        tokenIndices,
                        startChar: vStart,
                        endChar: pStart + pLen,
                        priority: pv.priority || 88,
                        source: 'phrasal'
                    });
                    break;
                }
                if (j > i + 1 && (cand.tags || []).includes('Verb') && !(cand.tags || []).includes('Noun')) {
                    break;
                }
            }
        }
    }

    // 3. Clause-bounded correlative / split construction rules
    candidates.push(...findSplitRuleMatches(text, wordSpans, wordsLower, COMPILED_EN_SPLIT_RULES));

    return deduplicateMatches(candidates);
}

/**
 * Detect Vietnamese grammar constructions using UD_Vietnamese-VTB POS tags + clause bounds.
 */
async function detectVietnamese(text, providedTokens = null) {
    if (!text || typeof text !== 'string' || !text.trim()) return [];
    const tokens = Array.isArray(providedTokens) && providedTokens.length > 0
        ? providedTokens
        : await tokenizeVietnamese(text);

    const spans = alignTokensToText(text, tokens);
    const wordSpans = spans.filter(s => !s.isPunctuation);
    if (wordSpans.length === 0) return [];

    const wordsLower = wordSpans.map(s => (s.token.surface || '').toLowerCase());
    const candidates = [];

    const hasBreakBetween = (wordIdxA, wordIdxB, includeComma = false) => {
        const curTokIdx = wordSpans[wordIdxA].index;
        const nextTokIdx = wordSpans[wordIdxB].index;
        for (let t = curTokIdx + 1; t < nextTokIdx; t++) {
            const surf = tokens[t]?.surface || '';
            if (CLAUSE_BREAK_RE.test(surf) || (includeComma && surf.includes(','))) return true;
        }
        return false;
    };

    const hasClauseBreakAfterWord = wordIdx =>
        wordIdx >= wordSpans.length - 1 || hasBreakBetween(wordIdx, wordIdx + 1, true);

    const hasBreakBeforeWord = wordIdx =>
        wordIdx > 0 && hasBreakBetween(wordIdx - 1, wordIdx, true);

    // 1. Sequence & POS-guarded rules
    for (const rule of COMPILED_VI_SEQ_RULES) {
        for (let i = 0; i < wordSpans.length; i++) {
            const hit = matchPhraseAtWords(wordsLower, i, rule.patParts, rule.patLower, hasBreakBeforeWord);
            if (!hit) continue;

            const endWordIdx = hit.end;
            if (rule.excludePrevSet && i > 0 && !hasBreakBetween(i - 1, i) && rule.excludePrevSet.has(wordsLower[i - 1])) {
                continue;
            }
            if (rule.excludeNextSet && endWordIdx + 1 < wordSpans.length && !hasBreakBetween(endWordIdx, endWordIdx + 1) && rule.excludeNextSet.has(wordsLower[endWordIdx + 1])) {
                continue;
            }
            if (rule.prevPosSet) {
                if (i === 0 || hasBreakBetween(i - 1, i)) continue;
                if (!rule.prevPosSet.has(wordSpans[i - 1].token?.partOfSpeech)) continue;
            }
            if (rule.nextPosSet) {
                if (endWordIdx + 1 >= wordSpans.length || hasBreakBetween(endWordIdx, endWordIdx + 1)) continue;
                if (!rule.nextPosSet.has(wordSpans[endWordIdx + 1].token?.partOfSpeech)) continue;
            }
            if (rule.sentenceEnd && !hasClauseBreakAfterWord(endWordIdx)) continue;

            const startChar = wordSpans[i].start;
            const endChar = wordSpans[endWordIdx].end;
            const tokenIndices = [];
            for (let k = i; k <= endWordIdx; k++) tokenIndices.push(wordSpans[k].index);

            candidates.push({
                patternId: rule.id,
                matchedText: text.slice(startChar, endChar),
                tokenIndices,
                startChar,
                endChar,
                priority: rule.priority || 85,
                source: 'sequence'
            });
        }
    }

    // 2. Clause-bounded split correlatives (unified helper)
    candidates.push(...findSplitRuleMatches(text, wordSpans, wordsLower, COMPILED_VI_SPLIT_RULES, hasClauseBreakAfterWord));

    return deduplicateMatches(candidates);
}

const DETECTORS = {
    en: detectEnglish,
    vi: detectVietnamese
};

/**
 * Stateless grammar detector entrypoint.
 * Accepts either a single `{ language, text, tokens? }` OR batch `{ language, cues: [{ index?, text, tokens? }] }`.
 */
export async function detectGrammar({ language, cues, tokens, text }) {
    const lang = (language || '').split('-')[0].toLowerCase();
    const detector = DETECTORS[lang];
    if (!detector) {
        return { error: `Grammar detection not supported for language "${language}". Supported: en, vi` };
    }

    if (Array.isArray(cues)) {
        const results = await Promise.all(cues.map(async (cue, idx) => {
            const cueIndex = typeof cue?.index === 'number' ? cue.index : idx;
            const cueText = typeof cue?.text === 'string' ? cue.text : '';
            const cueTokens = Array.isArray(cue?.tokens) ? cue.tokens : null;
            const matches = cueText ? await detector(cueText, cueTokens) : [];
            return { cueIndex, matches };
        }));
        return { language: lang, results };
    }

    const resolvedText = typeof text === 'string'
        ? text
        : (Array.isArray(tokens) ? tokens.map(t => t?.surface || '').join(' ') : '');

    const matches = resolvedText ? await detector(resolvedText, tokens) : [];
    return { language: lang, matches };
}
