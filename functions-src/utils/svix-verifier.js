/**
 * Svix Webhook Signature Verifier and Derived Token Utilities
 * Uses Web Crypto API (supported natively in Cloudflare Workers and Node 18+)
 */

/**
 * Verify Svix HMAC-SHA256 signature headers from Gladia
 * @param {string} rawBody - Raw unparsed HTTP body string
 * @param {Headers|object} headers - Request headers or header object
 * @param {string} secretKey - Svix signing secret (e.g. whsec_...)
 * @returns {Promise<{ valid: boolean, reason?: string }>}
 */
export async function verifySvixSignature(rawBody, headers, secretKey) {
    if (!secretKey) return { valid: false, reason: 'Missing secret key' };
    if (!rawBody) return { valid: false, reason: 'Missing body' };

    const getHeader = (name) => {
        if (!headers) return null;
        if (typeof headers.get === 'function') return headers.get(name);
        return headers[name] || headers[name.toLowerCase()] || null;
    };

    const svixId = getHeader('svix-id') || getHeader('webhook-id') || headers?.id;
    const svixTimestamp = getHeader('svix-timestamp') || getHeader('webhook-timestamp') || headers?.timestamp;
    const svixSignature = getHeader('svix-signature') || getHeader('webhook-signature') || headers?.signature;

    if (!svixId || !svixTimestamp || !svixSignature) {
        return { valid: false, reason: 'Missing required Svix headers (id, timestamp, or signature)' };
    }

    // 1. Replay attack mitigation: ensure timestamp is within 5 minutes (300 seconds)
    const timestampSec = parseInt(svixTimestamp, 10);
    const currentSec = Math.floor(Date.now() / 1000);
    if (isNaN(timestampSec) || Math.abs(currentSec - timestampSec) > 300) {
        return { valid: false, reason: 'Timestamp outside tolerance window' };
    }

    // 2. Format content to sign: "${id}.${timestamp}.${rawBody}"
    const toSign = `${svixId}.${svixTimestamp}.${rawBody}`;
    const encoder = new TextEncoder();
    const toSignBytes = encoder.encode(toSign);

    // 3. Decode secret (strip "whsec_" prefix if present, then base64-decode)
    const cleanSecret = secretKey.startsWith('whsec_') ? secretKey.slice(6) : secretKey;
    let keyBytes;
    try {
        const binString = atob(cleanSecret);
        keyBytes = Uint8Array.from(binString, c => c.charCodeAt(0));
    } catch {
        // Fallback: use raw bytes if not base64
        keyBytes = encoder.encode(secretKey);
    }

    // 4. Import HMAC-SHA256 key
    let cryptoKey;
    try {
        cryptoKey = await crypto.subtle.importKey(
            'raw',
            keyBytes,
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['verify']
        );
    } catch (err) {
        return { valid: false, reason: `Failed to import key: ${err.message}` };
    }

    // 5. Verify against signature headers (space-delimited list of "v1,<base64>")
    const signatures = svixSignature.split(' ');
    for (const sig of signatures) {
        const [version, signatureBase64] = sig.split(',');
        if (version !== 'v1' || !signatureBase64) continue;

        try {
            const sigBinString = atob(signatureBase64);
            const sigBytes = Uint8Array.from(sigBinString, c => c.charCodeAt(0));
            const isValid = await crypto.subtle.verify('HMAC', cryptoKey, sigBytes, toSignBytes);
            if (isValid) {
                return { valid: true };
            }
        } catch {
            continue;
        }
    }

    return { valid: false, reason: 'Signature mismatch' };
}

/**
 * Generate a derived HMAC-SHA256 token for webhook URL query parameter fallback.
 * Allows zero-downtime out-of-the-box operation without requiring external dashboard setup.
 * @param {string} secretKey - Secret key (e.g. GLADIA_API_KEY)
 * @param {string} jobId - Internal job ID
 * @param {string} videoId - YouTube video ID
 * @param {string} lang - Requested language
 * @returns {Promise<string>} Hex-encoded HMAC token
 */
export async function generateDerivedWebhookToken(secretKey, jobId, videoId, lang) {
    if (!secretKey) return '';
    const encoder = new TextEncoder();
    const message = `${jobId}:${videoId}:${lang}`;
    const keyData = encoder.encode(secretKey);
    const msgData = encoder.encode(message);

    const key = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, msgData);
    return Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

/**
 * Constant-time verification of derived webhook token
 * Supports both signatures: (secretKey, jobId, videoId, lang, token) and (token, secretKey, jobId, videoId, lang)
 */
export async function verifyDerivedWebhookToken(arg1, arg2, arg3, arg4, arg5) {
    let secretKey, jobId, videoId, lang, token;
    if (typeof arg5 === 'string') {
        secretKey = arg1;
        jobId = arg2;
        videoId = arg3;
        lang = arg4;
        token = arg5;
    } else {
        token = arg1;
        secretKey = arg2;
        jobId = arg3;
        videoId = arg4;
        lang = arg5;
    }

    if (!token || !secretKey || !jobId) return false;
    const expected = await generateDerivedWebhookToken(secretKey, jobId, videoId, lang);
    if (!expected || expected.length !== token.length) return false;

    let diff = 0;
    for (let i = 0; i < expected.length; i++) {
        diff |= expected.charCodeAt(i) ^ token.charCodeAt(i);
    }
    return diff === 0;
}

