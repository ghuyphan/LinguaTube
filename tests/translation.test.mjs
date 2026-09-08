import test from 'node:test';
import assert from 'node:assert/strict';
import { encodeTaggedTexts, decodeTaggedTranslations } from '../functions-src/providers/lingva.js';

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
