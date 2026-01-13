import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { RecordModel } from 'pocketbase';

@Component({
    selector: 'app-profile-card',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, IconComponent],
    template: `
    @if (user()) {
        <div class="user-card">
            <img [src]="user()?.picture" [alt]="user()?.name" class="user-avatar" />
            <div class="user-info">
                <div class="user-name-row">
                    <span class="user-name">{{ user()?.name }}</span>
                    @if (subscriptionTier()) {
                        <span class="badge badge--sm" [class]="'badge--' + subscriptionTier()">
                            {{ subscriptionTier() | uppercase }}
                        </span>
                    }
                </div>
                <span class="user-email">{{ user()?.email }}</span>
            </div>
            <div class="sync-badge" [class.syncing]="isSyncing()">
                @if (isSyncing()) {
                    <app-icon name="loader" [size]="14" class="spin" />
                } @else {
                    <app-icon name="check" [size]="14" />
                }
            </div>
        </div>
        <button class="settings-btn settings-btn--danger" (click)="onSignOut()">
            <app-icon name="log-out" [size]="18" />
            <span>{{ signOutLabel() }}</span>
        </button>
    } @else {
        <button class="settings-btn settings-btn--primary" (click)="onSignIn()" [disabled]="isLoggingIn()">
            <app-icon name="user" [size]="18" />
            <span>{{ signInLabel() }}</span>
        </button>
        <p class="google-signin-hint">{{ syncHint() }}</p>
    }
  `,
    styles: [`
    .user-card {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        padding: var(--space-md);
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        margin-bottom: var(--space-sm);
    }

    .user-avatar {
        width: 3rem; 
        height: 3rem;
        border-radius: var(--border-radius-round);
    }

    .user-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
    }

    .user-name-row {
        display: flex;
        align-items: center;
        gap: var(--space-xs);
        flex-wrap: wrap;
    }

    .user-name {
        font-weight: 500;
        color: var(--text-primary);
        font-size: 0.9375rem;
    }

    .user-email {
        font-size: 0.75rem;
        color: var(--text-muted);
    }

    .sync-badge {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-xs);
        background: rgba(74, 124, 89, 0.1);
        color: var(--success);
        border-radius: var(--border-radius-round);
    }

    .sync-badge.syncing {
        background: rgba(59, 130, 246, 0.1);
        color: #3b82f6;
    }

    .spin {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .settings-btn {
        width: 100%;
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        padding: var(--space-md);
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius);
        color: var(--text-primary);
        font-size: 0.9375rem;
        cursor: pointer;
        transition: all var(--transition-fast);
        justify-content: center; /* Center content for buttons */
    }

    .settings-btn--danger {
        color: var(--error);
        border-color: rgba(239, 68, 68, 0.2);
    }
    
    .settings-btn--primary {
        background: var(--accent-primary);
        color: white;
        border-color: var(--accent-primary);
    }

    .google-signin-hint {
        margin: var(--space-sm) 0 0;
        font-size: 0.75rem;
        color: var(--text-muted);
        text-align: center;
    }
    
    .badge {
        display: inline-flex;
        align-items: center;
        padding: 0.125rem 0.375rem;
        border-radius: var(--border-radius-sm);
        font-size: 0.625rem;
        font-weight: 600;
        letter-spacing: 0.5px;
    }
    
    .badge--free {
        background: var(--bg-secondary);
        color: var(--text-secondary);
    }
    
    .badge--pro {
        background: rgba(var(--accent-primary-rgb), 0.1);
        color: var(--accent-primary);
    }
  `]
})
export class ProfileCardComponent {
    user = input<any | null>(null); // Weakly typed for now, as UserModel might vary
    isSyncing = input<boolean>(false);
    subscriptionTier = input<string>('free');

    // Auth states
    isLoggingIn = input<boolean>(false);

    // Labels
    signInLabel = input<string>('Sign In');
    signOutLabel = input<string>('Sign Out');
    syncHint = input<string>('');

    // Events
    signIn = output<void>();
    signOut = output<void>();

    onSignIn() {
        this.signIn.emit();
    }

    onSignOut() {
        this.signOut.emit();
    }
}
