/**
 * Provider for Supadata Native Caption API
 */

const SUPADATA_API_URL = 'https://api.supadata.ai/v1/youtube/transcript';
const SUPADATA_TIMEOUT_MS = 8000;

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
     * Fetch native captions from Supadata
     * @param {string} videoId 
     * @param {string} lang 
     * @param {Object} cache - CF KV binding or CacheManager instance
     * @returns {Promise<{segments: any[], source: string, availableLangs: string[], detectedLang: string, languageMismatch?: boolean} | null>}
     */
    async fetchCaptions(videoId, lang, cache) {
        if (this.apiKeys.length === 0) {
            return null;
        }

        // Get the next available key (round-robin with cooldown awareness)
        const apiKey = await this.apiKeyRotator.getNextApiKey(cache, 'supadata', this.apiKeys);

        if (!apiKey) {
            return null; // All keys rate limited
        }

        try {
            const result = await this._executeFetch(videoId, lang, apiKey);

            if (result && result.languageMismatch) {
                return null;
            }

            if (result) return result;
        } catch (e) {
            // If rate limited, mark this key for cooldown and try another
            if (e.message?.includes('429') || e.message?.includes('rate')) {
                await this.apiKeyRotator.markKeyRateLimited(cache, 'supadata', apiKey);

                // Try with next available key if we have more
                if (this.apiKeys.length > 1) {
                    const nextKey = await this.apiKeyRotator.getNextApiKey(cache, 'supadata', this.apiKeys);
                    if (nextKey && nextKey !== apiKey) {
                        try {
                            const retryResult = await this._executeFetch(videoId, lang, nextKey);
                            if (retryResult && !retryResult.languageMismatch) {
                                return retryResult;
                            }
                        } catch (retryError) {
                            // Retry failed
                        }
                    }
                }
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
            if (response.status === 429) {
                throw new Error(`429 Rate limited`);
            }
            if (response.status === 404) {
                // Wait for CacheManager logic in service layer to cache negative result
            }
            return null;
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

        const detectedLang = data.lang || lang;

        if (detectedLang !== lang) {
            return {
                segments: [],
                source: 'supadata',
                availableLangs: data.availableLangs || [detectedLang],
                detectedLang,
                languageMismatch: true
            };
        }

        return {
            segments: segments, // Assumes mapping cleanTranscriptSegments happens in service layer
            source: 'supadata',
            availableLangs: data.availableLangs || [detectedLang],
            detectedLang
        };
    }
}
