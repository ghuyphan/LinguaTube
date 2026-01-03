/**
 * YouTube Transcript Proxy (Cloudflare Function)
 * 
 * Optimized parallel strategy with Supadata as last resort:
 *   1. Cache (R2 only - D1 is metadata only)
 *   2. Race: youtube-caption-extractor + youtube-transcript (parallel per language)
 *   3. Supadata API (paid - only if free strategies fail)
 *
 * @version 18.0.0 - R2 for content, D1 for metadata only
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
import { recordTranscript, getAvailableLanguages } from '../_shared/transcript-db.js';
import { getTranscriptFromR2, saveTranscriptToR2 } from '../_shared/transcript-r2.js';
import {
    consumeRateLimit,
    getClientIP,
    rateLimitResponse,
    getRateLimitHeaders,
    getTieredConfig
} from '../_shared/rate-limiter.js';
import { validateAuthToken, hasPremiumAccess } from '../_shared/auth.js';
import { validateVideoRequest } from '../_shared/video-validator.js';
import {
    isNoTranscript,
    markNoTranscript,
    saveVideoLanguages,
    getVideoLanguages,
    cleanupOldNoTranscriptEntries
} from '../_shared/video-info-db.js';
import { getSubtitles } from 'youtube-caption-extractor';
import { YoutubeTranscript } from 'youtube-transcript';

// ============================================================================
// Configuration
// ============================================================================

const DEBUG = false;
const DEFAULT_LANGS = ['ja', 'zh', 'ko', 'en'];

// Timeout configuration - fail fast to move to next strategy
const STRATEGY_TIMEOUT_MS = 5000; // 5s max per free strategy
const SUPADATA_TIMEOUT_MS = 10000; // 10s for Supadata

// Rate limiting configuration - anonymous: 20/hr, free: 30/hr, premium: 60/hr
const RATE_LIMIT_CONFIG = {
    max: { anonymous: 20, free: 30, pro: 60, premium: 60 },
    windowSeconds: 3600,
    keyPrefix: 'innertube'
};

// Supadata configuration
const SUPADATA_API_URL = 'https://api.supadata.ai/v1/youtube/transcript';

// Supadata deduplication: Lock TTL in seconds
const SUPADATA_LOCK_TTL = 300; // 5 minutes
const SUPADATA_NO_CAPTION_TTL = 3600; // 1 hour

const log = (...args) => DEBUG && console.log('[Innertube]', ...args);
const timer = () => { const s = Date.now(); return () => Date.now() - s; };

// Generate unique request ID for optimistic locking
const generateRequestId = () => crypto.randomUUID();

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
    // Get user tier for rate limiting (optional auth)
    const authResult = await validateAuthToken(request, env);
    const tier = authResult.valid
        ? (hasPremiumAccess(authResult.user) ? 'premium' : authResult.user.subscriptionTier || 'free')
        : 'anonymous';
    const rateLimitConfig = getTieredConfig(RATE_LIMIT_CONFIG, tier);

    const clientIP = getClientIP(request);
    const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientIP, rateLimitConfig);
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
        const cache = env.TRANSCRIPT_CACHE;
        const db = env.VOCAB_DB;

        // Early validation - reject unsupported languages before any API calls
        const validation = await validateVideoRequest(videoId, primaryLang, body.duration, 'innertube');
        if (validation) {
            log(`Validation failed: ${validation.error}`);
            return jsonResponse(validation, 400, getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt));
        }

        log(`Request: ${videoId}, langs: ${targetLanguages.join(',')}`);

        // =====================================================================
        // Step 0: Check negative cache (skip known-unavailable languages)
        // =====================================================================
        if (await isNoTranscript(db, cache, videoId, primaryLang, 'youtube')) {
            log(`Negative cache hit: ${videoId}:${primaryLang} - known no transcript`);
            return jsonResponse({
                videoDetails: { videoId },
                captions: { playerCaptionsTracklistRenderer: { captionTracks: [] } },
                source: 'none',
                warning: 'No captions available (cached result)',
                timing: elapsed()
            }, 200, {
                'X-Cache': 'HIT:NEGATIVE',
                ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
            });
        }

        // Opportunistic cleanup of old no_transcript entries
        cleanupOldNoTranscriptEntries(db).catch(() => { });

        // =====================================================================
        // Step 1: Check R2 Cache (single source of truth for content)
        // =====================================================================
        if (!forceRefresh) {
            const cached = await checkCache(r2, videoId, primaryLang);
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
            // Check D1 metadata for known available languages
            const availableLangs = await getAvailableLanguages(db, videoId);
            const knownLangs = availableLangs?.map(l => l.language) || [];

            if (knownLangs.length > 0 && !knownLangs.includes(primaryLang)) {
                // We KNOW this language doesn't exist - skip Supadata to save credits
                log(`Supadata: Skipping ${videoId}:${primaryLang} - known unavailable (available: ${knownLangs.join(',')})`);
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
        // All strategies failed - save to negative cache
        // =====================================================================
        log(`All strategies failed (${elapsed()}ms)`);

        // Save to negative cache to avoid repeated API calls
        markNoTranscript(db, cache, videoId, primaryLang, 'youtube').catch(() => { });

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
// Cache - R2 Only (D1 is metadata only)
// ============================================================================

/**
 * Check R2 cache for transcript content
 * Checks both YouTube and AI transcripts, preferring YouTube
 */
async function checkCache(r2, videoId, lang) {
    if (!r2) return null;

    // Check for YouTube transcript first
    const youtubeResult = await checkR2Cache(r2, videoId, lang);
    if (youtubeResult) return youtubeResult;

    // Fallback to AI transcript
    const aiResult = await checkR2Cache(r2, videoId, lang, 'ai');
    if (aiResult) {
        log('Found cached AI transcript in R2');
        return aiResult;
    }

    return null;
}

async function checkR2Cache(r2, videoId, lang, sourceFilter = null) {
    try {
        const result = await getTranscriptFromR2(r2, videoId, lang);

        if (result?.segments?.length) {
            // If source filter specified, check if it matches
            if (sourceFilter && result.source !== sourceFilter) {
                return null;
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

/**
 * Save transcript: content to R2, metadata to D1, and update video_languages
 */
async function saveToCache(r2, db, videoId, lang, data, source) {
    const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    const track = tracks?.find(t => t.languageCode === lang) || tracks?.[0];

    if (!track?.content?.length) return;

    const actualLang = track.languageCode;

    log(`saveToCache: r2=${!!r2}, db=${!!db}, lang=${actualLang}, segments=${track.content.length}`);

    await Promise.allSettled([
        // Content to R2 (primary storage)
        r2 ? saveTranscriptToR2(r2, videoId, actualLang, track.content, source)
            .then(() => log(`R2 save success: ${videoId} ${actualLang}`))
            .catch(e => log(`R2 save error: ${e.message}`))
            : Promise.resolve(),

        // Metadata to D1 (for queries/analytics)
        db ? recordTranscript(db, videoId, actualLang, source)
            .then(() => log(`D1 metadata recorded: ${videoId} ${actualLang}`))
            .catch(e => log(`D1 metadata error: ${e.message}`))
            : Promise.resolve(),

        // Update video_languages with the found language
        db ? updateVideoLanguages(db, videoId, actualLang)
            .then(() => log(`video_languages updated: ${videoId} +${actualLang}`))
            .catch(e => log(`video_languages error: ${e.message}`))
            : Promise.resolve()
    ]);
}

/**
 * Add a language to the video_languages available list
 * Preserves existing languages and adds new one if not present
 */
async function updateVideoLanguages(db, videoId, lang) {
    if (!db || !videoId || !lang) return;

    try {
        // Get existing languages
        const existing = await getVideoLanguages(db, videoId);
        const languages = existing?.availableLanguages || [];

        // Add new language if not already present
        if (!languages.includes(lang)) {
            languages.push(lang);
            await saveVideoLanguages(db, videoId, languages);
        }
    } catch (err) {
        log(`updateVideoLanguages error: ${err.message}`);
    }
}

// ============================================================================
// Free Strategies (Primary Language Only)
// ============================================================================

/**
 * Try free strategies for the PRIMARY language only
 */
async function tryFreeStrategies(videoId, targetLanguages) {
    const primaryLang = targetLanguages[0];
    log(`Trying free strategies for primary language: ${primaryLang}`);

    const result = await raceStrategiesForLang(videoId, primaryLang);
    return result;
}

/**
 * Race both free strategies in parallel for a single language
 */
async function raceStrategiesForLang(videoId, lang) {
    const results = await Promise.allSettled([
        trySingleCaptionExtractor(videoId, lang),
        trySingleYoutubeTranscript(videoId, lang)
    ]);

    // Return first successful result
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

        if (!cues.length) return null;

        // Verify language matches expected
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

        if (!transcript?.length) return null;

        const cues = transcript.map((item, i) => ({
            id: i,
            start: item.offset / 1000,
            duration: item.duration / 1000,
            text: item.text.trim()
        })).filter(c => c.text);

        if (!cues.length) return null;

        // Verify language matches expected
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
 * Get or acquire Supadata lock with optimistic locking
 * Returns requestId if we acquired the lock, null if locked by another request
 * 
 * NOTE: KV is eventually consistent, so there's still a small race window.
 * For true atomicity, Durable Objects would be needed.
 */
async function acquireSupadataLock(cache, videoId) {
    if (!cache) return generateRequestId(); // No cache = always proceed

    const lockKey = `supadata:lock:${videoId}`;

    try {
        // Check for existing lock
        const existingLock = await cache.get(lockKey);
        if (existingLock) {
            log(`Supadata: Lock exists for ${videoId} (owner: ${existingLock.slice(0, 8)}...)`);
            return null; // Someone else has the lock
        }

        // Try to acquire with our unique ID
        const requestId = generateRequestId();
        await cache.put(lockKey, requestId, { expirationTtl: SUPADATA_LOCK_TTL });

        // Small delay to let race condition manifest
        await new Promise(r => setTimeout(r, 50));

        // Verify we still own the lock (optimistic check)
        const currentLock = await cache.get(lockKey);
        if (currentLock !== requestId) {
            log(`Supadata: Lock stolen for ${videoId} (ours: ${requestId.slice(0, 8)}, current: ${currentLock?.slice(0, 8)})`);
            return null; // Another request stole our lock
        }

        log(`Supadata: Lock acquired for ${videoId} (id: ${requestId.slice(0, 8)}...)`);
        return requestId;
    } catch (e) {
        log(`Supadata: Lock acquisition error: ${e.message}`);
        return generateRequestId(); // On error, proceed cautiously
    }
}

/**
 * Supadata-specific "no caption" cache (KV only, 1hr TTL)
 * 
 * NOTE: This is SEPARATE from the general no_transcript_cache (D1 + KV) because:
 * 1. Supadata is checked AFTER free strategies fail
 * 2. A Supadata 404 means "Supadata specifically doesn't have captions"
 * 3. This is a short-term optimization to prevent repeated Supadata API calls
 * 
 * The general negative cache (markNoTranscript) is saved AFTER ALL strategies fail,
 * meaning we've confirmed the video truly has no captions from any source.
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

async function markNoCaption(cache, videoId) {
    if (!cache) return;
    try {
        await cache.put(`supadata:nocap:${videoId}`, '1', { expirationTtl: SUPADATA_NO_CAPTION_TTL });
        log(`Supadata: Marked ${videoId} as no-caption (1h TTL)`);
    } catch (e) {
        log(`Supadata: Failed to mark no-caption: ${e.message}`);
    }
}

async function clearSupadataLock(cache, videoId, requestId) {
    if (!cache) return;
    try {
        // Only clear if we still own the lock
        const currentLock = await cache.get(`supadata:lock:${videoId}`);
        if (currentLock === requestId) {
            await cache.delete(`supadata:lock:${videoId}`);
            log(`Supadata: Lock cleared for ${videoId}`);
        } else {
            log(`Supadata: Not clearing lock - we don't own it`);
        }
    } catch (e) {
        log(`Supadata: Failed to clear lock: ${e.message}`);
    }
}

async function trySupadata(videoId, langs, apiKey, cache) {
    if (!apiKey) {
        log('Supadata: No API key configured, skipping');
        return null;
    }

    const lang = langs[0];
    const cacheKeyNoCap = `${videoId}:${lang}`;

    // Check if this video+lang was recently confirmed to have no captions
    if (await hasNoCaption(cache, cacheKeyNoCap)) {
        log(`Supadata: Skipping ${videoId}:${lang} - known no-caption`);
        return null;
    }

    // Acquire lock with optimistic locking (returns requestId if acquired, null if blocked)
    const requestId = await acquireSupadataLock(cache, videoId);
    if (!requestId) {
        log(`Supadata: Skipping ${videoId} - already processing by another request`);
        return null;
    }

    try {
        const url = new URL(SUPADATA_API_URL);
        url.searchParams.set('videoId', videoId);
        url.searchParams.set('lang', lang);
        url.searchParams.set('text', 'false');
        url.searchParams.set('mode', 'native');

        log(`Supadata: Fetching ${videoId} in ${lang} (native mode)`);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
                'Accept': 'application/json'
            },
            signal: AbortSignal.timeout(SUPADATA_TIMEOUT_MS)
        });

        if (!response.ok) {
            await clearSupadataLock(cache, videoId, requestId);
            if (response.status === 404) {
                await markNoCaption(cache, cacheKeyNoCap);
            }
            return null;
        }

        const data = await response.json();

        if (!data.content || !Array.isArray(data.content) || data.content.length === 0) {
            log(`Supadata [${lang}]: No content`);
            await clearSupadataLock(cache, videoId, requestId);
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
            await clearSupadataLock(cache, videoId, requestId);
            return null;
        }

        const detectedLang = data.lang || lang;
        log(`Supadata: Got ${cues.length} cues in ${detectedLang}`);

        await clearSupadataLock(cache, videoId, requestId);

        return { data: buildResponse(videoId, detectedLang, cleanTranscriptSegments(cues)) };

    } catch (e) {
        log(`Supadata [${lang}] failed: ${e.message}`);
        if (e.name !== 'TimeoutError' && e.name !== 'AbortError') {
            await clearSupadataLock(cache, videoId, requestId);
        }
        return null;
    }
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