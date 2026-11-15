#!/usr/bin/env node

/**
 * Full Catalog Level Auditor and Healer for Cloudflare D1
 * Grades missing cached tracks and re-audits existing levels across ja, zh, ko, en, vi:
 * 1. Authoritative title/channel metadata ground truth
 * 2. Server linguistic grading (`calculateGrade`) / calibrated transcript estimator (`estimateTranscriptLevel`)
 * 3. Score <-> Level <-> Tier parity check
 *
 * Usage:
 *   node scripts/audit-and-heal-catalog.mjs [--langs=en,vi] [--apply] [--local]
 */

import { execFileSync, execSync } from 'node:child_process';
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
import { GRADER_VERSION, protectedGrade } from '../functions-src/services/video-grading-jobs.js';
import { estimateTranscriptLevel } from '../functions-src/utils/level-estimator.js';
import { normalizeLanguageCode } from '../functions-src/utils/transcript-utils.js';

const ALL_LANGS = ['ja', 'zh', 'ko', 'en', 'vi'];
const isRemote = !process.argv.includes('--local');
const isApply = process.argv.includes('--apply');
const isDryRun = !isApply;
const langsArg = process.argv.find(arg => arg.startsWith('--langs='));
const targetLangs = new Set(
  langsArg
    ? langsArg.slice('--langs='.length).split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
    : ALL_LANGS
);
const DB_NAME = 'linguatube-vocab';
const R2_BUCKET = 'linguatube-transcripts';
const flag = isRemote ? '--remote' : '';

function parseJsonArray(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw !== 'string' || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function fetchCachedSegments(videoId, lang, rawSubAliases = []) {
  const candidates = [...new Set([lang, ...rawSubAliases].filter(Boolean))];
  for (const trackLang of candidates) {
    // 1. Read directly from R2 via wrangler (zero /api/transcript quota or rate-limit impact)
    try {
      const r2Args = ['-y', 'wrangler', 'r2', 'object', 'get', `${R2_BUCKET}/transcripts/${videoId}/${trackLang}.json`, '--pipe'];
      if (isRemote) r2Args.push('--remote');
      const raw = execFileSync('npx', r2Args, {
        cwd: projectRoot,
        encoding: 'utf8',
        maxBuffer: 15 * 1024 * 1024,
        stdio: ['ignore', 'pipe', 'ignore']
      });
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.segments) && parsed.segments.length > 0) {
        return parsed.segments;
      }
    } catch { /* fallback below */ }

    // 2. Fallback to public transcript endpoint when remote R2 CLI isn't available
    try {
      const res = await fetch('https://voca.study/api/transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Voca/1.2.4' },
        body: JSON.stringify({ videoId, lang: trackLang }),
        signal: AbortSignal.timeout(12000)
      });
      if (!res.ok) continue;
      const body = await res.json();
      if (Array.isArray(body?.segments) && body.segments.length > 0) {
        return body.segments;
      }
    } catch { /* try next alias */ }
  }
  return null;
}

console.log(`[Full Catalog Audit] Querying video_languages from D1 (mode: ${isRemote ? 'remote' : 'local'}, langs: ${[...targetLangs].join(',')}, apply: ${isApply ? 'YES' : 'NO (dry-run)'})...`);

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

console.log(`[Full Catalog Audit] Found ${rows.length} total videos in catalog. Auditing languages (${[...targetLangs].join(', ').toUpperCase()})...\n`);

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

    const rawSubList = parseJsonArray(row.sub_languages);
    const aliasesByLang = new Map();
    for (const rawSub of rawSubList) {
      const norm = normalizeLanguageCode(rawSub);
      if (!norm) continue;
      if (!aliasesByLang.has(norm)) aliasesByLang.set(norm, []);
      aliasesByLang.get(norm).push(rawSub);
    }

    const candidateLangs = [...new Set([
      ...Object.keys(levels),
      ...aliasesByLang.keys()
    ])].filter(lang => targetLangs.has(lang));

    const rawOriginalLevels = typeof row.levels === 'string' ? row.levels : JSON.stringify(row.levels || {});
    let videoModified = false;
    const newLevels = { ...levels };

    for (const lang of candidateLangs) {
      const data = typeof levels[lang] === 'object' && levels[lang] !== null ? levels[lang] : null;
      const titleMeta = detectLevelFromMetadata(row.title || '', row.channel || '', lang);
      const oldLevel = data?.level || 'NONE';
      const oldTier = data?.tier || 'NONE';
      const oldScore = data?.score ?? 'NONE';
      const oldMethod = data?.method || 'NONE';

      // Priority 1: Title/channel metadata ground truth
      if (titleMeta && titleMeta.lang === lang) {
        const expectedLevel = titleMeta.level;
        const expectedTier = labelToTier(expectedLevel) || 'intermediate';
        const expectedScore = levelToScore(expectedLevel);

        if (!data || oldLevel !== expectedLevel || oldTier !== expectedTier || oldMethod !== 'metadata') {
          newLevels[lang] = {
            ...(data || {}),
            level: expectedLevel,
            tier: expectedTier,
            score: expectedScore,
            confidence: 0.95,
            method: 'metadata',
            language: lang,
            isProvisional: false,
            updatedAt: Math.floor(Date.now() / 1000)
          };
          videoModified = true;
          summary.push({
            videoId: row.video_id,
            title: row.title,
            lang: lang.toUpperCase(),
            reason: data ? 'TITLE_METADATA' : 'BACKFILL_METADATA',
            from: `${oldLevel} (${oldTier}) [${oldMethod}]`,
            to: `${expectedLevel} (${expectedTier}) [metadata]`
          });
        }
        continue;
      }

      // Preserve protected or already versioned grades unless they fail label parity
      if (data && (protectedGrade(data) || (data.graderVersion >= GRADER_VERSION && !data.isProvisional))) {
        if (typeof data.score === 'number' && Number.isFinite(data.score)) {
          const expectedLevel = scoreToLevelLabel(data.score, lang);
          const expectedTier = scoreToTier(data.score, lang);
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
        continue;
      }

      // Priority 2: Grade missing tracks or recalibrate non-protected heuristic tracks using calibrated estimator
      const segments = await fetchCachedSegments(row.video_id, lang, aliasesByLang.get(lang));
      if (segments?.length > 0) {
        const est = estimateTranscriptLevel(segments, lang, { title: row.title, channel: row.channel });

        if (est) {
          const scoreDiff = typeof data?.score === 'number' ? Math.abs(est.score - data.score) : 1.0;
          const needsUpdate = !data || data.isProvisional || est.level !== oldLevel || est.tier !== oldTier || scoreDiff >= 0.4;
          if (needsUpdate) {
            newLevels[lang] = {
              ...(data || {}),
              level: est.level,
              tier: est.tier,
              score: est.score,
              confidence: est.confidence,
              method: est.method || 'server_heuristic',
              speechRateCpm: est.speechRateCpm,
              language: lang,
              isProvisional: false,
              updatedAt: Math.floor(Date.now() / 1000)
            };
            videoModified = true;
            summary.push({
              videoId: row.video_id,
              title: row.title,
              lang: lang.toUpperCase(),
              reason: data ? 'CALIBRATED_ESTIMATE' : 'BACKFILL_CACHED_TRACK',
              from: `${oldLevel} (${oldTier}) score=${oldScore}`,
              to: `${est.level} (${est.tier}) score=${est.score} [${est.method}]`
            });
          }
          continue;
        }
      }

      // Fallback if transcript fetch failed on existing row: enforce score <-> level parity
      if (data && typeof data.score === 'number' && Number.isFinite(data.score)) {
        const expectedLevel = scoreToLevelLabel(data.score, lang);
        const expectedTier = scoreToTier(data.score, lang);
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
    console.log(`[Full Catalog Audit] Rollback SQL script created at: ${rollbackSqlPath}`);

    const tempSqlPath = path.join(projectRoot, 'scratch_heal_all_catalog.sql');
    fs.writeFileSync(tempSqlPath, updates.join('\n'), 'utf8');

    console.log(`[Full Catalog Audit] Applying ${updates.length} updates to D1 (${DB_NAME})...`);
    try {
      const execArgs = ['-y', 'wrangler', 'd1', 'execute', DB_NAME, ...(isRemote ? ['--remote'] : []), '-y', `--file=${tempSqlPath}`];
      execFileSync('npx', execArgs, {
        cwd: projectRoot,
        stdio: 'inherit'
      });
      console.log(`\n[Full Catalog Audit] Successfully healed all video levels in D1!`);
    } catch (err) {
      console.error(`\n[Full Catalog Audit] Failed to execute updates on D1:`, err.message);
      console.error(`[Full Catalog Audit] Execute rollback via: npx wrangler d1 execute ${DB_NAME} ${flag} --file="${rollbackSqlPath}"`);
      process.exit(1);
    } finally {
      if (fs.existsSync(tempSqlPath)) {
        fs.unlinkSync(tempSqlPath);
      }
    }
  } else {
    console.log(`\n[Full Catalog Audit] All videos are already up to date. No changes needed.`);
  }
}

main().catch(err => {
  console.error('[Full Catalog Audit] Fatal error:', err);
  process.exit(1);
});
