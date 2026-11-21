import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { fixture } from './fixtures/transcription-db.mjs';
import { onRequestPost } from '../functions-src/api/elevenlabs-webhook.js';
import { getTranscriptFromR2 } from '../functions-src/data/transcript-r2.js';
import { recoverGladiaBatch } from '../functions-src/services/gladia-recovery.js';
import { TranscriptService } from '../functions-src/services/transcript.service.js';

const videoId = 'abcdefghijk';
const secret = 'test-secret';
const transcription = {
    transcription_id: 'scribe-id', language_code: 'jpn',
    words: [
        { type: 'word', text: '日本語', start: 0.3, end: 1 },
        { type: 'word', text: 'です。', start: 1, end: 2 },
        { type: 'word', text: '続きです。', start: 3, end: 4 }
    ]
};

function bucket() {
    const entries = new Map();
    return {
        failPublication: false,
        async put(key, body, options) {
            if (key.startsWith('transcripts/') && this.failPublication) throw new Error('R2 unavailable');
            const object = { etag: String(entries.size), customMetadata: options?.customMetadata, json: async () => JSON.parse(body) };
            entries.set(key, object);
            return object;
        },
        async get(key) { return entries.get(key); },
        async head(key) { return entries.get(key); },
        async delete(key) { entries.delete(key); }
    };
}

function callback(jobId, isValid = true) {
    const body = JSON.stringify({ type: 'speech_to_text_transcription', data: {
        webhook_metadata: { voca_job_id: jobId }, transcription
    } });
    const timestamp = Math.floor(Date.now() / 1000);
    const digest = createHmac('sha256', isValid ? secret : 'wrong').update(`${timestamp}.${body}`).digest('hex');
    return new Request('https://voca.study/api/elevenlabs-webhook', {
        method: 'POST', headers: { 'ElevenLabs-Signature': `t=${timestamp},v0=${digest}` }, body
    });
}

test('Scribe submission saves provider identity and a completed webhook makes the video reusable', async t => {
    const { db, sqlite } = await fixture(t);
    const r2 = bucket();
    const env = { ASR_PROVIDER: 'elevenlabs', ELEVENLABS_API_KEY: 'restricted-test-key',
        ELEVENLABS_WEBHOOK_ID: 'webhook-id', ELEVENLABS_WEBHOOK_SECRET: secret,
        VOCAB_DB: db, TRANSCRIPT_STORAGE: r2 };
    let submissions = 0;
    let charges = 0;
    t.mock.method(globalThis, 'fetch', async (url, init) => {
        assert.equal(url, 'https://api.elevenlabs.io/v1/speech-to-text');
        assert.equal(init.headers['xi-api-key'], 'restricted-test-key');
        assert.equal(init.body.get('source_url'), `https://www.youtube.com/watch?v=${videoId}`);
        assert.equal(init.body.get('model_id'), 'scribe_v3');
        assert.equal(init.body.get('webhook'), 'true');
        const job = sqlite.prepare('SELECT * FROM ai_transcription_jobs').get();
        assert.equal(job.asr_provider, 'elevenlabs');
        assert.equal(job.charge_status, 'confirmed');
        assert.equal(JSON.parse(init.body.get('webhook_metadata')).voca_job_id, job.id);
        submissions++;
        return Response.json({ request_id: 'request-id', transcription_id: 'scribe-id' });
    });
    const service = new TranscriptService(null, null, { async consumeDiamond() {
        charges++;
        return { success: true, diamonds: 2 };
    } });
    t.mock.method(service, '_verifiedAIPrice', async () => ({ cost: 1, tier: 'free', durationSeconds: 60, maxDurationSeconds: 600 }));
    const params = { videoId, lang: 'ja', clientId: 'client-a', diamondInfo: { maxDiamonds: 3 } };
    const job = await service.startAIJob({ db, r2, env }, params);
    assert.equal(sqlite.prepare('SELECT gladia_job_id FROM ai_transcription_jobs').get().gladia_job_id, 'scribe-id');
    assert.equal((await onRequestPost({ request: callback(job.jobId, false), env })).status, 401);
    assert.equal((await onRequestPost({ request: callback(job.jobId), env })).status, 200);
    assert.equal((await onRequestPost({ request: callback(job.jobId), env })).status, 200);
    assert.equal(sqlite.prepare('SELECT count(*) n FROM gladia_callback_inbox').get().n, 1);
    r2.failPublication = true;
    assert.equal((await recoverGladiaBatch(env)).confirmed, 0);
    assert.equal(sqlite.prepare('SELECT status FROM ai_transcription_jobs').get().status, 'processing');
    r2.failPublication = false;
    sqlite.exec('UPDATE gladia_callback_inbox SET next_attempt=0');
    assert.equal((await recoverGladiaBatch(env)).confirmed, 1);
    const catalog = sqlite.prepare('SELECT ai_languages, sub_languages, duration_seconds FROM video_languages WHERE video_id=?').get(videoId);
    assert.deepEqual({ ...catalog }, { ai_languages: '["ja"]', sub_languages: '["ja"]', duration_seconds: 60 });
    const cached = await getTranscriptFromR2(r2, videoId, 'ja', { preferAI: true });
    assert.deepEqual(cached.segments.map(cue => cue.text), ['日本語です。', '続きです。']);
    assert.equal((await service.startAIJob({ db, r2, env }, params)).status, 'done');
    assert.equal(submissions, 1);
    assert.equal(charges, 1);
});

test('a signed Scribe callback recovers a paid job whose submit response was lost', async t => {
    const { db, sqlite, reserve } = await fixture(t);
    const job = await reserve(videoId);
    sqlite.exec("UPDATE ai_transcription_jobs SET asr_provider='elevenlabs',charge_status='confirmed',submission_state='uncertain'");
    const env = { VOCAB_DB: db, TRANSCRIPT_STORAGE: bucket(), ELEVENLABS_WEBHOOK_SECRET: secret };
    assert.equal((await onRequestPost({ request: callback(job.id), env })).status, 200);
    assert.equal((await recoverGladiaBatch(env)).confirmed, 1);
    assert.equal(sqlite.prepare('SELECT status FROM ai_transcription_jobs').get().status, 'completed');
});

test('a delayed webhook is recoverable by transcription ID without another paid submission', async t => {
    const { db, sqlite, reserve } = await fixture(t);
    const job = await reserve(videoId);
    sqlite.exec(`UPDATE ai_transcription_jobs SET asr_provider='elevenlabs',charge_status='confirmed',
        submission_state='accepted',status='processing',gladia_job_id='scribe-id',created_at=unixepoch()-16`);
    const r2 = bucket();
    const env = { VOCAB_DB: db, TRANSCRIPT_STORAGE: r2, ELEVENLABS_API_KEY: 'test-key' };
    let lookups = 0;
    t.mock.method(globalThis, 'fetch', async (url, init) => {
        assert.equal(url, 'https://api.elevenlabs.io/v1/speech-to-text/transcripts/scribe-id');
        assert.equal(init.method, undefined);
        lookups++;
        if (lookups === 1) return new Response(null, { status: 404 });
        return Response.json(transcription);
    });
    const service = new TranscriptService(null, null, null);
    const params = { jobId: job.id, videoId };
    assert.equal((await service.pollAiJobStatus({ db, r2, env }, params)).status, 'processing');
    sqlite.exec('UPDATE ai_transcription_jobs SET next_provider_check_at=0');
    const result = await service.pollAiJobStatus({ db, r2, env }, params);
    assert.equal(result.status, 'done');
    assert.equal(result.videoInfo.sourceDetail, 'elevenlabs');
    assert.equal((await service.pollAiJobStatus({ db, r2, env }, params)).status, 'done');
    assert.equal(lookups, 2);
});
