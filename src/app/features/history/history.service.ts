import { Injectable, inject, computed } from '@angular/core';
import { HistoryItem, VideoInfo } from '../../models';
import { SettingsService, AuthService } from '../../core/services';
import { YoutubeService } from '../video';
import { OfflineHistoryRepository } from '../../core/repositories';

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
    private repo = inject(OfflineHistoryRepository);

    /** All history items, sorted by watched_at descending */
    readonly history = this.repo.getHistory();

    /** Computed: favorites only */
    readonly favorites = computed(() => this.history().filter(item => item.is_favorite));

    /** Computed: history for current language */
    readonly historyByLanguage = computed(() => {
        const lang = this.settings.settings().language;
        return this.history().filter(item => item.languages?.includes(lang) ?? item.language === lang);
    });

    /** Computed: count of history items */
    readonly count = computed(() => this.history().length);

    readonly isLoading = this.repo.isLoading;

    constructor() {
        // Repository handles loading
    }

    /**
     * Add or update a video in history
     * If the video already exists, updates watched_at, progress, and languages
     * @param availableLanguages - raw language codes from transcript API (will be filtered)
     */
    async addToHistory(video: VideoInfo, availableLanguages: string[], progress: number = 0): Promise<void> {
        const items = this.history();
        const existingItem = items.find(item => item.video_id === video.id);
        const filteredLanguages = this.filterSupportedLanguages(availableLanguages);
        const primaryLang = filteredLanguages[0] || 'en';

        const historyItem: HistoryItem = {
            id: existingItem ? existingItem.id : this.generateId(),
            video_id: video.id,
            title: video.title,
            thumbnail: video.thumbnail || `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`,
            channel: video.channel,
            duration: video.duration,
            language: primaryLang,  // Keep for backward compatibility
            languages: filteredLanguages,
            watched_at: new Date(),
            progress: existingItem ? Math.max(existingItem.progress, progress) : progress,
            is_favorite: existingItem ? existingItem.is_favorite : false
        };

        await this.repo.addToHistory(historyItem);
    }

    /**
     * Update watch progress for a video
     */
    async updateProgress(videoId: string, progress: number): Promise<void> {
        const items = this.history();
        const item = items.find(i => i.video_id === videoId);

        if (item) {
            await this.repo.addToHistory({
                ...item,
                progress: Math.max(item.progress, progress),
                watched_at: new Date()
            });
        }
    }

    /**
     * Toggle favorite status
     */
    async toggleFavorite(id: string): Promise<void> {
        const items = this.history();
        const item = items.find(i => i.id === id);

        if (item) {
            await this.repo.addToHistory({
                ...item,
                is_favorite: !item.is_favorite
            });
        }
    }

    /**
     * Remove a single item from history
     */
    async removeFromHistory(id: string): Promise<void> {
        await this.repo.removeFromHistory(id);
    }

    /**
     * Restore a deleted history item (used for undo)
     */
    async restoreItem(item: HistoryItem): Promise<void> {
        await this.repo.addToHistory(item);
    }

    /**
     * Clear all history
     */
    async clearHistory(): Promise<void> {
        await this.repo.clearHistory();
    }

    /**
     * Refresh / sync history with remote
     */
    async refresh(): Promise<void> {
        await this.repo.refresh();
    }

    /**
     * Get history item by video ID
     */
    getByVideoId(videoId: string): HistoryItem | undefined {
        return this.history().find(item => item.video_id === videoId);
    }

    /**
     * Import items (used by sync service)
     * Note: Deprecated in favor of Repo sync, but kept for interface compatibility if needed
     */
    importItems(_items: HistoryItem[]): void {
        // this.history.set(items); // Read-only now
        console.warn('HistoryService.importItems is deprecated, use repository sync');
    }

    /**
     * Get all items (for sync)
     */
    getAllItems(): HistoryItem[] {
        return this.history();
    }

    // ==================== Private Methods ====================

    /**
     * Filter and normalize language codes to only supported languages (CJK + EN)
     * e.g., 'zh-TW' → 'zh', 'ja-JP' → 'ja'
     */
    private filterSupportedLanguages(langs: string[]): ('ja' | 'zh' | 'ko' | 'en')[] {
        const supported = ['ja', 'zh', 'ko', 'en'];
        const normalized = langs
            .map(l => l.split('-')[0].toLowerCase())
            .filter(l => supported.includes(l));
        // Return unique values only
        return [...new Set(normalized)] as ('ja' | 'zh' | 'ko' | 'en')[];
    }

    private generateId(): string {
        // Generate a 15-character random string (PocketBase compatible)
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 15; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}
