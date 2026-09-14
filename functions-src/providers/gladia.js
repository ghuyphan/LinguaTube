/**
 * Provider for Gladia AI Transcription API
 */

const GLADIA_API_URL = 'https://api.gladia.io/v2/pre-recorded';
// 28 seconds: allows Gladia ample time to negotiate YouTube audio streams within Cloudflare's ~30s wall-clock limit
const SUBMIT_TIMEOUT_MS = 28000;
// 10 seconds: fast non-blocking status check for polling
const POLL_TIMEOUT_MS = 10000;

export class GladiaProvider {
    /**
     * @param {string} apiKey 
     */
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    /**
     * Submit a Youtube video URL to Gladia for transcription
     * @param {string} youtubeUrl 
     * @returns {Promise<string>} The result URL to poll
     */
    async submitTranscriptionJob(youtubeUrl) {
        if (!this.apiKey) {
            throw new Error('Gladia API key not configured');
        }

        const submitResponse = await fetch(GLADIA_API_URL, {
            method: 'POST',
            headers: {
                'x-gladia-key': this.apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                audio_url: youtubeUrl,
                sentences: true
            }),
            signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS)
        });

        if (!submitResponse.ok) {
            const errBody = await submitResponse.text().catch(() => '');
            console.error(`[Gladia] Submit failed (${submitResponse.status}):`, errBody);
            throw new Error(`Gladia submit failed (${submitResponse.status}): ${errBody.slice(0, 150)}`);
        }

        const submitData = await submitResponse.json();

        if (!submitData.result_url) {
            throw new Error('No result_url returned from Gladia');
        }

        return submitData.result_url;
    }

    /**
     * Hit the polling URL once and return the current status
     * @param {string} resultUrl 
     * @returns {Promise<{status: 'processing' | 'done' | 'error', result?: any, error_message?: string}>}
     */
    async checkJobStatus(resultUrl) {
        // Security: Validate URL to prevent SSRF and API key leakage
        if (!resultUrl || typeof resultUrl !== 'string') {
            throw new Error('Invalid resultUrl: must be a non-empty string');
        }
        try {
            const parsed = new URL(resultUrl);
            if (parsed.protocol !== 'https:' || parsed.hostname !== 'api.gladia.io') {
                throw new Error('Invalid resultUrl host: must be api.gladia.io');
            }
            if (!/^\/v2\/(transcription|pre-recorded)(\/[a-zA-Z0-9_/-]+)?$/.test(parsed.pathname)) {
                throw new Error('Invalid resultUrl pathname format');
            }
        } catch (e) {
            throw new Error(`Invalid resultUrl: ${e.message}`);
        }

        const resultResponse = await fetch(resultUrl, {
            headers: { 'x-gladia-key': this.apiKey },
            redirect: 'error',
            signal: AbortSignal.timeout(POLL_TIMEOUT_MS)
        });

        if (!resultResponse.ok) {
            const err = new Error(`Gladia poll failed: ${resultResponse.status}`);
            err.status = resultResponse.status;
            throw err;
        }

        return await resultResponse.json();
    }
}
