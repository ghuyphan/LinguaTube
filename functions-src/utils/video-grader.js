import catalog from '../data/video-grading-catalog.mjs';
import { labelToTier, scoreToLevelLabel } from '../data/video-info-db.js';
import { estimateTranscriptLevel } from './level-estimator.js';

const normalize = text => text.toLowerCase().replace(/[\s~～〜。、・·….,，?？！!:：;；"“”‘’'()\[\]{}（）【】+＋\-－_/／|#\x60]+/g, '');
const pos = token => (token.partOfSpeech || '').toLowerCase();
const NOUN_POS = new Set(['n', 'nn', 'nns', 'nnp', 'nnps', 'nng', 'nnb', 'np', 'nr', 'ns', 'nt', 'nz', 'noun', 'propernoun', 'pronoun', 'prp', 'r']);
const ADJ_POS = new Set(['a', 'ad', 'an', 'adj', 'adjective', 'jj', 'jjr', 'jjs', 'va']);
const ZH_MEASURES = new Set('个 位 本 张 件 条 只 辆 间 块 元 斤 次 遍 天 年 月 点 分 种 些 杯 瓶 碗 双 把 台 家 门 首 岁'.split(' '));
const ZH_TIMES = new Set('今天 明天 昨天 现在 以后 以前 时候 小时 分钟 星期 周 早上 晚上 中午 下午 上午 刚才 去年 明年 今年 三天 两天 一年 两年 三年'.split(' '));
const ZH_NUM_RE = /^[零一二两三四五六七八九十百千万亿\d]+$/;
const noun = token => { const p = pos(token); return NOUN_POS.has(p) || p.startsWith('noun') || p.includes('名詞') || p.includes('명사'); };
const endingNoun = token => /^(noun|n$|nng$|nnp$)|名詞|명사/.test(pos(token));
const verb = token => /^verb|動詞/.test(pos(token)) && !pos(token).includes('助動詞');
const sentenceEnd = token => token.isPunctuation && /^[。！？.!?]$/.test(token.surface);
const adverb = token => /^(adverb|rb|rbr|rbs)$/.test(pos(token));
const own = (map, key) => Object.hasOwn(map, key) ? map[key] : undefined;
const participles = new Set('been done gone seen taken come made read said bought brought left felt found written spoken eaten'.split(' '));

function endsWithRieulBatchim(surface) {
    if (!surface) return false;
    const code = surface.charCodeAt(surface.length - 1);
    return code >= 0xAC00 && code <= 0xD7A3 && ((code - 0xAC00) % 28) === 8;
}

function matchConcat(surfaces, tokens, target, from) {
    for (let i = from; i < surfaces.length; i++) {
        if (tokens[i].isPunctuation || !surfaces[i]) continue;
        let acc = '';
        for (let j = i; j < surfaces.length && j < i + 3; j++) {
            if (tokens[j].isPunctuation) break;
            acc += surfaces[j];
            if (acc === target) return [i, j];
            if (acc.length >= target.length) break;
        }
    }
    return null;
}

function matchesSlot(slot, token, surface, base, allowOpenUntagged = false) {
    if (slot.op === 'surf') return surface === slot.val || base === slot.val;
    if (slot.op !== 'pos') return true;
    const p = pos(token);
    switch (slot.pos) {
        case 'noun': return p ? noun(token) : allowOpenUntagged;
        case 'verb': return p ? (/^(v$|vb|vv$|vx$)|verb|동사/.test(p) || (p.includes('動詞') && !p.includes('助動詞'))) : allowOpenUntagged;
        case 'adj': return p ? (ADJ_POS.has(p) || /adj|形容詞|형용사/.test(p)) : allowOpenUntagged;
        case 'num': return /^(m|cd)$|num/.test(p) || ZH_NUM_RE.test(token.surface);
        case 'measure': return /^q$|measure|助数詞/.test(p) || (!p && ZH_MEASURES.has(token.surface));
        case 'time': return /^t$|time|temporal/.test(p) || (!p && (ZH_TIMES.has(token.surface) || /(年|月|天|小时|分钟)$/.test(token.surface)));
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
    const {
        sequences, endings, auxiliaries, correlatives, templates, stoplist,
        phrasalVerbs = null, guardedSequences = null
    } = catalog[lang];
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
            if (tokens[i].isPunctuation || tokens[i + 1].isPunctuation) continue;
            if (connective === '수') {
                if (tokens[i].surface !== '수' || !tokens[i + 1].surface.startsWith(stem)) continue;
                if (i === 0 || tokens[i - 1].isPunctuation || !endsWithRieulBatchim(tokens[i - 1].surface)) continue;
            } else {
                if (noun(tokens[i])) continue;
                if (!tokens[i].surface.endsWith(connective) || !tokens[i + 1].surface.startsWith(stem)) continue;
            }
            add(pattern, i, i + 1, [i, i + 1]);
        }
    }
    for (const [head, tail, pattern] of correlatives) {
        let cursor = 0;
        while (cursor < tokens.length) {
            const headHit = matchConcat(surfaces, tokens, head, cursor);
            if (!headHit) break;
            const tailHit = matchConcat(surfaces, tokens, tail, headHit[1] + 1);
            if (!tailHit) break;
            const broken = tokens.slice(headHit[1] + 1, tailHit[0]).some(sentenceEnd);
            if (!broken) {
                const indices = [];
                for (let k = headHit[0]; k <= headHit[1]; k++) indices.push(k);
                for (let k = tailHit[0]; k <= tailHit[1]; k++) indices.push(k);
                add(pattern, headHit[0], tailHit[1], indices);
            }
            cursor = (!broken && head === tail) ? tailHit[1] + 1 : headHit[0] + 1;
        }
    }
    if (lang === 'en') tenseMatches(tokens, surfaces, sequences, add);
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].isPunctuation) continue;
        for (const { pattern, anchorSlot, slots } of own(templates, surfaces[i]) ?? own(templates, bases[i]) ?? []) {
            const indices = [];
            const allowOpenUntagged = slots.filter(s => s.op === 'surf').length >= 2;
            const accepts = (slot, j) => tokens[j] && !tokens[j].isPunctuation &&
                matchesSlot(slot, tokens[j], surfaces[j], bases[j], allowOpenUntagged);
            let matchedSurf = 0;
            let usedUntaggedOpen = false;
            let left = i - 1;
            let valid = true;
            for (let s = anchorSlot - 1; s >= 0; s--) {
                const min = slots[s].min ?? 1;
                if (!accepts(slots[s], left)) {
                    if (min === 0) continue;
                    valid = false;
                    break;
                }
                if (slots[s].op === 'surf') matchedSurf++;
                if (slots[s].op === 'pos' && !pos(tokens[left]) && /^(noun|verb|adj)$/.test(slots[s].pos)) usedUntaggedOpen = true;
                if (slots[s].bind !== false && !noun(tokens[left])) indices.push(left);
                left--;
            }
            if (!valid) continue;
            matchedSurf++;
            if (slots[anchorSlot].bind !== false) indices.push(i);
            let right = i + 1;
            for (const slot of slots.slice(anchorSlot + 1)) {
                let count = 0;
                const min = slot.min ?? 1;
                while (count < (slot.max ?? 1) && accepts(slot, right)) {
                    if (slot.op === 'surf') matchedSurf++;
                    if (slot.op === 'pos' && !pos(tokens[right]) && /^(noun|verb|adj)$/.test(slot.pos)) usedUntaggedOpen = true;
                    if (slot.bind !== false && !noun(tokens[right])) indices.push(right);
                    right++;
                    count++;
                }
                if (count < min) { valid = false; break; }
            }
            if (valid && indices.length && (!usedUntaggedOpen || matchedSurf >= 2)) add(pattern, left + 1, right - 1, indices);
        }
    }
    if (phrasalVerbs) {
        const isVerbToken = t => !pos(t) || /^(v$|vb|vv$|vx$)|verb/.test(pos(t));
        for (let i = 0; i + 1 < tokens.length; i++) {
            if (tokens[i].isPunctuation || !isVerbToken(tokens[i])) continue;
            const list = own(phrasalVerbs, bases[i]) ?? own(phrasalVerbs, surfaces[i]);
            if (!list) continue;
            for (const [particle, separable, pattern] of list) {
                const maxJ = separable ? Math.min(tokens.length - 1, i + 4) : i + 1;
                for (let j = i + 1; j <= maxJ; j++) {
                    if (tokens[j].isPunctuation) break;
                    if (surfaces[j] === particle) {
                        add(pattern, i, j, [i, j]);
                        break;
                    }
                    if (j > i + 1 && pos(tokens[j]) && isVerbToken(tokens[j]) && !noun(tokens[j])) break;
                }
            }
        }
    }
    if (guardedSequences) {
        for (const rule of guardedSequences) {
            let cursor = 0;
            while (cursor < tokens.length) {
                const hit = matchConcat(surfaces, tokens, rule.key, cursor);
                if (!hit) break;
                const [start, end] = hit;
                cursor = end + 1;
                if (rule.excludePrev && start > 0 && !tokens[start - 1].isPunctuation && rule.excludePrev.includes(surfaces[start - 1])) continue;
                if (rule.excludeNext && end + 1 < tokens.length && !tokens[end + 1].isPunctuation && rule.excludeNext.includes(surfaces[end + 1])) continue;
                if (rule.prevPos && (start === 0 || tokens[start - 1].isPunctuation || !rule.prevPos.includes(pos(tokens[start - 1])))) continue;
                if (rule.nextPos && (end + 1 >= tokens.length || tokens[end + 1].isPunctuation || !rule.nextPos.includes(pos(tokens[end + 1])))) continue;
                if (rule.sentenceEnd) {
                    const atEnd = end === tokens.length - 1 || (tokens[end + 1].isPunctuation && (sentenceEnd(tokens[end + 1]) || tokens[end + 1].surface === ','));
                    if (!atEnd) continue;
                }
                const indices = [];
                for (let k = start; k <= end; k++) indices.push(k);
                add(rule.pattern, start, end, indices);
            }
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
