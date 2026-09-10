import { Injectable, inject, computed, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { VocabularyItem, WordLevel, DictionaryEntry } from '../../models';
import { OfflineVocabularyRepository } from '../../core/repositories';
import { GamificationService } from '../../core/services/gamification.service';

const DAILY_GOAL_KEY = 'linguatube_daily_goal';
const DAILY_PROGRESS_KEY = 'linguatube_daily_progress';

@Injectable({
    providedIn: 'root'
})
export class VocabularyService {
    private repo = inject(OfflineVocabularyRepository);
    private platformId = inject(PLATFORM_ID);
    private gamification = inject(GamificationService);

    // Signals delegated to repo
    readonly vocabulary = this.repo.vocabulary;
    readonly stats = this.repo.stats;
    readonly isSyncing = this.repo.isSyncing; // Expose sync state

    // Shared daily goal state
    readonly dailyGoal = signal<number>(10);
    readonly cardsCompletedToday = signal<number>(0);

    // Trigger to reset study session to start screen (e.g. on nav tab re-click)
    readonly studyResetTrigger = signal<number>(0);

    requestStudyReset(): void {
        this.studyResetTrigger.update(v => v + 1);
    }

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

    readonly goalProgress = computed(() => {
        const done = this.cardsCompletedToday();
        const goal = this.dailyGoal();
        return goal > 0 ? Math.min(100, Math.round((done / goal) * 100)) : 0;
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

    getDueCountByLanguage(language: string): number {
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        return this.vocabulary().filter(item => {
            if (item.language !== language) return false;
            if (item.level === 'ignored') return false;
            if (!item.nextReviewDate) return true;
            return new Date(item.nextReviewDate) <= today;
        }).length;
    }

    addFromDictionary(
        entry: DictionaryEntry,
        language: 'ja' | 'zh' | 'ko' | 'en',
        sourceSentence?: string,
        sourceVideoId?: string,
        sourceTimestamp?: number
    ): Promise<VocabularyItem> {
        this.gamification.addXP(5, 'word_saved');
        this.gamification.recordWordSaved();
        return this.repo.addFromDictionary(entry, language, sourceSentence, sourceVideoId, sourceTimestamp);
    }

    addWord(
        word: string,
        meaning: string,
        language: 'ja' | 'zh' | 'ko' | 'en',
        reading?: string,
        pinyin?: string,
        romanization?: string,
        sourceSentence?: string,
        audio?: string,
        sourceVideoId?: string,
        sourceTimestamp?: number
    ): Promise<VocabularyItem> {
        this.gamification.addXP(5, 'word_saved');
        this.gamification.recordWordSaved();
        return this.repo.addWord(word, meaning, language, reading, pinyin, romanization, sourceSentence, audio, sourceVideoId, sourceTimestamp);
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
        this.gamification.addXP(correct ? 10 : 5, 'flashcard_review');
        this.gamification.recordSRSReview();
        this.repo.markReviewed(id, correct ? 4 : 1);
    }

    markReviewedSRS(id: string, quality: number): void {
        this.gamification.addXP(quality >= 3 ? 10 : 5, 'flashcard_review');
        this.gamification.recordSRSReview();
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
