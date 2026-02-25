/**
 * Translation Proxy API (Cloudflare Function)
 * Proxies requests to Lingva Translate with fallback instances
 * Route: /api/translate/[[path]]
 */

import { validateAuthToken, hasPremiumAccess } from '../../middlewares/auth.js';
import { jsonResponse, handleOptions, errorResponse } from '../../utils/utils.js';
import {
    consumeRateLimit,
    getClientIP,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders,
    getTieredConfig
} from '../../middlewares/rate-limiter.js';
import { translateText } from '../../providers/lingva.js';

// Rate limit by texts translated, not requests
// Single endpoint counts as 1 text, batch counts as texts.length
// Shared key: 'translate-texts' so single and batch share the same quota
const RATE_LIMIT_CONFIG = {
    max: { anonymous: 2000, free: 5000, pro: 25000, premium: 100000 },
    windowSeconds: 3600,
    keyPrefix: 'translate-texts'
};

// Handle preflight requests
export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request, env, params } = context;

    // Rate limiting (Atomic)
    const authResult = await validateAuthToken(request, env);
    const tier = authResult.valid
        ? (hasPremiumAccess(authResult.user) ? 'premium' : authResult.user.subscriptionTier || 'free')
        : 'anonymous';

    const rateLimitConfig = getTieredConfig(RATE_LIMIT_CONFIG, tier);
    const clientId = getClientIdentifier(request, authResult);
    const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, rateLimitConfig);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    const pathSegments = params.path; // e.g., ['en', 'vi', 'hello']

    if (!pathSegments || pathSegments.length < 3) {
        return jsonResponse({ error: 'Invalid path. Expected: /api/translate/{source}/{target}/{text}' }, 400);
    }

    const source = pathSegments[0];
    const target = pathSegments[1];
    const text = pathSegments.slice(2).join('/'); // Rejoin text that might contain slashes

    if (!source || !target || !text) {
        return jsonResponse({ error: 'Missing source, target, or text' }, 400);
    }

    try {
        const translation = await translateText(text, source, target);

        if (translation !== null) {
            return jsonResponse({ translation }, 200, {
                ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
            });
        }
    } catch (error) {
        console.error('[Translate] Single translate error:', error);
    }

    return errorResponse('Translation failed: All instances unavailable or rate limited');
}

