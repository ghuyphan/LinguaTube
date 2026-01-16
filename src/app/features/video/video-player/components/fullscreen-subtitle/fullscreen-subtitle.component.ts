import {
    Component,
    ChangeDetectionStrategy,
    input,
    output,
    inject,
    computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtitleCue, Token } from '../../../../../models';
import { SettingsService, VocabularyService } from '../../../../../services';

/**
 * FullscreenSubtitleComponent
 * 
 * Renders large, interactive subtitles in fullscreen mode.
 * Handles tokenization display, word lookup implementation details,
 * and dual subtitle rendering.
 */
@Component({
    selector: 'app-fullscreen-subtitle',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="fullscreen-subtitle" 
      [class.controls-visible]="areControlsVisible()" 
      [ngClass]="fontSizeClass()"
      [class.popup-open]="fsPopupVisible()" 
      [class.has-content]="!!currentCue()">
      
      @if (currentCue(); as cue) {
        <div class="fs-subtitle-inner">
          <div class="fs-subtitle-text" [class]="'text-' + language()">
            <!-- Direct text display if tokenizing -->
            @if (isTokenizing()) {
              <span class="fs-word">{{ cue.text }}</span>
            } @else { 
              <!-- Interactive token display -->
              @for (token of tokens(); track $index) {
                @if (token.isPunctuation) {
                  <span class="fs-word fs-word--punctuation">{{ token.surface }}</span>
                } @else {
                  <button type="button"
                    class="fs-word" 
                    [class.fs-word--saved]="vocab.hasWord(token.surface)"
                    [class.fs-word--grammar]="isGrammarToken($index)" 
                    [attr.aria-label]="'Look up ' + token.surface"
                    (click)="onWordClick(token, cue.text, $index, $event)">
                    
                    @if (showReading() && getReading(token)) {
                      <ruby>{{ token.surface }}<rt>{{ getReading(token) }}</rt></ruby>
                    } @else {
                      {{ token.surface }}
                    }
                  </button>
                }
              } 
            }
          </div>

          <!-- Dual Subtitles -->
          @if (showDualSubtitles()) {
            @if (isDualSubLoading()) {
              <div class="fs-subtitle-translation skeleton-text"></div>
            } @else if (currentTranslation()) {
              <div class="fs-subtitle-translation">
                {{ currentTranslation() }}
              </div>
            }
          }
        </div>
      }
    </div>
  `,
    styleUrl: './fullscreen-subtitle.component.scss'
})
export class FullscreenSubtitleComponent {
    vocab = inject(VocabularyService);
    settings = inject(SettingsService);

    // Inputs
    currentCue = input.required<SubtitleCue | null>();
    tokens = input<Token[]>([]);
    isTokenizing = input<boolean>(false);
    areControlsVisible = input<boolean>(false);
    fsPopupVisible = input<boolean>(false);
    fontSizeClass = input<string>('text-medium');

    // Dual Subtitle Inputs
    showDualSubtitles = input<boolean>(false);
    isDualSubLoading = input<boolean>(false);
    currentTranslation = input<string | null>(null);

    // Grammar Inputs
    grammarMatches = input<any[]>([]); // Using any[] to avoid strict type dependency cycle if possible

    // Outputs
    wordClicked = output<{ token: Token; context: string; event: MouseEvent }>();
    grammarClicked = output<{ index: number; event: MouseEvent }>();

    // Computed
    language = computed(() => this.settings.settings().language);
    showReading = computed(() => this.settings.settings().showFurigana); // Or separate setting if needed

    isGrammarToken(index: number): boolean {
        return this.grammarMatches().some(m => m.startIndex <= index && index < m.startIndex + m.length);
    }

    getReading(token: Token): string | undefined {
        const lang = this.language();
        if (lang === 'ja') return token.reading;
        if (lang === 'zh') return token.pinyin;
        return token.romanization || token.pinyin;
    }

    onWordClick(token: Token, context: string, index: number, event: MouseEvent): void {
        if (this.isGrammarToken(index)) {
            this.grammarClicked.emit({ index, event });
        } else {
            this.wordClicked.emit({ token, context, event });
        }
    }
}
