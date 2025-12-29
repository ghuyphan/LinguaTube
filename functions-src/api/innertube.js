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

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
import { getTranscript, saveTranscript, getAvailableLangs, addAvailableLang } from '../_shared/transcript-db.js';
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
    const { env } = context;

    return jsonResponse({
        status: 'ok',
        mode: 'primary-language-only',
        strategies: [
            'youtube-caption-extractor (primary lang only)',
            'youtube-transcript (primary lang only)',
            env.SUPADATA_API_KEY ? 'supadata (primary lang only, native mode)' : 'supadata (not configured)'
        ],
        version: '17.3.0',
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

            // Increment rate limit (only for non-cached responses)
            await incrementRateLimit(env.TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);

            // Get actual language from result (not requested language)
            // This prevents caching EN captions under a JA key
            const tracks = result.data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
            const actualLang = tracks?.[0]?.languageCode || primaryLang;

            // Use waitUntil for non-blocking cache save
            const cachePromise = saveToCache(cache, db, videoId, actualLang, result.data, source);

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

/**
 * Verify that the returned content matches the expected language
 * Uses Unicode script detection to catch silent fallback to wrong language
 * @param {string} text - Sample text to verify
 * @param {string} expectedLang - Expected language code
 * @returns {boolean} - True if language appears correct
 */
function verifyLanguage(text, expectedLang) {
    if (!text || text.length < 10) return true; // Too short to verify

    const sample = text.substring(0, 200);

    switch (expectedLang) {
        case 'ja':
            // Japanese: must contain hiragana, katakana, or kanji
            return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(sample);
        case 'ko':
            // Korean: must contain Hangul
            return /[\uAC00-\uD7AF\u1100-\u11FF]/.test(sample);
        case 'zh':
            // Chinese: CJK characters but NO Japanese kana (to distinguish from Japanese)
            return /[\u4E00-\u9FFF]/.test(sample) &&
                !/[\u3040-\u309F\u30A0-\u30FF]/.test(sample);
        case 'en':
            // English: mostly ASCII letters
            const asciiRatio = (sample.match(/[a-zA-Z\s]/g) || []).length / sample.length;
            return asciiRatio > 0.7;
        default:
            return true; // Unknown language, assume OK
    }
}

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