import { Component, inject, computed, ChangeDetectionStrategy, output, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { StreakService } from '../../services/streak.service';
import { I18nService, ToastService } from '../../core/services';
import { GamificationService } from '../../core/services/gamification.service';

export interface WeekDayItem {
    day: string;
    active: boolean;
    isToday: boolean;
    isFuture: boolean;
}

@Component({
    selector: 'app-streak-dialog',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    templateUrl: './streak-dialog.component.html',
    styleUrls: ['./streak-dialog.component.scss']
})
export class StreakDialogComponent {
    readonly streak = inject(StreakService);
    readonly gamification = inject(GamificationService);
    readonly i18n = inject(I18nService);
    readonly toast = inject(ToastService);

    isOpen = input<boolean>(true);
    dismissed = output<void>();

    replenishFreeze(): void {
        const res = this.streak.replenishFreeze();
        if (res.success) {
            const msg = `❄️ ${this.i18n.t('streak.freezeRestored') || 'Streak Freeze restored!'}`;
            this.toast.show(msg, { type: 'success', icon: 'snowflake', duration: 3500 });
        } else if (res.reason === 'insufficient_xp') {
            const msg = `⚠️ ${this.i18n.t('streak.insufficientXp') || 'Need 150 XP to replenish freeze'}`;
            this.toast.show(msg, { type: 'warning', icon: 'zap', duration: 3500 });
        }
    }

    constructor() {
        // When modal is opened, trigger a background sync to refresh streak data
        effect(() => {
            if (this.isOpen()) {
                this.streak.syncWithRemote();
            }
        });
    }

    readonly weekDays = computed<WeekDayItem[]>(() => {
        // Establish reactive signal dependencies
        void this.isOpen();
        const lang = this.i18n.currentLanguage();
        const streakData = this.streak.streakData();
        const historyList = this.streak.activityHistory();
        const historySet = new Set(historyList);

        const now = new Date();
        const todayYear = now.getFullYear();
        const todayMonth = now.getMonth();
        const todayDate = now.getDate();
        const today = new Date(todayYear, todayMonth, todayDate);
        const todayTime = today.getTime();

        // Calculate Monday of the current week
        // getDay(): 0 is Sunday, 1 is Monday, ..., 6 is Saturday
        const dayOfWeek = today.getDay();
        const daysSinceMonday = (dayOfWeek + 6) % 7; // Monday = 0, ..., Sunday = 6
        const mondayDate = todayDate - daysSinceMonday;

        const fallbackDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

        return Array.from({ length: 7 }, (_, index) => {
            const date = new Date(todayYear, todayMonth, mondayDate + index);
            const dateTime = date.getTime();
            const isToday = dateTime === todayTime;
            const isFuture = dateTime > todayTime;

            const localKey = this.toLocalDateKey(date);
            const utcKey = this.toUtcDateKey(date);

            const lastActivityMatch = streakData.lastActivity
                ? this.toLocalDateKey(new Date(streakData.lastActivity)) === localKey
                : false;

            const isActive = isFuture
                ? false
                : (isToday && streakData.practicedToday) ||
                  historySet.has(localKey) ||
                  historySet.has(utcKey) ||
                  lastActivityMatch;

            let dayLabel = '';
            try {
                dayLabel = date.toLocaleDateString(lang, { weekday: 'narrow' });
            } catch {
                dayLabel = fallbackDays[index];
            }

            return {
                day: dayLabel || fallbackDays[index],
                active: isActive,
                isToday: isToday,
                isFuture: isFuture
            };
        });
    });

    private toLocalDateKey(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private toUtcDateKey(date: Date): string {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}
