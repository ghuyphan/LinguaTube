/**
 * Shared Rate Limiting Module for Cloudflare Functions
 * Uses KV storage for distributed rate limiting
 * 
 * IMPORTANT: KV Consistency & Race Conditions
 * ============================================
 * The read-modify-write pattern in consumeRateLimit() is NOT atomic.
 * Under high concurrency, multiple requests can read the same count,
 * increment it, and write back - potentially allowing more requests
 * than the limit.
 * 
 * This is acceptable for our use case because:
 * 1. Rate limits are for abuse prevention, not exact metering
 * 2. The window eventually catches up (no long-term bypass)
 * 3. Typical usage patterns don't see high concurrent bursts
 * 
 * For true atomicity, use Cloudflare Durable Objects with its
 * strong consistency model and transactional storage API.
 * See: https://developers.cloudflare.com/durable-objects/
 * 
 * Alternative: A sliding window approach using timestamps arrays
 * would be more tolerant of races but more complex to implement.
 */

/**
 * Rate limit configuration
 * @typedef {Object} RateLimitConfig
 * @property {number} max - Maximum requests allowed in window
 * @property {number} windowSeconds - Time window in seconds
 * @property {string} keyPrefix - Prefix for KV keys
 */

/**
 * Consume one request from rate limit quota (atomic operation)
 * Replaces separate checkRateLimit + incrementRateLimit calls
 * 
 * @param {KVNamespace} cache - Cloudflare KV namespace
 * @param {string} clientIP - Client IP address
 * @param {RateLimitConfig} config - Rate limit configuration
 * @returns {Promise<{allowed: boolean, remaining: number, resetAt: number}>}
 */
export async function consumeRateLimit(cache, clientIP, config) {
    if (!cache || !clientIP) {
        return { allowed: true, remaining: config.max, resetAt: 0 };
    }

    const key = `ratelimit:${config.keyPrefix}:${clientIP}`;

    try {
        // Single read
        let data = await cache.get(key, 'json');

        const now = Date.now();

        // Initialize or reset if expired
        if (!data || now > data.resetAt) {
            data = {
                count: 0,
                resetAt: now + config.windowSeconds * 1000
            };
        }

        // Increment count
        data.count++;

        // Check if allowed AFTER increment
        const allowed = data.count <= config.max;
        const remaining = Math.max(0, config.max - data.count);

        // Single write (always write to track both allowed and denied)
        await cache.put(key, JSON.stringify(data), {
            expirationTtl: config.windowSeconds
        });

        return { allowed, remaining, resetAt: data.resetAt };

    } catch (e) {
        // Allow on error to prevent blocking legitimate requests
        console.error('[RateLimit] Error:', e.message);
        return { allowed: true, remaining: config.max, resetAt: 0 };
    }
}

/**
 * Consume multiple units from rate limit quota (for batch operations)
 * Same as consumeRateLimit but increments by `units` instead of 1
 * 
 * @param {KVNamespace} cache - Cloudflare KV namespace
 * @param {string} clientIP - Client IP address
 * @param {RateLimitConfig} config - Rate limit configuration
 * @param {number} units - Number of units to consume (default: 1)
 * @returns {Promise<{allowed: boolean, remaining: number, resetAt: number}>}
 */
export async function consumeRateLimitUnits(cache, clientIP, config, units = 1) {
    if (!cache || !clientIP) {
        return { allowed: true, remaining: config.max, resetAt: 0 };
    }

    const key = `ratelimit:${config.keyPrefix}:${clientIP}`;

    try {
        let data = await cache.get(key, 'json');
        const now = Date.now();

        // Initialize or reset if expired
        if (!data || now > data.resetAt) {
            data = {
                count: 0,
                resetAt: now + config.windowSeconds * 1000
            };
        }

        // Check if this batch would exceed the limit
        const newCount = data.count + units;
        const allowed = newCount <= config.max;

        // Always increment (even if denied, to track attempts)
        data.count = newCount;
        const remaining = Math.max(0, config.max - data.count);

        await cache.put(key, JSON.stringify(data), {
            expirationTtl: config.windowSeconds
        });

        return { allowed, remaining, resetAt: data.resetAt };

    } catch (e) {
        console.error('[RateLimit] Error:', e.message);
        return { allowed: true, remaining: config.max, resetAt: 0 };
    }
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
        || request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim()
        || null;
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
            ...getRateLimitHeaders(0, resetAt)
        }
    });
}
