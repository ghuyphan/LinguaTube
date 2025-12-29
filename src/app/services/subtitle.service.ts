import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { SubtitleCue, Token } from '../models';
import { YoutubeService } from './youtube.service';

// ============================================================================
// Constants
// ============================================================================

const MAX_CACHE_SIZE = 500;

const TOKEN_STORAGE_KEY = 'linguatube_tokens';
const MAX_STORED_VIDEOS = 10;

// Lazy tokenization
const LAZY_THRESHOLD = 100; // Use lazy tokenization if > 100 cues
const TOKENIZE_BUFFER = 30; // Cues before/after current to tokenize
const TOKENIZE_THROTTLE_MS = 500; // Throttle lazy tokenization checks

// ============================================================================
// Service
// ============================================================================

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {
  private youtube = inject(YoutubeService);

  // Throttle tracking (only for expensive tokenization, not cue lookup)
  private lastTokenizeCheck = 0;
  private lastTokenizedRange = { start: -1, end: -1 };
  private currentLang: 'ja' | 'zh' | 'ko' | 'en' = 'ja';

  constructor() {
    // Load cached tokens from localStorage
    this.loadTokensFromStorage();

    // Automatically update current cue based on video time
    // No throttle needed - binary search is O(log n) and YouTube API already rate-limits (~250ms)
    effect(() => {
      const time = this.youtube.currentTime();

      // Update current cue immediately (fast binary search)
      this.updateCurrentCue(time);

      // Lazy tokenize nearby cues (throttled - this is the expensive async operation)
      const now = Date.now();
      if (now - this.lastTokenizeCheck >= TOKENIZE_THROTTLE_MS) {
        this.lastTokenizeCheck = now;
        this.tokenizeNearbyIfNeeded();
      }
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
   * Batch tokenize subtitle cues.
   * For videos with > LAZY_THRESHOLD cues, only tokenizes initial range and continues lazily.
   */
  async tokenizeAllCues(lang: 'ja' | 'zh' | 'ko' | 'en'): Promise<void> {
    const cues = this.subtitles();
    if (cues.length === 0) return;

    // Track language for lazy tokenization
    this.currentLang = lang;
    this.lastTokenizedRange = { start: -1, end: -1 };

    // Skip if already tokenized (all cues have tokens)
    const allTokenized = cues.every(cue => cue.tokens && cue.tokens.length > 0);
    if (allTokenized) {
      console.log('[SubtitleService] Cues already tokenized, skipping');
      return;
    }

    // Try to load cached tokens from localStorage first
    const videoId = this.youtube.currentVideo()?.id;
    if (videoId) {
      this.loadTokensForVideo(videoId, lang);
      // Check again after loading from cache
      const stillNeedTokenization = this.subtitles().some(cue => !cue.tokens || cue.tokens.length === 0);
      if (!stillNeedTokenization) {
        console.log('[SubtitleService] All cues loaded from cache');
        return;
      }
    }

    // For short videos, tokenize everything
    // For long videos, use lazy tokenization (only initial range)
    const useLazy = cues.length > LAZY_THRESHOLD;

    if (useLazy) {
      console.log(`[SubtitleService] Using lazy tokenization for ${cues.length} cues`);
      await this.tokenizeRange(0, Math.min(TOKENIZE_BUFFER * 2, cues.length - 1), lang);
    } else {
      await this.tokenizeRange(0, cues.length - 1, lang);
    }
  }


  /**
   * Load subtitles from a file (SRT/VTT)
   */
  async loadFromFile(file: File): Promise<void> {
    const text = await file.text();
    const ext = file.name.split('.').pop()?.toLowerCase() || '';

    let parsed: SubtitleCue[] = [];

    if (ext === 'srt') {
      parsed = this.parseSrt(text);
    } else if (ext === 'vtt') {
      parsed = this.parseVtt(text);
    } else {
      throw new Error('Unsupported file format');
    }

    this.subtitles.set(parsed);
    this.currentCueIndex.set(-1);
    this.tokenizeAllCues(this.currentLang);
  }

  private parseSrt(content: string): SubtitleCue[] {
    const cues: SubtitleCue[] = [];
    const blocks = content.trim().replace(/\r\n/g, '\n').split(/\n\n+/);

    for (const block of blocks) {
      const lines = block.split('\n');
      if (lines.length < 3) continue;

      // Index 0 might be ID, or timestamp if ID missing (rare)
      let timeLineIdx = 1;
      if (lines[0].includes('-->')) {
        timeLineIdx = 0;
      }

      const timeLine = lines[timeLineIdx];
      const match = timeLine.match(/(\d{2}:\d{2}:\d{2}[,.]\d{3}) --> (\d{2}:\d{2}:\d{2}[,.]\d{3})/);

      if (match) {
        const startTime = this.parseTimestamp(match[1]);
        const endTime = this.parseTimestamp(match[2]);
        const text = lines.slice(timeLineIdx + 1).join('\n').replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags

        if (text.trim()) {
          cues.push({
            id: crypto.randomUUID(),
            startTime,
            endTime,
            text
          });
        }
      }
    }
    return cues;
  }

  private parseVtt(content: string): SubtitleCue[] {
    const cues: SubtitleCue[] = [];
    const lines = content.trim().replace(/\r\n/g, '\n').split('\n');
    let i = 0;

    // Skip header (WEBVTT)
    if (lines[0].startsWith('WEBVTT')) i++;
    while (i < lines.length && lines[i].trim() === '') i++;

    while (i < lines.length) {
      let line = lines[i].trim();

      // Skip ID if present (digits only) or note
      if (/^\d+$/.test(line)) {
        i++;
        line = lines[i]?.trim();
      }

      if (line?.includes('-->')) {
        const match = line.match(/(\d{2}:)?\d{2}:\d{2}[,.]\d{3} --> (\d{2}:)?\d{2}:\d{2}[,.]\d{3}/);
        if (match) {
          const parts = line.split('-->');
          const startTime = this.parseTimestamp(parts[0].trim());
          const endTime = this.parseTimestamp(parts[1].trim().split(' ')[0]); // Remove settings

          i++;
          let text = '';
          while (i < lines.length && lines[i].trim() !== '') {
            text += (text ? '\n' : '') + lines[i];
            i++;
          }

          text = text.replace(/<\/?[^>]+(>|$)/g, ""); // Strip tags
          if (text) {
            cues.push({
              id: crypto.randomUUID(),
              startTime,
              endTime,
              text
            });
          }
        } else {
          i++;
        }
      } else {
        i++;
      }
    }
    return cues;
  }

  private parseTimestamp(timestamp: string): number {
    // 00:00:20,000 or 00:00:20.000 or 00:20.000
    timestamp = timestamp.replace(',', '.');
    const parts = timestamp.split(':');
    let seconds = 0;

    if (parts.length === 3) {
      seconds += parseInt(parts[0], 10) * 3600;
      seconds += parseInt(parts[1], 10) * 60;
      seconds += parseFloat(parts[2]);
    } else if (parts.length === 2) {
      seconds += parseInt(parts[0], 10) * 60;
      seconds += parseFloat(parts[1]);
    }

    return seconds;
  }

  /**
   * Tokenize cues within a specific range [startIdx, endIdx]
   */
  private async tokenizeRange(startIdx: number, endIdx: number, lang: 'ja' | 'zh' | 'ko' | 'en'): Promise<void> {
    const cues = this.subtitles();
    if (cues.length === 0) return;

    // Clamp indices
    startIdx = Math.max(0, startIdx);
    endIdx = Math.min(cues.length - 1, endIdx);

    // Skip if ALL cues in the requested range already have tokens
    // This check is independent of lastTokenizedRange to catch cues that failed tokenization
    const rangeHasAllTokens = cues.slice(startIdx, endIdx + 1).every(c => (c.tokens?.length ?? 0) > 0);
    if (rangeHasAllTokens) {
      // Update range tracking even if we skip (range is confirmed tokenized)
      this.updateTokenizedRange(startIdx, endIdx);
      return;
    }

    this.cancelTokenization();
    this.isTokenizing.set(true);
    this.abortController = new AbortController();

    try {
      // Create a mutable copy of cues for safe modification
      const updatedCues = cues.map(cue => ({ ...cue }));

      // Collect unique texts needing tokenization (only in range)
      const uniqueTexts = new Map<string, number[]>();

      for (let index = startIdx; index <= endIdx; index++) {
        const cue = updatedCues[index];
        // Skip if cue already has tokens
        if (cue.tokens && cue.tokens.length > 0) continue;

        const cacheKey = `${lang}:${cue.text}`;
        const cached = this.tokenCache.get(cacheKey);

        if (cached) {
          cue.tokens = cached;
        } else if (cue.text.trim()) {
          const indices = uniqueTexts.get(cue.text) || [];
          indices.push(index);
          uniqueTexts.set(cue.text, indices);
        }
      }

      if (uniqueTexts.size === 0) {
        this.subtitles.set(updatedCues);
        this.updateTokenizedRange(startIdx, endIdx);
        return;
      }

      console.log(`[SubtitleService] Tokenizing ${uniqueTexts.size} unique texts (range ${startIdx}-${endIdx})`);

      // Batch tokenize
      const videoId = this.youtube.currentVideo()?.id;
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
      this.updateTokenizedRange(startIdx, endIdx);

      // Save tokens to localStorage for future visits
      if (videoId) {
        this.saveTokensForVideo(videoId, lang);
      }

    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.log('[SubtitleService] Tokenization cancelled');
        return;
      }

      console.error('[SubtitleService] Tokenization failed:', error);
      // Apply fallback only for the range (without replacing all subtitles)
      this.applyFallbackTokens(startIdx, endIdx, lang);

    } finally {
      this.isTokenizing.set(false);
      this.abortController = null;
    }
  }

  /**
   * Update the tracked tokenized range
   */
  private updateTokenizedRange(start: number, end: number): void {
    if (this.lastTokenizedRange.start === -1) {
      this.lastTokenizedRange = { start, end };
    } else {
      this.lastTokenizedRange.start = Math.min(this.lastTokenizedRange.start, start);
      this.lastTokenizedRange.end = Math.max(this.lastTokenizedRange.end, end);
    }
  }

  /**
   * Lazily tokenize nearby cues as user progresses through video
   */
  private tokenizeNearbyIfNeeded(): void {
    const currentIdx = this.currentCueIndex();
    const cues = this.subtitles();

    if (currentIdx < 0 || cues.length <= LAZY_THRESHOLD) return;

    // Calculate needed range around current position
    const neededStart = Math.max(0, currentIdx - TOKENIZE_BUFFER);
    const neededEnd = Math.min(cues.length - 1, currentIdx + TOKENIZE_BUFFER);

    // Check if we need to tokenize:
    // 1. Range extends beyond what we've tracked, OR
    // 2. Any cues in the needed range are missing tokens (handles failed tokenization)
    const rangeExtended = neededStart < this.lastTokenizedRange.start ||
      neededEnd > this.lastTokenizedRange.end;

    // Quick check for missing tokens in needed range
    const hasMissingTokens = cues.slice(neededStart, neededEnd + 1)
      .some(c => !c.tokens || c.tokens.length === 0);

    if ((rangeExtended || hasMissingTokens) && !this.isTokenizing()) {
      // Expand range to include what we need plus what we've already done
      const expandedStart = this.lastTokenizedRange.start === -1
        ? neededStart
        : Math.min(neededStart, this.lastTokenizedRange.start);
      const expandedEnd = this.lastTokenizedRange.end === -1
        ? neededEnd
        : Math.max(neededEnd, this.lastTokenizedRange.end);

      // Tokenize in background (don't await)
      this.tokenizeRange(expandedStart, expandedEnd, this.currentLang);
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
   * Detects if API returned a suspiciously single token and falls back
   */
  getTokens(cue: SubtitleCue, lang: 'ja' | 'zh' | 'ko' | 'en'): Token[] {
    // Check if we have tokens and they look valid
    if (cue.tokens?.length) {
      // Detect bad tokenization: if we only have 1 token for a long text,
      // the API likely failed to tokenize properly
      if (cue.tokens.length === 1 && cue.text.length > 5) {
        const singleToken = cue.tokens[0].surface;
        // If the single token is basically the whole text, re-tokenize locally
        if (singleToken.length > cue.text.length * 0.8) {
          return this.fallbackTokenize(cue.text, lang);
        }
      }
      return cue.tokens;
    }

    const cacheKey = `${lang}:${cue.text}`;
    const cached = this.tokenCache.get(cacheKey);

    // Same check for cached tokens
    if (cached?.length === 1 && cue.text.length > 5) {
      const singleToken = cached[0].surface;
      if (singleToken.length > cue.text.length * 0.8) {
        return this.fallbackTokenize(cue.text, lang);
      }
    }

    return cached || this.fallbackTokenize(cue.text, lang);
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

    // Try batch endpoint first (requires videoId)
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
        console.warn('[SubtitleService] Batch tokenize failed, using local fallback');
      }
    }

    // Fallback: use local tokenization (no API calls = no rate limit issues)
    // This is less accurate than server-side kuromoji for Japanese,
    // but prevents exhausting user's rate limit
    console.log('[SubtitleService] Using local fallback tokenization');
    return texts.map(text => this.fallbackTokenize(text, lang as 'ja' | 'zh' | 'ko' | 'en'));
  }



  private fallbackTokenize(text: string, lang: 'ja' | 'zh' | 'ko' | 'en'): Token[] {
    if (!text.trim()) return [];

    switch (lang) {
      case 'zh':
        return text.split('').map(char => ({
          surface: char,
          isPunctuation: this.isPunctuation(char)
        }));
      case 'ko':
        return text.split(/\s+/).filter(Boolean).map(word => ({
          surface: word,
          isPunctuation: this.isPunctuation(word)
        }));
      case 'en':
        // Match words (letters, numbers, apostrophes, hyphens) OR non-word sequences
        // allowing us to preserve punctuation/spaces
        return (text.match(/[\w'-]+|[^\w'-]+/g) || []).map(str => ({
          surface: str,
          // Consider it punctuation if it doesn't contain any letters/numbers
          isPunctuation: !/[a-zA-Z0-9]/.test(str)
        }));
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
        tokens.push({
          surface: current,
          isPunctuation: this.isPunctuation(current)
        });
        current = '';
      }

      current += char;
      currentType = type;
    }

    if (current) {
      tokens.push({
        surface: current,
        isPunctuation: this.isPunctuation(current)
      });
    }

    return tokens;
  }

  private applyFallbackTokens(startIdx: number, endIdx: number, lang: 'ja' | 'zh' | 'ko' | 'en'): void {
    const cues = this.subtitles();
    const updatedCues = cues.map((cue, idx) => {
      if (idx >= startIdx && idx <= endIdx && !cue.tokens) {
        return { ...cue, tokens: this.fallbackTokenize(cue.text, lang) };
      }
      return cue;
    });
    this.subtitles.set(updatedCues);
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

    if (/[\u3040-\u309F]/.test(char)) return 'hiragana';
    if (/[\u30A0-\u30FF]/.test(char)) return 'katakana';

    if (this.isPunctuation(char)) return 'punctuation';

    return 'other';
  }

  /**
   * Check if string is punctuation/whitespace (CJK + Western)
   * Moved from SubtitleDisplayComponent for pre-computation
   */
  private isPunctuation(text: string): boolean {
    const punctuationRegex = /^[\s\p{P}\p{S}【】「」『』（）〔〕［］｛｝〈〉《》〖〗〘〙〚〛｟｠、。・ー〜～！？：；，．""''…—–*]+$/u;
    return punctuationRegex.test(text);
  }
}