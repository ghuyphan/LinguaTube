/**
 * YouTube Transcript Proxy (Cloudflare Function)
 * 
 * Optimized strategy with Supadata as primary source:
 *   1. Cache (R2 content + D1 metadata)
 *   2. Supadata API (Native captions)
 *   3. Fallback (Client triggers Whisper/Gladia)
 *
 * @version 19.0.0 - Supadata Primary, Legacy Scrapers Removed
 */

import {
    jsonResponse,
    handleOptions,
    errorResponse,
    sanitizeVideoId,
    sanitizeLanguage,
} from '../_shared/utils.js';
import { getValidSubtitles } from 'youtube-caption-extractor';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
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
    getVideoLanguages,
    addVideoLanguage,
    addVideoLanguages,
    cleanupOldNoTranscriptEntries
} from '../_shared/video-info-db.js';

// ============================================================================
// Configuration
// ============================================================================

const DEBUG = false;
const DEFAULT_LANGS = ['ja', 'zh', 'ko', 'en'];

const SUPADATA_TIMEOUT_MS = 10000; // 10s for Supadata

// Rate limiting configuration
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

    // Rate limiting
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

        if (!videoId || !primaryLang) {
            return jsonResponse({ error: 'Invalid or missing videoId or language' }, 400);
        }

        const r2 = env.TRANSCRIPT_STORAGE;
        const cache = env.TRANSCRIPT_CACHE;
        const db = env.VOCAB_DB;

        // Early validation
        const validation = await validateVideoRequest(videoId, primaryLang, body.duration, 'innertube');
        if (validation) {
            log(`Validation failed: ${validation.error}`);
            return jsonResponse(validation, 400, getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt));
        }

        log(`Request: ${videoId}, lang: ${primaryLang}`);

        // =====================================================================
        // Step 0: Check negative cache (D1)
        // =====================================================================
        // "Strict D1 Trust": If we checked this video before and know available langs,
        // and the requested lang isn't there, we skip straight to fallback.

        const knownLanguages = await getVideoLanguages(db, videoId);
        const hasKnownMetadata = knownLanguages?.availableLanguages?.length > 0;

        if (!forceRefresh && hasKnownMetadata) {
            const available = knownLanguages.availableLanguages;

            // If requested language is KNOWN to be available, we proceed to check R2/Supadata.
            // If it is NOT available, we skip Supadata to save credits.
            if (!available.includes(primaryLang)) {
                log(`Strict Fallback: ${primaryLang} not in known languages [${available.join(',')}]`);

                // Try to find a fallback language to return (e.g. English)
                for (const fallbackLang of available) {
                    const fallbackCached = await checkCache(r2, videoId, fallbackLang);
                    if (fallbackCached) {
                        return jsonResponse({
                            ...fallbackCached,
                            requestedLanguage: primaryLang,
                            fallbackLanguage: fallbackLang,
                            availableLanguages: available,
                            whisperAvailable: true,
                            warning: `Requested '${primaryLang}' not available. Found '${fallbackLang}'.`,
                            source: 'fallback',
                            timing: elapsed()
                        }, 200, {
                            'X-Cache': 'HIT:FALLBACK',
                            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
                        });
                    }
                }

                // Determine source for "Why do we know this?"
                // If it came from our AI previously, it's trustworthy.
                return jsonResponse({
                    videoDetails: { videoId },
                    captions: { playerCaptionsTracklistRenderer: { captionTracks: [] } },
                    source: 'none',
                    availableLanguages: available,
                    whisperAvailable: true, // Allow AI retry even if we think we know
                    warning: 'Language not available in metadata.',
                    timing: elapsed()
                });
            }
        }

        // =====================================================================
        // Step 1: Check R2 Cache (Content)
        // =====================================================================
        if (!forceRefresh) {
            const cached = await checkCache(r2, videoId, primaryLang);
            if (cached) {
                // Include known languages in response to help client UI
                return jsonResponse({
                    ...cached,
                    availableLanguages: knownLanguages?.availableLanguages || [primaryLang],
                    timing: elapsed()
                }, 200, {
                    'X-Cache': 'HIT',
                    ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
                });
            }
        }

        // =====================================================================
        // Step 2: Try Free Strategy (youtube-caption-extractor)
        // =====================================================================
        let result = null;
        let source = 'none';

        try {
            log('Attempting Free Strategy (youtube-caption-extractor)...');
            const freeResult = await tryFreeStrategy(videoId, primaryLang);
            if (freeResult) {
                result = freeResult;
                source = 'scrape';
            }
        } catch (e) {
            log('Free strategy failed:', e);
        }

        // =====================================================================
        // Step 3: Supadata (Secondary Fetch) - Only if Free Failed
        // =====================================================================
        if (!result && env.SUPADATA_API_KEY) {
            // Check Supadata-specific negative cache (KV)
            // ... (keep existing Logic) ...
            if (await hasNoCaption(cache, `${videoId}:${primaryLang}`)) {
                log(`Supadata: Skipping ${videoId}:${primaryLang} - known no-caption (KV)`);
            } else {
                log('Fetching from Supadata...');
                const supadataResult = await trySupadata(videoId, [primaryLang], env.SUPADATA_API_KEY, cache, db);
                if (supadataResult) {
                    result = supadataResult;
                    source = 'supadata';
                }
            }
        }

        // =====================================================================
        // Return Result
        // =====================================================================
        if (result) {
            log(`${source} succeeded (${elapsed()}ms)`);

            const tr = result.data?.captions?.playerCaptionsTracklistRenderer?.captionTracks?.[0];
            const actualLang = tr?.languageCode || primaryLang;

            // Save content to R2
            const cachePromise = saveToCache(r2, db, videoId, actualLang, result.data, source);

            // CRITICAL: Save ALL available languages found by Supadata to D1
            // This populates our "Strict D1 Trust" for future requests
            const metadataPromise = result.availableLangs?.length > 0
                ? addVideoLanguages(db, videoId, result.availableLangs)
                : Promise.resolve();

            if (waitUntil) {
                waitUntil(Promise.all([cachePromise, metadataPromise]));
            } else {
                await Promise.all([cachePromise, metadataPromise]);
            }

            // Get updated list for response
            const updatedLangs = (await getVideoLanguages(db, videoId))?.availableLanguages || [actualLang];

            return jsonResponse({
                ...result.data,
                source,
                availableLanguages: updatedLangs,
                timing: elapsed()
            }, 200, {
                'X-Cache': 'MISS',
                ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
            });
        }

        // =====================================================================
        // Failed
        // =====================================================================
        log(`Strategies failed or not found (${elapsed()}ms)`);

        return jsonResponse({
            videoDetails: { videoId },
            captions: { playerCaptionsTracklistRenderer: { captionTracks: [] } },
            source: 'none',
            whisperAvailable: true, // Explicitly tell client to use AI
            warning: 'No native captions found.',
            timing: elapsed()
        });

    } catch (error) {
        console.error('[Innertube] Fatal:', error);
        return errorResponse(error.message);
    }
}

/**
 * Strategy: Free Scraper (youtube-caption-extractor)
 */
async function tryFreeStrategy(videoId, lang) {
    try {
        const subtitles = await getValidSubtitles({
            videoID: videoId,
            lang: lang
        });

        if (subtitles && subtitles.length > 0) {
            // Convert to YouTube-like format expected by our app
            const segments = subtitles.map(s => ({
                utf8: s.text,
                startMs: Math.floor(parseFloat(s.start) * 1000),
                durationMs: Math.floor(parseFloat(s.dur) * 1000)
            }));

            const cleaned = cleanTranscriptSegments(segments);

            // Wrap in YouTube response structure
            return {
                data: {
                    videoDetails: { videoId },
                    captions: {
                        playerCaptionsTracklistRenderer: {
                            captionTracks: [{
                                languageCode: lang,
                                name: { simpleText: 'Scraped' },
                                kind: 'scraped'
                            }]
                        }
                    },
                    segments: cleaned
                },
                availableLangs: [lang] // Scraper only guarantees this one
            };
        }
    } catch (e) {
        // Ignore scraper errors (it fails often)
    }
    return null;
}

// ... (Rest of file: checkCache, saveToCache, trySupadata, utilities)
// Removed: tryFreeStrategies, raceStrategiesForLang, trySingleCaptionExtractor, trySingleYoutubeTranscript

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

    // Content to R2 (primary storage)
    if (r2) {
        await saveTranscriptToR2(r2, videoId, actualLang, track.content, source)
            .catch(e => log(`R2 save error: ${e.message}`));
    }

    // Check if we need to update D1 languages (if this came from cache/other source that didn't do it)
    if (db) {
        await addVideoLanguage(db, videoId, actualLang)
            .catch(e => log(`addVideoLanguage error: ${e.message}`));
    }
}

// ============================================================================
// Supadata API
// ============================================================================

/**
 * Get or acquire Supadata lock with optimistic locking
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

async function trySupadata(videoId, langs, apiKey, cache, db) {
    if (!apiKey) {
        log('Supadata: No API key configured, skipping');
        return null;
    }

    const lang = langs[0];
    const cacheKeyNoCap = `${videoId}:${lang}`;

    // Helper to check for no-caption in KV
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
        url.searchParams.set('mode', 'native'); // Only native captions

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

        // Save all available languages from Supadata response (metadata only here)
        // Actual D1 save is handled in the caller to allow batch updates
        if (data.availableLangs?.length > 0) {
            log(`Supadata: Found ${data.availableLangs.length} available languages: ${data.availableLangs.join(',')}`);
        }

        await clearSupadataLock(cache, videoId, requestId);

        return {
            data: buildResponse(videoId, detectedLang, cleanTranscriptSegments(cues)),
            availableLangs: data.availableLangs || [detectedLang]
        };

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