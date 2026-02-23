import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
    selector: 'app-stats-row',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    template: `
    <div class="setting-row">
        <div class="setting-row__content">
            <div class="stats-group">
                <button class="stat-badge clickable-badge" [class.active-streak]="practicedToday()" (click)="onStreakClick($event)">
                    <app-icon name="fire" [size]="16" [style.color]="practicedToday() ? '#f59e0b' : 'var(--text-muted)'" />
                    <span [style.color]="practicedToday() ? '#f59e0b' : 'inherit'">{{ streak() }}</span>
                </button>
                <div class="stat-divider"></div>
                <button class="stat-badge clickable-badge" (click)="onDiamondsClick($event)">
                    <app-icon name="diamond" [size]="16" style="color: #60a5fa" />
                    <span>{{ diamonds() }}</span>
                </button>
            </div>
            <span class="setting-row__label">{{ label() }}</span>
        </div>
    </div>
  `,
    styles: [`
    .setting-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 3rem; /* Comparable to other rows */
        padding: var(--space-sm) var(--space-md);
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        width: 100%;
        color: inherit;
        text-align: left;
    }

    .setting-row__content {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        flex: 1;
        min-width: 0;
    }

    .setting-row__label {
        font-size: 0.9375rem;
        color: var(--text-primary);
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .setting-row__chevron {
        color: var(--text-muted);
    }

    .stats-group {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        background: var(--bg-secondary);
        padding: 0.25rem 0.5rem;
        border-radius: var(--border-radius-sm);
    }

    .stat-badge {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--text-secondary);
        background: transparent;
        border: none;
        padding: 0.25rem;
        border-radius: var(--border-radius-sm);
    }

    .clickable-badge {
        cursor: pointer;
        transition: background-color var(--transition-fast), transform var(--transition-fast);
    }

    .clickable-badge:hover {
        background: var(--bg-hover);
    }

    .clickable-badge:active {
        transform: scale(0.95);
    }

    .stat-badge.active-streak {
        color: #f59e0b;
    }

    .stat-divider {
        width: 1px;
        height: 12px;
        background: var(--border-color);
        margin: 0 2px;
    }
  `]
})
export class StatsRowComponent {
    streak = input<number>(0);
    practicedToday = input<boolean>(false);
    diamonds = input<number>(0);
    label = input<string>('Statistics');

    openStreak = output<void>();
    openAiCredits = output<void>();

    onStreakClick(event: Event) {
        event.stopPropagation();
        this.openStreak.emit();
    }

    onDiamondsClick(event: Event) {
        event.stopPropagation();
        this.openAiCredits.emit();
    }
}
