import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import * as kuromoji from '@patdx/kuromoji';
import {
    getKuromojiTokenizer,
    isKuromojiReady,
    segmentHasMorphologicalTokens,
    segmentNeedsEnrichment,
    tokenizeJapanese,
    tokenizeJapaneseFast
} from '../functions-src/utils/tokenizer.js';
import { cleanTranscriptSegments } from '../functions-src/utils/transcript-utils.js';
import { enrichPublishedTranscript } from '../functions-src/services/transcript-enrichment.js';

test('compact IPADIC matches @patdx/kuromoji and shares globalThis singleton', async () => {
    const compact = await getKuromojiTokenizer();
    assert.equal(isKuromojiReady(), true);
    assert.equal(await getKuromojiTokenizer(), compact);

    const orig = await new kuromoji.TokenizerBuilder({
        loader: {
            async loadArrayBuffer(url) {
                const buf = zlib.gunzipSync(
                    fs.readFileSync(path.resolve('node_modules/@patdx/kuromoji/dict', url))
                );
                return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
            }
        }
    }).build();

    const samples = [
        '君が思い出になる前に強く抱きしめたいこの心に',
        '魂の色は何色ですか？',
        '踠く日々の中で光を探してる。',
        '一人で二人三脚を走るのは大変だ。',
        'スネ夫とドラえもんが歩いている',
        'ー。'
    ];
    for (const s of samples) {
        const expected = orig.tokenize(s).map(t => ({
            surface_form: t.surface_form,
            pos: t.pos,
            basic_form: t.basic_form,
            reading: t.reading
        }));
        const actual = compact.tokenize(s);
        assert.deepEqual(actual, expected, `Parity mismatch for "${s}"`);
    }
});

test('segmentHasMorphologicalTokens accepts IPADIC-UNKNOWN kanji and emoji spans while flagging fallback tokens', async () => {
    // Fallback tokens without POS must still require enrichment
    const fallback = tokenizeJapaneseFast('魂の色は何色ですか');
    assert.equal(segmentNeedsEnrichment({ text: '魂の色は何色ですか', tokens: fallback }, 'ja'), true);
    assert.equal(segmentHasMorphologicalTokens({ text: '魂の色は何色ですか', tokens: fallback }, 'ja'), false);

    // IPADIC-UNKNOWN kanji cue tokenized by Kuromoji has POS but no reading on 踠 -> valid morphological tokens
    const unknownKanjiTokens = await tokenizeJapanese('踠く');
    assert.equal(segmentHasMorphologicalTokens({ text: '踠く', tokens: unknownKanjiTokens }, 'ja'), true);

    // Emoji-only span has no Kuromoji-safe words -> must NOT endlessly re-enrich
    const emojiTokens = await tokenizeJapanese('🎵');
    assert.equal(segmentNeedsEnrichment({ text: '🎵', tokens: emojiTokens }, 'ja'), false);
    assert.equal(segmentHasMorphologicalTokens({ text: '🎵', tokens: emojiTokens }, 'ja'), true);
});

test('enrichPublishedTranscript persists R2 tokens even when a cue contains IPADIC-UNKNOWN kanji', async () => {
    const store = new Map();
    const key = 'transcripts/testVid12345/ja.ai.json';
    store.set(key, {
        body: JSON.stringify({
            segments: [
                { start: 1, duration: 2, text: '魂の色は何色ですか' },
                { start: 3, duration: 2, text: '踠く' }
            ]
        }),
        etag: 'v1',
        httpMetadata: { contentType: 'application/json' },
        customMetadata: {}
    });
    let putCount = 0;
    const bucket = {
        async get(k) {
            const entry = store.get(k);
            if (!entry) return null;
            return {
                ...entry,
                async arrayBuffer() { return Buffer.from(entry.body); },
                async text() { return entry.body; },
                async json() { return JSON.parse(entry.body); }
            };
        },
        async put(k, value, opts) {
            putCount++;
            const body = typeof value === 'string' ? value : Buffer.from(value).toString('utf8');
            store.set(k, { body, etag: 'v2', httpMetadata: opts?.httpMetadata, customMetadata: opts?.customMetadata });
            return { etag: 'v2' };
        }
    };

    const ok = await enrichPublishedTranscript(bucket, 'testVid12345', 'ja', 5000, true);
    assert.equal(ok, true);
    assert.equal(putCount, 1);
    const saved = JSON.parse(store.get(key).body);
    assert.equal(saved.tokensEnriched, true);
    assert.ok(saved.segments[0].tokens.some(t => t.reading === 'たましい'));
    assert.ok(saved.segments[1].tokens.some(t => t.partOfSpeech));

    // Second pass must be an idempotent no-op (no repeated R2 writes despite UNKNOWN kanji)
    const ok2 = await enrichPublishedTranscript(bucket, 'testVid12345', 'ja', 5000, true);
    assert.equal(ok2, true);
    assert.equal(putCount, 1);
});

test('cleanTranscriptSegments keeps split lyric cues strictly monotonic', () => {
    const raw = [
        {
            start: 245.0,
            duration: 2.0,
            text: 'これはとても長い歌詞の行で一二三四五六七八九十、さらに続いていきます、もっと速いフレーズ、終わらない夜を越えていく'
        },
        {
            start: 247.5,
            duration: 2.0,
            text: '次のフレーズ'
        }
    ];
    const cleaned = cleanTranscriptSegments(raw, 'ja');
    assert.ok(cleaned.length >= 3);
    for (let i = 1; i < cleaned.length; i++) {
        assert.ok(
            cleaned[i].start >= cleaned[i - 1].start,
            `Non-monotonic cue at index ${i}: ${cleaned[i].start} < ${cleaned[i - 1].start}`
        );
    }
});
