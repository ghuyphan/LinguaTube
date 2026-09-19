import { Component, inject, signal, computed, ChangeDetectionStrategy, OnDestroy, effect, input, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { OptionPickerComponent, OptionItem } from '../../../shared/components/option-picker/option-picker.component';
import { DictionaryService } from '../dictionary.service';
import { VocabularyService } from '../../vocabulary';
import { SettingsService, I18nService, AudioService, ToastService } from '../../../core/services';
import { GrammarService } from '../../../services';
import { DictionaryEntry, WordLevel, SupportedLearningLanguage } from '../../../models';
import { GrammarPattern, SupportedGrammarLang } from '../../../models/grammar.model';

@Component({
  selector: 'app-dictionary-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent, OptionPickerComponent],
  templateUrl: './dictionary-panel.component.html',
  styleUrl: './dictionary-panel.component.scss'
})
export class DictionaryPanelComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);

  dictionary = inject(DictionaryService);
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  toast = inject(ToastService);
  i18n = inject(I18nService);
  grammar = inject(GrammarService);
  audioService = inject(AudioService);

  // Embedded mode (e.g. inside DictionaryPage tabs)
  embedded = input<boolean>(false);

  searchQuery = '';
  lastQuery = '';
  entries = signal<DictionaryEntry[]>([]);
  activeEntryIndex = signal<number>(0);
  currentEntry = computed(() => this.entries()[this.activeEntryIndex()] || null);

  grammarMatches = signal<GrammarPattern[]>([]);

  isLoading = signal(false);
  hasSearched = signal(false);
  lookupError = signal<string | null>(null);

  // Audio Playback state
  isPlayingAudio = computed(() => {
    const entry = this.currentEntry();
    return entry ? this.audioService.isPlaying(entry.word) : false;
  });

  // Active query subscription to cancel in-flight requests
  private lookupSubscription: Subscription | null = null;
  private currentSearchId = 0;

  // Reactive check against vocabulary service
  isSaved = computed(() => {
    const entry = this.currentEntry();
    if (!entry) return false;
    return this.vocab.hasWord(entry.word)
      || (entry.reading ? this.vocab.hasWord(entry.reading) : false);
  });

  savedWordLevel = computed(() => {
    const entry = this.currentEntry();
    if (!entry) return null;
    return this.vocab.getWordLevel(entry.word)
      || (entry.reading ? this.vocab.getWordLevel(entry.reading) : null)
      || 'new';
  });

  recentSearches = this.dictionary.recentSearches;

  constructor() {
    // 1. Load language-scoped recent searches
    const currentLang = this.settings.settings().language;
    this.dictionary.loadRecentSearches(currentLang);

    // 2. Restore previous isolated dictionary screen search if any
    const savedQuery = this.dictionary.screenQuery();
    const savedEntries = this.dictionary.screenEntries();
    if (savedQuery && savedEntries.length > 0) {
      this.searchQuery = savedQuery;
      this.lastQuery = savedQuery;
      this.entries.set(savedEntries);
      this.hasSearched.set(true);
    } else if (savedQuery) {
      this.searchQuery = savedQuery;
      this.lastQuery = savedQuery;
      setTimeout(() => this.search(savedQuery), 0);
    }

    // Effect: when learning language changes, reload recent searches and reset search state
    let lastHandledLang = '';
    effect(() => {
      const lang = this.settings.settings().language;
      this.dictionary.loadRecentSearches(lang);

      if (lastHandledLang && lastHandledLang !== lang) {
        this.lookupSubscription?.unsubscribe();
        this.lookupSubscription = null;
        this.searchQuery = '';
        this.lastQuery = '';
        this.entries.set([]);
        this.grammarMatches.set([]);
        this.hasSearched.set(false);
        this.lookupError.set(null);
        this.dictionary.clearScreenState();
      }
      lastHandledLang = lang;
    });

    // Effect: preload audio into RAM when currentEntry changes for 0ms playback
    effect(() => {
      const entry = this.currentEntry();
      if (entry && isPlatformBrowser(this.platformId)) {
        const lang = this.settings.settings().language as SupportedLearningLanguage;
        void this.audioService.preloadWord(entry.word, lang);
      }
    });
  }

  ngOnDestroy(): void {
    this.lookupSubscription?.unsubscribe();
    this.stopAudio();
  }

  search(termOverride?: string): void {
    const query = (termOverride !== undefined ? termOverride : this.searchQuery).trim();
    if (!query) return;

    this.searchQuery = query;
    this.lastQuery = query;
    this.isLoading.set(true);
    this.hasSearched.set(true);
    this.lookupError.set(null);
    this.stopAudio();

    // Cancel any previous in-flight lookup to prevent race conditions
    this.lookupSubscription?.unsubscribe();
    const searchId = ++this.currentSearchId;

    // Update isolated screen query
    this.dictionary.screenQuery.set(query);

    const lang = this.settings.settings().language;
    this.addToRecent(query);

    // 1. Search Dictionary Entries
    this.lookupSubscription = this.dictionary.lookupEntries(query, lang).subscribe({
      next: (entries) => {
        this.entries.set(entries);
        this.dictionary.screenEntries.set(entries);
        this.activeEntryIndex.set(0);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.entries.set([]);
        this.dictionary.screenEntries.set([]);
        this.isLoading.set(false);
        this.lookupError.set(err?.message || 'LOOKUP_ERROR');
      }
    });

    // 2. Search Grammar Patterns in parallel
    this.grammar.searchPatterns(query, lang as SupportedGrammarLang)
      .then(matches => {
        if (this.currentSearchId === searchId) {
          this.grammarMatches.set(matches);
        }
      })
      .catch(() => {
        if (this.currentSearchId === searchId) {
          this.grammarMatches.set([]);
        }
      });
  }

  selectEntry(index: number): void {
    this.stopAudio();
    this.activeEntryIndex.set(index);
  }

  clearSearch(): void {
    this.currentSearchId++;
    this.lookupSubscription?.unsubscribe();
    this.stopAudio();
    this.searchQuery = '';
    this.lastQuery = '';
    this.entries.set([]);
    this.grammarMatches.set([]);
    this.hasSearched.set(false);
    this.lookupError.set(null);
    this.dictionary.screenQuery.set('');
    this.dictionary.screenEntries.set([]);
  }

  searchRecent(term: string): void {
    this.search(term);
  }

  saveWord(): void {
    const entry = this.currentEntry();
    if (!entry) return;

    const lang = this.settings.settings().language;
    this.vocab.addFromDictionary(entry, lang);
    const msg = this.i18n.t('vocab.saveSuccess', { word: entry.word }) || `Added "${entry.word}" to vocabulary`;
    this.toast.success(msg);
  }

  // Level picker state
  readonly levelPickerOpen = signal(false);

  readonly levelOptions = computed<OptionItem[]>(() => [
    { value: 'new', label: this.i18n.t('vocab.new') || 'New', icon: 'plus-circle', color: 'new' },
    { value: 'learning', label: this.i18n.t('vocab.learning') || 'Learning', icon: 'brain', color: 'learning' },
    { value: 'known', label: this.i18n.t('vocab.known') || 'Known', icon: 'check-circle', color: 'known' },
    { value: 'ignored', label: this.i18n.t('vocab.ignored') || 'Ignored', icon: 'eye-off', color: 'ignored' },
  ]);

  openLevelPicker(event?: Event): void {
    event?.stopPropagation();
    this.levelPickerOpen.set(true);
  }

  onLevelSelected(newLevel: string): void {
    const entry = this.currentEntry();
    if (entry) {
      const wordItem = this.vocab.findWord(entry.word);
      if (wordItem && wordItem.level !== newLevel) {
        this.vocab.updateLevel(wordItem.id, newLevel as WordLevel);
      }
    }
    this.levelPickerOpen.set(false);
  }

  playAudio(entry?: DictionaryEntry | null, event?: Event): void {
    event?.stopPropagation();
    const target = entry || this.currentEntry();
    if (!target) return;

    const lang = this.settings.settings().language as SupportedLearningLanguage;
    void this.audioService.playWord(target.word, lang, target.audio);
  }

  private stopAudio(): void {
    this.audioService.stopAudio();
  }

  private addToRecent(term: string): void {
    const lang = this.settings.settings().language;
    this.dictionary.addToRecentSearches(term, lang);
  }

  removeRecentSearch(term: string, event: Event): void {
    event.stopPropagation();
    const lang = this.settings.settings().language;
    this.dictionary.removeRecentSearch(term, lang);
  }

  clearAllRecentSearches(): void {
    const lang = this.settings.settings().language;
    this.dictionary.clearAllRecentSearches(lang);
  }
}
