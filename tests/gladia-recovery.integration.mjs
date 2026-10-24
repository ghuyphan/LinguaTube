import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture } from './fixtures/transcription-db.mjs';
import { recordGladiaNotification, recoverGladiaBatch, ingestGladiaJob } from '../functions-src/services/gladia-recovery.js';
import { activateAiJob, atomicFailAndRefundAiJob } from '../functions-src/data/transcript-db.js';
import { generateDerivedWebhookToken } from '../functions-src/utils/svix-verifier.js';
import { onRequestPost } from '../functions-src/api/gladia-webhook.js';
const done = { status: 'done', result: { transcription: { languages: ['en'], sentences: [{ sentence: 'Hello world.', start: 0, end: 2 }] } } };

function bucket() {
    let stored = null, etag = 0, fail = false;
    return {
        get stored() { return stored; }, set fail(value) { fail = value; },
        async head() { return stored ? { etag: String(etag), customMetadata: stored.meta } : null; },
        async put(_key, body, options) {
            if (fail) throw Error('R2 unavailable');
            if (stored && options.onlyIf?.etagDoesNotMatch === '*') return null;
            if (options.onlyIf?.etagMatches && options.onlyIf.etagMatches !== String(etag)) return null;
            stored = { data: JSON.parse(body), meta: options.customMetadata }; etag++; return { etag: String(etag) };
        }
    };
}
async function active(t) {
    const f = await fixture(t); const job = await f.reserve('dQw4w9WgXcQ'); await activateAiJob(f.db, job.id, 'provider-id'); f.sqlite.exec("UPDATE ai_transcription_jobs SET charge_status='confirmed'");
    const storage = bucket(); return { ...f, job, storage, env: { VOCAB_DB: f.db, TRANSCRIPT_STORAGE: storage, GLADIA_API_KEY: 'fixture-key' } };
}

test('authenticated callback commits before acknowledgement; mismatch and storage outage cannot acknowledge', async t => {
    const { db, job, env, sqlite } = await active(t);
    const token = await generateDerivedWebhookToken(env.GLADIA_API_KEY, job.id, job.video_id, 'ja');
    const make = (id = 'provider-id') => new Request(`https://voca.study/api/gladia-webhook?jobId=${job.id}&videoId=${job.video_id}&lang=ja&token=${token}`,
        { method: 'POST', body: JSON.stringify({ event: 'transcription.success', payload: { id, status: 'done' } }) });
    assert.equal((await onRequestPost({ request: make(), env })).status, 200);
    assert.equal((await onRequestPost({ request: make(), env })).status, 200);
    const localeToken = await generateDerivedWebhookToken(env.GLADIA_API_KEY, job.id, job.video_id, 'ja-JP');
    const localized = new URL(make().url); localized.searchParams.set('lang', 'ja-JP'); localized.searchParams.set('token', localeToken);
    assert.equal((await onRequestPost({ request: new Request(localized, {method:'POST',body:JSON.stringify({event:'transcription.success',payload:{id:'provider-id',status:'done'}})}), env })).status, 200);
    assert.equal(sqlite.prepare('SELECT count(*) n FROM gladia_callback_inbox').get().n, 1);
    assert.equal((await onRequestPost({ request: make('different'), env })).status, 409);
    assert.equal((await onRequestPost({ request: make(), env: { ...env, VOCAB_DB: { prepare() { throw Error('offline'); } } } })).status, 503);
    await assert.rejects(recordGladiaNotification(db, { jobId: job.id, providerId: 'wrong', outcome: 'done' }), /mismatch/);
});

test('durable success retries R2 failures and deduplicates polling and callback work', async t => {
    const { db, sqlite, job, env, storage } = await active(t); let providerCalls = 0;
    t.mock.method(globalThis, 'fetch', async () => { providerCalls++; return Response.json(done); });
    await recordGladiaNotification(db, { jobId: job.id, providerId: 'provider-id', outcome: 'done' });
    storage.fail = true; assert.equal((await recoverGladiaBatch(env)).confirmed, 0);
    assert.equal(sqlite.prepare('SELECT status FROM ai_transcription_jobs').get().status, 'processing');
    storage.fail = false; sqlite.exec('UPDATE gladia_callback_inbox SET next_attempt=0');
    const outputs = await Promise.all([ingestGladiaJob(env, job.id), recoverGladiaBatch(env)]);
    assert.ok(outputs[0]?.status === 'done' || outputs[1].confirmed === 1);
    await recoverGladiaBatch(env);
    assert.equal(sqlite.prepare('SELECT status FROM ai_transcription_jobs').get().status, 'completed');
    assert.equal(storage.stored.data.segments[0].text, 'Hello world.');
    const before = providerCalls; await ingestGladiaJob(env, job.id); assert.equal(providerCalls, before);
    assert.equal((await atomicFailAndRefundAiJob(db, job.id)).shouldRefund, false);
});

test('leases exclude completion and refund races; expired leases recover', async t => {
    const { db, sqlite, job, env } = await active(t);
    sqlite.exec("UPDATE ai_transcription_jobs SET ingestion_lease='abandoned',ingestion_lease_until=strftime('%s','now')+60");
    assert.equal(await ingestGladiaJob(env, job.id), null);
    assert.equal((await atomicFailAndRefundAiJob(db, job.id)).shouldRefund, false);
    sqlite.exec("UPDATE ai_transcription_jobs SET ingestion_lease_until=0");
    const result = await ingestGladiaJob(env, job.id, { async checkJobStatusById() { return done; } });
    assert.equal(result.status, 'done');
});

test('failed jobs cannot publish a late successful callback', async t => {
    const { db, job, env, storage } = await active(t);
    await atomicFailAndRefundAiJob(db, job.id);
    let calls = 0; const result = await ingestGladiaJob(env, job.id, { async checkJobStatusById() { calls++; return done; } });
    assert.equal(result, null); assert.equal(calls, 0); assert.equal(storage.stored, null);
});

test('provider errors durably refund one charged job, including callback replay', async t => {
    const { consumeAnonymousCredits, anonymousBalance } = await import('../functions-src/data/anonymous-credits.js');
    const { db, sqlite, job, env } = await active(t);
    await consumeAnonymousCredits(db, null, 'client-a', 1, job.id);
    t.mock.method(globalThis, 'fetch', async () => Response.json({ status: 'error' }));
    await recordGladiaNotification(db, { jobId: job.id, providerId: 'provider-id', outcome: 'error' });
    assert.equal((await recoverGladiaBatch(env)).confirmed, 1);
    assert.equal((await anonymousBalance(db, null, 'client-a')).diamonds, 3);
    assert.equal(sqlite.prepare('SELECT refund_status FROM ai_transcription_jobs').get().refund_status, 'confirmed');
    await recordGladiaNotification(db, { jobId: job.id, providerId: 'provider-id', outcome: 'error' });
    assert.equal((await recoverGladiaBatch(env)).selected, 0);
    assert.equal((await anonymousBalance(db, null, 'client-a')).diamonds, 3);
});

test('conditional R2 publication cannot overwrite a newer transcript during an ingestion race', async t => {
    const { sqlite, job, env, storage } = await active(t);
    const head = storage.head.bind(storage); let raced = false;
    storage.head = async () => {
        const observed = await head();
        if (!raced) {
            raced = true;
            await storage.put('transcript', JSON.stringify({segments:[{text:'newer transcript'}]}),
                {customMetadata:{jobId:'newer-job',jobCreatedAt:String(job.created_at+100)}});
        }
        return observed;
    };
    const provider = { async checkJobStatusById() { return done; } };
    await assert.rejects(ingestGladiaJob(env, job.id, provider), /persistence unavailable/);
    assert.equal(storage.stored.data.segments[0].text, 'newer transcript');
    assert.equal(sqlite.prepare('SELECT status FROM ai_transcription_jobs').get().status, 'processing');
    await assert.rejects(ingestGladiaJob(env, job.id, provider), /persistence unavailable/);
    assert.equal(storage.stored.data.segments[0].text, 'newer transcript');
});
