import { TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { OfflineVocabularyRepository } from './offline-vocabulary.repository';
import { AuthService, StorageService, SupabaseService } from '../services';
import { generateDeterministicRecordId } from '../../shared/utils/sync.utils';

describe('Offline vocabulary data safety', () => {
    const id = generateDeterministicRecordId('user-a', '食べる', 'ja');
    const older = new Date('2026-10-20T00:00:00Z');
    const newer = new Date('2026-10-21T00:00:00Z');
    let storage: Map<string, unknown>;
    let response: { data: unknown[] | null; error: { message: string } | null };
    let repository: OfflineVocabularyRepository;
    let owner: string | null;
    let logout: Subject<void>;
    let deferred: Promise<typeof response> | undefined;
    let pageResponses: (typeof response)[];
    let requestedPages: number;

    beforeEach(() => {
        owner = 'user-a'; logout = new Subject(); deferred = undefined; pageResponses = []; requestedPages = 0;
        storage = new Map<string, unknown>([
            ['linguatube_vocabulary', [{ id, word: '食べる', reading: 'たべる', meaning: 'eat', language: 'ja', level: 'known', interval: 30, repetitions: 5, reviewCount: 10, addedAt: older, updatedAt: older }]],
            ['linguatube_vocab_synced_ids', [id]],
        ]);
        response = { data: [], error: null };
        const query = { select: () => query, eq: () => query, order: () => query, range: () => { requestedPages++; return deferred || Promise.resolve(pageResponses.shift() || response); } };
        const auth = { isLoggedIn: () => false, getUserId: () => owner, loginEvent: new Subject(), logoutEvent: logout };
        let generation = 0;
        logout.subscribe(() => { generation++; });
        Object.assign(auth, {
            captureSession: () => ({ userId: owner, generation }),
            isCurrentSession: (snapshot: { userId: string | null; generation: number }) => snapshot.userId === owner && snapshot.generation === generation,
        });
        TestBed.configureTestingModule({ providers: [OfflineVocabularyRepository,
            { provide: AuthService, useValue: auth },
            { provide: StorageService, useValue: { get: (key: string) => storage.get(key), set: (key: string, value: unknown) => { storage.set(key, value); return true; }, remove: (key: string) => storage.delete(key) } },
            { provide: SupabaseService, useValue: { client: { from: () => query }, reconnectEvent: new Subject() } },
        ] });
        repository = TestBed.inject(OfflineVocabularyRepository);
        auth.isLoggedIn = () => owner !== null;
    });

    it('does not interpret a failed remote fetch as remote deletion of every card', fakeAsync(() => {
        response = { data: null, error: { message: 'database unavailable' } };
        void repository.syncWithRemote(); flushMicrotasks(); TestBed.flushEffects(); tick(400);
        expect(repository.getVocabulary().length).toBe(1);
        expect(storage.get('linguatube_deleted_vocab_tombstones')).toBeUndefined();
        expect(storage.get('linguatube_vocab_synced_ids')).toEqual([id]);
    }));

    it('keeps local data and deletion markers intact when a later page fails', fakeAsync(() => {
        pageResponses = [
            { data: Array.from({ length: 1000 }, (_, i) => ({ id: `remote-${i}`, word: `word-${i}`, language: 'ja' })), error: null },
            { data: null, error: { message: 'second page unavailable' } },
        ];
        void repository.syncWithRemote(); flushMicrotasks(); TestBed.flushEffects(); tick(400);
        expect(requestedPages).toBe(2);
        expect(repository.getVocabulary().map(card => card.id)).toEqual([id]);
        expect(storage.get('linguatube_deleted_vocab_tombstones')).toBeUndefined();
        expect(storage.get('linguatube_vocab_synced_ids')).toEqual([id]);
    }));

    it('preserves repetition resets from the newer review instead of taking the maximum', fakeAsync(() => {
        response = { data: [{ id, word: '食べる', reading: 'たべる', meaning: 'eat', language: 'ja', level: 'learning', interval: 1, repetitions: 0, review_count: 11, updated_at: newer.toISOString() }], error: null };
        void repository.syncWithRemote(); flushMicrotasks(); TestBed.flushEffects(); tick(400);
        expect(repository.getVocabulary()[0].repetitions).toBe(0);
        expect(repository.getVocabulary()[0].interval).toBe(1);
        expect(repository.getVocabulary()[0].level).toBe('learning');
    }));

    it('discards a remote result when the account changes during fetch', fakeAsync(() => {
        let resolve!: (value: typeof response) => void;
        deferred = new Promise(r => resolve = r);
        void repository.syncWithRemote(); flushMicrotasks();
        owner = 'user-b'; logout.next();
        resolve({ data: [{ id, word: '食べる', meaning: 'eat', language: 'ja', level: 'known' }], error: null });
        flushMicrotasks(); TestBed.flushEffects(); tick(400);
        expect(repository.getVocabulary().length).toBe(0);
    }));
});
