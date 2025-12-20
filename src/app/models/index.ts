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
  baseForm?: string;      // Dictionary form
  partOfSpeech?: string;  // Noun, verb, etc.
}

// Vocabulary models
export interface VocabularyItem {
  id: string;
  word: string;
  reading?: string;
  pinyin?: string;
  meaning: string;
  language: 'ja' | 'zh';
  level: WordLevel;
  examples: string[];
  addedAt: Date;
  lastReviewedAt?: Date;
  reviewCount: number;
}

export type WordLevel = 'new' | 'learning' | 'known' | 'ignored';

// Dictionary models
export interface DictionaryEntry {
  word: string;
  reading?: string;
  pinyin?: string;
  meanings: DictionaryMeaning[];
  partOfSpeech?: string[];
  jlptLevel?: string;
  hskLevel?: number;
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
  currentLanguage: 'ja' | 'zh';
  currentVideo?: VideoInfo;
  subtitles: SubtitleCue[];
  vocabulary: VocabularyItem[];
  isPlaying: boolean;
  currentTime: number;
}

// Settings
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'ja' | 'zh';
  showFurigana: boolean;
  showPinyin: boolean;
  autoAdvance: boolean;
  fontSize: 'small' | 'medium' | 'large';
  playbackSpeed: number;
}
