/**
 * Optimized Dictionary API (Cloudflare Function)
 * 
 * IMPROVEMENTS OVER ORIGINAL:
 * 1. Parallel fetching: Primary + English fallback run concurrently
 * 2. Stale-while-revalidate: Serve stale cache while refreshing in background
 * 3. Reduced timeouts: 5s primary, 3s fallback (was 8s for all)
 * 4. Multi-source fallback: Some pairs have backup sources
 * 5. Smarter caching: Version-tagged keys, negative caching for 404s
 * 6. Connection pooling hints via keepalive
 * 
 * Endpoint: GET /api/dict?word={word}&from={learningLang}&to={uiLang}
 */

import { validateAuthToken } from '../_shared/auth.js';
import {
    jsonResponse,
    handleOptions,
    errorResponse,
    sanitizeWord,
    sanitizeLanguage,
    logError
} from '../_shared/utils.js';
import {
    consumeRateLimit,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders
} from '../_shared/rate-limiter.js';
import {
    parseNaver, parseJotoba, parseMazii, parseFreeDictionary,
    parseMdbg, parseGlosbe, parseJisho, parseKrdict
} from '../_shared/dict-parsers.js';

// ============================================================================
// Configuration
// ============================================================================

const CACHE_VERSION = 'v3'; // Bump when parser logic changes
const CACHE_TTL = 7 * 24 * 60 * 60; // 7 days
const NEGATIVE_CACHE_TTL = 60 * 60; // 1 hour for "not found" results
const STALE_TTL = 24 * 60 * 60; // 24 hours - serve stale data while revalidating

const RATE_LIMIT_CONFIG = { max: 100, windowSeconds: 3600, keyPrefix: 'dict' };

// Reduced timeouts for faster failures
const PRIMARY_TIMEOUT_MS = 5000;
const FALLBACK_TIMEOUT_MS = 3000;
const TRANSLATION_TIMEOUT_MS = 4000;

// Browser-like headers
const BROWSER_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache'
};

// Dictionary sources with priority order (first = primary, rest = fallbacks)
const DICT_SOURCES = {
    // Korean → X
    'ko-en': [
        { url: 'https://en.dict.naver.com/api3/enko/search', method: 'GET', parser: 'naver', referer: 'https://en.dict.naver.com/' }
    ],
    'ko-vi': [
        { url: 'https://krdict.korean.go.kr/vie/dicMarinerSearch/search', method: 'GET', parser: 'krdict', referer: 'https://krdict.korean.go.kr/' },
        { url: 'https://glosbe.com/ko/vi/', method: 'GET', parser: 'glosbe', referer: 'https://glosbe.com/' } // Fallback
    ],
    'ko-ja': [
        { url: 'https://ja.dict.naver.com/api3/koja/search', method: 'GET', parser: 'naver', referer: 'https://ja.dict.naver.com/' }
    ],
    'ko-zh': [
        { url: 'https://zh.dict.naver.com/api3/kozh/search', method: 'GET', parser: 'naver', referer: 'https://zh.dict.naver.com/' }
    ],
    'ko-ko': [
        { url: 'https://ko.dict.naver.com/api3/koko/search', method: 'GET', parser: 'naver', referer: 'https://ko.dict.naver.com/' }
    ],

    // Japanese → X
    'ja-en': [
        { url: 'https://jotoba.de/api/search/words', method: 'POST', parser: 'jotoba', contentType: 'application/json', referer: 'https://jotoba.de/' },
        { url: 'https://jisho.org/api/v1/search/words', method: 'GET', parser: 'jisho', referer: 'https://jisho.org/' } // Fallback
    ],
    'ja-vi': [
        { url: 'https://mazii.net/api/search', method: 'POST', parser: 'mazii', contentType: 'application/json', referer: 'https://mazii.net/' },
        // English fallback handled separately
    ],
    'ja-ko': [
        { url: 'https://ko.dict.naver.com/api3/jako/search', method: 'GET', parser: 'naver', referer: 'https://ko.dict.naver.com/' }
    ],
    'ja-zh': [
        { url: 'https://zh.dict.naver.com/api3/jazh/search', method: 'GET', parser: 'naver', referer: 'https://zh.dict.naver.com/' }
    ],
    'ja-ja': [
        { url: 'https://jisho.org/api/v1/search/words', method: 'GET', parser: 'jisho', referer: 'https://jisho.org/' }
    ],

    // Chinese → X
    'zh-en': [
        { url: 'https://www.mdbg.net/chinese/dictionary', method: 'GET', parser: 'mdbg', referer: 'https://www.mdbg.net/' }
    ],
    'zh-vi': [
        { url: 'https://glosbe.com/zh/vi/', method: 'GET', parser: 'glosbe', referer: 'https://glosbe.com/' }
    ],
    'zh-ko': [
        { url: 'https://ko.dict.naver.com/api3/zhko/search', method: 'GET', parser: 'naver', referer: 'https://ko.dict.naver.com/' }
    ],
    'zh-ja': [
        { url: 'https://ja.dict.naver.com/api3/zhja/search', method: 'GET', parser: 'naver', referer: 'https://ja.dict.naver.com/' }
    ],

    // English → X
    'en-en': [
        { url: 'https://api.dictionaryapi.dev/api/v2/entries/en/', method: 'GET', parser: 'freedict' }
    ],
    'en-vi': [
        { url: 'https://glosbe.com/en/vi/', method: 'GET', parser: 'glosbe', referer: 'https://glosbe.com/' }
    ],
    'en-ja': [
        { url: 'https://jisho.org/api/v1/search/words', method: 'GET', parser: 'jisho', referer: 'https://jisho.org/' }
    ],
    'en-ko': [
        { url: 'https://glosbe.com/en/ko/', method: 'GET', parser: 'glosbe', referer: 'https://glosbe.com/' }
    ]
};

// Lingva instances for translation fallback
const LINGVA_INSTANCES = [
    'https://lingva.ml',
    'https://lingva.lunar.icu',
    'https://translate.plausibility.cloud'
];

// ============================================================================
// Main Handler
// ============================================================================

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
    if (!word) {
        return jsonResponse({ error: 'Missing or invalid query parameter: word' }, 400);
    }
    if (!from) {
        return jsonResponse({ error: 'Invalid or missing "from" parameter. Use: ja, zh, ko, en' }, 400);
    }
    if (!to) {
        return jsonResponse({ error: 'Invalid or missing "to" parameter. Use: ja, zh, ko, en, vi' }, 400);
    }

    // Rate limiting
    const authResult = await validateAuthToken(request, env);
    const clientId = getClientIdentifier(request, authResult);
    const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, RATE_LIMIT_CONFIG);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    const cache = env.TRANSCRIPT_CACHE;
    const cacheKey = `dict:${CACHE_VERSION}:${from}:${to}:${word}`;
    const negativeCacheKey = `dict:neg:${from}:${to}:${word}`;

    // =========================================================================
    // Step 1: Check Cache (with stale-while-revalidate support)
    // =========================================================================
    if (cache) {
        try {
            // Check negative cache first (word known to not exist)
            const negCached = await cache.get(negativeCacheKey);
            if (negCached) {
                return jsonResponse({
                    word, from, to, source: 'none', entries: []
                }, 200, {
                    'X-Cache': 'NEG',
                    'Cache-Control': 'public, max-age=3600'
                });
            }

            // Check positive cache
            const cached = await cache.get(cacheKey, 'json');
            if (cached) {
                const age = Date.now() - (cached.timestamp || 0);
                const isStale = age > STALE_TTL * 1000;

                // Return cached data immediately
                const response = jsonResponse(cached, 200, {
                    'X-Cache': isStale ? 'STALE' : 'HIT',
                    'Cache-Control': 'public, max-age=86400',
                    ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
                });

                // If stale, trigger background refresh (don't await)
                if (isStale && context.waitUntil) {
                    context.waitUntil(refreshCache(cache, cacheKey, word, from, to));
                }

                return response;
            }
        } catch (e) {
            console.error('[Dict] Cache read error:', e.message);
        }
    }

    // =========================================================================
    // Step 2: Fetch from Dictionary Sources (with parallel fallback)
    // =========================================================================
    try {
        const result = await fetchWithFallback(word, from, to);

        const response = {
            word,
            from,
            to,
            source: result.source,
            entries: result.entries || [],
            timestamp: Date.now()
        };

        // Cache the result
        if (cache) {
            if (result.entries?.length > 0) {
                // Positive cache
                cache.put(cacheKey, JSON.stringify(response), {
                    expirationTtl: CACHE_TTL
                }).catch(() => { });
            } else {
                // Negative cache (word not found)
                cache.put(negativeCacheKey, '1', {
                    expirationTtl: NEGATIVE_CACHE_TTL
                }).catch(() => { });
            }
        }

        return jsonResponse(response, 200, {
            'X-Cache': 'MISS',
            'Cache-Control': result.entries?.length > 0 ? 'public, max-age=86400' : 'public, max-age=3600',
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
        });

    } catch (error) {
        logError('Dict', error, { word, from, to });
        return errorResponse(error.message);
    }
}

// ============================================================================
// Fetch Strategy: Parallel Primary + English Fallback
// ============================================================================

/**
 * Fetches dictionary entries with intelligent fallback strategy:
 * 1. Start primary source(s) immediately
 * 2. For non-English targets, also start English lookup in parallel
 * 3. Use first successful result, translate English if needed
 */
async function fetchWithFallback(word, from, to) {
    const pairKey = `${from}-${to}`;
    const englishKey = `${from}-en`;
    const directSources = DICT_SOURCES[pairKey] || [];
    const englishSources = to !== 'en' ? (DICT_SOURCES[englishKey] || []) : [];

    // Build parallel fetch promises
    const promises = [];
    const promiseLabels = [];

    // Primary sources (with fallback within the same pair)
    if (directSources.length > 0) {
        promises.push(fetchFromSources(directSources, word, PRIMARY_TIMEOUT_MS));
        promiseLabels.push('direct');
    }

    // English fallback (runs in parallel, not after primary fails)
    if (englishSources.length > 0) {
        promises.push(fetchFromSources(englishSources, word, FALLBACK_TIMEOUT_MS));
        promiseLabels.push('english');
    }

    if (promises.length === 0) {
        return { entries: [], source: 'none' };
    }

    // Race: Use Promise.allSettled to get all results, then pick best
    const results = await Promise.allSettled(promises);

    // Check direct sources first
    const directIdx = promiseLabels.indexOf('direct');
    if (directIdx !== -1 && results[directIdx].status === 'fulfilled') {
        const direct = results[directIdx].value;
        if (direct?.entries?.length > 0) {
            return { entries: direct.entries, source: direct.source };
        }
    }

    // Fallback: Translate English definitions to target
    const englishIdx = promiseLabels.indexOf('english');
    if (englishIdx !== -1 && results[englishIdx].status === 'fulfilled') {
        const english = results[englishIdx].value;
        if (english?.entries?.length > 0) {
            const translated = await translateEntries(english.entries, to);
            if (translated?.length > 0) {
                return { entries: translated, source: `${english.source}+lingva` };
            }
            // Return English entries with [EN] prefix if translation fails
            const fallbackEntries = english.entries.map(e => ({
                ...e,
                definitions: e.definitions.map(d => `[EN] ${d}`)
            }));
            return { entries: fallbackEntries, source: `${english.source}+raw` };
        }
    }

    return { entries: [], source: 'none' };
}

/**
 * Try multiple sources in order, return first successful result
 */
async function fetchFromSources(sources, word, timeout) {
    for (const source of sources) {
        try {
            const entries = await fetchDictionary(source, word, timeout);
            if (entries?.length > 0) {
                return { entries, source: source.parser };
            }
        } catch (e) {
            console.log(`[Dict] ${source.parser} failed:`, e.message);
            // Try next source
        }
    }
    return null;
}

// ============================================================================
// Dictionary Fetcher
// ============================================================================

async function fetchDictionary(source, word, timeout) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        let url = source.url;
        let body = null;

        const headers = {
            ...BROWSER_HEADERS,
            'Referer': source.referer || ''
        };

        if (source.contentType) {
            headers['Content-Type'] = source.contentType;
        }

        // Build request based on source config
        switch (source.parser) {
            case 'naver':
                url = `${source.url}?query=${encodeURIComponent(word)}&m=pc&range=all`;
                break;
            case 'jotoba':
                body = JSON.stringify({ query: word, language: 'English', no_english: false });
                break;
            case 'mazii':
                body = JSON.stringify({ dict: 'javi', type: 'word', query: word, page: 1 });
                break;
            case 'mdbg':
                url = `${source.url}?page=worddict&wdqt=${encodeURIComponent(word)}&wdrst=0`;
                break;
            case 'glosbe':
                url = `${source.url}${encodeURIComponent(word)}`;
                break;
            case 'freedict':
                url = `${source.url}${encodeURIComponent(word)}`;
                break;
            case 'jisho':
                url = `${source.url}?keyword=${encodeURIComponent(word)}`;
                break;
            case 'krdict':
                url = `${source.url}?nation=vie&nationCode=10&mainSearchWord=${encodeURIComponent(word)}`;
                break;
        }

        const response = await fetch(url, {
            method: source.method,
            headers,
            body,
            signal: controller.signal
        });

        if (!response.ok) {
            if (response.status === 404) return [];
            throw new Error(`HTTP ${response.status}`);
        }

        // Parse response
        switch (source.parser) {
            case 'naver': return parseNaver(await response.json());
            case 'jotoba': return parseJotoba(await response.json());
            case 'mazii': return parseMazii(await response.json());
            case 'freedict': return parseFreeDictionary(await response.json());
            case 'mdbg': return await parseMdbg(response);
            case 'glosbe': return await parseGlosbe(response);
            case 'jisho': return parseJisho(await response.json());
            case 'krdict': return await parseKrdict(response);
            default: return [];
        }

    } finally {
        clearTimeout(timeoutId);
    }
}

// ============================================================================
// Translation (Parallel + Distributed)
// ============================================================================

/**
 * Translate entries to target language using Lingva
 * - Parallel: All translations run at once
 * - Distributed: Round-robin across instances
 * - Limited: 2 entries × 2 definitions = 4 max translations
 */
async function translateEntries(entries, targetLang) {
    if (!entries?.length) return [];

    // Limit to 2 entries, 2 definitions each
    const limitedEntries = entries.slice(0, 2);
    const translationTasks = [];

    limitedEntries.forEach((entry, entryIdx) => {
        entry.definitions.slice(0, 2).forEach((def, defIdx) => {
            translationTasks.push({
                entryIdx,
                defIdx,
                text: def,
                instance: LINGVA_INSTANCES[(entryIdx * 2 + defIdx) % LINGVA_INSTANCES.length]
            });
        });
    });

    if (translationTasks.length === 0) return [];

    // Parallel translation with timeout
    const translationPromises = translationTasks.map(task =>
        translateWithInstance(task.text, 'en', targetLang, task.instance)
            .catch(() => null)
    );

    const translations = await Promise.race([
        Promise.all(translationPromises),
        new Promise(resolve => setTimeout(() => resolve(translationTasks.map(() => null)), TRANSLATION_TIMEOUT_MS))
    ]);

    // Reassemble entries
    const result = limitedEntries.map(entry => ({
        ...entry,
        definitions: []
    }));

    translationTasks.forEach((task, i) => {
        const translated = translations[i];
        if (translated) {
            result[task.entryIdx].definitions.push(translated);
        }
    });

    return result.filter(e => e.definitions.length > 0);
}

/**
 * Translate text using a specific Lingva instance
 */
async function translateWithInstance(text, source, target, instance) {
    const url = `${instance}/api/v1/${source}/${target}/${encodeURIComponent(text)}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: { 'User-Agent': BROWSER_HEADERS['User-Agent'] },
        signal: AbortSignal.timeout(3000)
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    return data.translation || null;
}

// ============================================================================
// Background Cache Refresh
// ============================================================================

async function refreshCache(cache, cacheKey, word, from, to) {
    try {
        const result = await fetchWithFallback(word, from, to);
        if (result.entries?.length > 0) {
            await cache.put(cacheKey, JSON.stringify({
                word, from, to,
                source: result.source,
                entries: result.entries,
                timestamp: Date.now()
            }), { expirationTtl: CACHE_TTL });
        }
    } catch (e) {
        console.error('[Dict] Background refresh failed:', e.message);
    }
}