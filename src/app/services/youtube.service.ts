import { Injectable, signal } from '@angular/core';
import { VideoInfo } from '../models';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private player: any = null;
  private apiReady = signal(false);
  private apiReadyPromise: Promise<void>;
  private resolveApiReady!: () => void;
  private timeUpdateInterval: any = null;

  private readonly STORAGE_KEY = 'lingua-tube-last-video';

  readonly currentVideo = signal<VideoInfo | null>(null);
  readonly isPlaying = signal(false);
  readonly currentTime = signal(0);
  readonly duration = signal(0);
  readonly isReady = signal(false);
  readonly isEnded = signal(false);
  readonly isBuffering = signal(false);
  readonly error = signal<string | null>(null);
  readonly pendingVideoId = signal<string | null>(null);
  readonly intendedPlayingState = signal(false);

  /**
   * Get the last video ID from localStorage (for restoring after page reload)
   */
  getLastVideoId(): string | null {
    try {
      return localStorage.getItem(this.STORAGE_KEY);
    } catch {
      return null;
    }
  }

  /**
   * Save video ID to localStorage
   */
  private saveLastVideoId(videoId: string): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, videoId);
    } catch {
      // localStorage might be unavailable
    }
  }

  /**
   * Clear the last video ID from localStorage
   */
  clearLastVideoId(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch {
      // localStorage might be unavailable
    }
  }

  private wasPausedOnLeave = false;
  private isSeeking = false;
  private seekingTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.apiReadyPromise = new Promise(resolve => {
      this.resolveApiReady = resolve;
    });
    this.loadYouTubeAPI();
    this.setupVisibilityHandler();
  }

  private setupVisibilityHandler(): void {
    if (typeof document === 'undefined') return;

    document.addEventListener('visibilitychange', () => {
      // Track play state when leaving the page to restore it when coming back
      if (document.visibilityState === 'hidden' && this.player) {
        this.wasPausedOnLeave = !this.isPlaying();
      }

      if (document.visibilityState === 'visible' && this.player) {
        try {
          const time = this.player.getCurrentTime();
          if (time != null && time >= 0) {
            this.currentTime.set(time);
          }
          const state = this.player.getPlayerState();
          if (state != null) {
            const isPlaying = state === window.YT?.PlayerState?.PLAYING;
            if (isPlaying !== this.isPlaying()) {
              this.isPlaying.set(isPlaying);
            }
            if (isPlaying) {
              this.startTimeTracking();
            }
          }
        } catch (e) {
          // Player might not be ready
        }
      }
    });
  }

  private loadYouTubeAPI(): void {
    if (window.YT && window.YT.Player) {
      this.apiReady.set(true);
      this.resolveApiReady();
      return;
    }

    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      let attempts = 0;
      const maxAttempts = 100;
      const checkReady = setInterval(() => {
        attempts++;
        if (window.YT && window.YT.Player) {
          clearInterval(checkReady);
          this.apiReady.set(true);
          this.resolveApiReady();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkReady);
          console.warn('YouTube API failed to load after', maxAttempts * 100, 'ms');
        }
      }, 100);
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      this.apiReady.set(true);
      this.resolveApiReady();
    };
  }

  /**
   * Fetch video metadata via YouTube oEmbed API (no API key required)
   */
  private async fetchVideoMetadata(videoId: string): Promise<{ title: string; channel: string }> {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('oEmbed fetch failed');

      const data = await response.json();
      return {
        title: data.title || 'YouTube Video',
        channel: data.author_name || 'Unknown Channel'
      };
    } catch (e) {
      console.warn('Failed to fetch video metadata from oEmbed:', e);
      return {
        title: 'YouTube Video',
        channel: 'Unknown Channel'
      };
    }
  }

  extractVideoId(url: string): string | null {
    if (!url) return null;

    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
      const match = url.trim().match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  async initPlayer(elementId: string, videoId: string): Promise<void> {
    this.error.set(null);
    this.isReady.set(false);

    await this.apiReadyPromise;

    if (this.player) {
      this.destroy();
    }

    // Fetch metadata in parallel with player initialization
    const metadataPromise = this.fetchVideoMetadata(videoId);

    return new Promise((resolve, reject) => {
      try {
        const element = document.getElementById(elementId);
        if (!element) {
          reject(new Error('Player element not found'));
          return;
        }

        this.player = new window.YT.Player(elementId, {
          videoId,
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
            playsinline: 1,
            fs: 0,
            disablekb: 0,
            showinfo: 0,
            origin: window.location.origin,
            enablejsapi: 1,
            host: 'https://www.youtube.com'
          },
          events: {
            onReady: async (event: any) => {
              const duration = event.target.getDuration() || 0;
              this.duration.set(duration);

              // Get reliable metadata from oEmbed
              const metadata = await metadataPromise;

              this.currentVideo.set({
                id: videoId,
                title: metadata.title,
                duration: duration,
                channel: metadata.channel
              });

              // Persist video ID for page reload recovery
              this.saveLastVideoId(videoId);

              this.isReady.set(true);
              this.startTimeTracking();

              // Restore playing state if intended
              if (this.intendedPlayingState()) {
                this.play();
              } else {
                this.pause();
              }

              resolve();
            },
            onStateChange: (event: any) => {
              const state = event.data;
              const isPlaying = state === window.YT.PlayerState.PLAYING;
              const isBuffering = state === window.YT.PlayerState.BUFFERING;

              // Update buffering state
              this.isBuffering.set(isBuffering);

              // Only update isPlaying when transitioning to/from PLAYING state
              // Don't set isPlaying to false when buffering (user pressed play, waiting for buffer)
              if (isPlaying && !this.isPlaying()) {
                this.isPlaying.set(true);
                this.intendedPlayingState.set(true);
                this.startTimeTracking();
              } else if (!isPlaying && !isBuffering && this.isPlaying()) {
                // Only set to false if we're not buffering (e.g., paused or ended)
                this.isPlaying.set(false);
                this.intendedPlayingState.set(false);
                cancelAnimationFrame(this.timeUpdateInterval);
              }

              this.isEnded.set(state === window.YT.PlayerState.ENDED);

              if (state === window.YT.PlayerState.PLAYING && this.wasPausedOnLeave) {
                this.wasPausedOnLeave = false;
                this.pause();
              }

              if (state === window.YT.PlayerState.PLAYING || state === window.YT.PlayerState.PAUSED) {
                const dur = event.target.getDuration();
                if (dur > 0) this.duration.set(dur);
              }
            },
            onError: (event: any) => {
              const errorMessages: Record<number, string> = {
                2: 'Invalid video ID',
                5: 'HTML5 player error',
                100: 'Video not found or private',
                101: 'Video cannot be embedded',
                150: 'Video cannot be embedded'
              };
              const msg = errorMessages[event.data] || 'Unknown error';
              this.error.set(msg);
              reject(new Error(msg));
            }
          }
        });
      } catch (err) {
        this.error.set('Failed to initialize player');
        reject(err);
      }
    });
  }

  private startTimeTracking(): void {
    const track = () => {
      if (!this.isSeeking && this.player && typeof this.player.getCurrentTime === 'function') {
        try {
          const time = this.player.getCurrentTime() || 0;
          if (time !== this.currentTime()) {
            this.currentTime.set(time);
          }
        } catch (e) {
          // Player might be destroyed
        }
      }

      if (this.isPlaying()) {
        this.timeUpdateInterval = requestAnimationFrame(track);
      }
    };

    cancelAnimationFrame(this.timeUpdateInterval);
    this.timeUpdateInterval = requestAnimationFrame(track);
  }

  private setPlaying(isPlaying: boolean) {
    if (isPlaying && !this.isPlaying()) {
      this.isPlaying.set(true);
      this.startTimeTracking();
    } else if (!isPlaying) {
      this.isPlaying.set(false);
      cancelAnimationFrame(this.timeUpdateInterval);
    }
  }

  play(): void {
    this.intendedPlayingState.set(true);
    this.setPlaying(true);
    try {
      this.player?.playVideo();
    } catch (e) { }
  }

  pause(): void {
    this.intendedPlayingState.set(false);
    this.setPlaying(false);
    try {
      this.player?.pauseVideo();
    } catch (e) { }
  }

  pauseVideo(): void {
    this.intendedPlayingState.set(false);
    try {
      this.player?.pauseVideo();
    } catch (e) {
      console.warn('Could not pause video', e);
    }
  }

  togglePlay(): void {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }

  seekTo(seconds: number): void {
    const clampedTime = Math.max(0, Math.min(seconds, this.duration() || seconds));
    this.currentTime.set(clampedTime);

    this.isSeeking = true;
    if (this.seekingTimeout) {
      clearTimeout(this.seekingTimeout);
    }

    try {
      this.player?.seekTo(clampedTime, true);
    } catch (e) { }

    this.seekingTimeout = setTimeout(() => {
      this.isSeeking = false;
      this.seekingTimeout = null;
    }, 300);
  }

  seekRelative(seconds: number): void {
    const newTime = Math.max(0, this.currentTime() + seconds);
    this.seekTo(newTime);
  }

  setPlaybackRate(rate: number): void {
    try {
      this.player?.setPlaybackRate(rate);
    } catch (e) { }
  }

  getPlaybackRate(): number {
    try {
      return this.player?.getPlaybackRate() || 1;
    } catch (e) {
      return 1;
    }
  }

  setVolume(volume: number): void {
    try {
      this.player?.setVolume(Math.max(0, Math.min(100, volume)));
    } catch (e) { }
  }

  getVolume(): number {
    try {
      return this.player?.getVolume() || 100;
    } catch (e) {
      return 100;
    }
  }

  mute(): void {
    try {
      this.player?.mute();
    } catch (e) { }
  }

  unmute(): void {
    try {
      this.player?.unMute();
    } catch (e) { }
  }

  isMuted(): boolean {
    try {
      return this.player?.isMuted() || false;
    } catch (e) {
      return false;
    }
  }

  destroy(): void {
    if (this.timeUpdateInterval) {
      cancelAnimationFrame(this.timeUpdateInterval);
      this.timeUpdateInterval = null;
    }

    try {
      this.player?.destroy();
    } catch (e) { }

    this.player = null;
    this.isPlaying.set(false);
    this.isReady.set(false);
    this.error.set(null);
  }

  reset(): void {
    this.destroy();
    this.currentVideo.set(null);
    this.currentTime.set(0);
    this.duration.set(0);
    this.pendingVideoId.set(null);
    this.intendedPlayingState.set(false);
    this.clearLastVideoId();
  }
}