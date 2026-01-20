import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, of, timer, switchMap, retry, throwError, Subject, concatMap, delay } from 'rxjs';
import { environment } from '../../environments/environment';



// Cache configuration
const CACHE_KEY = 'linguatube_translations';
const MAX_CACHE_SIZE = 1000;

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    private readonly API_URL = environment.api.translate;

    // In-memory cache for translations
    private translationCache = new Map<string, string>();

    // Request queue for batch translations
    private requestQueue$ = new Subject<{
        params: any;
        observer: any;
        cancelled?: boolean;
    }>();

    constructor(private http: HttpClient) {
        this.loadCacheFromStorage();
        this.initializeRequestQueue();
    }

    private initializeRequestQueue() {
        this.requestQueue$.pipe(
            // Process requests sequentially with a delay between them
            concatMap(request => {
                // Check if request was cancelled while waiting in queue
                if (request.cancelled) {
                    return of(void 0);
                }

                return of(request).pipe(
                    // Add delay BEFORE processing request
                    delay(150),
                    switchMap(req => {
                        // Check again after delay
                        if (req.cancelled) return of(void 0);
                        return this.processBatchRequest(req);
                    })
                );
            })
        ).subscribe();
    }

    private processBatchRequest(request: { params: any, observer: any }): Observable<void> {
        const { params, observer } = request;

        return this.http.post<{ translations: (string | null)[] }>(environment.api.translateBatch, {
            texts: params.texts,
            source: params.source,
            target: params.target
        }).pipe(
            retry({
                count: 3,
                delay: (error, retryCount) => {
                    // Only retry on 429 or 5xx
                    if (error.status !== 429 && !error.status.toString().startsWith('5')) {
                        return throwError(() => error);
                    }

                    // Get retry-after from header or default to exponential backoff
                    const retryAfterHeader = error.headers?.get('Retry-After');
                    let delayMs = 1000 * Math.pow(2, retryCount - 1); // 1s, 2s, 4s

                    if (retryAfterHeader) {
                        const seconds = parseInt(retryAfterHeader, 10);
                        if (!isNaN(seconds)) {
                            delayMs = seconds * 1000;
                        }
                    }

                    console.warn(`[Translation] Batch failed (${error.status}), retrying in ${delayMs}ms...`);
                    return timer(delayMs);
                }
            }),
            // If success, emit result and complete
            map(response => {
                observer.next(response);
                observer.complete();
            }),
            // If error after retries
            catchError(err => {
                console.warn('Batch translation failed after retries:', err);
                observer.error(err);
                return of(null);
            }),
            // Ensure we return void for the switchMap/concatMap chain
            map(() => void 0)
        );
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

        return new Observable(observer => {
            const requestContext = {
                params: {
                    texts: toTranslate.map(t => t.text),
                    source,
                    target
                },
                observer: {
                    next: (response: { translations: (string | null)[] }) => {
                        response.translations.forEach((translation, i) => {
                            const { index, text } = toTranslate[i];
                            results[index] = translation;
                            if (translation) {
                                this.addToCache(`${source}:${target}:${text}`, translation);
                            }
                        });
                        observer.next(results);
                        observer.complete();
                    },
                    error: (err: any) => observer.error(err),
                    complete: () => observer.complete()
                },
                cancelled: false
            };

            this.requestQueue$.next(requestContext);

            // Teardown logic: mark as cancelled if subscriber unsubscribes
            return () => {
                requestContext.cancelled = true;
            };
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
            { code: 'en', name: 'English', flag: '🇺🇸', flagUrl: 'https://hatscripts.github.io/circle-flags/flags/us.svg' },
            { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', flagUrl: 'https://hatscripts.github.io/circle-flags/flags/vn.svg' },
            { code: 'ja', name: '日本語', flag: '🇯🇵', flagUrl: 'https://hatscripts.github.io/circle-flags/flags/jp.svg' },
            { code: 'ko', name: '한국어', flag: '🇰🇷', flagUrl: 'https://hatscripts.github.io/circle-flags/flags/kr.svg' },
            { code: 'zh', name: '中文', flag: '🇨🇳', flagUrl: 'https://hatscripts.github.io/circle-flags/flags/cn.svg' },
        ];
    }
}
