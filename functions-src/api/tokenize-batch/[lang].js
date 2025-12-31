/**
 * Batch Tokenization API (Cloudflare Function)
 * Tokenizes multiple texts at once and caches as single entry per video
 * - Reduces KV writes from ~200 to 1 per video
 */

import {
    consumeRateLimit,
    getClientIP,
    rateLimitResponse,
    getRateLimitHeaders
} from '../../_shared/rate-limiter.js';
import {
    jsonResponse,
    handleOptions,
    errorResponse,
    sanitizeVideoId,
    validateBatchSize
} from '../../_shared/utils.js';

const SUPPORTED_LANGUAGES = new Set(['ja', 'ko', 'zh', 'en']);
const RATE_LIMIT_CONFIG = { max: 100, windowSeconds: 3600, keyPrefix: 'tokenize' };
const MAX_BATCH_SIZE = 500;

/**
 * Simple hash function for cache key differentiation
 * Creates a short hash from the concatenation of all texts
 */
function hashTexts(texts) {
    const str = texts.join('||');
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    // Convert to positive hex string (shorter than base10)
    return (hash >>> 0).toString(16);
}

export async function onRequest(context) {
    const { request, params, env } = context;
    const lang = params.lang;
    const TOKEN_CACHE = env.TRANSCRIPT_CACHE;

    if (request.method === 'OPTIONS') {
        return handleOptions(['POST', 'OPTIONS']);
    }

    // Rate limiting (Atomic)
    const clientIP = getClientIP(request);
    const rateCheck = await consumeRateLimit(TOKEN_CACHE, clientIP, RATE_LIMIT_CONFIG);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    if (!SUPPORTED_LANGUAGES.has(lang)) {
        return jsonResponse(
            { error: `Unsupported language: ${lang}. Supported: ja, ko, zh, en` },
            400
        );
    }

    if (request.method !== 'POST') {
        return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    try {
        const body = await request.json();
        const videoId = sanitizeVideoId(body.videoId);
        const texts = body.texts;

        // Validate batch size
        const batchValidation = validateBatchSize(texts, MAX_BATCH_SIZE);
        if (!batchValidation.valid) {
            return jsonResponse({ error: batchValidation.error }, 400);
        }

        if (!videoId) {
            return jsonResponse({ error: 'Missing or invalid "videoId"' }, 400);
        }

        // Check cache first - include hash of texts to differentiate subtitle versions
        const textsHash = hashTexts(texts);
        const cacheKey = `tokens:v5:${lang}:${videoId}:${textsHash}`;
        if (TOKEN_CACHE) {
            try {
                const cached = await TOKEN_CACHE.get(cacheKey, 'json');
                // Validate: cached tokens count must match requested texts count
                if (cached && cached.tokens && cached.tokens.length === texts.length) {
                    console.log(`[Tokenize Batch] Cache hit for ${videoId} (hash: ${textsHash})`);
                    return jsonResponse(cached, 200, getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt));
                } else if (cached) {
                    console.log(`[Tokenize Batch] Cache mismatch for ${videoId} (expected ${texts.length}, got ${cached.tokens?.length})`);
                }
            } catch (e) {
                // Cache read failed, continue
            }
        }

        console.log(`[Tokenize Batch] Tokenizing ${texts.length} texts for ${videoId} (${lang})`);

        // Tokenize all texts using shared module
        const allTokens = await Promise.all(
            texts.map(text => tokenize(text, lang))
        );

        const result = { tokens: allTokens };


        // Cache as ONE write for entire video (30 day TTL)
        if (TOKEN_CACHE) {
            try {
                await TOKEN_CACHE.put(cacheKey, JSON.stringify(result), {
                    expirationTtl: 60 * 60 * 24 * 30
                });
                console.log(`[Tokenize Batch] Cached tokens for ${videoId}`);
            } catch (e) {
                console.error('[Tokenize Batch] Cache write failed:', e.message);
            }
        }

        return jsonResponse(result, 200, getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt));

    } catch (error) {
        console.error(`[Tokenize Batch ${lang.toUpperCase()}] Error:`, error);
        return errorResponse(error.message);
    }
}

