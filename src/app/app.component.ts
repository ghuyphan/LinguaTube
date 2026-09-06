import { Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID, computed, Injector, afterNextRender, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith, interval, Subject, takeUntil, fromEvent } from 'rxjs';
import { IconComponent } from './shared/components/icon/icon.component';
import { SettingsSheetComponent } from './components/settings-sheet/settings-sheet.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BottomSheetComponent } from './shared/components/bottom-sheet/bottom-sheet.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { CommandPaletteComponent } from './shared/components/command-palette/command-palette.component';
import { StreakDialogComponent } from './components/streak-dialog/streak-dialog.component';
import { AiCreditsDialogComponent } from './components/ai-credits-dialog/ai-credits-dialog.component';
import { I18nService, SettingsService, SeoService, PwaService } from './core/services';
import { YoutubeService, TranscriptService, SubtitleService } from './features/video';
import { StreakService } from './services/streak.service';
import { BottomSheetService } from './services/bottom-sheet.service';
import { PlaylistService } from './features/playlist/playlist.service';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    IconComponent,
    SettingsSheetComponent,
    SidebarComponent,
    BottomSheetComponent,
    OnboardingComponent,
    CommandPaletteComponent,
    StreakDialogComponent,
    AiCreditsDialogComponent
  ],
  template: `
    <div class="app" [class.has-sidebar]="true" [class.sidebar-collapsed]="sidebarCollapsed()">
      
      @if (!settings.settings().hasCompletedOnboarding) {
        @defer {
          <app-onboarding />
        } @placeholder {
          <div class="onboarding-loading"></div>
        }
      } @else {
        <!-- Desktop Sidebar (lazy loaded) -->
        @defer (on idle) {
          <app-sidebar 
            class="desktop-sidebar"
            (openSettings)="showSettingsSheet.set(true)"
            (openCommandPalette)="showCommandPalette.set(true)"
            (openStreak)="showStreakSheet.set(true)"
            (openAiCredits)="showAiCreditsSheet.set(true)"
          />
        }

        <div class="app__content">
          <main class="main" [class.video-active]="hasVideo()">
            <div class="container">
              <router-outlet />
            </div>
          </main>
        </div>

        <!-- Mobile Bottom Navigation (Material 3) -->
        <nav class="bottom-nav">
          <div class="bottom-nav__items">
            <a
              class="bottom-nav__item"
              routerLink="/video"
              (click)="onLearnNavClick($event)"
              [class.active]="!anySheetOpen() && isRouteActive('/video')"
              [attr.aria-current]="(!anySheetOpen() && isRouteActive('/video')) ? 'page' : null"
            >
              <div class="bottom-nav__icon-wrap">
                <app-icon [name]="(!anySheetOpen() && isRouteActive('/video')) ? 'play-circle-filled' : 'play-circle'" [size]="22" />
                @if (hasActiveVideoSession()) {
                  <span class="now-playing-dot"></span>
                }
              </div>
              <span>{{ i18n.t('nav.watch') }}</span>
            </a>
            <a
              class="bottom-nav__item"
              routerLink="/study"
              [class.active]="!anySheetOpen() && isRouteActive('/study')"
              [attr.aria-current]="(!anySheetOpen() && isRouteActive('/study')) ? 'page' : null"
            >
              <div class="bottom-nav__icon-wrap">
                <app-icon [name]="(!anySheetOpen() && isRouteActive('/study')) ? 'graduation-cap-filled' : 'graduation-cap'" [size]="22" />
              </div>
              <span>{{ i18n.t('nav.review') }}</span>
            </a>
            <a
              class="bottom-nav__item"
              routerLink="/dictionary"
              [class.active]="!anySheetOpen() && isRouteActive('/dictionary')"
              [attr.aria-current]="(!anySheetOpen() && isRouteActive('/dictionary')) ? 'page' : null"
            >
              <div class="bottom-nav__icon-wrap">
                <app-icon [name]="(!anySheetOpen() && isRouteActive('/dictionary')) ? 'book-open-filled' : 'book-open'" [size]="22" />
              </div>
              <span>{{ i18n.t('nav.vocab') }}</span>
            </a>
            <a
              class="bottom-nav__item"
              routerLink="/explore"
              [class.active]="!anySheetOpen() && (isRouteActive('/explore') || isRouteActive('/playlists'))"
              [attr.aria-current]="(!anySheetOpen() && (isRouteActive('/explore') || isRouteActive('/playlists'))) ? 'page' : null"
            >
              <div class="bottom-nav__icon-wrap">
                <app-icon [name]="(!anySheetOpen() && (isRouteActive('/explore') || isRouteActive('/playlists'))) ? 'list-video-filled' : 'list-video'" [size]="22" />
              </div>
              <span>{{ i18n.t('nav.playlists') }}</span>
            </a>
            <button
              class="bottom-nav__item"
              type="button"
              [class.active]="showMoreSheet() || isRouteActive('/history')"
              (click)="toggleMoreSheet()"
              aria-haspopup="dialog"
              [attr.aria-expanded]="showMoreSheet()"
              [attr.aria-label]="i18n.t('nav.more') || 'More'"
            >
              <div class="bottom-nav__icon-wrap">
                <app-icon [name]="(showMoreSheet() || isRouteActive('/history')) ? 'more-horizontal-filled' : 'more-horizontal'" [size]="22" />
              </div>
              <span>{{ i18n.t('nav.more') }}</span>
            </button>
          </div>
        </nav>

        <!-- More Menu Sheet -->
        <app-bottom-sheet
          [isOpen]="showMoreSheet()"
          [title]="i18n.t('nav.more') || 'More'"
          [showCloseButton]="false"
          [maxHeight]="'auto'"
          (closed)="showMoreSheet.set(false)"
        >
          <div class="more-menu">
            <!-- Mobile Motivation & AI Credits Quick Bar -->
            <div class="more-menu__stats">
              <button class="more-stat-card" (click)="showMoreSheet.set(false); showStreakSheet.set(true)">
                <app-icon name="fire" [size]="20" class="stat-icon--fire" />
                <div class="more-stat-info">
                  <span class="more-stat-val">{{ streak.currentStreak() }}</span>
                  <span class="more-stat-lbl">{{ i18n.t('streak.dayStreak') || 'Day Streak' }}</span>
                </div>
              </button>
              <button class="more-stat-card" (click)="showMoreSheet.set(false); showAiCreditsSheet.set(true)">
                <app-icon name="diamond" [size]="20" class="stat-icon--diamond" />
                <div class="more-stat-info">
                  <span class="more-stat-val">{{ transcript.diamonds() }}/{{ transcript.maxDiamonds() }}</span>
                  <span class="more-stat-lbl">{{ i18n.t('subtitle.aiCredits') }}</span>
                </div>
              </button>
            </div>

            <!-- Action Rows -->
            <button class="more-menu__item" (click)="openNewVideo()">
              <div class="more-menu__item-icon">
                <app-icon name="plus" [size]="18" />
              </div>
              <div class="more-menu__item-text">
                <span class="more-menu__item-title">{{ i18n.t('nav.newVideo') }}</span>
              </div>
              <app-icon name="chevron-right" [size]="16" class="more-menu__chevron" />
            </button>

            <button class="more-menu__item" (click)="navigateFromMore('/history')">
              <div class="more-menu__item-icon">
                <app-icon name="clock" [size]="18" />
              </div>
              <div class="more-menu__item-text">
                <span class="more-menu__item-title">{{ i18n.t('history.title') }}</span>
              </div>
              <app-icon name="chevron-right" [size]="16" class="more-menu__chevron" />
            </button>

            @if (pwa.canInstall()) {
              <button class="more-menu__item more-menu__item--install" (click)="installAppFromMore()">
                <div class="more-menu__item-icon more-menu__item-icon--install">
                  <app-icon name="download" [size]="18" />
                </div>
                <div class="more-menu__item-text">
                  <span class="more-menu__item-title">{{ i18n.t('pwa.installApp') }}</span>
                  <span class="more-menu__item-desc">{{ i18n.t('pwa.installDesc') }}</span>
                </div>
                <app-icon name="chevron-right" [size]="16" class="more-menu__chevron" />
              </button>
            }

            <div class="more-menu__divider"></div>

            <button class="more-menu__item" (click)="showMoreSheet.set(false); showSettingsSheet.set(true)">
              <div class="more-menu__item-icon">
                <app-icon name="settings" [size]="18" />
              </div>
              <div class="more-menu__item-text">
                <span class="more-menu__item-title">{{ i18n.t('nav.settings') }}</span>
              </div>
              <app-icon name="chevron-right" [size]="16" class="more-menu__chevron" />
            </button>
          </div>
        </app-bottom-sheet>

        <!-- Bottom Sheets -->
        @defer (when showSettingsSheet()) {
          <app-settings-sheet 
            [isOpen]="showSettingsSheet()" 
            (closed)="showSettingsSheet.set(false)" 
            (openStreak)="showSettingsSheet.set(false); showStreakSheet.set(true)"
            (openAiCredits)="showSettingsSheet.set(false); showAiCreditsSheet.set(true)"
          />
        }

        @defer (when showStreakSheet()) {
          <app-bottom-sheet
            [isOpen]="showStreakSheet()"
            [title]="i18n.t('streak.dayStreak') || 'Streak'"
            [showCloseButton]="true"
            (closed)="showStreakSheet.set(false)"
          >
            <app-streak-dialog (dismissed)="sheetService.closeTop()" />
          </app-bottom-sheet>
        }

        @defer (when showAiCreditsSheet()) {
          <app-bottom-sheet
            [isOpen]="showAiCreditsSheet()"
            [title]="i18n.t('subtitle.aiCredits') || 'AI Credits'"
            [showCloseButton]="true"
            (closed)="showAiCreditsSheet.set(false)"
          >
            <app-ai-credits-dialog (dismissed)="sheetService.closeTop()" />
          </app-bottom-sheet>
        }

        <!-- Command Palette (lazy loaded on demand) -->
        @defer (when showCommandPalette()) {
          <app-command-palette
            [isOpen]="showCommandPalette()"
            (submitted)="onCommandPaletteSearch($event)"
            (closed)="showCommandPalette.set(false)"
          />
        }
      }

      <!-- Update Available Sheet (always available, even during onboarding) -->
      <app-bottom-sheet
        [isOpen]="showUpdateSheet()"
        [title]="i18n.t('app.updateAvailable') || 'Update Available'"
        [showCloseButton]="true"
        [maxHeight]="'auto'"
        (closed)="showUpdateSheet.set(false)"
      >
        <div class="update-sheet">
          <div class="update-sheet__icon">
            <app-icon name="rotate-ccw" [size]="32" />
          </div>
          <h3 class="update-sheet__title">{{ i18n.t('app.updateAvailable') }}</h3>
          <p class="update-sheet__message">{{ i18n.t('app.updateMessage') }}</p>
          <div class="update-sheet__actions">
            <button class="update-sheet__btn update-sheet__btn--secondary" (click)="showUpdateSheet.set(false)">
              {{ i18n.t('app.updateLater') }}
            </button>
            <button class="update-sheet__btn update-sheet__btn--primary" (click)="applyUpdate()">
              {{ i18n.t('app.updateNow') }}
            </button>
          </div>
        </div>
      </app-bottom-sheet>

      <!-- iOS Install Guide Sheet -->
      <app-bottom-sheet
        [isOpen]="pwa.showIosInstallGuide()"
        [title]="i18n.t('pwa.iosGuideTitle') || 'Install Voca'"
        [showCloseButton]="true"
        [maxHeight]="'auto'"
        (closed)="pwa.closeIosInstallGuide()"
      >
        <div class="ios-install-sheet">
          <div class="ios-install-sheet__header">
            <div class="ios-install-sheet__icon">
              <svg class="ios-install-logo-kikyou" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="ios-kikyou-petal" d="M 0,-300 C 5.0,-295.1 18.55,-287.5 34.34,-280.8 C 69.0,-266.3 117.0,-227.9 108.65,-173.7 C 106.5,-166.2 105.2,-161.9 101.75,-155.7 L 23.37,-40.74 L 0,-25 L -23.37,-40.74 L -101.75,-155.7 C -105.2,-161.9 -106.5,-166.2 -108.65,-173.7 C -117.0,-227.9 -69.0,-266.3 -34.34,-280.8 C -18.55,-287.5 -5.0,-295.1 0,-300 Z" fill="#F5F0E8"/>
                </defs>
                <g transform="translate(256, 256) scale(0.68)">
                  <use href="#ios-kikyou-petal" transform="rotate(0)"/>
                  <use href="#ios-kikyou-petal" transform="rotate(72)"/>
                  <use href="#ios-kikyou-petal" transform="rotate(144)"/>
                  <use href="#ios-kikyou-petal" transform="rotate(216)"/>
                  <use href="#ios-kikyou-petal" transform="rotate(288)"/>
                  <circle cx="0" cy="0" r="50" fill="#F5F0E8" stroke="#D95C64" stroke-width="6"/>
                  <circle cx="0" cy="0" r="20" fill="#D95C64"/>
                </g>
              </svg>
            </div>
            <h3 class="ios-install-sheet__title">{{ i18n.t('pwa.iosGuideTitle') }}</h3>
            <p class="ios-install-sheet__desc">{{ i18n.t('pwa.installDesc') }}</p>
          </div>

          <div class="ios-install-steps">
            <div class="ios-step-card">
              <div class="ios-step-num">1</div>
              <div class="ios-step-text">
                <span>{{ i18n.t('pwa.iosStep1') }}</span>
                <span class="ios-step-hint">
                  <app-icon name="share" [size]="16" />
                </span>
              </div>
            </div>

            <div class="ios-step-card">
              <div class="ios-step-num">2</div>
              <div class="ios-step-text">
                <span>{{ i18n.t('pwa.iosStep2') }}</span>
                <span class="ios-step-hint">
                  <app-icon name="plus" [size]="16" />
                </span>
              </div>
            </div>

            <div class="ios-step-card">
              <div class="ios-step-num">3</div>
              <div class="ios-step-text">
                <span>{{ i18n.t('pwa.iosStep3') }}</span>
              </div>
            </div>
          </div>

          <button class="ios-install-btn" (click)="pwa.closeIosInstallGuide()">
            {{ i18n.t('pwa.gotIt') }}
          </button>
        </div>
      </app-bottom-sheet>

    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      min-height: var(--app-height, 100dvh);
      display: flex;
      flex-direction: column;
      background: var(--bg-primary);
    }

    .app__content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .main {
      flex: 1;
      padding: var(--space-lg) 0;
    }

    /* Desktop: with sidebar */
    @media (min-width: 769px) and (min-height: 501px) {
      .app.has-sidebar {
        flex-direction: row;
      }

      .app.has-sidebar .app__content {
        /* Use exact sidebar width - content adjusts smoothly when sidebar toggles */
        padding-left: 15.625rem; /* Match .sidebar width exactly */
        transition: padding-left 0.3s cubic-bezier(0.2, 0, 0, 1);
        will-change: padding-left;
      }

      .app.has-sidebar.sidebar-collapsed .app__content {
        padding-left: 4.5rem; /* Match .sidebar.collapsed width exactly */
      }

      .bottom-nav {
        display: none !important;
      }
    }

    /* Mobile portrait: hide sidebar, show bottom nav */
    @media (max-width: 768px) {
      .desktop-sidebar {
        display: none !important;
      }

      .app__content {
        margin-left: 0;
        width: 100%;
      }

      .main {
        padding: var(--space-md) 0 calc(var(--bottom-nav-total-height) + var(--space-xs)) 0;
      }

      .main.video-active {
        padding-top: 0;
      }
    }

    /* Landscape phones: treat as mobile */
    @media (max-height: 500px) and (orientation: landscape) {
      .desktop-sidebar {
        display: none !important;
      }

      .app__content {
        margin-left: 0;
        width: 100%;
      }

      .main {
        padding: var(--space-sm) 0 calc(var(--safe-area-bottom) + var(--space-xs)) 0;
      }

      .main.video-active {
        padding-top: 0;
      }
    }

    /* Update Sheet Styles */
    .update-sheet {
      padding: var(--space-lg);
      text-align: center;
    }

    .update-sheet__icon {
      width: 4rem;
      height: 4rem;
      margin: 0 auto var(--space-md);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(74, 111, 165, 0.1);
      border-radius: var(--border-radius-round);
      color: var(--info);
    }

    .update-sheet__title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 var(--space-xs);
    }

    .update-sheet__message {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin: 0 0 var(--space-lg);
      line-height: 1.5;
    }

    .update-sheet__actions {
      display: flex;
      gap: var(--space-sm);
    }

    .update-sheet__btn {
      flex: 1;
      padding: var(--space-md);
      border-radius: var(--border-radius);
      font-size: 0.9375rem;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .update-sheet__btn--secondary {
      background: var(--bg-secondary);
      color: var(--text-primary);
    }

    .update-sheet__btn--primary {
      background: var(--accent-primary);
      color: white;
    }

    @media (hover: hover) {
      .update-sheet__btn--secondary:hover {
        background: var(--bg-card);
      }

      .update-sheet__btn--primary:hover {
        opacity: 0.9;
      }
    }

    /* More Menu */
    .more-menu {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: var(--space-xs) 0 var(--space-sm);
    }

    .more-menu__stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-sm);
      padding: 0 var(--space-md) var(--space-xs);
    }

    .more-stat-card {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      padding: 0.75rem var(--space-sm);
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-md);
      cursor: pointer;
      text-align: left;
      transition: background-color var(--transition-fast), border-color var(--transition-fast);
    }

    .more-stat-card:active {
      background: var(--bg-hover);
      border-color: var(--accent-primary);
    }

    .stat-icon--fire {
      color: #f59e0b;
      flex-shrink: 0;
    }

    .stat-icon--diamond {
      color: #60a5fa;
      flex-shrink: 0;
    }

    .more-stat-info {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .more-stat-val {
      font-size: 0.9375rem;
      font-weight: 800;
      color: var(--text-primary);
      line-height: 1.1;
    }

    .more-stat-lbl {
      font-size: 0.6875rem;
      color: var(--text-muted);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .more-menu__item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: 0.625rem var(--space-md);
      margin: 0 var(--space-xs);
      width: calc(100% - var(--space-sm));
      background: none;
      border: none;
      border-radius: var(--border-radius-md);
      color: var(--text-primary);
      cursor: pointer;
      transition: background-color var(--transition-fast);
    }

    .more-menu__item:active {
      background: var(--bg-hover);
    }

    .more-menu__item-icon {
      width: 2.25rem;
      height: 2.25rem;
      border-radius: var(--border-radius-sm);
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      flex-shrink: 0;
    }

    .more-menu__item-text {
      flex: 1;
      display: flex;
      flex-direction: column;
      text-align: left;
      min-width: 0;
    }

    .more-menu__item-title {
      font-size: 0.9375rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .more-menu__chevron {
      color: var(--text-muted);
      flex-shrink: 0;
    }

    .more-menu__divider {
      height: 1px;
      background: var(--border-color);
      margin: var(--space-xs) var(--space-md);
    }

    .more-menu__item-icon--install {
      color: var(--accent-primary);
      background: var(--accent-primary-soft);
      border-color: rgba(var(--accent-primary-rgb), 0.2);
    }

    .more-menu__item-desc {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 400;
      margin-top: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* iOS Install Guide Sheet */
    .ios-install-sheet {
      padding: var(--space-md) var(--space-lg) var(--space-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .ios-install-sheet__header {
      margin-bottom: var(--space-lg);
    }

    .ios-install-sheet__icon {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: var(--border-radius-md);
      background: var(--accent-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--space-sm);
      box-shadow: 0 4px 12px rgba(var(--accent-primary-rgb), 0.25);
    }

    .ios-install-logo-kikyou {
      width: 2.25rem;
      height: 2.25rem;
      display: block;
    }

    .ios-install-sheet__title {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 4px;
    }

    .ios-install-sheet__desc {
      font-size: 0.8125rem;
      color: var(--text-muted);
      margin: 0;
    }

    .ios-install-steps {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      margin-bottom: var(--space-lg);
    }

    .ios-step-card {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-sm) var(--space-md);
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-md);
      text-align: left;
    }

    .ios-step-num {
      width: 1.75rem;
      height: 1.75rem;
      border-radius: var(--border-radius-round);
      background: var(--accent-primary);
      color: white;
      font-weight: 700;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .ios-step-text {
      flex: 1;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .ios-step-hint {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-sm);
      color: var(--text-secondary);
    }

    .ios-install-btn {
      width: 100%;
      padding: var(--space-md);
      border-radius: var(--border-radius);
      background: var(--accent-primary);
      color: white;
      font-size: 0.9375rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: opacity var(--transition-fast);
    }

    .ios-install-btn:active {
      opacity: 0.85;
    }
  `]
})
export class AppComponent implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private youtube = inject(YoutubeService);
  private router = inject(Router);
  private injector = inject(Injector);
  private document = inject(DOCUMENT);
  i18n = inject(I18nService);
  settings = inject(SettingsService);
  streak = inject(StreakService);
  transcript = inject(TranscriptService);
  private subtitles = inject(SubtitleService);
  protected playlistService = inject(PlaylistService);
  protected sheetService = inject(BottomSheetService);
  private swUpdate = inject(SwUpdate);
  private seo = inject(SeoService);
  pwa = inject(PwaService);

  hasActiveVideoSession = computed(() => !!this.youtube.currentVideo() && !this.router.url.startsWith('/video'));

  private destroy$ = new Subject<void>();
  private cleanupFns: Array<() => void> = [];
  private lastUpdateCheck = 0;
  private readonly UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour
  private readonly MIN_CHECK_INTERVAL = 10 * 60 * 1000; // 10 minutes minimum between checks

  constructor() {
    this.initViewportSizing();
    this.initServiceWorkerUpdates();
    this.initKeyboardShortcuts();
  }

  ngOnDestroy(): void {
    this.cleanupFns.forEach(cleanup => cleanup());
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initViewportSizing(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    afterNextRender(() => {
      const root = this.document.documentElement;
      const standaloneQuery = window.matchMedia('(display-mode: standalone)');
      const updateViewportState = () => {
        const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
        root.style.setProperty('--app-height', `${Math.round(viewportHeight)}px`);

        const isStandalone = standaloneQuery.matches ||
          (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

        root.classList.toggle('standalone-mode', isStandalone);
      };

      updateViewportState();

      const handleResize = () => updateViewportState();

      window.addEventListener('resize', handleResize, { passive: true });
      window.addEventListener('orientationchange', handleResize);
      this.cleanupFns.push(() => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
      });

      if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', handleResize);
        this.cleanupFns.push(() => window.visualViewport?.removeEventListener('resize', handleResize));
      }

      if (typeof standaloneQuery.addEventListener === 'function') {
        standaloneQuery.addEventListener('change', handleResize);
        this.cleanupFns.push(() => standaloneQuery.removeEventListener('change', handleResize));
      } else {
        standaloneQuery.addListener(handleResize);
        this.cleanupFns.push(() => standaloneQuery.removeListener(handleResize));
      }
    }, { injector: this.injector });
  }

  /**
   * Initialize service worker update detection with sensible triggers:
   * 1. Check on app startup
   * 2. Check when app regains focus (user switches back to the tab/app)
   * 3. Hourly fallback for long study sessions
   */
  private initServiceWorkerUpdates(): void {
    if (!this.swUpdate.isEnabled || !isPlatformBrowser(this.platformId)) {
      return;
    }

    // Subscribe to version updates - show update sheet instead of auto-reloading
    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        console.log('[SW] New version ready, showing update notification...');
        this.showUpdateSheet.set(true);
      });

    // 1. Check on startup (with delay to not block initial render)
    setTimeout(() => this.checkForUpdate('startup'), 5000);

    // 2. Check when app regains focus (essential for study app - users switch tabs often)
    if (isPlatformBrowser(this.platformId)) {
      fromEvent(this.document, 'visibilitychange')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          if (this.document.visibilityState === 'visible') {
            this.checkForUpdate('visibility');
          }
        });
    }

    // 3. Hourly fallback for long study sessions
    interval(this.UPDATE_CHECK_INTERVAL)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.checkForUpdate('interval'));
  }

  /**
   * Check for updates with rate limiting to prevent excessive checks
   */
  private checkForUpdate(trigger: string): void {
    const now = Date.now();

    // Rate limit: don't check more than once every 5 minutes
    if (now - this.lastUpdateCheck < this.MIN_CHECK_INTERVAL) {
      return;
    }

    this.lastUpdateCheck = now;
    console.log(`[SW] Checking for updates (trigger: ${trigger})`);

    this.swUpdate.checkForUpdate()
      .then(hasUpdate => {
        if (hasUpdate) {
          console.log('[SW] Update found!');
        }
      })
      .catch(err => {
        console.warn('[SW] Update check failed:', err);
      });
  }

  showSettingsSheet = signal(false);
  showStreakSheet = signal(false);
  showAiCreditsSheet = signal(false);
  showUpdateSheet = signal(false);
  showCommandPalette = signal(false);
  showMoreSheet = signal(false);
  sidebarCollapsed = computed(() => this.settings.settings().sidebarCollapsed);


  // Track current URL to know which page we're on
  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
      startWith(this.router.url)
    )
  );

  // Check if video is loaded AND we're on the video page
  hasVideo = computed(() => {
    const isOnVideoPage = this.currentUrl()?.startsWith('/video') ?? false;
    const videoLoaded = !!this.youtube.currentVideo() || !!this.youtube.pendingVideoId();
    return isOnVideoPage && videoLoaded;
  });

  // Check if any sheet is open (for bottom nav active state)
  anySheetOpen = computed(() =>
    this.showSettingsSheet() || this.showStreakSheet() || this.showCommandPalette() || this.showAiCreditsSheet() || this.showMoreSheet()
  );

  // Check if current route matches
  isRouteActive(route: string): boolean {
    return this.currentUrl()?.startsWith(route) ?? false;
  }

  /**
   * Initialize keyboard shortcuts (Cmd/Ctrl + K for command palette)
   */
  private initKeyboardShortcuts(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    fromEvent<KeyboardEvent>(this.document, 'keydown')
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        // Cmd/Ctrl + K to open command palette
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
          event.preventDefault();
          this.showCommandPalette.set(true);
        }
      });
  }

  onLearnNavClick(event: MouseEvent): void {
    const isOnVideoPage = this.router.url.startsWith('/video');
    const activeVideo = this.youtube.currentVideo();

    if (isOnVideoPage) {
      // Already on video page: preserve active playback session and scroll smoothly to top
      event.preventDefault();
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (activeVideo) {
      // Navigating back from another page while video is active: Resume current video
      event.preventDefault();
      const playlistId = this.playlistService.currentPlaylist()?.id;
      void this.router.navigate(['/video'], {
        queryParams: {
          id: activeVideo.id,
          ...(playlistId ? { playlist: playlistId } : {})
        }
      });
    }
  }

  toggleSettingsSheet(): void {
    this.showSettingsSheet.update(v => !v);
  }

  toggleMoreSheet(): void {
    this.showMoreSheet.update(v => !v);
  }

  openNewVideo(): void {
    this.showMoreSheet.set(false);
    if (this.router.url === '/video' && !this.youtube.currentVideo() && !this.youtube.pendingVideoId()) {
      const inputEl = this.document.querySelector('.spotlight-input') as HTMLInputElement | null;
      if (inputEl) {
        inputEl.focus();
        return;
      }
    }
    this.showCommandPalette.set(true);
  }

  navigateFromMore(route: string): void {
    this.sheetService.skipNextHistoryPop();
    this.showMoreSheet.set(false);
    void this.router.navigate([route], { replaceUrl: true });
  }

  async installAppFromMore(): Promise<void> {
    this.showMoreSheet.set(false);
    await this.pwa.install();
  }

  onCommandPaletteSearch(videoId: string): void {
    this.showCommandPalette.set(false);
    this.router.navigate(['/video'], { queryParams: { id: videoId } });
  }

  /**
   * Apply the pending update and reload the app
   */
  applyUpdate(): void {
    this.showUpdateSheet.set(false);

    // Note: Don't delete IndexedDB - user data (vocabulary, history) lives there!
    // The service worker handles asset cache invalidation automatically.

    this.swUpdate.activateUpdate().then(() => {
      console.log('[SW] Update activated, reloading...');
      window.location.reload();
    });
  }
}
