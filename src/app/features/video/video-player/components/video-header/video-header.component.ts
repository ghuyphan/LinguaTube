import { Component, input, output, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';
import { BottomSheetComponent } from '../../../../../shared/components/bottom-sheet/bottom-sheet.component';
import { VideoLevelDialogComponent } from '../../../../../components/video-level-dialog/video-level-dialog.component';
import { I18nService } from '../../../../../core/services/i18n.service';
import { VideoLevelService } from '../../../../../core/services/video-level.service';
import { TranscriptService } from '../../../transcript.service';

import { LearningLanguageService } from '../../../../../services/learning-language.service';
import { normalizeLanguageCode } from '../../../../../shared/utils/language.utils';

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
  learningLanguage = inject(LearningLanguageService);

  title = input<string | undefined>();
  channel = input<string | undefined>();

  readonly levelInfo = this.videoLevel.currentLevel;
  readonly isLevelLoading = computed(() => {
    if (this.levelInfo()) return false;
    return this.transcript.isLoading() || this.transcript.isGeneratingAI() || this.videoLevel.isAnalyzing();
  });
  readonly showLevelSheet = signal(false);
  readonly showTracksSheet = signal(false);
  readonly isAIGenerated = this.transcript.isAIGenerated;

  readonly availableTracks = computed(() => {
    const langs = this.transcript.availableLanguages();
    const activeLang = normalizeLanguageCode(this.transcript.detectedLanguage());
    const isAI = this.transcript.isAIGenerated();

    const nativeTracks = (langs.native || []).map(code => ({
      code,
      normalized: normalizeLanguageCode(code),
      label: this.getLanguageLabel(code),
      isAI: false,
      isActive: !isAI && normalizeLanguageCode(code) === activeLang
    }));

    const aiTracks = (langs.ai || []).map(code => ({
      code,
      normalized: normalizeLanguageCode(code),
      label: this.getLanguageLabel(code),
      isAI: true,
      isActive: isAI && normalizeLanguageCode(code) === activeLang
    }));

    return {
      native: nativeTracks,
      ai: aiTracks,
      hasAny: nativeTracks.length > 0 || aiTracks.length > 0
    };
  });

  readonly targetLanguageLabel = computed(() => {
    const lang = this.learningLanguage.currentLanguage();
    return this.getLanguageLabel(lang?.code || '');
  });

  readonly canGenerateTargetAI = computed(() => {
    const lang = this.learningLanguage.currentLanguage();
    const targetLang = normalizeLanguageCode(lang?.code || '');
    if (!targetLang) return false;
    const langs = this.transcript.availableLanguages();
    const hasNative = (langs.native || []).some(c => normalizeLanguageCode(c) === targetLang);
    const hasAI = (langs.ai || []).some(c => normalizeLanguageCode(c) === targetLang);
    return !hasNative && !hasAI;
  });

  closeVideo = output<void>();
  savePlaylist = output<void>();
  shareVideo = output<void>();
  selectTrack = output<string>();
  triggerAI = output<void>();

  openLevelSheet(event?: Event): void {
    event?.stopPropagation();
    this.showLevelSheet.set(true);
  }

  openTracksSheet(event?: Event): void {
    event?.stopPropagation();
    this.showTracksSheet.set(true);
  }

  onSelectTrack(code: string): void {
    this.showTracksSheet.set(false);
    this.selectTrack.emit(code);
  }

  onGenerateAI(): void {
    this.showTracksSheet.set(false);
    this.triggerAI.emit();
  }

  getLanguageLabel(code: unknown): string {
    if (!code) return '';
    const codeStr = typeof code === 'string' ? code : (code as { code?: string })?.code || '';
    if (!codeStr || typeof codeStr !== 'string') return '';
    const norm = normalizeLanguageCode(codeStr);
    switch (norm) {
      case 'ja': return this.i18n.t('settings.japanese') || 'Japanese';
      case 'zh': return this.i18n.t('settings.chinese') || 'Chinese';
      case 'ko': return this.i18n.t('settings.korean') || 'Korean';
      case 'en': return this.i18n.t('settings.english') || 'English';
      case 'es': return 'Spanish';
      case 'fr': return 'French';
      case 'de': return 'German';
      case 'vi': return 'Vietnamese';
      case 'ru': return 'Russian';
      default: return codeStr.toUpperCase();
    }
  }
}
