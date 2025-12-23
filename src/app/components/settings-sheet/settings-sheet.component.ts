import { Component, inject, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { SettingsService, VocabularyService, AuthService, YoutubeService, SubtitleService, I18nService, UILanguage } from '../../services';

@Component({
  selector: 'app-settings-sheet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, BottomSheetComponent],
  template: `
    <app-bottom-sheet [isOpen]="isOpen()" (closed)="closed.emit()">
      <div class="settings-sheet">
        <div class="settings-header">
          <h2>{{ i18n.t('settings.title') }}</h2>
        </div>

        <!-- User Section -->
        <div class="settings-section">
          @if (auth.isLoggedIn()) {
            <div class="user-card">
              <img 
                [src]="auth.user()?.picture" 
                [alt]="auth.user()?.name" 
                class="user-avatar"
              />
              <div class="user-info">
                <span class="user-name">{{ auth.user()?.name }}</span>
                <span class="user-email">{{ auth.user()?.email }}</span>
              </div>
              <div class="sync-badge">
                <app-icon name="check" [size]="12" />
                {{ i18n.t('settings.synced') }}
              </div>
            </div>
            <button class="settings-btn settings-btn--danger" (click)="signOut()">
              <app-icon name="log-out" [size]="18" />
              {{ i18n.t('header.signOut') }}
            </button>
          } @else if (auth.isInitialized() && auth.isAuthEnabled()) {
            <button class="settings-btn google-btn" (click)="signIn()">
              <svg class="google-logo" viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {{ i18n.t('settings.signInGoogle') }}
              <span class="hint">{{ i18n.t('settings.syncVocab') }}</span>
            </button>
          }
        </div>

        <!-- Language Selection -->
        <div class="settings-section">
          <h3 class="section-title">{{ i18n.t('settings.learningLanguage') }}</h3>
          <div class="lang-options">
            <button 
              class="lang-option"
              [class.active]="settings.settings().language === 'ja'"
              (click)="setLanguage('ja')"
            >
              <span class="lang-flag">🇯🇵</span>
              <span class="lang-name">日本語</span>
              <span class="lang-label">{{ i18n.t('settings.japanese') }}</span>
            </button>
            <button 
              class="lang-option"
              [class.active]="settings.settings().language === 'zh'"
              (click)="setLanguage('zh')"
            >
              <span class="lang-flag">🇨🇳</span>
              <span class="lang-name">中文</span>
              <span class="lang-label">{{ i18n.t('settings.chinese') }}</span>
            </button>
            <button 
              class="lang-option"
              [class.active]="settings.settings().language === 'ko'"
              (click)="setLanguage('ko')"
            >
              <span class="lang-flag">🇰🇷</span>
              <span class="lang-name">한국어</span>
              <span class="lang-label">{{ i18n.t('settings.korean') }}</span>
            </button>
          </div>
        </div>

        <!-- UI Language Selection -->
        <div class="settings-section">
          <h3 class="section-title">{{ i18n.t('settings.interfaceLanguage') }}</h3>
          <div class="ui-lang-options">
            @for (lang of i18n.availableLanguages; track lang.code) {
              <button 
                class="ui-lang-btn"
                [class.active]="i18n.currentLanguage() === lang.code"
                (click)="setUILanguage(lang.code)"
              >
                <span class="ui-lang-flag">{{ lang.flag }}</span>
                <span class="ui-lang-name">{{ lang.nativeName }}</span>
              </button>
            }
          </div>
        </div>

        <!-- Theme -->
        <div class="settings-section">
          <h3 class="section-title">{{ i18n.t('settings.appearance') }}</h3>
          <button class="settings-btn" (click)="toggleTheme()">
            @if (settings.getEffectiveTheme() === 'dark') {
              <app-icon name="sun" [size]="18" />
              {{ i18n.t('settings.switchToLightMode') }}
            } @else {
              <app-icon name="moon" [size]="18" />
              {{ i18n.t('settings.switchToDarkMode') }}
            }
          </button>
        </div>

        <!-- Stats -->
        <div class="settings-section">
          <h3 class="section-title">{{ i18n.t('settings.vocabStats') }}</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <span class="stat-value">{{ vocab.getStatsByLanguage(settings.settings().language).total }}</span>
              <span class="stat-label">{{ i18n.t('settings.totalWords') }}</span>
            </div>
            <div class="stat-card">
              <span class="stat-value stat-value--success">{{ vocab.getStatsByLanguage(settings.settings().language).known }}</span>
              <span class="stat-label">{{ i18n.t('settings.known') }}</span>
            </div>
            <div class="stat-card">
              <span class="stat-value stat-value--warning">{{ vocab.getStatsByLanguage(settings.settings().language).learning }}</span>
              <span class="stat-label">{{ i18n.t('settings.learning') }}</span>
            </div>
            <div class="stat-card">
              <span class="stat-value stat-value--new">{{ vocab.getStatsByLanguage(settings.settings().language).new }}</span>
              <span class="stat-label">{{ i18n.t('settings.new') }}</span>
            </div>
          </div>
        </div>
      </div>
    </app-bottom-sheet>
  `,
  styles: [`
    .settings-sheet {
      padding: var(--space-md);
      padding-bottom: calc(var(--space-lg) + env(safe-area-inset-bottom, 0px));
    }

    .settings-header {
      text-align: center;
      margin-bottom: var(--space-lg);
    }

    .settings-header h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .settings-section {
      margin-bottom: var(--space-lg);
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      margin-bottom: var(--space-sm);
    }

    /* User Card */
    .user-card {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm);
      background: var(--bg-secondary);
      border-radius: var(--border-radius);
      margin-bottom: var(--space-sm);
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .user-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-weight: 500;
      color: var(--text-primary);
      font-size: 0.9375rem;
    }

    .user-email {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .sync-badge {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      background: rgba(74, 124, 89, 0.1);
      color: var(--success);
      font-size: 0.6875rem;
      font-weight: 600;
      border-radius: 100px;
    }

    /* Language Options */
    .lang-options {
      display: flex;
      gap: var(--space-sm);
    }

    .lang-option {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: var(--space-md);
      background: var(--bg-secondary);
      border: 2px solid transparent;
      border-radius: var(--border-radius-lg);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .lang-option.active {
      background: var(--bg-card);
      border-color: var(--accent-primary);
      box-shadow: var(--shadow-sm);
    }

    .lang-flag {
      font-size: 1.5rem;
    }

    .lang-name {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .lang-label {
      font-size: 0.6875rem;
      color: var(--text-muted);
    }

    /* UI Language Options */
    .ui-lang-options {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-xs);
    }

    .ui-lang-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      background: var(--bg-secondary);
      border: 2px solid transparent;
      border-radius: 100px;
      cursor: pointer;
      transition: all var(--transition-fast);
      font-size: 0.875rem;
    }

    .ui-lang-btn.active {
      background: var(--bg-card);
      border-color: var(--accent-primary);
    }

    .ui-lang-flag {
      font-size: 1rem;
    }

    .ui-lang-name {
      color: var(--text-primary);
      font-weight: 500;
    }

    /* Settings Buttons */
    .settings-btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-md);
      background: var(--bg-secondary);
      border: none;
      border-radius: var(--border-radius);
      color: var(--text-primary);
      font-size: 0.9375rem;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    @media (hover: hover) {
      .settings-btn:hover {
        background: var(--bg-card);
        box-shadow: var(--shadow-sm);
      }
    }

    .settings-btn--danger {
      color: var(--error);
    }

    .google-btn {
      flex-wrap: wrap;
    }

    .google-btn .hint {
      width: 100%;
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 4px;
    }

    .google-logo {
      flex-shrink: 0;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-sm);
    }

    .stat-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--space-sm);
      background: var(--bg-secondary);
      border-radius: var(--border-radius);
    }

    .stat-value {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .stat-value--success { color: var(--success); }
    .stat-value--warning { color: var(--warning); }
    .stat-value--new { color: var(--accent-primary); }

    .stat-label {
      font-size: 0.625rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
  `]
})
export class SettingsSheetComponent {
  settings = inject(SettingsService);
  vocab = inject(VocabularyService);
  auth = inject(AuthService);
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);
  i18n = inject(I18nService);

  isOpen = input<boolean>(false);
  closed = output<void>();

  setLanguage(lang: 'ja' | 'zh' | 'ko'): void {
    if (this.settings.settings().language === lang) return;
    this.youtube.reset();
    this.subtitles.clear();
    this.settings.setLanguage(lang);
  }

  setUILanguage(lang: UILanguage): void {
    this.i18n.setLanguage(lang);
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
    this.closed.emit();
  }
}
