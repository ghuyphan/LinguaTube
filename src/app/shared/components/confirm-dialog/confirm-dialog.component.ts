import { Component, input, output, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { IconComponent, IconName } from '../icon/icon.component';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, BottomSheetComponent, IconComponent],
    template: `
        <app-bottom-sheet 
            [isOpen]="isOpen()" 
            [title]="title()"
            [showDragHandle]="false" 
            [showCloseButton]="false"
            [allowBackdropClose]="allowBackdropClose() && !isLoading()"
            (closed)="onSheetClosed()">
            <div class="confirm-dialog">
                @if (icon(); as iconName) {
                <div class="confirm-dialog__icon" [class]="'confirm-dialog__icon--' + variant()">
                    <app-icon [name]="iconName" [size]="28" />
                </div>
                }
                
                <h3 class="confirm-dialog__title">{{ title() }}</h3>
                
                @if (message()) {
                <p class="confirm-dialog__message">{{ message() }}</p>
                }
                
                <div class="confirm-dialog__actions">
                    @if (showCancel()) {
                    <button 
                        class="confirm-dialog__btn confirm-dialog__btn--cancel" 
                        [disabled]="isLoading()"
                        (click)="onCancel()"
                        type="button">
                        {{ cancelText() }}
                    </button>
                    }
                    <button 
                        class="confirm-dialog__btn" 
                        [class.confirm-dialog__btn--danger]="variant() === 'danger'"
                        [class.confirm-dialog__btn--primary]="variant() !== 'danger'"
                        [class.confirm-dialog__btn--loading]="isLoading()"
                        [disabled]="isLoading()"
                        (click)="onConfirm()"
                        type="button">
                        @if (isLoading()) {
                            <div class="confirm-dialog__spinner"></div>
                            <span>{{ loadingText() || confirmText() }}</span>
                        } @else {
                            {{ confirmText() }}
                        }
                    </button>
                </div>
            </div>
        </app-bottom-sheet>
    `,
    styles: [`
        .confirm-dialog {
            padding: var(--space-lg) var(--space-lg) calc(var(--space-lg) + env(safe-area-inset-bottom, 0px));
            max-width: 440px;
            margin: 0 auto;
            text-align: center;
        }

        .confirm-dialog__icon {
            width: 3.5rem;
            height: 3.5rem;
            margin: 0 auto var(--space-md);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--border-radius-round);
        }

        .confirm-dialog__icon--default {
            background: rgba(74, 111, 165, 0.1);
            color: var(--info);
        }

        .confirm-dialog__icon--danger {
            background: rgba(199, 62, 58, 0.1);
            color: var(--error);
        }

        .confirm-dialog__title {
            font-size: 1.125rem;
            font-weight: 800;
            color: var(--text-primary);
            margin: 0 0 var(--space-xs);
            letter-spacing: -0.01em;
        }

        .confirm-dialog__message {
            font-size: 0.875rem;
            color: var(--text-muted);
            margin: 0 0 var(--space-lg);
            line-height: 1.5;
        }

        .confirm-dialog__actions {
            display: flex;
            gap: var(--space-sm);
        }

        .confirm-dialog__btn {
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
            gap: 8px;
            transition: all var(--transition-fast);

            &:disabled {
                opacity: 0.65;
                cursor: not-allowed;
            }
        }

        .confirm-dialog__spinner {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.35);
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: spin 0.75s linear infinite;
            flex-shrink: 0;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .confirm-dialog__btn--cancel {
            background: var(--bg-surface);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
        }

        .confirm-dialog__btn--primary {
            background: var(--accent-primary);
            color: white;
        }

        .confirm-dialog__btn--danger {
            background: var(--error);
            color: white;
        }

        @media (hover: hover) {
            .confirm-dialog__btn--cancel:hover:not(:disabled) {
                background: var(--bg-hover);
            }

            .confirm-dialog__btn--primary:hover:not(:disabled),
            .confirm-dialog__btn--danger:hover:not(:disabled) {
                opacity: 0.9;
            }
        }
    `]
})
export class ConfirmDialogComponent {
    // Inputs
    isOpen = input<boolean>(false);
    title = input.required<string>();
    message = input<string>('');
    confirmText = input<string>('Confirm');
    cancelText = input<string>('Cancel');
    variant = input<'danger' | 'default'>('default');
    icon = input<IconName | '' | null>('');
    showCancel = input<boolean>(true);
    allowBackdropClose = input<boolean>(true);
    isLoading = input<boolean>(false);
    loadingText = input<string>('');
    closeOnConfirm = input<boolean>(true);

    // Outputs
    confirmed = output<void>();
    cancelled = output<void>();

    readonly sheet = viewChild(BottomSheetComponent);

    // Track which action triggered the close
    private closingAction: 'confirm' | 'cancel' | null = null;

    onConfirm(): void {
        if (this.isLoading()) return;
        if (this.closeOnConfirm()) {
            this.closingAction = 'confirm';
            this.sheet()?.close();
        } else {
            this.confirmed.emit();
        }
    }

    onCancel(): void {
        if (this.isLoading()) return;
        this.closingAction = 'cancel';
        this.sheet()?.close();
    }

    onSheetClosed(): void {
        if (this.closingAction === 'confirm') {
            this.confirmed.emit();
        } else if (this.closingAction === 'cancel') {
            this.cancelled.emit();
        }
        // Reset for next opening
        this.closingAction = null;
    }
}
