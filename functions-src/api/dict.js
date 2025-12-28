/**
 * Unified Dictionary API (Cloudflare Function)
 * Supports multiple language pairs with automatic source selection
 * 
 * Endpoint: GET /api/dict?word={word}&from={learningLang}&to={uiLang}
 * 
 * Supported pairs:
 * - Korean (ko) → en, vi, ja, zh, ko (Naver)
 * - Japanese (ja) → en (Jotoba), vi (Mazii), ko, zh (Naver)
 * - Chinese (zh) → en (MDBG), vi (Hanzii), ko, ja (Naver)
 * - English (en) → en (Free Dictionary), others via fallback translation
 * 
 * Fallback: Get English definition → Translate via Lingva
 */


import { jsonResponse, handleOptions, errorResponse } from '../_shared/utils.js';
import { checkRateLimit, incrementRateLimit, getClientIP, rateLimitResponse } from '../_shared/rate-limiter.js';
import { parseNaver, parseJotoba, parseMazii, parseFreeDictionary, parseMdbg, parseHanzii } from '../_shared/dict-parsers.js';

// ============================================================================
// Configuration
// ============================================================================

const CACHE_TTL = 7 * 24 * 60 * 60; // 7 days
const RATE_LIMIT_CONFIG = { max: 100, windowSeconds: 3600, keyPrefix: 'dict' };
const FETCH_TIMEOUT_MS = 8000;

// Browser-like headers to avoid blocks
const BROWSER_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/html, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache'
};

// Dictionary source configuration
const DICT_SOURCES = {
    // Korean → X (Naver supports multiple languages)
    'ko-en': {
        url: 'https://en.dict.naver.com/api3/enko/search',
        method: 'GET',
        parser: 'naver',
        referer: 'https://en.dict.naver.com/'
    },
    'ko-vi': {
        url: 'https://vi.dict.naver.com/api3/kovi/search',
        method: 'GET',
        parser: 'naver',
        referer: 'https://vi.dict.naver.com/'
    },
    'ko-ja': {
        url: 'https://ja.dict.naver.com/api3/koja/search',
        method: 'GET',
        parser: 'naver',
        referer: 'https://ja.dict.naver.com/'
    },
    'ko-zh': {
        url: 'https://zh.dict.naver.com/api3/kozh/search',
        method: 'GET',
        parser: 'naver',
        referer: 'https://zh.dict.naver.com/'
    },
    'ko-ko': {
        url: 'https://ko.dict.naver.com/api3/koko/search',
        method: 'GET',
        parser: 'naver',
        referer: 'https://ko.dict.naver.com/'
    },

    // Japanese → X
    'ja-en': {
        url: 'https://jotoba.de/api/search/words',
        method: 'POST',
        parser: 'jotoba',
        contentType: 'application/json',
        referer: 'https://jotoba.de/'
    },
    'ja-vi': {
        url: 'https://mazii.net/api/search',
        method: 'POST',
        parser: 'mazii',
        contentType: 'application/json',
        referer: 'https://mazii.net/'
    },
    'ja-ko': {
        // Naver Japanese-Korean dictionary
        url: 'https://ko.dict.naver.com/api3/jako/search',
        method: 'GET',
        parser: 'naver',
        referer: 'https://ko.dict.naver.com/'
    },
    'ja-zh': {
        // Naver Japanese-Chinese dictionary  
        url: 'https://zh.dict.naver.com/api3/jazh/search',
        method: 'GET',
        parser: 'naver',
        referer: 'https://zh.dict.naver.com/'
    },

    // Chinese → X
    'zh-en': {
        url: 'https://www.mdbg.net/chinese/dictionary',
        method: 'GET',
        parser: 'mdbg',
        referer: 'https://www.mdbg.net/'
    },
    'zh-vi': {
        url: 'https://hanzii.net/search/word/',
        method: 'GET',
        parser: 'hanzii',
        referer: 'https://hanzii.net/'
    },
    'zh-ko': {
        // Naver Chinese-Korean dictionary
        url: 'https://ko.dict.naver.com/api3/zhko/search',
        method: 'GET',
        parser: 'naver',
        referer: 'https://ko.dict.naver.com/'
    },
    'zh-ja': {
        // Naver Chinese-Japanese dictionary
        url: 'https://ja.dict.naver.com/api3/zhja/search',
        method: 'GET',
        parser: 'naver',
        referer: 'https://ja.dict.naver.com/'
    },

    // English → X
    'en-en': {
        url: 'https://api.dictionaryapi.dev/api/v2/entries/en/',
        method: 'GET',
        parser: 'freedict'
    }
};

// Lingva translation instances for fallback
const LINGVA_INSTANCES = [
    'https://lingva.ml',
    'https://lingva.lunar.icu',
    'https://translate.plausibility.cloud'
];

// ============================================================================
// Request Handler
// ============================================================================

export async function onRequest(context) {
    const { request, env } = context;

    if (request.method === 'OPTIONS') {
        return handleOptions(['GET', 'OPTIONS']);
    }

    const url = new URL(request.url);
    const word = url.searchParams.get('word')?.trim();
    const from = url.searchParams.get('from')?.toLowerCase();
    const to = url.searchParams.get('to')?.toLowerCase();

    // Validate parameters
    if (!word) {
        return jsonResponse({ error: 'Missing query parameter: word' }, 400);
    }
    if (!from || !['ja', 'zh', 'ko', 'en'].includes(from)) {
        return jsonResponse({ error: 'Invalid or missing "from" parameter. Use: ja, zh, ko, en' }, 400);
    }
    if (!to || !['ja', 'zh', 'ko', 'en', 'vi'].includes(to)) {
        return jsonResponse({ error: 'Invalid or missing "to" parameter. Use: ja, zh, ko, en, vi' }, 400);
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    const rateCheck = await checkRateLimit(env.TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    const DICT_CACHE = env.DICT_CACHE;
    const cacheKey = `dict:v2:${from}:${to}:${word}`;

    // Check cache
    if (DICT_CACHE) {
        try {
            const cached = await DICT_CACHE.get(cacheKey, 'json');
            if (cached) {
                return jsonResponse(cached, 200, { 'X-Cache': 'HIT' });
            }
        } catch (e) {
            // Cache read failed, continue
        }
    }

    try {
        let entries = null;
        let source = 'none';

        const pairKey = `${from}-${to}`;
        const dictSource = DICT_SOURCES[pairKey];

        // Try direct dictionary source
        if (dictSource) {
            entries = await fetchDictionary(dictSource, word);
            source = dictSource.parser;
        }

        // Fallback: Get English definition + translate
        if (!entries || entries.length === 0) {
            const englishKey = `${from}-en`;
            const englishSource = DICT_SOURCES[englishKey];

            if (englishSource && to !== 'en') {
                const englishEntries = await fetchDictionary(englishSource, word);

                if (englishEntries?.length > 0) {
                    // Translate definitions to target language
                    entries = await translateEntries(englishEntries, to);
                    source = `${englishSource.parser}+lingva`;
                }
            }
        }

        // Increment rate limit for successful lookup
        await incrementRateLimit(env.TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);

        const result = {
            word,
            from,
            to,
            source,
            entries: entries || []
        };

        // Cache result
        if (DICT_CACHE && entries?.length > 0) {
            try {
                await DICT_CACHE.put(cacheKey, JSON.stringify(result), { expirationTtl: CACHE_TTL });
            } catch (e) {
                // Cache write failed
            }
        }

        return jsonResponse(result, 200, { 'X-Cache': 'MISS' });

    } catch (error) {
        console.error('[Dict] Error:', error);
        return errorResponse(error.message);
    }
}

// ============================================================================
// Dictionary Fetchers
// ============================================================================

async function fetchDictionary(source, word) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

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
                body = JSON.stringify({
                    query: word,
                    language: 'English',
                    no_english: false
                });
                break;

            case 'mazii':
                body = JSON.stringify({
                    dict: 'javi',
                    type: 'word',
                    query: word,
                    page: 1
                });
                break;

            case 'mdbg':
                url = `${source.url}?page=worddict&wdqt=${encodeURIComponent(word)}&wdrst=0&wdqtm=0&wdqcham=1`;
                break;

            case 'hanzii':
                url = `${source.url}${encodeURIComponent(word)}`;
                break;

            case 'freedict':
                url = `${source.url}${encodeURIComponent(word)}`;
                break;
        }

        const response = await fetch(url, {
            method: source.method,
            headers,
            body,
            signal: controller.signal
        });

        if (!response.ok) {
            if (response.status === 404) {
                return []; // Word not found
            }
            throw new Error(`Dictionary returned ${response.status}`);
        }

        // Parse based on source type
        switch (source.parser) {
            case 'naver':
                return parseNaver(await response.json());

            case 'jotoba':
                return parseJotoba(await response.json());

            case 'mazii':
                return parseMazii(await response.json());

            case 'freedict':
                return parseFreeDictionary(await response.json());

            case 'mdbg':
                return await parseMdbg(response);

            case 'hanzii':
                return parseHanzii(await response.text());

            default:
                return [];
        }

    } catch (error) {
        if (error.name === 'AbortError') {
            console.log(`[Dict] Timeout for ${source.parser}`);
        } else {
            console.error(`[Dict] ${source.parser} error:`, error.message);
        }
        return null;
    } finally {
        clearTimeout(timeout);
    }
}

// ============================================================================
// Translation Fallback
// ============================================================================

async function translateEntries(entries, targetLang) {
    if (!entries?.length) return [];

    // Only translate definitions, keep other metadata
    const translatedEntries = [];

    for (const entry of entries.slice(0, 3)) {
        const translatedDefs = [];

        for (const def of entry.definitions.slice(0, 3)) {
            const translated = await translateText(def, 'en', targetLang);
            if (translated) {
                translatedDefs.push(translated);
            }
        }

        if (translatedDefs.length > 0) {
            translatedEntries.push({
                ...entry,
                definitions: translatedDefs
            });
        }
    }

    return translatedEntries;
}

async function translateText(text, sourceLang, targetLang) {
    for (const instance of LINGVA_INSTANCES) {
        try {
            const url = `${instance}/api/v1/${sourceLang}/${targetLang}/${encodeURIComponent(text)}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: BROWSER_HEADERS,
                signal: AbortSignal.timeout(5000)
            });

            if (response.ok) {
                const data = await response.json();
                return data.translation || null;
            }
        } catch (e) {
            // Try next instance
        }
    }
    return null;
}
