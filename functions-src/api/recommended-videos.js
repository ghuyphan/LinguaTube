/**
 * Recommended Videos API (Cloudflare Pages Function)
 * Discovers videos with verified transcripts in Cloudflare (D1 & R2) matching the user's target language.
 * 
 * Route: GET /api/recommended-videos?lang=ja&limit=12
 */

import { jsonResponse, handleOptions } from '../utils/utils.js';
import { isLanguageSupported, resolveVideoChannelAvatar } from '../middlewares/video-validator.js';
import { getRecommendedVideosFromCloudflare } from '../data/video-info-db.js';

// In-memory cache across warm Worker isolate requests (short 30s TTL to absorb double-clicks while keeping feed fresh)
const memCache = new Map();
const MEM_CACHE_TTL_MS = 30 * 1000;
const VALID_TIERS = new Set(['beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced']);

const CACHE_CONTROL_HEADER = 'no-cache, no-store, must-revalidate';

export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);

    const rawLang = (url.searchParams.get('lang') || 'ja').toLowerCase().trim();
    const lang = isLanguageSupported(rawLang) ? rawLang : 'ja';

    const rawTier = (url.searchParams.get('tier') || '').toLowerCase().trim();
    const tier = VALID_TIERS.has(rawTier) ? rawTier : null;

    const limitParam = parseInt(url.searchParams.get('limit'), 10);
    const limit = Math.min(Math.max(isNaN(limitParam) ? 12 : limitParam, 1), 50);

    const offsetParam = parseInt(url.searchParams.get('offset'), 10);
    const offset = Math.max(isNaN(offsetParam) ? 0 : offsetParam, 0);

    const isRefresh = url.searchParams.get('refresh') === 'true' || url.searchParams.get('force') === 'true';
    const cacheKey = `${lang}_${tier || 'all'}_${limit}_${offset}`;

    // 1. Fast in-memory cache check (warm isolate) - bypassed when user forces reload
    if (!isRefresh) {
        const cached = memCache.get(cacheKey);
        if (cached && cached.videos && (Date.now() - cached.timestamp < MEM_CACHE_TTL_MS)) {
            return jsonResponse({
                success: true,
                language: lang,
                tier: tier || undefined,
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
    } else {
        memCache.delete(cacheKey);
    }

    // 2. Query Cloudflare (D1 database + R2 storage) with candidate shuffling on refresh or initial feed
    const db = env?.VOCAB_DB;
    const r2 = env?.TRANSCRIPT_STORAGE;
    const shouldShuffle = isRefresh || offset === 0;
    const videos = await getRecommendedVideosFromCloudflare(db, r2, lang, limit, tier, shouldShuffle, offset);
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

    // Save to isolate memory cache only if non-empty
    if (videos.length > 0) {
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
        source: isRefresh ? 'cloudflare:refresh' : 'cloudflare'
    }, 200, {
        'X-Cache': isRefresh ? 'BYPASS' : 'MISS',
        'Cache-Control': CACHE_CONTROL_HEADER
    });
}
