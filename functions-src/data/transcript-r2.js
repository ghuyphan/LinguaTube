/**
 * R2 Transcript Storage Utilities
 * Provides read/write operations for permanent transcript storage in R2
 * 
 * Object key format: transcripts/{videoId}/{lang}.json
 * Metadata includes: source, timestamp, segmentCount
 */

const DEBUG = false;
const log = (...args) => DEBUG && console.log('[R2 Transcripts]', ...args);

/**
 * Get transcript from R2 bucket
 * @param {R2Bucket} bucket - R2 bucket binding
 * @param {string} videoId - YouTube video ID
 * @param {string} lang - Language code
 * @returns {Promise<{segments: Array, source: string, language: string} | null>}
 */
export async function getTranscriptFromR2(bucket, videoId, lang) {
    if (!bucket) return null;

    const key = `transcripts/${videoId}/${lang}.json`;

    try {
        const object = await bucket.get(key);

        if (!object) {
            log('R2 miss:', key);
            return null;
        }

        const data = await object.json();

        if (!data?.segments?.length) {
            log('R2 hit but empty:', key);
            return null;
        }

        log('R2 hit:', key, `(${data.segments.length} segments)`);
        return {
            segments: data.segments,
            source: object.customMetadata?.source || 'r2',
            language: lang
        };

    } catch (err) {
        console.error('[R2 Transcripts] Read error:', err.message);
        return null;
    }
}

/**
 * Save transcript to R2 bucket
 * @param {R2Bucket} bucket - R2 bucket binding
 * @param {string} videoId - YouTube video ID
 * @param {string} lang - Language code
 * @param {Array} segments - Transcript segments
 * @param {string} source - Source of transcript (youtube, supadata, ai, etc.)
 */
export async function saveTranscriptToR2(bucket, videoId, lang, segments, source) {
    if (!bucket || !videoId || !segments?.length) return;

    const key = `transcripts/${videoId}/${lang}.json`;

    try {
        const data = {
            videoId,
            language: lang,
            segments,
            source,
            timestamp: Date.now()
        };

        await bucket.put(key, JSON.stringify(data), {
            httpMetadata: {
                contentType: 'application/json'
            },
            customMetadata: {
                source,
                segmentCount: String(segments.length),
                timestamp: String(Date.now())
            }
        });

        log('R2 save success:', key, `(${segments.length} segments)`);

    } catch (err) {
        console.error('[R2 Transcripts] Write error:', err.message);
    }
}

/**
 * Check if transcript exists in R2
 * @param {R2Bucket} bucket - R2 bucket binding
 * @param {string} videoId - YouTube video ID
 * @param {string} lang - Language code
 * @returns {Promise<boolean>}
 */
export async function hasTranscriptInR2(bucket, videoId, lang) {
    if (!bucket) return false;

    const key = `transcripts/${videoId}/${lang}.json`;

    try {
        const head = await bucket.head(key);
        return !!head;
    } catch {
        return false;
    }
}

/**
 * Delete transcript from R2 (for cleanup/maintenance)
 * @param {R2Bucket} bucket - R2 bucket binding
 * @param {string} videoId - YouTube video ID
 * @param {string} lang - Language code
 */
export async function deleteTranscriptFromR2(bucket, videoId, lang) {
    if (!bucket) return;

    const key = `transcripts/${videoId}/${lang}.json`;

    try {
        await bucket.delete(key);
        log('R2 delete:', key);
    } catch (err) {
        console.error('[R2 Transcripts] Delete error:', err.message);
    }
}
