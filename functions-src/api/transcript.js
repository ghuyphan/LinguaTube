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
    jsonResponse, handleOptions, errorResponse, logError, sanitizeVideoId
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
import { normalizeLanguageCode } from '../utils/transcript-utils.js';
import { estimateTranscriptLevel } from '../utils/level-estimator.js';

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

export function onRequestOptions() { return handleOptions(['GET', 'POST', 'OPTIONS']); }

export async function onRequestGet(context) {
    const { env } = context;
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
    const { request, env } = context;
    const waitUntil = context.waitUntil?.bind(context);
    const elapsed = timer();

    try {
        const body = await request.json();
        if (!body || typeof body !== 'object' || Array.isArray(body) ||
            ['preferAI', 'forceRefresh'].some(key => body[key] != null && typeof body[key] !== 'boolean') ||
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
        const clientId = getClientIdentifier(request, authResult);
        const tier = authResult.valid ? getUserTier(authResult.user) : 'anonymous';

        // Setup Services
        const db = env.VOCAB_DB;
        const r2 = env.TRANSCRIPT_STORAGE;
        const cache = env.TRANSCRIPT_CACHE;
        const _cacheManager = new CacheManager(cache);

        // Rate Limiting (enforced on ALL operations including AI polling and creation)
        const rateLimitConfig = getTieredConfig(isPolling ? POLL_RATE_LIMIT : TRANSCRIPT_RATE_LIMIT, tier);
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
                    const targetNormLang = (lang || '').split('-')[0].toLowerCase();
                    if (waitUntil && !cached.segments.every(s => s.tokens?.length)) waitUntil(enrichPublishedTranscript(r2, cleanVideoId, lang));

                    const responseLevels = { ...(knownInfo?.levels || {}) };
                    const existingLvl = responseLevels[targetNormLang];
                    const needsLvlRecalc = !existingLvl || existingLvl.method === 'server_heuristic' || existingLvl.method === 'metadata';
                    if (needsLvlRecalc && cached.segments?.length > 0) {
                        const estimated = estimateTranscriptLevel(cached.segments, targetNormLang, { title: body.title, channel: body.channel });
                        if (estimated) {
                            responseLevels[targetNormLang] = estimated;
                            if (waitUntil && db) {
                                waitUntil(saveVideoLevel(db, null, cleanVideoId, targetNormLang, estimated.level, estimated.confidence, estimated.method, { ...estimated, forceUpdate: true }).catch(() => {}));
                            }
                        }
                    }

                    // Self-healing: if video_languages in D1 lacks duration, backfill it from cached segments
                    if ((!knownInfo?.durationSeconds || knownInfo.durationSeconds === 0) && cached.segments?.length > 0 && waitUntil && db) {
                        const lastCue = cached.segments[cached.segments.length - 1];
                        const inferredSec = Math.round((lastCue.start || 0) + (lastCue.duration || 0));
                        if (inferredSec > 0) {
                            waitUntil(
                                db.prepare('UPDATE video_languages SET duration_seconds = ?, updated_at = strftime("%s", "now") WHERE video_id = ? AND (duration_seconds IS NULL OR duration_seconds = 0)')
                                    .bind(inferredSec, cleanVideoId)
                                    .run()
                                    .catch(() => {})
                            );
                        }
                    }

                    return jsonResponse({
                        success: true, videoId: cleanVideoId, language: lang, requestedLanguage: lang, segments: cached.segments,
                        source: 'ai', sourceDetail: cached.source, availableLanguages, subLanguages: knownInfo?.subLanguages || [lang], whisperAvailable: diamondInfo.diamonds > 0,
                        languageMismatch: false,
                        levels: responseLevels,
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

                    const targetNormLang = (normRes || responseLang || '').split('-')[0].toLowerCase();
                    if (waitUntil && !cached.segments.every(s => s.tokens?.length)) waitUntil(enrichPublishedTranscript(r2, cleanVideoId, responseLang));

                    const responseLevels = { ...(knownInfo?.levels || {}) };
                    const existingLvl = responseLevels[targetNormLang];
                    const needsLvlRecalc = !existingLvl || existingLvl.method === 'server_heuristic' || existingLvl.method === 'metadata';
                    if (needsLvlRecalc && cached.segments?.length > 0) {
                        const estimated = estimateTranscriptLevel(cached.segments, targetNormLang, { title: body.title, channel: body.channel });
                        if (estimated) {
                            responseLevels[targetNormLang] = estimated;
                            if (waitUntil && db) {
                                waitUntil(saveVideoLevel(db, null, cleanVideoId, targetNormLang, estimated.level, estimated.confidence, estimated.method, { ...estimated, forceUpdate: true }).catch(() => {}));
                            }
                        }
                    }

                    // Self-healing: if video_languages in D1 lacks duration, backfill it from cached segments
                    if ((!knownInfo?.durationSeconds || knownInfo.durationSeconds === 0) && cached.segments?.length > 0 && waitUntil && db) {
                        const lastCue = cached.segments[cached.segments.length - 1];
                        const inferredSec = Math.round((lastCue.start || 0) + (lastCue.duration || 0));
                        if (inferredSec > 0) {
                            waitUntil(
                                db.prepare('UPDATE video_languages SET duration_seconds = ?, updated_at = strftime("%s", "now") WHERE video_id = ? AND (duration_seconds IS NULL OR duration_seconds = 0)')
                                    .bind(inferredSec, cleanVideoId)
                                    .run()
                                    .catch(() => {})
                            );
                        }
                    }

                    return jsonResponse({
                        success: true, videoId: cleanVideoId, language: responseLang, requestedLanguage: lang, segments: cached.segments,
                        source: 'cache', sourceDetail: cached.source, availableLanguages, subLanguages: knownInfo?.subLanguages || [responseLang], whisperAvailable: diamondInfo.diamonds > 0,
                        languageMismatch: isMismatch,
                        levels: responseLevels,
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
                await deleteNoTranscript(db, cleanVideoId, lang, 'native');
            } else {
                // 1. Negative cache hit (specific lang or global '*')
                if (await isNoTranscript(db, cache, cleanVideoId, lang, 'native')) {
                    return jsonResponse({
                        success: false, videoId: cleanVideoId, requestedLanguage: lang, segments: [], source: 'none',
                        errorCode: 'NO_NATIVE', error: 'No native captions.', availableLanguages, whisperAvailable: diamondStatus.diamonds > 0,
                        ...diamondInfo, timing: elapsed()
                    }, 200, { 'X-Cache': 'NEG' });
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
            return jsonResponse({ success: true, ...aiJobRes.videoInfo, ...diamondInfo, timing: elapsed() }, 200, { 'Cache-Control': CACHE_CONTROL.AI });

        } catch (aiErr) {
            let errorCode = aiErr.message.split(':')[0] || 'AI_SERVICE_ERROR';
            let status = 500;
            if (errorCode === 'VIDEO_TOO_LONG' || errorCode === 'INSUFFICIENT_DIAMONDS' || errorCode === 'VIDEO_DURATION_UNAVAILABLE' || errorCode === 'LIVESTREAM_NOT_SUPPORTED') {
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
