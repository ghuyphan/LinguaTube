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

  readonly currentVideo = signal<VideoInfo | null>(null);
  readonly isPlaying = signal(false);
  readonly currentTime = signal(0);
  readonly duration = signal(0);
  readonly isReady = signal(false);
  readonly error = signal<string | null>(null);
  readonly pendingVideoId = signal<string | null>(null); // Set when loading from URL

  constructor() {
    this.apiReadyPromise = new Promise(resolve => {
      this.resolveApiReady = resolve;
    });
    this.loadYouTubeAPI();
  }

  private loadYouTubeAPI(): void {
    // Check if already loaded
    if (window.YT && window.YT.Player) {
      this.apiReady.set(true);
      this.resolveApiReady();
      return;
    }

    // Check if script is already being loaded
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      // Wait for existing script to load
      const checkReady = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkReady);
          this.apiReady.set(true);
          this.resolveApiReady();
        }
      }, 100);
      return;
    }

    // Load the script
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

    // Wait for API to be ready
    await this.apiReadyPromise;

    // Destroy existing player if any
    if (this.player) {
      this.destroy();
    }

    return new Promise((resolve, reject) => {
      try {
        // Ensure the element exists
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
            controls: 0,           // Hide YouTube controls (use custom)
            modestbranding: 1,
            rel: 0,
            cc_load_policy: 0,     // Don't auto-show captions
            iv_load_policy: 3,     // Hide annotations
            playsinline: 1,
            fs: 0,                 // Hide fullscreen button
            disablekb: 0,          // Allow keyboard controls
            showinfo: 0,           // Hide video info
            origin: window.location.origin, // Check origin for CORS
            enablejsapi: 1,        // Enable JS API
            host: 'https://www.youtube.com' // Explicit host can help with origin check
          },
          events: {
            onReady: (event: any) => {
              this.duration.set(event.target.getDuration() || 0);
              const videoData = event.target.getVideoData();
              this.currentVideo.set({
                id: videoId,
                title: videoData?.title || 'YouTube Video',
                duration: event.target.getDuration(),
                channel: videoData?.author
              });
              this.isReady.set(true);
              this.startTimeTracking();
              resolve();
            },
            onStateChange: (event: any) => {
              const state = event.data;
              this.isPlaying.set(state === window.YT.PlayerState.PLAYING);

              // Update duration when video loads
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
    // Clear existing interval
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval);
    }

    this.timeUpdateInterval = setInterval(() => {
      if (this.player && typeof this.player.getCurrentTime === 'function') {
        try {
          this.currentTime.set(this.player.getCurrentTime() || 0);
        } catch (e) {
          // Player might be destroyed
        }
      }
    }, 100);
  }

  play(): void {
    try {
      this.player?.playVideo();
    } catch (e) { }
  }

  pause(): void {
    try {
      this.player?.pauseVideo();
    } catch (e) { }
  }

  pauseVideo(): void {
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
    try {
      this.player?.seekTo(seconds, true);
    } catch (e) { }
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
      clearInterval(this.timeUpdateInterval);
      this.timeUpdateInterval = null;
    }

    try {
      this.player?.destroy();
    } catch (e) { }

    this.player = null;
    // Don't clear currentVideo here to allow restoring state on navigation
    // Reset other transport states
    this.isPlaying.set(false);
    this.isReady.set(false);
    this.error.set(null);
  }

  reset(): void {
    this.destroy();
    this.currentVideo.set(null);
    this.currentTime.set(0);
    this.duration.set(0);
  }
}
