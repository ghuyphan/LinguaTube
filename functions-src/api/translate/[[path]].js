/**
 * Translation Proxy API (Cloudflare Function)
 * Proxies requests to Lingva Translate with fallback instances
 * Route: /api/translate/[[path]]
 */

import { validateAuthToken } from '../../_shared/auth.js';
import { jsonResponse, handleOptions, errorResponse } from '../../_shared/utils.js';
import {
    consumeRateLimit,
    getClientIP,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders
} from '../../_shared/rate-limiter.js';

const LINGVA_INSTANCES = [
    'https://lingva.ml',
    'https://lingva.lunar.icu',
    'https://translate.plausibility.cloud'
];

const INSTANCE_TIMEOUT_MS = 5000;

// Rate limit by texts translated, not requests
// Single endpoint counts as 1 text, batch counts as texts.length
// Shared key: 'translate-texts' so single and batch share the same quota
const RATE_LIMIT_CONFIG = { max: 60, windowSeconds: 3600, keyPrefix: 'translate-texts' };

// Handle preflight requests
export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request, env, params } = context;

    // Rate limiting (Atomic)
    const authResult = await validateAuthToken(request, env);
    const clientId = getClientIdentifier(request, authResult);
    const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, RATE_LIMIT_CONFIG);
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

    // Try each Lingva instance until one succeeds
    let lastError = null;

    for (const instance of LINGVA_INSTANCES) {
        const url = `${instance}/api/v1/${source}/${target}/${text}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                },
                signal: AbortSignal.timeout(INSTANCE_TIMEOUT_MS)
            });

            if (response.ok) {
                const data = await response.json();
                return jsonResponse(data, 200, {
                    'X-Lingva-Instance': instance,
                    ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
                });
            }

            lastError = new Error(`${instance} returned ${response.status}`);
        } catch (error) {
            lastError = error;
            // Continue to next instance
        }
    }

    // All instances failed
    console.error('[Translate] All instances failed:', lastError?.message);
    return errorResponse(`Translation failed: ${lastError?.message || 'All instances unavailable'}`);
}

