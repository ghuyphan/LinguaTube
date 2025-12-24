import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { VocabularyService } from './vocabulary.service';

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
    updatedAt: number;  // Track last modification time
}

@Injectable({
    providedIn: 'root'
})
export class SyncService {
    private http = inject(HttpClient);
    private auth = inject(AuthService);
    private vocab = inject(VocabularyService);

    private isSyncing = false;

    /**
     * Sync vocabulary with cloud (bidirectional)
     */
    async sync(): Promise<void> {
        const userId = this.auth.getUserId();
        if (!userId || this.isSyncing) return;

        this.isSyncing = true;

        try {
            // Fetch remote vocabulary
            const remote = await this.fetchRemote(userId);

            // Get local vocabulary and convert to sync format
            const now = Date.now();
            const local = this.vocab.getAllItems().map(item => ({
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

            // Merge (prefer newer based on updatedAt)
            const merged = this.mergeItems(local, remote);

            // Push merged to server
            await this.pushToServer(userId, merged);

            // Import merged items back to local vocabulary
            this.importToLocal(merged);
        } catch (error) {
            console.error('[Sync] Failed:', error);
        } finally {
            this.isSyncing = false;
        }
    }

    /**
     * Fetch vocabulary from server
     */
    private fetchRemote(userId: string): Promise<SyncItem[]> {
        return new Promise((resolve) => {
            this.http.get<{ success: boolean; items: any[] }>(`/api/sync?userId=${userId}`).subscribe({
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
                error: () => resolve([])
            });
        });
    }

    /**
     * Push vocabulary to server
     */
    private pushToServer(userId: string, items: SyncItem[]): Promise<void> {
        return new Promise((resolve) => {
            this.http.post('/api/sync', { userId, items }).subscribe({
                next: () => resolve(),
                error: () => resolve()
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
            body: { userId, word, language }
        }).subscribe();
    }
}
