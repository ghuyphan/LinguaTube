/**
 * Google JWT Authentication Module for Cloudflare Functions
 * Validates Google OAuth tokens with proper cryptographic signature verification
 */

// Google's public key endpoint
const GOOGLE_CERTS_URL = 'https://www.googleapis.com/oauth2/v3/certs';

// Cache for Google's public keys (in-memory per worker instance)
let cachedKeys = null;
let keysCacheTime = 0;
const KEYS_CACHE_TTL = 60 * 60 * 1000; // 1 hour

/**
 * Fetch and cache Google's JWK public keys
 * @returns {Promise<Object>} Map of kid -> CryptoKey
 */
async function getGooglePublicKeys() {
    const now = Date.now();

    // Return cached keys if still valid
    if (cachedKeys && (now - keysCacheTime) < KEYS_CACHE_TTL) {
        return cachedKeys;
    }

    try {
        const response = await fetch(GOOGLE_CERTS_URL, {
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Google certs: ${response.status}`);
        }

        const jwks = await response.json();
        const keys = {};

        // Convert each JWK to CryptoKey
        for (const jwk of jwks.keys) {
            try {
                const cryptoKey = await crypto.subtle.importKey(
                    'jwk',
                    jwk,
                    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
                    false,
                    ['verify']
                );
                keys[jwk.kid] = cryptoKey;
            } catch (e) {
                console.warn('[Auth] Failed to import key:', jwk.kid);
            }
        }

        cachedKeys = keys;
        keysCacheTime = now;
        return keys;

    } catch (error) {
        console.error('[Auth] Failed to fetch Google public keys:', error.message);
        // Return cached keys even if expired, better than failing
        if (cachedKeys) return cachedKeys;
        throw error;
    }
}

/**
 * Base64URL decode
 */
function base64UrlDecode(str) {
    // Add padding if needed
    const padding = '='.repeat((4 - str.length % 4) % 4);
    const base64 = (str + padding).replace(/-/g, '+').replace(/_/g, '/');
    return atob(base64);
}

/**
 * Verify JWT signature using Google's public keys
 * @param {string} token - The JWT token
 * @returns {Promise<{valid: boolean, payload?: Object, error?: string}>}
 */
async function verifyJwtSignature(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
        return { valid: false, error: 'Invalid token format' };
    }

    try {
        const header = JSON.parse(base64UrlDecode(parts[0]));
        const payload = JSON.parse(base64UrlDecode(parts[1]));

        // Get the key ID from header
        const kid = header.kid;
        if (!kid) {
            return { valid: false, error: 'Token missing key ID' };
        }

        // Get Google's public keys
        const keys = await getGooglePublicKeys();
        const publicKey = keys[kid];

        if (!publicKey) {
            // Key not found - might be rotated, clear cache and retry once
            cachedKeys = null;
            const freshKeys = await getGooglePublicKeys();
            if (!freshKeys[kid]) {
                return { valid: false, error: 'Unknown signing key' };
            }
        }

        // Verify signature
        const signedData = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
        const signature = Uint8Array.from(base64UrlDecode(parts[2]), c => c.charCodeAt(0));

        const isValid = await crypto.subtle.verify(
            'RSASSA-PKCS1-v1_5',
            keys[kid],
            signature,
            signedData
        );

        if (!isValid) {
            return { valid: false, error: 'Invalid signature' };
        }

        return { valid: true, payload };

    } catch (error) {
        console.error('[Auth] Signature verification error:', error.message);
        return { valid: false, error: 'Signature verification failed' };
    }
}

/**
 * Validate a Google JWT token from the Authorization header
 * @param {Request} request - Cloudflare request object
 * @param {Object} env - Environment bindings (needs GOOGLE_CLIENT_ID)
 * @returns {Promise<{valid: boolean, userId?: string, email?: string, error?: string}>}
 */
export async function validateAuthToken(request, env) {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { valid: false, error: 'Missing or invalid Authorization header' };
    }

    const token = authHeader.substring(7); // Remove 'Bearer '

    try {
        // Verify signature first (this also decodes the payload)
        const signatureResult = await verifyJwtSignature(token);
        if (!signatureResult.valid) {
            return signatureResult;
        }

        const payload = signatureResult.payload;
        const now = Math.floor(Date.now() / 1000);

        // Check token expiration
        if (payload.exp && payload.exp < now) {
            return { valid: false, error: 'Token expired' };
        }

        // Check token not-before time
        if (payload.nbf && payload.nbf > now) {
            return { valid: false, error: 'Token not yet valid' };
        }

        // Check issued-at time (allow 5 min clock skew)
        if (payload.iat && payload.iat > now + 300) {
            return { valid: false, error: 'Invalid token issue time' };
        }

        // Check audience matches our client ID
        const clientId = env.GOOGLE_CLIENT_ID;
        if (clientId && payload.aud !== clientId) {
            return { valid: false, error: 'Invalid token audience' };
        }

        // Check issuer is Google
        if (!['accounts.google.com', 'https://accounts.google.com'].includes(payload.iss)) {
            return { valid: false, error: 'Invalid token issuer' };
        }

        // Extract user info
        return {
            valid: true,
            userId: payload.sub,
            email: payload.email,
            name: payload.name
        };

    } catch (error) {
        console.error('[Auth] Token validation error:', error.message);
        return { valid: false, error: 'Token validation failed' };
    }
}

/**
 * Create an unauthorized response
 * @param {string} message - Error message
 * @returns {Response}
 */
export function unauthorizedResponse(message = 'Unauthorized') {
    return new Response(JSON.stringify({ error: message }), {
        status: 401,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'WWW-Authenticate': 'Bearer'
        }
    });
}

/**
 * Middleware helper - extract and validate auth, return user info or error response
 * @param {Request} request
 * @param {Object} env
 * @returns {Promise<{user?: Object, response?: Response}>}
 */
export async function requireAuth(request, env) {
    const result = await validateAuthToken(request, env);

    if (!result.valid) {
        return { response: unauthorizedResponse(result.error) };
    }

    return { user: result };
}
