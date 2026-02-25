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
  NgZone,
  AfterViewInit
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { GrammarPopupComponent } from '../../dictionary/grammar-popup/grammar-popup.component';
import { OptionItem } from '../../../shared/components/option-picker/option-picker.component';

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
import { Token, SubtitleCue, DictionaryEntry, GrammarPattern, GrammarMatch } from '../../../models';
import {
  PlaybackSpeed,
  PLAYBACK_SPEEDS,
  DOUBLE_TAP_DELAY,
  SEEK_STEP
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
export class VideoPlayerComponent implements OnDestroy, AfterViewInit {
  private document = inject(DOCUMENT);
  private router = inject(Router);
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

  // Translation language picker state
  langPickerOpen = signal(false);
  targetLang = computed(() => this.subtitles.dualSubtitleTargetLang());
  langOptions = computed<OptionItem[]>(() => {
    const currentLang = this.subtitles.loadedLanguage();
    return this.translation.getSupportedTargetLanguages()
      .filter(lang => lang.code !== currentLang)
      .map(lang => ({
        value: lang.code,
        label: lang.name,
        iconUrl: lang.flagUrl
      }));
  });

  getSelectedLangFlag(): string {
    const lang = this.translation.getSupportedTargetLanguages().find(l => l.code === this.targetLang());
    return lang ? lang.flagUrl : '';
  }

  onLangSelected(value: string): void {
    this.settings.setDualSubtitleTargetLang(value); // Update shared state
    this.subtitles.cueTranslations.set(new Map()); // Clear existing translations to show loading state
    this.settings.updateSettings({ showDualSubtitles: true }); // Auto-enable dual subs
    this.langPickerOpen.set(false);
  }

  disableDualSubtitles(): void {
    this.settings.updateSettings({ showDualSubtitles: false });
    this.langPickerOpen.set(false);
  }

  toggleLangMenu(event: Event): void {
    event.stopPropagation();
    this.langPickerOpen.update(v => !v);
    this.isSpeedMenuOpen.set(false); // Close speed menu if open
    this.showControls();
  }

  // Dual subtitle loading state - Now using SubtitleService




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
  closePlaylist = output<void>();
  addToPlaylist = output<void>();

  videoUrl = '';
  isLoading = signal(false);
  error = signal<string | null>(null);

  // UI State
  areControlsVisible = signal(true);
  isFullscreen = signal(false);
  isVolumeSliderVisible = signal(false);
  isSpeedMenuOpen = signal(false);
  volume = signal(100);
  volumePercent = computed(() => {
    return this.youtube.isMuted() ? 0 : this.volume();
  });
  currentSpeed = signal<PlaybackSpeed>(1);

  // Seeking State (managed by ProgressBarComponent, tracked here for visibility)
  isDragging = signal(false);

  @ViewChild('progressBarComponent') progressBarComponent!: ProgressBarComponent;

  // Fullscreen Settings Sheet
  fsSettingsVisible = signal(false);

  openFsSettings(): void {
    if (this.isFullscreen()) {
      this.fsSettingsVisible.set(true);
      this.areControlsVisible.set(false); // Hide main controls
    }
  }

  closeFsSettings(): void {
    this.fsSettingsVisible.set(false);
  }

  onFsSettingsTouchStart(event: TouchEvent): void {
    event.stopPropagation();
  }

  onFsLangSelected(langCode: string): void {
    this.settings.setDualSubtitleTargetLang(langCode); // Update shared state
    this.subtitles.cueTranslations.set(new Map()); // Clear existing translations to show loading state
    this.settings.updateSettings({ showDualSubtitles: true });
    // Don't close immediately so user can see it's selected
  }

  // Fullscreen popup state
  fsPopupVisible = signal(false);
  fsSelectedWord = signal<Token | null>(null);
  fsSelectedSentence = signal<string>('');
  fsEntry = signal<DictionaryEntry | null>(null);
  fsLookupLoading = signal(false);
  fsWordSaved = signal(false);



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

  fullscreenTokens = computed(() => {
    const cue = this.subtitles.currentCue();
    if (!cue) return [];
    const lang = this.subtitles.loadedLanguage();
    return this.subtitles.getTokens(cue, lang);
  });

  showFsReading = computed(() => {
    const lang = this.subtitles.loadedLanguage();
    if (!lang) return false;
    return lang === 'ja'
      ? this.settings.settings().showFurigana
      : this.settings.settings().showPinyin;
  });

  // Current translation for fullscreen
  currentTranslation = computed(() => {
    const cue = this.subtitles.currentCue();
    if (!cue) return null;
    return this.subtitles.cueTranslations().get(cue.id) || null;
  });

  // Grammar detection for fullscreen
  fsGrammarMatches = computed(() => {
    const tokens = this.fullscreenTokens();
    if (tokens.length === 0 || !this.grammar.grammarModeEnabled()) return [];

    const lang = this.subtitles.loadedLanguage();
    if (!lang || lang === 'en') return [];

    return this.grammar.detectPatterns(tokens, lang as 'ja' | 'zh' | 'ko');
  });

  fsGrammarTokenIndices = computed(() => {
    const matches = this.fsGrammarMatches();
    const indices = new Set<number>();
    for (const match of matches) {
      for (const idx of match.tokenIndices) {
        indices.add(idx);
      }
    }
    return indices;
  });

  // Fullscreen grammar popup state
  fsGrammarPopupVisible = signal(false);
  fsSelectedGrammarPattern = signal<GrammarPattern | null>(null);

  // Popup overlay touch tracking (to distinguish tap vs scroll)
  private popupTouchState = {
    startY: 0,
    hasMoved: false
  };

  // Feedback animations
  rewindFeedback = signal(false);
  forwardFeedback = signal(false);
  // feedbackIconName = signal<'play' | 'pause'>('play'); // Removed
  // playPauseFeedback = signal(false); // Removed
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
    // Initialize player when video exists but player isn't ready
    effect(() => {
      const currentVideo = this.youtube.currentVideo();
      // Only restore if we have a current video, player is NOT ready, and we are NOT in the middle of loading a new one
      if (currentVideo && !this.youtube.isReady() && !this.isLoading() && !this.youtube.pendingVideoId()) {
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

    // Sync volume and speed when player is ready
    effect(() => {
      if (this.youtube.isReady()) {
        this.volume.set(this.youtube.getVolume());
        this.currentSpeed.set(this.youtube.getPlaybackRate() as PlaybackSpeed);
        this.startBufferedTracking();
      }
    });

    // Clear URL when video is cleared
    effect(() => {
      if (!this.youtube.currentVideo()) {
        this.videoUrl = '';
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

  ngAfterViewInit() {
    // Progress Bar Events - now handled by hit area element in template for Safari compatibility
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

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Delegate to service. It returns true if it handled a command.
    const isFsPopupVisible = untracked(() => this.fsPopupVisible());
    const isFullscreen = untracked(() => this.isFullscreen());

    this.keyboardShortcuts.handleKeyDown(event, isFsPopupVisible, isFullscreen);
  }

  private handleKeyboardEvent(event: import('./services/video-keyboard-shortcut.service').KeyboardShortcutEvent) {
    switch (event.type) {
      case 'toggle-play':
        this.togglePlay();
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
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.speed-control')) {
      this.isSpeedMenuOpen.set(false);
    }
    if (!target.closest('.lang-control')) {
      this.langPickerOpen.set(false);
    }

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
    const doc = this.document as any;
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
    if (this.youtube.intendedPlayingState() && !this.isSpeedMenuOpen() && !this.langPickerOpen() && !this.fsPopupVisible() && !this.isDragging()) {
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
    if (this.youtube.intendedPlayingState() && !this.isSpeedMenuOpen() && !this.langPickerOpen() && !this.fsPopupVisible()) {
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
        if (this.youtube.intendedPlayingState() && !this.isSpeedMenuOpen() && !this.langPickerOpen() && !this.fsPopupVisible() && !this.isDragging()) {
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
    // this.showPlayPauseFeedback(); // Removed
    this.showControls();
  }

  // private showPlayPauseFeedback() { // Removed
  //   this.feedbackIconName.set(this.youtube.intendedPlayingState() ? 'pause' : 'play');
  //   this.playPauseFeedback.set(true);
  //   setTimeout(() => this.playPauseFeedback.set(false), 400);
  // }

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
    this.gestures.handleTouchStart(event, () => this.volume());
  }

  onOverlayTouchMove(event: TouchEvent) {
    this.gestures.handleTouchMove(event);
  }

  onOverlayTouchEnd(event: TouchEvent) {
    const container = this.videoContainerRef?.nativeElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const gestureEvent = this.gestures.handleTouchEnd(rect);

    if (gestureEvent) {
      this.handleGestureEvent(gestureEvent);
    }
  }

  /**
   * Handle gesture events from GestureHandlerService
   */
  private handleGestureEvent(event: GestureEvent): void {
    const container = this.videoContainerRef?.nativeElement;
    const rect = container?.getBoundingClientRect();

    switch (event.type) {
      case 'double-tap-left':
        if (this.quiz.isActive()) {
          this.quiz.replaySegment();
        } else {
          this.showSeekFeedback('left', event.data?.seconds || SEEK_STEP);
        }
        if (rect) {
          const x = rect.width * 0.25;
          const y = rect.height * 0.5;
          this.triggerRipple(x, y, 'left');
        }
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
        if (rect) {
          const x = rect.width * 0.25;
          const y = rect.height * 0.5;
          this.triggerRipple(x, y, 'right');
        }
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
  }

  // Expose gesture service state to template
  get gestureSeekActive() { return this.gestures.gestureSeekActive; }
  get gestureSeekTime() { return this.gestures.gestureSeekTime; }



  onOverlayClick(event: MouseEvent) {
    const now = Date.now();
    const isDoubleClick = now - this.lastDesktopClickTime < DOUBLE_TAP_DELAY;
    this.lastDesktopClickTime = now;

    if (isDoubleClick) {
      if (this.doubleTapTimeout) {
        clearTimeout(this.doubleTapTimeout);
        this.doubleTapTimeout = null;
      }
      this.toggleFullscreen();
    } else {
      this.doubleTapTimeout = setTimeout(() => {
        this.togglePlay();
        // this.showPlayPauseFeedback();
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

  private lastToggleTime = 0;

  private toggleControlsVisibility() {
    const now = Date.now();
    this.lastToggleTime = now;

    if (this.youtube.intendedPlayingState()) {
      const newValue = !this.areControlsVisible();
      this.areControlsVisible.set(newValue);
      this.lastControlsShowTime = now;
      this.clearControlsTimeout();

      if (newValue) {
        this.hideControlsAfterDelay(3000);
      }
    } else {
      this.areControlsVisible.set(true);
      this.lastControlsShowTime = now;
      this.clearControlsTimeout();
    }
  }

  onPlayPauseButtonTouch(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    this.togglePlay();
    this.lastControlsShowTime = Date.now();
    this.clearControlsTimeout();
    this.hideControlsAfterDelay(3000);
  }

  onPlayPauseButtonClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.doubleTapTimeout) {
      clearTimeout(this.doubleTapTimeout);
      this.doubleTapTimeout = null;
    }
    this.togglePlay();
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
  // PLAYBACK SPEED
  // ============================================

  toggleSpeedMenu(event: Event) {
    event.stopPropagation();
    this.isSpeedMenuOpen.update(v => !v);
    this.langPickerOpen.set(false); // Close lang menu if open
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
    const isCurrentlyFullscreen = !!(doc.fullscreenElement || doc.webkitFullscreenElement);

    try {
      if (isCurrentlyFullscreen) {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        }
        try { (screen.orientation as any)?.unlock?.(); } catch { }
      } else {
        if (elem.requestFullscreen) {
          await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          await elem.webkitRequestFullscreen();
        }
        try { await (screen.orientation as any)?.lock?.('landscape'); } catch { }
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

  // Grammar methods for fullscreen
  isFsGrammarToken(index: number): boolean {
    return this.fsGrammarTokenIndices().has(index);
  }

  getFsGrammarMatchForToken(index: number): GrammarMatch | undefined {
    return this.fsGrammarMatches().find(m => m.tokenIndices.includes(index));
  }

  onFsGrammarClick(index: number, event: Event): void {
    event.stopPropagation();
    const match = this.getFsGrammarMatchForToken(index);
    if (match) {
      if (this.youtube.intendedPlayingState()) {
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
  }

  // Popup overlay touch handlers - distinguish tap from scroll
  onPopupOverlayTouchStart(event: TouchEvent): void {
    this.popupTouchState = {
      startY: event.touches[0].clientY,
      hasMoved: false
    };
  }

  onPopupOverlayTouchMove(event: TouchEvent): void {
    const deltaY = Math.abs(event.touches[0].clientY - this.popupTouchState.startY);
    // Consider it a scroll if moved more than 10px
    if (deltaY > 10) {
      this.popupTouchState.hasMoved = true;
    }
  }

  onFullscreenComponentWordClick(event: { token: Token; context: string; event: MouseEvent }): void {
    this.onFullscreenWordClick(event.token, event.context, event.event);
  }

  onWordPopupOverlayTouchEnd(event: TouchEvent): void {
    // Only close if this was a tap (no scroll movement) and touch is on overlay (not popup)
    if (!this.popupTouchState.hasMoved && event.target === event.currentTarget) {
      event.preventDefault();
      this.closeFsPopup();
    }
    this.popupTouchState = { startY: 0, hasMoved: false };
  }

  onGrammarPopupOverlayTouchEnd(event: TouchEvent): void {
    // Only close if this was a tap (no scroll movement) and touch is on overlay (not popup)
    if (!this.popupTouchState.hasMoved && event.target === event.currentTarget) {
      event.preventDefault();
      this.closeFsGrammarPopup();
    }
    this.popupTouchState = { startY: 0, hasMoved: false };
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

  onSeekEnded(time: number) {
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

  // ============================================
  // CLEANUP
  // ============================================

  ngOnDestroy(): void {
    this.clearControlsTimeout();
    this.gestures.destroy();

    if (this.volumeSliderTimeout) clearTimeout(this.volumeSliderTimeout);
    if (this.doubleTapTimeout) clearTimeout(this.doubleTapTimeout);

    // Clean up video container and overlay event listeners
    this.eventCleanupFns.forEach(fn => fn());
    this.eventCleanupFns = [];

    this.youtube.destroy();
  }
}