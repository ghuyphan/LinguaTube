/**
 * Unified Transcript API (Cloudflare Function)
 * 
 * Single endpoint for all transcript operations:
 * - Native caption fetching (via Supadata or free scraper)
 * - AI transcription (via Gladia)
 * 
 * Endpoint: POST /api/transcript
 */

import { validateAuthToken, hasPremiumAccess } from '../middlewares/auth.js';
import { validateVideoRequest } from '../middlewares/video-validator.js';
import { getNextApiKey, markKeyRateLimited } from '../utils/api-key-rotator.js';
import {
    jsonResponse, handleOptions, errorResponse, logError
} from '../utils/utils.js';
import { cleanTranscriptSegments } from '../utils/transcript-utils.js';
import { consumeRateLimit, getClientIdentifier, getTieredConfig, rateLimitResponse } from '../middlewares/rate-limiter.js';

import {
    getVideoLanguages,
    isNoTranscript,
} from '../data/video-info-db.js';

import { getTranscriptFromR2 } from '../data/transcript-r2.js';

// Services
import { CacheManager } from '../utils/cache-manager.js';
import { GladiaProvider } from '../providers/gladia.js';
import { SupadataProvider } from '../providers/supadata.js';
import { DiamondService } from '../services/diamond.service.js';
import { TranscriptService } from '../services/transcript.service.js';
import { verifyTurnstileToken } from '../services/turnstile.service.js';

const DEBUG = true;

function log(...args) { if (DEBUG) console.log('[Transcript API]', ...args); }
function timer() { const start = Date.now(); return () => Date.now() - start; }

// Rate limiting for native captions
const NATIVE_RATE_LIMIT = { max: { anonymous: 20, free: 30, pro: 60, premium: 60 }, windowSeconds: 3600, keyPrefix: 'transcript' };
const CACHE_CONTROL = {
    R2_HIT: 'public, max-age=86400, stale-while-revalidate=86400',
    NATIVE: 'public, max-age=604800, stale-while-revalidate=86400',
    AI: 'public, max-age=604800, stale-while-revalidate=86400',
    NO_CACHE: 'no-store'
};

export function onRequestOptions() { return handleOptions(['POST', 'OPTIONS']); }

export async function onRequestGet({ env }) {
    return jsonResponse({
        status: 'ok',
        version: 'v4',
        database: Boolean(env.VOCAB_DB),
        storage: Boolean(env.TRANSCRIPT_STORAGE)
    });
}

export async function onRequestPost(context) {
    const { request, env, waitUntil } = context;
    const elapsed = timer();

    try {
        const body = await request.json();
        const { videoId, lang, preferAI, forceRefresh, resultUrl, turnstileToken, duration } = body;

        // Validation
        const validationError = await validateVideoRequest(videoId, lang, duration, preferAI ? 'whisper' : 'innertube');
        if (validationError) {
            return jsonResponse({
                success: false,
                videoId,
                requestedLanguage: lang,
                segments: [],
                errorCode: validationError.error === 'video_too_long' ? 'VIDEO_TOO_LONG' : 'INVALID_REQUEST',
                error: validationError.error,
                maxDurationMinutes: validationError.maxDurationMinutes,
                timing: elapsed()
            }, 400);
        }

        // Security: Early validation of resultUrl if provided
        if (resultUrl) {
            try {
                const parsed = new URL(resultUrl);
                if (parsed.protocol !== 'https:' || parsed.hostname !== 'api.gladia.io') {
                    return jsonResponse({
                        success: false,
                        videoId,
                        errorCode: 'INVALID_RESULT_URL',
                        error: 'Invalid resultUrl: must be a gladia.io URL',
                        timing: elapsed()
                    }, 400);
                }
            } catch {
                return jsonResponse({
                    success: false,
                    videoId,
                    errorCode: 'INVALID_RESULT_URL',
                    error: 'Invalid resultUrl format',
                    timing: elapsed()
                }, 400);
            }
        }

        // Auth
        const authResult = await validateAuthToken(request, env);
        const clientId = getClientIdentifier(request, authResult);
        const tier = authResult.valid
            ? (hasPremiumAccess(authResult.user) ? 'premium' : authResult.user.subscriptionTier || 'free')
            : 'anonymous';

        // Setup Services
        const db = env.VOCAB_DB;
        const r2 = env.TRANSCRIPT_STORAGE;
        const cache = env.TRANSCRIPT_CACHE;
        const _cacheManager = new CacheManager(cache);

        // Providers
        const supadataKeys = [env.SUPADATA_API_KEY, env.SUPADATA_API_KEY_2, env.SUPADATA_API_KEY_3];
        const rotator = { getNextApiKey, markKeyRateLimited };

        const supadata = new SupadataProvider(supadataKeys, rotator);
        const gladia = new GladiaProvider(env.GLADIA_API_KEY);

        const diamondService = new DiamondService(_cacheManager);
        const transcriptService = new TranscriptService(supadata, gladia, diamondService, _cacheManager);

        const serviceContext = { env, db, r2, cache, waitUntil };

        // Diamond status immediately
        const user = authResult.valid ? authResult.user : null;
        const diamondStatus = await diamondService.getDiamonds(clientId, user);
        log(`Request: ${videoId}, lang: ${lang}, diamonds: ${diamondStatus.diamonds}`);

        const knownInfo = await getVideoLanguages(db, videoId);
        const nativeLanguages = knownInfo?.availableLanguages || [];
        const availableLanguages = { native: nativeLanguages, ai: [] };

        const diamondInfo = {
            diamonds: diamondStatus.diamonds,
            maxDiamonds: diamondStatus.maxDiamonds,
            nextRegenAt: diamondStatus.nextRegenAt,
            regenIntervalMs: diamondStatus.regenIntervalMs
        };

        const orchestratorParams = { videoId, lang, resultUrl, elapsed, availableLanguages, diamondInfo, body, clientId, user };

        // -------------------------------------------------------------
        // Polling existing AI
        // -------------------------------------------------------------
        if (resultUrl) {
            const aiRes = await transcriptService.pollAIJob(serviceContext, orchestratorParams);
            if (aiRes.status === 'processing') return jsonResponse({ success: false, status: 'processing', whisperAvailable: true, ...diamondInfo, ...aiRes });
            return jsonResponse({ success: true, ...aiRes.videoInfo, ...diamondInfo, timing: elapsed() }, 200, { 'Cache-Control': CACHE_CONTROL.AI });
        }

        // -------------------------------------------------------------
        // Step 1: Cache (R2 Hit)
        // -------------------------------------------------------------
        if (!forceRefresh) {
            const cached = await getTranscriptFromR2(r2, videoId, lang);
            if (cached?.segments?.length > 0) {
                return jsonResponse({
                    success: true, videoId, language: lang, requestedLanguage: lang, segments: cached.segments,
                    source: 'cache', sourceDetail: cached.source, availableLanguages, whisperAvailable: diamondInfo.diamonds > 0,
                    ...diamondInfo, timing: elapsed()
                }, 200, { 'X-Cache': 'HIT', 'Cache-Control': CACHE_CONTROL.R2_HIT });
            }
        }

        // Rate Limit specific to native checks
        if (!preferAI) {
            const rateLimitConfig = getTieredConfig(NATIVE_RATE_LIMIT, tier);
            const rateCheck = await consumeRateLimit(cache, clientId, rateLimitConfig);
            if (!rateCheck.allowed) return rateLimitResponse(rateCheck.resetAt);
        }

        // -------------------------------------------------------------
        // Step 2: Native
        // -------------------------------------------------------------
        if (!preferAI) {
            if (!forceRefresh && await isNoTranscript(db, cache, videoId, lang, 'native')) {
                // Negative cache hit, but maybe AI fallback exists
                return jsonResponse({
                    success: false, videoId, requestedLanguage: lang, segments: [], source: 'none',
                    errorCode: 'NO_NATIVE', error: 'No native captions.', availableLanguages, whisperAvailable: diamondStatus.diamonds > 0,
                    ...diamondInfo, timing: elapsed()
                }, 200, { 'X-Cache': 'NEG' });
            }

            const nativeResult = await transcriptService.fetchNativeCaptions(serviceContext, videoId, lang);
            if (nativeResult) {
                const updatedInfo = await getVideoLanguages(db, videoId);
                availableLanguages.native = updatedInfo?.availableLanguages || [lang];

                return jsonResponse({
                    success: true, videoId, language: lang, requestedLanguage: lang, segments: nativeResult.segments,
                    source: 'native', sourceDetail: nativeResult.source, availableLanguages, whisperAvailable: diamondInfo.diamonds > 0,
                    ...diamondInfo, timing: elapsed()
                }, 200, { 'Cache-Control': CACHE_CONTROL.NATIVE });
            }

            return jsonResponse({
                success: false, videoId, requestedLanguage: lang, segments: [], source: 'none',
                availableLanguages, whisperAvailable: diamondStatus.diamonds > 0, ...diamondInfo,
                errorCode: 'NO_NATIVE', error: 'No native captions found. AI available.', timing: elapsed()
            });
        }

        // -------------------------------------------------------------
        // Step 3: AI
        // -------------------------------------------------------------
        if (diamondStatus.diamonds <= 0) {
            return jsonResponse({ success: false, videoId, errorCode: 'NO_DIAMONDS', error: 'No diamonds left.', ...diamondInfo, timing: elapsed() }, 429);
        }

        // Verify Turnstile CAPTCHA for new AI generation jobs (prevent bot abuse of Gladia credits)
        if (!resultUrl) {
            const clientIP = request.headers.get('cf-connecting-ip') || '';
            const captchaCheck = await verifyTurnstileToken(turnstileToken, env.TURNSTILE_SECRET_KEY, clientIP);
            if (!captchaCheck.valid) {
                return jsonResponse({
                    success: false,
                    videoId,
                    errorCode: 'CAPTCHA_FAILED',
                    error: 'Human verification required to generate AI subtitles. Please try again.',
                    availableLanguages,
                    ...diamondInfo,
                    timing: elapsed()
                }, 403);
            }
        }

        try {
            const aiJobRes = await transcriptService.startAIJob(serviceContext, orchestratorParams);

            if (aiJobRes.status === 'processing') return jsonResponse({ success: false, status: 'processing', whisperAvailable: true, ...diamondInfo, ...aiJobRes });
            return jsonResponse({ success: true, ...aiJobRes.videoInfo, ...diamondInfo, timing: elapsed() }, 200, { 'Cache-Control': CACHE_CONTROL.AI });

        } catch (aiErr) {
            const errorCode = aiErr.message.split(':')[0] || 'AI_SERVICE_ERROR';
            const status = (errorCode === 'VIDEO_TOO_LONG' || errorCode === 'INSUFFICIENT_DIAMONDS') ? 400 : 500;
            return jsonResponse({
                success: false, videoId, requestedLanguage: lang, errorCode,
                error: aiErr.message, availableLanguages, ...diamondInfo, timing: elapsed()
            }, status);
        }

    } catch (error) {
        logError('Transcript', error, { endpoint: 'onRequestPost' });
        return errorResponse(error.message);
    }
}