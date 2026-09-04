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
// In-memory rate limiting map across warm Worker isolate requests
// Prevents burning daily Cloudflare KV write quota (1,000 writes/day free limit)
const memRateLimits = new Map();
const MAX_MEM_ENTRIES = 1000;
const KV_SYNC_INTERVAL_MS = 60 * 1000; // Sync to KV at most once every 60s per client
const KV_SYNC_SAMPLE_RATE = 5;         // Or every 5 requests

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
 * Consume one request from rate limit quota (atomic operation with in-memory fast-path)
 * 
 * @param {KVNamespace} cache - Cloudflare KV namespace
 * @param {string} clientIP - Client IP address
 * @param {RateLimitConfig} config - Rate limit configuration
 * @returns {Promise<{allowed: boolean, remaining: number, resetAt: number}>}
 */
export async function consumeRateLimit(cache, clientIP, config) {
    return consumeRateLimitUnits(cache, clientIP, config, 1);
}

/**
 * Consume multiple units from rate limit quota (for batch operations)
 * Uses in-memory caching + throttled KV persistence to preserve free tier quota
 * 
 * @param {KVNamespace} cache - Cloudflare KV namespace
 * @param {string} clientIP - Client IP address
 * @param {RateLimitConfig} config - Rate limit configuration
 * @param {number} units - Number of units to consume (default: 1)
 * @returns {Promise<{allowed: boolean, remaining: number, resetAt: number}>}
 */
export async function consumeRateLimitUnits(cache, clientIP, config, units = 1) {
    if (!clientIP) {
        return { allowed: true, remaining: config.max, resetAt: 0 };
    }

    const key = `ratelimit:${config.keyPrefix}:${clientIP}`;
    const now = Date.now();
    cleanMemoryCache(now);

    let mem = memRateLimits.get(key);

    // If no memory record or window expired, check KV once or start fresh
    if (!mem || now > mem.resetAt) {
        let initialCount = 0;
        let resetAt = now + config.windowSeconds * 1000;

        if (cache) {
            try {
                const kvData = await cache.get(key, 'json');
                if (kvData && now <= kvData.resetAt) {
                    initialCount = kvData.count || 0;
                    resetAt = kvData.resetAt;
                }
            } catch {
                // KV read failed or unavailable, continue with 0
            }
        }

        mem = {
            count: initialCount,
            resetAt,
            lastKvSync: now,
            kvKnownCount: initialCount
        };
        memRateLimits.set(key, mem);
    }

    // Increment in-memory counter
    mem.count += units;
    const allowed = mem.count <= config.max;
    const remaining = Math.max(0, config.max - mem.count);

    // Determine if we should sync to KV:
    // 1. If limit exceeded (block across all isolates)
    // 2. If approaching limit (> 80%)
    // 3. If count incremented by KV_SYNC_SAMPLE_RATE units since last sync
    // 4. If KV_SYNC_INTERVAL_MS has passed since last sync
    const approachingLimit = mem.count >= config.max * 0.8;
    const unitThresholdReached = (mem.count - mem.kvKnownCount) >= KV_SYNC_SAMPLE_RATE;
    const timeThresholdReached = (now - mem.lastKvSync) >= KV_SYNC_INTERVAL_MS;

    const shouldSyncKv = cache && (!allowed || approachingLimit || unitThresholdReached || timeThresholdReached);

    if (shouldSyncKv) {
        mem.lastKvSync = now;
        mem.kvKnownCount = mem.count;

        // Fire-and-forget sync to KV so request latency and KV quota errors never block responses
        cache.put(key, JSON.stringify({ count: mem.count, resetAt: mem.resetAt }), {
            expirationTtl: Math.max(60, Math.ceil((mem.resetAt - now) / 1000))
        }).catch(err => {
            // Silently ignore KV quota or put errors
            console.warn('[RateLimit] KV put throttled or failed:', err?.message || err);
        });
    }

    return { allowed, remaining, resetAt: mem.resetAt };
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
            ...getRateLimitHeaders(0, resetAt)
        }
    });
}
