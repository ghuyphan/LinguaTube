import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../components/icon/icon.component';
import { BottomSheetComponent } from '../../components/bottom-sheet/bottom-sheet.component';
import { HistoryListComponent } from '../../components/history-list/history-list.component';
import { HistoryService, SettingsService, I18nService, AuthService } from '../../services';

type FilterType = 'all' | 'favorites';

@Component({
  selector: 'app-history-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    IconComponent,
    BottomSheetComponent,
    HistoryListComponent
  ],
  template: `
    <div class="layout">
      <div class="layout-main">
        <!-- Main History Panel -->
        <div class="history-panel">
          <div class="history-header">
            <div class="header-row">
              <app-icon name="clock" [size]="20" class="history-icon" />
              <h2 class="history-title">{{ i18n.t('history.title') }}</h2>
            </div>
            <div class="history-badges">
              <span class="badge badge--primary">{{ historyItems().length }} {{ i18n.t('history.all') }}</span>
              @if (favorites().length > 0) {
                <span class="badge badge--accent">{{ favorites().length }} {{ i18n.t('history.favorites') }}</span>
              }
            </div>
          </div>

          <!-- Filters -->
          <div class="history-filters">
            <button 
              class="filter-chip" 
              [class.active]="filter() === 'all'"
              (click)="filter.set('all')">
              {{ i18n.t('history.all') }}
            </button>
            <button 
              class="filter-chip" 
              [class.active]="filter() === 'favorites'"
              (click)="filter.set('favorites')">
              <app-icon name="heart" [size]="14" />
              {{ i18n.t('history.favorites') }}
            </button>
            <div class="filter-spacer"></div>
            @if (historyItems().length > 0) {
              <button class="btn btn-sm btn-ghost" (click)="confirmClear()">
                <app-icon name="trash-2" [size]="14" />
                {{ i18n.t('history.clearAll') }}
              </button>
            }
          </div>

          <!-- History list component -->
          <div class="history-list">
            @if (filteredItems().length === 0 && historyItems().length > 0) {
              <!-- No favorites -->
              <div class="empty-state animate-in">
                <app-icon name="heart" [size]="32" class="empty-state__icon" />
                <p class="empty-state__title">{{ i18n.t('history.noFavorites') }}</p>
                <p class="empty-state__hint">{{ i18n.t('history.noFavoritesHint') }}</p>
              </div>
            } @else if (historyItems().length === 0) {
              <!-- No history at all -->
              <div class="empty-state">
                <app-icon name="play-circle" [size]="32" class="empty-state__icon" />
                <p class="empty-state__title">{{ i18n.t('history.noHistory') }}</p>
                <p class="empty-state__hint">{{ i18n.t('history.noHistoryHint') }}</p>
                <a routerLink="/video" class="btn btn-primary btn-sm">
                  <app-icon name="play" [size]="14" />
                  {{ i18n.t('nav.video') }}
                </a>
              </div>
            } @else {
              <app-history-list [items]="filteredItems()" [filter]="filter()" />
            }
          </div>
        </div>

        <!-- Sync hint for guests -->
        @if (auth.isInitialized() && !auth.isLoggedIn()) {
          <div class="sync-hint-mobile mobile-only">
            <app-icon name="cloud" [size]="16" />
            <span>{{ i18n.t('history.syncHint') }}</span>
          </div>
        }
      </div>

      <!-- Desktop sidebar -->
      <aside class="layout-sidebar desktop-only">
        <div class="sidebar-card">
          <h3>{{ i18n.t('history.title') }}</h3>
          
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">{{ historyItems().length }}</span>
              <span class="stat-label">{{ i18n.t('history.all') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value stat-favorite">{{ favorites().length }}</span>
              <span class="stat-label">{{ i18n.t('history.favorites') }}</span>
            </div>
          </div>

          @if (auth.isInitialized() && !auth.isLoggedIn()) {
            <div class="sync-hint">
              <app-icon name="cloud" [size]="16" />
              <span>{{ i18n.t('history.syncHint') }}</span>
            </div>
          }
        </div>
      </aside>
    </div>

    <!-- Clear confirmation bottom sheet -->
    <app-bottom-sheet
      [isOpen]="showClearConfirm()"
      [showCloseButton]="true"
      [maxHeight]="'auto'"
      (closed)="showClearConfirm.set(false)"
    >
      <div class="confirm-sheet">
        <div class="confirm-sheet__icon">
          <app-icon name="trash-2" [size]="32" />
        </div>
        <h3 class="confirm-sheet__title">{{ i18n.t('history.clearConfirm') }}</h3>
        <div class="confirm-sheet__actions">
          <button class="confirm-sheet__btn confirm-sheet__btn--secondary" (click)="showClearConfirm.set(false)">
            {{ i18n.t('vocab.cancel') }}
          </button>
          <button class="confirm-sheet__btn confirm-sheet__btn--danger" (click)="clearAll()">
            {{ i18n.t('history.clearAll') }}
          </button>
        </div>
      </div>
    </app-bottom-sheet>
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

    /* History panel */
    .history-panel {
      background: var(--bg-card);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
    }

    .history-header {
      padding: var(--space-sm) var(--space-md);
    }

    .header-row {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .history-icon {
      color: var(--accent-primary);
    }

    .history-title {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
    }

    .history-badges {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      margin-top: var(--space-xs);
    }

    .history-filters {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      border-bottom: 1px solid var(--border-color);
    }

    .filter-chip {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      padding: var(--space-xs) var(--space-sm);
      font-size: 0.8125rem;
      font-weight: 500;
      background: var(--bg-secondary);
      color: var(--text-secondary);
      border: 1px solid transparent;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .filter-chip.active {
      background: var(--bg-card);
      color: var(--accent-primary);
      border-color: var(--accent-primary);
    }

    @media (hover: hover) {
      .filter-chip:hover:not(.active) {
        background: var(--bg-tertiary);
      }
    }

    .filter-spacer {
      flex: 1;
    }

    .history-list {
      flex: 1;
      overflow-y: auto;
    }

    /* Empty state */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      color: var(--text-muted);
    }

    .empty-state__icon {
      margin-bottom: var(--space-md);
      opacity: 0.5;
    }

    .empty-state__title {
      font-size: 1rem;
      color: var(--text-primary);
      margin: 0 0 var(--space-xs);
    }

    .empty-state__hint {
      margin: 0 0 var(--space-md);
      font-size: 0.875rem;
    }

    /* Animation for favorites empty state */
    .empty-state.animate-in {
      animation: fadeSlideIn 0.25s ease-out;
    }

    @keyframes fadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Sidebar */
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

    .stat-favorite {
      color: var(--accent-primary);
    }

    .stat-label {
      font-size: 0.6875rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .sync-hint {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm);
      font-size: 0.8125rem;
      color: var(--text-muted);
      background: var(--bg-secondary);
      border-radius: var(--border-radius);
    }

    .sync-hint-mobile {
      display: none;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      margin-top: var(--space-md);
      padding: var(--space-sm) var(--space-md);
      font-size: 0.8125rem;
      color: var(--text-muted);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
    }

    /* Confirm sheet */
    .confirm-sheet {
      padding: var(--space-lg);
      text-align: center;
    }

    .confirm-sheet__icon {
      width: 4rem;
      height: 4rem;
      margin: 0 auto var(--space-md);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(200, 60, 60, 0.1);
      border-radius: var(--border-radius-round);
      color: var(--error);
    }

    .confirm-sheet__title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 var(--space-lg);
    }

    .confirm-sheet__actions {
      display: flex;
      gap: var(--space-sm);
    }

    .confirm-sheet__btn {
      flex: 1;
      padding: var(--space-md);
      border-radius: var(--border-radius);
      font-size: 0.9375rem;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .confirm-sheet__btn--secondary {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    .confirm-sheet__btn--danger {
      background: var(--error);
      color: white;
    }

    @media (hover: hover) {
      .confirm-sheet__btn--secondary:hover {
        background: var(--bg-card);
      }

      .confirm-sheet__btn--danger:hover {
        opacity: 0.9;
      }
    }

    .desktop-only {
      display: flex;
    }

    .mobile-only {
      display: none;
    }

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

      .mobile-only {
        display: flex;
      }
    }

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
export class HistoryPageComponent {
  private historyService = inject(HistoryService);

  settings = inject(SettingsService);
  i18n = inject(I18nService);
  auth = inject(AuthService);

  filter = signal<FilterType>('all');
  showClearConfirm = signal(false);

  historyItems = computed(() => this.historyService.history());
  favorites = computed(() => this.historyService.favorites());

  filteredItems = computed(() => {
    const items = this.historyItems();
    if (this.filter() === 'favorites') {
      return items.filter(item => item.is_favorite);
    }
    return items;
  });

  confirmClear(): void {
    this.showClearConfirm.set(true);
  }

  clearAll(): void {
    this.historyService.clearHistory();
    this.showClearConfirm.set(false);
  }
}
