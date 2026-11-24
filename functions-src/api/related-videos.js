import { videoEligibilityEnabled } from '../services/video-metadata.service.js';
/**
 * Related Videos API (Cloudflare Pages Function)
 * Player "More Videos" feed: ranks content similarity to the active video,
 * strictly excludes current/session-watched/>=85%-completed items, and demotes older in-progress items.
 *
 * Route: POST /api/related-videos
 * Route: GET /api/related-videos?videoId=...&lang=ja&limit=16
 */

import { jsonResponse } from '../utils/utils.js';
import { viewerCountry } from '../services/video-playback.service.js';
import { scheduleMetadataHealing } from '../middlewares/video-validator.js';
import { filterCurrentVideoAvailability, getRelatedVideosFromCloudflare } from '../data/video-info-db.js';
import { parseRecommendationRequest, recommendationResponseHeaders } from '../services/recommendation.service.js';

export async function onRequestGet(context) {
    return handleRelatedVideos(context, 'GET');
}

export async function onRequestPost(context) {
    return handleRelatedVideos(context, 'POST');
}

function parseCurrentVideo(body, url) {
    if (body.currentVideo != null && (typeof body.currentVideo !== 'object' || Array.isArray(body.currentVideo))) {
        return null;
    }
    const raw = body.currentVideo || {};
    const str = (val, fallback = '', max = 200) =>
        typeof val === 'string' ? val.trim().slice(0, max) : fallback;
    const videoId = str(raw.videoId ?? body.videoId ?? url.searchParams.get('videoId'), '', 100);
    const tags = Array.isArray(raw.tags)
        ? raw.tags.filter(t => typeof t === 'string').map(t => t.trim().slice(0, 60)).filter(Boolean).slice(0, 16)
        : [];
    return {
        videoId,
        title: str(raw.title, '', 300),
        channel: str(raw.channel, '', 150),
        category: str(raw.category, '', 40),
        tier: str(raw.tier, '', 40),
        tags
    };
}

async function handleRelatedVideos(context, method) {
    const parsed = await parseRecommendationRequest(context, method, { defaultLimit: 16 });
    if (parsed.errorResponse) return parsed.errorResponse;

    const { body, url, lang, limit, offset, isRefresh, sessionSeed, userContext, excludeIds, isPersonalized } = parsed.params;
    const currentVideo = parseCurrentVideo(body, url);
    if (!currentVideo) {
        return jsonResponse({ success: false, error: 'Invalid currentVideo' }, 400);
    }

    const db = context.env?.VOCAB_DB;
    const r2 = context.env?.TRANSCRIPT_STORAGE;
    const strict = videoEligibilityEnabled(context.env);
    const country = strict ? context.request.cf?.country : viewerCountry(context.request);
    const metrics = {};

    let videos;
    let hasMore;
    try {
        ({ videos, hasMore } = await getRelatedVideosFromCloudflare(
            db, r2, lang, limit, offset,
            { currentVideo, excludeIds, context: userContext, sessionSeed, isRefresh, metrics,
                country, useAssetGenerations: strict, waitUntil: context.waitUntil?.bind(context) }
        ));
        if (strict) videos = await filterCurrentVideoAvailability(db, videos, country);
    } catch (error) {
        console.error('[RelatedVideos] Retrieval failed:', error.message);
        return jsonResponse({ success: false, error: 'Recommendations temporarily unavailable' }, 503, {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Retry-After': '5'
        });
    }

    scheduleMetadataHealing(db, context, videos);

    return jsonResponse({
        success: true,
        language: lang,
        sessionSeed,
        count: videos.length,
        offset,
        hasMore,
        videos,
        source: 'cloudflare:related'
    }, 200, recommendationResponseHeaders(metrics, { isPersonalized: isPersonalized || Boolean(currentVideo.videoId), isRefresh }));
}
