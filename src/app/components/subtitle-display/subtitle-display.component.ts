import { Component, inject, effect, output, signal, computed, ViewChild, ElementRef, ChangeDetectionStrategy, HostListener, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { IconComponent } from '../icon/icon.component';
import { VocabularyQuickViewComponent } from '../vocabulary-quick-view/vocabulary-quick-view.component';
import { SubtitleService, YoutubeService, VocabularyService, SettingsService, TranscriptService, I18nService } from '../../services';
import { SubtitleCue, Token } from '../../models';

@Component({
  selector: 'app-subtitle-display',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, VocabularyQuickViewComponent],
  animations: [
    trigger('subtitleFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(4px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  templateUrl: './subtitle-display.component.html',
  styleUrl: './subtitle-display.component.scss'
})
export class SubtitleDisplayComponent {
  subtitles = inject(SubtitleService);
  youtube = inject(YoutubeService);
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  transcript = inject(TranscriptService);
  i18n = inject(I18nService);

  @ViewChild('subtitleList') subtitleList!: ElementRef<HTMLDivElement>;
  @ViewChild('currentSubtitleInner') currentSubtitleInner!: ElementRef<HTMLDivElement>;

  wordClicked = output<{ token: Token; sentence: string }>();

  // Input to skip heavy processing when video is in fullscreen
  isVideoFullscreen = input(false);

  // Added sheet state
  showAddedSheet = signal(false);
  recentCount = computed(() => {
    const lang = this.settings.settings().language;
    return this.vocab.getByLanguage(lang).length;
  });

  // Overflow indicators for current subtitle
  hasOverflowTop = signal(false);
  hasOverflowBottom = signal(false);

  // Loop feature state
  isLoopEnabled = signal(false);
  loopCount = signal(0);
  maxLoops = signal(5); // 0 = infinite
  private loopTargetId = signal<string | null>(null);
  private loopTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private lastLoopTime = 0;

  // Keyboard shortcut for loop toggle
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Only handle when subtitles are loaded
    if (this.subtitles.subtitles().length === 0) return;

    // Don't intercept if user is typing in an input field
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    if (event.code === 'KeyL') {
      this.toggleLoop();
    }
  }

  // Computed signal for reading display
  showReading = computed(() => {
    const lang = this.settings.settings().language;
    return lang === 'ja'
      ? this.settings.settings().showFurigana
      : this.settings.settings().showPinyin;
  });

  currentTokens = computed(() => {
    const cue = this.subtitles.currentCue();
    if (!cue) return [];
    const lang = this.settings.settings().language;
    return this.subtitles.getTokens(cue, lang);
  });

  constructor() {
    // Auto-scroll to active cue in subtitle list
    effect(() => {
      if (this.isVideoFullscreen()) return;
      const currentCue = this.subtitles.currentCue();
      if (currentCue && this.subtitleList?.nativeElement) {
        setTimeout(() => this.scrollToActiveCue(currentCue.id), 0);
      }
    });

    // Auto-center current subtitle content when it changes
    effect(() => {
      if (this.isVideoFullscreen()) return;
      const currentCue = this.subtitles.currentCue();
      const tokens = this.currentTokens(); // Track token changes too

      if (currentCue && this.currentSubtitleInner?.nativeElement) {
        // Wait for DOM to update with new content
        setTimeout(() => this.centerAndCheckOverflow(), 50);
      } else {
        // Reset overflow indicators when no cue
        this.hasOverflowTop.set(false);
        this.hasOverflowBottom.set(false);
      }
    });

    // Segment loop effect
    effect(() => {
      const currentCue = this.subtitles.currentCue();
      const currentTime = this.youtube.currentTime();
      const targetId = this.loopTargetId();

      if (!this.isLoopEnabled() || !targetId) return;

      if (!currentCue) return;

      const subtitles = this.subtitles.subtitles();
      const currentCueIndex = subtitles.findIndex(c => c.id === currentCue.id);
      const targetCueIndex = subtitles.findIndex(c => c.id === targetId);

      if (targetCueIndex === -1) {
        this.disableLoop();
        return;
      }

      if (currentCueIndex !== targetCueIndex && currentCueIndex !== targetCueIndex + 1) {
        this.disableLoop();
        return;
      }

      const targetCue = subtitles[targetCueIndex];

      let shouldLoop = false;
      const isPastEndTime = currentTime >= targetCue.endTime - 0.1;
      const movedToNextCue = currentCueIndex === targetCueIndex + 1;

      if (isPastEndTime || movedToNextCue) {
        shouldLoop = true;
      }

      if (shouldLoop) {
        if (Date.now() - this.lastLoopTime < 1000) return;

        const maxLoopsValue = this.maxLoops();
        const currentLoopCount = this.loopCount();

        if (maxLoopsValue === 0 || currentLoopCount < maxLoopsValue) {
          if (!this.loopTimeoutId) {
            this.loopTimeoutId = setTimeout(() => {
              this.loopCount.update(c => c + 1);
              this.youtube.seekTo(targetCue.startTime);
              this.lastLoopTime = Date.now();
              this.loopTimeoutId = null;
            }, 300);
          }
        } else {
          this.disableLoop();
        }
      }
    });
  }

  /**
   * Centers the scroll position and updates overflow indicators
   */
  private centerAndCheckOverflow(): void {
    const container = this.currentSubtitleInner?.nativeElement;
    if (!container) return;

    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    const hasOverflow = scrollHeight > clientHeight;

    if (hasOverflow) {
      // Center the scroll position
      const targetScroll = (scrollHeight - clientHeight) / 2;
      container.scrollTop = targetScroll;

      // Update overflow indicators based on scroll position
      this.updateOverflowIndicators();

      // Listen for user scroll to update indicators
      container.addEventListener('scroll', this.onSubtitleScroll, { passive: true });
    } else {
      // No overflow - reset indicators
      this.hasOverflowTop.set(false);
      this.hasOverflowBottom.set(false);
      container.removeEventListener('scroll', this.onSubtitleScroll);
    }
  }

  private onSubtitleScroll = (): void => {
    this.updateOverflowIndicators();
  };

  private updateOverflowIndicators(): void {
    const container = this.currentSubtitleInner?.nativeElement;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 5; // Small threshold for edge detection

    this.hasOverflowTop.set(scrollTop > threshold);
    this.hasOverflowBottom.set(scrollTop + clientHeight < scrollHeight - threshold);
  }

  private scrollToActiveCue(cueId: string): void {
    if (!this.subtitleList?.nativeElement) return;

    const container = this.subtitleList.nativeElement;
    const activeElement = container.querySelector(`[data-cue-id="${cueId}"]`) as HTMLElement;

    if (activeElement) {
      const containerHeight = container.clientHeight;
      const elementTop = activeElement.offsetTop;
      const elementHeight = activeElement.offsetHeight;

      const targetScrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2);

      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth'
      });
    }
  }

  getTokens(cue: SubtitleCue): Token[] {
    const lang = this.settings.settings().language;
    return this.subtitles.getTokens(cue, lang);
  }

  getWordLevel(word: string): string | null {
    return this.vocab.getWordLevel(word);
  }

  onWordClick(token: Token, sentence: string): void {
    this.wordClicked.emit({ token, sentence });
  }

  isPunctuation(text: string): boolean {
    const punctuationRegex = /^[\s\p{P}\p{S}【】「」『』（）〔〕［］｛｝〈〉《》〖〗〘〙〚〛｟｠、。・ー〜～！？：；，．""''…—–]+$/u;
    return punctuationRegex.test(text);
  }

  readingLabel = computed(() => {
    const lang = this.settings.settings().language;
    switch (lang) {
      case 'ja': return 'Furigana';
      case 'zh': return 'Pinyin';
      case 'ko': return 'Romanization';
      default: return 'Reading';
    }
  });

  getReading(token: Token): string | undefined {
    const lang = this.settings.settings().language;
    if (lang === 'ja') return token.reading;
    if (lang === 'zh') return token.pinyin;
    return token.romanization || token.pinyin;
  }

  toggleReading(): void {
    const lang = this.settings.settings().language;
    if (lang === 'ja') {
      this.settings.toggleFurigana();
    } else {
      this.settings.togglePinyin();
    }
  }

  seekToCue(cue: SubtitleCue): void {
    if (this.isLoopEnabled()) {
      this.disableLoop();
    }
    this.youtube.seekTo(cue.startTime);
  }

  toggleLoop(): void {
    if (this.isLoopEnabled()) {
      this.disableLoop();
    } else {
      this.isLoopEnabled.set(true);
      this.loopCount.set(0);
      const currentCue = this.subtitles.currentCue();
      if (currentCue) {
        this.loopTargetId.set(currentCue.id);
      }
    }
  }

  private disableLoop(): void {
    this.isLoopEnabled.set(false);
    this.loopCount.set(0);
    this.loopTargetId.set(null);
    if (this.loopTimeoutId) {
      clearTimeout(this.loopTimeoutId);
      this.loopTimeoutId = null;
    }
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  toggleAddedSheet(): void {
    this.showAddedSheet.update(v => !v);
  }

  trackByCue(index: number, cue: SubtitleCue): string {
    return cue.id.toString();
  }
}