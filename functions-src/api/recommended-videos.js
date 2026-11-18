/**
 * Recommended Videos API (Cloudflare Pages Function)
 * Home/Explore discovery feed with personalized learner ranking and deterministic pagination.
 *
 * Route: GET /api/recommended-videos?lang=ja&limit=12
 * Route: POST /api/recommended-videos (with bounded learner context payload)
 */

import { jsonResponse } from '../utils/utils.js';
import { scheduleMetadataHealing } from '../middlewares/video-validator.js';
import { getRecommendedVideosFromCloudflare } from '../data/video-info-db.js';
import { parseRecommendationRequest, recommendationResponseHeaders } from '../services/recommendation.service.js';

export async function onRequestGet(context) {
    return handleRecommendedVideos(context, 'GET');
}

export async function onRequestPost(context) {
    return handleRecommendedVideos(context, 'POST');
}

async function handleRecommendedVideos(context, method) {
    const parsed = await parseRecommendationRequest(context, method, { defaultLimit: 12 });
    if (parsed.errorResponse) return parsed.errorResponse;

    const { lang, tier, category, limit, offset, query, isRefresh, sessionSeed, userContext, excludeIds, isPersonalized } = parsed.params;
    const db = context.env?.VOCAB_DB;
    const r2 = context.env?.TRANSCRIPT_STORAGE;
    const shouldShuffle = isRefresh || offset === 0;
    const metrics = {};

    let videos;
    let hasMore;
    try {
        ({ videos, hasMore } = await getRecommendedVideosFromCloudflare(
            db, r2, lang, limit, tier, shouldShuffle, offset, query,
            { context: userContext, sessionSeed, category, isRefresh, excludeIds, includePage: true, metrics }
        ));
    } catch (error) {
        console.error('[Recommendations] Retrieval failed:', error.message);
        return jsonResponse({ success: false, error: 'Recommendations temporarily unavailable' }, 503, {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Retry-After': '5'
        });
    }

    scheduleMetadataHealing(db, context, videos);

    return jsonResponse({
        success: true,
        language: lang,
        tier: tier || undefined,
        category: category || undefined,
        query: query || undefined,
        sessionSeed,
        count: videos.length,
        offset,
        hasMore,
        videos,
        source: isPersonalized
            ? 'cloudflare:personalized'
            : (isRefresh ? 'cloudflare:refresh' : 'cloudflare')
    }, 200, recommendationResponseHeaders(metrics, { isPersonalized, isRefresh }));
}
