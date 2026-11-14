/**
 * R2 Transcript Storage Utilities
 * Provides read/write operations for permanent transcript storage in R2
 * 
 * Object key format:
 * - Native transcripts: transcripts/{videoId}/{lang}.json
 * - AI transcripts:     transcripts/{videoId}/{lang}.ai.json
 *
 * Metadata includes: source, timestamp, segmentCount
 */

import { contradictsNativeLanguage, normalizeLanguageCode } from '../utils/transcript-utils.js';

const DEBUG = false;
const log = (...args) => DEBUG && console.log('[R2 Transcripts]', ...args);

export function getTranscriptKey(videoId, lang, isAI = false) {
    return isAI
        ? `transcripts/${videoId}/${lang}.ai.json`
        : `transcripts/${videoId}/${lang}.json`;
}

/**
 * Get transcript from R2 bucket
 * @param {R2Bucket} bucket - R2 bucket binding
 * @param {string} videoId - YouTube video ID
 * @param {string} lang - Language code
 * @param {boolean|{preferAI?: boolean, isAI?: boolean}} [options] - Options or isAI flag
 * @returns {Promise<{segments: Array, source: string, language: string, trackLanguage?: string, publishedAt: number, key: string} | null>}
 */
export async function getTranscriptFromR2(bucket, videoId, lang, options = {}) {
    if (!bucket) return null;

    const isAI = typeof options === 'boolean'
        ? options
        : Boolean(options?.preferAI || options?.isAI);

    const primaryKey = getTranscriptKey(videoId, lang, isAI);

    const fetchObject = async (key) => {
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
                publishedAt: Number.isFinite(data.timestamp) ? data.timestamp : 0,
                key
            };
        } catch (err) {
            console.error('[R2 Transcripts] Read error:', err.message);
            return null;
        }
    };

    // 1. Fetch primary target track (either .ai.json or .json)
    const primary = await fetchObject(primaryKey);
    if (primary) return primary;

    // 2. Fallback handling for backward compatibility with existing R2 objects:
    // If AI was requested, check if legacy .json holds a transcript with source === 'ai'
    if (isAI) {
        const legacyKey = getTranscriptKey(videoId, lang, false);
        const legacy = await fetchObject(legacyKey);
        if (legacy && legacy.source === 'ai') {
            return legacy;
        }
    } else {
        // If native was requested, but no native track exists in R2,
        // check if an AI track is available as fallback
        const aiKey = getTranscriptKey(videoId, lang, true);
        const aiFallback = await fetchObject(aiKey);
        if (aiFallback) {
            return aiFallback;
        }
    }

    return null;
}

/**
 * Save transcript to R2 bucket
 * @param {R2Bucket} bucket - R2 bucket binding
 * @param {string} videoId - YouTube video ID
 * @param {string} lang - Language code
 * @param {Array} segments - Transcript segments
 * @param {string} source - Source of transcript (youtube, supadata, ai, etc.)
 * @param {object|null} guard - Optional AI job guard
 * @param {string|null} trackLanguage - Optional track language identifier
 */
export async function saveTranscriptToR2(bucket, videoId, lang, segments, source, guard = null, trackLanguage = null) {
    if (!bucket || !videoId || !segments?.length) return false;

    const isAI = source === 'ai';
    const key = getTranscriptKey(videoId, lang, isAI);

    try {
        const conditional = guard || trackLanguage;
        const current = conditional ? await bucket.head(key) : null;
        if (guard && Number(current?.customMetadata?.jobCreatedAt || 0) > guard.createdAt) {
            throw new Error('Newer transcript exists');
        }
        if (trackLanguage && current?.customMetadata?.source === 'ai') return false;

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
