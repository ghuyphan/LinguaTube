import { Injectable, inject } from '@angular/core';
import { SubtitleCue } from '../models';

/**
 * Persistent transcript cache using IndexedDB
 * 
 * TTL Policy:
 * - Native transcripts: 24 hours (may update occasionally)
 * - AI transcripts: 7 days (immutable once created)
 */

const DB_NAME = 'lingua-tube-cache';
const DB_VERSION = 1;
const STORE_NAME = 'transcripts';

// Cache TTL in milliseconds
const TTL = {
    native: 24 * 60 * 60 * 1000,  // 24 hours
    ai: 7 * 24 * 60 * 60 * 1000   // 7 days
};

export interface CachedTranscript {
    key: string;             // videoId:lang
    cues: SubtitleCue[];
    source: 'native' | 'ai';
    language: string;
    cachedAt: number;
    expiresAt: number;
}

@Injectable({
    providedIn: 'root'
})
export class TranscriptCacheService {
    private db: IDBDatabase | null = null;
    private dbPromise: Promise<IDBDatabase> | null = null;

    constructor() {
        // Initialize on first use
    }

    /**
     * Open/create the IndexedDB database
     */
    private openDb(): Promise<IDBDatabase> {
        if (this.db) return Promise.resolve(this.db);
        if (this.dbPromise) return this.dbPromise;

        this.dbPromise = new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                console.error('[TranscriptCache] Failed to open IndexedDB:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // Create transcripts store with key path
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
                    store.createIndex('expiresAt', 'expiresAt', { unique: false });
                }
            };
        });

        return this.dbPromise;
    }

    /**
     * Get cached transcript by videoId and language
     * Returns null if not found or expired
     */
    async get(videoId: string, lang: string): Promise<CachedTranscript | null> {
        try {
            const db = await this.openDb();
            const key = `${videoId}:${lang}`;

            return new Promise((resolve) => {
                const tx = db.transaction(STORE_NAME, 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const request = store.get(key);

                request.onsuccess = () => {
                    const result = request.result as CachedTranscript | undefined;

                    if (!result) {
                        resolve(null);
                        return;
                    }

                    // Check if expired
                    if (Date.now() > result.expiresAt) {
                        // Delete expired entry (fire-and-forget)
                        this.delete(videoId, lang);
                        resolve(null);
                        return;
                    }

                    resolve(result);
                };

                request.onerror = () => {
                    console.error('[TranscriptCache] Get error:', request.error);
                    resolve(null);
                };
            });
        } catch (e) {
            console.error('[TranscriptCache] Get failed:', e);
            return null;
        }
    }

    /**
     * Save transcript to cache
     */
    async set(
        videoId: string,
        lang: string,
        cues: SubtitleCue[],
        source: 'native' | 'ai'
    ): Promise<void> {
        try {
            const db = await this.openDb();
            const key = `${videoId}:${lang}`;
            const now = Date.now();
            const ttl = source === 'ai' ? TTL.ai : TTL.native;

            const entry: CachedTranscript = {
                key,
                cues,
                source,
                language: lang,
                cachedAt: now,
                expiresAt: now + ttl
            };

            return new Promise((resolve, reject) => {
                const tx = db.transaction(STORE_NAME, 'readwrite');
                const store = tx.objectStore(STORE_NAME);
                const request = store.put(entry);

                request.onsuccess = () => resolve();
                request.onerror = () => {
                    console.error('[TranscriptCache] Set error:', request.error);
                    reject(request.error);
                };
            });
        } catch (e) {
            console.error('[TranscriptCache] Set failed:', e);
        }
    }

    /**
     * Delete a cached transcript
     */
    async delete(videoId: string, lang: string): Promise<void> {
        try {
            const db = await this.openDb();
            const key = `${videoId}:${lang}`;

            return new Promise((resolve) => {
                const tx = db.transaction(STORE_NAME, 'readwrite');
                const store = tx.objectStore(STORE_NAME);
                store.delete(key);
                resolve();
            });
        } catch (e) {
            console.error('[TranscriptCache] Delete failed:', e);
        }
    }

    /**
     * Clear all cached transcripts for a specific video
     */
    async clearVideo(videoId: string): Promise<void> {
        try {
            const db = await this.openDb();

            return new Promise((resolve) => {
                const tx = db.transaction(STORE_NAME, 'readwrite');
                const store = tx.objectStore(STORE_NAME);
                const request = store.openCursor();

                request.onsuccess = () => {
                    const cursor = request.result;
                    if (cursor) {
                        if (cursor.key.toString().startsWith(videoId)) {
                            cursor.delete();
                        }
                        cursor.continue();
                    } else {
                        resolve();
                    }
                };

                request.onerror = () => resolve();
            });
        } catch (e) {
            console.error('[TranscriptCache] Clear video failed:', e);
        }
    }

    /**
     * Clear all expired entries (maintenance)
     */
    async pruneExpired(): Promise<number> {
        try {
            const db = await this.openDb();
            const now = Date.now();
            let count = 0;

            return new Promise((resolve) => {
                const tx = db.transaction(STORE_NAME, 'readwrite');
                const store = tx.objectStore(STORE_NAME);
                const index = store.index('expiresAt');
                const range = IDBKeyRange.upperBound(now);
                const request = index.openCursor(range);

                request.onsuccess = () => {
                    const cursor = request.result;
                    if (cursor) {
                        cursor.delete();
                        count++;
                        cursor.continue();
                    } else {
                        resolve(count);
                    }
                };

                request.onerror = () => resolve(count);
            });
        } catch (e) {
            console.error('[TranscriptCache] Prune failed:', e);
            return 0;
        }
    }

    /**
     * Get cache stats (for debugging)
     */
    async getStats(): Promise<{ count: number; size: number }> {
        try {
            const db = await this.openDb();

            return new Promise((resolve) => {
                const tx = db.transaction(STORE_NAME, 'readonly');
                const store = tx.objectStore(STORE_NAME);
                const countRequest = store.count();

                countRequest.onsuccess = () => {
                    resolve({ count: countRequest.result, size: 0 }); // Size estimation not trivial in IDB
                };

                countRequest.onerror = () => resolve({ count: 0, size: 0 });
            });
        } catch (e) {
            return { count: 0, size: 0 };
        }
    }
}
