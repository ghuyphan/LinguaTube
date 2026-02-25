/**
 * Utility for managing KV caching with stale-while-revalidate pattern
 */

/**
 * @callback FetchFunction
 * @returns {Promise<any>}
 */

export class CacheManager {
    /**
     * @param {KVNamespace} kv - The Cloudflare KV namespace binding
     * @param {Object} options - Default options
     * @param {number} [options.defaultTtl=86400] - Default time-to-live in seconds (24h)
     */
    constructor(kv, options = {}) {
        this.kv = kv;
        this.defaultTtl = options.defaultTtl || 86400; // 24 hours
        this.STALE_TTL = 24 * 60 * 60; // 24 hours stale period
    }

    /**
     * Get from cache or fetch new data, using stale-while-revalidate pattern
     * 
     * @param {ExecutionContext} context - Cloudflare execution context for waitUntil
     * @param {string} key - Cache key
     * @param {FetchFunction} fetchFn - Function returning promise resolving to data if cache miss
     * @param {Object} options - Override options
     * @param {number} [options.ttl] - Override TTL in seconds
     * @param {boolean} [options.forceRefresh=false] - Bypass cache and force a new fetch
     * @param {number} [options.staleTtl] - How long to serve stale data while revalidating
     * @returns {Promise<{data: any, cached: boolean, stale: boolean}>}
     */
    async getOrFetch(context, key, fetchFn, options = {}) {
        const {
            ttl = this.defaultTtl,
            forceRefresh = false,
            staleTtl = this.STALE_TTL
        } = options;

        if (!forceRefresh && this.kv) {
            try {
                const cachedContent = await this.kv.get(key);
                if (cachedContent) {
                    const parsed = JSON.parse(cachedContent);
                    const age = (Date.now() - parsed.timestamp) / 1000;

                    // Data is fresh
                    if (age < parsed.ttl) {
                        return { data: parsed.data, cached: true, stale: false };
                    }

                    // Data is stale but within stale-while-revalidate window
                    // Serve immediately, fetch new in background
                    if (age < parsed.ttl + staleTtl) {
                        context.waitUntil(
                            this._refreshAndSet(key, fetchFn, ttl)
                                .catch(err => console.error(`[CacheManager] Background refresh failed for ${key}:`, err))
                        );
                        return { data: parsed.data, cached: true, stale: true };
                    }

                    // Data is too old, treat as miss
                }
            } catch (error) {
                console.error(`[CacheManager] KV Read Error for ${key}:`, error);
                // Fall through to fetch
            }
        }

        // Cache miss or force refresh
        const data = await fetchFn();

        if (this.kv && data !== null && data !== undefined) {
            context.waitUntil(
                this.set(key, data, ttl)
                    .catch(err => console.error(`[CacheManager] KV Write Error for ${key}:`, err))
            );
        }

        return { data, cached: false, stale: false };
    }

    /**
     * Internally wrap fetch and set to KV
     */
    async _refreshAndSet(key, fetchFn, ttl) {
        const data = await fetchFn();
        if (data !== null && data !== undefined) {
            await this.set(key, data, ttl);
        }
    }

    /**
     * Unconditionally write data to cache
     * @param {string} key 
     * @param {any} data 
     * @param {number} [ttl] 
     */
    async set(key, data, ttl = this.defaultTtl) {
        if (!this.kv) return;

        const payload = {
            timestamp: Date.now(),
            ttl: ttl,
            data: data
        };

        await this.kv.put(key, JSON.stringify(payload), { expirationTtl: ttl + this.STALE_TTL });
    }

    /**
     * Delete item from cache
     * @param {string} key 
     */
    async delete(key) {
        if (!this.kv) return;
        try {
            await this.kv.delete(key);
        } catch (error) {
            console.error(`[CacheManager] KV Delete Error for ${key}:`, error);
        }
    }
}
