/** Official YouTube display metadata. Billing evidence remains server-owned and separate. */
import { jsonResponse, handleOptions, sanitizeVideoId, errorResponse } from '../utils/utils.js';
import { getVideoLanguages, detectLevelFromMetadata, labelToTier } from '../data/video-info-db.js';
import { detectVideoCategory } from '../services/category.service.js';
import { resolveVerifiedVideoMetadata } from '../services/video-metadata.service.js';
import { consumeRateLimit, getClientIdentifier, rateLimitResponse } from '../middlewares/rate-limiter.js';

const RATE_LIMIT_CONFIG = { max: 120, windowSeconds: 60, keyPrefix: 'video_info' };

export async function onRequestOptions() {
    return handleOptions(['GET', 'POST', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request, env } = context;
    const rateLimit = await consumeRateLimit(env?.TRANSCRIPT_CACHE, getClientIdentifier(request), RATE_LIMIT_CONFIG, context);
    if (!rateLimit.allowed) return rateLimitResponse(rateLimit.resetAt);
    const videoId = sanitizeVideoId(new URL(request.url).searchParams.get('videoId'));
    if (!videoId) return jsonResponse({ error: 'Missing or invalid videoId parameter' }, 400);
    const db = env.VOCAB_DB;
    try {
        const official = await resolveVerifiedVideoMetadata(context, videoId, { includeDisplay: true });
        const metadata = official.snippet;
        const existing = await getVideoLanguages(db, videoId);
        let levels = existing?.levels || {};
        const detected = detectLevelFromMetadata(metadata.title, metadata.channel);
        if (detected) {
            const existingForLang = levels[detected.lang];
            const shouldOverride = !existingForLang ||
                existingForLang.method === 'server_heuristic' ||
                (typeof existingForLang.confidence === 'number' && existingForLang.confidence < 0.90);
            if (shouldOverride) {
                const tier = labelToTier(detected.level) || 'intermediate';
                levels = {
                    ...levels,
                    [detected.lang]: {
                        level: detected.level,
                        tier,
                        score: { beginner: 1, elementary: 2, intermediate: 3, upper_intermediate: 4, advanced: 5 }[tier],
                        confidence: 0.95,
                        method: 'metadata',
                        updatedAt: official.verifiedAt
                    }
                };
            }
        }
        const inferredCategory = detectVideoCategory(metadata);
        // Preserve verified caption discovery and explicit/legacy category edits.
        // Refreshing public details must not alter recommendation discovery timestamps.
        await db.prepare(`INSERT INTO video_languages
            (video_id,available_languages,sub_languages,has_auto_captions,duration_seconds,duration_source,title,channel,levels,category,category_source,tags,metadata_source,metadata_observed_at,created_at,updated_at)
            VALUES(?,'[]','[]',0,?,'youtube_data_api',?,?,?,?, 'official_mapping',?,'youtube_data_api',?,strftime('%s','now'),strftime('%s','now'))
            ON CONFLICT(video_id) DO UPDATE SET
                title=excluded.title,channel=excluded.channel,duration_seconds=excluded.duration_seconds,duration_source=excluded.duration_source,
                levels=excluded.levels,
                category=CASE WHEN video_languages.category_source IN ('manual','legacy') THEN video_languages.category ELSE excluded.category END,
                category_source=CASE WHEN video_languages.category_source IN ('manual','legacy') THEN video_languages.category_source ELSE excluded.category_source END,
                tags=excluded.tags,metadata_source=excluded.metadata_source,metadata_observed_at=excluded.metadata_observed_at
            WHERE excluded.metadata_observed_at > COALESCE(video_languages.metadata_observed_at,0)
                OR (excluded.metadata_observed_at = video_languages.metadata_observed_at
                    AND video_languages.category_source='official_mapping' AND video_languages.category IS NOT excluded.category)`)
            .bind(videoId, official.duration, metadata.title, metadata.channel, JSON.stringify(levels), inferredCategory, JSON.stringify(metadata.tags), official.observedAt).run();
        const saved = await getVideoLanguages(db, videoId);
        return jsonResponse({ videoId, title: metadata.title, channel: metadata.channel,
            channelId: metadata.channelId, thumbnail: metadata.thumbnail, youtubeCategoryId: metadata.youtubeCategoryId,
            duration: official.duration, durationSource: 'youtube_data_api',
            availableLanguages: saved.availableLanguages, subLanguages: saved.subLanguages, hasAutoCaptions: saved.hasAutoCaptions,
            channelAvatar: saved.channelAvatar, levels: saved.levels, category: ['manual','legacy'].includes(saved.categorySource) ? saved.category : inferredCategory, categorySource: saved.categorySource,
            tags: metadata.tags, source: 'youtube_data_api', metadataSource: 'youtube_data_api', metadataVerifiedAt: official.verifiedAt,
            broadcastState: official.broadcastState }, 200, { 'Cache-Control': 'public, max-age=60, s-maxage=60' });
    } catch (error) {
        const errorCode = error.message?.split(':')[0] || 'VIDEO_METADATA_UNAVAILABLE';
        console.warn('[VideoInfo]', { videoId, errorCode });
        return jsonResponse({ videoId, errorCode, error: 'Video metadata is unavailable' }, error.status || 503,
            { 'Cache-Control': 'no-store', 'Retry-After': String(error.retryAfterSeconds || 15) });
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
        const duration = typeof body.duration === 'number' && Number.isFinite(body.duration) ? Math.round(body.duration) : null;
        if (body.isEstimate != null && typeof body.isEstimate !== 'boolean') return jsonResponse({ error: 'Invalid estimate flag' }, 400);
        const durationSource = body.isEstimate === true ? 'client_estimate' : 'client_player';
        if (!videoId || !duration || duration <= 0 || duration > 14400) {
            return jsonResponse({ error: 'Invalid videoId or duration' }, 400);
        }

        const db = env?.VOCAB_DB;
        if (db) {
            await db.prepare(`
                INSERT INTO video_languages 
                (video_id, available_languages, sub_languages, duration_seconds, duration_source, created_at, updated_at)
                VALUES (?, '[]', '[]', ?, ?, strftime('%s', 'now'), strftime('%s', 'now'))
                ON CONFLICT(video_id) DO UPDATE SET
                  duration_seconds = CASE WHEN video_languages.metadata_source='youtube_data_api' THEN video_languages.duration_seconds WHEN excluded.duration_source='client_player' OR video_languages.duration_source IS NOT 'client_player' THEN excluded.duration_seconds ELSE video_languages.duration_seconds END,
                  duration_source = CASE WHEN video_languages.metadata_source='youtube_data_api' THEN video_languages.duration_source WHEN excluded.duration_source='client_player' OR video_languages.duration_source IS NOT 'client_player' THEN excluded.duration_source ELSE video_languages.duration_source END,
                  updated_at = strftime('%s', 'now')
            `).bind(videoId, duration, durationSource).run();

        }

        return jsonResponse({ success: true, videoId, duration }, 200);
    } catch {
        return errorResponse('Failed to update video info', 500);
    }
}
