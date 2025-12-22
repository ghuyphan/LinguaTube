import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DictionaryPanelComponent } from '../../components/dictionary-panel/dictionary-panel.component';
import { VocabularyListComponent } from '../../components/vocabulary-list/vocabulary-list.component';

@Component({
  selector: 'app-dictionary-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DictionaryPanelComponent,
    VocabularyListComponent
  ],
  template: `
    <div class="dictionary-view">
      <app-dictionary-panel />
      
      <div class="vocab-section mobile-only">
        <app-vocabulary-list />
      </div>
    </div>
  `,
  styles: [`
    .dictionary-view {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
      max-width: 600px;
      margin: 0 auto;
    }

    .vocab-section {
      /* Gap from parent handles spacing */
    }

    .mobile-only {
      display: none;
    }

    @media (max-width: 768px) {
      .mobile-only {
        display: block;
      }
      
      .dictionary-view {
        gap: var(--space-sm);
      }
    }
  `]
})
export class DictionaryPageComponent { }
