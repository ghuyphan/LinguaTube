import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerViewService {
  /** Whether the video player is currently in miniplayer mode */
  readonly isMiniplayer = signal(false);

  /**
   * Minimize the video player into a compact floating/docked miniplayer.
   */
  minimize(): void {
    this.isMiniplayer.set(true);
  }

  /**
   * Expand the video player back to full-page view.
   */
  expand(): void {
    this.isMiniplayer.set(false);
  }

  /**
   * Toggle between miniplayer and expanded view.
   */
  toggle(): void {
    this.isMiniplayer.update(v => !v);
  }

  /**
   * Reset player view state (e.g. when video session ends).
   */
  reset(): void {
    this.isMiniplayer.set(false);
  }
}
