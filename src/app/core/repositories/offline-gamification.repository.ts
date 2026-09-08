import { Injectable, inject, signal } from '@angular/core';
import { IGamificationRepository } from './gamification.repository';
import { UserGamificationState, PocketBaseGamificationRecord } from '../../models/gamification.model';
import { AuthService, StorageService, PocketBaseService } from '../services';

const STORAGE_KEY = 'linguatube_gamification';
const SYNC_DEBOUNCE_MS = 3000;

function generateGamificationId(userId: string): string {
    try {
        const clean = userId.trim();
        const encoded = btoa(`${clean}:gamification`).replace(/[^a-zA-Z0-9]/g, '');
        return (encoded.slice(0, 15) || clean.slice(0, 15)).padEnd(15, '0');
    } catch {
        return userId.slice(0, 15).padEnd(15, '0');
    }
}

@Injectable({
    providedIn: 'root'
})
export class OfflineGamificationRepository implements IGamificationRepository {
    private auth = inject(AuthService);
    private storage = inject(StorageService);
    private pb = inject(PocketBaseService);

    readonly state = signal<UserGamificationState>({
        xp: 0,
        level: 1,
        unlockedAchievements: {},
        notifiedAchievements: [],
        totalVideosWatched: 0,
        totalQuizzesCompleted: 0
    });

    readonly isLoading = signal<boolean>(false);

    private syncDebounceTimer: ReturnType<typeof setTimeout> | null = null;
    private hasPendingRemotePush = false;

    constructor() {
        this.loadFromStorage();
        this.setupAutoSync();
    }

    getState(): UserGamificationState {
        return this.state();
    }

    addXP(amount: number): void {
        if (amount <= 0) return;

        this.state.update(prev => {
            const newXP = prev.xp + amount;
            const newLevel = Math.max(1, Math.floor(Math.sqrt(newXP / 100)) + 1);
            const updated: UserGamificationState = {
                ...prev,
                xp: newXP,
                level: newLevel,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });

        this.scheduleRemotePush();
    }

    recordVideoCompleted(): void {
        this.state.update(prev => {
            const updated: UserGamificationState = {
                ...prev,
                totalVideosWatched: prev.totalVideosWatched + 1,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });
        this.addXP(25);
    }

    recordQuizCompleted(): void {
        this.state.update(prev => {
            const updated: UserGamificationState = {
                ...prev,
                totalQuizzesCompleted: prev.totalQuizzesCompleted + 1,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });
        this.addXP(15);
    }

    unlockAchievements(newUnlocked: Record<string, string>, xpGained: number): void {
        if (Object.keys(newUnlocked).length === 0 && xpGained <= 0) return;

        this.state.update(prev => {
            const newXP = prev.xp + xpGained;
            const newLevel = Math.max(1, Math.floor(Math.sqrt(newXP / 100)) + 1);
            const updated: UserGamificationState = {
                ...prev,
                xp: newXP,
                level: newLevel,
                unlockedAchievements: { ...prev.unlockedAchievements, ...newUnlocked },
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });

        this.scheduleRemotePush();
    }

    markNotified(achievementIds: string[]): void {
        if (!achievementIds || achievementIds.length === 0) return;

        this.state.update(prev => {
            const currentNotified = new Set(prev.notifiedAchievements);
            let changed = false;
            for (const id of achievementIds) {
                if (!currentNotified.has(id)) {
                    currentNotified.add(id);
                    changed = true;
                }
            }
            if (!changed) return prev;

            const updated: UserGamificationState = {
                ...prev,
                notifiedAchievements: Array.from(currentNotified),
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });
    }

    async syncWithRemote(): Promise<void> {
        if (!this.auth.isLoggedIn()) return;
        const user = this.auth.user();
        if (!user) return;

        this.isLoading.set(true);

        try {
            const client = await this.pb.getClient();
            const deterministicId = generateGamificationId(user.id);
            let remoteRecord: PocketBaseGamificationRecord | null = null;

            try {
                remoteRecord = await client.collection('gamification').getOne<PocketBaseGamificationRecord>(deterministicId);
            } catch (err: unknown) {
                if ((err as { status?: number })?.status === 404) {
                    // Try fallback query by user relation
                    try {
                        const list = await client.collection('gamification').getList<PocketBaseGamificationRecord>(1, 1, {
                            filter: `user = "${user.id}"`
                        });
                        if (list.items.length > 0) {
                            remoteRecord = list.items[0];
                        }
                    } catch {
                        // PocketBase collection might not be created yet; continue in local mode
                    }
                }
            }

            const local = this.state();

            if (remoteRecord) {
                // Merge strategy: Monotonic XP, earlier badge timestamps, union of notified badges
                const mergedXP = Math.max(local.xp, remoteRecord.xp || 0);
                const mergedLevel = Math.max(1, Math.floor(Math.sqrt(mergedXP / 100)) + 1);
                const mergedVideos = Math.max(local.totalVideosWatched, remoteRecord.total_videos_watched || 0);
                const mergedQuizzes = Math.max(local.totalQuizzesCompleted, remoteRecord.total_quizzes_completed || 0);

                const mergedUnlocked: Record<string, string> = { ...(remoteRecord.unlocked_achievements || {}) };
                for (const [badgeId, unlockDate] of Object.entries(local.unlockedAchievements)) {
                    if (!mergedUnlocked[badgeId]) {
                        mergedUnlocked[badgeId] = unlockDate;
                    } else {
                        const tLocal = new Date(unlockDate).getTime();
                        const tRemote = new Date(mergedUnlocked[badgeId]).getTime();
                        if (!isNaN(tLocal) && !isNaN(tRemote) && tLocal < tRemote) {
                            mergedUnlocked[badgeId] = unlockDate;
                        }
                    }
                }

                const mergedNotified = Array.from(new Set([
                    ...(remoteRecord.notified_achievements || []),
                    ...(local.notifiedAchievements || [])
                ]));

                const mergedState: UserGamificationState = {
                    xp: mergedXP,
                    level: mergedLevel,
                    totalVideosWatched: mergedVideos,
                    totalQuizzesCompleted: mergedQuizzes,
                    unlockedAchievements: mergedUnlocked,
                    notifiedAchievements: mergedNotified,
                    updatedAt: new Date().toISOString()
                };

                this.state.set(mergedState);
                this.saveToStorage(mergedState);

                // If local had higher/newer stats, push merged state back to PocketBase
                if (mergedXP > (remoteRecord.xp || 0) ||
                    Object.keys(mergedUnlocked).length > Object.keys(remoteRecord.unlocked_achievements || {}).length ||
                    mergedVideos > (remoteRecord.total_videos_watched || 0) ||
                    mergedQuizzes > (remoteRecord.total_quizzes_completed || 0)) {
                    await client.collection('gamification').update(remoteRecord.id, {
                        xp: mergedXP,
                        level: mergedLevel,
                        total_videos_watched: mergedVideos,
                        total_quizzes_completed: mergedQuizzes,
                        unlocked_achievements: mergedUnlocked,
                        notified_achievements: mergedNotified
                    }).catch(() => {});
                }
            } else {
                // Record doesn't exist yet on remote, try creating it with deterministic ID
                try {
                    await client.collection('gamification').create({
                        id: deterministicId,
                        user: user.id,
                        xp: local.xp,
                        level: local.level,
                        total_videos_watched: local.totalVideosWatched,
                        total_quizzes_completed: local.totalQuizzesCompleted,
                        unlocked_achievements: local.unlockedAchievements,
                        notified_achievements: local.notifiedAchievements
                    });
                } catch {
                    // PocketBase collection might not be created yet by admin; local state remains intact
                }
            }
        } catch (err) {
            console.warn('[GamificationRepo] Remote sync skipped (offline or collection pending):', err);
        } finally {
            this.isLoading.set(false);
            this.hasPendingRemotePush = false;
        }
    }

    // ==================== Private Helpers ====================

    private setupAutoSync(): void {
        this.auth.loginEvent.subscribe(() => {
            void this.syncWithRemote();
        });

        this.auth.logoutEvent.subscribe(() => {
            // Flush any pending remote sync before clearing memory
            if (this.hasPendingRemotePush && this.syncDebounceTimer) {
                clearTimeout(this.syncDebounceTimer);
                this.syncDebounceTimer = null;
                void this.syncWithRemote();
            }

            // Safe reset: Clean memory to avoid cross-user leak, but keep guest continuity if needed
            this.state.set({
                xp: 0,
                level: 1,
                unlockedAchievements: {},
                notifiedAchievements: [],
                totalVideosWatched: 0,
                totalQuizzesCompleted: 0
            });
            this.storage.remove(STORAGE_KEY);
        });
    }

    private scheduleRemotePush(): void {
        if (!this.auth.isLoggedIn()) return;
        this.hasPendingRemotePush = true;

        if (this.syncDebounceTimer) {
            clearTimeout(this.syncDebounceTimer);
        }

        this.syncDebounceTimer = setTimeout(() => {
            this.syncDebounceTimer = null;
            void this.pushLocalToRemote();
        }, SYNC_DEBOUNCE_MS);
    }

    private async pushLocalToRemote(): Promise<void> {
        if (!this.auth.isLoggedIn()) return;
        const user = this.auth.user();
        if (!user) return;

        const current = this.state();
        const deterministicId = generateGamificationId(user.id);

        try {
            const client = await this.pb.getClient();
            try {
                await client.collection('gamification').update(deterministicId, {
                    xp: current.xp,
                    level: current.level,
                    total_videos_watched: current.totalVideosWatched,
                    total_quizzes_completed: current.totalQuizzesCompleted,
                    unlocked_achievements: current.unlockedAchievements,
                    notified_achievements: current.notifiedAchievements
                });
            } catch (updateErr: unknown) {
                if ((updateErr as { status?: number })?.status === 404) {
                    await client.collection('gamification').create({
                        id: deterministicId,
                        user: user.id,
                        xp: current.xp,
                        level: current.level,
                        total_videos_watched: current.totalVideosWatched,
                        total_quizzes_completed: current.totalQuizzesCompleted,
                        unlocked_achievements: current.unlockedAchievements,
                        notified_achievements: current.notifiedAchievements
                    });
                }
            }
            this.hasPendingRemotePush = false;
        } catch {
            // Silently retain local state if PocketBase is unreachable or collection is pending
        }
    }

    private loadFromStorage(): void {
        const stored = this.storage.get<UserGamificationState>(STORAGE_KEY);
        if (stored) {
            this.state.set({
                xp: stored.xp || 0,
                level: stored.level || 1,
                unlockedAchievements: stored.unlockedAchievements || {},
                notifiedAchievements: stored.notifiedAchievements || [],
                totalVideosWatched: stored.totalVideosWatched || 0,
                totalQuizzesCompleted: stored.totalQuizzesCompleted || 0,
                updatedAt: stored.updatedAt
            });
        }
    }

    private saveToStorage(state: UserGamificationState): void {
        this.storage.set(STORAGE_KEY, state);
    }
}
