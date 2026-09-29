import {
  Directive,
  ElementRef,
  PLATFORM_ID,
  effect,
  inject,
  input,
  output,
  DestroyRef
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true
})
export class InfiniteScrollDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  rootMargin = input<string>('400px 0px');
  threshold = input<number>(0.05);
  disabled = input<boolean>(false);
  throttleMs = input<number>(120);

  scrolled = output<void>();

  private observer: IntersectionObserver | null = null;
  private isThrottled = false;

  constructor() {
    effect(() => {
      const isDisabled = this.disabled();
      const margin = this.rootMargin();
      const thresh = this.threshold();

      if (!isPlatformBrowser(this.platformId)) return;

      this.cleanup();

      if (isDisabled) return;

      const target = this.elementRef.nativeElement;
      if (!target || typeof IntersectionObserver === 'undefined') return;

      this.observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && !this.disabled() && !this.isThrottled) {
          this.isThrottled = true;
          this.scrolled.emit();
          const ms = this.throttleMs();
          if (ms > 0) {
            setTimeout(() => {
              this.isThrottled = false;
            }, ms);
          } else {
            this.isThrottled = false;
          }
        }
      }, {
        rootMargin: margin,
        threshold: thresh
      });

      this.observer.observe(target);
    });

    this.destroyRef.onDestroy(() => {
      this.cleanup();
    });
  }

  private cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
