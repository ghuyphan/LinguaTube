import { Component, inject, signal, computed, ChangeDetectionStrategy, HostListener, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { IconComponent } from '../icon/icon.component';
import { SettingsService, VocabularyService, YoutubeService, SubtitleService, AuthService, I18nService } from '../../services';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <aside class="sidebar" [class.collapsed]="isCollapsed()">
      <!-- Toggle Button (Floating) -->
      <button 
        class="sidebar-toggle" 
        (click)="toggleCollapse()"
        [attr.aria-label]="isCollapsed() ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <app-icon [name]="isCollapsed() ? 'chevron-right' : 'chevron-left'" [size]="16" />
      </button>

      <!-- Logo / Brand -->
      <div class="sidebar__brand">
        <div class="sidebar__logo">
          <span class="logo-text">言</span>
        </div>
        @if (!isCollapsed()) {
          <div class="sidebar__title-group">
            <h1 class="sidebar__title">{{ i18n.t('app.title') }}</h1>
            <span class="sidebar__subtitle">{{ i18n.t('app.subtitle') }}</span>
          </div>
        }
      </div>

      <!-- Navigation -->
      <nav class="sidebar__nav">
        <a 
          class="nav-item"
          routerLink="/video"
          [class.active]="isRouteActive('/video')"
        >
          <app-icon name="play-circle" [size]="20" />
          @if (!isCollapsed()) {
            <span>{{ i18n.t('nav.video') }}</span>
          }
        </a>
        <a 
          class="nav-item"
          routerLink="/dictionary"
          [class.active]="isRouteActive('/dictionary')"
        >
          <app-icon name="book-open" [size]="20" />
          @if (!isCollapsed()) {
            <span>{{ i18n.t('nav.words') }}</span>
          }
        </a>
        <a 
          class="nav-item"
          routerLink="/study"
          [class.active]="isRouteActive('/study')"
        >
          <app-icon name="graduation-cap" [size]="20" />
          @if (!isCollapsed()) {
            <span>{{ i18n.t('nav.study') }}</span>
          }
        </a>
      </nav>

      <!-- Language Selector -->
      @if (!isCollapsed()) {
        <div class="sidebar__section">
          <h3 class="section-label">{{ i18n.t('settings.learningLanguage') }}</h3>
          <div class="lang-selector">
            <button 
              class="lang-chip"
              [class.active]="settings.settings().language === 'ja'"
              (click)="setLanguage('ja')"
            >
              🇯🇵 日本語
            </button>
            <button 
              class="lang-chip"
              [class.active]="settings.settings().language === 'zh'"
              (click)="setLanguage('zh')"
            >
              🇨🇳 中文
            </button>
            <button 
              class="lang-chip"
              [class.active]="settings.settings().language === 'ko'"
              (click)="setLanguage('ko')"
            >
              🇰🇷 한국어
            </button>
            <button 
              class="lang-chip"
              [class.active]="settings.settings().language === 'en'"
              (click)="setLanguage('en')"
            >
              🇬🇧 EN
            </button>
          </div>
        </div>
      }

      <!-- Stats -->
      @if (!isCollapsed()) {
        <div class="sidebar__section">
          <h3 class="section-label">{{ i18n.t('settings.vocabStats') }}</h3>
          <div class="stats-compact">
            <div class="stat-row">
              <span class="stat-label">{{ i18n.t('settings.totalWords') }}</span>
              <span class="stat-value">{{ vocab.getStatsByLanguage(settings.settings().language).total }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">{{ i18n.t('header.known') }}</span>
              <span class="stat-value stat-value--success">{{ vocab.getStatsByLanguage(settings.settings().language).known }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">{{ i18n.t('vocab.learning') }}</span>
              <span class="stat-value stat-value--warning">{{ vocab.getStatsByLanguage(settings.settings().language).learning }}</span>
            </div>
          </div>
        </div>
      }

      <!-- Footer Actions -->
      <div class="sidebar__footer">
        @if (auth.isLoggedIn()) {
          <button class="footer-btn" (click)="openSettings.emit()">
            <img 
              [src]="auth.user()?.picture" 
              [alt]="auth.user()?.name" 
              class="user-avatar"
            />
            @if (!isCollapsed()) {
              <span class="user-name">{{ auth.user()?.name }}</span>
            }
          </button>
        } @else if (auth.isInitialized() && auth.isAuthEnabled()) {
          <button class="footer-btn footer-btn--signin" (click)="signIn()">
            <svg class="google-logo" viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            @if (!isCollapsed()) {
              <span>{{ i18n.t('header.signIn') }}</span>
            }
          </button>
        }

        <button 
          class="footer-btn" 
          (click)="openSettings.emit()"
          [attr.title]="i18n.t('nav.settings')"
        >
          <app-icon name="settings" [size]="20" />
          @if (!isCollapsed()) {
            <span>{{ i18n.t('nav.settings') }}</span>
          }
        </button>

        <button 
          class="footer-btn" 
          (click)="toggleTheme()"
          [attr.title]="settings.getEffectiveTheme() === 'dark' ? i18n.t('header.switchToLight') : i18n.t('header.switchToDark')"
        >
          @if (settings.getEffectiveTheme() === 'dark') {
            <app-icon name="sun" [size]="20" />
          } @else {
            <app-icon name="moon" [size]="20" />
          }
          @if (!isCollapsed()) {
            <span>{{ settings.getEffectiveTheme() === 'dark' ? i18n.t('settings.switchToLightMode') : i18n.t('settings.switchToDarkMode') }}</span>
          }
        </button>
      </div>
    </aside>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 200;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      width: 260px;
      height: 100%;
      background: var(--bg-card);
      border-right: 1px solid var(--border-color);
      transition: width var(--transition-normal);
    }

    .sidebar.collapsed {
      width: 68px;
    }

    /* Brand */
    .sidebar__brand {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-md);
      border-bottom: 1px solid var(--border-color);
    }

    .sidebar__logo {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--accent-primary), #e85a56);
      border-radius: 8px;
      flex-shrink: 0;
    }

    .logo-text {
      font-family: var(--font-jp);
      font-size: 1.25rem;
      font-weight: 700;
      color: white;
    }

    .sidebar__title-group {
      flex: 1;
      min-width: 0;
    }

    .sidebar__title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
      line-height: 1.2;
    }

    .sidebar__subtitle {
      font-size: 0.6875rem;
      color: var(--text-muted);
    }

    .sidebar-toggle {
      position: absolute;
      right: -12px;
      top: 24px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 50%;
      color: var(--text-muted);
      cursor: pointer;
      z-index: 10;
      box-shadow: var(--shadow-sm);
      transition: all var(--transition-fast);
    }

    .sidebar-toggle:hover {
      background: var(--bg-primary);
      color: var(--text-primary);
      transform: scale(1.1);
    }

    /* Navigation */
    .sidebar__nav {
      padding: var(--space-md);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: 10px 12px;
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: var(--border-radius);
      transition: all var(--transition-fast);
    }

    .nav-item:hover {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    .nav-item.active {
      background: var(--accent-primary);
      color: white;
    }

    .nav-item span {
      font-size: 0.9375rem;
      font-weight: 500;
    }

    .sidebar.collapsed .nav-item {
      justify-content: center;
      padding: 12px;
    }

    /* Sections */
    .sidebar__section {
      padding: var(--space-md);
      border-top: 1px solid var(--border-color);
    }

    .section-label {
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      margin: 0 0 var(--space-sm) 0;
    }

    /* Language Selector */
    .lang-selector {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .lang-chip {
      padding: 6px 10px;
      font-size: 0.8125rem;
      font-weight: 500;
      background: var(--bg-secondary);
      border: 1px solid transparent;
      border-radius: 100px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .lang-chip:hover {
      background: var(--bg-tertiary);
      color: var(--text-primary);
    }

    .lang-chip.active {
      background: var(--accent-primary);
      color: white;
    }

    /* Stats */
    .stats-compact {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .stat-label {
      font-size: 0.8125rem;
      color: var(--text-secondary);
    }

    .stat-value {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .stat-value--success { color: var(--success); }
    .stat-value--warning { color: var(--warning); }

    /* Footer */
    .sidebar__footer {
      margin-top: auto;
      padding: var(--space-md);
      border-top: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .footer-btn {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: 10px 12px;
      background: transparent;
      border: none;
      border-radius: var(--border-radius);
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
      text-align: left;
      width: 100%;
    }

    .footer-btn:hover {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    .footer-btn span {
      font-size: 0.875rem;
    }

    .footer-btn--signin {
      background: var(--bg-secondary);
    }

    .sidebar.collapsed .footer-btn {
      justify-content: center;
      padding: 12px;
    }

    .user-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .user-name {
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .google-logo {
      flex-shrink: 0;
    }

    /* Hide on mobile */
    @media (max-width: 768px) {
      :host {
        display: none !important;
      }
    }

    @media (max-height: 500px) and (orientation: landscape) {
      :host {
        display: none !important;
      }
    }
  `]
})
export class SidebarComponent {
  private router = inject(Router);
  settings = inject(SettingsService);
  vocab = inject(VocabularyService);
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);
  auth = inject(AuthService);
  i18n = inject(I18nService);

  isCollapsed = computed(() => this.settings.settings().sidebarCollapsed);
  openSettings = output<void>();

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      startWith(this.router.url)
    )
  );

  isRouteActive(route: string): boolean {
    return this.currentUrl()?.startsWith(route) ?? false;
  }

  toggleCollapse(): void {
    this.settings.setSidebarCollapsed(!this.isCollapsed());
  }

  setLanguage(lang: 'ja' | 'zh' | 'ko' | 'en'): void {
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
}
