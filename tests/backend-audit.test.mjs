import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { validateAuthToken, requireAuth, invalidateUserTokenCache } from '../functions-src/middlewares/auth.js';
import { onRequestPost as transcript } from '../functions-src/api/transcript.js';
import { onRequestGet as diamonds } from '../functions-src/api/diamonds.js';
import { onRequestPost as dualSubtitles } from '../functions-src/api/dual-subtitles.js';
import { onRequestGet as recommendations } from '../functions-src/api/recommended-videos.js';

const uid = '11111111-1111-4111-8111-111111111111';
const token = `${btoa('{}')}.${btoa(JSON.stringify({ sub: uid, exp: 2524608000 }))}.fixture`;
const env = { SUPABASE_URL: 'https://auth.fixture.test', SUPABASE_SERVICE_ROLE_KEY: 'fixture' };
const request = (path = 'diamonds', body) => new Request(`https://voca.study/api/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    ...(body ? { method: 'POST', body: JSON.stringify(body) } : {})
});

for (const mode of [503, 429, 302, 'network', 'malformed', 'profile']) {
    test(`auth availability: ${mode} stays retryable rather than becoming a token rejection`, async t => {
        invalidateUserTokenCache(uid);
        t.after(() => invalidateUserTokenCache(uid));
        t.mock.method(globalThis, 'fetch', async url => {
            if (mode === 'network') throw new Error('fixture network outage');
            if (mode === 'malformed') return new Response('{');
            if (mode === 'profile' && url.includes('/auth/v1/user')) return Response.json({ id: uid });
            return new Response(null, { status: mode === 'profile' ? 503 : mode });
        });
        const result = await requireAuth(request(), env);
        assert.equal(result.user, undefined);
        assert.equal(result.response.status, 503);
        assert.equal(result.response.headers.get('Retry-After'), '5');
        assert.equal(result.response.headers.get('Cache-Control'), 'no-store');
        assert.equal(result.response.headers.has('WWW-Authenticate'), false);
        assert.equal((await result.response.json()).code, 'AUTH_UNAVAILABLE');
    });
}

test('invalid credentials remain 401 and absent credentials remain anonymous-capable', async t => {
    invalidateUserTokenCache(uid);
    t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 401 }));
    assert.equal((await requireAuth(request(), env)).response.status, 401);
    const absent = await validateAuthToken(new Request('https://voca.study/api/diamonds'), env);
    assert.equal(absent.valid, false);
    assert.equal(absent.response, undefined);
});

for (const [name, handler, body] of [
    ['transcript', transcript, { videoId: 'abcdefghijk', lang: 'en', preferAI: true }],
    ['diamonds', diamonds],
    ['dual-subtitles', dualSubtitles, { videoId: 'abcdefghijk', sourceLang: 'en', targetLang: 'vi',
        forceRefresh: true, segments: [{ text: 'Hello', start: 0, duration: 1 }] }]
]) {
    test(`${name} never touches anonymous quotas or providers during an authenticated outage`, async t => {
        invalidateUserTokenCache(uid);
        const calls = [];
        t.mock.method(globalThis, 'fetch', async url => {
            calls.push(url);
            return new Response(null, { status: 503 });
        });
        const response = await handler({ request: request(name, body), env: {
            ...env,
            VOCAB_DB: { prepare() { assert.fail('Must not access financial or job state'); } },
            TRANSCRIPT_CACHE: { get() { assert.fail('Must not consume anonymous quota'); } }
        } });
        assert.equal(response.status, 503);
        assert.deepEqual(calls, ['https://auth.fixture.test/auth/v1/user']);
    });
}

test('recovery and webhook bundles exclude optional NLP tokenizer dependencies', async () => {
    for (const entry of ['functions-src/api/gladia-webhook.js', 'functions-src/api/internal/reconcile.js']) {
        const result = await build({ entryPoints: [entry], bundle: true, write: false, metafile: true,
            format: 'esm', platform: 'browser', conditions: ['worker', 'browser', 'import', 'default'] });
        const inputs = Object.keys(result.metafile.inputs);
        assert.equal(inputs.some(path => /tokenizer\.js|node_modules\/(?:@patdx|compromise|pinyin-pro|hangul-romanization)\//.test(path)), false);
    }
});

let DatabaseSync;
try { ({ DatabaseSync } = await import('node:sqlite')); } catch { /* Optional on Node 20. */ }
test('expression index removes sorting without changing NULL and zero cursor ordering', { skip: !DatabaseSync }, async t => {
    const db = new DatabaseSync(':memory:');
    t.after(() => db.close());
    db.exec('CREATE TABLE video_languages (video_id TEXT PRIMARY KEY, updated_at INTEGER)');
    db.exec("INSERT INTO video_languages VALUES ('a', 10), ('b', 10), ('c', NULL), ('d', 0), ('e', -1)");
    const order = ' ORDER BY COALESCE(updated_at, 0) DESC, video_id ASC LIMIT ?';
    const query = 'SELECT video_id FROM video_languages' + order;
    const before = db.prepare(query).all(10);
    assert.ok(db.prepare('EXPLAIN QUERY PLAN ' + query).all(10).some(row => /TEMP B-TREE/.test(row.detail)));
    const migration = await readFile(new URL('../db/migrations/d1/20261104_video_languages_coalesce_order_index.sql', import.meta.url), 'utf8');
    db.exec(migration);
    db.exec(migration); // Safe on existing environments.
    for (const [sql, bindings] of [[query, [10]], [
        'SELECT video_id FROM video_languages WHERE (COALESCE(updated_at, 0) < ? OR (COALESCE(updated_at, 0) = ? AND video_id > ?))' + order,
        [10, 10, 'a', 10]
    ]]) {
        const plan = db.prepare('EXPLAIN QUERY PLAN ' + sql).all(...bindings);
        assert.ok(plan.some(row => /idx_video_languages_coalesce_order/.test(row.detail)));
        assert.equal(plan.some(row => /TEMP B-TREE/.test(row.detail)), false);
    }
    assert.deepEqual(db.prepare(query).all(10), before);
    assert.deepEqual(before.map(row => row.video_id), ['a', 'b', 'c', 'd', 'e']);
});

test('metadata healing bounds concurrency, updates once per video and preserves newer catalog fields', { skip: !DatabaseSync }, async t => {
    const sqlite = new DatabaseSync(':memory:');
    t.after(() => sqlite.close());
    sqlite.exec(await readFile(new URL('../db/schema.sql', import.meta.url), 'utf8'));
    for (let i = 0; i < 6; i++) {
        sqlite.prepare(`INSERT INTO video_languages(video_id,title,channel,available_languages,sub_languages,updated_at)
            VALUES(?,?,?,'["en"]','["en"]',100)`).run(`video00000${i}`, `Lesson ${i}`, 'Creator');
    }
    let writes = 0, active = 0, peak = 0;
    const db = { prepare(sql) { return { bind(...args) { return {
        async all() { return { success: true, results: sqlite.prepare(sql).all(...args) }; },
        async run() {
            writes++;
            // A newer publisher wins a race with the repair task.
            sqlite.prepare("UPDATE video_languages SET title='Fresh title',channel='Fresh creator',channel_avatar='fresh-avatar' WHERE video_id=?")
                .run(args.at(-1));
            sqlite.prepare(sql).run(...args);
        }
    }; } }; } };
    t.mock.method(globalThis, 'fetch', async url => {
        active++;
        peak = Math.max(peak, active);
        await new Promise(resolve => setImmediate(resolve));
        active--;
        return url.includes('/oembed?') ? Response.json({ author_url: 'https://www.youtube.com/@fixture' })
            : new Response('<meta property="og:image" content="https://yt3.ggpht.com/old-avatar">');
    });
    const tasks = [];
    const response = await recommendations({ request: new Request('https://voca.study/api/recommended-videos?lang=en&refresh=true'),
        env: { VOCAB_DB: db }, waitUntil(promise) { tasks.push(promise); } });
    assert.equal(response.status, 200);
    await Promise.all(tasks);
    assert.equal(writes, 5);
    assert.equal(peak, 2);
    const healed = sqlite.prepare("SELECT * FROM video_languages WHERE channel_avatar IS NOT NULL").all();
    assert.equal(healed.length, 5);
    for (const row of healed) {
        assert.equal(row.title, 'Fresh title');
        assert.equal(row.channel, 'Fresh creator');
        assert.equal(row.channel_avatar, 'fresh-avatar');
        assert.equal(row.updated_at, 100);
    }
});
