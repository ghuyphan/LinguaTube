import catalog from '../data/video-grading-catalog.mjs';
import { labelToTier, scoreToLevelLabel } from '../data/video-info-db.js';
import { estimateTranscriptLevel } from './level-estimator.js';

const normalize = text => text.toLowerCase().replace(/[~～〜。、・….\s?？！!,，:：;；"“”‘’'()\[\]（）【】+＋\-－\x60]/g, '');
const pos = token => (token.partOfSpeech || '').toLowerCase();
const noun = token => /^(n|r$|prp$|pronoun$)|noun|名詞|명사/.test(pos(token));
const endingNoun = token => /^(noun|n$|nng$|nnp$)|名詞|명사/.test(pos(token));
const verb = token => /^verb|動詞/.test(pos(token)) && !pos(token).includes('助動詞');
const sentenceEnd = token => token.isPunctuation && /^[。！？.!?]$/.test(token.surface);
const adverb = token => /^(adverb|rb|rbr|rbs)$/.test(pos(token));
const own = (map, key) => Object.hasOwn(map, key) ? map[key] : undefined;
const participles = new Set('been done gone seen taken come made read said bought brought left felt found written spoken eaten'.split(' '));

function matchesSlot(slot, token, surface, base) {
    if (slot.op === 'surf') return surface === slot.val || base === slot.val;
    if (slot.op !== 'pos') return true;
    switch (slot.pos) {
        case 'noun': return noun(token);
        case 'verb': return /^v|verb|動詞|동사/.test(pos(token));
        case 'adj': return /^a|adj|形容詞|형용사/.test(pos(token));
        case 'num': return /^(m|cd)$|num/.test(pos(token)) || /^\d+$/.test(token.surface);
        case 'measure': return /^q$|measure|助数詞/.test(pos(token));
        case 'time': return /^t$|time|temporal/.test(pos(token));
        default: return true;
    }
}

function tenseMatches(tokens, surfaces, sequences, add) {
    const content = start => {
        while (start < tokens.length && !tokens[start].isPunctuation && adverb(tokens[start])) start++;
        return start;
    };
    const isVerb = i => i < tokens.length && !tokens[i].isPunctuation &&
        (!pos(tokens[i]) || /^v$|^vb|verb/.test(pos(tokens[i])));
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.isPunctuation) continue;
        const surface = token.surface.toLowerCase().replace(/’/g, "'");
        const base = (token.baseForm || '').toLowerCase();
        const isBe = /^(am|is|are|was|were)$/.test(surface) || (base === 'be' && /^'(m|s|re)$/.test(surface));
        const isHave = /^(have|has|had)$/.test(surface) || (base === 'have' && /^'(ve|s|d)$/.test(surface));
        if (!isBe && !isHave) continue;
        let previous = i - 1;
        while (previous >= 0 && adverb(tokens[previous])) previous--;
        if (previous >= 0 && /^(will|would|can|could|shall|should|may|might|must|to)$/.test(surfaces[previous])) continue;
        const j = content(i + 1);
        if (!isVerb(j)) continue;
        const past = /^(was|were|had|'d)$/.test(surface);
        const next = tokens[j].surface.toLowerCase();
        const k = content(j + 1);
        if (isHave && next === 'been' && isVerb(k) && tokens[k].surface.toLowerCase().endsWith('ing')) {
            add(sequences[past ? 'pastperfectcontinuous' : 'presentperfectcontinuous'], i, k, [i, j, k]);
        } else if (isHave && (/ed$|en$/.test(next) || participles.has(next))) {
            add(sequences[past ? 'pastperfectsimple' : 'presentperfect'], i, j, [i, j]);
        } else if (isBe && next.endsWith('ing')) {
            add(sequences[past ? 'pastcontinuous' : 'presentcontinuous'], i, j, [i, j]);
        }
    }
}

function grammarLevels(tokens, lang) {
    const { sequences, endings, auxiliaries, correlatives, templates, stoplist } = catalog[lang];
    const surfaces = tokens.map(token => normalize(token.surface));
    const bases = tokens.map(token => normalize(token.baseForm || token.surface));
    const matches = [];
    const add = (pattern, start, end, indices) => {
        if (pattern?.[0]) matches.push({ level: pattern[0], start, end, indices });
    };
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].isPunctuation || !surfaces[i]) continue;
        let surface = '', base = '';
        const indices = [];
        for (let j = i; j < Math.min(i + 5, tokens.length) && !tokens[j].isPunctuation; j++) {
            surface += surfaces[j];
            base += bases[j];
            indices.push(j);
            if (j === i && stoplist.includes(surface)) continue;
            const pattern = own(sequences, surface) ?? own(sequences, base);
            if (j === i && pattern && ((pattern[1] && noun(tokens[i])) ||
                (pattern[2] && !verb(tokens[i]) && !(i > 0 && verb(tokens[i - 1]))))) continue;
            add(pattern, i, j, [...indices]);
        }
    }
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.isPunctuation || endingNoun(token)) continue;
        const match = endings.find(([suffix]) => token.surface.length > suffix.length && token.surface.endsWith(suffix) &&
            !(suffix.length === 1 && token.surface.length <= 2 && !pos(token).includes('v')));
        if (match) add(match[1], i, i, [i]);
    }
    for (const [connective, stem, pattern] of auxiliaries) {
        for (let i = 0; i + 1 < tokens.length; i++) {
            if (!tokens[i].isPunctuation && !tokens[i + 1].isPunctuation && !endingNoun(tokens[i]) &&
                tokens[i].surface.endsWith(connective) && tokens[i + 1].surface.startsWith(stem)) {
                add(pattern, i, i + 1, [i, i + 1]);
            }
        }
    }
    for (const [head, tail, pattern] of correlatives) {
        for (let start = surfaces.indexOf(head); start >= 0;) {
            const end = surfaces.indexOf(tail, start + 1);
            if (end < 0) break;
            const broken = tokens.slice(start + 1, end).some(sentenceEnd);
            if (!broken) add(pattern, start, end, [start, end]);
            start = surfaces.indexOf(head, !broken && head === tail ? end + 1 : start + 1);
        }
    }
    if (lang === 'en') tenseMatches(tokens, surfaces, sequences, add);
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].isPunctuation) continue;
        for (const { pattern, anchorSlot, slots } of own(templates, surfaces[i]) ?? own(templates, bases[i]) ?? []) {
            const indices = [];
            const accepts = (slot, j) => tokens[j] && !tokens[j].isPunctuation &&
                matchesSlot(slot, tokens[j], surfaces[j], bases[j]);
            let left = i - 1;
            let valid = true;
            for (let s = anchorSlot - 1; s >= 0; s--, left--) {
                if (!accepts(slots[s], left)) { valid = false; break; }
                if (slots[s].bind !== false && !noun(tokens[left])) indices.push(left);
            }
            if (!valid) continue;
            if (slots[anchorSlot].bind !== false) indices.push(i);
            let right = i + 1;
            for (const slot of slots.slice(anchorSlot + 1)) {
                let count = 0;
                if (slot.op === 'gap') {
                    while (right < tokens.length && count++ < (slot.max ?? 1) && !sentenceEnd(tokens[right])) right++;
                    continue;
                }
                if (right >= tokens.length) { valid = false; break; }
                while (count < (slot.max ?? 1) && accepts(slot, right)) {
                    if (slot.bind !== false && !noun(tokens[right])) indices.push(right);
                    right++;
                    count++;
                }
                if (count < (slot.min ?? 1)) { valid = false; break; }
            }
            if (valid && indices.length) add(pattern, left + 1, right - 1, indices);
        }
    }
    matches.sort((a, b) => (b.end - b.start) - (a.end - a.start) || a.start - b.start);
    const used = new Set();
    return matches.filter(match => {
        if (match.indices.some(i => used.has(i))) return false;
        for (const i of match.indices) used.add(i);
        return true;
    }).map(match => match.level);
}

function vocabularyScore(cues, lang) {
    const texts = cues.map(cue => cue.text.trim());
    const chars = texts.reduce((sum, text) => sum + text.length, 0);
    if (lang === 'zh') return 1 + Math.min(5, Math.max(0, (chars / cues.length - 6) / 4));
    if (lang === 'ja') {
        const kanji = texts.reduce((sum, text) => sum + (text.match(/[\u4E00-\u9FAF]/g)?.length ?? 0), 0);
        const compounds = texts.reduce((sum, text) => sum + (text.match(/[\u4E00-\u9FAF]{2,}/g)?.length ?? 0), 0);
        return 1 + Math.min(2.5, kanji * 3.2 / (chars || 1)) + Math.min(1.5, compounds * 4.4 / (chars || 1));
    }
    const words = texts.flatMap(text => text.split(/\s+/).filter(Boolean));
    const long = words.filter(word => word.replace(/[^\w\s\u4E00-\u9FAF\u3040-\u309F\u30A0-\u30FF\uAC00-\uD7AF]/g, '').length >= 9).length;
    return Math.min(6, 1 + long / (words.length || 1) * (lang === 'en' ? 6 : 5));
}

function grammarNumber(label, lang) {
    if (lang === 'ja') return 6 - Number(label.match(/N([1-5])/i)?.[1] ?? 3.5);
    if (lang === 'en' || lang === 'vi') return (['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(label.match(/[ABC][12]/i)?.[0]?.toUpperCase()) + 1) || 2.5;
    return Number(label.match(/\d/)?.[0] ?? 2.5);
}

export function scoreVideoTranscript(cues, lang) {
    if (!cues.some(cue => cue.text.trim())) return null;
    if (!Object.hasOwn(catalog, lang)) return estimateTranscriptLevel(cues, lang);
    let units = 0, seconds = 0, grammarCount = 0, basic = 0, weighted = 0;
    const isWordDelimited = lang === 'en' || lang === 'vi';
    const breakdown = {};
    for (const cue of cues) {
        const text = cue.text.trim();
        units += isWordDelimited ? text.split(/\s+/).filter(Boolean).length : text.length;
        seconds += cue.duration > 0 ? cue.duration : 1;
        for (const label of grammarLevels(cue.tokens || [], lang)) {
            const score = grammarNumber(label, lang);
            grammarCount++;
            weighted += score;
            if (score <= 2.2) basic++;
            breakdown[label] = (breakdown[label] || 0) + 1;
        }
    }
    const speechRateCpm = Math.round(units / Math.max(0.1, seconds / 60));
    const diagnostics = { grammarCount, breakdown, speechRateCpm, speechRateUnit: isWordDelimited ? 'wpm' : 'cpm' };
    if (!grammarCount) {
        const fallback = estimateTranscriptLevel(cues, lang);
        return fallback && { ...fallback, ...diagnostics };
    }
    const pace = speechRateCpm < (isWordDelimited ? 120 : 180) ? 1 :
        speechRateCpm > (isWordDelimited ? 170 : 280) ? 4 : 2.5;
    const composite = 0.60 * weighted / grammarCount + 0.25 * vocabularyScore(cues, lang) + 0.15 * pace;
    const score = Number((grammarCount >= 4 && basic / grammarCount >= 0.65 ? Math.min(composite, 2.5) : composite).toFixed(1));
    const level = scoreToLevelLabel(score, lang);
    return { ...diagnostics, level, tier: labelToTier(level), score, confidence: 0.85, method: 'server_linguistics' };
}
