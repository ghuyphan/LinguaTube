// Deterministic network-cost fixture; these timings are not production latency claims.
import { performance } from 'node:perf_hooks';
import { pathToFileURL } from 'node:url';
import { validateAuthToken, invalidateUserTokenCache } from '../functions-src/middlewares/auth.js';
const uid='11111111-1111-4111-8111-111111111111';
const env={SUPABASE_SERVICE_ROLE_KEY:'service'};
const token=`${btoa('{}')}.${btoa(JSON.stringify({sub:uid,exp:Math.floor(Date.now()/1000)+3600}))}.benchmark`;
const request=()=>new Request('https://voca.study/api/diamonds',{headers:{Authorization:`Bearer ${token}`}});
let calls=0,balance=5;
const original=globalThis.fetch;
globalThis.fetch=async url=>{
    calls++;await new Promise(resolve=>setTimeout(resolve,2));
    if(url.includes('/auth/v1/user'))return Response.json({id:uid,email:'fixture@example.test'});
    const profile={id:uid,diamonds:balance,subscription_tier:'pro',subscription_expires:new Date(Date.now()+86400000).toISOString(),diamonds_updated_at:new Date().toISOString()};
    return Response.json(url.includes('/profiles?')?[profile]:profile);
};
try{
    async function measure(label,validate,invalidate,fresh){
        const times=[];calls=0;
        for(let i=0;i<40;i++){if(fresh)invalidate(uid);const start=performance.now();const result=await validate(request(),env);if(!result.valid)throw new Error('Invalid benchmark auth');times.push(performance.now()-start);}
        times.sort((a,b)=>a-b);return {label,requests:calls,operations:40,p50Ms:+times[20].toFixed(2),p95Ms:+times[38].toFixed(2)};
    }
    const results=[];
    if(process.env.VOCA_BASELINE_AUTH){
        const before=await import(pathToFileURL(process.env.VOCA_BASELINE_AUTH));
        results.push(await measure('before: fresh authorization',before.validateAuthToken,before.invalidateUserTokenCache,true));
        balance=5;await before.validateAuthToken(request(),env);balance=4;
        results.push({...await measure('before: warm cached authorization (stale)',before.validateAuthToken,before.invalidateUserTokenCache,false),returnedBalance:(await before.validateAuthToken(request(),env)).user.diamonds});
    }
    results.push(await measure('after: cold identity and fresh access',validateAuthToken,invalidateUserTokenCache,true));
    results.push({...await measure('after: warm identity and fresh access',validateAuthToken,invalidateUserTokenCache,false),returnedBalance:(await validateAuthToken(request(),env)).user.diamonds});
    process.stdout.write(JSON.stringify({fixtureNetworkDelayMs:2,results},null,2)+'\n');
}finally{globalThis.fetch=original;}
