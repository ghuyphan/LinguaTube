import { Injectable, inject, signal, Signal } from '@angular/core';
import { IHistoryRepository } from './history.repository';
import { HistoryItem } from '../../models';
import { StorageService } from '../services/storage.service';
import { PocketBaseService } from '../services/pocketbase.service';
import { AuthService } from '../services/auth.service';

const STORAGE_KEY = 'linguatube_history';
const MAX_LOCAL_HISTORY = 50;

@Injectable({
    providedIn: 'root'
})
export class OfflineHistoryRepository implements IHistoryRepository {
    private storage = inject(StorageService);
    private pb = inject(PocketBaseService);
    private auth = inject(AuthService);

    // Source of truth signal
    private history = signal<HistoryItem[]>([]);
    readonly isLoading = signal(false);

    constructor() {
        this.loadFromStorage();

        // Auto-sync when user logs in
        this.auth.loginEvent.subscribe(() => {
            this.syncWithRemote();
        });
    }

    getHistory(): Signal<HistoryItem[]> {
        return this.history.asReadonly();
    }

    async addToHistory(item: HistoryItem): Promise<void> {
        // 1. Optimistic Update (Local)
        const current = this.history();
        const existingIndex = current.findIndex(i => i.video_id === item.video_id);

        let newHistory = [...current];
        if (existingIndex >= 0) {
            // Update existing
            newHistory[existingIndex] = { ...item, synced: false };
        } else {
            // Add new
            newHistory.unshift({ ...item, synced: false });
        }

        // Enforce max limit for local storage
        if (newHistory.length > MAX_LOCAL_HISTORY && !this.auth.isLoggedIn()) {
            newHistory = newHistory.slice(0, MAX_LOCAL_HISTORY);
        }

        // Sort by watched_at descending
        newHistory.sort((a, b) => new Date(b.watched_at).getTime() - new Date(a.watched_at).getTime());

        this.history.set(newHistory);
        this.saveToStorage(newHistory);

        // 2. Remote Sync
        if (this.auth.isLoggedIn()) {
            try {
                const client = await this.pb.getClient();

                // Check if record exists on server (by video_id and user)
                // We use a listing to find if it exists because ID might be local-generated
                const existing = await client.collection('history').getList(1, 1, {
                    filter: `user="${this.auth.getUserId()}" && video_id="${item.video_id}"`
                });

                if (existing.items.length > 0) {
                    await client.collection('history').update(existing.items[0].id, {
                        watched_at: item.watched_at,
                        progress: item.progress,
                        is_favorite: item.is_favorite,
                        languages: item.languages
                    });
                } else {
                    await client.collection('history').create({
                        user: this.auth.getUserId(),
                        video_id: item.video_id,
                        title: item.title,
                        thumbnail: item.thumbnail,
                        channel: item.channel,
                        duration: item.duration,
                        languages: item.languages,
                        watched_at: item.watched_at,
                        progress: item.progress,
                        is_favorite: item.is_favorite
                    });
                }

                // Mark as synced
                const updatedCurrent = this.history();
                const updatedIndex = updatedCurrent.findIndex(i => i.video_id === item.video_id);
                if (updatedIndex !== -1) {
                    const updatedHistory = [...updatedCurrent];
                    updatedHistory[updatedIndex] = { ...updatedHistory[updatedIndex], synced: true };
                    this.history.set(updatedHistory);
                    this.saveToStorage(updatedHistory);
                }

            } catch (error) {
                console.error('[HistoryRepo] Failed to sync item:', error);
            }
        }
    }

    async removeFromHistory(id: string): Promise<void> {
        // 1. Optimistic Update
        const current = this.history();
        const itemToRemove = current.find(i => i.id === id);
        if (!itemToRemove) return;

        const newHistory = current.filter(i => i.id !== id);
        this.history.set(newHistory);
        this.saveToStorage(newHistory);

        // 2. Remote Sync
        if (this.auth.isLoggedIn()) {
            try {
                const client = await this.pb.getClient();
                // If we have the specific ID and it matches PB format, try delete directly
                // Otherwise find by video_id

                // Simplest strategy: try finding by video_id first as our local ID might be uuid
                const existing = await client.collection('history').getList(1, 1, {
                    filter: `user="${this.auth.getUserId()}" && video_id="${itemToRemove.video_id}"`
                });

                if (existing.items.length > 0) {
                    await client.collection('history').delete(existing.items[0].id);
                }
            } catch (error) {
                console.error('[HistoryRepo] Failed to delete on server:', error);
            }
        }
    }

    async clearHistory(): Promise<void> {
        this.history.set([]);
        this.saveToStorage([]);

        if (this.auth.isLoggedIn()) {
            // Note: PocketBase doesn't have bulk delete easily exposed in JS SDK without loop
            // For now we might just want to support local clear or implement bulk delete later
            // TODO: Implement server-side clear
            console.warn('[HistoryRepo] Clear history on server not fully implemented');
        }
    }

    async refresh(): Promise<void> {
        await this.syncWithRemote();
    }

    // ================= Private Helpers =================

    private async syncWithRemote(): Promise<void> {
        if (!this.auth.isLoggedIn()) return;

        this.isLoading.set(true);
        try {
            const client = await this.pb.getClient();

            // 1. Push unsynced local items
            const unsynced = this.history().filter(h => !h.synced);
            for (const item of unsynced) {
                try {
                    // Check existence first
                    const existing = await client.collection('history').getList(1, 1, {
                        filter: `user="${this.auth.getUserId()}" && video_id="${item.video_id}"`
                    });

                    if (existing.items.length > 0) {
                        // Remote exists, update it (Client wins on sync push?) 
                        // Or should we trust latest watched_at? 
                        // For now, if we are pushing unsynced local, we assume it's newer or relevant
                        await client.collection('history').update(existing.items[0].id, {
                            watched_at: item.watched_at,
                            progress: item.progress,
                            is_favorite: item.is_favorite,
                            languages: item.languages
                        });
                    } else {
                        await client.collection('history').create({
                            user: this.auth.getUserId(),
                            video_id: item.video_id,
                            title: item.title,
                            thumbnail: item.thumbnail,
                            channel: item.channel,
                            duration: item.duration,
                            languages: item.languages,
                            watched_at: item.watched_at,
                            progress: item.progress,
                            is_favorite: item.is_favorite
                        });
                    }
                    console.debug('[HistoryRepo] Pushed unsynced item:', item.video_id);
                } catch (err) {
                    console.error('[HistoryRepo] Failed to push item:', item.video_id, err);
                }
            }

            // 2. Fetch all history from server
            const result = await client.collection('history').getList(1, 100, {
                filter: `user="${this.auth.getUserId()}"`,
                sort: '-watched_at'
            });

            const remoteItems = result.items.map(r => this.recordToHistoryItem(r));

            // 3. Merge Strategy
            // - Remote items are source of truth for synced data
            // - Keep local items that are NOT synced yet (created while offline after the last sync attempt)
            // - De-duplicate by video_id: if a local unsynced item has same video_id as remote, remote wins (assumed clearer state) 
            //   OR we can say local wins if watched_at is newer?
            //   Let's stick to safe merge: Remote wins if conflict, but keep unique local unsynced.

            const remoteVideoIds = new Set(remoteItems.map(i => i.video_id));
            const localUnsyncedUnique = this.history().filter(i => !i.synced && !remoteVideoIds.has(i.video_id));

            const combined = [...remoteItems, ...localUnsyncedUnique];

            // Re-sort
            combined.sort((a, b) => b.watched_at.getTime() - a.watched_at.getTime());

            this.history.set(combined);
            this.saveToStorage(combined);
            console.debug('[HistoryRepo] Synced with remote:', remoteItems.length, 'remote items');

        } catch (error) {
            console.error('[HistoryRepo] Remote sync failed:', error);
        } finally {
            this.isLoading.set(false);
        }
    }

    private loadFromStorage(): void {
        const stored = this.storage.get<{ items: HistoryItem[], updatedAt: string }>(STORAGE_KEY);
        if (stored && stored.items) {
            const items = stored.items.map(item => ({
                ...item,
                watched_at: new Date(item.watched_at)
            }));
            this.history.set(items);
        }
    }

    private saveToStorage(items: HistoryItem[]): void {
        const data = {
            items: items.slice(0, MAX_LOCAL_HISTORY),
            updatedAt: new Date().toISOString()
        };
        this.storage.set(STORAGE_KEY, data);
    }

    private recordToHistoryItem(record: any): HistoryItem {
        return {
            id: record.id,
            video_id: record.video_id,
            title: record.title,
            thumbnail: record.thumbnail,
            channel: record.channel,
            duration: record.duration,
            languages: record.languages,
            language: (record.languages && record.languages.length > 0) ? record.languages[0] : 'en', // Compat
            watched_at: new Date(record.watched_at),
            progress: record.progress,
            is_favorite: record.is_favorite,
            synced: true
        };
    }
}
