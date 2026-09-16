import { Injectable, inject, signal, computed } from '@angular/core';
import {
    Playlist,
    mapRecordToPlaylist,
    PlaylistWithVideos,
    PlaylistVideo,
    CreatePlaylistInput,
    PlaylistVisibility,
    PlaylistLanguage,
    VideoInfo
} from '../../models';
import { AuthService, SettingsService } from '../../core/services';
import { SupabaseService } from '../../core/services/supabase.service';
import { YoutubeService } from '../video';
import { OfflinePlaylistRepository } from '../../core/repositories';
import { VideoLevelService } from '../../core/services/video-level.service';
import { getYouTubeThumbnail } from '../../core/utils';
import { generateDeterministicRecordId } from '../../shared/utils/sync.utils';

/**
 * Playlist Service
 * Manages playlists for both guest (localStorage) and logged-in (Supabase) users
 */
@Injectable({
    providedIn: 'root'
})
export class PlaylistService {
    private auth = inject(AuthService);
    private settings = inject(SettingsService);
    private supabase = inject(SupabaseService);
    private youtube = inject(YoutubeService);
    private repo = inject(OfflinePlaylistRepository);
    private videoLevel = inject(VideoLevelService);

    // ==================== State ====================

    // UI State for mobile bar animation
    hasShownMobileBar = false;

    /** User's own playlists (from repository) */
    readonly myPlaylists = this.repo.getPlaylists();

    /** Playlists saved from other users */
    readonly savedPlaylists = signal<Playlist[]>([]);

    /** Community published playlists */
    readonly communityPlaylists = signal<Playlist[]>([]);

    /** Recommended playlists for active learning language (server-queried) */
    readonly recommendedPlaylists = signal<Playlist[]>([]);

    /** Specific loading state for recommended playlists */
    readonly isRecommendedLoading = signal<boolean>(false);

    /** In-memory cache for recommended playlists per language */
    private readonly recommendedCache = new Map<string, Playlist[]>();

    /** Monotonically increasing request sequence to discard stale responses on rapid switching */
    private activeRecommendedRequestId = 0;

    /** Currently active playlist for playback */
    readonly currentPlaylist = signal<PlaylistWithVideos | null>(null);

    /** Current video index in playlist */
    readonly currentIndex = signal<number>(0);

    /** Shuffle mode enabled */
    readonly isShuffled = signal<boolean>(false);

    /** Loop mode enabled */
    readonly isLooping = signal<boolean>(false);

    /** Loading state */
    readonly isLoading = signal<boolean>(false);

    /** Specific loading state for community playlists */
    readonly isCommunityLoading = signal<boolean>(false);

    /** Tracks whether the initial community playlist fetch has completed */
    readonly hasLoadedCommunity = signal<boolean>(false);

    /** Specific loading state for user's owned playlists */
    readonly isUserPlaylistsLoading = signal<boolean>(true);

    /** Original un-shuffled video list (to restore when shuffle is toggled off) */
    private unshuffledVideos: PlaylistVideo[] = [];

    // ==================== Computed ====================

    /** All playlists (owned + saved) */
    readonly allPlaylists = computed(() => [
        ...this.myPlaylists(),
        ...this.savedPlaylists()
    ]);

    /** Current video in playlist */
    readonly currentVideo = computed(() => {
        const playlist = this.currentPlaylist();
        const index = this.currentIndex();
        if (!playlist || index < 0 || index >= playlist.videos.length) {
            return null;
        }
        return playlist.videos[index];
    });

    /** Has next video */
    readonly hasNext = computed(() => {
        const playlist = this.currentPlaylist();
        const index = this.currentIndex();
        if (!playlist) return false;
        return this.isLooping() || index < playlist.videos.length - 1;
    });

    /** Has previous video */
    readonly hasPrevious = computed(() => {
        const playlist = this.currentPlaylist();
        const index = this.currentIndex();
        if (!playlist) return false;
        return this.isLooping() || index > 0;
    });

    constructor() {
        // Clean up legacy localStorage recommended playlist keys to reclaim client storage
        try {
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key && key.startsWith('voca_rec_playlists_')) {
                    localStorage.removeItem(key);
                }
            }
        } catch { }

        this.youtube.nextTrack$.subscribe(() => {
            const nextId = this.playNext();
            if (nextId) {
                this.youtube.initPlayer('youtube-player', nextId);
            }
        });

        this.youtube.previousTrack$.subscribe(() => {
            const prevId = this.playPrevious();
            if (prevId) {
                this.youtube.initPlayer('youtube-player', prevId);
            }
        });
    }

    // ==================== CRUD Operations ====================

    /**
     * Create a new playlist
     */
    async createPlaylist(input: CreatePlaylistInput): Promise<Playlist> {
        const userId = this.auth.getUserId() || 'local';
        const uniqueId = typeof crypto !== 'undefined' && crypto.randomUUID 
            ? crypto.randomUUID() 
            : generateDeterministicRecordId('pl', userId, Date.now().toString(36), Math.random().toString(36).slice(2, 8));
        const playlist: Playlist = {
            id: uniqueId,
            userId,
            title: input.title,
            description: input.description,
            visibility: input.visibility || 'unlisted',
            language: input.language || (this.settings.settings().language as PlaylistLanguage) || 'en',
            level: input.level,
            tags: input.tags || [],
            videoIds: [],
            videoCount: 0,
            thumbnail: undefined,
            saveCount: 0,
            isFeatured: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            synced: false
        };

        await this.repo.createPlaylist(playlist);
        console.debug('[Playlist] Created playlist via repo:', playlist.id);
        return playlist;
    }

    /**
     * Update an existing playlist with optimistic updates.
     * Local state is updated immediately for instant UI feedback,
     * while API sync happens in the background.
     */
    async updatePlaylist(id: string, updates: Partial<Playlist>): Promise<void> {
        await this.repo.updatePlaylist(id, updates);
        console.debug('[Playlist] Updated playlist via repo:', id);
    }

    async deletePlaylist(id: string): Promise<void> {
        await this.repo.deletePlaylist(id);

        // Clear current playlist if it was deleted
        if (this.currentPlaylist()?.id === id) {
            this.currentPlaylist.set(null);
        }
    }

    // ==================== Video Management ====================

    async queueVideo(videoId: string): Promise<void> {
        console.debug('[Playlist] Queuing video:', videoId);

        const current = this.currentPlaylist();
        if (!current) {
            console.warn('[Playlist] No active playlist to queue into');
            return;
        }

        // 1. Check if already in playlist -> Jump to it
        const existingIndex = current.videos.findIndex(v => v.videoId === videoId);
        if (existingIndex !== -1) {
            console.debug('[Playlist] Video already in playlist, jumping to index:', existingIndex);
            this.currentIndex.set(existingIndex);
            return;
        }

        // 2. Prepare new video item
        const playerVideo = this.youtube.currentVideo();
        const cachedTitle = (playerVideo?.id === videoId && playerVideo.title) ? playerVideo.title : 'Loading...';
        // Insert after current video
        const insertIndex = this.currentIndex() + 1;

        // 3. Fetch full metadata in background if not cached
        if (cachedTitle === 'Loading...') {
            this.youtube.fetchVideoMetadata(videoId).then(meta => {
                const updated = this.currentPlaylist();
                if (updated && updated.videos[insertIndex]?.videoId === videoId) {
                    const newVideos = [...updated.videos];
                    newVideos[insertIndex] = {
                        ...newVideos[insertIndex],
                        title: meta.title,
                        channel: meta.channel
                    };

                    this.currentPlaylist.set({
                        ...updated,
                        videos: newVideos
                    });
                }
            });
        }

        const newVideo: PlaylistVideo = {
            videoId,
            title: cachedTitle,
            thumbnail: getYouTubeThumbnail(videoId),
            position: current.videos.length
        };

        const newVideos = [...current.videos];
        newVideos.splice(insertIndex, 0, newVideo);

        // Update runtime state ONLY (no persistence)
        this.currentPlaylist.set({
            ...current,
            videos: newVideos,
            videoIds: newVideos.map(v => v.videoId),
            videoCount: newVideos.length
        });

        // Advance to play it immediately
        this.currentIndex.set(insertIndex);
    }




    /**
     * Add a video to a playlist
     */
    async addVideo(playlistId: string, videoId: string, metadata?: VideoInfo): Promise<void> {
        console.debug('[Playlist] Adding video:', videoId, 'to playlist:', playlistId);

        const playlists = this.myPlaylists();
        console.debug('[Playlist] Available playlists:', playlists.map(p => ({ id: p.id, title: p.title })));

        const playlist = playlists.find(p => p.id === playlistId);

        if (!playlist) {
            console.error('[Playlist] Playlist not found:', playlistId);
            throw new Error('Playlist not found');
        }

        // Don't add duplicates
        if (playlist.videoIds.includes(videoId)) {
            console.debug('[Playlist] Video already in playlist, skipping');
            return;
        }

        const updatedVideoIds = [...playlist.videoIds, videoId];
        const thumbnail = playlist.thumbnail ||
            (metadata?.thumbnail || getYouTubeThumbnail(videoId));

        // Optimistic update for current playlist
        const current = this.currentPlaylist();
        if (current && current.id === playlistId) {
            const newVideo: PlaylistVideo = {
                videoId,
                title: metadata?.title || 'Unknown Video',
                thumbnail: getYouTubeThumbnail(videoId),
                channel: metadata?.channel,
                position: current.videos.length
            };

            // If the video is already in the runtime playlist (e.g. from queueing), don't duplicate it visually.
            // But we DO want to ensure `videoIds` reflects the persistent state we are about to save.
            const alreadyExists = current.videos.some(v => v.videoId === videoId);
            const videos = alreadyExists ? current.videos : [...current.videos, newVideo];

            this.currentPlaylist.set({
                ...current,
                videos,
                videoIds: updatedVideoIds,
                videoCount: updatedVideoIds.length
            });
        }

        let levelUpdate: Partial<Playlist> = {};
        if (!playlist.level) {
            const detected = this.videoLevel.resolveLevel(
                videoId,
                playlist.language,
                metadata?.title || '',
                metadata?.channel || ''
            );
            if (detected) {
                levelUpdate = { level: detected.level, tier: detected.tier };
            }
        }

        await this.updatePlaylist(playlistId, {
            videoIds: updatedVideoIds,
            videoCount: updatedVideoIds.length,
            thumbnail,
            ...levelUpdate
        });
        console.debug('[Playlist] Video added successfully, new count:', updatedVideoIds.length);
    }

    /**
     * Remove a video from a playlist
     */
    async removeVideo(playlistId: string, videoId: string): Promise<void> {
        const playlists = this.myPlaylists();
        const playlist = playlists.find(p => p.id === playlistId);

        if (!playlist) {
            throw new Error('Playlist not found');
        }

        const updatedVideoIds = playlist.videoIds.filter(id => id !== videoId);
        const newThumbnail = updatedVideoIds.length > 0
            ? getYouTubeThumbnail(updatedVideoIds[0])
            : undefined;

        // Optimistic update for current playlist
        const current = this.currentPlaylist();
        if (current && current.id === playlistId) {
            const updatedVideos = current.videos
                .filter(v => v.videoId !== videoId)
                .map((v, index) => ({ ...v, position: index }));

            this.currentPlaylist.set({
                ...current,
                videos: updatedVideos,
                videoIds: updatedVideoIds,
                videoCount: updatedVideoIds.length
            });

            // Adjust current index if needed
            if (this.currentIndex() >= updatedVideos.length) {
                this.currentIndex.set(Math.max(0, updatedVideos.length - 1));
            }
        }

        await this.updatePlaylist(playlistId, {
            videoIds: updatedVideoIds,
            videoCount: updatedVideoIds.length,
            thumbnail: newThumbnail
        });
    }

    /**
     * Reorder videos in a playlist
     */
    async reorderVideos(playlistId: string, videoIds: string[]): Promise<void> {
        const current = this.currentPlaylist();
        if (!current || current.id !== playlistId) return;

        // 1. Capture current state securely
        const currentVideoId = current.videos[this.currentIndex()]?.videoId;

        // 2. Reconstruct the full video list in the new order
        // Create a map for O(1) lookup to ensure performance
        const videoMap = new Map(current.videos.map(v => [v.videoId, v]));

        const reorderedVideos = videoIds
            .map((id, index) => {
                const video = videoMap.get(id);
                if (video) {
                    return { ...video, position: index };
                }
                return null;
            })
            .filter((v): v is PlaylistVideo => !!v);

        // 3. Find the new index of the currently playing video
        let newIndex = this.currentIndex();
        if (currentVideoId) {
            const foundIndex = reorderedVideos.findIndex(v => v.videoId === currentVideoId);
            if (foundIndex !== -1) {
                newIndex = foundIndex;
            }
        }

        // 4. Atomic Update
        this.currentPlaylist.set({
            ...current,
            videos: reorderedVideos,
            videoIds: videoIds
        });

        // Critical: Update index immediately to prevent desync
        // If we don't do this, the player might think it's playing a different video
        if (newIndex !== this.currentIndex()) {
            this.currentIndex.set(newIndex);
        }

        await this.updatePlaylist(playlistId, {
            videoIds
        });
    }

    // ==================== Playback ====================

    /**
     * Load a playlist for playback
     */
    async loadPlaylist(playlistId: string): Promise<PlaylistWithVideos> {
        this.isLoading.set(true);

        try {
            let playlist: Playlist | null = null;

            // First check local playlists
            playlist = this.myPlaylists().find(p => p.id === playlistId) || null;

            if (!playlist) {
                playlist = this.savedPlaylists().find(p => p.id === playlistId) || null;
            }

            // If not found locally and logged in, try to fetch from Supabase
            if (!playlist && this.auth.isLoggedIn()) {
                try {
                    const { data, error } = await this.supabase.client
                        .from('playlists')
                        .select('*')
                        .eq('id', playlistId)
                        .maybeSingle();
                    if (data && !error) {
                        playlist = mapRecordToPlaylist(data as unknown as Record<string, unknown>);
                    }
                } catch (error) {
                    console.error('[Playlist] Failed to fetch from Supabase:', error);
                }
            }

            // Try public fetch for unlisted/published playlists
            if (!playlist) {
                playlist = await this.fetchPublicPlaylist(playlistId);
            }

            if (!playlist) {
                throw new Error('Playlist not found');
            }

            // Hydrate with video metadata
            const videos = await this.hydrateVideos(playlist.videoIds);
            const isOwner = playlist.userId === (this.auth.getUserId() || 'local');
            const isSaved = this.savedPlaylists().some(p => p.id === playlistId);

            const playlistWithVideos: PlaylistWithVideos = {
                ...playlist,
                videos,
                isOwner,
                isSaved
            };

            this.unshuffledVideos = [...videos];
            this.isShuffled.set(false);
            this.currentPlaylist.set(playlistWithVideos);
            this.currentIndex.set(0);

            return playlistWithVideos;
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Fetch a public/unlisted playlist (for sharing)
     */
    async fetchPublicPlaylist(playlistId: string): Promise<Playlist | null> {
        try {
            const { data, error } = await this.supabase.client
                .from('playlists')
                .select('*')
                .eq('id', playlistId)
                .maybeSingle();

            if (error || !data) return null;

            // Only allow access to public or unlisted playlists
            if (data['visibility'] === 'private') {
                const currentUserId = this.auth.getUserId();
                if (data['user_id'] !== currentUserId) {
                    return null;
                }
            }

            return mapRecordToPlaylist(data as unknown as Record<string, unknown>);
        } catch (error) {
            console.error('[Playlist] Failed to fetch public playlist:', error);
            return null;
        }
    }

    async getPlaylistVideos(videoIds: string[]): Promise<PlaylistVideo[]> {
        return this.hydrateVideos(videoIds);
    }

    /**
     * Set current video index
     */
    setCurrentIndex(index: number): void {
        const playlist = this.currentPlaylist();
        if (playlist && index >= 0 && index < playlist.videos.length) {
            this.currentIndex.set(index);
        }
    }

    /**
     * Play next video, returns video ID or null if at end
     */
    playNext(): string | null {
        const playlist = this.currentPlaylist();
        if (!playlist) return null;

        let nextIndex = this.currentIndex() + 1;

        if (nextIndex >= playlist.videos.length) {
            if (this.isLooping()) {
                nextIndex = 0;
            } else {
                return null;
            }
        }

        this.currentIndex.set(nextIndex);
        return playlist.videos[nextIndex]?.videoId || null;
    }

    /**
     * Play previous video, returns video ID or null if at start
     */
    playPrevious(): string | null {
        const playlist = this.currentPlaylist();
        if (!playlist) return null;

        let prevIndex = this.currentIndex() - 1;

        if (prevIndex < 0) {
            if (this.isLooping()) {
                prevIndex = playlist.videos.length - 1;
            } else {
                return null;
            }
        }

        this.currentIndex.set(prevIndex);
        return playlist.videos[prevIndex]?.videoId || null;
    }

    /**
     * Toggle shuffle mode
     */
    toggleShuffle(): void {
        const playlist = this.currentPlaylist();
        if (!playlist || playlist.videos.length <= 1) {
            this.isShuffled.update(v => !v);
            return;
        }

        const currentlyShuffled = this.isShuffled();
        const currentVideoId = playlist.videos[this.currentIndex()]?.videoId;

        if (!currentlyShuffled) {
            // Turning Shuffle ON:
            if (this.unshuffledVideos.length === 0) {
                this.unshuffledVideos = [...playlist.videos];
            }

            const currentVid = playlist.videos[this.currentIndex()];
            const remaining = playlist.videos.filter((_, idx) => idx !== this.currentIndex());

            // Fisher-Yates shuffle remaining videos
            for (let i = remaining.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
            }

            // Put current video first so playback continues uninterrupted!
            const newVideos = currentVid ? [currentVid, ...remaining] : remaining;

            this.currentPlaylist.set({
                ...playlist,
                videos: newVideos,
                videoIds: newVideos.map(v => v.videoId)
            });
            this.currentIndex.set(0);
            this.isShuffled.set(true);
        } else {
            // Turning Shuffle OFF:
            if (this.unshuffledVideos.length > 0) {
                const original = [...this.unshuffledVideos];
                const originalIndex = currentVideoId
                    ? original.findIndex(v => v.videoId === currentVideoId)
                    : 0;

                this.currentPlaylist.set({
                    ...playlist,
                    videos: original,
                    videoIds: original.map(v => v.videoId)
                });
                this.currentIndex.set(originalIndex >= 0 ? originalIndex : 0);
            }
            this.isShuffled.set(false);
        }
    }

    /**
     * Toggle loop mode
     */
    toggleLoop(): void {
        this.isLooping.update(v => !v);
    }

    /**
     * Clear current playlist
     */
    clearCurrentPlaylist(): void {
        this.currentPlaylist.set(null);
        this.currentIndex.set(0);
        this.unshuffledVideos = [];
        this.isShuffled.set(false);
    }

    // ==================== Sharing ====================

    /**
     * Get shareable URL for a playlist
     */
    getShareUrl(playlistId: string, videoId?: string): string {
        const base = window.location.origin;
        let url = `${base}/video?playlist=${playlistId}`;
        if (videoId) {
            url += `&id=${videoId}`;
        }
        return url;
    }

    /**
     * Copy share link to clipboard
     */
    async copyShareLink(playlistId: string, videoId?: string): Promise<boolean> {
        try {
            const url = this.getShareUrl(playlistId, videoId);
            await navigator.clipboard.writeText(url);
            return true;
        } catch (error) {
            console.error('[Playlist] Failed to copy link:', error);
            return false;
        }
    }

    // ==================== Visibility ====================

    /**
     * Publish a playlist to community
     */
    async publishPlaylist(playlistId: string): Promise<void> {
        await this.updatePlaylist(playlistId, { visibility: 'published' });
    }

    /**
     * Unpublish a playlist (change to unlisted)
     */
    async unpublishPlaylist(playlistId: string): Promise<void> {
        await this.updatePlaylist(playlistId, { visibility: 'unlisted' });
    }

    /**
     * Set playlist visibility
     */
    async setVisibility(playlistId: string, visibility: PlaylistVisibility): Promise<void> {
        await this.updatePlaylist(playlistId, { visibility });
    }

    // ==================== Save/Follow ====================

    /**
     * Save another user's playlist to your library
     */
    async savePlaylist(playlistId: string): Promise<void> {
        if (!this.auth.isLoggedIn()) {
            throw new Error('Must be logged in to save playlists');
        }

        try {
            const userId = this.auth.getUserId();
            if (!userId) return;

            const saveId = `psave_${userId.slice(0, 8)}_${playlistId.slice(0, 8)}`;
            await this.supabase.client.from('playlist_saves').upsert({
                id: saveId,
                user_id: userId,
                playlist_id: playlistId,
                saved_at: new Date().toISOString()
            }, { onConflict: 'id' });

            // Increment save count on playlist
            const playlist = await this.fetchPublicPlaylist(playlistId);
            if (playlist) {
                this.savedPlaylists.set([...this.savedPlaylists(), playlist]);
            }
        } catch (error) {
            console.error('[Playlist] Failed to save playlist:', error);
            throw error;
        }
    }

    /**
     * Unsave a playlist from your library
     */
    async unsavePlaylist(playlistId: string): Promise<void> {
        if (!this.auth.isLoggedIn()) return;

        try {
            const userId = this.auth.getUserId();
            if (!userId) return;

            await this.supabase.client
                .from('playlist_saves')
                .delete()
                .eq('user_id', userId)
                .eq('playlist_id', playlistId);

            this.savedPlaylists.set(
                this.savedPlaylists().filter(p => p.id !== playlistId)
            );
        } catch (error) {
            console.error('[Playlist] Failed to unsave playlist:', error);
            throw error;
        }
    }

    // ==================== Data Loading ====================

    /**
     * Load user's playlists from Supabase
     */
    async loadUserPlaylists(): Promise<void> {
        this.isUserPlaylistsLoading.set(true);
        // Only show full-screen loading/skeleton if we have no data
        if (this.myPlaylists().length === 0) {
            this.isLoading.set(true);
        }

        try {
            // Delegated to repo refresh/sync
            await this.repo.refresh();
        } finally {
            this.isUserPlaylistsLoading.set(false);
            this.isLoading.set(false);
        }
    }

    /**
     * Load community playlists (published), with optional server-side language and tier filtering
     */
    async loadCommunityPlaylists(language?: string, tier?: string): Promise<void> {
        this.isCommunityLoading.set(true);
        if (this.communityPlaylists().length === 0) {
            this.isLoading.set(true);
        }

        try {
            const targetLang = language && language !== 'all' ? language : null;
            const targetTier = tier && tier !== 'all' ? tier : null;

            let query = this.supabase.client
                .from('playlists')
                .select('*')
                .eq('visibility', 'published')
                .order('updated_at', { ascending: false })
                .limit(50);

            if (targetLang) {
                query = query.eq('language', targetLang);
            }

            const { data, error } = await query;
            if (error) {
                throw error;
            }

            let playlists = (data || []).map(r => mapRecordToPlaylist(r as unknown as Record<string, unknown>));

            if (targetTier) {
                playlists = playlists.filter(p => {
                    const resolved = this.videoLevel.resolvePlaylistLevel(p);
                    return resolved?.tier === targetTier;
                });
            }

            this.communityPlaylists.set(playlists);
        } catch (error) {
            console.error('[Playlist] Failed to load community playlists:', error);
        } finally {
            this.isCommunityLoading.set(false);
            this.isLoading.set(false);
            this.hasLoadedCommunity.set(true);
        }
    }

    /**
     * Load recommended playlists for a target learning language directly from server.
     */
    async loadRecommendedPlaylists(language: string, tier?: string, limit = 3, forceRefresh = false): Promise<Playlist[]> {
        if (!language) return [];

        const requestId = ++this.activeRecommendedRequestId;
        const targetTier = tier && tier !== 'all' ? tier : undefined;
        const cacheKey = `${language}_${targetTier || 'all'}_${limit}`;

        if (forceRefresh) {
            this.recommendedCache.delete(cacheKey);
        } else if (this.recommendedCache.has(cacheKey)) {
            const cached = this.recommendedCache.get(cacheKey)!;
            this.recommendedPlaylists.set(cached);
            return cached;
        }

        this.isRecommendedLoading.set(true);
        try {
            const query = this.supabase.client
                .from('playlists')
                .select('*')
                .eq('visibility', 'published')
                .eq('language', language)
                .order('is_featured', { ascending: false })
                .order('save_count', { ascending: false })
                .order('updated_at', { ascending: false })
                .limit(targetTier ? 30 : limit);

            const { data, error } = await query;
            if (error) throw error;

            const allPlaylists = (data || []).map(r => mapRecordToPlaylist(r as unknown as Record<string, unknown>));

            let finalPlaylists: Playlist[];
            if (targetTier) {
                finalPlaylists = allPlaylists.filter(p => {
                    const resolved = this.videoLevel.resolvePlaylistLevel(p);
                    return resolved?.tier === targetTier;
                }).slice(0, limit);
            } else {
                finalPlaylists = allPlaylists.slice(0, limit);
            }

            this.recommendedCache.set(cacheKey, finalPlaylists);

            if (requestId !== this.activeRecommendedRequestId) {
                return [];
            }

            this.recommendedPlaylists.set(finalPlaylists);
            return finalPlaylists;
        } catch (error) {
            if (requestId === this.activeRecommendedRequestId) {
                console.error('[Playlist] Failed to load recommended playlists from server:', error);
                this.recommendedPlaylists.set([]);
            }
            return [];
        } finally {
            if (requestId === this.activeRecommendedRequestId) {
                this.isRecommendedLoading.set(false);
            }
        }
    }

    // ==================== Private Helpers ====================

    private async hydrateVideos(videoIds: string[]): Promise<PlaylistVideo[]> {
        // Fetch all video metadata in parallel for much faster loading
        const results = await Promise.allSettled(
            videoIds.map(async (videoId, position) => {
                const metadata = await this.youtube.fetchVideoMetadata(videoId);
                return {
                    videoId,
                    title: metadata.title,
                    thumbnail: getYouTubeThumbnail(videoId),
                    channel: metadata.channel,
                    position
                };
            })
        );

        // Map results, using fallback for any failed fetches
        return results.map((result, position) => {
            if (result.status === 'fulfilled') {
                return result.value;
            }
            // Fallback for failed fetches
            return {
                videoId: videoIds[position],
                title: 'Unknown Video',
                thumbnail: getYouTubeThumbnail(videoIds[position]),
                position
            };
        });
    }
}
