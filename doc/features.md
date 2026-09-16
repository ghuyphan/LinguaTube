# Feature Specifications & Deep Dive

This document details the functional specifications, algorithms, and business logic governing each major feature in **Voca** (formerly LinguaTube).

---

## 1. Universal Video Player & Controls

### 1.1. URL Ingestion & Parsing
Voca accepts arbitrary YouTube video URLs:
- Standard: `https://www.youtube.com/watch?v=VIDEO_ID`
- Shortened: `https://youtu.be/VIDEO_ID`
- Embedded: `https://www.youtube.com/embed/VIDEO_ID`
- Timestamped URLs (`?t=120s`) automatically seek to the start offset.

### 1.2. Playback Architecture
- Powered by `YoutubeService`, wrapping the official YouTube IFrame Player API.
- Custom UI overlay replaces default YouTube player chrome, eliminating clutter and visual distractions.
- **Outside-Angular-Zone Time-Tracking**:
  `requestAnimationFrame(track)` runs outside the Angular Zone via `NgZone.runOutsideAngular(...)`, throttling signal emissions to ~6Hz and eliminating 60–120Hz macro-task churn.
- **Zero-Flash Resume**:
  Player initialization precomputes `startSeconds` and seeds `playerVars.start` and `player.loadVideoById({ videoId, startSeconds })`, eliminating the audible/visual 0:00 audio flash on player reuse.
- **Auto-Pause & Pause Locks (`acquirePauseLock`)**:
  When inspecting subtitle words or searching definitions, tokenized pause locks prevent YouTube IFrame state events from resurrecting playback. Background visibility changes reset leave flags so tab-switches don't cause persistent pause state.
- **Unified Course Context Switching (`LearningLanguageService`)**:
  - Modeled after top language learning applications (Duolingo, LingoDeer, Babbel), switching learning language acts as a full **Course Context Switch** rather than a passive settings toggle.
  - **Instant Overlay Dismissal**: Automatically closes open bottom sheets (`BottomSheetService.closeAll()`), settings drawers, sub-option pickers, and modal dialogs with zero manual taps.
  - **Multi-Domain State Teardown**: Completely purges in-progress flashcard reviews (`VocabularyService.requestStudyReset()`), resets the YouTube player, subtitles, and transcripts (`YoutubeService.reset()`, `SubtitleService.clear()`, `TranscriptService.reset()`, `VideoLevelService.reset()`, `PlayerViewService.reset()`), and clears stale dictionary queries/entries (`DictionaryService.clearScreenState()`).
  - **Home Navigation & Feed Refresh**: Automatically redirects to the Home video feed (`/video`) loaded with recommended videos and playlists tailored for the newly selected language.
  - **In-Video Mismatch Adoption**: When a video language mismatch prompt is confirmed (`skipNextMismatchDialog: true`), the player smoothly adapts to the video's authentic spoken language without navigating away, immediately re-fetching matching captions.
  - **Localized Toast Feedback**: Displays an instant confirmation toast (`settings.switchedToLanguage`) localized in the learner's active UI language.

### 1.3. Controls & Interaction Matrix
| Action | Desktop Shortcut | Mobile Gesture | UI Element |
| :--- | :--- | :--- | :--- |
| **Toggle Controls Overlay** | — | Single Tap (0ms dismiss when open) | Video container overlay |
| **Play / Pause** | `Space` or `k` | Single Tap Center Button | Center Play/Pause button |
| **Seek $\pm 10$s** | `j` / `l` or Arrows | Double Tap Left / Right Wings | Cumulative pill (`+10s, +20s`) & ripple |
| **Scrubbing Preview** | Hover progress bar | Horizontal Swipe Drag | OSD time delta pill (`-0:15 / 1:45`) |
| **2x Speed Fast-Forward** | — | Long-Press & Hold | OSD "2x Speed" indicator pill |
| **Volume Up / Down** | `Up` / `Down` arrows | Swipe Up / Down (Right side) | Bottom bar volume slider |
| **Toggle Subtitles** | `c` | Tap CC Button (Landscape/Fullscreen) | CC button in bottom bar |
| **Add to Playlist** | — | Tap Playlist Button (Portrait Mobile) | Add to playlist button (`list-plus`) in bottom bar |
| **Toggle Dual Subtitles** | `d` | Tap Languages Button | Languages button in bottom bar |
| **Dual Sub Menu** | Right-click Dual Sub | Long-Press Dual Sub Button | Quick language picker modal with circle flags |
| **Toggle Miniplayer** | `i` | Tap Minimize in Header | Miniplayer button in bottom bar / header |
| **Toggle Fullscreen** | `f` | Pinch Out / Rotate | Bottom bar fullscreen button |
| **Move Subtitle Top / Bottom** | `v` | Double-Tap Drag Handle | Fullscreen subtitle handle |
| **Nudge Subtitle Up / Down** | `[` / `]` | — | Fullscreen subtitle position |
| **Cycle Subtitle Size** | `Shift` + `s` | — | Subtitle font size toggle |
| **Playback Speed** | `Shift` + `<` / `>` | — | Speed dropdown (0.5x – 2x) |

### 1.4. YouTube-Style Miniplayer & Continuous Background Playback
Voca includes a persistent, non-destructive Picture-in-Picture Miniplayer governed by `PlayerViewService`:
- **Desktop Floating PiP Card**:
  - Automatically docks to the bottom-right (`bottom: 24px; right: 24px; width: 360px`) when minimized via shortcut (`i`), video header button, or sidebar navigation.
  - 16:9 video frame with clean `var(--border-radius, 16px)` corners and horizontal progress bar.
  - Hover overlay features dedicated YouTube-style controls: **Expand** (restore to watch page), **Close** (`x`), and **Play / Pause**.
  - Retains full visibility and functionality of the Spotlight URL bar and Desktop Vocab Card sidebar.
- **Mobile Floating Docked Bar**:
  - Floats smoothly above the bottom navigation bar (`bottom: calc(var(--bottom-nav-total-height, 4rem) + 8px)`).
  - **Blur Glass Aesthetic**: Uses frosted glassmorphic card styling (`rgba(var(--bg-card-rgb), 0.88)` with `backdrop-filter: blur(20px) saturate(180%)`) completely unified with the mobile bottom navigation bar.
  - **Responsive Margin & Width Alignment**: Horizontally matched with `.container` and the "For You" feed card (`left: max(var(--space-sm), env(safe-area-inset-left)); right: max(var(--space-sm), env(safe-area-inset-right))` on mobile, `max-width: 32rem` on tablets).
  - 16:9 thumbnail (`80px × 45px`) with `border-radius: var(--border-radius-sm, 12px)` and `var(--bg-tertiary)` background matching the exact thumbnail design of the "For You" feed.
  - Full-width integer 2px progress bar spanning the entire bottom of the card (`left: 0; right: 0; width: 100%`) with rounded bottom corners.
  - Tapping thumbnail or text expands player back to watch mode; dedicated touch buttons toggle playback and close.
- **In-Flow Layout & Feed Preservation Architecture**:
  - Eliminates top/bottom edge gaps and background scroll bleed by keeping the player, queue, and subtitles in clean, natural document flow while toggling the feed with `.hidden`.
  - Native browser scroll position is tracked via `@HostListener('window:scroll')` and restored atomically with a double-RAF loop when returning to the feed.
  - Skeletons and data wipe are completely eliminated by keeping loaded cards in memory during miniplayer transitions.
  - Video teardown resets playback state prior to layout view mode, eliminating rapid layout toggles and skeleton flashing.
- **Dedicated YouTube-Style Icons & Cache-Busting**:
  - **Miniplayer / Minimize (`miniplayer` / `chevron-down`)**: Responsive minimize icon displaying `chevron-down` on mobile watch header (matching native YouTube mobile app UX) and monitor `miniplayer` icon on desktop.
  - **Expand / Maximize (`expand`)**: Official YouTube watch page expand icon (open window frame with directional breakout arrow).
  - **Fullscreen (`fullscreen` / `fullscreen-exit`)**: Four corner brackets pointing outward (enter) / inward (exit).
  - **Versioned Cache Invalidation**: Automatic release version query param (`assets/icons/sprite.svg?v=${version}#icon`) with `xlink:href` attribute ensures instant mobile browser cache refresh upon new deployments.

### 1.5. Bottom-Anchored Draggable Fullscreen Subtitles (Netflix & YouTube Style)
When in fullscreen mode, subtitles are rendered in `FullscreenSubtitleComponent`:
- **Bottom-Anchored Baseline Expansion**: Anchored to the bottom (`transform: translate(-50%, -100%)` or `translate(-50%, 0)` when at the top) following industry standard Netflix and YouTube subtitle engineering. When line count changes, or when bilingual translations load, subtitles expand smoothly *upward* into the video frame rather than shifting both up and down, completely eliminating vertical visual jitter.
- **Computed `viewTokens` Pre-computation**: Subtitle tokens, reading annotations, display text, and vocabulary mastery levels are pre-calculated in a single `viewTokens = computed(...)` signal per cue change. This eliminates repeated O(N) vocabulary repository method calls and grammar index scans in `@for` template loops during 60fps fullscreen video playback.
- **Ergonomic Drag Handle & Free Placement**: A centered pill handle bar with a generous touch hit box ($\ge 32\text{px}$) allows users to drag subtitles smoothly to any vertical position (`--sub-y: 8%` to `88%`). Micro-jitter protection requires a $>8\text{px}$ movement threshold before committing drag motion, while taps on the handle toggle between top and bottom.
- **Smooth Pointer Capture**: Uses `PointerEvent` tracking with `requestAnimationFrame` updates to ensure 60fps responsiveness across mobile and desktop. Dragging is completely free without forced snapping locks.
- **Natural Lower Resting Position**: Subtitles default to `84%` height, sitting naturally near the bottom edge without floating excessively high.
- **Instant Top/Bottom Toggle**: Tapping the handle bar (or pressing `v`) toggles between the top anchor (`12%`) and bottom anchor (`84%`).
- **No Jump Discontinuity**: Subtitle position stays completely stable regardless of whether player controls are shown or hidden.
- **Mobile Landscape & Safe-Area Optimization**:
  - Employs `@media (max-height: 520px) and (orientation: landscape)` queries for proportional typography, preventing subtitles from blocking the video frame on phones.
  - Adheres to `env(safe-area-inset-left)` and `env(safe-area-inset-right)` for notched displays.
  - Desktop widescreen constraint caps max width at `min(90%, 960px)` for comfortable eye scanning.
- **Full Dictionary Parity in Fullscreen**:
  - Interactive words tap directly into `WordPopupComponent`, providing full definitions, definition translations, vocabulary mastery level picking, and audio pronunciation without leaving fullscreen mode.
  - Touch and click event isolation prevents touches on words, punctuation, or card background from inadvertently toggling player controls or pausing playback.

### 1.5. Unified Player Settings Sub-Panels & Sleep Timer
The video player settings popover (`video-player.component.html`) provides dedicated, structured sub-panels for all player options:
- **Sleep Timer**: Flexible bedtime playback scheduler supporting durations of `10`, `15`, `30`, `45`, `60` minutes, or `End of video`. Displays a live countdown indicator in the settings row, automatically pauses playback when time expires, notifies the user via an accessible toast, and cleans up timers on video change or component destroy.
- **Playback Speed**: Preset speed multipliers (0.5x to 2x) with active checkmarks.
- **Subtitle Font Size**: Responsive font sizing (`small`, `medium`, `large`, `xlarge`) with active checkmarks.
- **Dual Subtitles**: Target language selection with language flags and checkmarks.
- **Reading Display (Furigana / Pinyin / Romanization)**: Dedicated sub-panel allowing instant switching between Native (Off), Annotated Reading (Furigana for JA, Pinyin for ZH, Romanization for KO), and Romaji (for JA) with active checkmarks and typographic script glyph badges.
- **Grammar Highlights**: Dedicated sub-panel allowing clean On / Off toggling with active checkmarks.
- **Fullscreen Context Adaptation**:
  - Keyboard shortcuts row is intelligently hidden when the player is in fullscreen mode (`!isFullscreen()`), avoiding modal overlay confusion.
  - Quick actions like "Share video" and "Save to playlist" are automatically omitted in standard non-fullscreen view (where external action buttons already exist in the video header) and cleanly rendered inside the settings menu exclusively when in fullscreen mode.
- **Ergonomic Submenu Transitions**: All sub-panels share consistent back header buttons (`chevron-left`), sub-panel routing (`playerSettingsView`), and dynamically animated container heights via `SmoothHeightAnimator`.

---

## 2. Interactive Subtitles & Tokenization Engine

### 2.1. Sticky Subtitle Synchronization Algorithm
Standard subtitle displays flicker or disappear during small natural pauses in speech. Voca implements a **Sticky Subtitle** algorithm:
1. Performs an $O(\log n)$ binary search (`findActiveCue`) to find the cue matching `currentTime`.
2. If no active cue matches (e.g. natural brief speech pause), `findStickyCue` locates the most recent ended cue within a $0.1$s tolerance window.
3. **Silent Scene & Musical Interlude Guard**: To prevent subtitles from freezing on screen during long instrumental breaks, scene transitions, or silent pauses, `findStickyCue` enforces a strict $2.0$s gap threshold (`time - subs[result].endTime > 2.0`). If the gap exceeds 2.0 seconds, the sticky cue clears automatically.
4. The cue remains visible until the next subtitle segment begins or playback advances beyond the 2.0s threshold.

### 2.2. Morphological Tokenization & Phonetics
Subtitles are segmented into interactive tokens using language-specific NLP:
- **Japanese (`ja`)**:
  - Analyzed by `@patdx/kuromoji` using IPAdic dictionaries loaded on demand via CDN.
  - Generates token surface forms, base dictionary forms, parts of speech, and Hiragana readings.
  - **Okurigana Ruby Segmentation (`segmentJapaneseRuby`)**: Multi-kanji words with trailing okurigana (e.g. `食べる` with reading `たべる`, `美しい` with reading `うつくしい`) are segmented into distinct stem and kana parts (`{ text: '食', reading: 'た' }, { text: 'べる' }`). Kanji stems receive their authentic phonetic ruby annotations while trailing okurigana are rendered with an empty spacer `<rt class="rt-empty">&#160;</rt>`, preventing ruby text from stretching across kana endings.
  - **5 Reading Display Modes**:
    1. `native`: Clean Japanese script.
    2. `annotated`: Ruby Furigana (`<ruby>漢<rt>かん</rt></ruby>`).
    3. `reading`: Kana reading only.
    4. `annotatedRomanized`: Kanji with Hepburn Romaji annotations.
    5. `romanized`: Hepburn Romaji only.
  - **Height & Baseline Alignment (Zero-Shift Ruby)**: When reading annotations are enabled, non-kanji words AND punctuation tokens (`、`, `。`, `,`, `.`, `...`) are wrapped in `<ruby>` with an invisible spacer `<rt class="rt-empty">&#160;</rt>`. Both active readings and empty spacers have their height strictly locked to `height: 1.15em; line-height: 1.15;` alongside standardized `vertical-align: baseline` and 1px transparent borders. This guarantees 100% identical token heights, mathematically consistent line-boxes, and uniform baseline alignment across all words and punctuation, eliminating vertical misalignment and jagged baseline jumps across Japanese, Chinese, Korean, and English. Top-anchoring in `.subtitle-center-wrapper` additionally prevents vertical jitter when switching between 1-line and 2-line cues.
- **Chinese (`zh`)**:
  - Segmented using `Intl.Segmenter('zh', { granularity: 'word' })`.
  - Pinyin annotations generated via `pinyin-pro` with tone diacritics (e.g. `nǐ hǎo`).
- **Korean (`ko`)**:
  - Space-delimited and segment-analyzed via `Intl.Segmenter('ko')`.
  - Romanization computed using `hangul-romanization`.
- **English (`en`)**:
  - Segmented into word tokens and punctuation boundaries via `Intl.Segmenter('en')` and enhanced with `compromise` NLP.
  - Morphological tagging provides Part-of-Speech (`partOfSpeech`) and root lemmatization (`baseForm`), aligning English tokens with Japanese and Korean morphological capabilities.
  - **Contraction & Offset Synchronization**: Handles English contractions (`"don't"`, `"we'll"`, `"I'm"`) via character span and surface offset matching rather than naive 1-to-1 term mapping, preventing token offset desynchronization and ensuring subsequent tokens align accurately with original sentence text.
  - Everyday words, pronouns, articles, and contractions (`I`, `the`, `a`, `don't`) are strictly protected from grammar false positives, keeping words cleanly clickable for dictionary lookups and flashcard saving.
  - CEFR grammar patterns (compound tenses, modal perfects, phrasal modals, correlatives) detected with clean token ranges excluding spaces and punctuation, highlighted with vibrant mint teal accents and underlines (`.word--grammar`).
- **Bulk Batch Tokenization & Zero Playback Overhead**:
  - `SubtitleService` processes subtitle cues in bulk batches of up to 800 texts on initial video load. For virtually all videos ($\le 800$ cues), the entire video requires **only 1 API call**.
  - No network requests are made during video playback; time updates use $O(\log n)$ binary search over cached cues.
  - Forward's the user's Supabase auth token to access higher rate limit tiers (150–2,000 req/hr).
- **Client Fallback Tokenizer & 429 Circuit Breaker**:
  - If network requests to backend tokenization endpoints fail, hit a 429 rate limit, or operate offline, `SubtitleService` immediately triggers a circuit breaker and falls back to client-side tokenization powered by native ECMAScript `Intl.Segmenter('zh')` and `Intl.Segmenter('ko')` or Japanese character splitting.
  - The circuit breaker prevents cascading 429 errors in the console by suppressing subsequent backend calls for the duration of the `Retry-After` window.

### 2.3. Subtitle Customization & Vocabulary Highlighting
- **Four Size Modes**: `small`, `medium`, `large`, and `xlarge`, dynamically responsive across mobile, tablet, and desktop layouts.
- **Vocabulary Mastery Indicators**: Interactive subtitle words reflect mastery state (`word--new`, `word--learning`, `word--known`) in both standard list/banner and fullscreen overlays.
- **Distinct Grammar Pattern Highlights**: Tokens matching active grammar patterns are styled with a crisp mint/emerald green underline palette (`var(--color-grammar, #2dd4bf)` in dark mode, `#10b981` in light mode, with subtle translucent tint background), preserving word text legibility and separating grammar rules cleanly from red/new, amber/learning, and blue/known vocabulary levels without harsh box borders. In fullscreen mode, grammar tokens use a subtle, faint dotted underline without any background box to preserve cinematic video immersion.
- **Streamlined Subtitle Waiting & Dual Translation States**: Both the primary subtitle waiting state and the secondary dual-sub translation loading state feature minimal 3-dot pulsing animations (`···`) without textual clutter, eliminating clunky skeleton boxes, nested pill artifacts, and harsh borders.
- **Auto-Scroll & Manual Override**: Active cue autoscrolling pauses during user interaction (3s debounce) to ensure smooth browsing of full transcripts.

---

## 3. Gladia AI Transcription Fallback

When a YouTube video lacks native captions in the learner's target language:

```mermaid
graph TD
    A[Native Captions Missing] --> B[Display 'Generate with AI' Button]
    B --> C[User Solves Cloudflare Turnstile CAPTCHA]
    C --> D[Verify Diamond Credit Balance & Tier Duration]
    D --> E[Reserve Atomic Lock in D1 'ai_transcription_jobs']
    E --> F[Server Submits Audio to Gladia v2 with Callback URL]
    F --> G[Return Opaque jobId to Client < 1.5s]
    
    subgraph PrimaryChannel["Primary Ingestion Channel (Webhook)"]
        F -.->|Async Audio Processing| GW[Gladia Finishes Transcription]
        GW -->|POST /api/gladia-webhook| WH[Edge Webhook Handler]
        WH -->|Sub-40ms HTTP 200| GA[Acknowledge Delivery]
        WH -->|context.waitUntil| BG[Parse Cues, Commit to R2, Mark D1 Completed]
    end
    
    subgraph FallbackChannel["Client Lifecycle & Self-Healing Channel"]
        G --> AJ[AiJobManagerService Background Tracker]
        AJ -->|Progressive 4s-8s Poll| DB[Query D1 by jobId]
        DB -->|Completed in R2?| RENDER[Apply Interactive Subtitles]
        DB -->|Webhook Delayed > 15s| SH[Worker Self-Heals Directly via Gladia API]
        SH --> RENDER
    end

    BG -.->|State: failed| REFUND[Atomic Diamond Refund via Supabase (profiles)]
    SH -.->|State: failed| REFUND
```

- **Zero-URL Client Exposure**: The client interacts strictly via opaque `jobId` handles (`job_1726325987000_abc123`). Upstream Gladia endpoints, API keys, and internal results are never leaked to client browsers.
- **Dual-Authentication Webhook (`/api/gladia-webhook`)**:
  - **Svix HMAC-SHA256**: Validates official Gladia webhook headers (`svix-id`, `svix-timestamp`, `svix-signature`) using `GLADIA_WEBHOOK_SECRET` with 5-minute replay tolerance.
  - **Derived HMAC Token Fallback**: Supports `?token=...` query token calculated from `GLADIA_API_KEY` for zero-downtime operation.
  - **Sub-40ms Acknowledgment**: Acknowledges delivery immediately and processes JSON parsing and Cloudflare R2 uploads asynchronously within `context.waitUntil()`.
- **Mobile Screen Sleep & Tab Switch Resilience (`AiJobManagerService`)**:
  - Mobile browsers (iOS Safari, Android Chrome) pause JS timers when screens lock or apps switch to background.
  - Voca attaches `document.visibilitychange` and `window.addEventListener('online')` listeners to instantly resume status verification the millisecond the screen is unlocked or network reconnected.
- **Non-Blocking User Experience**:
  - Learners can freely navigate away to browse other videos, practice vocabulary flashcards, or look up words while transcription proceeds in the cloud.
  - Upon completion, a route-aware toast notification alerts the user ("Subtitles ready for [Video Title]! Tap to apply") with an instant 1-tap navigation CTA.
- **Atomic Lock Reservation & Anti-Double-Billing**:
  - Cloudflare D1 `ai_transcription_jobs` implements a SQLite partial unique index (`WHERE status IN ('queued', 'processing')`).
  - Concurrent requests from multiple tabs or duplicate button taps are atomically deduplicated at the database layer, completely eliminating double-charging.
- **Automated Idempotent Diamond Refund**:
  - If Gladia fails, times out, or reports no detectable speech, `atomicFailAndRefundAiJob` atomically marks the job as `failed` and triggers `refundDiamond()` via Supabase REST API (using `SUPABASE_SERVICE_ROLE_KEY`). The transaction guard ensures diamonds can never be refunded more than once.
- **Duration Limits & Cost Scaling**:
  - Free/Guest: Max 10 minutes (600s)
  - Pro: Max 20 minutes (1,200s)
  - Premium: Max 45 minutes (2,700s)
  - $\le 10$ minutes: **1 Diamond credit**
  - $> 10$ to $20$ minutes: **2 Diamond credits**
  - $> 20$ to $35$ minutes: **3 Diamond credits**
  - $> 35$ to $45$ minutes: **4 Diamond credits**

---

## 4. Dual-Language Subtitles

- Displays the **learning language** on top and the learner's **target translation language** underneath.
- **Supported Learning Languages**: Japanese (`ja`), Chinese (`zh`), Korean (`ko`), and English (`en`).
- **Supported Target Languages**: English (`en`), Vietnamese (`vi`), Japanese (`ja`), Korean (`ko`), Chinese (`zh`).
- **Centralized Orchestrator (`SubtitleService`)**: Single root singleton managing dual-sub state, in-memory cache, lazy loading batches, and subscriptions. Prevents desync between the video player overlay and subtitle list.
- **Dynamic UI Locale Synchronization**: Dual subtitle target language dynamically syncs with the application UI language (`i18n.currentLanguage()`). If the user changes UI language, dual subtitles automatically update without requiring manual re-selection.
- **Consolidated Controls**: The redundant dual subtitle toggle switch in the subtitle display options sheet has been removed in favor of the primary player bottom-bar controls and player settings menu.
- **Dual Display Surfaces**:
  - **Video Overlay / Fullscreen**: Rendered dynamically within the active video player container.
  - **Scrollable Subtitle List (`.subtitle-list`)**: Each cue item (`.cue-item`) displays both primary text (`.cue-text`) and translated text (`.cue-translation-text`) in vertical stack (`.cue-body`), featuring a calm Voca spotlight highlight, refined left indicator bar, and continuous fluid centering auto-scroll.
- **Dynamic Subtitle Language Detection (`detectSubtitleLanguage`)**: Subtitle cues are sampled using Unicode character block analysis (`\p{Script=Han}`, `\p{Script=Hiragana}`, `\p{Script=Hangul}`) to accurately determine the authentic video subtitle language. This prevents mismatches when user settings language differs from video subtitle language.
- **Source/Target Inversion Prevention**: Target language selection strictly avoids collision with the active subtitle language, falling back to the user's interface language or alternate language to ensure translations are never identical to the source.
- **Cache-First & Progressive High-Speed Batch Translation**:
  - **Tier 0 (On-Device Hardware Translation)**: If the client browser supports Chrome Built-in AI / W3C `Translator` API (`self.Translator`, `self.translation`, or `self.ai.translator`), translations run entirely on-device with zero network latency, instant bilingual cue availability, and complete user privacy.
  - **Tier 1 (IndexedDB Local)**: Checks client IndexedDB (`lingua-tube-cache`) first for instant 0ms offline-ready bilingual subtitles.
  - **Tier 2 (Cloudflare R2 Edge)**: Checks server/R2 cache (`onlyCache: true`) without requiring segment payloads. If present, returns full bilingual transcript in ~50ms.
  - **Tier 3 (Two-Tier JIT Streaming with Immediate Micro-Batching < 200ms)**: On cache miss, immediately translates the active cue and 2 lookahead cues in an ultra-fast urgent micro-batch (`high` priority, ~100–200ms) to provide instantaneous translations without stalling playback. The remainder of the rolling window is streamed in batches of 40–60 cues. If the user skips or seeks in the video, in-flight background requests are preempted immediately to deliver instantaneous translations for the new playhead.
  - **100% Full-Transcript Background Streaming with Circuit Breaker**: Instead of stalling after the initial window, `SubtitleService` continuously streams and translates remaining cues across the entire video in gentle, staggered background batches (600ms stagger) with exponential backoff and circuit-breaking on rate limits (429/503), until 100% of the video's transcript is translated and stored in local IndexedDB and Cloudflare R2 crowd-cache.
  - **Adaptive Subtitle Container Display & Zero-Shift Stabilization (Zero-CLS Architecture)**:
    - Responsive subtitle boxes dynamically scale their height from 11.5rem (`has-dual-subtitles`) with `word-break: break-word` and smooth scrolling to accommodate multi-line ruby annotations and dual translation text without clipping.
    - Top-anchored layout (`margin: 0 auto; justify-content: flex-start;`) strictly eliminates Cumulative Layout Shift (CLS) as asynchronous translations stream in below the primary cue.
    - Pre-allocates a fixed two-line bounding box for `.subtitle-translation-wrapper` (`calc(font-size * 2.8 + 6px)`) across all font sizes, ensuring translation loading (dots), 1-line translations, and 2-line translations occupy the exact same vertical space, preventing the learning subtitle above from jumping up and down.
    - Subtitle list rows utilize `.cue-translation-skeleton` to pre-allocate height while translations are fetching, eliminating transcript list scroll jumping.
    - Fullscreen subtitles utilize bottom-anchored upward expansion with a locked 2-line translation wrapper and empty fallback placeholder, ensuring zero text displacement during playback.
- **3-Tier Intelligent Speech Segmentation for CJK & Latin**:
  - Raw ASR output from Gladia or auto-generated YouTube captions frequently lacks punctuation, producing monolithic 15–30s cues that overwhelm learners.
  - **Tier 1 (Sentence Boundary Splitting)**: Detects standard terminal sentence punctuation (`。！？.!?`) with lookahead whitespace and quotation handling.
  - **Tier 2 (CJK Discourse Markers & Grammatical Particles)**: In unpunctuated Chinese and Japanese speech, splits at conjunctions and discourse particles (`而且|但是|所以|然后|因为|就是|可是|不过|虽然|那么` / `は|が|を|に|で|へと|から|まで`) while enforcing minimum duration ($\ge 1.0$s) and character lengths.
  - **Tier 3 (Soft Length Clamping)**: If a segment exceeds natural reading length (20–22 CJK characters or 60 Latin characters), cleanly segments at word boundaries or natural phrase pauses.
- **Subtitle Track Picker & On-Demand AI Target Generation**:
  - The video header provides a subtitle track selector button and bottom sheet displaying all available native caption tracks and AI-generated tracks.
  - **Speech-to-Text Waveform Caption Icon (`subtitles-ai`)**: Distinguishes AI-generated transcripts from native YouTube captions (`subtitles`) using a speech-recognition audio waveform icon rather than generic sparkle symbols.
  - When an AI track is actively playing, the header track button and player bottom-bar CC toggle dynamically render the `subtitles-ai` icon with a diamond-accented active bar indicator (`var(--color-diamond)`).
  - Inside the Subtitle Tracks sheet, native tracks display `[CC]` (`subtitles`), while AI-transcribed tracks display `[Waveform]` (`subtitles-ai`) and an `AI` pill badge.
  - If the user's active learning language has no existing subtitles, a prominent "Generate AI Subtitles" action allows transcribing in their target language without leaving the player.
- **AI Job State Resiliency & Offline Reconnect**:
  - In-flight AI transcription jobs are persisted in `localStorage` (`voca_pending_ai_jobs`) and indexed in Cloudflare D1 `pending_jobs`.
  - Refreshing the page, switching tabs, or temporarily losing network connectivity automatically resumes polling without double-spending Diamond credits or abandoning processing jobs.
- **Dual Subtitle Self-Healing & Fuzzy Proximity Alignment**:
  - Cues are mapped to cached bilingual segments via timestamp proximity ($\pm 0.8$s) and text equality rather than brittle array index positions.
  - If a cached dual subtitle transcript has partial coverage ($<80\%$) or contains missing cues, the client automatically triggers background translation of missing lines during playback without causing infinite loading spinners.
  - Checkpoints are saved when $\ge 10$ newly translated cues are repaired, writing healed transcripts back to Cloudflare R2 and IndexedDB.
- **Incremental Crowd-Cache Merging**:
  - Instead of requiring an all-or-nothing 80% full watch in a single sitting, `SubtitleService` writes checkpoints to Cloudflare R2 and IndexedDB (every 10–20 newly translated cues or on video pause/switch), merging incoming translated segments into existing R2 files using fuzzy text and timestamp proximity matching.
  - Multiple users watching different parts of the same video collectively build the full dual-subtitle cache without burning translation quotas.
- **Translation Anti-Poisoning & Infinite-Loop Prevention**:
  - Failed translation requests return `null` rather than falling back to untranslated source text, ensuring failed cues can be retried and self-healed rather than poisoned with blank strings.
  - In-memory subtitle tracking marks all processed cues (including identical and empty) as resolved to completely eliminate infinite network retry loops on short words, sound effects, or numbers.
  - LocalStorage and R2 caches automatically sanitize and reject entries where `source !== target` but `translation === sourceText`.
  - UI templates (`subtitle-display`, `fullscreen-subtitle`) enforce equality guards (`translation.trim() !== cue.text.trim()`) to prevent rendering duplicate identical lines.
- **Permanent Caching & Long Video Support**: Successful translations are saved to Cloudflare R2 (`translations/{videoId}/{sourceLang}-{targetLang}.json`) and indexed in D1. Supports long videos with over 1,000 cues without payload truncation.
- **Track & Language Switch Reactivity**: Tracks changes in subtitle track (`cues`), source language, and target language, cleanly re-initializing dual subtitles when switching between native and Whisper AI captions or changing language tracks.
- **Dual Subtitle Session Isolation & Leak Prevention**: Employs a strictly monotonic session counter (`currentDualSessionId`) and proactive batch cancellation (`cancelAllBatchRequests()`). When the user toggles off dual subtitles, skips tracks, or navigates away, in-flight HTTP requests and staggered background timers are terminated instantly, completely preventing waterfall translation leaks, wasted bandwidth, and race conditions where late translations from a prior video could overwrite current cues.
- **Persistent Preferences**: Dual subtitle toggle state and target language preference persist across browser sessions in `localStorage`. Enabled by default (`showDualSubtitles: true`) to provide learners with an immediate immersive bilingual experience upon opening any video.

---

## 4.1. Video Proficiency Leveling & Linguistic Assessment

`VideoLevelService` categorizes videos into standard language proficiency frameworks:
- **Japanese**: JLPT N5 (Beginner) $\rightarrow$ N1 (Advanced)
- **Chinese**: HSK 1 (Beginner) $\rightarrow$ HSK 6 (Mastery)
- **Korean**: TOPIK 1 (Beginner) $\rightarrow$ TOPIK 6 (Advanced)
- **English**: CEFR A1 (Beginner) $\rightarrow$ CEFR C2 (Mastery)

### Cascading Hybrid Assessment Pipeline:
1. **Discovery Time (Server / D1 Fast-Path - 0ms)**:
   - When videos are fetched or indexed via `/api/video-info` or `/api/transcript`, regex heuristics scan title and channel text for standard exam codes (`JLPT N3`, `HSK 2`, `TOPIK 4`, `CEFR B2`) as well as native learning keywords (`初級`, `中級`, `上級`, `초급`, `중급`, `고급`, `初级`, `高级`, `Beginner`, `Intermediate`, `Advanced`).
   - Stored in Cloudflare D1 `video_languages.levels` (`{ ja: "JLPT N4" }`) with zero KV writes and returned directly in transcript metadata.
   - The video UI immediately resolves the level badge in **0ms** without waiting for full transcript tokenization to finish.
2. **Playback Time (Client Deep Linguistic Evaluation with Stratified Sampling)**:
   - Evaluated asynchronously without blocking video playback or initial subtitle display.
   - **Stratified Cue Sampling**: Instead of iterating over 1,000+ cues on the main UI thread, `VideoLevelService` takes a stratified sample of 50 cues evenly distributed across the beginning, middle, and end of the video, cutting regex evaluations from 20,000+ to ~500 (<15ms) with zero UI stutter.
   - **Unified 3-Factor Composite Score**:
     $$\text{Composite Score} = 0.45 \times \text{Grammar} + 0.40 \times \text{Vocab/Kanji} + 0.15 \times \text{Speech Rate}$$
     - **Grammar Pattern Density (45%)**: Scans cue tokens against curated language databases (`grammar-ja.ts`, `grammar-ko.ts`, `grammar-zh.ts`, `grammar-en.ts`).
     - **Vocabulary & Kanji Complexity (40%)**: Analyzes kanji density, kango multi-kanji compounds, Chinese 4-character idioms (Chengyu), word length distributions, and advanced lexical tiers.
     - **Speech Rate (15%)**: Measures spoken characters per minute (CPM) or words per minute (WPM), applying speed penalties/bonuses for rapid native speech (>280 CPM).
3. **Protected D1 Write-Back (`POST /api/video-level`)**:
   - The client reports the computed level with confidence score (`confidence >= 0.65`).
   - The backend validates the payload and prevents lower-confidence client submissions from overwriting verified levels in D1.

---

## 5. Multi-Source Hybrid Dictionary

When a learner clicks any subtitle word token, `DictionaryService` queries `/api/dict`:

```
                 ┌────────────────────────────────┐
                 │       LEARNER CLICKS WORD      │
                 └───────────────┬────────────────┘
                                 │
                      Query /api/dict Endpoint
                                 │
      ┌──────────────────────────┼──────────────────────────┐
      ▼                          ▼                          ▼
 [ JAPANESE ]               [ CHINESE ]                [ KOREAN ]
 Jotoba API (primary)       MDBG Scraper               Naver Dict EnKo / KoVi
 Jisho.org (fallback)       Glosbe Chinese-Vietnamese  KRDict (National Inst)
 Mazii (Vietnamese)
      │                          │                          │
      └──────────────────────────┼──────────────────────────┘
                                 │
                    No Direct Bilingual Match?
                                 ▼
                 English Definitions + Google GTX Fallback
                                 ▼
                     Normalized DictionaryEntry
```

- **Streamlined 2-Tier Resilient Pronunciation Audio**: Audio playback uses a robust 2-tier pipeline via `AudioService`:
  - **Tier 1 (Online Primary)**: Studio-grade Unified Neural TTS (`/api/tts`) streaming Azure Neural voices (`Nanami`, `Xiaoxiao`, `SunHi`, `Jenny`) with 0 KV operations, persistent warm WebSocket connection pooling (~180–250ms response time), bounded in-memory LRU caching (<0.1ms replay), client-side Blob URL caching, proactive preloading, and automatic server-side Google TTS failover (>99.5% reliability with zero client CORS issues).
  - **Tier 2 (Offline Fallback)**: Native Web Speech API (`speechSynthesis`) offline fallback ensuring 100% pronunciation reliability even when disconnected or in airplane mode.
  - **Fast Failover**: Tight 3,500ms failsafe timeout guarantees instant, seamless degradation without user-perceptible freezing.
- **Word Popup & Dictionary Pronunciation**: Interactive subtitle taps open `WordPopupComponent`, featuring a native one-touch audio pronunciation button with animated soundwave indicators. Audio is proactively pre-fetched in the background the moment the popup opens, providing instantaneous (0ms) playback on tap. Similarly, all dictionary search cards feature one-touch audio pronunciation.
- **Context-Aware CJK Kanji Detection**: When inspecting pure ideographs (`\u4E00-\u9FFF` without Kana or Hangul), `DictionaryService.detectLanguage()` checks the user's active learning language (`settings.language`) so Japanese learners query Japanese dictionaries (Jotoba/Mazii) rather than erroneously defaulting to Chinese dictionaries.
- **Isolated Screen State**: Standalone dictionary searches are decoupled from in-video subtitle clicks, ensuring subtitle queries never leak into or overwrite standalone search history or panels.
- **Multi-Entry Disambiguation**: When queries match multiple dictionary entries or homonyms, tabbed selectors allow learners to explore all matching entries.
- **Integrated Grammar Detection**: Searching words or grammatical stems also queries `GrammarService` to surface relevant grammar patterns, formation rules, and example sentences directly beneath definitions.
- **Word Popup UI (`WordPopupComponent`) & Smooth Height Transitions**: Hosted within `BottomSheetComponent`. When the popup opens, an initial shimmer skeleton renders instantly. As soon as dictionary definitions, translations, or example sentences resolve, the bottom sheet animates its height smoothly with the Web Animations API, eliminating jarring layout jumps.
- **Negative Caching**: Empty results are cached in an in-memory `Set` to prevent hammering external dictionary APIs.
- **In-Memory Cache with Debounced Persistence**: `DictionaryService` stores cached entries in a fast in-memory `Map<string, DictionaryEntry[]>` for synchronous zero-latency lookups during video playback. Cache updates are debounced by 2000ms before flushing to `localStorage`, eliminating repeated synchronous JSON serialization and disk I/O bottlenecks during rapid word browsing.
- **Persistence**: Results cached in Cloudflare KV for 7 days, with language-scoped local search history (`linguatube_recent_searches_${lang}`).

---

## 6. Grammar Pattern Detection Engine

`GrammarService` continuously inspects tokenized sentences to identify grammatical constructions using a multi-strategy morphological and syntactic matching pipeline:
- **Language Coverage**:
  - **Japanese**: 828 patterns across JLPT N5 through N1 (`grammar-ja.ts`).
  - **Korean**: 744 patterns across Korean levels 1 through 6 (`grammar-ko.ts`).
  - **Chinese**: 691 patterns across HSK 1 through 6 (`grammar-zh.ts`).
  - **English**: 143 patterns across CEFR A1 through C2 (`grammar-en.ts`).
- **Multi-Strategy Detection Pipeline**:
  - **Strategy 1: Exact Token Sequences**: Scans n-gram token windows (1 to 5 tokens for CJK, up to 8 tokens for EN).
  - **Strategy 1b: Korean Sequence Suffixes**: Matches attached verb-noun auxiliary sequences (e.g. `읽는 김에` $\rightarrow$ `~는 김에`, `도착했기 때문에` $\rightarrow$ `~기 때문에`, `할 리가 없다` $\rightarrow$ `~ㄹ 리가 없다`).
  - **Strategy 2: Morphological Suffix Matching (JA & KO)**:
    - **Japanese**: Checks `jaEndingPatterns` (sorted longest-first) and base forms (`baseForm`) for verbs/adjectives.
    - **Korean**: Checks `koEndingPatterns` (sorted longest-first) for attached particles (`이/가`, `은/는`, `을/를`, `에`, `에서`, `(으)로`, `(이)랑`) and conjugated verb endings (`-고`, `-아/어서`, `-면`, `-아/어요`, `-ㅂ니다/습니다`, `-네요`, `-지요`).
  - **Strategy 3: Korean Compound Auxiliary Verbs**:
    - Uses Hangul syllable math (`(charCode - 0xAC00) % 28 === 8` for final consonant `ㄹ`) to detect potential structures `(으)ㄹ 수 있다/없다` across multi-token spans.
    - Accurately detects `~고 있다` (progressive), `~고 싶다` (desire), `~지 않다` (negation), `~아/어야 하다` (obligation), and `~아/어 보다` (attempt).
  - **Strategy 4: Split Correlative Pairs**:
    - **Chinese**: `虽然...但是`, `因为...所以`, `如果...就`, `越...越`, `一边...一边`, `不但...而且`, `除了...以外`, `是...的`, `既然...就`, `只要...就`, `只有...才`, `即使...也`, `哪怕...也`, `与其...不如`, `既...又`, `不仅...而且`.
    - **English**: `not only...but also`, `neither...nor`, `either...or`, `both...and`, `so...that`, `such...that`, `as...as`, `too...to`, `no sooner...than`, `hardly...when`.
- **Intelligent Normalization & Indexing**:
  - Automatically strips pedagogical Latin placeholders (`N`, `V`, `M`, `Adj`, `A`, `B`, `AGE`) from Chinese, Japanese, and Korean rules.
  - Normalizes ASCII and CJK tildes (`~`, `～`, `〜`), expanding parentheses and slash alternatives.
  - Indexes English contractions (`isn't`, `aren't`, `don't`, `doesn't`, `I'm`, `you're`) and core grammatical words.
- **Dynamic Translation Packs**:
  Grammar definitions are translated across 16 combinations (JA, KO, ZH, EN into VI, ZH, KO, JA) plus native-to-native explanations (`ja_ja`, `ko_ko`, `zh_zh`).
- **Grammar Popup UI (`GrammarPopupComponent`)**: Hosted inside `BottomSheetComponent` with smooth dynamic height transitions as users explore formation rules, alternative explanations, or translated example sentences.

---

## 7. Spaced Repetition (SRS) Vocabulary Notebook

Saved vocabulary items follow the **SuperMemo-2 (SM-2)** algorithm, enhanced with sentence mining, audio pronunciation, and authentic video immersion.

### 7.1. SM-2 Algorithm Formulation & Interval Previews
When a user reviews a flashcard and provides a recall quality score $q \in [0, 5]$:

1. **Repetitions & Interval ($I$)**:
   $$\text{If } q < 3: \quad \text{repetitions} = 0, \quad I = 0 \text{ days} \ (\text{immediate recycle}), \quad \text{status} = \text{new}$$
   $$\text{If } q = 3 \ (\text{Hard}): \quad I = \max(I + 1, \; \lfloor I \times 1.2 \rfloor), \quad \text{status remains } \text{learning}$$
   $$\text{If } q > 3 \ (\text{Good/Easy}): \quad \begin{cases} I_1 = 1 \text{ day} & \text{if repetitions} = 0 \\ I_2 = 6 \text{ days} & \text{if repetitions} = 1 \\ I_n = \lceil I_{n-1} \times EF \rceil & \text{if repetitions} \ge 2 \end{cases}$$

2. **Ease Factor ($EF$)**:
   $$EF' = \max(1.3, \; EF + (0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02)))$$

3. **Status Transitions**:
   - `new` $\rightarrow$ `learning` on first successful recall ($q \ge 3$).
   - `learning` $\rightarrow$ `known` once `repetitions >= 3` and recall quality was confident ($q \ge 4$). Hard ratings ($q = 3$) preserve the `learning` stage to ensure sufficient reinforcement before graduation.

4. **Interval Preview Badges on Buttons**:
   - Using `calculateSRSPreview()`, answer buttons preview their exact calculated schedule in real time:
     - **Again (1)**: `<10m`
     - **Hard (2)**: `1d`
     - **Good (3)**: e.g. `3d` or `6d`
     - **Easy (4)**: e.g. `6d` or `2w`

### 7.2. Session Queue Recycling & Intuitive Completion Flow
To guarantee true memory retention, cards rated "Again" ($q < 3$) are **re-queued at the end of the current session**. The session only concludes when all cards have been successfully recalled, eliminating the frustration of ending a session with failed items left unreinforced.

Upon session completion, learners are greeted with celebration confetti and a clear, frictionless exit hierarchy:
- **Primary "Done" (Hoàn tất) Action**: Returns learners to the deck overview and updates review counters.
- **Top-Right `[✕]` Dismiss**: Immediate return to the study setup dashboard.
- **"Review Missed" & "Study Again"**: Dedicated secondary actions for immediate follow-up practice without getting trapped.
- **Same-Tab Reset**: Tapping the "Review" tab in the bottom bar or sidebar while in the completed state cleanly resets back to the initial dashboard.

### 7.3. Streamlined Study Dashboard & Zero Layout Shift Architecture
The Review start dashboard is designed for focus, instant accessibility, and visual elegance:
- **Unified Main Panel (`.card.study-panel`)**: Directly mirrors the structure and card padding patterns of `/dictionary`, `/explore`, and `/history` with consistent `var(--space-md)` padding and responsive `var(--space-sm)` on mobile.
- **Panel Header**: Icon, title, and streak counter badge (`.badge.badge--warning`), maintaining a clean, distraction-free header.
- **Streamlined Practice Flow**: Eliminates redundant queue tabs and intermediate screens so learners immediately see deck status and launch flashcards without friction.
- **Compact Due Alert Banner**: Displays conditionally only when items are due today with a clock icon and 1-click "Review Due Now" action.
- **Minimalist 3-Deck Cards**: Elevated deck selector cards (**New**, **Learning**, **Known**) with clean badges, active checkmark circles, and large counts, positioned directly for immediate selection.
- **Unified Settings Card**: Consolidated study configuration containing session size pills (`5`, `10`, `20`, `all`) and a balanced 2x2 grid of preference toggles (**Due Only**, **Reverse Mode**, **Auto-Play Audio**, **Cloze Mode**).
- **Centralized SRS Schedule Indicators**: Next-review timings (`🕒 38d`, `Due`) are integrated directly into the vocabulary notebook in `/dictionary`, providing a single unified place to browse words and inspect SM-2 spaced repetition schedules.
- **Zero Layout Shift Architecture**:
  - The desktop `.page-layout` grid remains identical across idle/start, active studying, and completion screens.
  - The right-hand sidebar (`.page-layout__sidebar`) displays the Mastery Overview (SVG donut ring, mastery breakdown) and the Daily Study Habit & Goal progress card.

### 7.4. Authentic Video Scene Jump
Every mined card captures `sourceSentence`, `sourceVideoId`, and `sourceTimestamp`. While studying, learners can tap **`[▶ Watch Scene]`** (or press key `V`) to jump directly to the exact millisecond in the authentic YouTube video where the phrase occurred.

### 7.5. Reading Spoiler Prevention & Peek Mode
To prevent passive phonetic cheating during Kanji/Hanzi recall, furigana and pinyin are **strictly hidden on the front of flashcards by default**, even if globally enabled for video subtitles. Learners who are stuck can click a subtle **"Peek reading"** button (or press `P`) for temporary assistance, while the answer face displays the full phonetic reading alongside the definitions.

### 7.6. Cloze Deletion (Fill-in-the-Blank) Sentence Practice
When "Cloze Mode" is toggled, the focus word is masked inside the context sentence (`【 ... 】`) on the front of the card. Learners recall the word from its sentence context rather than as an isolated vocabulary token.

### 7.7. Audio Auto-Play on Reveal
Learners can enable "Auto-play audio" in study settings to have authentic dictionary or TTS audio automatically trigger the moment a flashcard is flipped, training auditory comprehension concurrently with visual recall.

### 7.8. Zen Focus Mode & Keyboard Ergonomics
- **Distraction-Free Study (Zen Mode)**: During active flashcard study, the UI switches into a centered, distraction-free layout (`max-width: 680px`), hiding sidebars and real-time score widgets to maximize memory retention and prevent cognitive overload. Comprehensive performance metrics are presented in the celebratory session-complete dashboard upon finishing.
- **Streamlined Ergonomics**: Essential keyboard shortcuts (`Space` to flip, `1-4` to grade, `R` to replay audio, `P` to peek reading, `V` to open scene) are presented in a quiet, non-intrusive footer hint bar.
- **Mobile Swipe Physics**: Enhanced swipe gestures with rotation physics and watermark feedback tags (red "Again" on left swipe, green "Good" on right swipe).

### 7.9. Streamlined Architecture & Memory Optimizations
- **Shared Reactive State**: Daily goal progress (`goalProgress`) and due-card count calculations (`getDueCountByLanguage`) are unified in `VocabularyService`, eliminating duplicate filter closures between study components and sidebars.
- **Zero-Wrapper Card Queue**: The study queue directly processes `VocabularyItem` arrays without wrapper object allocations during session initialization, failed-card recycling, or missed-card re-study.
- **Full Metadata Undo Restoration**: When a user undoes a word deletion from the notebook, all captured sentence context, audio references, source video ID, and timestamp offsets are restored without data loss.

---

## 8. Gamified Streaks & Freeze Inventory

- **Daily Tracking**: Practicing (watching videos, completing flashcard reviews) records an activity entry for the current UTC date.
- **Streak Freezes & Freeze Economy**:
  - Users have an inventory of up to 2 Streak Freezes.
  - If a user misses exactly 1 day, a freeze is consumed automatically to protect their streak.
  - Milestones at 7, 30, and 100 days reward an extra streak freeze.
  - **XP Freeze Replenishment**: Users can purchase +1 Streak Freeze (up to the cap of 2) for **150 XP** directly within `StreakDialogComponent`. The XP is deducted via `GamificationService.deductXP(150)` and synchronized with Supabase via `StreakRepository.replenishFreeze()`.
- **Server-Side Streak Evaluation (`record_streak_activity`)**:
  An atomic PostgreSQL stored procedure evaluated via Supabase RPC checks active streaks daily, consuming freezes or resetting streaks if inactive for $>1$ day.
- **Streak Dialog & Week Strip Reactivity**:
  - `StreakDialogComponent` renders inside a responsive bottom sheet modal (`<app-bottom-sheet>`).
  - Displays the current week (Monday–Sunday) with localized day labels (`weekday: 'narrow'`).
  - Powered by Angular Signals (`streakData`, `activityHistory`, `isOpen`), auto-refreshing via background sync on modal open.
  - Guarantees accurate checkmarks across all timezones by preserving both local calendar and UTC date keys and merging remote history without data loss.

---

## 9. Playlist & Study Queue Architecture

- **Multi-Source Playlists**: Supports user-created custom playlists, curated Community Playlists (e.g., JLPT/TOPIK/HSK listening collections), and Supabase cloud sync.
- **Responsive Video Screen Presentation**:
  - **Desktop Unified Sidebar (`.unified-sidebar`)**: Houses a segmented control tab switcher toggling between `Playlist (N)` and `Vocabulary (N)`. Uses `.hidden` styling instead of template recreation to eliminate layout shifts when switching tabs. When a playlist has only 1 video, the playlist tab is retained on desktop to allow playlist management (editing, sharing, closing, or navigating).
  - **Mobile Playlist Bar (`.mobile-playlist-card`) & YouTube-Style Bottom Sheet**:
    - Sits directly below the video player as a sleek, non-expanding compact bar (~48px) displaying playlist title, author, index/total, and quick action buttons (Share, Loop, Shuffle, Chevron).
    - **Zero Layout Shift (0% CLS)**: Tapping the bar or chevron opens a modal `<app-bottom-sheet>` instead of expanding in-flow. The video player and subtitles beneath it remain stationary and completely undisturbed.
    - Inside the bottom sheet, the user can reorder videos (cdkDrag if owner), switch videos, toggle loop/shuffle, share, or open individual video options. Selecting a video automatically closes the sheet and navigates to the video.
  - **Navigation Guarding**: Playlist previous (`canPlayPrev`) and next (`canPlayNext`) actions are disabled when `videos.length <= 1` (unless playlist loop mode is toggled), preventing dead interactions.
- **Dual "For You" Home Dashboard ("Dành cho bạn" / "For You")**:
  - When no video is currently loaded, the Home Dashboard transforms into a modern **YouTube Homepage Feed**:
    1. **YouTube-style Video Card Grid (`yt-video-grid` & `yt-video-card`)**: 16:9 cards with duration pills, circular channel/flag avatars, 2-line clamped titles, level badges, and interactive subtitle (`CC`) indicators.
    2. **1-Tap Interactive Chips Carousel (`.yt-chips-bar`)**: Full-width horizontal scrollable chips bar (`All`, `Playlists`, language proficiency levels e.g. `JLPT N5`–`N1`) allowing instant topic/difficulty filtering without modal popups.
    3. **Native Tap-to-Refresh & Icon-Only Pull-to-Refresh**: Tap the active "Watch" tab in the bottom bar to scroll to top or refresh the feed with haptic feedback, or swipe down on mobile for an icon-only floating circular refresh badge.
    4. **Smart History De-duplication & Expanded Catalog**: Deprioritizes already-watched videos using `HistoryService` and queries from an expanded 120-video candidate pool in D1 for high variety.
    5. **Infinite Scrolling Pagination**: Uses an `IntersectionObserver` sentinel to continuously auto-fetch 12-video batches on scroll without layout shift.
- **Verified Database Transcript Video Recommendations (`VideoRecommendationService`)**:
  - Solves the cold-start problem: learners don't need a YouTube URL ready on their clipboard to start practicing.
  - **Pre-Processed & Instant (<100ms)**: Videos are sourced from Cloudflare D1 (`video_languages`) and R2 permanent transcripts. Zero scraping delay, zero risk of missing captions, and zero AI Diamond credit consumption.
  - **Server-Side Difficulty Level Filtering & Offset Pagination**: Supports querying by proficiency tier and offset (`GET /api/recommended-videos?lang={lang}&tier={tier}&limit=16&offset={offset}`). Resolves tiers via D1 `levels` JSON and metadata regex, ensuring continuous shelves of level-matched videos without sparse results. Server candidate gathering applies creator variety capping to avoid single-channel domination.
  - **Intelligent Multi-Factor "For You" Ranking Engine**:
    - **Offline-First Privacy Scoring**: Because watch history and vocabulary notebooks are stored client-side for user privacy, candidate scoring executes entirely on the client in $<5\text{ms}$ with zero network or database overhead.
    - **Watch History & In-Progress Resume**: Unwatched videos receive $+40$ exploration bonus. In-progress videos receive $+35$ resume bonus with attached exact `resumeProgress` percentage. Completed videos ($\ge 85\%$) are demoted by $-70$ points to prevent feed stagnation. Favorite videos receive $+20$ points.
    - **Creator Affinity**: Detects channels the user frequents in their watch history, granting $+10$ points per previous view (up to $+30$ points).
    - **Active Vocabulary Notebook Overlap**: Cross-references video titles against the user's active SRS flashcard deck (`OfflineVocabularyRepository`), granting $+25$ to $+45$ points for matching words and attaching matched terms for UI recognition.
    - **Pedagogical Duration Sweet Spot**: Prioritizes focused, bite-sized language learning sessions ($+20$ pts for 3–12 mins, $+10$ pts for 12–20 mins, penalizing ultra-short clips $<1.5$ min and marathons $>40$ min).
    - **Krashen $i+1$ Comprehensible Input**: Infers the user's current proficiency level from watched history and rewards videos matching their dominant tier ($+20$ pts) or slightly stretching their comprehension by one level ($+12$ pts).
    - **Creator Anti-Clustering & De-Clustering**: Employs a greedy de-clustering pass that guarantees no two adjacent recommendation cards share the same channel creator.
  - **YouTube-Style Visual Progress & Study Indicators**:
    - **In-Progress Progress Bar**: Video cards display a 3.5px YouTube-red progress bar (`#ef4444`) anchored to the bottom edge of the thumbnail for partially watched videos.
    - **Study Word Sparkle Badge**: Videos containing vocabulary from the learner's notebook display a purple pill badge (`✨ {{count}} study words`) in the card metadata sub-row.
  - **YouTube-Style Channel Avatars & Letter-Initial Fallbacks**: Video cards display the creator's official YouTube channel avatar image (cached in D1 `video_languages.channel_avatar`). If unavailable, an initial placeholder featuring the channel's first letter is displayed with smooth hover zoom animations.
  - **Unified Caption & Language Sub-Badges**: Subtitle languages are merged with the closed caption indicator into a single compact, unified badge (e.g. `[CC 🇯🇵 JA]`, `[CC 🇯🇵 JA / 🇬🇧 EN]`, or `[CC 🇯🇵 JA +3]`). Eliminates duplicate CC icons and oversized pill clutter. Active learning languages are prioritized first, accompanied by circular flags (`.circle-flag--xs`) and an informative hover tooltip listing all supported languages. Watch history and playlists also reflect verified server subtitles (`sub_languages`).
  - **1-Click Play**: Clicking any video immediately updates the URL query parameter (`?v=videoId`), mounts the player, and loads synchronized cues.
- **Server-Side Playlist Recommendation Engine**:
  - Automatically queries Supabase with targeted server-side filtering (`visibility = 'public' AND language = '${lang}' AND video_count >= 2`).
  - Supports proficiency tier filtering across published community playlists, matching playlist levels, tags, and titles directly against user-selected difficulty tiers.
  - Ranked on the server by `-is_featured, -save_count, -updated` to prioritize curated and popular community content while filtering out single-video test spam.
  - Automatically re-fetches when learning language or difficulty tier changes and caches results in memory per language and tier.
  - Falls back to `video_count >= 1` if a new language does not yet have multi-video collections.

---

## 10. Search Engine Optimization (SEO) & Web Discovery Architecture

- **Root Metadata & Social Protocol**:
  - `src/index.html` implements Open Graph (`og:type`, `og:title`, `og:description`, `og:image`, `og:locale`, alternate locales) and Twitter Cards (`summary_large_image`).
  - Embeds Schema.org JSON-LD structured data for `WebApplication` and `EducationalApplication`, enumerating supported languages, interactive subtitle capabilities, and free tier offers.
  - Canonical URL `<link rel="canonical">` points to `https://voca.study`.
- **Search Engine Discovery Assets**:
  - `public/robots.txt`: Explicitly permits search crawlers on learning routes (`/video`, `/dictionary`, `/study`, `/explore`, `/history`) while restricting internal serverless functions (`/api/`).
  - `public/sitemap.xml`: Declares priority and change frequencies for all public views, with `xhtml:link` multi-language `hreflang` alternates (`en`, `vi`, `ja`, `ko`, `zh`, and `x-default`).
  - `public/og-image.png`: High-resolution 1200x630 Apple-inspired chill pastel social share card with dreamy gradient atmosphere, pillowy Kikyou Kamon icon, clean Avenir/SF typography, and frosted glass language capsule.
- **Dynamic Angular `SeoService` (`src/app/core/services/seo.service.ts`)**:
  - Automatically listens to Angular Router `NavigationEnd` events and updates document title, description, keywords, Open Graph, and Twitter metadata per route.
  - **Dynamic Video Metadata**: When a YouTube video is actively loaded in `VideoPageComponent`, `updateVideoSeo(title, id, desc)` updates document title (`"${videoTitle} | Voca"`), sets `og:type` to `video.other`, and sets `og:image` to the video's high-resolution YouTube thumbnail. Resets cleanly when navigating away or destroying the component.
- **PWA Discoverability & App Shortcuts**:
  - `public/manifest.webmanifest` specifies education/utilities categories, standalone display, and PWA shortcuts for instant launch into Watch, Dictionary, Flashcards, and Explore.
- **PWA Installation Flow (`PwaService`)**:
  - `src/app/core/services/pwa.service.ts`: Listens for the `beforeinstallprompt` browser event, detects standalone display mode (`(display-mode: standalone)` and `navigator.standalone`), and detects iOS devices.
  - **Mobile "More" Menu**: Users can install the PWA directly from the mobile "More" bottom sheet via the "Install App" action row. The button is automatically hidden if the user is already running the app in standalone mode.
  - **Android / Chromium / Desktop**: Triggers the native browser install dialog via `prompt()` and tracks user choice.
  - **iOS Safari Support**: Because iOS does not support programmatic install prompts, clicking "Install App" on iPhone/iPad opens a step-by-step visual bottom sheet guiding the user to tap the Safari Share button and select "Add to Home Screen".
- **Service Worker, Server-Assisted Versioning & Changelog Architecture (`AppUpdateService`)**:
  - `src/app/core/services/app-update.service.ts`: Signal-first service worker update and edge version orchestrator.
  - **Server-Assisted Version & Breaking Change Protection (`GET /api/version`)**: Connects to the edge version endpoint on startup and background focus triggers. Compares client version with `minSupportedVersion` via SemVer; if breaking API migrations occur, the update sheet operates in non-dismissible mode to protect users against corrupted queries.
  - **Localized "What's New" Highlights**: Shows bulleted release notes in the user's selected UI language (`en`, `vi`, `ja`, `ko`, `zh`) both inside the update sheet and in the Settings "Release Notes" modal.
  - **Optimized Asset Prefetching**: Splits the application shell (`main.*.js`, `polyfills.*.js`, `styles.*.css`, `index.html`) from dynamic chunks (`chunk-*.js`) in `ngsw-config.json`, preventing 12MB+ download bursts during update checks.
  - **Non-Disruptive Notification & Graceful Transition**: When updates are available, displays a bottom sheet with "Update Now" and "Later". Applying an update displays a full-screen branded transition overlay with animated Kikyo crest and localized messaging while activating the service worker and purging stale caches, eliminating abrupt white-flash reloads.
  - **Update Persistence & Badges**: If an update is deferred, a persistent pulsating dot appears on the desktop sidebar and mobile "More" menu Settings entries.
  - **Settings Integration & Instant 60fps Performance**: Users can view the current app version, open the "What's New" sheet, and check for updates. Child pickers and dialogs are lazy-rendered on demand with idle prefetching, ensuring instant 60fps opening without layout lag.
  - **Corrupted Cache Recovery**: Listens to `swUpdate.unrecoverable` to prompt the user safely rather than abruptly reloading the active page, purging corrupted cache stores upon user confirmation.
  - **Cloudflare Edge Headers**: Configured in `public/_headers` with `no-cache, no-store, must-revalidate` for `ngsw.json` and `index.html`, and `immutable` for hashed JavaScript and CSS bundles.

---

## 11. Diamond Credits Multi-Tier Architecture & payOS Payment Integration

Voca features a multi-tiered credit and quota management system designed to balance user delight with edge AI cost sustainability (Gladia STT):

### 11.1. Tier Specifications & Quotas
| Tier | Trigger / Qualification | Max Credits | Regen Rate | Max AI Video Length | Daily KV Sync Policy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`anonymous`** | Unauthenticated guest IP | 3 Diamonds | 1 credit / 20 min | $\le 10$ minutes | In-memory cached; throttled KV sync |
| **`free`** | Authenticated user (default) | 5 Diamonds | 1 credit / 15 min | $\le 10$ minutes | Supabase profiles record + in-memory cache |
| **`pro`** | Active Pro subscriber | 10 Diamonds | 1 credit / 10 min | $\le 20$ minutes | Supabase profiles record + instant sync |
| **`premium`** | Active Premium subscriber | 25 Diamonds | 1 credit / 4 min | $\le 45$ minutes | Supabase profiles record + instant sync |

- **Defaulting to Free**: New registered users always default to the `free` tier (awarding 5 diamonds as an onboarding reward). Upgrades to `pro` or `premium` occur exclusively via verified payment or administrative grant.
- **Dynamic Cost Scaling**:
  - $\le 10$ minutes: **1 Diamond credit**
  - $10$–$20$ minutes: **2 Diamond credits**
  - $20$–$35$ minutes: **3 Diamond credits** (requires `premium`)
  - $35$–$45$ minutes: **4 Diamond credits** (requires `premium`)
  - $> 45$ minutes: Rejected; exceeds serverless edge processing and audio transcription limit.
- **Automated Refund on Failure**: If Gladia fails or rejects the audio stream, credits are automatically refunded to the user's account.

### 11.2. Edge Rate Quota & Free KV Optimization (Rule 2)
- **Edge In-Memory Caching (`memDiamondsCache`)**: Cloudflare Workers maintain an in-memory cache with a 60-second TTL and a 500-entry LRU cap. Repeated credit checks do not touch Cloudflare KV, preserving free-tier write quotas (1,000 writes/day).
- **In-Memory Profile Caching**: Authenticated user profiles are cached in memory for 5 minutes, eliminating redundant database calls.

### 11.3. payOS VietQR Open Banking & Pro / Premium Upgrade
- **Why payOS?**: Zero gateway subscription fees (compared to ApiPay's 100k-150k VND/month fee), official VietQR bank transfer rails, and zero storage of raw banking credentials.
- **Supported Plans**:
  - **Voca Pro**:
    - Monthly (`pro_1m`): 49,000 VND/month (~`\$1.95`)
    - Annual (`pro_1y`): 450,000 VND/year (~`\$18.00`, 23% savings, ~37,500 VND/mo)
  - **Voca Premium**:
    - Monthly (`premium_1m`): 119,000 VND/month (~`\$4.75`)
    - Annual (`premium_1y`): 990,000 VND/year (~`\$39.50`, 30% savings, ~82,500 VND/mo)
- **VietQR Payment Flow**:
  1. User selects "Upgrade" in `SidebarComponent`, `SettingsSheetComponent`, or the Pro/Premium teaser banner in `AiCreditsDialogComponent`.
  2. Dedicated `ProUpgradeDialogComponent` opens, presenting an interactive Tier Switcher (`[ Voca Pro ] [ Voca Premium ]`) with real-time benefit comparisons, monthly/annual toggles, and localized badge highlights.
  3. Frontend calls `POST /api/payment/create-order` with the chosen `planId`.
  4. Server signs payment payload with `HMAC-SHA256` using `PAYOS_CHECKSUM_KEY`, creates an order via payOS, parses raw EMVCo strings into scannable QR images, caches order metadata in Cloudflare KV, and returns structured banking info (`accountNumber`, `accountName`, `bin`, `description`, `checkoutUrl`, `qrCode`).
  5. Frontend displays a responsive VietQR card featuring the generated QR image, mobile checkout deep link, copyable account details, and active polling via `PaymentService`.
  6. User scans with any Vietnamese banking app (Vietcombank, MBBank, Techcombank, etc.).
  7. Upon transfer settlement, payOS fires a secure webhook to `/api/payment/webhook`.
  8. Server verifies webhook HMAC signature, checks idempotency via Cloudflare KV (`order_processed:{orderCode}`), upgrades the user's subscription in Supabase (`public.profiles`: `subscription_tier = targetTier`, `diamonds = grantedDiamonds` [10 for Pro, 25 for Premium]), and sets expiry timestamp.
  9. Polling or next user action detects the new tier, refreshes user auth state, celebrates with confetti/toast, and unlocks Pro/Premium quotas immediately.

---

## 12. Video Difficulty Level Categorization & Hybrid Edge Classifier

To help language learners identify content suitable for their proficiency, Voca categorizes videos across standard linguistic frameworks:
- **Japanese (`ja`)**: JLPT N5 (Beginner) $\rightarrow$ N1 (Mastery)
- **Chinese (`zh`)**: HSK 1 (Beginner) $\rightarrow$ HSK 6 (Mastery)
- **Korean (`ko`)**: TOPIK 1 (Beginner) $\rightarrow$ TOPIK 6 (Mastery)
- **English (`en`)**: CEFR A1 (Beginner) $\rightarrow$ C2 (Mastery)

### 12.1. Three-Stage Hybrid Classification Pipeline
Evaluating complete video transcripts with heavy morphological tokenizers on every request would cause CPU timeouts on serverless edge workers. Voca uses an optimized three-stage hybrid architecture:

```
  ┌─────────────────────────────────────────────────────────┐
  │ 1. Edge & D1 Cache Check                                │
  │    • Read levels JSON column in D1 video_languages      │
  │    • Instant O(1) hit for previously assessed videos    │
  └──────────────────────────┬──────────────────────────────┘
                             │ Miss
                             ▼
  ┌─────────────────────────────────────────────────────────┐
  │ 2. Fast-Path Title & Channel Regex Matching             │
  │    • Inspect title, description, and channel keywords   │
  │    • Matches e.g. "JLPT N3", "HSK 2", "TOPIK II",       │
  │      "Beginner Korean", "Advanced Japanese"             │
  │    • Executes on serverless Worker in < 1ms             │
  └──────────────────────────┬──────────────────────────────┘
                             │ Not matched in title
                             ▼
  ┌─────────────────────────────────────────────────────────┐
  │ 3. Deep Client-Side Linguistic & Speech Rate Profiling  │
  │    • Client already segments cues for interactive UI    │
  │    • Speech Rate CPM/WPM calculation:                   │
  │      CPM = (Total Characters / Speech Duration Seconds) │
  │    • Grammar Density: Scans cues against 2,400+ rules   │
  │      in GrammarService (src/app/data/grammar-*.ts)      │
  │    • Weighted Tier Scoring & Threshold Mapping          │
  │    • Saves result to D1 via POST /api/video-level       │
  └──────────────────────────┬──────────────────────────────┘
```

### 12.2. Tier Score Weights & Speech Rate CPM Metrics
- **Speech Speed Thresholds**:
  - `ja`: Slow $\le 220$ CPM, Normal $221$–$340$ CPM, Fast $> 340$ CPM
  - `zh`: Slow $\le 160$ CPM, Normal $161$–$260$ CPM, Fast $> 260$ CPM
  - `ko`: Slow $\le 200$ CPM, Normal $201$–$320$ CPM, Fast $> 320$ CPM
  - `en`: Slow $\le 110$ WPM, Normal $111$–$160$ WPM, Fast $> 160$ WPM
- **Difficulty Score Formula**:
  $$\text{Score} = (\text{Grammar Level Tier} \times 0.7) + (\text{Speech Speed Tier} \times 0.3)$$
- **Universal Tier Normalization**:
  - `beginner`: JLPT N5/N4, HSK 1/2, TOPIK 1/2, CEFR A1/A2 (Color: Emerald `#10b981`)
  - `intermediate`: JLPT N3, HSK 3/4, TOPIK 3/4, CEFR B1 (Color: Blue `#3b82f6`)
  - `advanced`: JLPT N2, HSK 5, TOPIK 5, CEFR B2 (Color: Purple `#8b5cf6`)
  - `expert`: JLPT N1, HSK 6, TOPIK 6, CEFR C1/C2 (Color: Amber `#f59e0b`)

### 12.3. UI Integration & Level Filtering
- **Video Header Pill (`VideoHeaderComponent`)**: Displays dynamic tier-colored badge (e.g. `[JLPT N3]`). During caption fetching, AI transcription generation, or deep linguistic evaluation, a shimmering skeleton pill (`.level-badge--skeleton`) is rendered to prevent showing stale level badges from previously watched videos while preserving layout stability (CLS = 0).
- **Interactive Evaluation Sheet/Modal (`VideoLevelDialogComponent`)**: Clicking the badge opens a responsive bottom sheet (mobile) or modal dialog (desktop) detailing:
  - Framework level (JLPT/HSK/TOPIK/CEFR) and tier label (Beginner, Intermediate, etc.).
  - Assessment source: whether detected via subtitle linguistic analysis or creator curriculum metadata.
  - Number of advanced grammar patterns detected with individual breakdown tags (e.g. N5, N4, N3).
  - Speech pace and velocity (e.g. `278 cpm` or `142 wpm`) with category tags (Clear/Slow, Natural, Fast Native).
  - Transparent 3-pillar breakdown explaining how Voca analyzes grammar morphology, vocabulary & kanji complexity, and spoken cadence.
  - Contextual immersion tip for learners (e.g. slowing playback to 0.85x or enabling bilingual subtitles).
- **Learn Home Dashboard Integration (`VideoPageComponent`)**:
  - **YouTube-Style Home Discovery Feed**: Native YouTube-style video discovery grid featuring 16:9 responsive thumbnails, channel avatars, duration badges, and proficiency level indicators.
  - **Interleaved Recommended Playlists**: YouTube-style interleaving of community and curated playlists directly into the video feed (1 playlist every 4 videos) with stacked-shadow card styling.
  - **In-Memory Session Caching & Fresh Page Reloads**: In-memory `Map` caching in `VideoRecommendationService` and `PlaylistService` keeps back-navigation 0ms instantaneous during browsing sessions without consuming client LocalStorage quota, while browser reloads and PWA refreshes fetch freshly shuffled catalog videos from D1.
  - **Sticky Clean Filter Chips Carousel**: YouTube-authentic pill chips (`All`, `Playlists`, level pills `N5`–`N1`, `HSK`, etc.) with fixed dimensions and no disruptive pop-in count badges.
  - **Infinite Scroll & Seamless Prefetching**: IntersectionObserver sentinel (600px root margin) automatically fetches additional level-matched videos before the learner reaches the bottom. Employs a centered rotating `.spinner` indicator during loading with zero delay on newly appended cards, preceded by an 8-card YouTube-style shimmer wave skeleton grid with dual title lines to completely eliminate layout shifts (CLS = 0).
- **Playlist Page Integration (`PlaylistPageComponent`)**:
  - Playlist cards and individual tracklist rows display level pills (`level-badge--pill`) styled with tier-specific hues.
  - **Level Filter Dropdown**: Filter playlists by proficiency level (`All Levels`, `Beginner`, `Elementary`, `Intermediate`, `Upper Intermediate`, `Advanced`).
  - **Server-Side Community Query**: Reloads community playlists from Supabase with language and level parameters.
  - **Create Playlist Dialog**: Allows specifying target difficulty level upon playlist creation.
- **History Page Integration (`HistoryPageComponent`)**:
  - **Level Filter Dropdown**: Quickly isolate watch history by difficulty tier.
  - **Dynamic Level Fallback**: `HistoryListComponent` automatically detects and renders level badges via `VideoLevelService.resolveLevel()` even for legacy history items lacking explicit database levels.

---

## 13. Gamification, XP Progression & Achievement System

Voca incorporates an engaging, dopamine-positive gamification system designed to reinforce consistent daily immersion without punitive streaks or artificial grind.

### 13.1. XP Engine & Level Curve
- **Progression Formula**:
  $$\text{Level} = \left\lfloor\sqrt{\frac{\text{XP}}{100}}\right\rfloor + 1$$
- **XP Required for Level $N$**:
  $$\text{XP}_{\text{req}}(N) = (N - 1)^2 \times 100$$
- **Earning XP Actions**:
  | Action | XP Reward | Trigger Event |
  | :--- | :--- | :--- |
  | **Complete Video** | **+25 XP** | Watching $\ge 80\%$ of video duration (`HistoryService.updateProgress`) |
  | **Save Vocabulary** | **+5 XP** | Adding a word token to notebook (`VocabularyService.addWord`) |
  | **Flashcard Review** | **+10 XP** | Submitting SM-2 quality rating in Study Mode (`VocabularyService.markReviewed`) |
  | **Subtitle Quiz Mastered** | **+15 XP** | Correct answer on in-video subtitle quiz (`QuizService.checkAnswer`) |

### 13.2. Achievement Badges Portfolio (19 Achievements)
Achievements are organized into 5 core learning categories:
1. **Immersion (`immersion`)**:
   - `first_video`: First Steps — Complete your first video (+50 XP)
   - `video_5`: Video Explorer — Complete 5 videos (+100 XP)
   - `video_25`: Binge Learner — Complete 25 videos (+250 XP)
   - `video_100`: Marathon Master — Complete 100 videos (+1000 XP)
   - `watch_multilang`: Polyglot Pioneer — Watch videos in 3 or more languages (+150 XP)
2. **Vocabulary (`vocabulary`)**:
   - `word_1`: Word Collector — Save your first vocabulary word (+25 XP)
   - `word_25`: Lexicon Builder — Save 25 words (+100 XP)
   - `word_100`: Vocabulary Master — Save 100 words (+300 XP)
   - `word_500`: Living Dictionary — Save 500 words (+1000 XP)
3. **Streaks (`streak`)**:
   - `streak_3`: Consistency Starter — Maintain a 3-day streak (+50 XP)
   - `streak_7`: Habit Former — Reach a 7-day streak (+150 XP)
   - `streak_30`: Unstoppable — Maintain a 30-day streak (+500 XP)
   - `streak_100`: Streak Legend — Reach a 100-day streak (+2000 XP)
4. **Spaced Repetition (`srs`)**:
   - `srs_10`: Memory Spark — Review 10 flashcard cards (+50 XP)
   - `srs_50`: Recall Champ — Review 50 flashcard cards (+150 XP)
   - `srs_200`: Spaced Repetition Guru — Review 200 flashcard cards (+500 XP)
5. **Interactive Quizzes (`quiz`)**:
   - `quiz_1`: Quick Thinker — Answer your first subtitle quiz (+30 XP)
   - `quiz_10`: Quiz Prodigy — Complete 10 subtitle quizzes (+100 XP)
   - `quiz_50`: Sharp Mind — Master 50 subtitle quizzes (+300 XP)

### 13.3. Daily Missions & Daily Completion Chest (`DailyMissionsState`)
To maintain strong daily retention and solve the "lifetime grind" barrier, Voca generates 3 randomized, bite-sized quests every day at midnight (local time):
- **Daily Mission Pool**:
  | Quest Key | Quest Name | Target Objective | Reward |
  | :--- | :--- | :--- | :--- |
  | `watch_1` | Active Immersion | Watch 1 video with subtitles | +20 XP |
  | `watch_2` | Deep Immersion | Watch 2 videos with subtitles | +35 XP |
  | `save_3` | Sentence Miner | Save 3 new vocabulary words from subtitles | +20 XP |
  | `save_5` | Vocabulary Hunter | Save 5 new vocabulary words | +30 XP |
  | `dict_3` | Dictionary Sleuth | Look up 3 words in the dictionary | +15 XP |
  | `srs_10` | Memory Workout | Review 10 flashcards in SRS Study | +25 XP |
  | `quiz_1` | Comprehension Test | Complete 1 video comprehension quiz | +20 XP |
- **Daily Completion Chest**:
  - Completing all 3 daily quests unlocks the sparkling **Daily Completion Chest**.
  - Opening the chest grants a **+50 XP bounty**, reinforcing consistency and building positive dopamine feedback loops.
- **Dynamic Midnight Countdown & Roll-Over Auto-Claim**:
  - Displays a live countdown timer until the next mission reset (`resetsIn: hh:mm:ss`), automatically refreshing stale missions upon crossing midnight.
  - **Midnight Auto-Harvest**: If a user finishes missions or completes the chest but forgets to claim them before midnight, `ensureFreshPeriod()` automatically harvests all unclaimed XP upon roll-over (`pendingRolloverXp`), credits them immediately to total and weekly XP, and welcomes the user in the morning with a clean greeting toast (`🎁 +X XP auto-claimed`).
- **Contextual Study Page Quest Card (`StudyPageComponent`)**:
  - The SRS Study Mode sidebar directly integrates the current session's daily mission (`srs_10` / `Memory Workout`).
  - Displays real-time progress (`m.progress / m.target`) and an inline one-tap `Claim +25 XP` button when completed, removing the need to navigate away from study mode.

### 13.4. Achievements & Missions Dialog (`AchievementsDialogComponent`)
- **Tri-Segmented Tab Bar**:
  - **Missions**: Live daily quests with individual claim buttons, progress bars, and the animated Daily Completion Chest.
  - **Achievements**: Category-filtered badges (Immersion, Vocabulary, Streaks, SRS, Quizzes) with unlocked count pills.
  - **Leaderboard**: Global learner rankings with weekly and all-time toggle views.
- **Clean Notification Dots (Zero "AI Slop")**:
  - Non-intrusive, static 6px indicator dots (`.stat-claim-dot`, `.bottom-nav__dot`, `.more-stat-dot`) alert the learner when claimable mission rewards are waiting.
  - Displayed on the Trophy button in the desktop expanded stats bar, the collapsed sidebar trophy icon, the mobile bottom navigation "More" button, and inside the More bottom sheet level stat card.
  - Strictly follows a clean, minimalist design (no pulsing animations, glows, or floating badges).
- **Hero Level Banner**: Displays user's current level title (Novice, Apprentice, Explorer, Scholar, Polyglot, Sage, Master, Grandmaster), total accumulated XP, weekly XP, and an animated radial/linear level progress bar.
- **Visual Badge States**:
  - Unlocked: Vibrant tier gradient (Emerald, Blue, Purple, Gold), unlock timestamp, and gold trophy icon.
  - Locked: High-contrast dark surface, grayscale icon, and real-time numerical progress bar (`current / target`).
- **Real-Time Celebration**: Unlocking any achievement, claiming a mission, or opening the chest triggers immediate celebratory toasts and live XP updates.
- **In-Flow Milestone Toasts**:
  - Completing $\ge 80\%$ of a video duration displays a celebratory toast: `🎬 [Title] (+25 XP)`.
  - Answering quiz questions correctly awards $+5$ XP in real time, while full quiz completion triggers `recordQuizCompleted()`.

### 13.5. Weekly & All-Time Global Ranking System (`LeaderboardService`)
- **Period Filter Pills**:
  - `⚡ This Week`: Displays weekly XP (`weekly_xp`) accrued in the current ISO calendar week (`YYYY-WW`). Automatically resets every Monday 00:00 UTC so new and active learners always have a real chance to top the podium.
  - `🏆 All Time`: Displays lifetime accumulated XP.
- **Top 3 Podium**:
  - Elevated central Gold pedestal (👑 #1), flanked by Silver (🥈 #2) and Bronze (🥉 #3).
  - Glowing avatar halos, level indicators, streak flames, and dynamic XP display based on selected period.
- **Top 50 Ranking Stream**: Ranks 4 to 50 rendered with rank badges, nationality flags, current levels, active daily streaks, and period-specific score counters.
- **Sticky Current User Anchor Bar**: Persistently shows the logged-in or guest learner's global rank position at the bottom of the dialog, with a one-tap sync button.
- **Language Filter Chips**: Filter leaderboard rankings by target study language (`All`, `JA 🇯🇵`, `KO 🇰🇷`, `ZH 🇨🇳`, `EN 🇬🇧`).
- **Offline-First & Community Baseline Integration**:
  - `mergeWithSeedLeaderboard` merges registered real users with 28 realistic community learners across Japanese, Korean, Chinese, and English, guaranteeing that the Top 3 podium (Gold 👑, Silver 🥈, Bronze 🥉) and leaderboard stream are always active and competitive.
  - Dynamically calculates exact rank based on relative XP distribution rather than showing isolated single-user states.
  - Generates deterministic persistent guest IDs for learners browsing without Supabase accounts.
  - Automatically syncs XP upon login or level-up events, with cache-busting real-time refresh support.

### 13.6. Offline-First Supabase Persistence (`OfflineGamificationRepository`)
- **Deterministic Entity IDs**:
  - Gamification records use a deterministic ID (`btoa(userId + ':gamification').slice(0, 15)`) adhering to Supabase table identifier conventions.
  - Guarantees zero duplicate records across multiple browser tabs, client restarts, or concurrent login sessions.
- **Bi-Directional Timestamp Merge Strategy**:
  - When merging local and remote gamification states, the repository computes:
    - $\text{XP} = \max(\text{local.xp}, \text{remote.xp})$ (strictly monotonic progression).
    - $\text{Level} = \left\lfloor\sqrt{\text{XP}/100}\right\rfloor + 1$.
    - Video watch and quiz counts: $\max(\text{local}, \text{remote})$.
    - Unlocked achievements: Union of all unlocked badge IDs, preserving the earliest `unlockedAt` timestamp for each badge.
    - Notified achievements: Union of all acknowledged notification IDs.
- **Debounced Remote Sync & Offline Tolerance**:
  - Local state is updated instantaneously via Angular signals and persisted to `localStorage`.
  - Remote synchronization is debounced (3 seconds) to prevent hammering Supabase on rapid actions (e.g. rapid flashcard clicks).
  - Graceful degradation: If network is offline or table is temporarily unreachable, requests fail silently and safely while keeping local progress 100% functional.
- **Session Teardown & Clean Logout**:
  - Progress is safely isolated per user account.
  - On logout, user state transitions smoothly without destructive data loss.

---

## 14. Modern Language Learning App Onboarding & First-Run Experience

To ensure an inviting, frictionless introduction matching top modern language learning apps (Duolingo, Busuu, Babbel), Voca provides an immersive 3-step onboarding flow designed specifically for mobile and desktop.

### 14.1. Core Principles & Flow
- **Responsive Immersive Presentation**:
  - **Mobile (`≤ 768px`)**: Renders as an edge-to-edge, native **fullscreen** experience (`100dvh`) with native top and bottom safe-area insets (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`), eliminating bottom-sheet clipping and drawer handles.
  - **Desktop (`> 768px`)**: Renders as an elegant centered modal card (`max-width: 520px`, `height: 640px`) with smooth backdrop blur (`backdrop-filter: blur(8px)`).
- **Step 1: Target Learning Language**:
  - Four spacious language cards (Japanese 🇯🇵, Chinese 🇨🇳, Korean 🇰🇷, English 🇬🇧) featuring circular flags, native script, localized feature taglines (e.g. furigana, pinyin, K-drama dialogues), and animated checkmark radios.
- **Step 2: Starting Level Calibration**:
  - Three calibrated proficiency tiers (Beginner 🌱, Intermediate 🌿, Advanced 🌳) displaying real official exam badges (JLPT `N5-N4`–`N1`, HSK `1-2`–`6`, TOPIK `1`–`6`, CEFR `A1-A2`–`C2`) and clear audience descriptions.
  - Persists directly into `settings.preferredLevel` and immediately filters video recommendations (`videoLevelFilter`).
- **Step 3: Subtitle Translation (Native Language)**:
  - Five clean cards for configuring dual subtitles into the learner's native tongue (English, Tiếng Việt, 日本語, 한국어, 中文), auto-detected from browser UI locale.
- **Navigation & Sticky Action Bar**:
  - **Top Bar**: Back button (when step > 1), animated progress bar (33% → 66% → 100%), and unobtrusive "Skip / Explore First" button.
  - **Sticky Bottom Action Bar**: Big full-width 52px button ("Continue →" on steps 1–2, "Start Learning ✨" on step 3) anchored in the thumb zone with safe-area padding.
- **Progressive In-Player Coachmark**:
  - Floating pill above subtitle line on first video playback (*"💡 Tap any word to translate & save"*), with responsive sizing and dynamic container headroom (`.has-coachmark`) to prevent token clipping. Permanently dismissed upon word or grammar interaction, or manual close.



