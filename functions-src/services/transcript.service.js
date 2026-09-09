/**
 * Service for orchestrating Transcripts (AI & Native)
 */

import {
    getVideoLanguages,
    saveVideoLanguages,
    addVideoLanguage,
    addVideoLanguages,
    getVideoDuration,
    markNoTranscript
} from '../data/video-info-db.js';

import {
    savePendingJob,
    getPendingJob,
    deletePendingJob,
    cleanupStaleJobs
} from '../data/transcript-db.js';

import {
    getTranscriptFromR2,
    saveTranscriptToR2
} from '../data/transcript-r2.js';

import { cleanTranscriptSegments, normalizeLanguageCode } from '../utils/transcript-utils.js';
import { fetchYouTubeDuration, fetchYouTubeVideoDetails, resolveVideoChannelAvatar } from '../middlewares/video-validator.js';
import { getTierDiamondConfig } from './diamond.service.js';

const MAX_VIDEO_DURATION_SECONDS = 3 * 60 * 60; // 3 hours (native captions)
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
            const cleanedSegments = cleanTranscriptSegments(nativeResult.segments);
            // Found native captions -> Save to R2 & DB
            const savePromises = [
                saveTranscriptToR2(r2, videoId, lang, cleanedSegments, nativeResult.source),
            ];

            const availableLangs = nativeResult.availableLangs?.length > 0 ? nativeResult.availableLangs : [lang];

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
                        avatar
                    );
                };
                savePromises.push(saveLanguages());
            } else if (nativeResult.availableLangs?.length > 0) {
                savePromises.push(addVideoLanguages(db, videoId, nativeResult.availableLangs));
            } else {
                savePromises.push(addVideoLanguage(db, videoId, lang));
            }

            if (waitUntil) {
                waitUntil(Promise.allSettled(savePromises));
            } else {
                await Promise.allSettled(savePromises);
            }

            return nativeResult;
        }

        // If native captions for requested lang were not found, but other languages are available (e.g. video is in zh, user asked for ja)
        if (nativeResult?.availableLangs?.length > 0) {
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
                        nativeResult.availableLangs,
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
                savePromises.push(addVideoLanguages(db, videoId, nativeResult.availableLangs));
            }
            if (waitUntil) {
                waitUntil(Promise.allSettled(savePromises));
            } else {
                await Promise.allSettled(savePromises);
            }
            return {
                segments: [],
                availableLangs: nativeResult.availableLangs,
                languageMismatch: true
            };
        }

        // Failed to find native captions -> Cache the failure
        if (env.SUPADATA_API_KEY) {
            const markNegativeCache = markNoTranscript(db, cache, videoId, lang, 'native');
            if (waitUntil) {
                waitUntil(markNegativeCache.catch(() => {}));
            } else {
                await markNegativeCache;
            }
        }

        return null;
    }

    /**
     * Start an AI Transcription Job using Gladia
     */
    async startAIJob(context, params) {
        const { db, r2, cache, waitUntil, env } = context;
        const { videoId, lang, body, clientId, user, diamondInfo, elapsed } = params;

        // 1. Validate video length against user tier limit (CRITICAL: Prioritize server-verified duration)
        let duration = await getVideoDuration(db, videoId);
        if (!duration) {
            const ytDetails = await fetchYouTubeVideoDetails(videoId);
            if (ytDetails.isLive) {
                throw new Error('LIVESTREAM_NOT_SUPPORTED: Live streams cannot be transcribed with AI.');
            }
            duration = ytDetails.duration;
        }

        // Only fall back to client duration if server-side scrape was completely unavailable
        if (!duration && body.duration) {
            duration = body.duration;
        }

        const tier = params.tier || this.diamondService.resolveTier(user);
        const tierConfig = getTierDiamondConfig(tier);
        const maxDurationSec = params.maxAiDuration || tierConfig.maxVideoDurationSec || MAX_AI_VIDEO_DURATION_SECONDS;

        if (duration && duration > maxDurationSec) {
            throw new Error(`VIDEO_TOO_LONG: Video (${Math.round(duration / 60)} min) exceeds the ${Math.round(maxDurationSec / 60)} minute limit for ${tier.toUpperCase()} tier.`);
        }

        // 2. Check for existing pending job
        const existingJob = await getPendingJob(db, videoId);
        if (existingJob?.result_url) {
            return await this.pollAIJob(context, { ...params, resultUrl: existingJob.result_url });
        }

        // 3. Scaled diamond cost based on video length:
        // <= 10 min: 1 diamond
        // 10 to 20 min: 2 diamonds
        // 20 to 35 min: 3 diamonds
        // > 35 min (up to 45 min): 4 diamonds
        let requiredDiamonds = 1;
        if (duration) {
            if (duration > 35 * 60) {
                requiredDiamonds = 4;
            } else if (duration > 20 * 60) {
                requiredDiamonds = 3;
            } else if (duration > 10 * 60) {
                requiredDiamonds = 2;
            }
        }

        // 4. Consume diamond(s)
        const consumeResult = await this.diamondService.consumeDiamond(clientId, context, env, user, requiredDiamonds);
        if (!consumeResult.success) {
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

        // 4. Submit to Gladia
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        let resultUrl;
        try {
            resultUrl = await this.gladiaProvider.submitTranscriptionJob(youtubeUrl);
        } catch (gladiaError) {
            // Refund consumed diamond on submission failure
            await this.diamondService.refundDiamond(clientId, context, env, user, requiredDiamonds);
            throw gladiaError;
        }

        // 5. Save pending job state
        await Promise.allSettled([
            savePendingJob(db, videoId, lang, resultUrl),
            cache?.put(`job_map:${resultUrl}`, videoId, { expirationTtl: 3600 })
        ]);

        if (waitUntil) {
            waitUntil(cleanupStaleJobs(db).catch(() => {}));
        }

        // 6. Start polling
        return await this.pollAIJob(context, { ...params, resultUrl, diamondInfo: updatedDiamondInfo, requiredDiamonds });
    }

    /**
     * Poll Gladia provider for results
     */
    async pollAIJob(context, params) {
        const { db, r2, cache, waitUntil } = context;
        let { videoId, lang, resultUrl, elapsed, availableLanguages, diamondInfo } = params;

        const startTime = Date.now();
        // Upgraded for Workers Paid: poll up to 55s (stopping at 50s) so most Gladia jobs finish in a single request
        const MAX_POLL_DURATION_MS = 55000;
        let delay = 3000;

        if (resultUrl) {
            let mappedVideoId = null;
            if (cache) {
                try { mappedVideoId = await cache.get(`job_map:${resultUrl}`); } catch { }
            }
            if (!mappedVideoId && db && videoId) {
                try {
                    const pending = await getPendingJob(db, videoId);
                    if (pending && pending.result_url === resultUrl) {
                        mappedVideoId = videoId;
                    }
                } catch { }
            }

            if (mappedVideoId) {
                if (videoId && videoId !== mappedVideoId) {
                    return { status: 'error', error: 'Result URL does not match requested video' };
                }
                videoId = mappedVideoId;
            } else if (!videoId) {
                return { status: 'error', error: 'Unknown or expired transcription job' };
            }
        }

        while (Date.now() - startTime < MAX_POLL_DURATION_MS) {
            // Stop early to keep comfortably under Cloudflare edge 100s limit
            if (Date.now() - startTime > MAX_POLL_DURATION_MS - 5000) {
                return { status: 'processing', resultUrl, videoId };
            }

            await new Promise(resolve => setTimeout(resolve, delay));

            try {
                const resultData = await this.gladiaProvider.checkJobStatus(resultUrl);

                if (resultData.status === 'done') {
                    const utterances = resultData.result?.transcription?.utterances || [];
                    const segments = utterances.map((utt, index) => ({
                        id: index,
                        text: utt.text?.trim() || '',
                        start: utt.start || 0,
                        duration: (utt.end || 0) - (utt.start || 0)
                    })).filter(s => s.text);

                    const cleanedSegments = cleanTranscriptSegments(segments);
                    const rawDetectedLang = resultData.result?.transcription?.languages?.[0] || lang;
                    const detectedLang = normalizeLanguageCode(rawDetectedLang) || lang;

                    if (videoId && cleanedSegments.length > 0) {
                        const title = params.body?.title || null;
                        const channel = params.body?.channel || null;
                        const duration = params.body?.duration || null;
                        let channelAvatar = params.body?.channelAvatar || null;

                        const saveLanguages = async () => {
                            if (!channelAvatar && db) {
                                try {
                                    channelAvatar = await resolveVideoChannelAvatar(videoId);
                                } catch { }
                            }
                            if (title || channel || duration) {
                                await saveVideoLanguages(db, videoId, [detectedLang], duration, title, channel, false, null, channelAvatar);
                            } else {
                                await addVideoLanguage(db, videoId, detectedLang);
                            }
                        };

                        const saveOps = [
                            saveTranscriptToR2(r2, videoId, detectedLang, cleanedSegments, 'ai'),
                            saveLanguages(),
                            deletePendingJob(db, videoId)
                        ];

                        if (waitUntil) {
                            waitUntil(Promise.allSettled(saveOps));
                        } else {
                            await Promise.allSettled(saveOps);
                        }
                    }

                    return {
                        status: 'done',
                        videoInfo: {
                            videoId,
                            language: detectedLang,
                            requestedLanguage: lang,
                            segments: cleanedSegments,
                            source: 'ai',
                            sourceDetail: 'gladia',
                            availableLanguages,
                        }
                    };
                }

                if (resultData.status === 'error') {
                    if (videoId && db) {
                        deletePendingJob(db, videoId).catch(() => {});
                    }
                    const clientId = params.clientId;
                    if (clientId && this.diamondService) {
                        const user = params.user || null;
                        const refundAmount = params.requiredDiamonds || 1;
                        this.diamondService.refundDiamond(clientId, context, env, user, refundAmount).catch(err => {
                            console.error('[TranscriptService] Failed to refund diamonds on Gladia error:', err.message);
                        });
                    }
                    throw new Error(`Gladia error: ${resultData.error_message || 'Transcription failed'}`);
                }

                // Still processing
                delay = Math.min(delay * 2, 10000);

            } catch (error) {
                // Fail immediately on fatal client errors (e.g. 400, 401, 403, 404)
                if (error.status && error.status >= 400 && error.status < 500) {
                    console.error('[TranscriptService] Non-retryable Gladia error:', error.status, error.message);
                    return { status: 'error', error: error.message };
                }
                // Network error, try again
                delay = Math.min(delay * 2, 10000);
            }
        }

        // Timeout
        return { status: 'processing', resultUrl, videoId };
    }
}
