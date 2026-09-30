import { Injectable, inject, computed, effect, untracked } from '@angular/core';
import {
    Achievement,
    AchievementCategory,
    AchievementTier,
    LevelTier,
    LevelConfig,
    Mission
} from '../../models/gamification.model';
import { IconName } from '../../shared/components/icon/icon.component';
import { OfflineVocabularyRepository } from '../repositories/offline-vocabulary.repository';
import { OfflineHistoryRepository } from '../repositories/offline-history.repository';
import { OfflineStreakRepository } from '../repositories/offline-streak.repository';
import { OfflineGamificationRepository, calculateLevelFromXp } from '../repositories/offline-gamification.repository';
import { ToastService } from './toast.service';
import { I18nService } from './i18n.service';
import { AuthService } from './auth.service';

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
    { id: 'watch_1', titleKey: 'achievements.watch1.title', descriptionKey: 'achievements.watch1.desc', category: 'immersion', tier: 'bronze', icon: 'sprout', target: 1, xpReward: 25 },
    { id: 'watch_5', titleKey: 'achievements.watch5.title', descriptionKey: 'achievements.watch5.desc', category: 'immersion', tier: 'bronze', icon: 'film-strip', target: 5, xpReward: 50 },
    { id: 'watch_15', titleKey: 'achievements.watch15.title', descriptionKey: 'achievements.watch15.desc', category: 'immersion', tier: 'bronze', icon: 'clapperboard', target: 15, xpReward: 100 },
    { id: 'watch_30', titleKey: 'achievements.watch30.title', descriptionKey: 'achievements.watch30.desc', category: 'immersion', tier: 'silver', icon: 'film-projector', target: 30, xpReward: 175 },
    { id: 'watch_60', titleKey: 'achievements.watch60.title', descriptionKey: 'achievements.watch60.desc', category: 'immersion', tier: 'silver', icon: 'compass', target: 60, xpReward: 300 },
    { id: 'watch_100', titleKey: 'achievements.watch100.title', descriptionKey: 'achievements.watch100.desc', category: 'immersion', tier: 'gold', icon: 'globe', target: 100, xpReward: 500 },
    { id: 'watch_250', titleKey: 'achievements.watch250.title', descriptionKey: 'achievements.watch250.desc', category: 'immersion', tier: 'diamond', icon: 'ouroboros', target: 250, xpReward: 800 },
    { id: 'watch_500', titleKey: 'achievements.watch500.title', descriptionKey: 'achievements.watch500.desc', category: 'immersion', tier: 'diamond', icon: 'imperial-crown', target: 500, xpReward: 1000 },

    // Vocabulary (Sentence Mining)
    { id: 'vocab_1', titleKey: 'achievements.vocab1.title', descriptionKey: 'achievements.vocab1.desc', category: 'vocabulary', tier: 'bronze', icon: 'miner', target: 1, xpReward: 15 },
    { id: 'vocab_10', titleKey: 'achievements.vocab10.title', descriptionKey: 'achievements.vocab10.desc', category: 'vocabulary', tier: 'bronze', icon: 'stone-block', target: 10, xpReward: 30 },
    { id: 'vocab_25', titleKey: 'achievements.vocab25.title', descriptionKey: 'achievements.vocab25.desc', category: 'vocabulary', tier: 'bronze', icon: 'quill-ink', target: 25, xpReward: 50 },
    { id: 'vocab_50', titleKey: 'achievements.vocab50.title', descriptionKey: 'achievements.vocab50.desc', category: 'vocabulary', tier: 'bronze', icon: 'scroll-unfurled', target: 50, xpReward: 100 },
    { id: 'vocab_100', titleKey: 'achievements.vocab100.title', descriptionKey: 'achievements.vocab100.desc', category: 'vocabulary', tier: 'silver', icon: 'gems', target: 100, xpReward: 200 },
    { id: 'vocab_250', titleKey: 'achievements.vocab250.title', descriptionKey: 'achievements.vocab250.desc', category: 'vocabulary', tier: 'silver', icon: 'spell-book', target: 250, xpReward: 400 },
    { id: 'vocab_500', titleKey: 'achievements.vocab500.title', descriptionKey: 'achievements.vocab500.desc', category: 'vocabulary', tier: 'gold', icon: 'treasure-chest', target: 500, xpReward: 600 },
    { id: 'vocab_1000', titleKey: 'achievements.vocab1000.title', descriptionKey: 'achievements.vocab1000.desc', category: 'vocabulary', tier: 'diamond', icon: 'crown', target: 1000, xpReward: 1000 },

    // Vocabulary Mastery (SRS interval >= 21 days or known)
    { id: 'vocab_master_10', titleKey: 'achievements.vocabMaster10.title', descriptionKey: 'achievements.vocabMaster10.desc', category: 'vocabulary', tier: 'bronze', icon: 'crystal-ball', target: 10, xpReward: 100 },
    { id: 'vocab_master_50', titleKey: 'achievements.vocabMaster50.title', descriptionKey: 'achievements.vocabMaster50.desc', category: 'vocabulary', tier: 'silver', icon: 'ribbon-shield', target: 50, xpReward: 250 },
    { id: 'vocab_master_100', titleKey: 'achievements.vocabMaster100.title', descriptionKey: 'achievements.vocabMaster100.desc', category: 'vocabulary', tier: 'silver', icon: 'templar-shield', target: 100, xpReward: 450 },
    { id: 'vocab_master_250', titleKey: 'achievements.vocabMaster250.title', descriptionKey: 'achievements.vocabMaster250.desc', category: 'vocabulary', tier: 'gold', icon: 'broadsword', target: 250, xpReward: 700 },
    { id: 'vocab_master_500', titleKey: 'achievements.vocabMaster500.title', descriptionKey: 'achievements.vocabMaster500.desc', category: 'vocabulary', tier: 'diamond', icon: 'winged-sword', target: 500, xpReward: 1000 },

    // Daily Streaks
    { id: 'streak_3', titleKey: 'achievements.streak3.title', descriptionKey: 'achievements.streak3.desc', category: 'streak', tier: 'bronze', icon: 'flint-spark', target: 3, xpReward: 30 },
    { id: 'streak_7', titleKey: 'achievements.streak7.title', descriptionKey: 'achievements.streak7.desc', category: 'streak', tier: 'bronze', icon: 'fire', target: 7, xpReward: 70 },
    { id: 'streak_14', titleKey: 'achievements.streak14.title', descriptionKey: 'achievements.streak14.desc', category: 'streak', tier: 'silver', icon: 'campfire', target: 14, xpReward: 150 },
    { id: 'streak_30', titleKey: 'achievements.streak30.title', descriptionKey: 'achievements.streak30.desc', category: 'streak', tier: 'silver', icon: 'torch', target: 30, xpReward: 300 },
    { id: 'streak_60', titleKey: 'achievements.streak60.title', descriptionKey: 'achievements.streak60.desc', category: 'streak', tier: 'gold', icon: 'sunbeams', target: 60, xpReward: 500 },
    { id: 'streak_100', titleKey: 'achievements.streak100.title', descriptionKey: 'achievements.streak100.desc', category: 'streak', tier: 'gold', icon: 'egyptian-bird', target: 100, xpReward: 800 },
    { id: 'streak_200', titleKey: 'achievements.streak200.title', descriptionKey: 'achievements.streak200.desc', category: 'streak', tier: 'diamond', icon: 'star-filled', target: 200, xpReward: 1000 },
    { id: 'streak_365', titleKey: 'achievements.streak365.title', descriptionKey: 'achievements.streak365.desc', category: 'streak', tier: 'diamond', icon: 'ouroboros', target: 365, xpReward: 1000 },

    // Study & Flashcards (SRS reviews)
    { id: 'srs_10', titleKey: 'achievements.srs10.title', descriptionKey: 'achievements.srs10.desc', category: 'srs', tier: 'bronze', icon: 'card-draw', target: 10, xpReward: 50 },
    { id: 'srs_50', titleKey: 'achievements.srs50.title', descriptionKey: 'achievements.srs50.desc', category: 'srs', tier: 'bronze', icon: 'brainstorm', target: 50, xpReward: 150 },
    { id: 'srs_100', titleKey: 'achievements.srs100.title', descriptionKey: 'achievements.srs100.desc', category: 'srs', tier: 'silver', icon: 'anvil', target: 100, xpReward: 300 },
    { id: 'srs_250', titleKey: 'achievements.srs250.title', descriptionKey: 'achievements.srs250.desc', category: 'srs', tier: 'silver', icon: 'sparkles', target: 250, xpReward: 500 },
    { id: 'srs_500', titleKey: 'achievements.srs500.title', descriptionKey: 'achievements.srs500.desc', category: 'srs', tier: 'gold', icon: 'wand', target: 500, xpReward: 750 },
    { id: 'srs_1000', titleKey: 'achievements.srs1000.title', descriptionKey: 'achievements.srs1000.desc', category: 'srs', tier: 'diamond', icon: 'hourglass', target: 1000, xpReward: 1000 },

    // Quizzes
    { id: 'quiz_1', titleKey: 'achievements.quiz1.title', descriptionKey: 'achievements.quiz1.desc', category: 'quiz', tier: 'bronze', icon: 'sound-waves', target: 1, xpReward: 20 },
    { id: 'quiz_5', titleKey: 'achievements.quiz5.title', descriptionKey: 'achievements.quiz5.desc', category: 'quiz', tier: 'bronze', icon: 'bullseye', target: 5, xpReward: 50 },
    { id: 'quiz_15', titleKey: 'achievements.quiz15.title', descriptionKey: 'achievements.quiz15.desc', category: 'quiz', tier: 'silver', icon: 'magnifying-glass', target: 15, xpReward: 150 },
    { id: 'quiz_30', titleKey: 'achievements.quiz30.title', descriptionKey: 'achievements.quiz30.desc', category: 'quiz', tier: 'silver', icon: 'speedometer', target: 30, xpReward: 300 },
    { id: 'quiz_60', titleKey: 'achievements.quiz60.title', descriptionKey: 'achievements.quiz60.desc', category: 'quiz', tier: 'gold', icon: 'laurels-trophy', target: 60, xpReward: 500 },
    { id: 'quiz_100', titleKey: 'achievements.quiz100.title', descriptionKey: 'achievements.quiz100.desc', category: 'quiz', tier: 'diamond', icon: 'laurel-crown', target: 100, xpReward: 800 },
];

export const LEVEL_CONFIGS: LevelConfig[] = [
    // Tier 1: Stone (Levels 1 - 5)
    { level: 1,  titleKey: 'gamification.rank1',  tier: 'stone',       icon: 'cracked-shield' },
    { level: 2,  titleKey: 'gamification.rank2',  tier: 'stone',       icon: 'sound-waves' },
    { level: 3,  titleKey: 'gamification.rank3',  tier: 'stone',       icon: 'sprout' },
    { level: 4,  titleKey: 'gamification.rank4',  tier: 'stone',       icon: 'quill-ink' },
    { level: 5,  titleKey: 'gamification.rank5',  tier: 'stone',       icon: 'compass' },

    // Tier 2: Bronze (Levels 6 - 10)
    { level: 6,  titleKey: 'gamification.rank6',  tier: 'bronze',      icon: 'miner' },
    { level: 7,  titleKey: 'gamification.rank7',  tier: 'bronze',      icon: 'film-strip' },
    { level: 8,  titleKey: 'gamification.rank8',  tier: 'bronze',      icon: 'card-draw' },
    { level: 9,  titleKey: 'gamification.rank9',  tier: 'bronze',      icon: 'flint-spark' },
    { level: 10, titleKey: 'gamification.rank10', tier: 'bronze',      icon: 'stone-block' },

    // Tier 3: Silver (Levels 11 - 15)
    { level: 11, titleKey: 'gamification.rank11', tier: 'silver',      icon: 'clapperboard' },
    { level: 12, titleKey: 'gamification.rank12', tier: 'silver',      icon: 'ribbon-shield' },
    { level: 13, titleKey: 'gamification.rank13', tier: 'silver',      icon: 'brainstorm' },
    { level: 14, titleKey: 'gamification.rank14', tier: 'silver',      icon: 'campfire' },
    { level: 15, titleKey: 'gamification.rank15', tier: 'silver',      icon: 'roman-shield' },

    // Tier 4: Gold (Levels 16 - 20)
    { level: 16, titleKey: 'gamification.rank16', tier: 'gold',        icon: 'fire' },
    { level: 17, titleKey: 'gamification.rank17', tier: 'gold',        icon: 'broadsword' },
    { level: 18, titleKey: 'gamification.rank18', tier: 'gold',        icon: 'magnifying-glass' },
    { level: 19, titleKey: 'gamification.rank19', tier: 'gold',        icon: 'target' },
    { level: 20, titleKey: 'gamification.rank20', tier: 'gold',        icon: 'templar-shield' },

    // Tier 5: Platinum (Levels 21 - 25)
    { level: 21, titleKey: 'gamification.rank21', tier: 'platinum',    icon: 'bullseye' },
    { level: 22, titleKey: 'gamification.rank22', tier: 'platinum',    icon: 'sound-waves' },
    { level: 23, titleKey: 'gamification.rank23', tier: 'platinum',    icon: 'anvil' },
    { level: 24, titleKey: 'gamification.rank24', tier: 'platinum',    icon: 'speedometer' },
    { level: 25, titleKey: 'gamification.rank25', tier: 'platinum',    icon: 'gems' },

    // Tier 6: Emerald (Levels 26 - 30)
    { level: 26, titleKey: 'gamification.rank26', tier: 'emerald',     icon: 'sparkles' },
    { level: 27, titleKey: 'gamification.rank27', tier: 'emerald',     icon: 'globe' },
    { level: 28, titleKey: 'gamification.rank28', tier: 'emerald',     icon: 'compass' },
    { level: 29, titleKey: 'gamification.rank29', tier: 'emerald',     icon: 'wand' },
    { level: 30, titleKey: 'gamification.rank30', tier: 'emerald',     icon: 'ouroboros' },

    // Tier 7: Diamond (Levels 31 - 35)
    { level: 31, titleKey: 'gamification.rank31', tier: 'diamond',     icon: 'diamond' },
    { level: 32, titleKey: 'gamification.rank32', tier: 'diamond',     icon: 'winged-sword' },
    { level: 33, titleKey: 'gamification.rank33', tier: 'diamond',     icon: 'crystal-ball' },
    { level: 34, titleKey: 'gamification.rank34', tier: 'diamond',     icon: 'egyptian-bird' },
    { level: 35, titleKey: 'gamification.rank35', tier: 'diamond',     icon: 'laurels-trophy' },

    // Tier 8: Master (Levels 36 - 40)
    { level: 36, titleKey: 'gamification.rank36', tier: 'master',      icon: 'spell-book' },
    { level: 37, titleKey: 'gamification.rank37', tier: 'master',      icon: 'hourglass' },
    { level: 38, titleKey: 'gamification.rank38', tier: 'master',      icon: 'sunbeams' },
    { level: 39, titleKey: 'gamification.rank39', tier: 'master',      icon: 'torch' },
    { level: 40, titleKey: 'gamification.rank40', tier: 'master',      icon: 'ribbon-shield' },

    // Tier 9: Grandmaster (Levels 41 - 45)
    { level: 41, titleKey: 'gamification.rank41', tier: 'grandmaster', icon: 'laurel-crown' },
    { level: 42, titleKey: 'gamification.rank42', tier: 'grandmaster', icon: 'trophy' },
    { level: 43, titleKey: 'gamification.rank43', tier: 'grandmaster', icon: 'medal' },
    { level: 44, titleKey: 'gamification.rank44', tier: 'grandmaster', icon: 'ice-shield' },
    { level: 45, titleKey: 'gamification.rank45', tier: 'grandmaster', icon: 'templar-shield' },

    // Tier 10: Mythic (Levels 46 - 50)
    { level: 46, titleKey: 'gamification.rank46', tier: 'mythic',      icon: 'star-filled' },
    { level: 47, titleKey: 'gamification.rank47', tier: 'mythic',      icon: 'crown' },
    { level: 48, titleKey: 'gamification.rank48', tier: 'mythic',      icon: 'imperial-crown' },
    { level: 49, titleKey: 'gamification.rank49', tier: 'mythic',      icon: 'treasure-chest' },
    { level: 50, titleKey: 'gamification.rank50', tier: 'mythic',      icon: 'imperial-crown' },
];

@Injectable({
    providedIn: 'root'
})
export class GamificationService {
    static getLevelConfig(level: number): LevelConfig {
        const clamped = Math.min(Math.max(1, Math.floor(level || 1)), 50);
        return LEVEL_CONFIGS[clamped - 1];
    }

    static getLevelIcon(level: number): IconName {
        return GamificationService.getLevelConfig(level).icon;
    }

    static getLevelTier(level: number): LevelTier {
        return GamificationService.getLevelConfig(level).tier;
    }
    private repo = inject(OfflineGamificationRepository);
    private vocabRepo = inject(OfflineVocabularyRepository);
    private historyRepo = inject(OfflineHistoryRepository);
    private streakRepo = inject(OfflineStreakRepository);
    private toast = inject(ToastService);
    private i18n = inject(I18nService);
    private auth = inject(AuthService);

    // Persistent State managed by OfflineGamificationRepository
    readonly rawState = this.repo.state;

    // Reactive signals
    readonly totalXP = computed(() => this.rawState().xp);
    readonly weeklyXP = computed(() => this.rawState().weeklyXp || 0);

    // Daily missions & quests
    readonly dailyMissions = computed(() => this.rawState().dailyMissions?.missions || []);
    readonly dailyBonusClaimed = computed(() => this.rawState().dailyMissions?.allCompletedBonusClaimed || false);
    readonly completedMissionsCount = computed(() => this.dailyMissions().filter(m => m.completed).length);
    readonly totalMissionsCount = computed(() => this.dailyMissions().length);
    readonly canClaimDailyBonus = computed(() =>
        this.completedMissionsCount() === this.totalMissionsCount() &&
        this.totalMissionsCount() > 0 &&
        !this.dailyBonusClaimed()
    );

    readonly hasClaimableRewards = computed(() => {
        const missions = this.dailyMissions();
        const hasUnclaimed = missions.some(m => m.completed && !m.claimed);
        return hasUnclaimed || this.canClaimDailyBonus();
    });

    readonly claimableCount = computed(() => {
        const missions = this.dailyMissions();
        const unclaimed = missions.filter(m => m.completed && !m.claimed).length;
        return unclaimed + (this.canClaimDailyBonus() ? 1 : 0);
    });

    /**
     * Level calculation: Level = floor(sqrt(XP / 75)) + 1, capped at 50
     */
    readonly userLevel = computed(() => {
        const xp = this.totalXP();
        return calculateLevelFromXp(xp);
    });

    readonly userLevelIcon = computed<IconName>(() => GamificationService.getLevelIcon(this.userLevel()));
    readonly userLevelTier = computed<LevelTier>(() => GamificationService.getLevelTier(this.userLevel()));
    readonly userLevelConfig = computed<LevelConfig>(() => GamificationService.getLevelConfig(this.userLevel()));
    readonly nextLevelIcon = computed<IconName>(() => GamificationService.getLevelIcon(this.userLevel() + 1));
    readonly nextLevelTier = computed<LevelTier>(() => GamificationService.getLevelTier(this.userLevel() + 1));

    /**
     * Progress towards next level (0 to 100%)
     */
    readonly nextLevelProgress = computed(() => {
        const lvl = this.userLevel();
        if (lvl >= 50) return 100;
        const currentLevelXpBase = Math.pow(lvl - 1, 2) * 75;
        const nextLevelXpBase = Math.pow(lvl, 2) * 75;
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
            else if (def.id.startsWith('vocab_master_')) current = mastered;
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
        // Reactive effect: Automatically check milestones and award rewards whenever stats update
        effect(() => {
            this.evaluateMilestones();
        });

        // Check if there was any rollover XP harvested from yesterday
        const rollover = this.repo.pendingRolloverXp();
        if (rollover > 0) {
            setTimeout(() => {
                const msg = `🎁 ${this.i18n.t('missions.autoClaimed') || "Yesterday's unclaimed rewards were auto-collected"}: +${rollover} XP!`;
                this.toast.show(msg, { type: 'success', icon: 'treasure-chest', duration: 4500 });
                this.repo.pendingRolloverXp.set(0);
            }, 800);
        }
    }

    /**
     * Award XP to the user and persist
     */
    addXP(amount: number, _reason?: string): void {
        if (amount <= 0) return;

        const prevLevel = this.userLevel();
        this.repo.addXP(amount);
        const newLevel = this.userLevel();

        // Level-up celebration
        if (newLevel > prevLevel) {
            const levelUpMsg = `${this.i18n.t('gamification.levelUp') || 'Level Up!'} 🎉 ${this.i18n.t('gamification.reachedLevel') || 'You reached Level'} ${newLevel}!`;
            this.toast.show(levelUpMsg, { type: 'success', icon: GamificationService.getLevelIcon(newLevel), duration: 4500 });
        }
    }

    /**
     * Deduct XP from the user (e.g. for restoring a streak freeze)
     */
    deductXP(amount: number): boolean {
        return this.repo.deductXP(amount);
    }

    /**
     * Record video completion (>= 80% watched)
     */
    recordVideoCompleted(): void {
        const completed = this.repo.recordVideoCompleted();
        this.notifyCompletedMissions(completed);
    }

    /**
     * Record subtitle quiz completion
     */
    recordQuizCompleted(): void {
        const completed = this.repo.recordQuizCompleted();
        this.notifyCompletedMissions(completed);
    }

    /**
     * Record word saved to notebook
     */
    recordWordSaved(): void {
        const completed = this.repo.trackMissionProgress('save_word', 1);
        this.notifyCompletedMissions(completed);
    }

    /**
     * Record flashcard SRS review
     */
    recordSRSReview(): void {
        const completed = this.repo.trackMissionProgress('srs_review', 1);
        this.notifyCompletedMissions(completed);
    }

    /**
     * Record dictionary word lookup
     */
    recordDictLookup(): void {
        const completed = this.repo.trackMissionProgress('look_up_dict', 1);
        this.notifyCompletedMissions(completed);
    }

    private notifyCompletedMissions(missions: Mission[]): void {
        if (!missions || missions.length === 0) return;
        for (const m of missions) {
            const title = this.i18n.t(m.titleKey) || m.id;
            const msg = `🎯 ${this.i18n.t('missions.missionCompleted') || 'Daily Mission Complete!'}: ${title} (+${m.xpReward} XP)`;
            this.toast.show(msg, { type: 'success', icon: 'scroll-unfurled', duration: 4000 });
        }
    }

    /**
     * Claim reward for an individual completed mission
     */
    claimMission(missionId: string): void {
        const xp = this.repo.claimMissionReward(missionId);
        if (xp > 0) {
            const msg = `🎯 ${this.i18n.t('missions.claimedReward') || 'Mission Reward Claimed'}: +${xp} XP!`;
            this.toast.show(msg, { type: 'success', icon: 'zap', duration: 3500 });
        }
    }

    /**
     * Claim daily bonus chest reward
     */
    claimDailyBonus(): void {
        const bonus = this.repo.claimDailyBonus();
        if (bonus > 0) {
            const msg = `🎁 ${this.i18n.t('missions.dailyChestClaimed') || 'Daily Chest Claimed'}: +${bonus} XP!`;
            this.toast.show(msg, { type: 'success', icon: 'treasure-chest', duration: 4500 });
        }
    }

    /**
     * Check achievement conditions and celebrate newly unlocked badges
     */
    private evaluateMilestones(): void {
        const list = this.achievements();

        untracked(() => {
            const state = this.rawState();
            const newUnlocked: Record<string, string> = {};
            const newlyNotified: string[] = [];
            let xpGained = 0;

            for (const ach of list) {
                if (ach.unlocked && !state.unlockedAchievements[ach.id]) {
                    newUnlocked[ach.id] = ach.unlockedAt || new Date().toISOString();
                    xpGained += ach.xpReward;
                }

                // Toast newly unlocked if not notified yet
                if (ach.unlocked && !state.notifiedAchievements.includes(ach.id) && !newlyNotified.includes(ach.id)) {
                    newlyNotified.push(ach.id);
                    const title = this.i18n.t(ach.titleKey) || ach.id;
                    const toastMsg = `🏆 ${this.i18n.t('gamification.badgeUnlocked') || 'Achievement Unlocked'}: ${title} (+${ach.xpReward} XP)`;
                    this.toast.show(toastMsg, { type: 'success', icon: 'laurel-crown', duration: 4000 });
                }
            }

            if (Object.keys(newUnlocked).length > 0 || xpGained > 0 || newlyNotified.length > 0) {
                this.repo.unlockAndNotifyAchievements(newUnlocked, xpGained, newlyNotified);
            }
        });
    }
}
