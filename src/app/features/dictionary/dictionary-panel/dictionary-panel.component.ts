import { Component, inject, signal, computed, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { DictionaryService, VocabularyService, SettingsService, I18nService } from '../../../services';
import { DictionaryEntry } from '../../../models';

@Component({
  selector: 'app-dictionary-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './dictionary-panel.component.html',
  styleUrl: './dictionary-panel.component.scss'
})
export class DictionaryPanelComponent {
  dictionary = inject(DictionaryService);
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  i18n = inject(I18nService);
  destroyRef = inject(DestroyRef);

  searchQuery = '';
  lastQuery = '';
  result = signal<DictionaryEntry | null>(null);
  isLoading = signal(false);
  hasSearched = signal(false);

  // Reactive check against vocabulary service
  isSaved = computed(() => {
    const entry = this.result();
    return entry ? this.vocab.hasWord(entry.word) : false;
  });

  // Use shared service state for recent searches
  recentSearches = this.dictionary.recentSearches;

  constructor() {
    // Init from service state (persistence)
    this.searchQuery = this.dictionary.lastQuery();
    this.result.set(this.dictionary.lastLookup());

    if (this.searchQuery && this.result()) {
      this.hasSearched.set(true);
      this.lastQuery = this.searchQuery;
    }
  }

  search(): void {
    const query = this.searchQuery.trim();
    if (!query) return;

    this.lastQuery = query;
    this.isLoading.set(true);
    this.hasSearched.set(true);

    // Update service state
    this.dictionary.lastQuery.set(query);

    const lang = this.settings.settings().language;
    this.dictionary.lookup(query, lang)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (entry) => {
          this.result.set(entry);
          this.isLoading.set(false);
          this.addToRecent(query);
        },
        error: () => {
          this.result.set(null);
          this.isLoading.set(false);
        }
      });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.result.set(null);
    this.hasSearched.set(false);
    // Clear service state
    this.dictionary.lastQuery.set('');
    this.dictionary.lastLookup.set(null);
  }

  searchRecent(term: string): void {
    this.searchQuery = term;
    this.search();
  }

  saveWord(): void {
    const entry = this.result();
    if (!entry) return;

    const lang = this.settings.settings().language;
    this.vocab.addFromDictionary(entry, lang);
  }

  private addToRecent(term: string): void {
    this.dictionary.addToRecentSearches(term);
  }

  removeRecentSearch(term: string, event: Event): void {
    event.stopPropagation(); // Prevent triggering the search
    this.dictionary.removeRecentSearch(term);
  }

  clearAllRecentSearches(): void {
    this.dictionary.clearAllRecentSearches();
  }
}
