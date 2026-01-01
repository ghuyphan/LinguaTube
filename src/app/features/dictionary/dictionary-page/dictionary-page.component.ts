import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DictionaryPanelComponent } from '../dictionary-panel/dictionary-panel.component';
import { VocabularyListComponent } from '../../vocabulary/vocabulary-list/vocabulary-list.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { VocabularyService, SettingsService, I18nService, DictionaryService } from '../../../services';

@Component({
  selector: 'app-dictionary-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    DictionaryPanelComponent,
    VocabularyListComponent,
    IconComponent
  ],
  template: `
    <div class="layout">
      <div class="layout-main">
        <app-dictionary-panel />
      </div>

      <!-- Desktop sidebar with stats -->
      <aside class="layout-sidebar desktop-only">
        <div class="sidebar-card">
          <h3>{{ i18n.t('vocab.title') }}</h3>
          
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">{{ stats().total }}</span>
              <span class="stat-label">{{ i18n.t('study.cards') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value stat-new">{{ stats().new }}</span>
              <span class="stat-label">{{ i18n.t('study.new') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value stat-learning">{{ stats().learning }}</span>
              <span class="stat-label">{{ i18n.t('study.learning') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value stat-known">{{ stats().known }}</span>
              <span class="stat-label">{{ i18n.t('study.known') }}</span>
            </div>
          </div>

          @if (stats().total > 0) {
            <a routerLink="/study" class="btn btn-primary study-btn">
              <app-icon name="graduation-cap" [size]="16" />
              {{ i18n.t('study.start') }}
            </a>
          }
        </div>

        @if (recentSearches().length > 0) {
          <div class="sidebar-card">
            <div class="recent-header">
              <h4>{{ i18n.t('dictionary.recentSearches') }}</h4>
              <button class="clear-all-btn" (click)="clearAllRecentSearches()">
                {{ i18n.t('dictionary.clearAll') }}
              </button>
            </div>
            <div class="recent-list">
              @for (term of recentSearches(); track term) {
                <button class="recent-chip" (click)="searchTerm(term)">
                  <span class="recent-term">{{ term }}</span>
                  <span class="recent-delete" (click)="removeRecentSearch(term, $event)">
                    <app-icon name="x" [size]="12" />
                  </span>
                </button>
              }
            </div>
          </div>
        }
      </aside>

      <!-- Mobile: vocabulary list below dictionary -->
      <div class="vocab-section mobile-only">
        <app-vocabulary-list />
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .layout {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: var(--space-lg);
      align-items: start;
      max-width: 1280px;
      margin: 0 auto;
    }

    .layout-main {
      min-width: 0;
    }

    .layout-sidebar {
      align-self: start;
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .sidebar-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      padding: var(--space-md);
    }

    .sidebar-card h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: var(--space-md);
    }

    .recent-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--space-sm);
    }

    .recent-header h4 {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0;
    }

    .clear-all-btn {
      font-size: 0.75rem;
      color: var(--text-muted);
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0.25rem 0.5rem;
      border-radius: var(--border-radius);
      transition: all var(--transition-fast);
    }

    .clear-all-btn:hover {
      color: var(--accent-primary);
      background: rgba(199, 62, 58, 0.1);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-sm);
      margin-bottom: var(--space-md);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--space-sm);
      background: var(--bg-secondary);
      border-radius: var(--border-radius);
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .stat-new {
      color: var(--accent-primary);
    }

    .stat-learning {
      color: var(--word-learning-text);
    }

    .stat-known {
      color: var(--success);
    }

    .stat-label {
      font-size: 0.6875rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .study-btn {
      width: 100%;
      justify-content: center;
    }

    .recent-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }

    .recent-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.375rem 0.5rem 0.375rem 0.75rem;
      font-size: 0.875rem;
      background: var(--bg-secondary);
      color: var(--text-primary);
      border: 1px solid var(--border-color);
      border-radius: 100px;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    @media (hover: hover) {
      .recent-chip:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
        background: var(--bg-card);
        transform: translateY(-1px);
      }
    }

    .recent-term {
      line-height: 1;
    }

    .recent-delete {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.125rem;
      height: 1.125rem;
      border-radius: 50%;
      background: transparent;
      color: var(--text-muted);
      transition: all var(--transition-fast);
      flex-shrink: 0;
    }

    .recent-delete:hover {
      background: rgba(199, 62, 58, 0.15);
      color: var(--accent-primary);
    }

    .desktop-only {
      display: flex;
    }

    .mobile-only {
      display: none;
    }

    /* Tablet: stack to single column */
    @media (max-width: 1024px) {
      .layout {
        grid-template-columns: 1fr 280px;
      }
    }

    @media (max-width: 768px) {
      .layout {
        grid-template-columns: 1fr;
        gap: var(--space-xl);
      }

      .desktop-only {
        display: none !important;
      }

      .mobile-only {
        display: block;
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

      .mobile-only {
        display: block;
      }
    }
  `]
})
export class DictionaryPageComponent {
  private vocab = inject(VocabularyService);
  private dictionary = inject(DictionaryService);
  settings = inject(SettingsService);
  i18n = inject(I18nService);

  stats = computed(() => {
    return this.vocab.getStatsByLanguage(this.settings.settings().language);
  });

  // Use shared service state for recent searches (sliced to 6 for sidebar display)
  recentSearches = computed(() => this.dictionary.recentSearches().slice(0, 6));

  searchTerm(term: string): void {
    // Set the query in dictionary service, which the panel will pick up
    this.dictionary.lastQuery.set(term);
    // Trigger a re-render by updating localStorage timestamp
    localStorage.setItem('linguatube-search-trigger', Date.now().toString());
  }

  removeRecentSearch(term: string, event: Event): void {
    event.stopPropagation();
    this.dictionary.removeRecentSearch(term);
  }

  clearAllRecentSearches(): void {
    this.dictionary.clearAllRecentSearches();
  }
}
