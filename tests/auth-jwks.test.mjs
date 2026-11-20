import test from 'node:test';
import assert from 'node:assert/strict';
import {
    authenticateIdentity,
    validateAuthToken,
    invalidateUserTokenCache,
    clearJwksCache
} from '../functions-src/middlewares/auth.js';

function b64url(bytes) {
    const buf = bytes instanceof Uint8Array ? bytes : new TextEncoder().encode(bytes);
    return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function generateEs256KeyPair(kid) {
    const keyPair = await crypto.subtle.generateKey(
        { name: 'ECDSA', namedCurve: 'P-256' },
        true,
        ['sign', 'verify']
    );
    const pubJwk = await crypto.subtle.exportKey('jwk', keyPair.publicKey);
    return {
        privateKey: keyPair.privateKey,
        jwk: { ...pubJwk, kid, alg: 'ES256', use: 'sig', key_ops: ['verify'] }
    };
}

async function signEs256Jwt(privateKey, header, payload) {
    const signingInput = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(payload))}`;
    const sig = await crypto.subtle.sign(
        { name: 'ECDSA', hash: 'SHA-256' },
        privateKey,
        new TextEncoder().encode(signingInput)
    );
    return `${signingInput}.${b64url(new Uint8Array(sig))}`;
}

test('JWKS ES256: authenticateIdentity verifies locally with 0 /auth/v1/user and 0 access-state calls', async (t) => {
    clearJwksCache();
    t.after(clearJwksCache);

    const supabaseUrl = 'https://jwks-test.supabase.co';
    const uid = '11111111-1111-4111-8111-111111111111';
    const { privateKey, jwk } = await generateEs256KeyPair('kid-1');
    const token = await signEs256Jwt(
        privateKey,
        { alg: 'ES256', typ: 'JWT', kid: 'kid-1' },
        {
            sub: uid,
            email: 'learner@voca.study',
            iss: `${supabaseUrl}/auth/v1`,
            exp: Math.floor(Date.now() / 1000) + 3600
        }
    );

    let jwksCalls = 0;
    let authUserCalls = 0;
    let accessStateCalls = 0;

    t.mock.method(globalThis, 'fetch', async (url) => {
        const u = String(url);
        if (u.endsWith('/auth/v1/.well-known/jwks.json')) {
            jwksCalls++;
            return Response.json({ keys: [jwk] });
        }
        if (u.includes('/auth/v1/user')) authUserCalls++;
        if (u.includes('get_user_access_state')) accessStateCalls++;
        throw new Error(`Unexpected fetch: ${u}`);
    });

    const req = () => new Request('https://voca.study/api/dict?word=test', {
        headers: { Authorization: `Bearer ${token}` }
    });
    const env = { SUPABASE_URL: supabaseUrl, SUPABASE_SERVICE_ROLE_KEY: 'svc-key' };

    const first = await authenticateIdentity(req(), env);
    assert.equal(first.valid, true);
    assert.equal(first.userId, uid);
    assert.equal(jwksCalls, 1);
    assert.equal(authUserCalls, 0);
    assert.equal(accessStateCalls, 0);

    // Second call uses cached JWKS CryptoKey -> 0 network calls at all.
    const second = await authenticateIdentity(req(), env);
    assert.equal(second.valid, true);
    assert.equal(jwksCalls, 1);
    assert.equal(authUserCalls, 0);
    assert.equal(accessStateCalls, 0);
});

test('JWKS ES256: rejects tampered signature locally without calling /auth/v1/user', async (t) => {
    clearJwksCache();
    t.after(clearJwksCache);

    const supabaseUrl = 'https://jwks-forged.supabase.co';
    const { jwk } = await generateEs256KeyPair('kid-1');
    const attacker = await generateEs256KeyPair('kid-1');
    const forgedToken = await signEs256Jwt(
        attacker.privateKey,
        { alg: 'ES256', typ: 'JWT', kid: 'kid-1' },
        {
            sub: '22222222-2222-4222-8222-222222222222',
            iss: `${supabaseUrl}/auth/v1`,
            exp: Math.floor(Date.now() / 1000) + 3600
        }
    );

    t.mock.method(globalThis, 'fetch', async (url) => {
        if (String(url).endsWith('/.well-known/jwks.json')) return Response.json({ keys: [jwk] });
        throw new Error(`Should not call remote auth: ${url}`);
    });

    const res = await authenticateIdentity(
        new Request('https://voca.study/api/dict', { headers: { Authorization: `Bearer ${forgedToken}` } }),
        { SUPABASE_URL: supabaseUrl }
    );
    assert.equal(res.valid, false);
    assert.equal(res.unavailable, undefined);
});

test('accessState cached mode reuses tier state across calls while live mode always fetches fresh', async (t) => {
    clearJwksCache();
    const uid = '33333333-3333-4333-8333-333333333333';
    t.after(() => {
        clearJwksCache();
        invalidateUserTokenCache(uid);
    });

    const supabaseUrl = 'https://jwks-cached.supabase.co';
    const { privateKey, jwk } = await generateEs256KeyPair('kid-2');
    const token = await signEs256Jwt(
        privateKey,
        { alg: 'ES256', typ: 'JWT', kid: 'kid-2' },
        { sub: uid, iss: `${supabaseUrl}/auth/v1`, exp: Math.floor(Date.now() / 1000) + 3600 }
    );

    let accessCalls = 0;
    let diamonds = 5;
    t.mock.method(globalThis, 'fetch', async (url) => {
        const u = String(url);
        if (u.endsWith('/.well-known/jwks.json')) return Response.json({ keys: [jwk] });
        if (u.includes('rpc/get_user_access_state')) {
            accessCalls++;
            return Response.json({ id: uid, subscription_tier: 'pro', diamonds });
        }
        throw new Error(`Unexpected fetch: ${u}`);
    });

    const req = () => new Request('https://voca.study/api/translate/batch', {
        headers: { Authorization: `Bearer ${token}` }
    });
    const env = { SUPABASE_URL: supabaseUrl, SUPABASE_SERVICE_ROLE_KEY: 'svc-key' };

    const r1 = await validateAuthToken(req(), env, { accessState: 'cached' });
    const r2 = await validateAuthToken(req(), env, { accessState: 'cached' });
    assert.equal(r1.valid, true);
    assert.equal(r1.user.subscriptionTier, 'pro');
    assert.equal(r2.user.subscriptionTier, 'pro');
    assert.equal(accessCalls, 1);

    diamonds = 3;
    const live = await validateAuthToken(req(), env, { accessState: 'live' });
    assert.equal(live.user.diamonds, 3);
    assert.equal(accessCalls, 2);
});
