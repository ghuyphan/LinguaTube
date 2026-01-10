import { Component, inject, computed, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { StreakService } from '../../services/streak.service';
import { I18nService } from '../../services';

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

    close = output<void>();

    weekDays = computed(() => {
        const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']; // Fixed Mon-Sun labels
        const today = new Date();
        const activity = this.streak.getWeekActivity(); // Array of last 7 days [Today, Yesterday, ...]

        // Calculate start of current week (Monday)
        // Day 0 is Sunday, 1 is Monday...
        const currentDay = today.getDay(); // 0-6
        const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust when Sunday
        const monday = new Date(today);
        monday.setDate(diff);

        // Helper to check if a specific date was active
        const checkActivityForDate = (checkDate: Date): boolean => {
            // Compare checkDate against the activity history logic
            // Since getWeekActivity returns [Today, Yesterday...], we can just check if checkDate matches any "true" day
            // But getWeekActivity is relative to Today.
            // Better to use a direct check if we can, or map the relative offset.

            const diffTime = Math.abs(today.getTime() - checkDate.getTime());
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            // Only can check up to 7 days back with current service method
            // If checkDate is in the future relative to today, it's false
            if (checkDate > today) return false;

            // If diffDays < 7, we can check activity array
            if (diffDays < 7 && checkDate <= today) {
                return activity[diffDays];
            }
            return false;
        };

        return days.map((dayLabel, index) => {
            const date = new Date(monday);
            date.setDate(monday.getDate() + index);

            const isToday = date.toDateString() === today.toDateString();
            const isActive = checkActivityForDate(date);

            return {
                day: dayLabel,
                active: isActive,
                isToday: isToday,
                isFuture: date > today
            };
        });
    });
}
