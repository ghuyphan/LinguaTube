import { Injectable, inject, signal, effect, untracked, computed } from '@angular/core';
import type PocketBase from 'pocketbase';
import { IVocabularyRepository } from './vocabulary.repository';
import { VocabularyItem, WordLevel, DictionaryEntry } from '../../models';
import { AuthService, StorageService, PocketBaseService } from '../services';
import { calculateHash, mergeByTimestamp, processBatch, withRetry } from '../../shared/utils/sync.utils';
import { getJapaneseRomaji } from '../../shared/utils/japanese-romaji';
import { generateRandomId } from '../utils';

const STORAGE_KEY = 'linguatube_vocabulary';
const TOMBSTONES_KEY = 'linguatube_deleted_vocab_tombstones';
const SAVE_DEBOUNCE_MS = 300;

interface DeletionTombstone {
    id: string;
    word: string;
    language: string;
    deletedAt: number;
}

interface SyncItem {
    id: string; // Deterministic ID
    word: string;
    reading?: string;
    pinyin?: string;
    romanization?: string;
    meaning: string;
    language: 'ja' | 'zh' | 'ko' | 'en';
    level: WordLevel;
    examples: string[];
    created?: string;
    updated?: string;
    // SRS spaced repetition fields
    easeFactor?: number;
    interval?: number;
    repetitions?: number;
    reviewCount?: number;
    lastReviewedAt?: string;
    nextReviewDate?: string;
    sourceSentence?: string;
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
    
    // Pure computed stats based on reactive vocabulary signal
    readonly stats = computed(() => {
        const items = this.vocabulary();
        return items.reduce(
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
    });

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
        const meaningText = entry.meanings.map(m => m.definition).filter(Boolean).slice(0, 3).join('; ')
            || entry.meanings[0]?.definition || '';
        return this.addWord(
            entry.word,
            meaningText,
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

        // Record deletion tombstone to prevent zombie resurrection on sync
        this.addDeletionTombstone(item.id, item.word, item.language);

        const newItems = items.filter(i => i.id !== id);
        this.updateLocal(newItems);

        if (this.auth.isLoggedIn()) {
            this.deleteFromServer(item.word, item.language)
                .then(() => this.removeDeletionTombstone(item.id))
                .catch(err => console.error('[VocabRepo] Failed to delete on server:', err));
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

            // 2. Handle deletion tombstones (prevent zombie resurrection)
            const tombstones = this.getDeletionTombstones();
            if (tombstones.length > 0) {
                for (const t of tombstones) {
                    try {
                        await this.deleteFromServer(t.word, t.language);
                        this.removeDeletionTombstone(t.id);
                    } catch (err) {
                        console.warn('[VocabRepo] Retry tombstone delete failed:', err);
                    }
                }
            }
            const activeRemote = remoteItems.filter(r => !tombstones.some(t => t.id === r.id));

            // 3. Local State
            const localItems = this.vocabulary();
            const localSyncItems = this.convertToSyncItems(localItems);

            // 4. Merge (Safe strategy)
            const mergedSyncItems = mergeByTimestamp(
                localSyncItems,
                activeRemote,
                item => item.id,
                item => item.updated ? new Date(item.updated).getTime() : 0
            );

            // 5. Update Local
            this.importSyncItemsToLocal(mergedSyncItems);

            // 6. Push ONLY modified/new items to Server (prevents O(N) request storms)
            const remoteMap = new Map(remoteItems.map(r => [r.id, r]));
            const dirtyItems = mergedSyncItems.filter(localItem => {
                const remote = remoteMap.get(localItem.id);
                if (!remote) return true; // New local item
                if (!localItem.updated || !remote.updated) return true;
                return new Date(localItem.updated).getTime() > new Date(remote.updated).getTime();
            });

            if (dirtyItems.length > 0) {
                console.log(`[VocabRepo] Pushing ${dirtyItems.length} modified items to server`);
                await this.pushToPocketBase(dirtyItems);
            }

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
        const seen = new Set<string>();
        const uniqueItems: VocabularyItem[] = [];
        for (const item of items) {
            const key = `${item.language}:${item.word.trim().toLowerCase()}`;
            if (!seen.has(key)) {
                seen.add(key);
                uniqueItems.push(item);
            }
        }
        const normalizedItems = uniqueItems.map(item => this.normalizeVocabularyItem(item));
        this.vocabulary.set(normalizedItems);
    }

    private triggerSyncDebounced() {
        if (this.auth.isLoggedIn()) {
            // Auto sync can trigger if needed
        }
    }

    // ==================== Deletion Tombstones ====================

    private getDeletionTombstones(): DeletionTombstone[] {
        return this.storage.get<DeletionTombstone[]>(TOMBSTONES_KEY) || [];
    }

    private addDeletionTombstone(id: string, word: string, language: string): void {
        const tombstones = this.getDeletionTombstones();
        if (!tombstones.some(t => t.id === id)) {
            tombstones.push({ id, word, language, deletedAt: Date.now() });
            this.storage.set(TOMBSTONES_KEY, tombstones);
        }
    }

    private removeDeletionTombstone(id: string): void {
        const tombstones = this.getDeletionTombstones().filter(t => t.id !== id);
        this.storage.set(TOMBSTONES_KEY, tombstones);
    }

    // ==================== Persistence ====================

    private loadFromStorage(): void {
        const items = this.storage.get<VocabularyItem[]>(STORAGE_KEY);
        if (items) {
            const parsed = items.map(item => this.normalizeVocabularyItem({
                ...item,
                addedAt: new Date(item.addedAt),
                updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
                lastReviewedAt: item.lastReviewedAt ? new Date(item.lastReviewedAt) : undefined,
                nextReviewDate: item.nextReviewDate ? new Date(item.nextReviewDate) : undefined
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
            created: item.addedAt ? new Date(item.addedAt).toISOString() : undefined,
            easeFactor: item.easeFactor,
            interval: item.interval,
            repetitions: item.repetitions,
            reviewCount: item.reviewCount,
            lastReviewedAt: item.lastReviewedAt ? new Date(item.lastReviewedAt).toISOString() : undefined,
            nextReviewDate: item.nextReviewDate ? new Date(item.nextReviewDate).toISOString() : undefined,
            sourceSentence: item.sourceSentence
        }));
    }

    private importSyncItemsToLocal(syncItems: SyncItem[]): void {
        const vocabItems: VocabularyItem[] = syncItems.map(item => {
            const existing = this.vocabulary().find(v => v.id === item.id);

            return this.normalizeVocabularyItem({
                id: item.id,
                word: item.word,
                reading: item.reading,
                pinyin: item.pinyin,
                romanization: item.romanization,
                meaning: item.meaning,
                language: item.language,
                level: item.level,
                examples: item.examples,
                addedAt: item.created ? new Date(item.created) : new Date(),
                updatedAt: item.updated ? new Date(item.updated) : new Date(),
                // Fully recover SRS progress: remote first, then local fallback, then standard defaults
                reviewCount: item.reviewCount ?? existing?.reviewCount ?? 0,
                easeFactor: item.easeFactor ?? existing?.easeFactor ?? 2.5,
                interval: item.interval ?? existing?.interval ?? 0,
                repetitions: item.repetitions ?? existing?.repetitions ?? 0,
                lastReviewedAt: item.lastReviewedAt ? new Date(item.lastReviewedAt) : existing?.lastReviewedAt,
                nextReviewDate: item.nextReviewDate ? new Date(item.nextReviewDate) : existing?.nextReviewDate,
                sourceSentence: item.sourceSentence ?? existing?.sourceSentence
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
            language: record['language'] as 'ja' | 'zh' | 'ko' | 'en',
            level: record['level'] as WordLevel,
            examples: record['examples'],
            created: record['created'],
            updated: record['updated'],
            easeFactor: record['ease_factor'] ?? record['easeFactor'],
            interval: record['interval'],
            repetitions: record['repetitions'],
            reviewCount: record['review_count'] ?? record['reviewCount'],
            lastReviewedAt: record['last_reviewed_at'] ?? record['lastReviewedAt'],
            nextReviewDate: record['next_review_date'] ?? record['nextReviewDate'],
            sourceSentence: record['source_sentence'] ?? record['sourceSentence']
        }));
    }

    private async pushToPocketBase(items: SyncItem[]): Promise<void> {
        const client = await this.pb.getClient();
        const userId = client.authStore.model?.id;
        if (!userId) return;

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

    private async syncItem(client: PocketBase, userId: string, item: SyncItem): Promise<void> {
        const data: Record<string, unknown> = {
            word: item.word,
            reading: item.reading || '',
            pinyin: item.pinyin || '',
            romanization: this.normalizeRomanization(item.language, item.reading, item.romanization, item.word) || '',
            meaning: item.meaning,
            language: item.language,
            level: item.level,
            examples: item.examples,
            user: userId,
            ease_factor: item.easeFactor ?? 2.5,
            interval: item.interval ?? 0,
            repetitions: item.repetitions ?? 0,
            review_count: item.reviewCount ?? 0,
            last_reviewed_at: item.lastReviewedAt || null,
            next_review_date: item.nextReviewDate || null,
            source_sentence: item.sourceSentence || ''
        };

        try {
            await client.collection('vocabulary').create({ ...data, id: item.id });
        } catch (err: unknown) {
            const status = (err && typeof err === 'object' && 'status' in err) ? (err as { status: number }).status : undefined;
            if (status === 400 || status === 404) {
                await client.collection('vocabulary').update(item.id, data);
            } else {
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
        const raw = `${userId}|${word.trim().toLowerCase()}|${language}`;
        try {
            // PocketBase IDs require strictly 15 alphanumeric characters
            let hash = btoa(encodeURIComponent(raw)).replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            while (hash.length < 15) {
                hash += hash + '0';
            }
            return hash.slice(0, 15);
        } catch {
            return generateRandomId();
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
