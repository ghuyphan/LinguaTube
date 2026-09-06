/**
 * Cloudflare Turnstile Verification Service
 * Validates Turnstile CAPTCHA tokens using Cloudflare's siteverify endpoint
 */

const CLOUDFLARE_SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
// Cloudflare official always-passes test secret key for development
const CLOUDFLARE_TEST_SECRET = '1x00000000000000000000000000000000BB';

/**
 * Verify a Turnstile token submitted by the client
 * @param {string} token - The client turnstile response token
 * @param {string} [secretKey] - Cloudflare Turnstile secret key (from env)
 * @param {string} [remoteIp] - Client IP address
 * @param {string} [environment] - Environment name ('development' | 'production')
 * @returns {Promise<{ valid: boolean, error?: string }>}
 */
export async function verifyTurnstileToken(token, secretKey, remoteIp, environment = 'production') {
    // If no token is provided, reject immediately
    if (!token) {
        return { valid: false, error: 'Missing turnstile token' };
    }

    const isDev = environment === 'development';

    // Allow local development test token bypass ONLY in dev environment
    if (token === 'cf-turnstile-dev-token') {
        if (isDev) {
            return { valid: true };
        }
        console.warn('[Turnstile] Dev token rejected in production environment');
        return { valid: false, error: 'Invalid turnstile token' };
    }

    // In production, secret key must be configured
    if (!secretKey && !isDev) {
        console.error('[Turnstile] TURNSTILE_SECRET_KEY is not configured in production');
        return { valid: false, error: 'Turnstile service misconfigured' };
    }

    const key = secretKey || CLOUDFLARE_TEST_SECRET;

    try {
        const formData = new URLSearchParams();
        formData.append('secret', key);
        formData.append('response', token);
        if (remoteIp) {
            formData.append('remoteip', remoteIp);
        }

        const res = await fetch(CLOUDFLARE_SITEVERIFY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData.toString()
        });

        if (!res.ok) {
            console.error(`[Turnstile] Verification HTTP error: ${res.status}`);
            // In dev mode with test keys, fail open if network to CF fails
            if (isDev && key === CLOUDFLARE_TEST_SECRET) {
                return { valid: true };
            }
            return { valid: false, error: 'Turnstile service unavailable' };
        }

        const data = await res.json();
        if (data.success) {
            return { valid: true };
        }

        console.warn('[Turnstile] Token verification failed:', data['error-codes']);
        return {
            valid: false,
            error: data['error-codes'] ? data['error-codes'].join(', ') : 'Verification failed'
        };

    } catch (err) {
        console.error('[Turnstile] Network exception during verification:', err?.message || err);
        // Fall back gracefully ONLY in dev environment
        if (isDev && key === CLOUDFLARE_TEST_SECRET) {
            return { valid: true };
        }
        return { valid: false, error: err?.message || 'Verification error' };
    }
}
