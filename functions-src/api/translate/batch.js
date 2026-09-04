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

        // Deduplicate texts before consuming rate limits (reduces usage for repetitive subtitles)
        const uniqueTextsCount = new Set(texts.map(t => t?.trim()).filter(Boolean)).size;
        const consumeAmount = Math.max(1, uniqueTextsCount || 1); // Consume at least 1 unit

        // Rate limit by number of unique texts
        const authResult = await validateAuthToken(request, env);
        const tier = authResult.valid
            ? (hasPremiumAccess(authResult.user) ? 'premium' : authResult.user.subscriptionTier || 'free')
            : 'anonymous';

        const rateLimitConfig = getTieredConfig(RATE_LIMIT_CONFIG, tier);
        const clientId = getClientIdentifier(request, authResult);

        const rateCheck = await consumeRateLimitUnits(env.TRANSCRIPT_CACHE, clientId, rateLimitConfig, consumeAmount);
        if (!rateCheck.allowed) {
            return rateLimitResponse(rateCheck.resetAt);
        }

        // 1. Check Batch-Level Cache (Single KV read instead of 50 individual subrequests)
        let translations = new Array(texts.length).fill(null);
        let batchKey = null;

        if (env.TRANSCRIPT_CACHE && texts.length > 0) {
            try {
                const batchSignature = texts.join('\u001F');
                const batchHash = await sha256(batchSignature);
                batchKey = `trbatch:v1:${source}:${target}:${batchHash}`;

                const cachedBatch = await env.TRANSCRIPT_CACHE.get(batchKey, 'json');
                if (cachedBatch && Array.isArray(cachedBatch.translations) && cachedBatch.translations.length === texts.length) {
                    return jsonResponse({ translations: cachedBatch.translations }, 200, {
                        'X-Cache': 'HIT',
                        ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
                    });
                }
            } catch (err) {
                console.warn('[Translate Batch] Batch cache read failed:', err?.message || err);
            }
        }

        // 2. Prepare Unique Texts to Translate
        const uniqueTextsToTranslate = new Set();
        texts.forEach((text) => {
            if (text && text.trim()) {
                uniqueTextsToTranslate.add(text);
            }
        });

        // 3. Translate Missing Items
        if (uniqueTextsToTranslate.size > 0) {
            const batchToTranslate = Array.from(uniqueTextsToTranslate);
            const batchResults = await translateBatch(batchToTranslate, source, target);

            // Map results back to all occurrences
            const translationMap = new Map();
            batchToTranslate.forEach((text, i) => {
                if (batchResults[i]) {
                    translationMap.set(text, batchResults[i]);
                }
            });

            translations = texts.map(text => {
                if (!text || !text.trim()) return text; // Preserve whitespace/empty
                return translationMap.get(text) || text; // Use translated or fallback to original
            });

            // 4. Save entire batch as ONE single KV write (preserves 1,000 writes/day quota)
            if (env.TRANSCRIPT_CACHE && batchKey) {
                const cachePayload = JSON.stringify({ translations });
                if (context.waitUntil) {
                    context.waitUntil(
                        env.TRANSCRIPT_CACHE.put(batchKey, cachePayload, { expirationTtl: CACHE_TTL }).catch(() => {})
                    );
                } else {
                    env.TRANSCRIPT_CACHE.put(batchKey, cachePayload, { expirationTtl: CACHE_TTL }).catch(() => {});
                }
            }
        } else {
            translations = [...texts];
        }

        return jsonResponse({ translations }, 200, {
            'X-Cache': 'MISS',
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
        });

    } catch (error) {
        console.error('[Translate Batch] Error:', error);
        return errorResponse(error.message);
    }
}


