import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { I18nService } from '../../../core/services/i18n.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-game-lobby',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './game-lobby.component.html',
  styleUrl: './game-lobby.component.scss'
})
export class GameLobbyComponent {
  i18n = inject(I18nService);
  gameService = inject(GameService);
  private router = inject(Router);

  selectedMode: 'typing' | 'speech' = 'speech';
  selectedLang: string = 'ja';
  joinRoomId: string = '';
  errorMessage: string = '';

  async createRoom() {
    this.errorMessage = '';
    try {
      await this.gameService.createRoom(this.selectedMode, this.selectedLang);
    } catch (e: any) {
      console.error(e);
      this.errorMessage = 'Failed to create room. Are you logged in?';
    }
  }

  async joinRoom() {
    if (!this.joinRoomId.trim()) return;
    this.errorMessage = '';
    try {
      const success = await this.gameService.joinRoom(this.joinRoomId.trim());
      if (!success) this.errorMessage = 'Room not found or error joining.';
    } catch (e: any) {
      console.error(e);
      this.errorMessage = 'Failed to join room.';
    }
  }

  startGame() {
    if (this.gameService.role() === 'host') {
      this.router.navigate(['/game/barista']);
    } else {
      this.router.navigate(['/game/customer']);
    }
  }
}
