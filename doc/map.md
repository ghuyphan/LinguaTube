# System Architecture & Component Map

This document details the architectural layout, component hierarchy, data flow pathways, and execution lifecycle across **LinguaTube**.

---

## 1. High-Level Architecture Topology

```mermaid
graph TB
    subgraph Client["Frontend Client (Angular 19 PWA)"]
        UI[Angular UI Shell / Standalone Components]
        State[Signal State Stores]
        Repos[Offline-First Repositories]
        IDB[(IndexedDB / LocalStorage)]
    end

    subgraph Edge["Cloudflare Pages Functions (Edge Workers)"]
        MW_Bot[Bot Defense Middleware]
        MW_Rate[Distributed Rate Limiter]
        MW_Auth[PocketBase JWT Validator]
        
        API_Transcript["/api/transcript"]
        API_Dict["/api/dict"]
        API_Tokens["/api/tokenize"]
        API_Dual["/api/dual-subtitles"]
        API_VideoInfo["/api/video-info"]
        API_Diamonds["/api/diamonds"]
        API_Proxy["/proxy/[service]"]
    end

    subgraph CloudflareData["Cloudflare Infrastructure"]
        D1[(Cloudflare D1 SQLite)]
        R2[(Cloudflare R2 Transcripts)]
        KV[(Cloudflare KV Cache)]
    end

    subgraph External["External Services & APIs"]
        YouTube[YouTube IFrame API / TimedText]
        Supadata[Supadata Native Captions]
        Gladia[Gladia AI Transcription]
        Turnstile[Cloudflare Turnstile CAPTCHA]
        PocketHost[PocketBase Server voca.pockethost.io]
        DictAPIs[Jotoba / Mazii / Naver / MDBG / Glosbe]
    end

    UI --> State
    State --> Repos
    Repos <--> IDB
    Repos <--> PocketHost
    
    UI --> Edge
    Edge --> CloudflareData
    
    API_Transcript --> R2
    API_Transcript --> D1
    API_Transcript --> Supadata
    API_Transcript --> Gladia
    API_Transcript --> Turnstile
    
    API_Dict --> KV
    API_Dict --> DictAPIs
    
    API_Dual --> R2
    API_VideoInfo --> D1
    API_VideoInfo --> KV
```

---

## 2. Frontend Component Hierarchy & Routing

LinguaTube uses Angular 19 Standalone Components with deferred loading and dynamic imports.

```mermaid
graph TD
    App[AppComponent - Shell & Navigation]
    
    App --> Sidebar[SidebarComponent]
    App --> SettingsSheet[SettingsSheetComponent]
    App --> StreakDialog[StreakDialogComponent]
    App --> CreditsDialog[AiCreditsDialogComponent]
    App --> Onboarding[OnboardingComponent]
    App --> CommandPalette[CommandPaletteComponent]
    App --> BottomSheet[BottomSheetComponent]
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
        VideoPlayer --> FullscreenSubtitle[FullscreenSubtitleComponent]
    end

    subgraph StudyPageChildren["Study Page Domain"]
        StudyPage --> StudyMode[StudyModeComponent - SM2 SRS Flashcards]
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
    TS->>TS: Check Memory & IndexedDB Cache
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
                Edge->>D1: Async Record in video_meta
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

### 3.2. Tokenization & Multi-Source Dictionary Lookup Flow

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
        SubService->>SubService: Morphological Analysis via Kuromoji (Token + Reading + Romaji)
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
    DictService-->>SubDisplay: Display WordPopupComponent (Meanings, Readings, Examples)
```

---

### 3.3. Offline-First Vocabulary & Cloud Sync Flow

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant Popup as WordPopupComponent
    participant Repo as OfflineVocabularyRepository
    participant Storage as LocalStorage / IndexedDB
    participant PB as PocketBaseService (voca.pockethost.io)

    User->>Popup: Click "+ Add to Vocabulary"
    Popup->>Repo: addWord(word, meaning, lang, reading, sentence)
    Repo->>Repo: Generate Deterministic ID: base64(userId + '|' + word + '|' + lang).slice(0,15)
    Repo->>Storage: Persist to LocalStorage (Instant, optimistic)
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

## 4. Directory & File Responsibility Matrix

| Directory | Layer | Primary Responsibility |
| :--- | :--- | :--- |
| `src/app/core/services` | Core / Shared | Auth (`PocketBase`), Storage, I18n translations, Settings, Error handler |
| `src/app/core/repositories` | Data Layer | Offline-first sync repositories for Vocab, Streaks, Playlists, History |
| `src/app/features/video` | Presentation / Logic | YouTube player wrapper, subtitle synchronization, gesture handling, keyboard shortcuts |
| `src/app/features/dictionary` | Linguistics | Multi-provider dictionary lookups, word popup, grammar popup |
| `src/app/features/vocabulary` | Study / Retention | Vocabulary notebook table, quick view panel, SM-2 flashcard study page |
| `src/app/features/playlist` | Organization | Custom user playlists and curated community language learning channels |
| `src/app/features/history` | Analytics | Watch history, resume points, completed learning logs |
| `src/app/features/quiz` | Assessment | Fill-in-the-blank and interactive vocabulary testing inputs |
| `src/app/services` | Cross-Cutting | Grammar pattern detector, Translation queue, Bottom sheet manager, Streaks |
| `src/app/data` | Static Data | Large CJK grammar rules and offline dictionary fallbacks |
| `functions-src/api` | Serverless Backend | Public HTTP endpoints for Cloudflare Pages Functions |
| `functions-src/middlewares` | Security / Filtering | Rate limiting, bot defense, PocketBase token verification, video validator |
| `functions-src/providers` | External Integrations | Third-party adapters for Gladia, Supadata, Lingva, Naver, Jotoba |
| `functions-src/data` | Edge Storage Access | D1 SQLite queries and R2 S3-compatible bucket reader/writer |
| `server/server.js` | Dev Environment | Local Express mock backend providing Gladia, MDBG, Naver, and tokenizer APIs |
