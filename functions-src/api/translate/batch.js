/**
 * Batch Translation API (Cloudflare Function)
 * Translates multiple texts at once for efficiency
 * Route: POST /api/translate/batch
 */

import { jsonResponse, handleOptions, errorResponse } from '../../_shared/utils.js';
import {
    consumeRateLimit,
    getClientIP,
    rateLimitResponse,
    getRateLimitHeaders
} from '../../_shared/rate-limiter.js';
import { translateBatch } from '../../_shared/lingva.js';

const MAX_BATCH_SIZE = 20;
const RATE_LIMIT_CONFIG = { max: 60, windowSeconds: 3600, keyPrefix: 'translate' };

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;

    // Rate limiting (Atomic)
    const clientIP = getClientIP(request);
    const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);
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

        // Translate all texts using shared module
        const translations = await translateBatch(texts, source, target);

        return jsonResponse({ translations }, 200, getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt));

    } catch (error) {
        console.error('[Translate Batch] Error:', error);
        return errorResponse(error.message);
    }
}


