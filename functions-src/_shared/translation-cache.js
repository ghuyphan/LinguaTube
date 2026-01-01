/**
 * R2 Translation Cache Utilities
 * Provides read/write operations for dual subtitle translations in R2
 * 
 * Object key format: translations/{videoId}/{sourceLang}-{targetLang}.json
 */

const DEBUG = true;
const log = (...args) => DEBUG && console.log('[R2 Translations]', ...args);

/**
 * Get cached translation from R2
 * @param {R2Bucket} bucket - R2 bucket binding
 * @param {string} videoId - YouTube video ID
 * @param {string} srcLang - Source language code
 * @param {string} tgtLang - Target language code
 * @returns {Promise<{segments: Array, source: string} | null>}
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

        log('Cache hit:', key, `(${data.segments.length} segments)`);
        return {
            segments: data.segments,
            source: object.customMetadata?.source || 'lingva',
            timestamp: data.timestamp
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
 * @param {string} source - Translation provider (default: lingva)
 */
export async function saveTranslation(bucket, videoId, srcLang, tgtLang, segments, source = 'lingva') {
    if (!bucket || !videoId || !segments?.length) return;

    const key = `translations/${videoId}/${srcLang}-${tgtLang}.json`;

    try {
        const data = {
            videoId,
            sourceLang: srcLang,
            targetLang: tgtLang,
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

        log('Cache save success:', key, `(${segments.length} segments)`);

    } catch (err) {
        console.error('[R2 Translations] Write error:', err.message);
    }
}
