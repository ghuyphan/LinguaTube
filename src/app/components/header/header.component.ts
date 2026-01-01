import { Component, inject, ChangeDetectionStrategy, HostListener, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SettingsService, VocabularyService, YoutubeService, SubtitleService, AuthService, I18nService, UILanguage, TranscriptService } from '../../services';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  settings = inject(SettingsService);
  vocab = inject(VocabularyService);
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);
  auth = inject(AuthService);
  i18n = inject(I18nService);
  transcript = inject(TranscriptService);

  @ViewChild('googleBtnDesktop') googleBtnDesktop!: ElementRef;
  @ViewChild('googleBtnMobile') googleBtnMobile!: ElementRef;

  showUserMenu = false;
  showLangMenu = false;
  isLoggingIn = false;

  constructor() {
    // No longer need to render Google buttons - using custom buttons with PocketBase
  }

  /**
   * Login with Google via PocketBase OAuth
   */
  async loginWithGoogle(): Promise<void> {
    if (this.isLoggingIn) return;
    this.isLoggingIn = true;
    try {
      await this.auth.loginWithGoogle();
    } catch (error) {
      console.error('[Header] Google login failed:', error);
    } finally {
      this.isLoggingIn = false;
    }
  }

  setLanguage(lang: 'ja' | 'zh' | 'ko' | 'en'): void {
    if (this.settings.settings().language === lang) return;
    this.subtitles.clear();
    this.transcript.reset();
    this.settings.setLanguage(lang);
  }

  toggleTheme(): void {
    const effectiveTheme = this.settings.getEffectiveTheme();
    const next = effectiveTheme === 'dark' ? 'light' : 'dark';
    this.settings.setTheme(next);
  }



  signOut(): void {
    this.auth.signOut();
    this.showUserMenu = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (this.showUserMenu && !target.closest('.user-menu')) {
      this.showUserMenu = false;
    }
    if (this.showLangMenu && !target.closest('.lang-switcher')) {
      this.showLangMenu = false;
    }
  }

  setUILanguage(lang: UILanguage): void {
    this.i18n.setLanguage(lang);
    this.showLangMenu = false;
  }
}

