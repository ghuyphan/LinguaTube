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

const LINGVA_INSTANCES = [
    'https://lingva.ml',
    'https://lingva.lunar.icu',
    'https://translate.plausibility.cloud'
];

const INSTANCE_TIMEOUT_MS = 5000;
const MAX_BATCH_SIZE = 20;
const RATE_LIMIT_CONFIG = { max: 60, windowSeconds: 3600, keyPrefix: 'translate' };

// In-memory health tracking for instances (per worker instance)
// Tracks failure count - higher count = less preferred
const instanceHealth = new Map();
const HEALTH_RESET_TIME = 5 * 60 * 1000; // Reset health after 5 minutes

/**
 * Get instances sorted by health (healthy first)
 */
function getSortedInstances() {
    const now = Date.now();

    return [...LINGVA_INSTANCES].sort((a, b) => {
        const healthA = instanceHealth.get(a) || { failures: 0, lastFailure: 0 };
        const healthB = instanceHealth.get(b) || { failures: 0, lastFailure: 0 };

        // Reset health if enough time has passed
        const failuresA = (now - healthA.lastFailure > HEALTH_RESET_TIME) ? 0 : healthA.failures;
        const failuresB = (now - healthB.lastFailure > HEALTH_RESET_TIME) ? 0 : healthB.failures;

        return failuresA - failuresB;
    });
}

/**
 * Record instance failure
 */
function recordFailure(instance) {
    const current = instanceHealth.get(instance) || { failures: 0, lastFailure: 0 };
    instanceHealth.set(instance, {
        failures: current.failures + 1,
        lastFailure: Date.now()
    });
}

/**
 * Record instance success (reset health)
 */
function recordSuccess(instance) {
    instanceHealth.delete(instance);
}

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

        // Translate all texts in parallel
        const translations = await Promise.all(
            texts.map(text => translateSingle(text, source, target))
        );

        return jsonResponse({ translations }, 200, getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt));

    } catch (error) {
        console.error('[Translate Batch] Error:', error);
        return errorResponse(error.message);
    }
}

/**
 * Translate a single text, trying each Lingva instance (sorted by health)
 */
async function translateSingle(text, source, target) {
    if (!text?.trim()) return '';

    // Try instances in health order
    for (const instance of getSortedInstances()) {
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
                recordSuccess(instance);
                return data.translation || '';
            } else {
                recordFailure(instance);
            }
        } catch {
            recordFailure(instance);
            // Try next instance
        }
    }

    return null; // All instances failed
}

