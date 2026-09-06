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
  PLATFORM_ID,
  OnDestroy
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { I18nService } from '../../../core/services';
import { BodyScrollService } from '../../../services';
import { YoutubeService } from '../../../features/video/youtube.service';

@Component({
  selector: 'app-command-palette',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './command-palette.component.html',
  styleUrl: './command-palette.component.scss'
})
export class CommandPaletteComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private youtube = inject(YoutubeService);
  private bodyScroll = inject(BodyScrollService);
  i18n = inject(I18nService);

  isOpen = input<boolean>(false);
  submitted = output<string>();
  closed = output<void>();

  url = signal('');
  error = signal('');
  hasError = signal(false);
  shakeError = signal(false);
  isClosing = signal(false);

  private urlInputRef = viewChild<ElementRef<HTMLInputElement>>('urlInput');
  private shakeTimeoutId?: ReturnType<typeof setTimeout>;
  private isLocked = false;

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        if (isPlatformBrowser(this.platformId)) {
          if (!this.isLocked) {
            this.bodyScroll.lock();
            this.isLocked = true;
          }
          this.isClosing.set(false);
          this.resetError();
          setTimeout(() => {
            this.urlInputRef()?.nativeElement?.focus();
          }, 50);
        }
      } else {
        if (this.isLocked) {
          this.bodyScroll.unlock();
          this.isLocked = false;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.isLocked) {
      this.bodyScroll.unlock();
      this.isLocked = false;
    }
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
      this.resetError();
      this.closed.emit();
    }, 140);
  }

  clearInput(): void {
    this.url.set('');
    this.resetError();
    this.urlInputRef()?.nativeElement?.focus();
  }

  async pasteFromClipboard(): Promise<void> {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          this.url.set(text.trim());
          this.submit();
        }
      }
    } catch {
      this.urlInputRef()?.nativeElement?.focus();
    }
  }

  onInputChange(): void {
    if (this.hasError() || this.error()) {
      this.resetError();
    }
  }

  submit(): void {
    const urlValue = this.url().trim();
    if (!urlValue) return;

    const videoId = this.youtube.extractVideoId(urlValue);
    if (!videoId) {
      this.triggerError(this.i18n.t('commandPalette.invalid'));
      return;
    }

    const id = videoId;
    this.isClosing.set(true);
    setTimeout(() => {
      this.isClosing.set(false);
      this.url.set('');
      this.resetError();
      this.submitted.emit(id);
    }, 140);
  }

  private triggerError(message: string): void {
    this.error.set(message);
    this.hasError.set(true);
    this.shakeError.set(true);

    if (this.shakeTimeoutId) {
      clearTimeout(this.shakeTimeoutId);
    }
    this.shakeTimeoutId = setTimeout(() => {
      this.shakeError.set(false);
    }, 450);
  }

  private resetError(): void {
    this.error.set('');
    this.hasError.set(false);
    this.shakeError.set(false);
    if (this.shakeTimeoutId) {
      clearTimeout(this.shakeTimeoutId);
      this.shakeTimeoutId = undefined;
    }
  }
}
