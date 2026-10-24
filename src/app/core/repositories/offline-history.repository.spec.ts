import { TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { OfflineHistoryRepository } from './offline-history.repository';
import { StorageService } from '../services/storage.service';
import { SupabaseService } from '../services/supabase.service';
import { AuthService } from '../services/auth.service';
import { HistoryItem } from '../../models';

describe('Offline history synchronization safety', () => {
    let storage: Map<string, unknown>;
    let owner: string | null;
    let logout: Subject<void>;
    let repository: OfflineHistoryRepository;
    let deleteError: { message: string } | null;
    let resolveFetch: ((value: { data: unknown[]; error: null }) => void) | undefined;
    let useDeferredFetch: boolean;

    beforeEach(() => {
        storage = new Map(); owner = 'user-a'; logout = new Subject(); deleteError = null; useDeferredFetch = false;
        const query = () => {
            const builder = {
                select: () => builder, delete: () => builder, eq: () => builder, order: () => builder,
                limit: () => useDeferredFetch ? new Promise(resolve => { resolveFetch = resolve; }) : Promise.resolve({ data: [], error: null }),
                then: (resolve: (value: { error: typeof deleteError }) => unknown) => Promise.resolve({ error: deleteError }).then(resolve),
            };
            return builder;
        };
        // Start signed out to avoid a constructor sync; enable identity afterward.
        const auth = { isLoggedIn: () => false, getUserId: () => owner, loginEvent: new Subject(), logoutEvent: logout };
        let generation = 0;
        logout.subscribe(() => { generation++; });
        Object.assign(auth, {
            captureSession: () => ({ userId: owner, generation }),
            isCurrentSession: (snapshot: { userId: string | null; generation: number }) => snapshot.userId === owner && snapshot.generation === generation,
        });
        TestBed.configureTestingModule({ providers: [OfflineHistoryRepository,
            { provide: StorageService, useValue: { get: (key: string) => storage.get(key), set: (key: string, value: unknown) => storage.set(key, value), remove: (key: string) => storage.delete(key) } },
            { provide: AuthService, useValue: auth },
            { provide: SupabaseService, useValue: { client: { from: query }, reconnectEvent: new Subject() } },
        ] });
        repository = TestBed.inject(OfflineHistoryRepository);
        auth.isLoggedIn = () => owner !== null;
    });

    const item = { id: 'history-1', video_id: 'abcdefghijk', title: 'Lesson', progress: 5, watched_at: new Date(), language: 'ja' } as HistoryItem;

    it('retains the deletion tombstone on a returned PostgREST error', fakeAsync(() => {
        void repository.addToHistory(item); flushMicrotasks();
        deleteError = { message: 'offline' };
        void repository.removeFromHistory(item.id); flushMicrotasks(); tick(1500);
        const tombstones = storage.get('linguatube_deleted_history_video_ids');
        expect(JSON.stringify(tombstones)).toContain(item.video_id);
    }));

    it('does not restore a pending storage write after logout', fakeAsync(() => {
        void repository.addToHistory(item); flushMicrotasks();
        owner = null; logout.next(); tick(1600);
        expect(storage.has('linguatube_history')).toBeFalse();
        expect(repository.getHistory()().length).toBe(0);
    }));

    it('does not publish a remote fetch from a previous account', fakeAsync(() => {
        useDeferredFetch = true;
        void repository.refresh(); flushMicrotasks();
        owner = 'user-b'; logout.next();
        resolveFetch?.({ data: [{ ...item, user_id: 'user-a' }], error: null });
        flushMicrotasks(); tick(1600);
        expect(repository.getHistory()().length).toBe(0);
    }));
});
