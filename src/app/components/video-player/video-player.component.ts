import { Component, inject, signal, OnDestroy, effect, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener, computed, output } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { YoutubeService, SubtitleService, SettingsService, TranscriptService, VocabularyService, DictionaryService, I18nService } from '../../services';
import { Token, SubtitleCue, DictionaryEntry } from '../../models';
import { Subscription } from 'rxjs';

type PlaybackSpeed = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;

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
  readonly playbackSpeeds: PlaybackSpeed[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  displayTime = computed(() => {
    return this.isDragging() ? this.previewTime() : this.youtube.currentTime();
  });

  progressPercentage = computed(() => {
    const time = this.displayTime();
    const duration = this.youtube.duration();
    if (!duration) return 0;
    return (time / duration) * 100;
  });

  // Fullscreen reading toggle (mirrors subtitle-display behavior)
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

  // YouTube-style cumulative seek
  seekAccumulator = signal(10);

  // Volume feedback
  volumeFeedback = signal(false);
  volumeFeedbackIcon = signal<'volume-2' | 'volume-1' | 'volume-x'>('volume-2');

  // Touch detection
  isTouchDevice = false;

  private controlsTimeout: ReturnType<typeof setTimeout> | null = null;
  private volumeSliderTimeout: ReturnType<typeof setTimeout> | null = null;

  // YouTube-style double-tap tracking
  private lastTapTime: { left: number; right: number; center: number } = { left: 0, right: 0, center: 0 };
  private seekResetTimeout: ReturnType<typeof setTimeout> | null = null;
  private seekFeedbackTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly DOUBLE_TAP_DELAY = 300;

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
    if (event.code === 'Escape' && this.fsPopupVisible()) {
      this.closeFsPopup();
      return;
    }

    switch (event.code) {
      case 'Space':
        event.preventDefault();
        this.togglePlay();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.seekRelative(-10);
        this.triggerFeedback('rewind');
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.seekRelative(10);
        this.triggerFeedback('forward');
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.adjustVolume(10);
        this.showVolumeFeedback();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.adjustVolume(-10);
        this.showVolumeFeedback();
        break;
      case 'KeyM':
        this.toggleMute();
        break;
      case 'KeyF':
        this.toggleFullscreen();
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

    if (!this.areControlsVisible() || !this.youtube.isPlaying()) return;
    const videoContainer = this.videoContainerRef?.nativeElement;
    if (videoContainer && !videoContainer.contains(target)) {
      this.areControlsVisible.set(false);
      this.clearControlsTimeout();
    }
  }

  @HostListener('document:fullscreenchange')
  onFullscreenChange() {
    const isFs = !!this.document.fullscreenElement;
    this.isFullscreen.set(isFs);
    this.fullscreenChanged.emit(isFs);
    // Close popup when exiting fullscreen
    if (!this.document.fullscreenElement && this.fsPopupVisible()) {
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
        this.showControls();
      } else {
        this.areControlsVisible.set(true);
        this.clearControlsTimeout();
      }
    });
  }

  // ============================================
  // USER ACTIVITY
  // ============================================

  onUserActivity() {
    if (!this.areControlsVisible()) {
      this.showControls();
      return;
    }

    // Debounce/Throttle the "extend visibility" logic
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
    }
    // Restart the hide timer
    this.hideControlsAfterDelay(3000);
  }

  onMouseLeave() {
    if (this.youtube.isPlaying()) {
      this.hideControlsAfterDelay(1000);
    }
  }

  private showControls() {
    this.areControlsVisible.set(true);
    this.clearControlsTimeout();

    if (this.youtube.isPlaying()) {
      this.hideControlsAfterDelay(3000);
    }
  }

  private hideControlsAfterDelay(ms: number) {
    this.controlsTimeout = setTimeout(() => {
      if (this.youtube.isPlaying() && !this.isSpeedMenuOpen() && !this.fsPopupVisible()) {
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

  seekRelative(seconds: number) {
    this.youtube.seekRelative(seconds);
    this.showControls();
  }

  private triggerFeedback(type: 'rewind' | 'forward') {
    // Set accumulator to 10s for keyboard seek (no cumulative for keyboard)
    this.seekAccumulator.set(10);

    if (type === 'rewind') {
      this.rewindFeedback.set(true);
      setTimeout(() => this.rewindFeedback.set(false), 800);
    } else {
      this.forwardFeedback.set(true);
      setTimeout(() => this.forwardFeedback.set(false), 800);
    }
  }

  // ============================================
  // YOUTUBE-STYLE ZONE TAP HANDLING
  // ============================================

  /**
   * Unified handler for zone interactions (Touch & Click)
   */
  handleZoneInteraction(zone: 'left' | 'center' | 'right', event: Event) {
    // If it's a touch device, ignore click events to prevent double-firing
    // (touchend will handle it)
    if (this.isTouchDevice && event.type === 'click') return;

    // Prevent default to stop ghost clicks on touch
    if (event.type === 'touchend') {
      event.preventDefault();
    }

    event.stopPropagation();

    const now = Date.now();
    const lastTap = this.lastTapTime[zone];
    const isDoubleTap = now - lastTap < this.DOUBLE_TAP_DELAY;

    this.lastTapTime[zone] = now;

    if (zone === 'center') {
      this.handleCenterZone(isDoubleTap);
      return;
    }

    // Side zones
    if (isDoubleTap) {
      this.handleSideDoubleTap(zone, event);
    } else {
      // Delay single tap action slightly to wait for potential double tap
      // But for "Show Controls", we want it instant.
      // YouTube style: always toggle/show controls on any tap.
      this.toggleControlsVisibility();
    }
  }

  private handleCenterZone(isDoubleTap: boolean) {
    if (this.isTouchDevice) {
      // Mobile behavior
      if (!this.youtube.isPlaying() && !this.youtube.isEnded()) {
        this.togglePlay(); // Tap to play if paused
      } else {
        this.toggleControlsVisibility(); // Otherwise toggle controls
      }
    } else {
      // Desktop behavior (Clicks)
      if (isDoubleTap) {
        this.toggleFullscreen();
      } else {
        this.togglePlay();
      }
    }
  }

  private handleSideDoubleTap(zone: 'left' | 'right', event: Event) {
    const seconds = zone === 'left' ? -10 : 10;

    // Clear any pending controls hide timer
    this.showControls();

    // Cumulative seek logic
    if (this.seekFeedbackTimeout) {
      clearTimeout(this.seekFeedbackTimeout);
      this.seekAccumulator.update(v => v + 10);
    } else {
      this.seekAccumulator.set(10);
    }

    this.seekRelative(seconds);
    this.triggerSeekFeedback(zone);

    // Ripple Effect
    this.triggerRipple(event, zone);

    // Reset feedback timer
    this.seekFeedbackTimeout = setTimeout(() => {
      this.seekFeedbackTimeout = null;
      this.rewindFeedback.set(false);
      this.forwardFeedback.set(false);
    }, 800);
  }

  private triggerRipple(event: Event, zone: 'left' | 'right') {
    // Extract coordinates from touch or mouse
    let clientX, clientY;
    if (event instanceof TouchEvent && event.changedTouches.length > 0) {
      clientX = event.changedTouches[0].clientX;
      clientY = event.changedTouches[0].clientY;
    } else if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    if (clientX !== undefined && clientY !== undefined) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      this.ripplePos.set({
        x: clientX - rect.left,
        y: clientY - rect.top
      });
    }

    if (zone === 'left') {
      this.leftRipple.set(true);
      setTimeout(() => this.leftRipple.set(false), 600);
    } else {
      this.rightRipple.set(true);
      setTimeout(() => this.rightRipple.set(false), 600);
    }
  }

  /**
  * Toggle controls visibility with smooth transition
  */
  private toggleControlsVisibility() {
    if (this.areControlsVisible()) {
      if (this.youtube.isPlaying()) {
        this.areControlsVisible.set(false);
      }
    } else {
      this.showControls();
    }
  }

  /**
   * Trigger seek feedback animation
   */
  /**
   * Trigger seek feedback animation with force reflow to ensure restart
   */
  private triggerSeekFeedback(zone: 'left' | 'right') {
    // Force reflow hack to restart animation if it's already active
    if (zone === 'left') {
      this.rewindFeedback.set(false);
      // Trigger reflow
      void this.videoContainerRef?.nativeElement?.offsetLeft;
      this.rewindFeedback.set(true);
    } else {
      this.forwardFeedback.set(false);
      void this.videoContainerRef?.nativeElement?.offsetLeft;
      this.forwardFeedback.set(true);
    }
  }

  /**
   * Handle touch on play/pause button - stop propagation so zone handler doesn't fire
   */
  onPlayPauseButtonTouch(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.togglePlay();
  }

  // Mobile: explicit play/pause button click
  onMobilePlayPauseClick(event: Event) {
    event.stopPropagation();
    this.togglePlay();
  }

  // Replay button click - seek to beginning and play
  onReplayClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.youtube.seekTo(0);
    this.youtube.play();
  }

  // Desktop double-click (handled in handleZoneInteraction now)
  // kept for template compatibility if needed, but logic is in handleZoneInteraction
  handleCenterDoubleClick() { }

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
  }

  getVolumeIcon(): 'volume-2' | 'volume-x' {
    if (this.youtube.isMuted() || this.volume() === 0) {
      return 'volume-x';
    }
    return 'volume-2';
  }

  showVolumeSlider() {
    if (this.volumeSliderTimeout) {
      clearTimeout(this.volumeSliderTimeout);
    }
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

    try {
      if (this.document.fullscreenElement) {
        await this.document.exitFullscreen();
        if (screen.orientation && 'unlock' in screen.orientation) {
          try { (screen.orientation as any).unlock(); } catch { }
        }
      } else {
        await container.requestFullscreen();
        if (screen.orientation && 'lock' in screen.orientation) {
          try { await (screen.orientation as any).lock('landscape'); } catch { }
        }
      }
    } catch (err) {
      console.warn('Fullscreen API not supported or failed, falling back to CSS fullscreen:', err);
      // Fallback for iOS/unsupported browsers: toggle state manually
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

    // Pause video
    if (this.youtube.isPlaying()) {
      this.youtube.pause();
    }

    // If not in fullscreen, emit to parent
    if (!this.isFullscreen()) {
      this.fullscreenWordClicked.emit({ token, sentence });
      return;
    }

    // Show inline popup
    this.fsSelectedWord.set(token);
    this.fsSelectedSentence.set(sentence);
    this.fsPopupVisible.set(true);
    this.fsWordSaved.set(this.vocab.hasWord(token.surface));
    this.fsEntry.set(null);

    // Lookup word
    this.fsLookupLoading.set(true);
    const lang = this.settings.settings().language;
    this.dictionary.lookup(token.surface, lang).subscribe({
      next: (entry) => {
        this.fsEntry.set(entry);
        this.fsLookupLoading.set(false);
      },
      error: () => {
        this.fsLookupLoading.set(false);
      }
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
  // PROGRESS BAR & SEEKING
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
    if (!this.youtube.duration()) return;

    const rect = this.progressBar.nativeElement.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, offsetX / rect.width));

    this.previewTime.set(percentage * this.youtube.duration());
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
    if (this.bufferedInterval) {
      clearInterval(this.bufferedInterval);
    }

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
    this.videoUrl = ''; // Clear input
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
      const maxAttempts = 10;

      const check = () => {
        const element = document.getElementById(elementId);
        if (element) {
          resolve();
        } else if (attempts >= maxAttempts) {
          reject(new Error(`Element #${elementId} not found`));
        } else {
          attempts++;
          setTimeout(check, 50 * attempts);
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
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    this.clearControlsTimeout();
    if (this.volumeSliderTimeout) {
      clearTimeout(this.volumeSliderTimeout);
    }
    if (this.bufferedInterval) {
      clearInterval(this.bufferedInterval);
    }
    if (this.seekFeedbackTimeout) {
      clearTimeout(this.seekFeedbackTimeout);
    }
    if (this.seekResetTimeout) {
      clearTimeout(this.seekResetTimeout);
    }
    this.youtube.destroy();
  }
}