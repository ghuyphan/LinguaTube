import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { APP_DOWNLOAD_TARGETS, AppDownloadTarget } from '../../core/config/app-download.config';
import { I18nService, type UILanguage } from '../../core/services';
import { LearningLanguageService } from '../../services';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { getLanguageFlagUrl, type SupportedLearningLanguage } from '../../models';
import { LANDING_COPY, type LandingCopyKey } from './landing.i18n';

interface LandingFeatureItem {
  id: 'subtitles' | 'dict' | 'ai' | 'srs';
  titleKey: LandingCopyKey;
  descKey: LandingCopyKey;
}

interface LandingLanguageMeta {
  code: SupportedLearningLanguage;
  flag: string;
  nativeName: string;
  levelLabel: string;
  labelKey: string;
}

export type DemoWordStatus = 'new' | 'learning' | 'known';

export interface DemoToken {
  id: string;
  surface: string;
  ruby?: string;
  reading: string;
  pos: string;
  status: DemoWordStatus;
  pitch?: string;
  grammarTag?: string;
  definitions: Record<UILanguage, string>;
}

export interface DemoScene {
  id: 'ja' | 'zh' | 'ko';
  tabLabel: string;
  levelBadge: string;
  channelTitle: string;
  timestamp: string;
  defaultTokenId: string;
  tokens: readonly DemoToken[];
  translations: Record<UILanguage, string>;
}

function extractYoutubeVideoId(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  const patterns = [
    /(?:youtube\.com\/watch\?(?:[^#]*&)?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match) return match[1];
  }
  return null;
}

const DEMO_SCENES: readonly DemoScene[] = [
  {
    id: 'ja',
    tabLabel: '日本語',
    levelBadge: 'JLPT N4',
    channelTitle: 'Tokyo Daily Vlog · #14',
    timestamp: '02:18 / 09:40',
    defaultTokenId: 'ja-douga',
    translations: {
      en: 'I study by watching videos every day.',
      vi: 'Tôi học bằng cách xem video mỗi ngày.',
      ja: '毎日動画を見て勉強します。',
      ko: '매일 영상을 보면서 공부해요.',
      zh: '我每天通过看视频来学习。'
    },
    tokens: [
      {
        id: 'ja-mainichi',
        surface: '毎日',
        ruby: 'まいにち',
        reading: 'まいにち',
        pos: 'n. / adv.',
        status: 'known',
        pitch: '① まいにち',
        definitions: {
          en: 'every day, daily',
          vi: 'mỗi ngày, hằng ngày',
          ja: '来る日も来る日も、日々',
          ko: '매일, 날마다',
          zh: '每天、每日'
        }
      },
      {
        id: 'ja-douga',
        surface: '動画',
        ruby: 'どうが',
        reading: 'どうが',
        pos: 'n.',
        status: 'new',
        pitch: '⓪ どうが',
        definitions: {
          en: 'video, moving picture, clip',
          vi: 'video, đoạn phim, hình ảnh động',
          ja: '映像・動画コンテンツ',
          ko: '동영상, 영상 클립',
          zh: '视频、动态影像'
        }
      },
      {
        id: 'ja-wo',
        surface: 'を',
        reading: 'を',
        pos: 'part.',
        status: 'known',
        definitions: {
          en: 'direct object marker',
          vi: 'trợ từ chỉ tân ngữ trực tiếp',
          ja: '目的語を示す格助詞',
          ko: '목적격 조사 (~을/를)',
          zh: '提示直接宾语的格助词'
        }
      },
      {
        id: 'ja-mite',
        surface: '見て',
        ruby: 'み',
        reading: 'みる (て-form)',
        pos: 'v.',
        status: 'learning',
        grammarTag: '〜て (N5)',
        definitions: {
          en: 'watching, seeing; connects sequential or means actions',
          vi: 'xem, nhìn; thể て nối hành động liên tiếp hoặc phương tiện',
          ja: '見るのて形。手段や連続動作をつなぐ',
          ko: '보다의 て형. 수단이나 연속 동작을 연결',
          zh: '看（て形），用于连接动作或表示方式'
        }
      },
      {
        id: 'ja-benkyou',
        surface: '勉強します',
        ruby: 'べんきょう',
        reading: 'べんきょうします',
        pos: 'v.',
        status: 'learning',
        pitch: '⓪ べんきょう',
        definitions: {
          en: 'to study, to learn (polite)',
          vi: 'học tập (thể lịch sự)',
          ja: '学問や技術を身につけること（丁寧形）',
          ko: '공부하다 (정중형)',
          zh: '学习（礼貌形）'
        }
      }
    ]
  },
  {
    id: 'zh',
    tabLabel: '中文',
    levelBadge: 'HSK 3',
    channelTitle: 'Taipei Street Food Walk',
    timestamp: '04:05 / 12:15',
    defaultTokenId: 'zh-shuxi',
    translations: {
      en: 'Watching videos helps you get familiar with natural speech.',
      vi: 'Xem video giúp bạn làm quen với cách nói tự nhiên.',
      ja: '動画を見ると自然な話し方に慣れてきます。',
      ko: '영상을 보면 자연스러운 말투에 익숙해져요.',
      zh: '看视频会让你慢慢熟悉自然的表达。'
    },
    tokens: [
      {
        id: 'zh-kan',
        surface: '看',
        ruby: 'kàn',
        reading: 'kàn',
        pos: 'v.',
        status: 'known',
        definitions: {
          en: 'to watch, to look at',
          vi: 'xem, nhìn',
          ja: '見る、観る',
          ko: '보다, 시청하다',
          zh: '观看、看'
        }
      },
      {
        id: 'zh-shipin',
        surface: '视频',
        ruby: 'shìpín',
        reading: 'shìpín',
        pos: 'n.',
        status: 'known',
        definitions: {
          en: 'video, clip',
          vi: 'video, đoạn phim',
          ja: '動画、ビデオ',
          ko: '동영상, 영상',
          zh: '视频、影像'
        }
      },
      {
        id: 'zh-manman',
        surface: '慢慢',
        ruby: 'mànmàn',
        reading: 'mànmàn',
        pos: 'adv.',
        status: 'learning',
        grammarTag: 'AA reduplication',
        definitions: {
          en: 'gradually, slowly, little by little',
          vi: 'dần dần, từ từ',
          ja: 'ゆっくりと、少しずつ',
          ko: '천천히, 서서히',
          zh: '逐渐地、慢慢地'
        }
      },
      {
        id: 'zh-shuxi',
        surface: '熟悉',
        ruby: 'shúxī',
        reading: 'shúxī',
        pos: 'v. / adj.',
        status: 'new',
        definitions: {
          en: 'to become familiar with, to know well',
          vi: 'làm quen, quen thuộc với',
          ja: '慣れる、よく知っている',
          ko: '익숙해지다, 잘 알다',
          zh: '熟悉、了解清楚'
        }
      },
      {
        id: 'zh-biaoda',
        surface: '表达',
        ruby: 'biǎodá',
        reading: 'biǎodá',
        pos: 'n. / v.',
        status: 'learning',
        definitions: {
          en: 'expression, phrasing, to express',
          vi: 'cách diễn đạt, biểu đạt',
          ja: '表現、言い回し',
          ko: '표현, 말투',
          zh: '表达、措辞'
        }
      }
    ]
  },
  {
    id: 'ko',
    tabLabel: '한국어',
    levelBadge: 'TOPIK 2',
    channelTitle: 'Seoul Cafe Routine Vlog',
    timestamp: '01:52 / 07:30',
    defaultTokenId: 'ko-iksu',
    translations: {
      en: 'If you listen often, the expressions become natural.',
      vi: 'Nghe thường xuyên rồi các cách nói sẽ trở nên tự nhiên.',
      ja: 'よく聞いていると、表現が自然に身についてきます。',
      ko: '자주 들으면 표현이 자연스럽게 익숙해져요.',
      zh: '经常听的话，这些表达就会自然而然地熟悉起来。'
    },
    tokens: [
      {
        id: 'ko-jaju',
        surface: '자주',
        ruby: 'ja-ju',
        reading: 'ja-ju',
        pos: 'adv.',
        status: 'known',
        definitions: {
          en: 'often, frequently',
          vi: 'thường xuyên, hay',
          ja: 'よく、頻繁に',
          ko: '여러 번 잇달아, 빈번하게',
          zh: '经常、频繁地'
        }
      },
      {
        id: 'ko-deureumyeon',
        surface: '들으면',
        ruby: 'deu-reu-myeon',
        reading: '듣다 + -(으)면',
        pos: 'v.',
        status: 'learning',
        grammarTag: '-(으)면 (TOPIK 1)',
        definitions: {
          en: 'if you listen; conditional form of 듣다 (to listen)',
          vi: 'nếu nghe; dạng điều kiện của 듣다 (nghe)',
          ja: '聞けば・聞くと（듣다の条件形）',
          ko: '듣다 + -(으)면 조건 표현',
          zh: '如果听（듣다 的条件形）'
        }
      },
      {
        id: 'ko-pyohyeon',
        surface: '표현이',
        ruby: 'pyo-hyeon-i',
        reading: '표현 + 이',
        pos: 'n.',
        status: 'known',
        definitions: {
          en: 'expression, phrase (+ subject particle 이)',
          vi: 'cách diễn đạt (+ tiểu từ chủ ngữ 이)',
          ja: '表現（＋主格助詞 이）',
          ko: '말이나 글로 나타낸 표현',
          zh: '表达、说法（+ 主格助词 이）'
        }
      },
      {
        id: 'ko-iksu',
        surface: '익숙해져요',
        ruby: 'ik-suk-hae-jyeo-yo',
        reading: '익숙해지다',
        pos: 'v.',
        status: 'new',
        grammarTag: '-아/어지다 (TOPIK 2)',
        definitions: {
          en: 'becomes familiar, gets natural over time',
          vi: 'trở nên quen thuộc, dần tự nhiên',
          ja: '慣れてくる、自然になじむ',
          ko: '점차 익숙한 상태가 되다',
          zh: '变得熟悉、渐渐习惯'
        }
      }
    ]
  }
];

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

  readonly youtubeInput = signal('');
  readonly youtubeError = signal(false);

  readonly demoScenes = DEMO_SCENES;
  readonly activeSceneId = signal<DemoScene['id']>('ja');
  readonly selectedTokenId = signal<string>(DEMO_SCENES[0].defaultTokenId);
  readonly savedTokenIds = signal<ReadonlySet<string>>(new Set<string>());

  readonly activeScene = computed(
    () => this.demoScenes.find(scene => scene.id === this.activeSceneId()) ?? this.demoScenes[0]
  );

  readonly selectedToken = computed(() => {
    const scene = this.activeScene();
    return scene.tokens.find(t => t.id === this.selectedTokenId()) ?? scene.tokens[0];
  });

  readonly activeTranslation = computed(() => {
    const lang = this.i18n.currentLanguage();
    return this.activeScene().translations[lang] ?? this.activeScene().translations.en;
  });

  readonly selectedDefinition = computed(() => {
    const lang = this.i18n.currentLanguage();
    const token = this.selectedToken();
    return token.definitions[lang] ?? token.definitions.en;
  });

  readonly isSelectedSaved = computed(() => this.savedTokenIds().has(this.selectedToken().id));

  readonly languages: readonly LandingLanguageMeta[] = [
    { code: 'ja', flag: getLanguageFlagUrl('ja'), nativeName: '日本語', levelLabel: 'JLPT N5–N1', labelKey: 'settings.japanese' },
    { code: 'zh', flag: getLanguageFlagUrl('zh'), nativeName: '中文', levelLabel: 'HSK 1–6', labelKey: 'settings.chinese' },
    { code: 'ko', flag: getLanguageFlagUrl('ko'), nativeName: '한국어', levelLabel: 'TOPIK 1–6', labelKey: 'settings.korean' },
    { code: 'en', flag: getLanguageFlagUrl('en'), nativeName: 'English', levelLabel: 'CEFR A1–C1', labelKey: 'settings.english' },
    { code: 'vi', flag: getLanguageFlagUrl('vi'), nativeName: 'Tiếng Việt', levelLabel: 'CEFR A1–C1', labelKey: 'settings.vietnamese' },
  ];

  readonly features: readonly LandingFeatureItem[] = [
    { id: 'subtitles', titleKey: 'featureSubtitlesTitle', descKey: 'featureSubtitlesDesc' },
    { id: 'dict', titleKey: 'featureDictTitle', descKey: 'featureDictDesc' },
    { id: 'ai', titleKey: 'featureAiTitle', descKey: 'featureAiDesc' },
    { id: 'srs', titleKey: 'featureSrsTitle', descKey: 'featureSrsDesc' },
  ];

  onYoutubeInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.youtubeInput.set(value);
    if (this.youtubeError()) {
      this.youtubeError.set(false);
    }
  }

  openYoutubeUrl(event: Event): void {
    event.preventDefault();
    const raw = this.youtubeInput().trim();
    if (!raw) {
      void this.router.navigate(['/video']);
      return;
    }

    const videoId = extractYoutubeVideoId(raw);
    if (!videoId) {
      this.youtubeError.set(true);
      return;
    }

    this.youtubeError.set(false);
    void this.router.navigate(['/video'], { queryParams: { id: videoId } });
  }

  selectDemoScene(sceneId: DemoScene['id']): void {
    const next = this.demoScenes.find(s => s.id === sceneId);
    if (!next) return;
    this.activeSceneId.set(sceneId);
    this.selectedTokenId.set(next.defaultTokenId);
  }

  selectDemoToken(tokenId: string): void {
    this.selectedTokenId.set(tokenId);
  }

  toggleSaveSelectedToken(): void {
    const id = this.selectedToken().id;
    this.savedTokenIds.update(current => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  tokenEffectiveStatus(token: DemoToken): DemoWordStatus {
    if (this.savedTokenIds().has(token.id) && token.status === 'new') {
      return 'learning';
    }
    return token.status;
  }

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
