# LinguaTube

Learn Japanese and Chinese from YouTube videos with interactive subtitles, instant word lookup, and vocabulary tracking.

## Features

- **YouTube Integration** - Paste any YouTube URL to start learning
- **Auto Caption Fetch** - Automatically attempts to fetch captions from YouTube
- **Subtitle Upload** - Upload .srt, .vtt, or .ass subtitle files when auto-fetch isn't available
- **Interactive Subtitles** - Click any word to see its definition
- **Vocabulary Tracking** - Save words and track progress (new → learning → known)
- **Export to Anki** - Export vocabulary for spaced repetition study
- **Dark Mode** - Toggle between light and dark themes
- **Japanese & Chinese** - Support for both languages with Furigana/Pinyin toggle

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will be available at `http://localhost:4200`

### Building for Production

```bash
npm run build
```

## Usage

1. **Load a Video**: Paste a YouTube URL and click "Load Video"
2. **Subtitles**: The app will try to auto-fetch captions. If unavailable, upload a subtitle file
3. **Watch & Learn**: Click on words in the subtitles to see definitions
4. **Save Words**: Click "Save Word" to add to your vocabulary
5. **Review**: Track your progress in the vocabulary panel
6. **Export**: Export to Anki or JSON for further study

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── icon/                # SVG icon component
│   │   ├── header/              # App header with language toggle
│   │   ├── video-player/        # YouTube player with controls
│   │   ├── subtitle-display/    # Interactive subtitle display
│   │   ├── subtitle-upload/     # File upload for subtitles
│   │   ├── word-popup/          # Dictionary lookup popup
│   │   └── vocabulary-list/     # Saved vocabulary list
│   ├── services/
│   │   ├── youtube.service.ts   # YouTube API integration
│   │   ├── subtitle.service.ts  # Subtitle parsing
│   │   ├── transcript.service.ts # Auto caption fetching
│   │   ├── dictionary.service.ts # Word lookup
│   │   ├── vocabulary.service.ts # Vocabulary management
│   │   └── settings.service.ts  # User settings
│   └── models/
│       └── index.ts             # TypeScript interfaces
├── styles.css                   # Global styles (CSS variables, theme)
└── index.html                   # Entry HTML
```

## Tech Stack

- **Angular 19** - Standalone components, Signals
- **TypeScript** - Type safety throughout
- **CSS Custom Properties** - Theming support
- **localStorage** - Persistent vocabulary storage
- **YouTube IFrame API** - Video playback

## Extending

### Adding Kuromoji for Better Japanese Tokenization

The current implementation uses basic character-type tokenization. For production:

```bash
npm install kuromoji
```

Then update `subtitle.service.ts` to use Kuromoji for proper morphological analysis.

### Adding Whisper for Transcription

For videos without subtitles, you can integrate OpenAI's Whisper API:

1. Set up a backend to extract audio with `yt-dlp`
2. Send audio to Whisper API (Groq offers a free tier)
3. Return timestamped transcripts

### Dictionary Integration

For Japanese:
- [JMDict](http://www.edrdg.org/wiki/index.php/JMDict-EDICT_Dictionary_Project)
- Use `jmdict-simplified` npm package

For Chinese:
- [CC-CEDICT](https://www.mdbg.net/chinese/dictionary?page=cedict)

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Play/Pause (when focused) |
| `←` | Rewind 5 seconds |
| `→` | Forward 5 seconds |
| `Esc` | Close popup |

## License

MIT License

## Acknowledgments

- Inspired by [Language Reactor](https://www.languagereactor.com/) and [LinguaCafe](https://github.com/simjanos-dev/LinguaCafe)
- Dictionary data from [Jisho.org](https://jisho.org/) and [MDBG](https://www.mdbg.net/)
# LinguaTube
