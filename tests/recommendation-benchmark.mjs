// Local fixture comparison against the Git HEAD baseline; no provider requests.
import { DatabaseSync } from 'node:sqlite';
import { execFileSync } from 'node:child_process';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { performance } from 'node:perf_hooks';
import { getRecommendedVideosFromCloudflare as revised } from '../functions-src/data/video-info-db.js';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = path => execFileSync('git', ['show', `HEAD:${path}`], { cwd: root, encoding: 'utf8' });
const moduleUrl = text => `data:text/javascript;base64,${Buffer.from(text).toString('base64')}`;
const baselineRanking = moduleUrl(source('functions-src/services/recommendation.service.js'));
const baselineSource = source('functions-src/data/video-info-db.js').replace(/from '([^']+)'/g, (_, path) =>
    `from '${path.endsWith('recommendation.service.js') ? baselineRanking : pathToFileURL(resolve(root, 'functions-src/data', path)).href}'`);
const { getRecommendedVideosFromCloudflare: baseline } = await import(moduleUrl(baselineSource));
const sqlite = new DatabaseSync(':memory:');
sqlite.exec(`CREATE TABLE video_languages (video_id TEXT PRIMARY KEY, title TEXT, channel TEXT, channel_avatar TEXT,
    duration_seconds INTEGER, levels TEXT, available_languages TEXT, sub_languages TEXT, category TEXT, tags TEXT, updated_at INTEGER)`);
const insert = sqlite.prepare('INSERT INTO video_languages VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
for (let i = 0; i < 400; i++) insert.run(`video_${i}`, `Japanese lesson ${i}`, `Channel ${i % 20}`, 'avatar',
    300, '{"ja":"N3"}', '["ja"]', '["ja"]', 'education', '[]', 10000 - i);
let queries = 0;
const db = { prepare(sql) { return { bind(...args) { return { async all() {
    queries++; return { success: true, results: sqlite.prepare(sql).all(...args) };
} }; } }; } };
const result = {};
for (const [name, recommend] of Object.entries({ baseline, revised })) {
    const elapsed = [];
    let videos;
    for (let run = 0; run < 20; run++) {
        videos = []; queries = 0;
        const started = performance.now();
        for (let offset = 0; offset < 120; offset += 24) videos.push(...await recommend(db, null, 'ja', 24, null, offset === 0, offset, null, { sessionSeed: 1111 }));
        elapsed.push(performance.now() - started);
    }
    elapsed.sort((a, b) => a - b);
    const channels = new Map();
    for (const video of videos.slice(0, 24)) channels.set(video.channel, (channels.get(video.channel) || 0) + 1);
    result[name] = { returned: videos.length, unique: new Set(videos.map(v => v.videoId)).size,
        duplicates: videos.length - new Set(videos.map(v => v.videoId)).size,
        discoveryWindowCoverage: new Set(videos.map(v => v.videoId)).size / 200,
        firstPageMaxCreatorShare: Math.max(...channels.values()) / 24,
        requests: 5, databaseQueries: queries, medianFivePageMs: Math.round(elapsed[10] * 100) / 100 };
}
sqlite.exec(`UPDATE video_languages SET levels = CASE WHEN updated_at > 9800 THEN '{"ja":"N1"}' ELSE '{"ja":"N5"}' END`);
for (const [name, recommend] of Object.entries({ baseline, revised })) {
    const videos = await recommend(db, null, 'ja', 24, 'beginner', true, 0, null, { sessionSeed: 1111 });
    result[name].olderBeginnerResults = videos.length;
    result[name].beginnerDifficultyFit = videos.length ? videos.filter(v => v.tier === 'beginner').length / videos.length : null;
}
sqlite.close();
console.log(JSON.stringify({ node: process.version, fixture: '400 videos, seed 1111, five pages of 24, 20 warm local runs',
    limitations: 'In-memory SQLite timings exclude network, Worker startup, provider latency and engagement. Coverage denominator is the revised 200-candidate window.', result }, null, 2));
