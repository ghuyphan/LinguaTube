import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleCue, Token } from '../models';

// Max cached tokenization entries (LRU eviction)
const MAX_TOKEN_CACHE_SIZE = 500;

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {
  readonly subtitles = signal<SubtitleCue[]>([]);
  readonly currentCueIndex = signal<number>(-1);
  readonly isTokenizing = signal(false);

  // Cache for tokenized text to avoid repeated API calls (LRU at 500 entries)
  private tokenCache = new Map<string, Token[]>();

  readonly currentCue = computed(() => {
    const index = this.currentCueIndex();
    const subs = this.subtitles();
    return index >= 0 && index < subs.length ? subs[index] : null;
  });

  constructor(private http: HttpClient) { }

  /**
   * Add to cache with LRU eviction
   */
  private addToCache(key: string, tokens: Token[]): void {
    // LRU eviction: remove oldest entry if at capacity
    if (this.tokenCache.size >= MAX_TOKEN_CACHE_SIZE) {
      const firstKey = this.tokenCache.keys().next().value;
      if (firstKey) {
        this.tokenCache.delete(firstKey);
      }
    }
    this.tokenCache.set(key, tokens);
  }

  /**
   * Batch tokenize all subtitle cues
   * Collects unique texts, sends single API request per language, distributes tokens to cues
   */
  async tokenizeAllCues(lang: 'ja' | 'zh' | 'ko'): Promise<void> {
    const cues = this.subtitles();
    if (cues.length === 0) return;

    this.isTokenizing.set(true);

    try {
      // Collect unique texts that need tokenization
      const uniqueTexts = new Map<string, number[]>(); // text -> cue indices

      cues.forEach((cue, index) => {
        const cacheKey = `${lang}:${cue.text}`;
        if (this.tokenCache.has(cacheKey)) {
          // Already cached, use cached tokens
          cue.tokens = this.tokenCache.get(cacheKey);
        } else {
          // Need to tokenize
          if (!uniqueTexts.has(cue.text)) {
            uniqueTexts.set(cue.text, []);
          }
          uniqueTexts.get(cue.text)!.push(index);
        }
      });

      if (uniqueTexts.size === 0) {
        // All already cached
        this.subtitles.set([...cues]);
        return;
      }

      // Batch tokenize using server API
      const textsToTokenize = Array.from(uniqueTexts.keys());
      console.log(`[SubtitleService] Batch tokenizing ${textsToTokenize.length} unique texts for ${lang}`);

      // Send batch request (multiple texts in one call)
      const tokenizedResults = await this.batchTokenize(textsToTokenize, lang);

      // Distribute tokens to cues
      textsToTokenize.forEach((text, i) => {
        const tokens = tokenizedResults[i] || this.fallbackTokenize(text, lang);
        const cacheKey = `${lang}:${text}`;
        this.addToCache(cacheKey, tokens);

        // Apply to all cues with this text
        const indices = uniqueTexts.get(text) || [];
        indices.forEach(cueIndex => {
          cues[cueIndex].tokens = tokens;
        });
      });

      // Trigger update
      this.subtitles.set([...cues]);
      console.log(`[SubtitleService] Tokenization complete for ${cues.length} cues`);

    } catch (error) {
      console.error('[SubtitleService] Batch tokenization failed:', error);
      // Fallback: apply basic tokenization to all cues
      cues.forEach(cue => {
        if (!cue.tokens) {
          cue.tokens = this.fallbackTokenize(cue.text, lang);
        }
      });
      this.subtitles.set([...cues]);
    } finally {
      this.isTokenizing.set(false);
    }
  }

  /**
   * Batch tokenize multiple texts in one API call
   */
  private async batchTokenize(texts: string[], lang: 'ja' | 'zh' | 'ko'): Promise<Token[][]> {
    const results: Token[][] = [];

    // Process in chunks to avoid payload limits (max 50 per batch)
    const chunkSize = 50;
    for (let i = 0; i < texts.length; i += chunkSize) {
      const chunk = texts.slice(i, i + chunkSize);

      // Tokenize each text in chunk (could be optimized further with a true batch endpoint)
      const chunkResults = await Promise.all(
        chunk.map(text => this.tokenizeSingle(text, lang))
      );
      results.push(...chunkResults);
    }

    return results;
  }

  /**
   * Tokenize single text via API
   */
  private async tokenizeSingle(text: string, lang: 'ja' | 'zh' | 'ko'): Promise<Token[]> {
    try {
      const response = await fetch(`/api/tokenize/${lang}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!response.ok) throw new Error('Tokenization failed');

      const data = await response.json();
      return data.tokens || [];
    } catch {
      return this.fallbackTokenize(text, lang);
    }
  }

  /**
   * Fast fallback tokenization (client-side)
   */
  private fallbackTokenize(text: string, lang: 'ja' | 'zh' | 'ko'): Token[] {
    if (lang === 'zh') {
      return text.split('').map(char => ({ surface: char }));
    }
    if (lang === 'ko') {
      // Korean is space-delimited, split by spaces and filter empty
      return text.split(/\s+/).filter(w => w.trim()).map(word => ({ surface: word }));
    }
    return this.tokenizeJapaneseBasic(text);
  }

  /**
   * Get tokens for a cue (uses pre-computed tokens from cue, falls back to basic)
   */
  getTokens(cue: SubtitleCue, lang: 'ja' | 'zh' | 'ko'): Token[] {
    // Use pre-computed tokens if available
    if (cue.tokens && cue.tokens.length > 0) {
      return cue.tokens;
    }

    // Fallback to cached or basic tokenization
    const cacheKey = `${lang}:${cue.text}`;
    if (this.tokenCache.has(cacheKey)) {
      return this.tokenCache.get(cacheKey)!;
    }

    return this.fallbackTokenize(cue.text, lang);
  }

  /**
   * Update current cue based on video time
   * Implements "sticky" subtitles - if no active cue, show the most recent one that ended
   */
  updateCurrentCue(currentTime: number): void {
    const subs = this.subtitles();
    if (subs.length === 0) {
      this.currentCueIndex.set(-1);
      return;
    }

    // First, try to find an active cue (current time is within start/end)
    // Use reverse loop to prefer the most recently started cue for overlapping subtitles
    let index = -1;
    for (let i = subs.length - 1; i >= 0; i--) {
      if (currentTime >= subs[i].startTime && currentTime <= subs[i].endTime) {
        index = i;
        break;
      }
    }

    // If no active cue, implement "sticky" behavior:
    // Find the last subtitle that ended before current time (but only if we've started playing past first subtitle)
    if (index === -1 && currentTime > 0) {
      for (let i = subs.length - 1; i >= 0; i--) {
        if (subs[i].endTime <= currentTime) {
          // Found a subtitle that already ended - show it as "sticky"
          // But only if the next subtitle hasn't started yet
          const nextSub = subs[i + 1];
          if (!nextSub || currentTime < nextSub.startTime) {
            index = i;
          }
          break;
        }
      }
    }

    this.currentCueIndex.set(index);
  }

  /**
   * Clear all subtitles
   */
  clear(): void {
    this.subtitles.set([]);
    this.currentCueIndex.set(-1);
  }

  // Private helpers

  private parseTimestamp(str: string): number {
    // Format: 00:00:00,000 or 00:00:00.000
    const match = str.match(/(\d{1,2}):(\d{2}):(\d{2})[,.](\d{3})/);
    if (!match) return NaN;

    const [, hours, minutes, seconds, ms] = match;
    return (
      parseInt(hours) * 3600 +
      parseInt(minutes) * 60 +
      parseInt(seconds) +
      parseInt(ms) / 1000
    );
  }

  private parseASSTimestamp(str: string): number {
    // Format: 0:00:00.00
    const match = str.trim().match(/(\d+):(\d{2}):(\d{2})\.(\d{2})/);
    if (!match) return NaN;

    const [, hours, minutes, seconds, cs] = match;
    return (
      parseInt(hours) * 3600 +
      parseInt(minutes) * 60 +
      parseInt(seconds) +
      parseInt(cs) / 100
    );
  }

  /**
   * Basic Japanese tokenization (fallback) - groups by character type
   */
  private tokenizeJapaneseBasic(text: string): Token[] {
    const tokens: Token[] = [];
    let currentWord = '';
    let currentType = '';

    for (const char of text) {
      const type = this.getCharType(char);

      if (type !== currentType && currentWord) {
        tokens.push({ surface: currentWord });
        currentWord = '';
      }

      currentWord += char;
      currentType = type;
    }

    if (currentWord) {
      tokens.push({ surface: currentWord });
    }

    return tokens;
  }

  private cleanSubtitleText(text: string): string {
    return text
      .replace(/<[^>]+>/g, '')     // Remove HTML tags
      .replace(/\{[^}]*\}/g, '')   // Remove style tags
      .trim();
  }

  private getCharType(char: string): string {
    const code = char.charCodeAt(0);

    // Hiragana
    if (code >= 0x3040 && code <= 0x309F) return 'hiragana';
    // Katakana
    if (code >= 0x30A0 && code <= 0x30FF) return 'katakana';
    // CJK Unified Ideographs (Kanji/Hanzi)
    if (code >= 0x4E00 && code <= 0x9FFF) return 'kanji';
    // ASCII
    if (code >= 0x0020 && code <= 0x007F) return 'ascii';
    // Punctuation
    if (/[。、！？「」『』（）]/.test(char)) return 'punctuation';

    return 'other';
  }
}
