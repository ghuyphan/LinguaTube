/**
 * Service for managing Diamond Credit System
 */

const DIAMOND_CONFIG = {
    regenIntervalHours: 1,      // How often diamonds regenerate
    regenAmount: 3,             // How many diamonds to add per interval
    maxDiamonds: 10,            // Maximum free diamonds a user can hold
    cachePrefix: 'diamonds',    // KV cache prefix for anonymous users
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
     * @returns {Promise<{ diamonds: number, nextRegenAt: number | null, maxDiamonds: number }>}
     */
    async getDiamonds(clientId, user = null) {
        if (user) {
            // Authenticated user
            let currentDiamonds = user.diamonds ?? DIAMOND_CONFIG.regenAmount; // Default 3 for new users
            let lastRegenDate = user.last_diamond_regen ? new Date(user.last_diamond_regen) : new Date();
            let nextRegenAt = null;
            let needsUpdate = false;

            // Calculate regeneration if not at max
            if (currentDiamonds < DIAMOND_CONFIG.maxDiamonds) {
                const now = new Date();
                const msSinceLastRegen = now - lastRegenDate;
                const hoursSinceLastRegen = msSinceLastRegen / (1000 * 60 * 60);

                if (hoursSinceLastRegen >= DIAMOND_CONFIG.regenIntervalHours) {
                    const intervalsPassed = Math.floor(hoursSinceLastRegen / DIAMOND_CONFIG.regenIntervalHours);
                    const regeneratedAmount = intervalsPassed * DIAMOND_CONFIG.regenAmount;
                    currentDiamonds = Math.min(currentDiamonds + regeneratedAmount, DIAMOND_CONFIG.maxDiamonds);

                    // Update last regen time by adding the intervals passed
                    lastRegenDate = new Date(lastRegenDate.getTime() + (intervalsPassed * DIAMOND_CONFIG.regenIntervalHours * 60 * 60 * 1000));
                    needsUpdate = true;
                }

                // Calculate next regen time if still strictly below max
                if (currentDiamonds < DIAMOND_CONFIG.maxDiamonds) {
                    nextRegenAt = lastRegenDate.getTime() + (DIAMOND_CONFIG.regenIntervalHours * 60 * 60 * 1000);
                }
            }

            return {
                diamonds: currentDiamonds,
                nextRegenAt,
                needsUpdate,
                lastRegenDate, // For passing to consumeDiamond
                maxDiamonds: DIAMOND_CONFIG.maxDiamonds
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
                diamonds: DIAMOND_CONFIG.regenAmount,
                nextRegenAt: null,
                maxDiamonds: DIAMOND_CONFIG.maxDiamonds
            };
        }

        let { d: currentDiamonds, l: lastRegenTime } = cacheData;

        // Calculate regeneration
        if (currentDiamonds < DIAMOND_CONFIG.maxDiamonds) {
            const msSinceLastRegen = now - lastRegenTime;
            const hoursSinceLastRegen = msSinceLastRegen / (1000 * 60 * 60);

            if (hoursSinceLastRegen >= DIAMOND_CONFIG.regenIntervalHours) {
                const intervalsPassed = Math.floor(hoursSinceLastRegen / DIAMOND_CONFIG.regenIntervalHours);
                const regeneratedAmount = intervalsPassed * DIAMOND_CONFIG.regenAmount;
                currentDiamonds = Math.min(currentDiamonds + regeneratedAmount, DIAMOND_CONFIG.maxDiamonds);
                lastRegenTime = lastRegenTime + (intervalsPassed * DIAMOND_CONFIG.regenIntervalHours * 60 * 60 * 1000);

                // Opportunistically save to KV (fire and forget)
                if (this.cacheManager && this.cacheManager.kv) {
                    const newCacheData = { d: currentDiamonds, l: lastRegenTime };
                    this.cacheManager.kv.put(cacheKey, JSON.stringify(newCacheData), { expirationTtl: 30 * 24 * 60 * 60 }) // 30 days
                        .catch(e => console.error(`[DiamondService] KV regen update error: ${e.message}`));
                }
            }
        }

        const nextRegenAt = currentDiamonds < DIAMOND_CONFIG.maxDiamonds
            ? lastRegenTime + (DIAMOND_CONFIG.regenIntervalHours * 60 * 60 * 1000)
            : null;

        return {
            diamonds: currentDiamonds,
            nextRegenAt,
            maxDiamonds: DIAMOND_CONFIG.maxDiamonds
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
     * @returns {Promise<{ success: boolean, diamonds: number, nextRegenAt: number | null }>}
     */
    async consumeDiamond(clientId, context, env, user = null) {
        // 1. Get current accurate count (including any pending regen)
        const currentData = await this.getDiamonds(clientId, user);

        if (currentData.diamonds <= 0) {
            return {
                success: false,
                diamonds: 0,
                nextRegenAt: currentData.nextRegenAt
            };
        }

        const newDiamondCount = currentData.diamonds - 1;
        const now = Date.now();
        // If they were at max, the regen timer starts NOW.
        // If they were below max, the regen timer continues from lastRegenDate
        const lastRegenTime = currentData.diamonds === DIAMOND_CONFIG.maxDiamonds
            ? now
            : (user ? currentData.lastRegenDate.getTime() : (await this._getRawAnonymousLastRegen(clientId) || now));

        const nextRegenAt = lastRegenTime + (DIAMOND_CONFIG.regenIntervalHours * 60 * 60 * 1000);

        // 2. Persist the new state
        if (user) {
            // Authenticated user -> Update PocketBase via background task
            if (env.PB_URL && env.PB_ADMIN_EMAIL && env.PB_ADMIN_PASSWORD) {
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
            nextRegenAt
        };
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
        try {
            // Simple generic approach, abstract this better if more PB operations are needed natively
            const authRes = await fetch(`${env.PB_URL}/api/admins/auth-with-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identity: env.PB_ADMIN_EMAIL, password: env.PB_ADMIN_PASSWORD })
            });

            if (!authRes.ok) throw new Error('Failed to authenticate as admin');
            const authData = await authRes.json();
            const token = authData.token;

            const updateRes = await fetch(`${env.PB_URL}/api/collections/users/records/${userId}`, {
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
