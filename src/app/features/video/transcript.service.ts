import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject, from, catchError, switchMap, finalize, tap, shareReplay, timer, takeUntil } from 'rxjs';
import { SubtitleCue } from '../../models';
import { TranscriptCacheService } from '../../services/transcript-cache.service';

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
  whisperAvailable: boolean;
  // Diamond system
  diamonds?: number;
  maxDiamonds?: number;
  nextRegenAt?: number | null;
  // Other
  warning?: string;
  error?: string;
  errorCode?: string;
  status?: 'processing';
  resultUrl?: string;
  timing: number;
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

  // ============================================================================
  // State (Simplified - single state signal)
  // ============================================================================

  /** Main state signal - single source of truth */
  readonly state = signal<TranscriptState>({ status: 'idle' });

  /** Available languages from server */
  readonly availableLanguages = signal<{ native: string[]; ai: string[] }>({ native: [], ai: [] });

  /** Fallback info when server returned different language than requested */
  readonly fallbackInfo = signal<{ requested: string; returned: string } | null>(null);

  /** Diamond credit system - 3 diamonds regenerate over 1 hour */
  readonly diamonds = signal(3);
  readonly maxDiamonds = signal(3);
  readonly nextRegenAt = signal<number | null>(null);

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

  constructor() { }

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
  fetchTranscript(videoId: string, lang: string = 'ja'): Observable<SubtitleCue[]> {
    const cacheKey = `${videoId}:${lang}`;

    // 1. Check client-side memory cache first (fastest)
    if (this.transcriptCache.has(cacheKey)) {
      const cached = this.transcriptCache.get(cacheKey)!;
      log('Memory cache hit:', { videoId, lang, cues: cached.length });
      this.state.set({ status: 'complete', language: lang, source: 'native', cues: cached });
      return of(cached);
    }

    // 2. Check IndexedDB persistent cache
    return from(this.persistentCache.get(videoId, lang)).pipe(
      switchMap(cachedData => {
        if (cachedData) {
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

        // 3. Fetch from API
        log('Cache miss, fetching from API:', { videoId, lang });
        this.state.set({ status: 'loading' });
        this.fallbackInfo.set(null);

        return this.callTranscriptAPI(videoId, lang, false).pipe(
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
  generateWithAI(videoId: string, lang: string = 'ja', resultUrl?: string): Observable<SubtitleCue[]> {
    const cacheKey = `${videoId}:${lang}`;

    // If we're polling (resultUrl exists), mark as resuming
    this.state.set({
      status: 'generating_ai',
      resultUrl,
      isResuming: !!resultUrl
    });
    this.fallbackInfo.set(null);

    return this.callTranscriptAPI(videoId, lang, true, resultUrl).pipe(
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
        this.state.set({
          status: 'error',
          code: errorCode,
          whisperAvailable: err.error?.whisperAvailable ?? whisperAvailable
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
    resultUrl?: string
  ): Observable<SubtitleCue[]> {

    // Dedup ongoing requests (except for polling)
    const requestKey = `${videoId}:${lang}:${preferAI}`;
    if (!resultUrl && this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey)!;
    }

    const request$ = this.http.post<TranscriptResponse>('/api/transcript', {
      videoId,
      lang,
      preferAI,
      ...(resultUrl && { resultUrl })
    }).pipe(
      switchMap(response => this.handleResponse(response, videoId, lang, preferAI)),
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
    preferAI: boolean
  ): Observable<SubtitleCue[]> {

    log('API Response:', response);

    // Update available languages
    this.availableLanguages.set(response.availableLanguages);

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

    // Handle processing state (AI job still running)
    if (response.status === 'processing' && response.resultUrl) {
      log('AI processing, polling in 4s...');
      this.state.set({ status: 'generating_ai', resultUrl: response.resultUrl });

      return timer(4000).pipe(
        takeUntil(this.cancelSubject),
        switchMap(() => this.generateWithAI(videoId, lang, response.resultUrl))
      );
    }

    // Handle success
    if (response.success && response.segments?.length > 0) {
      const cues = this.convertToSubtitleCues(response.segments);
      const source: 'native' | 'ai' = response.source === 'ai' ? 'ai' : 'native';

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
   * Convert segments to SubtitleCue with sticky timing
   */
  private convertToSubtitleCues(segments: TranscriptSegment[]): SubtitleCue[] {
    return segments.map((segment, index) => {
      let endTime: number;

      if (index < segments.length - 1) {
        const nextStart = segments[index + 1].start;
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