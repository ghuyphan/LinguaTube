import { Injectable, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService, I18nService, ToastService, VideoLevelService } from '../core/services';
import { BottomSheetService } from './bottom-sheet.service';
import { YoutubeService, SubtitleService, TranscriptService, PlayerViewService } from '../features/video';
import { PlaylistService } from '../features/playlist/playlist.service';
import { VocabularyService } from '../features/vocabulary';
import { DictionaryService } from '../features/dictionary/dictionary.service';
import { SupportedLearningLanguage, SUPPORTED_LANGUAGES, SupportedLanguage } from '../models';
import { OptionItem } from '../shared/components/option-picker/option-picker.component';

export interface SwitchLanguageOptions {
  /**
   * Whether to navigate to the Home video feed (`/video`) after switching.
   * Defaults to `true` (e.g. from Sidebar or SettingsSheet).
   * Pass `false` when adapting to the current video's authentic language.
   */
  navigateHome?: boolean;
  /**
   * Whether to show a toast message confirming the switch.
   * Defaults to `true`.
   */
  showToast?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LearningLanguageService {
  private readonly settings = inject(SettingsService);
  private readonly i18n = inject(I18nService);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly bottomSheetService = inject(BottomSheetService);
  private readonly youtube = inject(YoutubeService);
  private readonly subtitles = inject(SubtitleService);
  private readonly transcript = inject(TranscriptService);
  private readonly videoLevel = inject(VideoLevelService);
  private readonly playlist = inject(PlaylistService);
  private readonly playerView = inject(PlayerViewService);
  private readonly vocab = inject(VocabularyService);
  private readonly dictionary = inject(DictionaryService);

  readonly supportedLanguages = SUPPORTED_LANGUAGES;

  readonly currentLanguage = computed<SupportedLanguage>(() => {
    const code = this.settings.settings().language;
    return this.supportedLanguages.find(l => l.code === code) || this.supportedLanguages[0];
  });

  readonly languageOptions = computed<OptionItem[]>(() =>
    this.supportedLanguages.map(l => ({
      value: l.code,
      label: l.name,
      iconUrl: l.flag
    }))
  );

  /**
   * Unified learning language switcher matching top language learning apps:
   * 1. Closes open bottom sheets, dialogs, and pickers.
   * 2. Resets transient state (player, subtitles, active study session, dictionary results).
   * 3. Updates language settings and fonts.
   * 4. Navigates to the Home video feed (`/video`) with fresh recommendations.
   * 5. Displays a confirmation toast.
   */
  switchLanguage(targetLang: SupportedLearningLanguage, options: SwitchLanguageOptions = {}): void {
    const { navigateHome = true, showToast = true } = options;
    const currentLang = this.settings.settings().language;

    // 1. Close all open bottom sheets, modals, and option pickers
    this.bottomSheetService.closeAll();

    // If switching to the same language, sheets are closed and we do nothing further
    if (currentLang === targetLang) {
      return;
    }

    // 2. Clear transient screen state across all domains if navigating away/resetting
    if (navigateHome) {
      this.youtube.reset();
      this.subtitles.clear();
      this.transcript.reset();
      this.videoLevel.reset();
      this.playlist.clearCurrentPlaylist();
      this.playerView.reset();
    }

    // Always reset in-progress study session & dictionary query
    this.vocab.requestStudyReset();
    this.dictionary.clearScreenState();

    // 3. Persist new learning language & load required typography/fonts
    this.settings.setLanguage(targetLang);

    // 4. Navigate to Home feed with clean query params
    if (navigateHome) {
      void this.router.navigate(['/video'], { queryParams: {} });
    }

    // 5. Provide immediate visual feedback
    if (showToast) {
      const langKeyMap: Record<SupportedLearningLanguage, string> = {
        ja: 'japanese',
        zh: 'chinese',
        ko: 'korean',
        en: 'english'
      };
      const localizedName = this.i18n.t(`settings.${langKeyMap[targetLang]}`) || targetLang;
      const config = SUPPORTED_LANGUAGES.find(l => l.code === targetLang);
      const displayName = config && config.name !== localizedName ? `${localizedName} (${config.name})` : localizedName;
      const message = this.i18n.t('settings.switchedToLanguage', { lang: displayName }) || `Switched learning language to ${displayName}`;
      this.toast.show(message, { type: 'info', icon: 'globe' });
    }
  }
}
