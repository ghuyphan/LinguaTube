import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Font Loader Service
 * 
 * Lazily loads CJK (Chinese, Japanese, Korean) fonts on demand
 * to reduce initial page load time.
 */
@Injectable({ providedIn: 'root' })
export class FontLoaderService {
    private platformId = inject(PLATFORM_ID);
    private loadedFonts = new Set<string>();

    private readonly fontUrls: Record<string, string> = {
        ja: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap',
        zh: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap',
        ko: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap'
    };

    /**
     * Load the appropriate font for a given language
     * No-op if font is already loaded or in non-browser context
     */
    loadFontForLanguage(lang: 'ja' | 'zh' | 'ko' | 'en'): void {
        // English uses Inter (already loaded), skip
        if (lang === 'en') return;
        if (!isPlatformBrowser(this.platformId)) return;
        if (this.loadedFonts.has(lang)) return;

        const url = this.fontUrls[lang];
        if (!url) return;

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = () => {
            this.loadedFonts.add(lang);
        };
        link.onerror = () => {
            console.warn(`[FontLoader] Failed to load font for ${lang}`);
        };

        document.head.appendChild(link);
    }
}
