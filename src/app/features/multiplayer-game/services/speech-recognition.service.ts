import { Injectable, NgZone, signal } from '@angular/core';

export interface SpeechResult {
  text: string;
  isFinal: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {
  private recognition: any;

  isSupported = signal<boolean>(false);
  isListening = signal<boolean>(false);
  transcript = signal<SpeechResult | null>(null);
  error = signal<string | null>(null);

  constructor(private zone: NgZone) {
    this.init();
  }

  private init() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.isSupported.set(true);
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onstart = () => {
        this.zone.run(() => this.isListening.set(true));
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        this.zone.run(() => {
          if (finalTranscript) {
            this.transcript.set({ text: finalTranscript, isFinal: true });
          } else if (interimTranscript) {
            this.transcript.set({ text: interimTranscript, isFinal: false });
          }
        });
      };

      this.recognition.onerror = (event: any) => {
        this.zone.run(() => {
          this.error.set(event.error);
          this.isListening.set(false);
          console.error("Speech recognition error:", event.error);
        });
      };

      this.recognition.onend = () => {
        this.zone.run(() => {
          this.isListening.set(false);
        });
      };
    }
  }

  startListening(language: string = 'en-US') {
    if (!this.recognition) return;

    // Map short codes to full BCP 47 locales
    const langMap: Record<string, string> = {
      'en': 'en-US',
      'ja': 'ja-JP',
      'zh': 'zh-CN',
      'ko': 'ko-KR',
      'vi': 'vi-VN'
    };

    this.recognition.lang = langMap[language] || language;
    this.error.set(null);
    this.transcript.set(null);
    try {
      this.recognition.start();
    } catch (e) {
      // Ignore if already started
    }
  }

  stopListening() {
    if (!this.recognition) return;
    this.recognition.stop();
  }
}
