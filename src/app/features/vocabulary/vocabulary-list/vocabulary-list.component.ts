import { Component, inject, signal, computed, ChangeDetectionStrategy, output, input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { OptionPickerComponent, OptionItem } from '../../../shared/components/option-picker/option-picker.component';

import { VocabularyService } from '../vocabulary.service';
import { SettingsService, I18nService, AuthService, AudioService, ToastService } from '../../../core/services';

import { VocabularyItem, WordLevel, Token } from '../../../models';

@Component({
  selector: 'app-vocabulary-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent, OptionPickerComponent],
  templateUrl: './vocabulary-list.component.html',
  styleUrl: './vocabulary-list.component.scss'
})
export class VocabularyListComponent implements OnDestroy {
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  i18n = inject(I18nService);
  toast = inject(ToastService);
  readonly auth = inject(AuthService);
  readonly audio = inject(AudioService);
  private router = inject(Router);

  // Inputs & Outputs
  embedded = input<boolean>(false);
  showHeader = input<boolean>(true);
  showMenu = input<boolean>(false);
  deleteRequest = output<string>();
  menuRequest = output<void>();
  wordSelect = output<Token>();
  addWordRequest = output<string | void>();

  // Level filter signal
  selectedLevel = signal<WordLevel | 'all'>('all');

  // Search with debounce (300ms)
  private searchInput = signal('');
  private debouncedSearch = signal('');
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  // Last deleted item for undo functionality
  lastDeletedItem = signal<VocabularyItem | null>(null);
  readonly deletingWordId = signal<string | null>(null);
  private deleteTimeout: ReturnType<typeof setTimeout> | null = null;

  currentLangVocabCount = computed(() => {
    const lang = this.settings.settings().language;
    const words = new Set(
      this.vocab.vocabulary()
        .filter(w => w.language === lang)
        .map(w => w.word.trim().toLowerCase())
    );
    return words.size;
  });

  levelCounts = computed(() => {
    const lang = this.settings.settings().language;
    const items = this.vocab.vocabulary().filter(w => w.language === lang);
    return {
      all: items.length,
      new: items.filter(w => w.level === 'new').length,
      learning: items.filter(w => w.level === 'learning').length,
      known: items.filter(w => w.level === 'known').length,
      ignored: items.filter(w => w.level === 'ignored').length,
    };
  });

  // Level picker state
  readonly levelPickerOpen = signal(false);
  readonly editingItem = signal<VocabularyItem | null>(null);

  readonly levelOptions = computed<OptionItem[]>(() => [
    { value: 'new', label: this.i18n.t('vocab.new') || 'New', icon: 'plus-circle', color: 'new' },
    { value: 'learning', label: this.i18n.t('vocab.learning') || 'Learning', icon: 'clock', color: 'learning' },
    { value: 'known', label: this.i18n.t('vocab.known') || 'Known', icon: 'check-circle', color: 'known' },
    { value: 'ignored', label: this.i18n.t('vocab.ignored') || 'Ignored', icon: 'slash', color: 'ignored' },
  ]);

  playAudio(item: VocabularyItem, event: Event): void {
    event.stopPropagation();
    void this.audio.playWord(item.word, item.language, item.audio);
  }

  openLevelPicker(item: VocabularyItem, event: Event): void {
    event.stopPropagation();
    this.editingItem.set(item);
    this.levelPickerOpen.set(true);
  }

  onLevelSelected(newLevel: string): void {
    const item = this.editingItem();
    if (item && item.level !== newLevel) {
      this.vocab.updateLevel(item.id, newLevel as WordLevel);
    }
    this.levelPickerOpen.set(false);
    this.editingItem.set(null);
  }

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

  searchInDictionary(query?: string): void {
    this.addWordRequest.emit(query || this.searchQuery || undefined);
    this.openDictionary();
  }

  onWordClick(item: VocabularyItem): void {
    this.wordSelect.emit({
      surface: item.word,
      reading: this.getItemReading(item) || undefined,
      baseForm: item.word,
      level: item.level
    });
  }

  onLevelContextMenu(item: VocabularyItem, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.openLevelPicker(item, event);
  }

  deleteWordDirect(item: VocabularyItem, event: Event): void {
    event.stopPropagation();
    if (this.deletingWordId()) return;

    this.deletingWordId.set(item.id);
    this.lastDeletedItem.set(item);

    // Wait for the exit animation (180ms) before removing from state
    if (this.deleteTimeout) {
      clearTimeout(this.deleteTimeout);
    }
    this.deleteTimeout = setTimeout(() => {
      this.vocab.deleteWord(item.id);
      this.deletingWordId.set(null);
      this.deleteTimeout = null;
      this.toast.show(this.i18n.t('vocab.deleteSuccess', { word: item.word }) || `Deleted "${item.word}"`, {
        type: 'success',
        action: {
          label: this.i18n.t('common.undo') || 'Undo',
          action: () => this.undoDelete()
        }
      });
    }, 180);
  }

  undoDelete(): void {
    const item = this.lastDeletedItem();
    if (item) {
      this.vocab.addWord(
        item.word,
        item.meaning,
        item.language,
        item.reading,
        item.pinyin,
        item.romanization,
        item.sourceSentence || item.examples?.[0],
        item.audio,
        item.sourceVideoId,
        item.sourceTimestamp
      );
      this.lastDeletedItem.set(null);
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
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = null;
    }
    this.searchInput.set('');
    this.debouncedSearch.set('');
  }

  getItemReading(item: VocabularyItem): string | null {
    return this.settings.getReadingText(item.language, item);
  }

  filteredWords = computed(() => {
    let items = this.vocab.vocabulary();

    // Filter by current language
    const currentLang = this.settings.settings().language;
    items = items.filter(item => item.language === currentLang);

    // Filter by selected level
    const level = this.selectedLevel();
    if (level !== 'all') {
      items = items.filter(item => item.level === level);
    }

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

    // Sort by newest added first
    const sorted = [...items].sort((a, b) =>
      new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    );

    // Deduplicate so identical words don't repeat in the list
    const seen = new Set<string>();
    return sorted.filter(item => {
      const key = item.word.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  });

  deleteWord(id: string): void {
    this.deleteRequest.emit(id);
  }

  // Export methods (called by parent via ViewChild or service)
  exportJSON(): void {
    this.vocab.exportAsFile('json');
  }

  exportAnki(): void {
    this.vocab.exportAsFile('anki');
  }

  importJSON(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.vocab.importFromFile(file)
      .then(() => {
        this.toast.success(this.i18n.t('vocab.importSuccess') || 'Vocabulary imported successfully!');
      })
      .catch(() => {
        this.toast.error(this.i18n.t('vocab.importError') || 'Failed to import. Check file format.');
      });
    input.value = '';
  }

  isItemDue(item: VocabularyItem): boolean {
    if (item.level === 'ignored') return false;
    if (!item.nextReviewDate) return true;
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return new Date(item.nextReviewDate) <= today;
  }

  formatNextReview(item: VocabularyItem): string {
    if (!item.nextReviewDate) {
      return this.i18n.t('study.new') || 'New';
    }
    const reviewDate = new Date(item.nextReviewDate);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (reviewDate <= today) {
      return this.i18n.t('study.dueNow') || 'Due';
    }
    const diffMs = reviewDate.getTime() - Date.now();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) {
      return '1d';
    }
    return `${diffDays}d`;
  }

  ngOnDestroy(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = null;
    }
    if (this.deleteTimeout) {
      clearTimeout(this.deleteTimeout);
      this.deleteTimeout = null;
    }
  }
}
