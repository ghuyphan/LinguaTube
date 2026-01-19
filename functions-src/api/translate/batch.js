/**
 * Batch Translation API (Cloudflare Function)
 * Translates multiple texts at once for efficiency
 * Route: POST /api/translate/batch
 */

import { jsonResponse, handleOptions, errorResponse, validateBody } from '../../_shared/utils.js';
import {
    consumeRateLimitUnits,
    getClientIP,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders,
    getTieredConfig
} from '../../_shared/rate-limiter.js';
import { translateBatch } from '../../_shared/lingva.js';
import { validateAuthToken, hasPremiumAccess } from '../../_shared/auth.js';

const MAX_BATCH_SIZE = 20;

// Rate limit by texts translated. Increased limits to support lazy subtitle loading.
// Average video = 200-500 lines.
// Anonymous: ~1 short video
// Free: ~3-4 videos
// Pro: Heavy usage
const RATE_LIMIT_CONFIG = {
    max: { anonymous: 500, free: 1000, pro: 4000, premium: 10000 },
    windowSeconds: 3600,
    keyPrefix: 'translate-texts'
};

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;
    try {
        const body = await request.json();

        // Schema-based validation for security
        const validation = validateBody(body, {
            texts: { type: 'array', required: true, maxLength: MAX_BATCH_SIZE },
            source: { type: 'string', required: true, maxLength: 5 },
            target: { type: 'string', required: true, maxLength: 5 }
        });
        if (!validation.valid) {
            return jsonResponse({ error: 'Invalid request', details: validation.errors }, 400);
        }

        const { texts, source, target } = body;

        if (texts.length > MAX_BATCH_SIZE) {
            return jsonResponse({ error: `Max batch size is ${MAX_BATCH_SIZE}` }, 400);
        }

        // Rate limit by number of texts
        const authResult = await validateAuthToken(request, env);
        const tier = authResult.valid
            ? (hasPremiumAccess(authResult.user) ? 'premium' : authResult.user.subscriptionTier || 'free')
            : 'anonymous';

        const rateLimitConfig = getTieredConfig(RATE_LIMIT_CONFIG, tier);
        const clientId = getClientIdentifier(request, authResult);

        const rateCheck = await consumeRateLimitUnits(env.TRANSCRIPT_CACHE, clientId, rateLimitConfig, texts.length);
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


