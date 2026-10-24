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

import { jsonResponse, handleOptions, sanitizeVideoId, errorResponse } from '../utils/utils.js';
import {
    getVideoLanguages,
    saveVideoLanguages,
    detectLevelFromMetadata,
    labelToTier
} from '../data/video-info-db.js';
import { detectVideoCategory } from '../services/category.service.js';
import { getVideoMetadata, fetchChannelAvatar, fetchYouTubeDuration, fetchYouTubeVideoDetails } from '../middlewares/video-validator.js';
import { getTranscriptFromR2 } from '../data/transcript-r2.js';
import { consumeRateLimit, getClientIdentifier, rateLimitResponse } from '../middlewares/rate-limiter.js';

const RATE_LIMIT_CONFIG = { max: 120, windowSeconds: 60, keyPrefix: 'video_info' };

// In-memory cache across warm Worker isolate requests (Rule 2: In-Memory First)
const memVideoInfoCache = new Map();
const MAX_MEM_CACHE = 500;
const MEM_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour warm memory cache

// Handle preflight requests
export async function onRequestOptions() {
    return handleOptions(['GET', 'POST', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request, env } = context;

    // Rate limiting to protect from outbound request flooding
    const clientId = getClientIdentifier(request);
    const rateLimit = await consumeRateLimit(env?.TRANSCRIPT_CACHE, clientId, RATE_LIMIT_CONFIG, context);
    if (!rateLimit.allowed) {
        return rateLimitResponse(rateLimit.resetAt);
    }

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
            // Auto-heal missing duration server-side
            if (!d1Result.durationSeconds || d1Result.durationSeconds <= 0) {
                let resolvedDuration = await fetchYouTubeDuration(videoId).catch(() => null);
                if (!resolvedDuration && env.TRANSCRIPT_STORAGE && d1Result.availableLanguages?.length > 0) {
                    const r2Obj = await getTranscriptFromR2(env.TRANSCRIPT_STORAGE, videoId, d1Result.availableLanguages[0]).catch(() => null);
                    if (r2Obj?.segments?.length > 0) {
                        const last = r2Obj.segments[r2Obj.segments.length - 1];
                        const inferred = Math.round((last.start || 0) + (last.duration || 0));
                        if (inferred > 0) resolvedDuration = inferred;
                    }
                }
                if (resolvedDuration && resolvedDuration > 0) {
                    d1Result.durationSeconds = resolvedDuration;
                    context.waitUntil?.(
                        db.prepare(
                            `UPDATE video_languages SET duration_seconds = ?, updated_at = strftime('%s', 'now') WHERE video_id = ? AND (duration_seconds IS NULL OR duration_seconds <= 0)`
                        ).bind(resolvedDuration, videoId).run().catch(err => console.error('[VideoInfo] Auto-heal error:', err))
                    );
                }
            }

            let levels = d1Result.levels || {};
            if (Object.keys(levels).length === 0) {
                const detected = detectLevelFromMetadata(d1Result.title, d1Result.channel);
                if (detected) {
                    const tier = labelToTier(detected.level) || 'intermediate';
                    levels[detected.lang] = {
                        level: detected.level,
                        tier,
                        score: tier === 'beginner' ? 1.0 : (tier === 'elementary' ? 2.0 : (tier === 'intermediate' ? 3.0 : (tier === 'upper_intermediate' ? 4.0 : 5.0))),
                        confidence: 0.95,
                        method: 'metadata',
                        updatedAt: Math.floor(Date.now() / 1000)
                    };
                    context.waitUntil?.(
                        saveVideoLanguages(db, videoId, d1Result.availableLanguages, d1Result.durationSeconds, d1Result.title, d1Result.channel, d1Result.hasAutoCaptions, levels, d1Result.channelAvatar)
                            .catch(err => console.error('[VideoInfo] Level save error:', err))
                    );
                }
            }

            const category = d1Result.category && d1Result.category !== 'general'
                ? d1Result.category
                : detectVideoCategory({ title: d1Result.title, channel: d1Result.channel, tags: d1Result.tags || [] });

            const result = {
                videoId,
                title: d1Result.title,
                duration: d1Result.durationSeconds,
                availableLanguages: d1Result.availableLanguages,
                subLanguages: d1Result.subLanguages || [],
                hasAutoCaptions: d1Result.hasAutoCaptions,
                channel: d1Result.channel,
                channelAvatar: d1Result.channelAvatar || null,
                levels,
                category,
                tags: d1Result.tags || []
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

        // Step 3: Fetch from YouTube oEmbed & scrape duration + genre/tags concurrently server-side
        const [metadata, ytDetails] = await Promise.all([
            getVideoMetadata(videoId),
            fetchYouTubeVideoDetails(videoId).catch(() => ({ duration: null, isLive: false, genre: null, tags: [] }))
        ]);

        if (!metadata) {
            return jsonResponse({
                videoId,
                error: 'Video not found or unavailable',
                availableLanguages: [],
                levels: {}
            }, 404);
        }

        const serverDuration = ytDetails?.duration || null;
        const genre = ytDetails?.genre || null;
        const tags = ytDetails?.tags || [];
        const category = detectVideoCategory({
            title: metadata.title,
            channel: metadata.author_name,
            genre,
            tags
        });

        // Check for level in title/author
        const levels = {};
        const detected = detectLevelFromMetadata(metadata.title, metadata.author_name);
        if (detected) {
            const tier = labelToTier(detected.level) || 'intermediate';
            levels[detected.lang] = {
                level: detected.level,
                tier,
                score: tier === 'beginner' ? 1.0 : (tier === 'elementary' ? 2.0 : (tier === 'intermediate' ? 3.0 : (tier === 'upper_intermediate' ? 4.0 : 5.0))),
                confidence: 0.95,
                method: 'metadata',
                updatedAt: Math.floor(Date.now() / 1000)
            };
        }

        // Try to fetch channel avatar from author channel page
        let channelAvatar = null;
        if (metadata.author_url) {
            channelAvatar = await fetchChannelAvatar(metadata.author_url);
        }

        const result = {
            videoId,
            title: metadata.title,
            duration: serverDuration,
            availableLanguages: [], // Will be populated when transcripts are fetched
            subLanguages: d1Result?.subLanguages || [],
            hasAutoCaptions: false,
            channel: metadata.author_name,
            channelAvatar,
            levels,
            category,
            tags
        };

        // Save to D1 (D1 has 100,000 writes/day vs KV's 1,000 writes/day)
        // PRESERVE existing languages if the row already exists (but had missing metadata)
        const existingLangs = d1Result?.availableLanguages || [];

        await saveVideoLanguages(db, videoId, existingLangs, serverDuration, metadata.title, metadata.author_name, false, levels, channelAvatar, null, category, tags);

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
        return errorResponse('Failed to fetch video info', 500);
    }
}

/**
 * Client Duration & Metadata Backfill
 * Allows web or mobile players to report accurate duration once YouTube player metadata loads.
 */
export async function onRequestPost(context) {
    const { request, env } = context;
    const clientId = getClientIdentifier(request);
    const rateLimit = await consumeRateLimit(env?.TRANSCRIPT_CACHE, clientId, RATE_LIMIT_CONFIG, context);
    if (!rateLimit.allowed) {
        return rateLimitResponse(rateLimit.resetAt);
    }

    try {
        const body = await request.json();
        const videoId = sanitizeVideoId(body.videoId);
        const duration = typeof body.duration === 'number' ? Math.round(body.duration) : null;
        if (!videoId || !duration || duration <= 0 || duration > 14400) {
            return jsonResponse({ error: 'Invalid videoId or duration' }, 400);
        }

        const db = env?.VOCAB_DB;
        if (db) {
            await db.prepare(`
                INSERT INTO video_languages 
                (video_id, available_languages, sub_languages, duration_seconds, created_at, updated_at)
                VALUES (?, '[]', '[]', ?, strftime('%s', 'now'), strftime('%s', 'now'))
                ON CONFLICT(video_id) DO UPDATE SET
                  duration_seconds = COALESCE(video_languages.duration_seconds, excluded.duration_seconds),
                  updated_at = strftime('%s', 'now')
            `).bind(videoId, duration).run();

            memVideoInfoCache.delete(videoId);
        }

        return jsonResponse({ success: true, videoId, duration }, 200);
    } catch {
        return errorResponse('Failed to update video info', 500);
    }
}
