import { Component, inject, input, output, ChangeDetectionStrategy, signal, ViewChild, ElementRef, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { BottomSheetComponent } from '../../shared/components/bottom-sheet/bottom-sheet.component';
import { OptionPickerComponent, OptionItem } from '../../shared/components/option-picker/option-picker.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { SwitchComponent } from '../../shared/components/switch/switch.component';
import { ReadingDisplayMode, SupportedLearningLanguage, SUPPORTED_LANGUAGES } from '../../models';

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

  // Learning language options with display info
  readonly learningLanguages = SUPPORTED_LANGUAGES;

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
      label: this.getReadingDisplayLabel(mode, language),
      example: this.getReadingDisplayExample(mode, language)
    }));
  });

  /**
   * Login with Google via PocketBase OAuth
   */
  loginWithGoogle(): void {
    void this.auth.loginWithGoogle().then(profile => {
      if (profile) {
        this.sheet.close();
      }
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
}
