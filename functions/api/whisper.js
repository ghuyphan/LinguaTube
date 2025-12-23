/**
 * Whisper/Gladia Transcription API (Cloudflare Function)
 * Uses Gladia API for YouTube video transcription
 * Features: KV caching, exponential backoff, timeout handling
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';

const DEBUG = false;
const MAX_DURATION_MS = 25000; // 25s max to stay within CF 30s limit
const INITIAL_DELAY_MS = 1000;
const MAX_DELAY_MS = 5000;
const FETCH_TIMEOUT_MS = 10000;

function log(...args) {
    if (DEBUG) console.log('[Gladia]', ...args);
}

// Handle preflight requests
export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

// Rate limiting configuration
const RATE_LIMIT_MAX = 10; // Max AI transcriptions per window
const RATE_LIMIT_WINDOW = 60 * 60; // 1 hour window

async function checkRateLimit(cache, clientIP) {
    if (!cache || !clientIP) return true; // Allow if no cache or IP

    const key = `ratelimit:whisper:${clientIP}`;
    try {
        const current = await cache.get(key, 'json') || { count: 0, reset: Date.now() + RATE_LIMIT_WINDOW * 1000 };

        // Reset if window expired
        if (Date.now() > current.reset) {
            return true;
        }

        return current.count < RATE_LIMIT_MAX;
    } catch {
        return true; // Allow on error
    }
}

async function incrementRateLimit(cache, clientIP) {
    if (!cache || !clientIP) return;

    const key = `ratelimit:whisper:${clientIP}`;
    try {
        const current = await cache.get(key, 'json') || { count: 0, reset: Date.now() + RATE_LIMIT_WINDOW * 1000 };

        // Reset if window expired
        if (Date.now() > current.reset) {
            current.count = 1;
            current.reset = Date.now() + RATE_LIMIT_WINDOW * 1000;
        } else {
            current.count++;
        }

        await cache.put(key, JSON.stringify(current), { expirationTtl: RATE_LIMIT_WINDOW });
    } catch {
        // Ignore rate limit errors
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const TRANSCRIPT_CACHE = env.TRANSCRIPT_CACHE;

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

            // Check cache first (only for new requests)
            if (TRANSCRIPT_CACHE) {
                try {
                    const cached = await TRANSCRIPT_CACHE.get(`transcript:v3:${videoId}`, 'json');
                    if (cached) {
                        log('Cache hit for', videoId);
                        return jsonResponse(cached);
                    }
                } catch (e) {
                    // Cache read failed, continue
                }
            }

            // Rate limit check for new requests
            const clientIP = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For')?.split(',')[0];
            if (!(await checkRateLimit(TRANSCRIPT_CACHE, clientIP))) {
                return jsonResponse({
                    error: 'Rate limit exceeded. Please try again later.',
                    retryAfter: 3600
                }, 429);
            }

            // Increment rate limit counter
            await incrementRateLimit(TRANSCRIPT_CACHE, clientIP);

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
                                `transcript:v3:${videoId}`,
                                JSON.stringify(response),
                                { expirationTtl: 60 * 60 * 24 * 30 }
                            );
                        } catch (e) {
                            // Cache write failed, continue
                        }
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
