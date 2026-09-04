import {
    Component,
    ChangeDetectionStrategy,
    input,
    output,
    inject,
    computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrammarMatch, SubtitleCue, SupportedLearningLanguage, Token } from '../../../../../models';
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
      [class.has-content]="subtitlesVisible() && !!currentCue()">
      
      @if (subtitlesVisible() && currentCue(); as cue) {
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
                    
                    @if (showReadingAnnotation() && getReading(token)) {
                      <ruby>{{ token.surface }}<rt>{{ getReading(token) }}</rt></ruby>
                    } @else {
                      {{ getDisplayText(token) }}
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
    language = input<SupportedLearningLanguage>('ja');
    isTokenizing = input<boolean>(false);
    areControlsVisible = input<boolean>(false);
    fsPopupVisible = input<boolean>(false);
    fontSizeClass = input<string>('text-medium');
    subtitlesVisible = input<boolean>(true);

    // Dual Subtitle Inputs
    showDualSubtitles = input<boolean>(false);
    isDualSubLoading = input<boolean>(false);
    currentTranslation = input<string | null>(null);

    // Grammar Inputs
    grammarMatches = input<GrammarMatch[]>([]);

    // Outputs
    wordClicked = output<{ token: Token; context: string; event: MouseEvent }>();
    grammarClicked = output<{ index: number; event: MouseEvent }>();

    // Computed
    showReading = computed(() => this.settings.showReadingText(this.language()));
    showReadingAnnotation = computed(() => this.settings.showReadingAnnotation(this.language()));

    isGrammarToken(index: number): boolean {
        return this.grammarMatches().some(match => match.tokenIndices.includes(index));
    }

    getReading(token: Token): string | undefined {
        return this.settings.getReadingText(this.language(), token) || undefined;
    }

    getDisplayText(token: Token): string {
        if (this.settings.useReadingOnly(this.language())) {
            return this.getReading(token) || token.surface;
        }

        return token.surface;
    }

    onWordClick(token: Token, context: string, index: number, event: MouseEvent): void {
        if (this.isGrammarToken(index)) {
            this.grammarClicked.emit({ index, event });
        } else {
            this.wordClicked.emit({ token, context, event });
        }
    }
}
