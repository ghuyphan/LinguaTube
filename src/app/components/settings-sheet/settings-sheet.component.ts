import { Component, inject, input, output, signal, computed, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { BottomSheetComponent } from '../../shared/components/bottom-sheet/bottom-sheet.component';
import { OptionPickerComponent, OptionItem } from '../../shared/components/option-picker/option-picker.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SwitchComponent } from '../../shared/components/switch/switch.component';
import { ReadingDisplayMode, SupportedLearningLanguage } from '../../models';

import { SettingsService, AuthService, I18nService, UILanguage, ToastService, GamificationService, AppUpdateService } from '../../core/services';
import { TranscriptService } from '../../features/video';
import { StreakService } from '../../services/streak.service';
import { LearningLanguageService } from '../../services/learning-language.service';

@Component({
  selector: 'app-settings-sheet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, BottomSheetComponent, OptionPickerComponent, ConfirmDialogComponent, SwitchComponent],
  templateUrl: './settings-sheet.component.html',
  styleUrl: './settings-sheet.component.scss'
})
export class SettingsSheetComponent {
  settings = inject(SettingsService);
  auth = inject(AuthService);
  toast = inject(ToastService);
  i18n = inject(I18nService);
  transcript = inject(TranscriptService);
  streak = inject(StreakService);
  gamification = inject(GamificationService);
  appUpdate = inject(AppUpdateService);
  learningLanguage = inject(LearningLanguageService);

  readonly sheet = viewChild(BottomSheetComponent);

  isOpen = input<boolean>(false);
  closed = output<void>();
  openStreak = output<void>();
  openAchievements = output<void>();
  openAiCredits = output<void>();
  openProUpgrade = output<void>();

  showSignOutConfirm = signal(false);
  showLearningLangPicker = signal(false);
  showUILangPicker = signal(false);
  showReadingModePicker = signal(false);
  showReleaseNotes = signal(false);

  readonly currentLearningLang = this.learningLanguage.currentLanguage;
  readonly learningLangOptions = this.learningLanguage.languageOptions;

  // Computed for current UI language display
  currentUILang = computed(() => {
    const code = this.i18n.currentLanguage();
    return this.i18n.availableLanguages.find(l => l.code === code) || this.i18n.availableLanguages[0];
  });

  // Check if dark mode is active
  isDarkMode = computed(() => this.settings.getEffectiveTheme() === 'dark');

  currentReadingDisplay = computed(() => {
    const language = this.settings.settings().language;
    return this.getReadingDisplayLabel(this.settings.getReadingDisplayMode(language), language);
  });

  uiLangOptions = computed<OptionItem[]>(() =>
    this.i18n.availableLanguages.map(l => ({
      value: l.code,
      label: l.nativeName,
      iconUrl: l.flag
    }))
  );

  readingDisplayOptions = computed<OptionItem[]>(() => {
    const language = this.settings.settings().language;
    const modes = this.settings.getAvailableReadingDisplayModes(language);

    return modes.map(mode => ({
      value: mode,
      label: this.getReadingDisplayLabel(mode, language),
      example: this.getReadingDisplayExample(mode, language)
    }));
  });

  /**
   * Login with Google via PocketBase OAuth
   */
  loginWithGoogle(): void {
    this.auth.loginWithGoogle().then(profile => {
      if (profile) {
        this.toast.show(this.i18n.t('auth.signedInAs', { name: profile.name }) || `Signed in as ${profile.name}`, { type: 'success', icon: 'check-circle' });
        this.sheet()?.close();
      }
    }).catch(() => {
      this.toast.show(this.i18n.t('auth.signInFailed') || 'Sign in failed. Please try again.', { type: 'error', icon: 'alert-circle' });
    });
  }

  setLanguage(lang: 'ja' | 'zh' | 'ko' | 'en'): void {
    this.showLearningLangPicker.set(false);
    this.sheet()?.close();
    this.learningLanguage.switchLanguage(lang);
  }

  onLearningLangSelected(value: string): void {
    this.setLanguage(value as 'ja' | 'zh' | 'ko' | 'en');
  }

  setUILanguage(lang: UILanguage): void {
    this.i18n.setLanguage(lang);
    this.settings.setDualSubtitleTargetLang(lang);
  }

  onUILangSelected(value: string): void {
    this.setUILanguage(value as UILanguage);
    this.showUILangPicker.set(false);
  }

  onReadingDisplaySelected(value: string): void {
    this.settings.setReadingDisplayMode(value as ReadingDisplayMode);
    this.showReadingModePicker.set(false);
  }

  toggleTheme(): void {
    const effectiveTheme = this.settings.getEffectiveTheme();
    const next = effectiveTheme === 'dark' ? 'light' : 'dark';
    this.settings.setTheme(next);
  }

  showSignOutModal(): void {
    this.showSignOutConfirm.set(true);
  }

  async confirmSignOut(): Promise<void> {
    try {
      await this.auth.signOut();
      this.toast.show(this.i18n.t('auth.signedOut') || 'Signed out successfully', { type: 'info', icon: 'check-circle' });
      this.showSignOutConfirm.set(false);
      this.sheet()?.close();
    } catch (err) {
      console.error('[Auth] Sign out error:', err);
      this.showSignOutConfirm.set(false);
    }
  }

  onSheetClosed(): void {
    this.closed.emit();
  }

  openStreakDialog(): void {
    this.openStreak.emit();
  }

  openAchievementsDialog(): void {
    this.openAchievements.emit();
  }

  openAiCreditsDialog(): void {
    this.openAiCredits.emit();
  }

  private getReadingDisplayLabel(
    mode: ReadingDisplayMode,
    language: SupportedLearningLanguage
  ): string {
    if (language === 'en') {
      return this.i18n.t('settings.textOnly');
    }

    switch (language) {
      case 'ja':
        if (mode === 'native') return this.i18n.t('settings.kanjiOnly');
        if (mode === 'annotated') return this.i18n.t('settings.kanjiFurigana');
        if (mode === 'annotatedRomanized') return this.i18n.t('settings.kanjiRomaji');
        if (mode === 'romanized') return this.i18n.t('settings.romajiOnly');
        return this.i18n.t('settings.kanaOnly');
      case 'zh':
        if (mode === 'native') return this.i18n.t('settings.hanziOnly');
        if (mode === 'annotated') return this.i18n.t('settings.hanziPinyin');
        return this.i18n.t('settings.pinyinOnly');
      case 'ko':
        if (mode === 'native') return this.i18n.t('settings.hangulOnly');
        if (mode === 'annotated') return this.i18n.t('settings.hangulRomanization');
        return this.i18n.t('settings.romanizationOnly');
      default:
        return this.i18n.t('settings.textOnly');
    }
  }

  private getReadingDisplayExample(
    mode: ReadingDisplayMode,
    language: SupportedLearningLanguage
  ): string | undefined {
    switch (language) {
      case 'ja':
        switch (mode) {
          case 'native':
            return '日本語';
          case 'annotated':
            return '日本語 (にほんご)';
          case 'annotatedRomanized':
            return '日本語 (nihongo)';
          case 'reading':
            return 'にほんご';
          case 'romanized':
            return 'nihongo';
          default:
            return undefined;
        }
      case 'zh':
        switch (mode) {
          case 'native':
            return '中文';
          case 'annotated':
            return '中文 (zhōngwén)';
          case 'reading':
            return 'zhōngwén';
          default:
            return undefined;
        }
      case 'ko':
        switch (mode) {
          case 'native':
            return '한국어';
          case 'annotated':
            return '한국어 (hangugeo)';
          case 'reading':
            return 'hangugeo';
          default:
            return undefined;
        }
      default:
        return undefined;
    }
  }

  async checkForUpdates(): Promise<void> {
    await this.appUpdate.checkForUpdate({ isManual: true });
  }

  applyUpdate(): void {
    void this.appUpdate.applyUpdate();
  }
}
