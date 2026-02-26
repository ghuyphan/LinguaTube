import { Component, inject, effect } from '@angular/core';
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

  constructor() {
    // Auto-navigate when room becomes active AND game state is ready
    effect(() => {
      const room = this.gameService.currentRoom();
      if (!room) return;

      // Both players navigate when game_state has a currentOrder
      if (room.status === 'active' && room.game_state?.currentOrder) {
        if (this.gameService.role() === 'host') {
          this.router.navigate(['/game/barista']);
        } else {
          this.router.navigate(['/game/customer']);
        }
      }
    });
  }

  async createRoom() {
    this.errorMessage = '';
    try {
      await this.gameService.createRoom(this.selectedMode, this.selectedLang);
    } catch (e: any) {
      console.error(e);
      this.errorMessage = this.i18n.t('game.errorCreate');
    }
  }

  async joinRoom() {
    if (!this.joinRoomId.trim()) return;
    this.errorMessage = '';
    try {
      const success = await this.gameService.joinRoom(this.joinRoomId.trim());
      if (!success) this.errorMessage = this.i18n.t('game.errorJoinNotFound');
    } catch (e: any) {
      console.error(e);
      this.errorMessage = this.i18n.t('game.errorJoin');
    }
  }

  async startGame() {
    // Only host can initialize the game state
    if (this.gameService.role() !== 'host') return;

    const { getRandomOrder } = await import('../services/order.data');
    await this.gameService.syncGameState({
      score: 0,
      currentOrder: getRandomOrder()
    });
    // Navigation happens automatically via the effect above
  }
}
