# Voca 📺 🎌 🇨🇳 🇰🇷 🇬🇧

**Turn any YouTube video into an interactive, high-retention language lesson.**

Voca (formerly LinguaTube) is a modern, immersive Progressive Web Application (PWA) designed to help you master **Japanese**, **Chinese**, **Korean**, and **English** directly from authentic video content. It combines YouTube's massive library with cutting-edge language tools: interactive clickable subtitles, instant multi-source dictionary lookups, grammar pattern detection, an SM-2 spaced repetition system (SRS), and Gladia AI-powered audio transcription.

![Angular 19](https://img.shields.io/badge/Angular-19-%23DD0031?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-%233178C6?style=flat-square&logo=typescript)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Serverless-%23F38020?style=flat-square&logo=cloudflare)
![PWA](https://img.shields.io/badge/PWA-Offline--First-%235A0FC8?style=flat-square)

---

## ✨ Key Features

### 🎬 Universal Video Support & Player Controls
- **YouTube Integration**: Paste any YouTube URL (or click curated playlists) to start learning immediately.
- **Dual-Engine Captions**: Extracts native YouTube subtitles (via Supadata in production and Innertube in local dev) with automatic language discovery.
- **Gladia AI Transcription Fallback**: For videos without native subtitles, generate timestamped, highly accurate transcripts using speech-to-text AI.
- **Sticky Subtitles**: Custom algorithm eliminates flicker between natural speech gaps, keeping cues on screen until the next phrase begins.
- **Draggable Fullscreen Subtitles**: Reposition subtitles anywhere on screen with smooth pointer-capture drag handles and instant top/bottom snap targets (12% and 82%).
- **Desktop & Mobile Controls**: Keyboard shortcuts (`Space`, `k`, `j`/`l`, `c`, `f`) and mobile gestures (swipe volume, double-tap seek).

### 🧠 Smart Linguistics & Interactive Dictionaries
- **Language-Specific Tokenization**:
  - **Japanese**: Morphological analysis via `@patdx/kuromoji` with on-demand CDN dictionary loading.
  - **Chinese**: Word boundary segmentation with `Intl.Segmenter` and `pinyin-pro` tone marks.
  - **Korean**: `Intl.Segmenter` paired with `hangul-romanization` (Revised Romanization).
  - **English**: Word and punctuation segmentation via `Intl.Segmenter`.
- **Reading Display Modes**: Choose between **Native**, **Annotated Ruby** (Furigana/Pinyin), **Reading Only**, **Annotated Romanized**, or **Romanized** (Hepburn Romaji).
- **Multi-Source Hybrid Dictionary**:
  - Click any subtitle token for instant definitions, readings, audio pronunciations, and level indicators (JLPT, HSK, TOPIK).
  - Backed by Jotoba, Mazii, Naver (En/Ko/Vi), MDBG, FreeDictionary, and Glosbe with automatic Google Translate GTX fallback.
- **Grammar Pattern Recognition**:
  - Automatically identifies grammatical structures across **Japanese** (JLPT N5–N1), **Korean** (TOPIK I–II), **Chinese** (HSK 1–6), and **English** (CEFR A1–C2).
  - Includes multi-language explanations (translated into Vietnamese, Chinese, Japanese, Korean, and English) and native-to-native explanations (`ja_ja`, `ko_ko`, `zh_zh`).
- **Dual-Language Subtitles**: Display learning subtitles alongside translated subtitles in English, Vietnamese, Japanese, Korean, or Chinese with quick flag switching.

### 📚 Study & Retention Tools
- **SM-2 Spaced Repetition Flashcards**: Review saved vocabulary with an optimized SuperMemo-2 algorithm calculating repetition intervals, ease factors, and next review dates.
- **Contextual Sentence Mining**: Saved words retain the exact sentence context and timestamp from the video where they were encountered.
- **Gamified Streaks & Freeze Inventory**: Track daily study streaks with streak freeze protections (up to 2 freezes) and milestone rewards.
- **Playlists & History**: Organize videos into custom playlists, explore curated community playlists, and resume progress automatically.
- **Offline-First Persistence**: Operates seamlessly offline with IndexedDB (`lingua-tube-cache`) and LocalStorage, with two-way cloud synchronization to PocketBase.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20.11` to `<23.0` (Node 20 or 22 LTS recommended)
- **npm**: `v10+`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ghuyphan/LinguaTube.git
   cd lingua-tube
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .dev.vars.example .dev.vars
   ```
   Provide your API keys in `.dev.vars` (e.g., `GLADIA_API_KEY`, `SUPADATA_API_KEY`, `TURNSTILE_SECRET_KEY`, `GOOGLE_CLIENT_ID`).

4. **Start Development Environment**
   ```bash
   npm run dev
   ```
   This concurrently runs the local Express mock server (port 3001) and the Angular dev server (`http://localhost:4200`).

---

## 🛠️ CLI Commands Reference

| Command | Action |
|---------|--------|
| `npm run dev` | Runs Angular dev server (`localhost:4200`) and local backend (`localhost:3001`) |
| `npm run build:functions` | Bundles Cloudflare Pages Functions from `functions-src/` into `functions/` via esbuild |
| `npm run build` | Full production build: compiles functions and Angular client into `dist/` |
| `npm run lint` | Runs ESLint 9 checks across TypeScript and HTML templates |
| `npm run lint:fix` | Automatically fixes autofixable ESLint issues |
| `npm run test:backend` | Executes Node.js test runner for security and validator tests |
| `npm run test` | Executes Angular unit tests with Karma |
| `npx wrangler pages dev` | Previews Cloudflare Pages Functions against D1 and KV bindings |

---

## 📖 Complete Documentation Suite

For complete architectural guides, database schemas, and developer manuals, see the [`doc/`](doc/) directory:

- **[AI Agent Operating Guide (AGENTS.md)](AGENTS.md)**: Critical invariants, architecture map, workflows, Rule 7 auto-update mandate, and checklists.
- **[Documentation Portal (doc/README.md)](doc/README.md)**: Guide index.
  - [1. System Architecture & Component Map](doc/map.md)
  - [2. Technology Stack & Tooling](doc/tech.md)
  - [3. Backend API & Serverless Edge](doc/backend-api.md)
  - [4. Frontend Architecture & UI System](doc/frontend-architecture.md)
  - [5. Feature Specifications & Deep Dive](doc/features.md)
  - [6. Database & Storage Architecture](doc/database-and-storage.md)
  - [7. Developer & Operations Guide](doc/development-guide.md)

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` or `k` | Play / Pause |
| `←` / `→` | Seek $-5$s / $+5$s |
| `j` / `l` | Seek $-10$s / $+10$s |
| `c` | Toggle Subtitles |
| `f` | Toggle Fullscreen |
| `m` | Toggle Mute |
| `Shift` + `<` / `>` | Adjust Playback Speed (0.5x – 2x) |
| `Esc` | Close Dictionary or Settings Sheets |

---

## 📄 License & Acknowledgments

- Licensed under the **MIT License**.
- Inspired by [Language Reactor](https://www.languagereactor.com/) and [LinguaCafe](https://github.com/simjanos-dev/LinguaCafe).
- Dictionary data provided by [Jotoba](https://jotoba.de/), [Jisho.org](https://jisho.org/), [Mazii](https://mazii.net/), [Naver](https://dict.naver.com/), and [MDBG](https://www.mdbg.net/).
- Speech AI powered by [Gladia](https://gladia.io/).
