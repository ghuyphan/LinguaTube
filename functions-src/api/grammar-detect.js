/**
 * Stateless Edge Grammar Detection Endpoint
 *
 * POST /api/grammar-detect
 * Detects English (`en`) and Vietnamese (`vi`) grammar patterns from subtitle cues
 * or tokenized sentences using shared deterministic rules + compromise (EN) / VTB lexicon (VI).
 */

import {
    consumeRateLimit,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders
} from '../middlewares/rate-limiter.js';
import { authenticateIdentity } from '../middlewares/auth.js';
import {
    jsonResponse,
    handleOptions,
    getRequestJson,
    sanitizeLanguage
} from '../utils/utils.js';
import { detectGrammar } from '../services/grammar-detector.js';

const SUPPORTED_DETECT_LANGUAGES = new Set(['en', 'vi']);
const MAX_CUES_PER_REQUEST = 250;
const MAX_TEXT_LENGTH = 8000;
const MAX_CUE_TEXT_LENGTH = 1000;

const RATE_LIMIT_CONFIG = {
    max: 120,
    windowSeconds: 3600,
    keyPrefix: 'grammar-detect'
};

export async function onRequestPost(context) {
    const { request, env } = context;

    const authResult = await authenticateIdentity(request, env);
    if (authResult.response) return authResult.response;
    const clientId = getClientIdentifier(request, authResult);
    const rateCheck = await consumeRateLimit(env?.TRANSCRIPT_CACHE, clientId, RATE_LIMIT_CONFIG, context);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    const body = await getRequestJson(request);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        return jsonResponse({ error: 'Invalid JSON request body' }, 400, { 'Cache-Control': 'no-store' }, request);
    }

    const rawLang = typeof body.language === 'string' ? body.language.trim() : '';
    const lang = sanitizeLanguage(rawLang);
    if (!lang || !SUPPORTED_DETECT_LANGUAGES.has(lang)) {
        return jsonResponse(
            { error: 'Unsupported language for grammar detection. Supported: en, vi' },
            400,
            { 'Cache-Control': 'no-store' },
            request
        );
    }

    if (body.cues !== undefined) {
        if (!Array.isArray(body.cues)) {
            return jsonResponse({ error: 'cues must be an array' }, 400, { 'Cache-Control': 'no-store' }, request);
        }
        if (body.cues.length > MAX_CUES_PER_REQUEST) {
            return jsonResponse(
                { error: `Too many cues (max ${MAX_CUES_PER_REQUEST} per request)` },
                400,
                { 'Cache-Control': 'no-store' },
                request
            );
        }
        for (let i = 0; i < body.cues.length; i++) {
            const cue = body.cues[i];
            if (!cue || typeof cue.text !== 'string') {
                return jsonResponse(
                    { error: `cues[${i}].text must be a string` },
                    400,
                    { 'Cache-Control': 'no-store' },
                    request
                );
            }
            if (cue.text.length > MAX_CUE_TEXT_LENGTH) {
                return jsonResponse(
                    { error: `cues[${i}].text exceeds ${MAX_CUE_TEXT_LENGTH} characters` },
                    400,
                    { 'Cache-Control': 'no-store' },
                    request
                );
            }
        }
    } else if (typeof body.text === 'string' && body.text.length > MAX_TEXT_LENGTH) {
        return jsonResponse(
            { error: `text exceeds ${MAX_TEXT_LENGTH} characters` },
            400,
            { 'Cache-Control': 'no-store' },
            request
        );
    } else if (typeof body.text !== 'string' && !Array.isArray(body.tokens)) {
        return jsonResponse(
            { error: 'Either cues array, text string, or tokens array is required' },
            400,
            { 'Cache-Control': 'no-store' },
            request
        );
    }

    const detection = await detectGrammar({
        language: lang,
        cues: body.cues,
        tokens: body.tokens,
        text: body.text
    });

    if (detection.error) {
        return jsonResponse({ error: detection.error }, 400, { 'Cache-Control': 'no-store' }, request);
    }

    return jsonResponse(
        detection,
        200,
        {
            'Cache-Control': 'no-store',
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt, RATE_LIMIT_CONFIG.max)
        },
        request
    );
}

export async function onRequestOptions({ request }) {
    return handleOptions(request);
}
