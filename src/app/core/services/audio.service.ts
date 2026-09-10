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

  isPlaying(word?: string): boolean {
    if (!word) return this.currentPlayingWord() !== null;
    return this.currentPlayingWord() === word;
  }

  stopAudio(): void {
    ++this.playRequestId;
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.onended = null;
      this.activeAudio.onerror = null;
      this.activeAudio.removeAttribute('src');
      this.activeAudio.load();
      this.activeAudio = null;
    }
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.activeUtterance = null;
    this.currentPlayingWord.set(null);
  }

  /**
   * Resilient, multi-tiered pronunciation playback:
   * Tier 1: Authentic native dictionary recording (explicit URL or cache)
   * Tier 2A: Microsoft Edge Neural TTS (Azure voices: Nanami, Xiaoxiao, SunHi, Jenny)
   * Tier 2B: Google Neural audio stream fallback (translate_tts with no-referrer policy)
   * Tier 3: Browser Web Speech API (speechSynthesis) offline-ready fallback
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
    const currentId = this.playRequestId;
    this.currentPlayingWord.set(cleanWord);

    const isCurrent = () => this.playRequestId === currentId;
    const cacheKey = `${language}:${cleanWord}`;

    // --- TIER 1: Authentic native recording (if provided directly or already cached) ---
    const candidateUrl = (providedAudioUrl && (providedAudioUrl.startsWith('https://') || providedAudioUrl.startsWith('/')))
      ? providedAudioUrl
      : this.audioUrlCache.get(cacheKey);

    if (candidateUrl) {
      try {
        await this.playAudioUrl(candidateUrl, cleanWord, currentId);
        if (isCurrent()) {
          this.setCachedAudioUrl(cacheKey, candidateUrl);
          return;
        }
      } catch (err) {
        // Evict failed URL from cache to avoid repeated playback failures
        if (this.audioUrlCache.get(cacheKey) === candidateUrl) {
          this.audioUrlCache.delete(cacheKey);
        }
        console.info(`[AudioService] Authentic audio failed for "${cleanWord}", falling back to stream TTS:`, (err as Error)?.message || err);
      }
    }

    if (!isCurrent()) return;

    // --- TIER 2A: Microsoft Edge Neural TTS (Azure voices: Nanami, Xiaoxiao, SunHi, Jenny) ---
    // High quality, instant, zero user gesture expiration!
    const edgeTtsUrl = `/api/tts?lang=${encodeURIComponent(language)}&text=${encodeURIComponent(cleanWord)}`;
    try {
      await this.playAudioUrl(edgeTtsUrl, cleanWord, currentId);
      if (isCurrent()) {
        this.setCachedAudioUrl(cacheKey, edgeTtsUrl);
        return;
      }
    } catch (err) {
      console.info(`[AudioService] Edge Neural TTS failed for "${cleanWord}", falling back to Google TTS:`, (err as Error)?.message || err);
    }

    if (!isCurrent()) return;

    // --- TIER 2B: Google Neural audio stream fallback with no-referrer ---
    const tlMap: Record<SupportedLearningLanguage, string> = {
      ja: 'ja',
      zh: 'zh-CN',
      ko: 'ko',
      en: 'en'
    };
    const tl = tlMap[language] || 'ja';
    const streamUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${tl}&q=${encodeURIComponent(cleanWord)}`;

    try {
      await this.playAudioUrl(streamUrl, cleanWord, currentId);
      if (isCurrent()) {
        this.setCachedAudioUrl(cacheKey, streamUrl);
        return;
      }
    } catch (err) {
      console.info(`[AudioService] Google TTS failed for "${cleanWord}", falling back to SpeechSynthesis:`, (err as Error)?.message || err);
    }

    if (!isCurrent()) return;

    // --- TIER 3: Browser Web Speech API (speechSynthesis) ---
    try {
      await this.playSpeechSynthesis(cleanWord, language, currentId);
      return;
    } catch (err) {
      console.warn(`[AudioService] All audio playback methods failed for "${cleanWord}":`, (err as Error)?.message || err);
    }

    if (isCurrent()) {
      this.currentPlayingWord.set(null);
    }
  }

  private playAudioUrl(url: string, word: string, requestId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      // Enforce no-referrer so cross-origin media endpoints do not reject based on Referer headers
      audio.setAttribute('referrerpolicy', 'no-referrer');
      (audio as unknown as { referrerPolicy?: string }).referrerPolicy = 'no-referrer';
      this.activeAudio = audio;

      let settled = false;
      let timeoutId: ReturnType<typeof setTimeout> | null = null;

      const cleanup = () => {
        if (!settled) {
          settled = true;
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          audio.onended = null;
          audio.onerror = null;
          if (this.activeAudio === audio) {
            this.activeAudio = null;
          }
        }
      };

      // Failsafe timeout: if audio fails to play or load within 4000ms, abort and fall back
      timeoutId = setTimeout(() => {
        cleanup();
        audio.pause();
        audio.removeAttribute('src');
        reject(new Error('Audio playback timed out after 4000ms'));
      }, 4000);

      audio.onended = () => {
        cleanup();
        if (this.playRequestId === requestId && this.currentPlayingWord() === word) {
          this.currentPlayingWord.set(null);
        }
        resolve();
      };

      audio.onerror = (e) => {
        cleanup();
        // Do NOT reset currentPlayingWord here so subsequent fallback tiers continue seamlessly
        const mediaErr = audio.error;
        const msg = mediaErr
          ? `MediaError ${mediaErr.code} (${this.getMediaErrorMessage(mediaErr.code)}): ${mediaErr.message || 'load failed'}`
          : (e instanceof Error ? e.message : 'Media element error');
        reject(new Error(msg));
      };

      audio.src = url;
      audio.play().catch(err => {
        cleanup();
        reject(err);
      });
    });
  }

  private playSpeechSynthesis(word: string, language: SupportedLearningLanguage, requestId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        reject(new Error('SpeechSynthesis is not supported in this environment'));
        return;
      }

      try {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(word);
        this.activeUtterance = utterance;

        const langMap: Record<SupportedLearningLanguage, string> = {
          ja: 'ja-JP',
          zh: 'zh-CN',
          ko: 'ko-KR',
          en: 'en-US'
        };
        const bcp47 = langMap[language] || 'ja-JP';
        utterance.lang = bcp47;
        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        if (voices?.length > 0) {
          const langPrefix = language === 'zh' ? 'zh' : language;
          const matchingVoices = voices.filter(v =>
            v.lang.toLowerCase().replace('_', '-').startsWith(langPrefix)
          );
          if (matchingVoices.length > 0) {
            const bestVoice = matchingVoices.find(v =>
              /natural|enhanced|premium|siri|google/i.test(v.name)
            ) || matchingVoices.find(v => v.default) || matchingVoices[0];
            if (bestVoice) {
              utterance.voice = bestVoice;
            }
          }
        }

        let settled = false;
        const cleanup = () => {
          if (!settled) {
            settled = true;
            if (this.activeUtterance === utterance) {
              this.activeUtterance = null;
            }
          }
        };

        utterance.onend = () => {
          cleanup();
          if (this.playRequestId === requestId && this.currentPlayingWord() === word) {
            this.currentPlayingWord.set(null);
          }
          resolve();
        };

        utterance.onerror = (e) => {
          cleanup();
          if (this.playRequestId === requestId && this.currentPlayingWord() === word) {
            this.currentPlayingWord.set(null);
          }
          if (e.error === 'canceled' || e.error === 'interrupted') {
            resolve();
          } else {
            reject(new Error(`SpeechSynthesis error: ${e.error}`));
          }
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        reject(err);
      }
    });
  }

  private getMediaErrorMessage(code: number): string {
    switch (code) {
      case 1: return 'MEDIA_ERR_ABORTED';
      case 2: return 'MEDIA_ERR_NETWORK';
      case 3: return 'MEDIA_ERR_DECODE';
      case 4: return 'MEDIA_ERR_SRC_NOT_SUPPORTED';
      default: return 'MEDIA_ERR_UNKNOWN';
    }
  }
}
