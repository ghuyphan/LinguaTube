import test from 'node:test';
import assert from 'node:assert/strict';

import {
    tokenizeEnglish,
    tokenizeKoreanChinese,
    isPunctuation,
    hasKanji,
    katakanaToHiragana
} from '../functions-src/utils/tokenizer.js';
import { getJapaneseRomaji, isJapaneseKanaText } from '../functions-src/utils/japanese-romaji.js';

// ============================================================================
// 1. TOKENIZATION TESTS (JA, ZH, KO, EN)
// ============================================================================

test('Tokenizer: Punctuation and symbol detection', () => {
    // CJK and Western punctuation
    assert.equal(isPunctuation('。'), true);
    assert.equal(isPunctuation('、'), true);
    assert.equal(isPunctuation('？'), true);
    assert.equal(isPunctuation('?'), true);
    assert.equal(isPunctuation('!'), true);
    assert.equal(isPunctuation('，'), true);
    assert.equal(isPunctuation('.'), true);
    assert.equal(isPunctuation('…'), true);
    assert.equal(isPunctuation('「'), true);
    assert.equal(isPunctuation('」'), true);
    assert.equal(isPunctuation('【'), true);
    assert.equal(isPunctuation('】'), true);
    assert.equal(isPunctuation(' '), true);
    assert.equal(isPunctuation('　'), true);

    // Words should not be punctuation
    assert.equal(isPunctuation('猫'), false);
    assert.equal(isPunctuation('hello'), false);
    assert.equal(isPunctuation('한국어'), false);
    assert.equal(isPunctuation('中国'), false);
});

test('Tokenizer [JA]: Kanji detection, katakana to hiragana, and Romaji', () => {
    assert.equal(hasKanji('日本語'), true);
    assert.equal(hasKanji('ねこ'), false);
    assert.equal(hasKanji('ネコ'), false);
    assert.equal(hasKanji('cat'), false);

    assert.equal(katakanaToHiragana('トウキョウ'), 'とうきょう');
    assert.equal(katakanaToHiragana('ニホンゴ'), 'にほんご');
    assert.equal(katakanaToHiragana('ラーメン'), 'らーめん');

    assert.equal(getJapaneseRomaji('にほんご', '日本語'), 'nihongo');
    assert.equal(getJapaneseRomaji('とうきょう', '東京'), 'toukyou');
    assert.equal(getJapaneseRomaji('ねこ', '猫'), 'neko');

    assert.equal(isJapaneseKanaText('ひらがな'), true);
    assert.equal(isJapaneseKanaText('カタカナ'), true);
    assert.equal(isJapaneseKanaText('漢字'), false);
});

test('Tokenizer [ZH]: Chinese segmentation and Pinyin with tone marks', () => {
    const text = '这是什么书？虽然天气冷，但是很开心。';
    const tokens = tokenizeKoreanChinese(text, 'zh');

    assert.ok(tokens.length >= 6);

    const surfaceList = tokens.map(t => t.surface);
    assert.ok(surfaceList.includes('这是') || (surfaceList.includes('这') && surfaceList.includes('是')));
    assert.ok(surfaceList.includes('什么'));
    assert.ok(surfaceList.includes('书'));
    assert.ok(surfaceList.includes('虽然'));
    assert.ok(surfaceList.includes('但是'));

    // Verify Pinyin is attached to words
    const shenme = tokens.find(t => t.surface === '什么');
    assert.ok(shenme);
    assert.equal(shenme.pinyin, 'shén me');

    // Verify punctuation marks are marked as punctuation and lack pinyin
    const qmark = tokens.find(t => t.surface === '？' || t.surface === '?');
    assert.ok(qmark);
    assert.equal(qmark.isPunctuation, true);
    assert.equal(qmark.pinyin, undefined);
});

test('Tokenizer [KO]: Korean segmentation and Hangul Romanization', () => {
    const text = '나는 한국어를 배우고 있습니다. 오렌지가 아주 맛있어요.';
    const tokens = tokenizeKoreanChinese(text, 'ko');

    assert.ok(tokens.length >= 6);

    const naneun = tokens.find(t => t.surface === '나는');
    assert.ok(naneun);
    assert.equal(naneun.romanization, 'naneun');

    const hangugeo = tokens.find(t => t.surface === '한국어를');
    assert.ok(hangugeo);
    assert.equal(hangugeo.romanization, 'hangukeoreul');

    // Punctuation check
    const dot = tokens.find(t => t.surface === '.');
    assert.ok(dot);
    assert.equal(dot.isPunctuation, true);
    assert.equal(dot.romanization, undefined);
});

test('Tokenizer [EN]: English segmentation and punctuation classification', () => {
    const text = 'Learning languages is not only fun, but also very rewarding!';
    const tokens = tokenizeEnglish(text);

    assert.ok(tokens.length >= 8);

    const words = tokens.filter(t => !t.isPunctuation).map(t => t.surface);
    assert.ok(words.includes('Learning'));
    assert.ok(words.includes('languages'));
    assert.ok(words.includes('not'));
    assert.ok(words.includes('only'));
    assert.ok(words.includes('rewarding'));

    const comma = tokens.find(t => t.surface === ',');
    assert.ok(comma);
    assert.equal(comma.isPunctuation, true);

    const exclamation = tokens.find(t => t.surface === '!');
    assert.ok(exclamation);
    assert.equal(exclamation.isPunctuation, true);
});

// ============================================================================
// 2. GRAMMAR DATA INTEGRITY & CORRUPTION CHECKS
// ============================================================================

// Helper to load grammar TS files in Node test environment without TS compiler loader
async function loadGrammarData(relPath, varName) {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');
    const content = await fs.readFile(path.join(process.cwd(), relPath), 'utf-8');
    const prefix = `export const ${varName}: GrammarPattern[] = `;
    const startIdx = content.indexOf(prefix);
    if (startIdx === -1) throw new Error(`Variable ${varName} not found in ${relPath}`);
    const jsonStr = content.slice(startIdx + prefix.length).replace(/;\s*$/, '');
    return JSON.parse(jsonStr);
}

test('Grammar [JA]: Data integrity, JLPT levels, and counts', async () => {
    const GRAMMAR_JA = await loadGrammarData('src/app/data/grammar-ja.ts', 'GRAMMAR_JA');
    assert.equal(Array.isArray(GRAMMAR_JA), true);
    assert.ok(GRAMMAR_JA.length >= 800, `Expected at least 800 Japanese patterns, got ${GRAMMAR_JA.length}`);

    for (const p of GRAMMAR_JA) {
        assert.ok(p.id, `Missing id in ${JSON.stringify(p)}`);
        assert.equal(p.language, 'ja');
        assert.ok(p.pattern, `Missing pattern in ${p.id}`);
        assert.ok(p.title, `Missing title in ${p.id}`);
        assert.ok(p.level && p.level.startsWith('JLPT N'), `Invalid JLPT level ${p.level} in ${p.id}`);
    }
});

test('Grammar [ZH]: Data integrity, HSK levels, and counts', async () => {
    const GRAMMAR_ZH = await loadGrammarData('src/app/data/grammar-zh.ts', 'GRAMMAR_ZH');
    assert.equal(Array.isArray(GRAMMAR_ZH), true);
    assert.ok(GRAMMAR_ZH.length >= 650, `Expected at least 650 Chinese patterns, got ${GRAMMAR_ZH.length}`);

    for (const p of GRAMMAR_ZH) {
        assert.ok(p.id, `Missing id in ${JSON.stringify(p)}`);
        assert.equal(p.language, 'zh');
        assert.ok(p.pattern, `Missing pattern in ${p.id}`);
        assert.ok(p.title, `Missing title in ${p.id}`);
        assert.ok(p.level && p.level.startsWith('HSK '), `Invalid HSK level ${p.level} in ${p.id}`);
    }
});

test('Grammar [KO]: Data integrity and clean pattern format', async () => {
    const GRAMMAR_KO = await loadGrammarData('src/app/data/grammar-ko.ts', 'GRAMMAR_KO');
    assert.equal(Array.isArray(GRAMMAR_KO), true);
    assert.ok(GRAMMAR_KO.length >= 700, `Expected at least 700 Korean patterns, got ${GRAMMAR_KO.length}`);

    for (const p of GRAMMAR_KO) {
        assert.ok(p.id, `Missing id in ${JSON.stringify(p)}`);
        assert.equal(p.language, 'ko');
        assert.ok(p.pattern, `Missing pattern in ${p.id}`);
        assert.ok(p.title, `Missing title in ${p.id}`);
        assert.ok(p.level && p.level.startsWith('Korean '), `Invalid Korean level ${p.level} in ${p.id}`);
        // Ensure no pattern has raw bracketed title text leftover
        assert.ok(!p.pattern.includes('['), `Pattern ${p.id} contains raw brackets: ${p.pattern}`);
    }
});

test('Grammar [EN]: Data integrity, CEFR levels, and counts', async () => {
    const GRAMMAR_EN = await loadGrammarData('src/app/data/grammar-en.ts', 'GRAMMAR_EN');
    assert.equal(Array.isArray(GRAMMAR_EN), true);
    assert.ok(GRAMMAR_EN.length >= 140, `Expected at least 140 English patterns, got ${GRAMMAR_EN.length}`);

    for (const p of GRAMMAR_EN) {
        assert.ok(p.id, `Missing id in ${JSON.stringify(p)}`);
        assert.equal(p.language, 'en');
        assert.ok(p.pattern, `Missing pattern in ${p.id}`);
        assert.ok(p.title, `Missing title in ${p.id}`);
        assert.ok(p.level && p.level.startsWith('CEFR '), `Invalid CEFR level ${p.level} in ${p.id}`);
    }
});

// ============================================================================
// 3. ARCHITECTURAL & BATCH INVARIANT VERIFICATIONS
// ============================================================================

test('Batch Tokenize Limits: Server and Client limits are aligned', async () => {
    const fs = await import('node:fs/promises');
    const path = await import('node:path');

    const clientServiceCode = await fs.readFile(
        path.join(process.cwd(), 'src/app/features/video/subtitle.service.ts'),
        'utf-8'
    );
    const clientBatchMatch = clientServiceCode.match(/MAX_TOKENIZE_BATCH_SIZE\s*=\s*(\d+)/);
    assert.ok(clientBatchMatch, 'Client MAX_TOKENIZE_BATCH_SIZE should be defined');
    const clientBatchSize = parseInt(clientBatchMatch[1], 10);

    const serverHandlerCode = await fs.readFile(
        path.join(process.cwd(), 'functions-src/api/tokenize-batch/[lang].js'),
        'utf-8'
    );
    const serverBatchMatch = serverHandlerCode.match(/MAX_BATCH_SIZE\s*=\s*(\d+)/);
    assert.ok(serverBatchMatch, 'Server MAX_BATCH_SIZE should be defined');
    const serverBatchSize = parseInt(serverBatchMatch[1], 10);

    assert.ok(
        clientBatchSize <= serverBatchSize,
        `Batch size mismatch detected! Client sends ${clientBatchSize} items, but server rejects batches > ${serverBatchSize}.`
    );
    assert.equal(serverBatchSize >= 500, true, 'Server MAX_BATCH_SIZE should be at least 500 to support full video batches');
});
