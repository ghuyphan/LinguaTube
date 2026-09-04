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

        // Sync on startup if already logged in
        if (this.auth.isLoggedIn()) {
            this.syncWithRemote();
        }
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

        // 2. Schedule debounced remote sync
        this.scheduleRemoteItemPush(item);
    }

    private remoteSyncTimers = new Map<string, any>();

    private scheduleRemoteItemPush(item: HistoryItem): void {
        if (!this.auth.isLoggedIn()) return;

        const existingTimer = this.remoteSyncTimers.get(item.video_id);
        if (existingTimer) {
            clearTimeout(existingTimer);
        }

        const timer = setTimeout(async () => {
            this.remoteSyncTimers.delete(item.video_id);
            await this.pushItemToRemote(item);
        }, 1500);

        this.remoteSyncTimers.set(item.video_id, timer);
    }

    private async pushItemToRemote(item: HistoryItem): Promise<void> {
        if (!this.auth.isLoggedIn()) return;

        try {
            const client = await this.pb.getClient();
            await this.upsertItemRemote(client, item);

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

    private async upsertItemRemote(client: any, item: HistoryItem): Promise<void> {
        const watchedAtIso = item.watched_at instanceof Date
            ? item.watched_at.toISOString()
            : new Date(item.watched_at).toISOString();

        const existing = await client.collection('history').getList(1, 1, {
            filter: `user="${this.auth.getUserId()}" && video_id="${item.video_id}"`
        });

        if (existing.items.length > 0) {
            await client.collection('history').update(existing.items[0].id, {
                watched_at: watchedAtIso,
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
                watched_at: watchedAtIso,
                progress: item.progress,
                is_favorite: item.is_favorite
            });
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
                    await this.upsertItemRemote(client, item);
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

            // 3. Merge Strategy: Map by video_id, local with newer/equal watched_at wins
            const itemMap = new Map<string, HistoryItem>();
            for (const r of remoteItems) {
                itemMap.set(r.video_id, r);
            }

            for (const local of this.history()) {
                const remote = itemMap.get(local.video_id);
                if (!remote) {
                    itemMap.set(local.video_id, local);
                } else {
                    const localTime = new Date(local.watched_at).getTime();
                    const remoteTime = new Date(remote.watched_at).getTime();
                    if (localTime >= remoteTime) {
                        itemMap.set(local.video_id, {
                            ...local,
                            id: remote.id || local.id,
                            is_favorite: local.is_favorite || remote.is_favorite
                        });
                    }
                }
            }

            const combined = Array.from(itemMap.values());
            combined.sort((a, b) => new Date(b.watched_at).getTime() - new Date(a.watched_at).getTime());

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
