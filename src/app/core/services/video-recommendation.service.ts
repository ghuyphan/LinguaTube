import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';
import { RecommendedVideo } from '../../models';
import { VideoLevelService } from './video-level.service';

interface RecommendedVideosResponse {
    success: boolean;
    language: string;
    count: number;
    videos: RecommendedVideo[];
    source?: string;
}

@Injectable({
    providedIn: 'root'
})
export class VideoRecommendationService {
    private http = inject(HttpClient);
    private videoLevel = inject(VideoLevelService);

    // ==================== Reactive State ====================

    /** Recommended videos for the active learning language */
    readonly recommendedVideos = signal<RecommendedVideo[]>([]);

    /** Loading state */
    readonly isLoading = signal<boolean>(false);

    /** In-memory cache per language code */
    private readonly cache = new Map<string, RecommendedVideo[]>();

    /**
     * Load recommended videos with verified database transcripts for a given language
     * @param language Language code ('ja', 'ko', 'zh', 'en')
     * @param limit Number of videos to fetch (default 12)
     */
    async loadRecommendedVideos(language: string, limit = 12): Promise<RecommendedVideo[]> {
        if (!language) return [];

        const cacheKey = `${language}_${limit}`;
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey)!;
            this.recommendedVideos.set(cached);
            return cached;
        }

        this.isLoading.set(true);

        try {
            const response = await firstValueFrom(
                this.http.get<RecommendedVideosResponse>(`/api/recommended-videos?lang=${encodeURIComponent(language)}&limit=${limit}`)
                    .pipe(timeout(6000))
            );

            const rawVideos = response?.videos || [];
            const hydratedVideos = this.hydrateVideos(rawVideos, language);
            this.cache.set(cacheKey, hydratedVideos);
            this.recommendedVideos.set(hydratedVideos);
            return hydratedVideos;
        } catch (err) {
            console.warn('[VideoRecommendation] Failed to load remote recommended videos:', err);
            this.recommendedVideos.set([]);
            return [];
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Hydrate difficulty levels and tiers using VideoLevelService
     */
    private hydrateVideos(videos: RecommendedVideo[], language: string): RecommendedVideo[] {
        return videos.map(video => {
            let resolvedLevel = video.level;
            let resolvedTier = video.tier;

            if (resolvedLevel) {
                resolvedTier = this.videoLevel.labelToTier(resolvedLevel);
            } else {
                const detected = this.videoLevel.resolveLevel(video.videoId, language, video.title, video.channel);
                if (detected) {
                    resolvedLevel = detected.level;
                    resolvedTier = detected.tier;
                }
            }

            return {
                ...video,
                thumbnail: video.thumbnail || `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`,
                level: resolvedLevel,
                tier: resolvedTier
            };
        });
    }

    /**
     * Clear in-memory cache
     */
    clearCache(): void {
        this.cache.clear();
    }
}
