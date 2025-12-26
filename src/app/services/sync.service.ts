import { Injectable, inject, effect, untracked, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { VocabularyService } from './vocabulary.service';

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

interface SyncItem {
    word: string;
    reading?: string;
    pinyin?: string;
    romanization?: string;
    meaning: string;
    language: string;
    level: string;
    examples: string[];
    addedAt: number;
    updatedAt: number;
}

@Injectable({
    providedIn: 'root'
})
export class SyncService {
    private http = inject(HttpClient);
    private auth = inject(AuthService);
    private vocab = inject(VocabularyService);

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
     * Set up automatic sync triggers:
     * 1. On login event (new login via Google)
     * 2. On app startup when user is restored from localStorage
     * 3. On vocabulary changes (debounced push)
     */
    private setupAutoSync(): void {
        // Sync when user logs in via Google credential
        this.auth.loginEvent.subscribe((profile) => {
            console.log('[Sync] User logged in:', profile.email);
            this.sync();
        });

        // Sync when user is restored from localStorage (app startup)
        // Use effect to react to user signal changes
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

            // Skip if not logged in or no items
            if (!userId || items.length === 0) return;

            // Calculate a simple hash to detect actual changes
            const hash = this.calculateHash(items);

            untracked(() => {
                // Only push if content actually changed
                if (hash !== this.lastPushedHash) {
                    this.debouncedPush();
                }
            });
        });
    }

    /**
     * Calculate a simple hash of vocabulary items for change detection
     */
    private calculateHash(items: any[]): string {
        return items.map(i => `${i.word}:${i.language}:${i.level}:${i.updatedAt || i.addedAt}`).join('|');
    }

    /**
     * Debounced push to server (2 second delay to batch rapid changes)
     */
    private debouncedPush(): void {
        if (this.pushTimeout) {
            clearTimeout(this.pushTimeout);
        }
        this.pushTimeout = setTimeout(() => {
            this.pushToServerOnly();
        }, 2000);
    }

    /**
     * Push local vocabulary to server without fetching remote
     */
    private async pushToServerOnly(): Promise<void> {
        const userId = this.auth.getUserId();
        if (!userId || this.isSyncing) return;

        const items = this.convertToSyncItems(this.vocab.getAllItems());

        try {
            this.syncStatus.set('syncing');
            await this.pushToServer(userId, items);
            this.lastPushedHash = this.calculateHash(this.vocab.getAllItems());
            this.syncStatus.set('synced');
            this.lastSyncTime.set(new Date());
            console.log('[Sync] Pushed', items.length, 'items to server');
        } catch (error) {
            console.error('[Sync] Push failed:', error);
            this.syncStatus.set('error');
        }
    }

    /**
     * Full bidirectional sync: fetch remote, merge, push merged back
     */
    async sync(): Promise<void> {
        const userId = this.auth.getUserId();
        if (!userId || this.isSyncing) return;

        this.isSyncing = true;
        this.syncStatus.set('syncing');
        console.log('[Sync] Starting full sync for user:', userId);

        try {
            // Fetch remote vocabulary
            const remote = await this.fetchRemote(userId);
            console.log('[Sync] Fetched', remote.length, 'items from server');

            // Get local vocabulary and convert to sync format
            const local = this.convertToSyncItems(this.vocab.getAllItems());
            console.log('[Sync] Local has', local.length, 'items');

            // Merge (prefer newer based on updatedAt)
            const merged = this.mergeItems(local, remote);
            console.log('[Sync] Merged result:', merged.length, 'items');

            // Push merged to server
            await this.pushToServer(userId, merged);

            // Import merged items back to local vocabulary
            this.importToLocal(merged);

            // Update hash to prevent immediate re-push
            this.lastPushedHash = this.calculateHash(this.vocab.getAllItems());

            this.syncStatus.set('synced');
            this.lastSyncTime.set(new Date());
            console.log('[Sync] Sync complete!');
        } catch (error) {
            console.error('[Sync] Failed:', error);
            this.syncStatus.set('error');
        } finally {
            this.isSyncing = false;
        }
    }

    /**
     * Convert VocabularyItem[] to SyncItem[]
     */
    private convertToSyncItems(items: any[]): SyncItem[] {
        return items.map(item => ({
            word: item.word,
            reading: item.reading,
            pinyin: item.pinyin,
            romanization: item.romanization,
            meaning: item.meaning,
            language: item.language,
            level: item.level,
            examples: item.examples,
            addedAt: new Date(item.addedAt).getTime(),
            updatedAt: item.updatedAt ? new Date(item.updatedAt).getTime() : new Date(item.addedAt).getTime()
        }));
    }

    /**
     * Get HTTP headers with auth token
     */
    private getAuthHeaders(): HttpHeaders {
        const token = this.auth.getToken();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        });
    }

    /**
     * Fetch vocabulary from server
     */
    private fetchRemote(userId: string): Promise<SyncItem[]> {
        return new Promise((resolve) => {
            this.http.get<{ success: boolean; items: any[] }>('/api/sync', {
                headers: this.getAuthHeaders()
            }).subscribe({
                next: (res) => {
                    if (res.success && res.items) {
                        resolve(res.items.map(item => ({
                            word: item.word,
                            reading: item.reading,
                            pinyin: item.pinyin,
                            romanization: item.romanization,
                            meaning: item.meaning,
                            language: item.language,
                            level: item.level || 'new',
                            examples: JSON.parse(item.examples || '[]'),
                            addedAt: item.added_at || Date.now(),
                            updatedAt: item.updated_at || item.added_at || Date.now()
                        })));
                    } else {
                        resolve([]);
                    }
                },
                error: (err) => {
                    console.error('[Sync] Fetch failed:', err);
                    resolve([]);
                }
            });
        });
    }

    /**
     * Push vocabulary to server
     */
    private pushToServer(userId: string, items: SyncItem[]): Promise<void> {
        return new Promise((resolve, reject) => {
            this.http.post<{ success: boolean }>('/api/sync', { items }, {
                headers: this.getAuthHeaders()
            }).subscribe({
                next: (res) => {
                    if (res.success) {
                        resolve();
                    } else {
                        reject(new Error('Push failed'));
                    }
                },
                error: (err) => reject(err)
            });
        });
    }

    /**
     * Merge local and remote items - prefer newer based on updatedAt
     */
    private mergeItems(local: SyncItem[], remote: SyncItem[]): SyncItem[] {
        const merged = new Map<string, SyncItem>();

        // Add all local items first
        for (const item of local) {
            merged.set(`${item.word}-${item.language}`, item);
        }

        // Merge remote items, preferring newer versions
        for (const item of remote) {
            const key = `${item.word}-${item.language}`;
            const existing = merged.get(key);

            if (!existing) {
                // New item from remote
                merged.set(key, item);
            } else {
                // Compare timestamps and keep the newer one
                const existingTime = existing.updatedAt || existing.addedAt;
                const remoteTime = item.updatedAt || item.addedAt;
                if (remoteTime > existingTime) {
                    merged.set(key, item);
                }
            }
        }

        return Array.from(merged.values());
    }

    /**
     * Import merged items back to local vocabulary
     */
    private importToLocal(items: SyncItem[]): void {
        const vocabItems = items.map(item => ({
            id: `${item.word}-${item.language}`,
            word: item.word,
            reading: item.reading,
            pinyin: item.pinyin,
            romanization: item.romanization,
            meaning: item.meaning,
            language: item.language as 'ja' | 'zh' | 'ko',
            level: item.level as 'new' | 'learning' | 'known' | 'ignored',
            examples: item.examples,
            addedAt: new Date(item.addedAt),
            updatedAt: new Date(item.updatedAt),
            reviewCount: 0,
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0
        }));

        this.vocab.importItems(vocabItems);
    }

    /**
     * Delete item from server
     */
    deleteFromServer(word: string, language: string): void {
        const userId = this.auth.getUserId();
        if (!userId) return;

        this.http.delete('/api/sync', {
            headers: this.getAuthHeaders(),
            body: { word, language }
        }).subscribe({
            next: () => console.log('[Sync] Deleted from server:', word),
            error: (err) => console.error('[Sync] Delete failed:', err)
        });
    }

    /**
     * Force a full sync (for manual trigger)
     */
    forceSync(): void {
        this.hasInitialSynced = false;
        this.lastPushedHash = '';
        this.sync();
    }
}
