import { Component, inject, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { getRandomOrder, OrderItem } from '../services/order.data';
import { IconComponent, IconName } from '../../../shared/components/icon/icon.component';
import { I18nService } from '../../../core/services/i18n.service';

@Component({
  selector: 'app-barista-view',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './barista-view.component.html',
  styleUrl: './barista-view.component.scss'
})
export class BaristaViewComponent implements AfterViewChecked {
  gameService = inject(GameService);
  i18n = inject(I18nService);
  router = inject(Router);

  @ViewChild('chatScroll') private chatScrollContainer!: ElementRef;

  activeTray: string[] = [];

  private ingredientDefs: { id: string; i18nKey: string; icon: IconName }[] = [
    { id: 'cup', i18nKey: 'game.cup', icon: 'coffee' },
    { id: 'espresso', i18nKey: 'game.espresso', icon: 'droplet' },
    { id: 'milk_whole', i18nKey: 'game.wholeMilk', icon: 'box' },
    { id: 'milk_oat', i18nKey: 'game.oatMilk', icon: 'box' },
    { id: 'matcha', i18nKey: 'game.matcha', icon: 'leaf' },
    { id: 'ice', i18nKey: 'game.ice', icon: 'snowflake' },
    { id: 'syrup_vanilla', i18nKey: 'game.vanillaSyrup', icon: 'droplet' }
  ];

  get ingredients(): { id: string; label: string; icon: IconName }[] {
    return this.ingredientDefs.map(d => ({
      id: d.id,
      label: this.i18n.t(d.i18nKey),
      icon: d.icon
    }));
  }

  constructor() {
    if (!this.gameService.currentRoomId()) {
      // Try to rejoin from session (e.g. page refresh)
      this.gameService.tryRejoin().then(ok => {
        if (!ok) this.router.navigate(['/game']);
      });
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  addIngredient(item: any) {
    if (this.activeTray.length < 5) {
      this.activeTray.push(item.id);
    }
  }

  clearTray() {
    this.activeTray = [];
  }

  get currentScore() {
    return this.gameService.currentRoom()?.game_state?.score || 0;
  }

  async serveOrder() {
    const room = this.gameService.currentRoom();
    if (!room || !room.game_state || !room.game_state.currentOrder) return;

    const currentOrder = room.game_state.currentOrder as OrderItem;
    const requiredItems = [...currentOrder.items].sort();
    const providedItems = [...this.activeTray].sort();

    if (JSON.stringify(requiredItems) === JSON.stringify(providedItems)) {
      // Success! Update score
      const newScore = (room.game_state.score || 0) + 10;
      this.gameService.lastServeResult.set('correct');

      if (newScore >= 50) {
        // Game Over - Win!
        await this.gameService.endGame(newScore);
      } else {
        // Pick next order
        await this.gameService.syncGameState({
          ...room.game_state,
          score: newScore,
          currentOrder: getRandomOrder()
        });
      }
    } else {
      // Failed!
      this.gameService.lastServeResult.set('incorrect');
    }

    this.activeTray = [];

    // Auto-clear feedback after 2 seconds
    setTimeout(() => this.gameService.lastServeResult.set(null), 2000);
  }
}
