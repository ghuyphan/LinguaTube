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
// Isolate-level write mutex to serialize concurrent Read-Modify-Write operations to R2
const inFlightSaves = new Map();

export async function saveTranslation(bucket, videoId, srcLang, tgtLang, segments, quality = 100, source = 'lingva', { requireCanonical = false } = {}) {
    if (!bucket || !videoId || !segments?.length) return null;

    const lockKey = `${videoId}:${srcLang}:${tgtLang}`;
    const prevLock = inFlightSaves.get(lockKey) || Promise.resolve();
    let releaseLock;
    const currentLock = new Promise(resolve => { releaseLock = resolve; });
    inFlightSaves.set(lockKey, currentLock);

    try {
        await prevLock.catch(() => {});

        const key = `translations/${videoId}/${srcLang}-${tgtLang}.json`;
        const now = Date.now();

        try {
            for (let attempt = 0; attempt < 5; attempt++) {
                // R2 preconditions protect across isolates; the mutex only reduces local contention.
                const existingObject = await bucket.get(key);
                const existingData = existingObject ? await existingObject.json() : null;
                const canonicalObject = await bucket.get(`transcripts/${videoId}/${srcLang}.json`);
                const canonical = canonicalObject ? (await canonicalObject.json())?.segments : null;
                if (requireCanonical && !canonical?.length) return null;
                const cueKey = (seg, idx) => JSON.stringify([seg.start ?? `idx:${idx}`, seg.text || '']);
                const incoming = new Map(segments.map((seg, idx) => [cueKey(seg, idx), seg]));
                const base = canonical?.length ? canonical : existingData?.segments?.length ? existingData.segments : segments;
                const known = new Set(base.map(cueKey));
                if (canonical?.length && segments.some((seg, idx) => !known.has(cueKey(seg, idx)))) return null;
                if (!canonical?.length && existingData?.segments?.length) {
                    // Preserve a complete legacy object, refusing incompatible replacements.
                    if (segments.some((seg, idx) => !known.has(cueKey(seg, idx)))) return null;
                }
                const existingByCue = new Map();
                for (const [idx, seg] of (existingData?.segments || []).entries()) {
                    if (typeof seg?.translation === 'string' && seg.translation.trim()) {
                        existingByCue.set(cueKey(seg, idx), seg.translation.trim());
                    }
                }
                const finalSegments = base.map((seg, idx) => {
                    const next = incoming.get(cueKey(seg, idx));
                    const value = typeof next?.translation === 'string' ? next.translation.trim() : '';
                    const valid = value && (srcLang === tgtLang || value !== (seg.text || '').trim());
                    return { ...seg, translation: (valid ? value : '') || existingByCue.get(cueKey(seg, idx)) || null };
                });
                const validCount = finalSegments.filter(s => typeof s.translation === 'string' && s.translation.trim() &&
                    (srcLang === tgtLang || s.translation.trim() !== (s.text || '').trim())).length;
                const computedQuality = finalSegments.length ? Math.round(validCount / finalSegments.length * 100) : quality;
                const data = { videoId, sourceLang: srcLang, targetLang: tgtLang, segments: finalSegments,
                    source, quality: computedQuality, timestamp: now };
                const saved = await bucket.put(key, JSON.stringify(data), {
                    onlyIf: existingObject ? { etagMatches: existingObject.etag } : new Headers({ 'If-None-Match': '*' }),
                    httpMetadata: { contentType: 'application/json' },
                    customMetadata: { source, segmentCount: String(finalSegments.length), translatedCount: String(validCount),
                        timestamp: String(now), expiresAt: String(now + CACHE_MAX_AGE_MS), version: CACHE_VERSION }
                });
                if (saved === null) continue;
                return { segments: finalSegments, quality: computedQuality, validCount, totalCount: finalSegments.length };
            }
            console.warn('[R2 Translations] Conditional save contention exhausted');
            return null;
        } catch (err) {
            console.error('[R2 Translations] Write error:', err.message);
            return null;
        }
    } finally {
        if (typeof releaseLock === 'function') {
            releaseLock();
        }
        if (inFlightSaves.get(lockKey) === currentLock) {
            inFlightSaves.delete(lockKey);
        }
    }
}


