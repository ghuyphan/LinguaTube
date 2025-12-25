// Subtitle models
export interface SubtitleCue {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
  tokens?: Token[];
}

export interface Token {
  surface: string;        // The word as it appears
  reading?: string;       // Hiragana reading (Japanese)
  pinyin?: string;        // Pinyin (Chinese)
  romanization?: string;  // Romanization (Korean)
  baseForm?: string;      // Dictionary form
  partOfSpeech?: string;  // Noun, verb, etc.
  hasKanji?: boolean;     // Whether token contains kanji (Japanese)
}

// Vocabulary models
export interface VocabularyItem {
  id: string;
  word: string;
  reading?: string;
  pinyin?: string;
  romanization?: string;  // Korean romanization
  meaning: string;
  language: 'ja' | 'zh' | 'ko' | 'en';
  level: WordLevel;
  examples: string[];
  addedAt: Date;
  updatedAt?: Date;           // Last modification time for sync
  lastReviewedAt?: Date;
  reviewCount: number;

  // SRS fields (SM-2 algorithm)
  easeFactor: number;        // Default 2.5, min 1.3
  interval: number;          // Days until next review
  nextReviewDate?: Date;     // When to show again
  repetitions: number;       // Times correctly recalled in a row

  // Sentence mining fields
  sourceSentence?: string;   // Context sentence where word was found
  sourceVideoId?: string;    // YouTube video ID
  sourceTimestamp?: number;  // Time in video (seconds)
}

export type WordLevel = 'new' | 'learning' | 'known' | 'ignored';

// Dictionary models
export interface DictionaryEntry {
  word: string;
  reading?: string;
  pinyin?: string;
  romanization?: string;  // Korean romanization
  meanings: DictionaryMeaning[];
  partOfSpeech?: string[];
  jlptLevel?: string;
  hskLevel?: number;
  topikLevel?: number;    // Korean proficiency level
}

export interface DictionaryMeaning {
  definition: string;
  examples?: string[];
  tags?: string[];
}

// Video models
export interface VideoInfo {
  id: string;
  title: string;
  thumbnail?: string;
  duration?: number;
  channel?: string;
}

// App state
export interface AppState {
  currentLanguage: 'ja' | 'zh' | 'ko' | 'en';
  currentVideo?: VideoInfo;
  subtitles: SubtitleCue[];
  vocabulary: VocabularyItem[];
  isPlaying: boolean;
  currentTime: number;
}

// Settings
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'ja' | 'zh' | 'ko' | 'en';
  showFurigana: boolean;
  showPinyin: boolean;
  autoAdvance: boolean;
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  playbackSpeed: number;
  sidebarCollapsed: boolean;
}
