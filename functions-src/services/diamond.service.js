import { invalidateUserTokenCache } from '../middlewares/auth.js';

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
        maxVideoDurationSec: 600, // 10 minutes
    },
    pro: {
        tier: 'pro',
        maxDiamonds: 10,
        regenIntervalMinutes: 10,
        regenIntervalMs: 10 * 60 * 1000,
        regenAmount: 1,
        maxVideoDurationSec: 1200, // 20 minutes
    },
    premium: {
        tier: 'premium',
        maxDiamonds: 25,
        regenIntervalMinutes: 4,
        regenIntervalMs: 4 * 60 * 1000,
        regenAmount: 1,
        maxVideoDurationSec: 2700, // 45 minutes
    }
};

export const DIAMOND_CONFIG = TIER_CONFIGS.anonymous;

export function getTierDiamondConfig(tier = 'free') {
    return TIER_CONFIGS[tier] || TIER_CONFIGS.free;
}

// In-memory cache across warm Worker isolates to protect KV write quotas (Rule 2)
const memDiamondsCache = new Map();
const MAX_MEM_DIAMONDS_CACHE = 1000;

function setMemDiamondsCache(cacheKey, value) {
    if (memDiamondsCache.size >= MAX_MEM_DIAMONDS_CACHE) {
        const oldestKey = memDiamondsCache.keys().next().value;
        if (oldestKey) memDiamondsCache.delete(oldestKey);
    }
    memDiamondsCache.set(cacheKey, value);
}

const DEFAULT_SUPABASE_URL = 'https://edbkvzviqeulwzcnrrlb.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkYmt2enZpcWV1bHd6Y25ycmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NTI5NjAsImV4cCI6MjEwNTAyODk2MH0.F2Js6UWUyUX-uVfDMVCNLJBG7eL6Clo9EGimjh2wgUg';

/**
 * Fetch fresh user profile from Supabase
 */
async function fetchSupabaseProfile(env, userId) {
    if (!userId || !env) return null;
    const supabaseUrl = env?.SUPABASE_URL || DEFAULT_SUPABASE_URL;
    const supabaseKey = env?.SUPABASE_SERVICE_ROLE_KEY || env?.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

    try {
        const res = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}&select=*`, {
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Accept': 'application/json'
            },
            signal: AbortSignal.timeout(4000)
        });
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                const profile = data[0];
                return {
                    id: profile.id,
                    diamonds: profile.diamonds,
                    last_diamond_regen: profile.diamonds_updated_at,
                    subscriptionTier: profile.subscription_tier,
                    subscriptionExpires: profile.subscription_expires
                };
            }
        }
    } catch (e) {
        console.error(`[DiamondService] Error fetching Supabase profile ${userId}:`, e.message);
    }
    return null;
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
     * - Authenticated users: Read from Supabase profiles record
     * - Anonymous users: Read from KV (regenerates over time, throttled to protect quotas)
     */
    async getDiamonds(clientId, user = null, env = null, context = null) {
        // If user object has an ID but lacks diamonds count, fetch full record
        if (user?.id && (user.diamonds === undefined || user.diamonds === null) && env) {
            const remoteUser = await fetchSupabaseProfile(env, user.id);
            if (remoteUser) {
                user = { ...user, ...remoteUser };
            }
        }

        const tier = this.resolveTier(user);
        const config = getTierDiamondConfig(tier);

        if (user) {
            const now = Date.now();
            let currentDiamonds = (typeof user.diamonds === 'number') ? user.diamonds : config.maxDiamonds;

            let lastRegenDate = user.last_diamond_regen ? new Date(user.last_diamond_regen) : null;
            if (!lastRegenDate || isNaN(lastRegenDate.getTime())) {
                lastRegenDate = new Date(now);
            }

            let nextRegenAt = null;
            let needsUpdate = false;

            if (currentDiamonds < config.maxDiamonds) {
                const elapsedMs = now - lastRegenDate.getTime();
                if (elapsedMs >= config.regenIntervalMs) {
                    const regenedUnits = Math.floor(elapsedMs / config.regenIntervalMs);
                    const actualRegened = regenedUnits * config.regenAmount;
                    currentDiamonds = Math.min(config.maxDiamonds, currentDiamonds + actualRegened);

                    // Advance timestamp
                    lastRegenDate = new Date(lastRegenDate.getTime() + (regenedUnits * config.regenIntervalMs));
                    needsUpdate = true;
                }

                // Calculate next regen time if still strictly below max
                if (currentDiamonds < config.maxDiamonds) {
                    nextRegenAt = lastRegenDate.getTime() + config.regenIntervalMs;
                }
            }

            if (needsUpdate && env) {
                const updateTask = this._updateUserDiamonds(
                    env,
                    user.id,
                    currentDiamonds,
                    lastRegenDate.toISOString()
                );
                if (context && context.waitUntil) {
                    context.waitUntil(updateTask);
                } else {
                    updateTask.catch(() => {});
                }
            }

            return {
                diamonds: currentDiamonds,
                nextRegenAt,
                needsUpdate,
                lastRegenDate,
                maxDiamonds: config.maxDiamonds,
                regenIntervalMs: config.regenIntervalMs,
                tier: config.tier,
                maxVideoDurationSec: config.maxVideoDurationSec
            };
        }

        // Anonymous user flow
        return await this._getAnonymousDiamonds(clientId, config, context);
    }

    async _getAnonymousDiamonds(clientId, config, context = null) {
        const cacheKey = `diamonds:${clientId}`;
        const now = Date.now();

        let cached = memDiamondsCache.get(cacheKey);
        let rawData = null;

        if (cached) {
            rawData = cached.data;
        } else if (this.cacheManager && this.cacheManager.kv) {
            try {
                const kvData = await this.cacheManager.kv.get(cacheKey);
                if (kvData) {
                    rawData = JSON.parse(kvData);
                    setMemDiamondsCache(cacheKey, { data: rawData, cachedAt: now });
                }
            } catch (e) {
                console.error(`[DiamondCache] Error reading KV for ${clientId}: ${e.message}`);
            }
        }

        let diamonds = config.maxDiamonds;
        let lastRegenTime = now;
        let nextRegenAt = null;
        let needsSave = false;

        if (rawData) {
            diamonds = typeof rawData.d === 'number' ? rawData.d : config.maxDiamonds;
            lastRegenTime = typeof rawData.l === 'number' ? rawData.l : now;

            if (diamonds < config.maxDiamonds) {
                const elapsedMs = now - lastRegenTime;
                if (elapsedMs >= config.regenIntervalMs) {
                    const regenedUnits = Math.floor(elapsedMs / config.regenIntervalMs);
                    const actualRegened = regenedUnits * config.regenAmount;
                    diamonds = Math.min(config.maxDiamonds, diamonds + actualRegened);
                    lastRegenTime = lastRegenTime + (regenedUnits * config.regenIntervalMs);
                    needsSave = true;
                }

                if (diamonds < config.maxDiamonds) {
                    nextRegenAt = lastRegenTime + config.regenIntervalMs;
                }
            }
        } else {
            needsSave = true;
        }

        if (needsSave) {
            const newCacheData = { d: diamonds, l: lastRegenTime };
            setMemDiamondsCache(cacheKey, { data: newCacheData, cachedAt: now });

            if (this.cacheManager && this.cacheManager.kv) {
                const kvTask = this.cacheManager.kv.put(cacheKey, JSON.stringify(newCacheData), { expirationTtl: 30 * 24 * 60 * 60 });
                if (context && context.waitUntil) {
                    context.waitUntil(kvTask.catch(e => console.error(`[DiamondCache] put error: ${e.message}`)));
                } else {
                    await kvTask.catch(e => console.error(`[DiamondCache] put error: ${e.message}`));
                }
            }
        }

        return {
            diamonds,
            nextRegenAt,
            maxDiamonds: config.maxDiamonds,
            regenIntervalMs: config.regenIntervalMs,
            tier: config.tier,
            maxVideoDurationSec: config.maxVideoDurationSec
        };
    }

    /**
     * Consume diamond(s) for a user action
     */
    async consumeDiamond(clientId, cost = 1, user = null, env = null, context = null) {
        const now = Date.now();
        const currentData = await this.getDiamonds(clientId, user, env, context);

        const numericCost = Number(cost) || 1;
        if (currentData.diamonds < numericCost) {
            return {
                success: false,
                reason: 'insufficient_diamonds',
                diamonds: currentData.diamonds,
                requiredDiamonds: numericCost,
                nextRegenAt: currentData.nextRegenAt,
                maxDiamonds: currentData.maxDiamonds,
                regenIntervalMs: currentData.regenIntervalMs,
                tier: currentData.tier
            };
        }

        const newDiamondCount = Math.max(0, currentData.diamonds - numericCost);
        let lastRegenTime = now;
        if (currentData.diamonds < currentData.maxDiamonds) {
            if (user && currentData.lastRegenDate) {
                lastRegenTime = currentData.lastRegenDate.getTime();
            } else if (currentData.nextRegenAt) {
                lastRegenTime = currentData.nextRegenAt - currentData.regenIntervalMs;
            }
        }

        const nextRegenAt = lastRegenTime + currentData.regenIntervalMs;

        // Persist the new state
        if (user?.id) {
            // 1. Attempt atomic deduction via Supabase RPC first (Row Lock FOR UPDATE)
            const rpcResult = await this._consumeUserDiamondsRpc(
                env,
                user.id,
                numericCost,
                new Date(lastRegenTime).toISOString()
            );

            if (rpcResult) {
                if (!rpcResult.success) {
                    return {
                        success: false,
                        reason: rpcResult.reason || 'insufficient_diamonds',
                        diamonds: typeof rpcResult.diamonds === 'number' ? rpcResult.diamonds : currentData.diamonds,
                        requiredDiamonds: numericCost,
                        nextRegenAt: currentData.nextRegenAt,
                        maxDiamonds: currentData.maxDiamonds,
                        regenIntervalMs: currentData.regenIntervalMs,
                        tier: currentData.tier
                    };
                }
                user.diamonds = rpcResult.diamonds;
                user.last_diamond_regen = new Date(lastRegenTime).toISOString();
                invalidateUserTokenCache(user.id);
                return {
                    success: true,
                    diamonds: rpcResult.diamonds,
                    nextRegenAt,
                    maxDiamonds: currentData.maxDiamonds,
                    regenIntervalMs: currentData.regenIntervalMs,
                    tier: currentData.tier
                };
            }

            // 2. Fallback to direct update if RPC is unavailable
            const updateSuccess = await this._updateUserDiamonds(
                env,
                user.id,
                newDiamondCount,
                new Date(lastRegenTime).toISOString()
            );

            if (!updateSuccess) {
                console.error(`[DiamondService] Failed to persist diamond deduction for user ${user.id}`);
                return {
                    success: false,
                    reason: 'database_update_failed',
                    diamonds: currentData.diamonds
                };
            }

            user.diamonds = newDiamondCount;
            user.last_diamond_regen = new Date(lastRegenTime).toISOString();
            invalidateUserTokenCache(user.id);
        } else {
            const cacheKey = `diamonds:${clientId}`;
            const newCacheData = { d: newDiamondCount, l: lastRegenTime };
            setMemDiamondsCache(cacheKey, { data: newCacheData, cachedAt: now });

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
            const currentData = await this.getDiamonds(clientId, user, env, context);
            const newDiamondCount = Math.min(currentData.maxDiamonds, currentData.diamonds + amount);

            if (user?.id) {
                // 1. Attempt atomic refund via Supabase RPC first
                const rpcResult = await this._refundUserDiamondsRpc(
                    env,
                    user.id,
                    amount,
                    currentData.maxDiamonds
                );

                if (rpcResult && rpcResult.success) {
                    user.diamonds = rpcResult.diamonds;
                    invalidateUserTokenCache(user.id);
                    console.log(`[DiamondService] Atomically refunded ${amount} diamond(s) via RPC to ${user.id}. New balance: ${rpcResult.diamonds}`);
                    return true;
                }

                // 2. Fallback to direct update
                const updateTask = this._updateUserDiamonds(
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
                user.diamonds = newDiamondCount;
                invalidateUserTokenCache(user.id);
            } else {
                const cacheKey = `diamonds:${clientId}`;
                const lastRegen = currentData.nextRegenAt ? currentData.nextRegenAt - currentData.regenIntervalMs : Date.now();
                const newCacheData = { d: newDiamondCount, l: lastRegen };
                setMemDiamondsCache(cacheKey, { data: newCacheData, cachedAt: Date.now() });

                if (this.cacheManager && this.cacheManager.kv) {
                    const kvTask = this.cacheManager.kv.put(cacheKey, JSON.stringify(newCacheData), { expirationTtl: 30 * 24 * 60 * 60 });
                    if (context && context.waitUntil) {
                        context.waitUntil(kvTask.catch(e => console.error(`[DiamondCache] refund error: ${e.message}`)));
                    } else {
                        await kvTask.catch(e => console.error(`[DiamondCache] refund error: ${e.message}`));
                    }
                }
            }
            console.log(`[DiamondService] Successfully refunded ${amount} diamond(s) to ${user?.id || clientId}. New balance: ${newDiamondCount}`);
            return true;
        } catch (e) {
            console.error(`[DiamondService] Error refunding diamond to ${user?.id || clientId}:`, e.message);
            return false;
        }
    }

    async _consumeUserDiamondsRpc(env, userId, cost, lastRegenIsoString) {
        const supabaseUrl = env?.SUPABASE_URL || DEFAULT_SUPABASE_URL;
        const serviceRoleKey = env?.SUPABASE_SERVICE_ROLE_KEY;
        if (!serviceRoleKey) return null;

        try {
            const res = await fetch(`${supabaseUrl}/rest/v1/rpc/consume_user_diamonds`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': serviceRoleKey,
                    'Authorization': `Bearer ${serviceRoleKey}`
                },
                body: JSON.stringify({
                    p_user_id: userId,
                    p_cost: cost,
                    p_last_regen: lastRegenIsoString
                }),
                signal: AbortSignal.timeout(4000)
            });
            if (res.ok) {
                return await res.json();
            }
        } catch (e) {
            console.warn('[DiamondService] consume_user_diamonds RPC failed, falling back:', e.message);
        }
        return null;
    }

    async _refundUserDiamondsRpc(env, userId, amount, maxDiamonds) {
        const supabaseUrl = env?.SUPABASE_URL || DEFAULT_SUPABASE_URL;
        const serviceRoleKey = env?.SUPABASE_SERVICE_ROLE_KEY;
        if (!serviceRoleKey) return null;

        try {
            const res = await fetch(`${supabaseUrl}/rest/v1/rpc/refund_user_diamonds`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': serviceRoleKey,
                    'Authorization': `Bearer ${serviceRoleKey}`
                },
                body: JSON.stringify({
                    p_user_id: userId,
                    p_amount: amount,
                    p_max_diamonds: maxDiamonds
                }),
                signal: AbortSignal.timeout(4000)
            });
            if (res.ok) {
                return await res.json();
            }
        } catch (e) {
            console.warn('[DiamondService] refund_user_diamonds RPC failed, falling back:', e.message);
        }
        return null;
    }

    async _updateUserDiamonds(env, userId, diamonds, lastRegenIsoString) {
        const supabaseUrl = env?.SUPABASE_URL || DEFAULT_SUPABASE_URL;
        const serviceRoleKey = env?.SUPABASE_SERVICE_ROLE_KEY;

        if (!serviceRoleKey) {
            console.error('[DiamondService] SUPABASE_SERVICE_ROLE_KEY missing; cannot mutate profile diamonds');
            return false;
        }

        try {
            const res = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': serviceRoleKey,
                    'Authorization': `Bearer ${serviceRoleKey}`
                },
                body: JSON.stringify({
                    diamonds: diamonds,
                    diamonds_updated_at: lastRegenIsoString
                })
            });

            if (!res.ok) {
                console.error(`[DiamondService] Supabase profile diamonds update failed: ${res.status}`);
                return false;
            }
            return true;
        } catch (e) {
            console.error(`[DiamondService] Error updating diamonds in Supabase: ${e.message}`);
            return false;
        }
    }
}
