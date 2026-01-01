import { Injectable, signal, effect, untracked, OnDestroy } from '@angular/core';
import { UserSettings } from '../../models';

const STORAGE_KEY = 'linguatube_settings';

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'system',
  language: 'ja',
  showFurigana: true,
  showPinyin: true,
  autoAdvance: false,
  fontSize: 'medium',
  playbackSpeed: 1,
  sidebarCollapsed: false
};

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements OnDestroy {
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
    this.updateSettings({ language });
  }

  toggleFurigana(): void {
    this.updateSettings({ showFurigana: !this.settings().showFurigana });
  }

  togglePinyin(): void {
    this.updateSettings({ showPinyin: !this.settings().showPinyin });
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

  resetToDefaults(): void {
    this.settings.set(DEFAULT_SETTINGS);
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<UserSettings>;
        this.settings.set({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  }

  private saveToStorage(settings: UserSettings): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
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
