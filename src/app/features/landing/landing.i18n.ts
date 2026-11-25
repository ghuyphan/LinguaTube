import type { UILanguage } from '../../core/services/i18n.service';

export interface LandingCopy {
  heroTitleStart: string;
  heroTitleAccent: string;
  heroTitle: string;
  heroSubtitle: string;
  urlPlaceholder: string;
  urlSubmit: string;
  urlError: string;
  launchWebApp: string;
  getMobileApp: string;
  freeToStartNote: string;
  demoHeading: string;
  demoHint: string;
  demoSaveWord: string;
  demoSavedWord: string;
  demoGrammarLabel: string;
  previewTag: string;
  previewTranslation: string;
  previewDefinition: string;
  languagesTitle: string;
  languagesSubtitle: string;
  featuresTitle: string;
  featuresSubtitle: string;
  featureSubtitlesTitle: string;
  featureSubtitlesDesc: string;
  featureAiTitle: string;
  featureAiDesc: string;
  featureDictTitle: string;
  featureDictDesc: string;
  featureSrsTitle: string;
  featureSrsDesc: string;
  legendNew: string;
  legendLearning: string;
  legendKnown: string;
  legendGrammar: string;
  srsAgain: string;
  srsHard: string;
  srsGood: string;
  srsEasy: string;
  downloadTitle: string;
  downloadSubtitle: string;
  downloadPerkSync: string;
  downloadPerkOffline: string;
  downloadPerkSameAccount: string;
  manageSyncAccount: string;
  useInBrowser: string;
  downloadComingSoon: string;
  downloadDirectRelease: string;
  downloadPlayTitle: string;
  downloadPlaySubtitle: string;
  downloadPlayCta: string;
  downloadAppStoreTitle: string;
  downloadAppStoreSubtitle: string;
  downloadAppStoreCta: string;
  downloadApkTitle: string;
  downloadApkSubtitle: string;
  downloadApkCta: string;
}

export type LandingCopyKey = keyof LandingCopy;

export const LANDING_COPY: Record<UILanguage, LandingCopy> = {
  en: {
    heroTitleStart: 'Learn from the YouTube videos ',
    heroTitleAccent: 'you actually watch.',
    heroTitle: 'Learn from the YouTube videos you actually watch.',
    heroSubtitle:
      'Dual subtitles, instant word lookups, grammar matches, and SM-2 flashcards layered straight over any Japanese, Chinese, Korean, English, or Vietnamese clip.',
    urlPlaceholder: 'Paste any YouTube link or video ID…',
    urlSubmit: 'Open video',
    urlError: 'Enter a valid YouTube link or 11-character video ID, or browse curated videos below.',
    launchWebApp: 'Browse curated videos',
    getMobileApp: 'Mobile app',
    freeToStartNote: 'Free to start · Syncs vocabulary and streaks across web, iOS, and Android',
    demoHeading: 'Click any word in the subtitle',
    demoHint: 'Select any word in the caption to inspect its reading, grammar, and meaning.',
    demoSaveWord: 'Save to SRS',
    demoSavedWord: 'Saved in deck',
    demoGrammarLabel: 'Grammar match',
    previewTag: 'Interactive Subtitles',
    previewTranslation: 'I study by watching videos every day.',
    previewDefinition: 'video, moving picture, clip',
    languagesTitle: 'Five languages, graded by level',
    languagesSubtitle: 'Pick a language to open curated YouTube playlists matched to your reading level.',
    featuresTitle: 'Everything happens inside the player',
    featuresSubtitle: 'Look up a word, check a grammar pattern, and save a flashcard without switching tabs.',
    featureSubtitlesTitle: 'Dual subtitles with word status',
    featureSubtitlesDesc:
      'Furigana, Pinyin, or Romaji sit cleanly above the line while Voca marks new, learning, and known words directly inside the captions.',
    featureAiTitle: 'AI subtitles for uncaptioned videos',
    featureAiDesc:
      'Generate timed transcripts for videos up to 45 minutes long when a creator has not uploaded captions.',
    featureDictTitle: 'Multi-source dictionary & grammar',
    featureDictDesc:
      'Inspect definitions, pitch accent, stroke order, and matched grammar patterns with one click on the subtitle.',
    featureSrsTitle: 'Spaced-repetition flashcards (SM-2)',
    featureSrsDesc:
      'Save a word with its sentence context and review it later with SM-2 intervals tuned to what you remember.',
    legendNew: 'New',
    legendLearning: 'Learning',
    legendKnown: 'Known',
    legendGrammar: 'Grammar',
    srsAgain: 'Again',
    srsHard: 'Hard',
    srsGood: 'Good',
    srsEasy: 'Easy',
    downloadTitle: 'Keep reviewing offline on mobile.',
    downloadSubtitle:
      'Take your saved flashcards, watch history, and daily streak with you on the same Voca account.',
    downloadPerkSync: 'Same vocabulary, playlists, and streaks across web and phone',
    downloadPerkOffline: 'Offline flashcard review and locally cached subtitles',
    downloadPerkSameAccount: 'One account for Free, Pro, and Premium plans plus learner profiles',
    manageSyncAccount: 'Manage Account',
    useInBrowser: 'Start in Browser',
    downloadComingSoon: 'Coming Soon',
    downloadDirectRelease: 'Available Now',
    downloadPlayTitle: 'Google Play',
    downloadPlaySubtitle: 'Android phones and tablets',
    downloadPlayCta: 'Store review pending',
    downloadAppStoreTitle: 'App Store',
    downloadAppStoreSubtitle: 'iPhone and iPad',
    downloadAppStoreCta: 'Coming soon',
    downloadApkTitle: 'Android APK',
    downloadApkSubtitle: 'Signed direct builds and release notes on GitHub',
    downloadApkCta: 'Download APK'
  },
  vi: {
    heroTitleStart: 'Học ngoại ngữ ngay trên video YouTube ',
    heroTitleAccent: 'bạn vốn thích xem.',
    heroTitle: 'Học ngoại ngữ ngay trên video YouTube bạn vốn thích xem.',
    heroSubtitle:
      'Phụ đề song ngữ, tra từ tức thì, nhận diện ngữ pháp và thẻ nhớ SM-2 hiển thị trực tiếp trên mọi video tiếng Nhật, Trung, Hàn, Anh hoặc Việt.',
    urlPlaceholder: 'Dán liên kết YouTube hoặc mã video…',
    urlSubmit: 'Mở video',
    urlError: 'Nhập liên kết YouTube hoặc mã video 11 ký tự hợp lệ, hoặc chọn kho video bên dưới.',
    launchWebApp: 'Xem kho video tuyển chọn',
    getMobileApp: 'Ứng dụng mobile',
    freeToStartNote: 'Miễn phí bắt đầu · Đồng bộ từ vựng và chuỗi học trên Web, iOS và Android',
    demoHeading: 'Chạm vào bất kỳ từ nào trên phụ đề',
    demoHint: 'Chọn một từ trên dòng phụ đề để xem cách đọc, ngữ pháp và nghĩa.',
    demoSaveWord: 'Lưu thẻ SRS',
    demoSavedWord: 'Đã lưu vào bộ thẻ',
    demoGrammarLabel: 'Mẫu ngữ pháp',
    previewTag: 'Phụ đề tương tác',
    previewTranslation: 'Tôi học bằng cách xem video mỗi ngày.',
    previewDefinition: 'video, đoạn phim, hình ảnh động',
    languagesTitle: 'Năm ngôn ngữ, phân loại sẵn theo trình độ',
    languagesSubtitle: 'Chọn ngôn ngữ để mở ngay danh sách video tuyển chọn phù hợp với mức đọc hiểu của bạn.',
    featuresTitle: 'Mọi thao tác diễn ra ngay trong trình phát',
    featuresSubtitle: 'Tra nghĩa, xem mẫu ngữ pháp và lưu thẻ nhớ mà không cần chuyển tab hay đổi ứng dụng.',
    featureSubtitlesTitle: 'Phụ đề song ngữ kèm trạng thái từ',
    featureSubtitlesDesc:
      'Hiển thị Furigana, Pinyin hoặc phiên âm ngay trên dòng phụ đề và tô màu phân biệt từ mới, đang học và đã thuộc.',
    featureAiTitle: 'Tạo phụ đề AI cho video chưa có chú thích',
    featureAiDesc:
      'Tạo bản chép khớp thời gian cho video tối đa 45 phút khi kênh yêu thích của bạn chưa tải lên phụ đề.',
    featureDictTitle: 'Từ điển đa nguồn & ngữ pháp',
    featureDictDesc:
      'Xem nghĩa, trọng âm, thứ tự nét chữ Kanji và mẫu ngữ pháp trong câu chỉ với một chạm trên phụ đề.',
    featureSrsTitle: 'Thẻ nhớ lặp lại ngắt quãng (SM-2)',
    featureSrsDesc:
      'Lưu từ vựng kèm đúng câu ngữ cảnh trong video và ôn tập theo lịch SM-2 tự điều chỉnh theo trí nhớ của bạn.',
    legendNew: 'Từ mới',
    legendLearning: 'Đang học',
    legendKnown: 'Đã thuộc',
    legendGrammar: 'Ngữ pháp',
    srsAgain: 'Học lại',
    srsHard: 'Khó',
    srsGood: 'Tốt',
    srsEasy: 'Dễ',
    downloadTitle: 'Tiếp tục ôn tập ngoại tuyến trên điện thoại.',
    downloadSubtitle:
      'Mang theo bộ thẻ từ vựng, lịch sử xem và chuỗi ngày học trên cùng một tài khoản Voca.',
    downloadPerkSync: 'Đồng bộ từ vựng, danh sách phát và chuỗi ngày học giữa web và điện thoại',
    downloadPerkOffline: 'Ôn tập thẻ nhớ ngoại tuyến và lưu bộ nhớ đệm phụ đề trên máy',
    downloadPerkSameAccount: 'Dùng chung tài khoản cho gói Free, Pro, Premium và hồ sơ học tập',
    manageSyncAccount: 'Quản lý tài khoản',
    useInBrowser: 'Học trên trình duyệt',
    downloadComingSoon: 'Sắp ra mắt',
    downloadDirectRelease: 'Có sẵn ngay',
    downloadPlayTitle: 'Google Play',
    downloadPlaySubtitle: 'Điện thoại và máy tính bảng Android',
    downloadPlayCta: 'Đang chờ duyệt',
    downloadAppStoreTitle: 'App Store',
    downloadAppStoreSubtitle: 'iPhone và iPad',
    downloadAppStoreCta: 'Sắp ra mắt',
    downloadApkTitle: 'Android APK',
    downloadApkSubtitle: 'Bản cài đặt đã ký và ghi chú phát hành trên GitHub',
    downloadApkCta: 'Tải APK'
  },
  ja: {
    heroTitleStart: 'いつも見ているYouTubeで、',
    heroTitleAccent: 'そのまま語学学習。',
    heroTitle: 'いつも見ているYouTubeで、そのまま語学学習。',
    heroSubtitle:
      '2言語字幕、ワンタップ辞書、文法ハイライト、SM-2暗記カードを、日本語・中国語・韓国語・英語・ベトナム語の動画にそのまま重ねます。',
    urlPlaceholder: 'YouTubeのURLまたは動画IDを貼り付け…',
    urlSubmit: '動画を開く',
    urlError: '有効なYouTube URLまたは11文字の動画IDを入力するか、下の言語から動画を選んでください。',
    launchWebApp: '厳選動画を見る',
    getMobileApp: 'モバイル版',
    freeToStartNote: '無料で開始 · 単語帳と連続記録をWeb・iOS・Androidで同期',
    demoHeading: '字幕の単語をクリックして体験',
    demoHint: '下の字幕から単語を選ぶと、読み方・品詞・意味がその場で切り替わります。',
    demoSaveWord: 'SRSに保存',
    demoSavedWord: 'デッキに保存済み',
    demoGrammarLabel: '文法パターン',
    previewTag: 'インタラクティブ字幕',
    previewTranslation: '毎日動画を見て勉強します。',
    previewDefinition: '動画、映像、ムービー',
    languagesTitle: '5言語をレベル別に整理',
    languagesSubtitle: '学びたい言語を選ぶと、難易度判定つきの厳選プレイリストからすぐ始められます。',
    featuresTitle: 'すべてがプレイヤーの中で完結',
    featuresSubtitle: '別タブを開かずに、視聴しながら辞書引き・文法確認・カード保存ができます。',
    featureSubtitlesTitle: '習得ステータス付き2言語字幕',
    featureSubtitlesDesc:
      'ふりがな・ピンイン・ローマ字と対訳を同時に表示。未習・学習中・習得済みの単語を字幕上で色分けします。',
    featureAiTitle: '字幕のない動画にもAI文字起こし',
    featureAiDesc:
      '最大45分の動画からタイムスタンプ付き字幕を生成。字幕がないチャンネルもそのまま教材になります。',
    featureDictTitle: '多ソース辞書と文法マッチ',
    featureDictDesc:
      '単語の意味、ピッチアクセント、漢字の書き順、文中の文法パターンを字幕からワンタップで確認できます。',
    featureSrsTitle: 'SM-2間隔反復フラッシュカード',
    featureSrsDesc:
      '動画の例文ごと単語を保存し、記憶定着に合わせて最適な復習間隔を自動計算します。',
    legendNew: '未習',
    legendLearning: '学習中',
    legendKnown: '習得済み',
    legendGrammar: '文法',
    srsAgain: 'もう一度',
    srsHard: '難しい',
    srsGood: '正解',
    srsEasy: '簡単',
    downloadTitle: 'モバイルでもオフラインで復習を継続。',
    downloadSubtitle:
      '保存した暗記カード、視聴履歴、連続記録を同じVocaアカウントで持ち歩けます。',
    downloadPerkSync: 'Webとスマホ間で単語帳・プレイリスト・連続記録を同期',
    downloadPerkOffline: 'オフラインSRS復習とローカル字幕キャッシュに対応',
    downloadPerkSameAccount: 'Free・Pro・Premiumプランや公開プロフィールを1アカウントで共有',
    manageSyncAccount: 'アカウント管理',
    useInBrowser: 'ブラウザで始める',
    downloadComingSoon: '近日公開',
    downloadDirectRelease: '配信中',
    downloadPlayTitle: 'Google Play',
    downloadPlaySubtitle: 'Androidスマートフォン・タブレット',
    downloadPlayCta: '公開準備中',
    downloadAppStoreTitle: 'App Store',
    downloadAppStoreSubtitle: 'iPhone・iPad',
    downloadAppStoreCta: '近日公開',
    downloadApkTitle: 'Android APK',
    downloadApkSubtitle: '署名済みビルドとリリースノート（GitHub）',
    downloadApkCta: 'APKを入手'
  },
  ko: {
    heroTitleStart: '원래 보던 유튜브 영상으로 ',
    heroTitleAccent: '바로 언어를 익히세요.',
    heroTitle: '원래 보던 유튜브 영상으로 바로 언어를 익히세요.',
    heroSubtitle:
      '일본어, 중국어, 한국어, 영어, 베트남어 영상 위에 이중 자막, 원터치 사전, 문법 표시, SM-2 플래시카드를 바로 얹어 학습합니다.',
    urlPlaceholder: '유튜브 링크 또는 영상 ID 붙여넣기…',
    urlSubmit: '영상 열기',
    urlError: '올바른 유튜브 링크나 11자리 영상 ID를 입력하거나 아래에서 언어를 선택하세요.',
    launchWebApp: '추천 영상 둘러보기',
    getMobileApp: '모바일 앱',
    freeToStartNote: '무료 시작 · 웹, iOS, Android 간 단어장과 학습 스트릭 동기화',
    demoHeading: '자막의 단어를 직접 눌러보세요',
    demoHint: '아래 자막의 단어를 클릭하면 읽기, 품사, 뜻이 바로 바뀝니다.',
    demoSaveWord: 'SRS에 저장',
    demoSavedWord: '덱에 저장됨',
    demoGrammarLabel: '문법 패턴',
    previewTag: '인터랙티브 자막',
    previewTranslation: '매일 영상을 보면서 공부해요.',
    previewDefinition: '동영상, 영상 클립',
    languagesTitle: '난이도별로 정리된 5개 언어',
    languagesSubtitle: '목표 언어를 선택하면 수준에 맞는 추천 재생목록으로 바로 이동합니다.',
    featuresTitle: '영상 플레이어 안에서 끝나는 학습',
    featuresSubtitle: '탭을 오가지 않고 자막에서 바로 뜻을 찾고 문법을 확인하고 카드를 저장하세요.',
    featureSubtitlesTitle: '학습 상태가 보이는 이중 자막',
    featureSubtitlesDesc:
      '후리가나, 병음, 로마자 표기와 번역 자막을 함께 보며 새 단어·학습 중·아는 단어를 색상으로 구분합니다.',
    featureAiTitle: '자막이 없는 영상도 AI 자막 생성',
    featureAiDesc:
      '최대 45분 길이 영상의 타임코드 자막을 생성해 자막 없는 채널의 영상도 교재로 활용할 수 있습니다.',
    featureDictTitle: '통합 사전과 문장 문법 분석',
    featureDictDesc:
      '자막을 한 번 탭해 다중 사전 뜻, 성조/악센트, 한자 획순, 문장 속 문법 패턴을 확인하세요.',
    featureSrsTitle: 'SM-2 간격 반복 플래시카드',
    featureSrsDesc:
      '영상 속 예문과 함께 단어를 저장하고 기억 곡선에 맞춘 간격으로 복습합니다.',
    legendNew: '새 단어',
    legendLearning: '학습 중',
    legendKnown: '아는 단어',
    legendGrammar: '문법',
    srsAgain: '다시',
    srsHard: '어려움',
    srsGood: '좋음',
    srsEasy: '쉬움',
    downloadTitle: '모바일에서 오프라인으로 복습을 이어가세요.',
    downloadSubtitle:
      '저장한 플래시카드, 시청 기록, 연속 학습 스트릭을 같은 Voca 계정으로 이어갑니다.',
    downloadPerkSync: '웹과 모바일 간 단어장, 재생목록, 스트릭 자동 동기화',
    downloadPerkOffline: '오프라인 플래시카드 복습과 로컬 자막 캐시 지원',
    downloadPerkSameAccount: 'Free·Pro·Premium 플랜과 학습자 프로필을 한 계정으로 이용',
    manageSyncAccount: '계정 관리',
    useInBrowser: '브라우저에서 시작',
    downloadComingSoon: '출시 예정',
    downloadDirectRelease: '다운로드 가능',
    downloadPlayTitle: 'Google Play',
    downloadPlaySubtitle: 'Android 스마트폰 및 태블릿',
    downloadPlayCta: '출시 준비 중',
    downloadAppStoreTitle: 'App Store',
    downloadAppStoreSubtitle: 'iPhone 및 iPad',
    downloadAppStoreCta: '출시 예정',
    downloadApkTitle: 'Android APK',
    downloadApkSubtitle: 'GitHub 서명 빌드 및 릴리스 노트',
    downloadApkCta: 'APK 다운로드'
  },
  zh: {
    heroTitleStart: '看你本来就爱看的 YouTube，',
    heroTitleAccent: '顺手把语言学下来。',
    heroTitle: '看你本来就爱看的 YouTube，顺手把语言学下来。',
    heroSubtitle:
      '把双语字幕、点词词典、语法标注和 SM-2 闪卡直接叠加在任意日语、中文、韩语、英语或越南语视频上。',
    urlPlaceholder: '粘贴任意 YouTube 链接或视频 ID…',
    urlSubmit: '打开视频',
    urlError: '请输入有效的 YouTube 链接或 11 位视频 ID，或直接从下方选择语言。',
    launchWebApp: '浏览精选视频',
    getMobileApp: '移动应用',
    freeToStartNote: '免费开始 · 网页端、iOS 与 Android 同步生词本和连续学习记录',
    demoHeading: '点一个字幕词条试试',
    demoHint: '点击下方字幕中的任意词条，实时查看读音、语法说明与释义。',
    demoSaveWord: '加入 SRS',
    demoSavedWord: '已加入卡组',
    demoGrammarLabel: '语法匹配',
    previewTag: '互动字幕',
    previewTranslation: '我每天通过看视频来学习。',
    previewDefinition: '视频、动态影像',
    languagesTitle: '五种语言，按难度分级',
    languagesSubtitle: '选择目标语言，直接进入匹配当前阅读水平的精选视频播放列表。',
    featuresTitle: '所有学习动作都在播放器里完成',
    featuresSubtitle: '不用来回切标签页，看视频的同时查词、看语法、收藏闪卡。',
    featureSubtitlesTitle: '带掌握状态的双语字幕',
    featureSubtitlesDesc:
      '在字幕上方显示假名、拼音或罗马音，并用颜色区分新词、学习中与已掌握词汇。',
    featureAiTitle: '没有字幕也能生成 AI 时间轴',
    featureAiDesc:
      '支持为最长 45 分钟的无字幕视频生成精准时间轴字幕，喜欢的频道都能拿来学。',
    featureDictTitle: '多源词典与句中语法标注',
    featureDictDesc:
      '点一下字幕词条，即可查看释义、声调重音、汉字笔顺以及当前句子的语法点。',
    featureSrsTitle: 'SM-2 间隔重复闪卡',
    featureSrsDesc:
      '连同视频原句一键收藏生词，系统按你的记忆曲线安排下一次复习间隔。',
    legendNew: '新词',
    legendLearning: '学习中',
    legendKnown: '已掌握',
    legendGrammar: '语法',
    srsAgain: '重来',
    srsHard: '困难',
    srsGood: '良好',
    srsEasy: '简单',
    downloadTitle: '在手机上继续离线复习。',
    downloadSubtitle:
      '使用同一个 Voca 账号，随时随地同步你的生词卡组、观看记录与连续学习天数。',
    downloadPerkSync: '网页与手机同步生词本、播放列表与连续学习天数',
    downloadPerkOffline: '支持离线闪卡复习与本地字幕缓存',
    downloadPerkSameAccount: '同一账号畅享 Free、Pro、Premium 方案与学习者主页',
    manageSyncAccount: '管理账号',
    useInBrowser: '在浏览器开始',
    downloadComingSoon: '即将推出',
    downloadDirectRelease: '现已提供',
    downloadPlayTitle: 'Google Play',
    downloadPlaySubtitle: 'Android 手机与平板',
    downloadPlayCta: '审核准备中',
    downloadAppStoreTitle: 'App Store',
    downloadAppStoreSubtitle: 'iPhone 与 iPad',
    downloadAppStoreCta: '即将推出',
    downloadApkTitle: 'Android APK',
    downloadApkSubtitle: 'GitHub 签名安装包与版本说明',
    downloadApkCta: '下载 APK'
  }
};
