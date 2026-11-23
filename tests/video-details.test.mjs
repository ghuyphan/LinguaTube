import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture } from './fixtures/transcription-db.mjs';
import { onRequestGet } from '../functions-src/api/video-info.js';
import { onRequestPost as onTranscriptPost } from '../functions-src/api/transcript.js';
import { onRequestPost as onUnplayablePost } from '../functions-src/api/video-unplayable.js';
import { refreshCatalogVideoAvailability, resolveVerifiedVideoMetadata } from '../functions-src/services/video-metadata.service.js';
import { getRecommendedVideosFromCloudflare, saveVideoAvailabilityChecks } from '../functions-src/data/video-info-db.js';
import { detectVideoCategory } from '../functions-src/services/category.service.js';
import { saveVideoLanguages, saveVideoCategory } from '../functions-src/data/video-info-db.js';

const videoId='details0001';
const channelId='UC'+'a'.repeat(22);
function video({title='生活筆記',categoryId='22',tags=['旅行'],state='none'}={}) {
    return {id:videoId,contentDetails:{duration:'PT1236S'},snippet:{title,channelTitle:'懶散日記',channelId,categoryId,tags,
        thumbnails:{high:{url:`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}},liveBroadcastContent:state}};
}
function context(f,country='XX') {return {request:new Request(`https://voca.study/api/video-info?videoId=${videoId}`,{headers:{'CF-Connecting-IP':'192.0.2.29','CF-IPCountry':country}}),env:{VOCAB_DB:f.db,YOUTUBE_DATA_API_KEY:'fixture-key'}};}

test('official display metadata populates native-compatible fields and preserves caption discovery',async t=>{
    const f=await fixture(t);let calls=0;
    f.sqlite.prepare(`INSERT INTO video_languages(video_id,title,available_languages,sub_languages,has_auto_captions,category,created_at,updated_at) VALUES(?,'Stale title','["zh"]','["zh","en"]',1,'general',100,100)`).run(videoId);
    t.mock.method(globalThis,'fetch',async url=>{calls++;assert.equal(new URL(url).hostname,'www.googleapis.com');return Response.json({items:[video()]});});
    const r=await onRequestGet(context(f));assert.equal(r.status,200);const body=await r.json();
    assert.equal(body.title,'生活筆記');assert.equal(body.channel,'懶散日記');assert.equal(body.channelId,channelId);
    assert.equal(body.youtubeCategoryId,'22');assert.equal(body.category,'vlog');assert.deepEqual(body.tags,['旅行']);
    assert.equal(body.duration,1236);assert.equal(body.source,'youtube_data_api');
    assert.deepEqual(body.availableLanguages,['zh']);assert.deepEqual(body.subLanguages,['zh','en']);assert.equal(body.hasAutoCaptions,true);
    assert.equal(f.sqlite.prepare('SELECT updated_at FROM video_languages WHERE video_id=?').get(videoId).updated_at,100);
    const writes=f.sqlite.prepare('SELECT total_changes() n').get().n;
    assert.equal((await onRequestGet(context(f))).status,200);assert.equal(calls,1);
    assert.equal(f.sqlite.prepare('SELECT total_changes() n').get().n,writes,'Warm metadata reads do not rewrite the catalog');
    await resolveVerifiedVideoMetadata(context(f),videoId);assert.equal(calls,1,'AI quotes share display metadata');
});
test('billing metadata lookup also fills display metadata without another request',async t=>{
    const f=await fixture(t);let calls=0;
    t.mock.method(globalThis,'fetch',async()=>{calls++;return Response.json({items:[video()]});});
    await resolveVerifiedVideoMetadata(context(f),videoId);
    assert.equal((await onRequestGet(context(f))).status,200);assert.equal(calls,1);
});
test('older duration-only cache upgrades to complete official details',async t=>{
    const f=await fixture(t);const now=Math.floor(Date.now()/1000);let calls=0;
    f.sqlite.prepare('INSERT INTO verified_video_metadata(video_id,duration_seconds,broadcast_state,source,verified_at,refresh_after,observed_at) VALUES(?,?,?,?,?,?,?)').run(videoId,1236,'none','youtube_data_api',now,now+300,Date.now()-1);
    t.mock.method(globalThis,'fetch',async()=>{calls++;return Response.json({items:[video()]});});
    assert.equal((await onRequestGet(context(f))).status,200);assert.equal(calls,1);
});
test('explicit category survives official refresh and removed tags are cleared',async t=>{
    const f=await fixture(t);let current=video();
    t.mock.method(globalThis,'fetch',async()=>Response.json({items:[current]}));
    await onRequestGet(context(f));assert.equal(await saveVideoCategory(f.db,videoId,'conversation'),true);
    current=video({title:'New title',categoryId:'10',tags:[]});
    await resolveVerifiedVideoMetadata(context(f),videoId,{fresh:true});
    const body=await (await onRequestGet(context(f))).json();
    assert.equal(body.title,'New title');assert.equal(body.category,'conversation');assert.equal(body.youtubeCategoryId,'10');
    assert.equal(body.categorySource,'manual');assert.deepEqual(body.tags,[]);
});
test('live metadata is displayable but remains explicitly live',async t=>{
    const f=await fixture(t);
    t.mock.method(globalThis,'fetch',async()=>Response.json({items:[video({state:'live'})]}));
    const r=await onRequestGet(context(f));assert.equal(r.status,200);assert.equal((await r.json()).broadcastState,'live');
});
test('official titles and tags cannot be overwritten by generic caption metadata hints',async t=>{
    const f=await fixture(t);
    t.mock.method(globalThis,'fetch',async()=>Response.json({items:[video()]}));
    await onRequestGet(context(f));
    await saveVideoLanguages(f.db,videoId,['zh'],30,'Fake title','Fake channel',true,null,null,null,'music',['Fake tag']);
    const row=f.sqlite.prepare('SELECT title,channel,category,tags,duration_seconds FROM video_languages WHERE video_id=?').get(videoId);
    assert.equal(row.title,'生活筆記');assert.equal(row.channel,'懶散日記');assert.equal(row.category,'vlog');assert.equal(row.duration_seconds,1236);
    assert.deepEqual(JSON.parse(row.tags),['旅行']);
});
test('unavailable video is not resurrected by an old catalog title',async t=>{
    const f=await fixture(t);
    f.sqlite.prepare(`INSERT INTO video_languages(video_id,title,available_languages) VALUES(?,'Old title','[]')`).run(videoId);
    t.mock.method(globalThis,'fetch',async()=>Response.json({items:[]}));
    const r=await onRequestGet(context(f));assert.equal(r.status,404);assert.equal((await r.json()).errorCode,'VIDEO_UNAVAILABLE');
});
test('missing or malformed snippet does not become a fabricated category',async t=>{
    const f=await fixture(t);
    t.mock.method(globalThis,'fetch',async()=>Response.json({items:[video({title:''})]}));
    const r=await onRequestGet(context(f));assert.equal(r.status,503);
    assert.equal(f.sqlite.prepare('SELECT count(*) n FROM video_languages').get().n,0);
});
test('official category IDs map only to supported Voca groups',()=>{
    for(const [id,expected] of [['1','anime_drama'],['10','music'],['19','vlog'],['22','vlog'],['25','news'],['27','education'],['999','general']]) {
        assert.equal(detectVideoCategory({youtubeCategoryId:id}),expected);
    }
    assert.equal(detectVideoCategory({youtubeCategoryId:'24',title:'Interview podcast'}),'conversation');
});

test('historical non-general category is conservatively preserved with official ID exposed',async t=>{
    const f=await fixture(t);
    f.sqlite.prepare(`INSERT INTO video_languages(video_id,title,available_languages,category,category_source) VALUES(?,'Old title','[]','education','legacy')`).run(videoId);
    t.mock.method(globalThis,'fetch',async()=>Response.json({items:[video()]}));
    const body=await (await onRequestGet(context(f))).json();
    assert.equal(body.category,'education');assert.equal(body.categorySource,'legacy');assert.equal(body.youtubeCategoryId,'22');
});

test('a mapping upgrade persists even when the official metadata observation is unchanged',async t=>{
    const f=await fixture(t);let calls=0;
    t.mock.method(globalThis,'fetch',async()=>{calls++;return Response.json({items:[video({categoryId:'19'})]});});
    await onRequestGet(context(f));
    f.sqlite.prepare("UPDATE video_languages SET category='general' WHERE video_id=?").run(videoId);
    const body=await (await onRequestGet(context(f))).json();
    assert.equal(body.category,'vlog');assert.equal(calls,1);
    assert.equal(f.sqlite.prepare('SELECT category FROM video_languages WHERE video_id=?').get(videoId).category,'vlog');
});

test('embeddable property is propagated when restricted or allowed', async t => {
    const f = await fixture(t);
    t.mock.method(globalThis, 'fetch', async () => Response.json({
        items: [{
            id: videoId,
            contentDetails: { duration: 'PT1236S' },
            status: { embeddable: false },
            snippet: {
                title: 'Restricted Title',
                channelTitle: 'Restricted Channel',
                channelId,
                categoryId: '22',
                tags: ['test'],
                thumbnails: { high: { url: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` } },
                liveBroadcastContent: 'none'
            }
        }]
    }));
    const res = await onRequestGet(context(f));
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.embeddable, false);

    // Warm cache preserves embeddable: false
    const cachedRes = await onRequestGet(context(f));
    assert.equal(cachedRes.status, 200);
    const cachedBody = await cachedRes.json();
    assert.equal(cachedBody.embeddable, false);
});

test('embeddable defaults to true when omitted from status', async t => {
    const f = await fixture(t);
    t.mock.method(globalThis, 'fetch', async () => Response.json({ items: [video()] }));
    const res = await onRequestGet(context(f));
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.embeddable, true);
});


test('video info distinguishes regional unavailability and keeps the response private across countries', async t => {
    const f = await fixture(t);
    const item = video();
    item.contentDetails.regionRestriction = { allowed: ['JP'] };
    item.status = { embeddable: true };
    let calls = 0;
    t.mock.method(globalThis, 'fetch', async url => {
        calls++;
        assert.match(new URL(url).searchParams.get('fields'), /regionRestriction/);
        return Response.json({ items: [item] });
    });
    for (const [country, availability] of [['VN', 'region_blocked'], ['JP', 'available'], ['XX', 'unknown']]) {
        const response = await onRequestGet(context(f, country));
        assert.equal(response.status, 200);
        assert.equal(response.headers.get('Cache-Control'), 'private, no-store');
        const body = await response.json();
        assert.equal(body.embeddable, true);
        assert.equal(body.playbackAvailability, availability);
    }
    assert.equal(calls, 1, 'Country availability is evaluated independently of the shared YouTube metadata');
    const row = f.sqlite.prepare('SELECT region_restriction, embed_blocked FROM video_languages').get();
    assert.deepEqual(JSON.parse(row.region_restriction), { allowed: ['JP'] });
    assert.equal(row.embed_blocked, 0);
});

test('catalog refresh checks region, embed, age, and deleted videos in one batch', async t => {
    const f = await fixture(t);
    const regionId = 'yNCJCeZq85k';
    const deletedId = 'missing0001';
    const ageId = 'ageBlock001';
    const noEmbedId = 'noEmbed0001';
    const okId = 'unrestrict1';
    const insert = f.sqlite.prepare(`INSERT INTO video_languages
        (video_id, title, channel, available_languages, sub_languages, updated_at, region_restriction)
        VALUES (?, ?, 'Channel', '["ja"]', '["ja"]', 100, ?)`);
    insert.run(regionId, 'Doraemon', null);
    insert.run(deletedId, 'Deleted Video', '{"blocked":["VN"]}');
    insert.run(ageId, 'Age Restricted', null);
    insert.run(noEmbedId, 'Embed Disabled', null);
    insert.run(okId, 'Unrestricted', '{"blocked":["VN"]}');

    let calls = 0;
    t.mock.method(globalThis, 'fetch', async url => {
        calls++;
        const ids = new URL(url).searchParams.get('id').split(',').sort();
        assert.deepEqual(ids, [ageId, deletedId, noEmbedId, okId, regionId].sort());
        return Response.json({ items: [
            { id: regionId, contentDetails: { duration: 'PT1186S', regionRestriction: { blocked: ['VN'] } }, status: { embeddable: true, privacyStatus: 'public' } },
            { id: ageId, contentDetails: { duration: 'PT180S', contentRating: { ytRating: 'ytAgeRestricted' } }, status: { embeddable: true, privacyStatus: 'public' } },
            { id: noEmbedId, contentDetails: { duration: 'PT180S' }, status: { embeddable: false, privacyStatus: 'public' } },
            { id: okId, contentDetails: { duration: 'PT180S' }, status: { embeddable: true, privacyStatus: 'public' } }
        ] });
    });
    const { env } = context(f);
    const browse = country => getRecommendedVideosFromCloudflare(f.db, null, 'ja', 12, null, false, 0, null, { country });
    assert.ok((await browse('VN')).some(v => v.videoId === regionId));
    assert.equal(await refreshCatalogVideoAvailability(env), 5);
    assert.deepEqual((await browse('VN')).map(v => v.videoId), [okId]);
    assert.deepEqual((await browse('JP')).map(v => v.videoId).sort(), [okId, regionId].sort());
    assert.equal(await refreshCatalogVideoAvailability(env), 0);
    assert.equal(calls, 1);
    assert.equal(f.sqlite.prepare('SELECT requests FROM video_metadata_api_budget').get().requests, 1);
    const saved = f.sqlite.prepare('SELECT region_checked_at, updated_at FROM video_languages WHERE video_id = ?').get(regionId);
    assert.equal(saved.updated_at, 100);
    assert.equal(f.sqlite.prepare('SELECT embed_blocked, embed_blocked_reason FROM video_languages WHERE video_id = ?').get(deletedId).embed_blocked_reason, 'video_unavailable');
    assert.equal(f.sqlite.prepare('SELECT embed_blocked_reason FROM video_languages WHERE video_id = ?').get(ageId).embed_blocked_reason, 'age_restricted');
    assert.equal(f.sqlite.prepare('SELECT embed_blocked_reason FROM video_languages WHERE video_id = ?').get(noEmbedId).embed_blocked_reason, 'youtube_api_not_embeddable');
    assert.equal(await saveVideoAvailabilityChecks(f.db, [{
        videoId: regionId, restriction: null, previousRestriction: '{"blocked":["VN"]}', checkedAt: saved.region_checked_at - 1
    }]), 0);
    assert.deepEqual((await browse('VN')).map(v => v.videoId), [okId]);

    // Blocked videos short-circuit /api/transcript without fetching or tokenizing.
    const blockedRes = await onTranscriptPost({
        request: new Request('https://voca.study/api/transcript', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.30', 'CF-IPCountry': 'VN' },
            body: JSON.stringify({ videoId: regionId, lang: 'ja' })
        }),
        env
    });
    assert.equal(blockedRes.status, 422);
    assert.equal((await blockedRes.json()).errorCode, 'VIDEO_REGION_BLOCKED');

    const ageRes = await onTranscriptPost({
        request: new Request('https://voca.study/api/transcript', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.30', 'CF-IPCountry': 'JP' },
            body: JSON.stringify({ videoId: ageId, lang: 'ja' })
        }),
        env
    });
    assert.equal(ageRes.status, 422);
    assert.equal((await ageRes.json()).errorCode, 'VIDEO_EMBED_BLOCKED');

    // Unknown country (XX) does not falsely 422 a region-restricted video.
    const unknownCountryRes = await onTranscriptPost({
        request: new Request('https://voca.study/api/transcript', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.30', 'CF-IPCountry': 'XX' },
            body: JSON.stringify({ videoId: regionId, lang: 'ja', preferAI: true, quoteOnly: true })
        }),
        env
    });
    assert.notEqual(unknownCountryRes.status, 422);
});

test('video-unplayable block survives warm-cache video-info and keeps embeddable consistent', async t => {
    const f = await fixture(t);
    const item = video();
    item.status = { embeddable: true, privacyStatus: 'public' };
    t.mock.method(globalThis, 'fetch', async () => Response.json({ items: [item] }));

    const first = await onRequestGet(context(f, 'VN'));
    assert.equal(first.status, 200);
    assert.equal((await first.json()).playbackAvailability, 'available');

    const report = await onUnplayablePost({
        request: new Request('https://voca.study/api/video-unplayable', {
            method: 'POST',
            headers: { 'CF-Connecting-IP': '192.0.2.31' },
            body: JSON.stringify({ videoId, errorCode: 150 })
        }),
        env: { VOCAB_DB: f.db },
        _fetchImpl: async () => new Response('{"status":"UNPLAYABLE","reason":"Playback on other websites has been disabled"}')
    });
    assert.equal((await report.json()).delisted, true);

    const warm = await onRequestGet(context(f, 'VN'));
    assert.equal(warm.status, 200);
    const warmBody = await warm.json();
    assert.equal(warmBody.playbackAvailability, 'embed_blocked');
    assert.equal(warmBody.embeddable, false);
    assert.equal(f.sqlite.prepare('SELECT embed_blocked FROM video_languages WHERE video_id = ?').get(videoId).embed_blocked, 1);
});

test('catalog refresh keeps unlisted videos playable and skips malformed items without stalling batch', async t => {
    const f = await fixture(t);
    const unlistedId = 'unlisted001';
    const noDetailsId = 'liveNoDet01';
    const badRegionId = 'badRegion01';
    const insert = f.sqlite.prepare(`INSERT INTO video_languages
        (video_id, title, channel, available_languages, sub_languages, updated_at, region_restriction)
        VALUES (?, ?, 'Channel', '["ja"]', '["ja"]', 100, ?)`);
    insert.run(unlistedId, 'Unlisted Course', null);
    insert.run(noDetailsId, 'Upcoming Live', null);
    insert.run(badRegionId, 'Malformed Region', '{"blocked":["US"]}');

    t.mock.method(globalThis, 'fetch', async () => Response.json({ items: [
        { id: unlistedId, contentDetails: { duration: 'PT120S' }, status: { embeddable: true, privacyStatus: 'unlisted' } },
        { id: noDetailsId, status: { embeddable: true, privacyStatus: 'public' } },
        { id: badRegionId, contentDetails: { duration: 'PT120S', regionRestriction: { blocked: ['XX'] } }, status: { embeddable: true, privacyStatus: 'public' } }
    ] }));

    const { env } = context(f);
    assert.equal(await refreshCatalogVideoAvailability(env), 3);
    assert.equal(f.sqlite.prepare('SELECT embed_blocked FROM video_languages WHERE video_id = ?').get(unlistedId).embed_blocked, 0);
    assert.equal(f.sqlite.prepare('SELECT embed_blocked FROM video_languages WHERE video_id = ?').get(noDetailsId).embed_blocked, 0);
    assert.equal(f.sqlite.prepare('SELECT region_restriction FROM video_languages WHERE video_id = ?').get(badRegionId).region_restriction, '{"blocked":["US"]}');
    assert.equal(await refreshCatalogVideoAvailability(env), 0, 'All 3 rows advanced region_checked_at so batch does not stall');
});
