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
  template: `
    <app-bottom-sheet [isOpen]="isOpen()" (closed)="closed.emit()">
      <div class="quick-view">
        <div class="quick-view-header">
          <h2>{{ i18n.t('study.recentlyAdded') }}</h2>
          <span class="count-badge">{{ recentWords().length }}</span>
        </div>

        @if (recentWords().length === 0) {
          <div class="empty-state">
            <app-icon name="bookmark" [size]="32" />
            <p>{{ i18n.t('vocab.noWordsSaved') }}</p>
            <p class="hint">{{ i18n.t('study.tapWordsHint') }}</p>
          </div>
        } @else {
          <ul class="word-list">
            @for (word of recentWords(); track word.id) {
              <li class="word-item">
                <div class="word-main">
                  <span class="word-surface" [class]="'text-' + word.language">
                    {{ word.word }}
                  </span>
                  @if (word.reading || word.pinyin || word.romanization) {
                    <span class="word-reading">
                      {{ word.reading || word.pinyin || word.romanization }}
                    </span>
                  }
                </div>
                <div class="word-meaning">{{ word.meaning }}</div>
                <div class="word-meta">
                  <span class="level-badge" [class]="'level--' + word.level">
                    {{ word.level }}
                  </span>
                  <select 
                    class="level-select"
                    [value]="word.level"
                    (change)="updateLevel(word.id, $event)"
                  >
                    <option value="new">{{ i18n.t('vocab.new') | titlecase }}</option>
                    <option value="learning">{{ i18n.t('vocab.learning') | titlecase }}</option>
                    <option value="known">{{ i18n.t('vocab.known') | titlecase }}</option>
                    <option value="ignored">{{ i18n.t('vocab.ignored') }}</option>
                  </select>
                </div>
              </li>
            }
          </ul>
        }
      </div>
    </app-bottom-sheet>
  `,
  styles: [`
    .quick-view {
      padding: var(--space-md);
      padding-bottom: calc(var(--space-lg) + env(safe-area-inset-bottom, 0px));
      max-height: 60vh;
    }

    .quick-view-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      margin-bottom: var(--space-md);
    }

    .quick-view-header h2 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }

    .count-badge {
      padding: 2px 8px;
      background: var(--accent-primary);
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 100px;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-xl);
      text-align: center;
      color: var(--text-muted);
    }

    .empty-state p {
      margin: 0;
      color: var(--text-secondary);
    }

    .empty-state .hint {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    .word-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .word-item {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-sm);
      padding: var(--space-sm);
      background: var(--bg-secondary);
      border-radius: var(--border-radius);
    }

    .word-main {
      display: flex;
      align-items: baseline;
      gap: var(--space-xs);
    }

    .word-surface {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .word-reading {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    .word-meaning {
      flex: 1;
      font-size: 0.875rem;
      color: var(--text-secondary);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 100px;
    }

    .word-meta {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }

    .level-badge {
      display: none;
    }

    .level-select {
      padding: 4px 24px 4px 8px;
      font-size: 0.75rem;
      height: auto;
      min-height: unset;
      border-radius: 4px;
    }

    .level--new {
      background: var(--word-new);
      color: var(--word-new-text);
    }

    .level--learning {
      background: var(--word-learning);
      color: var(--word-learning-text);
    }

    .level--known {
      background: var(--word-known);
      color: var(--word-known-text);
    }

    /* Landscape phones: more compact layout */
    @media (max-height: 500px) and (orientation: landscape) {
      .quick-view {
        padding: var(--space-sm) var(--space-md);
        padding-bottom: var(--space-md);
        max-height: calc(100vh - 120px);
      }

      .quick-view-header {
        margin-bottom: var(--space-sm);
      }

      .quick-view-header h2 {
        font-size: 1rem;
      }

      .empty-state {
        padding: var(--space-md);
        gap: var(--space-xs);
      }

      .empty-state p {
        font-size: 0.875rem;
      }

      .word-list {
        gap: var(--space-xs);
      }

      .word-item {
        padding: var(--space-xs) var(--space-sm);
      }

      .word-surface {
        font-size: 1rem;
      }

      .word-meaning {
        font-size: 0.8125rem;
      }
    }
  `]
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
