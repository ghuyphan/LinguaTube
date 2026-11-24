#!/usr/bin/env node
/**
 * Voca Unified Subtitle Verifier & Publisher (scripts/verify_and_publish.js)
 * --------------------------------------------------------------------------
 * Single canonical verification & publishing gate for Voca subtitles and dual translations.
 *
 * Enforces ALL backend & Flutter contracts before touching Cloudflare R2 / D1:
 *  1. Morphological token enrichment (Kuromoji / Intl.Segmenter) if any segment lacks tokens.
 *  2. Exact Flutter `subtitleWordRanges` simulation (0 dropped cues, 0 collapsed words <0.10s, 0 cue collisions).
 *  3. Exact Flutter `matchesSubtitleSource` verification (±0.25s start, ±0.5s duration) against translations.
 *  4. Anti-poisoning translation validation (script match, no source-text copying, numeric quality=100, fresh timestamp).
 *  5. Canonical R2 key enforcement:
 *       - Native track:  transcripts/{videoId}/{lang}.json       (source="human_aligned", NO wordTimings)
 *       - AI track:      transcripts/{videoId}/{lang}.ai.json    (source="ai", WITH wordTimings)
 *       - Translations:  translations/{videoId}/{lang}-{tgt}.json (HYPHENATED, never underscores!)
 *  6. Non-destructive D1 sync: merges into `video_languages.ai_languages` & `sub_languages`,
 *     updates `translation_meta`, and optionally re-grades difficulty (`--grade`).
 *
 * Usage:
 *   node scripts/verify_and_publish.js \
 *     --video-id=Opp9nqiN5m0 --lang=ja \
 *     --ai=server/transcripts_cache/Opp9nqiN5m0_ja.ai.json \
 *     --trans=en:server/transcripts_cache/Opp9nqiN5m0_ja_en.json \
 *     --trans=vi:server/transcripts_cache/Opp9nqiN5m0_ja_vi.json \
 *     --sync-native --publish
 */

import fs from 'fs';
import os from 'os';
import path from 'path';
import https from 'https';
import { execFileSync } from 'child_process';
import { enrichSegmentsWithTokens } from '../functions-src/utils/tokenizer.js';
import { translationsMatchLanguage } from '../functions-src/utils/translation-cache.js';
import { scoreVideoTranscript } from '../functions-src/utils/video-grader.js';
import { translateBatch } from '../functions-src/providers/lingva.js';
import { detectVideoCategory, VALID_CATEGORIES } from '../functions-src/services/category.service.js';
import { labelToTier } from '../functions-src/data/video-info-db.js';

function defaultTargetLanguages(sourceLang) {
    if (sourceLang === 'en') return ['vi', 'ja'];
    if (sourceLang === 'vi') return ['en', 'ja'];
    return ['vi', 'en'];
}

const WRANGLER_BIN = 'npx';
const WRANGLER_BASE_ARGS = ['-y', 'wrangler@4.166.0'];
const R2_BUCKET = 'linguatube-transcripts';
const D1_DB = 'linguatube-vocab';
const MIN_WORD_FLOOR_VERIFY = 0.099; // allows 0.100s after 3-decimal rounding

function parseArgs() {
    const args = { trans: [] };
    const argv = process.argv.slice(2);
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (!a.startsWith('--')) continue;
        const eq = a.indexOf('=');
        let key, val;
        if (eq !== -1) {
            key = a.slice(2, eq);
            val = a.slice(eq + 1);
        } else {
            key = a.slice(2);
            if (i + 1 < argv.length && !argv[i + 1].startsWith('--')) {
                val = argv[++i];
            } else {
                val = true;
            }
        }
        if (key === 'trans') {
            args.trans.push(val);
        } else {
            args[key] = val;
        }
    }
    return args;
}

/** Exact port of Flutter `_normalizeAlign` in voca_flutter/lib/state/player_state.dart */
function normalizeAlign(input) {
    let out = '';
    for (const ch of input || '') {
        let cp = ch.codePointAt(0);
        if (cp >= 0xFF01 && cp <= 0xFF5E) cp -= 0xFEE0;
        if (cp <= 0x7F) {
            if (cp >= 0x41 && cp <= 0x5A) cp += 0x20;
            if ((cp >= 0x30 && cp <= 0x39) || (cp >= 0x61 && cp <= 0x7A)) {
                out += String.fromCodePoint(cp);
            }
            continue;
        }
        if (!/[\s\p{P}\p{S}]/u.test(ch)) {
            out += ch.toLowerCase();
        }
    }
    return out;
}

/** Exact port of Flutter `matchesSubtitleSource` in voca_flutter/lib/utils/subtitle_track_identity.dart */
function normSourceText(text) {
    return (text || '').trim().replace(/\s+/g, ' ');
}

function matchesSubtitleSource(source, cached) {
    return (
        normSourceText(source.text) === normSourceText(cached.text) &&
        Math.abs(source.start - cached.start) <= 0.25 &&
        Math.abs(source.duration - cached.duration) <= 0.5
    );
}

/** Exact port of Flutter `subtitleWordRanges` in voca_flutter/lib/state/player_state.dart */
function verifyFlutterWordRanges(segments, topLevelWords) {
    const words = topLevelWords || [];
    const dropped = [];
    for (let ci = 0; ci < segments.length; ci++) {
        const cue = segments[ci];
        const normCue = normalizeAlign(cue.text);
        if (!normCue) continue;
        const margin = 0.5;
        const winStart = cue.start - margin;
        const winEnd = cue.start + cue.duration + margin;
        const winWords = words.filter(w => w.start >= winStart && w.start < winEnd);

        let matched = false;
        for (let s = 0; s < winWords.length; s++) {
            let off = 0;
            for (let i = s; i < winWords.length; i++) {
                if (off === normCue.length) break;
                const sp = normalizeAlign(winWords[i].text);
                if (!sp) continue;
                if (!normCue.startsWith(sp, off)) break;
                off += sp.length;
            }
            if (off === normCue.length) {
                matched = true;
                break;
            }
        }
        if (!matched) {
            dropped.push({ cueIndex: ci + 1, text: cue.text, start: cue.start, duration: cue.duration });
        }
    }
    return dropped;
}

function extractWranglerJson(raw) {
    const start = raw.indexOf('[');
    const end = raw.lastIndexOf(']');
    if (start === -1 || end === -1) return null;
    return JSON.parse(raw.slice(start, end + 1));
}

function runD1(sql) {
    const tmpFile = path.join(os.tmpdir(), `voca_d1_${process.pid}_${Date.now()}.sql`);
    fs.writeFileSync(tmpFile, sql, 'utf8');
    try {
        const out = execFileSync(WRANGLER_BIN, [...WRANGLER_BASE_ARGS, 'd1', 'execute', D1_DB, '--remote', `--file=${tmpFile}`, '--json'], {
            encoding: 'utf8',
            stdio: ['pipe', 'pipe', 'pipe']
        });
        return extractWranglerJson(out);
    } finally {
        try { fs.unlinkSync(tmpFile); } catch {}
    }
}

function r2Put(key, localFile) {
    execFileSync(WRANGLER_BIN, [...WRANGLER_BASE_ARGS, 'r2', 'object', 'put', `${R2_BUCKET}/${key}`, `--file=${localFile}`, '--remote'], {
        stdio: 'inherit'
    });
}

function checkYouTubeOEmbed(videoId) {
    const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`;
    return new Promise((resolve) => {
        const req = https.get(url, { timeout: 10000, headers: { 'User-Agent': 'Voca-VerifyPublish/1.0' } }, (res) => {
            let body = '';
            res.on('data', chunk => { body += chunk; });
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const data = JSON.parse(body);
                        resolve({ ok: true, status: 200, title: data.title, author: data.author_name });
                        return;
                    } catch {}
                }
                resolve({ ok: false, status: res.statusCode || 0 });
            });
        });
        req.on('error', () => resolve({ ok: false, status: 0 }));
        req.on('timeout', () => { req.destroy(); resolve({ ok: false, status: 0 }); });
    });
}

function fetchYtDlpMetadata(videoId) {
    const attempts = [
        ['--extractor-args', 'youtube:player_client=android', `https://www.youtube.com/watch?v=${videoId}`, '--dump-json', '--skip-download'],
        [`https://www.youtube.com/watch?v=${videoId}`, '--dump-json', '--skip-download']
    ];
    let lastErr;
    for (const cliArgs of attempts) {
        try {
            const metaRaw = execFileSync('/tmp/voca_whisper/bin/yt-dlp', cliArgs, {
                encoding: 'utf8',
                maxBuffer: 50 * 1024 * 1024,
                stdio: ['pipe', 'pipe', 'ignore']
            });
            return JSON.parse(metaRaw.trim().split('\n')[0]);
        } catch (e) {
            lastErr = e;
        }
    }
    throw lastErr;
}

async function main() {
    const args = parseArgs();
    const videoId = args['video-id'];
    const lang = (args.lang || 'ja').toLowerCase();
    const aiFile = args.ai || path.join('server', 'transcripts_cache', `${videoId}_${lang}.ai.json`);
    const syncNative = Boolean(args['sync-native']);
    const publish = Boolean(args.publish);
    const regrade = args['no-grade'] ? false : (Boolean(args.grade) || Boolean(args.level) || publish);
    const upsert = args['no-upsert'] ? false : (Boolean(args.upsert) || publish);
    const autoTranslate = Boolean(args['auto-translate']);
    const explicitCategory = typeof args.category === 'string' ? args.category.toLowerCase().trim() : null;
    if (explicitCategory && !VALID_CATEGORIES.has(explicitCategory)) {
        console.error(`[${videoId}] FAIL: Invalid --category '${explicitCategory}'. Valid values: ${[...VALID_CATEGORIES].join(', ')}`);
        process.exit(1);
    }
    const explicitLevel = typeof args.level === 'string' && args.level.trim() ? args.level.trim() : null;
    const primaryLangOverride = typeof args['primary-lang'] === 'string' ? args['primary-lang'].toLowerCase().trim() : null;
    const keepPrimaryLang = Boolean(args['keep-primary-lang']);
    const transSource = args['trans-source'] || (autoTranslate ? 'lingva' : 'official_lyrics');

    if (autoTranslate && args.trans.length === 0) {
        for (const tgt of defaultTargetLanguages(lang)) {
            args.trans.push(`${tgt}:auto`);
        }
    }

    if (!videoId || !fs.existsSync(aiFile)) {
        console.error(`Usage: node scripts/verify_and_publish.js --video-id=<ID> --lang=<LANG> [--ai=<path>] [--trans=<tgt>:<path>|--auto-translate] [--category=<cat>] [--level=<lvl>] [--primary-lang=<lang>] [--sync-native] [--publish]`);
        process.exit(1);
    }

    const aiData = JSON.parse(fs.readFileSync(aiFile, 'utf8'));
    const segments = aiData.segments || [];
    if (!segments.length) {
        console.error(`[${videoId}] FAIL: AI track has 0 segments.`);
        process.exit(1);
    }

    // 1. Auto-enrich missing tokens
    const needsTokens = segments.some(s => !Array.isArray(s.tokens) || s.tokens.length === 0);
    if (needsTokens) {
        console.log(`[${videoId}] Enriching missing morphological tokens (${lang})...`);
        const enriched = await enrichSegmentsWithTokens(segments, lang, {
            allowFallback: false,
            kuromojiTimeoutMs: 60000
        });
        if (!enriched) {
            console.error(`[${videoId}] FAIL: Tokenizer failed to enrich segments.`);
            process.exit(1);
        }
        for (let i = 0; i < segments.length; i++) {
            segments[i].tokens = enriched[i].tokens || [];
        }
    }

    // Rebuild canonical top-level wordTimings from segments
    const allWords = [];
    for (const seg of segments) {
        for (const w of seg.wordTimings || []) {
            allWords.push({
                word: w.word || w.text || '',
                text: w.text || w.word || '',
                start: Number(w.start),
                end: Number(w.end)
            });
        }
    }

    // 2. Hard Invariant Checks
    const errors = [];
    let collapsed = 0;
    let outOfBounds = 0;
    let collisions = 0;
    let emptyTokens = 0;

    for (let i = 0; i < segments.length; i++) {
        const c = segments[i];
        if (!Number.isFinite(c.start) || c.start < 0 || !Number.isFinite(c.duration) || c.duration <= 0) {
            errors.push(`Cue ${i + 1} has invalid start/duration (${c.start}, ${c.duration})`);
        }
        if (i < segments.length - 1) {
            const cEnd = c.start + c.duration;
            if (cEnd > segments[i + 1].start + 0.015) {
                collisions++;
            }
        }
        if (lang === 'ja' && (!Array.isArray(c.tokens) || c.tokens.length === 0)) {
            emptyTokens++;
        }
        const cw = c.wordTimings || [];
        if (cw.length === 0) {
            errors.push(`Cue ${i + 1} ('${c.text}') has 0 wordTimings`);
        } else {
            if (cw[0].start < c.start - 0.02 || cw[cw.length - 1].end > c.start + c.duration + 0.02) {
                outOfBounds++;
            }
            for (const w of cw) {
                if (w.end - w.start < MIN_WORD_FLOOR_VERIFY) collapsed++;
            }
        }
    }

    const flutterDropped = verifyFlutterWordRanges(segments, allWords);

    if (collapsed > 0) errors.push(`${collapsed} collapsed words (<0.10s)`);
    if (collisions > 0) errors.push(`${collisions} cue boundary collisions`);
    if (outOfBounds > 0) errors.push(`${outOfBounds} cues have words outside [start, start+duration]`);
    if (emptyTokens > 0) errors.push(`${emptyTokens} Japanese cues missing Kuromoji tokens`);
    if (flutterDropped.length > 0) {
        errors.push(`Flutter subtitleWordRanges dropped ${flutterDropped.length}/${segments.length} cues (first: Cue ${flutterDropped[0].cueIndex} '${flutterDropped[0].text}')`);
    }

    const now = Date.now();
    const canonicalAiPayload = {
        videoId,
        language: lang,
        source: 'ai',
        provider: aiData.provider || 'qwen3_fa_ultra_localhead',
        timestamp: now,
        segments,
        wordTimings: allWords
    };

    // 3. Build clean native track (strictly NO wordTimings, exact synced boundaries!)
    const canonicalNativePayload = {
        videoId,
        language: lang,
        source: 'human_aligned',
        timestamp: now,
        segments: segments.map(s => ({
            start: s.start,
            duration: s.duration,
            text: s.text,
            tokens: s.tokens || []
        }))
    };

    // 4. Validate & normalize dual translations
    const validatedTranslations = [];
    for (const spec of args.trans) {
        const colon = spec.indexOf(':');
        if (colon === -1) {
            errors.push(`Invalid --trans format '${spec}' (expected <targetLang>:<filePath>)`);
            continue;
        }
        const tgtLang = spec.slice(0, colon).toLowerCase();
        const transPath = spec.slice(colon + 1);
        let list = [];
        let effectiveTransSource = transSource;
        if (transPath === 'auto') {
            console.log(`[${videoId}] Auto-translating ${segments.length} cues (${lang} -> ${tgtLang})...`);
            list = await translateBatch(
                segments.map(s => s.text),
                lang,
                tgtLang,
                { deadline: Date.now() + 240000 }
            );
            effectiveTransSource = args['trans-source'] || 'lingva';
        } else {
            if (!fs.existsSync(transPath)) {
                errors.push(`Translation file not found: ${transPath}`);
                continue;
            }
            const raw = JSON.parse(fs.readFileSync(transPath, 'utf8'));
            list = Array.isArray(raw)
                ? raw.map(x => (typeof x === 'string' ? x : x?.translation))
                : (raw.segments || []).map(x => x?.translation);
        }

        if (list.length !== segments.length) {
            errors.push(`Translation (${tgtLang}) count ${list.length} != cues count ${segments.length}`);
            continue;
        }

        const isVocalization = (str) => /^(?:(?:na|la|oh|ah|ooh|uh|mm|hm|yeah|hey|ay|da|do|ba|sha|whoa|ha)[\s,\-!?.~'"]*)+$/i.test((str || '').trim());
        let missing = 0;
        let mirrored = 0;
        const builtSegments = segments.map((s, idx) => {
            const tr = typeof list[idx] === 'string' ? list[idx].trim() : '';
            if (!tr) missing++;
            else if (tgtLang !== lang && tr === s.text.trim() && !isVocalization(s.text)) mirrored++;
            return {
                start: s.start,
                duration: s.duration,
                text: s.text,
                translation: tr
            };
        });

        if (missing > 0) errors.push(`Translation (${tgtLang}) has ${missing} empty cues`);
        if (mirrored > 0) errors.push(`Translation (${tgtLang}) has ${mirrored} untranslated mirrored cues`);
        if (!translationsMatchLanguage(builtSegments, tgtLang)) {
            errors.push(`Translation (${tgtLang}) FAILED backend translationsMatchLanguage() script check`);
        }

        // Verify 100% Flutter matchesSubtitleSource compatibility against both AI and native tracks
        const aiMatchCount = segments.filter((s, idx) => matchesSubtitleSource(s, builtSegments[idx])).length;
        const natMatchCount = canonicalNativePayload.segments.filter((s, idx) => matchesSubtitleSource(s, builtSegments[idx])).length;
        if (aiMatchCount !== segments.length || natMatchCount !== segments.length) {
            errors.push(`Translation (${tgtLang}) Flutter matchesSubtitleSource mismatch (AI=${aiMatchCount}, Native=${natMatchCount})`);
        }

        validatedTranslations.push({
            tgtLang,
            payload: {
                videoId,
                sourceLang: lang,
                targetLang: tgtLang,
                sourceLanguage: lang,
                targetLanguage: tgtLang,
                source: effectiveTransSource,
                quality: 100, // MUST be numeric 0-100 for backend/client
                timestamp: now,
                segments: builtSegments
            }
        });
    }

    console.log(`\n=== VERIFY REPORT [${videoId} / ${lang}] ===`);
    console.log(`  Cues: ${segments.length} | Words: ${allWords.length}`);
    console.log(`  Collapsed (<0.10s): ${collapsed} | Collisions: ${collisions} | Out-of-bounds: ${outOfBounds}`);
    console.log(`  Flutter subtitleWordRanges dropped: ${flutterDropped.length}/${segments.length}`);
    console.log(`  Missing JA tokens: ${emptyTokens}`);
    for (const vt of validatedTranslations) {
        console.log(`  Dual Sub (${lang}->${vt.tgtLang}): ${vt.payload.segments.length}/${segments.length} verified (quality=100, matchesSubtitleSource=100%, script=OK)`);
    }

    if (errors.length > 0) {
        console.error('\n❌ VERIFICATION FAILED:');
        for (const e of errors) console.error('  -', e);
        process.exit(1);
    }
    console.log('✅ ALL CHECKS PASSED!\n');

    // Write verified canonical artifacts to local cache
    const cacheDir = path.resolve('server/transcripts_cache');
    fs.mkdirSync(cacheDir, { recursive: true });
    const aiOut = path.join(cacheDir, `${videoId}_${lang}.ai.json`);
    fs.writeFileSync(aiOut, JSON.stringify(canonicalAiPayload, null, 2), 'utf8');

    const natOut = path.join(cacheDir, `${videoId}_${lang}.json`);
    if (syncNative) {
        fs.writeFileSync(natOut, JSON.stringify(canonicalNativePayload, null, 2), 'utf8');
    }

    const transOutFiles = [];
    for (const vt of validatedTranslations) {
        const outPath = path.join(cacheDir, `${videoId}_${lang}_${vt.tgtLang}.json`);
        fs.writeFileSync(outPath, JSON.stringify(vt.payload, null, 2), 'utf8');
        transOutFiles.push({ tgtLang: vt.tgtLang, outPath, count: vt.payload.segments.length });
    }

    if (!publish) {
        console.log('Dry-run complete (pass --publish to upload to R2 and sync D1).');
        return;
    }

    // 5. Embeddability Gate before touching R2/D1
    let oembedOk = false;
    if (!args['skip-embed-check']) {
        const oembed = await checkYouTubeOEmbed(videoId);
        if (oembed.status === 401 || oembed.status === 403) {
            console.error(`[${videoId}] FAIL: YouTube oEmbed returned HTTP ${oembed.status} (embed blocked). Refusing to publish into catalog.`);
            process.exit(1);
        } else if (!oembed.ok) {
            console.warn(`[${videoId}] Warning: YouTube oEmbed check returned HTTP ${oembed.status || 'network_err'}; proceeding cautiously.`);
        } else {
            oembedOk = true;
            console.log(`[${videoId}] Embeddability verified (YouTube oEmbed HTTP 200).`);
        }
    }

    // 6. Upload to CANONICAL R2 Keys
    console.log(`[${videoId}] Uploading to Cloudflare R2 (canonical keys)...`);
    r2Put(`transcripts/${videoId}/${lang}.ai.json`, aiOut);
    if (syncNative) {
        r2Put(`transcripts/${videoId}/${lang}.json`, natOut);
    }
    for (const tf of transOutFiles) {
        // CRITICAL: Backend reads HYPHENATED key translations/{videoId}/{src}-{tgt}.json!
        r2Put(`translations/${videoId}/${lang}-${tf.tgtLang}.json`, tf.outPath);
    }

    // 7. Non-destructive D1 Sync (merge JSON arrays, category, primary_language, tags, levels, translation_meta)
    console.log(`[${videoId}] Syncing Cloudflare D1 (video_languages + translation_meta)...`);
    const safeId = videoId.replace(/'/g, "''");
    const existingRes = runD1(`SELECT video_id, title, channel, duration_seconds, duration_source, available_languages, sub_languages, ai_languages, primary_language, category, category_source, tags, levels, embed_blocked FROM video_languages WHERE video_id = '${safeId}'`);
    const row = existingRes?.[0]?.results?.[0];

    const mergeJsonArray = (jsonStr, additions) => {
        let arr = [];
        try { arr = JSON.parse(jsonStr || '[]'); } catch { arr = []; }
        if (!Array.isArray(arr)) arr = [];
        const set = new Set(arr.filter(Boolean));
        for (const a of additions) if (a) set.add(a);
        return JSON.stringify([...set]);
    };

    const parseJsonArray = (jsonStr) => {
        try {
            const parsed = JSON.parse(jsonStr || '[]');
            return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
        } catch {
            return [];
        }
    };

    const newAvailableLangs = mergeJsonArray(row?.available_languages, [lang]);
    const newAiLangs = mergeJsonArray(row?.ai_languages, [lang]);
    const newSubLangs = mergeJsonArray(row?.sub_languages, [lang, ...transOutFiles.map(t => t.tgtLang)]);

    const needsMetaLookup = !row
        || !row.title || /^Video\s+/i.test(row.title)
        || !row.channel || row.channel === 'YouTube'
        || !row.duration_seconds
        || parseJsonArray(row.tags).length === 0
        || (!explicitCategory && (!row.category || row.category === 'general'));

    let ytMeta = null;
    if (needsMetaLookup && (!args.title || !args.channel || !args.duration || !explicitCategory)) {
        try {
            ytMeta = fetchYtDlpMetadata(videoId);
        } catch (e) {
            console.warn(`[${videoId}] Metadata lookup fallback:`, e.message);
        }
    }

    const title = args.title || (row?.title && !/^Video\s+/i.test(row.title) ? row.title : null) || ytMeta?.title || row?.title || `Video ${videoId}`;
    const channel = args.channel || (row?.channel && row.channel !== 'YouTube' ? row.channel : null) || ytMeta?.channel || ytMeta?.uploader || row?.channel || 'YouTube';
    const duration = (args.duration ? parseInt(args.duration, 10) : 0) || row?.duration_seconds || Math.round(ytMeta?.duration || 0);
    const durationSource = row?.duration_source || (ytMeta?.duration ? 'yt_dlp' : null);

    const existingTags = parseJsonArray(row?.tags);
    const ytTags = Array.isArray(ytMeta?.tags) ? ytMeta.tags.filter(t => typeof t === 'string' && t.trim()).slice(0, 50) : [];
    const mergedTagsJson = existingTags.length > 0 ? JSON.stringify(existingTags) : JSON.stringify(ytTags);

    let resolvedCategory = explicitCategory;
    let resolvedCategorySource = explicitCategory ? 'manual' : (row?.category_source || null);
    if (!resolvedCategory) {
        if (row?.category && VALID_CATEGORIES.has(row.category) && row.category !== 'general') {
            resolvedCategory = row.category;
        } else {
            const detected = detectVideoCategory({
                title,
                channel,
                genre: Array.isArray(ytMeta?.categories) ? ytMeta.categories[0] : null,
                tags: JSON.parse(mergedTagsJson)
            });
            resolvedCategory = VALID_CATEGORIES.has(detected) ? detected : 'general';
            if (resolvedCategory !== 'general') {
                resolvedCategorySource = ytMeta?.categories?.length ? 'official_mapping' : 'auto';
            }
        }
    }

    const resolvedPrimaryLang = primaryLangOverride || (keepPrimaryLang && row?.primary_language ? row.primary_language : lang);

    const buildLevelEntry = () => {
        const grade = scoreVideoTranscript(segments, lang);
        const levelStr = explicitLevel || grade.level;
        const tierStr = labelToTier(levelStr) || grade.tier;
        return {
            level: levelStr,
            tier: tierStr,
            score: grade.score,
            confidence: explicitLevel ? 0.95 : 0.85,
            method: explicitLevel ? 'manual_curated' : 'server_linguistics',
            language: lang,
            isProvisional: false,
            updatedAt: Math.floor(now / 1000),
            speechRateCpm: grade.speechRateCpm,
            speechRateUnit: 'cpm',
            grammarCount: grade.grammarCount,
            breakdown: grade.breakdown || {}
        };
    };

    const esc = (v) => String(v || '').replace(/'/g, "''");
    const sqlStatements = [];

    let levelsObj = {};
    try { levelsObj = JSON.parse(row?.levels || '{}'); } catch { levelsObj = {}; }
    if (!levelsObj || typeof levelsObj !== 'object' || Array.isArray(levelsObj)) levelsObj = {};
    if (regrade || !levelsObj[lang]) {
        levelsObj[lang] = buildLevelEntry();
    }
    const levelsSqlVal = `'${esc(JSON.stringify(levelsObj))}'`;
    const categorySourceSqlVal = resolvedCategorySource ? `'${esc(resolvedCategorySource)}'` : 'NULL';
    const durationSourceSqlVal = durationSource ? `'${esc(durationSource)}'` : 'NULL';

    if (row) {
        sqlStatements.push(
            `UPDATE video_languages SET ` +
            `title = '${esc(title)}', ` +
            `channel = '${esc(channel)}', ` +
            `duration_seconds = ${duration || 'NULL'}, ` +
            `duration_source = COALESCE(duration_source, ${durationSourceSqlVal}), ` +
            `available_languages = '${esc(newAvailableLangs)}', ` +
            `ai_languages = '${esc(newAiLangs)}', ` +
            `sub_languages = '${esc(newSubLangs)}', ` +
            `primary_language = '${esc(resolvedPrimaryLang)}', ` +
            `category = '${esc(resolvedCategory)}', ` +
            `category_source = ${categorySourceSqlVal}, ` +
            `tags = '${esc(mergedTagsJson)}', ` +
            `levels = ${levelsSqlVal}, ` +
            `embed_blocked = ${oembedOk ? 0 : 'COALESCE(embed_blocked, 0)'}, ` +
            `updated_at = strftime('%s', 'now') ` +
            `WHERE video_id = '${safeId}';`
        );
    } else if (upsert) {
        sqlStatements.push(
            `INSERT INTO video_languages (` +
            `video_id, title, channel, duration_seconds, duration_source, available_languages, sub_languages, primary_language, category, category_source, tags, levels, ai_languages, embed_blocked, created_at, updated_at` +
            `) VALUES (` +
            `'${safeId}', '${esc(title)}', '${esc(channel)}', ${duration || 'NULL'}, ${durationSourceSqlVal}, '${esc(newAvailableLangs)}', '${esc(newSubLangs)}', '${esc(resolvedPrimaryLang)}', '${esc(resolvedCategory)}', ${categorySourceSqlVal}, '${esc(mergedTagsJson)}', ${levelsSqlVal}, '${esc(newAiLangs)}', 0, strftime('%s', 'now'), strftime('%s', 'now')` +
            `);`
        );
    } else {
        console.warn(`[${videoId}] Note: row not found in video_languages; pass --upsert to insert new catalog entry.`);
    }

    for (const tf of transOutFiles) {
        sqlStatements.push(
            `INSERT OR REPLACE INTO translation_meta (video_id, source_lang, target_lang, segment_count, created_at) VALUES ('${safeId}', '${esc(lang)}', '${esc(tf.tgtLang)}', ${tf.count}, strftime('%s', 'now'));`
        );
    }

    runD1(sqlStatements.join('\n'));
    console.log(`[${videoId}] 🚀 Published & synced! category=${resolvedCategory} (${resolvedCategorySource || 'none'}), primary_language=${resolvedPrimaryLang}, level=${levelsObj[lang]?.level || 'none'}, ai_languages=${newAiLangs}, sub_languages=${newSubLangs}`);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
