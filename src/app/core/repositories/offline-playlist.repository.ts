import { Injectable, inject, signal, Signal } from '@angular/core';
import { IPlaylistRepository } from './playlist.repository';
import { Playlist } from '../../models';
import { StorageService } from '../services/storage.service';
import { PocketBaseService } from '../services/pocketbase.service';
import { AuthService } from '../services/auth.service';

const STORAGE_KEY = 'linguatube_playlists';
const MAX_LOCAL_PLAYLISTS = 50; // Increased limit for offline-first approach

@Injectable({
    providedIn: 'root'
})
export class OfflinePlaylistRepository implements IPlaylistRepository {
    private storage = inject(StorageService);
    private pb = inject(PocketBaseService);
    private auth = inject(AuthService);

    // Source of truth signal
    private playlists = signal<Playlist[]>([]);

    constructor() {
        this.loadFromStorage();

        // Auto-sync when user logs in
        this.auth.loginEvent.subscribe(() => {
            this.syncWithRemote();
        });
    }

    getPlaylists(): Signal<Playlist[]> {
        return this.playlists.asReadonly();
    }

    async getPlaylist(id: string): Promise<Playlist | null> {
        // Try memory first
        const cached = this.playlists().find(p => p.id === id);
        if (cached) return cached;

        // Try storage refetch (in case of stale memory)
        this.loadFromStorage();
        const stored = this.playlists().find(p => p.id === id);
        if (stored) return stored;

        // If online and not found, try fetching single item from remote
        if (this.auth.isLoggedIn()) {
            try {
                const client = await this.pb.getClient();
                const record = await client.collection('playlists').getOne(id);
                return this.recordToPlaylist(record);
            } catch {
                return null;
            }
        }

        return null;
    }

    async createPlaylist(playlist: Playlist): Promise<void> {
        // 1. Optimistic Update (Local)
        const current = this.playlists();
        this.playlists.set([playlist, ...current]);
        this.saveToStorage(this.playlists());

        // 2. Remote Sync
        if (this.auth.isLoggedIn()) {
            try {
                const client = await this.pb.getClient();
                await client.collection('playlists').create({
                    id: playlist.id, // Try to enforce same ID if possible, otherwise mapped
                    user: this.auth.getUserId(),
                    title: playlist.title,
                    description: playlist.description || '',
                    visibility: playlist.visibility,
                    language: playlist.language,
                    tags: playlist.tags,
                    video_ids: playlist.videoIds,
                    video_count: playlist.videoCount,
                    thumbnail: playlist.thumbnail || '',
                    save_count: 0,
                    is_featured: false
                });

                // Mark as synced on success
                const current = this.playlists();
                const index = current.findIndex(p => p.id === playlist.id);
                if (index !== -1) {
                    const newPlaylists = [...current];
                    newPlaylists[index] = { ...newPlaylists[index], synced: true };
                    this.playlists.set(newPlaylists);
                    this.saveToStorage(newPlaylists);
                }
            } catch (error) {
                console.error('[PlaylistRepo] Failed to create on server:', error);
                // TODO: Queue for retry
            }
        }
    }

    async updatePlaylist(id: string, changes: Partial<Playlist>): Promise<void> {
        // 1. Optimistic Update
        const current = this.playlists();
        const index = current.findIndex(p => p.id === id);
        if (index === -1) return;

        const updated = { ...current[index], ...changes, updatedAt: new Date() };
        const newPlaylists = [...current];
        newPlaylists[index] = updated;

        this.playlists.set(newPlaylists);
        this.saveToStorage(newPlaylists);

        // 2. Remote Sync
        if (this.auth.isLoggedIn()) {
            try {
                const client = await this.pb.getClient();
                await client.collection('playlists').update(id, {
                    title: updated.title,
                    description: updated.description,
                    visibility: updated.visibility,
                    language: updated.language,
                    tags: updated.tags,
                    video_ids: updated.videoIds,
                    video_count: updated.videoCount,
                    thumbnail: updated.thumbnail
                });
            } catch (error) {
                console.error('[PlaylistRepo] Failed to update on server:', error);
                // TODO: Queue for retry
            }
        }
    }

    async deletePlaylist(id: string): Promise<void> {
        // 1. Optimistic Update
        const current = this.playlists();
        const newPlaylists = current.filter(p => p.id !== id);
        this.playlists.set(newPlaylists);
        this.saveToStorage(newPlaylists);

        // 2. Remote Sync
        if (this.auth.isLoggedIn()) {
            try {
                const client = await this.pb.getClient();
                await client.collection('playlists').delete(id);
            } catch (error) {
                console.error('[PlaylistRepo] Failed to delete on server:', error);
            }
        }
    }

    async refresh(): Promise<void> {
        await this.syncWithRemote();
    }

    // ================= Private Helpers =================

    private async syncWithRemote(): Promise<void> {
        if (!this.auth.isLoggedIn()) return;

        try {
            const client = await this.pb.getClient();

            // 1. Push unsynced local playlists
            const unsynced = this.playlists().filter(p => !p.synced);
            for (const p of unsynced) {
                try {
                    await client.collection('playlists').create({
                        id: p.id,
                        user: this.auth.getUserId(),
                        title: p.title,
                        description: p.description || '',
                        visibility: p.visibility,
                        language: p.language,
                        tags: p.tags,
                        video_ids: p.videoIds,
                        video_count: p.videoCount,
                        thumbnail: p.thumbnail || '',
                        save_count: 0,
                        is_featured: false
                    });
                    console.debug('[PlaylistRepo] Pushed unsynced playlist:', p.id);
                } catch (err) {
                    console.error('[PlaylistRepo] Failed to push unsynced playlist:', p.id, err);
                    // Continue to next item even if one fails
                }
            }

            // 2. Fetch all playlists from server
            const owned = await client.collection('playlists').getList(1, 50, {
                filter: `user="${this.auth.getUserId()}"`,
                sort: '-updated'
            });

            const remotePlaylists = owned.items.map(r => this.recordToPlaylist(r));

            // Safe Merge Strategy:
            // 1. Remote is the source of truth for anything that has synced.
            // 2. Keep local playlists that haven't synced yet (synced = false).
            // 3. Removes local playlists that were synced but are no longer on remote (deleted remotely).

            const remoteIds = new Set(remotePlaylists.map(p => p.id));
            const unsyncedLocal = this.playlists().filter(p => !p.synced && !remoteIds.has(p.id));

            // Combine remote items + unsynced local items
            const combined = [...remotePlaylists, ...unsyncedLocal];

            this.playlists.set(combined);
            this.saveToStorage(combined);
            console.debug('[PlaylistRepo] Synced with remote:', remotePlaylists.length, 'remote,', unsyncedLocal.length, 'unsynced local');
        } catch (error) {
            console.error('[PlaylistRepo] Remote sync failed:', error);
        }
    }

    private loadFromStorage(): void {
        const stored = this.storage.get<{ playlists: Playlist[], updatedAt: string }>(STORAGE_KEY);
        if (stored && stored.playlists) {
            const parsed = stored.playlists.map(p => ({
                ...p,
                createdAt: new Date(p.createdAt),
                updatedAt: new Date(p.updatedAt)
            }));
            this.playlists.set(parsed);
        }
    }

    private saveToStorage(playlists: Playlist[]): void {
        const data = {
            playlists: playlists.slice(0, MAX_LOCAL_PLAYLISTS),
            updatedAt: new Date().toISOString()
        };
        this.storage.set(STORAGE_KEY, data);
    }

    private recordToPlaylist(record: any): Playlist {
        return {
            id: record.id,
            userId: record.user,
            userName: record.expand?.user?.name || record.expand?.user?.username,
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
            updatedAt: new Date(record.updated),
            synced: true
        };
    }
}
