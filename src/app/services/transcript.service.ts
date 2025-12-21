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

  // Cache for generated transcripts to prevent redundant API calls
  private transcriptCache = new Map<string, SubtitleCue[]>();
  // Track ongoing requests to prevent spamming
  private pendingRequests = new Map<string, Observable<SubtitleCue[]>>();

  // Piped instances - most reliable for subtitle fetching
  private readonly PIPED_INSTANCES = [
    '/piped1'   // proxies to https://pipedapi.kavin.rocks
  ];

  // Invidious instances as fallback
  private readonly INVIDIOUS_INSTANCES = [
    '/invidious1'  // proxies to https://yewtu.be
  ];

  constructor(private http: HttpClient) { }

  /**
   * Fetch transcript from YouTube video using Invidious API
   * Falls back to Whisper AI transcription if no captions available
   */
  fetchTranscript(videoId: string, lang: string = 'ja'): Observable<SubtitleCue[]> {
    this.isLoading.set(true);
    this.error.set(null);

    return this.fetchCaptionsFromInvidious(videoId).pipe(
      switchMap(captionTracks => {
        if (!captionTracks || captionTracks.length === 0) {
          throw new Error('No captions available for this video');
        }

        // Find the requested language or fall back to first available
        const track = captionTracks.find(t => t.languageCode === lang)
          || captionTracks.find(t => t.languageCode.startsWith(lang))
          || captionTracks[0];

        if (!track) {
          throw new Error('No captions found');
        }

        console.log('[TranscriptService] Selected track:', track.languageCode, track.label);
        this.availableLanguages.set(captionTracks.map(t => t.languageCode));
        return this.fetchCaptionContent(track.url);
      }),
      map(segments => this.convertToSubtitleCues(segments)),
      catchError(err => {
        console.log('[TranscriptService] Caption fetch failed, trying Whisper AI:', err.message);
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
      const maxRetries = 5;
      let attempt = 0;
      let confirmedNoCaptions = false; // Track if YouTube confirmed no captions (vs API failure)

      const tryFetch = () => {
        attempt++;
        console.log(`[TranscriptService] Caption fetch attempt ${attempt}/${maxRetries}`);

        this.fetchCaptionsFromYouTube(videoId).subscribe({
          next: (result: { tracks: CaptionTrack[], validResponse: boolean }) => {
            if (result.tracks.length > 0) {
              console.log(`[TranscriptService] Success on attempt ${attempt}: ${result.tracks.length} tracks`);
              observer.next(result.tracks);
              observer.complete();
            } else if (result.validResponse) {
              // YouTube returned a valid response with no captions - video has no subtitles
              // Skip remaining retries and go straight to Whisper
              console.log('[TranscriptService] Video confirmed to have no captions, skipping to Whisper');
              confirmedNoCaptions = true;
              observer.next([]);
              observer.complete();
            } else if (attempt < maxRetries) {
              // API might be rate-limited or not ready - retry with exponential backoff
              // Delays: 1000ms, 2000ms, 4000ms, 8000ms
              const delay = 1000 * Math.pow(2, attempt - 1);
              console.log(`[TranscriptService] No tracks (API issue), retrying in ${delay}ms...`);
              setTimeout(tryFetch, delay);
            } else {
              console.log('[TranscriptService] All caption attempts failed');
              observer.next([]);
              observer.complete();
            }
          },
          error: (err) => {
            console.log(`[TranscriptService] Attempt ${attempt} error:`, err.message);
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

      // Initial delay before first fetch - gives YouTube CDN time to prepare
      console.log('[TranscriptService] Waiting 1s before caption fetch...');
      setTimeout(tryFetch, 1000);
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
   * This is more reliable than HTML parsing as it generates fresh URLs
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

    console.log('[TranscriptService] Trying innertube API for video:', videoId);

    return this.http.post<any>(url, body).pipe(
      map(response => {
        // Check if we got a valid player response (has videoDetails or playabilityStatus)
        const hasValidResponse = !!(response?.videoDetails || response?.playabilityStatus);
        const captionTracks = response?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

        if (!captionTracks || captionTracks.length === 0) {
          console.log('[TranscriptService] No captions in innertube response, valid:', hasValidResponse);
          // Return whether this was a valid "no captions" response or an incomplete/rate-limited response
          return { tracks: [], validResponse: hasValidResponse };
        }

        console.log('[TranscriptService] Innertube found:', captionTracks.length, 'tracks');

        const tracks = captionTracks.map((track: any) => ({
          languageCode: track.languageCode,
          label: track.name?.simpleText || track.languageCode,
          url: track.baseUrl
        }));

        return { tracks, validResponse: true };
      }),
      catchError(err => {
        console.log('[TranscriptService] Innertube API failed:', err.message);
        // API error - not a valid response, should retry
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
      // Convert YouTube URL to proxy URL and request JSON3 format
      fetchUrl = url.replace('https://www.youtube.com/api/timedtext', '/api/transcript');
      // CRITICAL: Add fmt=json3 to get actual content (YouTube returns empty without this)
      if (!fetchUrl.includes('fmt=')) {
        fetchUrl += '&fmt=json3';
      }
    }

    // console.log('[TranscriptService] Fetching caption content from:', fetchUrl.substring(0, 100) + '...');

    return this.http.get(fetchUrl, { responseType: 'text' }).pipe(
      map(content => {
        console.log('[TranscriptService] Received content, length:', content.length);

        // Detect format and parse accordingly
        if (content.startsWith('{') && content.includes('"events"')) {
          return this.parseJSON3(content);
        } else if (content.includes('<?xml') || content.includes('<text start=')) {
          return this.parseXML(content);
        }
        return this.parseVTT(content);
      }),
      catchError(err => {
        console.error('[TranscriptService] Failed to fetch caption content:', err);
        return of([]);
      })
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
        // Skip events without segments (these are styling/window events)
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

      console.log('[TranscriptService] Parsed JSON3 segments:', segments.length);
      return segments;
    } catch (err) {
      console.error('[TranscriptService] Failed to parse JSON3:', err);
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

    console.log('[TranscriptService] Parsed XML segments:', segments.length);
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

    console.log('[TranscriptService] Parsed VTT segments:', segments.length);
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
   * Generate subtitles using Whisper API (Groq) via backend
   * Called automatically when no captions are available
   */
  generateWithWhisper(videoId: string): Observable<SubtitleCue[]> {
    // 1. Check cache first
    if (this.transcriptCache.has(videoId)) {
      console.log('[TranscriptService] Using cached Whisper transcript');
      return of(this.transcriptCache.get(videoId)!);
    }

    // 2. Check if request is already pending
    if (this.pendingRequests.has(videoId)) {
      console.log('[TranscriptService] Request already pending, joining existing request');
      return this.pendingRequests.get(videoId)!;
    }

    console.log('[TranscriptService] Starting Whisper AI transcription...');
    this.isGeneratingAI.set(true);
    this.error.set(null);

    // 3. Create new request
    const request = this.http.post<{
      success: boolean;
      language: string;
      duration: number;
      segments: Array<{ id: number; text: string; start: number; duration: number }>;
      error?: string;
    }>('/api/whisper', { videoId }).pipe(
      map(response => {
        if (!response.success || !response.segments) {
          throw new Error(response.error || 'Whisper transcription failed');
        }

        console.log(`[TranscriptService] Whisper transcription complete. Language: ${response.language}, Segments: ${response.segments.length}`);

        // Convert to SubtitleCue format
        const cues = response.segments.map((seg, index) => ({
          id: index,
          startTime: seg.start,
          endTime: seg.start + seg.duration,
          text: seg.text.trim()
        }));

        // Cache the result
        this.transcriptCache.set(videoId, cues);
        return cues;
      }),
      tap({
        next: () => {
          this.isLoading.set(false);
          this.isGeneratingAI.set(false);
          this.pendingRequests.delete(videoId);
        },
        error: (err) => {
          console.error('[TranscriptService] Whisper API error:', err);
          this.isLoading.set(false);
          this.isGeneratingAI.set(false);
          this.pendingRequests.delete(videoId);

          let errorMessage = 'AI transcription failed';
          if (err.error && typeof err.error === 'object' && err.error.error) {
            errorMessage = err.error.error;
          } else if (typeof err.error === 'string') {
            errorMessage = err.error;
          } else if (err.message) {
            errorMessage = err.message;
          }

          this.error.set(errorMessage);
        }
      }),
      // Use shareReplay so multiple subscribers waiting share the same single API call
      shareReplay(1)
    );

    // Store request
    this.pendingRequests.set(videoId, request);

    // Return request but we need to catch errors to return empty array for the UI logic
    return request.pipe(
      catchError(() => of([]))
    );
  }
}
