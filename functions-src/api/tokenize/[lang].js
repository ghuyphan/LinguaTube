/**
 * Tokenization API (Cloudflare Function)
 * Single-text tokenization endpoint with optional caching
 */

import { jsonResponse, handleOptions, errorResponse, validateTextLength } from '../../utils/utils.js';
import { tokenize } from '../../utils/tokenizer.js';
import {
    consumeRateLimit,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders
} from '../../middlewares/rate-limiter.js';

import { validateAuthToken } from '../../middlewares/auth.js';

const SUPPORTED_LANGUAGES = new Set(['ja', 'ko', 'zh', 'en']);
const RATE_LIMIT_CONFIG = { max: 100, windowSeconds: 3600, keyPrefix: 'tokenize' };
const MAX_TEXT_LENGTH = 10000; // 10KB max

// In-memory warm isolate cache (Rule 2: In-Memory First)
const memTokenSingleCache = new Map();
const MAX_MEM_TOKEN_CACHE = 500;

/**
 * Simple hash function for cache keys (djb2 algorithm)
 */
function hashText(text) {
    let hash = 5381;
    for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) + hash) + text.charCodeAt(i);
        hash = hash >>> 0;
    }
    return hash.toString(36);
}

export async function onRequest(context) {
    const { request, params, env } = context;
    const lang = params.lang;
    const TOKEN_CACHE = env.TRANSCRIPT_CACHE;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return handleOptions(['POST', 'OPTIONS']);
    }

    // Validate language
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
        const { text } = await request.json();

        // Validate text input
        const textValidation = validateTextLength(text, MAX_TEXT_LENGTH);
        if (!textValidation.valid) {
            return jsonResponse({ error: textValidation.error }, 400);
        }

        // 1. Check in-memory cache (0 KV ops, < 0.1ms)
        const cacheKey = `tokens:${lang}:${hashText(text)}`;
        const memHit = memTokenSingleCache.get(cacheKey);
        if (memHit) {
            return jsonResponse(memHit, 200, {
                'Cache-Control': 'public, max-age=604800',
                'X-Cache': 'HIT-MEM'
            });
        }

        // 2. Check KV cache
        if (TOKEN_CACHE) {
            try {
                const cached = await TOKEN_CACHE.get(cacheKey, 'json');
                if (cached) {
                    if (memTokenSingleCache.size >= MAX_MEM_TOKEN_CACHE) {
                        const oldest = memTokenSingleCache.keys().next().value;
                        if (oldest) memTokenSingleCache.delete(oldest);
                    }
                    memTokenSingleCache.set(cacheKey, cached);
                    return jsonResponse(cached, 200, {
                        'Cache-Control': 'public, max-age=604800',
                        'X-Cache': 'HIT'
                    });
                }
            } catch (e) {
                // Cache read failed, continue
            }
        }

        // Cache MISS: Rate limiting (Atomic)
        const authResult = await validateAuthToken(request, env);
        const clientId = getClientIdentifier(request, authResult);
        const rateCheck = await consumeRateLimit(TOKEN_CACHE, clientId, RATE_LIMIT_CONFIG);
        if (!rateCheck.allowed) {
            return rateLimitResponse(rateCheck.resetAt);
        }

        // Tokenize using shared module
        const tokens = await tokenize(text, lang);
        const result = { tokens };

        // Save to warm in-memory cache
        if (memTokenSingleCache.size >= MAX_MEM_TOKEN_CACHE) {
            const oldest = memTokenSingleCache.keys().next().value;
            if (oldest) memTokenSingleCache.delete(oldest);
        }
        memTokenSingleCache.set(cacheKey, result);

        // Cache the result (30 days TTL)
        if (TOKEN_CACHE) {
            try {
                await TOKEN_CACHE.put(cacheKey, JSON.stringify(result), {
                    expirationTtl: 60 * 60 * 24 * 30
                });
            } catch (e) {
                // Cache write failed, continue
            }
        }

        return jsonResponse(result, 200, {
            'Cache-Control': 'public, max-age=604800',  // 7 day cache for tokenization
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
        });

    } catch (error) {
        console.error(`[Tokenize ${lang.toUpperCase()}] Error:`, error);
        return errorResponse(error.message);
    }
}

