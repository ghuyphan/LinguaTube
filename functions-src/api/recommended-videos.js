/**
 * Recommended Videos API (Cloudflare Pages Function)
 * Discovers videos with verified transcripts in Cloudflare (D1 & R2) matching the user's target language.
 * 
 * Route: GET /api/recommended-videos?lang=ja&limit=12
 */

import { jsonResponse, handleOptions } from '../utils/utils.js';
import { isLanguageSupported } from '../middlewares/video-validator.js';
import { getRecommendedVideosFromCloudflare } from '../data/video-info-db.js';

// In-memory cache across warm Worker isolate requests
const memCache = new Map();
const MEM_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const VALID_TIERS = new Set(['beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced']);

const CDN_CACHE_HEADER = 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400';

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

    const isRefresh = url.searchParams.get('refresh') === 'true' || url.searchParams.get('force') === 'true';
    const cacheKey = `${lang}_${tier || 'all'}_${limit}`;

    // 1. Fast in-memory cache check (warm isolate) - bypassed when user forces reload
    if (!isRefresh) {
        const cached = memCache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp < MEM_CACHE_TTL_MS)) {
            return jsonResponse({
                success: true,
                language: lang,
                tier: tier || undefined,
                count: cached.videos.length,
                videos: cached.videos,
                source: 'cache:memory'
            }, 200, {
                'X-Cache': 'HIT-MEMORY',
                'Cache-Control': CDN_CACHE_HEADER
            });
        }
    }

    // 2. Query Cloudflare (D1 database + R2 storage) with candidate shuffling on refresh
    const db = env?.VOCAB_DB;
    const r2 = env?.TRANSCRIPT_STORAGE;
    const videos = await getRecommendedVideosFromCloudflare(db, r2, lang, limit, tier, isRefresh);

    // Save to isolate memory cache
    memCache.set(cacheKey, {
        videos,
        timestamp: Date.now()
    });

    return jsonResponse({
        success: true,
        language: lang,
        tier: tier || undefined,
        count: videos.length,
        videos,
        source: isRefresh ? 'cloudflare:refresh' : 'cloudflare'
    }, 200, {
        'X-Cache': isRefresh ? 'BYPASS' : 'MISS',
        'Cache-Control': isRefresh ? 'no-cache, no-store, must-revalidate' : CDN_CACHE_HEADER
    });
}
