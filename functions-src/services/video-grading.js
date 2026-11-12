import { getVideoLanguages, levelToScore } from '../data/video-info-db.js';
import { scoreVideoTranscript } from '../utils/video-grader.js';
import { enrichSegmentsWithTokens } from '../utils/tokenizer.js';
import {
    enqueueVideoGrade, GRADER_VERSION, protectedGrade, readGradingTranscript, serverGradingActive, transcriptRevision
} from './video-grading-jobs.js';

export async function calculateGrade(segments, language, deadline = Date.now() + 8000) {
    // Small chunks bound concurrent tokenizer work and let jobs defer after overrunning their budget.
    const cues = [];
    const step = Math.max(1, Math.ceil(segments.length / 2500));
    const sampled = segments.filter((_, index) => index % step === 0);
    for (let i = 0; i < sampled.length; i += 24) {
        if (Date.now() >= deadline) throw new Error('grading_deadline');
        // Grade fresh tokens so optional R2 enrichment cannot change the result.
        const clean = sampled.slice(i, i + 24).map(({ text, start, duration }) => ({ text, start, duration }));
        cues.push(...await enrichSegmentsWithTokens(clean, language));
    }
    if (Date.now() >= deadline) throw new Error('grading_deadline');
    return scoreVideoTranscript(cues, language);
}

export async function runVideoGrade(env, { videoId = null, language = null, deadline = Date.now() + 8000 } = {}) {
    const db = env.VOCAB_DB;
    const lease = crypto.randomUUID();
    const job = await db.prepare(`
        UPDATE video_grading_jobs SET lease=?, lease_until=unixepoch()+60, attempts=attempts+1
        WHERE (video_id,language) = (
            SELECT video_id,language FROM video_grading_jobs
            WHERE state='pending' AND grader_version=? AND due_at<=unixepoch()
              AND (lease_until IS NULL OR lease_until<=unixepoch())
              AND (? IS NULL OR (video_id=? AND language=?))
            ORDER BY due_at, video_id, language LIMIT 1
        ) RETURNING *
    `).bind(lease, GRADER_VERSION, videoId, videoId, language).first();
    if (!job) return false;
    const { video_id: id, language: lang, revision } = job;
    const finish = (state, error = null, result = null) => db.prepare(`
        UPDATE video_grading_jobs SET state=?, error_code=?, result=?, lease=NULL, lease_until=NULL
        WHERE video_id=? AND language=? AND revision=? AND lease=? AND lease_until>unixepoch()
    `).bind(state, error, result && JSON.stringify(result), id, lang, revision, lease).run();

    try {
        const saved = await readGradingTranscript(env, id, lang);
        if (!saved) throw new Error('caption_unavailable');
        if (await transcriptRevision(saved.segments) !== revision) {
            await enqueueVideoGrade(env, id, lang, { snapshot: saved, regrade: true });
            // If a newer observation could not replace this row, release the lease.
            await finish('unavailable', 'superseded_transcript');
            return true;
        }
        const old = (await getVideoLanguages(db, id))?.levels[lang];
        if (protectedGrade(old)) {
            await finish('ready');
            return true;
        }
        const grade = await calculateGrade(saved.segments, lang, deadline);
        if (!grade) {
            await finish('unavailable', 'insufficient_captions');
            return true;
        }
        const result = { ...grade, language: lang, isProvisional: false,
            graderVersion: GRADER_VERSION, transcriptRevision: revision, updatedAt: Math.floor(Date.now() / 1000) };
        if (old && !old.isProvisional && !job.allow_large_shift &&
            Math.abs(levelToScore(old.level) - levelToScore(result.level)) >= 2) {
            await finish('review', 'large_level_shift', result);
            return true;
        }

        const latest = await readGradingTranscript(env, id, lang);
        if (!latest) throw new Error('caption_unavailable');
        if (await transcriptRevision(latest.segments) !== revision) {
            await enqueueVideoGrade(env, id, lang, { snapshot: latest, regrade: true });
            await finish('unavailable', 'superseded_transcript');
            return true;
        }
        // Capture the exact previous entry and publish atomically. Other language entries remain untouched.
        const path = '$.' + lang;
        const guard = 'video_id=? AND language=? AND revision=? AND lease=? AND lease_until>unixepoch()';
        const fence = [id, lang, revision, lease];
        const statements = [
            db.prepare(`INSERT INTO video_languages (video_id,available_languages)
                SELECT ?, '[]' WHERE EXISTS (SELECT 1 FROM video_grading_jobs WHERE ${guard})
                ON CONFLICT(video_id) DO NOTHING`).bind(id, ...fence),
            db.prepare(`UPDATE video_grading_jobs SET previous_grade=(
                SELECT levels -> ? FROM video_languages WHERE video_id=? AND json_valid(levels)
            ) WHERE ${guard}`).bind(path, id, ...fence),
            db.prepare(`UPDATE video_languages SET levels=json_set(
                CASE WHEN json_valid(levels) THEN levels ELSE '{}' END, ?, json(?))
                WHERE video_id=? AND EXISTS (SELECT 1 FROM video_grading_jobs WHERE ${guard})
                AND NOT (
                    COALESCE(json_extract(CASE WHEN json_valid(levels) THEN levels ELSE '{}' END, ?), '') IN ('manual','admin','verified')
                    OR (COALESCE(json_extract(CASE WHEN json_valid(levels) THEN levels ELSE '{}' END, ?), 0) >= 0.90
                        AND json_extract(CASE WHEN json_valid(levels) THEN levels ELSE '{}' END, ?) IS NULL)
                )`).bind(path, JSON.stringify(result), id, ...fence, path + '.method', path + '.confidence', path + '.graderVersion'),
            db.prepare(`UPDATE video_grading_jobs SET state='ready', result=?, lease=NULL, lease_until=NULL
                WHERE ${guard}`).bind(JSON.stringify(result), ...fence),
        ];
        const [, , published] = await db.batch(statements);
        console.log(JSON.stringify({ event: 'video_grade_completed', language: lang,
            version: GRADER_VERSION, published: published.meta?.changes === 1,
            attempts: job.attempts, queuedSeconds: Math.max(0, Math.floor(Date.now() / 1000) - job.created_at) }));
        return true;
    } catch (error) {
        const code = ['grading_deadline', 'caption_unavailable'].includes(error.message) ? error.message : 'grading_failed';
        console.warn(JSON.stringify({ event: 'video_grade_attempt_failed', language: lang,
            version: GRADER_VERSION, attempts: job.attempts, terminal: job.attempts >= 6, code }));
        await db.prepare(`UPDATE video_grading_jobs SET lease=NULL, lease_until=NULL,
            state=?, due_at=unixepoch()+?, error_code=?
            WHERE video_id=? AND language=? AND revision=? AND lease=?`)
            .bind(job.attempts >= 6 ? 'unavailable' : 'pending', Math.min(3600, 30 * 2 ** job.attempts),
                code, id, lang, revision, lease).run();
        return true;
    }
}

export async function scheduleVideoGrade(env, videoId, language, options) {
    if (!serverGradingActive(env)) return;
    try {
        if (await enqueueVideoGrade(env, videoId, language, options)) {
            await runVideoGrade(env, { videoId, language });
        }
    } catch (error) {
        console.warn(JSON.stringify({ event: 'video_grade_deferred', videoId, language, error: error.name }));
    }
}
