import { Component, Input, computed, signal, effect, inject, output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { I18nService } from '../../../services';

@Component({
    selector: 'app-diamond-credits-card',
    standalone: true,
    imports: [CommonModule, IconComponent],
    templateUrl: './diamond-credits-card.component.html',
    styleUrl: './diamond-credits-card.component.scss'
})
export class DiamondCreditsCardComponent implements OnDestroy {
    readonly i18n = inject(I18nService);

    @Input() diamonds = 3;
    @Input() maxDiamonds = 3;
    @Input() nextRegenAt: number | null = null;
    @Input() regenIntervalMs = 20 * 60 * 1000; // 20 minutes default
    @Input() variant: 'card' | 'compact' | 'inline' | 'collapsed' = 'card';
    @Input() showLabel = true;

    regenCompleted = output<void>();

    private intervalId: number | null = null;
    private hasEmittedRegen = false;
    readonly countdown = signal<string>('');
    readonly progress = signal<number>(0);

    // Array for rendering diamond icons
    readonly diamondArray = computed(() =>
        Array.from({ length: this.maxDiamonds }, (_, i) => i)
    );

    readonly isDepleted = computed(() => this.diamonds === 0);
    readonly isFull = computed(() => this.diamonds === this.maxDiamonds);

    constructor() {
        // Start countdown timer
        effect(() => {
            this.hasEmittedRegen = false;
            this.updateCountdown();

            // Clear existing interval
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }

            // Start new interval if we have a regen time
            if (this.nextRegenAt && this.diamonds < this.maxDiamonds) {
                this.intervalId = window.setInterval(() => {
                    this.updateCountdown();
                }, 1000);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    private updateCountdown(): void {
        if (!this.nextRegenAt) {
            this.countdown.set('');
            this.progress.set(0);
            return;
        }

        const now = Date.now();
        const remaining = this.nextRegenAt - now;

        if (remaining <= 0) {
            this.countdown.set('');
            this.progress.set(100);

            if (!this.hasEmittedRegen) {
                this.hasEmittedRegen = true;
                this.regenCompleted.emit();
            }

            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
            return;
        }

        const hours = Math.floor(remaining / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        const s = seconds.toString().padStart(2, '0');

        if (hours > 0) {
            const m = minutes.toString().padStart(2, '0');
            this.countdown.set(`+1 in ${hours}h ${m}m`);
        } else {
            const m = minutes.toString().padStart(2, '0');
            this.countdown.set(`+1 in ${m}:${s}`);
        }

        const interval = this.regenIntervalMs > 0 ? this.regenIntervalMs : 20 * 60 * 1000;
        const progressPercent = Math.max(0, Math.min(100, ((interval - remaining) / interval) * 100));
        this.progress.set(progressPercent);
    }
}
