import { captureVideoAssets } from '../data/video-assets.js';
import { readBoundedBody } from '../utils/response-body.js';
import { coalesceCacheFetch } from '../utils/cache-manager.js';
import { saveVideoAvailabilityChecks } from '../data/video-info-db.js';
import { blockReasonFromYouTubeItem, normalizeRegionRestriction, playbackAvailability } from './video-playback.service.js';

const SOURCE = 'youtube_data_api';
const QUOTE_TTL_SECONDS = 300;
export const AVAILABILITY_RECHECK_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000;

function metadataError(code, status = 503, retryAfterSeconds = 15) {
    const error = new Error(`${code}: Video metadata verification is unavailable.`);
    Object.assign(error, { status, retryAfterSeconds });
    return error;
}

export function parseYouTubeDuration(value) {
    if (typeof value !== 'string') return null;
    const match = /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/.exec(value);
    if (!match) return null;
    const seconds = Number(match[1] || 0) * 86400 + Number(match[2] || 0) * 3600 + Number(match[3] || 0) * 60 + Number(match[4] || 0);
    return Number.isSafeInteger(Math.ceil(seconds)) && seconds > 0 ? Math.ceil(seconds) : null;
}

function validateMetadata(item, videoId) {
    if (item?.id !== videoId) throw metadataError('VIDEO_DURATION_UNAVAILABLE');
    let broadcastState = item.snippet?.liveBroadcastContent;
    if (!['none', 'live', 'upcoming'].includes(broadcastState)) throw metadataError('VIDEO_DURATION_UNAVAILABLE');
    // Some ongoing broadcasts report snippet state none. Broadcast timestamps
    // must also establish that the media is a completed recording.
    const stream = item.liveStreamingDetails;
    if (stream?.actualEndTime && (typeof stream.actualEndTime !== 'string' || !Number.isFinite(Date.parse(stream.actualEndTime)))) throw metadataError('VIDEO_DURATION_UNAVAILABLE');
    if (broadcastState === 'none' && stream && !stream.actualEndTime) {
        if (stream.actualStartTime) broadcastState = 'live';
        else if (stream.scheduledStartTime) broadcastState = 'upcoming';
        else throw metadataError('VIDEO_DURATION_UNAVAILABLE');
    }
    const duration = parseYouTubeDuration(item.contentDetails?.duration);
    if (broadcastState === 'none' && !duration) throw metadataError('VIDEO_DURATION_UNAVAILABLE');
    const blockReason = blockReasonFromYouTubeItem(item);
    const embeddable = blockReason == null;
    return { duration, broadcastState, isLive: broadcastState !== 'none', embeddable, blockReason, source: SOURCE };
}

function videoSnippet(snippet, regionRestriction, blockReason = null) {
    if (typeof snippet?.title !== 'string' || !snippet.title.trim() ||
        typeof snippet.channelTitle !== 'string' || !snippet.channelTitle.trim() ||
        typeof snippet.channelId !== 'string' || !/^UC[a-zA-Z0-9_-]{22}$/.test(snippet.channelId) ||
        typeof snippet.categoryId !== 'string' || !/^\d{1,3}$/.test(snippet.categoryId)) return null;
    const tags = Array.isArray(snippet.tags) ? snippet.tags.filter(tag => typeof tag === 'string').slice(0, 100) : [];
    const thumbnail = snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || null;
    const embeddable = blockReason == null;
    const defaultAudioLanguage = typeof snippet.defaultAudioLanguage === 'string' && snippet.defaultAudioLanguage.trim()
        ? snippet.defaultAudioLanguage.trim()
        : null;
    const defaultLanguage = typeof snippet.defaultLanguage === 'string' && snippet.defaultLanguage.trim()
        ? snippet.defaultLanguage.trim()
        : null;
    return { title: snippet.title.trim(), channel: snippet.channelTitle.trim(), channelId: snippet.channelId,
        youtubeCategoryId: snippet.categoryId, tags, thumbnail: typeof thumbnail === 'string' && thumbnail.startsWith('https://i.ytimg.com/') ? thumbnail : null, embeddable, blockReason, regionRestriction,
        ...(defaultAudioLanguage ? { defaultAudioLanguage } : {}),
        ...(defaultLanguage ? { defaultLanguage } : {}) };
}

// Separate from display metadata: client reports and subtitle estimates never write this table.
export async function resolveVerifiedVideoMetadata(context, videoId, { fresh = false, includeDisplay = false, eligibility = false, maxDuration = null } = {}) {
    const env = context.env || {};
    const db = context.db || env.VOCAB_DB;
    if (!env.YOUTUBE_DATA_API_KEY) throw metadataError('VIDEO_METADATA_NOT_CONFIGURED', 503, 60);
    if (!db) throw metadataError('VIDEO_METADATA_STORAGE_UNAVAILABLE');
    const now = Math.floor(Date.now() / 1000);
    let cached;
    try { cached = await db.prepare('SELECT * FROM verified_video_metadata WHERE video_id=?').bind(videoId).first(); }
    catch { throw metadataError('VIDEO_METADATA_STORAGE_UNAVAILABLE'); }
    let snippet = null;
    try { snippet = cached?.snippet_json ? JSON.parse(cached.snippet_json) : null; } catch { /* Older/incomplete metadata must refresh for display. */ }
    if (!fresh && (!(includeDisplay || eligibility) || (snippet?.title && snippet?.channel && snippet?.channelId && snippet?.youtubeCategoryId && Array.isArray(snippet.tags) && Object.hasOwn(snippet, 'regionRestriction'))) && (!eligibility || snippet?.playbackVerified === true) && cached?.source === SOURCE && cached.refresh_after > now && cached.verified_at <= now && cached.verified_at > now - QUOTE_TTL_SECONDS) {
        const blockReason = snippet?.blockReason ?? (snippet?.embeddable === false ? 'youtube_api_not_embeddable' : null);
        const embeddable = blockReason == null;
        if (cached.broadcast_state === 'none' && Number.isSafeInteger(cached.duration_seconds) && cached.duration_seconds > 0) {
            return { duration: cached.duration_seconds, broadcastState: 'none', isLive: false, embeddable, blockReason, source: SOURCE, verifiedAt: cached.verified_at, observedAt: cached.observed_at, regionRestriction: snippet?.regionRestriction ?? null, snippet };
        }
        if (['live', 'upcoming'].includes(cached.broadcast_state)) return { duration: null, broadcastState: cached.broadcast_state, isLive: true, embeddable, blockReason, source: SOURCE, verifiedAt: cached.verified_at, observedAt: cached.observed_at, regionRestriction: snippet?.regionRestriction ?? null, snippet };
    }
    const startedAt = Date.now();
    try {
        const fetchItems = () => fetchYouTubeVideos(env, db, [videoId], {
            fresh,
            operation: fresh ? 'start' : 'quote',
            part: 'contentDetails,snippet,liveStreamingDetails,status',
            fields: 'items(id,contentDetails(duration,regionRestriction,contentRating/ytRating),status(embeddable,privacyStatus),snippet(title,channelTitle,channelId,categoryId,tags,thumbnails,liveBroadcastContent,defaultAudioLanguage,defaultLanguage),liveStreamingDetails(actualStartTime,actualEndTime,scheduledStartTime))'
        });
        const items = fresh
            ? await fetchItems()
            : await coalesceCacheFetch(`yt-meta:${videoId}`, fetchItems);
        if (items.length === 0) throw Object.assign(metadataError('VIDEO_UNAVAILABLE', 404, 0), { observedAt: startedAt });
        if (items.length !== 1) throw metadataError('VIDEO_DURATION_UNAVAILABLE');
        if (eligibility && (typeof items[0].status?.embeddable !== 'boolean' ||
            !['public', 'unlisted', 'private'].includes(items[0].status?.privacyStatus))) {
            throw metadataError('VIDEO_METADATA_UNAVAILABLE');
        }
        const details = validateMetadata(items[0], videoId);
        let regionRestriction;
        try {
            regionRestriction = normalizeRegionRestriction(items[0].contentDetails?.regionRestriction);
        } catch (error) {
            if (includeDisplay || eligibility) throw error;
        }
        snippet = videoSnippet(items[0].snippet, regionRestriction, details.blockReason);
        if (snippet && eligibility) snippet.playbackVerified = true;
        if (includeDisplay && !snippet) throw metadataError('VIDEO_METADATA_UNAVAILABLE');
        const ttl = details.isLive ? 30 : QUOTE_TTL_SECONDS;
        // Millisecond observation order prevents a slower old request from replacing newer evidence.
        const availability = playbackAvailability({ ...details, regionRestriction }, context.request?.cf?.country);
        if (!eligibility || (availability === 'available' && (maxDuration == null || (!details.isLive && details.duration <= maxDuration)))) {
            await db.prepare(`INSERT INTO verified_video_metadata(video_id,duration_seconds,broadcast_state,source,verified_at,refresh_after,observed_at,snippet_json)
            VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(video_id) DO UPDATE SET duration_seconds=excluded.duration_seconds,
            broadcast_state=excluded.broadcast_state,source=excluded.source,verified_at=excluded.verified_at,refresh_after=excluded.refresh_after,observed_at=excluded.observed_at,snippet_json=excluded.snippet_json
            WHERE excluded.observed_at >= verified_video_metadata.observed_at`).bind(videoId, details.duration, details.broadcastState, SOURCE, now, now + ttl, startedAt, snippet ? JSON.stringify(snippet) : null).run();
        }
        console.log('[VideoMetadata]', { videoId, operation: fresh ? 'start' : 'quote', source: SOURCE, elapsedMs: Date.now() - startedAt });
        return { ...details, verifiedAt: now, observedAt: startedAt, regionRestriction, snippet };
    } catch (error) {
        if (error.status) throw error;
        console.warn('[VideoMetadata]', { videoId, operation: fresh ? 'start' : 'quote', reason: 'transport_or_invalid_response', elapsedMs: Date.now() - startedAt });
        throw metadataError('VIDEO_DURATION_UNAVAILABLE');
    }
}

export function videoEligibilityEnabled(env) {
    return env?.VIDEO_ELIGIBILITY === 'true';
}

export async function requireVideoEligibility(context, videoId, options) {
    const db = context.db ?? context.env.VOCAB_DB;
    if (!db) throw metadataError('VIDEO_METADATA_STORAGE_UNAVAILABLE');
    const known = await db.prepare('SELECT embed_blocked_reason, region_checked_at FROM video_languages WHERE video_id=?').bind(videoId).first();
    if (known?.embed_blocked_reason === 'embed_disabled'
        || (known?.embed_blocked_reason && known.region_checked_at != null && Date.now() - known.region_checked_at < QUOTE_TTL_SECONDS * 1000)) {
        throw metadataError('VIDEO_EMBED_BLOCKED', 422, 0);
    }
    let details;
    try {
        details = await resolveVerifiedVideoMetadata(context, videoId, { ...options, eligibility: true });
    } catch (error) {
        if (error.status === 404 && known) {
            await saveVideoAvailabilityChecks(db, [{ videoId, blockReason: 'video_unavailable', checkedAt: error.observedAt }]);
        }
        throw error;
    }
    const availability = playbackAvailability(details, context.request?.cf?.country);
    if (known && (known.region_checked_at ?? 0) < details.observedAt && availability !== 'unknown') {
        await saveVideoAvailabilityChecks(db, [{
            videoId, blockReason: details.blockReason,
            restriction: details.regionRestriction ? JSON.stringify(details.regionRestriction) : null,
            checkedAt: details.observedAt
        }]);
    }
    if (availability === 'unknown') throw metadataError('VIDEO_METADATA_UNAVAILABLE');
    if (availability === 'embed_blocked') throw metadataError('VIDEO_EMBED_BLOCKED', 422, 0);
    if (availability === 'region_blocked') throw metadataError('VIDEO_REGION_BLOCKED', 422, 0);
    const assets = await captureVideoAssets(context.env, videoId);
    if (assets.blocked) throw metadataError('VIDEO_EMBED_BLOCKED', 422, 0);
    return { ...details, assets };
}

export function videoEligibilityFailure(error, response, fields = {}) {
    const { status, retryAfterSeconds } = error;
    const code = error.message.split(':')[0];
    if (![404, 422, 503].includes(status) || !/^VIDEO_[A-Z_]+$/.test(code)) return null;
    return response({ success: false, ...fields, errorCode: code, error: error.message }, status, {
        'Cache-Control': 'private, no-store',
        ...(retryAfterSeconds ? { 'Retry-After': String(retryAfterSeconds) } : {})
    });
}

// The small catalog batch shares the billing resolver's provider cooldown and
// non-fresh quota ceiling, fetching region + embed + privacy + age status in 1 quota unit.
export async function fetchVideoAvailability(env, db, videoIds) {
    const items = await fetchYouTubeVideos(env, db, videoIds, {
        operation: 'catalog_availability',
        part: 'contentDetails,status',
        fields: 'items(id,contentDetails(duration,regionRestriction,contentRating/ytRating),status(embeddable,privacyStatus))',
        maxBytes: 256 * 1024
    });
    const ids = new Set(videoIds);
    const availability = new Map();
    for (const item of items) {
        if (!ids.has(item?.id) || availability.has(item.id)) {
            throw metadataError('VIDEO_METADATA_UNAVAILABLE');
        }
        if (videoEligibilityEnabled(env) &&
            (typeof item.status?.embeddable !== 'boolean' ||
             !['public', 'unlisted', 'private'].includes(item.status?.privacyStatus))) {
            throw metadataError('VIDEO_METADATA_UNAVAILABLE');
        }
        let regionRestriction;
        try {
            regionRestriction = normalizeRegionRestriction(item.contentDetails?.regionRestriction);
        } catch {
            console.warn('[VideoAvailability] Malformed regionRestriction ignored', { videoId: item.id });
            regionRestriction = undefined;
        }
        availability.set(item.id, {
            blockReason: blockReasonFromYouTubeItem(item),
            regionRestriction
        });
    }
    return availability;
}

// One official YouTube videos.list request per reconciliation (50 videos = 1 quota unit).
// Checks region restrictions, embeddable status, privacy status, age restriction, and deleted videos together.
export async function refreshCatalogVideoAvailability(env) {
    if (!env.YOUTUBE_DATA_API_KEY) return 0;
    const db = env.VOCAB_DB;
    const checkedAt = Date.now();
    const recheckBefore = checkedAt - AVAILABILITY_RECHECK_INTERVAL_MS;
    const strict = videoEligibilityEnabled(env);
    const catalogEntry = `
        SELECT v.video_id, v.region_checked_at
        FROM video_languages v
        WHERE ${strict ? '(v.title IS NOT NULL OR v.embed_blocked = 1)' : 'v.title IS NOT NULL'}
          AND (EXISTS (SELECT 1 FROM video_language_catalog c WHERE c.video_id = v.video_id)
            ${strict ? 'OR v.embed_blocked = 1' : ''})
    `;
    // Separate the NULL and stale ranges so SQLite can stop at the due range
    // boundary instead of scanning fresh catalog entries on each maintenance run.
    const { results, success } = await db.prepare(`
        ${catalogEntry} AND v.region_checked_at IS NULL
        UNION ALL
        ${catalogEntry} AND (v.region_checked_at < ?
            ${strict ? `OR (v.embed_blocked=1 AND EXISTS (
                SELECT 1 FROM video_asset_retirements r WHERE r.video_id=v.video_id
                    AND r.confirmed_at IS NULL AND r.blocked_at<=?
            ))` : ''})
        ORDER BY region_checked_at, video_id LIMIT 50
    `).bind(recheckBefore, ...(strict ? [recheckBefore] : [])).all();
    if (success === false) throw new Error('Video availability scan failed');
    if (!results.length) return 0;

    const availability = await fetchVideoAvailability(env, db, results.map(row => row.video_id));
    const checks = results.map(row => {
        const entry = availability.get(row.video_id);
        return {
            videoId: row.video_id,
            restriction: entry?.regionRestriction === undefined
                ? undefined
                : (entry.regionRestriction ? JSON.stringify(entry.regionRestriction) : null),
            blockReason: entry ? entry.blockReason : 'video_unavailable',
            checkedAt
        };
    });
    const changed = await saveVideoAvailabilityChecks(db, checks);
    if (videoEligibilityEnabled(env)) {
        const confirmed = checks.filter(check => check.blockReason).map(check => check.videoId);
        if (confirmed.length) {
            await db.prepare(`UPDATE video_asset_retirements SET confirmed_at=?
                WHERE video_id IN (SELECT value FROM json_each(?))
                  AND blocked_at<=? AND purged_at IS NULL
                  AND EXISTS (SELECT 1 FROM video_languages v WHERE v.video_id=video_asset_retirements.video_id
                      AND v.embed_blocked=1 AND v.region_checked_at=?)`)
                .bind(checkedAt, JSON.stringify(confirmed), checkedAt - AVAILABILITY_RECHECK_INTERVAL_MS, checkedAt).run();
        }
    }
    return changed;
}

async function fetchYouTubeVideos(env, db, videoIds, {
    part, fields, operation, fresh = false, maxBytes = 64 * 1024
}) {
    const now = Math.floor(Date.now() / 1000);
    const state = await db.prepare("SELECT blocked_until FROM video_metadata_provider_state WHERE provider='youtube'").first();
    if (state?.blocked_until > now) throw metadataError('VIDEO_DURATION_UNAVAILABLE', 503, state.blocked_until - now);
    // A project-wide atomic budget protects Google's shared quota; quotes leave room for paid verification.
    const configured = Number(env.YOUTUBE_METADATA_DAILY_BUDGET || 8000);
    const budget = Number.isSafeInteger(configured) && configured >= 2 ? configured : 8000;
    const limit = fresh ? budget : Math.max(1, budget - Math.max(1, Math.min(1000, Math.floor(budget / 5))));
    const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    const consumed = await db.prepare(`INSERT INTO video_metadata_api_budget(day,requests) VALUES(?,1)
        ON CONFLICT(day) DO UPDATE SET requests=requests+1 WHERE requests < ? RETURNING requests`).bind(day, limit).first();
    if (!consumed) throw metadataError('VIDEO_DURATION_UNAVAILABLE', 503, 3600);
    if (consumed.requests === 1) {
        await db.batch([
            db.prepare('DELETE FROM video_metadata_api_budget WHERE day < ?').bind(day),
            db.prepare('DELETE FROM verified_video_metadata WHERE verified_at < ?').bind(now - 30 * 86400)
        ]);
    }
    const startedAt = Date.now();
    try {
        const url = new URL('https://www.googleapis.com/youtube/v3/videos');
        url.searchParams.set('id', videoIds.join(','));
        url.searchParams.set('part', part);
        url.searchParams.set('fields', fields);
        const signal = AbortSignal.timeout(4000);
        const response = await fetch(url, {
            headers: { 'X-Goog-Api-Key': env.YOUTUBE_DATA_API_KEY, Accept: 'application/json' },
            signal, redirect: 'manual'
        });
        const bytes = await readBoundedBody(response, signal, maxBytes);
        if (!response.ok) {
            let reason = 'upstream_http';
            try { reason = JSON.parse(new TextDecoder().decode(bytes)).error?.errors?.[0]?.reason || reason; } catch { /* Never expose upstream bodies or credentials. */ }
            const delay = ['quotaExceeded', 'dailyLimitExceeded'].includes(reason) ? 3600 : response.status === 429 ? 60 : 15;
            await db.prepare(`INSERT INTO video_metadata_provider_state(provider,blocked_until) VALUES('youtube',?)
                ON CONFLICT(provider) DO UPDATE SET blocked_until=MAX(blocked_until,excluded.blocked_until)`).bind(now + delay).run();
            console.warn('[VideoMetadata]', { videoCount: videoIds.length, operation, status: response.status, reason, elapsedMs: Date.now() - startedAt });
            throw metadataError(response.status === 401 || reason === 'keyInvalid' || reason === 'accessNotConfigured' ? 'VIDEO_METADATA_NOT_CONFIGURED' : 'VIDEO_DURATION_UNAVAILABLE', 503, delay);
        }
        const data = JSON.parse(new TextDecoder().decode(bytes));
        if (!Array.isArray(data.items)) throw metadataError('VIDEO_DURATION_UNAVAILABLE');
        return data.items;
    } catch (error) {
        if (error.status) throw error;
        throw metadataError('VIDEO_DURATION_UNAVAILABLE');
    }
}
