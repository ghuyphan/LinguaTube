/**
 * Diamond Credits API (Cloudflare Function)
 * Returns current diamond status, max diamonds, next regeneration timestamp, and interval.
 */

import { validateAuthToken } from '../middlewares/auth.js';
import { getClientIdentifier } from '../middlewares/rate-limiter.js';
import { CacheManager } from '../utils/cache-manager.js';
import { DiamondService } from '../services/diamond.service.js';
import { jsonResponse, handleOptions } from '../utils/utils.js';

export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request, env } = context;

    try {
        const authResult = await validateAuthToken(request, env);
        const clientId = getClientIdentifier(request, authResult);
        const user = authResult.valid ? authResult.user : null;

        const cache = env.TRANSCRIPT_CACHE;
        const cacheManager = new CacheManager(cache);
        const diamondService = new DiamondService(cacheManager);

        const status = await diamondService.getDiamonds(clientId, user);

        return jsonResponse({
            success: true,
            diamonds: status.diamonds,
            maxDiamonds: status.maxDiamonds,
            nextRegenAt: status.nextRegenAt,
            regenIntervalMs: status.regenIntervalMs
        }, 200, {
            'Cache-Control': 'no-store, no-cache, must-revalidate'
        });
    } catch (err) {
        console.error('[Diamonds API] Error fetching diamond status:', err.message);
        return jsonResponse({
            success: false,
            error: 'Failed to retrieve diamond credits'
        }, 500);
    }
}
