/**
 * Gladia Asynchronous Webhook Receiver (Cloudflare Function)
 * 
 * Endpoint: POST /api/gladia-webhook
 * 
 * Receives transcription completion callbacks from Gladia in the cloud.
 * Features:
 * 1. Dual-Auth: Primary Svix HMAC-SHA256 signature verification,
 *    with a derived HMAC token fallback (zero-downtime bootstrapping).
 * 2. Immediate <40ms HTTP 200 acknowledge to upstream.
 * 3. context.waitUntil() asynchronous processing:
 *    - Parses sentence cues (<3ms CPU)
 *    - Saves permanent transcript to R2
 *    - Updates D1 ai_transcription_jobs state machine
 *    - Executes idempotent diamond refund if audio failed
 */

import { verifySvixSignature, verifyDerivedWebhookToken } from '../utils/svix-verifier.js';
import { completeAiJob, atomicFailAndRefundAiJob } from '../data/transcript-db.js';
import { saveTranscriptToR2 } from '../data/transcript-r2.js';
import { addSubLanguage, saveVideoLanguages } from '../data/video-info-db.js';
import { cleanTranscriptSegments, extractGladiaSegments, extractGladiaDetectedLanguage } from '../utils/transcript-utils.js';
import { GladiaProvider } from '../providers/gladia.js';
import { DiamondService } from '../services/diamond.service.js';
import { CacheManager } from '../utils/cache-manager.js';
import { jsonResponse, handleOptions, sanitizeVideoId } from '../utils/utils.js';
import { enrichSegmentsWithTokens } from '../utils/tokenizer.js';

export function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env, waitUntil } = context;

    const url = new URL(request.url);
    const queryToken = url.searchParams.get('token');
    const jobId = url.searchParams.get('jobId');
    const rawVideoId = url.searchParams.get('videoId');
    const lang = url.searchParams.get('lang') || 'en';

    const videoId = sanitizeVideoId(rawVideoId);

    // Read raw body once for signature verification and JSON parsing
    const rawBody = await request.text();

    // -------------------------------------------------------------
    // Security: Dual-Auth Verification
    // -------------------------------------------------------------
    let isAuthorized = false;

    // 1. Primary: Svix HMAC-SHA256 Webhook Verification
    if (env.GLADIA_WEBHOOK_SECRET) {
        const svixId = request.headers.get('svix-id') || request.headers.get('webhook-id');
        const svixTimestamp = request.headers.get('svix-timestamp') || request.headers.get('webhook-timestamp');
        const svixSignature = request.headers.get('svix-signature') || request.headers.get('webhook-signature');

        const svixCheck = await verifySvixSignature(rawBody, {
            id: svixId,
            timestamp: svixTimestamp,
            signature: svixSignature
        }, env.GLADIA_WEBHOOK_SECRET);

        if (svixCheck.valid) {
            isAuthorized = true;
        } else {
            console.warn('[Gladia Webhook] Svix verification failed:', svixCheck.reason);
        }
    }

    // 2. Fallback: Query parameter derived HMAC token verification
    if (!isAuthorized && queryToken && env.GLADIA_API_KEY && jobId && videoId) {
        const derivedValid = await verifyDerivedWebhookToken(
            env.GLADIA_API_KEY,
            jobId,
            videoId,
            lang,
            queryToken
        );
        if (derivedValid) {
            isAuthorized = true;
        }
    }

    if (!isAuthorized) {
        console.error('[Gladia Webhook] Unauthorized webhook attempt rejected for videoId:', videoId, 'jobId:', jobId);
        return jsonResponse({ error: 'Unauthorized webhook signature' }, 401);
    }

    // -------------------------------------------------------------
    // Acknowledge Gladia immediately (<40ms HTTP 200)
    // -------------------------------------------------------------
    const ackResponse = jsonResponse({ received: true, jobId, videoId }, 200);

    // Process ingestion in background via waitUntil
    const backgroundTask = processGladiaWebhook(context, {
        rawBody,
        jobId,
        videoId,
        lang
    }).catch(err => {
        console.error('[Gladia Webhook] Background ingestion error:', err);
    });

    if (waitUntil) {
        waitUntil(backgroundTask);
    }

    return ackResponse;
}

/**
 * Asynchronous webhook payload processor
 */
async function processGladiaWebhook(context, { rawBody, jobId, videoId, lang }) {
    const { env } = context;
    const db = env.VOCAB_DB;
    const r2 = env.TRANSCRIPT_STORAGE;

    let payload;
    try {
        payload = JSON.parse(rawBody);
    } catch (parseErr) {
        console.error('[Gladia Webhook] Invalid JSON payload:', parseErr.message);
        return;
    }

    const event = payload.event || payload.action || '';
    const status = payload.payload?.status || payload.status || '';

    // Handle failure event
    if (event.includes('error') || status === 'error') {
        const errCode = payload.payload?.error?.code || 'GLADIA_FAILED';
        const errMsg = payload.payload?.error?.message || 'Gladia transcription failed';
        console.error(`[Gladia Webhook] Job ${jobId} reported error:`, errCode, errMsg);

        if (db && jobId) {
            const refundResult = await atomicFailAndRefundAiJob(db, jobId, errCode, errMsg);
            if (refundResult.shouldRefund && refundResult.job) {
                try {
                    const cacheManager = new CacheManager(env.TRANSCRIPT_CACHE);
                    const diamondService = new DiamondService(cacheManager);
                    const userObj = refundResult.job.user_id ? { id: refundResult.job.user_id } : null;
                    await diamondService.refundDiamond(
                        refundResult.job.client_id,
                        context,
                        env,
                        userObj,
                        refundResult.job.diamonds_charged || 1
                    );
                    console.log(`[Gladia Webhook] Refunded ${refundResult.job.diamonds_charged} diamonds for job ${jobId}`);
                } catch (refErr) {
                    console.error('[Gladia Webhook] Error processing diamond refund:', refErr.message);
                }
            }
        }
        return;
    }

    // Handle success event: extract segments using unified extractor
    let rawSegments = extractGladiaSegments(payload);

    // If segments are not embedded in webhook body, fetch them using Gladia API
    const gladiaJobId = payload.payload?.id || payload.id;
    let remoteJob = null;
    if ((!rawSegments || rawSegments.length === 0) && gladiaJobId && env.GLADIA_API_KEY) {
        try {
            const gladia = new GladiaProvider(env.GLADIA_API_KEY);
            remoteJob = await gladia.checkJobStatusById(gladiaJobId);
            rawSegments = extractGladiaSegments(remoteJob);
        } catch (fetchErr) {
            console.error(`[Gladia Webhook] Failed to fetch full transcript for Gladia ID ${gladiaJobId}:`, fetchErr.message);
        }
    }

    const cleanedSegments = cleanTranscriptSegments(rawSegments);
    const detectedLang = extractGladiaDetectedLanguage(remoteJob || payload, lang);

    if (cleanedSegments.length === 0) {
        console.warn(`[Gladia Webhook] No speech segments extracted for video ${videoId}, job ${jobId}`);
        if (db && jobId) {
            const refundResult = await atomicFailAndRefundAiJob(db, jobId, 'NO_SPEECH_DETECTED', 'Audio contains no detectable speech');
            if (refundResult.shouldRefund && refundResult.job) {
                const cacheManager = new CacheManager(env.TRANSCRIPT_CACHE);
                const diamondService = new DiamondService(cacheManager);
                const userObj = refundResult.job.user_id ? { id: refundResult.job.user_id } : null;
                await diamondService.refundDiamond(
                    refundResult.job.client_id,
                    context,
                    env,
                    userObj,
                    refundResult.job.diamonds_charged || 1
                );
            }
        }
        return;
    }

    // 1. Save permanent transcript to R2 (enriched with tokens)
    let r2Saved = true;
    if (r2 && videoId) {
        const enrichedSegments = await enrichSegmentsWithTokens(cleanedSegments, detectedLang);
        r2Saved = await saveTranscriptToR2(r2, videoId, detectedLang, enrichedSegments, 'ai');
    }

    if (!r2Saved && r2) {
        console.error(`[Gladia Webhook] Failed to save transcript to R2 for video ${videoId}, job ${jobId}`);
        return;
    }

    // 2. Update D1 state machine
    if (db && jobId) {
        await completeAiJob(db, jobId, detectedLang);
    }

    // 3. Update video languages registry in D1
    if (db && videoId) {
        try {
            await addSubLanguage(db, videoId, detectedLang);
            const saveLangs = Array.from(new Set([detectedLang, lang].filter(Boolean)));
            await saveVideoLanguages(db, videoId, saveLangs, null, null, null, false, null, null, [detectedLang]);
        } catch (metaErr) {
            console.error('[Gladia Webhook] Metadata save error:', metaErr.message);
        }
    }

    console.log(`[Gladia Webhook] Successfully ingested ${cleanedSegments.length} AI subtitle segments for video ${videoId} (${detectedLang})`);
}
