import { sha256 } from '../../utils/utils.js';
/**
 * Tokenization API (Cloudflare Function)
 * Single-text tokenization endpoint with optional caching
 */

import { jsonResponse, handleOptions, errorResponse, validateTextLength } from '../../utils/utils.js';
import { tokenize, isKuromojiReady } from '../../utils/tokenizer.js';
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

        if (request.signal?.aborted) {
            return new Response(JSON.stringify({ error: 'Request aborted' }), {
                status: 499,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 1. Check in-memory cache (0 KV ops, < 0.1ms)
        const cacheKey = `tokens:v6:${lang}:${await sha256(JSON.stringify(text))}`;
        const memHit = memTokenSingleCache.get(cacheKey);
        if (memHit) {
            const isExpired = memHit.cachedAt && (Date.now() - memHit.cachedAt > (memHit.isFallback ? 60000 : 7 * 24 * 3600 * 1000));
            const shouldUpgradeFallback = memHit.isFallback && (lang !== 'ja' || isKuromojiReady());
            if (isExpired || shouldUpgradeFallback) {
                memTokenSingleCache.delete(cacheKey);
            } else if (Array.isArray(memHit.tokens)) {
                return jsonResponse(memHit, 200, {
                    'Cache-Control': 'public, max-age=604800',
                    'X-Cache': 'HIT-MEM'
                });
            } else {
                memTokenSingleCache.delete(cacheKey);
            }
        }

        // 2. Check KV cache
        if (TOKEN_CACHE && !request.signal?.aborted) {
            try {
                const cached = await TOKEN_CACHE.get(cacheKey, 'json');
                if (cached && Array.isArray(cached.tokens)) {
                    const isDegradedJa = lang === 'ja' && isKuromojiReady() && cached.isFallback;
                    if (!isDegradedJa) {
                        if (memTokenSingleCache.size >= MAX_MEM_TOKEN_CACHE) {
                            const oldest = memTokenSingleCache.keys().next().value;
                            if (oldest) memTokenSingleCache.delete(oldest);
                        }
                        const entry = { ...cached, cachedAt: Date.now() };
                        memTokenSingleCache.set(cacheKey, entry);
                        return jsonResponse(entry, 200, {
                            'Cache-Control': 'public, max-age=604800',
                            'X-Cache': 'HIT'
                        });
                    }
                }
            } catch {
                // Cache read failed, continue
            }
        }

        // Cache MISS: Rate limiting (Atomic)
        const authResult = await validateAuthToken(request, env);
        const clientId = getClientIdentifier(request, authResult);
        const rateCheck = await consumeRateLimit(TOKEN_CACHE, clientId, RATE_LIMIT_CONFIG, context);
        if (!rateCheck.allowed) {
            return rateLimitResponse(rateCheck.resetAt);
        }

        if (request.signal?.aborted) {
            return new Response(JSON.stringify({ error: 'Request aborted' }), {
                status: 499,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Tokenize using shared module
        const isFallback = lang === 'ja' && !isKuromojiReady();
        const tokens = await tokenize(text, lang);
        const result = { tokens, cachedAt: Date.now(), isFallback };

        // Save to warm in-memory cache (Rule 2: zero KV writes for micro tokenization)
        if (memTokenSingleCache.size >= MAX_MEM_TOKEN_CACHE) {
            const oldest = memTokenSingleCache.keys().next().value;
            if (oldest) memTokenSingleCache.delete(oldest);
        }
        memTokenSingleCache.set(cacheKey, result);

        return jsonResponse(result, 200, {
            'Cache-Control': 'public, max-age=604800',  // 7 day cache for tokenization
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
        });

    } catch (error) {
        console.error(`[Tokenize ${lang.toUpperCase()}] Error:`, error);
        return errorResponse(error.message);
    }
}

