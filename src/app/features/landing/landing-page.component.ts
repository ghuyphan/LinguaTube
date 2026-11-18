import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { APP_DOWNLOAD_TARGETS, AppDownloadTarget } from '../../core/config/app-download.config';
import { I18nService } from '../../core/services';
import { LearningLanguageService } from '../../services';
import { IconComponent, IconName } from '../../shared/components/icon/icon.component';
import { getLanguageFlagUrl, type SupportedLearningLanguage } from '../../models';
import { LANDING_COPY, type LandingCopyKey } from './landing.i18n';

interface LandingFeatureCard {
  icon: IconName;
  titleKey: LandingCopyKey;
  descKey: LandingCopyKey;
}

interface LandingLanguageMeta {
  code: SupportedLearningLanguage;
  flag: string;
  levelLabel: string;
  labelKey: string;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly learningLanguage = inject(LearningLanguageService);

  readonly copy = computed(() => LANDING_COPY[this.i18n.currentLanguage()] ?? LANDING_COPY.en);
  readonly downloadTargets: readonly AppDownloadTarget[] = APP_DOWNLOAD_TARGETS;

  readonly languages: readonly LandingLanguageMeta[] = [
    { code: 'ja', flag: getLanguageFlagUrl('ja'), levelLabel: 'JLPT N5–N1', labelKey: 'settings.japanese' },
    { code: 'zh', flag: getLanguageFlagUrl('zh'), levelLabel: 'HSK 1–6', labelKey: 'settings.chinese' },
    { code: 'ko', flag: getLanguageFlagUrl('ko'), levelLabel: 'TOPIK 1–6', labelKey: 'settings.korean' },
    { code: 'en', flag: getLanguageFlagUrl('en'), levelLabel: 'CEFR A1–C1', labelKey: 'settings.english' },
    { code: 'vi', flag: getLanguageFlagUrl('vi'), levelLabel: 'CEFR A1–C1', labelKey: 'settings.vietnamese' },
  ];

  readonly features: readonly LandingFeatureCard[] = [
    { icon: 'subtitles', titleKey: 'featureSubtitlesTitle', descKey: 'featureSubtitlesDesc' },
    { icon: 'subtitles-ai', titleKey: 'featureAiTitle', descKey: 'featureAiDesc' },
    { icon: 'book-open', titleKey: 'featureDictTitle', descKey: 'featureDictDesc' },
    { icon: 'cards', titleKey: 'featureSrsTitle', descKey: 'featureSrsDesc' },
  ];

  openLanguageInApp(code: SupportedLearningLanguage): void {
    this.learningLanguage.switchLanguage(code, { navigateHome: false });
    void this.router.navigate(['/video']);
  }

  scrollToDownload(event: Event): void {
    event.preventDefault();
    const section = document.getElementById('download');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
