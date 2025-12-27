/**
 * Whisper/Gladia Transcription API (Cloudflare Function)
 * Uses Gladia API for YouTube video transcription
 * Features: D1 persistent pending state, KV caching, exponential backoff
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
import { getTranscript, getPendingJob, savePendingJob, completePendingJob, cleanupStalePendingJobs } from '../_shared/transcript-db.js';
import { checkRateLimit, incrementRateLimit, getClientIP, rateLimitResponse } from '../_shared/rate-limiter.js';

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
    const TRANSCRIPT_CACHE = env.TRANSCRIPT_CACHE;
    const db = env.VOCAB_DB; // D1 for persistent storage

    try {
        const body = await request.json();
        const { videoId, result_url: providedResultUrl } = body;

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

            // 1. Check KV cache for completed transcripts
            if (TRANSCRIPT_CACHE) {
                try {
                    const cached = await TRANSCRIPT_CACHE.get(`transcript:v4:${videoId}`, 'json');
                    if (cached) {
                        log('KV cache hit for', videoId);
                        return jsonResponse(cached);
                    }
                } catch (e) {
                    // Cache read failed, continue
                }
            }

            // 2. Check D1 database for completed transcript
            const d1Result = await getTranscript(db, videoId, 'ai');
            if (d1Result?.segments?.length > 0) {
                log('D1 hit for AI transcript:', videoId);
                const response = {
                    success: true,
                    language: d1Result.language || 'unknown',
                    segments: d1Result.segments
                };
                // Warm KV cache (non-blocking)
                if (TRANSCRIPT_CACHE) {
                    TRANSCRIPT_CACHE.put(
                        `transcript:v4:${videoId}`,
                        JSON.stringify(response),
                        { expirationTtl: 60 * 60 * 24 * 30 }
                    ).catch(() => { });
                }
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
                // Check video duration limit (client must provide duration)
                const duration = body.duration;
                if (duration && duration > MAX_VIDEO_DURATION_SECONDS) {
                    return jsonResponse({
                        error: 'video_too_long',
                        message: `Video exceeds maximum duration of 60 minutes for AI transcription.`,
                        maxDuration: MAX_VIDEO_DURATION_SECONDS
                    }, 400);
                }

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

                    // Cache the result (expire in 30 days) - ONLY if we have videoId
                    if (TRANSCRIPT_CACHE && videoId) {
                        try {
                            await TRANSCRIPT_CACHE.put(
                                `transcript:v4:${videoId}`,
                                JSON.stringify(response),
                                { expirationTtl: 60 * 60 * 24 * 30 }
                            );
                        } catch (e) {
                            // Cache write failed, continue
                        }
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
