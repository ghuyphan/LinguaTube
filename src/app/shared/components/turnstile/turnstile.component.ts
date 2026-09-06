import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  viewChild,
  OnInit,
  OnDestroy,
  input,
  output,
  signal,
  inject,
  NgZone,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { IconComponent } from '../icon/icon.component';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          theme?: 'auto' | 'light' | 'dark';
          action?: string;
          callback?: (token: string) => void;
          'error-callback'?: (error: unknown) => void;
          'expired-callback'?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

@Component({
  selector: 'app-turnstile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconComponent],
  template: `
    <div class="turnstile-wrapper">
      @if (status() === 'loading') {
        <div class="turnstile-placeholder">
          <app-icon name="lock" [size]="16" class="shield-icon" />
          <span>Connecting security check...</span>
        </div>
      }
      <div #turnstileContainer class="turnstile-container" [class.is-ready]="status() !== 'loading'"></div>
      @if (status() === 'error') {
        <div class="turnstile-error">
          <app-icon name="alert-circle" [size]="14" />
          <span>Verification failed. <button type="button" (click)="reset()" class="retry-btn">Retry</button></span>
        </div>
      }
    </div>
  `,
  styleUrls: ['./turnstile.component.scss']
})
export class TurnstileComponent implements OnInit, OnDestroy {
  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);

  private container = viewChild<ElementRef<HTMLDivElement>>('turnstileContainer');

  siteKey = input<string>(environment.turnstileSiteKey);
  theme = input<'auto' | 'light' | 'dark'>('auto');
  action = input<string>('ai_transcription');

  resolved = output<string>();
  captchaError = output<string>();
  expired = output<void>();

  status = signal<'loading' | 'ready' | 'resolved' | 'error' | 'expired'>('loading');
  private widgetId: string | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initTurnstile();
  }

  ngOnDestroy(): void {
    if (this.widgetId && window.turnstile) {
      try {
        window.turnstile.remove(this.widgetId);
      } catch { }
      this.widgetId = null;
    }
  }

  reset(): void {
    if (this.widgetId && window.turnstile) {
      try {
        window.turnstile.reset(this.widgetId);
        this.status.set('ready');
      } catch {
        this.renderWidget();
      }
    } else {
      this.renderWidget();
    }
  }

  private initTurnstile(): void {
    if (window.turnstile) {
      this.renderWidget();
      return;
    }

    const scriptId = 'cf-turnstile-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    const checkReady = () => {
      if (window.turnstile) {
        this.renderWidget();
      } else {
        setTimeout(checkReady, 50);
      }
    };

    checkReady();
  }

  private renderWidget(): void {
    const containerEl = this.container()?.nativeElement;
    if (!window.turnstile || !containerEl) return;

    if (this.widgetId) {
      try {
        window.turnstile.remove(this.widgetId);
      } catch { }
      this.widgetId = null;
    }

    try {
      this.widgetId = window.turnstile.render(containerEl, {
        sitekey: this.siteKey(),
        theme: this.theme(),
        action: this.action(),
        callback: (token: string) => {
          this.ngZone.run(() => {
            this.status.set('resolved');
            this.resolved.emit(token);
          });
        },
        'error-callback': (err: unknown) => {
          this.ngZone.run(() => {
            this.status.set('error');
            this.captchaError.emit(String(err));
          });
        },
        'expired-callback': () => {
          this.ngZone.run(() => {
            this.status.set('expired');
            this.expired.emit();
          });
        }
      });
      this.status.set('ready');
    } catch (err) {
      console.warn('[Turnstile] Render error:', err);
      this.status.set('error');
    }
  }
}
