import { Component, inject, input, output, signal, effect, ChangeDetectionStrategy, PLATFORM_ID, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { DictionaryService, VocabularyService, SettingsService, TranslationService, I18nService } from '../../services';
import { Token, DictionaryEntry } from '../../models';

@Component({
  selector: 'app-word-popup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent, BottomSheetComponent],
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

  selectedWord = input<Token | null>(null);
  currentSentence = input<string>('');
  closed = output<void>();

  entry = signal<DictionaryEntry | null>(null);
  isVisible = signal(false);
  isSaved = signal(false);

  // Translation state
  targetLang = signal(this.getDefaultTargetLang());
  translatedDefinitions = signal<Map<number, { text: string; lang: string }>>(new Map());
  translatingIndices = signal<Set<number>>(new Set());

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
        // Reset translations when word changes
        this.translatedDefinitions.set(new Map());
        this.translatingIndices.set(new Set());
        this.lookupWord(word.surface);
      }
    });
  }

  lookupWord(word: string): void {
    const lang = this.settings.settings().language;
    this.dictionary.lookup(word, lang).subscribe(result => {
      this.entry.set(result);
    });
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

  translateDefinition(index: number, text: string): void {
    // Skip if already translated to current target language
    const existing = this.translatedDefinitions().get(index);
    if (existing && existing.lang === this.targetLang()) return;

    this.toggleTranslating(index, true);

    const targetLang = this.targetLang();
    this.translation.translate(text, 'en', targetLang).subscribe(translatedText => {
      if (translatedText) {
        this.translatedDefinitions.update(map => {
          const newMap = new Map(map);
          newMap.set(index, { text: translatedText, lang: targetLang });
          return newMap;
        });
      }
      this.toggleTranslating(index, false);
    });
  }

  isTranslating(index: number): boolean {
    return this.translatingIndices().has(index);
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
    this.isVisible.set(false);
    this.entry.set(null);
    this.closed.emit();
  }

  close(): void {
    this.onSheetClosed();
  }

  ngOnDestroy(): void {
    // Cleanup handled by BottomSheetComponent
  }
}
