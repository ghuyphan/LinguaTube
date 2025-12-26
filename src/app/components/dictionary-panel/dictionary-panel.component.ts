import { Component, inject, signal, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { DictionaryService, VocabularyService, SettingsService, I18nService } from '../../services';
import { DictionaryEntry } from '../../models';

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
  isSaved = signal(false);
  recentSearches = signal<string[]>([]);

  constructor() {
    // Init from service state (persistence)
    this.searchQuery = this.dictionary.lastQuery();
    this.result.set(this.dictionary.lastLookup());

    if (this.searchQuery && this.result()) {
      this.hasSearched.set(true);
      this.lastQuery = this.searchQuery;
      this.isSaved.set(this.vocab.hasWord(this.result()!.word));
    }

    // Load recent searches from localStorage
    const saved = localStorage.getItem('linguatube-recent-searches');
    if (saved) {
      try {
        this.recentSearches.set(JSON.parse(saved));
      } catch { }
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
          this.isSaved.set(entry ? this.vocab.hasWord(entry.word) : false);
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
    this.isSaved.set(true);
  }

  private addToRecent(term: string): void {
    const current = this.recentSearches();
    const updated = [term, ...current.filter(t => t !== term)].slice(0, 10);
    this.recentSearches.set(updated);
    localStorage.setItem('linguatube-recent-searches', JSON.stringify(updated));
  }
}
