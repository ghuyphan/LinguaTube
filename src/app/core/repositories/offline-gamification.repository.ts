import { Injectable, inject, signal } from '@angular/core';
import { IGamificationRepository } from './gamification.repository';
import { UserGamificationState, Mission, DailyMissionsState, MissionType } from '../../models/gamification.model';
import { AuthService, StorageService, SupabaseService } from '../services';

const STORAGE_KEY = 'linguatube_gamification';
const DIRTY_STORAGE_KEY = 'voca_gamification_dirty';
const PENDING_XP_KEY = 'voca_pending_gamification_xp_queue';
const SYNC_DEBOUNCE_MS = 2000;

export function calculateLevelFromXp(xp: number): number {
    return Math.min(50, Math.max(1, Math.floor(Math.sqrt(Math.max(0, xp) / 75)) + 1));
}

export interface PendingXpEvent {
    activityType: string;
    amount: number;
    referenceId?: string;
    clientDate: string;
    timestamp: number;
}

import { getIsoWeekKey, getTodayKey } from '../../shared/utils/date.utils';
export { getIsoWeekKey, getTodayKey };

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
            icon: 'film-strip',
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
            icon: 'film-projector',
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
            icon: 'quill-ink',
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
            icon: 'miner',
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
            icon: 'scroll-unfurled',
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
            icon: 'card-draw',
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
            icon: 'crossed-swords',
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
    private supabase = inject(SupabaseService);

    private _state = signal<UserGamificationState>({
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
    readonly state = this._state.asReadonly();

    readonly isLoading = signal<boolean>(false);
    readonly pendingRolloverXp = signal<number>(0);

    private missionSyncTimer: ReturnType<typeof setTimeout> | null = null;

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
        let rolloverXp = 0;
        if (!dailyMissions || dailyMissions.date !== today) {
            // Harvest completed but unclaimed quest rewards from previous day
            if (dailyMissions && Array.isArray(dailyMissions.missions)) {
                for (const m of dailyMissions.missions) {
                    if (m.completed && !m.claimed) {
                        rolloverXp += (m.xpReward || 0);
                    }
                }
                const allDone = dailyMissions.missions.length > 0 && dailyMissions.missions.every(m => m.completed);
                if (allDone && !dailyMissions.allCompletedBonusClaimed) {
                    rolloverXp += (dailyMissions.bonusXp || 50);
                }
            }
            dailyMissions = createDailyMissionsForDate(today);
            updated = true;
        }

        if (rolloverXp > 0) {
            this.pendingRolloverXp.set(rolloverXp);
        }

        if (updated) {
            const nextXp = prev.xp + rolloverXp;
            const nextWeeklyXp = weeklyXp + rolloverXp;
            const nextLevel = calculateLevelFromXp(nextXp);

            const nextState: UserGamificationState = {
                ...prev,
                xp: nextXp,
                weeklyXp: nextWeeklyXp,
                level: nextLevel,
                currentWeekKey,
                dailyMissions,
                updatedAt: new Date().toISOString()
            };
            this._state.set(nextState);
            this.saveToStorage(nextState);
            if (rolloverXp > 0 && this.auth.isLoggedIn()) {
                void (async () => {
                    try {
                        const { data, error } = await this.supabase.client.rpc('award_study_xp', {
                            p_activity_type: 'daily_bonus_chest',
                            p_amount: Math.min(rolloverXp, 60),
                            p_reference_id: 'rollover_missions',
                            p_client_date: today
                        });
                        if (error || !data || data.status !== 'success') {
                            this.queuePendingXp({
                                activityType: 'daily_bonus_chest',
                                amount: Math.min(rolloverXp, 60),
                                referenceId: 'rollover_missions',
                                clientDate: today,
                                timestamp: Date.now()
                            });
                        }
                    } catch {
                        this.queuePendingXp({
                            activityType: 'daily_bonus_chest',
                            amount: Math.min(rolloverXp, 60),
                            referenceId: 'rollover_missions',
                            clientDate: today,
                            timestamp: Date.now()
                        });
                    }
                })();
            }
            return nextState;
        }

        return prev;
    }

    addXP(amount: number, activityType = 'video_completed', referenceId?: string): void {
        if (amount <= 0) return;

        this.ensureFreshPeriod();
        this._state.update(prev => {
            const newXP = prev.xp + amount;
            const newWeeklyXp = (prev.weeklyXp || 0) + amount;
            const newLevel = calculateLevelFromXp(newXP);
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

        if (this.auth.isLoggedIn()) {
            const todayStr = getTodayKey();
            const allowedType = [
                'video_completed', 'word_saved', 'flashcard_review',
                'quiz_completed', 'daily_mission', 'daily_bonus_chest',
                'grammar_found', 'achievement_unlocked'
            ].includes(activityType) ? activityType : 'video_completed';

            const xpToAward = Math.min(amount, allowedType === 'achievement_unlocked' ? 1000 : 60);

            void (async () => {
                try {
                    const { data, error } = await this.supabase.client.rpc('award_study_xp', {
                        p_activity_type: allowedType,
                        p_amount: xpToAward,
                        p_reference_id: referenceId || null,
                        p_client_date: todayStr
                    });
                    if (error || !data || data.status !== 'success') {
                        this.queuePendingXp({
                            activityType: allowedType,
                            amount: xpToAward,
                            referenceId,
                            clientDate: todayStr,
                            timestamp: Date.now()
                        });
                    } else if (data.status === 'success') {
                        this._state.update(prev => ({
                            ...prev,
                            xp: data.xp,
                            weeklyXp: data.weekly_xp,
                            level: data.level,
                            totalVideosWatched: data.total_videos_watched ?? prev.totalVideosWatched,
                            totalQuizzesCompleted: data.total_quizzes_completed ?? prev.totalQuizzesCompleted,
                            updatedAt: new Date().toISOString()
                        }));
                        this.saveToStorage(this._state());
                    }
                } catch {
                    this.queuePendingXp({
                        activityType: allowedType,
                        amount: xpToAward,
                        referenceId,
                        clientDate: todayStr,
                        timestamp: Date.now()
                    });
                }
            })();
        }
    }

    deductXP(amount: number, purpose = 'freeze_replenish', itemId?: string): boolean {
        if (amount <= 0) return false;
        this.ensureFreshPeriod();
        const current = this.state();
        if (current.xp < amount) return false;

        this._state.update(prev => {
            const newXP = Math.max(0, prev.xp - amount);
            const newWeeklyXp = Math.max(0, (prev.weeklyXp || 0) - amount);
            const newLevel = calculateLevelFromXp(newXP);
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

        if (this.auth.isLoggedIn()) {
            void (async () => {
                try {
                    const { data } = await this.supabase.client.rpc('spend_xp', {
                        p_cost: amount,
                        p_purpose: purpose,
                        p_item_id: itemId || null
                    });
                    if (data?.success && typeof data.new_xp === 'number') {
                        this._state.update(prev => ({
                            ...prev,
                            xp: data.new_xp,
                            level: calculateLevelFromXp(data.new_xp),
                            updatedAt: new Date().toISOString()
                        }));
                        this.saveToStorage(this._state());
                    }
                } catch (err: unknown) {
                    console.warn('[GamificationRepo] spend_xp error:', err);
                }
            })();
        }
        return true;
    }

    recordVideoCompleted(videoId?: string): Mission[] {
        this.ensureFreshPeriod();
        this._state.update(prev => {
            const updated: UserGamificationState = {
                ...prev,
                totalVideosWatched: prev.totalVideosWatched + 1,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });
        const completed = this.trackMissionProgress('watch_video', 1);
        this.addXP(25, 'video_completed', videoId);
        return completed;
    }

    recordQuizCompleted(quizId?: string): Mission[] {
        this.ensureFreshPeriod();
        this._state.update(prev => {
            const updated: UserGamificationState = {
                ...prev,
                totalQuizzesCompleted: prev.totalQuizzesCompleted + 1,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });
        const completed = this.trackMissionProgress('complete_quiz', 1);
        this.addXP(20, 'quiz_completed', quizId);
        return completed;
    }

    trackMissionProgress(type: MissionType, amount = 1): Mission[] {
        if (amount <= 0) return [];

        this.ensureFreshPeriod();
        const newlyCompleted: Mission[] = [];

        this._state.update(prev => {
            if (!prev.dailyMissions) return prev;

            let hasChange = false;
            const updatedMissions = prev.dailyMissions.missions.map(m => {
                if (m.type === type && !m.completed) {
                    const newProg = Math.min(m.target, m.progress + amount);
                    if (newProg !== m.progress) {
                        hasChange = true;
                        const isNowCompleted = newProg >= m.target;
                        if (isNowCompleted) {
                            newlyCompleted.push({
                                ...m,
                                progress: newProg,
                                completed: true
                            });
                        }
                        return {
                            ...m,
                            progress: newProg,
                            completed: isNowCompleted
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

        this.syncDailyMissionsDebounced();
        return newlyCompleted;
    }

    claimMissionReward(missionId: string): number {
        let xpGained = 0;
        this.ensureFreshPeriod();
        this._state.update(prev => {
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
            const newLevel = calculateLevelFromXp(newXP);

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

        if (xpGained > 0 && this.auth.isLoggedIn()) {
            this.syncDailyMissionsDebounced();
            void (async () => {
                try {
                    const { data } = await this.supabase.client.rpc('award_study_xp', {
                        p_activity_type: 'daily_mission',
                        p_amount: Math.min(xpGained, 40),
                        p_reference_id: missionId,
                        p_client_date: getTodayKey()
                    });
                    if (data?.status === 'success') {
                        this._state.update(prev => ({
                            ...prev,
                            xp: data.xp,
                            weeklyXp: data.weekly_xp,
                            level: data.level,
                            updatedAt: new Date().toISOString()
                        }));
                        this.saveToStorage(this._state());
                    }
                } catch (err: unknown) {
                    console.warn('[GamificationRepo] claim mission award error:', err);
                }
            })();
        }
        return xpGained;
    }

    claimDailyBonus(): number {
        let bonusGained = 0;
        this.ensureFreshPeriod();
        this._state.update(prev => {
            if (!prev.dailyMissions) return prev;

            const allDone = prev.dailyMissions.missions.length > 0 && prev.dailyMissions.missions.every(m => m.completed);
            if (!allDone || prev.dailyMissions.allCompletedBonusClaimed) return prev;

            bonusGained = prev.dailyMissions.bonusXp || 50;
            const newXP = prev.xp + bonusGained;
            const newWeeklyXp = (prev.weeklyXp || 0) + bonusGained;
            const newLevel = calculateLevelFromXp(newXP);

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

        if (bonusGained > 0 && this.auth.isLoggedIn()) {
            this.syncDailyMissionsDebounced();
            void (async () => {
                try {
                    const { data } = await this.supabase.client.rpc('award_study_xp', {
                        p_activity_type: 'daily_bonus_chest',
                        p_amount: Math.min(bonusGained, 60),
                        p_reference_id: 'daily_chest',
                        p_client_date: getTodayKey()
                    });
                    if (data?.status === 'success') {
                        this._state.update(prev => ({
                            ...prev,
                            xp: data.xp,
                            weeklyXp: data.weekly_xp,
                            level: data.level,
                            updatedAt: new Date().toISOString()
                        }));
                        this.saveToStorage(this._state());
                    }
                } catch (err: unknown) {
                    console.warn('[GamificationRepo] claim daily bonus award error:', err);
                }
            })();
        }
        return bonusGained;
    }

    unlockAndNotifyAchievements(newUnlocked: Record<string, string>, xpGained: number, newlyNotified: string[]): void {
        const hasUnlocked = Object.keys(newUnlocked).length > 0;
        const hasNotified = newlyNotified && newlyNotified.length > 0;
        if (!hasUnlocked && xpGained <= 0 && !hasNotified) return;

        this.ensureFreshPeriod();

        let updatedNotified: string[] = this.state().notifiedAchievements;

        this._state.update(prev => {
            const newXP = prev.xp + Math.max(0, xpGained);
            const newWeeklyXp = (prev.weeklyXp || 0) + Math.max(0, xpGained);
            const newLevel = calculateLevelFromXp(newXP);

            if (hasNotified) {
                const currentSet = new Set(prev.notifiedAchievements);
                for (const id of newlyNotified) {
                    currentSet.add(id);
                }
                updatedNotified = Array.from(currentSet);
            }

            const updated: UserGamificationState = {
                ...prev,
                xp: newXP,
                weeklyXp: newWeeklyXp,
                level: newLevel,
                unlockedAchievements: hasUnlocked ? { ...prev.unlockedAchievements, ...newUnlocked } : prev.unlockedAchievements,
                notifiedAchievements: updatedNotified,
                updatedAt: new Date().toISOString()
            };
            this.saveToStorage(updated);
            return updated;
        });

        if (this.auth.isLoggedIn()) {
            void (async () => {
                try {
                    if (hasUnlocked || hasNotified) {
                        await this.supabase.client.rpc('sync_achievements', {
                            p_unlocked: hasUnlocked ? newUnlocked : {},
                            p_notified: updatedNotified
                        });
                    }

                    if (xpGained > 0) {
                        const refId = newlyNotified.length > 0
                            ? newlyNotified.join(',')
                            : (Object.keys(newUnlocked).join(',') || 'achievements');

                        const { data } = await this.supabase.client.rpc('award_study_xp', {
                            p_activity_type: 'achievement_unlocked',
                            p_amount: Math.min(xpGained, 1000),
                            p_reference_id: refId,
                            p_client_date: getTodayKey()
                        });

                        if (data && data.status === 'success') {
                            this._state.update(prev => ({
                                ...prev,
                                xp: data.xp,
                                weeklyXp: data.weekly_xp,
                                level: data.level,
                                updatedAt: new Date().toISOString()
                            }));
                            this.saveToStorage(this._state());
                        }
                    }
                } catch (err: unknown) {
                    console.warn('[GamificationRepo] achievement sync/award error:', err);
                }
            })();
        }
    }

    unlockAchievements(newUnlocked: Record<string, string>, xpGained: number): void {
        this.unlockAndNotifyAchievements(newUnlocked, xpGained, []);
    }

    markNotified(achievementIds: string[]): void {
        if (!achievementIds || achievementIds.length === 0) return;

        this._state.update(prev => {
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
            // 1. Flush any pending offline XP
            await this.flushPendingXp();

            // 2. Fetch authoritative gamification record from Supabase
            const { data: remoteRecord, error } = await this.supabase.client
                .from('gamification')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle();

            const local = this.ensureFreshPeriod();

            if (remoteRecord && !error) {
                const currentWeek = getIsoWeekKey();
                const remoteWeeklyXp = (remoteRecord.current_week_key === currentWeek)
                    ? (remoteRecord.weekly_xp || 0)
                    : 0;

                const remoteXP = remoteRecord.xp || 0;
                const remoteLevel = remoteRecord.level || calculateLevelFromXp(remoteXP);

                // Merge unlocked achievements: Union of local and remote
                const mergedUnlocked: Record<string, string> = { ...(remoteRecord.unlocked_achievements || {}) };
                let hasNewLocalAchievements = false;
                for (const [badgeId, unlockDate] of Object.entries(local.unlockedAchievements)) {
                    if (!mergedUnlocked[badgeId]) {
                        mergedUnlocked[badgeId] = unlockDate;
                        hasNewLocalAchievements = true;
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

                // If local unlocked achievements while offline, push them to server via sync_achievements RPC
                if (hasNewLocalAchievements || mergedNotified.length > (remoteRecord.notified_achievements?.length || 0)) {
                    await this.supabase.client.rpc('sync_achievements', {
                        p_unlocked: mergedUnlocked,
                        p_notified: mergedNotified
                    });
                }

                // Merge daily missions: If remote has today's missions, take maximum progress
                let dailyMissions = local.dailyMissions;
                if (remoteRecord.daily_missions && remoteRecord.daily_missions.date === getTodayKey()) {
                    const remoteMissions = remoteRecord.daily_missions;
                    dailyMissions = {
                        ...local.dailyMissions!,
                        allCompletedBonusClaimed: local.dailyMissions?.allCompletedBonusClaimed || remoteMissions.allCompletedBonusClaimed,
                        missions: (local.dailyMissions?.missions || []).map(localM => {
                            const remoteM = remoteMissions.missions?.find((rm: Mission) => rm.id === localM.id);
                            if (!remoteM) return localM;
                            return {
                                ...localM,
                                progress: Math.max(localM.progress, remoteM.progress || 0),
                                completed: localM.completed || remoteM.completed || false,
                                claimed: localM.claimed || remoteM.claimed || false
                            };
                        })
                    };
                }

                const mergedState: UserGamificationState = {
                    ...local,
                    xp: remoteXP,
                    weeklyXp: remoteWeeklyXp,
                    currentWeekKey: currentWeek,
                    level: remoteLevel,
                    totalVideosWatched: Math.max(local.totalVideosWatched, remoteRecord.total_videos_watched || 0),
                    totalQuizzesCompleted: Math.max(local.totalQuizzesCompleted, remoteRecord.total_quizzes_completed || 0),
                    unlockedAchievements: mergedUnlocked,
                    notifiedAchievements: mergedNotified,
                    dailyMissions,
                    updatedAt: remoteRecord.updated_at || new Date().toISOString()
                };

                this._state.set(mergedState);
                this.saveToStorage(mergedState);
            } else if (!remoteRecord && !error) {
                // Initialize remote record with local achievements if any
                if (Object.keys(local.unlockedAchievements).length > 0 || local.notifiedAchievements.length > 0) {
                    await this.supabase.client.rpc('sync_achievements', {
                        p_unlocked: local.unlockedAchievements,
                        p_notified: local.notifiedAchievements
                    });
                }
            }
        } catch (err) {
            console.warn('[GamificationRepo] Remote sync skipped:', err);
        } finally {
            this.isLoading.set(false);
            this.storage.remove(DIRTY_STORAGE_KEY);
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

        this.supabase.reconnectEvent.subscribe(() => {
            if (this.auth.isLoggedIn()) {
                void this.syncWithRemote();
            }
        });

        this.auth.logoutEvent.subscribe(() => {
            if (this.missionSyncTimer) {
                clearTimeout(this.missionSyncTimer);
                this.missionSyncTimer = null;
            }

            // Safe reset: Clean memory to avoid cross-user leak, but keep guest continuity if needed
            this._state.set({
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
            this.storage.remove(DIRTY_STORAGE_KEY);
            this.storage.remove(PENDING_XP_KEY);
        });
    }

    private syncDailyMissionsDebounced(): void {
        if (!this.auth.isLoggedIn()) return;
        if (this.missionSyncTimer) {
            clearTimeout(this.missionSyncTimer);
        }
        this.missionSyncTimer = setTimeout(() => {
            this.missionSyncTimer = null;
            const missions = this.state().dailyMissions;
            if (missions) {
                void (async () => {
                    try {
                        await this.supabase.client.rpc('sync_daily_missions', {
                            p_missions: missions
                        });
                    } catch (err: unknown) {
                        console.warn('[GamificationRepo] sync_daily_missions error:', err);
                    }
                })();
            }
        }, SYNC_DEBOUNCE_MS);
    }

    private queuePendingXp(event: PendingXpEvent): void {
        const queue = this.storage.get<PendingXpEvent[]>(PENDING_XP_KEY) || [];
        queue.push(event);
        if (queue.length > 50) {
            queue.shift();
        }
        this.storage.set(PENDING_XP_KEY, queue);
    }

    private async flushPendingXp(): Promise<void> {
        if (!this.auth.isLoggedIn()) return;
        const queue = this.storage.get<PendingXpEvent[]>(PENDING_XP_KEY) || [];
        if (queue.length === 0) return;

        const remaining: PendingXpEvent[] = [];
        for (const item of queue) {
            try {
                const { data, error } = await this.supabase.client.rpc('award_study_xp', {
                    p_activity_type: item.activityType,
                    p_amount: item.amount,
                    p_reference_id: item.referenceId ?? null,
                    p_client_date: item.clientDate
                });
                if (error) {
                    remaining.push(item);
                } else if (data && data.status === 'success') {
                    this._state.update(prev => ({
                        ...prev,
                        xp: data.xp,
                        weeklyXp: data.weekly_xp,
                        level: data.level,
                        totalVideosWatched: data.total_videos_watched ?? prev.totalVideosWatched,
                        totalQuizzesCompleted: data.total_quizzes_completed ?? prev.totalQuizzesCompleted,
                        updatedAt: new Date().toISOString()
                    }));
                    this.saveToStorage(this._state());
                }
            } catch {
                remaining.push(item);
            }
        }

        if (remaining.length > 0) {
            this.storage.set(PENDING_XP_KEY, remaining);
        } else {
            this.storage.remove(PENDING_XP_KEY);
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
            this._state.set(freshState);
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
            this._state.set(freshState);
            this.saveToStorage(freshState);
        }
    }

    private saveToStorage(state: UserGamificationState): void {
        this.storage.set(STORAGE_KEY, state);
    }
}
