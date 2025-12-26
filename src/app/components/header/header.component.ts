import { Component, inject, ChangeDetectionStrategy, HostListener, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
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

  constructor() {
    effect(() => {
      // Re-render buttons when auth initializes or settings change if needed
      if (this.auth.isInitialized() && this.auth.isAuthEnabled() && !this.auth.isLoggedIn()) {
        // Allow time for view to update with new divs
        setTimeout(() => this.renderGoogleButtons(), 0);
      }
    });
  }

  renderGoogleButtons() {
    if (this.googleBtnDesktop?.nativeElement) {
      this.auth.renderButton(this.googleBtnDesktop.nativeElement, {
        type: 'standard',
        shape: 'pill',
        theme: 'outline',
        size: 'large',
        text: 'signin_with'
      });
    }

    if (this.googleBtnMobile?.nativeElement) {
      this.auth.renderButton(this.googleBtnMobile.nativeElement, {
        type: 'icon',
        shape: 'circle',
        theme: 'outline',
        size: 'large'
      });
    }
  }

  setLanguage(lang: 'ja' | 'zh' | 'ko' | 'en'): void {
    if (this.settings.settings().language === lang) return;
    this.youtube.reset();
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

