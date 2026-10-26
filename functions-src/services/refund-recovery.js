import { serviceRoleRequest } from './supabase-rest.js';
import { refundAnonymousJob } from '../data/anonymous-credits.js';

/** A lease only limits concurrent attempts; the credit ledger enforces idempotency. */
export async function recoverJobRefund(env, jobId, deadline = Date.now() + 5000) {
    if (Date.now() >= deadline) return false;
    const db = env.VOCAB_DB;
    const lease = crypto.randomUUID();
    const job = await db.prepare(`UPDATE ai_transcription_jobs SET refund_lease=?,refund_lease_until=strftime('%s','now')+60,
        refund_attempts=refund_attempts+1 WHERE id=? AND refund_status='pending'
        AND refund_next_attempt<=strftime('%s','now') AND (refund_lease_until IS NULL OR refund_lease_until<strftime('%s','now')) RETURNING *`)
        .bind(lease, jobId).first();
    if (!job) return false;
    try {
        const result = job.user_id
            ? await serviceRoleRequest(env, 'rpc/refund_transcription_credits', { method: 'POST', timeoutMs: Math.max(1, Math.min(5000, deadline - Date.now())), body: {
                p_job_id: job.id, p_user_id: job.user_id, p_amount: job.diamonds_charged
            } })
            : { success: await refundAnonymousJob(db, env.TRANSCRIPT_CACHE, job) };
        if (result?.success !== true || (job.user_id &&
            !['refunded', 'cancelled', 'account_deleted'].includes(result.state))) {
            throw new Error('Refund unconfirmed');
        }
        const confirmed = await db.prepare(`UPDATE ai_transcription_jobs SET refund_status='confirmed',diamonds_refunded=1,
            refund_lease=NULL,refund_lease_until=NULL WHERE id=? AND refund_lease=? AND refund_status='pending'
            RETURNING id`).bind(job.id, lease).first();
        return confirmed?.id === job.id;
    } catch (error) {
        const delay = Math.min(3600, 30 * 2 ** Math.min(job.refund_attempts, 7));
        await db.prepare(`UPDATE ai_transcription_jobs SET refund_lease=NULL,refund_lease_until=NULL,
            refund_next_attempt=strftime('%s','now')+? WHERE id=? AND refund_lease=?`).bind(delay, job.id, lease).run();
        console.warn('[Refund] Deferred recovery', { jobId: job.id, attempt: job.refund_attempts, message: error.message });
        return false;
    }
}

export async function recoverRefundBatch(env, limit = 25, deadline = Date.now() + 20000) {
    const { results } = await env.VOCAB_DB.prepare(`SELECT id FROM ai_transcription_jobs WHERE refund_status='pending'
        AND refund_next_attempt<=strftime('%s','now') AND (refund_lease_until IS NULL OR refund_lease_until<strftime('%s','now'))
        ORDER BY refund_next_attempt,id LIMIT ?`).bind(Math.min(50, limit)).all();
    let confirmed = 0;
    for (const job of results || []) {
        if (Date.now() >= deadline) break;
        if (await recoverJobRefund(env, job.id, deadline)) confirmed++;
    }
    return { selected: results?.length || 0, confirmed };
}
