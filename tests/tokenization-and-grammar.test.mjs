import test from 'node:test';
import assert from 'node:assert/strict';

import {
    tokenizeEnglish,
    tokenizeKoreanChinese,
    isPunctuation,
    hasKanji,
    katakanaToHiragana,
    segmentJapaneseRuby,
    detachKoreanParticle
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

test('Tokenizer [ZH]: Chinese segmentation and Pinyin with tone marks', async () => {
    const text = '这是什么书？虽然天气冷，但是很开心。';
    const tokens = await tokenizeKoreanChinese(text, 'zh');

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

test('Tokenizer [KO]: Korean segmentation and Hangul Romanization', async () => {
    const text = '나는 한국어를 배우고 있습니다. 오렌지가 아주 맛있어요.';
    const tokens = await tokenizeKoreanChinese(text, 'ko');

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

test('Tokenizer [EN]: English segmentation, POS tagging, and lemmatization', async () => {
    const text = 'Learning languages is not only fun, but also very rewarding!';
    const tokens = await tokenizeEnglish(text);

    assert.ok(tokens.length >= 8);

    const words = tokens.filter(t => !t.isPunctuation).map(t => t.surface);
    assert.ok(words.includes('Learning'));
    assert.ok(words.includes('languages'));
    assert.ok(words.includes('not'));
    assert.ok(words.includes('only'));
    assert.ok(words.includes('rewarding'));

    // Check POS and lemmatization (baseForm) powered by Compromise NLP
    const learningToken = tokens.find(t => t.surface === 'Learning');
    assert.ok(learningToken);
    assert.equal(learningToken.partOfSpeech, 'Verb');
    assert.equal(learningToken.baseForm, 'learn');

    const languagesToken = tokens.find(t => t.surface === 'languages');
    assert.ok(languagesToken);
    assert.equal(languagesToken.partOfSpeech, 'Noun');
    assert.equal(languagesToken.baseForm, 'language');

    const comma = tokens.find(t => t.surface === ',');
    assert.ok(comma);
    assert.equal(comma.isPunctuation, true);

    const exclamation = tokens.find(t => t.surface === '!');
    assert.ok(exclamation);
    assert.equal(exclamation.isPunctuation, true);
});

test('Tokenizer [EN]: Handles contractions without desynchronizing subsequent tokens', async () => {
    const text = "Don't give up on your dreams.";
    const tokens = await tokenizeEnglish(text);

    const dontToken = tokens.find(t => t.surface.toLowerCase() === "don't");
    assert.ok(dontToken);
    assert.equal(dontToken.partOfSpeech, 'Verb');

    const giveToken = tokens.find(t => t.surface === 'give');
    assert.ok(giveToken);
    assert.equal(giveToken.partOfSpeech, 'Verb');
    assert.equal(giveToken.baseForm, undefined); // 'give' is already infinitive/base form

    const dreamsToken = tokens.find(t => t.surface === 'dreams');
    assert.ok(dreamsToken);
    assert.equal(dreamsToken.partOfSpeech, 'Noun');
    assert.equal(dreamsToken.baseForm, 'dream');
});

test('Tokenizer [JA]: segmentJapaneseRuby segments okurigana from kanji stems', () => {
    // 食べる -> 食(た) + べる
    const taberu = segmentJapaneseRuby('食べる', 'たべる');
    assert.deepEqual(taberu, [
        { text: '食', reading: 'た' },
        { text: 'べる' }
    ]);

    // 美しい -> 美(うつく) + しい
    const utsukushii = segmentJapaneseRuby('美しい', 'うつくしい');
    assert.deepEqual(utsukushii, [
        { text: '美', reading: 'うつく' },
        { text: 'しい' }
    ]);

    // 日本語 -> 日本語(にほんご)
    const nihongo = segmentJapaneseRuby('日本語', 'にほんご');
    assert.deepEqual(nihongo, [
        { text: '日本語', reading: 'にほんご' }
    ]);

    // 思い出す -> 思(おも) + い + 出(だ) + す (interior okurigana)
    const omoidasu = segmentJapaneseRuby('思い出す', 'おもいだす');
    assert.deepEqual(omoidasu, [
        { text: '思', reading: 'おも' },
        { text: 'い' },
        { text: '出', reading: 'だ' },
        { text: 'す' }
    ]);

    // 行き交う -> 行(い) + き + 交(か) + う
    const ikikau = segmentJapaneseRuby('行き交う', 'いきかう');
    assert.deepEqual(ikikau, [
        { text: '行', reading: 'い' },
        { text: 'き' },
        { text: '交', reading: 'か' },
        { text: 'う' }
    ]);

    // お茶 -> お + 茶(ちゃ) (leading prefix)
    const ocha = segmentJapaneseRuby('お茶', 'おちゃ');
    assert.deepEqual(ocha, [
        { text: 'お' },
        { text: '茶', reading: 'ちゃ' }
    ]);
});

test('Tokenizer [JA]: Romaji correctly converts ヴ (vu/va/vi/ve/vo) digraphs', () => {
    assert.equal(getJapaneseRomaji('ゔぁいおりん', 'ヴァイオリン'), 'vaiorin');
    assert.equal(getJapaneseRomaji('ゔぃーなす', 'ヴィーナス'), 'viinasu');
});

test('Tokenizer [ZH]: Chinese contextual Pinyin and character-level rubyParts', async () => {
    const text = '跑得快，银行行不行？';
    const tokens = await tokenizeKoreanChinese(text, 'zh');

    // Verify 银行 is recognized with háng
    const yinhang = tokens.find(t => t.surface === '银行');
    assert.ok(yinhang);
    assert.equal(yinhang.pinyin, 'yín háng');
    assert.deepEqual(yinhang.rubyParts, [
        { text: '银', reading: 'yín' },
        { text: '行', reading: 'háng' }
    ]);
});

test('Tokenizer [KO]: Korean particle detachment attaches baseForm and particle', async () => {
    assert.deepEqual(detachKoreanParticle('한국어를'), { stem: '한국어', particle: '를' });
    assert.deepEqual(detachKoreanParticle('나는'), { stem: '나', particle: '는' });
    assert.deepEqual(detachKoreanParticle('선생님께서는'), { stem: '선생님', particle: '께서는' });
    assert.deepEqual(detachKoreanParticle('집에서'), { stem: '집', particle: '에서' });
    assert.deepEqual(detachKoreanParticle('책을'), { stem: '책', particle: '을' });
    assert.equal(detachKoreanParticle('아이'), null); // Should not strip regular root

    const text = '나는 한국어를 배웁니다.';
    const tokens = await tokenizeKoreanChinese(text, 'ko');

    const hangugeo = tokens.find(t => t.surface === '한국어를');
    assert.ok(hangugeo);
    assert.equal(hangugeo.baseForm, '한국어');
    assert.equal(hangugeo.particle, '를');

    const naneun = tokens.find(t => t.surface === '나는');
    assert.ok(naneun);
    assert.equal(naneun.baseForm, '나');
    assert.equal(naneun.particle, '는');
});

test('Tokenizer [EN]: Adjective lemmatization and hyphenated compound synchronization', async () => {
    const text = 'This is a state-of-the-art system with better results.';
    const tokens = await tokenizeEnglish(text);

    const betterToken = tokens.find(t => t.surface === 'better');
    assert.ok(betterToken);
    assert.equal(betterToken.baseForm, 'good');

    const resultsToken = tokens.find(t => t.surface === 'results');
    assert.ok(resultsToken);
    assert.equal(resultsToken.baseForm, 'result');
    assert.equal(resultsToken.partOfSpeech, 'Noun');

    const systemToken = tokens.find(t => t.surface === 'system');
    assert.ok(systemToken);
    assert.equal(systemToken.partOfSpeech, 'Noun');
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

test('Grammar [EN]: Clean NLP pattern detection with zero false positives on everyday words', async () => {
    const nlp = (await import('compromise')).default;

    const EN_NLP_RULES = [
        { id: 'en_b1_02', match: '(have|has) been #Gerund' },
        { id: 'en_b2_01', match: 'had #PastTense' },
        { id: 'en_b2_02', match: 'had been #Gerund' },
        { id: 'en_b1_24', match: 'will be #Gerund' },
        { id: 'en_b1_25', match: 'will have #PastTense' },
        { id: 'en_c2_14', match: 'will have been #Gerund' },
        { id: 'en_a2_07', match: '(#Copula|am|is|are|was|were)? going to #Verb' },
        { id: 'en_b2_03', match: "(must|must've) have? #PastTense" },
        { id: 'en_b2_04', match: "(can't|cannot) have #PastTense" },
        { id: 'en_b2_05', match: "(should|should've|shouldn't) have? #PastTense" },
        { id: 'en_b2_06', match: "(might|might've|could|could've|couldn't) have? #PastTense" },
        { id: 'en_b2_07', match: "(would|would've|wouldn't) have? #PastTense" },
        { id: 'en_b2_20', match: '(#Copula|get|gets|got|getting) used to (#Gerund|#Noun)' },
        { id: 'en_b1_21', match: 'used to #Infinitive' },
        { id: 'en_a2_13', match: '(have|has|had|having) to #Verb' },
        { id: 'en_a2_15', match: 'as (#Adjective|#Adverb) as' },
        { id: 'en_b2_19', match: 'too (#Adjective|#Adverb) to #Verb' },
        { id: 'en_c1_09', match: 'as (if|though)' },
        { id: 'en_b1_23', match: 'even (though|if)' },
        { id: 'en_b1_26', match: '(in order|so as) to #Verb' },
        { id: 'en_a1_16', match: 'there (is|are|was|were|has been|have been)' }
    ];

    const matchSentences = (text) => {
        const doc = nlp(text);
        const hits = [];
        for (const rule of EN_NLP_RULES) {
            const m = doc.match(rule.match);
            if (m.found) hits.push(rule.id);
        }
        return hits;
    };

    // 1. Sentences with everyday words: ZERO false positives
    assert.deepEqual(matchSentences('Hello, I am going to the cinema because I want to see a movie.'), []);
    assert.deepEqual(matchSentences('What are you doing today? Can you help me with this task?'), []);
    assert.deepEqual(matchSentences("If you don't mind, I will take the book that is on the table."), []);
    assert.deepEqual(matchSentences('This is a team project with my family.'), []);
    assert.deepEqual(matchSentences('He ran fast and worked hard yesterday.'), []);

    // 2. Sentences with authentic CEFR grammar: Exact detection
    const s1Hits = matchSentences('She is my best friend and we have been learning English for three years.');
    assert.ok(s1Hits.includes('en_b1_02')); // Present Perfect Continuous

    const s2Hits = matchSentences('She used to live in Paris, but now she is used to living in London.');
    assert.ok(s2Hits.includes('en_b1_21')); // used to
    assert.ok(s2Hits.includes('en_b2_20')); // be used to

    const s3Hits = matchSentences('You should have told me earlier because we had to leave at noon.');
    assert.ok(s3Hits.includes('en_b2_05')); // should have + V3
    assert.ok(s3Hits.includes('en_a2_13')); // have to

    const s4Hits = matchSentences('I am going to visit my grandparents tomorrow.');
    assert.ok(s4Hits.includes('en_a2_07')); // be going to

    // 3. Token array reconstruction handles space boundaries and punctuation
    const tokens = [
        { surface: 'She' },
        { surface: 'has' },
        { surface: 'been' },
        { surface: 'learning' },
        { surface: 'English' },
        { surface: '.', isPunctuation: true }
    ];
    const reconstructed = tokens.map((t, idx) => {
        if (idx > 0 && !t.isPunctuation && !tokens[idx - 1].surface.endsWith(' ') && !/^[\s\p{P}\p{S}]/u.test(t.surface)) {
            return ' ' + t.surface;
        }
        return t.surface;
    }).join('');
    assert.equal(reconstructed, 'She has been learning English.');
    assert.ok(matchSentences(reconstructed).includes('en_b1_02'));
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
