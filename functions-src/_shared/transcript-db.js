/**
 * D1 Video Metadata Utilities
 * Stores queryable metadata ONLY - actual content lives in R2
 * 
 * Tables:
 * - video_meta: Records which transcripts exist (video_id, language, source)
 * - pending_jobs: Tracks in-progress AI transcription jobs
 */

// ============================================================================
// Video Metadata (for fast lookups / analytics)
// ============================================================================

/**
 * Record that a transcript exists (for queries/analytics)
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string} language
 * @param {string} source - e.g., 'youtube', 'supadata', 'ai'
 */
export async function recordTranscript(db, videoId, language, source) {
    if (!db || !videoId || !language) return;

    try {
        await db.prepare(`
            INSERT OR REPLACE INTO video_meta 
            (video_id, language, source, created_at)
            VALUES (?, ?, ?, strftime('%s', 'now'))
        `).bind(videoId, language, source).run();
    } catch (err) {
        console.error('[D1] recordTranscript error:', err.message);
    }
}

/**
 * Get available languages for a video (fast lookup without R2 fetch)
 * @param {D1Database} db
 * @param {string} videoId
 * @returns {Promise<Array<{language: string, source: string}> | null>}
 */
export async function getAvailableLanguages(db, videoId) {
    if (!db) return null;

    try {
        const { results } = await db.prepare(`
            SELECT language, source FROM video_meta 
            WHERE video_id = ? ORDER BY created_at DESC
        `).bind(videoId).all();

        return results || [];
    } catch (err) {
        console.error('[D1] getAvailableLanguages error:', err.message);
        return null;
    }
}

/**
 * Check if we have a transcript (without fetching from R2)
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string} language
 * @returns {Promise<boolean>}
 */
export async function hasTranscript(db, videoId, language) {
    if (!db) return false;

    try {
        const result = await db.prepare(`
            SELECT 1 FROM video_meta WHERE video_id = ? AND language = ?
        `).bind(videoId, language).first();
        return !!result;
    } catch {
        return false;
    }
}

// ============================================================================
// Pending Jobs (for long-running AI transcription)
// ============================================================================

/**
 * Save pending Gladia job
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string} language
 * @param {string} resultUrl - Gladia result polling URL
 */
export async function savePendingJob(db, videoId, language, resultUrl) {
    if (!db || !videoId || !resultUrl) return;

    try {
        await db.prepare(`
            INSERT OR REPLACE INTO pending_jobs 
            (video_id, language, result_url, created_at)
            VALUES (?, ?, ?, strftime('%s', 'now'))
        `).bind(videoId, language, resultUrl).run();
    } catch (err) {
        console.error('[D1] savePendingJob error:', err.message);
    }
}

/**
 * Get pending job for polling (only if created within last hour)
 * @param {D1Database} db
 * @param {string} videoId
 * @returns {Promise<{result_url: string, language: string} | null>}
 */
export async function getPendingJob(db, videoId) {
    if (!db) return null;

    try {
        return await db.prepare(`
            SELECT result_url, language FROM pending_jobs 
            WHERE video_id = ? AND created_at > strftime('%s', 'now') - 3600
        `).bind(videoId).first();
    } catch (err) {
        console.error('[D1] getPendingJob error:', err.message);
        return null;
    }
}

/**
 * Delete pending job after completion
 * @param {D1Database} db
 * @param {string} videoId
 */
export async function deletePendingJob(db, videoId) {
    if (!db) return;

    try {
        await db.prepare(`
            DELETE FROM pending_jobs WHERE video_id = ?
        `).bind(videoId).run();
    } catch (err) {
        console.error('[D1] deletePendingJob error:', err.message);
    }
}

/**
 * Cleanup stale pending jobs (older than 1 hour)
 * Called opportunistically, not via cron
 * @param {D1Database} db
 */
export async function cleanupStaleJobs(db) {
    if (!db) return;

    try {
        await db.prepare(`
            DELETE FROM pending_jobs 
            WHERE created_at < strftime('%s', 'now') - 3600
        `).run();
    } catch {
        // Non-blocking - don't throw
    }
}
