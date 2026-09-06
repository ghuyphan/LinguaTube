import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DictionaryEntry } from '../../models';
import { Observable, of, catchError, map } from 'rxjs';
import { I18nService, UILanguage } from '../../core/services';
import { environment } from '../../../environments/environment';
import { getJapaneseRomaji } from '../../shared/utils/japanese-romaji';

interface UnifiedDictEntry {
  word?: string;
  reading?: string;
  romanization?: string;
  definitions?: string[];
  partOfSpeech?: string;
  level?: number;
}

interface UnifiedDictResponse {
  entries?: UnifiedDictEntry[];
}

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  readonly isLoading = signal(false);
  readonly lastLookup = signal<DictionaryEntry | null>(null);
  readonly lastQuery = signal<string>(''); // Persistence for search term
  readonly recentSearches = signal<string[]>([]); // Shared recent searches state

  // Unified API endpoint
  private readonly UNIFIED_DICT_API = environment.api.dict;

  // Services
  private readonly http = inject(HttpClient);
  private readonly i18n = inject(I18nService);

  // Cache settings
  private readonly CACHE_KEY = 'linguatube_dict_cache';
  private readonly RECENT_KEY = 'linguatube-recent-searches';
  private readonly MAX_CACHE_SIZE = 500;

  constructor() {
    // Load recent searches from localStorage on init
    this.loadRecentSearches();
  }

  private loadRecentSearches(): void {
    try {
      const saved = localStorage.getItem(this.RECENT_KEY);
      if (saved) {
        this.recentSearches.set(JSON.parse(saved));
      }
    } catch { }
  }

  addToRecentSearches(term: string): void {
    const current = this.recentSearches();
    const updated = [term, ...current.filter(t => t !== term)].slice(0, 10);
    this.recentSearches.set(updated);
    localStorage.setItem(this.RECENT_KEY, JSON.stringify(updated));
  }

  removeRecentSearch(term: string): void {
    const updated = this.recentSearches().filter(t => t !== term);
    this.recentSearches.set(updated);
    localStorage.setItem(this.RECENT_KEY, JSON.stringify(updated));
  }

  clearAllRecentSearches(): void {
    this.recentSearches.set([]);
    localStorage.removeItem(this.RECENT_KEY);
  }



  /**
   * Auto-detect language and look up using unified endpoint
   * Definitions will be returned in user's UI language
   */
  lookup(word: string, language?: 'ja' | 'zh' | 'ko' | 'en'): Observable<DictionaryEntry | null> {
    const fromLang = language || this.detectLanguage(word);
    const toLang = this.i18n.currentLanguage();

    return this.lookupUnified(word, fromLang, toLang);
  }

  /**
   * Unified dictionary lookup - definitions in user's UI language
   */
  private lookupUnified(
    word: string,
    from: 'ja' | 'zh' | 'ko' | 'en',
    to: UILanguage
  ): Observable<DictionaryEntry | null> {
    if (!word.trim()) return of(null);

    // Check cache with language pair
    const cacheKey = `${from}:${to}:${word}`;
    const cached = this.getFromCacheWithKey(cacheKey);
    if (cached) {
      this.lastLookup.set(cached);
      return of(cached);
    }

    this.isLoading.set(true);

    const url = `${this.UNIFIED_DICT_API}?word=${encodeURIComponent(word)}&from=${from}&to=${to}`;

    return this.http.get<UnifiedDictResponse>(url).pipe(
      map(response => {
        this.isLoading.set(false);

        if (!response.entries || response.entries.length === 0) {
          // Fallback to language-specific local lookup
          return this.getLocalFallback(word, from);
        }

        const entry = response.entries[0];

        // Set pronunciation field based on source language to avoid triple display
        const result: DictionaryEntry = {
          word: entry.word || word,
          reading: from === 'ja' || from === 'en' ? (entry.reading || '') : undefined,
          pinyin: from === 'zh' ? (entry.reading || '') : undefined,
          romanization: from === 'ja'
            ? (entry.romanization || getJapaneseRomaji(entry.reading || '', entry.word || word))
            : from === 'ko'
              ? (entry.romanization || entry.reading || '')
              : undefined,
          meanings: entry.definitions?.map((def: string) => ({
            definition: def,
            examples: []
          })) || [],
          partOfSpeech: entry.partOfSpeech ? [entry.partOfSpeech] : [],
          jlptLevel: from === 'ja' && entry.level ? `N${entry.level}` : undefined,
          hskLevel: from === 'zh' ? entry.level : undefined,
          topikLevel: from === 'ko' ? entry.level : undefined
        };

        this.lastLookup.set(result);
        this.saveToCacheWithKey(cacheKey, result);
        return result;
      }),
      catchError(err => {
        this.isLoading.set(false);
        console.log(`Unified dict lookup failed (${from}->${to}):`, err.message);
        const result = this.getLocalFallback(word, from);
        if (result) this.lastLookup.set(result);
        return of(result);
      })
    );
  }

  /**
   * Get local fallback based on source language
   */
  private getLocalFallback(word: string, lang: string): DictionaryEntry | null {
    switch (lang) {
      case 'ja': return this.localJapaneseLookup(word);
      case 'zh': return this.localChineseLookup(word);
      case 'ko': return this.localKoreanLookup(word);
      case 'en': return this.localEnglishLookup(word);
      default: return null;
    }
  }

  /**
   * Cache helpers with custom key
   */
  private getFromCacheWithKey(key: string): DictionaryEntry | null {
    try {
      const cache = this.loadCache();
      const entry = cache[key];
      if (entry) {
        entry.accessTime = Date.now();
        this.saveCache(cache);
        return entry.data;
      }
    } catch (e) {
      console.warn('[Dictionary] Cache read error:', e);
    }
    return null;
  }

  private saveToCacheWithKey(key: string, data: DictionaryEntry): void {
    try {
      const cache = this.loadCache();
      cache[key] = { data, accessTime: Date.now() };

      const keys = Object.keys(cache);
      if (keys.length > this.MAX_CACHE_SIZE) {
        const sorted = keys.sort((a, b) => cache[a].accessTime - cache[b].accessTime);
        sorted.slice(0, keys.length - this.MAX_CACHE_SIZE).forEach(k => delete cache[k]);
      }

      this.saveCache(cache);
    } catch (e) {
      console.warn('[Dictionary] Cache write error:', e);
    }
  }



  /**
   * Simple language detection based on character types
   */
  private detectLanguage(text: string): 'ja' | 'zh' | 'ko' | 'en' {
    // Check for Korean (Hangul)
    if (/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(text)) {
      return 'ko';
    }
    // Check for Japanese-specific characters (Hiragana/Katakana)
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) {
      return 'ja';
    }
    // Check for CJK ideographs (Chinese)
    if (/[\u4E00-\u9FFF]/.test(text)) {
      return 'zh';
    }
    // Default to English for Latin characters
    return 'en';
  }

  /**
   * Local Japanese dictionary fallback
   */
  private localJapaneseLookup(word: string): DictionaryEntry | null {
    const commonWords: Record<string, DictionaryEntry> = {
      '日本': {
        word: '日本',
        reading: 'にほん',
        romanization: getJapaneseRomaji('にほん', '日本'),
        meanings: [{ definition: 'Japan' }],
        partOfSpeech: ['Noun'],
        jlptLevel: 'N5'
      },
      '勉強': {
        word: '勉強',
        reading: 'べんきょう',
        romanization: getJapaneseRomaji('べんきょう', '勉強'),
        meanings: [{ definition: 'study, diligence' }],
        partOfSpeech: ['Noun', 'Suru verb'],
        jlptLevel: 'N5'
      },
      '食べる': {
        word: '食べる',
        reading: 'たべる',
        romanization: getJapaneseRomaji('たべる', '食べる'),
        meanings: [{ definition: 'to eat' }],
        partOfSpeech: ['Ichidan verb'],
        jlptLevel: 'N5'
      },
      '見る': {
        word: '見る',
        reading: 'みる',
        romanization: getJapaneseRomaji('みる', '見る'),
        meanings: [{ definition: 'to see, to look, to watch' }],
        partOfSpeech: ['Ichidan verb'],
        jlptLevel: 'N5'
      },
      '聞く': {
        word: '聞く',
        reading: 'きく',
        romanization: getJapaneseRomaji('きく', '聞く'),
        meanings: [{ definition: 'to hear, to listen, to ask' }],
        partOfSpeech: ['Godan verb'],
        jlptLevel: 'N5'
      },
      '今日': {
        word: '今日',
        reading: 'きょう',
        romanization: getJapaneseRomaji('きょう', '今日'),
        meanings: [{ definition: 'today, this day' }],
        partOfSpeech: ['Noun'],
        jlptLevel: 'N5'
      },
      'カード': {
        word: 'カード',
        reading: 'カード',
        romanization: getJapaneseRomaji('カード', 'カード'),
        meanings: [{ definition: 'card' }],
        partOfSpeech: ['Noun'],
        jlptLevel: 'N4'
      },
      'ゲーム': {
        word: 'ゲーム',
        reading: 'ゲーム',
        romanization: getJapaneseRomaji('ゲーム', 'ゲーム'),
        meanings: [{ definition: 'game' }],
        partOfSpeech: ['Noun'],
        jlptLevel: 'N4'
      }
    };

    return commonWords[word] || null;
  }

  /**
   * Local Chinese dictionary fallback
   */
  private localChineseLookup(word: string): DictionaryEntry | null {
    const commonWords: Record<string, DictionaryEntry> = {
      '中国': {
        word: '中国',
        pinyin: 'zhōng guó',
        meanings: [{ definition: 'China' }],
        partOfSpeech: ['Noun'],
        hskLevel: 1
      },
      '学习': {
        word: '学习',
        pinyin: 'xué xí',
        meanings: [{ definition: 'to study, to learn' }],
        partOfSpeech: ['Verb'],
        hskLevel: 1
      },
      '吃': {
        word: '吃',
        pinyin: 'chī',
        meanings: [{ definition: 'to eat' }],
        partOfSpeech: ['Verb'],
        hskLevel: 1
      },
      '看': {
        word: '看',
        pinyin: 'kàn',
        meanings: [{ definition: 'to see, to look, to watch' }],
        partOfSpeech: ['Verb'],
        hskLevel: 1
      },
      '听': {
        word: '听',
        pinyin: 'tīng',
        meanings: [{ definition: 'to hear, to listen' }],
        partOfSpeech: ['Verb'],
        hskLevel: 1
      }
    };

    return commonWords[word] || null;
  }

  /**
   * Local Korean dictionary fallback
   */
  private localKoreanLookup(word: string): DictionaryEntry | null {
    const commonWords: Record<string, DictionaryEntry> = {
      '한국': {
        word: '한국',
        romanization: 'hanguk',
        meanings: [{ definition: 'Korea, South Korea' }],
        partOfSpeech: ['Noun'],
        topikLevel: 1
      },
      '안녕하세요': {
        word: '안녕하세요',
        romanization: 'annyeonghaseyo',
        meanings: [{ definition: 'hello (formal)' }],
        partOfSpeech: ['Interjection'],
        topikLevel: 1
      },
      '감사합니다': {
        word: '감사합니다',
        romanization: 'gamsahamnida',
        meanings: [{ definition: 'thank you (formal)' }],
        partOfSpeech: ['Expression'],
        topikLevel: 1
      },
      '사랑': {
        word: '사랑',
        romanization: 'sarang',
        meanings: [{ definition: 'love' }],
        partOfSpeech: ['Noun'],
        topikLevel: 1
      },
      '먹다': {
        word: '먹다',
        romanization: 'meokda',
        meanings: [{ definition: 'to eat' }],
        partOfSpeech: ['Verb'],
        topikLevel: 1
      },
      '보다': {
        word: '보다',
        romanization: 'boda',
        meanings: [{ definition: 'to see, to watch, to look' }],
        partOfSpeech: ['Verb'],
        topikLevel: 1
      },
      '듣다': {
        word: '듣다',
        romanization: 'deutda',
        meanings: [{ definition: 'to hear, to listen' }],
        partOfSpeech: ['Verb'],
        topikLevel: 1
      },
      '오늘': {
        word: '오늘',
        romanization: 'oneul',
        meanings: [{ definition: 'today' }],
        partOfSpeech: ['Noun'],
        topikLevel: 1
      },
      '친구': {
        word: '친구',
        romanization: 'chingu',
        meanings: [{ definition: 'friend' }],
        partOfSpeech: ['Noun'],
        topikLevel: 1
      },
      '학교': {
        word: '학교',
        romanization: 'hakgyo',
        meanings: [{ definition: 'school' }],
        partOfSpeech: ['Noun'],
        topikLevel: 1
      }
    };

    return commonWords[word] || null;
  }

  /**
   * Local English dictionary fallback
   */
  private localEnglishLookup(word: string): DictionaryEntry | null {
    const commonWords: Record<string, DictionaryEntry> = {
      'hello': {
        word: 'hello',
        reading: '/həˈloʊ/',
        meanings: [{ definition: 'used as a greeting or to begin a phone conversation' }],
        partOfSpeech: ['Exclamation', 'Noun']
      },
      'world': {
        word: 'world',
        reading: '/wɜːrld/',
        meanings: [{ definition: 'the earth, together with all of its countries and peoples' }],
        partOfSpeech: ['Noun']
      },
      'learn': {
        word: 'learn',
        reading: '/lɜːrn/',
        meanings: [{ definition: 'gain or acquire knowledge of or skill in something' }],
        partOfSpeech: ['Verb']
      },
      'study': {
        word: 'study',
        reading: '/ˈstʌdi/',
        meanings: [{ definition: 'devote time and attention to acquiring knowledge' }],
        partOfSpeech: ['Verb', 'Noun']
      },
      'language': {
        word: 'language',
        reading: '/ˈlæŋɡwɪdʒ/',
        meanings: [{ definition: 'a system of communication used by a particular country or community' }],
        partOfSpeech: ['Noun']
      }
    };

    return commonWords[word.toLowerCase()] || null;
  }

  // ─────────────────────────────────────────────────────────────
  // Cache helpers (localStorage with LRU eviction)
  // ─────────────────────────────────────────────────────────────

  /**
   * Get cached dictionary entry from localStorage
   */
  private loadCache(): Record<string, { data: DictionaryEntry; accessTime: number }> {
    try {
      const stored = localStorage.getItem(this.CACHE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  private saveCache(cache: Record<string, { data: DictionaryEntry; accessTime: number }>): void {
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(cache));
  }
}

