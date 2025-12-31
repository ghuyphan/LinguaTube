/**
 * Tokenization API (Cloudflare Function)
 * Single-text tokenization endpoint with optional caching
 */

import { jsonResponse, handleOptions, errorResponse, validateTextLength } from '../../_shared/utils.js';
import { tokenize } from '../../_shared/tokenizer.js';
import {
    consumeRateLimit,
    getClientIP,
    rateLimitResponse,
    getRateLimitHeaders
} from '../../_shared/rate-limiter.js';

const SUPPORTED_LANGUAGES = new Set(['ja', 'ko', 'zh', 'en']);
const RATE_LIMIT_CONFIG = { max: 100, windowSeconds: 3600, keyPrefix: 'tokenize' };
const MAX_TEXT_LENGTH = 10000; // 10KB max

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

    // Rate limiting (Atomic)
    const clientIP = getClientIP(request);
    const rateCheck = await consumeRateLimit(TOKEN_CACHE, clientIP, RATE_LIMIT_CONFIG);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
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

        // Check cache first
        const cacheKey = `tokens:${lang}:${hashText(text)}`;
        if (TOKEN_CACHE) {
            try {
                const cached = await TOKEN_CACHE.get(cacheKey, 'json');
                if (cached) {
                    return jsonResponse(cached, 200, getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt));
                }
            } catch (e) {
                // Cache read failed, continue
            }
        }

        // Tokenize using shared module
        const tokens = await tokenize(text, lang);
        const result = { tokens };


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

        return jsonResponse(result, 200, getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt));

    } catch (error) {
        console.error(`[Tokenize ${lang.toUpperCase()}] Error:`, error);
        return errorResponse(error.message);
    }
}

