import { ELEVENLABS_MAX_RESULT_BYTES, elevenLabsCallbackKey, toElevenLabsResult } from '../providers/elevenlabs.js';
import { recoverGladiaBatch } from '../services/gladia-recovery.js';
import { ASR_SUBMISSION_TIMEOUT } from '../data/transcript-db.js';
import { readBoundedBody } from '../utils/response-body.js';
import { jsonResponse } from '../utils/utils.js';

async function verifySignature(bytes, signature, secret) {
    const params = new URLSearchParams((signature || '').replaceAll(',', '&'));
    const timestamp = params.get('t');
    const digest = params.get('v0');
    if (!secret || !/^\d{1,12}$/.test(timestamp || '') || !/^[a-f0-9]{64}$/i.test(digest || '') ||
        Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;
    const encoder = new TextEncoder();
    const prefix = encoder.encode(`${timestamp}.`);
    const message = new Uint8Array(prefix.length + bytes.length);
    message.set(prefix);
    message.set(bytes, prefix.length);
    const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    const signatureBytes = Uint8Array.from(digest.match(/../g), byte => parseInt(byte, 16));
    return await crypto.subtle.verify('HMAC', key, signatureBytes, message);
}

export async function onRequestPost(context) {
    const { request, env } = context;
    if (!env.ELEVENLABS_WEBHOOK_SECRET) return jsonResponse({ error: 'Webhook unavailable' }, 503);
    let bytes;
    try {
        bytes = await readBoundedBody(request, AbortSignal.timeout(10000), ELEVENLABS_MAX_RESULT_BYTES);
    } catch {
        return jsonResponse({ error: 'Callback body unavailable' }, 503);
    }
    if (!bytes.length) return jsonResponse({ error: 'Callback body required' }, 400);
    if (!(await verifySignature(bytes, request.headers.get('elevenlabs-signature'), env.ELEVENLABS_WEBHOOK_SECRET))) {
        return jsonResponse({ error: 'Unauthorized webhook signature' }, 401);
    }

    let event;
    try {
        event = JSON.parse(new TextDecoder().decode(bytes));
    } catch {
        return jsonResponse({ error: 'Invalid webhook JSON' }, 400);
    }
    const success = event?.type === 'speech_to_text_transcription';
    if (!success && event?.type !== 'webhook_error') return jsonResponse({ received: true });
    const data = success ? event.data : event;
    const jobId = data?.webhook_metadata?.voca_job_id;
    if (typeof jobId !== 'string' || !/^job_[a-f0-9]{16}$/.test(jobId)) return jsonResponse({ received: true });

    try {
        const db = env.VOCAB_DB;
        const job = await db.prepare('SELECT * FROM ai_transcription_jobs WHERE id=?').bind(jobId).first();
        if (!job || job.asr_provider !== 'elevenlabs' || job.charge_status !== 'confirmed') {
            return jsonResponse({ error: 'Job identity mismatch' }, 409);
        }
        if (job.status === 'completed' || (job.status === 'failed' &&
            !(success && job.error_code === ASR_SUBMISSION_TIMEOUT))) return jsonResponse({ received: true });

        if (success) {
            const transcription = data.transcription;
            if (!Array.isArray(transcription?.words)) return jsonResponse({ error: 'Transcript payload unavailable' }, 503);
            if (job.gladia_job_id && transcription.transcription_id && job.gladia_job_id !== transcription.transcription_id) {
                return jsonResponse({ error: 'Provider identity mismatch' }, 409);
            }
            const put = await env.TRANSCRIPT_STORAGE.put(elevenLabsCallbackKey(jobId), JSON.stringify(toElevenLabsResult(transcription)));
            if (!put) throw new Error('Callback result not stored');
        }
        const errorMessage = success ? null : String(event?.error_message || '').slice(0, 300) || null;
        await db.prepare(`INSERT INTO gladia_callback_inbox(job_id,provider_job_id,outcome,error_message)
            VALUES (?,?,?,?) ON CONFLICT(job_id,provider_job_id,outcome) DO NOTHING`)
            .bind(jobId, jobId, success ? 'done' : 'error', errorMessage).run();
        context.waitUntil?.(recoverGladiaBatch(env).catch(() => console.warn('[ASR] Recovery deferred')));
        return jsonResponse({ received: true, jobId });
    } catch {
        return jsonResponse({ error: 'Callback persistence unavailable' }, 503, { 'Cache-Control': 'no-store' });
    }
}
