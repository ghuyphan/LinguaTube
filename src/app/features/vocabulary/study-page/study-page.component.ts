import { Component, ChangeDetectionStrategy, inject, viewChild, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyModeComponent } from '../study-mode/study-mode.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { VocabularyService } from '../vocabulary.service';
import { SettingsService, I18nService } from '../../../core/services';
import { StreakService } from '../../../services/streak.service';

@Component({
  selector: 'app-study-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    StudyModeComponent,
    IconComponent
  ],
  template: `
    <div class="page-layout">
      <div class="page-layout__main">
        <app-study-mode #studyModeRef />
      </div>

      <!-- Desktop sidebar with stable height & context -->
      <aside class="page-layout__sidebar desktop-only">
        <!-- Card 1: Vocabulary Mastery -->
          @if (stats().total > 0) {
            <div class="card sidebar-card">
              <div class="panel-header">
                <div class="panel-header__row">
                  <div class="panel-header__left">
                    <app-icon name="graduation-cap" [size]="18" class="panel-header__icon" />
                    <h3 class="panel-header__title">{{ i18n.t('study.mastery') || 'Mastery' }}</h3>
                  </div>
                  <span class="badge badge--primary">{{ stats().total }} {{ i18n.t('study.cards') }}</span>
                </div>
              </div>

              <div class="sidebar-mastery-section">
                <div class="progress-ring-container">
                  <svg class="progress-ring" viewBox="0 0 100 100">
                    <circle class="progress-ring__bg" cx="50" cy="50" r="42" />
                    <circle
                      class="progress-ring__fill"
                      cx="50" cy="50" r="42"
                      [style.strokeDasharray]="circumference"
                      [style.strokeDashoffset]="progressOffset()"
                    />
                  </svg>
                  <div class="progress-ring__content">
                    <span class="progress-value">{{ progressPercent() }}%</span>
                    <span class="progress-label">{{ i18n.t('study.mastered') || 'Known' }}</span>
                  </div>
                </div>

                <div class="stats-breakdown">
                  <div class="breakdown-item">
                    <span class="breakdown-tag breakdown-tag--new">{{ i18n.t('study.new') }}</span>
                    <span class="breakdown-value">{{ stats().new }}</span>
                  </div>
                  <div class="breakdown-item">
                    <span class="breakdown-tag breakdown-tag--learning">{{ i18n.t('study.learning') }}</span>
                    <span class="breakdown-value">{{ stats().learning }}</span>
                  </div>
                  <div class="breakdown-item">
                    <span class="breakdown-tag breakdown-tag--known">{{ i18n.t('study.known') }}</span>
                    <span class="breakdown-value">{{ stats().known }}</span>
                  </div>
                </div>
              </div>

              @if (dueToday() > 0) {
                <div class="sidebar-due-pill">
                  <app-icon name="clock" [size]="14" />
                  <span><strong>{{ dueToday() }}</strong> {{ i18n.t('study.dueCards') || 'due for review today' }}</span>
                </div>
              }
            </div>
          }

          <!-- Card 2: Daily Study Habit & Goal -->
          <div class="card sidebar-card daily-habit-card">
            <div class="panel-header">
              <div class="panel-header__row">
                <div class="panel-header__left">
                  <app-icon name="target" [size]="18" class="panel-header__icon" />
                  <h3 class="panel-header__title">{{ i18n.t('study.dailyGoal') }}</h3>
                </div>
                @if (streak.currentStreak() > 0) {
                  <span class="badge badge--warning">
                    <app-icon name="fire" [size]="12" />
                    <span>{{ streak.currentStreak() }} {{ i18n.t('streak.dayStreak') }}</span>
                  </span>
                }
              </div>
            </div>

            <div class="sidebar-goal-box">
              <div class="sidebar-goal-box__header">
                <span class="sidebar-goal-box__label">{{ i18n.t('study.dailyProgress') || 'Progress' }}</span>
                <span class="sidebar-goal-box__count">{{ cardsCompletedToday() }} / {{ dailyGoal() }}</span>
              </div>
              <div class="sidebar-goal-box__bar">
                <div class="sidebar-goal-box__fill" [style.width.%]="goalProgress()"></div>
              </div>
              @if (cardsCompletedToday() >= dailyGoal()) {
                <span class="sidebar-goal-box__complete">{{ i18n.t('study.goalComplete') }} 🎉</span>
              }
            </div>
          </div>
        </aside>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .sidebar-card {
      padding: var(--space-md);
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    /* Daily Habit Card */
    .daily-habit-card {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      animation: fadeIn 0.2s ease;
    }

    .sidebar-goal-box {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: var(--space-xs) 0 0;
    }

    .sidebar-goal-box__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.75rem;
    }

    .sidebar-goal-box__label {
      color: var(--text-secondary);
      font-weight: 600;
    }

    .sidebar-goal-box__count {
      color: var(--text-primary);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }

    .sidebar-goal-box__bar {
      height: 6px;
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: 3px;
      overflow: hidden;
    }

    .sidebar-goal-box__fill {
      height: 100%;
      background: var(--accent-primary);
      border-radius: 3px;
      transition: width 0.3s ease;
    }

    .sidebar-goal-box__complete {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--success);
      text-align: center;
      margin-top: 2px;
    }

    /* Mastery Section (Donut + Breakdown) */
    .sidebar-mastery-section {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-xs) 0;
    }

    .progress-ring-container {
      position: relative;
      width: 88px;
      height: 88px;
      flex-shrink: 0;
    }

    .progress-ring {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .progress-ring__bg {
      fill: none;
      stroke: var(--bg-surface);
      stroke-width: 8;
    }

    .progress-ring__fill {
      fill: none;
      stroke: var(--success);
      stroke-width: 8;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.5s ease;
    }

    .progress-ring__content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .progress-value {
      font-size: 1.125rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1;
    }

    .progress-label {
      font-size: 0.5625rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.3px;
      margin-top: 2px;
    }

    /* Stats Breakdown */
    .stats-breakdown {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
      min-width: 0;
    }

    .breakdown-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-xs);
    }

    .breakdown-tag {
      font-size: 0.6875rem;
      font-weight: 700;
      padding: 1px 6px;
      border-radius: var(--border-radius-xs);
    }

    .breakdown-tag--new {
      background: var(--word-new);
      color: var(--word-new-text);
    }

    .breakdown-tag--learning {
      background: var(--word-learning);
      color: var(--word-learning-text);
    }

    .breakdown-tag--known {
      background: var(--word-known);
      color: var(--word-known-text);
    }

    .breakdown-value {
      font-size: 0.8125rem;
      font-weight: 700;
      color: var(--text-primary);
      font-variant-numeric: tabular-nums;
    }

    /* Due Today Pill */
    .sidebar-due-pill {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-xs);
      padding: 0.5rem var(--space-sm);
      background: var(--accent-primary-soft);
      border-radius: var(--border-radius-md);
      color: var(--accent-primary);
      font-size: 0.8125rem;
      line-height: 1.2;

      strong {
        font-weight: 700;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class StudyPageComponent {
  private vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  i18n = inject(I18nService);
  streak = inject(StreakService);

  studyMode = viewChild(StudyModeComponent);

  currentLanguage = computed(() => this.settings.settings().language);
  stats = computed(() => this.vocab.getStatsByLanguage(this.currentLanguage()));

  circumference = 2 * Math.PI * 42;

  dailyGoal = this.vocab.dailyGoal;
  cardsCompletedToday = this.vocab.cardsCompletedToday;
  goalProgress = this.vocab.goalProgress;

  dueToday = computed(() => this.vocab.getDueCountByLanguage(this.currentLanguage()));

  progressPercent = computed(() => {
    const s = this.stats();
    const total = s.total;
    if (total === 0) return 0;
    return Math.round((s.known / total) * 100);
  });

  progressOffset = computed(() => {
    const percent = this.progressPercent();
    return this.circumference - (percent / 100) * this.circumference;
  });
}
