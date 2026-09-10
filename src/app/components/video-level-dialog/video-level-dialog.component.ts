import { Component, ChangeDetectionStrategy, inject, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { I18nService } from '../../core/services';
import { VideoLevelInfo } from '../../models/video-level.model';

@Component({
  selector: 'app-video-level-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  templateUrl: './video-level-dialog.component.html',
  styleUrls: ['./video-level-dialog.component.scss']
})
export class VideoLevelDialogComponent {
  readonly i18n = inject(I18nService);

  levelInfo = input.required<VideoLevelInfo>();
  dismissed = output<void>();

  readonly tierLabel = computed(() => {
    const tier = this.levelInfo().tier;
    return this.i18n.t('level.' + tier) || tier;
  });

  readonly isLinguistic = computed(() => {
    return this.levelInfo().detectedFrom === 'linguistics';
  });

  readonly sortedBreakdown = computed(() => {
    const breakdown = this.levelInfo().breakdown;
    if (!breakdown) return [];

    return Object.entries(breakdown)
      .map(([level, count]) => ({ level, count }))
      .filter(item => item.count > 0)
      .sort((a, b) => b.count - a.count);
  });

  readonly speechPaceInfo = computed(() => {
    const cpm = this.levelInfo().speechRateCpm;
    if (!cpm) return null;

    const levelStr = this.levelInfo().level.toUpperCase();
    const isEnglish = levelStr.startsWith('CEFR') || /^[A-C][1-2]$/.test(levelStr);
    const isSlow = isEnglish ? cpm < 120 : cpm < 180;
    const isFast = isEnglish ? cpm > 170 : cpm > 280;

    let tag = this.i18n.t('level.speechNormal') || 'Natural Pace';
    let paceClass = 'pace-normal';
    if (isSlow) {
      tag = this.i18n.t('level.speechSlow') || 'Clear & Measured';
      paceClass = 'pace-slow';
    } else if (isFast) {
      tag = this.i18n.t('level.speechFast') || 'Fast Native';
      paceClass = 'pace-fast';
    }

    const unit = isEnglish ? 'wpm' : 'cpm';
    return {
      cpm,
      unit,
      tag,
      paceClass
    };
  });
}
