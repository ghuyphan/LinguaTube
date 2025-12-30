/**
 * Whisper/Gladia Transcription API (Cloudflare Function)
 * Uses Gladia API for YouTube video transcription
 * Features: D1 persistent pending state, KV caching, exponential backoff
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
import { getTranscript, getPendingJob, savePendingJob, completePendingJob, cleanupStalePendingJobs } from '../_shared/transcript-db.js';
import { getTranscriptFromR2, saveTranscriptToR2 } from '../_shared/transcript-r2.js';
import { checkRateLimit, incrementRateLimit, getClientIP, rateLimitResponse } from '../_shared/rate-limiter.js';
import { validateVideoRequest } from '../_shared/video-validator.js';

const DEBUG = true;
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
    const TRANSCRIPT_CACHE = env.TRANSCRIPT_CACHE; // KV for rate limiting
    const db = env.VOCAB_DB; // D1 for pending jobs

    try {
        const body = await request.json();
        const { videoId, result_url: providedResultUrl } = body;

        // Extract lang early - needed for both new requests and D1 cache lookups
        const lang = body.lang || body.targetLanguage || 'ja';

        const gladiaKey = env.GLADIA_API_KEY;
        if (!gladiaKey) {
            return errorResponse('GLADIA_API_KEY not set');
        }

        let resultUrl = providedResultUrl;

        // Step 1: Submit transcription request (Only if not polling existing job)
        if (!resultUrl) {
            // Validate video ID only for new requests
            if (!validateVideoId(videoId)) {
                return jsonResponse({ error: 'Invalid or missing videoId' }, 400);
            }

            // Early validation - reject unsupported languages and long videos
            const validation = await validateVideoRequest(videoId, lang, body.duration, 'whisper');
            if (validation) {
                log(`Validation failed: ${validation.error}`);
                return jsonResponse(validation, 400);
            }

            // 1. Check R2 first for completed AI transcripts (primary storage)
            const r2Result = await getTranscriptFromR2(r2, videoId, lang);
            if (r2Result?.segments?.length > 0 && r2Result.source === 'ai') {
                log('R2 hit for AI transcript:', videoId);
                return jsonResponse({
                    success: true,
                    language: r2Result.language || 'unknown',
                    segments: r2Result.segments
                });
            }

            // 2. Check D1 database for completed AI transcript (backup/legacy)
            // Look for transcript saved with the actual language code (not 'ai')
            // AI transcripts are saved with source='ai' and the detected language
            const d1Result = await getTranscript(db, videoId, lang, 'ai');
            if (d1Result?.segments?.length > 0) {
                log('D1 hit for AI transcript:', videoId);
                const response = {
                    success: true,
                    language: d1Result.language || 'unknown',
                    segments: d1Result.segments
                };
                // Warm R2 cache (non-blocking)
                saveTranscriptToR2(r2, videoId, d1Result.language, d1Result.segments, 'ai').catch(() => { });
                return jsonResponse(response);
            }

            // 3. Check D1 for pending job (persistent across refreshes)
            const pendingJob = await getPendingJob(db, videoId);
            if (pendingJob?.gladia_result_url) {
                log('Found pending job in D1:', videoId);
                resultUrl = pendingJob.gladia_result_url;
            }

            // Opportunistic cleanup of stale pending jobs (non-blocking)
            cleanupStalePendingJobs(db).catch(() => { });

            // Only submit new job if we didn't find a pending one
            if (!resultUrl) {
                // Rate limit check for new requests
                const clientIP = getClientIP(request);
                const rateCheck = await checkRateLimit(TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);
                if (!rateCheck.allowed) {
                    return rateLimitResponse(rateCheck.resetAt);
                }

                // Increment rate limit counter
                await incrementRateLimit(TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);

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
                savePendingJob(db, videoId, 'ai', resultUrl).catch(() => { });
            }
        }

        // Step 2: Poll for results with exponential backoff
        const startTime = Date.now();
        let delay = INITIAL_DELAY_MS;

        // Poll as long as we have time left in this function execution
        while (Date.now() - startTime < MAX_DURATION_MS) {

            // Check if we are running out of time
            if (Date.now() - startTime > 20000) { // If > 20s passed, return processing status
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
                    // Apply exponential backoff and continue
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

                    // Clean segments server-side for deduplication and timing fixes
                    const segments = cleanTranscriptSegments(rawSegments);

                    const response = {
                        success: true,
                        language: resultData.result?.transcription?.languages?.[0] || 'unknown',
                        duration: resultData.result?.metadata?.audio_duration || 0,
                        segments
                    };

                    // Save to R2 (primary storage)
                    if (r2 && videoId && segments.length > 0) {
                        saveTranscriptToR2(r2, videoId, response.language || lang, segments, 'ai').catch(() => { });
                    }

                    // Complete the pending job in D1 (updates status and clears result_url)
                    if (db && videoId && segments.length > 0) {
                        completePendingJob(db, videoId, response.language || 'ai', segments).catch(() => { });
                    }

                    return jsonResponse(response);
                }

                if (resultData.status === 'error') {
                    throw new Error(`Gladia error: ${resultData.error_message}`);
                }

                // Still processing, apply exponential backoff
                delay = Math.min(delay * 2, MAX_DELAY_MS);

            } catch (fetchError) {
                // Handle fetch timeout or network errors, continue polling
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
        return jsonResponse({
            error: `AI transcription failed: ${error.message}`
        }, 500);
    }
}
