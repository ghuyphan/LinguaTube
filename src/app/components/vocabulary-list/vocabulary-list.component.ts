import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { VocabularyService, SettingsService } from '../../services';
import { VocabularyItem, WordLevel } from '../../models';

@Component({
  selector: 'app-vocabulary-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="vocab-panel">
      <div class="vocab-header">
        <h2 class="vocab-title">Vocabulary</h2>
        <div class="vocab-badges">
          <span class="badge badge--new">{{ vocab.getStatsByLanguage(settings.settings().language).new }} new</span>
          <span class="badge badge--learning">{{ vocab.getStatsByLanguage(settings.settings().language).learning }} learning</span>
          <span class="badge badge--known">{{ vocab.getStatsByLanguage(settings.settings().language).known }} known</span>
        </div>
      </div>

      <!-- Filters -->
      <div class="vocab-filters">
        <div class="search-wrapper">
          <app-icon name="search" [size]="16" class="search-icon" />
          <input
            type="text"
            class="search-input"
            placeholder="Search..."
            [(ngModel)]="searchQuery"
          />
        </div>
        <select class="filter-select" [(ngModel)]="levelFilter">
          <option value="all">All Levels</option>
          <option value="new">New</option>
          <option value="learning">Learning</option>
          <option value="known">Known</option>
          <option value="ignored">Ignored</option>
        </select>
      </div>

      <!-- Word list -->
      <div class="word-list">
        @if (filteredWords().length === 0) {
          <div class="empty-state">
            @if (vocab.vocabulary().length === 0) {
              <app-icon name="book-open" [size]="32" class="empty-icon" />
              <p class="empty-title">No words saved yet</p>
              <p class="empty-hint">Click on words in subtitles to save them</p>
            } @else {
              <app-icon name="search" [size]="24" class="empty-icon" />
              <p class="empty-title">No matches found</p>
            }
          </div>
        } @else {
          @for (item of filteredWords(); track item.id) {
            <div class="word-card" [class]="'word-card--' + item.level">
              <div class="word-card-main">
                <span class="word-text" [class]="'text-' + item.language">
                  {{ item.word }}
                </span>
                @if (item.reading) {
                  <span class="word-reading">{{ item.reading }}</span>
                }
                @if (item.pinyin) {
                  <span class="word-reading">{{ item.pinyin }}</span>
                }
              </div>
              
              <p class="word-meaning">{{ item.meaning || '(no definition)' }}</p>
              
              <div class="word-card-footer">
                <select 
                  class="level-select-mini"
                  [value]="item.level"
                  (change)="updateLevel(item.id, $event)"
                >
                  <option value="new">New</option>
                  <option value="learning">Learning</option>
                  <option value="known">Known</option>
                  <option value="ignored">Ignored</option>
                </select>
                <span class="word-date">{{ formatDate(item.addedAt) }}</span>
                <button 
                  class="btn btn-icon btn-ghost delete-btn"
                  (click)="deleteWord(item.id)"
                  title="Delete"
                >
                  <app-icon name="trash-2" [size]="14" />
                </button>
              </div>
            </div>
          }
        }
      </div>

      <!-- Actions -->
      <div class="vocab-actions">
        <button class="btn btn-sm btn-secondary" (click)="exportJSON()">
          <app-icon name="download" [size]="14" />
          JSON
        </button>
        <button class="btn btn-sm btn-secondary" (click)="exportAnki()">
          <app-icon name="download" [size]="14" />
          Anki
        </button>
        <label class="btn btn-sm btn-ghost import-btn">
          <app-icon name="upload" [size]="14" />
          Import
          <input 
            type="file" 
            accept=".json"
            class="hidden-input"
            (change)="importJSON($event)"
          />
        </label>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    @if (deleteModalVisible()) {
      <div class="modal-overlay" (click)="cancelDelete()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <app-icon name="trash-2" [size]="24" class="modal-icon" />
            <h3 class="modal-title">Delete Word</h3>
          </div>
          <p class="modal-message">Are you sure you want to delete this word? This action cannot be undone.</p>
          <div class="modal-actions">
            <button class="btn btn-secondary" (click)="cancelDelete()">Cancel</button>
            <button class="btn btn-danger" (click)="confirmDelete()">Delete</button>
          </div>
        </div>
      </div>
    }

    <!-- Toast Notification -->
    @if (toastMessage()) {
      <div class="toast" [class.toast--error]="toastType() === 'error'">
        <app-icon [name]="toastType() === 'error' ? 'alert-circle' : 'check'" [size]="18" />
        <span>{{ toastMessage() }}</span>
      </div>
    }
  `,
  styles: [`
    .vocab-panel {
      background: var(--bg-card);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      height: 100%;
      max-height: calc(100vh - 140px);
    }

    .vocab-header {
      padding: var(--space-md);
      border-bottom: 1px solid var(--border-color);
    }

    .vocab-title {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: var(--space-sm);
    }

    .vocab-badges {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }

    .vocab-filters {
      display: flex;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      border-bottom: 1px solid var(--border-color);
    }

    .search-wrapper {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
      min-width: 0;
    }

    .search-icon {
      position: absolute;
      left: 10px;
      color: var(--text-muted);
      pointer-events: none;
    }

    .search-input {
      padding-left: 32px;
      height: 36px;
      font-size: 0.8125rem;
    }

    .filter-select {
      width: auto;
      min-width: 100px;
      height: 36px;
      font-size: 0.8125rem;
      padding: 0 28px 0 10px;
      flex-shrink: 0;
    }

    .word-list {
      flex: 1;
      overflow-y: auto;
      padding: var(--space-sm);
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-xl);
      text-align: center;
      min-height: 200px;
    }

    .empty-icon {
      color: var(--text-muted);
      opacity: 0.4;
      margin-bottom: var(--space-sm);
    }

    .empty-title {
      font-weight: 500;
      color: var(--text-secondary);
      margin-bottom: var(--space-xs);
    }

    .empty-hint {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    .word-card {
      padding: var(--space-sm) var(--space-md);
      border-radius: var(--border-radius);
      margin-bottom: var(--space-xs);
      border-left: 3px solid transparent;
      background: var(--bg-secondary);
      transition: all var(--transition-fast);
    }

    .word-card:hover {
      background: var(--bg-card);
      box-shadow: var(--shadow-sm);
    }

    .word-card--new {
      border-left-color: var(--error);
    }

    .word-card--learning {
      border-left-color: var(--warning);
    }

    .word-card--known {
      border-left-color: var(--success);
    }

    .word-card--ignored {
      opacity: 0.5;
    }

    .word-card-main {
      display: flex;
      align-items: baseline;
      gap: var(--space-sm);
      margin-bottom: 2px;
      flex-wrap: wrap;
    }

    .word-text {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .word-reading {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    .word-meaning {
      font-size: 0.8125rem;
      color: var(--text-secondary);
      margin-bottom: var(--space-sm);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .word-card-footer {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .level-select-mini {
      font-size: 0.6875rem;
      padding: 2px 20px 2px 6px;
      height: 24px;
      border-radius: 4px;
      background-position: right 4px center;
      min-width: 70px;
    }

    .word-date {
      font-size: 0.6875rem;
      color: var(--text-muted);
      flex: 1;
    }

    .delete-btn {
      width: 28px;
      height: 28px;
      opacity: 0.4;
    }

    .delete-btn:hover {
      opacity: 1;
      color: var(--error);
    }

    .vocab-actions {
      display: flex;
      gap: var(--space-xs);
      padding: var(--space-sm) var(--space-md);
      border-top: 1px solid var(--border-color);
    }

    .vocab-actions .btn {
      flex: 1;
    }

    .import-btn {
      cursor: pointer;
    }

    .hidden-input {
      display: none;
    }

    @media (max-width: 1024px) {
      .vocab-panel {
        max-height: 400px;
      }
    }

    @media (max-width: 768px) {
      .vocab-panel {
        max-height: none;
        /* Keep card styling on mobile */
        border-radius: var(--border-radius-lg);
        border: 1px solid var(--border-color);
        background: var(--bg-card);
        margin-bottom: var(--space-xl);
      }

      .vocab-header {
        /* Remove extra bottom margin on header */
        margin-bottom: 0;
        border-bottom: 1px solid var(--border-color);
        border-top-left-radius: var(--border-radius-lg);
        border-top-right-radius: var(--border-radius-lg);
      }

      .vocab-filters {
        /* Integrate filters into the card */
        background: var(--bg-card);
        border-radius: 0;
        margin-bottom: 0;
        border: none;
        border-bottom: 1px solid var(--border-color);
      }

      .word-list {
        max-height: none;
        padding: 0;
        overflow: visible;
      }
      
      /* Flattened list style for mobile */
      .word-card {
        background: transparent;
        border: none;
        box-shadow: none;
        margin: 0;
        padding: var(--space-md);
        border-bottom: 1px solid var(--border-color);
        border-left: none;
        border-radius: 0;
      }

      .word-card:last-child {
        border-bottom: none;
      }
    }

    @media (max-width: 480px) {
      .vocab-header {
        padding: var(--space-sm) var(--space-md);
      }

      .vocab-badges {
        gap: 4px;
      }

      .badge {
        font-size: 0.625rem;
        padding: 1px 6px;
      }

      .vocab-filters {
        padding: var(--space-sm);
      }

      .search-input {
        font-size: 16px; /* Prevents zoom on iOS */
      }

      .word-card {
        padding: var(--space-md);
      }

      .word-text {
        font-size: 1.25rem;
      }

      .word-meaning {
        -webkit-line-clamp: 3;
      }

      .level-select-mini {
        min-height: 36px;
        padding: 4px 24px 4px 8px;
      }

      .delete-btn {
        width: 36px;
        height: 36px;
      }

      .vocab-actions {
        gap: var(--space-sm);
        padding: var(--space-md);
      }

      .vocab-actions .btn {
        min-height: 44px;
      }
    }

    /* Modal styles */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: var(--space-md);
      animation: fadeIn 0.15s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { 
        opacity: 0;
        transform: translateY(16px) scale(0.96);
      }
      to { 
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .modal {
      background: var(--bg-card);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-lg);
      padding: var(--space-lg);
      max-width: 360px;
      width: 100%;
      animation: slideUp 0.2s ease-out;
    }

    .modal-header {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-sm);
    }

    .modal-icon {
      color: var(--error);
    }

    .modal-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .modal-message {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: var(--space-lg);
    }

    .modal-actions {
      display: flex;
      gap: var(--space-sm);
      justify-content: flex-end;
    }

    .modal-actions .btn {
      min-width: 80px;
    }

    .btn-danger {
      background: var(--error);
      color: white;
      border: none;
    }

    .btn-danger:hover {
      background: #b32d29;
    }

    /* Toast Notification */
    .toast {
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      background: var(--success);
      color: white;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      z-index: 1001;
      animation: toastIn 0.3s ease-out;
    }

    .toast--error {
      background: var(--error);
    }

    @keyframes toastIn {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `]
})
export class VocabularyListComponent {
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);

  searchQuery = '';
  levelFilter: WordLevel | 'all' = 'all';

  // Delete modal state
  deleteModalVisible = signal(false);
  private pendingDeleteId: string | null = null;

  // Toast notification state
  toastMessage = signal<string | null>(null);
  toastType = signal<'success' | 'error'>('success');
  private toastTimeout: any = null;

  filteredWords = computed(() => {
    let items = this.vocab.vocabulary();

    // Filter by current language
    const currentLang = this.settings.settings().language;
    items = items.filter(item => item.language === currentLang);

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      items = items.filter(item =>
        item.word.toLowerCase().includes(query) ||
        item.meaning.toLowerCase().includes(query) ||
        item.reading?.toLowerCase().includes(query) ||
        item.pinyin?.toLowerCase().includes(query)
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

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
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
