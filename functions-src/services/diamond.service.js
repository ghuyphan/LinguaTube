import { anonymousBalance, consumeAnonymousCredits } from '../data/anonymous-credits.js';
import { serviceRoleRequest } from './supabase-rest.js';

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

export function transcriptionDiamondCost(duration) {
    if (!Number.isFinite(duration) || duration <= 0) throw new Error('VIDEO_DURATION_UNAVAILABLE: Unable to verify video length.');
    return duration > 2100 ? 4 : duration > 1200 ? 3 : duration > 600 ? 2 : 1;
}

export function getTierDiamondConfig(tier = 'free') {
    return TIER_CONFIGS[tier] || TIER_CONFIGS.free;
}

async function fetchSupabaseProfile(env, userId) {
    if (!userId || !env) return null;
    try {
        const profile = await serviceRoleRequest(env, 'rpc/get_user_access_state', {
            method: 'POST', body: { p_user_id: userId }, timeoutMs: 4000
        });
        if (!profile || profile.id !== userId) return null;
        return { id: profile.id, diamonds: profile.diamonds,
            last_diamond_regen: profile.diamonds_updated_at,
            subscriptionTier: profile.subscription_tier, subscriptionExpires: profile.subscription_expires };
    } catch (error) {
        console.error('[DiamondService] Access state unavailable', { message: error.message });
        return null;
    }
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
     * - Anonymous users: Read atomic D1 credits, importing a legacy KV balance on first access
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
                const result = await this._regenerateUserDiamondsRpc(env, user.id);
                if (result?.success) {
                    currentDiamonds = result.diamonds;
                    lastRegenDate = new Date(result.diamonds_updated_at);
                    user.diamonds = currentDiamonds;
                    user.last_diamond_regen = result.diamonds_updated_at;
                } else {
                    // A failed regeneration must not advertise an unpersisted balance.
                    currentDiamonds = user.diamonds ?? 0;
                }
                nextRegenAt = currentDiamonds < config.maxDiamonds ? lastRegenDate.getTime() + config.regenIntervalMs : null;
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
        return await this._getAnonymousDiamonds(clientId, config, context, env);
    }

    async _getAnonymousDiamonds(clientId, config, _context = null, env = null) {
        const row = env?.VOCAB_DB
            ? await anonymousBalance(env.VOCAB_DB, this.cacheManager?.kv, clientId)
            : { diamonds: config.maxDiamonds, nextRegenAt: null };
        return { diamonds: row.diamonds, nextRegenAt: row.nextRegenAt,
            maxDiamonds: config.maxDiamonds, regenIntervalMs: config.regenIntervalMs,
            tier: config.tier, maxVideoDurationSec: config.maxVideoDurationSec };
    }

    async consumeDiamond(clientId, cost = 1, user = null, env = null, context = null, jobId = null) {
        if (!Number.isSafeInteger(cost) || cost <= 0) return { success: false, reason: 'invalid_cost' };
        const current = await this.getDiamonds(clientId, user, env, context);
        let result;
        if (user?.id) {
            result = jobId
                ? await this._diamondRpc(env, 'consume_transcription_credits', { p_job_id: jobId, p_user_id: user.id, p_amount: cost })
                : await this._consumeUserDiamondsRpc(env, user.id, cost);
        } else {
            try { result = await consumeAnonymousCredits(env?.VOCAB_DB, this.cacheManager?.kv, clientId, cost, jobId); }
            catch { result = null; }
        }
        if (!result) return { success: false, reason: 'database_update_failed', diamonds: current.diamonds };
        if (result.success && user) user.diamonds = result.diamonds;
        return { ...current, ...result, reason: result.success ? undefined : (result.reason || 'insufficient_diamonds'), requiredDiamonds: cost };
    }

    async refundDiamond(clientId, context, env, user = null, amount = 1) {
        if (!Number.isSafeInteger(amount) || amount <= 0) return false;
        if (user?.id) {
            const result = await this._refundUserDiamondsRpc(env, user.id, amount);
            if (result?.success) user.diamonds = result.diamonds;
            return result?.success === true;
        }
        // Non-job callers retain atomic balance adjustment; transcription recovery uses a job ledger.
        try {
            const row = await anonymousBalance(env?.VOCAB_DB, this.cacheManager?.kv, clientId);
            await env.VOCAB_DB.prepare('UPDATE anonymous_credit_balances SET diamonds=MIN(3,diamonds+?) WHERE client_id=?')
                .bind(amount, row.client_id).run();
            return true;
        } catch { return false; }
    }

    async _consumeUserDiamondsRpc(env, userId, cost) {
        return this._diamondRpc(env, 'consume_user_diamonds', { target_user_id: userId, diamond_count: cost });
    }

    async _refundUserDiamondsRpc(env, userId, amount) {
        return this._diamondRpc(env, 'refund_user_diamonds', { target_user_id: userId, diamond_count: amount });
    }

    async _regenerateUserDiamondsRpc(env, userId) {
        return this._diamondRpc(env, 'regenerate_user_diamonds', { target_user_id: userId });
    }

    async _diamondRpc(env, name, body) {
        try { return await serviceRoleRequest(env, `rpc/${name}`, { method: 'POST', body, timeoutMs: 4000 }); }
        catch (error) { console.warn('[Diamonds] RPC unavailable', { name, message: error.message }); return null; }
    }
}
