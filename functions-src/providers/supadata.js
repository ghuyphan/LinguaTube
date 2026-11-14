/**
 * Provider for Supadata Native Caption API
 */

import { cleanCueText, contradictsNativeLanguage, normalizeLanguageCode } from '../utils/transcript-utils.js';
import { readBoundedBody, requestSignal } from '../utils/response-body.js';

const SUPADATA_API_URL = 'https://api.supadata.ai/v1/transcript';
const SUPADATA_TIMEOUT_MS = 4000; // 4 seconds is plenty for native caption availability checks
const NATIVE_LOOKUP_BUDGET_MS = 6000;
const MAX_TRANSCRIPT_BYTES = 8 * 1024 * 1024;
const MAX_ERROR_BYTES = 16 * 1024;
const MAX_TRANSCRIPT_CUES = 20000;

export class SupadataProvider {
    /**
     * @param {string[]} apiKeys - Array of available Supadata API keys
     * @param {Object} apiKeyRotator - Utility object to get next key
     */
    constructor(apiKeys, apiKeyRotator) {
        this.apiKeys = apiKeys.filter(Boolean);
        this.apiKeyRotator = apiKeyRotator;
    }

    /**
     * Fetch native captions from Supadata with optimized round-robin and multi-key failover
     * @param {string} videoId 
     * @param {string} lang 
     * @param {Object} cache - CF KV binding or CacheManager instance
     * @param {boolean} retryTimeout - Whether a slow lookup should try another key
     * @returns {Promise<{segments: {id: number, start: number, duration: number, text: string}[], source?: string, availableLangs: string[], detectedLang?: string, trackLanguage?: string, languageMismatch?: boolean, notFound?: boolean, unavailable?: boolean} | null>}
     */
    async fetchCaptions(videoId, lang, cache, retryTimeout = true) {
        if (this.apiKeys.length === 0) {
            return null;
        }

        const attemptedKeys = [];
        const maxAttempts = this.apiKeys.length;
        const deadline = Date.now() + (retryTimeout ? NATIVE_LOOKUP_BUDGET_MS : SUPADATA_TIMEOUT_MS);

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            // Get the next unattempted key (round-robin with cooldown awareness)
            const apiKey = await this.apiKeyRotator.getNextApiKey(cache, 'supadata', this.apiKeys, attemptedKeys);
            if (!apiKey || Date.now() >= deadline) break;
            attemptedKeys.push(apiKey);

            try {
                const result = await this._executeFetch(videoId, lang, apiKey, deadline);
                if (result?.notFound || result?.segments?.length || result?.unavailable) return result;
            } catch (e) {
                const errMsg = e.message || '';
                const is429 = errMsg.includes('429') || errMsg.includes('rate');
                const is402 = errMsg.includes('402') || errMsg.includes('quota') || errMsg.includes('credit');
                const is401 = errMsg.includes('401') || errMsg.includes('unauthorized');
                const isTimeout = e.name === 'TimeoutError' || e.name === 'AbortError' || errMsg.includes('timeout');

                if (is402 || is401) {
                    // Out of credits or invalid key -> 1 hour cooldown
                    await this.apiKeyRotator.markKeyRateLimited(cache, 'supadata', apiKey, 3600);
                } else if (is429) {
                    // Rate limited -> 5 minutes cooldown
                    await this.apiKeyRotator.markKeyRateLimited(cache, 'supadata', apiKey, 300);
                } else if (isTimeout) {
                    // Timeout -> 60 seconds cooldown to allow failover to alternative key
                    await this.apiKeyRotator.markKeyRateLimited(cache, 'supadata', apiKey, 60);
                    // On timeout, cap failover to prevent worker execution timeouts, but NEVER return notFound: true
                    if (!retryTimeout || attempt >= 1) {
                        return null;
                    }
                }
                // Try next unattempted key in subsequent loop iteration
            }
        }

        return null;
    }

    async _executeFetch(videoId, lang, apiKey, deadline) {
        const url = new URL(SUPADATA_API_URL);
        const videoUrl = new URL('https://www.youtube.com/watch');
        videoUrl.searchParams.set('v', videoId);
        url.searchParams.set('url', videoUrl.href);
        if (lang) {
            url.searchParams.set('lang', lang);
        }
        url.searchParams.set('text', 'false');
        url.searchParams.set('mode', 'native');

        const signal = requestSignal(deadline, SUPADATA_TIMEOUT_MS);
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
            if (response.status === 429) {
                throw new Error('429 Rate limited');
            }
            if (response.status === 402) {
                throw new Error('402 Quota exceeded');
            }
            if (response.status === 401) {
                throw new Error('401 Unauthorized');
            }
            if (response.status >= 500) {
                throw new Error(`${response.status} Upstream server error`);
            }
            throw new Error(`HTTP ${response.status}`);
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
            return { unavailable: true, segments: [], availableLangs: [] };
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
