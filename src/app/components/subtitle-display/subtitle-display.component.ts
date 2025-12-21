import { Component, inject, effect, output, signal, computed, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { SubtitleService, YoutubeService, VocabularyService, SettingsService, TranscriptService } from '../../services';
import { SubtitleCue, Token } from '../../models';

@Component({
  selector: 'app-subtitle-display',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="subtitle-panel">
      <!-- Current subtitle -->
      <div class="current-subtitle" 
           [class.current-subtitle--small]="settings.settings().fontSize === 'small'"
           [class.current-subtitle--large]="settings.settings().fontSize === 'large'"
           [class.is-generating]="transcript.isGeneratingAI()">
        @if (subtitles.currentCue(); as cue) {
          <div class="subtitle-text" [class]="'text-' + settings.settings().language">
            @if (subtitles.isTokenizing()) {
              <!-- Show raw text while tokenizing -->
              <span class="word">{{ cue.text }}</span>
            } @else {
              @for (token of getTokens(cue); track $index) {
                <span 
                  class="word"
                  [class.word--new]="getWordLevel(token.surface) === 'new'"
                  [class.word--learning]="getWordLevel(token.surface) === 'learning'"
                  [class.word--known]="getWordLevel(token.surface) === 'known'"
                  [class.word--saved]="vocab.hasWord(token.surface)"
                  (click)="onWordClick(token, cue.text)"
                >
                  @if (showReading() && getReading(token)) {
                    <ruby>{{ token.surface }}<rt>{{ getReading(token) }}</rt></ruby>
                  } @else {
                    {{ token.surface }}
                  }
                </span>
              }
            }
          </div>
        } @else {
          <div class="subtitle-empty">
            @if (transcript.isGeneratingAI()) {
              <div class="ai-generating">
                <div class="ai-badge">
                  <app-icon name="sparkles" [size]="16" />
                  <span>AI-Powered</span>
                </div>
                <div class="ai-spinner">
                  <div class="ai-spinner-ring"></div>
                  <app-icon name="wand" [size]="28" class="ai-wand" />
                </div>
                <p class="ai-title">Generating transcript...</p>
                <p class="ai-hint">Using Whisper AI to transcribe audio</p>
              </div>
            } @else if (transcript.isLoading()) {
              <div class="loading-indicator">
                <app-icon name="loader" [size]="24" class="spin" />
                <p>Fetching captions...</p>
              </div>
            } @else if (transcript.error()) {
              <app-icon name="alert-circle" [size]="32" class="error-icon" />
              <p class="empty-title">No subtitles available</p>
              <p class="empty-hint">This video doesn't have captions and AI transcription is unavailable.</p>
            } @else if (subtitles.subtitles().length === 0) {
              <app-icon name="subtitles" [size]="32" class="empty-icon" />
              <p class="empty-title">No subtitles loaded</p>
              <p class="empty-hint">Try a video with captions enabled</p>
            } @else {
              <p class="subtitle-waiting">Waiting for subtitles...</p>
            }
          </div>
        }
      </div>

      <!-- Subtitle list (scrollable) -->
      @if (subtitles.subtitles().length > 0) {
        <div class="subtitle-list" #subtitleList>
          @for (cue of subtitles.subtitles(); track cue.id) {
            <button
              class="cue-item"
              [class.cue-item--active]="cue.id === subtitles.currentCue()?.id"
              [class.cue-item--past]="cue.endTime < youtube.currentTime()"
              [attr.data-cue-id]="cue.id"
              (click)="seekToCue(cue)"
            >
              <span class="cue-time">{{ formatTime(cue.startTime) }}</span>
              <span class="cue-text">{{ cue.text }}</span>
            </button>
          }
        </div>
      }

      <!-- Controls -->
      <div class="subtitle-controls">
        <!-- Reading Toggle -->
        <button 
          class="reading-toggle"
          [class.active]="showReading()"
          (click)="toggleReading()"
          [title]="'Toggle ' + readingLabel()"
        >
          <app-icon [name]="showReading() ? 'eye' : 'eye-off'" [size]="16" />
          <span>{{ readingLabel() }}</span>
        </button>

        <div class="font-controls">
          <button 
            class="font-btn"
            [class.active]="settings.settings().fontSize === 'small'"
            (click)="settings.setFontSize('small')"
            title="Small font"
          >A</button>
          <button 
            class="font-btn font-btn--medium"
            [class.active]="settings.settings().fontSize === 'medium'"
            (click)="settings.setFontSize('medium')"
            title="Medium font"
          >A</button>
          <button 
            class="font-btn font-btn--large"
            [class.active]="settings.settings().fontSize === 'large'"
            (click)="settings.setFontSize('large')"
            title="Large font"
          >A</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .subtitle-panel {
      background: var(--bg-card);
      border-radius: var(--border-radius-lg);
      border: 1px solid var(--border-color);
      overflow: hidden;
    }

    /* Current subtitle */
    .current-subtitle {
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-lg);
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    .subtitle-text {
      font-size: 1.375rem;
      line-height: 2;
      text-align: center;
      word-break: keep-all;
    }

    .current-subtitle.is-generating {
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(236, 72, 153, 0.05));
      animation: containerPulse 2s ease-in-out infinite;
    }

    @keyframes containerPulse {
      0%, 100% { 
        box-shadow: inset 0 0 20px rgba(139, 92, 246, 0.05);
      }
      50% { 
        box-shadow: inset 0 0 40px rgba(139, 92, 246, 0.15);
      }
    }

    .current-subtitle--small .subtitle-text {
      font-size: 1.125rem;
    }

    .current-subtitle--large .subtitle-text {
      font-size: 1.75rem;
    }

    .subtitle-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
      text-align: center;
      padding: var(--space-md);
    }

    .empty-icon {
      color: var(--text-muted);
      opacity: 0.5;
    }

    .error-icon {
      color: var(--text-muted);
      opacity: 0.6;
    }

    .empty-title {
      font-weight: 500;
      color: var(--text-secondary);
    }

    .empty-hint {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    /* AI Generation Indicator - Enhanced */
    .ai-generating {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-xl);
      width: 100%;
    }

    .ai-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs);
      padding: 4px 12px;
      background: linear-gradient(135deg, #8b5cf6, #ec4899);
      color: white;
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-radius: 100px;
    }

    .ai-spinner {
      position: relative;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ai-spinner-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid transparent;
      border-top-color: #8b5cf6;
      border-right-color: #ec4899;
      border-radius: 50%;
      animation: spin 1.5s linear infinite;
    }

    .ai-wand {
      color: #8b5cf6;
      animation: wandPulse 1s ease-in-out infinite;
    }

    @keyframes wandPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }

    .ai-title {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 1rem;
    }

    .ai-hint {
      font-size: 0.8125rem;
      color: var(--text-muted);
      text-align: center;
    }

    .loading-indicator {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-sm);
      color: var(--text-muted);
    }

    .spin {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .subtitle-waiting {
      color: var(--text-muted);
      animation: pulse 2s ease-in-out infinite;
    }

    /* Word styling */
    .word {
      cursor: pointer;
      padding: 2px 4px;
      margin: 0 1px;
      border-radius: 4px;
      transition: all var(--transition-fast);
      display: inline;
    }

    .word:hover {
      background: var(--accent-tertiary);
      transform: scale(1.02);
    }

    .word--saved {
      border-bottom: 2px solid var(--accent-primary);
    }

    .word--new {
      background: var(--word-new);
    }

    .word--learning {
      background: var(--word-learning);
    }

    .word--known {
      background: var(--word-known);
    }

    ruby {
      ruby-align: center;
    }

    ruby rt {
      font-size: 0.5em;
      color: var(--text-muted);
    }

    /* Subtitle list */
    .subtitle-list {
      max-height: 180px;
      overflow-y: auto;
      border-bottom: 1px solid var(--border-color);
      position: relative;
    }

    .cue-item {
      display: flex;
      align-items: flex-start;
      gap: var(--space-md);
      width: 100%;
      padding: var(--space-sm) var(--space-md);
      background: none;
      border: none;
      border-bottom: 1px solid var(--border-color);
      text-align: left;
      cursor: pointer;
      transition: all var(--transition-fast);
      font-family: inherit;
      font-size: 0.875rem;
      color: var(--text-primary);
    }

    .cue-item:last-child {
      border-bottom: none;
    }

    .cue-item:hover {
      background: var(--bg-secondary);
    }

    .cue-item--active {
      background: var(--accent-primary);
      color: white;
    }

    .cue-item--active:hover {
      background: var(--accent-primary);
    }

    .cue-item--past {
      opacity: 0.5;
    }

    .cue-time {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-muted);
      min-width: 44px;
      flex-shrink: 0;
    }

    .cue-item--active .cue-time {
      color: rgba(255, 255, 255, 0.8);
    }

    .cue-text {
      flex: 1;
      line-height: 1.4;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    /* Controls */
    .subtitle-controls {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-sm) var(--space-md);
    }

    .font-controls {
      display: flex;
      gap: 2px;
      background: var(--bg-secondary);
      padding: 2px;
      border-radius: 6px;
      margin-left: auto;
    }

    .font-btn {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6875rem;
      font-weight: 600;
      border: none;
      background: none;
      color: var(--text-muted);
      cursor: pointer;
      border-radius: 4px;
      transition: all var(--transition-fast);
    }

    .font-btn--medium {
      font-size: 0.8125rem;
    }

    .font-btn--large {
      font-size: 0.9375rem;
    }

    .font-btn:hover {
      color: var(--text-primary);
    }

    .font-btn.active {
      background: var(--bg-card);
      color: var(--accent-primary);
      box-shadow: var(--shadow-sm);
    }

    /* Reading Toggle */
    .reading-toggle {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 10px;
      border: 1px solid var(--border-color);
      background: var(--bg-secondary);
      color: var(--text-muted);
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .reading-toggle:hover {
      border-color: var(--accent-primary);
      color: var(--text-primary);
    }

    .reading-toggle.active {
      background: var(--accent-primary);
      border-color: var(--accent-primary);
      color: white;
    }



    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    @media (max-width: 640px) {
      .subtitle-panel {
        border-radius: var(--border-radius-lg);
      }

      .subtitle-text {
        font-size: 1.125rem;
        line-height: 1.6;
      }

      .current-subtitle--small .subtitle-text {
        font-size: 0.9375rem;
      }

      .current-subtitle--large .subtitle-text {
        font-size: 1.25rem;
      }

      .word {
        padding: 2px 4px;
        margin: 1px;
        min-height: auto;
      }

      .subtitle-list {
        max-height: 250px;
      }

      .cue-item {
        padding: var(--space-sm);
        min-height: auto;
        font-size: 0.8125rem;
      }

      .subtitle-controls {
        flex-wrap: wrap;
        gap: var(--space-sm);
        padding: var(--space-sm);
      }
    }

    @media (max-width: 480px) {
      .current-subtitle {
        min-height: 80px;
        padding: var(--space-md);
      }
      
      .subtitle-text {
        font-size: 1.125rem;
        line-height: 1.5;
      }
    }
  `]
})
export class SubtitleDisplayComponent {
  subtitles = inject(SubtitleService);
  youtube = inject(YoutubeService);
  vocab = inject(VocabularyService);
  settings = inject(SettingsService);
  transcript = inject(TranscriptService);

  @ViewChild('subtitleList') subtitleList!: ElementRef<HTMLDivElement>;

  wordClicked = output<{ token: Token; sentence: string }>();

  // Computed signal for reading display
  showReading = computed(() => {
    const lang = this.settings.settings().language;
    return lang === 'ja'
      ? this.settings.settings().showFurigana
      : this.settings.settings().showPinyin;
  });

  constructor() {
    // Update current cue based on video time
    effect(() => {
      const time = this.youtube.currentTime();
      this.subtitles.updateCurrentCue(time);
    });

    // Auto-scroll to active cue using effect for better reactivity
    effect(() => {
      const currentCue = this.subtitles.currentCue();
      // Ensure we have a cue and the list element is available
      if (currentCue && this.subtitleList?.nativeElement) {
        // Use timeout to allow DOM update (class changes) before measuring
        setTimeout(() => this.scrollToActiveCue(currentCue.id), 0);
      }
    });
  }

  // Removed ngAfterViewChecked as we use effect now

  private scrollToActiveCue(cueId: number): void {
    if (!this.subtitleList?.nativeElement) return;

    const container = this.subtitleList.nativeElement;
    const activeElement = container.querySelector(`[data-cue-id="${cueId}"]`) as HTMLElement;

    if (activeElement) {
      const containerHeight = container.clientHeight;
      const elementTop = activeElement.offsetTop;
      const elementHeight = activeElement.offsetHeight;

      // Center the element
      const targetScrollTop = elementTop - (containerHeight / 2) + (elementHeight / 2);

      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth'
      });
    }
  }

  getTokens(cue: SubtitleCue): Token[] {
    const lang = this.settings.settings().language;
    return this.subtitles.getTokens(cue, lang);
  }

  getWordLevel(word: string): string | null {
    return this.vocab.getWordLevel(word);
  }

  onWordClick(token: Token, sentence: string): void {
    this.wordClicked.emit({ token, sentence });
  }

  // Computed reading label
  readingLabel = computed(() => {
    const lang = this.settings.settings().language;
    switch (lang) {
      case 'ja': return 'Furigana';
      case 'zh': return 'Pinyin';
      case 'ko': return 'Romanization';
      default: return 'Reading';
    }
  });

  getReading(token: Token): string | undefined {
    const lang = this.settings.settings().language;
    if (lang === 'ja') return token.reading;
    if (lang === 'zh') return token.pinyin;
    return token.romanization || token.pinyin; // Fallback to pinyin if romanization missing (or if used interchangeably)
  }

  toggleReading(): void {
    const lang = this.settings.settings().language;
    if (lang === 'ja') {
      this.settings.toggleFurigana();
    } else {
      this.settings.togglePinyin(); // Reusing pinyin toggle for other langs for now
    }
  }

  seekToCue(cue: SubtitleCue): void {
    this.youtube.seekTo(cue.startTime);
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
