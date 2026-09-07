import { Component, ChangeDetectionStrategy, inject, computed, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudyModeComponent } from '../study-mode/study-mode.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { VocabularyService } from '../vocabulary.service';
import { SettingsService, I18nService } from '../../../core/services';
import { formatTime } from '../../../core/utils';

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
        <app-study-mode #studyModeRef />
      </div>

      <!-- Desktop sidebar with study stats / live session monitor -->
      <aside class="page-layout__sidebar desktop-only">
        @if (studyMode()?.isStudying()) {
          <!-- Card: Live Active Session Dashboard -->
          <div class="card sidebar-card live-session-card">
            <div class="panel-header">
              <div class="panel-header__row">
                <div class="live-status">
                  <span class="live-dot"></span>
                  <h3 class="panel-header__title">{{ i18n.t('study.liveSession') }}</h3>
                </div>
                <span class="session-timer-badge">
                  <app-icon name="clock" [size]="13" />
                  {{ formatTime(studyMode()?.elapsedSeconds() || 0) }}
                </span>
              </div>
              <p class="panel-header__subtitle">
                {{ studyMode()?.cardsRemainingInQueue() }} {{ i18n.t('study.cards') }} {{ i18n.t('study.inQueue') }}
              </p>
            </div>

            <!-- Accuracy & Session Counters -->
            <div class="live-session-stats">
              <div class="live-stat-box">
                <span class="live-stat-val">{{ studyMode()?.sessionAccuracy() }}%</span>
                <span class="live-stat-lbl">{{ i18n.t('study.liveAccuracy') }}</span>
              </div>
              <div class="live-stat-box">
                <span class="live-stat-val val-success">{{ studyMode()?.sessionStats()?.correct || 0 }}</span>
                <span class="live-stat-lbl">{{ i18n.t('study.correct') }}</span>
              </div>
              <div class="live-stat-box">
                <span class="live-stat-val val-error">{{ studyMode()?.sessionStats()?.incorrect || 0 }}</span>
                <span class="live-stat-lbl">{{ i18n.t('study.again') }}</span>
              </div>
            </div>

            <!-- Keyboard Shortcuts Cheatsheet -->
            <div class="shortcuts-box">
              <span class="shortcuts-title">{{ i18n.t('study.shortcutsCheatsheet') }}</span>
              <div class="shortcut-item">
                <span class="shortcut-action">{{ i18n.t('study.pressSpace') }}</span>
                <kbd class="shortcut-key">Space</kbd>
              </div>
              <div class="shortcut-item">
                <span class="shortcut-action">{{ i18n.t('study.keyboardHint') }}</span>
                <kbd class="shortcut-key">1 - 4</kbd>
              </div>
              <div class="shortcut-item">
                <span class="shortcut-action">{{ i18n.t('study.shortcutAudio') }}</span>
                <kbd class="shortcut-key">R</kbd>
              </div>
              <div class="shortcut-item">
                <span class="shortcut-action">{{ i18n.t('study.peekReading') }}</span>
                <kbd class="shortcut-key">P</kbd>
              </div>
              <div class="shortcut-item">
                <span class="shortcut-action">{{ i18n.t('study.shortcutVideo') }}</span>
                <kbd class="shortcut-key">V</kbd>
              </div>
            </div>
          </div>
        } @else {
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
        }
      </aside>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Live Session Sidebar Card */
    .live-session-card {
      border-color: rgba(var(--accent-primary-rgb), 0.3);
      animation: fadeIn 0.3s ease;
    }

    .live-status {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .live-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--success);
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
      animation: pulse-dot 1.8s infinite;
    }

    @keyframes pulse-dot {
      0% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
      }
      70% {
        box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
      }
    }

    .session-timer-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.8125rem;
      font-weight: 700;
      color: var(--accent-primary);
      padding: 2px 8px;
      background: rgba(var(--accent-primary-rgb), 0.1);
      border-radius: var(--border-radius-pill);
      font-variant-numeric: tabular-nums;
    }

    .live-session-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-xs);
      padding: var(--space-xs) 0;
    }

    .live-stat-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-sm) var(--space-xs);
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-md);
      gap: 2px;
    }

    .live-stat-val {
      font-size: 1.125rem;
      font-weight: 800;
      line-height: 1.1;
      color: var(--text-primary);

      &.val-success {
        color: var(--success);
      }

      &.val-error {
        color: var(--error);
      }
    }

    .live-stat-lbl {
      font-size: 0.625rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: var(--text-muted);
    }

    .shortcuts-box {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: var(--space-sm);
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-md);
      margin-top: 2px;
    }

    .shortcuts-title {
      font-size: 0.6875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      margin-bottom: 2px;
    }

    .shortcut-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    .shortcut-key {
      display: inline-block;
      padding: 1px 6px;
      font-family: inherit;
      font-size: 0.6875rem;
      font-weight: 700;
      color: var(--text-primary);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    }

    /* Daily Goal Box inside sidebar */
    .sidebar-goal-box {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: var(--space-sm);
      background: var(--bg-surface);
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

  studyMode = viewChild(StudyModeComponent);

  formatTime = formatTime;

  // Circle circumference: 2 * PI * radius (42)
  circumference = 2 * Math.PI * 42;

  // Daily goal state (shared reactively from VocabularyService)
  dailyGoal = this.vocab.dailyGoal;
  cardsCompletedToday = this.vocab.cardsCompletedToday;

  // Due today count (shared helper from VocabularyService)
  dueToday = computed(() => this.vocab.getDueCountByLanguage(this.settings.settings().language));

  // Goal progress percentage (shared signal from VocabularyService)
  goalProgress = this.vocab.goalProgress;

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
}
