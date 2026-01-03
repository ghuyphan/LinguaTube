/**
 * Video Info D1/KV Helpers
 * Two-tier caching for video language discovery
 * 
 * Pattern:
 * - KV: Fast cache with 24hr TTL (temporary)
 * - D1: Persistent storage (video_languages, no_transcript_cache)
 */

// KV cache TTLs
const VIDEO_INFO_KV_TTL = 60 * 60 * 24; // 24 hours
const NO_TRANSCRIPT_KV_TTL = 60 * 60; // 1 hour for negative cache

// D1 cleanup threshold (7 days)
const NO_TRANSCRIPT_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

// ============================================================================
// Video Languages (D1)
// ============================================================================

/**
 * Get video language info from D1
 * @param {D1Database} db
 * @param {string} videoId
 * @returns {Promise<{availableLanguages: string[], hasAutoCaptions: boolean, durationSeconds: number, title: string, channel: string} | null>}
 */
export async function getVideoLanguages(db, videoId) {
    if (!db || !videoId) return null;

    try {
        const row = await db.prepare(`
            SELECT available_languages, has_auto_captions, duration_seconds, title, channel
            FROM video_languages WHERE video_id = ?
        `).bind(videoId).first();

        if (!row) return null;

        return {
            availableLanguages: JSON.parse(row.available_languages || '[]'),
            hasAutoCaptions: !!row.has_auto_captions,
            durationSeconds: row.duration_seconds,
            title: row.title,
            channel: row.channel
        };
    } catch (err) {
        console.error('[VideoInfoDB] getVideoLanguages error:', err.message);
        return null;
    }
}

/**
 * Save video language info to D1
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string[]} languages - Available language codes
 * @param {number} [duration] - Duration in seconds
 * @param {string} [title] - Video title
 * @param {string} [channel] - Channel name
 * @param {boolean} [hasAutoCaptions] - Whether video has auto-captions
 */
export async function saveVideoLanguages(db, videoId, languages, duration = null, title = null, channel = null, hasAutoCaptions = false) {
    if (!db || !videoId) return;

    try {
        await db.prepare(`
            INSERT OR REPLACE INTO video_languages 
            (video_id, available_languages, has_auto_captions, duration_seconds, title, channel, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, strftime('%s', 'now'))
        `).bind(
            videoId,
            JSON.stringify(languages),
            hasAutoCaptions ? 1 : 0,
            duration,
            title,
            channel
        ).run();
    } catch (err) {
        console.error('[VideoInfoDB] saveVideoLanguages error:', err.message);
    }
}

/**
 * Get video duration from D1 (for server-side validation)
 * @param {D1Database} db
 * @param {string} videoId
 * @returns {Promise<number | null>} Duration in seconds or null
 */
export async function getVideoDuration(db, videoId) {
    if (!db || !videoId) return null;

    try {
        const row = await db.prepare(`
            SELECT duration_seconds FROM video_languages WHERE video_id = ?
        `).bind(videoId).first();

        return row?.duration_seconds || null;
    } catch {
        return null;
    }
}

// ============================================================================
// No Transcript Cache (D1 + KV)
// ============================================================================

/**
 * Check if we know a video has no transcript for given language/source
 * @param {D1Database} db
 * @param {KVNamespace} kv
 * @param {string} videoId
 * @param {string} lang
 * @param {string} source - 'youtube' or 'ai'
 * @returns {Promise<boolean>}
 */
export async function isNoTranscript(db, kv, videoId, lang, source) {
    // Quick KV check first (fast path)
    if (kv) {
        try {
            const kvKey = `no-transcript:${videoId}:${lang}:${source}`;
            if (await kv.get(kvKey)) return true;
        } catch { }
    }

    // D1 fallback (persistent)
    if (db) {
        try {
            const row = await db.prepare(`
                SELECT 1 FROM no_transcript_cache
                WHERE video_id = ? AND language = ? AND source = ?
            `).bind(videoId, lang, source).first();

            if (row) {
                // Populate KV for faster future lookups
                if (kv) {
                    kv.put(`no-transcript:${videoId}:${lang}:${source}`, '1', {
                        expirationTtl: NO_TRANSCRIPT_KV_TTL
                    }).catch(() => { });
                }
                return true;
            }
        } catch { }
    }

    return false;
}

/**
 * Mark a video as having no transcript for given language/source
 * @param {D1Database} db
 * @param {KVNamespace} kv
 * @param {string} videoId
 * @param {string} lang
 * @param {string} source - 'youtube' or 'ai'
 */
export async function markNoTranscript(db, kv, videoId, lang, source) {
    const promises = [];

    // Save to KV (fast cache)
    if (kv) {
        promises.push(
            kv.put(`no-transcript:${videoId}:${lang}:${source}`, '1', {
                expirationTtl: NO_TRANSCRIPT_KV_TTL
            }).catch(() => { })
        );
    }

    // Save to D1 (persistent)
    if (db) {
        promises.push(
            db.prepare(`
                INSERT OR IGNORE INTO no_transcript_cache (video_id, language, source)
                VALUES (?, ?, ?)
            `).bind(videoId, lang, source).run().catch(() => { })
        );
    }

    await Promise.allSettled(promises);
}

/**
 * Cleanup old no_transcript_cache entries (older than 7 days)
 * Call opportunistically, not via cron
 * @param {D1Database} db
 */
export async function cleanupOldNoTranscriptEntries(db) {
    if (!db) return;

    try {
        await db.prepare(`
            DELETE FROM no_transcript_cache 
            WHERE created_at < strftime('%s', 'now') - ?
        `).bind(NO_TRANSCRIPT_MAX_AGE_SECONDS).run();
    } catch {
        // Non-blocking
    }
}

// ============================================================================
// KV Cache Helpers (for video-info endpoint)
// ============================================================================

/**
 * Get video info from KV cache
 * @param {KVNamespace} kv
 * @param {string} videoId
 * @returns {Promise<Object | null>}
 */
export async function getVideoInfoFromKV(kv, videoId) {
    if (!kv || !videoId) return null;

    try {
        return await kv.get(`video-info:${videoId}`, 'json');
    } catch {
        return null;
    }
}

/**
 * Save video info to KV cache
 * @param {KVNamespace} kv
 * @param {string} videoId
 * @param {Object} info
 */
export async function saveVideoInfoToKV(kv, videoId, info) {
    if (!kv || !videoId) return;

    try {
        await kv.put(`video-info:${videoId}`, JSON.stringify(info), {
            expirationTtl: VIDEO_INFO_KV_TTL
        });
    } catch { }
}
