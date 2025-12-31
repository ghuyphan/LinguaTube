import { Injectable, signal, computed, effect, untracked, inject } from '@angular/core';
import { VocabularyItem, WordLevel, DictionaryEntry } from '../models';
import { AuthService } from './auth.service';

const STORAGE_KEY = 'linguatube_vocabulary';
const SAVE_DEBOUNCE_MS = 300;

@Injectable({
    providedIn: 'root'
})
export class VocabularyService {
    readonly vocabulary = signal<VocabularyItem[]>([]);
    private authService = inject(AuthService);

    // Debounce timer for localStorage writes
    private saveTimeout: ReturnType<typeof setTimeout> | null = null;

    readonly stats = computed(() => {
        const items = this.vocabulary();
        // Single pass through array instead of 7 filter operations
        return items.reduce(
            (acc, item) => {
                acc.total++;
                // Count by level
                if (item.level === 'new') acc.new++;
                else if (item.level === 'learning') acc.learning++;
                else if (item.level === 'known') acc.known++;
                else if (item.level === 'ignored') acc.ignored++;
                // Count by language
                if (item.language === 'ja') acc.japanese++;
                else if (item.language === 'zh') acc.chinese++;
                else if (item.language === 'ko') acc.korean++;
                return acc;
            },
            { total: 0, new: 0, learning: 0, known: 0, ignored: 0, japanese: 0, chinese: 0, korean: 0 }
        );
    });

    /**
     * Get stats filtered by language
     */
    getStatsByLanguage(language: 'ja' | 'zh' | 'ko' | 'en') {
        const items = this.vocabulary().filter(i => i.language === language);
        return {
            total: items.length,
            new: items.filter(i => i.level === 'new').length,
            learning: items.filter(i => i.level === 'learning').length,
            known: items.filter(i => i.level === 'known').length
        };
    }

    readonly recentItems = computed(() => {
        return [...this.vocabulary()]
            .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
            .slice(0, 20);
    });

    readonly reviewQueue = computed(() => {
        const now = new Date();
        return this.vocabulary()
            .filter(i => i.level === 'new' || i.level === 'learning')
            .sort((a, b) => {
                // Prioritize by next review date (earlier dates first)
                const aDate = a.nextReviewDate ? new Date(a.nextReviewDate).getTime() : 0;
                const bDate = b.nextReviewDate ? new Date(b.nextReviewDate).getTime() : 0;
                return aDate - bDate;
            });
    });

    /**
     * Get words that are due for review (nextReviewDate <= now)
     */
    readonly dueForReview = computed(() => {
        const now = new Date();
        return this.vocabulary()
            .filter(i => {
                if (i.level === 'ignored') return false;
                if (!i.nextReviewDate) return i.level === 'new'; // New words always due
                return new Date(i.nextReviewDate) <= now;
            })
            .sort((a, b) => {
                const aDate = a.nextReviewDate ? new Date(a.nextReviewDate).getTime() : 0;
                const bDate = b.nextReviewDate ? new Date(b.nextReviewDate).getTime() : 0;
                return aDate - bDate;
            });
    });

    constructor() {
        this.loadFromStorage();

        // Debounced auto-save to localStorage (300ms debounce to prevent rapid writes)
        effect(() => {
            const items = this.vocabulary();
            // Clear previous timeout
            if (this.saveTimeout) {
                clearTimeout(this.saveTimeout);
            }
            // Debounce the save operation
            this.saveTimeout = setTimeout(() => {
                untracked(() => this.saveToStorage(items));
            }, SAVE_DEBOUNCE_MS);
        });
    }

    /**
     * Add a word from dictionary entry
     */
    addFromDictionary(entry: DictionaryEntry, language: 'ja' | 'zh' | 'ko' | 'en', sourceSentence?: string): VocabularyItem {
        const userId = this.authService.user()?.id || 'local';
        const id = this.generateVocabId(userId, entry.word, language);

        const existing = this.vocabulary().find(v => v.id === id);
        if (existing) {
            return existing;
        }

        const item: VocabularyItem = {
            id,
            word: entry.word,
            reading: entry.reading,
            pinyin: entry.pinyin,
            romanization: entry.romanization,
            meaning: entry.meanings[0]?.definition || '',
            language,
            level: 'new',
            examples: [],
            addedAt: new Date(),
            reviewCount: 0,
            // SRS defaults
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0,
            // Sentence mining
            sourceSentence
        };

        this.vocabulary.update(items => [...items, item]);
        return item;
    }

    /**
     * Add a word manually
     */
    addWord(
        word: string,
        meaning: string,
        language: 'ja' | 'zh' | 'ko' | 'en',
        reading?: string,
        pinyin?: string,
        romanization?: string,
        sourceSentence?: string
    ): VocabularyItem {
        const userId = this.authService.user()?.id || 'local';
        const id = this.generateVocabId(userId, word, language);

        const existing = this.vocabulary().find(v => v.id === id);
        if (existing) {
            return existing;
        }

        const item: VocabularyItem = {
            id,
            word,
            reading,
            pinyin,
            romanization,
            meaning,
            language,
            level: 'new',
            examples: [],
            addedAt: new Date(),
            reviewCount: 0,
            // SRS defaults
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0,
            // Sentence mining
            sourceSentence
        };

        this.vocabulary.update(items => [...items, item]);
        return item;
    }

    /**
     * Update word level
     */
    updateLevel(id: string, level: WordLevel): void {
        this.vocabulary.update(items =>
            items.map(item =>
                item.id === id ? { ...item, level, updatedAt: new Date() } : item
            )
        );
    }

    /**
     * Mark word as reviewed using SM-2 algorithm
     * @param quality 0-5 scale (0-2 = incorrect, 3-5 = correct with varying difficulty)
     */
    markReviewedSRS(id: string, quality: number): void {
        this.vocabulary.update(items =>
            items.map(item => {
                if (item.id !== id) return item;

                // SM-2 Algorithm
                let { easeFactor, interval, repetitions } = item;
                let newLevel: WordLevel = item.level;

                if (quality < 3) {
                    // Incorrect - reset
                    repetitions = 0;
                    interval = 0;
                    newLevel = item.level === 'known' ? 'learning' : 'new';
                } else {
                    // Correct
                    repetitions++;

                    if (repetitions === 1) {
                        interval = 1;
                    } else if (repetitions === 2) {
                        interval = 6;
                    } else {
                        interval = Math.round(interval * easeFactor);
                    }

                    // Update ease factor (min 1.3)
                    easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

                    // Update level based on repetitions
                    if (item.level === 'new') newLevel = 'learning';
                    else if (item.level === 'learning' && repetitions >= 3) newLevel = 'known';
                }

                const nextReviewDate = new Date();
                nextReviewDate.setDate(nextReviewDate.getDate() + interval);

                return {
                    ...item,
                    level: newLevel,
                    lastReviewedAt: new Date(),
                    updatedAt: new Date(),
                    reviewCount: item.reviewCount + 1,
                    easeFactor,
                    interval,
                    repetitions,
                    nextReviewDate
                };
            })
        );
    }

    /**
     * Mark word as reviewed (legacy simple method)
     */
    markReviewed(id: string, correct: boolean): void {
        // Map boolean to SM-2 quality: correct = 4 (good), incorrect = 1 (bad)
        this.markReviewedSRS(id, correct ? 4 : 1);
    }

    /**
     * Add example sentence to word
     */
    addExample(id: string, example: string): void {
        this.vocabulary.update(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, examples: [...item.examples, example], updatedAt: new Date() }
                    : item
            )
        );
    }

    /**
     * Update word meaning
     */
    updateMeaning(id: string, meaning: string): void {
        this.vocabulary.update(items =>
            items.map(item =>
                item.id === id ? { ...item, meaning, updatedAt: new Date() } : item
            )
        );
    }

    /**
     * Delete a word
     */
    deleteWord(id: string): void {
        this.vocabulary.update(items => items.filter(item => item.id !== id));
    }

    /**
     * Find word in vocabulary
     */
    findWord(word: string): VocabularyItem | undefined {
        return this.vocabulary().find(item => item.word === word);
    }

    /**
     * Check if word exists
     */
    hasWord(word: string): boolean {
        return this.vocabulary().some(item => item.word === word);
    }

    /**
     * Get word level
     */
    getWordLevel(word: string): WordLevel | null {
        const item = this.findWord(word);
        return item?.level || null;
    }

    /**
     * Filter vocabulary by language
     */
    getByLanguage(language: 'ja' | 'zh' | 'ko' | 'en'): VocabularyItem[] {
        return this.vocabulary().filter(item => item.language === language);
    }

    /**
     * Filter vocabulary by level
     */
    getByLevel(level: WordLevel): VocabularyItem[] {
        return this.vocabulary().filter(item => item.level === level);
    }

    /**
     * Search vocabulary
     */
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

    /**
     * Export vocabulary to JSON
     */
    exportToJSON(): string {
        return JSON.stringify(this.vocabulary(), null, 2);
    }

    /**
     * Export to Anki format (TSV)
     */
    exportToAnki(): string {
        return this.vocabulary()
            .map(item => {
                const front = item.word + (item.reading ? ` [${item.reading}]` : '');
                const back = item.meaning;
                return `${front}\t${back}`;
            })
            .join('\n');
    }

    /**
     * Import from JSON
     */
    importFromJSON(json: string): void {
        try {
            const items = JSON.parse(json) as VocabularyItem[];
            // Merge with existing, avoiding duplicates
            const existing = new Set(this.vocabulary().map(i => i.word));
            const newItems = items.filter(i => !existing.has(i.word));
            this.vocabulary.update(current => [...current, ...newItems]);
        } catch (err) {
            console.error('Failed to import vocabulary:', err);
            throw new Error('Invalid JSON format');
        }
    }

    /**
     * Clear all vocabulary
     */
    clear(): void {
        this.vocabulary.set([]);
    }

    /**
     * Get all items (for sync)
     */
    getAllItems(): VocabularyItem[] {
        return this.vocabulary();
    }

    /**
     * Import/merge items (for sync)
     * Merges items based on updatedAt timestamp - keeps the newer version
     */
    importItems(items: VocabularyItem[]): void {
        const merged = new Map<string, VocabularyItem>();

        // Add existing items
        for (const item of this.vocabulary()) {
            merged.set(`${item.word}-${item.language}`, item);
        }

        // Merge incoming items, preferring newer versions
        for (const item of items) {
            const key = `${item.word}-${item.language}`;
            const existing = merged.get(key);

            if (!existing) {
                // New item, add it
                merged.set(key, item);
            } else {
                // Compare timestamps - keep the newer one
                const existingTime = existing.updatedAt
                    ? new Date(existing.updatedAt).getTime()
                    : new Date(existing.addedAt).getTime();
                const incomingTime = item.updatedAt
                    ? new Date(item.updatedAt).getTime()
                    : new Date(item.addedAt).getTime();

                if (incomingTime > existingTime) {
                    merged.set(key, item);
                }
            }
        }

        this.vocabulary.set(Array.from(merged.values()));
    }

    // Private methods

    private loadFromStorage(): void {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const items = JSON.parse(stored) as VocabularyItem[];
                // Convert date strings back to Date objects
                const parsed = items.map(item => ({
                    ...item,
                    addedAt: new Date(item.addedAt),
                    updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
                    lastReviewedAt: item.lastReviewedAt ? new Date(item.lastReviewedAt) : undefined
                }));
                this.vocabulary.set(parsed);
            }
        } catch (err) {
            console.error('Failed to load vocabulary from storage:', err);
        }
    }

    private saveToStorage(items: VocabularyItem[]): void {
        try {
            const data = JSON.stringify(items);
            localStorage.setItem(STORAGE_KEY, data);
        } catch (err) {
            // Handle QuotaExceededError
            if (err instanceof DOMException && (
                err.code === 22 || // QuotaExceededError
                err.name === 'QuotaExceededError' ||
                err.name === 'NS_ERROR_DOM_QUOTA_REACHED'
            )) {
                console.warn('[VocabularyService] Storage quota exceeded, cleaning up old data');
                // Try to free up space by removing old ignored words
                const filtered = items.filter(item => item.level !== 'ignored');
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
                    this.vocabulary.set(filtered);
                    console.log('[VocabularyService] Removed ignored words to free space');
                } catch {
                    console.error('[VocabularyService] Still cannot save after cleanup');
                }
            } else {
                console.error('Failed to save vocabulary to storage:', err);
            }
        }
    }

    private generateVocabId(userId: string, word: string, language: string): string {
        // Create a consistent hash from the unique combination
        const raw = `${userId}|${word}|${language}`;
        // Simple base64 encoding, cleaned for PocketBase ID compatibility
        try {
            const encoded = btoa(unescape(encodeURIComponent(raw)))
                .replace(/[^a-zA-Z0-9]/g, '')
                .toLowerCase()
                .slice(0, 15);
            return encoded;
        } catch (e) {
            // Fallback for non-browser environments or weird characters
            return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
        }
    }

    /**
     * @deprecated Use generateVocabId instead
     */
    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
}
