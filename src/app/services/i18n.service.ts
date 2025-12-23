import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';

// Import all translations statically for bundle efficiency
import en from '../i18n/en.json';
import vi from '../i18n/vi.json';
import ja from '../i18n/ja.json';
import ko from '../i18n/ko.json';
import zh from '../i18n/zh.json';

export type UILanguage = 'en' | 'vi' | 'ja' | 'ko' | 'zh';

interface TranslationData {
    [key: string]: string | TranslationData;
}

const TRANSLATIONS: Record<UILanguage, TranslationData> = {
    en: en as TranslationData,
    vi: vi as TranslationData,
    ja: ja as TranslationData,
    ko: ko as TranslationData,
    zh: zh as TranslationData
};

const STORAGE_KEY = 'linguatube-ui-language';

@Injectable({
    providedIn: 'root'
})
export class I18nService {
    private platformId = inject(PLATFORM_ID);

    // Current UI language
    readonly currentLanguage = signal<UILanguage>(this.loadLanguage());

    // Available languages with display info
    readonly availableLanguages: { code: UILanguage; name: string; nativeName: string; flag: string }[] = [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
        { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
        { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
        { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
        { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' }
    ];

    // Current translations
    private translations = computed(() => TRANSLATIONS[this.currentLanguage()] || TRANSLATIONS['en']);

    /**
     * Get a translated string by key path (e.g., 'nav.video', 'player.load')
     */
    t(key: string): string {
        const parts = key.split('.');
        let current: TranslationData | string = this.translations();

        for (const part of parts) {
            if (typeof current === 'object' && current !== null && part in current) {
                current = current[part];
            } else {
                // Key not found, return the key itself as fallback
                console.warn(`[I18n] Missing translation for: ${key}`);
                return key;
            }
        }

        return typeof current === 'string' ? current : key;
    }

    /**
     * Set the UI language
     */
    setLanguage(lang: UILanguage): void {
        this.currentLanguage.set(lang);
        this.saveLanguage(lang);
    }

    /**
     * Load saved language from localStorage
     */
    private loadLanguage(): UILanguage {
        if (!isPlatformBrowser(this.platformId)) return 'en';

        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && this.isValidLanguage(saved)) {
            return saved as UILanguage;
        }

        // Try to detect from browser
        const browserLang = navigator.language.split('-')[0];
        if (this.isValidLanguage(browserLang)) {
            return browserLang as UILanguage;
        }

        return 'en';
    }

    /**
     * Save language preference
     */
    private saveLanguage(lang: UILanguage): void {
        if (!isPlatformBrowser(this.platformId)) return;
        localStorage.setItem(STORAGE_KEY, lang);
    }

    /**
     * Check if a language code is valid
     */
    private isValidLanguage(code: string): boolean {
        return ['en', 'vi', 'ja', 'ko', 'zh'].includes(code);
    }
}
