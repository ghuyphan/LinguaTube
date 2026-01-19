import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../../../../../shared/components/icon/icon.component';

/**
 * CenterControlsComponent
 * 
 * Unified play/pause and playlist navigation buttons for the video player.
 * Handles all states: playing, paused, buffering, ended.
 * Works for both mobile (touch) and desktop (hover) with CSS visibility.
 */
@Component({
  selector: 'app-center-controls',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="center-controls" [class.has-playlist]="hasPlaylist()">
      <!-- Volume Feedback -->
      @if (volumeFeedback()) {
        <div class="center-feedback volume-feedback animate">
          <app-icon [name]="volumeFeedbackIcon()" [size]="44" aria-hidden="true" />
        </div>
      }

      <!-- Gesture Seek Preview -->
      @if (gestureSeekActive()) {
        <div class="gesture-seek-preview">
          <span class="gesture-seek-time">{{ formattedSeekTime() }}</span>
          <span class="gesture-seek-delta">
            @if (seekDelta() > 0) {
              +{{ formattedSeekDelta() }}
            } @else {
              -{{ formattedSeekDeltaAbs() }}
            }
          </span>
        </div>
      }

      <!-- Main Button Group -->
      @if (isReady() && !isEnded()) {
        <div class="center-button-group">
          <!-- Previous Button (Playlist only) -->
          @if (hasPlaylist()) {
            <button 
              class="center-nav-btn" 
              [disabled]="!canPlayPrev()"
              (click)="onPrevClick($event)"
              (touchstart)="$event.stopPropagation()"
              aria-label="Previous video">
              <app-icon name="skip-back" [size]="24" aria-hidden="true" />
            </button>
          }

          <!-- Play/Pause Button (Unified & Optimistic) -->
          @if (areControlsVisible() || !isPlaying()) {
            <button class="big-play-btn fade-in" 
              [attr.aria-label]="isPlaying() ? 'Pause video' : 'Play video'"
              (touchstart)="$event.stopPropagation()"
              (touchend)="onPlayPauseTouch($event)"
              (click)="onPlayPauseClick($event)">
              
              <!-- Icon Container for Animation -->
              <div class="icon-wrapper">
                @if (isBuffering() && isPlaying()) {
                  <app-icon name="loader" [size]="44" class="spin pop" />
                } @else if (isPlaying()) {
                  <app-icon name="pause" [size]="44" class="pop" />
                } @else {
                  <app-icon name="play" [size]="44" class="pop" />
                }
              </div>
            </button>
          }

          <!-- Next Button (Playlist only) -->
          @if (hasPlaylist()) {
            <button 
              class="center-nav-btn" 
              [disabled]="!canPlayNext()"
              (click)="onNextClick($event)"
              (touchstart)="$event.stopPropagation()"
              aria-label="Next video">
              <app-icon name="skip-forward" [size]="24" aria-hidden="true" />
            </button>
          }
        </div>
      }

      <!-- Replay Button (Ended State) -->
      @if (isEnded()) {
        <div class="center-button-group">
          @if (hasPlaylist()) {
            <button 
              class="center-nav-btn" 
              [disabled]="!canPlayPrev()"
              (click)="onPrevClick($event)"
              (touchstart)="$event.stopPropagation()"
              aria-label="Previous video">
              <app-icon name="skip-back" [size]="24" aria-hidden="true" />
            </button>
          }

          <button class="big-play-btn replay-btn" aria-label="Replay video"
            (touchstart)="$event.stopPropagation()"
            (touchend)="onReplayTouch($event)"
            (click)="onReplayClick($event)">
            <app-icon name="rotate-ccw" [size]="44" aria-hidden="true" />
          </button>

          @if (hasPlaylist()) {
            <button 
              class="center-nav-btn" 
              [disabled]="!canPlayNext()"
              (click)="onNextClick($event)"
              (touchstart)="$event.stopPropagation()"
              aria-label="Next video">
              <app-icon name="skip-forward" [size]="24" aria-hidden="true" />
            </button>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './center-controls.component.scss'
})
export class CenterControlsComponent {
  // State inputs
  isReady = input.required<boolean>();
  isPlaying = input.required<boolean>();
  isBuffering = input.required<boolean>();
  isEnded = input.required<boolean>();
  areControlsVisible = input.required<boolean>();
  hasPlaylist = input.required<boolean>();
  canPlayPrev = input.required<boolean>();
  canPlayNext = input.required<boolean>();
  isDesktop = input<boolean>(false);

  // Feedback inputs
  volumeFeedback = input<boolean>(false);
  volumeFeedbackIcon = input<IconName>('volume-2');
  gestureSeekActive = input<boolean>(false);
  gestureSeekTime = input<number>(0);
  currentTime = input<number>(0);

  // Outputs
  playPauseClicked = output<MouseEvent>();
  playPauseTouched = output<TouchEvent>();
  replayClicked = output<MouseEvent>();
  replayTouched = output<TouchEvent>();
  prevClicked = output<void>();
  nextClicked = output<void>();

  // Computed values for seek preview
  seekDelta = computed(() => this.gestureSeekTime() - this.currentTime());

  formattedSeekTime = computed(() => this.formatTime(this.gestureSeekTime()));
  formattedSeekDelta = computed(() => this.formatTime(Math.abs(this.seekDelta())));
  formattedSeekDeltaAbs = computed(() => this.formatTime(Math.abs(this.seekDelta())));

  onPlayPauseClick(event: MouseEvent): void {
    event.stopPropagation();
    this.playPauseClicked.emit(event);
  }

  onPlayPauseTouch(event: TouchEvent): void {
    event.stopPropagation();
    this.playPauseTouched.emit(event);
  }

  onReplayClick(event: MouseEvent): void {
    event.stopPropagation();
    this.replayClicked.emit(event);
  }

  onReplayTouch(event: TouchEvent): void {
    event.stopPropagation();
    this.replayTouched.emit(event);
  }

  onPrevClick(event: MouseEvent): void {
    event.stopPropagation();
    this.prevClicked.emit();
  }

  onNextClick(event: MouseEvent): void {
    event.stopPropagation();
    this.nextClicked.emit();
  }

  private formatTime(seconds: number): string {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
