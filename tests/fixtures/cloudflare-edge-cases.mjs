// Explicit route inventory: the default suite rejects an unlisted future API file.
export const routes = [
 ['diamonds','GET'], ['dict','GET'], ['dual-subtitles','POST'], ['geo','GET'],
 ['gladia-webhook','POST'], ['heal-levels','POST'], ['internal/reconcile','POST'],
 ['kanji','GET'], ['leaderboard','GET'], ['payment/check-status','GET'],
 ['payment/create-order','POST'], ['payment/revenuecat-webhook','POST'], ['payment/webhook','POST'],
 ['recommended-videos','POST'], ['tokenize/[lang]','POST'], ['tokenize-batch/[lang]','POST'],
 ['transcript','POST'], ['translate/[[path]]','GET'], ['translate/batch','POST'],
 ['tts','GET'], ['version','GET'], ['video-category','GET'], ['video-info','GET'], ['video-level','POST']
];
export const cases = [];
const add = (name, route, options = {}) => cases.push({ name, route, method: routes.find(r=>r[0]===route)[1], ...options });
const cue = {start:0,duration:1,text:'Hello'};
export const validToken = `fixture.${btoa(JSON.stringify({sub:'11111111-1111-4111-8111-111111111111',exp:2208988800}))}.fixture`;
const signed = { Authorization: `Bearer ${validToken}` };

// Every public route passes through the real middleware for size/bot controls.
for (const [route,method] of routes) {
 const webhook = ['payment/webhook','payment/revenuecat-webhook','gladia-webhook','internal/reconcile'].includes(route);
 if (!webhook) add('bot rejected',route,{method,headers:{'User-Agent':'python-requests/2.31'},body:method==='POST'?{}:undefined,status:403,noUpstream:true});
 if (method==='POST' || ['tts','video-info','video-category','leaderboard'].includes(route)) {
  add('oversized streamed body rejected',route,{method:'POST',raw:'x'.repeat(2*1024*1024+1),status:413,noUpstream:true});
  for(const raw of ['{', 'null','[]','"text"','true','42','']) add(`invalid JSON object ${JSON.stringify(raw)}`,route,{method:'POST',raw,status:raw===''&&['heal-levels','internal/reconcile'].includes(route)?401:400,noUpstream:true});
 }
}
for (const route of ['video-category','video-level','payment/create-order']) {
 for (const Authorization of [undefined,'Bearer bad','Basic abc',`Bearer fixture.${btoa(JSON.stringify({sub:'x',exp:1}))}.fixture`])
  add(`unauthenticated write ${Authorization||'missing'}`,route,{method:'POST',body:{videoId:'abcdefghijk',category:'news',language:'en',level:'CEFR B1'},headers:Authorization?{Authorization}:{},status:401,noUpstream:true});
}
for(const route of ['dict','kanji','video-info','dual-subtitles','translate/[[path]]']) add('missing required query',route,{method:'GET',status:400,noUpstream:true});
for(const word of ['', ' ', '\u0000', '<>']) add(`empty sanitized word ${JSON.stringify(word)}`,'dict',{query:{word,from:'en',to:'vi'},status:400,noUpstream:true});
for(const from of ['xx','../../en']) add('unsupported dictionary source '+from,'dict',{query:{word:'hello',from,to:'en'},status:400,noUpstream:true});
for(const text of ['', 'x'.repeat(301)]) add('TTS length '+text.length,'tts',{query:{text,lang:'en'},status:400,noUpstream:true});
for(const body of [{text:1},{text:'hello',lang:{}},{text:'hello',voice:[]}]) add('TTS invalid types '+JSON.stringify(body),'tts',{method:'POST',body,status:400,noUpstream:true});
for (const videoId of ['../secret','short','a'.repeat(12),{},null]) add('invalid video ID '+JSON.stringify(videoId),'transcript',{body:{videoId,lang:'en'},status:400,noUpstream:true});
for(const body of [{duration:'60'},{duration:-1},{duration:0},{preferAI:'true'},{forceRefresh:1},{jobId:{}},{lang:'xx'}]) add('invalid transcript field '+JSON.stringify(body),'transcript',{body:{videoId:'abcdefghijk',lang:'en',...body},status:400,noUpstream:true});
for (const resultUrl of ['http://api.gladia.io/v2/pre-recorded/a','https://api.gladia.io.evil.test/v2/pre-recorded/a','https://localhost/a','https://127.0.0.1/a','https://api.gladia.io/admin']) add('unsafe polling URL '+resultUrl,'transcript',{body:{videoId:'abcdefghijk',lang:'en',resultUrl},status:400,noUpstream:true});
for (const duration of [-1,0,'60',14401,{},null]) add('invalid metadata duration '+JSON.stringify(duration),'video-info',{method:'POST',body:{videoId:'abcdefghijk',duration},status:400,noUpstream:true});
for (const route of ['tokenize/[lang]','tokenize-batch/[lang]']) {
 add('unsupported tokenizer language',route,{params:{lang:'xx'},body:{text:'hello',texts:['hello'],videoId:'abcdefghijk'},status:400,noUpstream:true});
 add('unsupported tokenizer method',route,{method:'GET',params:{lang:'en'},status:405,noUpstream:true});
}
for(const text of ['',null,42,{},'x'.repeat(10001)]) add('single tokenizer input '+(typeof text==='string'?text.length:JSON.stringify(text)),'tokenize/[lang]',{params:{lang:'en'},body:{text},status:400,noUpstream:true});
for(const [route,limit,length] of [['tokenize-batch/[lang]',800,2000],['translate/batch',80,1500]]) {
 const base={videoId:'abcdefghijk',source:'en',target:'vi'};
 for(const texts of [[],null,{},[null],['x'.repeat(length+1)],Array(limit+1).fill('x')]) add('invalid batch '+route+' '+JSON.stringify(texts).slice(0,45),route,{params:{lang:'en'},body:{...base,texts},status:400,noUpstream:true});
}
for(const segments of [[],{},[{...cue,start:-1}],[{...cue,duration:'1'}],[{...cue,text:'x'.repeat(1501)}],Array(2501).fill(cue)]) add('invalid subtitle cues '+JSON.stringify(segments).slice(0,45),'dual-subtitles',{body:{videoId:'abcdefghijk',sourceLang:'en',targetLang:'vi',segments},status:400,noUpstream:true});
for(const code of ['', '-1','12.5','1e3','9007199254740992','1&user_id=neq.x']) add('invalid order code '+code,'payment/check-status',{query:{orderCode:code},status:400,noUpstream:true});
add('valid order needs identity','payment/check-status',{query:{orderCode:'12345678'},status:401,noUpstream:true});
add('admin absent','heal-levels',{body:{},status:401,noUpstream:true});
add('maintenance absent','internal/reconcile',{body:{},drop:'BACKEND_MAINTENANCE_SECRET',status:503,noUpstream:true});
add('maintenance incorrect secret','internal/reconcile',{body:{},headers:{Authorization:'Bearer wrong'},status:401,noUpstream:true});
add('callback unsigned','gladia-webhook',{body:{id:'fake',status:'done'},status:401,noUpstream:true});
add('payment unsigned','payment/webhook',{body:{data:{orderCode:12345678,amount:1},signature:'wrong'},status:400,noUpstream:true});
add('revenuecat unsigned','payment/revenuecat-webhook',{body:{event:{type:'TEST'}},status:401,noUpstream:true});
add('revenuecat configured secret absent','payment/revenuecat-webhook',{body:{event:{type:'TEST'}},drop:'REVENUECAT_WEBHOOK_SECRET',status:503,noUpstream:true});
add('revenuecat sandbox ignored','payment/revenuecat-webhook',{body:{event:{type:'INITIAL_PURCHASE',environment:'SANDBOX'}},headers:{Authorization:'Bearer fixture-callback'},status:200,noUpstream:true,expect:{status:'ignored_environment'}});
for(const [route,body] of [['video-category',{videoId:'abcdefghijk',category:'invented'}],['video-level',{videoId:'abcdefghijk',language:'xx',level:'CEFR B1'}],['video-level',{videoId:'abcdefghijk',language:'en',level:'HACK'}],['video-level',{videoId:'abcdefghijk',language:'en',level:'CEFR B1',confidence:0.64}],['payment/create-order',{planId:'__proto__'}]]) add('authenticated invalid input '+JSON.stringify(body),route,{method:'POST',body,headers:signed,status:400,authOnly:true});
add('payment status filters authenticated owner','payment/check-status',{query:{orderCode:'12345678'},headers:signed,status:404,authOnly:true});
add('maintenance D1 unavailable','internal/reconcile',{body:{},headers:{Authorization:'Bearer fixture-maintenance'},drop:'VOCAB_DB',status:503,noUpstream:true});
add('admin D1 unavailable','heal-levels',{body:{},headers:{'x-admin-secret':'fixture-admin'},drop:'VOCAB_DB',status:500,noUpstream:true});
add('recommendation database missing','recommended-videos',{body:{lang:'en'},drop:'VOCAB_DB',status:503,noUpstream:true});
add('kanji provider unavailable','kanji',{query:{query:'水'},status:502,providerOnly:true});
add('dictionary providers unavailable','dict',{query:{word:'edgecasefixtureword',from:'en',to:'vi'},status:503,providerOnly:true});
add('video metadata upstream outage','video-info',{query:{videoId:'outageabcde'},status:503,providerOnly:true});
for(const country of [undefined,'XX','T1','vn']) add('geo fallback '+country,'geo',{headers:country?{'cf-ipcountry':country}:{},status:200,noUpstream:true,expect:{country:country==='vn'?'VN':null}});
add('anonymous credits status','diamonds',{status:200,noUpstream:true,expect:{tier:'anonymous',diamonds:3}});
add('category taxonomy','video-category',{status:200,noUpstream:true,expect:{success:true}});
add('category missing video falls back','video-category',{query:{videoId:'abcdefghijk'},status:200,noUpstream:true,expect:{category:'general'}});
add('transcript health without secrets','transcript',{method:'GET',drop:'GLADIA_API_KEY',status:200,noUpstream:true,expect:{hasGladiaKey:false}});
add('empty recommendations','recommended-videos',{body:{lang:'en'},status:200,noUpstream:true,expect:{success:true}});
add('same-language translate bypass','translate/[[path]]',{params:{path:['en','en','hello%2Fworld']},status:200,noUpstream:true,expect:{translation:'hello/world'}});
add('same-language batch bypass','translate/batch',{body:{source:'en',target:'en',texts:['hello','']},status:200,noUpstream:true,expect:{translations:['hello','']}});
add('blank translation batch bypass','translate/batch',{body:{source:'en',target:'vi',texts:['',' ']},status:200,noUpstream:true,expect:{translations:['',' ']}});
add('empty leaderboard falls back to seeds','leaderboard',{query:{limit:'-3'},status:200,providerOnly:true});
add('version compiled fallback','version',{status:200,noUpstream:true});
for (const mode of ['auth-outage','auth-redirect','auth-identity-mismatch','profile-outage'])
 add('authentication fails closed '+mode,'video-category',{method:'POST',body:{videoId:'abcdefghijk',category:'news'},headers:signed,fixture:mode,status:401,authOnly:true});
add('authenticated level rejects invalid video ID','video-level',{body:{videoId:'short',language:'en',level:'CEFR B1',confidence:99,score:999,grammarCount:99999,speechRateCpm:99999},headers:signed,status:400,authOnly:true});
add('authenticated category persistence','video-category',{method:'POST',body:{videoId:'abcdefghijk',category:'news'},headers:signed,status:200,authOnly:true,expect:{category:'news'}});
add('authenticated level confidence clamps','video-level',{body:{videoId:'abcdefghijk',language:'en',level:'CEFR B1',confidence:99,score:999,grammarCount:99999,speechRateCpm:99999},headers:signed,status:200,allowedHosts:['auth.fixture.test','www.youtube.com'],expect:{confidence:0.9,details:{score:10,grammarCount:10000,speechRateCpm:2000}}});
add('diamond rate limit exact boundary','diamonds',{repeat:61,status:429,initialStatus:200,noUpstream:true});
add('version conditional ETag','version',{conditional:true,status:304,noUpstream:true});
export const providerCases=[];
const provider=(operation,fixture,expect,noUpstream=false)=>providerCases.push({name:operation+' '+fixture,route:'__provider',method:'POST',body:{},operation,fixture,status:200,expect,noUpstream});
for(const status of [302,400,401,408,429,500,503])provider('gladia-submit',`http-${status}`,{ok:false,ambiguous:status===408||status>=500,status});
provider('gladia-submit','gladia-accepted',{ok:true,result:{id:'fixture-provider',resultUrl:'https://api.gladia.io/v2/pre-recorded/fixture-provider'}});
provider('gladia-submit','malformed',{ok:false,ambiguous:true});
provider('gladia-submit','missing-id',{ok:false,ambiguous:true});
provider('gladia-submit-no-key','unused',{ok:false},true);
for(const status of ['processing','done','error'])provider('gladia-poll','poll-'+status,{ok:true,result:{status}});
provider('gladia-poll','http-429',{ok:false,retryAfterSeconds:120});
provider('gladia-poll','http-302',{ok:false});
provider('gladia-poll','malformed',{ok:false});
provider('gladia-invalid-poll','unused',{ok:false},true);
for(const fixture of ['metadata-empty','metadata-multiple','metadata-foreign'])provider('gladia-find',fixture,{ok:true,result:null});
provider('gladia-find','metadata-single',{ok:true,result:{id:'fixture-provider'}});
provider('supabase-read','no-content',{ok:true,result:null});
provider('supabase-read','malformed',{ok:false});
provider('supabase-read','http-302',{ok:false});
provider('payos-create','payos-success',{ok:true});
provider('payos-create','http-302',{ok:false});
provider('payos-create','http-503',{ok:false});
provider('translation','translation-success',{ok:true,result:'Translated fixture'});
provider('translation','http-302',{ok:true,result:null});
provider('translation','malformed',{ok:true,result:null});
provider('youtube-duration','duration-success',{ok:true});
provider('youtube-duration','http-302',{ok:true});
add('TTS both providers unavailable','tts',{query:{text:'Fixture unavailable speech',lang:'en'},fixture:'tts-outage',status:502,providerOnly:true});
add('TTS fallback audio too short','tts',{query:{text:'Fixture short speech',lang:'en'},fixture:'tts-short',status:502,providerOnly:true});
add('TTS fallback valid audio','tts',{query:{text:'Fixture valid speech',lang:'en'},fixture:'tts-audio',status:200,audioBytes:128,providerOnly:true});
add('single tokenizer accepts exact length boundary','tokenize/[lang]',{params:{lang:'en'},body:{text:'a'.repeat(10000)},status:200,noUpstream:true});
add('batch tokenizer accepts 800 items for authenticated quota','tokenize-batch/[lang]',{params:{lang:'en'},body:{videoId:'abcdefghijk',texts:Array(800).fill('')},headers:signed,status:200,authOnly:true});
add('translation accepts exact 80-item boundary without provider work','translate/batch',{body:{source:'en',target:'en',texts:Array(80).fill('hello')},status:200,noUpstream:true});
for (const [route,method] of routes.filter(([,method])=>method==='POST'))
 add('absent body is handled explicitly',route,{status:['heal-levels','internal/reconcile'].includes(route)?401:400,noUpstream:true});
