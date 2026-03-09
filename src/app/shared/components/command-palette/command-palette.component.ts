import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  inject,
  ElementRef,
  viewChild,
  effect,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { I18nService } from '../../../services';

@Component({
  selector: 'app-command-palette',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    @if (isOpen()) {
    <div 
      class="palette-overlay" 
      [class.closing]="isClosing()"
      (click)="onBackdropClick($event)"
      (keydown.escape)="close()"
    >
      <div class="palette" [class.closing]="isClosing()" (click)="$event.stopPropagation()">
        <div class="palette__header">
          <div class="palette__input-wrapper">
            <button class="palette__back-btn" (click)="close()" type="button">
              <app-icon name="chevron-left" [size]="24" />
            </button>
            <app-icon name="play-circle" [size]="20" class="palette__icon" />
            <input
              #urlInput
              type="url"
              class="palette__input"
              [placeholder]="i18n.t('commandPalette.placeholder')"
              [(ngModel)]="url"
              (keydown.enter)="submit()"
              (keydown.escape)="close()"
              autocomplete="off"
              spellcheck="false"
            />
            @if (url()) {
            <button class="palette__clear" (click)="clearInput()" type="button">
              <app-icon name="x" [size]="16" />
            </button>
            <button class="palette__submit-btn" (click)="submit()" type="button">
              <app-icon name="arrow-right" [size]="24" />
            </button>
            }
          </div>
        </div>
        
        @if (error()) {
        <div class="palette__error">
          <app-icon name="alert-circle" [size]="16" />
          <span>{{ error() }}</span>
        </div>
        }
        
        <div class="palette__footer">
          <div class="palette__hint">
            <kbd>Enter</kbd> {{ i18n.t('commandPalette.toLoad') }}
            <span class="palette__hint-divider">·</span>
            <kbd>Esc</kbd> {{ i18n.t('commandPalette.toClose') }}
          </div>
        </div>
      </div>
    </div>
    }
  `,
  styles: [`
    .palette-overlay {
      position: fixed;
      inset: 0;
      z-index: var(--z-modal);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 18vh;
      background: rgba(0, 0, 0, 0.4);
      animation: overlayFadeIn 0.18s ease-out forwards;
      cursor: pointer; /* Indicate clickable backdrop */
    }

    .palette-overlay.closing {
      animation: overlayFadeOut 0.12s ease-in forwards;
    }

    .palette {
      width: 100%;
      max-width: 560px;
      background: var(--bg-card);
      border-radius: 12px;
      box-shadow: 
        0 0 0 1px rgba(0, 0, 0, 0.08),
        0 20px 60px -10px rgba(0, 0, 0, 0.35),
        0 10px 25px -5px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      animation: spotlightOpen 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      cursor: default; /* Reset cursor for the palette itself */
    }

    .palette.closing {
      animation: spotlightClose 0.12s cubic-bezier(0.4, 0, 1, 1) forwards;
    }

    .palette__header {
      padding: 0;
    }

    .palette__input-wrapper {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      background: transparent;
      padding: 0 var(--space-md);
      height: 60px;
      border-bottom: 1px solid var(--border-color);
    }

    .palette__input-wrapper:focus-within {
      /* No change on focus */
    }

    .palette__icon {
      color: var(--text-muted);
      flex-shrink: 0;
    }

    .palette__input {
      flex: 1;
      height: 100%;
      border: none;
      background: transparent;
      font-size: 1.125rem;
      color: var(--text-primary);
      outline: none;
      padding: 0;
    }

    .palette__input:focus {
      border: none;
      box-shadow: none;
    }

    .palette__input::placeholder {
      color: var(--text-muted);
    }

    .palette__clear {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      min-width: 28px;
      min-height: 28px;
      padding: 0;
      border: none;
      background: var(--bg-tertiary);
      border-radius: 50%;
      color: var(--text-muted);
      cursor: pointer;
      transition: all var(--transition-fast);
      flex-shrink: 0;
    }

    .palette__back-btn,
    .palette__submit-btn {
      display: none; /* Hidden on desktop */
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      background: transparent;
      color: var(--text-primary);
      cursor: pointer;
      border-radius: 50%;
      flex-shrink: 0;
      transition: background-color 0.2s;
    }

    .palette__submit-btn {
      color: var(--accent-primary);
      background: rgba(var(--accent-primary-rgb), 0.1);
    }

    @media (hover: hover) {
      .palette__clear:hover {
        background: var(--bg-card);
        color: var(--text-primary);
      }
    }

    .palette__error {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      padding: var(--space-sm) var(--space-md);
      margin: 0 var(--space-md);
      background: rgba(var(--error-rgb), 0.1);
      color: var(--error);
      border-radius: var(--border-radius-sm);
      font-size: var(--text-sm);
    }

    .palette__footer {
      padding: var(--space-sm) var(--space-md);
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);
    }

    .palette__hint {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      font-size: var(--text-xs);
      color: var(--text-muted);
    }

    .palette__hint kbd {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      padding: 0 var(--space-xs);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-size: 0.6875rem;
      font-family: var(--font-mono);
    }

    .palette__hint-divider {
      margin: 0 var(--space-xs);
    }

    /* Mobile adjustments */
    @media (max-width: 768px) {
      .palette-overlay {
        padding: 0;
        padding-top: 0;
        background: var(--bg-body);
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        align-items: stretch; /* Full height */
        cursor: default;
        animation: none;
      }

      .palette {
        max-width: 100%;
        height: var(--app-height, 100dvh);
        border-radius: 0;
        box-shadow: none;
        display: flex;
        flex-direction: column;
        animation: slideUpMobile 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      
      .palette.closing {
        animation: slideDownMobile 0.2s ease-in forwards;
      }

      .palette__input-wrapper {
        height: 64px;
        padding: 0 var(--space-sm);
        gap: var(--space-xs);
      }

      .palette__icon {
        display: none; /* Hide play circle on mobile */
      }

      .palette__back-btn,
      .palette__submit-btn {
        display: flex;
      }

      .palette__back-btn:active,
      .palette__submit-btn:active {
        background: var(--bg-secondary);
      }

      .palette__footer {
        display: none;
      }
      
      .palette__clear {
        display: none; /* Hide clear button if we have submit, or keep it? Plan didn't specify hiding clear, but submit is key. Let's keep clear if space permits, but typically mobile search has clear. I'll keep it but maybe adjust visibility. User said "use all button as icon button". */
        /* Actually, let's keep clear button visible but maybe smaller or different? */
        /* For now let's just make sure it doesn't conflict. */
        margin-right: var(--space-xs);
      }
    }

    /* Desktop Spotlight-like animations */
    @keyframes overlayFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes overlayFadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes spotlightOpen {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(-8px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    @keyframes spotlightClose {
      from {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
      to {
        opacity: 0;
        transform: scale(0.96) translateY(-6px);
      }
    }

    /* Mobile specific animations */
    @keyframes slideUpMobile {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideDownMobile {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(20px);
      }
    }
  `]
})
export class CommandPaletteComponent {
  private platformId = inject(PLATFORM_ID);
  submitted = output<string>();
  i18n = inject(I18nService);
  isOpen = input<boolean>(false);
  closed = output<void>();

  url = signal('');
  error = signal('');
  isClosing = signal(false);

  private urlInputRef = viewChild<ElementRef<HTMLInputElement>>('urlInput');

  constructor() {
    // Focus input when opened
    effect(() => {
      if (this.isOpen() && isPlatformBrowser(this.platformId)) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          this.urlInputRef()?.nativeElement?.focus();
        }, 50);
      }
    });
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    this.isClosing.set(true);
    setTimeout(() => {
      this.isClosing.set(false);
      this.url.set('');
      this.error.set('');
      this.closed.emit();
    }, 150);
  }

  clearInput(): void {
    this.url.set('');
    this.error.set('');
    this.urlInputRef()?.nativeElement?.focus();
  }

  submit(): void {
    const urlValue = this.url().trim();
    if (!urlValue) return;

    const videoId = this.extractVideoId(urlValue);
    if (!videoId) {
      this.error.set(this.i18n.t('commandPalette.invalid'));
      return;
    }

    // Emit submit intent
    this.submitted.emit(videoId);

    // Close the palette gracefully
    this.isClosing.set(true);
    setTimeout(() => {
      this.isClosing.set(false);
      this.url.set('');
      this.error.set('');
      // We don't emit closed() here because the action was submitted, not cancelled
    }, 150);
  }

  private extractVideoId(input: string): string | null {
    // Handle direct video ID (11 characters)
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      return input;
    }

    // Handle various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) return match[1];
    }

    return null;
  }
}
