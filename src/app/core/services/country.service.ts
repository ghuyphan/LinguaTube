import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SettingsService } from './settings.service';
import { SUPPORTED_COUNTRIES, SupportedCountry, getCountryFlagUrl, COUNTRY_FLAG_MAP } from '../../models/country.constants';

const DETECTED_COUNTRY_KEY = 'voca_detected_country';

@Injectable({
    providedIn: 'root'
})
export class CountryService {
    private settings = inject(SettingsService);
    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);

    // Initial default fallback
    readonly detectedCountry = signal<string>('VN');

    // User's manual selection from settings ('auto' or specific ISO code like 'VN', 'US')
    readonly selectedCountry = computed(() => this.settings.settings().country || 'auto');

    readonly isAuto = computed(() => this.selectedCountry() === 'auto');

    // Effective country resolved: manual override if set, otherwise auto-detected
    readonly effectiveCountry = computed(() => {
        const selected = this.selectedCountry();
        if (selected && selected !== 'auto') {
            return selected.toUpperCase();
        }
        return this.detectedCountry();
    });

    readonly effectiveFlagUrl = computed(() => getCountryFlagUrl(this.effectiveCountry()));

    readonly effectiveCountryName = computed(() => {
        const code = this.effectiveCountry();
        const found = SUPPORTED_COUNTRIES.find(c => c.code === code);
        return found ? found.name : code;
    });

    readonly effectiveCountryInfo = computed(() => {
        const code = this.effectiveCountry();
        return SUPPORTED_COUNTRIES.find(c => c.code === code) || null;
    });

    readonly availableCountries = SUPPORTED_COUNTRIES;

    constructor() {
        if (this.isBrowser) {
            this.initDetection();
        }
    }

    /**
     * Initialize country detection using local heuristics first,
     * followed by Cloudflare Geo-IP edge lookup.
     */
    private initDetection(): void {
        // 1. Check cached detection in localStorage
        try {
            const cached = localStorage.getItem(DETECTED_COUNTRY_KEY);
            if (cached && COUNTRY_FLAG_MAP[cached.toUpperCase()]) {
                this.detectedCountry.set(cached.toUpperCase());
            } else {
                // Quick local heuristics before network
                const heuristic = this.detectFromBrowserLocale();
                if (heuristic) {
                    this.detectedCountry.set(heuristic);
                }
            }
        } catch {
            // Ignore storage access errors
        }

        // 2. Query Cloudflare Edge Geo-IP in background
        void this.fetchGeoIp();
    }

    /**
     * Query Cloudflare /api/geo endpoint
     */
    async fetchGeoIp(): Promise<string | null> {
        if (!this.isBrowser) return null;

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3500);

            const res = await fetch('/api/geo', {
                signal: controller.signal,
                headers: { Accept: 'application/json' }
            });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json() as { success?: boolean; country?: string | null };
                if (data.success && data.country && typeof data.country === 'string') {
                    const country = data.country.trim().toUpperCase();
                    if (COUNTRY_FLAG_MAP[country]) {
                        this.detectedCountry.set(country);
                        try {
                            localStorage.setItem(DETECTED_COUNTRY_KEY, country);
                        } catch {
                            // Ignore storage errors
                        }
                        return country;
                    }
                }
            }
        } catch {
            // Network failure or abort, retain local heuristic
        }
        return null;
    }

    /**
     * Heuristic fallback from browser locale and timezone
     */
    private detectFromBrowserLocale(): string | null {
        try {
            // Check navigator.languages or navigator.language
            const lang = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
            const parts = lang.split(/[-_]/);
            if (parts.length > 1) {
                const region = parts[1].toUpperCase();
                if (COUNTRY_FLAG_MAP[region]) return region;
            }

            // Check timeZone
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
            if (timeZone.includes('Ho_Chi_Minh') || timeZone.includes('Saigon')) return 'VN';
            if (timeZone.includes('Tokyo')) return 'JP';
            if (timeZone.includes('Seoul')) return 'KR';
            if (timeZone.includes('Shanghai') || timeZone.includes('Beijing') || timeZone.includes('Chongqing')) return 'CN';
            if (timeZone.includes('New_York') || timeZone.includes('Chicago') || timeZone.includes('Los_Angeles') || timeZone.includes('Denver')) return 'US';
            if (timeZone.includes('London')) return 'GB';
            if (timeZone.includes('Paris')) return 'FR';
            if (timeZone.includes('Berlin')) return 'DE';
            if (timeZone.includes('Madrid')) return 'ES';
            if (timeZone.includes('Rome')) return 'IT';
            if (timeZone.includes('Sao_Paulo')) return 'BR';
            if (timeZone.includes('Moscow')) return 'RU';
            if (timeZone.includes('Bangkok')) return 'TH';
            if (timeZone.includes('Jakarta')) return 'ID';
            if (timeZone.includes('Toronto') || timeZone.includes('Vancouver')) return 'CA';
            if (timeZone.includes('Sydney') || timeZone.includes('Melbourne')) return 'AU';

            // Check language prefix fallback
            if (parts[0] === 'vi') return 'VN';
            if (parts[0] === 'ja') return 'JP';
            if (parts[0] === 'ko') return 'KR';
            if (parts[0] === 'zh') return 'CN';
        } catch {
            // Ignore errors
        }
        return 'VN';
    }

    /**
     * Update country preference ('auto' or specific ISO code like 'VN')
     */
    setCountry(countryCode: string): void {
        const val = countryCode === 'auto' ? 'auto' : countryCode.toUpperCase();
        this.settings.updateSettings({ country: val });
    }

    /**
     * Find country object by code
     */
    getCountryByCode(code: string): SupportedCountry | undefined {
        return SUPPORTED_COUNTRIES.find(c => c.code === code.toUpperCase());
    }
}
