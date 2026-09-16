/**
 * Supabase JWT Authentication Module for Cloudflare Functions
 * Validates Supabase auth tokens for API authorization
 */

const DEFAULT_SUPABASE_URL = 'https://edbkvzviqeulwzcnrrlb.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkYmt2enZpcWV1bHd6Y25ycmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NTI5NjAsImV4cCI6MjEwNTAyODk2MH0.F2Js6UWUyUX-uVfDMVCNLJBG7eL6Clo9EGimjh2wgUg';

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
export function decodeJwtPayload(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        return JSON.parse(base64UrlDecode(parts[1]));
    } catch {
        return null;
    }
}

// In-memory token cache to avoid making outbound HTTP requests on every single subrequest
const memTokenCache = new Map();
const TOKEN_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Verify Supabase JWT token and load user profile
 */
async function verifySupabaseToken(token, env) {
    const supabaseUrl = env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
    const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;
    const now = Date.now();

    if (!token || typeof token !== 'string') {
        return { valid: false, error: 'Missing token' };
    }

    const cached = memTokenCache.get(token);
    if (cached && now < cached.expiresAt) {
        return cached.result;
    }

    const payload = decodeJwtPayload(token);
    if (!payload || !payload.sub) {
        return { valid: false, error: 'Invalid token payload' };
    }

    // Expiration check (exp is in seconds)
    if (payload.exp && payload.exp < Math.floor(now / 1000)) {
        return { valid: false, error: 'Token expired' };
    }

    try {
        // 1. Cryptographically verify token signature via Supabase Auth API (/auth/v1/user)
        const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
            method: 'GET',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${token}`
            },
            signal: AbortSignal.timeout(4000)
        });

        if (!userRes.ok) {
            return { valid: false, error: 'Invalid or forged authentication token' };
        }

        const authUser = await userRes.json().catch(() => null);
        if (!authUser || authUser.id !== payload.sub) {
            return { valid: false, error: 'Token user identity mismatch' };
        }

        // 2. Query user profile directly from Supabase REST API
        const profileKey = env.SUPABASE_SERVICE_ROLE_KEY || supabaseKey;
        const profileRes = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${authUser.id}&select=*`, {
            method: 'GET',
            headers: {
                'apikey': profileKey,
                'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY || token}`,
                'Accept': 'application/json'
            },
            signal: AbortSignal.timeout(4000)
        });

        let profile = null;
        if (profileRes.ok) {
            const profiles = await profileRes.json();
            if (Array.isArray(profiles) && profiles.length > 0) {
                profile = profiles[0];
            }
        }

        const result = {
            valid: true,
            userId: authUser.id,
            user: {
                id: authUser.id,
                email: profile?.email || authUser.email || payload.email || '',
                name: profile?.name || payload.user_metadata?.full_name || payload.user_metadata?.name || authUser.email || 'User',
                subscriptionTier: profile?.subscription_tier || 'free',
                subscriptionExpires: profile?.subscription_expires || null,
                // Diamond system fields
                diamonds: profile?.diamonds ?? 5,
                last_diamond_regen: profile?.diamonds_updated_at || null,
                diamondsUpdatedAt: profile?.diamonds_updated_at || null
            }
        };

        // Cache in memory (cap at 200 items to bound isolate memory)
        if (memTokenCache.size > 200) {
            const oldestKey = memTokenCache.keys().next().value;
            memTokenCache.delete(oldestKey);
        }
        memTokenCache.set(token, { result, expiresAt: now + TOKEN_CACHE_TTL_MS });

        return result;
    } catch (error) {
        console.error('[Auth] Supabase verification error:', error.message);
        return { valid: false, error: 'Authentication service unavailable' };
    }
}

/**
 * Invalidate cached token entry for a user when mutable state (e.g. diamonds) changes
 */
export function invalidateUserTokenCache(userId) {
    if (!userId) return;
    for (const [token, entry] of memTokenCache.entries()) {
        if (entry.result?.userId === userId) {
            memTokenCache.delete(token);
        }
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
    return await verifySupabaseToken(token, env);
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
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
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
 * Determine exact active subscription tier of a user ('free' | 'pro' | 'premium' | 'anonymous')
 */
export function getUserTier(user) {
    if (!user) return 'anonymous';
    const tier = user.subscriptionTier || 'free';
    if (tier === 'free') return 'free';
    if (user.subscriptionExpires && new Date(user.subscriptionExpires) < new Date()) {
        return 'free'; // Subscription expired
    }
    return (tier === 'pro' || tier === 'premium') ? tier : 'free';
}

/**
 * Check if user has paid access (either pro or premium)
 */
export function hasPaidAccess(user) {
    const tier = getUserTier(user);
    return tier === 'pro' || tier === 'premium';
}

/**
 * Check if user has premium or pro access (backward compatible)
 */
export function hasPremiumAccess(user) {
    return hasPaidAccess(user);
}
