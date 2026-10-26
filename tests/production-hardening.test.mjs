import { fixture } from './fixtures/transcription-db.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost as revenuecat } from '../functions-src/api/payment/revenuecat-webhook.js';
import { onRequestPost as payosWebhook } from '../functions-src/api/payment/webhook.js';
import { onRequest as heal } from '../functions-src/api/heal-levels.js';
import { onRequest as middleware } from '../functions-src/api/_middleware.js';
import { DiamondService } from '../functions-src/services/diamond.service.js';
import { saveTranslation } from '../functions-src/utils/translation-cache.js';
import { computeHmacSha256, buildPayOsSignatureData, createPayOsPaymentLink } from '../functions-src/providers/payos.js';

const uid='11111111-1111-4111-8111-111111111111';
const event = { id:'event-1',type:'RENEWAL',app_user_id:uid,environment:'PRODUCTION',event_timestamp_ms:Date.now(),expiration_at_ms:Date.now()+86400000,entitlement_ids:['voca_pro'] };
const env = { REVENUECAT_WEBHOOK_SECRET:'secret',SUPABASE_SERVICE_ROLE_KEY:'service' };
const request = (body,authorization='Bearer secret') => new Request('https://voca.study/api/payment/revenuecat-webhook', {method:'POST',headers:{Authorization:authorization},body:JSON.stringify(body)});

test('RevenueCat fails closed for missing/incorrect secret and malformed events', async () => {
    assert.equal((await revenuecat({request:request({event}),env:{}})).status,503);
    assert.equal((await revenuecat({request:request({event},'Bearer wrong'),env})).status,401);
    assert.equal((await revenuecat({request:request({event:{...event,id:null}}),env})).status,400);
});
test('RevenueCat ignores sandbox and durably queues production identities without trusting event entitlements', async t => {
    const calls=[];
    t.mock.method(globalThis,'fetch',async (url,options) => { calls.push({url,body:JSON.parse(options.body)});return new Response(null,{status:204}); });
    assert.equal((await revenuecat({request:request({event:{...event,environment:'SANDBOX'}}),env})).status,200);
    assert.equal(calls.length,0);
    assert.equal((await revenuecat({request:request({event:{...event,entitlement_ids:['unrelated_product']}}),env})).status,200);
    assert.equal(calls.length,1);
    assert.equal(calls[0].body.event_id,event.id);
    assert.deepEqual(calls[0].body.user_ids,[uid]);
    assert.ok(calls[0].url.includes('/billing_webhook_inbox'));
});
test('RevenueCat database failures return retryable errors and never PATCH profiles', async t => {
    const calls=[];
    t.mock.method(globalThis,'fetch',async (_url,options) => {calls.push(options.method); return new Response(null,{status:500});});
    assert.equal((await revenuecat({request:request({event}),env})).status,503);
    assert.deepEqual(calls,['POST']);
});
test('payOS authenticated callbacks use transactional RPC and reject amount mismatch', async t => {
    const data={orderCode:12345678,code:'00',amount:49000};
    const body={data,signature:await computeHmacSha256(buildPayOsSignatureData(data),'checksum')};
    const calls=[];
    t.mock.method(globalThis,'fetch',async (url,options) => {
        calls.push({url,method:options.method});
        return Response.json(url.includes('/orders?') ? [{user_id:uid,plan_id:'pro_1m',tier:'pro',amount:49000}] : {success:true,status:'applied'});
    });
    const invoke=()=>payosWebhook({request:new Request('https://voca.study/api/payment/webhook',{method:'POST',body:JSON.stringify(body)}),env:{...env,PAYOS_CHECKSUM_KEY:'checksum'}});
    assert.equal((await invoke()).status,200);
    assert.ok(calls[1].url.endsWith('/rpc/apply_payos_payment'));
    data.amount=1;body.signature=await computeHmacSha256(buildPayOsSignatureData(data),'checksum');
    assert.equal((await invoke()).status,400);
});
test('payOS missing configuration never returns a mock bank account', async () => {
    await assert.rejects(createPayOsPaymentLink({},{}),/not configured/);
});
test('admin maintenance rejects hardcoded secret and paid non-admin users', async t => {
    assert.equal((await heal({request:new Request('https://voca.study/api/heal-levels',{headers:{'x-admin-secret':'voca_heal_2026'}}),env:{}})).status,401);
    const token=`${btoa('{}')}.${btoa(JSON.stringify({sub:uid,exp:Math.floor(Date.now()/1000)+3600}))}.signature`;
    t.mock.method(globalThis,'fetch',async url=>Response.json(url.includes('/auth/v1/user')?{id:uid}:[{subscription_tier:'premium'}]));
    assert.equal((await heal({request:new Request('https://voca.study/api/heal-levels',{headers:{Authorization:`Bearer ${token}`}}),env})).status,401);
});
test('diamond RPC failures never fall back to stale balance PATCHes', async t => {
    const calls=[];
    t.mock.method(globalThis,'fetch',async (_url,options)=>{calls.push(options.method);return new Response(null,{status:503});});
    const service=new DiamondService(null);
    const user={id:uid,diamonds:5,subscriptionTier:'free',last_diamond_regen:new Date().toISOString()};
    assert.equal((await service.consumeDiamond('client',1,user,env)).success,false);
    assert.equal(await service.refundDiamond('client',null,env,user,1),false);
    assert.ok(calls.every(method=>method==='POST'));
    assert.equal((await service.consumeDiamond('client',-1,user,env)).success,false);
});
test('R2 retries a conflicting cross-isolate save and preserves the winning chunk', async () => {
    let attempts=0;
    const bucket={
        async get(){return attempts===0?null:{etag:'winner',json:async()=>({segments:[{start:0,text:'a',translation:'A'},{start:1,text:'b',translation:null}]})};},
        async put(_key,body,options){
            attempts++;
            if(attempts===1){assert.equal(options.onlyIf.get('If-None-Match'),'*');return null;}
            assert.equal(options.onlyIf.etagMatches,'winner');
            assert.deepEqual(JSON.parse(body).segments.map(s=>s.translation),['A','B']);
            return {etag:'merged'};
        }
    };
    const saved=await saveTranslation(bucket,'abcdefghijk','ja','en',[{start:0,text:'a',translation:null},{start:1,text:'b',translation:'B'}]);
    assert.equal(saved.validCount,2);assert.equal(attempts,2);
});
test('middleware bounds actual bytes and preserves signed payload bytes', async () => {
    const url='https://voca.study/api/payment/revenuecat-webhook';
    assert.equal((await middleware({request:new Request(url,{method:'POST',body:'x'.repeat(2*1024*1024+1)}),next:()=>{throw new Error('Oversize request reached handler');}})).status,413);
    const raw=' { "event": "signed bytes" } ';
    await middleware({request:new Request(url,{method:'POST',body:raw}),next:async forwarded=>{assert.equal(await forwarded.text(),raw);return new Response();}});
});

test('AI generation ignores forged client duration when enforcing the server tier cap', async t => {
    const { TranscriptService } = await import('../functions-src/services/transcript.service.js');
    t.mock.method(globalThis,'fetch',async()=>Response.json({items:[{id:'abcdefghijk',contentDetails:{duration:'PT1800S'},snippet:{liveBroadcastContent:'none'}}]}));
    const {db}=await fixture(t);
    const service=new TranscriptService(null,null,{resolveTier:()=> 'free'},null);
    await assert.rejects(service.startAIJob({db,env:{YOUTUBE_DATA_API_KEY:'fixture'}},{videoId:'abcdefghijk',lang:'ja',body:{duration:'not-a-number'},user:{id:uid}}),/VIDEO_TOO_LONG/);
});

test('leaderboard submissions persist server scores instead of client XP', async t => {
    const { onRequestPost }=await import('../functions-src/api/leaderboard.js');
    const token=`${btoa('{}')}.${btoa(JSON.stringify({sub:uid,exp:Math.floor(Date.now()/1000)+3600}))}.leaderboard`;
    t.mock.method(globalThis,'fetch',async url=>{
        if(url.includes('/auth/v1/user')) return Response.json({id:uid});
        if(url.includes('/rpc/get_user_access_state')) return Response.json({id:uid,name:'Learner',subscription_tier:'free',diamonds:5});
        if(url.includes('/gamification?')) return Response.json([{xp:100,weekly_xp:20,unlocked_achievements:{first:true}}]);
        if(url.includes('/streaks?')) return Response.json([{current_streak:2}]);
        throw new Error(`Unexpected request: ${url}`);
    });
    let values;
    const db={prepare(){return {bind(...args){values=args;return this;},run:async()=>({success:true})};}};
    const response=await onRequestPost({env:{...env,VOCAB_DB:db},request:new Request('https://voca.study/api/leaderboard',{
        method:'POST',headers:{Authorization:`Bearer ${token}`},body:JSON.stringify({xp:1000000,weekly_xp:100000,streak:99,badges_count:99})
    })});
    assert.equal(response.status,200);
    assert.equal(values[3],100);assert.equal(values[4],20);assert.equal(values[6],2);assert.equal(values[7],1);
});
