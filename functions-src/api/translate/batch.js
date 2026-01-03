/**
 * Batch Translation API (Cloudflare Function)
 * Translates multiple texts at once for efficiency
 * Route: POST /api/translate/batch
 */

import { validateAuthToken } from '../../_shared/auth.js';
import { jsonResponse, handleOptions, errorResponse } from '../../_shared/utils.js';
import {
    consumeRateLimitUnits,
    getClientIP,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders
} from '../../_shared/rate-limiter.js';
import { translateBatch } from '../../_shared/lingva.js';

const MAX_BATCH_SIZE = 20;

// Rate limit by texts translated, not requests
// Batch endpoint counts as texts.length (shared with single endpoint)
const RATE_LIMIT_CONFIG = { max: 60, windowSeconds: 3600, keyPrefix: 'translate-texts' };

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const clientIP = getClientIP(request);
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

        // Rate limit by number of texts (not requests)
        const authResult = await validateAuthToken(request, env);
        const clientId = getClientIdentifier(request, authResult);
        const rateCheck = await consumeRateLimitUnits(env.TRANSCRIPT_CACHE, clientId, RATE_LIMIT_CONFIG, texts.length);
        if (!rateCheck.allowed) {
            return rateLimitResponse(rateCheck.resetAt);
        }

        // Translate all texts using shared module
        const translations = await translateBatch(texts, source, target);

        return jsonResponse({ translations }, 200, getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt));

    } catch (error) {
        console.error('[Translate Batch] Error:', error);
        return errorResponse(error.message);
    }
}


