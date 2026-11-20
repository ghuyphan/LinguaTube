/** GET /api/dict?word={word}&from={learningLang}&to={uiLang} */
import { authenticateIdentity } from '../middlewares/auth.js';
import { jsonResponse, sanitizeWord, sanitizeLanguage, SUPPORTED_LEARNING_LANGUAGES } from '../utils/utils.js';
import {
    consumeRateLimit, getClientIdentifier, rateLimitResponse, getRateLimitHeaders
} from '../middlewares/rate-limiter.js';
import { CacheManager } from '../utils/cache-manager.js';
import { DictionaryProvider } from '../providers/dictionary-apis.js';
import { TranslationProvider } from '../providers/lingva.js';
import { DictionaryService } from '../services/dict.service.js';

const CACHE_VERSION = 'v7';
const RATE_LIMIT_CONFIG = { max: 100, windowSeconds: 3600, keyPrefix: 'dict' };
const SECOND = 1000;
const DAY = 86400;
const cacheManager = new CacheManager(null);
const dictService = new DictionaryService(new DictionaryProvider(), new TranslationProvider());
const remaining = result => Math.max(0, (result.expiresAt - Date.now()) / SECOND);

export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const word = sanitizeWord(url.searchParams.get('word'));
    const from = sanitizeLanguage(url.searchParams.get('from'));
    const to = sanitizeLanguage(url.searchParams.get('to'), [...SUPPORTED_LEARNING_LANGUAGES, 'ru']);

    if (!word) return jsonResponse({ error: 'Missing logic parameter: word' }, 400);
    if (!from) return jsonResponse({ error: 'Invalid or missing "from" parameter.' }, 400);
    if (!to) return jsonResponse({ error: 'Invalid or missing "to" parameter.' }, 400);

    const authResult = await authenticateIdentity(request, env);
    if (authResult.response) return authResult.response;
    const clientId = getClientIdentifier(request, authResult);
    const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, RATE_LIMIT_CONFIG, context);
    if (!rateCheck.allowed) return rateLimitResponse(rateCheck.resetAt);

    const query = new URLSearchParams({ word, from, to });
    const cacheKey = `dict:${CACHE_VERSION}:${query}`;
    const cacheUrl = new URL(`/api/dict?${query}`, url.origin);
    try {
        const pending = cacheManager.getOrFetch(context, cacheKey, async () => {
            let regional;
            try {
                regional = await globalThis.caches?.open(`dictionary-${CACHE_VERSION}`);
                const response = await regional?.match(cacheUrl);
                if (response) {
                    const saved = await response.json();
                    if (Array.isArray(saved.entries) && remaining(saved) > 0) return { ...saved, regionalHit: true };
                }
            } catch { /* The upstream path is still available if regional caching fails. */ }

            const lookup = await dictService.fetchWithFallback(word, from, to);
            if (lookup.outcome === 'unavailable') throw new Error('Dictionary providers unavailable');

            const { entries, source } = lookup;
            const timestamp = Date.now();
            const ttl = entries.length && !entries.some(entry => entry.definitionKind === 'fallback') ? 7 * DAY : 60;
            const result = { entries, source, timestamp, expiresAt: timestamp + ttl * SECOND };
            if (regional && context.waitUntil) {
                context.waitUntil(regional.put(cacheUrl, Response.json(result, {
                    headers: { 'Cache-Control': `public, max-age=${ttl}` }
                })).catch(() => {}));
            }
            return result;
        }, { ttlForData: remaining });
        // The shared lookup has its own deadline. A disconnected caller cannot abort other readers.
        context.waitUntil?.(pending.catch(() => {}));
        const { data: result, cached } = await pending;
        const { source, entries, timestamp } = result;
        const ttl = Math.floor(remaining(result));
        const cacheHeader = cached && !entries.length ? 'NEG' : cached ? 'HIT' : result.regionalHit ? 'HIT-EDGE' : 'MISS';
        return jsonResponse({ word, from, to, source, entries, ...(entries.length ? { timestamp } : {}) }, 200, {
            'X-Cache': cacheHeader,
            'Cache-Control': `public, max-age=${Math.min(DAY, ttl)}, s-maxage=${ttl}`,
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
        });
    } catch {
        return jsonResponse({ error: 'Dictionary providers unavailable' }, 503, { 'Cache-Control': 'no-store' });
    }
}

export const onRequest = onRequestGet;
