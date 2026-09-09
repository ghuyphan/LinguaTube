import { Injectable, OnDestroy, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    Observable,
    Subscription,
    map,
    catchError,
    of,
    timer,
    retry,
    throwError,
    Subject,
    from,
    switchMap,
    timeout,
    mergeMap,
    takeWhile,
    finalize
} from 'rxjs';
import { environment } from '../../environments/environment';

export interface LanguageOption {
    code: string;
    name: string;
    flag: string;
    flagUrl: string;
}

export const SUPPORTED_TARGET_LANGUAGES: ReadonlyArray<LanguageOption> = [
    { code: 'ja', name: '日本語', flag: '🇯🇵', flagUrl: 'https://hatscripts.github.io/circle-flags/flags/jp.svg' },
    { code: 'zh', name: '中文', flag: '🇨🇳', flagUrl: 'https://hatscripts.github.io/circle-flags/flags/cn.svg' },
    { code: 'ko', name: '한국어', flag: '🇰🇷', flagUrl: 'https://hatscripts.github.io/circle-flags/flags/kr.svg' },
    { code: 'en', name: 'English', flag: '🇬🇧', flagUrl: 'https://hatscripts.github.io/circle-flags/flags/gb.svg' },
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', flagUrl: 'https://hatscripts.github.io/circle-flags/flags/vn.svg' }
] as const;

interface BatchResponse {
    translations: (string | null)[];
}

interface BatchRequestObserver {
    next: (response: BatchResponse) => void;
    error: (err: unknown) => void;
    complete: () => void;
}

interface BatchRequest {
    params: { texts: string[]; source: string; target: string };
    observer: BatchRequestObserver;
    priority?: 'high' | 'background';
    cancelled?: boolean;
}

// Cache configuration
const CACHE_KEY = 'linguatube_translations';
const MAX_CACHE_SIZE = 1000;
const BATCH_REQUEST_TIMEOUT_MS = 12000;

@Injectable({
    providedIn: 'root'
})
export class TranslationService implements OnDestroy {
    private readonly http = inject(HttpClient);

    // In-memory cache for translations
    private translationCache = new Map<string, string>();
    private storageSaveTimer: ReturnType<typeof setTimeout> | null = null;

    // Request queue for batch translations with priority and concurrency
    private requestQueue$ = new Subject<BatchRequest>();
    private queueSubscription: Subscription | null = null;
    private activeBackgroundRequests = new Set<BatchRequest>();

    constructor() {
        this.loadCacheFromStorage();
        this.initializeRequestQueue();
    }

    private initializeRequestQueue() {
        this.queueSubscription = this.requestQueue$.pipe(
            // Concurrency of 2 with preemption for interactive high-priority batches
            mergeMap(request => {
                if (request.cancelled) {
                    return of(void 0);
                }

                // If high priority request arrives, cancel in-flight background requests to free up bandwidth
                if (request.priority === 'high') {
                    for (const bgReq of this.activeBackgroundRequests) {
                        bgReq.cancelled = true;
                    }
                    this.activeBackgroundRequests.clear();
                } else if (request.priority === 'background') {
                    this.activeBackgroundRequests.add(request);
                }

                return this.processBatchRequest(request).pipe(
                    finalize(() => {
                        this.activeBackgroundRequests.delete(request);
                    })
                );
            }, 2)
        ).subscribe();
    }

    private processBatchRequest(request: BatchRequest): Observable<void> {
        const { params, observer } = request;
        if (request.cancelled) {
            return of(void 0);
        }

        return this.http.post<{ translations: (string | null)[] }>(environment.api.translateBatch, {
            texts: params.texts,
            source: params.source,
            target: params.target
        }).pipe(
            timeout(BATCH_REQUEST_TIMEOUT_MS),
            takeWhile(() => !request.cancelled),
            retry({
                count: 2,
                delay: (error, retryCount) => {
                    if (request.cancelled) {
                        return throwError(() => new Error('Request cancelled'));
                    }
                    // Only retry on 429 or 5xx
                    if (error.status !== 429 && !error.status?.toString().startsWith('5')) {
                        return throwError(() => error);
                    }

                    // Get retry-after from header or default to exponential backoff
                    const retryAfterHeader = error.headers?.get('Retry-After');
                    let delayMs = 1000 * Math.pow(2, retryCount - 1); // 1s, 2s

                    if (retryAfterHeader) {
                        const seconds = parseInt(retryAfterHeader, 10);
                        if (!isNaN(seconds)) {
                            delayMs = seconds * 1000;
                        }
                    } else if (error.status === 429) {
                        delayMs = Math.max(delayMs, 3000); // 3s min on 429
                    }

                    console.warn(`[Translation] Batch failed (${error.status}), retrying in ${delayMs}ms...`);
                    return timer(delayMs);
                }
            }),
            // If success, emit result and complete
            map(response => {
                if (!request.cancelled) {
                    observer.next(response);
                    observer.complete();
                }
            }),
            // If error after retries or timeout
            catchError(err => {
                if (!request.cancelled) {
                    console.warn('[Translation] Batch translation failed or timed out:', err?.message || err);
                    observer.error(err);
                }
                return of(null);
            }),
            // Ensure we return void for the mergeMap chain so queue never stalls
            map(() => void 0)
        );
    }

    private activeTranslator: { key: string; instance: { translate: (text: string) => Promise<string>; destroy?: () => void } } | null = null;

    /**
     * Check if on-device translation is supported and ready for the given language pair
     * (Chrome Built-in AI / W3C Translator API)
     */
    async canTranslateOnDevice(source: string, target: string): Promise<boolean> {
        if (typeof window === 'undefined') return false;
        try {
            const anyWin = window as unknown as Record<string, unknown>;
            const src = source.split('-')[0].toLowerCase();
            const tgt = target.split('-')[0].toLowerCase();

            // 1. Chrome 131+ Translator API: window.Translator.availability()
            const TranslatorClass = anyWin['Translator'] as { availability?: (opt: { sourceLanguage: string; targetLanguage: string }) => Promise<string> } | undefined;
            if (TranslatorClass && typeof TranslatorClass.availability === 'function') {
                const avail = await TranslatorClass.availability({ sourceLanguage: src, targetLanguage: tgt });
                return avail === 'readily';
            }

            // 2. W3C Translation API Draft: window.translation.canTranslate()
            const translationObj = anyWin['translation'] as { canTranslate?: (opt: { sourceLanguage: string; targetLanguage: string }) => Promise<string> } | undefined;
            if (translationObj && typeof translationObj.canTranslate === 'function') {
                const status = await translationObj.canTranslate({ sourceLanguage: src, targetLanguage: tgt });
                return status === 'readily';
            }

            // 3. Early Chrome Origin Trial: window.ai.translator.capabilities()
            const aiObj = anyWin['ai'] as { translator?: { capabilities?: () => Promise<{ available: string }> } } | undefined;
            if (aiObj?.translator && typeof aiObj.translator.capabilities === 'function') {
                const caps = await aiObj.translator.capabilities();
                return caps.available === 'readily';
            }
        } catch {
            return false;
        }
        return false;
    }

    /**
     * Translate texts using on-device browser AI with 0 network requests
     */
    async translateOnDevice(texts: string[], source: string, target: string): Promise<(string | null)[] | null> {
        if (typeof window === 'undefined' || !texts.length) return null;
        try {
            const anyWin = window as unknown as Record<string, unknown>;
            const src = source.split('-')[0].toLowerCase();
            const tgt = target.split('-')[0].toLowerCase();
            const key = `${src}:${tgt}`;

            interface TranslatorInstance {
                translate: (text: string) => Promise<string>;
                destroy?: () => void;
            }

            let translator: TranslatorInstance | null = null;

            if (this.activeTranslator?.key === key) {
                translator = this.activeTranslator.instance;
            } else {
                if (this.activeTranslator?.instance?.destroy) {
                    try { this.activeTranslator.instance.destroy(); } catch {}
                }
                this.activeTranslator = null;

                // 1. Chrome 131+ Translator.create()
                const TranslatorClass = anyWin['Translator'] as { create?: (opt: { sourceLanguage: string; targetLanguage: string }) => Promise<TranslatorInstance> } | undefined;
                if (TranslatorClass && typeof TranslatorClass.create === 'function') {
                    translator = await TranslatorClass.create({ sourceLanguage: src, targetLanguage: tgt });
                } else {
                    // 2. W3C translation.createTranslator()
                    const translationObj = anyWin['translation'] as { createTranslator?: (opt: { sourceLanguage: string; targetLanguage: string }) => Promise<TranslatorInstance> } | undefined;
                    if (translationObj && typeof translationObj.createTranslator === 'function') {
                        translator = await translationObj.createTranslator({ sourceLanguage: src, targetLanguage: tgt });
                    } else {
                        // 3. Early AI Translator
                        const aiObj = anyWin['ai'] as { translator?: { create?: (opt: { sourceLanguage: string; targetLanguage: string }) => Promise<TranslatorInstance> } } | undefined;
                        if (aiObj?.translator && typeof aiObj.translator.create === 'function') {
                            translator = await aiObj.translator.create({ sourceLanguage: src, targetLanguage: tgt });
                        }
                    }
                }

                if (translator && typeof translator.translate === 'function') {
                    this.activeTranslator = { key, instance: translator };
                }
            }

            if (!translator || typeof translator.translate !== 'function') return null;

            const results = await Promise.all(
                texts.map(async text => {
                    const trimmed = text?.trim();
                    if (!trimmed) return null;
                    try {
                        const translated = await translator!.translate(trimmed);
                        return (typeof translated === 'string' && translated.trim().length > 0) ? translated.trim() : null;
                    } catch {
                        return null;
                    }
                })
            );

            // If at least one translation succeeded, return array
            if (results.some(r => r !== null)) {
                return results;
            }
        } catch (e) {
            console.warn('[TranslationService] On-device translation exception:', e);
            if (this.activeTranslator?.instance?.destroy) {
                try { this.activeTranslator.instance.destroy(); } catch {}
            }
            this.activeTranslator = null;
        }
        return null;
    }

    /**
     * Batch translate multiple texts at once
     * Prioritizes on-device browser translation first, then falls back to cloud batch queue
     */
    translateBatch(texts: string[], source: string, target: string, priority: 'high' | 'background' = 'high'): Observable<(string | null)[]> {
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

        // Deduplicate texts before sending to server (saves payload and translation quota)
        const uniqueTexts: string[] = [];
        const textToIndices = new Map<string, number[]>();

        toTranslate.forEach(({ index, text }) => {
            if (!textToIndices.has(text)) {
                textToIndices.set(text, []);
                uniqueTexts.push(text);
            }
            textToIndices.get(text)!.push(index);
        });

        // Try on-device browser translation first
        return from(this.translateOnDevice(uniqueTexts, source, target)).pipe(
            switchMap(onDeviceTranslations => {
                if (onDeviceTranslations && onDeviceTranslations.length === uniqueTexts.length) {
                    const stillMissing: string[] = [];
                    const missingTextToIndices = new Map<string, number[]>();

                    onDeviceTranslations.forEach((translation, i) => {
                        const origText = uniqueTexts[i];
                        const targetIndices = textToIndices.get(origText) || [];
                        if (translation && (source === target || translation.trim() !== origText.trim())) {
                            targetIndices.forEach(idx => {
                                results[idx] = translation;
                            });
                            this.addToCache(`${source}:${target}:${origText}`, translation);
                        } else {
                            // Needs cloud fallback
                            stillMissing.push(origText);
                            missingTextToIndices.set(origText, targetIndices);
                        }
                    });

                    this.scheduleCacheSave();

                    // If all were translated on-device, complete immediately!
                    if (stillMissing.length === 0) {
                        return of(results);
                    }

                    // Otherwise fall back to cloud for the unhandled remainder
                    return this.dispatchCloudBatch(stillMissing, missingTextToIndices, results, source, target, priority);
                }

                // Complete fallback to cloud batch request
                return this.dispatchCloudBatch(uniqueTexts, textToIndices, results, source, target, priority);
            })
        );
    }

    private dispatchCloudBatch(
        uniqueTexts: string[],
        textToIndices: Map<string, number[]>,
        results: (string | null)[],
        source: string,
        target: string,
        priority: 'high' | 'background' = 'high'
    ): Observable<(string | null)[]> {
        return new Observable(observer => {
            const requestContext: BatchRequest = {
                params: {
                    texts: uniqueTexts,
                    source,
                    target
                },
                observer: {
                    next: (response: { translations: (string | null)[] }) => {
                        response.translations.forEach((translation, i) => {
                            const text = uniqueTexts[i];
                            const targetIndices = textToIndices.get(text) || [];
                            targetIndices.forEach(idx => {
                                results[idx] = translation;
                            });
                            if (translation && (source === target || translation.trim() !== text.trim())) {
                                this.addToCache(`${source}:${target}:${text}`, translation);
                            }
                        });
                        // Schedule save to storage (debounced)
                        this.scheduleCacheSave();

                        observer.next(results);
                        observer.complete();
                    },
                    error: (err: unknown) => observer.error(err),
                    complete: () => observer.complete()
                },
                priority,
                cancelled: false
            };

            this.requestQueue$.next(requestContext);

            // Teardown logic: mark as cancelled if subscriber unsubscribes
            return () => {
                requestContext.cancelled = true;
            };
        });
    }



    getDualSubtitles(videoId: string, sourceLang: string, targetLang: string, segments: { text: string; start: number; duration: number; }[] = [], onlyCache = false): Observable<{ text: string; start: number; duration: number; translation?: string }[]> {
        return this.http.post<{ segments: { text: string; start: number; duration: number; translation?: string }[] }>(environment.api.dualSubtitles, {
            videoId,
            sourceLang,
            targetLang,
            segments: onlyCache ? [] : segments,
            onlyCache
        }).pipe(
            retry({
                count: 3,
                delay: (error, retryCount) => {
                    // Only retry on 429 or 5xx, or if it timed out
                    if (error.status !== 429 && !error.status.toString().startsWith('5') && error.status !== 0) {
                        return throwError(() => error);
                    }

                    const retryAfterHeader = error.headers?.get('Retry-After');
                    let delayMs = 2000 * Math.pow(2, retryCount - 1); // 2s, 4s, 8s

                    if (retryAfterHeader) {
                        const seconds = parseInt(retryAfterHeader, 10);
                        if (!isNaN(seconds)) {
                            delayMs = seconds * 1000;
                        }
                    }

                    console.warn(`[Dual Subtitles] Request failed (${error.status}), retrying in ${delayMs}ms...`);
                    return timer(delayMs);
                }
            }),
            map(response => response.segments || []),
            catchError(err => {
                console.error('Dual subtitles failed after retries:', err);
                return of([]);
            })
        );
    }

    /**
     * Persist completed dual subtitle segments to Cloudflare R2 / server cache
     */
    saveDualSubtitles(
        videoId: string,
        sourceLang: string,
        targetLang: string,
        segments: { text: string; start: number; duration: number; translation?: string }[]
    ): Observable<boolean> {
        return this.http.post<{ success?: boolean; cached?: boolean }>(environment.api.dualSubtitles, {
            videoId,
            sourceLang,
            targetLang,
            segments,
            saveOnly: true
        }).pipe(
            map(res => Boolean(res.success || res.cached)),
            catchError(err => {
                console.warn('[Translation] Save dual subtitles to cache failed:', err);
                return of(false);
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
    }

    private loadCacheFromStorage(): void {
        try {
            const stored = localStorage.getItem(CACHE_KEY);
            if (stored) {
                const entries: [string, string][] = JSON.parse(stored);
                // Sanitize poisoned cache: discard entries where source != target but translation equals source text
                const validEntries = entries.filter(([key, trans]) => {
                    if (!trans || !trans.trim()) return false;
                    const parts = key.split(':');
                    if (parts.length >= 3) {
                        const src = parts[0];
                        const tgt = parts[1];
                        const orig = parts.slice(2).join(':');
                        if (src !== tgt && trans.trim() === orig.trim()) {
                            return false;
                        }
                    }
                    return true;
                });
                this.translationCache = new Map(validEntries.slice(-MAX_CACHE_SIZE));
                if (validEntries.length !== entries.length) {
                    this.saveCacheToStorage();
                }
            }
        } catch {
            // Ignore cache load errors
        }
    }

    private scheduleCacheSave(): void {
        if (this.storageSaveTimer) {
            clearTimeout(this.storageSaveTimer);
        }

        this.storageSaveTimer = setTimeout(() => {
            this.saveCacheToStorage();
        }, 5000); // 5 seconds debounce
    }

    private saveCacheToStorage(): void {
        try {
            const entries = Array.from(this.translationCache.entries());
            localStorage.setItem(CACHE_KEY, JSON.stringify(entries.slice(-MAX_CACHE_SIZE)));
            this.storageSaveTimer = null;
        } catch {
            // Ignore storage errors
        }
    }

    ngOnDestroy(): void {
        this.queueSubscription?.unsubscribe();
        this.requestQueue$.complete();
        if (this.activeTranslator?.instance?.destroy) {
            try { this.activeTranslator.instance.destroy(); } catch {}
        }
        this.activeTranslator = null;
        // Flush pending save on destroy
        if (this.storageSaveTimer) {
            clearTimeout(this.storageSaveTimer);
            this.saveCacheToStorage();
        }
    }

    /**
     * Supported languages for target translation
     */
    getSupportedTargetLanguages(): ReadonlyArray<LanguageOption> {
        return SUPPORTED_TARGET_LANGUAGES;
    }
}
