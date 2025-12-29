import { Injectable, signal } from '@angular/core';
import { GrammarPattern, GrammarMatch } from '../models/grammar.model';
import { Token } from '../models';

/**
 * GrammarService
 * Detects grammar patterns in tokenized sentences and provides grammar explanations.
 * Grammar data is lazy-loaded by language.
 */
@Injectable({ providedIn: 'root' })
export class GrammarService {
    // Grammar mode toggle
    readonly grammarModeEnabled = signal(true);

    // Currently selected pattern
    readonly selectedPattern = signal<GrammarPattern | null>(null);
    readonly isPopupVisible = signal(false);

    // Lazy-loaded pattern data
    private jaPatterns: GrammarPattern[] | null = null;
    private koPatterns: GrammarPattern[] | null = null;
    private zhPatterns: GrammarPattern[] | null = null;

    // Pattern indices for fast lookup
    private jaIndex: Map<string, GrammarPattern[]> | null = null;
    private koIndex: Map<string, GrammarPattern[]> | null = null;
    private zhIndex: Map<string, GrammarPattern[]> | null = null;

    // Loading states
    private loadingLangs = new Set<string>();

    // Common Japanese grammar endings to detect
    private jaEndingPatterns = [
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
     * Load patterns for a language (lazy)
     */
    private async loadPatterns(lang: 'ja' | 'zh' | 'ko'): Promise<GrammarPattern[]> {
        if (this.loadingLangs.has(lang)) {
            // Already loading, wait a bit and try again
            await new Promise(r => setTimeout(r, 100));
            return this.getPatterns(lang);
        }

        this.loadingLangs.add(lang);

        try {
            switch (lang) {
                case 'ja':
                    if (!this.jaPatterns) {
                        const { GRAMMAR_JA } = await import('../data/grammar-ja');
                        this.jaPatterns = GRAMMAR_JA;
                        this.jaIndex = this.buildIndex(this.jaPatterns);
                    }
                    return this.jaPatterns;
                case 'ko':
                    if (!this.koPatterns) {
                        const { GRAMMAR_KO } = await import('../data/grammar-ko');
                        this.koPatterns = GRAMMAR_KO;
                        this.koIndex = this.buildIndex(this.koPatterns);
                    }
                    return this.koPatterns;
                case 'zh':
                    if (!this.zhPatterns) {
                        const { GRAMMAR_ZH } = await import('../data/grammar-zh');
                        this.zhPatterns = GRAMMAR_ZH;
                        this.zhIndex = this.buildIndex(this.zhPatterns);
                    }
                    return this.zhPatterns;
                default:
                    return [];
            }
        } finally {
            this.loadingLangs.delete(lang);
        }
    }

    /**
     * Get all patterns for a language (sync - returns cached or empty)
     */
    getPatterns(lang: 'ja' | 'zh' | 'ko'): GrammarPattern[] {
        switch (lang) {
            case 'ja': return this.jaPatterns || [];
            case 'ko': return this.koPatterns || [];
            case 'zh': return this.zhPatterns || [];
            default: return [];
        }
    }

    /**
     * Get index for a language
     */
    private getIndex(lang: 'ja' | 'zh' | 'ko'): Map<string, GrammarPattern[]> | null {
        switch (lang) {
            case 'ja': return this.jaIndex;
            case 'ko': return this.koIndex;
            case 'zh': return this.zhIndex;
            default: return null;
        }
    }

    /**
     * Build search index for patterns
     */
    private buildIndex(patterns: GrammarPattern[]): Map<string, GrammarPattern[]> {
        const index = new Map<string, GrammarPattern[]>();

        for (const pattern of patterns) {
            // Index by pattern text (normalized)
            const key = this.normalizePattern(pattern.pattern);
            if (!index.has(key)) {
                index.set(key, []);
            }
            index.get(key)!.push(pattern);

            // Also index by title keywords for Japanese/Korean
            if (pattern.language === 'ja' || pattern.language === 'ko') {
                const titleMatch = pattern.title.match(/^([^\s(]+)/);
                if (titleMatch && titleMatch[1] !== key) {
                    const titleKey = this.normalizePattern(titleMatch[1]);
                    if (!index.has(titleKey)) {
                        index.set(titleKey, []);
                    }
                    index.get(titleKey)!.push(pattern);
                }
            }
        }

        return index;
    }

    /**
     * Normalize pattern for matching
     */
    private normalizePattern(pattern: string): string {
        return pattern
            .replace(/[。、～〜・]/g, '')
            .replace(/\s+/g, '')
            .toLowerCase();
    }

    /**
     * Preload patterns for a language
     */
    preloadPatterns(lang: 'ja' | 'zh' | 'ko'): void {
        this.loadPatterns(lang).catch(() => {
            // Silently fail - patterns will be loaded on demand
        });
    }

    /**
     * Detect grammar patterns in tokenized sentence
     */
    detectPatterns(tokens: Token[], lang: 'ja' | 'zh' | 'ko'): GrammarMatch[] {
        if (!this.grammarModeEnabled() || tokens.length === 0) {
            return [];
        }

        const index = this.getIndex(lang);
        if (!index) {
            // Trigger lazy load for next time
            this.loadPatterns(lang);
            return [];
        }

        const matches: GrammarMatch[] = [];

        // Strategy 1: Check token sequences (up to 4 tokens)
        for (let i = 0; i < tokens.length; i++) {
            for (let len = 1; len <= Math.min(4, tokens.length - i); len++) {
                const sequence = tokens.slice(i, i + len);
                const sequenceText = sequence.map(t => t.surface).join('');
                const normalizedSeq = this.normalizePattern(sequenceText);

                const foundPatterns = index.get(normalizedSeq);
                if (foundPatterns && foundPatterns.length > 0) {
                    const tokenIndices = Array.from({ length: len }, (_, j) => i + j);
                    matches.push({
                        pattern: foundPatterns[0], // Use first match
                        tokenIndices,
                        startIndex: i,
                        endIndex: i + len - 1,
                    });
                }
            }
        }

        // Strategy 2: For Japanese, check grammar endings on individual tokens
        if (lang === 'ja') {
            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                if (token.isPunctuation) continue;

                // Check if token ends with common grammar patterns
                for (const ending of this.jaEndingPatterns) {
                    if (token.surface.endsWith(ending) || token.surface === ending) {
                        const foundPatterns = index.get(this.normalizePattern(ending));
                        if (foundPatterns && foundPatterns.length > 0) {
                            // Avoid duplicate matches
                            const alreadyMatched = matches.some(m =>
                                m.tokenIndices.includes(i) &&
                                m.pattern.pattern === foundPatterns[0].pattern
                            );
                            if (!alreadyMatched) {
                                matches.push({
                                    pattern: foundPatterns[0],
                                    tokenIndices: [i],
                                    startIndex: i,
                                    endIndex: i,
                                });
                            }
                        }
                    }
                }

                // Check baseForm for verb-related patterns
                if (token.baseForm && token.baseForm !== token.surface) {
                    const baseFormPatterns = index.get(this.normalizePattern(token.baseForm));
                    if (baseFormPatterns) {
                        const alreadyMatched = matches.some(m => m.tokenIndices.includes(i));
                        if (!alreadyMatched) {
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
        }

        // Strategy 3: For Chinese, check for split patterns like "是...的"
        if (lang === 'zh') {
            const splitPatterns = [
                { start: '是', end: '的', name: '是...的' },
                { start: '虽然', end: '但是', name: '虽然...但是' },
                { start: '因为', end: '所以', name: '因为...所以' },
                { start: '如果', end: '就', name: '如果...就' },
                { start: '越', end: '越', name: '越...越' },
                { start: '一边', end: '一边', name: '一边...一边' },
                { start: '不但', end: '而且', name: '不但...而且' },
                { start: '除了', end: '以外', name: '除了...以外' },
            ];

            for (const sp of splitPatterns) {
                const startIdx = tokens.findIndex(t => t.surface === sp.start || t.surface.includes(sp.start));
                if (startIdx === -1) continue;

                const endIdx = tokens.findIndex((t, i) => i > startIdx && (t.surface === sp.end || t.surface.includes(sp.end)));
                if (endIdx === -1) continue;

                const foundPatterns = index.get(this.normalizePattern(sp.name));
                if (foundPatterns && foundPatterns.length > 0) {
                    const tokenIndices = [startIdx, endIdx];
                    matches.push({
                        pattern: foundPatterns[0],
                        tokenIndices,
                        startIndex: startIdx,
                        endIndex: endIdx,
                    });
                }
            }
        }

        // Remove duplicate patterns on same tokens
        return this.deduplicateMatches(matches);
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
    async searchPatterns(query: string, lang: 'ja' | 'zh' | 'ko'): Promise<GrammarPattern[]> {
        const patterns = await this.loadPatterns(lang);
        const normalizedQuery = query.toLowerCase();

        return patterns.filter(p =>
            p.pattern.toLowerCase().includes(normalizedQuery) ||
            p.title.toLowerCase().includes(normalizedQuery) ||
            p.shortExplanation.toLowerCase().includes(normalizedQuery)
        ).slice(0, 20); // Limit results
    }

    /**
     * Get pattern by ID
     */
    getPatternById(id: string, lang: 'ja' | 'zh' | 'ko'): GrammarPattern | undefined {
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
