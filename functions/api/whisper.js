/**
 * Whisper/AssemblyAI Transcription API (Cloudflare Function)
 * Uses AssemblyAI API for YouTube video transcription
 * Features: KV caching, exponential backoff, timeout handling
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';

const DEBUG = false;
const MAX_DURATION_MS = 25000; // 25s max to stay within CF 30s limit
const INITIAL_DELAY_MS = 2000;
const MAX_DELAY_MS = 5000;
const FETCH_TIMEOUT_MS = 10000;

function log(...args) {
    if (DEBUG) console.log('[AssemblyAI]', ...args);
}

// Handle preflight requests
export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const TRANSCRIPT_CACHE = env.TRANSCRIPT_CACHE;

    try {
        const body = await request.json();
        const { videoId, transcript_id: providedTranscriptId } = body;

        const apiKey = env.ASSEMBLYAI_API_KEY;
        if (!apiKey) {
            return errorResponse('ASSEMBLYAI_API_KEY not set');
        }

        const headers = {
            'Authorization': apiKey,
            'Content-Type': 'application/json',
        };

        let transcriptId = providedTranscriptId;

        // Step 1: Submit transcription request (Only if not polling existing job)
        if (!transcriptId) {
            // Validate video ID only for new requests
            if (!validateVideoId(videoId)) {
                return jsonResponse({ error: 'Invalid or missing videoId' }, 400);
            }

            // Check cache first (only for new requests)
            if (TRANSCRIPT_CACHE) {
                try {
                    const cached = await TRANSCRIPT_CACHE.get(`transcript:${videoId}`, 'json');
                    if (cached) {
                        log('Cache hit for', videoId);
                        return jsonResponse(cached);
                    }
                } catch (e) {
                    // Cache read failed, continue
                }
            }

            const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

            // Submit transcription to AssemblyAI
            const submitResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    audio_url: youtubeUrl,
                    language_detection: true, // Auto-detect Japanese, Chinese, Korean, etc.
                }),
                signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
            });

            if (!submitResponse.ok) {
                const errorText = await submitResponse.text();
                throw new Error(`AssemblyAI submit failed: ${submitResponse.status} - ${errorText}`);
            }

            const submitData = await submitResponse.json();
            transcriptId = submitData.id;

            if (!transcriptId) {
                throw new Error('No transcript ID from AssemblyAI');
            }

            log('Submitted transcription, ID:', transcriptId);
        }

        // Step 2: Poll for results with exponential backoff
        const startTime = Date.now();
        let delay = INITIAL_DELAY_MS;
        const pollUrl = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;

        // Poll as long as we have time left in this function execution
        while (Date.now() - startTime < MAX_DURATION_MS) {

            // Check if we are running out of time
            if (Date.now() - startTime > 20000) { // If > 20s passed, return processing status
                return jsonResponse({
                    status: 'processing',
                    transcript_id: transcriptId
                });
            }

            await new Promise(resolve => setTimeout(resolve, delay));

            try {
                const resultResponse = await fetch(pollUrl, {
                    headers: { 'Authorization': apiKey },
                    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
                });

                if (!resultResponse.ok) {
                    // Apply exponential backoff and continue
                    delay = Math.min(delay * 2, MAX_DELAY_MS);
                    continue;
                }

                const resultData = await resultResponse.json();

                if (resultData.status === 'completed') {
                    // AssemblyAI returns words array with start/end times in milliseconds
                    const words = resultData.words || [];

                    // Group words into segments (sentences/phrases)
                    // AssemblyAI provides utterances if speaker_labels is enabled,
                    // otherwise we need to create segments from words
                    let rawSegments = [];

                    if (resultData.utterances && resultData.utterances.length > 0) {
                        // Use utterances if available
                        rawSegments = resultData.utterances.map((utt, index) => ({
                            id: index,
                            text: utt.text?.trim() || '',
                            start: (utt.start || 0) / 1000, // Convert ms to seconds
                            duration: ((utt.end || 0) - (utt.start || 0)) / 1000
                        }));
                    } else {
                        // Fallback: create segments from text using sentence boundaries
                        // Split the full text by sentence-ending punctuation
                        const fullText = resultData.text || '';
                        const sentences = fullText.split(/(?<=[.!?。！？])\s+/).filter(s => s.trim());

                        // Create segments with estimated timing based on word positions
                        let wordIndex = 0;
                        sentences.forEach((sentence, index) => {
                            const sentenceWords = sentence.split(/\s+/).length;
                            const startWord = words[wordIndex];
                            const endWordIndex = Math.min(wordIndex + sentenceWords - 1, words.length - 1);
                            const endWord = words[endWordIndex];

                            if (startWord) {
                                rawSegments.push({
                                    id: index,
                                    text: sentence.trim(),
                                    start: (startWord.start || 0) / 1000,
                                    duration: ((endWord?.end || startWord.end || 0) - (startWord.start || 0)) / 1000
                                });
                            }
                            wordIndex += sentenceWords;
                        });

                        // If no segments created, use full text as single segment
                        if (rawSegments.length === 0 && fullText) {
                            rawSegments.push({
                                id: 0,
                                text: fullText,
                                start: words[0]?.start ? words[0].start / 1000 : 0,
                                duration: words.length > 0
                                    ? (words[words.length - 1].end - words[0].start) / 1000
                                    : 0
                            });
                        }
                    }

                    // Clean segments server-side for deduplication and timing fixes
                    const segments = cleanTranscriptSegments(rawSegments);

                    const response = {
                        success: true,
                        language: resultData.language_code || 'unknown',
                        duration: resultData.audio_duration || 0,
                        segments
                    };

                    // Cache the result (expire in 30 days) - ONLY if we have videoId
                    if (TRANSCRIPT_CACHE && videoId) {
                        try {
                            await TRANSCRIPT_CACHE.put(
                                `transcript:${videoId}`,
                                JSON.stringify(response),
                                { expirationTtl: 60 * 60 * 24 * 30 }
                            );
                        } catch (e) {
                            // Cache write failed, continue
                        }
                    }

                    log('Transcription complete:', segments.length, 'segments');
                    return jsonResponse(response);
                }

                if (resultData.status === 'error') {
                    throw new Error(`AssemblyAI error: ${resultData.error}`);
                }

                // Still processing (queued or processing), apply backoff
                log('Status:', resultData.status);
                delay = Math.min(delay * 2, MAX_DELAY_MS);

            } catch (fetchError) {
                // Handle fetch timeout or network errors, continue polling
                log('Poll error:', fetchError.message);
                delay = Math.min(delay * 2, MAX_DELAY_MS);
            }
        }

        // If we exit the loop, we ran out of time - return for client to continue polling
        return jsonResponse({
            status: 'processing',
            transcript_id: transcriptId
        });

    } catch (error) {
        console.error('[AssemblyAI] Error:', error.message);
        return jsonResponse({
            error: `AI transcription failed: ${error.message}`
        }, 500);
    }
}
