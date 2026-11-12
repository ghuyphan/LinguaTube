import { enrichPublishedTranscript } from '../services/transcript-enrichment.js';
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
    jsonResponse, handleOptions, errorResponse, logError, sanitizeVideoId, getRequestJson
} from '../utils/utils.js';
import { consumeRateLimit, getClientIdentifier, getTieredConfig, rateLimitResponse } from '../middlewares/rate-limiter.js';

import {
    getVideoLanguages,
    isNoTranscript,
    deleteNoTranscript,
    saveVideoLevel
} from '../data/video-info-db.js';

import { getTranscriptFromR2 } from '../data/transcript-r2.js';
import { getActiveAiJob } from '../data/transcript-db.js';
import { normalizeLanguageCode, adjustAvailableLanguages } from '../utils/transcript-utils.js';
import { estimateTranscriptLevel } from '../utils/level-estimator.js';
import { scheduleVideoGrade } from '../services/video-grading.js';
import { serverGradingActive, serverGradingEnabled } from '../services/video-grading-jobs.js';

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
const QUOTE_RATE_LIMIT = { max: { anonymous: 60, free: 120, pro: 180, premium: 240 }, windowSeconds: 3600, keyPrefix: 'transcript_quote' };
const POLL_RATE_LIMIT = { max: { anonymous: 180, free: 240, pro: 360, premium: 480 }, windowSeconds: 3600, keyPrefix: 'transcript_poll' };
const CACHE_CONTROL = {
    NO_CACHE: 'no-store'
};

const MAX_FALLBACK_CACHE_READS = 6;

export async function onRequestGet(context) {
    const { env } = context;
    return jsonResponse({
        status: 'ok',
        version: 'v4',
        database: Boolean(env.VOCAB_DB),
        storage: Boolean(env.TRANSCRIPT_STORAGE),
        hasGladiaKey: Boolean(env.GLADIA_API_KEY),
        hasYouTubeDataKey: Boolean(env.YOUTUBE_DATA_API_KEY),
        hasSupadataKey: Boolean(env.SUPADATA_API_KEY),
        hasTurnstileKey: Boolean(env.TURNSTILE_SECRET_KEY)
    });
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const waitUntil = context.waitUntil?.bind(context);
    const elapsed = timer();

    try {
        const body = await getRequestJson(context);
        if (!body || typeof body !== 'object' || Array.isArray(body) ||
            ['preferAI', 'forceRefresh', 'quoteOnly'].some(key => body[key] != null && typeof body[key] !== 'boolean') ||
            (body.expectedDiamondCost != null && (!Number.isInteger(body.expectedDiamondCost) || body.expectedDiamondCost < 0 || body.expectedDiamondCost > 4)) ||
            (body.quoteOnly === true && (body.preferAI !== true || body.jobId != null || body.resultUrl != null)) ||
            (body.jobId != null && (typeof body.jobId !== 'string' || !/^[a-zA-Z0-9_-]{1,200}$/.test(body.jobId)))) {
            return jsonResponse({ success: false, errorCode: 'INVALID_REQUEST', error: 'Invalid transcript request' }, 400);
        }
        const { videoId, lang, preferAI, forceRefresh, jobId, resultUrl, turnstileToken, duration } = body;

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

        const isPolling = Boolean(jobId || resultUrl);

        // Cheap input validation only. Fresh server duration is required at spending time.
        if (!isPolling) {
            const validationError = await validateVideoRequest(
                cleanVideoId,
                lang,
                duration,
                'innertube',
                null,
                { title: body.title, channel: body.channel, skipMetadata: true }
            );
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

        // Security: Early validation of resultUrl if provided (legacy)
        if (resultUrl) {
            try {
                const parsed = new URL(resultUrl);
                if (parsed.protocol !== 'https:' || parsed.hostname !== 'api.gladia.io' || !/^\/v2\/(transcription|pre-recorded)(\/[a-zA-Z0-9_/-]+)?$/.test(parsed.pathname)) {
                    return jsonResponse({
                        success: false,
                        videoId: cleanVideoId,
                        errorCode: 'INVALID_RESULT_URL',
                        error: 'Invalid resultUrl: must be a gladia.io transcription URL',
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

        const authResult = await validateAuthToken(request, env);
        if (authResult.response) return authResult.response;
        const clientId = getClientIdentifier(request, authResult);
        const tier = authResult.valid ? getUserTier(authResult.user) : 'anonymous';

        // Setup Services
        const db = env.VOCAB_DB;
        const r2 = env.TRANSCRIPT_STORAGE;
        const cache = env.TRANSCRIPT_CACHE;
        const _cacheManager = new CacheManager(cache);

        // Rate Limiting (enforced on ALL operations including AI polling and creation)
        const rateLimitConfig = getTieredConfig(body.quoteOnly ? QUOTE_RATE_LIMIT : isPolling ? POLL_RATE_LIMIT : TRANSCRIPT_RATE_LIMIT, tier);
        const rateCheck = await consumeRateLimit(cache, clientId, rateLimitConfig, context);
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
        const diamondStatus = await diamondService.getDiamonds(clientId, user, env, context);
        log(`Request: ${cleanVideoId}, lang: ${lang}, diamonds: ${diamondStatus.diamonds}, tier: ${tier}`);

        const knownInfo = await getVideoLanguages(db, cleanVideoId);
        const nativeLanguages = knownInfo?.availableLanguages || [];
        const subLanguages = knownInfo?.subLanguages || [];
        const normNative = nativeLanguages.map(n => n.split('-')[0].toLowerCase());
        const aiLanguages = subLanguages.filter(l => !normNative.includes(l.split('-')[0].toLowerCase()));
        const availableLanguages = { native: nativeLanguages, ai: aiLanguages };

        const diamondInfo = {
            diamonds: diamondStatus.diamonds,
            maxDiamonds: diamondStatus.maxDiamonds,
            nextRegenAt: diamondStatus.nextRegenAt,
            regenIntervalMs: diamondStatus.regenIntervalMs
        };

        const orchestratorParams = { videoId: cleanVideoId, lang, jobId, resultUrl, elapsed, availableLanguages, diamondInfo, body, clientId, user, tier, forceRefresh: Boolean(forceRefresh) };

        if (body.quoteOnly === true) {
            try {
                const quote = await transcriptService.quoteAIJob(serviceContext, orchestratorParams);
                return jsonResponse({ success: true, ...quote }, 200, { 'Cache-Control': 'no-store' });
            } catch (error) {
                const errorCode = error.message.split(':')[0];
                if (!['VIDEO_DURATION_UNAVAILABLE', 'LIVESTREAM_NOT_SUPPORTED', 'VIDEO_UNAVAILABLE', 'VIDEO_METADATA_NOT_CONFIGURED', 'VIDEO_METADATA_STORAGE_UNAVAILABLE'].includes(errorCode)) throw error;
                return jsonResponse({ success: false, errorCode, error: error.message }, error.status || 400, { 'Cache-Control': 'no-store', ...(error.retryAfterSeconds ? { 'Retry-After': String(error.retryAfterSeconds) } : {}) });
            }
        }

        const resolveLevels = async (videoId, language, segments, info, snapshot) => {
            const levels = info?.levels || {};
            if (serverGradingEnabled(env)) {
                if (waitUntil) waitUntil(scheduleVideoGrade(env, videoId, language, { snapshot }));
                return levels;
            }
            if (levels[language] && !levels[language].isProvisional) return levels;
            const estimated = estimateTranscriptLevel(segments, language, {
                title: info?.title || '', channel: info?.channel || ''
            });
            if (!estimated) return levels;
            const stored = await saveVideoLevel(db, null, videoId, language,
                estimated.level, estimated.confidence, estimated.method, { ...estimated, onlyIfMissing: true });
            return stored?.[language] ? stored : {
                ...levels, [language]: { ...estimated, language, isProvisional: true }
            };
        };

        const grading = (levels, language, eligible = true) => serverGradingEnabled(env)
            ? { gradingStatus: levels[language] && !levels[language].isProvisional
                ? 'ready' : eligible && serverGradingActive(env) ? 'pending' : 'unavailable' }
            : {};

        const aiResponse = async (videoInfo) => {
            const info = await getVideoLanguages(db, videoInfo.videoId);
            const language = normalizeLanguageCode(videoInfo.language);
            const levels = await resolveLevels(videoInfo.videoId,
                language, videoInfo.segments, info);
            const responseAvailableLanguages = adjustAvailableLanguages(videoInfo.availableLanguages || availableLanguages, language, 'ai');
            return jsonResponse({ success: true, ...videoInfo, availableLanguages: responseAvailableLanguages, levels,
                ...grading(levels, language, !videoInfo.languageMismatch), ...diamondInfo, timing: elapsed() },
                200, { 'Cache-Control': CACHE_CONTROL.NO_CACHE });
        };

        // -------------------------------------------------------------
        // Polling existing AI (Opaque jobId or legacy resultUrl)
        // -------------------------------------------------------------
        if (jobId || resultUrl) {
            const aiRes = jobId
                ? await transcriptService.pollAiJobStatus(serviceContext, orchestratorParams)
                : await transcriptService.pollAIJob(serviceContext, orchestratorParams);

            if (aiRes.status === 'processing') return jsonResponse({ success: false, status: 'processing', whisperAvailable: true, ...diamondInfo, ...aiRes }, 202);
            if (aiRes.status === 'error') return jsonResponse({ success: false, errorCode: aiRes.errorCode || 'AI_JOB_FAILED', error: aiRes.error || 'AI transcription failed', ...diamondInfo, timing: elapsed() }, 400);
            return await aiResponse(aiRes.videoInfo);
        }

        const requestedLanguage = normalizeLanguageCode(lang);
        const cachedResponse = async (saved, storageLanguage, cacheStatus) => {
            const language = normalizeLanguageCode(saved.language);
            const languageMismatch = language !== requestedLanguage;
            const refreshDeferred = cacheStatus === 'STALE';
            const levels = refreshDeferred || languageMismatch
                ? knownInfo?.levels || {}
                : await resolveLevels(cleanVideoId, language, saved.segments, knownInfo, saved);

            if (!refreshDeferred) {
                if (waitUntil && !saved.segments.every(cue => cue.tokens?.length)) {
                    waitUntil(enrichPublishedTranscript(r2, cleanVideoId, storageLanguage));
                }

                // Caption duration is a display estimate. AI pricing uses official metadata.
                if (!languageMismatch && !knownInfo?.durationSeconds && waitUntil && db) {
                    const lastCue = saved.segments.at(-1);
                    const inferredSec = Math.round(lastCue.start + lastCue.duration);
                    if (inferredSec > 0) {
                        waitUntil(Promise.resolve().then(() => db.prepare(`
                            UPDATE video_languages SET duration_seconds=?, updated_at=unixepoch()
                            WHERE video_id=? AND (duration_seconds IS NULL OR duration_seconds=0)
                        `).bind(inferredSec, cleanVideoId).run()).catch(() => {}));
                    }
                }
            }

            const responseAvailableLanguages = adjustAvailableLanguages(availableLanguages, language, saved.source);

            return jsonResponse({
                success: true, videoId: cleanVideoId, language, requestedLanguage: lang, segments: saved.segments,
                source: preferAI ? 'ai' : 'cache', sourceDetail: saved.source, trackLanguage: saved.trackLanguage,
                availableLanguages: responseAvailableLanguages, subLanguages: knownInfo?.subLanguages || [language],
                whisperAvailable: diamondInfo.diamonds > 0, languageMismatch, levels,
                ...grading(levels, language, !languageMismatch),
                ...(refreshDeferred ? { refreshDeferred } : {}),
                ...diamondInfo, timing: elapsed()
            }, 200, { 'X-Cache': cacheStatus, 'Cache-Control': CACHE_CONTROL.NO_CACHE });
        };

        if (!forceRefresh) {
            const cached = await getTranscriptFromR2(r2, cleanVideoId, lang);
            if (cached && (!preferAI || cached.source === 'ai')) {
                return await cachedResponse(cached, lang, 'HIT');
            }
        }

        // -------------------------------------------------------------
        // Step 2: Native (or resume active pending AI job)
        // -------------------------------------------------------------
        if (!preferAI) {
            // Check if there is an active AI job for this video
            const activeJob = forceRefresh ? null : await getActiveAiJob(db, cleanVideoId, lang, diamondService, env, context);
            if (activeJob) {
                return jsonResponse({
                    success: false,
                    status: 'processing',
                    jobId: activeJob.id,
                    videoId: cleanVideoId,
                    availableLanguages,
                    whisperAvailable: true,
                    ...diamondInfo,
                    timing: elapsed()
                }, 202);
            }

            let nativeSkipReason = null;
            if (forceRefresh) {
                await deleteNoTranscript(db, cleanVideoId, lang, 'native');
            } else if (await isNoTranscript(db, cache, cleanVideoId, lang, 'native')) {
                nativeSkipReason = 'negative';
            } else if (knownInfo?.availableLanguages?.length > 0) {
                const hasLang = knownInfo.availableLanguages.some(l => normalizeLanguageCode(l) === requestedLanguage);
                if (!hasLang) nativeSkipReason = 'language';
            }

            // A known native miss skips the provider, but still allows R2 alternatives.
            const nativeResult = nativeSkipReason ? null : await transcriptService.fetchNativeCaptions(serviceContext, cleanVideoId, lang, {
                title: body.title,
                channel: body.channel,
                duration: body.duration,
                channelAvatar: body.channelAvatar,
                retryTimeout: !forceRefresh || !subLanguages.some(l => normalizeLanguageCode(l) === requestedLanguage)
            });
            if (nativeResult?.availableLangs?.length > 0) {
                availableLanguages.native = nativeResult.availableLangs;
            }
            if (nativeResult?.segments?.length > 0) {
                const actualLang = nativeResult.detectedLang;
                const levels = nativeResult.languageMismatch || serverGradingEnabled(env)
                    ? knownInfo?.levels || {}
                    : await resolveLevels(cleanVideoId, actualLang, nativeResult.segments,
                        await getVideoLanguages(db, cleanVideoId));

                return jsonResponse({
                    success: true, videoId: cleanVideoId, language: actualLang, requestedLanguage: lang, segments: nativeResult.segments,
                    source: 'native', sourceDetail: nativeResult.source, trackLanguage: nativeResult.trackLanguage, availableLanguages, subLanguages: knownInfo?.subLanguages || [actualLang], whisperAvailable: diamondInfo.diamonds > 0,
                    languageMismatch: nativeResult.languageMismatch || false,
                    levels,
                    ...grading(levels, actualLang, !nativeResult.languageMismatch),
                    ...diamondInfo, timing: elapsed()
                }, 200, { 'Cache-Control': CACHE_CONTROL.NO_CACHE });
            }

            // Keep an exact, verified saved copy usable during a provider outage.
            // A confirmed miss or language mismatch can still reveal a track change.
            if (forceRefresh && (!nativeResult || nativeResult.unavailable) && !nativeResult?.languageMismatch) {
                const saved = await getTranscriptFromR2(r2, cleanVideoId, lang);
                if (saved) return await cachedResponse(saved, lang, 'STALE');
            }

            // Fallback: If requested language is not available natively on YouTube,
            // check if another language was cached in R2 to offer as a language mismatch
            const allCandidateLangs = Array.from(new Set([
                ...subLanguages,
                ...availableLanguages.native,
                ...nativeLanguages
            ])).filter(a => normalizeLanguageCode(a) !== requestedLanguage)
                .slice(0, MAX_FALLBACK_CACHE_READS);

            if (allCandidateLangs.length > 0) {
                const altResults = await Promise.all(
                    allCandidateLangs.map(altLang => getTranscriptFromR2(r2, cleanVideoId, altLang))
                );
                const fallbackIndex = altResults.findIndex(Boolean);
                if (fallbackIndex !== -1) {
                    return await cachedResponse(altResults[fallbackIndex], allCandidateLangs[fallbackIndex], 'LANG_MISMATCH');
                }
            }

            if (nativeSkipReason || nativeResult?.languageMismatch) {
                const isLanguageMismatch = nativeSkipReason === 'language' || nativeResult?.languageMismatch === true;
                return jsonResponse({
                    success: false, videoId: cleanVideoId, requestedLanguage: lang, segments: [], source: 'none',
                    ...(isLanguageMismatch ? { languageMismatch: true, subLanguages } : {}),
                    availableLanguages, whisperAvailable: diamondStatus.diamonds > 0, ...diamondInfo,
                    errorCode: 'NO_NATIVE',
                    error: isLanguageMismatch ? 'No native captions in requested language.' : 'No native captions.',
                    timing: elapsed()
                }, 200, { 'X-Cache': isLanguageMismatch ? 'LANG_MISMATCH' : 'NEG', 'Cache-Control': CACHE_CONTROL.NO_CACHE });
            }

            if (!nativeResult || nativeResult.unavailable) {
                return jsonResponse({
                    success: false, videoId: cleanVideoId, requestedLanguage: lang, segments: [], source: 'none',
                    availableLanguages, ...diamondInfo, errorCode: 'NATIVE_PROVIDER_UNAVAILABLE',
                    error: 'Native captions could not be verified. Please retry.',
                    timing: elapsed()
                }, 503, { 'Cache-Control': CACHE_CONTROL.NO_CACHE, 'Retry-After': '10' });
            }

            return jsonResponse({
                success: false, videoId: cleanVideoId, requestedLanguage: lang, segments: [], source: 'none',
                availableLanguages, whisperAvailable: diamondStatus.diamonds > 0, ...diamondInfo,
                errorCode: 'NO_NATIVE', error: 'No native captions found. AI available.', timing: elapsed()
            }, 200, { 'Cache-Control': CACHE_CONTROL.NO_CACHE });
        }

        // -------------------------------------------------------------
        // Step 3: AI
        // -------------------------------------------------------------
        const sharedJob = await getActiveAiJob(db, cleanVideoId, lang);
        if (sharedJob) return jsonResponse({ success: false, status: 'processing', jobId: sharedJob.id, videoId: cleanVideoId, availableLanguages, whisperAvailable: true, ...diamondInfo, timing: elapsed() }, 202);

        if (diamondStatus.diamonds <= 0) {
            return jsonResponse({ success: false, videoId: cleanVideoId, errorCode: 'NO_DIAMONDS', error: 'No diamonds left.', ...diamondInfo, timing: elapsed() }, 429);
        }

        // Verify Turnstile CAPTCHA for new AI generation jobs (prevent bot abuse of Gladia credits)
        if (!isPolling) {
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

            if (aiJobRes.status === 'processing') return jsonResponse({ success: false, status: 'processing', whisperAvailable: true, ...diamondInfo, ...aiJobRes, ...(aiJobRes.diamondInfo || {}) }, 202);
            return await aiResponse(aiJobRes.videoInfo);

        } catch (aiErr) {
            let errorCode = aiErr.message.split(':')[0] || 'AI_SERVICE_ERROR';
            let status = aiErr.status || 500;
            if (aiErr.status) {
                // Structured metadata failures retain their status and retry timing.
            } else if (errorCode === 'DIAMOND_PRICE_CHANGED') {
                status = 409;
            } else if (errorCode === 'VIDEO_TOO_LONG' || errorCode === 'INSUFFICIENT_DIAMONDS' || errorCode === 'VIDEO_DURATION_UNAVAILABLE' || errorCode === 'LIVESTREAM_NOT_SUPPORTED') {
                status = 400;
            } else if (aiErr.message.includes('402') || aiErr.message.includes('quota')) {
                errorCode = 'AI_QUOTA_EXCEEDED';
                status = 402;
            } else if (aiErr.message.includes('429')) {
                errorCode = 'AI_RATE_LIMITED';
                status = 429;
            } else if (aiErr.name === 'TimeoutError' || aiErr.message.includes('timeout') || aiErr.message.includes('aborted')) {
                errorCode = 'AI_TIMEOUT';
                status = 504;
            } else if (aiErr.message.includes('400')) {
                errorCode = 'AI_INVALID_REQUEST';
                status = 400;
            }
            return jsonResponse({
                success: false, videoId: cleanVideoId, requestedLanguage: lang, errorCode,
                error: aiErr.message, availableLanguages, ...diamondInfo, timing: elapsed()
            }, status, { 'Cache-Control': 'no-store', ...(aiErr.retryAfterSeconds ? { 'Retry-After': String(aiErr.retryAfterSeconds) } : {}) });
        }

    } catch (error) {
        logError('Transcript', error, { endpoint: 'onRequestPost' });
        return errorResponse(error.message);
    }
}
