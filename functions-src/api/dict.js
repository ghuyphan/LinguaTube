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
import { parseNaver, parseJotoba, parseJotobaJapanese, parseMazii, parseFreeDictionary, parseMdbg, parseGlosbe, parseJisho, parseKrdict } from '../_shared/dict-parsers.js';

// ============================================================================
// Configuration
// ============================================================================

const CACHE_TTL = 7 * 24 * 60 * 60; // 7 days
const RATE_LIMIT_CONFIG = { max: 100, windowSeconds: 3600, keyPrefix: 'dict' };
const FETCH_TIMEOUT_MS = 8000;

// Browser-like headers to avoid blocks
const BROWSER_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9,ja;q=0.8,ko;q=0.7,vi;q=0.6,zh;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1'
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
        // KRDICT - Official Korean govt dictionary with Vietnamese translations
        url: 'https://krdict.korean.go.kr/vie/dicMarinerSearch/search',
        method: 'GET',
        parser: 'krdict',
        referer: 'https://krdict.korean.go.kr/'
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
        // Jisho.org API - get English definitions, then translate to Vietnamese
        url: 'https://jisho.org/api/v1/search/words',
        method: 'GET',
        parser: 'jisho',
        referer: 'https://jisho.org/',
        translateTo: 'vi'  // Flag to translate definitions
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
        url: 'https://glosbe.com/zh/vi/',
        method: 'GET',
        parser: 'glosbe',
        referer: 'https://glosbe.com/'
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
    },
    'en-vi': {
        url: 'https://glosbe.com/en/vi/',
        method: 'GET',
        parser: 'glosbe',
        referer: 'https://glosbe.com/'
    },
    'en-ja': {
        // Jisho.org API - supports English to Japanese lookup
        url: 'https://jisho.org/api/v1/search/words',
        method: 'GET',
        parser: 'jisho',
        referer: 'https://jisho.org/'
    },
    'en-ko': {
        url: 'https://glosbe.com/en/ko/',
        method: 'GET',
        parser: 'glosbe',
        referer: 'https://glosbe.com/'
    },

    // Japanese monolingual (Jisho API - returns readings, kanji, JLPT level)
    'ja-ja': {
        url: 'https://jisho.org/api/v1/search/words',
        method: 'GET',
        parser: 'jisho',
        referer: 'https://jisho.org/'
    }
};

// Lingva translation instances for fallback (distributed load)
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
            console.log(`[Dict] Trying direct source: ${dictSource.parser} for ${pairKey}`);
            entries = await fetchDictionary(dictSource, word);
            console.log(`[Dict] Direct source ${dictSource.parser} returned: ${entries ? entries.length : 'null'} entries`);
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

            case 'jotoba-ja':
                body = JSON.stringify({
                    query: word,
                    language: 'Japanese',
                    no_english: true
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

            case 'jotoba-ja':
                return parseJotobaJapanese(await response.json());

            case 'mazii': {
                const json = await response.json();
                console.log(`[Dict] Mazii raw response keys: ${Object.keys(json)}, hasData: ${!!json.data}, hasResults: ${!!json.results}`);
                return parseMazii(json);
            }

            case 'freedict':
                return parseFreeDictionary(await response.json());

            case 'mdbg':
                return await parseMdbg(response);

            case 'glosbe': {
                console.log(`[Dict] Glosbe response status: ${response.status}, contentType: ${response.headers.get('content-type')}`);
                return await parseGlosbe(response);
            }

            case 'jisho':
                return parseJisho(await response.json());

            case 'krdict':
                return await parseKrdict(response);

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
// - Parallelized: all requests at once instead of sequential
// - Distributed: round-robin across Lingva instances to avoid rate limits
// - Reduced: 2 entries × 2 definitions = 4 requests max (was 9)
// ============================================================================

async function translateEntries(entries, targetLang) {
    if (!entries?.length) return [];

    // Reduced: 2 entries × 2 definitions = 4 requests max
    const limitedEntries = entries.slice(0, 2);
    const allDefs = [];

    // Build flat list of { entryIndex, def } for parallel translation
    limitedEntries.forEach((entry, entryIndex) => {
        entry.definitions.slice(0, 2).forEach(def => {
            allDefs.push({ entryIndex, def });
        });
    });

    if (allDefs.length === 0) return [];

    // Parallel + distributed across instances (round-robin)
    // 4 requests across 3 instances = ~1-2 requests per instance
    const translations = await Promise.all(
        allDefs.map(({ def }, i) => {
            const instance = LINGVA_INSTANCES[i % LINGVA_INSTANCES.length];
            return translateTextWithInstance(def, 'en', targetLang, instance);
        })
    );

    // Reassemble entries with translated definitions
    const translatedEntries = limitedEntries.map(entry => ({
        ...entry,
        definitions: []
    }));

    allDefs.forEach(({ entryIndex }, i) => {
        if (translations[i]) {
            translatedEntries[entryIndex].definitions.push(translations[i]);
        }
    });

    // Filter out entries with no successful translations
    return translatedEntries.filter(e => e.definitions.length > 0);
}

/**
 * Translate text using a specific Lingva instance
 * Falls back to other instances if the specified one fails
 */
async function translateTextWithInstance(text, sourceLang, targetLang, preferredInstance) {
    // Try preferred instance first
    const instances = [
        preferredInstance,
        ...LINGVA_INSTANCES.filter(i => i !== preferredInstance)
    ];

    for (const instance of instances) {
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