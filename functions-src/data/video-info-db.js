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

// D1 cleanup threshold (7 days)
const NO_TRANSCRIPT_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

// ============================================================================
// Video Languages (D1)
// ============================================================================

/**
 * Get video language info from D1
 * @param {D1Database} db
 * @param {string} videoId
 * @returns {Promise<{availableLanguages: string[], hasAutoCaptions: boolean, durationSeconds: number, title: string, channel: string, levels: Record<string, string>} | null>}
 */
export async function getVideoLanguages(db, videoId) {
    if (!db || !videoId) return null;

    try {
        const row = await db.prepare(`
            SELECT available_languages, has_auto_captions, duration_seconds, title, channel, levels
            FROM video_languages WHERE video_id = ?
        `).bind(videoId).first();

        if (!row) return null;

        let levels = {};
        try {
            if (row.levels) levels = JSON.parse(row.levels);
        } catch { }

        return {
            availableLanguages: JSON.parse(row.available_languages || '[]'),
            hasAutoCaptions: !!row.has_auto_captions,
            durationSeconds: row.duration_seconds,
            title: row.title,
            channel: row.channel,
            levels
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
 * @param {Record<string, string>} [levels] - Difficulty levels by language
 */
export async function saveVideoLanguages(db, videoId, languages, duration = null, title = null, channel = null, hasAutoCaptions = false, levels = null) {
    if (!db || !videoId) return;

    try {
        let existingLevels = {};
        if (levels === null) {
            const existing = await getVideoLanguages(db, videoId);
            existingLevels = existing?.levels || {};
        } else {
            existingLevels = levels;
        }

        await db.prepare(`
            INSERT OR REPLACE INTO video_languages 
            (video_id, available_languages, has_auto_captions, duration_seconds, title, channel, levels, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, strftime('%s', 'now'))
        `).bind(
            videoId,
            JSON.stringify(languages),
            hasAutoCaptions ? 1 : 0,
            duration,
            title,
            channel,
            JSON.stringify(existingLevels)
        ).run();
    } catch (err) {
        console.error('[VideoInfoDB] saveVideoLanguages error:', err.message);
    }
}

/**
 * Save or update a single language level in D1 & KV
 * @param {D1Database} db
 * @param {KVNamespace} [kv]
 * @param {string} videoId
 * @param {string} language
 * @param {string} level - e.g. "JLPT N4", "HSK 2"
 */
export async function saveVideoLevel(db, kv, videoId, language, level) {
    if (!db || !videoId || !language || !level) return null;

    try {
        const existing = await getVideoLanguages(db, videoId);
        const currentLevels = existing?.levels || {};
        currentLevels[language] = level;

        if (existing) {
            await db.prepare(`
                UPDATE video_languages 
                SET levels = ?, updated_at = strftime('%s', 'now')
                WHERE video_id = ?
            `).bind(JSON.stringify(currentLevels), videoId).run();
        } else {
            await saveVideoLanguages(db, videoId, [language], null, null, null, false, currentLevels);
        }

        // Update KV cache if available
        if (kv) {
            const cachedInfo = await getVideoInfoFromKV(kv, videoId);
            if (cachedInfo) {
                cachedInfo.levels = currentLevels;
                await saveVideoInfoToKV(kv, videoId, cachedInfo);
            }
        }

        return currentLevels;
    } catch (err) {
        console.error('[VideoInfoDB] saveVideoLevel error:', err.message);
        return null;
    }
}

/**
 * Fast-path metadata regex level detection
 * @param {string} title
 * @param {string} channel
 * @returns {{lang: string, level: string} | null}
 */
export function detectLevelFromMetadata(title = '', channel = '') {
    const text = `${title} ${channel}`;
    const jlptMatch = text.match(/\b(?:JLPT\s*)?N([1-5])\b/i);
    if (jlptMatch) return { lang: 'ja', level: `JLPT N${jlptMatch[1]}` };

    const hskMatch = text.match(/\bHSK\s*([1-6])\b/i);
    if (hskMatch) return { lang: 'zh', level: `HSK ${hskMatch[1]}` };

    const topikMatch = text.match(/\bTOPIK\s*([1-6]|I{1,2})\b/i);
    if (topikMatch) return { lang: 'ko', level: `TOPIK ${topikMatch[1]}` };

    const cefrMatch = text.match(/\bCEFR\s*([A-C][1-2])\b/i) || text.match(/\b([A-C][1-2])\s*level\b/i);
    if (cefrMatch) return { lang: 'en', level: `CEFR ${cefrMatch[1].toUpperCase()}` };

    return null;
}

/**
 * Add a single language to available languages (incremental)
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string} lang
 */
export async function addVideoLanguage(db, videoId, lang) {
    return addVideoLanguages(db, videoId, [lang]);
}

/**
 * Add multiple languages to available languages (merge)
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string[]} languages
 */
export async function addVideoLanguages(db, videoId, languages) {
    if (!db || !videoId || !languages?.length) return;

    try {
        const existing = await getVideoLanguages(db, videoId);
        const existingLangs = existing?.availableLanguages || [];

        // Merge and deduplicate
        const merged = [...new Set([...existingLangs, ...languages])];

        // Only save if we actually added something
        if (merged.length > existingLangs.length) {
            await saveVideoLanguages(
                db,
                videoId,
                merged,
                existing?.durationSeconds,
                existing?.title,
                existing?.channel,
                existing?.hasAutoCaptions
            );
        }
    } catch (err) {
        console.error('[VideoInfoDB] addVideoLanguages error:', err.message);
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

    // D1 fallback (persistent, 100,000 writes/day free tier)
    if (db) {
        try {
            const row = await db.prepare(`
                SELECT 1 FROM no_transcript_cache
                WHERE video_id = ? AND language = ? AND source = ?
            `).bind(videoId, lang, source).first();

            if (row) {
                return true;
            }
        } catch { }
    }

    return false;
}

/**
 * Mark a video as having no transcript for given language/source
 * Saves to D1 to preserve the 1,000 writes/day KV limit
 * @param {D1Database} db
 * @param {KVNamespace} kv
 * @param {string} videoId
 * @param {string} lang
 * @param {string} source - 'youtube' or 'ai'
 */
export async function markNoTranscript(db, kv, videoId, lang, source) {
    if (!db) return;

    try {
        await db.prepare(`
            INSERT OR IGNORE INTO no_transcript_cache (video_id, language, source)
            VALUES (?, ?, ?)
        `).bind(videoId, lang, source).run();
    } catch { }
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
