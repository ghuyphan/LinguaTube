# System Architecture & Component Map

This document details the architectural layout, component hierarchy, data flow pathways, and execution lifecycle across **Voca** (formerly LinguaTube).

---

## 1. High-Level Architecture Topology

```mermaid
graph TB
    subgraph Client["Frontend Client (Angular 19 PWA)"]
        UI[Angular UI Shell / Standalone Components]
        State[Signal State Stores]
        Repos[Offline-First Repositories]
        IDB[(IndexedDB: lingua-tube-cache & LocalStorage)]
    end

    subgraph Edge["Cloudflare Pages Functions (Edge Workers)"]
        MW_Bot[Bot Defense Middleware]
        MW_Rate[Distributed Rate Limiter]
        MW_Auth[PocketBase JWT Validator]
        
        API_Transcript["/api/transcript"]
        API_Dict["/api/dict"]
        API_Tokens["/api/tokenize/:lang"]
        API_TokensBatch["/api/tokenize-batch/:lang"]
        API_Dual["/api/dual-subtitles"]
        API_TranslateSingle["/api/translate/[[path]]"]
        API_TranslateBatch["/api/translate/batch"]
        API_VideoInfo["/api/video-info"]
        API_VideoLevel["/api/video-level"]
        API_RecommendedVideos["/api/recommended-videos"]
        API_Leaderboard["/api/leaderboard"]
        API_Diamonds["/api/diamonds"]
        API_PayOrder["/api/payment/create-order"]
        API_PayStatus["/api/payment/check-status"]
        API_PayWebhook["/api/payment/webhook"]
        API_Proxy["/proxy/[service]"]
    end

    subgraph CloudflareData["Cloudflare Infrastructure"]
        D1[(Cloudflare D1 SQLite: video_languages, leaderboard, no_transcript_cache, video_meta)]
        R2[(Cloudflare R2: transcripts/ & translations/)]
        KV[(Cloudflare KV: ratelimit, tokens, video-info, trbatch, pay_orders)]
    end

    subgraph External["External Services & APIs"]
        YouTube[YouTube IFrame API / TimedText]
        Supadata[Supadata Native Captions]
        Gladia[Gladia AI Transcription]
        Turnstile[Cloudflare Turnstile CAPTCHA]
        PocketHost[PocketBase Server voca.pockethost.io]
        DictAPIs[Jotoba / Mazii / Naver / MDBG / Glosbe]
        Lingva[Lingva Translate API]
        GoogleGTX[Google Translate GTX]
        PayOS[payOS VietQR Open Banking API]
    end

    subgraph DevServer["Local Development Server (Port 3001)"]
        ExpressApp[Express 5 Server server/server.js]
        Innertube[youtubei.js Innertube Client]
        LocalDiskCache[(server/transcripts_cache/)]
    end

    UI --> State
    State --> Repos
    Repos <--> IDB
    Repos <--> PocketHost
    
    UI --> Edge
    UI -.->|Local Dev Proxy via proxy.conf.json| DevServer
    DevServer --> Innertube
    DevServer --> LocalDiskCache
    
    Edge --> CloudflareData
    
    API_Transcript --> R2
    API_Transcript --> D1
    API_Transcript --> Supadata
    API_Transcript --> Gladia
    API_Transcript --> Turnstile
    
    API_Dict --> KV
    API_Dict --> DictAPIs
    
    API_Dual --> R2
    API_Dual --> Lingva
    API_Dual --> GoogleGTX
    
    API_TranslateSingle --> Lingva
    API_TranslateSingle --> GoogleGTX
    API_TranslateBatch --> KV
    API_TranslateBatch --> Lingva
    
    API_VideoInfo --> D1
    API_VideoInfo --> KV
    API_VideoLevel --> D1
    API_RecommendedVideos --> D1

    API_PayOrder --> PayOS
    API_PayOrder --> KV
    API_PayStatus --> KV
    API_PayStatus --> PayOS
    API_PayWebhook --> KV
    API_PayWebhook --> PocketHost
    PayOS -.->|Webhook Notification| API_PayWebhook
```

---

## 2. Frontend Component Hierarchy & Routing

Voca uses Angular 19 Standalone Components with deferred loading and dynamic imports.

```mermaid
graph TD
    App[AppComponent - Shell & Navigation]
    
    App --> Sidebar[SidebarComponent]
    App --> SettingsSheet[SettingsSheetComponent]
    App --> StreakDialog[StreakDialogComponent]
    App --> CreditsDialog[AiCreditsDialogComponent]
    App --> AchievementsDialog[AchievementsDialogComponent - Gamification & XP]
    App --> Onboarding[OnboardingComponent]
    App --> CommandPalette[CommandPaletteComponent]
    App --> BottomSheet[BottomSheetComponent]
    App --> Toast[ToastComponent - Mobile-Native Status Capsule]
    App --> RouterOutlet[<router-outlet>]
    
    RouterOutlet -->|/video| VideoPage[VideoPageComponent]
    RouterOutlet -->|/dictionary| DictPage[DictionaryPageComponent]
    RouterOutlet -->|/study| StudyPage[StudyPageComponent]
    RouterOutlet -->|/explore| PlaylistPage[PlaylistPageComponent]
    RouterOutlet -->|/history| HistoryPage[HistoryPageComponent]

    subgraph VideoPageChildren["Video Page Domain"]
        VideoPage --> VideoPlayer[VideoPlayerComponent]
        VideoPage --> SubtitleDisplay[SubtitleDisplayComponent]
        VideoPage --> WordPopup[WordPopupComponent]
        VideoPage --> GrammarPopup[GrammarPopupComponent]
        VideoPage --> VocabList[VocabularyListComponent]
        VideoPage --> PlaylistPanel[PlaylistPanelComponent]
    end

    subgraph VideoPlayerChildren["Video Player Subcomponents"]
        VideoPlayer --> VideoHeader[VideoHeaderComponent]
        VideoPlayer --> CenterControls[CenterControlsComponent]
        VideoPlayer --> ProgressBar[ProgressBarComponent]
        VideoPlayer --> BottomBar[VideoBottomBarComponent]
        VideoPlayer --> FullscreenSubtitle[FullscreenSubtitleComponent - Draggable Bar]
        VideoPlayer --> PlayerSettings[PlayerSettings Overlay / DualSub Menu]
    end

    subgraph StudyPageChildren["Study Page Domain"]
        StudyPage --> StudyMode[StudyModeComponent - SM-2 SRS Flashcards]
        StudyPage --> QuizInput[QuizInputComponent]
    end
```

---

## 3. Data Flow Sequences

### 3.1. Video Transcript Discovery & AI Fallback Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Player as VideoPageComponent
    participant TS as TranscriptService (Client)
    participant Edge as /api/transcript (Edge)
    participant R2 as Cloudflare R2
    participant D1 as Cloudflare D1
    participant Supa as Supadata Provider
    participant Gladia as Gladia AI Engine

    User->>Player: Paste YouTube URL / Select Video
    Player->>TS: fetchTranscript(videoId, lang)
    TS->>TS: Check Memory & IndexedDB Cache (lingua-tube-cache)
    alt Hit in IndexedDB / Memory
        TS-->>Player: Return Cached Subtitle Cues
    else Miss
        TS->>Edge: POST /api/transcript { videoId, lang }
        Edge->>Edge: Validate Bot & Rate Limits
        Edge->>R2: Check transcripts/{videoId}/{lang}.json
        alt Found in R2
            R2-->>Edge: Return JSON segments
            Edge-->>TS: 200 OK (Source: cache)
        else Not in R2
            Edge->>D1: Check no_transcript_cache
            Edge->>Supa: Fetch Native Captions
            alt Native Captions Available
                Supa-->>Edge: Return Timed Segments
                Edge->>R2: Async Save to R2
                Edge->>D1: Async Record in video_meta & video_languages
                Edge-->>TS: 200 OK (Source: native)
            else No Native Captions
                Edge->>D1: Mark no_transcript_cache (D1)
                Edge-->>TS: 200 OK { errorCode: 'NO_NATIVE', whisperAvailable: true }
                TS-->>Player: Display "No Subtitles - AI Available" UI
                User->>Player: Click "Generate with AI" (Solve Turnstile)
                Player->>TS: generateWithAI(videoId, lang, token)
                TS->>Edge: POST /api/transcript { videoId, lang, preferAI: true, turnstileToken }
                Edge->>Edge: Verify Turnstile CAPTCHA & Deduct Diamond
                Edge->>Gladia: Submit Audio URL (https://youtube.com/watch?v=...)
                Gladia-->>Edge: Return result_url (Async Job)
                Edge-->>TS: 200 OK { status: 'processing', resultUrl }
                loop Every 4 seconds
                    TS->>Edge: POST /api/transcript { resultUrl }
                    Edge->>Gladia: Poll result_url
                end
                Gladia-->>Edge: Transcription Done
                Edge->>R2: Save AI Transcript to R2
                Edge-->>TS: 200 OK (Source: ai, segments)
            end
        end
        TS-->>Player: Render Cues in SubtitleDisplayComponent
    end
```

---

### 3.2. Tokenization, Romaji & Multi-Source Dictionary Lookup Flow

```mermaid
sequenceDiagram
    autonumber
    actor Learner
    participant SubDisplay as SubtitleDisplayComponent
    participant SubService as SubtitleService
    participant Grammar as GrammarService
    participant DictService as DictionaryService
    participant DictAPI as /api/dict Endpoint
    participant Upstream as Upstream Dictionary (Jotoba / Mazii / Naver)
    participant GTX as Google Translate (GTX Fallback)

    Learner->>SubDisplay: View Subtitle Line
    SubDisplay->>SubService: getTokens(cue, lang)
    alt Japanese (ja)
        SubService->>SubService: Morphological Analysis via Kuromoji (Token + Reading + Romaji modes)
    else English (en)
        SubService->>SubService: Compromise NLP (Morphology + POS + Lemmatization baseForm)
    else Korean / Chinese (ko / zh)
        SubService->>SubService: Intl.Segmenter + Pinyin / Hangul Romanization
    end
    SubDisplay->>Grammar: detectGrammarPatterns(tokens, lang)
    Grammar-->>SubDisplay: Highlight matched grammar patterns
    
    Learner->>SubDisplay: Click on Word Token (e.g., "勉強")
    SubDisplay->>DictService: searchWord(word, fromLang, toLang)
    DictService->>DictAPI: GET /api/dict?word=勉強&from=ja&to=en
    DictAPI->>DictAPI: Check In-Memory Negative Cache & KV
    alt Cache Miss
        DictAPI->>Upstream: Query Primary Provider (e.g. Jotoba for ja-en)
        alt Upstream Found Entries
            Upstream-->>DictAPI: Parse definitions, reading, JLPT
        else Upstream Returns Empty
            DictAPI->>Upstream: Query Fallback (Jisho)
            opt No direct target lang entry
                DictAPI->>GTX: Translate definitions from EN -> Target UI Lang
            end
        end
        DictAPI->>DictAPI: Write to KV (7 day TTL)
    end
    DictAPI-->>DictService: Return Normalized DictionaryEntry[]
    DictService-->>SubDisplay: Display WordPopupComponent (Meanings, Readings, Examples, Circle Flags)
```

---

### 3.3. Offline-First Vocabulary & Cloud Sync Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Popup as WordPopupComponent
    participant Repo as OfflineVocabularyRepository
    participant Storage as LocalStorage / StorageService
    participant PB as PocketBaseService (voca.pockethost.io)

    User->>Popup: Click "+ Add to Vocabulary"
    Popup->>Repo: addWord(word, meaning, lang, reading, sentence)
    Repo->>Repo: Generate Deterministic ID: base64(userId + '|' + word + '|' + lang).slice(0,15)
    Repo->>Storage: Persist to LocalStorage linguatube_vocabulary (Instant, optimistic)
    Repo->>Repo: Update vocabulary$ Signal & recalculate stats
    alt User is Logged In & Online
        Repo->>PB: Push single item / Background Sync
        PB-->>Repo: Saved successfully
    else Offline
        Note over Repo,Storage: Queued locally. Syncs on next login or online event
    end

    opt User Completes Study Flashcard Session
        User->>Repo: markReviewed(id, quality 0..5)
        Repo->>Repo: Run SM-2 Spaced Repetition (Update EaseFactor, Interval, NextReviewDate)
        Repo->>Storage: Persist updated item
    end
```

---

### 3.4. payOS VietQR Pro & Premium Upgrade Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Dialog as ProUpgradeDialogComponent
    participant PayService as PaymentService (Client)
    participant CreateAPI as /api/payment/create-order
    participant PayOS as payOS Open Banking Gateway
    participant StatusAPI as /api/payment/check-status
    participant WebhookAPI as /api/payment/webhook
    participant KV as Cloudflare KV
    participant PB as PocketBase Server

    User->>Dialog: Select Plan (Pro or Premium) & Click "Upgrade"
    Dialog->>PayService: createOrder(planId: 'pro_1m' | 'premium_1m' | ...)
    PayService->>CreateAPI: POST /api/payment/create-order (Bearer Token via authInterceptor)
    CreateAPI->>PayOS: Generate Payment Link with HMAC-SHA256
    PayOS-->>CreateAPI: Return orderCode & qrCode URL
    CreateAPI->>KV: Cache order details & plan tier (TTL 15 min)
    CreateAPI-->>PayService: Return PaymentOrderInfo
    PayService-->>Dialog: Display VietQR Card & Start 3s Polling
    
    par Banking App Payment & Webhook
        User->>PayOS: Scan VietQR & Transfer via Banking App
        PayOS->>WebhookAPI: POST /api/payment/webhook (HMAC Signature)
        WebhookAPI->>WebhookAPI: Verify HMAC-SHA256 Signature
        WebhookAPI->>KV: Check Idempotency (order_processed:orderCode)
        WebhookAPI->>PB: Upgrade User (subscription_tier=tier, diamonds=10 or 25)
        WebhookAPI->>KV: Mark order_processed & update order status to PAID
    and Client Polling
        loop Every 3s (up to 5 min)
            PayService->>StatusAPI: GET /api/payment/check-status?orderCode=...
            StatusAPI->>KV: Read Order Status
            StatusAPI-->>PayService: Return status
        end
    end
    
    PayService-->>Dialog: Order Confirmed PAID
    PayService->>PayService: Refresh Diamonds & Tier Signals
    Dialog-->>User: Celebrate & Unlock Pro/Premium Quotas
```

---

### 3.5. Video Difficulty Level Classification & Edge Persistence Flow

```mermaid
sequenceDiagram
    autonumber
    actor Learner
    participant Player as VideoPageComponent
    participant LevelService as VideoLevelService
    participant Grammar as GrammarService
    participant Edge as /api/video-level Endpoint
    participant D1 as Cloudflare D1 (video_languages)
    participant History as HistoryService

    Learner->>Player: Load Video & Subtitles
    Player->>LevelService: assessLevel(videoId, targetLang, cues, videoMeta)
    LevelService->>LevelService: Check Local Cache & Title Fast-Path
    alt Fast-Path / Cache Hit
        LevelService-->>Player: Return Cached Proficiency Level
    else Needs Linguistic Assessment
        LevelService->>LevelService: Calculate Speech Velocity (CPM / WPM)
        LevelService->>Grammar: Scan Cues with detectGrammarPatterns()
        Grammar-->>LevelService: Return Matched JLPT/HSK/TOPIK/CEFR Patterns
        LevelService->>LevelService: Compute Weighted Score (Grammar 70% + Speech 30%)
        LevelService->>LevelService: Map to Tier (beginner, intermediate, advanced, expert)
        LevelService->>History: updateLevel(videoId, targetLang, level)
        LevelService->>Edge: POST /api/video-level { videoId, lang, level, tier }
        Edge->>Edge: Rate Limiter (60/hr) & Validation
        Edge->>D1: Update video_languages.levels JSON
        Edge-->>LevelService: 200 OK { success: true }
        LevelService-->>Player: Return Resolved LevelInfo
    end
    Player->>Player: Update VideoHeaderComponent Badge & Popover Breakdown
```

---

### 3.6. Gamification Engine & Milestone Unlock Flow

```mermaid
sequenceDiagram
    autonumber
    actor Learner
    participant Action as Video / Vocab / Study / Quiz Action
    participant Gamification as GamificationService
    participant Toast as ToastService
    participant Storage as LocalStorage (linguatube_gamification)
    participant Dialog as AchievementsDialogComponent

    Learner->>Action: Complete Video (>=80%) / Save Word / Review SRS / Pass Quiz
    Action->>Gamification: recordVideoCompleted() / recordWordSaved() / recordFlashcardReviewed()
    Gamification->>Gamification: Add Action XP (e.g. +25 XP)
    Gamification->>Gamification: Recalculate Level: floor(sqrt(XP / 100)) + 1
    alt Level Increased
        Gamification->>Toast: show({ type: 'achievement', message: '🎉 Level Up! You reached Level N' })
    end
    Gamification->>Gamification: Evaluate 19 Milestone Criteria
    alt New Achievement Unlocked
        Gamification->>Gamification: Award Achievement XP Bounty
        Gamification->>Toast: show({ type: 'achievement', message: '🏆 Unlocked: Badge Name (+XP)' })
    end
    Gamification->>Storage: Persist Updated GamificationState (Optimistic)
    Learner->>Dialog: Open Achievements (from Sidebar Header or Stats Bar)
    Dialog->>Gamification: Read userState, currentLevel, levelTitle, achievements
    Dialog-->>Learner: Display Hero XP Banner, Filter Tabs & Unlocked Badges
```

---

### 3.7. Global Leaderboard Synchronization Flow

```mermaid
sequenceDiagram
    autonumber
    actor Learner
    participant Dialog as AchievementsDialogComponent
    participant Leaderboard as LeaderboardService
    participant Gamification as GamificationService
    participant Edge as /api/leaderboard Endpoint
    participant D1 as Cloudflare D1 (leaderboard)
    participant Storage as LocalStorage (linguatube_leaderboard_cache)

    Learner->>Dialog: Switch to "Global Ranking" Tab
    Dialog->>Leaderboard: loadLeaderboard(langFilter)
    Leaderboard->>Storage: Read Cached Top 50 (Instant Render)
    Storage-->>Leaderboard: Cached Learner Records
    Leaderboard-->>Dialog: Display Top 3 Podium & Rankings
    Leaderboard->>Edge: GET /api/leaderboard?lang=...&userId=...
    Edge->>D1: Query Top 50 by XP DESC + User Rank
    D1-->>Edge: Top Learners + User Position
    Edge-->>Leaderboard: Fresh Leaderboard Data
    Leaderboard->>Storage: Cache Updated Ranks
    Leaderboard-->>Dialog: Update Podium & Sticky User Rank Bar
    opt Background Score Sync (Debounced 30s)
        Gamification->>Leaderboard: On Level-Up / Significant XP Gain
        Leaderboard->>Edge: POST /api/leaderboard { xp, level, streak, badges, targetLang }
        Edge->>D1: UPSERT INTO leaderboard (MAX(xp))
        Edge-->>Leaderboard: 200 OK { updated: true }
    end
```

---

## 4. Directory & File Responsibility Matrix

| Directory / File | Layer | Primary Responsibility |
| :--- | :--- | :--- |
| `src/app/core/services` | Core / Shared | Auth (`PocketBase`), Storage, I18n translations, Settings, Toast notifications (`ToastService`), SEO (`SeoService`), Payment (`PaymentService`), Gamification (`GamificationService`), Video Level (`VideoLevelService`), Video Recommendation (`VideoRecommendationService`), Global Leaderboard (`LeaderboardService`), PWA updates (`AppUpdateService`), PWA installation (`PwaService`), Error handler |
| `public` | Static & Discovery | PWA icons, `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `og-image.png`, `_headers` |
| `src/app/core/repositories` | Data Layer | Offline-first sync repositories for Vocab, Streaks, Playlists, History |
| `src/app/features/video` | Presentation / Logic | YouTube player wrapper, subtitle synchronization, draggable fullscreen subtitles, controls, video header level badge |
| `src/app/features/dictionary` | Linguistics | Multi-provider dictionary lookups, word popup, grammar popup |
| `src/app/features/vocabulary` | Study / Retention | Vocabulary notebook table, quick view panel, SM-2 flashcard study page |
| `src/app/features/playlist` | Organization | Custom user playlists, curated community language learning channels, difficulty level badges & filters |
| `src/app/features/history` | Analytics | Watch history, resume points, completed learning logs, difficulty level badges & filters |
| `src/app/features/quiz` | Assessment | Fill-in-the-blank and interactive vocabulary testing inputs |
| `src/app/components/achievements-dialog` | UI Shell | Modal dialog displaying XP progression, rank titles, 19 achievement badges, and Global Leaderboard podium & rankings |
| `src/app/services` | Cross-Cutting | Grammar pattern detector, Translation batch queue, Bottom sheet manager, Streaks |
| `src/app/data` | Static Data | Large CJK grammar rules, release & changelog metadata (`changelog.data.ts`) |
| `src/app/data/translations` | Localization Data | Multi-language grammar translations (16 combinations across JA, KO, ZH, EN into VI, ZH, KO, JA) |
| `functions-src/api` | Serverless Backend | Public HTTP endpoints: transcript, dict, dual-subtitles, tokenize, translate, diamonds, payment, video-info, video-level, leaderboard, recommended-videos, version |
| `functions-src/middlewares` | Security / Filtering | Rate limiting, bot defense, PocketBase token verification, video validator |
| `functions-src/providers` | External Integrations | Third-party adapters for Gladia, Supadata, Lingva, Naver, Jotoba, payOS |
| `functions-src/data` | Edge Storage Access | D1 SQLite queries (video_languages, video_meta, transcripts) and R2 S3 bucket access |
| `server/server.js` | Dev Environment | Local Express mock backend providing Innertube captions, unified dict lookup, tokenizers, payment mock |
| `server/transcripts_cache/` | Dev Cache | Local disk persistence for fetched YouTube transcripts during development |
| `scripts/build-functions.js` | Build Pipeline | Bundles `functions-src/` into Cloudflare Pages `functions/` via esbuild |
| `scripts/merge-translations.js` | Data Pipeline | Merges translated grammar chunks into TypeScript data files |
