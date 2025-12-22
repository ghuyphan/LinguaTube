import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map, switchMap, finalize, tap, shareReplay } from 'rxjs';
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
}

interface InvidiousCaptionResponse {
  captions: Array<{
    label: string;
    languageCode: string;
    url: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class TranscriptService {
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly availableLanguages = signal<string[]>([]);
  readonly isGeneratingAI = signal(false);
  readonly captionSource = signal<'youtube' | 'ai' | null>(null);

  // Cache for generated transcripts to prevent redundant API calls
  private transcriptCache = new Map<string, SubtitleCue[]>();
  // Track ongoing requests to prevent spamming
  private pendingRequests = new Map<string, Observable<SubtitleCue[]>>();

  // Piped instances - most reliable for subtitle fetching
  private readonly PIPED_INSTANCES = [
    '/proxy/piped1'   // proxies to https://pipedapi.kavin.rocks
  ];

  // Invidious instances as fallback
  private readonly INVIDIOUS_INSTANCES = [
    '/proxy/invidious1'  // proxies to https://yewtu.be
  ];

  constructor(private http: HttpClient) { }

  /**
   * Fetch transcript from YouTube video using Invidious API
   * Falls back to Whisper AI transcription if no captions available
   */
  fetchTranscript(videoId: string, lang: string = 'ja'): Observable<SubtitleCue[]> {
    this.isLoading.set(true);
    this.error.set(null);
    this.captionSource.set(null);

    return this.fetchCaptionsFromInvidious(videoId).pipe(
      switchMap(captionTracks => {
        if (!captionTracks || captionTracks.length === 0) {
          throw new Error('No captions available for this video');
        }

        // Find the requested language - do NOT fall back to other languages
        const track = captionTracks.find(t => t.languageCode === lang)
          || captionTracks.find(t => t.languageCode.startsWith(lang));

        if (!track) {
          throw new Error(`No ${lang} captions available`);
        }

        this.availableLanguages.set(captionTracks.map(t => t.languageCode));
        this.captionSource.set('youtube');
        return this.fetchCaptionContent(track.url);
      }),
      map(segments => this.convertToSubtitleCues(segments)),
      catchError(err => {
        // No captions found - fallback to Whisper AI transcription
        return this.generateWithWhisper(videoId);
      })
    );
  }

  /**
   * Fetch caption tracks - Prioritize YouTube Innertube API with retry logic
   * Uses initial delay + exponential backoff to handle YouTube CDN timing issues
   */
  private fetchCaptionsFromInvidious(videoId: string): Observable<CaptionTrack[]> {
    return new Observable<CaptionTrack[]>(observer => {
      const maxRetries = 3; // Reduced from 5 since server now handles retries
      let attempt = 0;

      const tryFetch = () => {
        attempt++;

        this.fetchCaptionsFromYouTube(videoId).subscribe({
          next: (result: { tracks: CaptionTrack[], validResponse: boolean }) => {
            if (result.tracks.length > 0) {
              observer.next(result.tracks);
              observer.complete();
            } else if (result.validResponse) {
              // YouTube confirmed no captions - skip to Whisper
              observer.next([]);
              observer.complete();
            } else if (attempt < maxRetries) {
              // Retry with exponential backoff
              const delay = 1000 * Math.pow(2, attempt - 1);
              setTimeout(tryFetch, delay);
            } else {
              observer.next([]);
              observer.complete();
            }
          },
          error: () => {
            if (attempt < maxRetries) {
              const delay = 1000 * Math.pow(2, attempt - 1);
              setTimeout(tryFetch, delay);
            } else {
              observer.next([]);
              observer.complete();
            }
          }
        });
      };

      // Small initial delay for CDN readiness
      setTimeout(tryFetch, 500);
    });
  }

  /**
   * Try Piped API instances for fetching subtitles
   * @deprecated Disabled to prevent console spam
   */
  private tryPipedFallback(videoId: string, index: number, observer: any, onAllFailed: () => void): void {
    onAllFailed();
  }

  /**
   * Extract caption tracks using YouTube's innertube API
   * Returns { tracks, validResponse } to distinguish "no captions" from "API failure"
   */
  private fetchCaptionsFromYouTube(videoId: string): Observable<{ tracks: CaptionTrack[], validResponse: boolean }> {
    const url = '/api/innertube?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
    const body = {
      context: {
        client: {
          clientName: 'WEB',
          clientVersion: '2.20240905.01.00'
        }
      },
      videoId: videoId
    };

    return this.http.post<any>(url, body).pipe(
      map(response => {
        const hasValidResponse = !!(response?.videoDetails || response?.playabilityStatus);
        const captionTracks = response?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

        if (!captionTracks || captionTracks.length === 0) {
          return { tracks: [], validResponse: hasValidResponse };
        }

        const tracks = captionTracks.map((track: any) => ({
          languageCode: track.languageCode,
          label: track.name?.simpleText || track.languageCode,
          url: track.baseUrl
        }));

        return { tracks, validResponse: true };
      }),
      catchError(() => {
        return of({ tracks: [], validResponse: false });
      })
    );
  }

  /**
   * Parse ytInitialPlayerResponse from YouTube HTML to extract caption URLs
   */
  private extractCaptionTracksFromHTML(html: string): CaptionTrack[] {
    const startMarker = 'ytInitialPlayerResponse = ';
    const startIndex = html.indexOf(startMarker);

    if (startIndex === -1) {
      console.log('[TranscriptService] No ytInitialPlayerResponse found');
      return [];
    }

    try {
      // Find the JSON object boundaries
      let braceCount = 0;
      const jsonStart = startIndex + startMarker.length;
      let jsonEnd = jsonStart;
      let inString = false;
      let escape = false;

      for (let i = jsonStart; i < html.length && i < jsonStart + 500000; i++) {
        const char = html[i];
        if (escape) { escape = false; continue; }
        if (char === '\\' && inString) { escape = true; continue; }
        if (char === '"' && !escape) { inString = !inString; continue; }
        if (!inString) {
          if (char === '{') braceCount++;
          else if (char === '}') {
            braceCount--;
            if (braceCount === 0) { jsonEnd = i + 1; break; }
          }
        }
      }

      if (jsonEnd <= jsonStart) {
        return [];
      }

      const jsonStr = html.substring(jsonStart, jsonEnd);
      const parsed = JSON.parse(jsonStr);
      const captionTracks = parsed?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

      if (!captionTracks || captionTracks.length === 0) {
        console.log('[TranscriptService] No caption tracks in player response');
        return [];
      }

      return captionTracks.map((track: any) => ({
        languageCode: track.languageCode,
        label: track.name?.simpleText || track.languageCode,
        url: track.baseUrl  // Direct YouTube URL - needs proxy rewrite
      }));
    } catch (err) {
      console.error('[TranscriptService] Failed to parse player response:', err);
      return [];
    }
  }

  /**
   * Fallback to Invidious instances
   */
  private tryInvidiousFallback(videoId: string, observer: any): void {
    let currentIdx = 0;

    const tryNext = () => {
      if (currentIdx >= this.INVIDIOUS_INSTANCES.length) {
        observer.error(new Error('All caption APIs failed'));
        return;
      }

      const instance = this.INVIDIOUS_INSTANCES[currentIdx++];
      const url = `${instance}/api/v1/captions/${videoId}`;
      // console.log('[TranscriptService] Trying Invidious:', url);

      this.http.get<InvidiousCaptionResponse>(url).subscribe({
        next: (response) => {
          if (response.captions && response.captions.length > 0) {
            console.log('[TranscriptService] Found captions:', response.captions.length);
            const tracks: CaptionTrack[] = response.captions.map(c => ({
              languageCode: c.languageCode,
              label: c.label,
              url: `${instance}${c.url}`
            }));
            observer.next(tracks);
            observer.complete();
          } else {
            tryNext();
          }
        },
        error: () => tryNext()
      });
    };

    tryNext();
  }

  /**
   * Fetch actual caption content
   */
  private fetchCaptionContent(url: string): Observable<TranscriptSegment[]> {
    let fetchUrl = url;

    if (url.includes('youtube.com/api/timedtext')) {
      fetchUrl = url.replace('https://www.youtube.com/api/timedtext', '/api/transcript');
      if (!fetchUrl.includes('fmt=')) {
        fetchUrl += '&fmt=json3';
      }
    }

    return this.http.get(fetchUrl, { responseType: 'text' }).pipe(
      map(content => {
        if (content.startsWith('{') && content.includes('"events"')) {
          return this.parseJSON3(content);
        } else if (content.includes('<?xml') || content.includes('<text start=')) {
          return this.parseXML(content);
        }
        return this.parseVTT(content);
      }),
      catchError(() => of([]))
    );
  }

  /**
   * Parse YouTube's JSON3 format
   */
  private parseJSON3(json: string): TranscriptSegment[] {
    try {
      const parsed = JSON.parse(json);
      const events = parsed.events || [];
      const segments: TranscriptSegment[] = [];

      for (const event of events) {
        if (!event.segs) continue;

        const text = event.segs.map((seg: any) => seg.utf8 || '').join('');
        if (text.trim()) {
          segments.push({
            text: this.decodeHtmlEntities(text.trim()),
            start: (event.tStartMs || 0) / 1000,
            duration: (event.dDurationMs || 0) / 1000
          });
        }
      }

      return segments;
    } catch {
      return [];
    }
  }

  /**
   * Parse XML format (YouTube's legacy format)
   */
  private parseXML(xml: string): TranscriptSegment[] {
    const segments: TranscriptSegment[] = [];
    const regex = /<text start="([^"]+)" dur="([^"]+)"[^>]*>([^<]*)<\/text>/g;
    let match;

    while ((match = regex.exec(xml)) !== null) {
      const start = parseFloat(match[1]);
      const duration = parseFloat(match[2]);
      const text = this.decodeHtmlEntities(match[3]);

      if (text.trim()) {
        segments.push({ text: text.trim(), start, duration });
      }
    }

    return segments;
  }

  /**
   * Parse WebVTT format (Invidious returns VTT format)
   */
  private parseVTT(vtt: string): TranscriptSegment[] {
    const segments: TranscriptSegment[] = [];
    const lines = vtt.split('\n');

    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();

      // Look for timestamp lines (format: 00:00:00.000 --> 00:00:05.000)
      const timestampMatch = line.match(/(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})/);

      if (timestampMatch) {
        const startTime = this.parseVTTTime(timestampMatch[1]);
        const endTime = this.parseVTTTime(timestampMatch[2]);

        // Collect text lines until we hit an empty line or another timestamp
        let text = '';
        i++;
        while (i < lines.length && lines[i].trim() !== '' && !lines[i].match(/-->/)) {
          text += (text ? ' ' : '') + lines[i].trim();
          i++;
        }

        if (text) {
          segments.push({
            text: this.decodeHtmlEntities(text),
            start: startTime,
            duration: endTime - startTime
          });
        }
      } else {
        i++;
      }
    }

    return segments;
  }

  /**
   * Parse VTT timestamp to seconds
   */
  private parseVTTTime(time: string): number {
    const parts = time.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const secondsParts = parts[2].split('.');
    const seconds = parseInt(secondsParts[0], 10);
    const milliseconds = parseInt(secondsParts[1], 10);

    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
  }

  /**
   * Convert transcript segments to SubtitleCue format
   */
  private convertToSubtitleCues(segments: TranscriptSegment[]): SubtitleCue[] {
    this.isLoading.set(false);

    return segments.map((segment, index) => {
      let endTime = segment.start + segment.duration;

      // User Request: "subtitle shouldn't hide, it should show until the next timestamp"
      // Sticky Logic: Extend end time to the start of the next segment
      if (index < segments.length - 1) {
        endTime = segments[index + 1].start;
      } else {
        // For the last segment, ensure it stays visible for a reasonable time (min 3s)
        endTime = Math.max(endTime, segment.start + 3);
      }

      return {
        id: index,
        startTime: segment.start,
        endTime: endTime,
        text: segment.text.trim()
      };
    });
  }

  /**
   * Decode HTML entities in caption text
   */
  private decodeHtmlEntities(text: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\n/g, ' ')
      .trim();
  }

  /**
   * Generate subtitles using Whisper API via backend
   * Called automatically when no captions are available
   */
  generateWithWhisper(videoId: string): Observable<SubtitleCue[]> {
    // Check cache first
    if (this.transcriptCache.has(videoId)) {
      this.captionSource.set('ai');
      return of(this.transcriptCache.get(videoId)!);
    }

    // Check if request is already pending
    if (this.pendingRequests.has(videoId)) {
      return this.pendingRequests.get(videoId)!;
    }

    this.isGeneratingAI.set(true);
    this.error.set(null);

    const request = this.http.post<{
      success: boolean;
      language: string;
      duration: number;
      segments: Array<{ id: number; text: string; start: number; duration: number }>;
      error?: string;
    }>('/api/whisper', { videoId }).pipe(
      map(response => {
        if (!response.success || !response.segments) {
          throw new Error(response.error || 'AI transcription failed');
        }

        const cues = response.segments.map((seg, index) => ({
          id: index,
          startTime: seg.start,
          endTime: seg.start + seg.duration,
          text: seg.text.trim()
        }));

        this.transcriptCache.set(videoId, cues);
        return cues;
      }),
      tap({
        next: () => {
          this.isLoading.set(false);
          this.isGeneratingAI.set(false);
          this.captionSource.set('ai');
          this.pendingRequests.delete(videoId);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.isGeneratingAI.set(false);
          this.pendingRequests.delete(videoId);

          let errorMessage = 'AI transcription failed';
          if (err.error?.error) {
            errorMessage = err.error.error;
          } else if (typeof err.error === 'string') {
            errorMessage = err.error;
          } else if (err.message) {
            errorMessage = err.message;
          }

          this.error.set(errorMessage);
        }
      }),
      shareReplay(1)
    );

    this.pendingRequests.set(videoId, request);

    return request.pipe(
      catchError(() => of([]))
    );
  }
}
