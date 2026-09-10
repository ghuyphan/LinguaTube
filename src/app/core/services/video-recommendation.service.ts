import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, timeout, Subject } from 'rxjs';
import { RecommendedVideo, ProficiencyLevelTier } from '../../models';
import { VideoLevelService } from './video-level.service';
import { HistoryService } from '../../features/history/history.service';
import { OfflineVocabularyRepository } from '../repositories/offline-vocabulary.repository';
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

    /** Initial Loading state */
    readonly isLoading = signal<boolean>(false);

    /** Infinite scroll loading more state */
    readonly isLoadingMore = signal<boolean>(false);

    /** Whether more videos are available to load */
    readonly hasMore = signal<boolean>(true);

    /** In-memory cache per language code and tier (preserves instant back-navigation within the session) */
    private readonly cache = new Map<string, RecommendedVideo[]>();

    /**
     * Load recommended videos with verified database transcripts for a given language and optional difficulty tier
     * @param language Language code ('ja', 'ko', 'zh', 'en')
     * @param tier Optional proficiency tier ('beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced')
     * @param limit Number of videos to fetch (default 16 for rich responsive grid)
     * @param forceRefresh Force fresh reload from backend, bypassing and evicting in-memory cache
     */
    async loadRecommendedVideos(language: string, tier?: string, limit = 16, forceRefresh = false): Promise<RecommendedVideo[]> {
        if (!language) return [];

        const activeTier = tier && tier !== 'all' ? tier : undefined;
        const cacheKey = `${language}_${activeTier || 'all'}_${limit}`;

        if (forceRefresh) {
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
            const rankedVideos = this.rankRecommendedVideos(hydratedVideos, language, activeTier);
            const hasMoreFlag = response?.hasMore ?? (rawVideos.length >= limit);
            this.hasMore.set(hasMoreFlag);

            if (rankedVideos.length > 0) {
                this.cache.set(cacheKey, rankedVideos);
            }

            this.recommendedVideos.set(rankedVideos);
            return rankedVideos;
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
            const ranked = this.rankRecommendedVideos(hydrated, language, activeTier);

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
     * YouTube & Language Learning Multi-Factor Ranking Engine
     * 
     * Factors:
     * 1. Watch Progress & Completion (Unwatched prioritized, in-progress boosted for resume, completed demoted)
     * 2. Creator Affinity (Frequent channels in user history boosted)
     * 3. Vocabulary Overlap (Videos containing words from user's active flashcard notebook boosted)
     * 4. Pedagogical Duration Sweet Spot (3 to 12 minutes favored for optimal retention)
     * 5. Krashen i+1 Level Balancing (User's dominant proficiency tier + stretch tier)
     * 6. YouTube Anti-Clustering (Spreading out consecutive videos from the same creator)
     */
    private rankRecommendedVideos(
        videos: RecommendedVideo[],
        language: string,
        requestedTier?: string
    ): RecommendedVideo[] {
        if (!videos || videos.length === 0) return [];

        const history = this.historyService.history() || [];
        const userVocab = this.vocabRepo.vocabulary() || [];

        // 1. Pre-calculate Creator Affinity & User Level Profile from History
        const channelFrequency = new Map<string, number>();
        const historyMap = new Map<string, { progress: number; isFavorite: boolean }>();
        const tierCounts = new Map<string, number>();

        for (const item of history) {
            if (item.video_id) {
                historyMap.set(item.video_id, {
                    progress: item.progress || 0,
                    isFavorite: Boolean(item.is_favorite)
                });
            }
            if (item.channel) {
                const normChannel = item.channel.toLowerCase().trim();
                channelFrequency.set(normChannel, (channelFrequency.get(normChannel) || 0) + 1);
            }
            if (item.level) {
                const tier = this.videoLevel.labelToTier(item.level);
                if (tier) {
                    tierCounts.set(tier, (tierCounts.get(tier) || 0) + 1);
                }
            }
        }

        // Determine dominant user tier from watch history if no explicit tier requested
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

        // Filter active vocabulary words for the learning language
        const activeWords = userVocab
            .filter(v => v.language === language && v.level !== 'ignored' && v.word && v.word.trim().length >= 2)
            .map(v => v.word.trim());

        const TIERS_ORDER: ProficiencyLevelTier[] = ['beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced'];

        // 2. Score each candidate video
        const scoredVideos = videos.map(video => {
            let score = 0;
            const historyEntry = historyMap.get(video.videoId);

            // Factor A: History & Completion State
            if (!historyEntry) {
                // Completely new / unwatched
                score += 40;
            } else {
                const progress = historyEntry.progress;
                if (progress >= 85) {
                    // Completed video -> heavily demote to end of feed
                    score -= 70;
                } else if (progress >= 10 && progress < 85) {
                    // In-progress: "Resume Learning" boost
                    score += 35;
                    video.resumeProgress = Math.round(progress);
                } else {
                    // Barely started (< 10%)
                    score += 15;
                }
                if (historyEntry.isFavorite) {
                    score += 20;
                }
            }

            // Factor B: Creator / Channel Affinity (YouTube style)
            if (video.channel) {
                const normChannel = video.channel.toLowerCase().trim();
                const watchCount = channelFrequency.get(normChannel) || 0;
                if (watchCount > 0) {
                    score += Math.min(watchCount * 10, 30);
                }
            }

            // Factor C: Vocabulary Overlap (Language learning superpower)
            if (activeWords.length > 0 && video.title) {
                const titleLower = video.title.toLowerCase();
                const matched: string[] = [];
                for (const w of activeWords) {
                    if (titleLower.includes(w.toLowerCase())) {
                        matched.push(w);
                        if (matched.length >= 5) break;
                    }
                }
                if (matched.length > 0) {
                    video.matchedWords = matched;
                    score += 25 + Math.min(matched.length * 5, 20); // up to +45 pts
                }
            }

            // Factor D: Duration Sweet Spot (YouTube / micro-learning)
            const d = video.duration || 0;
            if (d >= 180 && d <= 720) {
                score += 20; // 3 to 12 mins (optimal study session)
            } else if (d > 720 && d <= 1200) {
                score += 10; // 12 to 20 mins
            } else if (d > 0 && (d < 90 || d > 2400)) {
                score -= 10; // < 1.5 min or > 40 min
            }

            // Factor E: Krashen i+1 Comprehensible Input
            if (dominantTier && video.tier) {
                if (video.tier === dominantTier) {
                    score += 20; // exact comfort zone
                } else {
                    const domIndex = TIERS_ORDER.indexOf(dominantTier as ProficiencyLevelTier);
                    const videoIndex = TIERS_ORDER.indexOf(video.tier);
                    if (videoIndex === domIndex + 1) {
                        score += 12; // stretch i+1 goal
                    }
                }
            }

            // Factor F: Exploration Jitter (adds +/- 4 points for serendipity)
            score += (Math.random() * 8) - 4;

            return { video, score };
        });

        // 3. Sort primarily by score descending
        scoredVideos.sort((a, b) => b.score - a.score);
        const sorted = scoredVideos.map(sv => sv.video);

        // 4. Channel Anti-Clustering (YouTube Spacing: avoid adjacent same-channel videos)
        return this.declusterChannels(sorted);
    }

    /**
     * YouTube-style channel spacing: ensures consecutive video cards are from different creators
     */
    private declusterChannels(videos: RecommendedVideo[]): RecommendedVideo[] {
        if (videos.length <= 2) return videos;

        const result: RecommendedVideo[] = [];
        const pool = [...videos];

        while (pool.length > 0) {
            const current = pool.shift()!;
            result.push(current);

            if (pool.length === 0) break;

            const prevChannel = current.channel?.toLowerCase().trim();
            if (!prevChannel) continue;

            // If the next video is from the same channel, find the next candidate from a different channel
            if (pool[0].channel?.toLowerCase().trim() === prevChannel) {
                const diffIdx = pool.findIndex(v => v.channel?.toLowerCase().trim() !== prevChannel);
                if (diffIdx > 0) {
                    const [diffVideo] = pool.splice(diffIdx, 1);
                    result.push(diffVideo);
                }
            }
        }

        return result;
    }

    /**
     * Clear in-memory cache
     */
    clearCache(): void {
        this.cache.clear();
    }
}
