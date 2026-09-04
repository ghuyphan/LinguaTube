import { Injectable, inject, computed } from '@angular/core';
import { VocabularyItem, WordLevel, DictionaryEntry } from '../../models';
import { OfflineVocabularyRepository } from '../../core/repositories';

@Injectable({
    providedIn: 'root'
})
export class VocabularyService {
    private repo = inject(OfflineVocabularyRepository);

    // Signals delegated to repo
    readonly vocabulary = this.repo.vocabulary;
    readonly stats = this.repo.stats;
    readonly isSyncing = this.repo.isSyncing; // Expose sync state

    // Computed
    readonly lastModified = computed(() => {
        this.vocabulary();
        return Date.now();
    });

    readonly recentItems = computed(() => {
        return [...this.vocabulary()]
            .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
            .slice(0, 20);
    });

    readonly reviewQueue = computed(() => {
        return this.vocabulary()
            .filter(i => i.level === 'new' || i.level === 'learning')
            .sort((a, b) => {
                const aDate = a.nextReviewDate ? new Date(a.nextReviewDate).getTime() : 0;
                const bDate = b.nextReviewDate ? new Date(b.nextReviewDate).getTime() : 0;
                return aDate - bDate;
            });
    });

    readonly dueForReview = computed(() => {
        const now = new Date();
        return this.vocabulary()
            .filter(i => {
                if (i.level === 'ignored') return false;
                if (!i.nextReviewDate) return i.level === 'new';
                return new Date(i.nextReviewDate) <= now;
            })
            .sort((a, b) => {
                const aDate = a.nextReviewDate ? new Date(a.nextReviewDate).getTime() : 0;
                const bDate = b.nextReviewDate ? new Date(b.nextReviewDate).getTime() : 0;
                return aDate - bDate;
            });
    });

    readonly statsByLanguage = computed(() => {
        const vocab = this.vocabulary();
        const stats = {
            ja: { total: 0, new: 0, learning: 0, known: 0 },
            zh: { total: 0, new: 0, learning: 0, known: 0 },
            ko: { total: 0, new: 0, learning: 0, known: 0 },
            en: { total: 0, new: 0, learning: 0, known: 0 }
        };

        for (const item of vocab) {
            const lang = item.language as 'ja' | 'zh' | 'ko' | 'en';
            if (stats[lang]) {
                stats[lang].total++;
                if (item.level === 'new') stats[lang].new++;
                if (item.level === 'learning') stats[lang].learning++;
                if (item.level === 'known') stats[lang].known++;
            }
        }
        return stats;
    });

    // Proxy Methods

    getStatsByLanguage(language: 'ja' | 'zh' | 'ko' | 'en') {
        const items = this.vocabulary().filter(i => i.language === language);
        return {
            total: items.length,
            new: items.filter(i => i.level === 'new').length,
            learning: items.filter(i => i.level === 'learning').length,
            known: items.filter(i => i.level === 'known').length
        };
    }

    addFromDictionary(entry: DictionaryEntry, language: 'ja' | 'zh' | 'ko' | 'en', sourceSentence?: string): Promise<VocabularyItem> {
        return this.repo.addFromDictionary(entry, language, sourceSentence);
    }

    addWord(
        word: string,
        meaning: string,
        language: 'ja' | 'zh' | 'ko' | 'en',
        reading?: string,
        pinyin?: string,
        romanization?: string,
        sourceSentence?: string
    ): Promise<VocabularyItem> {
        return this.repo.addWord(word, meaning, language, reading, pinyin, romanization, sourceSentence);
    }

    updateLevel(id: string, level: WordLevel): void {
        this.repo.updateLevel(id, level);
    }

    markReviewed(id: string, correct: boolean): void {
        this.repo.markReviewed(id, correct ? 4 : 1);
    }

    markReviewedSRS(id: string, quality: number): void {
        this.repo.markReviewed(id, quality);
    }

    addExample(id: string, example: string): void {
        this.repo.addExample(id, example);
    }

    updateMeaning(id: string, meaning: string): void {
        this.repo.updateMeaning(id, meaning);
    }

    deleteWord(id: string): void {
        this.repo.deleteWord(id);
    }

    findWord(word: string): VocabularyItem | undefined {
        return this.repo.findWord(word);
    }

    hasWord(word: string): boolean {
        return this.repo.hasWord(word);
    }

    getWordLevel(word: string): WordLevel | null {
        const item = this.findWord(word);
        return item?.level || null;
    }

    getByLanguage(language: 'ja' | 'zh' | 'ko' | 'en'): VocabularyItem[] {
        return this.vocabulary().filter(item => item.language === language);
    }

    getByLevel(level: WordLevel): VocabularyItem[] {
        return this.vocabulary().filter(item => item.level === level);
    }

    search(query: string): VocabularyItem[] {
        const q = query.toLowerCase();
        return this.vocabulary().filter(item =>
            item.word.toLowerCase().includes(q) ||
            item.meaning.toLowerCase().includes(q) ||
            item.reading?.toLowerCase().includes(q) ||
            item.pinyin?.toLowerCase().includes(q) ||
            item.romanization?.toLowerCase().includes(q)
        );
    }

    exportToJSON(): string {
        return this.repo.exportToJSON();
    }

    exportToAnki(): string {
        return this.vocabulary()
            .map(item => {
                const front = item.word + (item.reading ? ` [${item.reading}]` : '');
                const back = item.meaning;
                return `${front}\t${back}`;
            })
            .join('\n');
    }

    importFromJSON(json: string): void {
        this.repo.importFromJSON(json);
    }

    clear(): void {
        this.repo.clear();
    }
}
