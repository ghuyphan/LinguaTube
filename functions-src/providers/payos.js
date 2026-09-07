/**
 * payOS Payment Provider
 * Generates VietQR payment requests and verifies incoming webhooks using HMAC-SHA256
 */

/**
 * Compute HMAC-SHA256 signature using Web Crypto API (Cloudflare Worker & modern Node.js compatible)
 */
export async function computeHmacSha256(dataString, secretKey) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKey);
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    const signature = await crypto.subtle.sign(
        'HMAC',
        cryptoKey,
        encoder.encode(dataString)
    );
    return Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

/**
 * Sort keys and build query string for payOS signature calculation
 */
export function buildPayOsSignatureData(data) {
    if (!data || typeof data !== 'object') return '';
    const sortedKeys = Object.keys(data).filter(k => k !== 'signature').sort();
    return sortedKeys
        .map(key => {
            let val = data[key];
            if (val === null || val === undefined) val = '';
            if (typeof val === 'object') {
                val = JSON.stringify(val);
            }
            return `${key}=${val}`;
        })
        .join('&');
}

/**
 * Verify incoming webhook signature
 */
export async function verifyWebhookSignature(webhookBody, checksumKey) {
    if (!webhookBody || !checksumKey) return false;
    const { data, signature } = webhookBody;
    if (!data || !signature) return false;

    const signatureData = buildPayOsSignatureData(data);
    const expectedSignature = await computeHmacSha256(signatureData, checksumKey);
    return expectedSignature.toLowerCase() === signature.toLowerCase();
}

/**
 * Create a payment request via payOS API
 * @param {Object} env - Cloudflare environment bindings
 * @param {Object} params - { orderCode, amount, description, returnUrl, cancelUrl }
 */
export async function createPayOsPaymentLink(env, params) {
    const { orderCode, amount, description, returnUrl, cancelUrl } = params;
    const clientId = env.PAYOS_CLIENT_ID;
    const apiKey = env.PAYOS_API_KEY;
    const checksumKey = env.PAYOS_CHECKSUM_KEY;

    // If payOS credentials are not yet configured in environment, provide local mock for development
    if (!clientId || !apiKey || !checksumKey) {
        console.warn('[payOS] Credentials not configured in env, using sandbox/mock payment link');
        const mockQr = `https://img.vietqr.io/image/970422-VOCA${orderCode}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(description)}`;
        return {
            orderCode,
            amount,
            description,
            checkoutUrl: mockQr,
            qrCode: mockQr,
            status: 'PENDING',
            isMock: true
        };
    }

    // Build data for payOS signature
    const requestData = {
        amount,
        cancelUrl: cancelUrl || 'https://voca.study/video',
        description,
        orderCode,
        returnUrl: returnUrl || 'https://voca.study/video'
    };

    const signatureData = buildPayOsSignatureData(requestData);
    const signature = await computeHmacSha256(signatureData, checksumKey);

    const payload = {
        ...requestData,
        signature
    };

    const response = await fetch('https://api-merchant.payos.vn/v2/payment-requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-client-id': clientId,
            'x-api-key': apiKey
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`payOS API error ${response.status}: ${errorText}`);
    }

    const resData = await response.json();
    if (resData.code !== '00') {
        throw new Error(`payOS payment creation failed: ${resData.desc || resData.code}`);
    }

    return {
        orderCode,
        amount,
        description,
        checkoutUrl: resData.data.checkoutUrl,
        qrCode: resData.data.qrCode,
        status: resData.data.status || 'PENDING'
    };
}
