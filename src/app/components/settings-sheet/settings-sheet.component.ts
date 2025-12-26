import { Component, inject, input, output, ChangeDetectionStrategy, signal, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { SettingsService, VocabularyService, AuthService, YoutubeService, SubtitleService, I18nService, UILanguage, SyncService, TranscriptService } from '../../services';

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
              <div class="sync-badge" [class.syncing]="sync.syncStatus() === 'syncing'" [class.error]="sync.syncStatus() === 'error'">
                @if (sync.syncStatus() === 'syncing') {
                  <app-icon name="loader" [size]="12" class="spin" />
                  {{ i18n.t('settings.syncing') }}
                } @else if (sync.syncStatus() === 'error') {
                  <app-icon name="alert-circle" [size]="12" />
                  {{ i18n.t('settings.syncError') }}
                } @else {
                  <app-icon name="check" [size]="12" />
                  {{ i18n.t('settings.synced') }}
                }
              </div>
            </div>
            <button class="settings-btn settings-btn--danger" (click)="showSignOutModal()">
              <app-icon name="log-out" [size]="18" />
              {{ i18n.t('header.signOut') }}
            </button>
          } @else if (auth.isInitialized() && auth.isAuthEnabled()) {
            <div class="google-btn-container" #googleBtnSettings></div>
            <p class="google-signin-hint">{{ i18n.t('settings.syncVocab') }}</p>
          }
        </div>

        <!-- Language Selection -->
        <div class="settings-section">
          <h3 class="section-title">{{ i18n.t('settings.learningLanguage') }}</h3>
          <div class="lang-grid">
            <button 
              class="lang-option"
              [class.active]="settings.settings().language === 'ja'"
              (click)="setLanguage('ja')"
            >
              <span class="lang-flag">🇯🇵</span>
              <span class="lang-name">日本語</span>
            </button>
            <button 
              class="lang-option"
              [class.active]="settings.settings().language === 'zh'"
              (click)="setLanguage('zh')"
            >
              <span class="lang-flag">🇨🇳</span>
              <span class="lang-name">中文</span>
            </button>
            <button 
              class="lang-option"
              [class.active]="settings.settings().language === 'ko'"
              (click)="setLanguage('ko')"
            >
              <span class="lang-flag">🇰🇷</span>
              <span class="lang-name">한국어</span>
            </button>
            <button 
              class="lang-option"
              [class.active]="settings.settings().language === 'en'"
              (click)="setLanguage('en')"
            >
              <span class="lang-flag">🇬🇧</span>
              <span class="lang-name">English</span>
            </button>
          </div>
        </div>

        <!-- UI Language Selection -->
        <div class="settings-section">
          <h3 class="section-title">{{ i18n.t('settings.interfaceLanguage') }}</h3>
          <div class="lang-grid lang-grid--3col">
            @for (lang of i18n.availableLanguages; track lang.code) {
              <button 
                class="lang-option"
                [class.active]="i18n.currentLanguage() === lang.code"
                (click)="setUILanguage(lang.code)"
              >
                <span class="lang-flag">{{ lang.flag }}</span>
                <span class="lang-name">{{ lang.nativeName }}</span>
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
              <span class="stat-label">{{ i18n.t('header.known') }}</span>
            </div>
            <div class="stat-card">
              <span class="stat-value stat-value--warning">{{ vocab.getStatsByLanguage(settings.settings().language).learning }}</span>
              <span class="stat-label">{{ i18n.t('vocab.learning') }}</span>
            </div>
            <div class="stat-card">
              <span class="stat-value stat-value--new">{{ vocab.getStatsByLanguage(settings.settings().language).new }}</span>
              <span class="stat-label">{{ i18n.t('vocab.new') }}</span>
            </div>
          </div>
        </div>
      </div>
    </app-bottom-sheet>

    <!-- Sign Out Confirmation Modal -->
    <app-bottom-sheet [isOpen]="showSignOutConfirm()" [showDragHandle]="false" (closed)="showSignOutConfirm.set(false)">
      <div class="confirm-modal">
        <div class="confirm-icon">
          <app-icon name="log-out" [size]="32" />
        </div>
        <h3 class="confirm-title">{{ i18n.t('settings.signOutConfirmTitle') }}</h3>
        <p class="confirm-message">{{ i18n.t('settings.signOutConfirmMessage') }}</p>
        <div class="confirm-actions">
          <button class="confirm-btn confirm-btn--cancel" (click)="showSignOutConfirm.set(false)">
            {{ i18n.t('vocab.cancel') }}
          </button>
          <button class="confirm-btn confirm-btn--danger" (click)="confirmSignOut()">
            {{ i18n.t('header.signOut') }}
          </button>
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
      width: var(--btn-height-md);
      height: var(--btn-height-md);
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
      padding: var(--space-xs) var(--space-sm);
      background: rgba(74, 124, 89, 0.1);
      color: var(--success);
      font-size: 0.6875rem;
      font-weight: 600;
      border-radius: 100px;
    }

    .sync-badge.syncing {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
    }

    .sync-badge.error {
      background: rgba(239, 68, 68, 0.1);
      color: var(--error);
    }

    .sync-badge .spin {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Unified Language Grid (for both Learning and UI languages) */
    .lang-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-sm);
    }

    .lang-grid--3col {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 400px) {
      .lang-grid--3col {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .lang-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      padding: var(--space-sm) var(--space-xs);
      background: var(--bg-secondary);
      border: 2px solid transparent;
      border-radius: var(--border-radius);
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
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
      text-align: center;
    }

    /* Google Sign-in Button Container */
    .google-btn-container {
      display: flex;
      justify-content: center;
      width: 100%;
      min-height: 44px;
    }

    .google-signin-hint {
      margin: var(--space-sm) 0 0;
      font-size: 0.75rem;
      color: var(--text-muted);
      text-align: center;
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

    /* Sign Out Confirmation Modal */
    .confirm-modal {
      padding: var(--space-lg);
      text-align: center;
    }

    .confirm-icon {
      width: 4rem;
      height: 4rem;
      margin: 0 auto var(--space-md);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(239, 68, 68, 0.1);
      border-radius: 50%;
      color: var(--error);
    }

    .confirm-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 var(--space-xs);
    }

    .confirm-message {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin: 0 0 var(--space-lg);
    }

    .confirm-actions {
      display: flex;
      gap: var(--space-sm);
    }

    .confirm-btn {
      flex: 1;
      padding: var(--space-md);
      border: none;
      border-radius: var(--border-radius);
      font-size: 0.9375rem;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .confirm-btn--cancel {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    .confirm-btn--danger {
      background: var(--error);
      color: white;
    }

    @media (hover: hover) {
      .confirm-btn--cancel:hover {
        background: var(--bg-card);
      }
      .confirm-btn--danger:hover {
        opacity: 0.9;
      }
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
  sync = inject(SyncService);
  transcript = inject(TranscriptService);

  @ViewChild('googleBtnSettings') googleBtnSettings!: ElementRef;

  isOpen = input<boolean>(false);
  closed = output<void>();

  showSignOutConfirm = signal(false);
  private buttonRendered = false;

  constructor() {
    effect(() => {
      // Only render the button once to prevent flicker from "Sign in with Google" -> "Sign in as..."
      if (this.isOpen() && this.auth.isInitialized() && this.auth.isAuthEnabled() && !this.auth.isLoggedIn() && !this.buttonRendered) {
        setTimeout(() => {
          this.renderGoogleButton();
          this.buttonRendered = true;
        }, 0);
      }
    });
  }

  renderGoogleButton() {
    if (this.googleBtnSettings?.nativeElement) {
      this.auth.renderButton(this.googleBtnSettings.nativeElement, {
        type: 'standard',
        shape: 'pill',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        width: 240
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

  setUILanguage(lang: UILanguage): void {
    this.i18n.setLanguage(lang);
  }

  toggleTheme(): void {
    const effectiveTheme = this.settings.getEffectiveTheme();
    const next = effectiveTheme === 'dark' ? 'light' : 'dark';
    this.settings.setTheme(next);
  }

  showSignOutModal(): void {
    this.showSignOutConfirm.set(true);
  }

  confirmSignOut(): void {
    this.showSignOutConfirm.set(false);
    this.auth.signOut();
    this.closed.emit();
  }
}
