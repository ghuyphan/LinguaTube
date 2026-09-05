import {
    Component,
    inject,
    signal,
    computed,
    output,
    ElementRef,
    ViewChild,
    ChangeDetectionStrategy,
    OnDestroy,
    NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeService } from '../../../youtube.service';
import { BUFFERED_TRACKING_INTERVAL } from '../../video-player.constants';
import { formatTime } from '../../../../../core/utils';

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
         aria-label="Video progress"
         tabindex="0"
         [class.seeking]="isDragging()"
         [style.--progress]="progressPercentage()"
         [style.--buffered]="bufferedPercentage()"
         [style.--seek-pos]="seekPreview().position + 'px'"
         #progressBar>
      
      <!-- Hit area for better touch/click target -->
      <div class="progress-hit-area"
           (mousedown)="startSeeking($event)"
           (touchstart)="startSeeking($event)"
           (mousemove)="updateSeekPreview($event)"
           (mouseleave)="hideSeekPreview()"></div>
      
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
    youtube = inject(YoutubeService);

    @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;

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

    // Bound event handlers for document-level listeners
    private readonly boundOnSeekMove = this.onSeekMove.bind(this);
    private readonly boundOnSeekUp = this.onSeekUp.bind(this);

    // ========================================
    // PUBLIC METHODS
    // ========================================

    /**
     * Update seek preview on hover (before drag starts)
     */
    updateSeekPreview(event: MouseEvent): void {
        if (this.isDragging()) return;

        const progressBar = this.progressBar?.nativeElement;
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
     * Start seeking (mousedown/touchstart)
     */
    startSeeking(event: MouseEvent | TouchEvent): void {
        this.ngZone.run(() => {
            if (!this.youtube.duration()) return;
            event.preventDefault();

            this.isDragging.set(true);
            this.calculateSeekTime(event);
            this.seekStarted.emit();

            // Add document listeners for drag
            document.addEventListener('mousemove', this.boundOnSeekMove);
            document.addEventListener('mouseup', this.boundOnSeekUp);
            document.addEventListener('touchmove', this.boundOnSeekMove, { passive: false });
            document.addEventListener('touchend', this.boundOnSeekUp);
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

    private calculateSeekTime(event: MouseEvent | TouchEvent): void {
        const progressBar = this.progressBar?.nativeElement;
        if (!progressBar) return;

        const clientX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
        const rect = progressBar.getBoundingClientRect();
        const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const percentage = offsetX / rect.width;
        const time = percentage * this.youtube.duration();

        this.previewTime.set(time);
        this.seekPreview.set({
            visible: true,
            time,
            position: offsetX
        });
    }

    private onSeekMove(event: MouseEvent | TouchEvent): void {
        event.preventDefault();

        this.ngZone.run(() => {
            const progressBar = this.progressBar?.nativeElement;
            if (!progressBar) return;

            const clientX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
            const rect = progressBar.getBoundingClientRect();
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
    }

    private onSeekUp(): void {
        this.ngZone.run(() => {
            this.isDragging.set(false);
            this.seekPreview.update(prev => ({ ...prev, visible: false }));

            const time = this.previewTime();
            this.youtube.seekTo(time);
            this.seekEnded.emit(time);

            document.removeEventListener('mousemove', this.boundOnSeekMove);
            document.removeEventListener('mouseup', this.boundOnSeekUp);
            document.removeEventListener('touchmove', this.boundOnSeekMove);
            document.removeEventListener('touchend', this.boundOnSeekUp);
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
        this.stopBufferedTracking();
        document.removeEventListener('mousemove', this.boundOnSeekMove);
        document.removeEventListener('mouseup', this.boundOnSeekUp);
        document.removeEventListener('touchmove', this.boundOnSeekMove);
        document.removeEventListener('touchend', this.boundOnSeekUp);
    }
}
