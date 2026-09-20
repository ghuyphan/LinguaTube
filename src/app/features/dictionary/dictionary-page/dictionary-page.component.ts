import { Component, ChangeDetectionStrategy, inject, computed, signal, OnInit, OnDestroy, viewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DictionaryPanelComponent } from '../dictionary-panel/dictionary-panel.component';
import { VocabularyListComponent } from '../../vocabulary/vocabulary-list/vocabulary-list.component';
import { DictionaryService } from '../dictionary.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { VocabularyService } from '../../vocabulary';
import { SettingsService, I18nService, AuthService } from '../../../core/services';
import { WordLevel } from '../../../models';

@Component({
  selector: 'app-dictionary-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    DictionaryPanelComponent,
    VocabularyListComponent,
    IconComponent
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
                <h2 class="panel-header__title">{{ activeTab() === 'dictionary' ? i18n.t('dictionary.title') : (i18n.t('vocab.title') || 'Từ vựng') }}</h2>
              </div>
              @if (activeTab() === 'vocab') {
                <!-- Mobile-only: Options in header -->
                <button
                  type="button"
                  class="action-icon-btn mobile-only"
                  (click)="openVocabMenu()"
                  [attr.aria-label]="i18n.t('vocab.options') || 'Options'"
                  [title]="i18n.t('vocab.options') || 'Options'">
                  <app-icon name="more-vertical" [size]="16" />
                </button>
              }
            </div>
          </div>

          <!-- Segmented View Tabs & Search Toolbar (Unified toolbar inside card, matches playlist & history) -->
          <div class="panel-toolbar">
            <div class="panel-toolbar__top">
              <div class="segmented-control" style="--tab-count: 2;" [style.--active-index]="activeTab() === 'dictionary' ? 0 : 1" role="tablist">
                <button 
                  type="button" 
                  class="segmented-control__item" 
                  [class.active]="activeTab() === 'dictionary'"
                  (click)="activeTab.set('dictionary')"
                  role="tab"
                  [attr.aria-selected]="activeTab() === 'dictionary'"
                  [attr.aria-label]="i18n.t('dictionary.search')"
                  [title]="i18n.t('dictionary.search')"
                >
                  <app-icon name="search" [size]="14" />
                  <span>{{ i18n.t('dictionary.search') }}</span>
                </button>
                <button 
                  type="button" 
                  class="segmented-control__item" 
                  [class.active]="activeTab() === 'vocab'"
                  (click)="activeTab.set('vocab')"
                  role="tab"
                  [attr.aria-selected]="activeTab() === 'vocab'"
                  [attr.aria-label]="i18n.t('vocab.title')"
                  [title]="i18n.t('vocab.title')"
                >
                  <app-icon name="layers" [size]="14" />
                  <span>{{ i18n.t('vocab.title') }}</span>
                </button>
              </div>

              <!-- Desktop-only: Inline with tabs -->
              @if (activeTab() === 'vocab') {
                <div class="panel-toolbar__actions desktop-only">
                  <button
                    type="button"
                    class="action-icon-btn"
                    (click)="openVocabMenu()"
                    [attr.aria-label]="i18n.t('vocab.options') || 'Options'"
                    [title]="i18n.t('vocab.options') || 'Options'">
                    <app-icon name="more-vertical" [size]="16" />
                  </button>
                </div>
              }
            </div>

            <!-- Row 2: Search & Filter Row (Unified across Dictionary and Vocab tabs) -->
            <div class="panel-toolbar__filters">
              @if (activeTab() === 'dictionary') {
                <div class="panel-search-wrapper">
                  <div class="app-search-box">
                    <button
                      type="button"
                      class="search-icon-btn"
                      (click)="triggerDictSearch()"
                      [disabled]="!dictSearchQuery.trim() || panel()?.isLoading()"
                      [attr.aria-label]="i18n.t('dictionary.search')"
                      [title]="i18n.t('dictionary.search')">
                      @if (panel()?.isLoading()) {
                        <app-icon name="loader" [size]="14" class="loading-spinner" />
                      } @else {
                        <app-icon name="search" [size]="14" class="search-icon" />
                      }
                    </button>
                    <input
                      type="text"
                      [(ngModel)]="dictSearchQuery"
                      (keyup.enter)="triggerDictSearch()"
                      [placeholder]="i18n.t('dictionary.typeWord')"
                      class="search-input"
                      autocomplete="off"
                      spellcheck="false"
                    />
                    @if (dictSearchQuery) {
                      <button type="button" class="clear-btn" (click)="clearDictSearch()" [attr.aria-label]="i18n.t('common.clear')">
                        <app-icon name="x" [size]="12" />
                      </button>
                    }
                  </div>
                </div>
              } @else {
                <div class="panel-search-wrapper">
                  <div class="app-search-box">
                    <app-icon name="search" [size]="14" class="search-icon" />
                    <input
                      type="text"
                      [ngModel]="vocabSearchQuery()"
                      (ngModelChange)="vocabSearchQuery.set($event)"
                      [placeholder]="i18n.t('vocab.search') || i18n.t('common.search') || 'Search...'"
                      class="search-input"
                      spellcheck="false"
                      autocomplete="off"
                    />
                    @if (vocabSearchQuery()) {
                      <button type="button" class="clear-btn" (click)="vocabSearchQuery.set('')" [attr.aria-label]="i18n.t('common.clear')">
                        <app-icon name="x" [size]="12" />
                      </button>
                    }
                  </div>
                </div>

                <div class="filter-scroll-strip">
                  <button type="button" 
                          class="filter-chip" 
                          [class.active]="selectedVocabLevel() === 'all'"
                          (click)="selectedVocabLevel.set('all')">
                      <span>{{ i18n.t('history.all') || 'All' }}</span>
                      <span class="chip-count">{{ vocabLevelCounts().all }}</span>
                  </button>
                  <button type="button" 
                          class="filter-chip" 
                          [class.active]="selectedVocabLevel() === 'new'"
                          (click)="selectedVocabLevel.set('new')">
                      <span>{{ i18n.t('vocab.new') || 'New' }}</span>
                      <span class="chip-count">{{ vocabLevelCounts().new }}</span>
                  </button>
                  <button type="button" 
                          class="filter-chip" 
                          [class.active]="selectedVocabLevel() === 'learning'"
                          (click)="selectedVocabLevel.set('learning')">
                      <span>{{ i18n.t('vocab.learning') || 'Learning' }}</span>
                      <span class="chip-count">{{ vocabLevelCounts().learning }}</span>
                  </button>
                  <button type="button" 
                          class="filter-chip" 
                          [class.active]="selectedVocabLevel() === 'known'"
                          (click)="selectedVocabLevel.set('known')">
                      <span>{{ i18n.t('vocab.known') || 'Known' }}</span>
                      <span class="chip-count">{{ vocabLevelCounts().known }}</span>
                  </button>
                  <button type="button" 
                          class="filter-chip" 
                          [class.active]="selectedVocabLevel() === 'ignored'"
                          (click)="selectedVocabLevel.set('ignored')">
                      <span>{{ i18n.t('vocab.ignored') || 'Ignored' }}</span>
                      <span class="chip-count">{{ vocabLevelCounts().ignored }}</span>
                  </button>
                </div>
              }
            </div>
          </div>

          <!-- Main View Content -->
          @if (activeTab() === 'dictionary') {
            <div class="tab-content-enter">
              <app-dictionary-panel #panel [embedded]="true" />
            </div>
          } @else {
            <div class="tab-content-enter">
              <app-vocabulary-list 
                #vocabList
                [showHeader]="false"
                [showMenu]="true"
                [embedded]="true"
                [showToolbar]="false"
                [externalSearch]="vocabSearchQuery()"
                [externalLevel]="selectedVocabLevel()"
                (wordSelect)="onVocabWordSelect($event.surface)"
                (addWordRequest)="onAddWordRequest($event)"
              />
            </div>
          }
        </div>
      </div>

      <!-- Desktop sidebar with stats & learning resources -->
      <aside class="page-layout__sidebar desktop-only">
        <!-- Study & Notebook Card: Always visible -->
        <div class="card sidebar-card">
          <div class="panel-header">
            <div class="panel-header__row">
              <div class="panel-header__left">
                <app-icon name="graduation-cap" [size]="18" class="panel-header__icon" />
                <h3 class="panel-header__title">{{ i18n.t('study.title') }}</h3>
              </div>
              <span class="badge badge--primary">{{ stats().total }} {{ i18n.t('study.cards') }}</span>
            </div>
          </div>

          <div class="stats-grid">
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
              <app-icon name="play" [size]="16" />
              <span>{{ i18n.t('study.start') }}</span>
            </a>
          } @else {
            <div class="sidebar-empty-box">
              <p class="sidebar-empty-desc">{{ i18n.t('dictionary.emptyNotebookHint') }}</p>
              <a routerLink="/video" class="btn btn-secondary btn-sm sidebar-action-btn">
                <app-icon name="video" [size]="14" />
                <span>{{ i18n.t('dictionary.exploreVideos') }}</span>
              </a>
            </div>
          }

          <!-- Sync hint for guest users -->
          @if (auth.isInitialized() && !auth.isLoggedIn()) {
            <div class="sync-hint">
              <app-icon name="cloud" [size]="16" />
              <span>{{ i18n.t('vocab.syncHint') }}</span>
            </div>
          }
        </div>

        <!-- Recent Searches Card (when searches exist) -->
        @if (recentSearches().length > 0) {
          <div class="card sidebar-card">
            <div class="panel-header">
              <div class="panel-header__row">
                <div class="panel-header__left">
                  <app-icon name="history" [size]="18" class="panel-header__icon" />
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
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .sidebar-card {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .sidebar-action-btn {
      width: 100%;
      gap: 0.5rem;
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

      @media (hover: hover) {
        &:hover {
          border-color: var(--accent-primary);
          background: var(--bg-card);
        }
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

      @media (hover: hover) {
        &:hover {
          color: var(--accent-primary);
        }
      }

      &:active {
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

      @media (hover: hover) {
        &:hover {
          background: var(--accent-primary-soft);
          color: var(--accent-primary);
        }
      }

      &:active {
        background: var(--accent-primary-soft);
        color: var(--accent-primary);
      }
    }

    .sync-hint {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-xs) var(--space-sm);
      font-size: 0.75rem;
      color: var(--text-muted);
      background: var(--bg-secondary);
      border-radius: var(--border-radius-sm);
      margin-top: var(--space-2xs);
      line-height: 1.4;

      app-icon {
        flex-shrink: 0;
        color: var(--text-secondary);
      }
    }



    /* Unified Main Panel, Toolbar & Tabs (Matches playlist-panel/toolbar & history-panel/toolbar) */
    .dict-panel {
      display: flex;
      flex-direction: column;
      overflow: visible;
      height: auto;
      min-height: 0;
    }


  `]
})
export class DictionaryPageComponent implements OnInit, OnDestroy {
  readonly panel = viewChild(DictionaryPanelComponent);
  readonly vocabList = viewChild(VocabularyListComponent);

  private vocab = inject(VocabularyService);
  private dictionary = inject(DictionaryService);
  private route = inject(ActivatedRoute);
  settings = inject(SettingsService);
  i18n = inject(I18nService);
  auth = inject(AuthService);

  activeTab = signal<'dictionary' | 'vocab'>('dictionary');
  private routeSub?: Subscription;

  dictSearchQuery = '';

  vocabSearchQuery = signal('');
  selectedVocabLevel = signal<WordLevel | 'all'>('all');

  openVocabMenu(): void {
    this.vocabList()?.openMenuSheet();
  }

  vocabLevelCounts = computed(() => {
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

  constructor() {
    effect(() => {
      const q = this.dictionary.screenQuery();
      this.dictSearchQuery = q || '';
    });
  }

  triggerDictSearch(): void {
    const q = this.dictSearchQuery.trim();
    if (!q) return;
    this.searchTerm(q);
  }

  clearDictSearch(): void {
    this.dictSearchQuery = '';
    this.panel()?.clearSearch();
  }

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
}
