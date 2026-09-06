import { Injectable, inject, signal, Signal } from '@angular/core';
import { IHistoryRepository } from './history.repository';
import { HistoryItem, HistoryRecord } from '../../models';
import { StorageService } from '../services/storage.service';
import { PocketBaseService } from '../services/pocketbase.service';
import { AuthService } from '../services/auth.service';
import type PocketBase from 'pocketbase';

const STORAGE_KEY = 'linguatube_history';
const MAX_LOCAL_HISTORY = 50;

const ALLOWED_LANGS = ['ja', 'zh', 'ko', 'en'] as const;
type SupportedHistoryLang = typeof ALLOWED_LANGS[number];

function sanitizeLang(lang?: string | null): SupportedHistoryLang {
    if (!lang) return 'en';
    const clean = lang.toLowerCase().split('-')[0].trim();
    return (ALLOWED_LANGS as readonly string[]).includes(clean) ? (clean as SupportedHistoryLang) : 'en';
}

function sanitizeLangs(langs?: string[] | null, fallback: SupportedHistoryLang = 'en', maxSelect = 4): SupportedHistoryLang[] {
    if (!Array.isArray(langs)) return [fallback];
    const cleaned = langs
        .map(l => typeof l === 'string' ? l.toLowerCase().split('-')[0].trim() : '')
        .filter((l): l is SupportedHistoryLang => (ALLOWED_LANGS as readonly string[]).includes(l));
    const unique = [...new Set(cleaned)];
    // Ensure primary language (fallback) is prioritized at index 0
    if (fallback && unique.includes(fallback)) {
        unique.splice(unique.indexOf(fallback), 1);
        unique.unshift(fallback);
    }
    // PocketBase history collection supports up to 4 languages
    const sliced = unique.slice(0, maxSelect);
    return sliced.length > 0 ? sliced : [fallback];
}

function sanitizeThumbnail(videoId: string, thumb?: string | null): string {
    if (thumb && /^https?:\/\//i.test(thumb.trim())) {
        return thumb.trim();
    }
    return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
}

function sanitizeTitle(title?: string | null): string {
    return (title && title.trim()) ? title.trim() : 'YouTube Video';
}

function sanitizeChannel(channel?: string | null): string {
    return (channel && channel.trim()) ? channel.trim() : 'YouTube';
}

function sanitizeProgress(progress?: number | null): number {
    const num = Number(progress);
    if (isNaN(num)) return 0;
    return Math.max(0, Math.min(100, Math.round(num)));
}

function sanitizeDuration(duration?: number | null): number {
    const num = Number(duration);
    if (isNaN(num)) return 0;
    return Math.max(0, Math.round(num));
}

function sanitizeWatchedAt(date?: Date | string | null): string {
    if (!date) return new Date().toISOString();
    const d = date instanceof Date ? date : new Date(date);
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

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

    private remoteSyncTimers = new Map<string, ReturnType<typeof setTimeout>>();

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
            const errData = (error && typeof error === 'object' && 'data' in error)
                ? JSON.stringify((error as { data: unknown }).data)
                : '';
            console.error('[HistoryRepo] Failed to sync item:', item.video_id, error, 'Validation details:', errData);
        }
    }

    private async upsertItemRemote(client: PocketBase, item: HistoryItem): Promise<void> {
        const userId = this.auth.getUserId() || client.authStore.record?.id || (client.authStore.model as { id?: string } | null)?.id;
        if (!userId) {
            console.warn('[HistoryRepo] Cannot push history item without authenticated user ID');
            return;
        }

        const language = sanitizeLang(item.language || item.languages?.[0]);
        const languages = sanitizeLangs(item.languages, language);
        const progress = sanitizeProgress(item.progress);
        const watchedAtIso = sanitizeWatchedAt(item.watched_at);
        const thumbnail = sanitizeThumbnail(item.video_id, item.thumbnail);
        const title = sanitizeTitle(item.title);
        const channel = sanitizeChannel(item.channel);
        const duration = sanitizeDuration(item.duration);
        const is_favorite = Boolean(item.is_favorite);

        const payload = {
            user: userId,
            video_id: item.video_id,
            title,
            thumbnail,
            channel,
            duration,
            language,
            languages,
            watched_at: watchedAtIso,
            progress,
            is_favorite
        };

        const existing = await client.collection('history').getList(1, 1, {
            filter: `user="${userId}" && video_id="${item.video_id}"`,
            requestKey: null
        });

        if (existing.items.length > 0) {
            await client.collection('history').update(existing.items[0].id, {
                watched_at: watchedAtIso,
                progress,
                is_favorite,
                language,
                languages,
                title,
                thumbnail,
                channel,
                duration
            }, { requestKey: null });
        } else {
            await client.collection('history').create(payload, { requestKey: null });
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
                    filter: `user="${this.auth.getUserId()}" && video_id="${itemToRemove.video_id}"`,
                    requestKey: null
                });

                if (existing.items.length > 0) {
                    await client.collection('history').delete(existing.items[0].id, { requestKey: null });
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
            const userId = this.auth.getUserId() || client.authStore.record?.id || (client.authStore.model as { id?: string } | null)?.id;
            if (!userId) {
                console.warn('[HistoryRepo] Cannot sync history without authenticated user ID');
                return;
            }

            // 1. Push unsynced local items
            const unsynced = this.history().filter(h => !h.synced);
            for (const item of unsynced) {
                try {
                    await this.upsertItemRemote(client, item);
                    item.synced = true;
                    console.debug('[HistoryRepo] Pushed unsynced item:', item.video_id);
                } catch (err: unknown) {
                    const errData = (err && typeof err === 'object' && 'data' in err)
                        ? JSON.stringify((err as { data: unknown }).data)
                        : '';
                    console.error('[HistoryRepo] Failed to push item:', item.video_id, err, 'Validation details:', errData);
                }
            }

            // 2. Fetch all history from server
            const result = await client.collection('history').getList(1, 100, {
                filter: `user="${userId}"`,
                sort: '-watched_at',
                requestKey: null
            });

            const remoteItems = result.items.map(r => this.recordToHistoryItem(r as unknown as HistoryRecord));

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
            const items = stored.items.map(item => {
                const lang = sanitizeLang(item.language || item.languages?.[0]);
                const langs = sanitizeLangs(item.languages, lang);
                return {
                    ...item,
                    language: lang,
                    languages: langs,
                    progress: sanitizeProgress(item.progress),
                    duration: sanitizeDuration(item.duration),
                    title: sanitizeTitle(item.title),
                    thumbnail: sanitizeThumbnail(item.video_id, item.thumbnail),
                    channel: sanitizeChannel(item.channel),
                    watched_at: item.watched_at ? new Date(item.watched_at) : new Date()
                };
            });
            this.history.set(items);
            this.saveToStorage(items);
        }
    }

    private saveToStorage(items: HistoryItem[]): void {
        const data = {
            items: items.slice(0, MAX_LOCAL_HISTORY),
            updatedAt: new Date().toISOString()
        };
        this.storage.set(STORAGE_KEY, data);
    }

    private recordToHistoryItem(record: HistoryRecord | Record<string, unknown>): HistoryItem {
        const r = record as HistoryRecord;
        const language = sanitizeLang(r.language || (r.languages && r.languages.length > 0 ? r.languages[0] : 'en'));
        const languages = sanitizeLangs(r.languages, language);

        return {
            id: r.id,
            video_id: r.video_id,
            title: sanitizeTitle(r.title),
            thumbnail: sanitizeThumbnail(r.video_id, r.thumbnail),
            channel: sanitizeChannel(r.channel),
            duration: sanitizeDuration(r.duration),
            languages,
            language,
            watched_at: r.watched_at ? new Date(r.watched_at) : new Date(),
            progress: sanitizeProgress(r.progress),
            is_favorite: !!r.is_favorite,
            synced: true
        };
    }
}
