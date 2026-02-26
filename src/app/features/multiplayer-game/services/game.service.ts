import { Injectable, inject, signal } from '@angular/core';
import { PocketBaseService } from '../../../core/services/pocketbase.service';

export interface GameRoom {
  id: string;
  host_id: string;
  guest_id?: string;
  status: 'waiting' | 'active' | 'finished';
  game_mode: 'typing' | 'speech';
  target_lang: string;
  patience?: number;
  game_state?: any;
}

export interface GameMessage {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  mode_used: 'typing' | 'speech';
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private pbService = inject(PocketBaseService);

  currentRoomId = signal<string | null>(null);
  currentRoom = signal<GameRoom | null>(null);
  messages = signal<GameMessage[]>([]);
  role = signal<'host' | 'guest' | null>(null);

  // Expose the current user ID for the UI to know which messages are "mine" vs incoming
  myUserId = signal<string | null>(null);

  constructor() {
    this.pbService.waitForReady().then(() => {
      this.myUserId.set(this.pbService.model()?.id || null);
    });
  }

  async createRoom(gameMode: 'typing' | 'speech', targetLang: string): Promise<string> {
    const pb = await this.pbService.getClient();
    const user = this.pbService.model();

    if (!user) throw new Error('User not authenticated');

    const room = await pb.collection('game_rooms').create<GameRoom>({
      host_id: user.id,
      status: 'waiting',
      game_mode: gameMode,
      target_lang: targetLang,
      game_state: {}
    });

    this.currentRoomId.set(room.id);
    this.currentRoom.set(room);
    this.role.set('host');
    await this.subscribeToRoom(room.id);
    await this.subscribeToMessages(room.id);

    return room.id;
  }

  async joinRoom(roomId: string): Promise<boolean> {
    const pb = await this.pbService.getClient();
    const user = this.pbService.model();

    if (!user) throw new Error('User not authenticated');

    try {
      const room = await pb.collection('game_rooms').update<GameRoom>(roomId, {
        guest_id: user.id,
        status: 'active'
      });

      this.currentRoomId.set(room.id);
      this.currentRoom.set(room);
      this.role.set('guest');

      // Load previous messages if any (optional)
      const existingMessages = await pb.collection('game_messages').getList<GameMessage>(1, 50, {
        filter: `room_id = "${roomId}"`,
        sort: 'created'
      });
      this.messages.set(existingMessages.items);

      await this.subscribeToRoom(roomId);
      await this.subscribeToMessages(roomId);
      return true;
    } catch (e) {
      console.error('Failed to join room', e);
      return false;
    }
  }

  async sendMessage(content: string, modeUsed: 'typing' | 'speech'): Promise<void> {
    const roomId = this.currentRoomId();
    if (!roomId) return;

    const pb = await this.pbService.getClient();
    const user = this.pbService.model();
    if (!user) return;

    await pb.collection('game_messages').create<GameMessage>({
      room_id: roomId,
      sender_id: user.id,
      content,
      mode_used: modeUsed
    });
  }

  private async subscribeToRoom(roomId: string) {
    const pb = await this.pbService.getClient();

    pb.collection('game_rooms').subscribe<GameRoom>(roomId, (e) => {
      this.currentRoom.set(e.record);
    });
  }

  private async subscribeToMessages(roomId: string) {
    const pb = await this.pbService.getClient();

    pb.collection('game_messages').subscribe<GameMessage>('*', (e) => {
      if (e.action === 'create' && e.record.room_id === roomId) {
        this.messages.update(msgs => [...msgs, e.record]);
      }
    });
  }

  async syncGameState(newState: any) {
    const roomId = this.currentRoomId();
    if (!roomId) return;

    const pb = await this.pbService.getClient();
    await pb.collection('game_rooms').update(roomId, {
      game_state: newState
    });
  }

  async leaveRoom() {
    const roomId = this.currentRoomId();
    if (!roomId) return;

    const pb = await this.pbService.getClient();

    pb.collection('game_rooms').unsubscribe(roomId);
    pb.collection('game_messages').unsubscribe('*');

    this.currentRoomId.set(null);
    this.currentRoom.set(null);
    this.messages.set([]);
    this.role.set(null);
  }
}

