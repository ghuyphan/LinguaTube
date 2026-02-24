import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../../../../../shared/components/icon/icon.component';
import { PlaybackSpeed } from '../../video-player.constants';
import { OptionItem } from '../../../../../shared/components/option-picker/option-picker.component';

@Component({
  selector: 'app-video-bottom-bar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './video-bottom-bar.component.html',
  styleUrl: './video-bottom-bar.component.scss'
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
  currentSpeed = input<PlaybackSpeed>(1);
  playbackSpeeds = input<PlaybackSpeed[]>([]);
  showDualSubtitles = input<boolean>(false);
  targetLang = input<string>('');
  langOptions = input<OptionItem[]>([]);
  fontSizeLabel = input<string>('Standard');
  isCJKLanguage = input<boolean>(false);

  // UI States managed locally or passed down
  isSpeedMenuOpen = input<boolean>(false);
  langPickerOpen = input<boolean>(false);
  isVolumeSliderVisible = input<boolean>(false);

  // Translation function
  t = input<(key: string) => string>((k) => k);

  // Outputs for Left Controls
  playPauseClicked = output<MouseEvent>();
  seekRelative = output<{ amount: number, direction: 'left' | 'right' }>();
  toggleMute = output<void>();
  volumeChange = output<Event>();

  // Outputs for Right Controls
  toggleSpeedMenu = output<MouseEvent>();
  setPlaybackSpeed = output<PlaybackSpeed>();
  cycleFontSize = output<void>();
  toggleLangMenu = output<MouseEvent>();
  disableDualSubtitles = output<void>();
  langSelected = output<string>();
  saveClick = output<void>();
  toggleFullscreen = output<void>();

  // Mouse event outputs for volume slider
  showVolumeSlider = output<void>();
  hideVolumeSlider = output<void>();

  clickMenuOption(event: Event) {
    event.stopPropagation();
  }

  getVolumeIcon(): IconName {
    if (this.isMuted() || this.volume() === 0) return 'volume-x';
    if (this.volume() < 50) return 'volume-1';
    return 'volume-2';
  }

  getSelectedLangFlag(): string {
    const current = this.langOptions().find(l => l.value === this.targetLang());
    return current?.iconUrl || '';
  }
}

