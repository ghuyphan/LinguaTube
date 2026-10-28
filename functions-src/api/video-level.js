/**
 * Video Level API (Cloudflare Function)
 * Stores and updates computed language difficulty levels for videos
 * 
 * Route: POST /api/video-level
 * Body: { videoId: string, language: string, level: string, details?: object }
 */

import { jsonResponse, handleOptions, sanitizeVideoId, sanitizeLanguage, errorResponse } from '../utils/utils.js';
import { saveVideoLevel, labelToTier } from '../data/video-info-db.js';
import { consumeRateLimit, getClientIdentifier, rateLimitResponse } from '../middlewares/rate-limiter.js';
import { validateAuthToken, unauthorizedResponse } from '../middlewares/auth.js';

const RATE_LIMIT_CONFIG = { max: 60, windowSeconds: 3600, keyPrefix: 'video_level' };
const VALID_LEVEL_REGEX = /^(JLPT\s*N[1-5]|HSK\s*(?:[1-6]|[1-6]\s*[-–—]\s*[1-6])|TOPIK\s*(?:[1-6]|I{1,2}|[1-6]\s*[-–—]\s*[1-6])|CEFR\s*(?:[A-C][1-2]|C1\s*[-–—]\s*C2)|Beginner|Elementary|Intermediate|Upper[\s_-]?Intermediate|Advanced)$/i;

/**
 * Normalizes incoming level representations (e.g. range strings) to canonical standard levels
 * @param {string} raw
 * @returns {string}
 */
export function normalizeIncomingLevel(raw) {
    if (typeof raw !== 'string') return '';
    let clean = raw.trim();
    // Normalize range representations e.g. "HSK 3-4" -> "HSK 3", "TOPIK 3-4" -> "TOPIK 3", "CEFR C1-C2" -> "CEFR C1"
    clean = clean.replace(/\bHSK\s*([1-6])\s*[-–—]\s*[1-6]\b/i, 'HSK $1');
    clean = clean.replace(/\bTOPIK\s*([1-6])\s*[-–—]\s*[1-6]\b/i, 'TOPIK $1');
    clean = clean.replace(/\bCEFR\s*([A-C][1-2])\s*[-–—]\s*[A-C][1-2]\b/i, 'CEFR $1');
    return clean;
}

/**
 * Normalizes tier names (supporting camelCase, snake_case, and spaced variations)
 * @param {string} raw
 * @returns {string|null}
 */
export function normalizeIncomingTier(raw) {
    if (typeof raw !== 'string') return null;
    const clean = raw.trim().toLowerCase().replace(/[-_\s]/g, '');
    if (clean === 'upperintermediate') return 'upper_intermediate';
    if (['beginner', 'elementary', 'intermediate', 'advanced'].includes(clean)) return clean;
    return null;
}

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;

    // Rate limiting to prevent spamming
    const clientId = getClientIdentifier(request);
    const rateLimit = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, RATE_LIMIT_CONFIG, context);
    if (!rateLimit.allowed) {
        return rateLimitResponse(rateLimit.resetAt);
    }

    // Require authentication to submit video levels to prevent community catalog pollution
    const authResult = await validateAuthToken(request, env);
    if (!authResult.valid) {
        return unauthorizedResponse(authResult.error || 'Authentication required to submit video level');
    }

    try {
        const body = await request.json();
        const videoId = sanitizeVideoId(body?.videoId);
        const language = sanitizeLanguage(body?.language, ['ja', 'zh', 'ko', 'en']);
        const rawLevel = typeof body?.level === 'string' ? body.level.trim() : '';
        const level = normalizeIncomingLevel(rawLevel);

        if (!videoId) {
            return jsonResponse({ error: 'Missing or invalid videoId' }, 400);
        }
        if (!language) {
            return jsonResponse({ error: 'Invalid language. Must be ja, zh, ko, or en' }, 400);
        }
        if (!level || level.length > 30 || !VALID_LEVEL_REGEX.test(level)) {
            return jsonResponse({ error: 'Invalid level format. Must match standard proficiency levels (e.g. JLPT N4, HSK 2, CEFR B1)' }, 400);
        }

        // Cap client submissions to max 0.85 (or 0.90 for verified submissions with grammar breakdown)
        const hasGrammarEvidence = (typeof body?.grammarCount === 'number' && body.grammarCount >= 3) ||
            (body?.breakdown && typeof body.breakdown === 'object' && Object.keys(body.breakdown).length > 0);
        const maxConfidence = hasGrammarEvidence ? 0.90 : 0.85;
        const confidence = typeof body?.confidence === 'number'
            ? Math.min(maxConfidence, Math.max(0.0, body.confidence))
            : 0.8;
        const method = typeof body?.method === 'string' && body.method.length <= 20 ? body.method : 'linguistics';

        // Reject assessments with insufficient confidence to protect D1 integrity
        if (confidence < 0.65) {
            return jsonResponse({ error: 'Assessment confidence too low to persist (minimum 0.65 required)', confidence }, 400);
        }

        // Semantic Coherence Validation:
        // Reject contradictory combinations of level, tier, and score
        const expectedTier = labelToTier(level);
        const normalizedTier = normalizeIncomingTier(body?.tier);
        if (normalizedTier && expectedTier) {
            const isBeginnerLevel = expectedTier === 'beginner';
            const isAdvancedLevel = expectedTier === 'advanced';
            if ((isBeginnerLevel && ['advanced', 'upper_intermediate'].includes(normalizedTier)) ||
                (isAdvancedLevel && ['beginner', 'elementary'].includes(normalizedTier))) {
                return jsonResponse({ error: `Incoherent level and tier combination: ${level} cannot be ${normalizedTier}` }, 400);
            }
        }

        let validatedScore = null;
        if (typeof body?.score === 'number' && Number.isFinite(body.score)) {
            validatedScore = Math.min(10.0, Math.max(0.0, Math.round(body.score * 10) / 10));
            if (expectedTier === 'beginner' && validatedScore > 3.0) {
                return jsonResponse({ error: `Incoherent score for beginner level ${level}: ${validatedScore}` }, 400);
            }
            if (expectedTier === 'advanced' && validatedScore < 2.5) {
                return jsonResponse({ error: `Incoherent score for advanced level ${level}: ${validatedScore}` }, 400);
            }
        }

        // Extract and sanitize rich diagnostic details if provided
        const details = {};
        if (validatedScore !== null) {
            details.score = validatedScore;
        }
        if (typeof body?.grammarCount === 'number' && Number.isFinite(body.grammarCount)) {
            details.grammarCount = Math.max(0, Math.min(10000, Math.round(body.grammarCount)));
        }
        if (typeof body?.speechRateCpm === 'number' && Number.isFinite(body.speechRateCpm)) {
            details.speechRateCpm = Math.max(0, Math.min(2000, Math.round(body.speechRateCpm)));
        }
        if (normalizedTier) {
            details.tier = normalizedTier;
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
        const updatedLevels = await saveVideoLevel(db, null, videoId, language, level, confidence, method, details);

        return jsonResponse({
            success: true,
            videoId,
            language,
            level: level,
            confidence,
            method,
            details: Object.keys(details).length > 0 ? details : undefined,
            levels: updatedLevels || { [language]: level }
        }, 200);

    } catch (err) {
        console.error('[VideoLevel] Error:', err.message);
        return errorResponse('Failed to save video level', 500);
    }
}
