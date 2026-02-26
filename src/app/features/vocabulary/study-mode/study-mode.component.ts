import { Component, inject, signal, computed, ChangeDetectionStrategy, HostListener, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { SwitchComponent } from '../../../shared/components/switch/switch.component';
import { VocabularyService, SettingsService, I18nService } from '../../../services';
import { StreakService } from '../../../services/streak.service';
import { VocabularyItem } from '../../../models';

interface StudyCard {
    item: VocabularyItem;
    showAnswer: boolean;
}

const DAILY_GOAL_KEY = 'linguatube_daily_goal';
const DAILY_PROGRESS_KEY = 'linguatube_daily_progress';

import { MascotComponent } from '../../../components/mascot/mascot.component';

@Component({
    selector: 'app-study-mode',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterLink, IconComponent, SwitchComponent, MascotComponent],
    templateUrl: './study-mode.component.html',
    styleUrl: './study-mode.component.scss'
})
export class StudyModeComponent implements OnDestroy {
    private platformId = inject(PLATFORM_ID);
    vocab = inject(VocabularyService);
    settings = inject(SettingsService);
    i18n = inject(I18nService);
    streak = inject(StreakService);
    Math = Math; // Expose for template

    // Options
    includeNew = true;
    includeLearning = true;
    includeKnown = false;
    reverseMode = false;

    // State
    isStudying = signal(false);
    isComplete = signal(false);
    studyCards = signal<StudyCard[]>([]);
    currentIndex = signal(0);

    sessionStats = signal({ total: 0, correct: 0, incorrect: 0 });

    // Undo state
    canUndo = signal(false);
    private undoSnapshot: { item: VocabularyItem; prevIndex: number; prevStats: { total: number; correct: number; incorrect: number }; wasCorrect: boolean } | null = null;
    private undoTimeout: ReturnType<typeof setTimeout> | null = null;

    // Missed cards (for completion screen)
    missedCards = signal<StudyCard[]>([]);

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

    // Card animation
    cardAnimating = signal(false);

    // Due today count
    dueToday = computed(() => {
        const currentLang = this.settings.settings().language;
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
        const currentLang = this.settings.settings().language;
        return this.vocab.vocabulary().filter(item => {
            // Only include items matching current language
            if (item.language !== currentLang) return false;
            if (item.level === 'new' && this.includeNew) return true;
            if (item.level === 'learning' && this.includeLearning) return true;
            if (item.level === 'known' && this.includeKnown) return true;
            return false;
        }).length;
    });

    currentCard = computed(() => {
        const cards = this.studyCards();
        const index = this.currentIndex();
        return cards[index] || null;
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

    startSession(): void {
        const currentLang = this.settings.settings().language;
        const today = new Date();
        today.setHours(23, 59, 59, 999);

        let items = this.vocab.vocabulary().filter(item => {
            // Only include items matching current language
            if (item.language !== currentLang) return false;
            if (item.level === 'new' && this.includeNew) return true;
            if (item.level === 'learning' && this.includeLearning) return true;
            if (item.level === 'known' && this.includeKnown) return true;
            return false;
        });

        // Sort by overdue first, then by level priority
        items.sort((a, b) => {
            const aDate = a.nextReviewDate ? new Date(a.nextReviewDate) : new Date(0);
            const bDate = b.nextReviewDate ? new Date(b.nextReviewDate) : new Date(0);

            // First priority: overdue items
            const aOverdue = aDate <= today;
            const bOverdue = bDate <= today;
            if (aOverdue && !bOverdue) return -1;
            if (!aOverdue && bOverdue) return 1;

            // Second priority: by date (earlier first)
            if (aDate.getTime() !== bDate.getTime()) {
                return aDate.getTime() - bDate.getTime();
            }

            // Third priority: level (new > learning > known)
            const levelOrder = { new: 0, learning: 1, known: 2, ignored: 3 };
            return levelOrder[a.level] - levelOrder[b.level];
        });

        this.studyCards.set(items.map(item => ({
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

        // Snapshot for undo (deep copy of current vocab item from service)
        const currentItem = this.vocab.vocabulary().find(v => v.id === card.item.id);
        if (currentItem) {
            this.undoSnapshot = {
                item: { ...currentItem },
                prevIndex: this.currentIndex(),
                prevStats: { ...this.sessionStats() },
                wasCorrect: answer === 'good' || answer === 'easy'
            };
        }

        const stats = this.sessionStats();
        stats.total++;

        // Map answer to SM-2 quality score (0-5)
        // wrong=1, hard=2, good=4, easy=5
        let quality: number;
        if (answer === 'wrong') {
            quality = 1;
            stats.incorrect++;
            // Track missed cards
            this.missedCards.update(cards => [...cards, card]);
        } else if (answer === 'hard') {
            quality = 2;
            stats.incorrect++;  // Hard counts as needing more practice
            this.missedCards.update(cards => [...cards, card]);
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

        // Show undo button briefly
        this.showUndoButton();

        // Next card or complete
        if (this.currentIndex() < this.studyCards().length - 1) {
            this.currentIndex.update(i => i + 1);
            // Trigger card entrance animation
            this.cardAnimating.set(true);
            setTimeout(() => this.cardAnimating.set(false), 400);
        } else {
            this.stopTimer();
            this.isStudying.set(false);
            this.isComplete.set(true);
            // Record activity for streak tracking
            this.streak.recordActivity();
            // Show confetti
            this.triggerConfetti();
            // Hide undo at completion
            this.canUndo.set(false);
        }
    }

    undoLastAnswer(): void {
        if (!this.undoSnapshot) return;

        // Restore the vocabulary item to its pre-answer state
        this.vocab.restoreItem(this.undoSnapshot.item);

        // Restore session stats
        this.sessionStats.set({ ...this.undoSnapshot.prevStats });

        // Move back to the previous card
        this.currentIndex.set(this.undoSnapshot.prevIndex);

        // Un-flip the card
        const cards = this.studyCards();
        if (cards[this.undoSnapshot.prevIndex]) {
            cards[this.undoSnapshot.prevIndex].showAnswer = false;
            this.studyCards.set([...cards]);
        }

        // Remove from missed cards if it was added
        if (!this.undoSnapshot.wasCorrect) {
            this.missedCards.update(cards => cards.slice(0, -1));
        }

        // Decrement daily progress
        this.cardsCompletedToday.update(c => Math.max(0, c - 1));
        this.saveDailyProgress();

        // Clear undo state
        this.undoSnapshot = null;
        this.canUndo.set(false);
        if (this.undoTimeout) {
            clearTimeout(this.undoTimeout);
            this.undoTimeout = null;
        }
    }

    private showUndoButton(): void {
        this.canUndo.set(true);
        if (this.undoTimeout) clearTimeout(this.undoTimeout);
        this.undoTimeout = setTimeout(() => {
            this.canUndo.set(false);
            this.undoSnapshot = null;
        }, 4000);
    }

    // ==================== Audio Pronunciation (Phase 3.3) ====================
    playAudio(event?: Event): void {
        if (event) {
            event.stopPropagation();
        }

        const card = this.currentCard();
        if (!card || !window.speechSynthesis) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(card.item.word);

        // Map app language code to BCP 47 tags for speech synthesis
        const langMap: Record<string, string> = {
            'ja': 'ja-JP',
            'zh': 'zh-CN',
            'ko': 'ko-KR',
            'en': 'en-US'
        };

        if (langMap[card.item.language]) {
            utterance.lang = langMap[card.item.language];
        }

        // Slightly slower rate often sounds better for learning
        utterance.rate = 0.9;

        window.speechSynthesis.speak(utterance);
    }

    endSession(): void {
        this.stopTimer();
        this.isStudying.set(false);
        this.isComplete.set(false);
    }

    resetSession(): void {
        this.isComplete.set(false);
        this.showConfetti.set(false);
        this.missedCards.set([]);
        this.startSession();
    }

    /** Start a new session with only the missed cards */
    practicesMissed(): void {
        const missed = this.missedCards();
        if (missed.length === 0) return;

        this.studyCards.set(missed.map(c => ({ item: c.item, showAnswer: false })));
        this.currentIndex.set(0);
        this.isStudying.set(true);
        this.isComplete.set(false);
        this.sessionStats.set({ total: 0, correct: 0, incorrect: 0 });
        this.missedCards.set([]);
        this.swipeOffset.set(0);

        this.sessionStartTime.set(new Date());
        this.elapsedSeconds.set(0);
        this.startTimer();
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
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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
