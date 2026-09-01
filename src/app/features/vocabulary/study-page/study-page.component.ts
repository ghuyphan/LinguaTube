import { Component, ChangeDetectionStrategy, inject, computed, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudyModeComponent } from '../study-mode/study-mode.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { VocabularyService, SettingsService, I18nService } from '../../../services';

const DAILY_GOAL_KEY = 'linguatube_daily_goal';
const DAILY_PROGRESS_KEY = 'linguatube_daily_progress';

@Component({
  selector: 'app-study-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    StudyModeComponent,
    IconComponent
  ],
  template: `
    <div class="page-layout">
      <div class="page-layout__main">
        <app-study-mode />
      </div>

      <!-- Desktop sidebar with study stats -->
      <aside class="page-layout__sidebar desktop-only">
        <!-- Card 1: Learning Progress & Mastery -->
        <div class="card sidebar-card">
          <div class="panel-header">
            <div class="panel-header__row">
              <app-icon name="target" [size]="20" class="panel-header__icon" />
              <h3 class="panel-header__title">{{ i18n.t('study.learning') }}</h3>
            </div>
            <p class="panel-header__subtitle">{{ stats().total }} {{ i18n.t('study.cards') }} · {{ progressPercent() }}% {{ i18n.t('study.known') }}</p>
          </div>

          <!-- Daily Goal Progress -->
          <div class="sidebar-goal-box">
            <div class="sidebar-goal-box__header">
              <span class="sidebar-goal-box__label">{{ i18n.t('study.dailyGoal') }}</span>
              <span class="sidebar-goal-box__count">{{ cardsCompletedToday() }}/{{ dailyGoal() }}</span>
            </div>
            <div class="sidebar-goal-box__bar">
              <div class="sidebar-goal-box__fill" [style.width.%]="goalProgress()"></div>
            </div>
            @if (cardsCompletedToday() >= dailyGoal()) {
              <span class="sidebar-goal-box__complete">{{ i18n.t('study.goalComplete') }} 🎉</span>
            }
          </div>

          <!-- Circular Progress & Mastery Breakdown -->
          <div class="sidebar-mastery-section">
            <div class="progress-ring-container">
              <svg class="progress-ring" viewBox="0 0 100 100">
                <circle class="progress-ring__bg" cx="50" cy="50" r="42" />
                <circle 
                  class="progress-ring__fill" 
                  cx="50" cy="50" r="42"
                  [style.stroke-dasharray]="circumference"
                  [style.stroke-dashoffset]="progressOffset()"
                />
              </svg>
              <div class="progress-ring__content">
                <span class="progress-value">{{ progressPercent() }}%</span>
                <span class="progress-label">{{ i18n.t('study.known') }}</span>
              </div>
            </div>

            <div class="stats-breakdown">
              <div class="breakdown-item">
                <div class="breakdown-dot new"></div>
                <span class="breakdown-label">{{ i18n.t('study.new') }}</span>
                <span class="breakdown-value">{{ stats().new }}</span>
              </div>
              <div class="breakdown-item">
                <div class="breakdown-dot learning"></div>
                <span class="breakdown-label">{{ i18n.t('study.learning') }}</span>
                <span class="breakdown-value">{{ stats().learning }}</span>
              </div>
              <div class="breakdown-item">
                <div class="breakdown-dot known"></div>
                <span class="breakdown-label">{{ i18n.t('study.known') }}</span>
                <span class="breakdown-value">{{ stats().known }}</span>
              </div>
            </div>
          </div>

          <!-- Due Today Alert -->
          @if (dueToday() > 0) {
            <div class="sidebar-due-pill">
              <app-icon name="clock" [size]="14" />
              <span>{{ i18n.t('study.dueToday') }}: <strong>{{ dueToday() }}</strong></span>
            </div>
          }
        </div>

        <!-- Card 2: Dictionary Quick Link -->
        <div class="card sidebar-card">
          <div class="panel-header">
            <div class="panel-header__row">
              <app-icon name="book-open" [size]="20" class="panel-header__icon" />
              <h3 class="panel-header__title">{{ i18n.t('dictionary.title') }}</h3>
            </div>
            <p class="panel-header__subtitle">{{ i18n.t('dictionary.subtitle') }}</p>
          </div>
          
          <a routerLink="/dictionary" class="btn btn-secondary dict-btn">
            <app-icon name="search" [size]="16" />
            <span>{{ i18n.t('dictionary.search') }}</span>
          </a>
        </div>
      </aside>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Daily Goal Box inside sidebar */
    .sidebar-goal-box {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: var(--space-sm);
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-md);
    }

    .sidebar-goal-box__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .sidebar-goal-box__label {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .sidebar-goal-box__count {
      font-size: 0.8125rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .sidebar-goal-box__bar {
      height: 6px;
      background: var(--bg-tertiary);
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
      width: 92px;
      height: 92px;
      flex-shrink: 0;
    }

    .progress-ring {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }

    .progress-ring__bg {
      fill: none;
      stroke: var(--bg-secondary);
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
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1;
    }

    .progress-label {
      font-size: 0.625rem;
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
      gap: var(--space-xs);
    }

    .breakdown-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .breakdown-dot.new {
      background: var(--accent-primary);
    }

    .breakdown-dot.learning {
      background: var(--word-learning-text);
    }

    .breakdown-dot.known {
      background: var(--success);
    }

    .breakdown-label {
      flex: 1;
      font-size: 0.8125rem;
      color: var(--text-secondary);
    }

    .breakdown-value {
      font-size: 0.8125rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    /* Due Today Pill */
    .sidebar-due-pill {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-xs);
      padding: var(--space-xs) var(--space-sm);
      background: rgba(var(--accent-primary-rgb), 0.08);
      border-radius: var(--border-radius-md);
      color: var(--accent-primary);
      font-size: 0.8125rem;
      line-height: 1;

      strong {
        font-weight: 700;
      }
    }

    .dict-btn {
      width: 100%;
      justify-content: center;
      gap: var(--space-xs);
    }

    .desktop-only {
      display: flex;
    }
  `]
})
export class StudyPageComponent {
  private platformId = inject(PLATFORM_ID);
  private vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  i18n = inject(I18nService);

  // Circle circumference: 2 * PI * radius (42)
  circumference = 2 * Math.PI * 42;

  // Daily goal state
  dailyGoal = signal(10);
  cardsCompletedToday = signal(0);

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

  // Goal progress percentage
  goalProgress = computed(() => {
    const done = this.cardsCompletedToday();
    const goal = this.dailyGoal();
    return Math.min(100, Math.round((done / goal) * 100));
  });

  stats = computed(() => {
    return this.vocab.getStatsByLanguage(this.settings.settings().language);
  });

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

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadDailyProgress();
    }
  }

  private loadDailyProgress(): void {
    const today = new Date().toDateString();
    const stored = localStorage.getItem(DAILY_PROGRESS_KEY);

    if (stored) {
      const data = JSON.parse(stored);
      if (data.date === today) {
        this.cardsCompletedToday.set(data.count);
      } else {
        this.cardsCompletedToday.set(0);
      }
    }

    const goalStored = localStorage.getItem(DAILY_GOAL_KEY);
    if (goalStored) {
      this.dailyGoal.set(parseInt(goalStored, 10));
    }
  }
}
