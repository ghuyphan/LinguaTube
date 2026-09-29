import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
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

  // UI States managed locally or passed down
  isVolumeSliderVisible = input<boolean>(false);

  // Feature states
  isFullscreen = input<boolean>(false);
  subtitlesVisible = input<boolean>(true);
  currentSpeed = input<number>(1);
  showDualSubtitles = input<boolean>(false);
  isCJKLanguage = input<boolean>(false);
  isAISubtitle = input<boolean>(false);

  // Translation function
  t = input<(key: string) => string>((k) => k);

  // Outputs for Left Controls
  playPauseClicked = output<MouseEvent>();
  toggleMute = output<void>();
  volumeChange = output<number>();
  showVolumeSlider = output<void>();
  hideVolumeSlider = output<void>();

  // Outputs for Right Controls
  toggleSubtitles = output<void>();
  toggleDualSubs = output<void>();
  openDualSubMenu = output<MouseEvent>();
  openSettings = output<MouseEvent>();
  toggleMiniplayer = output<void>();
  toggleFullscreen = output<void>();

  readonly volumeIcon = computed<IconName>(() => getVolumeIcon(this.volume(), this.isMuted()));

  onVolumeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Math.max(0, Math.min(100, Math.round(Number(input.value))));
    this.volumeChange.emit(value);
  }

  onDualSubContextMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.openDualSubMenu.emit(event);
  }
}
