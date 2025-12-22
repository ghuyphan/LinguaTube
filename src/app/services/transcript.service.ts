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

// Minimum gap between cues to consider them separate (in seconds)
const MIN_CUE_GAP = 0.1;
// Minimum duration for a cue (in seconds)
const MIN_CUE_DURATION = 0.3;

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
   */
  fetchTranscript(videoId: string, lang: string = 'ja'): Observable<SubtitleCue[]> {
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

        if (!result.validResponse) {
          return this.fetchFromBackend(videoId, lang, true).pipe(
            switchMap(retry => {
              if (retry.cues.length > 0) return of(retry.cues);
              return this.generateWithWhisper(videoId);
            })
          );
        }

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

        // Clean and deduplicate before converting
        const cleanedSegments = this.cleanTranscriptSegments(track.content);
        const cues = this.convertToSubtitleCues(cleanedSegments);

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
  generateWithWhisper(videoId: string, resultUrl?: string): Observable<SubtitleCue[]> {
    const cacheKey = `whisper:${videoId}`;

    if (!resultUrl && this.transcriptCache.has(cacheKey)) {
      this.captionSource.set('ai');
      return of(this.transcriptCache.get(cacheKey)!);
    }

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
        if (response.status === 'processing' && response.result_url) {
          console.log('[TranscriptService] AI processing... polling in 4s');
          return timer(4000).pipe(
            switchMap(() => this.generateWithWhisper(videoId, response.result_url))
          );
        }

        if (!response.success || !response.segments?.length) {
          throw new Error(response.error || 'AI transcription failed');
        }

        // Clean Whisper output too
        const cleanedSegments = this.cleanTranscriptSegments(response.segments);
        const cues = this.convertToSubtitleCues(cleanedSegments);

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

  // ============================================================================
  // Transcript Cleaning & Deduplication
  // ============================================================================

  /**
   * Clean transcript segments:
   * 1. Remove duplicates at same timestamp
   * 2. Merge overlapping segments
   * 3. Remove very short/empty segments
   * 4. Sort by start time
   */
  private cleanTranscriptSegments(segments: TranscriptSegment[]): TranscriptSegment[] {
    if (!segments?.length) return [];

    // Step 1: Sort by start time
    const sorted = [...segments].sort((a, b) => a.start - b.start);

    // Step 2: Group segments at same/very close timestamps
    const grouped = this.groupByTimestamp(sorted);

    // Step 3: Pick best segment from each group & merge overlaps
    const cleaned = this.mergeGroups(grouped);

    // Step 4: Filter out invalid segments
    return cleaned.filter(seg =>
      seg.text.trim().length > 0 &&
      seg.duration >= MIN_CUE_DURATION
    );
  }

  /**
   * Group segments that start at the same time (within MIN_CUE_GAP)
   */
  private groupByTimestamp(segments: TranscriptSegment[]): TranscriptSegment[][] {
    const groups: TranscriptSegment[][] = [];
    let currentGroup: TranscriptSegment[] = [];
    let groupStart = -1;

    for (const seg of segments) {
      if (groupStart === -1 || Math.abs(seg.start - groupStart) <= MIN_CUE_GAP) {
        currentGroup.push(seg);
        if (groupStart === -1) groupStart = seg.start;
      } else {
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = [seg];
        groupStart = seg.start;
      }
    }

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  }

  /**
   * Pick best segment from each group
   * Priority: longer text, longer duration
   */
  private mergeGroups(groups: TranscriptSegment[][]): TranscriptSegment[] {
    const result: TranscriptSegment[] = [];

    for (const group of groups) {
      if (group.length === 1) {
        result.push(group[0]);
        continue;
      }

      // Multiple segments at same timestamp - pick the best one
      // Score: text length + duration bonus
      const best = group.reduce((a, b) => {
        const scoreA = a.text.trim().length + (a.duration * 10);
        const scoreB = b.text.trim().length + (b.duration * 10);
        return scoreB > scoreA ? b : a;
      });

      // Check if we should merge with previous
      const prev = result[result.length - 1];
      if (prev && this.shouldMerge(prev, best)) {
        // Merge: extend previous segment
        prev.text = this.mergeText(prev.text, best.text);
        prev.duration = Math.max(prev.duration, (best.start - prev.start) + best.duration);
      } else {
        result.push({ ...best });
      }
    }

    return result;
  }

  /**
   * Check if two segments should be merged
   */
  private shouldMerge(prev: TranscriptSegment, curr: TranscriptSegment): boolean {
    // Merge if:
    // 1. Current starts before/at previous end
    // 2. Texts are similar (one contains the other)
    const prevEnd = prev.start + prev.duration;
    const overlaps = curr.start <= prevEnd + MIN_CUE_GAP;

    if (!overlaps) return false;

    // Check text similarity
    const prevText = prev.text.trim();
    const currText = curr.text.trim();

    return prevText.includes(currText) ||
      currText.includes(prevText) ||
      this.textSimilarity(prevText, currText) > 0.7;
  }

  /**
   * Merge two text strings, avoiding duplication
   */
  private mergeText(a: string, b: string): string {
    const textA = a.trim();
    const textB = b.trim();

    // If one contains the other, use the longer one
    if (textA.includes(textB)) return textA;
    if (textB.includes(textA)) return textB;

    // If they're very similar, use the longer one
    if (this.textSimilarity(textA, textB) > 0.7) {
      return textA.length >= textB.length ? textA : textB;
    }

    // Otherwise, keep the first one (already displayed)
    return textA;
  }

  /**
   * Simple text similarity (Jaccard on characters)
   */
  private textSimilarity(a: string, b: string): number {
    if (!a || !b) return 0;

    const setA = new Set(a);
    const setB = new Set(b);

    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);

    return intersection.size / union.size;
  }

  // ============================================================================
  // Conversion
  // ============================================================================

  /**
   * Convert segments to SubtitleCue with sticky timing
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