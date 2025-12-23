import { Component, inject, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { SettingsService, VocabularyService, YoutubeService, SubtitleService, AuthService, I18nService, UILanguage } from '../../services';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  template: `
    <header class="header">
      <div class="header__brand">
        <div class="header__logo">
          <span class="logo-text">言</span>
        </div>
        <div class="header__title-group">
          <h1 class="header__title">{{ i18n.t('app.title') }}</h1>
          <span class="header__subtitle">{{ i18n.t('app.subtitle') }}</span>
        </div>
      </div>

      <nav class="header__nav">
        <button 
          class="lang-btn"
          [class.active]="settings.settings().language === 'ja'"
          (click)="setLanguage('ja')"
        >
          日本語
        </button>
        <button 
          class="lang-btn"
          [class.active]="settings.settings().language === 'zh'"
          (click)="setLanguage('zh')"
        >
          中文
        </button>
        <button 
          class="lang-btn"
          [class.active]="settings.settings().language === 'ko'"
          (click)="setLanguage('ko')"
        >
          한국어
        </button>
      </nav>


      <div class="header__stats">
        <div class="stat-item">
          <span class="stat-value">{{ vocab.getStatsByLanguage(settings.settings().language).total }}</span>
          <span class="stat-label">{{ i18n.t('header.words') }}</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value stat-value--success">{{ vocab.getStatsByLanguage(settings.settings().language).known }}</span>
          <span class="stat-label">{{ i18n.t('header.known') }}</span>
        </div>
      </div>

      <div class="header__actions">
        <!-- User Auth Section -->
        @if (auth.isLoggedIn()) {
          <div class="user-menu">
            <img 
              [src]="auth.user()?.picture" 
              [alt]="auth.user()?.name" 
              class="user-avatar"
              (click)="showUserMenu = !showUserMenu"
            />
            @if (showUserMenu) {
              <div class="user-dropdown">
                <div class="user-info">
                  <span class="user-name">{{ auth.user()?.name }}</span>
                  <span class="user-email">{{ auth.user()?.email }}</span>
                </div>
                <!-- Data Sync Status -->
                <div class="sync-status">
                  <app-icon name="check" [size]="14" class="sync-icon" />
                  <span>{{ i18n.t('header.dataSynced') }}</span>
                </div>
                <button class="dropdown-btn" (click)="signOut()">{{ i18n.t('header.signOut') }}</button>
              </div>
            }
          </div>
        } @else if (auth.isInitialized() && auth.isAuthEnabled()) {
          <button class="google-btn" (click)="signIn()" title="Sign in with Google to sync vocabulary">
            <svg class="google-logo" viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span class="google-btn-text">{{ i18n.t('header.signIn') }}</span>
          </button>
        }
        
        <!-- Desktop Language Switcher -->
        <div class="lang-switcher">
          <button 
            class="btn btn-icon btn-ghost lang-switcher-btn"
            (click)="showLangMenu = !showLangMenu"
            [attr.aria-label]="'Switch language'"
            title="Switch language"
          >
            <app-icon name="globe" [size]="18" />
          </button>
          @if (showLangMenu) {
            <div class="lang-dropdown">
              @for (lang of i18n.availableLanguages; track lang.code) {
                <button 
                  class="lang-dropdown-item"
                  [class.active]="i18n.currentLanguage() === lang.code"
                  (click)="setUILanguage(lang.code)"
                >
                  <span class="lang-flag">{{ lang.flag }}</span>
                  <span class="lang-name">{{ lang.nativeName }}</span>
                  @if (i18n.currentLanguage() === lang.code) {
                    <app-icon name="check" [size]="14" class="check-icon" />
                  }
                </button>
              }
            </div>
          }
        </div>

        <button 
          class="btn btn-icon btn-ghost theme-btn"
          (click)="toggleTheme()"
          [attr.aria-label]="'Toggle theme'"
          [attr.title]="settings.getEffectiveTheme() === 'dark' ? i18n.t('header.switchToLight') : i18n.t('header.switchToDark')"
        >
          @if (settings.getEffectiveTheme() === 'dark') {
            <app-icon name="sun" [size]="18" />
          } @else {
            <app-icon name="moon" [size]="18" />
          }
        </button>
      </div>
    </header>
  `,
  styles: [`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
      width: 100%;
    }

    .header {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-xs) var(--space-lg);
      background: var(--bg-card);
      border-bottom: 1px solid var(--border-color);
      height: 48px;
    }

    .header__brand {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }

    .header__logo {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--accent-primary), #e85a56);
      border-radius: 6px;
    }

    .logo-text {
      font-family: var(--font-jp);
      font-size: 1.125rem;
      font-weight: 700;
      color: white;
    }

    .header__title-group {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .header__title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.2;
    }

    .header__subtitle {
      font-size: 0.6875rem;
      color: var(--text-muted);
      line-height: 1;
    }

    .header__nav {
      display: flex;
      gap: 2px;
      background: var(--bg-secondary);
      padding: 3px;
      border-radius: var(--border-radius);
      margin-left: auto;
    }

    .lang-btn {
      padding: 4px 12px;
      font-family: var(--font-jp);
      font-size: 0.8125rem;
      font-weight: 500;
      border: none;
      border-radius: 6px;
      line-height: normal; /* Reset line-height */
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
      /* Fix alignment issues */
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      width: auto;
      flex: 0 0 auto;
    }

    @media (hover: hover) {
      .lang-btn:hover {
        color: var(--text-primary);
      }
    }

    .lang-btn.active {
      background: var(--bg-card);
      color: var(--accent-primary);
      box-shadow: var(--shadow-sm);
      font-weight: 600;
    }

    .header__stats {
      display: flex;
      align-items: center;
      gap: var(--space-md);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;
    }

    .stat-value {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1;
    }

    .stat-value--success {
      color: var(--success);
    }

    .stat-label {
      font-size: 0.6875rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .stat-divider {
      width: 1px;
      height: 24px;
      background: var(--border-color);
    }

    /* Actions & Auth */
    .header__actions {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      margin-left: var(--space-md);
    }
    
    .google-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 14px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      color: var(--text-primary);
      font-size: 0.8125rem;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition-fast);
      white-space: nowrap;
    }
    
    @media (hover: hover) {
      .google-btn:hover {
        background: var(--bg-secondary);
        border-color: var(--text-muted);
      }
    }
    
    .google-logo {
      flex-shrink: 0;
    }
    
    .google-btn-text {
      display: inline;
    }
    
    .theme-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    
    .user-menu {
      position: relative;
    }
    
    .user-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid transparent;
      transition: border-color var(--transition-fast);
    }
    
    @media (hover: hover) {
      .user-avatar:hover {
        border-color: var(--accent-primary);
      }
    }
    
    .user-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: var(--space-xs);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      min-width: 200px;
      z-index: 1000;
    }
    
    .user-info {
      padding: var(--space-sm) var(--space-md);
      border-bottom: 1px solid var(--border-color);
    }
    
    .user-name {
      display: block;
      font-weight: 500;
      color: var(--text-primary);
    }
    
    .user-email {
      display: block;
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 2px;
    }
    
    .sync-status {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: var(--bg-secondary);
      font-size: 0.75rem;
      color: var(--success);
      font-weight: 500;
      border-bottom: 1px solid var(--border-color);
    }
    
    .sync-icon {
      color: var(--success);
    }
    
    .dropdown-btn {
      width: 100%;
      padding: var(--space-sm) var(--space-md);
      background: transparent;
      border: none;
      text-align: left;
      color: var(--text-secondary);
      cursor: pointer;
      transition: background var(--transition-fast);
    }
    
    @media (hover: hover) {
      .dropdown-btn:hover {
        background: var(--bg-secondary);
        color: var(--text-primary);
      }
    }

    /* Language Switcher (Desktop only) */
    .lang-switcher {
      position: relative;
    }

    .lang-switcher-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .lang-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: var(--space-xs);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      min-width: 160px;
      z-index: 1000;
      overflow: hidden;
    }

    .lang-dropdown-item {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: transparent;
      border: none;
      text-align: left;
      color: var(--text-secondary);
      cursor: pointer;
      transition: background var(--transition-fast);
    }

    @media (hover: hover) {
      .lang-dropdown-item:hover {
        background: var(--bg-secondary);
        color: var(--text-primary);
      }
    }

    .lang-dropdown-item.active {
      background: var(--bg-secondary);
      color: var(--accent-primary);
    }

    .lang-dropdown-item .lang-flag {
      font-size: 1rem;
    }

    .lang-dropdown-item .lang-name {
      flex: 1;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .lang-dropdown-item .check-icon {
      color: var(--accent-primary);
    }

    /* Mobile: Tablet and below */
    @media (max-width: 768px) {
      .header {
        padding: 0 var(--mobile-padding);
        height: 52px;
        gap: var(--space-sm);
      }

      .header__title-group, .header__stats, .lang-switcher {
        display: none;
      }

      .header__nav {
        margin: 0 auto;
        flex: 0 1 auto;
        padding: 3px;
        gap: 2px;
      }
      
      .lang-btn {
        padding: 6px 12px;
        font-size: 0.75rem;
        min-height: 32px;
      }
      
      .header__actions {
        margin: 0;
        gap: 8px;
        flex-shrink: 0;
      }

      .google-btn {
        padding: 6px;
        border-radius: 50%;
        width: 34px;
        height: 34px;
        justify-content: center;
        gap: 0;
        flex-shrink: 0;
        order: 2;
      }
      
      .google-btn-text {
        display: none;
      }

      .theme-btn {
        width: 34px;
        height: 34px;
        flex-shrink: 0;
        order: 1;
      }
      
      .user-menu {
        order: 2;
      }
      
      .user-avatar {
        width: 34px;
        height: 34px;
        flex-shrink: 0;
        border-width: 0;
      }
    }

    /* Mobile: Phone */
    @media (max-width: 480px) {
      .header {
        padding: 0 12px;
        height: 48px;
        gap: 6px;
      }
      
      .header__logo {
        width: 28px;
        height: 28px;
        flex-shrink: 0;
      }
      
      .logo-text {
        font-size: 0.9375rem;
      }
      
      .header__nav {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        padding: 2px;
        margin: 0;
        width: fit-content;
        z-index: 10;
      }
      
      .lang-btn {
        padding: 6px 12px;
        font-size: 0.75rem;
        min-height: 32px;
      }
      
      .header__actions {
        gap: 4px;
        flex-shrink: 0;
        margin-left: auto; /* Push to right since nav is absolute */
      }
      
      .google-btn {
        width: 32px;
        height: 32px;
      }

      .theme-btn {
        width: 32px;
        height: 32px;
      }
      
      .user-avatar {
        width: 32px;
        height: 32px;
      }
    }
  `]
})
export class HeaderComponent {
  settings = inject(SettingsService);
  vocab = inject(VocabularyService);
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);
  auth = inject(AuthService);
  i18n = inject(I18nService);

  showUserMenu = false;
  showLangMenu = false;

  setLanguage(lang: 'ja' | 'zh' | 'ko'): void {
    if (this.settings.settings().language === lang) return;
    this.youtube.reset();
    this.subtitles.clear();
    this.settings.setLanguage(lang);
  }

  toggleTheme(): void {
    const effectiveTheme = this.settings.getEffectiveTheme();
    const next = effectiveTheme === 'dark' ? 'light' : 'dark';
    this.settings.setTheme(next);
  }

  signIn(): void {
    this.auth.signIn();
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

