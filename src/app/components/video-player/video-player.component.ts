import { Component, inject, signal, OnDestroy, effect, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener, computed, output } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { YoutubeService, SubtitleService, SettingsService, TranscriptService, VocabularyService, DictionaryService, I18nService } from '../../services';
import { Token, SubtitleCue, DictionaryEntry } from '../../models';
import { Subscription } from 'rxjs';

type PlaybackSpeed = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 2;

interface SeekPreview {
  visible: boolean;
  time: number;
  position: number;
}

@Component({
  selector: 'app-video-player',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="player-wrapper">
      @if (!youtube.currentVideo() && !isLoading() && !youtube.pendingVideoId()) {
        <!-- URL Input State -->
        <div class="video-input">
          <div class="input-group">
            <div class="input-wrapper">
              <app-icon name="search" [size]="18" class="input-icon" />
              <input
                type="text"
                [(ngModel)]="videoUrl"
                [placeholder]="i18n.t('player.pasteUrl')"
                class="url-input"
                (keyup.enter)="loadVideo()"
              />
            </div>
            <button 
              class="btn btn-primary load-btn"
              (click)="loadVideo()"
              [disabled]="isLoading()"
            >
              @if (isLoading()) {
                <app-icon name="loader" [size]="16" />
              } @else {
                {{ i18n.t('player.load') }}
              }
            </button>
          </div>
          
          @if (error()) {
            <div class="error-banner">
              <app-icon name="alert-circle" [size]="16" />
              <span>{{ error() }}</span>
            </div>
          }

          <div class="hints">
            <p class="hint-text">
              <app-icon name="info" [size]="14" />
              {{ i18n.t('player.hint') }}
            </p>
          </div>
        </div>
      } @else {
        <!-- Video Loaded State -->
        <div 
          class="video-container" 
          #videoContainer
          [class.is-fullscreen]="isFullscreen()"
          (mousemove)="onUserActivity()" 
          (click)="onUserActivity()"
          (touchstart)="onUserActivity()"
          (mouseleave)="onMouseLeave()"
        >
          <div class="video-embed-ratio">
            <div id="youtube-player"></div>
            
            <!-- Loading Overlay -->
            @if (youtube.pendingVideoId() && !youtube.currentVideo()) {
              <div class="loading-overlay">
                <div class="loading-spinner">
                  <app-icon name="loader" [size]="32" />
                </div>
                <span class="loading-text">{{ i18n.t('player.loadingVideo') }}</span>
              </div>
            }
            
            <!-- Interaction Overlay Layer -->
            <div class="player-overlay" (touchstart)="onUserActivity()">
              <!-- Centered Feedback Elements -->
              @if (playPauseFeedback()) {
                <div class="center-feedback play-pause-feedback" [class.animate]="playPauseFeedback()">
                  <app-icon [name]="feedbackIconName()" [size]="48" />
                </div>
              }
              @if (volumeFeedback()) {
                <div class="center-feedback volume-feedback" [class.animate]="volumeFeedback()">
                  <app-icon [name]="volumeFeedbackIcon()" [size]="48" />
                </div>
              }

              <!-- Left Zone - Rewind -->
              <div class="zone left" (click)="handleZoneTap(-10)">
                <div class="feedback-icon" [class.animate]="rewindFeedback()">
                  <app-icon name="rewind" [size]="32" />
                  <span>10s</span>
                </div>
                @if (leftRipple()) {
                  <div class="ripple-effect" [style.left.px]="ripplePos().x" [style.top.px]="ripplePos().y"></div>
                }
              </div>
              
              <!-- Center Zone - Play/Pause -->
              <div class="zone center" (click)="handleCenterTap()">
                @if (!youtube.isPlaying() && !areControlsVisible() && !playPauseFeedback()) {
                  <div class="big-play-btn">
                    <app-icon name="play" [size]="48" />
                  </div>
                }
              </div>
              
              <!-- Right Zone - Forward -->
              <div class="zone right" (click)="handleZoneTap(10)">
                <div class="feedback-icon" [class.animate]="forwardFeedback()">
                  <app-icon name="fast-forward" [size]="32" />
                  <span>10s</span>
                </div>
                @if (rightRipple()) {
                  <div class="ripple-effect" [style.left.px]="ripplePos().x" [style.top.px]="ripplePos().y"></div>
                }
              </div>
            </div>

            <!-- Mini Progress Bar (visible when controls hidden) -->
            <div 
              class="mini-progress" 
              [class.visible]="!areControlsVisible() && youtube.isPlaying()"
            >
              <div class="mini-progress__fill" [style.width.%]="progressPercentage()"></div>
            </div>

            <!-- Fullscreen Subtitle Overlay -->
            @if (isFullscreen()) {
              <div 
                class="fullscreen-subtitle" 
                [class.controls-visible]="areControlsVisible()"
                [class.fs-small]="settings.settings().fontSize === 'small'"
                [class.fs-large]="settings.settings().fontSize === 'large'"
                [class.popup-open]="fsPopupVisible()"
                [class.has-content]="!!subtitles.currentCue()"
              >
                @if (subtitles.currentCue(); as cue) {
                  <div class="fs-subtitle-inner">
                    <div class="fs-subtitle-text" [class]="'text-' + settings.settings().language">
                      @if (subtitles.isTokenizing()) {
                        <span class="fs-word">{{ cue.text }}</span>
                      } @else {
                        @for (token of getFullscreenTokens(cue); track $index) {<span 
                            class="fs-word"
                            [class.fs-word--saved]="vocab.hasWord(token.surface)"
                            (click)="onFullscreenWordClick(token, cue.text, $event)"
                          >{{ token.surface }}</span>}
                      }
                    </div>
                  </div>
                }
              </div>
            }

            <!-- Fullscreen Word Popup (inline) -->
            @if (isFullscreen() && fsPopupVisible()) {
              <div class="fs-popup-overlay" (click)="closeFsPopup()">
                <div class="fs-popup" (click)="$event.stopPropagation()">
                  <button class="fs-popup-close" (click)="closeFsPopup()">
                    <app-icon name="x" [size]="18" />
                  </button>
                  
                  <div class="fs-popup-header">
                    <h3 class="fs-popup-word" [class]="'text-' + settings.settings().language">
                      {{ fsSelectedWord()?.surface }}
                    </h3>
                    @if (fsEntry()?.reading) {
                      <span class="fs-popup-reading">{{ fsEntry()?.reading }}</span>
                    }
                    @if (fsEntry()?.pinyin) {
                      <span class="fs-popup-reading">{{ fsEntry()?.pinyin }}</span>
                    }
                    @if (fsEntry()?.romanization) {
                      <span class="fs-popup-reading">{{ fsEntry()?.romanization }}</span>
                    }
                  </div>

                  <div class="fs-popup-body">
                    @if (fsLookupLoading()) {
                      <div class="fs-popup-loading">
                        <app-icon name="loader" [size]="20" />
                      </div>
                    } @else if (fsEntry()) {
                      @if (fsEntry()?.jlptLevel || fsEntry()?.hskLevel || fsEntry()?.topikLevel) {
                        <div class="fs-popup-badges">
                          @if (fsEntry()?.jlptLevel) {
                            <span class="badge">{{ fsEntry()?.jlptLevel }}</span>
                          }
                          @if (fsEntry()?.hskLevel) {
                            <span class="badge">HSK {{ fsEntry()?.hskLevel }}</span>
                          }
                          @if (fsEntry()?.topikLevel) {
                            <span class="badge">TOPIK {{ fsEntry()?.topikLevel }}</span>
                          }
                        </div>
                      }
                      <div class="fs-popup-meaning">
                        {{ fsEntry()?.meanings?.[0]?.definition || '(no definition)' }}
                      </div>
                    } @else {
                      <div class="fs-popup-meaning">{{ i18n.t('popup.noDictionaryEntry') }}</div>
                    }
                  </div>

                  <div class="fs-popup-actions">
                    @if (fsWordSaved()) {
                      <button class="fs-popup-btn fs-popup-btn--saved" disabled>
                        <app-icon name="check" [size]="16" />
                        {{ i18n.t('popup.saved') }}
                      </button>
                    } @else {
                      <button class="fs-popup-btn fs-popup-btn--save" (click)="saveFsWord()">
                        <app-icon name="plus" [size]="16" />
                        {{ i18n.t('popup.saveWord') }}
                      </button>
                    }
                    <button class="fs-popup-btn" (click)="resumeAndClose()">
                      <app-icon name="play" [size]="16" />
                      Resume
                    </button>
                  </div>
                </div>
              </div>
            }
            
            <!-- Custom Controls -->
            <div 
              class="custom-controls" 
              [class.controls-hidden]="!areControlsVisible() && youtube.isPlaying()"
            >
              <!-- Progress Bar -->
              <div 
                class="progress-container" 
                (mousedown)="startSeeking($event)" 
                (touchstart)="startSeeking($event)"
                (mousemove)="updateSeekPreview($event)"
                (mouseleave)="hideSeekPreview()"
                #progressBar
              >
                <div class="progress-buffered" [style.width.%]="bufferedPercentage()"></div>
                <div class="progress-fill" [style.width.%]="progressPercentage()"></div>
                <div class="progress-handle" [style.left.%]="progressPercentage()"></div>
                
                @if (seekPreview().visible) {
                  <div class="seek-tooltip" [style.left.px]="seekPreview().position">
                    {{ formatTime(seekPreview().time) }}
                  </div>
                }
              </div>

              <div class="controls-row">
                <!-- Left Controls -->
                <div class="controls-left">
                  <button class="control-btn play-btn" (click)="togglePlay()" title="Play/Pause (Space)">
                    <app-icon [name]="youtube.isPlaying() ? 'pause' : 'play'" [size]="22" />
                  </button>

                  <!-- Skip buttons - desktop only -->
                  <button class="control-btn skip-btn desktop-only" (click)="seekRelative(-10)" title="Rewind 10s">
                    <app-icon name="rewind" [size]="18" />
                  </button>
                  <button class="control-btn skip-btn desktop-only" (click)="seekRelative(10)" title="Forward 10s">
                    <app-icon name="fast-forward" [size]="18" />
                  </button>

                  <!-- Volume - desktop only -->
                  <div class="volume-control desktop-only" (mouseenter)="showVolumeSlider()" (mouseleave)="hideVolumeSlider()">
                    <button class="control-btn" (click)="toggleMute()" title="Mute (M)">
                      <app-icon [name]="getVolumeIcon()" [size]="18" />
                    </button>
                    <div class="volume-slider-container" [class.visible]="isVolumeSliderVisible()">
                      <input 
                        type="range" 
                        class="volume-slider"
                        min="0" 
                        max="100" 
                        [value]="volume()"
                        (input)="onVolumeChange($event)"
                        (mousedown)="$event.stopPropagation()"
                      />
                    </div>
                  </div>

                  <!-- Time Display -->
                  <div class="time-display">
                    <span class="time-current">{{ formatTime(displayTime()) }}</span>
                    <span class="time-separator">/</span>
                    <span class="time-total">{{ formatTime(youtube.duration()) }}</span>
                  </div>
                </div>

                <!-- Right Controls -->
                <div class="controls-right">
                  <!-- Playback Speed - desktop only -->
                  <div class="speed-control desktop-only" [class.open]="isSpeedMenuOpen()">
                    <button class="control-btn speed-btn" (click)="toggleSpeedMenu($event)" title="Speed">
                      <span class="speed-label">{{ currentSpeed() }}x</span>
                    </button>
                    @if (isSpeedMenuOpen()) {
                      <div class="speed-menu" (click)="$event.stopPropagation()">
                        @for (speed of playbackSpeeds; track speed) {
                          <button 
                            class="speed-option"
                            [class.active]="currentSpeed() === speed"
                            (click)="setPlaybackSpeed(speed)"
                          >
                          {{ speed === 1 ? i18n.t('player.normal') : speed + 'x' }}
                          </button>
                        }
                      </div>
                    }
                  </div>

                  <!-- Fullscreen -->
                  <button class="control-btn" (click)="toggleFullscreen()" title="Fullscreen (F)">
                    <app-icon [name]="isFullscreen() ? 'minimize' : 'maximize'" [size]="18" />
                  </button>
                  
                  <!-- Close - not in fullscreen -->
                  @if (!isFullscreen()) {
                    <button class="control-btn close-btn" (click)="closeVideo()" title="Close">
                      <app-icon name="x" [size]="18" />
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Video Info (outside fullscreen container) -->
        @if (!isFullscreen()) {
          <div class="video-info">
            <h2 class="video-title">{{ youtube.currentVideo()?.title }}</h2>
            @if (youtube.currentVideo()?.channel) {
              <span class="video-channel">{{ youtube.currentVideo()?.channel }}</span>
            }
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .player-wrapper {
      width: 100%;
    }

    /* ============================================
       INPUT STATE
       ============================================ */
    .video-input {
      background: var(--bg-card);
      border-radius: var(--border-radius-lg);
      padding: var(--space-lg);
      border: 1px solid var(--border-color);
    }

    .input-group {
      display: flex;
      gap: var(--space-sm);
    }

    .input-wrapper {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
    }

    .input-icon {
      position: absolute;
      left: 12px;
      color: var(--text-muted);
      pointer-events: none;
    }

    .url-input {
      padding-left: 40px;
      height: 44px;
    }

    .load-btn {
      height: 44px;
      padding: 0 20px;
    }

    .error-banner {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      margin-top: var(--space-md);
      padding: var(--space-sm) var(--space-md);
      background: var(--word-new);
      color: var(--error);
      border-radius: var(--border-radius);
      font-size: 0.875rem;
    }

    .hints {
      margin-top: var(--space-lg);
    }

    .hint-text {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    /* ============================================
       VIDEO CONTAINER
       ============================================ */
    .video-container {
      background: #000;
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      position: relative;
    }

    .video-container.is-fullscreen {
      position: fixed;
      inset: 0;
      z-index: 9998;
      border-radius: 0;
    }

    .video-embed-ratio {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%;
      background: #000;
      overflow: hidden;
    }

    .is-fullscreen .video-embed-ratio {
      padding-bottom: 0;
      height: 100vh;
    }

    #youtube-player {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      border: none;
    }

    /* ============================================
       LOADING OVERLAY
       ============================================ */
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--space-md);
      z-index: 15;
    }

    .loading-spinner {
      color: white;
    }

    .loading-text {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.875rem;
    }

    /* ============================================
       PLAYER OVERLAY & ZONES
       ============================================ */
    .player-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      display: flex;
      -webkit-tap-highlight-color: transparent;
    }

    .zone {
      height: 100%;
      position: relative;
      -webkit-tap-highlight-color: transparent;
      outline: none;
      overflow: hidden;
    }

    .zone.left, .zone.right {
      width: 25%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .zone.center {
      width: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .big-play-btn {
      width: 64px;
      height: 64px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease;
    }

    .play-pause-feedback {
      width: 64px;
      height: 64px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      backdrop-filter: blur(4px);
      pointer-events: none;
    }

    .center-feedback {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 15;
    }

    .play-pause-feedback.animate {
      animation: playPausePop 0.4s ease-out forwards;
    }

    @keyframes playPausePop {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
      30% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
      60% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }

    .feedback-icon {
      color: rgba(255, 255, 255, 0.9);
      background: rgba(0, 0, 0, 0.5);
      padding: 16px 20px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      opacity: 0;
      transform: scale(0.8);
      pointer-events: none;
    }

    .feedback-icon span {
      font-size: 0.75rem;
      font-weight: 600;
    }

    .feedback-icon.animate {
      animation: flashFeedback 0.5s ease-out forwards;
    }

    @keyframes flashFeedback {
      0% { opacity: 0; transform: scale(0.5); }
      20% { opacity: 1; transform: scale(1.1); }
      80% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(0.8); }
    }

    .volume-feedback {
      width: 64px;
      height: 64px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      backdrop-filter: blur(4px);
      pointer-events: none;
    }

    .volume-feedback.animate {
      animation: volumePop 0.6s ease-out forwards;
    }

    @keyframes volumePop {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
      20% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
      80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
    }

    .ripple-effect {
      position: absolute;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%) scale(0);
      animation: ripple 0.6s ease-out forwards;
      pointer-events: none;
    }

    @keyframes ripple {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
    }

    /* ============================================
       MINI PROGRESS BAR
       ============================================ */
    .mini-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: rgba(255, 255, 255, 0.3);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 25;
    }

    .mini-progress.visible {
      opacity: 1;
    }

    .mini-progress__fill {
      height: 100%;
      background: var(--accent-primary);
      transition: width 0.1s linear;
    }

    /* ============================================
       CUSTOM CONTROLS
       ============================================ */
    .custom-controls {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, transparent 100%);
      padding: var(--space-lg) var(--space-md) var(--space-sm);
      z-index: 20;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      transition: opacity 0.3s ease, visibility 0.3s ease;
      opacity: 1;
      visibility: visible;
    }

    .controls-hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    /* ============================================
       PROGRESS BAR
       ============================================ */
    .progress-container {
      width: 100%;
      height: 5px;
      background: rgba(255, 255, 255, 0.2);
      position: relative;
      cursor: pointer;
      border-radius: 2.5px;
      transition: height 0.1s ease;
    }

    .progress-container:hover {
      height: 7px;
    }

    .progress-container:hover .progress-handle {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }

    .progress-buffered {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 2.5px;
      pointer-events: none;
    }

    .progress-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: var(--accent-primary);
      border-radius: 2.5px;
      pointer-events: none;
    }

    .progress-handle {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 14px;
      height: 14px;
      background: var(--accent-primary);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.15s ease, transform 0.15s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .seek-tooltip {
      position: absolute;
      bottom: 16px;
      transform: translateX(-50%);
      padding: 4px 8px;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      font-size: 0.75rem;
      font-family: var(--font-mono);
      border-radius: 4px;
      white-space: nowrap;
      pointer-events: none;
      z-index: 30;
    }

    /* ============================================
       CONTROLS ROW
       ============================================ */
    .controls-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-sm);
    }

    .controls-left, .controls-right {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
    }

    .control-btn {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.9);
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: all 0.15s ease;
      min-width: 36px;
      height: 36px;
    }

    @media (hover: hover) {
      .control-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }
    }

    .control-btn:active {
      transform: scale(0.95);
    }
    
    .play-btn {
      min-width: 40px;
      height: 40px;
    }

    .desktop-only {
      display: flex;
    }

    .time-display {
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      color: rgba(255, 255, 255, 0.9);
      display: flex;
      gap: 4px;
      margin-left: var(--space-xs);
      user-select: none;
    }
    
    .time-separator {
      color: rgba(255, 255, 255, 0.5);
    }

    /* ============================================
       VOLUME CONTROL
       ============================================ */
    .volume-control {
      display: flex;
      align-items: center;
      position: relative;
    }

    .volume-slider-container {
      width: 0;
      overflow: hidden;
      transition: width 0.2s ease, opacity 0.2s ease;
      opacity: 0;
      display: flex;
      align-items: center;
      padding-left: 0;
    }

    .volume-slider-container.visible {
      width: 80px;
      opacity: 1;
      padding-left: 8px;
    }

    .volume-slider {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 8px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      cursor: pointer;
      outline: none;
      margin: 0;
      padding: 0;
    }

    .volume-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    }

    .volume-slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      cursor: pointer;
      border: none;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    }

    .volume-slider::-moz-range-track {
      background: rgba(255, 255, 255, 0.3);
      height: 8px;
      border-radius: 4px;
    }

    /* ============================================
       SPEED CONTROL
       ============================================ */
    .speed-control {
      position: relative;
    }

    .speed-btn {
      min-width: 48px;
    }

    .speed-label {
      font-size: 0.8125rem;
      font-weight: 500;
    }

    .speed-menu {
      position: absolute;
      bottom: 100%;
      right: 0;
      margin-bottom: 8px;
      background: rgba(28, 28, 28, 0.95);
      border-radius: 8px;
      padding: 8px 0;
      min-width: 120px;
      max-height: 250px;
      overflow-y: auto;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      z-index: 100;
      animation: menuSlideUp 0.15s ease;
    }

    @keyframes menuSlideUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .speed-option {
      width: 100%;
      padding: 10px 16px;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.875rem;
      text-align: left;
      cursor: pointer;
      transition: all 0.1s ease;
    }

    .speed-option:hover {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .speed-option.active {
      color: var(--accent-primary);
      font-weight: 500;
    }

    .speed-option.active::after {
      content: '✓';
      float: right;
      font-size: 0.75rem;
    }

    /* ============================================
       VIDEO INFO
       ============================================ */
    .video-info {
      padding: var(--space-md) 0;
    }

    .video-title {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 4px;
    }

    .video-channel {
      font-size: 0.8125rem;
      color: var(--text-muted);
    }

    /* ============================================
       FULLSCREEN SUBTITLE OVERLAY
       ============================================ */
    .fullscreen-subtitle {
      position: absolute;
      bottom: 70px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 90%;
      width: 90%;
      z-index: 18;
      text-align: center;
      transition: bottom 0.3s ease, opacity 0.3s ease;
      pointer-events: auto;
      display: flex;
      justify-content: center;
    }

    .fullscreen-subtitle.controls-visible {
      bottom: 80px;
    }

    .fullscreen-subtitle.popup-open {
      opacity: 0.4;
    }

    /* Inner container with background for long subtitles */
    .fs-subtitle-inner {
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-radius: 12px;
      padding: 12px 20px;
      max-height: 35vh;
      overflow-y: auto;
      overflow-x: hidden;
      animation: subtitleFadeIn 0.25s ease-out;
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
    }

    .fs-subtitle-inner::-webkit-scrollbar {
      width: 4px;
    }

    .fs-subtitle-inner::-webkit-scrollbar-track {
      background: transparent;
    }

    .fs-subtitle-inner::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
    }

    @keyframes subtitleFadeIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .fs-subtitle-text {
      display: inline;
      font-size: 1.5rem;
      line-height: 2;
      color: white;
      text-shadow: none;
      word-break: keep-all;
    }

    .fullscreen-subtitle.fs-small .fs-subtitle-text {
      font-size: 1.25rem;
      line-height: 1.8;
    }

    .fullscreen-subtitle.fs-large .fs-subtitle-text {
      font-size: 2rem;
      line-height: 2.2;
    }

    .fs-word {
      cursor: pointer;
      padding: 2px 4px;
      border-radius: 4px;
      transition: background 0.15s ease, transform 0.1s ease;
      display: inline;
    }

    @media (hover: hover) {
      .fs-word:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }

    .fs-word:active {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0.98);
    }

    .fs-word--saved {
      border-bottom: 2px solid var(--accent-primary);
      background: rgba(199, 62, 58, 0.15);
    }

    /* ============================================
       FULLSCREEN POPUP (INLINE)
       ============================================ */
    .fs-popup-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 50;
      animation: fadeIn 0.2s ease;
      padding: var(--space-md);
    }

    .fs-popup {
      background: var(--bg-card);
      border-radius: var(--border-radius-lg);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
      max-width: 320px;
      width: 100%;
      position: relative;
      animation: popupSlideUp 0.25s ease;
    }

    @keyframes popupSlideUp {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .fs-popup-close {
      position: absolute;
      top: var(--space-sm);
      right: var(--space-sm);
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      border-radius: var(--border-radius);
      transition: all 0.15s ease;
      z-index: 1;
    }

    .fs-popup-close:hover {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    .fs-popup-header {
      padding: var(--space-md);
      padding-right: 48px;
      text-align: center;
      border-bottom: 1px solid var(--border-color);
    }

    .fs-popup-word {
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 4px;
    }

    .fs-popup-reading {
      font-size: 0.9375rem;
      color: var(--text-secondary);
      display: block;
    }

    .fs-popup-body {
      padding: var(--space-md);
      min-height: 60px;
    }

    .fs-popup-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
    }

    .fs-popup-loading app-icon {
      animation: spin 1s linear infinite;
    }

    .fs-popup-badges {
      display: flex;
      gap: var(--space-xs);
      justify-content: center;
      margin-bottom: var(--space-sm);
    }

    .fs-popup-badges .badge {
      padding: 2px 8px;
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--accent-primary);
      background: rgba(199, 62, 58, 0.1);
      border-radius: 4px;
    }

    .fs-popup-meaning {
      font-size: 0.9375rem;
      color: var(--text-secondary);
      text-align: center;
      line-height: 1.5;
    }

    .fs-popup-actions {
      display: flex;
      gap: var(--space-sm);
      padding: var(--space-md);
      border-top: 1px solid var(--border-color);
    }

    .fs-popup-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-xs);
      padding: 10px 16px;
      font-size: 0.875rem;
      font-weight: 500;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: all 0.15s ease;
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    .fs-popup-btn:hover {
      background: var(--bg-card);
      box-shadow: var(--shadow-sm);
    }

    .fs-popup-btn--save {
      background: var(--accent-primary);
      color: white;
    }

    .fs-popup-btn--save:hover {
      background: #b32d29;
    }

    .fs-popup-btn--saved {
      background: var(--word-known);
      color: var(--success);
      cursor: default;
    }

    /* ============================================
       MOBILE RESPONSIVE
       ============================================ */
    @media (max-width: 640px) {
      .video-container {
        border-radius: 0;
        margin: 0 calc(var(--mobile-padding) * -1);
        width: calc(100% + var(--mobile-padding) * 2);
      }

      .desktop-only {
        display: none !important;
      }

      .player-overlay {
        height: calc(100% - 50px);
      }

      .zone.left, .zone.right {
        width: 30%;
      }
      
      .zone.center {
        width: 40%;
      }

      .custom-controls {
        padding: var(--space-md) var(--space-sm) var(--space-xs);
      }

      .progress-container {
        height: 8px;
      }

      .progress-handle {
        width: 18px;
        height: 18px;
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }

      .control-btn {
        min-width: 44px;
        height: 44px;
        padding: 12px;
      }

      .play-btn {
        min-width: 48px;
        height: 48px;
      }

      .time-display {
        font-size: 0.75rem;
      }

      .video-input {
        padding: var(--mobile-padding);
        border-radius: var(--mobile-card-radius);
      }

      .input-group {
        flex-direction: column;
        gap: var(--space-sm);
      }

      .url-input {
        height: 48px;
        font-size: 16px;
        border-radius: 10px;
      }

      .load-btn {
        width: 100%;
        height: 48px;
        border-radius: 10px;
        font-size: 1rem;
      }

      .video-info {
        padding: var(--space-sm) 0;
      }

      .video-title {
        font-size: 0.9375rem;
      }

      /* Fullscreen subtitle mobile */
      .fullscreen-subtitle {
        bottom: 60px;
        max-width: 95%;
        width: 95%;
        padding: 0;
      }

      .fullscreen-subtitle.controls-visible {
        bottom: 70px;
      }

      .fs-subtitle-inner {
        padding: 10px 16px;
        max-height: 40vh;
        border-radius: 10px;
      }

      .fs-subtitle-text {
        font-size: 1.125rem;
        line-height: 1.7;
      }

      .fullscreen-subtitle.fs-small .fs-subtitle-text {
        font-size: 1rem;
        line-height: 1.6;
      }

      .fullscreen-subtitle.fs-large .fs-subtitle-text {
        font-size: 1.375rem;
        line-height: 1.8;
      }

      .fs-word {
        padding: 4px 5px;
        border-radius: 6px;
      }

      /* Fullscreen popup mobile */
      .fs-popup {
        max-width: 90%;
      }

      .fs-popup-word {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .video-container {
        margin: 0 calc(var(--space-md) * -1);
        width: calc(100% + var(--space-md) * 2);
      }

      .big-play-btn {
        width: 56px;
        height: 56px;
      }

      .big-play-btn app-icon {
        width: 36px;
        height: 36px;
      }
    }

    /* Fullscreen specific */
    .is-fullscreen .video-info {
      display: none;
    }

    .is-fullscreen .desktop-only {
      display: flex;
    }

    /* Landscape phone adjustments */
    @media (max-height: 500px) and (orientation: landscape) {
      .fullscreen-subtitle {
        bottom: 55px;
        max-width: 80%;
        width: 80%;
      }

      .fullscreen-subtitle.controls-visible {
        bottom: 65px;
      }

      .fs-subtitle-inner {
        padding: 8px 14px;
        max-height: 30vh;
      }

      .fs-subtitle-text {
        font-size: 1rem;
        line-height: 1.5;
      }

      .fs-popup {
        max-width: 400px;
      }
    }

    /* Portrait phone fullscreen - critical for long subtitles */
    @media (max-width: 480px) and (orientation: portrait) {
      .is-fullscreen .fullscreen-subtitle {
        bottom: 55px;
        max-width: 96%;
        width: 96%;
      }

      .is-fullscreen .fullscreen-subtitle.controls-visible {
        bottom: 65px;
      }

      .is-fullscreen .fs-subtitle-inner {
        padding: 10px 14px;
        max-height: 45vh;
        border-radius: 8px;
      }

      .is-fullscreen .fs-subtitle-text {
        font-size: 1rem;
        line-height: 1.65;
      }

      .is-fullscreen .fullscreen-subtitle.fs-small .fs-subtitle-text {
        font-size: 0.9375rem;
      }

      .is-fullscreen .fullscreen-subtitle.fs-large .fs-subtitle-text {
        font-size: 1.25rem;
      }

      .is-fullscreen .fs-word {
        padding: 3px 4px;
      }
    }
  `]
})
export class VideoPlayerComponent implements OnDestroy {
  private document = inject(DOCUMENT);
  private router = inject(Router);
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);
  transcript = inject(TranscriptService);
  settings = inject(SettingsService);
  vocab = inject(VocabularyService);
  private dictionary = inject(DictionaryService);
  i18n = inject(I18nService);

  // Outputs
  fullscreenWordClicked = output<{ token: Token; sentence: string }>();
  fullscreenChanged = output<boolean>();

  videoUrl = '';
  isLoading = signal(false);
  error = signal<string | null>(null);

  // UI State
  areControlsVisible = signal(true);
  isFullscreen = signal(false);
  isVolumeSliderVisible = signal(false);
  isSpeedMenuOpen = signal(false);
  volume = signal(100);
  currentSpeed = signal<PlaybackSpeed>(1);

  // Seeking State
  isDragging = signal(false);
  previewTime = signal(0);
  seekPreview = signal<SeekPreview>({ visible: false, time: 0, position: 0 });
  bufferedPercentage = signal(0);

  // Fullscreen popup state
  fsPopupVisible = signal(false);
  fsSelectedWord = signal<Token | null>(null);
  fsSelectedSentence = signal<string>('');
  fsEntry = signal<DictionaryEntry | null>(null);
  fsLookupLoading = signal(false);
  fsWordSaved = signal(false);

  // Playback speeds
  readonly playbackSpeeds: PlaybackSpeed[] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  displayTime = computed(() => {
    return this.isDragging() ? this.previewTime() : this.youtube.currentTime();
  });

  progressPercentage = computed(() => {
    const time = this.displayTime();
    const duration = this.youtube.duration();
    if (!duration) return 0;
    return (time / duration) * 100;
  });

  // Feedback animations
  rewindFeedback = signal(false);
  forwardFeedback = signal(false);
  feedbackIconName = signal<'play' | 'pause'>('play');
  playPauseFeedback = signal(false);
  leftRipple = signal(false);
  rightRipple = signal(false);
  ripplePos = signal({ x: 0, y: 0 });

  // Volume feedback
  volumeFeedback = signal(false);
  volumeFeedbackIcon = signal<'volume-2' | 'volume-1' | 'volume-x'>('volume-2');

  // Touch detection
  private isTouchDevice = false;

  private controlsTimeout: ReturnType<typeof setTimeout> | null = null;
  private volumeSliderTimeout: ReturnType<typeof setTimeout> | null = null;
  private lastTapTime = 0;
  private tapTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly DOUBLE_TAP_DELAY = 300;
  private bufferedInterval: ReturnType<typeof setInterval> | null = null;
  private transcriptSubscription: Subscription | null = null;

  @ViewChild('progressBar') progressBar!: ElementRef<HTMLDivElement>;
  @ViewChild('videoContainer') videoContainerRef!: ElementRef<HTMLDivElement>;

  // Keyboard controls
  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.youtube.currentVideo()) return;

    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }

    // Close fullscreen popup on Escape
    if (event.code === 'Escape' && this.fsPopupVisible()) {
      this.closeFsPopup();
      return;
    }

    switch (event.code) {
      case 'Space':
        event.preventDefault();
        this.togglePlay();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.seekRelative(-10);
        this.triggerFeedback('rewind');
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.seekRelative(10);
        this.triggerFeedback('forward');
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.adjustVolume(10);
        this.showVolumeFeedback();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.adjustVolume(-10);
        this.showVolumeFeedback();
        break;
      case 'KeyM':
        this.toggleMute();
        break;
      case 'KeyF':
        this.toggleFullscreen();
        break;
      case 'Comma':
        if (event.shiftKey) this.decreaseSpeed();
        break;
      case 'Period':
        if (event.shiftKey) this.increaseSpeed();
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.speed-control')) {
      this.isSpeedMenuOpen.set(false);
    }

    if (!this.areControlsVisible() || !this.youtube.isPlaying()) return;
    const videoContainer = this.videoContainerRef?.nativeElement;
    if (videoContainer && !videoContainer.contains(target)) {
      this.areControlsVisible.set(false);
      this.clearControlsTimeout();
    }
  }

  @HostListener('document:fullscreenchange')
  onFullscreenChange() {
    const isFs = !!this.document.fullscreenElement;
    this.isFullscreen.set(isFs);
    this.fullscreenChanged.emit(isFs);
    // Close popup when exiting fullscreen
    if (!this.document.fullscreenElement && this.fsPopupVisible()) {
      this.closeFsPopup();
    }
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    effect(() => {
      const currentVideo = this.youtube.currentVideo();
      if (currentVideo && !this.youtube.isReady() && !this.isLoading()) {
        const savedTime = this.youtube.currentTime();
        this.waitForElement('youtube-player').then(async () => {
          await this.restorePlayer(currentVideo.id);
          if (savedTime > 0) {
            this.youtube.seekTo(savedTime);
          }
        });
      }
    });

    effect(() => {
      if (this.youtube.isReady()) {
        this.volume.set(this.youtube.getVolume());
        this.currentSpeed.set(this.youtube.getPlaybackRate() as PlaybackSpeed);
        this.startBufferedTracking();
      }
    });

    effect(() => {
      if (!this.youtube.currentVideo()) {
        this.videoUrl = '';
      }
    });

    effect(() => {
      if (this.youtube.isPlaying()) {
        this.showControls();
      } else {
        this.areControlsVisible.set(true);
        this.clearControlsTimeout();
      }
    });
  }

  // ============================================
  // USER ACTIVITY
  // ============================================

  onUserActivity() {
    this.showControls();
  }

  onMouseLeave() {
    if (this.youtube.isPlaying()) {
      this.hideControlsAfterDelay(1000);
    }
  }

  private showControls() {
    this.areControlsVisible.set(true);
    this.clearControlsTimeout();

    if (this.youtube.isPlaying()) {
      this.hideControlsAfterDelay(3000);
    }
  }

  private hideControlsAfterDelay(ms: number) {
    this.controlsTimeout = setTimeout(() => {
      if (this.youtube.isPlaying() && !this.isSpeedMenuOpen() && !this.fsPopupVisible()) {
        this.areControlsVisible.set(false);
      }
    }, ms);
  }

  private clearControlsTimeout() {
    if (this.controlsTimeout) {
      clearTimeout(this.controlsTimeout);
      this.controlsTimeout = null;
    }
  }

  // ============================================
  // PLAYBACK CONTROLS
  // ============================================

  togglePlay() {
    const willPlay = !this.youtube.isPlaying();
    this.feedbackIconName.set(willPlay ? 'play' : 'pause');
    this.youtube.togglePlay();
    this.triggerPlayPauseFeedback();
    this.showControls();
  }

  private triggerPlayPauseFeedback() {
    this.playPauseFeedback.set(true);
    setTimeout(() => this.playPauseFeedback.set(false), 400);
  }

  seekRelative(seconds: number) {
    this.youtube.seekRelative(seconds);
    this.showControls();
  }

  private triggerFeedback(type: 'rewind' | 'forward') {
    if (type === 'rewind') {
      this.rewindFeedback.set(true);
      setTimeout(() => this.rewindFeedback.set(false), 500);
    } else {
      this.forwardFeedback.set(true);
      setTimeout(() => this.forwardFeedback.set(false), 500);
    }
  }

  // ============================================
  // ZONE TAP HANDLING
  // ============================================

  handleZoneTap(seconds: number) {
    if (!this.isTouchDevice) {
      this.togglePlay();
      return;
    }

    const currentTime = Date.now();
    const tapLength = currentTime - this.lastTapTime;

    if (tapLength < this.DOUBLE_TAP_DELAY && tapLength > 0) {
      if (this.tapTimeout) clearTimeout(this.tapTimeout);
      this.seekRelative(seconds);
      this.triggerFeedback(seconds < 0 ? 'rewind' : 'forward');

      if (seconds < 0) {
        this.leftRipple.set(true);
        setTimeout(() => this.leftRipple.set(false), 600);
      } else {
        this.rightRipple.set(true);
        setTimeout(() => this.rightRipple.set(false), 600);
      }
    } else {
      this.tapTimeout = setTimeout(() => {
        this.showControls();
      }, this.DOUBLE_TAP_DELAY);
    }

    this.lastTapTime = currentTime;
  }

  handleCenterTap() {
    this.togglePlay();
  }

  // ============================================
  // VOLUME CONTROL
  // ============================================

  toggleMute() {
    if (this.youtube.isMuted() || this.volume() === 0) {
      this.youtube.unmute();
      if (this.volume() === 0) {
        this.youtube.setVolume(50);
        this.volume.set(50);
      }
    } else {
      this.youtube.mute();
    }
    this.showControls();
  }

  getVolumeIcon(): 'volume-2' | 'volume-x' {
    if (this.youtube.isMuted() || this.volume() === 0) {
      return 'volume-x';
    }
    return 'volume-2';
  }

  showVolumeSlider() {
    if (this.volumeSliderTimeout) {
      clearTimeout(this.volumeSliderTimeout);
    }
    this.isVolumeSliderVisible.set(true);
  }

  hideVolumeSlider() {
    this.volumeSliderTimeout = setTimeout(() => {
      this.isVolumeSliderVisible.set(false);
    }, 500);
  }

  onVolumeChange(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value);
    this.volume.set(value);
    this.youtube.setVolume(value);
    if (value > 0 && this.youtube.isMuted()) {
      this.youtube.unmute();
    }
  }

  private adjustVolume(delta: number) {
    const newVolume = Math.max(0, Math.min(100, this.volume() + delta));
    this.volume.set(newVolume);
    this.youtube.setVolume(newVolume);
    if (newVolume > 0 && this.youtube.isMuted()) {
      this.youtube.unmute();
    }
  }

  private showVolumeFeedback() {
    const vol = this.volume();
    if (vol === 0 || this.youtube.isMuted()) {
      this.volumeFeedbackIcon.set('volume-x');
    } else if (vol < 50) {
      this.volumeFeedbackIcon.set('volume-1');
    } else {
      this.volumeFeedbackIcon.set('volume-2');
    }
    this.volumeFeedback.set(true);
    setTimeout(() => this.volumeFeedback.set(false), 600);
  }

  // ============================================
  // PLAYBACK SPEED
  // ============================================

  toggleSpeedMenu(event: Event) {
    event.stopPropagation();
    this.isSpeedMenuOpen.update(v => !v);
  }

  setPlaybackSpeed(speed: PlaybackSpeed) {
    this.currentSpeed.set(speed);
    this.youtube.setPlaybackRate(speed);
    this.isSpeedMenuOpen.set(false);
  }

  private increaseSpeed() {
    const currentIndex = this.playbackSpeeds.indexOf(this.currentSpeed());
    if (currentIndex < this.playbackSpeeds.length - 1) {
      this.setPlaybackSpeed(this.playbackSpeeds[currentIndex + 1]);
    }
  }

  private decreaseSpeed() {
    const currentIndex = this.playbackSpeeds.indexOf(this.currentSpeed());
    if (currentIndex > 0) {
      this.setPlaybackSpeed(this.playbackSpeeds[currentIndex - 1]);
    }
  }

  // ============================================
  // FULLSCREEN
  // ============================================

  async toggleFullscreen() {
    const container = this.videoContainerRef?.nativeElement;
    if (!container) return;

    try {
      if (this.isFullscreen()) {
        await this.document.exitFullscreen();
      } else {
        await container.requestFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen not supported:', err);
    }
  }

  // ============================================
  // FULLSCREEN WORD POPUP
  // ============================================

  onFullscreenWordClick(token: Token, sentence: string, event: Event): void {
    event.stopPropagation();

    // Pause video
    if (this.youtube.isPlaying()) {
      this.youtube.pause();
    }

    // If not in fullscreen, emit to parent
    if (!this.isFullscreen()) {
      this.fullscreenWordClicked.emit({ token, sentence });
      return;
    }

    // Show inline popup
    this.fsSelectedWord.set(token);
    this.fsSelectedSentence.set(sentence);
    this.fsPopupVisible.set(true);
    this.fsWordSaved.set(this.vocab.hasWord(token.surface));
    this.fsEntry.set(null);

    // Lookup word
    this.fsLookupLoading.set(true);
    const lang = this.settings.settings().language;
    this.dictionary.lookup(token.surface, lang).subscribe({
      next: (entry) => {
        this.fsEntry.set(entry);
        this.fsLookupLoading.set(false);
      },
      error: () => {
        this.fsLookupLoading.set(false);
      }
    });

    this.showControls();
  }

  closeFsPopup(): void {
    this.fsPopupVisible.set(false);
    this.fsSelectedWord.set(null);
    this.fsEntry.set(null);
  }

  saveFsWord(): void {
    const word = this.fsSelectedWord();
    const entry = this.fsEntry();
    const lang = this.settings.settings().language;
    const sentence = this.fsSelectedSentence();

    if (!word) return;

    if (entry) {
      this.vocab.addFromDictionary(entry, lang, sentence);
    } else {
      this.vocab.addWord(word.surface, '', lang, word.reading, word.pinyin, word.romanization, sentence);
    }

    this.fsWordSaved.set(true);
  }

  resumeAndClose(): void {
    this.closeFsPopup();
    this.youtube.play();
  }

  // ============================================
  // PROGRESS BAR & SEEKING
  // ============================================

  updateSeekPreview(event: MouseEvent) {
    if (!this.youtube.duration() || !this.progressBar?.nativeElement) return;

    const rect = this.progressBar.nativeElement.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
    const time = percentage * this.youtube.duration();

    this.seekPreview.set({
      visible: true,
      time,
      position: Math.max(30, Math.min(rect.width - 30, offsetX))
    });
  }

  hideSeekPreview() {
    if (!this.isDragging()) {
      this.seekPreview.set({ visible: false, time: 0, position: 0 });
    }
  }

  startSeeking(event: MouseEvent | TouchEvent) {
    this.isDragging.set(true);
    this.updateSeek(event);

    const onMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      this.updateSeek(e);
    };

    const onUp = () => {
      this.stopSeeking();
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchend', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp);
  }

  private updateSeek(event: MouseEvent | TouchEvent) {
    if (!this.youtube.duration()) return;

    const rect = this.progressBar.nativeElement.getBoundingClientRect();
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, offsetX / rect.width));

    this.previewTime.set(percentage * this.youtube.duration());
  }

  private stopSeeking() {
    if (this.isDragging()) {
      this.youtube.seekTo(this.previewTime());
      this.isDragging.set(false);
      this.hideSeekPreview();
    }
  }

  // ============================================
  // BUFFERED TRACKING
  // ============================================

  private startBufferedTracking() {
    if (this.bufferedInterval) {
      clearInterval(this.bufferedInterval);
    }

    this.bufferedInterval = setInterval(() => {
      const loadedFraction = this.getLoadedFraction();
      this.bufferedPercentage.set(loadedFraction * 100);
    }, 1000);
  }

  private getLoadedFraction(): number {
    const duration = this.youtube.duration();
    const currentTime = this.youtube.currentTime();
    if (!duration) return 0;
    const bufferedTime = Math.min(currentTime + 30, duration);
    return bufferedTime / duration;
  }

  // ============================================
  // VIDEO LOADING
  // ============================================

  loadVideo(): void {
    const url = this.videoUrl.trim();
    if (!url) {
      this.error.set('Please enter a YouTube URL');
      return;
    }

    const videoId = this.youtube.extractVideoId(url);
    if (!videoId) {
      this.error.set('Invalid YouTube URL');
      return;
    }

    const currentVideo = this.youtube.currentVideo();
    if (currentVideo && currentVideo.id === videoId) {
      // Same video - just refetch captions (handles language change)
      this.subtitles.clear();
      this.transcript.reset();
      const lang = this.settings.settings().language;
      this.transcript.fetchTranscript(videoId, lang).subscribe({
        next: (cues) => {
          if (cues.length > 0) {
            this.subtitles.currentCueIndex.set(-1);
            this.subtitles.subtitles.set(cues);
            this.subtitles.tokenizeAllCues(lang);
          }
        }
      });
      return;
    }

    this.router.navigate(['/video'], { queryParams: { id: videoId } });
  }

  private async restorePlayer(videoId: string): Promise<void> {
    try {
      await this.youtube.initPlayer('youtube-player', videoId);
    } catch (err) {
      console.error('Failed to restore player:', err);
    }
  }

  private waitForElement(elementId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 10;

      const check = () => {
        const element = document.getElementById(elementId);
        if (element) {
          resolve();
        } else if (attempts >= maxAttempts) {
          reject(new Error(`Element #${elementId} not found`));
        } else {
          attempts++;
          setTimeout(check, 50 * attempts);
        }
      };

      requestAnimationFrame(check);
    });
  }

  closeVideo(): void {
    if (this.transcriptSubscription) {
      this.transcriptSubscription.unsubscribe();
      this.transcriptSubscription = null;
    }
    this.subtitles.cancelTokenization();
    this.youtube.reset();
    this.subtitles.clear();
    this.transcript.reset();
    this.videoUrl = '';
    this.error.set(null);
    this.router.navigate(['/video'], { replaceUrl: true });
  }

  // ============================================
  // FULLSCREEN SUBTITLE
  // ============================================

  getFullscreenTokens(cue: SubtitleCue): Token[] {
    const lang = this.settings.settings().language;
    return this.subtitles.getTokens(cue, lang);
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    this.clearControlsTimeout();
    if (this.volumeSliderTimeout) {
      clearTimeout(this.volumeSliderTimeout);
    }
    if (this.bufferedInterval) {
      clearInterval(this.bufferedInterval);
    }
    if (this.tapTimeout) {
      clearTimeout(this.tapTimeout);
    }
    this.youtube.destroy();
  }
}