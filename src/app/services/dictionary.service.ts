import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DictionaryEntry } from '../models';
import { Observable, of, catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  readonly isLoading = signal(false);
  readonly lastLookup = signal<DictionaryEntry | null>(null);
  readonly lastQuery = signal<string>(''); // Persistence for search term

  // Use proxy to avoid CORS issues
  private readonly JOTOBA_API = '/jotoba/api/search/words';
  private readonly MDBG_API = '/api/mdbg';
  private readonly KRDICT_API = '/api/krdict';

  // Cache settings
  private readonly CACHE_KEY = 'linguatube_dict_cache';
  private readonly MAX_CACHE_SIZE = 200;

  constructor(private http: HttpClient) { }

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
   * Auto-detect language and look up
   */
  lookup(word: string, language?: 'ja' | 'zh' | 'ko'): Observable<DictionaryEntry | null> {
    const detectedLang = language || this.detectLanguage(word);

    if (detectedLang === 'zh') {
      return this.lookupChinese(word);
    }
    if (detectedLang === 'ko') {
      return this.lookupKorean(word);
    }
    return this.lookupJapanese(word);
  }

  /* method removed */

  /**
   * Simple language detection based on character types
   */
  private detectLanguage(text: string): 'ja' | 'zh' | 'ko' {
    // Check for Korean (Hangul)
    if (/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(text)) {
      return 'ko';
    }
    // Check for Japanese-specific characters (Hiragana/Katakana)
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) {
      return 'ja';
    }
    // Default to Chinese for CJK ideographs without kana or hangul
    return 'zh';
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

  // ─────────────────────────────────────────────────────────────
  // Cache helpers (localStorage with LRU eviction)
  // ─────────────────────────────────────────────────────────────

  /**
   * Get cached dictionary entry from localStorage
   */
  private getFromCache(word: string, lang: 'ja' | 'zh' | 'ko'): DictionaryEntry | null {
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
  private saveToCache(word: string, lang: 'ja' | 'zh' | 'ko', data: DictionaryEntry): void {
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
