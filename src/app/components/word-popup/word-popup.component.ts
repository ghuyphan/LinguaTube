import { Component, inject, input, output, signal, effect, ChangeDetectionStrategy, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { DictionaryService, VocabularyService, SettingsService, TranslationService, I18nService } from '../../services';
import { Token, DictionaryEntry } from '../../models';

@Component({
  selector: 'app-word-popup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent, BottomSheetComponent],
  template: `
    <app-bottom-sheet 
      [isOpen]="isVisible()" 
      [showDragHandle]="true"
      (closed)="onSheetClosed()"
    >
      <div class="popup-content">
        <button class="popup-close" (click)="close()">
          <app-icon name="x" [size]="18" />
        </button>

        <div class="popup-header">
          <h2 class="popup-word" [class]="'text-' + settings.settings().language">
            {{ selectedWord()?.surface }}
          </h2>
          
          <div class="header-meta">
            @if (entry()?.reading) {
              <span class="popup-reading">{{ entry()?.reading }}</span>
            }
            @if (entry()?.pinyin) {
              <span class="popup-pinyin">{{ entry()?.pinyin }}</span>
            }
            @if (entry()?.romanization) {
              <span class="popup-pinyin">{{ entry()?.romanization }}</span>
            }
          </div>

          <!-- Language Target Selector (for translation) -->
          <div class="translation-controls">
            <label for="target-lang" class="sr-only">Translation Language</label>
            <select 
              id="target-lang"
              class="lang-select"
              [ngModel]="targetLang()"
              (ngModelChange)="targetLang.set($event)"
            >
              @for (lang of translation.getSupportedTargetLanguages(); track lang.code) {
                <option [value]="lang.code">{{ lang.flag }} {{ lang.name }}</option>
              }
            </select>
          </div>
        </div>

        <div class="popup-body">
          @if (dictionary.isLoading()) {
            <div class="popup-loading">
              <app-icon name="loader" [size]="20" />
              <span>{{ i18n.t('popup.lookingUp') }}</span>
            </div>
          } @else if (entry()) {
            <div class="popup-badges">
              @if (entry()?.jlptLevel) {
                <span class="badge">{{ entry()?.jlptLevel }}</span>
              }
              @if (entry()?.hskLevel) {
                <span class="badge">HSK {{ entry()?.hskLevel }}</span>
              }
              @if (entry()?.topikLevel) {
                <span class="badge">TOPIK {{ entry()?.topikLevel }}</span>
              }
            </div>

            <div class="popup-meanings">
              @for (meaning of entry()?.meanings; track $index) {
                <div class="meaning-item">
                  <span class="meaning-num">{{ $index + 1 }}</span>
                  <div class="meaning-content">
                    <div class="meaning-row">
                      <span class="meaning-text">{{ meaning.definition }}</span>
                      
                      <!-- Translate Button -->
                      <button 
                        class="translate-btn"
                        (click)="translateDefinition($index, meaning.definition)"
                        [disabled]="isTranslating($index)"
                        title="Translate to {{ targetLang() }}"
                      >
                        @if (isTranslating($index)) {
                          <app-icon name="loader" [size]="14" />
                        } @else {
                          <app-icon name="languages" [size]="14" />
                        }
                      </button>
                    </div>

                    <!-- Translated Text -->
                    @if (getTranslation($index); as translatedText) {
                      <div class="translation-result">
                        <span class="translation-flag">{{ getFlag(getTranslationLang($index)) }}</span>
                        <span>{{ translatedText }}</span>
                      </div>
                    }

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
              <p>{{ i18n.t('popup.noDictionaryEntry') }}</p>
              <p class="popup-empty-hint">{{ i18n.t('popup.saveManually') }}</p>
            </div>
          }
        </div>

        <div class="popup-footer">
          @if (isSaved()) {
              <button class="btn btn-secondary saved-btn" disabled>
              <app-icon name="check" [size]="14" />
              {{ i18n.t('popup.saved') }}
            </button>
            <select 
              class="level-select"
              [value]="vocab.getWordLevel(selectedWord()?.surface || '')"
              (change)="updateLevel($event)"
            >
              <option value="new">{{ i18n.t('vocab.new') }}</option>
              <option value="learning">{{ i18n.t('vocab.learning') }}</option>
              <option value="known">{{ i18n.t('vocab.known') }}</option>
              <option value="ignored">{{ i18n.t('vocab.ignored') }}</option>
            </select>
          } @else {
            <button class="btn btn-primary" (click)="saveWord()">
              <app-icon name="plus" [size]="14" />
              {{ i18n.t('popup.saveWord') }}
            </button>
          }
          <button class="btn btn-ghost" (click)="close()">
            {{ i18n.t('popup.close') }}
          </button>
        </div>
      </div>
    </app-bottom-sheet>
  `,
  styles: [`
    .popup-content {
      position: relative;
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

    @media (hover: hover) {
      .popup-close:hover {
        background: var(--bg-secondary);
        color: var(--text-primary);
      }
    }

    .popup-header {
      padding: var(--space-lg);
      padding-right: 48px;
      border-bottom: 1px solid var(--border-color);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .popup-word {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
      line-height: 1.2;
    }

    .header-meta {
      display: flex;
      gap: var(--space-sm);
      justify-content: center;
    }

    .popup-reading,
    .popup-pinyin {
      font-size: 1rem;
      color: var(--text-secondary);
    }

    .translation-controls {
      margin-top: var(--space-xs);
    }

    .lang-select {
      padding: 4px 8px;
      font-size: 0.75rem;
      border-radius: 12px;
      border: 1px solid var(--border-color);
      background: var(--bg-secondary);
      color: var(--text-secondary);
      cursor: pointer;
      height: auto;
      min-height: unset;
    }

    .popup-body {
      padding: var(--space-md);
      max-height: 40vh;
      overflow-y: auto;
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
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .meaning-row {
      display: flex;
      align-items: flex-start;
      gap: var(--space-xs);
    }

    .meaning-text {
      font-size: 0.9375rem;
      color: var(--text-primary);
      line-height: 1.5;
      flex: 1;
    }

    .translate-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: all var(--transition-fast);
      opacity: 0.6;
      min-height: unset;
    }

    @media (hover: hover) {
      .translate-btn:hover {
        background: var(--bg-secondary);
        color: var(--accent-primary);
        opacity: 1;
      }
    }

    .translation-result {
      font-size: 0.875rem;
      color: var(--text-primary);
      background: var(--bg-secondary);
      padding: 6px 10px;
      border-radius: 6px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
      animation: fadeIn 0.2s ease;
    }

    .translation-flag {
      font-size: 1rem;
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

    /* Mobile adjustments */
    @media (max-width: 768px) {
      .popup-header {
        padding: var(--space-sm) var(--space-md) var(--space-md);
        padding-left: 48px;
        padding-right: 48px;
      }

      .popup-word {
        font-size: 1.75rem;
      }

      .popup-footer {
        padding-bottom: calc(var(--space-md) + env(safe-area-inset-bottom, 0px));
      }

      .popup-footer .btn {
        min-height: 48px;
        font-size: 0.9375rem;
      }
    }
  `]
})
export class WordPopupComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);

  dictionary = inject(DictionaryService);
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  translation = inject(TranslationService);
  i18n = inject(I18nService);

  selectedWord = input<Token | null>(null);
  currentSentence = input<string>('');
  closed = output<void>();

  entry = signal<DictionaryEntry | null>(null);
  isVisible = signal(false);
  isSaved = signal(false);

  // Translation state
  targetLang = signal(this.getDefaultTargetLang());
  translatedDefinitions = signal<Map<number, { text: string; lang: string }>>(new Map());
  translatingIndices = signal<Set<number>>(new Set());

  private getDefaultTargetLang(): string {
    const uiLang = this.i18n.currentLanguage();
    const supported = this.translation.getSupportedTargetLanguages().map(l => l.code);
    return supported.includes(uiLang) ? uiLang : 'vi';
  }

  constructor() {
    effect(() => {
      const word = this.selectedWord();
      if (word) {
        this.isVisible.set(true);
        this.isSaved.set(this.vocab.hasWord(word.surface));
        // Reset translations when word changes
        this.translatedDefinitions.set(new Map());
        this.translatingIndices.set(new Set());
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
    const sentence = this.currentSentence();

    if (!word) return;

    if (entryData) {
      this.vocab.addFromDictionary(entryData, lang, sentence);
    } else {
      this.vocab.addWord(word.surface, '', lang, word.reading, word.pinyin, word.romanization, sentence);
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

  translateDefinition(index: number, text: string): void {
    // Skip if already translated to current target language
    const existing = this.translatedDefinitions().get(index);
    if (existing && existing.lang === this.targetLang()) return;

    this.toggleTranslating(index, true);

    const targetLang = this.targetLang();
    this.translation.translate(text, 'en', targetLang).subscribe(translatedText => {
      if (translatedText) {
        this.translatedDefinitions.update(map => {
          const newMap = new Map(map);
          newMap.set(index, { text: translatedText, lang: targetLang });
          return newMap;
        });
      }
      this.toggleTranslating(index, false);
    });
  }

  isTranslating(index: number): boolean {
    return this.translatingIndices().has(index);
  }

  toggleTranslating(index: number, state: boolean): void {
    this.translatingIndices.update(set => {
      const newSet = new Set(set);
      if (state) newSet.add(index);
      else newSet.delete(index);
      return newSet;
    });
  }

  getTranslation(index: number): string | undefined {
    return this.translatedDefinitions().get(index)?.text;
  }

  getTranslationLang(index: number): string {
    return this.translatedDefinitions().get(index)?.lang || this.targetLang();
  }

  getFlag(code: string): string {
    const lang = this.translation.getSupportedTargetLanguages().find(l => l.code === code);
    return lang ? lang.flag : '🌐';
  }

  onSheetClosed(): void {
    this.isVisible.set(false);
    this.entry.set(null);
    this.closed.emit();
  }

  close(): void {
    this.onSheetClosed();
  }

  ngOnDestroy(): void {
    // Cleanup handled by BottomSheetComponent
  }
}
