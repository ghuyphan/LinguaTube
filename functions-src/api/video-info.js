/** Official YouTube display metadata. Billing evidence remains server-owned and separate. */
import { jsonResponse, sanitizeVideoId, errorResponse, getRequestJson } from '../utils/utils.js';
import { getVideoLanguages, parseVideoLanguageRow, saveVideoAvailabilityChecks } from '../data/video-info-db.js';
import { detectVideoCategory } from '../services/category.service.js';
import { inferSpokenLanguage } from '../services/video-language.service.js';
import { requireVideoEligibility, resolveVerifiedVideoMetadata, videoEligibilityEnabled, videoEligibilityFailure } from '../services/video-metadata.service.js';
import { playbackAvailability, viewerCountry } from '../services/video-playback.service.js';
import { consumeRateLimit, getClientIdentifier, rateLimitResponse } from '../middlewares/rate-limiter.js';

const RATE_LIMIT_CONFIG = { max: 120, windowSeconds: 60, keyPrefix: 'video_info' };

export async function onRequestGet(context) {
    const { request, env } = context;
    const rateLimit = await consumeRateLimit(env?.TRANSCRIPT_CACHE, getClientIdentifier(request), RATE_LIMIT_CONFIG, context);
    if (!rateLimit.allowed) return rateLimitResponse(rateLimit.resetAt);
    const videoId = sanitizeVideoId(new URL(request.url).searchParams.get('videoId'));
    if (!videoId) return jsonResponse({ error: 'Missing or invalid videoId parameter' }, 400);
    const db = env.VOCAB_DB;
    try {
        const strict = videoEligibilityEnabled(env);
        const official = strict
            ? await requireVideoEligibility(context, videoId, { includeDisplay: true })
            : await resolveVerifiedVideoMetadata(context, videoId, { includeDisplay: true });
        const metadata = official.snippet;
        const inferredCategory = detectVideoCategory(metadata);
        const existingRow = await db.prepare(`
            SELECT available_languages, sub_languages, ai_languages, has_auto_captions, duration_seconds, duration_source,
                   title, channel, channel_avatar, levels, category, category_source, metadata_source, metadata_observed_at,
                   tags, primary_language, embed_blocked, embed_blocked_reason, region_restriction, region_checked_at
                   ${strict ? ', asset_generation' : ''}
            FROM video_languages WHERE video_id = ?
        `).bind(videoId).first();
        const parseJsonArray = raw => { try { const v = JSON.parse(raw || '[]'); return Array.isArray(v) ? v : []; } catch { return []; } };
        const inferredPrimaryLanguage = inferSpokenLanguage({
            defaultAudioLanguage: metadata.defaultAudioLanguage,
            defaultLanguage: metadata.defaultLanguage,
            title: metadata.title,
            channel: metadata.channel,
            tags: metadata.tags,
            subLanguages: parseJsonArray(existingRow?.sub_languages),
            aiLanguages: parseJsonArray(existingRow?.ai_languages),
        });
        const needsUpsert = !existingRow
            || official.observedAt > (existingRow.metadata_observed_at ?? 0)
            || (official.observedAt === existingRow.metadata_observed_at
                && existingRow.category_source === 'official_mapping'
                && existingRow.category !== inferredCategory);
        let row = existingRow;
        if (needsUpsert) {
            // Preserve verified caption discovery and explicit/legacy category edits.
            // Refreshing public details must not alter recommendation discovery timestamps.
            const insertStmt = db.prepare(`INSERT INTO video_languages
                (video_id,available_languages,sub_languages,has_auto_captions,duration_seconds,duration_source,title,channel,category,category_source,tags,primary_language,metadata_source,metadata_observed_at,created_at,updated_at)
                SELECT ?,'[]','[]',0,?,'youtube_data_api',?,?,?,'official_mapping',?,?,'youtube_data_api',?,strftime('%s','now'),strftime('%s','now')
                WHERE ${strict ? `COALESCE((SELECT CASE WHEN embed_blocked=0 THEN asset_generation ELSE -1 END
                    FROM video_languages WHERE video_id=?),0)=?` : '1'}
                ON CONFLICT(video_id) DO UPDATE SET
                    title=excluded.title,channel=excluded.channel,duration_seconds=excluded.duration_seconds,duration_source=excluded.duration_source,
                    category=CASE WHEN video_languages.category_source IN ('manual','legacy') THEN video_languages.category ELSE excluded.category END,
                    category_source=CASE WHEN video_languages.category_source IN ('manual','legacy') THEN video_languages.category_source ELSE excluded.category_source END,
                    tags=excluded.tags,
                    primary_language=COALESCE(excluded.primary_language, video_languages.primary_language),
                    metadata_source=excluded.metadata_source,metadata_observed_at=excluded.metadata_observed_at
                WHERE excluded.metadata_observed_at > COALESCE(video_languages.metadata_observed_at,0)
                    OR (excluded.metadata_observed_at = video_languages.metadata_observed_at
                        AND video_languages.category_source='official_mapping' AND video_languages.category IS NOT excluded.category)`)
                .bind(videoId, official.duration, metadata.title, metadata.channel, inferredCategory, JSON.stringify(metadata.tags), inferredPrimaryLanguage, official.observedAt, ...(strict ? [videoId, official.assets.generation] : []));
            const selectStmt = db.prepare(`
                SELECT available_languages, sub_languages, has_auto_captions, duration_seconds, duration_source, title, channel, channel_avatar, levels, category, category_source, metadata_source, tags, primary_language
                ${strict ? ', embed_blocked, asset_generation' : ''}
                FROM video_languages WHERE video_id = ?
            `).bind(videoId);
            const [, selectResult] = await db.batch([insertStmt, selectStmt]);
            row = selectResult?.results?.[0];
        }
        if (strict && (row?.embed_blocked || row?.asset_generation !== official.assets.generation)) {
            return jsonResponse({ success: false, videoId, errorCode: 'VIDEO_ELIGIBILITY_CHANGED' }, 503,
                { 'Retry-After': '5', 'Cache-Control': 'private, no-store' });
        }
        const saved = parseVideoLanguageRow(row) || await getVideoLanguages(db, videoId);
        const checkedAt = official.observedAt;
        let availabilityRow = existingRow;
        if ((existingRow?.region_checked_at ?? 0) < checkedAt) {
            await saveVideoAvailabilityChecks(db, [{
                videoId,
                restriction: official.regionRestriction ? JSON.stringify(official.regionRestriction) : null,
                blockReason: official.blockReason ?? null,
                checkedAt
            }]);
            availabilityRow = await db.prepare(
                'SELECT embed_blocked, region_restriction FROM video_languages WHERE video_id = ?'
            ).bind(videoId).first();
        }
        const effectiveAvailability = playbackAvailability(availabilityRow, viewerCountry(request));
        const embeddable = effectiveAvailability !== 'embed_blocked';
        return jsonResponse({ videoId, title: metadata.title, channel: metadata.channel,
            channelId: metadata.channelId, thumbnail: metadata.thumbnail, youtubeCategoryId: metadata.youtubeCategoryId,
            duration: official.duration, durationSource: 'youtube_data_api',
            embeddable, playbackAvailability: effectiveAvailability,
            availableLanguages: saved.availableLanguages, subLanguages: saved.subLanguages, hasAutoCaptions: saved.hasAutoCaptions,
            channelAvatar: saved.channelAvatar, levels: saved.levels, category: ['manual','legacy'].includes(saved.categorySource) ? saved.category : inferredCategory, categorySource: saved.categorySource,
            primaryLanguage: saved?.primaryLanguage ?? inferredPrimaryLanguage,
            tags: metadata.tags, source: 'youtube_data_api', metadataSource: 'youtube_data_api', metadataVerifiedAt: official.verifiedAt,
            broadcastState: official.broadcastState }, 200, { 'Cache-Control': 'private, no-store' });
    } catch (error) {
        if (videoEligibilityEnabled(env)) {
            const failure = videoEligibilityFailure(error, jsonResponse, { videoId });
            if (failure) return failure;
        }
        const errorCode = error.message?.split(':')[0] || 'VIDEO_METADATA_UNAVAILABLE';
        console.warn('[VideoInfo]', { videoId, errorCode });
        const headers = { 'Cache-Control': 'no-store' };
        if (error.retryAfterSeconds !== 0) headers['Retry-After'] = String(error.retryAfterSeconds ?? 15);
        return jsonResponse({ videoId, errorCode, error: 'Video metadata is unavailable' }, error.status || 503, headers);
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
        const body = await getRequestJson(context);
        const videoId = sanitizeVideoId(body?.videoId);
        const duration = typeof body.duration === 'number' && Number.isFinite(body.duration) ? Math.round(body.duration) : null;
        if (body.isEstimate != null && typeof body.isEstimate !== 'boolean') return jsonResponse({ error: 'Invalid estimate flag' }, 400);
        const durationSource = body.isEstimate === true ? 'client_estimate' : 'client_player';
        if (videoEligibilityEnabled(env) && videoId) {
            try {
                const info = await requireVideoEligibility(context, videoId);
                return jsonResponse({ success: true, videoId, duration: info.duration }, 200);
            } catch (error) {
                const failure = videoEligibilityFailure(error, jsonResponse, { videoId });
                if (failure) return failure;
                throw error;
            }
        }
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
