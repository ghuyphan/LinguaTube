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
import { Router } from '@angular/router';
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
      padding-top: 15vh;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease-out forwards;
    }

    .palette-overlay.closing {
      animation: fadeOut 0.1s ease-in forwards;
    }

    .palette {
      width: 100%;
      max-width: 560px;
      background: var(--bg-card);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-xl);
      overflow: hidden;
      animation: slideDown 0.2s cubic-bezier(0.32, 0.72, 0, 1) forwards;
    }

    .palette.closing {
      animation: slideUp 0.15s cubic-bezier(0.32, 0.72, 0, 1) forwards;
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
      color: var(--primary-color);
      background: rgba(var(--primary-rgb), 0.1);
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
        align-items: stretch; /* Full height */
      }

      .palette {
        max-width: 100%;
        height: 100vh;
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

    /* Animations */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes slideUp {
      from {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateY(-10px) scale(0.98);
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
  private router = inject(Router);
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

    // Navigate to video
    this.router.navigate(['/video'], { queryParams: { id: videoId } });
    this.close();
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
