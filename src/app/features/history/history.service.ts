import { Injectable, inject, signal, computed, effect, untracked } from '@angular/core';
import { HistoryItem, VideoInfo } from '../../models';
import { SettingsService, AuthService } from '../../core/services';
import { YoutubeService } from '../video';

const STORAGE_KEY = 'linguatube_history';
const MAX_LOCAL_HISTORY = 50;

/**
 * History Service
 * Manages watch history for both guest (localStorage) and logged-in (PocketBase) users
 */
@Injectable({
    providedIn: 'root'
})
export class HistoryService {
    private settings = inject(SettingsService);
    private auth = inject(AuthService);
    private youtube = inject(YoutubeService);

    /** All history items, sorted by watched_at descending */
    readonly history = signal<HistoryItem[]>([]);

    /** Computed: favorites only */
    readonly favorites = computed(() => this.history().filter(item => item.is_favorite));

    /** Computed: history for current language */
    readonly historyByLanguage = computed(() => {
        const lang = this.settings.settings().language;
        return this.history().filter(item => item.language === lang);
    });

    /** Computed: count of history items */
    readonly count = computed(() => this.history().length);

    constructor() {
        this.loadFromStorage();

        // Persist changes to localStorage
        effect(() => {
            const items = this.history();
            untracked(() => this.saveToStorage(items));
        });

        // Auto-track when videos are loaded
        this.youtube.videoLoaded.subscribe(video => {
            const language = this.settings.settings().language;
            this.addToHistory(video, language);
        });
    }

    /**
     * Add or update a video in history
     * If the video already exists, updates watched_at and progress
     */
    addToHistory(video: VideoInfo, language: 'ja' | 'zh' | 'ko' | 'en', progress: number = 0): void {
        const items = [...this.history()];
        const existingIndex = items.findIndex(item => item.video_id === video.id);

        const historyItem: HistoryItem = {
            id: existingIndex >= 0 ? items[existingIndex].id : this.generateId(),
            video_id: video.id,
            title: video.title,
            thumbnail: video.thumbnail || `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`,
            channel: video.channel,
            duration: video.duration,
            language,
            watched_at: new Date(),
            progress: existingIndex >= 0 ? Math.max(items[existingIndex].progress, progress) : progress,
            is_favorite: existingIndex >= 0 ? items[existingIndex].is_favorite : false
        };

        if (existingIndex >= 0) {
            // Update existing entry
            items[existingIndex] = historyItem;
        } else {
            // Add new entry at the beginning
            items.unshift(historyItem);
        }

        // Enforce max limit for local storage (FIFO)
        if (items.length > MAX_LOCAL_HISTORY && !this.auth.isLoggedIn()) {
            items.splice(MAX_LOCAL_HISTORY);
        }

        // Sort by watched_at descending
        items.sort((a, b) => new Date(b.watched_at).getTime() - new Date(a.watched_at).getTime());

        this.history.set(items);
    }

    /**
     * Update watch progress for a video
     */
    updateProgress(videoId: string, progress: number): void {
        const items = this.history();
        const index = items.findIndex(item => item.video_id === videoId);

        if (index >= 0) {
            const updated = [...items];
            updated[index] = {
                ...updated[index],
                progress: Math.max(updated[index].progress, progress),
                watched_at: new Date()
            };
            this.history.set(updated);
        }
    }

    /**
     * Toggle favorite status
     */
    toggleFavorite(id: string): void {
        const items = this.history();
        const index = items.findIndex(item => item.id === id);

        if (index >= 0) {
            const updated = [...items];
            updated[index] = {
                ...updated[index],
                is_favorite: !updated[index].is_favorite
            };
            this.history.set(updated);
        }
    }

    /**
     * Remove a single item from history
     */
    removeFromHistory(id: string): void {
        this.history.set(this.history().filter(item => item.id !== id));
    }

    /**
     * Clear all history
     */
    clearHistory(): void {
        this.history.set([]);
    }

    /**
     * Get history item by video ID
     */
    getByVideoId(videoId: string): HistoryItem | undefined {
        return this.history().find(item => item.video_id === videoId);
    }

    /**
     * Import items (used by sync service)
     */
    importItems(items: HistoryItem[]): void {
        this.history.set(items);
    }

    /**
     * Get all items (for sync)
     */
    getAllItems(): HistoryItem[] {
        return this.history();
    }

    // ==================== Private Methods ====================

    private loadFromStorage(): void {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                const items: HistoryItem[] = (data.items || []).map((item: any) => ({
                    ...item,
                    watched_at: new Date(item.watched_at)
                }));
                this.history.set(items);
            }
        } catch (e) {
            console.warn('[History] Failed to load from storage:', e);
        }
    }

    private saveToStorage(items: HistoryItem[]): void {
        try {
            const data = {
                items: items.slice(0, MAX_LOCAL_HISTORY),
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('[History] Failed to save to storage:', e);
        }
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
}
