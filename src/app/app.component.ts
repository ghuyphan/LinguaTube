import { Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID, computed, Injector, afterNextRender, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith, Subject, takeUntil, fromEvent } from 'rxjs';
import { IconComponent } from './shared/components/icon/icon.component';
import { SettingsSheetComponent } from './components/settings-sheet/settings-sheet.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BottomSheetComponent } from './shared/components/bottom-sheet/bottom-sheet.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { CommandPaletteComponent } from './shared/components/command-palette/command-palette.component';
import { StreakDialogComponent } from './components/streak-dialog/streak-dialog.component';
import { AiCreditsDialogComponent } from './components/ai-credits-dialog/ai-credits-dialog.component';
import { AchievementsDialogComponent } from './components/achievements-dialog/achievements-dialog.component';
import { ProUpgradeDialogComponent } from './components/pro-upgrade-dialog/pro-upgrade-dialog.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { I18nService, SettingsService, SeoService, PwaService, GamificationService, AppUpdateService } from './core/services';
import { YoutubeService, TranscriptService } from './features/video';
import { StreakService } from './services/streak.service';
import { BottomSheetService } from './services/bottom-sheet.service';
import { PlaylistService } from './features/playlist/playlist.service';
import { VocabularyService } from './features/vocabulary/vocabulary.service';
import { VideoRecommendationService } from './core/services/video-recommendation.service';

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
    AiCreditsDialogComponent,
    AchievementsDialogComponent,
    ProUpgradeDialogComponent,
    ToastComponent
  ],
  template: `
    <div class="app" [class.has-sidebar]="true" [class.sidebar-collapsed]="sidebarCollapsed()">
      
      <!-- Desktop Sidebar (lazy loaded) -->
      @defer (on idle) {
          <app-sidebar 
            class="desktop-sidebar"
            (openSettings)="showSettingsSheet.set(true)"
            (openCommandPalette)="showCommandPalette.set(true)"
            (openStreak)="showStreakSheet.set(true)"
            (openAiCredits)="showAiCreditsSheet.set(true)"
            (openAchievements)="showAchievementsSheet.set(true)"
            (openProUpgrade)="showProUpgradeSheet.set(true)"
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
              (click)="onStudyNavClick($event)"
              [class.active]="!anySheetOpen() && isRouteActive('/study')"
              [attr.aria-current]="(!anySheetOpen() && isRouteActive('/study')) ? 'page' : null"
            >
              <div class="bottom-nav__icon-wrap">
                <app-icon [name]="(!anySheetOpen() && isRouteActive('/study')) ? 'graduation-cap-filled' : 'graduation-cap'" [size]="22" />
              </div>
              <span>{{ i18n.t('nav.review') }}</span>
            </a>
            <button
              class="bottom-nav__item--create"
              type="button"
              (click)="openNewVideo()"
              [attr.aria-label]="i18n.t('nav.newVideo') || 'New Video'"
              [attr.title]="i18n.t('nav.newVideo') || 'New Video'"
            >
              <div class="create-btn-core">
                <app-icon name="plus" [size]="20" />
              </div>
            </button>
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
            <button
              class="bottom-nav__item"
              type="button"
              [class.active]="showMoreSheet() || isRouteActive('/history') || isRouteActive('/explore') || isRouteActive('/playlists')"
              (click)="toggleMoreSheet()"
              aria-haspopup="dialog"
              [attr.aria-expanded]="showMoreSheet()"
              [attr.aria-label]="i18n.t('nav.more') || 'More'"
            >
              <div class="bottom-nav__icon-wrap">
                <app-icon [name]="(showMoreSheet() || isRouteActive('/history') || isRouteActive('/explore') || isRouteActive('/playlists')) ? 'more-horizontal-filled' : 'more-horizontal'" [size]="22" />
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
            <!-- Mobile Motivation, Level & AI Credits Quick Bar -->
            <div class="more-menu__stats">
              <button class="more-stat-card" (click)="openStreakFromMore()">
                <app-icon name="fire" [size]="20" class="stat-icon--fire" />
                <div class="more-stat-info">
                  <span class="more-stat-val">{{ streak.currentStreak() }}</span>
                  <span class="more-stat-lbl">{{ i18n.t('streak.dayStreak') || 'Day Streak' }}</span>
                </div>
              </button>
              <button class="more-stat-card" (click)="openAchievementsFromMore()">
                <app-icon name="trophy" [size]="20" class="stat-icon--trophy" />
                <div class="more-stat-info">
                  <span class="more-stat-val">{{ gamification.userLevel() }}</span>
                  <span class="more-stat-lbl">{{ i18n.t('gamification.level') || 'Level' }}</span>
                </div>
              </button>
              <button class="more-stat-card" (click)="openAiCreditsFromMore()">
                <app-icon name="diamond" [size]="20" class="stat-icon--diamond" />
                <div class="more-stat-info">
                  <span class="more-stat-val">{{ transcript.diamonds() }}/{{ transcript.maxDiamonds() }}</span>
                  <span class="more-stat-lbl">{{ i18n.t('subtitle.aiCredits') }}</span>
                </div>
              </button>
            </div>

            <!-- Action Rows (Personal Library & Settings) -->
            <button class="more-menu__item" (click)="navigateFromMore('/explore')">
              <div class="more-menu__item-icon">
                <app-icon name="list-video" [size]="18" />
              </div>
              <div class="more-menu__item-text">
                <span class="more-menu__item-title">{{ i18n.t('playlist.title') || i18n.t('nav.playlists') }}</span>
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

            @if (appUpdate.updateAvailable()) {
              <button class="more-menu__item more-menu__item--update" (click)="openUpdateFromMore()">
                <div class="more-menu__item-icon more-menu__item-icon--update">
                  <app-icon name="rotate-ccw" [size]="18" />
                </div>
                <div class="more-menu__item-text">
                  <span class="more-menu__item-title">{{ i18n.t('app.updateAvailable') }}</span>
                  <span class="more-menu__item-desc">{{ i18n.t('settings.updateReady') }}</span>
                </div>
                <span class="update-badge-dot"></span>
                <app-icon name="chevron-right" [size]="16" class="more-menu__chevron" />
              </button>
            }

            <div class="more-menu__divider"></div>

            <button class="more-menu__item" (click)="openSettingsFromMore()">
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
        @defer (when showSettingsSheet(); prefetch on idle) {
          <app-settings-sheet 
            [isOpen]="showSettingsSheet()" 
            (closed)="showSettingsSheet.set(false)" 
            (openStreak)="openStreakFromSettings()"
            (openAchievements)="openAchievementsFromSettings()"
            (openAiCredits)="openAiCreditsFromSettings()"
            (openProUpgrade)="showProUpgradeSheet.set(true)"
          />
        }

        @defer (when showStreakSheet(); prefetch on idle) {
          <app-bottom-sheet
            [isOpen]="showStreakSheet()"
            [title]="i18n.t('streak.dayStreak') || 'Streak'"
            [showCloseButton]="true"
            (closed)="showStreakSheet.set(false)"
          >
            <app-streak-dialog (dismissed)="sheetService.closeTop()" />
          </app-bottom-sheet>
        }

        @defer (when showAiCreditsSheet(); prefetch on idle) {
          <app-bottom-sheet
            [isOpen]="showAiCreditsSheet()"
            [title]="i18n.t('subtitle.aiCredits') || 'AI Credits'"
            [showCloseButton]="true"
            (closed)="showAiCreditsSheet.set(false)"
          >
            <app-ai-credits-dialog (dismissed)="sheetService.closeTop()" (openProUpgrade)="openProUpgradeFromAiCredits()" />
          </app-bottom-sheet>
        }

        @defer (when showAchievementsSheet(); prefetch on idle) {
          <app-bottom-sheet
            [isOpen]="showAchievementsSheet()"
            [title]="i18n.t('achievements.title') || 'Achievements & Level'"
            [showCloseButton]="true"
            maxWidth="500px"
            (closed)="showAchievementsSheet.set(false)"
          >
            <app-achievements-dialog (dismissed)="sheetService.closeTop()" />
          </app-bottom-sheet>
        }

        @defer (when showProUpgradeSheet(); prefetch on idle) {
          <app-bottom-sheet
            [isOpen]="showProUpgradeSheet()"
            [title]="i18n.t('pro.title') || 'Voca Pro'"
            [showCloseButton]="true"
            maxWidth="460px"
            (closed)="showProUpgradeSheet.set(false)"
          >
            <app-pro-upgrade-dialog (dismissed)="sheetService.closeTop()" />
          </app-bottom-sheet>
        }

        <!-- Command Palette (lazy loaded on demand) -->
        @defer (when showCommandPalette(); prefetch on idle) {
          <app-command-palette
            [isOpen]="showCommandPalette()"
            (submitted)="onCommandPaletteSearch($event)"
            (closed)="showCommandPalette.set(false)"
          />
        }

        <!-- Onboarding Welcome Sheet (lazy loaded when not completed) -->
        @defer (when showOnboardingSheet(); prefetch on idle) {
          <app-bottom-sheet
            [isOpen]="showOnboardingSheet()"
            [showCloseButton]="false"
            [allowBackdropClose]="true"
            maxWidth="440px"
            (closed)="dismissOnboarding()"
          >
            <app-onboarding (dismissed)="dismissOnboarding()" />
          </app-bottom-sheet>
        }

      <!-- Update Available Sheet (always available, even during onboarding) -->
      <app-bottom-sheet
        [isOpen]="appUpdate.showUpdateSheet()"
        [title]="(appUpdate.forceUpdateRequired() ? i18n.t('app.updateRequired') : i18n.t('app.updateAvailable')) || 'Update Available'"
        [showCloseButton]="!appUpdate.forceUpdateRequired()"
        [maxHeight]="'85vh'"
        (closed)="appUpdate.dismissUpdate()"
      >
        <div class="update-sheet">
          <div class="update-sheet__icon" [class.update-sheet__icon--alert]="appUpdate.forceUpdateRequired()">
            <app-icon [name]="appUpdate.forceUpdateRequired() ? 'alert-circle' : 'rotate-ccw'" [size]="32" />
          </div>
          <div class="update-sheet__header-group">
            <h3 class="update-sheet__title">
              {{ appUpdate.forceUpdateRequired() ? i18n.t('app.updateRequired') : i18n.t('app.updateAvailable') }}
            </h3>
            <span class="update-sheet__version-badge">
              v{{ appUpdate.incomingVersion() || appUpdate.currentVersion() }}
            </span>
          </div>
          <p class="update-sheet__message">
            {{ appUpdate.forceUpdateRequired() ? i18n.t('app.updateRequiredDesc') : i18n.t('app.updateMessage') }}
          </p>

          @if (appUpdate.incomingHighlights().length > 0) {
            <div class="update-sheet__changelog">
              <div class="update-sheet__changelog-title">
                <app-icon name="sparkles" [size]="15" />
                <span>{{ i18n.t('app.whatsNew') || "What's New" }}</span>
              </div>
              <ul class="update-sheet__changelog-list">
                @for (item of appUpdate.incomingHighlights(); track item) {
                  <li class="update-sheet__changelog-item">
                    <span class="update-sheet__bullet">•</span>
                    <span>{{ item }}</span>
                  </li>
                }
              </ul>
            </div>
          }

          <div class="update-sheet__actions">
            @if (!appUpdate.forceUpdateRequired()) {
              <button class="update-sheet__btn update-sheet__btn--secondary" (click)="appUpdate.dismissUpdate()">
                {{ i18n.t('app.updateLater') }}
              </button>
            }
            <button class="update-sheet__btn update-sheet__btn--primary" (click)="appUpdate.applyUpdate()">
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
                  <path id="ios-kikyou-petal" d="M 0,-300 C 5.0,-295.1 18.55,-287.5 34.34,-280.8 C 69.0,-266.3 117.0,-227.9 108.65,-173.7 C 106.5,-166.2 105.2,-161.9 101.75,-155.7 L 23.37,-40.74 L 0,-25 L -23.37,-40.74 L -101.75,-155.7 C -105.2,-161.9 -106.5,-166.2 -108.65,-173.7 C -117.0,-227.9 -69.0,-266.3 -34.34,-280.8 C -18.55,-287.5 -5.0,-295.1 0,-300 Z" fill="#FFFFFF"/>
                </defs>
                <g transform="translate(256, 256) scale(0.68)">
                  <use href="#ios-kikyou-petal" transform="rotate(0)"/>
                  <use href="#ios-kikyou-petal" transform="rotate(72)"/>
                  <use href="#ios-kikyou-petal" transform="rotate(144)"/>
                  <use href="#ios-kikyou-petal" transform="rotate(216)"/>
                  <use href="#ios-kikyou-petal" transform="rotate(288)"/>
                  <circle cx="0" cy="0" r="50" fill="#FFFFFF" stroke="#E0294F" stroke-width="7"/>
                  <circle cx="0" cy="0" r="21" fill="#E0294F"/>
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

      <!-- App Updating Fullscreen Graceful Overlay -->
      @if (appUpdate.isApplyingUpdate()) {
        <div class="app-updating-overlay" role="status" aria-live="polite">
          <div class="app-updating-backdrop"></div>
          <div class="app-updating-card">
            <div class="app-updating-brand">
              <svg class="app-updating-logo" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="updating-kikyou-petal" d="M 0,-300 C 5.0,-295.1 18.55,-287.5 34.34,-280.8 C 69.0,-266.3 117.0,-227.9 108.65,-173.7 C 106.5,-166.2 105.2,-161.9 101.75,-155.7 L 23.37,-40.74 L 0,-25 L -23.37,-40.74 L -101.75,-155.7 C -105.2,-161.9 -106.5,-166.2 -108.65,-173.7 C -117.0,-227.9 -69.0,-266.3 -34.34,-280.8 C -18.55,-287.5 -5.0,-295.1 0,-300 Z" fill="#FFFFFF"/>
                </defs>
                <g transform="translate(256, 256) scale(0.68)">
                  <use href="#updating-kikyou-petal" transform="rotate(0)"/>
                  <use href="#updating-kikyou-petal" transform="rotate(72)"/>
                  <use href="#updating-kikyou-petal" transform="rotate(144)"/>
                  <use href="#updating-kikyou-petal" transform="rotate(216)"/>
                  <use href="#updating-kikyou-petal" transform="rotate(288)"/>
                  <circle cx="0" cy="0" r="50" fill="#FFFFFF" stroke="#E0294F" stroke-width="7"/>
                  <circle cx="0" cy="0" r="21" fill="#E0294F"/>
                </g>
              </svg>
              <div class="app-updating-pulse-ring"></div>
            </div>
            <h2 class="app-updating-title">{{ i18n.t('app.updatingApp') || 'Updating Voca...' }}</h2>
            <p class="app-updating-desc">{{ i18n.t('app.updatingDesc') || 'Applying updates and optimizing performance...' }}</p>
            <div class="app-updating-progress">
              <div class="app-updating-progress-bar"></div>
            </div>
          </div>
        </div>
      }

      <app-toast />
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
        padding-left: var(--sidebar-width, 15.75rem); /* Match .sidebar width exactly */
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
      padding: var(--space-lg) var(--space-lg) calc(var(--space-lg) + env(safe-area-inset-bottom, 0px));
      max-width: 440px;
      margin: 0 auto;
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

      &.update-sheet__icon--alert {
        background: rgba(239, 68, 68, 0.12);
        color: #ef4444;
      }
    }

    .update-sheet__header-group {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-xs);
      margin-bottom: var(--space-xs);
      flex-wrap: wrap;
    }

    .update-sheet__title {
      font-size: 1.125rem;
      font-weight: 800;
      letter-spacing: -0.01em;
      color: var(--text-primary);
      margin: 0;
    }

    .update-sheet__version-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.125rem 0.5rem;
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-round);
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--accent-primary);
    }

    .update-sheet__message {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin: 0 0 var(--space-md);
      line-height: 1.5;
    }

    .update-sheet__changelog {
      text-align: left;
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-md);
      padding: var(--space-sm) var(--space-md);
      margin: 0 0 var(--space-lg);
    }

    .update-sheet__changelog-title {
      display: flex;
      align-items: center;
      gap: var(--space-2xs);
      font-size: 0.8125rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: var(--space-2xs);

      app-icon {
        color: var(--accent-primary);
      }
    }

    .update-sheet__changelog-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    .update-sheet__changelog-item {
      display: flex;
      align-items: flex-start;
      gap: var(--space-xs);
      font-size: 0.8125rem;
      line-height: 1.4;
      color: var(--text-secondary);
    }

    .update-sheet__bullet {
      color: var(--accent-primary);
      font-weight: 700;
      line-height: 1.4;
    }

    .update-sheet__actions {
      display: flex;
      gap: var(--space-sm);
    }

    .update-sheet__btn {
      flex: 1;
      min-height: 2.75rem;
      padding: 0 var(--space-md);
      border-radius: var(--border-radius-md);
      font-size: 0.9375rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-fast);
    }

    .update-sheet__btn--secondary {
      background: var(--bg-surface);
      border: 1px solid var(--border-color);
      color: var(--text-primary);
    }

    .update-sheet__btn--primary {
      background: var(--accent-primary);
      color: white;
    }

    @media (hover: hover) {
      .update-sheet__btn--secondary:hover {
        background: var(--bg-hover);
      }

      .update-sheet__btn--primary:hover {
        opacity: 0.9;
      }
    }

    /* Full-screen Native Updating Overlay */
    .app-updating-overlay {
      position: fixed;
      inset: 0;
      z-index: 100000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--space-xl);
      animation: updateFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      user-select: none;
    }

    .app-updating-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(15, 23, 42, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .app-updating-card {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      max-width: 340px;
      width: 100%;
    }

    .app-updating-brand {
      position: relative;
      width: 88px;
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--space-lg);
    }

    .app-updating-logo {
      width: 76px;
      height: 76px;
      filter: drop-shadow(0 10px 24px rgba(244, 91, 116, 0.45));
      animation: updatePulse 2s ease-in-out infinite;
    }

    .app-updating-pulse-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid var(--accent-primary, #F45B74);
      opacity: 0;
      animation: updateRing 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    }

    .app-updating-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 var(--space-xs);
      letter-spacing: -0.01em;
    }

    .app-updating-desc {
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.72);
      margin: 0 0 var(--space-lg);
      line-height: 1.5;
    }

    .app-updating-progress {
      width: 180px;
      height: 4px;
      background: rgba(255, 255, 255, 0.16);
      border-radius: 2px;
      overflow: hidden;
      position: relative;
    }

    .app-updating-progress-bar {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      background: linear-gradient(90deg, #FF7E93, #F45B74, #DF4360);
      border-radius: 2px;
      animation: updateProgressIndeterminate 1.4s infinite ease-in-out;
    }

    @keyframes updateFadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }

    @keyframes updatePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.06); }
    }

    @keyframes updateRing {
      0% { transform: scale(0.85); opacity: 0.8; }
      100% { transform: scale(1.45); opacity: 0; }
    }

    @keyframes updateProgressIndeterminate {
      0% { left: -40%; width: 40%; }
      50% { left: 20%; width: 60%; }
      100% { left: 100%; width: 40%; }
    }

    /* More Menu */
    .more-menu {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: var(--space-xs) 0 calc(var(--space-md) + env(safe-area-inset-bottom, 0px));
      max-width: 440px;
      margin: 0 auto;
    }

    .more-menu__stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-xs);
      padding: 0 var(--space-md) var(--space-xs);
    }

    .more-stat-card {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      padding: 0.625rem 0.5rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-md);
      cursor: pointer;
      text-align: left;
      min-width: 0;
      transition: background-color var(--transition-fast), border-color var(--transition-fast);
    }

    .more-stat-card:active {
      background: var(--bg-hover);
      border-color: var(--accent-primary);
    }

    .stat-icon--fire {
      color: var(--color-fire);
      flex-shrink: 0;
    }

    .stat-icon--diamond {
      color: var(--color-diamond);
      flex-shrink: 0;
    }

    .stat-icon--trophy {
      color: #f59e0b;
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
      min-height: 48px;
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

    .more-menu__item-icon--update {
      color: #3b82f6;
      background: rgba(59, 130, 246, 0.12);
      border-color: rgba(59, 130, 246, 0.25);
    }

    .update-badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #3b82f6;
      margin-left: auto;
      margin-right: var(--space-xs);
      box-shadow: 0 0 6px rgba(59, 130, 246, 0.6);
      animation: pulse-dot 2s infinite ease-in-out;
    }

    @keyframes pulse-dot {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.7; }
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
      padding: var(--space-md) var(--space-lg) calc(var(--space-lg) + env(safe-area-inset-bottom, 0px));
      max-width: 440px;
      margin: 0 auto;
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
      background: linear-gradient(135deg, #FF5C6C 0%, #EF3B56 50%, #C91842 100%);
      border: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto var(--space-sm);
      box-shadow: 0 6px 16px rgba(239, 59, 86, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3);
    }

    .ios-install-logo-kikyou {
      width: 2.25rem;
      height: 2.25rem;
      display: block;
      filter: drop-shadow(0 2px 4px rgba(128, 10, 35, 0.3));
    }

    .ios-install-sheet__title {
      font-size: 1.125rem;
      font-weight: 800;
      letter-spacing: -0.01em;
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
      min-height: 2.75rem;
      padding: 0 var(--space-md);
      border-radius: var(--border-radius-md);
      background: var(--accent-primary);
      color: white;
      font-size: 0.9375rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
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
  vocab = inject(VocabularyService);
  streak = inject(StreakService);
  transcript = inject(TranscriptService);
  gamification = inject(GamificationService);
  protected playlistService = inject(PlaylistService);
  protected sheetService = inject(BottomSheetService);
  appUpdate = inject(AppUpdateService);
  private videoRecommendation = inject(VideoRecommendationService);
  private seo = inject(SeoService);
  pwa = inject(PwaService);

  hasActiveVideoSession = computed(() => !!this.youtube.currentVideo() && !this.router.url.startsWith('/video'));

  private destroy$ = new Subject<void>();
  private cleanupFns: Array<() => void> = [];

  constructor() {
    this.initViewportSizing();
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

  showSettingsSheet = signal(false);
  showStreakSheet = signal(false);
  showAiCreditsSheet = signal(false);
  showAchievementsSheet = signal(false);
  showProUpgradeSheet = signal(false);
  showCommandPalette = signal(false);
  showMoreSheet = signal(false);
  showOnboardingSheet = signal(!this.settings.settings().hasCompletedOnboarding);
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
    this.showSettingsSheet() || this.showStreakSheet() || this.showCommandPalette() || this.showAiCreditsSheet() || this.showAchievementsSheet() || this.showProUpgradeSheet() || this.showMoreSheet() || this.showOnboardingSheet()
  );

  // Check if current route matches
  isRouteActive(route: string): boolean {
    return this.currentUrl()?.startsWith(route) ?? false;
  }

  dismissOnboarding(): void {
    this.showOnboardingSheet.set(false);
    if (!this.settings.settings().hasCompletedOnboarding) {
      this.settings.completeOnboarding();
    }
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
      event.preventDefault();
      if (isPlatformBrowser(this.platformId)) {
        if (!activeVideo) {
          const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
          if (scrollY > 80) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            // Already near top of Home Feed: tap-to-refresh like YouTube/Twitter!
            if ('vibrate' in navigator) {
              try { navigator.vibrate(10); } catch { }
            }
            this.videoRecommendation.triggerHomeFeedRefresh();
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
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

  onStudyNavClick(_event: MouseEvent): void {
    if (this.router.url.startsWith('/study')) {
      this.vocab.requestStudyReset();
    }
  }

  toggleSettingsSheet(): void {
    this.showSettingsSheet.update(v => !v);
  }

  toggleMoreSheet(): void {
    this.showMoreSheet.update(v => !v);
  }

  openStreakFromMore(): void {
    this.sheetService.skipNextHistoryPop();
    this.showMoreSheet.set(false);
    setTimeout(() => this.showStreakSheet.set(true), 50);
  }

  openAiCreditsFromMore(): void {
    this.sheetService.skipNextHistoryPop();
    this.showMoreSheet.set(false);
    setTimeout(() => this.showAiCreditsSheet.set(true), 50);
  }

  openAchievementsFromMore(): void {
    this.sheetService.skipNextHistoryPop();
    this.showMoreSheet.set(false);
    setTimeout(() => this.showAchievementsSheet.set(true), 50);
  }

  openStreakFromSettings(): void {
    this.sheetService.skipNextHistoryPop();
    this.showSettingsSheet.set(false);
    setTimeout(() => this.showStreakSheet.set(true), 50);
  }

  openAchievementsFromSettings(): void {
    this.sheetService.skipNextHistoryPop();
    this.showSettingsSheet.set(false);
    setTimeout(() => this.showAchievementsSheet.set(true), 50);
  }

  openAiCreditsFromSettings(): void {
    this.sheetService.skipNextHistoryPop();
    this.showSettingsSheet.set(false);
    setTimeout(() => this.showAiCreditsSheet.set(true), 50);
  }

  openProUpgradeFromAiCredits(): void {
    this.sheetService.skipNextHistoryPop();
    this.showAiCreditsSheet.set(false);
    setTimeout(() => this.showProUpgradeSheet.set(true), 50);
  }

  openNewVideo(): void {
    this.sheetService.skipNextHistoryPop();
    this.showMoreSheet.set(false);
    setTimeout(() => this.showCommandPalette.set(true), 50);
  }

  openSettingsFromMore(): void {
    this.sheetService.skipNextHistoryPop();
    this.showMoreSheet.set(false);
    setTimeout(() => this.showSettingsSheet.set(true), 50);
  }

  navigateFromMore(route: string): void {
    this.sheetService.skipNextHistoryPop();
    this.showMoreSheet.set(false);
    void this.router.navigate([route], { replaceUrl: true });
  }

  async installAppFromMore(): Promise<void> {
    this.sheetService.skipNextHistoryPop();
    this.showMoreSheet.set(false);
    await this.pwa.install();
  }

  onCommandPaletteSearch(videoId: string): void {
    this.showCommandPalette.set(false);
    this.router.navigate(['/video'], { queryParams: { id: videoId } });
  }

  openUpdateFromMore(): void {
    this.sheetService.skipNextHistoryPop();
    this.showMoreSheet.set(false);
    setTimeout(() => this.appUpdate.promptUpdate(), 50);
  }
}
