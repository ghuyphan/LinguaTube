import test from 'node:test';
import assert from 'node:assert/strict';
import { consumeRateLimitUnits } from '../functions-src/middlewares/rate-limiter.js';
import { onRequestPost as batch } from '../functions-src/api/translate/batch.js';
import { onRequest as dictionary } from '../functions-src/api/dict.js';
import { onRequest as kanji } from '../functions-src/api/kanji.js';
import { onRequest as tts } from '../functions-src/api/tts.js';
import { DictionaryProvider } from '../functions-src/providers/dictionary-apis.js';
import { DictionaryService } from '../functions-src/services/dict.service.js';
import { normalizeDictionaryText, parseNaver, parseJotoba } from '../functions-src/utils/dict-parsers.js';
import { readBoundedBody } from '../functions-src/utils/response-body.js';
import { translateBatch, translateText } from '../functions-src/providers/lingva.js';
import { onRequest as tokenizeBatch } from '../functions-src/api/tokenize-batch/[lang].js';
import { onRequest as tokenizeSingle } from '../functions-src/api/tokenize/[lang].js';

const context = (path, body, env = {}) => ({ request: new Request(`https://voca.study${path}`, {
    method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {})
}), env });

test('cold quota initializes once and failed persistence is retried with bound context', async () => {
    let reads = 0, writes = 0; const registered = [];
    const kv = { async get() { reads++; await new Promise(r => setTimeout(r, 5)); return null; }, async put() { writes++; if (writes === 1) throw Error('offline'); } };
    const config = { max: 1, windowSeconds: 3600, keyPrefix: 'cold-regression' };
    const ctx = { waitUntil(p) { assert.equal(this, ctx); registered.push(p); } };
    const results = await Promise.all(Array.from({ length: 8 }, () => consumeRateLimitUnits(kv, 'same', config, 1, ctx)));
    await Promise.all(registered);
    assert.equal(reads, 1); assert.equal(results.filter(r => r.allowed).length, 1);
    const before = writes; await consumeRateLimitUnits(kv, 'same', config, 1); assert.ok(writes > before);
});

test('batch translation distinguishes embedded delimiters and bypasses identity work', async () => {
    for (const texts of [['a\u001fb', 'c'], ['a', 'b\u001fc'], ['', '猫']]) {
        const response = await batch(context('/api/translate/batch', { source: 'en', target: 'en', texts }));
        assert.deepEqual((await response.json()).translations, texts);
    }
});

test('identical translation misses share upstream work and preserve outputs', async t => {
    let calls = 0;
    t.mock.method(globalThis, 'fetch', async () => { calls++; await new Promise(r => setTimeout(r, 10)); return Response.json([[['<t id="0">hello</t>']]]); });
    const make = () => batch(context('/api/translate/batch', { source: 'ja', target: 'en', texts: ['reliability-shared-unique'] }));
    const results = await Promise.all([make(), make(), make()]);
    assert.equal(calls, 1);
    for (const result of results) assert.deepEqual((await result.json()).translations, ['hello']);
});

test('token caches distinguish delimiter and 32-bit hash collisions', async () => {
    for (const texts of [['a||b', 'c'], ['a', 'b||c']]) {
        const c = context('/api/tokenize-batch/en', { videoId: 'dQw4w9WgXcQ', texts }); c.params = { lang: 'en' };
        const response = await tokenizeBatch(c); const data = await response.json();
        assert.equal(data.tokens.length, 2);
        assert.equal(data.tokens[0].map(t => t.surface).join(''), texts[0]);
    }
    for (const text of ['Aa', 'B@']) {
        const c = context('/api/tokenize/en', { text }); c.params = { lang: 'en' };
        const data = await (await tokenizeSingle(c)).json(); assert.equal(data.tokens.map(t => t.surface).join(''), text);
    }
});

test('dictionary normalizes nested ruby and provider POS without substituting kanji level', () => {
    assert.equal(normalizeDictionaryText('&amp;lt;ruby&amp;gt;食&amp;lt;rt&amp;gt;た&amp;lt;/rt&amp;gt;&amp;lt;/ruby&amp;gt;べる'), '食べる');
    const [entry] = parseNaver({ searchResultMap: { searchResultListMap: { WORD: { items: [{ expEntry: 'hello', meansCollector: [{ partOfSpeech: '감탄사', means: [{ value: 'greeting', exampleOri: '&lt;ruby&gt;食&lt;rt&gt;た&lt;/rt&gt;&lt;/ruby&gt;べる' }] }] }] } } } });
    assert.equal(entry.partOfSpeech, 'int'); assert.equal(entry.examples[0], '食べる');
    assert.equal(parseJotoba({ words: [{ reading: { kanji: '猫', kana: 'ねこ' }, senses: [{ glosses: ['cat'] }] }], kanji: [{ jlpt: 3 }] })[0].level, null);
});

test('all twenty dictionary pairs declare actual language and translate mismatches', async () => {
    const provider = new DictionaryProvider(); let translations = 0;
    provider.fetchFromSource = async () => [{ word: 'fixture', definitions: ['meaning'] }];
    const translator = { async translateEntries(entries) { translations++; return entries.map(entry => ({ ...entry, definitions: ['translated meaning'] })); } };
    const service = new DictionaryService(provider, translator);
    for (const from of ['ja','zh','ko','en']) for (const to of ['ja','zh','ko','en','vi']) {
        const result = await service.fetchWithFallback('fixture', from, to);
        assert.equal(result.outcome, 'found'); assert.equal(result.entries[0].definitionLanguage, to);
        assert.ok(['native','translated'].includes(result.entries[0].definitionKind));
    }
    assert.ok(translations >= 2);
    translator.translateEntries = async () => [];
    const fallback = await service.fetchWithFallback('fixture', 'ja', 'ja');
    assert.equal(fallback.entries[0].definitionLanguage, 'en'); assert.equal(fallback.entries[0].definitionKind, 'fallback');
});

test('dictionary outage stays retryable; a clean negative expires', async t => {
    let mode = 'outage', calls = 0;
    t.mock.method(globalThis, 'fetch', async () => { calls++; if (mode === 'outage') throw Error('offline');
        if (mode === 'empty') return Response.json([]);
        return Response.json({ searchResultMap: { searchResultListMap: { WORD: { items: [{ expEntry: 'recovered', languageCode: 'ENEN', meansCollector: [{ means: [{ value: 'meaning' }] }] }] } } } }); });
    const make = () => dictionary(context('/api/dict?word=outage-regression&from=en&to=en'));
    const outage = await make(); assert.equal(outage.status, 503); assert.equal(outage.headers.get('Cache-Control'), 'no-store');
    mode = 'found'; const before = calls; assert.equal((await (await make()).json()).entries.length, 1); assert.ok(calls > before);
    // Exercise a fully empty, schema-valid response for each configured source.
    t.mock.method(globalThis, 'fetch', async url => { calls++; return Response.json(String(url).includes('naver') ? { searchResultMap: { searchResultListMap: {} } } : []); });
    const empty = () => dictionary(context('/api/dict?word=negative-regression&from=en&to=en'));
    assert.equal((await empty()).status, 200); const attempts = calls;
    assert.equal((await empty()).headers.get('X-Cache'), 'NEG'); assert.equal(calls, attempts);
    const now = Date.now(); t.mock.method(Date, 'now', () => now + 61000);
    await empty(); assert.ok(calls > attempts);
});

test('body deadlines and byte limits cancel stalled and oversized reads', async () => {
    let cancelled = false;
    const stalled = new Response(new ReadableStream({ cancel() { cancelled = true; } }));
    const controller = new AbortController(); const reading = readBoundedBody(stalled, controller.signal, 100);
    controller.abort(); await assert.rejects(reading); assert.ok(cancelled);
    await assert.rejects(readBoundedBody(new Response(new Uint8Array(101)), undefined, 100), /too large/);
    const result = await translateBatch(['deadline item'], 'ja', 'en', { deadline: Date.now() - 1 }); assert.deepEqual(result, [null]);
});

test('kanji outages are non-cacheable and malformed TTS parameters are rejected', async t => {
    t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 503 }));
    const response = await kanji(context('/api/kanji?query=食')); assert.equal(response.status, 502); assert.equal(response.headers.get('Cache-Control'), 'no-store');
    const invalid = await tts(context('/api/tts', { text: { bad: true } })); assert.equal(invalid.status, 400);
});

test('chunk workers share five individual recovery slots', async t => {
    let active = 0, peak = 0, individuals = 0;
    t.mock.method(globalThis, 'fetch', async url => {
        const parsed = new URL(url); const q = parsed.searchParams.get('q') || '';
        if (parsed.hostname === 'translate.googleapis.com' && q && !q.startsWith('<t ')) {
            individuals++; active++; peak = Math.max(peak, active);
            await new Promise(resolve => setTimeout(resolve, 5)); active--;
            return Response.json([[['translated meaning']]]);
        }
        return Response.json(parsed.hostname === 'api.mymemory.translated.net' ? { responseStatus: 200, responseData: {} } : []);
    });
    const inputs = Array.from({ length: 20 }, (_, i) => `${i}-${'x'.repeat(90)}`);
    const outputs = await translateBatch(inputs, 'ja', 'vi');
    assert.equal(individuals, 20); assert.equal(peak, 5); assert.ok(outputs.every(text => text === 'translated meaning'));
});

test('Google TTS fallback bounds audio bytes after primary failure', async t => {
    t.mock.method(globalThis, 'WebSocket', function () { throw new Error('primary unavailable'); });
    t.mock.method(globalThis, 'fetch', async () => new Response(new Uint8Array(128), { headers: { 'Content-Type': 'audio/mpeg' } }));
    const success = await tts(context('/api/tts', { text: 'bounded-audio-small', lang: 'en' }));
    assert.equal(success.status, 200); assert.equal((await success.arrayBuffer()).byteLength, 128);
    t.mock.method(globalThis, 'fetch', async () => new Response(new Uint8Array(1024 * 1024 + 1)));
    const oversized = await tts(context('/api/tts', { text: 'bounded-audio-large', lang: 'en' }));
    assert.equal(oversized.status, 502);
});

test('Naver ranks a primary exact headword before a secondary homonym without dropping alternate senses', () => {
    const item = (word, number, definition) => ({ expEntry: word, expEntrySuperscript: number, meansCollector: [{ means: [{ value: definition }] }] });
    const entries = parseNaver({ searchResultMap: { searchResultListMap: { WORD: { items: [
        item('학교', '2', '监狱'), item('학교', '', '学校'), item('고등학교', '', '高中')
    ] } } } }, '학교');
    assert.equal(entries[0].definitions[0], '学校');assert.equal(entries[1].definitions[0], '监狱');
    assert.equal(entries.length, 3);
});

test('fallback cache lifetime is capped even when an old KV entry advertises a longer TTL', async () => {
    const { CacheManager } = await import('../functions-src/utils/cache-manager.js');
    let fetched = 0;
    const cache = new CacheManager({ get: async () => JSON.stringify({timestamp:Date.now()-61000,ttl:604800,data:{entries:[{definitionKind:'fallback'}]}}) }, {skipKvWrite:true});
    const result = await cache.getOrFetch({}, 'fallback-ttl-regression', async()=>{fetched++;return {entries:[{definitionKind:'native'}]};},
        {ttl:604800,staleTtl:0,ttlForData:data=>data.entries.some(entry=>entry.definitionKind==='fallback')?60:604800});
    assert.equal(fetched,1);assert.equal(result.cached,false);
});

test('changed HTML layout and broken search endpoints are unavailable, not authoritative misses', async t => {
    const provider = new DictionaryProvider();
    const source = provider.getSources('zh', 'en')[0];
    t.mock.method(globalThis, 'fetch', async () => new Response('<html><body>layout changed</body></html>'));
    await assert.rejects(provider.fetchFromSource(source, '学习', 100), /Unrecognized/);
    t.mock.method(globalThis, 'fetch', async () => new Response('<html><p>No results found</p></html>'));
    assert.deepEqual(await provider.fetchFromSource(source, 'missing', 100), []);
    t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 404 }));
    await assert.rejects(provider.fetchFromSource(source, '学习', 100), /HTTP 404/);
});

test('Google translation retains POST recovery when a short GET receives 414', async t => {
    let calls = 0;
    t.mock.method(globalThis, 'fetch', async (_url, options) => {
        calls++; if (options.method !== 'POST') return new Response(null,{status:414});
        assert.equal(options.body.get('q'),'こんにちは');return Response.json([[['hello']]]);
    });
    assert.equal(await translateText('こんにちは','ja','en'),'hello');assert.equal(calls,2);
});

test('kanji deadlines terminate stalled headers and bodies; TTS fallback also aborts', async t => {
    const nativeTimeout = AbortSignal.timeout.bind(AbortSignal);
    const budgets = []; t.mock.method(AbortSignal, 'timeout', ms => { budgets.push(ms); return nativeTimeout(Math.min(ms, 20)); });
    for (const phase of ['headers', 'body']) {
        t.mock.method(globalThis, 'fetch', async (_url, {signal}) => phase === 'headers'
            ? new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(signal.reason),{once:true}))
            : new Response(new ReadableStream()));
        let timer;
        try {
            const response = await Promise.race([kanji(context('/api/kanji?query='+encodeURIComponent('時'))),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('deadline not honored')),1000);})]);
            assert.equal(response.status,504);assert.equal(response.headers.get('Cache-Control'),'no-store');
        } finally {clearTimeout(timer);}
    }
    t.mock.method(globalThis, 'WebSocket', function () { throw Error('primary unavailable'); });
    t.mock.method(globalThis, 'fetch', async (_url, {signal}) => new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(signal.reason),{once:true})));
    let timer;
    try {
        const response = await Promise.race([tts(context('/api/tts',{text:'stalled-fallback',lang:'en'})),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('deadline not honored')),1000);})]);
        assert.equal(response.status,502);assert.equal(response.headers.get('Cache-Control'),'no-store');
    } finally {clearTimeout(timer);}
    assert.ok(budgets.every(ms=>ms===5000));
});

test('Naver keeps exact senses and per-entry direction while excluding reverse and subentries', () => {
    const item = (word, code, value, matchType = 'exact:entry') => ({ handleEntry: word, expEntry: word, languageCode: code, matchType, meansCollector: [{ means: [{ value }] }] });
    const data = { searchResultMap: { searchResultListMap: { WORD: { items: [
        item('银行','ZHKO','은행'), item('银行','ZHKO','은행 기관'), item('银行','ZHEN','bank'),
        item('银行','ZHZH','unrelated article','exact:subEntry'), item('은행','KOZH','银行')
    ] } } } };
    const entries = parseNaver(data, '银行', 'zh', 'ko');
    assert.deepEqual(entries.map(e => [e.definitions[0], e.definitionLanguage]), [['은행','ko'], ['은행 기관','ko'], ['bank','en']]);
});

test('mixed dictionary languages translate independently and preserve failed group metadata', async () => {
    const provider = { primaryTimeout: 1000, getSources(from, to) { return to === 'ko' ? [{url:'direct',parser:'naver',definitionLanguage:'ko'}] : []; },
        async fetchFromSource() { return [
            {word:'银行',definitions:['은행'],definitionLanguage:'ko'},
            {word:'银行',definitions:['bank'],definitionLanguage:'en'},
            {word:'银行',definitions:['银行机构'],definitionLanguage:'zh'}
        ]; } };
    const seen = [];
    const translator = { async translateEntries(entries, target, options) { seen.push(options.sourceLang); return options.sourceLang === 'en' ? entries.map(e => ({...e,definitions:['은행 번역']})) : []; } };
    const result = await new DictionaryService(provider, translator).fetchWithFallback('银行','zh','ko');
    assert.deepEqual(seen.sort(), ['en','zh']);
    assert.deepEqual(result.entries.map(e => [e.definitions[0],e.definitionLanguage,e.definitionKind]), [
        ['은행','ko','native'], ['은행 번역','ko','translated'], ['银行机构','zh','fallback']
    ]);
});

test('Naver malformed search shape remains unavailable and does not become a negative', async t => {
    let malformed = true;
    t.mock.method(globalThis, 'fetch', async () => malformed ? Response.json({searchResultMap:{searchResultListMap:{WORD:{items:'bad'}}}}) : Response.json({searchResultMap:{searchResultListMap:{WORD:{items:[{expEntry:'shapecheck',languageCode:'ENEN',meansCollector:[{means:[{value:'valid'}]}]}]}}}}));
    const make = () => dictionary(context('/api/dict?word=shapecheck&from=en&to=en'));
    assert.equal((await make()).status, 503);
    malformed = false;
    assert.equal((await (await make()).json()).entries[0].definitions[0], 'valid');
});
