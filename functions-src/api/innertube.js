/**
 * YouTube Transcript Proxy (Cloudflare Function) - Simplified Version
 * 
 * Uses two similar libraries with different internal methods for reliability:
 *   1. Cache (KV/D1)
 *   2. youtube-caption-extractor (primary - uses video page parsing)
 *   3. youtube-transcript (fallback - uses transcript API endpoint)
 *
 * @version 14.0.0 - Dual library approach for reliability
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
import { getTranscript, saveTranscript } from '../_shared/transcript-db.js';
import { getSubtitles } from 'youtube-caption-extractor';
import { YoutubeTranscript } from 'youtube-transcript';

// ============================================================================
// Configuration
// ============================================================================

const DEBUG = true;
const CACHE_TTL = 60 * 60 * 24 * 30; // 30 days
const DEFAULT_LANGS = ['ja', 'zh', 'ko', 'en'];

// Retry configuration - optimized for CF Workers
const MAX_RETRIES = 2; // Reduced since we have a fallback library
const INITIAL_RETRY_DELAY = 300; // ms
const BACKOFF_MULTIPLIER = 1.5;

const log = (...args) => DEBUG && console.log('[Innertube]', ...args);
const timer = () => { const s = Date.now(); return () => Date.now() - s; };

// ============================================================================
// Request Handlers
// ============================================================================

export const onRequestOptions = () => handleOptions(['GET', 'POST', 'OPTIONS']);

/**
 * Health check endpoint - GET /api/innertube
 */
export async function onRequestGet(context) {
    return jsonResponse({
        status: 'ok',
        strategies: ['youtube-caption-extractor', 'youtube-transcript'],
        version: '14.0.0',
        timestamp: new Date().toISOString()
    });
}

/**
 * Main transcript endpoint - POST /api/innertube
 */
export async function onRequestPost(context) {
    const { request, env, waitUntil } = context;
    const elapsed = timer();

    try {
        const body = await request.json();
        const { videoId, forceRefresh = false, targetLanguages = DEFAULT_LANGS } = body;

        if (!validateVideoId(videoId)) {
            return jsonResponse({ error: 'Invalid videoId' }, 400);
        }

        const cache = env.TRANSCRIPT_CACHE;
        const db = env.VOCAB_DB;
        const primaryLang = targetLanguages[0];

        log(`Request: ${videoId}, langs: ${targetLanguages.join(',')}`);

        // =====================================================================
        // Step 1: Check Cache (parallel KV + D1 for speed)
        // =====================================================================
        if (!forceRefresh) {
            const cached = await checkCache(cache, db, videoId, primaryLang);
            if (cached) {
                log(`Cache hit (${elapsed()}ms)`);
                return jsonResponse({ ...cached, timing: elapsed() });
            }
        }

        // =====================================================================
        // Step 2: Try primary strategy (youtube-caption-extractor)
        // =====================================================================
        log('Trying youtube-caption-extractor...');
        let result = await tryCaptionExtractor(videoId, targetLanguages);
        let source = 'caption-extractor';

        // =====================================================================
        // Step 3: Fallback to youtube-transcript if primary fails
        // =====================================================================
        if (!result) {
            log('Primary failed, trying youtube-transcript fallback...');
            result = await tryYoutubeTranscript(videoId, targetLanguages);
            source = 'youtube-transcript';
        }

        // =====================================================================
        // Return result
        // =====================================================================
        if (result) {
            log(`${source} succeeded (${elapsed()}ms)`);

            // Use waitUntil for non-blocking cache save
            const cachePromise = saveToCache(cache, db, videoId, primaryLang, result.data, source);

            if (waitUntil) {
                waitUntil(cachePromise);
            } else {
                await cachePromise;
            }

            return jsonResponse({ ...result.data, source, timing: elapsed() });
        }

        // =====================================================================
        // All strategies failed
        // =====================================================================
        log(`All strategies failed (${elapsed()}ms)`);
        return jsonResponse({
            videoDetails: { videoId },
            captions: { playerCaptionsTracklistRenderer: { captionTracks: [] } },
            source: 'none',
            warning: 'No captions available - all strategies failed',
            timing: elapsed()
        });

    } catch (error) {
        console.error('[Innertube] Fatal:', error);
        return errorResponse(error.message);
    }
}

// ============================================================================
// Retry Helper with Exponential Backoff
// ============================================================================

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function withRetry(fn, options = {}) {
    const {
        maxRetries = MAX_RETRIES,
        initialDelay = INITIAL_RETRY_DELAY,
        backoffMultiplier = BACKOFF_MULTIPLIER
    } = options;

    let lastError;
    let delay = initialDelay;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;

            const isTransient = isTransientError(error);
            log(`Attempt ${attempt}/${maxRetries} failed: ${error.message} (transient: ${isTransient})`);

            if (!isTransient) {
                throw error;
            }

            if (attempt < maxRetries) {
                log(`Retrying in ${Math.round(delay)}ms...`);
                await sleep(delay);
                delay *= backoffMultiplier;
            }
        }
    }

    throw lastError;
}

function isTransientError(error) {
    const msg = error?.message?.toLowerCase() || '';

    const permanentErrors = [
        'video unavailable',
        'private video',
        'video is private',
        'no captions',
        'captions disabled',
        'age-restricted',
        'removed',
        'deleted',
        'copyright',
        'unavailable',
    ];

    if (permanentErrors.some(e => msg.includes(e))) {
        return false;
    }

    return true;
}

// ============================================================================
// Cache
// ============================================================================

async function checkCache(cache, db, videoId, lang) {
    const cacheKey = `captions:v9:${videoId}:${lang}`;

    const [kvResult, d1Result] = await Promise.allSettled([
        cache ? checkKVCache(cache, cacheKey) : Promise.resolve(null),
        db ? checkD1Cache(db, videoId, lang) : Promise.resolve(null)
    ]);

    if (kvResult.status === 'fulfilled' && kvResult.value) {
        return kvResult.value;
    }

    if (d1Result.status === 'fulfilled' && d1Result.value) {
        return d1Result.value;
    }

    return null;
}

async function checkKVCache(cache, cacheKey) {
    try {
        const cached = await cache.get(cacheKey, 'json');
        if (cached?.captions?.playerCaptionsTracklistRenderer?.captionTracks?.some(t => t.content?.length)) {
            return { ...cached, source: 'cache:kv' };
        }
    } catch (e) {
        log(`KV cache error: ${e.message}`);
    }
    return null;
}

async function checkD1Cache(db, videoId, lang) {
    try {
        const d1 = await getTranscript(db, videoId, lang);
        if (d1?.segments?.length) {
            return {
                captions: {
                    playerCaptionsTracklistRenderer: {
                        captionTracks: [{ languageCode: d1.language, content: d1.segments }]
                    }
                },
                source: `cache:d1:${d1.source}`
            };
        }
    } catch (e) {
        log(`D1 cache error: ${e.message}`);
    }
    return null;
}

async function saveToCache(cache, db, videoId, lang, data, source) {
    const cacheKey = `captions:v9:${videoId}:${lang}`;
    const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    const track = tracks?.find(t => t.languageCode === lang) || tracks?.[0];

    log(`saveToCache: db=${!!db}, tracks=${tracks?.length}, content=${track?.content?.length}`);

    const savePromises = [];

    if (cache) {
        savePromises.push(
            cache.put(cacheKey, JSON.stringify(data), { expirationTtl: CACHE_TTL })
                .then(() => log('KV save success'))
                .catch(e => log(`KV save error: ${e.message}`))
        );
    }

    if (track?.content?.length && db) {
        savePromises.push(
            saveTranscript(db, videoId, track.languageCode, track.content, source)
                .then(() => log(`D1 save success: ${videoId} ${track.languageCode}`))
                .catch(e => console.error(`D1 save error: ${e.message}`))
        );
    }

    await Promise.allSettled(savePromises);
}

// ============================================================================
// Strategy 1: youtube-caption-extractor (Primary)
// Uses video page parsing with dual extraction methods
// ============================================================================

async function tryCaptionExtractor(videoId, langs) {
    for (const lang of langs) {
        try {
            const result = await withRetry(async () => {
                const subs = await getSubtitles({ videoID: videoId, lang });

                if (!subs?.length) {
                    throw new Error(`No subtitles found for lang: ${lang}`);
                }

                const cues = subs.map((s, i) => ({
                    id: i,
                    start: parseFloat(s.start),
                    duration: parseFloat(s.dur),
                    text: s.text.trim()
                })).filter(c => c.text);

                if (!cues.length) {
                    throw new Error(`Empty cues after filtering for lang: ${lang}`);
                }

                return cues;
            });

            if (result) {
                log(`caption-extractor: Got ${result.length} cues in ${lang}`);
                return { data: buildResponse(videoId, lang, cleanTranscriptSegments(result)) };
            }
        } catch (e) {
            log(`caption-extractor [${lang}] failed: ${e.message}`);
        }
    }

    return null;
}

// ============================================================================
// Strategy 2: youtube-transcript (Fallback)
// Uses YouTube's transcript API endpoint directly
// ============================================================================

async function tryYoutubeTranscript(videoId, langs) {
    for (const lang of langs) {
        try {
            const result = await withRetry(async () => {
                // youtube-transcript uses a different API endpoint
                const transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang });

                if (!transcript?.length) {
                    throw new Error(`No transcript found for lang: ${lang}`);
                }

                const cues = transcript.map((item, i) => ({
                    id: i,
                    start: item.offset / 1000, // Convert ms to seconds
                    duration: item.duration / 1000,
                    text: item.text.trim()
                })).filter(c => c.text);

                if (!cues.length) {
                    throw new Error(`Empty cues after filtering for lang: ${lang}`);
                }

                return cues;
            });

            if (result) {
                log(`youtube-transcript: Got ${result.length} cues in ${lang}`);
                return { data: buildResponse(videoId, lang, cleanTranscriptSegments(result)) };
            }
        } catch (e) {
            log(`youtube-transcript [${lang}] failed: ${e.message}`);
        }
    }

    return null;
}

// ============================================================================
// Response Builder
// ============================================================================

function buildResponse(videoId, lang, content) {
    return {
        videoDetails: { videoId },
        captions: {
            playerCaptionsTracklistRenderer: {
                captionTracks: [{ languageCode: lang, content }]
            }
        }
    };
}