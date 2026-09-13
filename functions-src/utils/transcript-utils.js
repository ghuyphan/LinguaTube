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
 * Clean transcript segments:
 * 1. Sort by start time
 * 2. Remove duplicates at same timestamp
 * 3. Merge overlapping/similar segments
 * 4. Remove very short/empty segments
 * 5. Split overly long run-on segments at sentence and clause boundaries
 * 6. Apply proper timing
 * 
 * @param {Array<{text: string, start: number, duration: number}>} segments - Raw transcript segments
 * @returns {Array<{text: string, start: number, duration: number}>} Cleaned segments
 */
export function cleanTranscriptSegments(segments) {
    if (!segments?.length) return [];

    // Step 1: Sort by start time
    const sorted = [...segments].sort((a, b) => a.start - b.start);

    // Step 2: Group segments at same/very close timestamps
    const grouped = groupByTimestamp(sorted);

    // Step 3: Pick best segment from each group & merge overlaps
    const merged = mergeGroups(grouped);

    // Step 4: Filter out invalid segments
    const filtered = merged.filter(seg =>
        seg.text?.trim().length > 0
        // removed duration check as some valid words can be short in CJK
    );

    // Step 5: Split run-on speech segments into natural subtitle chunks
    const splitSegments = splitRunOnSegments(filtered);

    // Step 6: Apply sticky timing with caps
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

// NOTE: shouldMerge, mergeText, textSimilarity were removed as dead code
// They were not called by any function after the refactoring to group-based deduplication

/**
 * Intelligently split overly long run-on speech segments into natural sentence cues
 * @param {Array<{text: string, start: number, duration: number}>} segments
 * @returns {Array<{text: string, start: number, duration: number}>}
 */
export function splitRunOnSegments(segments) {
    if (!segments?.length) return [];

    const result = [];
    for (const segment of segments) {
        const text = segment.text?.trim() || '';
        if (!text) continue;

        const isCJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f\uac00-\ud7af]/.test(text);
        const maxLen = isCJK ? 22 : 48;

        // If short enough and duration reasonable, keep as-is
        if (text.length <= maxLen && segment.duration <= 4.5) {
            result.push({
                ...segment,
                text
            });
            continue;
        }

        // Step 1: Try splitting by major sentence boundaries (including newline)
        const majorParts = isCJK
            ? text.split(/(?<=[。！？!?\n])\s*/).map(p => p.trim()).filter(Boolean)
            : text.split(/(?<=[.!?\n])\s+/).map(p => p.trim()).filter(Boolean);

        // Step 2: If any part is still too long, split further by commas / clause boundaries
        const refinedParts = [];
        for (const p of (majorParts.length > 0 ? majorParts : [text])) {
            if (p.length > maxLen) {
                const subParts = isCJK
                    ? p.split(/(?<=[、，,;；:：])\s*/).map(s => s.trim()).filter(Boolean)
                    : p.split(/(?<=[,;:])\s+/).map(s => s.trim()).filter(Boolean);
                if (subParts.length > 1) {
                    refinedParts.push(...subParts);
                } else {
                    refinedParts.push(p);
                }
            } else {
                refinedParts.push(p);
            }
        }

        if (refinedParts.length <= 1) {
            result.push({
                ...segment,
                text
            });
            continue;
        }

        // Step 3: Proportionally interpolate timestamps based on character count
        const totalChars = refinedParts.reduce((sum, p) => sum + p.length, 0);
        if (totalChars === 0) {
            result.push(segment);
            continue;
        }

        let currentStart = segment.start;
        const totalDuration = segment.duration || (MIN_CUE_DURATION * refinedParts.length);

        for (let i = 0; i < refinedParts.length; i++) {
            const part = refinedParts[i];
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
 * Apply sticky timing with duration caps
 */
function applyTiming(segments) {
    return segments.map((segment, index) => {
        let duration;

        if (index < segments.length - 1) {
            // Sticky: extend to next segment's start time, but cap it
            const nextStart = segments[index + 1].start;
            const gap = nextStart - segment.start;
            duration = Math.min(gap, MAX_CUE_DURATION);
        } else {
            // Last segment: use actual duration capped
            duration = Math.min(segment.duration, MAX_CUE_DURATION);
        }

        // Ensure minimum duration
        if (duration < MIN_CUE_DURATION) {
            duration = MIN_CUE_DURATION;
        }

        return {
            text: segment.text.trim(),
            start: segment.start,
            duration
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
    if (clean === 'ja' || clean === 'japanese') return 'ja';
    if (clean === 'ko' || clean === 'korean') return 'ko';
    if (clean === 'zh' || clean === 'chinese' || clean === 'cmn' || clean === 'mandarin' || clean === 'yue') return 'zh';
    if (clean === 'en' || clean === 'english') return 'en';
    return clean;
}
