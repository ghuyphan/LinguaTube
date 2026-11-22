/**
 * POST /api/video-unplayable
 * Verifies a reported YouTube embed block (100/101/150) server-side and delists it from recommendations.
 */

import { jsonResponse, sanitizeVideoId, getRequestJson } from '../utils/utils.js';
import { consumeRateLimit, getClientIdentifier, rateLimitResponse } from '../middlewares/rate-limiter.js';
import { markVideoEmbedBlocked } from '../data/video-info-db.js';

const RATE_LIMIT = { max: 30, windowSeconds: 60, keyPrefix: 'video_unplayable' };
const REPORTABLE_CODES = new Set([100, 101, 150]);

async function verifyBlocked(videoId, fetchImpl = fetch) {
    try {
        const res = await fetchImpl(`https://www.youtube.com/embed/${videoId}`, {
            headers: { 'Referer': 'https://voca.study/' },
            signal: AbortSignal.timeout(4000)
        });
        if (res.status === 404) return 'not_found';
        if (!res.ok) return null;
        const html = await res.text();
        if (/\\?"status\\?":\s*\\?"UNPLAYABLE\\?"/.test(html) || html.includes('Playback on other websites has been disabled')) {
            return 'embed_disabled';
        }
        if (/\\?"status\\?":\s*\\?"ERROR\\?"/.test(html)) return 'video_unavailable';
        return null;
    } catch {
        return null;
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const rate = await consumeRateLimit(env?.TRANSCRIPT_CACHE, getClientIdentifier(request), RATE_LIMIT, context);
    if (!rate.allowed) return rateLimitResponse(rate.resetAt);

    let body;
    try { body = await getRequestJson(context); } catch { return jsonResponse({ error: 'Invalid JSON' }, 400); }

    const videoId = sanitizeVideoId(body?.videoId);
    if (!videoId) return jsonResponse({ error: 'Invalid videoId' }, 400);

    const code = body?.errorCode != null ? Number(body.errorCode) : null;
    if (code !== null && !REPORTABLE_CODES.has(code)) {
        return jsonResponse({ success: true, videoId, delisted: false }, 200, { 'Cache-Control': 'no-store' });
    }

    const reason = await verifyBlocked(videoId, context._fetchImpl);
    if (!reason) {
        return jsonResponse({ success: true, videoId, delisted: false }, 200, { 'Cache-Control': 'no-store' });
    }

    const delisted = env?.VOCAB_DB ? await markVideoEmbedBlocked(env.VOCAB_DB, videoId, true, reason) : false;
    return jsonResponse({ success: true, videoId, delisted, reason }, 200, { 'Cache-Control': 'no-store' });
}
