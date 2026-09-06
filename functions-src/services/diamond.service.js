/**
 * Service for managing Diamond Credit System
 */

export const DIAMOND_CONFIG = {
    regenIntervalMinutes: 20,           // How often diamonds regenerate (20 minutes)
    regenIntervalMs: 20 * 60 * 1000,   // 20 minutes in ms
    regenAmount: 1,                    // +1 diamond per interval
    maxDiamonds: 3,                    // Maximum free diamonds a user can hold
    cachePrefix: 'diamonds',           // KV cache prefix for anonymous users
};

export class DiamondService {
    /**
     * @param {Object} cacheManager - Instance of CacheManager (wrapper for KV)
     */
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
    }

    /**
     * Get current diamond count for a user
     * - Authenticated users: Read from PocketBase user record
     * - Anonymous users: Read from KV (regenerates over time)
     * 
     * @param {string} clientId - The IP or identifier for the unauthenticated user
     * @param {Object} [user=null] - The authenticated PocketBase user object
     * @returns {Promise<{ diamonds: number, nextRegenAt: number | null, maxDiamonds: number, regenIntervalMs: number }>}
     */
    async getDiamonds(clientId, user = null) {
        if (user) {
            // Authenticated user
            let currentDiamonds = user.diamonds ?? DIAMOND_CONFIG.maxDiamonds; // Default to max for new users
            let lastRegenDate = user.last_diamond_regen ? new Date(user.last_diamond_regen) : new Date();
            let nextRegenAt = null;
            let needsUpdate = false;

            // Calculate regeneration if not at max
            if (currentDiamonds < DIAMOND_CONFIG.maxDiamonds) {
                const now = new Date();
                const msSinceLastRegen = now.getTime() - lastRegenDate.getTime();

                if (msSinceLastRegen >= DIAMOND_CONFIG.regenIntervalMs) {
                    const intervalsPassed = Math.floor(msSinceLastRegen / DIAMOND_CONFIG.regenIntervalMs);
                    const regeneratedAmount = intervalsPassed * DIAMOND_CONFIG.regenAmount;
                    currentDiamonds = Math.min(currentDiamonds + regeneratedAmount, DIAMOND_CONFIG.maxDiamonds);

                    // Update last regen time by adding the intervals passed
                    lastRegenDate = new Date(lastRegenDate.getTime() + (intervalsPassed * DIAMOND_CONFIG.regenIntervalMs));
                    needsUpdate = true;
                }

                // Calculate next regen time if still strictly below max
                if (currentDiamonds < DIAMOND_CONFIG.maxDiamonds) {
                    nextRegenAt = lastRegenDate.getTime() + DIAMOND_CONFIG.regenIntervalMs;
                }
            }

            return {
                diamonds: currentDiamonds,
                nextRegenAt,
                needsUpdate,
                lastRegenDate, // For passing to consumeDiamond
                maxDiamonds: DIAMOND_CONFIG.maxDiamonds,
                regenIntervalMs: DIAMOND_CONFIG.regenIntervalMs
            };
        }

        // Anonymous user (KV Cache)
        const cacheKey = `${DIAMOND_CONFIG.cachePrefix}:${clientId}`;
        let cacheData = null;

        if (this.cacheManager && this.cacheManager.kv) {
            try {
                const raw = await this.cacheManager.kv.get(cacheKey);
                if (raw) cacheData = JSON.parse(raw);
            } catch (e) {
                console.error(`[DiamondService] KV read error: ${e.message}`);
                // Proceed as if new user on error (to avoid locking them out)
            }
        }

        const now = Date.now();

        // New anonymous user
        if (!cacheData) {
            return {
                diamonds: DIAMOND_CONFIG.maxDiamonds,
                nextRegenAt: null,
                maxDiamonds: DIAMOND_CONFIG.maxDiamonds,
                regenIntervalMs: DIAMOND_CONFIG.regenIntervalMs
            };
        }

        let { d: currentDiamonds, l: lastRegenTime } = cacheData;

        // Calculate regeneration
        if (currentDiamonds < DIAMOND_CONFIG.maxDiamonds) {
            const msSinceLastRegen = now - lastRegenTime;

            if (msSinceLastRegen >= DIAMOND_CONFIG.regenIntervalMs) {
                const intervalsPassed = Math.floor(msSinceLastRegen / DIAMOND_CONFIG.regenIntervalMs);
                const regeneratedAmount = intervalsPassed * DIAMOND_CONFIG.regenAmount;
                currentDiamonds = Math.min(currentDiamonds + regeneratedAmount, DIAMOND_CONFIG.maxDiamonds);
                lastRegenTime = lastRegenTime + (intervalsPassed * DIAMOND_CONFIG.regenIntervalMs);

                // Opportunistically save to KV (fire and forget)
                if (this.cacheManager && this.cacheManager.kv) {
                    const newCacheData = { d: currentDiamonds, l: lastRegenTime };
                    this.cacheManager.kv.put(cacheKey, JSON.stringify(newCacheData), { expirationTtl: 30 * 24 * 60 * 60 }) // 30 days
                        .catch(e => console.error(`[DiamondService] KV regen update error: ${e.message}`));
                }
            }
        }

        const nextRegenAt = currentDiamonds < DIAMOND_CONFIG.maxDiamonds
            ? lastRegenTime + DIAMOND_CONFIG.regenIntervalMs
            : null;

        return {
            diamonds: currentDiamonds,
            nextRegenAt,
            maxDiamonds: DIAMOND_CONFIG.maxDiamonds,
            regenIntervalMs: DIAMOND_CONFIG.regenIntervalMs
        };
    }

    /**
     * Consume a diamond for AI transcription
     * - Authenticated users: Update PocketBase user record
     * - Anonymous users: Update KV cache
     * 
     * @param {string} clientId 
     * @param {Object} context - Cloudflare execution context for waitUntil
     * @param {Object} env - Cloudflare environment bindings
     * @param {Object} [user=null] 
     * @param {number} [amount=1] - Number of diamonds to consume (e.g. 1 for short, 2 for longer videos)
     * @returns {Promise<{ success: boolean, reason?: string, requiredDiamonds?: number, diamonds: number, nextRegenAt: number | null, regenIntervalMs: number }>}
     */
    async consumeDiamond(clientId, context, env, user = null, amount = 1) {
        // 1. Get current accurate count (including any pending regen)
        const currentData = await this.getDiamonds(clientId, user);

        if (currentData.diamonds < amount) {
            return {
                success: false,
                reason: 'insufficient_diamonds',
                requiredDiamonds: amount,
                diamonds: currentData.diamonds,
                nextRegenAt: currentData.nextRegenAt,
                regenIntervalMs: DIAMOND_CONFIG.regenIntervalMs
            };
        }

        const newDiamondCount = Math.max(0, currentData.diamonds - amount);
        const now = Date.now();
        // If they were at max, the regen timer starts NOW.
        // If they were below max, the regen timer continues from lastRegenDate
        const lastRegenTime = currentData.diamonds === DIAMOND_CONFIG.maxDiamonds
            ? now
            : (user ? currentData.lastRegenDate.getTime() : (await this._getRawAnonymousLastRegen(clientId) || now));

        const nextRegenAt = lastRegenTime + DIAMOND_CONFIG.regenIntervalMs;

        // 2. Persist the new state
        const pbUrl = env?.PB_URL || env?.POCKETHOST_URL || 'https://voca.pockethost.io';
        if (user) {
            // Authenticated user -> Update PocketBase via background task
            if (pbUrl && env.PB_ADMIN_EMAIL && env.PB_ADMIN_PASSWORD) {
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
            }
        } else {
            // Anonymous user -> Update KV Cache
            if (this.cacheManager && this.cacheManager.kv) {
                const cacheKey = `${DIAMOND_CONFIG.cachePrefix}:${clientId}`;
                const newCacheData = { d: newDiamondCount, l: lastRegenTime };

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
            regenIntervalMs: DIAMOND_CONFIG.regenIntervalMs
        };
    }

    /**
     * Refund consumed diamond(s) on transaction failure
     */
    async refundDiamond(clientId, context, env, user = null, amount = 1) {
        try {
            const currentData = await this.getDiamonds(clientId, user);
            const newDiamondCount = Math.min(DIAMOND_CONFIG.maxDiamonds, currentData.diamonds + amount);
            const pbUrl = env?.PB_URL || env?.POCKETHOST_URL || 'https://voca.pockethost.io';
            if (user) {
                if (pbUrl && env.PB_ADMIN_EMAIL && env.PB_ADMIN_PASSWORD) {
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
                }
            } else {
                if (this.cacheManager && this.cacheManager.kv) {
                    const cacheKey = `${DIAMOND_CONFIG.cachePrefix}:${clientId}`;
                    const raw = await this._getRawAnonymousLastRegen(clientId);
                    const newCacheData = { d: newDiamondCount, l: raw || Date.now() };
                    const kvTask = this.cacheManager.kv.put(cacheKey, JSON.stringify(newCacheData), { expirationTtl: 30 * 24 * 60 * 60 });
                    if (context && context.waitUntil) {
                        context.waitUntil(kvTask.catch(e => console.error(`[DiamondCache] refund error: ${e.message}`)));
                    } else {
                        await kvTask.catch(e => console.error(`[DiamondCache] refund error: ${e.message}`));
                    }
                }
            }
            return { success: true, diamonds: newDiamondCount };
        } catch (err) {
            console.error('[DiamondService] Error refunding diamonds:', err);
            return { success: false, error: err.message };
        }
    }

    async _getRawAnonymousLastRegen(clientId) {
        if (!this.cacheManager || !this.cacheManager.kv) return null;
        const cacheKey = `${DIAMOND_CONFIG.cachePrefix}:${clientId}`;
        try {
            const raw = await this.cacheManager.kv.get(cacheKey);
            if (raw) return JSON.parse(raw).l;
        } catch (e) { }
        return null;
    }

    async _updatePocketBaseUser(env, userId, diamonds, lastRegenIsoString) {
        const pbUrl = env?.PB_URL || env?.POCKETHOST_URL || 'https://voca.pockethost.io';
        try {
            // Simple generic approach, abstract this better if more PB operations are needed natively
            const authRes = await fetch(`${pbUrl}/api/admins/auth-with-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identity: env.PB_ADMIN_EMAIL, password: env.PB_ADMIN_PASSWORD })
            });

            if (!authRes.ok) throw new Error('Failed to authenticate as admin');
            const authData = await authRes.json();
            const token = authData.token;

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
