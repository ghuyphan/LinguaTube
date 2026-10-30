#!/usr/bin/env node

/**
 * Heal Video Levels for Cloudflare D1
 * Re-grades and aligns all videos in video_languages to:
 * 1. Explicit creator title ground-truth (confidence 0.95, method 'metadata')
 * 2. Official 2026-10-29 calibrated level and tier boundaries for server heuristics
 *
 * Usage:
 *   node scripts/heal-video-levels.mjs [--remote] [--dry-run]
 */

import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

import {
  detectLevelFromMetadata,
  scoreToLevelLabel,
  scoreToTier,
  labelToTier,
  levelToScore
} from '../functions-src/data/video-info-db.js';

const isRemote = !process.argv.includes('--local');
const isDryRun = process.argv.includes('--dry-run');
const DB_NAME = 'linguatube-vocab';

console.log(`[Heal Levels] Querying video_languages from D1 (mode: ${isRemote ? 'remote' : 'local'})...`);

const flag = isRemote ? '--remote' : '';
const queryCmd = `npx -y wrangler d1 execute ${DB_NAME} ${flag} --command="SELECT video_id, title, channel, levels, sub_languages FROM video_languages;" --json`;

let rows = [];
try {
  const raw = execSync(queryCmd, { cwd: projectRoot, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  const parsed = JSON.parse(raw);
  rows = parsed?.[0]?.results || [];
} catch (err) {
  console.error('[Heal Levels] Failed to query D1:', err.message);
  process.exit(1);
}

console.log(`[Heal Levels] Found ${rows.length} total videos in catalog.`);

const updates = [];
const summary = [];

for (const row of rows) {
  let levels = {};
  try {
    levels = typeof row.levels === 'string' ? JSON.parse(row.levels) : (row.levels || {});
  } catch {
    levels = {};
  }

  const titleMeta = detectLevelFromMetadata(row.title || '', row.channel || '');
  let videoModified = false;
  const newLevels = { ...levels };

  for (const [lang, data] of Object.entries(levels)) {
    if (!['ja', 'zh', 'ko', 'en'].includes(lang)) continue;
    if (typeof data !== 'object' || data === null) continue;

    const oldLevel = data.level;
    const oldTier = data.tier;
    const oldScore = data.score;
    const oldMethod = data.method;

    if (titleMeta && titleMeta.lang === lang) {
      const expectedLevel = titleMeta.level;
      const expectedTier = labelToTier(expectedLevel) || 'intermediate';
      const expectedScore = levelToScore(expectedLevel);

      if (oldLevel !== expectedLevel || oldTier !== expectedTier || oldMethod !== 'metadata') {
        newLevels[lang] = {
          ...data,
          level: expectedLevel,
          tier: expectedTier,
          score: expectedScore,
          confidence: 0.95,
          method: 'metadata',
          updatedAt: Math.floor(Date.now() / 1000)
        };
        videoModified = true;
        summary.push({
          videoId: row.video_id,
          title: row.title,
          lang,
          reason: 'TITLE_METADATA',
          from: `${oldLevel} (${oldTier}) [${oldMethod}]`,
          to: `${expectedLevel} (${expectedTier}) [metadata]`
        });
      }
    } else if (data.method === 'server_heuristic' || data.method === 'linguistics') {
      if (typeof oldScore === 'number' && Number.isFinite(oldScore)) {
        const expectedLevel = scoreToLevelLabel(oldScore, lang);
        const expectedTier = scoreToTier(oldScore, lang);

        if (oldLevel !== expectedLevel || oldTier !== expectedTier) {
          newLevels[lang] = {
            ...data,
            level: expectedLevel,
            tier: expectedTier,
            updatedAt: Math.floor(Date.now() / 1000)
          };
          videoModified = true;
          summary.push({
            videoId: row.video_id,
            title: row.title,
            lang,
            reason: 'CALIBRATION_PARITY',
            from: `${oldLevel} (${oldTier}) score=${oldScore}`,
            to: `${expectedLevel} (${expectedTier}) score=${oldScore}`
          });
        }
      }
    }
  }

  if (videoModified) {
    const safeLevels = JSON.stringify(newLevels).replace(/'/g, "''");
    const safeVideoId = row.video_id.replace(/'/g, "''");
    updates.push(`UPDATE video_languages SET levels = '${safeLevels}', updated_at = strftime('%s', 'now') WHERE video_id = '${safeVideoId}';`);
  }
}

console.log(`\n[Heal Levels] Found ${updates.length} videos requiring updates (${summary.length} language targets):`);
for (const s of summary) {
  console.log(`  • [${s.videoId}] (${s.lang.toUpperCase()}) ${s.from} ➔ ${s.to}`);
  console.log(`    Title: "${s.title}" (${s.reason})`);
}

if (isDryRun) {
  console.log(`\n[Heal Levels] --dry-run specified. No changes written to D1.`);
  process.exit(0);
}

if (updates.length > 0) {
  const tempSqlPath = path.join(projectRoot, 'scratch_heal_levels.sql');
  fs.writeFileSync(tempSqlPath, updates.join('\n'), 'utf8');

  console.log(`\n[Heal Levels] Applying ${updates.length} updates to D1 (${DB_NAME})...`);
  try {
    execSync(`npx -y wrangler d1 execute ${DB_NAME} ${flag} --file="${tempSqlPath}"`, {
      cwd: projectRoot,
      stdio: 'inherit'
    });
    console.log(`[Heal Levels] ✅ Successfully healed all video levels in D1!`);
  } catch (err) {
    console.error(`[Heal Levels] ❌ Failed to execute updates on D1:`, err.message);
    process.exit(1);
  } finally {
    if (fs.existsSync(tempSqlPath)) {
      fs.unlinkSync(tempSqlPath);
    }
  }
} else {
  console.log(`\n[Heal Levels] All videos are already in 100% parity. No changes needed.`);
}
