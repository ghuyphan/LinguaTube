import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, catchError, map, switchMap, finalize, tap, shareReplay, timer, takeUntil } from 'rxjs';
import { SubtitleCue } from '../../models';
import { YoutubeService } from './youtube.service';

interface TranscriptSegment {
  text: string;
  start: number;
  duration: number;
}

interface CaptionTrack {
  languageCode: string;
  label: string;
  url: string;
  content?: TranscriptSegment[] | null;
}

const DEBUG = false;
const log = (...args: unknown[]) => DEBUG && console.log('[TranscriptService]', ...args);

interface InnertubeResponse {
  videoDetails?: { title: string; author: string; videoId: string };
  captions?: {
    playerCaptionsTracklistRenderer: {
      captionTracks: Array<{
        languageCode: string;
        name: { simpleText: string };
        baseUrl: string;
        content?: TranscriptSegment[];
      }>;
    };
  };
  source?: string;
  error?: string;
  warning?: string;
  // Fallback response fields
  requestedLanguage?: string;
  fallbackLanguage?: string;
  availableLanguages?: string[];
  whisperAvailable?: boolean;
}

// Minimum duration for a cue (in seconds)
const MIN_CUE_DURATION = 0.5;
// Maximum duration for a single cue (prevents overly long sticky subtitles)
const MAX_CUE_DURATION = 10;

export type TranscriptStatus = 'idle' | 'loading' | 'generating_ai' | 'complete' | 'error';

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {
  private http = inject(HttpClient);
  private youtube = inject(YoutubeService); // Inject YoutubeService to get duration

  // State signals
  readonly status = signal<TranscriptStatus>('idle');
  readonly error = signal<string | null>(null);
  readonly availableLanguages = signal<string[]>([]);
  readonly captionSource = signal<'youtube' | 'ai' | null>(null);
  readonly detectedLanguage = signal<string | null>(null);
  readonly isResumingPendingJob = signal(false); // True when resuming an existing AI job

  // Computed state for UI
  readonly isBusy = computed(() => this.status() === 'loading' || this.status() === 'generating_ai');
  readonly isGeneratingAI = computed(() => this.status() === 'generating_ai');
  readonly isLoading = computed(() => this.status() === 'loading');

  // Fallback state - when server returns a different language than requested
  readonly isFallback = signal(false);
  readonly fallbackLanguage = signal<string | null>(null);
  readonly whisperAvailable = signal(false);

  // Cache
  private readonly transcriptCache = new Map<string, { cues: SubtitleCue[], language: string | null, source?: string }>();
  private readonly pendingRequests = new Map<string, Observable<SubtitleCue[]>>();

  // Cancellation
  private cancelSubject = new Subject<void>();

  /**
   * Main entry point - fetch transcript for a video
   */
  fetchTranscript(videoId: string, lang: string = 'ja'): Observable<SubtitleCue[]> {
    const cacheKey = `${videoId}:${lang}`;

    // 1. Check client-side memory cache first
    //    We do NOT have "force refresh" anymore, so we aggressively use cache.
    if (this.transcriptCache.has(cacheKey)) {
      const cached = this.transcriptCache.get(cacheKey)!;
      log('Client cache hit:', { videoId, lang, cues: cached.cues.length });
      this.captionSource.set(cached.source === 'ai' ? 'ai' : 'youtube');
      this.availableLanguages.set([lang]);
      this.detectedLanguage.set(cached.language);
      this.status.set('complete');
      return of(cached.cues);
    }

    this.status.set('loading');
    this.error.set(null);
    this.captionSource.set(null);
    this.isFallback.set(false);
    this.fallbackLanguage.set(null);
    this.whisperAvailable.set(false);

    // 2. Fetch from Backend (InnertubeProxy -> Supadata/Cache)
    return this.fetchFromBackend(videoId, lang).pipe(
      takeUntil(this.cancelSubject),
      tap(() => log('Fetching from backend:', { videoId, lang })),
      switchMap(result => {
        log('Backend result:', {
          cues: result.cues.length,
          validResponse: result.validResponse,
          source: result.source
        });

        // Case A: Success (Native/Supadata or Cache)
        if (result.cues.length > 0) {
          // Case A.1: Real Fallback (Server gave us different language than requested)
          // e.g. Requested JA, got EN. 
          // We should use this but let the user know they can try AI.
          if (result.requestedLanguage && result.requestedLanguage !== result.language) {
            log('Fallback detected:', result.language, 'wanted:', result.requestedLanguage);
            this.isFallback.set(true);
            this.fallbackLanguage.set(result.language || null);
            this.whisperAvailable.set(result.whisperAvailable || false);
          }
          return of(result.cues);
        }

        // Case B: No Transcript Found (Supadata said NO, or D1 said NO)
        // If the server explicitly told us AI is available, we mark it.
        // The UI will then show the "Try AI" button.
        if (result.whisperAvailable) {
          this.whisperAvailable.set(true);

          // Check for "Mismatch" scenario based on metadata
          // If we know other languages exist, we populate them so UI can show
          // "Japanese not found, but English is available"
          if (result.availableLangs && result.availableLangs.length > 0) {
            this.availableLanguages.set(result.availableLangs);
          }
        }

        // Return empty to trigger specific empty/error states in UI
        return of([]);
      }),
      tap(cues => {
        if (cues.length > 0) {
          this.error.set(null);
          this.status.set('complete');

          // Cache success result
          const source = this.captionSource() || 'youtube';
          this.transcriptCache.set(cacheKey, {
            cues,
            language: this.detectedLanguage(),
            source
          });
        } else {
          // If empty, we check if it's a "Wait for User Action" state (Whisper Available)
          // or a hard error.
          if (this.whisperAvailable()) {
            // Not an error, just "Waiting for AI Trigger" state
            // We'll treat it as 'error' state with specific flag for now so UI shows empty state
            // but the UI will see `whisperAvailable()` is true and show the button.
            this.error.set(null); // Clear generic error
            this.status.set('idle'); // Back to idle? Or specific state?
            // Actually, simpler to leave it as 'complete' (but empty) or specific error?
            // Let's use 'error' with specific code 'NO_NATIVE_SUBTITLES'
            this.error.set('NO_NATIVE_SUBTITLES');
            this.status.set('error');
          } else {
            // Genuine hard failure
            if (this.status() !== 'error') {
              this.error.set('No subtitles found');
              this.status.set('error');
            }
          }
        }
      }),
      catchError(err => {
        console.error('[TranscriptService] Error:', err.message);
        this.status.set('error');
        this.error.set(this.normalizeErrorCode(err.message));
        return of([]);
      })
    );
  }

  /**
   * Fetch captions from backend
   */
  private fetchFromBackend(
    videoId: string,
    lang: string
  ): Observable<{
    cues: SubtitleCue[];
    validResponse: boolean;
    language?: string;
    requestedLanguage?: string;
    availableLangs?: string[];
    source?: string;
    whisperAvailable?: boolean;
  }> {
    return this.http.post<InnertubeResponse>('/api/innertube', {
      videoId,
      targetLanguages: [lang],
      // No forceRefresh anymore
    }).pipe(
      map((response: any) => {
        if (response.error) {
          console.warn('[TranscriptService] API error:', response.error);
          return { cues: [], validResponse: false };
        }

        const tracks = response.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
        const validResponse = !!(response.videoDetails || tracks.length > 0);

        // Capture metadata even if no tracks (e.g. negative cache / fallback warning)
        const availableLangs = response.availableLanguages || tracks.map((t: any) => t.languageCode);
        this.availableLanguages.set(availableLangs);

        // Capture fallback info
        const isFallback = response.source === 'fallback';
        const whisperAvailable = response.whisperAvailable || response.source === 'none';

        if (tracks.length > 0) {
          const track = tracks.find((t: any) => t.languageCode === lang)
            || tracks[0]; // If we got a track, it's either the one we wanted OR the fallback returned by strict mode

          if (track?.content?.length) {
            this.captionSource.set('youtube');
            this.detectedLanguage.set(track.languageCode);

            const cues = this.convertToSubtitleCues(track.content);
            return {
              cues,
              validResponse: true,
              language: track.languageCode,
              requestedLanguage: lang,
              source: response.source,
              whisperAvailable
            };
          }
        }

        return {
          cues: [],
          validResponse,
          availableLangs,
          whisperAvailable
        };
      }),
      catchError(err => {
        console.error('[TranscriptService] Backend error:', err);
        return of({ cues: [], validResponse: false });
      })
    );
  }

  /**
   * Generate subtitles using Whisper AI
   */
  generateWithWhisper(videoId: string, resultUrl?: string, lang: string = 'ja', duration?: number): Observable<SubtitleCue[]> {
    const cacheKey = `${videoId}:${lang}`; // Use same cache key format

    if (!resultUrl && this.transcriptCache.has(cacheKey)) {
      // ... (existing cache logic)
      const cached = this.transcriptCache.get(cacheKey)!;
      if (cached.source === 'ai') {
        this.captionSource.set('ai');
        this.status.set('complete');
        this.detectedLanguage.set(cached.language);
        return of(cached.cues);
      }
    }

    // ... (rest of function largely same, just verify cache key consistency)
    // If we're polling (resultUrl exists), we shouldn't use the pending request cache
    if (!resultUrl && this.pendingRequests.has(videoId)) {
      return this.pendingRequests.get(videoId)!;
    }

    // Update status to generating_ai for both initial and polling requests
    this.status.set('generating_ai');
    this.error.set(null);

    // Mark as resuming if we have a result_url to poll
    if (resultUrl) {
      this.isResumingPendingJob.set(true);
    }

    const request$ = this.http.post<any>('/api/whisper', {
      videoId,
      lang, // Include lang for D1 cache lookup
      ...(resultUrl && { result_url: resultUrl }),
      ...(duration && { duration }) // Send duration for validation
    }).pipe(
      takeUntil(this.cancelSubject), // Allow cancellation on reset
      switchMap((response: any) => {
        // Gladia returns result_url for polling
        if (response.status === 'processing' && response.result_url) {
          console.log('[TranscriptService] AI processing... polling in 4s');
          this.status.set('generating_ai'); // Ensure status stays as generating_ai

          return timer(4000).pipe(
            takeUntil(this.cancelSubject), // Cancel polling timer on reset
            switchMap(() => this.generateWithWhisper(videoId, response.result_url, lang))
          );
        }

        if (!response.success || !response.segments?.length) {
          throw new Error(response.error || 'AI transcription failed');
        }

        // Server already cleans segments, just convert to SubtitleCues
        const cues = this.convertToSubtitleCues(response.segments);

        if (response.language) {
          this.detectedLanguage.set(response.language);
        }

        this.transcriptCache.set(cacheKey, {
          cues,
          language: this.detectedLanguage(),
          source: 'ai'
        });
        return of(cues);
      }),
      tap({
        next: () => {
          this.captionSource.set('ai');
          this.status.set('complete');
          this.isResumingPendingJob.set(false);
          this.pendingRequests.delete(videoId);
        },
        error: (err) => {
          this.pendingRequests.delete(videoId);
        }
      }),
      catchError(err => {
        let message = err.error?.error || err.message || 'AI transcription failed';
        message = this.normalizeErrorCode(message);

        this.error.set(message);
        this.status.set('error');
        console.error('[TranscriptService] Whisper error:', message);
        return of([]);
      }),
      shareReplay(1)
    );

    // Only cache the *initial* request (not polling requests)
    if (!resultUrl) {
      this.pendingRequests.set(videoId, request$);
    }

    return request$;
  }

  // Constructor at line 368 can stay or be merged if needed.
  // Actually, I'll remove the entire block of duplicates.
  constructor() { }

  /**
   * Reset all state and cancel in-flight requests
   */
  reset(): void {
    this.cancelSubject.next(); // Cancel in-flight requests
    this.status.set('idle');
    this.error.set(null);
    this.captionSource.set(null);
    this.detectedLanguage.set(null);
    this.availableLanguages.set([]);
    this.isFallback.set(false);
    this.fallbackLanguage.set(null);
    this.whisperAvailable.set(false);
    this.isResumingPendingJob.set(false);
    this.pendingRequests.clear();
  }

  // ... duplicates removed ...

  // ============================================================================
  // Conversion
  // ============================================================================

  /**
   * Convert segments to SubtitleCue with sticky timing
   */
  private convertToSubtitleCues(segments: TranscriptSegment[]): SubtitleCue[] {
    return segments.map((segment, index) => {
      // Calculate end time with sticky behavior but capped at MAX_CUE_DURATION
      let endTime: number;

      if (index < segments.length - 1) {
        // Sticky: extend to next segment's start time, but cap it
        const nextStart = segments[index + 1].start;
        const maxEnd = segment.start + MAX_CUE_DURATION;
        endTime = Math.min(nextStart, maxEnd);
      } else {
        // Last segment: use actual duration capped at MAX_CUE_DURATION
        endTime = segment.start + Math.min(segment.duration, MAX_CUE_DURATION);
      }

      // Ensure minimum duration
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

  // ============================================================================
  // Cache Management
  // ============================================================================

  clearCache(videoId?: string): void {
    if (videoId) {
      for (const key of this.transcriptCache.keys()) {
        if (key.includes(videoId)) {
          this.transcriptCache.delete(key);
        }
      }
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
  // Error Normalization
  // ============================================================================

  /**
   * Normalize error messages to consistent codes for UI handling
   */
  private normalizeErrorCode(message: string): string {
    const errorMap: [RegExp | string, string][] = [
      ['video_too_long', 'VIDEO_TOO_LONG'],
      ['unsupported_language', 'UNSUPPORTED_LANGUAGE'],
      ['unsupported_video_language', 'UNSUPPORTED_VIDEO_LANGUAGE'],
      [/rate.?limit/i, 'RATE_LIMITED'],
      [/timeout/i, 'TIMEOUT'],
      [/gladia.*failed/i, 'AI_SERVICE_ERROR'],
      [/not.?set/i, 'SERVICE_UNAVAILABLE'],
      [/fetch.*failed/i, 'NETWORK_ERROR'],
    ];

    for (const [pattern, code] of errorMap) {
      if (typeof pattern === 'string' ? message === pattern : pattern.test(message)) {
        return code;
      }
    }
    return message;
  }
}