// Regression tests by default; VOCA_EXPECT_DEFECTS=1 replays the historical evidence.
// Uses optional Miniflare installed outside this repository. No production bindings.
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,rm,writeFile,readdir} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {build} from 'esbuild';

const modulePath=process.env.VOCA_MINIFLARE_MODULE;
const defects=process.env.VOCA_EXPECT_DEFECTS==='1';
test('Cloudflare regression scenarios execute with workerd and local D1/R2 bindings', {skip:!modulePath,timeout:120000}, async t=>{
    const {Miniflare,Log,LogLevel}=await import(pathToFileURL(modulePath));
    const folder=await mkdtemp(join(tmpdir(),'voca-cf-validation-'));
    t.after(()=>rm(folder,{recursive:true,force:true}));
    const worker=join(folder,'worker.mjs');
    const sourceRoot=process.env.VOCA_SOURCE_ROOT || new URL('..',import.meta.url).pathname;
    const entry=join(folder,'entry.js');
    const fixture=await readFile(new URL('./fixtures/cloudflare-review.worker.js',import.meta.url),'utf8');
    await writeFile(entry,fixture.replaceAll('../../functions-src/',`${sourceRoot.replace(/\/$/,'')}/functions-src/`));
    async function fingerprint(path){
        const entries=await readdir(path,{withFileTypes:true});
        const items=[];
        for(const item of entries.sort((a,b)=>a.name.localeCompare(b.name))){
            const file=join(path,item.name);
            if(item.isDirectory())items.push(...await fingerprint(file));
            else if(item.name.endsWith('.js'))items.push({file:file.slice(sourceRoot.length),sha256:createHash('sha256').update(await readFile(file)).digest('hex')});
        }
        return items;
    }
    const sourcesBefore=await fingerprint(join(sourceRoot,'functions-src'));
    await build({entryPoints:[entry],nodePaths:[new URL('../node_modules',import.meta.url).pathname],bundle:true,format:'esm',platform:'browser',target:'es2022',outfile:worker,
        conditions:['worker','browser','import','default'],mainFields:['browser','module','main'],logLevel:'silent'});
    assert.deepEqual(await fingerprint(join(sourceRoot,'functions-src')),sourcesBefore,'Source changed while compiling validation fixture');
    const schemas=await Promise.all(['db/schema.sql','db/migrations/d1/20261023_credit_recovery.sql','db/migrations/d1/20261024_gladia_inbox.sql',...(!defects?['db/migrations/d1/20261025_gladia_submission_state.sql','db/migrations/d1/20261026_verified_video_metadata.sql','db/migrations/d1/20261026_video_metadata_details.sql']:[])].map(path=>readFile(join(sourceRoot,path),'utf8')));
    const evidence=[];
    for(const scenario of ['native','duration','refresh','balance','stampede','translation','recommendation','gladia','tokenizer']){
        await t.test(scenario,async()=>{
            const mf=new Miniflare({rootPath:folder,modulesRoot:folder,scriptPath:worker,modules:true,compatibilityDate:'2024-12-20',compatibilityFlags:['nodejs_compat'],cf:false,
                d1Databases:['VOCAB_DB'],r2Buckets:['TRANSCRIPT_STORAGE'],kvNamespaces:['TRANSCRIPT_CACHE'],
                bindings:{YOUTUBE_DATA_API_KEY:'fixture-only',SCENARIO:scenario,EXPECT_DEFECTS:defects,GLADIA_API_KEY:'fixture-only',SUPADATA_API_KEY:'fixture-only',TURNSTILE_SECRET_KEY:'fixture-only',SUPABASE_SERVICE_ROLE_KEY:'fixture-only'},
                outboundService:()=>new Response('Unexpected network disabled',{status:599}),log:new Log(LogLevel.ERROR)});
            try{
                const db=await mf.getD1Database('VOCAB_DB'),r2=await mf.getR2Bucket('TRANSCRIPT_STORAGE');
                // D1 exec is line-oriented. Keep each checked-in CREATE/ALTER
                // statement intact, including the internal semicolons in triggers.
                for(const schema of schemas){
                    const statements=schema.replace(/--[^\n]*/g,'').split(schema.includes('ADD COLUMN snippet_json') ? /;\s*(?=(?:CREATE|ALTER|UPDATE)\b|$)/i : /;\s*(?=(?:CREATE|ALTER)\b|$)/i).map(sql=>sql.trim()).filter(Boolean);
                    for(const statement of statements)await db.prepare(statement).run();
                }
                const hash=createHash('sha256').update('198.51.100.10').digest('hex');
                if(['refresh','balance'].includes(scenario))await db.prepare('INSERT INTO anonymous_credit_balances VALUES(?,?,?)').bind(hash,0,Date.now()).run();
                if(['balance','tokenizer','refresh'].includes(scenario)){
                    const lang=scenario==='tokenizer'?'ja':'en';
                    await db.prepare('INSERT INTO video_languages(video_id,available_languages,sub_languages,duration_seconds,title,channel) VALUES(?,?,?,?,?,?)')
                        .bind('abcdefghijk',JSON.stringify([lang]),JSON.stringify([lang]),120,'English lesson','Teacher').run();
                    if(scenario!=='refresh')await r2.put(`transcripts/abcdefghijk/${lang}.json`,JSON.stringify({segments:[{start:0,duration:2,text:lang==='ja'?'日本語':'Hello',...(lang==='en'?{tokens:[{surface:'Hello'}]}:{})}]}),{customMetadata:{source:'ai'}});
                }
                if(scenario==='refresh')await db.prepare(`INSERT INTO ai_transcription_jobs(id,video_id,language,user_id,client_id,status,charge_status,refund_status,gladia_job_id)
                    VALUES('victim-job','abcdefghijk','en','victim-user','victim-client','processing','confirmed','none','victim-provider')`).run();
                if(scenario==='stampede')await r2.put('transcripts/abcdefghijk/en.json',JSON.stringify({segments:[{text:'Hello',start:0,duration:1}]}));
                if(scenario==='recommendation'){
                    for(let i=0;i<11;i++)await db.prepare(`INSERT INTO video_languages(video_id,title,channel,available_languages,sub_languages,duration_seconds,updated_at) VALUES(?,?,?,'["en"]',?,120,?)`)
                        .bind(`video${String(i).padStart(6,'0')}`,'Lesson','Teacher',i===10?'["en"]':'[]',100-i).run();
                    await r2.put('transcripts/video000010/en.json',JSON.stringify({segments:[{text:'exists'}]}));
                }
                const response=await mf.dispatchFetch('https://validation.invalid/');
                const output=await response.json();
                assert.equal(response.status,200,JSON.stringify(output));
                const r=output.result;
                if(defects){
                if(scenario==='native'){assert.equal(r.seed,200);assert.equal(r.observed.body.errorCode,'NO_NATIVE');assert.equal(r.providerCallsBeforeControl,0);assert.equal(r.control.body.source,'native');assert.equal(r.providerCallsAfterControl,1);}
                if(scenario==='duration'){assert.equal(r.control.status,400);assert.equal(r.observed.status,202);assert.equal(r.providerPosts,1);assert.deepEqual(r.charge,{amount:1,state:'charged'});assert.equal(r.balance.diamonds,2);assert.equal(r.job.status,'processing');}
                if(scenario==='refresh'){assert.equal(r.afterControl.status,'processing');assert.equal(r.observed.body.errorCode,'INSUFFICIENT_DIAMONDS');assert.equal(r.victim.status,'failed');assert.equal(r.victim.error_code,'SUPERSEDED');assert.equal(r.charges.n,0);assert.equal(r.providerCalls,0);}
                if(scenario==='balance'){assert.equal(r.observed.body.diamonds,3);assert.equal(r.control.body.diamonds,0);}
                if(scenario==='stampede'){assert.ok(r.results.every(item=>item.status===200));assert.equal(r.providerCallsBeforeControl,2);assert.equal(r.providerCallsAfterControl,2);assert.equal(r.control.body.cached,true);}
                if(scenario==='translation'){assert.equal(r.controlCount,3);assert.equal(r.before.length,3);assert.equal(r.before[0].translation,'Translation 0');assert.equal(r.observedCount,1);assert.equal(r.after.length,1);}
                if(scenario==='stampede')await r2.put('transcripts/abcdefghijk/en.json',JSON.stringify({segments:[{text:'Hello',start:0,duration:1}]}));
                if(scenario==='recommendation'){assert.equal(r.control.videos.length,1);assert.equal(r.observed.videos.length,0);assert.equal(r.observed.hasMore,false);assert.equal(r.existingKey,true);}
                if(scenario==='gladia'){assert.equal(r.observed.status,202);assert.equal(r.acceptedPosts,2);assert.equal(r.jobs.results.length,1);assert.equal(r.jobs.results[0].gladia_job_id,'accepted-2');assert.equal(r.charges.n,1);assert.equal(r.charges.total,1);}
                if(scenario==='tokenizer'){assert.equal(r.beforeRelease.settled,false);assert.equal(r.beforeRelease.timedOut,true);assert.ok(r.beforeRelease.downloads>0);assert.equal(r.afterRelease.status,200);assert.ok(r.afterRelease.body.segments[0].tokens.length>0);}
                }else{
                if(scenario==='native'){assert.equal(r.seed,200);assert.equal(r.observed.body.source,'native');assert.equal(r.providerCallsBeforeControl,1);assert.equal(r.control.body.source,'native');}
                if(scenario==='duration'){assert.equal(r.control.status,400);assert.equal(r.observed.status,400);assert.equal(r.providerPosts,0);assert.equal(r.charge,null);assert.equal(r.balance.diamonds,3);assert.equal(r.job,null);}
                if(scenario==='refresh'){assert.equal(r.afterControl.status,'processing');assert.equal(r.observed.status,202);assert.equal(r.victim.status,'processing');assert.equal(r.victim.refund_status,'none');assert.equal(r.charges.n,0);assert.equal(r.providerCalls,0);}
                if(scenario==='balance'){assert.equal(r.observed.body.diamonds,0);assert.equal(r.control.body.diamonds,0);}
                if(scenario==='stampede'){assert.ok(r.results.every(item=>item.status===200));assert.equal(r.providerCallsBeforeControl,1);assert.equal(r.providerCallsAfterControl,1);assert.equal(r.control.body.cached,true);}
                if(scenario==='translation'){assert.equal(r.controlCount,3);assert.equal(r.before.length,3);assert.equal(r.observedCount,3);assert.equal(r.after.length,3);assert.equal(r.after[0].translation,'Translation 0');}
                if(scenario==='recommendation'){assert.equal(r.control.videos.length,1);assert.match(r.observed.error,/verification budget/);assert.equal(r.existingKey,true);}
                if(scenario==='gladia'){assert.equal(r.observed.status,202);assert.equal(r.acceptedPosts,1);assert.equal(r.jobs.results.length,1);assert.equal(r.jobs.results[0].submission_state,'uncertain');assert.equal(r.jobs.results[0].gladia_job_id,null);assert.equal(r.charges.n,1);assert.equal(r.charges.total,1);assert.equal(r.recoveredJob.gladia_job_id,'accepted-1');assert.equal(r.recoveredJob.submission_state,'accepted');assert.equal(r.totalPostsAfterRecovery,1);}
                if(scenario==='tokenizer'){assert.equal(r.beforeRelease.settled,true);assert.equal(r.beforeRelease.timedOut,false);assert.equal(r.afterRelease.status,200);}
                }
                evidence.push(output);
            }finally{await mf.dispose();}
        });
    }
    if(process.env.VOCA_VALIDATION_OUTPUT)await writeFile(process.env.VOCA_VALIDATION_OUTPUT,JSON.stringify({node:process.version,compatibilityDate:'2024-12-20',sources:sourcesBefore,evidence},null,2)+'\n');
});
