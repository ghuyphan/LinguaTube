import { sha256 } from '../../utils/utils.js';
/**
 * Batch Tokenization API (Cloudflare Function)
 * Tokenizes multiple texts at once and caches as single entry per video
 * - Reduces KV writes from ~200 to 1 per video
 */

import {
    consumeRateLimit,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders,
    getTieredConfig
} from '../../middlewares/rate-limiter.js';
import { validateAuthToken, getUserTier } from '../../middlewares/auth.js';
import {
    jsonResponse,
    handleOptions,
    errorResponse,
    sanitizeVideoId,
    validateBatchSize,
    validateBody
} from '../../utils/utils.js';
import { tokenize, isKuromojiReady } from '../../utils/tokenizer.js';

const SUPPORTED_LANGUAGES = new Set(['ja', 'ko', 'zh', 'en']);
// Tiered rate limiting - anonymous: 50/hr, free: 100/hr, premium: 1000/hr (effectively unlimited)
const RATE_LIMIT_CONFIG = {
    max: { anonymous: 60, free: 150, pro: 1500, premium: 2000 },
    windowSeconds: 3600,
    keyPrefix: 'tokenize'
};
const MAX_BATCH_SIZE = 800;

// In-memory token batch cache across warm Worker isolates (Rule 2: In-Memory First)
const memTokenBatchCache = new Map();
const inFlightBatches = new Map();
const MAX_MEM_BATCH_VIDEOS = 100;

function isValidTokensArray(tokens, expectedLength) {
    if (!Array.isArray(tokens) || tokens.length !== expectedLength) return false;
    for (let i = 0; i < tokens.length; i++) {
        if (!Array.isArray(tokens[i])) return false;
        for (const t of tokens[i]) {
            if (!t || typeof t.surface !== 'string') return false;
        }
    }
    return true;
}

export async function onRequest(context) {
    const { request, params, env } = context;
    const lang = params.lang;
    const TOKEN_CACHE = env.TRANSCRIPT_CACHE;

    if (request.signal?.aborted) {
        return new Response(JSON.stringify({ error: 'Request aborted' }), {
            status: 499,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (request.method === 'OPTIONS') {
        return handleOptions(['POST', 'OPTIONS']);
    }

    if (!SUPPORTED_LANGUAGES.has(lang)) {
        return jsonResponse(
            { error: `Language "${lang}" not supported` },
            400
        );
    }

    if (request.method !== 'POST') {
        return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    try {
        const body = await request.json();

        // Schema-based validation for security
        const validation = validateBody(body, {
            videoId: { type: 'string', required: true, maxLength: 20 },
            texts: { type: 'array', required: true, maxLength: MAX_BATCH_SIZE }
        });
        if (!validation.valid) {
            return jsonResponse({ error: 'Invalid request', details: validation.errors }, 400);
        }

        const videoId = sanitizeVideoId(body.videoId);
        const texts = body.texts;

        // Validate batch size
        const batchValidation = validateBatchSize(texts, MAX_BATCH_SIZE);
        if (!batchValidation.valid) {
            return jsonResponse({ error: batchValidation.error }, 400);
        }

        // Validate individual string items to protect Worker memory during tokenization
        for (let i = 0; i < texts.length; i++) {
            const t = texts[i];
            if (typeof t !== 'string') {
                return jsonResponse({ error: `Text at index ${i} must be a string` }, 400);
            }
            if (t.length > 2000) {
                return jsonResponse({ error: `Text at index ${i} exceeds maximum length of 2000 characters` }, 400);
            }
        }

        if (!videoId) {
            return jsonResponse({ error: 'Missing or invalid "videoId"' }, 400);
        }

        if (request.signal?.aborted) {
            return new Response(JSON.stringify({ error: 'Request aborted' }), {
                status: 499,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Check cache first - include hash of texts to differentiate subtitle versions
        const textsHash = await sha256(JSON.stringify(texts));
        const cacheKey = `tokens:v6:${lang}:${videoId}:${textsHash}`;

        // 1. Check warm in-memory cache (0 KV ops, < 0.1ms)
        const memHit = memTokenBatchCache.get(cacheKey);
        if (memHit) {
            const isExpired = memHit.cachedAt && (Date.now() - memHit.cachedAt > (memHit.isFallback ? 60000 : 7 * 24 * 3600 * 1000));
            const shouldUpgradeFallback = memHit.isFallback && (lang !== 'ja' || isKuromojiReady());
            if (isExpired || shouldUpgradeFallback) {
                memTokenBatchCache.delete(cacheKey);
            } else if (isValidTokensArray(memHit.tokens, texts.length)) {
                return jsonResponse(memHit, 200, {
                    'Cache-Control': 'public, max-age=604800',
                    'X-Cache': 'HIT-MEM'
                });
            } else {
                memTokenBatchCache.delete(cacheKey);
            }
        }

        // Deduplicate concurrent in-flight requests for the same cache key
        let inFlight = inFlightBatches.get(cacheKey);
        if (!inFlight) {
            inFlight = (async () => {
                if (request.signal?.aborted) {
                    return { aborted: true };
                }

                // 2. Check KV cache
                if (TOKEN_CACHE && !request.signal?.aborted) {
                    try {
                        const cached = await TOKEN_CACHE.get(cacheKey, 'json');
                        if (cached && isValidTokensArray(cached.tokens, texts.length)) {
                            const isDegradedJa = lang === 'ja' && isKuromojiReady() && cached.isFallback;
                            if (!isDegradedJa) {
                                console.log(`[Tokenize Batch] Cache hit for ${videoId} (hash: ${textsHash})`);
                                if (memTokenBatchCache.size >= MAX_MEM_BATCH_VIDEOS) {
                                    const oldest = memTokenBatchCache.keys().next().value;
                                    if (oldest) memTokenBatchCache.delete(oldest);
                                }
                                const entry = { ...cached, cachedAt: Date.now() };
                                memTokenBatchCache.set(cacheKey, entry);
                                return {
                                    data: entry,
                                    status: 200,
                                    headers: {
                                        'Cache-Control': 'public, max-age=604800',
                                        'X-Cache': 'HIT'
                                    }
                                };
                            }
                        } else if (cached) {
                            console.log(`[Tokenize Batch] Cache mismatch or corrupt for ${videoId}`);
                        }
                    } catch {
                        // Cache read failed, continue
                    }
                }

                // Cache MISS: Now check and consume rate limit quota (Atomic)
                const authResult = await validateAuthToken(request, env);
                const tier = authResult.valid ? getUserTier(authResult.user) : 'anonymous';
                const rateLimitConfig = getTieredConfig(RATE_LIMIT_CONFIG, tier);

                const clientId = getClientIdentifier(request, authResult);
                const rateCheck = await consumeRateLimit(TOKEN_CACHE, clientId, rateLimitConfig, context);
                if (!rateCheck.allowed) {
                    return { rateLimited: true, resetAt: rateCheck.resetAt };
                }

                if (request.signal?.aborted) {
                    return { aborted: true };
                }

                console.log(`[Tokenize Batch] Tokenizing ${texts.length} texts for ${videoId} (${lang}) [tier: ${tier}]`);

                const isFallback = lang === 'ja' && !isKuromojiReady();

                // Tokenize all texts using shared module
                const allTokens = await Promise.all(
                    texts.map(text => tokenize(text, lang))
                );

                const result = {
                    tokens: allTokens,
                    cachedAt: Date.now(),
                    isFallback
                };

                // Save to warm in-memory cache
                if (memTokenBatchCache.size >= MAX_MEM_BATCH_VIDEOS) {
                    const oldest = memTokenBatchCache.keys().next().value;
                    if (oldest) memTokenBatchCache.delete(oldest);
                }
                memTokenBatchCache.set(cacheKey, result);

                return {
                    data: result,
                    status: 200,
                    headers: {
                        'Cache-Control': 'public, max-age=604800',
                        ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
                    }
                };
            })();
            inFlightBatches.set(cacheKey, inFlight);
        }

        try {
            const out = await inFlight;
            if (out.aborted) {
                return new Response(JSON.stringify({ error: 'Request aborted' }), {
                    status: 499,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            if (out.rateLimited) {
                return rateLimitResponse(out.resetAt);
            }
            return jsonResponse(out.data, out.status, out.headers);
        } finally {
            inFlightBatches.delete(cacheKey);
        }

    } catch (error) {
        console.error(`[Tokenize Batch ${lang.toUpperCase()}] Error:`, error);
        return errorResponse(error.message);
    }
}

