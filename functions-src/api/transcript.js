/**
 * Unified Transcript API (Cloudflare Function)
 * 
 * Single endpoint for all transcript operations:
 * - Native caption fetching (via Supadata or free scraper)
 * - AI transcription (via Gladia)
 * - Caching (R2 content + D1 metadata with source tracking)
 * - Negative caching to prevent repeated failures
 * 
 * @version 1.1.0 - Added negative caching for native caption failures
 */

import {
    jsonResponse,
    handleOptions,
    errorResponse,
    sanitizeVideoId,
    sanitizeLanguage,
    verifyLanguage,
} from '../_shared/utils.js';
import { getValidSubtitles } from 'youtube-caption-extractor';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
import { getTranscriptFromR2, saveTranscriptToR2 } from '../_shared/transcript-r2.js';
import {
    savePendingJob,
    getPendingJob,
    deletePendingJob,
    cleanupStaleJobs,
    recordTranscript,
    getAvailableLanguages
} from '../_shared/transcript-db.js';
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
    getVideoLanguages,
    addVideoLanguage,
    addVideoLanguages,
    getVideoDuration,
    isNoTranscript,
    markNoTranscript,
} from '../_shared/video-info-db.js';

// ============================================================================
// Configuration
// ============================================================================

const DEBUG = false;
const log = (...args) => DEBUG && console.log('[Transcript]', ...args);
const timer = () => { const s = Date.now(); return () => Date.now() - s; };

// Rate limiting for native captions (no diamonds needed)
const NATIVE_RATE_LIMIT = {
    max: { anonymous: 20, free: 30, pro: 60, premium: 60 },
    windowSeconds: 3600,
    keyPrefix: 'transcript'
};

// Diamond system config for AI transcription
const DIAMOND_CONFIG = {
    maxDiamonds: 3,              // Max diamonds a user can have
    regenTimeMs: 60 * 60 * 1000, // 1 hour to fully regenerate
    keyPrefix: 'diamonds'
};

// Supadata configuration
const SUPADATA_API_URL = 'https://api.supadata.ai/v1/youtube/transcript';
const SUPADATA_TIMEOUT_MS = 10000;
const SUPADATA_LOCK_TTL = 300; // 5 minutes
const SUPADATA_NO_CAPTION_TTL = 3600; // 1 hour

// Gladia configuration
const GLADIA_API_URL = 'https://api.gladia.io/v2/pre-recorded';
const MAX_POLL_DURATION_MS = 25000; // 25s max to stay within CF 30s limit
const INITIAL_DELAY_MS = 1000;
const MAX_DELAY_MS = 5000;
const FETCH_TIMEOUT_MS = 10000;
const MAX_VIDEO_DURATION_SECONDS = 60 * 60; // 60 minutes max for AI

// HTTP Cache-Control settings (in seconds)
const CACHE_CONTROL = {
    R2_HIT: 'public, max-age=86400, stale-while-revalidate=3600',      // 24h + 1h SWR
    NATIVE: 'public, max-age=3600, stale-while-revalidate=600',        // 1h + 10min SWR
    AI: 'public, max-age=604800, stale-while-revalidate=86400',        // 7 days + 1 day SWR
    NO_CACHE: 'no-store'                                               // Don't cache errors
};

// ============================================================================
// Diamond Credit System
// ============================================================================

/**
 * Get current diamond count for a user
 * - Authenticated users: Read from PocketBase user record
 * - Anonymous users: Read from KV (regenerates over time)
 * 
 * Diamonds regenerate over time: 1 hour = 3 diamonds (20 min per diamond)
 * @returns {{ diamonds: number, nextRegenAt: number | null }}
 */
async function getDiamonds(cache, clientId, user = null) {
    // For authenticated users with PocketBase data
    if (user && user.id) {
        const storedDiamonds = user.diamonds;
        const lastUpdated = user.diamondsUpdatedAt;

        // If no diamond data yet, user has full diamonds
        if (storedDiamonds === null || storedDiamonds === undefined) {
            return { diamonds: DIAMOND_CONFIG.maxDiamonds, nextRegenAt: null };
        }

        // Calculate regeneration
        const now = Date.now();
        const lastUsedAt = lastUpdated ? new Date(lastUpdated).getTime() : now;
        const timeSinceLastUse = now - lastUsedAt;
        const regenPerDiamond = DIAMOND_CONFIG.regenTimeMs / DIAMOND_CONFIG.maxDiamonds;
        const regenerated = Math.floor(timeSinceLastUse / regenPerDiamond);
        const currentDiamonds = Math.min(DIAMOND_CONFIG.maxDiamonds, storedDiamonds + regenerated);

        // Calculate next regen time
        let nextRegenAt = null;
        if (currentDiamonds < DIAMOND_CONFIG.maxDiamonds) {
            const timeToNextRegen = regenPerDiamond - (timeSinceLastUse % regenPerDiamond);
            nextRegenAt = now + timeToNextRegen;
        }

        return { diamonds: currentDiamonds, nextRegenAt };
    }

    // Fallback for anonymous users: Use KV cache
    if (!cache) return { diamonds: DIAMOND_CONFIG.maxDiamonds, nextRegenAt: null };

    const key = `${DIAMOND_CONFIG.keyPrefix}:${clientId}`;

    try {
        const data = await cache.get(key, 'json');

        if (!data) {
            // No record = full diamonds
            return { diamonds: DIAMOND_CONFIG.maxDiamonds, nextRegenAt: null };
        }

        // Calculate regenerated diamonds based on time passed
        const now = Date.now();
        const timeSinceLastUse = now - data.lastUsedAt;
        const regenPerDiamond = DIAMOND_CONFIG.regenTimeMs / DIAMOND_CONFIG.maxDiamonds;
        const regenerated = Math.floor(timeSinceLastUse / regenPerDiamond);
        const currentDiamonds = Math.min(DIAMOND_CONFIG.maxDiamonds, data.diamonds + regenerated);

        // Calculate next regen time
        let nextRegenAt = null;
        if (currentDiamonds < DIAMOND_CONFIG.maxDiamonds) {
            const timeToNextRegen = regenPerDiamond - (timeSinceLastUse % regenPerDiamond);
            nextRegenAt = now + timeToNextRegen;
        }

        return { diamonds: currentDiamonds, nextRegenAt };
    } catch (e) {
        log('getDiamonds error:', e.message);
        return { diamonds: DIAMOND_CONFIG.maxDiamonds, nextRegenAt: null };
    }
}

/**
 * Consume a diamond for AI transcription
 * - Authenticated users: Update PocketBase user record
 * - Anonymous users: Update KV cache
 * 
 * @returns {{ success: boolean, diamonds: number, nextRegenAt: number | null }}
 */
async function consumeDiamond(cache, clientId, user = null, env = null) {
    // Get current diamonds (handles regeneration)
    const { diamonds } = await getDiamonds(cache, clientId, user);

    if (diamonds <= 0) {
        const { nextRegenAt } = await getDiamonds(cache, clientId, user);
        return { success: false, diamonds: 0, nextRegenAt };
    }

    const now = Date.now();
    const newDiamonds = diamonds - 1;
    const regenPerDiamond = DIAMOND_CONFIG.regenTimeMs / DIAMOND_CONFIG.maxDiamonds;
    const nextRegenAt = now + regenPerDiamond;

    // For authenticated users: Update PocketBase
    if (user && user.id && env) {
        try {
            const pocketbaseUrl = env.POCKETHOST_URL || 'https://voca.pockethost.io';
            const response = await fetch(`${pocketbaseUrl}/api/collections/users/records/${user.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    diamonds: newDiamonds,
                    diamonds_updated_at: new Date().toISOString()
                }),
                signal: AbortSignal.timeout(5000)
            });

            if (!response.ok) {
                log('Failed to update PocketBase diamonds:', response.status);
                // Fall through to success - don't block user on PB write failure
            }

            return { success: true, diamonds: newDiamonds, nextRegenAt };
        } catch (e) {
            log('consumeDiamond PB error:', e.message);
            return { success: true, diamonds: newDiamonds, nextRegenAt };
        }
    }

    // Fallback for anonymous users: Use KV cache
    if (!cache) return { success: true, diamonds: newDiamonds, nextRegenAt: null };

    const key = `${DIAMOND_CONFIG.keyPrefix}:${clientId}`;

    try {
        await cache.put(key, JSON.stringify({
            diamonds: newDiamonds,
            lastUsedAt: now
        }), {
            // Keep for 24 hours (increased from 2 hours)
            expirationTtl: 86400
        });

        return { success: true, diamonds: newDiamonds, nextRegenAt };
    } catch (e) {
        log('consumeDiamond KV error:', e.message);
        return { success: true, diamonds: newDiamonds, nextRegenAt: null };
    }
}

// ============================================================================
// Request Handlers
// ============================================================================

export const onRequestOptions = () => handleOptions(['GET', 'POST', 'OPTIONS']);

/**
 * Health check endpoint - GET /api/transcript
 */
export async function onRequestGet(context) {
    return jsonResponse({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'unified-transcript'
    });
}

/**
 * Main transcript endpoint - POST /api/transcript
 * 
 * Request body:
 * {
 *   videoId: string,
 *   lang: string,
 *   preferAI?: boolean,      // Skip native, go straight to AI
 *   forceRefresh?: boolean,  // Bypass cache
 *   resultUrl?: string,      // For polling existing AI job
 *   duration?: number        // Video duration for validation
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   videoId: string,
 *   language: string,
 *   requestedLanguage: string,
 *   segments: Segment[],
 *   source: 'cache' | 'native' | 'ai',
 *   availableLanguages: { native: string[], ai: string[] },
 *   whisperAvailable: boolean,
 *   status?: 'processing',
 *   resultUrl?: string,
 *   error?: string,
 *   errorCode?: string,
 *   timing: number
 * }
 */
export async function onRequestPost(context) {
    const { request, env, waitUntil } = context;
    const elapsed = timer();

    try {
        const body = await request.json();
        const videoId = sanitizeVideoId(body.videoId);
        const lang = sanitizeLanguage(body.lang || body.targetLanguages?.[0] || 'ja');
        const preferAI = !!body.preferAI;
        const forceRefresh = !!body.forceRefresh;
        const resultUrl = body.resultUrl;

        if (!videoId) {
            return jsonResponse({
                success: false,
                error: 'Invalid or missing videoId',
                errorCode: 'INVALID_REQUEST'
            }, 400);
        }

        // Only Japanese, Chinese, Korean, and English are supported for learning
        if (!lang) {
            return jsonResponse({
                success: false,
                error: 'Unsupported language. Only Japanese, Chinese, Korean, and English are supported.',
                errorCode: 'UNSUPPORTED_LANGUAGE'
            }, 400);
        }

        const r2 = env.TRANSCRIPT_STORAGE;
        const cache = env.TRANSCRIPT_CACHE;
        const db = env.VOCAB_DB;

        // Get client identifier for diamond tracking (user ID or IP)
        const authResult = await validateAuthToken(request, env);
        const clientId = authResult.valid ? authResult.user.id : getClientIP(request);
        const tier = authResult.valid
            ? (hasPremiumAccess(authResult.user) ? 'premium' : authResult.user.subscriptionTier || 'free')
            : 'anonymous';

        // Get diamond status (use PocketBase for authenticated users)
        const user = authResult.valid ? authResult.user : null;
        const diamondStatus = await getDiamonds(cache, clientId, user);

        // Rate limit native caption requests only
        if (!preferAI && !resultUrl) {
            const rateLimitConfig = getTieredConfig(NATIVE_RATE_LIMIT, tier);
            const rateCheck = await consumeRateLimit(cache, clientId, rateLimitConfig);
            if (!rateCheck.allowed) {
                return rateLimitResponse(rateCheck.resetAt);
            }
        }

        log(`Request: ${videoId}, lang: ${lang}, preferAI: ${preferAI}, diamonds: ${diamondStatus.diamonds}`);

        // Get known languages with source info
        const knownInfo = await getVideoLanguages(db, videoId);
        const nativeLanguages = knownInfo?.availableLanguages || [];
        const aiLanguages = []; // Will be populated from R2 metadata scan or D1

        // Build available languages object
        const availableLanguages = { native: nativeLanguages, ai: aiLanguages };

        // Common response fields
        const diamondInfo = {
            diamonds: diamondStatus.diamonds,
            maxDiamonds: DIAMOND_CONFIG.maxDiamonds,
            nextRegenAt: diamondStatus.nextRegenAt
        };

        // =====================================================================
        // If polling an existing AI job (no diamond needed)
        // =====================================================================
        if (resultUrl) {
            return await pollGladiaJob(context, {
                videoId, lang, resultUrl, r2, db, cache, elapsed, availableLanguages, diamondInfo
            });
        }

        // =====================================================================
        // Step 1: Check R2 Cache
        // =====================================================================
        if (!forceRefresh) {
            const cached = await getTranscriptFromR2(r2, videoId, lang);
            if (cached?.segments?.length > 0) {
                log('Cache hit:', videoId, lang);
                return jsonResponse({
                    success: true,
                    videoId,
                    language: lang,
                    requestedLanguage: lang,
                    segments: cached.segments,
                    source: 'cache',
                    sourceDetail: cached.source,
                    availableLanguages,
                    whisperAvailable: diamondStatus.diamonds > 0,
                    ...diamondInfo,
                    timing: elapsed()
                }, 200, { 'X-Cache': 'HIT', 'Cache-Control': CACHE_CONTROL.R2_HIT });
            }
        }

        // =====================================================================
        // Step 2: Try Native Captions (unless preferAI)
        // =====================================================================
        if (!preferAI) {
            // Check negative cache first - skip scraping if we already know there's no native caption
            const knownNoNative = await isNoTranscript(db, cache, videoId, lang, 'native');
            if (knownNoNative) {
                log(`Negative cache hit: ${videoId}:${lang} - known no native captions`);
                return jsonResponse({
                    success: false,
                    videoId,
                    requestedLanguage: lang,
                    segments: [],
                    source: 'none',
                    availableLanguages,
                    whisperAvailable: diamondStatus.diamonds > 0,
                    ...diamondInfo,
                    errorCode: 'NO_NATIVE',
                    error: 'No native captions found. AI transcription available.',
                    timing: elapsed()
                }, 200, { 'X-Cache': 'NEG' });
            }

            // Check if we KNOW this language doesn't exist natively (from D1 metadata)
            const hasKnownMetadata = nativeLanguages.length > 0;
            const langAvailableNatively = nativeLanguages.includes(lang);

            if (hasKnownMetadata && !langAvailableNatively) {
                log(`Strict D1 Trust: ${lang} not in known languages [${nativeLanguages.join(',')}]`);

                // Try to return a fallback from cache
                for (const fallbackLang of nativeLanguages) {
                    const fallbackCached = await getTranscriptFromR2(r2, videoId, fallbackLang);
                    if (fallbackCached?.segments?.length > 0) {
                        return jsonResponse({
                            success: true,
                            videoId,
                            language: fallbackLang,
                            requestedLanguage: lang,
                            segments: fallbackCached.segments,
                            source: 'cache',
                            sourceDetail: `fallback:${fallbackCached.source}`,
                            availableLanguages,
                            whisperAvailable: diamondStatus.diamonds > 0,
                            ...diamondInfo,
                            warning: `Requested '${lang}' not available natively. Returned '${fallbackLang}'.`,
                            timing: elapsed()
                        }, 200, { 'X-Cache': 'HIT:FALLBACK', 'Cache-Control': CACHE_CONTROL.R2_HIT });
                    }
                }

                // No fallback available, suggest AI
                return jsonResponse({
                    success: false,
                    videoId,
                    requestedLanguage: lang,
                    segments: [],
                    source: 'none',
                    availableLanguages,
                    whisperAvailable: diamondStatus.diamonds > 0,
                    ...diamondInfo,
                    errorCode: 'NO_NATIVE',
                    error: 'Language not available natively. AI transcription available.',
                    timing: elapsed()
                });
            }

            // Try to fetch native captions
            const nativeResult = await tryNativeCaptions(videoId, lang, env, cache);

            if (nativeResult?.segments?.length > 0) {
                log(`Native captions found: ${nativeResult.source}`);

                // Save to R2 and update D1 metadata
                const savePromises = [
                    saveTranscriptToR2(r2, videoId, lang, nativeResult.segments, nativeResult.source),
                ];

                // Save all discovered languages to D1
                if (nativeResult.availableLangs?.length > 0) {
                    savePromises.push(addVideoLanguages(db, videoId, nativeResult.availableLangs));
                } else {
                    savePromises.push(addVideoLanguage(db, videoId, lang));
                }

                if (waitUntil) {
                    waitUntil(Promise.allSettled(savePromises));
                } else {
                    await Promise.allSettled(savePromises);
                }

                // Update available languages for response
                const updatedInfo = await getVideoLanguages(db, videoId);
                availableLanguages.native = updatedInfo?.availableLanguages || [lang];

                return jsonResponse({
                    success: true,
                    videoId,
                    language: lang,
                    requestedLanguage: lang,
                    segments: nativeResult.segments,
                    source: 'native',
                    sourceDetail: nativeResult.source,
                    availableLanguages,
                    whisperAvailable: diamondStatus.diamonds > 0,
                    ...diamondInfo,
                    timing: elapsed()
                }, 200, { 'X-Cache': 'MISS', 'Cache-Control': CACHE_CONTROL.NATIVE });
            }

            // Native failed - cache the failure to prevent repeated scraping attempts
            const markNegativeCache = markNoTranscript(db, cache, videoId, lang, 'native');
            if (waitUntil) {
                waitUntil(markNegativeCache);
            } else {
                await markNegativeCache;
            }

            log(`Marked negative cache: ${videoId}:${lang} - no native captions`);

            // BEFORE returning NO_NATIVE error, check if we have ANY existing AI transcript in another language
            // This prevents asking the user to pay for AI when we already have a valid transcript (e.g. they requested 'ja' but we have 'zh-CN' AI)

            // Re-fetch known languages to be sure (since we might have just updated metadata? No, native failed)
            // But we might have AI languages associated with this video from previous runs
            const currentInfo = await getVideoLanguages(db, videoId);
            const knownAiLangs = currentInfo?.availableLanguages.filter(l => availableLanguages.ai.includes(l)) || [];

            // We can also check R2 if we suspect there might be something (or rely on what we know)
            // Ideally we should have populated availableLanguages.ai earlier if possible, but let's check known native/ai overlap
            // Since D1 stores mixed list, we check if there are ANY languages available that we haven't tried or that might be AI

            // Simplest approach: Check if we have *any* other language available in our known list, and if so, try to fetch it if it's AI
            // However, our D1 'availableLanguages' list mixes native and AI.
            // If we are here, it means 'lang' was NOT in nativeLanguages (or it was but failed).

            // Better approach: Opportunistically check R2 for other common languages if we are about to fail
            // or use the known nativeLanguages list even if it failed for 'lang' (maybe it was mislabeled?)

            // Let's rely on the fact that if a user previously paid for AI, it SHOULD be in R2.
            // We can check the languages in `nativeLanguages` (from earlier) - if any of them exist in R2 with source='ai', return that.

            for (const existingLang of nativeLanguages) {
                if (existingLang === lang) continue; // We already tried this and failed (or it's the requested one)

                const fallbackCached = await getTranscriptFromR2(r2, videoId, existingLang);
                if (fallbackCached?.segments?.length > 0 && fallbackCached.source === 'ai') {
                    log(`Found existing AI transcript in ${existingLang}, returning as fallback for ${lang}`);
                    return jsonResponse({
                        success: true,
                        videoId,
                        language: existingLang,
                        requestedLanguage: lang,
                        segments: fallbackCached.segments,
                        source: 'cache',
                        sourceDetail: `fallback:ai:${fallbackCached.source}`,
                        availableLanguages,
                        whisperAvailable: true, // It is available (we have one)
                        ...diamondInfo, // Don't charge
                        warning: `Requested '${lang}' not available natively. Found existing AI transcript in '${existingLang}'.`,
                        timing: elapsed()
                    }, 200, { 'X-Cache': 'HIT:FALLBACK_AI', 'Cache-Control': CACHE_CONTROL.AI });
                }
            }

            return jsonResponse({
                success: false,
                videoId,
                requestedLanguage: lang,
                segments: [],
                source: 'none',
                availableLanguages,
                whisperAvailable: diamondStatus.diamonds > 0,
                ...diamondInfo,
                errorCode: 'NO_NATIVE',
                error: 'No native captions found. AI transcription available.',
                timing: elapsed()
            });
        }

        // =====================================================================
        // Step 3: AI Transcription (Gladia) - requires diamond
        // =====================================================================

        // Check if user has diamonds for AI
        if (diamondStatus.diamonds <= 0) {
            return jsonResponse({
                success: false,
                videoId,
                requestedLanguage: lang,
                segments: [],
                source: 'none',
                availableLanguages,
                whisperAvailable: false,
                ...diamondInfo,
                errorCode: 'NO_DIAMONDS',
                error: 'No diamonds remaining for AI transcription. Please wait for regeneration.',
                timing: elapsed()
            }, 429);
        }

        return await startGladiaJob(context, {
            videoId, lang, r2, db, cache, body, authResult, clientId, tier, elapsed, availableLanguages, diamondInfo
        });

    } catch (error) {
        console.error('[Transcript] Fatal:', error);
        return errorResponse(error.message);
    }
}

// ============================================================================
// Native Caption Strategies
// ============================================================================

/**
 * Try to get native captions from free scraper, then Supadata
 */
async function tryNativeCaptions(videoId, lang, env, cache) {
    // Strategy 1: Free scraper (youtube-caption-extractor)
    try {
        log('Trying free scraper...');
        const subtitles = await getValidSubtitles({ videoID: videoId, lang });

        if (subtitles?.length > 0) {
            const segments = subtitles.map((s, i) => ({
                id: i,
                text: s.text?.trim() || '',
                start: parseFloat(s.start) || 0,
                duration: parseFloat(s.dur) || 0
            })).filter(s => s.text);

            if (segments.length > 0) {
                // Verify the language actually matches using text analysis
                const sampleText = segments.slice(0, 10).map(s => s.text).join(' ');
                if (!verifyLanguage(sampleText, lang)) {
                    log(`Free scraper: Language verification failed for ${lang}. Rejecting captions.`);
                } else {
                    log(`Free scraper success: ${segments.length} segments (verified ${lang})`);
                    return {
                        segments: cleanTranscriptSegments(segments),
                        source: 'scrape',
                        availableLangs: [lang] // Scraper doesn't tell us other languages
                    };
                }
            }
        }
    } catch (e) {
        log('Free scraper failed:', e.message);
    }

    // Strategy 2: Supadata API
    if (env.SUPADATA_API_KEY) {
        try {
            log('Trying Supadata...');
            const result = await trySupadata(videoId, lang, env.SUPADATA_API_KEY, cache);
            // Check for language mismatch (Supadata returned wrong language)
            if (result && result.languageMismatch) {
                log('Supadata returned wrong language, rejecting');
                return null;
            }
            if (result) return result;
        } catch (e) {
            log('Supadata failed:', e.message);
        }
    }

    return null;
}

/**
 * Supadata API call with locking and negative cache
 */
async function trySupadata(videoId, lang, apiKey, cache) {
    const cacheKeyNoCap = `supadata:nocap:${videoId}:${lang}`;

    // Check negative cache
    if (cache) {
        try {
            if (await cache.get(cacheKeyNoCap)) {
                log(`Supadata: Skipping ${videoId}:${lang} - known no-caption`);
                return null;
            }
        } catch { }
    }

    // Simple lock to prevent duplicate requests
    const lockKey = `supadata:lock:${videoId}`;
    if (cache) {
        try {
            const existingLock = await cache.get(lockKey);
            if (existingLock) {
                log(`Supadata: Skipping ${videoId} - already processing`);
                return null;
            }
            await cache.put(lockKey, '1', { expirationTtl: SUPADATA_LOCK_TTL });
        } catch { }
    }

    try {
        const url = new URL(SUPADATA_API_URL);
        url.searchParams.set('videoId', videoId);
        url.searchParams.set('lang', lang);
        url.searchParams.set('text', 'false');
        url.searchParams.set('mode', 'native');

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
                'Accept': 'application/json'
            },
            signal: AbortSignal.timeout(SUPADATA_TIMEOUT_MS)
        });

        if (!response.ok) {
            if (response.status === 404 && cache) {
                await cache.put(cacheKeyNoCap, '1', { expirationTtl: SUPADATA_NO_CAPTION_TTL });
            }
            return null;
        }

        const data = await response.json();

        if (!data.content?.length) {
            if (cache) {
                await cache.put(cacheKeyNoCap, '1', { expirationTtl: SUPADATA_NO_CAPTION_TTL });
            }
            return null;
        }

        const segments = data.content.map((segment, i) => ({
            id: i,
            start: segment.offset / 1000,
            duration: segment.duration / 1000,
            text: (segment.text || '').trim()
        })).filter(s => s.text);

        if (!segments.length) return null;

        const detectedLang = data.lang || lang;
        log(`Supadata: Got ${segments.length} cues in ${detectedLang} (requested: ${lang})`);

        // IMPORTANT: Verify the returned language matches the requested language
        // Supadata sometimes returns a different language than requested
        if (detectedLang !== lang) {
            log(`Supadata: Language mismatch! Requested ${lang} but got ${detectedLang}. Rejecting.`);
            // Cache the available languages for future reference
            return {
                segments: [],
                source: 'supadata',
                availableLangs: data.availableLangs || [detectedLang],
                detectedLang,
                languageMismatch: true
            };
        }

        return {
            segments: cleanTranscriptSegments(segments),
            source: 'supadata',
            availableLangs: data.availableLangs || [detectedLang],
            detectedLang
        };

    } catch (e) {
        log(`Supadata error: ${e.message}`);
        return null;
    } finally {
        // Clear lock
        if (cache) {
            try { await cache.delete(lockKey); } catch { }
        }
    }
}

// ============================================================================
// AI Transcription (Gladia)
// ============================================================================

/**
 * Start a new Gladia transcription job
 * Consumes 1 diamond when submitting a new job
 */
async function startGladiaJob(context, { videoId, lang, r2, db, cache, body, authResult, clientId, tier, elapsed, availableLanguages, diamondInfo }) {
    const { env, waitUntil } = context;
    const gladiaKey = env.GLADIA_API_KEY;

    // Extract user for PocketBase diamond storage
    const user = authResult.valid ? authResult.user : null;

    if (!gladiaKey) {
        return jsonResponse({
            success: false,
            videoId,
            requestedLanguage: lang,
            errorCode: 'SERVICE_UNAVAILABLE',
            error: 'AI transcription not configured',
            availableLanguages,
            ...diamondInfo,
            timing: elapsed()
        }, 503);
    }

    // Validate video duration
    let duration = await getVideoDuration(db, videoId) || body.duration;
    if (duration && duration > MAX_VIDEO_DURATION_SECONDS) {
        return jsonResponse({
            success: false,
            videoId,
            requestedLanguage: lang,
            errorCode: 'VIDEO_TOO_LONG',
            error: `Video exceeds ${MAX_VIDEO_DURATION_SECONDS / 60} minute limit for AI transcription`,
            maxDuration: MAX_VIDEO_DURATION_SECONDS,
            availableLanguages,
            ...diamondInfo,
            timing: elapsed()
        }, 400);
    }

    // Check for existing pending job (no diamond needed for resuming)
    const existingJob = await getPendingJob(db, videoId);
    if (existingJob?.result_url) {
        log('Found existing pending job');
        return await pollGladiaJob(context, {
            videoId, lang, resultUrl: existingJob.result_url, r2, db, cache, elapsed, availableLanguages, diamondInfo
        });
    }

    // Check R2 for existing AI transcript before spending credits
    const existingAI = await getTranscriptFromR2(r2, videoId, lang);
    if (existingAI?.segments?.length > 0 && existingAI.source === 'ai') {
        log('Found existing AI transcript in R2');
        return jsonResponse({
            success: true,
            videoId,
            language: lang,
            requestedLanguage: lang,
            segments: existingAI.segments,
            source: 'cache',
            sourceDetail: 'ai',
            availableLanguages,
            whisperAvailable: true,
            ...diamondInfo,
            timing: elapsed()
        }, 200, { 'X-Cache': 'HIT:AI', 'Cache-Control': CACHE_CONTROL.AI });
    }

    // Consume a diamond for new job (use PocketBase for authenticated users)
    const consumeResult = await consumeDiamond(cache, clientId, user, env);
    if (!consumeResult.success) {
        return jsonResponse({
            success: false,
            videoId,
            requestedLanguage: lang,
            segments: [],
            source: 'none',
            availableLanguages,
            whisperAvailable: false,
            diamonds: 0,
            maxDiamonds: DIAMOND_CONFIG.maxDiamonds,
            nextRegenAt: consumeResult.nextRegenAt,
            errorCode: 'NO_DIAMONDS',
            error: 'No diamonds remaining for AI transcription.',
            timing: elapsed()
        }, 429);
    }

    // Update diamond info after consumption
    const updatedDiamondInfo = {
        diamonds: consumeResult.diamonds,
        maxDiamonds: DIAMOND_CONFIG.maxDiamonds,
        nextRegenAt: consumeResult.nextRegenAt
    };

    // Submit new job
    try {
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

        const submitResponse = await fetch(GLADIA_API_URL, {
            method: 'POST',
            headers: {
                'x-gladia-key': gladiaKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ audio_url: youtubeUrl }),
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
        });

        if (!submitResponse.ok) {
            throw new Error(`Gladia submit failed: ${submitResponse.status}`);
        }

        const submitData = await submitResponse.json();
        const resultUrl = submitData.result_url;

        if (!resultUrl) {
            throw new Error('No result_url from Gladia');
        }

        // Save pending job
        await Promise.allSettled([
            savePendingJob(db, videoId, lang, resultUrl),
            cache?.put(`job_map:${resultUrl}`, videoId, { expirationTtl: 3600 })
        ]);

        // Opportunistic cleanup
        if (waitUntil) {
            waitUntil(cleanupStaleJobs(db));
        }

        // Start polling
        return await pollGladiaJob(context, {
            videoId, lang, resultUrl, r2, db, cache, elapsed, availableLanguages, diamondInfo: updatedDiamondInfo
        });

    } catch (error) {
        console.error('[Transcript] Gladia submit error:', error);
        return jsonResponse({
            success: false,
            videoId,
            requestedLanguage: lang,
            errorCode: 'AI_SERVICE_ERROR',
            error: `AI transcription failed: ${error.message}`,
            availableLanguages,
            ...updatedDiamondInfo,
            timing: elapsed()
        }, 500);
    }
}

/**
 * Poll an existing Gladia job for results
 */
async function pollGladiaJob(context, { videoId, lang, resultUrl, r2, db, cache, elapsed, availableLanguages, diamondInfo }) {
    const { env, waitUntil } = context;
    const gladiaKey = env.GLADIA_API_KEY;
    const startTime = Date.now();
    let delay = INITIAL_DELAY_MS;

    // Recover videoId from KV if missing
    if (!videoId && resultUrl && cache) {
        try {
            videoId = await cache.get(`job_map:${resultUrl}`);
        } catch { }
    }

    while (Date.now() - startTime < MAX_POLL_DURATION_MS) {
        // Check if running out of time
        if (Date.now() - startTime > MAX_POLL_DURATION_MS - 5000) {
            return jsonResponse({
                success: false,
                videoId,
                requestedLanguage: lang,
                status: 'processing',
                resultUrl,
                availableLanguages,
                whisperAvailable: true,
                ...diamondInfo,
                timing: elapsed()
            });
        }

        await new Promise(resolve => setTimeout(resolve, delay));

        try {
            const resultResponse = await fetch(resultUrl, {
                headers: { 'x-gladia-key': gladiaKey },
                signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
            });

            if (!resultResponse.ok) {
                delay = Math.min(delay * 2, MAX_DELAY_MS);
                continue;
            }

            const resultData = await resultResponse.json();

            if (resultData.status === 'done') {
                const utterances = resultData.result?.transcription?.utterances || [];
                const segments = utterances.map((utt, index) => ({
                    id: index,
                    text: utt.text?.trim() || '',
                    start: utt.start || 0,
                    duration: (utt.end || 0) - (utt.start || 0)
                })).filter(s => s.text);

                const cleanedSegments = cleanTranscriptSegments(segments);
                const detectedLang = resultData.result?.transcription?.languages?.[0] || lang;

                // Save to R2 and D1
                if (videoId && cleanedSegments.length > 0) {
                    const saveOps = [
                        saveTranscriptToR2(r2, videoId, detectedLang, cleanedSegments, 'ai'),
                        addVideoLanguage(db, videoId, detectedLang),
                        deletePendingJob(db, videoId)
                    ];

                    if (waitUntil) {
                        waitUntil(Promise.allSettled(saveOps));
                    } else {
                        await Promise.allSettled(saveOps);
                    }
                }

                // Update available languages
                availableLanguages.ai = [...new Set([...(availableLanguages.ai || []), detectedLang])];

                return jsonResponse({
                    success: true,
                    videoId,
                    language: detectedLang,
                    requestedLanguage: lang,
                    segments: cleanedSegments,
                    source: 'ai',
                    sourceDetail: 'gladia',
                    availableLanguages,
                    whisperAvailable: true,
                    ...diamondInfo,
                    timing: elapsed()
                }, 200, { 'Cache-Control': CACHE_CONTROL.AI });
            }

            if (resultData.status === 'error') {
                throw new Error(`Gladia error: ${resultData.error_message}`);
            }

            // Still processing
            delay = Math.min(delay * 2, MAX_DELAY_MS);

        } catch (fetchError) {
            log('Poll error:', fetchError.message);
            delay = Math.min(delay * 2, MAX_DELAY_MS);
        }
    }

    // Timeout - return processing status for client to continue polling
    return jsonResponse({
        success: false,
        videoId,
        requestedLanguage: lang,
        status: 'processing',
        resultUrl,
        availableLanguages,
        whisperAvailable: true,
        ...diamondInfo,
        timing: elapsed()
    });
}