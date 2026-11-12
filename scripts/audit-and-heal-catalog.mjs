#!/usr/bin/env node

/**
 * Full Catalog Level Auditor and Healer for Cloudflare D1
 * Re-grades all videos across ja, zh, ko, en against:
 * 1. Authoritative title metadata ground truth
 * 2. Calibrated multi-language transcript estimator (Jouyou kanji, HSK 1-3, TOPIK connectives, CEFR word bounds)
 *
 * Usage:
 *   node scripts/audit-and-heal-catalog.mjs [--apply] [--local]
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
  labelToTier,
  levelToScore,
  scoreToLevelLabel,
  scoreToTier
} from '../functions-src/data/video-info-db.js';
import { estimateTranscriptLevel } from '../functions-src/utils/level-estimator.js';

const isRemote = !process.argv.includes('--local');
const isApply = process.argv.includes('--apply');
const isDryRun = !isApply;
const DB_NAME = 'linguatube-vocab';
const flag = isRemote ? '--remote' : '';

console.log(`[Full Catalog Audit] Querying video_languages from D1 (mode: ${isRemote ? 'remote' : 'local'}, apply: ${isApply ? 'YES' : 'NO (dry-run)'})...`);

const queryCmd = `npx -y wrangler d1 execute ${DB_NAME} ${flag} --command="SELECT video_id, title, channel, levels, sub_languages FROM video_languages;" --json`;

let rows = [];
try {
  const raw = execSync(queryCmd, { cwd: projectRoot, encoding: 'utf8', maxBuffer: 15 * 1024 * 1024 });
  const parsed = JSON.parse(raw);
  rows = parsed?.[0]?.results || [];
} catch (err) {
  console.error('[Full Catalog Audit] Failed to query D1:', err.message);
  process.exit(1);
}

console.log(`[Full Catalog Audit] Found ${rows.length} total videos in catalog. Scanning all languages (JA, ZH, KO, EN)...\n`);

const updates = [];
const rollbacks = [];
const summary = [];

async function main() {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let levels = {};
    try {
      levels = typeof row.levels === 'string' ? JSON.parse(row.levels) : (row.levels || {});
    } catch {
      levels = {};
    }

    const rawOriginalLevels = typeof row.levels === 'string' ? row.levels : JSON.stringify(row.levels || {});
    let videoModified = false;
    const newLevels = { ...levels };

    for (const [lang, data] of Object.entries(levels)) {
      if (!['ja', 'zh', 'ko', 'en'].includes(lang)) continue;
      if (typeof data !== 'object' || data === null) continue;

      const titleMeta = detectLevelFromMetadata(row.title || '', row.channel || '', lang);
      const oldLevel = data.level;
      const oldTier = data.tier;
      const oldScore = data.score;
      const oldMethod = data.method;

      // Priority 1: Title metadata ground truth
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
            lang: lang.toUpperCase(),
            reason: 'TITLE_METADATA',
            from: `${oldLevel} (${oldTier}) [${oldMethod}]`,
            to: `${expectedLevel} (${expectedTier}) [metadata]`
          });
        }
      } else if (oldMethod === 'metadata' && (data.confidence || 0) >= 0.90) {
        // Preserved authoritative metadata
        continue;
      } else {
        // Priority 2: Re-estimate transcript using calibrated estimator
        try {
          const res = await fetch('https://voca.study/api/transcript', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'Voca/1.2.4' },
            body: JSON.stringify({ videoId: row.video_id, lang })
          }).then(r => r.json());

          if (res.segments?.length > 0) {
            const est = estimateTranscriptLevel(res.segments, lang, { title: row.title, channel: row.channel });
            if (est) {
              const scoreDiff = typeof oldScore === 'number' ? Math.abs(est.score - oldScore) : 1.0;
              if (est.level !== oldLevel || est.tier !== oldTier || scoreDiff >= 0.4) {
                newLevels[lang] = {
                  ...data,
                  level: est.level,
                  tier: est.tier,
                  score: est.score,
                  confidence: est.confidence,
                  method: 'server_heuristic',
                  speechRateCpm: est.speechRateCpm,
                  updatedAt: Math.floor(Date.now() / 1000)
                };
                videoModified = true;
                summary.push({
                  videoId: row.video_id,
                  title: row.title,
                  lang: lang.toUpperCase(),
                  reason: 'CALIBRATED_ESTIMATE',
                  from: `${oldLevel} (${oldTier}) score=${oldScore}`,
                  to: `${est.level} (${est.tier}) score=${est.score}`
                });
              }
            }
          }
        } catch (e) {
          // If transcript unavailable, fallback to scoreToLevelLabel parity check
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
                lang: lang.toUpperCase(),
                reason: 'CALIBRATION_PARITY',
                from: `${oldLevel} (${oldTier}) score=${oldScore}`,
                to: `${expectedLevel} (${expectedTier}) score=${oldScore}`
              });
            }
          }
        }
      }
    }

    if (videoModified) {
      const safeLevels = JSON.stringify(newLevels).replace(/'/g, "''");
      const safeOriginalLevels = rawOriginalLevels.replace(/'/g, "''");
      const safeVideoId = row.video_id.replace(/'/g, "''");
      updates.push(`UPDATE video_languages SET levels = '${safeLevels}', updated_at = strftime('%s', 'now') WHERE video_id = '${safeVideoId}' AND levels = '${safeOriginalLevels}';`);
      rollbacks.push(`UPDATE video_languages SET levels = '${safeOriginalLevels}', updated_at = strftime('%s', 'now') WHERE video_id = '${safeVideoId}';`);
    }

    if ((i + 1) % 15 === 0 || i === rows.length - 1) {
      process.stdout.write(`  ...processed ${i + 1}/${rows.length} videos\r`);
    }
  }

  const unchangedCount = rows.length - updates.length;
  console.log(`\n\n[Full Catalog Audit Summary]`);
  console.log(`  • Total videos scanned: ${rows.length}`);
  console.log(`  • Unchanged videos: ${unchangedCount}`);
  console.log(`  • Videos to heal: ${updates.length}`);
  console.log(`  • Language targets to heal: ${summary.length}\n`);

  for (const s of summary) {
    console.log(`  • [${s.videoId}] (${s.lang}) ${s.from} ➔ ${s.to}`);
    console.log(`    Title: "${s.title}" (${s.reason})\n`);
  }

  if (isDryRun) {
    console.log(`[Full Catalog Audit] Default dry-run mode active. No changes written to D1.`);
    console.log(`[Full Catalog Audit] To apply updates to D1, run: node scripts/audit-and-heal-catalog.mjs --apply\n`);
    process.exit(0);
  }

  if (updates.length > 0) {
    const timestamp = Date.now();
    const rollbackSqlPath = path.join(projectRoot, `scratch_heal_all_catalog_rollback_${timestamp}.sql`);
    fs.writeFileSync(rollbackSqlPath, rollbacks.join('\n'), 'utf8');
    console.log(`[Full Catalog Audit] 🛡️ Rollback SQL script created at: ${rollbackSqlPath}`);

    const tempSqlPath = path.join(projectRoot, 'scratch_heal_all_catalog.sql');
    fs.writeFileSync(tempSqlPath, updates.join('\n'), 'utf8');

    console.log(`[Full Catalog Audit] Applying ${updates.length} updates to D1 (${DB_NAME})...`);
    try {
      execSync(`npx -y wrangler d1 execute ${DB_NAME} ${flag} --file="${tempSqlPath}"`, {
        cwd: projectRoot,
        stdio: 'inherit'
      });
      console.log(`\n[Full Catalog Audit] ✅ Successfully healed all video levels in D1!`);
    } catch (err) {
      console.error(`\n[Full Catalog Audit] ❌ Failed to execute updates on D1:`, err.message);
      console.error(`[Full Catalog Audit] Execute rollback via: npx wrangler d1 execute ${DB_NAME} ${flag} --file="${rollbackSqlPath}"`);
      process.exit(1);
    } finally {
      if (fs.existsSync(tempSqlPath)) {
        fs.unlinkSync(tempSqlPath);
      }
    }
  } else {
    console.log(`\n[Full Catalog Audit] All videos in all languages are already in 100% parity. No changes needed.`);
  }
}

main().catch(err => {
  console.error('[Full Catalog Audit] Fatal error:', err);
  process.exit(1);
});
