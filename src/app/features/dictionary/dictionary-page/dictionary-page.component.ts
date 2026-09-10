import { Component, ChangeDetectionStrategy, inject, computed, signal, OnInit, OnDestroy, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DictionaryPanelComponent } from '../dictionary-panel/dictionary-panel.component';
import { VocabularyListComponent } from '../../vocabulary/vocabulary-list/vocabulary-list.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DictionaryService } from '../dictionary.service';
import { VocabularyService } from '../../vocabulary';
import { SettingsService, I18nService } from '../../../core/services';

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
        <!-- Main Dictionary & Vocabulary Panel (Unified card matching playlist-panel & history-panel) -->
        <div class="card dict-panel">
          <!-- Panel Header -->
          <div class="panel-header">
            <div class="panel-header__row">
              <div class="panel-header__left">
                <app-icon [name]="activeTab() === 'dictionary' ? 'book-open' : 'layers'" [size]="20" class="panel-header__icon" />
                <h2 class="panel-header__title">{{ activeTab() === 'dictionary' ? i18n.t('dictionary.title') : i18n.t('vocab.title') }}</h2>
              </div>
              <div class="panel-badges">
                @if (activeTab() === 'dictionary') {
                  @if (recentSearches().length > 0) {
                    <span class="badge badge--primary">{{ recentSearches().length }} {{ i18n.t('dictionary.recent') || 'gần đây' }}</span>
                  }
                } @else {
                  <span class="badge badge--primary">{{ stats().total }} {{ i18n.t('study.cards') }}</span>
                  @if (stats().known > 0) {
                    <span class="badge badge--accent">{{ stats().known }} {{ i18n.t('study.known') }}</span>
                  }
                }
              </div>
            </div>
            <p class="panel-header__subtitle">
              {{ activeTab() === 'dictionary' ? i18n.t('dictionary.subtitle') : i18n.t('study.subtitle') }}
            </p>
          </div>

          <!-- Segmented View Tabs (Unified toolbar inside card, matches playlist & history) -->
          <div class="dict-toolbar">
            <div class="view-tabs">
              <button 
                type="button" 
                class="filter-chip" 
                [class.active]="activeTab() === 'dictionary'"
                (click)="activeTab.set('dictionary')"
                [attr.aria-label]="i18n.t('dictionary.title')"
              >
                <app-icon name="book-open" [size]="14" />
                <span class="chip-text">{{ i18n.t('dictionary.title') }}</span>
              </button>
              <button 
                type="button" 
                class="filter-chip" 
                [class.active]="activeTab() === 'vocab'"
                (click)="activeTab.set('vocab')"
                [attr.aria-label]="i18n.t('vocab.title')"
              >
                <app-icon name="layers" [size]="14" />
                <span class="chip-text">{{ i18n.t('vocab.title') }}</span>
                @if (stats().total > 0) {
                  <span class="tab-badge">{{ stats().total }}</span>
                }
              </button>
            </div>
          </div>

          <!-- Main View Content -->
          @if (activeTab() === 'dictionary') {
            <app-dictionary-panel #panel [embedded]="true" />
          } @else {
            <app-vocabulary-list 
              [showHeader]="false"
              [showMenu]="true"
              [embedded]="true"
              (wordSelect)="onVocabWordSelect($event.surface)"
              (deleteRequest)="onVocabDeleteRequest($event)"
              (menuRequest)="vocabMenuOpen.set(true)"
              (addWordRequest)="onAddWordRequest($event)"
            />
          }
        </div>
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
                <div class="panel-header__left">
                  <app-icon name="clock" [size]="18" class="panel-header__icon" />
                  <h3 class="panel-header__title" style="font-size: 0.9375rem;">{{ i18n.t('dictionary.recentSearches') }}</h3>
                </div>
                <button class="panel-header__link" (click)="clearAllRecentSearches()">
                  {{ i18n.t('dictionary.clearAll') }}
                </button>
              </div>
            </div>
            <div class="recent-list">
              @for (term of recentSearches(); track term) {
                <div class="recent-chip">
                  <button type="button" class="recent-term-btn" (click)="onRecentSearchClick(term)">
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

    <!-- Vocab Delete Confirmation -->
    <app-confirm-dialog [isOpen]="vocabDeleteOpen()" [title]="i18n.t('vocab.deleteWord')"
      [message]="i18n.t('vocab.deleteConfirm')" [confirmText]="i18n.t('vocab.delete')"
      [cancelText]="i18n.t('vocab.cancel')" variant="danger" icon="trash-2" (confirmed)="confirmVocabDelete()"
      (cancelled)="vocabDeleteOpen.set(false)" />

    <!-- Vocab Menu Sheet -->
    <app-bottom-sheet [isOpen]="vocabMenuOpen()" [title]="i18n.t('vocab.options') || 'Vocabulary Options'" [showCloseButton]="true" (closed)="vocabMenuOpen.set(false)">
      <div class="menu-sheet">
        <div class="menu-sheet__header">
          <div class="menu-sheet__title-box">
            <app-icon name="book-open" [size]="20" class="menu-sheet__header-icon" />
            <h3 class="menu-sheet__title">{{ i18n.t('vocab.options') }}</h3>
          </div>
        </div>
        <div class="menu-sheet__card">
          <div class="menu-sheet__options">
            <button type="button" class="menu-option" (click)="exportVocabJSON(); vocabMenuOpen.set(false)">
              <div class="menu-option__icon-box">
                <app-icon name="download" [size]="18" />
              </div>
              <span class="menu-option__label">{{ i18n.t('vocab.exportJson') }}</span>
            </button>
            <div class="menu-divider"></div>
            <button type="button" class="menu-option" (click)="exportVocabAnki(); vocabMenuOpen.set(false)">
              <div class="menu-option__icon-box">
                <app-icon name="download" [size]="18" />
              </div>
              <span class="menu-option__label">{{ i18n.t('vocab.exportAnki') }}</span>
            </button>
            <div class="menu-divider"></div>
            <label class="menu-option">
              <div class="menu-option__icon-box">
                <app-icon name="upload" [size]="18" />
              </div>
              <span class="menu-option__label">{{ i18n.t('vocab.import') }}</span>
              <input type="file" accept=".json" class="hidden-input" (change)="importVocabJSON($event); vocabMenuOpen.set(false)" />
            </label>
          </div>
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
        background: var(--accent-primary-soft);
        color: var(--accent-primary);
      }
    }

    /* Hidden file input for import */
    .hidden-input {
        display: none;
    }

    /* Menu Sheet Styles */
    .menu-sheet {
        padding: var(--space-md) var(--space-md) calc(var(--space-lg) + env(safe-area-inset-bottom, 0px));
        max-width: 440px;
        margin: 0 auto;
    }

    .menu-sheet__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-md);
        padding-bottom: var(--space-xs);
        padding-right: 2.5rem; /* clearance for sheet-close-btn */
    }

    .menu-sheet__title-box {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .menu-sheet__header-icon {
        color: var(--accent-primary);
    }

    .menu-sheet__title {
        font-size: 1.125rem;
        font-weight: 800;
        color: var(--text-primary);
        margin: 0;
        letter-spacing: -0.01em;
    }

    .menu-sheet__card {
        background: var(--bg-surface);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-lg);
        overflow: hidden;
    }

    .menu-sheet__options {
        display: flex;
        flex-direction: column;
    }

    .menu-option {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        padding: 12px 16px;
        min-height: 52px;
        background: transparent;
        border: none;
        border-radius: 0;
        font-size: 0.9375rem;
        font-weight: 600;
        color: var(--text-primary);
        cursor: pointer;
        transition: background-color var(--transition-fast), transform var(--transition-fast);
        text-align: left;
        width: 100%;
        user-select: none;
    }

    @media (hover: hover) {
        .menu-option:hover:not(:disabled) {
            background: var(--bg-hover);
        }
    }

    .menu-option:active:not(:disabled) {
        background: var(--bg-secondary);
    }

    .menu-option__icon-box {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: var(--border-radius-md);
        background: var(--bg-hover);
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all var(--transition-fast);
    }

    .menu-option__label {
        flex: 1;
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .menu-divider {
        height: 1px;
        background: var(--border-color);
        margin: 0 16px;
    }

    /* Unified Main Panel, Toolbar & Tabs (Matches playlist-panel/toolbar & history-panel/toolbar) */
    .dict-panel {
      display: flex;
      flex-direction: column;
      overflow: visible;
      height: auto;
      min-height: 0;
    }

    .dict-toolbar {
      position: sticky;
      top: 0;
      z-index: var(--z-sticky, 100);
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding: var(--space-xs) 0;
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-sm);
    }

    .view-tabs {
      display: flex;
      align-items: center;
      gap: 6px;

      .tab-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 1px 6px;
        border-radius: var(--border-radius-pill);
        font-size: 0.6875rem;
        font-weight: 700;
        background: var(--bg-secondary);
        color: var(--text-muted);
        line-height: 1;
        margin-left: 2px;
      }

      .filter-chip.active .tab-badge {
        background: rgba(var(--accent-primary-rgb), 0.2);
        color: var(--accent-primary);
      }
    }

    @media (max-width: 768px) {
        .dict-toolbar {
            width: 100%;
            padding: 0 0 var(--space-xs);

            .view-tabs {
                width: 100%;
                display: flex;
                gap: 6px;

                .filter-chip {
                    flex: 1 1 0px;
                    min-width: 0;
                    justify-content: center;
                    padding: 0 10px;
                }
            }
        }

        .menu-sheet {
            padding: var(--space-sm) var(--space-sm) calc(var(--space-md) + env(safe-area-inset-bottom, 0px));
        }

        .menu-action-btn {
            padding: 12px 14px;
            min-height: 52px;
        }
    }
  `]
})
export class DictionaryPageComponent implements OnInit, OnDestroy {
  readonly panel = viewChild(DictionaryPanelComponent);

  private vocab = inject(VocabularyService);
  private dictionary = inject(DictionaryService);
  private route = inject(ActivatedRoute);
  settings = inject(SettingsService);
  i18n = inject(I18nService);

  activeTab = signal<'dictionary' | 'vocab'>('dictionary');
  private routeSub?: Subscription;

  stats = computed(() => {
    return this.vocab.getStatsByLanguage(this.settings.settings().language);
  });

  // Use shared service state for recent searches (sliced to 6 for sidebar display)
  recentSearches = computed(() => this.dictionary.recentSearches().slice(0, 6));

  ngOnInit(): void {
    this.routeSub = this.route.queryParamMap.subscribe(params => {
      const tab = params.get('tab');
      if (tab === 'vocab' || tab === 'vocabulary') {
        this.activeTab.set('vocab');
      }

      const q = params.get('q');
      if (q) {
        this.activeTab.set('dictionary');
        this.searchTerm(q);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  onVocabWordSelect(word: string): void {
    this.activeTab.set('dictionary');
    this.searchTerm(word);
  }

  onRecentSearchClick(term: string): void {
    this.activeTab.set('dictionary');
    this.searchTerm(term);
  }

  searchTerm(term: string): void {
    const clean = term?.trim();
    if (!clean) return;

    this.dictionary.screenQuery.set(clean);
    this.dictionary.screenEntries.set([]);

    const p = this.panel();
    if (p) {
      p.search(clean);
    } else {
      setTimeout(() => {
        this.panel()?.search(clean);
      }, 50);
    }

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  removeRecentSearch(term: string, event: Event): void {
    event.stopPropagation();
    this.dictionary.removeRecentSearch(term, this.settings.settings().language);
  }

  clearAllRecentSearches(): void {
    this.dictionary.clearAllRecentSearches(this.settings.settings().language);
  }

  onAddWordRequest(query?: string | void): void {
    this.activeTab.set('dictionary');
    if (query && typeof query === 'string') {
      const clean = query.trim();
      if (!clean) return;
      const p = this.panel();
      if (p) {
        p.search(clean);
      } else {
        setTimeout(() => {
          this.panel()?.search(clean);
        }, 50);
      }
    }
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
