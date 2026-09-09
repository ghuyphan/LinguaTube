/**
 * Unified Transcript API (Cloudflare Function)
 * 
 * Single endpoint for all transcript operations:
 * - Native caption fetching (via Supadata or free scraper)
 * - AI transcription (via Gladia)
 * 
 * Endpoint: POST /api/transcript
 */

import { validateAuthToken, getUserTier } from '../middlewares/auth.js';
import { validateVideoRequest } from '../middlewares/video-validator.js';
import { getNextApiKey, markKeyRateLimited } from '../utils/api-key-rotator.js';
import {
    jsonResponse, handleOptions, errorResponse, logError, sanitizeVideoId
} from '../utils/utils.js';
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

// Rate limiting for transcript requests and polling
const TRANSCRIPT_RATE_LIMIT = { max: { anonymous: 20, free: 40, pro: 80, premium: 100 }, windowSeconds: 3600, keyPrefix: 'transcript' };
const POLL_RATE_LIMIT = { max: { anonymous: 60, free: 120, pro: 240, premium: 300 }, windowSeconds: 3600, keyPrefix: 'transcript_poll' };
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

        const cleanVideoId = sanitizeVideoId(videoId);
        if (!cleanVideoId) {
            return jsonResponse({
                success: false,
                videoId,
                requestedLanguage: lang,
                segments: [],
                errorCode: 'INVALID_VIDEO_ID',
                error: 'Invalid YouTube video ID format',
                timing: elapsed()
            }, 400);
        }

        // Auth & Tier Resolution
        const authResult = await validateAuthToken(request, env);
        const clientId = getClientIdentifier(request, authResult);
        const tier = authResult.valid ? getUserTier(authResult.user) : 'anonymous';
        const maxAiDuration = tier === 'premium' ? 45 * 60 : (tier === 'pro' ? 20 * 60 : 10 * 60);

        // Validation (Tier duration limits: Free/Anonymous <= 10m, Pro <= 20m, Premium <= 45m)
        // Skip heavy YouTube scraping on recurring poll requests
        if (!resultUrl) {
            const validationError = await validateVideoRequest(cleanVideoId, lang, duration, preferAI ? 'whisper' : 'innertube', preferAI ? maxAiDuration : null);
            if (validationError) {
                return jsonResponse({
                    success: false,
                    videoId: cleanVideoId,
                    requestedLanguage: lang,
                    segments: [],
                    errorCode: validationError.error === 'video_too_long' ? 'VIDEO_TOO_LONG' : 'INVALID_REQUEST',
                    error: validationError.error,
                    maxDurationMinutes: validationError.maxDurationMinutes,
                    timing: elapsed()
                }, 400);
            }
        }

        // Security: Early validation of resultUrl if provided
        if (resultUrl) {
            try {
                const parsed = new URL(resultUrl);
                if (parsed.protocol !== 'https:' || parsed.hostname !== 'api.gladia.io') {
                    return jsonResponse({
                        success: false,
                        videoId: cleanVideoId,
                        errorCode: 'INVALID_RESULT_URL',
                        error: 'Invalid resultUrl: must be a gladia.io URL',
                        timing: elapsed()
                    }, 400);
                }
            } catch {
                return jsonResponse({
                    success: false,
                    videoId: cleanVideoId,
                    errorCode: 'INVALID_RESULT_URL',
                    error: 'Invalid resultUrl format',
                    timing: elapsed()
                }, 400);
            }
        }

        // Setup Services
        const db = env.VOCAB_DB;
        const r2 = env.TRANSCRIPT_STORAGE;
        const cache = env.TRANSCRIPT_CACHE;
        const _cacheManager = new CacheManager(cache);

        // Rate Limiting (enforced on ALL operations including AI polling and creation)
        const rateLimitConfig = getTieredConfig(resultUrl ? POLL_RATE_LIMIT : TRANSCRIPT_RATE_LIMIT, tier);
        const rateCheck = await consumeRateLimit(cache, clientId, rateLimitConfig);
        if (!rateCheck.allowed) return rateLimitResponse(rateCheck.resetAt);

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
        log(`Request: ${cleanVideoId}, lang: ${lang}, diamonds: ${diamondStatus.diamonds}, tier: ${tier}`);

        const knownInfo = await getVideoLanguages(db, cleanVideoId);
        const nativeLanguages = knownInfo?.availableLanguages || [];
        const availableLanguages = { native: nativeLanguages, ai: [] };

        const diamondInfo = {
            diamonds: diamondStatus.diamonds,
            maxDiamonds: diamondStatus.maxDiamonds,
            nextRegenAt: diamondStatus.nextRegenAt,
            regenIntervalMs: diamondStatus.regenIntervalMs
        };

        const orchestratorParams = { videoId: cleanVideoId, lang, resultUrl, elapsed, availableLanguages, diamondInfo, body, clientId, user, tier, maxAiDuration };

        // -------------------------------------------------------------
        // Polling existing AI
        // -------------------------------------------------------------
        if (resultUrl) {
            const aiRes = await transcriptService.pollAIJob(serviceContext, orchestratorParams);
            if (aiRes.status === 'processing') return jsonResponse({ success: false, status: 'processing', whisperAvailable: true, ...diamondInfo, ...aiRes });
            if (aiRes.status === 'error') return jsonResponse({ success: false, errorCode: 'AI_JOB_FAILED', error: aiRes.error || 'AI transcription failed', ...diamondInfo, timing: elapsed() }, 400);
            return jsonResponse({ success: true, ...aiRes.videoInfo, ...diamondInfo, timing: elapsed() }, 200, { 'Cache-Control': CACHE_CONTROL.AI });
        }

        // -------------------------------------------------------------
        // Step 1: Cache (R2 Hit)
        // -------------------------------------------------------------
        if (!forceRefresh) {
            let cached = await getTranscriptFromR2(r2, cleanVideoId, lang);
            let responseLang = lang;

            // Fallback: If requested language not in R2, check other available languages in R2 for this video!
            if (!cached?.segments?.length && nativeLanguages?.length > 0) {
                for (const altLang of nativeLanguages) {
                    if (altLang === lang) continue;
                    const altCached = await getTranscriptFromR2(r2, cleanVideoId, altLang);
                    if (altCached?.segments?.length > 0) {
                        cached = altCached;
                        responseLang = altLang;
                        break;
                    }
                }
            }

            if (cached?.segments?.length > 0) {
                return jsonResponse({
                    success: true, videoId: cleanVideoId, language: responseLang, requestedLanguage: lang, segments: cached.segments,
                    source: 'cache', sourceDetail: cached.source, availableLanguages, subLanguages: knownInfo?.subLanguages || [responseLang], whisperAvailable: diamondInfo.diamonds > 0,
                    ...diamondInfo, timing: elapsed()
                }, 200, { 'X-Cache': 'HIT', 'Cache-Control': CACHE_CONTROL.R2_HIT });
            }
        }

        // -------------------------------------------------------------
        // Step 2: Native
        // -------------------------------------------------------------
        if (!preferAI) {
            if (!forceRefresh && await isNoTranscript(db, cache, cleanVideoId, lang, 'native')) {
                // Negative cache hit, but maybe AI fallback exists
                return jsonResponse({
                    success: false, videoId: cleanVideoId, requestedLanguage: lang, segments: [], source: 'none',
                    errorCode: 'NO_NATIVE', error: 'No native captions.', availableLanguages, whisperAvailable: diamondStatus.diamonds > 0,
                    ...diamondInfo, timing: elapsed()
                }, 200, { 'X-Cache': 'NEG' });
            }

            const nativeResult = await transcriptService.fetchNativeCaptions(serviceContext, cleanVideoId, lang, {
                title: body.title,
                channel: body.channel,
                duration: body.duration,
                channelAvatar: body.channelAvatar
            });
            if (nativeResult?.segments?.length > 0) {
                const actualLang = nativeResult.detectedLang || lang;
                const updatedInfo = await getVideoLanguages(db, cleanVideoId);
                availableLanguages.native = updatedInfo?.availableLanguages || nativeResult.availableLangs || [actualLang];

                return jsonResponse({
                    success: true, videoId: cleanVideoId, language: actualLang, requestedLanguage: lang, segments: nativeResult.segments,
                    source: 'native', sourceDetail: nativeResult.source, availableLanguages, subLanguages: updatedInfo?.subLanguages || [actualLang], whisperAvailable: diamondInfo.diamonds > 0,
                    languageMismatch: nativeResult.languageMismatch || false,
                    ...diamondInfo, timing: elapsed()
                }, 200, { 'Cache-Control': CACHE_CONTROL.NATIVE });
            }

            if (nativeResult?.availableLangs?.length > 0) {
                availableLanguages.native = nativeResult.availableLangs;
            }

            return jsonResponse({
                success: false, videoId: cleanVideoId, requestedLanguage: lang, segments: [], source: 'none',
                availableLanguages, whisperAvailable: diamondStatus.diamonds > 0, ...diamondInfo,
                errorCode: 'NO_NATIVE', error: 'No native captions found. AI available.', timing: elapsed()
            });
        }

        // -------------------------------------------------------------
        // Step 3: AI
        // -------------------------------------------------------------
        if (diamondStatus.diamonds <= 0) {
            return jsonResponse({ success: false, videoId: cleanVideoId, errorCode: 'NO_DIAMONDS', error: 'No diamonds left.', ...diamondInfo, timing: elapsed() }, 429);
        }

        // Verify Turnstile CAPTCHA for new AI generation jobs (prevent bot abuse of Gladia credits)
        if (!resultUrl) {
            const clientIP = request.headers.get('cf-connecting-ip') || '';
            const captchaCheck = await verifyTurnstileToken(turnstileToken, env.TURNSTILE_SECRET_KEY, clientIP, env.ENVIRONMENT);
            if (!captchaCheck.valid) {
                return jsonResponse({
                    success: false,
                    videoId: cleanVideoId,
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
                success: false, videoId: cleanVideoId, requestedLanguage: lang, errorCode,
                error: aiErr.message, availableLanguages, ...diamondInfo, timing: elapsed()
            }, status);
        }

    } catch (error) {
        logError('Transcript', error, { endpoint: 'onRequestPost' });
        return errorResponse(error.message);
    }
}