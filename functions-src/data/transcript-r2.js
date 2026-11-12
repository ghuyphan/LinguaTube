/**
 * R2 Transcript Storage Utilities
 * Provides read/write operations for permanent transcript storage in R2
 * 
 * Object key format: transcripts/{videoId}/{lang}.json
 * Metadata includes: source, timestamp, segmentCount
 */

import { contradictsNativeLanguage, normalizeLanguageCode } from '../utils/transcript-utils.js';

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

        if (!Array.isArray(data?.segments) || !data.segments.length ||
            data.segments.some(cue => typeof cue?.text !== 'string' ||
                !Number.isFinite(cue.start) || cue.start < 0 ||
                !Number.isFinite(cue.duration) || cue.duration < 0)) {
            log('R2 hit but empty:', key);
            return null;
        }

        const source = object.customMetadata?.source || data.source || 'r2';
        const language = normalizeLanguageCode(data.language || lang);
        if (language !== normalizeLanguageCode(lang) ||
            (source !== 'ai' && contradictsNativeLanguage(data.segments, language))) {
            console.warn(JSON.stringify({ event: 'transcript_cache_language_rejected', videoId, language }));
            return null;
        }

        log('R2 hit:', key, `(${data.segments.length} segments)`);
        return {
            segments: data.segments,
            source,
            language,
            trackLanguage: data.trackLanguage,
            publishedAt: Number.isFinite(data.timestamp) ? data.timestamp : 0
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
export async function saveTranscriptToR2(bucket, videoId, lang, segments, source, guard = null, trackLanguage = null) {
    if (!bucket || !videoId || !segments?.length) return false;

    const key = `transcripts/${videoId}/${lang}.json`;

    try {
        // AI ingestion has its own job guard. Provider-verified native writes
        // also use an ETag so a concurrent write cannot replace the winner.
        const conditional = guard || trackLanguage;
        const current = conditional ? await bucket.head(key) : null;
        if (trackLanguage && current?.customMetadata?.source === 'ai') return false;
        if (guard && Number(current?.customMetadata?.jobCreatedAt || 0) > guard.createdAt) throw new Error('Newer transcript exists');
        const data = {
            videoId,
            language: lang,
            ...(trackLanguage ? { trackLanguage } : {}),
            segments,
            source,
            timestamp: Date.now()
        };

        const written = await bucket.put(key, JSON.stringify(data), {
            ...(conditional ? { onlyIf: current ? { etagMatches: current.etag } : { etagDoesNotMatch: '*' } } : {}),
            httpMetadata: {
                contentType: 'application/json'
            },
            customMetadata: {
                source,
                ...(guard ? { jobId: guard.jobId, jobCreatedAt: String(guard.createdAt) } : {}),
                segmentCount: String(segments.length),
                timestamp: String(Date.now())
            }
        });

        if (guard && written === null) throw new Error('Transcript changed during ingestion');
        if (conditional && written === null) return false;
        log('R2 save success:', key, `(${segments.length} segments)`);
        return true;
    } catch (err) {
        console.error('[R2 Transcripts] Write error:', err.message);
        return false;
    }
}
