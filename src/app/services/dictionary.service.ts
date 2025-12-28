import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DictionaryEntry } from '../models';
import { Observable, of, catchError, map, tap } from 'rxjs';
import { I18nService, UILanguage } from './i18n.service';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  readonly isLoading = signal(false);
  readonly lastLookup = signal<DictionaryEntry | null>(null);
  readonly lastQuery = signal<string>(''); // Persistence for search term
  readonly recentSearches = signal<string[]>([]); // Shared recent searches state

  // Use proxy to avoid CORS issues
  private readonly JOTOBA_API = '/proxy/jotoba/api/search/words';
  private readonly MDBG_API = '/api/mdbg';
  private readonly KRDICT_API = '/api/krdict';
  private readonly ENDICT_API = '/api/endict';
  private readonly UNIFIED_DICT_API = '/api/dict'; // New unified endpoint

  // Inject I18nService to get user's UI language
  private readonly i18n = inject(I18nService);

  // Cache settings
  private readonly CACHE_KEY = 'linguatube_dict_cache';
  private readonly RECENT_KEY = 'linguatube-recent-searches';
  private readonly MAX_CACHE_SIZE = 200;

  constructor(private http: HttpClient) {
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
   * Look up a Japanese word using Jotoba API
   */
  lookupJapanese(word: string): Observable<DictionaryEntry | null> {
    if (!word.trim()) return of(null);

    // Check cache first
    const cached = this.getFromCache(word, 'ja');
    if (cached) {
      this.lastLookup.set(cached);
      return of(cached);
    }

    this.isLoading.set(true);

    // Jotoba uses POST with JSON body
    const body = {
      query: word,
      language: 'English',
      no_english: false
    };

    return this.http.post<any>(this.JOTOBA_API, body).pipe(
      map(response => {
        this.isLoading.set(false);

        // Jotoba returns { words: [...], kanji: [...], ... }
        if (!response.words || response.words.length === 0) {
          return this.localJapaneseLookup(word);
        }

        const entry = response.words[0];
        const reading = entry.reading?.kana || '';

        // Get JLPT level if available
        let jlptLevel: string | undefined;
        if (entry.common?.jlpt) {
          jlptLevel = `N${entry.common.jlpt}`;
        }

        const result: DictionaryEntry = {
          word: entry.reading?.kanji || entry.reading?.kana || word,
          reading: reading,
          meanings: entry.senses?.map((sense: any) => ({
            definition: sense.glosses?.join(', ') || '',
            tags: sense.pos?.map((p: any) => extractPosString(p)).filter(Boolean) || []
          })) || [],
          partOfSpeech: entry.senses?.[0]?.pos?.map((p: any) => extractPosString(p)).filter(Boolean) || [],
          jlptLevel
        };

        this.lastLookup.set(result);
        this.saveToCache(word, 'ja', result);
        return result;
      }),
      catchError(err => {
        this.isLoading.set(false);
        console.error('Jotoba lookup failed:', err);
        // Fallback to local dictionary
        return of(this.localJapaneseLookup(word));
      })
    );
  }

  /**
   * Look up a Chinese word using MDBG Scraper Proxy
   */
  lookupChinese(word: string): Observable<DictionaryEntry | null> {
    if (!word.trim()) return of(null);

    // Check cache first
    const cached = this.getFromCache(word, 'zh');
    if (cached) {
      this.lastLookup.set(cached);
      return of(cached);
    }

    this.isLoading.set(true);

    return this.http.get<any[]>(`${this.MDBG_API}?q=${encodeURIComponent(word)}`).pipe(
      map(response => {
        const result = this.parseMdbgResponse(response, word);
        if (result) {
          this.saveToCache(word, 'zh', result);
        }
        return result;
      }),
      tap(() => this.isLoading.set(false)),
      catchError(err => {
        this.isLoading.set(false);
        console.log('MDBG lookup failed, using local:', err.message);
        const result = this.localChineseLookup(word);
        if (result) this.lastLookup.set(result);
        return of(result);
      })
    );
  }

  /**
   * Look up a Korean word using Naver Korean-English Dictionary
   */
  lookupKorean(word: string): Observable<DictionaryEntry | null> {
    if (!word.trim()) return of(null);

    // Check cache first
    const cached = this.getFromCache(word, 'ko');
    if (cached) {
      this.lastLookup.set(cached);
      return of(cached);
    }

    this.isLoading.set(true);

    return this.http.get<any[]>(`${this.KRDICT_API}?q=${encodeURIComponent(word)}`).pipe(
      map(response => {
        const result = this.parseKrdictResponse(response, word);
        if (result) {
          this.saveToCache(word, 'ko', result);
        }
        return result;
      }),
      tap(() => this.isLoading.set(false)),
      catchError(err => {
        this.isLoading.set(false);
        console.log('Naver lookup failed, using local:', err.message);
        const result = this.localKoreanLookup(word);
        if (result) this.lastLookup.set(result);
        return of(result);
      })
    );
  }

  /**
   * Parse Naver Korean Dictionary response to DictionaryEntry format
   */
  private parseKrdictResponse(response: any[], word: string): DictionaryEntry | null {
    if (!response || response.length === 0) {
      return this.localKoreanLookup(word);
    }

    const entry = response[0];
    const result: DictionaryEntry = {
      word: entry.word || word,
      romanization: entry.romanization || '',
      meanings: entry.definitions?.map((def: string) => ({
        definition: def,
        examples: []
      })) || [],
      partOfSpeech: entry.partOfSpeech ? [entry.partOfSpeech] : []
    };

    this.lastLookup.set(result);
    return result;
  }

  /**
   * Parse MDBG Scraper response to DictionaryEntry format
   */
  private parseMdbgResponse(response: any[], word: string): DictionaryEntry | null {
    if (!response || response.length === 0) {
      return this.localChineseLookup(word);
    }

    const entry = response[0];
    const result: DictionaryEntry = {
      word: entry.word || word,
      pinyin: entry.pinyin || '',
      meanings: entry.definitions?.map((def: string) => ({
        definition: def,
        examples: []
      })) || [],
      partOfSpeech: [], // MDBG doesn't reliably provide POS in the scraper yet
      hskLevel: entry.hsk
    };

    this.lastLookup.set(result);
    return result;
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

    return this.http.get<any>(url).pipe(
      map(response => {
        this.isLoading.set(false);

        if (!response.entries || response.entries.length === 0) {
          // Fallback to language-specific local lookup
          return this.getLocalFallback(word, from);
        }

        const entry = response.entries[0];
        const result: DictionaryEntry = {
          word: entry.word || word,
          reading: entry.reading || '',
          pinyin: entry.reading || '', // For Chinese
          romanization: entry.reading || '', // For Korean
          meanings: entry.definitions?.map((def: string) => ({
            definition: def,
            examples: []
          })) || [],
          partOfSpeech: entry.partOfSpeech ? [entry.partOfSpeech] : [],
          jlptLevel: entry.level ? `N${entry.level}` : undefined,
          hskLevel: entry.level,
          topikLevel: entry.level
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
   * Look up an English word using Free Dictionary API
   */
  lookupEnglish(word: string): Observable<DictionaryEntry | null> {
    if (!word.trim()) return of(null);

    // Check cache first
    const cached = this.getFromCache(word, 'en');
    if (cached) {
      this.lastLookup.set(cached);
      return of(cached);
    }

    this.isLoading.set(true);

    return this.http.get<any[]>(`${this.ENDICT_API}?q=${encodeURIComponent(word)}`).pipe(
      map(response => {
        const result = this.parseEndictResponse(response, word);
        if (result) {
          this.saveToCache(word, 'en', result);
        }
        return result;
      }),
      tap(() => this.isLoading.set(false)),
      catchError(err => {
        this.isLoading.set(false);
        console.log('English dictionary lookup failed, using local:', err.message);
        const result = this.localEnglishLookup(word);
        if (result) this.lastLookup.set(result);
        return of(result);
      })
    );
  }

  /**
   * Parse Free Dictionary API response to DictionaryEntry format
   */
  private parseEndictResponse(response: any[], word: string): DictionaryEntry | null {
    if (!response || response.length === 0) {
      return this.localEnglishLookup(word);
    }

    const entry = response[0];
    const result: DictionaryEntry = {
      word: entry.word || word,
      reading: entry.phonetic || '', // IPA phonetic
      meanings: entry.definitions?.map((def: string) => ({
        definition: def,
        examples: []
      })) || [],
      partOfSpeech: entry.partOfSpeech || []
    };

    this.lastLookup.set(result);
    return result;
  }

  /* method removed */

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
        meanings: [{ definition: 'Japan' }],
        partOfSpeech: ['Noun'],
        jlptLevel: 'N5'
      },
      '勉強': {
        word: '勉強',
        reading: 'べんきょう',
        meanings: [{ definition: 'study, diligence' }],
        partOfSpeech: ['Noun', 'Suru verb'],
        jlptLevel: 'N5'
      },
      '食べる': {
        word: '食べる',
        reading: 'たべる',
        meanings: [{ definition: 'to eat' }],
        partOfSpeech: ['Ichidan verb'],
        jlptLevel: 'N5'
      },
      '見る': {
        word: '見る',
        reading: 'みる',
        meanings: [{ definition: 'to see, to look, to watch' }],
        partOfSpeech: ['Ichidan verb'],
        jlptLevel: 'N5'
      },
      '聞く': {
        word: '聞く',
        reading: 'きく',
        meanings: [{ definition: 'to hear, to listen, to ask' }],
        partOfSpeech: ['Godan verb'],
        jlptLevel: 'N5'
      },
      '今日': {
        word: '今日',
        reading: 'きょう',
        meanings: [{ definition: 'today, this day' }],
        partOfSpeech: ['Noun'],
        jlptLevel: 'N5'
      },
      'カード': {
        word: 'カード',
        reading: 'カード',
        meanings: [{ definition: 'card' }],
        partOfSpeech: ['Noun'],
        jlptLevel: 'N4'
      },
      'ゲーム': {
        word: 'ゲーム',
        reading: 'ゲーム',
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
  private getFromCache(word: string, lang: 'ja' | 'zh' | 'ko' | 'en'): DictionaryEntry | null {
    try {
      const cache = this.loadCache();
      const key = `${lang}:${word}`;
      const entry = cache[key];
      if (entry) {
        // Update access time for LRU
        entry.accessTime = Date.now();
        this.saveCache(cache);
        console.log('[Dictionary] Cache hit:', word);
        return entry.data;
      }
    } catch (e) {
      console.warn('[Dictionary] Cache read error:', e);
    }
    return null;
  }

  /**
   * Save dictionary entry to localStorage cache
   */
  private saveToCache(word: string, lang: 'ja' | 'zh' | 'ko' | 'en', data: DictionaryEntry): void {
    try {
      const cache = this.loadCache();
      const key = `${lang}:${word}`;

      // Add new entry
      cache[key] = {
        data,
        accessTime: Date.now()
      };

      // Evict oldest entries if over limit (LRU)
      const keys = Object.keys(cache);
      if (keys.length > this.MAX_CACHE_SIZE) {
        const sorted = keys.sort((a, b) => cache[a].accessTime - cache[b].accessTime);
        const toRemove = sorted.slice(0, keys.length - this.MAX_CACHE_SIZE);
        toRemove.forEach(k => delete cache[k]);
      }

      this.saveCache(cache);
      console.log('[Dictionary] Cached:', word);
    } catch (e) {
      console.warn('[Dictionary] Cache write error:', e);
    }
  }

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

/**
 * Extract string from Jotoba's pos (part of speech) object
 * Jotoba returns pos as objects like { Pretty: "Noun", Short: "n" } or just strings
 */
function extractPosString(pos: any): string {
  if (typeof pos === 'string') {
    return pos;
  }
  if (typeof pos === 'object' && pos !== null) {
    // Try various property names Jotoba might use
    return pos.Pretty || pos.Short || pos.name || pos.full || '';
  }
  return '';
}
