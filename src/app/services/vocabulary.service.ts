import { Injectable, signal, computed, effect } from '@angular/core';
import { VocabularyItem, WordLevel, DictionaryEntry } from '../models';

const STORAGE_KEY = 'linguatube_vocabulary';

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  readonly vocabulary = signal<VocabularyItem[]>([]);

  readonly stats = computed(() => {
    const items = this.vocabulary();
    return {
      total: items.length,
      new: items.filter(i => i.level === 'new').length,
      learning: items.filter(i => i.level === 'learning').length,
      known: items.filter(i => i.level === 'known').length,
      ignored: items.filter(i => i.level === 'ignored').length,
      japanese: items.filter(i => i.language === 'ja').length,
      chinese: items.filter(i => i.language === 'zh').length,
      korean: items.filter(i => i.language === 'ko').length
    };
  });

  /**
   * Get stats filtered by language
   */
  getStatsByLanguage(language: 'ja' | 'zh' | 'ko') {
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

    // Auto-save to localStorage whenever vocabulary changes
    effect(() => {
      this.saveToStorage(this.vocabulary());
    });
  }

  /**
   * Add a word from dictionary entry
   */
  addFromDictionary(entry: DictionaryEntry, language: 'ja' | 'zh' | 'ko', sourceSentence?: string): VocabularyItem {
    const existing = this.findWord(entry.word);
    if (existing) {
      return existing;
    }

    const item: VocabularyItem = {
      id: this.generateId(),
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
    language: 'ja' | 'zh' | 'ko',
    reading?: string,
    pinyin?: string,
    romanization?: string,
    sourceSentence?: string
  ): VocabularyItem {
    const existing = this.findWord(word);
    if (existing) {
      return existing;
    }

    const item: VocabularyItem = {
      id: this.generateId(),
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
        item.id === id ? { ...item, level } : item
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
          ? { ...item, examples: [...item.examples, example] }
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
        item.id === id ? { ...item, meaning } : item
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
  getByLanguage(language: 'ja' | 'zh' | 'ko'): VocabularyItem[] {
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save vocabulary to storage:', err);
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
