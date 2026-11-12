/**
 * Recommended Videos API (Cloudflare Pages Function)
 * Discovers videos with verified transcripts in Cloudflare (D1 & R2) matching the user's target language.
 * Supports server-side multi-factor ranking, Krashen i+1 leveling, active SRS vocabulary matching,
 * and deterministic infinite scroll pagination.
 * 
 * Route: GET /api/recommended-videos?lang=ja&limit=12
 * Route: POST /api/recommended-videos (with rich learner context payload)
 */

import { jsonResponse, handleOptions, getRequestJson } from '../utils/utils.js';
import { isLanguageSupported, resolveVideoChannelAvatar, getVideoMetadata } from '../middlewares/video-validator.js';
import { getRecommendedVideosFromCloudflare } from '../data/video-info-db.js';
import { normalizeRecommendationContext } from '../services/recommendation.service.js';
import { VALID_CATEGORIES } from '../services/category.service.js';

const VALID_TIERS = new Set(['beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced']);

const CACHE_CONTROL_HEADER = 'no-cache, no-store, must-revalidate';

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
            if (context?.data?.parsedBody !== undefined) {
                body = context.data.parsedBody;
                if (JSON.stringify(body).length > 65536) {
                    return jsonResponse({ success: false, error: 'Recommendation context too large' }, 413);
                }
            } else {
                const text = await request.text();
                if (text.length > 65536) {
                    return jsonResponse({ success: false, error: 'Recommendation context too large' }, 413);
                }
                body = JSON.parse(text);
            }
            if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid body');
        } catch {
            return jsonResponse({ success: false, error: 'Invalid JSON object' }, 400);
        }
    }
    for (const key of ['lang', 'tier', 'category', 'q', 'query']) {
        if (body[key] != null && typeof body[key] !== 'string') {
            return jsonResponse({ success: false, error: `Invalid ${key}` }, 400);
        }
    }

    const rawLang = (body.lang || url.searchParams.get('lang') || 'ja').toLowerCase().trim();
    const lang = isLanguageSupported(rawLang) ? rawLang : 'ja';

    const rawTier = (body.tier || url.searchParams.get('tier') || '').toLowerCase().trim();
    const tier = VALID_TIERS.has(rawTier) ? rawTier : null;

    const rawCategory = (body.category || url.searchParams.get('category') || '').toLowerCase().trim();
    const category = VALID_CATEGORIES.has(rawCategory) ? rawCategory : null;

    const limitParam = parseInt(body.limit ?? url.searchParams.get('limit'), 10);
    const limit = Math.min(Math.max(isNaN(limitParam) ? 12 : limitParam, 1), 50);

    const offsetParam = parseInt(body.offset ?? url.searchParams.get('offset'), 10);
    const offset = Math.max(isNaN(offsetParam) ? 0 : offsetParam, 0);

    const rawQuery = (body.q || body.query || url.searchParams.get('q') || url.searchParams.get('query') || '')
        .trim()
        .replace(/[\x00-\x1F\x7F]/g, '');
    const query = rawQuery.length > 0 ? rawQuery.slice(0, 100) : null;

    const isRefresh = body.refresh === true || url.searchParams.get('refresh') === 'true' || url.searchParams.get('force') === 'true';

    const sessionSeedParam = parseInt(body.sessionSeed ?? url.searchParams.get('seed'), 10);
    const sessionSeed = !isNaN(sessionSeedParam)
        ? sessionSeedParam
        : (isRefresh ? Math.floor(Math.random() * 1000000) : 12345);

    const userContext = normalizeRecommendationContext(body.context);
    const isPersonalized = Boolean(userContext.watched.length || Object.keys(userContext.inProgress).length
        || userContext.vocabWords.length || userContext.topChannels.length
        || userContext.favorites.length || userContext.dominantTier);

    const db = env?.VOCAB_DB;
    const r2 = env?.TRANSCRIPT_STORAGE;
    const shouldShuffle = isRefresh || offset === 0;

    let videos;
    let hasMore;
    const metrics = {};
    try {
        ({ videos, hasMore } = await getRecommendedVideosFromCloudflare(
            db, r2, lang, limit, tier, shouldShuffle, offset, query,
            { context: userContext, sessionSeed, category, isRefresh, includePage: true, metrics }
        ));
    } catch (error) {
        console.error('[Recommendations] Retrieval failed:', error.message);
        return jsonResponse({ success: false, error: 'Recommendations temporarily unavailable' }, 503,
            { 'Cache-Control': CACHE_CONTROL_HEADER, 'Retry-After': '5' });
    }

    // 3. Self-healing: if any returned videos lack channelAvatar, title, or channel, resolve and update D1 in background
    if (db && typeof context?.waitUntil === 'function') {
        const needsHealing = videos.filter(v => v.videoId && (!v.channelAvatar || !v.title || !v.channel));
        if (needsHealing.length > 0) {
            context.waitUntil((async () => {
                const pending = needsHealing.slice(0, 5);
                const deadline = Date.now() + 15_000;
                // Two videos at a time: bounded provider work fits the post-response budget.
                for (let i = 0; i < pending.length; i += 2) {
                    if (Date.now() >= deadline) break;
                    await Promise.allSettled(pending.slice(i, i + 2).map(async v => {
                        const [avatar, meta] = await Promise.all([
                            !v.channelAvatar ? resolveVideoChannelAvatar(v.videoId) : null,
                            !v.title || !v.channel ? getVideoMetadata(v.videoId, context) : null
                        ]);
                        const title = !v.title ? meta?.title || null : null;
                        const channel = !v.channel ? meta?.author_name || null : null;
                        if (!avatar && !title && !channel) return;
                        // Fill missing fields only; never overwrite fresher catalog data or
                        // change discovery timestamps while repairing presentation metadata.
                        await db.prepare(`
                            UPDATE video_languages
                            SET channel_avatar = COALESCE(NULLIF(channel_avatar, ''), ?),
                                title = CASE WHEN title IS NULL OR TRIM(title) = '' THEN COALESCE(?, title) ELSE title END,
                                channel = CASE WHEN channel IS NULL OR TRIM(channel) = '' THEN COALESCE(?, channel) ELSE channel END
                            WHERE video_id = ?
                        `).bind(avatar, title, channel, v.videoId).run();
                    }));
                }
            })());
        }
    }

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
    }, 200, {
        'X-Cache': isPersonalized ? 'BYPASS-PERSONALIZED' : (isRefresh ? 'BYPASS' : metrics.candidateCache === 'HIT' ? 'HIT-CANDIDATES' : 'MISS'),
        'X-Candidate-Cache': metrics.candidateCache || 'NOT-QUERIED',
        'Cache-Control': isRefresh ? 'no-cache, no-store, must-revalidate' : CACHE_CONTROL_HEADER
    });
}
