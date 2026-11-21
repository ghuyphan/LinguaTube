import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { fixture } from './fixtures/transcription-db.mjs';
import { onRequestPost } from '../functions-src/api/elevenlabs-webhook.js';
import { onRequestPost as transcriptRequest } from '../functions-src/api/transcript.js';
import { getTranscriptFromR2, saveTranscriptToR2 } from '../functions-src/data/transcript-r2.js';
import { recoverGladiaBatch } from '../functions-src/services/gladia-recovery.js';
import { TranscriptService } from '../functions-src/services/transcript.service.js';
import { expireStalledScribeJobs, reserveAiJob, scribeBudgetAllows, scribeBudgetCycle } from '../functions-src/data/transcript-db.js';

const videoId = 'abcdefghijk';
const secret = 'test-secret';
const budgetEnv = { ASR_PROVIDER: 'elevenlabs', ELEVENLABS_BILLING_ANCHOR: '2026-01-31T10:30:00Z' };
const transcription = {
    transcription_id: 'scribe-id', language_code: 'jpn',
    words: [
        { type: 'word', text: '日本語', start: 0.3, end: 1 },
        { type: 'word', text: 'です。', start: 1, end: 2 },
        { type: 'word', text: '続きです。', start: 3, end: 4 }
    ]
};
const timings = [
    { text: '日本語', start: 0.3, end: 1 },
    { text: 'です。', start: 1, end: 2 },
    { text: '続きです。', start: 3, end: 4 }
];

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
        VOCAB_DB: db, TRANSCRIPT_STORAGE: r2, SUPABASE_SERVICE_ROLE_KEY: 'fixture' };
    let submissions = 0;
    let charges = 0;
    const user = '11111111-1111-4111-8111-111111111111';
    const token = `${btoa('{}')}.${btoa(JSON.stringify({ sub: user, exp: Math.floor(Date.now() / 1000) + 3600 }))}.fixture`;
    let tier = 'free';
    t.mock.method(globalThis, 'fetch', async (url, init) => {
        if (url.endsWith('/auth/v1/user')) return Response.json({ id: user });
        if (url.endsWith('/rpc/get_user_access_state')) return Response.json({
            id: user, subscription_tier: tier, diamonds: 5, diamonds_updated_at: new Date().toISOString()
        });
        assert.equal(url, 'https://api.elevenlabs.io/v1/speech-to-text');
        assert.equal(init.redirect, 'manual');
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
    assert.deepEqual(cached.wordTimings, timings);
    assert.equal((await service.startAIJob({ db, r2, env }, params)).status, 'done');
    for (const access of ['guest', 'free', 'pro', 'premium']) {
        tier = access;
        for (const body of [{}, { includeWordTimings: true }, { jobId: job.jobId, includeWordTimings: true }]) {
            const response = await transcriptRequest({ env, request: new Request('https://voca.study/api/transcript', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...(access === 'guest' ? {} : { Authorization: `Bearer ${token}` }) },
                body: JSON.stringify({ videoId, lang: 'ja', preferAI: true, ...body })
            }) });
            assert.equal(response.status, 200);
            const track = await response.json();
            assert.equal(track.hasWordTimings, body.includeWordTimings);
            assert.deepEqual(track.wordTimings,
                body.includeWordTimings && ['pro', 'premium'].includes(access) ? timings : undefined);
            assert.deepEqual(track.segments, cached.segments);
            if (body.includeWordTimings) assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
        }
    }
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
        assert.equal(init.redirect, 'manual');
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
    assert.deepEqual(result.videoInfo.wordTimings, timings);
    assert.deepEqual((await service.pollAiJobStatus({ db, r2, env }, params)).videoInfo.wordTimings, timings);
    assert.equal(lookups, 2);
});

test('an unconfirmed Scribe submission times out, refunds once and still publishes a late signed result', async t => {
    const { db, sqlite, reserve } = await fixture(t);
    const job = await reserve(videoId, 'user-a');
    sqlite.exec(`UPDATE ai_transcription_jobs SET asr_provider='elevenlabs',
        charge_status='confirmed',submission_state='uncertain',submission_started_at=unixepoch()-60`);
    const r2 = bucket();
    const env = { VOCAB_DB: db, TRANSCRIPT_STORAGE: r2, ELEVENLABS_WEBHOOK_SECRET: secret, SUPABASE_SERVICE_ROLE_KEY: 'test-key' };
    let refunds = 0;
    t.mock.method(globalThis, 'fetch', async (url, init) => {
        assert.ok(url.endsWith('/rpc/refund_transcription_credits'));
        assert.deepEqual(JSON.parse(init.body), { p_job_id: job.id, p_user_id: 'user-a', p_amount: 1 });
        refunds++;
        return Response.json({ success: true, state: 'refunded' });
    });
    const service = new TranscriptService(null, null, null);
    const params = { jobId: job.id, videoId };
    const context = { db, r2, env };
    assert.equal((await service.pollAiJobStatus(context, params)).status, 'processing');
    sqlite.exec('UPDATE ai_transcription_jobs SET submission_started_at=unixepoch()-901');
    const failure = await service.pollAiJobStatus(context, params);
    assert.equal(failure.status, 'error');
    assert.equal(failure.errorCode, 'AI_JOB_FAILED');
    assert.match(failure.error, /refunded/);
    assert.equal((await service.pollAiJobStatus(context, params)).errorCode, 'AI_JOB_FAILED');
    assert.equal(sqlite.prepare('SELECT error_code FROM ai_transcription_jobs').get().error_code, 'ASR_SUBMISSION_TIMEOUT');
    assert.equal(sqlite.prepare('SELECT refund_status FROM ai_transcription_jobs').get().refund_status, 'confirmed');
    assert.equal((await onRequestPost({ request: callback(job.id), env })).status, 200);
    assert.equal((await recoverGladiaBatch(env)).confirmed, 1);
    assert.equal((await service.pollAiJobStatus(context, params)).status, 'done');
    assert.ok(await getTranscriptFromR2(r2, videoId, 'ja', { preferAI: true }));
    assert.equal(refunds, 1);
});

test('an accepted Scribe job expires only after its deadline and refunds once', async t => {
    const { db, sqlite, reserve } = await fixture(t);
    const job = await reserve(videoId, 'user-a');
    sqlite.exec(`UPDATE ai_transcription_jobs SET asr_provider='elevenlabs', charge_status='confirmed',
        submission_state='accepted', status='processing', gladia_job_id='scribe-id',
        submission_started_at=unixepoch()-1800`);
    assert.equal((await expireStalledScribeJobs(db)).length, 0);
    sqlite.exec(`UPDATE ai_transcription_jobs SET submission_started_at=unixepoch()-3601,
        ingestion_lease_until=unixepoch()+60`);
    assert.equal((await expireStalledScribeJobs(db)).length, 0);
    sqlite.exec('UPDATE ai_transcription_jobs SET ingestion_lease_until=NULL');

    let refunds = 0;
    t.mock.method(globalThis, 'fetch', async url => {
        if (url.includes('/transcripts/scribe-id')) return new Response(null, { status: 404 });
        assert.ok(url.endsWith('/rpc/refund_transcription_credits'));
        refunds++;
        return Response.json({ success: true, state: 'refunded' });
    });
    const env = { VOCAB_DB: db, TRANSCRIPT_STORAGE: bucket(),
        ELEVENLABS_API_KEY: 'fixture', SUPABASE_SERVICE_ROLE_KEY: 'fixture',
        ELEVENLABS_WEBHOOK_SECRET: secret };
    const service = new TranscriptService();
    const poll = () => service.pollAiJobStatus({ env }, { jobId: job.id, videoId });
    assert.equal((await poll()).errorCode, 'AI_JOB_FAILED');
    assert.equal((await poll()).errorCode, 'AI_JOB_FAILED');
    assert.equal(refunds, 1);
    assert.equal((await onRequestPost({ request: callback(job.id), env })).status, 200);
    assert.equal((await recoverGladiaBatch(env)).confirmed, 1);
    assert.equal((await poll()).status, 'done');
});

test('Scribe billing boundaries keep their UTC time and clamp short months', () => {
    const now = Date.parse('2026-02-28T10:30:00Z');
    const unix = date => Date.parse(date) / 1000;
    assert.deepEqual(scribeBudgetCycle(budgetEnv, now - 1), {
        start: unix('2026-01-31T10:30:00Z'), end: unix('2026-02-28T10:30:00Z'),
    });
    assert.deepEqual(scribeBudgetCycle(budgetEnv, now), {
        start: unix('2026-02-28T10:30:00Z'), end: unix('2026-03-31T10:30:00Z'),
    });
});

test('Scribe reserves shared capacity atomically and releases only definite rejections', async t => {
    const { db, sqlite, reserve } = await fixture(t);
    const previous = await reserve(videoId);
    sqlite.prepare(`UPDATE ai_transcription_jobs SET asr_provider='elevenlabs',
        status='failed', submission_state='uncertain', verified_duration_seconds=89900,
        submission_started_at=unixepoch() WHERE id=?`).run(previous.id);
    const cycle = scribeBudgetCycle(budgetEnv);
    const params = { language: 'ja', clientId: 'client-a', verifiedDurationSeconds: 60, scribeCycle: cycle };
    const results = await Promise.allSettled([
        reserveAiJob(db, { ...params, videoId: 'abcdefghij1' }),
        reserveAiJob(db, { ...params, videoId: 'abcdefghij2' }),
    ]);
    const winner = results.find(r => r.status === 'fulfilled').value.job;
    assert.match(results.find(r => r.status === 'rejected').reason.message, /AI_AUDIO_BUDGET_EXHAUSTED/);
    assert.equal(await scribeBudgetAllows(db, cycle, 40), true);
    assert.equal(await scribeBudgetAllows(db, cycle, 41), false);
    assert.equal((await reserveAiJob(db, { ...params, videoId: winner.video_id })).isNew, false);
    sqlite.prepare("UPDATE ai_transcription_jobs SET status='failed',submission_state='rejected' WHERE id=?").run(winner.id);
    assert.equal(await scribeBudgetAllows(db, cycle, 100), true);
    assert.equal(await scribeBudgetAllows(db, cycle, 101), false);
    sqlite.prepare('UPDATE ai_transcription_jobs SET submission_started_at=? WHERE id=?').run(cycle.start - 1, previous.id);
    assert.equal(await scribeBudgetAllows(db, cycle, 90000), true);
});

test('a full Scribe budget blocks a new job before taking diamonds', async t => {
    const { db, sqlite, reserve } = await fixture(t);
    const r2 = bucket();
    const env = { ...budgetEnv, ELEVENLABS_API_KEY: 'test-key', ELEVENLABS_WEBHOOK_ID: 'hook', ELEVENLABS_WEBHOOK_SECRET: secret };
    await reserve(videoId);
    sqlite.exec(`UPDATE ai_transcription_jobs SET asr_provider='elevenlabs', status='completed',
        submission_state='accepted', verified_duration_seconds=90000, submission_started_at=unixepoch()`);
    const service = new TranscriptService(null, null, { consumeDiamond: () => assert.fail('Charged after budget denial') });
    t.mock.method(service, '_verifiedAIPrice', async () => ({ cost: 1, tier: 'free', durationSeconds: 60, maxDurationSeconds: 600 }));
    const context = { db, r2, env };
    const params = { videoId: 'abcdefghij3', lang: 'ja', clientId: 'client-a', diamondInfo: { diamonds: 3 } };
    assert.equal((await service.quoteAIJob(context, params)).reason, 'AI_AUDIO_BUDGET_EXHAUSTED');
    await assert.rejects(service.startAIJob(context, params), /AI_AUDIO_BUDGET_EXHAUSTED/);
    assert.equal(sqlite.prepare('SELECT count(*) AS n FROM ai_transcription_jobs').get().n, 1);
});

test('transcript storage reads old JSON and gzip with complete word timings', async () => {
    const objects = new Map();
    const r2 = {
        async head(key) { return objects.get(key); },
        async get(key) {
            const object = objects.get(key);
            if (!object) return null;
            const response = new Response(object.value);
            return { ...object, body: response.body, json: () => response.json() };
        },
        async put(key, value, options) {
            const object = { ...options, value, etag: 'etag' };
            objects.set(key, object);
            return object;
        }
    };
    const segments = [{ start: 0, duration: 1, text: 'こんにちは'.repeat(100) }];
    for (const gzip of [false, true]) {
        assert.equal(await saveTranscriptToR2(r2, videoId, 'ja', segments, 'ai',
            { jobId: 'fixture', createdAt: 1 }, null, timings, gzip), true);
        const stored = objects.get(`transcripts/${videoId}/ja.ai.json`);
        assert.equal(stored.httpMetadata.contentEncoding, gzip ? 'gzip' : undefined);
        assert.equal(stored.customMetadata.jobId, 'fixture');
        if (gzip) assert.ok(stored.value.byteLength < 350);
        const result = await getTranscriptFromR2(r2, videoId, 'ja', { preferAI: true });
        assert.deepEqual(result.segments, segments);
        assert.deepEqual(result.wordTimings, timings);
    }
});
