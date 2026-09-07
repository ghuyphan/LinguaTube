import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastAction, ToastItem } from '../../../core/services/toast.service';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-toast',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    template: `
        @if (toastService.currentToast(); as toast) {
            <div 
                class="toast" 
                [class]="'toast--' + toast.type"
                [class.toast--exiting]="toastService.isExiting()"
                role="status"
                aria-live="polite"
                (click)="onToastClick(toast)">
                <app-icon [name]="toast.icon" [size]="16" />
                <span class="toast__text">{{ toast.message }}</span>
                @if (toast.action; as action) {
                    <button 
                        type="button" 
                        class="toast__action-btn" 
                        (click)="$event.stopPropagation(); executeAction(action)">
                        {{ action.label }}
                    </button>
                }
            </div>
        }
    `
})
export class ToastComponent {
    readonly toastService = inject(ToastService);

    onToastClick(toast: ToastItem): void {
        this.toastService.dismiss(toast.id);
    }

    async executeAction(action: ToastAction): Promise<void> {
        try {
            await action.action();
        } finally {
            this.toastService.dismiss();
        }
    }
}
