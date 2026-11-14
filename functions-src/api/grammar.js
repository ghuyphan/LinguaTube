/**
 * Shared Grammar Pack & Lookup API (Cloudflare Pages Function)
 * Endpoint: GET /api/grammar
 *
 * Serves both Web (Angular) and Mobile (Flutter) clients from a single source of truth
 * (R2 `grammar/` override -> static Pages `ASSETS` -> Node fs dev fallback).
 * Zero KV writes on every request; uses warm-isolate memory + Edge CDN caching (`s-maxage=604800`).
 *
 * Query parameters:
 * - (none) or ?type=manifest               -> Grammar manifest JSON (counts, supported languages)
 * - ?lang=vi[&type=patterns]               -> Array of GrammarPattern for `lang`
 * - ?lang=vi&ui=ja[&type=translations]     -> Record<patternId, GrammarTranslation>
 * - ?lang=vi&ui=ja&type=all                -> { language, ui, patterns, translations }
 * - ?lang=vi&id=vi_b1_01[&ui=ja]           -> Single localized GrammarPattern (404 if missing)
 */

import { validateAuthToken } from '../middlewares/auth.js';
import {
    consumeRateLimit,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders
} from '../middlewares/rate-limiter.js';
import {
    jsonResponse,
    handleOptions,
    sanitizeLanguage,
    SUPPORTED_LEARNING_LANGUAGE_SET
} from '../utils/utils.js';
import {
    GRAMMAR_UI_LANGUAGES,
    loadGrammarManifest,
    loadGrammarPatterns,
    loadGrammarTranslations,
    mergePatternWithTranslation
} from '../data/grammar-store.js';

const RATE_LIMIT_CONFIG = { max: 120, windowSeconds: 3600, keyPrefix: 'grammar' };
const VALID_TYPES = new Set(['manifest', 'patterns', 'translations', 'all', 'pattern']);
const SAFE_ID_RE = /^[a-z0-9_.-]{1,80}$/i;
const PUBLIC_CACHE_HEADERS = {
    'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
};

function resolveRequestType(rawType, rawLang, rawUi, rawId) {
    if (rawType) return rawType.toLowerCase();
    if (rawId) return 'pattern';
    if (!rawLang) return 'manifest';
    if (rawUi) return 'translations';
    return 'patterns';
}

export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);

    const rawLang = url.searchParams.get('lang');
    const rawUi = url.searchParams.get('ui');
    const rawId = (url.searchParams.get('id') || '').trim();
    const rawType = (url.searchParams.get('type') || '').trim();

    const type = resolveRequestType(rawType, rawLang, rawUi, rawId);
    if (!VALID_TYPES.has(type)) {
        return jsonResponse({ error: 'Invalid query parameter: type' }, 400, {}, request);
    }

    const lang = rawLang ? sanitizeLanguage(rawLang, SUPPORTED_LEARNING_LANGUAGE_SET) : null;
    const ui = rawUi ? sanitizeLanguage(rawUi, GRAMMAR_UI_LANGUAGES) : 'en';

    if (type !== 'manifest' && !lang) {
        return jsonResponse({ error: 'Missing or unsupported learning language parameter: lang' }, 400, {}, request);
    }
    if ((type === 'translations' || type === 'all' || type === 'pattern') && !ui) {
        return jsonResponse({ error: 'Unsupported UI language parameter: ui' }, 400, {}, request);
    }
    if (type === 'pattern' && (!rawId || !SAFE_ID_RE.test(rawId))) {
        return jsonResponse({ error: 'Missing or invalid grammar pattern parameter: id' }, 400, {}, request);
    }

    const authResult = await validateAuthToken(request, env);
    if (authResult.response) return authResult.response;

    // Resolve artifact before consuming rate limit when served from warm isolate memory,
    // or charge one lightweight read unit on cold miss (still 0 KV writes below threshold).
    let payload = null;
    let cacheHit = false;

    if (type === 'manifest') {
        const res = await loadGrammarManifest(env, request.url);
        if (res) {
            payload = res.data;
            cacheHit = res.cacheHit;
        }
    } else if (type === 'patterns') {
        const res = await loadGrammarPatterns(env, lang, request.url);
        if (res) {
            payload = res.data;
            cacheHit = res.cacheHit;
        }
    } else if (type === 'translations') {
        const res = await loadGrammarTranslations(env, lang, ui, request.url);
        if (res) {
            payload = res.data;
            cacheHit = res.cacheHit;
        }
    } else if (type === 'all') {
        const [patternsRes, translationsRes] = await Promise.all([
            loadGrammarPatterns(env, lang, request.url),
            loadGrammarTranslations(env, lang, ui, request.url)
        ]);
        if (patternsRes) {
            payload = {
                language: lang,
                ui,
                patterns: patternsRes.data,
                translations: translationsRes?.data || {}
            };
            cacheHit = patternsRes.cacheHit && (!translationsRes || translationsRes.cacheHit);
        }
    } else if (type === 'pattern') {
        const [patternsRes, translationsRes] = await Promise.all([
            loadGrammarPatterns(env, lang, request.url),
            ui === 'en' ? null : loadGrammarTranslations(env, lang, ui, request.url)
        ]);
        if (patternsRes && Array.isArray(patternsRes.data)) {
            const found = patternsRes.data.find(p => p?.id === rawId);
            if (!found) {
                return jsonResponse({ error: 'Grammar pattern not found' }, 404, { 'Cache-Control': 'no-store' }, request);
            }
            const translation = translationsRes?.data?.[rawId];
            payload = mergePatternWithTranslation(found, translation);
            cacheHit = patternsRes.cacheHit && (!translationsRes || translationsRes.cacheHit);
        }
    }

    if (payload === null) {
        return jsonResponse({ error: 'Grammar pack unavailable' }, 404, { 'Cache-Control': 'no-store' }, request);
    }

    if (cacheHit) {
        return jsonResponse(payload, 200, {
            ...PUBLIC_CACHE_HEADERS,
            'X-Cache': 'HIT-MEMORY'
        }, request);
    }

    const clientId = getClientIdentifier(request, authResult);
    const rateCheck = await consumeRateLimit(env?.TRANSCRIPT_CACHE, clientId, RATE_LIMIT_CONFIG, context);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    return jsonResponse(payload, 200, {
        ...PUBLIC_CACHE_HEADERS,
        ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt, RATE_LIMIT_CONFIG.max),
        'X-Cache': 'MISS'
    }, request);
}

export async function onRequestOptions({ request }) {
    return handleOptions(['GET', 'OPTIONS'], request);
}
