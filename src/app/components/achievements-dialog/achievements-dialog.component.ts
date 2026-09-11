import { Component, inject, signal, computed, ChangeDetectionStrategy, output, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { GamificationService } from '../../core/services/gamification.service';
import { LeaderboardService } from '../../core/services/leaderboard.service';
import { I18nService } from '../../core/services/i18n.service';
import { AchievementCategory, Mission } from '../../models/gamification.model';

@Component({
    selector: 'app-achievements-dialog',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    templateUrl: './achievements-dialog.component.html',
    styleUrls: ['./achievements-dialog.component.scss']
})
export class AchievementsDialogComponent implements OnInit, OnDestroy {
    gamification = inject(GamificationService);
    leaderboard = inject(LeaderboardService);
    i18n = inject(I18nService);

    dismissed = output<void>();

    // View tab
    readonly currentTab = signal<'missions' | 'achievements' | 'leaderboard'>('missions');

    // Missions State
    readonly dailyMissions = this.gamification.dailyMissions;
    readonly dailyBonusClaimed = this.gamification.dailyBonusClaimed;
    readonly completedMissionsCount = this.gamification.completedMissionsCount;
    readonly totalMissionsCount = this.gamification.totalMissionsCount;
    readonly canClaimDailyBonus = this.gamification.canClaimDailyBonus;
    readonly countdownStr = signal<string>('');
    private timerInterval: ReturnType<typeof setInterval> | null = null;

    readonly activeCategory = signal<'all' | AchievementCategory>('all');

    readonly userLevel = this.gamification.userLevel;
    readonly totalXP = this.gamification.totalXP;
    readonly weeklyXP = this.gamification.weeklyXP;
    readonly progressToNext = this.gamification.nextLevelProgress;
    readonly unlockedCount = this.gamification.unlockedCount;
    readonly totalCount = this.gamification.totalAchievementsCount;

    readonly categories: { id: 'all' | AchievementCategory; labelKey: string }[] = [
        { id: 'all', labelKey: 'achievements.catAll' },
        { id: 'immersion', labelKey: 'achievements.catImmersion' },
        { id: 'vocabulary', labelKey: 'achievements.catVocab' },
        { id: 'streak', labelKey: 'achievements.catStreak' },
        { id: 'srs', labelKey: 'achievements.catSrs' },
        { id: 'quiz', labelKey: 'achievements.catQuiz' }
    ];

    readonly rankTitle = computed(() => {
        const lvl = Math.min(Math.max(1, this.userLevel()), 10);
        const key = 'gamification.rank' + lvl;
        const translated = this.i18n.t(key);
        return translated !== key ? translated : (this.i18n.t('gamification.linguist') || 'Language Learner');
    });

    readonly filteredAchievements = computed(() => {
        const cat = this.activeCategory();
        const all = this.gamification.achievements();
        if (cat === 'all') return all;
        return all.filter(a => a.category === cat);
    });

    ngOnInit(): void {
        this.updateCountdown();
        this.timerInterval = setInterval(() => this.updateCountdown(), 1000);
    }

    ngOnDestroy(): void {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    private updateCountdown(): void {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        const diffMs = Math.max(0, midnight.getTime() - now.getTime());
        const hours = Math.floor(diffMs / 3600000);
        const minutes = Math.floor((diffMs % 3600000) / 60000);
        const seconds = Math.floor((diffMs % 60000) / 1000);
        this.countdownStr.set(
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
    }

    setCategory(cat: 'all' | AchievementCategory): void {
        this.activeCategory.set(cat);
    }

    readonly categoryStats = computed(() => {
        const all = this.gamification.achievements();
        const map: Record<string, { count: number; total: number }> = {
            all: { count: all.filter(a => a.unlocked).length, total: all.length }
        };
        for (const cat of this.categories) {
            if (cat.id === 'all') continue;
            const catItems = all.filter(a => a.category === cat.id);
            map[cat.id] = {
                count: catItems.filter(a => a.unlocked).length,
                total: catItems.length
            };
        }
        return map;
    });

    categoryCount(cat: 'all' | AchievementCategory): number {
        return this.categoryStats()[cat]?.count ?? 0;
    }

    categoryTotal(cat: 'all' | AchievementCategory): number {
        return this.categoryStats()[cat]?.total ?? 0;
    }

    toIconName(icon: string | IconName): IconName {
        return (icon as IconName) || 'trophy';
    }

    claimMission(mission: Mission): void {
        if (mission.completed && !mission.claimed) {
            this.gamification.claimMission(mission.id);
        }
    }

    claimDailyBonus(): void {
        if (this.canClaimDailyBonus()) {
            this.gamification.claimDailyBonus();
        }
    }

    // Leaderboard State & Computeds
    readonly selectedPeriod = this.leaderboard.selectedPeriod;
    readonly top3 = computed(() => this.leaderboard.topLearners().slice(0, 3));
    readonly firstPlace = computed(() => this.top3()[0] || null);
    readonly secondPlace = computed(() => this.top3()[1] || null);
    readonly thirdPlace = computed(() => this.top3()[2] || null);
    readonly remainingLearners = computed(() => {
        const learners = this.leaderboard.topLearners();
        return learners.length >= 3 ? learners.slice(3) : learners;
    });

    readonly myRank = this.leaderboard.userRank;
    readonly isLeaderboardLoading = this.leaderboard.isLoading;
    readonly leaderboardLang = this.leaderboard.selectedLang;

    readonly langFilters = [
        { code: 'all', label: 'All' },
        { code: 'ja', label: 'JA 🇯🇵' },
        { code: 'ko', label: 'KO 🇰🇷' },
        { code: 'zh', label: 'ZH 🇨🇳' },
        { code: 'en', label: 'EN 🇬🇧' }
    ];

    setTab(tab: 'missions' | 'achievements' | 'leaderboard'): void {
        this.currentTab.set(tab);
        if (tab === 'leaderboard') {
            this.leaderboard.loadLeaderboard(this.leaderboardLang(), false, this.selectedPeriod());
        }
    }

    setLeaderboardPeriod(period: 'weekly' | 'all_time'): void {
        this.leaderboard.loadLeaderboard(this.leaderboardLang(), false, period);
    }

    setLeaderboardLang(code: string): void {
        this.leaderboard.loadLeaderboard(code, false, this.selectedPeriod());
    }

    async refreshLeaderboard(): Promise<void> {
        await this.leaderboard.syncMyScore(true);
        await this.leaderboard.loadLeaderboard(this.leaderboardLang(), true, this.selectedPeriod());
    }
}
