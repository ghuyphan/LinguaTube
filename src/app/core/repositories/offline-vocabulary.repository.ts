import { Injectable, inject, signal, effect, untracked } from '@angular/core';
import { IVocabularyRepository } from './vocabulary.repository';
import { VocabularyItem, WordLevel, DictionaryEntry } from '../../models';
import { AuthService, StorageService, PocketBaseService } from '../services';
import { calculateHash, mergeByTimestamp, processBatch, withRetry } from '../../shared/utils/sync.utils';
import { getJapaneseRomaji } from '../../shared/utils/japanese-romaji';

const STORAGE_KEY = 'linguatube_vocabulary';
const SAVE_DEBOUNCE_MS = 300;

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

@Injectable({
    providedIn: 'root'
})
export class OfflineVocabularyRepository implements IVocabularyRepository {
    private auth = inject(AuthService);
    private storage = inject(StorageService);
    private pb = inject(PocketBaseService);

    // State
    readonly vocabulary = signal<VocabularyItem[]>([]);
    readonly isSyncing = signal(false);

    // Initial empty stats
    private readonly initialStats = { total: 0, new: 0, learning: 0, known: 0, ignored: 0, japanese: 0, chinese: 0, korean: 0 };
    readonly stats = signal<typeof this.initialStats>(this.initialStats);

    private saveTimeout: ReturnType<typeof setTimeout> | null = null;
    private lastPushedHash = '';

    constructor() {
        this.loadFromStorage();
        this.setupAutoSync();
    }

    // ==================== Public API ====================

    getVocabulary(): VocabularyItem[] {
        return this.vocabulary();
    }

    findWord(word: string): VocabularyItem | undefined {
        return this.vocabulary().find(item => item.word === word);
    }

    hasWord(word: string): boolean {
        return this.vocabulary().some(item => item.word === word);
    }

    getStats() {
        return this.stats();
    }

    async addWord(
        word: string,
        meaning: string,
        language: 'ja' | 'zh' | 'ko' | 'en',
        reading?: string,
        pinyin?: string,
        romanization?: string,
        sourceSentence?: string
    ): Promise<VocabularyItem> {
        const userId = this.auth.user()?.id || 'local';
        const id = this.generateVocabId(userId, word, language);

        const existing = this.vocabulary().find(v => v.id === id);
        if (existing) return existing;

        const item: VocabularyItem = {
            id,
            word,
            reading,
            pinyin,
            romanization: this.normalizeRomanization(language, reading, romanization, word),
            meaning,
            language,
            level: 'new',
            examples: [],
            addedAt: new Date(),
            updatedAt: new Date(),
            reviewCount: 0,
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0,
            sourceSentence
        };

        this.updateLocal([item, ...this.vocabulary()]);

        // Optimistic: Try to push single item immediately if online
        if (this.auth.isLoggedIn()) {
            this.pushSingleItem(item).catch(err => console.error('[VocabRepo] Failed to push new word:', err));
        }

        return item;
    }

    async addFromDictionary(entry: DictionaryEntry, language: 'ja' | 'zh' | 'ko' | 'en', sourceSentence?: string): Promise<VocabularyItem> {
        return this.addWord(
            entry.word,
            entry.meanings[0]?.definition || '',
            language,
            entry.reading,
            entry.pinyin,
            entry.romanization,
            sourceSentence
        );
    }

    async updateLevel(id: string, level: WordLevel): Promise<void> {
        const items = this.vocabulary();
        const index = items.findIndex(i => i.id === id);
        if (index === -1) return;

        const updated = { ...items[index], level, updatedAt: new Date() };
        const newItems = [...items];
        newItems[index] = updated;

        this.updateLocal(newItems);
        this.triggerSyncDebounced();
    }

    async updateMeaning(id: string, meaning: string): Promise<void> {
        const items = this.vocabulary();
        const index = items.findIndex(i => i.id === id);
        if (index === -1) return;

        const updated = { ...items[index], meaning, updatedAt: new Date() };
        const newItems = [...items];
        newItems[index] = updated;

        this.updateLocal(newItems);
        this.triggerSyncDebounced();
    }

    async addExample(id: string, example: string): Promise<void> {
        const items = this.vocabulary();
        const index = items.findIndex(i => i.id === id);
        if (index === -1) return;

        const item = items[index];
        const updated = { ...item, examples: [...item.examples, example], updatedAt: new Date() };
        const newItems = [...items];
        newItems[index] = updated;

        this.updateLocal(newItems);
        this.triggerSyncDebounced();
    }

    async markReviewed(id: string, quality: number): Promise<void> {
        const items = this.vocabulary();
        const index = items.findIndex(i => i.id === id);
        if (index === -1) return;

        const item = items[index];

        // SM-2 Algorithm
        let { easeFactor, interval, repetitions } = item;
        let newLevel: WordLevel = item.level;

        if (quality < 3) {
            repetitions = 0;
            interval = 0;
            newLevel = item.level === 'known' ? 'learning' : 'new';
        } else {
            repetitions++;
            if (repetitions === 1) interval = 1;
            else if (repetitions === 2) interval = 6;
            else interval = Math.round(interval * easeFactor);

            easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

            if (item.level === 'new') newLevel = 'learning';
            else if (item.level === 'learning' && repetitions >= 3) newLevel = 'known';
        }

        const nextReviewDate = new Date();
        nextReviewDate.setDate(nextReviewDate.getDate() + interval);

        const updated: VocabularyItem = {
            ...item,
            level: newLevel,
            lastReviewedAt: new Date(),
            updatedAt: new Date(),
            reviewCount: item.reviewCount + 1,
            easeFactor,
            interval,
            repetitions,
            nextReviewDate
        };

        const newItems = [...items];
        newItems[index] = updated;

        this.updateLocal(newItems);
        this.triggerSyncDebounced();
    }

    async deleteWord(id: string): Promise<void> {
        const items = this.vocabulary();
        const item = items.find(i => i.id === id);
        if (!item) return;

        const newItems = items.filter(i => i.id !== id);
        this.updateLocal(newItems);

        if (this.auth.isLoggedIn()) {
            this.deleteFromServer(item.word, item.language).catch(err => console.error('[VocabRepo] Failed to delete on server:', err));
        }
    }

    async clear(): Promise<void> {
        this.updateLocal([]);
        // TODO: Bulk delete on server?
    }

    async importFromJSON(json: string): Promise<void> {
        try {
            const items = JSON.parse(json) as VocabularyItem[];
            const existing = new Set(this.vocabulary().map(i => i.word));
            const newItems = items
                .filter(i => !existing.has(i.word))
                .map(item => this.normalizeVocabularyItem(item));

            if (newItems.length > 0) {
                this.updateLocal([...this.vocabulary(), ...newItems]);
                this.triggerSyncDebounced();
            }
        } catch (err) {
            console.error('Failed to import vocabulary:', err);
            throw new Error('Invalid JSON format');
        }
    }

    exportToJSON(): string {
        return JSON.stringify(this.vocabulary(), null, 2);
    }

    // ==================== Synchronization Logic ====================

    async syncWithRemote(): Promise<void> {
        if (!this.auth.isLoggedIn() || this.isSyncing()) return;

        this.isSyncing.set(true);
        console.log('[VocabRepo] Starting sync...');

        try {
            // 1. Fetch Remote
            const remoteItems = await this.fetchFromPocketBase();
            console.log(`[VocabRepo] Fetched ${remoteItems.length} items from server`);

            // 2. Local State
            const localItems = this.vocabulary();
            const localSyncItems = this.convertToSyncItems(localItems);

            // 3. Merge (Safe strategy)
            const mergedSyncItems = mergeByTimestamp(
                localSyncItems,
                remoteItems,
                item => item.id,
                item => item.updated ? new Date(item.updated).getTime() : 0
            );

            // 4. Update Local
            this.importSyncItemsToLocal(mergedSyncItems);

            // 5. Push Merged State to Server (to ensure server catches up with local changes)
            // Only if hash changed or if we want to ensure consistency
            await this.pushToPocketBase(mergedSyncItems);

            this.lastPushedHash = calculateHash(this.vocabulary(), i => `${i.word}:${i.language}:${i.level}:${i.updatedAt || i.addedAt}`);
            console.log('[VocabRepo] Sync complete.');
        } catch (error) {
            console.error('[VocabRepo] Sync failed:', error);
        } finally {
            this.isSyncing.set(false);
        }
    }

    // ==================== Private Actions ====================

    private setupAutoSync(): void {
        // Sync on login
        this.auth.loginEvent.subscribe(() => this.syncWithRemote());

        // Debounced save to storage
        effect(() => {
            const items = this.vocabulary();
            if (this.saveTimeout) clearTimeout(this.saveTimeout);
            this.saveTimeout = setTimeout(() => {
                untracked(() => this.saveToStorage(items));
            }, SAVE_DEBOUNCE_MS);
        });
    }

    private updateLocal(items: VocabularyItem[]): void {
        const normalizedItems = items.map(item => this.normalizeVocabularyItem(item));
        this.vocabulary.set(normalizedItems);
        this.recalculateStats(normalizedItems);
    }

    private triggerSyncDebounced() {
        // Simple debounce for sync trigger
        // In a real app, might want a separate robust queue
        if (this.auth.isLoggedIn()) {
            // We don't want to spam syncWithRemote on every keystroke
            // We'll let the background sync or 'pushSingleItem' handle critical stuff
            // But for bulk updates, we can verify sync status eventually
        }
    }

    private recalculateStats(items: VocabularyItem[]): void {
        const stats = items.reduce(
            (acc, item) => {
                acc.total++;
                if (item.level === 'new') acc.new++;
                else if (item.level === 'learning') acc.learning++;
                else if (item.level === 'known') acc.known++;
                else if (item.level === 'ignored') acc.ignored++;

                if (item.language === 'ja') acc.japanese++;
                else if (item.language === 'zh') acc.chinese++;
                else if (item.language === 'ko') acc.korean++;
                return acc;
            },
            { ...this.initialStats }
        );
        this.stats.set(stats);
    }

    // ==================== Persistence ====================

    private loadFromStorage(): void {
        const items = this.storage.get<VocabularyItem[]>(STORAGE_KEY);
        if (items) {
            const parsed = items.map(item => this.normalizeVocabularyItem({
                ...item,
                addedAt: new Date(item.addedAt),
                updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
                lastReviewedAt: item.lastReviewedAt ? new Date(item.lastReviewedAt) : undefined
            }));
            this.updateLocal(parsed);
        }
    }

    private saveToStorage(items: VocabularyItem[]): void {
        if (!this.storage.set(STORAGE_KEY, items)) {
            // Quota handling
            const filtered = items.filter(item => item.level !== 'ignored');
            if (filtered.length < items.length) {
                this.storage.set(STORAGE_KEY, filtered);
                this.updateLocal(filtered);
            }
        }
    }

    // ==================== PocketBase Helpers ====================

    private convertToSyncItems(items: VocabularyItem[]): SyncItem[] {
        return items.map(item => ({
            id: item.id,
            word: item.word,
            reading: item.reading,
            pinyin: item.pinyin,
            romanization: this.normalizeRomanization(item.language, item.reading, item.romanization, item.word),
            meaning: item.meaning,
            language: item.language,
            level: item.level,
            examples: item.examples || [],
            updated: item.updatedAt ? new Date(item.updatedAt).toISOString() : undefined,
            created: item.addedAt ? new Date(item.addedAt).toISOString() : undefined
        }));
    }

    private importSyncItemsToLocal(syncItems: SyncItem[]): void {
        const vocabItems: VocabularyItem[] = syncItems.map(item => {
            // Preserve local SRS state if possible could be complex, 
            // but for now we assume SyncItem is truth. 
            // However, SyncItem doesn't carry SRS data (easeFactor etc) in the interface defined in SyncService?
            // Wait, the SyncService definition of SyncItem LOST the SRS data!
            // I need to make sure SyncItem carries SRS data or I recover it from local.

            const existing = this.vocabulary().find(v => v.id === item.id);

            return this.normalizeVocabularyItem({
                id: item.id,
                word: item.word,
                reading: item.reading,
                pinyin: item.pinyin,
                romanization: item.romanization,
                meaning: item.meaning,
                language: item.language as any,
                level: item.level as any,
                examples: item.examples,
                addedAt: item.created ? new Date(item.created) : new Date(),
                updatedAt: item.updated ? new Date(item.updated) : new Date(),
                // Recover SRS or default
                reviewCount: existing?.reviewCount || 0,
                easeFactor: existing?.easeFactor || 2.5,
                interval: existing?.interval || 0,
                repetitions: existing?.repetitions || 0,
                lastReviewedAt: existing?.lastReviewedAt,
                nextReviewDate: existing?.nextReviewDate,
                sourceSentence: existing?.sourceSentence
            });
        });

        this.updateLocal(vocabItems);
    }

    private async fetchFromPocketBase(): Promise<SyncItem[]> {
        const client = await this.pb.getClient();
        const userId = client.authStore.model?.id;
        if (!userId) return [];

        const records = await client.collection('vocabulary').getFullList({
            filter: `user = "${userId}"`,
            sort: '-updated'
        });

        return records.map(record => ({
            id: record.id,
            word: record['word'],
            reading: record['reading'],
            pinyin: record['pinyin'],
            romanization: record['romanization'],
            meaning: record['meaning'],
            language: record['language'],
            level: record['level'],
            examples: record['examples'],
            created: record['created'],
            updated: record['updated']
        }));
    }

    private async pushToPocketBase(items: SyncItem[]): Promise<void> {
        const client = await this.pb.getClient();
        const userId = client.authStore.model?.id;
        if (!userId) return;

        // Note: In a real efficient sync, we'd diff 'items' vs 'remote' again or track clean/dirty.
        // For safe-unification, we'll use batch processing.

        await processBatch(items, async (item) => {
            await withRetry(() => this.syncItem(client, userId, item));
        });
    }

    private async pushSingleItem(item: VocabularyItem): Promise<void> {
        const client = await this.pb.getClient();
        const userId = client.authStore.model?.id;
        if (!userId) return;

        const syncItem = this.convertToSyncItems([item])[0];
        await withRetry(() => this.syncItem(client, userId, syncItem));
    }

    private async syncItem(client: any, userId: string, item: SyncItem): Promise<void> {
        const data = {
            word: item.word,
            reading: item.reading || '',
            pinyin: item.pinyin || '',
            romanization: this.normalizeRomanization(item.language as 'ja' | 'zh' | 'ko' | 'en', item.reading, item.romanization, item.word) || '',
            meaning: item.meaning,
            language: item.language,
            level: item.level,
            examples: item.examples,
            user: userId
        };

        try {
            // Try to create with deterministic ID
            await client.collection('vocabulary').create({ ...data, id: item.id });
        } catch (err: any) {
            // If exists, update
            // 400 or 404 details? Pocketbase throws 400 for duplicate ID
            if (err.status === 400 || err.status === 404) { // Actually usually 400 for unique constraint
                await client.collection('vocabulary').update(item.id, data);
            } else {
                // Try legacy update by query? 
                // We shouldn't need legacy query if we standardized IDs.
                // But for migration:
                throw err;
            }
        }
    }

    private async deleteFromServer(word: string, language: string): Promise<void> {
        const client = await this.pb.getClient();
        const userId = client.authStore.model?.id;
        if (!userId) return;

        const records = await client.collection('vocabulary').getFullList({
            filter: `user = "${userId}" && word = "${word}" && language = "${language}"`
        });

        for (const record of records) {
            await client.collection('vocabulary').delete(record.id);
        }
    }

    private generateVocabId(userId: string, word: string, language: string): string {
        const raw = `${userId}|${word}|${language}`;
        try {
            return btoa(unescape(encodeURIComponent(raw)))
                .replace(/[^a-zA-Z0-9]/g, '')
                .toLowerCase()
                .slice(0, 15);
        } catch {
            return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
        }
    }

    private normalizeVocabularyItem(item: VocabularyItem): VocabularyItem {
        return {
            ...item,
            romanization: this.normalizeRomanization(item.language, item.reading, item.romanization, item.word)
        };
    }

    private normalizeRomanization(
        language: 'ja' | 'zh' | 'ko' | 'en',
        reading?: string,
        romanization?: string,
        word?: string
    ): string | undefined {
        if (language !== 'ja') {
            return romanization;
        }

        return romanization || getJapaneseRomaji(reading, word);
    }
}
