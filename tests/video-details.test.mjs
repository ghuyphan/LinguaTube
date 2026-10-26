import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture } from './fixtures/transcription-db.mjs';
import { onRequestGet } from '../functions-src/api/video-info.js';
import { resolveVerifiedVideoMetadata } from '../functions-src/services/video-metadata.service.js';
import { detectVideoCategory } from '../functions-src/services/category.service.js';
import { saveVideoLanguages, saveVideoCategory } from '../functions-src/data/video-info-db.js';

const videoId='details0001';
const channelId='UC'+'a'.repeat(22);
function video({title='生活筆記',categoryId='22',tags=['旅行'],state='none'}={}) {
    return {id:videoId,contentDetails:{duration:'PT1236S'},snippet:{title,channelTitle:'懶散日記',channelId,categoryId,tags,
        thumbnails:{high:{url:`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}},liveBroadcastContent:state}};
}
function context(f) {return {request:new Request(`https://voca.study/api/video-info?videoId=${videoId}`,{headers:{'CF-Connecting-IP':'192.0.2.29'}}),env:{VOCAB_DB:f.db,YOUTUBE_DATA_API_KEY:'fixture-key'}};}

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
