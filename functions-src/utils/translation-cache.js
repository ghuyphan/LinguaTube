/**
 * R2 Translation Cache Utilities
 * Provides read/write operations for dual subtitle translations in R2
 * 
 * Object key format: translations/{videoId}/{sourceLang}-{targetLang}.json
 * 
 * D1 Migration Required:
 * -----------------------
 * CREATE TABLE IF NOT EXISTS translation_meta (
 *     video_id TEXT NOT NULL,
 *     source_lang TEXT NOT NULL,
 *     target_lang TEXT NOT NULL,
 *     segment_count INTEGER,
 *     created_at INTEGER DEFAULT (strftime('%s', 'now')),
 *     PRIMARY KEY (video_id, source_lang, target_lang)
 * );
 */

const DEBUG = false;
const log = (...args) => DEBUG && console.log('[R2 Translations]', ...args);

// Cache configuration
const CACHE_MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000; // 90 days
const CACHE_VERSION = '2';

// ============================================================================
// D1 Metadata Functions
// ============================================================================

/**
 * Record that a translation exists (for fast lookups without R2)
 * @param {D1Database} db - D1 database binding
 * @param {string} videoId - YouTube video ID
 * @param {string} srcLang - Source language code
 * @param {string} tgtLang - Target language code
 * @param {number} segmentCount - Number of translated segments
 */
export async function recordTranslation(db, videoId, srcLang, tgtLang, segmentCount) {
    if (!db || !videoId || !srcLang || !tgtLang) return;

    try {
        await db.prepare(`
            INSERT OR REPLACE INTO translation_meta 
            (video_id, source_lang, target_lang, segment_count, created_at)
            VALUES (?, ?, ?, ?, strftime('%s', 'now'))
        `).bind(videoId, srcLang, tgtLang, segmentCount).run();

        log('D1 record saved:', videoId, `${srcLang}-${tgtLang}`);
    } catch (err) {
        console.error('[D1 Translations] recordTranslation error:', err.message);
    }
}

// ============================================================================
// Cache Freshness
// ============================================================================

/**
 * Check if cached translation is still fresh
 * @param {Object} cached - Cached translation object with timestamp
 * @param {number} maxAgeMs - Maximum age in milliseconds (default: 90 days)
 * @returns {boolean}
 */
export function isTranslationFresh(cached, maxAgeMs = CACHE_MAX_AGE_MS) {
    if (!cached?.timestamp) return false;
    return Date.now() - cached.timestamp < maxAgeMs;
}

// ============================================================================
// R2 Cache Operations
// ============================================================================

/**
 * Get cached translation from R2
 * @param {R2Bucket} bucket - R2 bucket binding
 * @param {string} videoId - YouTube video ID
 * @param {string} srcLang - Source language code
 * @param {string} tgtLang - Target language code
 * @returns {Promise<{segments: Array, source: string, timestamp: number} | null>}
 */
export async function getTranslation(bucket, videoId, srcLang, tgtLang) {
    if (!bucket || !videoId || !srcLang || !tgtLang) return null;

    const key = `translations/${videoId}/${srcLang}-${tgtLang}.json`;

    try {
        const object = await bucket.get(key);

        if (!object) {
            log('Cache miss:', key);
            return null;
        }

        const data = await object.json();

        if (!data?.segments?.length) {
            log('Cache hit but empty:', key);
            return null;
        }

        // Check freshness - return null if stale (90 days)
        if (!isTranslationFresh(data)) {
            log('Cache stale:', key, `(age: ${Math.round((Date.now() - data.timestamp) / (24 * 60 * 60 * 1000))} days)`);
            return null;
        }

        // Invalidate poisoned caches where translations mirror source text
        if (srcLang !== tgtLang) {
            const identicalCount = data.segments.filter(s => s && s.translation && s.text && s.translation.trim() === s.text.trim()).length;
            if (identicalCount > data.segments.length * 0.3) {
                log('Cache poisoned with untranslated text:', key);
                return null;
            }
            data.segments.forEach(s => {
                if (s && s.translation && s.text && s.translation.trim() === s.text.trim()) {
                    s.translation = null;
                }
            });
        }

        log('Cache hit:', key, `(${data.segments.length} segments)`);
        return {
            segments: data.segments,
            source: object.customMetadata?.source || 'lingva',
            timestamp: data.timestamp,
            quality: data.quality
        };

    } catch (err) {
        console.error('[R2 Translations] Read error:', err.message);
        return null;
    }
}

/**
 * Save translation to R2
 * @param {R2Bucket} bucket - R2 bucket binding
 * @param {string} videoId - YouTube video ID
 * @param {string} srcLang - Source language code
 * @param {string} tgtLang - Target language code
 * @param {Array} segments - Translated segments
 * @param {number} quality - Translation quality percentage (0-100)
 * @param {string} source - Translation provider (default: lingva)
 */
export async function saveTranslation(bucket, videoId, srcLang, tgtLang, segments, quality = 100, source = 'lingva') {
    if (!bucket || !videoId || !segments?.length) return null;

    const key = `translations/${videoId}/${srcLang}-${tgtLang}.json`;
    const now = Date.now();

    try {
        let finalSegments = segments;

        // Merge incoming translations with existing cached segments if present
        try {
            const existingObject = await bucket.get(key);
            if (existingObject) {
                const existingData = await existingObject.json();
                if (Array.isArray(existingData?.segments) && existingData.segments.length > 0) {
                    const existingMap = new Map();
                    const existingByText = new Map();
                    existingData.segments.forEach((seg, idx) => {
                        const tr = seg?.translation && typeof seg.translation === 'string' ? seg.translation.trim() : '';
                        if (tr) {
                            const timeKey = typeof seg.start === 'number' ? seg.start.toFixed(1) : `idx:${idx}`;
                            existingMap.set(timeKey, tr);
                            if (seg?.text && typeof seg.text === 'string') {
                                existingByText.set(seg.text.trim(), tr);
                            }
                        }
                    });

                    finalSegments = segments.map((seg, idx) => {
                        const incomingTr = seg?.translation && typeof seg.translation === 'string' ? seg.translation.trim() : '';
                        if (incomingTr) {
                            return { ...seg, translation: incomingTr };
                        }
                        const timeKey = typeof seg?.start === 'number' ? seg.start.toFixed(1) : `idx:${idx}`;
                        let existingTr = existingMap.get(timeKey);
                        if (!existingTr && seg?.text && typeof seg.text === 'string') {
                            existingTr = existingByText.get(seg.text.trim());
                        }
                        if (!existingTr && typeof seg?.start === 'number') {
                            const closeSeg = existingData.segments.find(es => 
                                es?.translation && typeof es.start === 'number' && Math.abs(es.start - seg.start) < 0.8
                            );
                            if (closeSeg?.translation) {
                                existingTr = typeof closeSeg.translation === 'string' ? closeSeg.translation.trim() : closeSeg.translation;
                            }
                        }
                        if (!existingTr && existingData.segments[idx]?.translation) {
                            existingTr = typeof existingData.segments[idx].translation === 'string' ? existingData.segments[idx].translation.trim() : existingData.segments[idx].translation;
                        }
                        return {
                            ...seg,
                            translation: existingTr || null
                        };
                    });
                }
            }
        } catch (mergeErr) {
            log('Merge error (using incoming segments):', mergeErr?.message);
        }

        const validCount = finalSegments.filter(s => s && s.translation && typeof s.translation === 'string' && s.translation.trim() && (srcLang === tgtLang || s.translation.trim() !== (s.text || '').trim())).length;
        const computedQuality = finalSegments.length > 0 ? Math.round((validCount / finalSegments.length) * 100) : quality;

        const data = {
            videoId,
            sourceLang: srcLang,
            targetLang: tgtLang,
            segments: finalSegments,
            source,
            quality: computedQuality,
            timestamp: now
        };

        await bucket.put(key, JSON.stringify(data), {
            httpMetadata: {
                contentType: 'application/json'
            },
            customMetadata: {
                source,
                segmentCount: String(finalSegments.length),
                translatedCount: String(validCount),
                timestamp: String(now),
                expiresAt: String(now + CACHE_MAX_AGE_MS),
                version: CACHE_VERSION
            }
        });

        log('Cache save success:', key, `(${finalSegments.length} segments, ${computedQuality}% quality, ${validCount} translated)`);

        return {
            segments: finalSegments,
            quality: computedQuality,
            validCount,
            totalCount: finalSegments.length
        };

    } catch (err) {
        console.error('[R2 Translations] Write error:', err.message);
        return null;
    }
}


