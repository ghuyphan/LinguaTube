/**
 * Provider for Supadata Native Caption API
 */

import { cleanCueText, contradictsNativeLanguage, normalizeLanguageCode } from '../utils/transcript-utils.js';
import { readBoundedBody, requestSignal } from '../utils/response-body.js';

const SUPADATA_API_URL = 'https://api.supadata.ai/v1/transcript';
const SAVED_TRACK_TIMEOUT_MS = 4000;
const NATIVE_ATTEMPT_TIMEOUT_MS = 7000;
const NATIVE_LOOKUP_BUDGET_MS = 14500;
const MAX_TRANSCRIPT_BYTES = 8 * 1024 * 1024;
const MAX_ERROR_BYTES = 16 * 1024;
const MAX_TRANSCRIPT_CUES = 20000;

/**
 * Resolve all configured Supadata API keys from environment bindings.
 * Supports `SUPADATA_API_KEY`, numbered `SUPADATA_API_KEY_<N>` (e.g., _2, _3, _4...),
 * and comma/whitespace/semicolon-delimited `SUPADATA_API_KEYS`.
 *
 * @param {Object} env
 * @returns {string[]} Deduplicated non-empty keys in priority order
 */
export function resolveSupadataApiKeys(env) {
    if (!env || typeof env !== 'object') return [];

    const numberedKeys = Object.keys(env)
        .map(name => {
            const match = /^SUPADATA_API_KEY_(\d+)$/.exec(name);
            return match ? { name, index: Number(match[1]) } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.index - b.index)
        .map(entry => env[entry.name]);

    const listRaw = env.SUPADATA_API_KEYS;
    const listKeys = Array.isArray(listRaw)
        ? listRaw
        : typeof listRaw === 'string'
            ? listRaw.split(/[\s,;]+/)
            : [];

    const seen = new Set();
    const keys = [];
    for (const raw of [env.SUPADATA_API_KEY, ...numberedKeys, ...listKeys]) {
        const key = typeof raw === 'string' ? raw.trim() : '';
        if (key && !seen.has(key)) {
            seen.add(key);
            keys.push(key);
        }
    }
    return keys;
}

export class SupadataProvider {
    /**
     * @param {string[]} apiKeys - Array of available Supadata API keys
     * @param {Object} apiKeyRotator - Utility object to get next key
     */
    constructor(apiKeys, apiKeyRotator) {
        const seen = new Set();
        this.apiKeys = [];
        for (const raw of (Array.isArray(apiKeys) ? apiKeys : [])) {
            const key = typeof raw === 'string' ? raw.trim() : '';
            if (key && !seen.has(key)) {
                seen.add(key);
                this.apiKeys.push(key);
            }
        }
        this.apiKeyRotator = apiKeyRotator;
    }

    /**
     * Fetch native captions from Supadata with optimized round-robin and multi-key failover
     * @param {string} videoId 
     * @param {string} lang 
     * @param {Object} cache - CF KV binding or CacheManager instance
     * @param {boolean} retryTimeout - Whether to allow a second transient attempt before falling back
     * @returns {Promise<{segments: {id: number, start: number, duration: number, text: string}[], source?: string, availableLangs: string[], detectedLang?: string, trackLanguage?: string, languageMismatch?: boolean, notFound?: boolean, unavailable?: boolean} | null>}
     */
    async fetchCaptions(videoId, lang, cache, retryTimeout = true) {
        const startedAt = Date.now();
        const attemptTimeout = retryTimeout ? NATIVE_ATTEMPT_TIMEOUT_MS : SAVED_TRACK_TIMEOUT_MS;
        const deadline = startedAt + (retryTimeout ? NATIVE_LOOKUP_BUDGET_MS : attemptTimeout);
        const attemptedKeys = [];
        const failures = [];
        let retryKey;
        while (Date.now() < deadline) {
            const nextKey = await this.apiKeyRotator.getNextApiKey(cache, 'supadata', this.apiKeys, attemptedKeys);
            const apiKey = nextKey || retryKey;
            if (!apiKey || Date.now() >= deadline) break;
            retryKey = undefined;
            attemptedKeys.push(apiKey);

            const attemptStartedAt = Date.now();
            try {
                const result = await this._executeFetch(videoId, lang, apiKey, deadline, attemptTimeout);
                if (result?.notFound || result?.segments?.length) {
                    if (failures.length || Date.now() - attemptStartedAt >= SAVED_TRACK_TIMEOUT_MS) {
                        this._logLookup(videoId, lang, startedAt, failures, result.notFound ? 'not_found' : 'found');
                    }
                    return result;
                }
                failures.push({ reason: result?.reason || 'unusable_payload', elapsedMs: Date.now() - attemptStartedAt });
                this._logLookup(videoId, lang, startedAt, failures, 'unavailable');
                return result;
            } catch (e) {
                const status = e.status;
                const timeout = e.name === 'TimeoutError' || e.name === 'AbortError';
                const reason = status ? 'http' : timeout ? 'timeout' : e instanceof SyntaxError ? 'invalid_json' : 'transport';
                failures.push({ reason, status, elapsedMs: Date.now() - attemptStartedAt });
                const cooldown = status === 401 || status === 402 ? 3600 : status === 429 ? 300 : 0;
                if (cooldown) {
                    await this.apiKeyRotator.markKeyRateLimited(cache, 'supadata', apiKey, cooldown);
                    continue;
                }
                // A slow video is not a key failure. Try another key if available,
                // or retry the same key once for timeout, transport or upstream 5xx.
                if (!retryTimeout || attemptedKeys.length >= 2 ||
                    !(timeout || reason === 'transport' || status >= 500)) break;
                retryKey = apiKey;
            }
        }

        this._logLookup(videoId, lang, startedAt, failures, 'unavailable');
        return null;
    }

    _logLookup(videoId, lang, startedAt, failures, outcome) {
        console.info(JSON.stringify({
            event: 'native_caption_lookup', videoId, language: lang, outcome,
            elapsedMs: Date.now() - startedAt, failures,
            ...(this.apiKeys.length === 0 ? { reason: 'unconfigured' } : {})
        }));
    }

    async _executeFetch(videoId, lang, apiKey, deadline, timeoutMs) {
        const url = new URL(SUPADATA_API_URL);
        const videoUrl = new URL('https://www.youtube.com/watch');
        videoUrl.searchParams.set('v', videoId);
        url.searchParams.set('url', videoUrl.href);
        if (lang) {
            url.searchParams.set('lang', lang);
        }
        url.searchParams.set('text', 'false');
        url.searchParams.set('mode', 'native');

        const signal = requestSignal(deadline, timeoutMs);
        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
                'Accept': 'application/json'
            },
            signal
        });

        // Supadata documents 206 as Transcript Unavailable.
        if (response.status === 206) {
            await response.body?.cancel().catch(() => {});
            return { notFound: true, segments: [], availableLangs: [] };
        }

        if (response.status !== 200 && response.status !== 404) {
            await response.body?.cancel().catch(() => {});
            throw Object.assign(new Error('Supadata transcript request failed'), { status: response.status });
        }

        const maxBytes = response.status === 404 ? MAX_ERROR_BYTES : MAX_TRANSCRIPT_BYTES;
        const data = JSON.parse(new TextDecoder().decode(await readBoundedBody(response, signal, maxBytes)));
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            return { unavailable: true, segments: [], availableLangs: [] };
        }

        // Check error payload in body (Supadata errors format)
        if (data.error === 'transcript-unavailable') {
            return { notFound: true, segments: [], availableLangs: [] };
        }
        if (response.status === 404 || data.error) {
            return { unavailable: true, segments: [], availableLangs: [],
                reason: response.status === 404 ? 'not_found' : 'provider_error' };
        }

        const rawDetectedLang = typeof data.lang === 'string' ? data.lang.trim() : '';
        const normDetected = normalizeLanguageCode(rawDetectedLang);
        const normRequested = normalizeLanguageCode(lang);
        const availableLangs = Array.isArray(data.availableLangs)
            ? data.availableLangs.filter(l => typeof l === 'string' && /^[a-z]{2,8}(?:[-_][a-z0-9]{1,8})*$/i.test(l))
            : [];
        const unavailable = () => ({
            unavailable: true, segments: [], availableLangs,
            languageMismatch: Boolean(normRequested && availableLangs.length &&
                !availableLangs.some(l => normalizeLanguageCode(l) === normRequested))
        });

        if (!Array.isArray(data.content) || data.content.length > MAX_TRANSCRIPT_CUES || !normDetected ||
            !/^[a-z]{2,8}(?:[-_][a-z0-9]{1,8})*$/i.test(rawDetectedLang)) return unavailable();

        const segments = [];
        for (const segment of data.content) {
            if (!Number.isFinite(segment?.offset) || segment.offset < 0 ||
                !Number.isFinite(segment.duration) || segment.duration < 0 ||
                !/[\p{L}\p{N}]/u.test(cleanCueText(segment.text))) continue;
            segments.push({
                id: segments.length,
                start: segment.offset / 1000,
                duration: segment.duration / 1000,
                text: segment.text.trim()
            });
        }

        if (!segments.length) return unavailable();
        if (contradictsNativeLanguage(segments, normDetected)) {
            console.warn(JSON.stringify({
                event: 'native_transcript_language_rejected', videoId,
                requestedLanguage: normRequested, reportedLanguage: normDetected
            }));
            return unavailable();
        }

        return {
            segments,
            source: 'supadata',
            availableLangs: availableLangs.length ? availableLangs : [rawDetectedLang],
            detectedLang: normDetected,
            trackLanguage: rawDetectedLang
        };
    }
}
