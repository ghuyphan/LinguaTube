/**
 * DomTeleporter manages moving DOM elements to document.fullscreenElement or document.body
 * to escape stacking contexts, transforms, or overflow constraints, with safe restoration.
 */
export class DomTeleporter {
  private originalParent: Node | null = null;
  private nextSibling: Node | null = null;
  private _isTeleported = false;

  get isTeleported(): boolean {
    return this._isTeleported;
  }

  /**
   * Teleport the host element to the current fullscreen element or target (defaults to document.body).
   */
  teleport(host: HTMLElement, target: Element = document.fullscreenElement || document.body): boolean {
    if (this._isTeleported || !host.parentNode) return false;
    if (host.parentNode === target) return false;

    this.originalParent = host.parentNode;
    this.nextSibling = host.nextSibling;
    target.appendChild(host);
    this._isTeleported = true;
    return true;
  }

  /**
   * Restore the host element back to its original position in the DOM.
   */
  restore(host: HTMLElement): void {
    if (!this._isTeleported || !this.originalParent) return;

    try {
      if (host.parentNode) {
        if (this.nextSibling && this.originalParent.contains(this.nextSibling)) {
          this.originalParent.insertBefore(host, this.nextSibling);
        } else {
          this.originalParent.appendChild(host);
        }
      }
    } catch {
      // Parent was detached, safe to ignore
    }

    this._isTeleported = false;
    this.originalParent = null;
    this.nextSibling = null;
  }
}
