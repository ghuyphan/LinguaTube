import { Component, inject, ChangeDetectionStrategy, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { SettingsService, VocabularyService, YoutubeService, SubtitleService, AuthService } from '../../services';

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
          <h1 class="header__title">LinguaTube</h1>
          <span class="header__subtitle">Learn from YouTube</span>
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
          <span class="stat-label">Words</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value stat-value--success">{{ vocab.getStatsByLanguage(settings.settings().language).known }}</span>
          <span class="stat-label">Known</span>
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
                <button class="dropdown-btn" (click)="signOut()">Sign out</button>
              </div>
            }
          </div>
        } @else {
          <div #googleBtn class="google-signin-btn"></div>
        }
        
        <button 
          class="btn btn-icon btn-ghost"
          (click)="toggleTheme()"
          [attr.aria-label]="'Toggle theme'"
          [attr.title]="settings.getEffectiveTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
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
      line-height: 1.2;
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .lang-btn:hover {
      color: var(--text-primary);
    }

    .lang-btn.active {
      background: var(--bg-card);
      color: var(--accent-primary);
      box-shadow: var(--shadow-sm);
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

    .header__actions {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-left: var(--space-sm);
    }
    
    .google-signin-btn {
      height: 32px;
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
    
    .user-avatar:hover {
      border-color: var(--accent-primary);
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
    
    .dropdown-btn:hover {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    @media (max-width: 768px) {
      /* Keep header sticky on mobile */
      :host {
        position: sticky;
        top: 0;
      }

      .header {
        gap: var(--space-xs);
        padding: 0 var(--space-md);
        height: 52px; /* Slightly taller for mobile touch targets */
      }

      .header__title-group {
        display: none;
      }

      .header__nav {
        margin-left: auto;
        padding: 2px;
        gap: 0;
        background: transparent; /* Remove background on mobile to save visual weight */
      }

      .header__stats {
        display: none;
      }
      
      .lang-btn {
        padding: 6px 8px;
        font-size: 0.875rem; /* Larger font for readability */
        border-radius: 6px;
      }
      
      .header__actions {
        gap: var(--space-xs);
        margin-left: var(--space-xs);
      }
      
      /* Ensure google button doesn't break layout */
      .google-signin-btn {
        height: 40px; /* Match icon button size */
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden; /* Prevent overflow */
      }
    }

    @media (max-width: 480px) {
      .header {
        padding: 0 var(--space-md);
      }
      
      .header__logo {
        width: 28px;
        height: 28px;
      }
      
      .logo-text {
        font-size: 1rem;
      }
    }
  `]
})
export class HeaderComponent implements AfterViewInit {
  settings = inject(SettingsService);
  vocab = inject(VocabularyService);
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);
  auth = inject(AuthService);

  @ViewChild('googleBtn') googleBtnRef?: ElementRef<HTMLElement>;

  showUserMenu = false;

  ngAfterViewInit(): void {
    // Render button once auth is initialized and element is ready
    this.tryRenderButton();
  }

  private tryRenderButton(): void {
    if (this.auth.isInitialized() && this.googleBtnRef?.nativeElement) {
      this.auth.renderButton(this.googleBtnRef.nativeElement);
    } else {
      setTimeout(() => this.tryRenderButton(), 200);
    }
  }

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

  signOut(): void {
    this.auth.signOut();
    this.showUserMenu = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.showUserMenu) return;

    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.showUserMenu = false;
    }
  }
}
