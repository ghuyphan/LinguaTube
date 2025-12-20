import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { VocabularyService, SettingsService } from '../../services';
import { VocabularyItem } from '../../models';

interface StudyCard {
  item: VocabularyItem;
  showAnswer: boolean;
}

@Component({
  selector: 'app-study-mode',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="study-mode">
      @if (!isStudying()) {
        <!-- Study Start Screen -->
        <div class="study-start card">
          <div class="study-start__header">
            <app-icon name="graduation-cap" [size]="48" class="study-icon" />
            <h2>Study Mode</h2>
            <p>Review your vocabulary with flashcards</p>
          </div>

          <div class="study-stats">
            <div class="stat-card">
              <span class="stat-value">{{ vocab.stats().new }}</span>
              <span class="stat-label">New</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">{{ vocab.stats().learning }}</span>
              <span class="stat-label">Learning</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">{{ vocab.stats().known }}</span>
              <span class="stat-label">Known</span>
            </div>
          </div>

          <div class="study-options">
            <label class="option-item">
              <input type="checkbox" [(checked)]="includeNew" />
              <span>Include new words</span>
            </label>
            <label class="option-item">
              <input type="checkbox" [(checked)]="includeLearning" />
              <span>Include learning words</span>
            </label>
            <label class="option-item">
              <input type="checkbox" [(checked)]="includeKnown" />
              <span>Review known words</span>
            </label>
          </div>

          @if (availableCards() > 0) {
            <button class="btn btn-primary btn-lg" (click)="startSession()">
              <app-icon name="play" [size]="18" />
              Start ({{ availableCards() }} cards)
            </button>
          } @else {
            <div class="no-cards">
              <app-icon name="info" [size]="20" />
              <p>No words to study. Save some words from videos first!</p>
            </div>
          }
        </div>
      } @else {
        <!-- Study Session -->
        <div class="study-session">
          <!-- Progress -->
          <div class="study-progress">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                [style.width.%]="(currentIndex() + 1) / studyCards().length * 100"
              ></div>
            </div>
            <span class="progress-text">
              {{ currentIndex() + 1 }} / {{ studyCards().length }}
            </span>
            <button class="btn btn-ghost btn-sm" (click)="endSession()">
              <app-icon name="x" [size]="16" />
              End
            </button>
          </div>

          <!-- Flashcard -->
          @if (currentCard()) {
            <div 
              class="flashcard" 
              [class.flipped]="currentCard()!.showAnswer"
              (click)="flipCard()"
            >
              <div class="flashcard__inner">
                <!-- Front (Word) -->
                <div class="flashcard__front">
                  <span class="card-word" [class]="'text-' + currentCard()!.item.language">
                    {{ currentCard()!.item.word }}
                  </span>
                  @if (currentCard()!.item.reading) {
                    <span class="card-reading">{{ currentCard()!.item.reading }}</span>
                  }
                  @if (currentCard()!.item.pinyin) {
                    <span class="card-reading">{{ currentCard()!.item.pinyin }}</span>
                  }
                  <p class="tap-hint">Tap to reveal</p>
                </div>

                <!-- Back (Meaning) -->
                <div class="flashcard__back">
                  <span class="card-word" [class]="'text-' + currentCard()!.item.language">
                    {{ currentCard()!.item.word }}
                  </span>
                  <div class="card-meaning">
                    {{ currentCard()!.item.meaning || '(no definition)' }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Answer Buttons -->
            @if (currentCard()!.showAnswer) {
              <div class="answer-buttons">
                <button class="answer-btn answer-btn--wrong" (click)="markAnswer('wrong')">
                  <app-icon name="x" [size]="20" />
                  <span>Again</span>
                </button>
                <button class="answer-btn answer-btn--hard" (click)="markAnswer('hard')">
                  <app-icon name="rotate-ccw" [size]="20" />
                  <span>Hard</span>
                </button>
                <button class="answer-btn answer-btn--good" (click)="markAnswer('good')">
                  <app-icon name="check" [size]="20" />
                  <span>Good</span>
                </button>
                <button class="answer-btn answer-btn--easy" (click)="markAnswer('easy')">
                  <app-icon name="chevron-right" [size]="20" />
                  <span>Easy</span>
                </button>
              </div>
            }
          }
        </div>
      }

      <!-- Session Complete -->
      @if (isComplete()) {
        <div class="session-complete card">
          <app-icon name="check" [size]="48" class="complete-icon" />
          <h2>Session Complete!</h2>
          <div class="complete-stats">
            <div class="complete-stat">
              <span class="stat-value">{{ sessionStats().total }}</span>
              <span class="stat-label">Cards Reviewed</span>
            </div>
            <div class="complete-stat">
              <span class="stat-value stat-value--success">{{ sessionStats().correct }}</span>
              <span class="stat-label">Correct</span>
            </div>
            <div class="complete-stat">
              <span class="stat-value stat-value--error">{{ sessionStats().incorrect }}</span>
              <span class="stat-label">To Review</span>
            </div>
          </div>
          <button class="btn btn-primary" (click)="resetSession()">
            <app-icon name="rotate-ccw" [size]="16" />
            Study Again
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .study-mode {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--space-md);
    }

    .study-start {
      max-width: 400px;
      width: 100%;
      padding: var(--space-xl);
      text-align: center;
    }

    .study-start__header {
      margin-bottom: var(--space-lg);
    }

    .study-icon {
      color: var(--accent-primary);
      margin-bottom: var(--space-md);
    }

    .study-start h2 {
      margin-bottom: var(--space-xs);
    }

    .study-start p {
      color: var(--text-muted);
    }

    .study-stats {
      display: flex;
      justify-content: center;
      gap: var(--space-md);
      margin-bottom: var(--space-lg);
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--space-sm) var(--space-md);
      background: var(--bg-secondary);
      border-radius: var(--border-radius);
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .stat-value--success {
      color: var(--success);
    }

    .stat-value--error {
      color: var(--error);
    }

    .stat-label {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .study-options {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      margin-bottom: var(--space-lg);
      text-align: left;
    }

    .option-item {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm);
      background: var(--bg-secondary);
      border-radius: var(--border-radius);
      cursor: pointer;
    }

    .option-item input {
      width: 18px;
      height: 18px;
      accent-color: var(--accent-primary);
    }

    .option-item span {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .btn-lg {
      padding: var(--space-md) var(--space-xl);
      font-size: 1rem;
    }

    .no-cards {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-md);
      color: var(--text-muted);
    }

    /* Study Session */
    .study-session {
      width: 100%;
      max-width: 500px;
    }

    .study-progress {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      margin-bottom: var(--space-lg);
    }

    .progress-bar {
      flex: 1;
      height: 6px;
      background: var(--bg-secondary);
      border-radius: 3px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--accent-primary);
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 0.875rem;
      color: var(--text-muted);
      min-width: 60px;
    }

    /* Flashcard */
    .flashcard {
      perspective: 1000px;
      cursor: pointer;
      margin-bottom: var(--space-lg);
    }

    .flashcard__inner {
      position: relative;
      width: 100%;
      min-height: 300px;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;
    }

    .flashcard.flipped .flashcard__inner {
      transform: rotateY(180deg);
    }

    .flashcard__front,
    .flashcard__back {
      position: absolute;
      width: 100%;
      min-height: 300px;
      backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-xl);
      background: var(--bg-card);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-md);
      border: 1px solid var(--border-color);
    }

    .flashcard__back {
      transform: rotateY(180deg);
    }

    .card-word {
      font-size: 2.5rem;
      font-weight: 600;
      color: var(--text-primary);
      text-align: center;
    }

    .card-reading {
      font-size: 1.25rem;
      color: var(--text-secondary);
      margin-top: var(--space-sm);
    }

    .tap-hint {
      margin-top: var(--space-lg);
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    .card-meaning {
      font-size: 1.125rem;
      color: var(--text-secondary);
      text-align: center;
      margin-top: var(--space-md);
      line-height: 1.6;
    }

    /* Answer Buttons */
    .answer-buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-sm);
    }

    .answer-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-xs);
      padding: var(--space-md);
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: all var(--transition-fast);
      font-size: 0.75rem;
      font-weight: 500;
    }

    .answer-btn--wrong {
      background: var(--word-new);
      color: var(--error);
    }

    .answer-btn--hard {
      background: var(--word-learning);
      color: var(--word-learning-text);
    }

    .answer-btn--good {
      background: var(--word-known);
      color: var(--success);
    }

    .answer-btn--easy {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    .answer-btn:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }

    /* Session Complete */
    .session-complete {
      max-width: 400px;
      width: 100%;
      padding: var(--space-xl);
      text-align: center;
    }

    .complete-icon {
      color: var(--success);
      margin-bottom: var(--space-md);
    }

    .complete-stats {
      display: flex;
      justify-content: center;
      gap: var(--space-lg);
      margin: var(--space-lg) 0;
    }

    .complete-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    @media (max-width: 480px) {
      .study-mode {
        padding: 0; /* Remove padding to allow full width usage */
      }

      .study-start {
        padding: var(--space-lg) var(--space-md);
        max-width: none;
      }

      /* Make stats grid on mobile */
      .study-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-xs);
      }

      .stat-card {
         padding: var(--space-sm) 2px;
      }

      .stat-value {
        font-size: 1.25rem;
      }

      .stat-label {
        font-size: 0.625rem;
      }

      .btn-lg {
        width: 100%;
        justify-content: center;
        padding: var(--space-md);
      }

      .flashcard__front,
      .flashcard__back {
        min-height: 250px;
        padding: var(--space-lg);
      }

      .card-word {
        font-size: 2rem;
      }

      .answer-buttons {
        grid-template-columns: repeat(2, 1fr);
      }

      .answer-btn {
        flex-direction: row;
        justify-content: center;
      }
    }
  `]
})
export class StudyModeComponent {
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);

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
    return this.vocab.vocabulary().filter(item => {
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
    const items = this.vocab.vocabulary().filter(item => {
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

    // Update word level based on answer (simple SRS)
    let newLevel = card.item.level;

    if (answer === 'wrong') {
      stats.incorrect++;
      newLevel = 'new';
    } else if (answer === 'hard') {
      newLevel = 'learning';
    } else if (answer === 'good') {
      stats.correct++;
      newLevel = card.item.level === 'new' ? 'learning' : 'known';
    } else if (answer === 'easy') {
      stats.correct++;
      newLevel = 'known';
    }

    this.sessionStats.set({ ...stats });

    // Update vocabulary
    if (newLevel !== card.item.level) {
      this.vocab.updateLevel(card.item.id, newLevel);
    }

    // Next card or complete
    if (this.currentIndex() < this.studyCards().length - 1) {
      this.currentIndex.update(i => i + 1);
    } else {
      this.isStudying.set(false);
      this.isComplete.set(true);
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
