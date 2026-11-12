import test from 'node:test';
import assert from 'node:assert/strict';
import { saveVideoLevel, saveVideoLanguages, scoreToLevelLabel, scoreToTier, labelToTier } from '../functions-src/data/video-info-db.js';
import { onRequestPost } from '../functions-src/api/video-level.js';
import { onRequestPost as transcript } from '../functions-src/api/transcript.js';
import { onRequestGet as recommendations } from '../functions-src/api/recommended-videos.js';
import { fixture } from './fixtures/transcription-db.mjs';

function catalog(initial = {}, metadata = {}) {
  let levels = structuredClone(initial);
  return {
    get levels() { return levels; },
    prepare: () => ({ bind: (...args) => ({
      first: async () => ({ levels: JSON.stringify(levels), sub_languages: '[]', title: '', channel: '', ...metadata }),
      run: async () => { levels = JSON.parse(args[0]); return { success: true }; }
    }) })
  };
}

const frameworks = {
  ja: { cuts: [1.85, 2.75, 3.70, 4.60], labels: ['JLPT N5', 'JLPT N4', 'JLPT N3', 'JLPT N2', 'JLPT N1'] },
  zh: { cuts: [1.85, 2.85, 3.85, 4.85, 5.85], labels: [1, 2, 3, 4, 5, 6].map(n => `HSK ${n}`) },
  ko: { cuts: [1.85, 2.85, 3.85, 4.85, 5.85], labels: [1, 2, 3, 4, 5, 6].map(n => `TOPIK ${n}`) },
  en: { cuts: [1.85, 2.85, 3.85, 4.85, 5.85], labels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l => `CEFR ${l}`) }
};

test('calibrated boundaries and tiers agree before, at and after every cutoff', () => {
  for (const [lang, { cuts, labels }] of Object.entries(frameworks)) {
    cuts.forEach((cut, i) => {
      for (const delta of [-0.001, 0, 0.001]) {
        const score = cut + delta;
        const expected = labels[delta < 0 ? i : i + 1];
        assert.equal(scoreToLevelLabel(score, lang), expected, `${lang} ${score}`);
        assert.equal(scoreToTier(score, lang), labelToTier(expected));
      }
    });
    assert.equal(scoreToLevelLabel(-100, lang), labels[0]);
    assert.equal(scoreToLevelLabel(100, lang), labels.at(-1));
  }
});

test('missing scores preserve each explicit framework level', async () => {
  for (const [lang, { labels }] of Object.entries(frameworks)) {
    for (const [index, level] of labels.entries()) {
      const db = catalog();
      await saveVideoLevel(db, null, 'dQw4w9WgXcQ', lang, level, 0.8, 'linguistics');
      assert.equal(db.levels[lang].level, level);
      assert.equal(db.levels[lang].score, index + 1);
      assert.equal(db.levels[lang].tier, labelToTier(level));
    }
  }
});

test('blended scores remain bounded and produce a consistent canonical tier', async () => {
  const db = catalog({ ja: { level: 'JLPT N4', score: 2, confidence: 0.85, method: 'server_heuristic' } });
  await saveVideoLevel(db, null, 'dQw4w9WgXcQ', 'ja', 'JLPT N3', 0.8, 'linguistics', { score: 3 });
  assert.equal(db.levels.ja.score, 2.4);
  assert.equal(db.levels.ja.level, 'JLPT N4');
  assert.equal(db.levels.ja.tier, 'elementary');
  await saveVideoLevel(db, null, 'dQw4w9WgXcQ', 'ja', 'JLPT N1', 0.85, 'server_heuristic', { score: 100, forceUpdate: true });
  assert.equal(db.levels.ja.score, 5);
  assert.equal(db.levels.ja.level, 'JLPT N1');
});

test('creator metadata keeps explicit six-level scores and trusted healing remains available', async () => {
  const db = catalog({}, { title: 'HSK 4 Listening Practice' });
  await saveVideoLevel(db, null, 'dQw4w9WgXcQ', 'zh', 'HSK 1', 0.8, 'linguistics');
  assert.equal(db.levels.zh.level, 'HSK 4');
  assert.equal(db.levels.zh.score, 4);
  assert.equal(db.levels.zh.tier, 'intermediate');
  await saveVideoLevel(db, null, 'dQw4w9WgXcQ', 'zh', 'HSK 6', 0.95, 'metadata', { forceUpdate: true });
  assert.equal(db.levels.zh.level, 'HSK 6');
  assert.equal(db.levels.zh.score, 6);
});

test('linguistic cue estimation never overwrites creator title ground-truth even with forceUpdate', async () => {
  const db = catalog({}, { title: 'JLPT N5 Listening Practice - Easy Japanese' });
  // Initial save or background transcript estimation attempting to write N3 with forceUpdate
  await saveVideoLevel(db, null, 'AQdI1o2D32I', 'ja', 'JLPT N3', 0.85, 'linguistics', { forceUpdate: true, score: 3.0 });
  assert.equal(db.levels.ja.level, 'JLPT N5');
  assert.equal(db.levels.ja.score, 1);
  assert.equal(db.levels.ja.confidence, 0.95);
  assert.equal(db.levels.ja.method, 'metadata');

  // Existing high-confidence metadata is preserved when subsequent linguistic cues arrive
  await saveVideoLevel(db, null, 'AQdI1o2D32I', 'ja', 'JLPT N2', 0.8, 'linguistics', { score: 4.0 });
  assert.equal(db.levels.ja.level, 'JLPT N5');
  assert.equal(db.levels.ja.confidence, 0.95);
  assert.equal(db.levels.ja.method, 'metadata');
});

test('authenticated community payloads cannot spoof provenance, confidence or administrative authority', async t => {
  const uid = '33333333-3333-4333-8333-333333333333';
  const payload = Buffer.from(JSON.stringify({ sub: uid, exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url');
  const token = `eyJhbGciOiJIUzI1NiJ9.${payload}.sig`;
  t.mock.method(globalThis, 'fetch', async url => {
    if (String(url).includes('/auth/v1/user')) return Response.json({ id: uid });
    if (String(url).includes('/rest/v1/profiles')) return Response.json([{ id: uid, subscription_tier: 'free' }]);
    throw new Error(`Unexpected fetch ${url}`);
  });
  const submit = async (db, body) => {
    const response = await onRequestPost({
      request: new Request('https://voca.study/api/video-level', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ videoId: 'dQw4w9WgXcQ', language: 'ja', level: 'JLPT N5', score: 1, ...body })
      }), env: { VOCAB_DB: db, TRANSCRIPT_CACHE: { get: async () => null, put: async () => {} } }, waitUntil() {}
    });
    return { status: response.status, body: await response.json() };
  };
  for (const confidence of [0.90, 0.95]) {
    for (const method of ['metadata', 'server_heuristic', 'linguistics', 'admin']) {
      const original = { level: 'JLPT N1', tier: 'advanced', score: 5, confidence, method: 'metadata' };
      const db = catalog({ ja: original });
      const result = await submit(db, { method, confidence: 1, grammarCount: 3, breakdown: { N5: 999 }, forceUpdate: true, details: { forceUpdate: true } });
      assert.equal(result.status, 200);
      assert.deepEqual(db.levels.ja, original);
      assert.equal(result.body.level, original.level);
      assert.equal(result.body.confidence, confidence);
      assert.equal(result.body.method, 'metadata');
    }
  }
  const fresh = catalog();
  const result = await submit(fresh, { method: 'metadata', confidence: 1, grammarCount: 100 });
  assert.equal(result.status, 200);
  assert.equal(fresh.levels.ja.method, 'linguistics');
  assert.equal(fresh.levels.ja.confidence, 0.85);
  const blend = catalog({ ja: { level: 'JLPT N4', score: 2, confidence: 0.85, method: 'server_heuristic' } });
  const blended = await submit(blend, { level: 'JLPT N3', score: 3 });
  assert.equal(blended.body.level, blend.levels.ja.level);
  assert.equal(blended.body.level, 'JLPT N4');
  assert.equal(blended.body.method, blend.levels.ja.method);
  const broken = { prepare() { throw new Error('database unavailable'); } };
  assert.equal((await submit(broken, {})).status, 503);
});


test('feed, cached transcript and submission agree after a catalog update', async t => {
  const { db } = await fixture(t);
  const videoId = 'dQw4w9WgXcQ';
  await saveVideoLanguages(db, videoId, ['ja', 'en'], 60, 'Listening practice', 'Fixture creator',
    false, { ja: 'JLPT N3', en: 'CEFR B2' }, 'avatar', ['ja', 'en']);

  const env = {
    VOCAB_DB: db,
    TRANSCRIPT_CACHE: { get: async () => null, put: async () => {} },
    TRANSCRIPT_STORAGE: { get: async () => ({
      json: async () => ({ language: 'ja', segments: [
        { start: 0, duration: 2, text: 'こんにちは', tokens: [{ surface: 'こんにちは' }] }
      ] })
    }) }
  };
  const url = 'https://voca.study/api/';
  // Another binding identity simulates a worker that still has a cached page.
  const feedEnv = { ...env, VOCAB_DB: { prepare: sql => db.prepare(sql) } };
  const feed = async () => {
    const response = await recommendations({
      request: new Request(url + 'recommended-videos?lang=ja'), env: feedEnv
    });
    assert.equal(response.status, 200);
    return (await response.json()).videos[0];
  };
  assert.equal((await feed()).level, 'JLPT N3');

  await saveVideoLevel(db, null, videoId, 'ja-JP', 'JLPT N2', 0.95, 'metadata', { forceUpdate: true });
  await saveVideoLanguages(db, videoId, ['ja'], 60, null, null, false,
    { ja: { level: 'JLPT N3', score: 3, confidence: 0.7 } });

  const uid = '11111111-1111-4111-8111-111111111112';
  const token = `eyJhbGciOiJIUzI1NiJ9.${btoa(JSON.stringify({ sub: uid, exp: 2524608000 }))}.sig`;
  t.mock.method(globalThis, 'fetch', async target => {
    if (String(target).includes('/auth/v1/user')) return Response.json({ id: uid });
    if (String(target).includes('/rest/v1/profiles')) return Response.json([{ id: uid, subscription_tier: 'free' }]);
    throw new Error(`Unexpected fetch ${target}`);
  });
  const submit = await onRequestPost({
    request: new Request(url + 'video-level', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ videoId, language: 'ja', level: 'JLPT N3', score: 3, confidence: 0.85 })
    }), env, waitUntil() {}
  });
  const captions = await transcript({
    request: new Request(url + 'transcript', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, lang: 'ja' })
    }), env, waitUntil() {}
  });

  assert.equal(submit.status, 200);
  assert.equal(captions.status, 200);
  const submitted = await submit.json();
  const captionLevels = (await captions.json()).levels;
  const card = await feed();
  assert.equal(card.level, 'JLPT N2');
  assert.equal(submitted.level, 'JLPT N2');
  assert.deepEqual(card.levels.ja, captionLevels.ja);
  assert.deepEqual(submitted.levels.ja, captionLevels.ja);
  assert.equal(captionLevels.ja.isProvisional, false);
  assert.equal(captionLevels.en.level, 'CEFR B2');
});

test('concurrent first reports preserve both track levels', async t => {
  const { db } = await fixture(t);
  const videoId = 'dQw4w9WgXcQ';
  await Promise.all([
    saveVideoLevel(db, null, videoId, 'ja', 'JLPT N2'),
    saveVideoLevel(db, null, videoId, 'en', 'CEFR B2')
  ]);
  const row = await db.prepare('SELECT levels FROM video_languages WHERE video_id = ?').bind(videoId).first();
  const levels = JSON.parse(row.levels);
  assert.equal(levels.ja.level, 'JLPT N2');
  assert.equal(levels.en.level, 'CEFR B2');
});
