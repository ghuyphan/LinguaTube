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

  // Loop feature state
  isLoopEnabled = signal(false);
  loopCount = signal(0);
  maxLoops = signal(5); // 0 = infinite
  private loopTargetId = signal<string | null>(null);
  private loopTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private lastLoopTime = 0;

  // Scroll state for top fade indicator
  hasScrollTop = signal(false);

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

  // Track when user last scrolled the current subtitle display
  private lastUserScrollTime = 0;
  private readonly SCROLL_DEBOUNCE_MS = 1500; // 1.5 seconds

  // Called from template when user scrolls
  onCurrentSubtitleScroll(): void {
    this.lastUserScrollTime = Date.now();

    // Update scroll position indicator for top fade
    if (this.currentSubtitleInner?.nativeElement) {
      const scrollTop = this.currentSubtitleInner.nativeElement.scrollTop;
      this.hasScrollTop.set(scrollTop > 8);
    }
  }

  constructor() {
    // Auto-scroll to active cue in the list
    effect(() => {
      if (this.isVideoFullscreen()) return;
      const currentCue = this.subtitles.currentCue();
      // Ensure we have a cue and the list element is available
      if (currentCue && this.subtitleList?.nativeElement) {
        // Use timeout to allow DOM update (class changes) before measuring
        setTimeout(() => this.scrollToActiveCue(currentCue.id), 0);
      }
    });

    // Auto-scroll current subtitle display to top when cue changes
    // But skip if user has scrolled recently (avoids fighting with user)
    effect(() => {
      if (this.isVideoFullscreen()) return;
      const currentCue = this.subtitles.currentCue();
      // When cue changes, scroll to top so user sees start of subtitle
      if (currentCue && this.currentSubtitleInner?.nativeElement) {
        const timeSinceUserScroll = Date.now() - this.lastUserScrollTime;
        // Only auto-scroll if user hasn't scrolled recently
        if (timeSinceUserScroll > this.SCROLL_DEBOUNCE_MS) {
          this.currentSubtitleInner.nativeElement.scrollTop = 0;
          this.hasScrollTop.set(false);
        }
      }
    });

    // Segment loop effect
    effect(() => {
      const currentCue = this.subtitles.currentCue();
      const currentTime = this.youtube.currentTime();
      const targetId = this.loopTargetId();

      if (!this.isLoopEnabled() || !targetId) return;

      // If we don't have a current cue (e.g. gap between subtitles), do nothing yet
      if (!currentCue) {
        return;
      }

      // 1. Detect if user manually seeked away or we drifted too far to a DIFFERENT, NON-ADJACENT cue
      const subtitles = this.subtitles.subtitles();
      const currentCueIndex = subtitles.findIndex(c => c.id === currentCue.id);
      const targetCueIndex = subtitles.findIndex(c => c.id === targetId);

      if (targetCueIndex === -1) {
        this.disableLoop();
        return;
      }

      // Allow being on the target cue or the immediate next one (natural playback progression)
      if (currentCueIndex !== targetCueIndex && currentCueIndex !== targetCueIndex + 1) {
        // User likely clicked a different cue or seeked far away. Disable loop.
        this.disableLoop();
        return;
      }

      // 2. Check overlap/end condition
      const targetCue = subtitles[targetCueIndex];

      let shouldLoop = false;
      const isPastEndTime = currentTime >= targetCue.endTime - 0.1;
      const movedToNextCue = currentCueIndex === targetCueIndex + 1;

      if (isPastEndTime || movedToNextCue) {
        shouldLoop = true;
      }

      if (shouldLoop) {
        // Prevent double-counting due to seek latency
        if (Date.now() - this.lastLoopTime < 1000) return;

        const maxLoopsValue = this.maxLoops();
        const currentLoopCount = this.loopCount();

        if (maxLoopsValue === 0 || currentLoopCount < maxLoopsValue) {
          // Debounce the seek to avoid rapid firing
          if (!this.loopTimeoutId) {
            this.loopTimeoutId = setTimeout(() => {
              this.loopCount.update(c => c + 1);
              this.youtube.seekTo(targetCue.startTime);
              this.lastLoopTime = Date.now();
              this.loopTimeoutId = null;
            }, 300);
          }
        } else {
          // Max loops reached
          this.disableLoop();
        }
      }
    });
  }

  private scrollToActiveCue(cueId: string): void {
    if (!this.subtitleList?.nativeElement) return;

    const container = this.subtitleList.nativeElement;
    const activeElement = container.querySelector(`[data-cue-id="${cueId}"]`) as HTMLElement;

    if (activeElement) {
      const containerHeight = container.clientHeight;
      const elementTop = activeElement.offsetTop;
      const elementHeight = activeElement.offsetHeight;

      // Center the element
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

  // Check if a string is punctuation (CJK + Western)
  isPunctuation(text: string): boolean {
    const punctuationRegex = /^[\s\p{P}\p{S}【】「」『』（）〔〕［］｛｝〈〉《》〖〗〘〙〚〛｟｠、。・ー〜～！？：；，．""''…—–]+$/u;
    return punctuationRegex.test(text);
  }

  // Computed reading label
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
    // Disable loop when user manually selects a different cue
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