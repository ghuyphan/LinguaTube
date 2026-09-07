import { VocabularyItem, WordLevel, DictionaryEntry, VocabularyStats } from '../../models';

export interface IVocabularyRepository {
    // Queries
    getVocabulary(): VocabularyItem[];
    findWord(word: string): VocabularyItem | undefined;
    hasWord(word: string): boolean;
    getStats(): VocabularyStats;

    // Mutations
    addWord(word: string, meaning: string, language: 'ja' | 'zh' | 'ko' | 'en', reading?: string, pinyin?: string, romanization?: string, sourceSentence?: string, audio?: string, sourceVideoId?: string, sourceTimestamp?: number): Promise<VocabularyItem>;
    addFromDictionary(entry: DictionaryEntry, language: 'ja' | 'zh' | 'ko' | 'en', sourceSentence?: string, sourceVideoId?: string, sourceTimestamp?: number): Promise<VocabularyItem>;

    updateLevel(id: string, level: WordLevel): Promise<void>;
    updateMeaning(id: string, meaning: string): Promise<void>;
    addExample(id: string, example: string): Promise<void>;

    // SRS
    markReviewed(id: string, quality: number): Promise<void>;

    // Management
    deleteWord(id: string): Promise<void>;
    clear(): Promise<void>;

    // Data Exchange
    importFromJSON(json: string): Promise<void>;
    exportToJSON(): string;

    // Synchronization
    syncWithRemote(): Promise<void>;
}
