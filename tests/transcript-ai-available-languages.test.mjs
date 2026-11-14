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

test('dual-track video serves separate native (.json) and AI (.ai.json) transcripts', async t => {
    const state = await fixture(t);
    const videoId = '4axiponRNiw';

    state.sqlite.prepare(`
        INSERT INTO video_languages (
            video_id, title, channel, available_languages, sub_languages, ai_languages,
            has_auto_captions, duration_seconds, category, created_at, updated_at
        ) VALUES (?, 'iPhone 18 Pro', 'Tech', '["en-US","zh"]', '["zh"]', '["zh"]', 1, 600, 'tech', 100, 100)
    `).run(videoId);

    const env = {
        VOCAB_DB: state.db,
        TURNSTILE_SECRET_KEY: 'fixture',
        TRANSCRIPT_STORAGE: {
            get: async (key) => {
                if (key === `transcripts/${videoId}/zh.json`) {
                    return {
                        customMetadata: { source: 'supadata' },
                        json: async () => ({
                            videoId,
                            language: 'zh',
                            source: 'supadata',
                            segments: [
                                { start: 1.0, duration: 2.0, text: '原生中文字幕', tokens: [{ surface: '原生中文字幕' }] }
                            ]
                        })
                    };
                }
                if (key === `transcripts/${videoId}/zh.ai.json`) {
                    return {
                        customMetadata: { source: 'ai' },
                        json: async () => ({
                            videoId,
                            language: 'zh',
                            source: 'ai',
                            segments: [
                                { start: 1.0, duration: 2.0, text: 'AI轉錄中文字幕', tokens: [{ surface: 'AI轉錄中文字幕' }] }
                            ]
                        })
                    };
                }
                return null;
            }
        }
    };

    const nativeRes = await onRequestPost({
        request: new Request('https://voca.study/api/transcript', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '198.51.100.10' },
            body: JSON.stringify({ videoId, lang: 'zh', preferAI: false })
        }),
        env
    });
    assert.equal(nativeRes.status, 200);
    const nativeBody = await nativeRes.json();
    assert.equal(nativeBody.source, 'cache');
    assert.equal(nativeBody.sourceDetail, 'supadata');
    assert.equal(nativeBody.segments[0].text, '原生中文字幕');
    assert.deepEqual(nativeBody.availableLanguages, { native: ['en', 'zh'], ai: ['zh'] });

    const aiRes = await onRequestPost({
        request: new Request('https://voca.study/api/transcript', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '198.51.100.11' },
            body: JSON.stringify({ videoId, lang: 'zh', preferAI: true })
        }),
        env
    });
    assert.equal(aiRes.status, 200);
    const aiBody = await aiRes.json();
    assert.equal(aiBody.source, 'ai');
    assert.equal(aiBody.sourceDetail, 'ai');
    assert.equal(aiBody.segments[0].text, 'AI轉錄中文字幕');
    assert.deepEqual(aiBody.availableLanguages, { native: ['en', 'zh'], ai: ['zh'] });
});

test('non-AI sub_languages omitted from available_languages never become false AI tracks', async t => {
    const state = await fixture(t);
    const videoId = 'moW9jvvMr40';

    state.sqlite.prepare(`
        INSERT INTO video_languages (
            video_id, title, channel, available_languages, sub_languages, ai_languages,
            has_auto_captions, duration_seconds, category, created_at, updated_at
        ) VALUES (?, 'MV', 'Artist', '["zh"]', '["en","ja","ko","zh"]', '[]', 0, 210, 'music', 100, 100)
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
                                { start: 1.0, duration: 2.0, text: '日本語ネイティブ', tokens: [{ surface: '日本語' }] }
                            ]
                        })
                    };
                }
                return null;
            }
        }
    };

    const res = await onRequestPost({
        request: new Request('https://voca.study/api/transcript', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '198.51.100.12' },
            body: JSON.stringify({ videoId, lang: 'ja', preferAI: false })
        }),
        env
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.source, 'cache');
    assert.equal(body.sourceDetail, 'supadata');
    assert.deepEqual(body.availableLanguages.ai, []);
    assert.ok(body.availableLanguages.native.includes('ja'));
});

test('migrated .ai.json falls back cleanly when native track exists in D1 but provider is unavailable', async t => {
    const state = await fixture(t);
    const videoId = 'dualFallb01';

    state.sqlite.prepare(`
        INSERT INTO video_languages (
            video_id, title, channel, available_languages, sub_languages, ai_languages,
            has_auto_captions, duration_seconds, category, created_at, updated_at
        ) VALUES (?, 'Dual', 'Ch', '["zh"]', '["zh"]', '["zh"]', 0, 300, 'tech', 100, 100)
    `).run(videoId);

    const env = {
        VOCAB_DB: state.db,
        TURNSTILE_SECRET_KEY: 'fixture',
        TRANSCRIPT_STORAGE: {
            get: async (key) => {
                if (key === `transcripts/${videoId}/zh.ai.json`) {
                    return {
                        customMetadata: { source: 'ai' },
                        json: async () => ({
                            videoId,
                            language: 'zh',
                            source: 'ai',
                            segments: [
                                { start: 1.0, duration: 2.0, text: 'AI備用字幕', tokens: [{ surface: 'AI' }] }
                            ]
                        })
                    };
                }
                return null;
            }
        }
    };

    const res = await onRequestPost({
        request: new Request('https://voca.study/api/transcript', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '198.51.100.13' },
            body: JSON.stringify({ videoId, lang: 'zh', preferAI: false })
        }),
        env
    });
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.source, 'cache');
    assert.equal(body.sourceDetail, 'ai');
    assert.equal(body.segments[0].text, 'AI備用字幕');
    assert.deepEqual(body.availableLanguages, { native: ['zh'], ai: ['zh'] });
});
