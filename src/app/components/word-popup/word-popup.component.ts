import { Component, inject, input, output, signal, effect, ChangeDetectionStrategy, ElementRef, viewChild, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { DictionaryService, VocabularyService, SettingsService, TranslationService } from '../../services';
import { Token, DictionaryEntry } from '../../models';

@Component({
  selector: 'app-word-popup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    @if (isVisible()) {
      <div class="popup-overlay" (click)="close()" [class.closing]="isClosing()">
        <div 
          class="popup" 
          #popupEl
          [class.closing]="isClosing()"
          [style.transform]="isDragging() ? 'translateY(' + dragOffset() + 'px)' : null"
          (click)="$event.stopPropagation()"
          (touchstart)="onTouchStart($event)"
          (touchmove)="onTouchMove($event)"
          (touchend)="onTouchEnd($event)"
        >
          <!-- Drag Handle for mobile -->
          <div class="popup-drag-handle">
            <div class="popup-drag-indicator"></div>
          </div>

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

          <div class="popup-body" #popupBody>
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
                            <app-icon name="loader" [size]="14" class="spin" />
                          } @else {
                            <app-icon name="languages" [size]="14" />
                          }
                        </button>
                      </div>

                      <!-- Translated Text -->
                      @if (getTranslation($index); as translatedText) {
                        <div class="translation-result">
                          <span class="translation-flag">{{ getFlag(targetLang()) }}</span>
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
      z-index: 1100; /* Above bottom nav (1000) */
      padding: var(--space-md);
      animation: fadeIn 0.15s ease forwards;
    }

    .popup-overlay.closing {
      animation: fadeOut 0.2s ease forwards;
    }

    .popup {
      background: var(--bg-card);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
      width: 100%;
      max-width: 380px; /* Tablet/Desktop width */
      max-height: 80vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
      animation: slideUp 0.2s ease;
      will-change: transform;
    }

    /* Drag handle - visible on mobile */
    .popup-drag-handle {
      display: none;
      padding: 12px 0 4px;
      cursor: grab;
      touch-action: none;
    }

    .popup-drag-indicator {
      width: 36px;
      height: 4px;
      background: var(--border-color);
      border-radius: 2px;
      margin: 0 auto;
      transition: background 0.2s;
    }

    .popup-drag-handle:active .popup-drag-indicator {
      background: var(--text-muted);
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
    }

    .popup-body {
      flex: 1;
      overflow-y: auto;
      padding: var(--space-md);
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
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
    }

    .translate-btn:hover {
      background: var(--bg-secondary);
      color: var(--accent-primary);
      opacity: 1;
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

    .spin {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      100% { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
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

    /* Mobile bottom sheet styling */
    @media (max-width: 480px) {
      .popup-overlay {
        padding: 0;
        align-items: flex-end;
      }

      .popup {
        max-width: 100%;
        width: 100%;
        margin: 0; 
        max-height: 85vh;
        border-radius: 16px 16px 0 0;
        animation: mobileSlideUp 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards;
        touch-action: none;
      }

      .popup.closing {
        animation: mobileSlideDown 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards;
      }

      /* Show drag handle on mobile */
      .popup-drag-handle {
        display: block;
      }

      .popup-close {
        top: 12px;
        right: 12px;
      }

      .popup-header {
        padding: var(--space-sm) var(--space-md) var(--space-md);
        padding-left: 48px;
        padding-right: 48px;
      }

      .popup-word {
        font-size: 1.75rem;
      }

      .popup-body {
        padding: var(--space-md);
        /* Allow scrolling inside popup body */
        touch-action: pan-y;
        overscroll-behavior: contain;
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

    @keyframes mobileSlideDown {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(100%);
      }
    }
  `]
})
export class WordPopupComponent {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  dictionary = inject(DictionaryService);
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  translation = inject(TranslationService);

  // View children
  popupEl = viewChild<ElementRef<HTMLElement>>('popupEl');
  popupBody = viewChild<ElementRef<HTMLElement>>('popupBody');

  selectedWord = input<Token | null>(null);
  currentSentence = input<string>('');  // Sentence context for sentence mining
  closed = output<void>();

  entry = signal<DictionaryEntry | null>(null);
  isVisible = signal(false);
  isSaved = signal(false);
  isClosing = signal(false);

  // Drag state for bottom sheet gesture
  isDragging = signal(false);
  dragOffset = signal(0);

  private touchStartY = 0;
  private touchCurrentY = 0;
  private isDragGesture = false;

  // Translation state
  targetLang = signal('vi'); // Default target language (can make sticky later)
  translatedDefinitions = signal<Map<number, string>>(new Map());
  translatingIndices = signal<Set<number>>(new Set());

  // Threshold for dismissing (pixels)
  private readonly DISMISS_THRESHOLD = 100;
  private readonly VELOCITY_THRESHOLD = 0.5;
  private readonly ANIMATION_DURATION = 250;

  constructor() {
    effect(() => {
      const word = this.selectedWord();
      if (word) {
        this.isVisible.set(true);
        this.isClosing.set(false);
        this.lockBodyScroll(true);

        this.isSaved.set(this.vocab.hasWord(word.surface));
        // Reset translations when word changes
        this.translatedDefinitions.set(new Map());
        this.translatingIndices.set(new Set());
        this.lookupWord(word.surface);
      } else {
        // Handle case where input signal is cleared externally
        this.isVisible.set(false);
        this.lockBodyScroll(false);
      }
    });
  }

  private lockBodyScroll(lock: boolean): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (lock) {
      this.document.body.classList.add('no-scroll');
      // Prevent touchmove on body
      this.document.body.style.setProperty('position', 'fixed');
      this.document.body.style.setProperty('width', '100%');
      this.document.body.style.setProperty('top', `-${window.scrollY}px`);
    } else {
      const scrollY = this.document.body.style.top;
      this.document.body.classList.remove('no-scroll');
      this.document.body.style.removeProperty('position');
      this.document.body.style.removeProperty('width');
      this.document.body.style.removeProperty('top');
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }

  // Touch gesture handlers for drag-to-dismiss
  onTouchStart(event: TouchEvent): void {
    const popupBody = this.popupBody()?.nativeElement;

    // Only start drag gesture if we're at the top of scroll or touching the handle area
    const isAtTop = !popupBody || popupBody.scrollTop <= 0;
    const touch = event.touches[0];

    // Check if touch is in the drag handle area (top 50px)
    const popupEl = this.popupEl()?.nativeElement;
    if (popupEl) {
      const rect = popupEl.getBoundingClientRect();
      const touchRelativeY = touch.clientY - rect.top;

      // Start drag if in handle area or at scroll top
      if (touchRelativeY < 50 || isAtTop) {
        this.touchStartY = touch.clientY;
        this.touchCurrentY = touch.clientY;
        this.isDragGesture = false; // Will be set true if they drag down
      }
    }
  }

  onTouchMove(event: TouchEvent): void {
    if (this.touchStartY === 0) return;

    const touch = event.touches[0];
    const deltaY = touch.clientY - this.touchStartY;

    // Only allow dragging down
    if (deltaY > 10) {
      this.isDragGesture = true;
      this.isDragging.set(true);

      // Apply rubber-band effect for overscroll
      const resistance = 0.5;
      this.dragOffset.set(deltaY * resistance);

      // Prevent scroll while dragging
      event.preventDefault();
    }

    this.touchCurrentY = touch.clientY;
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragGesture) {
      this.resetDragState();
      return;
    }

    const deltaY = this.touchCurrentY - this.touchStartY;
    const velocity = deltaY / (event.timeStamp - (event.timeStamp - 100)); // Approximate velocity

    // Dismiss if dragged far enough or with enough velocity
    if (deltaY > this.DISMISS_THRESHOLD || velocity > this.VELOCITY_THRESHOLD) {
      this.animatedClose();
    } else {
      // Snap back
      this.isDragging.set(false);
      this.dragOffset.set(0);
    }

    this.resetDragState();
  }

  private resetDragState(): void {
    this.touchStartY = 0;
    this.touchCurrentY = 0;
    this.isDragGesture = false;
  }

  private animatedClose(): void {
    this.isClosing.set(true);
    this.isDragging.set(false);
    this.dragOffset.set(0);

    // Wait for animation to complete
    setTimeout(() => {
      this.isVisible.set(false);
      this.isClosing.set(false);
      this.lockBodyScroll(false);
      this.entry.set(null);
      this.closed.emit();
    }, this.ANIMATION_DURATION); // Match animation duration
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
    // If already translated, do nothing (or toggle off, but let's keep it simple)
    if (this.translatedDefinitions().has(index)) return;

    this.toggleTranslating(index, true);

    this.translation.translate(text, 'en', this.targetLang()).subscribe(translatedText => {
      if (translatedText) {
        this.translatedDefinitions.update(map => {
          const newMap = new Map(map);
          newMap.set(index, translatedText);
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
    return this.translatedDefinitions().get(index);
  }

  getFlag(code: string): string {
    const lang = this.translation.getSupportedTargetLanguages().find(l => l.code === code);
    return lang ? lang.flag : '🌐';
  }

  close(): void {
    // Use animated close on mobile
    if (isPlatformBrowser(this.platformId) && window.innerWidth <= 480) {
      this.animatedClose();
    } else {
      this.isVisible.set(false);
      this.lockBodyScroll(false);
      this.entry.set(null);
      this.closed.emit();
    }
  }
}
