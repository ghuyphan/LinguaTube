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
      chinese: items.filter(i => i.language === 'zh').length
    };
  });

  /**
   * Get stats filtered by language
   */
  getStatsByLanguage(language: 'ja' | 'zh') {
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
    return this.vocabulary()
      .filter(i => i.level === 'new' || i.level === 'learning')
      .sort((a, b) => {
        // Prioritize items not reviewed recently
        const aTime = a.lastReviewedAt ? new Date(a.lastReviewedAt).getTime() : 0;
        const bTime = b.lastReviewedAt ? new Date(b.lastReviewedAt).getTime() : 0;
        return aTime - bTime;
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
  addFromDictionary(entry: DictionaryEntry, language: 'ja' | 'zh'): VocabularyItem {
    const existing = this.findWord(entry.word);
    if (existing) {
      return existing;
    }

    const item: VocabularyItem = {
      id: this.generateId(),
      word: entry.word,
      reading: entry.reading,
      pinyin: entry.pinyin,
      meaning: entry.meanings[0]?.definition || '',
      language,
      level: 'new',
      examples: [],
      addedAt: new Date(),
      reviewCount: 0
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
    language: 'ja' | 'zh',
    reading?: string,
    pinyin?: string
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
      meaning,
      language,
      level: 'new',
      examples: [],
      addedAt: new Date(),
      reviewCount: 0
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
   * Mark word as reviewed
   */
  markReviewed(id: string, correct: boolean): void {
    this.vocabulary.update(items =>
      items.map(item => {
        if (item.id !== id) return item;

        const newReviewCount = item.reviewCount + 1;
        let newLevel: WordLevel = item.level;

        if (correct) {
          if (item.level === 'new') newLevel = 'learning';
          else if (item.level === 'learning' && newReviewCount >= 5) newLevel = 'known';
        } else {
          if (item.level === 'known') newLevel = 'learning';
        }

        return {
          ...item,
          level: newLevel,
          lastReviewedAt: new Date(),
          reviewCount: newReviewCount
        };
      })
    );
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
  getByLanguage(language: 'ja' | 'zh'): VocabularyItem[] {
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
      item.pinyin?.toLowerCase().includes(q)
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
