#!/usr/bin/env node

/**
 * Backfill Video Durations for Cloudflare D1
 * Resolves accurate video duration in seconds for existing rows in video_languages
 * where duration_seconds is NULL or 0.
 *
 * Sources:
 * 1. Primary: YouTube Watch Page HTML scrape (approxDurationMs)
 * 2. Fallback: Edge R2 Cached Transcript API (last subtitle cue timestamp)
 *
 * Usage:
 *   node scripts/backfill-durations.mjs [--remote]
 */

import { execSync } from 'node:child_process';

const isRemote = process.argv.includes('--remote') || true;
const DB_NAME = 'linguatube-vocab';

console.log(`[Backfill Duration] Querying video_languages from D1 (mode: ${isRemote ? 'remote' : 'local'})...`);

const flag = isRemote ? '--remote' : '';
const queryCmd = `npx -y wrangler d1 execute ${DB_NAME} ${flag} --command="SELECT video_id, title FROM video_languages WHERE duration_seconds IS NULL OR duration_seconds = 0;" --json`;

let rows = [];
try {
    const raw = execSync(queryCmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const parsed = JSON.parse(raw);
    rows = parsed?.[0]?.results || [];
} catch (err) {
    console.error('[Backfill Duration] Failed to query D1:', err.message);
    process.exit(1);
}

console.log(`[Backfill Duration] Found ${rows.length} videos missing duration_seconds.`);
if (rows.length === 0) {
    console.log('[Backfill Duration] All videos already have durations. Nothing to do!');
    process.exit(0);
}

/**
 * Resolve duration from YouTube watch page HTML
 */
async function resolveFromYouTube(videoId) {
    try {
        const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            signal: AbortSignal.timeout(6000)
        });
        if (!res.ok) return null;
        const html = await res.text();
        const match = html.match(/"approxDurationMs":"(\d+)"/);
        if (match && match[1]) {
            const sec = Math.round(parseInt(match[1], 10) / 1000);
            if (!isNaN(sec) && sec > 0) return sec;
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * Fallback: Resolve duration from last cue in transcript API
 */
async function resolveFromTranscript(videoId) {
    const candidateLangs = ['ja', 'en', 'zh', 'ko'];
    for (const lang of candidateLangs) {
        try {
            const res = await fetch('https://voca.study/api/transcript', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'VocaMobile/1.0.0 (Android; Mobile)'
                },
                body: JSON.stringify({ videoId, lang }),
                signal: AbortSignal.timeout(6000)
            });
            if (!res.ok) continue;
            const data = await res.json();
            if (data.success && Array.isArray(data.segments) && data.segments.length > 0) {
                const last = data.segments[data.segments.length - 1];
                const endSec = Math.round((last.start || 0) + (last.duration || 0));
                if (endSec > 0) return endSec;
            }
        } catch {
            // try next lang
        }
    }
    return null;
}

// Process in small concurrent batches
const BATCH_SIZE = 5;
const updates = [];

for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const chunk = rows.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(chunk.map(async (row) => {
        const vId = row.video_id;
        process.stdout.write(`[Backfill Duration] Processing ${vId} ("${(row.title || '').slice(0, 30)}...")... `);

        let dur = await resolveFromYouTube(vId);
        let source = 'YouTube';

        if (!dur) {
            dur = await resolveFromTranscript(vId);
            source = 'Transcript';
        }

        if (dur && dur > 0) {
            console.log(`✅ ${dur}s (~${Math.floor(dur / 60)}:${(dur % 60).toString().padLeft ? (dur % 60).toString().padStart(2, '0') : dur % 60}) [${source}]`);
            return { videoId: vId, duration: dur };
        } else {
            console.log(`❌ Failed to resolve duration`);
            return null;
        }
    }));

    for (const r of results) {
        if (r) updates.push(r);
    }
}

console.log(`\n[Backfill Duration] Successfully resolved duration for ${updates.length}/${rows.length} videos.`);

if (updates.length > 0) {
    console.log(`[Backfill Duration] Applying updates to D1...`);

    // Split updates into chunks of 20 statements per D1 execute call to avoid command length limits
    const SQL_CHUNK_SIZE = 20;
    for (let i = 0; i < updates.length; i += SQL_CHUNK_SIZE) {
        const sqlChunk = updates.slice(i, i + SQL_CHUNK_SIZE);
        const sqlStatements = sqlChunk.map(u =>
            `UPDATE video_languages SET duration_seconds = ${u.duration}, updated_at = strftime('%s', 'now') WHERE video_id = '${u.videoId.replace(/'/g, "''")}';`
        ).join(' ');

        const updateCmd = `npx -y wrangler d1 execute ${DB_NAME} ${flag} --command="${sqlStatements}" --json`;
        try {
            execSync(updateCmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
            console.log(`[Backfill Duration] Applied batch ${Math.floor(i / SQL_CHUNK_SIZE) + 1}/${Math.ceil(updates.length / SQL_CHUNK_SIZE)}.`);
        } catch (err) {
            console.error(`[Backfill Duration] Failed to apply batch:`, err.message);
        }
    }
}

console.log('[Backfill Duration] Completed successfully!');
