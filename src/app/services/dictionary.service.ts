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
  private readonly FREEDICT_API = '/freedict';

  constructor(private http: HttpClient) { }

  /**
   * Look up a Japanese word using Jotoba API
   */
  lookupJapanese(word: string): Observable<DictionaryEntry | null> {
    if (!word.trim()) return of(null);

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
   * Look up a Chinese word using Free Dictionary API
   */
  lookupChinese(word: string): Observable<DictionaryEntry | null> {
    if (!word.trim()) return of(null);

    this.isLoading.set(true);

    return this.http.get<any[]>(`${this.FREEDICT_API}/zh/${encodeURIComponent(word)}`).pipe(
      map(response => this.parseFreeDictResponse(response, word)),
      tap(() => this.isLoading.set(false)),
      catchError(err => {
        this.isLoading.set(false);
        console.log('FreeDictionary lookup failed, using local:', err.message);
        const result = this.localChineseLookup(word);
        if (result) this.lastLookup.set(result);
        return of(result);
      })
    );
  }

  /**
   * Parse Free Dictionary API response to DictionaryEntry format
   */
  private parseFreeDictResponse(response: any[], word: string): DictionaryEntry | null {
    if (!response || response.length === 0) {
      return this.localChineseLookup(word);
    }

    const entry = response[0];
    const result: DictionaryEntry = {
      word: entry.word || word,
      pinyin: entry.phonetic || entry.phonetics?.[0]?.text || '',
      meanings: entry.meanings?.flatMap((m: any) =>
        m.definitions?.map((d: any) => ({
          definition: d.definition || '',
          examples: d.example ? [d.example] : []
        })) || []
      ) || [],
      partOfSpeech: entry.meanings?.map((m: any) => m.partOfSpeech).filter(Boolean) || []
    };

    this.lastLookup.set(result);
    return result;
  }

  /**
   * Auto-detect language and look up
   */
  lookup(word: string, language?: 'ja' | 'zh'): Observable<DictionaryEntry | null> {
    const detectedLang = language || this.detectLanguage(word);

    if (detectedLang === 'zh') {
      return this.lookupChinese(word);
    }
    return this.lookupJapanese(word);
  }

  /* method removed */

  /**
   * Simple language detection based on character types
   */
  private detectLanguage(text: string): 'ja' | 'zh' {
    // Check for Japanese-specific characters (Hiragana/Katakana)
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) {
      return 'ja';
    }
    // Default to Chinese for CJK ideographs without kana
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
