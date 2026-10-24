/** Approximate general abuse quotas. KV is not financial or globally strict metering authority. */

/**
 * Rate limit configuration
 * @typedef {Object} RateLimitConfig
 * @property {number} max - Maximum requests allowed in window
 * @property {number} windowSeconds - Time window in seconds
 * @property {string} keyPrefix - Prefix for KV keys
 */

/**
 * Consume one request from rate limit quota (approximate quota)
 * Replaces separate checkRateLimit + incrementRateLimit calls
 * 
 * @param {KVNamespace} cache - Cloudflare KV namespace
 * @param {string} clientIP - Client IP address
 * @param {RateLimitConfig} config - Rate limit configuration
 * @returns {Promise<{allowed: boolean, remaining: number, resetAt: number}>}
 */
// In-memory rate limiting map across warm Worker isolate requests
// Prevents burning daily Cloudflare KV write quota (1,000 writes/day free limit)
const memRateLimits = new Map();
const initializing = new Map();

export const TRANSLATION_RATE_LIMIT = {
    max: { anonymous: 3000, free: 8000, pro: 35000, premium: 100000 },
    windowSeconds: 3600, keyPrefix: 'translate-texts'
};
const MAX_MEM_ENTRIES = 1000;
const KV_SYNC_SAMPLE_RATE = 15; // Sync every 15 units when client is at or above 50% quota

function cleanMemoryCache(now) {
    if (memRateLimits.size > MAX_MEM_ENTRIES) {
        for (const [k, v] of memRateLimits.entries()) {
            if (now > v.resetAt) {
                memRateLimits.delete(k);
            }
        }
        if (memRateLimits.size > MAX_MEM_ENTRIES) {
            let count = 0;
            for (const k of memRateLimits.keys()) {
                memRateLimits.delete(k);
                if (++count > 200) break;
            }
        }
    }
}


/**
 * Consume multiple units from rate limit quota (for batch operations)
 * Uses in-memory caching + throttled KV persistence to preserve free tier quota
 * 
 * @param {KVNamespace} cache - Cloudflare KV namespace
 * @param {string} clientIP - Client IP address
 * @param {RateLimitConfig} config - Rate limit configuration
 * @param {number} units - Number of units to consume (default: 1)
 * @param {Object} [context=null] - Execution context (e.g. Worker Event/ExecutionContext for waitUntil)
 * @returns {Promise<{allowed: boolean, remaining: number, resetAt: number}>}
 */
export async function consumeRateLimitUnits(cache, clientIP, config, units = 1, context = null) {
    if (!Number.isSafeInteger(units) || units < 0) throw new Error('Invalid quota units');
    if (!clientIP || units === 0) {
        return { allowed: true, remaining: config.max, resetAt: 0 };
    }

    const key = `ratelimit:${config.keyPrefix}:${clientIP}`;
    const now = Date.now();
    cleanMemoryCache(now);

    // 1. In-memory check (0ms, preserves KV read quota)
    let mem = memRateLimits.get(key);
    if (!mem || now >= mem.resetAt) {
        let pending = initializing.get(key);
        if (!pending) {
            pending = (async () => {
                let count = 0, resetAt = now + config.windowSeconds * 1000;
                try {
                    const stored = await cache?.get(key, 'json');
                    if (stored && now < stored.resetAt && Number.isFinite(stored.count)) {
                        count = stored.count; resetAt = stored.resetAt;
                    }
                } catch { /* General abuse quotas remain approximate if KV is unavailable. */ }
                const entry = { count, resetAt, lastKvSync: now, kvKnownCount: count, syncing: null };
                memRateLimits.set(key, entry);
                return entry;
            })().finally(() => initializing.delete(key));
            initializing.set(key, pending);
        }
        mem = await pending;
    }

    // 2. Increment in memory
    mem.count += units;
    const remaining = Math.max(0, config.max - mem.count);
    const allowed = mem.count <= config.max;

    // 3. Throttled KV sync (Rule 2: Protect free tier KV write quota of 1,000/day)
    const justBreached = !allowed && (mem.count - units <= config.max);
    const blockedPeriodicSync = !allowed && (now - mem.lastKvSync >= 60 * 1000);
    const approachingLimit = allowed && mem.count >= config.max * 0.8 && (now - mem.lastKvSync >= 30 * 1000);
    const midQuotaReached = allowed && mem.count >= config.max * 0.5;
    const unitThresholdReached = (mem.count - mem.kvKnownCount) >= KV_SYNC_SAMPLE_RATE;

    const shouldSyncKv = cache && (mem.persistFailed || justBreached || blockedPeriodicSync || approachingLimit || (midQuotaReached && unitThresholdReached));

    if (shouldSyncKv && !mem.syncing) {
        const persistedCount = mem.count;
        const putPromise = Promise.resolve().then(() => cache.put(key, JSON.stringify({ count: persistedCount, resetAt: mem.resetAt }), {
            expirationTtl: Math.max(60, Math.ceil((mem.resetAt - now) / 1000))
        })).then(() => {
            mem.lastKvSync = Date.now();
            mem.kvKnownCount = persistedCount;
            mem.persistFailed = false;
        }).catch(() => {
            mem.persistFailed = true;
            console.warn('[RateLimit] KV persistence deferred');
        }).finally(() => { mem.syncing = null; });
        mem.syncing = putPromise;
        if (context?.waitUntil) context.waitUntil(putPromise);
        else await putPromise;
    }

    return { allowed, remaining, resetAt: mem.resetAt };
}

/**
 * Consume one request from rate limit quota (approximate quota with in-memory fast-path)
 * 
 * @param {KVNamespace} cache - Cloudflare KV namespace
 * @param {string} clientIP - Client IP address
 * @param {RateLimitConfig} config - Rate limit configuration
 * @param {Object} [context=null] - Execution context (e.g. Worker Event/ExecutionContext for waitUntil)
 * @returns {Promise<{allowed: boolean, remaining: number, resetAt: number}>}
 */
export async function consumeRateLimit(cache, clientIP, config, context = null) {
    return consumeRateLimitUnits(cache, clientIP, config, 1, context);
}

// Deprecated functions removed - use consumeRateLimit() for all rate limiting

/**
 * Get standard rate limit headers
 */
export function getRateLimitHeaders(remaining, resetAt) {
    return {
        'X-RateLimit-Remaining': String(remaining),
        'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
        'Retry-After': String(Math.max(0, Math.ceil((resetAt - Date.now()) / 1000)))
    };
}

/**
 * Get rate limit config based on user subscription tier
 * Supports tiered rate limits where max is an object with tier keys
 * 
 * @param {Object} baseConfig - Rate limit config with max as object of tier limits
 * @param {string|null} tier - User subscription tier ('free', 'pro', 'premium', or null for anonymous)
 * @returns {RateLimitConfig} Config with max as a number for the given tier
 */
export function getTieredConfig(baseConfig, tier) {
    // If max is already a number, return as-is (backwards compatible)
    if (typeof baseConfig.max === 'number') {
        return baseConfig;
    }

    // Get tier-specific limit, fallback to anonymous, then to 10
    const tierMax = baseConfig.max[tier] || baseConfig.max.anonymous || 10;
    return {
        ...baseConfig,
        max: tierMax
    };
}

/**
 * Get client IP from request headers
 */
export function getClientIP(request) {
    return request.headers.get('CF-Connecting-IP')
        || (request.headers.get('X-Forwarded-For') && !request.headers.get('CF-Ray')
            ? request.headers.get('X-Forwarded-For').split(',')[0]?.trim()
            : null)
        || null;
}

/**
 * Get client identifier for rate limiting
 * Uses user ID when authenticated (separate bucket per user),
 * falls back to IP for anonymous users.
 * 
 * @param {Request} request - The incoming request
 * @param {Object|null} authResult - Result from validateAuthToken, or null
 * @returns {string} - User ID prefixed identifier or IP address
 */
export function getClientIdentifier(request, authResult = null) {
    if (authResult?.valid && authResult?.userId) {
        return `user:${authResult.userId}`;
    }
    return getClientIP(request) || 'unknown';
}

/**
 * Create rate limit exceeded response
 */
export function rateLimitResponse(resetAt) {
    const retryAfter = Math.max(0, Math.ceil((resetAt - Date.now()) / 1000));
    return new Response(JSON.stringify({
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter
    }), {
        status: 429,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            ...getRateLimitHeaders(0, resetAt)
        }
    });
}
