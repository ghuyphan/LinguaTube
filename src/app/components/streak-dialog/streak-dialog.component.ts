import { Component, inject, computed, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { StreakService } from '../../services/streak.service';
import { I18nService } from '../../core/services';

@Component({
    selector: 'app-streak-dialog',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    templateUrl: './streak-dialog.component.html',
    styleUrls: ['./streak-dialog.component.scss']
})
export class StreakDialogComponent {
    streak = inject(StreakService);
    i18n = inject(I18nService);

    dismissed = output<void>();

    weekDays = computed(() => {
        const lang = this.i18n.currentLanguage();
        const today = new Date();
        const activity = this.streak.getWeekActivity(); // Array of last 7 days [Today, Yesterday, ...]

        // Calculate start of current week (Monday)
        // Day 0 is Sunday, 1 is Monday...
        const currentDay = today.getDay(); // 0-6
        const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust when Sunday
        const monday = new Date(today);
        monday.setDate(diff);

        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

        // Helper to check if a specific date was active
        const checkActivityForDate = (checkDate: Date): boolean => {
            const startOfCheck = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate()).getTime();
            if (startOfCheck > startOfToday) return false;

            const diffDays = Math.round((startOfToday - startOfCheck) / (1000 * 60 * 60 * 24));
            if (diffDays < 7 && diffDays >= 0) {
                return activity[diffDays];
            }
            return false;
        };

        const fallbackDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

        return Array.from({ length: 7 }, (_, index) => {
            const date = new Date(monday);
            date.setDate(monday.getDate() + index);

            const isToday = date.toDateString() === today.toDateString();
            const isActive = checkActivityForDate(date);
            const isFuture = date.getTime() > today.getTime();

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
}
