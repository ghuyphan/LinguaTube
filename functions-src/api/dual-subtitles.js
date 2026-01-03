/**
 * Dual Subtitles API
 * Generates and caches dual subtitles for a video
 * Rout: POST /api/dual-subtitles
 */

import { jsonResponse, handleOptions, errorResponse } from '../_shared/utils.js';
import {
    consumeRateLimit,
    getClientIP,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders,
    getTieredConfig
} from '../_shared/rate-limiter.js';
import { validateAuthToken, hasPremiumAccess } from '../_shared/auth.js';
import { translateBatch } from '../_shared/lingva.js';
import { getTranslation, saveTranslation } from '../_shared/translation-cache.js';

// Tiered rate limiting - anonymous: 5/hr, free: 10/hr, premium: 50/hr
const RATE_LIMIT_CONFIG = {
    max: { anonymous: 5, free: 10, pro: 50, premium: 50 },
    windowSeconds: 3600,
    keyPrefix: 'dual-subs'
};
// Reduced batch size to avoid hitting 429s on Lingva instances
const BATCH_SIZE = 5;
const TIMEOUT_MS = 25000; // 25s total timeout (CF limit is 30s)

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env, waitUntil } = context;

    try {
        const body = await request.json();
        const { videoId, sourceLang, targetLang, segments } = body;

        // Validation
        if (!videoId || !sourceLang || !targetLang || !segments?.length) {
            return jsonResponse({ error: 'Missing required fields' }, 400);
        }

        const r2 = env.TRANSCRIPT_STORAGE; // Reusing transcript bucket for translations

        // 1. Check Cache
        const cached = await getTranslation(r2, videoId, sourceLang, targetLang);
        if (cached) {
            return jsonResponse({
                videoId,
                sourceLang,
                targetLang,
                segments: cached.segments,
                cached: true
            });
        }

        // 2. Rate Limit (only on cache miss - actual translation work)
        // Get user tier for rate limiting (optional auth)
        const authResult = await validateAuthToken(request, env);
        const tier = authResult.valid
            ? (hasPremiumAccess(authResult.user) ? 'premium' : authResult.user.subscriptionTier || 'free')
            : 'anonymous';
        const rateLimitConfig = getTieredConfig(RATE_LIMIT_CONFIG, tier);

        const clientId = getClientIdentifier(request, authResult);
        const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, rateLimitConfig);
        if (!rateCheck.allowed) {
            return rateLimitResponse(rateCheck.resetAt);
        }

        // 3. Batch Translate
        // Split segments into chunks of 20
        const textChunks = [];
        for (let i = 0; i < segments.length; i += BATCH_SIZE) {
            textChunks.push(segments.slice(i, i + BATCH_SIZE).map(s => s.text));
        }

        // Translate chunks content
        // Note: For very long videos, we might want to limit how many segments we translate
        // to avoid timeout. But for now, we try to do all.
        // We run chunks sequentially to avoid overwhelming Lingva or hitting rate limits
        // but we could parallelize a bit if needed.

        const translatedTexts = [];

        // Timeout check helper
        const startTime = Date.now();
        const checkTimeout = () => {
            if (Date.now() - startTime > TIMEOUT_MS) {
                throw new Error('Translation timed out');
            }
        };

        // Process chunks
        for (const chunk of textChunks) {
            checkTimeout();

            // Translate chunk
            try {
                const translations = await translateBatch(chunk, sourceLang, targetLang);

                // If translateBatch returns partial nulls (shouldn't if lingva.js handles it),
                // we'll get matching array length.
                translatedTexts.push(...translations);

            } catch (e) {
                console.error('Chunk translation failed:', e);
                // Fill with nulls to maintain index alignment
                translatedTexts.push(...new Array(chunk.length).fill(null));
            }
        }

        // 4. Merge Translations
        const resultSegments = segments.map((seg, i) => ({
            ...seg,
            translation: translatedTexts[i] || null
        }));

        // 5. Save to Cache (fire and forget)
        // Only save if we have a significant number of translations (e.g. > 50%)
        const successCount = resultSegments.filter(s => s.translation).length;
        if (successCount / resultSegments.length > 0.5) {
            if (waitUntil) {
                waitUntil(saveTranslation(r2, videoId, sourceLang, targetLang, resultSegments));
            } else {
                await saveTranslation(r2, videoId, sourceLang, targetLang, resultSegments);
            }
        }

        return jsonResponse({
            videoId,
            sourceLang,
            targetLang,
            segments: resultSegments,
            cached: false
        }, 200, getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt));

    } catch (error) {
        console.error('[Dual Subtitles] Error:', error);
        return errorResponse(error.message);
    }
}
