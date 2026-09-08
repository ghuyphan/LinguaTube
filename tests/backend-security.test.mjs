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

  // Japanese JLPT
  assert.deepEqual(detectLevelFromMetadata('Japanese Listening Practice for JLPT N5', 'Learn Japanese'), { lang: 'ja', level: 'JLPT N5' });
  assert.deepEqual(detectLevelFromMetadata('N2 文法マスター', 'Nihongo Channel'), { lang: 'ja', level: 'JLPT N2' });

  // Chinese HSK
  assert.deepEqual(detectLevelFromMetadata('HSK 3 Standard Course - Lesson 1', 'ChinesePod'), { lang: 'zh', level: 'HSK 3' });
  assert.deepEqual(detectLevelFromMetadata('Daily Conversation (HSK 1)', 'Mandarin Corner'), { lang: 'zh', level: 'HSK 1' });

  // Korean TOPIK
  assert.deepEqual(detectLevelFromMetadata('TOPIK 2 Grammar in Use', 'KoreanClass101'), { lang: 'ko', level: 'TOPIK 2' });

  // English CEFR
  assert.deepEqual(detectLevelFromMetadata('English for Beginners (CEFR A2)', 'BBC Learning English'), { lang: 'en', level: 'CEFR A2' });
  assert.deepEqual(detectLevelFromMetadata('Advanced English Podcast - B2 level', 'RealLife English'), { lang: 'en', level: 'CEFR B2' });

  // No level in title
  assert.equal(detectLevelFromMetadata('Random Cat Video', 'Funny Animals'), null);
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
              updated_at: 1700000000
            },
            {
              video_id: 'testVid2',
              title: 'Casual Talk (N3)',
              channel: 'Tokyo VLOG',
              duration_seconds: 600,
              levels: '{}',
              available_languages: JSON.stringify(['ja']),
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



