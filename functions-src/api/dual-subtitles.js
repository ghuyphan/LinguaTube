/**
 * Dual Subtitles API
 * Generates and caches dual subtitles for a video
 * Route: POST /api/dual-subtitles
 */

import { jsonResponse, handleOptions, errorResponse, validateBody, logError } from '../_shared/utils.js';
import {
    consumeRateLimit,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders,
    getTieredConfig
} from '../_shared/rate-limiter.js';
import { validateAuthToken, hasPremiumAccess } from '../_shared/auth.js';
import { translateBatch } from '../_shared/lingva.js';
import { getTranslation, saveTranslation, recordTranslation } from '../_shared/translation-cache.js';

// Tiered rate limiting - anonymous: 5/hr, free: 10/hr, premium: 50/hr
const RATE_LIMIT_CONFIG = {
    max: { anonymous: 5, free: 10, pro: 50, premium: 50 },
    windowSeconds: 3600,
    keyPrefix: 'dual-subs'
};
// Reduced batch size to avoid hitting 429s on Lingva instances
const BATCH_SIZE = 5;
const TIMEOUT_MS = 25000; // 25s total timeout (CF limit is 30s)
const QUALITY_THRESHOLD = 0.8; // 80% success rate required for caching

// Cache-Control headers
const CACHE_HEADERS = {
    HIT: 'public, max-age=86400, stale-while-revalidate=3600',  // 24h + 1h SWR
    FRESH: 'public, max-age=3600',                               // 1h for fresh translations
    PARTIAL: 'no-store'                                          // Don't cache partial/failed
};

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env, waitUntil } = context;

    try {
        const body = await request.json();

        // Schema-based validation for security
        const validation = validateBody(body, {
            videoId: { type: 'string', required: true, maxLength: 20 },
            sourceLang: { type: 'string', required: true, maxLength: 5 },
            targetLang: { type: 'string', required: true, maxLength: 5 },
            segments: { type: 'array', required: true, maxLength: 1000 },
            forceRefresh: { type: 'boolean', required: false },
            onlyCache: { type: 'boolean', required: false }
        });
        if (!validation.valid) {
            return jsonResponse({ error: 'Invalid request', details: validation.errors }, 400);
        }

        const { videoId, sourceLang, targetLang, segments, forceRefresh, onlyCache } = body;

        const r2 = env.TRANSCRIPT_STORAGE;
        const db = env.VOCAB_DB;

        // 1. Check Cache (skip if forceRefresh)
        if (!forceRefresh) {
            const cached = await getTranslation(r2, videoId, sourceLang, targetLang);
            if (cached) {
                return jsonResponse({
                    videoId,
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
                videoId,
                sourceLang,
                targetLang,
                segments: [],
                cached: false
            }, 200, { 'Cache-Control': 'no-store' });
        }

        // 2. Rate Limit (only on cache miss - actual translation work)
        const authResult = await validateAuthToken(request, env);
        const tier = authResult.valid
            ? (hasPremiumAccess(authResult.user) ? 'premium' : authResult.user.subscriptionTier || 'free')
            : 'anonymous';
        const rateLimitConfig = getTieredConfig(RATE_LIMIT_CONFIG, tier);

        const clientId = getClientIdentifier(request, authResult);
        const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, rateLimitConfig);
        if (!rateCheck.allowed) {
            return rateLimitResponse(rateCheck.resetAt);
        }

        // 3. Batch Translate
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
                // Fill with nulls and track all indices as failed
                for (let i = 0; i < chunk.length; i++) {
                    failedIndices.push(currentIndex + i);
                }
                translatedTexts.push(...new Array(chunk.length).fill(null));
            }

            currentIndex += chunk.length;
        }

        // 4. Merge Translations
        const resultSegments = segments.map((seg, i) => ({
            ...seg,
            translation: translatedTexts[i] || null
        }));

        // 5. Calculate Quality
        const successCount = resultSegments.filter(s => s.translation).length;
        const successRate = successCount / resultSegments.length;
        const quality = Math.round(successRate * 100);
        const shouldCache = successRate >= QUALITY_THRESHOLD;

        // 6. Save to Cache (only if quality threshold met)
        if (shouldCache) {
            const savePromises = [
                saveTranslation(r2, videoId, sourceLang, targetLang, resultSegments, quality)
            ];

            // Record in D1 for fast lookups
            if (db) {
                savePromises.push(recordTranslation(db, videoId, sourceLang, targetLang, resultSegments.length));
            }

            if (waitUntil) {
                waitUntil(Promise.allSettled(savePromises));
            } else {
                await Promise.allSettled(savePromises);
            }
        }

        // 7. Build response with appropriate headers
        const cacheControl = shouldCache ? CACHE_HEADERS.FRESH : CACHE_HEADERS.PARTIAL;
        const response = {
            videoId,
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

        return jsonResponse(response, 200, {
            'Cache-Control': cacheControl,
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
        });

    } catch (error) {
        logError('Dual Subtitles', error);
        return errorResponse(error.message);
    }
}

