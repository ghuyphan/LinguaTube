import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StudyModeComponent } from '../../components/study-mode/study-mode.component';
import { IconComponent } from '../../components/icon/icon.component';
import { VocabularyService, SettingsService, I18nService } from '../../services';

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
    <div class="layout">
      <div class="layout-main">
        <app-study-mode />
      </div>

      <!-- Desktop sidebar with study stats -->
      <aside class="layout-sidebar desktop-only">
        <div class="sidebar-card">
          <h3>{{ i18n.t('study.title') }}</h3>
          
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

        <div class="sidebar-card">
          <h4>{{ i18n.t('nav.words') }}</h4>
          <p class="sidebar-hint">{{ i18n.t('dictionary.subtitle') }}</p>
          <a routerLink="/dictionary" class="btn btn-secondary dict-btn">
            <app-icon name="book-open" [size]="16" />
            {{ i18n.t('dictionary.title') }}
          </a>
        </div>
      </aside>
    </div>
  `,
  styles: [`
    .layout {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: var(--space-lg);
      align-items: start;
      max-width: 1280px;
      margin: 0 auto;
    }

    .layout-main {
      min-width: 0;
    }

    .layout-sidebar {
      position: sticky;
      top: var(--space-lg);
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .sidebar-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      padding: var(--space-lg);
    }

    .sidebar-card h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: var(--space-md);
      text-align: center;
    }

    .sidebar-card h4 {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: var(--space-xs);
    }

    .sidebar-hint {
      font-size: 0.8125rem;
      color: var(--text-muted);
      margin-bottom: var(--space-md);
    }

    /* Progress Ring */
    .progress-ring-container {
      position: relative;
      width: 140px;
      height: 140px;
      margin: 0 auto var(--space-lg);
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
    }

    .progress-value {
      display: block;
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1;
    }

    .progress-label {
      font-size: 0.6875rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    /* Stats Breakdown */
    .stats-breakdown {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .breakdown-item {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-xs) 0;
    }

    .breakdown-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
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
      font-size: 0.875rem;
      color: var(--text-secondary);
    }

    .breakdown-value {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .dict-btn {
      width: 100%;
      justify-content: center;
    }

    .desktop-only {
      display: flex;
    }

    /* Tablet: narrower sidebar */
    @media (max-width: 1024px) {
      .layout {
        grid-template-columns: 1fr 280px;
      }
    }

    @media (max-width: 768px) {
      .layout {
        grid-template-columns: 1fr;
      }

      .desktop-only {
        display: none !important;
      }
    }

    /* Landscape phones: treat as mobile */
    @media (max-height: 500px) and (orientation: landscape) {
      .layout {
        grid-template-columns: 1fr;
      }

      .desktop-only {
        display: none !important;
      }
    }
  `]
})
export class StudyPageComponent {
  private vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  i18n = inject(I18nService);

  // Circle circumference: 2 * PI * radius (42)
  circumference = 2 * Math.PI * 42;

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
