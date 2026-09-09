import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, timeout } from 'rxjs';
import { RecommendedVideo, ProficiencyLevelTier } from '../../models';
import { VideoLevelService } from './video-level.service';
import { environment } from '../../../environments/environment';

interface RecommendedVideosResponse {
    success: boolean;
    language: string;
    count: number;
    offset?: number;
    hasMore?: boolean;
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

    /** Initial Loading state */
    readonly isLoading = signal<boolean>(false);

    /** Infinite scroll loading more state */
    readonly isLoadingMore = signal<boolean>(false);

    /** Whether more videos are available to load */
    readonly hasMore = signal<boolean>(true);

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
            this.hasMore.set(true);
            try {
                localStorage.removeItem(LS_CACHE_PREFIX + cacheKey);
            } catch { }
        } else {
            // 1. Check in-memory cache (only valid non-empty entries)
            if (this.cache.has(cacheKey)) {
                const cached = this.cache.get(cacheKey)!;
                if (cached.length > 0) {
                    this.recommendedVideos.set(cached);
                    this.hasMore.set(cached.length >= limit);
                    return cached;
                } else {
                    this.cache.delete(cacheKey);
                }
            }

            // 2. Check LocalStorage cache (persists across page reloads/navigations)
            try {
                const raw = localStorage.getItem(LS_CACHE_PREFIX + cacheKey);
                if (raw) {
                    const parsed: LocalStorageCacheEntry = JSON.parse(raw);
                    if (Date.now() - parsed.timestamp < LS_CACHE_TTL_MS && Array.isArray(parsed.videos) && parsed.videos.length > 0) {
                        this.cache.set(cacheKey, parsed.videos);
                        this.recommendedVideos.set(parsed.videos);
                        this.hasMore.set(parsed.videos.length >= limit);
                        return parsed.videos;
                    } else if (Array.isArray(parsed.videos) && parsed.videos.length === 0) {
                        localStorage.removeItem(LS_CACHE_PREFIX + cacheKey);
                    }
                }
            } catch {
                // Ignore localStorage read errors
            }
        }

        this.isLoading.set(true);

        try {
            const endpoint = environment.api.recommendedVideos;
            let url = `${endpoint}?lang=${encodeURIComponent(language)}&limit=${limit}&offset=0`;
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
            const hydratedVideos = this.hydrateVideos(rawVideos, language, activeTier);
            const hasMoreFlag = response?.hasMore ?? (rawVideos.length >= limit);
            this.hasMore.set(hasMoreFlag);

            if (hydratedVideos.length > 0) {
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
            }

            this.recommendedVideos.set(hydratedVideos);
            return hydratedVideos;
        } catch (err) {
            console.warn('[VideoRecommendation] Failed to load remote recommended videos:', err);
            this.recommendedVideos.set([]);
            this.hasMore.set(false);
            return [];
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Load more recommended videos (infinite scrolling pagination)
     * Appends unique videos to the existing recommendedVideos signal
     */
    async loadMoreRecommendedVideos(language: string, tier?: string, limit = 12): Promise<RecommendedVideo[]> {
        if (!language || !this.hasMore() || this.isLoadingMore() || this.isLoading()) {
            return [];
        }

        const currentList = this.recommendedVideos();
        const offset = currentList.length;
        const activeTier = tier && tier !== 'all' ? tier : undefined;

        this.isLoadingMore.set(true);

        try {
            const endpoint = environment.api.recommendedVideos;
            let url = `${endpoint}?lang=${encodeURIComponent(language)}&limit=${limit}&offset=${offset}`;
            if (activeTier) {
                url += `&tier=${encodeURIComponent(activeTier)}`;
            }

            const response = await firstValueFrom(
                this.http.get<RecommendedVideosResponse>(url)
                    .pipe(timeout(7000))
            );

            const rawVideos = response?.videos || [];
            const hydrated = this.hydrateVideos(rawVideos, language, activeTier);

            // Deduplicate against existing IDs
            const existingIds = new Set(currentList.map(v => v.videoId));
            const newUniqueVideos = hydrated.filter(v => !existingIds.has(v.videoId));

            const hasMoreFlag = response?.hasMore ?? (rawVideos.length >= limit);
            this.hasMore.set(hasMoreFlag && newUniqueVideos.length > 0);

            if (newUniqueVideos.length > 0) {
                const updatedList = [...currentList, ...newUniqueVideos];
                this.recommendedVideos.set(updatedList);
                return newUniqueVideos;
            } else {
                this.hasMore.set(false);
                return [];
            }
        } catch (err) {
            console.warn('[VideoRecommendation] Failed to load more videos:', err);
            return [];
        } finally {
            this.isLoadingMore.set(false);
        }
    }

    /**
     * Hydrate difficulty levels and tiers using VideoLevelService
     */
    private hydrateVideos(videos: RecommendedVideo[], language: string, requestedTier?: string): RecommendedVideo[] {
        return videos.map(video => {
            let resolvedLevel = video.level;
            let resolvedTier = video.tier || (requestedTier && requestedTier !== 'all' ? requestedTier as ProficiencyLevelTier : undefined);

            if (resolvedLevel) {
                resolvedTier = this.videoLevel.labelToTier(resolvedLevel);
            } else if (resolvedTier) {
                resolvedLevel = this.videoLevel.tierToLabel(resolvedTier as ProficiencyLevelTier, language);
            } else {
                const detected = this.videoLevel.resolveLevel(video.videoId, language, video.title, video.channel);
                if (detected) {
                    resolvedLevel = detected.level;
                    resolvedTier = detected.tier;
                } else {
                    resolvedTier = 'elementary';
                    resolvedLevel = this.videoLevel.tierToLabel('elementary', language);
                }
            }

            const targetLang = (language || '').toLowerCase().trim();
            let langs = video.languages;
            if (Array.isArray(langs) && langs.length > 0) {
                const normalized = Array.from(new Set(
                    langs.map(l => (typeof l === 'string' ? l.toLowerCase().trim().split('-')[0].split('_')[0] : '')).filter(Boolean)
                ));
                if (targetLang && normalized.length > 1) {
                    normalized.sort((a, b) => (a === targetLang ? -1 : (b === targetLang ? 1 : 0)));
                }
                langs = normalized.length > 0 ? normalized : [targetLang || 'ja'];
            } else {
                langs = [targetLang || 'ja'];
            }

            return {
                ...video,
                thumbnail: video.thumbnail || `https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`,
                languages: langs,
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
