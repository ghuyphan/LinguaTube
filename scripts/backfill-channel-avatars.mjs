#!/usr/bin/env node

/**
 * Backfill Channel Avatars for Cloudflare D1
 * Resolves high-resolution YouTube channel avatars for existing rows in video_languages.
 * 
 * Usage:
 *   node scripts/backfill-channel-avatars.mjs [--remote]
 */

import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const isRemote = process.argv.includes('--remote') || true;
const DB_NAME = 'linguatube-vocab';

console.log(`[Backfill] Querying video_languages from D1 (mode: ${isRemote ? 'remote' : 'local'})...`);

const flag = isRemote ? '--remote' : '';
const queryCmd = `npx wrangler d1 execute ${DB_NAME} ${flag} --command="SELECT video_id, title, channel FROM video_languages WHERE channel_avatar IS NULL;" --json`;

let rows = [];
try {
    const raw = execSync(queryCmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const parsed = JSON.parse(raw);
    rows = parsed?.[0]?.results || [];
} catch (err) {
    console.error('[Backfill] Failed to query D1:', err.message);
    process.exit(1);
}

console.log(`[Backfill] Found ${rows.length} videos missing channel_avatar.`);
if (rows.length === 0) {
    console.log('[Backfill] All videos already have channel avatars. Nothing to do!');
    process.exit(0);
}

/**
 * Resolve avatar URL for a given video ID
 */
async function resolveAvatar(videoId) {
    try {
        const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`, {
            signal: AbortSignal.timeout(5000)
        });
        if (!oembedRes.ok) return null;
        const oembed = await oembedRes.json();
        const authorUrl = oembed.author_url;
        if (!authorUrl) return null;

        const pageRes = await fetch(authorUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html'
            },
            signal: AbortSignal.timeout(6000)
        });
        if (!pageRes.ok) return null;
        const html = await pageRes.text();

        const match = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)
            || html.match(/<link\s+rel=["']image_src["']\s+href=["']([^"']+)["']/i);

        if (match && match[1]) {
            const avatarUrl = match[1];
            if (avatarUrl.includes('ggpht.com') || avatarUrl.includes('googleusercontent.com')) {
                return avatarUrl;
            }
        }
    } catch (e) {
        console.warn(`[Backfill] Warning: Failed to resolve avatar for ${videoId}:`, e.message);
    }
    return null;
}

const updates = [];
let successCount = 0;

for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const { video_id: videoId, title, channel } = row;
    process.stdout.write(`[${i + 1}/${rows.length}] Resolving ${channel || 'Unknown'} (${videoId})... `);

    const avatar = await resolveAvatar(videoId);
    if (avatar) {
        console.log(`✅ Found: ${avatar.slice(0, 60)}...`);
        // Escape single quotes for SQL
        const safeAvatar = avatar.replace(/'/g, "''");
        const safeVideoId = videoId.replace(/'/g, "''");
        updates.push(`UPDATE video_languages SET channel_avatar = '${safeAvatar}' WHERE video_id = '${safeVideoId}';`);
        successCount++;
    } else {
        console.log(`❌ Not found`);
    }

    // Small delay to be polite to YouTube servers
    await new Promise(r => setTimeout(r, 150));
}

console.log(`\n[Backfill] Resolved ${successCount}/${rows.length} avatars.`);

if (updates.length > 0) {
    const tempSqlPath = path.join(process.cwd(), 'scratch_backfill_avatars.sql');
    fs.writeFileSync(tempSqlPath, updates.join('\n'), 'utf8');

    console.log(`[Backfill] Applying batch update to D1...`);
    try {
        execSync(`npx wrangler d1 execute ${DB_NAME} ${flag} --file="${tempSqlPath}"`, { stdio: 'inherit' });
        console.log(`[Backfill] Successfully updated D1 database!`);
    } catch (err) {
        console.error('[Backfill] Failed to apply updates to D1:', err.message);
    } finally {
        if (fs.existsSync(tempSqlPath)) {
            fs.unlinkSync(tempSqlPath);
        }
    }
}
