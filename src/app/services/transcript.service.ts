import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map, switchMap, finalize, tap, shareReplay, timer } from 'rxjs';
import { SubtitleCue } from '../models';

// ============================================================================
// Types
// ============================================================================

interface TranscriptSegment {
  text: string;
  start: number;
  duration: number;
}

interface CaptionTrack {
  languageCode: string;
  name: { simpleText: string };
  baseUrl: string;
  content?: TranscriptSegment[];
}

interface InnertubeResponse {
  videoDetails?: { title: string; author: string; videoId: string };
  captions?: {
    playerCaptionsTracklistRenderer: {
      captionTracks: CaptionTrack[];
    };
  };
  source?: string;
  error?: string;
  warning?: string;
}

interface CachedTranscript {
  cues: SubtitleCue[];
  availableLanguages: string[];
  source: 'youtube' | 'ai';
}

// ============================================================================
// Service
// ============================================================================

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {
  // State
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly availableLanguages = signal<string[]>([]);
  readonly isGeneratingAI = signal(false);
  readonly captionSource = signal<'youtube' | 'ai' | null>(null);

  // Computed
  readonly isBusy = computed(() => this.isLoading() || this.isGeneratingAI());

  // Cache
  private readonly cache = new Map<string, CachedTranscript>();
  private readonly pendingRequests = new Map<string, Observable<SubtitleCue[]>>();

  constructor(private http: HttpClient) { }

  // ============================================================================
  // Public API
  // ============================================================================

  /**
   * Reset all state (call when clearing video)
   */
  reset(): void {
    this.isLoading.set(false);
    this.error.set(null);
    this.isGeneratingAI.set(false);
    this.captionSource.set(null);
    this.availableLanguages.set([]);
    this.pendingRequests.clear();
  }

  /**
   * Fetch transcript for a video
   * Tries backend first, falls back to Whisper AI
   */
  fetchTranscript(videoId: string, lang: string = 'ja'): Observable<SubtitleCue[]> {
    const cacheKey = `${videoId}:${lang}`;

    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached) {
      this.restoreFromCache(cached);
      return of(cached.cues);
    }

    this.isLoading.set(true);
    this.error.set(null);
    this.captionSource.set(null);

    return this.fetchFromBackend(videoId, lang, false).pipe(
      switchMap(result => {
        if (result.cues.length > 0) {
          return of(result.cues);
        }

        // Retry with force refresh if response was invalid
        if (!result.validResponse) {
          return this.fetchFromBackend(videoId, lang, true).pipe(
            switchMap(retry =>
              retry.cues.length > 0
                ? of(retry.cues)
                : this.generateWithWhisper(videoId)
            )
          );
        }

        // Valid response but no captions - use Whisper
        return this.generateWithWhisper(videoId);
      }),
      tap(cues => {
        if (cues.length > 0 && this.captionSource() === 'youtube') {
          this.saveToCache(cacheKey, cues, 'youtube');
        }
      }),
      catchError(err => {
        console.error('[TranscriptService] Error:', err.message);
        return this.generateWithWhisper(videoId);
      }),
      finalize(() => this.isLoading.set(false))
    );
  }

  /**
   * Generate transcript using Whisper AI
   */
  generateWithWhisper(videoId: string, resultUrl?: string): Observable<SubtitleCue[]> {
    const cacheKey = `whisper:${videoId}`;

    // Check cache
    const cached = this.cache.get(cacheKey);
    if (!resultUrl && cached) {
      this.restoreFromCache(cached);
      return of(cached.cues);
    }

    // Check pending request
    if (!resultUrl && this.pendingRequests.has(videoId)) {
      return this.pendingRequests.get(videoId)!;
    }

    this.isLoading.set(false);
    this.isGeneratingAI.set(true);
    this.error.set(null);

    const request$ = this.http.post<any>('/api/whisper', {
      videoId,
      ...(resultUrl && { result_url: resultUrl })
    }).pipe(
      switchMap(response => {
        // Handle polling
        if (response.status === 'processing' && response.result_url) {
          console.log('[TranscriptService] AI processing... polling in 4s');
          return timer(4000).pipe(
            switchMap(() => this.generateWithWhisper(videoId, response.result_url))
          );
        }

        if (!response.success || !response.segments?.length) {
          throw new Error(response.error || 'AI transcription failed');
        }

        const cues = this.convertSegmentsToCues(response.segments);
        this.saveToCache(cacheKey, cues, 'ai');
        return of(cues);
      }),
      tap({
        next: () => {
          this.isGeneratingAI.set(false);
          this.captionSource.set('ai');
          this.pendingRequests.delete(videoId);
        },
        error: () => {
          this.isGeneratingAI.set(false);
          this.pendingRequests.delete(videoId);
        }
      }),
      catchError(err => {
        const message = err.error?.error || err.message || 'AI transcription failed';
        this.error.set(message);
        console.error('[TranscriptService] Whisper error:', message);
        return of([]);
      }),
      shareReplay(1)
    );

    if (!resultUrl) {
      this.pendingRequests.set(videoId, request$);
    }

    return request$;
  }

  /**
   * Clear cache for a specific video or all
   */
  clearCache(videoId?: string): void {
    if (videoId) {
      for (const key of this.cache.keys()) {
        if (key.includes(videoId)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  // ============================================================================
  // Private Methods
  // ============================================================================

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

        // Update available languages
        if (tracks.length > 0) {
          this.availableLanguages.set(tracks.map(t => t.languageCode));
        }

        // Find best matching track
        const track = this.findBestTrack(tracks, lang);
        if (!track?.content?.length) {
          return { cues: [], validResponse };
        }

        this.captionSource.set('youtube');
        return { cues: this.convertSegmentsToCues(track.content), validResponse: true };
      }),
      catchError(err => {
        console.error('[TranscriptService] Backend error:', err);
        return of({ cues: [], validResponse: false });
      })
    );
  }

  private findBestTrack(tracks: CaptionTrack[], lang: string): CaptionTrack | undefined {
    return (
      tracks.find(t => t.languageCode === lang) ||
      tracks.find(t => t.languageCode?.startsWith(lang)) ||
      tracks[0]
    );
  }

  private convertSegmentsToCues(segments: TranscriptSegment[]): SubtitleCue[] {
    return segments.map((segment, index) => {
      // Sticky timing: extend to next segment's start
      const endTime = index < segments.length - 1
        ? segments[index + 1].start
        : Math.max(segment.start + segment.duration, segment.start + 3);

      return {
        id: index,
        startTime: segment.start,
        endTime,
        text: segment.text.trim()
      };
    });
  }

  private saveToCache(key: string, cues: SubtitleCue[], source: 'youtube' | 'ai'): void {
    this.cache.set(key, {
      cues,
      availableLanguages: this.availableLanguages(),
      source
    });
  }

  private restoreFromCache(cached: CachedTranscript): void {
    this.captionSource.set(cached.source);
    this.availableLanguages.set(cached.availableLanguages);
  }
}