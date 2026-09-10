import { Injectable, signal } from '@angular/core';
import { IconName } from '../../shared/components/icon/icon.component';

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition = 'bottom' | 'top';

export interface ToastAction {
    label: string;
    action: () => void | Promise<void>;
}

export interface ToastOptions {
    type?: ToastType;
    duration?: number;
    icon?: IconName;
    action?: ToastAction;
    position?: ToastPosition;
}

export interface ToastItem {
    id: string;
    message: string;
    type: ToastType;
    icon: IconName;
    action?: ToastAction;
    duration: number;
    position: ToastPosition;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    readonly currentToast = signal<ToastItem | null>(null);
    readonly isExiting = signal(false);

    private dismissTimer: ReturnType<typeof setTimeout> | null = null;
    private exitTimer: ReturnType<typeof setTimeout> | null = null;
    private startTime = 0;
    private remainingTime = 0;
    private isPaused = false;

    /**
     * Show a new toast notification. Replaces any active toast smoothly.
     */
    show(message: string, options?: ToastOptions): string {
        this.clearTimers();

        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        const type = options?.type || 'info';
        const icon = options?.icon || this.getDefaultIcon(type);
        const action = options?.action;
        const position = options?.position || 'bottom';
        // Default duration is 3000ms, or 4500ms if action (e.g. Undo) is present
        const duration = options?.duration ?? (action ? 4500 : 3000);

        const item: ToastItem = {
            id,
            message,
            type,
            icon,
            action,
            duration,
            position
        };

        this.startTime = Date.now();
        this.remainingTime = duration;
        this.isPaused = false;
        this.isExiting.set(false);
        this.currentToast.set(item);

        if (duration > 0) {
            this.dismissTimer = setTimeout(() => {
                this.dismiss(id);
            }, duration);
        }

        return id;
    }

    /**
     * Pause the auto-dismiss timer (e.g. on mouse hover or touch press)
     */
    pause(): void {
        if (this.isPaused || !this.currentToast() || this.isExiting()) return;
        if (this.dismissTimer) {
            clearTimeout(this.dismissTimer);
            this.dismissTimer = null;
        }
        const elapsed = Date.now() - this.startTime;
        this.remainingTime = Math.max(800, this.remainingTime - elapsed);
        this.isPaused = true;
    }

    /**
     * Resume the auto-dismiss timer (e.g. on mouse leave or touch release)
     */
    resume(): void {
        if (!this.isPaused || !this.currentToast() || this.isExiting()) return;
        this.isPaused = false;
        this.startTime = Date.now();
        const id = this.currentToast()!.id;
        this.dismissTimer = setTimeout(() => {
            this.dismiss(id);
        }, this.remainingTime);
    }

    /**
     * Show a success toast
     */
    success(message: string, options?: Omit<ToastOptions, 'type'>): string {
        return this.show(message, { ...options, type: 'success' });
    }

    /**
     * Show an error toast
     */
    error(message: string, options?: Omit<ToastOptions, 'type'>): string {
        return this.show(message, { ...options, type: 'error' });
    }

    /**
     * Show an info toast
     */
    info(message: string, options?: Omit<ToastOptions, 'type'>): string {
        return this.show(message, { ...options, type: 'info' });
    }

    /**
     * Show a warning toast
     */
    warning(message: string, options?: Omit<ToastOptions, 'type'>): string {
        return this.show(message, { ...options, type: 'warning' });
    }

    /**
     * Dismiss the current toast with an exit animation
     */
    dismiss(id?: string): void {
        const current = this.currentToast();
        if (!current) return;
        if (id && current.id !== id) return;

        this.clearTimers();
        this.isExiting.set(true);

        // Allow 200ms for exit animation before clearing state
        this.exitTimer = setTimeout(() => {
            this.currentToast.set(null);
            this.isExiting.set(false);
            this.exitTimer = null;
        }, 200);
    }

    private clearTimers(): void {
        if (this.dismissTimer) {
            clearTimeout(this.dismissTimer);
            this.dismissTimer = null;
        }
        if (this.exitTimer) {
            clearTimeout(this.exitTimer);
            this.exitTimer = null;
        }
        this.isPaused = false;
    }

    private getDefaultIcon(type: ToastType): IconName {
        switch (type) {
            case 'success':
                return 'check';
            case 'error':
                return 'alert-circle';
            case 'warning':
                return 'alert-circle';
            case 'info':
            default:
                return 'info';
        }
    }
}
