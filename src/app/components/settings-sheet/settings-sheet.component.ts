import { Component, inject, input, output, ChangeDetectionStrategy, signal, ViewChild, ElementRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { BottomSheetComponent } from '../../shared/components/bottom-sheet/bottom-sheet.component';
import { SettingsService, VocabularyService, AuthService, YoutubeService, SubtitleService, I18nService, UILanguage, SyncService, TranscriptService } from '../../services';
import { StreakService } from '../../services/streak.service';

@Component({
  selector: 'app-settings-sheet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, BottomSheetComponent],
  templateUrl: './settings-sheet.component.html',
  styleUrl: './settings-sheet.component.scss'
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
  streak = inject(StreakService);

  @ViewChild('googleBtnSettings') googleBtnSettings!: ElementRef;

  isOpen = input<boolean>(false);
  closed = output<void>();

  showSignOutConfirm = signal(false);
  showLearningLangPicker = signal(false);
  showUILangPicker = signal(false);
  isLoggingIn = false;

  // Learning language options with display info
  readonly learningLanguages = [
    { code: 'ja' as const, name: '日本語', flag: 'https://hatscripts.github.io/circle-flags/flags/jp.svg' },
    { code: 'zh' as const, name: '中文', flag: 'https://hatscripts.github.io/circle-flags/flags/cn.svg' },
    { code: 'ko' as const, name: '한국어', flag: 'https://hatscripts.github.io/circle-flags/flags/kr.svg' },
    { code: 'en' as const, name: 'English', flag: 'https://hatscripts.github.io/circle-flags/flags/gb.svg' }
  ];

  // Computed for current learning language display
  currentLearningLang = computed(() => {
    const code = this.settings.settings().language;
    return this.learningLanguages.find(l => l.code === code) || this.learningLanguages[0];
  });

  // Computed for current UI language display
  currentUILang = computed(() => {
    const code = this.i18n.currentLanguage();
    return this.i18n.availableLanguages.find(l => l.code === code) || this.i18n.availableLanguages[0];
  });

  // Check if dark mode is active
  isDarkMode = computed(() => this.settings.getEffectiveTheme() === 'dark');

  /**
   * Login with Google via PocketBase OAuth
   */
  async loginWithGoogle(): Promise<void> {
    if (this.isLoggingIn) return;
    this.isLoggingIn = true;
    try {
      await this.auth.loginWithGoogle();
      this.closed.emit(); // Close sheet after successful login
    } catch (error) {
      console.error('[Settings] Google login failed:', error);
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
