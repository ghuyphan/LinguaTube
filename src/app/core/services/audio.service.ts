import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SupportedLearningLanguage } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private platformId = inject(PLATFORM_ID);

  private activeAudio: HTMLAudioElement | null = null;
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  readonly currentPlayingWord = signal<string | null>(null);
  private playRequestId = 0;

  // In-memory cache for resolved audio URLs to avoid re-fetching (bounded to 500 items)
  private readonly MAX_CACHE_SIZE = 500;
  private audioUrlCache = new Map<string, string>();
  private audioBlobUrlCache = new Map<string, string>();

  constructor() {
    // Pre-warm SpeechSynthesis voices if running in browser
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }

  private setCachedAudioUrl(key: string, url: string): void {
    if (this.audioUrlCache.size >= this.MAX_CACHE_SIZE) {
      const oldestKey = this.audioUrlCache.keys().next().value;
      if (oldestKey) this.audioUrlCache.delete(oldestKey);
    }
    this.audioUrlCache.set(key, url);
  }

  private setCachedAudioBlob(key: string, blobUrl: string): void {
    if (this.audioBlobUrlCache.size >= this.MAX_CACHE_SIZE) {
      const oldestKey = this.audioBlobUrlCache.keys().next().value;
      if (oldestKey) {
        const urlToRevoke = this.audioBlobUrlCache.get(oldestKey);
        this.audioBlobUrlCache.delete(oldestKey);
        if (urlToRevoke && urlToRevoke.startsWith('blob:') && typeof URL !== 'undefined' && URL.revokeObjectURL) {
          try { URL.revokeObjectURL(urlToRevoke); } catch {
            // Ignored
          }
        }
      }
    }
    this.audioBlobUrlCache.set(key, blobUrl);
  }

  /**
   * Pre-fetches word audio in the background and stores it in RAM as a Blob URL.
   * Ensures 0ms instant playback when the user subsequently taps the speaker icon.
   */
  async preloadWord(word: string, language: SupportedLearningLanguage = 'ja'): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    const cleanWord = word?.trim();
    if (!cleanWord) return;
    const cacheKey = `${language}:${cleanWord}`;
    if (this.audioBlobUrlCache.has(cacheKey)) return;

    try {
      const edgeTtsUrl = `/api/tts?lang=${encodeURIComponent(language)}&text=${encodeURIComponent(cleanWord)}`;
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timer = setTimeout(() => controller?.abort(), 3000);
      const resp = await fetch(edgeTtsUrl, {
        signal: controller?.signal,
        headers: { Accept: 'audio/mpeg' },
      });
      clearTimeout(timer);
      if (resp.ok) {
        const blob = await resp.blob();
        if (blob && blob.size > 0 && !this.audioBlobUrlCache.has(cacheKey)) {
          const objectUrl = URL.createObjectURL(blob);
          this.setCachedAudioBlob(cacheKey, objectUrl);
        }
      }
    } catch {
      // Preloading is opportunistic; silently ignore errors
    }
  }

  isPlaying(word?: string): boolean {
    if (!word) return this.currentPlayingWord() !== null;
    return this.currentPlayingWord() === word;
  }

  stopAudio(): void {
    ++this.playRequestId;
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.onplay = null;
      this.activeAudio.onended = null;
      this.activeAudio.onerror = null;
      this.activeAudio.removeAttribute('src');
      this.activeAudio.load();
      this.activeAudio = null;
    }
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch {}
    }
    this.activeUtterance = null;
    this.currentPlayingWord.set(null);
  }

  /**
   * Play word pronunciation exactly 1 time.
   * Tiers: 1) RAM Blob Cache -> 2) Dictionary MP3 -> 3) Neural /api/tts -> 4) SpeechSynthesis
   */
  async playWord(
    word: string,
    language: SupportedLearningLanguage = 'ja',
    _providedAudioUrl?: string
  ): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;
    const cleanWord = word?.trim();
    if (!cleanWord) return;

    // Toggle off if already playing this exact word
    if (this.isPlaying(cleanWord)) {
      this.stopAudio();
      return;
    }

    this.stopAudio();
    const currentId = this.playRequestId;
    this.currentPlayingWord.set(cleanWord);

    const isCurrent = () => this.playRequestId === currentId;
    const cacheKey = `${language}:${cleanWord}`;

    try {
      // 1. Instant RAM Blob URL Cache (<1ms)
      const cachedBlob = this.audioBlobUrlCache.get(cacheKey);
      if (cachedBlob) {
        try {
          if (await this.playAudioUrl(cachedBlob, cleanWord, currentId)) return;
        } catch {
          this.audioBlobUrlCache.delete(cacheKey);
        }
      }

      if (!isCurrent()) return;

      // 2. Authentic native dictionary audio URL
      if (_providedAudioUrl && _providedAudioUrl.startsWith('http')) {
        try {
          if (await this.playAudioUrl(_providedAudioUrl, cleanWord, currentId)) return;
        } catch {}
      }

      if (!isCurrent()) return;

      // 3. Online Unified Neural TTS (/api/tts)
      const ttsUrl = `/api/tts?lang=${encodeURIComponent(language)}&text=${encodeURIComponent(cleanWord)}`;
      try {
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const fetchTimer = setTimeout(() => controller?.abort(), 3500);
        const resp = await fetch(ttsUrl, {
          signal: controller?.signal,
          headers: { Accept: 'audio/mpeg' },
        });
        clearTimeout(fetchTimer);

        if (resp.ok) {
          const blob = await resp.blob();
          if (blob && blob.size > 100) {
            const objectUrl = URL.createObjectURL(blob);
            this.setCachedAudioBlob(cacheKey, objectUrl);
            if (isCurrent() && await this.playAudioUrl(objectUrl, cleanWord, currentId)) return;
          }
        }
      } catch {}

      if (!isCurrent()) return;

      // 4. Offline Fallback: Browser Web Speech API (speechSynthesis)
      await this.playSpeechSynthesis(cleanWord, language, currentId);
    } finally {
      if (isCurrent() && !this.activeAudio && !this.activeUtterance) {
        this.currentPlayingWord.set(null);
      }
    }
  }

  private playAudioUrl(url: string, word: string, requestId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.setAttribute('referrerpolicy', 'no-referrer');
      this.activeAudio = audio;

      let timer: ReturnType<typeof setTimeout> | null = null;

      const cleanup = () => {
        if (timer) { clearTimeout(timer); timer = null; }
        audio.onplay = null;
        audio.onended = null;
        audio.onerror = null;
        try { audio.pause(); audio.removeAttribute('src'); audio.load(); } catch {}
        if (this.activeAudio === audio) this.activeAudio = null;
      };

      // 4s load timeout before sound starts
      timer = setTimeout(() => {
        cleanup();
        reject(new Error('Audio load timeout'));
      }, 4000);

      // Once playing starts, replace load timeout with a generous 10s playback watchdog
      audio.onplay = () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          cleanup();
          if (this.playRequestId === requestId && this.currentPlayingWord() === word) {
            this.currentPlayingWord.set(null);
          }
          resolve(true);
        }, 10000);
      };

      audio.onended = () => {
        cleanup();
        if (this.playRequestId === requestId && this.currentPlayingWord() === word) {
          this.currentPlayingWord.set(null);
        }
        resolve(true);
      };

      audio.onerror = () => {
        cleanup();
        reject(new Error('Audio error'));
      };

      audio.src = url;
      audio.play().catch(err => {
        cleanup();
        reject(err);
      });
    });
  }

  private playSpeechSynthesis(word: string, language: SupportedLearningLanguage, requestId: number): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        this.stopAudio();
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(word);
      this.activeUtterance = utterance;

      const langMap: Record<SupportedLearningLanguage, string> = {
        ja: 'ja-JP', zh: 'zh-CN', ko: 'ko-KR', en: 'en-US'
      };
      utterance.lang = langMap[language] || 'ja-JP';
      utterance.rate = 0.95;

      const voices = window.speechSynthesis.getVoices();
      if (voices?.length > 0) {
        const langPrefix = language === 'zh' ? 'zh' : language;
        const matching = voices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix));
        const best = matching.find(v => /natural|enhanced|premium|google/i.test(v.name)) || matching[0];
        if (best) utterance.voice = best;
      }

      let done = false;
      const finish = () => {
        if (!done) {
          done = true;
          if (watchdog) clearTimeout(watchdog);
          if (this.activeUtterance === utterance) this.activeUtterance = null;
          if (this.playRequestId === requestId && this.currentPlayingWord() === word) {
            this.currentPlayingWord.set(null);
          }
          resolve();
        }
      };

      // Watchdog guarantees UI resets even if browser drops onend
      const watchdog = setTimeout(finish, Math.min(8000, Math.max(3000, word.length * 300)));
      utterance.onend = finish;
      utterance.onerror = finish;

      try {
        if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
        window.speechSynthesis.speak(utterance);
      } catch {
        finish();
      }
    });
  }
}
