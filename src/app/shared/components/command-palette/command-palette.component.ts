import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  inject,
  ElementRef,
  viewChild,
  effect,
  PLATFORM_ID,
  OnDestroy
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent, IconName } from '../icon/icon.component';
import { I18nService, SettingsService } from '../../../core/services';
import { BodyScrollService } from '../../../services';
import { YoutubeService } from '../../../features/video/youtube.service';

export interface PaletteItem {
  id: string;
  icon: IconName;
  title: string;
  category: string;
  badge?: string;
  run: () => void;
}

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
  private router = inject(Router);
  private settings = inject(SettingsService);
  i18n = inject(I18nService);

  isOpen = input<boolean>(false);
  submitted = output<string>();
  closed = output<void>();

  url = signal('');
  error = signal('');
  hasError = signal(false);
  shakeError = signal(false);
  isClosing = signal(false);
  selectedIndex = signal(0);

  allItems = computed<PaletteItem[]>(() => [
    {
      id: 'watch',
      icon: 'play',
      title: this.i18n.t('commandPalette.watchVideo') || 'Watch YouTube Videos',
      category: this.i18n.t('commandPalette.quickActions') || 'Navigation',
      run: () => this.navigate('/video')
    },
    {
      id: 'study',
      icon: 'graduation-cap',
      title: this.i18n.t('commandPalette.reviewVocab') || 'Review Flashcards (SRS)',
      category: this.i18n.t('commandPalette.quickActions') || 'Navigation',
      run: () => this.navigate('/study')
    },
    {
      id: 'dict',
      icon: 'book-open',
      title: this.i18n.t('commandPalette.openDictionary') || 'Dictionary & Grammar',
      category: this.i18n.t('commandPalette.quickActions') || 'Navigation',
      run: () => this.navigate('/dictionary')
    },
    {
      id: 'playlists',
      icon: 'list-video',
      title: this.i18n.t('commandPalette.browsePlaylists') || 'Curated Playlists',
      category: this.i18n.t('commandPalette.quickActions') || 'Navigation',
      run: () => this.navigate('/playlist')
    },
    {
      id: 'history',
      icon: 'clock',
      title: this.i18n.t('commandPalette.viewHistory') || 'Watch History',
      category: this.i18n.t('commandPalette.quickActions') || 'Navigation',
      run: () => this.navigate('/history')
    },
    {
      id: 'theme',
      icon: this.settings.getEffectiveTheme() === 'dark' ? 'sun' : 'moon',
      title: this.i18n.t('commandPalette.toggleTheme') || 'Toggle Theme',
      category: this.i18n.t('commandPalette.quickActions') || 'Actions',
      run: () => this.toggleTheme()
    }
  ]);

  filteredItems = computed<PaletteItem[]>(() => {
    const q = this.url().trim().toLowerCase();
    const items = this.allItems();
    if (!q) return items;

    // Check if query matches a YouTube video URL or ID
    const videoId = this.youtube.extractVideoId(q);
    if (videoId) {
      return [{
        id: 'youtube',
        icon: 'play-circle',
        title: `${this.i18n.t('commandPalette.load') || 'Open'}: ${videoId}`,
        category: 'YouTube',
        badge: 'Enter ↵',
        run: () => this.submit()
      }];
    }

    return items.filter((item: PaletteItem) =>
      item.title.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q)
    );
  });

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

  private navigate(path: string): void {
    this.close();
    void this.router.navigate([path]);
  }

  private toggleTheme(): void {
    const effectiveTheme = this.settings.getEffectiveTheme();
    const next = effectiveTheme === 'dark' ? 'light' : 'dark';
    this.settings.setTheme(next);
    this.close();
  }

  onKeyDown(event: KeyboardEvent): void {
    const items = this.filteredItems();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex.update(i => (i + 1) % Math.max(1, items.length));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex.update(i => (i - 1 + items.length) % Math.max(1, items.length));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const current = items[this.selectedIndex()];
      if (current) {
        current.run();
      } else {
        this.submit();
      }
    }
  }

  executeItem(item: PaletteItem): void {
    item.run();
  }

  onItemMouseEnter(idx: number): void {
    if (isPlatformBrowser(this.platformId) && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      this.selectedIndex.set(idx);
    }
  }

  onInputChange(): void {
    this.selectedIndex.set(0);
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
