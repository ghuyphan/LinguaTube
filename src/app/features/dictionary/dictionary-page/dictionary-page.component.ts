import { Component, ChangeDetectionStrategy, inject, computed, signal, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DictionaryPanelComponent } from '../dictionary-panel/dictionary-panel.component';
import { VocabularyListComponent } from '../../vocabulary/vocabulary-list/vocabulary-list.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { VocabularyService, SettingsService, I18nService, DictionaryService } from '../../../services';

@Component({
  selector: 'app-dictionary-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    DictionaryPanelComponent,
    VocabularyListComponent,
    IconComponent,
    BottomSheetComponent,
    ConfirmDialogComponent
  ],
  template: `
    <div class="page-layout">
      <div class="page-layout__main">
        <app-dictionary-panel #panel />
      </div>

      <!-- Desktop sidebar with stats -->
      <aside class="page-layout__sidebar desktop-only">
        <div class="card sidebar-card">
          <div class="panel-header">
            <div class="panel-header__row">
              <div class="panel-header__left">
                <app-icon name="graduation-cap" [size]="20" class="panel-header__icon" />
                <h3 class="panel-header__title">{{ i18n.t('vocab.title') }}</h3>
              </div>
            </div>
            <p class="panel-header__subtitle">{{ stats().total }} {{ i18n.t('study.cards') }}</p>
          </div>
          
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-value">{{ stats().total }}</span>
              <span class="stat-label">{{ i18n.t('study.cards') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value stat-new">{{ stats().new }}</span>
              <span class="stat-label">{{ i18n.t('study.new') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value stat-learning">{{ stats().learning }}</span>
              <span class="stat-label">{{ i18n.t('study.learning') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-value stat-known">{{ stats().known }}</span>
              <span class="stat-label">{{ i18n.t('study.known') }}</span>
            </div>
          </div>

          @if (stats().total > 0) {
            <a routerLink="/study" class="btn btn-primary sidebar-action-btn">
              <app-icon name="graduation-cap" [size]="16" />
              {{ i18n.t('study.start') }}
            </a>
          }
        </div>

        @if (recentSearches().length > 0) {
          <div class="card sidebar-card">
            <div class="panel-header">
              <div class="panel-header__row">
                <app-icon name="clock" [size]="18" class="panel-header__icon" />
                <h4 class="panel-header__title" style="font-size: 0.9375rem;">{{ i18n.t('dictionary.recentSearches') }}</h4>
                <button class="panel-header__link" (click)="clearAllRecentSearches()">
                  {{ i18n.t('dictionary.clearAll') }}
                </button>
              </div>
            </div>
            <div class="recent-list">
              @for (term of recentSearches(); track term) {
                <div class="recent-chip">
                  <button type="button" class="recent-term-btn" (click)="searchTerm(term)">
                    {{ term }}
                  </button>
                  <button
                    type="button"
                    class="recent-delete-btn"
                    [attr.aria-label]="i18n.t('dictionary.removeRecent') || 'Remove search term'"
                    (click)="removeRecentSearch(term, $event)">
                    <app-icon name="x" [size]="12" />
                  </button>
                </div>
              }
            </div>
          </div>
        }
      </aside>

      <!-- Mobile: vocabulary list below dictionary -->
      <div class="vocab-section mobile-only">
        <app-vocabulary-list 
          (wordSelect)="searchTerm($event.surface)"
          (deleteRequest)="onVocabDeleteRequest($event)"
          (menuRequest)="vocabMenuOpen.set(true)"
        />
      </div>

    <!-- Vocab Delete Confirmation -->
    <app-confirm-dialog [isOpen]="vocabDeleteOpen()" [title]="i18n.t('vocab.deleteWord')"
      [message]="i18n.t('vocab.deleteConfirm')" [confirmText]="i18n.t('vocab.delete')"
      [cancelText]="i18n.t('vocab.cancel')" variant="danger" icon="trash-2" (confirmed)="confirmVocabDelete()"
      (cancelled)="vocabDeleteOpen.set(false)" />

    <!-- Vocab Menu Sheet -->
    <app-bottom-sheet [isOpen]="vocabMenuOpen()" [title]="i18n.t('vocab.options') || 'Vocabulary Options'" [showCloseButton]="true" (closed)="vocabMenuOpen.set(false)">
      <div class="menu-sheet">
        <h3 class="menu-sheet__title">{{ i18n.t('vocab.options') }}</h3>
        <div class="menu-sheet__options">
          <button type="button" class="menu-option" (click)="exportVocabJSON(); vocabMenuOpen.set(false)">
            <app-icon name="download" [size]="18" />
            <span>{{ i18n.t('vocab.exportJson') }}</span>
          </button>
          <button type="button" class="menu-option" (click)="exportVocabAnki(); vocabMenuOpen.set(false)">
            <app-icon name="download" [size]="18" />
            <span>{{ i18n.t('vocab.exportAnki') }}</span>
          </button>
          <label class="menu-option">
            <app-icon name="upload" [size]="18" />
            <span>{{ i18n.t('vocab.import') }}</span>
            <input type="file" accept=".json" class="hidden-input" (change)="importVocabJSON($event); vocabMenuOpen.set(false)" />
          </label>
        </div>
      </div>
    </app-bottom-sheet>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .recent-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }

    .recent-chip {
      display: inline-flex;
      align-items: center;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 100px;
      overflow: hidden;
      transition: all var(--transition-fast);

      &:hover {
        border-color: var(--accent-primary);
        background: var(--bg-card);
      }
    }

    .recent-term-btn {
      display: inline-flex;
      align-items: center;
      padding: 0.375rem 0.375rem 0.375rem 0.75rem;
      font-size: 0.875rem;
      background: transparent;
      border: none;
      color: var(--text-primary);
      cursor: pointer;
      line-height: 1.2;
      transition: color var(--transition-fast);

      &:hover {
        color: var(--accent-primary);
      }
    }

    .recent-delete-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.375rem;
      border-radius: 50%;
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      transition: all var(--transition-fast);
      flex-shrink: 0;

      &:hover {
        background: rgba(199, 62, 58, 0.15);
        color: var(--accent-primary);
      }
    }

    .desktop-only {
      display: flex;
    }

    .mobile-only {
      display: none;
    }

    /* Hidden file input for import */
    .hidden-input {
        display: none;
    }

    /* Menu Sheet Styles */
    .menu-sheet {
        padding: var(--space-md);
    }

    .menu-sheet__title {
        font-size: var(--text-md);
        font-weight: 600;
        color: var(--text-primary);
        text-align: center;
        margin: 0 0 var(--space-md);
    }

    .menu-sheet__options {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .menu-option {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        padding: var(--space-md);
        background: transparent;
        border: none;
        border-radius: var(--border-radius);
        font-size: var(--text-base);
        color: var(--text-primary);
        cursor: pointer;
        transition: background var(--transition-fast);
    }

    @media (hover: hover) {
        .menu-option:hover:not(:disabled) {
            background: var(--bg-secondary);
        }
    }

    .menu-option app-icon {
        color: var(--text-secondary);
    }
  `]
})
export class DictionaryPageComponent implements OnInit, OnDestroy {
  @ViewChild('panel') panel?: DictionaryPanelComponent;

  private vocab = inject(VocabularyService);
  private dictionary = inject(DictionaryService);
  private route = inject(ActivatedRoute);
  settings = inject(SettingsService);
  i18n = inject(I18nService);

  private routeSub?: Subscription;

  stats = computed(() => {
    return this.vocab.getStatsByLanguage(this.settings.settings().language);
  });

  // Use shared service state for recent searches (sliced to 6 for sidebar display)
  recentSearches = computed(() => this.dictionary.recentSearches().slice(0, 6));

  ngOnInit(): void {
    this.routeSub = this.route.queryParamMap.subscribe(params => {
      const q = params.get('q');
      if (q) {
        this.searchTerm(q);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  searchTerm(term: string): void {
    const clean = term?.trim();
    if (!clean) return;

    this.dictionary.screenQuery.set(clean);
    if (this.panel) {
      this.panel.search(clean);
    }

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  removeRecentSearch(term: string, event: Event): void {
    event.stopPropagation();
    this.dictionary.removeRecentSearch(term);
  }

  clearAllRecentSearches(): void {
    this.dictionary.clearAllRecentSearches();
  }

  // Vocab State
  vocabDeleteOpen = signal(false);
  vocabDeleteId = signal<string | null>(null);
  vocabMenuOpen = signal(false);

  // Vocab Actions
  onVocabDeleteRequest(id: string): void {
    this.vocabDeleteId.set(id);
    this.vocabDeleteOpen.set(true);
  }

  confirmVocabDelete(): void {
    const id = this.vocabDeleteId();
    if (id) {
      this.vocab.deleteWord(id);
    }
    this.vocabDeleteOpen.set(false);
    this.vocabDeleteId.set(null);
  }

  exportVocabJSON(): void {
    this.vocab.exportAsFile('json');
  }

  exportVocabAnki(): void {
    this.vocab.exportAsFile('anki');
  }

  importVocabJSON(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    void this.vocab.importFromFile(file).catch(err => {
      console.error('Import failed', err);
    });
    input.value = '';
  }
}
