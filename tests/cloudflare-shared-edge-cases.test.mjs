import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import { routes, cases } from './fixtures/cloudflare-edge-cases.mjs';
import { readBoundedBody, requestSignal } from '../functions-src/utils/response-body.js';
import { SimpleLRUCache, CacheManager } from '../functions-src/utils/cache-manager.js';
import { matchesSecret } from '../functions-src/utils/secret-auth.js';
import { sha256, sanitizeVideoId, sanitizeLanguage, sanitizeWord, getAllowedOrigin, errorResponse } from '../functions-src/utils/utils.js';
import { getTranscriptFromR2, saveTranscriptToR2 } from '../functions-src/data/transcript-r2.js';
import { enrichPublishedTranscript } from '../functions-src/services/transcript-enrichment.js';
import { cleanTranscriptSegments, cleanCueText } from '../functions-src/utils/transcript-utils.js';
import { verifyTurnstileToken } from '../functions-src/services/turnstile.service.js';
import { onRequest as middleware } from '../functions-src/api/_middleware.js';

const request = body => new Request('https://voca.study/api/transcript',{method:'POST',headers:{'User-Agent':'Mozilla/5.0'},body});
test('edge-case inventory names every Pages API source and exercises each route',async()=>{
 const names=(await readdir(new URL('../functions-src/api/',import.meta.url),{recursive:true})).filter(s=>s.endsWith('.js')&&s!=='_middleware.js').map(s=>s.slice(0,-3)).sort();
 assert.deepEqual(routes.map(r=>r[0]).sort(),names);
 for(const [route] of routes)assert.ok(cases.some(c=>c.route===route),route);
});
for(const [name,body] of [['truncated','{'],['scalar','42'],['null','null'],['array','[]'],['empty',''],['bad UTF-8',new Uint8Array([0xff,0xfe])]])
 test('middleware rejects '+name+' JSON before any handler work',async()=>{
  const res=await middleware({request:request(body),next:()=>assert.fail('Malformed body reached route')});assert.equal(res.status,400);
 });
test('middleware preserves signed bytes, Unicode and whitespace exactly',async()=>{
 const raw=' \n {"text":"日本語 😀","literal":"\\u003c","nested":{"a":null}}\n';
 const res=await middleware({request:request(raw),next:async r=>{assert.equal(await r.text(),raw);return new Response('ok');}});assert.equal(await res.text(),'ok');
});
test('middleware handles size in bytes rather than Unicode characters',async()=>{
 const raw=JSON.stringify({text:'語'.repeat(700000)});
 assert.ok(raw.length<2*1024*1024);assert.ok(new TextEncoder().encode(raw).length>2*1024*1024);
 assert.equal((await middleware({request:request(raw),next:()=>assert.fail('Oversize Unicode reached route')})).status,413);
});
test('bounded body accepts exactly the byte limit and cancels on one byte over',async()=>{
 assert.deepEqual(await readBoundedBody(new Response(new Uint8Array([1,2,3])),undefined,3),new Uint8Array([1,2,3]));
 let cancelled=false;
 const stream=new ReadableStream({start(c){c.enqueue(new Uint8Array([1,2]));c.enqueue(new Uint8Array([3,4]));},cancel(){cancelled=true;}});
 await assert.rejects(readBoundedBody(new Response(stream),undefined,3),/too large/);assert.equal(cancelled,true);
});
test('bounded body abort cancels a stalled stream and releases the lock',async()=>{
 const controller=new AbortController();let cancelled=false;
 const stream=new ReadableStream({cancel(){cancelled=true;}});
 const promise=readBoundedBody(new Response(stream),controller.signal,5);
 controller.abort(new Error('fixture cancel'));
 await assert.rejects(promise,/fixture cancel/);assert.equal(cancelled,true);assert.equal(stream.locked,false);
});
test('bounded body handles no-content and already-aborted signals',async()=>{
 assert.equal((await readBoundedBody(new Response(null),undefined,1)).length,0);
 const c=new AbortController();c.abort(new Error('already cancelled'));
 await assert.rejects(readBoundedBody(new Response('a'),c.signal,10),/already cancelled/);
});
test('request signal preserves caller cancellation',()=>{
 const c=new AbortController();const signal=requestSignal(Date.now()+10000,10000,c.signal);
 c.abort(new Error('caller cancelled'));assert.equal(signal.aborted,true);assert.match(signal.reason.message,/caller cancelled/);
});
test('LRU eviction follows access order and overwriting retains bounded size',()=>{
 const cache=new SimpleLRUCache(2);cache.set('a',1).set('b',2);assert.equal(cache.get('a'),1);cache.set('c',3);
 assert.equal(cache.get('b'),undefined);assert.equal(cache.size,2);cache.set('a',4);assert.equal(cache.size,2);assert.equal(cache.get('a'),4);cache.clear();assert.equal(cache.size,0);
});
test('LRU expired values are unavailable under a controlled clock',t=>{
 let now=100;t.mock.method(Date,'now',()=>now);const cache=new SimpleLRUCache(2,10);cache.set('x',1);
 now=111;assert.equal(cache.get('x'),undefined);assert.equal(cache.size,0);
});
test('cache recovers from corrupt KV and retains warm values after failed KV write',async()=>{
 const tasks=[];let fetched=0;
 const cache=new CacheManager({get:async()=>'{',put:async()=>{throw Error('fixture KV outage');}});
 const key=crypto.randomUUID();const context={waitUntil(p){tasks.push(p);}};
 assert.deepEqual((await cache.getOrFetch(context,key,async()=>{fetched++;return {ok:true};})).data,{ok:true});
 await Promise.allSettled(tasks);
 assert.equal((await cache.getOrFetch(context,key,async()=>assert.fail('Warm cache missed'))).cached,true);assert.equal(fetched,1);
});
test('stale cache is served while failed background refresh preserves previous value',async()=>{
 const tasks=[];const now=Date.now();const cache=new CacheManager({get:async()=>JSON.stringify({data:'old',timestamp:now-15000,ttl:10})});
 const result=await cache.getOrFetch({waitUntil(p){tasks.push(p);}},crypto.randomUUID(),async()=>{throw Error('fixture provider outage');},{ttl:10,staleTtl:20});
 assert.deepEqual(result,{data:'old',cached:true,stale:true});await Promise.all(tasks);
});
test('secret checks reject absent, whitespace, prefix and case variants',async()=>{
 for(const actual of ['',null,undefined,'Secret','secret ','secre','secret-extra'])assert.equal(await matchesSecret(actual,'secret'),false);
 assert.equal(await matchesSecret('secret','secret'),true);assert.equal(await matchesSecret('',' '),false);
});
test('cache key serialization distinguishes ambiguous concatenations and Unicode',async()=>{
 const arrays=[['ab','c'],['a','bc'],['a,b','c'],['a','b,c'],['日本','語'],['日','本語']];
 assert.equal(new Set(await Promise.all(arrays.map(a=>sha256(JSON.stringify(a))))).size,arrays.length);
});
test('sanitizers hold invariants across deterministic hostile and Unicode inputs',()=>{
 let seed=123456789;
 const alphabet='abc../_<>"\\`\u0000\n日本語한글😀';
 for(let i=0;i<300;i++){
  let input='';for(let j=0;j<i%125;j++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;input+=alphabet[seed%alphabet.length];}
  const id=sanitizeVideoId(input);if(id!==null)assert.match(id,/^[A-Za-z0-9_-]{11}$/);
  const word=sanitizeWord(input);if(word){assert.ok(word.length<=100);assert.doesNotMatch(word,/[\x00-\x1f\x7f<>"\\`]/);}
  assert.ok(sanitizeLanguage(input)===null||['ja','zh','ko','en'].includes(sanitizeLanguage(input)));
 }
 for(const origin of ['https://voca.study.evil.test','https://evil.test/voca.study','null','javascript:alert(1)'])assert.equal(getAllowedOrigin(origin),'https://voca.study');
});
test('server error responses do not expose internal paths or credentials',async()=>{
 const result=await errorResponse('/private/server.js Bearer fixture-secret at fn (/private/server.js:1)').json();
 assert.deepEqual(result,{error:'Internal server error'});
});
for(const mode of ['missing','malformed','throws','empty'])test('R2 transcript read tolerates '+mode,async()=>{
 const bucket=mode==='missing'?null:{get:async()=>{
  if(mode==='throws')throw Error('fixture storage unavailable');
  return {json:async()=>{if(mode==='malformed')throw Error('invalid JSON');return {segments:[]};}};
 }};
 assert.equal(await getTranscriptFromR2(bucket,'abcdefghijk','en'),null);
});
test('older AI completion cannot overwrite a newer R2 transcript',async()=>{
 let writes=0;const bucket={head:async()=>({etag:'new',customMetadata:{jobCreatedAt:'200'}}),put:async()=>{writes++;}};
 assert.equal(await saveTranscriptToR2(bucket,'abcdefghijk','en',[{text:'old'}],'ai',{jobId:'old',createdAt:100}),false);assert.equal(writes,0);
});
test('R2 transcript write collision is not reported as successful persistence',async()=>{
 const bucket={head:async()=>({etag:'old',customMetadata:{jobCreatedAt:'100'}}),put:async(_key,_body,options)=>{assert.deepEqual(options.onlyIf,{etagMatches:'old'});return null;}};
 assert.equal(await saveTranscriptToR2(bucket,'abcdefghijk','en',[{text:'cue'}],'ai',{jobId:'job',createdAt:101}),false);
});
test('optional enrichment preserves metadata and refuses concurrent R2 replacement',async()=>{
 let puts=0;const original={segments:[{text:'Hello world.',start:0,duration:2}],extra:'retain'};
 const bucket={get:async()=>({etag:'original',customMetadata:{source:'ai',jobId:'keep'},json:async()=>original}),put:async(_key,body,opts)=>{
  puts++;assert.equal(JSON.parse(body).extra,'retain');assert.deepEqual(opts.onlyIf,{etagMatches:'original'});assert.deepEqual(opts.customMetadata,{source:'ai',jobId:'keep'});return null;
 }};
 assert.equal(await enrichPublishedTranscript(bucket,'abcdefghijk','en'),false);assert.equal(puts,1);
});
test('optional enrichment reuses overlapping work and clears ownership after failure',async()=>{
 let release;let reads=0;const gate=new Promise(resolve=>release=resolve);
 const bucket={get:async()=>{reads++;await gate;throw Error('fixture outage');}};
 const one=enrichPublishedTranscript(bucket,'bcdefghijkl','en');const two=enrichPublishedTranscript(bucket,'bcdefghijkl','en');
 release();assert.deepEqual(await Promise.all([one,two]),[false,false]);assert.equal(reads,1);
 assert.equal(await enrichPublishedTranscript(bucket,'bcdefghijkl','en'),false);assert.equal(reads,2);
});
test('cleaned transcript timing stays finite, ordered and bounded for repeated multilingual cues',()=>{
 const cues=[];for(let i=0;i<120;i++)cues.push({text:['Hello world.','日本語です。','한국어예요.','中文学习。'][i%4],start:(i%60)*2,duration:10});
 const cleaned=cleanTranscriptSegments(cues.reverse());assert.ok(cleaned.length>0);
 for(let i=0;i<cleaned.length;i++){
  const cue=cleaned[i];assert.ok(Number.isFinite(cue.start)&&Number.isFinite(cue.duration));assert.ok(cue.duration>=0&&cue.duration<=5);
  if(i)assert.ok(cue.start>=cleaned[i-1].start);
 }
 assert.equal(cleanCueText('[Music] <b> Hi &amp; bye </b> ♪'),'Hi & bye');
});
for(const mode of ['HTTP failure','network failure','malformed JSON','rejected token'])test('production Turnstile fails closed on '+mode,async t=>{
 t.mock.method(globalThis,'fetch',async()=>{
  if(mode==='network failure')throw Error('fixture network outage');
  if(mode==='HTTP failure')return new Response('unavailable',{status:503});
  if(mode==='malformed JSON')return new Response('{');
  return Response.json({success:false,'error-codes':['timeout-or-duplicate']});
 });
 assert.equal((await verifyTurnstileToken('fixture-token','fixture-secret','198.51.100.1','production')).valid,false);
});
test('middleware accepts an exact two MiB JSON body without changing bytes',async()=>{
 const limit=2*1024*1024;const raw=JSON.stringify({text:'x'.repeat(limit-11)});assert.equal(new TextEncoder().encode(raw).length,limit);
 const response=await middleware({request:request(raw),next:async r=>{assert.equal((await r.arrayBuffer()).byteLength,limit);return new Response();}});assert.equal(response.status,200);
});
test('middleware checks declared length before reading an oversized request',async()=>{
 const req=new Request('https://voca.study/api/transcript',{method:'POST',body:'{}',headers:{'Content-Length':String(2*1024*1024+1),'User-Agent':'Mozilla/5.0'}});
 assert.equal((await middleware({request:req,next:()=>assert.fail('Oversized declared body reached route')})).status,413);
});
test('middleware does not trust a falsely small Content-Length',async()=>{
 const req=new Request('https://voca.study/api/transcript',{method:'POST',body:JSON.stringify({text:'x'.repeat(2*1024*1024)}),headers:{'Content-Length':'2','User-Agent':'Mozilla/5.0'}});
 assert.equal((await middleware({request:req,next:()=>assert.fail('Oversized actual body reached route')})).status,413);
});
test('body-required APIs reject a completely absent POST body',async()=>{
 const req=new Request('https://voca.study/api/transcript',{method:'POST',headers:{'User-Agent':'Mozilla/5.0'}});
 assert.equal((await middleware({request:req,next:()=>assert.fail('Absent JSON reached route')})).status,400);
});
test('maintenance preserves explicitly supported no-body POST calls',async()=>{
 for(const path of ['internal/reconcile','heal-levels']){
  const req=new Request('https://voca.study/api/'+path,{method:'POST',headers:{'User-Agent':'Mozilla/5.0'}});
  assert.equal((await middleware({request:req,next:()=>new Response('handler enforces authentication')})).status,200);
 }
});
test('maintenance treats zero-byte streamed POST as an optional absent body',async()=>{
 for(const path of ['internal/reconcile','heal-levels']){
  const req=new Request('https://voca.study/api/'+path,{method:'POST',body:'',headers:{'User-Agent':'Mozilla/5.0'}});
  assert.equal((await middleware({request:req,next:async forwarded=>{assert.equal(await forwarded.text(),'');return new Response();}})).status,200);
 }
});
