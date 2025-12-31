/**
 * Scheduled Cleanup Job (Cloudflare Function)
 * Periodically cleans up stale data from D1 and KV
 * 
 * Scheduled: /api/cron-cleanup (triggered by cron or manual request)
 */

import { jsonResponse } from '../_shared/utils.js';
import { cleanupStalePendingJobs } from '../_shared/transcript-db.js';

export async function onRequest(context) {
    const { env } = context;
    const db = env.VOCAB_DB;

    if (!db) {
        return jsonResponse({ error: 'Database binding (VOCAB_DB) missing' }, 500);
    }

    try {
        console.log('[Cron] Starting cleanup...');

        // 1. Cleanup stale pending jobs (older than 24h)
        await cleanupStalePendingJobs(db);

        // 2. Additional cleanups can be added here
        // (e.g. cleanup rate limits if not using expirationTtl)

        return jsonResponse({
            status: 'ok',
            message: 'Cleanup performed successfully',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('[Cron] Cleanup failed:', error.message);
        return jsonResponse({ error: error.message }, 500);
    }
}
