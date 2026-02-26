import { Component, inject, signal, computed, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { OptionPickerComponent, OptionItem } from '../../../shared/components/option-picker/option-picker.component';

import { VocabularyService, SettingsService, I18nService, AuthService } from '../../../services';

import { VocabularyItem, WordLevel } from '../../../models';

import { MascotComponent } from '../../../components/mascot/mascot.component';

@Component({
  selector: 'app-vocabulary-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, FormsModule, IconComponent, OptionPickerComponent, MascotComponent],
  templateUrl: './vocabulary-list.component.html',
  styleUrl: './vocabulary-list.component.scss'
})
export class VocabularyListComponent {
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  i18n = inject(I18nService);
  // readonly sync = inject(SyncService); // Removed
  readonly auth = inject(AuthService);

  // New Outputs to lift state up
  deleteRequest = output<string>();
  menuRequest = output<void>();



  // Search with debounce (300ms)
  private searchInput = signal('');
  private debouncedSearch = signal('');
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  levelFilter = signal<WordLevel | 'all'>('all');
  sortBy = signal<'recent' | 'alphabetical' | 'level' | 'review'>('recent');

  // Filter picker state
  filterPickerOpen = signal(false);
  sortPickerOpen = signal(false);

  // Expand & Swipe state (Phase 3.1 & 3.2)
  expandedItemId = signal<string | null>(null);
  swipingItemId = signal<string | null>(null);
  swipeOffset = signal(0);
  private touchStartX = 0;
  private touchStartY = 0;
  private isSwipingList = false;

  // Level picker state (for individual items)
  levelPickerOpen = signal(false);
  editingItemId = signal<string | null>(null);

  // Options for filter picker
  filterOptions = computed<OptionItem[]>(() => [
    { value: 'all', label: this.i18n.t('vocab.allLevels') },
    { value: 'new', label: this.i18n.t('vocab.new') },
    { value: 'learning', label: this.i18n.t('vocab.learning') },
    { value: 'known', label: this.i18n.t('vocab.known') },
    { value: 'ignored', label: this.i18n.t('vocab.ignored') }
  ]);

  // Options for level picker
  levelOptions = computed<OptionItem[]>(() => [
    { value: 'new', label: this.i18n.t('vocab.new') },
    { value: 'learning', label: this.i18n.t('vocab.learning') },
    { value: 'known', label: this.i18n.t('vocab.known') },
    { value: 'ignored', label: this.i18n.t('vocab.ignored') }
  ]);

  // Options for sort picker
  sortOptions = computed<OptionItem[]>(() => [
    { value: 'recent', label: this.i18n.t('vocab.sortRecent') },
    { value: 'alphabetical', label: this.i18n.t('vocab.sortAlphabetical') },
    { value: 'level', label: this.i18n.t('vocab.sortLevel') },
    { value: 'review', label: this.i18n.t('vocab.sortReview') }
  ]);

  onLevelFilterChange(value: string) {
    this.levelFilter.set(value as WordLevel | 'all');
    this.currentPage.set(1);
    this.filterPickerOpen.set(false);
  }

  onSortChange(value: string) {
    this.sortBy.set(value as any);
    this.currentPage.set(1);
    this.sortPickerOpen.set(false);
  }

  openLevelPicker(itemId: string): void {
    this.editingItemId.set(itemId);
    this.levelPickerOpen.set(true);
  }

  onLevelChange(value: string): void {
    const itemId = this.editingItemId();
    if (itemId) {
      this.vocab.updateLevel(itemId, value as WordLevel);
    }
    this.levelPickerOpen.set(false);
    this.editingItemId.set(null);
  }

  getEditingItemLevel(): string {
    const itemId = this.editingItemId();
    if (!itemId) return 'new';
    const item = this.vocab.vocabulary().find(w => w.id === itemId);
    return item?.level || 'new';
  }

  // Getter/setter for two-way binding with debounce
  get searchQuery(): string {
    return this.searchInput();
  }

  set searchQuery(value: string) {
    this.searchInput.set(value);
    // Debounce the actual filter update
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.debouncedSearch.set(value);
      this.currentPage.set(1); // Reset page on search
    }, 300);
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  // Toast notification state
  toastMessage = signal<string | null>(null);
  toastType = signal<'success' | 'error'>('success');
  private toastTimeout: ReturnType<typeof setTimeout> | null = null;

  // Pagination state
  currentPage = signal(1);
  readonly pageSize = 20;

  // Track by function for better list performance
  trackByWordId(index: number, item: VocabularyItem): string {
    return item.id;
  }

  filteredWords = computed(() => {
    let items = this.vocab.vocabulary();

    // Filter by current language
    const currentLang = this.settings.settings().language;
    items = items.filter(item => item.language === currentLang);

    // Use debounced search value
    const query = this.debouncedSearch().toLowerCase();
    if (query) {
      items = items.filter(item =>
        item.word.toLowerCase().includes(query) ||
        item.meaning.toLowerCase().includes(query) ||
        item.reading?.toLowerCase().includes(query) ||
        item.pinyin?.toLowerCase().includes(query) ||
        item.romanization?.toLowerCase().includes(query)
      );
    }

    if (this.levelFilter() !== 'all') {
      items = items.filter(item => item.level === this.levelFilter());
    }

    // Sort by selected option
    const sort = this.sortBy();
    return [...items].sort((a, b) => {
      switch (sort) {
        case 'alphabetical':
          return a.word.localeCompare(b.word);
        case 'level': {
          const levelOrder: Record<string, number> = { new: 0, learning: 1, known: 2, ignored: 3 };
          return (levelOrder[a.level] ?? 4) - (levelOrder[b.level] ?? 4);
        }
        case 'review': {
          const aDate = a.nextReviewDate ? new Date(a.nextReviewDate).getTime() : 0;
          const bDate = b.nextReviewDate ? new Date(b.nextReviewDate).getTime() : 0;
          return aDate - bDate;
        }
        case 'recent':
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
    });
  });

  /** Get SRS due label for a vocabulary item */
  getDueLabel(item: VocabularyItem): string | null {
    if (item.level === 'ignored') return null;
    if (!item.nextReviewDate) return this.i18n.t('vocab.dueToday');

    const now = new Date();
    const due = new Date(item.nextReviewDate);
    const diffMs = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return diffDays < 0 ? this.i18n.t('vocab.overdue') : this.i18n.t('vocab.dueToday');
    }
    return this.i18n.t('vocab.dueInDays', { days: diffDays });
  }

  paginatedWords = computed(() => {
    const words = this.filteredWords();
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    return words.slice(startIndex, startIndex + this.pageSize);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredWords().length / this.pageSize);
  });

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
      this.scrollToTop();
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
      this.scrollToTop();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.scrollToTop();
    }
  }

  private scrollToTop(): void {
    const listElement = document.querySelector('.word-list');
    if (listElement) {
      listElement.scrollTop = 0;
    }
  }

  updateLevel(id: string, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const level = select.value as WordLevel;
    this.vocab.updateLevel(id, level);
  }

  deleteWord(id: string): void {
    this.deleteRequest.emit(id);
  }

  // ==================== Expand & Swipe (Phase 3.1 & Phase 3.2) ====================

  toggleExpand(id: string): void {
    // Prevent expanding if currently swiping
    if (this.swipingItemId() === id && Math.abs(this.swipeOffset()) > 5) return;
    this.expandedItemId.update(current => current === id ? null : id);
  }

  onTouchStart(event: TouchEvent, id: string): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.swipingItemId.set(id);
    this.swipeOffset.set(0);
    this.isSwipingList = false;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.swipingItemId()) return;

    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const diffX = touchX - this.touchStartX;
    const diffY = touchY - this.touchStartY;

    // Determine if user is scrolling vertically vs swiping horizontally
    if (!this.isSwipingList) {
      if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 5) {
        // Vertical scroll detected, cancel horizontal swipe
        this.swipingItemId.set(null);
        return;
      }
      if (Math.abs(diffX) > 5) {
        this.isSwipingList = true;
      }
    }

    if (this.isSwipingList) {
      // Only allow swipe left (e.g. for delete) or maybe right (for edit/level)
      // Let's allow both and cap the distance
      const cappedDiff = Math.max(-80, Math.min(80, diffX));
      this.swipeOffset.set(cappedDiff);

      // Prevent default to stop scrolling while swiping horizontally
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  }

  onTouchEnd(): void {
    if (!this.swipingItemId()) return;

    const offset = this.swipeOffset();
    const id = this.swipingItemId()!;

    if (offset < -50) {
      // Swiped far left -> Trigger delete
      this.deleteWord(id);
    } else if (offset > 50) {
      // Swiped far right -> Trigger level picker
      this.openLevelPicker(id);
    }

    // Reset swipe
    this.swipingItemId.set(null);
    this.swipeOffset.set(0);
    this.isSwipingList = false;
  }

  getFormatDate(dateStr?: string | Date): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  }

  // Export methods (called by parent via ViewChild or service)
  exportJSON(): void {
    const json = this.vocab.exportToJSON();
    this.downloadFile(json, 'voca-vocabulary.json', 'application/json');
  }

  exportAnki(): void {
    const tsv = this.vocab.exportToAnki();
    this.downloadFile(tsv, 'voca-anki.tsv', 'text/tab-separated-values');
  }

  importJSON(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        this.vocab.importFromJSON(content);
        this.showToast('Vocabulary imported successfully!', 'success');
      } catch (err) {
        this.showToast('Failed to import. Check file format.', 'error');
      }
    };
    reader.readAsText(file);
    input.value = '';
  }



  private downloadFile(content: string, filename: string, type: string): void {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  private showToast(message: string, type: 'success' | 'error'): void {
    // Clear any existing timeout
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastMessage.set(message);
    this.toastType.set(type);

    // Auto-dismiss after 3 seconds
    this.toastTimeout = setTimeout(() => {
      this.toastMessage.set(null);
    }, 3000);
  }
}
