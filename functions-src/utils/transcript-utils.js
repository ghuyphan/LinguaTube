/**
 * Transcript cleaning utilities for Cloudflare Functions
 * Handles deduplication, merging, and timing fixes for YouTube and Whisper transcripts
 */

// Minimum gap between cues to consider them separate (in seconds)
const MIN_CUE_GAP = 0.5;
// Minimum duration for a cue (in seconds)
const MIN_CUE_DURATION = 0.5;
// Maximum duration for a single cue (prevents overly long subtitles, standard 5s)
const MAX_CUE_DURATION = 5.0;

/**
 * Clean cue text: decode HTML entities, strip tags, and remove sound annotations
 * @param {string} rawText
 * @returns {string}
 */
export function cleanCueText(rawText) {
    if (!rawText || typeof rawText !== 'string') return '';
    return rawText
        .replace(/<[^>]+>/g, '') // Strip HTML/VTT tags
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&nbsp;/g, ' ')
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/\[(?:Music|音楽|Applause|Laughter|Musique|Música)\]/gi, '')
        .replace(/[♪♫♬♩]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Clean transcript segments:
 * 1. Clean cue text & entities
 * 2. Sort by start time
 * 3. Remove duplicates at same timestamp
 * 4. Merge overlapping/similar segments
 * 5. Filter out invalid/empty segments
 * 6. Split overly long run-on segments at sentence, discourse, and length boundaries
 * 7. Apply proper timing without overlaps
 * 
 * @param {Array<{text: string, start: number, duration: number}>} segments - Raw transcript segments
 * @returns {Array<{text: string, start: number, duration: number}>} Cleaned segments
 */
export function cleanTranscriptSegments(segments) {
    if (!segments?.length) return [];

    // Step 1: Clean cue text
    const textCleaned = segments.map(seg => ({
        ...seg,
        text: cleanCueText(seg.text)
    })).filter(seg => seg.text.length > 0);

    // Step 2: Sort by start time
    const sorted = [...textCleaned].sort((a, b) => a.start - b.start);

    // Step 3: Group segments at same/very close timestamps
    const grouped = groupByTimestamp(sorted);

    // Step 4: Pick best segment from each group & merge overlaps
    const merged = mergeGroups(grouped);

    // Step 5: Filter out invalid segments
    const filtered = merged.filter(seg => seg.text?.trim().length > 0);

    // Step 6: Split run-on speech segments into natural subtitle chunks (3-tier)
    const splitSegments = splitRunOnSegments(filtered);

    // Step 7: Apply sticky timing with caps and overlap prevention
    return applyTiming(splitSegments);
}

/**
 * Group segments that start at the same time (within MIN_CUE_GAP)
 */
function groupByTimestamp(segments) {
    const groups = [];
    let currentGroup = [];
    let groupStart = -1;

    for (const seg of segments) {
        if (groupStart === -1 || Math.abs(seg.start - groupStart) <= MIN_CUE_GAP) {
            currentGroup.push(seg);
            if (groupStart === -1) groupStart = seg.start;
        } else {
            if (currentGroup.length > 0) {
                groups.push(currentGroup);
            }
            currentGroup = [seg];
            groupStart = seg.start;
        }
    }

    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }

    return groups;
}

/**
 * Pick best segment from each timestamp group (no cross-group merging)
 */
function mergeGroups(groups) {
    const result = [];

    for (const group of groups) {
        if (group.length === 1) {
            result.push({ ...group[0] });
            continue;
        }

        // Multiple segments at same timestamp - pick the best one (longest text)
        const best = group.reduce((a, b) => {
            const scoreA = (a.text?.trim().length || 0) + (a.duration * 10);
            const scoreB = (b.text?.trim().length || 0) + (b.duration * 10);
            return scoreB > scoreA ? b : a;
        });

        result.push({ ...best });
    }

    return result;
}

// Regex constants for 3-tier splitting
const CJK_REGEX = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f\uac00-\ud7af]/;
const CJK_MAJOR_PUNCT_REGEX = /(?<=[。！？!?\n])\s*/;
const LATIN_MAJOR_PUNCT_REGEX = /(?<=[.!?\n])\s+/;
const CJK_MINOR_PUNCT_REGEX = /(?<=[、，,;；:：])\s*/;
const LATIN_MINOR_PUNCT_REGEX = /(?<=[,;:])\s+/;
// Level 2: CJK discourse / clause connectors (lookahead split)
const CJK_DISCOURSE_REGEX = /(?=(?:而且|但是|所以|然后|如果|因为|就是|可是|不过|虽然|那么|首先|第二|就算|终于|这样子|对我来说|另外|其实|总之|只要|比如|けど|から|ので|のに|そして|しかし|また|だから|ただし))/;
const JA_PARTICLE_REGEX = /(?<=[はがをにでへとからまで])(?=[^\s])/;

/**
 * Sub-chunk a piece of text that has no punctuation using discourse markers or length boundaries
 * @param {string} text 
 * @param {boolean} isCJK 
 * @param {number} maxLen 
 * @returns {string[]}
 */
function chunkUnpunctuatedText(text, isCJK, maxLen) {
    if (!text || text.length <= maxLen) return [text];

    // Try Level 2: CJK discourse markers
    if (isCJK) {
        const discourseParts = text.split(CJK_DISCOURSE_REGEX).map(p => p.trim()).filter(Boolean);
        if (discourseParts.length > 1) {
            const parts = [];
            let buf = '';
            for (const dp of discourseParts) {
                if (buf && (buf.length + dp.length > maxLen)) {
                    parts.push(buf);
                    buf = dp;
                } else {
                    buf += dp;
                }
            }
            if (buf) parts.push(buf);
            if (parts.length > 1) return parts;
        }

        // Try Japanese particle boundaries
        const particleParts = text.split(JA_PARTICLE_REGEX).map(p => p.trim()).filter(Boolean);
        if (particleParts.length > 1) {
            const parts = [];
            let buf = '';
            for (const pp of particleParts) {
                if (buf && (buf.length + pp.length > maxLen)) {
                    parts.push(buf);
                    buf = pp;
                } else {
                    buf += pp;
                }
            }
            if (buf) parts.push(buf);
            if (parts.length > 1) return parts;
        }
    }

    // Level 3: Length fallback chunking (words for Latin, characters/spaces for CJK)
    const chunks = [];
    if (isCJK) {
        const targetLen = Math.min(maxLen, 22);
        let rem = text;
        while (rem.length > targetLen) {
            // Check if there's a space within the window
            const spaceIdx = rem.lastIndexOf(' ', targetLen);
            const cutIdx = spaceIdx > 12 ? spaceIdx : targetLen;
            chunks.push(rem.slice(0, cutIdx).trim());
            rem = rem.slice(cutIdx).trim();
        }
        if (rem.length > 0) chunks.push(rem);
    } else {
        const words = text.split(/\s+/);
        let buf = '';
        for (const w of words) {
            if (buf && (buf.length + 1 + w.length > maxLen)) {
                chunks.push(buf);
                buf = w;
            } else {
                buf = buf ? `${buf} ${w}` : w;
            }
        }
        if (buf) chunks.push(buf);
    }

    return chunks.length > 0 ? chunks : [text];
}

/**
 * Intelligently split overly long run-on speech segments into natural sentence cues (3-tier)
 * @param {Array<{text: string, start: number, duration: number}>} segments
 * @returns {Array<{text: string, start: number, duration: number}>}
 */
export function splitRunOnSegments(segments) {
    if (!segments?.length) return [];

    const result = [];
    for (const segment of segments) {
        const text = segment.text?.trim() || '';
        if (!text) continue;

        const isCJK = CJK_REGEX.test(text);
        const maxLen = isCJK ? 22 : 48;

        // If short enough and duration reasonable, keep as-is
        if (text.length <= maxLen && segment.duration <= 4.5) {
            result.push({
                ...segment,
                text
            });
            continue;
        }

        // Tier 1: Major sentence boundaries
        const majorParts = isCJK
            ? text.split(CJK_MAJOR_PUNCT_REGEX).map(p => p.trim()).filter(Boolean)
            : text.split(LATIN_MAJOR_PUNCT_REGEX).map(p => p.trim()).filter(Boolean);

        // Tier 2: Commas & clauses
        const refinedParts = [];
        for (const p of (majorParts.length > 0 ? majorParts : [text])) {
            if (p.length > maxLen) {
                const subParts = isCJK
                    ? p.split(CJK_MINOR_PUNCT_REGEX).map(s => s.trim()).filter(Boolean)
                    : p.split(LATIN_MINOR_PUNCT_REGEX).map(s => s.trim()).filter(Boolean);
                if (subParts.length > 1) {
                    refinedParts.push(...subParts);
                } else {
                    refinedParts.push(p);
                }
            } else {
                refinedParts.push(p);
            }
        }

        // Tier 3: Unpunctuated CJK discourse & length fallback
        const finalParts = [];
        for (const part of (refinedParts.length > 0 ? refinedParts : [text])) {
            if (part.length > maxLen) {
                finalParts.push(...chunkUnpunctuatedText(part, isCJK, maxLen));
            } else {
                finalParts.push(part);
            }
        }

        if (finalParts.length <= 1) {
            result.push({
                ...segment,
                text: finalParts[0] || text
            });
            continue;
        }

        // Proportionally interpolate timestamps based on character count
        const totalChars = finalParts.reduce((sum, p) => sum + p.length, 0);
        if (totalChars === 0) {
            result.push(segment);
            continue;
        }

        let currentStart = segment.start;
        const totalDuration = segment.duration || (MIN_CUE_DURATION * finalParts.length);

        for (let i = 0; i < finalParts.length; i++) {
            const part = finalParts[i];
            const partRatio = part.length / totalChars;
            const partDuration = Math.max(MIN_CUE_DURATION, Math.round((totalDuration * partRatio) * 100) / 100);

            result.push({
                text: part,
                start: Math.round(currentStart * 100) / 100,
                duration: Math.min(partDuration, MAX_CUE_DURATION)
            });

            currentStart += partDuration;
        }
    }

    return result;
}

/**
 * Apply sticky timing with duration caps without cue overlapping
 */
function applyTiming(segments) {
    return segments.map((segment, index) => {
        let duration;

        if (index < segments.length - 1) {
            // Sticky: extend to next segment's start time, but cap it
            const nextStart = segments[index + 1].start;
            const gap = nextStart - segment.start;
            if (gap > 0) {
                duration = Math.min(gap, MAX_CUE_DURATION);
            } else {
                duration = MIN_CUE_DURATION;
            }
        } else {
            // Last segment: use actual duration capped
            duration = Math.min(segment.duration, MAX_CUE_DURATION);
        }

        // Ensure minimum duration, but never exceed nextStart if gap is positive
        if (index < segments.length - 1) {
            const nextStart = segments[index + 1].start;
            const gap = nextStart - segment.start;
            if (gap > 0 && duration > gap) {
                duration = gap;
            }
        }

        if (duration < 0.3) {
            duration = 0.3;
        }

        return {
            text: segment.text.trim(),
            start: segment.start,
            duration: Math.round(duration * 100) / 100
        };
    });
}

/**
 * Normalize language codes from Gladia or external providers to canonical 2-letter codes
 * (e.g. 'cmn', 'mandarin', 'chinese', 'zh-CN' -> 'zh')
 * @param {string} lang
 * @returns {string}
 */
export function normalizeLanguageCode(lang) {
    if (!lang || typeof lang !== 'string') return '';
    const clean = lang.trim().toLowerCase().split('-')[0].split('_')[0];
    if (clean === 'ja' || clean === 'japanese' || clean === 'jpn') return 'ja';
    if (clean === 'ko' || clean === 'korean' || clean === 'kor') return 'ko';
    if (clean === 'zh' || clean === 'chinese' || clean === 'cmn' || clean === 'mandarin' || clean === 'yue' || clean === 'zho' || clean === 'chi') return 'zh';
    if (clean === 'en' || clean === 'english' || clean === 'eng') return 'en';
    return clean;
}

/**
 * Robustly extract segments from Gladia v2 response schemas.
 * Gladia V2 returns `item.sentence` for semantic sentences (not `item.text`),
 * and `item.text` for standard utterances.
 * 
 * Handles result.transcription.sentences, result.sentences,
 * result.sentences.results, result.transcription.utterances,
 * result.utterances, and subtitles.
 * 
 * @param {Object} resultData - Raw Gladia response or webhook payload
 * @returns {Array<{id: number, text: string, start: number, duration: number}>}
 */
export function extractGladiaSegments(resultData) {
    if (!resultData) return [];

    const res = resultData.result || resultData.payload?.result || resultData;
    const transcription = res.transcription || {};

    let rawItems = [];

    if (Array.isArray(transcription.sentences) && transcription.sentences.length > 0) {
        rawItems = transcription.sentences;
    } else if (Array.isArray(res.sentences) && res.sentences.length > 0) {
        rawItems = res.sentences;
    } else if (Array.isArray(res.sentences?.results) && res.sentences.results.length > 0) {
        rawItems = res.sentences.results;
    } else if (Array.isArray(transcription.utterances) && transcription.utterances.length > 0) {
        rawItems = transcription.utterances;
    } else if (Array.isArray(res.utterances) && res.utterances.length > 0) {
        rawItems = res.utterances;
    } else if (Array.isArray(transcription.subtitles) && transcription.subtitles.length > 0) {
        rawItems = transcription.subtitles;
    } else if (Array.isArray(res.subtitles) && res.subtitles.length > 0) {
        rawItems = res.subtitles;
    }

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
        const fullText = transcription.full_transcript || res.full_transcript;
        if (typeof fullText === 'string' && fullText.trim()) {
            return [{
                id: 0,
                text: fullText.trim(),
                start: 0,
                duration: 5.0
            }];
        }
        return [];
    }

    return rawItems.map((item, index) => {
        // Gladia sentences use item.sentence; utterances use item.text; fallback to item.transcript
        const text = (item.sentence || item.text || item.transcript || '').trim();
        const start = typeof item.start === 'number' ? item.start : (parseFloat(item.start) || 0);
        const end = typeof item.end === 'number' ? item.end : (parseFloat(item.end) || (start + (parseFloat(item.duration) || 2)));
        const duration = Math.max(0.5, end - start);

        return {
            id: index,
            text,
            start: Math.round(start * 100) / 100,
            duration: Math.round(duration * 100) / 100
        };
    }).filter(s => s.text.length > 0);
}

/**
 * Extract detected language code from Gladia v2 response
 * @param {Object} resultData 
 * @param {string} defaultLang 
 * @returns {string}
 */
export function extractGladiaDetectedLanguage(resultData, defaultLang = 'ja') {
    if (!resultData) return defaultLang;
    const res = resultData.result || resultData.payload?.result || resultData;
    const transcription = res.transcription || {};

    const rawLang = transcription.languages?.[0] ||
                    res.languages?.[0] ||
                    transcription.language ||
                    res.language ||
                    defaultLang;

    return normalizeLanguageCode(rawLang) || defaultLang;
}

