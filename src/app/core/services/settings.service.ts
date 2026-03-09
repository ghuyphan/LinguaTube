import { Injectable, signal, effect, untracked, OnDestroy, inject } from '@angular/core';
import { ReadingDisplayMode, SupportedLearningLanguage, UserSettings } from '../../models';
import { FontLoaderService } from './font-loader.service';

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
  hasCompletedOnboarding: false
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

    return this.settings().readingDisplayMode;
  }

  showReadingAnnotation(language: SupportedLearningLanguage = this.settings().language): boolean {
    return this.getReadingDisplayMode(language) === 'annotated';
  }

  showReadingText(language: SupportedLearningLanguage = this.settings().language): boolean {
    return this.getReadingDisplayMode(language) !== 'native';
  }

  useReadingOnly(language: SupportedLearningLanguage = this.settings().language): boolean {
    return this.getReadingDisplayMode(language) === 'reading';
  }

  setReadingDisplayMode(mode: ReadingDisplayMode): void {
    const showReading = mode !== 'native';

    this.updateSettings({
      readingDisplayMode: mode,
      showFurigana: showReading,
      showPinyin: showReading
    });
  }

  toggleReadingDisplay(language: SupportedLearningLanguage = this.settings().language): void {
    if (!this.hasReadingSupport(language)) {
      return;
    }

    const current = this.getReadingDisplayMode(language);
    const next: ReadingDisplayMode =
      current === 'native' ? 'annotated' : current === 'annotated' ? 'reading' : 'native';

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
      const toSave = { ...settings };
      // Don't persist dual subtitle state or target language to avoid accidental API usage on reload
      delete (toSave as any).showDualSubtitles;
      delete (toSave as any).dualSubtitleTargetLang;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  }

  private getStoredReadingDisplayMode(settings: Partial<UserSettings>): ReadingDisplayMode {
    if (settings.readingDisplayMode) {
      return settings.readingDisplayMode;
    }

    if (settings.showFurigana === false || settings.showPinyin === false) {
      return 'native';
    }

    return DEFAULT_SETTINGS.readingDisplayMode;
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
