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
    deleteNoTranscript
} from '../data/video-info-db.js';

import { getTranscriptFromR2, saveTranscriptToR2 } from '../data/transcript-r2.js';
import { getActiveAiJob } from '../data/transcript-db.js';
import { normalizeLanguageCode } from '../utils/transcript-utils.js';
import { enrichSegmentsWithTokens } from '../utils/tokenizer.js';

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
const POLL_RATE_LIMIT = { max: { anonymous: 180, free: 240, pro: 360, premium: 480 }, windowSeconds: 3600, keyPrefix: 'transcript_poll' };
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
        storage: Boolean(env.TRANSCRIPT_STORAGE),
        hasGladiaKey: Boolean(env.GLADIA_API_KEY),
        hasSupadataKey: Boolean(env.SUPADATA_API_KEY),
        hasTurnstileKey: Boolean(env.TURNSTILE_SECRET_KEY)
    });
}

export async function onRequestPost(context) {
    const { request, env, waitUntil } = context;
    const elapsed = timer();

    try {
        const body = await request.json();
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

        // Auth & Tier Resolution
        const authResult = await validateAuthToken(request, env);
        const clientId = getClientIdentifier(request, authResult);
        const tier = authResult.valid ? getUserTier(authResult.user) : 'anonymous';
        const maxAiDuration = tier === 'premium' ? 45 * 60 : (tier === 'pro' ? 20 * 60 : 10 * 60);

        const isPolling = Boolean(jobId || resultUrl);

        // Validation (Tier duration limits: Free/Anonymous <= 10m, Pro <= 20m, Premium <= 45m)
        // Skip heavy YouTube scraping on recurring poll requests
        if (!isPolling) {
            const validationError = await validateVideoRequest(
                cleanVideoId,
                lang,
                duration,
                preferAI ? 'whisper' : 'innertube',
                preferAI ? maxAiDuration : null,
                { title: body.title, channel: body.channel }
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
        const rateLimitConfig = getTieredConfig(isPolling ? POLL_RATE_LIMIT : TRANSCRIPT_RATE_LIMIT, tier);
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

        let requiredDiamonds = 1;
        const dur = duration || knownInfo?.durationSeconds || body?.duration || 0;
        if (dur > 35 * 60) {
            requiredDiamonds = 4;
        } else if (dur > 20 * 60) {
            requiredDiamonds = 3;
        } else if (dur > 10 * 60) {
            requiredDiamonds = 2;
        }

        const orchestratorParams = { videoId: cleanVideoId, lang, jobId, resultUrl, elapsed, availableLanguages, diamondInfo, body, clientId, user, tier, maxAiDuration, requiredDiamonds, forceRefresh: Boolean(forceRefresh) };

        // -------------------------------------------------------------
        // Polling existing AI (Opaque jobId or legacy resultUrl)
        // -------------------------------------------------------------
        if (jobId || resultUrl) {
            const aiRes = jobId
                ? await transcriptService.pollAiJobStatus(serviceContext, orchestratorParams)
                : await transcriptService.pollAIJob(serviceContext, orchestratorParams);

            if (aiRes.status === 'processing') return jsonResponse({ success: false, status: 'processing', whisperAvailable: true, ...diamondInfo, ...aiRes }, 202);
            if (aiRes.status === 'error') return jsonResponse({ success: false, errorCode: aiRes.errorCode || 'AI_JOB_FAILED', error: aiRes.error || 'AI transcription failed', ...diamondInfo, timing: elapsed() }, 400);
            return jsonResponse({ success: true, ...aiRes.videoInfo, ...diamondInfo, timing: elapsed() }, 200, { 'Cache-Control': CACHE_CONTROL.AI });
        }

        // -------------------------------------------------------------
        // Step 1: Cache (R2 Hit)
        // -------------------------------------------------------------
        if (!forceRefresh) {
            let cached = await getTranscriptFromR2(r2, cleanVideoId, lang);
            let responseLang = lang;

            // If user explicitly requests AI, only return an existing AI transcript for this exact language from R2.
            // Never fall back to other languages in R2 or return native transcripts when preferAI is true!
            if (preferAI) {
                if (cached?.segments?.length > 0 && cached.source === 'ai') {
                    // Self-healing: if cached R2 transcript lacks pre-baked tokens, enrich it
                    const targetNormLang = (lang || '').split('-')[0].toLowerCase();
                    if (['ja', 'zh', 'ko', 'en'].includes(targetNormLang) && (!cached.segments[0].tokens || cached.segments[0].tokens.length === 0)) {
                        cached.segments = await enrichSegmentsWithTokens(cached.segments, targetNormLang);
                        if (waitUntil && r2) {
                            waitUntil(saveTranscriptToR2(r2, cleanVideoId, lang, cached.segments, 'ai').catch(() => {}));
                        }
                    }

                    return jsonResponse({
                        success: true, videoId: cleanVideoId, language: lang, requestedLanguage: lang, segments: cached.segments,
                        source: 'ai', sourceDetail: cached.source, availableLanguages, subLanguages: knownInfo?.subLanguages || [lang], whisperAvailable: diamondInfo.diamonds > 0,
                        languageMismatch: false,
                        levels: knownInfo?.levels || {},
                        ...diamondInfo, timing: elapsed()
                    }, 200, { 'X-Cache': 'HIT', 'Cache-Control': CACHE_CONTROL.AI });
                }
                // If not in R2 as AI, bypass Step 1 and proceed to Step 3 (Gladia AI)
            } else {
                // Fallback: If requested language not in R2 and user did NOT request AI,
                // check other available languages in R2 in parallel
                const allCandidateLangs = Array.from(new Set([
                    ...(nativeLanguages || []),
                    ...(knownInfo?.subLanguages || [])
                ])).filter(a => a !== lang);

                if (!cached?.segments?.length && allCandidateLangs.length > 0) {
                    const altResults = await Promise.all(
                        allCandidateLangs.map(altLang => getTranscriptFromR2(r2, cleanVideoId, altLang).then(res => ({ altLang, res })))
                    );
                    const found = altResults.find(item => item.res?.segments?.length > 0);
                    if (found) {
                        cached = found.res;
                        responseLang = found.altLang;
                    }
                }

                if (cached?.segments?.length > 0) {
                    const normReq = normalizeLanguageCode(lang);
                    const normRes = normalizeLanguageCode(responseLang);
                    const isMismatch = Boolean(normReq && normRes && normReq !== normRes);

                    // Self-healing: if cached R2 transcript lacks pre-baked tokens, enrich it
                    const targetNormLang = (normRes || responseLang || '').split('-')[0].toLowerCase();
                    if (['ja', 'zh', 'ko', 'en'].includes(targetNormLang) && (!cached.segments[0].tokens || cached.segments[0].tokens.length === 0)) {
                        cached.segments = await enrichSegmentsWithTokens(cached.segments, targetNormLang);
                        if (waitUntil && r2) {
                            waitUntil(saveTranscriptToR2(r2, cleanVideoId, responseLang, cached.segments, cached.source || 'cache').catch(() => {}));
                        }
                    }

                    return jsonResponse({
                        success: true, videoId: cleanVideoId, language: responseLang, requestedLanguage: lang, segments: cached.segments,
                        source: 'cache', sourceDetail: cached.source, availableLanguages, subLanguages: knownInfo?.subLanguages || [responseLang], whisperAvailable: diamondInfo.diamonds > 0,
                        languageMismatch: isMismatch,
                        levels: knownInfo?.levels || {},
                        ...diamondInfo, timing: elapsed()
                    }, 200, { 'X-Cache': 'HIT', 'Cache-Control': CACHE_CONTROL.R2_HIT });
                }
            }
        }

        // -------------------------------------------------------------
        // Step 2: Native (or resume active pending AI job)
        // -------------------------------------------------------------
        if (!preferAI) {
            // Check if there is an active AI job for this video
            const activeJob = await getActiveAiJob(db, cleanVideoId, lang, diamondService, env, context);
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

            if (forceRefresh) {
                deleteNoTranscript(db, cleanVideoId, lang, 'native').catch(() => {});
            } else {
                // 1. Negative cache hit (specific lang or global '*')
                if (await isNoTranscript(db, cache, cleanVideoId, lang, 'native')) {
                    return jsonResponse({
                        success: false, videoId: cleanVideoId, requestedLanguage: lang, segments: [], source: 'none',
                        errorCode: 'NO_NATIVE', error: 'No native captions.', availableLanguages, whisperAvailable: diamondStatus.diamonds > 0,
                        ...diamondInfo, timing: elapsed()
                    }, 200, { 'X-Cache': 'NEG' });
                }

                // 2. Video known to have 0 native languages globally in D1 (persisted from previous check)
                if (knownInfo && Array.isArray(knownInfo.availableLanguages) && knownInfo.availableLanguages.length === 0 && (knownInfo.title || knownInfo.durationSeconds)) {
                    return jsonResponse({
                        success: false, videoId: cleanVideoId, requestedLanguage: lang, segments: [], source: 'none',
                        errorCode: 'NO_NATIVE', error: 'No native captions found. AI available.', availableLanguages, whisperAvailable: diamondStatus.diamonds > 0,
                        ...diamondInfo, timing: elapsed()
                    }, 200, { 'X-Cache': 'KNOWN_NO_LANGS' });
                }

                // 3. Video known to have native captions, but requested language is not among them (e.g. video has en/ja, user asked for zh)
                if (knownInfo && Array.isArray(knownInfo.availableLanguages) && knownInfo.availableLanguages.length > 0) {
                    const normLang = lang.split('-')[0].toLowerCase();
                    const hasLang = knownInfo.availableLanguages.some(l => l.split('-')[0].toLowerCase() === normLang);
                    if (!hasLang) {
                        return jsonResponse({
                            success: false, videoId: cleanVideoId, requestedLanguage: lang, segments: [], source: 'none',
                            languageMismatch: true,
                            availableLanguages,
                            subLanguages: knownInfo.subLanguages || [],
                            whisperAvailable: diamondStatus.diamonds > 0,
                            errorCode: 'NO_NATIVE', error: 'No native captions in requested language.',
                            ...diamondInfo, timing: elapsed()
                        }, 200, { 'X-Cache': 'LANG_MISMATCH' });
                    }
                }
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
                    levels: updatedInfo?.levels || {},
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

            if (aiJobRes.status === 'processing') return jsonResponse({ success: false, status: 'processing', whisperAvailable: true, ...diamondInfo, ...aiJobRes }, 202);
            return jsonResponse({ success: true, ...aiJobRes.videoInfo, ...diamondInfo, timing: elapsed() }, 200, { 'Cache-Control': CACHE_CONTROL.AI });

        } catch (aiErr) {
            let errorCode = aiErr.message.split(':')[0] || 'AI_SERVICE_ERROR';
            let status = 500;
            if (errorCode === 'VIDEO_TOO_LONG' || errorCode === 'INSUFFICIENT_DIAMONDS') {
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
            }, status);
        }

    } catch (error) {
        logError('Transcript', error, { endpoint: 'onRequestPost' });
        return errorResponse(error.message);
    }
}