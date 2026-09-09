/**
 * API Key Rotator with failover support
 * 
 * Features:
 * - Round-robin rotation across multiple API keys
 * - Automatic failover when a key hits rate limits (429)
 * - Temporary cooldown for failed keys
 * - Graceful degradation to single key if only one is configured
 */

const COOLDOWN_TTL = 300; // 5 minutes cooldown for failed keys

// In-memory counter & cooldowns per worker isolate to avoid consuming Cloudflare KV quotas (Rule 2)
const memKeyIndices = new Map();
const memKeyCooldowns = new Map(); // cooldownKey -> expiresAt

/**
 * Get the next available API key using round-robin rotation
 * Skips keys that are currently in cooldown (rate-limited) or excluded
 * 
 * @param {object} cache - KV namespace for state storage
 * @param {string} prefix - Prefix for cache keys (e.g., 'supadata')
 * @param {string[]} keys - Array of API keys to rotate through
 * @param {string|string[]} [excludeKeys=[]] - Optional key(s) to exclude (already attempted)
 * @returns {Promise<string|null>} - Next available API key or null if none available
 */
export async function getNextApiKey(cache, prefix, keys, excludeKeys = []) {
    // Filter out empty/undefined keys
    const validKeys = keys.filter(Boolean);

    if (validKeys.length === 0) return null;

    const excluded = Array.isArray(excludeKeys) ? excludeKeys : (excludeKeys ? [excludeKeys] : []);
    const candidates = validKeys.filter(k => !excluded.includes(k));

    if (candidates.length === 0) {
        return null;
    }

    if (candidates.length === 1) {
        return candidates[0];
    }

    // Try to get available keys (not in cooldown)
    const availableKeys = [];
    for (const key of candidates) {
        const isInCooldown = await isKeyCoolingDown(cache, prefix, key);
        if (!isInCooldown) {
            availableKeys.push(key);
        }
    }

    // If all candidate keys are in cooldown, use the first un-excluded candidate as fallback
    if (availableKeys.length === 0) {
        return candidates[0];
    }

    // In-memory round-robin (Zero KV writes, preserves Rule 2 free quota)
    const currentIndex = memKeyIndices.get(prefix) || 0;
    const selectedKey = availableKeys[currentIndex % availableKeys.length];
    memKeyIndices.set(prefix, (currentIndex + 1) % availableKeys.length);

    return selectedKey;
}

/**
 * Mark an API key as rate-limited (put in cooldown)
 * 
 * @param {object} cache - KV namespace
 * @param {string} prefix - Prefix for cache keys
 * @param {string} key - The API key to mark as failed
 * @param {number} cooldownSeconds - Optional custom cooldown duration
 */
export async function markKeyRateLimited(cache, prefix, key, cooldownSeconds = COOLDOWN_TTL) {
    if (!key) return;

    const keyHash = hashKey(key);
    const cooldownKey = `${prefix}:cooldown:${keyHash}`;
    memKeyCooldowns.set(cooldownKey, Date.now() + cooldownSeconds * 1000);

    if (!cache) return;

    try {
        await cache.put(cooldownKey, Date.now().toString(), {
            expirationTtl: cooldownSeconds
        });
        console.log(`[${prefix}] Key ${keyHash} marked as rate-limited for ${cooldownSeconds}s`);
    } catch (e) {
        console.log(`[${prefix}] Failed to mark key cooldown:`, e.message);
    }
}

/**
 * Check if a key is currently in cooldown (In-memory first, zero KV reads when healthy)
 */
async function isKeyCoolingDown(cache, prefix, key) {
    if (!key) return false;

    const keyHash = hashKey(key);
    const cooldownKey = `${prefix}:cooldown:${keyHash}`;
    const now = Date.now();

    // 1. Fast in-memory check (0 KV ops)
    const memExpiry = memKeyCooldowns.get(cooldownKey);
    if (memExpiry) {
        if (now < memExpiry) {
            return true;
        }
        memKeyCooldowns.delete(cooldownKey);
    }

    // 2. If no cooldowns recorded across the isolate, healthy by default (0 KV reads)
    if (!cache || memKeyCooldowns.size === 0) {
        return false;
    }

    try {
        const value = await cache.get(cooldownKey);
        if (value) {
            memKeyCooldowns.set(cooldownKey, now + 60 * 1000);
            return true;
        }
        return false;
    } catch {
        return false;
    }
}

/**
 * Get a short hash of the key for logging (don't log full keys!)
 */
function hashKey(key) {
    if (!key) return 'unknown';
    // Use last 6 characters as identifier
    return key.slice(-6);
}

/**
 * Get statistics about key availability
 * Useful for monitoring/debugging
 * 
 * @param {object} cache - KV namespace
 * @param {string} prefix - Prefix for cache keys
 * @param {string[]} keys - Array of API keys
 * @returns {Promise<{total: number, available: number, coolingDown: number}>}
 */
export async function getKeyStats(cache, prefix, keys) {
    const validKeys = keys.filter(Boolean);
    let available = 0;
    let coolingDown = 0;

    for (const key of validKeys) {
        if (await isKeyCoolingDown(cache, prefix, key)) {
            coolingDown++;
        } else {
            available++;
        }
    }

    return {
        total: validKeys.length,
        available,
        coolingDown
    };
}
