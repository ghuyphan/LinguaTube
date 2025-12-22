import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map, switchMap, finalize, tap, shareReplay, timer } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {
  // State signals
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly availableLanguages = signal<string[]>([]);
  readonly isGeneratingAI = signal(false);
  readonly captionSource = signal<'youtube' | 'ai' | null>(null);

  // Computed state for UI
  readonly isBusy = computed(() => this.isLoading() || this.isGeneratingAI());

  // Cache
  private readonly transcriptCache = new Map<string, SubtitleCue[]>();
  private readonly pendingRequests = new Map<string, Observable<SubtitleCue[]>>();

  constructor(private http: HttpClient) { }

  /**
   * Reset all state
   */
  reset(): void {
    this.isLoading.set(false);
    this.error.set(null);
    this.isGeneratingAI.set(false);
    this.captionSource.set(null);
    this.pendingRequests.clear();
  }

  /**
   * Main entry point - fetch transcript for a video
   * Backend handles all strategies (Innertube, scrape, third-party)
   * Falls back to Whisper AI if no captions available
   */
  fetchTranscript(videoId: string, lang: string = 'ja'): Observable<SubtitleCue[]> {
    // Check cache first
    const cacheKey = `${videoId}:${lang}`;
    if (this.transcriptCache.has(cacheKey)) {
      const cached = this.transcriptCache.get(cacheKey)!;
      this.captionSource.set('youtube');
      this.availableLanguages.set([lang]);
      return of(cached);
    }

    this.isLoading.set(true);
    this.error.set(null);
    this.captionSource.set(null);

    return this.fetchFromBackend(videoId, lang, false).pipe(
      switchMap(result => {
        if (result.cues.length > 0) {
          return of(result.cues);
        }

        // No content - try force refresh once
        if (!result.validResponse) {
          return this.fetchFromBackend(videoId, lang, true).pipe(
            switchMap(retry => {
              if (retry.cues.length > 0) return of(retry.cues);
              return this.generateWithWhisper(videoId);
            })
          );
        }

        // Valid response but no captions - go to Whisper
        return this.generateWithWhisper(videoId);
      }),
      tap(cues => {
        if (cues.length > 0 && this.captionSource() === 'youtube') {
          this.transcriptCache.set(cacheKey, cues);
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
   * Fetch captions from backend (single API call)
   * Backend handles: Innertube API, watch page scrape, third-party APIs
   */
  private fetchFromBackend(
    videoId: string,
    lang: string,
    forceRefresh: boolean
  ): Observable<{ cues: SubtitleCue[]; validResponse: boolean }> {
    return this.http.post<InnertubeResponse>('/api/innertube', {
      videoId,
      targetLanguages: [lang, 'en'], // Fallback to English
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

        // Find matching track (exact match first, then prefix match)
        const track = tracks.find(t => t.languageCode === lang)
          || tracks.find(t => t.languageCode?.startsWith(lang))
          || tracks[0]; // Fallback to first available

        if (!track?.content?.length) {
          return { cues: [], validResponse };
        }

        this.captionSource.set('youtube');
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
   * Supports polling for long-running transcriptions
   */
  generateWithWhisper(videoId: string, resultUrl?: string): Observable<SubtitleCue[]> {
    const cacheKey = `whisper:${videoId}`;

    // Check cache
    if (!resultUrl && this.transcriptCache.has(cacheKey)) {
      this.captionSource.set('ai');
      return of(this.transcriptCache.get(cacheKey)!);
    }

    // Check pending request
    if (!resultUrl && this.pendingRequests.has(videoId)) {
      return this.pendingRequests.get(videoId)!;
    }

    this.isLoading.set(false); // Switch from loading to generating
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

        const cues: SubtitleCue[] = response.segments.map((seg: any, i: number) => ({
          id: i,
          startTime: seg.start,
          endTime: seg.start + seg.duration,
          text: seg.text.trim()
        }));

        this.transcriptCache.set(cacheKey, cues);
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
   * Convert segments to SubtitleCue with sticky timing
   * Each subtitle stays visible until the next one appears
   */
  private convertToSubtitleCues(segments: TranscriptSegment[]): SubtitleCue[] {
    return segments.map((segment, index) => {
      // Sticky: extend to next segment's start time
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

  /**
   * Clear cache for a specific video or all
   */
  clearCache(videoId?: string): void {
    if (videoId) {
      // Clear all entries for this video
      for (const key of this.transcriptCache.keys()) {
        if (key.includes(videoId)) {
          this.transcriptCache.delete(key);
        }
      }
    } else {
      this.transcriptCache.clear();
    }
  }

  /**
   * Get cache stats (for debugging)
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.transcriptCache.size,
      keys: Array.from(this.transcriptCache.keys())
    };
  }
}