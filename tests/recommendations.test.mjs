import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { getRecommendedVideosFromCloudflare } from '../functions-src/data/video-info-db.js';
import { rankVideos, declusterChannels, normalizeRecommendationContext } from '../functions-src/services/recommendation.service.js';
import { onRequestGet, onRequestPost } from '../functions-src/api/recommended-videos.js';

// Exercise real SQLite SQL when available; no new package or runtime dependency.
let DatabaseSync;
try { ({ DatabaseSync } = await import('node:sqlite')); } catch { /* Node 20 runs ranking/input tests. */ }
function catalog(count = 400) {
    return Array.from({ length: count }, (_, i) => ({ video_id: `video_${String(i).padStart(4, '0')}`,
        title: `Japanese lesson ${i}`, channel: `Channel ${i % 20}`, channel_avatar: 'avatar',
        duration_seconds: 300, levels: JSON.stringify({ ja: 'N3' }), available_languages: '["ja"]',
        sub_languages: '["ja"]', category: 'education', updated_at: 10000 - i }));
}
function database(t, rows) {
    const sqlite = new DatabaseSync(':memory:');
    t.after(() => sqlite.close());
    sqlite.exec(`CREATE TABLE video_languages (video_id TEXT PRIMARY KEY, title TEXT, channel TEXT,
        channel_avatar TEXT, duration_seconds INTEGER, levels TEXT, available_languages TEXT,
        sub_languages TEXT, category TEXT, updated_at INTEGER)`);
    const insert = sqlite.prepare('INSERT INTO video_languages VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const row of rows) insert.run(...Object.values(row));
    let calls = 0;
    return { get calls() { return calls; }, prepare(sql) { return { bind(...args) { return {
        async all() { calls++; return { results: sqlite.prepare(sql).all(...args), success: true }; }
    }; } }; } };
}
const options = { skip: !DatabaseSync };

test('fixed catalog pagination has zero duplicates across page sizes and refresh flags', options, async t => {
    const db = database(t, catalog());
    const ids = [];
    const start = performance.now();
    for (let offset = 0; offset < 200; offset += 24) {
        const page = await getRecommendedVideosFromCloudflare(db, null, 'ja', 24, null, offset === 0, offset, null,
            { sessionSeed: 1111, includePage: true });
        ids.push(...page.videos.map(v => v.videoId));
        assert.equal(page.hasMore, offset + page.videos.length < 200);
    }
    assert.equal(ids.length, 200);
    assert.equal(new Set(ids).size, 200);
    const first50 = await getRecommendedVideosFromCloudflare(db, null, 'ja', 50, null, false, 0, null, { sessionSeed: 1111 });
    assert.deepEqual(ids.slice(0, 50), first50.map(v => v.videoId));
    const beyond = await getRecommendedVideosFromCloudflare(db, null, 'ja', 24, null, false, 200, null,
        { sessionSeed: 1111, includePage: true });
    assert.deepEqual(beyond, { videos: [], hasMore: false });
    t.diagnostic(JSON.stringify({ fixture: '400 videos / 200 candidate window', returned: ids.length,
        unique: new Set(ids).size, duplicates: ids.length - new Set(ids).size,
        databaseQueries: db.calls, elapsedMs: Math.round((performance.now() - start) * 100) / 100 }));
});

test('older matching levels, string/object metadata, categories and escaped search remain eligible', options, async t => {
    const rows = catalog();
    rows.forEach((row, i) => { row.levels = JSON.stringify({ ja: i < 200 ? 'N1' : (i % 2 ? { level: 'N5' } : { tier: 'BEGINNER' }) }); });
    rows[200].title = '100% Japanese_ lesson';
    const db = database(t, rows);
    const beginner = await getRecommendedVideosFromCloudflare(db, null, 'ja', 24, 'beginner', false, 0, null, { sessionSeed: 1 });
    assert.equal(beginner.length, 24);
    assert.ok(beginner.every(v => v.tier === 'beginner' && Number(v.videoId.slice(6)) >= 200));
    const exact = await getRecommendedVideosFromCloudflare(db, null, 'ja', 24, 'beginner', false, 0, '100% Japanese_', { category: 'education' });
    assert.equal(exact.length, 1);
    const wrongCategory = await getRecommendedVideosFromCloudflare(db, null, 'ja', 24, null, false, 0, null, { category: 'music' });
    assert.deepEqual(wrongCategory, []);
});

test('bounded concurrent R2 verification preserves ordering and skips malformed metadata', options, async t => {
    const rows = catalog(10);
    rows.forEach(row => { row.sub_languages = '[]'; });
    rows[0].levels = '{broken';
    const db = database(t, rows);
    let probes = 0;
    const r2 = { async head(key) { probes++; await new Promise(resolve => setTimeout(resolve, key.includes('0001') ? 3 : 0)); return {}; } };
    const first = await getRecommendedVideosFromCloudflare(db, r2, 'ja', 50, null, false, 0, null, { sessionSeed: 42 });
    assert.equal(probes, 10);
    assert.equal(first.length, 10);
    const second = await getRecommendedVideosFromCloudflare(db, r2, 'ja', 50, null, false, 0, null, { sessionSeed: 42 });
    assert.deepEqual(first, second);
    await assert.rejects(getRecommendedVideosFromCloudflare(db, { async head() { throw Error('outage'); } }, 'ja'), /verification unavailable/);
    const incomplete = database(t, catalog(11).map(row => ({...row,sub_languages:'[]'})));
    await assert.rejects(getRecommendedVideosFromCloudflare(incomplete,r2,'ja'), /verification budget exceeded/);
});

test('favorites-only and tier-only contexts bypass generic memory cache', options, async t => {
    const db = database(t, catalog(10));
    const url = 'https://example.test/api/recommended-videos?lang=ja&seed=7654';
    const env = { VOCAB_DB: db };
    const generic = await onRequestGet({ request: new Request(url), env });
    assert.equal(generic.status, 200);
    for (const context of [{ favorites: ['video_0001'] }, { dominantTier: 'beginner' }]) {
        const response = await onRequestPost({ request: new Request(url, { method: 'POST', body: JSON.stringify({ context }) }), env });
        assert.equal(response.headers.get('X-Cache'), 'BYPASS-PERSONALIZED');
        assert.equal((await response.json()).source, 'cloudflare:personalized');
    }
});

test('API rejects malformed/oversized input and reports database failures as 503', async () => {
    for (const [body, status] of [['{', 400], [JSON.stringify({ lang: [] }), 400], [JSON.stringify({ q: 'x'.repeat(70000) }), 413]]) {
        const response = await onRequestPost({ request: new Request('https://example.test/api/recommended-videos', { method: 'POST', body }), env: {} });
        assert.equal(response.status, status);
    }
    const response = await onRequestGet({ request: new Request('https://example.test/api/recommended-videos?seed=987654'),
        env: { VOCAB_DB: { prepare() { throw Error('database offline'); } } } });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).success, false);
});

test('context collections are bounded and progress rejects nonfinite/non-numeric values', () => {
    const context = normalizeRecommendationContext({ watched: Array.from({ length: 500 }, (_, i) => `v${i}`),
        inProgress: { valid: 120, bad: '50', infinite: Infinity, negative: -10 },
        topChannels: Array.from({ length: 20 }, (_, i) => `c${i}`), vocabWords: ['猫', 'cat', 'cat'] });
    assert.equal(context.watched.length, 200);
    assert.equal(context.topChannels.length, 10);
    assert.deepEqual(context.inProgress, { valid: 100 });
    assert.deepEqual(context.vocabWords, ['猫', 'cat']);
});

test('multilingual matching respects word boundaries and known difficulty', () => {
    const titles = ['concatenate', 'A cat learns', '猫の生活', '中文学习', '한국어 공부'];
    const candidates = titles.map((title, i) => ({ videoId: `v${i}`, title, channel: `c${i}`, duration: 300, tier: 'intermediate' }));
    const ranked = rankVideos(candidates, { context: { vocabWords: ['cat', '猫', '中文', '한국어', 'CAT'] } });
    assert.equal(ranked.find(v => v.videoId === 'v0').matchedWords, undefined);
    assert.deepEqual(ranked.find(v => v.videoId === 'v1').matchedWords, ['cat']);
    assert.ok(ranked.filter(v => v.matchedWords).length === 4);
    const levels = ['advanced', 'beginner', 'elementary'].map((tier, i) => ({ videoId: `l${i}`, channel: `c${i}`, tier }));
    assert.deepEqual(rankVideos(levels, { context: { dominantTier: 'beginner' } }).map(v => v.tier), ['beginner', 'elementary', 'advanced']);
});

test('spacing checks every emitted creator and retains within-creator order', () => {
    const candidates = ['A', 'A', 'B', 'B', 'B', 'C', 'C'].map((channel, i) => ({ channel, videoId: String(i) }));
    const result = declusterChannels(candidates);
    for (let i = 1; i < result.length; i++) {
        if (result[i].channel === result[i - 1].channel) assert.ok(result.slice(i).every(v => v.channel === result[i].channel));
    }
    for (const channel of ['A', 'B', 'C']) assert.deepEqual(result.filter(v => v.channel === channel), candidates.filter(v => v.channel === channel));
});

test('scan safety limit reports incomplete discovery instead of a false empty feed', options, async t => {
    const rows = catalog(4001).map(row => ({ ...row, levels: '{"ja":"N1"}' }));
    const db = database(t, rows);
    await assert.rejects(getRecommendedVideosFromCloudflare(db, null, 'ja', 24, 'beginner'), /scan budget exceeded/);
    assert.equal(db.calls, 20);
});
