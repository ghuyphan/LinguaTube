import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture } from './fixtures/transcription-db.mjs';
import { onRequestPost } from '../functions-src/api/transcript.js';
import { adjustAvailableLanguages } from '../functions-src/utils/transcript-utils.js';

test('adjustAvailableLanguages: adds language to ai and preserves native when source is ai', () => {
    const initial = { native: ['ja'], ai: [] };
    const adjusted = adjustAvailableLanguages(initial, 'ja', 'ai');
    assert.deepEqual(adjusted, { native: ['ja'], ai: ['ja'] });
});

test('adjustAvailableLanguages: preserves other native languages when one is added to ai', () => {
    const initial = { native: ['en', 'ja'], ai: [] };
    const adjusted = adjustAvailableLanguages(initial, 'ja', 'ai');
    assert.deepEqual(adjusted, { native: ['en', 'ja'], ai: ['ja'] });
});

test('adjustAvailableLanguages: adds language to native and preserves ai when source is native', () => {
    const initial = { native: [], ai: ['ja'] };
    const adjusted = adjustAvailableLanguages(initial, 'ja', 'supadata');
    assert.deepEqual(adjusted, { native: ['ja'], ai: ['ja'] });
});

test('cached AI transcript accurately partitions availableLanguages in transcript API (Orion scenario)', async t => {
    const state = await fixture(t);
    const videoId = 'knUMag0Iu0g';

    // Simulate database row: YouTube metadata advertised 'ja', server has 'ja' saved
    state.sqlite.prepare(`
        INSERT INTO video_languages (
            video_id, title, channel, available_languages, sub_languages,
            has_auto_captions, duration_seconds, category, created_at, updated_at
        ) VALUES (?, 'Orion', 'Marie', '["ja"]', '["ja"]', 0, 288, 'music', 100, 100)
    `).run(videoId);

    // Mock R2 storage returning cached AI transcript
    const env = {
        VOCAB_DB: state.db,
        TURNSTILE_SECRET_KEY: 'fixture',
        TRANSCRIPT_STORAGE: {
            get: async (key) => {
                if (key === `transcripts/${videoId}/ja.json`) {
                    return {
                        customMetadata: { source: 'ai' },
                        json: async () => ({
                            videoId,
                            language: 'ja',
                            source: 'ai',
                            segments: [
                                { start: 23.45, duration: 2.86, text: '眩しくて少し', tokens: [{ surface: '眩しくて少し' }] }
                            ]
                        })
                    };
                }
                return null;
            }
        }
    };

    // 1. Test preferAI: false (normal player load)
    const req = new Request('https://voca.study/api/transcript', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'CF-Connecting-IP': '198.51.100.1'
        },
        body: JSON.stringify({ videoId, lang: 'ja', preferAI: false })
    });

    const res = await onRequestPost({ request: req, env });
    assert.equal(res.status, 200);
    const body = await res.json();

    assert.equal(body.success, true);
    assert.equal(body.videoId, videoId);
    assert.equal(body.language, 'ja');
    assert.equal(body.source, 'cache');
    assert.equal(body.sourceDetail, 'ai');
    assert.deepEqual(body.availableLanguages.ai, ['ja'], 'AI languages must contain ja');
    assert.deepEqual(body.availableLanguages.native, ['ja'], 'Native languages should also be retained if previously reported');

    // 2. Test preferAI: true (explicit AI load)
    const reqAi = new Request('https://voca.study/api/transcript', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'CF-Connecting-IP': '198.51.100.2'
        },
        body: JSON.stringify({ videoId, lang: 'ja', preferAI: true })
    });

    const resAi = await onRequestPost({ request: reqAi, env });
    assert.equal(resAi.status, 200);
    const bodyAi = await resAi.json();

    assert.equal(bodyAi.success, true);
    assert.equal(bodyAi.source, 'ai');
    assert.equal(bodyAi.sourceDetail, 'ai');
    assert.deepEqual(bodyAi.availableLanguages.ai, ['ja']);
    assert.deepEqual(bodyAi.availableLanguages.native, ['ja']);
});

test('cached native transcript retains native in availableLanguages', async t => {
    const state = await fixture(t);
    const videoId = 'native00001';

    state.sqlite.prepare(`
        INSERT INTO video_languages (
            video_id, title, channel, available_languages, sub_languages,
            has_auto_captions, duration_seconds, category, created_at, updated_at
        ) VALUES (?, 'Native Song', 'Artist', '["ja"]', '["ja"]', 0, 200, 'music', 100, 100)
    `).run(videoId);

    const env = {
        VOCAB_DB: state.db,
        TURNSTILE_SECRET_KEY: 'fixture',
        TRANSCRIPT_STORAGE: {
            get: async (key) => {
                if (key === `transcripts/${videoId}/ja.json`) {
                    return {
                        customMetadata: { source: 'supadata' },
                        json: async () => ({
                            videoId,
                            language: 'ja',
                            source: 'supadata',
                            segments: [
                                { start: 1.0, duration: 2.0, text: 'こんにちは', tokens: [{ surface: 'こんにちは' }] }
                            ]
                        })
                    };
                }
                return null;
            }
        }
    };

    const req = new Request('https://voca.study/api/transcript', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'CF-Connecting-IP': '198.51.100.3'
        },
        body: JSON.stringify({ videoId, lang: 'ja', preferAI: false })
    });

    const res = await onRequestPost({ request: req, env });
    assert.equal(res.status, 200);
    const body = await res.json();

    assert.equal(body.success, true);
    assert.equal(body.source, 'cache');
    assert.equal(body.sourceDetail, 'supadata');
    assert.deepEqual(body.availableLanguages.native, ['ja']);
    assert.deepEqual(body.availableLanguages.ai, []);
});
