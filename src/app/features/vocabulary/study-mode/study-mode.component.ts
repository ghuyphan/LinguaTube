import { Component, inject, signal, computed, ChangeDetectionStrategy, HostListener, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { SwitchComponent } from '../../../shared/components/switch/switch.component';
import { VocabularyService } from '../vocabulary.service';
import { SettingsService, I18nService, AudioService } from '../../../core/services';
import { StreakService } from '../../../services/streak.service';
import { ReadingDisplayMode, SupportedLearningLanguage, VocabularyItem } from '../../../models';
import { calculateSRSPreview, formatTime, SRSIntervalPreview } from '../../../core/utils';

const STUDY_AUTOPLAY_KEY = 'linguatube_study_autoplay';
const STUDY_CLOZE_KEY = 'linguatube_study_cloze';

function escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

@Component({
    selector: 'app-study-mode',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterLink, IconComponent, SwitchComponent],
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
    audioService = inject(AudioService);

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
    private confettiTimeout: ReturnType<typeof setTimeout> | null = null;

    // Swipe gestures
    touchStartX = 0;
    touchStartY = 0;
    private touchMoved = false;
    private isCardTouchActive = false;
    private lastTouchEndTime = 0;
    swipeOffset = signal(0);
    isSwiping = signal(false);

    currentLanguage = computed(() => this.settings.settings().language);
    deckStats = computed(() => this.vocab.getStatsByLanguage(this.currentLanguage()));

    // Due today count
    dueToday = computed(() => this.vocab.getDueCountByLanguage(this.currentLanguage()));

    // Filtered available cards based on study preferences
    readonly filteredAvailableItems = computed(() => {
        const currentLang = this.currentLanguage();
        const incNew = this.includeNew();
        const incLearning = this.includeLearning();
        const incKnown = this.includeKnown();
        const onlyDue = this.dueOnly();
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        return this.vocab.vocabulary().filter(item => {
            if (item.language !== currentLang) return false;
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
        const reading = this.settings.getReadingText(item.language, item);
        const primaryText = this.settings.useReadingOnly(item.language) && reading ? reading : item.word;
        const hasReading = !!reading && reading !== item.word;
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
            sourceTimestamp: item.sourceTimestamp
        };
    });

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

    currentReadingDisplayLabel = computed(() => {
        const language = this.currentLanguage();
        return this.getReadingDisplayLabel(this.settings.getReadingDisplayMode(language), language);
    });

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            const storedAutoPlay = localStorage.getItem(STUDY_AUTOPLAY_KEY);
            if (storedAutoPlay !== null) {
                this.autoPlayAudio.set(storedAutoPlay === 'true');
            }
            const storedCloze = localStorage.getItem(STUDY_CLOZE_KEY);
            if (storedCloze !== null) {
                this.clozeMode.set(storedCloze === 'true');
            }
        }
    }

    ngOnDestroy(): void {
        this.stopTimer();
        if (this.confettiTimeout) {
            clearTimeout(this.confettiTimeout);
            this.confettiTimeout = null;
        }
    }

    // Keyboard shortcuts
    @HostListener('document:keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
        if (!this.isStudying()) return;

        const card = this.currentCard();
        if (!card) return;

        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            return;
        }

        switch (event.code) {
            case 'Space':
                event.preventDefault();
                this.flipCard();
                break;
            case 'Digit1':
            case 'Numpad1':
                if (this.isAnswerRevealed()) {
                    event.preventDefault();
                    this.markAnswer('wrong');
                }
                break;
            case 'Digit2':
            case 'Numpad2':
                if (this.isAnswerRevealed()) {
                    event.preventDefault();
                    this.markAnswer('hard');
                }
                break;
            case 'Digit3':
            case 'Numpad3':
                if (this.isAnswerRevealed()) {
                    event.preventDefault();
                    this.markAnswer('good');
                }
                break;
            case 'Digit4':
            case 'Numpad4':
                if (this.isAnswerRevealed()) {
                    event.preventDefault();
                    this.markAnswer('easy');
                }
                break;
            case 'KeyR': {
                const vm = this.cardViewModel();
                if (vm) {
                    event.preventDefault();
                    this.playAudio(vm.primaryText, vm.item.language, undefined, vm.item.audio);
                }
                break;
            }
            case 'KeyP': {
                if (!this.isAnswerRevealed()) {
                    event.preventDefault();
                    this.togglePeekReading();
                }
                break;
            }
            case 'KeyV': {
                const vm = this.cardViewModel();
                if (vm?.sourceVideoId) {
                    event.preventDefault();
                    this.openVideoScene(vm.sourceVideoId, vm.sourceTimestamp);
                }
                break;
            }
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

    onCardClick(_event?: MouseEvent): void {
        if (this.lastTouchEndTime !== 0 && Date.now() - this.lastTouchEndTime < 400) {
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
            quality = 2;
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

        // Next card or complete
        if (this.currentIndex() < this.studyCards().length - 1) {
            this.currentIndex.update(i => i + 1);
            this.isAnswerRevealed.set(false);
            this.peekReading.set(false);
        } else {
            this.stopTimer();
            this.isStudying.set(false);
            this.isComplete.set(true);
            this.streak.recordActivity();
            this.triggerConfetti();
        }
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
        this.isStudying.set(false);
        this.isComplete.set(false);
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

    readonly formatTime = formatTime;

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

    setDailyGoal(goal: number): void {
        this.vocab.setDailyGoal(goal);
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
