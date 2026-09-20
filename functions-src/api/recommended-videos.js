/**
 * Recommended Videos API (Cloudflare Pages Function)
 * Discovers videos with verified transcripts in Cloudflare (D1 & R2) matching the user's target language.
 * Supports server-side multi-factor ranking, Krashen i+1 leveling, active SRS vocabulary matching,
 * and deterministic infinite scroll pagination.
 * 
 * Route: GET /api/recommended-videos?lang=ja&limit=12
 * Route: POST /api/recommended-videos (with rich learner context payload)
 */

import { jsonResponse, handleOptions } from '../utils/utils.js';
import { isLanguageSupported, resolveVideoChannelAvatar } from '../middlewares/video-validator.js';
import { getRecommendedVideosFromCloudflare } from '../data/video-info-db.js';

// In-memory cache across warm Worker isolate requests for unpersonalized requests (30s TTL)
const memCache = new Map();
const MAX_MEM_CACHE_ENTRIES = 50;
const MEM_CACHE_TTL_MS = 30 * 1000;
const VALID_TIERS = new Set(['beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced']);

const CACHE_CONTROL_HEADER = 'no-cache, no-store, must-revalidate';

export async function onRequestOptions() {
    return handleOptions(['GET', 'POST', 'OPTIONS']);
}

export async function onRequestGet(context) {
    return handleRecommendedVideos(context, 'GET');
}

export async function onRequestPost(context) {
    return handleRecommendedVideos(context, 'POST');
}

async function handleRecommendedVideos(context, method) {
    const { request, env } = context;
    const url = new URL(request.url);

    let body = {};
    if (method === 'POST') {
        try {
            body = await request.json();
        } catch {
            body = {};
        }
    }

    const rawLang = (body.lang || url.searchParams.get('lang') || 'ja').toLowerCase().trim();
    const lang = isLanguageSupported(rawLang) ? rawLang : 'ja';

    const rawTier = (body.tier || url.searchParams.get('tier') || '').toLowerCase().trim();
    const tier = VALID_TIERS.has(rawTier) ? rawTier : null;

    const limitParam = parseInt(body.limit ?? url.searchParams.get('limit'), 10);
    const limit = Math.min(Math.max(isNaN(limitParam) ? 12 : limitParam, 1), 50);

    const offsetParam = parseInt(body.offset ?? url.searchParams.get('offset'), 10);
    const offset = Math.max(isNaN(offsetParam) ? 0 : offsetParam, 0);

    const rawQuery = (body.q || body.query || url.searchParams.get('q') || url.searchParams.get('query') || '').trim();
    const query = rawQuery.length > 0 ? rawQuery.slice(0, 100) : null;

    const sessionSeedParam = parseInt(body.sessionSeed ?? url.searchParams.get('seed'), 10);
    const sessionSeed = isNaN(sessionSeedParam) ? 12345 : sessionSeedParam;

    const userContext = (body.context && typeof body.context === 'object') ? body.context : null;
    const isRefresh = body.refresh === true || url.searchParams.get('refresh') === 'true' || url.searchParams.get('force') === 'true';

    const isPersonalized = Boolean(userContext && (
        (Array.isArray(userContext.watched) && userContext.watched.length > 0) ||
        (userContext.inProgress && Object.keys(userContext.inProgress).length > 0) ||
        (Array.isArray(userContext.vocabWords) && userContext.vocabWords.length > 0) ||
        (Array.isArray(userContext.topChannels) && userContext.topChannels.length > 0)
    ));

    const cacheKey = `${lang}_${tier || 'all'}_${limit}_${offset}_${query || ''}_${sessionSeed}`;

    // 1. Fast in-memory cache check (warm isolate) for generic unpersonalized requests
    if (!isRefresh && !isPersonalized) {
        const cached = memCache.get(cacheKey);
        if (cached && cached.videos && (Date.now() - cached.timestamp < MEM_CACHE_TTL_MS)) {
            return jsonResponse({
                success: true,
                language: lang,
                tier: tier || undefined,
                query: query || undefined,
                count: cached.videos.length,
                offset,
                hasMore: cached.hasMore ?? (cached.videos.length >= limit),
                videos: cached.videos,
                source: 'cache:memory'
            }, 200, {
                'X-Cache': 'HIT-MEMORY',
                'Cache-Control': CACHE_CONTROL_HEADER
            });
        }
    } else if (!isPersonalized) {
        memCache.delete(cacheKey);
    }

    // 2. Query Cloudflare (D1 database + R2 storage) with server-side candidate ranking
    const db = env?.VOCAB_DB;
    const r2 = env?.TRANSCRIPT_STORAGE;
    const shouldShuffle = isRefresh || offset === 0;

    const videos = await getRecommendedVideosFromCloudflare(
        db,
        r2,
        lang,
        limit,
        tier,
        shouldShuffle,
        offset,
        query,
        { context: userContext, sessionSeed }
    );
    const hasMore = videos.length >= limit;

    // 3. Self-healing: if any returned videos lack channelAvatar, resolve and update D1 in background
    if (db && typeof context?.waitUntil === 'function') {
        const missingAvatars = videos.filter(v => !v.channelAvatar && v.videoId);
        if (missingAvatars.length > 0) {
            context.waitUntil((async () => {
                for (const v of missingAvatars.slice(0, 5)) {
                    try {
                        const avatar = await resolveVideoChannelAvatar(v.videoId);
                        if (avatar) {
                            await db.prepare(`
                                UPDATE video_languages 
                                SET channel_avatar = ?, updated_at = strftime('%s', 'now') 
                                WHERE video_id = ?
                            `).bind(avatar, v.videoId).run();
                            v.channelAvatar = avatar;
                        }
                    } catch { }
                }
            })());
        }
    }

    // Save unpersonalized results to isolate memory cache
    if (!isPersonalized && videos.length > 0) {
        if (memCache.size >= MAX_MEM_CACHE_ENTRIES) {
            const oldestKey = memCache.keys().next().value;
            if (oldestKey) memCache.delete(oldestKey);
        }
        memCache.set(cacheKey, {
            videos,
            hasMore,
            timestamp: Date.now()
        });
    }

    return jsonResponse({
        success: true,
        language: lang,
        tier: tier || undefined,
        count: videos.length,
        offset,
        hasMore,
        videos,
        source: isPersonalized
            ? 'cloudflare:personalized'
            : (isRefresh ? 'cloudflare:refresh' : 'cloudflare')
    }, 200, {
        'X-Cache': isPersonalized ? 'BYPASS-PERSONALIZED' : (isRefresh ? 'BYPASS' : 'MISS'),
        'Cache-Control': CACHE_CONTROL_HEADER
    });
}
