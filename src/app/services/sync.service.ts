import { Injectable, inject, effect, untracked, signal } from '@angular/core';
import { AuthService, PocketBaseService } from '../core/services';
import { VocabularyService } from '../features/vocabulary';
import { HistoryService } from '../features/history';
import type { RecordModel } from 'pocketbase';

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

interface SyncItem {
    id: string; // Deterministic ID
    word: string;
    reading?: string;
    pinyin?: string;
    romanization?: string;
    meaning: string;
    language: string;
    level: string;
    examples: string[];
    created?: string;
    updated?: string;
}

interface HistorySyncItem {
    id: string;
    video_id: string;
    title: string;
    thumbnail?: string;
    channel?: string;
    duration?: number;
    language: string;
    watched_at: string;
    progress: number;
    is_favorite: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class SyncService {
    private auth = inject(AuthService);
    private vocab = inject(VocabularyService);
    private historyService = inject(HistoryService);
    private pb = inject(PocketBaseService);

    private isSyncing = false;
    private pushTimeout: ReturnType<typeof setTimeout> | null = null;
    private lastPushedHash = '';
    private hasInitialSynced = false;

    // Public sync status signals
    readonly syncStatus = signal<SyncStatus>('idle');
    readonly lastSyncTime = signal<Date | null>(null);

    constructor() {
        this.setupAutoSync();
    }

    /**
     * Sanitize values for PocketBase filter strings to prevent injection
     */
    private sanitizeFilterValue(value: string): string {
        // Escape backslashes first, then double quotes
        return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    }

    /**
     * Set up automatic sync triggers
     */
    private setupAutoSync(): void {
        // Sync when user logs in
        this.auth.loginEvent.subscribe((profile) => {
            console.log('[Sync] User logged in:', profile.email);
            this.sync();
        });

        // Sync when user is restored from localStorage (app startup)
        effect(() => {
            const user = this.auth.user();
            if (user && !this.hasInitialSynced) {
                untracked(() => {
                    console.log('[Sync] User restored from storage, syncing...');
                    this.hasInitialSynced = true;
                    this.sync();
                });
            }
        });

        // Watch vocabulary changes and push to server (debounced)
        effect(() => {
            const items = this.vocab.vocabulary();
            const userId = untracked(() => this.auth.getUserId());

            if (!userId || items.length === 0) return;

            const hash = this.calculateHash(items);

            untracked(() => {
                if (hash !== this.lastPushedHash) {
                    this.debouncedPush();
                }
            });
        });
    }

    private calculateHash(items: any[]): string {
        return items.map(i => `${i.word}:${i.language}:${i.level}:${i.updatedAt || i.addedAt}`).join('|');
    }

    private debouncedPush(): void {
        if (this.pushTimeout) {
            clearTimeout(this.pushTimeout);
        }
        this.pushTimeout = setTimeout(() => {
            this.pushToServerOnly();
        }, 2000);
    }

    /**
     * Push local vocabulary to PocketBase
     */
    private async pushToServerOnly(): Promise<void> {
        const userId = this.auth.getUserId();
        if (!userId || this.isSyncing) return;

        const items = this.convertToSyncItems(this.vocab.getAllItems());

        try {
            this.syncStatus.set('syncing');
            await this.pushToPocketBase(items);
            this.lastPushedHash = this.calculateHash(this.vocab.getAllItems());
            this.syncStatus.set('synced');
            this.lastSyncTime.set(new Date());
            console.log('[Sync] Pushed', items.length, 'items to PocketBase');
        } catch (error) {
            console.error('[Sync] Push failed:', error);
            this.syncStatus.set('error');
        }
    }

    /**
     * Full bidirectional sync with PocketBase
     */
    async sync(): Promise<void> {
        const userId = this.auth.getUserId();
        if (!userId || this.isSyncing) return;

        this.isSyncing = true;
        this.syncStatus.set('syncing');
        console.log('[Sync] Starting full sync with PocketBase for user:', userId);

        try {
            // Sync vocabulary
            const remote = await this.fetchFromPocketBase();
            console.log('[Sync] Fetched', remote.length, 'vocab items from PocketBase');

            const local = this.convertToSyncItems(this.vocab.getAllItems());
            console.log('[Sync] Local has', local.length, 'vocab items');

            const merged = this.mergeItems(local, remote);
            console.log('[Sync] Merged vocab result:', merged.length, 'items');

            await this.pushToPocketBase(merged);
            this.importToLocal(merged);
            this.lastPushedHash = this.calculateHash(this.vocab.getAllItems());

            // Sync history
            await this.syncHistory();

            this.syncStatus.set('synced');
            this.lastSyncTime.set(new Date());
            console.log('[Sync] Full sync complete!');
        } catch (error) {
            console.error('[Sync] Failed:', error);
            this.syncStatus.set('error');
        } finally {
            this.isSyncing = false;
        }
    }

    private convertToSyncItems(items: any[]): SyncItem[] {
        return items.map(item => ({
            id: item.id,
            word: item.word,
            reading: item.reading,
            pinyin: item.pinyin,
            romanization: item.romanization,
            meaning: item.meaning,
            language: item.language,
            level: item.level,
            examples: item.examples || [],
            // Preserve timestamps for merge comparison
            updated: item.updatedAt ? new Date(item.updatedAt).toISOString() : undefined,
            created: item.addedAt ? new Date(item.addedAt).toISOString() : undefined
        }));
    }

    /**
     * Fetch vocabulary from PocketBase
     */
    private async fetchFromPocketBase(): Promise<SyncItem[]> {
        try {
            const client = await this.pb.getClient();
            const userId = client.authStore.model?.id;

            if (!userId) {
                console.log('[Sync] No authenticated user');
                return [];
            }

            const records = await client.collection('vocabulary').getFullList({
                filter: `user = "${userId}"`,
                sort: '-updated'
            });

            return records.map((record: RecordModel) => ({
                id: record.id,
                word: record['word'] || '',
                reading: record['reading'],
                pinyin: record['pinyin'],
                romanization: record['romanization'],
                meaning: record['meaning'] || '',
                language: record['language'] || 'ja',
                level: record['level'] || 'new',
                examples: record['examples'] || [],
                created: record['created'],
                updated: record['updated']
            }));
        } catch (error) {
            console.error('[Sync] Fetch from PocketBase failed:', error);
            return [];
        }
    }

    /**
     * Push vocabulary to PocketBase with batch operations and retry
     */
    private async pushToPocketBase(items: SyncItem[]): Promise<void> {
        const client = await this.pb.getClient();
        const userId = client.authStore.model?.id;

        if (!userId) {
            throw new Error('Not authenticated');
        }

        // Get existing records to know which to update vs create
        const existingRecords = await client.collection('vocabulary').getFullList({
            filter: `user = "${userId}"`
        });

        const existingMap = new Map<string, RecordModel>();
        for (const record of existingRecords) {
            // First try by ID (new deterministic way)
            existingMap.set(record.id, record);
            // Also keep word-lang mapping for legacy records
            const key = `${record['word']}-${record['language']}`;
            if (!existingMap.has(key)) {
                existingMap.set(key, record);
            }
        }

        // Prepare batch operations
        const operations: Array<{ item: SyncItem; existing: RecordModel | undefined }> = [];
        for (const item of items) {
            // Check by ID first, then by word-lang key
            const existing = existingMap.get(item.id) || existingMap.get(`${item.word}-${item.language}`);
            operations.push({ item, existing });
        }

        // Process in parallel batches of 10
        const BATCH_SIZE = 10;
        for (let i = 0; i < operations.length; i += BATCH_SIZE) {
            const batch = operations.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(({ item, existing }) =>
                this.syncItemWithRetry(client, userId, item, existing)
            ));
        }
    }

    /**
     * Sync a single item with retry logic (exponential backoff)
     */
    private async syncItemWithRetry(
        client: Awaited<ReturnType<typeof this.pb.getClient>>,
        userId: string,
        item: SyncItem,
        existing: RecordModel | undefined,
        retries = 3
    ): Promise<void> {
        const data = {
            word: item.word,
            reading: item.reading || '',
            pinyin: item.pinyin || '',
            romanization: item.romanization || '',
            meaning: item.meaning,
            language: item.language,
            level: item.level,
            examples: item.examples,
            user: userId
        };

        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                if (existing) {
                    await client.collection('vocabulary').update(existing.id, data);
                } else {
                    // Use deterministic ID for creation
                    await client.collection('vocabulary').create({ ...data, id: item.id });
                }
                return; // Success
            } catch (error: any) {
                const isLastAttempt = attempt === retries - 1;
                const isNetworkError = error?.message?.includes('fetch') || error?.status === 0;

                if (isLastAttempt || !isNetworkError) {
                    console.error('[Sync] Failed to sync item after retries:', item.word, error);
                    return; // Give up
                }

                // Exponential backoff: 1s, 2s, 4s
                const delay = Math.pow(2, attempt) * 1000;
                console.warn(`[Sync] Retry ${attempt + 1}/${retries} for ${item.word} in ${delay}ms`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    /**
     * Merge local and remote items - prefer newer based on updated timestamp
     */
    private mergeItems(local: SyncItem[], remote: SyncItem[]): SyncItem[] {
        const merged = new Map<string, SyncItem>();

        // Add all local items first
        for (const item of local) {
            merged.set(`${item.word}-${item.language}`, item);
        }

        // Merge remote items, preferring newer versions based on timestamp comparison
        for (const item of remote) {
            const key = `${item.word}-${item.language}`;
            const existing = merged.get(key);

            if (!existing) {
                // Remote item doesn't exist locally - add it
                merged.set(key, item);
            } else {
                // Both exist - compare timestamps to determine which is newer
                const remoteTime = item.updated ? new Date(item.updated).getTime() : 0;
                const localTime = existing.updated ? new Date(existing.updated).getTime() : 0;

                if (remoteTime > localTime) {
                    // Remote is newer - use remote version
                    merged.set(key, item);
                }
                // Otherwise keep existing (local) version
            }
        }

        return Array.from(merged.values());
    }

    /**
     * Import merged items back to local vocabulary
     */
    private importToLocal(items: SyncItem[]): void {
        const vocabItems = items.map(item => ({
            id: item.id || `${item.word}-${item.language}`,
            word: item.word,
            reading: item.reading,
            pinyin: item.pinyin,
            romanization: item.romanization,
            meaning: item.meaning,
            language: item.language as 'ja' | 'zh' | 'ko',
            level: item.level as 'new' | 'learning' | 'known' | 'ignored',
            examples: item.examples,
            addedAt: item.created ? new Date(item.created) : new Date(),
            updatedAt: item.updated ? new Date(item.updated) : new Date(),
            reviewCount: 0,
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0
        }));

        this.vocab.importItems(vocabItems);
    }

    /**
     * Delete item from PocketBase
     */
    async deleteFromServer(word: string, language: string): Promise<void> {
        try {
            const client = await this.pb.getClient();
            const userId = client.authStore.model?.id;

            if (!userId) return;

            // Find the record
            const records = await client.collection('vocabulary').getFullList({
                filter: `user = "${userId}" && word = "${this.sanitizeFilterValue(word)}" && language = "${this.sanitizeFilterValue(language)}"`
            });

            // Delete if found
            for (const record of records) {
                await client.collection('vocabulary').delete(record.id);
                console.log('[Sync] Deleted from PocketBase:', word);
            }
        } catch (error) {
            console.error('[Sync] Delete failed:', error);
        }
    }

    /**
     * Force a full sync (for manual trigger)
     */
    forceSync(): void {
        this.hasInitialSynced = false;
        this.lastPushedHash = '';
        this.sync();
    }

    // ==================== History Sync ====================

    /**
     * Sync history with PocketBase
     * Note: This is called from within sync() which already sets isSyncing
     */
    async syncHistory(): Promise<void> {
        const userId = this.auth.getUserId();
        if (!userId) return;

        console.log('[Sync] Starting history sync...');

        try {
            // Fetch remote history
            const remote = await this.fetchHistoryFromPocketBase();
            console.log('[Sync] Fetched', remote.length, 'history items from PocketBase');

            // Get local history
            const local = this.convertToHistorySyncItems(this.historyService.getAllItems());
            console.log('[Sync] Local has', local.length, 'history items');

            // Merge (prefer newer based on watched_at)
            const merged = this.mergeHistoryItems(local, remote);
            console.log('[Sync] Merged history result:', merged.length, 'items');

            // Push merged to PocketBase
            await this.pushHistoryToPocketBase(merged);

            // Import merged items back to local
            this.importHistoryToLocal(merged);

            console.log('[Sync] History sync complete!');
        } catch (error) {
            console.error('[Sync] History sync failed:', error);
        }
    }

    private convertToHistorySyncItems(items: any[]): HistorySyncItem[] {
        return items.map(item => ({
            id: item.id,
            video_id: item.video_id,
            title: item.title,
            thumbnail: item.thumbnail,
            channel: item.channel,
            duration: item.duration,
            language: item.language,
            watched_at: item.watched_at instanceof Date
                ? item.watched_at.toISOString()
                : item.watched_at,
            progress: item.progress,
            is_favorite: item.is_favorite
        }));
    }

    private async fetchHistoryFromPocketBase(): Promise<HistorySyncItem[]> {
        try {
            const client = await this.pb.getClient();
            const userId = client.authStore.model?.id;

            if (!userId) return [];

            const records = await client.collection('history').getFullList({
                filter: `user = "${userId}"`,
                sort: '-watched_at'
            });

            return records.map((record: RecordModel) => ({
                id: record.id,
                video_id: record['video_id'] || '',
                title: record['title'] || '',
                thumbnail: record['thumbnail'],
                channel: record['channel'],
                duration: record['duration'],
                language: record['language'] || 'en',
                watched_at: record['watched_at'],
                progress: record['progress'] || 0,
                is_favorite: record['is_favorite'] || false
            }));
        } catch (error) {
            console.error('[Sync] Fetch history from PocketBase failed:', error);
            return [];
        }
    }

    private async pushHistoryToPocketBase(items: HistorySyncItem[]): Promise<void> {
        const client = await this.pb.getClient();
        const userId = client.authStore.model?.id;

        if (!userId) {
            throw new Error('Not authenticated');
        }

        // Get existing records
        const existingRecords = await client.collection('history').getFullList({
            filter: `user = "${userId}"`
        });

        const existingByVideoId = new Map<string, RecordModel>();
        for (const record of existingRecords) {
            existingByVideoId.set(record['video_id'], record);
        }

        // Process items
        const BATCH_SIZE = 10;
        for (let i = 0; i < items.length; i += BATCH_SIZE) {
            const batch = items.slice(i, i + BATCH_SIZE);
            await Promise.all(batch.map(async (item) => {
                const existing = existingByVideoId.get(item.video_id);
                const data = {
                    video_id: item.video_id,
                    title: item.title,
                    thumbnail: item.thumbnail || '',
                    channel: item.channel || '',
                    duration: item.duration || 0,
                    language: item.language,
                    watched_at: item.watched_at,
                    progress: item.progress,
                    is_favorite: item.is_favorite,
                    user: userId
                };

                try {
                    if (existing) {
                        await client.collection('history').update(existing.id, data);
                    } else {
                        await client.collection('history').create(data);
                    }
                } catch (error) {
                    console.error('[Sync] Failed to sync history item:', item.video_id, error);
                }
            }));
        }
    }

    private mergeHistoryItems(local: HistorySyncItem[], remote: HistorySyncItem[]): HistorySyncItem[] {
        const merged = new Map<string, HistorySyncItem>();

        // Add all local items
        for (const item of local) {
            merged.set(item.video_id, item);
        }

        // Merge remote items, prefer newer watched_at
        for (const item of remote) {
            const existing = merged.get(item.video_id);

            if (!existing) {
                merged.set(item.video_id, item);
            } else {
                const remoteTime = new Date(item.watched_at).getTime();
                const localTime = new Date(existing.watched_at).getTime();

                if (remoteTime > localTime) {
                    merged.set(item.video_id, item);
                }
            }
        }

        return Array.from(merged.values());
    }

    private importHistoryToLocal(items: HistorySyncItem[]): void {
        const historyItems = items.map(item => ({
            id: item.id,
            video_id: item.video_id,
            title: item.title,
            thumbnail: item.thumbnail,
            channel: item.channel,
            duration: item.duration,
            language: item.language as 'ja' | 'zh' | 'ko' | 'en',
            watched_at: new Date(item.watched_at),
            progress: item.progress,
            is_favorite: item.is_favorite
        }));

        this.historyService.importItems(historyItems);
    }

    /**
     * Delete history item from PocketBase
     */
    async deleteHistoryFromServer(videoId: string): Promise<void> {
        try {
            const client = await this.pb.getClient();
            const userId = client.authStore.model?.id;

            if (!userId) return;

            const records = await client.collection('history').getFullList({
                filter: `user = "${userId}" && video_id = "${this.sanitizeFilterValue(videoId)}"`
            });

            for (const record of records) {
                await client.collection('history').delete(record.id);
                console.log('[Sync] Deleted history from PocketBase:', videoId);
            }
        } catch (error) {
            console.error('[Sync] Delete history failed:', error);
        }
    }
}
