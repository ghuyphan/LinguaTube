import { Component, ChangeDetectionStrategy, inject, output, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { I18nService, AuthService } from '../../core/services';
import { TranscriptService } from '../../features/video/transcript.service';

@Component({
    selector: 'app-ai-credits-dialog',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    templateUrl: './ai-credits-dialog.component.html',
    styleUrls: ['./ai-credits-dialog.component.scss']
})
export class AiCreditsDialogComponent implements OnInit, OnDestroy {
    readonly i18n = inject(I18nService);
    readonly auth = inject(AuthService);
    readonly transcript = inject(TranscriptService);

    dismissed = output<void>();
    openProUpgrade = output<void>();

    readonly regenCountdown = signal<string>('');
    private timerId: ReturnType<typeof setInterval> | null = null;

    ngOnInit(): void {
        this.transcript.refreshDiamonds();
        this.startTimer();
    }

    ngOnDestroy(): void {
        this.stopTimer();
    }

    private startTimer(): void {
        this.updateCountdown();
        this.timerId = setInterval(() => this.updateCountdown(), 1000);
    }

    private stopTimer(): void {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    private updateCountdown(): void {
        const nextRegen = this.transcript.nextRegenAt();
        if (!nextRegen || this.transcript.diamonds() >= this.transcript.maxDiamonds()) {
            this.regenCountdown.set('');
            return;
        }

        const remaining = nextRegen - Date.now();
        if (remaining <= 0) {
            this.regenCountdown.set('');
            this.transcript.refreshDiamonds();
            return;
        }

        const minutes = Math.floor(remaining / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        const s = seconds.toString().padStart(2, '0');
        const m = minutes.toString().padStart(2, '0');
        this.regenCountdown.set(`${m}:${s}`);
    }
}
