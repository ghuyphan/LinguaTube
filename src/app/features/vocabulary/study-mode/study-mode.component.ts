import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { VocabularyService, SettingsService, I18nService } from '../../../services';
import { StreakService } from '../../../services/streak.service';
import { VocabularyItem } from '../../../models';

interface StudyCard {
    item: VocabularyItem;
    showAnswer: boolean;
}

@Component({
    selector: 'app-study-mode',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    templateUrl: './study-mode.component.html',
    styleUrl: './study-mode.component.scss'
})
export class StudyModeComponent {
    vocab = inject(VocabularyService);
    settings = inject(SettingsService);
    i18n = inject(I18nService);
    streak = inject(StreakService);

    // Options
    includeNew = true;
    includeLearning = true;
    includeKnown = false;

    // State
    isStudying = signal(false);
    isComplete = signal(false);
    studyCards = signal<StudyCard[]>([]);
    currentIndex = signal(0);

    sessionStats = signal({ total: 0, correct: 0, incorrect: 0 });

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

    startSession(): void {
        const currentLang = this.settings.settings().language;
        const items = this.vocab.vocabulary().filter(item => {
            // Only include items matching current language
            if (item.language !== currentLang) return false;
            if (item.level === 'new' && this.includeNew) return true;
            if (item.level === 'learning' && this.includeLearning) return true;
            if (item.level === 'known' && this.includeKnown) return true;
            return false;
        });

        // Shuffle cards
        const shuffled = [...items].sort(() => Math.random() - 0.5);

        this.studyCards.set(shuffled.map(item => ({
            item,
            showAnswer: false
        })));

        this.currentIndex.set(0);
        this.isStudying.set(true);
        this.isComplete.set(false);
        this.sessionStats.set({ total: 0, correct: 0, incorrect: 0 });
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

        // Next card or complete
        if (this.currentIndex() < this.studyCards().length - 1) {
            this.currentIndex.update(i => i + 1);
        } else {
            this.isStudying.set(false);
            this.isComplete.set(true);
            // Record activity for streak tracking
            this.streak.recordActivity();
        }
    }

    endSession(): void {
        this.isStudying.set(false);
        this.isComplete.set(false);
    }

    resetSession(): void {
        this.isComplete.set(false);
        this.startSession();
    }
}
