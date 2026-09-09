import { Injectable, signal } from '@angular/core';
import { GrammarPattern, GrammarMatch, GrammarTranslation, SupportedGrammarLang } from '../models/grammar.model';
import { Token } from '../models';
import nlp from 'compromise';

interface SplitPatternRule {
    start: string;
    end: string;
    patternKey: string;
    patternId?: string;
}

const ZH_SPLIT_RULES: SplitPatternRule[] = [
    { start: '虽然', end: '但是', patternKey: '虽然但是' },
    { start: '因为', end: '所以', patternKey: '因为所以' },
    { start: '如果', end: '就', patternKey: '如果就' },
    { start: '越', end: '越', patternKey: '越越' },
    { start: '一边', end: '一边', patternKey: '一边一边' },
    { start: '不但', end: '而且', patternKey: '不但而且' },
    { start: '除了', end: '以外', patternKey: '除了以外' },
    { start: '是', end: '的', patternKey: '是的' },
    { start: '既然', end: '就', patternKey: '既然就' },
    { start: '只要', end: '就', patternKey: '只要就' },
    { start: '只有', end: '才', patternKey: '只有才' },
    { start: '即使', end: '也', patternKey: '即使也' },
    { start: '哪怕', end: '也', patternKey: '哪怕也' },
    { start: '与其', end: '不如', patternKey: '与其不如' },
    { start: '既', end: '又', patternKey: '既又' },
    { start: '不仅', end: '而且', patternKey: '不仅而且' },
];

interface EnglishNlpRule {
    id: string;
    match: string;
}

const EN_NLP_RULES: EnglishNlpRule[] = [
    // Compound Tenses
    { id: 'en_b1_02', match: '(have|has) been #Gerund' },
    { id: 'en_b2_01', match: 'had #PastTense' },
    { id: 'en_b2_02', match: 'had been #Gerund' },
    { id: 'en_b1_24', match: 'will be #Gerund' },
    { id: 'en_b1_25', match: 'will have #PastTense' },
    { id: 'en_c2_14', match: 'will have been #Gerund' },
    { id: 'en_a2_07', match: '(#Copula|am|is|are|was|were)? going to #Verb' },

    // Modal Perfects
    { id: 'en_b2_03', match: "(must|must've) have? #PastTense" },
    { id: 'en_b2_04', match: "(can't|cannot) have #PastTense" },
    { id: 'en_b2_05', match: "(should|should've|shouldn't) have? #PastTense" },
    { id: 'en_b2_06', match: "(might|might've|could|could've|couldn't) have? #PastTense" },
    { id: 'en_b2_07', match: "(would|would've|wouldn't) have? #PastTense" },

    // Habit, Preference & Familiarity
    { id: 'en_b2_20', match: '(#Copula|get|gets|got|getting) used to (#Gerund|#Noun)' },
    { id: 'en_b1_21', match: 'used to #Infinitive' },
    { id: 'en_b1_21', match: "(would|'d) rather #Verb" },

    // Necessity & Obligation
    { id: 'en_a2_13', match: '(have|has|had|having) to #Verb' },
    { id: 'en_a2_23', match: "(have|has|'ve|'s) got [!to]" },
    { id: 'en_a2_11', match: "(had|'d) better #Verb" },
    { id: 'en_b2_23', match: 'ought to #Verb' },
    { id: 'en_a1_19', match: '(#Copula|been) able to #Verb' },

    // Split Correlatives & Comparisons
    { id: 'en_a2_15', match: 'as (#Adjective|#Adverb) as' },
    { id: 'en_b2_19', match: 'too (#Adjective|#Adverb) to #Verb' },
    { id: 'en_b2_19', match: 'so (#Adjective|#Adverb) that' },
    { id: 'en_b2_19', match: 'such (a|an)? #Noun that' },
    { id: 'en_c1_03', match: 'no sooner .? than' },
    { id: 'en_c1_03', match: 'hardly .? when' },

    // Idiomatic Clauses & Discourse
    { id: 'en_c1_09', match: 'as (if|though)' },
    { id: 'en_b1_23', match: 'even (though|if)' },
    { id: 'en_b1_23', match: 'in spite of' },
    { id: 'en_b1_23', match: 'instead of' },
    { id: 'en_c2_01', match: 'as (long|soon) as' },
    { id: 'en_c2_01', match: '(provided|providing|on condition) that' },
    { id: 'en_b1_26', match: '(in order|so as) to #Verb' },
    { id: 'en_b1_26', match: 'so that' },
    { id: 'en_c2_16', match: 'as well as' },
    { id: 'en_a1_16', match: 'there (is|are|was|were|has been|have been)' },
    { id: 'en_c1_08', match: "(it is|it's) (high )?time" },
    { id: 'en_b2_11', match: 'it is (said|believed|thought|reported) that' },
];

/**
 * GrammarService
 * Detects grammar patterns in tokenized sentences and provides grammar explanations.
 * Grammar data is lazy-loaded by language.
 */
@Injectable({ providedIn: 'root' })
export class GrammarService {
    // Static registries for lazy loading - enables build-time code splitting per language
    private static readonly PATTERN_LOADERS: Record<SupportedGrammarLang, () => Promise<GrammarPattern[]>> = {
        ja: async () => (await import('../data/grammar-ja')).GRAMMAR_JA,
        ko: async () => (await import('../data/grammar-ko')).GRAMMAR_KO,
        zh: async () => (await import('../data/grammar-zh')).GRAMMAR_ZH,
        en: async () => (await import('../data/grammar-en')).GRAMMAR_EN,
    };

    private static readonly TRANSLATION_LOADERS: Record<string, () => Promise<Record<string, GrammarTranslation>>> = {
        en_vi: async () => (await import('../data/translations/en/vi')).GRAMMAR_EN_VI,
        en_zh: async () => (await import('../data/translations/en/zh')).GRAMMAR_EN_ZH,
        en_ja: async () => (await import('../data/translations/en/ja')).GRAMMAR_EN_JA,
        en_ko: async () => (await import('../data/translations/en/ko')).GRAMMAR_EN_KO,

        ja_vi: async () => (await import('../data/translations/ja/vi')).GRAMMAR_JA_VI,
        ja_zh: async () => (await import('../data/translations/ja/zh')).GRAMMAR_JA_ZH,
        ja_ko: async () => (await import('../data/translations/ja/ko')).GRAMMAR_JA_KO,
        ja_ja: async () => (await import('../data/translations/ja/ja')).GRAMMAR_JA_JA,

        ko_vi: async () => (await import('../data/translations/ko/vi')).GRAMMAR_KO_VI,
        ko_zh: async () => (await import('../data/translations/ko/zh')).GRAMMAR_KO_ZH,
        ko_ja: async () => (await import('../data/translations/ko/ja')).GRAMMAR_KO_JA,
        ko_ko: async () => (await import('../data/translations/ko/ko')).GRAMMAR_KO_KO,

        zh_vi: async () => (await import('../data/translations/zh/vi')).GRAMMAR_ZH_VI,
        zh_ja: async () => (await import('../data/translations/zh/ja')).GRAMMAR_ZH_JA,
        zh_ko: async () => (await import('../data/translations/zh/ko')).GRAMMAR_ZH_KO,
        zh_zh: async () => (await import('../data/translations/zh/zh')).GRAMMAR_ZH_ZH,
    };

    // Grammar mode toggle
    readonly grammarModeEnabled = signal(true);

    // Currently selected pattern
    readonly selectedPattern = signal<GrammarPattern | null>(null);
    readonly isPopupVisible = signal(false);

    // Reactive signals notifying subscribers when language data finishes loading
    readonly loadedLanguages = signal<Set<string>>(new Set());
    readonly loadedTranslations = signal<Set<string>>(new Set());

    // Caches for patterns, lookup indices, and translations
    private patternsCache = new Map<SupportedGrammarLang, GrammarPattern[]>();
    private indicesCache = new Map<SupportedGrammarLang, Map<string, GrammarPattern[]>>();
    private translationsCache = new Map<string, Record<string, GrammarTranslation>>();

    // In-flight loading promises preventing concurrent duplicate requests
    private patternPromises = new Map<SupportedGrammarLang, Promise<GrammarPattern[]>>();
    private translationPromises = new Map<string, Promise<Record<string, GrammarTranslation>>>();

    // Common Japanese grammar endings to detect (longest match first)
    private readonly jaEndingPatterns = [
        'ている', 'ていた', 'ています', 'ていました',
        'たい', 'たかった', 'たくない', 'たくなかった',
        'ない', 'なかった', 'ません', 'ませんでした',
        'れる', 'られる', 'させる', 'させられる',
        'たら', 'たり', 'ても',
        'ば', 'なければ', 'なければならない',
        'てもいい', 'てはいけない',
        'ることができる', 'ことがある',
        'ようにする', 'ようになる',
        'てしまう', 'ちゃう', 'ておく', 'とく',
        'てくる', 'ていく',
        'かもしれない', 'はずだ', 'ようだ', 'そうだ',
        'みたい', 'らしい',
        'のに', 'ので', 'から', 'けど', 'けれども',
    ].sort((a, b) => b.length - a.length);

    // Common Korean grammar particles and verb endings (longest match first)
    private readonly koEndingPatterns = [
        '은', '는', '이', '가', '을', '를', '에', '에서', '에게', '한테', '도', '만',
        '과', '와', '로', '으로', '랑', '이랑', '보다', '부터', '까지', '의',
        '고', '고 있다', '고싶다', '지 않다', '지 못하다',
        '아서', '어서', '여서', '면', '으면', '려고', '으려고', '려고 하다',
        'ㄹ 수 있다', '을 수 있다', '수 있다', 'ㄹ 수 없다', '을 수 없다', '수 없다',
        '아야 하다', '어야 하다', '여야 하다', '아야해요', '어야해요',
        '아요', '어요', '여요', 'ㅂ니다', '습니다', '았', '었', '였', '네요',
        '지요', '죠', '세요', '으세요', '지 마세요', '지마세요', '는데', '은데', 'ㄴ데',
        '기 때문에', '기때문에', 'ㄹ 때', '을 때', '때',
        '이에요', '예요', '하고'
    ].sort((a, b) => b.length - a.length);

    /**
     * Load patterns for a language (lazy).
     * Uses a per-language in-flight promise to prevent redundant concurrent fetches.
     */
    private loadPatterns(lang: SupportedGrammarLang): Promise<GrammarPattern[]> {
        if (this.patternPromises.has(lang)) {
            return this.patternPromises.get(lang)!;
        }

        const promise = this._doLoadPatterns(lang);
        this.patternPromises.set(lang, promise);
        return promise;
    }

    private async _doLoadPatterns(lang: SupportedGrammarLang): Promise<GrammarPattern[]> {
        try {
            let patterns = this.patternsCache.get(lang);
            if (!patterns) {
                const loader = GrammarService.PATTERN_LOADERS[lang];
                if (!loader) return [];
                patterns = await loader();
                this.patternsCache.set(lang, patterns);
                this.indicesCache.set(lang, this.buildIndex(patterns));
            }

            this.loadedLanguages.update(set => new Set(set).add(lang));
            return patterns;
        } catch (err) {
            this.patternPromises.delete(lang);
            throw err;
        }
    }

    /**
     * Get all patterns for a language (sync - returns cached or empty)
     */
    getPatterns(lang: SupportedGrammarLang): GrammarPattern[] {
        return this.patternsCache.get(lang) || [];
    }

    /**
     * Get index for a language
     */
    private getIndex(lang: SupportedGrammarLang): Map<string, GrammarPattern[]> | null {
        return this.indicesCache.get(lang) || null;
    }

    /**
     * Build search index for patterns
     */
    private buildIndex(patterns: GrammarPattern[]): Map<string, GrammarPattern[]> {
        const index = new Map<string, GrammarPattern[]>();

        const addToIndex = (rawKey: string, pattern: GrammarPattern, stripPlaceholders = true) => {
            if (!rawKey) return;
            const key = this.normalizePattern(rawKey, pattern.language, stripPlaceholders);
            if (!key) return;
            let list = index.get(key);
            if (!list) {
                list = [];
                index.set(key, list);
            }
            if (!list.includes(pattern)) {
                list.push(pattern);
            }
        };

        for (const pattern of patterns) {
            // Index by pattern ID
            addToIndex(pattern.id, pattern, false);

            // For English, grammar patterns are detected via Compromise NLP rules directly.
            // Skipping raw substring indexing prevents common English words from being tagged as grammar.
            if (pattern.language === 'en') {
                continue;
            }

            let cleanPattern = pattern.pattern;
            if (pattern.language === 'ko' && cleanPattern.includes('[')) {
                cleanPattern = cleanPattern.split('[')[0].trim();
            }

            // Index by pattern text (both raw normalized and with placeholders stripped)
            addToIndex(cleanPattern, pattern, false);
            addToIndex(cleanPattern, pattern, true);

            // Index with and without parentheses (e.g. "(的)" -> "的", "(으)면" -> "으면" and "면")
            if (cleanPattern.includes('(') || cleanPattern.includes('（')) {
                addToIndex(cleanPattern.replace(/[()（）]/g, ''), pattern, true);
                addToIndex(cleanPattern.replace(/\([^)]+\)/g, '').replace(/（[^）]+）/g, ''), pattern, true);
            }

            // Slash alternatives (e.g. "이/가", "은/는")
            if (cleanPattern.includes('/')) {
                for (const part of cleanPattern.split('/')) {
                    addToIndex(part, pattern, true);
                    if (part.includes('(') || part.includes('（')) {
                        addToIndex(part.replace(/[()（）]/g, ''), pattern, true);
                        addToIndex(part.replace(/\([^)]+\)/g, ''), pattern, true);
                    }
                }
            }

            // Sub-patterns in title (split by :, -, –, /, ,)
            if (pattern.title.includes(':') || pattern.title.includes(' - ') || pattern.title.includes(' – ')) {
                const sep = pattern.title.includes(':') ? ':' : (pattern.title.includes(' - ') ? ' - ' : ' – ');
                const parts = pattern.title.split(sep);
                if (parts[1]) {
                    const subParts = parts[1].split(/[,/]/);
                    for (const sub of subParts) {
                        const cleanSub = sub.replace(/\[[^\]]*\]/g, '').replace(/\([^)]*\)/g, '').trim();
                        if (cleanSub) addToIndex(cleanSub, pattern, true);
                    }
                }
            }

            // Japanese connector / adjective title extraction
            if (pattern.language === 'ja') {
                const connMatch = pattern.title.match(/[A-Z]。([^、~～]+)[、~～]/);
                if (connMatch) addToIndex(connMatch[1], pattern, true);
                if (pattern.title.includes('いちばん') || pattern.title.includes('一番')) {
                    addToIndex('いちばん', pattern, true);
                    addToIndex('がいちばん', pattern, true);
                    addToIndex('一番', pattern, true);
                    addToIndex('が一番', pattern, true);
                }
                if (pattern.title.includes('より')) addToIndex('より', pattern, true);
                if (pattern.title.includes('い-Adjective く')) addToIndex('く', pattern, true);
                if (pattern.title.includes('い-Adjective て')) addToIndex('くて', pattern, true);
                if (pattern.title.includes('な-Adjective に')) addToIndex('に', pattern, true);
                if (pattern.title.includes('な-Adjective で')) addToIndex('で', pattern, true);
            }

            // Korean title extraction
            if (pattern.language === 'ko') {
                const koMatch = pattern.title.match(/^([^[(]+)/);
                if (koMatch) {
                    const koPart = koMatch[1].trim();
                    addToIndex(koPart, pattern, true);
                    if (koPart.includes('/')) {
                        for (const p of koPart.split('/')) {
                            addToIndex(p, pattern, true);
                        }
                    }
                }
            }
        }

        return index;
    }

    /**
     * Normalize pattern for matching (strip punctuation, whitespace, dots, ellipsis, and lowercase)
     */
    private normalizePattern(pattern: string, lang?: SupportedGrammarLang, stripPlaceholders = true): string {
        if (!pattern) return '';
        let norm = pattern
            .replace(/[~～〜。、・….\s?？！!,，:：;；"'"'“”‘’()（）\u005B\u005D【】]/g, '')
            .toLowerCase();

        // For non-English languages, strip pedagogical placeholders (N, V, M, Adj, A, B, AGE, etc.)
        if (stripPlaceholders && lang && lang !== 'en') {
            const withoutPlaceholders = norm
                .replace(/\b(adj|noun|verb)\b/gi, '')
                .replace(/(adjective|adverb)/gi, '')
                .replace(/[nvabm](\d)?/gi, '')
                .replace(/age/gi, '');
            if (withoutPlaceholders.length >= 1) {
                norm = withoutPlaceholders;
            }
        }
        return norm;
    }

    /**
     * Lazy-load translation pack for a learning language and UI language
     */
    async loadTranslation(learningLang: SupportedGrammarLang, uiLang: string): Promise<Record<string, GrammarTranslation>> {
        if (uiLang === 'en') {
            return {};
        }

        const key = `${learningLang}_${uiLang}`;
        if (this.translationsCache.has(key)) {
            return this.translationsCache.get(key)!;
        }

        if (this.translationPromises.has(key)) {
            return this.translationPromises.get(key)!;
        }

        const loader = GrammarService.TRANSLATION_LOADERS[key];
        if (!loader) {
            return {};
        }

        const promise = (async () => {
            try {
                const translations = await loader();
                this.translationsCache.set(key, translations);
                this.loadedTranslations.update(set => new Set(set).add(key));
                return translations;
            } catch (e) {
                console.warn(`[GrammarService] Failed to load translation pack ${key}:`, e);
                return {};
            } finally {
                this.translationPromises.delete(key);
            }
        })();

        this.translationPromises.set(key, promise);
        return promise;
    }

    /**
     * Get already loaded translation pack synchronously
     */
    getLoadedTranslation(learningLang: SupportedGrammarLang, uiLang: string): Record<string, GrammarTranslation> | null {
        return this.translationsCache.get(`${learningLang}_${uiLang}`) || null;
    }

    /**
     * Preload patterns for a language
     */
    preloadPatterns(lang: SupportedGrammarLang): void {
        this.loadPatterns(lang).catch(() => {
            // Silently fail - patterns will be loaded on demand
        });
    }

    /**
     * Detect grammar patterns in tokenized sentence
     */
    detectPatterns(tokens: Token[], lang: SupportedGrammarLang): GrammarMatch[] {
        if (!this.grammarModeEnabled() || tokens.length === 0) {
            return [];
        }

        // Dedicated NLP pattern detection for English (mirroring Kuromoji for Japanese)
        if (lang === 'en') {
            return this.detectEnglishPatternsWithNlp(tokens);
        }

        const index = this.getIndex(lang);
        if (!index) {
            this.loadPatterns(lang);
            return [];
        }

        const matches: GrammarMatch[] = [];
        const maxSeqLen = 5;

        // Strategy 1: Check token sequences
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].isPunctuation || !tokens[i].surface.trim()) continue;

            for (let len = 1; len <= Math.min(maxSeqLen, tokens.length - i); len++) {
                const sequence = tokens.slice(i, i + len);
                if (sequence[sequence.length - 1].isPunctuation) continue;
                const sequenceText = sequence.map(t => t.surface).join('');
                const normalizedSeq = this.normalizePattern(sequenceText, lang, false);

                const foundPatterns = index.get(normalizedSeq);
                if (foundPatterns && foundPatterns.length > 0) {
                    const tokenIndices = Array.from({ length: len }, (_, j) => i + j);
                    matches.push({
                        pattern: foundPatterns[0],
                        tokenIndices,
                        startIndex: i,
                        endIndex: i + len - 1,
                    });
                } else if (lang === 'ko' && normalizedSeq.length >= 3) {
                    // Korean sub-sequence suffix checking (e.g. 읽는 김에 -> suffix 는김에)
                    for (let sLen = normalizedSeq.length - 1; sLen >= 2; sLen--) {
                        const suffix = normalizedSeq.slice(-sLen);
                        const suffixHits = index.get(suffix);
                        if (suffixHits && suffixHits.length > 0) {
                            const tokenIndices = Array.from({ length: len }, (_, j) => i + j);
                            matches.push({
                                pattern: suffixHits[0],
                                tokenIndices,
                                startIndex: i,
                                endIndex: i + len - 1,
                            });
                            break;
                        }
                    }
                }
            }
        }

        // Strategy 2: For Japanese, check grammar endings on individual tokens and base forms
        if (lang === 'ja') {
            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                if (token.isPunctuation) continue;

                // Check common grammar endings (longest match first)
                for (const ending of this.jaEndingPatterns) {
                    if (token.surface.endsWith(ending) || token.surface === ending) {
                        const foundPatterns = index.get(this.normalizePattern(ending, 'ja', false));
                        if (foundPatterns && foundPatterns.length > 0) {
                            matches.push({
                                pattern: foundPatterns[0],
                                tokenIndices: [i],
                                startIndex: i,
                                endIndex: i,
                            });
                            break;
                        }
                    }
                }

                // Check baseForm for verb-related patterns
                if (token.baseForm && token.baseForm !== token.surface) {
                    const baseFormPatterns = index.get(this.normalizePattern(token.baseForm, 'ja', false));
                    if (baseFormPatterns && baseFormPatterns.length > 0) {
                        matches.push({
                            pattern: baseFormPatterns[0],
                            tokenIndices: [i],
                            startIndex: i,
                            endIndex: i,
                        });
                    }
                }
            }
        }

        // Strategy 2 (KO): Korean endings and particles
        if (lang === 'ko') {
            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                if (token.isPunctuation) continue;

                for (const ending of this.koEndingPatterns) {
                    const normEnding = this.normalizePattern(ending, 'ko', false);
                    if (token.surface.endsWith(ending) || token.surface === ending || this.normalizePattern(token.surface, 'ko', false).endsWith(normEnding)) {
                        const foundPatterns = index.get(normEnding);
                        if (foundPatterns && foundPatterns.length > 0) {
                            matches.push({
                                pattern: foundPatterns[0],
                                tokenIndices: [i],
                                startIndex: i,
                                endIndex: i,
                            });
                            break;
                        }
                    }
                }
            }

            // Strategy 3 (KO): Korean Compound Auxiliary Verbs
            for (let i = 0; i < tokens.length; i++) {
                const t1 = tokens[i];
                const t2 = tokens[i + 1];
                const t3 = tokens[i + 2];

                // (으)ㄹ 수 있다 / 없다
                if (t1 && t2 && t2.surface === '수' && t3 && /^[있없]/.test(t3.surface)) {
                    const code = t1.surface.charCodeAt(t1.surface.length - 1) - 0xAC00;
                    if (code >= 0 && code <= 11171 && (code % 28) === 8) {
                        const hit = index.get('ㄹ수있다') || index.get('수있다');
                        if (hit && hit.length > 0) {
                            matches.push({ pattern: hit[0], tokenIndices: [i, i + 1, i + 2], startIndex: i, endIndex: i + 2 });
                        }
                    }
                }

                // ~고 있다
                if (t1 && t1.surface.endsWith('고') && t2 && /^있/.test(t2.surface)) {
                    const hit = index.get('고있다') || index.get('하고있다');
                    if (hit && hit.length > 0) {
                        matches.push({ pattern: hit[0], tokenIndices: [i, i + 1], startIndex: i, endIndex: i + 1 });
                    }
                }

                // ~고 싶다
                if (t1 && t1.surface.endsWith('고') && t2 && /^싶/.test(t2.surface)) {
                    const hit = index.get('고싶다') || index.get('하고싶다');
                    if (hit && hit.length > 0) {
                        matches.push({ pattern: hit[0], tokenIndices: [i, i + 1], startIndex: i, endIndex: i + 1 });
                    }
                }

                // ~지 않다
                if (t1 && t1.surface.endsWith('지') && t2 && /^않/.test(t2.surface)) {
                    const hit = index.get('지않다');
                    if (hit && hit.length > 0) {
                        matches.push({ pattern: hit[0], tokenIndices: [i, i + 1], startIndex: i, endIndex: i + 1 });
                    }
                }

                // ~아/어야 하다
                if (t1 && /[아어여해]야$/.test(t1.surface) && t2 && /^[하해되]/.test(t2.surface)) {
                    const hit = index.get('아어야하다') || index.get('어야하다');
                    if (hit && hit.length > 0) {
                        matches.push({ pattern: hit[0], tokenIndices: [i, i + 1], startIndex: i, endIndex: i + 1 });
                    }
                }

                // ~아/어 보다
                if (t1 && /[아어여해]$/.test(t1.surface) && t2 && /^보/.test(t2.surface)) {
                    const hit = index.get('아어보다') || index.get('어보다');
                    if (hit && hit.length > 0) {
                        matches.push({ pattern: hit[0], tokenIndices: [i, i + 1], startIndex: i, endIndex: i + 1 });
                    }
                }
            }
        }

        // Strategy 4: Check split correlative patterns (Chinese)
        if (lang === 'zh') {
            matches.push(...this.detectSplitPatterns(tokens, ZH_SPLIT_RULES, index));
        }

        // Remove duplicate patterns on same tokens
        return this.deduplicateMatches(matches);
    }

    /**
     * Find token index range for a sub-phrase within tokens starting at or after fromIndex
     */
    private findPhraseTokens(tokens: Token[], phrase: string, fromIndex: number): number[] | null {
        const targetNorm = this.normalizePattern(phrase);
        if (!targetNorm) return null;

        for (let i = fromIndex; i < tokens.length; i++) {
            if (!tokens[i].surface.trim()) continue;

            let seq = '';
            for (let len = 1; len <= Math.min(5, tokens.length - i); len++) {
                seq += tokens[i + len - 1].surface;
                if (this.normalizePattern(seq) === targetNorm) {
                    return Array.from({ length: len }, (_, j) => i + j);
                }
            }
        }
        return null;
    }

    /**
     * Detect split correlative patterns across tokens (e.g. 虽然...但是, not only...but also)
     */
    private detectSplitPatterns(
        tokens: Token[],
        rules: SplitPatternRule[],
        index: Map<string, GrammarPattern[]>
    ): GrammarMatch[] {
        const matches: GrammarMatch[] = [];

        for (const rule of rules) {
            const startRange = this.findPhraseTokens(tokens, rule.start, 0);
            if (!startRange) continue;

            const nextIndex = startRange[startRange.length - 1] + 1;
            const endRange = this.findPhraseTokens(tokens, rule.end, nextIndex);
            if (!endRange) continue;

            const foundPatterns = (rule.patternId ? index.get(this.normalizePattern(rule.patternId)) : null)
                || index.get(this.normalizePattern(rule.patternKey));

            if (foundPatterns && foundPatterns.length > 0) {
                matches.push({
                    pattern: foundPatterns[0],
                    tokenIndices: [...startRange, ...endRange],
                    startIndex: startRange[0],
                    endIndex: endRange[endRange.length - 1],
                });
            }
        }

        return matches;
    }

    /**
     * Detect English grammar patterns using Compromise NLP.
     * Matches complex tenses, modal perfects, phrasal modals, and correlatives
     * without flagging common vocabulary words.
     */
    private detectEnglishPatternsWithNlp(tokens: Token[]): GrammarMatch[] {
        if (tokens.length === 0) return [];

        const patterns = this.getPatterns('en');
        if (patterns.length === 0) {
            this.loadPatterns('en');
            return [];
        }

        // Reconstruct full text from tokens
        const fullText = tokens.map(t => t.surface).join('');
        if (!fullText.trim()) return [];

        const doc = nlp(fullText);
        const matches: GrammarMatch[] = [];

        for (const rule of EN_NLP_RULES) {
            const found = doc.match(rule.match);
            if (found.found) {
                const pattern = this.getPatternById(rule.id, 'en');
                if (!pattern) continue;

                // Handle multiple occurrences in the same sentence
                const jsonMatches = found.json({ terms: true });
                for (const jMatch of jsonMatches) {
                    const termTexts = (jMatch.terms || []).filter(t => t.text).map(t => t.text);
                    if (termTexts.length === 0) continue;

                    const tokenIndices = this.findMatchTokenIndices(tokens, termTexts);
                    if (tokenIndices.length > 0) {
                        matches.push({
                            pattern,
                            tokenIndices,
                            startIndex: tokenIndices[0],
                            endIndex: tokenIndices[tokenIndices.length - 1],
                        });
                    }
                }
            }
        }

        // Correlative conjunction pairs: neither...nor, either...or, both...and
        const correlativePairs = [
            { id: 'en_c2_16', start: 'neither', end: 'nor' },
            { id: 'en_c2_16', start: 'either', end: 'or' },
            { id: 'en_c2_16', start: 'both', end: 'and' },
            { id: 'en_c1_02', start: 'not only', end: 'but .? also' }
        ];

        for (const pair of correlativePairs) {
            const startM = doc.match(pair.start);
            const endM = doc.match(pair.end);
            if (startM.found && endM.found) {
                const pattern = this.getPatternById(pair.id, 'en');
                if (!pattern) continue;

                const startTerms = startM.json({ terms: true })[0]?.terms?.filter(t => t.text).map(t => t.text) || [];
                const endTerms = endM.json({ terms: true })[0]?.terms?.filter(t => t.text).map(t => t.text) || [];

                const startIndices = this.findMatchTokenIndices(tokens, startTerms);
                const endIndices = this.findMatchTokenIndices(tokens, endTerms);

                if (startIndices.length > 0 && endIndices.length > 0 && startIndices[startIndices.length - 1] < endIndices[0]) {
                    const distance = endIndices[0] - startIndices[startIndices.length - 1];
                    if (distance <= 12) {
                        const tokenIndices = [...startIndices, ...endIndices];
                        matches.push({
                            pattern,
                            tokenIndices,
                            startIndex: startIndices[0],
                            endIndex: endIndices[endIndices.length - 1],
                        });
                    }
                }
            }
        }

        return this.deduplicateMatches(matches);
    }

    /**
     * Map matched NLP term texts to token indices, ignoring punctuation and whitespace
     */
    private findMatchTokenIndices(tokens: Token[], matchedTerms: string[]): number[] {
        if (matchedTerms.length === 0) return [];

        const cleanWord = (s: string) => s.toLowerCase().replace(/[^a-z0-9'’]/g, '');

        for (let i = 0; i <= tokens.length - matchedTerms.length; i++) {
            let match = true;
            let tIdx = i;
            const matchedIndices: number[] = [];

            for (let m = 0; m < matchedTerms.length; m++) {
                while (tIdx < tokens.length && tokens[tIdx].isPunctuation) {
                    tIdx++;
                }
                if (tIdx >= tokens.length) {
                    match = false;
                    break;
                }

                const tokenWord = cleanWord(tokens[tIdx].surface);
                const termWord = cleanWord(matchedTerms[m]);

                if (tokenWord !== termWord) {
                    match = false;
                    break;
                }

                matchedIndices.push(tIdx);
                tIdx++;
            }

            if (match && matchedIndices.length === matchedTerms.length) {
                return matchedIndices;
            }
        }

        return [];
    }

    /**
     * Remove duplicate matches (same pattern on same tokens)
     */
    private deduplicateMatches(matches: GrammarMatch[]): GrammarMatch[] {
        const seen = new Set<string>();
        return matches.filter(m => {
            const key = `${m.pattern.id}-${m.tokenIndices.join(',')}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    /**
     * Search patterns by keyword
     */
    async searchPatterns(query: string, lang: SupportedGrammarLang): Promise<GrammarPattern[]> {
        const patterns = await this.loadPatterns(lang);
        const normalizedQuery = query.toLowerCase();

        return patterns.filter(p =>
            p.pattern.toLowerCase().includes(normalizedQuery) ||
            p.title.toLowerCase().includes(normalizedQuery) ||
            p.shortExplanation.toLowerCase().includes(normalizedQuery)
        ).slice(0, 20);
    }

    /**
     * Get pattern by ID
     */
    getPatternById(id: string, lang: SupportedGrammarLang): GrammarPattern | undefined {
        return this.getPatterns(lang).find(p => p.id === id);
    }

    /**
     * Show grammar popup
     */
    showPopup(pattern: GrammarPattern): void {
        this.selectedPattern.set(pattern);
        this.isPopupVisible.set(true);
    }

    /**
     * Close grammar popup
     */
    closePopup(): void {
        this.isPopupVisible.set(false);
        this.selectedPattern.set(null);
    }

    /**
     * Toggle grammar mode
     */
    toggleGrammarMode(): void {
        this.grammarModeEnabled.update(v => !v);
    }
}
