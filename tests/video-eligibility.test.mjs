import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fixture } from './fixtures/transcription-db.mjs';
import { onRequestPost as transcript } from '../functions-src/api/transcript.js';
import { onRequestGet as videoInfo } from '../functions-src/api/video-info.js';
import { onRequest as tokenize } from '../functions-src/api/tokenize-batch/[lang].js';
import { refreshCatalogVideoAvailability } from '../functions-src/services/video-metadata.service.js';
import { TranscriptService } from '../functions-src/services/transcript.service.js';
import { activateAiJob, reserveAiJob } from '../functions-src/data/transcript-db.js';
import { captureVideoAssets, reconcileRetiredVideoAssets } from '../functions-src/data/video-assets.js';
import { getRecommendedVideosFromCloudflare, markVideoEmbedBlocked } from '../functions-src/data/video-info-db.js';

const videoId = 'eligible001';
const week = 7 * 24 * 60 * 60 * 1000;

async function setup(t) {
    const { db, sqlite } = await fixture(t);
    for (const migration of ['20261112_video_grading_jobs.sql', '20261124_video_asset_lifecycle.sql']) {
        sqlite.exec(await readFile(new URL(`../db/migrations/d1/${migration}`, import.meta.url), 'utf8'));
    }
    const env = { VOCAB_DB: db, VIDEO_ELIGIBILITY: 'true', YOUTUBE_DATA_API_KEY: 'test', SUPADATA_API_KEY: 'test' };
    return { env, db, sqlite };
}

function official(embeddable = true, duration = 'PT4H') {
    return {
        id: videoId,
        status: { embeddable, privacyStatus: 'public' },
        snippet: {
            title: 'Caption fixture', channelTitle: 'Example', channelId: 'UC' + 'a'.repeat(22),
            categoryId: '22', liveBroadcastContent: 'none'
        },
        contentDetails: { duration }
    };
}

function request(route, body) {
    return new Request(`https://voca.study/api/${route}`, {
        method: body ? 'POST' : 'GET',
        headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.124' },
        ...(body ? { body: JSON.stringify(body) } : {})
    });
}

test('first-seen blocked video reaches neither transcript processing nor video storage', async t => {
    const { env, sqlite } = await setup(t);
    t.mock.method(globalThis, 'fetch', async url => {
        assert.equal(new URL(url).hostname, 'www.googleapis.com');
        return Response.json({ items: [official(false)] });
    });
    const results = await Promise.all([
        transcript({ env, request: request('transcript', { videoId, lang: 'en' }) }),
        videoInfo({ env, request: request(`video-info?videoId=${videoId}`) }),
        tokenize({ env, request: request('tokenize-batch/en', { videoId, texts: ['Example'] }), params: { lang: 'en' } }),
    ]);
    for (const response of results) {
        assert.equal(response.status, 422);
        assert.equal((await response.json()).errorCode, 'VIDEO_EMBED_BLOCKED');
    }
    assert.equal(sqlite.prepare('SELECT count(*) n FROM verified_video_metadata').get().n, 0);
    assert.equal(sqlite.prepare('SELECT count(*) n FROM video_languages').get().n, 0);
});

test('native captions allow a verified video over three hours', async t => {
    const { env, sqlite } = await setup(t);
    const tasks = [];
    const objects = new Map();
    env.TRANSCRIPT_STORAGE = {
        get: async key => objects.get(key) ?? null,
        head: async key => objects.get(key) ?? null,
        put: async (key, data) => {
            const object = { json: async () => JSON.parse(data) };
            objects.set(key, object);
            return object;
        }
    };
    let nativeCalls = 0;
    t.mock.method(globalThis, 'fetch', async url => {
        const parsed = new URL(url);
        if (parsed.hostname === 'www.googleapis.com') return Response.json({ items: [official()] });
        assert.equal(parsed.hostname, 'api.supadata.ai');
        assert.equal(parsed.searchParams.get('mode'), 'native');
        nativeCalls++;
        return Response.json({ lang: 'en', content: [{ text: 'An example.', offset: 0, duration: 1300 }] });
    });
    const response = await transcript({ env, waitUntil: task => tasks.push(task),
        request: request('transcript', { videoId, lang: 'en', duration: 14400 }) });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).source, 'native');
    await Promise.all(tasks);
    assert.equal(nativeCalls, 1);
    assert.ok(objects.has(`transcripts/${videoId}/en.json`));
    assert.equal(sqlite.prepare('SELECT duration_seconds FROM video_languages WHERE video_id=?').get(videoId).duration_seconds, 14400);
});

test('inconclusive playback and over-length AI quotes create no video records', async t => {
    const { env, sqlite } = await setup(t);
    let outage = true;
    t.mock.method(globalThis, 'fetch', async url => {
        assert.equal(new URL(url).hostname, 'www.googleapis.com');
        if (outage) throw new TypeError('Temporary connection failure');
        return Response.json({ items: [official()] });
    });
    const missing = await transcript({ env, request: request('transcript', { videoId, lang: 'en' }) });
    assert.equal(missing.status, 503);
    assert.ok(missing.headers.get('Retry-After'));
    outage = false;
    const quote = await transcript({ env, request: request('transcript', { videoId, lang: 'en', preferAI: true, quoteOnly: true }) });
    assert.equal(quote.status, 200);
    assert.equal((await quote.json()).reason, 'VIDEO_TOO_LONG');
    assert.equal(sqlite.prepare('SELECT count(*) n FROM verified_video_metadata').get().n, 0);
    assert.equal(sqlite.prepare('SELECT count(*) n FROM ai_transcription_jobs').get().n, 0);
});

test('an eligible quote and subsequent polls reuse one YouTube lookup', async t => {
    const { env } = await setup(t);
    env.YOUTUBE_METADATA_DAILY_BUDGET = '2';
    const youtube = t.mock.method(globalThis, 'fetch', async () => Response.json({ items: [official(true, 'PT3M')] }));
    const quote = { videoId, lang: 'en', preferAI: true, quoteOnly: true };
    for (const body of [quote, quote, { videoId, lang: 'en', jobId: 'expired' }]) {
        const response = await transcript({ env, request: request('transcript', body) });
        assert.notEqual(response.status, 503);
        if (body === quote) assert.equal((await response.json()).canGenerate, true);
    }
    assert.equal(youtube.mock.callCount(), 1);
});

test('poll recovery publishes to the active generation and later polls can read it', async t => {
    const { env, db, sqlite } = await setup(t);
    sqlite.prepare("INSERT INTO video_languages(video_id,available_languages,asset_generation) VALUES(?,'[]',1)").run(videoId);
    const { job } = await reserveAiJob(db, { videoId, language: 'en', clientId: 'fixture', assetGeneration: 1 });
    await activateAiJob(db, job.id, 'fixture-provider');
    sqlite.prepare("UPDATE ai_transcription_jobs SET charge_status='confirmed', created_at=unixepoch()-60, next_provider_check_at=0 WHERE id=?").run(job.id);
    const files = new Map();
    env.GLADIA_API_KEY = 'test';
    env.TRANSCRIPT_STORAGE = {
        get: async key => files.get(key) ?? null,
        head: async key => files.get(key) ?? null,
        put: async (key, data, options) => {
            const object = { json: async () => JSON.parse(data), customMetadata: options.customMetadata };
            files.set(key, object);
            return object;
        }
    };
    const service = new TranscriptService(null, { checkJobStatusById: async () => ({
        status: 'done', result: { transcription: { languages: ['en'], sentences: [{ sentence: 'Hello world.', start: 0, end: 2 }] } }
    }) });
    const { bucket: r2 } = await captureVideoAssets(env, videoId);
    const params = { videoId, jobId: job.id, availableLanguages: {} };
    assert.equal((await service.pollAiJobStatus({ env, r2 }, params)).status, 'done');
    assert.deepEqual([...files.keys()], [`transcripts/${videoId}/g1/en.ai.json`]);
    assert.equal((await service.pollAiJobStatus({ env, r2 }, params)).status, 'done');
});

test('recommendations for a restored video require captions from the active generation', async t => {
    const { db, sqlite } = await setup(t);
    sqlite.prepare(`INSERT INTO video_languages(video_id,title,channel,available_languages,sub_languages,ai_languages)
        VALUES(?,'Example video','Example channel','["en"]','["en"]','["en"]')`).run(videoId);
    await markVideoEmbedBlocked(db, videoId, true, 'embed_disabled');
    await markVideoEmbedBlocked(db, videoId, false);
    const row = sqlite.prepare('SELECT sub_languages,ai_languages FROM video_languages WHERE video_id=?').get(videoId);
    assert.equal(row.sub_languages, '[]');
    assert.equal(row.ai_languages, '[]');
    const files = new Set([`transcripts/${videoId}/en.json`]);
    const r2 = { head: async key => files.has(key) ? {} : null };
    const recommend = () => getRecommendedVideosFromCloudflare(db, r2, 'en', 10, null, false, 0, null,
        { isRefresh: true, useAssetGenerations: true });
    assert.deepEqual(await recommend(), []);
    files.add(`transcripts/${videoId}/g1/en.json`);
    assert.deepEqual((await recommend()).map(video => video.videoId), [videoId]);
});

test('delisted videos are reverified before a scoped, retryable purge', async t => {
    const { env, db, sqlite } = await setup(t);
    sqlite.prepare("INSERT INTO video_languages(video_id,title,available_languages,sub_languages) VALUES(?,'An example','[]','[\"en\"]')").run(videoId);
    const files = new Set([`transcripts/${videoId}/en.json`, `translations/${videoId}/en-ja.json`]);
    let deletionFailed = false;
    env.TRANSCRIPT_STORAGE = {
        put: async key => files.add(key),
        list: async ({ prefix, delimiter }) => ({ objects: [...files]
            .filter(key => key.startsWith(prefix) && !key.slice(prefix.length).includes(delimiter))
            .map(key => ({ key })), truncated: false }),
        delete: async keys => {
            if (keys.some(key => key.startsWith('translations/')) && !deletionFailed) {
                deletionFailed = true;
                throw new Error('Temporary storage failure');
            }
            for (const key of keys) files.delete(key);
        }
    };

    const previous = await captureVideoAssets(env, videoId);
    await markVideoEmbedBlocked(db, videoId, true, 'embed_disabled');
    const retired = await captureVideoAssets(env, videoId);
    assert.equal(retired.generation, previous.generation + 1);
    assert.equal(retired.blocked, true);
    sqlite.prepare('UPDATE video_asset_retirements SET blocked_at=?').run(Date.now() - week - 1000);
    sqlite.prepare('UPDATE video_languages SET region_checked_at=?').run(Date.now() - week - 1000);
    t.mock.method(globalThis, 'fetch', async () => Response.json({ items: [official(false)] }));
    assert.equal(await refreshCatalogVideoAvailability(env), 1);
    assert.deepEqual(await reconcileRetiredVideoAssets(env), { candidates: 1, purged: 0 });
    assert.equal(files.size, 2);
    await retired.bucket.put(`transcripts/${videoId}/en.json`, '');
    env.VIDEO_ASSET_PURGE = 'enabled';
    await assert.rejects(reconcileRetiredVideoAssets(env), /Temporary storage failure/);
    assert.deepEqual(await reconcileRetiredVideoAssets(env), { candidates: 1, purged: 1 });
    assert.deepEqual([...files], [`transcripts/${videoId}/g1/en.json`]);
});
