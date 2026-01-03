/**
 * Video Info API (Cloudflare Function)
 * Two-tier cached video metadata endpoint
 * 
 * Route: GET /api/video-info?videoId=xxx
 * 
 * Lookup flow:
 * 1. Check KV cache (fast, 24hr TTL)
 * 2. If miss → Check D1 video_languages (persistent)
 * 3. If miss → Fetch from YouTube oEmbed, save to both D1 + KV
 * 
 * Returns: { videoId, title, duration, availableLanguages, hasAutoCaptions, channel }
 */

import { jsonResponse, handleOptions, sanitizeVideoId } from '../_shared/utils.js';
import {
    getVideoLanguages,
    saveVideoLanguages,
    getVideoInfoFromKV,
    saveVideoInfoToKV
} from '../_shared/video-info-db.js';
import { getVideoMetadata } from '../_shared/video-validator.js';

// Handle preflight requests
export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const videoId = sanitizeVideoId(url.searchParams.get('videoId'));

    if (!videoId) {
        return jsonResponse({ error: 'Missing or invalid videoId parameter' }, 400);
    }

    const kv = env.TRANSCRIPT_CACHE;
    const db = env.VOCAB_DB;

    try {
        // Step 1: Check KV cache (fast path)
        const kvResult = await getVideoInfoFromKV(kv, videoId);
        if (kvResult) {
            return jsonResponse({ ...kvResult, source: 'cache:kv' }, 200, { 'X-Cache': 'HIT' });
        }

        // Step 2: Check D1 (persistent storage)
        const d1Result = await getVideoLanguages(db, videoId);
        if (d1Result) {
            const result = {
                videoId,
                title: d1Result.title,
                duration: d1Result.durationSeconds,
                availableLanguages: d1Result.availableLanguages,
                hasAutoCaptions: d1Result.hasAutoCaptions,
                channel: d1Result.channel
            };

            // Populate KV for faster future lookups
            saveVideoInfoToKV(kv, videoId, result).catch(() => { });

            return jsonResponse({ ...result, source: 'cache:d1' }, 200, { 'X-Cache': 'HIT' });
        }

        // Step 3: Fetch from YouTube oEmbed
        const metadata = await getVideoMetadata(videoId);
        if (!metadata) {
            return jsonResponse({
                videoId,
                error: 'Video not found or unavailable',
                availableLanguages: []
            }, 404);
        }

        // YouTube oEmbed doesn't provide language info or duration
        // We'll get these when actually fetching transcripts
        const result = {
            videoId,
            title: metadata.title,
            duration: null, // oEmbed doesn't provide duration
            availableLanguages: [], // Will be populated when transcripts are fetched
            hasAutoCaptions: false,
            channel: metadata.author_name
        };

        // Only save to KV cache - languages will be populated when transcripts are fetched
        // Don't save empty languages to D1 as it interferes with language detection
        await saveVideoInfoToKV(kv, videoId, result);

        return jsonResponse({ ...result, source: 'youtube' }, 200, { 'X-Cache': 'MISS' });

    } catch (error) {
        console.error('[VideoInfo] Error:', error.message);
        return jsonResponse({ error: error.message }, 500);
    }
}
