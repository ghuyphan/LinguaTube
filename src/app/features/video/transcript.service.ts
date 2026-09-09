import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject, from, catchError, switchMap, finalize, tap, shareReplay, timer, takeUntil } from 'rxjs';
import { SubtitleCue } from '../../models';
import { TranscriptCacheService } from '../../services/transcript-cache.service';
import { AuthService } from '../../core/services/auth.service';
import { VideoRecommendationService } from '../../core/services/video-recommendation.service';
import { environment } from '../../../environments/environment';

// ============================================================================
// Types
// ============================================================================

interface TranscriptSegment {
  id?: number;
  text: string;
  start: number;
  duration: number;
}

interface TranscriptResponse {
  success: boolean;
  videoId: string;
  language: string;
  requestedLanguage: string;
  segments: TranscriptSegment[];
  source: 'cache' | 'native' | 'ai' | 'none';
  sourceDetail?: string;
  availableLanguages: {
    native: string[];
    ai: string[];
  };
  subLanguages?: string[];
  levels?: Record<string, string>;
  whisperAvailable: boolean;
  // Diamond system
  diamonds?: number;
  maxDiamonds?: number;
  nextRegenAt?: number | null;
  regenIntervalMs?: number;
  // Other
  warning?: string;
  error?: string;
  errorCode?: string;
  retryAfter?: number;
  status?: 'processing';
  resultUrl?: string;
  timing: number;
}

export interface DiamondStatusResponse {
  success: boolean;
  diamonds: number;
  maxDiamonds: number;
  nextRegenAt: number | null;
  regenIntervalMs?: number;
  tier?: 'free' | 'pro' | 'premium';
  maxVideoDurationSec?: number;
}

interface RateLimitErrorResponse {
  error: string;
  retryAfter?: number;
}

/**
 * Transcript state machine - single source of truth for UI
 */
export type TranscriptState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'generating_ai'; resultUrl?: string; isResuming?: boolean }
  | { status: 'complete'; language: string; source: 'native' | 'ai'; cues: SubtitleCue[] }
  | { status: 'error'; code: string; whisperAvailable: boolean; retryAfter?: number };

const DEBUG = false;
const log = (...args: unknown[]) => DEBUG && console.log('[TranscriptService]', ...args);

// Timing constants
const MIN_CUE_DURATION = 0.5;
const MAX_CUE_DURATION = 10;

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {
  private http = inject(HttpClient);
  private persistentCache = inject(TranscriptCacheService);
  private auth = inject(AuthService);
  private videoRecommendation = inject(VideoRecommendationService);

  // ============================================================================
  // State (Simplified - single state signal)
  // ============================================================================

  /** Main state signal - single source of truth */
  readonly state = signal<TranscriptState>({ status: 'idle' });

  /** Available languages from server */
  readonly availableLanguages = signal<{ native: string[]; ai: string[] }>({ native: [], ai: [] });

  /** Verified server subtitle languages (sub_languages in D1/R2) */
  readonly subLanguages = signal<string[]>([]);

  /** Verified proficiency levels from D1 server (e.g. { ja: 'JLPT N4' }) */
  readonly serverLevels = signal<Record<string, string>>({});

  /** Fallback info when server returned different language than requested */
  readonly fallbackInfo = signal<{ requested: string; returned: string } | null>(null);

  /** Diamond credit system - Multi-Tier Support */
  readonly diamonds = signal(3);
  readonly maxDiamonds = signal(3);
  readonly nextRegenAt = signal<number | null>(null);
  readonly regenIntervalMs = signal<number>(20 * 60 * 1000);
  readonly userTier = signal<string>('anonymous');
  readonly maxVideoDurationSec = signal<number>(600);
  readonly isDiamondLoading = signal(false);

  // Computed helpers for UI
  readonly status = computed(() => this.state().status);
  readonly isLoading = computed(() => this.state().status === 'loading');
  readonly isGeneratingAI = computed(() => this.state().status === 'generating_ai');
  readonly isResumingPendingJob = computed(() => {
    const s = this.state();
    return s.status === 'generating_ai' && s.isResuming === true;
  });
  readonly isBusy = computed(() => this.isLoading() || this.isGeneratingAI());
  readonly isComplete = computed(() => this.state().status === 'complete');
  readonly hasError = computed(() => this.state().status === 'error');

  readonly cues = computed(() => {
    const s = this.state();
    return s.status === 'complete' ? s.cues : [];
  });

  readonly captionSource = computed(() => {
    const s = this.state();
    return s.status === 'complete' ? s.source : null;
  });

  readonly detectedLanguage = computed(() => {
    const s = this.state();
    return s.status === 'complete' ? s.language : null;
  });

  readonly error = computed(() => {
    const s = this.state();
    return s.status === 'error' ? s.code : null;
  });

  readonly retryAfter = computed(() => {
    const s = this.state();
    return s.status === 'error' ? s.retryAfter : undefined;
  });

  readonly whisperAvailable = computed(() => {
    const s = this.state();
    return s.status === 'error' ? s.whisperAvailable : true;
  });

  // ============================================================================
  // Private State
  // ============================================================================

  private readonly transcriptCache = new Map<string, SubtitleCue[]>();
  private readonly pendingRequests = new Map<string, Observable<SubtitleCue[]>>();
  private cancelSubject = new Subject<void>();

  constructor() {
    this.refreshDiamonds();
    this.auth.loginEvent.subscribe(() => this.refreshDiamonds());
    this.auth.logoutEvent.subscribe(() => this.refreshDiamonds());
  }

  /**
   * Fetch current diamond status from /api/diamonds
   */
  fetchDiamonds(): Observable<DiamondStatusResponse> {
    this.isDiamondLoading.set(true);
    return this.http.get<DiamondStatusResponse>('/api/diamonds').pipe(
      tap((res) => {
        if (res && res.success) {
          this.diamonds.set(res.diamonds);
          this.maxDiamonds.set(res.maxDiamonds);
          this.nextRegenAt.set(res.nextRegenAt);
          if (res.regenIntervalMs) {
            this.regenIntervalMs.set(res.regenIntervalMs);
          }
          if (res.tier) {
            this.userTier.set(res.tier);
          }
          if (res.maxVideoDurationSec) {
            this.maxVideoDurationSec.set(res.maxVideoDurationSec);
          }
        }
        this.isDiamondLoading.set(false);
      }),
      catchError((err) => {
        log('Failed to fetch diamonds:', err);
        this.isDiamondLoading.set(false);
        return of({
          success: false,
          diamonds: this.diamonds(),
          maxDiamonds: this.maxDiamonds(),
          nextRegenAt: this.nextRegenAt(),
          regenIntervalMs: this.regenIntervalMs()
        });
      })
    );
  }

  /**
   * Refresh diamonds (e.g. called when countdown expires or dialog opens)
   */
  refreshDiamonds(): void {
    this.fetchDiamonds().subscribe();
  }

  // ============================================================================
  // Public Methods
  // ============================================================================

  /**
   * Fetch transcript for a video - main entry point
   * Uses the unified /api/transcript endpoint
   * 
   * Cache strategy:
   * 1. Check in-memory cache (current session)
   * 2. Check IndexedDB (persistent across sessions)
   * 3. Fetch from API (network)
   */
  fetchTranscript(
    videoId: string,
    lang: string = 'ja',
    duration?: number,
    title?: string,
    channel?: string,
    forceRefresh = false
  ): Observable<SubtitleCue[]> {
    const cacheKey = `${videoId}:${lang}`;

    // 1. Check client-side memory cache first (fastest) - only if not forceRefresh
    if (!forceRefresh && this.transcriptCache.has(cacheKey)) {
      const cached = this.transcriptCache.get(cacheKey)!;
      const isDevMock = cached.some(c => c.text?.includes('LinguaTubeへようこそ') || c.text?.includes('Vocaへようこそ') || c.text?.includes('LinguaTube') || c.text?.includes('Voca, your'));
      if (isDevMock && videoId !== 'demo' && videoId !== 'test') {
        this.transcriptCache.delete(cacheKey);
      } else {
        log('Memory cache hit:', { videoId, lang, cues: cached.length });
        if (cached.length === 0) {
          this.state.set({
            status: 'error',
            code: 'NO_SUBTITLES',
            whisperAvailable: this.whisperAvailable()
          });
          return of([]);
        }
        this.state.set({ status: 'complete', language: lang, source: 'native', cues: cached });
        return of(cached);
      }
    }

    // 2. Check IndexedDB persistent cache - only if not forceRefresh
    const persistentCheck$ = forceRefresh
      ? of(null)
      : from(this.persistentCache.get(videoId, lang));

    return persistentCheck$.pipe(
      switchMap(cachedData => {
        const isDevMock = cachedData?.cues?.some(c => c.text?.includes('LinguaTubeへようこそ') || c.text?.includes('Vocaへようこそ') || c.text?.includes('LinguaTube') || c.text?.includes('Voca, your'));
        if (cachedData && (!isDevMock || videoId === 'demo' || videoId === 'test')) {
          log('IndexedDB cache hit:', { videoId, lang, cues: cachedData.cues.length });
          // Populate memory cache too
          this.transcriptCache.set(cacheKey, cachedData.cues);
          this.state.set({
            status: 'complete',
            language: cachedData.language,
            source: cachedData.source,
            cues: cachedData.cues
          });
          return of(cachedData.cues);
        }
        if (isDevMock) {
          this.persistentCache.delete(videoId, lang);
        }

        // 3. Fetch from API
        log('Cache miss, fetching from API:', { videoId, lang, forceRefresh });
        this.state.set({ status: 'loading' });
        this.fallbackInfo.set(null);

        return this.callTranscriptAPI(videoId, lang, false, undefined, undefined, duration, title, channel, forceRefresh).pipe(
          takeUntil(this.cancelSubject),
          tap(cues => {
            if (cues.length > 0) {
              // Save to memory cache (using detected language, not requested)
              const detectedLang = this.detectedLanguage() || lang;
              const actualCacheKey = `${videoId}:${detectedLang}`;
              this.transcriptCache.set(actualCacheKey, cues);
              // Save to IndexedDB with actual detected language (fire-and-forget)
              const source = this.captionSource() || 'native';
              this.persistentCache.set(videoId, detectedLang, cues, source).catch(() => { });
            } else if (!forceRefresh) {
              // Negative caching: remember this video has no native transcripts
              this.transcriptCache.set(cacheKey, []);
            }
          }),
          catchError(err => this.handleHttpError(err))
        );
      })
    );
  }

  /**
   * Generate transcript using AI (Whisper/Gladia)
   */
  generateWithAI(
    videoId: string,
    lang: string = 'ja',
    resultUrl?: string,
    turnstileToken?: string,
    duration?: number,
    title?: string,
    channel?: string
  ): Observable<SubtitleCue[]> {
    const cacheKey = `${videoId}:${lang}`;

    // If we're polling (resultUrl exists), mark as resuming
    this.state.set({
      status: 'generating_ai',
      resultUrl,
      isResuming: !!resultUrl
    });
    this.fallbackInfo.set(null);

    return this.callTranscriptAPI(videoId, lang, true, resultUrl, turnstileToken, duration, title, channel).pipe(
      takeUntil(this.cancelSubject),
      tap(cues => {
        if (cues.length > 0) {
          // Save to memory cache
          this.transcriptCache.set(cacheKey, cues);
          // Save to IndexedDB with AI source (7 day TTL)
          this.persistentCache.set(videoId, lang, cues, 'ai').catch(() => { });
        }
      }),
      catchError(err => this.handleHttpError(err, false))
    );
  }

  /**
   * Reset all state and cancel in-flight requests
   */
  reset(): void {
    this.cancelSubject.next();
    this.state.set({ status: 'idle' });
    this.availableLanguages.set({ native: [], ai: [] });
    this.subLanguages.set([]);
    this.serverLevels.set({});
    this.fallbackInfo.set(null);
    this.pendingRequests.clear();
  }

  /**
   * Clear transcript cache (both memory and IndexedDB)
   */
  clearCache(videoId?: string): void {
    if (videoId) {
      for (const key of this.transcriptCache.keys()) {
        if (key.startsWith(videoId)) {
          this.transcriptCache.delete(key);
        }
      }
      // Also clear from IndexedDB
      this.persistentCache.clearVideo(videoId).catch(() => { });
    } else {
      this.transcriptCache.clear();
      // Note: Don't clear all IndexedDB here - use pruneExpired() for maintenance
    }
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.transcriptCache.size,
      keys: Array.from(this.transcriptCache.keys())
    };
  }

  // ============================================================================
  // Private Methods
  // ============================================================================

  /**
   * Handle HTTP errors with specific handling for rate limits
   */
  private handleHttpError(err: unknown, whisperAvailable = true): Observable<SubtitleCue[]> {
    console.error('[TranscriptService] Error:', err);

    if (err instanceof HttpErrorResponse) {
      // Handle rate limiting (429)
      if (err.status === 429) {
        const body = err.error as RateLimitErrorResponse;
        const retryAfter = body?.retryAfter ?? this.extractRetryAfter(err);

        log('Rate limited, retry after:', retryAfter);

        this.state.set({
          status: 'error',
          code: 'RATE_LIMITED',
          whisperAvailable: false, // Don't show AI button if rate limited
          retryAfter
        });
        return of([]);
      }

      // Handle server errors
      if (err.status >= 500) {
        this.state.set({
          status: 'error',
          code: 'SERVER_ERROR',
          whisperAvailable
        });
        return of([]);
      }

      // Handle client errors (400-499)
      if (err.status >= 400) {
        const errorCode = err.error?.errorCode || 'REQUEST_ERROR';
        const isAIBlocked = errorCode === 'VIDEO_TOO_LONG' || errorCode === 'INSUFFICIENT_DIAMONDS';
        this.state.set({
          status: 'error',
          code: errorCode,
          whisperAvailable: isAIBlocked ? false : (err.error?.whisperAvailable ?? whisperAvailable)
        });
        return of([]);
      }
    }

    // Generic network error
    this.state.set({
      status: 'error',
      code: 'NETWORK_ERROR',
      whisperAvailable
    });
    return of([]);
  }

  /**
   * Extract retry-after from response headers
   */
  private extractRetryAfter(err: HttpErrorResponse): number | undefined {
    const retryHeader = err.headers?.get('Retry-After');
    if (retryHeader) {
      const seconds = parseInt(retryHeader, 10);
      if (!isNaN(seconds)) return seconds;
    }
    return undefined;
  }

  /**
   * Call the unified transcript API
   */
  private callTranscriptAPI(
    videoId: string,
    lang: string,
    preferAI: boolean,
    resultUrl?: string,
    turnstileToken?: string,
    duration?: number,
    title?: string,
    channel?: string,
    forceRefresh?: boolean
  ): Observable<SubtitleCue[]> {

    // Dedup ongoing requests (except for polling)
    const requestKey = `${videoId}:${lang}:${preferAI}:${forceRefresh ? 'refresh' : 'normal'}`;
    if (!resultUrl && this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey)!;
    }

    const request$ = this.http.post<TranscriptResponse>(environment.api.transcript, {
      videoId,
      lang,
      preferAI,
      ...(forceRefresh && { forceRefresh: true }),
      ...(duration !== undefined && duration > 0 && { duration }),
      ...(title && { title }),
      ...(channel && { channel }),
      ...(resultUrl && { resultUrl }),
      ...(turnstileToken && { turnstileToken })
    }).pipe(
      switchMap(response => this.handleResponse(response, videoId, lang, preferAI, duration, title, channel)),
      finalize(() => this.pendingRequests.delete(requestKey)),
      shareReplay(1)
    );

    if (!resultUrl) {
      this.pendingRequests.set(requestKey, request$);
    }

    return request$;
  }

  /**
   * Handle API response and update state
   */
  private handleResponse(
    response: TranscriptResponse,
    videoId: string,
    lang: string,
    _preferAI: boolean,
    duration?: number,
    title?: string,
    channel?: string
  ): Observable<SubtitleCue[]> {

    log('API Response:', response);

    // Update available languages
    this.availableLanguages.set(response.availableLanguages);

    // Update verified server subtitle languages
    if (response.subLanguages && Array.isArray(response.subLanguages) && response.subLanguages.length > 0) {
      this.subLanguages.set(response.subLanguages);
    } else if (response.language) {
      this.subLanguages.set([response.language.split('-')[0].toLowerCase()]);
    }

    // Update server-verified proficiency levels if returned
    if (response.levels && typeof response.levels === 'object') {
      this.serverLevels.set(response.levels);
    }

    // Update diamond info
    if (response.diamonds !== undefined) {
      this.diamonds.set(response.diamonds);
    }
    if (response.maxDiamonds !== undefined) {
      this.maxDiamonds.set(response.maxDiamonds);
    }
    if (response.nextRegenAt !== undefined) {
      this.nextRegenAt.set(response.nextRegenAt);
    }
    if (response.regenIntervalMs !== undefined) {
      this.regenIntervalMs.set(response.regenIntervalMs);
    }

    // Handle processing state (AI job still running)
    if (response.status === 'processing' && response.resultUrl) {
      log('AI processing, polling in 2.5s...');
      this.state.set({ status: 'generating_ai', resultUrl: response.resultUrl });

      return timer(2500).pipe(
        takeUntil(this.cancelSubject),
        switchMap(() => this.generateWithAI(videoId, lang, response.resultUrl, undefined, duration, title, channel))
      );
    }

    // Handle success
    if (response.success && response.segments?.length > 0) {
      const cues = this.convertToSubtitleCues(response.segments);
      const source: 'native' | 'ai' = response.source === 'ai' ? 'ai' : 'native';

      // Clear recommendation cache so newly transcribed videos immediately reflect in the feed
      this.videoRecommendation.clearCache();

      // Track fallback
      if (response.requestedLanguage !== response.language) {
        this.fallbackInfo.set({
          requested: response.requestedLanguage,
          returned: response.language
        });
      }

      this.state.set({
        status: 'complete',
        language: response.language,
        source,
        cues
      });

      return of(cues);
    }

    // Handle error / no content
    const errorCode = response.errorCode || 'NO_SUBTITLES';
    this.state.set({
      status: 'error',
      code: errorCode,
      whisperAvailable: response.whisperAvailable
    });

    return of([]);
  }

  /**
   * Intelligently split overly long run-on speech segments into natural sentence cues
   */
  private splitRunOnSegment(segment: TranscriptSegment): TranscriptSegment[] {
    const text = segment.text?.trim() || '';
    if (!text || segment.duration < 4.5) {
      return [segment];
    }

    // Check if text is long enough to warrant splitting (CJK threshold 40, Latin/other 75)
    const isCJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f\uac00-\ud7af]/.test(text);
    const threshold = isCJK ? 40 : 75;
    if (text.length <= threshold) {
      return [segment];
    }

    // Attempt sentence boundary split
    let parts: string[] = [];
    if (isCJK) {
      // Split on Japanese/Chinese full stops, exclamations, question marks, and newlines
      parts = text.split(/(?<=[。！？!?\n])\s*/).map(p => p.trim()).filter(Boolean);
    } else {
      // Split on English sentence terminators followed by whitespace or newlines
      parts = text.split(/(?<=[.!?\n])\s+/).map(p => p.trim()).filter(Boolean);
    }

    if (parts.length <= 1) {
      return [segment];
    }

    // Calculate proportional duration for each sub-cue based on character length
    const totalChars = parts.reduce((sum, p) => sum + p.length, 0);
    if (totalChars === 0) return [segment];

    const results: TranscriptSegment[] = [];
    let currentStart = segment.start;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const partRatio = part.length / totalChars;
      const partDuration = Math.max(MIN_CUE_DURATION, Math.round((segment.duration * partRatio) * 100) / 100);

      results.push({
        text: part,
        start: currentStart,
        duration: partDuration
      });

      currentStart += partDuration;
    }

    return results;
  }

  /**
   * Convert segments to SubtitleCue with sticky timing and sentence boundary handling
   */
  private convertToSubtitleCues(segments: TranscriptSegment[]): SubtitleCue[] {
    // Flatten segments by splitting run-on sentences if any exist
    const normalizedSegments: TranscriptSegment[] = [];
    for (const seg of segments) {
      normalizedSegments.push(...this.splitRunOnSegment(seg));
    }

    return normalizedSegments.map((segment, index) => {
      let endTime: number;

      if (index < normalizedSegments.length - 1) {
        const nextStart = normalizedSegments[index + 1].start;
        const maxEnd = segment.start + MAX_CUE_DURATION;
        endTime = Math.min(nextStart, maxEnd);
      } else {
        endTime = segment.start + Math.min(segment.duration, MAX_CUE_DURATION);
      }

      if (endTime - segment.start < MIN_CUE_DURATION) {
        endTime = segment.start + MIN_CUE_DURATION;
      }

      return {
        id: crypto.randomUUID(),
        startTime: segment.start,
        endTime,
        text: segment.text.trim()
      };
    });
  }
}
