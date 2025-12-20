import { Component, inject, input, output, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { DictionaryService, VocabularyService, SettingsService } from '../../services';
import { Token, DictionaryEntry } from '../../models';

@Component({
  selector: 'app-word-popup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  template: `
    @if (isVisible()) {
      <div class="popup-overlay" (click)="close()">
        <div class="popup" (click)="$event.stopPropagation()">
          <button class="popup-close" (click)="close()">
            <app-icon name="x" [size]="18" />
          </button>

          <div class="popup-header">
            <h2 class="popup-word" [class]="'text-' + settings.settings().language">
              {{ selectedWord()?.surface }}
            </h2>
            @if (entry()?.reading) {
              <span class="popup-reading">{{ entry()?.reading }}</span>
            }
            @if (entry()?.pinyin) {
              <span class="popup-pinyin">{{ entry()?.pinyin }}</span>
            }
          </div>

          <div class="popup-body">
            @if (dictionary.isLoading()) {
              <div class="popup-loading">
                <app-icon name="loader" [size]="20" />
                <span>Looking up...</span>
              </div>
            } @else if (entry()) {
              <div class="popup-badges">
                @if (entry()?.jlptLevel) {
                  <span class="badge">{{ entry()?.jlptLevel }}</span>
                }
                @if (entry()?.hskLevel) {
                  <span class="badge">HSK {{ entry()?.hskLevel }}</span>
                }
              </div>

              <div class="popup-meanings">
                @for (meaning of entry()?.meanings; track $index) {
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
            } @else {
              <div class="popup-empty">
                <app-icon name="info" [size]="20" />
                <p>No dictionary entry found</p>
                <p class="popup-empty-hint">You can still save this word manually</p>
              </div>
            }
          </div>

          <div class="popup-footer">
            @if (isSaved()) {
              <button class="btn btn-secondary saved-btn" disabled>
                <app-icon name="check" [size]="14" />
                Saved
              </button>
              <select 
                class="level-select"
                [value]="vocab.getWordLevel(selectedWord()?.surface || '')"
                (change)="updateLevel($event)"
              >
                <option value="new">New</option>
                <option value="learning">Learning</option>
                <option value="known">Known</option>
                <option value="ignored">Ignored</option>
              </select>
            } @else {
              <button class="btn btn-primary" (click)="saveWord()">
                <app-icon name="plus" [size]="14" />
                Save Word
              </button>
            }
            <button class="btn btn-ghost" (click)="close()">
              Close
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .popup-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: var(--space-md);
      animation: fadeIn 0.15s ease;
    }

    .popup {
      background: var(--bg-card);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
      width: 100%;
      max-width: 380px;
      max-height: 80vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
      animation: slideUp 0.2s ease;
    }

    .popup-close {
      position: absolute;
      top: var(--space-sm);
      right: var(--space-sm);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: none;
      color: var(--text-muted);
      cursor: pointer;
      border-radius: var(--border-radius);
      transition: all var(--transition-fast);
      z-index: 1;
    }

    .popup-close:hover {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    .popup-header {
      padding: var(--space-lg);
      padding-right: 48px;
      border-bottom: 1px solid var(--border-color);
      text-align: center;
    }

    .popup-word {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 4px;
      line-height: 1.2;
    }

    .popup-reading,
    .popup-pinyin {
      font-size: 1rem;
      color: var(--text-secondary);
    }

    .popup-body {
      flex: 1;
      overflow-y: auto;
      padding: var(--space-md);
    }

    .popup-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-xl);
      color: var(--text-muted);
    }

    .popup-badges {
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

    .popup-meanings {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
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

    .popup-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-lg);
      text-align: center;
      color: var(--text-muted);
    }

    .popup-empty p {
      color: var(--text-secondary);
    }

    .popup-empty-hint {
      font-size: 0.8125rem;
      color: var(--text-muted) !important;
    }

    .popup-footer {
      display: flex;
      gap: var(--space-sm);
      padding: var(--space-md);
      border-top: 1px solid var(--border-color);
    }

    .popup-footer .btn {
      flex: 1;
    }

    .saved-btn {
      color: var(--success) !important;
    }

    .level-select {
      flex: 1;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(16px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* Mobile full-screen modal */
    @media (max-width: 480px) {
      .popup-overlay {
        padding: 0;
        align-items: flex-end;
      }

      .popup {
        max-width: 100%;
        max-height: 90vh;
        border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
        animation: mobileSlideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1);
      }

      .popup-header {
        padding: var(--space-md);
        padding-top: var(--space-lg);
      }

      .popup-word {
        font-size: 1.75rem;
      }

      .popup-body {
        padding: var(--space-md);
      }

      .popup-footer {
        padding: var(--space-md);
        padding-bottom: calc(var(--space-md) + env(safe-area-inset-bottom, 0px));
      }

      .popup-footer .btn {
        min-height: 48px;
        font-size: 0.9375rem;
      }
    }

    @keyframes mobileSlideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
  `]
})
export class WordPopupComponent {
  dictionary = inject(DictionaryService);
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);

  selectedWord = input<Token | null>(null);
  closed = output<void>();

  entry = signal<DictionaryEntry | null>(null);
  isVisible = signal(false);
  isSaved = signal(false);

  constructor() {
    effect(() => {
      const word = this.selectedWord();
      if (word) {
        this.isVisible.set(true);
        this.isSaved.set(this.vocab.hasWord(word.surface));
        this.lookupWord(word.surface);
      }
    });
  }

  lookupWord(word: string): void {
    const lang = this.settings.settings().language;
    this.dictionary.lookup(word, lang).subscribe(result => {
      this.entry.set(result);
    });
  }

  saveWord(): void {
    const word = this.selectedWord();
    const entryData = this.entry();
    const lang = this.settings.settings().language;

    if (!word) return;

    if (entryData) {
      this.vocab.addFromDictionary(entryData, lang);
    } else {
      this.vocab.addWord(word.surface, '', lang);
    }

    this.isSaved.set(true);
  }

  updateLevel(event: Event): void {
    const word = this.selectedWord();
    if (!word) return;

    const select = event.target as HTMLSelectElement;
    const level = select.value as 'new' | 'learning' | 'known' | 'ignored';
    const item = this.vocab.findWord(word.surface);

    if (item) {
      this.vocab.updateLevel(item.id, level);
    }
  }

  close(): void {
    this.isVisible.set(false);
    this.entry.set(null);
    this.closed.emit();
  }
}
