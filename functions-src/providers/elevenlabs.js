import { readBoundedBody, requestSignal } from '../utils/response-body.js';

const API = 'https://api.elevenlabs.io/v1/speech-to-text';
export const ELEVENLABS_MAX_RESULT_BYTES = 12 * 1024 * 1024;
const ID = /^[A-Za-z0-9_-]{1,200}$/;

async function parseResponse(response, signal, limit) {
    return JSON.parse(new TextDecoder().decode(await readBoundedBody(response, signal, limit)));
}

export function hasElevenLabsConfig(env) {
    return Boolean(env.ELEVENLABS_API_KEY && env.ELEVENLABS_WEBHOOK_ID && env.ELEVENLABS_WEBHOOK_SECRET);
}

export class ElevenLabsProvider {
    constructor(apiKey, webhookId) {
        this.apiKey = apiKey;
        this.webhookId = webhookId;
    }

    async submitTranscriptionJob(youtubeUrl, { jobId }) {
        const body = new FormData();
        body.set('model_id', 'scribe_v3');
        body.set('source_url', youtubeUrl);
        body.set('timestamps_granularity', 'word');
        body.set('tag_audio_events', 'false');
        body.set('webhook', 'true');
        body.set('webhook_id', this.webhookId);
        body.set('webhook_metadata', JSON.stringify({ voca_job_id: jobId }));
        const signal = AbortSignal.timeout(24000);
        let stage = 'request';
        try {
            const response = await fetch(API, { method: 'POST', body, signal,
                headers: { 'xi-api-key': this.apiKey }, redirect: 'manual' });
            if (!response.ok) {
                await response.body?.cancel().catch(() => {});
                const error = new Error(`ElevenLabs submit failed (${response.status})`);
                error.status = response.status;
                error.ambiguous = response.status >= 500 || response.status === 408;
                throw error;
            }
            stage = 'response';
            const result = await parseResponse(response, signal, 65536);
            stage = 'missing_transcription_id';
            if (typeof result.transcription_id !== 'string' || !ID.test(result.transcription_id)) {
                throw new Error('Missing transcription ID');
            }
            return { id: result.transcription_id };
        } catch (error) {
            console.warn('[ElevenLabs] Submission failed', { jobId, stage, status: error.status, timedOut: signal.aborted });
            if (error.status) throw error;
            const uncertain = new Error('ElevenLabs submission outcome is uncertain');
            uncertain.ambiguous = true;
            throw uncertain;
        }
    }

    async checkJobStatusById(id, { deadline = Date.now() + 10000 } = {}) {
        if (!this.apiKey || !ID.test(id || '')) throw new Error('ElevenLabs result lookup unavailable');
        const signal = requestSignal(deadline, 10000);
        const response = await fetch(`${API}/transcripts/${id}`, {
            headers: { 'xi-api-key': this.apiKey }, signal, redirect: 'manual'
        });
        if (!response.ok || response.status === 202) {
            await response.body?.cancel().catch(() => {});
            if ([202, 404].includes(response.status)) return { status: 'processing' };
            throw new Error(`ElevenLabs result lookup failed (${response.status})`);
        }
        const transcription = await parseResponse(response, signal, ELEVENLABS_MAX_RESULT_BYTES);
        if (!Array.isArray(transcription.words)) throw new Error('Malformed ElevenLabs result');
        return toElevenLabsResult(transcription);
    }
}

export function toElevenLabsResult(transcription) {
    const segments = [];
    let cue = null;
    let spacing = '';
    const flush = () => {
        if (cue) segments.push({ start: cue.start, duration: Math.max(0.1, cue.end - cue.start), text: cue.text });
        cue = null;
    };
    for (const word of transcription.words) {
        if (word?.type === 'spacing') {
            spacing = ' ';
            continue;
        }
        if (word?.type !== 'word' || typeof word.text !== 'string' ||
            !Number.isFinite(word.start) || !Number.isFinite(word.end) || word.start < 0 || word.end < word.start) continue;
        if (cue && (word.start - cue.end >= 0.8 || word.end - cue.start > 6 || cue.text.length + word.text.length > 72)) flush();
        if (!cue) cue = { start: word.start, end: word.end, text: '' };
        cue.text += (cue.text ? spacing : '') + word.text;
        cue.end = Math.max(cue.end, word.end);
        spacing = '';
        if (/[。！？.!?][」』”"]?$/.test(word.text)) flush();
    }
    flush();
    return { status: 'done', segments, language: transcription.language_code };
}

export function elevenLabsCallbackKey(jobId) {
    return `asr-inbox/elevenlabs/${jobId}.json`;
}
