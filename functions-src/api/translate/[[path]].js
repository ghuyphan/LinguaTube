import { SimpleLRUCache } from '../../utils/cache-manager.js';
import { TRANSLATION_RATE_LIMIT } from '../../middlewares/rate-limiter.js';
/**
 * Translation Proxy API (Cloudflare Function)
 * Proxies requests to Lingva Translate with fallback instances
 * Route: /api/translate/[[path]]
 */

import { validateAuthToken, getUserTier } from '../../middlewares/auth.js';
import { jsonResponse, handleOptions, errorResponse, sanitizeLanguage } from '../../utils/utils.js';
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


// In-memory LRU cache across warm Worker isolates (Rule 2: In-Memory First)
const memSingleTranslateCache = new SimpleLRUCache(1000);
const CDN_CACHE_HEADER = 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400';

// Handle preflight requests
export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request, env, params } = context;
    const deadline = Date.now() + 20000;

    const pathSegments = params.path; // e.g., ['en', 'vi', 'hello']

    if (!pathSegments || pathSegments.length < 3) {
        return jsonResponse({ error: 'Invalid path. Expected: /api/translate/{source}/{target}/{text}' }, 400);
    }

    const source = sanitizeLanguage(pathSegments[0], ['ja', 'zh', 'ko', 'en', 'vi', 'auto']);
    const target = sanitizeLanguage(pathSegments[1], ['ja', 'zh', 'ko', 'en', 'vi']);
    let text = pathSegments.slice(2).join('/'); // Rejoin text that might contain slashes
    try {
        text = decodeURIComponent(text);
    } catch {
        // Fall back to raw text if malformed URI sequence
    }
    text = text.trim();

    if (!source || !target || !text) {
        return jsonResponse({ error: 'Invalid or missing source, target, or text' }, 400);
    }

    if (source === target) return jsonResponse({ translation: text });

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

    const rateLimitConfig = getTieredConfig(TRANSLATION_RATE_LIMIT, tier);
    const clientId = getClientIdentifier(request, authResult);
    const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, rateLimitConfig, context);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    try {
        const translation = await translateText(text, source, target, { signal: request.signal, deadline });

        if (translation !== null) {
            // Save to warm in-memory cache
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

