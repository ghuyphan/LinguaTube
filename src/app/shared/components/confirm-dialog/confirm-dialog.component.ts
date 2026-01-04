import { Component, input, output, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, BottomSheetComponent, IconComponent],
    template: `
        <app-bottom-sheet 
            [isOpen]="isOpen()" 
            [showDragHandle]="false" 
            [showCloseButton]="false"
            [navPadding]="navPadding()"
            [allowBackdropClose]="allowBackdropClose()"
            (closed)="onSheetClosed()">
            <div class="confirm-dialog">
                @if (icon()) {
                <div class="confirm-dialog__icon" [class]="'confirm-dialog__icon--' + variant()">
                    <app-icon [name]="$any(icon())" [size]="28" />
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
                        (click)="onCancel()"
                        type="button">
                        {{ cancelText() }}
                    </button>
                    }
                    <button 
                        class="confirm-dialog__btn" 
                        [class.confirm-dialog__btn--danger]="variant() === 'danger'"
                        [class.confirm-dialog__btn--primary]="variant() !== 'danger'"
                        (click)="onConfirm()"
                        type="button">
                        {{ confirmText() }}
                    </button>
                </div>
            </div>
        </app-bottom-sheet>
    `,
    styles: [`
        .confirm-dialog {
            padding: var(--space-lg);
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
            font-weight: 600;
            color: var(--text-primary);
            margin: 0 0 var(--space-xs);
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
            padding: var(--space-md);
            border-radius: var(--border-radius);
            font-size: 0.9375rem;
            font-weight: 500;
            border: none;
            cursor: pointer;
            transition: all var(--transition-fast);
        }

        .confirm-dialog__btn--cancel {
            background: var(--bg-secondary);
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
            .confirm-dialog__btn--cancel:hover {
                background: var(--bg-card);
            }

            .confirm-dialog__btn--primary:hover,
            .confirm-dialog__btn--danger:hover {
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
    icon = input<string>('');
    navPadding = input<boolean>(false);
    showCancel = input<boolean>(true);
    allowBackdropClose = input<boolean>(true);

    // Outputs
    confirmed = output<void>();
    cancelled = output<void>();

    @ViewChild(BottomSheetComponent) sheet!: BottomSheetComponent;

    // Track which action triggered the close
    private closingAction: 'confirm' | 'cancel' | null = null;

    onConfirm(): void {
        this.closingAction = 'confirm';
        this.sheet.close();
    }

    onCancel(): void {
        this.closingAction = 'cancel';
        this.sheet.close();
    }

    onSheetClosed(): void {
        if (this.closingAction === 'confirm') {
            this.confirmed.emit();
        } else {
            this.cancelled.emit();
        }
        // Reset for next opening
        this.closingAction = null;
    }
}
