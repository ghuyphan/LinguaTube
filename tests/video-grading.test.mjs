import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fixture } from './fixtures/transcription-db.mjs';
import { scoreVideoTranscript } from '../functions-src/utils/video-grader.js';
import { enqueueVideoGrade, transcriptRevision } from '../functions-src/services/video-grading-jobs.js';
import { runVideoGrade } from '../functions-src/services/video-grading.js';
import { onRequestGet as status } from '../functions-src/api/video-level.js';
import { onRequest as heal } from '../functions-src/api/heal-levels.js';
import { onRequestPost as transcript } from '../functions-src/api/transcript.js';
import { onRequestGet as recommendations } from '../functions-src/api/recommended-videos.js';

const videoId = 'dQw4w9WgXcQ';
const cues = [{ start: 0, duration: 3, text: 'I had been reading.' }];
const replacement = [{ start: 0, duration: 3, text: 'You are singing.' }];
const parity = JSON.parse(await readFile(new URL('./fixtures/video-grading-parity.json', import.meta.url)));
for (const { language, text, tokens, breakdown, score, level } of parity) {
    test('Flutter grading parity for ' + language, () => {
        const grade = scoreVideoTranscript([{ text, tokens, duration: 3 }], language);
        assert.deepEqual(grade.breakdown, breakdown);
        assert.equal(grade.score, score);
        assert.equal(grade.level, level);
        assert.equal(grade.speechRateUnit, language === 'en' ? 'wpm' : 'cpm');
    });
}

async function catalog(t) {
    const { db, sqlite } = await fixture(t);
    const snapshots = { segments: cues, timestamp: 1000, reads: 0 };
    const env = { VOCAB_DB: db, SERVER_VIDEO_GRADING: '1', HEAL_ADMIN_SECRET: 'fixture-admin',
        TRANSCRIPT_CACHE: { get: async () => null, put: async () => {} },
        TRANSCRIPT_STORAGE: { async get(key) {
            if (key !== 'transcripts/' + videoId + '/en.json') return null;
            snapshots.reads++;
            return { json: async () => ({ language: 'en', segments: snapshots.segments, timestamp: snapshots.timestamp }) };
        } } };
    const job = () => sqlite.prepare('SELECT * FROM video_grading_jobs WHERE video_id=?').get(videoId);
    const grades = () => JSON.parse(sqlite.prepare('SELECT levels FROM video_languages WHERE video_id=?').get(videoId)?.levels || '{}');
    const getStatus = async () => (await status({
        request: new Request('https://example.test/api/video-level?videoId=' + videoId + '&language=en'),
        env, waitUntil() {},
    })).json();
    return { env, snapshots, job, grades, sqlite, getStatus };
}

test('duplicate jobs share a lease, survive an expired claim, and publish one confirmed grade', async t => {
    const { env, job, grades, sqlite, getStatus } = await catalog(t);
    await Promise.all([enqueueVideoGrade(env, videoId, 'en'), enqueueVideoGrade(env, videoId, 'en')]);
    assert.equal((await getStatus()).gradingStatus, 'pending');
    sqlite.prepare("UPDATE video_grading_jobs SET lease='abandoned', lease_until=0").run();
    const claims = await Promise.all([runVideoGrade(env), runVideoGrade(env)]);
    assert.equal(claims.filter(Boolean).length, 1);
    assert.equal(job().attempts, 1);
    assert.equal(job().state, 'ready');
    assert.equal(grades().en.graderVersion, 1);
    assert.equal(grades().en.transcriptRevision, await transcriptRevision(cues));
    assert.equal(await transcriptRevision(cues.map(c => ({ ...c, tokens: [{ surface: 'I' }] }))), job().revision);
    assert.equal((await getStatus()).level, grades().en.level);
    assert.equal(await enqueueVideoGrade(env, videoId, 'en'), false);
});

test('caption replacement during grading queues the new revision without publishing the old one', async t => {
    const { env, job, grades, snapshots } = await catalog(t);
    await enqueueVideoGrade(env, videoId, 'en');
    const get = env.TRANSCRIPT_STORAGE.get;
    env.TRANSCRIPT_STORAGE.get = async key => {
        if (snapshots.reads === 2) {
            snapshots.segments = replacement;
            snapshots.timestamp++;
        }
        return get(key);
    };
    assert.equal(await runVideoGrade(env), true);
    assert.equal(grades().en, undefined);
    assert.equal(job().state, 'pending');
    assert.equal(job().revision, await transcriptRevision(replacement));
    await runVideoGrade(env);
    assert.equal(grades().en.transcriptRevision, job().revision);
});

test('backfill is read-only by default and protected grades stay intact', async t => {
    const { env, job, sqlite, grades } = await catalog(t);
    sqlite.prepare('INSERT INTO video_languages (video_id,available_languages,levels) VALUES (?,?,?)')
        .run(videoId, '["en"]', JSON.stringify({ en: { level: 'CEFR C2', confidence: 0.95, method: 'manual' } }));
    const result = await heal({
        request: new Request('https://example.test/api/heal-levels', {
            method: 'POST', headers: { 'x-admin-secret': 'fixture-admin' }, body: JSON.stringify({ videoId })
        }), env
    });
    assert.equal(result.status, 200);
    assert.equal((await result.json()).entries[0].status, 'protected');
    assert.equal(job(), undefined);
    assert.equal(await enqueueVideoGrade(env, videoId, 'en', { regrade: true }), false);
    assert.equal(grades().en.level, 'CEFR C2');
});

test('large shifts require review and rollback restores only the exact published grade', async t => {
    const { env, job, sqlite, grades } = await catalog(t);
    const previous = { level: 'CEFR C2', confidence: 0.8, method: 'server_heuristic' };
    sqlite.prepare('INSERT INTO video_languages (video_id,available_languages,levels) VALUES (?,?,?)')
        .run(videoId, '["en"]', JSON.stringify({ en: previous, ja: 'JLPT N2' }));
    await enqueueVideoGrade(env, videoId, 'en', { regrade: true });
    await runVideoGrade(env);
    assert.equal(job().state, 'review');
    assert.deepEqual(grades().en, previous);
    await enqueueVideoGrade(env, videoId, 'en', { regrade: true, approveRevision: job().revision });
    await runVideoGrade(env);
    assert.equal(job().state, 'ready');
    assert.notEqual(grades().en.level, previous.level);
    const rollback = await heal({
        request: new Request('https://example.test/api/heal-levels?action=rollback', {
            method: 'POST', headers: { 'x-admin-secret': 'fixture-admin' },
            body: JSON.stringify({ videoId, language: 'en', dryRun: false, revision: job().revision })
        }), env
    });
    assert.equal((await rollback.json()).restored, true);
    assert.deepEqual(grades().en, previous);
    assert.equal(grades().ja, 'JLPT N2');

    // A version rollback can run while grading is paused and only changes exact publications.
    const result = JSON.parse(job().result);
    sqlite.prepare('UPDATE video_languages SET levels=? WHERE video_id=?')
        .run(JSON.stringify({ en: result, ja: 'JLPT N2' }), videoId);
    env.SERVER_VIDEO_GRADING = 'paused';
    const rollbackVersion = async () => (await heal({
        request: new Request('https://example.test/api/heal-levels?action=rollback', {
            method: 'POST', headers: { 'x-admin-secret': 'fixture-admin' },
            body: JSON.stringify({ graderVersion: 1, dryRun: false })
        }), env
    })).json();
    assert.equal((await rollbackVersion()).restored, 1);
    const newer = { ...result, graderVersion: 2 };
    sqlite.prepare('UPDATE video_languages SET levels=? WHERE video_id=?')
        .run(JSON.stringify({ en: newer, ja: 'JLPT N2' }), videoId);
    assert.equal((await rollbackVersion()).restored, 0);
    assert.deepEqual(grades().en, newer);
});

test('a cached transcript recovers a missing job and the feed uses the published result', async t => {
    const { env, job, sqlite, grades, getStatus, snapshots } = await catalog(t);
    snapshots.segments = [{ ...cues[0], duration: 30 }];
    sqlite.prepare('INSERT INTO video_languages (video_id,available_languages,sub_languages,title,channel) VALUES (?,?,?,?,?)')
        .run(videoId, '["en"]', '["en"]', 'Listening lesson', 'Fixture channel');
    const tasks = [];
    const captions = await transcript({
        request: new Request('https://example.test/api/transcript', {
            method: 'POST', body: JSON.stringify({ videoId, lang: 'en' })
        }), env, waitUntil(promise) { tasks.push(promise); },
    });
    assert.equal(captions.status, 200);
    assert.equal((await captions.json()).gradingStatus, 'pending');
    await Promise.allSettled(tasks);
    assert.equal(job().state, 'ready');
    const feed = await recommendations({
        request: new Request('https://example.test/api/recommended-videos?lang=en'), env
    });
    assert.equal(feed.status, 200);
    assert.equal((await feed.json()).videos[0].level, grades().en.level);
    assert.equal((await getStatus()).level, grades().en.level);
});

test('storage failures retry without clearing a grade and pause prevents new work', async t => {
    const { env, job, snapshots, sqlite, grades, getStatus } = await catalog(t);
    await enqueueVideoGrade(env, videoId, 'en');
    const original = snapshots.segments;
    snapshots.segments = [];
    await runVideoGrade(env);
    assert.equal(job().state, 'pending');
    assert.equal(job().error_code, 'caption_unavailable');
    assert.equal(grades().en, undefined);
    env.SERVER_VIDEO_GRADING = 'paused';
    assert.equal((await getStatus()).gradingStatus, 'unavailable');
    snapshots.segments = original;
    assert.equal(await enqueueVideoGrade(env, videoId, 'en'), false);
    env.SERVER_VIDEO_GRADING = '1';
    sqlite.prepare('UPDATE video_grading_jobs SET due_at=0').run();
    await runVideoGrade(env);
    assert.equal(job().state, 'ready');
    assert.equal(job().attempts, 2);
});
