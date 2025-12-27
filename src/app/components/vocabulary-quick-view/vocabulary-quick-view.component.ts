import { Component, inject, input, output, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { OptionPickerComponent, OptionItem } from '../option-picker/option-picker.component';
import { VocabularyService, SettingsService, I18nService } from '../../services';

@Component({
  selector: 'app-vocabulary-quick-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, BottomSheetComponent, OptionPickerComponent],
  templateUrl: './vocabulary-quick-view.component.html',
  styleUrl: './vocabulary-quick-view.component.scss'
})
export class VocabularyQuickViewComponent {
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  i18n = inject(I18nService);

  isOpen = input<boolean>(false);
  closed = output<void>();

  recentWords = computed(() => {
    const lang = this.settings.settings().language;
    const allWords = this.vocab.getByLanguage(lang);
    // Sort by addedAt descending, take first 20
    return [...allWords]
      .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
      .slice(0, 20);
  });

  // Level picker state
  levelPickerOpen = signal(false);
  editingItemId = signal<string | null>(null);

  // Options for level picker
  levelOptions = computed<OptionItem[]>(() => [
    { value: 'new', label: this.i18n.t('vocab.new') },
    { value: 'learning', label: this.i18n.t('vocab.learning') },
    { value: 'known', label: this.i18n.t('vocab.known') },
    { value: 'ignored', label: this.i18n.t('vocab.ignored') }
  ]);

  openLevelPicker(itemId: string): void {
    this.editingItemId.set(itemId);
    this.levelPickerOpen.set(true);
  }

  onLevelChange(value: string): void {
    const itemId = this.editingItemId();
    if (itemId) {
      this.vocab.updateLevel(itemId, value as 'new' | 'learning' | 'known' | 'ignored');
    }
    this.levelPickerOpen.set(false);
    this.editingItemId.set(null);
  }

  getEditingItemLevel(): string {
    const itemId = this.editingItemId();
    if (!itemId) return 'new';
    const item = this.vocab.vocabulary().find(w => w.id === itemId);
    return item?.level || 'new';
  }

  updateLevel(id: string, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const level = select.value as 'new' | 'learning' | 'known' | 'ignored';
    this.vocab.updateLevel(id, level);
  }
}
