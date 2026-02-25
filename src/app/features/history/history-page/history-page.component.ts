import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { HistoryListComponent } from '../history-list/history-list.component';
import { HistoryService, SettingsService, I18nService, AuthService } from '../../../services';

type FilterType = 'all' | 'favorites';

import { MascotComponent } from '../../../components/mascot/mascot.component';

@Component({
  selector: 'app-history-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IconComponent,
    BottomSheetComponent,
    HistoryListComponent,
    MascotComponent
  ],
  template: `
    <div class="page-layout">
      <div class="page-layout__main">
        <!-- Main History Panel -->
        <div class="card history-panel">
          <div class="panel-header">
            <div class="header-row">
              <app-icon name="clock" [size]="20" class="panel-icon" />
              <h2 class="panel-title">{{ i18n.t('history.title') }}</h2>
            </div>
            <div class="panel-badges">
              <span class="badge badge--primary">{{ historyItems().length }} {{ i18n.t('history.all') }}</span>
              @if (favorites().length > 0) {
                <span class="badge badge--accent">{{ favorites().length }} {{ i18n.t('history.favorites') }}</span>
              }
            </div>
          </div>

          <!-- Filters -->
          <div class="filter-chips">
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
            <div class="filter-chips__spacer"></div>
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
              <div class="empty-state empty-state--centered empty-state--animate">
                <div class="empty-state__mascot" style="width: 120px; height: 120px; margin-bottom: 1rem;">
                  <app-mascot mood="sad"></app-mascot>
                </div>
                <div class="empty-state__text" style="align-items: center; text-align: center;">
                  <p class="empty-state__title">{{ i18n.t('history.noFavorites') }}</p>
                  <p class="empty-state__description">{{ i18n.t('history.noFavoritesHint') }}</p>
                </div>
              </div>
            } @else if (historyItems().length === 0) {
              <!-- No history at all -->
              <div class="empty-state empty-state--centered">
                <div class="empty-state__mascot" style="width: 120px; height: 120px; margin-bottom: 1rem;">
                  <app-mascot mood="sleeping"></app-mascot>
                </div>
                <div class="empty-state__text" style="align-items: center; text-align: center;">
                  <p class="empty-state__title">{{ i18n.t('history.noHistory') }}</p>
                  <p class="empty-state__description">{{ i18n.t('history.noHistoryHint') }}</p>
                </div>
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
      <aside class="page-layout__sidebar desktop-only">
        <div class="sidebar-card">
          <h3 class="sidebar-card__title">{{ i18n.t('history.title') }}</h3>
          
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-item__value">{{ historyItems().length }}</span>
              <span class="stat-item__label">{{ i18n.t('history.all') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-item__value stat-item__value--favorite">{{ favorites().length }}</span>
              <span class="stat-item__label">{{ i18n.t('history.favorites') }}</span>
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
      #confirmSheet
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
          <button class="confirm-sheet__btn confirm-sheet__btn--secondary" (click)="confirmSheet.close()">
            {{ i18n.t('vocab.cancel') }}
          </button>
          <button class="confirm-sheet__btn confirm-sheet__btn--danger" (click)="clearAll(); confirmSheet.close()">
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

    /* History panel - component specific */
    .history-panel {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .panel-header {
      padding: var(--space-sm) var(--space-md);
      flex-shrink: 0;
    }

    .header-row {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .panel-icon {
      color: var(--accent-primary);
    }

    .panel-title {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
    }

    .panel-badges {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
      margin-top: var(--space-xs);
    }

    .filter-chips {
      flex-shrink: 0;
    }

    .history-list {
      display: flex;
      flex-direction: column;
      position: relative;
    }
    
    app-history-list {
      display: block;
      /* Explicit height required for virtual scroll */
      height: calc(100vh - 220px); 
      overflow: hidden;
    }
    
    @media (max-width: 768px) {
      app-history-list {
         height: calc(100vh - 280px); /* Account for bottom nav */
      }
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
      flex-shrink: 0;
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
    // Sheet is closed via template interaction
  }
}
