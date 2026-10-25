// Optional workerd execution. Install Miniflare externally; no remote bindings or credentials.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, rm, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { createHash } from 'node:crypto';
import { routes, cases, providerCases } from './fixtures/cloudflare-edge-cases.mjs';

const modulePath=process.env.VOCA_MINIFLARE_MODULE;
test('all Pages routes: input, authentication, resource limits and failure contracts in workerd', {skip:!modulePath,timeout:120000}, async t=>{
 const {Miniflare,Log,LogLevel}=await import(pathToFileURL(modulePath));
 const folder=await mkdtemp(join(tmpdir(),'voca-all-routes-'));
 t.after(()=>rm(folder,{recursive:true,force:true}));
 const root=new URL('..',import.meta.url).pathname;
 const names=(await readdir(join(root,'functions-src/api'),{recursive:true})).filter(p=>p.endsWith('.js')&&p!=='_middleware.js').map(p=>p.slice(0,-3)).sort();
 assert.deepEqual(routes.map(r=>r[0]).sort(),names,'Every API source must have an explicit test inventory entry');
 const sourceFiles=(await readdir(join(root,'functions-src'),{recursive:true})).filter(p=>p.endsWith('.js')).sort();
 const sources=await Promise.all(sourceFiles.map(async file=>({file:'functions-src/'+file,sha256:createHash('sha256').update(await readFile(join(root,'functions-src',file))).digest('hex')})));
 const imports=routes.map(([name],i)=>`import * as r${i} from ${JSON.stringify(join(root,'functions-src/api',name+'.js'))};`).join('\n');
 const entry=`${imports}
 import { GladiaProvider } from ${JSON.stringify(join(root,'functions-src/providers/gladia.js'))};
 import { serviceRoleRequest } from ${JSON.stringify(join(root,'functions-src/services/supabase-rest.js'))};
 import { createPayOsPaymentLink } from ${JSON.stringify(join(root,'functions-src/providers/payos.js'))};
 import { translateText } from ${JSON.stringify(join(root,'functions-src/providers/lingva.js'))};
 import { fetchYouTubeVideoDetails } from ${JSON.stringify(join(root,'functions-src/middlewares/video-validator.js'))};
 import { invalidateUserTokenCache } from ${JSON.stringify(join(root,'functions-src/middlewares/auth.js'))};
 import { onRequest as middleware } from ${JSON.stringify(join(root,'functions-src/api/_middleware.js'))};
 const routes={${routes.map(([name],i)=>`${JSON.stringify(name)}:r${i}`).join(',')}};
 export default {async fetch(request,env){
  invalidateUserTokenCache('11111111-1111-4111-8111-111111111111');
  const operation=request.headers.get('x-test-operation');
  if(operation){
   try{
    const gladia=new GladiaProvider('fixture-gladia');let result;
    if(operation==='gladia-submit')result=await gladia.submitTranscriptionJob('https://youtube.com/watch?v=abcdefghijk',null,{jobId:'fixture-job'});
    if(operation==='gladia-submit-no-key')result=await new GladiaProvider().submitTranscriptionJob('https://youtube.com/watch?v=abcdefghijk');
    if(operation==='gladia-poll')result=await gladia.checkJobStatusById('fixture-provider');
    if(operation==='gladia-invalid-poll')result=await gladia.checkJobStatus('https://api.gladia.io.evil.test/v2/pre-recorded/a');
    if(operation==='gladia-find')result=await gladia.findSubmission('fixture-job');
    if(operation==='supabase-read')result=await serviceRoleRequest(env,'orders');
    if(operation==='payos-create')result=await createPayOsPaymentLink({...env,PAYOS_CLIENT_ID:'fixture-client',PAYOS_API_KEY:'fixture-api'},{orderCode:12345678,amount:49000,description:'fixture',returnUrl:'https://voca.study',cancelUrl:'https://voca.study'});
    if(operation==='translation')result=await translateText('Fixture translation '+request.headers.get('x-test-fixture'),'en','vi');
    if(operation==='youtube-duration')result=await fetchYouTubeVideoDetails('abcdefghijk');
    return Response.json({ok:true,result});
   }catch(e){return Response.json({ok:false,ambiguous:e.ambiguous,status:e.status,retryAfterSeconds:e.retryAfterSeconds});}
  }
  const module=routes[request.headers.get('x-test-route')];
  const owned={...env}; const drop=request.headers.get('x-test-drop'); if(drop)delete owned[drop];
  const params=JSON.parse(request.headers.get('x-test-params')||'{}');
  Object.defineProperty(request,'cf',{value:{},configurable:true});
  const tasks=[];
  const context={request,env:owned,params,waitUntil(p){tasks.push(p);}};
  const handler=module['onRequest'+request.method[0]+request.method.slice(1).toLowerCase()]||module.onRequest;
  context.next=async forwarded=>{const req=forwarded||request; Object.defineProperty(req,'cf',{value:{},configurable:true}); return handler?handler({...context,request:req}):new Response('Method not allowed',{status:405});};
  const response=await middleware(context);
  await Promise.allSettled(tasks);
  return response;
 }};`;
 const worker=join(folder,'worker.mjs');
 await build({stdin:{contents:entry,resolveDir:root,sourcefile:'all-routes-fixture.js'},bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:worker,conditions:['worker','browser','import','default'],mainFields:['browser','module','main'],logLevel:'silent'});
 let outbound=[];let activeCase;
 const mf=new Miniflare({rootPath:folder,modulesRoot:folder,scriptPath:worker,modules:true,compatibilityDate:'2024-12-20',compatibilityFlags:['nodejs_compat'],cf:false,
  d1Databases:['VOCAB_DB'],r2Buckets:['TRANSCRIPT_STORAGE'],kvNamespaces:['TRANSCRIPT_CACHE'],
  bindings:{SUPABASE_URL:'https://auth.fixture.test',SUPABASE_SERVICE_ROLE_KEY:'fixture-service',PAYOS_CHECKSUM_KEY:'fixture-checksum',REVENUECAT_WEBHOOK_SECRET:'fixture-callback',BACKEND_MAINTENANCE_SECRET:'fixture-maintenance',HEAL_ADMIN_SECRET:'fixture-admin'},
  outboundService:async request=>{
   const url=new URL(request.url);outbound.push({host:url.host,path:url.pathname,query:url.search,method:request.method});
   const fixture=activeCase?.fixture||'';
   const http=/^http-(\d+)$/.exec(fixture);
   if(http)return new Response('Fixture status',{status:Number(http[1]),headers:{Location:'https://redirect.fixture.test/secret','Retry-After':'120'}});
   if(fixture==='tts-audio'&&url.hostname==='translate.google.com')return new Response(new Uint8Array(128));
   if(fixture==='tts-short'&&url.hostname==='translate.google.com')return new Response(new Uint8Array(99));
   if(fixture==='malformed')return new Response('{');
   if(fixture==='no-content')return new Response(null,{status:204});
   if(fixture==='gladia-accepted')return Response.json({id:'fixture-provider'});
   if(fixture==='missing-id')return Response.json({success:true});
   if(fixture.startsWith('poll-'))return Response.json({status:fixture.slice(5)});
   if(fixture.startsWith('metadata-')){const item={id:'fixture-provider',custom_metadata:{voca_job_id:fixture==='metadata-foreign'?'foreign':'fixture-job'}};return Response.json({items:fixture==='metadata-empty'?[]:fixture==='metadata-multiple'?[item,item]:[item]});}
   if(fixture==='payos-success')return Response.json({code:'00',data:{checkoutUrl:'https://pay.payos.vn/fixture',accountNumber:'12345'}});
   if(fixture==='translation-success')return Response.json([[['Translated fixture','original']]]);
   if(fixture==='duration-success')return new Response('"lengthSeconds":"120"');
   if(url.host==='auth.fixture.test'&&url.pathname==='/auth/v1/user'){
    if(fixture==='auth-outage')return new Response('outage',{status:503});
    if(fixture==='auth-redirect')return new Response(null,{status:302,headers:{Location:'https://redirect.fixture.test/secret'}});
    return Response.json({id:fixture==='auth-identity-mismatch'?'foreign-user':'11111111-1111-4111-8111-111111111111'});
   }
   if(fixture==='profile-outage'&&url.pathname.includes('get_user_access_state'))return new Response('outage',{status:503});
   if(url.host==='auth.fixture.test'&&url.pathname==='/rest/v1/rpc/get_user_access_state')return Response.json({id:'11111111-1111-4111-8111-111111111111',subscription_tier:'free',diamonds:5});
   if(url.host==='auth.fixture.test'&&url.pathname==='/rest/v1/orders')return Response.json([]);
   return new Response('Fixture provider unavailable',{status:503});
  },log:new Log(LogLevel.ERROR)});
 t.after(()=>mf.dispose());
 const db=await mf.getD1Database('VOCAB_DB');
 for(const file of ['db/schema.sql','db/migrations/d1/20261023_credit_recovery.sql','db/migrations/d1/20261024_gladia_inbox.sql','db/migrations/d1/20261025_gladia_submission_state.sql']){
  const schema=await readFile(join(root,file),'utf8');
  for(const sql of schema.replace(/--[^\n]*/g,'').split(/;\s*(?=(?:CREATE|ALTER)\b|$)/i).map(s=>s.trim()).filter(Boolean))await db.prepare(sql).run();
 }
 const evidence=[];
 const preflights=routes.filter(([route])=>route!=='internal/reconcile').map(([route])=>({name:'preflight',route,method:'OPTIONS',status:200,noUpstream:true}));
 for(const [index,c] of [...preflights,...cases,...providerCases].entries()){
  await t.test(`${c.route}: ${c.name}`,async()=>{
   outbound=[];activeCase=c;
   const path=c.route.replace('[lang]',c.params?.lang||'en').replace('[[path]]','en/vi/text');
   const url=new URL(`https://voca.study/api/${path}`);
   for(const [key,value] of Object.entries(c.query||{}))url.searchParams.set(key,value);
   const headers={'User-Agent':'Mozilla/5.0','Content-Type':'application/json','CF-Connecting-IP':`198.18.${Math.floor(index/250)}.${index%250+1}`,'x-test-route':c.route,'x-test-params':JSON.stringify(c.params||{}),...c.headers};
   if(c.drop)headers['x-test-drop']=c.drop;
   if(c.operation)headers['x-test-operation']=c.operation;
   headers['x-test-fixture']=c.fixture||'';
   const init={method:c.method,headers,...(c.raw!==undefined?{body:c.raw}:c.body!==undefined?{body:JSON.stringify(c.body)}:{})};
   let response;
   for(let attempt=0;attempt<(c.repeat||1);attempt++){
    response=await mf.dispatchFetch(url,init);
    if(attempt<(c.repeat||1)-1){assert.equal(response.status,c.initialStatus);await response.text();}
   }
   if(c.conditional){const etag=response.headers.get('etag');assert.ok(etag);await response.text();response=await mf.dispatchFetch(url,{...init,headers:{...headers,'If-None-Match':'W/'+etag}});}

   const raw=await response.text();
   assert.equal(response.status,c.status,`${c.name}: ${raw.slice(0,350)}`);
   if(c.conditional){assert.equal(raw,'');}
   else if(c.audioBytes){assert.equal(raw.length,c.audioBytes);assert.match(response.headers.get('content-type'),/audio\/mpeg/);assert.equal(response.headers.get('X-TTS-Engine'),'Google-Fallback');}
   else if(c.method==='OPTIONS')assert.match(response.headers.get('Access-Control-Allow-Methods')||'',/OPTIONS/);
   else{
    assert.match(response.headers.get('content-type')||'',/application\/json/);
    const body=JSON.parse(raw);
    for(const [key,value] of Object.entries(c.expect||{}))assert.deepEqual(body[key],value);
    assert.ok(!raw.includes('fixture-service')&&!raw.includes('fixture-checksum'),'No server secret in response');
   }
   if(c.noUpstream)assert.deepEqual(outbound,[],'Invalid/no-I/O requests must not call upstreams');
   if(c.authOnly)assert.ok(outbound.every(o=>o.host==='auth.fixture.test'),'Only authentication/order lookup is permitted');
   if(c.allowedHosts)assert.ok(outbound.every(o=>c.allowedHosts.includes(o.host)),'Only expected metadata/auth hosts are permitted');
   if(c.operation==='youtube-duration')assert.equal(JSON.parse(raw).result.duration,c.fixture==='duration-success'?120:null);
   if(c.providerOnly)assert.ok(outbound.length>0,'Failure must actually exercise the provider path');
   if(c.name==='payment status filters authenticated owner'){
    const order=outbound.find(o=>o.path==='/rest/v1/orders');assert.ok(order);assert.match(order.query,/user_id=eq\.11111111-1111-4111-8111-111111111111/);
   }
   if(c.name==='batch tokenizer accepts 800 items for authenticated quota')assert.equal(JSON.parse(raw).tokens.length,800);
   if(c.name==='translation accepts exact 80-item boundary without provider work')assert.equal(JSON.parse(raw).translations.length,80);
   if(c.operation==='gladia-submit')assert.equal(outbound.length,1,'Creation sends exactly one upstream request');
   assert.ok(outbound.every(o=>o.host!=='redirect.fixture.test'),'Redirects never receive credentials');
   evidence.push({route:c.route,name:c.name,status:response.status,outbound:[...outbound]});
  });
 }
 for(const source of sources)assert.equal(createHash('sha256').update(await readFile(join(root,source.file))).digest('hex'),source.sha256,'Source changed during runtime validation: '+source.file);
 if(process.env.VOCA_EDGE_OUTPUT)await writeFile(process.env.VOCA_EDGE_OUTPUT,JSON.stringify({node:process.version,routeCount:routes.length,caseCount:evidence.length,sources,evidence},null,2)+'\n');
});
