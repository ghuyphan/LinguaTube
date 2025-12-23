/**
 * AssemblyAI Transcription API (Cloudflare Function)
 * Uses AssemblyAI for better free tier (100 hours/month)
 * Proxies YouTube audio stream to avoid "invalid file" errors
 */

import { jsonResponse, handleOptions, errorResponse } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
import { fetchVideoData, getAudioUrl } from '../_shared/youtube.js';

const DEBUG = true;
const MAX_DURATION_MS = 25000; // 25s max execution time
const INITIAL_DELAY_MS = 1000;
const MAX_DELAY_MS = 5000;

function log(...args) {
    if (DEBUG) console.log('[AssemblyAI]', ...args);
}

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const TRANSCRIPT_CACHE = env.TRANSCRIPT_CACHE;

    try {
        const body = await request.json();
        const { videoId, transcript_id } = body;

        const aaiKey = env.ASSEMBLYAI_API_KEY;
        if (!aaiKey) return errorResponse('ASSEMBLYAI_API_KEY not set');

        const ytKey = env.INNERTUBE_API_KEY; // Needed for audio extraction

        let currentTranscriptId = transcript_id;

        // Step 1: Submit new job if no transcript_id provided
        if (!currentTranscriptId) {
            // Check cache first
            if (TRANSCRIPT_CACHE) {
                try {
                    // Use V3 cache key to avoid conflicts with previous implementations
                    const cached = await TRANSCRIPT_CACHE.get(`transcript:v3:${videoId}`, 'json');
                    if (cached) {
                        log('Cache hit:', videoId);
                        return jsonResponse(cached);
                    }
                } catch (e) { }
            }

            log('Extracting audio for:', videoId);

            // Get direct audio stream URL
            // We need to fetch video data first
            let videoData;
            try {
                videoData = await fetchVideoData(videoId, ytKey || 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w'); // Fallback key if needed
            } catch (e) {
                throw new Error(`YouTube fetch failed: ${e.message}`);
            }

            let audioUrl = getAudioUrl(videoData);

            // Fallback: Try Piped API mirrors
            if (!audioUrl) {
                log('Internal extraction failed, trying Piped API...');
                const pipeds = [
                    'https://pipedapi.kavin.rocks',
                    'https://api.piped.otter.sh'
                ];

                for (const base of pipeds) {
                    try {
                        const pipedRes = await fetch(`${base}/streams/${videoId}`);
                        if (pipedRes.ok) {
                            const pipedData = await pipedRes.json();
                            const audioStreams = pipedData.audioStreams || [];
                            const bestStream = audioStreams.sort((a, b) => b.bitrate - a.bitrate)[0];

                            if (bestStream) {
                                audioUrl = bestStream.url;
                                log(`Got audio URL from ${base}`);
                                break;
                            }
                        }
                    } catch (e) {
                        log(`Piped ${base} failed:`, e.message);
                    }
                }
            }

            if (!audioUrl) {
                throw new Error('No audio stream found');
            }

            // Submit to AssemblyAI
            log('Submitting to AssemblyAI...');
            const submitResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
                method: 'POST',
                headers: {
                    'Authorization': aaiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    audio_url: audioUrl,
                    speaker_labels: true, // Forces utterance segmentation
                    language_detection: true // Auto-detect language
                })
            });

            if (!submitResponse.ok) {
                const err = await submitResponse.json();
                throw new Error(`AssemblyAI submit failed: ${err.error}`);
            }

            const submitData = await submitResponse.json();
            currentTranscriptId = submitData.id;
        }

        // Step 2: Poll for results
        const startTime = Date.now();
        let delay = INITIAL_DELAY_MS;

        while (Date.now() - startTime < MAX_DURATION_MS) {

            // Check remaining time
            if (Date.now() - startTime > 20000) {
                return jsonResponse({
                    status: 'processing',
                    transcript_id: currentTranscriptId
                });
            }

            await new Promise(r => setTimeout(r, delay));

            const pollResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${currentTranscriptId}`, {
                headers: { 'Authorization': aaiKey }
            });

            if (!pollResponse.ok) {
                delay = Math.min(delay * 2, MAX_DELAY_MS);
                continue;
            }

            const data = await pollResponse.json();

            if (data.status === 'completed') {
                // Map utterances to our segment format
                const utterances = data.utterances || [];

                // Fallback to words if no utterances (shouldn't happen with speaker_labels: true)
                if (utterances.length === 0 && data.words?.length > 0) {
                    // Simple sentence grouping logic could go here, but let's rely on utterances for now
                    // or just wrap everything in one big segment if desperate
                    log('Warning: No utterances found, using fallback (not implemented)');
                }

                const rawSegments = utterances.map((utt, idx) => ({
                    id: idx,
                    text: utt.text,
                    start: utt.start / 1000, // AAI uses ms
                    duration: (utt.end - utt.start) / 1000
                }));

                const cleanedSegments = cleanTranscriptSegments(rawSegments);

                const response = {
                    success: true,
                    language: data.language_code,
                    segments: cleanedSegments
                };

                // Cache result
                if (TRANSCRIPT_CACHE && videoId) {
                    try {
                        await TRANSCRIPT_CACHE.put(
                            `transcript:v3:${videoId}`,
                            JSON.stringify(response),
                            { expirationTtl: 60 * 60 * 24 * 30 }
                        );
                    } catch (e) { }
                }

                return jsonResponse(response);
            }

            if (data.status === 'error') {
                throw new Error(`AssemblyAI error: ${data.error}`);
            }

            delay = Math.min(delay * 2, MAX_DELAY_MS);
        }

        return jsonResponse({
            status: 'processing',
            transcript_id: currentTranscriptId
        });

    } catch (error) {
        console.error('[AssemblyAI] Error:', error.message);
        return jsonResponse({ error: error.message }, 500);
    }
}
