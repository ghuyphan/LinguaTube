/**
 * YouTube Transcript Proxy (Cloudflare Function)
 * 
 * Optimized parallel strategy with Supadata as last resort:
 *   1. Cache (KV/D1)
 *   2. Race: youtube-caption-extractor + youtube-transcript (parallel per language)
 *   3. Supadata API (paid - only if free strategies fail)
 *
 * @version 17.3.0 - Only fetch primary language (no fallback to other languages)
 */

import {
    jsonResponse,
    handleOptions,
    errorResponse,
    sanitizeVideoId,
    sanitizeLanguage,
    verifyLanguage
} from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
import { getTranscript, saveTranscript, getAvailableLangs, addAvailableLang } from '../_shared/transcript-db.js';
import { getTranscriptFromR2, saveTranscriptToR2 } from '../_shared/transcript-r2.js';
import {
    consumeRateLimit,
    getClientIP,
    rateLimitResponse,
    getRateLimitHeaders
} from '../_shared/rate-limiter.js';
import { validateVideoRequest, isLanguageSupported } from '../_shared/video-validator.js';
import { getSubtitles } from 'youtube-caption-extractor';
import { YoutubeTranscript } from 'youtube-transcript';

// ============================================================================
// Configuration
// ============================================================================

const DEBUG = true;
const CACHE_TTL = 60 * 60 * 24 * 30; // 30 days
const DEFAULT_LANGS = ['ja', 'zh', 'ko', 'en'];

// Timeout configuration - fail fast to move to next strategy
const STRATEGY_TIMEOUT_MS = 5000; // 5s max per free strategy
const SUPADATA_TIMEOUT_MS = 10000; // 10s for Supadata

// Rate limiting configuration
const RATE_LIMIT_CONFIG = { max: 30, windowSeconds: 3600, keyPrefix: 'innertube' };

// Supadata configuration
const SUPADATA_API_URL = 'https://api.supadata.ai/v1/youtube/transcript';

// Supadata deduplication: Lock TTL in seconds
const SUPADATA_LOCK_TTL = 300; // 5 minutes
const SUPADATA_NO_CAPTION_TTL = 3600; // 1 hour

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
        timestamp: new Date().toISOString(),
        service: 'innertube-proxy'
    });
}

/**
 * Main transcript endpoint - POST /api/innertube
 */
export async function onRequestPost(context) {
    const { request, env, waitUntil } = context;
    const elapsed = timer();

    // Rate limiting (Atomic check and consume)
    const clientIP = getClientIP(request);
    const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);
    if (!rateCheck.allowed) {
        log(`Rate limited: ${clientIP}`);
        return rateLimitResponse(rateCheck.resetAt);
    }

    try {
        const body = await request.json();
        const videoId = sanitizeVideoId(body.videoId);
        const primaryLang = sanitizeLanguage(body.targetLanguages?.[0]);
        const forceRefresh = !!body.forceRefresh;
        const targetLanguages = body.targetLanguages || DEFAULT_LANGS;

        if (!videoId) {
            return jsonResponse({ error: 'Invalid or missing videoId' }, 400);
        }
        if (!primaryLang) {
            return jsonResponse({ error: 'Invalid or missing primary language' }, 400);
        }

        const r2 = env.TRANSCRIPT_STORAGE;
        const cache = env.TRANSCRIPT_CACHE; // KV still used for rate limiting
        const db = env.VOCAB_DB;

        // Early validation - reject unsupported languages before any API calls
        const validation = await validateVideoRequest(videoId, primaryLang, body.duration, 'innertube');
        if (validation) {
            log(`Validation failed: ${validation.error}`);
            return jsonResponse(validation, 400, getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt));
        }

        log(`Request: ${videoId}, langs: ${targetLanguages.join(',')}`);

        // =====================================================================
        // Step 1: Check Cache (R2 primary, D1 backup)
        // =====================================================================
        if (!forceRefresh) {
            const cached = await checkCache(r2, db, videoId, primaryLang);
            if (cached) {
                log(`Cache hit (${elapsed()}ms)`);
                return jsonResponse({ ...cached, timing: elapsed() }, 200, {
                    'X-Cache': 'HIT',
                    ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
                });
            }
        }

        // =====================================================================
        // Step 2: Try free strategies (parallel race per language)
        // =====================================================================
        let result = null;
        let source = 'none';

        log('Racing free strategies in parallel...');
        const freeResult = await tryFreeStrategies(videoId, targetLanguages);
        if (freeResult) {
            result = freeResult;
            source = freeResult.source;
        }

        // =====================================================================
        // Step 3: Supadata as LAST RESORT (preserves credits)
        // =====================================================================
        if (!result && env.SUPADATA_API_KEY) {
            // Check if we know which languages are available for this video
            const availableLangs = await getAvailableLangs(db, videoId);

            if (availableLangs && !availableLangs.includes(primaryLang)) {
                // We KNOW this language doesn't exist - skip Supadata to save credits
                log(`Supadata: Skipping ${videoId}:${primaryLang} - known unavailable (available: ${availableLangs.join(',')})`);
            } else {
                // Either first time (no metadata) or language IS available - try Supadata
                log('Free strategies failed, trying Supadata as last resort...');
                const supadataResult = await trySupadata(videoId, targetLanguages, env.SUPADATA_API_KEY, cache);
                if (supadataResult) {
                    result = supadataResult;
                    source = 'supadata';
                }
            }
        }

        // =====================================================================
        // Return result
        // =====================================================================
        if (result) {
            log(`${source} succeeded (${elapsed()}ms)`);


            // Get actual language from result (not requested language)
            // This prevents caching EN captions under a JA key
            const tracks = result.data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
            const actualLang = tracks?.[0]?.languageCode || primaryLang;

            // Use waitUntil for non-blocking cache save
            const cachePromise = saveToCache(r2, db, videoId, actualLang, result.data, source);

            if (waitUntil) {
                waitUntil(cachePromise);
            } else {
                await cachePromise;
            }

            return jsonResponse({ ...result.data, source, timing: elapsed() }, 200, {
                'X-Cache': 'MISS',
                ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
            });
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

async function checkCache(r2, db, videoId, lang) {
    // Check R2 first (primary storage), then D1 (backup/legacy)
    // Check for both YouTube and AI transcripts
    const [r2Result, d1Result, r2AiResult, d1AiResult] = await Promise.allSettled([
        r2 ? checkR2Cache(r2, videoId, lang) : Promise.resolve(null),
        db ? checkD1Cache(db, videoId, lang) : Promise.resolve(null),
        r2 ? checkR2Cache(r2, videoId, lang, 'ai') : Promise.resolve(null),
        db ? checkD1Cache(db, videoId, lang, 'ai') : Promise.resolve(null)
    ]);

    // Prefer YouTube transcripts over AI transcripts
    if (r2Result.status === 'fulfilled' && r2Result.value) {
        return r2Result.value;
    }

    if (d1Result.status === 'fulfilled' && d1Result.value) {
        return d1Result.value;
    }

    // Fallback to AI transcripts if no YouTube transcripts found
    if (r2AiResult.status === 'fulfilled' && r2AiResult.value) {
        log('Found cached AI transcript in R2');
        return r2AiResult.value;
    }

    if (d1AiResult.status === 'fulfilled' && d1AiResult.value) {
        log('Found cached AI transcript in D1');
        return d1AiResult.value;
    }

    return null;
}

async function checkR2Cache(r2, videoId, lang, source = null) {
    try {
        const result = await getTranscriptFromR2(r2, videoId, lang);
        // If source filter is specified, check if it matches
        if (result?.segments?.length) {
            if (source && result.source !== source) {
                return null; // Source doesn't match filter
            }
            return {
                captions: {
                    playerCaptionsTracklistRenderer: {
                        captionTracks: [{ languageCode: result.language, content: result.segments }]
                    }
                },
                source: `cache:r2:${result.source}`
            };
        }
    } catch (e) {
        log(`R2 cache error: ${e.message}`);
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

async function checkD1Cache(db, videoId, lang, source = null) {
    try {
        // Pass source filter to D1 query
        const d1 = await getTranscript(db, videoId, lang, source);
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

async function saveToCache(r2, db, videoId, lang, data, source) {
    const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    const track = tracks?.find(t => t.languageCode === lang) || tracks?.[0];

    log(`saveToCache: r2=${!!r2}, db=${!!db}, tracks=${tracks?.length}, content=${track?.content?.length}`);

    const savePromises = [];

    // Primary storage: R2 (unlimited, cheap)
    if (r2 && track?.content?.length) {
        savePromises.push(
            saveTranscriptToR2(r2, videoId, track.languageCode, track.content, source)
                .then(() => log(`R2 save success: ${videoId} ${track.languageCode}`))
                .catch(e => log(`R2 save error: ${e.message}`))
        );
    }

    // Backup storage: D1 (for structured queries, video_meta)
    if (track?.content?.length && db) {
        savePromises.push(
            saveTranscript(db, videoId, track.languageCode, track.content, source)
                .then(() => log(`D1 save success: ${videoId} ${track.languageCode}`))
                .catch(e => console.error(`D1 save error: ${e.message}`))
        );

        // Track this language as available for future requests
        savePromises.push(
            addAvailableLang(db, videoId, track.languageCode)
                .catch(e => log(`addAvailableLang error: ${e.message}`))
        );
    }

    await Promise.allSettled(savePromises);
}

// ============================================================================
// Free Strategies (Primary Language Only)
// ============================================================================

/**
 * Try free strategies for the PRIMARY language only
 * If it fails, return null - don't fall back to other languages
 * User can trigger AI transcription if needed
 */
async function tryFreeStrategies(videoId, targetLanguages) {
    const primaryLang = targetLanguages[0];
    log(`Trying free strategies for primary language: ${primaryLang}`);

    const result = await raceStrategiesForLang(videoId, primaryLang);
    return result; // null if primary language not found
}

/**
 * Race both free strategies in parallel for a single language
 * Returns first successful result, null if both fail
 */
async function raceStrategiesForLang(videoId, lang) {
    const results = await Promise.allSettled([
        trySingleCaptionExtractor(videoId, lang),
        trySingleYoutubeTranscript(videoId, lang)
    ]);

    // Return first successful result (caption-extractor has priority if both succeed)
    for (const result of results) {
        if (result.status === 'fulfilled' && result.value) {
            return result.value;
        }
    }
    return null;
}

/**
 * Single language caption extractor attempt
 */
async function trySingleCaptionExtractor(videoId, lang) {
    try {
        const subs = await withTimeout(
            getSubtitles({ videoID: videoId, lang }),
            STRATEGY_TIMEOUT_MS,
            `caption-extractor timeout for ${lang}`
        );

        if (!subs?.length) {
            log(`caption-extractor [${lang}]: No subtitles found`);
            return null;
        }

        const cues = subs.map((s, i) => ({
            id: i,
            start: parseFloat(s.start),
            duration: parseFloat(s.dur),
            text: s.text.trim()
        })).filter(c => c.text);

        if (!cues.length) {
            log(`caption-extractor [${lang}]: Empty cues after filtering`);
            return null;
        }

        // Verify language matches expected (detect silent fallback to wrong language)
        const sampleText = cues.slice(0, 5).map(c => c.text).join(' ');
        if (!verifyLanguage(sampleText, lang)) {
            log(`caption-extractor [${lang}]: Language mismatch detected, skipping`);
            return null;
        }

        log(`caption-extractor: Got ${cues.length} cues in ${lang}`);
        return {
            data: buildResponse(videoId, lang, cleanTranscriptSegments(cues)),
            source: 'caption-extractor'
        };

    } catch (e) {
        log(`caption-extractor [${lang}] failed: ${e.message}`);
        return null;
    }
}

/**
 * Single language youtube-transcript attempt
 */
async function trySingleYoutubeTranscript(videoId, lang) {
    try {
        const transcript = await withTimeout(
            YoutubeTranscript.fetchTranscript(videoId, { lang }),
            STRATEGY_TIMEOUT_MS,
            `youtube-transcript timeout for ${lang}`
        );

        if (!transcript?.length) {
            log(`youtube-transcript [${lang}]: No transcript found`);
            return null;
        }

        const cues = transcript.map((item, i) => ({
            id: i,
            start: item.offset / 1000,
            duration: item.duration / 1000,
            text: item.text.trim()
        })).filter(c => c.text);

        if (!cues.length) {
            log(`youtube-transcript [${lang}]: Empty cues after filtering`);
            return null;
        }

        // Verify language matches expected (detect silent fallback to wrong language)
        const sampleText = cues.slice(0, 5).map(c => c.text).join(' ');
        if (!verifyLanguage(sampleText, lang)) {
            log(`youtube-transcript [${lang}]: Language mismatch detected, skipping`);
            return null;
        }

        log(`youtube-transcript: Got ${cues.length} cues in ${lang}`);
        return {
            data: buildResponse(videoId, lang, cleanTranscriptSegments(cues)),
            source: 'youtube-transcript'
        };

    } catch (e) {
        log(`youtube-transcript [${lang}] failed: ${e.message}`);
        return null;
    }
}

// ============================================================================
// Strategy 3: Supadata API (Paid - Last Resort, Native Only)
// ============================================================================

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

    // Only fetch the PRIMARY language user requested (saves credits)
    const lang = langs[0];
    const cacheKeyNoCap = `${videoId}:${lang}`;

    // Check if this video+lang was recently confirmed to have no captions
    const noCaptions = await hasNoCaption(cache, cacheKeyNoCap);
    if (noCaptions) {
        log(`Supadata: Skipping ${videoId}:${lang} - known no-caption`);
        return null;
    }

    // Check if there's already an in-flight Supadata request for this video
    // NOTE: Race Condition Limitation
    // The lock check and set operations are not atomic in Cloudflare KV.
    // Occasional duplicate Supadata calls are possible under high concurrency.
    // This is an acceptable trade-off given:
    // 1. Low probability (requires simultaneous requests for same video)
    // 2. Results are cached, so duplicates only cost one extra API credit
    // 3. Proper atomic locking would require Durable Objects (higher cost)
    // Mitigation: Random jitter reduces collision probability
    await new Promise(r => setTimeout(r, Math.random() * 100));
    const isLocked = await isSupadataLocked(cache, videoId);
    if (isLocked) {
        log(`Supadata: Skipping ${videoId} - already processing (deduplication)`);
        return null;
    }

    // Set lock before making the API call
    await setSupadataLock(cache, videoId);

    try {
        const url = new URL(SUPADATA_API_URL);
        url.searchParams.set('videoId', videoId);
        url.searchParams.set('lang', lang);
        url.searchParams.set('text', 'false');
        // IMPORTANT: Use native mode to only fetch existing captions
        // This avoids AI generation costs - we use Gladia for AI transcription instead
        url.searchParams.set('mode', 'native');

        log(`Supadata: Fetching ${videoId} in ${lang} (native mode, 1 request only)`);

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

            await clearSupadataLock(cache, videoId);

            if (response.status === 404) {
                // No native captions - mark so we don't retry
                await markNoCaption(cache, cacheKeyNoCap);
                return null;
            }

            // Other errors (402 credit issue, etc)
            return null;
        }

        const data = await response.json();

        if (!data.content || !Array.isArray(data.content) || data.content.length === 0) {
            log(`Supadata [${lang}]: No content in response`);
            await clearSupadataLock(cache, videoId);
            await markNoCaption(cache, cacheKeyNoCap);
            return null;
        }

        const cues = data.content.map((segment, i) => ({
            id: i,
            start: segment.offset / 1000,
            duration: segment.duration / 1000,
            text: (segment.text || '').trim()
        })).filter(c => c.text);

        if (!cues.length) {
            log(`Supadata [${lang}]: Empty cues after filtering`);
            await clearSupadataLock(cache, videoId);
            return null;
        }

        const detectedLang = data.lang || lang;
        log(`Supadata: Got ${cues.length} cues in ${detectedLang}`);

        // Success! Clear the lock since result will be cached
        await clearSupadataLock(cache, videoId);

        return { data: buildResponse(videoId, detectedLang, cleanTranscriptSegments(cues)) };

    } catch (e) {
        log(`Supadata [${lang}] failed: ${e.message}`);

        if (e.name === 'TimeoutError' || e.name === 'AbortError') {
            // Keep the lock on timeout - prevents retry storms
            // Lock will auto-expire after SUPADATA_LOCK_TTL
        } else {
            await clearSupadataLock(cache, videoId);
        }

        return null;
    }
}

// ============================================================================
// Utilities
// ============================================================================

// verifyLanguage is now imported from ../\_shared/utils.js


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