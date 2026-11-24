/**
 * D1 Video Metadata & AI Transcription State Machine
 * Stores queryable metadata ONLY - actual transcript cues live in R2
 * 
 * Tables:
 * - video_meta: Records which transcripts exist (video_id, language, source)
 * - ai_transcription_jobs: Durable state machine for asynchronous Gladia jobs
 */

import { normalizeLanguageCode } from '../utils/transcript-utils.js';

export const AI_AUDIO_BUDGET_EXHAUSTED = 'AI_AUDIO_BUDGET_EXHAUSTED';
const SCRIBE_AUDIO_LIMIT = 25 * 60 * 60;
const SCRIBE_AUDIO_USED = `
    SELECT COALESCE(SUM(ceil(verified_duration_seconds)), 0)
    FROM (
        SELECT verified_duration_seconds FROM ai_transcription_jobs
        WHERE asr_provider='elevenlabs' AND submission_state='not_started' AND status='queued'
        UNION ALL
        SELECT verified_duration_seconds FROM ai_transcription_jobs
        WHERE asr_provider='elevenlabs' AND submission_state IN ('submitting','uncertain','accepted')
          AND COALESCE(submission_started_at, created_at)>=?
    )
`;

export function scribeBudgetCycle(env, now = Date.now()) {
    if (env?.ASR_PROVIDER !== 'elevenlabs' || !env.ELEVENLABS_BILLING_ANCHOR) return null;
    const value = env.ELEVENLABS_BILLING_ANCHOR;
    const anchor = new Date(value);
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value) ||
        !Number.isFinite(+anchor) || anchor.toISOString().replace('.000Z', 'Z') !== value) {
        throw Object.assign(new Error('AI_SERVICE_ERROR: AI audio budget configuration is invalid.'), { status: 503 });
    }
    const current = new Date(now);
    const boundary = offset => {
        const month = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth() + offset, 1));
        const days = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0)).getUTCDate();
        month.setUTCDate(Math.min(anchor.getUTCDate(), days));
        return month.setUTCHours(anchor.getUTCHours(), anchor.getUTCMinutes(), anchor.getUTCSeconds()) / 1000;
    };
    const offset = now / 1000 >= boundary(0) ? 0 : -1;
    return { start: boundary(offset), end: boundary(offset + 1) };
}

export async function scribeBudgetAllows(db, cycle, seconds) {
    const row = await db.prepare(`SELECT (${SCRIBE_AUDIO_USED}) + ceil(?) <= ? AS allowed`)
        .bind(cycle.start, seconds, SCRIBE_AUDIO_LIMIT).first();
    return row?.allowed === 1;
}

export function generateJobId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return 'job_' + crypto.randomUUID().replace(/-/g, '').slice(0, 16);
    }
    throw new Error('Secure job ID generation unavailable');
}

// ============================================================================
// Durable AI Transcription Jobs State Machine
// ============================================================================

/**
 * Reserve an AI transcription job atomically using Partial Unique Index.
 * If another request already holds the active lock for (video_id, language),
 * the unique constraint is caught and the existing job is returned with isNew: false.
 * 
 * @param {D1Database} db
 * @param {object} params
 * @param {string} params.videoId
 * @param {string} params.language
 * @param {string} [params.userId]
 * @param {string} params.clientId
 * @param {string} [params.userTier]
 * @param {number} [params.diamondsCharged]
 * @returns {Promise<{ isNew: boolean, job: object }>}
 */
export async function reserveAiJob(db, { videoId, language, userId = null, clientId, userTier = 'free', diamondsCharged = 1, verifiedDurationSeconds = null, durationSource = null, durationVerifiedAt = null, scribeCycle = null, assetGeneration = null }) {
    if (!db || !videoId || !language) throw new Error('Missing required parameters for reserveAiJob');
    const normLang = normalizeLanguageCode(language) || language;
    const id = generateJobId();

    try {
        const inserted = await db.prepare(`
            INSERT INTO ai_transcription_jobs (
                id, video_id, language, user_id, client_id, user_tier,
                diamonds_charged, verified_duration_seconds, duration_source, duration_verified_at, charge_status, refund_status, submission_state, status, created_at, updated_at, asr_provider
                ${assetGeneration == null ? '' : ', asset_generation'}
            ) SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'none', 'not_started', 'queued', unixepoch(), unixepoch(), ? ${assetGeneration == null ? '' : ', ?'}
            WHERE 1
            ${scribeCycle ? `AND unixepoch()>=? AND unixepoch()<? AND (${SCRIBE_AUDIO_USED}) + ceil(?) <= ?` : ''}
            ${assetGeneration == null ? '' : `AND COALESCE((
                SELECT CASE WHEN embed_blocked=0 THEN asset_generation ELSE -1 END
                FROM video_languages WHERE video_id=?
            ),0)=?`}
        `).bind(id, videoId, normLang, userId, clientId, userTier, diamondsCharged, verifiedDurationSeconds, durationSource, durationVerifiedAt,
            scribeCycle ? 'elevenlabs' : 'gladia',
            ...(assetGeneration == null ? [] : [assetGeneration]),
            ...(scribeCycle ? [scribeCycle.start, scribeCycle.end, scribeCycle.start, verifiedDurationSeconds, SCRIBE_AUDIO_LIMIT] : []),
            ...(assetGeneration == null ? [] : [videoId, assetGeneration])
        ).run();
        if (assetGeneration != null && inserted.meta?.changes === 0) {
            const current = await db.prepare('SELECT embed_blocked, asset_generation FROM video_languages WHERE video_id=?').bind(videoId).first();
            if (current?.embed_blocked || (current?.asset_generation ?? 0) !== assetGeneration) {
                throw Object.assign(new Error('VIDEO_ELIGIBILITY_CHANGED: Video availability changed. Please retry.'), { status: 503, retryAfterSeconds: 5 });
            }
        }
        if (scribeCycle && inserted.meta?.changes === 0) {
            const existing = await getActiveAiJob(db, videoId, normLang);
            if (existing) return { isNew: false, job: existing };
            throw Object.assign(new Error(`${AI_AUDIO_BUDGET_EXHAUSTED}: New AI subtitles are temporarily paused for this video because the shared audio budget is low.`), { status: 429 });
        }

        const newJob = await getAiJobById(db, id);
        return {
            isNew: true,
            job: newJob || { id, video_id: videoId, language: normLang, user_id: userId, client_id: clientId, user_tier: userTier, diamonds_charged: diamondsCharged, status: 'queued' }
        };
    } catch (err) {
        // Catch partial unique index collision (idx_ai_jobs_active_unique)
        if (err.message && (err.message.includes('UNIQUE constraint failed') || err.message.includes('SQLITE_CONSTRAINT'))) {
            const existing = await getActiveAiJob(db, videoId, normLang);
            if (existing) {
                return { isNew: false, job: existing };
            }
        }
        throw err;
    }
}

/**
 * Update job from queued to processing with Gladia job ID
 * @param {D1Database} db
 * @param {string} jobId
 * @param {string} gladiaJobId
 */
export async function activateAiJob(db, jobId, gladiaJobId) {
    if (!db || !jobId) return;
    try {
        await db.prepare(`
            UPDATE ai_transcription_jobs
            SET status = CASE WHEN status = 'queued' THEN 'processing' ELSE status END,
                gladia_job_id = COALESCE(gladia_job_id, ?),
                submission_state = 'accepted',
                next_provider_check_at = 0,
                updated_at = strftime('%s', 'now')
            WHERE id = ? AND status NOT IN ('completed', 'failed') AND (gladia_job_id IS NULL OR gladia_job_id = ?)
        `).bind(gladiaJobId, jobId, gladiaJobId).run();
    } catch (err) {
        console.error('[D1] activateAiJob error:', err.message);
    }
}

/**
 * Get job record by ID
 * @param {D1Database} db
 * @param {string} jobId
 * @returns {Promise<object | null>}
 */
export async function getAiJobById(db, jobId) {
    if (!db || !jobId) return null;
    return await db.prepare(`
        SELECT * FROM ai_transcription_jobs WHERE id = ?
    `).bind(jobId).first();
}

export const ASR_SUBMISSION_TIMEOUT = 'ASR_SUBMISSION_TIMEOUT';
export const ASR_SUBMISSION_TIMEOUT_MESSAGE = 'Could not confirm AI transcription. Your diamond charge will be refunded.';

export const SCRIBE_UNCONFIRMED_TIMEOUT_SECONDS = 15 * 60;
export const SCRIBE_ACCEPTED_TIMEOUT_SECONDS = 60 * 60;

export async function expireStalledScribeJobs(db, jobId = null) {
    const { results } = await db.prepare(`
        UPDATE ai_transcription_jobs
        SET status='failed', error_code=?, error_message=?, refund_status='pending',
            updated_at=unixepoch(), completed_at=unixepoch()
        WHERE id IN (
            SELECT j.id FROM ai_transcription_jobs j
            WHERE (? IS NULL OR j.id=?) AND j.status IN ('queued','processing')
              AND j.asr_provider='elevenlabs'
              AND j.charge_status='confirmed' AND j.refund_status='none'
              AND (
                  (j.gladia_job_id IS NULL AND j.submission_state IN ('submitting','uncertain')
                      AND COALESCE(j.submission_started_at,j.created_at)<=unixepoch()-?)
                  OR (j.gladia_job_id IS NOT NULL AND j.submission_state='accepted'
                      AND COALESCE(j.submission_started_at,j.created_at)<=unixepoch()-?)
              )
              AND (j.ingestion_lease_until IS NULL OR j.ingestion_lease_until<unixepoch())
              AND NOT EXISTS (SELECT 1 FROM gladia_callback_inbox i WHERE i.job_id=j.id AND i.status='pending')
            ORDER BY j.created_at LIMIT 25
        )
        RETURNING id
    `).bind(ASR_SUBMISSION_TIMEOUT, ASR_SUBMISSION_TIMEOUT_MESSAGE, jobId, jobId,
        SCRIBE_UNCONFIRMED_TIMEOUT_SECONDS, SCRIBE_ACCEPTED_TIMEOUT_SECONDS).all();
    return results || [];
}

/**
 * Get active job by videoId and language (queued or processing)
 * Includes 15-minute auto-expiry for zombie jobs
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string} language
 * @returns {Promise<object | null>}
 */
export async function getActiveAiJob(db, videoId, language, _diamondService = null, _env = null, _context = null) {
    if (!db || !videoId || !language) return null;
    const normLang = normalizeLanguageCode(language) || language;
    try {
        const job = await db.prepare(`
            SELECT * FROM ai_transcription_jobs 
            WHERE video_id = ? AND language = ? AND status IN ('queued', 'processing')
            ORDER BY created_at DESC LIMIT 1
        `).bind(videoId, normLang).first();

        if (!job) return null;

        // Auto-expire zombie jobs older than 15 minutes (900 seconds)
        const nowSec = Math.floor(Date.now() / 1000);
        if (!['submitting', 'uncertain', 'accepted'].includes(job.submission_state) && job.created_at && (nowSec - job.created_at) > 900 && !(await db.prepare("SELECT id FROM gladia_callback_inbox WHERE job_id=? AND status='pending' LIMIT 1").bind(job.id).first()) && !(job.ingestion_lease_until > nowSec)) {
            console.warn(`[D1] Auto-expiring zombie job ${job.id} for video ${videoId} (age: ${nowSec - job.created_at}s)`);
            await atomicFailAndRefundAiJob(db, job.id, 'TIMEOUT_EXPIRED', 'Transcription job timed out after 15 minutes');
            return null;
        }

        return job;
    } catch (err) {
        console.error('[D1] getActiveAiJob error:', err.message);
        return null;
    }
}

/**
 * Mark job as completed
 * @param {D1Database} db
 * @param {string} jobId
 * @param {string} [detectedLang]
 */
export async function completeAiJob(db, jobId, detectedLang = null, lease = null) {
    if (!db || !jobId) return;
    const result = await db.prepare(`
        UPDATE ai_transcription_jobs
        SET status = 'completed',
            detected_language = COALESCE(?, detected_language),
            updated_at = strftime('%s', 'now'),
            completed_at = strftime('%s', 'now')
        WHERE id = ? AND (status IN ('queued','processing') OR
            (status='failed' AND asr_provider='elevenlabs' AND error_code=? AND ? IS NOT NULL))
          AND ((ingestion_lease IS NULL AND ? IS NULL) OR (ingestion_lease=? AND ingestion_lease_until>strftime('%s','now')))
    `).bind(detectedLang, jobId, ASR_SUBMISSION_TIMEOUT, lease, lease, lease).run();
    return (result.meta?.changes ?? 0) > 0;
}

/**
 * Atomically fail the job and persist refund intent; confirmation happens after the credit commits
 * @param {D1Database} db
 * @param {string} jobId
 * @param {string} errorCode
 * @param {string} errorMessage
 * @returns {Promise<{ shouldRefund: boolean, job: object | null }>}
 */
export async function atomicFailAndRefundAiJob(db, jobId, errorCode = 'AI_FAILED', errorMessage = 'Transcription failed', ingestionLease = null) {
    if (!db || !jobId) return { shouldRefund: false, job: null };
    try {
        const res = await db.prepare(`
            UPDATE ai_transcription_jobs
            SET status = 'failed',
                error_code = ?,
                error_message = ?,
                updated_at = strftime('%s', 'now'),
                completed_at = strftime('%s', 'now'),
                refund_status = CASE WHEN refund_status = 'legacy' THEN 'legacy' ELSE 'pending' END
            WHERE id = ? AND (diamonds_refunded = 0 OR refund_status = 'legacy') AND refund_status IN ('none','legacy') AND status <> 'completed'
              AND (ingestion_lease_until IS NULL OR ingestion_lease_until<strftime('%s','now') OR ingestion_lease=?)
        `).bind(errorCode, errorMessage, jobId, ingestionLease).run();

        const changes = res?.meta?.changes ?? (res?.changes || 0);
        const job = await getAiJobById(db, jobId);
        return {
            shouldRefund: changes > 0 && job?.refund_status !== 'legacy',
            job
        };
    } catch (err) {
        console.error('[D1] atomicFailAndRefundAiJob error:', err.message);
        throw err;
    }
}
