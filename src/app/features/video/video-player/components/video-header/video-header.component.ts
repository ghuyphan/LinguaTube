import { Component, input, output, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';
import { BottomSheetComponent } from '../../../../../shared/components/bottom-sheet/bottom-sheet.component';
import { VideoLevelDialogComponent } from '../../../../../components/video-level-dialog/video-level-dialog.component';
import { I18nService } from '../../../../../core/services/i18n.service';
import { VideoLevelService } from '../../../../../core/services/video-level.service';
import { TranscriptService } from '../../../transcript.service';

@Component({
  selector: 'app-video-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, BottomSheetComponent, VideoLevelDialogComponent],
  templateUrl: './video-header.component.html',
  styleUrl: './video-header.component.scss'
})
export class VideoHeaderComponent {
  i18n = inject(I18nService);
  videoLevel = inject(VideoLevelService);
  transcript = inject(TranscriptService);

  title = input<string | undefined>();
  channel = input<string | undefined>();

  readonly levelInfo = this.videoLevel.currentLevel;
  readonly isLevelLoading = computed(() => {
    if (this.levelInfo()) return false;
    return this.transcript.isLoading() || this.transcript.isGeneratingAI() || this.videoLevel.isAnalyzing();
  });
  readonly showLevelSheet = signal(false);

  minimizeVideo = output<void>();
  savePlaylist = output<void>();
  shareVideo = output<void>();

  openLevelSheet(event?: Event): void {
    event?.stopPropagation();
    this.showLevelSheet.set(true);
  }
}
