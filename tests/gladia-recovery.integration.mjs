import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture } from './fixtures/transcription-db.mjs';
import { recordGladiaNotification, recoverGladiaBatch, ingestGladiaJob } from '../functions-src/services/gladia-recovery.js';
import { activateAiJob, atomicFailAndRefundAiJob } from '../functions-src/data/transcript-db.js';
import { generateDerivedWebhookToken } from '../functions-src/utils/svix-verifier.js';
import { onRequestPost } from '../functions-src/api/gladia-webhook.js';
import { recoverGladiaSubmission } from '../functions-src/services/gladia-recovery.js';
import { getActiveAiJob } from '../functions-src/data/transcript-db.js';
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

test('sequential client polls share a persisted provider-check deadline',async t=>{
    const {db,sqlite,job,env}=await active(t);let calls=0;
    const provider={async checkJobStatusById(){calls++;return {status:'processing'};}};
    assert.equal(await ingestGladiaJob(env,job.id,provider),null);
    assert.equal(await ingestGladiaJob(env,job.id,provider),null);
    assert.equal(calls,1);
    const state=sqlite.prepare('SELECT next_provider_check_at,ingestion_lease FROM ai_transcription_jobs').get();
    assert.ok(state.next_provider_check_at>Math.floor(Date.now()/1000));assert.equal(state.ingestion_lease,null);
    sqlite.exec('UPDATE ai_transcription_jobs SET next_provider_check_at=0');
    await ingestGladiaJob(env,job.id,provider);assert.equal(calls,2);
    assert.equal((await getActiveAiJob(db,job.video_id,job.language)).id,job.id);
});

test('provider backoff is persisted while terminal callback recovery can bypass it',async t=>{
    const {sqlite,job,env}=await active(t);
    const error=Object.assign(new Error('rate limited'),{retryAfterSeconds:120});
    await assert.rejects(ingestGladiaJob(env,job.id,{async checkJobStatusById(){throw error;}}),/rate limited/);
    assert.ok(sqlite.prepare('SELECT next_provider_check_at t FROM ai_transcription_jobs').get().t>=Math.floor(Date.now()/1000)+119);
    assert.equal(await ingestGladiaJob(env,job.id,{async checkJobStatusById(){throw new Error('must not poll');}}),null);
    assert.equal((await ingestGladiaJob(env,job.id,{async checkJobStatusById(){return done;}},Date.now()+20000,{force:true})).status,'done');
});

test('uncertain submission recovery preserves the charge and never automatically replaces the job',async t=>{
    const {db,sqlite,reserve}=await fixture(t);const job=await reserve('abcdefghijk');
    const {consumeAnonymousCredits,anonymousBalance}=await import('../functions-src/data/anonymous-credits.js');
    await consumeAnonymousCredits(db,null,'client-a',1,job.id);
    sqlite.exec("UPDATE ai_transcription_jobs SET submission_state='uncertain',submission_started_at=strftime('%s','now')-60,created_at=strftime('%s','now')-2000");
    let found=false,calls=0;
    t.mock.method(globalThis,'fetch',async(_url,init)=>{assert.equal(init.method,undefined);calls++;return Response.json({items:found?[{id:'recovered',custom_metadata:{voca_job_id:job.id}}]:[]});});
    const env={VOCAB_DB:db,GLADIA_API_KEY:'fixture'};
    assert.equal(await recoverGladiaSubmission(env,job.id),false);
    assert.equal((await getActiveAiJob(db,job.video_id,job.language)).id,job.id);
    assert.equal((await anonymousBalance(db,null,'client-a')).diamonds,2);
    assert.equal(await recoverGladiaSubmission(env,job.id),false);assert.equal(calls,1);
    found=true;sqlite.exec('UPDATE ai_transcription_jobs SET next_provider_check_at=0');
    assert.equal(await recoverGladiaSubmission(env,job.id),true);
    const row=sqlite.prepare('SELECT gladia_job_id,submission_state,status FROM ai_transcription_jobs').get();
    assert.equal(row.gladia_job_id,'recovered');assert.equal(row.submission_state,'accepted');assert.equal(row.status,'processing');
    assert.equal((await anonymousBalance(db,null,'client-a')).diamonds,2);
    assert.equal(sqlite.prepare('SELECT COUNT(*) n FROM ai_transcription_jobs').get().n,1);
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
    // A normal immediate retry is throttled; explicit recovery still exercises CAS.
    assert.equal(await ingestGladiaJob(env, job.id, provider), null);
    await assert.rejects(ingestGladiaJob(env, job.id, provider, Date.now()+20000, {force:true}), /persistence unavailable/);
    assert.equal(storage.stored.data.segments[0].text, 'newer transcript');
});
