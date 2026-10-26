import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const modulePath = process.env.VOCA_MINIFLARE_MODULE;
test('official metadata cache, quota and fresh verification execute in workerd/D1', {skip: !modulePath}, async t => {
    const { Miniflare, Log, LogLevel } = await import(pathToFileURL(modulePath));
    const root = new URL('..', import.meta.url).pathname;
    const folder = await mkdtemp(join(tmpdir(), 'voca-official-metadata-'));
    t.after(() => rm(folder, {recursive:true,force:true}));
    const scriptPath = join(folder,'worker.mjs');
    await build({stdin:{contents:`import { resolveVerifiedVideoMetadata } from ${JSON.stringify(join(root,'functions-src/services/video-metadata.service.js'))};
        import { onRequestGet } from ${JSON.stringify(join(root,'functions-src/api/video-info.js'))};
        export default {async fetch(request,env) {try {const url=new URL(request.url);if(url.searchParams.has('details'))return onRequestGet({request,env});return Response.json(await resolveVerifiedVideoMetadata({env},'abcdefghijk',{fresh:url.searchParams.has('fresh')}));} catch(e) {return Response.json({error:e.message},{status:e.status||500});}}};`,resolveDir:root},bundle:true,format:'esm',platform:'browser',outfile:scriptPath,logLevel:'silent'});
    let calls = 0;
    const mf = new Miniflare({rootPath:folder,modulesRoot:folder,scriptPath,modules:true,compatibilityDate:'2024-12-20',compatibilityFlags:['nodejs_compat'],cf:false,
        d1Databases:['VOCAB_DB'],bindings:{YOUTUBE_DATA_API_KEY:'fixture-only'},log:new Log(LogLevel.ERROR),outboundService:async request=>{
            calls++;const url=new URL(request.url);
            assert.equal(url.hostname,'www.googleapis.com');assert.equal(request.headers.get('X-Goog-Api-Key'),'fixture-only');assert.equal(url.searchParams.has('key'),false);
            return Response.json({items:[{id:'abcdefghijk',contentDetails:{duration:calls===1?'PT601S':'PT1201S'},snippet:{liveBroadcastContent:'none',title:'Official fixture title',channelTitle:'Official fixture channel',channelId:'UCaaaaaaaaaaaaaaaaaaaaaa',categoryId:'22',tags:['fixture']}}]});
        }});
    t.after(()=>mf.dispose());
    const db=await mf.getD1Database('VOCAB_DB');
    for (const file of ['db/schema.sql','db/migrations/d1/20261023_credit_recovery.sql','db/migrations/d1/20261024_gladia_inbox.sql','db/migrations/d1/20261025_gladia_submission_state.sql','db/migrations/d1/20261026_verified_video_metadata.sql','db/migrations/d1/20261026_video_metadata_details.sql']) {
        const schema=await readFile(join(root,file),'utf8');
        const statements=schema.replace(/--[^\n]*/g,'').split(schema.includes('ADD COLUMN snippet_json') ? /;\s*(?=(?:CREATE|ALTER|UPDATE)\b|$)/i : /;\s*(?=(?:CREATE|ALTER)\b|$)/i);
        for(const sql of statements.map(s=>s.trim()).filter(Boolean)) await db.prepare(sql).run();
    }
    for(const [path,expected] of [['/',601],['/',601],['/?fresh',1201]]) {
        const response=await mf.dispatchFetch('https://fixture.invalid'+path);
        assert.equal(response.status,200,await response.clone().text());assert.equal((await response.json()).duration,expected);
    }
    const display=await mf.dispatchFetch('https://fixture.invalid/?details&videoId=abcdefghijk');
    assert.equal(display.status,200,await display.clone().text());
    const body=await display.json();assert.equal(body.title,'Official fixture title');assert.equal(body.category,'vlog');assert.equal(body.youtubeCategoryId,'22');
    assert.equal((await db.prepare('SELECT title FROM video_languages').first()).title,'Official fixture title');
    assert.equal(calls,2);
    assert.equal((await db.prepare('SELECT requests FROM video_metadata_api_budget').first()).requests,2);
    assert.equal((await db.prepare('SELECT duration_seconds FROM verified_video_metadata').first()).duration_seconds,1201);
});
