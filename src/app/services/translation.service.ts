import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export interface TranslationResponse {
    translation: string;
    info?: any;
}

@Injectable({
    providedIn: 'root'
})
export class TranslationService {
    // Use local proxy in dev, direct URL could change depending on enviroment
    private readonly API_URL = '/api/translate';

    // Track loading state for specific translation requests (by ID or key)
    // We can use a Map to track individual translation requests
    private loadingStates = signal<Set<string>>(new Set());

    constructor(private http: HttpClient) { }

    /**
     * Translate text from source language to target language
     * @param text Text to translate
     * @param source Source language code (e.g., 'en')
     * @param target Target language code (e.g., 'es', 'vi')
     */
    translate(text: string, source: string, target: string): Observable<string | null> {
        if (!text.trim()) return of(null);

        const key = `${source}:${target}:${text}`;
        this.setLoading(key, true);

        // Lingva API format: /api/v1/{source}/{target}/{text}
        // Our proxy handles the base URL
        const url = `${this.API_URL}/${source}/${target}/${encodeURIComponent(text)}`;

        return this.http.get<TranslationResponse>(url).pipe(
            map(response => {
                this.setLoading(key, false);
                return response.translation || null;
            }),
            catchError(err => {
                console.error('Translation failed:', err);
                this.setLoading(key, false);
                return of(null);
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
     * Supported languages for target translation
     */
    getSupportedTargetLanguages(): Array<{ code: string, name: string, flag: string }> {
        return [
            { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
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
