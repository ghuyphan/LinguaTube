import { Component, inject, signal, computed, ChangeDetectionStrategy, HostListener, output, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { IconComponent } from '../icon/icon.component';
import { SettingsService, VocabularyService, YoutubeService, SubtitleService, AuthService, I18nService, TranscriptService } from '../../services';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private router = inject(Router);
  settings = inject(SettingsService);
  vocab = inject(VocabularyService);
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);
  auth = inject(AuthService);
  i18n = inject(I18nService);
  transcript = inject(TranscriptService);

  isCollapsed = computed(() => this.settings.settings().sidebarCollapsed);
  openSettings = output<void>();



  toggleCollapse(): void {
    this.settings.setSidebarCollapsed(!this.isCollapsed());
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

  @ViewChild('googleBtnCollapsed') googleBtnCollapsed!: ElementRef;
  @ViewChild('googleBtnExpanded') googleBtnExpanded!: ElementRef;

  constructor() {
    effect(() => {
      if (this.auth.isInitialized() && this.auth.isAuthEnabled() && !this.auth.isLoggedIn()) {
        setTimeout(() => this.renderGoogleButtons(), 0);
      }
    });
  }

  renderGoogleButtons() {
    if (this.googleBtnCollapsed?.nativeElement) {
      this.auth.renderButton(this.googleBtnCollapsed.nativeElement, {
        type: 'icon',
        shape: 'circle',
        theme: 'outline',
        size: 'medium'
      });
    }

    if (this.googleBtnExpanded?.nativeElement) {
      this.auth.renderButton(this.googleBtnExpanded.nativeElement, {
        type: 'standard',
        shape: 'rectangular',
        theme: 'outline',
        size: 'medium',
        width: '225', // Fill available width (260 - 32 padding = 228)
        text: 'signin_with'
      });
    }
  }


}
