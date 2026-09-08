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

import { jsonResponse, handleOptions, sanitizeVideoId } from '../utils/utils.js';
import {
    getVideoLanguages,
    saveVideoLanguages,
    detectLevelFromMetadata
} from '../data/video-info-db.js';
import { getVideoMetadata } from '../middlewares/video-validator.js';

// In-memory cache across warm Worker isolate requests (Rule 2: In-Memory First)
const memVideoInfoCache = new Map();
const MAX_MEM_CACHE = 500;
const MEM_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour warm memory cache

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

    const db = env.VOCAB_DB;
    const CDN_CACHE_HEADER = 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400';

    try {
        // Step 1: Check in-memory isolate cache (0 KV, 0 D1, < 0.1ms)
        const memHit = memVideoInfoCache.get(videoId);
        if (memHit && (Date.now() - memHit.timestamp < MEM_CACHE_TTL_MS)) {
            return jsonResponse({ ...memHit.data, source: 'cache:memory' }, 200, {
                'X-Cache': 'HIT-MEMORY',
                'Cache-Control': CDN_CACHE_HEADER
            });
        }

        // Step 2: Check D1 (persistent storage: 100,000 writes/day free tier)
        const d1Result = await getVideoLanguages(db, videoId);

        // Only return if we have valid metadata (title). 
        // If innertube.js created the row first, title might be NULL.
        if (d1Result && d1Result.title) {
            let levels = d1Result.levels || {};
            if (Object.keys(levels).length === 0) {
                const detected = detectLevelFromMetadata(d1Result.title, d1Result.channel);
                if (detected) {
                    levels[detected.lang] = detected.level;
                    context.waitUntil?.(
                        saveVideoLanguages(db, videoId, d1Result.availableLanguages, d1Result.durationSeconds, d1Result.title, d1Result.channel, d1Result.hasAutoCaptions, levels)
                            .catch(err => console.error('[VideoInfo] Level save error:', err))
                    );
                }
            }

            const result = {
                videoId,
                title: d1Result.title,
                duration: d1Result.durationSeconds,
                availableLanguages: d1Result.availableLanguages,
                hasAutoCaptions: d1Result.hasAutoCaptions,
                channel: d1Result.channel,
                levels
            };

            // Save to warm memory cache
            if (memVideoInfoCache.size > MAX_MEM_CACHE) {
                const oldestKey = memVideoInfoCache.keys().next().value;
                memVideoInfoCache.delete(oldestKey);
            }
            memVideoInfoCache.set(videoId, { data: result, timestamp: Date.now() });

            return jsonResponse({ ...result, source: 'cache:d1' }, 200, {
                'X-Cache': 'HIT',
                'Cache-Control': CDN_CACHE_HEADER
            });
        }

        // Step 3: Fetch from YouTube oEmbed
        const metadata = await getVideoMetadata(videoId);
        if (!metadata) {
            return jsonResponse({
                videoId,
                error: 'Video not found or unavailable',
                availableLanguages: [],
                levels: {}
            }, 404);
        }

        // Check for level in title/author
        const levels = {};
        const detected = detectLevelFromMetadata(metadata.title, metadata.author_name);
        if (detected) {
            levels[detected.lang] = detected.level;
        }

        // YouTube oEmbed doesn't provide language info or duration
        // We'll get these when actually fetching transcripts
        const result = {
            videoId,
            title: metadata.title,
            duration: null, // oEmbed doesn't provide duration
            availableLanguages: [], // Will be populated when transcripts are fetched
            hasAutoCaptions: false,
            channel: metadata.author_name,
            levels
        };

        // Save to D1 (D1 has 100,000 writes/day vs KV's 1,000 writes/day)
        // PRESERVE existing languages if the row already exists (but had missing metadata)
        const existingLangs = d1Result?.availableLanguages || [];

        await saveVideoLanguages(db, videoId, existingLangs, null, metadata.title, metadata.author_name, false, levels);

        // Cache in memory for warm isolate reuse
        if (memVideoInfoCache.size > MAX_MEM_CACHE) {
            const oldestKey = memVideoInfoCache.keys().next().value;
            memVideoInfoCache.delete(oldestKey);
        }
        memVideoInfoCache.set(videoId, { data: result, timestamp: Date.now() });

        return jsonResponse({ ...result, source: 'youtube' }, 200, {
            'X-Cache': 'MISS',
            'Cache-Control': CDN_CACHE_HEADER
        });

    } catch (error) {
        console.error('[VideoInfo] Error:', error.message);
        return jsonResponse({ error: error.message }, 500);
    }
}
