import { Component, inject, signal, computed, ChangeDetectionStrategy, OnDestroy, PLATFORM_ID, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { SwitchComponent } from '../../../shared/components/switch/switch.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { VocabularyService } from '../vocabulary.service';
import { SettingsService, I18nService, AudioService, ToastService, KeyboardShortcutService } from '../../../core/services';
import { StreakService } from '../../../services/streak.service';
import { GrammarService } from '../../../services/grammar.service';
import { SupportedLearningLanguage, VocabularyItem, getLanguageFlagUrl } from '../../../models';
import { calculateSRSPreview, SRSIntervalPreview } from '../../../core/utils';
import { getReadingDisplayLabel } from '../../../shared/utils/language.utils';
import { FormatTimePipe } from '../../../shared/pipes';

const STUDY_AUTOPLAY_KEY = 'linguatube_study_autoplay';
const STUDY_CLOZE_KEY = 'linguatube_study_cloze';

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Component({
    selector: 'app-study-mode',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule, RouterLink, IconComponent, SwitchComponent, EmptyStateComponent, FormatTimePipe],
    templateUrl: './study-mode.component.html',
    styleUrls: ['./study-mode.component.scss']
})
export class StudyModeComponent implements OnDestroy {
    private platformId = inject(PLATFORM_ID);
    private router = inject(Router);

    vocab = inject(VocabularyService);
    settings = inject(SettingsService);
    i18n = inject(I18nService);
    streak = inject(StreakService);
    grammar = inject(GrammarService);
    audioService = inject(AudioService);
    toast = inject(ToastService);
    keyboardService = inject(KeyboardShortcutService);

    // Study Deck Selection: words vs grammar
    studyDeck = signal<'words' | 'grammar'>('words');

    // Options (reactive signals)
    includeNew = signal(true);
    includeLearning = signal(true);
    includeKnown = signal(false);
    dueOnly = signal(false);
    reverseMode = signal(false);
    sessionSize = signal<number | 'all'>(10);
    autoPlayAudio = signal(true);
    clozeMode = signal(false);

    // Active Card State
    isStudying = signal(false);
    isComplete = signal(false);
    isAnswerRevealed = signal(false);
    peekReading = signal(false);
    studyCards = signal<VocabularyItem[]>([]);
    currentIndex = signal(0);
    initialCardCount = signal(0);
    missedCardIds = signal<Set<string>>(new Set());

    sessionStats = signal({ total: 0, correct: 0, incorrect: 0 });

    // Session timer
    sessionStartTime = signal<Date | null>(null);
    elapsedSeconds = signal(0);
    private timerInterval: ReturnType<typeof setInterval> | null = null;

    // Daily goal & progress (shared from VocabularyService)
    dailyGoal = this.vocab.dailyGoal;
    cardsCompletedToday = this.vocab.cardsCompletedToday;
    goalProgress = this.vocab.goalProgress;

    // Confetti
    showConfetti = signal(false);
    private confettiTimeout: ReturnType<typeof setInterval> | null = null;

    // Swipe gestures
    touchStartX = 0;
    touchStartY = 0;
    private touchMoved = false;
    private isCardTouchActive = false;
    private lastTouchEndTime = 0;
    swipeOffset = signal(0);
    isSwiping = signal(false);

    currentLanguage = this.settings.language;

    deckCounts = computed(() => {
        const currentLang = this.currentLanguage();
        this.grammar.loadedLanguages();
        const items = this.vocab.vocabulary().filter(item => item.language === currentLang);
        let wordsCount = 0;
        let grammarCount = 0;
        for (const item of items) {
            if (this.grammar.isGrammar(item.word, item.language)) {
                grammarCount++;
            } else {
                wordsCount++;
            }
        }
        return {
            words: wordsCount,
            grammar: grammarCount
        };
    });

    deckStats = computed(() => {
        const currentLang = this.currentLanguage();
        this.grammar.loadedLanguages();
        const deck = this.studyDeck();
        let items = this.vocab.vocabulary().filter(item => item.language === currentLang);
        if (deck === 'words') {
            items = items.filter(item => !this.grammar.isGrammar(item.word, item.language));
        } else {
            items = items.filter(item => this.grammar.isGrammar(item.word, item.language));
        }
        return {
            total: items.length,
            new: items.filter(item => item.level === 'new').length,
            learning: items.filter(item => item.level === 'learning').length,
            known: items.filter(item => item.level === 'known').length,
            ignored: items.filter(item => item.level === 'ignored').length,
        };
    });

    // Due today count
    dueToday = computed(() => {
        const currentLang = this.currentLanguage();
        this.grammar.loadedLanguages();
        const deck = this.studyDeck();
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        return this.vocab.vocabulary().filter(item => {
            if (item.language !== currentLang || item.level === 'ignored') return false;
            if (deck === 'words' && this.grammar.isGrammar(item.word, item.language)) return false;
            if (deck === 'grammar' && !this.grammar.isGrammar(item.word, item.language)) return false;
            return !item.nextReviewDate || new Date(item.nextReviewDate) <= today;
        }).length;
    });

    // Filtered available cards based on study preferences
    readonly filteredAvailableItems = computed(() => {
        const currentLang = this.currentLanguage();
        this.grammar.loadedLanguages();
        const incNew = this.includeNew();
        const incLearning = this.includeLearning();
        const incKnown = this.includeKnown();
        const onlyDue = this.dueOnly();
        const deck = this.studyDeck();
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        return this.vocab.vocabulary().filter(item => {
            if (item.language !== currentLang) return false;
            if (deck === 'words' && this.grammar.isGrammar(item.word, item.language)) return false;
            if (deck === 'grammar' && !this.grammar.isGrammar(item.word, item.language)) return false;
            if (onlyDue && item.nextReviewDate && new Date(item.nextReviewDate) > today) return false;
            if (item.level === 'new' && incNew) return true;
            if (item.level === 'learning' && incLearning) return true;
            if (item.level === 'known' && incKnown) return true;
            return false;
        });
    });

    availableCards = computed(() => this.filteredAvailableItems().length);

    sessionCardCount = computed(() => {
        const avail = this.availableCards();
        const limit = this.sessionSize();
        if (limit === 'all') return avail;
        return Math.min(avail, limit);
    });

    estimatedMinutes = computed(() => {
        const count = this.sessionCardCount();
        return Math.max(1, Math.round(count * 0.3));
    });

    currentCard = computed(() => {
        const cards = this.studyCards();
        const index = this.currentIndex();
        return cards[index] || null;
    });

    readonly cardViewModel = computed(() => {
        const item = this.currentCard();
        if (!item) return null;
        this.grammar.loadedLanguages();
        const pattern = this.grammar.findPattern(item.word, item.language);
        const isGrammar = !!pattern || this.studyDeck() === 'grammar';
        const formation = pattern?.formation || null;
        const grammarLevel = pattern?.level || null;
        const reading = this.settings.getReadingText(item.language, item);
        const primaryText = this.settings.useReadingOnly(item.language) && reading ? reading : item.word;
        const hasReading = !isGrammar && !!reading && reading !== item.word;
        const showReadingBack = hasReading && this.settings.showReadingAnnotation(item.language);
        const showReadingFront = hasReading && this.peekReading();
        const hasContext = !!item.sourceSentence?.trim();
        const isFlipped = this.isAnswerRevealed();

        let maskedSentence = item.sourceSentence || '';
        if (this.clozeMode() && hasContext && item.word) {
            try {
                const regex = new RegExp(escapeRegex(item.word), 'gi');
                maskedSentence = maskedSentence.replace(regex, '【 ... 】');
            } catch {
                maskedSentence = item.sourceSentence || '';
            }
        }

        return {
            item,
            showAnswer: isFlipped,
            reading,
            primaryText,
            hasReading,
            showReadingBack,
            showReadingFront,
            hasContext,
            maskedSentence,
            sourceVideoId: item.sourceVideoId,
            sourceTimestamp: item.sourceTimestamp,
            isGrammar,
            pattern,
            formation,
            grammarLevel
        };
    });

    openGrammarPattern(event?: Event): void {
        if (event) event.stopPropagation();
        const vm = this.cardViewModel();
        if (vm?.pattern) {
            this.grammar.showPopup(vm.pattern);
        }
    }

    readonly intervalPreviews = computed<SRSIntervalPreview>(() => {
        const card = this.currentCard();
        if (!card) return { again: '<10m', hard: '1d', good: '3d', easy: '6d' };
        return calculateSRSPreview(card);
    });

    // Session progress for sidebar & header
    cardsRemainingInQueue = computed(() => Math.max(0, this.studyCards().length - this.currentIndex()));

    sessionAccuracy = computed(() => {
        const s = this.sessionStats();
        if (s.total === 0) return 100;
        return Math.round((s.correct / s.total) * 100);
    });

    currentLanguageLabel = computed(() => {
        switch (this.currentLanguage()) {
            case 'ja': return this.i18n.t('settings.japanese');
            case 'zh': return this.i18n.t('settings.chinese');
            case 'ko': return this.i18n.t('settings.korean');
            default: return this.i18n.t('settings.english');
        }
    });

    currentLanguageFlag = computed(() => getLanguageFlagUrl(this.currentLanguage()));

    currentReadingDisplayLabel = computed(() => {
        const language = this.currentLanguage();
        return getReadingDisplayLabel(this.settings.getReadingDisplayMode(language), language, k => this.i18n.t(k));
    });

    startDueOnlySession(): void {
        this.dueOnly.set(true);
        this.startSession();
    }

    readonly filteredLanguageVocabulary = computed(() => {
        const lang = this.currentLanguage();
        return this.vocab.vocabulary().filter(item => item.language === lang && item.level !== 'ignored');
    });

    constructor() {
        // Reset study session to overview screen when navigation tab or reset is triggered
        effect(() => {
            const trigger = this.vocab.studyResetTrigger();
            if (trigger > 0) {
                this.endSession();
            }
        });

        // Preload active and upcoming card audio for 0ms instant playback
        effect(() => {
            const card = this.currentCard();
            if (card && isPlatformBrowser(this.platformId)) {
                void this.audioService.preloadWord(card.word, card.language as SupportedLearningLanguage);
                const cards = this.studyCards();
                const nextCard = cards[this.currentIndex() + 1];
                if (nextCard) {
                    void this.audioService.preloadWord(nextCard.word, nextCard.language as SupportedLearningLanguage);
                }
            }
        });

        if (isPlatformBrowser(this.platformId)) {
            const storedAutoPlay = localStorage.getItem(STUDY_AUTOPLAY_KEY);
            if (storedAutoPlay !== null) {
                this.autoPlayAudio.set(storedAutoPlay === 'true');
            }
            const storedCloze = localStorage.getItem(STUDY_CLOZE_KEY);
            if (storedCloze !== null) {
                this.clozeMode.set(storedCloze === 'true');
            }

            // Register study mode active check with centralized KeyboardShortcutService
            this.keyboardService.setStudyActiveCallback(() => this.isStudying() && !this.isComplete());

            // Handle study keyboard shortcuts (Space, 1-4, R)
            this.keyboardService.events$
                .pipe(takeUntilDestroyed())
                .subscribe(event => {
                    if (!this.isStudying() || this.isComplete()) return;
                    if (event.type === 'study-flip') {
                        if (!this.isAnswerRevealed()) {
                            this.flipCard();
                        }
                    } else if (event.type === 'study-rate') {
                        if (this.isAnswerRevealed()) {
                            this.markAnswer(event.data.rating);
                        }
                    } else if (event.type === 'study-audio') {
                        const vm = this.cardViewModel();
                        if (vm) {
                            this.playAudio(vm.primaryText, vm.item.language, undefined, vm.item.audio);
                        }
                    }
                });
        }
    }

    ngOnDestroy(): void {
        this.keyboardService.setStudyActiveCallback(null);
        this.stopTimer();
        this.audioService.stopAudio();
        if (this.confettiTimeout) {
            clearTimeout(this.confettiTimeout);
            this.confettiTimeout = null;
        }
    }

    toggleDeck(level: 'new' | 'learning' | 'known'): void {
        if (level === 'new') this.includeNew.update(v => !v);
        else if (level === 'learning') this.includeLearning.update(v => !v);
        else if (level === 'known') this.includeKnown.update(v => !v);
    }

    setSessionSize(size: number | 'all'): void {
        this.sessionSize.set(size);
    }

    setAutoPlayAudio(enabled: boolean): void {
        this.autoPlayAudio.set(enabled);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(STUDY_AUTOPLAY_KEY, enabled.toString());
        }
    }

    setClozeMode(enabled: boolean): void {
        this.clozeMode.set(enabled);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(STUDY_CLOZE_KEY, enabled.toString());
        }
    }

    togglePeekReading(event?: Event): void {
        if (event) event.stopPropagation();
        this.peekReading.update(v => !v);
    }

    playAudio(text: string, lang?: string, event?: Event, audioUrl?: string): void {
        if (event) event.stopPropagation();
        const targetLang = (lang || this.currentLanguage()) as SupportedLearningLanguage;
        void this.audioService.playWord(text, targetLang, audioUrl);
    }

    openVideoScene(videoId: string, timestamp?: number, event?: Event): void {
        if (event) event.stopPropagation();
        const t = Math.floor(timestamp || 0);
        void this.router.navigate(['/video'], { queryParams: { v: videoId, t } });
    }

    startSession(): void {
        const items = [...this.filteredAvailableItems()];
        if (items.length === 0) return;

        const today = new Date();
        today.setHours(23, 59, 59, 999);

        // Sort by overdue first, then by level priority
        items.sort((a, b) => {
            const aDate = a.nextReviewDate ? new Date(a.nextReviewDate) : new Date(0);
            const bDate = b.nextReviewDate ? new Date(b.nextReviewDate) : new Date(0);

            const aOverdue = aDate <= today;
            const bOverdue = bDate <= today;
            if (aOverdue && !bOverdue) return -1;
            if (!aOverdue && bOverdue) return 1;

            if (aDate.getTime() !== bDate.getTime()) {
                return aDate.getTime() - bDate.getTime();
            }

            const levelOrder = { new: 0, learning: 1, known: 2, ignored: 3 };
            return levelOrder[a.level] - levelOrder[b.level];
        });

        const limit = this.sessionSize();
        const sessionItems = limit === 'all' ? items : items.slice(0, limit);

        this.studyCards.set(sessionItems);

        this.initialCardCount.set(sessionItems.length);
        this.missedCardIds.set(new Set());
        this.currentIndex.set(0);
        this.isAnswerRevealed.set(false);
        this.peekReading.set(false);
        this.isStudying.set(true);
        this.isComplete.set(false);
        this.sessionStats.set({ total: 0, correct: 0, incorrect: 0 });
        this.swipeOffset.set(0);

        this.sessionStartTime.set(new Date());
        this.elapsedSeconds.set(0);
        this.startTimer();
    }

    flipCard(): void {
        const currentlyFlipped = this.isAnswerRevealed();
        this.isAnswerRevealed.set(!currentlyFlipped);

        if (!currentlyFlipped && this.autoPlayAudio()) {
            const vm = this.cardViewModel();
            if (vm) {
                this.playAudio(vm.primaryText, vm.item.language, undefined, vm.item.audio);
            }
        }
    }

    onCardClick(event?: MouseEvent): void {
        if (this.lastTouchEndTime !== 0 && Date.now() - this.lastTouchEndTime < 400) {
            return;
        }
        if (event && (event.target as HTMLElement)?.closest?.('button, a, .card-action-interactive')) {
            return;
        }
        this.flipCard();
    }

    markAnswer(answer: 'wrong' | 'hard' | 'good' | 'easy'): void {
        const card = this.currentCard();
        if (!card) return;

        let quality: number;
        let isCorrect = false;
        if (answer === 'wrong') {
            quality = 1;
        } else if (answer === 'hard') {
            quality = 3;
            isCorrect = true;
        } else if (answer === 'good') {
            quality = 4;
            isCorrect = true;
        } else {
            quality = 5;
            isCorrect = true;
        }

        // Track missed cards for review missed action
        if (!isCorrect) {
            this.missedCardIds.update(set => {
                const next = new Set(set);
                next.add(card.id);
                return next;
            });
        }

        this.sessionStats.update(prev => ({
            total: prev.total + 1,
            correct: isCorrect ? prev.correct + 1 : prev.correct,
            incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect
        }));

        // Update vocabulary using SM-2 algorithm
        this.vocab.markReviewedSRS(card.id, quality);

        // Update daily progress
        this.vocab.incrementDailyProgress();

        // Failed card recycling: append to end of session queue
        if (answer === 'wrong') {
            this.studyCards.update(cards => [
                ...cards,
                card
            ]);
        }

        this.swipeOffset.set(0);
        this.audioService.stopAudio();

        // Next card or complete
        if (this.currentIndex() < this.studyCards().length - 1) {
            this.currentIndex.update(i => i + 1);
            this.isAnswerRevealed.set(false);
            this.peekReading.set(false);
        } else {
            this.stopTimer();
            this.isStudying.set(false);
            this.isComplete.set(true);
            this.streak.recordActivity().then(() => {
                this.showStreakToast();
            });
            this.triggerConfetti();
        }
    }

    private showStreakToast(): void {
        const result = this.streak.lastActivityResult();
        const streakCount = this.streak.currentStreak();
        if (!result && streakCount <= 0) return;

        let message = '';
        if (result?.isNewRecord) {
            message = `${this.i18n.t('streak.newRecord') || 'New Streak Record! 🔥'} ${this.i18n.t('streak.daysReached', { count: streakCount })}`;
        } else if (result?.freezeUsed) {
            message = `${this.i18n.t('streak.saved') || 'Streak Saved! ❄️'} ${this.i18n.t('streak.freezeUsed') || 'You used a streak freeze.'}`;
        } else {
            message = `${this.i18n.t('streak.extended') || 'Streak Extended! 🔥'} ${this.i18n.t('streak.onStreak', { count: streakCount })}`;
        }

        this.toast.show(message, {
            type: 'warning',
            icon: 'fire',
            duration: 4000
        });
    }

    reviewMissedCards(): void {
        const missedIds = this.missedCardIds();
        if (missedIds.size === 0) return;

        const missedItems = this.vocab.vocabulary().filter(v => missedIds.has(v.id));
        if (missedItems.length === 0) return;

        this.studyCards.set(missedItems);
        this.initialCardCount.set(missedItems.length);
        this.missedCardIds.set(new Set());
        this.currentIndex.set(0);
        this.isAnswerRevealed.set(false);
        this.peekReading.set(false);
        this.isStudying.set(true);
        this.isComplete.set(false);
        this.sessionStats.set({ total: 0, correct: 0, incorrect: 0 });
        this.swipeOffset.set(0);

        this.sessionStartTime.set(new Date());
        this.elapsedSeconds.set(0);
        this.startTimer();
    }

    endSession(): void {
        this.stopTimer();
        this.audioService.stopAudio();
        this.isStudying.set(false);
        this.isComplete.set(false);
        this.showConfetti.set(false);
        this.swipeOffset.set(0);
        this.isSwiping.set(false);
    }

    resetSession(): void {
        this.isComplete.set(false);
        this.showConfetti.set(false);
        this.startSession();
    }

    private startTimer(): void {
        this.timerInterval = setInterval(() => {
            this.elapsedSeconds.update(s => s + 1);
        }, 1000);
    }

    private stopTimer(): void {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    private triggerConfetti(): void {
        this.showConfetti.set(true);
        if (this.confettiTimeout) {
            clearTimeout(this.confettiTimeout);
        }
        this.confettiTimeout = setTimeout(() => {
            this.showConfetti.set(false);
            this.confettiTimeout = null;
        }, 3000);
    }

    onTouchStart(event: TouchEvent): void {
        if (!this.isStudying()) return;
        if ((event.target as HTMLElement)?.closest('.card-action-interactive')) {
            this.isCardTouchActive = false;
            return;
        }
        this.isCardTouchActive = true;
        this.touchStartX = event.touches[0].clientX;
        this.touchStartY = event.touches[0].clientY;
        this.touchMoved = false;
    }

    onTouchMove(event: TouchEvent): void {
        if (!this.isCardTouchActive || !this.touchStartX || !this.touchStartY) return;

        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;
        const deltaX = currentX - this.touchStartX;
        const deltaY = Math.abs(currentY - this.touchStartY);

        if (Math.abs(deltaX) > 10 || deltaY > 10) {
            this.touchMoved = true;
        }

        if (this.isAnswerRevealed()) {
            if (deltaY > 60) {
                this.isSwiping.set(false);
                this.swipeOffset.set(0);
                return;
            }
            if (Math.abs(deltaX) > 10) {
                this.isSwiping.set(true);
                this.swipeOffset.set(deltaX);
            }
        }
    }

    onTouchEnd(event?: TouchEvent): void {
        this.lastTouchEndTime = Date.now();
        if (!this.isCardTouchActive) return;
        this.isCardTouchActive = false;

        if ((event?.target as HTMLElement)?.closest('.card-action-interactive')) {
            return;
        }

        if (this.isSwiping()) {
            this.isSwiping.set(false);
            const offset = this.swipeOffset();
            const threshold = 75;

            if (offset < -threshold) {
                this.markAnswer('wrong');
                return;
            } else if (offset > threshold) {
                this.markAnswer('good');
                return;
            } else {
                this.swipeOffset.set(0);
            }
        }

        if (!this.touchMoved) {
            this.flipCard();
        }
    }

    onTouchCancel(): void {
        this.isCardTouchActive = false;
        this.isSwiping.set(false);
        this.swipeOffset.set(0);
        this.touchMoved = false;
    }
}
