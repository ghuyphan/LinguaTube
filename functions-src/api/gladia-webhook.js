import { normalizeLanguageCode } from '../utils/transcript-utils.js';
import { recordGladiaNotification, recoverGladiaBatch } from '../services/gladia-recovery.js';
import { verifySvixSignature, verifyDerivedWebhookToken } from '../utils/svix-verifier.js';
import { jsonResponse, handleOptions, sanitizeVideoId } from '../utils/utils.js';

export function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;

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

    try {
        const payload = JSON.parse(rawBody);
        const job = await env.VOCAB_DB.prepare('SELECT * FROM ai_transcription_jobs WHERE id=?').bind(jobId).first();
        if (!job || job.video_id !== videoId || job.language !== (normalizeLanguageCode(lang) || lang)) return jsonResponse({ error: 'Job identity mismatch' }, 409);
        const providerId = payload.payload?.id || payload.id || job.gladia_job_id;
        if (job.gladia_job_id && providerId !== job.gladia_job_id) return jsonResponse({ error: 'Provider identity mismatch' }, 409);
        const status = payload.payload?.status || payload.status;
        const event = payload.event || payload.action || '';
        const outcome = status === 'error' || event.includes('error') ? 'error' :
            (['done', 'completed'].includes(status) || /done|success|completed/.test(event) ? 'done' : null);
        if (!outcome) return jsonResponse({ received: true, status: 'ignored_nonterminal' });
        await recordGladiaNotification(env.VOCAB_DB, { jobId, providerId, outcome,
            errorCode: payload.payload?.error?.code, errorMessage: payload.payload?.error?.message });
        if (context.waitUntil) context.waitUntil(recoverGladiaBatch(env).catch(() => console.warn('[Gladia] Recovery deferred')));
        return jsonResponse({ received: true, jobId, status: 'queued' });
    } catch {
        return jsonResponse({ error: 'Callback persistence unavailable' }, 503, { 'Cache-Control': 'no-store' });
    }
}
