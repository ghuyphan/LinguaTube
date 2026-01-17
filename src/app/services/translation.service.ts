import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, of, shareReplay, finalize, timer, switchMap, retry, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

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
    private readonly API_URL = environment.api.translate;

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

        // Batch API call for non-cached texts with rate limit handling
        return this.http.post<{ translations: (string | null)[] }>(environment.api.translateBatch, {
            texts: toTranslate.map(t => t.text),
            source,
            target
        }).pipe(
            catchError((err: HttpErrorResponse) => {
                // Handle rate limiting (429) with exponential backoff
                if (err.status === 429) {
                    const retryAfter = this.extractRetryAfter(err);
                    console.warn(`Batch translation rate limited. Retrying after ${retryAfter}s...`);
                    return timer(retryAfter * 1000).pipe(
                        switchMap(() => throwError(() => err))
                    );
                }
                return throwError(() => err);
            }),
            retry({
                count: 3,
                delay: (error, retryCount) => {
                    if (error.status === 429) {
                        // Exponential backoff: 1s, 2s, 4s
                        const delay = Math.pow(2, retryCount - 1) * 1000;
                        console.warn(`Batch translation retry ${retryCount}/3 after ${delay}ms`);
                        return timer(delay);
                    }
                    // Don't retry non-429 errors
                    return throwError(() => error);
                }
            }),
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
                console.error('Batch translation failed after retries:', err);
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
     * Get dual subtitles for a video
     * Handles caching and API calls
     */
    getDualSubtitles(videoId: string, sourceLang: string, targetLang: string, segments: any[], onlyCache = false): Observable<any[]> {
        return this.http.post<any>(environment.api.dualSubtitles, {
            videoId,
            sourceLang,
            targetLang,
            segments,
            onlyCache
        }).pipe(
            map(response => response.segments || []),
            catchError(err => {
                console.error('Dual subtitles failed:', err);
                return of([]);
            })
        );
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
     * Extract retry-after seconds from response headers
     */
    private extractRetryAfter(err: HttpErrorResponse): number {
        const retryHeader = err.headers?.get('Retry-After');
        if (retryHeader) {
            const seconds = parseInt(retryHeader, 10);
            if (!isNaN(seconds)) return seconds;
        }
        return 2; // Default: 2 seconds
    }

    /**
     * Supported languages for target translation
     */
    getSupportedTargetLanguages(): Array<{ code: string, name: string, flag: string, flagUrl: string }> {
        return [
            { code: 'en', name: 'English', flag: '🇺🇸', flagUrl: 'https://flagcdn.com/w80/us.png' },
            { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', flagUrl: 'https://flagcdn.com/w80/vn.png' },
            { code: 'ja', name: '日本語', flag: '🇯🇵', flagUrl: 'https://flagcdn.com/w80/jp.png' },
            { code: 'ko', name: '한국어', flag: '🇰🇷', flagUrl: 'https://flagcdn.com/w80/kr.png' },
            { code: 'zh', name: '中文', flag: '🇨🇳', flagUrl: 'https://flagcdn.com/w80/cn.png' },
        ];
    }
}
