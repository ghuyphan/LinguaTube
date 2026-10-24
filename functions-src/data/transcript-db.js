/**
 * D1 Video Metadata & AI Transcription State Machine
 * Stores queryable metadata ONLY - actual transcript cues live in R2
 * 
 * Tables:
 * - video_meta: Records which transcripts exist (video_id, language, source)
 * - ai_transcription_jobs: Durable state machine for asynchronous Gladia jobs
 */

import { normalizeLanguageCode } from '../utils/transcript-utils.js';

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
export async function reserveAiJob(db, { videoId, language, userId = null, clientId, userTier = 'free', diamondsCharged = 1 }) {
    if (!db || !videoId || !language) throw new Error('Missing required parameters for reserveAiJob');
    const normLang = normalizeLanguageCode(language) || language;
    const id = generateJobId();

    try {
        await db.prepare(`
            INSERT INTO ai_transcription_jobs (
                id, video_id, language, user_id, client_id, user_tier,
                diamonds_charged, charge_status, refund_status, status, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', 'none', 'queued', strftime('%s', 'now'), strftime('%s', 'now'))
        `).bind(id, videoId, normLang, userId, clientId, userTier, diamondsCharged).run();

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
                updated_at = strftime('%s', 'now')
            WHERE id = ? AND status NOT IN ('completed', 'failed')
        `).bind(gladiaJobId, jobId).run();
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
        if (job.created_at && (nowSec - job.created_at) > 900 && !(await db.prepare("SELECT id FROM gladia_callback_inbox WHERE job_id=? AND status='pending' LIMIT 1").bind(job.id).first()) && !(job.ingestion_lease_until > nowSec)) {
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
        WHERE id = ? AND status IN ('queued','processing')
          AND ((ingestion_lease IS NULL AND ? IS NULL) OR (ingestion_lease=? AND ingestion_lease_until>strftime('%s','now')))
    `).bind(detectedLang, jobId, lease, lease).run();
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
