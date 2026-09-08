/**
 * Video Level API (Cloudflare Function)
 * Stores and updates computed language difficulty levels for videos
 * 
 * Route: POST /api/video-level
 * Body: { videoId: string, language: string, level: string, details?: object }
 */

import { jsonResponse, handleOptions, sanitizeVideoId, sanitizeLanguage } from '../utils/utils.js';
import { saveVideoLevel, getVideoLanguages } from '../data/video-info-db.js';
import { consumeRateLimit, getClientIdentifier, rateLimitResponse } from '../middlewares/rate-limiter.js';

const RATE_LIMIT_CONFIG = { max: 60, windowSeconds: 3600, keyPrefix: 'video_level' };
const VALID_LEVEL_REGEX = /^(JLPT\s*N[1-5]|HSK\s*[1-6]|TOPIK\s*([1-6]|I{1,2})|CEFR\s*[A-C][1-2]|Beginner|Intermediate|Advanced)$/i;

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;

    // Rate limiting to prevent spamming
    const clientId = getClientIdentifier(request);
    const rateLimit = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, RATE_LIMIT_CONFIG);
    if (!rateLimit.allowed) {
        return rateLimitResponse(rateLimit.resetAt);
    }

    try {
        const body = await request.json();
        const videoId = sanitizeVideoId(body?.videoId);
        const language = sanitizeLanguage(body?.language, ['ja', 'zh', 'ko', 'en']);
        const rawLevel = typeof body?.level === 'string' ? body.level.trim() : '';

        if (!videoId) {
            return jsonResponse({ error: 'Missing or invalid videoId' }, 400);
        }
        if (!language) {
            return jsonResponse({ error: 'Invalid language. Must be ja, zh, ko, or en' }, 400);
        }
        if (!rawLevel || rawLevel.length > 30 || !VALID_LEVEL_REGEX.test(rawLevel)) {
            return jsonResponse({ error: 'Invalid level format. Must match standard proficiency levels (e.g. JLPT N4, HSK 2, CEFR B1)' }, 400);
        }

        const db = env.VOCAB_DB;
        const updatedLevels = await saveVideoLevel(db, null, videoId, language, rawLevel);

        return jsonResponse({
            success: true,
            videoId,
            language,
            level: rawLevel,
            levels: updatedLevels || { [language]: rawLevel }
        }, 200);

    } catch (err) {
        return jsonResponse({ error: err.message || 'Internal error' }, 500);
    }
}
