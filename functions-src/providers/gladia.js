/**
 * Provider for Gladia AI Transcription API
 */

const GLADIA_API_URL = 'https://api.gladia.io/v2/pre-recorded';
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
     * Submit a Youtube video URL to Gladia for transcription with retry budget
     * @param {string} youtubeUrl 
     * @param {string} [callbackUrl] Optional webhook callback URL
     * @param {number} maxRetries 
     * @returns {Promise<{id: string, resultUrl: string}>} The job ID and result URL
     */
    async submitTranscriptionJob(youtubeUrl, callbackUrl = null, maxRetries = 2) {
        if (!this.apiKey) {
            throw new Error('Gladia API key not configured');
        }

        const TOTAL_BUDGET_MS = 26000;
        const startTime = Date.now();
        let lastError = null;

        const bodyPayload = {
            audio_url: youtubeUrl,
            sentences: true,
            subtitles: false
        };
        if (callbackUrl) {
            bodyPayload.callback_url = callbackUrl;
        }

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            const timeRemaining = TOTAL_BUDGET_MS - (Date.now() - startTime);
            if (timeRemaining < 3000) break;

            const timeoutMs = Math.min(timeRemaining, 24000);

            try {
                const submitResponse = await fetch(GLADIA_API_URL, {
                    method: 'POST',
                    headers: {
                        'x-gladia-key': this.apiKey,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bodyPayload),
                    signal: AbortSignal.timeout(timeoutMs)
                });

                if (!submitResponse.ok) {
                    const errBody = await submitResponse.text().catch(() => '');
                    console.error(`[Gladia] Submit attempt ${attempt} failed (${submitResponse.status}):`, errBody);

                    // Non-retryable client errors (400, 401, 403, 422 except 429)
                    if (submitResponse.status >= 400 && submitResponse.status < 500 && submitResponse.status !== 429) {
                        throw new Error(`Gladia submit failed (${submitResponse.status}): ${errBody.slice(0, 150)}`);
                    }
                    throw new Error(`Gladia submit error (${submitResponse.status}): ${errBody.slice(0, 150)}`);
                }

                const submitData = await submitResponse.json();

                if (!submitData.result_url) {
                    throw new Error('No result_url returned from Gladia');
                }

                const id = submitData.id || submitData.result_url.split('/').pop();
                return {
                    id,
                    resultUrl: submitData.result_url,
                    toString() { return submitData.result_url; }
                };
            } catch (err) {
                lastError = err;
                // Don't retry non-retryable 4xx client errors
                if (err.message?.startsWith('Gladia submit failed (4')) {
                    throw err;
                }

                console.warn(`[Gladia] Submit attempt ${attempt}/${maxRetries} error: ${err.message}`);
                const remaining = TOTAL_BUDGET_MS - (Date.now() - startTime);
                if (attempt < maxRetries && remaining > 4000) {
                    await new Promise(r => setTimeout(r, 1000));
                }
            }
        }

        throw lastError || new Error('Gladia submission failed after retries');
    }

    /**
     * Hit the Gladia API status endpoint by ID
     * @param {string} gladiaId 
     * @returns {Promise<{status: 'processing' | 'done' | 'error', result?: any, error_message?: string}>}
     */
    async checkJobStatusById(gladiaId) {
        if (!gladiaId || typeof gladiaId !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(gladiaId)) {
            throw new Error('Invalid gladiaId format');
        }
        return await this.checkJobStatus(`${GLADIA_API_URL}/${gladiaId}`);
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
            redirect: 'manual',
            signal: AbortSignal.timeout(POLL_TIMEOUT_MS)
        });

        if (resultResponse.status >= 300 && resultResponse.status < 400) {
            throw new Error(`Gladia poll unexpected redirect: ${resultResponse.status}`);
        }

        if (!resultResponse.ok) {
            const err = new Error(`Gladia poll failed: ${resultResponse.status}`);
            err.status = resultResponse.status;
            throw err;
        }

        return await resultResponse.json();
    }
}
