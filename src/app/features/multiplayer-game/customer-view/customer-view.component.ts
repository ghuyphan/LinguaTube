import { Component, inject, effect, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { SpeechRecognitionService } from '../services/speech-recognition.service';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { I18nService } from '../../../core/services/i18n.service';
import { OrderItem } from '../services/order.data';

@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  templateUrl: './customer-view.component.html',
  styleUrl: './customer-view.component.scss'
})
export class CustomerViewComponent implements AfterViewChecked {
  gameService = inject(GameService);
  speechService = inject(SpeechRecognitionService);
  i18n = inject(I18nService);
  router = inject(Router);

  @ViewChild('chatScroll') private chatScrollContainer!: ElementRef;

  textInput = '';
  isHoldingMic = false;

  get currentObjective() {
    return this.gameService.currentRoom()?.game_state?.currentOrder as OrderItem | undefined;
  }

  constructor() {
    // If not in a room, try to rejoin from session (e.g. page refresh)
    if (!this.gameService.currentRoomId()) {
      this.gameService.tryRejoin().then(ok => {
        if (!ok) this.router.navigate(['/game']);
      });
    }

    // Effect to auto-send speech when final transcript is ready
    effect(() => {
      const transcript = this.speechService.transcript();
      if (transcript && transcript.isFinal && this.isHoldingMic) {
        // Option to handle it here, currently handled on mouseup/touchend
      }
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  get isSpeechMode() {
    return this.gameService.currentRoom()?.game_mode === 'speech';
  }

  async sendText() {
    if (!this.textInput.trim() || this.isSpeechMode) return;
    await this.gameService.sendMessage(this.textInput.trim(), 'typing');
    this.textInput = '';
  }

  startSpeaking() {
    if (!this.isSpeechMode) return;
    this.isHoldingMic = true;
    const lang = this.gameService.currentRoom()?.target_lang || 'en';
    this.speechService.startListening(lang);
  }

  async stopSpeaking() {
    if (!this.isSpeechMode || !this.isHoldingMic) return;
    this.isHoldingMic = false;
    this.speechService.stopListening();

    // When released, send the transcript if we have one
    const transcript = this.speechService.transcript();
    if (transcript && transcript.text.trim()) {
      await this.gameService.sendMessage(transcript.text.trim(), 'speech');
    }
  }
}
