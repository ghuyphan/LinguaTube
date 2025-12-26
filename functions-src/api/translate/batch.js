/**
 * Batch Translation API (Cloudflare Function)
 * Translates multiple texts at once for efficiency
 * Route: POST /api/translate/batch
 */

import { jsonResponse, handleOptions, errorResponse } from '../../_shared/utils.js';
import { checkRateLimit, incrementRateLimit, getClientIP, rateLimitResponse } from '../../_shared/rate-limiter.js';

const LINGVA_INSTANCES = [
    'https://lingva.ml',
    'https://lingva.lunar.icu',
    'https://translate.plausibility.cloud'
];

const INSTANCE_TIMEOUT_MS = 5000;
const MAX_BATCH_SIZE = 20;
const RATE_LIMIT_CONFIG = { max: 60, windowSeconds: 3600, keyPrefix: 'translate' };

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;

    // Rate limiting
    const clientIP = getClientIP(request);
    const rateCheck = await checkRateLimit(env.TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    try {
        const body = await request.json();
        const { texts, source, target } = body;

        if (!Array.isArray(texts) || texts.length === 0) {
            return jsonResponse({ error: 'Missing or invalid "texts" array' }, 400);
        }

        if (!source || !target) {
            return jsonResponse({ error: 'Missing "source" or "target" language' }, 400);
        }

        if (texts.length > MAX_BATCH_SIZE) {
            return jsonResponse({ error: `Max batch size is ${MAX_BATCH_SIZE}` }, 400);
        }

        // Translate all texts in parallel
        const translations = await Promise.all(
            texts.map(text => translateSingle(text, source, target))
        );

        await incrementRateLimit(env.TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);
        return jsonResponse({ translations });

    } catch (error) {
        console.error('[Translate Batch] Error:', error);
        return errorResponse(error.message);
    }
}

/**
 * Translate a single text, trying each Lingva instance
 */
async function translateSingle(text, source, target) {
    if (!text?.trim()) return '';

    for (const instance of LINGVA_INSTANCES) {
        const url = `${instance}/api/v1/${source}/${target}/${encodeURIComponent(text)}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                },
                signal: AbortSignal.timeout(INSTANCE_TIMEOUT_MS)
            });

            if (response.ok) {
                const data = await response.json();
                return data.translation || '';
            }
        } catch {
            // Try next instance
        }
    }

    return null; // All instances failed
}
