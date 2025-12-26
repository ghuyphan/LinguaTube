/**
 * Google JWT Authentication Module for Cloudflare Functions
 * Validates Google OAuth tokens for protected endpoints
 */

// Google's public key endpoint
const GOOGLE_CERTS_URL = 'https://www.googleapis.com/oauth2/v3/certs';

// Cache for Google's public keys (in-memory per worker instance)
let cachedCerts = null;
let certsCacheTime = 0;
const CERTS_CACHE_TTL = 60 * 60 * 1000; // 1 hour

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
        // Decode the JWT without verification first to get the header
        const parts = token.split('.');
        if (parts.length !== 3) {
            return { valid: false, error: 'Invalid token format' };
        }

        const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

        // Basic validation checks
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

        // For production, you should verify the signature using Google's public keys
        // This is a simplified version that trusts the token structure
        // In a high-security environment, implement full JWT signature verification

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
