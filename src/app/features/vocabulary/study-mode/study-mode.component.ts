import { Component, inject, signal, computed, ChangeDetectionStrategy, HostListener, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { SwitchComponent } from '../../../shared/components/switch/switch.component';
import { VocabularyService, SettingsService, I18nService } from '../../../services';
import { StreakService } from '../../../services/streak.service';
import { ReadingDisplayMode, SupportedLearningLanguage, VocabularyItem } from '../../../models';
import { formatTime } from '../../../core/utils';

import { RouterLink } from '@angular/router';

interface StudyCard {
    item: VocabularyItem;
    showAnswer: boolean;
}

const DAILY_GOAL_KEY = 'linguatube_daily_goal';
const DAILY_PROGRESS_KEY = 'linguatube_daily_progress';

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
    vocab = inject(VocabularyService);
    settings = inject(SettingsService);
    i18n = inject(I18nService);
    streak = inject(StreakService);

    // Options (reactive signals)
    includeNew = signal(true);
    includeLearning = signal(true);
    includeKnown = signal(false);
    reverseMode = signal(false);
    sessionSize = signal<number | 'all'>(10);

    // State
    isStudying = signal(false);
    isComplete = signal(false);
    studyCards = signal<StudyCard[]>([]);
    currentIndex = signal(0);

    sessionStats = signal({ total: 0, correct: 0, incorrect: 0 });

    // Session timer
    sessionStartTime = signal<Date | null>(null);
    elapsedSeconds = signal(0);
    private timerInterval: ReturnType<typeof setInterval> | null = null;

    // Daily goal
    dailyGoal = signal(10);
    cardsCompletedToday = signal(0);

    // Confetti
    showConfetti = signal(false);

    // Swipe gestures
    touchStartX = 0;
    touchStartY = 0;
    swipeOffset = signal(0);
    isSwiping = signal(false);

    currentLanguage = computed(() => this.settings.settings().language);

    deckStats = computed(() => this.vocab.getStatsByLanguage(this.currentLanguage()));

    // Due today count
    dueToday = computed(() => {
        const currentLang = this.currentLanguage();
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        return this.vocab.vocabulary().filter(item => {
            if (item.language !== currentLang) return false;
            if (item.level === 'ignored') return false;
            if (!item.nextReviewDate) return true; // New items are always due
            return new Date(item.nextReviewDate) <= today;
        }).length;
    });

    availableCards = computed(() => {
        const currentLang = this.currentLanguage();
        const incNew = this.includeNew();
        const incLearning = this.includeLearning();
        const incKnown = this.includeKnown();

        return this.vocab.vocabulary().filter(item => {
            if (item.language !== currentLang) return false;
            if (item.level === 'new' && incNew) return true;
            if (item.level === 'learning' && incLearning) return true;
            if (item.level === 'known' && incKnown) return true;
            return false;
        }).length;
    });

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

    // Goal progress percentage
    goalProgress = computed(() => {
        const done = this.cardsCompletedToday();
        const goal = this.dailyGoal();
        return Math.min(100, Math.round((done / goal) * 100));
    });

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.loadDailyProgress();
        }
    }

    ngOnDestroy(): void {
        this.stopTimer();
    }

    getCardPrimaryText(item: VocabularyItem): string {
        const reading = this.getCardReading(item);

        if (this.settings.useReadingOnly(item.language) && reading) {
            return reading;
        }

        return item.word;
    }

    getCardReading(item: VocabularyItem): string | null {
        return this.settings.getReadingText(item.language, item);
    }

    showCardReading(item: VocabularyItem): boolean {
        const reading = this.getCardReading(item);

        return !!reading
            && reading !== item.word
            && this.settings.showReadingAnnotation(item.language);
    }

    hasSentenceContext(item: VocabularyItem): boolean {
        return !!item.sourceSentence?.trim();
    }

    // Keyboard shortcuts
    @HostListener('document:keydown', ['$event'])
    handleKeydown(event: KeyboardEvent): void {
        if (!this.isStudying()) return;

        const card = this.currentCard();
        if (!card) return;

        // Ignore if user is typing in an input
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            return;
        }

        switch (event.code) {
            case 'Space':
                event.preventDefault();
                if (!card.showAnswer) {
                    this.flipCard();
                }
                break;
            case 'Digit1':
            case 'Numpad1':
                if (card.showAnswer) {
                    event.preventDefault();
                    this.markAnswer('wrong');
                }
                break;
            case 'Digit2':
            case 'Numpad2':
                if (card.showAnswer) {
                    event.preventDefault();
                    this.markAnswer('hard');
                }
                break;
            case 'Digit3':
            case 'Numpad3':
                if (card.showAnswer) {
                    event.preventDefault();
                    this.markAnswer('good');
                }
                break;
            case 'Digit4':
            case 'Numpad4':
                if (card.showAnswer) {
                    event.preventDefault();
                    this.markAnswer('easy');
                }
                break;
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

    playAudio(text: string, lang?: string, event?: Event): void {
        if (event) event.stopPropagation();
        if (!isPlatformBrowser(this.platformId)) return;
        try {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const targetLang = lang || this.currentLanguage();
            utterance.lang = targetLang === 'ja' ? 'ja-JP' : targetLang === 'zh' ? 'zh-CN' : targetLang === 'ko' ? 'ko-KR' : 'en-US';
            utterance.rate = 0.88;
            window.speechSynthesis.speak(utterance);
        } catch (e) {
            console.warn('Speech synthesis not available:', e);
        }
    }

    startSession(): void {
        const currentLang = this.currentLanguage();
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        const incNew = this.includeNew();
        const incLearning = this.includeLearning();
        const incKnown = this.includeKnown();

        const items = this.vocab.vocabulary().filter(item => {
            if (item.language !== currentLang) return false;
            if (item.level === 'new' && incNew) return true;
            if (item.level === 'learning' && incLearning) return true;
            if (item.level === 'known' && incKnown) return true;
            return false;
        });

        if (items.length === 0) return;

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

        // Apply session size limit
        const limit = this.sessionSize();
        const sessionItems = limit === 'all' ? items : items.slice(0, limit);

        this.studyCards.set(sessionItems.map(item => ({
            item,
            showAnswer: false
        })));

        this.currentIndex.set(0);
        this.isStudying.set(true);
        this.isComplete.set(false);
        this.sessionStats.set({ total: 0, correct: 0, incorrect: 0 });
        this.swipeOffset.set(0);

        // Start timer
        this.sessionStartTime.set(new Date());
        this.elapsedSeconds.set(0);
        this.startTimer();
    }

    flipCard(): void {
        const cards = this.studyCards();
        const index = this.currentIndex();

        if (cards[index] && !cards[index].showAnswer) {
            cards[index].showAnswer = true;
            this.studyCards.set([...cards]);
        }
    }

    markAnswer(answer: 'wrong' | 'hard' | 'good' | 'easy'): void {
        const card = this.currentCard();
        if (!card) return;

        const stats = this.sessionStats();
        stats.total++;

        // Map answer to SM-2 quality score (0-5)
        // wrong=1, hard=2, good=4, easy=5
        let quality: number;
        if (answer === 'wrong') {
            quality = 1;
            stats.incorrect++;
        } else if (answer === 'hard') {
            quality = 2;
            stats.incorrect++;  // Hard counts as needing more practice
        } else if (answer === 'good') {
            quality = 4;
            stats.correct++;
        } else {
            quality = 5;
            stats.correct++;
        }

        this.sessionStats.set({ ...stats });

        // Update vocabulary using SM-2 algorithm
        this.vocab.markReviewedSRS(card.item.id, quality);

        // Update daily progress
        this.incrementDailyProgress();

        // Reset swipe
        this.swipeOffset.set(0);

        // Next card or complete
        if (this.currentIndex() < this.studyCards().length - 1) {
            this.currentIndex.update(i => i + 1);
        } else {
            this.stopTimer();
            this.isStudying.set(false);
            this.isComplete.set(true);
            // Record activity for streak tracking
            this.streak.recordActivity();
            // Show confetti
            this.triggerConfetti();
        }
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

    // Timer methods
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

    formatTime(seconds: number): string {
        return formatTime(seconds);
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

    // Daily goal methods
    private loadDailyProgress(): void {
        const today = new Date().toDateString();
        const stored = localStorage.getItem(DAILY_PROGRESS_KEY);

        if (stored) {
            const data = JSON.parse(stored);
            if (data.date === today) {
                this.cardsCompletedToday.set(data.count);
            } else {
                // New day, reset progress
                this.cardsCompletedToday.set(0);
                this.saveDailyProgress();
            }
        }

        const goalStored = localStorage.getItem(DAILY_GOAL_KEY);
        if (goalStored) {
            this.dailyGoal.set(parseInt(goalStored, 10));
        }
    }

    private saveDailyProgress(): void {
        const today = new Date().toDateString();
        localStorage.setItem(DAILY_PROGRESS_KEY, JSON.stringify({
            date: today,
            count: this.cardsCompletedToday()
        }));
    }

    private incrementDailyProgress(): void {
        this.cardsCompletedToday.update(c => c + 1);
        this.saveDailyProgress();
    }

    // Confetti
    private triggerConfetti(): void {
        this.showConfetti.set(true);
        setTimeout(() => {
            this.showConfetti.set(false);
        }, 3000);
    }

    // Swipe gesture handlers
    onTouchStart(event: TouchEvent): void {
        if (!this.isStudying()) return;
        this.touchStartX = event.touches[0].clientX;
        this.touchStartY = event.touches[0].clientY;
        this.isSwiping.set(true);
    }

    onTouchMove(event: TouchEvent): void {
        if (!this.isSwiping()) return;

        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;
        const deltaX = currentX - this.touchStartX;
        const deltaY = Math.abs(currentY - this.touchStartY);

        // Only track horizontal swipes
        if (deltaY > 50) {
            this.isSwiping.set(false);
            this.swipeOffset.set(0);
            return;
        }

        // Only allow swipe after card is flipped
        const card = this.currentCard();
        if (card && card.showAnswer) {
            this.swipeOffset.set(deltaX);
        }
    }

    onTouchEnd(): void {
        if (!this.isSwiping()) return;
        this.isSwiping.set(false);

        const offset = this.swipeOffset();
        const threshold = 80;

        const card = this.currentCard();
        if (!card || !card.showAnswer) {
            this.swipeOffset.set(0);
            return;
        }

        if (offset < -threshold) {
            // Swipe left = Again
            this.markAnswer('wrong');
        } else if (offset > threshold) {
            // Swipe right = Good
            this.markAnswer('good');
        } else {
            // Reset if not enough swipe
            this.swipeOffset.set(0);
        }
    }
}
