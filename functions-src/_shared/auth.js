/**
 * PocketBase JWT Authentication Module for Cloudflare Functions
 * Validates PocketBase auth tokens for API authorization
 * 
 * NOTE: With vocab sync moved to PocketBase, this is primarily used for
 * future subscription-gated features via Cloudflare Workers.
 */

/**
 * Base64URL decode
 */
function base64UrlDecode(str) {
    const padding = '='.repeat((4 - str.length % 4) % 4);
    const base64 = (str + padding).replace(/-/g, '+').replace(/_/g, '/');
    return atob(base64);
}

/**
 * Decode JWT payload without verification
 */
function decodeJwtPayload(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        return JSON.parse(base64UrlDecode(parts[1]));
    } catch {
        return null;
    }
}

/**
 * Verify PocketBase token by calling PocketHost API
 * 
 * NOTE: Token Refresh Side Effect
 * ===============================
 * This function calls /auth-refresh which EXTENDS the token lifetime on every validation.
 * This is intentional behavior to keep active users logged in without requiring re-authentication.
 * 
 * If you need read-only verification without refresh:
 * 1. Decode the JWT payload locally
 * 2. Check the `exp` claim against current time
 * 3. Optionally call a non-refreshing endpoint like /api/collections/users/auth/get-current
 * 
 * We keep the refresh behavior because:
 * - It provides seamless user experience for active users
 * - Token lifetime extension is capped by PocketBase server settings
 * - Inactive users' tokens still expire naturally
 */
async function verifyPocketBaseToken(token, env) {
    const pocketbaseUrl = env.POCKETHOST_URL || 'https://voca.pockethost.io';

    try {
        const response = await fetch(`${pocketbaseUrl}/api/collections/users/auth-refresh`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            return { valid: false, error: 'Token expired or invalid' };
        }

        const data = await response.json();
        return {
            valid: true,
            userId: data.record?.id,
            user: {
                id: data.record?.id,
                email: data.record?.email,
                name: data.record?.name,
                subscriptionTier: data.record?.subscription_tier || 'free',
                subscriptionExpires: data.record?.subscription_expires,
                // Diamond system fields
                diamonds: data.record?.diamonds,
                diamondsUpdatedAt: data.record?.diamonds_updated_at
            }
        };
    } catch (error) {
        // FAIL CLOSED - do not trust unverified tokens
        console.error('[Auth] PocketBase verification failed:', error.message);
        return { valid: false, error: 'Authentication service unavailable' };
    }
}

/**
 * Validate auth token from Authorization header
 */
export async function validateAuthToken(request, env) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { valid: false, error: 'Missing Authorization header' };
    }

    const token = authHeader.substring(7);
    const payload = decodeJwtPayload(token);

    if (!payload) {
        return { valid: false, error: 'Invalid token format' };
    }

    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        return { valid: false, error: 'Token expired' };
    }

    // Verify with PocketHost
    return await verifyPocketBaseToken(token, env);
}

/**
 * Unauthorized response helper
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
 * Middleware helper - validate auth and return user or error response
 */
export async function requireAuth(request, env) {
    const result = await validateAuthToken(request, env);
    if (!result.valid) {
        return { response: unauthorizedResponse(result.error) };
    }
    return { user: { ...result.user, userId: result.userId } };
}

/**
 * Check if user has premium access
 */
export function hasPremiumAccess(user) {
    if (!user || user.subscriptionTier === 'free') return false;
    if (user.subscriptionExpires && new Date(user.subscriptionExpires) < new Date()) {
        return false;
    }
    return true;
}
