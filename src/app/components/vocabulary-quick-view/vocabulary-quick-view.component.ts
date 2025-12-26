import { Component, inject, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { VocabularyService, SettingsService, I18nService } from '../../services';

@Component({
  selector: 'app-vocabulary-quick-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, BottomSheetComponent],
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

  updateLevel(id: string, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const level = select.value as 'new' | 'learning' | 'known' | 'ignored';
    this.vocab.updateLevel(id, level);
  }
}
