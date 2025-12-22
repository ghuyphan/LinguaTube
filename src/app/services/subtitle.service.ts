import { Injectable, signal, computed } from '@angular/core';
import { SubtitleCue, Token } from '../models';

const MAX_TOKEN_CACHE_SIZE = 500;
const BATCH_CHUNK_SIZE = 50;

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {
  // State
  readonly subtitles = signal<SubtitleCue[]>([]);
  readonly currentCueIndex = signal<number>(-1);
  readonly isTokenizing = signal(false);

  // Computed
  readonly currentCue = computed(() => {
    const index = this.currentCueIndex();
    const subs = this.subtitles();
    return index >= 0 && index < subs.length ? subs[index] : null;
  });

  readonly hasSubtitles = computed(() => this.subtitles().length > 0);

  // Cache (LRU)
  private tokenCache = new Map<string, Token[]>();

  // Cancellation
  private abortController: AbortController | null = null;

  /**
   * Batch tokenize all subtitle cues
   * Collects unique texts, sends API requests, distributes tokens to cues
   */
  async tokenizeAllCues(lang: 'ja' | 'zh' | 'ko'): Promise<void> {
    const cues = this.subtitles();
    if (cues.length === 0) return;

    // Cancel any in-progress tokenization
    this.cancelTokenization();

    this.isTokenizing.set(true);
    this.abortController = new AbortController();

    try {
      // Collect unique texts needing tokenization
      const uniqueTexts = new Map<string, number[]>(); // text -> cue indices

      cues.forEach((cue, index) => {
        const cacheKey = `${lang}:${cue.text}`;
        const cached = this.tokenCache.get(cacheKey);

        if (cached) {
          cue.tokens = cached;
        } else if (cue.text.trim()) {
          if (!uniqueTexts.has(cue.text)) {
            uniqueTexts.set(cue.text, []);
          }
          uniqueTexts.get(cue.text)!.push(index);
        }
      });

      if (uniqueTexts.size === 0) {
        this.subtitles.set([...cues]);
        return;
      }

      console.log(`[SubtitleService] Tokenizing ${uniqueTexts.size} unique texts (${lang})`);

      // Batch tokenize
      const textsToTokenize = Array.from(uniqueTexts.keys());
      const results = await this.batchTokenize(textsToTokenize, lang);

      // Distribute tokens to cues
      textsToTokenize.forEach((text, i) => {
        const tokens = results[i] || this.fallbackTokenize(text, lang);
        const cacheKey = `${lang}:${text}`;
        this.addToCache(cacheKey, tokens);

        uniqueTexts.get(text)?.forEach(cueIndex => {
          cues[cueIndex].tokens = tokens;
        });
      });

      this.subtitles.set([...cues]);
      console.log(`[SubtitleService] Tokenization complete`);

    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.log('[SubtitleService] Tokenization cancelled');
        return;
      }

      console.error('[SubtitleService] Tokenization failed:', error);

      // Apply fallback to all cues without tokens
      cues.forEach(cue => {
        if (!cue.tokens) {
          cue.tokens = this.fallbackTokenize(cue.text, lang);
        }
      });
      this.subtitles.set([...cues]);

    } finally {
      this.isTokenizing.set(false);
      this.abortController = null;
    }
  }

  /**
   * Cancel ongoing tokenization
   */
  cancelTokenization(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    this.isTokenizing.set(false);
  }

  /**
   * Get tokens for a cue (pre-computed or fallback)
   */
  getTokens(cue: SubtitleCue, lang: 'ja' | 'zh' | 'ko'): Token[] {
    if (cue.tokens?.length) {
      return cue.tokens;
    }

    const cacheKey = `${lang}:${cue.text}`;
    const cached = this.tokenCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    return this.fallbackTokenize(cue.text, lang);
  }

  /**
   * Update current cue based on video time
   * Implements "sticky" subtitles - shows most recent cue if no active one
   */
  updateCurrentCue(currentTime: number): void {
    const subs = this.subtitles();

    if (subs.length === 0) {
      this.currentCueIndex.set(-1);
      return;
    }

    // Find active cue (prefer later one for overlaps)
    let index = -1;
    for (let i = subs.length - 1; i >= 0; i--) {
      if (currentTime >= subs[i].startTime && currentTime <= subs[i].endTime) {
        index = i;
        break;
      }
    }

    // Sticky behavior: show last ended cue if no active one
    if (index === -1 && currentTime > 0) {
      for (let i = subs.length - 1; i >= 0; i--) {
        if (subs[i].endTime <= currentTime) {
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
   * Clear all subtitles and reset state
   */
  clear(): void {
    this.cancelTokenization();
    this.subtitles.set([]);
    this.currentCueIndex.set(-1);
  }

  /**
   * Clear token cache
   */
  clearCache(): void {
    this.tokenCache.clear();
  }

  // ============================================================================
  // Private Methods
  // ============================================================================

  private addToCache(key: string, tokens: Token[]): void {
    if (this.tokenCache.size >= MAX_TOKEN_CACHE_SIZE) {
      // LRU eviction
      const firstKey = this.tokenCache.keys().next().value;
      if (firstKey) this.tokenCache.delete(firstKey);
    }
    this.tokenCache.set(key, tokens);
  }

  private async batchTokenize(texts: string[], lang: 'ja' | 'zh' | 'ko'): Promise<Token[][]> {
    const results: Token[][] = [];
    const signal = this.abortController?.signal;

    for (let i = 0; i < texts.length; i += BATCH_CHUNK_SIZE) {
      if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

      const chunk = texts.slice(i, i + BATCH_CHUNK_SIZE);
      const chunkResults = await Promise.all(
        chunk.map(text => this.tokenizeSingle(text, lang, signal))
      );
      results.push(...chunkResults);
    }

    return results;
  }

  private async tokenizeSingle(
    text: string,
    lang: 'ja' | 'zh' | 'ko',
    signal?: AbortSignal
  ): Promise<Token[]> {
    try {
      const response = await fetch(`/api/tokenize/${lang}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      return data.tokens || [];

    } catch (error) {
      if ((error as Error).name === 'AbortError') throw error;
      return this.fallbackTokenize(text, lang);
    }
  }

  /**
   * Fast client-side fallback tokenization
   */
  private fallbackTokenize(text: string, lang: 'ja' | 'zh' | 'ko'): Token[] {
    if (!text.trim()) return [];

    switch (lang) {
      case 'zh':
        // Chinese: character by character
        return text.split('').map(char => ({ surface: char }));

      case 'ko':
        // Korean: space-delimited
        return text.split(/\s+/).filter(Boolean).map(word => ({ surface: word }));

      case 'ja':
      default:
        // Japanese: group by character type
        return this.tokenizeByCharType(text);
    }
  }

  /**
   * Group text by character type (for Japanese)
   */
  private tokenizeByCharType(text: string): Token[] {
    const tokens: Token[] = [];
    let current = '';
    let currentType = '';

    for (const char of text) {
      const type = this.getCharType(char);

      if (type !== currentType && current) {
        tokens.push({ surface: current });
        current = '';
      }

      current += char;
      currentType = type;
    }

    if (current) {
      tokens.push({ surface: current });
    }

    return tokens;
  }

  private getCharType(char: string): string {
    const code = char.charCodeAt(0);

    if (code >= 0x3040 && code <= 0x309F) return 'hiragana';
    if (code >= 0x30A0 && code <= 0x30FF) return 'katakana';
    if (code >= 0x4E00 && code <= 0x9FFF) return 'kanji';
    if (code >= 0x0020 && code <= 0x007F) return 'ascii';
    if (/[。、！？「」『』（）・]/.test(char)) return 'punctuation';

    return 'other';
  }
}