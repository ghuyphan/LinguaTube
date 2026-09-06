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
  output,
  untracked,
  NgZone
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { GrammarPopupComponent } from '../../dictionary/grammar-popup/grammar-popup.component';
import { formatTime, getVolumeIcon } from '../../../core/utils';

import {
  YoutubeService,
  SubtitleService,
  SettingsService,
  TranscriptService,
  VocabularyService,
  DictionaryService,
  I18nService,
  GrammarService,
  TranslationService
} from '../../../services';
import { QuizService } from '../quiz.service';
import { PlaylistService } from '../../playlist/playlist.service';
import {
  Token,
  DictionaryEntry,
  GrammarPattern,
  GrammarMatch,
  SupportedLearningLanguage,
  SupportedGrammarLang
} from '../../../models';
import {
  PlaybackSpeed,
  PLAYBACK_SPEEDS,
  FontSize,
  FONT_SIZES,
  SEEK_STEP,
  FullscreenDocument,
  FullscreenElement,
  ScreenOrientationWithLock
} from './video-player.constants';
import { GestureHandlerService, GestureEvent } from './services/gesture-handler.service';
import { VideoKeyboardShortcutService } from './services/video-keyboard-shortcut.service';
import { ProgressBarComponent } from './components/progress-bar';
import { CenterControlsComponent } from './components/center-controls';
import { FullscreenSubtitleComponent } from './components/fullscreen-subtitle';
import { VideoBottomBarComponent } from './components/video-bottom-bar/video-bottom-bar.component';
import { VideoHeaderComponent } from './components/video-header/video-header.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-video-player',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent, GrammarPopupComponent, ProgressBarComponent, CenterControlsComponent, FullscreenSubtitleComponent, BottomSheetComponent, VideoBottomBarComponent, VideoHeaderComponent],
  providers: [GestureHandlerService],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnDestroy {
  private document = inject(DOCUMENT);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private ngZone = inject(NgZone);
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);
  transcript = inject(TranscriptService);
  settings = inject(SettingsService);
  vocab = inject(VocabularyService);
  private dictionary = inject(DictionaryService);
  quiz = inject(QuizService);
  i18n = inject(I18nService);
  grammar = inject(GrammarService);
  protected playlistService = inject(PlaylistService);
  translation = inject(TranslationService); // Made public for template
  private gestures = inject(GestureHandlerService);
  private keyboardShortcuts = inject(VideoKeyboardShortcutService);

  // Translation language state
  targetLang = computed(() => this.subtitles.dualSubtitleTargetLang());
  isCJKLanguage = computed(() => ['ja', 'zh', 'ko'].includes(this.settings.settings().language));

  onLangSelected(value: string): void {
    this.settings.setDualSubtitleTargetLang(value); // Update shared state
    this.subtitles.cueTranslations.set(new Map()); // Clear existing translations to show loading state
    this.settings.updateSettings({ showDualSubtitles: true }); // Auto-enable dual subs
  }

  disableDualSubtitles(): void {
    this.settings.updateSettings({ showDualSubtitles: false });
  }

  // Playlist navigation
  hasPlaylist = computed(() => !!this.playlistService.currentPlaylist());
  canPlayPrev = computed(() => {
    if (!this.hasPlaylist()) return false;
    return this.playlistService.currentIndex() > 0 || this.playlistService.isLooping();
  });
  canPlayNext = computed(() => {
    const playlist = this.playlistService.currentPlaylist();
    if (!playlist) return false;
    return this.playlistService.currentIndex() < playlist.videos.length - 1 || this.playlistService.isLooping();
  });

  // Outputs
  fullscreenWordClicked = output<{ token: Token; sentence: string }>();
  fullscreenChanged = output<boolean>();
  saveClicked = output<void>();
  playlistNext = output<void>();
  playlistPrev = output<void>();
  videoEnded = output<void>();

  videoUrl = '';
  isLoading = signal(false);
  error = signal<string | null>(null);

  // UI State
  areControlsVisible = signal(true);
  isFullscreen = signal(false);
  isVolumeSliderVisible = signal(false);
  isPlayerSettingsOpen = signal(false);
  playerSettingsView = signal<'main' | 'speed' | 'fontSize' | 'dualSub'>('main');
  isMobile = signal<boolean>(typeof window !== 'undefined' ? (window.innerWidth <= 768 || window.innerHeight <= 500) : false);
  readonly fontSizes = FONT_SIZES;
  volume = signal(100);
  volumePercent = computed(() => {
    return this.youtube.isMuted() ? 0 : this.volume();
  });
  currentSpeed = signal<PlaybackSpeed>((this.settings.settings().playbackSpeed as PlaybackSpeed) || 1);

  // Seeking State (managed by ProgressBarComponent, tracked here for visibility)
  isDragging = signal(false);

  @ViewChild('progressBarComponent') progressBarComponent!: ProgressBarComponent;

  // Fullscreen popup state
  fsPopupVisible = signal(false);
  fsSelectedWord = signal<Token | null>(null);
  fsSelectedSentence = signal<string>('');
  fsEntry = signal<DictionaryEntry | null>(null);
  fsLookupLoading = signal(false);
  fsWordSaved = signal(false);
  private fsLookupSub?: Subscription;



  // Playback speeds

  // Playback speeds
  readonly playbackSpeeds = PLAYBACK_SPEEDS;

  // Computed values
  displayTime = computed(() => {
    return this.youtube.currentTime();
  });

  formattedCurrentTime = computed(() => this.formatTime(this.displayTime()));
  formattedDuration = computed(() => this.formatTime(this.youtube.duration()));

  fontSizeClass = computed(() => {
    const size = this.settings.settings().fontSize;
    return `fs-${size}`;
  });

  progressPercentage = computed(() => {
    const time = this.displayTime();
    const duration = this.youtube.duration();
    if (!duration) return 0;
    return (time / duration) * 100;
  });

  activeSubtitleLanguage = computed<SupportedLearningLanguage>(() =>
    (this.subtitles.loadedLanguage() || this.settings.settings().language) as SupportedLearningLanguage
  );

  fullscreenTokens = computed(() => {
    const cue = this.subtitles.currentCue();
    if (!cue) return [];
    const lang = this.activeSubtitleLanguage();
    return this.subtitles.getTokens(cue, lang);
  });

  // Current translation for fullscreen
  currentTranslation = computed(() => {
    const cue = this.subtitles.currentCue();
    if (!cue) return null;
    return this.subtitles.cueTranslations().get(cue.id) || null;
  });

  // Grammar detection for fullscreen
  fsGrammarMatches = computed(() => {
    // Read reactive signal to auto-recompute when pattern lazy loading finishes
    this.grammar.loadedLanguages();

    const tokens = this.fullscreenTokens();
    if (tokens.length === 0 || !this.grammar.grammarModeEnabled()) return [];

    const lang = this.activeSubtitleLanguage();
    if (!lang || !['ja', 'zh', 'ko', 'en'].includes(lang)) return [];

    return this.grammar.detectPatterns(tokens, lang as 'ja' | 'zh' | 'ko' | 'en');
  });

  // Fullscreen grammar popup state
  fsGrammarPopupVisible = signal(false);
  fsSelectedGrammarPattern = signal<GrammarPattern | null>(null);
  private wasPlayingBeforeFsGrammar = false;

  // Feedback animations
  rewindFeedback = signal(false);
  forwardFeedback = signal(false);
  playPauseFeedback = signal(false);
  playPauseFeedbackIcon = signal<'play' | 'pause'>('play');
  private playPauseTimeout: ReturnType<typeof setTimeout> | null = null;

  // Speed and Caption OSD pills (YouTube style)
  speedFeedback = signal(false);
  speedFeedbackText = signal('');
  private speedFeedbackTimeout: ReturnType<typeof setTimeout> | null = null;

  captionFeedback = signal(false);
  captionFeedbackText = signal('');
  private captionFeedbackTimeout: ReturnType<typeof setTimeout> | null = null;

  // Shortcuts cheat sheet dialog
  showShortcutsDialog = signal(false);

  leftRipple = signal(false);
  rightRipple = signal(false);
  ripplePos = signal({ x: 0, y: 0 });

  // Cumulative seek for double-tap
  seekAccumulator = signal(0);
  seekDirection = signal<'left' | 'right' | null>(null);

  // Volume feedback
  volumeFeedback = signal(false);
  volumeFeedbackIcon = signal<'volume-2' | 'volume-1' | 'volume-x'>('volume-2');

  // Long press for 2x speed (signal exposed from GestureHandlerService)
  longPressActive = signal(false);

  // State transition animation tracking
  stateTransition = signal<'none' | 'to-video' | 'to-input'>('none');
  private hasInitialized = false;
  private previousHasVideo: boolean | null = null;

  private controlsTimeout: ReturnType<typeof setTimeout> | null = null;
  private volumeSliderTimeout: ReturnType<typeof setTimeout> | null = null;
  private doubleTapTimeout: ReturnType<typeof setTimeout> | null = null;

  // Track elements and handlers for ViewChild setters
  private _videoContainerEl: HTMLElement | null = null;
  private _playerOverlayEl: HTMLElement | null = null;

  private readonly _moveHandler = () => this.onUserActivity();
  private readonly _leaveHandler = () => this.onMouseLeave();
  private readonly _touchStartHandler = (e: Event) => this.onOverlayTouchStart(e as TouchEvent);
  private readonly _touchMoveHandler = (e: Event) => this.onOverlayTouchMove(e as TouchEvent);
  private readonly _touchEndHandler = (e: Event) => this.onOverlayTouchEnd(e as TouchEvent);

  // Event listener cleanup functions to prevent memory leaks
  private eventCleanupFns: (() => void)[] = [];

  // Bound event handlers for seeking

  private lastDesktopClickTime = 0;
  private lastControlsShowTime = 0;

  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;

  constructor() {
    // Proactively preload grammar patterns for active learning language in background
    effect(() => {
      const lang = this.activeSubtitleLanguage();
      if (lang && ['ja', 'zh', 'ko', 'en'].includes(lang) && this.grammar.grammarModeEnabled()) {
        this.grammar.preloadPatterns(lang as SupportedGrammarLang);
      }
    });

    // Initialize player when video exists but player isn't ready
    effect(() => {
      const currentVideo = this.youtube.currentVideo();
      const hasUrlId = !!this.route.snapshot.queryParamMap.get('id');
      // Only restore if we have a current video, URL explicitly has a video ID, player is NOT ready, and we are NOT in the middle of loading a new one
      if (hasUrlId && currentVideo && !this.youtube.isReady() && !this.isLoading() && !this.youtube.pendingVideoId()) {
        const savedTime = this.youtube.currentTime();
        this.waitForElement('youtube-player').then(async () => {
          await this.restorePlayer(currentVideo.id);
          if (savedTime > 0) {
            this.youtube.seekTo(savedTime);
          }
          // Enforce intended state after seek, as seek can sometimes trigger autoplay
          if (!this.youtube.intendedPlayingState()) {
            this.youtube.pause();
          }
        });
      }
    });

    // Sync speed reactively whenever youtube.playbackRate changes
    effect(() => {
      const rate = this.youtube.playbackRate();
      this.currentSpeed.set(rate as PlaybackSpeed);
    });

    // Sync volume when player is ready
    effect(() => {
      if (this.youtube.isReady()) {
        this.volume.set(this.youtube.getVolume());
        this.startBufferedTracking();
      }
    });

    // Clear URL when video is cleared
    effect(() => {
      if (!this.youtube.currentVideo()) {
        this.videoUrl = '';
      }
    });

    // Notify parent when video ends (for playlist auto-advance)
    effect(() => {
      if (this.youtube.isEnded()) {
        untracked(() => this.videoEnded.emit());
      }
    });

    // Handle play/pause state changes
    effect(() => {
      const isPlaying = this.youtube.intendedPlayingState();
      if (isPlaying) {
        this.startBufferedTracking();
        if (untracked(() => this.areControlsVisible())) {
          this.hideControlsAfterDelay(3000);
        }
      } else {
        this.areControlsVisible.set(true);
        this.lastControlsShowTime = Date.now();
        this.clearControlsTimeout();
        this.stopBufferedTracking();
      }
    });

    // Track state transitions for animations
    effect(() => {
      const hasVideo = !!this.youtube.currentVideo() || !!this.youtube.pendingVideoId();

      if (this.previousHasVideo === hasVideo) {
        return;
      }

      const isFirstRun = this.previousHasVideo === null;
      this.previousHasVideo = hasVideo;

      if (isFirstRun || !this.hasInitialized) {
        this.hasInitialized = true;
        return;
      }

      if (document.visibilityState === 'hidden') {
        return;
      }

      this.stateTransition.set(hasVideo ? 'to-video' : 'to-input');
      setTimeout(() => this.stateTransition.set('none'), 350);
    });

    // Auto-translate subtitles when dual subs enabled or language changes

    // Wire up keyboard shortcuts
    effect(() => {
      const sub = this.keyboardShortcuts.events$.subscribe(event => {
        this.ngZone.run(() => {
          this.handleKeyboardEvent(event);
        });
      });
      return () => sub.unsubscribe();
    });

    // Wire up touch gesture handler callback
    this.gestures.onGesture = (event) => {
      this.handleGestureEvent(event);
    };
  }

  private _videoContainerRef?: ElementRef<HTMLDivElement>;
  @ViewChild('videoContainer')
  get videoContainerRef(): ElementRef<HTMLDivElement> | undefined { return this._videoContainerRef; }
  set videoContainerRef(ref: ElementRef<HTMLDivElement> | undefined) {
    this._videoContainerRef = ref;
    this.ngZone.runOutsideAngular(() => {
      if (this._videoContainerEl) {
        this._videoContainerEl.removeEventListener('mousemove', this._moveHandler);
        this._videoContainerEl.removeEventListener('mouseleave', this._leaveHandler);
      }
      this._videoContainerEl = ref?.nativeElement || null;
      if (this._videoContainerEl) {
        this._videoContainerEl.addEventListener('mousemove', this._moveHandler);
        this._videoContainerEl.addEventListener('mouseleave', this._leaveHandler);
      }
    });
  }

  private _playerOverlayRef?: ElementRef<HTMLDivElement>;
  @ViewChild('playerOverlay')
  get playerOverlayRef(): ElementRef<HTMLDivElement> | undefined { return this._playerOverlayRef; }
  set playerOverlayRef(ref: ElementRef<HTMLDivElement> | undefined) {
    this._playerOverlayRef = ref;
    this.ngZone.runOutsideAngular(() => {
      if (this._playerOverlayEl) {
        this._playerOverlayEl.removeEventListener('touchstart', this._touchStartHandler);
        this._playerOverlayEl.removeEventListener('touchmove', this._touchMoveHandler);
        this._playerOverlayEl.removeEventListener('touchend', this._touchEndHandler);
        this._playerOverlayEl.removeEventListener('touchcancel', this._touchEndHandler);
      }
      this._playerOverlayEl = ref?.nativeElement || null;
      if (this._playerOverlayEl) {
        this._playerOverlayEl.addEventListener('touchstart', this._touchStartHandler, { passive: true });
        this._playerOverlayEl.addEventListener('touchmove', this._touchMoveHandler, { passive: false });
        this._playerOverlayEl.addEventListener('touchend', this._touchEndHandler);
        this._playerOverlayEl.addEventListener('touchcancel', this._touchEndHandler);
      }
    });
  }

  // Refactored onUserActivity to re-enter zone only when needed
  onUserActivity() {
    // Desktop only - mobile uses touch overlay with tap-to-toggle
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    // Check state without triggering CD
    const controlsVisible = untracked(() => this.areControlsVisible());

    if (!controlsVisible) {
      // If controls are hidden, show immediately (enter zone)
      this.ngZone.run(() => {
        this.showControls();
      });
    } else {
      // Controls are visible. We just want to keep them alive.
      // Throttle the reset to avoid spamming setTimeout every frame.
      // Only reset if > 500ms since last show time.
      // We are already OUTSIDE angular zone here (called from event listener).
      const now = Date.now();
      if (now - this.lastControlsShowTime > 500) {
        this.showControls(); // Update timestamp and reset timer
      }
    }
  }

  // ============================================
  // KEYBOARD CONTROLS
  // ============================================

  clearUrl() {
    this.videoUrl = '';
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (typeof window !== 'undefined') {
      this.isMobile.set(window.innerWidth <= 768 || window.innerHeight <= 500);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.isPlayerSettingsOpen() && event.code === 'Escape') {
      event.preventDefault();
      this.closePlayerSettings();
      return;
    }

    if (this.showShortcutsDialog() && event.code === 'Escape') {
      event.preventDefault();
      this.closeShortcutsDialog();
      return;
    }

    // Delegate to service. It returns true if it handled a command.
    const isFsPopupVisible = untracked(() => this.fsPopupVisible());
    const isFullscreen = untracked(() => this.isFullscreen());

    this.keyboardShortcuts.handleKeyDown(event, isFsPopupVisible, isFullscreen);
  }

  private handleKeyboardEvent(event: import('./services/video-keyboard-shortcut.service').KeyboardShortcutEvent) {
    switch (event.type) {
      case 'toggle-play':
        this.togglePlay();
        this.showPlayPauseFeedback();
        break;
      case 'seek':
        this.seekRelative(event.data.seconds);
        this.showSeekFeedback(event.data.direction, Math.abs(event.data.seconds));
        break;
      case 'adjust-volume':
        this.adjustVolume(event.data.amount);
        this.showVolumeFeedback({ direction: event.data.amount > 0 ? 'up' : 'down' });
        break;
      case 'toggle-mute':
        this.toggleMute();
        break;
      case 'toggle-fullscreen':
        if (event.data.action === 'close-popup') {
          this.closeFsPopup();
        } else if (event.data.action === 'exit-fullscreen' || event.data.action === 'toggle') {
          this.toggleFullscreen();
        }
        break;
      case 'adjust-speed':
        if (event.data.action === 'decrease') {
          this.decreaseSpeed();
        } else {
          this.increaseSpeed();
        }
        break;
      case 'toggle-captions':
        this.toggleSubtitles();
        break;
      case 'playlist-next':
        this.playlistNext.emit();
        break;
      case 'playlist-prev':
        this.playlistPrev.emit();
        break;
      case 'step-frame':
        this.seekRelative(event.data.seconds);
        break;
      case 'toggle-shortcuts-dialog':
        this.showShortcutsDialog.update(v => !v);
        break;
      case 'toggle-subtitle-position':
        this.toggleFullscreenSubtitlePosition();
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    if (this.youtube.currentVideo() && this.areControlsVisible()) {
      const videoContainer = this.videoContainerRef?.nativeElement;
      if (videoContainer && !videoContainer.contains(target) && !this.isPlayerSettingsOpen()) {
        this.areControlsVisible.set(false);
        this.clearControlsTimeout();
      }
    }
  }

  @HostListener('document:fullscreenchange')
  @HostListener('document:webkitfullscreenchange')
  onFullscreenChange() {
    const doc = this.document as FullscreenDocument;
    const isFs = !!(doc.fullscreenElement || doc.webkitFullscreenElement);
    this.isFullscreen.set(isFs);
    this.fullscreenChanged.emit(isFs);
    if (!isFs && this.fsPopupVisible()) {
      this.closeFsPopup();
    }
  }

  // ============================================
  // CONTROLS VISIBILITY
  // ============================================

  onMouseLeave() {
    // Simple version - CSS handles desktop vs mobile via pointer-events
    if (this.youtube.intendedPlayingState() && !this.isPlayerSettingsOpen() && !this.fsPopupVisible() && !this.isDragging()) {
      this.areControlsVisible.set(false);
      this.isVolumeSliderVisible.set(false);
      if (this.volumeSliderTimeout) clearTimeout(this.volumeSliderTimeout);
      this.clearControlsTimeout();
    }
  }

  private showControls() {
    this.areControlsVisible.set(true);
    this.lastControlsShowTime = Date.now();
    this.clearControlsTimeout();
    this.startControlsAutoHide();
  }

  private startControlsAutoHide() {
    if (this.youtube.intendedPlayingState() && !this.isPlayerSettingsOpen() && !this.fsPopupVisible()) {
      this.hideControlsAfterDelay(3000);
    }
  }

  private hideControlsAfterDelay(ms: number) {
    this.clearControlsTimeout();
    // Timeout runs outside Angular (if called from outside) or inside (if called from inside).
    // But we want the *callback* to always update UI in zone.
    this.controlsTimeout = setTimeout(() => {
      // Re-enter zone for the check and update
      this.ngZone.run(() => {
        if (this.youtube.intendedPlayingState() && !this.isPlayerSettingsOpen() && !this.fsPopupVisible() && !this.isDragging()) {
          this.areControlsVisible.set(false);
          this.isVolumeSliderVisible.set(false);
          if (this.volumeSliderTimeout) clearTimeout(this.volumeSliderTimeout);
        }
      });
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

  showPlayPauseFeedback() {
    if (this.playPauseTimeout) clearTimeout(this.playPauseTimeout);
    this.playPauseFeedbackIcon.set(this.youtube.intendedPlayingState() ? 'play' : 'pause');
    this.playPauseFeedback.set(true);
    this.playPauseTimeout = setTimeout(() => {
      this.playPauseFeedback.set(false);
    }, 400);
  }

  showSpeedFeedback(speed: PlaybackSpeed) {
    if (this.speedFeedbackTimeout) clearTimeout(this.speedFeedbackTimeout);
    this.speedFeedbackText.set(`${speed}x`);
    this.speedFeedback.set(true);
    this.speedFeedbackTimeout = setTimeout(() => {
      this.speedFeedback.set(false);
    }, 1200);
  }

  showCaptionFeedback(visible: boolean) {
    if (this.captionFeedbackTimeout) clearTimeout(this.captionFeedbackTimeout);
    this.captionFeedbackText.set(visible ? 'Subtitles on' : 'Subtitles off');
    this.captionFeedback.set(true);
    this.captionFeedbackTimeout = setTimeout(() => {
      this.captionFeedback.set(false);
    }, 1200);
  }

  toggleSubtitles() {
    const next = this.subtitles.toggleSubtitlesVisible();
    this.showCaptionFeedback(next);
    this.showControls();
  }

  openShortcutsDialog() {
    this.showShortcutsDialog.set(true);
    this.showControls();
  }

  closeShortcutsDialog() {
    this.showShortcutsDialog.set(false);
  }

  seekRelative(seconds: number) {
    this.youtube.seekRelative(seconds);
    this.showControls();
  }

  showSeekFeedback(direction: 'left' | 'right', seconds: number) {
    if (this.seekDirection() === direction) {
      this.seekAccumulator.update(v => v + seconds);
    } else {
      this.seekAccumulator.set(seconds);
      this.seekDirection.set(direction);
    }

    if (direction === 'left') {
      this.rewindFeedback.set(false);
      requestAnimationFrame(() => this.rewindFeedback.set(true));
    } else {
      this.forwardFeedback.set(false);
      requestAnimationFrame(() => this.forwardFeedback.set(true));
    }
  }

  onSeekAnimationEnd() {
    this.rewindFeedback.set(false);
    this.forwardFeedback.set(false);
    this.seekAccumulator.set(0);
    this.seekDirection.set(null);
  }

  // ============================================
  // MOBILE TOUCH HANDLING (delegated to GestureHandlerService)
  // ============================================

  onOverlayTouchStart(event: TouchEvent) {
    this.gestures.handleTouchStart(event);
  }

  onOverlayTouchMove(event: TouchEvent) {
    this.gestures.handleTouchMove(event);
  }

  onOverlayTouchEnd(_event: TouchEvent) {
    const container = this.videoContainerRef?.nativeElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    this.gestures.handleTouchEnd(rect);
  }

  /**
   * Handle gesture events from GestureHandlerService
   */
  private handleGestureEvent(event: GestureEvent): void {
    this.ngZone.run(() => {
      switch (event.type) {
        case 'double-tap-left':
          if (this.quiz.isActive()) {
            this.quiz.replaySegment();
          } else {
            this.showSeekFeedback('left', event.data?.seconds || SEEK_STEP);
          }
          this.triggerRipple('left');
          this.areControlsVisible.set(true);
          this.lastControlsShowTime = Date.now();
          this.clearControlsTimeout();
          this.hideControlsAfterDelay(1500);
          break;

        case 'double-tap-right':
          if (this.quiz.isActive()) {
            this.quiz.skipQuestion();
          } else {
            this.showSeekFeedback('right', event.data?.seconds || SEEK_STEP);
          }
          this.triggerRipple('right');
          this.areControlsVisible.set(true);
          this.lastControlsShowTime = Date.now();
          this.clearControlsTimeout();
          this.hideControlsAfterDelay(1500);
          break;

        case 'single-tap':
          this.toggleControlsVisibility();
          break;

        case 'gesture-seek-complete':
          // Seek already handled by service
          break;

        case 'long-press-start':
          this.longPressActive.set(true);
          break;

        case 'long-press-end':
          this.longPressActive.set(false);
          break;
      }
    });
  }

  // Expose gesture service state to template
  get gestureSeekActive() { return this.gestures.gestureSeekActive; }
  get gestureSeekTime() { return this.gestures.gestureSeekTime; }



  onOverlayClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.doubleTapTimeout) {
      clearTimeout(this.doubleTapTimeout);
      this.doubleTapTimeout = null;
    }

    this.doubleTapTimeout = setTimeout(() => {
      this.togglePlay();
      this.showPlayPauseFeedback();
      this.doubleTapTimeout = null;
    }, 220);
  }

  onOverlayDblClick(event: MouseEvent) {
    event.stopPropagation();
    if (this.doubleTapTimeout) {
      clearTimeout(this.doubleTapTimeout);
      this.doubleTapTimeout = null;
    }
    this.toggleFullscreen();
  }

  private triggerRipple(zone: 'left' | 'right') {
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

  private lastToggleTime = 0;

  private toggleControlsVisibility() {
    const now = Date.now();
    this.lastToggleTime = now;

    const newValue = !this.areControlsVisible();
    this.areControlsVisible.set(newValue);
    this.lastControlsShowTime = now;
    this.clearControlsTimeout();

    if (newValue && this.youtube.intendedPlayingState()) {
      this.hideControlsAfterDelay(3000);
    }
  }

  onPlayPauseButtonClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.doubleTapTimeout) {
      clearTimeout(this.doubleTapTimeout);
      this.doubleTapTimeout = null;
    }
    this.togglePlay();
    this.lastControlsShowTime = Date.now();
    this.clearControlsTimeout();
    this.hideControlsAfterDelay(3000);
  }

  onReplayClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();

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
    const wasMuted = this.youtube.isMuted() || this.volume() === 0;
    if (wasMuted) {
      this.youtube.unmute();
      if (this.volume() === 0) {
        this.youtube.setVolume(50);
        this.volume.set(50);
      }
    } else {
      this.youtube.mute();
    }
    this.showControls();
    this.showVolumeFeedback({ isMuted: !wasMuted });
  }

  getVolumeIcon(): 'volume-2' | 'volume-1' | 'volume-x' {
    return getVolumeIcon(this.volume(), this.youtube.isMuted());
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

  onVolumeChange(value: number) {
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

  private showVolumeFeedback(options: { isMuted?: boolean, direction?: 'up' | 'down' } = {}) {
    const vol = this.volume();
    const muted = options.isMuted ?? this.youtube.isMuted();

    if (vol === 0 || muted) {
      this.volumeFeedbackIcon.set('volume-x');
    } else if (options.direction === 'up') {
      this.volumeFeedbackIcon.set('volume-2');
    } else if (options.direction === 'down') {
      this.volumeFeedbackIcon.set('volume-1');
    } else if (vol < 50) {
      this.volumeFeedbackIcon.set('volume-1');
    } else {
      this.volumeFeedbackIcon.set('volume-2');
    }
    this.volumeFeedback.set(true);
    setTimeout(() => this.volumeFeedback.set(false), 600);
  }

  // ============================================
  // PLAYER SETTINGS & PLAYBACK SPEED
  // ============================================

  openPlayerSettings(event?: Event): void {
    event?.stopPropagation();
    this.playerSettingsView.set('main');
    this.isPlayerSettingsOpen.set(true);
    this.clearControlsTimeout();
    this.showControls();
  }

  openSpeedMenu(event?: MouseEvent): void {
    event?.stopPropagation();
    this.playerSettingsView.set('speed');
    this.isPlayerSettingsOpen.set(true);
    this.clearControlsTimeout();
    this.showControls();
  }

  openDualSubMenu(event?: MouseEvent): void {
    event?.stopPropagation();
    this.playerSettingsView.set('dualSub');
    this.isPlayerSettingsOpen.set(true);
    this.clearControlsTimeout();
    this.showControls();
  }

  selectDualSubLang(code: string | null): void {
    if (!code || code === 'off') {
      this.disableDualSubtitles();
    } else {
      this.onLangSelected(code);
    }
    this.closePlayerSettings();
  }

  getTargetLangFlagUrl(code: string): string {
    const lang = this.translation.getSupportedTargetLanguages().find(l => l.code === code);
    return lang?.flagUrl || 'https://hatscripts.github.io/circle-flags/flags/gb.svg';
  }

  getTargetLangName(code: string): string {
    const lang = this.translation.getSupportedTargetLanguages().find(l => l.code === code);
    return lang ? lang.name : code.toUpperCase();
  }

  toggleDualSubtitles(): void {
    if (this.settings.settings().showDualSubtitles) {
      this.disableDualSubtitles();
    } else {
      const target = this.targetLang() || this.settings.settings().dualSubtitleTargetLang || 'en';
      this.onLangSelected(target);
    }
  }

  closePlayerSettings(): void {
    this.isPlayerSettingsOpen.set(false);
    this.playerSettingsView.set('main');
    this.startControlsAutoHide();
  }

  selectSpeedFromSheet(speed: PlaybackSpeed): void {
    this.setPlaybackSpeed(speed);
    this.closePlayerSettings();
  }

  setFontSizeFromSheet(size: FontSize): void {
    this.settings.setFontSize(size);
    this.closePlayerSettings();
  }

  getFontSizeName(size: FontSize): string {
    switch (size) {
      case 'small': return this.i18n.t('fontSize.small') || 'Small';
      case 'medium': return this.i18n.t('fontSize.medium') || 'Normal';
      case 'large': return this.i18n.t('fontSize.large') || 'Large';
      case 'xlarge': return this.i18n.t('fontSize.xlarge') || 'Extra Large';
    }
  }

  setPlaybackSpeed(speed: PlaybackSpeed) {
    this.currentSpeed.set(speed);
    this.youtube.setPlaybackRate(speed);
    this.settings.setPlaybackSpeed(speed);
    this.showSpeedFeedback(speed);
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

    const doc = this.document as FullscreenDocument;
    const elem = container as FullscreenElement;
    const isCurrentlyFullscreen = !!(doc.fullscreenElement || doc.webkitFullscreenElement);

    try {
      if (isCurrentlyFullscreen) {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
        try { (screen.orientation as ScreenOrientationWithLock | undefined)?.unlock?.(); } catch { }
      } else {
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        }
        try { await (screen.orientation as ScreenOrientationWithLock | undefined)?.lock?.('landscape'); } catch { }
      }
    } catch {
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

    if (this.youtube.intendedPlayingState()) {
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

    const lang = this.activeSubtitleLanguage();
    this.fsLookupSub?.unsubscribe();
    this.fsLookupSub = this.dictionary.lookup(token.surface, lang).subscribe({
      next: (entry) => {
        this.fsEntry.set(entry);
        this.fsLookupLoading.set(false);
      },
      error: () => this.fsLookupLoading.set(false)
    });

    this.showControls();
  }

  closeFsPopup(): void {
    this.fsLookupSub?.unsubscribe();
    this.fsPopupVisible.set(false);
    this.fsSelectedWord.set(null);
    this.fsEntry.set(null);
  }

  getFsGrammarMatchForToken(index: number): GrammarMatch | undefined {
    return this.fsGrammarMatches().find(m => m.tokenIndices.includes(index));
  }

  onFsGrammarClick(index: number, event: Event): void {
    event.stopPropagation();
    const match = this.getFsGrammarMatchForToken(index);
    if (match) {
      this.wasPlayingBeforeFsGrammar = this.youtube.isPlaying();
      if (this.wasPlayingBeforeFsGrammar) {
        this.youtube.pause();
      }
      this.fsSelectedGrammarPattern.set(match.pattern);
      this.fsGrammarPopupVisible.set(true);
      this.showControls();
    }
  }

  closeFsGrammarPopup(): void {
    this.fsGrammarPopupVisible.set(false);
    this.fsSelectedGrammarPattern.set(null);
    if (this.wasPlayingBeforeFsGrammar) {
      this.youtube.play();
      this.wasPlayingBeforeFsGrammar = false;
    }
  }

  onFullscreenComponentWordClick(event: { token: Token; context: string; event: MouseEvent }): void {
    this.onFullscreenWordClick(event.token, event.context, event.event);
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

  onSaveClick(): void {
    this.saveClicked.emit();
  }

  closeVideo(): void {
    this.playlistService.clearCurrentPlaylist();
    this.youtube.reset();
    this.subtitles.clear();
    this.transcript.reset();
    void this.router.navigate(['/video'], { queryParams: {} });
  }

  // ============================================
  // FONT SIZE CONTROL
  // ============================================

  cycleFontSize(): void {
    const current = this.settings.settings().fontSize;
    const currentIndex = this.fontSizes.indexOf(current);
    const nextIndex = (currentIndex + 1) % this.fontSizes.length;
    this.settings.setFontSize(this.fontSizes[nextIndex]);
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

  onSubtitlePositionChanged(percent: number): void {
    const clamped = Math.max(8, Math.min(85, Math.round(percent)));
    this.settings.settings.update(s => ({ ...s, fullscreenSubtitleYPercent: clamped }));
  }

  onSubtitlePositionCommitted(percent: number): void {
    this.settings.setFullscreenSubtitleYPercent(percent);
  }

  toggleFullscreenSubtitlePosition(): void {
    this.settings.toggleFullscreenSubtitlePosition();
  }

  // ============================================
  // PROGRESS BAR
  // ============================================



  hideSeekPreview() {
    this.progressBarComponent?.hideSeekPreview();
  }

  startSeeking(event: MouseEvent | TouchEvent) {
    this.progressBarComponent?.startSeeking(event);
  }

  updateSeekPreview(event: MouseEvent) {
    this.progressBarComponent?.updateSeekPreview(event);
  }

  onSeekStarted() {
    this.isDragging.set(true);
    this.clearControlsTimeout();
  }

  onSeekEnded(_time: number) {
    this.isDragging.set(false);
    this.startControlsAutoHide();
  }

  // Helper for seek calculations


  private startBufferedTracking() {
    this.progressBarComponent?.startBufferedTracking();
  }

  private stopBufferedTracking() {
    this.progressBarComponent?.stopBufferedTracking();
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

  async pasteFromClipboard(): Promise<void> {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          this.videoUrl = text.trim();
          this.error.set(null);
        }
      }
    } catch {
      // Browser clipboard permission denied or not supported; gracefully ignore
    }
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



  // ============================================
  // FULLSCREEN SUBTITLE HELPERS
  // ============================================

  getFullscreenReading(token: Token): string | undefined {
    return this.settings.getReadingText(this.activeSubtitleLanguage(), token) || undefined;
  }

  formatTime(seconds: number): string {
    return formatTime(seconds);
  }

  // ============================================
  // CLEANUP
  // ============================================

  ngOnDestroy(): void {
    this.fsLookupSub?.unsubscribe();
    this.clearControlsTimeout();
    this.gestures.destroy();

    if (this.volumeSliderTimeout) clearTimeout(this.volumeSliderTimeout);
    if (this.doubleTapTimeout) clearTimeout(this.doubleTapTimeout);
    if (this.playPauseTimeout) clearTimeout(this.playPauseTimeout);
    if (this.speedFeedbackTimeout) clearTimeout(this.speedFeedbackTimeout);
    if (this.captionFeedbackTimeout) clearTimeout(this.captionFeedbackTimeout);

    // Clean up video container and overlay event listeners
    this.eventCleanupFns.forEach(fn => fn());
    this.eventCleanupFns = [];

    this.youtube.destroy();
  }
}
