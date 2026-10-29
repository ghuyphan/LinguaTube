import test from 'node:test';
import assert from 'node:assert/strict';
import { saveVideoLevel, scoreToLevelLabel, scoreToTier, labelToTier } from '../functions-src/data/video-info-db.js';
import { onRequestPost } from '../functions-src/api/video-level.js';

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
