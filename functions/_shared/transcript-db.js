/**
 * D1 Transcript Storage Utilities
 * Provides read/write operations for permanent transcript storage
 */

const DEBUG = false;
const log = (...args) => DEBUG && console.log('[D1 Transcripts]', ...args);

/**
 * Get transcript from D1 database
 * @returns {Promise<{segments: Array, source: string, language: string} | null>}
 */
export async function getTranscript(db, videoId, language) {
    if (!db) return null;

    try {
        const result = await db.prepare(
            'SELECT segments, source, language FROM transcripts WHERE video_id = ? AND language = ?'
        ).bind(videoId, language).first();

        if (result) {
            log('D1 hit:', videoId, language);
            return {
                segments: JSON.parse(result.segments),
                source: result.source,
                language: result.language
            };
        }

        // Fallback: Check for AI transcript with any language
        const aiResult = await db.prepare(
            "SELECT segments, source, language FROM transcripts WHERE video_id = ? AND source = 'ai'"
        ).bind(videoId).first();

        if (aiResult) {
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
 * Save transcript to D1 database (non-blocking, fire-and-forget)
 * Uses INSERT OR REPLACE to handle duplicates
 */
export async function saveTranscript(db, videoId, language, segments, source) {
    if (!db || !videoId || !segments?.length) return;

    try {
        await db.prepare(`
            INSERT OR REPLACE INTO transcripts (video_id, language, source, segments, created_at)
            VALUES (?, ?, ?, ?, strftime('%s', 'now'))
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
            'SELECT 1 FROM transcripts WHERE video_id = ? AND language = ?'
        ).bind(videoId, language).first();
        return !!result;
    } catch {
        return false;
    }
}
