/**
 * Batch Tokenization API (Cloudflare Function)
 * Tokenizes multiple texts at once and caches as single entry per video
 * - Reduces KV writes from ~200 to 1 per video
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../../_shared/utils.js';
import { tokenize } from '../../_shared/tokenizer.js';

const SUPPORTED_LANGUAGES = new Set(['ja', 'ko', 'zh']);

export async function onRequest(context) {
    const { request, params, env } = context;
    const lang = params.lang;
    const TOKEN_CACHE = env.TRANSCRIPT_CACHE;

    if (request.method === 'OPTIONS') {
        return handleOptions(['POST', 'OPTIONS']);
    }

    if (!SUPPORTED_LANGUAGES.has(lang)) {
        return jsonResponse(
            { error: `Unsupported language: ${lang}. Supported: ja, ko, zh` },
            400
        );
    }

    if (request.method !== 'POST') {
        return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    try {
        const body = await request.json();
        const { texts, videoId } = body;

        if (!Array.isArray(texts) || texts.length === 0) {
            return jsonResponse({ error: 'Missing or invalid "texts" array' }, 400);
        }

        if (!videoId || !validateVideoId(videoId)) {
            return jsonResponse({ error: 'Missing or invalid "videoId"' }, 400);
        }

        // Check cache first - ONE read for entire video
        const cacheKey = `tokens:v3:${lang}:${videoId}`;
        if (TOKEN_CACHE) {
            try {
                const cached = await TOKEN_CACHE.get(cacheKey, 'json');
                if (cached) {
                    console.log(`[Tokenize Batch] Cache hit for ${videoId}`);
                    return jsonResponse(cached);
                }
            } catch (e) {
                // Cache read failed, continue
            }
        }

        console.log(`[Tokenize Batch] Tokenizing ${texts.length} texts for ${videoId} (${lang})`);

        // Tokenize all texts using shared module
        const allTokens = await Promise.all(
            texts.map(text => tokenize(text, lang))
        );

        const result = { tokens: allTokens };

        // Cache as ONE write for entire video (30 day TTL)
        if (TOKEN_CACHE) {
            try {
                await TOKEN_CACHE.put(cacheKey, JSON.stringify(result), {
                    expirationTtl: 60 * 60 * 24 * 30
                });
                console.log(`[Tokenize Batch] Cached tokens for ${videoId}`);
            } catch (e) {
                console.error('[Tokenize Batch] Cache write failed:', e.message);
            }
        }

        return jsonResponse(result);

    } catch (error) {
        console.error(`[Tokenize Batch ${lang.toUpperCase()}] Error:`, error);
        return errorResponse(error.message);
    }
}
