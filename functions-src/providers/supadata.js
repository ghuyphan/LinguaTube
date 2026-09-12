/**
 * Provider for Supadata Native Caption API
 */

import { normalizeLanguageCode } from '../utils/transcript-utils.js';

const SUPADATA_API_URL = 'https://api.supadata.ai/v1/youtube/transcript';
const SUPADATA_TIMEOUT_MS = 7000; // 7 seconds is plenty for native caption availability checks

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
     * @returns {Promise<{segments: any[], source: string, availableLangs: string[], detectedLang: string, languageMismatch?: boolean, notFound?: boolean} | null>}
     */
    async fetchCaptions(videoId, lang, cache) {
        if (this.apiKeys.length === 0) {
            return null;
        }

        const attemptedKeys = [];
        const maxAttempts = this.apiKeys.length;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            // Get the next unattempted key (round-robin with cooldown awareness)
            const apiKey = await this.apiKeyRotator.getNextApiKey(cache, 'supadata', this.apiKeys, attemptedKeys);
            if (!apiKey) break;
            attemptedKeys.push(apiKey);

            try {
                const result = await this._executeFetch(videoId, lang, apiKey, 'native');
                if (result?.notFound) {
                    // Video genuinely has no captions on YouTube - do NOT retry other keys
                    return { notFound: true, segments: [], availableLangs: [] };
                }
                if (result?.segments?.length > 0) {
                    return result;
                }
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
                }
                // Try next unattempted key in subsequent loop iteration
            }
        }

        return null;
    }

    async _executeFetch(videoId, lang, apiKey, mode = 'native') {
        const url = new URL(SUPADATA_API_URL);
        url.searchParams.set('videoId', videoId);
        if (lang) {
            url.searchParams.set('lang', lang);
        }
        url.searchParams.set('text', 'false');
        url.searchParams.set('mode', mode);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
                'Accept': 'application/json'
            },
            signal: AbortSignal.timeout(mode === 'generate' ? 25000 : SUPADATA_TIMEOUT_MS)
        });

        // Supadata returns HTTP 206 (Partial Content) or 404 when no transcript exists for the video
        if (response.status === 206 || response.status === 404) {
            return { notFound: true, segments: [], availableLangs: [] };
        }

        if (!response.ok) {
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

        const data = await response.json();

        // Check error payload in body (Supadata errors format)
        if (data.error === 'transcript-unavailable' || data.error === 'not-found') {
            return { notFound: true, segments: [], availableLangs: [] };
        }

        if (!data.content?.length) {
            return { notFound: true, segments: [], availableLangs: [] };
        }

        const segments = data.content.map((segment, i) => ({
            id: i,
            start: segment.offset / 1000,
            duration: segment.duration / 1000,
            text: (segment.text || '').trim()
        })).filter(s => s.text);

        if (!segments.length) {
            return { notFound: true, segments: [], availableLangs: [] };
        }

        const rawDetectedLang = data.lang || lang;
        const normDetected = normalizeLanguageCode(rawDetectedLang) || rawDetectedLang;
        const normRequested = normalizeLanguageCode(lang) || lang;

        const availableLangs = Array.isArray(data.availableLangs) && data.availableLangs.length > 0
            ? data.availableLangs
            : [rawDetectedLang];

        const isExactOrFamilyMatch = !normRequested ||
            (normDetected === normRequested) ||
            rawDetectedLang.toLowerCase().startsWith(normRequested.toLowerCase()) ||
            normDetected.startsWith(normRequested);

        if (!isExactOrFamilyMatch) {
            return {
                segments,
                source: 'supadata',
                availableLangs,
                detectedLang: normDetected,
                languageMismatch: true
            };
        }

        return {
            segments,
            source: 'supadata',
            availableLangs,
            detectedLang: normDetected
        };
    }
}
