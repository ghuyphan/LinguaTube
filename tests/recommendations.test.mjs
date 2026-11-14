import test from 'node:test';
import assert from 'node:assert/strict';
import { performance } from 'node:perf_hooks';
import { getRecommendedVideosFromCloudflare } from '../functions-src/data/video-info-db.js';
import { rankVideos, declusterChannels, normalizeRecommendationContext, getDeterministicJitter } from '../functions-src/services/recommendation.service.js';
import { detectVideoCategory } from '../functions-src/services/category.service.js';
import { inferSpokenLanguage } from '../functions-src/services/video-language.service.js';
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
        async all() {
            if (!sql.includes('SELECT video_id, levels')) calls++;
            return { results: sqlite.prepare(sql).all(...args), success: true };
        }
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
        assert.equal(response.headers.get('X-Candidate-Cache'), 'HIT');
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

test('rankVideos with search query prioritizes exact title match and disables serendipity jitter', () => {
    const candidates = [
        { videoId: 'v1', title: 'Japanese News Today', channel: 'DocuChannel', duration: 300 },
        { videoId: 'v2', title: 'Documentary on Tokyo', channel: 'NHK', duration: 300 },
        { videoId: 'v3', title: 'Documentary', channel: 'BBC', duration: 300 },
        { videoId: 'v4', title: 'Random Cooking Show', channel: 'Chef', duration: 300 },
    ];
    const ranked = rankVideos(candidates, { query: 'Documentary', sessionSeed: 99999 });
    assert.equal(ranked[0].videoId, 'v3');
    assert.equal(ranked[1].videoId, 'v2');
    assert.equal(ranked[2].videoId, 'v1');
    assert.equal(ranked[3].videoId, 'v4');
});

test('search mode does not fail on sparse candidate sets under 200 items', options, async t => {
    const rows = catalog(4001).map((row, i) => ({
        ...row,
        title: i < 5 ? `Documentary Episode ${i}` : 'Unrelated Video',
        levels: '{"ja":"N5"}'
    }));
    const db = database(t, rows);
    const result = await getRecommendedVideosFromCloudflare(db, null, 'ja', 24, null, false, 0, 'Documentary');
    assert.ok(result.length >= 5);
    assert.ok(result.every(v => v.title.includes('Documentary')));
});


test('creator diversity never promotes completed or much lower scoring videos', () => {
    const fresh = ['a1', 'a2', 'a3'].map(videoId => ({videoId, channel: 'A', title: 'Lesson', duration: 300}));
    const completed = {videoId: 'done', channel: 'B', title: 'Lesson', duration: 300};
    const ranked = rankVideos([...fresh, completed], {context: {watched: ['done']}});
    assert.deepEqual(ranked.map(v => v.videoId), ['a1', 'a2', 'a3', 'done']);
    assert.equal(ranked.at(-1).isCompleted, true);
    const spaced = rankVideos([...fresh, {...completed, videoId: 'low', duration: 30}]);
    assert.equal(spaced.at(-1).videoId, 'low');
});

test('learner safety wins over creator and vocabulary bonuses on browse feeds', () => {
    const ranked = rankVideos([
        {videoId: 'hard', channel: 'Favorite', title: '猫', tier: 'advanced', duration: 300},
        {videoId: 'fit', channel: 'Other', title: 'Lesson', tier: 'beginner', duration: 300},
    ], {context: {dominantTier: 'beginner', topChannels: ['Favorite'], vocabWords: ['猫']}});
    assert.deepEqual(ranked.map(v => v.videoId), ['fit', 'hard']);
    assert.equal(ranked[1].difficultyGap, 4);
    assert.ok(ranked.every(v => Number.isFinite(v.recommendationScore)));
});

test('search retains exact-match relevance even for completed or difficult videos', () => {
    const ranked = rankVideos([
        {videoId: 'exact', title: 'Japanese cooking lesson tips', tier: 'advanced', channel: 'A'},
        {videoId: 'other', title: 'Other', tier: 'beginner', channel: 'Japanese cooking lesson tips'},
    ], {query: 'Japanese cooking lesson tips', context: {watched: ['exact'], dominantTier: 'beginner'}});
    assert.equal(ranked[0].videoId, 'exact');
});


test('public candidate cache reuses discovery across personalized pages without sharing learner results', options, async t => {
    const db = database(t, catalog());
    const first = await getRecommendedVideosFromCloudflare(db, null, 'ja', 24, null, false, 0, null,
        {sessionSeed: 123, context: {watched: ['video_0000']}});
    first[0].languages.push('private');
    first[0].title = 'mutated';
    for (let offset = 24; offset < 120; offset += 24) {
        await getRecommendedVideosFromCloudflare(db, null, 'ja', 24, null, false, offset, null,
            {sessionSeed: 123, context: {watched: ['video_0000']}});
    }
    assert.equal(db.calls, 1);
    const secondUser = await getRecommendedVideosFromCloudflare(db, null, 'ja', 50, null, false, 0, null,
        {sessionSeed: 456, context: {favorites: ['video_0000']}});
    assert.equal(db.calls, 1);
    assert.equal(secondUser.find(v => v.videoId === 'video_0000').isCompleted, false);
    assert.ok(secondUser.every(v => !v.languages.includes('private') && v.title !== 'mutated'));
});

test('candidate cache honors expiry, refresh, filters and storage binding ownership', options, async t => {
    let now = Date.now();
    t.mock.method(Date, 'now', () => now);
    const db = database(t, catalog());
    const get = (r2 = null, opts = {}, tier = null, category = null) =>
        getRecommendedVideosFromCloudflare(db, r2, 'ja', 24, tier, false, 0, null, {...opts, category});
    await get();
    await get();
    assert.equal(db.calls, 1);
    now += 15001;
    await get();
    assert.equal(db.calls, 2);
    await get(null, {isRefresh: true});
    assert.equal(db.calls, 3);
    await get({}, {});
    assert.equal(db.calls, 4);
    await get(null, {}, 'intermediate');
    assert.equal(db.calls, 5);
    await get(null, {}, null, 'education');
    assert.equal(db.calls, 6);
    const other = database(t, catalog());
    await getRecommendedVideosFromCloudflare(other, null, 'ja');
    assert.equal(other.calls, 1);
});

test('search candidates bypass shared cache and failed discovery is retried', options, async t => {
    const backing = database(t, catalog());
    let offline = true;
    const db = {prepare(sql) { if (offline) throw Error('offline'); return backing.prepare(sql); }};
    await assert.rejects(getRecommendedVideosFromCloudflare(db, null, 'ja'), /offline/);
    offline = false;
    await getRecommendedVideosFromCloudflare(db, null, 'ja');
    assert.equal(backing.calls, 1);
    for (let i = 0; i < 2; i++) await getRecommendedVideosFromCloudflare(db, null, 'ja', 24, null, false, 0, 'Japanese');
    assert.equal(backing.calls, 3);
});

test('candidate cache retains at most twenty filter keys per database binding', options, async t => {
    const db = database(t, catalog(1));
    for (let i = 0; i < 21; i++) await getRecommendedVideosFromCloudflare(db, null, 'ja', 12, null, false, 0, null, {category: `category_${i}`});
    assert.equal(db.calls, 21);
    await getRecommendedVideosFromCloudflare(db, null, 'ja', 12, null, false, 0, null, {category: 'category_0'});
    assert.equal(db.calls, 22);
});

test('full 5-tier Krashen curve favors i-1 review over i-3 basics and guards beginner feeds from ungraded videos', () => {
    const candidates = [
        { videoId: 'easy', channel: 'A', title: 'ABC Alphabet', tier: 'beginner', duration: 300 },
        { videoId: 'review', channel: 'B', title: 'Grammar Review', tier: 'intermediate', duration: 300 },
        { videoId: 'stretch', channel: 'C', title: 'Advanced News', tier: 'advanced', duration: 300 },
        { videoId: 'fit', channel: 'D', title: 'Upper Intermediate Talk', tier: 'upper_intermediate', duration: 300 },
    ];
    const rankedUpper = rankVideos(candidates, { context: { dominantTier: 'upper_intermediate' } });
    assert.deepEqual(rankedUpper.map(v => v.videoId), ['fit', 'stretch', 'review', 'easy']);

    const beginnerFeed = rankVideos([
        { videoId: 'ungraded', channel: 'A', title: 'Misc Video', duration: 300 },
        { videoId: 'verified', channel: 'B', title: 'N5 Lesson', tier: 'beginner', duration: 300 },
    ], { context: { dominantTier: 'beginner' } });
    assert.deepEqual(beginnerFeed.map(v => v.videoId), ['verified', 'ungraded']);
});

test('2-slot channel anti-clustering prevents two creators from alternating exclusively', () => {
    const candidates = ['A', 'A', 'B', 'B', 'C', 'C'].map((channel, i) => ({
        channel,
        videoId: `v${i}`,
        recommendationScore: 50 - i * 0.5
    }));
    const result = declusterChannels(candidates);
    assert.deepEqual(result.map(v => v.channel), ['A', 'B', 'C', 'A', 'B', 'C']);
});

test('vocabulary notebook overlap and search scoring inspect creator tags as well as titles', () => {
    const candidates = [
        { videoId: 'plain', channel: 'Ch1', title: 'Daily Vlog #12', duration: 300 },
        { videoId: 'tagged', channel: 'Ch2', title: 'Morning Routine', tags: ['料理', 'cooking'], duration: 300 }
    ];
    const vocabRanked = rankVideos(candidates, { context: { vocabWords: ['料理'] } });
    assert.equal(vocabRanked[0].videoId, 'tagged');
    assert.deepEqual(vocabRanked[0].matchedWords, ['料理']);

    const searchRanked = rankVideos(candidates, { query: 'cooking' });
    assert.equal(searchRanked[0].videoId, 'tagged');
});

test('discoverRecommendationCandidates filters out videos whose spoken language differs from requested feed', options, async t => {
    const db = database(t, [
        {
            video_id: 'lemon_ja',
            title: '【女性が歌う】Lemon/米津玄師(Full Covered by コバソロ & 春茶)',
            channel: 'kobasolo',
            channel_avatar: null,
            duration_seconds: 256,
            levels: '{}',
            available_languages: '["ja","en","zh","ko"]',
            sub_languages: '["ja","en","zh","ko"]',
            category: 'music',
            updated_at: 2000
        },
        {
            video_id: 'gangnam_ko',
            title: 'PSY - GANGNAM STYLE(강남스타일) M/V',
            channel: 'officialpsy',
            channel_avatar: null,
            duration_seconds: 253,
            levels: '{}',
            available_languages: '["ko","ja","en","zh"]',
            sub_languages: '["ko","ja","en","zh"]',
            category: 'music',
            updated_at: 1990
        },
        {
            video_id: 'love_trial_en',
            title: 'Love Trial (English Cover) 恋愛裁判 | feat. Amanda Lee',
            channel: 'Amanda Lee',
            channel_avatar: null,
            duration_seconds: 225,
            levels: '{}',
            available_languages: '["en","ja","zh"]',
            sub_languages: '["en","ja","zh"]',
            category: 'music',
            updated_at: 1980
        },
        {
            video_id: 'cover_vi_ja',
            title: 'Đừng Làm Trái Tim Anh Đau - Sơn Tùng M-TP | Cover Tiếng Nhật | Japanese Ver',
            channel: 'Rin',
            channel_avatar: null,
            duration_seconds: 240,
            levels: '{}',
            available_languages: '["ja"]',
            sub_languages: '["ja"]',
            category: 'music',
            updated_at: 1970
        },
        {
            video_id: 'ted_en',
            title: 'The Power of Habit | TED Talk',
            channel: 'TED',
            channel_avatar: null,
            duration_seconds: 700,
            levels: '{}',
            available_languages: '["en","zh","ko"]',
            sub_languages: '["en","zh","ko"]',
            category: 'education',
            updated_at: 1960
        }
    ]);

    const jaFeed = await getRecommendedVideosFromCloudflare(db, null, 'ja', 20, null, false, 0, null);
    assert.deepEqual(jaFeed.map(v => v.videoId).sort(), ['cover_vi_ja', 'lemon_ja']);

    const koFeed = await getRecommendedVideosFromCloudflare(db, null, 'ko', 20, null, false, 0, null);
    assert.deepEqual(koFeed.map(v => v.videoId), ['gangnam_ko']);

    const enFeed = await getRecommendedVideosFromCloudflare(db, null, 'en', 20, null, false, 0, null);
    assert.deepEqual(enFeed.map(v => v.videoId).sort(), ['love_trial_en', 'ted_en']);

    const zhFeed = await getRecommendedVideosFromCloudflare(db, null, 'zh', 20, null, false, 0, null);
    assert.deepEqual(zhFeed, []);
});

test('inferSpokenLanguage prioritizes official audio language over translated titles', () => {
    assert.equal(inferSpokenLanguage({
        defaultAudioLanguage: 'en-US',
        title: '【日本語字幕】TED Talk Summary',
        subLanguages: ['ja', 'en']
    }), 'en');
    assert.equal(inferSpokenLanguage({
        defaultAudioLanguage: 'zh-Hans',
        title: 'Chinese Podcast EP10',
        subLanguages: ['zh', 'en']
    }), 'zh');
    assert.equal(inferSpokenLanguage({
        defaultAudioLanguage: 'vi',
        title: 'Nhạc Việt',
        subLanguages: ['vi', 'ja']
    }), 'other');
});

test('small numeric seeds and distinct string seeds disperse rankings instead of colliding', options, async () => {
    const candidates = Array.from({ length: 12 }, (_, i) => ({
        videoId: `vid_${i}`,
        channel: `Ch_${i}`,
        title: `Video ${i}`,
        category: i % 2 === 0 ? 'vlog' : 'education',
        duration: 300,
        updatedAt: 5000 - i
    }));

    const order = seed => rankVideos(globalThis.structuredClone(candidates), { sessionSeed: seed }).map(v => v.videoId);
    assert.notDeepEqual(order(1), order(2));
    assert.notDeepEqual(order(101), order(202));
    assert.notDeepEqual(order('alpha'), order('beta'));

    // Jitter spans across [-amp, +amp) even for adjacent seeds 1 and 2
    const diffs = candidates.map(c => Math.abs(getDeterministicJitter(c.videoId, 1, 12) - getDeterministicJitter(c.videoId, 2, 12)));
    assert.ok(diffs.some(d => d > 2), `Expected SplitMix32 jitter delta > 2 pts, got max ${Math.max(...diffs)}`);

    // HTTP endpoint preserves distinct non-numeric string seeds across requests
    const sqlite = new DatabaseSync(':memory:');
    sqlite.exec(`CREATE TABLE video_languages (video_id TEXT PRIMARY KEY, title TEXT, channel TEXT,
        channel_avatar TEXT, duration_seconds INTEGER, levels TEXT, available_languages TEXT,
        sub_languages TEXT, category TEXT, updated_at INTEGER)`);
    const insert = sqlite.prepare('INSERT INTO video_languages VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const c of candidates) {
        insert.run(c.videoId, `Japanese ${c.title}`, c.channel, null, 300, '{"ja":"N4"}', '["ja"]', '["ja"]', c.category, c.updatedAt);
    }
    const db = {
        prepare(sql) {
            return { bind(...args) { return { async all() { return { results: sqlite.prepare(sql).all(...args), success: true }; } }; } };
        }
    };
    const fetchOrder = async seed => {
        const res = await onRequestGet({
            request: new Request(`https://voca.study/api/recommended-videos?lang=ja&limit=12&seed=${encodeURIComponent(seed)}`),
            env: { VOCAB_DB: db }
        });
        assert.equal(res.status, 200);
        return (await res.json()).videos.map(v => v.videoId);
    };
    try {
        assert.notDeepEqual(await fetchOrder('alpha'), await fetchOrder('beta'));
        assert.notDeepEqual(await fetchOrder('1'), await fetchOrder('2'));
    } finally {
        sqlite.close();
    }
});

test('browse mode spaces dominant music videos while preserving category filter and learner priority', () => {
    const candidates = [
        ...Array.from({ length: 6 }, (_, i) => ({
            videoId: `m${i}`, channel: `MusicCh${i}`, title: `Song ${i}`, category: 'music', duration: 240, updatedAt: 9000 - i
        })),
        { videoId: 'v1', channel: 'VlogCh', title: 'Tokyo Vlog', category: 'vlog', duration: 600, updatedAt: 8500 },
        { videoId: 'c1', channel: 'ConvCh', title: 'Japanese Podcast', category: 'conversation', duration: 600, updatedAt: 8400 },
        { videoId: 'e1', channel: 'EduCh', title: 'Grammar Lesson', category: 'education', duration: 600, updatedAt: 8300 },
    ];

    const browse = rankVideos(globalThis.structuredClone(candidates), { language: 'ja' });
    // Consecutive music items are broken up by comparable non-music categories
    assert.equal(browse[0].category, 'music');
    assert.notEqual(browse[1].category, 'music');
    assert.notEqual(browse[3].category, 'music');
    assert.ok(browse.slice(0, 6).filter(v => v.category === 'music').length <= 3);

    // Explicit category=music keeps pure order without trying to space away music
    const musicOnly = rankVideos(
        globalThis.structuredClone(candidates.filter(c => c.category === 'music')),
        { language: 'ja', category: 'music' }
    );
    assert.equal(musicOnly.length, 6);

    // Completed videos stay strictly demoted behind uncompleted ones regardless of category
    const withCompleted = rankVideos([
        { videoId: 'm_done', channel: 'M1', title: 'Song Done', category: 'music', duration: 240, updatedAt: 9999 },
        { videoId: 'm_fresh', channel: 'M2', title: 'Song Fresh', category: 'music', duration: 240, updatedAt: 9000 },
        { videoId: 'v_fresh', channel: 'V1', title: 'Vlog Fresh', category: 'vlog', duration: 600, updatedAt: 8500 },
    ], { language: 'ja', context: { watched: ['m_done'] } });
    assert.equal(withCompleted.at(-1).videoId, 'm_done');
});

test('detectVideoCategory classifies music, anime_drama, conversation, and education accurately', () => {
    assert.equal(detectVideoCategory({ title: 'YOASOBI / THE FIRST TAKE', channel: 'THE FIRST TAKE' }), 'music');
    assert.equal(detectVideoCategory({ title: 'IVE M/V Official', channel: 'STARSHIP' }), 'music');
    assert.equal(detectVideoCategory({ title: '【Ref:rain】色づく世界の明日から【AMV/MAD】', channel: 'MARCO' }), 'anime_drama');
    assert.equal(detectVideoCategory({ title: 'Japanese Listening Practice #12', channel: 'Yuyu Podcast' }), 'conversation');
    assert.equal(detectVideoCategory({ title: 'JLPT N3 Complete Grammar Course', channel: 'Nihongo' }), 'education');
});
