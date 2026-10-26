import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture } from './fixtures/transcription-db.mjs';
import { parseYouTubeDuration, resolveVerifiedVideoMetadata } from '../functions-src/services/video-metadata.service.js';
import { onRequestPost } from '../functions-src/api/video-info.js';

const videoId = 'abcdefghijk';
const item = (duration = 'PT601S', broadcast = 'none', id = videoId) => ({ id, contentDetails: { duration }, snippet: { liveBroadcastContent: broadcast } });
const context = f => ({ db: f.db, env: { VOCAB_DB: f.db, YOUTUBE_DATA_API_KEY: 'fixture-key' } });

test('ISO duration parsing preserves every price boundary and hour/day forms', () => {
    for (const [iso, seconds] of [['PT600S',600],['PT600.1S',601],['PT20M',1200],['PT35M1S',2101],['PT1H2M3S',3723],['P1DT1H',90000]]) assert.equal(parseYouTubeDuration(iso), seconds);
    for (const invalid of [null,{},'', 'PT', 'PT0S', 'PT-1S', '601', 'PT1.2M', 'PTInfinityS']) assert.equal(parseYouTubeDuration(invalid), null);
});
test('warm quotes reuse exact server evidence; fresh spending checks bypass it', async t => {
    const f = await fixture(t); let calls = 0;
    t.mock.method(globalThis, 'fetch', async (url, options) => {
        calls++; assert.equal(new URL(url).hostname, 'www.googleapis.com');
        assert.equal(options.redirect, 'manual'); assert.equal(options.headers['X-Goog-Api-Key'], 'fixture-key');
        assert.equal(new URL(url).searchParams.has('key'), false);
        return Response.json({ items: [item(calls === 1 ? 'PT601S' : 'PT1201S')] });
    });
    assert.equal((await resolveVerifiedVideoMetadata(context(f), videoId)).duration, 601);
    assert.equal((await resolveVerifiedVideoMetadata(context(f), videoId)).duration, 601);
    assert.equal(calls, 1);
    assert.equal((await resolveVerifiedVideoMetadata(context(f), videoId, { fresh: true })).duration, 1201);
    assert.equal(calls, 2);
});
for (const value of [item('PT601S','none','wrong-id'), item('PT0S'), item('bad'), { id:videoId,contentDetails:{duration:'PT30S'} }]) {
    test(`invalid or unrelated provider evidence cannot be cached: ${JSON.stringify(value)}`, async t => {
        const f = await fixture(t);
        t.mock.method(globalThis,'fetch',async()=>Response.json({items:[value]}));
        await assert.rejects(resolveVerifiedVideoMetadata(context(f),videoId), /VIDEO_DURATION_UNAVAILABLE/);
        assert.equal(f.sqlite.prepare('SELECT count(*) n FROM verified_video_metadata').get().n,0);
    });
}
for (const broadcast of ['live','upcoming']) {
    test(`${broadcast} is explicitly ineligible even with positive duration`, async t => {
        const f = await fixture(t);
        t.mock.method(globalThis,'fetch',async()=>Response.json({items:[item('PT601S',broadcast)]}));
        assert.equal((await resolveVerifiedVideoMetadata(context(f),videoId)).isLive,true);
    });
}
test('ended recording is eligible based on none state and finite duration', async t => {
    const f = await fixture(t);
    t.mock.method(globalThis,'fetch',async()=>Response.json({items:[{...item(),liveStreamingDetails:{actualEndTime:'2026-10-25T00:00:00Z'}}]}));
    assert.equal((await resolveVerifiedVideoMetadata(context(f),videoId)).isLive,false);
});
test('empty official results are unavailable videos, not fabricated duration', async t => {
    const f = await fixture(t);
    t.mock.method(globalThis,'fetch',async()=>Response.json({items:[]}));
    await assert.rejects(resolveVerifiedVideoMetadata(context(f),videoId),e=>e.status===404 && /VIDEO_UNAVAILABLE/.test(e.message));
});
for (const [status,reason] of [[403,'quotaExceeded'],[403,'keyInvalid'],[429,'rateLimitExceeded'],[503,'backendError']]) {
    test(`provider ${status}/${reason} preserves a backoff without another lookup`, async t => {
        const f = await fixture(t); let calls=0;
        t.mock.method(globalThis,'fetch',async()=>{calls++;return Response.json({error:{errors:[{reason}]}},{status});});
        await assert.rejects(resolveVerifiedVideoMetadata(context(f),videoId),e=>e.status===503 && e.retryAfterSeconds>0);
        await assert.rejects(resolveVerifiedVideoMetadata(context(f),videoId),e=>e.status===503);
        assert.equal(calls,1);
    });
}
for (const body of ['{', 'x'.repeat(65537)]) {
    test(`malformed or oversized metadata fails closed (${body.length} bytes)`, async t => {
        const f = await fixture(t);
        t.mock.method(globalThis,'fetch',async()=>new Response(body));
        await assert.rejects(resolveVerifiedVideoMetadata(context(f),videoId),/VIDEO_DURATION_UNAVAILABLE/);
    });
}
test('expired quote evidence is refreshed, not reused for billing', async t => {
    const f=await fixture(t);const now=Math.floor(Date.now()/1000);
    f.sqlite.prepare('INSERT INTO verified_video_metadata(video_id,duration_seconds,broadcast_state,source,verified_at,refresh_after,observed_at) VALUES(?,?,?,?,?,?,?)').run(videoId,30,'none','youtube_data_api',now-400,now-100,Date.now()-400000);
    t.mock.method(globalThis,'fetch',async()=>Response.json({items:[item()]}));
    assert.equal((await resolveVerifiedVideoMetadata(context(f),videoId)).duration,601);
});
test('daily quote budget reserves capacity for final paid verification', async t => {
    const f=await fixture(t);let calls=0;
    const ctx=context(f);ctx.env.YOUTUBE_METADATA_DAILY_BUDGET='2';
    t.mock.method(globalThis,'fetch',async url=>{calls++;return Response.json({items:[item('PT601S','none',new URL(url).searchParams.get('id'))]});});
    await resolveVerifiedVideoMetadata(ctx,videoId);
    await assert.rejects(resolveVerifiedVideoMetadata(ctx,'other000001'),e=>e.retryAfterSeconds===3600);
    await resolveVerifiedVideoMetadata(ctx,videoId,{fresh:true});
    await assert.rejects(resolveVerifiedVideoMetadata(ctx,videoId,{fresh:true}));
    assert.equal(calls,2);
});
test('client reports correct estimates without touching verified billing evidence', async t => {
    const f=await fixture(t);const now=Math.floor(Date.now()/1000);
    f.sqlite.prepare('INSERT INTO verified_video_metadata(video_id,duration_seconds,broadcast_state,source,verified_at,refresh_after,observed_at) VALUES(?,?,?,?,?,?,?)').run(videoId,1201,'none','youtube_data_api',now,now+300,Date.now());
    for(const [duration,isEstimate,expected] of [[100,true,100],[900,false,900],[110,true,900],[950,false,950]]) {
        const response=await onRequestPost({request:new Request('https://voca.study/api/video-info',{method:'POST',headers:{'Content-Type':'application/json','CF-Connecting-IP':'192.0.2.77'},body:JSON.stringify({videoId,duration,isEstimate})}),env:{VOCAB_DB:f.db}});
        assert.equal(response.status,200);
        assert.equal(f.sqlite.prepare('SELECT duration_seconds FROM video_languages WHERE video_id=?').get(videoId).duration_seconds,expected);
        assert.equal(f.sqlite.prepare('SELECT duration_seconds FROM verified_video_metadata WHERE video_id=?').get(videoId).duration_seconds,1201);
    }
});

for (const [stream, expected] of [[{actualStartTime:'2026-10-26T00:00:00Z'},'live'],[{scheduledStartTime:'2026-10-27T00:00:00Z'},'upcoming']]) {
    test(`broadcast timestamps detect ${expected} even when snippet state is none`, async t => {
        const f=await fixture(t);
        t.mock.method(globalThis,'fetch',async()=>Response.json({items:[{...item('PT30S'),liveStreamingDetails:stream}]}));
        const result=await resolveVerifiedVideoMetadata(context(f),videoId);
        assert.equal(result.isLive,true);assert.equal(result.broadcastState,expected);
    });
}
test('empty broadcast details do not establish an eligible recording', async t => {
    const f=await fixture(t);
    t.mock.method(globalThis,'fetch',async()=>Response.json({items:[{...item('PT30S'),liveStreamingDetails:{}}]}));
    await assert.rejects(resolveVerifiedVideoMetadata(context(f),videoId),/VIDEO_DURATION_UNAVAILABLE/);
});
