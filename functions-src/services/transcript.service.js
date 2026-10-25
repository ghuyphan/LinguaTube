import { enrichPublishedTranscript } from './transcript-enrichment.js';
import { ingestGladiaJob, recoverGladiaSubmission } from './gladia-recovery.js';
import { recoverJobRefund } from './refund-recovery.js';
/**
 * Service for orchestrating Transcripts (AI & Native)
 */

import {
    saveVideoLanguages,
    addVideoLanguages,
    addSubLanguage,
    markNoTranscript,
    deleteNoTranscript
} from '../data/video-info-db.js';

import {
    reserveAiJob,
    activateAiJob,
    getAiJobById,
    getActiveAiJob,
    atomicFailAndRefundAiJob
} from '../data/transcript-db.js';

import {
    getTranscriptFromR2,
    saveTranscriptToR2
} from '../data/transcript-r2.js';

import { cleanTranscriptSegments, normalizeLanguageCode, extractGladiaSegments, extractGladiaDetectedLanguage } from '../utils/transcript-utils.js';
import { fetchYouTubeVideoDetails, resolveVideoChannelAvatar } from '../middlewares/video-validator.js';
import { getTierDiamondConfig, transcriptionDiamondCost } from './diamond.service.js';
import { generateDerivedWebhookToken } from '../utils/svix-verifier.js';
import { estimateTranscriptLevel } from '../utils/level-estimator.js';

const MAX_AI_VIDEO_DURATION_SECONDS = 45 * 60;   // 45 minutes (maximum ceiling across any tier)

export class TranscriptService {
    /**
     * @param {Object} supadataProvider 
     * @param {Object} gladiaProvider 
     * @param {Object} diamondService 
     * @param {Object} cacheManager 
     */
    constructor(supadataProvider, gladiaProvider, diamondService, cacheManager) {
        this.supadataProvider = supadataProvider;
        this.gladiaProvider = gladiaProvider;
        this.diamondService = diamondService;
        this.cacheManager = cacheManager;
    }

    /**
     * Try fetching native captions using the Supadata Provider
     */
    async fetchNativeCaptions(context, videoId, lang, options = {}) {
        // Assume context object contains { db, r2, cache, env, waitUntil, ... }
        const { db, r2, cache, env, waitUntil } = context;

        // Fetch captions via Provider
        const nativeResult = await this.supadataProvider.fetchCaptions(videoId, lang, cache);

        if (nativeResult?.segments?.length > 0) {
            const actualLang = normalizeLanguageCode(nativeResult.detectedLang) || normalizeLanguageCode(lang) || lang;
            const cleanedSegments = cleanTranscriptSegments(nativeResult.segments);

            const rawAvailable = nativeResult.availableLangs?.length > 0 ? nativeResult.availableLangs : [actualLang];
            const availableLangs = Array.from(new Set(rawAvailable.map(l => normalizeLanguageCode(l) || l)));
            if (!availableLangs.includes(actualLang)) {
                availableLangs.unshift(actualLang);
            }

            // Self-heal: Derive duration from cleanedSegments if options.duration is missing
            let effectiveDuration = options.duration || null;
            if (!effectiveDuration && cleanedSegments.length > 0) {
                const last = cleanedSegments[cleanedSegments.length - 1];
                const inferred = Math.round((last.start || 0) + (last.duration || 0));
                if (inferred > 0) effectiveDuration = inferred;
            }

            // Background async persistence and morphological enrichment
            // Persist useful captions before any optional enrichment work.
            const backgroundSaveTask = async () => {
                const persisted = await saveTranscriptToR2(r2, videoId, actualLang, cleanedSegments, nativeResult.source || 'supadata');
                const enrichedSegments = cleanedSegments;
                const savePromises = [
                    ...(persisted ? [addSubLanguage(db, videoId, actualLang)] : []),
                    deleteNoTranscript(db, videoId, actualLang, 'native')
                ];

                let avatar = options.channelAvatar || null;
                if (!avatar && db && (options.title || options.channel || effectiveDuration)) {
                    try { avatar = await resolveVideoChannelAvatar(videoId); } catch { }
                }
                const estimatedLevel = estimateTranscriptLevel(enrichedSegments, actualLang, { title: options.title, channel: options.channel });
                const levelsObj = estimatedLevel ? { [actualLang]: estimatedLevel } : null;

                savePromises.push(saveVideoLanguages(
                    db,
                    videoId,
                    availableLangs,
                    effectiveDuration,
                    options.title || null,
                    options.channel || null,
                    false,
                    levelsObj,
                    avatar,
                    persisted ? [actualLang] : null
                ));

                await Promise.allSettled(savePromises);
                if (persisted) await enrichPublishedTranscript(r2, videoId, actualLang);
            };

            if (waitUntil) {
                waitUntil(backgroundSaveTask());
            } else {
                await backgroundSaveTask();
            }

            return {
                ...nativeResult,
                segments: cleanedSegments,
                detectedLang: actualLang,
                availableLangs
            };
        }

        // If native captions for requested lang were not found, but other languages are available (e.g. video is in zh, user asked for ja)
        if (nativeResult?.availableLangs?.length > 0) {
            const normalizedAvailable = Array.from(new Set(nativeResult.availableLangs.map(l => normalizeLanguageCode(l) || l)));
            const savePromises = [];
            if (options.title || options.channel || options.duration) {
                const saveLanguages = async () => {
                    let avatar = options.channelAvatar || null;
                    if (!avatar && db) {
                        try { avatar = await resolveVideoChannelAvatar(videoId); } catch { }
                    }
                    await saveVideoLanguages(
                        db,
                        videoId,
                        normalizedAvailable,
                        options.duration || null,
                        options.title || null,
                        options.channel || null,
                        false,
                        null,
                        avatar
                    );
                };
                savePromises.push(saveLanguages());
            } else {
                savePromises.push(addVideoLanguages(db, videoId, normalizedAvailable));
            }
            if (waitUntil) {
                waitUntil(Promise.allSettled(savePromises));
            } else {
                await Promise.allSettled(savePromises);
            }
            return {
                segments: [],
                availableLangs: normalizedAvailable,
                languageMismatch: true
            };
        }

        // Only cache failure if the provider explicitly confirmed captions do NOT exist (404/notFound).
        // Never poison the negative cache on transient network failures, timeouts, or exhausted keys!
        if (nativeResult?.notFound && env.SUPADATA_API_KEY) {
            const negativeOps = [
                markNoTranscript(db, cache, videoId, lang, 'native')
            ];
            // Only mark global wildcard if the entire video was confirmed to have 0 caption tracks
            if (!lang || lang === '*' || nativeResult.allTracksEmpty) {
                negativeOps.push(markNoTranscript(db, cache, videoId, '*', 'native'));
                if (options.title || options.channel || options.duration) {
                    negativeOps.push(saveVideoLanguages(
                        db,
                        videoId,
                        [],
                        options.duration || null,
                        options.title || null,
                        options.channel || null,
                        false,
                        null,
                        options.channelAvatar || null
                    ));
                }
            }
            const runOps = Promise.allSettled(negativeOps);
            if (waitUntil) {
                waitUntil(runOps);
            } else {
                await runOps;
            }
        }

        return nativeResult;
    }

    /**
     * Start an AI Transcription Job using Gladia
     */
    async startAIJob(context, params) {
        const db = context.db || context.env?.VOCAB_DB;
        const r2 = context.r2 || context.env?.TRANSCRIPT_STORAGE;
        const env = context.env || {};
        const { videoId, lang, clientId, user, diamondInfo, availableLanguages } = params;

        const normalizedLang = normalizeLanguageCode(lang);

        // 2. Check if an AI transcript already exists in R2 for this language (avoid duplicate diamond charges)
        const existingR2 = await getTranscriptFromR2(r2, videoId, normalizedLang);
        if (existingR2?.segments?.length > 0 && existingR2.source === 'ai') {
            return {
                status: 'done',
                videoInfo: {
                    videoId,
                    language: normalizedLang,
                    requestedLanguage: normalizedLang,
                    segments: existingR2.segments,
                    source: 'ai',
                    sourceDetail: existingR2.source,
                    availableLanguages: params.availableLanguages
                }
            };
        }

        // Refresh joins existing work; it never cancels somebody else's charge.
        const activeJob = await getActiveAiJob(db, videoId, normalizedLang);
        if (activeJob) return { status: 'processing', jobId: activeJob.id, videoId, availableLanguages, diamondInfo };

        // Existing D1 durations may originate from clients or incomplete captions.
        // Verify once, only on the path that can create a new paid operation.
        const details = await fetchYouTubeVideoDetails(videoId);
        if (details.isLive) throw new Error('LIVESTREAM_NOT_SUPPORTED: Live streams cannot be transcribed with AI.');
        const duration = details.duration;
        const requiredDiamonds = transcriptionDiamondCost(duration);
        const tier = params.tier || this.diamondService.resolveTier(user);
        const tierConfig = getTierDiamondConfig(tier);
        const maxDurationSec = tierConfig.maxVideoDurationSec || MAX_AI_VIDEO_DURATION_SECONDS;
        if (duration > maxDurationSec) throw new Error(`VIDEO_TOO_LONG: Video exceeds the ${Math.round(maxDurationSec / 60)} minute tier limit.`);

        // 5. Atomic Lock Reservation Pattern:
        // Reserve job slot in D1. If another request just reserved it, isNew will be false.
        const reservation = await reserveAiJob(db, {
            videoId,
            language: normalizedLang,
            userId: user?.id || null,
            clientId,
            userTier: tier,
            diamondsCharged: requiredDiamonds
        });

        if (!reservation.isNew) {
            // Concurrent request acquired the lock first -> piggyback with 0 diamonds charged!
            return {
                status: 'processing',
                jobId: reservation.job.id,
                videoId,
                availableLanguages,
                diamondInfo
            };
        }

        const jobId = reservation.job.id;

        // 6. Consume diamond(s) with correct parameter order: (clientId, cost, user, env, context)
        const consumeResult = await this.diamondService.consumeDiamond(clientId, requiredDiamonds, user, env, context, jobId);
        if (!consumeResult.success) {
            // Mark the reservation row as failed so concurrent waiters are notified cleanly
            await atomicFailAndRefundAiJob(db, jobId, null, consumeResult.reason || 'insufficient_diamonds');
            if (env.VOCAB_DB) await recoverJobRefund(env, jobId);
            if (consumeResult.reason === 'insufficient_diamonds') {
                throw new Error(`INSUFFICIENT_DIAMONDS: Requires ${consumeResult.requiredDiamonds} AI diamonds (you have ${consumeResult.diamonds}).`);
            }
            throw new Error('NO_DIAMONDS: No diamonds remaining for AI transcription.');
        }

        await db.prepare("UPDATE ai_transcription_jobs SET charge_status='confirmed' WHERE id=?").bind(jobId).run();

        const updatedDiamondInfo = {
            diamonds: consumeResult.diamonds,
            maxDiamonds: diamondInfo.maxDiamonds,
            nextRegenAt: consumeResult.nextRegenAt
        };

        // 7. Construct secure webhook callback URL with derived HMAC token
        const derivedToken = await generateDerivedWebhookToken(env.GLADIA_API_KEY || '', jobId, videoId, lang);
        const origin = env.PUBLIC_ORIGIN || env.APP_URL || 'https://voca.study';
        const callbackUrl = `${origin}/api/gladia-webhook?token=${derivedToken}&jobId=${jobId}&videoId=${videoId}&lang=${encodeURIComponent(lang)}`;

        // Persist submission intent before the chargeable upstream request.
        await db.prepare("UPDATE ai_transcription_jobs SET submission_state='submitting',submission_started_at=strftime('%s','now') WHERE id=? AND status='queued'").bind(jobId).run();

        // 8. Submit to Gladia
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        let gladiaResponse;
        try {
            gladiaResponse = await this.gladiaProvider.submitTranscriptionJob(youtubeUrl, callbackUrl, { jobId });
        } catch (gladiaError) {
            if (gladiaError.ambiguous) {
                await db.prepare("UPDATE ai_transcription_jobs SET submission_state='uncertain' WHERE id=? AND submission_state='submitting'").bind(jobId).run();
                return { status: 'processing', jobId, videoId, availableLanguages, diamondInfo: updatedDiamondInfo };
            }
            await db.prepare("UPDATE ai_transcription_jobs SET submission_state='rejected' WHERE id=? AND submission_state='submitting'").bind(jobId).run();
            // Mark job failed and refund consumed diamond on submission failure
            await atomicFailAndRefundAiJob(db, jobId, null, gladiaError.message || 'gladia_submission_failed');
            if (env.VOCAB_DB) await recoverJobRefund(env, jobId);
            throw gladiaError;
        }

        // 9. Activate job in D1
        await activateAiJob(db, jobId, gladiaResponse.id);

        return {
            status: 'processing',
            jobId,
            videoId,
            availableLanguages,
            diamondInfo: updatedDiamondInfo
        };
    }

    /**
     * Poll AI transcription job status by opaque jobId
     * Features self-healing fallback if webhook is delayed (>15s)
     * @param {Object} context
     * @param {Object} params
     * @returns {Promise<Object>}
     */
    async pollAiJobStatus(context, params) {
        const db = context.db || context.env?.VOCAB_DB;
        const r2 = context.r2 || context.env?.TRANSCRIPT_STORAGE;
        const env = { ...context.env, VOCAB_DB: db, TRANSCRIPT_STORAGE: r2 };
        const { jobId, videoId, availableLanguages, diamondInfo } = params;

        if (!jobId) {
            return { status: 'error', error: 'Missing jobId for status check' };
        }

        const job = await getAiJobById(db, jobId);
        if (!job) {
            // Self-healing fallback: Check if R2 already contains completed transcript for (videoId, lang)
            const fallbackVideoId = videoId || params?.cleanVideoId;
            const fallbackLang = params?.lang || 'ja';
            if (fallbackVideoId) {
                const r2Transcript = await getTranscriptFromR2(r2, fallbackVideoId, fallbackLang);
                if (r2Transcript?.segments?.length > 0) {
                    const resolvedLang = r2Transcript.language || fallbackLang;
                    const isMismatch = normalizeLanguageCode(resolvedLang) !== normalizeLanguageCode(fallbackLang);
                    return {
                        status: 'done',
                        videoInfo: {
                            videoId: fallbackVideoId,
                            language: resolvedLang,
                            requestedLanguage: fallbackLang,
                            languageMismatch: isMismatch,
                            segments: r2Transcript.segments,
                            source: 'ai',
                            sourceDetail: r2Transcript.source || 'gladia',
                            availableLanguages,
                            subLanguages: [resolvedLang],
                            whisperAvailable: Boolean(diamondInfo?.diamonds > 0)
                        }
                    };
                }
            }
            return { status: 'error', error: 'Transcription job not found or expired' };
        }

        const targetVideoId = job.video_id || videoId;
        const targetLang = job.detected_language || job.language;
        const isMismatch = normalizeLanguageCode(targetLang) !== normalizeLanguageCode(job.language);

        // 1. Completed: Read transcript from R2
        if (job.status === 'completed') {
            const r2Transcript = await getTranscriptFromR2(r2, targetVideoId, targetLang);
            if (r2Transcript?.segments?.length > 0) {
                return {
                    status: 'done',
                    videoInfo: {
                        videoId: targetVideoId,
                        language: targetLang,
                        requestedLanguage: job.language,
                        languageMismatch: isMismatch,
                        segments: r2Transcript.segments,
                        source: 'ai',
                        sourceDetail: 'gladia',
                        availableLanguages,
                        subLanguages: [targetLang]
                    }
                };
            }
        }

        // 2. Failed: Return error
        if (job.status === 'failed') {
            return {
                status: 'error',
                errorCode: job.error_code || 'AI_JOB_FAILED',
                error: job.error_message || 'AI transcription failed'
            };
        }

        // 3. Queued or processing: Self-healing check if job is > 15s old and has gladia_job_id
        const nowSec = Math.floor(Date.now() / 1000);
        const jobAge = nowSec - (job.created_at || nowSec);

        if (!job.gladia_job_id && ['submitting', 'uncertain'].includes(job.submission_state)) {
            try { await recoverGladiaSubmission(env, jobId); }
            catch { console.warn('[TranscriptService] Submission reconciliation deferred'); }
        }

        if (jobAge > 15 && job.gladia_job_id && env.GLADIA_API_KEY) {
            try {
                const outcome = await ingestGladiaJob(env, jobId, this.gladiaProvider, Date.now() + 20000, { waitUntil: context.waitUntil });
                if (outcome?.status === 'error') return outcome;
                if (outcome?.status === 'done') return {
                    status: 'done', videoInfo: {
                        videoId: targetVideoId, language: outcome.language, requestedLanguage: job.language,
                        languageMismatch: normalizeLanguageCode(outcome.language) !== normalizeLanguageCode(job.language),
                        segments: outcome.segments, source: 'ai', sourceDetail: 'gladia', availableLanguages, subLanguages: [outcome.language]
                    }
                };
            } catch (healErr) {
                console.warn('[TranscriptService] Self-healing poll check warning:', healErr.message);
            }
        }

        return {
            status: 'processing',
            jobId,
            videoId: targetVideoId,
            availableLanguages,
            diamondInfo
        };
    }

    /**
     * Legacy pollAIJob (backwards-compatibility shim for older clients or resultUrl)
     */
    async pollAIJob(context, params) {
        if (params.jobId) {
            return await this.pollAiJobStatus(context, params);
        }

        const { resultUrl } = params;
        if (!resultUrl) {
            return { status: 'error', error: 'Missing jobId or resultUrl' };
        }

        const { db } = context;
        const { videoId, lang, availableLanguages, diamondInfo } = params;

        try {
            // Resolve legacy URLs to the durable job when possible. Unknown legacy
            // results remain readable but cannot publish over a tracked transcript.
            const providerId = new URL(resultUrl).pathname.split('/').pop();
            const tracked = await db?.prepare('SELECT id FROM ai_transcription_jobs WHERE gladia_job_id=? LIMIT 1').bind(providerId).first();
            if (tracked) return this.pollAiJobStatus(context, { ...params, jobId: tracked.id });
            const resultData = await this.gladiaProvider.checkJobStatus(resultUrl);
            if (resultData.status === 'done') {
                const rawSegments = extractGladiaSegments(resultData);
                const cleanedSegments = cleanTranscriptSegments(rawSegments);
                const detectedLang = extractGladiaDetectedLanguage(resultData, lang);

                if (videoId && cleanedSegments.length > 0) {
                    const enrichedSegments = cleanedSegments;
                    return {
                        status: 'done',
                        videoInfo: {
                            videoId,
                            language: detectedLang,
                            requestedLanguage: lang,
                            segments: enrichedSegments,
                            source: 'ai',
                            sourceDetail: 'gladia',
                            availableLanguages,
                            subLanguages: [detectedLang || lang]
                        }
                    };
                }
            }

            if (resultData.status === 'error') {
                return { status: 'error', error: `AI transcription failed: ${resultData.error_message || 'Please try again'}` };
            }

            return {
                status: 'processing',
                resultUrl,
                videoId,
                availableLanguages,
                diamondInfo
            };
        } catch {
            return {
                status: 'processing',
                resultUrl,
                videoId,
                availableLanguages,
                diamondInfo
            };
        }
    }
}
