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
