import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { VocabularyService, SettingsService, I18nService } from '../../services';
import { VocabularyItem, WordLevel } from '../../models';

@Component({
  selector: 'app-vocabulary-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './vocabulary-list.component.html',
  styleUrl: './vocabulary-list.component.scss'
})
export class VocabularyListComponent {
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  i18n = inject(I18nService);

  // Search with debounce (300ms)
  private searchInput = signal('');
  private debouncedSearch = signal('');
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  levelFilter: WordLevel | 'all' = 'all';

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
    }, 300);
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  // Delete modal state
  deleteModalVisible = signal(false);
  private pendingDeleteId: string | null = null;

  // Toast notification state
  toastMessage = signal<string | null>(null);
  toastType = signal<'success' | 'error'>('success');
  private toastTimeout: ReturnType<typeof setTimeout> | null = null;

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

    if (this.levelFilter !== 'all') {
      items = items.filter(item => item.level === this.levelFilter);
    }

    return [...items].sort((a, b) =>
      new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    );
  });

  updateLevel(id: string, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const level = select.value as WordLevel;
    this.vocab.updateLevel(id, level);
  }

  deleteWord(id: string): void {
    this.pendingDeleteId = id;
    this.deleteModalVisible.set(true);
  }

  confirmDelete(): void {
    if (this.pendingDeleteId) {
      this.vocab.deleteWord(this.pendingDeleteId);
      this.pendingDeleteId = null;
    }
    this.deleteModalVisible.set(false);
  }

  cancelDelete(): void {
    this.pendingDeleteId = null;
    this.deleteModalVisible.set(false);
  }

  exportJSON(): void {
    const json = this.vocab.exportToJSON();
    this.downloadFile(json, 'linguatube-vocabulary.json', 'application/json');
  }

  exportAnki(): void {
    const tsv = this.vocab.exportToAnki();
    this.downloadFile(tsv, 'linguatube-anki.tsv', 'text/tab-separated-values');
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
