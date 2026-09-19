/**
 * Service for orchestrating Transcripts (AI & Native)
 */

import {
    saveVideoLanguages,
    addVideoLanguage,
    addVideoLanguages,
    addSubLanguage,
    getVideoDuration,
    markNoTranscript,
    deleteNoTranscript
} from '../data/video-info-db.js';

import {
    reserveAiJob,
    activateAiJob,
    getAiJobById,
    getActiveAiJob,
    completeAiJob,
    atomicFailAndRefundAiJob,
    deleteAiJob
} from '../data/transcript-db.js';

import {
    getTranscriptFromR2,
    saveTranscriptToR2
} from '../data/transcript-r2.js';

import { cleanTranscriptSegments, normalizeLanguageCode, extractGladiaSegments, extractGladiaDetectedLanguage } from '../utils/transcript-utils.js';
import { fetchYouTubeVideoDetails, resolveVideoChannelAvatar } from '../middlewares/video-validator.js';
import { getTierDiamondConfig } from './diamond.service.js';
import { generateDerivedWebhookToken } from '../utils/svix-verifier.js';
import { enrichSegmentsWithTokens } from '../utils/tokenizer.js';

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
            const enrichedSegments = await enrichSegmentsWithTokens(cleanedSegments, actualLang);
            nativeResult.segments = enrichedSegments;
            // Found native captions -> Save to R2 & DB under actualLang and clear any stale negative cache
            const savePromises = [
                saveTranscriptToR2(r2, videoId, actualLang, enrichedSegments, nativeResult.source || 'supadata'),
                addSubLanguage(db, videoId, actualLang),
                deleteNoTranscript(db, videoId, actualLang, 'native')
            ];

            const rawAvailable = nativeResult.availableLangs?.length > 0 ? nativeResult.availableLangs : [actualLang];
            const availableLangs = Array.from(new Set(rawAvailable.map(l => normalizeLanguageCode(l) || l)));
            if (!availableLangs.includes(actualLang)) {
                availableLangs.unshift(actualLang);
            }

            if (options.title || options.channel || options.duration) {
                const saveLanguages = async () => {
                    let avatar = options.channelAvatar || null;
                    if (!avatar && db) {
                        try { avatar = await resolveVideoChannelAvatar(videoId); } catch { }
                    }
                    await saveVideoLanguages(
                        db,
                        videoId,
                        availableLangs,
                        options.duration || null,
                        options.title || null,
                        options.channel || null,
                        false,
                        null,
                        avatar,
                        [actualLang]
                    );
                };
                savePromises.push(saveLanguages());
            } else if (availableLangs.length > 0) {
                savePromises.push(addVideoLanguages(db, videoId, availableLangs));
            } else {
                savePromises.push(addVideoLanguage(db, videoId, actualLang));
            }

            if (waitUntil) {
                waitUntil(Promise.allSettled(savePromises));
            } else {
                await Promise.allSettled(savePromises);
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
        const { videoId, lang, body, clientId, user, diamondInfo, availableLanguages } = params;

        // 1. Validate video length against user tier limit (server-authoritative: D1 first, then YouTube scraping)
        let duration = await getVideoDuration(db, videoId);
        if (!duration) {
            const ytDetails = await fetchYouTubeVideoDetails(videoId);
            if (ytDetails.isLive) {
                throw new Error('LIVESTREAM_NOT_SUPPORTED: Live streams cannot be transcribed with AI.');
            }
            duration = ytDetails.duration;
            if (duration && db && context.waitUntil) {
                context.waitUntil(saveVideoLanguages(db, videoId, [], duration).catch(() => {}));
            }
        }
        if (body?.duration || params?.duration) {
            const clientDuration = body?.duration || params?.duration;
            duration = Math.max(duration || 0, clientDuration);
        }

        const tier = params.tier || this.diamondService.resolveTier(user);
        const tierConfig = getTierDiamondConfig(tier);
        const maxDurationSec = params.maxAiDuration || tierConfig.maxVideoDurationSec || MAX_AI_VIDEO_DURATION_SECONDS;

        if (duration && duration > maxDurationSec) {
            throw new Error(`VIDEO_TOO_LONG: Video (${Math.round(duration / 60)} min) exceeds the ${Math.round(maxDurationSec / 60)} minute limit for ${tier.toUpperCase()} tier.`);
        }

        // 2. Check if an AI transcript already exists in R2 for this language (avoid duplicate diamond charges)
        const existingR2 = await getTranscriptFromR2(r2, videoId, lang);
        if (existingR2?.segments?.length > 0 && existingR2.source === 'ai') {
            return {
                status: 'done',
                videoInfo: {
                    videoId,
                    language: lang,
                    requestedLanguage: lang,
                    segments: existingR2.segments,
                    source: 'ai',
                    sourceDetail: existingR2.source,
                    availableLanguages: params.availableLanguages
                }
            };
        }

        // 3. Scaled diamond cost based on video length
        let requiredDiamonds = params.requiredDiamonds || 1;
        if (duration) {
            if (duration > 35 * 60) {
                requiredDiamonds = 4;
            } else if (duration > 20 * 60) {
                requiredDiamonds = 3;
            } else if (duration > 10 * 60) {
                requiredDiamonds = 2;
            }
        }

        // 4. Check for active job in D1 (unless forceRefresh is explicitly requested)
        if (params.forceRefresh) {
            // User requested a fresh generation/retry: clear any stale/zombie active job from D1
            const existing = await getActiveAiJob(db, videoId, lang);
            if (existing) {
                console.warn(`[startAIJob] forceRefresh requested for ${videoId}:${lang}. Superseding existing active job ${existing.id}`);
                await deleteAiJob(db, existing.id);
            }
        } else {
            const activeJob = await getActiveAiJob(db, videoId, lang, this.diamondService, env, context);
            if (activeJob) {
                return {
                    status: 'processing',
                    jobId: activeJob.id,
                    videoId,
                    availableLanguages,
                    diamondInfo
                };
            }
        }

        // 5. Atomic Lock Reservation Pattern:
        // Reserve job slot in D1. If another request just reserved it, isNew will be false.
        const reservation = await reserveAiJob(db, {
            videoId,
            language: lang,
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
        const consumeResult = await this.diamondService.consumeDiamond(clientId, requiredDiamonds, user, env, context);
        if (!consumeResult.success) {
            // Cancel the reservation row so user can retry later
            await deleteAiJob(db, jobId);
            if (consumeResult.reason === 'insufficient_diamonds') {
                throw new Error(`INSUFFICIENT_DIAMONDS: Requires ${consumeResult.requiredDiamonds} AI diamonds (you have ${consumeResult.diamonds}).`);
            }
            throw new Error('NO_DIAMONDS: No diamonds remaining for AI transcription.');
        }

        const updatedDiamondInfo = {
            diamonds: consumeResult.diamonds,
            maxDiamonds: diamondInfo.maxDiamonds,
            nextRegenAt: consumeResult.nextRegenAt
        };

        // 7. Construct secure webhook callback URL with derived HMAC token
        const derivedToken = await generateDerivedWebhookToken(env.GLADIA_API_KEY || '', jobId, videoId, lang);
        const origin = env.PUBLIC_ORIGIN || env.APP_URL || 'https://voca.study';
        const callbackUrl = `${origin}/api/gladia-webhook?token=${derivedToken}&jobId=${jobId}&videoId=${videoId}&lang=${encodeURIComponent(lang)}`;

        // 8. Submit to Gladia
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        let gladiaResponse;
        try {
            gladiaResponse = await this.gladiaProvider.submitTranscriptionJob(youtubeUrl, callbackUrl);
        } catch (gladiaError) {
            // Delete reservation row and refund consumed diamond on submission failure
            await deleteAiJob(db, jobId);
            await this.diamondService.refundDiamond(clientId, context, env, user, requiredDiamonds);
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
        const waitUntil = context.waitUntil;
        const env = context.env || {};
        const { jobId, videoId, availableLanguages, diamondInfo, user, clientId } = params;

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

        if (jobAge > 15 && job.gladia_job_id && env.GLADIA_API_KEY) {
            try {
                const statusCheck = await this.gladiaProvider.checkJobStatusById(job.gladia_job_id);

                if (statusCheck.status === 'done') {
                    const rawSegments = extractGladiaSegments(statusCheck);
                    const cleanedSegments = cleanTranscriptSegments(rawSegments);
                    const detectedLang = extractGladiaDetectedLanguage(statusCheck, job.language);
                    const selfHealMismatch = normalizeLanguageCode(detectedLang) !== normalizeLanguageCode(job.language);

                    if (cleanedSegments.length > 0) {
                        const enrichedSegments = await enrichSegmentsWithTokens(cleanedSegments, detectedLang);
                        const saved = await saveTranscriptToR2(r2, targetVideoId, detectedLang, enrichedSegments, 'ai');
                        if (!saved && r2) {
                            console.error(`[TranscriptService] Failed to persist transcript to R2 for ${targetVideoId}`);
                            return {
                                status: 'processing',
                                videoInfo: {
                                    videoId: targetVideoId,
                                    jobId,
                                    message: 'Transcribed speech successfully, persisting to storage...'
                                }
                            };
                        }
                        await completeAiJob(db, jobId, detectedLang);
                        if (db) {
                            const bgOps = [
                                addSubLanguage(db, targetVideoId, detectedLang),
                                saveVideoLanguages(db, targetVideoId, [detectedLang, job.language], null, null, null, false, null, null, [detectedLang])
                            ];
                            if (waitUntil) waitUntil(Promise.allSettled(bgOps));
                            else await Promise.allSettled(bgOps);
                        }

                        return {
                            status: 'done',
                            videoInfo: {
                                videoId: targetVideoId,
                                language: detectedLang,
                                requestedLanguage: job.language,
                                languageMismatch: selfHealMismatch,
                                segments: enrichedSegments,
                                source: 'ai',
                                sourceDetail: 'gladia',
                                availableLanguages,
                                subLanguages: [detectedLang]
                            }
                        };
                    } else {
                        // Empty speech
                        const refundResult = await atomicFailAndRefundAiJob(db, jobId, 'NO_SPEECH_DETECTED', 'Audio contains no detectable speech');
                        if (refundResult.shouldRefund && this.diamondService) {
                            const refundPromise = this.diamondService.refundDiamond(job.client_id || clientId, context, env, user, job.diamonds_charged);
                            if (waitUntil) waitUntil(refundPromise.catch(() => {}));
                            else await refundPromise.catch(() => {});
                        }
                        return {
                            status: 'error',
                            errorCode: 'NO_SPEECH_DETECTED',
                            error: 'Audio contains no detectable speech'
                        };
                    }
                } else if (statusCheck.status === 'error') {
                    const errMsg = statusCheck.error_message || 'Gladia transcription failed';
                    const refundResult = await atomicFailAndRefundAiJob(db, jobId, 'GLADIA_ERROR', errMsg);
                    if (refundResult.shouldRefund && this.diamondService) {
                        const refundPromise = this.diamondService.refundDiamond(job.client_id || clientId, context, env, user, job.diamonds_charged);
                        if (waitUntil) waitUntil(refundPromise.catch(() => {}));
                        else await refundPromise.catch(() => {});
                    }
                    return {
                        status: 'error',
                        errorCode: 'AI_JOB_FAILED',
                        error: errMsg
                    };
                }
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

        const { db, r2, waitUntil } = context;
        let { videoId, lang, availableLanguages, diamondInfo } = params;

        try {
            const resultData = await this.gladiaProvider.checkJobStatus(resultUrl);
            if (resultData.status === 'done') {
                const rawSegments = extractGladiaSegments(resultData);
                const cleanedSegments = cleanTranscriptSegments(rawSegments);
                const detectedLang = extractGladiaDetectedLanguage(resultData, lang);

                if (videoId && cleanedSegments.length > 0) {
                    const enrichedSegments = await enrichSegmentsWithTokens(cleanedSegments, detectedLang);
                    const saved = await saveTranscriptToR2(r2, videoId, detectedLang, enrichedSegments, 'ai');
                    if (!saved && r2) {
                        console.error(`[TranscriptService] Failed to persist transcript to R2 for ${videoId}`);
                        return {
                            status: 'processing',
                            videoInfo: {
                                videoId,
                                resultUrl,
                                message: 'Transcribed speech successfully, persisting to storage...'
                            }
                        };
                    }
                    if (db) {
                        const bgOps = [
                            addSubLanguage(db, videoId, detectedLang),
                            saveVideoLanguages(db, videoId, [detectedLang, lang], null, null, null, false, null, null, [detectedLang])
                        ];
                        if (waitUntil) waitUntil(Promise.allSettled(bgOps));
                        else await Promise.allSettled(bgOps);
                    }

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
