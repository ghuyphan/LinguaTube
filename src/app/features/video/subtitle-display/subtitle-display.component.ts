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
        style({ opacity: 0.85 }),
        animate('80ms ease-out', style({ opacity: 1 }))
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

  readonly hasNativeInOtherLanguage = computed(() => {
    const nativeLangs = this.transcript.availableLanguages().native;
    const requestedLang = this.settings.settings().language;
    return nativeLangs.length > 0 && !nativeLangs.includes(requestedLang);
  });

  readonly firstAvailableNativeLanguage = computed(() => {
    const nativeLangs = this.transcript.availableLanguages().native;
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

  isVideoFullscreen = input(false);

  showAddedSheet = signal(false);
  recentCount = computed(() => {
    const lang = this.settings.settings().language;
    return this.vocab.getByLanguage(lang).length;
  });

  isControlsExpanded = signal(false);

  isLoopEnabled = signal(false);
  loopCount = signal(0);
  maxLoops = signal(5);
  private loopTargetId = signal<string | null>(null);
  private loopTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private lastLoopTime = 0;

  hasScrollTop = signal(false);

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.subtitles.subtitles().length === 0) return;

    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    if (event.code === 'KeyL') {
      this.toggleLoop();
    }
  }

  effectiveLanguage = computed(() => {
    const loadedLang = this.subtitles.loadedLanguage();
    if (loadedLang) {
      return loadedLang;
    }

    const detected = this.transcript.detectedLanguage()?.split('-')[0]?.toLowerCase();
    const userLang = this.settings.settings().language;
    const validLangs = ['ja', 'zh', 'ko', 'en'];

    if (detected && validLangs.includes(detected)) return detected;
    return userLang;
  });

  showReading = computed(() => {
    const lang = this.effectiveLanguage();
    return lang === 'ja'
      ? this.settings.settings().showFurigana
      : this.settings.settings().showPinyin;
  });

  // ============================================
  // FIX 1: Stable token caching to prevent flicker
  // ============================================
  private tokenCache = new Map<string, Token[]>();
  private lastCueId: string | null = null;
  private lastVocabChangeTime = 0;

  currentTokens = computed(() => {
    const cue = this.subtitles.currentCue();
    if (!cue) {
      this.lastCueId = null;
      return [];
    }

    const lang = this.effectiveLanguage();
    const cacheKey = `${cue.id}-${lang}`;

    // Check if vocab has been updated (simple time-based check)
    const vocabChangeTime = this.vocab.lastModified?.() ?? 0;
    const vocabChanged = vocabChangeTime !== this.lastVocabChangeTime;

    // Return cached if same cue and vocab hasn't changed
    if (this.lastCueId === cue.id && !vocabChanged && this.tokenCache.has(cacheKey)) {
      return this.tokenCache.get(cacheKey)!;
    }

    const tokens = this.subtitles.getTokens(cue, lang as 'ja' | 'zh' | 'ko' | 'en');

    // Only create new objects when level actually differs from token's existing level
    const result = tokens.map(token => {
      if (token.isPunctuation) return token;

      const level = this.vocab.getWordLevel(token.surface) || undefined;
      // Reuse same object if level unchanged
      if (token.level === level) return token;

      return { ...token, level };
    });

    // Update cache
    this.tokenCache.set(cacheKey, result);
    this.lastCueId = cue.id;
    this.lastVocabChangeTime = vocabChangeTime;

    // Keep cache small (last 10 cues)
    if (this.tokenCache.size > 10) {
      const firstKey = this.tokenCache.keys().next().value;
      if (firstKey) this.tokenCache.delete(firstKey);
    }

    return result;
  });

  // Grammar detection
  grammarMatches = computed(() => {
    const tokens = this.currentTokens();
    if (tokens.length === 0 || !this.grammar.grammarModeEnabled()) return [];

    const lang = this.effectiveLanguage();
    if (lang === 'en') return [];

    return this.grammar.detectPatterns(tokens, lang as 'ja' | 'zh' | 'ko');
  });

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

  selectedGrammarPattern = signal<GrammarPattern | null>(null);
  grammarPopupOpen = signal(false);

  // Dual subtitles state
  cueTranslations = this.subtitles.cueTranslations;
  isTranslatingDual = signal(false);
  isDualCached = signal(false);

  private lastLazyLoadedIndex = -1;
  private readonly LAZY_LOAD_BATCH_SIZE = 20;
  private readonly LAZY_LOAD_BUFFER = 5;

  // ============================================
  // FIX 4: Throttled lazy loading
  // ============================================
  private isLazyLoadPending = false;
  private lazyLoadSubscription: any = null; // Subscription type
  private dualSubSubscription: any = null; // Subscription type

  private lazyLoadUpcomingCues(): void {
    if (this.isLazyLoadPending) return;

    const currentIndex = this.subtitles.currentCueIndex();
    if (currentIndex < 0) return;

    const cues = this.subtitles.subtitles();
    // Start checking from current index
    const startIdx = Math.max(0, currentIndex);
    // Look further ahead (batch size)
    const endIdx = Math.min(cues.length - 1, startIdx + this.LAZY_LOAD_BATCH_SIZE);

    const cuesToTranslate: { id: string, text: string }[] = [];
    const map = this.cueTranslations();

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

    // Only set pending if we actually have something to do
    this.lastLazyLoadedIndex = endIdx;
    this.isLazyLoadPending = true;
    this.isTranslatingDual.set(true);

    const texts = cuesToTranslate.map(c => c.text);
    const lang = this.effectiveLanguage();
    const targetLang = this.subtitles.dualSubtitleTargetLang();

    // Cancel any previous lazy load request to avoid overlap/race conditions
    if (this.lazyLoadSubscription) {
      this.lazyLoadSubscription.unsubscribe();
    }

    this.lazyLoadSubscription = this.translation.translateBatch(texts, lang, targetLang).subscribe({
      next: (translations) => {
        // Double check language hasn't changed while waiting (extra safety)
        if (this.subtitles.dualSubtitleTargetLang() !== targetLang) return;

        this.clearLoadingState();
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
        this.clearLoadingState();
      }
    });
  }

  private clearLoadingState(): void {
    this.isTranslatingDual.set(false);
    this.isLazyLoadPending = false;
  }

  private lastUserScrollTime = 0;
  private readonly SCROLL_DEBOUNCE_MS = 1500;

  onCurrentSubtitleScroll(): void {
    this.lastUserScrollTime = Date.now();

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
      if (currentCue && this.subtitleList?.nativeElement) {
        setTimeout(() => this.scrollToActiveCue(currentCue.id), 0);
      }
    });

    // Auto-scroll current subtitle display to top when cue changes
    effect(() => {
      if (this.isVideoFullscreen()) return;
      const currentCue = this.subtitles.currentCue();
      if (currentCue && this.currentSubtitleInner?.nativeElement) {
        const timeSinceUserScroll = Date.now() - this.lastUserScrollTime;
        if (timeSinceUserScroll > this.SCROLL_DEBOUNCE_MS) {
          this.currentSubtitleInner.nativeElement.scrollTop = 0;
          this.hasScrollTop.set(false);
        }
      }
    });

    // Segment loop effect
    effect(() => {
      const currentTime = this.youtube.currentTime();
      const targetId = this.loopTargetId();

      if (!this.isLoopEnabled() || !targetId) return;

      const currentCueIndex = this.subtitles.currentCueIndex();

      // If we don't have a current cue index (e.g. before start or after end), we might need to check if we passed the loop target
      if (currentCueIndex === -1) {
        // Fallback logic could go here, but usually currentCueIndex covers playback
        // If we are strictly outside, maybe we should just let it be or check if we are significantly past
        return;
      }

      const subtitles = this.subtitles.subtitles();
      // Optimization: We could cache targetCueIndex, but looking it up once per cue change (mostly) is okay-ish.
      // However, this effect runs on currentTime() change.
      // We should ideally NOT search the array every frame.
      // Let's rely on indices. obtain target index once when targetId changes?
      // For now, let's just do the search, it's O(N) but N is usually < 2000.
      // But we can enable a "fast path" if we knew the index.

      const targetCueIndex = subtitles.findIndex(c => c.id === targetId);

      if (targetCueIndex === -1) {
        this.disableLoop();
        return;
      }

      if (currentCueIndex !== targetCueIndex && currentCueIndex !== targetCueIndex + 1) {
        // If we drifted too far, disable loop
        // Allow +1 because we might just have stepped over
        this.disableLoop();
        return;
      }

      const targetCue = subtitles[targetCueIndex];
      const isPastEndTime = currentTime >= targetCue.endTime - 0.1;
      const movedToNextCue = currentCueIndex === targetCueIndex + 1;

      if (isPastEndTime || movedToNextCue) {
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

    // Video page effect to fetch dual subtitles
    effect(() => {
      const showDual = this.settings.settings().showDualSubtitles;
      const lang = this.effectiveLanguage();
      const videoId = this.youtube.currentVideo()?.id;
      const cues = this.subtitles.subtitles();
      const targetLang = this.subtitles.dualSubtitleTargetLang();

      // Cancel previous requests immediately when dependencies change (especially targetLang)
      if (this.dualSubSubscription) {
        this.dualSubSubscription.unsubscribe();
        this.dualSubSubscription = null;
      }
      if (this.lazyLoadSubscription) {
        this.lazyLoadSubscription.unsubscribe();
        this.lazyLoadSubscription = null;
      }

      // If target language matches source language, don't show dual subs
      if (targetLang === lang) {
        if (this.cueTranslations().size > 0) {
          this.cueTranslations.set(new Map());
        }
        this.isTranslatingDual.set(false);
        this.isDualCached.set(false);
        return;
      }

      const supportsDual = ['ja', 'zh', 'ko'].includes(lang);

      if (showDual && supportsDual && videoId && cues.length > 0) {
        // Set loading state BEFORE cache check so skeleton shows immediately
        if (this.cueTranslations().size === 0) {
          this.isTranslatingDual.set(true);
        }

        // Use untracked for the subscription to avoid infinite loops if it were setting tracked signals improperly (good practice)
        untracked(() => {
          this.dualSubSubscription = this.translation.getDualSubtitles(videoId, lang, targetLang, cues, true)
            .subscribe({
              next: (translatedSegments) => {
                // Check if language changed while waiting (effect cleanup should handle this, but for safety)
                if (this.subtitles.dualSubtitleTargetLang() !== targetLang) return;

                if (translatedSegments && translatedSegments.length) {
                  const newMap = new Map<string, string>();
                  translatedSegments.forEach((seg: any, index: number) => {
                    if (index < cues.length && seg.translation) {
                      newMap.set(cues[index].id, seg.translation);
                    }
                  });
                  this.cueTranslations.set(newMap);
                  this.isDualCached.set(true);
                  this.isTranslatingDual.set(false); // Clear loading state on cache hit
                } else {
                  this.isDualCached.set(false);
                  this.lastLazyLoadedIndex = -1; // Reset tracking
                  this.lazyLoadUpcomingCues();
                }
              },
              error: (err) => {
                console.error('[SubtitleDisplay] Cache check failed:', err);
                this.isDualCached.set(false);
                this.lastLazyLoadedIndex = -1;
                this.isTranslatingDual.set(false); // Clear loading state on error
              }
            });
        });

      } else {
        if (this.cueTranslations().size > 0) {
          this.cueTranslations.set(new Map());
          this.isDualCached.set(false);
        }
        // Clear loading state and reset lazy load tracking when dual subs disabled
        this.isTranslatingDual.set(false);
        this.lastLazyLoadedIndex = -1;
      }
    });

    // Lazy loading effect
    effect(() => {
      const showDual = this.settings.settings().showDualSubtitles;
      const index = this.subtitles.currentCueIndex();

      if (showDual && !this.isDualCached() && index !== -1 && !this.subtitles.isDualSubLoading()) {
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

    if (this.isControlsExpanded() && this.subtitleControls?.nativeElement) {
      setTimeout(() => {
        this.subtitleControls.nativeElement.scrollTo({
          left: this.subtitleControls.nativeElement.scrollWidth,
          behavior: 'smooth'
        });
      }, 50);
    }
  }

  trackByCue(index: number, cue: SubtitleCue): string {
    return cue.id.toString();
  }

  // Stable track function for tokens - uses surface + index for uniqueness
  trackByToken(index: number, token: Token): string {
    return `${token.surface}-${index}`;
  }

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

    if (typeof window !== 'undefined' && window.innerWidth <= 768 && this.wasPlayingBeforeGrammarLookup) {
      this.youtube.play();
      this.wasPlayingBeforeGrammarLookup = false;
    }
  }

  toggleGrammarMode(): void {
    this.grammar.toggleGrammarMode();
  }
}