import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { VideoInfo } from '../../models';

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  getVolume(): number;
  setVolume(volume: number): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  setPlaybackRate(rate: number): void;
  getPlaybackRate(): number;
  loadVideoById(videoId: string): void;
  unloadModule(module: string): void;
  getIframe(): HTMLIFrameElement;
  destroy(): void;
}

interface YTEvent {
  target: YTPlayer;
  data: number;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

/**
 * YouTube Player Service
 * 
 * Root-level singleton that manages the YouTube IFrame Player API.
 * 
 * NOTE: This service intentionally adds persistent event listeners for:
 * - document.visibilitychange: To track play state when tab is hidden/shown
 * - Media Session API handlers: For playback controls on lock screen
 * 
 * These are NOT cleaned up because this service lives for the entire app lifecycle.
 */
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private player: YTPlayer | null = null;
  private apiReady = signal(false);
  private apiReadyPromise: Promise<void>;
  private resolveApiReady!: () => void;
  private timeUpdateInterval: any = null;

  /** Guard to prevent concurrent initPlayer calls */
  private pendingInit: Promise<void> | null = null;

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
  readonly isMuted = signal(false);

  /** Emits when a video is successfully loaded (for history tracking) */
  readonly videoLoaded = new Subject<VideoInfo>();

  /** Emits when user requests next/prev track via Media Session API */
  readonly nextTrack$ = new Subject<void>();
  readonly previousTrack$ = new Subject<void>();

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
    this.setupMediaSession();
  }

  private setupVisibilityHandler(): void {
    if (typeof document === 'undefined') return;

    document.addEventListener('visibilitychange', () => {
      // Track play state when leaving the page to restore it when coming back
      if (document.visibilityState === 'hidden' && this.player) {
        this.wasPausedOnLeave = !this.isPlaying();
      }

      if (document.visibilityState === 'visible' && this.player) {
        // Re-sync state when becoming visible, but don't force pause
        // Let the background playback continue if it was playing
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
        } catch {
          // Player might not be ready
        }
      }
    });
  }

  private setupMediaSession(): void {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => this.play());
      navigator.mediaSession.setActionHandler('pause', () => this.pause());
      navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.seekTime !== undefined) {
          this.seekTo(details.seekTime);
        }
      });
      navigator.mediaSession.setActionHandler('previoustrack', () => {
        this.previousTrack$.next();
      });
      navigator.mediaSession.setActionHandler('nexttrack', () => {
        this.nextTrack$.next();
      });
    }
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
  async fetchVideoMetadata(videoId: string): Promise<{ title: string; channel: string }> {
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
    const trimmed = url.trim();

    // Direct 11-char video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }

    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/
    ];

    for (const pattern of patterns) {
      const match = trimmed.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  async initPlayer(elementId: string, videoId: string): Promise<void> {
    // Guard against concurrent initialization - wait for pending init to complete
    if (this.pendingInit) {
      console.log('[YoutubeService] Waiting for pending initialization to complete...');
      await this.pendingInit;
    }

    // Create new initialization promise
    let resolveInit: () => void;
    this.pendingInit = new Promise(resolve => { resolveInit = resolve; });

    try {
      this.error.set(null);
      // Don't set isReady to false yet if we are potentially reusing the player

      await this.apiReadyPromise;

      // REUSE PLAYER if possible
      let canReuse = false;
      if (this.player && typeof this.player.loadVideoById === 'function') {
        try {
          const iframe = this.player.getIframe();
          if (iframe && iframe.isConnected) {
            canReuse = true;
          } else {
            console.warn('[YoutubeService] Player instance exists but iframe is disconnected. Recreating.');
          }
        } catch (e) {
          console.warn('[YoutubeService] Error checking player iframe:', e);
        }
      }

      if (canReuse) {
        // player is guaranteed non-null here (checked above in the canReuse guard)
        const player = this.player!;
        try {
          const metadataPromise = this.fetchVideoMetadata(videoId);

          // Load the new video
          player.loadVideoById(videoId);

          // Disable YouTube's built-in captions (we use our own)
          try {
            player.unloadModule('captions');
            player.unloadModule('cc');
          } catch {
            // Module might not be loaded
          }

          // Fetch fresh metadata
          const metadata = await metadataPromise;
          const duration = player.getDuration() || 0; // Might be 0 initially, updated by onStateChange/metadata

          // Update application state
          this.updateVideoState(videoId, metadata, duration);
          return;
        } catch (e) {
          console.warn('Failed to reuse player, falling back to recreation', e);
          // Fall through to recreation
        } finally {
          // Clear pending init guard on reuse path
          this.pendingInit = null;
          resolveInit!();
        }
      }

      this.isReady.set(false);

      if (this.player) {
        this.destroy();
      }

      // Fetch metadata in parallel with player initialization
      const metadataPromise = this.fetchVideoMetadata(videoId);

      return new Promise<void>((resolve, reject) => {
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
              onReady: async (event: YTEvent) => {
                const duration = event.target.getDuration() || 0;
                const metadata = await metadataPromise;

                // Use the unified state update method
                this.updateVideoState(videoId, metadata, duration);

                // Disable YouTube's built-in captions (we use our own)
                try {
                  event.target.unloadModule('captions');
                  event.target.unloadModule('cc');
                } catch {
                  // Module might not be loaded
                }

                this.isReady.set(true); // Explicitly set ready here for new players

                // Restore playing state if intended
                if (this.intendedPlayingState()) {
                  this.play();
                } else {
                  this.pause();
                }

                resolve();
              },
              onStateChange: (event: YTEvent) => {
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

                  try {
                    event.target.unloadModule('captions');
                    event.target.unloadModule('cc');
                  } catch { }

                  if ('mediaSession' in navigator) {
                    navigator.mediaSession.playbackState = 'playing';
                  }
                } else if (!isPlaying && !isBuffering && this.isPlaying()) {
                  // Only set to false if we're not buffering (e.g., paused or ended)
                  if ('mediaSession' in navigator) {
                    navigator.mediaSession.playbackState = 'paused';
                  }
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
              onError: (event: YTEvent) => {
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
      }).finally(() => {
        // Clear pending init guard when done (success or error)
        this.pendingInit = null;
        resolveInit!();
      });
    } catch (error) {
      // Ensure guard is cleared even if the async operation fails
      this.pendingInit = null;
      resolveInit!();
      throw error;
    }
  }

  private startTimeTracking(): void {
    const track = () => {
      if (!this.isSeeking && this.player && typeof this.player.getCurrentTime === 'function') {
        try {
          const time = this.player.getCurrentTime() || 0;
          if (time !== this.currentTime()) {
            this.currentTime.set(time);
          }
        } catch {
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

  play(): void {
    this.intendedPlayingState.set(true);
    try {
      this.player?.playVideo();
    } catch { }
  }

  pause(): void {
    this.intendedPlayingState.set(false);
    try {
      this.player?.pauseVideo();
    } catch { }
  }


  togglePlay(): void {
    if (this.intendedPlayingState()) {
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
    } catch { }

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
    } catch { }
  }

  getPlaybackRate(): number {
    try {
      return this.player?.getPlaybackRate() || 1;
    } catch {
      return 1;
    }
  }

  setVolume(volume: number): void {
    try {
      this.player?.setVolume(Math.max(0, Math.min(100, volume)));
      if (volume > 0 && this.isMuted()) {
        this.unmute();
      }
    } catch { }
  }

  getVolume(): number {
    try {
      return this.player?.getVolume() || 100;
    } catch {
      return 100;
    }
  }

  mute(): void {
    try {
      this.player?.mute();
      this.isMuted.set(true);
    } catch { }
  }

  unmute(): void {
    try {
      this.player?.unMute();
      this.isMuted.set(false);
    } catch { }
  }



  destroy(): void {
    if (this.timeUpdateInterval) {
      cancelAnimationFrame(this.timeUpdateInterval);
      this.timeUpdateInterval = null;
    }

    try {
      this.player?.destroy();
    } catch { }

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
  /**
   * Update internal state when video is loaded (reused or new)
   */
  private updateVideoState(videoId: string, metadata: { title: string; channel: string }, duration: number): void {
    this.duration.set(duration);

    // Build VideoInfo once and reuse for both the signal and the event
    const video: VideoInfo = {
      id: videoId,
      title: metadata.title,
      duration,
      channel: metadata.channel,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    };

    this.currentVideo.set(video);

    // Persist video ID for page reload recovery
    this.saveLastVideoId(videoId);

    // Initial mute state check
    if (this.player) {
      this.isMuted.set(this.player.isMuted());
    }

    this.startTimeTracking();

    // Emit event for history tracking
    this.videoLoaded.next(video);

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: metadata.title,
        artist: metadata.channel,
        artwork: [
          { src: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`, sizes: '320x180', type: 'image/jpeg' },
          { src: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`, sizes: '480x360', type: 'image/jpeg' }
        ]
      });
    }
  }
}