import { Component, inject, signal, computed, ChangeDetectionStrategy, HostListener, output, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { IconComponent } from '../icon/icon.component';
import { SettingsService, VocabularyService, YoutubeService, SubtitleService, AuthService, I18nService, TranscriptService } from '../../services';

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
          <div class="footer-btn-container">
            <div class="google-btn-wrapper collapsed-only" #googleBtnCollapsed></div>
            <div class="google-btn-wrapper expanded-only" #googleBtnExpanded></div>
          </div>
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

    .footer-btn-container {
      padding: 0 12px;
      min-height: 40px;
      display: flex;
      align-items: center;
    }

    .sidebar.collapsed .footer-btn-container {
      padding: 0;
      justify-content: center;
    }

    .sidebar.collapsed .footer-btn {
      justify-content: center;
      padding: 12px;
    }

    .collapsed-only { display: none; }
    .expanded-only { display: block; }

    .sidebar.collapsed .collapsed-only { display: block; }
    .sidebar.collapsed .expanded-only { display: none; }

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
  transcript = inject(TranscriptService);

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
        width: '220', // Approximate width of sidebar - padding
        text: 'signin_with'
      });
    }
  }


}
