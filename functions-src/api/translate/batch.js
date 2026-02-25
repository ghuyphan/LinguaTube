/**
 * Batch Translation API (Cloudflare Function)
 * Translates multiple texts at once for efficiency
 * Route: POST /api/translate/batch
 */

import { jsonResponse, handleOptions, errorResponse, validateBody, sha256 } from '../../utils/utils.js';
import {
    consumeRateLimitUnits,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders,
    getTieredConfig
} from '../../middlewares/rate-limiter.js';
import { translateBatch } from '../../providers/lingva.js';
import { validateAuthToken, hasPremiumAccess } from '../../middlewares/auth.js';

const MAX_BATCH_SIZE = 50;

// Rate limit by texts translated. Increased limits to support lazy subtitle loading.
// Average video = 200-500 lines.
// Anonymous: ~1 short video
// Free: ~3-4 videos
// Pro: Heavy usage
const RATE_LIMIT_CONFIG = {
    max: { anonymous: 2000, free: 5000, pro: 25000, premium: 100000 },
    windowSeconds: 3600,
    keyPrefix: 'translate-texts'
};

// Cache configuration (7 days)
const CACHE_TTL = 7 * 24 * 60 * 60;

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;
    try {
        const body = await request.json();

        // Schema-based validation for security
        const validation = validateBody(body, {
            texts: { type: 'array', required: true, maxLength: MAX_BATCH_SIZE },
            source: { type: 'string', required: true, maxLength: 5 },
            target: { type: 'string', required: true, maxLength: 5 }
        });
        if (!validation.valid) {
            return jsonResponse({ error: 'Invalid request', details: validation.errors }, 400);
        }

        const { texts, source, target } = body;

        if (texts.length > MAX_BATCH_SIZE) {
            return jsonResponse({ error: `Max batch size is ${MAX_BATCH_SIZE}` }, 400);
        }

        // Rate limit by number of texts
        const authResult = await validateAuthToken(request, env);
        const tier = authResult.valid
            ? (hasPremiumAccess(authResult.user) ? 'premium' : authResult.user.subscriptionTier || 'free')
            : 'anonymous';

        const rateLimitConfig = getTieredConfig(RATE_LIMIT_CONFIG, tier);
        const clientId = getClientIdentifier(request, authResult);

        // Deduct rate limit for ALL texts (simplifies logic, we credit back effectively by not charging for cache hits? 
        // No, standard practice is to rate limit the REQUEST size regardless of cache hit to prevent abuse)
        // Actually for now let's count against limit because it's a "service usage" unit.
        const rateCheck = await consumeRateLimitUnits(env.TRANSCRIPT_CACHE, clientId, rateLimitConfig, texts.length);
        if (!rateCheck.allowed) {
            return rateLimitResponse(rateCheck.resetAt);
        }

        // 1. Check Cache
        const translations = new Array(texts.length).fill(null);
        const indicesToTranslate = [];
        const uniqueTextsToTranslate = new Set();

        // Only use cache if present
        if (env.TRANSCRIPT_CACHE) {
            // Generate cache keys
            const cachePromises = texts.map(async (text, index) => {
                if (!text || !text.trim()) {
                    translations[index] = text; // preserve empty/whitespace
                    return;
                }
                const hash = await sha256(text);
                const key = `tr:${source}:${target}:${hash}`;
                const cached = await env.TRANSCRIPT_CACHE.get(key);

                if (cached) {
                    translations[index] = cached;
                } else {
                    indicesToTranslate.push(index);
                    uniqueTextsToTranslate.add(text);
                }
            });

            await Promise.all(cachePromises);
        } else {
            // No cache available, translate all non-empty
            texts.forEach((text, index) => {
                if (!text || !text.trim()) {
                    translations[index] = text;
                } else {
                    indicesToTranslate.push(index);
                    uniqueTextsToTranslate.add(text);
                }
            });
        }

        // 2. Translate Missing Items
        if (uniqueTextsToTranslate.size > 0) {
            const batchToTranslate = Array.from(uniqueTextsToTranslate);
            const batchResults = await translateBatch(batchToTranslate, source, target);

            // Map back to original indices and Cache results
            const cacheWrites = [];

            batchToTranslate.forEach((text, i) => {
                const translation = batchResults[i];
                if (translation) {
                    // Fill all occurrences of this text in the original array
                    texts.forEach((originalText, originalIndex) => {
                        if (originalText === text) {
                            translations[originalIndex] = translation;
                        }
                    });

                    // Async cache write
                    if (env.TRANSCRIPT_CACHE) {
                        cacheWrites.push(async () => {
                            const hash = await sha256(text);
                            const key = `tr:${source}:${target}:${hash}`;
                            await env.TRANSCRIPT_CACHE.put(key, translation, { expirationTtl: CACHE_TTL });
                        });
                    }
                }
            });

            // Wait for cache writes? Cloudflare Workers usually wait for waitUntil, but here we can just fire and forget if specific context allows,
            // but `context.waitUntil` is available safe practice.
            if (context.waitUntil && cacheWrites.length > 0) {
                context.waitUntil(Promise.all(cacheWrites.map(fn => fn())));
            } else if (cacheWrites.length > 0) {
                // If no waitUntil, we must await to ensure completion before runtime termination
                await Promise.all(cacheWrites.map(fn => fn()));
            }
        }

        return jsonResponse({ translations }, 200, getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt));

    } catch (error) {
        console.error('[Translate Batch] Error:', error);
        return errorResponse(error.message);
    }
}


