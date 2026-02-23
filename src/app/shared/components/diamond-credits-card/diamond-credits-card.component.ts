import { Component, Input, computed, signal, effect, inject, OnDestroy } from '@angular/core';
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
    @Input() variant: 'card' | 'compact' | 'inline' | 'collapsed' = 'card';
    @Input() showLabel = true;

    private intervalId: number | null = null;
    readonly countdown = signal<string>('');
    readonly progress = signal<number>(0);
    private readonly REGEN_TIME_MS = 30 * 60 * 1000; // 30 minutes

    // Array for rendering diamond icons
    readonly diamondArray = computed(() =>
        Array.from({ length: this.maxDiamonds }, (_, i) => i)
    );

    readonly isDepleted = computed(() => this.diamonds === 0);
    readonly isFull = computed(() => this.diamonds === this.maxDiamonds);

    constructor() {
        // Start countdown timer
        effect(() => {
            this.updateCountdown();

            // Clear existing interval
            if (this.intervalId) {
                clearInterval(this.intervalId);
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
        }
    }

    private updateCountdown(): void {
        if (!this.nextRegenAt) {
            this.countdown.set('');
            return;
        }

        const now = Date.now();
        const remaining = this.nextRegenAt - now;

        if (remaining <= 0) {
            this.countdown.set('');
            return;
        }

        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);

        const m = minutes.toString().padStart(2, '0');
        const s = seconds.toString().padStart(2, '0');
        this.countdown.set(`+1 in ${m}:${s}`);

        const progressPercent = Math.max(0, Math.min(100, ((this.REGEN_TIME_MS - remaining) / this.REGEN_TIME_MS) * 100));
        this.progress.set(progressPercent);
    }
}
