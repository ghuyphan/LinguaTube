import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { SubtitleCue, Token } from '../models';
import { YoutubeService } from './youtube.service';

// ============================================================================
// Constants
// ============================================================================

const MAX_CACHE_SIZE = 500;
const BATCH_SIZE = 50;
const TOKEN_STORAGE_KEY = 'linguatube_tokens';
const MAX_STORED_VIDEOS = 10; // Max videos to keep in localStorage

// ============================================================================
// Service
// ============================================================================

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {
  private youtube = inject(YoutubeService);

  constructor() {
    // Load cached tokens from localStorage
    this.loadTokensFromStorage();

    // Automatically update current cue based on video time
    // This ensures subtitles are synced even if display component is not active
    effect(() => {
      const time = this.youtube.currentTime();
      this.updateCurrentCue(time);
    });
  }

  // State
  readonly subtitles = signal<SubtitleCue[]>([]);
  readonly currentCueIndex = signal(-1);
  readonly isTokenizing = signal(false);

  // Computed
  readonly currentCue = computed(() => {
    const index = this.currentCueIndex();
    const subs = this.subtitles();
    return index >= 0 && index < subs.length ? subs[index] : null;
  });

  readonly hasSubtitles = computed(() => this.subtitles().length > 0);

  // Cache (LRU)
  private readonly tokenCache = new Map<string, Token[]>();

  // Cancellation
  private abortController: AbortController | null = null;

  // ============================================================================
  // Public API
  // ============================================================================

  /**
   * Batch tokenize all subtitle cues
   */
  async tokenizeAllCues(lang: 'ja' | 'zh' | 'ko' | 'en'): Promise<void> {
    const cues = this.subtitles();
    if (cues.length === 0) return;

    // Skip if already tokenized (all cues have tokens)
    const allTokenized = cues.every(cue => cue.tokens && cue.tokens.length > 0);
    if (allTokenized) {
      console.log('[SubtitleService] Cues already tokenized, skipping');
      return;
    }

    this.cancelTokenization();
    this.isTokenizing.set(true);
    this.abortController = new AbortController();

    // Get videoId early for localStorage operations
    const videoId = this.youtube.currentVideo()?.id;

    // Try to load cached tokens from localStorage first
    if (videoId) {
      this.loadTokensForVideo(videoId, lang);
    }

    try {
      // Create a mutable copy of cues for safe modification
      const updatedCues = cues.map(cue => ({ ...cue }));

      // Collect unique texts needing tokenization
      const uniqueTexts = new Map<string, number[]>();

      updatedCues.forEach((cue, index) => {
        // Skip if cue already has tokens
        if (cue.tokens && cue.tokens.length > 0) return;

        const cacheKey = `${lang}:${cue.text}`;
        const cached = this.tokenCache.get(cacheKey);

        if (cached) {
          cue.tokens = cached;
        } else if (cue.text.trim()) {
          const indices = uniqueTexts.get(cue.text) || [];
          indices.push(index);
          uniqueTexts.set(cue.text, indices);
        }
      });

      if (uniqueTexts.size === 0) {
        this.subtitles.set(updatedCues);
        return;
      }

      console.log(`[SubtitleService] Tokenizing ${uniqueTexts.size} unique texts (${lang})`);

      // Batch tokenize with single API call + single cache write
      const texts = Array.from(uniqueTexts.keys());
      const results = await this.batchTokenize(texts, lang, videoId);

      // Distribute tokens to cues
      texts.forEach((text, i) => {
        const tokens = results[i] || this.fallbackTokenize(text, lang);
        const cacheKey = `${lang}:${text}`;
        this.addToCache(cacheKey, tokens);

        uniqueTexts.get(text)?.forEach(cueIndex => {
          updatedCues[cueIndex].tokens = tokens;
        });
      });

      this.subtitles.set(updatedCues);

      // Save tokens to localStorage for future visits
      if (videoId) {
        this.saveTokensForVideo(videoId, lang);
      }

      console.log('[SubtitleService] Tokenization complete');

    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.log('[SubtitleService] Tokenization cancelled');
        return;
      }

      console.error('[SubtitleService] Tokenization failed:', error);
      this.applyFallbackTokens(cues, lang);

    } finally {
      this.isTokenizing.set(false);
      this.abortController = null;
    }
  }

  /**
   * Cancel ongoing tokenization
   */
  cancelTokenization(): void {
    this.abortController?.abort();
    this.abortController = null;
    this.isTokenizing.set(false);
  }

  /**
   * Get tokens for a cue (pre-computed or fallback)
   */
  getTokens(cue: SubtitleCue, lang: 'ja' | 'zh' | 'ko' | 'en'): Token[] {
    if (cue.tokens?.length) {
      return cue.tokens;
    }

    const cacheKey = `${lang}:${cue.text}`;
    return this.tokenCache.get(cacheKey) || this.fallbackTokenize(cue.text, lang);
  }

  /**
   * Update current cue based on video time (sticky subtitles)
   */
  updateCurrentCue(currentTime: number): void {
    const subs = this.subtitles();

    if (subs.length === 0) {
      this.currentCueIndex.set(-1);
      return;
    }

    // Find active cue (prefer later one for overlaps)
    let index = this.findActiveCue(subs, currentTime);

    // Sticky: show last ended cue if no active one
    if (index === -1 && currentTime > 0) {
      index = this.findStickyCue(subs, currentTime);
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
    this.tokenCache.clear(); // Clear old tokens to prevent stale data
  }

  /**
   * Clear token cache
   */
  clearCache(): void {
    this.tokenCache.clear();
  }

  // ============================================================================
  // Private: Tokenization
  // ============================================================================

  private async batchTokenize(texts: string[], lang: string, videoId?: string): Promise<Token[][]> {
    const signal = this.abortController?.signal;

    // If we have a videoId, use the new batch endpoint (1 KV write)
    if (videoId) {
      try {
        const response = await fetch(`/api/tokenize-batch/${lang}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ texts, videoId }),
          signal
        });

        if (response.ok) {
          const data = await response.json();
          if (data.tokens && Array.isArray(data.tokens)) {
            return data.tokens;
          }
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') throw error;
        console.warn('[SubtitleService] Batch tokenize failed, falling back to individual');
      }
    }

    // Fallback: individual tokenization (old approach)
    const results: Token[][] = [];
    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      if (signal?.aborted) {
        throw new DOMException('Aborted', 'AbortError');
      }

      const chunk = texts.slice(i, i + BATCH_SIZE);
      const chunkResults = await Promise.all(
        chunk.map(text => this.tokenizeSingle(text, lang, signal))
      );
      results.push(...chunkResults);
    }

    return results;
  }

  private async tokenizeSingle(
    text: string,
    lang: string,
    signal?: AbortSignal
  ): Promise<Token[]> {
    try {
      const response = await fetch(`/api/tokenize/${lang}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        signal
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data.tokens || [];

    } catch (error) {
      if ((error as Error).name === 'AbortError') throw error;
      return this.fallbackTokenize(text, lang as 'ja' | 'zh' | 'ko');
    }
  }

  private fallbackTokenize(text: string, lang: 'ja' | 'zh' | 'ko' | 'en'): Token[] {
    if (!text.trim()) return [];

    switch (lang) {
      case 'zh':
        return text.split('').map(char => ({ surface: char }));
      case 'ko':
        return text.split(/\s+/).filter(Boolean).map(word => ({ surface: word }));
      case 'en':
        // Match words only (letters, numbers, apostrophes, hyphens), exclude punctuation
        return text.match(/[\w'-]+/g)?.map(word => ({ surface: word })) || [];
      case 'ja':
      default:
        return this.tokenizeByCharType(text);
    }
  }

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

  private applyFallbackTokens(cues: SubtitleCue[], lang: 'ja' | 'zh' | 'ko' | 'en'): void {
    cues.forEach(cue => {
      if (!cue.tokens) {
        cue.tokens = this.fallbackTokenize(cue.text, lang);
      }
    });
    this.subtitles.set([...cues]);
  }

  // ============================================================================
  // Private: Cue Navigation
  // ============================================================================

  /**
   * Binary search to find cue at given time - O(log n) instead of O(n)
   */
  private findActiveCue(subs: SubtitleCue[], time: number): number {
    if (subs.length === 0) return -1;

    let left = 0;
    let right = subs.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const cue = subs[mid];

      if (time >= cue.startTime && time < cue.endTime) {
        // Found a match, but check if there's a later overlapping cue
        result = mid;
        left = mid + 1;
      } else if (time < cue.startTime) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return result;
  }

  /**
   * Binary search to find last ended cue (for sticky subtitle)
   */
  private findStickyCue(subs: SubtitleCue[], time: number): number {
    if (subs.length === 0) return -1;

    let left = 0;
    let right = subs.length - 1;
    let result = -1;

    // Find the rightmost cue that has ended
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const cue = subs[mid];

      if (cue.endTime <= time) {
        result = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    // Verify the next cue hasn't started yet (gap check)
    if (result !== -1) {
      const next = subs[result + 1];
      if (next && time >= next.startTime) {
        return -1; // We're inside the next cue, not in a gap
      }
    }

    return result;
  }

  // ============================================================================
  // Private: Cache
  // ============================================================================

  private addToCache(key: string, tokens: Token[]): void {
    if (this.tokenCache.size >= MAX_CACHE_SIZE) {
      const firstKey = this.tokenCache.keys().next().value;
      if (firstKey) this.tokenCache.delete(firstKey);
    }
    this.tokenCache.set(key, tokens);
  }

  /**
   * Save tokens for a video to localStorage
   */
  saveTokensForVideo(videoId: string, lang: string): void {
    if (!videoId) return;

    try {
      const stored = this.getStoredTokens();
      const prefix = `${lang}:`;

      // Collect tokens for this video that match the language
      const videoTokens: Record<string, Token[]> = {};
      let count = 0;

      this.tokenCache.forEach((tokens, key) => {
        if (key.startsWith(prefix)) {
          videoTokens[key] = tokens;
          count++;
        }
      });

      if (count === 0) return;

      // Store under video:lang key
      stored[`${videoId}:${lang}`] = {
        tokens: videoTokens,
        timestamp: Date.now()
      };

      // LRU eviction - keep only MAX_STORED_VIDEOS
      const keys = Object.keys(stored);
      if (keys.length > MAX_STORED_VIDEOS) {
        // Sort by timestamp, remove oldest
        keys.sort((a, b) => stored[a].timestamp - stored[b].timestamp);
        keys.slice(0, keys.length - MAX_STORED_VIDEOS).forEach(k => delete stored[k]);
      }

      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(stored));
      console.log(`[SubtitleService] Saved ${count} tokens for ${videoId}:${lang}`);
    } catch {
      // Ignore storage errors
    }
  }

  /**
   * Load tokens for a video from localStorage
   */
  loadTokensForVideo(videoId: string, lang: string): boolean {
    try {
      const stored = this.getStoredTokens();
      const entry = stored[`${videoId}:${lang}`];

      if (entry?.tokens) {
        Object.entries(entry.tokens).forEach(([key, tokens]) => {
          this.tokenCache.set(key, tokens as Token[]);
        });
        console.log(`[SubtitleService] Loaded tokens for ${videoId}:${lang} from localStorage`);
        return true;
      }
    } catch {
      // Ignore errors
    }
    return false;
  }

  private loadTokensFromStorage(): void {
    // Initial load is skipped - tokens are loaded on-demand per video
    // via loadTokensForVideo called from tokenizeAllCues
  }

  private getStoredTokens(): Record<string, { tokens: Record<string, Token[]>; timestamp: number }> {
    try {
      const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  // ============================================================================
  // Private: Utils
  // ============================================================================

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