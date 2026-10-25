import test from 'node:test';
import assert from 'node:assert/strict';
import { GladiaProvider } from '../functions-src/providers/gladia.js';
import { transcriptionDiamondCost } from '../functions-src/services/diamond.service.js';
import { validateVideoRequest } from '../functions-src/middlewares/video-validator.js';
import { TranscriptService } from '../functions-src/services/transcript.service.js';
import { saveTranslation } from '../functions-src/utils/translation-cache.js';

test('credit pricing uses exact verified duration boundaries', () => {
    for (const [seconds,cost] of [[1,1],[600,1],[601,2],[1200,2],[1201,3],[2100,3],[2101,4],[2700,4]]) {
        assert.equal(transcriptionDiamondCost(seconds),cost);
    }
    for (const input of [null,undefined,0,-1,'600',NaN,Infinity]) assert.throws(()=>transcriptionDiamondCost(input),/DURATION_UNAVAILABLE/);
});

test('malformed duration is rejected before upstream work', async t => {
    t.mock.method(globalThis,'fetch',()=>{throw new Error('Validation must precede upstream calls');});
    for (const duration of ['not-a-number',{},-1,NaN,Infinity]) {
        assert.equal((await validateVideoRequest('abcdefghijk','en',duration,'whisper'))?.error,'invalid_duration');
    }
});

test('AI duration verification fails closed during upstream outage', async t => {
    t.mock.method(globalThis,'fetch',async()=>new Response(null,{status:503}));
    assert.equal((await validateVideoRequest('abcdefghijk','en',30,'whisper'))?.error,'video_duration_unavailable');
});

test('AI cache reuse requires no duration scrape or new charge', async t => {
    t.mock.method(globalThis,'fetch',()=>{throw new Error('Cached transcripts must not contact providers');});
    const r2={get:async()=>({customMetadata:{source:'ai'},json:async()=>({segments:[{text:'Hello',start:0,duration:1}]})})};
    const service=new TranscriptService(null,null,{consumeDiamond(){throw new Error('Must not charge');}},null);
    assert.equal((await service.startAIJob({r2,env:{}},{videoId:'abcdefghijk',lang:'en'})).status,'done');
});

test('Gladia uses modern callbacks and correlates one submission', async t => {
    let submitted;
    t.mock.method(globalThis,'fetch',async(_url,init)=>{
        submitted=JSON.parse(init.body);return Response.json({id:'accepted',result_url:'https://api.gladia.io/v2/pre-recorded/accepted'});
    });
    const result=await new GladiaProvider('fixture').submitTranscriptionJob('https://www.youtube.com/watch?v=abcdefghijk','https://voca.study/api/gladia-webhook',{jobId:'job_test'});
    assert.equal(result.id,'accepted');
    assert.equal(submitted.callback,true);assert.equal(submitted.callback_config.method,'POST');
    assert.equal(submitted.custom_metadata.voca_job_id,'job_test');assert.equal(submitted.callback_url,undefined);
});

for(const [status,ambiguous] of [[400,false],[401,false],[429,false],[500,true],[503,true],[408,true]]) {
    test(`Gladia HTTP ${status} is classified without a second chargeable POST`,async t=>{
        let calls=0;t.mock.method(globalThis,'fetch',async()=>{calls++;return new Response(null,{status});});
        await assert.rejects(new GladiaProvider('fixture').submitTranscriptionJob('https://www.youtube.com/watch?v=abcdefghijk'),error=>error.ambiguous===ambiguous);
        assert.equal(calls,1);
    });
}

test('malformed accepted Gladia response remains uncertain without resubmission',async t=>{
    let calls=0;t.mock.method(globalThis,'fetch',async()=>{calls++;return new Response('{');});
    await assert.rejects(new GladiaProvider('fixture').submitTranscriptionJob('https://www.youtube.com/watch?v=abcdefghijk'),error=>error.ambiguous===true);
    assert.equal(calls,1);
});

test('Gladia metadata recovery rejects missing, foreign and duplicate correlations',async t=>{
    let items=[];
    t.mock.method(globalThis,'fetch',async url=>{
        const parsed=new URL(url);assert.equal(parsed.searchParams.get('limit'),'2');
        assert.deepEqual(JSON.parse(parsed.searchParams.get('custom_metadata')),{voca_job_id:'job_test'});
        return Response.json({items});
    });
    const provider=new GladiaProvider('fixture');
    assert.equal(await provider.findSubmission('job_test'),null);
    items=[{id:'provider',custom_metadata:{voca_job_id:'foreign'}}];assert.equal(await provider.findSubmission('job_test'),null);
    items=[{id:'provider',custom_metadata:{voca_job_id:'job_test'}}];assert.deepEqual(await provider.findSubmission('job_test'),{id:'provider'});
    items.push({...items[0],id:'duplicate'});assert.equal(await provider.findSubmission('job_test'),null);
});

test('translation publication rejects cues that differ from the canonical transcript',async()=>{
    let puts=0;
    const bucket={get:async key=>key.startsWith('transcripts/')?{json:async()=>({segments:[{text:'Real cue',start:0,duration:1}]})}:null,
        put:async()=>{puts++;return {};}};
    assert.equal(await saveTranslation(bucket,'abcdefghijk','en','vi',[{text:'Unrelated',start:0,duration:1,translation:'translated'}],100,'lingva',{requireCanonical:true}),null);
    assert.equal(puts,0);
});
