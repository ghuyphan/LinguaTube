import {
    Component,
    inject,
    signal,
    computed,
    output,
    ElementRef,
    viewChild,
    ChangeDetectionStrategy,
    OnDestroy,
    NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeService } from '../../../youtube.service';
import { BUFFERED_TRACKING_INTERVAL } from '../../video-player.constants';
import { formatTime } from '../../../../../core/utils';
import { I18nService } from '../../../../../core/services';

/**
 * Seek preview state for the tooltip
 */
export interface SeekPreview {
    visible: boolean;
    time: number;
    position: number;
}

/**
 * ProgressBarComponent
 * 
 * Encapsulates the video progress bar UI and seeking behavior:
 * - Progress fill and buffered indicator
 * - Seek preview tooltip on hover
 * - Drag-to-seek functionality
 * - Touch support for mobile
 */
@Component({
    selector: 'app-progress-bar',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="progress-container" 
         role="slider"
         [attr.aria-valuenow]="displayTime()"
         [attr.aria-valuemin]="0"
         [attr.aria-valuemax]="youtube.duration()"
         [attr.aria-valuetext]="formatTime(displayTime()) + ' of ' + formatTime(youtube.duration())"
         [attr.aria-label]="i18n.t('player.progress') || 'Video progress'"
         tabindex="0"
         (keydown)="onKeyDown($event)"
         [class.seeking]="isDragging()"
         [style.--progress]="progressPercentage()"
         [style.--buffered]="bufferedPercentage()"
         [style.--seek-pos]="seekPreview().position + 'px'"
         #progressBar>
      
      <!-- Hit area for better touch/click target -->
      <div class="progress-hit-area"
           (pointerdown)="startSeeking($event)"
           (pointermove)="updateSeekPreview($event)"
           (pointerleave)="hideSeekPreview()"></div>
      
      <!-- Buffered indicator -->
      <div class="progress-buffered" aria-hidden="true"></div>
      
      <!-- Progress fill -->
      <div class="progress-fill" aria-hidden="true"></div>
      
      <!-- Draggable handle -->
      <div class="progress-handle" aria-hidden="true"></div>
      
      <!-- Seek preview tooltip -->
      @if (seekPreview().visible) {
        <div class="seek-tooltip" aria-hidden="true">
          {{ formatTime(seekPreview().time) }}
        </div>
      }
    </div>
  `,

    styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent implements OnDestroy {
    private ngZone = inject(NgZone);
    readonly youtube = inject(YoutubeService);
    readonly i18n = inject(I18nService);

    readonly progressBar = viewChild.required<ElementRef<HTMLDivElement>>('progressBar');

    // ========================================
    // STATE
    // ========================================

    /** Whether user is currently dragging the progress bar */
    readonly isDragging = signal(false);

    /** Preview time while dragging */
    readonly previewTime = signal(0);

    /** Seek preview tooltip state */
    readonly seekPreview = signal<SeekPreview>({ visible: false, time: 0, position: 0 });

    /** Buffered percentage (0-100) */
    readonly bufferedPercentage = signal(0);

    // ========================================
    // OUTPUTS
    // ========================================

    /** Emitted when seeking starts */
    seekStarted = output<void>();

    /** Emitted when seeking ends with the final time */
    seekEnded = output<number>();

    // ========================================
    // COMPUTED
    // ========================================

    /** Display time (preview while dragging, current time otherwise) */
    displayTime = computed(() => {
        return this.isDragging() ? this.previewTime() : this.youtube.currentTime();
    });

    /** Progress percentage (0-100) */
    progressPercentage = computed(() => {
        const time = this.displayTime();
        const duration = this.youtube.duration();
        if (!duration) return 0;
        return (time / duration) * 100;
    });

    // ========================================
    // PRIVATE STATE
    // ========================================

    private bufferedInterval: ReturnType<typeof setInterval> | null = null;
    private seekRafId: number | null = null;
    private cachedRect: DOMRect | null = null;
    private capturedTarget: HTMLElement | null = null;

    // Bound event handlers for document-level listeners
    private readonly boundOnSeekMove = this.onSeekMove.bind(this);
    private readonly boundOnSeekUp = this.onSeekUp.bind(this);

    // ========================================
    // PUBLIC METHODS
    // ========================================

    /**
     * Handle keyboard navigation on the slider (Arrow keys, Home, End)
     */
    onKeyDown(event: KeyboardEvent): void {
        const duration = this.youtube.duration();
        if (!duration) return;

        const current = this.youtube.currentTime();
        const step = 5;

        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowDown': {
                event.preventDefault();
                const newTime = Math.max(0, current - step);
                this.youtube.seekTo(newTime);
                this.seekEnded.emit(newTime);
                break;
            }
            case 'ArrowRight':
            case 'ArrowUp': {
                event.preventDefault();
                const newTime = Math.min(duration, current + step);
                this.youtube.seekTo(newTime);
                this.seekEnded.emit(newTime);
                break;
            }
            case 'Home': {
                event.preventDefault();
                this.youtube.seekTo(0);
                this.seekEnded.emit(0);
                break;
            }
            case 'End': {
                event.preventDefault();
                this.youtube.seekTo(duration);
                this.seekEnded.emit(duration);
                break;
            }
        }
    }

    /**
     * Update seek preview on hover (before drag starts)
     */
    updateSeekPreview(event: MouseEvent): void {
        if (this.isDragging()) return;

        const progressBar = this.progressBar().nativeElement;
        if (!progressBar || !this.youtube.duration()) return;

        const rect = progressBar.getBoundingClientRect();
        const offsetX = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
        const percentage = offsetX / rect.width;
        const time = percentage * this.youtube.duration();

        this.seekPreview.set({
            visible: true,
            time,
            position: offsetX
        });
    }

    /**
     * Hide seek preview tooltip
     */
    hideSeekPreview(): void {
        if (!this.isDragging()) {
            this.seekPreview.update(prev => ({ ...prev, visible: false }));
        }
    }

    /**
     * Start seeking (pointerdown)
     */
    startSeeking(event: PointerEvent): void {
        if (event.button !== 0 && event.pointerType === 'mouse') return;
        if (!this.youtube.duration()) return;

        event.preventDefault();
        const target = event.currentTarget as HTMLElement;
        try {
            target.setPointerCapture(event.pointerId);
            this.capturedTarget = target;
        } catch {}

        const progressBar = this.progressBar().nativeElement;
        this.cachedRect = progressBar ? progressBar.getBoundingClientRect() : null;

        this.ngZone.run(() => {
            this.isDragging.set(true);
            this.calculateSeekTime(event);
            this.seekStarted.emit();

            window.addEventListener('pointermove', this.boundOnSeekMove);
            window.addEventListener('pointerup', this.boundOnSeekUp);
            window.addEventListener('pointercancel', this.boundOnSeekUp);
        });
    }

    /**
     * Start buffered tracking interval
     */
    startBufferedTracking(): void {
        if (this.bufferedInterval) return;

        this.bufferedInterval = setInterval(() => {
            const loadedFraction = this.getLoadedFraction();
            this.bufferedPercentage.set(loadedFraction * 100);
        }, BUFFERED_TRACKING_INTERVAL);
    }

    /**
     * Stop buffered tracking interval
     */
    stopBufferedTracking(): void {
        if (this.bufferedInterval) {
            clearInterval(this.bufferedInterval);
            this.bufferedInterval = null;
        }
    }

    /**
     * Format time in M:SS or H:MM:SS
     */
    formatTime(seconds: number): string {
        return formatTime(seconds);
    }

    // ========================================
    // PRIVATE METHODS
    // ========================================

    private calculateSeekTime(event: PointerEvent | MouseEvent): void {
        const rect = this.cachedRect || this.progressBar()?.nativeElement?.getBoundingClientRect();
        if (!rect || !this.youtube.duration()) return;

        const offsetX = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
        const percentage = offsetX / rect.width;
        const time = percentage * this.youtube.duration();

        this.previewTime.set(time);
        this.seekPreview.set({
            visible: true,
            time,
            position: offsetX
        });
    }

    private onSeekMove(event: PointerEvent): void {
        event.preventDefault();
        const clientX = event.clientX;

        if (this.seekRafId !== null) {
            cancelAnimationFrame(this.seekRafId);
        }

        this.seekRafId = requestAnimationFrame(() => {
            this.seekRafId = null;
            this.ngZone.run(() => {
                const rect = this.cachedRect || this.progressBar()?.nativeElement?.getBoundingClientRect();
                if (!rect || !this.youtube.duration()) return;

                const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
                const percentage = offsetX / rect.width;
                const time = percentage * this.youtube.duration();

                this.previewTime.set(time);
                this.seekPreview.set({
                    visible: true,
                    time,
                    position: offsetX
                });
            });
        });
    }

    private onSeekUp(event?: PointerEvent): void {
        if (this.seekRafId !== null) {
            cancelAnimationFrame(this.seekRafId);
            this.seekRafId = null;
        }

        if (event && this.capturedTarget) {
            try {
                this.capturedTarget.releasePointerCapture(event.pointerId);
            } catch {}
        }
        this.capturedTarget = null;
        this.cachedRect = null;

        this.ngZone.run(() => {
            this.isDragging.set(false);
            this.seekPreview.update(prev => ({ ...prev, visible: false }));

            const time = this.previewTime();
            this.youtube.seekTo(time);
            this.seekEnded.emit(time);

            window.removeEventListener('pointermove', this.boundOnSeekMove);
            window.removeEventListener('pointerup', this.boundOnSeekUp);
            window.removeEventListener('pointercancel', this.boundOnSeekUp);
        });
    }

    private getLoadedFraction(): number {
        const duration = this.youtube.duration();
        if (!duration) return 0;
        return this.youtube.getVideoLoadedFraction();
    }

    // ========================================
    // LIFECYCLE
    // ========================================

    ngOnDestroy(): void {
        if (this.seekRafId !== null) {
            cancelAnimationFrame(this.seekRafId);
            this.seekRafId = null;
        }
        this.stopBufferedTracking();
        window.removeEventListener('pointermove', this.boundOnSeekMove);
        window.removeEventListener('pointerup', this.boundOnSeekUp);
        window.removeEventListener('pointercancel', this.boundOnSeekUp);
    }
}
