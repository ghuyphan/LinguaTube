import { Component, OnDestroy, inject, effect, output, signal, computed, viewChild, ElementRef, ChangeDetectionStrategy, HostListener, input, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { VocabularyQuickViewComponent } from '../../vocabulary/vocabulary-quick-view/vocabulary-quick-view.component';
import { GrammarPopupComponent } from '../../dictionary/grammar-popup/grammar-popup.component';
import { SubtitleService, YoutubeService, VocabularyService, SettingsService, TranscriptService, I18nService, GrammarService, TranslationService } from '../../../services';
import { SubtitleCue, Token, GrammarMatch, GrammarPattern, ReadingDisplayMode, SupportedLearningLanguage, SupportedGrammarLang } from '../../../models';
import { QuizService } from '../quiz.service';
import { QuizInputComponent } from '../../quiz/quiz-input/quiz-input.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { SwitchComponent } from '../../../shared/components/switch/switch.component';
import { formatTime } from '../../../core/utils';

@Component({
  selector: 'app-subtitle-display',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IconComponent,
    VocabularyQuickViewComponent,
    GrammarPopupComponent,
    QuizInputComponent,
    BottomSheetComponent,
    SwitchComponent
  ],
  templateUrl: './subtitle-display.component.html',
  styleUrl: './subtitle-display.component.scss',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('200ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 0, transform: 'translateY(-4px)' }))
      ])
    ])
  ]
})
export class SubtitleDisplayComponent implements OnDestroy {
  subtitles = inject(SubtitleService);
  youtube = inject(YoutubeService);
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  transcript = inject(TranscriptService);
  i18n = inject(I18nService);
  grammar = inject(GrammarService);
  translation = inject(TranslationService);
  quiz = inject(QuizService);

  readonly whisperAvailable = computed(() => {
    const error = this.transcript.error();
    const availableAI = this.transcript.availableLanguages().ai;

    if (error === 'NO_NATIVE' && availableAI.length > 0) {
      return false;
    }

    return this.transcript.whisperAvailable();
  });

  readonly isGeneratingAI = this.transcript.isGeneratingAI;

  readonly subtitleList = viewChild<ElementRef<HTMLDivElement>>('subtitleList');
  readonly currentSubtitleInner = viewChild<ElementRef<HTMLDivElement>>('currentSubtitleInner');

  wordClicked = output<{ token: Token; sentence: string }>();
  manualAITrigger = output<void>();
  switchLanguage = output<string>();
  retryRequested = output<void>();

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

  toastMessage = signal<string | null>(null);
  toastType = signal<'success' | 'error'>('success');
  private toastTimeout: ReturnType<typeof setTimeout> | null = null;

  showToast(message: string, type: 'success' | 'error' = 'success'): void {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastMessage.set(message);
    this.toastType.set(type);

    this.toastTimeout = setTimeout(() => {
      this.toastMessage.set(null);
      this.toastType.set('success');
    }, 3000);
  }

  showAddedSheet = signal(false);
  showSubtitleOptionsSheet = signal(false);
  recentCount = computed(() => {
    const lang = this.settings.settings().language;
    return this.vocab.getByLanguage(lang).length;
  });

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

  readingDisplayMode = computed(() =>
    this.settings.getReadingDisplayMode(this.effectiveLanguage() as SupportedLearningLanguage)
  );

  showReading = computed(() =>
    this.settings.showReadingText(this.effectiveLanguage() as SupportedLearningLanguage)
  );

  showReadingAnnotation = computed(() =>
    this.settings.showReadingAnnotation(this.effectiveLanguage() as SupportedLearningLanguage)
  );

  supportsReadingDisplay = computed(() =>
    this.settings.hasReadingSupport(this.effectiveLanguage() as SupportedLearningLanguage)
  );

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

    // Return cached if same cue, vocab unchanged, and cache is not stale fallback
    const hasServerTokens = (cue.tokens?.length ?? 0) > 0;
    const cachedEntry = this.tokenCache.get(cacheKey);
    const cacheStale = cachedEntry && hasServerTokens && cachedEntry.length !== cue.tokens!.length;

    if (this.lastCueId === cue.id && !vocabChanged && cachedEntry && !cacheStale) {
      return cachedEntry;
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

  // Grammar detection (reacts to loadedLanguages so first cue highlights immediately upon lazy load)
  grammarMatches = computed(() => {
    // Read reactive signal to auto-recompute when pattern lazy loading finishes
    this.grammar.loadedLanguages();

    const tokens = this.currentTokens();
    if (tokens.length === 0 || !this.grammar.grammarModeEnabled()) return [];

    const lang = this.effectiveLanguage();
    if (!lang || !['ja', 'zh', 'ko', 'en'].includes(lang)) return [];

    return this.grammar.detectPatterns(tokens, lang as 'ja' | 'zh' | 'ko' | 'en');
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

  viewTokens = computed(() => {
    const tokens = this.currentTokens();
    const grammarIndices = this.grammarTokenIndices();
    const lang = this.effectiveLanguage();

    return tokens.map((token, index) => {
      const readingText = this.settings.getReadingText(lang as SupportedLearningLanguage, token) || undefined;

      const displayText = this.settings.useReadingOnly(lang as SupportedLearningLanguage) && readingText
        ? readingText
        : token.surface;

      return {
        ...token,
        isGrammar: grammarIndices.has(index),
        readingText,
        displayText,
        isSaved: this.vocab.hasWord(token.surface)
      };
    });
  });

  selectedGrammarPattern = signal<GrammarPattern | null>(null);
  grammarPopupOpen = signal(false);

  // Dual subtitles state
  cueTranslations = this.subtitles.cueTranslations;
  isTranslatingDual = signal(false);
  isDualCached = signal(false);

  private lastLazyLoadedIndex = -1;
  private readonly LAZY_LOAD_BATCH_SIZE = 50;
  private readonly LAZY_LOAD_BUFFER = 15;

  // ============================================
  // FIX 4: Throttled lazy loading
  // ============================================
  private isLazyLoadPending = false;
  private lazyLoadSubscription: Subscription | null = null;
  private dualSubSubscription: Subscription | null = null;

  private lazyLoadUpcomingCues(): void {
    if (this.isLazyLoadPending) return;

    const currentIndex = this.subtitles.currentCueIndex();
    if (currentIndex < 0) return;

    const cues = this.subtitles.subtitles();
    const map = this.cueTranslations();

    // OPTIMIZATION: Check if we have enough buffer before loading
    // We only load if we are running out of translated cues ahead
    const checkIndex = currentIndex + this.LAZY_LOAD_BUFFER;
    const hasBuffer = checkIndex >= cues.length || map.has(cues[checkIndex].id);
    const hasCurrent = map.has(cues[currentIndex].id);

    // If we have coverage at current pos AND at buffer distance, we skip loading
    if (hasBuffer && hasCurrent) {
      return;
    }

    // Start checking from current index
    const startIdx = Math.max(0, currentIndex);
    // Look further ahead (batch size)
    const endIdx = Math.min(cues.length - 1, startIdx + this.LAZY_LOAD_BATCH_SIZE - 1);

    const cuesToTranslate: { id: string, text: string }[] = [];

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
    this.subtitles.isDualSubLoading.set(true);

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
        this.showToast(this.i18n.t('subtitle.translationFailed') || 'Translation failed. Please try again.', 'error');
      }
    });
  }

  private clearLoadingState(): void {
    this.isTranslatingDual.set(false);
    this.subtitles.isDualSubLoading.set(false);
    this.isLazyLoadPending = false;
  }

  private lastUserScrollTime = 0;
  private readonly SCROLL_DEBOUNCE_MS = 1500;

  private lastListUserScrollTime = 0;
  private readonly LIST_SCROLL_DEBOUNCE_MS = 3000;

  onSubtitleListScroll(): void {
    this.lastListUserScrollTime = Date.now();
  }

  onCurrentSubtitleScroll(): void {
    this.lastUserScrollTime = Date.now();

    const innerEl = this.currentSubtitleInner()?.nativeElement;
    if (innerEl) {
      const scrollTop = innerEl.scrollTop;
      this.hasScrollTop.set(scrollTop > 8);
    }
  }

  constructor() {
    // Proactively preload grammar patterns for the active learning language
    effect(() => {
      const lang = this.effectiveLanguage();
      if (lang && ['ja', 'zh', 'ko', 'en'].includes(lang) && this.grammar.grammarModeEnabled()) {
        this.grammar.preloadPatterns(lang as SupportedGrammarLang);
      }
    });

    // Auto-scroll to active cue in the list
    effect(() => {
      if (this.isVideoFullscreen()) return;
      const currentCue = this.subtitles.currentCue();
      if (currentCue && this.subtitleList()?.nativeElement) {
        setTimeout(() => this.scrollToActiveCue(currentCue.id), 0);
      }
    });

    // Auto-scroll current subtitle display to top when cue changes
    effect(() => {
      if (this.isVideoFullscreen()) return;
      const currentCue = this.subtitles.currentCue();
      const innerEl = this.currentSubtitleInner()?.nativeElement;
      if (currentCue && innerEl) {
        const timeSinceUserScroll = Date.now() - this.lastUserScrollTime;
        if (timeSinceUserScroll > this.SCROLL_DEBOUNCE_MS) {
          innerEl.scrollTop = 0;
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
        this.isLazyLoadPending = false;
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
          this.subtitles.isDualSubLoading.set(true);
        }

        // Use untracked for the subscription to avoid infinite loops
        untracked(() => {
          // CACHE-FIRST STRATEGY: 
          // 1. First check if we have a full server-side cache (onlyCache=true)
          // 2. If not, normal flow (lazy load will trigger later)

          const mappedCues = cues.map(c => ({ text: c.text, start: c.startTime, duration: c.endTime - c.startTime }));
          this.dualSubSubscription = this.translation.getDualSubtitles(videoId, lang, targetLang, mappedCues, true)
            .subscribe({
              next: (translatedSegments) => {
                if (this.subtitles.dualSubtitleTargetLang() !== targetLang) return; // Stale

                if (translatedSegments && translatedSegments.length) {
                  // Cache hit! Populate everything
                  const newMap = new Map<string, string>();
                  let hasContent = false;

                  translatedSegments.forEach((seg, index: number) => {
                    if (index < cues.length && seg.translation) {
                      newMap.set(cues[index].id, seg.translation);
                      hasContent = true;
                    }
                  });

                  if (hasContent) {
                    this.cueTranslations.set(newMap);
                    this.isDualCached.set(true);
                    this.isTranslatingDual.set(false);
                    this.subtitles.isDualSubLoading.set(false);
                    return;
                  }
                }

                // Cache miss or empty
                this.isDualCached.set(false);
                this.lastLazyLoadedIndex = -1;
                // Force lazy load start immediately if we missed cache
                this.lazyLoadUpcomingCues();
              },
              error: (err) => {
                console.error('[SubtitleDisplay] Cache check failed:', err);
                this.isDualCached.set(false);
                this.lastLazyLoadedIndex = -1;
                this.isTranslatingDual.set(false);
                this.subtitles.isDualSubLoading.set(false);
                this.showToast(this.i18n.t('subtitle.translationFailed') || 'Translation failed. Please try again.', 'error');
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
        this.subtitles.isDualSubLoading.set(false);
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
    const container = this.subtitleList()?.nativeElement;
    if (!container) return;
    if (Date.now() - this.lastListUserScrollTime < this.LIST_SCROLL_DEBOUNCE_MS) return;
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
    return this.getReadingDisplayLabel(
      this.readingDisplayMode(),
      this.effectiveLanguage() as SupportedLearningLanguage
    );
  });

  toggleReading(): void {
    this.settings.toggleReadingDisplay(this.effectiveLanguage() as SupportedLearningLanguage);
  }

  private getReadingDisplayLabel(
    mode: ReadingDisplayMode,
    language: SupportedLearningLanguage
  ): string {
    if (language === 'en') {
      return this.i18n.t('settings.textOnly');
    }

    switch (language) {
      case 'ja':
        if (mode === 'native') return this.i18n.t('settings.kanjiOnly');
        if (mode === 'annotated') return this.i18n.t('settings.kanjiFurigana');
        if (mode === 'annotatedRomanized') return this.i18n.t('settings.kanjiRomaji');
        if (mode === 'romanized') return this.i18n.t('settings.romajiOnly');
        return this.i18n.t('settings.kanaOnly');
      case 'zh':
        if (mode === 'native') return this.i18n.t('settings.hanziOnly');
        if (mode === 'annotated') return this.i18n.t('settings.hanziPinyin');
        return this.i18n.t('settings.pinyinOnly');
      case 'ko':
        if (mode === 'native') return this.i18n.t('settings.hangulOnly');
        if (mode === 'annotated') return this.i18n.t('settings.hangulRomanization');
        return this.i18n.t('settings.romanizationOnly');
      default:
        return this.i18n.t('settings.textOnly');
    }
  }

  readonly fontSizes: ('small' | 'medium' | 'large' | 'xlarge')[] = ['small', 'medium', 'large', 'xlarge'];

  cycleFontSize(): void {
    const current = this.settings.settings().fontSize;
    const currentIndex = this.fontSizes.indexOf(current as 'small' | 'medium' | 'large' | 'xlarge');
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

  openSubtitleOptions(): void {
    this.showSubtitleOptionsSheet.set(true);
  }

  closeSubtitleOptions(): void {
    this.showSubtitleOptionsSheet.set(false);
  }

  readonly readingModeName = computed(() => {
    const lang = this.effectiveLanguage();
    if (lang === 'ja') return 'Furigana';
    if (lang === 'zh') return 'Pinyin';
    if (lang === 'ko') return 'Romanization';
    return 'Reading';
  });

  setFontSize(size: 'small' | 'medium' | 'large' | 'xlarge'): void {
    this.settings.setFontSize(size);
  }

  toggleDualSubtitles(): void {
    this.settings.toggleDualSubtitles();
  }

  getReadingScriptIcon(): string {
    const lang = this.effectiveLanguage();
    if (lang === 'ja') return 'あ';
    if (lang === 'zh') return '拼';
    if (lang === 'ko') return '한';
    return 'Aa';
  }

  retryCaptions(): void {
    this.retryRequested.emit();
  }

  seekToCue(cue: SubtitleCue): void {
    if (this.isLoopEnabled()) {
      this.disableLoop();
    }
    this.youtube.seekTo(cue.startTime);
  }

  toggleLoop(): void {
    if (this.subtitles.subtitles().length === 0) return;

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
    return formatTime(seconds);
  }

  toggleAddedSheet(): void {
    this.showAddedSheet.update(v => !v);
  }

  trackByCue(index: number, cue: SubtitleCue): string {
    return cue.id.toString();
  }

  // Stable track function for tokens - uses surface + index for uniqueness
  trackByToken(index: number, token: Token): string {
    return `${token.surface}-${index}`;
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

  toggleQuizMode(): void {
    if (this.quiz.isActive()) {
      this.quiz.stopQuiz();
    } else {
      if (this.subtitles.subtitles().length === 0) return;
      if (this.isLoopEnabled()) {
        this.disableLoop();
      }
      this.quiz.startQuiz();
    }
  }

  ngOnDestroy(): void {
    if (this.lazyLoadSubscription) {
      this.lazyLoadSubscription.unsubscribe();
    }
    if (this.dualSubSubscription) {
      this.dualSubSubscription.unsubscribe();
    }
  }
}
