/**
 * Server-Side Lightweight Language Level Estimator
 * 
 * Computes fast, edge-friendly proficiency levels (JLPT / HSK / TOPIK / CEFR)
 * directly from subtitle segments and metadata in < 1ms CPU time.
 * 
 * Zero external dictionary files or heavy NLP dependencies.
 * Designed for Cloudflare Pages Functions & local Node.js server.
 */

import { detectLevelFromMetadata, labelToTier } from '../data/video-info-db.js';

// High-frequency English words >= 8 letters that are elementary (A1/A2), not advanced
const COMMON_A1_A2_LONG_WORDS = new Set([
    'everyone', 'everything', 'everybody', 'something', 'sometimes', 'somewhere',
    'anything', 'anywhere', 'nothing', 'together', 'remember', 'different',
    'difficult', 'important', 'beautiful', 'understand', 'hospital', 'question',
    'daughter', 'afternoon', 'yesterday', 'tomorrow', 'calendar', 'favorite',
    'umbrella', 'sandwich', 'computer', 'sentence', 'language', 'practice'
]);

/**
 * Maps numeric score (1.0 to 5.0/6.0) to standard language level label
 * @param {number} score
 * @param {string} lang
 * @returns {string}
 */
export function scoreToLevelLabel(score, lang) {
    const clamped = Math.max(1, score);
    if (lang === 'ja') {
        const n = Math.min(5, Math.max(1, 6 - Math.round(clamped))); // 1 -> N5, 5 -> N1
        return `JLPT N${n}`;
    }
    if (lang === 'zh') {
        const n = Math.min(6, Math.max(1, Math.round(clamped)));
        return `HSK ${n}`;
    }
    if (lang === 'ko') {
        const n = Math.min(6, Math.max(1, Math.round(clamped)));
        return `TOPIK ${n}`;
    }
    if (lang === 'en') {
        const cefr = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
        const idx = Math.min(5, Math.max(0, Math.round(clamped) - 1));
        return `CEFR ${cefr[idx]}`;
    }
    return `Level ${Math.round(clamped)}`;
}

/**
 * Maps numeric score to standard tier
 * @param {number} score
 * @param {string} lang
 * @returns {'beginner' | 'elementary' | 'intermediate' | 'upper_intermediate' | 'advanced'}
 */
export function scoreToTier(score, lang) {
    const max = (lang === 'zh' || lang === 'ko' || lang === 'en') ? 6 : 5;
    const normalized = score / max;
    if (normalized <= 0.28) return 'beginner';
    if (normalized <= 0.48) return 'elementary';
    if (normalized <= 0.68) return 'intermediate';
    if (normalized <= 0.86) return 'upper_intermediate';
    return 'advanced';
}

/**
 * Estimate language difficulty level from subtitle segments and metadata
 * 
 * @param {Array<{text?: string, start?: number, end?: number, duration?: number}>} segments
 * @param {string} lang - 'ja' | 'zh' | 'ko' | 'en'
 * @param {{title?: string, channel?: string}} [metadata]
 * @returns {{
 *   level: string,
 *   tier: 'beginner' | 'elementary' | 'intermediate' | 'upper_intermediate' | 'advanced',
 *   score: number,
 *   confidence: number,
 *   method: 'metadata' | 'server_heuristic',
 *   speechRateCpm: number,
 *   updatedAt: number
 * } | null}
 */
export function estimateTranscriptLevel(segments = [], lang = 'en', metadata = {}) {
    const cleanLang = (lang || '').toLowerCase().trim().split('-')[0].split('_')[0];
    if (!['ja', 'zh', 'ko', 'en'].includes(cleanLang)) {
        return null;
    }

    const title = metadata?.title || '';
    const channel = metadata?.channel || '';

    // Step 1: Metadata Fast-Path (Highest Confidence 0.95)
    if (title || channel) {
        const metaMatch = detectLevelFromMetadata(title, channel);
        if (metaMatch && metaMatch.lang === cleanLang) {
            const tier = labelToTier(metaMatch.level) || 'intermediate';
            let defaultScore = 2.5;
            if (tier === 'beginner') defaultScore = 1.0;
            else if (tier === 'elementary') defaultScore = 2.0;
            else if (tier === 'intermediate') defaultScore = 3.0;
            else if (tier === 'upper_intermediate') defaultScore = 4.0;
            else if (tier === 'advanced') defaultScore = 5.0;

            return {
                level: metaMatch.level,
                tier,
                score: defaultScore,
                confidence: 0.95,
                method: 'metadata',
                speechRateCpm: 0,
                updatedAt: Math.floor(Date.now() / 1000)
            };
        }
    }

    if (!Array.isArray(segments) || segments.length === 0) {
        return null;
    }

    // Step 2: Extract text, word counts, and spoken time
    let totalSpokenSeconds = 0;
    let totalChars = 0;
    let totalWords = 0;
    let totalKanji = 0;
    let compoundKanjiCount = 0;
    let totalWordLength = 0;
    let complexWordsCount = 0;
    let allText = '';

    // Stratified sample for statistical analysis (up to 80 segments)
    const sampleSegments = segments.length <= 80
        ? segments
        : (() => {
            const step = Math.floor(segments.length / 80);
            const sampled = [];
            for (let i = 0; i < segments.length && sampled.length < 80; i += step) {
                sampled.push(segments[i]);
            }
            return sampled;
        })();

    for (const seg of sampleSegments) {
        const text = (seg.text || '').trim();
        if (!text) continue;
        allText += ' ' + text;

        const dur = (seg.end != null && seg.start != null)
            ? Math.max(0.2, seg.end - seg.start)
            : Math.max(0.2, seg.duration || 1.5);
        totalSpokenSeconds += dur;

        const cleanNoSpace = text.replace(/\s+/g, '');
        totalChars += cleanNoSpace.length;

        if (cleanLang === 'ja') {
            const kanjiMatches = text.match(/[\u4E00-\u9FAF]/g);
            if (kanjiMatches) totalKanji += kanjiMatches.length;

            const compoundMatches = text.match(/[\u4E00-\u9FAF]{2,}/g);
            if (compoundMatches) compoundKanjiCount += compoundMatches.length;
        } else if (cleanLang === 'zh') {
            const idiomMatches = text.match(/[\u4E00-\u9FAF]{4}/g);
            if (idiomMatches) compoundKanjiCount += idiomMatches.length;
        } else if (cleanLang === 'ko') {
            const words = text.split(/\s+/).filter(Boolean);
            totalWords += words.length;
            for (const w of words) {
                totalWordLength += w.length;
                if (w.length >= 6) complexWordsCount++;
            }
        } else if (cleanLang === 'en') {
            const words = text.toLowerCase().match(/[a-z']+/g) || [];
            totalWords += words.length;
            for (const w of words) {
                totalWordLength += w.length;
                if (w.length >= 8 && !COMMON_A1_A2_LONG_WORDS.has(w)) {
                    complexWordsCount++;
                }
            }
        }
    }

    if (totalChars === 0 && totalWords === 0) {
        return null;
    }

    const spokenMinutes = Math.max(0.1, totalSpokenSeconds / 60);

    // Step 3: Speech Rate (CPM for CJK, WPM for English)
    const speechRate = cleanLang === 'en'
        ? Math.round(totalWords / spokenMinutes)
        : Math.round(totalChars / spokenMinutes);

    let speechRateScore = 3.0;
    if (cleanLang === 'ja') {
        if (speechRate < 200) speechRateScore = 1.0;
        else if (speechRate < 270) speechRateScore = 2.0;
        else if (speechRate < 350) speechRateScore = 3.0;
        else if (speechRate < 420) speechRateScore = 4.0;
        else speechRateScore = 5.0;
    } else if (cleanLang === 'zh') {
        if (speechRate < 160) speechRateScore = 1.0;
        else if (speechRate < 220) speechRateScore = 2.0;
        else if (speechRate < 290) speechRateScore = 3.0;
        else if (speechRate < 350) speechRateScore = 4.0;
        else speechRateScore = 5.0;
    } else if (cleanLang === 'ko') {
        if (speechRate < 180) speechRateScore = 1.0;
        else if (speechRate < 250) speechRateScore = 2.0;
        else if (speechRate < 330) speechRateScore = 3.0;
        else if (speechRate < 400) speechRateScore = 4.0;
        else speechRateScore = 5.0;
    } else if (cleanLang === 'en') {
        if (speechRate < 110) speechRateScore = 1.0;
        else if (speechRate < 140) speechRateScore = 2.0;
        else if (speechRate < 175) speechRateScore = 3.0;
        else if (speechRate < 210) speechRateScore = 4.0;
        else speechRateScore = 5.0;
    }

    // Step 4: Lexical & Structural Complexity (1.0 to 5.0/6.0)
    let lexicalScore = 2.5;
    const avgSegLen = totalChars / Math.max(1, sampleSegments.length);

    if (cleanLang === 'ja') {
        const kanjiRatio = totalChars > 0 ? totalKanji / totalChars : 0;
        const compoundRatio = sampleSegments.length > 0 ? compoundKanjiCount / sampleSegments.length : 0;

        // Calibrated: 0-10% -> 1.0 (N5), 10-18% -> 2.0 (N4), 18-25% -> 3.0 (N3), 25-32% -> 4.0 (N2), >32% -> 5.0 (N1)
        if (kanjiRatio <= 0.10) lexicalScore = 1.0 + (kanjiRatio / 0.10);
        else if (kanjiRatio <= 0.18) lexicalScore = 2.0 + ((kanjiRatio - 0.10) / 0.08);
        else if (kanjiRatio <= 0.25) lexicalScore = 3.0 + ((kanjiRatio - 0.18) / 0.07);
        else if (kanjiRatio <= 0.32) lexicalScore = 4.0 + ((kanjiRatio - 0.25) / 0.07);
        else lexicalScore = 4.5 + Math.min(0.5, (kanjiRatio - 0.32) * 4);

        if (compoundRatio > 0.8) lexicalScore += 0.2;
        if (compoundRatio > 1.4) lexicalScore += 0.3;
        lexicalScore = Math.min(5.0, Math.max(1.0, lexicalScore));
    } else if (cleanLang === 'zh') {
        // Unique characters vs total characters (lexical richness)
        const uniqueChars = new Set(allText.replace(/[\s\p{P}\p{S}]/gu, '')).size;
        const richness = totalChars > 0 ? uniqueChars / totalChars : 0.3;
        const idiomBonus = compoundKanjiCount > 3 ? 0.8 : (compoundKanjiCount > 0 ? 0.4 : 0);

        lexicalScore = 1.5 + (richness * 5.0) + idiomBonus;
        if (avgSegLen > 15) lexicalScore += 0.3;
        lexicalScore = Math.min(6.0, Math.max(1.0, lexicalScore));
    } else if (cleanLang === 'ko') {
        const avgWordLen = totalWords > 0 ? totalWordLength / totalWords : 3.0;
        const complexWordRatio = totalWords > 0 ? complexWordsCount / totalWords : 0;

        // Formal / technical speech markers
        const formalCount = (allText.match(/습니다|습니까|하십시오|하셨습니다|관련하여|대하여|통하여/g) || []).length;
        const formalBonus = formalCount > 5 ? 0.6 : (formalCount > 0 ? 0.2 : 0);

        // Calibrated: average word length 2.5-3.5 is typical basic conversation
        lexicalScore = 1.0 + Math.max(0, (avgWordLen - 3.0) * 1.2) + (complexWordRatio * 3.5) + formalBonus;
        lexicalScore = Math.min(6.0, Math.max(1.0, lexicalScore));
    } else if (cleanLang === 'en') {
        const avgWordLen = totalWords > 0 ? totalWordLength / totalWords : 4.0;
        const hardWordRatio = totalWords > 0 ? complexWordsCount / totalWords : 0;
        const wordsPerSeg = totalWords / Math.max(1, sampleSegments.length);

        // Calibrated CEFR: A1 (avgLen ~4.0, hard < 0.02) -> C1/C2 (avgLen > 5.0, hard > 0.08)
        lexicalScore = 1.0 + ((avgWordLen - 3.8) * 1.8) + (hardWordRatio * 15.0);
        if (wordsPerSeg > 14) lexicalScore += 0.4;
        lexicalScore = Math.min(6.0, Math.max(1.0, lexicalScore));
    }

    // Step 5: Composite Score (65% Lexical + 35% Speech Rate)
    const compositeScore = (0.65 * lexicalScore) + (0.35 * speechRateScore);
    const finalScore = Math.round(compositeScore * 10) / 10;

    const level = scoreToLevelLabel(finalScore, cleanLang);
    const tier = scoreToTier(finalScore, cleanLang);

    // Confidence: based on cue count
    const confidence = segments.length > 50 ? 0.85 : (segments.length > 20 ? 0.80 : 0.72);

    return {
        level,
        tier,
        score: finalScore,
        confidence,
        method: 'server_heuristic',
        speechRateCpm: speechRate,
        updatedAt: Math.floor(Date.now() / 1000)
    };
}
