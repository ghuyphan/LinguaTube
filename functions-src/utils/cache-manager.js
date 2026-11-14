/**
 * Utility for managing KV caching with stale-while-revalidate pattern
 */

/**
 * @callback FetchFunction
 * @returns {Promise<any>}
 */

// Module-level warm in-memory cache and in-flight coalescing map (Rule 2: In-Memory First)
const memCache = new Map();
const inFlightFetches = new Map();
const MAX_MEM_CACHE_ENTRIES = 500;

function setMemCache(key, data, ttl, timestamp = Date.now()) {
    if (memCache.size >= MAX_MEM_CACHE_ENTRIES) {
        const oldest = memCache.keys().next().value;
        if (oldest) memCache.delete(oldest);
    }
    memCache.set(key, { data, timestamp, ttl });
}

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
        this.skipKvWrite = Boolean(options.skipKvWrite);
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
     * @param {boolean} [options.skipKvWrite=false] - Skip writing to KV to preserve write quota
     * @returns {Promise<{data: any, cached: boolean, stale: boolean}>}
     */
    async getOrFetch(context, key, fetchFn, options = {}) {
        const {
            ttl = this.defaultTtl,
            forceRefresh = false,
            staleTtl = this.STALE_TTL,
            skipKvWrite = this.skipKvWrite,
            ttlForData = () => ttl
        } = options;

        // 1. Fast-path: Check warm in-memory cache (0 KV ops, < 0.1ms)
        if (!forceRefresh) {
            const memHit = memCache.get(key);
            if (memHit) {
                const age = (Date.now() - memHit.timestamp) / 1000;
                if (age < memHit.ttl) {
                    return { data: memHit.data, cached: true, stale: false };
                }
            }
        }

        if (!forceRefresh && this.kv) {
            try {
                const cachedContent = await this.kv.get(key);
                if (cachedContent) {
                    const parsed = JSON.parse(cachedContent);
                    parsed.ttl = Math.min(parsed.ttl, ttlForData(parsed.data));
                    const age = (Date.now() - parsed.timestamp) / 1000;

                    // Populate memory cache for subsequent requests in this isolate
                    setMemCache(key, parsed.data, parsed.ttl, parsed.timestamp);

                    // Data is fresh
                    if (age < parsed.ttl) {
                        return { data: parsed.data, cached: true, stale: false };
                    }

                    // Data is stale but within stale-while-revalidate window
                    // Serve immediately, fetch new in background
                    if (age < parsed.ttl + staleTtl) {
                        const refreshPromise = this._refreshAndSet(key, fetchFn, ttl, skipKvWrite, ttlForData)
                            .catch(err => console.error(`[CacheManager] Background refresh failed for ${key}:`, err));
                        if (context?.waitUntil) {
                            context.waitUntil(refreshPromise);
                        }
                        return { data: parsed.data, cached: true, stale: true };
                    }

                    // Data is too old, treat as miss
                }
            } catch (error) {
                console.error(`[CacheManager] KV Read Error for ${key}:`, error);
                // Fall through to fetch
            }
        }

        // Cache miss or force refresh (coalesce concurrent fetches per key)
        const coalesceKey = forceRefresh ? `refresh:${key}` : key;
        const data = await this._coalesceFetch(coalesceKey, async () => {
            const fetched = await fetchFn();
            const effectiveTtl = fetched == null ? ttl : ttlForData(fetched);

            if (this.kv && !skipKvWrite && fetched !== null && fetched !== undefined) {
                const putPromise = this.set(key, fetched, effectiveTtl)
                    .catch(err => console.error(`[CacheManager] KV Write Error for ${key}:`, err));
                if (context?.waitUntil) {
                    context.waitUntil(putPromise);
                } else {
                    await putPromise;
                }
            } else if (fetched !== null && fetched !== undefined) {
                setMemCache(key, fetched, effectiveTtl);
            }

            return fetched;
        });

        return { data, cached: false, stale: false };
    }

    /**
     * Coalesce concurrent async work for identical keys within the isolate
     */
    _coalesceFetch(key, fn) {
        if (inFlightFetches.has(key)) return inFlightFetches.get(key);
        const promise = Promise.resolve().then(fn).finally(() => {
            if (inFlightFetches.get(key) === promise) inFlightFetches.delete(key);
        });
        inFlightFetches.set(key, promise);
        return promise;
    }

    /**
     * Internally wrap fetch and set to KV
     */
    async _refreshAndSet(key, fetchFn, ttl, skipKvWrite = this.skipKvWrite, ttlForData = () => ttl) {
        return this._coalesceFetch(`swr:${key}`, async () => {
            const data = await fetchFn();
            const effectiveTtl = data == null ? ttl : ttlForData(data);
            if (data !== null && data !== undefined) {
                if (!skipKvWrite) {
                    await this.set(key, data, effectiveTtl);
                } else {
                    setMemCache(key, data, effectiveTtl);
                }
            }
        });
    }

    /**
     * Unconditionally write data to cache
     * @param {string} key 
     * @param {any} data 
     * @param {number} [ttl] 
     */
    async set(key, data, ttl = this.defaultTtl) {
        setMemCache(key, data, ttl);

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
        memCache.delete(key);
        if (!this.kv) return;
        try {
            await this.kv.delete(key);
        } catch (error) {
            console.error(`[CacheManager] KV Delete Error for ${key}:`, error);
        }
    }
}

/**
 * Standardized in-memory LRU cache with optional TTL for warm Worker isolates
 */
export class SimpleLRUCache {
    /**
     * @param {number} maxSize - Maximum entries before evicting least-recently used
     * @param {number} [ttlMs=0] - Optional TTL in milliseconds (0 = no expiry)
     */
    constructor(maxSize = 500, ttlMs = 0) {
        this.maxSize = maxSize;
        this.ttlMs = ttlMs;
        this.map = new Map();
    }

    get(key) {
        const item = this.map.get(key);
        if (!item) return undefined;
        if (this.ttlMs > 0 && Date.now() - item.time > this.ttlMs) {
            this.map.delete(key);
            return undefined;
        }
        this.map.delete(key);
        this.map.set(key, item);
        return item.value;
    }

    set(key, value) {
        if (this.map.has(key)) {
            this.map.delete(key);
        } else if (this.map.size >= this.maxSize) {
            const first = this.map.keys().next().value;
            if (first !== undefined) this.map.delete(first);
        }
        this.map.set(key, { value, time: Date.now() });
        return this;
    }

    has(key) {
        return this.get(key) !== undefined;
    }

    delete(key) {
        return this.map.delete(key);
    }

    clear() {
        this.map.clear();
    }

    get size() {
        return this.map.size;
    }
}
