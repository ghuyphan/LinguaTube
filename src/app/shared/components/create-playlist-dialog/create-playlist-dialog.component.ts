import { Component, ChangeDetectionStrategy, input, output, inject, signal, viewChild, computed, linkedSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { PlaylistService } from '../../../features/playlist/playlist.service';
import { AuthService, I18nService } from '../../../core/services';
import { IconComponent } from '../icon/icon.component';
import { Playlist, SUPPORTED_LANGUAGES } from '../../../models';

@Component({
    selector: 'app-create-playlist-dialog',
    standalone: true,
    imports: [CommonModule, FormsModule, BottomSheetComponent, IconComponent],
    templateUrl: './create-playlist-dialog.component.html',
    styleUrls: ['./create-playlist-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreatePlaylistDialogComponent {
    private playlistService = inject(PlaylistService);
    private auth = inject(AuthService);
    i18n = inject(I18nService);

    // Check if user is logged in (only logged in users can use unlisted/public)
    isLoggedIn = this.auth.isLoggedIn;

    // Inputs
    isOpen = input<boolean>(false);
    playlist = input<Playlist | null>(null);

    // Outputs
    closed = output<void>();
    created = output<void>();
    updated = output<void>();

    readonly sheet = viewChild(BottomSheetComponent);

    // Form State (linkedSignal synchronizes whenever the playlist input changes)
    readonly title = linkedSignal(() => this.playlist()?.title || '');
    readonly visibility = linkedSignal<'private' | 'unlisted' | 'published'>(() =>
        this.playlist()?.visibility || (this.auth.isLoggedIn() ? 'unlisted' : 'private')
    );
    readonly language = linkedSignal<'ja' | 'zh' | 'ko' | 'en'>(() => this.playlist()?.language || 'ja');
    readonly isSubmitting = signal(false);

    // Computed
    isEditing = computed(() => !!this.playlist());

    // Language options
    readonly languages = SUPPORTED_LANGUAGES;

    async onSubmit() {
        if (!this.title() || this.isSubmitting()) return;

        this.isSubmitting.set(true);

        try {
            if (this.isEditing()) {
                await this.playlistService.updatePlaylist(this.playlist()!.id, {
                    title: this.title(),
                    visibility: this.visibility(),
                    language: this.language()
                });
                this.updated.emit();
            } else {
                await this.playlistService.createPlaylist({
                    title: this.title(),
                    visibility: this.visibility(),
                    language: this.language()
                });
                this.created.emit();
            }

            this.sheet()?.close();
        } catch (error) {
            console.error('Failed to save playlist:', error);
        } finally {
            this.isSubmitting.set(false);
        }
    }

    onSheetClosed() {
        this.resetForm();
        this.closed.emit();
    }

    private resetForm() {
        this.title.set('');
        // Default to private for unauthenticated users, unlisted for logged-in users
        this.visibility.set(this.auth.isLoggedIn() ? 'unlisted' : 'private');
        this.language.set('ja');
        this.isSubmitting.set(false);
    }
}
