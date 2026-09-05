import { Injectable, inject, computed, effect, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HistoryItem, VideoInfo } from '../../models';
import { YoutubeService } from '../video';
import { OfflineHistoryRepository } from '../../core/repositories';
import { generateRandomId, getYouTubeThumbnail } from '../../core/utils';

/**
 * History Service
 * Manages watch history for both guest (localStorage) and logged-in (PocketBase) users
 */
@Injectable({
    providedIn: 'root'
})
export class HistoryService {
    private platformId = inject(PLATFORM_ID);
    private youtube = inject(YoutubeService);
    private repo = inject(OfflineHistoryRepository);

    /** All history items, sorted by watched_at descending */
    readonly history = this.repo.getHistory();

    /** Computed: favorites only */
    readonly favorites = computed(() => this.history().filter(item => item.is_favorite));

    readonly isLoading = this.repo.isLoading;

    private progressInterval: ReturnType<typeof setInterval> | null = null;
    private lastRecordedProgress = -1;
    private lastRecordedVideoId: string | null = null;

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            // Automatically track any video loaded in the player
            this.youtube.videoLoaded.subscribe(video => {
                void this.onVideoLoaded(video);
            });

            // Reactive playback progress tracking
            effect(() => {
                const isPlaying = this.youtube.isPlaying();
                const isEnded = this.youtube.isEnded();
                const currentVideo = this.youtube.currentVideo();

                if (isEnded && currentVideo) {
                    this.stopProgressTracking();
                    this.checkAndSaveProgress(100);
                } else if (isPlaying && currentVideo) {
                    this.startProgressTracking();
                } else {
                    this.stopProgressTracking();
                    if (currentVideo) {
                        this.checkAndSaveProgress();
                    }
                }
            });

            // Flush progress when closing tab or navigating away
            window.addEventListener('beforeunload', () => {
                this.checkAndSaveProgress();
            });
            window.addEventListener('pagehide', () => {
                this.checkAndSaveProgress();
            });
        }
    }

    private async onVideoLoaded(video: VideoInfo): Promise<void> {
        this.lastRecordedVideoId = video.id;
        this.lastRecordedProgress = -1;
        await this.addToHistory(video, []);
    }

    private startProgressTracking(): void {
        if (this.progressInterval) return;

        this.progressInterval = setInterval(() => {
            this.checkAndSaveProgress();
        }, 3000);
    }

    private stopProgressTracking(): void {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    private checkAndSaveProgress(forceProgress?: number): void {
        const video = this.youtube.currentVideo();
        if (!video) return;

        const duration = this.youtube.duration();
        const currentTime = this.youtube.currentTime();

        let progress: number;
        if (forceProgress !== undefined) {
            progress = forceProgress;
        } else if (duration > 0 && currentTime > 0) {
            progress = Math.min(100, Math.round((currentTime / duration) * 100));
        } else {
            return;
        }

        if (this.lastRecordedVideoId === video.id && this.lastRecordedProgress === progress) {
            return;
        }

        this.lastRecordedVideoId = video.id;
        this.lastRecordedProgress = progress;

        void this.updateProgress(video.id, progress);
    }

    /**
     * Add or update a video in history
     * If the video already exists, updates watched_at, progress, and languages
     * @param availableLanguages - raw language codes from transcript API (will be filtered)
     */
    async addToHistory(video: VideoInfo, availableLanguages: string[] = [], progress?: number): Promise<void> {
        const items = this.history();
        const existingItem = items.find(item => item.video_id === video.id);
        const filteredLanguages = this.filterSupportedLanguages(availableLanguages);
        const primaryLang = filteredLanguages[0] || existingItem?.language || 'en';

        const resolvedProgress = progress !== undefined
            ? progress
            : (existingItem ? existingItem.progress : 0);

        const historyItem: HistoryItem = {
            id: existingItem ? existingItem.id : generateRandomId(),
            video_id: video.id,
            title: video.title || existingItem?.title || 'YouTube Video',
            thumbnail: video.thumbnail || existingItem?.thumbnail || getYouTubeThumbnail(video.id),
            channel: video.channel || existingItem?.channel || 'Unknown Channel',
            duration: video.duration || existingItem?.duration || 0,
            language: primaryLang,  // Keep for backward compatibility
            languages: filteredLanguages.length > 0 ? filteredLanguages : (existingItem?.languages || []),
            watched_at: new Date(),
            progress: resolvedProgress,
            is_favorite: existingItem ? existingItem.is_favorite : false
        };

        await this.repo.addToHistory(historyItem);
    }

    /**
     * Update watch progress for a video
     */
    async updateProgress(videoId: string, progress: number): Promise<void> {
        const item = this.getByVideoId(videoId);

        if (item) {
            await this.repo.addToHistory({
                ...item,
                progress,
                watched_at: new Date()
            });
        }
    }

    /**
     * Touch a video to update its watched_at timestamp to now,
     * ensuring it appears at the top of history.
     */
    async touchVideo(videoId: string): Promise<void> {
        const item = this.getByVideoId(videoId);
        if (item) {
            await this.updateProgress(videoId, item.progress);
        }
    }

    /**
     * Update languages when captions are fetched
     */
    async updateLanguages(videoId: string, availableLanguages: string[]): Promise<void> {
        const items = this.history();
        const item = items.find(i => i.video_id === videoId);

        if (item) {
            const filteredLanguages = this.filterSupportedLanguages(availableLanguages);
            if (filteredLanguages.length > 0) {
                await this.repo.addToHistory({
                    ...item,
                    languages: filteredLanguages,
                    language: filteredLanguages[0] || item.language
                });
            }
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
}
