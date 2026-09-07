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
      return parsed.protocol === 'https:' && parsed.hostname === 'api.gladia.io';
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
  assert.equal(free.maxVideoDurationSec, 900);

  const pro = getTierDiamondConfig('pro');
  assert.equal(pro.maxDiamonds, 20);
  assert.equal(pro.regenIntervalMinutes, 5);
  assert.equal(pro.maxVideoDurationSec, 1800);
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


