import { Component, ChangeDetectionStrategy, inject, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { OptionPickerComponent, OptionItem } from '../../../shared/components/option-picker/option-picker.component';
import { HistoryListComponent } from '../history-list/history-list.component';
import { HistoryService } from '../history.service';
import { I18nService, AuthService, ToastService, VideoLevelService } from '../../../core/services';
import { HistoryItem, SUPPORTED_LANGUAGES, getLanguageFlagUrl } from '../../../models';
import { getYouTubeThumbnail } from '../../../core/utils';

type FilterType = 'all' | 'favorites';

@Component({
  selector: 'app-history-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    IconComponent,
    ConfirmDialogComponent,
    OptionPickerComponent,
    HistoryListComponent,
  ],
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
  protected historyService = inject(HistoryService);
  protected videoLevelService = inject(VideoLevelService);
  private router = inject(Router);

  i18n = inject(I18nService);
  auth = inject(AuthService);
  toast = inject(ToastService);

  filter = signal<FilterType>('all');
  selectedLanguage = signal<string>('all');
  selectedLevel = signal<string>('all');
  readonly getFlagUrl = getLanguageFlagUrl;
  searchQuery = signal<string>('');
  showLanguageFilter = signal(false);
  showLevelFilter = signal(false);
  showClearConfirm = signal(false);

  // Undo tracking
  lastDeletedItem = signal<HistoryItem | null>(null);

  historyItems = this.historyService.history;
  favorites = this.historyService.favorites;
  isLoading = this.historyService.isLoading;

  inProgressCount = computed(() =>
    this.historyItems().filter(item => (item.progress || 0) > 0 && (item.progress || 0) < 90).length
  );

  completedCount = computed(() =>
    this.historyItems().filter(item => (item.progress || 0) >= 90).length
  );

  historySubtitle = computed(() => {
    const count = this.historyItems().length;
    const lang = this.i18n.currentLanguage();
    if (lang === 'vi') {
      return `${count} video`;
    }
    const singular = this.i18n.t('history.videoSingular') || 'video';
    const plural = this.i18n.t('history.videoPlural') || 'videos';
    return `${count} ${count === 1 ? singular : plural}`;
  });

  recentItem = computed(() => {
    const items = this.historyItems();
    return items.length > 0 ? items[0] : null;
  });

  inProgressVideo = computed(() => {
    return this.historyItems().find(item => (item.progress || 0) >= 5 && (item.progress || 0) < 90) || null;
  });

  availableLanguages = computed(() => {
    const langs = new Set<string>();
    for (const item of this.historyItems()) {
      if (item.languages?.length) {
        item.languages.forEach(l => langs.add(l));
      } else if (item.language) {
        langs.add(item.language);
      }
    }
    return Array.from(langs);
  });

  languageFilterOptions = computed<OptionItem[]>(() => {
    const options: OptionItem[] = [
      { value: 'all', label: this.i18n.t('playlist.allLanguages') || 'All Languages', icon: 'globe' }
    ];
    for (const lang of this.availableLanguages()) {
      const match = SUPPORTED_LANGUAGES.find(l => l.code === lang);
      options.push({
        value: lang,
        label: match ? match.name : lang.toUpperCase(),
        iconUrl: match?.flag
      });
    }
    return options;
  });

  levelFilterOptions = computed<OptionItem[]>(() => [
    { value: 'all', label: this.i18n.t('level.allLevels') || 'All Levels', icon: 'medal' },
    { value: 'beginner', label: this.i18n.t('level.beginner') || 'Beginner' },
    { value: 'elementary', label: this.i18n.t('level.elementary') || 'Elementary' },
    { value: 'intermediate', label: this.i18n.t('level.intermediate') || 'Intermediate' },
    { value: 'upper_intermediate', label: this.i18n.t('level.upper_intermediate') || this.i18n.t('level.upperIntermediate') || 'Upper Intermediate' },
    { value: 'advanced', label: this.i18n.t('level.advanced') || 'Advanced' },
  ]);

  getLanguageLabel(): string {
    const code = this.selectedLanguage();
    if (code === 'all') return this.i18n.t('playlist.allLanguages') || 'All Languages';
    const match = SUPPORTED_LANGUAGES.find(l => l.code === code);
    return match ? match.name : code.toUpperCase();
  }

  getLevelLabel(): string {
    const code = this.selectedLevel();
    const found = this.levelFilterOptions().find(o => o.value === code);
    return found ? found.label : (this.i18n.t('level.allLevels') || 'All Levels');
  }

  onLevelSelected(value: string): void {
    this.selectedLevel.set(value);
    this.showLevelFilter.set(false);
  }

  getThumbnail(videoId: string): string {
    return getYouTubeThumbnail(videoId, 'mqdefault');
  }

  filteredItems = computed(() => {
    let items = this.historyItems();
    if (this.filter() === 'favorites') {
      items = items.filter(item => item.is_favorite);
    }
    const lang = this.selectedLanguage();
    if (lang !== 'all') {
      items = items.filter(item => {
        if (item.languages?.length) {
          return (item.languages as string[]).includes(lang);
        }
        return item.language === lang;
      });
    }
    const lvl = this.selectedLevel();
    if (lvl !== 'all') {
      items = items.filter(item => {
        const resolved = this.videoLevelService.resolveLevel(
          item.video_id,
          item.language || (item.languages?.[0]),
          item.title,
          item.channel,
          item.level
        );
        return resolved?.tier === lvl;
      });
    }
    const q = this.searchQuery().trim().toLowerCase();
    if (q) {
      items = items.filter(item =>
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.channel && item.channel.toLowerCase().includes(q))
      );
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
    this.toast.success(this.i18n.t('history.clearedAll') || 'All history cleared');
  }

  resumeVideo(videoId: string): void {
    this.router.navigate(['/video'], { queryParams: { id: videoId } });
  }

  onItemRemoved(item: HistoryItem): void {
    this.lastDeletedItem.set(item);
    this.toast.show(this.i18n.t('history.itemRemoved') || 'Removed from history', {
      icon: 'trash-2',
      action: {
        label: this.i18n.t('common.undo') || 'Undo',
        action: () => this.undoDelete()
      }
    });
  }

  async undoDelete(): Promise<void> {
    const item = this.lastDeletedItem();
    if (item) {
      await this.historyService.restoreItem(item);
      this.lastDeletedItem.set(null);
    }
  }
}
