import { readBoundedBody } from '../utils/response-body.js';

const SOURCE = 'youtube_data_api';
const QUOTE_TTL_SECONDS = 300;

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
    return { duration, broadcastState, isLive: broadcastState !== 'none', source: SOURCE };
}

function videoSnippet(snippet) {
    if (typeof snippet?.title !== 'string' || !snippet.title.trim() ||
        typeof snippet.channelTitle !== 'string' || !snippet.channelTitle.trim() ||
        typeof snippet.channelId !== 'string' || !/^UC[a-zA-Z0-9_-]{22}$/.test(snippet.channelId) ||
        typeof snippet.categoryId !== 'string' || !/^\d{1,3}$/.test(snippet.categoryId)) return null;
    const tags = Array.isArray(snippet.tags) ? snippet.tags.filter(tag => typeof tag === 'string').slice(0, 100) : [];
    const thumbnail = snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || null;
    return { title: snippet.title.trim(), channel: snippet.channelTitle.trim(), channelId: snippet.channelId,
        youtubeCategoryId: snippet.categoryId, tags, thumbnail: typeof thumbnail === 'string' && thumbnail.startsWith('https://i.ytimg.com/') ? thumbnail : null };
}

// Separate from display metadata: client reports and subtitle estimates never write this table.
export async function resolveVerifiedVideoMetadata(context, videoId, { fresh = false, includeDisplay = false } = {}) {
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
    if (!fresh && (!includeDisplay || (snippet?.title && snippet?.channel && snippet?.channelId && snippet?.youtubeCategoryId && Array.isArray(snippet.tags))) && cached?.source === SOURCE && cached.refresh_after > now && cached.verified_at <= now && cached.verified_at > now - QUOTE_TTL_SECONDS) {
        if (cached.broadcast_state === 'none' && Number.isSafeInteger(cached.duration_seconds) && cached.duration_seconds > 0) {
            return { duration: cached.duration_seconds, broadcastState: 'none', isLive: false, source: SOURCE, verifiedAt: cached.verified_at, observedAt: cached.observed_at, snippet };
        }
        if (['live', 'upcoming'].includes(cached.broadcast_state)) return { duration: null, broadcastState: cached.broadcast_state, isLive: true, source: SOURCE, verifiedAt: cached.verified_at, observedAt: cached.observed_at, snippet };
    }
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
        url.searchParams.set('id', videoId);
        url.searchParams.set('part', 'contentDetails,snippet,liveStreamingDetails');
        url.searchParams.set('fields', 'items(id,contentDetails/duration,snippet(title,channelTitle,channelId,categoryId,tags,thumbnails,liveBroadcastContent),liveStreamingDetails(actualStartTime,actualEndTime,scheduledStartTime))');
        const signal = AbortSignal.timeout(4000);
        const response = await fetch(url, {
            headers: { 'X-Goog-Api-Key': env.YOUTUBE_DATA_API_KEY, Accept: 'application/json' },
            signal, redirect: 'manual'
        });
        const bytes = await readBoundedBody(response, signal, 64 * 1024);
        if (!response.ok) {
            let reason = 'upstream_http';
            try { reason = JSON.parse(new TextDecoder().decode(bytes)).error?.errors?.[0]?.reason || reason; } catch { /* Never expose upstream bodies or credentials. */ }
            const delay = ['quotaExceeded', 'dailyLimitExceeded'].includes(reason) ? 3600 : response.status === 429 ? 60 : 15;
            await db.prepare(`INSERT INTO video_metadata_provider_state(provider,blocked_until) VALUES('youtube',?)
                ON CONFLICT(provider) DO UPDATE SET blocked_until=MAX(blocked_until,excluded.blocked_until)`).bind(now + delay).run();
            console.warn('[VideoMetadata]', { videoId, operation: fresh ? 'start' : 'quote', status: response.status, reason, elapsedMs: Date.now() - startedAt });
            throw metadataError(response.status === 401 || reason === 'keyInvalid' || reason === 'accessNotConfigured' ? 'VIDEO_METADATA_NOT_CONFIGURED' : 'VIDEO_DURATION_UNAVAILABLE', 503, delay);
        }
        const data = JSON.parse(new TextDecoder().decode(bytes));
        if (!Array.isArray(data.items)) throw metadataError('VIDEO_DURATION_UNAVAILABLE');
        if (data.items.length === 0) throw metadataError('VIDEO_UNAVAILABLE', 404, 0);
        if (data.items.length !== 1) throw metadataError('VIDEO_DURATION_UNAVAILABLE');
        const details = validateMetadata(data.items[0], videoId);
        snippet = videoSnippet(data.items[0].snippet);
        if (includeDisplay && !snippet) throw metadataError('VIDEO_METADATA_UNAVAILABLE');
        const ttl = details.isLive ? 30 : QUOTE_TTL_SECONDS;
        // Millisecond observation order prevents a slower old request from replacing newer evidence.
        await db.prepare(`INSERT INTO verified_video_metadata(video_id,duration_seconds,broadcast_state,source,verified_at,refresh_after,observed_at,snippet_json)
            VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(video_id) DO UPDATE SET duration_seconds=excluded.duration_seconds,
            broadcast_state=excluded.broadcast_state,source=excluded.source,verified_at=excluded.verified_at,refresh_after=excluded.refresh_after,observed_at=excluded.observed_at,snippet_json=excluded.snippet_json
            WHERE excluded.observed_at >= verified_video_metadata.observed_at`).bind(videoId, details.duration, details.broadcastState, SOURCE, now, now + ttl, startedAt, snippet ? JSON.stringify(snippet) : null).run();
        console.log('[VideoMetadata]', { videoId, operation: fresh ? 'start' : 'quote', source: SOURCE, elapsedMs: Date.now() - startedAt });
        return { ...details, verifiedAt: now, observedAt: startedAt, snippet };
    } catch (error) {
        if (error.status) throw error;
        console.warn('[VideoMetadata]', { videoId, operation: fresh ? 'start' : 'quote', reason: 'transport_or_invalid_response', elapsedMs: Date.now() - startedAt });
        throw metadataError('VIDEO_DURATION_UNAVAILABLE');
    }
}
