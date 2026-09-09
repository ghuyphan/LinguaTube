/**
 * Translation Proxy API (Cloudflare Function)
 * Proxies requests to Lingva Translate with fallback instances
 * Route: /api/translate/[[path]]
 */

import { validateAuthToken, getUserTier } from '../../middlewares/auth.js';
import { jsonResponse, handleOptions, errorResponse } from '../../utils/utils.js';
import {
    consumeRateLimit,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders,
    getTieredConfig
} from '../../middlewares/rate-limiter.js';
import { translateText } from '../../providers/lingva.js';

// Rate limit by texts translated, not requests
// Single endpoint counts as 1 text, batch counts as texts.length
// Shared key: 'translate-texts' so single and batch share the same quota
const RATE_LIMIT_CONFIG = {
    max: { anonymous: 2000, free: 5000, pro: 25000, premium: 100000 },
    windowSeconds: 3600,
    keyPrefix: 'translate-texts'
};

// In-memory LRU cache across warm Worker isolates (Rule 2: In-Memory First)
const memSingleTranslateCache = new Map();
const MAX_MEM_TRANSLATE_CACHE = 1000;
const CDN_CACHE_HEADER = 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400';

// Handle preflight requests
export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request, env, params } = context;

    const pathSegments = params.path; // e.g., ['en', 'vi', 'hello']

    if (!pathSegments || pathSegments.length < 3) {
        return jsonResponse({ error: 'Invalid path. Expected: /api/translate/{source}/{target}/{text}' }, 400);
    }

    const source = pathSegments[0];
    const target = pathSegments[1];
    const text = pathSegments.slice(2).join('/'); // Rejoin text that might contain slashes

    if (!source || !target || !text) {
        return jsonResponse({ error: 'Missing source, target, or text' }, 400);
    }

    // Fast-path: Check warm in-memory cache (0 KV, 0 API calls, < 0.1ms)
    const cacheKey = `${source}:${target}:${text}`;
    const memHit = memSingleTranslateCache.get(cacheKey);
    if (memHit) {
        return jsonResponse({ translation: memHit }, 200, {
            'X-Cache': 'HIT-MEM',
            'Cache-Control': CDN_CACHE_HEADER
        });
    }

    // Rate limiting (Atomic)
    const authResult = await validateAuthToken(request, env);
    const tier = authResult.valid ? getUserTier(authResult.user) : 'anonymous';

    const rateLimitConfig = getTieredConfig(RATE_LIMIT_CONFIG, tier);
    const clientId = getClientIdentifier(request, authResult);
    const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, rateLimitConfig);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    try {
        const translation = await translateText(text, source, target);

        if (translation !== null) {
            // Save to warm in-memory cache
            if (memSingleTranslateCache.size >= MAX_MEM_TRANSLATE_CACHE) {
                const oldest = memSingleTranslateCache.keys().next().value;
                if (oldest) memSingleTranslateCache.delete(oldest);
            }
            memSingleTranslateCache.set(cacheKey, translation);

            return jsonResponse({ translation }, 200, {
                'X-Cache': 'MISS',
                'Cache-Control': CDN_CACHE_HEADER,
                ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
            });
        }
    } catch (error) {
        console.error('[Translate] Single translate error:', error);
    }

    return errorResponse('Translation failed: All instances unavailable or rate limited');
}

