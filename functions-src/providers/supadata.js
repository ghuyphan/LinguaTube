/**
 * Provider for Supadata Native Caption API
 */

import { normalizeLanguageCode } from '../utils/transcript-utils.js';

const SUPADATA_API_URL = 'https://api.supadata.ai/v1/youtube/transcript';
const SUPADATA_TIMEOUT_MS = 15000; // 15 seconds to support long videos with multiple tracks

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
                const result = await this._executeFetch(videoId, lang, apiKey);
                if (result?.notFound) {
                    // Video genuinely has no captions on YouTube for any key
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

    async _executeFetch(videoId, lang, apiKey) {
        const url = new URL(SUPADATA_API_URL);
        url.searchParams.set('videoId', videoId);
        url.searchParams.set('lang', lang);
        url.searchParams.set('text', 'false');
        url.searchParams.set('mode', 'native'); // existing transcripts only

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'x-api-key': apiKey,
                'Accept': 'application/json'
            },
            signal: AbortSignal.timeout(SUPADATA_TIMEOUT_MS)
        });

        if (!response.ok) {
            if (response.status === 404) {
                // Genuine 404: YouTube video has no captions
                return { notFound: true, segments: [], availableLangs: [] };
            }
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

        if (!data.content?.length) {
            return null;
        }

        const segments = data.content.map((segment, i) => ({
            id: i,
            start: segment.offset / 1000,
            duration: segment.duration / 1000,
            text: (segment.text || '').trim()
        })).filter(s => s.text);

        if (!segments.length) return null;

        const rawDetectedLang = data.lang || lang;
        const normDetected = normalizeLanguageCode(rawDetectedLang) || rawDetectedLang;
        const normRequested = normalizeLanguageCode(lang) || lang;

        const availableLangs = Array.isArray(data.availableLangs) && data.availableLangs.length > 0
            ? data.availableLangs
            : [rawDetectedLang];

        const isExactOrFamilyMatch = (normDetected === normRequested) ||
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
