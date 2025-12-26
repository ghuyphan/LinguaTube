import { Component, inject, input, output, ChangeDetectionStrategy, signal, ViewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { SettingsService, VocabularyService, AuthService, YoutubeService, SubtitleService, I18nService, UILanguage, SyncService, TranscriptService } from '../../services';

@Component({
  selector: 'app-settings-sheet',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent, BottomSheetComponent],
  templateUrl: './settings-sheet.component.html',
  styleUrl: './settings-sheet.component.scss'
})
export class SettingsSheetComponent {
  settings = inject(SettingsService);
  vocab = inject(VocabularyService);
  auth = inject(AuthService);
  youtube = inject(YoutubeService);
  subtitles = inject(SubtitleService);
  i18n = inject(I18nService);
  sync = inject(SyncService);
  transcript = inject(TranscriptService);

  @ViewChild('googleBtnSettings') googleBtnSettings!: ElementRef;

  isOpen = input<boolean>(false);
  closed = output<void>();

  showSignOutConfirm = signal(false);
  private buttonRendered = false;

  constructor() {
    effect(() => {
      // Only render the button once to prevent flicker from "Sign in with Google" -> "Sign in as..."
      if (this.isOpen() && this.auth.isInitialized() && this.auth.isAuthEnabled() && !this.auth.isLoggedIn() && !this.buttonRendered) {
        setTimeout(() => {
          this.renderGoogleButton();
          this.buttonRendered = true;
        }, 0);
      }
    });
  }

  renderGoogleButton() {
    if (this.googleBtnSettings?.nativeElement) {
      this.auth.renderButton(this.googleBtnSettings.nativeElement, {
        type: 'standard',
        shape: 'pill',
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        width: 240
      });
    }
  }

  setLanguage(lang: 'ja' | 'zh' | 'ko' | 'en'): void {
    if (this.settings.settings().language === lang) return;
    this.youtube.reset();
    this.subtitles.clear();
    this.transcript.reset();
    this.settings.setLanguage(lang);
  }

  setUILanguage(lang: UILanguage): void {
    this.i18n.setLanguage(lang);
  }

  toggleTheme(): void {
    const effectiveTheme = this.settings.getEffectiveTheme();
    const next = effectiveTheme === 'dark' ? 'light' : 'dark';
    this.settings.setTheme(next);
  }

  showSignOutModal(): void {
    this.showSignOutConfirm.set(true);
  }

  confirmSignOut(): void {
    this.showSignOutConfirm.set(false);
    this.auth.signOut();
    this.closed.emit();
  }
}
