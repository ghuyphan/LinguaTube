import { getTranscriptFromR2 } from '../data/transcript-r2.js';
import { getVideoLanguages } from '../data/video-info-db.js';
import { normalizeLanguageCode } from '../utils/transcript-utils.js';

export const serverGradingActive = env => env?.SERVER_VIDEO_GRADING === '1';
export const serverGradingEnabled = env => serverGradingActive(env) || env?.SERVER_VIDEO_GRADING === 'paused';
export const GRADER_VERSION = 1;
export const gradingLanguages = ['ja', 'zh', 'ko', 'en'];

export async function transcriptRevision(segments) {
    const canonical = segments.map(({ text, start, duration }) =>
        [text.trim().replace(/\s+/g, ' '), start, duration]);
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(canonical)));
    return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
}

export const protectedGrade = grade => grade && !grade.isProvisional &&
    (['manual', 'admin', 'verified'].includes(grade.method) ||
        (grade.confidence >= 0.90 && !grade.graderVersion));

export async function readGradingTranscript(env, videoId, language, info) {
    const bucket = env.TRANSCRIPT_STORAGE;
    const exact = await getTranscriptFromR2(bucket, videoId, language);
    if (exact) return exact;
    info ??= await getVideoLanguages(env.VOCAB_DB, videoId);
    const aliases = [...new Set(info?.subLanguages ?? [])].filter(alias =>
        typeof alias === 'string' && /^[a-zA-Z0-9_-]{1,20}$/.test(alias) &&
        alias !== language && normalizeLanguageCode(alias) === language);
    for (const alias of aliases.slice(0, 2)) {
        const saved = await getTranscriptFromR2(bucket, videoId, alias);
        if (saved) return saved;
    }
    return null;
}

export async function enqueueVideoGrade(env, videoId, language, {
    snapshot, regrade = false, approveRevision = null,
} = {}) {
    language = normalizeLanguageCode(language);
    if (!serverGradingActive(env) || !gradingLanguages.includes(language)) return false;
    const db = env.VOCAB_DB;
    const info = await getVideoLanguages(db, videoId);
    const current = info?.levels[language];
    if (protectedGrade(current) || (!regrade && current && !current.isProvisional && !current.graderVersion)) return false;
    const saved = snapshot ?? await readGradingTranscript(env, videoId, language, info);
    if (!saved?.segments.length) return false;
    const revision = await transcriptRevision(saved.segments);
    if (current?.graderVersion > GRADER_VERSION) return false;
    if (current?.graderVersion === GRADER_VERSION && current.transcriptRevision === revision) return false;
    const approved = approveRevision === revision ? 1 : 0;
    await db.prepare(`
        INSERT INTO video_grading_jobs (video_id, language, revision, grader_version, published_at, allow_large_shift)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(video_id, language) DO UPDATE SET
            revision=excluded.revision, grader_version=excluded.grader_version,
            published_at=excluded.published_at, created_at=unixepoch(), allow_large_shift=excluded.allow_large_shift,
            state='pending', attempts=0, due_at=0, lease=NULL, lease_until=NULL,
            previous_grade=NULL, result=NULL, error_code=NULL
        WHERE excluded.grader_version >= video_grading_jobs.grader_version
          AND excluded.published_at >= video_grading_jobs.published_at
          AND (excluded.revision != video_grading_jobs.revision OR excluded.grader_version != video_grading_jobs.grader_version
            OR (video_grading_jobs.state='review' AND excluded.allow_large_shift=1))
    `).bind(videoId, language, revision, GRADER_VERSION, saved.publishedAt ?? 0, approved).run();
    return true;
}

export async function readGradeStatus(env, videoId, language) {
    const levels = (await getVideoLanguages(env.VOCAB_DB, videoId))?.levels ?? {};
    const grade = levels[language];
    if (grade && !grade.isProvisional) return { gradingStatus: 'ready', ...grade, levels };
    if (!serverGradingActive(env)) return { gradingStatus: 'unavailable', levels };
    const job = await env.VOCAB_DB.prepare(`
        SELECT state FROM video_grading_jobs WHERE video_id=? AND language=?
    `).bind(videoId, language).first();
    return { gradingStatus: job?.state === 'pending' ? 'pending' : 'unavailable', levels };
}

