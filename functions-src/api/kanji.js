/**
 * Optimized Kanji Breakdown & Stroke Order API (Cloudflare Function)
 * Endpoint: GET /api/kanji?query={query}&lang={optionalLanguage}
 * 
 * Supports:
 * - Single Kanji character: ?query=食 (or ?char=食)
 * - Compound words / okurigana: ?query=食べる or ?query=時間 (extracts all constituent kanji)
 * 
 * Returns standardized Kanji metadata and direct links to stroke order SVGs.
 * Incurs 0 KV operations on cache hits via in-memory and 30-day Edge CDN caching.
 */

import { validateAuthToken } from '../middlewares/auth.js';
import {
    jsonResponse,
    handleOptions,
    sanitizeWord,
    logError
} from '../utils/utils.js';
import {
    consumeRateLimit,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders
} from '../middlewares/rate-limiter.js';

const RATE_LIMIT_CONFIG = { max: 120, windowSeconds: 3600, keyPrefix: 'kanji' };

// In-memory positive kanji LRU cache across warm Worker isolates
const memPosKanjiCache = new Map();
const MAX_MEM_POS_KANJI = 1000;
const MEM_POS_KANJI_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours warm memory cache

export async function onRequest(context) {
    const { request, env } = context;

    if (request.method === 'OPTIONS') {
        return handleOptions(['GET', 'OPTIONS']);
    }

    if (request.method !== 'GET') {
        return jsonResponse({ error: 'Method not allowed' }, 405, {}, request);
    }

    const url = new URL(request.url);
    const query = sanitizeWord(url.searchParams.get('query') || url.searchParams.get('char') || url.searchParams.get('word'));

    if (!query) {
        return jsonResponse({ error: 'Missing logic parameter: query (or char/word)' }, 400, {}, request);
    }

    // Fast-path: in-memory positive cache check (< 0.1ms)
    const memHit = memPosKanjiCache.get(query);
    if (memHit && (Date.now() - memHit.timestamp < MEM_POS_KANJI_TTL_MS)) {
        return jsonResponse(memHit.data, 200, {
            'X-Cache': 'HIT-MEMORY',
            'Cache-Control': 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400'
        }, request);
    }

    // Rate limiting
    const authResult = await validateAuthToken(request, env);
    const clientId = getClientIdentifier(request, authResult);
    const rateCheck = await consumeRateLimit(env?.TRANSCRIPT_CACHE, clientId, RATE_LIMIT_CONFIG);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    try {
        const jotobaRes = await fetch('https://jotoba.de/api/search/kanji', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Referer': 'https://jotoba.de/'
            },
            body: JSON.stringify({
                query,
                language: 'English'
            })
        });

        if (!jotobaRes.ok) {
            return jsonResponse({ query, kanji: [], count: 0 }, 200, {
                'X-Cache': 'MISS',
                'Cache-Control': 'public, max-age=3600, s-maxage=86400',
                ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
            }, request);
        }

        const data = await jotobaRes.json();
        const rawList = Array.isArray(data?.kanji) ? data.kanji : [];

        const formattedList = rawList.map(item => {
            const literal = item.literal || '';
            return {
                literal,
                meanings: Array.isArray(item.meanings) ? item.meanings : [],
                grade: typeof item.grade === 'number' ? item.grade : null,
                stroke_count: typeof item.stroke_count === 'number' ? item.stroke_count : 0,
                frequency: typeof item.frequency === 'number' ? item.frequency : null,
                jlpt: typeof item.jlpt === 'number' ? item.jlpt : null,
                onyomi: Array.isArray(item.onyomi) ? item.onyomi : [],
                kunyomi: Array.isArray(item.kunyomi) ? item.kunyomi : [],
                chinese: Array.isArray(item.chinese) ? item.chinese : [],
                korean_r: Array.isArray(item.korean_r) ? item.korean_r : [],
                korean_h: Array.isArray(item.korean_h) ? item.korean_h : [],
                radical: item.radical || null,
                parts: Array.isArray(item.parts) ? item.parts : [],
                stroke_order_svg: literal ? `https://jotoba.de/resource/kanji/animation/${encodeURIComponent(literal)}` : null,
                stroke_frames_svg: literal ? `https://jotoba.de/resource/kanji/frames/${encodeURIComponent(literal)}` : null
            };
        });

        const responsePayload = {
            query,
            count: formattedList.length,
            kanji: formattedList,
            timestamp: Date.now()
        };

        // Cache in memory
        if (memPosKanjiCache.size >= MAX_MEM_POS_KANJI) {
            const oldest = memPosKanjiCache.keys().next().value;
            if (oldest) memPosKanjiCache.delete(oldest);
        }
        memPosKanjiCache.set(query, { data: responsePayload, timestamp: Date.now() });

        return jsonResponse(responsePayload, 200, {
            'X-Cache': 'MISS',
            'Cache-Control': 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400',
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
        }, request);

    } catch (err) {
        logError('kanji', err, { query });
        return jsonResponse({ error: 'Internal server error while searching kanji' }, 500, {}, request);
    }
}
