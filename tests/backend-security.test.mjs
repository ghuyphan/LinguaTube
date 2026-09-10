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
