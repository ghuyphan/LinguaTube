import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, catchError, map, switchMap, finalize, tap, shareReplay, timer, takeUntil } from 'rxjs';
import { SubtitleCue } from '../models';

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

const DEBUG = true;
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

  // Cache
  private readonly transcriptCache = new Map<string, SubtitleCue[]>();
  private readonly pendingRequests = new Map<string, Observable<SubtitleCue[]>>();

  // Cancellation
  private cancelSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

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
    this.isResumingPendingJob.set(false);
    this.pendingRequests.clear();
  }

  /**
   * Main entry point - fetch transcript for a video
   */
  fetchTranscript(videoId: string, lang: string = 'ja'): Observable<SubtitleCue[]> {
    const cacheKey = `${videoId}:${lang}`;
    if (this.transcriptCache.has(cacheKey)) {
      const cached = this.transcriptCache.get(cacheKey)!;
      log('Client cache hit:', { videoId, lang, cues: cached.length });
      this.captionSource.set('youtube');
      this.availableLanguages.set([lang]);
      this.status.set('complete');
      return of(cached);
    }

    this.status.set('loading');
    this.error.set(null);
    this.captionSource.set(null);

    return this.fetchFromBackend(videoId, lang, false).pipe(
      takeUntil(this.cancelSubject), // Allow cancellation
      tap(() => log('Fetching from backend:', { videoId, lang })),
      switchMap(result => {
        log('Backend result:', { cues: result.cues.length, validResponse: result.validResponse });
        // Case 1: Success from YouTube
        if (result.cues.length > 0) {
          return of(result.cues);
        }

        // Case 2: Invalid/Empty response -> Retry once with forceRefresh
        if (!result.validResponse) {
          return this.fetchFromBackend(videoId, lang, true).pipe(
            takeUntil(this.cancelSubject),
            switchMap(retry => {
              if (retry.cues.length > 0) return of(retry.cues);
              // Fallback to AI
              return this.generateWithWhisper(videoId, undefined, lang);
            })
          );
        }

        // Case 3: Valid response but no captions -> Fallback to AI directly
        return this.generateWithWhisper(videoId, undefined, lang);
      }),
      tap(cues => {
        if (cues.length > 0) {
          this.error.set(null); // Clear any previous errors
          this.status.set('complete');

          // Only cache 'youtube' source here. 'ai' source is cached in generateWithWhisper
          if (this.captionSource() === 'youtube') {
            this.transcriptCache.set(cacheKey, cues);
          }
        } else {
          // If we got here with empty cues and no error thrown yet
          if (this.status() !== 'error') {
            this.error.set('No subtitles found');
            this.status.set('error');
          }
        }
      }),
      catchError(err => {
        console.error('[TranscriptService] Error:', err.message);
        // Try AI as last resort if not already tried? 
        // Or just let generateWithWhisper handle its own errors?
        // If we are here, it means fetchFromBackend failed completely or generateWithWhisper failed.
        // If generateWithWhisper failed, it already set error state? No, it returns empty array/error.

        // Let's rely on generateWithWhisper to propagate error or empty list.
        this.status.set('error');
        return of([]);
      })
    );
  }

  /**
   * Fetch captions from backend
   */
  private fetchFromBackend(
    videoId: string,
    lang: string,
    forceRefresh: boolean
  ): Observable<{ cues: SubtitleCue[]; validResponse: boolean }> {
    return this.http.post<InnertubeResponse>('/api/innertube', {
      videoId,
      targetLanguages: [lang, 'en'],
      forceRefresh
    }).pipe(
      map(response => {
        if (response.error) {
          console.warn('[TranscriptService] API error:', response.error);
          return { cues: [], validResponse: false };
        }

        const tracks = response.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
        const validResponse = !!(response.videoDetails || tracks.length > 0);

        log('API response:', {
          source: response.source,
          tracks: tracks.length,
          trackLangs: tracks.map(t => t.languageCode),
          hasContent: tracks.map(t => ({ lang: t.languageCode, segments: t.content?.length || 0 }))
        });

        if (tracks.length > 0) {
          this.availableLanguages.set(tracks.map(t => t.languageCode));
        }

        const track = tracks.find(t => t.languageCode === lang)
          || tracks.find(t => t.languageCode?.startsWith(lang))
          || tracks[0];

        if (!track?.content?.length) {
          return { cues: [], validResponse };
        }

        this.captionSource.set('youtube');
        this.detectedLanguage.set(track.languageCode);

        // Server already cleans segments, just convert to SubtitleCues
        const cues = this.convertToSubtitleCues(track.content);

        return { cues, validResponse: true };
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
  generateWithWhisper(videoId: string, resultUrl?: string, lang: string = 'ja'): Observable<SubtitleCue[]> {
    const cacheKey = `whisper:${videoId}:${lang}`;

    if (!resultUrl && this.transcriptCache.has(cacheKey)) {
      this.captionSource.set('ai');
      this.status.set('complete');
      return of(this.transcriptCache.get(cacheKey)!);
    }

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
      ...(resultUrl && { result_url: resultUrl })
    }).pipe(
      takeUntil(this.cancelSubject), // Allow cancellation on reset
      switchMap(response => {
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

        this.transcriptCache.set(cacheKey, cues);
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
          this.status.set('error');
          // Error string set in catchError below
          this.pendingRequests.delete(videoId);
        }
      }),
      catchError(err => {
        const message = err.error?.error || err.message || 'AI transcription failed';
        this.error.set(message);
        this.status.set('error');
        console.error('[TranscriptService] Whisper error:', message);
        return of([]);
      }),
      // Remove finalize as we control status explicitly in tap/catchError
      shareReplay(1)
    );

    // Only cache the *initial* request (not polling requests)
    if (!resultUrl) {
      this.pendingRequests.set(videoId, request$);
    }

    return request$;
  }

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
        id: index,
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
}