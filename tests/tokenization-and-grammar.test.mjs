import test from 'node:test';
import assert from 'node:assert/strict';

import {
    tokenize,
    tokenizeEnglish,
    tokenizeVietnamese,
    mergeVietnameseCompounds,
    tokenizeKoreanChinese,
    isPunctuation,
    hasKanji,
    katakanaToHiragana,
    segmentJapaneseRuby,
    detachKoreanParticle,
    tokenizeJapanese,
    tokenizeJapaneseFast,
    correctTranscriptPronunciation,
    segmentsNeedEnrichment,
    enrichSegmentsWithTokens
} from '../functions-src/utils/tokenizer.js';
import { enrichPublishedTranscript } from '../functions-src/services/transcript-enrichment.js';
import { splitRunOnSegments, contradictsNativeLanguage } from '../functions-src/utils/transcript-utils.js';
import { parseWiktionaryRest, parseViWiktionaryExtract } from '../functions-src/utils/dict-parsers.js';
import { estimateTranscriptLevel } from '../functions-src/utils/level-estimator.js';
import { scoreVideoTranscript } from '../functions-src/utils/video-grader.js';
import { onRequestGet as grammarGet } from '../functions-src/api/grammar.js';
import { onRequestPost as grammarDetectPost } from '../functions-src/api/grammar-detect.js';
import { clearGrammarStoreCache } from '../functions-src/data/grammar-store.js';
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
    assert.equal(detachKoreanParticle('같이'), null); // Should not strip lexicalized adverb
    assert.equal(detachKoreanParticle('공부하는'), null); // Should not strip adnominal verb ending
    assert.equal(detachKoreanParticle('재미있지만'), null); // Should not strip connective ending
    assert.equal(detachKoreanParticle('같은'), null); // Should not strip adjective modifier ending

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

test('enrichSegmentsWithTokens: pre-bakes rich tokens onto segments across all 4 languages', async () => {
    // 1. Japanese
    const jaSegments = [
        { id: 0, text: '思い出した！', start: 1.0, duration: 2.0 },
        { id: 1, text: 'お茶を飲む。', start: 3.0, duration: 2.0 }
    ];
    const enrichedJa = await enrichSegmentsWithTokens(jaSegments, 'ja');
    assert.equal(enrichedJa.length, 2);
    assert.equal(enrichedJa[0].id, 0);
    assert.equal(enrichedJa[0].text, '思い出した！');
    assert.ok(Array.isArray(enrichedJa[0].tokens) && enrichedJa[0].tokens.length > 0);
    const omoi = enrichedJa[0].tokens.find(t => t.surface.includes('思い'));
    assert.ok(omoi, 'Should find verb token');

    // 2. Chinese (context pinyin + rubyParts)
    const zhSegments = [
        { id: 0, text: '银行在什么地方？', start: 0.5, duration: 2.5 }
    ];
    const enrichedZh = await enrichSegmentsWithTokens(zhSegments, 'zh');
    assert.equal(enrichedZh.length, 1);
    const bank = enrichedZh[0].tokens.find(t => t.surface === '银行');
    assert.ok(bank);
    assert.equal(bank.pinyin, 'yín háng');
    assert.ok(bank.rubyParts?.length === 2);

    // 3. Korean (particle detachment)
    const koSegments = [
        { id: 0, text: '한국어를 배웁니다.', start: 0.0, duration: 2.0 }
    ];
    const enrichedKo = await enrichSegmentsWithTokens(koSegments, 'ko');
    assert.equal(enrichedKo.length, 1);
    const hangugeo = enrichedKo[0].tokens.find(t => t.surface === '한국어를');
    assert.ok(hangugeo);
    assert.equal(hangugeo.baseForm, '한국어');
    assert.equal(hangugeo.particle, '를');

    // 4. English (lemmatization)
    const enSegments = [
        { id: 0, text: 'They went to the store.', start: 0.0, duration: 2.0 }
    ];
    const enrichedEn = await enrichSegmentsWithTokens(enSegments, 'en');
    assert.equal(enrichedEn.length, 1);
    const went = enrichedEn[0].tokens.find(t => t.surface === 'went');
    assert.ok(went);
    assert.equal(went.baseForm, 'go');

    // 5. Idempotent: already enriched segments returned unchanged
    const doubleEnriched = await enrichSegmentsWithTokens(enrichedEn, 'en');
    assert.strictEqual(doubleEnriched, enrichedEn);
});

test('R2 enrichment repairs degraded Japanese tokens and preserves the word timeline', async () => {
    const text = '繰り返す季節に慣れないまま';
    const degradedTokens = tokenizeJapaneseFast(text);
    assert.ok(degradedTokens.length > 0);
    assert.equal(degradedTokens.some(t => Boolean(t.partOfSpeech)), false);

    // Degraded JA tokens must be flagged as needing enrichment, unlike KO/ZH which omit POS by design
    assert.equal(segmentsNeedEnrichment([{ start: 0, duration: 3, text, tokens: degradedTokens }], 'ja'), true);
    assert.equal(
        segmentsNeedEnrichment([{ start: 0, duration: 3, text: '한국어', tokens: [{ surface: '한국어', romanization: 'hangugeo', isPunctuation: false }] }], 'ko'),
        false
    );
    assert.equal(
        segmentsNeedEnrichment([{ start: 0, duration: 3, text: '季節', tokens: [{ surface: '季節', partOfSpeech: '名詞', hasKanji: true, isPunctuation: false }] }], 'ja'),
        true
    );

    const key = 'transcripts/ylLOn6KXzAc/ja.ai.json';
    const wordTimings = [{ text: '繰り返す', start: 0, end: 0.6 }];
    const store = new Map([
        [key, JSON.stringify({
            videoId: 'ylLOn6KXzAc',
            language: 'ja',
            source: 'ai',
            wordTimings,
            segments: [{ start: 0, duration: 3, text, tokens: degradedTokens }]
        })]
    ]);
    let putCount = 0;
    const mockBucket = {
        async get(key) {
            const raw = store.get(key);
            if (!raw) return null;
            return { async json() { return JSON.parse(raw); } };
        },
        async put(key, val) {
            putCount++;
            store.set(key, val);
        }
    };

    const repaired = await enrichPublishedTranscript(mockBucket, 'ylLOn6KXzAc', 'ja', 5000, true);
    assert.equal(repaired, true);
    assert.equal(putCount, 1);

    const updatedPayload = JSON.parse(store.get(key));
    assert.deepEqual(updatedPayload.wordTimings, wordTimings);
    assert.equal(segmentsNeedEnrichment(updatedPayload.segments, 'ja'), false);
    assert.ok(updatedPayload.segments[0].tokens.some(t => Boolean(t.partOfSpeech)));

    // Second pass must be a no-op (no extra R2 write) because R2 already holds full Kuromoji annotations
    const secondPass = await enrichPublishedTranscript(mockBucket, 'ylLOn6KXzAc', 'ja', 5000, true);
    assert.equal(secondPass, true);
    assert.equal(putCount, 1);
});

test('splitRunOnSegments: chunks unpunctuated Japanese Whisper lyrics within maxLen with advancing timestamps', () => {
    const longLyric = '君の前前前世から僕は君を探しはじめたよそのぶきっちょな笑い方をめがけてやってきたんだよ';
    const result = splitRunOnSegments([{ start: 10.0, duration: 24.0, text: longLyric }]);

    assert.ok(result.length > 1, 'Long unpunctuated lyric must split into multiple subtitle cues');
    for (let i = 0; i < result.length; i++) {
        assert.ok(result[i].text.length <= 22, `Cue ${i} exceeded CJK maxLen: ${result[i].text}`);
        assert.ok(result[i].duration > 0);
        assert.ok(result[i].start >= 10.0);
        assert.ok(result[i].start + result[i].duration <= 34.01);
        if (i > 0) {
            assert.ok(result[i].start >= result[i - 1].start + result[i - 1].duration - 0.001, 'Split cues must advance monotonically without overlap');
        }
    }
    const combined = result.map(s => s.text).join('');
    assert.equal(combined, longLyric);
});

// ============================================================================
// 5. VIETNAMESE SUPPORT TESTS (Tokenization, Dictionary, Validation, Grading)
// ============================================================================

test('Tokenizer (VI): longest-match compound merging preserves compounds & casing', async () => {
    const tokens = await tokenize('Học sinh Việt Nam học tiếng Việt.', 'vi');
    const words = tokens.filter(t => !t.isPunctuation).map(t => t.surface);
    assert.deepEqual(words, ['Học sinh', 'Việt Nam', 'học', 'tiếng Việt']);

    const manual = mergeVietnameseCompounds(
        'Xin chào mọi người!',
        new Set(['xin chào', 'mọi người'])
    );
    assert.deepEqual(manual.filter(t => !t.isPunctuation).map(t => t.surface), ['Xin chào', 'mọi người']);

    assert.equal((await tokenizeVietnamese('Việt Nam!')).filter(t => t.isPunctuation).length, 1);
});

test('Dict Parsers (VI): parseWiktionaryRest and parseViWiktionaryExtract extract clean definitions', () => {
    const restEntries = parseWiktionaryRest({
        vi: [{
            partOfSpeech: 'Noun',
            definitions: [{
                definition: '<i>language</i> language spoken in Vietnam',
                parsedExamples: [{ example: 'Tôi học tiếng Việt.' }]
            }]
        }]
    }, 'tiếng Việt', 'vi');
    assert.equal(restEntries.length, 1);
    assert.equal(restEntries[0].partOfSpeech, 'n');
    assert.ok(restEntries[0].definitions[0].includes('language spoken in Vietnam'));
    assert.deepEqual(restEntries[0].examples, ['Tôi học tiếng Việt.']);

    const viWiktEntries = parseViWiktionaryExtract({
        query: {
            pages: {
                '1': {
                    title: 'xin chào',
                    extract: '== Tiếng Việt ==\n=== Cách phát âm ===\nIPA: /sin˧˧ tɕaːw˨˩/\n=== Thán từ ===\n1. Lời chào hỏi thông thường.\n== Tiếng Anh ==\n=== Noun ===\nHello'
                }
            }
        }
    }, 'xin chào');
    assert.equal(viWiktEntries.length, 1);
    assert.equal(viWiktEntries[0].reading, '/sin˧˧ tɕaːw˨˩/');
    assert.equal(viWiktEntries[0].partOfSpeech, 'int');
    assert.deepEqual(viWiktEntries[0].definitions, ['Lời chào hỏi thông thường.']);
});

test('Transcript Validator & Video Grader (VI): language check, level estimation, and catalog scoring', async () => {
    assert.equal(contradictsNativeLanguage([
        { text: 'Xin chào các bạn hôm nay trời đẹp lắm.' },
        { text: 'Chúng ta sẽ học tiếng Việt nhé.' },
        { text: 'Cảm ơn mọi người đã theo dõi video.' }
    ], 'vi'), false);

    assert.equal(contradictsNativeLanguage([
        { text: 'You will never know what they want with this.' },
        { text: 'Your friends were going to want that too.' },
        { text: 'And what have you done with your time today?' }
    ], 'vi'), true);

    const est = estimateTranscriptLevel([
        { text: 'Xin chào các bạn, hôm nay trời đẹp.', duration: 4 },
        { text: 'Tôi đang học tiếng Việt.', duration: 3 }
    ], 'vi', { title: 'Vietnamese for Beginners A1' });
    assert.equal(est?.level, 'CEFR A1');
    assert.equal(est?.tier, 'beginner');

    const cues = [
        { text: 'Mặc dù trời mưa nhưng tôi vẫn đi học tiếng Việt.', duration: 5 },
        { text: 'Nếu bạn chăm chỉ thì sẽ tiến bộ rất nhanh.', duration: 5 },
    ];
    for (const cue of cues) {
        cue.tokens = await tokenize(cue.text, 'vi');
    }
    const graded = scoreVideoTranscript(cues, 'vi');
    assert.ok(graded, 'Expected Vietnamese transcript grading result');
    assert.equal(graded.method, 'server_linguistics');
    assert.equal(graded.speechRateUnit, 'wpm');
    assert.ok(graded.grammarCount > 0);
});

// ============================================================================
// 6. SHARED SERVER GRAMMAR API TESTS (/api/grammar)
// ============================================================================

test('GET /api/grammar serves manifest, patterns, translations, combined packs, and single-ID lookups with zero KV writes', async () => {
    clearGrammarStoreCache();
    const envWithGuard = {
        TRANSCRIPT_CACHE: {
            async get() { return null; },
            async put() { assert.fail('GET /api/grammar must not burn KV writes'); }
        }
    };

    const manifestRes = await grammarGet({ request: new Request('https://voca.study/api/grammar'), env: envWithGuard });
    assert.equal(manifestRes.status, 200);
    assert.ok(manifestRes.headers.get('Cache-Control')?.includes('s-maxage=604800'));
    const manifest = await manifestRes.json();
    assert.equal(manifest.patterns.vi, 180);
    assert.equal(manifest.patterns.en, 253);
    assert.deepEqual(manifest.languages.includes('vi'), true);
    assert.deepEqual(manifest.rules, ['en', 'vi']);

    const patternsRes = await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=vi'), env: envWithGuard });
    assert.equal(patternsRes.status, 200);
    assert.equal(patternsRes.headers.get('X-Cache'), 'MISS');
    const patterns = await patternsRes.json();
    assert.equal(patterns.length, 180);

    // Warm isolate hit skips rate limit & returns HIT-MEMORY
    const cachedPatternsRes = await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=vi'), env: envWithGuard });
    assert.equal(cachedPatternsRes.status, 200);
    assert.equal(cachedPatternsRes.headers.get('X-Cache'), 'HIT-MEMORY');

    const enRulesRes = await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=en&type=rules'), env: envWithGuard });
    assert.equal(enRulesRes.status, 200);
    const enRules = await enRulesRes.json();
    assert.equal(enRules.language, 'en');
    assert.ok(Array.isArray(enRules.nlpRules) && Array.isArray(enRules.splitRules) && Array.isArray(enRules.phrasalVerbs));
    assert.ok(enRules.nlpRules.length + enRules.splitRules.length + enRules.phrasalVerbs.length >= 100);

    const viRulesRes = await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=vi&type=rules'), env: envWithGuard });
    assert.equal(viRulesRes.status, 200);
    const viRules = await viRulesRes.json();
    assert.equal(viRules.language, 'vi');
    assert.ok(Array.isArray(viRules.sequenceRules) && Array.isArray(viRules.splitRules));
    assert.ok(viRules.sequenceRules.length + viRules.splitRules.length >= 80);

    const jaRulesRes = await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=ja&type=rules'), env: envWithGuard });
    assert.equal(jaRulesRes.status, 404);

    const transRes = await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=vi&ui=ja'), env: envWithGuard });
    assert.equal(transRes.status, 200);
    const trans = await transRes.json();
    assert.ok(trans.vi_b1_01?.shortExplanation);

    const enTransRes = await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=vi&ui=en'), env: envWithGuard });
    assert.equal(enTransRes.status, 200);
    assert.deepEqual(await enTransRes.json(), {});

    const allRes = await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=vi&ui=ko&type=all'), env: envWithGuard });
    assert.equal(allRes.status, 200);
    const allBody = await allRes.json();
    assert.equal(allBody.patterns.length, 180);
    assert.ok(allBody.translations.vi_a1_01?.title);

    const singleRes = await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=vi&id=vi_a1_01&ui=ja'), env: envWithGuard });
    assert.equal(singleRes.status, 200);
    const single = await singleRes.json();
    assert.equal(single.id, 'vi_a1_01');
    assert.ok(single.title.includes('コピュラ'));

    const missingIdRes = await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=vi&id=vi_does_not_exist'), env: envWithGuard });
    assert.equal(missingIdRes.status, 404);

    // Validation guards
    assert.equal((await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=es'), env: envWithGuard })).status, 400);
    assert.equal((await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=vi&ui=fr'), env: envWithGuard })).status, 400);
    assert.equal((await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=vi&id=../bad'), env: envWithGuard })).status, 400);

    // R2 override takes priority when present
    clearGrammarStoreCache();
    const r2OverrideEnv = {
        TRANSCRIPT_STORAGE: {
            async get(key) {
                if (key === 'grammar/patterns/vi.json') {
                    return { async json() { return [{ id: 'vi_r2_custom', language: 'vi', pattern: 'r2', title: 'R2 Override', shortExplanation: 'From R2', longExplanation: 'From R2', formation: 'r2', level: 'CEFR A1', examples: [] }]; } };
                }
                return null;
            }
        }
    };
    const r2Res = await grammarGet({ request: new Request('https://voca.study/api/grammar?lang=vi'), env: r2OverrideEnv });
    assert.equal(r2Res.status, 200);
    const r2Patterns = await r2Res.json();
    assert.equal(r2Patterns[0].id, 'vi_r2_custom');
    clearGrammarStoreCache();
});

test('EN & VI pack translations have full ID parity across vi, ja, ko, and zh', async () => {
    clearGrammarStoreCache();
    const checks = [
        { lang: 'en', expectedCount: 253 },
        { lang: 'vi', expectedCount: 180 }
    ];
    for (const { lang, expectedCount } of checks) {
        const pRes = await grammarGet({ request: new Request(`https://voca.study/api/grammar?lang=${lang}&type=patterns`), env: {} });
        assert.equal(pRes.status, 200);
        const patterns = await pRes.json();
        assert.equal(patterns.length, expectedCount, `Expected ${expectedCount} patterns for ${lang}`);
        const ids = patterns.map(p => p.id);

        for (const ui of ['vi', 'ja', 'ko', 'zh']) {
            const tRes = await grammarGet({ request: new Request(`https://voca.study/api/grammar?lang=${lang}&ui=${ui}&type=translations`), env: {} });
            assert.equal(tRes.status, 200);
            const trans = await tRes.json();
            for (const id of ids) {
                assert.ok(trans[id]?.title, `Missing ${lang} -> ${ui} title for ${id}`);
                assert.ok(trans[id]?.shortExplanation, `Missing ${lang} -> ${ui} shortExplanation for ${id}`);
            }
        }
    }
    clearGrammarStoreCache();
});

test('Upgraded EN/VI tokenization preserves contractions, root lemmas, VTB compound boundaries, and POS tags', async () => {
    const enTokens = await tokenizeEnglish("She doesn't know if she's been running well-known tests.");
    const surfaces = enTokens.map(t => t.surface);
    assert.ok(surfaces.includes('doesn') || surfaces.includes("doesn't"), 'Contraction should remain well-formed');
    const runningTok = enTokens.find(t => t.surface.toLowerCase() === 'running');
    assert.ok(runningTok, 'Should tokenize running');
    assert.equal(runningTok.baseForm, 'run');
    assert.ok(runningTok.partOfSpeech, 'EN token should include partOfSpeech tag');

    const viPossessive = await tokenizeVietnamese('Đây là sách của tôi.');
    assert.ok(viPossessive.some(t => t.surface === 'của') && viPossessive.some(t => t.surface === 'tôi'), 'Must keep "của tôi" split');

    const viResult = await tokenizeVietnamese('Anh ấy đã tìm ra đáp án rồi.');
    assert.ok(viResult.some(t => t.surface === 'tìm') && viResult.some(t => t.surface === 'ra'), 'Must keep "tìm ra" split for directional grammar');
    const timTok = viResult.find(t => t.surface === 'tìm');
    assert.equal(timTok?.partOfSpeech, 'Verb');
});

test('POST /api/grammar-detect detects EN syntactic + split phrasal rules and VI aspectual/clause-bounded rules', async () => {
    const envWithGuard = {
        TRANSCRIPT_CACHE: {
            async get() { return null; },
            async put() { assert.fail('POST /api/grammar-detect must not write to KV under threshold'); }
        }
    };

    const enReq = new Request('https://voca.study/api/grammar-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            language: 'en',
            cues: [
                { index: 0, text: 'She has been practicing piano all morning.' },
                { index: 1, text: 'Please wake me up before seven.' },
                { index: 2, text: 'Not until midnight did he realize his mistake.' }
            ]
        })
    });
    const enRes = await grammarDetectPost({ request: enReq, env: envWithGuard, waitUntil: () => {} });
    assert.equal(enRes.status, 200);
    const enBody = await enRes.json();
    assert.equal(enBody.language, 'en');
    assert.equal(enBody.results.length, 3);
    assert.ok(enBody.results[0].matches.some(m => m.patternId === 'en_b1_05'), 'Should detect Present Perfect Continuous');
    assert.ok(enBody.results[1].matches.some(m => m.patternId === 'en_a2_36'), 'Should detect separated phrasal verb wake ... up');
    assert.ok(enBody.results[2].matches.some(m => m.patternId === 'en_c1_18'), 'Should detect Not until ... inversion');

    const viReq = new Request('https://voca.study/api/grammar-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            language: 'vi',
            cues: [
                { index: 0, text: 'Họ đã tìm ra câu trả lời và làm xong bài tập.' },
                { index: 1, text: 'Bạn có thích món này không?' },
                { index: 2, text: 'Tuy khó nhưng mà họ vẫn cố gắng.' },
                { index: 3, text: 'Điều đó vô hình trung tạo ra áp lực.' },
                { index: 4, text: 'Tuy không dễ. Nhưng họ vẫn thử.' }
            ]
        })
    });
    const viRes = await grammarDetectPost({ request: viReq, env: envWithGuard, waitUntil: () => {} });
    assert.equal(viRes.status, 200);
    const viBody = await viRes.json();
    assert.equal(viBody.language, 'vi');
    const cue0Ids = viBody.results[0].matches.map(m => m.patternId);
    assert.ok(cue0Ids.includes('vi_a2_17') && cue0Ids.includes('vi_a2_24'), 'Should detect V + ra and V + xong resultatives');
    assert.ok(viBody.results[1].matches.some(m => m.patternId === 'vi_a1_21'), 'Should detect ... không? yes/no question');
    assert.ok(viBody.results[2].matches.some(m => m.patternId === 'vi_b1_02'), 'Should detect same-clause Tuy ... nhưng ...');
    assert.ok(viBody.results[3].matches.some(m => m.patternId === 'vi_c2_12'), 'Should detect C2 formal marker vô hình trung');
    assert.equal(viBody.results[4].matches.some(m => m.patternId === 'vi_b1_02'), false, 'Must not match Tuy ... nhưng across sentence boundary');

    // Validation guards
    const badLang = await grammarDetectPost({
        request: new Request('https://voca.study/api/grammar-detect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ language: 'ja', text: 'テスト' })
        }),
        env: envWithGuard
    });
    assert.equal(badLang.status, 400);
});

test('Tokenizer [JA]: fixes Kuromoji/IPADIC misreadings for 二人, 一人, and Xの間 without breaking exceptions', async () => {
    const fmt = (tokens) => tokens.map(t => (t.reading ? `${t.surface}(${t.reading})` : t.surface)).join(' ');

    const futariAida = fmt(await tokenizeJapanese('二人の間 通り過ぎた風は'));
    assert.ok(futariAida.includes('二人(ふたり) の 間(あいだ)'), `Expected 二人(ふたり) の 間(あいだ), got: ${futariAida}`);

    const hitori = fmt(await tokenizeJapanese('一人で行く'));
    assert.ok(hitori.includes('一人(ひとり) で'), `Expected 一人(ひとり), got: ${hitori}`);

    const kimiToAida = fmt(await tokenizeJapanese('君との間に風が吹く'));
    assert.ok(kimiToAida.includes('の 間(あいだ) に'), `Expected の 間(あいだ) に, got: ${kimiToAida}`);

    // Exceptions must remain untouched
    const twentyOne = fmt(await tokenizeJapanese('二十一人いる'));
    assert.ok(twentyOne.includes('一(いち) 人(にん)'), `Must preserve 二十一人 reading, got: ${twentyOne}`);

    const ichininmae = fmt(await tokenizeJapanese('一人前になる'));
    assert.ok(!ichininmae.includes('ひとり'), `Must preserve 一人前 reading, got: ${ichininmae}`);

    const nininSankyaku = fmt(await tokenizeJapanese('二人三脚で走る'));
    assert.ok(nininSankyaku.includes('二人三脚(ににんさんきゃく)'), `Must preserve 二人三脚 reading, got: ${nininSankyaku}`);

    const itsunomanika = fmt(await tokenizeJapanese('いつの間にか消えた'));
    assert.ok(itsunomanika.includes('いつの間にか(いつのまにか)'), `Must preserve いつの間にか reading, got: ${itsunomanika}`);

    const suneo = fmt(await tokenizeJapanese('スネ夫が開けろ'));
    assert.ok(suneo.includes('スネ夫(すねお) が'), `Expected スネ夫(すねお), got: ${suneo}`);
    assert.ok(!suneo.includes('おっと'), `Must not read スネ夫 as おっと, got: ${suneo}`);
});

test('Japanese pronunciation handles numeric counters, particles and greetings on both tokenization paths', async () => {
    for (const tokenizeJa of [tokenizeJapanese, tokenizeJapaneseFast]) {
        for (const surface of ['二人', '2人', '２人']) {
            const tokens = await tokenizeJa(`${surface}は友達。`);
            assert.equal(tokens.find(t => t.surface === surface)?.romanization, 'futari');
            assert.equal(tokens.find(t => t.surface === 'は')?.romanization, 'wa');
        }

        const greetings = await tokenizeJa('こんにちは。こんばんは。');
        assert.equal(greetings.find(t => t.surface === 'こんにちは')?.romanization, 'konnichiwa');
        assert.equal(greetings.find(t => t.surface === 'こんばんは')?.romanization, 'konbanwa');

        const lexical = await tokenizeJa('はじめから。');
        assert.equal(lexical.find(t => t.surface === 'はじめ')?.romanization, 'hajime');
    }

    assert.equal(tokenizeJapaneseFast('「は」').find(t => t.surface === 'は')?.romanization, 'ha');

    const separateQuantity = await tokenizeJapanese('二人三時間も待っていた。');
    assert.equal(separateQuantity.find(t => t.surface === '二人')?.romanization, 'futari');
    const compound = await tokenizeJapanese('二人三脚で走る。');
    assert.equal(compound.find(t => t.surface === '二人三脚')?.romanization, 'nininsankyaku');
});

test('Japanese transcript response corrects stored readings without changing cue timing or text', () => {
    const cues = [{
        text: '二人は友達。',
        start: 1,
        duration: 3,
        tokens: [
            { surface: '二人', reading: 'ににん', romanization: 'ninin', partOfSpeech: '名詞' },
            { surface: 'は', romanization: 'ha', partOfSpeech: '助詞' },
            { surface: '友達', reading: 'ともだち', romanization: 'tomodachi' },
            { surface: '。', isPunctuation: true }
        ]
    }];
    const [cue] = correctTranscriptPronunciation(cues, 'ja');
    assert.equal(cue.text, cues[0].text);
    assert.equal(cue.start, cues[0].start);
    assert.equal(cue.duration, cues[0].duration);
    assert.deepEqual(cue.tokens.map(t => t.romanization), ['futari', 'wa', 'tomodachi', undefined]);
    assert.equal(cues[0].tokens[1].romanization, 'ha');
    assert.deepEqual(correctTranscriptPronunciation([cue], 'ja'), [cue]);
    assert.strictEqual(correctTranscriptPronunciation(cues, 'zh'), cues);
});
