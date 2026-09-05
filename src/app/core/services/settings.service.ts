import { Injectable, signal, effect, untracked, OnDestroy, inject } from '@angular/core';
import { ReadingDisplayMode, SupportedLearningLanguage, UserSettings } from '../../models';
import { FontLoaderService } from './font-loader.service';
import { getJapaneseRomaji, isJapaneseKanaText } from '../../shared/utils/japanese-romaji';

const STORAGE_KEY = 'linguatube_settings';

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'system',
  language: 'ja',
  showFurigana: true,
  showPinyin: true,
  readingDisplayMode: 'annotated',
  autoAdvance: false,
  fontSize: 'medium',
  playbackSpeed: 1,
  sidebarCollapsed: false,
  showDualSubtitles: false,
  dualSubtitleTargetLang: 'en',
  hasCompletedOnboarding: false,
  fullscreenSubtitleYPercent: 82
};

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements OnDestroy {
  private fontLoader = inject(FontLoaderService);

  readonly settings = signal<UserSettings>(DEFAULT_SETTINGS);

  // Store reference for cleanup
  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  private themeChangeHandler = () => {
    if (this.settings().theme === 'system') {
      this.applyTheme();
    }
  };

  constructor() {
    this.loadFromStorage();
    this.applyTheme();

    // Load font for initial language setting
    this.fontLoader.loadFontForLanguage(this.settings().language);

    // Combined effect: save to storage and apply theme when settings change
    // Using untracked to prevent signal loops during localStorage writes
    effect(() => {
      const current = this.settings();
      untracked(() => {
        this.saveToStorage(current);
        this.applyTheme();
      });
    });

    // Listen for system theme changes (with cleanup support)
    this.mediaQuery.addEventListener('change', this.themeChangeHandler);
  }

  ngOnDestroy(): void {
    this.mediaQuery.removeEventListener('change', this.themeChangeHandler);
  }

  updateSettings(partial: Partial<UserSettings>): void {
    this.settings.update(current => ({ ...current, ...partial }));
  }

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    this.updateSettings({ theme });
  }

  setLanguage(language: 'ja' | 'zh' | 'ko' | 'en'): void {
    // Load the appropriate CJK font before changing language
    this.fontLoader.loadFontForLanguage(language);
    this.updateSettings({ language });
  }

  toggleFurigana(): void {
    this.setReadingDisplayMode(this.settings().showFurigana ? 'native' : 'annotated');
  }

  togglePinyin(): void {
    this.setReadingDisplayMode(this.settings().showPinyin ? 'native' : 'annotated');
  }

  hasReadingSupport(language: SupportedLearningLanguage = this.settings().language): boolean {
    return language !== 'en';
  }

  getReadingDisplayMode(language: SupportedLearningLanguage = this.settings().language): ReadingDisplayMode {
    if (!this.hasReadingSupport(language)) {
      return 'native';
    }

    return this.normalizeReadingDisplayMode(this.settings().readingDisplayMode, language);
  }

  showReadingAnnotation(language: SupportedLearningLanguage = this.settings().language): boolean {
    const mode = this.getReadingDisplayMode(language);
    return mode === 'annotated' || mode === 'annotatedRomanized';
  }

  showReadingText(language: SupportedLearningLanguage = this.settings().language): boolean {
    return this.getReadingDisplayMode(language) !== 'native';
  }

  useReadingOnly(language: SupportedLearningLanguage = this.settings().language): boolean {
    const mode = this.getReadingDisplayMode(language);
    return mode === 'reading' || mode === 'romanized';
  }

  prefersRomanizedReading(language: SupportedLearningLanguage = this.settings().language): boolean {
    if (language !== 'ja') {
      return false;
    }

    const mode = this.getReadingDisplayMode(language);
    return mode === 'annotatedRomanized' || mode === 'romanized';
  }

  getAvailableReadingDisplayModes(
    language: SupportedLearningLanguage = this.settings().language
  ): ReadingDisplayMode[] {
    if (!this.hasReadingSupport(language)) {
      return ['native'];
    }

    if (language === 'ja') {
      return ['native', 'annotated', 'annotatedRomanized', 'reading', 'romanized'];
    }

    return ['native', 'annotated', 'reading'];
  }

  getReadingText(
    language: SupportedLearningLanguage,
    source: { reading?: string; pinyin?: string; romanization?: string; surface?: string }
  ): string | null {
    if (language === 'ja') {
      const kana = source.reading || (isJapaneseKanaText(source.surface) ? source.surface : undefined);
      const romaji = source.romanization || getJapaneseRomaji(kana, source.surface);

      return this.prefersRomanizedReading(language)
        ? romaji || kana || null
        : kana || romaji || null;
    }

    if (language === 'zh') {
      return source.pinyin || null;
    }

    if (language === 'ko') {
      return source.romanization || source.reading || null;
    }

    return source.reading || null;
  }

  setReadingDisplayMode(mode: ReadingDisplayMode): void {
    const normalizedMode = this.normalizeReadingDisplayMode(mode, this.settings().language);
    const showReading = normalizedMode !== 'native';

    this.updateSettings({
      readingDisplayMode: normalizedMode,
      showFurigana: showReading,
      showPinyin: showReading
    });
  }

  toggleReadingDisplay(language: SupportedLearningLanguage = this.settings().language): void {
    if (!this.hasReadingSupport(language)) {
      return;
    }

    const modes = this.getAvailableReadingDisplayModes(language);
    const current = this.getReadingDisplayMode(language);
    const currentIndex = modes.indexOf(current);
    const next = modes[(currentIndex + 1) % modes.length];

    this.setReadingDisplayMode(next);
  }

  setFontSize(fontSize: 'small' | 'medium' | 'large' | 'xlarge'): void {
    this.updateSettings({ fontSize });
  }

  setPlaybackSpeed(speed: number): void {
    this.updateSettings({ playbackSpeed: speed });
  }

  setSidebarCollapsed(collapsed: boolean): void {
    this.updateSettings({ sidebarCollapsed: collapsed });
  }

  toggleDualSubtitles(): void {
    this.updateSettings({ showDualSubtitles: !this.settings().showDualSubtitles });
  }

  setDualSubtitleTargetLang(lang: string): void {
    this.updateSettings({ dualSubtitleTargetLang: lang });
  }

  completeOnboarding(): void {
    this.updateSettings({ hasCompletedOnboarding: true });
  }

  resetToDefaults(): void {
    this.settings.set(DEFAULT_SETTINGS);
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<UserSettings>;
        const readingDisplayMode = this.getStoredReadingDisplayMode(parsed);

        this.settings.set({
          ...DEFAULT_SETTINGS,
          ...parsed,
          readingDisplayMode,
          showFurigana: readingDisplayMode !== 'native',
          showPinyin: readingDisplayMode !== 'native'
        });
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  }

  private saveToStorage(settings: UserSettings): void {
    try {
      const toSave: Partial<UserSettings> = { ...settings };
      // Don't persist dual subtitle state or target language to avoid accidental API usage on reload
      delete toSave.showDualSubtitles;
      delete toSave.dualSubtitleTargetLang;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  }

  private getStoredReadingDisplayMode(settings: Partial<UserSettings>): ReadingDisplayMode {
    if (settings.readingDisplayMode) {
      return this.normalizeReadingDisplayMode(
        settings.readingDisplayMode,
        settings.language ?? DEFAULT_SETTINGS.language
      );
    }

    if (settings.showFurigana === false || settings.showPinyin === false) {
      return 'native';
    }

    return DEFAULT_SETTINGS.readingDisplayMode;
  }

  private normalizeReadingDisplayMode(
    mode: ReadingDisplayMode,
    language: SupportedLearningLanguage
  ): ReadingDisplayMode {
    const allowedModes = this.getAvailableReadingDisplayModes(language);
    if (allowedModes.includes(mode)) {
      return mode;
    }

    if (mode === 'annotatedRomanized') {
      return 'annotated';
    }

    if (mode === 'romanized') {
      return 'reading';
    }

    return DEFAULT_SETTINGS.readingDisplayMode;
  }

  setFullscreenSubtitleYPercent(percent: number): void {
    const clamped = Math.max(8, Math.min(85, Math.round(percent)));
    this.updateSettings({ fullscreenSubtitleYPercent: clamped });
  }

  toggleFullscreenSubtitlePosition(): void {
    const current = this.settings().fullscreenSubtitleYPercent ?? 82;
    const next = current < 50 ? 82 : 12;
    this.updateSettings({ fullscreenSubtitleYPercent: next });
  }

  /**
   * Get the effective theme (resolves 'system' to actual light/dark)
   */
  getEffectiveTheme(): 'light' | 'dark' {
    const { theme } = this.settings();
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return theme;
  }

  private applyTheme(): void {
    const effectiveTheme = this.getEffectiveTheme();
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  }
}
