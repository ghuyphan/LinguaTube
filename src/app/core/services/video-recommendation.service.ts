import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';
import { RecommendedVideo } from '../../models';
import { VideoLevelService } from './video-level.service';
import { environment } from '../../../environments/environment';

interface RecommendedVideosResponse {
    success: boolean;
    language: string;
    count: number;
    videos: RecommendedVideo[];
    source?: string;
}

const LS_CACHE_PREFIX = 'voca_rec_videos_';
const LS_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

interface LocalStorageCacheEntry {
    timestamp: number;
    videos: RecommendedVideo[];
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
     * Load recommended videos with verified database transcripts for a given language and optional difficulty tier
     * @param language Language code ('ja', 'ko', 'zh', 'en')
     * @param tier Optional proficiency tier ('beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced')
     * @param limit Number of videos to fetch (default 12)
     * @param forceRefresh Force fresh reload from backend, bypassing and evicting in-memory and LocalStorage caches
     */
    async loadRecommendedVideos(language: string, tier?: string, limit = 12, forceRefresh = false): Promise<RecommendedVideo[]> {
        if (!language) return [];

        const activeTier = tier && tier !== 'all' ? tier : undefined;
        const cacheKey = `${language}_${activeTier || 'all'}_${limit}`;

        if (forceRefresh) {
            this.cache.delete(cacheKey);
            try {
                localStorage.removeItem(LS_CACHE_PREFIX + cacheKey);
            } catch { }
        } else {
            // 1. Check in-memory cache
            if (this.cache.has(cacheKey)) {
                const cached = this.cache.get(cacheKey)!;
                this.recommendedVideos.set(cached);
                return cached;
            }

            // 2. Check LocalStorage cache (persists across page reloads/navigations)
            try {
                const raw = localStorage.getItem(LS_CACHE_PREFIX + cacheKey);
                if (raw) {
                    const parsed: LocalStorageCacheEntry = JSON.parse(raw);
                    if (Date.now() - parsed.timestamp < LS_CACHE_TTL_MS && Array.isArray(parsed.videos) && parsed.videos.length > 0) {
                        this.cache.set(cacheKey, parsed.videos);
                        this.recommendedVideos.set(parsed.videos);
                        return parsed.videos;
                    }
                }
            } catch {
                // Ignore localStorage read errors
            }
        }

        this.isLoading.set(true);

        try {
            const endpoint = environment.api.recommendedVideos;
            let url = `${endpoint}?lang=${encodeURIComponent(language)}&limit=${limit}`;
            if (activeTier) {
                url += `&tier=${encodeURIComponent(activeTier)}`;
            }
            if (forceRefresh) {
                url += `&refresh=true&_t=${Date.now()}`;
            }

            const response = await firstValueFrom(
                this.http.get<RecommendedVideosResponse>(url)
                    .pipe(timeout(6000))
            );

            const rawVideos = response?.videos || [];
            const hydratedVideos = this.hydrateVideos(rawVideos, language);
            this.cache.set(cacheKey, hydratedVideos);

            // Persist to LocalStorage
            try {
                const entry: LocalStorageCacheEntry = {
                    timestamp: Date.now(),
                    videos: hydratedVideos
                };
                localStorage.setItem(LS_CACHE_PREFIX + cacheKey, JSON.stringify(entry));
            } catch {
                // Ignore localStorage quota errors
            }

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
     * Clear in-memory and persistent cache
     */
    clearCache(): void {
        this.cache.clear();
        try {
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && key.startsWith(LS_CACHE_PREFIX)) {
                    localStorage.removeItem(key);
                }
            }
        } catch {
            // Ignore localStorage errors
        }
    }
}
