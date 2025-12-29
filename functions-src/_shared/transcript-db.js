/**
 * D1 Transcript Storage Utilities
 * Provides read/write operations for permanent transcript storage
 * Includes pending state management for long-running AI jobs
 */

const DEBUG = true;
const log = (...args) => DEBUG && console.log('[D1 Transcripts]', ...args);

/**
 * Get completed transcript from D1 database
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string} language
 * @param {string} [source] - Optional: filter by source (e.g., 'ai', 'youtube')
 * @returns {Promise<{segments: Array, source: string, language: string} | null>}
 */
export async function getTranscript(db, videoId, language, source = null) {
    if (!db) return null;

    try {
        // Build query with optional source filter
        let query = "SELECT segments, source, language FROM transcripts WHERE video_id = ? AND language = ? AND status = 'complete'";
        const params = [videoId, language];

        if (source) {
            query += " AND source = ?";
            params.push(source);
        }

        const result = await db.prepare(query).bind(...params).first();

        if (result?.segments) {
            log('D1 hit:', videoId, language, source ? `(source=${source})` : '');
            return {
                segments: JSON.parse(result.segments),
                source: result.source,
                language: result.language
            };
        }

        // No fallback to other languages - let caller try YouTube
        // This ensures we don't return English when Japanese was requested
        return null;
    } catch (err) {
        console.error('[D1 Transcripts] Read error:', err.message);
        return null; // Graceful fallback - don't block the request
    }
}

/**
 * Get pending job for a video (to resume polling)
 * @returns {Promise<{gladia_result_url: string, language: string} | null>}
 */
export async function getPendingJob(db, videoId) {
    if (!db) return null;

    try {
        const result = await db.prepare(
            "SELECT gladia_result_url, language FROM transcripts WHERE video_id = ? AND status = 'pending' AND gladia_result_url IS NOT NULL"
        ).bind(videoId).first();

        if (result?.gladia_result_url) {
            log('Found pending job:', videoId);
            return {
                gladia_result_url: result.gladia_result_url,
                language: result.language
            };
        }
        return null;
    } catch (err) {
        console.error('[D1 Transcripts] getPendingJob error:', err.message);
        return null;
    }
}

/**
 * Cleanup stale pending jobs (older than 24 hours)
 * Called opportunistically during getPendingJob
 */
export async function cleanupStalePendingJobs(db) {
    if (!db) return;

    try {
        const result = await db.prepare(`
            DELETE FROM transcripts 
            WHERE status = 'pending' 
            AND created_at < strftime('%s', 'now') - 86400
        `).run();

        if (result.meta?.changes > 0) {
            log('Cleaned up stale pending jobs:', result.meta.changes);
        }
    } catch (err) {
        // Non-blocking - don't throw
        console.error('[D1 Transcripts] cleanup error:', err.message);
    }
}

/**
 * Save a pending AI job to D1 (when Gladia starts processing)
 */
export async function savePendingJob(db, videoId, language, gladiaResultUrl) {
    if (!db || !videoId || !gladiaResultUrl) return;

    try {
        await db.prepare(`
            INSERT OR REPLACE INTO transcripts (video_id, language, source, status, gladia_result_url, segments, created_at)
            VALUES (?, ?, 'ai', 'pending', ?, '[]', strftime('%s', 'now'))
        `).bind(videoId, language, gladiaResultUrl).run();

        log('Saved pending job:', videoId, gladiaResultUrl);
    } catch (err) {
        console.error('[D1 Transcripts] savePendingJob error:', err.message);
    }
}

/**
 * Complete a pending job (when Gladia finishes)
 */
export async function completePendingJob(db, videoId, language, segments) {
    if (!db || !videoId || !segments?.length) return;

    try {
        // 1. Insert/Update the completed transcript with the CORRECT language
        await db.prepare(`
            INSERT OR REPLACE INTO transcripts (video_id, language, source, segments, status, gladia_result_url, created_at)
            VALUES (?, ?, 'ai', ?, 'complete', NULL, strftime('%s', 'now'))
        `).bind(videoId, language, JSON.stringify(segments)).run();

        // 2. Clean up the temporary 'ai' pending job if the language is different
        if (language !== 'ai') {
            await db.prepare(`
                DELETE FROM transcripts 
                WHERE video_id = ? AND language = 'ai' AND status = 'pending'
            `).bind(videoId).run();
        }

        log('Completed job saved to D1:', videoId, language);
    } catch (err) {
        console.error('[D1 Transcripts] completePendingJob error:', err.message);
    }
}

/**
 * Save completed transcript to D1 database (non-blocking, fire-and-forget)
 * Uses INSERT OR REPLACE to handle duplicates
 */
export async function saveTranscript(db, videoId, language, segments, source) {
    if (!db || !videoId || !segments?.length) return;

    try {
        await db.prepare(`
            INSERT OR REPLACE INTO transcripts (video_id, language, source, segments, status, created_at)
            VALUES (?, ?, ?, ?, 'complete', strftime('%s', 'now'))
        `).bind(videoId, language, source, JSON.stringify(segments)).run();

        log('Saved to D1:', videoId, language, source);
    } catch (err) {
        console.error('[D1 Transcripts] Write error:', err.message);
        // Non-blocking - don't throw, just log
    }
}

/**
 * Check if transcript exists (for deduplication/pending logic)
 */
export async function hasTranscript(db, videoId, language) {
    if (!db) return false;

    try {
        const result = await db.prepare(
            "SELECT 1 FROM transcripts WHERE video_id = ? AND language = ? AND status = 'complete'"
        ).bind(videoId, language).first();
        return !!result;
    } catch {
        return false;
    }
}

// ============================================================================
// Video Meta (Available Languages)
// ============================================================================

/**
 * Get available languages for a video
 * @returns {Promise<string[] | null>} Array of language codes or null if not known
 */
export async function getAvailableLangs(db, videoId) {
    if (!db) return null;

    try {
        const result = await db.prepare(
            "SELECT available_langs FROM video_meta WHERE video_id = ?"
        ).bind(videoId).first();

        if (result?.available_langs) {
            return result.available_langs.split(',').map(l => l.trim()).filter(Boolean);
        }
        return null;
    } catch (err) {
        log('getAvailableLangs error:', err.message);
        return null;
    }
}

/**
 * Save available languages for a video
 * @param {string[]} langs - Array of language codes
 */
export async function saveAvailableLangs(db, videoId, langs) {
    if (!db || !videoId || !langs?.length) return;

    try {
        const langsStr = [...new Set(langs)].join(','); // Dedupe and join
        await db.prepare(`
            INSERT OR REPLACE INTO video_meta (video_id, available_langs, created_at)
            VALUES (?, ?, strftime('%s', 'now'))
        `).bind(videoId, langsStr).run();

        log('Saved available langs:', videoId, langsStr);
    } catch (err) {
        console.error('[D1 Transcripts] saveAvailableLangs error:', err.message);
    }
}

/**
 * Add a language to the available languages list
 * Used when we successfully fetch a new language
 */
export async function addAvailableLang(db, videoId, lang) {
    if (!db || !videoId || !lang) return;

    try {
        const existing = await getAvailableLangs(db, videoId);
        const langs = existing ? [...new Set([...existing, lang])] : [lang];
        await saveAvailableLangs(db, videoId, langs);
    } catch (err) {
        console.error('[D1 Transcripts] addAvailableLang error:', err.message);
    }
}
