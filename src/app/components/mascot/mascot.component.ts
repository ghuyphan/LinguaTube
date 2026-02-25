import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type MascotMood = 'default' | 'sad' | 'thinking' | 'sleeping' | 'happy' | 'reading';

@Component({
  selector: 'app-mascot',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mascot-container" [attr.data-mood]="moodStr()">
      <!-- Shiba Inu Mascot SVG - Cute/Kawaii Style -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" class="shiba-svg" [class]="moodStr()">
        <style>
          /* Static Colors */
          .shiba-base { fill: #f39c12; }
          .shiba-light { fill: #fff; }
          .shiba-dark { fill: #4a4a4a; }
          .shiba-blush { fill: #ff9999; opacity: 0.8; }
          .shiba-ears { fill: #d35400; }
          .shiba-snout { fill: #ffffff; }

          /* Mood Animations */
          .ear-l { transform-origin: 35px 35px; transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
          .ear-r { transform-origin: 85px 35px; transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
          .eye-l { transform-origin: 38px 62px; transition: transform 0.2s, opacity 0.2s; }
          .eye-r { transform-origin: 82px 62px; transition: transform 0.2s, opacity 0.2s; }
          .mouth { transition: d 0.3s; }
          .snot-bubble { opacity: 0; transform-origin: top left; transition: opacity 0.3s; }
          .question-mark { opacity: 0; transform: translateY(10px); transition: all 0.3s; }

          /* Moods */
          svg.happy .ear-l { transform: rotate(-5deg); }
          svg.happy .ear-r { transform: rotate(5deg); }
          svg.happy .mouth { d: path("M48,70 Q60,82 72,70"); } /* High, wide, cute smile */
          svg.happy .eye-l { d: path("M32,60 Q38,50 44,60"); fill: none; stroke: #4a4a4a; stroke-width: 4.5; stroke-linecap: round; }
          svg.happy .eye-r { d: path("M76,60 Q82,50 88,60"); fill: none; stroke: #4a4a4a; stroke-width: 4.5; stroke-linecap: round; }
          svg.happy .eye-l-highlight, svg.happy .eye-r-highlight { display: none; } /* Hide sparkle when eyes are closed */
          
          svg.sad .ear-l { transform: rotate(-25deg); }
          svg.sad .ear-r { transform: rotate(25deg); }
          svg.sad .mouth { d: path("M54,75 Q60,68 66,75"); } /* Little frown */

          svg.thinking .ear-l { transform: rotate(-10deg); }
          svg.thinking .ear-r { transform: rotate(25deg); }
          svg.thinking .eye-l { transform: scale(0.85); }
          svg.thinking .mouth { d: path("M56,72 Q60,72 64,72"); } /* Straight mouth */
          svg.thinking .question-mark { opacity: 1; transform: translateY(0); animation: bounce 2s ease-in-out infinite; }

          svg.sleeping .eye-l, svg.sleeping .eye-r { transform: scaleY(0.15); }
          svg.sleeping .mouth { d: path("M58,73 Q60,71 62,73"); } /* Tiny O */
          svg.sleeping .ear-l { transform: rotate(-20deg); }
          svg.sleeping .ear-r { transform: rotate(20deg); }
          svg.sleeping .snot-bubble { opacity: 1; animation: breathe 3s ease-in-out infinite; }
          
          @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
          @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }
        </style>

        <!-- Question mark for 'thinking' mood -->
        <g class="question-mark">
          <text x="88" y="35" font-family="'Nunito', sans-serif" font-weight="800" font-size="28" fill="#a0a0a0">?</text>
        </g>

        <!-- Cute Round Ears - positioned to intersect head base perfectly -->
        <g class="ear-l">
          <path d="M25,50 C22,35 30,12 40,20 C45,24 50,35 48,45 Z" class="shiba-ears"/>
          <path d="M30,45 C28,35 34,22 40,26 C42,28 45,35 44,42 Z" class="shiba-light"/>
        </g>
        <g class="ear-r">
          <path d="M95,50 C98,35 90,12 80,20 C75,24 70,35 72,45 Z" class="shiba-ears"/>
          <path d="M90,45 C92,35 86,22 80,26 C78,28 75,35 76,42 Z" class="shiba-light"/>
        </g>

        <!-- Extremely Round Head Base -->
        <circle cx="60" cy="65" r="42" class="shiba-base"/>

        <!-- Cute Heart/M-shaped White Face Area -->
        <path d="M18,65 C18,48 40,55 60,60 C80,55 102,48 102,65 C102,90 85,107 60,107 C35,107 18,90 18,65 Z" class="shiba-light"/>

        <!-- Adorable Blush -->
        <ellipse cx="32" cy="74" rx="6" ry="3.5" class="shiba-blush" />
        <ellipse cx="88" cy="74" rx="6" ry="3.5" class="shiba-blush" />

        <!-- Large Cute Eyes (lower on face) -->
        <path d="M38,56.5 A5.5,5.5 0 1,0 38,67.5 A5.5,5.5 0 1,0 38,56.5" class="shiba-dark eye-l" />
        <path d="M82,56.5 A5.5,5.5 0 1,0 82,67.5 A5.5,5.5 0 1,0 82,56.5" class="shiba-dark eye-r" />
        
        <!-- Eye Highlights (Kawaii sparkle) -->
        <circle cx="36.5" cy="60.5" r="1.5" fill="#fff" class="eye-l-highlight" />
        <circle cx="80.5" cy="60.5" r="1.5" fill="#fff" class="eye-r-highlight" />

        <!-- Eyebrows (Soft white dots) -->
        <circle cx="38" cy="48" r="4.5" class="shiba-light" />
        <circle cx="82" cy="48" r="4.5" class="shiba-light" />

        <!-- Cute Little Round Snout -->
        <path d="M57,67 Q60,65 63,67 L60,70 Z" class="shiba-dark"/>

        <!-- Mouth -->
        <path d="M52,72 Q56,76 60,72 Q64,76 68,72" stroke="#4a4a4a" stroke-width="2.2" fill="none" class="mouth" stroke-linecap="round"/>

        <!-- Sleeping Snot Bubble -->
        <circle cx="70" cy="67" r="6" stroke="#c8c8c8" stroke-width="1.5" fill="#ffffff" opacity="0.6" class="snot-bubble" />
      </svg>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    .mascot-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .shiba-svg {
      width: 100%;
      height: 100%;
      max-width: 160px;
      max-height: 160px;
      overflow: visible;
      filter: drop-shadow(0 4px 6px rgba(0,0,0,0.05));
    }
  `]
})
export class MascotComponent {
  // Support either single string mood or a signal wrapping a string
  @Input()
  set mood(val: MascotMood | undefined) {
    this._mood.set(val || 'default');
  }

  // Use a signal internally so it's reactive
  protected _mood = signal<MascotMood>('default');

  // Computed property exposed to the template
  public readonly moodStr = computed(() => this._mood());
}
