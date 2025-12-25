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
import { Subscription } from 'rxjs';

type PlaybackSpeed = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;

interface SeekPreview {
  visible: boolean;
  time: number;
  position: number;
}

interface GestureState {
  startX: number;
  startY: number;
  startTime: number;
  isHorizontalSwipe: boolean;
  isVerticalSwipe: boolean;
  initialVideoTime: number;
  initialVolume: number;
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
  readonly playbackSpeeds: PlaybackSpeed[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Seek step in seconds
  readonly SEEK_STEP = 10;

  displayTime = computed(() => {
    return this.isDragging() ? this.previewTime() : this.youtube.currentTime();
  });

  progressPercentage = computed(() => {
    const time = this.displayTime();
    const duration = this.youtube.duration();
    if (!duration) return 0;
    return (time / duration) * 100;
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

  // Touch detection
  isTouchDevice = false;

  private controlsTimeout: ReturnType<typeof setTimeout> | null = null;
  private volumeSliderTimeout: ReturnType<typeof setTimeout> | null = null;

  // Double-tap tracking
  private lastTapTime: Record<string, number> = { left: 0, right: 0, center: 0 };
  private doubleTapTimeout: ReturnType<typeof setTimeout> | null = null;
  private seekFeedbackTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly DOUBLE_TAP_DELAY = 300;

  // Long press
  private longPressTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly LONG_PRESS_DELAY = 500;

  // Gesture state
  private gesture: GestureState | null = null;
  private readonly SWIPE_THRESHOLD = 15;
  private readonly GESTURE_SEEK_SENSITIVITY = 0.15; // seconds per pixel

  private bufferedInterval: ReturnType<typeof setInterval> | null = null;
  private transcriptSubscription: Subscription | null = null;

  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;
  @ViewChild('videoContainer') videoContainerRef!: ElementRef<HTMLDivElement>;

  // Keyboard controls
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
        this.seekRelative(-this.SEEK_STEP);
        this.showSeekFeedback('left', this.SEEK_STEP);
        break;
      case 'ArrowRight':
      case 'KeyL':
        event.preventDefault();
        this.seekRelative(this.SEEK_STEP);
        this.showSeekFeedback('right', this.SEEK_STEP);
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
    if (typeof window !== 'undefined') {
      this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

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
      if (this.youtube.isPlaying()) {
        this.startControlsAutoHide();
      } else {
        this.areControlsVisible.set(true);
        this.clearControlsTimeout();
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
  // TOUCH/CLICK ZONE HANDLING
  // ============================================

  onOverlayTouchStart(event: TouchEvent) {
    if (event.touches.length !== 1) return;

    const touch = event.touches[0];
    this.gesture = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
      isHorizontalSwipe: false,
      isVerticalSwipe: false,
      initialVideoTime: this.youtube.currentTime(),
      initialVolume: this.volume()
    };
    // Long press removed for simpler tap detection
  }

  onOverlayTouchMove(event: TouchEvent) {
    if (!this.gesture || event.touches.length !== 1) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - this.gesture.startX;
    const deltaY = touch.clientY - this.gesture.startY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Determine swipe direction
    if (!this.gesture.isHorizontalSwipe && !this.gesture.isVerticalSwipe) {
      if (absX > this.SWIPE_THRESHOLD || absY > this.SWIPE_THRESHOLD) {
        if (absX > absY) {
          this.gesture.isHorizontalSwipe = true;
        } else {
          this.gesture.isVerticalSwipe = true;
        }
      }
    }

    // Handle horizontal swipe (seek)
    if (this.gesture.isHorizontalSwipe) {
      event.preventDefault();
      const seekDelta = deltaX * this.GESTURE_SEEK_SENSITIVITY;
      const newTime = Math.max(0, Math.min(this.youtube.duration(), this.gesture.initialVideoTime + seekDelta));
      this.gestureSeekActive.set(true);
      this.gestureSeekTime.set(newTime);
    }

    // Handle vertical swipe on right side (volume)
    if (this.gesture.isVerticalSwipe && this.gesture.startX > window.innerWidth * 0.6) {
      event.preventDefault();
      const volumeDelta = -deltaY * 0.5;
      const newVolume = Math.max(0, Math.min(100, this.gesture.initialVolume + volumeDelta));
      this.volume.set(Math.round(newVolume));
      this.youtube.setVolume(Math.round(newVolume));
      this.showVolumeFeedback();
    }
  }

  onOverlayTouchEnd(event: TouchEvent) {
    // Handle gesture seek completion
    if (this.gestureSeekActive()) {
      this.youtube.seekTo(this.gestureSeekTime());
      this.gestureSeekActive.set(false);
      this.gesture = null;
      return;
    }

    // Handle tap (no significant movement)
    if (this.gesture && !this.gesture.isHorizontalSwipe && !this.gesture.isVerticalSwipe) {
      const touch = event.changedTouches[0];
      this.handleTap(touch.clientX, touch.clientY, event);
    }

    this.gesture = null;
  }

  private handleTap(clientX: number, clientY: number, event: Event) {
    const container = this.videoContainerRef?.nativeElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const width = rect.width;

    // Determine zone (30% left, 40% center, 30% right)
    let zone: 'left' | 'center' | 'right';
    if (relativeX < width * 0.3) {
      zone = 'left';
    } else if (relativeX > width * 0.7) {
      zone = 'right';
    } else {
      zone = 'center';
    }

    const now = Date.now();
    const lastTap = this.lastTapTime[zone] || 0;
    const timeSinceLastTap = now - lastTap;
    this.lastTapTime[zone] = now;

    // Check if this is a double-tap (second tap within threshold)
    const isDoubleTap = timeSinceLastTap < this.DOUBLE_TAP_DELAY;

    if (this.isTouchDevice) {
      // MOBILE: Instant response approach
      if (isDoubleTap && (zone === 'left' || zone === 'right')) {
        // Double-tap on sides: seek
        // The first tap already toggled controls, now we also seek
        if (zone === 'left') {
          this.seekRelative(-this.SEEK_STEP);
          this.showSeekFeedback('left', this.SEEK_STEP);
          this.triggerRipple(relativeX, clientY - rect.top, 'left');
        } else {
          this.seekRelative(this.SEEK_STEP);
          this.showSeekFeedback('right', this.SEEK_STEP);
          this.triggerRipple(relativeX, clientY - rect.top, 'right');
        }
      } else {
        // Single tap OR double-tap on center: toggle controls immediately
        this.toggleControlsVisibility();
      }
    } else {
      // DESKTOP: Simple click behavior
      if (isDoubleTap) {
        // Double-click anywhere = fullscreen
        if (this.doubleTapTimeout) {
          clearTimeout(this.doubleTapTimeout);
          this.doubleTapTimeout = null;
        }
        this.toggleFullscreen();
      } else if (!isDoubleTap) {
        // Single click - wait briefly to check for double-click on center
        this.doubleTapTimeout = setTimeout(() => {
          this.togglePlay();
          this.showPlayPauseFeedback();
          this.doubleTapTimeout = null;
        }, this.DOUBLE_TAP_DELAY);
      }
    }
  }

  onOverlayClick(event: MouseEvent) {
    // Only handle clicks on desktop
    if (this.isTouchDevice) return;

    const now = Date.now();
    const lastClick = this.lastTapTime['desktop'] || 0;
    const isDoubleClick = now - lastClick < this.DOUBLE_TAP_DELAY;
    this.lastTapTime['desktop'] = now;

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
      }, this.DOUBLE_TAP_DELAY);
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

  private toggleControlsVisibility() {
    if (this.areControlsVisible()) {
      // Always allow hiding controls on tap
      this.areControlsVisible.set(false);
      this.clearControlsTimeout();
    } else {
      this.showControls();
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

  // Touch on play/pause button
  onPlayPauseButtonTouch(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.togglePlay();
  }

  // Click on play/pause button (desktop)
  onPlayPauseButtonClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.togglePlay();
  }

  // Replay button
  onReplayClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
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
    this.isDragging.set(true);
    this.updateSeek(event);

    const onMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
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
    if (this.bufferedInterval) clearInterval(this.bufferedInterval);

    this.bufferedInterval = setInterval(() => {
      const loadedFraction = this.getLoadedFraction();
      this.bufferedPercentage.set(loadedFraction * 100);
    }, 1000);
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
    if (this.transcriptSubscription) {
      this.transcriptSubscription.unsubscribe();
      this.transcriptSubscription = null;
    }
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
    if (this.volumeSliderTimeout) clearTimeout(this.volumeSliderTimeout);
    if (this.bufferedInterval) clearInterval(this.bufferedInterval);
    if (this.seekFeedbackTimeout) clearTimeout(this.seekFeedbackTimeout);
    if (this.doubleTapTimeout) clearTimeout(this.doubleTapTimeout);
    this.youtube.destroy();
  }
}