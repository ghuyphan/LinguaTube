import { matchesSecret } from '../utils/secret-auth.js';
import { jsonResponse, handleOptions, sanitizeVideoId, sanitizeLanguage } from '../utils/utils.js';
import { getVideoLanguages, levelToScore } from '../data/video-info-db.js';
import { normalizeLanguageCode } from '../utils/transcript-utils.js';
import { validateAuthToken } from '../middlewares/auth.js';
import { calculateGrade, runVideoGrade } from '../services/video-grading.js';
import {
    enqueueVideoGrade, gradingLanguages, protectedGrade, readGradingTranscript, serverGradingActive, transcriptRevision
} from '../services/video-grading-jobs.js';

function restoreGrade(db, videoId, language, revision, version = null) {
    const path = '$.' + language;
    return db.prepare(`
        UPDATE video_languages SET levels=(
            SELECT CASE WHEN previous_grade IS NULL THEN json_remove(levels, ?)
                ELSE json_set(levels, ?, json(previous_grade)) END
            FROM video_grading_jobs WHERE video_id=? AND language=? AND revision=?
        )
        WHERE video_id=? AND levels -> ? = (
            SELECT result FROM video_grading_jobs
            WHERE video_id=? AND language=? AND revision=? AND state='ready'
            AND (? IS NULL OR grader_version=?)
        )
    `).bind(path, path, videoId, language, revision, videoId, path, videoId, language, revision, version, version);
}

export async function onRequest({ request, env }) {
    if (!['GET', 'POST'].includes(request.method)) return jsonResponse({ error: 'Method not allowed' }, 405);
    const authHeader = request.headers.get('Authorization') || '';
    const secret = request.headers.get('x-admin-secret') || '';
    const params = new URL(request.url).searchParams;
    const action = params.get('action') || 'backfill';
    let authorized = Boolean(env.HEAL_ADMIN_SECRET && secret && await matchesSecret(secret, env.HEAL_ADMIN_SECRET));
    if (!authorized && action === 'reconcile' && env.BACKEND_MAINTENANCE_SECRET) {
        authorized = await matchesSecret(authHeader, 'Bearer ' + env.BACKEND_MAINTENANCE_SECRET);
    }
    if (!authorized && authHeader) {
        const auth = await validateAuthToken(request, env);
        if (auth.response) return auth.response;
        authorized = auth.valid && (env.ADMIN_USER_IDS || '').split(',').map(id => id.trim()).includes(auth.user?.id);
    }
    if (!authorized) return jsonResponse({ error: 'Unauthorized' }, 401);

    const db = env.VOCAB_DB;
    if (!db) return jsonResponse({ error: 'Database VOCAB_DB binding missing' }, 500);
    const deadline = Date.now() + 12000;
    try {
        if (action === 'reconcile') {
            if (request.method !== 'POST' || !serverGradingActive(env)) {
                return jsonResponse({ error: 'Grading reconciliation unavailable' }, 503);
            }
            let processed = 0;
            while (processed < 5 && Date.now() < deadline && await runVideoGrade(env, { deadline })) processed++;
            const backlog = await db.prepare(`
                SELECT count(*) AS pending, min(created_at) AS oldest, max(attempts) AS maxAttempts
                FROM video_grading_jobs WHERE state='pending'
            `).first();
            console.log(JSON.stringify({ event: 'video_grading_reconcile', processed, ...backlog }));
            return jsonResponse({ success: true, processed, ...backlog }, 200);
        }

        const body = request.method === 'POST' ? await request.json().catch(() => ({})) : {};
        const rawVideo = body.videoId ?? params.get('videoId');
        const videoId = sanitizeVideoId(rawVideo);
        const rawCursor = body.cursor ?? params.get('cursor');
        const cursor = typeof rawCursor === 'string' && rawCursor.length <= 64 ? rawCursor : null;
        const rawLang = body.language ?? params.get('language');
        const language = sanitizeLanguage(normalizeLanguageCode(rawLang));
        if ((rawVideo && !videoId) || (rawCursor && !cursor) || (rawLang && !language)) {
            return jsonResponse({ error: 'Invalid video ID, cursor or language' }, 400);
        }
        const apply = request.method === 'POST' && body.dryRun === false;
        if (apply && action !== 'rollback' && !serverGradingActive(env)) return jsonResponse({ error: 'Server grading is disabled' }, 503);
        if (action === 'rollback') {
            if (!apply) return jsonResponse({ error: 'Rollback requires an explicit apply' }, 400);
            if (Number.isInteger(body.graderVersion) && body.graderVersion > 0 &&
                !videoId && !language && !body.revision) {
                const { results: rows } = await db.prepare(`
                    SELECT video_id, language, revision FROM video_grading_jobs
                    WHERE grader_version=? AND state='ready' AND result IS NOT NULL
                    AND video_id IN (
                        SELECT DISTINCT video_id FROM video_grading_jobs
                        WHERE grader_version=? AND state='ready' AND result IS NOT NULL AND video_id>?
                        ORDER BY video_id LIMIT 10
                    )
                    ORDER BY video_id, language
                `).bind(body.graderVersion, body.graderVersion, cursor || '').all();
                const results = rows.length ? await db.batch(rows.map(row =>
                    restoreGrade(db, row.video_id, row.language, row.revision, body.graderVersion))) : [];
                return jsonResponse({ success: true,
                    restored: results.filter(result => result.meta?.changes === 1).length,
                    nextCursor: rows.at(-1)?.video_id ?? null }, 200);
            }
            if (!videoId || !language || !/^[a-f0-9]{64}$/.test(body.revision || '')) {
                return jsonResponse({ error: 'Rollback requires a grader version or an explicit video, language and revision' }, 400);
            }
            const changed = await restoreGrade(db, videoId, language, body.revision).run();
            return jsonResponse({ success: true, restored: changed.meta?.changes === 1 }, 200);
        }
        if (action !== 'backfill') return jsonResponse({ error: 'Invalid action' }, 400);
        const approveRevision = body.approveRevision;
        if (approveRevision != null && (!apply || !videoId || !language || !/^[a-f0-9]{64}$/.test(approveRevision))) {
            return jsonResponse({ error: 'Approval requires an explicit video, language and revision' }, 400);
        }

        // A dry run tokenizes at most one video's tracks per request.
        const limit = apply ? 10 : 1;
        const { results: rows } = await db.prepare(`
            SELECT video_id, sub_languages FROM video_languages
            WHERE (? IS NULL OR video_id=?) AND video_id>? ORDER BY video_id LIMIT ?
        `).bind(videoId, videoId, cursor || '', limit + 1).all();
        const entries = [];
        let last = cursor;
        for (const row of rows.slice(0, limit)) {
            const id = row.video_id;
            const info = await getVideoLanguages(db, id);
            const knownTracks = new Set([
                ...(info?.subLanguages ?? []), ...(info?.availableLanguages ?? []), ...Object.keys(info?.levels ?? {}),
            ].map(normalizeLanguageCode));
            const tracks = language ? [language] : gradingLanguages.filter(lang => knownTracks.has(lang));
            if (!tracks.length) entries.push({ videoId: id, status: 'no_known_tracks' });
            for (const lang of tracks) {
                const old = info?.levels[lang];
                const entry = { videoId: id, language: lang, oldLevel: old?.level };
                if (protectedGrade(old)) {
                    entries.push({ ...entry, status: 'protected' });
                    continue;
                }
                const saved = await readGradingTranscript(env, id, lang, info);
                if (!saved) {
                    entries.push({ ...entry, status: 'no_cached_captions' });
                    continue;
                }
                const revision = await transcriptRevision(saved.segments);
                if (approveRevision && approveRevision !== revision) {
                    return jsonResponse({ error: 'Transcript changed since review' }, 409);
                }
                if (apply) {
                    const queued = await enqueueVideoGrade(env, id, lang, { snapshot: saved, regrade: true, approveRevision });
                    entries.push({ ...entry, revision, status: queued ? 'queued_or_existing' : 'current' });
                } else {
                    let grade;
                    try {
                        grade = await calculateGrade(saved.segments, lang, deadline);
                    } catch (error) {
                        if (error.message !== 'grading_deadline') throw error;
                        entries.push({ ...entry, revision, status: 'deadline' });
                        continue;
                    }
                    const review = old && grade && Math.abs(levelToScore(old.level) - levelToScore(grade.level)) >= 2;
                    entries.push({ ...entry, revision, newLevel: grade?.level, confidence: grade?.confidence,
                        status: !grade ? 'insufficient_captions' : review ? 'review' : 'candidate' });
                }
            }
            last = id;
            if (Date.now() >= deadline) break;
        }
        const nextCursor = !videoId && rows.length && last !== rows.at(-1).video_id ? last : null;
        return jsonResponse({ success: true, dryRun: !apply, entries, nextCursor }, 200);
    } catch (error) {
        console.warn(JSON.stringify({ event: 'video_grading_maintenance_failed', error: error.name }));
        return jsonResponse({ error: 'Grading maintenance unavailable' }, 503);
    }
}
