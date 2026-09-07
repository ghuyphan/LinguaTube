import { Injectable, inject, signal, computed, effect, untracked } from '@angular/core';
import {
    Achievement,
    AchievementCategory,
    AchievementTier,
    UserGamificationState
} from '../../models/gamification.model';
import { IconName } from '../../shared/components/icon/icon.component';
import { OfflineVocabularyRepository } from '../repositories/offline-vocabulary.repository';
import { OfflineHistoryRepository } from '../repositories/offline-history.repository';
import { OfflineStreakRepository } from '../repositories/offline-streak.repository';
import { ToastService } from './toast.service';
import { I18nService } from './i18n.service';

const STORAGE_KEY = 'linguatube_gamification';

interface AchievementDefinition {
    id: string;
    titleKey: string;
    descriptionKey: string;
    category: AchievementCategory;
    tier: AchievementTier;
    icon: IconName;
    target: number;
    xpReward: number;
}

const ACHIEVEMENT_CATALOG: AchievementDefinition[] = [
    // Immersion (Video watching)
    { id: 'watch_1', titleKey: 'achievements.watch1.title', descriptionKey: 'achievements.watch1.desc', category: 'immersion', tier: 'bronze', icon: 'play-circle', target: 1, xpReward: 25 },
    { id: 'watch_5', titleKey: 'achievements.watch5.title', descriptionKey: 'achievements.watch5.desc', category: 'immersion', tier: 'bronze', icon: 'video', target: 5, xpReward: 50 },
    { id: 'watch_25', titleKey: 'achievements.watch25.title', descriptionKey: 'achievements.watch25.desc', category: 'immersion', tier: 'silver', icon: 'play-circle-filled', target: 25, xpReward: 150 },
    { id: 'watch_100', titleKey: 'achievements.watch100.title', descriptionKey: 'achievements.watch100.desc', category: 'immersion', tier: 'gold', icon: 'medal', target: 100, xpReward: 500 },

    // Vocabulary (Sentence Mining)
    { id: 'vocab_1', titleKey: 'achievements.vocab1.title', descriptionKey: 'achievements.vocab1.desc', category: 'vocabulary', tier: 'bronze', icon: 'bookmark', target: 1, xpReward: 15 },
    { id: 'vocab_25', titleKey: 'achievements.vocab25.title', descriptionKey: 'achievements.vocab25.desc', category: 'vocabulary', tier: 'bronze', icon: 'book-open', target: 25, xpReward: 50 },
    { id: 'vocab_100', titleKey: 'achievements.vocab100.title', descriptionKey: 'achievements.vocab100.desc', category: 'vocabulary', tier: 'silver', icon: 'layers', target: 100, xpReward: 200 },
    { id: 'vocab_500', titleKey: 'achievements.vocab500.title', descriptionKey: 'achievements.vocab500.desc', category: 'vocabulary', tier: 'gold', icon: 'book-open-filled', target: 500, xpReward: 600 },
    { id: 'vocab_master_10', titleKey: 'achievements.vocabMaster10.title', descriptionKey: 'achievements.vocabMaster10.desc', category: 'vocabulary', tier: 'silver', icon: 'check-circle', target: 10, xpReward: 100 },

    // Daily Streaks
    { id: 'streak_3', titleKey: 'achievements.streak3.title', descriptionKey: 'achievements.streak3.desc', category: 'streak', tier: 'bronze', icon: 'zap', target: 3, xpReward: 30 },
    { id: 'streak_7', titleKey: 'achievements.streak7.title', descriptionKey: 'achievements.streak7.desc', category: 'streak', tier: 'bronze', icon: 'fire', target: 7, xpReward: 70 },
    { id: 'streak_30', titleKey: 'achievements.streak30.title', descriptionKey: 'achievements.streak30.desc', category: 'streak', tier: 'gold', icon: 'fire', target: 30, xpReward: 300 },
    { id: 'streak_100', titleKey: 'achievements.streak100.title', descriptionKey: 'achievements.streak100.desc', category: 'streak', tier: 'diamond', icon: 'diamond', target: 100, xpReward: 1000 },

    // Study & Flashcards
    { id: 'srs_10', titleKey: 'achievements.srs10.title', descriptionKey: 'achievements.srs10.desc', category: 'srs', tier: 'bronze', icon: 'graduation-cap', target: 10, xpReward: 50 },
    { id: 'srs_50', titleKey: 'achievements.srs50.title', descriptionKey: 'achievements.srs50.desc', category: 'srs', tier: 'silver', icon: 'lightbulb', target: 50, xpReward: 150 },
    { id: 'srs_200', titleKey: 'achievements.srs200.title', descriptionKey: 'achievements.srs200.desc', category: 'srs', tier: 'gold', icon: 'sparkles', target: 200, xpReward: 500 },

    // Quizzes
    { id: 'quiz_1', titleKey: 'achievements.quiz1.title', descriptionKey: 'achievements.quiz1.desc', category: 'quiz', tier: 'bronze', icon: 'clipboard-check', target: 1, xpReward: 20 },
    { id: 'quiz_10', titleKey: 'achievements.quiz10.title', descriptionKey: 'achievements.quiz10.desc', category: 'quiz', tier: 'silver', icon: 'target', target: 10, xpReward: 100 },
    { id: 'quiz_50', titleKey: 'achievements.quiz50.title', descriptionKey: 'achievements.quiz50.desc', category: 'quiz', tier: 'gold', icon: 'trophy', target: 50, xpReward: 400 },
];

@Injectable({
    providedIn: 'root'
})
export class GamificationService {
    private vocabRepo = inject(OfflineVocabularyRepository);
    private historyRepo = inject(OfflineHistoryRepository);
    private streakRepo = inject(OfflineStreakRepository);
    private toast = inject(ToastService);
    private i18n = inject(I18nService);

    // Persistent State
    readonly rawState = signal<UserGamificationState>({
        xp: 0,
        level: 1,
        unlockedAchievements: {},
        notifiedAchievements: [],
        totalVideosWatched: 0,
        totalQuizzesCompleted: 0,
    });

    // Reactive signals
    readonly totalXP = computed(() => this.rawState().xp);

    /**
     * Level calculation: Level = floor(sqrt(XP / 100)) + 1
     * Level 1: 0 - 99 XP
     * Level 2: 100 - 399 XP
     * Level 3: 400 - 899 XP
     * Level 5: 1600 XP
     */
    readonly userLevel = computed(() => {
        const xp = this.totalXP();
        return Math.max(1, Math.floor(Math.sqrt(xp / 100)) + 1);
    });

    /**
     * Progress towards next level (0 to 100%)
     */
    readonly nextLevelProgress = computed(() => {
        const lvl = this.userLevel();
        const currentLevelXpBase = Math.pow(lvl - 1, 2) * 100;
        const nextLevelXpBase = Math.pow(lvl, 2) * 100;
        const xpInCurrentLevel = this.totalXP() - currentLevelXpBase;
        const needed = nextLevelXpBase - currentLevelXpBase;
        if (needed <= 0) return 100;
        return Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / needed) * 100)));
    });

    /**
     * Total reviews completed across all vocabulary
     */
    readonly totalSRSReviews = computed(() => {
        const items = this.vocabRepo.vocabulary();
        return items.reduce((acc, item) => acc + (item.reviewCount || 0), 0);
    });

    /**
     * Known / Mastered words
     */
    readonly masteredWordsCount = computed(() => {
        return this.vocabRepo.vocabulary().filter(item => item.level === 'known' || item.interval >= 21).length;
    });

    /**
     * Hydrated achievements list with real-time progress
     */
    readonly achievements = computed<Achievement[]>(() => {
        const state = this.rawState();
        const totalVocab = this.vocabRepo.vocabulary().length;
        const mastered = this.masteredWordsCount();
        const streak = this.streakRepo.streakData().longestStreak;
        const srsReviews = this.totalSRSReviews();
        const watched = Math.max(state.totalVideosWatched, this.historyRepo.getHistory()().length);
        const quizzes = state.totalQuizzesCompleted;

        return ACHIEVEMENT_CATALOG.map(def => {
            let current = 0;
            if (def.category === 'immersion') current = watched;
            else if (def.id === 'vocab_master_10') current = mastered;
            else if (def.category === 'vocabulary') current = totalVocab;
            else if (def.category === 'streak') current = streak;
            else if (def.category === 'srs') current = srsReviews;
            else if (def.category === 'quiz') current = quizzes;

            const unlocked = Boolean(state.unlockedAchievements[def.id]) || current >= def.target;
            const unlockedAt = state.unlockedAchievements[def.id] || (unlocked ? new Date().toISOString() : undefined);

            return {
                ...def,
                progress: Math.min(def.target, current),
                unlocked,
                unlockedAt
            };
        });
    });

    readonly unlockedCount = computed(() => this.achievements().filter(a => a.unlocked).length);
    readonly totalAchievementsCount = ACHIEVEMENT_CATALOG.length;

    constructor() {
        this.loadFromStorage();

        // Reactive effect: Automatically check milestones and award rewards whenever stats update
        effect(() => {
            this.evaluateMilestones();
        });
    }

    /**
     * Award XP to the user and persist
     */
    addXP(amount: number, reason?: string): void {
        if (amount <= 0) return;

        this.rawState.update(prev => {
            const newXP = prev.xp + amount;
            const newLevel = Math.max(1, Math.floor(Math.sqrt(newXP / 100)) + 1);

            // Level-up celebration
            if (newLevel > prev.level) {
                const levelUpMsg = `${this.i18n.t('gamification.levelUp') || 'Level Up!'} 🎉 ${this.i18n.t('gamification.reachedLevel') || 'You reached Level'} ${newLevel}!`;
                this.toast.show(levelUpMsg, { type: 'success', icon: 'sparkles', duration: 4500 });
            } else if (reason) {
                // Minor toast or silent
            }

            const updated: UserGamificationState = {
                ...prev,
                xp: newXP,
                level: newLevel
            };
            this.saveToStorage(updated);
            return updated;
        });
    }

    /**
     * Record video completion (>= 80% watched)
     */
    recordVideoCompleted(): void {
        this.rawState.update(prev => {
            const updated = { ...prev, totalVideosWatched: prev.totalVideosWatched + 1 };
            this.saveToStorage(updated);
            return updated;
        });
        this.addXP(25, 'video_completed');
    }

    /**
     * Record subtitle quiz completion
     */
    recordQuizCompleted(): void {
        this.rawState.update(prev => {
            const updated = { ...prev, totalQuizzesCompleted: prev.totalQuizzesCompleted + 1 };
            this.saveToStorage(updated);
            return updated;
        });
        this.addXP(15, 'quiz_completed');
    }

    /**
     * Check achievement conditions and celebrate newly unlocked badges
     */
    private evaluateMilestones(): void {
        const list = this.achievements();

        untracked(() => {
            const state = this.rawState();
            let stateChanged = false;
            const newUnlocked: Record<string, string> = { ...state.unlockedAchievements };
            const newNotified = [...state.notifiedAchievements];
            let xpGained = 0;

            for (const ach of list) {
                if (ach.unlocked && !newUnlocked[ach.id]) {
                    newUnlocked[ach.id] = ach.unlockedAt || new Date().toISOString();
                    xpGained += ach.xpReward;
                    stateChanged = true;
                }

                // Toast newly unlocked if not notified yet
                if (ach.unlocked && !newNotified.includes(ach.id)) {
                    newNotified.push(ach.id);
                    stateChanged = true;
                    const title = this.i18n.t(ach.titleKey) || ach.id;
                    const toastMsg = `🏆 ${this.i18n.t('gamification.badgeUnlocked') || 'Achievement Unlocked'}: ${title} (+${ach.xpReward} XP)`;
                    this.toast.show(toastMsg, { type: 'success', icon: 'trophy', duration: 4000 });
                }
            }

            if (stateChanged) {
                this.rawState.update(prev => {
                    const updated: UserGamificationState = {
                        ...prev,
                        xp: prev.xp + xpGained,
                        unlockedAchievements: newUnlocked,
                        notifiedAchievements: newNotified,
                        level: Math.max(1, Math.floor(Math.sqrt((prev.xp + xpGained) / 100)) + 1)
                    };
                    this.saveToStorage(updated);
                    return updated;
                });
            }
        });
    }

    private loadFromStorage(): void {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                this.rawState.set({
                    xp: parsed.xp || 0,
                    level: parsed.level || 1,
                    unlockedAchievements: parsed.unlockedAchievements || {},
                    notifiedAchievements: parsed.notifiedAchievements || [],
                    totalVideosWatched: parsed.totalVideosWatched || 0,
                    totalQuizzesCompleted: parsed.totalQuizzesCompleted || 0
                });
            }
        } catch { }
    }

    private saveToStorage(state: UserGamificationState): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch { }
    }
}
