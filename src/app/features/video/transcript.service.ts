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

// Minimum duration for a cue (in seconds)
const MIN_CUE_DURATION = 0.5;

const PENDING_AI_STORAGE_KEY = 'voca_pending_ai_jobs';

export interface StoredPendingJob {
  resultUrl: string;
  lang: string;
  startedAt: number;
}

export function getStoredPendingJob(videoId: string): StoredPendingJob | null {
  try {
    const raw = localStorage.getItem(PENDING_AI_STORAGE_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw);
    const job = map[videoId];
    if (job && Date.now() - job.startedAt < 3600 * 1000) {
      return job;
    }
  } catch {}
  return null;
}

function saveStoredPendingJob(videoId: string, resultUrl: string, lang: string): void {
  try {
    const raw = localStorage.getItem(PENDING_AI_STORAGE_KEY);
    const map = raw ? JSON.parse(raw) : {};
    map[videoId] = { resultUrl, lang, startedAt: Date.now() };
    localStorage.setItem(PENDING_AI_STORAGE_KEY, JSON.stringify(map));
  } catch {}
}

function clearStoredPendingJob(videoId: string): void {
  try {
    const raw = localStorage.getItem(PENDING_AI_STORAGE_KEY);
    if (!raw) return;
    const map = JSON.parse(raw);
    delete map[videoId];
    localStorage.setItem(PENDING_AI_STORAGE_KEY, JSON.stringify(map));
  } catch {}
}

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

  readonly isAIGenerated = computed(() => this.captionSource() === 'ai');

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
  private consecutivePollErrors = 0;

  constructor() {
    this.refreshDiamonds();
    this.auth.loginEvent.subscribe(() => this.refreshDiamonds());
    this.auth.logoutEvent.subscribe(() => this.refreshDiamonds());

    // Listen for online reconnect to recover from transient network failures
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        log('Network restored, checking transcript state...');
        const s = this.state();
        if (s.status === 'error' && s.code === 'NETWORK_ERROR') {
          this.state.set({ status: 'idle' });
        }
      });
    }
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

    // 0. Auto-resume ongoing AI transcription job if user refreshed or navigated away
    if (!forceRefresh) {
      const storedJob = getStoredPendingJob(videoId);
      if (storedJob?.resultUrl) {
        log('Auto-resuming pending AI job from localStorage:', { videoId, resultUrl: storedJob.resultUrl });
        return this.generateWithAI(videoId, storedJob.lang || lang, storedJob.resultUrl, undefined, duration, title, channel);
      }
    }

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

    if (resultUrl) {
      saveStoredPendingJob(videoId, resultUrl, lang);
    }

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
          const detectedLang = this.detectedLanguage() || lang;
          // Save to memory cache for both requested and detected languages
          this.transcriptCache.set(cacheKey, cues);
          if (detectedLang !== lang) {
            this.transcriptCache.set(`${videoId}:${detectedLang}`, cues);
          }
          // Save to IndexedDB with AI source
          this.persistentCache.set(videoId, lang, cues, 'ai').catch(() => { });
          if (detectedLang !== lang) {
            this.persistentCache.set(videoId, detectedLang, cues, 'ai').catch(() => { });
          }
          this.consecutivePollErrors = 0;
        }
      }),
      catchError(err => this.handleHttpError(err, false, videoId, lang, resultUrl, duration, title, channel))
    );
  }

  /**
   * Reset all state and cancel in-flight requests
   */
  reset(): void {
    this.cancelSubject.next();
    this.consecutivePollErrors = 0;
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
   * Handle HTTP errors with specific handling for rate limits and polling retries
   */
  private handleHttpError(
    err: unknown,
    whisperAvailable = true,
    videoId?: string,
    lang?: string,
    resultUrl?: string,
    duration?: number,
    title?: string,
    channel?: string
  ): Observable<SubtitleCue[]> {
    console.error('[TranscriptService] Error:', err);

    // If we were polling an active AI job and hit a transient HTTP error (504 timeout, 502/503/500, network drop)
    if (resultUrl && videoId) {
      const isHttpErr = err instanceof HttpErrorResponse;
      const status = isHttpErr ? err.status : 0;
      const isTransient = status === 0 || status === 408 || status === 500 || status === 502 || status === 503 || status === 504;

      if (isTransient) {
        this.consecutivePollErrors++;
        if (this.consecutivePollErrors < 5) {
          const delay = Math.min(2500 * Math.pow(1.5, this.consecutivePollErrors - 1), 10000);
          console.warn(`[TranscriptService] Polling HTTP glitch (${this.consecutivePollErrors}/5), retrying in ${Math.round(delay)}ms...`);
          return timer(delay).pipe(
            takeUntil(this.cancelSubject),
            switchMap(() => this.generateWithAI(videoId, lang || 'ja', resultUrl, undefined, duration, title, channel))
          );
        }
      }

      this.consecutivePollErrors = 0;
      clearStoredPendingJob(videoId);
    }

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

      // Handle server, gateway, and client errors (400-599)
      if (err.status >= 400) {
        const body = err.error as Partial<TranscriptResponse> | null;
        const errorCode = body?.errorCode || (err.status >= 500 ? 'SERVER_ERROR' : 'REQUEST_ERROR');
        const isAIBlocked = errorCode === 'VIDEO_TOO_LONG' || errorCode === 'INSUFFICIENT_DIAMONDS';
        this.state.set({
          status: 'error',
          code: errorCode,
          whisperAvailable: isAIBlocked ? false : (body?.whisperAvailable ?? whisperAvailable)
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
      switchMap(response => this.handleResponse(response, videoId, lang, preferAI, duration, title, channel, resultUrl)),
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
    channel?: string,
    resultUrl?: string
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
      this.consecutivePollErrors = 0;
      saveStoredPendingJob(videoId, response.resultUrl, lang);
      this.state.set({ status: 'generating_ai', resultUrl: response.resultUrl });

      return timer(2500).pipe(
        takeUntil(this.cancelSubject),
        switchMap(() => this.generateWithAI(videoId, lang, response.resultUrl, undefined, duration, title, channel))
      );
    }

    // Handle success
    if (response.success && response.segments?.length > 0) {
      this.consecutivePollErrors = 0;
      clearStoredPendingJob(videoId);
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

    // If we were polling an AI job and received a non-success response (e.g. transient 500 or timeout)
    if (resultUrl) {
      this.consecutivePollErrors++;
      if (this.consecutivePollErrors < 5) {
        const delay = Math.min(2500 * Math.pow(1.5, this.consecutivePollErrors - 1), 10000);
        console.warn(`[TranscriptService] AI poll response error (${this.consecutivePollErrors}/5), retrying in ${Math.round(delay)}ms...`);
        return timer(delay).pipe(
          takeUntil(this.cancelSubject),
          switchMap(() => this.generateWithAI(videoId, lang, resultUrl, undefined, duration, title, channel))
        );
      }
      this.consecutivePollErrors = 0;
    }

    // Handle error / no content
    clearStoredPendingJob(videoId);
    const errorCode = response.errorCode || 'NO_SUBTITLES';
    this.state.set({
      status: 'error',
      code: errorCode,
      whisperAvailable: response.whisperAvailable
    });

    return of([]);
  }

  /**
   * Convert segments to SubtitleCue (backend has already split run-ons and applied caps)
   */
  private convertToSubtitleCues(segments: TranscriptSegment[]): SubtitleCue[] {
    return segments.map((segment) => {
      const startTime = segment.start || 0;
      const duration = segment.duration || MIN_CUE_DURATION;
      return {
        id: crypto.randomUUID(),
        startTime,
        endTime: Math.round((startTime + duration) * 100) / 100,
        text: segment.text.trim()
      };
    });
  }
}
