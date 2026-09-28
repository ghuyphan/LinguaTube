/**
 * Video Level API (Cloudflare Function)
 * Stores and updates computed language difficulty levels for videos
 * 
 * Route: POST /api/video-level
 * Body: { videoId: string, language: string, level: string, details?: object }
 */

import { jsonResponse, handleOptions, sanitizeVideoId, sanitizeLanguage, errorResponse } from '../utils/utils.js';
import { saveVideoLevel } from '../data/video-info-db.js';
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

        const confidence = typeof body?.confidence === 'number' ? Math.min(1.0, Math.max(0.0, body.confidence)) : 0.8;
        const method = typeof body?.method === 'string' && body.method.length <= 20 ? body.method : 'linguistics';

        // Reject assessments with insufficient confidence to protect D1 integrity
        if (confidence < 0.65) {
            return jsonResponse({ error: 'Assessment confidence too low to persist (minimum 0.65 required)', confidence }, 400);
        }

        // Extract and sanitize rich diagnostic details if provided
        const details = {};
        if (typeof body?.score === 'number' && Number.isFinite(body.score)) {
            details.score = Math.min(10.0, Math.max(0.0, Math.round(body.score * 10) / 10));
        }
        if (typeof body?.grammarCount === 'number' && Number.isFinite(body.grammarCount)) {
            details.grammarCount = Math.max(0, Math.min(10000, Math.round(body.grammarCount)));
        }
        if (typeof body?.speechRateCpm === 'number' && Number.isFinite(body.speechRateCpm)) {
            details.speechRateCpm = Math.max(0, Math.min(2000, Math.round(body.speechRateCpm)));
        }
        if (typeof body?.tier === 'string' && ['beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced'].includes(body.tier)) {
            details.tier = body.tier;
        }
        if (body?.breakdown && typeof body.breakdown === 'object' && !Array.isArray(body.breakdown)) {
            const cleanBreakdown = {};
            for (const [k, v] of Object.entries(body.breakdown).slice(0, 20)) {
                if (typeof k === 'string' && k.length <= 20 && typeof v === 'number' && Number.isFinite(v) && v >= 0) {
                    cleanBreakdown[k.trim()] = Math.min(1000, Math.round(v));
                }
            }
            if (Object.keys(cleanBreakdown).length > 0) {
                details.breakdown = cleanBreakdown;
            }
        }

        const db = env.VOCAB_DB;
        // Strict adherence to Rule 2: kv is passed as null to guarantee ZERO KV writes
        const updatedLevels = await saveVideoLevel(db, null, videoId, language, rawLevel, confidence, method, details);

        return jsonResponse({
            success: true,
            videoId,
            language,
            level: rawLevel,
            confidence,
            method,
            details: Object.keys(details).length > 0 ? details : undefined,
            levels: updatedLevels || { [language]: rawLevel }
        }, 200);

    } catch (err) {
        console.error('[VideoLevel] Error:', err.message);
        return errorResponse('Failed to save video level', 500);
    }
}
