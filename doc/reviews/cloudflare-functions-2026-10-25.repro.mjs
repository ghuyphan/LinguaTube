// Review evidence: assertions describe open defects at revision 79b9d0e.
// All outbound fetches are mocked; no live credentials or provider calls are used.
import assert from 'node:assert/strict';
import { onRequestPost as transcript } from '../../functions-src/api/transcript.js';
import { onRequestGet as diamonds } from '../../functions-src/api/diamonds.js';
import { onRequestPost as backfill } from '../../functions-src/api/video-info.js';
import { onRequestPost as dual } from '../../functions-src/api/dual-subtitles.js';
import { TranscriptService } from '../../functions-src/services/transcript.service.js';
import { GladiaProvider } from '../../functions-src/providers/gladia.js';
import { validateVideoRequest } from '../../functions-src/middlewares/video-validator.js';
import { saveTranslation } from '../../functions-src/utils/translation-cache.js';
import { getRecommendedVideosFromCloudflare } from '../../functions-src/data/video-info-db.js';
import { enrichSegmentsWithTokens } from '../../functions-src/utils/tokenizer.js';

const originalFetch = globalThis.fetch;
globalThis.fetch = async () => { throw new Error('Unexpected live fetch forbidden'); };
const evidence = [];
const vid = 'abcdefghijk';
const request = (path, body, ip) => new Request(`https://voca.study/api/${path}`, {method:'POST',headers:{'CF-Connecting-IP':ip},body:JSON.stringify(body)});
const row = {available_languages:'[]',sub_languages:'[]',duration_seconds:120,title:'A normal English video',channel:'Teacher',levels:'{}'};
function database(first, run = () => ({success:true,meta:{changes:1}}), all = () => ({success:true,results:[]})) {
  return {prepare(sql) { return {args:[],bind(...args){this.args=args;return this;},async first(){return first(sql,this.args);},async run(){return run(sql,this.args);},async all(){return all(sql,this.args);}};}};
}
const record = (id, result) => { evidence.push({id,...result}); console.log(id, JSON.stringify(result)); };

// A metadata row from video-info is enough to suppress the native provider.
{
  let providerCalls=0;
  globalThis.fetch=async()=>{providerCalls++;throw new Error('Native provider should have been called');};
  const db=database(sql=>sql.includes('SELECT available_languages')?row:null);
  const res=await transcript({env:{VOCAB_DB:db,SUPADATA_API_KEY:'test'},request:request('transcript',{videoId:vid,lang:'en',duration:120,title:row.title},'review-native')});
  const body=await res.json();
  assert.equal(body.errorCode,'NO_NATIVE');assert.equal(providerCalls,0);
  record('native_metadata_false_negative',{status:res.status,errorCode:body.errorCode,cache:res.headers.get('X-Cache'),providerCalls});
}

// Transcript status omits env, so it disagrees with the dedicated credits endpoint.
{
  const db=database(sql=>sql.includes('SELECT available_languages')?{...row,available_languages:'["en"]',sub_languages:'["en"]'}:sql.includes('anonymous_credit_balances')?{client_id:'hash',diamonds:0,last_regen:Date.now()}:null);
  const env={VOCAB_DB:db,TRANSCRIPT_STORAGE:{get:async()=>({customMetadata:{source:'ai'},json:async()=>({segments:[{text:'Hello',start:0,duration:1,tokens:[{surface:'Hello'}]}]})})}};
  const a=await (await transcript({env,request:request('transcript',{videoId:vid,lang:'en',duration:120,title:row.title},'review-balance')})).json();
  const b=await (await diamonds({env,request:new Request('https://voca.study/api/diamonds',{headers:{'CF-Connecting-IP':'review-balance'}})})).json();
  assert.equal(a.diamonds,3);assert.equal(b.diamonds,0);
  record('transcript_balance_disagrees',{transcriptDiamonds:a.diamonds,actualDiamonds:b.diamonds,whisperAvailable:a.whisperAvailable});
}

// A successful YouTube scrape is bypassed by a nonnumeric hint plus client-populated D1 duration.
{
  let storedDuration,job,submitted=0,charged=0;
  const db=database((sql,args)=>{
    if(sql.includes('SELECT duration_seconds'))return {duration_seconds:storedDuration};
    if(sql.includes('SELECT available_languages'))return {...row,duration_seconds:storedDuration};
    if(sql.includes('SELECT * FROM ai_transcription_jobs WHERE id'))return job;
    if(sql.includes('SELECT * FROM anonymous_credit_balances'))return {client_id:args[0],diamonds:3,last_regen:Date.now()};
    if(sql.includes('SELECT * FROM anonymous_credit_charges'))return {job_id:job.id,client_id:job.creditOwner,amount:charged,state:'charged'};
    if(sql.includes('SELECT diamonds FROM anonymous_credit_balances'))return {diamonds:3-charged};
    return null;
  },(sql,args)=>{
    if(sql.includes('INSERT INTO video_languages'))storedDuration=args[1];
    if(sql.includes('INSERT INTO ai_transcription_jobs'))job={id:args[0],video_id:vid,language:'en',created_at:Math.floor(Date.now()/1000),status:'queued'};
    if(sql.includes('INSERT INTO anonymous_credit_charges')){charged=args[2];job.creditOwner=args[1];}
    return {success:true,meta:{changes:1}};
  });
  assert.equal((await backfill({env:{VOCAB_DB:db},request:request('video-info',{videoId:vid,duration:30},'review-duration')})).status,200);
  globalThis.fetch=async url=>{
    if(String(url).includes('youtube.com/watch'))return new Response('"lengthSeconds":"1800"');
    if(String(url).includes('siteverify'))return Response.json({success:true});
    if(String(url).includes('api.gladia.io')){submitted++;return Response.json({id:'provider-review',result_url:'https://api.gladia.io/v2/pre-recorded/provider-review'});}
    throw new Error('Unexpected external call');
  };
  assert.equal(await validateVideoRequest(vid,'en','not-a-number','whisper',600,{title:row.title}),null);
  const env={VOCAB_DB:db,GLADIA_API_KEY:'test-key',TURNSTILE_SECRET_KEY:'test-secret'};
  const response=await transcript({env,request:request('transcript',{videoId:vid,lang:'en',duration:'not-a-number',title:row.title,preferAI:true,turnstileToken:'valid-mocked-token'},'review-duration-spend')});
  const body=await response.json();
  assert.equal(response.status,202);assert.equal(body.status,'processing');assert.equal(submitted,1);assert.equal(charged,1);
  record('untrusted_duration_authorizes_spend',{anonymousStoredDuration:storedDuration,youtubeReportedDuration:1800,tierCapSeconds:600,responseStatus:response.status,providerSubmissions:submitted,charged});
}

// A different anonymous requester can fail an active job before its own charge fails.
{
  let victim={id:'victim-job',video_id:vid,language:'en',user_id:'victim-user',status:'processing',created_at:Math.floor(Date.now()/1000)};
  let replacement;
  const db=database((sql,args)=>{
    if(sql.includes('SELECT duration_seconds'))return {duration_seconds:120};
    if(sql.includes('status IN (\'queued\', \'processing\')'))return victim.status==='processing'?victim:null;
    if(sql.includes('SELECT * FROM ai_transcription_jobs WHERE id'))return args[0]===victim.id?victim:replacement;
    return null;
  },(sql,args)=>{
    if(sql.includes("SET status = 'failed'") && args[2]===victim.id)victim={...victim,status:'failed',error_code:args[0]};
    if(sql.includes('INSERT INTO ai_transcription_jobs'))replacement={id:args[0],status:'queued'};
    return {success:true,meta:{changes:1}};
  });
  const service=new TranscriptService(null,null,{consumeDiamond:async()=>({success:false,reason:'insufficient_diamonds',diamonds:0,requiredDiamonds:1})},null);
  await assert.rejects(service.startAIJob({db,env:{VOCAB_DB:db}},{videoId:vid,lang:'en',clientId:'unrelated-anonymous',user:null,tier:'free',forceRefresh:true,diamondInfo:{}}),/INSUFFICIENT_DIAMONDS/);
  assert.equal(victim.status,'failed');assert.equal(victim.error_code,'SUPERSEDED');
  record('cross_user_force_refresh',{victimStatus:victim.status,victimError:victim.error_code,attackerCharge:'rejected'});
}

// Both cache misses pass the in-flight check before either registers its work.
{
  let reads=0,providerCalls=0;
  let release;
  const bothReading=new Promise(resolve=>release=resolve);
  const r2={get:async()=>{reads++;if(reads===2)release();await bothReading;return null;},put:async()=>({etag:'saved'})};
  globalThis.fetch=async()=>{providerCalls++;await new Promise(resolve=>setTimeout(resolve,20));return Response.json([[['<t id="0">Bonjour</t>']]]);};
  const tasks=[];
  const env={TRANSCRIPT_STORAGE:r2};
  const body={videoId:'bcdefghijkl',sourceLang:'en',targetLang:'vi',segments:[{text:'Hello',start:0,duration:1}]};
  const responses=await Promise.all([1,2].map(i=>dual({env,request:request('dual-subtitles',body,`review-stampede-${i}`),waitUntil:p=>tasks.push(p)})));
  await Promise.all(tasks);
  assert.ok(responses.every(res=>res.status===200));assert.equal(providerCalls,2);
  record('dual_stampede',{simultaneousIdenticalRequests:2,providerCalls});
}

// Conditional R2 writes protect the etag but drop every cue absent in the new array.
{
  let saved;
  const segments=[0,1,2].map(i=>({start:i,text:`Source ${i}`,translation:`Translated ${i}`}));
  const r2={get:async()=>({etag:'old',json:async()=>({segments})}),put:async(_key,body)=>{saved=JSON.parse(body);return {etag:'new'};}};
  await saveTranslation(r2,vid,'en','vi',[{start:1,text:'Source 1',translation:'New translation'}]);
  assert.equal(saved.segments.length,1);
  record('translation_subset_drops_cues',{existingCues:segments.length,savedCues:saved.segments.length});
}

// Probe limit is silently treated as exhaustion when the SQL page is short.
{
  const rows=Array.from({length:11},(_,i)=>({video_id:`video${String(i).padStart(6,'0')}`,title:'Lesson',channel:'Teacher',available_languages:'["en"]',sub_languages:'[]',levels:'{}',duration_seconds:120,updated_at:100-i}));
  let probes=0;
  const db=database(()=>null,()=>({success:true}),(sql,args)=>({success:true,results:rows}));
  const r2={head:async key=>{probes++;return key.includes(rows[10].video_id)?{etag:'exists'}:null;}};
  const res=await getRecommendedVideosFromCloudflare(db,r2,'en',12,null,false,0,null,{includePage:true});
  assert.equal(probes,10);assert.equal(res.videos.length,0);assert.equal(res.hasMore,false);
  record('recommendation_probe_exhaustion',{eligibleLegacyRows:11,probes,returnedVideos:res.videos.length,hasMore:res.hasMore,unprobedTranscriptExists:true});
}

// Lost submit responses get retried without an idempotency identity.
{
  const accepted=[];
  globalThis.fetch=async(_url,options)=>{accepted.push(JSON.parse(options.body));if(accepted.length===1)throw new Error('Response lost after provider acceptance');return Response.json({id:'second-job',result_url:'https://api.gladia.io/v2/pre-recorded/second-job'});};
  const result=await new GladiaProvider('test-key').submitTranscriptionJob('https://www.youtube.com/watch?v=abcdefghijk');
  assert.equal(accepted.length,2);assert.deepEqual(accepted[0],accepted[1]);
  record('ambiguous_provider_retry',{acceptedSubmissions:accepted.length,trackedJob:result.id,bodyHasOperationId:Object.hasOwn(accepted[0],'job_id')});
}

// Enrichment awaits the unbounded builder before the advertised 2s fallback.
{
  let dictionaryFetches=0;
  globalThis.fetch=()=>{dictionaryFetches++;return new Promise(()=>{});};
  const pending=enrichSegmentsWithTokens([{text:'日本語',start:0,duration:1}],'ja');
  const result=await Promise.race([pending.then(()=> 'completed'),new Promise(resolve=>setTimeout(()=>resolve('still_pending'),2200))]);
  assert.equal(result,'still_pending');assert.ok(dictionaryFetches>0);
  record('japanese_enrichment_no_deadline',{afterMs:2200,result,dictionaryFetches});
}

globalThis.fetch=originalFetch;
console.log(`Confirmed ${evidence.length} review scenarios; all network calls mocked.`);
