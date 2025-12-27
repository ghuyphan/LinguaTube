/**
 * YouTube Transcript Proxy (Cloudflare Function)
 * 
 * Sequential strategy with Supadata as last resort:
 *   1. Cache (KV/D1)
 *   2. youtube-caption-extractor (free)
 *   3. youtube-transcript (free)
 *   4. Supadata API (paid - only if free strategies fail)
 *
 * @version 16.3.0 - Supadata deduplication + no-caption tracking to save credits
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
import { getTranscript, saveTranscript } from '../_shared/transcript-db.js';
import { checkRateLimit, incrementRateLimit, getClientIP, rateLimitResponse } from '../_shared/rate-limiter.js';
import { getSubtitles } from 'youtube-caption-extractor';
import { YoutubeTranscript } from 'youtube-transcript';

// ============================================================================
// Configuration
// ============================================================================

const DEBUG = false;
const CACHE_TTL = 60 * 60 * 24 * 30; // 30 days
const DEFAULT_LANGS = ['ja', 'zh', 'ko', 'en'];

// Timeout configuration - fail fast to move to next strategy
const STRATEGY_TIMEOUT_MS = 5000; // 5s max per free strategy
const SUPADATA_TIMEOUT_MS = 10000; // 10s for Supadata

// Rate limiting configuration
const RATE_LIMIT_CONFIG = { max: 30, windowSeconds: 3600, keyPrefix: 'innertube' };

// Supadata configuration
const SUPADATA_API_URL = 'https://api.supadata.ai/v1/youtube/transcript';

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
    const { env } = context;

    return jsonResponse({
        status: 'ok',
        mode: 'sequential',
        strategies: [
            'youtube-caption-extractor',
            'youtube-transcript',
            env.SUPADATA_API_KEY ? 'supadata (last resort)' : 'supadata (not configured)'
        ],
        version: '16.1.0',
        timestamp: new Date().toISOString()
    });
}

/**
 * Main transcript endpoint - POST /api/innertube
 */
export async function onRequestPost(context) {
    const { request, env, waitUntil } = context;
    const elapsed = timer();

    // Rate limiting
    const clientIP = getClientIP(request);
    const rateCheck = await checkRateLimit(env.TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);
    if (!rateCheck.allowed) {
        log(`Rate limited: ${clientIP}`);
        return rateLimitResponse(rateCheck.resetAt);
    }

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
        // Step 2: Try free strategies first (sequential)
        // =====================================================================
        let result = null;
        let source = 'none';

        // Strategy 1: youtube-caption-extractor (free)
        log('Trying youtube-caption-extractor...');
        result = await tryCaptionExtractor(videoId, targetLanguages);
        if (result) {
            source = 'caption-extractor';
        }

        // Strategy 2: youtube-transcript (free)
        if (!result) {
            log('Trying youtube-transcript...');
            result = await tryYoutubeTranscript(videoId, targetLanguages);
            if (result) {
                source = 'youtube-transcript';
            }
        }

        // =====================================================================
        // Step 3: Supadata as LAST RESORT (preserves credits)
        // =====================================================================
        if (!result && env.SUPADATA_API_KEY) {
            log('Free strategies failed, trying Supadata as last resort...');
            result = await trySupadata(videoId, targetLanguages, env.SUPADATA_API_KEY, cache);
            if (result) {
                source = 'supadata';
            }
        }

        // =====================================================================
        // Return result
        // =====================================================================
        if (result) {
            log(`${source} succeeded (${elapsed()}ms)`);

            // Increment rate limit (only for non-cached responses)
            await incrementRateLimit(env.TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);

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
// Strategy 1: youtube-caption-extractor (Free)
// ============================================================================

async function tryCaptionExtractor(videoId, langs) {
    for (const lang of langs) {
        try {
            const subs = await withTimeout(
                getSubtitles({ videoID: videoId, lang }),
                STRATEGY_TIMEOUT_MS,
                `caption-extractor timeout for ${lang}`
            );

            if (!subs?.length) {
                log(`caption-extractor [${lang}]: No subtitles found`);
                continue;
            }

            const cues = subs.map((s, i) => ({
                id: i,
                start: parseFloat(s.start),
                duration: parseFloat(s.dur),
                text: s.text.trim()
            })).filter(c => c.text);

            if (!cues.length) {
                log(`caption-extractor [${lang}]: Empty cues after filtering`);
                continue;
            }

            log(`caption-extractor: Got ${cues.length} cues in ${lang}`);
            return { data: buildResponse(videoId, lang, cleanTranscriptSegments(cues)) };

        } catch (e) {
            log(`caption-extractor [${lang}] failed: ${e.message}`);
        }
    }

    return null;
}

// ============================================================================
// Strategy 2: youtube-transcript (Free)
// ============================================================================

async function tryYoutubeTranscript(videoId, langs) {
    for (const lang of langs) {
        try {
            const transcript = await withTimeout(
                YoutubeTranscript.fetchTranscript(videoId, { lang }),
                STRATEGY_TIMEOUT_MS,
                `youtube-transcript timeout for ${lang}`
            );

            if (!transcript?.length) {
                log(`youtube-transcript [${lang}]: No transcript found`);
                continue;
            }

            const cues = transcript.map((item, i) => ({
                id: i,
                start: item.offset / 1000,
                duration: item.duration / 1000,
                text: item.text.trim()
            })).filter(c => c.text);

            if (!cues.length) {
                log(`youtube-transcript [${lang}]: Empty cues after filtering`);
                continue;
            }

            log(`youtube-transcript: Got ${cues.length} cues in ${lang}`);
            return { data: buildResponse(videoId, lang, cleanTranscriptSegments(cues)) };

        } catch (e) {
            log(`youtube-transcript [${lang}] failed: ${e.message}`);
        }
    }

    return null;
}

// ============================================================================
// Strategy 3: Supadata API (Paid - Last Resort)
// ============================================================================

// Supadata deduplication: Lock TTL in seconds
const SUPADATA_LOCK_TTL = 300; // 5 minutes
const SUPADATA_NO_CAPTION_TTL = 3600; // 1 hour - short enough to retry, long enough to cover gap

/**
 * Check if there's an active Supadata request for this video
 * Returns true if we should skip Supadata (already processing or recently failed)
 */
async function isSupadataLocked(cache, videoId) {
    if (!cache) return false;
    try {
        const lock = await cache.get(`supadata:lock:${videoId}`);
        return !!lock;
    } catch {
        return false;
    }
}

/**
 * Check if this video was recently confirmed to have no captions
 * Prevents repeated Supadata calls for videos without captions (saves credits)
 */
async function hasNoCaption(cache, videoId) {
    if (!cache) return false;
    try {
        const marker = await cache.get(`supadata:nocap:${videoId}`);
        return !!marker;
    } catch {
        return false;
    }
}

/**
 * Mark a video as having no captions (all Supadata languages returned 404)
 * Uses minimal storage: key + "1" value, 1-hour TTL
 */
async function markNoCaption(cache, videoId) {
    if (!cache) return;
    try {
        await cache.put(`supadata:nocap:${videoId}`, '1', { expirationTtl: SUPADATA_NO_CAPTION_TTL });
        log(`Supadata: Marked ${videoId} as no-caption (1h TTL)`);
    } catch (e) {
        log(`Supadata: Failed to mark no-caption: ${e.message}`);
    }
}

/**
 * Set a lock to prevent duplicate Supadata requests
 */
async function setSupadataLock(cache, videoId) {
    if (!cache) return;
    try {
        await cache.put(`supadata:lock:${videoId}`, '1', { expirationTtl: SUPADATA_LOCK_TTL });
        log(`Supadata: Lock set for ${videoId}`);
    } catch (e) {
        log(`Supadata: Failed to set lock: ${e.message}`);
    }
}

/**
 * Clear the Supadata lock after successful completion
 */
async function clearSupadataLock(cache, videoId) {
    if (!cache) return;
    try {
        await cache.delete(`supadata:lock:${videoId}`);
        log(`Supadata: Lock cleared for ${videoId}`);
    } catch (e) {
        log(`Supadata: Failed to clear lock: ${e.message}`);
    }
}

async function trySupadata(videoId, langs, apiKey, cache) {
    if (!apiKey) {
        log('Supadata: No API key configured, skipping');
        return null;
    }

    // Check if this video was recently confirmed to have no captions
    const noCaptions = await hasNoCaption(cache, videoId);
    if (noCaptions) {
        log(`Supadata: Skipping ${videoId} - known no-caption video`);
        return null;
    }

    // Check if there's already an in-flight Supadata request for this video
    const isLocked = await isSupadataLocked(cache, videoId);
    if (isLocked) {
        log(`Supadata: Skipping ${videoId} - already processing (deduplication)`);
        return null;
    }

    // Set lock before making the API call
    await setSupadataLock(cache, videoId);

    let all404 = true; // Track if ALL languages returned 404

    for (const lang of langs) {
        try {
            const url = new URL(SUPADATA_API_URL);
            url.searchParams.set('videoId', videoId);
            url.searchParams.set('lang', lang);
            url.searchParams.set('text', 'false');

            log(`Supadata: Fetching ${videoId} in ${lang}`);

            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'x-api-key': apiKey,
                    'Accept': 'application/json'
                },
                signal: AbortSignal.timeout(SUPADATA_TIMEOUT_MS)
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'Unknown error');
                log(`Supadata [${lang}] HTTP ${response.status}: ${errorText}`);

                if (response.status === 404) {
                    // Still a 404 - continue to next language
                    continue;
                }

                if (response.status === 402) {
                    // Credit issue - not a caption availability issue
                    all404 = false;
                    continue;
                }

                // Other error - not a 404
                all404 = false;
                throw new Error(`Supadata returned ${response.status}`);
            }

            const data = await response.json();

            if (!data.content || !Array.isArray(data.content) || data.content.length === 0) {
                log(`Supadata [${lang}]: No content in response`);
                continue;
            }

            const cues = data.content.map((segment, i) => ({
                id: i,
                start: segment.offset / 1000,
                duration: segment.duration / 1000,
                text: (segment.text || '').trim()
            })).filter(c => c.text);

            if (!cues.length) {
                log(`Supadata [${lang}]: Empty cues after filtering`);
                continue;
            }

            const detectedLang = data.lang || lang;
            log(`Supadata: Got ${cues.length} cues in ${detectedLang}`);

            // Success! Clear the lock since result will be cached
            await clearSupadataLock(cache, videoId);

            return { data: buildResponse(videoId, detectedLang, cleanTranscriptSegments(cues)) };

        } catch (e) {
            log(`Supadata [${lang}] failed: ${e.message}`);
            all404 = false; // Error means we can't confirm it's a no-caption video

            if (e.name === 'TimeoutError' || e.name === 'AbortError') {
                // Keep the lock on timeout - prevents retry storms
                // Lock will auto-expire after SUPADATA_LOCK_TTL
                continue;
            }
        }
    }

    // All languages failed
    await clearSupadataLock(cache, videoId);

    // If ALL languages returned 404, mark as no-caption video
    if (all404) {
        await markNoCaption(cache, videoId);
    }

    return null;
}

// ============================================================================
// Utilities
// ============================================================================

function withTimeout(promise, ms, message) {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error(message || `Timeout after ${ms}ms`)), ms)
        )
    ]);
}

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