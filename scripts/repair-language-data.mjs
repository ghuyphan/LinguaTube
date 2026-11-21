#!/usr/bin/env node
/**
 * Idempotent D1/R2 Language Integrity Audit & Repair Script
 *
 * Dry-run by default. Pass `--apply` to execute D1/R2 repairs.
 * Usage:
 *   node scripts/repair-language-data.mjs [--apply] [--local]
 */

import { execFile, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import { gunzipSync } from 'node:zlib';

import { inferSpokenLanguage } from '../functions-src/services/video-language.service.js';
import {
    contradictsNativeLanguage,
    inferTranscriptScriptLanguage,
    normalizeLanguageCode,
} from '../functions-src/utils/transcript-utils.js';
import { enrichSegmentsWithTokens } from '../functions-src/utils/tokenizer.js';
import { SUPPORTED_LEARNING_LANGUAGE_SET } from '../functions-src/utils/utils.js';

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const DB_NAME = 'linguatube-vocab';
const R2_BUCKET = 'linguatube-transcripts';

const apply = process.argv.includes('--apply');
const isRemote = !process.argv.includes('--local');
const remoteArgs = isRemote ? ['--remote'] : [];

function runWranglerSync(args) {
    return execFileSync('npx', ['-y', 'wrangler', ...args], {
        cwd: projectRoot,
        encoding: 'utf8',
        maxBuffer: 20 * 1024 * 1024,
        stdio: ['ignore', 'pipe', 'pipe'],
    });
}

async function getR2Json(key) {
    try {
        const { stdout } = await execFileAsync('npx', ['-y', 'wrangler', 'r2', 'object', 'get', `${R2_BUCKET}/${key}`, ...remoteArgs, '--pipe'], {
            cwd: projectRoot,
            encoding: 'buffer',
            maxBuffer: 15 * 1024 * 1024,
        });
        const bytes = stdout[0] === 0x1f && stdout[1] === 0x8b ? gunzipSync(stdout) : stdout;
        return JSON.parse(bytes.toString('utf8'));
    } catch {
        return null;
    }
}

function putR2Json(key, data) {
    const tmpFile = path.join(os.tmpdir(), `repair_${Date.now()}_${path.basename(key)}`);
    fs.writeFileSync(tmpFile, JSON.stringify(data), 'utf8');
    try {
        runWranglerSync(['r2', 'object', 'put', `${R2_BUCKET}/${key}`, '-f', tmpFile, ...remoteArgs]);
    } finally {
        fs.rmSync(tmpFile, { force: true });
    }
}

function deleteR2(key) {
    runWranglerSync(['r2', 'object', 'delete', `${R2_BUCKET}/${key}`, ...remoteArgs]);
}

function parseArray(raw) {
    try {
        const parsed = JSON.parse(raw || '[]');
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function parseObj(raw) {
    try {
        const parsed = JSON.parse(raw || '{}');
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
        return {};
    }
}

const rawRows = runWranglerSync([
    'd1', 'execute', DB_NAME, ...remoteArgs, '--json', '--command',
    `SELECT vl.*,
            json_extract(vm.snippet_json, '$.defaultAudioLanguage') AS yt_audio,
            json_extract(vm.snippet_json, '$.defaultLanguage') AS yt_lang
     FROM video_languages vl
     LEFT JOIN verified_video_metadata vm ON vl.video_id = vm.video_id
     ORDER BY vl.updated_at DESC;`,
]);
const rows = JSON.parse(rawRows)?.[0]?.results || [];
console.log(`[Repair] Auditing ${rows.length} D1 rows (apply=${apply}, remote=${isRemote})...\n`);

const sqlStatements = [];

async function auditRow(row) {
    const vid = row.video_id;
    const oldSub = parseArray(row.sub_languages).map(normalizeLanguageCode).filter(Boolean);
    const oldAi = parseArray(row.ai_languages).map(normalizeLanguageCode).filter(Boolean);
    const avail = parseArray(row.available_languages).map(normalizeLanguageCode).filter(Boolean);
    const oldLevels = parseObj(row.levels);

    const candidateLangs = [...new Set([...oldSub, ...oldAi])];
    const verifiedSub = [];
    const verifiedAi = [];
    const relocations = [];

    const fetched = await Promise.all(candidateLangs.flatMap(lang => [
        getR2Json(`transcripts/${vid}/${lang}.ai.json`).then(obj => ({ lang, isAi: true, obj })),
        getR2Json(`transcripts/${vid}/${lang}.json`).then(obj => ({ lang, isAi: false, obj })),
    ]));

    for (const { lang, isAi, obj } of fetched) {
        if (!obj?.segments?.length) continue;
        if (contradictsNativeLanguage(obj.segments, lang)) {
            relocations.push({ fromLang: lang, toLang: inferTranscriptScriptLanguage(obj.segments), isAi, obj });
        } else {
            if (!verifiedSub.includes(lang)) verifiedSub.push(lang);
            if ((isAi || obj.source === 'ai') && !verifiedAi.includes(lang)) verifiedAi.push(lang);
        }
    }

    for (const { fromLang, toLang, isAi, obj } of relocations) {
        if (toLang && SUPPORTED_LEARNING_LANGUAGE_SET.has(toLang)) {
            if (!verifiedSub.includes(toLang)) verifiedSub.push(toLang);
            if (isAi && !verifiedAi.includes(toLang)) verifiedAi.push(toLang);
            const targetKey = `transcripts/${vid}/${toLang}${isAi ? '.ai' : ''}.json`;
            const sourceKey = `transcripts/${vid}/${fromLang}${isAi ? '.ai' : ''}.json`;
            console.log(`[R2 MOVE+RETOKENIZE] ${vid}: ${sourceKey} -> ${targetKey} (${obj.segments.length} cues)`);
            if (apply) {
                const cleanCues = obj.segments.map(({ start, duration, text }) => ({ start, duration, text }));
                const retokenized = await enrichSegmentsWithTokens(cleanCues, toLang);
                putR2Json(targetKey, { ...obj, language: toLang, segments: retokenized });
                deleteR2(sourceKey);
                if (fromLang === 'en') {
                    for (const t of ['vi', 'ja', 'ko', 'zh']) {
                        try { deleteR2(`translations/${vid}/en-${t}.json`); } catch { /* ignore */ }
                    }
                    sqlStatements.push(`DELETE FROM translation_meta WHERE video_id='${vid.replace(/'/g, "''")}' AND source_lang='en';`);
                }
            }
        }
    }

    const nextSub = [...new Set(verifiedSub)];
    const nextAi = [...new Set(verifiedAi)];
    const nextPrimary = inferSpokenLanguage({
        defaultAudioLanguage: row.yt_audio,
        defaultLanguage: row.yt_lang,
        title: row.title,
        channel: row.channel,
        tags: parseArray(row.tags),
        aiLanguages: nextAi,
        subLanguages: nextSub,
        availableLanguages: avail,
    });

    const nextLevels = { ...oldLevels };
    for (const key of Object.keys(nextLevels)) {
        if (key === 'overall' || key.endsWith('_meta')) continue;
        if (!nextSub.includes(key)) delete nextLevels[key];
    }

    const subChanged = JSON.stringify(nextSub) !== JSON.stringify(oldSub);
    const aiChanged = JSON.stringify(nextAi) !== JSON.stringify(oldAi);
    const primChanged = (nextPrimary ?? null) !== (row.primary_language ?? null);
    const levelsChanged = JSON.stringify(nextLevels) !== JSON.stringify(oldLevels);

    if (subChanged || aiChanged || primChanged || levelsChanged) {
        console.log(
            `[D1 UPDATE] ${vid} (${(row.title || '').slice(0, 45)}):` +
            (primChanged ? ` prim ${row.primary_language}->${nextPrimary}` : '') +
            (subChanged ? ` sub ${JSON.stringify(oldSub)}->${JSON.stringify(nextSub)}` : '') +
            (aiChanged ? ` ai ${JSON.stringify(oldAi)}->${JSON.stringify(nextAi)}` : '') +
            (levelsChanged ? ` levels ${JSON.stringify(Object.keys(oldLevels))}->${JSON.stringify(Object.keys(nextLevels))}` : ''),
        );
        const esc = s => String(s).replace(/'/g, "''");
        sqlStatements.push(
            `UPDATE video_languages SET ` +
            `primary_language=${nextPrimary ? `'${esc(nextPrimary)}'` : 'NULL'}, ` +
            `sub_languages='${esc(JSON.stringify(nextSub))}', ` +
            `ai_languages='${esc(JSON.stringify(nextAi))}', ` +
            `levels='${esc(JSON.stringify(nextLevels))}' ` +
            `WHERE video_id='${esc(vid)}';`,
        );
    }
}

for (let i = 0; i < rows.length; i += 4) {
    await Promise.all(rows.slice(i, i + 4).map(auditRow));
}

console.log(`\n[Repair] Summary: ${sqlStatements.length} SQL statements prepared.`);
if (apply && sqlStatements.length > 0) {
    const tmpSql = path.join(os.tmpdir(), `repair_${Date.now()}.sql`);
    fs.writeFileSync(tmpSql, sqlStatements.join('\n'), 'utf8');
    try {
        runWranglerSync(['d1', 'execute', DB_NAME, ...remoteArgs, '-y', '--file', tmpSql]);
        console.log('[Repair] Applied D1 updates successfully.');
    } finally {
        fs.rmSync(tmpSql, { force: true });
    }
} else if (!apply && sqlStatements.length > 0) {
    console.log('[Repair] Dry run only. Pass --apply to execute these repairs.');
}
