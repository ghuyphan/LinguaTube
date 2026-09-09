import { Component, inject, signal, computed, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { GamificationService } from '../../core/services/gamification.service';
import { LeaderboardService } from '../../core/services/leaderboard.service';
import { I18nService } from '../../core/services/i18n.service';
import { AchievementCategory } from '../../models/gamification.model';

@Component({
    selector: 'app-achievements-dialog',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    templateUrl: './achievements-dialog.component.html',
    styleUrls: ['./achievements-dialog.component.scss']
})
export class AchievementsDialogComponent {
    gamification = inject(GamificationService);
    leaderboard = inject(LeaderboardService);
    i18n = inject(I18nService);

    dismissed = output<void>();

    // View tab
    readonly currentTab = signal<'achievements' | 'leaderboard'>('achievements');

    readonly activeCategory = signal<'all' | AchievementCategory>('all');

    readonly userLevel = this.gamification.userLevel;
    readonly totalXP = this.gamification.totalXP;
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

    setCategory(cat: 'all' | AchievementCategory): void {
        this.activeCategory.set(cat);
    }

    categoryCount(cat: 'all' | AchievementCategory): number {
        const all = this.gamification.achievements();
        if (cat === 'all') return all.filter(a => a.unlocked).length;
        return all.filter(a => a.category === cat && a.unlocked).length;
    }

    categoryTotal(cat: 'all' | AchievementCategory): number {
        const all = this.gamification.achievements();
        if (cat === 'all') return all.length;
        return all.filter(a => a.category === cat).length;
    }

    toIconName(icon: string | IconName): IconName {
        return (icon as IconName) || 'trophy';
    }

    // Leaderboard State & Computeds
    readonly top3 = computed(() => this.leaderboard.topLearners().slice(0, 3));
    readonly firstPlace = computed(() => this.top3()[0] || null);
    readonly secondPlace = computed(() => this.top3()[1] || null);
    readonly thirdPlace = computed(() => this.top3()[2] || null);
    readonly remainingLearners = computed(() => {
        const learners = this.leaderboard.topLearners();
        // If 3 or more learners, top 3 are on podium, rest in list.
        // If fewer than 3, display all of them in the list so rank 1 & 2 aren't hidden!
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

    setTab(tab: 'achievements' | 'leaderboard'): void {
        this.currentTab.set(tab);
        if (tab === 'leaderboard') {
            this.leaderboard.loadLeaderboard();
        }
    }

    setLeaderboardLang(code: string): void {
        this.leaderboard.loadLeaderboard(code);
    }

    async refreshLeaderboard(): Promise<void> {
        await this.leaderboard.syncMyScore(true);
        await this.leaderboard.loadLeaderboard();
    }
}
