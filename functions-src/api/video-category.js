/**
 * Video Category API (Cloudflare Function)
 * Allows authenticated clients or moderators to classify or update video categories.
 * 
 * Route: POST /api/video-category
 * Body: { videoId: string, category: string }
 */

import { jsonResponse, handleOptions, sanitizeVideoId, errorResponse } from '../utils/utils.js';
import { saveVideoCategory } from '../data/video-info-db.js';
import { VALID_CATEGORIES } from '../services/category.service.js';
import { consumeRateLimit, getClientIdentifier, rateLimitResponse } from '../middlewares/rate-limiter.js';
import { validateAuthToken, unauthorizedResponse } from '../middlewares/auth.js';

const RATE_LIMIT_CONFIG = { max: 60, windowSeconds: 3600, keyPrefix: 'video_category' };

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

    // Require authentication
    const authResult = await validateAuthToken(request, env);
    if (!authResult.valid) {
        return unauthorizedResponse(authResult.error || 'Authentication required to submit video category');
    }

    try {
        const body = await request.json();
        const videoId = sanitizeVideoId(body?.videoId);
        const rawCategory = typeof body?.category === 'string' ? body.category.toLowerCase().trim() : '';

        if (!videoId) {
            return jsonResponse({ error: 'Missing or invalid videoId' }, 400);
        }

        if (!rawCategory || !VALID_CATEGORIES.has(rawCategory)) {
            return jsonResponse({
                error: `Invalid category. Must be one of: ${Array.from(VALID_CATEGORIES).join(', ')}`
            }, 400);
        }

        const db = env.VOCAB_DB;
        const ok = await saveVideoCategory(db, videoId, rawCategory);

        if (!ok) {
            return jsonResponse({ error: 'Failed to update video category in database' }, 500);
        }

        return jsonResponse({
            success: true,
            videoId,
            category: rawCategory
        }, 200);

    } catch (err) {
        console.error('[VideoCategory] Error:', err.message);
        return errorResponse('Failed to update category', 500);
    }
}
