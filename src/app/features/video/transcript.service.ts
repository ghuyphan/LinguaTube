import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject, from, catchError, switchMap, finalize, tap, shareReplay } from 'rxjs';
import {
  SubtitleCue,
  TranscriptResponse,
  TranscriptSegment,
  DiamondStatusResponse,
  TranscriptState
} from '../../models';
import { TranscriptCacheService } from '../../services/transcript-cache.service';
import { AuthService } from '../../core/services/auth.service';
import { VideoRecommendationService } from '../../core/services/video-recommendation.service';
import { AiJobManagerService } from '../../core/services/ai-job-manager.service';
import { environment } from '../../../environments/environment';

interface RateLimitErrorResponse {
  error: string;
  retryAfter?: number;
}

const DEBUG = false;
const log = (...args: unknown[]) => DEBUG && console.log('[TranscriptService]', ...args);
const MIN_CUE_DURATION = 0.5;

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {
  private http = inject(HttpClient);
  private persistentCache = inject(TranscriptCacheService);
  private auth = inject(AuthService);
  private videoRecommendation = inject(VideoRecommendationService);
  private aiJobManager = inject(AiJobManagerService);

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

  private static readonly MAX_IN_MEMORY_TRANSCRIPTS = 15;
  private readonly transcriptCache = new Map<string, SubtitleCue[]>();
  private readonly pendingRequests = new Map<string, Observable<SubtitleCue[]>>();
  private cancelSubject = new Subject<void>();
  private currentVideoId: string | null = null;

  private setTranscriptCache(key: string, cues: SubtitleCue[]): void {
    if (this.transcriptCache.size >= TranscriptService.MAX_IN_MEMORY_TRANSCRIPTS && !this.transcriptCache.has(key)) {
      const oldestKey = this.transcriptCache.keys().next().value;
      if (oldestKey) this.transcriptCache.delete(oldestKey);
    }
    this.transcriptCache.set(key, cues);
  }

  constructor() {
    this.refreshDiamonds();
    this.auth.loginEvent.subscribe(() => this.refreshDiamonds());
    this.auth.logoutEvent.subscribe(() => this.refreshDiamonds());

    // Listen for AI transcription completions from root AiJobManagerService
    this.aiJobManager.jobCompleted$.subscribe(({ videoId, language, requestedLanguage, languageMismatch, cues, source }) => {
      log('Received AI completion from AiJobManager:', { videoId, language, requestedLanguage, languageMismatch, cueCount: cues.length });
      const cacheKey = `${videoId}:${language}`;
      this.setTranscriptCache(cacheKey, cues);
      if (requestedLanguage && requestedLanguage !== language) {
        this.setTranscriptCache(`${videoId}:${requestedLanguage}`, cues);
        this.fallbackInfo.set({
          requested: requestedLanguage,
          returned: language
        });
      }
      this.persistentCache.set(videoId, language, cues, source).catch(() => {});
      this.videoRecommendation.clearCache();

      if (this.currentVideoId === videoId) {
        this.state.set({
          status: 'complete',
          language,
          requestedLanguage,
          languageMismatch,
          source,
          cues
        });
      }
    });

    // Listen for AI transcription failures
    this.aiJobManager.jobFailed$.subscribe(({ videoId, errorCode }) => {
      if (this.currentVideoId === videoId) {
        this.state.set({
          status: 'error',
          code: errorCode || 'AI_JOB_FAILED',
          whisperAvailable: true
        });
      }
    });

    // Network recovery listener
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
   */
  fetchTranscript(
    videoId: string,
    lang: string = 'ja',
    duration?: number,
    title?: string,
    channel?: string,
    forceRefresh = false
  ): Observable<SubtitleCue[]> {
    this.currentVideoId = videoId;
    const cacheKey = `${videoId}:${lang}`;

    // 0. If there is already an active AI background job for this video, reflect it immediately
    if (!forceRefresh && this.aiJobManager.hasActiveJob(videoId)) {
      const active = this.aiJobManager.getJob(videoId);
      log('Active AI job already running for video:', { videoId, jobId: active?.jobId });
      this.state.set({
        status: 'generating_ai',
        jobId: active?.jobId,
        isResuming: true
      });
      return of([]);
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
          this.setTranscriptCache(cacheKey, cachedData.cues);
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

        return this.callTranscriptAPI(videoId, lang, false, undefined, undefined, undefined, duration, title, channel, forceRefresh).pipe(
          tap(cues => {
            if (cues.length > 0) {
              const detectedLang = this.detectedLanguage() || lang;
              const actualCacheKey = `${videoId}:${detectedLang}`;
              this.setTranscriptCache(actualCacheKey, cues);
              const source = this.captionSource() || 'native';
              this.persistentCache.set(videoId, detectedLang, cues, source).catch(() => { });
            } else if (!forceRefresh) {
              this.setTranscriptCache(cacheKey, []);
            }
          }),
          catchError(err => this.handleHttpError(err))
        );
      })
    );
  }

  /**
   * Generate transcript using AI (Gladia)
   */
  generateWithAI(
    videoId: string,
    lang: string = 'ja',
    jobIdOrResultUrl?: string,
    turnstileToken?: string,
    duration?: number,
    title?: string,
    channel?: string
  ): Observable<SubtitleCue[]> {
    this.currentVideoId = videoId;
    const cacheKey = `${videoId}:${lang}`;

    const isUrl = jobIdOrResultUrl && jobIdOrResultUrl.startsWith('http');
    const jobId = isUrl ? undefined : jobIdOrResultUrl;
    const resultUrl = isUrl ? jobIdOrResultUrl : undefined;

    this.state.set({
      status: 'generating_ai',
      jobId,
      isResuming: Boolean(jobId || resultUrl)
    });
    this.fallbackInfo.set(null);

    return this.callTranscriptAPI(videoId, lang, true, jobId, resultUrl, turnstileToken, duration, title, channel).pipe(
      tap(cues => {
        if (cues.length > 0) {
          const detectedLang = this.detectedLanguage() || lang;
          this.setTranscriptCache(cacheKey, cues);
          if (detectedLang !== lang) {
            this.setTranscriptCache(`${videoId}:${detectedLang}`, cues);
          }
          this.persistentCache.set(videoId, lang, cues, 'ai').catch(() => { });
          if (detectedLang !== lang) {
            this.persistentCache.set(videoId, detectedLang, cues, 'ai').catch(() => { });
          }
        }
      }),
      catchError(err => this.handleHttpError(err, false, videoId))
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
    this.currentVideoId = null;
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
      this.persistentCache.clearVideo(videoId).catch(() => { });
    } else {
      this.transcriptCache.clear();
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

  private handleHttpError(
    err: unknown,
    whisperAvailable = true,
    _videoId?: string
  ): Observable<SubtitleCue[]> {
    console.error('[TranscriptService] Error:', err);

    if (err instanceof HttpErrorResponse) {
      // Rate limit (429)
      if (err.status === 429) {
        const body = err.error as RateLimitErrorResponse;
        const retryAfter = body?.retryAfter ?? this.extractRetryAfter(err);

        this.state.set({
          status: 'error',
          code: 'RATE_LIMITED',
          whisperAvailable: false,
          retryAfter
        });
        return of([]);
      }

      // Server, gateway, and client errors (400-599)
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

    this.state.set({
      status: 'error',
      code: 'NETWORK_ERROR',
      whisperAvailable
    });
    return of([]);
  }

  private extractRetryAfter(err: HttpErrorResponse): number | undefined {
    const retryHeader = err.headers?.get('Retry-After');
    if (retryHeader) {
      const seconds = parseInt(retryHeader, 10);
      if (!isNaN(seconds)) return seconds;
    }
    return undefined;
  }

  private callTranscriptAPI(
    videoId: string,
    lang: string,
    preferAI: boolean,
    jobId?: string,
    resultUrl?: string,
    turnstileToken?: string,
    duration?: number,
    title?: string,
    channel?: string,
    forceRefresh?: boolean
  ): Observable<SubtitleCue[]> {
    const isPolling = Boolean(jobId || resultUrl);
    const requestKey = `${videoId}:${lang}:${preferAI}:${forceRefresh ? 'refresh' : 'normal'}`;

    if (!isPolling && this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey)!;
    }

    const payload: Record<string, unknown> = {
      videoId,
      lang,
      preferAI
    };

    if (forceRefresh) payload['forceRefresh'] = true;
    if (duration !== undefined && duration > 0) payload['duration'] = duration;
    if (title) payload['title'] = title;
    if (channel) payload['channel'] = channel;
    if (jobId) payload['jobId'] = jobId;
    if (resultUrl) payload['resultUrl'] = resultUrl;
    if (turnstileToken) payload['turnstileToken'] = turnstileToken;

    const request$ = this.http.post<TranscriptResponse>(environment.api.transcript, payload).pipe(
      switchMap(response => this.handleResponse(response, videoId, lang, preferAI, title, channel)),
      finalize(() => this.pendingRequests.delete(requestKey)),
      shareReplay(1)
    );

    if (!isPolling) {
      this.pendingRequests.set(requestKey, request$);
    }

    return request$;
  }

  private handleResponse(
    response: TranscriptResponse,
    videoId: string,
    lang: string,
    preferAI: boolean,
    title?: string,
    channel?: string
  ): Observable<SubtitleCue[]> {
    log('API Response:', response);

    // Update available languages
    if (response.availableLanguages) {
      this.availableLanguages.set(response.availableLanguages);
    }

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

    // Scenario A: Job is processing asynchronously in the cloud
    if (response.status === 'processing') {
      const assignedJobId = response.jobId || 'job_' + Date.now();
      log('Job is processing. Registering with AiJobManagerService:', assignedJobId);

      this.aiJobManager.registerJob({
        jobId: assignedJobId,
        videoId,
        language: lang,
        title,
        channel
      });

      this.state.set({
        status: 'generating_ai',
        jobId: assignedJobId
      });

      return of([]);
    }

    // Scenario B: Completed successfully
    if (response.success && response.segments?.length > 0) {
      const cues = this.convertToSubtitleCues(response.segments);
      const source: 'native' | 'ai' = response.source === 'ai' ? 'ai' : 'native';

      this.videoRecommendation.clearCache();

      if (response.requestedLanguage !== response.language) {
        this.fallbackInfo.set({
          requested: response.requestedLanguage,
          returned: response.language
        });
      }

      this.state.set({
        status: 'complete',
        language: response.language,
        requestedLanguage: response.requestedLanguage,
        languageMismatch: response.languageMismatch ?? (response.requestedLanguage !== response.language),
        source,
        cues
      });

      return of(cues);
    }

    // Scenario C: Native captions not found (AI available)
    const errorCode = response.errorCode || 'NO_SUBTITLES';
    this.state.set({
      status: 'error',
      code: errorCode,
      whisperAvailable: response.whisperAvailable
    });

    return of([]);
  }

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
