import { Injectable, inject, signal, Signal } from '@angular/core';
import { IHistoryRepository } from './history.repository';
import { HistoryItem, HistoryRecord } from '../../models';
import { StorageService } from '../services/storage.service';
import { SupabaseService } from '../services/supabase.service';
import { AuthService } from '../services/auth.service';
import { getYouTubeThumbnail } from '../utils';
import { generateDeterministicRecordId, mergeByTimestamp } from '../../shared/utils/sync.utils';

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
    const sliced = unique.slice(0, maxSelect);
    return sliced.length > 0 ? sliced : [fallback];
}

function sanitizeThumbnail(videoId: string, thumb?: string | null): string {
    if (thumb && /^https?:\/\//i.test(thumb.trim())) {
        return thumb.trim();
    }
    return getYouTubeThumbnail(videoId, 'mqdefault');
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
    private supabase = inject(SupabaseService);
    private auth = inject(AuthService);

    // Source of truth signal
    private history = signal<HistoryItem[]>([]);
    readonly isLoading = signal(false);

    constructor() {
        this.loadFromStorage();

        // Initial sync on startup if already authenticated
        if (this.auth.isLoggedIn()) {
            this.syncWithRemote();
        }

        // Auto-sync when user logs in
        this.auth.loginEvent.subscribe(() => {
            this.syncWithRemote();
        });

        // Auto-sync when network reconnects
        this.supabase.reconnectEvent.subscribe(() => {
            if (this.auth.isLoggedIn()) {
                this.syncWithRemote();
            }
        });

        // Clear history and storage when user logs out
        this.auth.logoutEvent.subscribe(() => {
            this.history.set([]);
            this.storage.remove(STORAGE_KEY);
            this.storage.remove('linguatube_deleted_history_video_ids');
            this.remoteSyncTimers.forEach(t => clearTimeout(t));
            this.remoteSyncTimers.clear();
        });
    }

    getHistory(): Signal<HistoryItem[]> {
        return this.history.asReadonly();
    }

    async getHistoryItem(id: string): Promise<HistoryItem | null> {
        return this.history().find(i => i.id === id) || null;
    }

    async addToHistory(item: HistoryItem): Promise<void> {
        // 1. Optimistic Update (Local first)
        const current = this.history();
        const existingIndex = current.findIndex(i => i.video_id === item.video_id);

        let newHistory: HistoryItem[];

        if (existingIndex !== -1) {
            // Update existing
            const existing = current[existingIndex];
            const updated: HistoryItem = {
                ...existing,
                ...item,
                id: existing.id,
                watched_at: item.watched_at || new Date(),
                progress: Math.max(existing.progress, item.progress),
                synced: false
            };
            newHistory = [
                updated,
                ...current.slice(0, existingIndex),
                ...current.slice(existingIndex + 1)
            ];
        } else {
            // Add new
            newHistory = [{ ...item, synced: false }, ...current];
        }

        // Limit size
        if (newHistory.length > MAX_LOCAL_HISTORY) {
            newHistory = newHistory.slice(0, MAX_LOCAL_HISTORY);
        }

        this.history.set(newHistory);
        this.saveToStorage(newHistory);

        // 2. Debounced Remote Push
        this.triggerRemotePush(item);
    }

    private remoteSyncTimers = new Map<string, ReturnType<typeof setTimeout>>();

    private triggerRemotePush(item: HistoryItem): void {
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
            await this.upsertItemRemote(item);

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
            console.error('[HistoryRepo] Failed to sync item:', item.video_id, error);
        }
    }

    private async upsertItemRemote(item: HistoryItem): Promise<void> {
        const userId = this.auth.getUserId();
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

        const recordId = generateDeterministicRecordId('hist', userId, item.video_id);
        const payload = {
            id: recordId,
            user_id: userId,
            video_id: item.video_id,
            title,
            thumbnail,
            channel,
            duration,
            language,
            languages,
            watched_at: watchedAtIso,
            progress,
            is_favorite,
            updated_at: new Date().toISOString()
        };

        const { error } = await this.supabase.client
            .from('history')
            .upsert(payload, { onConflict: 'id' });

        if (error) {
            throw error;
        }
    }

    async removeFromHistory(id: string): Promise<void> {
        // 1. Optimistic Update
        const current = this.history();
        const itemToRemove = current.find(i => i.id === id);
        if (!itemToRemove) return;

        // Record deletion tombstone to prevent zombie resurrection on sync
        this.addDeletionTombstone(itemToRemove.video_id);

        const newHistory = current.filter(i => i.id !== id);
        this.history.set(newHistory);
        this.saveToStorage(newHistory, true);

        // 2. Remote Sync
        if (this.auth.isLoggedIn()) {
            try {
                const userId = this.auth.getUserId();
                if (userId) {
                    await this.supabase.client
                        .from('history')
                        .delete()
                        .eq('user_id', userId)
                        .eq('video_id', itemToRemove.video_id);
                    this.removeDeletionTombstone(itemToRemove.video_id);
                }
            } catch (error) {
                console.warn('[HistoryRepo] Failed to delete on server (offline):', error);
            }
        }
    }

    async clearHistory(): Promise<void> {
        // 1. Clear local
        const current = this.history();
        for (const item of current) {
            this.addDeletionTombstone(item.video_id);
        }
        this.history.set([]);
        this.saveToStorage([], true);

        if (this.auth.isLoggedIn()) {
            try {
                const userId = this.auth.getUserId();
                if (userId) {
                    await this.supabase.client
                        .from('history')
                        .delete()
                        .eq('user_id', userId);
                    this.storage.remove('linguatube_deleted_history_video_ids');
                }
            } catch (error) {
                console.warn('[HistoryRepo] Clear history on server failed:', error);
            }
        }
    }

    async refresh(): Promise<void> {
        await this.syncWithRemote();
    }

    // ================= Private Helpers =================

    private getDeletionTombstones(): string[] {
        return this.storage.get<string[]>('linguatube_deleted_history_video_ids') || [];
    }

    private addDeletionTombstone(videoId: string): void {
        const tombstones = this.getDeletionTombstones();
        if (!tombstones.includes(videoId)) {
            tombstones.push(videoId);
            this.storage.set('linguatube_deleted_history_video_ids', tombstones);
        }
    }

    private removeDeletionTombstone(videoId: string): void {
        const tombstones = this.getDeletionTombstones().filter(v => v !== videoId);
        this.storage.set('linguatube_deleted_history_video_ids', tombstones);
    }

    private async syncWithRemote(): Promise<void> {
        if (!this.auth.isLoggedIn()) return;

        this.isLoading.set(true);
        try {
            const userId = this.auth.getUserId();
            if (!userId) {
                console.warn('[HistoryRepo] Cannot sync history without authenticated user ID');
                return;
            }

            // 0. Process pending deletion tombstones
            const tombstones = this.getDeletionTombstones();
            for (const videoId of tombstones) {
                try {
                    await this.supabase.client
                        .from('history')
                        .delete()
                        .eq('user_id', userId)
                        .eq('video_id', videoId);
                    this.removeDeletionTombstone(videoId);
                } catch {
                    // Retry next sync
                }
            }

            // 1. Push unsynced local items
            const unsynced = this.history().filter(h => !h.synced);
            for (const item of unsynced) {
                try {
                    await this.upsertItemRemote(item);
                    item.synced = true;
                    console.debug('[HistoryRepo] Pushed unsynced item:', item.video_id);
                } catch (err: unknown) {
                    console.error('[HistoryRepo] Failed to push item:', item.video_id, err);
                }
            }

            // 2. Fetch all history from server
            const { data: records, error } = await this.supabase.client
                .from('history')
                .select('*')
                .eq('user_id', userId)
                .order('watched_at', { ascending: false })
                .limit(MAX_LOCAL_HISTORY);

            if (error) {
                console.warn('[HistoryRepo] Remote fetch failed:', error);
                return;
            }

            const activeTombstones = new Set(this.getDeletionTombstones());
            const remoteItems = (records || [])
                .map(r => this.recordToHistoryItem(r as unknown as HistoryRecord))
                .filter(r => !activeTombstones.has(r.video_id));

            // 3. Merge Strategy: using canonical mergeByTimestamp (mandated by Rule 4)
            const combined = mergeByTimestamp(
                this.history(),
                remoteItems,
                item => item.video_id,
                item => new Date(item.watched_at).getTime()
            );
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
                    watched_at: item.watched_at ? new Date(item.watched_at) : new Date(),
                    level: item.level,
                    levels: item.levels
                };
            });
            this.history.set(items);
            this.saveToStorage(items);
        }
    }

    private saveDebounceTimer: ReturnType<typeof setTimeout> | null = null;

    private saveToStorage(items: HistoryItem[], immediate = false): void {
        const doSave = () => {
            const data = {
                items: items.slice(0, MAX_LOCAL_HISTORY),
                updatedAt: new Date().toISOString()
            };
            this.storage.set(STORAGE_KEY, data);
        };

        if (immediate) {
            if (this.saveDebounceTimer) {
                clearTimeout(this.saveDebounceTimer);
                this.saveDebounceTimer = null;
            }
            doSave();
            return;
        }

        if (this.saveDebounceTimer) {
            clearTimeout(this.saveDebounceTimer);
        }
        this.saveDebounceTimer = setTimeout(() => {
            this.saveDebounceTimer = null;
            doSave();
        }, 1500);
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
            level: typeof r.level === 'string' ? r.level : undefined,
            synced: true
        };
    }
}
