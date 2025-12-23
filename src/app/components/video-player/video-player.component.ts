import { Component, inject, signal, OnDestroy, effect, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { YoutubeService, SubtitleService, SettingsService, TranscriptService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-player',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div 
      class="player-wrapper"
      (mousemove)="onUserActivity()" 
      (click)="onUserActivity()"
      (touchstart)="onUserActivity()"
    >
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
                Load
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
        <div class="video-container" #videoContainer>
          <div class="video-embed-ratio">
            <div id="youtube-player"></div>
            
            <!-- Interaction Overlay Layer -->
            <div class="player-overlay" (touchstart)="onUserActivity()">
              <div class="zone left" (click)="handleZoneTap(-5)">
                <div class="feedback-icon" [class.animate]="rewindFeedback()">
                  <app-icon name="rewind" [size]="40" />
                  <span>-5s</span>
                </div>
              </div>
              <div class="zone center" (click)="handleCenterTap()">
                <!-- YouTube-style play/pause feedback animation -->
                @if (playPauseFeedback()) {
                  <div class="play-pause-feedback" [class.animate]="playPauseFeedback()">
                    <app-icon [name]="feedbackIconName()" [size]="48" />
                  </div>
                }
                <!-- Big play button when paused and controls hidden -->
                @if (!youtube.isPlaying() && !areControlsVisible() && !playPauseFeedback()) {
                  <div class="big-play-btn">
                    <app-icon name="play" [size]="48" />
                  </div>
                }
              </div>
              <div class="zone right" (click)="handleZoneTap(5)">
                 <div class="feedback-icon" [class.animate]="forwardFeedback()">
                  <app-icon name="fast-forward" [size]="40" />
                  <span>+5s</span>
                </div>
              </div>
            </div>
            
            <!-- Custom Controls -->
            <div 
              class="custom-controls" 
              [class.controls-hidden]="!areControlsVisible() && youtube.isPlaying()"
            >
              <!-- Progress Bar -->
              <div class="progress-container" 
                   (mousedown)="startSeeking($event)" 
                   (touchstart)="startSeeking($event)"
                   #progressBar>
                <div class="progress-bg"></div>
                <div class="progress-fill" [style.width.%]="progressPercentage()"></div>
                <div class="progress-handle" [style.left.%]="progressPercentage()"></div>
              </div>

              <div class="controls-row">
                <button class="control-btn play-btn" (click)="togglePlay()">
                  <app-icon [name]="youtube.isPlaying() ? 'pause' : 'play'" [size]="20" />
                </button>

                <!-- Time Display -->
                <div class="time-display">
                  <span class="time-current">{{ formatTime(displayTime()) }}</span>
                  <span class="time-separator">/</span>
                  <span class="time-total">{{ formatTime(youtube.duration()) }}</span>
                </div>

                <div class="spacer"></div>

                <!-- Volume / Mute -->
                <button class="control-btn" (click)="toggleMute()">
                  <app-icon [name]="isMuted() ? 'volume-x' : 'volume-2'" [size]="18" />
                </button>
                
                <button class="control-btn close-btn" (click)="closeVideo()" title="Close Video">
                  <app-icon name="x" [size]="18" />
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
    .player-wrapper {
      width: 100%;
    }

    /* Input State */
    .video-input {
      background: var(--bg-card);
      border-radius: var(--border-radius-lg);
      padding: var(--space-lg);
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
      height: 40px;
    }

    .load-btn {
      height: 40px;
      padding: 0 16px;
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

    .video-embed-ratio {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%; /* 16:9 */
      background: #000;
      overflow: hidden;
    }
    
    /* Desktop: 16:9 aspect ratio with reasonable max-height */
    @media (min-width: 769px) {
      .video-embed-ratio {
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        max-height: 60vh;
      }
    }

    #youtube-player {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      border: none;
    }

    /* Transparent Overlay & Zones */
    .player-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      display: flex;
      -webkit-tap-highlight-color: transparent;
    }

    .zone {
      height: 100%;
      position: relative;
      /* Debug: background: rgba(0,0,0,0.1); */
      -webkit-tap-highlight-color: transparent;
      outline: none;
    }

    .zone.left, .zone.right {
      width: 30%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .zone.center {
      width: 40%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .big-play-btn {
      width: 72px;
      height: 72px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease;
    }

    .play-pause-feedback {
      width: 72px;
      height: 72px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      backdrop-filter: blur(4px);
      pointer-events: none;
    }

    .play-pause-feedback.animate {
      animation: playPausePop 0.4s ease-out forwards;
    }

    @keyframes playPausePop {
      0% { opacity: 0; transform: scale(0.5); }
      30% { opacity: 1; transform: scale(1.1); }
      60% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(1); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }

    .feedback-icon {
      color: rgba(255, 255, 255, 0.9);
      background: rgba(0, 0, 0, 0.4);
      padding: 16px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      opacity: 0;
      transform: scale(0.8);
      transition: opacity 0.2s, transform 0.2s;
      pointer-events: none;
    }

    .feedback-icon span {
      font-size: 0.75rem;
      font-weight: 600;
    }

    .feedback-icon.animate {
      animation: flashFeedback 0.5s ease-out forwards;
    }

    @keyframes flashFeedback {
      0% { opacity: 0; transform: scale(0.5); }
      20% { opacity: 1; transform: scale(1.1); }
      80% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(0.8); }
    }

    /* Custom Controls */
    .custom-controls {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
      padding: var(--space-md);
      z-index: 20;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      transition: opacity 0.3s ease;
      opacity: 1;
    }

    .controls-hidden {
      opacity: 0;
      pointer-events: none;
    }

    /* Progress Bar */
    .progress-container {
      width: 100%;
      height: 4px;
      background: rgba(255,255,255,0.3);
      position: relative;
      cursor: pointer;
      transition: height 0.1s;
      border-radius: 2px;
      /* removed margin-bottom to make controls closer */
    }

    .progress-container:hover {
      height: 6px;
    }

    .progress-bg {
      width: 100%;
      height: 100%;
    }

    .progress-fill {
      height: 100%;
      background: var(--accent-primary);
      width: 0%;
      border-radius: 2px;
      position: absolute;
      top: 0;
      left: 0;
    }

    .progress-handle {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      background: var(--accent-primary);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.1s;
    }

    @media (hover: hover) {
      .progress-container:hover .progress-handle {
        opacity: 1;
      }
    }

    /* Controls Row */
    .controls-row {
      display: flex;
      align-items: center;
      gap: var(--space-md);
    }

    .control-btn {
      background: none;
      border: none;
      color: rgba(255,255,255,0.9);
      cursor: pointer;
      padding: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: all 0.2s;
    }

    @media (hover: hover) {
      .control-btn:hover {
        background: rgba(255,255,255,0.15);
        color: white;
      }
    }
    
    .play-btn {
      color: white;
      padding: 0;
    }

    .time-display {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: rgba(255,255,255,0.9);
      display: flex;
      gap: 4px;
    }
    
    .time-separator {
      color: rgba(255,255,255,0.5);
    }

    .spacer {
      flex: 1;
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
      margin-bottom: 4px;
    }

    .video-channel {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    /* Mobile (tablet-sized) */
    @media (max-width: 640px) {
      .video-container {
        border-radius: 0;
        margin: 0 calc(var(--mobile-padding) * -1);
        width: calc(100% + var(--mobile-padding) * 2);
      }
      
      .custom-controls {
        padding: var(--space-md) var(--mobile-padding);
        padding-bottom: calc(var(--space-md) + 4px);
      }
      
      /* Larger progress bar for easier scrubbing */
      .progress-container {
        height: 8px;
        margin-bottom: 2px;
      }
      
      .progress-handle {
        width: 20px;
        height: 20px;
        opacity: 1; /* Always visible on mobile */
      }
      
      .control-btn {
        width: var(--touch-target-min);
        height: var(--touch-target-min);
        border-radius: 10px;
      }
      
      .play-btn {
        width: 48px;
        height: 48px;
      }
      
      .time-display {
        font-size: 0.8125rem;
      }
      
      .controls-row {
        gap: var(--space-sm);
      }
      
      .video-input {
        padding: var(--mobile-padding);
        border-radius: var(--mobile-card-radius);
      }
      
      .input-group {
        flex-direction: column;
        gap: var(--space-sm);
      }
      
      .input-wrapper {
        width: 100%;
      }
      
      .url-input {
        height: 48px;
        font-size: 16px; /* Prevents iOS zoom */
        border-radius: 10px;
        padding-left: var(--touch-target-min);
      }
      
      .input-icon {
        left: 14px;
      }
      
      .load-btn {
        width: 100%;
        height: 48px;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
      }
      
      /* Video info */
      .video-info {
        padding: var(--space-md) 0;
      }
      
      .video-title {
        font-size: 1rem;
        line-height: 1.4;
      }
      
      .video-channel {
        font-size: 0.8125rem;
      }
      
      /* Larger tap zones on mobile */
      .zone.left, .zone.right {
        width: 35%;
      }
      
      .zone.center {
        width: 30%;
      }
      
      .feedback-icon {
        padding: 20px;
      }
    }
    
    /* Mobile (phone-sized) */
    @media (max-width: 480px) {
      .video-container {
        margin: 0 calc(var(--space-md) * -1);
        width: calc(100% + var(--space-md) * 2);
      }
      
      .custom-controls {
        padding: var(--space-sm) var(--space-md);
      }
    }
  `]
})
export class VideoPlayerComponent implements OnDestroy {
  private router = inject(Router);
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);
  transcript = inject(TranscriptService);
  settings = inject(SettingsService);

  videoUrl = '';
  isLoading = signal(false);
  error = signal<string | null>(null);

  // UI State
  areControlsVisible = signal(true);
  isMuted = signal(false);

  // Seeking State
  isDragging = signal(false);
  previewTime = signal(0);

  displayTime = computed(() => {
    return this.isDragging() ? this.previewTime() : this.youtube.currentTime();
  });

  progressPercentage = computed(() => {
    const time = this.displayTime();
    const duration = this.youtube.duration();
    if (!duration) return 0;
    return (time / duration) * 100;
  });

  // Feedback animations
  rewindFeedback = signal(false);
  forwardFeedback = signal(false);
  feedbackIconName = signal<'play' | 'pause'>('play');
  playPauseFeedback = signal(false);

  private controlsTimeout: ReturnType<typeof setTimeout> | null = null;
  private lastTap = 0; // For double tap detection if needed
  private transcriptSubscription: Subscription | null = null;

  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;
  @ViewChild('videoContainer') videoContainerRef!: ElementRef<HTMLDivElement>;

  // Keyboard controls for video player
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Only handle keyboard events when video is loaded
    if (!this.youtube.currentVideo()) return;

    // Don't intercept if user is typing in an input field
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    switch (event.code) {
      case 'Space':
        event.preventDefault(); // Prevent page scroll
        this.togglePlay();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.seekRelative(-5);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.seekRelative(5);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.youtube.setVolume(Math.min(100, this.youtube.getVolume() + 10));
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.youtube.setVolume(Math.max(0, this.youtube.getVolume() - 10));
        break;
      case 'KeyM':
        this.toggleMute();
        break;
    }
  }

  // Hide controls when clicking outside video player
  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  onDocumentClick(event: Event) {
    // Only care about this when controls are visible
    if (!this.areControlsVisible() || !this.youtube.isPlaying()) return;

    const target = event.target as HTMLElement;
    const videoContainer = this.videoContainerRef?.nativeElement;

    // If click is outside the video container, hide controls immediately
    if (videoContainer && !videoContainer.contains(target)) {
      this.areControlsVisible.set(false);
      this.clearControlsTimeout();
    }
  }

  constructor() {
    // Restoring player state when component initializes/re-creates
    // This runs when navigating back to the video page
    effect(() => {
      const currentVideo = this.youtube.currentVideo();
      // If we have a video in the service but no active player (isReady is false), we need to restore
      if (currentVideo && !this.youtube.isReady() && !this.isLoading()) {
        const savedTime = this.youtube.currentTime(); // Capture saved time

        // Wait for DOM element to exist before initializing player
        this.waitForElement('youtube-player').then(async () => {
          await this.restorePlayer(currentVideo.id);
          // Restore playback position
          if (savedTime > 0) {
            this.youtube.seekTo(savedTime);
          }
        });
      }
    });

    // Sync mute state
    effect(() => {
      // When player becomes ready, sync mute state
      if (this.youtube.isReady()) {
        this.isMuted.set(this.youtube.isMuted());
      }
    });

    // We do NOT clear videoUrl from input here to allow easy re-copying if desired,
    // or we can sync it with currentVideo if we want the input to reflect current state.
    effect(() => {
      if (!this.youtube.currentVideo()) {
        this.videoUrl = '';
      }
    });

    // Auto-hide controls when video starts playing
    effect(() => {
      if (this.youtube.isPlaying()) {
        this.showControls(); // Start the auto-hide timer
      } else {
        // Show controls when paused
        this.areControlsVisible.set(true);
        this.clearControlsTimeout();
      }
    });
  }

  onUserActivity() {
    this.showControls();
  }

  private showControls() {
    this.areControlsVisible.set(true);
    this.clearControlsTimeout();

    if (this.youtube.isPlaying()) {
      this.controlsTimeout = setTimeout(() => {
        this.areControlsVisible.set(false);
      }, 3000); // Hide after 3s
    }
  }

  private clearControlsTimeout() {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
      this.controlsTimeout = null;
    }
  }

  togglePlay() {
    // Capture the action we're about to take BEFORE toggling
    const willPlay = !this.youtube.isPlaying();
    this.feedbackIconName.set(willPlay ? 'play' : 'pause');

    this.youtube.togglePlay();
    this.triggerPlayPauseFeedback();
    this.showControls();
  }

  private triggerPlayPauseFeedback() {
    this.playPauseFeedback.set(true);
    setTimeout(() => this.playPauseFeedback.set(false), 400);
  }

  toggleMute() {
    if (this.isMuted()) {
      this.youtube.unmute();
      this.isMuted.set(false);
    } else {
      this.youtube.mute();
      this.isMuted.set(true);
    }
    this.showControls();
  }

  // Double-tap state
  private lastTapTime = 0;
  private tapTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly DOUBLE_TAP_DELAY = 300;

  seekRelative(seconds: number) {
    this.youtube.seekRelative(seconds);
    this.triggerFeedback(seconds < 0 ? 'rewind' : 'forward');
    this.showControls();
  }

  // Handle tap interaction: Single tap = toggle play/controls, Double tap = seek
  handleSeekTap(seconds: number) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.lastTapTime;

    if (tapLength < this.DOUBLE_TAP_DELAY && tapLength > 0) {
      // Double tap detected
      if (this.tapTimeout) clearTimeout(this.tapTimeout); // Cancel single tap action
      this.seekRelative(seconds);
    } else {
      // WaitFor double tap
      this.tapTimeout = setTimeout(() => {
        // Single tap action (toggle play/controls)
        this.togglePlay();
      }, this.DOUBLE_TAP_DELAY);
    }

    this.lastTapTime = currentTime;
  }

  // Handle zone tap (left/right) - single tap shows controls, double tap seeks
  handleZoneTap(seconds: number) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - this.lastTapTime;

    if (tapLength < this.DOUBLE_TAP_DELAY && tapLength > 0) {
      // Double tap = seek
      if (this.tapTimeout) clearTimeout(this.tapTimeout);
      this.seekRelative(seconds);
    } else {
      // Single tap = show controls (with delay to detect double tap)
      this.tapTimeout = setTimeout(() => {
        this.showControls();
      }, this.DOUBLE_TAP_DELAY);
    }

    this.lastTapTime = currentTime;
  }

  // Handle center tap - single tap always toggles play/pause
  handleCenterTap() {
    // No double-tap detection needed for center - just toggle immediately
    this.togglePlay();
  }

  private triggerFeedback(type: 'rewind' | 'forward') {
    if (type === 'rewind') {
      this.rewindFeedback.set(true);
      setTimeout(() => this.rewindFeedback.set(false), 500);
    } else {
      this.forwardFeedback.set(true);
      setTimeout(() => this.forwardFeedback.set(false), 500);
    }
  }

  loadVideo(): void {
    const url = this.videoUrl.trim();
    if (!url) {
      this.error.set('Please enter a YouTube URL');
      return;
    }

    const videoId = this.youtube.extractVideoId(url);

    if (!videoId) {
      this.error.set('Invalid YouTube URL');
      return;
    }

    // Navigate to /video?id=<videoId> - the video page will handle loading
    this.router.navigate(['/video'], { queryParams: { id: videoId } });
  }

  private async restorePlayer(videoId: string): Promise<void> {
    try {
      await this.youtube.initPlayer('youtube-player', videoId);
    } catch (err: unknown) {
      console.error('Failed to restore player:', err);
    }
  }

  /**
   * Wait for a DOM element to exist before proceeding
   * Polls for element with exponential backoff, max ~2 seconds
   */
  private waitForElement(elementId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 10;

      const check = () => {
        const element = document.getElementById(elementId);
        if (element) {
          resolve();
        } else if (attempts >= maxAttempts) {
          reject(new Error(`Element #${elementId} not found after ${maxAttempts} attempts`));
        } else {
          attempts++;
          // Exponential backoff: 50, 100, 150, 200, 250...
          setTimeout(check, 50 * attempts);
        }
      };

      // Start with requestAnimationFrame for initial check
      requestAnimationFrame(check);
    });
  }

  private fetchCaptions(videoId: string): void {
    const lang = this.settings.settings().language;

    // Unsubscribe previous request if any
    if (this.transcriptSubscription) {
      this.transcriptSubscription.unsubscribe();
    }

    this.transcriptSubscription = this.transcript.fetchTranscript(videoId, lang).subscribe({
      next: (cues) => {
        if (cues.length > 0) {
          this.subtitles.subtitles.set(cues);
          // Pre-tokenize all cues for consistent display
          this.subtitles.tokenizeAllCues(lang);
        }
      },
      error: (err) => console.log('Auto-caption fetch failed:', err)
    });
  }

  closeVideo(): void {
    if (this.transcriptSubscription) {
      this.transcriptSubscription.unsubscribe();
      this.transcriptSubscription = null;
    }
    this.subtitles.cancelTokenization();
    this.youtube.reset();
    this.subtitles.clear();
    this.transcript.reset(); // Crucial: clear loading/error states immediately
    this.videoUrl = '';
    this.error.set(null);
  }

  // Progress Bar Logic
  startSeeking(event: MouseEvent | TouchEvent) {
    this.isDragging.set(true);
    this.updateSeek(event);

    // Bind to document to handle drag outside
    const onMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault(); // Prevent scroll while seeking
      this.updateSeek(e);
    };

    const onUp = () => {
      this.stopSeeking();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchend', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp);
  }

  private updateSeek(event: MouseEvent | TouchEvent) {
    if (!this.youtube.duration()) return;

    const rect = this.progressBar.nativeElement.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, offsetX / rect.width));

    // Just update preview time, don't seek video yet
    this.previewTime.set(percentage * this.youtube.duration());
  }

  private stopSeeking() {
    if (this.isDragging()) {
      this.youtube.seekTo(this.previewTime());
      this.isDragging.set(false);
    }
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    this.clearControlsTimeout();
    this.youtube.destroy();
  }
}
