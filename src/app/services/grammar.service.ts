import { Injectable, signal } from '@angular/core';
import { GrammarPattern, GrammarMatch, GrammarTranslation, SupportedGrammarLang } from '../models/grammar.model';
import { Token } from '../models';

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
];

const EN_SPLIT_RULES: SplitPatternRule[] = [
    { start: 'not only', end: 'but also', patternKey: 'not only but also', patternId: 'en_c1_02' },
    { start: 'neither', end: 'nor', patternKey: 'neither nor' },
    { start: 'either', end: 'or', patternKey: 'either or' },
    { start: 'both', end: 'and', patternKey: 'both and' },
    { start: 'so', end: 'that', patternKey: 'sothat', patternId: 'en_b2_19' },
    { start: 'such', end: 'that', patternKey: 'suchthat', patternId: 'en_b2_19' },
    { start: 'as', end: 'as', patternKey: 'as as' },
    { start: 'too', end: 'to', patternKey: 'too to' },
    { start: 'no sooner', end: 'than', patternKey: 'no sooner than' },
    { start: 'hardly', end: 'when', patternKey: 'hardly when' },
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

    // Common Japanese grammar endings to detect
    private readonly jaEndingPatterns = [
        'ている', 'ていた', 'ています', 'ていました',
        'たい', 'たかった', 'たくない', 'たくなかった',
        'ない', 'なかった', 'ません', 'ませんでした',
        'れる', 'られる', 'させる', 'させられる',
        'たら', 'たり', 'ても',
        'ば', 'なければ', 'なければならない',
        'てもいい', 'てはいけない',
        'ことができる', 'ことがある',
        'ようにする', 'ようになる',
        'てしまう', 'ちゃう', 'ておく', 'とく',
        'てくる', 'ていく',
        'かもしれない', 'はずだ', 'ようだ', 'そうだ',
        'みたい', 'らしい',
        'のに', 'ので', 'から', 'けど', 'けれども',
    ];

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

        const addToIndex = (rawKey: string, pattern: GrammarPattern) => {
            const key = this.normalizePattern(rawKey);
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
            addToIndex(pattern.id, pattern);

            // Index by pattern text (normalized)
            addToIndex(pattern.pattern, pattern);

            // Index without parentheses (e.g. "(的)" -> "的")
            if (pattern.pattern.includes('(') || pattern.pattern.includes('（')) {
                addToIndex(pattern.pattern.replace(/[()（）]/g, ''), pattern);
            }

            // Slash alternatives (e.g. "am / is / are", "이/가")
            if (pattern.pattern.includes('/')) {
                for (const part of pattern.pattern.split('/')) {
                    addToIndex(part, pattern);
                }
            }

            // Sub-patterns in title (e.g. "Title: part1, part2")
            if (pattern.title.includes(':')) {
                const subParts = pattern.title.split(':')[1].split(/[,/]/);
                for (const sub of subParts) {
                    addToIndex(sub, pattern);
                }
            }

            // Title leading keyword for Japanese/Korean only
            if (pattern.language === 'ja' || pattern.language === 'ko') {
                const titleMatch = pattern.title.match(/^([^\s(（]+)/);
                if (titleMatch) {
                    addToIndex(titleMatch[1], pattern);
                }
            }
        }

        return index;
    }

    /**
     * Normalize pattern for matching (strip punctuation, whitespace, dots, ellipsis, and lowercase)
     */
    private normalizePattern(pattern: string): string {
        return pattern
            .replace(/[。、～〜・…. \s]/g, '')
            .toLowerCase();
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

        const index = this.getIndex(lang);
        if (!index) {
            this.loadPatterns(lang);
            return [];
        }

        const matches: GrammarMatch[] = [];
        const maxSeqLen = lang === 'en' ? 8 : 5;

        // Strategy 1: Check token sequences
        for (let i = 0; i < tokens.length; i++) {
            if (!tokens[i].surface.trim()) continue;

            for (let len = 1; len <= Math.min(maxSeqLen, tokens.length - i); len++) {
                const sequence = tokens.slice(i, i + len);
                const sequenceText = sequence.map(t => t.surface).join('');
                const normalizedSeq = this.normalizePattern(sequenceText);

                const foundPatterns = index.get(normalizedSeq);
                if (foundPatterns && foundPatterns.length > 0) {
                    const tokenIndices = Array.from({ length: len }, (_, j) => i + j);
                    matches.push({
                        pattern: foundPatterns[0],
                        tokenIndices,
                        startIndex: i,
                        endIndex: i + len - 1,
                    });
                }
            }
        }

        // Strategy 2: For Japanese, check grammar endings on individual tokens and base forms
        if (lang === 'ja') {
            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                if (token.isPunctuation) continue;

                // Check common grammar endings
                for (const ending of this.jaEndingPatterns) {
                    if (token.surface.endsWith(ending) || token.surface === ending) {
                        const foundPatterns = index.get(this.normalizePattern(ending));
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
                    const baseFormPatterns = index.get(this.normalizePattern(token.baseForm));
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

        // Strategy 3: Check split correlative patterns (Chinese & English)
        if (lang === 'zh') {
            matches.push(...this.detectSplitPatterns(tokens, ZH_SPLIT_RULES, index));
        } else if (lang === 'en') {
            matches.push(...this.detectSplitPatterns(tokens, EN_SPLIT_RULES, index));
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
