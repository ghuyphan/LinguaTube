/**
 * Service for orchestrating Transcripts (AI & Native)
 */

import {
    getVideoLanguages,
    addVideoLanguage,
    addVideoLanguages,
    getVideoDuration,
    isNoTranscript,
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

import { jsonResponse } from '../utils/utils.js';
import { cleanTranscriptSegments } from '../utils/transcript-utils.js';

const MAX_VIDEO_DURATION_SECONDS = 3 * 60 * 60; // 3 hours

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
    async fetchNativeCaptions(context, videoId, lang) {
        // Assume context object contains { db, r2, cache, env, waitUntil, ... }
        const { db, r2, cache, env, waitUntil } = context;

        // Fetch captions via Provider
        const nativeResult = await this.supadataProvider.fetchCaptions(videoId, lang, cache);

        if (nativeResult?.segments?.length > 0) {
            // Found native captions -> Save to R2 & DB
            const savePromises = [
                saveTranscriptToR2(r2, videoId, lang, nativeResult.segments, nativeResult.source),
            ];

            if (nativeResult.availableLangs?.length > 0) {
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

        // Failed to find native captions -> Cache the failure
        if (env.SUPADATA_API_KEY) {
            const markNegativeCache = markNoTranscript(db, cache, videoId, lang, 'native');
            if (waitUntil) {
                waitUntil(markNegativeCache);
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

        // 1. Validate video length
        let duration = await getVideoDuration(db, videoId) || body.duration;
        if (duration && duration > MAX_VIDEO_DURATION_SECONDS) {
            throw new Error(`VIDEO_TOO_LONG: Video exceeds ${MAX_VIDEO_DURATION_SECONDS / 60} minute limit`);
        }

        // 2. Check for existing pending job
        const existingJob = await getPendingJob(db, videoId);
        if (existingJob?.result_url) {
            return await this.pollAIJob(context, { ...params, resultUrl: existingJob.result_url });
        }

        // 3. Consume diamond
        const consumeResult = await this.diamondService.consumeDiamond(clientId, context, env, user);
        if (!consumeResult.success) {
            throw new Error('NO_DIAMONDS: No diamonds remaining for AI transcription.');
        }

        const updatedDiamondInfo = {
            diamonds: consumeResult.diamonds,
            maxDiamonds: diamondInfo.maxDiamonds,
            nextRegenAt: consumeResult.nextRegenAt
        };

        // 4. Submit to Gladia
        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const resultUrl = await this.gladiaProvider.submitTranscriptionJob(youtubeUrl);

        // 5. Save pending job state
        await Promise.allSettled([
            savePendingJob(db, videoId, lang, resultUrl),
            cache?.put(`job_map:${resultUrl}`, videoId, { expirationTtl: 3600 })
        ]);

        if (waitUntil) {
            waitUntil(cleanupStaleJobs(db));
        }

        // 6. Start polling
        return await this.pollAIJob(context, { ...params, resultUrl, diamondInfo: updatedDiamondInfo });
    }

    /**
     * Poll Gladia provider for results
     */
    async pollAIJob(context, params) {
        const { db, r2, cache, waitUntil } = context;
        let { videoId, lang, resultUrl, elapsed, availableLanguages, diamondInfo } = params;

        const startTime = Date.now();
        const MAX_POLL_DURATION_MS = 25000;
        let delay = 3000;

        if (!videoId && resultUrl && cache) {
            try { videoId = await cache.get(`job_map:${resultUrl}`); } catch { }
        }

        while (Date.now() - startTime < MAX_POLL_DURATION_MS) {
            // Stop early to keep under Cloudflare 30s limit
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
                    const detectedLang = resultData.result?.transcription?.languages?.[0] || lang;

                    if (videoId && cleanedSegments.length > 0) {
                        const saveOps = [
                            saveTranscriptToR2(r2, videoId, detectedLang, cleanedSegments, 'ai'),
                            addVideoLanguage(db, videoId, detectedLang),
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
                    throw new Error(`Gladia error: ${resultData.error_message}`);
                }

                // Still processing
                delay = Math.min(delay * 2, 10000);

            } catch (error) {
                // Network error, try again
                delay = Math.min(delay * 2, 10000);
            }
        }

        // Timeout
        return { status: 'processing', resultUrl, videoId };
    }
}
