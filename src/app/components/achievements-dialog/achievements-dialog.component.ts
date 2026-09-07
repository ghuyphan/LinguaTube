import { Component, inject, signal, computed, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { GamificationService } from '../../core/services/gamification.service';
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
    i18n = inject(I18nService);

    dismissed = output<void>();

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
        const lvl = this.userLevel();
        return this.i18n.t('gamification.rank' + lvl) || this.i18n.t('gamification.linguist') || 'Language Learner';
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
}
