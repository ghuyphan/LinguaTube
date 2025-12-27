import {
  Component,
  inject,
  signal,
  OnDestroy,
  effect,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  HostListener,
  computed,
  output
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import {
  YoutubeService,
  SubtitleService,
  SettingsService,
  TranscriptService,
  VocabularyService,
  DictionaryService,
  I18nService
} from '../../services';
import { Token, SubtitleCue, DictionaryEntry } from '../../models';
import {
  PlaybackSpeed,
  PLAYBACK_SPEEDS,
  FONT_SIZES,
  CONTROLS_AUTO_HIDE_DELAY,
  CONTROLS_TAP_HIDE_DELAY,
  CONTROLS_VISIBLE_MIN_TIME,
  DOUBLE_TAP_DELAY,
  LONG_PRESS_DELAY,
  VOLUME_SLIDER_HIDE_DELAY,
  BUFFERED_TRACKING_INTERVAL,
  FEEDBACK_DURATION,
  SEEK_STEP,
  SWIPE_THRESHOLD,
  GESTURE_SEEK_SENSITIVITY,
  ZONE_LEFT_WIDTH,
  ZONE_RIGHT_WIDTH,
  VOLUME_GESTURE_ZONE,
  WAIT_ELEMENT_INTERVAL,
  WAIT_ELEMENT_MAX_ATTEMPTS,
  FullscreenDocument,
  FullscreenElement
} from './video-player.constants';

interface SeekPreview {
  visible: boolean;
  time: number;
  position: number;
}

@Component({
  selector: 'app-video-player',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnDestroy {
  private document = inject(DOCUMENT);
  private router = inject(Router);
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);
  transcript = inject(TranscriptService);
  settings = inject(SettingsService);
  vocab = inject(VocabularyService);
  private dictionary = inject(DictionaryService);
  i18n = inject(I18nService);

  // Outputs
  fullscreenWordClicked = output<{ token: Token; sentence: string }>();
  fullscreenChanged = output<boolean>();

  videoUrl = '';
  isLoading = signal(false);
  error = signal<string | null>(null);

  // UI State
  areControlsVisible = signal(true);
  isFullscreen = signal(false);
  isVolumeSliderVisible = signal(false);
  isSpeedMenuOpen = signal(false);
  volume = signal(100);
  currentSpeed = signal<PlaybackSpeed>(1);

  // Seeking State
  isDragging = signal(false);
  previewTime = signal(0);
  seekPreview = signal<SeekPreview>({ visible: false, time: 0, position: 0 });
  bufferedPercentage = signal(0);

  // Fullscreen popup state
  fsPopupVisible = signal(false);
  fsSelectedWord = signal<Token | null>(null);
  fsSelectedSentence = signal<string>('');
  fsEntry = signal<DictionaryEntry | null>(null);
  fsLookupLoading = signal(false);
  fsWordSaved = signal(false);

  // Playback speeds
  readonly playbackSpeeds = PLAYBACK_SPEEDS;

  displayTime = computed(() => {
    return this.isDragging() ? this.previewTime() : this.youtube.currentTime();
  });

  progressPercentage = computed(() => {
    const time = this.displayTime();
    const duration = this.youtube.duration();
    if (!duration) return 0;
    return (time / duration) * 100;
  });

  // Fullscreen tokens (computed for performance)
  fullscreenTokens = computed(() => {
    const cue = this.subtitles.currentCue();
    if (!cue) return [];
    const lang = this.settings.settings().language;
    return this.subtitles.getTokens(cue, lang);
  });

  // Fullscreen reading toggle
  showFsReading = computed(() => {
    const lang = this.settings.settings().language;
    return lang === 'ja'
      ? this.settings.settings().showFurigana
      : this.settings.settings().showPinyin;
  });

  // Feedback animations
  rewindFeedback = signal(false);
  forwardFeedback = signal(false);
  feedbackIconName = signal<'play' | 'pause'>('play');
  playPauseFeedback = signal(false);
  leftRipple = signal(false);
  rightRipple = signal(false);
  ripplePos = signal({ x: 0, y: 0 });

  // Cumulative seek for double-tap
  seekAccumulator = signal(0);
  seekDirection = signal<'left' | 'right' | null>(null);

  // Volume feedback
  volumeFeedback = signal(false);
  volumeFeedbackIcon = signal<'volume-2' | 'volume-1' | 'volume-x'>('volume-2');

  // Gesture seek feedback (for horizontal swipe)
  gestureSeekActive = signal(false);
  gestureSeekTime = signal(0);

  // Long press for 2x speed
  longPressActive = signal(false);
  private longPressSpeed: PlaybackSpeed = 1;



  private controlsTimeout: ReturnType<typeof setTimeout> | null = null;
  private volumeSliderTimeout: ReturnType<typeof setTimeout> | null = null;

  // Double-tap tracking for desktop
  private doubleTapTimeout: ReturnType<typeof setTimeout> | null = null;
  private seekFeedbackTimeout: ReturnType<typeof setTimeout> | null = null;

  // Long press
  private longPressTimeout: ReturnType<typeof setTimeout> | null = null;

  private bufferedInterval: ReturnType<typeof setInterval> | null = null;

  // Bound event handlers for seeking (to allow proper cleanup)
  private readonly boundOnSeekMove = this.onSeekMove.bind(this);
  private readonly boundOnSeekUp = this.onSeekUp.bind(this);

  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;
  @ViewChild('videoContainer') videoContainerRef!: ElementRef<HTMLDivElement>;

  // Keyboard controls
  clearUrl() {
    this.videoUrl = '';
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.youtube.currentVideo()) return;

    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    // Close fullscreen popup on Escape
    if (event.code === 'Escape') {
      if (this.fsPopupVisible()) {
        this.closeFsPopup();
        return;
      }
      if (this.isFullscreen()) {
        this.toggleFullscreen();
        return;
      }
    }

    switch (event.code) {
      case 'Space':
      case 'KeyK':
        event.preventDefault();
        this.togglePlay();
        this.showPlayPauseFeedback();
        break;
      case 'ArrowLeft':
      case 'KeyJ':
        event.preventDefault();
        this.seekRelative(-SEEK_STEP);
        this.showSeekFeedback('left', SEEK_STEP);
        break;
      case 'ArrowRight':
      case 'KeyL':
        event.preventDefault();
        this.seekRelative(SEEK_STEP);
        this.showSeekFeedback('right', SEEK_STEP);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.adjustVolume(5);
        this.showVolumeFeedback();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.adjustVolume(-5);
        this.showVolumeFeedback();
        break;
      case 'KeyM':
        this.toggleMute();
        break;
      case 'KeyF':
        this.toggleFullscreen();
        break;
      case 'Digit0':
      case 'Numpad0':
        event.preventDefault();
        this.youtube.seekTo(0);
        break;
      case 'Digit1':
      case 'Digit2':
      case 'Digit3':
      case 'Digit4':
      case 'Digit5':
      case 'Digit6':
      case 'Digit7':
      case 'Digit8':
      case 'Digit9':
        event.preventDefault();
        const num = parseInt(event.code.replace('Digit', ''));
        this.youtube.seekTo((num / 10) * this.youtube.duration());
        break;
      case 'Home':
        event.preventDefault();
        this.youtube.seekTo(0);
        break;
      case 'End':
        event.preventDefault();
        this.youtube.seekTo(this.youtube.duration());
        break;
      case 'Comma':
        if (event.shiftKey) this.decreaseSpeed();
        break;
      case 'Period':
        if (event.shiftKey) this.increaseSpeed();
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.speed-control')) {
      this.isSpeedMenuOpen.set(false);
    }

    // Hide controls when clicking outside the video player
    if (this.youtube.currentVideo() && this.areControlsVisible()) {
      const videoContainer = this.videoContainerRef?.nativeElement;
      if (videoContainer && !videoContainer.contains(target)) {
        this.areControlsVisible.set(false);
        this.clearControlsTimeout();
      }
    }
  }

  @HostListener('document:fullscreenchange')
  @HostListener('document:webkitfullscreenchange')
  onFullscreenChange() {
    const isFs = !!(this.document.fullscreenElement || (this.document as any).webkitFullscreenElement);
    this.isFullscreen.set(isFs);
    this.fullscreenChanged.emit(isFs);
    if (!isFs && this.fsPopupVisible()) {
      this.closeFsPopup();
    }
  }

  constructor() {

    effect(() => {
      const currentVideo = this.youtube.currentVideo();
      if (currentVideo && !this.youtube.isReady() && !this.isLoading()) {
        const savedTime = this.youtube.currentTime();
        this.waitForElement('youtube-player').then(async () => {
          await this.restorePlayer(currentVideo.id);
          if (savedTime > 0) {
            this.youtube.seekTo(savedTime);
          }
        });
      }
    });

    effect(() => {
      if (this.youtube.isReady()) {
        this.volume.set(this.youtube.getVolume());
        this.currentSpeed.set(this.youtube.getPlaybackRate() as PlaybackSpeed);
        this.startBufferedTracking();
      }
    });

    effect(() => {
      if (!this.youtube.currentVideo()) {
        this.videoUrl = '';
      }
    });

    effect(() => {
      const isPlaying = this.youtube.isPlaying();
      if (isPlaying) {
        // When video starts playing, start auto-hide countdown
        // but don't immediately hide or show controls
        this.startBufferedTracking();
        // Only start auto-hide if controls are currently visible
        if (this.areControlsVisible()) {
          this.hideControlsAfterDelay(3000);
        }
      } else {
        // When video pauses, show controls and stop auto-hide
        this.areControlsVisible.set(true);
        this.lastControlsShowTime = Date.now();
        this.clearControlsTimeout();
        this.stopBufferedTracking();
      }
    });
  }

  // ============================================
  // CONTROLS VISIBILITY
  // ============================================

  onUserActivity() {
    this.showControls();
  }

  onMouseLeave() {
    // Hide controls immediately when mouse leaves (like YouTube)
    if (this.youtube.isPlaying() && !this.isSpeedMenuOpen() && !this.fsPopupVisible() && !this.isDragging()) {
      this.areControlsVisible.set(false);
      this.clearControlsTimeout();
    }
  }

  private showControls() {
    this.areControlsVisible.set(true);
    this.clearControlsTimeout();
    this.startControlsAutoHide();
  }

  private startControlsAutoHide() {
    if (this.youtube.isPlaying() && !this.isSpeedMenuOpen() && !this.fsPopupVisible()) {
      this.hideControlsAfterDelay(3000);
    }
  }

  private hideControlsAfterDelay(ms: number) {
    this.clearControlsTimeout();
    this.controlsTimeout = setTimeout(() => {
      if (this.youtube.isPlaying() && !this.isSpeedMenuOpen() && !this.fsPopupVisible() && !this.isDragging()) {
        this.areControlsVisible.set(false);
      }
    }, ms);
  }

  private clearControlsTimeout() {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
      this.controlsTimeout = null;
    }
  }

  // ============================================
  // PLAYBACK CONTROLS
  // ============================================

  togglePlay() {
    this.youtube.togglePlay();
    this.showPlayPauseFeedback();
    this.showControls();
  }

  private showPlayPauseFeedback() {
    this.feedbackIconName.set(this.youtube.isPlaying() ? 'pause' : 'play');
    this.playPauseFeedback.set(true);
    setTimeout(() => this.playPauseFeedback.set(false), 400);
  }

  seekRelative(seconds: number) {
    this.youtube.seekRelative(seconds);
    this.showControls();
  }

  showSeekFeedback(direction: 'left' | 'right', seconds: number) {
    // If same direction, accumulate
    if (this.seekDirection() === direction && this.seekFeedbackTimeout) {
      this.seekAccumulator.update(v => v + seconds);
    } else {
      this.seekAccumulator.set(seconds);
      this.seekDirection.set(direction);
    }

    // Clear existing timeout
    if (this.seekFeedbackTimeout) {
      clearTimeout(this.seekFeedbackTimeout);
    }

    // Show feedback
    if (direction === 'left') {
      this.rewindFeedback.set(false);
      requestAnimationFrame(() => this.rewindFeedback.set(true));
    } else {
      this.forwardFeedback.set(false);
      requestAnimationFrame(() => this.forwardFeedback.set(true));
    }

    // Reset after animation
    this.seekFeedbackTimeout = setTimeout(() => {
      this.rewindFeedback.set(false);
      this.forwardFeedback.set(false);
      this.seekAccumulator.set(0);
      this.seekDirection.set(null);
      this.seekFeedbackTimeout = null;
    }, 800);
  }

  // ============================================
  // UNIFIED MOBILE TOUCH HANDLING
  // Works the same in fullscreen and non-fullscreen
  // YouTube-like behavior:
  //   - Single tap: toggle controls
  //   - Double tap left/right: seek ±10s
  //   - Horizontal swipe: scrub through video
  //   - Vertical swipe (right side): volume
  //   - Long press: 2x speed
  // ============================================

  private touchState = {
    startX: 0,
    startY: 0,
    startTime: 0,
    hasMoved: false,
    initialVideoTime: 0,
    initialVolume: 0
  };

  // Track last tap time per zone for double-tap detection
  private lastTapInfo: { zone: string; time: number } | null = null;
  private tapTimeout: ReturnType<typeof setTimeout> | null = null;

  onOverlayTouchStart(event: TouchEvent) {
    if (event.touches.length !== 1) return;

    const touch = event.touches[0];
    this.touchState = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
      hasMoved: false,
      initialVideoTime: this.youtube.currentTime(),
      initialVolume: this.volume()
    };

    // Start long press timer
    this.cancelLongPress();
    this.longPressTimeout = setTimeout(() => {
      this.activateLongPress();
    }, LONG_PRESS_DELAY);
  }

  onOverlayTouchMove(event: TouchEvent) {
    if (event.touches.length !== 1) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - this.touchState.startX;
    const deltaY = touch.clientY - this.touchState.startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Mark as moved if past threshold
    if (absX > SWIPE_THRESHOLD || absY > SWIPE_THRESHOLD) {
      this.touchState.hasMoved = true;
      // Cancel long press if user starts moving
      this.cancelLongPress();
    }

    // Handle horizontal swipe (seek scrub)
    if (this.touchState.hasMoved && absX > absY) {
      event.preventDefault();
      const seekDelta = deltaX * GESTURE_SEEK_SENSITIVITY;
      const newTime = Math.max(0, Math.min(this.youtube.duration(), this.touchState.initialVideoTime + seekDelta));
      this.gestureSeekActive.set(true);
      this.gestureSeekTime.set(newTime);
    }

    // Handle vertical swipe on right side (volume) - DISABLED for mobile per user request
    /*
    if (this.touchState.hasMoved && absY > absX && this.touchState.startX > window.innerWidth * VOLUME_GESTURE_ZONE) {
      event.preventDefault();
      const volumeDelta = -deltaY * 0.5;
      const newVolume = Math.max(0, Math.min(100, this.touchState.initialVolume + volumeDelta));
      this.volume.set(Math.round(newVolume));
      this.youtube.setVolume(Math.round(newVolume));
      this.showVolumeFeedback();
    }
    */
  }

  onOverlayTouchEnd(event: TouchEvent) {

    // Cancel long press
    this.cancelLongPress();
    this.deactivateLongPress();

    // Handle gesture seek completion
    if (this.gestureSeekActive()) {
      this.youtube.seekTo(this.gestureSeekTime());
      this.gestureSeekActive.set(false);
      return;
    }

    // If user moved, it was a swipe - don't handle as tap
    if (this.touchState.hasMoved) {
      return;
    }

    // Handle tap
    const touch = event.changedTouches[0];
    this.handleTap(touch.clientX, touch.clientY);
  }

  private handleTap(clientX: number, clientY: number) {
    const container = this.videoContainerRef?.nativeElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;
    const width = rect.width;

    // Simple 50/50 split: left half = seek backward, right half = seek forward
    const zone: 'left' | 'right' = relativeX < width * 0.5 ? 'left' : 'right';

    const now = Date.now();

    // Check for double-tap (same zone, within time threshold)
    if (this.lastTapInfo &&
      this.lastTapInfo.zone === zone &&
      now - this.lastTapInfo.time < DOUBLE_TAP_DELAY) {

      // Double-tap detected - cancel pending single tap
      if (this.tapTimeout) {
        clearTimeout(this.tapTimeout);
        this.tapTimeout = null;
      }
      this.lastTapInfo = null;

      // Execute double-tap action: seek in the tapped direction
      if (zone === 'left') {
        this.seekRelative(-SEEK_STEP);
        this.showSeekFeedback('left', SEEK_STEP);
        this.triggerRipple(relativeX, relativeY, 'left');
      } else {
        this.seekRelative(SEEK_STEP);
        this.showSeekFeedback('right', SEEK_STEP);
        this.triggerRipple(relativeX, relativeY, 'right');
      }

    } else {
      // First tap - store info and wait to see if double-tap follows
      this.lastTapInfo = { zone, time: now };

      // Cancel any existing timeout
      if (this.tapTimeout) {
        clearTimeout(this.tapTimeout);
      }

      // Set timeout for single-tap action
      this.tapTimeout = setTimeout(() => {
        this.tapTimeout = null;
        this.lastTapInfo = null;
        // Single tap anywhere = toggle controls
        this.toggleControlsVisibility();
      }, DOUBLE_TAP_DELAY);
    }
  }

  private cancelPendingSingleTap() {
    if (this.tapTimeout) {
      clearTimeout(this.tapTimeout);
      this.tapTimeout = null;
    }
    this.lastTapInfo = null;
  }

  // Desktop double-click tracking
  private lastDesktopClickTime = 0;

  onOverlayClick(event: MouseEvent) {
    // This handler is only attached to the desktop overlay (hover-only)
    // so we don't need any touch detection guards
    const now = Date.now();
    const isDoubleClick = now - this.lastDesktopClickTime < DOUBLE_TAP_DELAY;
    this.lastDesktopClickTime = now;

    if (isDoubleClick) {
      // Double-click anywhere = fullscreen
      if (this.doubleTapTimeout) {
        clearTimeout(this.doubleTapTimeout);
        this.doubleTapTimeout = null;
      }
      this.toggleFullscreen();
    } else {
      // Single click - wait briefly to check for double-click
      this.doubleTapTimeout = setTimeout(() => {
        this.togglePlay();
        this.showPlayPauseFeedback();
        this.doubleTapTimeout = null;
      }, DOUBLE_TAP_DELAY);
    }
  }

  private triggerRipple(x: number, y: number, zone: 'left' | 'right') {
    this.ripplePos.set({ x, y });
    if (zone === 'left') {
      this.leftRipple.set(false);
      requestAnimationFrame(() => {
        this.leftRipple.set(true);
        setTimeout(() => this.leftRipple.set(false), 600);
      });
    } else {
      this.rightRipple.set(false);
      requestAnimationFrame(() => {
        this.rightRipple.set(true);
        setTimeout(() => this.rightRipple.set(false), 600);
      });
    }
  }

  private lastControlsShowTime = 0;

  private toggleControlsVisibility() {
    // Single tap: just show controls (they auto-hide after delay when playing)
    this.areControlsVisible.set(true);
    this.lastControlsShowTime = Date.now();
    this.clearControlsTimeout();

    // Start auto-hide if video is playing
    if (this.youtube.isPlaying()) {
      this.hideControlsAfterDelay(3000);
    }
  }

  // Long press for 2x speed
  private activateLongPress() {
    if (!this.youtube.isPlaying()) return;
    this.longPressSpeed = this.currentSpeed();
    this.longPressActive.set(true);
    this.youtube.setPlaybackRate(2);
  }

  private deactivateLongPress() {
    if (this.longPressActive()) {
      this.youtube.setPlaybackRate(this.longPressSpeed);
      this.longPressActive.set(false);
    }
  }

  private cancelLongPress() {
    if (this.longPressTimeout) {
      clearTimeout(this.longPressTimeout);
      this.longPressTimeout = null;
    }
  }

  // FIXED: Touch on play/pause button - prevent event propagation properly
  onPlayPauseButtonTouch(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    // Cancel any pending tap actions
    this.cancelPendingSingleTap();
    this.togglePlay();
    // Keep controls visible for a bit after tapping play button
    this.lastControlsShowTime = Date.now();
    this.clearControlsTimeout();
    this.hideControlsAfterDelay(3000);
  }

  // Click on play/pause button (desktop)
  onPlayPauseButtonClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    // Cancel any pending double-tap check
    if (this.doubleTapTimeout) {
      clearTimeout(this.doubleTapTimeout);
      this.doubleTapTimeout = null;
    }
    this.togglePlay();
  }

  // FIXED: Replay button - prevent event propagation
  onReplayClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.cancelPendingSingleTap();
    if (this.doubleTapTimeout) {
      clearTimeout(this.doubleTapTimeout);
      this.doubleTapTimeout = null;
    }
    this.youtube.seekTo(0);
    this.youtube.play();
  }

  // ============================================
  // VOLUME CONTROL
  // ============================================

  toggleMute() {
    if (this.youtube.isMuted() || this.volume() === 0) {
      this.youtube.unmute();
      if (this.volume() === 0) {
        this.youtube.setVolume(50);
        this.volume.set(50);
      }
    } else {
      this.youtube.mute();
    }
    this.showControls();
    this.showVolumeFeedback();
  }

  getVolumeIcon(): 'volume-2' | 'volume-1' | 'volume-x' {
    if (this.youtube.isMuted() || this.volume() === 0) return 'volume-x';
    if (this.volume() < 50) return 'volume-1';
    return 'volume-2';
  }

  showVolumeSlider() {
    if (this.volumeSliderTimeout) clearTimeout(this.volumeSliderTimeout);
    this.isVolumeSliderVisible.set(true);
  }

  hideVolumeSlider() {
    this.volumeSliderTimeout = setTimeout(() => {
      this.isVolumeSliderVisible.set(false);
    }, 500);
  }

  onVolumeChange(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value);
    this.volume.set(value);
    this.youtube.setVolume(value);
    if (value > 0 && this.youtube.isMuted()) {
      this.youtube.unmute();
    }
  }

  private adjustVolume(delta: number) {
    const newVolume = Math.max(0, Math.min(100, this.volume() + delta));
    this.volume.set(newVolume);
    this.youtube.setVolume(newVolume);
    if (newVolume > 0 && this.youtube.isMuted()) {
      this.youtube.unmute();
    }
  }

  private showVolumeFeedback() {
    const vol = this.volume();
    if (vol === 0 || this.youtube.isMuted()) {
      this.volumeFeedbackIcon.set('volume-x');
    } else if (vol < 50) {
      this.volumeFeedbackIcon.set('volume-1');
    } else {
      this.volumeFeedbackIcon.set('volume-2');
    }
    this.volumeFeedback.set(true);
    setTimeout(() => this.volumeFeedback.set(false), 600);
  }

  // ============================================
  // PLAYBACK SPEED
  // ============================================

  toggleSpeedMenu(event: Event) {
    event.stopPropagation();
    this.isSpeedMenuOpen.update(v => !v);
    this.showControls();
  }

  setPlaybackSpeed(speed: PlaybackSpeed) {
    this.currentSpeed.set(speed);
    this.youtube.setPlaybackRate(speed);
    this.isSpeedMenuOpen.set(false);
  }

  private increaseSpeed() {
    const currentIndex = this.playbackSpeeds.indexOf(this.currentSpeed());
    if (currentIndex < this.playbackSpeeds.length - 1) {
      this.setPlaybackSpeed(this.playbackSpeeds[currentIndex + 1]);
    }
  }

  private decreaseSpeed() {
    const currentIndex = this.playbackSpeeds.indexOf(this.currentSpeed());
    if (currentIndex > 0) {
      this.setPlaybackSpeed(this.playbackSpeeds[currentIndex - 1]);
    }
  }

  // ============================================
  // FULLSCREEN
  // ============================================

  async toggleFullscreen() {
    const container = this.videoContainerRef?.nativeElement;
    if (!container) return;

    const doc = this.document as any;
    const elem = container as any;

    // Check if we're currently in fullscreen (cross-browser)
    const isCurrentlyFullscreen = !!(doc.fullscreenElement || doc.webkitFullscreenElement);

    try {
      if (isCurrentlyFullscreen) {
        // Exit fullscreen (cross-browser)
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
        try { (screen.orientation as any)?.unlock?.(); } catch { }
      } else {
        // Enter fullscreen (cross-browser)
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        }
        try { await (screen.orientation as any)?.lock?.('landscape'); } catch { }
      }
    } catch (err) {
      // Fallback for iOS Safari which doesn't support standard fullscreen
      const newState = !this.isFullscreen();
      this.isFullscreen.set(newState);
      this.fullscreenChanged.emit(newState);
    }
  }

  // ============================================
  // FULLSCREEN WORD POPUP
  // ============================================

  onFullscreenWordClick(token: Token, sentence: string, event: Event): void {
    event.stopPropagation();

    if (this.youtube.isPlaying()) {
      this.youtube.pause();
    }

    if (!this.isFullscreen()) {
      this.fullscreenWordClicked.emit({ token, sentence });
      return;
    }

    this.fsSelectedWord.set(token);
    this.fsSelectedSentence.set(sentence);
    this.fsPopupVisible.set(true);
    this.fsWordSaved.set(this.vocab.hasWord(token.surface));
    this.fsEntry.set(null);

    this.fsLookupLoading.set(true);
    const lang = this.settings.settings().language;
    this.dictionary.lookup(token.surface, lang).subscribe({
      next: (entry) => {
        this.fsEntry.set(entry);
        this.fsLookupLoading.set(false);
      },
      error: () => this.fsLookupLoading.set(false)
    });

    this.showControls();
  }

  closeFsPopup(): void {
    this.fsPopupVisible.set(false);
    this.fsSelectedWord.set(null);
    this.fsEntry.set(null);
  }

  saveFsWord(): void {
    const word = this.fsSelectedWord();
    const entry = this.fsEntry();
    const lang = this.settings.settings().language;
    const sentence = this.fsSelectedSentence();

    if (!word) return;

    if (entry) {
      this.vocab.addFromDictionary(entry, lang, sentence);
    } else {
      this.vocab.addWord(word.surface, '', lang, word.reading, word.pinyin, word.romanization, sentence);
    }

    this.fsWordSaved.set(true);
  }

  resumeAndClose(): void {
    this.closeFsPopup();
    this.youtube.play();
  }

  // ============================================
  // FONT SIZE CONTROL
  // ============================================

  readonly fontSizes: ('small' | 'medium' | 'large' | 'xlarge')[] = ['small', 'medium', 'large', 'xlarge'];

  cycleFontSize(): void {
    const current = this.settings.settings().fontSize;
    const currentIndex = this.fontSizes.indexOf(current);
    const nextIndex = (currentIndex + 1) % this.fontSizes.length;
    this.settings.setFontSize(this.fontSizes[nextIndex]);
  }

  getFontSizeIcon(): string {
    const size = this.settings.settings().fontSize;
    switch (size) {
      case 'small': return 'type';
      case 'medium': return 'type';
      case 'large': return 'type';
      case 'xlarge': return 'type';
      default: return 'type';
    }
  }

  getFontSizeLabel(): string {
    const size = this.settings.settings().fontSize;
    switch (size) {
      case 'small': return 'S';
      case 'medium': return 'M';
      case 'large': return 'L';
      case 'xlarge': return 'XL';
      default: return 'M';
    }
  }

  // ============================================
  // PROGRESS BAR
  // ============================================

  updateSeekPreview(event: MouseEvent) {
    if (!this.youtube.duration() || !this.progressBar?.nativeElement) return;

    const rect = this.progressBar.nativeElement.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
    const time = percentage * this.youtube.duration();

    this.seekPreview.set({
      visible: true,
      time,
      position: Math.max(30, Math.min(rect.width - 30, offsetX))
    });
  }

  hideSeekPreview() {
    if (!this.isDragging()) {
      this.seekPreview.set({ visible: false, time: 0, position: 0 });
    }
  }

  startSeeking(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.showControls();
    this.isDragging.set(true);
    this.updateSeek(event);

    document.addEventListener('mousemove', this.boundOnSeekMove);
    document.addEventListener('touchmove', this.boundOnSeekMove, { passive: false });
    document.addEventListener('mouseup', this.boundOnSeekUp);
    document.addEventListener('touchend', this.boundOnSeekUp);
  }

  private onSeekMove(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    this.updateSeek(e);
  }

  private onSeekUp() {
    this.stopSeeking();
    document.removeEventListener('mousemove', this.boundOnSeekMove);
    document.removeEventListener('touchmove', this.boundOnSeekMove);
    document.removeEventListener('mouseup', this.boundOnSeekUp);
    document.removeEventListener('touchend', this.boundOnSeekUp);
  }

  private updateSeek(event: MouseEvent | TouchEvent) {
    if (!this.youtube.duration() || !this.progressBar?.nativeElement) return;

    const rect = this.progressBar.nativeElement.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, offsetX / rect.width));

    this.previewTime.set(percentage * this.youtube.duration());

    // Update preview tooltip
    this.seekPreview.set({
      visible: true,
      time: this.previewTime(),
      position: Math.max(30, Math.min(rect.width - 30, offsetX))
    });
  }

  private stopSeeking() {
    if (this.isDragging()) {
      this.youtube.seekTo(this.previewTime());
      this.isDragging.set(false);
      this.hideSeekPreview();
    }
  }

  // ============================================
  // BUFFERED TRACKING
  // ============================================

  private startBufferedTracking() {
    if (this.bufferedInterval) return; // Already tracking

    this.bufferedInterval = setInterval(() => {
      const loadedFraction = this.getLoadedFraction();
      this.bufferedPercentage.set(loadedFraction * 100);
    }, BUFFERED_TRACKING_INTERVAL);
  }

  private stopBufferedTracking() {
    if (this.bufferedInterval) {
      clearInterval(this.bufferedInterval);
      this.bufferedInterval = null;
    }
  }

  private getLoadedFraction(): number {
    const duration = this.youtube.duration();
    const currentTime = this.youtube.currentTime();
    if (!duration) return 0;
    const bufferedTime = Math.min(currentTime + 30, duration);
    return bufferedTime / duration;
  }

  // ============================================
  // VIDEO LOADING
  // ============================================

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

    this.router.navigate(['/video'], { queryParams: { id: videoId } });
    this.videoUrl = '';
  }

  private async restorePlayer(videoId: string): Promise<void> {
    try {
      await this.youtube.initPlayer('youtube-player', videoId);
    } catch (err) {
      console.error('Failed to restore player:', err);
    }
  }

  private waitForElement(elementId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 20;

      const check = () => {
        const element = document.getElementById(elementId);
        if (element) {
          resolve();
        } else if (attempts >= maxAttempts) {
          reject(new Error(`Element #${elementId} not found`));
        } else {
          attempts++;
          setTimeout(check, 50);
        }
      };

      requestAnimationFrame(check);
    });
  }

  closeVideo(): void {
    this.subtitles.cancelTokenization();
    this.youtube.reset();
    this.subtitles.clear();
    this.transcript.reset();
    this.videoUrl = '';
    this.error.set(null);
    this.router.navigate(['/video'], { replaceUrl: true });
  }

  // ============================================
  // FULLSCREEN SUBTITLE
  // ============================================

  getFullscreenTokens(cue: SubtitleCue): Token[] {
    const lang = this.settings.settings().language;
    return this.subtitles.getTokens(cue, lang);
  }

  getFullscreenReading(token: Token): string | undefined {
    const lang = this.settings.settings().language;
    if (lang === 'ja') return token.reading;
    if (lang === 'zh') return token.pinyin;
    return token.romanization || token.pinyin;
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    this.clearControlsTimeout();
    this.cancelLongPress();
    this.cancelPendingSingleTap();
    if (this.volumeSliderTimeout) clearTimeout(this.volumeSliderTimeout);
    if (this.bufferedInterval) clearInterval(this.bufferedInterval);
    if (this.seekFeedbackTimeout) clearTimeout(this.seekFeedbackTimeout);
    if (this.doubleTapTimeout) clearTimeout(this.doubleTapTimeout);
    this.youtube.destroy();
  }
}