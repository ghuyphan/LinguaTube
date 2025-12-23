import { Component, inject, effect, output, signal, computed, ViewChild, ElementRef, ChangeDetectionStrategy, HostListener, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { IconComponent } from '../icon/icon.component';
import { SubtitleService, YoutubeService, VocabularyService, SettingsService, TranscriptService, I18nService } from '../../services';
import { SubtitleCue, Token } from '../../models';

@Component({
  selector: 'app-subtitle-display',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  animations: [
    trigger('subtitleFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(4px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <div class="subtitle-panel">
      <!-- Current subtitle -->
      <div class="current-subtitle" 
           [class.current-subtitle--small]="settings.settings().fontSize === 'small'"
           [class.current-subtitle--large]="settings.settings().fontSize === 'large'"
           [class.is-generating]="transcript.isGeneratingAI()">
        @if (subtitles.currentCue(); as cue) {
          <div class="subtitle-text" 
               [class]="'text-' + settings.settings().language"
               [class.is-looping]="isLoopEnabled()">
            @if (subtitles.isTokenizing()) {
              <!-- Show raw text while tokenizing -->
              <span class="word">{{ cue.text }}</span>
            } @else {
              <span class="subtitle-content" @subtitleFade>
                @for (token of getTokens(cue); track $index) {@if (isPunctuation(token.surface)) {<span class="punctuation">{{ token.surface }}</span>} @else {<span 
                    class="word"
                    [class.word--new]="getWordLevel(token.surface) === 'new'"
                    [class.word--learning]="getWordLevel(token.surface) === 'learning'"
                    [class.word--known]="getWordLevel(token.surface) === 'known'"
                    [class.word--saved]="vocab.hasWord(token.surface)"
                    (click)="onWordClick(token, cue.text)"
                  >@if (showReading() && getReading(token)) {<ruby>{{ token.surface }}<rt>{{ getReading(token) }}</rt></ruby>} @else {{{ token.surface }}}</span>}}
              </span>
            }
          </div>
        } @else {
        <div class="subtitle-empty">
            @if (youtube.currentVideo() && transcript.isGeneratingAI()) {
              <div class="ai-generating">
                <div class="ai-badge">
                  <app-icon name="sparkles" [size]="16" />
                  <span>{{ i18n.t('subtitle.aiPowered') }}</span>
                </div>
                <div class="ai-spinner">
                  <div class="ai-spinner-ring"></div>
                  <app-icon name="wand" [size]="28" class="ai-wand" />
                </div>
                <p class="ai-title">{{ i18n.t('subtitle.generatingTranscript') }}</p>
                <p class="ai-hint">{{ i18n.t('subtitle.usingWhisperAI') }}</p>
              </div>
            } @else if (youtube.currentVideo() && transcript.isLoading()) {
              <div class="loading-indicator">
                <app-icon name="loader" [size]="24" />
                <p>{{ i18n.t('subtitle.fetchingCaptions') }}</p>
              </div>
            } @else if (transcript.error()) {
              <app-icon name="alert-circle" [size]="32" class="error-icon" />
              <p class="empty-title">{{ i18n.t('subtitle.noSubtitlesAvailable') }}</p>
              <p class="empty-hint">{{ i18n.t('subtitle.aiUnavailable') }}</p>
            } @else if (subtitles.subtitles().length === 0) {
              <app-icon name="subtitles" [size]="32" class="empty-icon" />
              <p class="empty-title">{{ i18n.t('subtitle.noSubtitlesLoaded') }}</p>
              <p class="empty-hint">{{ i18n.t('subtitle.tryVideoWithCaptions') }}</p>
            } @else {
              <p class="subtitle-waiting">{{ i18n.t('subtitle.waitingForSubtitles') }}</p>
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
        <!-- Loop Toggle -->
        <button 
          class="toggle-btn"
          [class.active]="isLoopEnabled()"
          (click)="toggleLoop()"
          [title]="i18n.t('subtitle.loop') + ' (L)'"
        >
          <app-icon name="repeat" [size]="16" />
          <span>{{ i18n.t('subtitle.loop') }}</span>
          @if (isLoopEnabled() && loopCount() > 0) {
            <span class="toggle-btn__badge">{{ loopCount() }}/{{ maxLoops() }}</span>
          }
        </button>

        <!-- Reading Toggle -->
        <button 
          class="toggle-btn"
          [class.active]="showReading()"
          (click)="toggleReading()"
          [title]="'Toggle ' + readingLabel()"
        >
          <app-icon name="type" [size]="16" />
          <span>{{ readingLabel() }}</span>
        </button>

        <div class="font-controls">
          <button 
            class="font-btn"
            [class.active]="settings.settings().fontSize === 'small'"
            (click)="settings.setFontSize('small')"
            [title]="i18n.t('subtitle.smallFont')"
          >A</button>
          <button 
            class="font-btn font-btn--medium"
            [class.active]="settings.settings().fontSize === 'medium'"
            (click)="settings.setFontSize('medium')"
            [title]="i18n.t('subtitle.mediumFont')"
          >A</button>
          <button 
            class="font-btn font-btn--large"
            [class.active]="settings.settings().fontSize === 'large'"
            (click)="settings.setFontSize('large')"
            [title]="i18n.t('subtitle.largeFont')"
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
      overflow-x: auto;
      overflow-y: visible;
    }

    .subtitle-text {
      font-size: 1.375rem;
      line-height: 2.2;
      text-align: center;
      word-break: break-word;
      overflow-wrap: break-word;
      transition: box-shadow 0.3s ease, background 0.3s ease;
      border-radius: 12px;
      padding: 4px 12px;
      max-width: 100%;
    }

    .subtitle-content {
      display: inline;
    }

    .subtitle-text.is-looping {
      box-shadow: 0 0 0 2px var(--accent-primary), 0 0 12px rgba(199, 62, 58, 0.4);
      background: rgba(199, 62, 58, 0.05);
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
      line-height: 2;
    }

    .current-subtitle--large .subtitle-text {
      font-size: 1.75rem;
      line-height: 2.4;
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

    .subtitle-waiting {
      color: var(--text-muted);
      animation: pulse 2s ease-in-out infinite;
    }

    /* Punctuation - no interactive styling */
    .punctuation {
      display: inline;
      cursor: default;
      color: var(--text-secondary);
    }

    /* ============================================
       WORD & RUBY STYLING - Optimized for tap clarity
       ============================================ */
    
    .word {
      cursor: pointer;
      padding: 4px 6px;
      margin: 1px 2px;
      border-radius: 6px;
      transition: all 0.2s ease;
      display: inline-block;
      vertical-align: baseline;
      /* Subtle background to indicate tappability */
      background: rgba(var(--accent-primary-rgb, 199, 62, 58), 0.06);
      border: 1px solid transparent;
      position: relative;
    }

    /* Subtle bottom indicator for all words */
    .word::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
      width: 60%;
      height: 2px;
      background: var(--accent-primary);
      opacity: 0.15;
      border-radius: 1px;
      transition: opacity 0.2s ease, width 0.2s ease;
    }

    @media (hover: hover) {
      .word:hover {
        background: var(--accent-tertiary);
        border-color: rgba(var(--accent-primary-rgb, 199, 62, 58), 0.2);
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .word:hover::after {
        opacity: 0.5;
        width: 80%;
      }
    }

    .word:active {
      transform: scale(0.96);
      background: var(--accent-tertiary);
    }

    .word--saved {
      border-bottom: 2px solid var(--accent-primary);
      background: rgba(var(--accent-primary-rgb, 199, 62, 58), 0.1);
    }

    .word--saved::after {
      display: none;
    }

    .word--new {
      background: var(--word-new);
      border-color: rgba(var(--word-new-rgb, 239, 68, 68), 0.3);
    }

    .word--new::after {
      background: var(--word-new-text, #991b1b);
    }

    .word--learning {
      background: var(--word-learning);
      border-color: rgba(var(--word-learning-rgb, 234, 179, 8), 0.3);
    }

    .word--learning::after {
      background: var(--word-learning-text, #854d0e);
    }

    .word--known {
      background: var(--word-known);
      border-color: rgba(var(--word-known-rgb, 34, 197, 94), 0.3);
    }

    .word--known::after {
      background: var(--word-known-text, #166534);
    }

    /* Ruby base styling - use native ruby display for proper alignment */
    ruby {
      display: ruby;
      ruby-align: center;
      ruby-position: over;
    }

    ruby rt {
      display: ruby-text;
      font-size: 0.5em;
      color: var(--text-muted);
      text-align: center;
      font-weight: 400;
      line-height: 1.2;
    }

    /* Japanese text - optimized spacing */
    .text-ja {
      letter-spacing: 0;
      word-spacing: 0;
    }
    
    .text-ja .word {
      padding: 4px 4px;
      margin: 1px 1px;
    }
    
    .text-ja ruby rt {
      font-size: 0.42em;
      white-space: nowrap;
      letter-spacing: -0.02em;
    }

    /* Chinese text - optimized spacing */
    .text-zh {
      letter-spacing: 0.02em;
    }
    
    .text-zh .word {
      padding: 4px 5px;
      margin: 1px 2px;
    }
    
    .text-zh ruby rt {
      font-size: 0.48em;
      font-weight: 500;
    }

    /* Korean text - optimized spacing */
    .text-ko {
      word-spacing: 0.1em;
    }
    
    .text-ko .word {
      padding: 4px 6px;
      margin: 1px 3px;
    }
    
    .text-ko ruby rt {
      font-size: 0.48em;
      font-weight: 500;
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

    @media (hover: hover) {
      .cue-item:hover {
        background: var(--bg-secondary);
      }
    }

    .cue-item--active {
      background: var(--accent-primary);
      color: white;
    }

    @media (hover: hover) {
      .cue-item--active:hover {
        background: var(--accent-primary);
      }
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
      gap: var(--space-sm);
      padding: var(--space-sm) var(--space-md);
      flex-wrap: wrap;
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

    @media (hover: hover) {
      .font-btn:hover {
        color: var(--text-primary);
      }
    }

    .font-btn.active {
      background: var(--bg-card);
      color: var(--accent-primary);
      box-shadow: none;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    @media (max-width: 640px) {
      .current-subtitle {
        min-height: 120px;
        padding: var(--space-lg) var(--mobile-padding);
      }

      .subtitle-text {
        font-size: 1.25rem;
        line-height: 2;
      }

      .current-subtitle--small .subtitle-text {
        font-size: 1.0625rem;
      }

      .current-subtitle--large .subtitle-text {
        font-size: 1.5rem;
      }

      /* Words need bigger touch targets on mobile */
      .word {
        padding: 6px 8px;
        border-radius: 8px;
        min-height: 36px;
        line-height: 1.5;
        /* More visible background on mobile for tap clarity */
        background: rgba(var(--accent-primary-rgb, 199, 62, 58), 0.08);
      }

      .word::after {
        opacity: 0.25;
        height: 2px;
      }

      .subtitle-list {
        max-height: 200px;
      }

      .cue-item {
        padding: var(--space-md) var(--mobile-padding);
        min-height: 56px;
      }

      .cue-time {
        font-size: 0.75rem;
        min-width: 48px;
      }

      .cue-text {
        font-size: 0.9375rem;
        line-height: 1.5;
      }

      /* Controls row */
      .subtitle-controls {
        padding: var(--space-sm) var(--mobile-padding);
        gap: var(--space-sm);
        flex-wrap: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }

      .subtitle-controls::-webkit-scrollbar {
        display: none;
      }

      .toggle-btn {
        min-height: 40px;
        padding: 0;
        width: 40px;
        justify-content: center;
        font-size: 0.8125rem;
        flex-shrink: 0;
      }

      .toggle-btn span:not(.toggle-btn__badge) {
        display: none;
      }

      .font-controls {
        flex-shrink: 0;
        margin-left: auto;
        padding: 2px;
        gap: 2px;
      }

      .font-btn {
        width: 36px;
        height: 36px;
        border-radius: 4px;
      }
    }

    @media (max-width: 480px) {
      .current-subtitle {
        min-height: 100px;
        padding: var(--space-md);
      }
      
      .subtitle-text {
        font-size: 1.125rem;
        line-height: 1.8;
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
  i18n = inject(I18nService);

  @ViewChild('subtitleList') subtitleList!: ElementRef<HTMLDivElement>;

  wordClicked = output<{ token: Token; sentence: string }>();

  // Input to skip heavy processing when video is in fullscreen
  isVideoFullscreen = input(false);

  // Loop feature state
  isLoopEnabled = signal(false);
  loopCount = signal(0);
  maxLoops = signal(5); // 0 = infinite
  private loopTargetId = signal<number>(-1);
  private loopTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private lastLoopTime = 0;

  // Keyboard shortcut for loop toggle
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Only handle when subtitles are loaded
    if (this.subtitles.subtitles().length === 0) return;

    // Don't intercept if user is typing in an input field
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    if (event.code === 'KeyL') {
      this.toggleLoop();
    }
  }

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

    // Segment loop effect
    effect(() => {
      const currentCue = this.subtitles.currentCue();
      const currentTime = this.youtube.currentTime();
      const targetId = this.loopTargetId();

      if (!this.isLoopEnabled() || targetId === -1) return;

      // If we don't have a current cue (e.g. gap between subtitles), do nothing yet
      // unless we drifted too far.
      if (!currentCue) {
        // Option: Check if we are past the target cue's end time significantly?
        // For now, let's rely on cue presence or time check.
        return;
      }

      // 1. Detect if user manually seeked away or we drifted too far to a DIFFERENT, NON-ADJACENT cue
      // We allow currentCue.id to be targetId OR targetId + 1 (the next one)
      // If it is targetId + 1, it means we naturally played past the end.
      if (currentCue.id !== targetId && currentCue.id !== targetId + 1) {
        // User likely clicked a different cue. Disable loop.
        this.disableLoop();
        return;
      }

      // 2. Check overlap/end condition
      // If we are on the target cue, check if we reached end
      // If we are on targetId + 1, we definitely reached end
      let shouldLoop = false;
      const targetCue = this.subtitles.subtitles().find(c => c.id === targetId);

      if (!targetCue) {
        this.disableLoop();
        return;
      }

      const isPastEndTime = currentTime >= targetCue.endTime - 0.1;
      const movedToNextCue = currentCue.id === targetId + 1;

      if (isPastEndTime || movedToNextCue) {
        shouldLoop = true;
      }

      if (shouldLoop) {
        // Prevent double-counting due to seek latency
        if (Date.now() - this.lastLoopTime < 1000) return;

        const maxLoopsValue = this.maxLoops();
        const currentLoopCount = this.loopCount();

        if (maxLoopsValue === 0 || currentLoopCount < maxLoopsValue) {
          // Debounce the seek to avoid rapid firing
          if (!this.loopTimeoutId) {
            this.loopTimeoutId = setTimeout(() => {
              this.loopCount.update(c => c + 1);
              this.youtube.seekTo(targetCue.startTime);
              this.lastLoopTime = Date.now();
              this.loopTimeoutId = null; // Reset timeout ref
            }, 300);
          }
        } else {
          // Max loops reached
          this.disableLoop();
        }
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

  // Check if a string is punctuation (CJK + Western)
  isPunctuation(text: string): boolean {
    // Regex covers: CJK punctuation, Western punctuation, brackets, whitespace
    const punctuationRegex = /^[\s\p{P}\p{S}【】「」『』（）〔〕［］｛｝〈〉《》〖〗〘〙〚〛｟｠、。・ー〜～！？：；，．""''…—–]+$/u;
    return punctuationRegex.test(text);
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
    // Disable loop when user manually selects a different cue
    if (this.isLoopEnabled()) {
      this.disableLoop();
    }
    this.youtube.seekTo(cue.startTime);
  }

  toggleLoop(): void {
    if (this.isLoopEnabled()) {
      this.disableLoop();
    } else {
      this.isLoopEnabled.set(true);
      this.loopCount.set(0);
      const currentCue = this.subtitles.currentCue();
      if (currentCue) {
        this.loopTargetId.set(currentCue.id);
      }
    }
  }

  private disableLoop(): void {
    this.isLoopEnabled.set(false);
    this.loopCount.set(0);
    this.loopTargetId.set(-1);
    if (this.loopTimeoutId) {
      clearTimeout(this.loopTimeoutId);
      this.loopTimeoutId = null;
    }
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}