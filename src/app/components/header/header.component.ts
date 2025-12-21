import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { SettingsService, VocabularyService, YoutubeService, SubtitleService } from '../../services';

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
      padding: 6px 14px;
      font-family: var(--font-jp);
      font-size: 0.8125rem;
      font-weight: 500;
      border: none;
      border-radius: 6px;
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
      gap: var(--space-xs);
    }

    @media (max-width: 768px) {
      /* Keep header sticky on mobile */
      :host {
        position: sticky;
        top: 0;
      }

      .header {
        gap: var(--space-sm);
        padding: 0 var(--space-md);
        height: 44px;
      }

      .header__title-group {
        display: none;
      }

      .header__nav {
        /* Move nav to absolute center or hidden menu if needed, 
           but for now keeping it compact */
        margin-left: auto;
        padding: 2px;
      }

      .header__stats {
        display: none; /* Hide stats on mobile header to save space */
      }
      
      .lang-btn {
         padding: 4px 8px;
         font-size: 0.75rem;
      }
    }

    @media (max-width: 480px) {
      /* Keep consistent spacing on small screens */
      .header {
        padding: 0 var(--space-md);
      }
    }
  `]
})
export class HeaderComponent {
  settings = inject(SettingsService);
  vocab = inject(VocabularyService);
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);

  setLanguage(lang: 'ja' | 'zh'): void {
    if (this.settings.settings().language === lang) return;

    // Clear video and subtitles when switching languages
    // primarily to prevent mismatch between language mode and content
    this.youtube.reset();
    this.subtitles.clear();

    this.settings.setLanguage(lang);
  }

  toggleTheme(): void {
    // Use effective theme (resolves 'system' to actual light/dark)
    const effectiveTheme = this.settings.getEffectiveTheme();
    const next = effectiveTheme === 'dark' ? 'light' : 'dark';
    this.settings.setTheme(next);
  }
}
