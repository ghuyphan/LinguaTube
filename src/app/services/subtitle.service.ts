import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubtitleCue, Token } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SubtitleService {
  readonly subtitles = signal<SubtitleCue[]>([]);
  readonly currentCueIndex = signal<number>(-1);

  readonly currentCue = computed(() => {
    const index = this.currentCueIndex();
    const subs = this.subtitles();
    return index >= 0 && index < subs.length ? subs[index] : null;
  });

  constructor(private http: HttpClient) { }

  /**
   * Parse SRT subtitle format
   */
  parseSRT(content: string): SubtitleCue[] {
    const cues: SubtitleCue[] = [];
    const blocks = content.trim().split(/\n\n+/);

    for (const block of blocks) {
      const lines = block.split('\n');
      if (lines.length < 2) continue;

      // Parse timing line (format: 00:00:00,000 --> 00:00:00,000)
      const timingLine = lines.find(line => line.includes('-->'));
      if (!timingLine) continue;

      const [startStr, endStr] = timingLine.split('-->').map(s => s.trim());
      const startTime = this.parseTimestamp(startStr);
      const endTime = this.parseTimestamp(endStr);

      // Get text (everything after timing line)
      const timingIndex = lines.indexOf(timingLine);
      const text = lines.slice(timingIndex + 1).join('\n').trim();

      if (text && !isNaN(startTime) && !isNaN(endTime)) {
        cues.push({
          id: cues.length,
          startTime,
          endTime,
          text: this.cleanSubtitleText(text)
        });
      }
    }

    return cues;
  }

  /**
   * Parse VTT subtitle format
   */
  parseVTT(content: string): SubtitleCue[] {
    // Remove WEBVTT header
    const withoutHeader = content.replace(/^WEBVTT\n\n?/, '');
    // VTT uses . instead of , for milliseconds, normalize to SRT format
    const normalized = withoutHeader.replace(/(\d{2}:\d{2}:\d{2})\.(\d{3})/g, '$1,$2');
    return this.parseSRT(normalized);
  }

  /**
   * Parse ASS/SSA subtitle format (basic support)
   */
  parseASS(content: string): SubtitleCue[] {
    const cues: SubtitleCue[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
      if (!line.startsWith('Dialogue:')) continue;

      const parts = line.substring(10).split(',');
      if (parts.length < 10) continue;

      const startTime = this.parseASSTimestamp(parts[1]);
      const endTime = this.parseASSTimestamp(parts[2]);
      const text = parts.slice(9).join(',')
        .replace(/\{[^}]*\}/g, '') // Remove style tags
        .replace(/\\N/g, '\n')     // Convert line breaks
        .trim();

      if (text && !isNaN(startTime) && !isNaN(endTime)) {
        cues.push({
          id: cues.length,
          startTime,
          endTime,
          text
        });
      }
    }

    return cues;
  }

  /**
   * Auto-detect format and parse
   */
  parseSubtitles(content: string, filename?: string): SubtitleCue[] {
    const ext = filename?.split('.').pop()?.toLowerCase();

    if (ext === 'vtt' || content.startsWith('WEBVTT')) {
      return this.parseVTT(content);
    } else if (ext === 'ass' || ext === 'ssa' || content.includes('[Script Info]')) {
      return this.parseASS(content);
    } else {
      return this.parseSRT(content);
    }
  }

  /**
   * Load subtitles from file
   */
  loadFromFile(file: File): Promise<SubtitleCue[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const cues = this.parseSubtitles(content, file.name);
        this.subtitles.set(cues);
        resolve(cues);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  /**
   * Update current cue based on video time
   * Implements "sticky" subtitles - if no active cue, show the most recent one that ended
   */
  updateCurrentCue(currentTime: number): void {
    const subs = this.subtitles();
    if (subs.length === 0) {
      this.currentCueIndex.set(-1);
      return;
    }

    // First, try to find an active cue (current time is within start/end)
    // Use reverse loop to prefer the most recently started cue for overlapping subtitles
    let index = -1;
    for (let i = subs.length - 1; i >= 0; i--) {
      if (currentTime >= subs[i].startTime && currentTime <= subs[i].endTime) {
        index = i;
        break;
      }
    }

    // If no active cue, implement "sticky" behavior:
    // Find the last subtitle that ended before current time (but only if we've started playing past first subtitle)
    if (index === -1 && currentTime > 0) {
      for (let i = subs.length - 1; i >= 0; i--) {
        if (subs[i].endTime <= currentTime) {
          // Found a subtitle that already ended - show it as "sticky"
          // But only if the next subtitle hasn't started yet
          const nextSub = subs[i + 1];
          if (!nextSub || currentTime < nextSub.startTime) {
            index = i;
          }
          break;
        }
      }
    }

    this.currentCueIndex.set(index);
  }

  /**
   * Get cue at specific time
   */
  getCueAtTime(time: number): SubtitleCue | null {
    return this.subtitles().find(
      cue => time >= cue.startTime && time <= cue.endTime
    ) || null;
  }

  /**
   * Tokenize Japanese text (basic tokenization)
   * For production, integrate Kuromoji or server-side MeCab
   */
  tokenizeJapanese(text: string): Token[] {
    // Basic character-based tokenization
    // In production, use Kuromoji.js for proper morphological analysis
    const tokens: Token[] = [];
    let currentWord = '';
    let currentType = '';

    for (const char of text) {
      const type = this.getCharType(char);

      if (type !== currentType && currentWord) {
        tokens.push({ surface: currentWord });
        currentWord = '';
      }

      currentWord += char;
      currentType = type;
    }

    if (currentWord) {
      tokens.push({ surface: currentWord });
    }

    return tokens;
  }

  /**
   * Tokenize Chinese text (basic tokenization)
   * For production, integrate Jieba or similar
   */
  tokenizeChinese(text: string): Token[] {
    // Basic character-by-character tokenization
    // In production, use Jieba or server-side segmentation
    return text.split('').map(char => ({ surface: char }));
  }

  /**
   * Clear all subtitles
   */
  clear(): void {
    this.subtitles.set([]);
    this.currentCueIndex.set(-1);
  }

  // Private helpers

  private parseTimestamp(str: string): number {
    // Format: 00:00:00,000 or 00:00:00.000
    const match = str.match(/(\d{1,2}):(\d{2}):(\d{2})[,.](\d{3})/);
    if (!match) return NaN;

    const [, hours, minutes, seconds, ms] = match;
    return (
      parseInt(hours) * 3600 +
      parseInt(minutes) * 60 +
      parseInt(seconds) +
      parseInt(ms) / 1000
    );
  }

  private parseASSTimestamp(str: string): number {
    // Format: 0:00:00.00
    const match = str.trim().match(/(\d+):(\d{2}):(\d{2})\.(\d{2})/);
    if (!match) return NaN;

    const [, hours, minutes, seconds, cs] = match;
    return (
      parseInt(hours) * 3600 +
      parseInt(minutes) * 60 +
      parseInt(seconds) +
      parseInt(cs) / 100
    );
  }

  private cleanSubtitleText(text: string): string {
    return text
      .replace(/<[^>]+>/g, '')     // Remove HTML tags
      .replace(/\{[^}]*\}/g, '')   // Remove style tags
      .trim();
  }

  private getCharType(char: string): string {
    const code = char.charCodeAt(0);

    // Hiragana
    if (code >= 0x3040 && code <= 0x309F) return 'hiragana';
    // Katakana
    if (code >= 0x30A0 && code <= 0x30FF) return 'katakana';
    // CJK Unified Ideographs (Kanji/Hanzi)
    if (code >= 0x4E00 && code <= 0x9FFF) return 'kanji';
    // ASCII
    if (code >= 0x0020 && code <= 0x007F) return 'ascii';
    // Punctuation
    if (/[。、！？「」『』（）]/.test(char)) return 'punctuation';

    return 'other';
  }
}
