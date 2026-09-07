import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom, timeout } from 'rxjs';
import { SupportedLearningLanguage } from '../../models';
import { DictionaryService } from '../../features/dictionary/dictionary.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private platformId = inject(PLATFORM_ID);
  private dict = inject(DictionaryService);

  private activeAudio: HTMLAudioElement | null = null;
  readonly currentPlayingWord = signal<string | null>(null);
  private playRequestId = 0;

  // In-memory cache for resolved audio URLs to avoid re-fetching (bounded to 500 items)
  private readonly MAX_CACHE_SIZE = 500;
  private audioUrlCache = new Map<string, string>();

  private setCachedAudioUrl(key: string, url: string): void {
    if (this.audioUrlCache.size >= this.MAX_CACHE_SIZE) {
      const oldestKey = this.audioUrlCache.keys().next().value;
      if (oldestKey) this.audioUrlCache.delete(oldestKey);
    }
    this.audioUrlCache.set(key, url);
  }

  isPlaying(word?: string): boolean {
    if (!word) return this.currentPlayingWord() !== null;
    return this.currentPlayingWord() === word;
  }

  stopAudio(): void {
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.onended = null;
      this.activeAudio.onerror = null;
      this.activeAudio.removeAttribute('src');
      this.activeAudio.load();
      this.activeAudio = null;
    }
    this.currentPlayingWord.set(null);
  }

  /**
   * Play authentic pronunciation audio for a word:
   * 1. If explicit audioUrl provided -> play immediately
   * 2. If cached in audioUrlCache -> play immediately
   * 3. If dictionary entry has audio -> play and cache
   * 4. Fallback: stream high-fidelity neural audio from translate_tts?client=tw-ob
   * Zero browser window.speechSynthesis used!
   */
  async playWord(
    word: string,
    language: SupportedLearningLanguage = 'ja',
    providedAudioUrl?: string
  ): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    const cleanWord = word?.trim();
    if (!cleanWord) return;

    // Toggle off if currently playing the exact same word
    if (this.isPlaying(cleanWord)) {
      this.stopAudio();
      return;
    }

    this.stopAudio();
    const currentId = ++this.playRequestId;
    this.currentPlayingWord.set(cleanWord);

    try {
      const audioUrl = await this.resolveAudioUrl(cleanWord, language, providedAudioUrl);
      if (this.playRequestId !== currentId) return;

      if (!audioUrl) {
        this.currentPlayingWord.set(null);
        return;
      }

      await this.playAudioUrl(audioUrl, cleanWord, currentId);
    } catch (err) {
      console.warn('[AudioService] Audio playback failed:', err);
      if (this.playRequestId === currentId) {
        this.currentPlayingWord.set(null);
      }
    }
  }

  private async resolveAudioUrl(
    word: string,
    language: SupportedLearningLanguage,
    providedUrl?: string
  ): Promise<string> {
    if (providedUrl && (providedUrl.startsWith('https://') || providedUrl.startsWith('/'))) {
      return providedUrl;
    }

    const cacheKey = `${language}:${word}`;
    if (this.audioUrlCache.has(cacheKey)) {
      return this.audioUrlCache.get(cacheKey)!;
    }

    // Try dictionary lookup to get authentic recorded pronunciation
    try {
      const entry = await firstValueFrom(this.dict.lookup(word, language).pipe(timeout(2500)));
      if (entry?.audio && (entry.audio.startsWith('https://') || entry.audio.startsWith('/'))) {
        this.setCachedAudioUrl(cacheKey, entry.audio);
        return entry.audio;
      }
    } catch {
      // Lookup timeout or failure, proceed to high-fidelity audio stream fallback
    }

    // High-fidelity neural dictionary TTS audio fallback (client=tw-ob MP3 stream)
    const tlMap: Record<SupportedLearningLanguage, string> = {
      ja: 'ja',
      zh: 'zh-CN',
      ko: 'ko',
      en: 'en'
    };
    const tl = tlMap[language] || 'ja';
    const fallbackUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${encodeURIComponent(word)}`;
    this.setCachedAudioUrl(cacheKey, fallbackUrl);
    return fallbackUrl;
  }

  private playAudioUrl(url: string, word: string, requestId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);
      this.activeAudio = audio;

      audio.onended = () => {
        if (this.playRequestId === requestId && this.currentPlayingWord() === word) {
          this.currentPlayingWord.set(null);
        }
        if (this.activeAudio === audio) {
          this.activeAudio = null;
        }
        resolve();
      };

      audio.onerror = (e) => {
        if (this.playRequestId === requestId && this.currentPlayingWord() === word) {
          this.currentPlayingWord.set(null);
        }
        if (this.activeAudio === audio) {
          this.activeAudio = null;
        }
        reject(e);
      };

      audio.play().catch(reject);
    });
  }
}
