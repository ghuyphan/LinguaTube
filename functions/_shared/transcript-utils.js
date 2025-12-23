/**
 * Transcript cleaning utilities for Cloudflare Functions
 * Handles deduplication, merging, and timing fixes for YouTube and Whisper transcripts
 */

// Minimum gap between cues to consider them separate (in seconds)
const MIN_CUE_GAP = 0.5;
// Minimum duration for a cue (in seconds)
const MIN_CUE_DURATION = 0.5;
// Maximum duration for a single cue (prevents overly long subtitles)
const MAX_CUE_DURATION = 10;

/**
 * Clean transcript segments:
 * 1. Sort by start time
 * 2. Remove duplicates at same timestamp
 * 3. Merge overlapping/similar segments
 * 4. Remove very short/empty segments
 * 5. Apply proper timing
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
        seg.text?.trim().length > 0 &&
        seg.duration >= MIN_CUE_DURATION
    );

    // Step 5: Apply sticky timing with caps
    return applyTiming(filtered);
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
 * Pick best segment from each group
 * Priority: longer text, longer duration
 */
function mergeGroups(groups) {
    const result = [];

    for (const group of groups) {
        if (group.length === 1) {
            result.push({ ...group[0] });
            continue;
        }

        // Multiple segments at same timestamp - pick the best one
        const best = group.reduce((a, b) => {
            const scoreA = (a.text?.trim().length || 0) + (a.duration * 10);
            const scoreB = (b.text?.trim().length || 0) + (b.duration * 10);
            return scoreB > scoreA ? b : a;
        });

        // Check if we should merge with previous
        const prev = result[result.length - 1];
        if (prev && shouldMerge(prev, best)) {
            // Merge: extend previous segment
            prev.text = mergeText(prev.text, best.text);
            prev.duration = Math.max(prev.duration, (best.start - prev.start) + best.duration);
        } else {
            result.push({ ...best });
        }
    }

    return result;
}

/**
 * Check if two segments should be merged
 */
function shouldMerge(prev, curr) {
    const prevEnd = prev.start + prev.duration;
    const overlaps = curr.start <= prevEnd + MIN_CUE_GAP;

    if (!overlaps) return false;

    // Check text similarity
    const prevText = prev.text?.trim() || '';
    const currText = curr.text?.trim() || '';

    return prevText.includes(currText) ||
        currText.includes(prevText) ||
        textSimilarity(prevText, currText) > 0.8;
}

/**
 * Merge two text strings, avoiding duplication
 */
function mergeText(a, b) {
    const textA = a?.trim() || '';
    const textB = b?.trim() || '';

    if (!textA) return textB;
    if (!textB) return textA;

    // If one contains the other, use the longer one
    if (textA.includes(textB)) return textA;
    if (textB.includes(textA)) return textB;

    // If they're very similar, use the longer one
    if (textSimilarity(textA, textB) > 0.8) {
        return textA.length >= textB.length ? textA : textB;
    }

    // Otherwise, keep the first one
    return textA;
}

/**
 * Simple text similarity (Jaccard on characters)
 */
function textSimilarity(a, b) {
    if (!a || !b) return 0;

    const setA = new Set(a);
    const setB = new Set(b);

    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);

    return intersection.size / union.size;
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
