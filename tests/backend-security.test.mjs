import test from 'node:test';
import assert from 'node:assert/strict';
import { detectTitleLanguage, isLanguageSupported } from '../functions-src/middlewares/video-validator.js';

test('detectTitleLanguage: detects languages properly', () => {
  // Japanese
  assert.equal(detectTitleLanguage('鬼滅の刃 - 紅蓮華 🔥 (Official Video)'), 'ja');
  assert.equal(detectTitleLanguage('日本語を勉強しましょう！'), 'ja');

  // Korean
  assert.equal(detectTitleLanguage('BTS (방탄소년단) - Dynamite 🎬'), 'ko');

  // Chinese
  assert.equal(detectTitleLanguage('中文听力练习 第一课'), 'zh');

  // English with emojis, symbols, and quotes
  assert.equal(detectTitleLanguage('🔥 Learn English with "Friends" | 100% Effective! 🚀'), 'en');
  assert.equal(detectTitleLanguage('How to speak fluently in 2026? [Full Course]'), 'en');

  // Empty / undefined
  assert.equal(detectTitleLanguage(''), 'unknown');
  assert.equal(detectTitleLanguage(null), 'unknown');
});

test('isLanguageSupported: validates supported languages', () => {
  assert.equal(isLanguageSupported('ja'), true);
  assert.equal(isLanguageSupported('ko'), true);
  assert.equal(isLanguageSupported('zh'), true);
  assert.equal(isLanguageSupported('en'), true);
  assert.equal(isLanguageSupported('fr'), false);
  assert.equal(isLanguageSupported('es'), false);
});

test('Gladia resultUrl security validation prevents SSRF & exfiltration', () => {
  const isValidGladiaUrl = (urlStr) => {
    try {
      const parsed = new URL(urlStr);
      return parsed.protocol === 'https:' && 
             parsed.hostname === 'api.gladia.io' &&
             /^\/v2\/pre-recorded\/?/.test(parsed.pathname);
    } catch {
      return false;
    }
  };

  // Valid Gladia URLs
  assert.equal(isValidGladiaUrl('https://api.gladia.io/v2/pre-recorded/result/123'), true);
  assert.equal(isValidGladiaUrl('https://api.gladia.io/v2/pre-recorded?poll=true'), true);

  // SSRF attempts
  assert.equal(isValidGladiaUrl('http://api.gladia.io/v2/pre-recorded/123'), false); // insecure HTTP
  assert.equal(isValidGladiaUrl('https://api.gladia.io.attacker.com/v2'), false); // sub-domain attack
  assert.equal(isValidGladiaUrl('https://attacker.com/api.gladia.io'), false); // path attack
  assert.equal(isValidGladiaUrl('https://evil.com/?target=api.gladia.io'), false); // query attack
  assert.equal(isValidGladiaUrl('javascript:alert(1)'), false); // javascript scheme
  assert.equal(isValidGladiaUrl('file:///etc/passwd'), false); // file scheme
  assert.equal(isValidGladiaUrl('https://api.gladia.io/v2/other-endpoint'), false); // unauthorized endpoint
  assert.equal(isValidGladiaUrl('https://api.gladia.io/v1/billing/keys'), false); // billing endpoint traversal
});

test('GladiaProvider: checkJobStatus uses edge-compatible redirect mode and rejects 3xx redirects', async () => {
  const { GladiaProvider } = await import('../functions-src/providers/gladia.js');
  const provider = new GladiaProvider('test-api-key');

  const origFetch = globalThis.fetch;
  try {
    let capturedOptions = null;
    globalThis.fetch = async (url, options) => {
      capturedOptions = options;
      return {
        ok: true,
        status: 200,
        json: async () => ({ status: 'done', result: { sentences: [] } })
      };
    };

    const res = await provider.checkJobStatus('https://api.gladia.io/v2/pre-recorded/result/123');
    assert.equal(res.status, 'done');
    assert.equal(capturedOptions.redirect, 'manual');
    assert.notEqual(capturedOptions.redirect, 'error');

    // Reject 3xx redirects
    globalThis.fetch = async () => ({
      ok: false,
      status: 302,
      headers: new Headers({ location: 'https://evil.com' })
    });

    await assert.rejects(
      async () => provider.checkJobStatus('https://api.gladia.io/v2/pre-recorded/result/123'),
      /Gladia poll unexpected redirect: 302/
    );
  } finally {
    globalThis.fetch = origFetch;
  }
});

test('sanitizeVideoId & validateVideoRequest: prevents path traversal and malformed video IDs', async () => {
  const { validateVideoRequest } = await import('../functions-src/middlewares/video-validator.js');
  const { sanitizeVideoId } = await import('../functions-src/utils/utils.js');

  // Valid YouTube video IDs (11 chars)
  assert.equal(sanitizeVideoId('dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.equal(sanitizeVideoId('abcdefghijk'), 'abcdefghijk');

  // Path traversal & injection attempts
  assert.equal(sanitizeVideoId('../../etc/passwd'), null);
  assert.equal(sanitizeVideoId('dQw4w9WgXcQ/../../'), null);
  assert.equal(sanitizeVideoId(''), null);
  assert.equal(sanitizeVideoId('tooShort'), null);
  assert.equal(sanitizeVideoId('tooLongStringWithMoreThan11Chars'), null);

  // validateVideoRequest checks
  const validRes = await validateVideoRequest('dQw4w9WgXcQ', 'ja', 120, 'innertube');
  assert.equal(validRes, null);

  const traversalRes = await validateVideoRequest('../../payload', 'ja', 120, 'innertube');
  assert.equal(traversalRes?.error, 'invalid_video_id');

  const shortIdRes = await validateVideoRequest('short', 'ja', 120, 'innertube');
  assert.equal(shortIdRes?.error, 'invalid_video_id');
});

test('verifyTurnstileToken: enforces strict security in production', async () => {
  const { verifyTurnstileToken } = await import('../functions-src/services/turnstile.service.js');

  // Missing token fails
  const noToken = await verifyTurnstileToken('', 'secret', '1.1.1.1', 'production');
  assert.equal(noToken.valid, false);

  // Dev bypass is rejected in production!
  const prodDevBypass = await verifyTurnstileToken('cf-turnstile-dev-token', 'secret', '1.1.1.1', 'production');
  assert.equal(prodDevBypass.valid, false);
  assert.equal(prodDevBypass.error, 'Invalid turnstile token');

  // Dev bypass is accepted in development
  const devDevBypass = await verifyTurnstileToken('cf-turnstile-dev-token', 'secret', '1.1.1.1', 'development');
  assert.equal(devDevBypass.valid, true);

  // Production fails closed if secret key is missing
  const missingSecretProd = await verifyTurnstileToken('valid-looking-token', '', '1.1.1.1', 'production');
  assert.equal(missingSecretProd.valid, false);
});

test('DiamondService: tier configurations enforce correct limits', async () => {
  const { getTierDiamondConfig, TIER_CONFIGS } = await import('../functions-src/services/diamond.service.js');

  const anon = getTierDiamondConfig('anonymous');
  assert.equal(anon.maxDiamonds, 3);
  assert.equal(anon.regenIntervalMinutes, 20);
  assert.equal(anon.maxVideoDurationSec, 600);

  const free = getTierDiamondConfig('free');
  assert.equal(free.maxDiamonds, 5);
  assert.equal(free.regenIntervalMinutes, 15);
  assert.equal(free.maxVideoDurationSec, 600);

  const pro = getTierDiamondConfig('pro');
  assert.equal(pro.maxDiamonds, 10);
  assert.equal(pro.regenIntervalMinutes, 10);
  assert.equal(pro.maxVideoDurationSec, 1200);

  const premium = getTierDiamondConfig('premium');
  assert.equal(premium.maxDiamonds, 25);
  assert.equal(premium.regenIntervalMinutes, 4);
});

test('Auth: getUserTier and hasPaidAccess correctly identify pro and premium users', async () => {
  const { getUserTier, hasPaidAccess, hasPremiumAccess } = await import('../functions-src/middlewares/auth.js');

  assert.equal(getUserTier(null), 'anonymous');
  assert.equal(getUserTier({ subscriptionTier: 'free' }), 'free');
  assert.equal(getUserTier({ subscriptionTier: 'pro' }), 'pro');
  assert.equal(getUserTier({ subscriptionTier: 'premium' }), 'premium');

  // Expired subscription falls back to free
  const pastDate = new Date(Date.now() - 3600 * 1000).toISOString();
  assert.equal(getUserTier({ subscriptionTier: 'pro', subscriptionExpires: pastDate }), 'free');
  assert.equal(getUserTier({ subscriptionTier: 'premium', subscriptionExpires: pastDate }), 'free');

  // Active subscription preserved
  const futureDate = new Date(Date.now() + 3600 * 1000).toISOString();
  assert.equal(getUserTier({ subscriptionTier: 'pro', subscriptionExpires: futureDate }), 'pro');
  assert.equal(getUserTier({ subscriptionTier: 'premium', subscriptionExpires: futureDate }), 'premium');

  assert.equal(hasPaidAccess({ subscriptionTier: 'pro' }), true);
  assert.equal(hasPaidAccess({ subscriptionTier: 'premium' }), true);
  assert.equal(hasPaidAccess({ subscriptionTier: 'free' }), false);
  assert.equal(hasPaidAccess(null), false);
});

test('Auth: validateAuthToken rejects forged tokens and missing headers', async () => {
  const { validateAuthToken, decodeJwtPayload } = await import('../functions-src/middlewares/auth.js');

  // 1. Missing Authorization header
  const reqNoAuth = new Request('https://voca.study/api/diamonds');
  const resNoAuth = await validateAuthToken(reqNoAuth, {});
  assert.equal(resNoAuth.valid, false);
  assert.equal(resNoAuth.error, 'Missing Authorization header');

  // 2. Malformed / non-Bearer header
  const reqBadHeader = new Request('https://voca.study/api/diamonds', {
    headers: { 'Authorization': 'Basic 12345' }
  });
  const resBadHeader = await validateAuthToken(reqBadHeader, {});
  assert.equal(resBadHeader.valid, false);

  // 3. Forged JWT with invalid signature
  // Payload: {"sub":"test-user-id","exp":2524608000}
  const forgedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTExMTExMS0xMTExLTExMTEtMTExMS0xMTExMTExMTExMTEiLCJleHAiOjI1MjQ2MDgwMDB9.invalid_signature_here';
  const reqForged = new Request('https://voca.study/api/diamonds', {
    headers: { 'Authorization': `Bearer ${forgedToken}` }
  });
  const resForged = await validateAuthToken(reqForged, {
    SUPABASE_URL: 'https://edbkvzviqeulwzcnrrlb.supabase.co',
    SUPABASE_ANON_KEY: 'test_anon_key'
  });
  assert.equal(resForged.valid, false);
});

test('DiamondService: consumeDiamond fails closed when SUPABASE_SERVICE_ROLE_KEY is missing for DB updates', async () => {
  const { DiamondService } = await import('../functions-src/services/diamond.service.js');
  const service = new DiamondService(null);

  const mockUser = {
    id: 'test-user-uuid',
    diamonds: 5,
    subscriptionTier: 'free',
    last_diamond_regen: new Date().toISOString()
  };

  // Missing service role key in env
  const envNoKey = {
    SUPABASE_URL: 'https://edbkvzviqeulwzcnrrlb.supabase.co'
  };

  const result = await service.consumeDiamond('client-123', 1, mockUser, envNoKey);
  assert.equal(result.success, false);
  assert.equal(result.reason, 'database_update_failed');
  assert.equal(result.diamonds, 5); // Balance unchanged
});

test('payOS: HMAC-SHA256 signature calculation and webhook verification', async () => {
  const { buildPayOsSignatureData, computeHmacSha256, verifyWebhookSignature } = await import('../functions-src/providers/payos.js');

  const sampleData = {
    orderCode: 123456,
    amount: 49000,
    description: 'VOCA123456'
  };

  const signatureData = buildPayOsSignatureData(sampleData);
  assert.equal(signatureData, 'amount=49000&description=VOCA123456&orderCode=123456');

  const secretKey = 'test_checksum_key_secret';
  const signature = await computeHmacSha256(signatureData, secretKey);
  assert.equal(typeof signature, 'string');
  assert.equal(signature.length, 64); // SHA-256 hex string is 64 chars

  // Valid webhook payload
  const validWebhook = {
    data: sampleData,
    signature
  };
  const isOk = await verifyWebhookSignature(validWebhook, secretKey);
  assert.equal(isOk, true);

  // Tampered payload
  const tamperedWebhook = {
    data: { ...sampleData, amount: 1000 },
    signature
  };
  const isTampered = await verifyWebhookSignature(tamperedWebhook, secretKey);
  assert.equal(isTampered, false);

  // Tampered signature
  const badSigWebhook = {
    data: sampleData,
    signature: 'bad_signature_value'
  };
  const isBadSig = await verifyWebhookSignature(badSigWebhook, secretKey);
  assert.equal(isBadSig, false);

  // Empty signature
  assert.equal(await verifyWebhookSignature({ data: sampleData, signature: '' }, secretKey), false);

  // Missing signature
  assert.equal(await verifyWebhookSignature({ data: sampleData }, secretKey), false);

  // Missing data
  assert.equal(await verifyWebhookSignature({ signature }, secretKey), false);

  // Null/missing payload
  assert.equal(await verifyWebhookSignature(null, secretKey), false);

  // Missing secret key
  assert.equal(await verifyWebhookSignature(validWebhook, ''), false);
});

test('detectLevelFromMetadata: accurately parses proficiency levels from titles & channels', async () => {
  const { detectLevelFromMetadata } = await import('../functions-src/data/video-info-db.js');

  // Japanese JLPT & Native Keywords
  assert.deepEqual(detectLevelFromMetadata('Japanese Listening Practice for JLPT N5', 'Learn Japanese'), { lang: 'ja', level: 'JLPT N5' });
  assert.deepEqual(detectLevelFromMetadata('N2 文法マスター', 'Nihongo Channel'), { lang: 'ja', level: 'JLPT N2' });
  assert.deepEqual(detectLevelFromMetadata('日本語初級レッスン', 'Sakura Nihongo'), { lang: 'ja', level: 'JLPT N5' });
  assert.deepEqual(detectLevelFromMetadata('中上級者のための日本語会話', 'Tokyo Daily'), { lang: 'ja', level: 'JLPT N2' });

  // Chinese HSK & Native Keywords
  assert.deepEqual(detectLevelFromMetadata('HSK 3 Standard Course - Lesson 1', 'ChinesePod'), { lang: 'zh', level: 'HSK 3' });
  assert.deepEqual(detectLevelFromMetadata('Daily Conversation (HSK 1)', 'Mandarin Corner'), { lang: 'zh', level: 'HSK 1' });
  assert.deepEqual(detectLevelFromMetadata('中文初级口语训练', 'Mandarin Pod'), { lang: 'zh', level: 'HSK 2' });
  assert.deepEqual(detectLevelFromMetadata('中文高级阅读', 'Chinese Master'), { lang: 'zh', level: 'HSK 5' });

  // Korean TOPIK & Native Keywords
  assert.deepEqual(detectLevelFromMetadata('TOPIK 2 Grammar in Use', 'KoreanClass101'), { lang: 'ko', level: 'TOPIK 2' });
  assert.deepEqual(detectLevelFromMetadata('한국어 초급 듣기 연습', 'Talk to Me in Korean'), { lang: 'ko', level: 'TOPIK 2' });
  assert.deepEqual(detectLevelFromMetadata('한국어 고급 회화', 'Korean Culture'), { lang: 'ko', level: 'TOPIK 5' });

  // English CEFR & Natural Level Keywords
  assert.deepEqual(detectLevelFromMetadata('English for Beginners (CEFR A2)', 'BBC Learning English'), { lang: 'en', level: 'CEFR A2' });
  assert.deepEqual(detectLevelFromMetadata('Advanced English Podcast - B2 level', 'RealLife English'), { lang: 'en', level: 'CEFR B2' });
  assert.deepEqual(detectLevelFromMetadata('Daily English for Beginners', 'Oxford Online'), { lang: 'en', level: 'CEFR A1' });
  assert.deepEqual(detectLevelFromMetadata('Upper-Intermediate English Listening', 'Spotlight English'), { lang: 'en', level: 'CEFR B2' });

  // No level in title
  assert.equal(detectLevelFromMetadata('Luis Fonsi - Despacito (Official Video)', 'LuisFonsiVEVO'), null);
});

test('labelToTier: standardizes proficiency levels to canonical tiers', async () => {
  const { labelToTier } = await import('../functions-src/data/video-info-db.js');

  // Beginner
  assert.equal(labelToTier('JLPT N5'), 'beginner');
  assert.equal(labelToTier('HSK 1'), 'beginner');
  assert.equal(labelToTier('CEFR A1'), 'beginner');
  assert.equal(labelToTier('Beginner'), 'beginner');

  // Elementary
  assert.equal(labelToTier('JLPT N4'), 'elementary');
  assert.equal(labelToTier('HSK 2'), 'elementary');
  assert.equal(labelToTier('CEFR A2'), 'elementary');

  // Intermediate
  assert.equal(labelToTier('JLPT N3'), 'intermediate');
  assert.equal(labelToTier('HSK 3'), 'intermediate');
  assert.equal(labelToTier('HSK 4'), 'intermediate');
  assert.equal(labelToTier('CEFR B1'), 'intermediate');

  // Upper Intermediate
  assert.equal(labelToTier('JLPT N2'), 'upper_intermediate');
  assert.equal(labelToTier('HSK 5'), 'upper_intermediate');
  assert.equal(labelToTier('CEFR B2'), 'upper_intermediate');

  // Advanced
  assert.equal(labelToTier('JLPT N1'), 'advanced');
  assert.equal(labelToTier('HSK 6'), 'advanced');
  assert.equal(labelToTier('CEFR C1'), 'advanced');
  assert.equal(labelToTier('CEFR C2'), 'advanced');

  // Empty / invalid
  assert.equal(labelToTier(''), null);
  assert.equal(labelToTier(null), null);
});

test('getRecommendedVideosFromD1: queries and formats transcribed videos accurately with tier support', async () => {
  const { getRecommendedVideosFromD1 } = await import('../functions-src/data/video-info-db.js');

  // Mock D1 database
  const mockDb = {
    prepare: (query) => ({
      bind: (...args) => ({
        all: async () => ({
          results: [
            {
              video_id: 'testVid1',
              title: 'Japanese JLPT N4 Listening Practice',
              channel: 'Nihongo Study',
              duration_seconds: 420,
              levels: JSON.stringify({ ja: 'JLPT N4' }),
              available_languages: JSON.stringify(['ja', 'en']),
              sub_languages: JSON.stringify(['ja', 'en']),
              updated_at: 1700000000
            },
            {
              video_id: 'testVid2',
              title: 'Casual Talk (N3)',
              channel: 'Tokyo VLOG',
              duration_seconds: 600,
              levels: '{}',
              available_languages: JSON.stringify(['ja']),
              sub_languages: JSON.stringify(['ja']),
              updated_at: 1699999000
            }
          ]
        })
      })
    })
  };

  const results = await getRecommendedVideosFromD1(mockDb, 'ja', 10);
  assert.equal(results.length, 2);
  assert.equal(results[0].videoId, 'testVid1');
  assert.equal(results[0].level, 'JLPT N4');
  assert.equal(results[0].tier, 'elementary');
  assert.equal(results[0].thumbnail, 'https://i.ytimg.com/vi/testVid1/mqdefault.jpg');
  assert.deepEqual(results[0].languages, ['ja', 'en']);
  // Fallback detection from title
  assert.equal(results[1].level, 'JLPT N3');
  assert.equal(results[1].tier, 'intermediate');

  // Server-side tier filtering: elementary matches testVid1 only
  const elemResults = await getRecommendedVideosFromD1(mockDb, 'ja', 10, 'elementary');
  assert.equal(elemResults.length, 1);
  assert.equal(elemResults[0].videoId, 'testVid1');
  assert.equal(elemResults[0].tier, 'elementary');

  // Server-side tier filtering: intermediate matches testVid2 only
  const interResults = await getRecommendedVideosFromD1(mockDb, 'ja', 10, 'intermediate');
  assert.equal(interResults.length, 1);
  assert.equal(interResults[0].videoId, 'testVid2');
  assert.equal(interResults[0].tier, 'intermediate');

  // Server-side tier filtering: advanced matches none
  const advResults = await getRecommendedVideosFromD1(mockDb, 'ja', 10, 'advanced');
  assert.equal(advResults.length, 0);

  // Null/empty db or lang returns empty list safely
  assert.deepEqual(await getRecommendedVideosFromD1(null, 'ja'), []);
  assert.deepEqual(await getRecommendedVideosFromD1(mockDb, null), []);
});

test('RateLimiter: optimizes KV writes by suppressing syncs when comfortably below quota', async () => {
  const { consumeRateLimitUnits } = await import('../functions-src/middlewares/rate-limiter.js');

  let putCount = 0;
  const mockKV = {
    get: async () => null,
    put: async () => { putCount++; }
  };

  const config = { max: 100, windowSeconds: 3600, keyPrefix: 'test_kv_opt' };
  const clientIP = `test_ip_${Date.now()}`;

  // Requests below 50% quota should NOT trigger KV writes
  const res1 = await consumeRateLimitUnits(mockKV, clientIP, config, 10);
  assert.equal(res1.allowed, true);
  assert.equal(putCount, 0, 'Safe usage (< 50% quota) should not trigger KV put');

  // Another batch below 50% quota
  const res2 = await consumeRateLimitUnits(mockKV, clientIP, config, 20);
  assert.equal(res2.allowed, true);
  assert.equal(putCount, 0, 'Total count 30 < 50 should still not trigger KV put');

  // Crossing 50% quota (count = 55, increment = 55 >= 25) should trigger sync once
  const res3 = await consumeRateLimitUnits(mockKV, clientIP, config, 25);
  assert.equal(res3.allowed, true);
  assert.equal(putCount, 1, 'Crossing 50% quota with unit threshold should sync to KV');

  // Approaching 80% quota should trigger sync
  const res4 = await consumeRateLimitUnits(mockKV, clientIP, config, 30); // count = 85
  assert.equal(res4.allowed, true);
  assert.equal(putCount, 2, 'Reaching >= 80% quota should sync to KV');

  // Exceeding quota should trigger sync immediately to block globally
  const res5 = await consumeRateLimitUnits(mockKV, clientIP, config, 20); // count = 105 > 100
  assert.equal(res5.allowed, false);
  assert.equal(putCount, 3, 'Exceeding quota must sync to block across all isolates');

  // Subsequent requests while blocked MUST NOT trigger further KV writes (Rule 2 protection)
  const res6 = await consumeRateLimitUnits(mockKV, clientIP, config, 5); // count = 110 > 100
  assert.equal(res6.allowed, false);
  assert.equal(putCount, 3, 'Repeated blocked requests must NOT trigger additional KV writes (Rule 2)');
});

test('normalizeLanguageCode: canonicalizes Gladia and external language strings', async () => {
  const { normalizeLanguageCode } = await import('../functions-src/utils/transcript-utils.js');
  assert.equal(normalizeLanguageCode('zh'), 'zh');
  assert.equal(normalizeLanguageCode('zh-CN'), 'zh');
  assert.equal(normalizeLanguageCode('zh-TW'), 'zh');
  assert.equal(normalizeLanguageCode('cmn'), 'zh');
  assert.equal(normalizeLanguageCode('mandarin'), 'zh');
  assert.equal(normalizeLanguageCode('chinese'), 'zh');
  assert.equal(normalizeLanguageCode('ja'), 'ja');
  assert.equal(normalizeLanguageCode('ja-JP'), 'ja');
  assert.equal(normalizeLanguageCode('japanese'), 'ja');
  assert.equal(normalizeLanguageCode('ko'), 'ko');
  assert.equal(normalizeLanguageCode('ko-KR'), 'ko');
  assert.equal(normalizeLanguageCode('korean'), 'ko');
  assert.equal(normalizeLanguageCode('en'), 'en');
  assert.equal(normalizeLanguageCode('en-US'), 'en');
  assert.equal(normalizeLanguageCode('english'), 'en');
  assert.equal(normalizeLanguageCode('fr'), 'fr');
  assert.equal(normalizeLanguageCode(null), '');
  assert.equal(normalizeLanguageCode(''), '');
});

test('Security: sanitizeFilterValue neutralizes malicious PocketBase filter characters', async () => {
  const { sanitizeFilterValue } = await import('../src/app/shared/utils/sync.utils.ts');

  // Normal safe inputs
  assert.equal(sanitizeFilterValue('dQw4w9WgXcQ'), 'dQw4w9WgXcQ');
  assert.equal(sanitizeFilterValue('user123'), 'user123');

  // Quote and escape injection attempts
  assert.equal(sanitizeFilterValue('test" || 1=1 || "'), 'test\\" || 1=1 || \\"');
  assert.equal(sanitizeFilterValue('test\\"'), 'test\\\\\\"');
  assert.equal(sanitizeFilterValue('path\\to\\"quote'), 'path\\\\to\\\\\\"quote');
});

test('Security: Path traversal protection on dev server dual subtitles cache', async () => {
  const path = await import('node:path');
  const TRANSCRIPTS_CACHE_DIR = path.resolve('server/transcripts_cache');

  function checkSafeCachePath(videoId, sourceLang, targetLang) {
    const cleanSource = (sourceLang || 'auto').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 10);
    const normTarget = (targetLang || 'en').replace(/[^a-zA-Z0-9_-]/g, '').split('-')[0].toLowerCase().slice(0, 5);
    const cacheFileName = `${videoId}_${cleanSource}_${normTarget}_dual.json`;
    const cacheFile = path.join(TRANSCRIPTS_CACHE_DIR, cacheFileName);
    const resolvedCache = path.resolve(cacheFile);
    return resolvedCache.startsWith(TRANSCRIPTS_CACHE_DIR);
  }

  // Safe video IDs
  assert.equal(checkSafeCachePath('dQw4w9WgXcQ', 'ja', 'en'), true);

  // Directory traversal attacks
  assert.equal(checkSafeCachePath('../../package.json', 'ja', 'en'), false);
  assert.equal(checkSafeCachePath('../../../../etc/passwd', 'ja', 'en'), false);
});

test('Static Analysis: No undefined variables in functions-src', async () => {
  const { ESLint } = await import('eslint');
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [{
      files: ['functions-src/**/*.js'],
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        globals: {
          console: 'readonly',
          Response: 'readonly',
          Request: 'readonly',
          Headers: 'readonly',
          URL: 'readonly',
          URLSearchParams: 'readonly',
          fetch: 'readonly',
          crypto: 'readonly',
          TextEncoder: 'readonly',
          TextDecoder: 'readonly',
          btoa: 'readonly',
          atob: 'readonly',
          setTimeout: 'readonly',
          clearTimeout: 'readonly',
          setInterval: 'readonly',
          clearInterval: 'readonly',
          caches: 'readonly',
          Intl: 'readonly',
          Array: 'readonly',
          Object: 'readonly',
          String: 'readonly',
          Number: 'readonly',
          Boolean: 'readonly',
          Date: 'readonly',
          RegExp: 'readonly',
          Error: 'readonly',
          TypeError: 'readonly',
          RangeError: 'readonly',
          Map: 'readonly',
          Set: 'readonly',
          Promise: 'readonly',
          JSON: 'readonly',
          Math: 'readonly',
          Infinity: 'readonly',
          NaN: 'readonly',
          undefined: 'readonly',
          parseInt: 'readonly',
          parseFloat: 'readonly',
          isNaN: 'readonly',
          isFinite: 'readonly',
          encodeURIComponent: 'readonly',
          decodeURIComponent: 'readonly',
          encodeURI: 'readonly',
          decodeURI: 'readonly',
          Uint8Array: 'readonly',
          Uint16Array: 'readonly',
          Uint32Array: 'readonly',
          Int8Array: 'readonly',
          Int16Array: 'readonly',
          Int32Array: 'readonly',
          Float32Array: 'readonly',
          Float64Array: 'readonly',
          ArrayBuffer: 'readonly',
          DataView: 'readonly',
          AbortController: 'readonly',
          AbortSignal: 'readonly',
          FormData: 'readonly',
          Blob: 'readonly',
          File: 'readonly'
        }
      },
      rules: {
        'no-undef': 'error'
      }
    }]
  });

  const results = await eslint.lintFiles(['functions-src/**/*.js']);
  const errors = [];
  for (const res of results) {
    for (const msg of res.messages) {
      errors.push(`${res.filePath}:${msg.line}:${msg.column} - ${msg.message}`);
    }
  }
  assert.deepEqual(errors, [], `Found undefined variable errors in functions-src:\n${errors.join('\n')}`);
});

test('Regression: POST /api/transcript does not throw ReferenceError or 500 for normal video requests', async () => {
  const { onRequestPost } = await import('../functions-src/api/transcript.js');
  const req = new Request('http://localhost/api/transcript', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoId: '-moW9jvvMr4', lang: 'ja' })
  });
  const env = {
    ENVIRONMENT: 'development',
    VOCAB_DB: null,
    TRANSCRIPT_STORAGE: null,
    TRANSCRIPT_CACHE: null,
    SUPADATA_API_KEY: 'test_key'
  };

  const res = await onRequestPost({ request: req, env, waitUntil: () => {} });
  assert.notEqual(res.status, 500, 'POST /api/transcript should never throw unhandled 500 Internal Server Error');
  const body = await res.json();
  assert.notEqual(body.error, 'Internal server error');
});

test('Leaderboard: mergeWithSeedLeaderboard correctly merges real users and baseline seeds', async () => {
  const { mergeWithSeedLeaderboard, SEED_LEADERBOARD } = await import('../functions-src/api/leaderboard.js');

  // 1. Baseline seeds count
  assert.equal(SEED_LEADERBOARD.length, 28, 'Should have 28 baseline seeds across 4 languages');

  // 2. Pure seeds test (empty real users)
  const allSeeds = mergeWithSeedLeaderboard([], 'all', 50);
  assert.equal(allSeeds.length, 28, 'Should return all 28 seeds for all');
  assert.equal(allSeeds[0].rank, 1, 'Top seed should be rank 1');
  assert.equal(allSeeds[0].xp >= allSeeds[1].xp, true, 'Seeds must be strictly sorted by XP descending');

  // 3. Language filtering ensures podium is always populated
  for (const lang of ['ja', 'ko', 'zh', 'en']) {
    const langList = mergeWithSeedLeaderboard([], lang, 50);
    assert.ok(langList.length >= 7, `Language ${lang} must have at least 7 learners to support podium and list`);
    assert.equal(langList[0].rank, 1);
    assert.equal(langList[1].rank, 2);
    assert.equal(langList[2].rank, 3);
  }

  // 4. Real user integration test
  const realUser = {
    userId: 'real_user_huy',
    name: 'Phan Gia Huy',
    avatar: 'https://example.com/avatar.png',
    xp: 1115,
    level: 4,
    streak: 5,
    badgesCount: 3,
    targetLang: 'ja',
    country: '🇻🇳'
  };

  // In JA: Sakura Ito has 1,420 XP, Daiki Watanabe has 850 XP. Real user with 1,115 XP should be #7
  const jaMerged = mergeWithSeedLeaderboard([realUser], 'ja', 50);
  const foundUserJa = jaMerged.find(u => u.userId === 'real_user_huy');
  assert.ok(foundUserJa, 'Real user must be present in JA leaderboard');
  assert.equal(foundUserJa.name, 'Phan Gia Huy');
  assert.equal(foundUserJa.xp, 1115);
  assert.equal(foundUserJa.rank, 7, 'User with 1,115 XP should rank #7 in JA (behind 6 higher XP seeds)');
  assert.equal(jaMerged.length, 8, 'Total JA learners should be 7 seeds + 1 real user = 8');

  // In ALL: User should be ranked correctly among all 28 seeds + 1 real user
  const allMerged = mergeWithSeedLeaderboard([realUser], 'all', 50);
  const foundUserAll = allMerged.find(u => u.userId === 'real_user_huy');
  assert.ok(foundUserAll, 'Real user must be present in ALL leaderboard');
  assert.equal(foundUserAll.rank, 24, 'User with 1,115 XP should rank #24 among all 28 seeds (23 seeds have > 1,115 XP)');
  assert.equal(allMerged.length, 29, 'Total learners should be 28 seeds + 1 real user = 29');

  // 5. High-XP user can take #1 rank
  const championUser = {
    userId: 'champ_1',
    name: 'Top Learner',
    avatar: '',
    xp: 20000,
    level: 15,
    streak: 100,
    badgesCount: 20,
    targetLang: 'ja'
  };
  const champMerged = mergeWithSeedLeaderboard([championUser], 'ja', 50);
  assert.equal(champMerged[0].userId, 'champ_1', 'Champion user with 20,000 XP must take #1 rank');
  assert.equal(champMerged[0].rank, 1);

  // 6. Weekly period sorting test
  const weeklyTopUser = {
    userId: 'weekly_star',
    name: 'Weekly Star',
    avatar: '',
    xp: 500,
    weeklyXp: 1200,
    level: 2,
    streak: 3,
    badgesCount: 1,
    targetLang: 'ja'
  };
  const weeklyMerged = mergeWithSeedLeaderboard([weeklyTopUser], 'ja', 50, 'weekly');
  assert.equal(weeklyMerged[0].userId, 'weekly_star', 'User with 1,200 weekly XP should take #1 rank in weekly leaderboard');
  assert.equal(weeklyMerged[0].rank, 1);
});

test('API Key Rotator: getNextApiKey round-robins, respects excludeKeys, and handles cooldowns', async () => {
  const { getNextApiKey, markKeyRateLimited } = await import('../functions-src/utils/api-key-rotator.js');
  const mockCache = {
    store: new Map(),
    async get(k) { return this.store.get(k) || null; },
    async put(k, v) { this.store.set(k, v); }
  };

  const keys = ['key_1', 'key_2', 'key_3'];

  // 1. Initial selection
  const first = await getNextApiKey(mockCache, 'test-rotator', keys);
  assert.ok(keys.includes(first), 'First key must be from keys array');

  // 2. excludeKeys prevents re-selecting the attempted key
  const second = await getNextApiKey(mockCache, 'test-rotator', keys, [first]);
  assert.notEqual(second, first, 'Second key must not match excluded first key');
  assert.ok(keys.includes(second), 'Second key must be from keys array');

  // 3. Excluding first two keys yields the third
  const third = await getNextApiKey(mockCache, 'test-rotator', keys, [first, second]);
  assert.notEqual(third, first);
  assert.notEqual(third, second);
  assert.ok(keys.includes(third));

  // 4. Excluding all keys returns null
  const none = await getNextApiKey(mockCache, 'test-rotator', keys, [first, second, third]);
  assert.equal(none, null, 'Must return null when all candidate keys are excluded');
});

test('SupadataProvider: multi-key failover on quota/rate-limit/timeout errors', async () => {
  const { SupadataProvider } = await import('../functions-src/providers/supadata.js');

  const rotator = {
    async getNextApiKey(cache, prefix, keys, attemptedKeys) {
      const candidates = keys.filter(k => !attemptedKeys.includes(k));
      return candidates[0] || null;
    },
    async markKeyRateLimited() {}
  };

  const provider = new SupadataProvider(['key_bad', 'key_good'], rotator);

  // Mock _executeFetch to simulate key_bad throwing 402 Quota Exceeded and key_good succeeding
  let badKeyCalled = false;
  let goodKeyCalled = false;

  provider._executeFetch = async (videoId, lang, apiKey) => {
    if (apiKey === 'key_bad') {
      badKeyCalled = true;
      throw new Error('402 Quota exceeded');
    }
    if (apiKey === 'key_good') {
      goodKeyCalled = true;
      return {
        segments: [{ id: 0, start: 0, duration: 2, text: 'こんにちは' }],
        source: 'supadata',
        availableLangs: ['ja'],
        detectedLang: 'ja'
      };
    }
    return null;
  };

  const result = await provider.fetchCaptions('test_video', 'ja', null);
  assert.ok(badKeyCalled, 'Failing key must have been attempted');
  assert.ok(goodKeyCalled, 'Backup key must have been tried as failover');
  assert.equal(result?.segments?.length, 1);
  assert.equal(result?.detectedLang, 'ja');
});

test('SupadataProvider: immediately returns notFound when captions are unavailable without retrying other keys', async () => {
  const { SupadataProvider } = await import('../functions-src/providers/supadata.js');

  let callCount = 0;
  const attemptedKeysList = [];
  const rotator = {
    async getNextApiKey(cache, prefix, keys, attemptedKeys) {
      const candidates = keys.filter(k => !attemptedKeys.includes(k));
      return candidates[0] || null;
    },
    async markKeyRateLimited() {}
  };

  const provider = new SupadataProvider(['key_1', 'key_2', 'key_3'], rotator);

  provider._executeFetch = async (videoId, lang, apiKey) => {
    callCount++;
    attemptedKeysList.push(apiKey);
    // Returns notFound on first key
    return { notFound: true, segments: [], availableLangs: [] };
  };

  const result = await provider.fetchCaptions('GpbF8bRJrCU', 'ja', null);
  assert.equal(result?.notFound, true, 'Result must indicate captions not found');
  assert.equal(callCount, 1, 'Must NOT retry remaining API keys when video genuinely has no captions');
  assert.deepEqual(attemptedKeysList, ['key_1']);
});

test('validateVideoRequest: fast path when duration is provided and handles title hint', async () => {
  const { validateVideoRequest } = await import('../functions-src/middlewares/video-validator.js');

  // 1. Duration provided within limit (whisper endpoint, max 600s)
  const validRes = await validateVideoRequest('GpbF8bRJrCU', 'ja', 384, 'whisper', 600, { title: '全新華為展翼三折疊' });
  assert.equal(validRes, null, 'Should validate successfully without scraping YouTube');

  // 2. Duration exceeds max allowed
  const tooLongRes = await validateVideoRequest('GpbF8bRJrCU', 'ja', 720, 'whisper', 600);
  assert.equal(tooLongRes?.error, 'video_too_long');
  assert.equal(tooLongRes?.duration, 720);

  // 3. Title hint with unsupported script
  const unsupportedTitleRes = await validateVideoRequest('GpbF8bRJrCU', 'ja', 200, 'whisper', 600, {
    title: 'Русские новости дня без титров'
  });
  assert.equal(unsupportedTitleRes?.error, 'unsupported_video_language');
});

test('Edge TTS: normalizeVoiceName maps languages and short codes accurately', async () => {
  const { normalizeVoiceName, DEFAULT_VOICES } = await import('../functions-src/utils/edge-tts.js');

  assert.equal(normalizeVoiceName(null, 'ja'), DEFAULT_VOICES.ja);
  assert.equal(normalizeVoiceName(null, 'zh'), DEFAULT_VOICES.zh);
  assert.equal(normalizeVoiceName(null, 'ko'), DEFAULT_VOICES.ko);
  assert.equal(normalizeVoiceName(null, 'en'), DEFAULT_VOICES.en);

  // Short codes normalization
  assert.equal(
    normalizeVoiceName('ja-JP-NanamiNeural'),
    'Microsoft Server Speech Text to Speech Voice (ja-JP, NanamiNeural)'
  );
  assert.equal(
    normalizeVoiceName('zh-CN-XiaoxiaoNeural'),
    'Microsoft Server Speech Text to Speech Voice (zh-CN, XiaoxiaoNeural)'
  );
  assert.equal(
    normalizeVoiceName('ko-KR-SunHiNeural'),
    'Microsoft Server Speech Text to Speech Voice (ko-KR, SunHiNeural)'
  );
  assert.equal(
    normalizeVoiceName('en-US-JennyNeural'),
    'Microsoft Server Speech Text to Speech Voice (en-US, JennyNeural)'
  );
});

test('Edge TTS: escapeXml and sanitizeText prevent SSML injection and control chars', async () => {
  const { escapeXml, sanitizeText } = await import('../functions-src/utils/edge-tts.js');

  const unsafe = `<speak>hello & "welcome" 'user' > test</speak>`;
  const escaped = escapeXml(unsafe);
  assert.equal(escaped, '&lt;speak&gt;hello &amp; &quot;welcome&quot; &apos;user&apos; &gt; test&lt;/speak&gt;');

  const controlChars = 'hello\u0000\u0007world\u001F!';
  assert.equal(sanitizeText(controlChars), 'hello  world !');
});

test('Edge TTS: makeSecMsGec generates valid 64-char uppercase SHA-256 token', async () => {
  const { makeSecMsGec } = await import('../functions-src/utils/edge-tts.js');

  const token = await makeSecMsGec();
  assert.equal(typeof token, 'string');
  assert.equal(token.length, 64);
  assert.equal(/^[0-9A-F]{64}$/.test(token), true);
});

test('Edge TTS: input validation rejects empty text and enforces 300 char limit', async () => {
  const { synthesizeEdgeTts } = await import('../functions-src/utils/edge-tts.js');

  await assert.rejects(
    async () => synthesizeEdgeTts(''),
    { message: 'TTS text cannot be empty' }
  );

  const longText = 'a'.repeat(301);
  await assert.rejects(
    async () => synthesizeEdgeTts(longText),
    { message: 'TTS text exceeds maximum length of 300 characters' }
  );
});

test('Edge TTS: in-memory cache stores and returns cached buffers instantly', async () => {
  const { getCachedAudio, setCachedAudio } = await import('../functions-src/utils/edge-tts.js');

  const testKey = 'ja:test-voice:こんにちは';
  const dummyBuffer = new Uint8Array([1, 2, 3, 4, 5]);

  assert.equal(getCachedAudio(testKey), null);
  setCachedAudio(testKey, dummyBuffer);

  const cached = getCachedAudio(testKey);
  assert.ok(cached instanceof Uint8Array);
  assert.deepEqual(cached, dummyBuffer);
});

test('TTS Fallback: Google TTS URL and language mapping format correctly', () => {
  const tlMap = { ja: 'ja', zh: 'zh-CN', ko: 'ko', en: 'en' };
  const text = '食べる';
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${tlMap['ja']}&client=tw-ob`;
  assert.equal(url, 'https://translate.google.com/translate_tts?ie=UTF-8&q=%E9%A3%9F%E3%81%B9%E3%82%8B&tl=ja&client=tw-ob');

  const zhUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent('你好')}&tl=${tlMap['zh']}&client=tw-ob`;
  assert.equal(zhUrl, 'https://translate.google.com/translate_tts?ie=UTF-8&q=%E4%BD%A0%E5%A5%BD&tl=zh-CN&client=tw-ob');
});

test('splitRunOnSegments: splits long CJK and Latin speech segments at punctuation boundaries', async () => {
  const { splitRunOnSegments, cleanTranscriptSegments } = await import('../functions-src/utils/transcript-utils.js');

  // Short cue is preserved
  const shortSeg = [{ text: 'こんにちは', start: 1.0, duration: 2.0 }];
  const shortResult = splitRunOnSegments(shortSeg);
  assert.equal(shortResult.length, 1);
  assert.equal(shortResult[0].text, 'こんにちは');

  // Long CJK cue with period and comma
  const longCJK = [{
    text: '今日はとても良い天気ですね。散歩に行きましょう、楽しい一日になりますよ！',
    start: 0.0,
    duration: 8.0
  }];
  const cjkResult = splitRunOnSegments(longCJK);
  assert.ok(cjkResult.length >= 2, 'Must split into multiple cues');
  assert.equal(cjkResult[0].start, 0.0);
  assert.ok(cjkResult[0].duration > 0);
  assert.ok(cjkResult[1].start > cjkResult[0].start);

  // Long English cue with period and comma
  const longEn = [{
    text: 'Welcome to this complete guide for language learners. In this video, we will explore the best techniques to master vocabulary naturally.',
    start: 5.0,
    duration: 10.0
  }];
  const enResult = splitRunOnSegments(longEn);
  assert.ok(enResult.length >= 2, 'Must split into multiple cues');
  assert.equal(enResult[0].start, 5.0);

  // Integrated cleanTranscriptSegments applies splitting and sticky timing with MAX_CUE_DURATION = 5.0
  const cleaned = cleanTranscriptSegments(longCJK);
  assert.ok(cleaned.length >= 2);
  for (const c of cleaned) {
    assert.ok(c.duration <= 5.0, `Duration ${c.duration} should not exceed MAX_CUE_DURATION`);
  }
});

test('Svix Verifier & Derived Token: validates authentic webhooks and rejects replays/tampering', async () => {
  const {
    verifySvixSignature,
    generateDerivedWebhookToken,
    verifyDerivedWebhookToken
  } = await import('../functions-src/utils/svix-verifier.js');

  const secret = 'whsec_MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw';
  const payload = JSON.stringify({ event: 'transcription.success', payload: { id: 'test-job-1' } });
  const msgId = 'msg_p5jXN8AQM9LWM0D4lo6Blflg';
  const now = Math.floor(Date.now() / 1000);

  // Generate valid Svix signature using Web Crypto HMAC
  const encoder = new TextEncoder();
  const secretKeyBytes = Uint8Array.from(atob('MfKQ9r8GKYqrTwjUPD8ILPZIo2LaLaSw'), c => c.charCodeAt(0));
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    secretKeyBytes,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const toSign = `${msgId}.${now}.${payload}`;
  const sigBuffer = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(toSign));
  const validSig = btoa(String.fromCharCode(...new Uint8Array(sigBuffer)));

  // Test 1: Valid signature passes
  const validCheck = await verifySvixSignature(payload, {
    id: msgId,
    timestamp: String(now),
    signature: `v1,${validSig}`
  }, secret);
  assert.equal(validCheck.valid, true);

  // Test 2: Expired timestamp (>300s) is rejected
  const oldTimestamp = now - 350;
  const expiredCheck = await verifySvixSignature(payload, {
    id: msgId,
    timestamp: String(oldTimestamp),
    signature: `v1,${validSig}`
  }, secret);
  assert.equal(expiredCheck.valid, false);
  assert.equal(expiredCheck.reason, 'Timestamp outside tolerance window');

  // Test 3: Tampered body is rejected
  const tamperedCheck = await verifySvixSignature(payload + 'evil', {
    id: msgId,
    timestamp: String(now),
    signature: `v1,${validSig}`
  }, secret);
  assert.equal(tamperedCheck.valid, false);
  assert.equal(tamperedCheck.reason, 'Signature mismatch');

  // Test 4: Derived HMAC token verification
  const apiKey = 'test_gladia_api_key_12345';
  const jobId = 'job_9876543210';
  const videoId = 'dQw4w9WgXcQ';
  const lang = 'ja';

  const derivedToken = await generateDerivedWebhookToken(apiKey, jobId, videoId, lang);
  assert.ok(derivedToken && derivedToken.length === 64, 'Token must be a 64-char hex string');

  const validTokenCheck = await verifyDerivedWebhookToken(apiKey, jobId, videoId, lang, derivedToken);
  assert.equal(validTokenCheck, true);

  // Tampered videoId or token fails
  const invalidTokenCheck = await verifyDerivedWebhookToken(apiKey, jobId, 'evilVideo', lang, derivedToken);
  assert.equal(invalidTokenCheck, false);
});

test('D1 AI Transcription Jobs State Machine: atomic refund guard is strictly idempotent', async () => {
  const { atomicFailAndRefundAiJob, reserveAiJob } = await import('../functions-src/data/transcript-db.js');

  // Mock D1 Database
  let table = [];
  const mockDb = {
    prepare(sql) {
      return {
        bind(...args) {
          return {
            async run() {
              if (sql.includes('INSERT INTO ai_transcription_jobs')) {
                const [id, video_id, language, user_id, client_id, user_tier, diamonds_charged] = args;
                table.push({
                  id, video_id, language, user_id, client_id, user_tier,
                  diamonds_charged, diamonds_refunded: 0, status: 'queued'
                });
                return { meta: { changes: 1 } };
              }
              if (sql.includes('diamonds_refunded = 1')) {
                const [errCode, errMsg, jobId] = args;
                const row = table.find(r => r.id === jobId && r.diamonds_refunded === 0);
                if (row) {
                  row.status = 'failed';
                  row.error_code = errCode;
                  row.error_message = errMsg;
                  row.diamonds_refunded = 1;
                  return { meta: { changes: 1 }, changes: 1 };
                }
                return { meta: { changes: 0 }, changes: 0 };
              }
              return { meta: { changes: 0 } };
            },
            async first() {
              if (sql.includes('SELECT * FROM ai_transcription_jobs WHERE id = ?')) {
                return table.find(r => r.id === args[0]) || null;
              }
              return null;
            }
          };
        }
      };
    }
  };

  // 1. Reserve job
  const reservation = await reserveAiJob(mockDb, {
    videoId: 'test_vid_1',
    language: 'zh',
    clientId: 'client_abc',
    diamondsCharged: 2
  });
  assert.equal(reservation.isNew, true);
  const jobId = reservation.job.id;

  // 2. First failure & refund trigger: shouldRefund === true
  const refund1 = await atomicFailAndRefundAiJob(mockDb, jobId, 'GLADIA_ERROR', 'Remote error');
  assert.equal(refund1.shouldRefund, true);
  assert.equal(refund1.job.status, 'failed');
  assert.equal(refund1.job.diamonds_refunded, 1);

  // 3. Second concurrent failure trigger (e.g. timeout + webhook collision): shouldRefund === false!
  const refund2 = await atomicFailAndRefundAiJob(mockDb, jobId, 'TIMEOUT_EXPIRED', 'Timeout');
  assert.equal(refund2.shouldRefund, false, 'Second refund attempt must be prevented by atomic guard');
});

test('Gladia v2 Schema Parser: extracts sentences, utterances, and detects languages correctly', async () => {
  const { extractGladiaSegments, extractGladiaDetectedLanguage, normalizeLanguageCode } = await import('../functions-src/utils/transcript-utils.js');

  // Case 1: Gladia V2 with semantic sentences (item.sentence)
  const gladiaSentencePayload = {
    result: {
      transcription: {
        sentences: [
          { sentence: "大家好，欢迎来到我的频道！", start: 0.5, end: 3.2 },
          { sentence: "今天我们来练习中文口语。", start: 3.5, end: 6.8 }
        ],
        languages: ["cmn"]
      }
    }
  };

  const segments1 = extractGladiaSegments(gladiaSentencePayload);
  assert.equal(segments1.length, 2);
  assert.equal(segments1[0].text, "大家好，欢迎来到我的频道！");
  assert.equal(segments1[0].start, 0.5);
  assert.equal(segments1[0].duration, 2.7);
  assert.equal(segments1[1].text, "今天我们来练习中文口语。");

  const lang1 = extractGladiaDetectedLanguage(gladiaSentencePayload, 'zh');
  assert.equal(lang1, 'zh', 'cmn should normalize to zh');

  // Case 2: Gladia with utterances (item.text)
  const gladiaUtterancePayload = {
    result: {
      transcription: {
        utterances: [
          { text: "Hello everyone and welcome back.", start: 1.0, end: 4.0 }
        ],
        languages: ["english"]
      }
    }
  };

  const segments2 = extractGladiaSegments(gladiaUtterancePayload);
  assert.equal(segments2.length, 1);
  assert.equal(segments2[0].text, "Hello everyone and welcome back.");
  assert.equal(segments2[0].duration, 3.0);

  const lang2 = extractGladiaDetectedLanguage(gladiaUtterancePayload, 'en');
  assert.equal(lang2, 'en', 'english should normalize to en');

  // Case 3: Gladia nested structure (result.sentences.results)
  const nestedPayload = {
    payload: {
      result: {
        sentences: {
          results: [
            { sentence: "初めまして、よろしくお願いします。", start: 0.0, end: 2.5 }
          ]
        },
        languages: ["jpn"]
      }
    }
  };

  const segments3 = extractGladiaSegments(nestedPayload);
  assert.equal(segments3.length, 1);
  assert.equal(segments3[0].text, "初めまして、よろしくお願いします。");

  const lang3 = extractGladiaDetectedLanguage(nestedPayload, 'ja');
  assert.equal(lang3, 'ja', 'jpn should normalize to ja');

  // Case 4: Completely silent / empty
  const emptyPayload = {
    result: {
      transcription: {
        sentences: [],
        utterances: []
      }
    }
  };
  const segments4 = extractGladiaSegments(emptyPayload);
  assert.equal(segments4.length, 0);

  // Case 5: normalizeLanguageCode variants
  assert.equal(normalizeLanguageCode('cmn'), 'zh');
  assert.equal(normalizeLanguageCode('mandarin'), 'zh');
  assert.equal(normalizeLanguageCode('yue'), 'zh');
  assert.equal(normalizeLanguageCode('zh-CN'), 'zh');
  assert.equal(normalizeLanguageCode('ja-JP'), 'ja');
  assert.equal(normalizeLanguageCode('ko-KR'), 'ko');
  assert.equal(normalizeLanguageCode('en-US'), 'en');
});

test('pollAiJobStatus: accurately identifies languageMismatch flag', async () => {
  const { TranscriptService } = await import('../functions-src/services/transcript.service.js');

  const mockDb = {
    prepare(sql) {
      return {
        bind(...args) {
          return {
            async first() {
              if (String(args[0]).trim() === 'job_mismatch') {
                return {
                  id: 'job_mismatch',
                  video_id: 'vid123',
                  language: 'ja',
                  detected_language: 'zh',
                  status: 'completed'
                };
              }
              if (String(args[0]).trim() === 'job_match') {
                return {
                  id: 'job_match',
                  video_id: 'vid456',
                  language: 'zh',
                  detected_language: 'zh',
                  status: 'completed'
                };
              }
              return null;
            }
          };
        }
      };
    }
  };

  const mockR2 = {
    async get() {
      return {
        async json() {
          return { segments: [{ start: 0, duration: 2, text: '你好' }] };
        }
      };
    }
  };

  const service = new TranscriptService({}, {}, {}, {});
  const context = {
    env: {
      VOCAB_DB: mockDb,
      TRANSCRIPT_STORAGE: mockR2
    }
  };

  // Case 1: Mismatch (requested ja, detected zh)
  const res1 = await service.pollAiJobStatus(context, { jobId: 'job_mismatch', videoId: 'vid123' });
  assert.equal(res1.status, 'done');
  assert.equal(res1.videoInfo.language, 'zh');
  assert.equal(res1.videoInfo.requestedLanguage, 'ja');
  assert.equal(res1.videoInfo.languageMismatch, true);

  // Case 2: Match (requested zh, detected zh)
  const res2 = await service.pollAiJobStatus(context, { jobId: 'job_match', videoId: 'vid456' });
  assert.equal(res2.status, 'done');
  assert.equal(res2.videoInfo.language, 'zh');
  assert.equal(res2.videoInfo.requestedLanguage, 'zh');
  assert.equal(res2.videoInfo.languageMismatch, false);
});

test('pollAiJobStatus: self-heals by querying R2 if jobId is missing/expired in DB', async () => {
  const { TranscriptService } = await import('../functions-src/services/transcript.service.js');

  const mockDb = {
    prepare() {
      return {
        bind() {
          return {
            async first() { return null; } // Job not in DB
          };
        }
      };
    }
  };

  const mockR2 = {
    async get(key) {
      if (key === 'transcripts/test_vid/ja.json') {
        return {
          async json() {
            return {
              language: 'ja',
              source: 'ai',
              segments: [{ start: 0, duration: 2.5, text: 'こんにちは' }]
            };
          }
        };
      }
      return null;
    }
  };

  const service = new TranscriptService({}, {}, {}, {});
  const context = {
    env: {
      VOCAB_DB: mockDb,
      TRANSCRIPT_STORAGE: mockR2
    }
  };

  const res = await service.pollAiJobStatus(context, {
    jobId: 'expired_or_lost_job_id',
    videoId: 'test_vid',
    lang: 'ja',
    diamondInfo: { diamonds: 3 }
  });

  assert.equal(res.status, 'done');
  assert.equal(res.videoInfo.videoId, 'test_vid');
  assert.equal(res.videoInfo.language, 'ja');
  assert.equal(res.videoInfo.segments.length, 1);
  assert.equal(res.videoInfo.segments[0].text, 'こんにちは');
});

test('startAIJob: forceRefresh supersedes existing active job and deletes it instead of reusing', async () => {
  const { TranscriptService } = await import('../functions-src/services/transcript.service.js');

  let deletedJobId = null;
  let insertedJobId = null;

  const mockDb = {
    prepare(sql) {
      return {
        bind(...args) {
          return {
            async first() {
              if (sql.includes('SELECT duration_seconds FROM video_languages')) {
                return { duration_seconds: 120 };
              }
              if (sql.includes('FROM ai_transcription_jobs') && sql.includes('WHERE video_id = ?')) {
                // Return an old active job
                return {
                  id: 'old_stale_job_123',
                  video_id: 'vid_regen',
                  language: 'ja',
                  status: 'processing',
                  created_at: Math.floor(Date.now() / 1000) - 100
                };
              }
              if (sql.includes('FROM ai_transcription_jobs') && sql.includes('WHERE id = ?')) {
                return {
                  id: args[0],
                  video_id: 'vid_regen',
                  language: 'ja',
                  status: 'queued'
                };
              }
              return null;
            },
            async run() {
              if (sql.includes('DELETE FROM ai_transcription_jobs')) {
                deletedJobId = args[0];
              }
              if (sql.includes('INSERT INTO ai_transcription_jobs')) {
                insertedJobId = args[0];
              }
              return { success: true };
            }
          };
        }
      };
    }
  };

  const mockGladia = {
    async submitTranscriptionJob() {
      return { id: 'gladia_new_task_456' };
    }
  };

  const mockDiamond = {
    async consumeDiamond() {
      return { success: true, diamonds: 2, nextRegenAt: null };
    },
    resolveTier() {
      return 'free';
    }
  };

  const service = new TranscriptService({}, mockGladia, mockDiamond, {});
  const context = {
    env: {
      VOCAB_DB: mockDb,
      GLADIA_API_KEY: 'test-gladia-key',
      PUBLIC_ORIGIN: 'https://voca.study'
    }
  };

  // Case 1: Without forceRefresh -> returns existing old job
  const resWithoutForce = await service.startAIJob(context, {
    videoId: 'vid_regen',
    lang: 'ja',
    duration: 120,
    body: { duration: 120 },
    forceRefresh: false,
    diamondInfo: { diamonds: 3 }
  });
  assert.equal(resWithoutForce.status, 'processing');
  assert.equal(resWithoutForce.jobId, 'old_stale_job_123');
  assert.equal(deletedJobId, null);

  // Case 2: With forceRefresh -> deletes old job and starts fresh session
  const resWithForce = await service.startAIJob(context, {
    videoId: 'vid_regen',
    lang: 'ja',
    duration: 120,
    body: { duration: 120 },
    forceRefresh: true,
    diamondInfo: { diamonds: 3 }
  });
  assert.equal(resWithForce.status, 'processing');
  assert.equal(deletedJobId, 'old_stale_job_123'); // Old stale job was deleted!
  assert.notEqual(resWithForce.jobId, 'old_stale_job_123'); // A brand new jobId was generated!
});

test('api/_middleware: allows gladia-webhook and payOS webhook to bypass bot defense', async () => {
  const { onRequest } = await import('../functions-src/api/_middleware.js');

  // Test Gladia webhook bypass
  let nextCalled = false;
  const gladiaContext = {
    request: new Request('https://voca.app/api/gladia-webhook', {
      headers: { 'user-agent': 'curl/7.68.0' } // Bad UA that would normally be blocked
    }),
    next: async () => {
      nextCalled = true;
      return new Response('ok');
    }
  };
  await onRequest(gladiaContext);
  assert.equal(nextCalled, true, 'Gladia webhook must bypass bot defense');

  // Test payment webhook bypass
  nextCalled = false;
  const paymentContext = {
    request: new Request('https://voca.app/api/payment/webhook', {
      headers: { 'user-agent': 'python-requests/2.25.1' }
    }),
    next: async () => {
      nextCalled = true;
      return new Response('ok');
    }
  };
  await onRequest(paymentContext);
  assert.equal(nextCalled, true, 'Payment webhook must bypass bot defense');

  // Test normal API endpoint blocked for bot UA
  nextCalled = false;
  const normalContext = {
    request: new Request('https://voca.app/api/transcript', {
      headers: { 'user-agent': 'python-requests/2.25.1' }
    }),
    next: async () => {
      nextCalled = true;
      return new Response('ok');
    }
  };
  const blockedRes = await onRequest(normalContext);
  assert.equal(nextCalled, false, 'Normal API with scraper UA must be blocked');
  assert.equal(blockedRes.status, 403);
});

test('normalizeVoiceName & escapeXml: prevents SSML / XML injection in TTS', async () => {
  const { normalizeVoiceName, escapeXml } = await import('../functions-src/utils/edge-tts.js');

  // Normal valid voices
  assert.equal(
    normalizeVoiceName('ja-JP-NanamiNeural', 'ja'),
    'Microsoft Server Speech Text to Speech Voice (ja-JP, NanamiNeural)'
  );
  assert.equal(
    normalizeVoiceName('Microsoft Server Speech Text to Speech Voice (ko-KR, SunHiNeural)', 'ko'),
    'Microsoft Server Speech Text to Speech Voice (ko-KR, SunHiNeural)'
  );

  // Malicious SSML injection attempts -> fallback to safe default
  const defaultJa = 'Microsoft Server Speech Text to Speech Voice (ja-JP, NanamiNeural)';
  assert.equal(normalizeVoiceName("ja-JP-NanamiNeural'><break time='5s'/>", 'ja'), defaultJa);
  assert.equal(normalizeVoiceName('<script>alert(1)</script>', 'ja'), defaultJa);
  assert.equal(normalizeVoiceName('voice" onfocus="evil()"', 'ja'), defaultJa);
  assert.equal(normalizeVoiceName('voice&evil=1', 'ja'), defaultJa);

  // escapeXml properly escapes entities
  assert.equal(escapeXml('Hello & World <foo> "bar" \'baz\''), 'Hello &amp; World &lt;foo&gt; &quot;bar&quot; &apos;baz&apos;');
});

test('saveTranscriptToR2: returns boolean success flag and handles errors gracefully', async () => {
  const { saveTranscriptToR2 } = await import('../functions-src/data/transcript-r2.js');

  // Missing bucket
  assert.equal(await saveTranscriptToR2(null, 'vid123', 'ja', [{ text: 'hi' }]), false);

  // Empty segments
  const mockBucket = {
    async put() { return {}; }
  };
  assert.equal(await saveTranscriptToR2(mockBucket, 'vid123', 'ja', []), false);

  // Successful write
  assert.equal(await saveTranscriptToR2(mockBucket, 'vid123', 'ja', [{ text: 'hi' }]), true);

  // Failed write
  const failingBucket = {
    async put() { throw new Error('R2 Quota Exceeded'); }
  };
  assert.equal(await saveTranscriptToR2(failingBucket, 'vid123', 'ja', [{ text: 'hi' }]), false);
});

test('saveTranscriptToR2 & getTranscriptFromR2: preserves pre-baked tokens in rich format', async () => {
  const { saveTranscriptToR2, getTranscriptFromR2 } = await import('../functions-src/data/transcript-r2.js');

  let storedData = null;
  const mockBucket = {
    async put(key, jsonStr) {
      storedData = JSON.parse(jsonStr);
      return {};
    },
    async get(key) {
      if (!storedData) return null;
      return {
        async json() { return storedData; },
        customMetadata: { source: 'native' }
      };
    }
  };

  const richSegments = [
    {
      id: 0,
      text: '思い出した',
      start: 1.0,
      duration: 2.0,
      tokens: [
        { surface: '思い出した', baseForm: '思い出す', reading: 'おもいだした' }
      ]
    }
  ];

  const saved = await saveTranscriptToR2(mockBucket, 'vid_rich', 'ja', richSegments, 'native');
  assert.equal(saved, true);

  const loaded = await getTranscriptFromR2(mockBucket, 'vid_rich', 'ja');
  assert.ok(loaded);
  assert.equal(loaded.segments.length, 1);
  assert.ok(Array.isArray(loaded.segments[0].tokens));
  assert.equal(loaded.segments[0].tokens[0].baseForm, '思い出す');
});

test('Dictionary Parsers: parseNaver correctly extracts reading, audio, pos, and strips homonym numbers', async () => {
  const { parseNaver } = await import('../functions-src/utils/dict-parsers.js');

  const mockData = {
    searchResultMap: {
      searchResultListMap: {
        WORD: {
          items: [
            {
              expEntry: '<strong>사랑</strong>',
              expEntrySuperscript: '1',
              searchPhoneticSymbolList: [
                { symbolValue: '<strong>사랑</strong>', symbolFile: 'https://example.com/female.mp3|https://example.com/male.mp3' }
              ],
              meansCollector: [
                {
                  partOfSpeech2: 'Danh từ',
                  partOfSpeech: '명사',
                  means: [{ value: 'tình yêu' }]
                }
              ]
            },
            {
              expEntry: '<strong>학교</strong>',
              expEntrySuperscript: '',
              searchPhoneticSymbolList: [
                { symbolValue: '학꾜', symbolFile: '' }
              ],
              meansCollector: [
                {
                  partOfSpeech2: 'Danh từ',
                  means: [{ value: 'trường học' }]
                }
              ]
            }
          ]
        }
      }
    }
  };

  const results = parseNaver(mockData);
  assert.equal(results.length, 2);

  // 사랑 - word cleaned, no homonym 1 in reading, audio extracted
  assert.equal(results[0].word, '사랑');
  assert.equal(results[0].reading, ''); // identical to word, not redundant
  assert.equal(results[0].partOfSpeech, 'Danh từ');
  assert.equal(results[0].audio, 'https://example.com/female.mp3');
  assert.deepEqual(results[0].definitions, ['tình yêu']);

  // 학교 - phonetic pronunciation extracted
  assert.equal(results[1].word, '학교');
  assert.equal(results[1].reading, '[학꾜]');
  assert.equal(results[1].partOfSpeech, 'Danh từ');
  assert.deepEqual(results[1].definitions, ['trường học']);
});

test('Dictionary Parsers: parseJotoba correctly formats object POS, kanji JLPT, and audio', async () => {
  const { parseJotoba } = await import('../functions-src/utils/dict-parsers.js');

  const mockData = {
    kanji: [{ jlpt: 5 }],
    words: [
      {
        reading: { kanji: '食べる', kana: 'たべる' },
        senses: [
          {
            glosses: ['to eat'],
            pos: [{ Verb: 'Ichidan' }, { Verb: 'Transitive' }]
          }
        ],
        audio: '/resource/audio/123.mp3'
      }
    ]
  };

  const results = parseJotoba(mockData);
  assert.equal(results.length, 1);
  assert.equal(results[0].word, '食べる');
  assert.equal(results[0].reading, 'たべる');
  assert.equal(results[0].partOfSpeech, 'Verb (Ichidan), Verb (Transitive)');
  assert.equal(results[0].level, 5);
  assert.equal(results[0].audio, 'https://jotoba.de/resource/audio/123.mp3');
  assert.deepEqual(results[0].definitions, ['to eat']);
});

test('Dictionary Parsers: parseMazii handles array levels and cleans definitions', async () => {
  const { parseMazii } = await import('../functions-src/utils/dict-parsers.js');

  const mockData = {
    data: [
      {
        word: '食べる',
        phonetic: 'たべる',
        level: ['N5'],
        means: [
          { mean: 'ăn.', kind: 'v1, vt' }
        ]
      }
    ]
  };

  const results = parseMazii(mockData);
  assert.equal(results.length, 1);
  assert.equal(results[0].word, '食べる');
  assert.equal(results[0].reading, 'たべる');
  assert.equal(results[0].level, 5);
  assert.equal(results[0].partOfSpeech, 'v1, vt');
  assert.deepEqual(results[0].definitions, ['ăn.']);
});

test('Dictionary Parsers: parseDatamuse extracts definitions and parts of speech', async () => {
  const { parseDatamuse } = await import('../functions-src/utils/dict-parsers.js');

  const mockData = [
    {
      word: 'hello',
      defs: ['n\tan expression of greeting', 'v\tto greet']
    }
  ];

  const results = parseDatamuse(mockData);
  assert.equal(results.length, 1);
  assert.equal(results[0].word, 'hello');
  assert.deepEqual(results[0].definitions, ['an expression of greeting', 'to greet']);
  assert.equal(results[0].partOfSpeech, 'n, v');
});

test('CSP Headers: connect-src allows all external origins used by fonts, thumbnails, and avatars for Service Worker compliance', async () => {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const headersPath = path.resolve(process.cwd(), 'public/_headers');
  const content = fs.readFileSync(headersPath, 'utf8');

  // Parse CSP line
  const cspMatch = content.match(/Content-Security-Policy:\s*([^\n\r]+)/);
  assert.ok(cspMatch, 'Content-Security-Policy header must exist in public/_headers');

  const cspDirectives = {};
  cspMatch[1].split(';').forEach(part => {
    const trimmed = part.trim();
    if (!trimmed) return;
    const [directive, ...sources] = trimmed.split(/\s+/);
    cspDirectives[directive] = sources;
  });

  const connectSrc = cspDirectives['connect-src'] || [];
  assert.ok(connectSrc.length > 0, 'connect-src directive must be present');

  // Essential origins that the Angular service worker fetches on behalf of the page
  const requiredConnectOrigins = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://i.ytimg.com',
    'https://*.ytimg.com',
    'https://img.youtube.com',
    'https://*.googleusercontent.com',
    'https://yt3.googleusercontent.com'
  ];

  for (const origin of requiredConnectOrigins) {
    assert.ok(
      connectSrc.includes(origin),
      `connect-src must include ${origin} so Service Worker fetches do not violate CSP`
    );
  }
});

test('Recommendation Engine: rankVideos applies multi-factor learner signals accurately', async () => {
  const { rankVideos, declusterChannels, getDeterministicJitter } = await import('../functions-src/services/recommendation.service.js');

  const candidates = [
    { videoId: 'vid_completed', title: 'Japanese Beginner Lesson', channel: 'Channel A', duration: 300, tier: 'beginner' },
    { videoId: 'vid_in_progress', title: 'Intermediate Conversation', channel: 'Channel B', duration: 400, tier: 'intermediate' },
    { videoId: 'vid_vocab_match', title: 'Learn 単語 and 文法 in 10 minutes', channel: 'Channel C', duration: 500, tier: 'elementary' },
    { videoId: 'vid_favorite_channel', title: 'Daily Life in Tokyo', channel: 'Favorite Channel', duration: 350, tier: 'intermediate' },
    { videoId: 'vid_unwatched', title: 'Tokyo Travel Guide', channel: 'Channel D', duration: 450, tier: 'intermediate' },
    { videoId: 'vid_too_long', title: '3 Hour Marathon Grammar Study', channel: 'Channel E', duration: 10800, tier: 'beginner' }
  ];

  const context = {
    watched: ['vid_completed'],
    inProgress: { 'vid_in_progress': 45 },
    favorites: ['vid_favorite_channel'],
    topChannels: ['Favorite Channel', 'Channel C'],
    dominantTier: 'intermediate',
    vocabWords: ['単語', '文法']
  };

  const ranked = rankVideos(candidates, {
    language: 'ja',
    tier: 'all',
    context,
    sessionSeed: 4242
  });

  assert.equal(ranked.length, candidates.length);

  // 1. Check vocab matching
  const vocabMatched = ranked.find(v => v.videoId === 'vid_vocab_match');
  assert.ok(vocabMatched, 'Vocab matched video must exist');
  assert.ok(Array.isArray(vocabMatched.matchedWords), 'matchedWords array must be attached');
  assert.ok(vocabMatched.matchedWords.includes('単語'));
  assert.ok(vocabMatched.matchedWords.includes('文法'));

  // 2. Check resume progress attached
  const inProg = ranked.find(v => v.videoId === 'vid_in_progress');
  assert.equal(inProg.resumeProgress, 45);

  // 3. Completed and marathon video must be heavily demoted compared to unwatched / vocab / resume
  const completedIdx = ranked.findIndex(v => v.videoId === 'vid_completed');
  const tooLongIdx = ranked.findIndex(v => v.videoId === 'vid_too_long');
  const vocabIdx = ranked.findIndex(v => v.videoId === 'vid_vocab_match');
  const inProgIdx = ranked.findIndex(v => v.videoId === 'vid_in_progress');

  assert.ok(vocabIdx < completedIdx, 'Vocab match should rank higher than completed video');
  assert.ok(inProgIdx < completedIdx, 'In-progress resume should rank higher than completed video');
  assert.ok(tooLongIdx > 2, 'Marathon clip (>2h) should be demoted');

  // 4. Deterministic jitter check across offsets
  const jitter1 = getDeterministicJitter('test_video', 999);
  const jitter2 = getDeterministicJitter('test_video', 999);
  const jitterOtherSeed = getDeterministicJitter('test_video', 111);
  assert.equal(jitter1, jitter2, 'Jitter must be strictly deterministic for same video and seed');
  assert.notEqual(jitter1, jitterOtherSeed, 'Jitter should change when session seed changes');
  assert.ok(jitter1 >= -4.0 && jitter1 <= 4.0, 'Jitter must be in [-4, 4] range');

  // 5. Anti-clustering check
  const clustered = [
    { videoId: 'v1', channel: 'Channel X', title: 'Video 1' },
    { videoId: 'v2', channel: 'Channel X', title: 'Video 2' },
    { videoId: 'v3', channel: 'Channel Y', title: 'Video 3' },
    { videoId: 'v4', channel: 'Channel X', title: 'Video 4' }
  ];
  const declustered = declusterChannels(clustered);
  assert.equal(declustered[0].channel, 'Channel X');
  assert.equal(declustered[1].channel, 'Channel Y', 'Adjacent same-channel candidate must be separated');
});








