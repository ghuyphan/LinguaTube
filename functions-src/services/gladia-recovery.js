import { GladiaProvider } from '../providers/gladia.js';
import { atomicFailAndRefundAiJob, completeAiJob } from '../data/transcript-db.js';
import { saveTranscriptToR2 } from '../data/transcript-r2.js';
import { cleanTranscriptSegments, extractGladiaSegments, extractGladiaDetectedLanguage } from '../utils/transcript-utils.js';
import { enrichSegmentsWithTokens } from '../utils/tokenizer.js';
import { addSubLanguage, saveVideoLanguages } from '../data/video-info-db.js';
import { estimateTranscriptLevel } from '../utils/level-estimator.js';
import { recoverJobRefund } from './refund-recovery.js';

/** The caller authenticates first. Do not acknowledge an event until this commits. */
export async function recordGladiaNotification(db, { jobId, providerId, outcome, errorCode, errorMessage }) {
    const job = await db.prepare('SELECT * FROM ai_transcription_jobs WHERE id=?').bind(jobId).first();
    if (!job) throw new Error('Unknown transcription job');
    if (job.gladia_job_id && job.gladia_job_id !== providerId) throw new Error('Provider job identity mismatch');
    if (!/^[a-zA-Z0-9_-]{1,200}$/.test(providerId)) throw new Error('Invalid provider job identity');
    await db.prepare(`INSERT INTO gladia_callback_inbox(job_id,provider_job_id,outcome,error_code,error_message)
        SELECT ?,?,?,?,? WHERE EXISTS(SELECT 1 FROM ai_transcription_jobs WHERE id=? AND (gladia_job_id IS NULL OR gladia_job_id=?))
        ON CONFLICT(job_id,provider_job_id,outcome) DO NOTHING`)
        .bind(jobId, providerId, outcome, String(errorCode || '').slice(0, 80), String(errorMessage || '').slice(0, 300), jobId, providerId).run();
    const current = await db.prepare('SELECT gladia_job_id FROM ai_transcription_jobs WHERE id=?').bind(jobId).first();
    if (current?.gladia_job_id && current.gladia_job_id !== providerId) throw new Error('Provider job identity mismatch');
}

/** Polling and inbox recovery share this per-job lease and terminal transition. */
export async function ingestGladiaJob(env, jobId, provider = new GladiaProvider(env.GLADIA_API_KEY), deadline = Date.now() + 20000) {
    const db = env.VOCAB_DB;
    const lease = crypto.randomUUID();
    const job = await db.prepare(`UPDATE ai_transcription_jobs SET ingestion_lease=?,ingestion_lease_until=strftime('%s','now')+60
        WHERE id=? AND status IN ('queued','processing') AND gladia_job_id IS NOT NULL AND charge_status IN ('confirmed','legacy')
        AND (ingestion_lease_until IS NULL OR ingestion_lease_until<strftime('%s','now')) RETURNING *`).bind(lease, jobId).first();
    if (!job) return null;
    try {
        if (Date.now() >= deadline) throw new Error('Ingestion budget exhausted');
        const result = await provider.checkJobStatusById(job.gladia_job_id, { deadline });
        if (!['done', 'error'].includes(result.status)) return null;
        const segments = result.status === 'done' ? cleanTranscriptSegments(extractGladiaSegments(result)) : [];
        if (!segments.length) {
            await atomicFailAndRefundAiJob(db, job.id, result.status === 'error' ? 'GLADIA_ERROR' : 'NO_SPEECH_DETECTED',
                result.status === 'error' ? 'Gladia transcription failed' : 'Audio contains no detectable speech', lease);
            if (Date.now() < deadline) await recoverJobRefund(env, job.id, deadline);
            return { status: 'error', errorCode: result.status === 'error' ? 'GLADIA_ERROR' : 'NO_SPEECH_DETECTED', error: 'No transcription available' };
        }
        const language = extractGladiaDetectedLanguage(result, job.language);
        const enriched = await enrichSegmentsWithTokens(segments, language);
        if (Date.now() >= deadline) throw new Error('Ingestion budget exhausted');
        // Expiration/refund paths respect this lease. Recheck before publishing.
        const owns = await db.prepare(`SELECT id FROM ai_transcription_jobs WHERE id=? AND ingestion_lease=?
            AND ingestion_lease_until>strftime('%s','now') AND status IN ('queued','processing')`).bind(job.id, lease).first();
        if (!owns) throw new Error('Ingestion lease expired');
        if (!(await saveTranscriptToR2(env.TRANSCRIPT_STORAGE, job.video_id, language, enriched, 'ai', { jobId: job.id, createdAt: job.created_at }))) throw new Error('Transcript persistence unavailable');
        if (!(await completeAiJob(db, job.id, language, lease))) throw new Error('Completion unconfirmed');
        const last = enriched[enriched.length - 1];
        const level = estimateTranscriptLevel(enriched, language);
        await Promise.allSettled([
            addSubLanguage(db, job.video_id, language),
            saveVideoLanguages(db, job.video_id, [language], Math.round((last.start || 0) + (last.duration || 0)), null, null, false,
                level ? { [language]: level } : null, null, [language])
        ]);
        return { status: 'done', language, segments: enriched };
    } finally {
        await db.prepare('UPDATE ai_transcription_jobs SET ingestion_lease=NULL,ingestion_lease_until=NULL WHERE id=? AND ingestion_lease=?').bind(job.id, lease).run();
    }
}

export async function recoverGladiaBatch(env, limit = 25, deadline = Date.now() + 8000) {
    const db = env.VOCAB_DB;
    const { results } = await db.prepare(`SELECT * FROM gladia_callback_inbox WHERE status='pending'
        AND next_attempt<=strftime('%s','now') ORDER BY next_attempt,id LIMIT ?`).bind(Math.min(25, limit)).all();
    let confirmed = 0;
    for (const event of results || []) {
        if (Date.now() >= deadline) break;
        try {
            const job = await db.prepare('SELECT * FROM ai_transcription_jobs WHERE id=?').bind(event.job_id).first();
            if (!job || (job.gladia_job_id && job.gladia_job_id !== event.provider_job_id)) throw new Error('Notification identity mismatch');
            if (!job.gladia_job_id && job.charge_status === 'confirmed') {
                await db.prepare('UPDATE ai_transcription_jobs SET gladia_job_id=? WHERE id=? AND gladia_job_id IS NULL').bind(event.provider_job_id, job.id).run();
            }
            if (!['completed', 'failed'].includes(job.status)) await ingestGladiaJob(env, job.id, undefined, deadline);
            const terminal = await db.prepare("SELECT id FROM ai_transcription_jobs WHERE id=? AND status IN ('completed','failed')").bind(job.id).first();
            if (!terminal) throw new Error('Provider processing or job leased');
            await db.prepare("UPDATE gladia_callback_inbox SET status='confirmed' WHERE id=?").bind(event.id).run();
            confirmed++;
        } catch {
            await db.prepare(`UPDATE gladia_callback_inbox SET attempts=attempts+1,next_attempt=strftime('%s','now')+? WHERE id=? AND status='pending'`)
                .bind(Math.min(3600, 30 * 2 ** Math.min(event.attempts, 7)), event.id).run();
        }
    }
    return { selected: results?.length || 0, confirmed };
}
