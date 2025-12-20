import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { DictionaryService, VocabularyService, SettingsService } from '../../services';
import { DictionaryEntry } from '../../models';

@Component({
    selector: 'app-dictionary-panel',
    standalone: true,
    imports: [CommonModule, FormsModule, IconComponent],
    template: `
    <div class="dict-panel">
      <div class="dict-header">
        <h2>Dictionary</h2>
        <p class="dict-subtitle">Look up any word without a video</p>
      </div>

      <!-- Search -->
      <div class="dict-search">
        <div class="search-box">
          <app-icon name="search" [size]="18" />
          <input 
            type="text" 
            [(ngModel)]="searchQuery"
            placeholder="Type a word..."
            class="search-input"
            (keyup.enter)="search()"
          />
          @if (searchQuery) {
            <button class="clear-btn" (click)="clearSearch()">
              <app-icon name="x" [size]="16" />
            </button>
          }
        </div>
        <button class="btn btn-primary search-btn" (click)="search()" [disabled]="!searchQuery.trim() || isLoading()">
          @if (isLoading()) {
            <app-icon name="loader" [size]="16" />
          } @else {
            Search
          }
        </button>
      </div>

      <!-- Results -->
      <div class="dict-results">
        @if (result()) {
          <div class="result-card card">
            <div class="result-header">
              <h3 class="result-word" [class]="'text-' + settings.settings().language">
                {{ result()!.word }}
              </h3>
              @if (result()!.reading) {
                <span class="result-reading">{{ result()!.reading }}</span>
              }
              @if (result()!.pinyin) {
                <span class="result-reading">{{ result()!.pinyin }}</span>
              }
            </div>

            <div class="result-badges">
              @if (result()!.jlptLevel) {
                <span class="badge">{{ result()!.jlptLevel }}</span>
              }
              @if (result()!.hskLevel) {
                <span class="badge">HSK {{ result()!.hskLevel }}</span>
              }
            </div>

            <div class="result-meanings">
              @for (meaning of result()!.meanings; track $index) {
                <div class="meaning-item">
                  <span class="meaning-num">{{ $index + 1 }}</span>
                  <div class="meaning-content">
                    <span class="meaning-text">{{ meaning.definition }}</span>
                    @if (meaning.tags && meaning.tags.length > 0) {
                      <div class="meaning-tags">
                        @for (tag of meaning.tags; track tag) {
                          <span class="tag">{{ tag }}</span>
                        }
                      </div>
                    }
                  </div>
                </div>
              }
            </div>

            <div class="result-actions">
              @if (isSaved()) {
                <button class="btn btn-secondary" disabled>
                  <app-icon name="check" [size]="14" />
                  Saved
                </button>
              } @else {
                <button class="btn btn-primary" (click)="saveWord()">
                  <app-icon name="plus" [size]="14" />
                  Save to Vocabulary
                </button>
              }
            </div>
          </div>
        } @else if (hasSearched() && !isLoading()) {
          <div class="no-results card">
            <app-icon name="info" [size]="24" />
            <p>No results found for "<strong>{{ lastQuery }}</strong>"</p>
            <p class="hint">Try a different spelling or search term</p>
          </div>
        } @else if (!hasSearched()) {
          <div class="search-prompt">
            <app-icon name="book-open" [size]="32" class="prompt-icon" />
            <p>Enter a word above to look up its meaning</p>
          </div>
        }
      </div>

      <!-- Recent searches -->
      @if (recentSearches().length > 0 && !result()) {
        <div class="dict-recent">
          <h4>Recent Searches</h4>
          <div class="recent-list">
            @for (term of recentSearches(); track term) {
              <button class="recent-item" (click)="searchRecent(term)">
                {{ term }}
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
    styles: [`
    .dict-panel {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .dict-header h2 {
      margin-bottom: var(--space-xs);
    }

    .dict-subtitle {
      font-size: 0.875rem;
      color: var(--text-muted);
    }

    .dict-search {
      display: flex;
      gap: var(--space-sm);
    }

    .search-box {
      flex: 1;
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      background: var(--bg-card);
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
      transition: all var(--transition-fast);
    }

    .search-box:focus-within {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 3px rgba(199, 62, 58, 0.1);
    }

    .search-input {
      flex: 1;
      border: none;
      background: none;
      padding: 0;
      min-height: 36px;
      font-size: 1rem;
    }

    .search-input:focus {
      box-shadow: none;
    }

    .clear-btn {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: var(--bg-secondary);
      color: var(--text-muted);
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .clear-btn:hover {
      background: var(--border-color);
      color: var(--text-primary);
    }

    .search-btn {
      min-width: 80px;
    }

    .dict-results {
      min-height: 200px;
    }

    .result-card {
      padding: var(--space-lg);
    }

    .result-header {
      margin-bottom: var(--space-sm);
    }

    .result-word {
      font-size: 2rem;
      font-weight: 600;
      line-height: 1.2;
    }

    .result-reading {
      font-size: 1rem;
      color: var(--text-secondary);
      display: block;
      margin-top: var(--space-xs);
    }

    .result-badges {
      display: flex;
      gap: var(--space-xs);
      margin-bottom: var(--space-md);
    }

    .badge {
      display: inline-flex;
      padding: 2px 8px;
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      color: var(--accent-primary);
      background: rgba(199, 62, 58, 0.1);
      border-radius: 4px;
    }

    .result-meanings {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      margin-bottom: var(--space-lg);
    }

    .meaning-item {
      display: flex;
      gap: var(--space-sm);
    }

    .meaning-num {
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6875rem;
      font-weight: 600;
      color: var(--text-muted);
      background: var(--bg-secondary);
      border-radius: 50%;
      flex-shrink: 0;
    }

    .meaning-content {
      flex: 1;
    }

    .meaning-text {
      font-size: 0.9375rem;
      color: var(--text-primary);
      line-height: 1.5;
    }

    .meaning-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: var(--space-xs);
    }

    .tag {
      font-size: 0.625rem;
      padding: 2px 6px;
      background: var(--bg-secondary);
      color: var(--text-muted);
      border-radius: 4px;
    }

    .result-actions {
      padding-top: var(--space-md);
      border-top: 1px solid var(--border-color);
    }

    .no-results {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-xl);
      text-align: center;
      color: var(--text-muted);
    }

    .no-results p {
      color: var(--text-secondary);
    }

    .hint {
      font-size: 0.8125rem;
      color: var(--text-muted) !important;
    }

    .search-prompt {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-xl);
      text-align: center;
      color: var(--text-muted);
    }

    .prompt-icon {
      opacity: 0.5;
    }

    .dict-recent {
      padding: var(--space-md);
      background: var(--bg-card);
      border-radius: var(--border-radius);
      border: 1px solid var(--border-color);
    }

    .dict-recent h4 {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      margin-bottom: var(--space-sm);
    }

    .recent-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }

    .recent-item {
      padding: 6px 12px;
      font-size: 0.875rem;
      font-family: var(--font-jp);
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .recent-item:hover {
      background: var(--bg-card);
      border-color: var(--accent-primary);
      color: var(--accent-primary);
    }

    @media (max-width: 480px) {
      .dict-search {
        flex-direction: column;
      }

      .search-btn {
        width: 100%;
      }

      .result-word {
        font-size: 1.75rem;
      }

      .result-card {
        padding: var(--space-md);
      }
    }
  `]
})
export class DictionaryPanelComponent {
    dictionary = inject(DictionaryService);
    vocab = inject(VocabularyService);
    settings = inject(SettingsService);

    searchQuery = '';
    lastQuery = '';
    result = signal<DictionaryEntry | null>(null);
    isLoading = signal(false);
    hasSearched = signal(false);
    isSaved = signal(false);
    recentSearches = signal<string[]>([]);

    constructor() {
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

        const lang = this.settings.settings().language;
        this.dictionary.lookup(query, lang).subscribe({
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
