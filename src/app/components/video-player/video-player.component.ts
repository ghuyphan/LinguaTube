import { Component, inject, signal, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { YoutubeService, SubtitleService, SettingsService, TranscriptService } from '../../services';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="video-player">
      @if (!youtube.currentVideo() && !isLoading()) {
        <!-- URL Input State -->
        <div class="video-input">
          <div class="input-group">
            <div class="input-wrapper">
              <app-icon name="search" [size]="18" class="input-icon" />
              <input
                type="text"
                [(ngModel)]="videoUrl"
                placeholder="Paste YouTube URL (e.g., https://youtube.com/watch?v=...)"
                class="url-input"
                (keyup.enter)="loadVideo()"
              />
            </div>
            <button 
              class="btn btn-primary load-btn"
              (click)="loadVideo()"
              [disabled]="isLoading()"
            >
              @if (isLoading()) {
                <app-icon name="loader" [size]="16" />
                Loading
              } @else {
                Load Video
              }
            </button>
          </div>
          
          @if (error()) {
            <div class="error-banner">
              <app-icon name="alert-circle" [size]="16" />
              <span>{{ error() }}</span>
            </div>
          }

          <div class="hints">
            <p class="hint-text">
              <app-icon name="info" [size]="14" />
              Paste a YouTube URL to start learning. We'll try to fetch captions automatically.
            </p>
          </div>
        </div>
      } @else {
        <!-- Video Loaded State -->
        <div class="video-container">
          <div class="video-wrapper">
            <div id="youtube-player"></div>
          </div>


          <!-- Controls Layer -->
          <div class="video-controls-layer">
            <!-- Progress bar -->
            <div class="progress-bar" (click)="onProgressClick($event)">
              <div 
                class="progress-fill" 
                [style.width.%]="(youtube.currentTime() / youtube.duration()) * 100"
              ></div>
            </div>

            <!-- Controls -->
            <div class="controls">
              <div class="controls__left">
                <button 
                  class="btn btn-icon btn-ghost" 
                  (click)="youtube.seekRelative(-5)"
                  title="Rewind 5s"
                >
                  <app-icon name="rewind" [size]="18" />
                </button>
                
                <button 
                  class="btn btn-icon play-btn" 
                  (click)="youtube.togglePlay()"
                  title="{{ youtube.isPlaying() ? 'Pause' : 'Play' }}"
                >
                  @if (youtube.isPlaying()) {
                    <app-icon name="pause" [size]="20" />
                  } @else {
                    <app-icon name="play" [size]="20" />
                  }
                </button>
                
                <button 
                  class="btn btn-icon btn-ghost" 
                  (click)="youtube.seekRelative(5)"
                  title="Forward 5s"
                >
                  <app-icon name="fast-forward" [size]="18" />
                </button>

                <span class="time-display">
                  {{ formatTime(youtube.currentTime()) }} / {{ formatTime(youtube.duration()) }}
                </span>
              </div>

              <div class="controls__right">
                <button 
                  class="btn btn-icon btn-ghost"
                  (click)="toggleLoop()"
                  [class.active]="isLooping()"
                  title="Loop current subtitle"
                >
                  <app-icon name="repeat" [size]="16" />
                </button>

                <select 
                  class="speed-select"
                  [ngModel]="settings.settings().playbackSpeed"
                  (ngModelChange)="setSpeed($event)"
                >
                  <option [value]="0.5">0.5x</option>
                  <option [value]="0.75">0.75x</option>
                  <option [value]="1">1x</option>
                  <option [value]="1.25">1.25x</option>
                  <option [value]="1.5">1.5x</option>
                  <option [value]="2">2x</option>
                </select>
                
                <button 
                  class="btn btn-sm btn-ghost close-btn" 
                  (click)="closeVideo()"
                >
                  <app-icon name="x" [size]="16" />
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Video Info -->
        <div class="video-info">
          <h2 class="video-title">{{ youtube.currentVideo()?.title }}</h2>
          @if (youtube.currentVideo()?.channel) {
            <span class="video-channel">{{ youtube.currentVideo()?.channel }}</span>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .video-player {
      width: 100%;
    }

    /* Input State */
    .video-input {
      background: var(--bg-card);
      border-radius: var(--border-radius-lg);
      padding: var(--space-xl);
      border: 1px solid var(--border-color);
    }

    .input-group {
      display: flex;
      gap: var(--space-sm);
    }

    .input-wrapper {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 12px;
      color: var(--text-muted);
      pointer-events: none;
    }

    .url-input {
      padding-left: 40px;
      height: 44px;
    }

    .load-btn {
      height: 44px;
      padding: 0 20px;
    }

    .error-banner {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-top: var(--space-md);
      padding: var(--space-sm) var(--space-md);
      background: var(--word-new);
      color: var(--error);
      border-radius: var(--border-radius);
      font-size: 0.875rem;
    }

    .hints {
      margin-top: var(--space-lg);
    }

    .hint-text {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    /* Video Container */
    .video-container {
      background: #000;
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      position: relative;
    }

    .video-wrapper {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%; /* 16:9 */
      background: #000;
      overflow: hidden;
      /* Cap height on desktop so subtitle panel is visible at 100% zoom */
      max-height: 50vh;
    }
    
    /* When max-height is reached, switch from padding-hack to direct sizing */
    @media (min-width: 769px) {
      .video-wrapper {
        padding-bottom: 0;
        height: min(56.25vw, 50vh);
        max-height: 50vh;
      }
    }

    /* Target the youtube-player div and the iframe it creates */
    #youtube-player,
    .video-wrapper > div,
    .video-wrapper iframe {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      border: none;
    }

    /* Progress Bar */
    .progress-bar {
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      cursor: pointer;
      transition: height var(--transition-fast);
      position: relative;
      z-index: 10;
    }

    .progress-bar:hover {
      height: 6px;
    }

    .progress-fill {
      height: 100%;
      background: var(--accent-primary);
      transition: width 0.1s linear;
    }

    /* Controls */
    .controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-sm) var(--space-md);
      background: var(--bg-card);
      position: relative;
      z-index: 10;
    }

    .controls__left,
    .controls__right {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }

    .play-btn {
      background: var(--accent-primary);
      color: white;
    }

    .play-btn:hover {
      background: #a83532;
    }

    .time-display {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      color: var(--text-secondary);
      margin-left: var(--space-sm);
      min-width: 90px;
    }

    .btn-ghost.active {
      color: var(--accent-primary);
      background: rgba(199, 62, 58, 0.1);
    }

    .speed-select {
      width: auto;
      padding: 6px 28px 6px 10px;
      font-size: 0.8125rem;
      background-position: right 6px center;
    }

    .close-btn {
      margin-left: var(--space-sm);
    }

    /* Video Info */
    .video-info {
      padding: var(--space-md) 0;
    }

    .video-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .video-channel {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

      /* Mobile: Edge-to-edge player + Overlay Controls */
      @media (max-width: 640px) {
        /* Reset player wrapper */
        .video-player {
          width: 100%;
          margin: 0;
        }

        /* ONLY the video container goes edge-to-edge */
        .video-container {
          border-radius: 0;
          margin: 0 calc(var(--space-lg) * -1);
          width: calc(100% + var(--space-lg) * 2);
        }

        /* Align content back to normal container width */
        .input-group {
          flex-direction: column;
        }

        .load-btn {
          width: 100%;
        }

        /* Overlay Layout */
        .video-controls-layer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
          padding-top: 40px;
        }

        .controls {
          background: transparent;
          padding: var(--space-xs) var(--space-lg); /* Maintain horizontal padding */
          color: white;
        }
        
        /* Force white text/icons on dark overlay */
        .controls .btn-ghost,
        .controls .time-display, 
        .controls .close-btn {
          color: rgba(255, 255, 255, 0.9);
        }

        .controls .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .controls .btn-ghost.active {
          color: var(--accent-primary);
          background: rgba(199, 62, 58, 0.2);
        }

        .controls__left {
          flex: 1;
          justify-content: flex-start;
          width: auto;
        }

        .controls__right {
          width: auto;
          border-top: none;
          padding-top: 0;
          gap: var(--space-xs);
        }

        .time-display {
          display: inline-block;
          color: rgba(255, 255, 255, 0.8);
        }

        .play-btn {
          width: 36px;
          height: 36px;
        }
        
        .btn-icon {
          width: 36px;
          height: 36px;
          padding: 6px;
        }

        .speed-select {
          padding: 4px 20px 4px 6px;
          font-size: 0.75rem;
          height: 28px;
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: white;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
        }
        
        .speed-select option {
          background-color: var(--bg-card);
          color: var(--text-primary);
        }

        .close-btn {
          margin-left: 0;
          font-size: 0;
          padding: 6px;
        }
        
        .close-btn app-icon {
          margin-right: 0;
        }

        /* Ensure input and info stay within container padding */
        .video-input,
        .video-info {
          padding: var(--space-md) 0;
          margin: 0;
        }
        
        /* Specific fix for the input container to not be edge-to-edge */
        .video-input {
          padding: var(--space-md);
        }
      }


    @media (max-width: 480px) {
      .video-input {
        padding: var(--space-md);
      }

      .url-input {
        font-size: 16px; 
      }

      .hints {
        margin-top: var(--space-md);
      }

      .video-info {
        padding: var(--space-sm) 0;
      }

      .video-title {
        font-size: 1rem;
        -webkit-line-clamp: 2;
      }
      
      .video-channel {
        font-size: 0.75rem;
      }
    }
  `]
})
export class VideoPlayerComponent implements OnDestroy {
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);
  transcript = inject(TranscriptService);
  settings = inject(SettingsService);

  videoUrl = '';
  isLoading = signal(false);
  error = signal<string | null>(null);
  isLooping = signal(false);

  constructor() {
    // If we have a current video but no player instance (e.g. navigation),
    // we need to re-initialize the player on this new view
    effect(() => {
      const currentVideo = this.youtube.currentVideo();
      const isReady = this.youtube.isReady();

      // If we have a video but not ready, we need to init
      if (currentVideo && !isReady && !this.isLoading()) {
        // Use setTimeout to ensure the DOM element exists
        setTimeout(() => {
          this.restorePlayer(currentVideo.id);
        }, 0);
      }
    });
  }

  async loadVideo(): Promise<void> {
    const url = this.videoUrl.trim();
    if (!url) {
      this.error.set('Please enter a YouTube URL');
      return;
    }

    const videoId = this.youtube.extractVideoId(url);

    if (!videoId) {
      this.error.set('Invalid YouTube URL. Please check and try again.');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    // Allow the view to update so the player element is created
    await new Promise(resolve => setTimeout(resolve, 0));

    try {
      await this.youtube.initPlayer('youtube-player', videoId);

      // Try to fetch captions automatically
      this.fetchCaptions(videoId);
    } catch (err: any) {
      this.error.set(err.message || 'Failed to load video. Please try again.');
      console.error(err);
    } finally {
      this.isLoading.set(false);
    }
  }

  private async restorePlayer(videoId: string): Promise<void> {
    try {
      // Don't set loading to true here to avoid flickering input state
      await this.youtube.initPlayer('youtube-player', videoId);
      // We don't need to fetch captions again as they are in SubtitleService state
    } catch (err: any) {
      console.error('Failed to restore player:', err);
    }
  }

  private fetchCaptions(videoId: string): void {
    const lang = this.settings.settings().language;
    this.transcript.fetchTranscript(videoId, lang).subscribe({
      next: (cues) => {
        if (cues.length > 0) {
          this.subtitles.subtitles.set(cues);
        }
      },
      error: (err) => {
        console.log('Auto-caption fetch failed, user can upload manually:', err);
      }
    });
  }

  closeVideo(): void {
    this.youtube.reset(); // Use reset to actually clear state
    this.subtitles.clear();
    this.videoUrl = '';
    this.error.set(null);
  }

  setSpeed(speed: number): void {
    this.settings.setPlaybackSpeed(speed);
    this.youtube.setPlaybackRate(speed);
  }

  toggleLoop(): void {
    this.isLooping.update(v => !v);
  }

  onProgressClick(event: MouseEvent): void {
    const bar = event.currentTarget as HTMLElement;
    const rect = bar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const time = percent * this.youtube.duration();
    this.youtube.seekTo(time);
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    // Only destroy the player instance, NOT the state
    this.youtube.destroy();
  }
}
