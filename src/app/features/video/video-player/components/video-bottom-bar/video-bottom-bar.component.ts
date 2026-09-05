import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../../../../../shared/components/icon/icon.component';
import { getVolumeIcon } from '../../../../../core/utils';

@Component({
  selector: 'app-video-bottom-bar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './video-bottom-bar.component.html',
  styleUrl: './video-bottom-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoBottomBarComponent {
  // Playback state
  isPlaying = input<boolean>(false);
  currentTime = input<string>('0:00');
  duration = input<string>('0:00');

  // Volume state
  volume = input<number>(100);
  isMuted = input<boolean>(false);
  volumePercent = input<number>(100);

  // Feature states
  isFullscreen = input<boolean>(false);
  subtitlesVisible = input<boolean>(true);
  currentSpeed = input<number>(1);
  showDualSubtitles = input<boolean>(false);
  isCJKLanguage = input<boolean>(false);

  // UI States managed locally or passed down
  isVolumeSliderVisible = input<boolean>(false);

  // Translation function
  t = input<(key: string) => string>((k) => k);

  // Outputs for Left Controls
  playPauseClicked = output<MouseEvent>();
  toggleMute = output<void>();
  volumeChange = output<number>();

  // Outputs for Right Controls
  toggleSubtitles = output<void>();
  toggleDualSubs = output<void>();
  speedClick = output<MouseEvent>();
  openSettings = output<MouseEvent>();
  toggleFullscreen = output<void>();

  // Mouse event outputs for volume slider
  showVolumeSlider = output<void>();
  hideVolumeSlider = output<void>();

  getVolumeIcon(): IconName {
    return getVolumeIcon(this.volume(), this.isMuted());
  }

  onVolumeSliderMouseDown(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    const track = event.currentTarget as HTMLElement;
    const updateVolume = (e: MouseEvent) => {
      const rect = track.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const value = Math.round(fraction * 100);
      this.volumeChange.emit(value);
    };

    // Apply immediately on click
    updateVolume(event);

    const onMove = (e: MouseEvent) => updateVolume(e);
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }
}
