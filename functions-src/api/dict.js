/**
 * Optimized Dictionary API (Cloudflare Function)
 * Endpoint: GET /api/dict?word={word}&from={learningLang}&to={uiLang}
 */

import { validateAuthToken } from '../middlewares/auth.js';
import {
    jsonResponse,
    handleOptions,
    errorResponse,
    sanitizeWord,
    sanitizeLanguage,
    logError
} from '../utils/utils.js';
import {
    consumeRateLimit,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders
} from '../middlewares/rate-limiter.js';

import { CacheManager } from '../utils/cache-manager.js';
import { DictionaryProvider } from '../providers/dictionary-apis.js';
import { TranslationProvider } from '../providers/lingva.js';
import { DictionaryService } from '../services/dict.service.js';

const CACHE_VERSION = 'v4';
const RATE_LIMIT_CONFIG = { max: 100, windowSeconds: 3600, keyPrefix: 'dict' };
const memNegDictCache = new Set();

export async function onRequest(context) {
    const { request, env } = context;

    if (request.method === 'OPTIONS') {
        return handleOptions(['GET', 'OPTIONS']);
    }

    const url = new URL(request.url);
    const word = sanitizeWord(url.searchParams.get('word'));
    const from = sanitizeLanguage(url.searchParams.get('from'), ['ja', 'zh', 'ko', 'en']);
    const to = sanitizeLanguage(url.searchParams.get('to'), ['ja', 'zh', 'ko', 'en', 'vi']);

    // Validate parameters
    if (!word) return jsonResponse({ error: 'Missing logic parameter: word' }, 400);
    if (!from) return jsonResponse({ error: 'Invalid or missing "from" parameter.' }, 400);
    if (!to) return jsonResponse({ error: 'Invalid or missing "to" parameter.' }, 400);

    // Fast-path in-memory negative cache check (0 KV ops, 0 API calls)
    const negKey = `dict:neg:${from}:${to}:${word}`;
    if (memNegDictCache.has(negKey)) {
        return jsonResponse({ word, from, to, source: 'none', entries: [] }, 200, {
            'X-Cache': 'NEG',
            'Cache-Control': 'public, max-age=3600, s-maxage=86400'
        });
    }

    // Rate limiting
    const authResult = await validateAuthToken(request, env);
    const clientId = getClientIdentifier(request, authResult);
    const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, RATE_LIMIT_CONFIG);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    // Initialize Services
    const cacheManager = new CacheManager(env.TRANSCRIPT_CACHE);
    const dictProvider = new DictionaryProvider();
    const transProvider = new TranslationProvider();
    const dictService = new DictionaryService(dictProvider, transProvider);

    const cacheKey = `dict:${CACHE_VERSION}:${from}:${to}:${word}`;

    try {
        // Automatically handle STALE/HIT/MISS via getOrFetch
        const { data: result, cached, stale } = await cacheManager.getOrFetch(context, cacheKey, async () => {
            const raw = await dictService.fetchWithFallback(word, from, to);
            if (!raw || !raw.entries || raw.entries.length === 0) {
                // Return empty but do NOT cache it under normal positive TTL
                // Throwing an error prevents caching but we just want to negative cache
                // For simplicity, we define a short TTL inside getOrFetch options or handle negative cache manually
                return null;
            }
            return raw;
        }, { forceRefresh: false, ttl: 7 * 24 * 60 * 60 }); // 7 days TTL

        if (!result) {
            // Negative caching in-memory (avoids wasting KV write quota on misses)
            memNegDictCache.add(negKey);
            return jsonResponse({ word, from, to, source: 'none', entries: [] }, 200, {
                'X-Cache': 'MISS',
                'Cache-Control': 'public, max-age=3600, s-maxage=86400',
                ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
            });
        }

        const responseData = {
            word, from, to,
            source: result.source,
            entries: result.entries || [],
            timestamp: Date.now()
        };

        const cacheHeader = cached ? (stale ? 'STALE' : 'HIT') : 'MISS';

        return jsonResponse(responseData, 200, {
            'X-Cache': cacheHeader,
            'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
        });

    } catch (error) {
        logError('Dict', error, { word, from, to });
        return errorResponse(error.message);
    }
}