import { readBoundedBody } from '../utils/response-body.js';
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
     * Submit once; recover uncertain acceptance through callbacks or metadata lookup.
     * @param {string} youtubeUrl 
     * @param {string} [callbackUrl] Optional webhook callback URL
     * @param {{jobId?: string}} options Durable correlation metadata
     * @returns {Promise<{id: string, resultUrl: string}>} The job ID and result URL
     */
    async submitTranscriptionJob(youtubeUrl, callbackUrl = null, { jobId } = {}) {
        if (!this.apiKey) throw new Error('Gladia API key not configured');
        const payload = { audio_url: youtubeUrl, sentences: true, subtitles: false,
            ...(jobId ? { custom_metadata: { voca_job_id: jobId } } : {}),
            ...(callbackUrl ? { callback: true, callback_config: { url: callbackUrl, method: 'POST' } } : {}) };
        const signal = AbortSignal.timeout(24000);
        let response;
        try {
            response = await fetch(GLADIA_API_URL, { method: 'POST',
                headers: { 'x-gladia-key': this.apiKey, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload), signal, redirect: 'manual' });
        } catch {
            const error = new Error('Gladia submission outcome is uncertain');
            error.ambiguous = true;
            throw error;
        }
        if (!response.ok) {
            void response.body?.cancel().catch(() => {});
            const error = new Error(`Gladia submit failed (${response.status})`);
            error.ambiguous = response.status >= 500 || response.status === 408;
            error.status = response.status;
            throw error;
        }
        try {
            const data = JSON.parse(new TextDecoder().decode(await readBoundedBody(response, signal, 65536)));
            const id = data.id || new URL(data.result_url).pathname.split('/').pop();
            if (!/^[a-zA-Z0-9_-]{1,200}$/.test(id)) throw new Error('Invalid provider identity');
            return { id, resultUrl: `${GLADIA_API_URL}/${id}` };
        } catch {
            const error = new Error('Gladia accepted submission but its response could not be verified');
            error.ambiguous = true;
            throw error;
        }
    }

    /** Metadata is correlation only; the provider does not deduplicate POSTs. */
    async findSubmission(jobId, { deadline = Date.now() + 5000 } = {}) {
        if (!this.apiKey) throw new Error('Gladia API key not configured');
        const url = new URL(GLADIA_API_URL);
        url.searchParams.set('custom_metadata', JSON.stringify({ voca_job_id: jobId }));
        url.searchParams.set('limit', '2');
        const signal = AbortSignal.timeout(Math.max(1, Math.min(5000, deadline - Date.now())));
        const response = await fetch(url, { headers: { 'x-gladia-key': this.apiKey }, signal, redirect: 'manual' });
        if (!response.ok) throw new Error(`Gladia recovery HTTP ${response.status}`);
        const data = JSON.parse(new TextDecoder().decode(await readBoundedBody(response, signal, 1024 * 1024)));
        if (!Array.isArray(data.items)) throw new Error('Malformed Gladia recovery response');
        // Require exactly one correlated job; ambiguous multiplicity remains an audit case.
        if (data.items.length !== 1) return null;
        const item = data.items[0];
        if (item.custom_metadata?.voca_job_id !== jobId || !/^[a-zA-Z0-9_-]{1,200}$/.test(item.id)) return null;
        return { id: item.id };
    }

    /**
     * Hit the Gladia API status endpoint by ID
     * @param {string} gladiaId 
     * @returns {Promise<{status: 'processing' | 'done' | 'error', result?: any, error_message?: string}>}
     */
    async checkJobStatusById(gladiaId, options = {}) {
        if (!gladiaId || typeof gladiaId !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(gladiaId)) {
            throw new Error('Invalid gladiaId format');
        }
        return await this.checkJobStatus(`${GLADIA_API_URL}/${gladiaId}`, options);
    }

    /**
     * Hit the polling URL once and return the current status
     * @param {string} resultUrl 
     * @returns {Promise<{status: 'processing' | 'done' | 'error', result?: any, error_message?: string}>}
     */
    async checkJobStatus(resultUrl, { deadline = Date.now() + POLL_TIMEOUT_MS } = {}) {
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

        const signal = AbortSignal.timeout(Math.max(1, Math.min(POLL_TIMEOUT_MS, deadline - Date.now())));
        const resultResponse = await fetch(resultUrl, {
            headers: { 'x-gladia-key': this.apiKey },
            redirect: 'manual',
            signal
        });

        if (resultResponse.status >= 300 && resultResponse.status < 400) {
            throw new Error(`Gladia poll unexpected redirect: ${resultResponse.status}`);
        }

        if (!resultResponse.ok) {
            const err = new Error(`Gladia poll failed: ${resultResponse.status}`);
            err.status = resultResponse.status;
            const retry = resultResponse.headers.get('Retry-After');
            const seconds = /^\d+$/.test(retry || '') ? Number(retry) : (Date.parse(retry || '') - Date.now()) / 1000;
            if (Number.isFinite(seconds)) err.retryAfterSeconds = Math.max(0, Math.min(300, Math.ceil(seconds)));
            throw err;
        }

        return JSON.parse(new TextDecoder().decode(await readBoundedBody(resultResponse, signal, 8 * 1024 * 1024)));
    }
}
