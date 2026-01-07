import { Injectable, inject, signal, computed, effect, untracked } from '@angular/core';
import {
    Playlist,
    PlaylistWithVideos,
    PlaylistVideo,
    CreatePlaylistInput,
    PlaylistVisibility,
    VideoInfo
} from '../../models';
import { AuthService } from '../../core/services';
import { PocketBaseService } from '../../core/services/pocketbase.service';
import { YoutubeService } from '../video';

const STORAGE_KEY = 'linguatube_playlists';
const MAX_LOCAL_PLAYLISTS = 10;

/**
 * Playlist Service
 * Manages playlists for both guest (localStorage) and logged-in (PocketBase) users
 */
@Injectable({
    providedIn: 'root'
})
export class PlaylistService {
    private auth = inject(AuthService);
    private pb = inject(PocketBaseService);
    private youtube = inject(YoutubeService);

    // ==================== State ====================

    /** User's own playlists */
    readonly myPlaylists = signal<Playlist[]>([]);

    /** Playlists saved from other users */
    readonly savedPlaylists = signal<Playlist[]>([]);

    /** Community published playlists */
    readonly communityPlaylists = signal<Playlist[]>([]);

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
        // Initialize playlists based on auth state
        this.initializePlaylists();

        // Persist changes to localStorage (for guest users only)
        effect(() => {
            const playlists = this.myPlaylists();
            untracked(() => this.saveToStorage(playlists));
        });

        // Load playlists from PocketBase when user logs in
        this.auth.loginEvent.subscribe(() => {
            console.debug('[Playlist] User logged in, loading from PocketBase');
            this.loadUserPlaylists();
        });
    }

    /**
     * Initialize playlists on service startup
     */
    private async initializePlaylists(): Promise<void> {
        // Always try to load from localStorage first (for guest users or as fallback)
        this.loadFromStorage();
        console.debug('[Playlist] Loaded from localStorage:', this.myPlaylists().length, 'playlists');

        // If user is already logged in, load from PocketBase
        // Wait a bit for auth to initialize
        setTimeout(async () => {
            if (this.auth.isLoggedIn()) {
                console.debug('[Playlist] User already logged in, loading from PocketBase');
                await this.loadUserPlaylists();
            }
        }, 500);
    }

    // ==================== CRUD Operations ====================

    /**
     * Create a new playlist
     */
    async createPlaylist(input: CreatePlaylistInput): Promise<Playlist> {
        console.debug('[Playlist] Creating playlist:', input.title, 'isLoggedIn:', this.auth.isLoggedIn());

        const playlist: Playlist = {
            id: this.generateId(),
            userId: this.auth.getUserId() || 'local',
            title: input.title,
            description: input.description,
            visibility: input.visibility || 'unlisted',
            language: input.language || 'en',
            tags: input.tags || [],
            videoIds: [],
            videoCount: 0,
            thumbnail: undefined,
            saveCount: 0,
            isFeatured: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        if (this.auth.isLoggedIn()) {
            // Save to PocketBase
            try {
                const client = await this.pb.getClient();
                const record = await client.collection('playlists').create({
                    user: this.auth.getUserId(),
                    title: playlist.title,
                    description: playlist.description || '',
                    visibility: playlist.visibility,
                    language: playlist.language,
                    tags: playlist.tags,
                    video_ids: playlist.videoIds,
                    video_count: 0,
                    thumbnail: '',
                    save_count: 0,
                    is_featured: false
                });
                playlist.id = record.id;
                console.debug('[Playlist] Created in PocketBase with ID:', record.id);
            } catch (error) {
                console.error('[Playlist] Failed to create in PocketBase:', error);
                throw error;
            }
        }

        // Update local state
        this.myPlaylists.set([playlist, ...this.myPlaylists()]);
        console.debug('[Playlist] Created playlist:', playlist.id, 'Total playlists:', this.myPlaylists().length);
        return playlist;
    }

    /**
     * Update an existing playlist with optimistic updates.
     * Local state is updated immediately for instant UI feedback,
     * while API sync happens in the background.
     */
    async updatePlaylist(id: string, updates: Partial<Playlist>): Promise<void> {
        console.debug('[Playlist] Updating playlist:', id, 'updates:', updates, 'isLoggedIn:', this.auth.isLoggedIn());

        const playlists = this.myPlaylists();
        const index = playlists.findIndex(p => p.id === id);

        if (index < 0) {
            console.error('[Playlist] Playlist not found for update:', id);
            throw new Error('Playlist not found');
        }

        const updated = {
            ...playlists[index],
            ...updates,
            updatedAt: new Date()
        };

        // Optimistic update: Update local state immediately
        const newPlaylists = [...playlists];
        newPlaylists[index] = updated;
        this.myPlaylists.set(newPlaylists);
        console.debug('[Playlist] Local state updated optimistically');

        // Sync to API in background (don't await)
        if (this.auth.isLoggedIn()) {
            this.syncPlaylistToApi(id, updated).catch(error => {
                console.error('[Playlist] Background sync failed:', error);
                // Note: We don't rollback the optimistic update here.
                // The next loadUserPlaylists() will reconcile the state.
            });
        }
    }

    /**
     * Sync playlist updates to PocketBase API (background operation)
     */
    private async syncPlaylistToApi(id: string, updated: Playlist): Promise<void> {
        try {
            const client = await this.pb.getClient();
            await client.collection('playlists').update(id, {
                title: updated.title,
                description: updated.description || '',
                visibility: updated.visibility,
                language: updated.language,
                tags: updated.tags,
                video_ids: updated.videoIds,
                video_count: updated.videoCount,
                thumbnail: updated.thumbnail || ''
            });
            console.debug('[Playlist] Synced to PocketBase successfully');
        } catch (error) {
            console.error('[Playlist] Failed to sync to PocketBase:', error);
            throw error;
        }
    }

    /**
     * Delete a playlist
     */
    async deletePlaylist(id: string): Promise<void> {
        if (this.auth.isLoggedIn()) {
            try {
                const client = await this.pb.getClient();
                await client.collection('playlists').delete(id);
            } catch (error) {
                console.error('[Playlist] Failed to delete from PocketBase:', error);
                throw error;
            }
        }

        this.myPlaylists.set(this.myPlaylists().filter(p => p.id !== id));

        // Clear current playlist if it was deleted
        if (this.currentPlaylist()?.id === id) {
            this.currentPlaylist.set(null);
        }
    }

    // ==================== Video Management ====================

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
            (metadata?.thumbnail || `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`);

        // Optimistic update for current playlist
        const current = this.currentPlaylist();
        if (current && current.id === playlistId) {
            const newVideo: PlaylistVideo = {
                videoId,
                title: metadata?.title || 'Unknown Video',
                thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
                channel: metadata?.channel,
                position: current.videos.length
            };

            this.currentPlaylist.set({
                ...current,
                videos: [...current.videos, newVideo],
                videoIds: updatedVideoIds,
                videoCount: updatedVideoIds.length
            });
        }

        await this.updatePlaylist(playlistId, {
            videoIds: updatedVideoIds,
            videoCount: updatedVideoIds.length,
            thumbnail
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
            ? `https://i.ytimg.com/vi/${updatedVideoIds[0]}/mqdefault.jpg`
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
        // Optimistic update for current playlist
        const current = this.currentPlaylist();
        if (current && current.id === playlistId) {
            const reorderedVideos = videoIds
                .map(id => current.videos.find(v => v.videoId === id))
                .filter((v): v is PlaylistVideo => !!v)
                .map((v, index) => ({ ...v, position: index }));

            this.currentPlaylist.set({
                ...current,
                videos: reorderedVideos
            });
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

            // If not found locally and logged in, try to fetch from PocketBase
            if (!playlist && this.auth.isLoggedIn()) {
                try {
                    const client = await this.pb.getClient();
                    const record = await client.collection('playlists').getOne(playlistId);
                    playlist = this.recordToPlaylist(record);
                } catch (error) {
                    console.error('[Playlist] Failed to fetch from PocketBase:', error);
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
            const client = await this.pb.getClient();
            const record = await client.collection('playlists').getOne(playlistId);

            // Only allow access to public or unlisted playlists
            if (record['visibility'] === 'private') {
                const currentUserId = this.auth.getUserId();
                if (record['user'] !== currentUserId) {
                    return null;
                }
            }

            return this.recordToPlaylist(record);
        } catch (error) {
            console.error('[Playlist] Failed to fetch public playlist:', error);
            return null;
        }
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
        this.isShuffled.set(!this.isShuffled());

        if (this.isShuffled()) {
            const playlist = this.currentPlaylist();
            if (playlist) {
                // Shuffle the videos array (Fisher-Yates)
                const shuffled = [...playlist.videos];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                this.currentPlaylist.set({ ...playlist, videos: shuffled });
                this.currentIndex.set(0);
            }
        }
    }

    /**
     * Toggle loop mode
     */
    toggleLoop(): void {
        this.isLooping.set(!this.isLooping());
    }

    /**
     * Clear current playlist
     */
    clearCurrentPlaylist(): void {
        this.currentPlaylist.set(null);
        this.currentIndex.set(0);
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
            const client = await this.pb.getClient();

            // Create save record
            await client.collection('playlist_saves').create({
                user: this.auth.getUserId(),
                playlist: playlistId
            });

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
            const client = await this.pb.getClient();

            // Find and delete the save record
            const saves = await client.collection('playlist_saves').getList(1, 1, {
                filter: `user="${this.auth.getUserId()}" && playlist="${playlistId}"`
            });

            if (saves.items.length > 0) {
                await client.collection('playlist_saves').delete(saves.items[0].id);
            }

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
     * Load user's playlists from PocketBase
     */
    async loadUserPlaylists(): Promise<void> {
        if (!this.auth.isLoggedIn()) return;

        this.isLoading.set(true);

        try {
            const client = await this.pb.getClient();

            // Load owned playlists
            const owned = await client.collection('playlists').getList(1, 50, {
                filter: `user="${this.auth.getUserId()}"`,
                sort: '-updated'
            });

            const playlists = owned.items.map(r => this.recordToPlaylist(r));
            this.myPlaylists.set(playlists);

            // Cache to localStorage for faster next load
            this.saveToStorage(playlists, true);
            console.debug('[Playlist] Loaded', playlists.length, 'playlists from PocketBase');

            // Load saved playlists (playlists you've bookmarked from other users)
            try {
                const saves = await client.collection('playlist_saves').getList(1, 50, {
                    filter: `user="${this.auth.getUserId()}"`,
                    expand: 'playlist',
                    sort: '-saved_at'
                });

                const savedPlaylists = saves.items
                    .map(s => s.expand?.['playlist'])
                    .filter(Boolean)
                    .map((r: any) => this.recordToPlaylist(r));

                this.savedPlaylists.set(savedPlaylists);
            } catch (e) {
                // If collection doesn't exist or other error, just set empty
                this.savedPlaylists.set([]);
            }
        } catch (error) {
            console.error('[Playlist] Failed to load playlists:', error);
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Load community playlists (published)
     */
    async loadCommunityPlaylists(): Promise<void> {
        this.isLoading.set(true);

        try {
            const client = await this.pb.getClient();

            // Load published playlists with user name expanded
            const result = await client.collection('playlists').getList(1, 50, {
                filter: 'visibility="published"',
                sort: '-updated',
                expand: 'user'
            });

            this.communityPlaylists.set(result.items.map(r => this.recordToPlaylist(r)));
        } catch (error) {
            console.error('[Playlist] Failed to load community playlists:', error);
        } finally {
            this.isLoading.set(false);
        }
    }

    // ==================== Private Helpers ====================

    private recordToPlaylist(record: any): Playlist {
        // Extract user name from expanded relation if available
        const userName = record.expand?.user?.name || record.expand?.user?.username;

        return {
            id: record.id,
            userId: record.user,
            userName: userName,
            title: record.title,
            description: record.description,
            visibility: record.visibility,
            language: record.language,
            tags: record.tags || [],
            videoIds: record.video_ids || [],
            videoCount: record.video_count || 0,
            thumbnail: record.thumbnail,
            saveCount: record.save_count || 0,
            isFeatured: record.is_featured || false,
            createdAt: new Date(record.created),
            updatedAt: new Date(record.updated)
        };
    }

    private async hydrateVideos(videoIds: string[]): Promise<PlaylistVideo[]> {
        const videos: PlaylistVideo[] = [];

        for (let i = 0; i < videoIds.length; i++) {
            const videoId = videoIds[i];
            try {
                const metadata = await this.youtube.fetchVideoMetadata(videoId);
                videos.push({
                    videoId,
                    title: metadata.title,
                    thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
                    channel: metadata.channel,
                    position: i
                });
            } catch (error) {
                // Fallback for failed fetches
                videos.push({
                    videoId,
                    title: 'Unknown Video',
                    thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
                    position: i
                });
            }
        }

        return videos;
    }

    private loadFromStorage(): void {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const data = JSON.parse(stored);
                const playlists: Playlist[] = (data.playlists || []).map((p: any) => ({
                    ...p,
                    createdAt: new Date(p.createdAt),
                    updatedAt: new Date(p.updatedAt)
                }));
                this.myPlaylists.set(playlists);
            }
        } catch (e) {
            console.warn('[Playlist] Failed to load from storage:', e);
        }
    }

    private saveToStorage(playlists: Playlist[], force = false): void {
        // Skip auto-save for logged-in users (they sync via PocketBase)
        // But allow forced saves for caching PocketBase data
        if (!force && this.auth.isLoggedIn()) {
            return;
        }

        try {
            const data = {
                playlists: playlists.slice(0, MAX_LOCAL_PLAYLISTS),
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            console.debug('[Playlist] Cached to localStorage:', playlists.length, 'playlists');
        } catch (e) {
            console.warn('[Playlist] Failed to save to storage:', e);
        }
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
}
