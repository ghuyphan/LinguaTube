import { Component, inject, effect, output, signal, computed, ViewChild, ElementRef, ChangeDetectionStrategy, HostListener, input, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { VocabularyQuickViewComponent } from '../../vocabulary/vocabulary-quick-view/vocabulary-quick-view.component';
import { GrammarPopupComponent } from '../../dictionary/grammar-popup/grammar-popup.component';
import { SubtitleService, YoutubeService, VocabularyService, SettingsService, TranscriptService, I18nService, GrammarService, TranslationService } from '../../../services';
import { SubtitleCue, Token, GrammarMatch, GrammarPattern } from '../../../models';

@Component({
  selector: 'app-subtitle-display',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, VocabularyQuickViewComponent, GrammarPopupComponent],
  animations: [
    trigger('subtitleFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms ease-out', style({ opacity: 1 }))
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
  grammar = inject(GrammarService);
  translation = inject(TranslationService);

  readonly whisperAvailable = computed(() => {
    const error = this.transcript.error();
    const availableAI = this.transcript.availableLanguages().ai;

    // If we have a NO_NATIVE error but we know there are AI transcripts available (in other languages),
    // hide the button to prevent users from accidentally spending diamonds when they could switch languages.
    if (error === 'NO_NATIVE' && availableAI.length > 0) {
      return false;
    }

    return this.transcript.whisperAvailable();
  });

  readonly isGeneratingAI = this.transcript.isGeneratingAI;

  @ViewChild('subtitleList') subtitleList!: ElementRef<HTMLDivElement>;
  @ViewChild('currentSubtitleInner') currentSubtitleInner!: ElementRef<HTMLDivElement>;
  @ViewChild('subtitleControls') subtitleControls!: ElementRef<HTMLDivElement>;

  wordClicked = output<{ token: Token; sentence: string }>();
  manualAITrigger = output<void>();
  switchLanguage = output<string>();

  triggerManualAI(): void {
    this.manualAITrigger.emit();
  }

  // Detect if native transcripts exist in other languages (for NO_NATIVE error case)
  readonly hasNativeInOtherLanguage = computed(() => {
    const nativeLangs = this.transcript.availableLanguages().native;
    const requestedLang = this.settings.settings().language;
    return nativeLangs.length > 0 && !nativeLangs.includes(requestedLang);
  });

  readonly firstAvailableNativeLanguage = computed(() => {
    const nativeLangs = this.transcript.availableLanguages().native;
    // Prefer common learning languages
    const preferred = ['ja', 'zh', 'ko', 'en'];
    for (const lang of preferred) {
      if (nativeLangs.includes(lang)) return lang;
    }
    return nativeLangs[0] || null;
  });

  getLanguageDisplayName(lang: string): string {
    switch (lang) {
      case 'ja': return this.i18n.t('settings.japanese');
      case 'zh': return this.i18n.t('settings.chinese');
      case 'ko': return this.i18n.t('settings.korean');
      case 'en': return this.i18n.t('settings.english');
      default: return lang.toUpperCase();
    }
  }

  onSwitchLanguage(): void {
    const lang = this.firstAvailableNativeLanguage();
    if (lang) {
      this.switchLanguage.emit(lang);
    }
  }

  // Input to skip heavy processing when video is in fullscreen
  isVideoFullscreen = input(false);

  // Added sheet state
  showAddedSheet = signal(false);
  recentCount = computed(() => {
    const lang = this.settings.settings().language;
    return this.vocab.getByLanguage(lang).length;
  });

  // Controls expanded state
  isControlsExpanded = signal(false);

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

  // Compute effective language (prioritize detected video language over user setting)
  effectiveLanguage = computed(() => {
    // 1. If subtitles are actively loaded, trust that language first
    const loadedLang = this.subtitles.loadedLanguage();
    if (loadedLang) {
      return loadedLang;
    }

    // 2. Fallback to transcript detected language (from API response)
    const detected = this.transcript.detectedLanguage()?.split('-')[0]?.toLowerCase();

    // 3. Last resort: user setting
    const userLang = this.settings.settings().language;
    const validLangs = ['ja', 'zh', 'ko', 'en'];

    if (detected && validLangs.includes(detected)) return detected;
    return userLang;
  });

  // Computed signal for reading display
  showReading = computed(() => {
    const lang = this.effectiveLanguage();
    return lang === 'ja'
      ? this.settings.settings().showFurigana
      : this.settings.settings().showPinyin;
  });

  currentTokens = computed(() => {
    const cue = this.subtitles.currentCue();
    if (!cue) return [];

    // Use effective language for tokenization
    const lang = this.effectiveLanguage();
    const tokens = this.subtitles.getTokens(cue, lang as 'ja' | 'zh' | 'ko' | 'en');

    // Pre-compute levels for template
    return tokens.map(token => {
      // Create a shallow copy to not mutate the cached tokens
      const newToken = { ...token };
      if (!newToken.isPunctuation) {
        newToken.level = this.vocab.getWordLevel(newToken.surface) || undefined;
      }
      return newToken;
    });
  });

  // Grammar detection
  grammarMatches = computed(() => {
    const tokens = this.currentTokens();
    if (tokens.length === 0 || !this.grammar.grammarModeEnabled()) return [];

    const lang = this.effectiveLanguage();
    if (lang === 'en') return []; // No grammar for English

    return this.grammar.detectPatterns(tokens, lang as 'ja' | 'zh' | 'ko');
  });

  // Track which token indices are part of grammar patterns
  grammarTokenIndices = computed(() => {
    const matches = this.grammarMatches();
    const indices = new Set<number>();
    for (const match of matches) {
      for (const idx of match.tokenIndices) {
        indices.add(idx);
      }
    }
    return indices;
  });

  // Currently selected grammar pattern
  selectedGrammarPattern = signal<GrammarPattern | null>(null);
  grammarPopupOpen = signal(false);

  // Dual subtitles state
  cueTranslations = this.subtitles.cueTranslations;
  isTranslatingDual = signal(false);
  isDualCached = signal(false); // True if we loaded full subs from cache

  private lastLazyLoadedIndex = -1;
  private readonly LAZY_LOAD_BATCH_SIZE = 5;
  private readonly LAZY_LOAD_BUFFER = 2; // Load ahead when within 2 cues of end

  // Lazy loading implementation
  private lazyLoadUpcomingCues(): void {
    const currentIndex = this.subtitles.currentCueIndex();
    if (currentIndex < 0) return;

    // Determine range to load
    // We want to load [currentIndex, currentIndex + LAZY_LOAD_BATCH_SIZE]
    // But check if we already loaded it

    // Simple logic: If we are close to the end of the last loaded batch, load more
    if (currentIndex > this.lastLazyLoadedIndex - this.LAZY_LOAD_BUFFER) {
      const cues = this.subtitles.subtitles();
      const startIdx = Math.max(0, currentIndex);
      const endIdx = Math.min(cues.length - 1, startIdx + this.LAZY_LOAD_BATCH_SIZE - 1);

      // Collect cues needing translation
      const cuesToTranslate: { id: string, text: string }[] = [];
      const map = this.cueTranslations(); // Read current map

      for (let i = startIdx; i <= endIdx; i++) {
        const cue = cues[i];
        if (!map.has(cue.id)) {
          cuesToTranslate.push({ id: cue.id, text: cue.text });
        }
      }

      if (cuesToTranslate.length === 0) {
        this.lastLazyLoadedIndex = endIdx;
        return;
      }

      console.log(`[SubtitleDisplay] Lazy loading ${cuesToTranslate.length} cues`);
      this.lastLazyLoadedIndex = endIdx;
      this.isTranslatingDual.set(true);

      const texts = cuesToTranslate.map(c => c.text);
      const lang = this.effectiveLanguage();

      this.translation.translateBatch(texts, lang, 'en').subscribe({
        next: (translations) => {
          this.isTranslatingDual.set(false);
          // Update map (need to create new map to trigger signal)
          const newMap = new Map(this.cueTranslations());

          translations.forEach((trans, i) => {
            if (trans) {
              newMap.set(cuesToTranslate[i].id, trans);
            }
          });

          this.cueTranslations.set(newMap);
        },
        error: (err) => {
          console.error('[SubtitleDisplay] Lazy load failed:', err);
          this.isTranslatingDual.set(false);
        }
      });
    }
  }

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

    // Video page effect to fetch dual subtitles
    effect(() => {
      const showDual = this.settings.settings().showDualSubtitles;
      const lang = this.effectiveLanguage();
      const videoId = this.youtube.currentVideo()?.id;
      const cues = this.subtitles.subtitles();

      // Enable dual subtitles for all CJK languages
      const supportsDual = ['ja', 'zh', 'ko'].includes(lang);

      if (showDual && supportsDual && videoId && cues.length > 0) {
        // Prevent re-checking if we already checked this video/lang combo (unless force refresh needed)
        // For now, we rely on the effect dependency tracking.

        console.log('[SubtitleDisplay] Checking cache for dual subtitles:', videoId);

        // 1. Check cache first (fast, cheap)
        this.translation.getDualSubtitles(videoId, lang, 'en', cues, true)
          .subscribe({
            next: (translatedSegments) => {
              if (translatedSegments && translatedSegments.length) {
                // CACHE HIT: Use full translations
                console.log('[SubtitleDisplay] Cache HIT. Loaded:', translatedSegments.length);
                const newMap = new Map<string, string>();
                translatedSegments.forEach((seg: any, index: number) => {
                  if (index < cues.length && seg.translation) {
                    newMap.set(cues[index].id, seg.translation);
                  }
                });
                this.cueTranslations.set(newMap);
                this.isDualCached.set(true);
              } else {
                // CACHE MISS: Enable lazy loading
                console.log('[SubtitleDisplay] Cache MISS. Enabling lazy loading.');
                this.isDualCached.set(false);
                // Trigger initial lazy load
                this.lazyLoadUpcomingCues();
              }
            },
            error: (err) => {
              console.error('[SubtitleDisplay] Cache check failed:', err);
              // Fallback to lazy loading on error
              this.isDualCached.set(false);
            }
          });
      } else {
        if (this.cueTranslations().size > 0) {
          this.cueTranslations.set(new Map());
          this.isDualCached.set(false);
        }
      }
    });

    // Lazy loading effect
    effect(() => {
      const showDual = this.settings.settings().showDualSubtitles;
      const index = this.subtitles.currentCueIndex();

      // Check conditions for lazy loading
      if (showDual && !this.isDualCached() && index !== -1) {
        // Debounce/Throttle logic is handled by internal tracking in lazyLoadUpcomingCues
        untracked(() => {
          this.lazyLoadUpcomingCues();
        });
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
    const lang = this.effectiveLanguage();
    return this.subtitles.getTokens(cue, lang as 'ja' | 'zh' | 'ko' | 'en');
  }

  onWordClick(token: Token, sentence: string): void {
    this.wordClicked.emit({ token, sentence });
  }

  // Computed reading label
  readingLabel = computed(() => {
    const lang = this.effectiveLanguage();
    switch (lang) {
      case 'ja': return 'Furigana';
      case 'zh': return 'Pinyin';
      case 'ko': return 'Romanization';
      default: return 'Reading';
    }
  });

  getReading(token: Token): string | undefined {
    const lang = this.effectiveLanguage();
    if (lang === 'ja') return token.reading;
    if (lang === 'zh') return token.pinyin;
    return token.romanization || token.pinyin;
  }

  toggleReading(): void {
    const lang = this.effectiveLanguage();
    if (lang === 'ja') {
      this.settings.toggleFurigana();
    } else {
      this.settings.togglePinyin();
    }
  }

  // Font size cycling (like fullscreen mode)
  private readonly fontSizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];

  cycleFontSize(): void {
    const current = this.settings.settings().fontSize;
    const currentIndex = this.fontSizes.indexOf(current as 'small' | 'medium' | 'large');
    const nextIndex = (currentIndex + 1) % this.fontSizes.length;
    this.settings.setFontSize(this.fontSizes[nextIndex]);
  }

  getFontSizeLabel(): string {
    const size = this.settings.settings().fontSize;
    switch (size) {
      case 'small': return 'S';
      case 'medium': return 'M';
      case 'large': return 'L';
      default: return 'M';
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

  toggleControlsExpanded(): void {
    this.isControlsExpanded.update(v => !v);

    // Auto-scroll to show expanded content
    if (this.isControlsExpanded() && this.subtitleControls?.nativeElement) {
      setTimeout(() => {
        this.subtitleControls.nativeElement.scrollTo({
          left: this.subtitleControls.nativeElement.scrollWidth,
          behavior: 'smooth'
        });
      }, 50); // Small delay to let the expand animation start
    }
  }

  trackByCue(index: number, cue: SubtitleCue): string {
    return cue.id.toString();
  }

  // Grammar methods
  isGrammarToken(index: number): boolean {
    return this.grammarTokenIndices().has(index);
  }

  getGrammarMatchForToken(index: number): GrammarMatch | undefined {
    return this.grammarMatches().find(m => m.tokenIndices.includes(index));
  }

  private wasPlayingBeforeGrammarLookup = false;

  onGrammarClick(index: number, event: Event): void {
    event.stopPropagation();
    const match = this.getGrammarMatchForToken(index);
    if (match) {
      this.selectedGrammarPattern.set(match.pattern);

      // Pause video on mobile (like word lookup)
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        this.wasPlayingBeforeGrammarLookup = this.youtube.isPlaying();
        if (this.wasPlayingBeforeGrammarLookup) {
          this.youtube.pause();
        }
      }

      this.grammarPopupOpen.set(true);
    }
  }

  closeGrammarPopup(): void {
    this.grammarPopupOpen.set(false);
    this.selectedGrammarPattern.set(null);

    // Resume video if it was playing before lookup
    if (typeof window !== 'undefined' && window.innerWidth <= 768 && this.wasPlayingBeforeGrammarLookup) {
      this.youtube.play();
      this.wasPlayingBeforeGrammarLookup = false;
    }
  }

  toggleGrammarMode(): void {
    this.grammar.toggleGrammarMode();
  }
}