import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, timeout, Subject } from 'rxjs';
import { RecommendedVideo, ProficiencyLevelTier } from '../../models';
import { VideoLevelService } from './video-level.service';
import { HistoryService } from '../../features/history/history.service';
import { OfflineVocabularyRepository } from '../repositories/offline-vocabulary.repository';
import { environment } from '../../../environments/environment';

export interface LearnerRecommendationContext {
    watched: string[];
    inProgress: Record<string, number>;
    favorites: string[];
    topChannels: string[];
    dominantTier: string | null;
    vocabWords: string[];
}

interface RecommendedVideosResponse {
    success: boolean;
    language: string;
    count: number;
    offset?: number;
    hasMore?: boolean;
    videos: RecommendedVideo[];
    source?: string;
}

@Injectable({
    providedIn: 'root'
})
export class VideoRecommendationService {
    private http = inject(HttpClient);
    private videoLevel = inject(VideoLevelService);
    private historyService = inject(HistoryService);
    private vocabRepo = inject(OfflineVocabularyRepository);

    /** Stream emitting events when the user requests a home feed refresh (e.g. via bottom nav tap or pull gesture) */
    readonly refreshRequested$ = new Subject<void>();

    /** Deterministic session seed for consistent serendipity across infinite scroll pages */
    readonly sessionSeed = signal<number>(Math.floor(Math.random() * 1000000));

    /** Trigger a programmatic feed refresh from any UI component */
    triggerHomeFeedRefresh(): void {
        this.refreshRequested$.next();
    }

    constructor() {
        // Clean up legacy localStorage recommendation cache blobs to reclaim client storage
        try {
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && key.startsWith('voca_rec_videos_')) {
                    localStorage.removeItem(key);
                }
            }
        } catch { }
    }

    // ==================== Reactive State ====================

    /** Recommended videos for the active learning language */
    readonly recommendedVideos = signal<RecommendedVideo[]>([]);

    /** Active catalog search query (empty string when viewing default recommendations) */
    readonly activeSearchQuery = signal<string>('');

    /** Initial Loading state */
    readonly isLoading = signal<boolean>(false);

    /** Network/load error state */
    readonly hasError = signal<boolean>(false);

    /** Infinite scroll loading more state */
    readonly isLoadingMore = signal<boolean>(false);

    /** Whether more videos are available to load */
    readonly hasMore = signal<boolean>(true);

    /** In-memory cache per language code and tier (preserves instant back-navigation within the session) */
    private readonly cache = new Map<string, RecommendedVideo[]>();

    /** Monotonically increasing request sequence to discard stale responses on rapid switching */
    private activeRequestId = 0;

    /**
     * Check whether recommended videos for given language and tier are present in cache
     */
    hasCache(language: string, tier?: string, limit = 16, query = ''): boolean {
        if (!language) return false;
        const activeTier = tier && tier !== 'all' ? tier : undefined;
        const cleanQuery = query ? query.trim() : '';
        const cacheKey = `${language}_${activeTier || 'all'}_${limit}_${cleanQuery}`;
        const cached = this.cache.get(cacheKey);
        return !!cached && cached.length > 0 && !cached.some(v => !v.channelAvatar);
    }

    /**
     * Load recommended videos with verified database transcripts for a given language and optional difficulty tier
     * @param language Language code ('ja', 'ko', 'zh', 'en')
     * @param tier Optional proficiency tier ('beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced')
     * @param limit Number of videos to fetch (default 16 for rich responsive grid)
     * @param forceRefresh Force fresh reload from backend, bypassing and evicting in-memory cache
     * @param query Optional search term across titles and channels
     */
    async loadRecommendedVideos(language: string, tier?: string, limit = 16, forceRefresh = false, query?: string): Promise<RecommendedVideo[]> {
        if (!language) return [];

        const requestId = ++this.activeRequestId;
        const activeTier = tier && tier !== 'all' ? tier : undefined;
        const cleanQuery = typeof query === 'string' ? query.trim() : this.activeSearchQuery();
        this.activeSearchQuery.set(cleanQuery);

        const cacheKey = `${language}_${activeTier || 'all'}_${limit}_${cleanQuery}`;

        if (forceRefresh) {
            this.sessionSeed.set(Math.floor(Math.random() * 1000000));
            this.cache.delete(cacheKey);
            this.hasMore.set(true);
        } else {
            // Check in-memory cache (only valid non-empty entries with channel avatars)
            if (this.cache.has(cacheKey)) {
                const cached = this.cache.get(cacheKey)!;
                const hasMissingAvatars = cached.some(v => !v.channelAvatar);
                if (!hasMissingAvatars && cached.length > 0) {
                    this.recommendedVideos.set(cached);
                    this.hasMore.set(cached.length >= limit);
                    return cached;
                } else {
                    this.cache.delete(cacheKey);
                }
            }
        }

        this.isLoading.set(true);
        this.hasError.set(false);

        try {
            const endpoint = environment.api.recommendedVideos;
            const context = this.buildUserContext(language, activeTier);
            const seed = this.sessionSeed();

            const body = {
                lang: language,
                limit,
                offset: 0,
                tier: activeTier,
                q: cleanQuery || undefined,
                sessionSeed: seed,
                refresh: forceRefresh,
                context
            };

            let response: RecommendedVideosResponse | null = null;
            try {
                response = await firstValueFrom(
                    this.http.post<RecommendedVideosResponse>(endpoint, body)
                        .pipe(timeout(6000))
                );
            } catch {
                // Fallback to GET for offline/legacy servers
                let fallbackUrl = `${endpoint}?lang=${encodeURIComponent(language)}&limit=${limit}&offset=0&seed=${seed}`;
                if (activeTier) fallbackUrl += `&tier=${encodeURIComponent(activeTier)}`;
                if (cleanQuery) fallbackUrl += `&q=${encodeURIComponent(cleanQuery)}`;
                if (forceRefresh) fallbackUrl += `&refresh=true&_t=${Date.now()}`;
                response = await firstValueFrom(
                    this.http.get<RecommendedVideosResponse>(fallbackUrl)
                        .pipe(timeout(6000))
                );
            }

            const rawVideos = response?.videos || [];
            const rankedVideos = this.hydrateVideos(rawVideos, language, activeTier);
            const hasMoreFlag = response?.hasMore ?? (rawVideos.length >= limit);

            if (rankedVideos.length > 0) {
                this.cache.set(cacheKey, rankedVideos);
            }

            // Discard stale response if a newer request was triggered while in flight
            if (requestId !== this.activeRequestId) {
                return [];
            }

            this.hasMore.set(hasMoreFlag);
            this.recommendedVideos.set(rankedVideos);
            return rankedVideos;
        } catch (err) {
            if (requestId === this.activeRequestId) {
                console.warn('[VideoRecommendation] Failed to load remote recommended videos:', err);
                this.recommendedVideos.set([]);
                this.hasMore.set(false);
                this.hasError.set(true);
            }
            return [];
        } finally {
            if (requestId === this.activeRequestId) {
                this.isLoading.set(false);
            }
        }
    }

    /**
     * Clear search filter and restore default home recommendations
     */
    clearSearch(language: string, tier?: string, limit = 16): Promise<RecommendedVideo[]> {
        this.activeSearchQuery.set('');
        return this.loadRecommendedVideos(language, tier, limit, false, '');
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
        const cleanQuery = this.activeSearchQuery();

        this.isLoadingMore.set(true);

        try {
            const endpoint = environment.api.recommendedVideos;
            const context = this.buildUserContext(language, activeTier);
            const seed = this.sessionSeed();

            const body = {
                lang: language,
                limit,
                offset,
                tier: activeTier,
                q: cleanQuery || undefined,
                sessionSeed: seed,
                context
            };

            let response: RecommendedVideosResponse | null = null;
            try {
                response = await firstValueFrom(
                    this.http.post<RecommendedVideosResponse>(endpoint, body)
                        .pipe(timeout(7000))
                );
            } catch {
                let fallbackUrl = `${endpoint}?lang=${encodeURIComponent(language)}&limit=${limit}&offset=${offset}&seed=${seed}`;
                if (activeTier) fallbackUrl += `&tier=${encodeURIComponent(activeTier)}`;
                if (cleanQuery) fallbackUrl += `&q=${encodeURIComponent(cleanQuery)}`;
                response = await firstValueFrom(
                    this.http.get<RecommendedVideosResponse>(fallbackUrl)
                        .pipe(timeout(7000))
                );
            }

            const rawVideos = response?.videos || [];
            const ranked = this.hydrateVideos(rawVideos, language, activeTier);

            // Deduplicate against existing IDs
            const existingIds = new Set(currentList.map(v => v.videoId));
            const newUniqueVideos = ranked.filter(v => !existingIds.has(v.videoId));

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
     * Build compact learner context digest from local repositories (<1ms execution)
     */
    private buildUserContext(language: string, requestedTier?: string): LearnerRecommendationContext {
        const history = this.historyService.history() || [];
        const userVocab = this.vocabRepo.vocabulary() || [];

        const watched: string[] = [];
        const inProgress: Record<string, number> = {};
        const favorites: string[] = [];
        const channelCounts = new Map<string, number>();
        const tierCounts = new Map<string, number>();

        for (const item of history) {
            if (item.video_id) {
                const prog = item.progress || 0;
                if (prog >= 85) {
                    watched.push(item.video_id);
                } else if (prog >= 10) {
                    inProgress[item.video_id] = Math.round(prog);
                }
                if (item.is_favorite) {
                    favorites.push(item.video_id);
                }
            }
            if (item.channel) {
                const ch = item.channel.trim();
                channelCounts.set(ch, (channelCounts.get(ch) || 0) + 1);
            }
            if (item.level) {
                const tier = this.videoLevel.labelToTier(item.level);
                if (tier) {
                    tierCounts.set(tier, (tierCounts.get(tier) || 0) + 1);
                }
            }
        }

        // Top 5 most viewed channels
        const topChannels = Array.from(channelCounts.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(e => e[0]);

        // Dominant proficiency tier from history
        let dominantTier: string | null = null;
        if (!requestedTier || requestedTier === 'all') {
            let maxCount = 0;
            for (const [tier, count] of tierCounts.entries()) {
                if (count > maxCount) {
                    maxCount = count;
                    dominantTier = tier;
                }
            }
        }

        // Top 40 active SRS words for the learning language
        const vocabWords = userVocab
            .filter(v => v.language === language && v.level !== 'ignored' && v.word && v.word.trim().length >= 2)
            .slice(0, 40)
            .map(v => v.word.trim());

        return {
            watched: watched.slice(0, 100),
            inProgress,
            favorites: favorites.slice(0, 50),
            topChannels,
            dominantTier,
            vocabWords
        };
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
            const SUPPORTED_CODES = new Set(['ja', 'zh', 'ko', 'en']);
            if (Array.isArray(langs) && langs.length > 0) {
                const normalized = Array.from(new Set(
                    langs
                        .map(l => (typeof l === 'string' ? l.toLowerCase().trim().split('-')[0].split('_')[0] : ''))
                        .filter(l => SUPPORTED_CODES.has(l))
                ));
                if (targetLang && normalized.length > 1) {
                    normalized.sort((a, b) => (a === targetLang ? -1 : (b === targetLang ? 1 : 0)));
                }
                langs = normalized;
            } else {
                langs = [];
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
     * Clear in-memory cache
     */
    clearCache(): void {
        this.cache.clear();
    }
}
