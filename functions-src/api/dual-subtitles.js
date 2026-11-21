/**
 * Dual Subtitles API
 * Generates and caches dual subtitles for a video
 * Route: POST /api/dual-subtitles
 */

import { jsonResponse, errorResponse, validateBody, logError, sanitizeVideoId, sanitizeLanguage, sha256, getRequestJson } from '../utils/utils.js';
import {
    consumeRateLimit,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders,
    getTieredConfig
} from '../middlewares/rate-limiter.js';
import { validateAuthToken, getUserTier } from '../middlewares/auth.js';
import { translateBatch } from '../providers/lingva.js';
import { getTranslation, saveTranslation, recordTranslation } from '../utils/translation-cache.js';

// Tiered rate limiting - anonymous: 5/hr, free: 15/hr, pro: 60/hr, premium: 120/hr
const RATE_LIMIT_CONFIG = {
    max: { anonymous: 5, free: 15, pro: 60, premium: 120 },
    windowSeconds: 3600,
    keyPrefix: 'dual-subs'
};

const READ_RATE_LIMIT = { max: 60, windowSeconds: 60, keyPrefix: 'dual-subs-read' };

function consumeSubtitleRead(context) {
    return consumeRateLimit(context.env.TRANSCRIPT_CACHE, getClientIdentifier(context.request), READ_RATE_LIMIT, context);
}

// Batch size optimized for Lingva/GTX chunking with Workers Paid CPU headroom
const BATCH_SIZE = 40;
const TIMEOUT_MS = 25000; // 25s total timeout (CF limit is 30s)
const QUALITY_THRESHOLD = 0.8; // 80% success rate required for caching

// In-memory Promise deduplication map across warm Worker isolates to prevent cache stampedes (R10)
const inFlightTranslations = new Map();

// Cache-Control headers
const CACHE_HEADERS = {
    HIT: 'private, max-age=86400, stale-while-revalidate=3600',  // 24h + 1h SWR
    FRESH: 'private, max-age=3600',                               // 1h for fresh translations
    PARTIAL: 'no-store'                                          // Don't cache partial/failed
};

export async function onRequestGet(context) {
    const { request, env } = context;
    try {
        const url = new URL(request.url);
        const videoId = url.searchParams.get('videoId');
        const rawSourceLang = url.searchParams.get('sourceLang') || url.searchParams.get('source');
        const rawTargetLang = url.searchParams.get('targetLang') || url.searchParams.get('target');

        const cleanVideoId = sanitizeVideoId(videoId);
        const sourceLang = sanitizeLanguage(rawSourceLang);
        const targetLang = sanitizeLanguage(rawTargetLang, ['ja', 'zh', 'ko', 'en', 'vi', 'ru']);

        if (!cleanVideoId || !sourceLang || !targetLang) {
            return jsonResponse({ error: 'Missing or invalid parameters' }, 400);
        }

        const readQuota = await consumeSubtitleRead(context);
        if (!readQuota.allowed) return rateLimitResponse(readQuota.resetAt);

        const r2 = env.TRANSCRIPT_STORAGE;
        const cached = await getTranslation(r2, cleanVideoId, sourceLang, targetLang);
        if (cached) {
            return jsonResponse({
                videoId: cleanVideoId,
                sourceLang,
                targetLang,
                segments: cached.segments,
                cached: true,
                quality: cached.quality || 100,
                timestamp: cached.timestamp
            }, 200, { 'Cache-Control': CACHE_HEADERS.HIT });
        }

        return jsonResponse({
            videoId: cleanVideoId,
            sourceLang,
            targetLang,
            segments: [],
            cached: false
        }, 200, { 'Cache-Control': 'no-store' });
    } catch (error) {
        logError('Dual Subtitles GET', error);
        return errorResponse('Failed to check dual subtitles cache', 500);
    }
}

export async function onRequestPost(context) {
    let body;
    try { body = await getRequestJson(context); }
    catch { return jsonResponse({ error: 'Invalid JSON body' }, 400); }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return jsonResponse({ error: 'Invalid request' }, 400);
    return handlePost(context, body);
}

async function handlePost(context, body) {
    const { request, env } = context;
    const waitUntil = context.waitUntil?.bind(context);
    let cleanVideoId = null;
    let sourceLang = null;
    let targetLang = null;

    try {

        const isOnlyCache = Boolean(body?.onlyCache);

        // Schema-based validation for security
        const validation = validateBody(body, {
            videoId: { type: 'string', required: true, maxLength: 20 },
            sourceLang: { type: 'string', required: true, maxLength: 5 },
            targetLang: { type: 'string', required: true, maxLength: 5 },
            segments: { type: 'array', required: !isOnlyCache, maxLength: 2500 },
            forceRefresh: { type: 'boolean', required: false },
            onlyCache: { type: 'boolean', required: false },
            saveOnly: { type: 'boolean', required: false },
            onlySave: { type: 'boolean', required: false }
        });
        if (!validation.valid) {
            return jsonResponse({ error: 'Invalid request', details: validation.errors }, 400);
        }

        const { videoId, sourceLang: rawSourceLang, targetLang: rawTargetLang, segments, forceRefresh, onlyCache, saveOnly, onlySave } = body;
        cleanVideoId = sanitizeVideoId(videoId);
        sourceLang = sanitizeLanguage(rawSourceLang);
        targetLang = sanitizeLanguage(rawTargetLang, ['ja', 'zh', 'ko', 'en', 'vi', 'ru']);

        if (!cleanVideoId || !sourceLang || !targetLang) {
            return jsonResponse({ error: 'Invalid video ID or language format' }, 400);
        }

        if (!onlyCache && segments.some(seg => !seg || typeof seg.text !== 'string' || seg.text.length > 1500 ||
            typeof seg.start !== 'number' || !Number.isFinite(seg.start) || seg.start < 0 ||
            typeof seg.duration !== 'number' || !Number.isFinite(seg.duration) || seg.duration < 0 ||
            (seg.translation != null && (typeof seg.translation !== 'string' || seg.translation.length > 5000)))) {
            return jsonResponse({ error: 'Invalid subtitle cue' }, 400);
        }

        if (!saveOnly && !onlySave) {
            const readQuota = await consumeSubtitleRead(context);
            if (!readQuota.allowed) return rateLimitResponse(readQuota.resetAt);
        }

        const r2 = env.TRANSCRIPT_STORAGE;
        const db = env.VOCAB_DB;

        // 1. Check Cache (skip if forceRefresh or saveOnly)
        if (!forceRefresh && !saveOnly && !onlySave) {
            const cached = await getTranslation(r2, cleanVideoId, sourceLang, targetLang);
            if (cached) {
                return jsonResponse({
                    videoId: cleanVideoId,
                    sourceLang,
                    targetLang,
                    segments: cached.segments,
                    cached: true,
                    quality: cached.quality || 100,
                    timestamp: cached.timestamp
                }, 200, { 'Cache-Control': CACHE_HEADERS.HIT });
            }
        }

        // 1.5. If onlyCache is requested and no cache found, return early
        if (onlyCache) {
            return jsonResponse({
                videoId: cleanVideoId,
                sourceLang,
                targetLang,
                segments: [],
                cached: false
            }, 200, { 'Cache-Control': 'no-store' });
        }

        // 2. Auth & Rate Limit
        const authResult = await validateAuthToken(request, env, { accessState: 'cached' });
        if (authResult.response) return authResult.response;
        if (saveOnly || onlySave) {
            if (!authResult.valid) {
                return jsonResponse({ error: 'Authentication required to save subtitles' }, 401);
            }
            // Compatibility acknowledgement for clients that already keep their own translations.
            return jsonResponse({ success: true, videoId: cleanVideoId, sourceLang, targetLang,
                saved: false, cached: false }, 200, { 'Cache-Control': 'no-store' });
        }

        const tier = authResult.valid ? getUserTier(authResult.user) : 'anonymous';
        const rateLimitConfig = getTieredConfig(RATE_LIMIT_CONFIG, tier);
        const clientId = getClientIdentifier(request, authResult);
        const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, rateLimitConfig, context);
        if (!rateCheck.allowed) {
            return rateLimitResponse(rateCheck.resetAt);
        }

        // Live full-transcript translation guard: prevent Cloudflare Worker timeouts on large payloads
        if (segments.length > BATCH_SIZE) {
            return jsonResponse({
                error: `Live translation in /api/dual-subtitles is capped at ${BATCH_SIZE} cues to avoid worker timeouts. Stream upcoming cues via /api/translate/batch.`,
                maxBatchSize: BATCH_SIZE
            }, 400);
        }

        // Coalesce concurrent upstream translation work across callers after auth/rate-limit checks
        const stampedeKey = await sha256(JSON.stringify([cleanVideoId, sourceLang, targetLang, segments, Boolean(forceRefresh)]));
        let pending = inFlightTranslations.get(stampedeKey);
        if (!pending) {
            pending = (async () => {
                const textChunks = [];
                for (let i = 0; i < segments.length; i += BATCH_SIZE) {
                    textChunks.push(segments.slice(i, i + BATCH_SIZE).map(s => s.text));
                }

                const translatedTexts = [];
                const failedIndices = [];

                // Timeout check helper
                const startTime = Date.now();
                const checkTimeout = () => {
                    if (Date.now() - startTime > TIMEOUT_MS) {
                        throw new Error('Translation timed out');
                    }
                };

                // Process chunks
                let currentIndex = 0;
                for (const chunk of textChunks) {
                    checkTimeout();

                    try {
                        const translations = await translateBatch(chunk, sourceLang, targetLang);

                        // Track failed translations within this chunk
                        translations.forEach((t, i) => {
                            if (t === null) {
                                failedIndices.push(currentIndex + i);
                            }
                        });

                        translatedTexts.push(...translations);
                    } catch (e) {
                        console.error('Chunk translation failed:', e);
                        throw e; // Abort the whole request so we don't save a degraded/empty cache
                    }

                    currentIndex += chunk.length;
                }

                // 4. Merge Translations
                const resultSegments = segments.map((seg, i) => {
                    const tr = translatedTexts[i];
                    const isValid = tr && (sourceLang === targetLang || tr.trim() !== (seg.text || '').trim());
                    return {
                        ...seg,
                        translation: isValid ? tr : null
                    };
                });

                // 5. Calculate Quality
                const successCount = resultSegments.filter(s => s.translation).length;
                const successRate = successCount / resultSegments.length;
                const quality = Math.round(successRate * 100);
                const shouldCache = successRate >= QUALITY_THRESHOLD;

                // 6. Save to Cache (only if quality threshold met)
                if (shouldCache) {
                    const persist = async () => {
                        const saved = await saveTranslation(r2, cleanVideoId, sourceLang, targetLang, resultSegments, quality, 'lingva', { requireCanonical: true });
                        if (saved?.validCount && db) await recordTranslation(db, cleanVideoId, sourceLang, targetLang, saved.validCount);
                    };
                    if (waitUntil) waitUntil(persist().catch(() => {}));
                    else await persist();
                }

                const cacheControl = shouldCache ? CACHE_HEADERS.FRESH : CACHE_HEADERS.PARTIAL;
                const response = {
                    videoId: cleanVideoId,
                    sourceLang,
                    targetLang,
                    segments: resultSegments,
                    cached: false,
                    quality,
                    failedSegments: failedIndices.length,
                    timestamp: Date.now()
                };

                // Include failed indices for client-side retry (only if <= 20 failures)
                if (failedIndices.length > 0 && failedIndices.length <= 20) {
                    response.failedIndices = failedIndices;
                }

                return { response, cacheControl };
            })();
            if (inFlightTranslations.size < 100) {
                inFlightTranslations.set(stampedeKey, pending);
                pending.finally(() => {
                    if (inFlightTranslations.get(stampedeKey) === pending) {
                        inFlightTranslations.delete(stampedeKey);
                    }
                }).catch(() => {});
            }
        }

        // 7. Build per-caller response with caller's own rate-limit headers
        const { response, cacheControl } = await pending;
        return jsonResponse(response, 200, {
            'Cache-Control': cacheControl,
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
        });

    } catch (error) {
        logError('Dual Subtitles', error);
        return errorResponse(error.message);
    }
}

