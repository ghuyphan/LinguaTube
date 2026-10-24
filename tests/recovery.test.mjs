import test from 'node:test';
import assert from 'node:assert/strict';
import { subscriberGrants, recoverRevenueCatEvent } from '../functions-src/services/revenuecat-recovery.js';
import { onRequestPost as maintenance } from '../functions-src/api/internal/reconcile.js';
import { validateAuthToken, invalidateUserTokenCache } from '../functions-src/middlewares/auth.js';

const uid='11111111-1111-4111-8111-111111111111';
test('subscriber snapshots consolidate overlapping production products and exclude sandbox/expired access',()=>{
    const expiry=new Date(Date.now()+86400000).toISOString();
    const subscriber={entitlements:{pro:{product_identifier:'pro',expires_date:expiry},voca_pro:{product_identifier:'annual',expires_date:new Date(Date.now()+2*86400000).toISOString()},premium:{product_identifier:'test',expires_date:expiry},founder:{product_identifier:'expired',expires_date:'2020-01-01T00:00:00Z'}},
        subscriptions:{pro:{is_sandbox:false},annual:{is_sandbox:false},test:{is_sandbox:true},expired:{is_sandbox:false}}};
    const grants=subscriberGrants(subscriber);assert.equal(grants.length,1);assert.equal(grants[0].tier,'pro');
    assert.equal(grants[0].expires_at,subscriber.entitlements.voca_pro.expires_date);
    assert.deepEqual(subscriberGrants({entitlements:{}}),[]);
    assert.throws(()=>subscriberGrants(null),/Invalid subscriber/);
});
test('subscriber failure releases a durable claim for retry instead of confirming it',async t=>{
    let finish;
    t.mock.method(globalThis,'fetch',async (url,options)=>{
        if(url.includes('/claim_revenuecat_event'))return Response.json({event_id:'transfer',lease_token:'lease',user_ids:[uid]});
        if(url.includes('api.revenuecat.com'))return new Response(null,{status:503});
        if(url.includes('/finish_revenuecat_event')){finish=JSON.parse(options.body);return Response.json(true);}
        throw new Error(`Unexpected request ${url}`);
    });
    assert.equal(await recoverRevenueCatEvent({REVENUECAT_SECRET_API_KEY:'provider',SUPABASE_SERVICE_ROLE_KEY:'service'}),false);
    assert.equal(finish.p_success,false);
});
test('transfer recovery resumes only the unfinished identity in a partial batch',async t=>{
    const second='22222222-2222-4222-8222-222222222222';const lookups=[];let applied;
    t.mock.method(globalThis,'fetch',async (url,options)=>{
        if(url.includes('/claim_revenuecat_event'))return Response.json({event_id:'transfer',lease_token:'lease',user_ids:[uid,second],completed_user_ids:[uid]});
        if(url.includes('api.revenuecat.com')){lookups.push(url);return Response.json({request_date_ms:Date.now(),subscriber:{entitlements:{}}});}
        if(url.includes('/apply_revenuecat_snapshot')){applied=JSON.parse(options.body);return Response.json(true);}
        if(url.includes('/finish_revenuecat_event'))return Response.json(true);
        throw new Error(`Unexpected request ${url}`);
    });
    assert.equal(await recoverRevenueCatEvent({REVENUECAT_SECRET_API_KEY:'provider',SUPABASE_SERVICE_ROLE_KEY:'service'}),true);
    assert.equal(lookups.length,1);assert.ok(lookups[0].endsWith(second));assert.equal(applied.p_user_id,second);assert.deepEqual(applied.p_grants,[]);
});
test('maintenance rejects missing and incorrect dedicated secrets before storage access',async()=>{
    const request=()=>new Request('https://voca.study/api/internal/reconcile',{method:'POST'});
    assert.equal((await maintenance({request:request(),env:{}})).status,503);
    assert.equal((await maintenance({request:request(),env:{BACKEND_MAINTENANCE_SECRET:'secret'}})).status,401);
});
test('identity caching never caches mutable access state',async t=>{
    invalidateUserTokenCache(uid);let identityReads=0,stateReads=0,balance=5;
    t.mock.method(globalThis,'fetch',async url=>{
        if(url.includes('/auth/v1/user')){identityReads++;return Response.json({id:uid,email:'test@example.test'});}
        if(url.includes('/get_user_access_state')){stateReads++;return Response.json({id:uid,diamonds:balance,subscription_tier:'free'});}
        throw new Error(`Unexpected request ${url}`);
    });
    const token=`${btoa('{}')}.${btoa(JSON.stringify({sub:uid,exp:Math.floor(Date.now()/1000)+3600}))}.fresh-state`;
    const request=()=>new Request('https://voca.study/api/diamonds',{headers:{Authorization:`Bearer ${token}`}});
    const env={SUPABASE_SERVICE_ROLE_KEY:'service'};
    assert.equal((await validateAuthToken(request(),env)).user.diamonds,5);
    balance=4;assert.equal((await validateAuthToken(request(),env)).user.diamonds,4);
    assert.equal(identityReads,1);assert.equal(stateReads,2);
});

test('service-only writes accept empty created responses and sanitize malformed JSON', async t => {
    const { serviceRoleRequest } = await import('../functions-src/services/supabase-rest.js');
    let response = new Response(null, { status: 201 });
    t.mock.method(globalThis, 'fetch', async () => response);
    const env = { SUPABASE_SERVICE_ROLE_KEY: 'service' };
    assert.equal(await serviceRoleRequest(env, 'billing_webhook_inbox', { method: 'POST', body: {} }), null);
    response = new Response('private provider payload', { status: 200 });
    await assert.rejects(serviceRoleRequest(env, 'rpc/check'), /^Error: Invalid Supabase service response$/);
});

test('subscriber recovery defers rate-limited work for Retry-After', async t => {
    let finish;
    t.mock.method(globalThis, 'fetch', async (url, options) => {
        if (url.includes('/claim_revenuecat_event')) return Response.json({event_id:'limited',lease_token:'lease',user_ids:[uid]});
        if (url.includes('api.revenuecat.com')) return new Response(null, {status:429,headers:{'Retry-After':'900'}});
        if (url.includes('/finish_revenuecat_event')) { finish=JSON.parse(options.body); return Response.json(true); }
        throw new Error('Unexpected request');
    });
    assert.equal(await recoverRevenueCatEvent({REVENUECAT_SECRET_API_KEY:'provider',SUPABASE_SERVICE_ROLE_KEY:'service'}), false);
    assert.equal(finish.p_retry_after, 900);
});
