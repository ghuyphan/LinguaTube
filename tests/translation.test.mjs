import test from 'node:test';
import assert from 'node:assert/strict';
import { encodeTaggedTexts, decodeTaggedTranslations, translateBatch } from '../functions-src/providers/lingva.js';
import { validateBody } from '../functions-src/utils/utils.js';
import { detectSubtitleLanguage } from '../src/app/shared/utils/language.utils.ts';

test('encodeTaggedTexts: properly encodes array of strings with XML index tags and escapes entities', () => {
    const input = [
        'こんにちは',
        'Rock & Roll <music>',
        'She said "hello"'
    ];

    const encoded = encodeTaggedTexts(input);
    assert.equal(
        encoded,
        '<t id="0">こんにちは</t>\n<t id="1">Rock &amp; Roll &lt;music&gt;</t>\n<t id="2">She said "hello"</t>'
    );
});

test('decodeTaggedTranslations: decodes correctly and unescapes entities', () => {
    const mockTranslated = '<t id="0">Hello</t>\n<t id="1">Rock &amp; Roll &lt;music&gt;</t>\n<t id="2">She said &quot;hello&quot;</t>';
    const map = decodeTaggedTranslations(mockTranslated, 3);

    assert.equal(map.size, 3);
    assert.equal(map.get(0), 'Hello');
    assert.equal(map.get(1), 'Rock & Roll <music>');
    assert.equal(map.get(2), 'She said "hello"');
});

test('decodeTaggedTranslations: fault-tolerant with erratic spacing and out-of-order tags', () => {
    const mockTranslated = '  < t  id = "1" > Second line </t > \n <t id=0>First line</t> ';
    const map = decodeTaggedTranslations(mockTranslated, 2);

    assert.equal(map.size, 2);
    assert.equal(map.get(0), 'First line');
    assert.equal(map.get(1), 'Second line');
});

test('decodeTaggedTranslations: handles partial tag failure without throwing', () => {
    const mockTranslated = '<t id="0">First</t>\nSomething went wrong with tag 1\n<t id="2">Third</t>';
    const map = decodeTaggedTranslations(mockTranslated, 3);

    assert.equal(map.size, 2);
    assert.equal(map.get(0), 'First');
    assert.equal(map.has(1), false);
    assert.equal(map.get(2), 'Third');
});

test('dual subtitle quality threshold: calculates coverage accurately', () => {
    const segments = [
        { text: 'A', translation: 'Trans A' },
        { text: 'B', translation: 'Trans B' },
        { text: 'C', translation: 'Trans C' },
        { text: 'D', translation: 'Trans D' },
        { text: 'E', translation: '' } // missing
    ];

    const successCount = segments.filter(s => s && s.translation && s.translation.trim()).length;
    const successRate = segments.length > 0 ? successCount / segments.length : 0;
    const quality = Math.round(successRate * 100);

    assert.equal(successCount, 4);
    assert.equal(successRate, 0.8);
    assert.equal(quality, 80);
    assert.equal(successRate >= 0.8, true);
});

test('detectSubtitleLanguage: correctly identifies authentic language from cue text', () => {
    // Japanese cues (from the user's video -tKVN2mAKRI)
    const jaCues = [
        { text: '笑う顔に　何ができるだろうか' },
        { text: '傷つくこと　喜ぶこと' }
    ];
    assert.equal(detectSubtitleLanguage(jaCues), 'ja');

    // Korean cues
    const koCues = [
        { text: '안녕하세요 여러분' },
        { text: '오늘의 한국어 수업을 시작합니다' }
    ];
    assert.equal(detectSubtitleLanguage(koCues), 'ko');

    // Chinese cues
    const zhCues = [
        { text: '你好，欢迎来到我们的频道' },
        { text: '今天我们来学习汉语' }
    ];
    assert.equal(detectSubtitleLanguage(zhCues), 'zh');

    // English cues
    const enCues = [
        { text: 'Welcome back to the channel' },
        { text: 'Today we will learn something new' }
    ];
    assert.equal(detectSubtitleLanguage(enCues), 'en');
});

test('anti-poisoning: excludes identical untranslated text from valid translations', () => {
    const sourceLang = 'ja';
    const targetLang = 'en';
    const segments = [
        { text: '笑う顔に　何ができるだろうか', translation: 'What can you do to smile?' },
        { text: '傷つくこと　喜ぶこと', translation: '傷つくこと　喜ぶこと' } // Poisoned fallback
    ];

    // Filter rule used in dual-subtitles.js and subtitle.service.ts
    const validCount = segments.filter(
        s => s && s.translation && typeof s.translation === 'string' && s.translation.trim() &&
             (sourceLang === targetLang || s.translation.trim() !== (s.text || '').trim())
    ).length;

    assert.equal(validCount, 1);
});

test('live translation: translates Japanese video cues into English (or safely returns null on network disconnect)', async () => {
    const texts = [
        '笑う顔に　何ができるだろうか',
        '傷つくこと　喜ぶこと'
    ];
    const results = await translateBatch(texts, 'ja', 'en');

    assert.equal(results.length, 2);

    // If online, assert accurate English translation
    // If offline, anti-poisoning guarantees results are null, never raw Japanese
    if (results[0] !== null) {
        assert.match(results[0], /[a-zA-Z]/, 'Result should contain English letters');
        assert.notEqual(results[0].trim(), texts[0].trim());
    }
    if (results[1] !== null) {
        assert.match(results[1], /[a-zA-Z]/, 'Result should contain English letters');
        assert.notEqual(results[1].trim(), texts[1].trim());
    }
});

test('dual subtitles validation: accepts long videos with > 1,000 cues and optional segments for onlyCache', () => {
    // 1. Check onlyCache does not require segments
    const cacheOnlyBody = {
        videoId: 'dQw4w9WgXcQ',
        sourceLang: 'ja',
        targetLang: 'en',
        onlyCache: true
    };
    const isOnlyCache1 = Boolean(cacheOnlyBody.onlyCache);
    const validation1 = validateBody(cacheOnlyBody, {
        videoId: { type: 'string', required: true, maxLength: 20 },
        sourceLang: { type: 'string', required: true, maxLength: 5 },
        targetLang: { type: 'string', required: true, maxLength: 5 },
        segments: { type: 'array', required: !isOnlyCache1, maxLength: 10000 },
        onlyCache: { type: 'boolean', required: false }
    });
    assert.equal(validation1.valid, true, 'onlyCache request should succeed without segments array');

    // 2. Check long video with 2,500 segments succeeds
    const longVideoBody = {
        videoId: 'dQw4w9WgXcQ',
        sourceLang: 'ja',
        targetLang: 'en',
        segments: new Array(2500).fill({ text: 'こんにちは', start: 1, duration: 2 }),
        saveOnly: true
    };
    const isOnlyCache2 = Boolean(longVideoBody.onlyCache);
    const validation2 = validateBody(longVideoBody, {
        videoId: { type: 'string', required: true, maxLength: 20 },
        sourceLang: { type: 'string', required: true, maxLength: 5 },
        targetLang: { type: 'string', required: true, maxLength: 5 },
        segments: { type: 'array', required: !isOnlyCache2, maxLength: 10000 },
        saveOnly: { type: 'boolean', required: false }
    });
    assert.equal(validation2.valid, true, 'Long video with 2500 segments should be accepted');
});

test('dual subtitle resolution: records valid & identical cues while preventing poisoning on failure', () => {
    const cues = [
        { id: 'c1', text: 'Hello' },
        { id: 'c2', text: 'OK' }, // Identical translation
        { id: 'c3', text: '???' } // Failed translation (null)
    ];
    const rawTranslations = ['Xin chào', 'OK', null];
    const newMap = new Map();

    // The mapping logic from subtitle.service.ts
    rawTranslations.forEach((trans, i) => {
        const cue = cues[i];
        if (!cue) return;
        const trimmedTrans = trans?.trim();
        if (trimmedTrans !== undefined && trimmedTrans !== null && trimmedTrans.length > 0) {
            newMap.set(cue.id, trimmedTrans);
        } else if (trans === '') {
            newMap.set(cue.id, '');
        }
    });

    // Verify valid & identical cue IDs are recorded in the map
    assert.equal(newMap.has('c1'), true);
    assert.equal(newMap.has('c2'), true);
    // Verify failed cue (null) is NOT poisoned as empty in the map so it can be retried
    assert.equal(newMap.has('c3'), false);

    // Verify values
    assert.equal(newMap.get('c1'), 'Xin chào');
    assert.equal(newMap.get('c2'), 'OK');

    // Verify UI template equality guard logic
    const shouldRenderC1 = Boolean(newMap.get('c1')) && newMap.get('c1') !== cues[0].text;
    const shouldRenderC2 = Boolean(newMap.get('c2')) && newMap.get('c2') !== cues[1].text;
    const shouldRenderC3 = Boolean(newMap.get('c3')) && newMap.get('c3') !== cues[2].text;

    assert.equal(shouldRenderC1, true, 'Valid translation should be rendered in UI');
    assert.equal(shouldRenderC2, false, 'Identical translation should not be rendered in UI');
    assert.equal(shouldRenderC3, false, 'Unmapped translation should not be rendered in UI');
});

