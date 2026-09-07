import { Injectable, inject, computed, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { VocabularyItem, WordLevel, DictionaryEntry } from '../../models';
import { OfflineVocabularyRepository } from '../../core/repositories';

const DAILY_GOAL_KEY = 'linguatube_daily_goal';
const DAILY_PROGRESS_KEY = 'linguatube_daily_progress';

@Injectable({
    providedIn: 'root'
})
export class VocabularyService {
    private repo = inject(OfflineVocabularyRepository);
    private platformId = inject(PLATFORM_ID);

    // Signals delegated to repo
    readonly vocabulary = this.repo.vocabulary;
    readonly stats = this.repo.stats;
    readonly isSyncing = this.repo.isSyncing; // Expose sync state

    // Shared daily goal state
    readonly dailyGoal = signal<number>(10);
    readonly cardsCompletedToday = signal<number>(0);

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.loadDailyProgress();
        }
    }

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
        sourceSentence?: string,
        audio?: string
    ): Promise<VocabularyItem> {
        return this.repo.addWord(word, meaning, language, reading, pinyin, romanization, sourceSentence, audio);
    }

    // Daily Goal & Progress Methods
    loadDailyProgress(): void {
        if (!isPlatformBrowser(this.platformId)) return;
        try {
            const today = new Date().toDateString();
            const stored = localStorage.getItem(DAILY_PROGRESS_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                if (data && data.date === today) {
                    this.cardsCompletedToday.set(Number(data.count) || 0);
                } else {
                    this.cardsCompletedToday.set(0);
                    this.saveDailyProgress();
                }
            }

            const goalStored = localStorage.getItem(DAILY_GOAL_KEY);
            if (goalStored) {
                const parsedGoal = parseInt(goalStored, 10);
                if (!isNaN(parsedGoal) && parsedGoal > 0) {
                    this.dailyGoal.set(parsedGoal);
                }
            }
        } catch (err) {
            console.warn('[VocabularyService] Failed to load daily progress:', err);
        }
    }

    private saveDailyProgress(): void {
        if (!isPlatformBrowser(this.platformId)) return;
        try {
            const today = new Date().toDateString();
            localStorage.setItem(DAILY_PROGRESS_KEY, JSON.stringify({
                date: today,
                count: this.cardsCompletedToday()
            }));
        } catch (err) {
            console.warn('[VocabularyService] Failed to save daily progress:', err);
        }
    }

    incrementDailyProgress(): void {
        this.cardsCompletedToday.update(c => c + 1);
        this.saveDailyProgress();
    }

    setDailyGoal(goal: number): void {
        if (goal <= 0) return;
        this.dailyGoal.set(goal);
        if (isPlatformBrowser(this.platformId)) {
            try {
                localStorage.setItem(DAILY_GOAL_KEY, goal.toString());
            } catch (err) {
                console.warn('[VocabularyService] Failed to save daily goal:', err);
            }
        }
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

    exportAsFile(format: 'json' | 'anki'): void {
        const isJson = format === 'json';
        const content = isJson ? this.exportToJSON() : this.exportToAnki();
        const filename = isJson ? 'voca-vocabulary.json' : 'voca-anki.tsv';
        const type = isJson ? 'application/json' : 'text/tab-separated-values';

        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    importFromFile(file: File): Promise<void> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                try {
                    this.importFromJSON(content);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    importFromJSON(json: string): void {
        this.repo.importFromJSON(json);
    }

    clear(): void {
        this.repo.clear();
    }
}
