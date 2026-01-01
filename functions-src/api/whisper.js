/**
 * Whisper/Gladia Transcription API (Cloudflare Function)
 * Uses Gladia API for YouTube video transcription
 * 
 * Storage pattern:
 * - R2: Content (transcript segments)
 * - D1: Metadata (pending jobs, record keeping)
 * 
 * @version 2.0.0 - R2 for content, D1 for metadata
 */

import {
    jsonResponse,
    handleOptions,
    errorResponse,
    sanitizeVideoId,
    sanitizeLanguage
} from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
import {
    savePendingJob,
    getPendingJob,
    deletePendingJob,
    recordTranscript,
    cleanupStaleJobs
} from '../_shared/transcript-db.js';
import { getTranscriptFromR2, saveTranscriptToR2 } from '../_shared/transcript-r2.js';
import {
    consumeRateLimit,
    getClientIP,
    rateLimitResponse,
    getRateLimitHeaders
} from '../_shared/rate-limiter.js';
import { validateVideoRequest } from '../_shared/video-validator.js';

const DEBUG = false;
const MAX_DURATION_MS = 25000; // 25s max to stay within CF 30s limit
const INITIAL_DELAY_MS = 1000;
const MAX_DELAY_MS = 5000;
const FETCH_TIMEOUT_MS = 10000;
const MAX_VIDEO_DURATION_SECONDS = 60 * 60; // 60 minutes max for AI transcription

function log(...args) {
    if (DEBUG) console.log('[Gladia]', ...args);
}

// Handle preflight requests
export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

// Rate limiting configuration - 10 AI transcriptions per hour
const RATE_LIMIT_CONFIG = { max: 10, windowSeconds: 3600, keyPrefix: 'whisper' };

export async function onRequestPost(context) {
    const { request, env } = context;
    const r2 = env.TRANSCRIPT_STORAGE;
    const cache = env.TRANSCRIPT_CACHE;
    const db = env.VOCAB_DB;

    try {
        const body = await request.json();
        const videoId = sanitizeVideoId(body.videoId);
        const lang = sanitizeLanguage(body.lang || body.targetLanguage || 'ja');
        const { result_url: providedResultUrl } = body;

        const gladiaKey = env.GLADIA_API_KEY;
        if (!gladiaKey) {
            return errorResponse('GLADIA_API_KEY not set');
        }

        let resultUrl = providedResultUrl;

        // Step 1: Submit transcription request (Only if not polling existing job)
        if (!resultUrl) {
            // Validate video ID only for new requests
            if (!videoId) {
                return jsonResponse({ error: 'Invalid or missing videoId' }, 400);
            }

            // Early validation - reject unsupported languages and long videos
            const validation = await validateVideoRequest(videoId, lang, body.duration, 'whisper');
            if (validation) {
                log(`Validation failed: ${validation.error}`);
                return jsonResponse(validation, 400);
            }

            // 1. Check R2 for completed AI transcript (single source of truth for content)
            const r2Result = await getTranscriptFromR2(r2, videoId, lang);
            if (r2Result?.segments?.length > 0 && r2Result.source === 'ai') {
                log('R2 hit for AI transcript:', videoId);
                return jsonResponse({
                    success: true,
                    language: r2Result.language || 'unknown',
                    segments: r2Result.segments
                });
            }

            // 2. Check D1 for pending job (persistent across refreshes)
            const pendingJob = await getPendingJob(db, videoId);
            if (pendingJob?.result_url) {
                log('Found pending job in D1:', videoId);
                resultUrl = pendingJob.result_url;
            }

            // Opportunistic cleanup of stale pending jobs (non-blocking)
            cleanupStaleJobs(db).catch(() => { });

            // Only submit new job if we didn't find a pending one
            if (!resultUrl) {
                // Rate limit (Atomic check and consume)
                const clientIP = getClientIP(request);
                const rateCheck = await consumeRateLimit(cache, clientIP, RATE_LIMIT_CONFIG);
                if (!rateCheck.allowed) {
                    return rateLimitResponse(rateCheck.resetAt);
                }

                const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

                const submitResponse = await fetch('https://api.gladia.io/v2/pre-recorded', {
                    method: 'POST',
                    headers: {
                        'x-gladia-key': gladiaKey,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ audio_url: youtubeUrl }),
                    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
                });

                if (!submitResponse.ok) {
                    throw new Error(`Gladia submit failed: ${submitResponse.status}`);
                }

                const submitData = await submitResponse.json();
                resultUrl = submitData.result_url;

                if (!resultUrl) {
                    throw new Error('No result_url from Gladia');
                }

                // Save pending job to D1 (persistent across refreshes)
                savePendingJob(db, videoId, lang, resultUrl).catch(() => { });
            }
        }

        // Step 2: Poll for results with exponential backoff
        const startTime = Date.now();
        let delay = INITIAL_DELAY_MS;

        while (Date.now() - startTime < MAX_DURATION_MS) {

            // Check if we are running out of time (5s buffer)
            if (Date.now() - startTime > MAX_DURATION_MS - 5000) {
                return jsonResponse({
                    status: 'processing',
                    result_url: resultUrl
                });
            }

            await new Promise(resolve => setTimeout(resolve, delay));

            try {
                const resultResponse = await fetch(resultUrl, {
                    headers: { 'x-gladia-key': gladiaKey },
                    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
                });

                if (!resultResponse.ok) {
                    delay = Math.min(delay * 2, MAX_DELAY_MS);
                    continue;
                }

                const resultData = await resultResponse.json();

                if (resultData.status === 'done') {
                    const utterances = resultData.result?.transcription?.utterances || [];
                    const rawSegments = utterances.map((utt, index) => ({
                        id: index,
                        text: utt.text?.trim() || '',
                        start: utt.start || 0,
                        duration: (utt.end || 0) - (utt.start || 0)
                    }));

                    // Clean segments for deduplication and timing fixes
                    const segments = cleanTranscriptSegments(rawSegments);
                    const detectedLang = resultData.result?.transcription?.languages?.[0] || lang;

                    const response = {
                        success: true,
                        language: detectedLang,
                        duration: resultData.result?.metadata?.audio_duration || 0,
                        segments
                    };

                    // Save content to R2, metadata to D1 (non-blocking)
                    if (videoId && segments.length > 0) {
                        Promise.allSettled([
                            // Content to R2
                            saveTranscriptToR2(r2, videoId, detectedLang, segments, 'ai'),
                            // Metadata to D1
                            recordTranscript(db, videoId, detectedLang, 'ai'),
                            // Clear pending job
                            deletePendingJob(db, videoId)
                        ]).catch(() => { });
                    }

                    return jsonResponse(response);
                }

                if (resultData.status === 'error') {
                    throw new Error(`Gladia error: ${resultData.error_message}`);
                }

                // Still processing, apply exponential backoff
                delay = Math.min(delay * 2, MAX_DELAY_MS);

            } catch (fetchError) {
                log('Poll error:', fetchError.message);
                delay = Math.min(delay * 2, MAX_DELAY_MS);
            }
        }

        // If we exit the loop, we ran out of time
        return jsonResponse({
            status: 'processing',
            result_url: resultUrl
        });

    } catch (error) {
        console.error('[Gladia] Error:', error.message);
        return errorResponse(`AI transcription failed: ${error.message}`);
    }
}
