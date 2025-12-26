/**
 * Shared Rate Limiting Module for Cloudflare Functions
 * Uses KV storage for distributed rate limiting with sliding window
 */

/**
 * Rate limit configuration
 * @typedef {Object} RateLimitConfig
 * @property {number} max - Maximum requests allowed in window
 * @property {number} windowSeconds - Time window in seconds
 * @property {string} keyPrefix - Prefix for KV keys (e.g., 'innertube', 'translate')
 */

/**
 * Check if request is within rate limit
 * @param {KVNamespace} cache - Cloudflare KV namespace
 * @param {string} clientIP - Client IP address
 * @param {RateLimitConfig} config - Rate limit configuration
 * @returns {Promise<{allowed: boolean, remaining: number, resetAt: number}>}
 */
export async function checkRateLimit(cache, clientIP, config) {
    if (!cache || !clientIP) {
        return { allowed: true, remaining: config.max, resetAt: 0 };
    }

    const key = `ratelimit:${config.keyPrefix}:${clientIP}`;

    try {
        const data = await cache.get(key, 'json');

        if (!data) {
            return {
                allowed: true,
                remaining: config.max - 1,
                resetAt: Date.now() + config.windowSeconds * 1000
            };
        }

        // Check if window expired
        if (Date.now() > data.resetAt) {
            return {
                allowed: true,
                remaining: config.max - 1,
                resetAt: Date.now() + config.windowSeconds * 1000
            };
        }

        const remaining = config.max - data.count;
        return {
            allowed: remaining > 0,
            remaining: Math.max(0, remaining - 1),
            resetAt: data.resetAt
        };
    } catch (e) {
        // Allow on error to prevent blocking legitimate requests
        console.error('[RateLimit] Check error:', e.message);
        return { allowed: true, remaining: config.max, resetAt: 0 };
    }
}

/**
 * Increment rate limit counter
 * @param {KVNamespace} cache - Cloudflare KV namespace
 * @param {string} clientIP - Client IP address
 * @param {RateLimitConfig} config - Rate limit configuration
 */
export async function incrementRateLimit(cache, clientIP, config) {
    if (!cache || !clientIP) return;

    const key = `ratelimit:${config.keyPrefix}:${clientIP}`;

    try {
        const data = await cache.get(key, 'json') || {
            count: 0,
            resetAt: Date.now() + config.windowSeconds * 1000
        };

        // Reset if window expired
        if (Date.now() > data.resetAt) {
            data.count = 1;
            data.resetAt = Date.now() + config.windowSeconds * 1000;
        } else {
            data.count++;
        }

        await cache.put(key, JSON.stringify(data), {
            expirationTtl: config.windowSeconds
        });
    } catch (e) {
        console.error('[RateLimit] Increment error:', e.message);
    }
}

/**
 * Get standard rate limit headers
 * @param {number} remaining - Remaining requests
 * @param {number} resetAt - Reset timestamp
 * @returns {Object} Headers object
 */
export function getRateLimitHeaders(remaining, resetAt) {
    return {
        'X-RateLimit-Remaining': String(remaining),
        'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
        'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000))
    };
}

/**
 * Get client IP from request headers
 * @param {Request} request - Cloudflare request object
 * @returns {string|null}
 */
export function getClientIP(request) {
    return request.headers.get('CF-Connecting-IP')
        || request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim()
        || null;
}

/**
 * Create rate limit exceeded response
 * @param {number} resetAt - Reset timestamp
 * @returns {Response}
 */
export function rateLimitResponse(resetAt) {
    const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
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
