/**
 * Chinese Dictionary API (Cloudflare Function)
 * Scrapes MDBG Chinese dictionary for word definitions
 * Uses KV caching for performance
 */

import { jsonResponse, handleOptions, errorResponse } from '../_shared/utils.js';
import { checkRateLimit, incrementRateLimit, getClientIP, rateLimitResponse } from '../_shared/rate-limiter.js';

const CACHE_TTL = 7 * 24 * 60 * 60; // 7 days in seconds
const RATE_LIMIT_CONFIG = { max: 100, windowSeconds: 3600, keyPrefix: 'dict' };

export async function onRequest(context) {
    const { request, env } = context;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return handleOptions(['GET', 'OPTIONS']);
    }

    const url = new URL(request.url);
    const word = url.searchParams.get('q');

    if (!word) {
        return jsonResponse({ error: 'Missing query parameter "q"' }, 400);
    }

    // Rate limiting
    const clientIP = getClientIP(request);
    const rateCheck = await checkRateLimit(env.TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    const DICT_CACHE = env.DICT_CACHE;
    const cacheKey = `mdbg:${word}`;

    // Check cache first
    if (DICT_CACHE) {
        try {
            const cached = await DICT_CACHE.get(cacheKey, 'json');
            if (cached) {
                return jsonResponse(cached, 200, { 'X-Cache': 'HIT' });
            }
        } catch (e) {
            // Cache read failed, continue with fetch
        }
    }

    const targetUrl = `https://www.mdbg.net/chinese/dictionary?page=worddict&wdqt=${encodeURIComponent(word)}&wdrst=0&wdqtm=0&wdqcham=1`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        // We will use HTMLRewriter to extract data
        const entries = [];
        let currentEntry = null;
        let captureText = null;

        // HTMLRewriter handlers
        const rewriter = new HTMLRewriter()
            .on('tr.row', {
                element(el) {
                    currentEntry = { word: '', pinyin: '', definitions: [], hsk: null };
                    entries.push(currentEntry);
                }
            })
            .on('tr.row .hanzi span', {
                text(text) {
                    if (currentEntry && !currentEntry.word) {
                        if (text.text.trim()) currentEntry.word += text.text;
                    }
                }
            })
            .on('tr.row .pinyin span', {
                text(text) {
                    if (currentEntry) {
                        if (text.text.trim()) currentEntry.pinyin += text.text;
                    }
                }
            })
            .on('tr.row .defs', {
                element() { captureText = 'defs'; },
                text(text) {
                    if (currentEntry && captureText === 'defs') {
                        if (!currentEntry._rawDefs) currentEntry._rawDefs = '';
                        currentEntry._rawDefs += text.text;
                    }
                }
            })
            .on('tr.row .hsk', {
                text(text) {
                    if (currentEntry && text.text.includes('HSK')) {
                        const match = text.text.match(/HSK\s*(\d+)/);
                        if (match) currentEntry.hsk = parseInt(match[1]);
                    }
                }
            });

        // Process the response
        await rewriter.transform(response).arrayBuffer();

        // Post-process entries
        const cleanEntries = entries.map(e => {
            const defs = e._rawDefs
                ? e._rawDefs.split('/').map(d => d.trim()).filter(d => d)
                : [];

            return {
                word: e.word.trim(),
                pinyin: e.pinyin.trim(),
                definitions: defs,
                hsk: e.hsk
            };
        }).filter(e => e.word);

        // Cache successful responses
        if (DICT_CACHE && cleanEntries.length > 0) {
            // Increment rate limit only for non-cached responses
            await incrementRateLimit(env.TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);
            try {
                await DICT_CACHE.put(cacheKey, JSON.stringify(cleanEntries), { expirationTtl: CACHE_TTL });
            } catch (e) {
                // Cache write failed, continue
            }
        }

        return jsonResponse(cleanEntries, 200, { 'X-Cache': 'MISS' });

    } catch (error) {
        console.error('[MDBG] Error:', error);
        return errorResponse(error.message);
    }
}
