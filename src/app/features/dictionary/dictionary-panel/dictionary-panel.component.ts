import { Component, inject, signal, computed, ChangeDetectionStrategy, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { DictionaryService } from '../dictionary.service';
import { VocabularyService } from '../../vocabulary';
import { SettingsService, I18nService } from '../../../core/services';
import { GrammarService } from '../../../services';
import { DictionaryEntry, WordLevel } from '../../../models';
import { GrammarPattern, SupportedGrammarLang } from '../../../models/grammar.model';

@Component({
  selector: 'app-dictionary-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './dictionary-panel.component.html',
  styleUrl: './dictionary-panel.component.scss'
})
export class DictionaryPanelComponent implements OnDestroy {
  dictionary = inject(DictionaryService);
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  i18n = inject(I18nService);
  grammar = inject(GrammarService);

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
  isPlayingAudio = signal(false);
  private activeAudioElement: HTMLAudioElement | null = null;

  // Active query subscription to cancel in-flight requests
  private lookupSubscription: Subscription | null = null;

  // Reactive check against vocabulary service
  isSaved = computed(() => {
    const entry = this.currentEntry();
    return entry ? this.vocab.hasWord(entry.word) : false;
  });

  savedWordLevel = computed(() => {
    const entry = this.currentEntry();
    return entry ? this.vocab.getWordLevel(entry.word) : null;
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

    // Effect: when learning language changes, reload recent searches
    effect(() => {
      const lang = this.settings.settings().language;
      this.dictionary.loadRecentSearches(lang);
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
      .then(matches => this.grammarMatches.set(matches))
      .catch(() => this.grammarMatches.set([]));
  }

  selectEntry(index: number): void {
    this.stopAudio();
    this.activeEntryIndex.set(index);
  }

  clearSearch(): void {
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
  }

  cycleLevel(event?: Event): void {
    event?.stopPropagation();
    const entry = this.currentEntry();
    if (!entry) return;

    const currentLevel = this.savedWordLevel();
    if (!currentLevel) {
      this.saveWord();
      return;
    }

    const cycleOrder: WordLevel[] = ['new', 'learning', 'known', 'ignored'];
    const nextIndex = (cycleOrder.indexOf(currentLevel) + 1) % cycleOrder.length;
    const nextLevel = cycleOrder[nextIndex];

    const wordItem = this.vocab.findWord(entry.word);
    if (wordItem) {
      this.vocab.updateLevel(wordItem.id, nextLevel);
    }
  }

  playAudio(audioUrl?: string, event?: Event): void {
    event?.stopPropagation();
    if (!audioUrl) return;

    if (this.isPlayingAudio()) {
      this.stopAudio();
      return;
    }

    try {
      this.activeAudioElement = new Audio(audioUrl);
      this.isPlayingAudio.set(true);

      this.activeAudioElement.onended = () => {
        this.isPlayingAudio.set(false);
        this.activeAudioElement = null;
      };

      this.activeAudioElement.onerror = () => {
        this.isPlayingAudio.set(false);
        this.activeAudioElement = null;
      };

      this.activeAudioElement.play().catch(() => {
        this.isPlayingAudio.set(false);
        this.activeAudioElement = null;
      });
    } catch {
      this.isPlayingAudio.set(false);
      this.activeAudioElement = null;
    }
  }

  private stopAudio(): void {
    if (this.activeAudioElement) {
      this.activeAudioElement.pause();
      this.activeAudioElement = null;
    }
    this.isPlayingAudio.set(false);
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
