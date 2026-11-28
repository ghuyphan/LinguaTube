import { serviceRoleRequest } from '../services/supabase-rest.js';
/**
 * Supabase JWT Authentication Module for Cloudflare Functions.
 *
 * - Asymmetric Supabase JWTs (ES256 / RS256 with `kid`) are verified locally via
 *   Web Crypto against the project's JWKS endpoint (cached 1h), eliminating
 *   per-request `/auth/v1/user` round-trips.
 * - Legacy HS256 / non-JWKS tokens fall back to `/auth/v1/user` with an
 *   in-memory verification cache.
 * - Mutable billing/tier state (`rpc/get_user_access_state`) is opt-in via
 *   `accessState`:
 *     - `'none'`   : identity-only endpoints (dict, kanji, grammar, etc.) -> 0 DB calls
 *     - `'cached'` : non-financial rate-limit tiering (translate, tokenize) -> 60s cache
 *     - `'live'`   : financial/billing authority (default) -> always fresh
 */

const DEFAULT_SUPABASE_URL = 'https://edbkvzviqeulwzcnrrlb.supabase.co';
const TEST_FALLBACK_ANON_KEY = typeof process !== 'undefined'
    ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkYmt2enZpcWV1bHd6Y25ycmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NTI5NjAsImV4cCI6MjEwNTAyODk2MH0.F2Js6UWUyUX-uVfDMVCNLJBG7eL6Clo9EGimjh2wgUg'
    : '';

const TOKEN_CACHE_TTL_MS = 5 * 60 * 1000;
const ACCESS_STATE_CACHE_TTL_MS = 60 * 1000;
const JWKS_CACHE_TTL_MS = 60 * 60 * 1000;
const JWKS_REFRESH_COOLDOWN_MS = 30 * 1000;
const MAX_CACHE_ENTRIES = 1000;

const memTokenCache = new Map();
const memAccessStateCache = new Map();
const jwksCache = new Map(); // baseUrl -> { keys: Map<kid, { key: CryptoKey, alg: string }>, fetchedAt, expiresAt }
const jwksInFlight = new Map();

function base64UrlToBytes(str) {
    const padding = '='.repeat((4 - str.length % 4) % 4);
    const base64 = (str + padding).replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

function decodeBase64UrlJson(str) {
    try {
        return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(base64UrlToBytes(str)));
    } catch {
        return null;
    }
}

/**
 * Decode JWT payload without verification
 */
export function decodeJwtPayload(token) {
    if (typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    return decodeBase64UrlJson(parts[1]);
}

function setBoundedCache(map, key, value) {
    map.delete(key);
    if (map.size >= MAX_CACHE_ENTRIES) {
        map.delete(map.keys().next().value);
    }
    map.set(key, value);
}

async function importJwkKey(jwk) {
    if (!jwk || !jwk.kid) return null;
    if (jwk.kty === 'EC' && jwk.crv === 'P-256' && (!jwk.alg || jwk.alg === 'ES256')) {
        const key = await crypto.subtle.importKey(
            'jwk',
            jwk,
            { name: 'ECDSA', namedCurve: 'P-256' },
            false,
            ['verify']
        );
        return { key, alg: 'ES256' };
    }
    if (jwk.kty === 'RSA' && (!jwk.alg || jwk.alg === 'RS256')) {
        const key = await crypto.subtle.importKey(
            'jwk',
            jwk,
            { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
            false,
            ['verify']
        );
        return { key, alg: 'RS256' };
    }
    return null;
}

async function fetchJwksKeys(supabaseUrl, forceRefresh = false) {
    const baseUrl = supabaseUrl.replace(/\/$/, '');
    const now = Date.now();
    const existing = jwksCache.get(baseUrl);
    if (!forceRefresh && existing && existing.expiresAt > now) {
        return existing.keys;
    }
    if (forceRefresh && existing && (now - existing.fetchedAt) < JWKS_REFRESH_COOLDOWN_MS) {
        return existing.keys;
    }

    const inFlight = jwksInFlight.get(baseUrl);
    if (inFlight) return inFlight;

    const promise = (async () => {
        const jwksUrl = `${baseUrl}/auth/v1/.well-known/jwks.json`;
        const cache = typeof caches !== 'undefined' ? caches.default : null;
        let data = null;

        if (!forceRefresh && cache) {
            try {
                const cachedResp = await cache.match(jwksUrl);
                if (cachedResp?.ok) data = await cachedResp.json();
            } catch { /* Fall through to live JWKS fetch */ }
        }

        if (!data) {
            const response = await fetch(jwksUrl, {
                signal: AbortSignal.timeout(4000),
                redirect: 'manual'
            });
            if (!response.ok) {
                throw new Error(`JWKS service returned ${response.status}`);
            }
            data = await response.json();
            if (cache && Array.isArray(data?.keys)) {
                try {
                    await cache.put(jwksUrl, new Response(JSON.stringify(data), {
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'public, max-age=3600'
                        }
                    }));
                } catch { /* Non-fatal cache write failure */ }
            }
        }

        const keys = new Map();
        for (const jwk of Array.isArray(data?.keys) ? data.keys : []) {
            try {
                const imported = await importJwkKey(jwk);
                if (imported) keys.set(jwk.kid, imported);
            } catch { /* Skip unsupported JWK */ }
        }
        jwksCache.set(baseUrl, { keys, fetchedAt: Date.now(), expiresAt: Date.now() + JWKS_CACHE_TTL_MS });
        return keys;
    })().finally(() => jwksInFlight.delete(baseUrl));

    jwksInFlight.set(baseUrl, promise);
    return promise;
}

/**
 * Local cryptographic verification for asymmetric Supabase JWTs (ES256 / RS256).
 * Returns `null` when the token uses a non-asymmetric alg (e.g. legacy HS256)
 * so the caller can fall back to `/auth/v1/user`.
 */
async function tryVerifyAsymmetricJwt(token, payload, supabaseUrl) {
    const parts = token.split('.');
    if (parts.length !== 3) return { valid: false, error: 'Invalid token format' };
    const header = decodeBase64UrlJson(parts[0]);
    if (!header || (header.alg !== 'ES256' && header.alg !== 'RS256') || !header.kid) {
        return null;
    }

    const expectedIss = `${supabaseUrl.replace(/\/$/, '')}/auth/v1`;
    if (!payload.iss || payload.iss !== expectedIss) {
        return { valid: false, error: 'Invalid token issuer' };
    }
    if (payload.aud !== 'authenticated' || payload.role !== 'authenticated') {
        return { valid: false, error: 'Invalid token audience or role' };
    }
    const nowSec = Math.floor(Date.now() / 1000);
    if (typeof payload.nbf === 'number' && payload.nbf > nowSec + 30) {
        return { valid: false, error: 'Token not yet valid' };
    }

    let keys = await fetchJwksKeys(supabaseUrl, false);
    let entry = keys.get(header.kid);
    if (!entry) {
        keys = await fetchJwksKeys(supabaseUrl, true);
        entry = keys.get(header.kid);
    }
    if (!entry || entry.alg !== header.alg) {
        return { valid: false, error: 'Unknown signing key' };
    }

    const signingInput = new TextEncoder().encode(`${parts[0]}.${parts[1]}`);
    const signature = base64UrlToBytes(parts[2]);
    const algorithm = header.alg === 'ES256'
        ? { name: 'ECDSA', hash: 'SHA-256' }
        : { name: 'RSASSA-PKCS1-v1_5' };

    const verified = await crypto.subtle.verify(algorithm, entry.key, signature, signingInput);
    if (!verified) {
        return { valid: false, error: 'Invalid or forged authentication token' };
    }

    return {
        valid: true,
        authUser: {
            id: payload.sub,
            email: payload.email || '',
            user_metadata: payload.user_metadata || {}
        }
    };
}

async function fetchAccessState(userId, token, supabaseUrl, supabaseKey, env, mode) {
    const cacheKey = `${supabaseUrl}:${userId}`;
    const now = Date.now();
    if (mode === 'cached') {
        const cached = memAccessStateCache.get(cacheKey);
        if (cached && cached.expiresAt > now) {
            return cached.profile;
        }
    }

    let profile;
    if (env.SUPABASE_SERVICE_ROLE_KEY) {
        profile = await serviceRoleRequest(env, 'rpc/get_user_access_state', {
            method: 'POST',
            body: { p_user_id: userId },
            timeoutMs: 4000
        });
        if (!profile || profile.id !== userId) throw new Error('Invalid access state');
    } else {
        const response = await fetch(
            `${supabaseUrl}/rest/v1/profiles?id=eq.${userId}&select=name,email,subscription_tier,subscription_expires,diamonds,diamonds_updated_at`,
            {
                headers: { apikey: supabaseKey, Authorization: `Bearer ${token}` },
                signal: AbortSignal.timeout(4000),
                redirect: 'manual'
            }
        );
        if (!response.ok) throw new Error('Profile unavailable');
        profile = (await response.json())?.[0];
    }

    setBoundedCache(memAccessStateCache, cacheKey, {
        profile,
        expiresAt: Date.now() + ACCESS_STATE_CACHE_TTL_MS
    });
    return profile;
}

/**
 * Verify Supabase JWT token and optionally load mutable access state.
 * @param {string} token
 * @param {Object} env
 * @param {{ accessState?: 'live' | 'cached' | 'none' }} [options]
 */
async function verifySupabaseToken(token, env, { accessState = 'live' } = {}) {
    const supabaseUrl = env?.SUPABASE_URL || DEFAULT_SUPABASE_URL;
    const supabaseKey = env?.SUPABASE_SERVICE_ROLE_KEY || env?.SUPABASE_ANON_KEY || TEST_FALLBACK_ANON_KEY;
    const now = Date.now();

    if (accessState !== 'none' && !supabaseKey) {
        console.error('[Auth] Supabase API key missing in environment bindings');
        return { valid: false, unavailable: true, error: 'Authentication configuration unavailable' };
    }

    if (!token || typeof token !== 'string') {
        return { valid: false, error: 'Missing token' };
    }

    const payload = decodeJwtPayload(token);
    if (!payload || !payload.sub) {
        return { valid: false, error: 'Invalid token payload' };
    }

    // Expiration check (exp is in seconds)
    if (!Number.isFinite(payload.exp) || payload.exp <= Math.floor(now / 1000)) {
        return { valid: false, error: 'Token expired' };
    }

    try {
        let authUser = null;
        const jwksResult = await tryVerifyAsymmetricJwt(token, payload, supabaseUrl);
        if (jwksResult !== null) {
            if (!jwksResult.valid) return jwksResult;
            authUser = jwksResult.authUser;
        } else {
            if (!supabaseKey) {
                console.error('[Auth] Supabase API key missing in environment bindings');
                return { valid: false, unavailable: true, error: 'Authentication configuration unavailable' };
            }
            const cacheKey = `${supabaseUrl}:${token}`;
            const cached = memTokenCache.get(cacheKey);
            if (cached && cached.expiresAt > now) {
                authUser = cached.authUser;
            } else {
                const response = await fetch(`${supabaseUrl}/auth/v1/user`, {
                    headers: { apikey: supabaseKey, Authorization: `Bearer ${token}` },
                    signal: AbortSignal.timeout(4000),
                    redirect: 'manual'
                });
                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        return { valid: false, error: 'Invalid or forged authentication token' };
                    }
                    throw new Error(`Auth service returned ${response.status}`);
                }
                authUser = await response.json();
                if (!authUser || authUser.id !== payload.sub) {
                    return { valid: false, error: 'Token user identity mismatch' };
                }
                setBoundedCache(memTokenCache, cacheKey, {
                    authUser,
                    expiresAt: Math.min(now + TOKEN_CACHE_TTL_MS, (payload.exp || 0) * 1000)
                });
            }
        }

        if (accessState === 'none') {
            return {
                valid: true,
                userId: authUser.id,
                user: {
                    id: authUser.id,
                    email: authUser.email || payload.email || '',
                    name: payload.user_metadata?.full_name || payload.user_metadata?.name || authUser.email || 'User'
                }
            };
        }

        const profile = await fetchAccessState(authUser.id, token, supabaseUrl, supabaseKey, env, accessState);

        return {
            valid: true,
            userId: authUser.id,
            user: {
                id: authUser.id,
                email: profile?.email || authUser.email || payload.email || '',
                name: profile?.name || payload.user_metadata?.full_name || payload.user_metadata?.name || authUser.email || 'User',
                subscriptionTier: profile?.subscription_tier || 'free',
                subscriptionExpires: profile?.subscription_expires || null,
                diamonds: profile?.diamonds ?? 5,
                last_diamond_regen: profile?.diamonds_updated_at || null,
                diamondsUpdatedAt: profile?.diamonds_updated_at || null
            }
        };
    } catch (error) {
        console.error('[Auth] Supabase verification error:', error.message);
        return { valid: false, unavailable: true, error: 'Authentication service unavailable' };
    }
}

/**
 * Invalidate cached identity and short-TTL tier state for a user.
 */
export function invalidateUserTokenCache(userId) {
    if (!userId) return;
    for (const [token, entry] of memTokenCache.entries()) {
        if (entry.authUser?.id === userId) {
            memTokenCache.delete(token);
        }
    }
    for (const key of memAccessStateCache.keys()) {
        if (key.endsWith(`:${userId}`)) {
            memAccessStateCache.delete(key);
        }
    }
}

/**
 * Clear cached JWKS keys (primarily for tests).
 */
export function clearJwksCache() {
    jwksCache.clear();
    jwksInFlight.clear();
}

/**
 * Validate auth token from Authorization header.
 * @param {Request} request
 * @param {Object} env
 * @param {{ accessState?: 'live' | 'cached' | 'none' }} [options]
 */
export async function validateAuthToken(request, env, options = {}) {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { valid: false, error: 'Missing Authorization header' };
    }

    const token = authHeader.substring(7);
    const result = await verifySupabaseToken(token, env, options);
    if (result.unavailable) {
        result.response = new Response(JSON.stringify({ error: result.error, code: 'AUTH_UNAVAILABLE' }), {
            status: 503,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-store',
                'Retry-After': '5'
            }
        });
    }
    return result;
}

/**
 * Identity-only JWT authentication (0 Supabase DB/access-state calls).
 * Use on endpoints that only need `userId` (rate limiting, attribution).
 */
export function authenticateIdentity(request, env) {
    return validateAuthToken(request, env, { accessState: 'none' });
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
export async function requireAuth(request, env, options = {}) {
    const result = await validateAuthToken(request, env, options);
    if (!result.valid) {
        return { response: result.response || unauthorizedResponse(result.error) };
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
