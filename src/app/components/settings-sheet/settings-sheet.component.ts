import { Component, inject, input, output, ChangeDetectionStrategy, signal, ViewChild, ElementRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { BottomSheetComponent } from '../../shared/components/bottom-sheet/bottom-sheet.component';
import { OptionPickerComponent, OptionItem } from '../../shared/components/option-picker/option-picker.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SwitchComponent } from '../../shared/components/switch/switch.component';
import { ReadingDisplayMode, SupportedLearningLanguage } from '../../models';

import { SettingsService, VocabularyService, AuthService, YoutubeService, SubtitleService, I18nService, UILanguage, TranscriptService } from '../../services';
import { StreakService } from '../../services/streak.service';

@Component({
  selector: 'app-settings-sheet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, BottomSheetComponent, OptionPickerComponent, ConfirmDialogComponent, SwitchComponent],
  templateUrl: './settings-sheet.component.html',
  styleUrl: './settings-sheet.component.scss'
})
export class SettingsSheetComponent {
  private router = inject(Router);
  settings = inject(SettingsService);
  vocab = inject(VocabularyService);
  auth = inject(AuthService);
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);
  i18n = inject(I18nService);
  transcript = inject(TranscriptService);
  streak = inject(StreakService);

  @ViewChild('googleBtnSettings') googleBtnSettings!: ElementRef;
  @ViewChild(BottomSheetComponent) sheet!: BottomSheetComponent;

  isOpen = input<boolean>(false);
  closed = output<void>();
  openStreak = output<void>();
  openAiCredits = output<void>();

  showSignOutConfirm = signal(false);
  showLearningLangPicker = signal(false);
  showUILangPicker = signal(false);
  showReadingModePicker = signal(false);
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

  currentReadingDisplay = computed(() => {
    const language = this.settings.settings().language;
    return this.getReadingDisplayLabel(this.settings.getReadingDisplayMode(language), language);
  });

  // Computed options for OptionPicker
  learningLangOptions = computed<OptionItem[]>(() =>
    this.learningLanguages.map(l => ({
      value: l.code,
      label: l.name,
      iconUrl: l.flag
    }))
  );

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
      label: this.getReadingDisplayLabel(mode, language)
    }));
  });

  /**
   * Login with Google via PocketBase OAuth
   */
  loginWithGoogle(): void {
    if (this.isLoggingIn) return;
    this.isLoggingIn = true;

    const popup = this.auth.prepareOAuthPopup();

    this.auth.loginWithGoogle(popup)
      .then(() => {
        this.sheet.close();
      })
      .catch(error => {
        console.error('[Settings] Google login failed:', error);
      })
      .finally(() => {
        this.isLoggingIn = false;
      });
  }

  setLanguage(lang: 'ja' | 'zh' | 'ko' | 'en'): void {
    if (this.settings.settings().language === lang) return;
    this.subtitles.clear();
    this.transcript.reset();
    this.settings.setLanguage(lang);
  }

  onLearningLangSelected(value: string): void {
    this.setLanguage(value as 'ja' | 'zh' | 'ko' | 'en');
    this.showLearningLangPicker.set(false);
  }

  setUILanguage(lang: UILanguage): void {
    this.i18n.setLanguage(lang);
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

  confirmSignOut(): void {
    this.showSignOutConfirm.set(false);
    this.auth.signOut();
    this.sheet.close();
  }

  goToHistory(): void {
    this.sheet.close();
    this.router.navigate(['/history']);
  }

  onSheetClosed(): void {
    this.closed.emit();
  }

  openStreakDialog(): void {
    this.openStreak.emit();
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
}
