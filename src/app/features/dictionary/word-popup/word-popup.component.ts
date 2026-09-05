import { Component, inject, input, output, signal, effect, computed, ChangeDetectionStrategy, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { OptionPickerComponent, OptionItem } from '../../../shared/components/option-picker/option-picker.component';
import { DictionaryService, VocabularyService, SettingsService, TranslationService, I18nService, SubtitleService } from '../../../services';
import { Token, DictionaryEntry } from '../../../models';

@Component({
  selector: 'app-word-popup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent, BottomSheetComponent, OptionPickerComponent],
  templateUrl: './word-popup.component.html',
  styleUrl: './word-popup.component.scss'
})
export class WordPopupComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);

  dictionary = inject(DictionaryService);
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  translation = inject(TranslationService);
  i18n = inject(I18nService);
  subtitles = inject(SubtitleService);

  selectedWord = input<Token | null>(null);
  currentSentence = input<string>('');
  closed = output<void>();

  entry = signal<DictionaryEntry | null>(null);
  isVisible = signal(false);
  isSaved = signal(false);

  // Error state
  lookupError = signal<string | null>(null);

  // Translation state
  targetLang = signal(this.getDefaultTargetLang());
  translatedDefinitions = signal<Map<number, { text: string; lang: string }>>(new Map());
  translatingIndices = signal<Set<number>>(new Set());
  translationErrors = signal<Set<number>>(new Set());

  // Picker state
  langPickerOpen = signal(false);
  levelPickerOpen = signal(false);

  // Track active API call for cancellation
  private lookupSubscription: Subscription | null = null;

  // Computed options for pickers
  langOptions = computed<OptionItem[]>(() =>
    this.translation.getSupportedTargetLanguages().map(lang => ({
      value: lang.code,
      label: lang.name,
      icon: lang.flag
    }))
  );

  levelOptions = computed<OptionItem[]>(() => [
    { value: 'new', label: this.i18n.t('vocab.new') },
    { value: 'learning', label: this.i18n.t('vocab.learning') },
    { value: 'known', label: this.i18n.t('vocab.known') },
    { value: 'ignored', label: this.i18n.t('vocab.ignored') }
  ]);

  currentLevel = computed(() => {
    const word = this.selectedWord();
    if (!word) return 'new';
    return this.vocab.getWordLevel(word.surface) || 'new';
  });

  // Translate-all loading state
  isTranslatingAll = computed(() => {
    const meanings = this.entry()?.meanings;
    if (!meanings) return false;
    const translating = this.translatingIndices();
    return meanings.length > 1 && meanings.some((_, i) => translating.has(i));
  });

  private getDefaultTargetLang(): string {
    const uiLang = this.i18n.currentLanguage();
    const supported = this.translation.getSupportedTargetLanguages().map(l => l.code);
    return supported.includes(uiLang) ? uiLang : 'vi';
  }

  constructor() {
    // Update targetLang when UI language changes
    effect(() => {
      const uiLang = this.i18n.currentLanguage();
      const supported = this.translation.getSupportedTargetLanguages().map(l => l.code);
      if (supported.includes(uiLang)) {
        this.targetLang.set(uiLang);
      }
    });

    effect(() => {
      const word = this.selectedWord();
      if (word) {
        this.isVisible.set(true);
        this.isSaved.set(this.vocab.hasWord(word.surface));
        // Reset all state when word changes
        this.translatedDefinitions.set(new Map());
        this.translatingIndices.set(new Set());
        this.translationErrors.set(new Set());
        this.lookupError.set(null);
        this.lookupWord(word.surface);
      }
    });
  }

  lookupWord(word: string): void {
    // Cancel any in-flight lookup
    this.lookupSubscription?.unsubscribe();
    this.lookupError.set(null);

    const lang = this.subtitles.loadedLanguage() || this.settings.settings().language;
    this.lookupSubscription = this.dictionary.lookup(word, lang).subscribe({
      next: result => {
        this.entry.set(result);
      },
      error: () => {
        this.lookupError.set('LOOKUP_FAILED');
        this.entry.set(null);
      }
    });
  }

  retryLookup(): void {
    const word = this.selectedWord();
    if (word) {
      this.lookupWord(word.surface);
    }
  }

  saveWord(): void {
    const word = this.selectedWord();
    const entryData = this.entry();
    const lang = this.settings.settings().language;
    const sentence = this.currentSentence();

    if (!word) return;

    if (entryData) {
      this.vocab.addFromDictionary(entryData, lang, sentence);
    } else {
      this.vocab.addWord(word.surface, '', lang, word.reading, word.pinyin, word.romanization, sentence);
    }

    this.isSaved.set(true);
  }

  updateLevel(event: Event): void {
    const word = this.selectedWord();
    if (!word) return;

    const select = event.target as HTMLSelectElement;
    const level = select.value as 'new' | 'learning' | 'known' | 'ignored';
    const item = this.vocab.findWord(word.surface);

    if (item) {
      this.vocab.updateLevel(item.id, level);
    }
  }

  onLangSelected(value: string): void {
    this.targetLang.set(value);
    this.langPickerOpen.set(false);
  }

  onLevelSelected(value: string): void {
    const word = this.selectedWord();
    if (!word) return;

    const level = value as 'new' | 'learning' | 'known' | 'ignored';
    const item = this.vocab.findWord(word.surface);

    if (item) {
      this.vocab.updateLevel(item.id, level);
    }
    this.levelPickerOpen.set(false);
  }

  getSelectedLangFlag(): string {
    const lang = this.translation.getSupportedTargetLanguages().find(l => l.code === this.targetLang());
    return lang ? lang.flag : '🌐';
  }

  translateAll(): void {
    const meanings = this.entry()?.meanings;
    if (!meanings) return;

    meanings.forEach((meaning, index) => {
      this.translateDefinition(index, meaning.definition);
    });
  }

  translateDefinition(index: number, text: string): void {
    // Skip if already translated to current target language
    const existing = this.translatedDefinitions().get(index);
    if (existing && existing.lang === this.targetLang()) return;

    // Clear any previous error for this index
    this.translationErrors.update(set => {
      const newSet = new Set(set);
      newSet.delete(index);
      return newSet;
    });

    this.toggleTranslating(index, true);

    const targetLang = this.targetLang();
    this.translation.translateBatch([text], 'en', targetLang).subscribe({
      next: results => {
        const translatedText = results[0];
        if (translatedText) {
          this.translatedDefinitions.update(map => {
            const newMap = new Map(map);
            newMap.set(index, { text: translatedText, lang: targetLang });
            return newMap;
          });
        }
        this.toggleTranslating(index, false);
      },
      error: () => {
        this.toggleTranslating(index, false);
        this.translationErrors.update(set => {
          const newSet = new Set(set);
          newSet.add(index);
          return newSet;
        });
      }
    });
  }

  isTranslating(index: number): boolean {
    return this.translatingIndices().has(index);
  }

  hasTranslationError(index: number): boolean {
    return this.translationErrors().has(index);
  }

  toggleTranslating(index: number, state: boolean): void {
    this.translatingIndices.update(set => {
      const newSet = new Set(set);
      if (state) newSet.add(index);
      else newSet.delete(index);
      return newSet;
    });
  }

  getTranslation(index: number): string | undefined {
    return this.translatedDefinitions().get(index)?.text;
  }

  getTranslationLang(index: number): string {
    return this.translatedDefinitions().get(index)?.lang || this.targetLang();
  }

  getFlag(code: string): string {
    const lang = this.translation.getSupportedTargetLanguages().find(l => l.code === code);
    return lang ? lang.flag : '🌐';
  }

  onSheetClosed(): void {
    // Cancel in-flight API request if popup closes while fetching
    this.lookupSubscription?.unsubscribe();
    this.lookupSubscription = null;

    this.isVisible.set(false);
    this.entry.set(null);
    this.closed.emit();
  }

  close(): void {
    this.onSheetClosed();
  }

  ngOnDestroy(): void {
    this.lookupSubscription?.unsubscribe();
  }
}
