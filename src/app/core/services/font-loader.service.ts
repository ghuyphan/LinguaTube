import { Injectable, signal } from '@angular/core';

/**
 * Font Loader Service
 * 
 * Lazily loads CJK (Chinese, Japanese, Korean) fonts on demand
 * to reduce initial page load time.
 */
@Injectable({ providedIn: 'root' })
export class FontLoaderService {
    private loadedFonts = new Set<string>();

    // Track loading state for UI feedback if needed
    readonly isLoading = signal(false);

    private readonly fontUrls: Record<string, string> = {
        ja: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap',
        zh: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap',
        ko: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap'
    };

    /**
     * Load the appropriate font for a given language
     * No-op if font is already loaded
     */
    loadFontForLanguage(lang: 'ja' | 'zh' | 'ko' | 'en'): void {
        // English uses Inter (already loaded), skip
        if (lang === 'en') return;

        if (this.loadedFonts.has(lang)) return;

        const url = this.fontUrls[lang];
        if (!url) return;

        this.isLoading.set(true);

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = () => {
            this.loadedFonts.add(lang);
            this.isLoading.set(false);
        };
        link.onerror = () => {
            console.warn(`[FontLoader] Failed to load font for ${lang}`);
            this.isLoading.set(false);
        };

        document.head.appendChild(link);
    }

    /**
     * Check if a font is already loaded
     */
    isFontLoaded(lang: 'ja' | 'zh' | 'ko' | 'en'): boolean {
        if (lang === 'en') return true;
        return this.loadedFonts.has(lang);
    }

    /**
     * Preload fonts for commonly used languages during idle time
     */
    preloadCommonFonts(): void {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                // Preload Japanese font as it's most commonly used
                this.loadFontForLanguage('ja');
            }, { timeout: 5000 });
        }
    }
}
