import {
    Component,
    ChangeDetectionStrategy,
    input,
    output,
    inject,
    computed,
    signal,
    OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrammarMatch, SubtitleCue, SupportedLearningLanguage, Token } from '../../../../../models';
import { SettingsService } from '../../../../../core/services';
import { VocabularyService } from '../../../../vocabulary';

/**
 * FullscreenSubtitleComponent
 * 
 * Renders large, interactive subtitles in fullscreen mode.
 * Handles tokenization display, word lookup implementation details,
 * dual subtitle rendering, and vertical drag & positioning.
 */
@Component({
    selector: 'app-fullscreen-subtitle',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="fullscreen-subtitle" 
      [class.controls-visible]="areControlsVisible()" 
      [class.is-top]="isTop()"
      [class.is-near-bottom]="isNearBottom()"
      [class.is-dragging]="isDragging()"
      [ngClass]="fontSizeClass()"
      [class.popup-open]="fsPopupVisible()" 
      [class.has-content]="subtitlesVisible() && !!currentCue()"
      [style.--sub-y]="yPercent()">
      
      @if (subtitlesVisible() && currentCue(); as cue) {
        <div class="fs-subtitle-card" (pointerdown)="onCardPointerDown($event)" (click)="$event.stopPropagation()">
          <!-- Centered Horizontal Drag Handle Bar -->
          <div class="fs-drag-handle-bar"
            (pointerdown)="onHandlePointerDown($event)"
            (click)="$event.stopPropagation()"
            role="slider"
            [attr.aria-valuenow]="yPercent()"
            aria-valuemin="8"
            aria-valuemax="88"
            [attr.aria-label]="isTop() ? 'Move subtitle to bottom (tap or drag)' : 'Move subtitle to top (tap or drag)'"
            [title]="isTop() ? 'Tap to move to bottom, or drag to reposition' : 'Tap to move to top, or drag to reposition'">
            <div class="fs-drag-pill"></div>
          </div>

          <div class="fs-subtitle-content">
            <div class="fs-subtitle-text" [class]="'text-' + language()">
              <!-- Direct text display when tokens are empty or loading -->
              @if (viewTokens().length === 0) {
                <span class="fs-word">{{ cue.text }}</span>
              } @else { 
                <!-- Interactive token display -->
                @for (vt of viewTokens(); track vt.surface + '-' + vt.index) {
                  @if (vt.isPunctuation) {
                    <span class="fs-word fs-word--punctuation" (click)="$event.stopPropagation()">{{ vt.surface }}</span>
                  } @else {
                    <button type="button"
                      class="fs-word" 
                      [class.fs-word--saved]="vt.isSaved"
                      [class.fs-word--new]="vt.wordLevel === 'new'"
                      [class.fs-word--learning]="vt.wordLevel === 'learning'"
                      [class.fs-word--known]="vt.wordLevel === 'known'"
                      [class.fs-word--grammar]="vt.isGrammar" 
                      [attr.aria-label]="'Look up ' + vt.surface"
                      (click)="onWordClick(vt.token, cue.text, vt.index, $event)">
                      
                      @if (showReadingAnnotation()) {
                        @if (vt.reading) {
                          <ruby>{{ vt.surface }}<rt>{{ vt.reading }}</rt></ruby>
                        } @else {
                          <ruby>{{ vt.surface }}<rt class="rt-empty">&#160;</rt></ruby>
                        }
                      } @else {
                        {{ vt.displayText }}
                      }
                    </button>
                  }
                } 
              }
            </div>

            <!-- Dual Subtitles -->
            @if (showDualSubtitles()) {
              <div class="fs-subtitle-translation-wrapper">
                @if (isDualSubLoading() && !currentTranslation()) {
                  <div class="fs-subtitle-translation skeleton-text"></div>
                } @else if (currentTranslation()) {
                  <div class="fs-subtitle-translation">
                    {{ currentTranslation() }}
                  </div>
                }
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
    styleUrl: './fullscreen-subtitle.component.scss'
})
export class FullscreenSubtitleComponent implements OnDestroy {
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
    yPercent = input<number>(84);

    // Dual Subtitle Inputs
    showDualSubtitles = input<boolean>(false);
    isDualSubLoading = input<boolean>(false);
    currentTranslation = input<string | null>(null);

    // Grammar Inputs
    grammarMatches = input<GrammarMatch[]>([]);

    // Outputs
    wordClicked = output<{ token: Token; context: string; event: MouseEvent }>();
    grammarClicked = output<{ index: number; event: MouseEvent }>();
    positionChanged = output<number>();
    positionCommitted = output<number>();
    togglePosition = output<void>();

    // Drag State
    isDragging = signal(false);
    private dragStartY = 0;
    private dragStartPercent = 84;
    private hasMoved = false;
    private cleanupDragListeners: (() => void) | null = null;
    private dragRafId: number | null = null;

    // Computed
    isTop = computed(() => this.yPercent() < 50);
    isNearBottom = computed(() => this.yPercent() > 68);
    showReadingAnnotation = computed(() => this.settings.showReadingAnnotation(this.language()));

    readonly grammarTokenIndices = computed(() => {
        const matches = this.grammarMatches();
        const indices = new Set<number>();
        for (const match of matches) {
            for (const idx of match.tokenIndices) {
                indices.add(idx);
            }
        }
        return indices;
    });

    readonly viewTokens = computed(() => {
        const tokens = this.tokens();
        const grammarIndices = this.grammarTokenIndices();
        const lang = this.language();
        const readingOnly = this.settings.useReadingOnly(lang);

        return tokens.map((token, index) => {
            const isGrammar = grammarIndices.has(index);
            const wordLevel = this.vocab.getWordLevel(token.surface);
            const isSaved = wordLevel !== null;
            const reading = this.settings.getReadingText(lang, token) || undefined;
            const displayText = readingOnly && reading ? reading : token.surface;

            return {
                token,
                index,
                isPunctuation: token.isPunctuation,
                surface: token.surface,
                isGrammar,
                isSaved,
                wordLevel,
                reading,
                displayText
            };
        });
    });

    onHandlePointerDown(event: PointerEvent): void {
        if (event.button !== 0) return;
        event.stopPropagation();
        event.preventDefault();
        this.startDrag(event, true);
    }

    onCardPointerDown(event: PointerEvent): void {
        if (event.button !== 0) return;
        const target = event.target as HTMLElement | null;
        // Do not drag if user clicked an interactive word, button, or link
        if (target?.closest('.fs-word, .fs-drag-handle-bar, button, a')) {
            return;
        }
        this.startDrag(event, false);
    }

    private startDrag(event: PointerEvent, isHandle: boolean): void {
        this.cleanupDragListeners?.();

        const target = event.currentTarget as HTMLElement;
        try {
            target.setPointerCapture(event.pointerId);
        } catch {}

        this.dragStartY = event.clientY;
        this.dragStartPercent = this.yPercent();
        this.hasMoved = false;
        this.isDragging.set(true);

        let latestClientY = event.clientY;

        const onPointerMove = (moveEvent: PointerEvent) => {
            if (moveEvent.pointerId !== event.pointerId) return;
            latestClientY = moveEvent.clientY;
            const deltaY = latestClientY - this.dragStartY;
            if (Math.abs(deltaY) > 3) {
                this.hasMoved = true;
            }

            if (this.dragRafId === null) {
                this.dragRafId = requestAnimationFrame(() => {
                    this.dragRafId = null;
                    const curDeltaY = latestClientY - this.dragStartY;
                    const container = target.closest('.video-container') as HTMLElement | null;
                    const containerHeight = container?.clientHeight || window.innerHeight;
                    const deltaPercent = (curDeltaY / containerHeight) * 100;
                    const rawPercent = this.dragStartPercent + deltaPercent;

                    const clamped = Math.max(8, Math.min(88, Math.round(rawPercent)));
                    this.positionChanged.emit(clamped);
                });
            }
        };

        const onPointerUp = (upEvent: PointerEvent) => {
            if (upEvent.pointerId !== event.pointerId) return;
            if (this.dragRafId !== null) {
                cancelAnimationFrame(this.dragRafId);
                this.dragRafId = null;
            }

            this.isDragging.set(false);
            try {
                target.releasePointerCapture(upEvent.pointerId);
            } catch {}

            this.cleanupDragListeners?.();
            this.cleanupDragListeners = null;

            if (!this.hasMoved) {
                if (isHandle) {
                    this.togglePosition.emit();
                }
            } else {
                // Free dragging: commit exact position without forced snapping locks
                const current = Math.max(8, Math.min(88, Math.round(this.yPercent())));
                this.positionCommitted.emit(current);
            }
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);

        this.cleanupDragListeners = () => {
            if (this.dragRafId !== null) {
                cancelAnimationFrame(this.dragRafId);
                this.dragRafId = null;
            }
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            window.removeEventListener('pointercancel', onPointerUp);
        };
    }

    ngOnDestroy(): void {
        this.cleanupDragListeners?.();
        this.cleanupDragListeners = null;
    }

    onWordClick(token: Token, context: string, index: number, event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
        if (this.grammarTokenIndices().has(index)) {
            this.grammarClicked.emit({ index, event });
        } else {
            this.wordClicked.emit({ token, context, event });
        }
    }
}
