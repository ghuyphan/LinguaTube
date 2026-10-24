/**
 * Optimized Dictionary API (Cloudflare Function)
 * Endpoint: GET /api/dict?word={word}&from={learningLang}&to={uiLang}
 */

import { validateAuthToken } from '../middlewares/auth.js';
import {
    jsonResponse,
    handleOptions,
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

import { CacheManager, SimpleLRUCache } from '../utils/cache-manager.js';
import { DictionaryProvider } from '../providers/dictionary-apis.js';
import { TranslationProvider } from '../providers/lingva.js';
import { DictionaryService } from '../services/dict.service.js';

const CACHE_VERSION = 'v5';
const RATE_LIMIT_CONFIG = { max: 100, windowSeconds: 3600, keyPrefix: 'dict' };
const memNegDictCache = new SimpleLRUCache(1000, 60000);

export async function onRequest(context) {
    const { request, env } = context;
    const deadline = Date.now() + 12000;

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

    // Fast-path 2: in-memory negative cache check (0 KV ops, 0 API calls)
    const negKey = `dict:neg:${from}:${to}:${word}`;
    if (memNegDictCache.get(negKey)) {
        return jsonResponse({ word, from, to, source: 'none', entries: [] }, 200, {
            'X-Cache': 'NEG',
            'Cache-Control': 'public, max-age=60, s-maxage=60'
        });
    }

    // Rate limiting
    const authResult = await validateAuthToken(request, env);
    const clientId = getClientIdentifier(request, authResult);
    const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, RATE_LIMIT_CONFIG, context);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    // Initialize Services - skip KV write to preserve free tier quota (Rule 2)
    // Responses are cached at Cloudflare Edge CDN (7-day s-maxage) and in-memory
    const cacheManager = new CacheManager(env.TRANSCRIPT_CACHE, { skipKvWrite: true });
    const dictProvider = new DictionaryProvider();
    const transProvider = new TranslationProvider();
    const dictService = new DictionaryService(dictProvider, transProvider);

    const cacheKey = `dict:${CACHE_VERSION}:${from}:${to}:${word}`;

    try {
        // Automatically handle STALE/HIT/MISS via getOrFetch
        const { data: result, cached, stale } = await cacheManager.getOrFetch(context, cacheKey, async () => {
            const raw = await dictService.fetchWithFallback(word, from, to, { signal: request.signal, deadline });
            if (raw.outcome === 'unavailable') throw new Error('Dictionary providers unavailable');
            if (!raw.entries.length) return null;
            return raw;
        }, { forceRefresh: false, staleTtl: 0, ttl: 7 * 24 * 60 * 60, ttlForData: value => value.entries.some(entry => entry.definitionKind === 'fallback') ? 60 : 7 * 24 * 60 * 60 }); // 7 days TTL

        if (!result) {
            // Negative caching in-memory (avoids wasting KV write quota on misses)
            memNegDictCache.set(negKey, true);
            return jsonResponse({ word, from, to, source: 'none', entries: [] }, 200, {
                'X-Cache': 'MISS',
                'Cache-Control': 'public, max-age=60, s-maxage=60',
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
            'Cache-Control': result.entries.some(entry => entry.definitionKind === 'fallback') ? 'public, max-age=60, s-maxage=60' : 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
        });

    } catch (error) {
        logError('Dict', error, { from, to });
        return jsonResponse({ error: 'Dictionary providers unavailable' }, 503, { 'Cache-Control': 'no-store' });
    }
}