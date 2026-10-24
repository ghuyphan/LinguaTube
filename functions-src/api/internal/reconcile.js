import { recoverGladiaBatch } from '../../services/gladia-recovery.js';
import { matchesSecret } from '../../utils/secret-auth.js';
import { jsonResponse } from '../../utils/utils.js';
import { atomicFailAndRefundAiJob } from '../../data/transcript-db.js';
import { recoverRefundBatch } from '../../services/refund-recovery.js';
import { recoverRevenueCatEvent } from '../../services/revenuecat-recovery.js';

export async function onRequestPost({ request, env }) {
    if (!env.BACKEND_MAINTENANCE_SECRET) return jsonResponse({ error: 'Maintenance unavailable' }, 503);
    if (!(await matchesSecret(request.headers.get('Authorization'), `Bearer ${env.BACKEND_MAINTENANCE_SECRET}`))) {
        return jsonResponse({ error: 'Unauthorized' }, 401);
    }
    const started = Date.now();
    try {
        const db = env.VOCAB_DB;
        const callbacks = await recoverGladiaBatch(env, 25, started + 8000);
        const { results } = await db.prepare(`SELECT id FROM ai_transcription_jobs WHERE status IN ('queued','processing')
            AND NOT EXISTS(SELECT 1 FROM gladia_callback_inbox i WHERE i.job_id=ai_transcription_jobs.id AND i.status='pending')
            AND (ingestion_lease_until IS NULL OR ingestion_lease_until<strftime('%s','now')) AND created_at<strftime('%s','now')-900 AND charge_status<>'legacy' ORDER BY created_at LIMIT 25`).all();
        for (const job of results || []) await atomicFailAndRefundAiJob(db, job.id, 'TIMEOUT_EXPIRED', 'Transcription timed out');
        const refunds = await recoverRefundBatch(env, 25, started + 14000);
        let subscriptions = 0;
        while (subscriptions < 5 && Date.now() < started + 20000) {
            if (!(await recoverRevenueCatEvent(env, null, started + 20000))) break;
            subscriptions++;
        }
        console.log(JSON.stringify({ event: 'backend_recovery', callbacks, refunds, subscriptions, elapsedMs: Date.now()-started }));
        return jsonResponse({ success: true, callbacks, refunds, subscriptions }, 200, { 'Cache-Control': 'no-store' });
    } catch (error) {
        console.error('[Recovery] Batch unavailable', { message: error.message });
        return jsonResponse({ error: 'Recovery unavailable' }, 503);
    }
}
