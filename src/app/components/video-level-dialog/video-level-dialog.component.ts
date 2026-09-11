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
    const rawCpm = this.levelInfo().speechRateCpm;
    if (!rawCpm) return null;

    const levelStr = this.levelInfo().level.toUpperCase();
    const isEnglish = levelStr.startsWith('CEFR') || /^[A-C][1-2]$/.test(levelStr);

    // If English was previously cached as raw character count (>300), convert characters to words (~5.2 chars/word)
    const displayValue = isEnglish && rawCpm > 300
      ? Math.round(rawCpm / 5.2)
      : rawCpm;

    const isSlow = isEnglish ? displayValue < 120 : displayValue < 180;
    const isFast = isEnglish ? displayValue > 175 : displayValue > 280;

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
      cpm: displayValue,
      unit,
      tag,
      paceClass
    };
  });
}
