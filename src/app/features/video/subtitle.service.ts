import { Injectable, signal, computed, inject, effect, untracked } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubtitleCue, Token } from '../../models';
import { YoutubeService } from './youtube.service';
import { SettingsService } from '../../core/services/settings.service';
import { I18nService } from '../../core/services/i18n.service';
import { TranslationService } from '../../services/translation.service';
import { TranscriptCacheService } from '../../services/transcript-cache.service';
import { PocketBaseService } from '../../core/services/pocketbase.service';
import { environment } from '../../../environments/environment';
import { getJapaneseRomaji, isJapaneseKanaText } from '../../shared/utils/japanese-romaji';
import { getCharType, isPunctuation, detectSubtitleLanguage } from '../../shared/utils/language.utils';

// ============================================================================
// Constants
// ============================================================================

const MAX_CACHE_SIZE = 1000;
const MAX_TOKENIZE_BATCH_SIZE = 800;

const TOKEN_STORAGE_KEY = 'linguatube_tokens';
const MAX_STORED_VIDEOS = 10;

// Dual subtitles batching
const DUAL_SUB_BATCH_SIZE = 50;
const DUAL_SUB_BUFFER = 25;

// ============================================================================
// Service
// ============================================================================

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {
  private youtube = inject(YoutubeService);
  private settings = inject(SettingsService);
  private i18n = inject(I18nService);
  private translation = inject(TranslationService);
  private transcriptCache = inject(TranscriptCacheService);
  private pocketbase = inject(PocketBaseService);

  // Rate limiting circuit breaker
  private rateLimitedUntil = 0;

  // Dual Subtitles State & Tracking
  private dualSubSubscription: Subscription | null = null;
  private lazyLoadSubscription: Subscription | null = null;
  private isLazyLoadPending = false;
  private lastLazyLoadedIndex = -1;
  private pendingBatchStartIdx = -1;
  private pendingBatchEndIdx = -1;
  private lastDualSubVideoId: string | null = null;
  private lastDualSubSourceLang: string | null = null;
  private lastDualSubTargetLang: string | null = null;
  private lastDualSubFirstCueId: string | null = null;
  private lastDualSubCuesCount = 0;
  private lastBatchFailureTime = 0;
  private consecutiveBatchFailures = 0;
  private hasPersistedDualToR2 = false;
  private lastPersistedCueCount = 0;
  private lastPersistTimestamp = 0;

  constructor() {
    // Load cached tokens from localStorage
    this.loadTokensFromStorage();

    // Automatically update current cue based on video time
    // Fast binary search O(log n) with zero network requests during playback
    effect(() => {
      const time = this.youtube.currentTime();
      this.updateCurrentCue(time);
    });

    // Centralized Dual Subtitle Reactive Orchestrator
    // Reacts to video, subtitle list, dual toggle, and target language changes (following UI locale)
    effect(() => {
      const showDual = this.settings.settings().showDualSubtitles;
      const sourceLang = this.activeLanguage();
      const targetLang = this.dualSubtitleTargetLang();

      // Keep settings synchronized if dualSubtitleTargetLang had to resolve an alternative
      if (this.settings.settings().dualSubtitleTargetLang !== targetLang) {
        untracked(() => {
          this.settings.setDualSubtitleTargetLang(targetLang);
        });
      }
      const videoId = this.youtube.currentVideo()?.id;
      const cues = this.subtitles();
      const firstCueId = cues.length > 0 ? cues[0]?.id : null;

      // Detect video, target language, source language, or track switches (by cue ID/count, not array reference)
      const isTrackChanged = (
        videoId !== this.lastDualSubVideoId ||
        targetLang !== this.lastDualSubTargetLang ||
        sourceLang !== this.lastDualSubSourceLang ||
        cues.length !== this.lastDualSubCuesCount ||
        firstCueId !== this.lastDualSubFirstCueId
      );

      if (isTrackChanged) {
        this.cancelDualSubtitles();
        this.cueTranslations.set(new Map());
        this.isDualCached.set(false);
        this.lastLazyLoadedIndex = -1;
        this.pendingBatchStartIdx = -1;
        this.pendingBatchEndIdx = -1;
        this.lastDualSubVideoId = videoId || null;
        this.lastDualSubSourceLang = sourceLang || null;
        this.lastDualSubTargetLang = targetLang;
        this.lastDualSubCuesCount = cues.length;
        this.lastDualSubFirstCueId = firstCueId;
      }

      if (!showDual || !videoId || cues.length === 0 || targetLang === sourceLang) {
        this.clearDualSubLoadingState();
        return;
      }

      // Check if we need to initialize dual subtitles for this video & target language
      if (this.cueTranslations().size === 0 && !this.isDualCached() && !this.isDualSubLoading()) {
        untracked(() => {
          this.initDualSubtitles(videoId, sourceLang, targetLang, cues);
        });
      }
    });
  }

  // NOTE: ngOnDestroy is intentionally not implemented because SubtitleService is provided in 'root'
  // and Angular never calls lifecycle hooks on singleton services. Token persistence is handled
  // by scheduleTokenSave() which runs with a debounce whenever tokens are computed.

  // State
  private tokenSaveTimer: ReturnType<typeof setTimeout> | null = null;
  private pendingSaveArgs: { videoId: string, lang: string } | null = null;
  readonly subtitles = signal<SubtitleCue[]>([]);
  readonly currentCueIndex = signal(-1);
  readonly isTokenizing = signal(false);
  // Dual subtitle translations (mapped by cue ID)
  readonly cueTranslations = signal<Map<string, string>>(new Map());
  // Dual subtitle loading state (shared across components)
  readonly isDualSubLoading = signal(false);
  readonly isDualCached = signal(false);
  readonly isTranslatingDual = signal(false);
  readonly dualSubError = signal<string | null>(null);
  readonly dualSubtitleTargetLang = computed(() => {
    const sourceLang = this.activeLanguage();
    const uiLang = this.i18n.currentLanguage();
    const target = this.settings.settings().dualSubtitleTargetLang;
    if (!target || target === sourceLang) {
      if (uiLang && uiLang !== sourceLang) {
        return uiLang;
      }
      return sourceLang === 'en' ? 'vi' : 'en';
    }
    return target;
  });

  // Language state tracking
  readonly loadedLanguage = signal<'ja' | 'zh' | 'ko' | 'en' | null>(null);
  readonly requestedLanguage = signal<string | null>(null);

  /**
   * Evaluates the authentic language of current subtitles.
   * If cues exist, detects language from cue text; otherwise falls back to loadedLanguage or settings.
   */
  readonly activeLanguage = computed(() => {
    const cues = this.subtitles();
    if (cues.length > 0) {
      return detectSubtitleLanguage(cues);
    }
    const loaded = this.loadedLanguage();
    if (loaded) return loaded;
    return this.settings.settings().language;
  });

  /** Master visibility toggle for subtitles/captions (toggled via 'c' key or CC button) */
  readonly subtitlesVisible = signal(true);

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
   * Update the language state (loaded vs requested)
   * This helps track if we have a mismatch and avoid refetching on navigation
   */
  setLanguageState(loaded: 'ja' | 'zh' | 'ko' | 'en' | null, requested: string): void {
    this.loadedLanguage.set(loaded);
    this.requestedLanguage.set(requested);
  }

  /**
   * Toggle master subtitle visibility
   * Returns the new visibility state (true = visible, false = hidden)
   */
  toggleSubtitlesVisible(): boolean {
    const newState = !this.subtitlesVisible();
    this.subtitlesVisible.set(newState);
    return newState;
  }

  /**
   * Batch tokenize subtitle cues.
   * Tokenizes all cues for the video on load in full batches (up to 800 cues each).
   */
  async tokenizeAllCues(lang: 'ja' | 'zh' | 'ko' | 'en' | null): Promise<void> {
    const cues = this.subtitles();
    if (cues.length === 0) return;

    this.loadedLanguage.set(lang);

    // Skip if already tokenized (all cues have tokens)
    const allTokenized = cues.every(cue => cue.tokens && cue.tokens.length > 0);
    if (allTokenized) {
      console.log('[SubtitleService] Cues already tokenized, skipping');
      return;
    }

    // Try to load cached tokens from localStorage first
    const videoId = this.youtube.currentVideo()?.id;
    if (videoId && lang) {
      this.loadTokensForVideo(videoId, lang);
      // Check again after loading from cache
      const stillNeedTokenization = this.subtitles().some(cue => !cue.tokens || cue.tokens.length === 0);
      if (!stillNeedTokenization) {
        console.log('[SubtitleService] All cues loaded from cache');
        return;
      }
    }

    await this.tokenizeAllCuesInternal(lang, videoId);
  }

  /**
   * Internal bulk tokenization implementation across all video cues
   */
  private async tokenizeAllCuesInternal(lang: 'ja' | 'zh' | 'ko' | 'en' | null, videoId?: string): Promise<void> {
    const cues = this.subtitles();
    if (cues.length === 0) return;

    this.cancelTokenization();
    this.isTokenizing.set(true);
    this.abortController = new AbortController();

    try {
      // Create a mutable copy of cues for safe modification
      const updatedCues = cues.map(cue => ({ ...cue }));

      // Collect unique texts needing tokenization
      const uniqueTexts = new Map<string, number[]>();

      for (let index = 0; index < updatedCues.length; index++) {
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
        return;
      }

      const texts = Array.from(uniqueTexts.keys());

      // Process in batches of MAX_TOKENIZE_BATCH_SIZE (usually 1 batch of <= 800 texts)
      // Updating progressively per batch ensures the first 800 cues are available immediately
      for (let i = 0; i < texts.length; i += MAX_TOKENIZE_BATCH_SIZE) {
        const chunk = texts.slice(i, i + MAX_TOKENIZE_BATCH_SIZE);
        const chunkResults = await this.batchTokenize(chunk, lang || 'en', videoId);

        chunk.forEach((text, chunkIdx) => {
          const tokens = chunkResults[chunkIdx] || this.fallbackTokenize(text, lang);
          const cacheKey = `${lang}:${text}`;
          this.addToCache(cacheKey, tokens);

          uniqueTexts.get(text)?.forEach(cueIndex => {
            updatedCues[cueIndex].tokens = tokens;
          });
        });

        // Update UI immediately with this chunk's tokens
        this.subtitles.set([...updatedCues]);
      }

      // Save tokens to localStorage for future visits (debounced)
      if (videoId && lang) {
        this.scheduleTokenSave(videoId, lang);
      }

    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        console.log('[SubtitleService] Tokenization cancelled');
        return;
      }

      console.error('[SubtitleService] Tokenization failed:', error);
      // Apply fallback across all cues missing tokens
      this.applyFallbackTokens(0, cues.length - 1, lang);

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
   * Detects if API returned a suspiciously single token and falls back
   */
  getTokens(cue: SubtitleCue, lang: 'ja' | 'zh' | 'ko' | 'en' | null): Token[] {
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
    // CRITICAL: Don't update cue if we are switching videos (pending ID exists)
    // or if the player is in an invalid state (time 0 usually means reset).
    if (subs.length === 0 || this.youtube.pendingVideoId()) {
      return;
    }

    // Find active cue (prefer later one for overlaps)
    let index = this.findActiveCue(subs, currentTime);

    // Sticky: show last ended cue if no active one
    // Added 0.2s tolerance to findStickyCue to prevent flickering at boundaries
    if (index === -1 && currentTime > 0) {
      index = this.findStickyCue(subs, currentTime + 0.1);
    }

    // Only update if we found a valid index or if we genuinely want to clear it (index -1)
    // AND we are not in a "transition" state where time might be 0 momentarily.
    if (index !== -1 || currentTime > 0.5) {
      const previousIndex = this.currentCueIndex();
      this.currentCueIndex.set(index);
      if (index !== -1 && index !== previousIndex) {
        this.lazyLoadUpcomingCuesIfNeeded(index);
      }
    }
  }

  /**
   * Clear all subtitles and reset state
   */
  clear(): void {
    this.cancelTokenization();
    this.cancelDualSubtitles();
    this.subtitles.set([]);
    this.currentCueIndex.set(-1);
    this.tokenCache.clear(); // Clear old tokens to prevent stale data
    this.cueTranslations.set(new Map());
    this.isDualCached.set(false);
    this.lastLazyLoadedIndex = -1;
    this.pendingBatchStartIdx = -1;
    this.lastDualSubVideoId = null;
    this.lastDualSubSourceLang = null;
    this.lastDualSubTargetLang = null;
    this.lastDualSubFirstCueId = null;
    this.lastDualSubCuesCount = 0;
    this.lastBatchFailureTime = 0;
    this.consecutiveBatchFailures = 0;
    this.requestedLanguage.set(null);
  }

  resetFailureCooldown(): void {
    this.lastBatchFailureTime = 0;
    this.consecutiveBatchFailures = 0;
  }

  // ============================================================================
  // Dual Subtitles API
  // ============================================================================

  setDualSubtitles(enabled: boolean): void {
    this.settings.updateSettings({ showDualSubtitles: enabled });
  }

  toggleDualSubtitles(): boolean {
    const next = !this.settings.settings().showDualSubtitles;
    this.settings.updateSettings({ showDualSubtitles: next });
    return next;
  }

  setDualSubtitleTargetLang(lang: string): void {
    this.settings.setDualSubtitleTargetLang(lang);
  }

  cancelDualSubtitles(): void {
    if (this.dualSubSubscription) {
      this.dualSubSubscription.unsubscribe();
      this.dualSubSubscription = null;
    }
    if (this.lazyLoadSubscription) {
      this.lazyLoadSubscription.unsubscribe();
      this.lazyLoadSubscription = null;
    }
    this.isLazyLoadPending = false;
    this.pendingBatchStartIdx = -1;
    this.pendingBatchEndIdx = -1;
    this.hasPersistedDualToR2 = false;
    this.lastPersistedCueCount = 0;
    this.lastPersistTimestamp = 0;
    this.isTranslatingDual.set(false);
    this.isDualSubLoading.set(false);
  }

  clearDualSubLoadingState(): void {
    this.isTranslatingDual.set(false);
    this.isDualSubLoading.set(false);
    this.isLazyLoadPending = false;
    this.pendingBatchStartIdx = -1;
    this.pendingBatchEndIdx = -1;
  }

  /**
   * Helper to robustly map segments from R2 or IndexedDB cache to runtime SubtitleCue array.
   * Matches by direct index if text/time aligns, otherwise fuzzy matches by timestamp and text.
   */
  private mapSegmentsToCues(
    segments: { text: string; start: number; duration: number; translation?: string }[],
    cues: SubtitleCue[],
    targetMap: Map<string, string>,
    sourceLang: string
  ): { translatedCount: number; hasContent: boolean } {
    let hasContent = false;
    let translatedCount = 0;
    if (!segments || !segments.length || !cues.length) {
      return { translatedCount, hasContent };
    }

    const timeTolerance = 0.8;
    const usedSegmentIndices = new Set<number>();
    const targetLang = this.dualSubtitleTargetLang();

    cues.forEach((cue, cueIdx) => {
      // 1. Try exact index first
      const directSeg = segments[cueIdx];
      let matchedSeg: { text: string; start: number; duration: number; translation?: string } | null = null;
      let matchedIdx = -1;

      if (directSeg && !usedSegmentIndices.has(cueIdx) && directSeg.translation?.trim()) {
        const textMatch = directSeg.text?.trim() === cue.text.trim();
        const timeMatch = Math.abs(directSeg.start - cue.startTime) <= timeTolerance;
        if (textMatch || timeMatch) {
          matchedSeg = directSeg;
          matchedIdx = cueIdx;
        }
      }

      // 2. Search by timestamp proximity for segments with translation
      if (!matchedSeg) {
        for (let i = 0; i < segments.length; i++) {
          if (usedSegmentIndices.has(i)) continue;
          const s = segments[i];
          if (!s || !s.translation?.trim()) continue;
          if (Math.abs(s.start - cue.startTime) <= timeTolerance) {
            matchedSeg = s;
            matchedIdx = i;
            break;
          }
        }
      }

      // 3. Search by exact text match for segments with translation
      if (!matchedSeg) {
        for (let i = 0; i < segments.length; i++) {
          if (usedSegmentIndices.has(i)) continue;
          const s = segments[i];
          if (!s || !s.translation?.trim()) continue;
          if (s.text?.trim() === cue.text.trim()) {
            matchedSeg = s;
            matchedIdx = i;
            break;
          }
        }
      }

      if (matchedSeg && matchedIdx >= 0) {
        usedSegmentIndices.add(matchedIdx);
        const trans = matchedSeg.translation?.trim();
        if (trans && (sourceLang === targetLang || trans !== cue.text.trim())) {
          targetMap.set(cue.id, trans);
          hasContent = true;
          translatedCount++;
        }
      }
    });

    return { translatedCount, hasContent };
  }

  initDualSubtitles(videoId: string, sourceLang: string, targetLang: string, cues: SubtitleCue[]): void {
    if (!videoId || cues.length === 0 || targetLang === sourceLang) {
      this.clearDualSubLoadingState();
      return;
    }

    this.cancelDualSubtitles();
    this.hasPersistedDualToR2 = false;
    this.lastPersistedCueCount = 0;
    this.lastPersistTimestamp = 0;
    this.isTranslatingDual.set(true);
    this.isDualSubLoading.set(true);
    this.dualSubError.set(null);

    // 1. FAST LOCAL CHECK: Check IndexedDB for instant offline-ready bilingual subtitles
    void this.transcriptCache.getDual(videoId, sourceLang, targetLang).then(localSegments => {
      if (this.dualSubtitleTargetLang() !== targetLang) return;
      if (localSegments && localSegments.length > 0) {
        const localMap = new Map(this.cueTranslations());
        const { translatedCount, hasContent } = this.mapSegmentsToCues(localSegments, cues, localMap, sourceLang);
        if (hasContent) {
          this.cueTranslations.set(localMap);
          if (translatedCount >= cues.length) {
            this.isDualCached.set(true);
            this.clearDualSubLoadingState();
          }
        }
      }
    });

    // 2. EDGE CHECK: Check Cloudflare R2 crowd-cache
    this.dualSubSubscription = this.translation.getDualSubtitles(videoId, sourceLang, targetLang, [], true)
      .subscribe({
        next: (translatedSegments) => {
          if (this.dualSubtitleTargetLang() !== targetLang) {
            this.clearDualSubLoadingState();
            return;
          }

          if (translatedSegments && translatedSegments.length > 0) {
            const newMap = new Map(this.cueTranslations());
            const { translatedCount, hasContent } = this.mapSegmentsToCues(translatedSegments, cues, newMap, sourceLang);

            if (hasContent) {
              this.cueTranslations.set(newMap);
              const coverage = cues.length > 0 ? translatedCount / cues.length : 0;
              if (coverage >= 0.8) {
                this.isDualCached.set(true);
              }
              this.clearDualSubLoadingState();
              // Sync R2 cache down to local IndexedDB for future offline playback
              void this.transcriptCache.setDual(videoId, sourceLang, targetLang, translatedSegments);

              // If partial coverage (missing cues), immediately queue recovery for first batch
              if (translatedCount < cues.length) {
                this.lazyLoadUpcomingCues(0);
              }
              return;
            }
          }

          // Cache miss: initiate first batch immediately so user doesn't wait
          this.isDualCached.set(false);
          this.clearDualSubLoadingState();
          this.lastLazyLoadedIndex = -1;
          this.lazyLoadUpcomingCues(0);
        },
        error: (err) => {
          console.error('[SubtitleService] Cache check failed:', err);
          this.isDualCached.set(false);
          this.clearDualSubLoadingState();
          this.lastLazyLoadedIndex = -1;
          // Fall back to immediate lazy batch loading
          this.lazyLoadUpcomingCues(0);
        }
      });
  }

  lazyLoadUpcomingCuesIfNeeded(currentIndex: number): void {
    const showDual = this.settings.settings().showDualSubtitles;
    if (!showDual || currentIndex < 0) {
      return;
    }

    // Exponential backoff after batch failures (15s -> 30s -> 60s) to prevent retry storms during rate limits
    if (this.lastBatchFailureTime > 0) {
      if (this.consecutiveBatchFailures >= 3) {
        return; // Pause automatic background attempts after 3 failures until explicit seek or user action
      }
      const cooldownMs = Math.min(15000 * Math.pow(2, Math.max(0, this.consecutiveBatchFailures - 1)), 60000);
      if (Date.now() - this.lastBatchFailureTime < cooldownMs) {
        return;
      }
    }

    const cues = this.subtitles();
    if (cues.length === 0) return;

    const map = this.cueTranslations();
    const checkIndex = Math.min(cues.length - 1, currentIndex + DUAL_SUB_BUFFER);
    const hasBuffer = checkIndex >= cues.length - 1 || Boolean(map.get(cues[checkIndex]?.id)?.trim());
    const hasCurrent = Boolean(map.get(cues[currentIndex]?.id)?.trim());

    // Both current cue and lookahead buffer have valid translations -> no fetch needed
    if (hasBuffer && hasCurrent) {
      return;
    }

    // If a batch is currently pending, check if the current playback position is far outside it (seek / jump)
    if (this.isLazyLoadPending) {
      const isFarAway = currentIndex < this.pendingBatchStartIdx || currentIndex > this.pendingBatchEndIdx + DUAL_SUB_BUFFER;
      if (isFarAway && !hasCurrent) {
        // Cancel stale pending batch to prioritize the current playback position
        if (this.lazyLoadSubscription) {
          this.lazyLoadSubscription.unsubscribe();
          this.lazyLoadSubscription = null;
        }
        this.clearDualSubLoadingState();
        this.lazyLoadUpcomingCues(currentIndex);
      }
      return;
    }

    this.lazyLoadUpcomingCues(currentIndex);
  }

  lazyLoadUpcomingCues(currentIndex = 0): void {
    if (this.isLazyLoadPending) return;

    const cues = this.subtitles();
    if (cues.length === 0) return;

    const map = this.cueTranslations();
    const sourceLang = this.activeLanguage();
    const targetLang = this.dualSubtitleTargetLang() || 'en';
    const startIdx = Math.max(0, currentIndex);
    const endIdx = Math.min(cues.length - 1, startIdx + DUAL_SUB_BATCH_SIZE - 1);

    // Self-healing: identify cues that are missing or poisoned
    const cuesToTranslate: { id: string, text: string }[] = [];
    for (let i = startIdx; i <= endIdx; i++) {
      const cue = cues[i];
      if (cue) {
        const trans = map.get(cue.id)?.trim();
        if (!trans || (sourceLang !== targetLang && trans === cue.text.trim())) {
          cuesToTranslate.push({ id: cue.id, text: cue.text });
        }
      }
    }

    if (cuesToTranslate.length === 0) {
      this.lastLazyLoadedIndex = endIdx;
      return;
    }

    this.lastLazyLoadedIndex = endIdx;
    this.pendingBatchStartIdx = startIdx;
    this.pendingBatchEndIdx = endIdx;
    this.isLazyLoadPending = true;
    this.isTranslatingDual.set(true);
    this.isDualSubLoading.set(true);

    const texts = cuesToTranslate.map(c => c.text);

    if (this.lazyLoadSubscription) {
      this.lazyLoadSubscription.unsubscribe();
    }

    this.lazyLoadSubscription = this.translation.translateBatch(texts, sourceLang, targetLang).subscribe({
      next: (translations) => {
        if (this.dualSubtitleTargetLang() !== targetLang) {
          this.clearDualSubLoadingState();
          return;
        }

        this.clearDualSubLoadingState();
        this.lastBatchFailureTime = 0;
        this.consecutiveBatchFailures = 0;
        const newMap = new Map(this.cueTranslations());

        translations.forEach((trans, i) => {
          const cue = cuesToTranslate[i];
          if (!cue) return;
          const trimmedTrans = trans?.trim();
          if (trimmedTrans && (sourceLang === targetLang || trimmedTrans !== cue.text.trim())) {
            newMap.set(cue.id, trimmedTrans);
          }
          // Note: avoid setting empty string in newMap to allow future self-healing retries
        });

        this.cueTranslations.set(newMap);
        this.checkAndPersistDualSubtitles(cues, newMap, sourceLang, targetLang);

        // Pipelining: if video playback progressed during translation or more buffer is needed, trigger next batch
        const currentIdx = this.currentCueIndex();
        if (currentIdx >= 0 && this.settings.settings().showDualSubtitles) {
          this.lazyLoadUpcomingCuesIfNeeded(currentIdx);
        }
      },
      error: (err) => {
        console.error('[SubtitleService] Dual sub lazy load failed:', err);
        this.clearDualSubLoadingState();
        this.lastBatchFailureTime = Date.now();
        this.consecutiveBatchFailures++;
        this.dualSubError.set('Translation failed');
      }
    });
  }

  /**
   * Automatically persist translated dual subtitles to Cloudflare R2 and IndexedDB:
   * 1. Incremental checkpoints during playback (every 10+ newly translated cues, debounced 10s)
   * 2. Self-healing saves when previously missing cues are resolved
   */
  private checkAndPersistDualSubtitles(
    cues: SubtitleCue[],
    map: Map<string, string>,
    sourceLang: string,
    targetLang: string
  ): void {
    if (cues.length === 0) {
      return;
    }

    const translatedCount = cues.filter(c => {
      const val = map.get(c.id);
      return val && val.trim().length > 0;
    }).length;
    const coverage = cues.length > 0 ? translatedCount / cues.length : 0;

    const newCuesSinceLastSave = translatedCount - this.lastPersistedCueCount;
    const isFullSave = coverage >= 0.8 && (!this.hasPersistedDualToR2 || newCuesSinceLastSave >= 10);
    const isIncrementalCheckpoint = (newCuesSinceLastSave >= 10) && (Date.now() - this.lastPersistTimestamp >= 10000);

    if (isFullSave || isIncrementalCheckpoint) {
      this.lastPersistedCueCount = translatedCount;
      this.lastPersistTimestamp = Date.now();
      if (coverage >= 0.8) {
        this.hasPersistedDualToR2 = true;
        this.isDualCached.set(true);
      }

      const videoId = this.lastDualSubVideoId || this.youtube.currentVideo()?.id;
      if (!videoId) return;

      const segments = cues.map(c => ({
        text: c.text,
        start: c.startTime,
        duration: c.endTime - c.startTime,
        translation: map.get(c.id) || ''
      }));

      // 1. Save to local IndexedDB for immediate offline availability
      void this.transcriptCache.setDual(videoId, sourceLang, targetLang, segments);

      // 2. Persist to Cloudflare R2 crowd-cache (Zero KV writes - Rule 2)
      this.translation.saveDualSubtitles(videoId, sourceLang, targetLang, segments).subscribe({
        next: (saved) => {
          if (saved && coverage >= 0.8) {
            this.isDualCached.set(true);
          }
        }
      });
    }
  }

  // ============================================================================
  // Private: Tokenization
  // ============================================================================

  private async batchTokenize(texts: string[], lang: string, videoId?: string): Promise<Token[][]> {
    const signal = this.abortController?.signal;

    // Circuit breaker: If recently rate-limited, skip network calls and use local fallback
    if (Date.now() < this.rateLimitedUntil) {
      console.warn('[SubtitleService] Rate limit active, using local tokenization fallback');
      return texts.map(text => this.fallbackTokenize(text, lang as 'ja' | 'zh' | 'ko' | 'en' | null));
    }

    // Try batch endpoint first (requires videoId)
    if (videoId) {
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json'
        };

        // Attach PocketBase auth token if available to elevate user's rate limit tier
        const authToken = this.pocketbase.getToken();
        if (authToken) {
          headers['Authorization'] = `Bearer ${authToken}`;
        }

        const response = await fetch(`${environment.api.tokenizeBatch}/${lang}`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ texts, videoId }),
          signal
        });

        // If rate limited, activate circuit breaker and fall back to local tokenization
        if (response.status === 429) {
          const retryAfterSec = parseInt(response.headers.get('Retry-After') || '60', 10);
          this.rateLimitedUntil = Date.now() + Math.max(30, retryAfterSec) * 1000;
          console.warn(`[SubtitleService] Tokenize rate limit hit (429). Circuit breaker enabled for ${retryAfterSec}s. Using local fallback.`);
          return texts.map(text => this.fallbackTokenize(text, lang as 'ja' | 'zh' | 'ko' | 'en' | null));
        }

        if (response.ok) {
          const data = await response.json();
          if (data.tokens && Array.isArray(data.tokens)) {
            return data.tokens;
          }
        } else {
          const errText = await response.text().catch(() => '');
          console.warn(`[SubtitleService] Batch tokenize returned HTTP ${response.status}: ${errText}`);
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') throw error;
        console.warn('[SubtitleService] Batch tokenize failed, using local fallback:', error);
      }
    }

    // Fallback: use local tokenization (no API calls = no rate limit issues)
    // This is less accurate than server-side kuromoji for Japanese,
    // but prevents exhausting user's rate limit
    console.log('[SubtitleService] Using local fallback tokenization');
    return texts.map(text => this.fallbackTokenize(text, lang as 'ja' | 'zh' | 'ko' | 'en' | null));
  }



  private fallbackTokenize(text: string, lang: 'ja' | 'zh' | 'ko' | 'en' | null): Token[] {
    if (!text.trim()) return [];

    switch (lang) {
      case 'zh': {
        if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
          const segmenter = new Intl.Segmenter('zh', { granularity: 'word' });
          return Array.from(segmenter.segment(text)).map(seg => ({
            surface: seg.segment,
            isPunctuation: isPunctuation(seg.segment)
          }));
        }
        return text.split('').map(char => ({
          surface: char,
          isPunctuation: isPunctuation(char)
        }));
      }
      case 'ko': {
        if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
          const segmenter = new Intl.Segmenter('ko', { granularity: 'word' });
          return Array.from(segmenter.segment(text)).map(seg => ({
            surface: seg.segment,
            isPunctuation: isPunctuation(seg.segment)
          }));
        }
        return text.split(/\s+/).filter(Boolean).map(word => ({
          surface: word,
          isPunctuation: isPunctuation(word)
        }));
      }
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
      const type = getCharType(char);

      if (type !== currentType && current) {
        tokens.push(this.buildFallbackJapaneseToken(current));
        current = '';
      }

      current += char;
      currentType = type;
    }

    if (current) {
      tokens.push(this.buildFallbackJapaneseToken(current));
    }

    return tokens;
  }

  private buildFallbackJapaneseToken(surface: string): Token {
    const isPunct = isPunctuation(surface);
    const token: Token = {
      surface,
      isPunctuation: isPunct
    };

    if (!isPunct && isJapaneseKanaText(surface)) {
      token.romanization = getJapaneseRomaji(surface, surface);
    }

    return token;
  }

  private applyFallbackTokens(startIdx: number, endIdx: number, lang: 'ja' | 'zh' | 'ko' | 'en' | null): void {
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
   * Schedule saving tokens to localStorage
   */
  private scheduleTokenSave(videoId: string, lang: string): void {
    if (this.tokenSaveTimer) {
      clearTimeout(this.tokenSaveTimer);
    }

    this.pendingSaveArgs = { videoId, lang };

    this.tokenSaveTimer = setTimeout(() => {
      this.saveTokensForVideo(videoId, lang);
    }, 5000); // 5 seconds debounce
  }

  /**
   * Save tokens for a video to localStorage
   */
  saveTokensForVideo(videoId: string, lang: string): void {
    if (!videoId) return;

    this.tokenSaveTimer = null;
    this.pendingSaveArgs = null;

    try {
      const stored = this.getStoredTokens();
      const prefix = `${lang}:`;

      // Collect tokens for this video's cues specifically (prevent session cache bleed)
      const videoTokens: Record<string, Token[]> = {};
      let count = 0;

      const cues = this.subtitles();
      for (const cue of cues) {
        const key = `${prefix}${cue.text}`;
        if (cue.tokens && cue.tokens.length > 0) {
          if (!videoTokens[key]) {
            videoTokens[key] = cue.tokens;
            count++;
          }
        } else {
          const cached = this.tokenCache.get(key);
          if (cached && !videoTokens[key]) {
            videoTokens[key] = cached;
            count++;
          }
        }
      }

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
          // Patch legacy tokens that don't have isPunctuation flag
          const patchedTokens = (tokens as Token[]).map(t => {
            if (t.isPunctuation === undefined) {
              return { ...t, isPunctuation: isPunctuation(t.surface) };
            }
            return t;
          });
          this.tokenCache.set(key, patchedTokens);
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
}
