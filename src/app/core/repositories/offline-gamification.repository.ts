import { Injectable, inject, signal } from '@angular/core';
import { IGamificationRepository } from './gamification.repository';
import { UserGamificationState, PocketBaseGamificationRecord, Mission, DailyMissionsState, MissionType } from '../../models/gamification.model';
import { AuthService, StorageService, PocketBaseService } from '../services';
import { generateDeterministicRecordId, sanitizeFilterValue } from '../../shared/utils/sync.utils';

const STORAGE_KEY = 'linguatube_gamification';
const SYNC_DEBOUNCE_MS = 3000;

function generateGamificationId(userId: string): string {
    return generateDeterministicRecordId('gamification', userId);
}

export function getIsoWeekKey(d = new Date()): string {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${date.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
}

export function getTodayKey(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function createDailyMissionsForDate(dateStr: string): DailyMissionsState {
    const parts = dateStr.split('-');
    const dayNum = parseInt(parts[2] || '1', 10);

    // Slot 1: Immersion (Video watching)
    const slot1: Mission = (dayNum % 2 === 0)
        ? {
            id: 'daily_watch_1',
            type: 'watch_video',
            titleKey: 'missions.watch1.title',
            descriptionKey: 'missions.watch1.desc',
            icon: 'play-circle',
            target: 1,
            progress: 0,
            completed: false,
            claimed: false,
            xpReward: 25
        }
        : {
            id: 'daily_watch_2',
            type: 'watch_video',
            titleKey: 'missions.watch2.title',
            descriptionKey: 'missions.watch2.desc',
            icon: 'video',
            target: 2,
            progress: 0,
            completed: false,
            claimed: false,
            xpReward: 35
        };

    // Slot 2: Sentence Mining / Vocab
    let slot2: Mission;
    if (dayNum % 3 === 0) {
        slot2 = {
            id: 'daily_save_3',
            type: 'save_word',
            titleKey: 'missions.save3.title',
            descriptionKey: 'missions.save3.desc',
            icon: 'bookmark',
            target: 3,
            progress: 0,
            completed: false,
            claimed: false,
            xpReward: 20
        };
    } else if (dayNum % 3 === 1) {
        slot2 = {
            id: 'daily_save_5',
            type: 'save_word',
            titleKey: 'missions.save5.title',
            descriptionKey: 'missions.save5.desc',
            icon: 'book-open',
            target: 5,
            progress: 0,
            completed: false,
            claimed: false,
            xpReward: 30
        };
    } else {
        slot2 = {
            id: 'daily_dict_3',
            type: 'look_up_dict',
            titleKey: 'missions.dict3.title',
            descriptionKey: 'missions.dict3.desc',
            icon: 'search',
            target: 3,
            progress: 0,
            completed: false,
            claimed: false,
            xpReward: 20
        };
    }

    // Slot 3: Memory / Quiz
    const slot3: Mission = (dayNum % 2 === 0)
        ? {
            id: 'daily_srs_10',
            type: 'srs_review',
            titleKey: 'missions.srs10.title',
            descriptionKey: 'missions.srs10.desc',
            icon: 'graduation-cap',
            target: 10,
            progress: 0,
            completed: false,
            claimed: false,
            xpReward: 25
        }
        : {
            id: 'daily_quiz_1',
            type: 'complete_quiz',
            titleKey: 'missions.quiz1.title',
            descriptionKey: 'missions.quiz1.desc',
            icon: 'clipboard-check',
            target: 1,
            progress: 0,
            completed: false,
            claimed: false,
            xpReward: 25
        };

    return {
        date: dateStr,
        missions: [slot1, slot2, slot3],
        allCompletedBonusClaimed: false,
        bonusXp: 50
    };
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
        weeklyXp: 0,
        currentWeekKey: getIsoWeekKey(),
        unlockedAchievements: {},
        notifiedAchievements: [],
        totalVideosWatched: 0,
        totalQuizzesCompleted: 0,
        dailyMissions: createDailyMissionsForDate(getTodayKey())
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

    ensureFreshPeriod(): UserGamificationState {
        const prev = this.state();
        const today = getTodayKey();
        const currentWeek = getIsoWeekKey();
        let updated = false;

        let weeklyXp = prev.weeklyXp || 0;
        let currentWeekKey = prev.currentWeekKey || currentWeek;
        if (currentWeekKey !== currentWeek) {
            weeklyXp = 0;
            currentWeekKey = currentWeek;
            updated = true;
        }

        let dailyMissions = prev.dailyMissions;
        if (!dailyMissions || dailyMissions.date !== today) {
            dailyMissions = createDailyMissionsForDate(today);
            updated = true;
        }

        if (updated) {
            const nextState: UserGamificationState = {
                ...prev,
                weeklyXp,
                currentWeekKey,
                dailyMissions,
                updatedAt: new Date().toISOString()
            };
            this.state.set(nextState);
            this.saveToStorage(nextState);
            return nextState;
        }

        return prev;
    }

    addXP(amount: number): void {
        if (amount <= 0) return;

        this.ensureFreshPeriod();
        this.state.update(prev => {
            const newXP = prev.xp + amount;
            const newWeeklyXp = (prev.weeklyXp || 0) + amount;
            const newLevel = Math.max(1, Math.floor(Math.sqrt(newXP / 100)) + 1);
            const updated: UserGamificationState = {
                ...prev,
                xp: newXP,
                weeklyXp: newWeeklyXp,
                level: newLevel,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });

        this.scheduleRemotePush();
    }

    recordVideoCompleted(): void {
        this.ensureFreshPeriod();
        this.state.update(prev => {
            const updated: UserGamificationState = {
                ...prev,
                totalVideosWatched: prev.totalVideosWatched + 1,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });
        this.trackMissionProgress('watch_video', 1);
        this.addXP(25);
    }

    recordQuizCompleted(): void {
        this.ensureFreshPeriod();
        this.state.update(prev => {
            const updated: UserGamificationState = {
                ...prev,
                totalQuizzesCompleted: prev.totalQuizzesCompleted + 1,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });
        this.trackMissionProgress('complete_quiz', 1);
        this.addXP(15);
    }

    trackMissionProgress(type: MissionType, amount = 1): void {
        if (amount <= 0) return;

        this.ensureFreshPeriod();
        this.state.update(prev => {
            if (!prev.dailyMissions) return prev;

            let hasChange = false;
            const updatedMissions = prev.dailyMissions.missions.map(m => {
                if (m.type === type && !m.completed) {
                    const newProg = Math.min(m.target, m.progress + amount);
                    if (newProg !== m.progress) {
                        hasChange = true;
                        return {
                            ...m,
                            progress: newProg,
                            completed: newProg >= m.target
                        };
                    }
                }
                return m;
            });

            if (!hasChange) return prev;

            const updated: UserGamificationState = {
                ...prev,
                dailyMissions: {
                    ...prev.dailyMissions,
                    missions: updatedMissions
                },
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });

        this.scheduleRemotePush();
    }

    claimMissionReward(missionId: string): number {
        let xpGained = 0;
        this.ensureFreshPeriod();
        this.state.update(prev => {
            if (!prev.dailyMissions) return prev;

            let found = false;
            const updatedMissions = prev.dailyMissions.missions.map(m => {
                if (m.id === missionId && m.completed && !m.claimed) {
                    found = true;
                    xpGained = m.xpReward;
                    return {
                        ...m,
                        claimed: true
                    };
                }
                return m;
            });

            if (!found || xpGained <= 0) return prev;

            const newXP = prev.xp + xpGained;
            const newWeeklyXp = (prev.weeklyXp || 0) + xpGained;
            const newLevel = Math.max(1, Math.floor(Math.sqrt(newXP / 100)) + 1);

            const updated: UserGamificationState = {
                ...prev,
                xp: newXP,
                weeklyXp: newWeeklyXp,
                level: newLevel,
                dailyMissions: {
                    ...prev.dailyMissions,
                    missions: updatedMissions
                },
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });

        if (xpGained > 0) {
            this.scheduleRemotePush();
        }
        return xpGained;
    }

    claimDailyBonus(): number {
        let bonusGained = 0;
        this.ensureFreshPeriod();
        this.state.update(prev => {
            if (!prev.dailyMissions) return prev;

            const allDone = prev.dailyMissions.missions.length > 0 && prev.dailyMissions.missions.every(m => m.completed);
            if (!allDone || prev.dailyMissions.allCompletedBonusClaimed) return prev;

            bonusGained = prev.dailyMissions.bonusXp || 50;
            const newXP = prev.xp + bonusGained;
            const newWeeklyXp = (prev.weeklyXp || 0) + bonusGained;
            const newLevel = Math.max(1, Math.floor(Math.sqrt(newXP / 100)) + 1);

            const updated: UserGamificationState = {
                ...prev,
                xp: newXP,
                weeklyXp: newWeeklyXp,
                level: newLevel,
                dailyMissions: {
                    ...prev.dailyMissions,
                    allCompletedBonusClaimed: true
                },
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });

        if (bonusGained > 0) {
            this.scheduleRemotePush();
        }
        return bonusGained;
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
                            filter: `user = "${sanitizeFilterValue(user.id)}"`
                        });
                        if (list.items.length > 0) {
                            remoteRecord = list.items[0];
                        }
                    } catch {
                        // PocketBase collection might not be created yet; continue in local mode
                    }
                }
            }

            const local = this.ensureFreshPeriod();

            if (remoteRecord) {
                // Merge strategy: Monotonic XP, earlier badge timestamps, union of notified badges
                const mergedXP = Math.max(local.xp, remoteRecord.xp || 0);
                const mergedLevel = Math.max(1, Math.floor(Math.sqrt(mergedXP / 100)) + 1);
                const mergedVideos = Math.max(local.totalVideosWatched, remoteRecord.total_videos_watched || 0);
                const mergedQuizzes = Math.max(local.totalQuizzesCompleted, remoteRecord.total_quizzes_completed || 0);
                const currentWeek = getIsoWeekKey();
                const mergedWeeklyXp = (remoteRecord.current_week_key === currentWeek)
                    ? Math.max(local.weeklyXp || 0, remoteRecord.weekly_xp || 0)
                    : (local.weeklyXp || 0);

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
                    ...local,
                    xp: mergedXP,
                    weeklyXp: mergedWeeklyXp,
                    currentWeekKey: currentWeek,
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
                    mergedWeeklyXp > (remoteRecord.weekly_xp || 0) ||
                    Object.keys(mergedUnlocked).length > Object.keys(remoteRecord.unlocked_achievements || {}).length ||
                    mergedVideos > (remoteRecord.total_videos_watched || 0) ||
                    mergedQuizzes > (remoteRecord.total_quizzes_completed || 0)) {
                    await client.collection('gamification').update(remoteRecord.id, {
                        xp: mergedXP,
                        level: mergedLevel,
                        weekly_xp: mergedWeeklyXp,
                        current_week_key: currentWeek,
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
                        weekly_xp: local.weeklyXp || 0,
                        current_week_key: local.currentWeekKey || getIsoWeekKey(),
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
        if (this.auth.isLoggedIn()) {
            void this.syncWithRemote();
        }

        this.auth.loginEvent.subscribe(() => {
            void this.syncWithRemote();
        });

        this.pb.reconnectEvent.subscribe(() => {
            if (this.auth.isLoggedIn()) {
                void this.syncWithRemote();
            }
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
                weeklyXp: 0,
                currentWeekKey: getIsoWeekKey(),
                unlockedAchievements: {},
                notifiedAchievements: [],
                totalVideosWatched: 0,
                totalQuizzesCompleted: 0,
                dailyMissions: createDailyMissionsForDate(getTodayKey())
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

        const current = this.ensureFreshPeriod();
        const deterministicId = generateGamificationId(user.id);

        try {
            const client = await this.pb.getClient();
            try {
                await client.collection('gamification').update(deterministicId, {
                    xp: current.xp,
                    level: current.level,
                    weekly_xp: current.weeklyXp || 0,
                    current_week_key: current.currentWeekKey || getIsoWeekKey(),
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
                        weekly_xp: current.weeklyXp || 0,
                        current_week_key: current.currentWeekKey || getIsoWeekKey(),
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
        const today = getTodayKey();
        const currentWeek = getIsoWeekKey();

        if (stored) {
            let weeklyXp = stored.weeklyXp || 0;
            let currentWeekKey = stored.currentWeekKey || currentWeek;
            if (currentWeekKey !== currentWeek) {
                weeklyXp = 0;
                currentWeekKey = currentWeek;
            }

            let dailyMissions = stored.dailyMissions;
            if (!dailyMissions || dailyMissions.date !== today) {
                dailyMissions = createDailyMissionsForDate(today);
            }

            const freshState: UserGamificationState = {
                xp: stored.xp || 0,
                level: stored.level || 1,
                weeklyXp,
                currentWeekKey,
                unlockedAchievements: stored.unlockedAchievements || {},
                notifiedAchievements: stored.notifiedAchievements || [],
                totalVideosWatched: stored.totalVideosWatched || 0,
                totalQuizzesCompleted: stored.totalQuizzesCompleted || 0,
                dailyMissions,
                updatedAt: stored.updatedAt
            };
            this.state.set(freshState);
            this.saveToStorage(freshState);
        } else {
            const freshState: UserGamificationState = {
                xp: 0,
                level: 1,
                weeklyXp: 0,
                currentWeekKey: currentWeek,
                unlockedAchievements: {},
                notifiedAchievements: [],
                totalVideosWatched: 0,
                totalQuizzesCompleted: 0,
                dailyMissions: createDailyMissionsForDate(today)
            };
            this.state.set(freshState);
            this.saveToStorage(freshState);
        }
    }

    private saveToStorage(state: UserGamificationState): void {
        this.storage.set(STORAGE_KEY, state);
    }
}
