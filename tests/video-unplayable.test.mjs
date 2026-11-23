import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

import { onRequestPost } from '../functions-src/api/video-unplayable.js';
import { getRecommendedVideosFromCloudflare, markVideoEmbedBlocked } from '../functions-src/data/video-info-db.js';

function createD1Adapter(sqlite) {
    return {
        prepare(sql) {
            const stmt = sqlite.prepare(sql);
            const build = (args) => ({
                bind: (...next) => build(next),
                first: async () => stmt.get(...args) ?? null,
                all: async () => ({ success: true, results: stmt.all(...args), meta: { rows_read: 1 } }),
                run: async () => ({ success: true, meta: { changes: stmt.run(...args).changes } })
            });
            return build([]);
        }
    };
}

function setupTestDb() {
    const sqlite = new DatabaseSync(':memory:');
    sqlite.exec(`
        CREATE TABLE video_languages (
            video_id TEXT PRIMARY KEY,
            available_languages TEXT NOT NULL DEFAULT '[]',
            sub_languages TEXT DEFAULT '[]',
            ai_languages TEXT DEFAULT '[]',
            has_auto_captions INTEGER DEFAULT 0,
            duration_seconds INTEGER DEFAULT 120,
            title TEXT,
            channel TEXT,
            channel_avatar TEXT,
            levels TEXT DEFAULT '{}',
            category TEXT DEFAULT 'education',
            tags TEXT DEFAULT '[]',
            primary_language TEXT DEFAULT 'ja',
            created_at INTEGER DEFAULT 1000,
            updated_at INTEGER DEFAULT 1000
        );
    `);
    sqlite.exec(fs.readFileSync(path.resolve('db/migrations/d1/20261120_video_catalog_index.sql'), 'utf8'));
    sqlite.exec(fs.readFileSync(path.resolve('db/migrations/d1/20261122_add_embed_blocked.sql'), 'utf8'));
    sqlite.exec(fs.readFileSync(path.resolve('db/migrations/d1/20261123_video_region_availability.sql'), 'utf8'));
    return { sqlite, db: createD1Adapter(sqlite) };
}

describe('POST /api/video-unplayable', () => {
    it('refuses to delist a playable video (anti-abuse)', async () => {
        const { sqlite, db } = setupTestDb();
        sqlite.prepare(`
            INSERT INTO video_languages (video_id, available_languages, sub_languages, title, channel, duration_seconds, updated_at)
            VALUES ('dQw4w9WgXcQ', '["ja"]', '["ja"]', 'Playable Video', 'Channel', 200, 1000)
        `).run();

        const req = new Request('https://voca.study/api/video-unplayable', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '1.2.3.4' },
            body: JSON.stringify({ videoId: 'dQw4w9WgXcQ', errorCode: 150 })
        });
        const res = await onRequestPost({
            request: req,
            env: { VOCAB_DB: db },
            _fetchImpl: async () => new Response('<html>playable</html>')
        });
        const body = await res.json();
        assert.equal(body.delisted, false);
        assert.equal(sqlite.prepare('SELECT embed_blocked FROM video_languages WHERE video_id = ?').get('dQw4w9WgXcQ').embed_blocked, 0);
    });

    it('does not globally delist a country-restricted video', async () => {
        const { sqlite, db } = setupTestDb();
        try {
            sqlite.prepare("INSERT INTO video_languages (video_id) VALUES ('yNCJCeZq85k')").run();
            const request = new Request('https://voca.study/api/video-unplayable', {
                method: 'POST',
                headers: { 'CF-Connecting-IP': '192.0.2.5' },
                body: JSON.stringify({ videoId: 'yNCJCeZq85k', errorCode: 150 })
            });
            const response = await onRequestPost({
                request, env: { VOCAB_DB: db },
                _fetchImpl: async () => new Response(JSON.stringify({
                    previewPlayabilityStatus: { status: 'UNPLAYABLE',
                        reason: 'The uploader has not made this video available in your country' }
                }))
            });
            assert.equal((await response.json()).delisted, false);
            assert.equal(sqlite.prepare('SELECT embed_blocked FROM video_languages').get().embed_blocked, 0);
        } finally {
            sqlite.close();
        }
    });

    it('delists a verified blocked video and excludes it from recommendations', async () => {
        const { sqlite, db } = setupTestDb();
        sqlite.prepare(`
            INSERT INTO video_languages (video_id, available_languages, sub_languages, title, channel, duration_seconds, updated_at)
            VALUES ('blockedVid1', '["ja"]', '["ja"]', 'Blocked Video', 'Channel A', 200, 1000),
                   ('goodVideo11', '["ja"]', '["ja"]', 'Good Video', 'Channel B', 200, 1000)
        `).run();

        const req = new Request('https://voca.study/api/video-unplayable', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '1.2.3.5' },
            body: JSON.stringify({ videoId: 'blockedVid1', errorCode: 150 })
        });
        const res = await onRequestPost({
            request: req,
            env: { VOCAB_DB: db },
            _fetchImpl: async () => new Response('{"status":"UNPLAYABLE","reason":"Playback on other websites has been disabled"}')
        });
        const body = await res.json();
        assert.equal(body.delisted, true);
        assert.equal(body.reason, 'embed_disabled');

        const after = await getRecommendedVideosFromCloudflare(db, null, 'ja', 10);
        assert.equal(after.length, 1);
        assert.equal(after[0].videoId, 'goodVideo11');

        // Trigger prevents subsequent updates from re-inserting into catalog
        sqlite.prepare("UPDATE video_languages SET updated_at = 2000 WHERE video_id = 'blockedVid1'").run();
        assert.equal(sqlite.prepare('SELECT * FROM video_language_catalog WHERE video_id = ?').all('blockedVid1').length, 0);

        // Restoring embed_blocked = 0 re-indexes it cleanly
        await markVideoEmbedBlocked(db, 'blockedVid1', false);
        assert.equal(sqlite.prepare('SELECT * FROM video_language_catalog WHERE video_id = ?').all('blockedVid1').length, 1);
    });

    it('returns delisted=false for unknown or already-blocked videos without mutating updated_at', async () => {
        const { sqlite, db } = setupTestDb();
        sqlite.prepare(`
            INSERT INTO video_languages (video_id, available_languages, sub_languages, title, channel, duration_seconds, updated_at)
            VALUES ('alreadyBlk1', '["ja"]', '["ja"]', 'Blocked Video', 'Channel', 200, 1000)
        `).run();
        const blockedFetch = async () => new Response('{"status":"UNPLAYABLE","reason":"Playback on other websites has been disabled"}');

        const first = await onRequestPost({
            request: new Request('https://voca.study/api/video-unplayable', {
                method: 'POST', headers: { 'CF-Connecting-IP': '1.2.3.6' },
                body: JSON.stringify({ videoId: 'alreadyBlk1', errorCode: 150 })
            }),
            env: { VOCAB_DB: db }, _fetchImpl: blockedFetch
        });
        assert.equal((await first.json()).delisted, true);
        assert.equal(sqlite.prepare('SELECT updated_at FROM video_languages WHERE video_id = ?').get('alreadyBlk1').updated_at, 1000);

        const repeat = await onRequestPost({
            request: new Request('https://voca.study/api/video-unplayable', {
                method: 'POST', headers: { 'CF-Connecting-IP': '1.2.3.6' },
                body: JSON.stringify({ videoId: 'alreadyBlk1', errorCode: 150 })
            }),
            env: { VOCAB_DB: db }, _fetchImpl: blockedFetch
        });
        assert.equal((await repeat.json()).delisted, false);

        const unknown = await onRequestPost({
            request: new Request('https://voca.study/api/video-unplayable', {
                method: 'POST', headers: { 'CF-Connecting-IP': '1.2.3.6' },
                body: JSON.stringify({ videoId: 'notInDb0001', errorCode: 150 })
            }),
            env: { VOCAB_DB: db }, _fetchImpl: blockedFetch
        });
        assert.equal((await unknown.json()).delisted, false);
    });
});
