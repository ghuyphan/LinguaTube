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
     * Sync vocabulary with cloud
     */
    async sync(): Promise<void> {
        const userId = this.auth.getUserId();
        if (!userId || this.isSyncing) return;

        this.isSyncing = true;

        try {
            // Fetch remote vocabulary
            const remote = await this.fetchRemote(userId);

            // Get local vocabulary and convert to sync format
            const local = this.vocab.getAllItems().map(item => ({
                word: item.word,
                reading: item.reading,
                pinyin: item.pinyin,
                romanization: item.romanization,
                meaning: item.meaning,
                language: item.language,
                level: item.level,
                examples: item.examples,
                addedAt: new Date(item.addedAt).getTime()
            }));

            // Merge (prefer remote for conflicts based on addedAt)
            const merged = this.mergeItems(local, remote);

            // Push merged to server
            await this.pushToServer(userId, merged);
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
                            addedAt: item.added_at || Date.now()
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
     * Merge local and remote items
     */
    private mergeItems(local: SyncItem[], remote: SyncItem[]): SyncItem[] {
        const merged = new Map<string, SyncItem>();

        for (const item of local) {
            merged.set(`${item.word}-${item.language}`, item);
        }

        for (const item of remote) {
            const key = `${item.word}-${item.language}`;
            if (!merged.has(key)) {
                merged.set(key, item);
            }
        }

        return Array.from(merged.values());
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
