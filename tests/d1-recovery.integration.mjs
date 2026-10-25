import { fixture } from './fixtures/transcription-db.mjs';
// Run with Node 22+; uses the built-in SQLite engine, never a local server.
import test from 'node:test';
import assert from 'node:assert/strict';
import { atomicFailAndRefundAiJob, completeAiJob } from '../functions-src/data/transcript-db.js';
import { anonymousBalance, consumeAnonymousCredits } from '../functions-src/data/anonymous-credits.js';
import { recoverJobRefund } from '../functions-src/services/refund-recovery.js';

test('D1 anonymous credits import KV once and enforce concurrent depletion',async t=>{
    const {db,reserve}=await fixture(t);let reads=0;
    const kv={get:async()=>{reads++;return {d:3,l:Date.now()};}};
    const jobs=await Promise.all(['a','b','c','d'].map(id=>reserve(id)));
    const results=await Promise.all(jobs.map(job=>consumeAnonymousCredits(db,kv,'client-a',1,job.id)));
    assert.equal(results.filter(r=>r.success).length,3);
    // Racing first reads may consult KV, but only one INSERT initializes the authoritative balance.
    const before=reads;assert.equal((await anonymousBalance(db,kv,'client-a')).diamonds,0);assert.equal(reads,before);
    const winner = results.findIndex(result => result.success);
    assert.equal((await consumeAnonymousCredits(db,kv,'client-a',1,jobs[winner].id)).success,true);
    const rejected = results.findIndex(result => !result.success);
    assert.equal((await consumeAnonymousCredits(db,kv,'client-a',1,jobs[rejected].id)).success,false);
    assert.equal((await anonymousBalance(db,kv,'client-a')).diamonds,0);
});

test('anonymous refund confirmation is replay-safe and cancelled jobs cannot charge later',async t=>{
    const {db,reserve}=await fixture(t);const env={VOCAB_DB:db};
    const job=await reserve('refund');await consumeAnonymousCredits(db,null,'client-a',1,job.id);
    assert.equal((await atomicFailAndRefundAiJob(db,job.id)).shouldRefund,true);
    assert.equal((await atomicFailAndRefundAiJob(db,job.id)).shouldRefund,false);
    assert.equal(await recoverJobRefund(env,job.id),true);assert.equal(await recoverJobRefund(env,job.id),false);
    assert.equal((await anonymousBalance(db,null,'client-a')).diamonds,3);
    const late=await reserve('late');await atomicFailAndRefundAiJob(db,late.id);await recoverJobRefund(env,late.id);
    assert.equal((await consumeAnonymousCredits(db,null,'client-a',1,late.id)).success,false);
});

test('an ambiguous PostgreSQL response stays pending and retries the same operation ID',async t=>{
    const {db,sqlite,reserve}=await fixture(t);const job=await reserve('network','11111111-1111-4111-8111-111111111111');
    await atomicFailAndRefundAiJob(db,job.id);const ids=[];
    t.mock.method(globalThis,'fetch',async (_url,options)=>{ids.push(JSON.parse(options.body).p_job_id);if(ids.length===1)throw new Error('Connection lost after commit');return Response.json({success:true,state:'refunded'});});
    const env={VOCAB_DB:db,SUPABASE_SERVICE_ROLE_KEY:'test'};
    assert.equal(await recoverJobRefund(env,job.id),false);
    let row=sqlite.prepare('SELECT * FROM ai_transcription_jobs WHERE id=?').get(job.id);assert.equal(row.diamonds_refunded,0);assert.equal(row.refund_status,'pending');
    sqlite.prepare('UPDATE ai_transcription_jobs SET refund_next_attempt=0,refund_lease_until=0 WHERE id=?').run(job.id);
    assert.equal(await recoverJobRefund(env,job.id),true);assert.deepEqual(ids,[job.id,job.id]);
    row=sqlite.prepare('SELECT * FROM ai_transcription_jobs WHERE id=?').get(job.id);assert.equal(row.diamonds_refunded,1);
});

test('completed jobs and ambiguous legacy flags never receive automatic refunds',async t=>{
    const {db,sqlite,reserve}=await fixture(t);const job=await reserve('complete');await completeAiJob(db,job.id);
    assert.equal((await atomicFailAndRefundAiJob(db,job.id)).shouldRefund,false);
    sqlite.prepare("UPDATE ai_transcription_jobs SET status='failed',charge_status='legacy',refund_status='legacy',diamonds_refunded=1 WHERE id=?").run(job.id);
    assert.equal(await recoverJobRefund({VOCAB_DB:db},job.id),false);
});

test('expired refund leases recover without resurrecting terminal jobs', async t => {
    const {db,sqlite,reserve}=await fixture(t);
    const job=await reserve('leased');
    await consumeAnonymousCredits(db,null,'client-a',1,job.id);
    await atomicFailAndRefundAiJob(db,job.id);
    sqlite.prepare("UPDATE ai_transcription_jobs SET refund_lease='abandoned',refund_lease_until=strftime('%s','now')+60 WHERE id=?").run(job.id);
    assert.equal(await recoverJobRefund({VOCAB_DB:db},job.id),false);
    sqlite.prepare("UPDATE ai_transcription_jobs SET refund_lease_until=strftime('%s','now')-1 WHERE id=?").run(job.id);
    assert.equal(await recoverJobRefund({VOCAB_DB:db},job.id),true);
    await completeAiJob(db,job.id,'ja');
    const row=sqlite.prepare('SELECT status,refund_status FROM ai_transcription_jobs WHERE id=?').get(job.id);
    assert.equal(row.status,'failed'); assert.equal(row.refund_status,'confirmed');
    assert.equal((await anonymousBalance(db,null,'client-a')).diamonds,3);
});

test('mismatched anonymous refund stays pending and cannot credit a different charge', async t => {
    const {db,sqlite,reserve}=await fixture(t);
    const job=await reserve('mismatched-refund');
    await consumeAnonymousCredits(db,null,'client-a',2,job.id);
    await atomicFailAndRefundAiJob(db,job.id);
    assert.equal(await recoverJobRefund({VOCAB_DB:db},job.id),false);
    const row=sqlite.prepare('SELECT refund_status,diamonds_refunded FROM ai_transcription_jobs WHERE id=?').get(job.id);
    assert.equal(row.refund_status,'pending');assert.equal(row.diamonds_refunded,0);
    assert.equal((await anonymousBalance(db,null,'client-a')).diamonds,1);
});

test('anonymous consumption rejects invalid amounts before initializing balances', async t => {
    const {db,sqlite}=await fixture(t);
    for(const amount of [null,0,-1,1.5,NaN,Infinity,4]) {
        await assert.rejects(consumeAnonymousCredits(db,null,'client-a',amount,null), /Invalid anonymous credit amount/);
    }
    assert.equal(sqlite.prepare('SELECT count(*) n FROM anonymous_credit_balances').get().n,0);
});
