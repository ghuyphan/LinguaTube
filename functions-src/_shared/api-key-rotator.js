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
const COUNTER_TTL = 3600; // 1 hour for rotation counter

/**
 * Get the next available API key using round-robin rotation
 * Skips keys that are currently in cooldown (rate-limited)
 * 
 * @param {object} cache - KV namespace for state storage
 * @param {string} prefix - Prefix for cache keys (e.g., 'supadata')
 * @param {string[]} keys - Array of API keys to rotate through
 * @returns {Promise<string|null>} - Next available API key or null if none available
 */
export async function getNextApiKey(cache, prefix, keys) {
    // Filter out empty/undefined keys
    const validKeys = keys.filter(Boolean);

    if (validKeys.length === 0) return null;
    if (validKeys.length === 1) return validKeys[0];

    // Try to get available keys (not in cooldown)
    const availableKeys = [];
    for (const key of validKeys) {
        const isInCooldown = await isKeyCoolingDown(cache, prefix, key);
        if (!isInCooldown) {
            availableKeys.push(key);
        }
    }

    // If all keys are in cooldown, use the first one anyway (better than failing)
    if (availableKeys.length === 0) {
        console.log(`[${prefix}] All keys in cooldown, using first key`);
        return validKeys[0];
    }

    // Round-robin among available keys
    const counterKey = `${prefix}:keyIndex`;
    let index = 0;

    try {
        const stored = await cache?.get(counterKey);
        index = stored ? parseInt(stored, 10) : 0;

        // Increment for next call
        const nextIndex = (index + 1) % availableKeys.length;
        await cache?.put(counterKey, String(nextIndex), { expirationTtl: COUNTER_TTL });
    } catch (e) {
        console.log(`[${prefix}] Counter error:`, e.message);
    }

    return availableKeys[index % availableKeys.length];
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
    if (!cache || !key) return;

    const keyHash = hashKey(key);
    const cooldownKey = `${prefix}:cooldown:${keyHash}`;

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
 * Check if a key is currently in cooldown
 */
async function isKeyCoolingDown(cache, prefix, key) {
    if (!cache || !key) return false;

    const keyHash = hashKey(key);
    const cooldownKey = `${prefix}:cooldown:${keyHash}`;

    try {
        const value = await cache.get(cooldownKey);
        return !!value;
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
