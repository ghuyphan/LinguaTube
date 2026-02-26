import { Injectable, inject, signal } from '@angular/core';
import { PocketBaseService } from '../../../core/services/pocketbase.service';

const SESSION_KEY = 'game_session';

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
  private subscribed = false;

  currentRoomId = signal<string | null>(null);
  currentRoom = signal<GameRoom | null>(null);
  messages = signal<GameMessage[]>([]);
  role = signal<'host' | 'guest' | null>(null);
  lastServeResult = signal<'correct' | 'incorrect' | null>(null);

  // Expose the current user ID for the UI to know which messages are "mine" vs incoming
  myUserId = signal<string | null>(null);

  constructor() {
    this.pbService.waitForReady().then(() => {
      this.myUserId.set(this.pbService.model()?.id || null);
      // Auto-rejoin if there's a saved session
      this.tryRejoin();
    });
  }

  // ── Session persistence ──────────────────────────────────────

  private saveSession() {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
      roomId: this.currentRoomId(),
      role: this.role()
    }));
  }

  private clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  /**
   * Attempt to rejoin a room from a saved session (e.g. after page refresh).
   * Returns true if successfully rejoined.
   */
  async tryRejoin(): Promise<boolean> {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (!saved) return false;

    try {
      const { roomId, role } = JSON.parse(saved);
      if (!roomId || !role) {
        this.clearSession();
        return false;
      }

      const pb = await this.pbService.getClient();
      const room = await pb.collection('game_rooms').getOne<GameRoom>(roomId);

      // Don't rejoin finished rooms
      if (room.status === 'finished') {
        this.clearSession();
        return false;
      }

      // Verify we're still a participant
      const userId = this.pbService.model()?.id;
      if (!userId) {
        this.clearSession();
        return false;
      }

      const isHost = room.host_id === userId;
      const isGuest = room.guest_id === userId;
      if (!isHost && !isGuest) {
        this.clearSession();
        return false;
      }

      // Restore state
      this.currentRoomId.set(room.id);
      this.currentRoom.set(room);
      this.role.set(isHost ? 'host' : 'guest');

      // Reload messages
      const msgs = await pb.collection('game_messages').getList<GameMessage>(1, 50, {
        filter: `room_id = "${roomId}"`,
        sort: 'created'
      });
      this.messages.set(msgs.items);

      // Subscribe to updates
      await this.subscribeToRoom(roomId);
      await this.subscribeToMessages(roomId);

      return true;
    } catch (e) {
      console.error('[GameService] Rejoin failed:', e);
      this.clearSession();
      return false;
    }
  }

  // ── Room management ──────────────────────────────────────────

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
    this.saveSession();

    await this.subscribeToRoom(room.id);
    await this.subscribeToMessages(room.id);

    return room.id;
  }

  async joinRoom(roomId: string): Promise<boolean> {
    const pb = await this.pbService.getClient();
    const user = this.pbService.model();

    if (!user) throw new Error('User not authenticated');

    try {
      // Validate room before joining
      const existingRoom = await pb.collection('game_rooms').getOne<GameRoom>(roomId);
      if (existingRoom.status !== 'waiting') return false;
      if (existingRoom.guest_id) return false; // Already full
      if (existingRoom.host_id === user.id) return false; // Can't join own room

      const room = await pb.collection('game_rooms').update<GameRoom>(roomId, {
        guest_id: user.id,
        status: 'active'
      });

      this.currentRoomId.set(room.id);
      this.currentRoom.set(room);
      this.role.set('guest');
      this.saveSession();

      // Load previous messages if any
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

  // ── Messaging ────────────────────────────────────────────────

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

  // ── Subscriptions ────────────────────────────────────────────

  private async subscribeToRoom(roomId: string) {
    const pb = await this.pbService.getClient();

    // Unsubscribe from any previous room subscription first
    try { pb.collection('game_rooms').unsubscribe(roomId); } catch { }

    pb.collection('game_rooms').subscribe<GameRoom>(roomId, (e) => {
      this.currentRoom.set(e.record);
    });
  }

  private async subscribeToMessages(roomId: string) {
    const pb = await this.pbService.getClient();

    // Unsubscribe from any previous message subscription first
    try { pb.collection('game_messages').unsubscribe('*'); } catch { }

    pb.collection('game_messages').subscribe<GameMessage>('*', (e) => {
      const currentRoomId = this.currentRoomId();
      if (e.action === 'create' && e.record.room_id === currentRoomId) {
        this.messages.update(msgs => [...msgs, e.record]);
      }
    });

    this.subscribed = true;
  }

  // ── Game state ───────────────────────────────────────────────

  async syncGameState(newState: any) {
    const roomId = this.currentRoomId();
    if (!roomId) return;

    const pb = await this.pbService.getClient();
    await pb.collection('game_rooms').update(roomId, {
      game_state: newState
    });
  }

  async endGame(finalScore: number) {
    const roomId = this.currentRoomId();
    if (!roomId) return;

    const pb = await this.pbService.getClient();
    const room = this.currentRoom();

    // Update room to finished
    await pb.collection('game_rooms').update(roomId, {
      status: 'finished',
      game_state: {
        ...room?.game_state,
        score: finalScore
      }
    });

    // Grant rewards
    const user = this.pbService.model();
    if (user) {
      try {
        const dbUser = await pb.collection('users').getOne(user.id);
        const currentExp = typeof dbUser['exp'] === 'number' ? dbUser['exp'] : 0;
        await pb.collection('users').update(user.id, {
          exp: currentExp + finalScore
        });
      } catch (e) {
        console.error('Reward error', e);
      }
    }
  }

  // ── Leave / cleanup ──────────────────────────────────────────

  async leaveRoom() {
    const roomId = this.currentRoomId();
    if (!roomId) return;

    const pb = await this.pbService.getClient();
    const currentRole = this.role();

    // Update room in PocketBase so the other player knows
    try {
      if (currentRole === 'host') {
        // Host leaves → mark room as finished
        await pb.collection('game_rooms').update(roomId, { status: 'finished' });
      } else if (currentRole === 'guest') {
        // Guest leaves → remove guest, revert to waiting
        await pb.collection('game_rooms').update(roomId, {
          guest_id: '',
          status: 'waiting'
        });
      }
    } catch (e) {
      console.error('[GameService] Leave cleanup error:', e);
    }

    // Unsubscribe from realtime
    try { pb.collection('game_rooms').unsubscribe(roomId); } catch { }
    try { pb.collection('game_messages').unsubscribe('*'); } catch { }

    // Clear local state
    this.currentRoomId.set(null);
    this.currentRoom.set(null);
    this.messages.set([]);
    this.role.set(null);
    this.lastServeResult.set(null);
    this.subscribed = false;
    this.clearSession();
  }
}
