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
- **Auto-Pause on Hover / Click**:
  When a user hovers over or clicks an interactive subtitle word to inspect its definition, video playback pauses automatically to prevent the learner from falling behind.

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
| **Toggle Fullscreen** | `f` | Pinch Out / Rotate | Bottom bar fullscreen button |
| **Move Subtitle Top / Bottom** | `v` | Double-Tap Drag Handle | Fullscreen subtitle handle |
| **Nudge Subtitle Up / Down** | `[` / `]` | — | Fullscreen subtitle position |
| **Cycle Subtitle Size** | `Shift` + `s` | — | Subtitle font size toggle |
| **Playback Speed** | `Shift` + `<` / `>` | — | Speed dropdown (0.5x – 2x) |

### 1.4. Draggable Fullscreen Subtitles
When in fullscreen mode, subtitles are rendered in `FullscreenSubtitleComponent`:
- **Computed `viewTokens` Pre-computation**: Subtitle tokens, reading annotations, display text, and vocabulary mastery levels are pre-calculated in a single `viewTokens = computed(...)` signal per cue change. This eliminates repeated O(N) vocabulary repository method calls and grammar index scans in `@for` template loops during 60fps fullscreen video playback.
- **Ergonomic Drag Handle & Card Dragging**: A centered pill handle bar with a generous touch hit box ($\ge 32\text{px}$) along with the entire subtitle card background (outside interactive words) allows users to drag subtitles smoothly to any vertical position (`--sub-y: 8%` to `88%`).
- **Smooth Pointer Capture & True Free Placement**: Uses `PointerEvent` tracking with `requestAnimationFrame` updates to ensure 60fps responsiveness across mobile and desktop. Dragging is completely free without forced snapping locks, allowing precise subtitle placement anywhere between $8\%$ and $88\%$.
- **Natural Lower Resting Position**: Subtitles default to `84%` height (moved down from 78%), sitting naturally near the bottom edge without floating excessively high.
- **Instant Top/Bottom Toggle**: Tapping the handle bar (or pressing `v`) toggles between the top anchor (`12%`) and bottom anchor (`84%`).
- **No Jump Discontinuity**: Subtitle position stays completely stable regardless of whether player controls are shown or hidden.
- **Mobile Landscape & Safe-Area Optimization**:
  - Employs `@media (max-height: 520px) and (orientation: landscape)` queries for proportional typography, preventing subtitles from blocking the video frame on phones.
  - Adheres to `env(safe-area-inset-left)` and `env(safe-area-inset-right)` for notched displays.
  - Desktop widescreen constraint caps max width at `min(90%, 960px)` for comfortable eye scanning.
- **Full Dictionary Parity in Fullscreen**:
  - Interactive words tap directly into `WordPopupComponent`, providing full definitions, definition translations, vocabulary mastery level picking, and audio pronunciation without leaving fullscreen mode.
  - Touch and click event isolation prevents touches on words, punctuation, or card background from inadvertently toggling player controls or pausing playback.

---

## 2. Interactive Subtitles & Tokenization Engine

### 2.1. Sticky Subtitle Synchronization Algorithm
Standard subtitle displays flicker or disappear during small natural pauses in speech. Voca implements a **Sticky Subtitle** algorithm:
1. Performs an $O(\log n)$ binary search (`findActiveCue`) to find the cue matching `currentTime`.
2. If no active cue matches (e.g. speech gap), `findStickyCue` locates the most recent ended cue within a $0.1$s tolerance window.
3. The cue remains visible until the next subtitle segment begins or playback advances beyond a maximum threshold.

### 2.2. Morphological Tokenization & Phonetics
Subtitles are segmented into interactive tokens using language-specific NLP:
- **Japanese (`ja`)**:
  - Analyzed by `@patdx/kuromoji` using IPAdic dictionaries loaded on demand via CDN.
  - Generates token surface forms, base dictionary forms, parts of speech, and Hiragana readings.
  - **5 Reading Display Modes**:
    1. `native`: Clean Japanese script.
    2. `annotated`: Ruby Furigana (`<ruby>漢<rt>かん</rt></ruby>`).
    3. `reading`: Kana reading only.
    4. `annotatedRomanized`: Kanji with Hepburn Romaji annotations.
    5. `romanized`: Hepburn Romaji only.
  - **Height & Baseline Alignment (Zero-Shift Ruby)**: When reading annotations are enabled, non-kanji words AND punctuation tokens (`、`, `。`, `,`, `.`, `...`) are wrapped in `<ruby>` with an invisible spacer `<rt class="rt-empty">&#160;</rt>` and standardized `vertical-align: baseline`. This guarantees 100% identical card height and uniform baseline alignment across all words and punctuation in the sentence, eliminating vertical misalignment and jagged baseline jumps across Japanese, Chinese, Korean, and English.
- **Chinese (`zh`)**:
  - Segmented using `Intl.Segmenter('zh', { granularity: 'word' })`.
  - Pinyin annotations generated via `pinyin-pro` with tone diacritics (e.g. `nǐ hǎo`).
- **Korean (`ko`)**:
  - Space-delimited and segment-analyzed via `Intl.Segmenter('ko')`.
  - Romanization computed using `hangul-romanization`.
- **English (`en`)**:
  - Segmented into word tokens and punctuation boundaries via `Intl.Segmenter('en')`.
- **Bulk Batch Tokenization & Zero Playback Overhead**:
  - `SubtitleService` processes subtitle cues in bulk batches of up to 500 texts on initial video load. For virtually all videos ($\le 500$ cues), the entire video requires **only 1 API call**.
  - No network requests are made during video playback; time updates use $O(\log n)$ binary search over cached cues.
  - Forward's the user's PocketBase auth token to access higher rate limit tiers (100–1,000 req/hr).
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
    C --> D[System Checks Diamond Credit Balance >= 1]
    D --> E[Server submits YouTube URL to Gladia API v2]
    E --> F[Deduct Diamond Credit & Store Pending Job in D1]
    F --> G[Client Polls /api/transcript every 4s]
    G --> H{Gladia Status?}
    H -->|processing| G
    H -->|done| I[Convert Utterances to SubtitleCue Segments]
    H -->|error / failed| R[Auto-Refund Diamond Credit via PocketBase]
    I --> J[Save to Cloudflare R2 Bucket]
    J --> K[Render Interactive Subtitles on Player]
```

- **SSRF Hardening**: The polling endpoint validates that all `result_url` inputs match `https://api.gladia.io/` strictly.
- **Duration Limits**: Restricted to videos $\le 20$ minutes.
- **Automated Failure Refund**: If Gladia job execution fails or errors out during transcription, the server immediately triggers `refundDiamond()`, returning the deducted Diamond credit back to the user without manual support intervention.
- **Cost Scaling**:
  - $\le 10$ minutes: **1 Diamond credit**
  - $> 10$ minutes (up to 20 mins): **2 Diamond credits**

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
  - **Scrollable Subtitle List (`.subtitle-list`)**: Each cue item (`.cue-item`) displays both primary text (`.cue-text`) and translated text (`.cue-translation-text`) in vertical stack (`.cue-body`).
- **Dynamic Subtitle Language Detection (`detectSubtitleLanguage`)**: Subtitle cues are sampled using Unicode character block analysis (`\p{Script=Han}`, `\p{Script=Hiragana}`, `\p{Script=Hangul}`) to accurately determine the authentic video subtitle language. This prevents mismatches when user settings language differs from video subtitle language.
- **Source/Target Inversion Prevention**: Target language selection strictly avoids collision with the active subtitle language, falling back to the user's interface language or alternate language to ensure translations are never identical to the source.
- **Cache-First & Progressive High-Speed Batch Translation**:
  - Checks server/R2 cache first (`onlyCache: true`) without requiring segment payloads.
  - On cache miss, immediately translates initial cues via direct edge Google GTX (~150ms-1.5s vs 7s+ on dead proxies) so learners experience near-instant playback response.
  - Progressively translates upcoming cues in batches of 50 with a 25-cue lookahead buffer and reactive pipelining as playback advances.
  - On user seeks or clicks in the subtitle list, any stale in-flight batch is automatically cancelled and the seek position's cues are translated immediately.
- **Translation Anti-Poisoning & Infinite-Loop Prevention**:
  - Failed translation requests return `null` rather than falling back to untranslated source text.
  - In-memory subtitle tracking marks all processed cues (including identical and empty) as resolved to completely eliminate infinite network retry loops on short words, sound effects, or numbers.
  - LocalStorage and R2 caches automatically sanitize and reject entries where `source !== target` but `translation === sourceText`.
  - UI templates (`subtitle-display`, `fullscreen-subtitle`) enforce equality guards (`translation.trim() !== cue.text.trim()`) to prevent rendering duplicate identical lines.
  - If $< 80\%$ of segments translate successfully, remote caching is refused to prevent bad data persistence.
- **Permanent Caching & Long Video Support**: Successful translations are saved to Cloudflare R2 (`translations/{videoId}/{sourceLang}_{targetLang}.json`) and indexed in D1. Supports long videos with over 1,000 cues (up to 10,000 cues) without payload truncation.
- **Track & Language Switch Reactivity**: Tracks changes in subtitle track (`cues`), source language, and target language, cleanly re-initializing dual subtitles when switching between native and Whisper AI captions or changing language tracks.
- **Persistent Preferences**: Dual subtitle toggle state and target language preference persist across browser sessions in `localStorage`.

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

- **Authentic Dictionary Pronunciation**: Rather than using synthetic browser Web Speech API (`speechSynthesis`), audio is sourced directly from authentic native recordings from upstream dictionary providers (Naver, Mazii, FreeDictionary, Jotoba, KRDict).
- **Context-Aware CJK Kanji Detection**: When inspecting pure ideographs (`\u4E00-\u9FFF` without Kana or Hangul), `DictionaryService.detectLanguage()` checks the user's active learning language (`settings.language`) so Japanese learners query Japanese dictionaries (Jotoba/Mazii) rather than erroneously defaulting to Chinese dictionaries.
- **Isolated Screen State**: Standalone dictionary searches are decoupled from in-video subtitle clicks, ensuring subtitle queries never leak into or overwrite standalone search history or panels.
- **Multi-Entry Disambiguation**: When queries match multiple dictionary entries or homonyms, tabbed selectors allow learners to explore all matching entries.
- **Integrated Grammar Detection**: Searching words or grammatical stems also queries `GrammarService` to surface relevant grammar patterns, formation rules, and example sentences directly beneath definitions.
- **Word Popup UI (`WordPopupComponent`) & Smooth Height Transitions**: Hosted within `BottomSheetComponent`. When the popup opens, an initial shimmer skeleton renders instantly. As soon as dictionary definitions, translations, or example sentences resolve, the bottom sheet animates its height smoothly with the Web Animations API, eliminating jarring layout jumps.
- **Negative Caching**: Empty results are cached in an in-memory `Set` to prevent hammering external dictionary APIs.
- **Persistence**: Results cached in Cloudflare KV for 7 days, with language-scoped local search history (`linguatube_recent_searches_${lang}`).

---

## 6. Grammar Pattern Detection Engine

`GrammarService` continuously inspects tokenized sentences to identify grammatical constructions:
- **Language Coverage**:
  - **Japanese**: 1,000+ patterns across JLPT N5 through N1 (`grammar-ja.ts`).
  - **Korean**: TOPIK I and II grammar structures (`grammar-ko.ts`).
  - **Chinese**: HSK 1 through 6 grammar patterns (`grammar-zh.ts`).
  - **English**: CEFR A1 through C2 grammar rules (`grammar-en.ts`).
- **Split Pattern Handling**:
  Recognizes split correlative pairs (e.g. `虽然...但是...`, `not only...but also...`, `either...or...`).
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
   $$\text{If } q \ge 3: \quad \begin{cases} I_1 = 1 \text{ day} & \text{if repetitions} = 0 \\ I_2 = 6 \text{ days} & \text{if repetitions} = 1 \\ I_n = \lceil I_{n-1} \times EF \rceil & \text{if repetitions} \ge 2 \end{cases}$$

2. **Ease Factor ($EF$)**:
   $$EF' = \max(1.3, \; EF + (0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02)))$$

3. **Status Transitions**:
   - `new` $\rightarrow$ `learning` on first successful recall ($q \ge 3$).
   - `learning` $\rightarrow$ `known` once `repetitions >= 3`.

4. **Interval Preview Badges on Buttons**:
   - Using `calculateSRSPreview()`, answer buttons preview their exact calculated schedule in real time:
     - **Again (1)**: `<10m`
     - **Hard (2)**: `1d`
     - **Good (3)**: e.g. `3d` or `6d`
     - **Easy (4)**: e.g. `6d` or `2w`

### 7.2. Session Queue Recycling (Zero Forgotten Cards)
To guarantee true memory retention, cards rated "Again" ($q < 3$) are **re-queued at the end of the current session**. The session only concludes when all cards have been successfully recalled, eliminating the frustration of ending a session with failed items left unreinforced. A "Review Missed" button is also provided on the completion screen for rapid second-pass review.

### 7.3. Authentic Video Scene Jump
Every mined card captures `sourceSentence`, `sourceVideoId`, and `sourceTimestamp`. While studying, learners can tap **`[▶ Watch Scene]`** (or press key `V`) to jump directly to the exact millisecond in the authentic YouTube video where the phrase occurred.

### 7.4. Reading Spoiler Prevention & Peek Mode
To prevent passive phonetic cheating during Kanji/Hanzi recall, furigana and pinyin are **strictly hidden on the front of flashcards by default**, even if globally enabled for video subtitles. Learners who are stuck can click a subtle **"Peek reading"** button (or press `P`) for temporary assistance, while the answer face displays the full phonetic reading alongside the definitions.

### 7.5. Cloze Deletion (Fill-in-the-Blank) Sentence Practice
When "Cloze Mode" is toggled, the focus word is masked inside the context sentence (`【 ... 】`) on the front of the card. Learners recall the word from its sentence context rather than as an isolated vocabulary token.

### 7.6. Audio Auto-Play on Reveal
Learners can enable "Auto-play audio" in study settings to have authentic dictionary or TTS audio automatically trigger the moment a flashcard is flipped, training auditory comprehension concurrently with visual recall.

### 7.7. Desktop Live Session Dashboard & Keyboard Ergonomics
- **Live Sidebar Monitor**: During active study, the desktop sidebar dynamically morphs into an active session monitor displaying cards remaining in queue, live accuracy percentage, elapsed time, and a keyboard shortcuts cheat-sheet (`Space` to flip, `1-4` to grade, `R` to replay audio, `P` to peek, `V` to open scene).
- **Mobile Swipe Physics**: Enhanced swipe gestures with rotation physics and watermark feedback tags (red "Again" on left swipe, green "Good" on right swipe).

### 7.8. Streamlined Architecture & Memory Optimizations
- **Shared Reactive State**: Daily goal progress (`goalProgress`) and due-card count calculations (`getDueCountByLanguage`) are unified in `VocabularyService`, eliminating duplicate filter closures between study components and sidebars.
- **Zero-Wrapper Card Queue**: The study queue directly processes `VocabularyItem` arrays without wrapper object allocations during session initialization, failed-card recycling, or missed-card re-study.
- **Full Metadata Undo Restoration**: When a user undoes a word deletion from the notebook, all captured sentence context, audio references, source video ID, and timestamp offsets are restored without data loss.

---

## 8. Gamified Streaks & Freeze Inventory

- **Daily Tracking**: Practicing (watching videos, completing flashcard reviews) records an activity entry for the current UTC date.
- **Streak Freezes**:
  - Users have an inventory of up to 2 Streak Freezes.
  - If a user misses exactly 1 day, a freeze is consumed automatically to protect their streak.
  - Milestones at 7, 30, and 100 days reward an extra streak freeze.
- **PocketBase Server Cron (`streaks.pb.js`)**:
  A server-side webhook checks active streaks daily, consuming freezes or resetting streaks if inactive for $>1$ day.

---

## 9. Playlist & Study Queue Architecture

- **Multi-Source Playlists**: Supports user-created custom playlists, curated Community Playlists (e.g., JLPT/TOPIK/HSK listening collections), and PocketBase cloud sync.
- **Responsive Video Screen Presentation**:
  - **Desktop Unified Sidebar (`.unified-sidebar`)**: Houses a segmented control tab switcher toggling between `Playlist (N)` and `Vocabulary (N)`. Uses `.hidden` styling instead of template recreation to eliminate layout shifts when switching tabs. When a playlist has only 1 video, the playlist tab is retained on desktop to allow playlist management (editing, sharing, closing, or navigating).
  - **Mobile Playlist Bar (`.mobile-playlist-card`) & YouTube-Style Bottom Sheet**:
    - Sits directly below the video player as a sleek, non-expanding compact bar (~48px) displaying playlist title, author, index/total, and quick action buttons (Share, Loop, Shuffle, Chevron).
    - **Zero Layout Shift (0% CLS)**: Tapping the bar or chevron opens a modal `<app-bottom-sheet>` instead of expanding in-flow. The video player and subtitles beneath it remain stationary and completely undisturbed.
    - Inside the bottom sheet, the user can reorder videos (cdkDrag if owner), switch videos, toggle loop/shuffle, share, or open individual video options. Selecting a video automatically closes the sheet and navigates to the video.
  - **Navigation Guarding**: Playlist previous (`canPlayPrev`) and next (`canPlayNext`) actions are disabled when `videos.length <= 1` (unless playlist loop mode is toggled), preventing dead interactions.
- **Dual "For You" Home Dashboard ("Dành cho bạn" / "For You")**:
  - When no video is currently loaded, the Home Dashboard features a segmented control switching seamlessly between:
    1. **Recommended Videos (`homeTab = 'videos'`)**: Bite-sized single videos with verified transcripts stored in the database.
    2. **Featured Playlists (`homeTab = 'playlists'`)**: Curated multi-video learning collections.
- **Verified Database Transcript Video Recommendations (`VideoRecommendationService`)**:
  - Solves the cold-start problem: learners don't need a YouTube URL ready on their clipboard to start practicing.
  - **Pre-Processed & Instant (<100ms)**: Videos are sourced from Cloudflare D1 (`video_languages`) and R2 permanent transcripts. Zero scraping delay, zero risk of missing captions, and zero AI Diamond credit consumption.
  - **Server-Side Difficulty Level Filtering**: Supports querying by proficiency tier (`GET /api/recommended-videos?lang={lang}&tier={tier}&limit=12`). Resolves tiers via D1 `levels` JSON and metadata regex, ensuring a full shelf of 12 level-matched videos without sparse results.
  - **Proficiency Level & Language Alignment**: Every recommended video displays a circular SVG flag (`.circle-flag`) for its target language and its detected CEFR, JLPT, HSK, or TOPIK difficulty tier badge (`VideoLevelService`) alongside duration, channel, and an "Instant Subtitles" badge. Eliminates redundant text codes and clutter.
  - **1-Click Play**: Clicking any video immediately updates the URL query parameter (`?v=videoId`), mounts the player, and loads synchronized cues.
- **Server-Side Playlist Recommendation Engine**:
  - Automatically queries PocketBase with targeted server-side filtering (`visibility="published" && language="${lang}" && video_count >= 2`).
  - Supports proficiency tier filtering across published community playlists, matching playlist levels, tags, and titles directly against user-selected difficulty tiers.
  - Ranked on the server by `-is_featured, -save_count, -updated` to prioritize curated and popular community content while filtering out single-video test spam.
  - Automatically re-fetches when learning language or difficulty tier changes and caches results in memory per language and tier.
  - Falls back to `video_count >= 1` if a new language does not yet have multi-video collections.

---

## 10. Search Engine Optimization (SEO) & Web Discovery Architecture

- **Root Metadata & Social Protocol**:
  - `src/index.html` implements Open Graph (`og:type`, `og:title`, `og:description`, `og:image`, `og:locale`, alternate locales) and Twitter Cards (`summary_large_image`).
  - Embeds Schema.org JSON-LD structured data for `WebApplication` and `EducationalApplication`, enumerating supported languages, interactive subtitle capabilities, and free tier offers.
  - Canonical URL `<link rel="canonical">` points to `https://lingua-tube.pages.dev`.
- **Search Engine Discovery Assets**:
  - `public/robots.txt`: Explicitly permits search crawlers on learning routes (`/video`, `/dictionary`, `/study`, `/explore`, `/history`) while restricting internal serverless functions (`/api/`, `/proxy/`).
  - `public/sitemap.xml`: Declares priority and change frequencies for all public views, with `xhtml:link` multi-language `hreflang` alternates (`en`, `vi`, `ja`, `ko`, `zh`, and `x-default`).
  - `public/og-image.png`: High-resolution 1200x630 branded social share card with brand badge, typography, feature pills, and subtitle preview.
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
| **`free`** | Authenticated user (default) | 5 Diamonds | 1 credit / 15 min | $\le 10$ minutes | PocketBase record + in-memory cache |
| **`pro`** | Active Pro subscriber | 10 Diamonds | 1 credit / 10 min | $\le 20$ minutes | PocketBase record + instant sync |
| **`premium`** | Active Premium subscriber | 25 Diamonds | 1 credit / 4 min | $\le 45$ minutes | PocketBase record + instant sync |

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
- **Admin Token Memoization**: PocketBase admin authentication tokens are memoized across Worker invocations with a 45-minute lifecycle, reducing redundant authentication requests by $>99\%$.

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
  8. Server verifies webhook HMAC signature, checks idempotency via Cloudflare KV (`order_processed:{orderCode}`), upgrades the user's subscription in PocketBase (`subscription_tier = targetTier`, `diamonds = grantedDiamonds` [10 for Pro, 25 for Premium]), and sets expiry timestamp.
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
- **Video Header Pill (`VideoHeaderComponent`)**: Displays dynamic tier-colored badge (e.g. `[JLPT N3]`).
- **Interactive Breakdown Popover**: Clicking the badge reveals:
  - Difficulty tier label and description.
  - Number of advanced grammar patterns detected.
  - Speech velocity (e.g. `278 char/min` or `142 words/min`).
  - Active proficiency framework badge.
- **Learn Home Dashboard Integration (`VideoPageComponent`)**:
  - **Tier Filter Dropdown**: Allows filtering recommended videos and featured playlists by proficiency level (`All Levels`, `Beginner`, `Elementary`, `Intermediate`, `Upper Intermediate`, `Advanced`).
  - **Server-Side Dynamic Fetching**: Switching the filter triggers a background server fetch via `/api/recommended-videos?tier=...` and PocketBase, ensuring a full shelf of 12 level-matched videos without sparse results.
  - **Dual-Layer Cache**: In-memory caching in `VideoRecommendationService` and `PlaylistService` delivers zero-latency instant transitions when navigating between previously viewed levels.
- **Playlist Page Integration (`PlaylistPageComponent`)**:
  - Playlist cards and individual tracklist rows display level pills (`level-badge--pill`) styled with tier-specific hues.
  - **Level Filter Dropdown**: Filter playlists by proficiency level (`All Levels`, `Beginner`, `Elementary`, `Intermediate`, `Upper Intermediate`, `Advanced`).
  - **Server-Side Community Query**: Reloads community playlists from PocketBase with language and level parameters.
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

### 13.3. Achievements Dialog (`AchievementsDialogComponent`)
- **Dual View Mode**: Segmented tab bar allowing instant switching between **Achievements** and **Global Leaderboard**.
- **Hero Level Banner**: Displays user's current level title (Novice, Apprentice, Explorer, Scholar, Polyglot, Sage, Master, Grandmaster), total accumulated XP, and an animated radial/linear level progress bar.
- **Segmented Filter Tabs**: Filter achievements by `All`, `Immersion`, `Vocabulary`, `Streaks`, `Study/SRS`, and `Quizzes` with unlocked counter pills.
- **Visual Badge States**:
  - Unlocked: Vibrant tier gradient (Emerald, Blue, Purple, Gold), unlock timestamp, and gold trophy icon.
  - Locked: High-contrast dark surface, grayscale icon, and real-time numerical progress bar (`current / target`).
- **Real-Time Celebration**: Unlocking any achievement or leveling up triggers an immediate celebration toast capsule with the badge icon and XP bounty.

### 13.4. Global Ranking & Leaderboard System (`LeaderboardService`)
- **Top 3 Podium**:
  - Elevated central Gold pedestal (👑 #1), flanked by Silver (🥈 #2) and Bronze (🥉 #3).
  - Glowing avatar halos, level indicators, streak flames, and total XP.
- **Top 50 Ranking Stream**: Ranks 4 to 50 rendered with rank badges, nationality flags, current levels, active daily streaks, and score counters.
- **Sticky Current User Anchor Bar**: Persistently shows the logged-in or guest learner's global rank position at the bottom of the dialog, with a one-tap sync button.
- **Language Filter Chips**: Filter leaderboard rankings by target study language (`All`, `JA 🇯🇵`, `KO 🇰🇷`, `ZH 🇨🇳`, `EN 🇬🇧`).
- **Offline-First & Guest Support**:
  - Seed community benchmarks ensure immediate interactivity without network delays or blank states.
  - Generates deterministic persistent guest IDs for learners browsing without PocketBase accounts.
  - Automatically syncs XP upon login or level-up events.

### 13.5. Offline-First PocketBase Persistence (`OfflineGamificationRepository`)
- **Deterministic Entity IDs**:
  - Gamification records use a deterministic ID (`btoa(userId + ':gamification').slice(0, 15)`) adhering to PocketBase's 15-character alphanumeric ID constraint.
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
  - Remote synchronization is debounced (3 seconds) to prevent hammering PocketBase on rapid actions (e.g. rapid flashcard clicks).
  - Graceful degradation: If the `gamification` collection does not exist yet in PocketBase (HTTP 404), requests fail silently and safely while keeping local progress 100% functional.
- **Session Teardown & Clean Logout**:
  - Progress is safely isolated per user account.
  - On logout, user state transitions smoothly without destructive data loss.

