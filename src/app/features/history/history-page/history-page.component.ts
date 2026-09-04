import { Component, ChangeDetectionStrategy, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { HistoryListComponent } from '../history-list/history-list.component';
import { HistoryService, SettingsService, I18nService, AuthService } from '../../../services';
import { HistoryItem } from '../../../models';

type FilterType = 'all' | 'favorites';

@Component({
  selector: 'app-history-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IconComponent,
    ConfirmDialogComponent,
    HistoryListComponent,
  ],
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
  protected historyService = inject(HistoryService);
  private router = inject(Router);

  settings = inject(SettingsService);
  i18n = inject(I18nService);
  auth = inject(AuthService);

  filter = signal<FilterType>('all');
  showClearConfirm = signal(false);

  // Toast with undo
  toastMessage = signal<string | null>(null);
  lastDeletedItem: HistoryItem | null = null;
  private toastTimeout: ReturnType<typeof setTimeout> | null = null;

  historyItems = computed(() => this.historyService.history());
  favorites = computed(() => this.historyService.favorites());
  isLoading = computed(() => this.historyService.isLoading());

  recentItem = computed(() => {
    const items = this.historyItems();
    return items.length > 0 ? items[0] : null;
  });

  filteredItems = computed(() => {
    const items = this.historyItems();
    if (this.filter() === 'favorites') {
      return items.filter(item => item.is_favorite);
    }
    return items;
  });

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.historyService.refresh();
    }
  }

  confirmClear(): void {
    this.showClearConfirm.set(true);
  }

  clearAll(): void {
    this.historyService.clearHistory();
    this.showClearConfirm.set(false);
    this.showToast(this.i18n.t('history.clearedAll') || 'All history cleared');
  }

  resumeVideo(videoId: string): void {
    this.router.navigate(['/video'], { queryParams: { id: videoId } });
  }

  onItemRemoved(item: HistoryItem): void {
    this.lastDeletedItem = item;
    this.showToast(this.i18n.t('history.itemRemoved') || 'Removed from history');
  }

  async undoDelete(): Promise<void> {
    if (this.lastDeletedItem) {
      await this.historyService.restoreItem(this.lastDeletedItem);
      this.lastDeletedItem = null;
      this.toastMessage.set(null);
    }
  }

  private showToast(message: string): void {
    this.toastMessage.set(message);
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.toastMessage.set(null);
      this.lastDeletedItem = null;
    }, 4500);
  }
}
