import type { UILanguage } from '../../core/services/i18n.service';

export interface LandingCopy {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  launchWebApp: string;
  getMobileApp: string;
  freeToStartNote: string;
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
  downloadEyebrow: string;
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
    eyebrow: 'Web & Flutter Mobile App · 5 Languages',
    heroTitle: 'Master real languages by watching YouTube you already love.',
    heroSubtitle: 'Turn any Japanese, Chinese, Korean, English, or Vietnamese YouTube video into an interactive immersion lesson with synchronized dual subtitles, instant dictionary popups, AI captions, and spaced-repetition flashcards.',
    launchWebApp: 'Open Web App',
    getMobileApp: 'Download Mobile App',
    freeToStartNote: 'Free to start · Sync vocabulary, streaks, and flashcards across Web, iOS, and Android',
    previewTag: 'Interactive Subtitles',
    previewTranslation: 'Learn naturally by watching real videos every day',
    previewDefinition: 'Video, moving picture — tap any word in a subtitle for instant definitions, pitch accent, and flashcard saving.',
    languagesTitle: 'Built for 5 immersion languages',
    languagesSubtitle: 'Pick your target language to jump straight into curated videos with difficulty grading.',
    featuresTitle: 'Everything in one focused study workspace',
    featuresSubtitle: 'Designed for comprehensible input from first beginner videos to native fluency.',
    featureSubtitlesTitle: 'Dual Subtitles & Tokenization',
    featureSubtitlesDesc: 'Tap any word for instant Furigana, Pinyin, or Romaji tokenization alongside live dual translations.',
    featureAiTitle: 'AI Audio Transcription',
    featureAiDesc: 'No captions on your favorite creator? Generate accurate timed subtitles up to 45 minutes with Whisper AI.',
    featureDictTitle: 'Multi-Source Dictionary & Grammar',
    featureDictDesc: 'Look up definitions, pitch accent, kanji strokes, and sentence grammar patterns without leaving the video.',
    featureSrsTitle: 'SM-2 Flashcards & Cloud Sync',
    featureSrsDesc: 'Save words from subtitles with one tap and review them in an offline-first SRS notebook synced everywhere.',
    downloadEyebrow: 'Voca for iOS & Android (Flutter)',
    downloadTitle: 'Take your study deck anywhere with Voca Mobile.',
    downloadSubtitle: 'Built natively with Flutter and synced with voca.study. Practice flashcards offline, read transcripts, and keep your streak alive on the go.',
    downloadPerkSync: 'Instant Supabase sync across voca.study, iOS, and Android',
    downloadPerkOffline: 'Offline SRS flashcard review and local subtitle cache',
    downloadPerkSameAccount: 'One account for diamonds, Supporter/Founder plans, and learner profiles',
    manageSyncAccount: 'Manage Sync Account',
    useInBrowser: 'Continue on Web',
    downloadComingSoon: 'Coming Soon',
    downloadDirectRelease: 'Flutter Release',
    downloadPlayTitle: 'Google Play Store',
    downloadPlaySubtitle: 'Android phones and tablets (com.voca.voca_flutter)',
    downloadPlayCta: 'Play Store coming soon',
    downloadAppStoreTitle: 'Apple App Store',
    downloadAppStoreSubtitle: 'iPhone and iPad (iOS Flutter app)',
    downloadAppStoreCta: 'App Store coming soon',
    downloadApkTitle: 'Android APK / GitHub Releases',
    downloadApkSubtitle: 'Direct signed Android builds & release notes',
    downloadApkCta: 'View Releases'
  },
  vi: {
    eyebrow: 'Ứng dụng Web & Flutter · 5 Ngôn ngữ',
    heroTitle: 'Làm chủ ngoại ngữ tự nhiên qua những video YouTube bạn yêu thích.',
    heroSubtitle: 'Biến mọi video tiếng Nhật, Trung, Hàn, Anh hoặc Việt thành bài học tương tác với phụ đề song ngữ, tra từ tức thì, phụ đề AI và thẻ nhớ lặp lại ngắt quãng SM-2.',
    launchWebApp: 'Mở ứng dụng Web',
    getMobileApp: 'Tải ứng dụng Mobile',
    freeToStartNote: 'Miễn phí bắt đầu · Đồng bộ từ vựng, chuỗi ngày học và thẻ nhớ giữa Web, iOS & Android',
    previewTag: 'Phụ đề tương tác',
    previewTranslation: 'Học tự nhiên qua video thực tế mỗi ngày',
    previewDefinition: 'Video, hình ảnh động — chạm vào bất kỳ từ nào trên phụ đề để tra nghĩa, trọng âm và lưu thẻ nhớ.',
    languagesTitle: 'Hỗ trợ 5 ngôn ngữ học tập',
    languagesSubtitle: 'Chọn ngôn ngữ mục tiêu để khám phá kho video được phân loại theo trình độ.',
    featuresTitle: 'Trọn bộ công cụ trong một không gian học tập',
    featuresSubtitle: 'Thiết kế tối ưu cho việc tiếp thu tự nhiên từ trình độ sơ cấp đến thành thạo.',
    featureSubtitlesTitle: 'Phụ đề song ngữ & Tách từ',
    featureSubtitlesDesc: 'Chạm vào bất kỳ từ nào để xem Furigana, Pinyin, phiên âm và bản dịch song song theo thời gian thực.',
    featureAiTitle: 'Tạo phụ đề bằng AI Whisper',
    featureAiDesc: 'Video yêu thích chưa có phụ đề? AI tạo phụ đề khớp thời gian chính xác cho video tới 45 phút.',
    featureDictTitle: 'Từ điển đa nguồn & Ngữ pháp',
    featureDictDesc: 'Tra nghĩa, trọng âm, nét chữ Kanji và mẫu câu ngữ pháp ngay khi đang xem video.',
    featureSrsTitle: 'Thẻ nhớ SM-2 & Đồng bộ đám mây',
    featureSrsDesc: 'Lưu từ vựng từ phụ đề chỉ với một chạm và ôn tập ngoại tuyến đồng bộ trên mọi thiết bị.',
    downloadEyebrow: 'Voca cho iOS & Android (Flutter)',
    downloadTitle: 'Mang sổ từ vựng theo bạn mọi lúc với Voca Mobile.',
    downloadSubtitle: 'Xây dựng trên Flutter và đồng bộ trực tiếp với voca.study. Ôn tập thẻ nhớ ngoại tuyến và giữ vững chuỗi học mỗi ngày.',
    downloadPerkSync: 'Đồng bộ tức thì qua Supabase giữa voca.study, iOS và Android',
    downloadPerkOffline: 'Ôn tập thẻ nhớ ngoại tuyến và lưu cache phụ đề cục bộ',
    downloadPerkSameAccount: 'Dùng chung tài khoản cho kim cương, gói thành viên và hồ sơ học tập',
    manageSyncAccount: 'Quản lý tài khoản đồng bộ',
    useInBrowser: 'Tiếp tục trên Web',
    downloadComingSoon: 'Sắp ra mắt',
    downloadDirectRelease: 'Bản phát hành Flutter',
    downloadPlayTitle: 'Google Play Store',
    downloadPlaySubtitle: 'Điện thoại & máy tính bảng Android (com.voca.voca_flutter)',
    downloadPlayCta: 'Sắp có trên Play Store',
    downloadAppStoreTitle: 'Apple App Store',
    downloadAppStoreSubtitle: 'iPhone và iPad (ứng dụng iOS Flutter)',
    downloadAppStoreCta: 'Sắp có trên App Store',
    downloadApkTitle: 'Android APK / GitHub Releases',
    downloadApkSubtitle: 'Tải trực tiếp gói APK đã ký & ghi chú phát hành',
    downloadApkCta: 'Xem bản phát hành'
  },
  ja: {
    eyebrow: 'Web & Flutterアプリ · 5言語対応',
    heroTitle: '好きなYouTube動画で、生きた語学を身につけよう。',
    heroSubtitle: '日本語・中国語・韓国語・英語・ベトナム語のYouTube動画が、インタラクティブな2言語字幕、ワンタップ辞書、AI文字起こし、SM-2暗記カード付きの教材に変わります。',
    launchWebApp: 'Webアプリを開く',
    getMobileApp: 'モバイルアプリを入手',
    freeToStartNote: '無料ですぐ開始 · 単語帳・連続記録・カードをWeb、iOS、Androidで同期',
    previewTag: 'インタラクティブ字幕',
    previewTranslation: '毎日のリアルな動画視聴で自然に身につく',
    previewDefinition: '動画・映像 — 字幕の単語をタップして意味やアクセントを確認し、そのまま暗記カードへ保存できます。',
    languagesTitle: '5つの学習言語に対応',
    languagesSubtitle: '学びたい言語を選んで、レベル判定付きの厳選動画からすぐ始められます。',
    featuresTitle: '学習に必要なすべてをひとつに',
    featuresSubtitle: '入門からネイティブレベルの理解まで、自然なインプットを支える設計です。',
    featureSubtitlesTitle: '2言語字幕 & 形態素トークン化',
    featureSubtitlesDesc: 'ふりがな・ピンイン・ローマ字表示と対訳を並べ、単語をタップするだけで即座に調べられます。',
    featureAiTitle: 'AI音声文字起こし (Whisper)',
    featureAiDesc: '字幕がない動画でも、最大45分の音声を高精度なタイムスタンプ付き字幕に変換します。',
    featureDictTitle: '多ソース辞書 & 文法解説',
    featureDictDesc: '動画を見ながら単語の意味、アクセント、漢字の書き順、文法パターンをすぐ確認できます。',
    featureSrsTitle: 'SM-2フラッシュカード & クラウド同期',
    featureSrsDesc: '字幕から保存した単語をオフライン対応のSRSデッキで復習し、全端末で同期できます。',
    downloadEyebrow: 'iOS & Android版 Voca (Flutter)',
    downloadTitle: 'Vocaモバイルで、いつでもどこでも復習。',
    downloadSubtitle: 'Flutter製のネイティブ体験をvoca.studyと連携。外出先でもオフラインでカード復習や連続記録の維持ができます。',
    downloadPerkSync: 'voca.study、iOS、Android間でSupabaseリアルタイム同期',
    downloadPerkOffline: 'オフラインでのSRS復習とローカル字幕キャッシュ',
    downloadPerkSameAccount: 'ダイヤやプラン、公開プロフィールを1つのアカウントで共有',
    manageSyncAccount: '同期アカウントを管理',
    useInBrowser: 'ブラウザで続ける',
    downloadComingSoon: '近日公開',
    downloadDirectRelease: 'Flutterリリース',
    downloadPlayTitle: 'Google Play ストア',
    downloadPlaySubtitle: 'Androidスマートフォン・タブレット (com.voca.voca_flutter)',
    downloadPlayCta: 'Playストア準備中',
    downloadAppStoreTitle: 'Apple App Store',
    downloadAppStoreSubtitle: 'iPhone / iPad (iOS Flutterアプリ)',
    downloadAppStoreCta: 'App Store準備中',
    downloadApkTitle: 'Android APK / GitHub Releases',
    downloadApkSubtitle: '署名済みAndroid APKとリリース情報',
    downloadApkCta: 'リリースを見る'
  },
  ko: {
    eyebrow: '웹 & Flutter 모바일 앱 · 5개 언어',
    heroTitle: '좋아하는 유튜브 영상으로 살아있는 언어를 익히세요.',
    heroSubtitle: '일본어, 중국어, 한국어, 영어, 베트남어 유튜브 영상을 이중 자막, 원터치 사전, AI 자막 생성, SM-2 간격 반복 플래시카드 학습 공간으로 바꿔 보세요.',
    launchWebApp: '웹 앱 열기',
    getMobileApp: '모바일 앱 받기',
    freeToStartNote: '무료 시작 · 웹, iOS, Android 간 단어장·스트릭·카드 동기화',
    previewTag: '인터랙티브 자막',
    previewTranslation: '매일 실제 영상을 보며 자연스럽게 익히기',
    previewDefinition: '동영상, 영상 — 자막의 단어를 눌러 즉시 뜻과 발음을 확인하고 플래시카드에 저장하세요.',
    languagesTitle: '5개 학습 언어 지원',
    languagesSubtitle: '목표 언어를 선택해 난이도별 추천 영상으로 바로 학습을 시작하세요.',
    featuresTitle: '집중 학습을 위한 모든 도구',
    featuresSubtitle: '입문 단계부터 원어민 수준까지 자연스러운 인풋을 돕습니다.',
    featureSubtitlesTitle: '이중 자막 & 형태소 토큰화',
    featureSubtitlesDesc: '후리가나, 병음, 로마자 표기와 번역 자막을 함께 보고 단어를 눌러 즉시 뜻을 확인하세요.',
    featureAiTitle: 'AI 오디오 자막 생성',
    featureAiDesc: '좋아하는 영상에 자막이 없나요? Whisper AI로 최대 45분 영상의 정확한 타임코드 자막을 만드세요.',
    featureDictTitle: '통합 사전 & 문법 패턴',
    featureDictDesc: '영상을 벗어나지 않고 다중 사전 뜻, 성조/한자 획순, 문장 속 문법을 바로 찾아보세요.',
    featureSrsTitle: 'SM-2 플래시카드 & 클라우드 동기화',
    featureSrsDesc: '자막에서 한 번의 탭으로 단어를 저장하고 오프라인에서도 복습하며 모든 기기와 동기화하세요.',
    downloadEyebrow: 'iOS & Android용 Voca (Flutter)',
    downloadTitle: 'Voca 모바일로 언제 어디서나 이어서 학습하세요.',
    downloadSubtitle: 'Flutter 네이티브 앱으로 voca.study와 완벽하게 연동됩니다. 이동 중에도 오프라인 카드 복습과 연속 학습 기록을 유지하세요.',
    downloadPerkSync: 'voca.study, iOS, Android 간 Supabase 즉시 동기화',
    downloadPerkOffline: '오프라인 SRS 플래시카드 복습 및 로컬 자막 캐시',
    downloadPerkSameAccount: '다이아, 멤버십, 공개 학습자 프로필까지 하나의 계정으로',
    manageSyncAccount: '동기화 계정 관리',
    useInBrowser: '웹에서 계속하기',
    downloadComingSoon: '출시 예정',
    downloadDirectRelease: 'Flutter 릴리스',
    downloadPlayTitle: 'Google Play 스토어',
    downloadPlaySubtitle: 'Android 스마트폰 및 태블릿 (com.voca.voca_flutter)',
    downloadPlayCta: 'Play 스토어 준비 중',
    downloadAppStoreTitle: 'Apple App Store',
    downloadAppStoreSubtitle: 'iPhone 및 iPad (iOS Flutter 앱)',
    downloadAppStoreCta: 'App Store 준비 중',
    downloadApkTitle: 'Android APK / GitHub Releases',
    downloadApkSubtitle: '서명된 Android APK 직접 다운로드 및 릴리스 노트',
    downloadApkCta: '릴리스 보기'
  },
  zh: {
    eyebrow: '网页端 & Flutter 移动应用 · 支持 5 种语言',
    heroTitle: '用你喜欢的 YouTube 视频，沉浸式掌握真实外语。',
    heroSubtitle: '将日语、中文、韩语、英语和越南语 YouTube 视频变成互动课堂：同步双语字幕、点词即查词典、AI 语音转录与 SM-2 间隔记忆闪卡。',
    launchWebApp: '打开网页版',
    getMobileApp: '下载移动应用',
    freeToStartNote: '免费开始 · 在网页端、iOS 与 Android 间无缝同步生词本与连续学习天数',
    previewTag: '互动双语字幕',
    previewTranslation: '每天看真实视频，自然习得地道外语',
    previewDefinition: '视频、影像 — 点击字幕中的任意词汇，即可查看释义、声调并一键收藏到闪卡本。',
    languagesTitle: '支持 5 种核心学习语言',
    languagesSubtitle: '选择目标语言，直接进入带有难度分级的精选视频学习。',
    featuresTitle: '专注语言沉浸的一站式空间',
    featuresSubtitle: '从入门分级到母语流利，为可理解性输入量身打造。',
    featureSubtitlesTitle: '双语字幕与智能分词',
    featureSubtitlesDesc: '实时呈现假名、拼音或罗马音注音与双语译文，点击任意词条即可查看详解。',
    featureAiTitle: 'Whisper AI 语音转字幕',
    featureAiDesc: '心仪视频没有字幕？AI 为最长 45 分钟的视频精准生成时间轴字幕。',
    featureDictTitle: '多源词典与语法识别',
    featureDictDesc: '不离开播放界面，一键查阅词义、音调、汉字笔顺以及句中匹配语法。',
    featureSrsTitle: 'SM-2 闪卡与云端同步',
    featureSrsDesc: '在字幕中一键收藏生词，支持离线复习并在多设备间自动同步学习进度。',
    downloadEyebrow: 'iOS & Android 版 Voca（Flutter）',
    downloadTitle: '使用 Voca 移动端，随时随地巩固词汇。',
    downloadSubtitle: '基于 Flutter 原生构建，并与 voca.study 实时云同步。通勤途中也能离线刷闪卡、读字幕、守住连胜记录。',
    downloadPerkSync: '通过 Supabase 在 voca.study、iOS 与 Android 间即时同步',
    downloadPerkOffline: '离线 SM-2 闪卡复习与本地字幕缓存',
    downloadPerkSameAccount: '同一账号畅享钻石额度、会员方案与学习者主页',
    manageSyncAccount: '管理同步账号',
    useInBrowser: '继续使用网页版',
    downloadComingSoon: '即将推出',
    downloadDirectRelease: 'Flutter 发布',
    downloadPlayTitle: 'Google Play 商店',
    downloadPlaySubtitle: 'Android 手机与平板 (com.voca.voca_flutter)',
    downloadPlayCta: '即将上架 Play 商店',
    downloadAppStoreTitle: 'Apple App Store',
    downloadAppStoreSubtitle: 'iPhone 与 iPad（iOS Flutter 应用）',
    downloadAppStoreCta: '即将上架 App Store',
    downloadApkTitle: 'Android APK / GitHub Releases',
    downloadApkSubtitle: '获取签名版 Android APK 与版本更新说明',
    downloadApkCta: '查看发布版本'
  }
};
