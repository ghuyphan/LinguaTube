import { Injectable, inject, signal, Signal } from '@angular/core';
import { IPlaylistRepository } from './playlist.repository';
import { Playlist, mapRecordToPlaylist } from '../../models';
import { StorageService } from '../services/storage.service';
import { PocketBaseService } from '../services/pocketbase.service';
import { AuthService } from '../services/auth.service';
import { mergeByTimestamp } from '../../shared/utils/sync.utils';

const PLAYLISTS_STORAGE_KEY = 'linguatube_playlists';
const PLAYLISTS_TOMBSTONES_KEY = 'linguatube_deleted_playlist_ids';
const MAX_LOCAL_PLAYLISTS = 50;

@Injectable({
    providedIn: 'root'
})
export class OfflinePlaylistRepository implements IPlaylistRepository {
    private pb = inject(PocketBaseService);
    private auth = inject(AuthService);
    private storage = inject(StorageService);

    readonly playlists = signal<Playlist[]>([]);
    readonly isLoading = signal(false);
    private isSyncing = false;

    constructor() {
        this.loadFromStorage();
        this.setupAutoSync();
    }

    private setupAutoSync() {
        this.auth.loginEvent.subscribe(() => {
            this.syncWithRemote();
        });
    }

    getPlaylists(): Signal<Playlist[]> {
        return this.playlists.asReadonly();
    }

    async getPlaylist(id: string): Promise<Playlist | null> {
        const local = this.playlists().find(p => p.id === id);
        if (local) return local;

        // Try fetching public/unlisted playlist from server
        if (this.auth.isLoggedIn()) {
            try {
                const client = await this.pb.getClient();
                const record = await client.collection('playlists').getOne(id, { requestKey: null });
                return mapRecordToPlaylist(record as unknown as Record<string, unknown>);
            } catch {
                return null;
            }
        }

        return null;
    }

    async createPlaylist(playlist: Playlist): Promise<void> {
        // 1. Optimistic Update (Local)
        const current = this.playlists();
        this.playlists.set([{ ...playlist, synced: false }, ...current]);
        this.saveToStorage(this.playlists());

        // 2. Remote Sync
        if (this.auth.isLoggedIn()) {
            try {
                const client = await this.pb.getClient();
                const userId = this.auth.getUserId() || client.authStore.record?.id || (client.authStore.model as { id?: string } | null)?.id;
                await client.collection('playlists').create({
                    id: playlist.id,
                    user: userId,
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
                }, { requestKey: null });

                // Mark as synced on success
                const latest = this.playlists();
                const index = latest.findIndex(p => p.id === playlist.id);
                if (index !== -1) {
                    const newPlaylists = [...latest];
                    newPlaylists[index] = { ...newPlaylists[index], synced: true };
                    this.playlists.set(newPlaylists);
                    this.saveToStorage(newPlaylists);
                }
            } catch (error) {
                console.error('[PlaylistRepo] Failed to create on server (offline):', error);
            }
        }
    }

    async updatePlaylist(id: string, changes: Partial<Playlist>): Promise<void> {
        // 1. Optimistic Update
        const current = this.playlists();
        const index = current.findIndex(p => p.id === id);
        if (index === -1) return;

        const updated = { ...current[index], ...changes, synced: false, updatedAt: new Date() };
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
                }, { requestKey: null });

                // Mark synced on success
                const latest = this.playlists();
                const latestIdx = latest.findIndex(p => p.id === id);
                if (latestIdx !== -1) {
                    const syncedList = [...latest];
                    syncedList[latestIdx] = { ...syncedList[latestIdx], synced: true };
                    this.playlists.set(syncedList);
                    this.saveToStorage(syncedList);
                }
            } catch (error) {
                console.warn('[PlaylistRepo] Failed to update on server (offline):', error);
            }
        }
    }

    async deletePlaylist(id: string): Promise<void> {
        // Record deletion tombstone to prevent zombie resurrection on sync
        this.addDeletionTombstone(id);

        // 1. Optimistic Update
        const current = this.playlists();
        const newPlaylists = current.filter(p => p.id !== id);
        this.playlists.set(newPlaylists);
        this.saveToStorage(newPlaylists);

        // 2. Remote Sync
        if (this.auth.isLoggedIn()) {
            try {
                const client = await this.pb.getClient();
                await client.collection('playlists').delete(id, { requestKey: null });
                this.removeDeletionTombstone(id);
            } catch (error) {
                console.warn('[PlaylistRepo] Failed to delete on server (offline):', error);
            }
        }
    }

    async refresh(): Promise<void> {
        await this.syncWithRemote();
    }

    // ================= Private Helpers =================

    private getDeletionTombstones(): string[] {
        return this.storage.get<string[]>(PLAYLISTS_TOMBSTONES_KEY) || [];
    }

    private addDeletionTombstone(id: string): void {
        const tombstones = this.getDeletionTombstones();
        if (!tombstones.includes(id)) {
            tombstones.push(id);
            this.storage.set(PLAYLISTS_TOMBSTONES_KEY, tombstones);
        }
    }

    private removeDeletionTombstone(id: string): void {
        const tombstones = this.getDeletionTombstones().filter(tId => tId !== id);
        this.storage.set(PLAYLISTS_TOMBSTONES_KEY, tombstones);
    }

    private async syncWithRemote(): Promise<void> {
        if (!this.auth.isLoggedIn() || this.isSyncing) return;

        this.isSyncing = true;
        this.isLoading.set(true);

        try {
            const client = await this.pb.getClient();
            const userId = this.auth.getUserId() || client.authStore.record?.id || (client.authStore.model as { id?: string } | null)?.id;
            if (!userId) {
                return;
            }

            // 0. Process pending deletion tombstones
            const tombstones = this.getDeletionTombstones();
            for (const tId of tombstones) {
                try {
                    await client.collection('playlists').delete(tId, { requestKey: null });
                    this.removeDeletionTombstone(tId);
                } catch {
                    // Item may already be deleted on remote
                    this.removeDeletionTombstone(tId);
                }
            }

            // 1. Push unsynced local playlists
            const unsynced = this.playlists().filter(p => !p.synced);
            for (const p of unsynced) {
                try {
                    await client.collection('playlists').create({
                        id: p.id,
                        user: userId,
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
                    }, { requestKey: null });
                    console.debug('[PlaylistRepo] Pushed unsynced playlist:', p.id);
                } catch {
                    // Try update if create failed due to unique/existing ID
                    try {
                        await client.collection('playlists').update(p.id, {
                            title: p.title,
                            description: p.description,
                            visibility: p.visibility,
                            language: p.language,
                            tags: p.tags,
                            video_ids: p.videoIds,
                            video_count: p.videoCount,
                            thumbnail: p.thumbnail || ''
                        }, { requestKey: null });
                    } catch {
                        // ignore
                    }
                }
            }

            // 2. Fetch full list of playlists from server (no 50-item truncation)
            const owned = await client.collection('playlists').getFullList({
                filter: `user="${userId}"`,
                sort: '-updated',
                requestKey: null
            });

            const activeTombstones = new Set(this.getDeletionTombstones());
            const remotePlaylists = owned
                .map(r => mapRecordToPlaylist(r as unknown as Record<string, unknown>))
                .filter(p => !activeTombstones.has(p.id));

            // Merge local and remote playlists using timestamp-based strategy
            const combined = mergeByTimestamp(
                this.playlists(),
                remotePlaylists.map(p => ({ ...p, synced: true })),
                p => p.id,
                p => new Date(p.updatedAt).getTime()
            );

            this.playlists.set(combined);
            this.saveToStorage(combined);
            console.debug('[PlaylistRepo] Synced with remote:', remotePlaylists.length, 'remote, combined:', combined.length);
        } catch (error) {
            if ((error as { isAbort?: boolean })?.isAbort) {
                console.debug('[PlaylistRepo] Remote sync request was aborted');
            } else {
                console.error('[PlaylistRepo] Remote sync failed:', error);
            }
        } finally {
            this.isSyncing = false;
            this.isLoading.set(false);
        }
    }

    private loadFromStorage(): void {
        const stored = this.storage.get<{ playlists: Playlist[], updatedAt: string }>(PLAYLISTS_STORAGE_KEY);
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
        this.storage.set(PLAYLISTS_STORAGE_KEY, data);
    }
}
