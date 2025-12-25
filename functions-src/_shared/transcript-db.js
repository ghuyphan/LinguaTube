/**
 * D1 Transcript Storage Utilities
 * Provides read/write operations for permanent transcript storage
 * Includes pending state management for long-running AI jobs
 */

const DEBUG = false;
const log = (...args) => DEBUG && console.log('[D1 Transcripts]', ...args);

/**
 * Get completed transcript from D1 database
 * @returns {Promise<{segments: Array, source: string, language: string} | null>}
 */
export async function getTranscript(db, videoId, language) {
    if (!db) return null;

    try {
        // Only get completed transcripts
        const result = await db.prepare(
            "SELECT segments, source, language FROM transcripts WHERE video_id = ? AND language = ? AND status = 'complete'"
        ).bind(videoId, language).first();

        if (result?.segments) {
            log('D1 hit:', videoId, language);
            return {
                segments: JSON.parse(result.segments),
                source: result.source,
                language: result.language
            };
        }

        // Fallback: Check for AI transcript with any language
        const aiResult = await db.prepare(
            "SELECT segments, source, language FROM transcripts WHERE video_id = ? AND source = 'ai' AND status = 'complete'"
        ).bind(videoId).first();

        if (aiResult?.segments) {
            log('D1 AI fallback hit:', videoId);
            return {
                segments: JSON.parse(aiResult.segments),
                source: aiResult.source,
                language: aiResult.language
            };
        }

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
 * Save a pending AI job to D1 (when Gladia starts processing)
 */
export async function savePendingJob(db, videoId, language, gladiaResultUrl) {
    if (!db || !videoId || !gladiaResultUrl) return;

    try {
        await db.prepare(`
            INSERT OR REPLACE INTO transcripts (video_id, language, source, status, gladia_result_url, created_at)
            VALUES (?, ?, 'ai', 'pending', ?, strftime('%s', 'now'))
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
        await db.prepare(`
            UPDATE transcripts 
            SET status = 'complete', segments = ?, gladia_result_url = NULL, created_at = strftime('%s', 'now')
            WHERE video_id = ? AND language = ?
        `).bind(JSON.stringify(segments), videoId, language).run();

        log('Completed pending job:', videoId, language);
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
