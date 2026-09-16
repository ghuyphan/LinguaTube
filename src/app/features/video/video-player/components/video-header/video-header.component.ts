import { Component, input, output, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../../../shared/components/icon/icon.component';
import { BottomSheetComponent } from '../../../../../shared/components/bottom-sheet/bottom-sheet.component';
import { OptionPickerComponent, OptionItem } from '../../../../../shared/components/option-picker/option-picker.component';
import { VideoLevelDialogComponent } from '../../../../../components/video-level-dialog/video-level-dialog.component';
import { I18nService } from '../../../../../core/services/i18n.service';
import { VideoLevelService } from '../../../../../core/services/video-level.service';
import { TranscriptService } from '../../../transcript.service';
import { SubtitleService } from '../../../subtitle.service';
import { LearningLanguageService } from '../../../../../services/learning-language.service';
import { normalizeLanguageCode } from '../../../../../shared/utils/language.utils';
import { getLanguageFlagUrl } from '../../../../../models';

const SUPPORTED_LANGUAGES = ['ja', 'zh', 'ko', 'en'];

@Component({
  selector: 'app-video-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, BottomSheetComponent, VideoLevelDialogComponent, OptionPickerComponent],
  templateUrl: './video-header.component.html',
  styleUrl: './video-header.component.scss'
})
export class VideoHeaderComponent {
  i18n = inject(I18nService);
  videoLevel = inject(VideoLevelService);
  transcript = inject(TranscriptService);
  subtitlesService = inject(SubtitleService);
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

  readonly targetLanguageLabel = computed(() => {
    const lang = this.learningLanguage.currentLanguage();
    return this.getLanguageLabel(lang?.code || '');
  });

  readonly canGenerateTargetAI = computed(() => {
    const lang = this.learningLanguage.currentLanguage();
    const targetLang = normalizeLanguageCode(lang?.code || '');
    if (!targetLang || !SUPPORTED_LANGUAGES.includes(targetLang)) return false;
    const langs = this.transcript.availableLanguages();
    const hasAI = (langs.ai || []).some(c => normalizeLanguageCode(c) === targetLang);
    return !hasAI;
  });

  readonly availableTracks = computed(() => {
    const langs = this.transcript.availableLanguages();
    const activeLang = normalizeLanguageCode(this.transcript.detectedLanguage());
    const isAI = this.transcript.isAIGenerated();

    const nativeTracks = (langs.native || [])
      .filter(code => SUPPORTED_LANGUAGES.includes(normalizeLanguageCode(code)))
      .map(code => ({
        code,
        normalized: normalizeLanguageCode(code),
        label: this.getLanguageLabel(code),
        flagUrl: getLanguageFlagUrl(code),
        isAI: false,
        isActive: !isAI && normalizeLanguageCode(code) === activeLang
      }));

    const aiTracks = (langs.ai || [])
      .filter(code => SUPPORTED_LANGUAGES.includes(normalizeLanguageCode(code)))
      .map(code => ({
        code,
        normalized: normalizeLanguageCode(code),
        label: this.getLanguageLabel(code),
        flagUrl: getLanguageFlagUrl(code),
        isAI: true,
        isActive: isAI && normalizeLanguageCode(code) === activeLang
      }));

    return {
      native: nativeTracks,
      ai: aiTracks,
      hasAny: nativeTracks.length > 0 || aiTracks.length > 0 || this.canGenerateTargetAI()
    };
  });

  closeVideo = output<void>();
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

  readonly trackOptions = computed<OptionItem[]>(() => {
    const langs = this.transcript.availableLanguages();
    const items: OptionItem[] = [];

    // Subtitles Off option (if subtitles are currently on and cues exist)
    if (this.subtitlesService.subtitlesVisible() && this.subtitlesService.subtitles().length > 0) {
      items.push({
        value: '__subtitles_off__',
        label: this.i18n.t('subtitle.turnOffSubtitles') || this.i18n.t('player.subtitlesOff') || 'Turn subtitles off',
        description: this.i18n.t('subtitle.hideCaptions') || this.i18n.t('player.hideCaptions') || 'Hide subtitles display',
        icon: 'subtitles'
      });
    }

    // Native tracks (filtered strictly to supported learning languages)
    for (const code of (langs.native || [])) {
      if (!SUPPORTED_LANGUAGES.includes(normalizeLanguageCode(code))) continue;
      items.push({
        value: code,
        label: this.getLanguageLabel(code),
        description: `${code.toUpperCase()} • ${this.i18n.t('subtitle.nativeTracks') || 'Native Subtitles'}`,
        iconUrl: getLanguageFlagUrl(code)
      });
    }

    // AI tracks (filtered strictly to supported learning languages)
    for (const code of (langs.ai || [])) {
      if (!SUPPORTED_LANGUAGES.includes(normalizeLanguageCode(code))) continue;
      items.push({
        value: `ai:${code}`,
        label: this.getLanguageLabel(code),
        description: `${code.toUpperCase()} • ${this.i18n.t('subtitle.whisperAi') || 'Whisper AI'}`,
        iconUrl: getLanguageFlagUrl(code),
        badge: 'AI',
        color: 'ai'
      });
    }

    // Target Language AI generation option (available even if native captions exist)
    if (this.canGenerateTargetAI()) {
      const targetLabel = this.targetLanguageLabel();
      const targetLang = normalizeLanguageCode(this.learningLanguage.currentLanguage()?.code || '');
      const hasNativeTarget = (langs.native || []).some(c => normalizeLanguageCode(c) === targetLang);
      items.push({
        value: '__generate_ai__',
        label: hasNativeTarget
          ? (this.i18n.t('subtitle.retranscribeWithAI') || 'Transcribe with AI (High Accuracy)') + (targetLabel ? ` (${targetLabel})` : '')
          : (this.i18n.t('subtitle.transcribeWithAI') || 'Generate AI Subtitles') + (targetLabel ? ` (${targetLabel})` : ''),
        description: this.i18n.t('subtitle.whisperAi') || 'Powered by Whisper AI',
        icon: 'subtitles-ai',
        badge: 'AI',
        color: 'ai'
      });
    }

    if (items.length === 0) {
      items.push({
        value: '',
        label: this.i18n.t('subtitle.noCaptionsAvailable') || 'No subtitles available',
        description: this.i18n.t('subtitle.noTracksFound') || 'No subtitles found for this video',
        icon: 'subtitles'
      });
    }

    return items;
  });

  readonly activeTrackValue = computed<string>(() => {
    if (!this.subtitlesService.subtitlesVisible()) {
      return '__subtitles_off__';
    }
    const activeLang = normalizeLanguageCode(this.transcript.detectedLanguage());
    const isAI = this.transcript.isAIGenerated();
    const langs = this.transcript.availableLanguages();
    if (isAI) {
      const match = (langs.ai || []).find(c => normalizeLanguageCode(c) === activeLang);
      return match ? `ai:${match}` : `ai:${activeLang}`;
    } else {
      const match = (langs.native || []).find(c => normalizeLanguageCode(c) === activeLang);
      return match || activeLang;
    }
  });

  onSelectTrack(code: string): void {
    this.showTracksSheet.set(false);
    this.selectTrack.emit(code);
  }

  onTrackOptionSelected(val: string): void {
    this.showTracksSheet.set(false);
    if (!val) return;
    if (val === '__generate_ai__') {
      this.triggerAI.emit();
    } else {
      this.selectTrack.emit(val);
    }
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
      default: return codeStr.toUpperCase();
    }
  }

  getTrackFlag(code: string): string {
    return getLanguageFlagUrl(code);
  }
}

