/**
 * D1 Video Metadata & AI Transcription State Machine
 * Stores queryable metadata ONLY - actual transcript cues live in R2
 * 
 * Tables:
 * - video_meta: Records which transcripts exist (video_id, language, source)
 * - ai_transcription_jobs: Durable state machine for asynchronous Gladia jobs
 * - pending_jobs: (Legacy fallback table for older client polling)
 */

export function generateJobId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return 'job_' + crypto.randomUUID().replace(/-/g, '').slice(0, 16);
    }
    return 'job_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
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
    const id = generateJobId();

    try {
        await db.prepare(`
            INSERT INTO ai_transcription_jobs (
                id, video_id, language, user_id, client_id, user_tier,
                diamonds_charged, status, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, 'queued', strftime('%s', 'now'), strftime('%s', 'now'))
        `).bind(id, videoId, language, userId, clientId, userTier, diamondsCharged).run();

        const newJob = await getAiJobById(db, id);
        return {
            isNew: true,
            job: newJob || { id, video_id: videoId, language, user_id: userId, client_id: clientId, user_tier: userTier, diamonds_charged: diamondsCharged, status: 'queued' }
        };
    } catch (err) {
        // Catch partial unique index collision (idx_ai_jobs_active_unique)
        if (err.message && (err.message.includes('UNIQUE constraint failed') || err.message.includes('SQLITE_CONSTRAINT'))) {
            const existing = await getActiveAiJob(db, videoId, language);
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
            SET status = 'processing',
                gladia_job_id = ?,
                updated_at = strftime('%s', 'now')
            WHERE id = ?
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
    try {
        return await db.prepare(`
            SELECT * FROM ai_transcription_jobs WHERE id = ?
        `).bind(jobId).first();
    } catch (err) {
        console.error('[D1] getAiJobById error:', err.message);
        return null;
    }
}

/**
 * Get active job by videoId and language (queued or processing)
 * Includes 15-minute auto-expiry for zombie jobs
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string} language
 * @returns {Promise<object | null>}
 */
export async function getActiveAiJob(db, videoId, language) {
    if (!db || !videoId || !language) return null;
    try {
        const job = await db.prepare(`
            SELECT * FROM ai_transcription_jobs 
            WHERE video_id = ? AND language = ? AND status IN ('queued', 'processing')
            ORDER BY created_at DESC LIMIT 1
        `).bind(videoId, language).first();

        if (!job) return null;

        // Auto-expire zombie jobs older than 15 minutes (900 seconds)
        const nowSec = Math.floor(Date.now() / 1000);
        if (job.created_at && (nowSec - job.created_at) > 900) {
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
export async function completeAiJob(db, jobId, detectedLang = null) {
    if (!db || !jobId) return;
    try {
        await db.prepare(`
            UPDATE ai_transcription_jobs
            SET status = 'completed',
                detected_language = COALESCE(?, detected_language),
                updated_at = strftime('%s', 'now'),
                completed_at = strftime('%s', 'now')
            WHERE id = ?
        `).bind(detectedLang, jobId).run();
    } catch (err) {
        console.error('[D1] completeAiJob error:', err.message);
    }
}

/**
 * Atomically mark job as failed and flag refund if not already refunded
 * @param {D1Database} db
 * @param {string} jobId
 * @param {string} errorCode
 * @param {string} errorMessage
 * @returns {Promise<{ shouldRefund: boolean, job: object | null }>}
 */
export async function atomicFailAndRefundAiJob(db, jobId, errorCode = 'AI_FAILED', errorMessage = 'Transcription failed') {
    if (!db || !jobId) return { shouldRefund: false, job: null };
    try {
        const res = await db.prepare(`
            UPDATE ai_transcription_jobs
            SET status = 'failed',
                error_code = ?,
                error_message = ?,
                updated_at = strftime('%s', 'now'),
                completed_at = strftime('%s', 'now'),
                diamonds_refunded = 1
            WHERE id = ? AND diamonds_refunded = 0
        `).bind(errorCode, errorMessage, jobId).run();

        const changes = res?.meta?.changes ?? (res?.changes || 0);
        const job = await getAiJobById(db, jobId);
        return {
            shouldRefund: changes > 0,
            job
        };
    } catch (err) {
        console.error('[D1] atomicFailAndRefundAiJob error:', err.message);
        return { shouldRefund: false, job: null };
    }
}

/**
 * Delete job reservation (e.g. if Turnstile or payment validation aborts immediately)
 * @param {D1Database} db
 * @param {string} jobId
 */
export async function deleteAiJob(db, jobId) {
    if (!db || !jobId) return;
    try {
        await db.prepare(`
            DELETE FROM ai_transcription_jobs WHERE id = ?
        `).bind(jobId).run();
    } catch (err) {
        console.error('[D1] deleteAiJob error:', err.message);
    }
}

// ============================================================================
// Legacy Pending Jobs (for backwards compatibility with older client versions)
// ============================================================================

export async function savePendingJob(db, videoId, language, resultUrl) {
    if (!db || !videoId || !resultUrl) return;
    try {
        await db.prepare(`
            INSERT OR REPLACE INTO pending_jobs 
            (video_id, language, result_url, created_at)
            VALUES (?, ?, ?, strftime('%s', 'now'))
        `).bind(videoId, language, resultUrl).run();
    } catch (err) {
        console.error('[D1] savePendingJob error:', err.message);
    }
}

export async function getPendingJob(db, videoId) {
    if (!db) return null;
    try {
        return await db.prepare(`
            SELECT result_url, language FROM pending_jobs 
            WHERE video_id = ? AND created_at > strftime('%s', 'now') - 3600
        `).bind(videoId).first();
    } catch (err) {
        console.error('[D1] getPendingJob error:', err.message);
        return null;
    }
}

export async function getPendingJobByResultUrl(db, resultUrl) {
    if (!db || !resultUrl) return null;
    try {
        return await db.prepare(`
            SELECT video_id, language FROM pending_jobs 
            WHERE result_url = ? AND created_at > strftime('%s', 'now') - 3600
        `).bind(resultUrl).first();
    } catch (err) {
        console.error('[D1] getPendingJobByResultUrl error:', err.message);
        return null;
    }
}

export async function deletePendingJob(db, videoId) {
    if (!db) return;
    try {
        await db.prepare(`
            DELETE FROM pending_jobs WHERE video_id = ?
        `).bind(videoId).run();
    } catch (err) {
        console.error('[D1] deletePendingJob error:', err.message);
    }
}

export async function cleanupStaleJobs(db) {
    if (!db) return;
    try {
        await db.prepare(`
            DELETE FROM pending_jobs 
            WHERE created_at < strftime('%s', 'now') - 3600
        `).run();
    } catch {
        // Non-blocking
    }
}
