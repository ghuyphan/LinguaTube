/**
 * Korean Dictionary API (Cloudflare Function)
 * Scrapes Naver Korean-English dictionary for word definitions
 * Uses KV caching for performance
 */

import { jsonResponse, handleOptions, errorResponse } from '../_shared/utils.js';
import { checkRateLimit, incrementRateLimit, getClientIP, rateLimitResponse } from '../_shared/rate-limiter.js';

const CACHE_TTL = 7 * 24 * 60 * 60; // 7 days in seconds
const RATE_LIMIT_CONFIG = { max: 100, windowSeconds: 3600, keyPrefix: 'dict' };

export async function onRequest(context) {
    const { request, env } = context;

    console.warn('[Deprecation] /api/krdict is deprecated. Use /api/dict?word=...&from=ko&to=en instead.');

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return handleOptions(['GET', 'OPTIONS']);
    }

    const url = new URL(request.url);
    const word = url.searchParams.get('q');

    if (!word) {
        return jsonResponse({ error: 'Missing query parameter "q"' }, 400);
    }

    // Rate limiting (Atomic)
    const clientIP = getClientIP(request);
    const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    const DICT_CACHE = env.DICT_CACHE;
    const cacheKey = `krdict:${word}`;

    // Check cache first
    if (DICT_CACHE) {
        try {
            const cached = await DICT_CACHE.get(cacheKey, 'json');
            if (cached) {
                return jsonResponse(cached, 200, {
                    'X-Cache': 'HIT',
                    ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt),
                    'X-Deprecated': 'Use /api/dict instead'
                });
            }
        } catch (e) {
            // Cache read failed, continue with fetch
        }
    }

    // Use Naver Korean-English dictionary
    const targetUrl = `https://en.dict.naver.com/api3/enko/search?query=${encodeURIComponent(word)}&m=pc&range=all`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Referer': 'https://en.dict.naver.com/'
            }
        });

        if (!response.ok) {
            throw new Error(`Naver API returned ${response.status}`);
        }

        const data = await response.json();

        // Parse searchResultMap -> searchResultListMap -> WORD -> items
        const wordResults = data?.searchResultMap?.searchResultListMap?.WORD?.items || [];

        const entries = wordResults.slice(0, 5).map(item => {
            // Extract word (handle HTML entities)
            const wordText = (item.expEntry || '').replace(/<[^>]+>/g, '');

            // Extract romanization/pronunciation
            const romanization = (item.expEntrySuperscript || item.phoneticSigns?.[0]?.sign || '').replace(/<[^>]+>/g, '');

            // Extract definitions from meansCollector
            const definitions = [];
            if (item.meansCollector) {
                item.meansCollector.forEach(collector => {
                    if (collector.means) {
                        collector.means.forEach(mean => {
                            const def = (mean.value || '').replace(/<[^>]+>/g, '').trim();
                            if (def) definitions.push(def);
                        });
                    }
                });
            }

            // Extract part of speech
            const partOfSpeech = (item.sourceDictnameKo || '').replace(/<[^>]+>/g, '');

            return {
                word: wordText,
                romanization,
                definitions,
                partOfSpeech
            };
        }).filter(e => e.word && e.definitions.length > 0);

        if (DICT_CACHE && entries.length > 0) {
            try {
                await DICT_CACHE.put(cacheKey, JSON.stringify(entries), { expirationTtl: CACHE_TTL });
            } catch (e) {
                // Cache write failed, continue
            }
        }

        return jsonResponse(entries, 200, {
            'Cache-Control': 'public, max-age=86400',
            'X-Cache': 'MISS',
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt),
            'X-Deprecated': 'Use /api/dict instead'
        });

    } catch (error) {
        console.error('[Korean Dict] Error:', error);
        return errorResponse(error.message);
    }
}
