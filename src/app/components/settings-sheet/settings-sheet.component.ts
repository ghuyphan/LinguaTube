import { Component, inject, input, output, signal, computed, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { BottomSheetComponent } from '../../shared/components/bottom-sheet/bottom-sheet.component';
import { OptionPickerComponent, OptionItem } from '../../shared/components/option-picker/option-picker.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SwitchComponent } from '../../shared/components/switch/switch.component';
import { ReadingDisplayMode, SupportedLearningLanguage, PRESET_AVATARS } from '../../models';
import { getReadingDisplayLabel } from '../../shared/utils/language.utils';

import { SettingsService, AuthService, I18nService, UILanguage, ToastService, GamificationService, AppUpdateService, CountryService, LeaderboardService } from '../../core/services';
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
  countryService = inject(CountryService);
  leaderboard = inject(LeaderboardService);

  readonly mainSheet = viewChild<BottomSheetComponent>('mainSheet');
  readonly editProfileSheet = viewChild<BottomSheetComponent>('editProfileSheet');
  readonly sheet = this.mainSheet;

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
  showCountryPicker = signal(false);
  showEditProfile = signal(false);
  editName = signal('');
  editAvatar = signal('');
  editCountry = signal('');
  isSavingProfile = signal(false);
  readonly presetAvatars = PRESET_AVATARS;

  readonly currentLearningLang = this.learningLanguage.currentLanguage;
  readonly learningLangOptions = this.learningLanguage.languageOptions;

  // Computed for current country display
  readonly currentCountry = computed(() => {
    const isAuto = this.countryService.isAuto();
    const info = this.countryService.effectiveCountryInfo();
    return {
      isAuto,
      code: this.countryService.effectiveCountry(),
      name: info ? info.name : this.countryService.effectiveCountry(),
      flag: this.countryService.effectiveFlagUrl()
    };
  });

  readonly currentCountryDisplay = computed(() => {
    const info = this.countryService.effectiveCountryInfo();
    const countryName = info ? (this.i18n.currentLanguage() === 'vi' ? info.nativeName : info.name) : this.countryService.effectiveCountry();
    if (this.countryService.isAuto()) {
      return `${countryName} (${this.i18n.t('settings.countryAuto') || 'Auto'})`;
    }
    return countryName;
  });

  readonly userFlagUrl = computed(() => this.countryService.effectiveFlagUrl());
  readonly userCountryTitle = computed(() => this.countryService.effectiveCountryName());

  readonly editCountryDisplay = computed(() => {
    const val = this.editCountry();
    if (val === 'auto' || !val) {
      const detected = this.countryService.detectedCountry();
      const detectedInfo = this.countryService.getCountryByCode(detected);
      const detectedName = detectedInfo ? (this.i18n.currentLanguage() === 'vi' ? detectedInfo.nativeName : detectedInfo.name) : detected;
      return `${detectedName} (${this.i18n.t('settings.countryAuto') || 'Auto'})`;
    }
    const info = this.countryService.getCountryByCode(val);
    return info ? (this.i18n.currentLanguage() === 'vi' ? info.nativeName : info.name) : val;
  });

  readonly editCountryFlag = computed(() => {
    const val = this.editCountry();
    if (val === 'auto' || !val) {
      return this.countryService.effectiveFlagUrl();
    }
    const info = this.countryService.getCountryByCode(val);
    return info ? info.flagUrl : this.countryService.effectiveFlagUrl();
  });

  // Computed for current UI language display
  currentUILang = computed(() => {
    const code = this.i18n.currentLanguage();
    return this.i18n.availableLanguages.find(l => l.code === code) || this.i18n.availableLanguages[0];
  });

  // Check if dark mode is active
  isDarkMode = computed(() => this.settings.getEffectiveTheme() === 'dark');

  currentReadingDisplay = computed(() => {
    const language = this.settings.settings().language;
    return getReadingDisplayLabel(this.settings.getReadingDisplayMode(language), language, k => this.i18n.t(k));
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
      label: getReadingDisplayLabel(mode, language, k => this.i18n.t(k)),
      example: this.getReadingDisplayExample(mode, language)
    }));
  });

  countryOptions = computed<OptionItem[]>(() => {
    const detected = this.countryService.detectedCountry();
    const detectedInfo = this.countryService.getCountryByCode(detected);
    const detectedName = detectedInfo ? (this.i18n.currentLanguage() === 'vi' ? detectedInfo.nativeName : detectedInfo.name) : detected;
    const currentVal = this.showEditProfile() ? this.editCountry() : this.countryService.selectedCountry();

    const options: OptionItem[] = [
      {
        value: 'auto',
        label: this.i18n.t('settings.countryAuto') || 'Auto-detect',
        example: `${detectedName} (${detected})`,
        icon: 'globe',
        badge: currentVal === 'auto' ? (this.i18n.t('settings.countryActive') || 'Active') : undefined
      }
    ];

    for (const c of this.countryService.availableCountries) {
      options.push({
        value: c.code,
        label: this.i18n.currentLanguage() === 'vi' ? c.nativeName : c.name,
        example: c.nativeName !== c.name ? c.nativeName : c.code,
        iconUrl: c.flagUrl
      });
    }

    return options;
  });

  onCountrySelected(value: string): void {
    if (this.showEditProfile()) {
      this.editCountry.set(value);
    } else {
      this.countryService.setCountry(value);
      void this.leaderboard.syncMyScore(true);
    }
    this.showCountryPicker.set(false);
  }

  openEditProfile(): void {
    const u = this.auth.user();
    if (!u) return;
    this.editName.set(u.name || '');
    this.editAvatar.set(u.picture || '');
    this.editCountry.set(this.countryService.selectedCountry());
    this.showEditProfile.set(true);
  }

  cancelEditProfile(): void {
    const sheet = this.editProfileSheet();
    if (sheet) {
      sheet.close();
    } else {
      this.showEditProfile.set(false);
    }
  }

  onEditProfileClosed(): void {
    this.showEditProfile.set(false);
  }

  selectPresetAvatar(url: string): void {
    this.editAvatar.set(url);
  }

  resetToGoogleAvatar(): void {
    const gPic = this.auth.user()?.googlePicture;
    if (gPic) {
      this.editAvatar.set(gPic);
    }
  }

  onAvatarFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    if (!file.type.startsWith('image/')) {
      this.toast.show('Please select a valid image file (PNG, JPG, WebP)', { type: 'error' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 128;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;

        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        this.editAvatar.set(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
    input.value = '';
  }

  async saveProfile(): Promise<void> {
    const name = this.editName().trim();
    if (!name) {
      this.toast.show(this.i18n.t('settings.displayNamePlaceholder') || 'Please enter a name', { type: 'error' });
      return;
    }

    this.isSavingProfile.set(true);
    try {
      const avatar = this.editAvatar();
      const country = this.editCountry();

      const success = await this.auth.updateUserProfile({
        name,
        picture: avatar,
        country: country === 'auto' ? undefined : country
      });

      if (success) {
        this.countryService.setCountry(country);
        void this.leaderboard.syncMyScore(true);
        this.toast.show(this.i18n.t('settings.profileUpdated') || 'Profile updated successfully!', { type: 'success', icon: 'check-circle' });
        this.cancelEditProfile();
      } else {
        this.toast.show(this.i18n.t('settings.profileUpdateFailed') || 'Failed to update profile.', { type: 'error', icon: 'alert-circle' });
      }
    } catch (err) {
      console.error('[Settings] Error saving profile:', err);
      this.toast.show(this.i18n.t('settings.profileUpdateFailed') || 'Failed to update profile.', { type: 'error', icon: 'alert-circle' });
    } finally {
      this.isSavingProfile.set(false);
    }
  }

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

