/**
 * Service for managing Diamond Credit System with Multi-Tier Support
 */

export const TIER_CONFIGS = {
    anonymous: {
        tier: 'anonymous',
        maxDiamonds: 3,
        regenIntervalMinutes: 20,
        regenIntervalMs: 20 * 60 * 1000,
        regenAmount: 1,
        maxVideoDurationSec: 600, // 10 minutes
    },
    free: {
        tier: 'free',
        maxDiamonds: 5,
        regenIntervalMinutes: 15,
        regenIntervalMs: 15 * 60 * 1000,
        regenAmount: 1,
        maxVideoDurationSec: 900, // 15 minutes
    },
    pro: {
        tier: 'pro',
        maxDiamonds: 20,
        regenIntervalMinutes: 5,
        regenIntervalMs: 5 * 60 * 1000,
        regenAmount: 1,
        maxVideoDurationSec: 1800, // 30 minutes
    },
    premium: {
        tier: 'premium',
        maxDiamonds: 20,
        regenIntervalMinutes: 5,
        regenIntervalMs: 5 * 60 * 1000,
        regenAmount: 1,
        maxVideoDurationSec: 1800, // 30 minutes
    }
};

export const DIAMOND_CONFIG = TIER_CONFIGS.anonymous;

export function getTierDiamondConfig(tier = 'free') {
    return TIER_CONFIGS[tier] || TIER_CONFIGS.free;
}

// In-memory cache across warm Worker isolates to protect KV write quotas (Rule 2)
const memDiamondsCache = new Map();
const MEM_DIAMONDS_TTL_MS = 60 * 1000; // 60s warm memory cache

// In-memory cache for PocketBase admin auth token
let cachedAdminToken = null;
let adminTokenExpiresAt = 0;

async function getPocketBaseAdminToken(env) {
    const now = Date.now();
    if (cachedAdminToken && now < adminTokenExpiresAt) {
        return cachedAdminToken;
    }
    const pbUrl = env?.PB_URL || env?.POCKETHOST_URL || 'https://voca.pockethost.io';
    if (!env?.PB_ADMIN_EMAIL || !env?.PB_ADMIN_PASSWORD) {
        return null;
    }
    const authRes = await fetch(`${pbUrl}/api/admins/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: env.PB_ADMIN_EMAIL, password: env.PB_ADMIN_PASSWORD })
    });
    if (!authRes.ok) {
        console.error(`[DiamondService] PocketBase admin auth failed: ${authRes.status}`);
        return null;
    }
    const authData = await authRes.json();
    cachedAdminToken = authData.token;
    adminTokenExpiresAt = now + 45 * 60 * 1000; // Cache 45 minutes
    return cachedAdminToken;
}

export class DiamondService {
    /**
     * @param {Object} cacheManager - Instance of CacheManager (wrapper for KV)
     */
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }

    /**
     * Determine user tier
     */
    resolveTier(user = null) {
        if (!user) return 'anonymous';
        const tier = user.subscriptionTier || 'free';
        if (tier === 'free') return 'free';
        if (user.subscriptionExpires && new Date(user.subscriptionExpires) < new Date()) {
            return 'free'; // Subscription expired
        }
        return (tier === 'pro' || tier === 'premium') ? tier : 'free';
    }

    /**
     * Get current diamond count for a user
     * - Authenticated users: Read from PocketBase user record
     * - Anonymous users: Read from KV (regenerates over time, throttled to protect quotas)
     * 
     * @param {string} clientId - The IP or identifier for the unauthenticated user
     * @param {Object} [user=null] - The authenticated PocketBase user object
     * @returns {Promise<{ diamonds: number, nextRegenAt: number | null, maxDiamonds: number, regenIntervalMs: number, tier: string, maxVideoDurationSec: number }>}
     */
    async getDiamonds(clientId, user = null) {
        const tier = this.resolveTier(user);
        const config = getTierDiamondConfig(tier);

        if (user) {
            // Authenticated user
            let currentDiamonds = user.diamonds ?? config.maxDiamonds;
            let lastRegenDate = user.last_diamond_regen ? new Date(user.last_diamond_regen) : new Date();
            let nextRegenAt = null;
            let needsUpdate = false;

            // Calculate regeneration if not at max
            if (currentDiamonds < config.maxDiamonds) {
                const now = new Date();
                const msSinceLastRegen = now.getTime() - lastRegenDate.getTime();

                if (msSinceLastRegen >= config.regenIntervalMs) {
                    const intervalsPassed = Math.floor(msSinceLastRegen / config.regenIntervalMs);
                    const regeneratedAmount = intervalsPassed * config.regenAmount;
                    currentDiamonds = Math.min(currentDiamonds + regeneratedAmount, config.maxDiamonds);

                    // Update last regen time by adding the intervals passed
                    lastRegenDate = new Date(lastRegenDate.getTime() + (intervalsPassed * config.regenIntervalMs));
                    needsUpdate = true;
                }

                // Calculate next regen time if still strictly below max
                if (currentDiamonds < config.maxDiamonds) {
                    nextRegenAt = lastRegenDate.getTime() + config.regenIntervalMs;
                }
            }

            return {
                diamonds: currentDiamonds,
                nextRegenAt,
                needsUpdate,
                lastRegenDate, // For passing to consumeDiamond
                maxDiamonds: config.maxDiamonds,
                regenIntervalMs: config.regenIntervalMs,
                tier,
                maxVideoDurationSec: config.maxVideoDurationSec
            };
        }

        // Anonymous user (Memory cache first, then KV)
        const cacheKey = `diamonds:${clientId}`;
        const now = Date.now();

        // 1. Check in-memory isolate cache
        const memHit = memDiamondsCache.get(cacheKey);
        let cacheData = null;

        if (memHit && (now - memHit.cachedAt) < MEM_DIAMONDS_TTL_MS) {
            cacheData = memHit.data;
        } else if (this.cacheManager && this.cacheManager.kv) {
            try {
                const raw = await this.cacheManager.kv.get(cacheKey);
                if (raw) {
                    cacheData = JSON.parse(raw);
                    if (memDiamondsCache.size > 500) {
                        const oldestKey = memDiamondsCache.keys().next().value;
                        memDiamondsCache.delete(oldestKey);
                    }
                    memDiamondsCache.set(cacheKey, { data: cacheData, cachedAt: now });
                }
            } catch (e) {
                console.error(`[DiamondService] KV read error: ${e.message}`);
            }
        }

        // New anonymous user
        if (!cacheData) {
            return {
                diamonds: config.maxDiamonds,
                nextRegenAt: null,
                maxDiamonds: config.maxDiamonds,
                regenIntervalMs: config.regenIntervalMs,
                tier,
                maxVideoDurationSec: config.maxVideoDurationSec
            };
        }

        let { d: currentDiamonds, l: lastRegenTime } = cacheData;

        // Calculate regeneration
        if (currentDiamonds < config.maxDiamonds) {
            const msSinceLastRegen = now - lastRegenTime;

            if (msSinceLastRegen >= config.regenIntervalMs) {
                const intervalsPassed = Math.floor(msSinceLastRegen / config.regenIntervalMs);
                const regeneratedAmount = intervalsPassed * config.regenAmount;
                currentDiamonds = Math.min(currentDiamonds + regeneratedAmount, config.maxDiamonds);
                lastRegenTime = lastRegenTime + (intervalsPassed * config.regenIntervalMs);

                const newCacheData = { d: currentDiamonds, l: lastRegenTime };
                memDiamondsCache.set(cacheKey, { data: newCacheData, cachedAt: now });

                // Throttled KV write (fire and forget) to preserve KV daily quota
                if (this.cacheManager && this.cacheManager.kv) {
                    this.cacheManager.kv.put(cacheKey, JSON.stringify(newCacheData), { expirationTtl: 30 * 24 * 60 * 60 })
                        .catch(e => console.error(`[DiamondService] KV regen update error: ${e.message}`));
                }
            }
        }

        const nextRegenAt = currentDiamonds < config.maxDiamonds
            ? lastRegenTime + config.regenIntervalMs
            : null;

        return {
            diamonds: currentDiamonds,
            nextRegenAt,
            maxDiamonds: config.maxDiamonds,
            regenIntervalMs: config.regenIntervalMs,
            tier,
            maxVideoDurationSec: config.maxVideoDurationSec
        };
    }

    /**
     * Consume diamond(s) for AI transcription
     */
    async consumeDiamond(clientId, context, env, user = null, amount = 1) {
        const currentData = await this.getDiamonds(clientId, user);

        if (currentData.diamonds < amount) {
            return {
                success: false,
                reason: 'insufficient_diamonds',
                requiredDiamonds: amount,
                diamonds: currentData.diamonds,
                nextRegenAt: currentData.nextRegenAt,
                regenIntervalMs: currentData.regenIntervalMs,
                tier: currentData.tier
            };
        }

        const newDiamondCount = Math.max(0, currentData.diamonds - amount);
        const now = Date.now();
        const lastRegenTime = currentData.diamonds === currentData.maxDiamonds
            ? now
            : (user ? currentData.lastRegenDate.getTime() : (await this._getRawAnonymousLastRegen(clientId) || now));

        const nextRegenAt = lastRegenTime + currentData.regenIntervalMs;

        // Persist the new state
        if (user) {
            const updateTask = this._updatePocketBaseUser(
                env,
                user.id,
                newDiamondCount,
                new Date(lastRegenTime).toISOString()
            );

            if (context && context.waitUntil) {
                context.waitUntil(updateTask);
            } else {
                await updateTask;
            }
        } else {
            const cacheKey = `diamonds:${clientId}`;
            const newCacheData = { d: newDiamondCount, l: lastRegenTime };
            memDiamondsCache.set(cacheKey, { data: newCacheData, cachedAt: now });

            if (this.cacheManager && this.cacheManager.kv) {
                const kvTask = this.cacheManager.kv.put(cacheKey, JSON.stringify(newCacheData), { expirationTtl: 30 * 24 * 60 * 60 });
                if (context && context.waitUntil) {
                    context.waitUntil(kvTask.catch(e => console.error(`[DiamondCache] consume error: ${e.message}`)));
                } else {
                    await kvTask.catch(e => console.error(`[DiamondCache] consume error: ${e.message}`));
                }
            }
        }

        return {
            success: true,
            diamonds: newDiamondCount,
            nextRegenAt,
            maxDiamonds: currentData.maxDiamonds,
            regenIntervalMs: currentData.regenIntervalMs,
            tier: currentData.tier
        };
    }

    /**
     * Refund consumed diamond(s) on transaction failure
     */
    async refundDiamond(clientId, context, env, user = null, amount = 1) {
        try {
            const currentData = await this.getDiamonds(clientId, user);
            const newDiamondCount = Math.min(currentData.maxDiamonds, currentData.diamonds + amount);

            if (user) {
                const updateTask = this._updatePocketBaseUser(
                    env,
                    user.id,
                    newDiamondCount,
                    currentData.lastRegenDate ? currentData.lastRegenDate.toISOString() : new Date().toISOString()
                );
                if (context && context.waitUntil) {
                    context.waitUntil(updateTask);
                } else {
                    await updateTask;
                }
            } else {
                const cacheKey = `diamonds:${clientId}`;
                const raw = await this._getRawAnonymousLastRegen(clientId);
                const newCacheData = { d: newDiamondCount, l: raw || Date.now() };
                memDiamondsCache.set(cacheKey, { data: newCacheData, cachedAt: Date.now() });

                if (this.cacheManager && this.cacheManager.kv) {
                    const kvTask = this.cacheManager.kv.put(cacheKey, JSON.stringify(newCacheData), { expirationTtl: 30 * 24 * 60 * 60 });
                    if (context && context.waitUntil) {
                        context.waitUntil(kvTask.catch(e => console.error(`[DiamondCache] refund error: ${e.message}`)));
                    } else {
                        await kvTask.catch(e => console.error(`[DiamondCache] refund error: ${e.message}`));
                    }
                }
            }
            return { success: true, diamonds: newDiamondCount, maxDiamonds: currentData.maxDiamonds, tier: currentData.tier };
        } catch (err) {
            console.error('[DiamondService] Error refunding diamonds:', err);
            return { success: false, error: err.message };
        }
    }

    async _getRawAnonymousLastRegen(clientId) {
        const cacheKey = `diamonds:${clientId}`;
        const memHit = memDiamondsCache.get(cacheKey);
        if (memHit?.data?.l) return memHit.data.l;

        if (!this.cacheManager || !this.cacheManager.kv) return null;
        try {
            const raw = await this.cacheManager.kv.get(cacheKey);
            if (raw) return JSON.parse(raw).l;
        } catch (e) { }
        return null;
    }

    async _updatePocketBaseUser(env, userId, diamonds, lastRegenIsoString) {
        const pbUrl = env?.PB_URL || env?.POCKETHOST_URL || 'https://voca.pockethost.io';
        try {
            const token = await getPocketBaseAdminToken(env);
            if (!token) {
                console.warn('[DiamondService] Skipping PB user update: admin credentials not configured');
                return;
            }

            const updateRes = await fetch(`${pbUrl}/api/collections/users/records/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    diamonds: diamonds,
                    last_diamond_regen: lastRegenIsoString
                })
            });

            if (!updateRes.ok) {
                console.error(`[DiamondService] PocketBase update failed: ${updateRes.status}`);
            }
        } catch (e) {
            console.error(`[DiamondService] Error updating user in Pocketbase: ${e.message}`);
        }
    }
}
