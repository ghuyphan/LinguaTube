# LinguaTube 📺 🎌

**Turn any YouTube video into a powerful language learning lesson.**

LinguaTube is a modern, immersive web application designed to help you learn **Japanese**, **Chinese**, and **Korean** directly from authentic content. It combines the vast library of YouTube with advanced language tools like interactive subtitles, instant dictionary lookups, and AI-powered transcription.

![Angular 19](https://img.shields.io/badge/Angular-19-%23DD0031?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-%233178C6?style=flat-square&logo=typescript)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Serverless-%23F38020?style=flat-square&logo=cloudflare)

## ✨ Key Features

### 🎬 Universal Video Support
-   **YouTube Integration**: Paste any YouTube URL to start learning immediately.
-   **Auto-Caption Fetching**: Seamlessly extracts existing subtitles in your target language.
-   **AI Transcription Fallback**: No subtitles? No problem. LinguaTube uses **Gladia AI** to generate accurate, timestamped transcripts on the fly.

### 🧠 Smart Linguistics
-   **Advanced Tokenization**: Uses server-side morphological analysis (via `Kuromoji` for Japanese, `Jieba` for Chinese) to correctly segment sentences into interactive words.
-   **Instant Dictionary**: Click any word to see detailed definitions, pronunciation, and examples.
-   **Dual-Language Support**: Displays learning subtitles alongside your native language.
-   **Phonetic Guides**: Toggle Furigana (Japanese) or Pinyin (Chinese) to aid reading.

### 📚 Study Tools
-   **Vocabulary Tracking**: Mark words as **New**, **Learning**, or **Known**.
-   **Contextual Review**: Words are saved with the sentence context where you found them.
-   **Smart Playback**: "Sticky" subtitles ensure you never miss a phrase, with auto-pause on hover.
-   **Cloud Sync**: Sync your progress and vocabulary across devices (Preview).

## 🚀 Getting Started

### Prerequisites
-   Node.js 18+
-   npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd lingua-tube
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    To use AI transcription features, you need a Gladia API key.
    -   Set `GLADIA_API_KEY` in your environment or Cloudflare configuration.

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    This command runs both the Angular frontend (at `http://localhost:4200`) and the local API server backend.

## 🛠️ Architecture & Tech Stack

LinguaTube is built as a **Progressive Web App (PWA)** leveraging edge computing for performance.

-   **Frontend**: Angular 19 (Signals, Standalone Components), RxJS, Lucide Icons.
-   **Backend**: Cloudflare Pages Functions (Serverless).
-   **Tokenization**:
    -   **Japanese**: `@patdx/kuromoji` (Morphological Analyzer)
    -   **Chinese**: `jieba-js` (Text Segmentation)
    -   **Korean**: Space-based + API
-   **Data & Caching**: Cloudflare KV (Key-Value storage) for caching tokenization results and AI transcripts to minimize latency and API costs.

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause |
| `←` / `→` | Seek -5s / +5s |
| `Esc` | Close Dictionary Popup |

## 📄 License

MIT License

## Acknowledgments

-   Inspired by [Language Reactor](https://www.languagereactor.com/) and [LinguaCafe](https://github.com/simjanos-dev/LinguaCafe)
-   Dictionary data from [Jisho.org](https://jisho.org/) and [MDBG](https://www.mdbg.net/)
-   Transcription services by [Gladia](https://gladia.io/)
