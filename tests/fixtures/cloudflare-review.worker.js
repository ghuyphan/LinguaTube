import * as recovery from '../../functions-src/services/gladia-recovery.js';
// Local validation entry point only. Never a deployable application route.
// Imports unmodified production modules; external providers are fault-injected.
import { onRequest as middleware } from '../../functions-src/api/_middleware.js';
import { onRequestPost as transcript } from '../../functions-src/api/transcript.js';
import { onRequestGet as diamonds } from '../../functions-src/api/diamonds.js';
import { onRequestPost as backfill } from '../../functions-src/api/video-info.js';
import { onRequestPost as dual } from '../../functions-src/api/dual-subtitles.js';
import { saveTranslation } from '../../functions-src/utils/translation-cache.js';
import { getRecommendedVideosFromCloudflare } from '../../functions-src/data/video-info-db.js';

const videoId = 'abcdefghijk';
let scenario;
let calls;
let dictionaryMode;
let dictionaryRejectors;
let backgroundTasks;
let acceptedJobId;
globalThis.fetch = async (input, init = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url || input.toString());
    calls.push({ host: url.hostname, path: url.pathname, method: init.method || 'GET' });
    if (url.hostname === 'www.googleapis.com') return Response.json({items:[{id:videoId,contentDetails:{duration:scenario === 'duration' ? 'PT1800S' : 'PT120S'},snippet:{liveBroadcastContent:'none'}}]});
    if (url.hostname === 'www.youtube.com') return new Response(`"lengthSeconds":"${scenario === 'duration' ? 1800 : 120}"`);
    if (url.hostname === 'challenges.cloudflare.com') return Response.json({ success: true });
    if (url.hostname === 'api.supadata.ai') return Response.json({lang:'en',availableLangs:['en'],content:[{offset:0,duration:2000,text:'Hello world.'}]});
    if (url.hostname.endsWith('.supabase.co')) return new Response(null, { status: 503 });
    if (url.hostname === 'api.gladia.io') {
        if ((init.method || 'GET') === 'GET') return Response.json({ items: [{ id: 'accepted-1', custom_metadata: { voca_job_id: acceptedJobId } }] });
        acceptedJobId = JSON.parse(init.body).custom_metadata?.voca_job_id;
        const count = calls.filter(call => call.host === url.hostname && call.method === 'POST').length;
        if (scenario === 'gladia' && count === 1) throw new Error('Fixture: accepted upstream; response lost');
        return Response.json({id:`accepted-${count}`,result_url:`https://api.gladia.io/v2/pre-recorded/accepted-${count}`});
    }
    if (url.hostname === 'translate.googleapis.com') {
        await new Promise(resolve => setTimeout(resolve, 50));
        return Response.json([[['<t id="0">Bonjour</t>']]]);
    }
    if (url.hostname === 'cdn.jsdelivr.net') {
        if (dictionaryMode === 'stall') return new Promise((_, reject) => dictionaryRejectors.push(reject));
        return new Response(null, {status:503});
    }
    throw new Error(`Unexpected outbound provider: ${url.hostname}`);
};

function count(host) { return calls.filter(call => call.host === host).length; }
function request(path, body, ip = '198.51.100.10') {
    return new Request(`https://voca.study/api/${path}`, {method:body ? 'POST' : 'GET',headers:{'User-Agent':'Mozilla/5.0 validation','CF-Connecting-IP':ip},...(body ? {body:JSON.stringify(body)} : {})});
}
async function invoke(handler, req, env, flush = true) {
    const pending = [];
    const context = {request:req,env,waitUntil(promise){pending.push(promise);}};
    const response = await middleware({...context,next:forwarded => handler({...context,request:forwarded || req})});
    if (flush) await Promise.allSettled(pending);
    else backgroundTasks.push(...pending);
    return {status:response.status,cache:response.headers.get('X-Cache'),body:await response.json()};
}
const captionBody = extra => ({videoId,lang:'en',duration:120,title:'English lesson',...extra});
const aiBody = extra => captionBody({preferAI:true,turnstileToken:'fixture-valid-token',...extra});

async function run(env) {
    const db = env.VOCAB_DB, r2 = env.TRANSCRIPT_STORAGE;
    if (scenario === 'native') {
        const seed = await invoke(backfill, request('video-info',{videoId,duration:120}),env);
        const observed = await invoke(transcript,request('transcript',captionBody()),env);
        const before = count('api.supadata.ai');
        const control = await invoke(transcript,request('transcript',captionBody({forceRefresh:true})),env);
        return {seed:seed.status,observed,providerCallsBeforeControl:before,control,providerCallsAfterControl:count('api.supadata.ai')};
    }
    if (scenario === 'duration') {
        await invoke(backfill,request('video-info',{videoId,duration:30}),env);
        const control = await invoke(transcript,request('transcript',aiBody({duration:30})),env);
        const observed = await invoke(transcript,request('transcript',aiBody({duration:'not-a-number'})),env);
        return {control,observed,providerPosts:calls.filter(call=>call.host==='api.gladia.io'&&call.method==='POST').length,
            charge:await db.prepare('SELECT amount,state FROM anonymous_credit_charges').first(),
            balance:await db.prepare('SELECT diamonds FROM anonymous_credit_balances').first(),
            job:await db.prepare('SELECT status,gladia_job_id FROM ai_transcription_jobs').first()};
    }
    if (scenario === 'refresh') {
        const control = await invoke(transcript,request('transcript',aiBody()),env);
        const afterControl = await db.prepare("SELECT status FROM ai_transcription_jobs WHERE id='victim-job'").first();
        const observed = await invoke(transcript,request('transcript',aiBody({forceRefresh:true})),env);
        return {control,afterControl,observed,victim:await db.prepare("SELECT status,error_code,refund_status FROM ai_transcription_jobs WHERE id='victim-job'").first(),
            charges:await db.prepare('SELECT COUNT(*) n FROM anonymous_credit_charges WHERE state=\'charged\'').first(),providerCalls:count('api.gladia.io')};
    }
    if (scenario === 'balance') {
        const observed = await invoke(transcript,request('transcript',captionBody()),env);
        const control = await invoke(diamonds,request('diamonds'),env);
        return {observed,control};
    }
    if (scenario === 'stampede') {
        const body = {videoId,sourceLang:'en',targetLang:'vi',segments:[{text:'Hello',start:0,duration:1}]};
        const results = await Promise.all([1,2].map(i=>invoke(dual,request('dual-subtitles',body,`198.51.100.${i}`),env)));
        const beforeControl = count('translate.googleapis.com');
        const control = await invoke(dual,request('dual-subtitles',body),env);
        return {results,providerCallsBeforeControl:beforeControl,providerCallsAfterControl:count('translate.googleapis.com'),control};
    }
    if (scenario === 'translation') {
        const key=`translations/${videoId}/en-vi.json`;
        const full=[0,1,2].map(i=>({text:`Source ${i}`,start:i,duration:1,translation:`Translation ${i}`}));
        await r2.put(key,JSON.stringify({segments:full,timestamp:Date.now(),quality:100}));
        const control=await saveTranslation(r2,videoId,'en','vi',full.map((s,i)=>({...s,translation:i===1?'Updated':null})));
        const before=(await (await r2.get(key)).json()).segments;
        const observed=await saveTranslation(r2,videoId,'en','vi',[{...full[1],translation:'Checkpoint'}]);
        const after=(await (await r2.get(key)).json()).segments;
        return {controlCount:control.totalCount,before,observedCount:observed.totalCount,after};
    }
    if (scenario === 'recommendation') {
        const control=await getRecommendedVideosFromCloudflare(db,r2,'en',12,null,false,0,null,{includePage:true});
        await db.prepare("UPDATE video_languages SET sub_languages='[]'").run();
        let observed;
        try { observed=await getRecommendedVideosFromCloudflare(db,r2,'en',12,null,false,0,null,{includePage:true}); }
        catch (error) { observed={error:error.message}; }
        return {control,observed,existingKey:!!await r2.head('transcripts/video000010/en.json')};
    }
    if (scenario === 'gladia') {
        await invoke(backfill,request('video-info',{videoId,duration:120}),env);
        const observed=await invoke(transcript,request('transcript',aiBody()),env);
        const acceptedPosts=calls.filter(call=>call.host==='api.gladia.io'&&call.method==='POST').length;
        const jobs=await db.prepare('SELECT * FROM ai_transcription_jobs').all();
        const charges=await db.prepare("SELECT COUNT(*) n,SUM(amount) total FROM anonymous_credit_charges WHERE state='charged'").first();
        let recoveredJob=null;
        if (recovery.recoverGladiaSubmission) {
            await db.prepare("UPDATE ai_transcription_jobs SET submission_started_at=strftime('%s','now')-31,next_provider_check_at=0 WHERE id=?").bind(jobs.results[0].id).run();
            await recovery.recoverGladiaSubmission(env,jobs.results[0].id);
            recoveredJob=await db.prepare('SELECT gladia_job_id,submission_state FROM ai_transcription_jobs WHERE id=?').bind(jobs.results[0].id).first();
        }
        return {observed,acceptedPosts,jobs,charges,recoveredJob,totalPostsAfterRecovery:calls.filter(call=>call.host==='api.gladia.io'&&call.method==='POST').length};
    }
    if (scenario === 'tokenizer') {
        dictionaryMode='stall';
        let settled=false;
        const pending=invoke(transcript,request('transcript',captionBody({lang:'ja'})),env,env.EXPECT_DEFECTS).then(result=>{settled=true;return result;});
        const timed=await Promise.race([pending,new Promise(resolve=>setTimeout(()=>resolve({timedOut:true}),2500))]);
        const beforeRelease={settled,timedOut:timed.timedOut===true,downloads:count('cdn.jsdelivr.net')};
        dictionaryMode='fail';
        for(const reject of dictionaryRejectors)reject(new Error('Fixture releases stalled CDN'));
        const afterRelease=await pending;
        await Promise.allSettled(backgroundTasks);
        return {beforeRelease,afterRelease};
    }
    throw new Error('Unknown validation scenario');
}

export default {
    async fetch(_request,env) {
        scenario=env.SCENARIO;calls=[];dictionaryRejectors=[];backgroundTasks=[];
        try { return Response.json({scenario,result:await run(env),outbound:calls}); }
        catch(error) { return Response.json({scenario,error:error.message,stack:error.stack,outbound:calls},{status:500}); }
    }
};
