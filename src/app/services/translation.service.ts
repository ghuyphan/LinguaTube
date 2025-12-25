import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, shareReplay, finalize } from 'rxjs';

export interface TranslationResponse {
    translation: string;
    info?: unknown;
}

// Cache configuration
const CACHE_KEY = 'linguatube_translations';
const MAX_CACHE_SIZE = 200;

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private readonly API_URL = '/api/translate';

    // In-memory cache for translations
    private translationCache = new Map<string, string>();
    // Pending requests for deduplication
    private pendingRequests = new Map<string, Observable<string | null>>();
    // Loading states
    private loadingStates = signal<Set<string>>(new Set());

    constructor(private http: HttpClient) {
        this.loadCacheFromStorage();
    }

    /**
     * Translate text from source language to target language
     * With caching and request deduplication
     */
    translate(text: string, source: string, target: string): Observable<string | null> {
        if (!text.trim()) return of(null);

        const key = `${source}:${target}:${text}`;

        // Check memory cache first
        if (this.translationCache.has(key)) {
            return of(this.translationCache.get(key)!);
        }

        // Check if request is already pending (deduplication)
        if (this.pendingRequests.has(key)) {
            return this.pendingRequests.get(key)!;
        }

        this.setLoading(key, true);

        const url = `${this.API_URL}/${source}/${target}/${encodeURIComponent(text)}`;

        const request$ = this.http.get<TranslationResponse>(url).pipe(
            map(response => {
                const translation = response.translation || null;
                if (translation) {
                    this.addToCache(key, translation);
                }
                return translation;
            }),
            catchError(err => {
                console.error('Translation failed:', err);
                return of(null);
            }),
            shareReplay(1),
            finalize(() => {
                this.setLoading(key, false);
                this.pendingRequests.delete(key);
            })
        );

        this.pendingRequests.set(key, request$);
        return request$;
    }

    /**
     * Batch translate multiple texts at once
     * More efficient than individual requests for multiple translations
     */
    translateBatch(texts: string[], source: string, target: string): Observable<(string | null)[]> {
        if (!texts.length) return of([]);

        // Filter out empty texts and find cached ones
        const results: (string | null)[] = new Array(texts.length).fill(null);
        const toTranslate: { index: number; text: string }[] = [];

        texts.forEach((text, i) => {
            if (!text.trim()) {
                results[i] = null;
                return;
            }

            const key = `${source}:${target}:${text}`;
            if (this.translationCache.has(key)) {
                results[i] = this.translationCache.get(key)!;
            } else {
                toTranslate.push({ index: i, text });
            }
        });

        // If all cached, return immediately
        if (toTranslate.length === 0) {
            return of(results);
        }

        // Batch API call for non-cached texts
        return this.http.post<{ translations: (string | null)[] }>('/api/translate/batch', {
            texts: toTranslate.map(t => t.text),
            source,
            target
        }).pipe(
            map(response => {
                response.translations.forEach((translation, i) => {
                    const { index, text } = toTranslate[i];
                    results[index] = translation;
                    if (translation) {
                        this.addToCache(`${source}:${target}:${text}`, translation);
                    }
                });
                return results;
            }),
            catchError(err => {
                console.error('Batch translation failed:', err);
                return of(results); // Return partial results (cached ones)
            })
        );
    }

    isLoading(key: string): boolean {
        return this.loadingStates().has(key);
    }

    private setLoading(key: string, isLoading: boolean): void {
        this.loadingStates.update(states => {
            const newStates = new Set(states);
            if (isLoading) {
                newStates.add(key);
            } else {
                newStates.delete(key);
            }
            return newStates;
        });
    }

    /**
     * Add to cache with LRU eviction and persist to localStorage
     */
    private addToCache(key: string, translation: string): void {
        // LRU eviction
        if (this.translationCache.size >= MAX_CACHE_SIZE) {
            const firstKey = this.translationCache.keys().next().value;
            if (firstKey) {
                this.translationCache.delete(firstKey);
            }
        }
        this.translationCache.set(key, translation);
        this.saveCacheToStorage();
    }

    private loadCacheFromStorage(): void {
        try {
            const stored = localStorage.getItem(CACHE_KEY);
            if (stored) {
                const entries: [string, string][] = JSON.parse(stored);
                this.translationCache = new Map(entries.slice(-MAX_CACHE_SIZE));
            }
        } catch {
            // Ignore cache load errors
        }
    }

    private saveCacheToStorage(): void {
        try {
            const entries = Array.from(this.translationCache.entries());
            localStorage.setItem(CACHE_KEY, JSON.stringify(entries.slice(-MAX_CACHE_SIZE)));
        } catch {
            // Ignore storage errors
        }
    }

    /**
     * Supported languages for target translation
     */
    getSupportedTargetLanguages(): Array<{ code: string, name: string, flag: string }> {
        return [
            { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
            { code: 'en', name: 'English', flag: '🇬🇧' },
            { code: 'es', name: 'Spanish', flag: '🇪🇸' },
            { code: 'fr', name: 'French', flag: '🇫🇷' },
            { code: 'de', name: 'German', flag: '🇩🇪' },
            { code: 'it', name: 'Italian', flag: '🇮🇹' },
            { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
            { code: 'ru', name: 'Russian', flag: '🇷🇺' },
            { code: 'ko', name: 'Korean', flag: '🇰🇷' },
            { code: 'th', name: 'Thai', flag: '🇹🇭' },
            { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
            { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
            { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
        ];
    }
}
