// Actual endpoint + SQLite ledgers; every external provider is fault-injected.
import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture } from './fixtures/transcription-db.mjs';
import { onRequestPost } from '../functions-src/api/transcript.js';
import { DiamondService } from '../functions-src/services/diamond.service.js';
import { recoverJobRefund } from '../functions-src/services/refund-recovery.js';
import { atomicFailAndRefundAiJob } from '../functions-src/data/transcript-db.js';

const uid = '11111111-1111-4111-8111-111111111111';
let sequence = 0;
async function endpoint(t, { tier = 'anonymous', duration = 120, youtube = null, charge = null, cached = false, balance = 25 } = {}) {
    const state = await fixture(t);
    const calls = [], charges = [], refunds = [];
    const videoId = `diamond${String(++sequence).padStart(4, '0')}`;
    const token = `${btoa('{}')}.${btoa(JSON.stringify({ sub: uid, exp: Math.floor(Date.now() / 1000) + 3600 }))}.fixture`;
    const env = { VOCAB_DB: state.db, YOUTUBE_DATA_API_KEY: 'fixture-youtube', GLADIA_API_KEY: 'fixture', TURNSTILE_SECRET_KEY: 'fixture', SUPABASE_SERVICE_ROLE_KEY: 'fixture',
        TRANSCRIPT_STORAGE: { get: async () => cached ? { customMetadata: { source: 'ai' }, json: async () => ({ segments: [{ start: 0, duration: 1, text: 'Hello', tokens: [{ surface: 'Hello' }] }] }) } : null } };
    t.mock.method(globalThis, 'fetch', async (input, init = {}) => {
        const url = new URL(input); calls.push({ host: url.hostname, path: url.pathname, method: init.method || 'GET' });
        if (url.hostname === 'www.googleapis.com') {
            assert.equal(init.headers['X-Goog-Api-Key'], 'fixture-youtube');
            assert.equal(url.searchParams.get('id'), videoId);
            if (youtube === 'outage') return new Response(null, { status: 503 });
            if (youtube === 'timeout') throw new DOMException('Timeout', 'TimeoutError');
            if (youtube === 'missing') return Response.json({});
            return Response.json({ items: [{ id: videoId, contentDetails: { duration: `PT${duration}S` }, snippet: { liveBroadcastContent: youtube === 'live' ? 'live' : 'none' } }] });
        }
        if (url.hostname === 'challenges.cloudflare.com') return Response.json({ success: true });
        if (url.pathname === '/auth/v1/user') return Response.json({ id: uid });
        if (url.pathname.endsWith('/get_user_access_state')) return Response.json({ id: uid, diamonds: balance, subscription_tier: tier, subscription_expires: new Date(Date.now() + 86400000).toISOString(), diamonds_updated_at: new Date().toISOString() });
        if (url.pathname.endsWith('/consume_transcription_credits')) {
            charges.push(JSON.parse(init.body));
            if (charge === 'lost') throw new Error('Acknowledgement lost after commit');
            if (charge === 'outage') return new Response(null, { status: 503 });
            return Response.json(charge ?? { success: true, diamonds: balance - charges.at(-1).p_amount });
        }
        if (url.pathname.endsWith('/refund_transcription_credits')) { refunds.push(JSON.parse(init.body)); return Response.json({ success: true, state: 'refunded' }); }
        if (url.hostname === 'api.gladia.io') return Response.json({ id: 'provider-fixture' });
        throw new Error(`Unexpected external call ${url.hostname}${url.pathname}`);
    });
    const invoke = async (body = {}) => {
        const request = new Request('https://voca.study/api/transcript', { method: 'POST', headers: {
            'Content-Type': 'application/json', 'CF-Connecting-IP': `198.51.100.${sequence}`, ...(tier === 'anonymous' ? {} : { Authorization: `Bearer ${token}` })
        }, body: JSON.stringify({ videoId, lang: 'en', preferAI: true, turnstileToken: 'fixture', ...body }) });
        const response = await onRequestPost({ request, env });
        return { status: response.status, body: await response.json() };
    };
    const providerPosts = () => calls.filter(c => c.host === 'api.gladia.io' && c.method === 'POST').length;
    return { ...state, env, calls, charges, refunds, invoke, providerPosts, videoId,
        setDuration(value) { duration = value; } };
}

for (const youtube of ['outage', 'timeout', 'missing']) {
    for (const clientDuration of [undefined, 1, 300]) {
        test(`paid endpoint rejects ${youtube} duration with client hint ${clientDuration}`, async t => {
            const f = await endpoint(t, { youtube });
            f.sqlite.prepare("INSERT INTO video_languages(video_id,duration_seconds,available_languages) VALUES(?,30,'[]')").run(f.videoId);
            const r = await f.invoke({ duration: clientDuration });
            assert.equal(r.status, 503); assert.equal(r.body.errorCode, 'VIDEO_DURATION_UNAVAILABLE');
            assert.equal(f.sqlite.prepare('SELECT count(*) n FROM ai_transcription_jobs').get().n, 0);
            assert.equal(f.sqlite.prepare('SELECT count(*) n FROM anonymous_credit_charges').get().n, 0);
            assert.equal(f.providerPosts(), 0);
            assert.equal(f.sqlite.prepare('SELECT diamonds FROM anonymous_credit_balances').get().diamonds, 3);
        });
    }
}

for (const [duration, amount] of [[600, 1], [601, 2], [1200, 2], [1201, 3], [2100, 3], [2101, 4], [2700, 4]]) {
    test(`paid endpoint charges ${amount} for verified ${duration}s despite forged pricing and identity`, async t => {
        const f = await endpoint(t, { tier: 'premium', duration });
        const r = await f.invoke({ duration: 1, cost: 0, diamonds: 999, tier: 'anonymous', userId: 'victim', clientId: 'victim' });
        assert.equal(r.status, 202); assert.equal(f.providerPosts(), 1);
        assert.equal(f.charges.length, 1); assert.equal(f.charges[0].p_user_id, uid); assert.equal(f.charges[0].p_amount, amount);
        const job = f.sqlite.prepare('SELECT * FROM ai_transcription_jobs').get();
        assert.equal(job.user_id, uid); assert.equal(job.diamonds_charged, amount); assert.equal(job.user_tier, 'premium');
        assert.equal(job.client_id, `user:${uid}`);
    });
}

for (const [tier, cap] of [['anonymous', 600], ['free', 600], ['pro', 1200], ['premium', 2700]]) {
    for (const extra of [0, 1]) {
        test(`${tier} endpoint enforces ${cap}s cap at ${cap + extra}s`, async t => {
            const f = await endpoint(t, { tier, duration: cap + extra });
            const r = await f.invoke({ duration: 1, tier: 'premium' });
            assert.equal(r.status, extra ? 400 : 202);
            if (extra) { assert.equal(r.body.errorCode, 'VIDEO_TOO_LONG'); assert.equal(f.sqlite.prepare('SELECT count(*) n FROM ai_transcription_jobs').get().n, 0); }
            assert.equal(f.providerPosts(), extra ? 0 : 1);
        });
    }
}

test('livestream rejection precedes reservations and charges', async t => {
    const f = await endpoint(t, { youtube: 'live' });
    const r = await f.invoke({ duration: 1 });
    assert.equal(r.body.errorCode, 'LIVESTREAM_NOT_SUPPORTED'); assert.equal(f.providerPosts(), 0);
    assert.equal(f.sqlite.prepare('SELECT count(*) n FROM ai_transcription_jobs').get().n, 0);
});

test('cached AI reuse needs neither duration verification nor a charge', async t => {
    const f = await endpoint(t, { youtube: 'outage', cached: true });
    const r = await f.invoke();
    assert.equal(r.status, 200); assert.equal(r.body.source, 'ai'); assert.equal(f.providerPosts(), 0);
    assert.equal(f.calls.filter(c => c.host === 'www.youtube.com').length, 0);
});

test('concurrent guest requests, refresh and polling retain one job and one charge', async t => {
    const f = await endpoint(t);
    const responses = await Promise.all([f.invoke(), f.invoke({ forceRefresh: true })]);
    assert.ok(responses.every(r => r.status === 202));
    assert.equal(responses[0].body.jobId, responses[1].body.jobId); assert.equal(f.providerPosts(), 1);
    const before = f.calls.filter(c => c.host === 'www.youtube.com').length;
    const poll = await f.invoke({ jobId: responses[0].body.jobId });
    assert.equal(poll.status, 202);
    assert.equal(f.calls.filter(c => c.host === 'www.youtube.com').length, before);
    assert.equal(f.providerPosts(), 1);
    assert.equal(f.sqlite.prepare('SELECT count(*) n FROM anonymous_credit_charges').get().n, 1);
});

for (const charge of ['outage', 'lost', {}, { success: 'true', diamonds: 24 }, { success: true }, { success: true, diamonds: -1 }, { success: true, diamonds: 1.5 }, { success: true, diamonds: 24, state: 'refunded' }, { success: false, diamonds: 0, reason: 'insufficient_diamonds' }]) {
    test(`unconfirmed charge cannot submit paid work: ${JSON.stringify(charge)}`, async t => {
        const f = await endpoint(t, { tier: 'free', charge });
        const r = await f.invoke();
        assert.notEqual(r.status, 202); assert.equal(f.providerPosts(), 0); assert.equal(f.charges.length, 1);
        const job = f.sqlite.prepare('SELECT * FROM ai_transcription_jobs').get();
        assert.equal(job.status, 'failed'); assert.equal(f.refunds[0].p_job_id, f.charges[0].p_job_id);
    });
}

test('database failure after charging cannot authorize provider submission or replacement job', async t => {
    const f = await endpoint(t, { tier: 'free' });
    const prepare = f.db.prepare.bind(f.db);
    f.db.prepare = sql => {
        if (sql.includes("SET submission_state='submitting'")) throw new Error('D1 write unavailable');
        return prepare(sql);
    };
    const first = await f.invoke(); assert.equal(first.status, 500); assert.equal(f.providerPosts(), 0);
    const retry = await f.invoke({ forceRefresh: true }); assert.equal(retry.status, 202);
    assert.equal(retry.body.jobId, f.charges[0].p_job_id); assert.equal(f.charges.length, 1); assert.equal(f.providerPosts(), 0);
});

test('a concurrently failed/refunding job cannot submit even after a charge response', async t => {
    const f = await endpoint(t, { tier: 'free' });
    const original = DiamondService.prototype.consumeDiamond;
    t.mock.method(DiamondService.prototype, 'consumeDiamond', async function (...args) {
        const result = await original.apply(this, args);
        await atomicFailAndRefundAiJob(f.db, args[5]);
        return result;
    });
    const r = await f.invoke();
    assert.equal(r.status, 500); assert.equal(f.providerPosts(), 0);
    assert.equal(f.sqlite.prepare('SELECT refund_status FROM ai_transcription_jobs').get().refund_status, 'pending');
});

for (const result of [{ success: 'true', state: 'refunded' }, { success: true }, { success: true, state: 'charged' }, { success: false, state: 'refunded' }]) {
    test(`malformed refund acknowledgement remains recoverable: ${JSON.stringify(result)}`, async t => {
        const { db, sqlite, reserve } = await fixture(t);
        const job = await reserve('refund-malformed', uid); await atomicFailAndRefundAiJob(db, job.id);
        t.mock.method(globalThis, 'fetch', async () => Response.json(result));
        assert.equal(await recoverJobRefund({ VOCAB_DB: db, SUPABASE_SERVICE_ROLE_KEY: 'fixture' }, job.id), false);
        const row = sqlite.prepare('SELECT refund_status,diamonds_refunded FROM ai_transcription_jobs').get();
        assert.equal(row.refund_status, 'pending'); assert.equal(row.diamonds_refunded, 0);
    });
}


test('generic refunds reject malformed balances without publishing them', async t => {
    const user = { id: uid, diamonds: 2 };
    const service = new DiamondService(null);
    for (const result of [{ success: 'true', diamonds: 3 }, { success: true }, { success: true, diamonds: -1 }, { success: true, diamonds: 1.5 }]) {
        t.mock.method(globalThis, 'fetch', async () => Response.json(result));
        assert.equal(await service.refundDiamond('unused', null, { SUPABASE_SERVICE_ROLE_KEY: 'fixture' }, user), false);
        assert.equal(user.diamonds, 2);
    }
});


for (const [duration, cost] of [[600,1],[601,2],[1200,2],[1201,3],[2100,3],[2101,4],[2700,4]]) {
    test(`quote returns verified ${cost}-diamond price for ${duration}s without a paid operation`, async t => {
        const f = await endpoint(t, { tier: 'premium', duration });
        const r = await f.invoke({ quoteOnly: true, duration: 1, cost: 0, turnstileToken: undefined });
        assert.equal(r.status, 200); assert.equal(r.body.cost, cost); assert.equal(r.body.canGenerate, true);
        assert.equal(r.body.diamonds, 25); assert.equal(r.body.durationSeconds, duration);
        assert.equal(f.charges.length, 0); assert.equal(f.providerPosts(), 0);
        assert.equal(f.sqlite.prepare('SELECT count(*) n FROM ai_transcription_jobs').get().n, 0);
        assert.equal(f.calls.filter(c => c.host === 'challenges.cloudflare.com').length, 0);
    });
}

for (const [tier, duration, balance, reason] of [['free',601,5,'VIDEO_TOO_LONG'],['pro',1201,10,'VIDEO_TOO_LONG'],['premium',2701,25,'VIDEO_TOO_LONG'],['pro',900,1,'INSUFFICIENT_DIAMONDS']]) {
    test(`quote eligibility reports ${reason} for ${tier} without spending`, async t => {
        const f = await endpoint(t, { tier, duration, balance });
        const r = await f.invoke({ quoteOnly: true });
        assert.equal(r.status, 200); assert.equal(r.body.canGenerate, false); assert.equal(r.body.reason, reason);
        assert.equal(f.charges.length, 0); assert.equal(f.providerPosts(), 0);
    });
}

test('failed duration quote cannot return an estimated price', async t => {
    const f = await endpoint(t, { youtube: 'outage' });
    const r = await f.invoke({ quoteOnly: true, duration: 60 });
    assert.equal(r.status, 503); assert.equal(r.body.errorCode, 'VIDEO_DURATION_UNAVAILABLE');
    assert.equal(r.body.cost, undefined); assert.equal(f.providerPosts(), 0);
});

test('cached quote is free even when YouTube is unavailable', async t => {
    const f = await endpoint(t, { cached: true, youtube: 'outage' });
    const r = await f.invoke({ quoteOnly: true });
    assert.equal(r.body.cost, 0); assert.equal(r.body.canGenerate, true);
    assert.equal(f.calls.filter(c => c.host === 'www.youtube.com').length, 0);
});

test('active job quote is free and retains its existing charge', async t => {
    const f = await endpoint(t);
    const first = await f.invoke(); const before = f.calls.length;
    const quote = await f.invoke({ quoteOnly: true });
    assert.equal(quote.body.cost, 0); assert.equal(quote.body.canGenerate, true);
    assert.equal(f.calls.slice(before).filter(c => c.host === 'www.youtube.com').length, 0);
    assert.equal(f.providerPosts(), 1);
    assert.equal(f.sqlite.prepare('SELECT count(*) n FROM anonymous_credit_charges').get().n, 1);
    assert.equal(f.sqlite.prepare('SELECT id FROM ai_transcription_jobs').get().id, first.body.jobId);
});

test('price changed after quoting requires reconfirmation before reservation or charge', async t => {
    const f = await endpoint(t, { tier: 'premium', duration: 600 });
    const quote = await f.invoke({ quoteOnly: true }); assert.equal(quote.body.cost, 1);
    f.setDuration(601);
    const rejected = await f.invoke({ expectedDiamondCost: quote.body.cost });
    assert.equal(rejected.status, 409); assert.equal(rejected.body.errorCode, 'DIAMOND_PRICE_CHANGED');
    assert.equal(f.providerPosts(), 0); assert.equal(f.charges.length, 0);
    assert.equal(f.sqlite.prepare('SELECT count(*) n FROM ai_transcription_jobs').get().n, 0);
    const refreshed = await f.invoke({ quoteOnly: true }); assert.equal(refreshed.body.cost, 2);
    const accepted = await f.invoke({ expectedDiamondCost: refreshed.body.cost });
    assert.equal(accepted.status, 202); assert.equal(f.charges[0].p_amount, 2);
});

for (const invalid of ['1', -1, 5, 1.5, false]) {
    test(`invalid confirmed price ${JSON.stringify(invalid)} is rejected before any provider call`, async t => {
        const f = await endpoint(t);
        const r = await f.invoke({ expectedDiamondCost: invalid });
        assert.equal(r.status, 400); assert.equal(f.calls.length, 0);
    });
}

test('warm quotes reuse verified metadata but a new paid submission freshly verifies and records evidence', async t => {
    const f = await endpoint(t, { tier: 'premium', duration: 601 });
    const first = await f.invoke({ quoteOnly: true });
    const second = await f.invoke({ quoteOnly: true });
    assert.equal(first.body.cost, 2); assert.equal(second.body.cost, 2);
    assert.equal(f.calls.filter(c => c.host === 'www.googleapis.com').length, 1);
    const paid = await f.invoke({ expectedDiamondCost: 2 });
    assert.equal(paid.status, 202);
    assert.equal(f.calls.filter(c => c.host === 'www.googleapis.com').length, 2);
    const job = f.sqlite.prepare('SELECT * FROM ai_transcription_jobs').get();
    assert.equal(job.verified_duration_seconds, 601);
    assert.equal(job.duration_source, 'youtube_data_api');
    assert.ok(job.duration_verified_at > 0);
    assert.equal(f.charges[0].p_amount, 2);
});
test('missing official configuration fails without creating or charging a job', async t => {
    const f = await endpoint(t, { tier: 'premium' });
    delete f.env.YOUTUBE_DATA_API_KEY;
    const r = await f.invoke();
    assert.equal(r.status, 503); assert.equal(r.body.errorCode, 'VIDEO_METADATA_NOT_CONFIGURED');
    assert.equal(f.charges.length, 0); assert.equal(f.providerPosts(), 0);
});
