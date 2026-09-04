import { Component, inject, signal, computed, ChangeDetectionStrategy, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';

import { VocabularyService, SettingsService, I18nService, AuthService } from '../../../services';

import { VocabularyItem, WordLevel, Token } from '../../../models';

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
  readonly auth = inject(AuthService);
  private router = inject(Router);

  // Inputs & Outputs
  embedded = input<boolean>(false);
  showHeader = input<boolean>(true);
  showMenu = input<boolean>(false);
  deleteRequest = output<string>();
  menuRequest = output<void>();
  wordSelect = output<Token>();

  // Search with debounce (300ms)
  private searchInput = signal('');
  private debouncedSearch = signal('');
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  // Last deleted item for undo functionality
  lastDeletedItem: VocabularyItem | null = null;

  currentLangVocabCount = computed(() => {
    const lang = this.settings.settings().language;
    return this.vocab.vocabulary().filter(w => w.language === lang).length;
  });

  cycleLevel(item: VocabularyItem, event: Event): void {
    event.stopPropagation();
    const cycleOrder: WordLevel[] = ['new', 'learning', 'known', 'ignored'];
    const currentIndex = cycleOrder.indexOf(item.level);
    const nextLevel = cycleOrder[(currentIndex + 1) % cycleOrder.length];
    this.vocab.updateLevel(item.id, nextLevel);
  }

  openDictionary(): void {
    this.router.navigate(['/dictionary']);
  }

  onWordClick(item: VocabularyItem): void {
    this.wordSelect.emit({
      surface: item.word,
      reading: this.getItemReading(item) || undefined,
      baseForm: item.word,
      level: item.level
    });
  }

  deleteWordDirect(item: VocabularyItem, event: Event): void {
    event.stopPropagation();
    this.lastDeletedItem = item;
    this.vocab.deleteWord(item.id);
    this.showToast(this.i18n.t('vocab.deleteSuccess') || `Đã xoá "${item.word}"`, 'success');
  }

  undoDelete(): void {
    if (this.lastDeletedItem) {
      this.vocab.addWord(
        this.lastDeletedItem.word,
        this.lastDeletedItem.meaning,
        this.lastDeletedItem.language,
        this.lastDeletedItem.reading,
        this.lastDeletedItem.pinyin,
        this.lastDeletedItem.romanization,
        this.lastDeletedItem.examples?.[0]
      );
      this.lastDeletedItem = null;
      this.toastMessage.set(null);
    }
  }

  // Getter/setter for two-way binding with debounce
  get searchQuery(): string {
    return this.searchInput();
  }

  set searchQuery(value: string) {
    this.searchInput.set(value);
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

  // Toast notification state
  toastMessage = signal<string | null>(null);
  toastType = signal<'success' | 'error'>('success');
  private toastTimeout: ReturnType<typeof setTimeout> | null = null;

  getItemReading(item: VocabularyItem): string | null {
    return this.settings.getReadingText(item.language, item);
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

    return [...items].sort((a, b) =>
      new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    );
  });

  deleteWord(id: string): void {
    this.deleteRequest.emit(id);
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
      } catch {
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
