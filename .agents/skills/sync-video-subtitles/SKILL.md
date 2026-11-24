---
name: sync-video-subtitles
description: "Use when creating, synchronizing, or fixing transcripts and dual subtitles for any YouTube video (podcasts, educational lectures, vlogs, anime/drama episodes, interviews, news, or music/songs) across JA, EN, ZH, KO, and VI. Routes JA/EN/ZH/KO to Qwen3-ASR + Qwen3-ForcedAligner-Ultra and VI (Vietnamese) to VinAI PhoWhisper ASR + wav2vec2-base-vietnamese-250h CTC forced aligner, with phonetic authenticity gating, morphological tokenization, Flutter subtitleWordRanges & matchesSubtitleSource verification, canonical Cloudflare R2 upload, and D1 sync."
metadata:
  author: voca
  version: "3.4.0"
---

# Sync Video Subtitles & Acoustic Alignment Skill (v3.4)

Produces **millisecond-accurate, synchronized subtitles** with Furigana/Romaji/Pinyin/Hangul/VI-compound morphological tokens, real-time word-level `wordTimings`, dual-language translations, and automated proficiency level grading (JLPT / CEFR / HSK / TOPIK) across **any YouTube video** (spoken content, anime/drama, or music) using a **single canonical two-command pipeline**:

1. **Transcribe & Align**: `scripts/ultra_align.py`
   - **JA / EN / ZH / KO**: `Qwen/Qwen3-ASR-1.7B` + `17slever17/Qwen3-ForcedAligner-Ultra` (`LocalBoundaryAligner`)
   - **VI (Vietnamese)**: `vinai/PhoWhisper-medium` ASR + `nguyenvulebinh/wav2vec2-base-vietnamese-250h` CTC Viterbi aligner + Vietnamese phonetic matcher (`đ->d`, digraph normalization)
2. **Verify & Publish**: `scripts/verify_and_publish.js` (exact Flutter & backend contract verifier + canonical R2/D1 publisher)

> [!CAUTION]
> **DO NOT** write ad-hoc per-video alignment or upload scripts, and **DO NOT** use legacy `scripts/align_audio.py`, `scripts/qwen_process_video.py`, or `scripts/enrich_and_upload.js` (they do per-line slicing, truncate cues at 5s, or overwrite native `{lang}.json` with `source: "ai"`). Always use `scripts/ultra_align.py` + `scripts/verify_and_publish.js`.

---

## 1. Choosing the Right Mode (`scripts/ultra_align.py --mode=...`)

`scripts/ultra_align.py` defaults to `--mode=auto`, which inspects your arguments and selects the optimal pipeline automatically, or you can specify a mode explicitly:

| Mode | Target Video Type | How It Works |
| :--- | :--- | :--- |
| **`asr`** *(or `auto` with no external text)* | **General Spoken Videos** (podcasts, vlogs, educational lessons, interviews, news, anime/drama episodes, talks) | Transcribes audio on Metal GPU with `Qwen/Qwen3-ASR-1.7B`, segments the word stream into natural grammatical clauses (`1.5s–5.0s`, splitting on sentence/clause punctuation and speaker pauses $\ge 0.55\text{s}$), then runs `LocalBoundaryAligner` in continuous speech sections for sub-centisecond `wordTimings`. |
| **`refine-only`** | **Existing Verified Captions** (any video or song that already has clean human/official cues in R2 or a local file) | Preserves existing cue `text` and `tokens` **100% verbatim (zero ASR text changes)** and aligns `wordTimings` across continuous 10s–22s sections. |
| **`lyrics`** | **Videos with Plain Transcript / Script / Lyrics** (official description text, script file, dialogue transcript, or song lyrics without timestamps) | Runs Stage 1 Coarse ASR to locate vocal windows across intros/breaks, enforces the **Phonetic Authenticity Gate** (`--min-auth-score=0.40`), then runs continuous section Ultra alignment. |
| **`lrc`** | **Timestamped `.lrc` / Synced Transcripts** (human-timed `.lrc` file or `--lyrics-file=auto` via LRCLIB) | Computes a 0.5s histogram mode peak offset against coarse ASR to compensate for video intros/silence, runs the authenticity gate, and aligns continuous sections. |

---

## 2. Standard Workflows by Video Category

### A. General Spoken Videos (Podcasts, Education, Vlogs, Interviews, Anime/Drama)
When transcribing a spoken video from scratch and generating dual subtitles automatically (or with curated translations):

```bash
# Step 1: Transcribe, chunk into natural clauses, and align wordTimings on Metal GPU
/tmp/voca_whisper/bin/python3 scripts/ultra_align.py \
  --video-id="VIDEO_ID" \
  --lang="ja" \
  --mode="asr"

# Step 2: Tokenize, auto-translate (or pass --trans), verify Flutter/backend contracts, grade level & publish
node scripts/verify_and_publish.js \
  --video-id="VIDEO_ID" \
  --lang="ja" \
  --ai="server/transcripts_cache/VIDEO_ID_ja.ai.json" \
  --auto-translate \
  --category="education" \
  --sync-native --publish
```
- Valid `--category` values (`functions-src/services/category.service.js`): `education`, `conversation`, `anime_drama`, `music`, `news`, `vlog`, `general`. Always specify `--category` explicitly when known (`category_source='manual'`), or omit it to let `verify_and_publish.js` classify automatically via `detectVideoCategory()` using YouTube genre, tags, title, and channel.
- `--auto-translate` automatically translates into the canonical dual-subtitle target pair for `--lang` (see Section 3) and validates script + completeness before uploading. For flagship content or songs, pass curated translation files via `--trans="vi:/path/to/vi.json" --trans="en:/path/to/en.json"`.

### B. Upgrading Existing Official / Refined Subtitles (Zero-ASR Mode)
When a video already has clean, human-verified cues in R2 (`transcripts/{videoId}/{lang}.json`) or locally and you only want to add `wordTimings` and/or upgrade dual translations without altering the source text:

```bash
# Step 1: Continuous section Ultra alignment (zero ASR text mutation)
/tmp/voca_whisper/bin/python3 scripts/ultra_align.py \
  --video-id="VIDEO_ID" \
  --lang="ja" \
  --mode="refine-only" \
  --source-cues="r2"

# Step 2: Verify contracts, preserve/set category & grade level, and publish both synced native + AI tracks
node scripts/verify_and_publish.js \
  --video-id="VIDEO_ID" \
  --lang="ja" \
  --ai="server/transcripts_cache/VIDEO_ID_ja.ai.json" \
  --trans="vi:/tmp/VIDEO_ID_vi.json" \
  --trans="en:/tmp/VIDEO_ID_en.json" \
  --category="anime_drama" \
  --sync-native --publish
```

### C. Music Videos & Songs (with `.lrc` or Authentic Web/Description Lyrics)
```bash
# With a timed .lrc file (or --lyrics-file="auto" --title="..." --artist="...")
/tmp/voca_whisper/bin/python3 scripts/ultra_align.py \
  --video-id="VIDEO_ID" \
  --lang="en" \
  --mode="lrc" \
  --lyrics-file="/tmp/VIDEO_ID.lrc" \
  --strip-adlibs

node scripts/verify_and_publish.js \
  --video-id="VIDEO_ID" \
  --lang="en" \
  --ai="server/transcripts_cache/VIDEO_ID_en.ai.json" \
  --trans="vi:/tmp/VIDEO_ID_vi.json" \
  --trans="ja:/tmp/VIDEO_ID_ja.json" \
  --category="music" \
  --sync-native --publish
```

---

## 3. Dual-Subtitle Target Language Matrix

Always publish dual translations for both standard target languages corresponding to the video's primary language (`--lang`):

| Video Source Language (`--lang`) | Required Dual-Subtitle Targets (`--trans`) | Resulting D1 `sub_languages` |Canonical R2 Translation Keys |
| :---: | :---: | :--- | :--- |
| **`ja`** (Japanese) | **`vi`**, **`en`** | `["ja","vi","en"]` | `translations/{id}/ja-vi.json`, `ja-en.json` |
| **`zh`** (Chinese) | **`vi`**, **`en`** | `["zh","vi","en"]` | `translations/{id}/zh-vi.json`, `zh-en.json` |
| **`ko`** (Korean) | **`vi`**, **`en`** | `["ko","vi","en"]` | `translations/{id}/ko-vi.json`, `ko-en.json` |
| **`en`** (English) | **`vi`**, **`ja`** | `["en","vi","ja"]` | `translations/{id}/en-vi.json`, `en-ja.json` |
| **`vi`** (Vietnamese) | **`en`**, **`ja`** | `["vi","en","ja"]` | `translations/{id}/vi-en.json`, `vi-ja.json` |

---

## 4. Acoustic Tuning & Batch Orchestration Guidelines

- **YouTube Embeddability Gate (For New Catalog Videos)**:
  - Before onboarding any new YouTube video ID, verify `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID&format=json` returns HTTP `200`. Never add embed-blocked videos to `video_languages`.
- **Adaptive Section Duration (`--max-sec-dur`)**:
  - By default (`--max-sec-dur=0`), `ultra_align.py` automatically adapts section length between **`16.0s`** (for slow/sparse delivery where average cue interval $\ge 3.8\text{s}$) and **`22.0s`** (for normal/dense speech or lyrics) so CTC alignment never stretches across long pauses.
  - You can override explicitly with `--max-sec-dur=14.0` on extra-slow, reverb-heavy tracks.
- **Overlapping Backing Ad-Libs (`--strip-adlibs`)**:
  - Pass `--strip-adlibs` when aligning transcripts/LRC files that contain faint parenthetical backing vocals (`(oh)`, `(ooh)`, `, mm`) so background vocals do not drag cue endings into the next line's onset.
  - Pure vocalization cues (`Na-na-na-na`, `Ah-ah`, `La-la-la`) are automatically exempted from anti-mirroring checks in `verify_and_publish.js`.
- **Single-GPU Batch Parallelism (16 GB Apple Silicon MPS)**:
  - When processing multiple videos with subagents, parallelize **I/O and CPU tasks** (audio download, transcript/LRC prep, embed checks, translation authoring) across subagents, and run **GPU transcription/alignment (`ultra_align.py`) sequentially** in the coordinator to prevent Metal memory contention.

---

## 5. Critical Backend & Flutter Invariants (Enforced by `verify_and_publish.js`)

### ⚠️ INVARIANT 1: Continuous Section Alignment (No Per-Line Slicing)
- Slicing audio cue-by-cue with `±0.5s` padding causes adjacent fast cues to capture each other's speech, creating overlapping word ranges and cascading timing drift.
- `ultra_align.py` always groups cues into continuous 10s–22s sections (splitting only at vocal pauses $\ge 1.6\text{s}$ or breath boundaries) and maps aligned words back via Flutter's exact `_normalizeAlign` character stream.

### ⚠️ INVARIANT 2: Flutter `subtitleWordRanges` Exact Match & Containment (Zero Dropped Cues)
- In `voca_flutter/lib/state/player_state.dart`, `subtitleWordRanges()` searches `[cue.start - 0.5s, cue.start + cue.duration + 0.5s)` and requires **100% exact normalized character sequence match** (`offset == normCue.length`).
- Never truncate cue durations to a fixed `max_dur`. Every cue satisfies `cue.start <= words[0].start`, `words[-1].end <= cue.start + cue.duration`, and `cue[i].start + cue[i].duration <= cue[i+1].start`.
- `verify_and_publish.js` runs an exact JS port of Flutter's `subtitleWordRanges` on every cue and **aborts (exit 1)** if even 1 cue is dropped.

### ⚠️ INVARIANT 3: Hard Word Duration Floor ($\ge 0.12\text{s}$) & Staccato Redistribution
- CTC forced aligners can compress repeated identical tokens (`ない ない ない`) or short particles into 10ms frames.
- `ultra_align.py` redistributes consecutive runs of $\ge 2$ identical words across their vocal span and enforces `MIN_WORD_DUR = 0.12s` by borrowing from adjacent long words ($\ge 0.28\text{s}$) or trailing silence.

### ⚠️ INVARIANT 4: Canonical R2 Keys, Native/AI Separation & Shared Translation Identity
- **Canonical R2 Keys (NEVER use underscores in R2 translation keys)**:
  - **Native track**: `transcripts/{videoId}/{lang}.json` — `source: "human_aligned"`, **NO `wordTimings`**.
  - **AI track**: `transcripts/{videoId}/{lang}.ai.json` — `source: "ai"`, `provider: "qwen3_fa_ultra_localhead"` (`ja`/`en`/`zh`/`ko`) or `"phowhisper_vi_wav2vec2_ctc"` (`vi`), **WITH** per-segment and top-level `wordTimings`.
  - **Dual translations**: `translations/{videoId}/{lang}-{target}.json` (**HYPHEN `-`**, e.g. `ja-vi.json`, `en-ja.json` — required by `functions-src/utils/translation-cache.js:111`).
- **Flutter `matchesSubtitleSource` Contract**:
  - In `voca_flutter/lib/utils/subtitle_track_identity.dart`, cached translations only bind to a cue if text matches AND $|\text{cue.start} - \text{cached.start}| \le 0.25\text{s}$ AND $|\text{cue.duration} - \text{cached.duration}| \le 0.5\text{s}$.
  - Always pass `--sync-native` when publishing updated boundaries so **both** `{lang}.json` and `{lang}.ai.json` achieve **100% cache hit** on shared dual translations.
- **Translation Payload Schema**:
  - `quality` MUST be numeric `100` (never a string) and `timestamp` MUST be fresh `Date.now()` ms (90-day TTL in `isTranslationFresh`).

### ⚠️ INVARIANT 5: Non-Destructive Complete D1 Catalog Sync
When `--publish` runs, `scripts/verify_and_publish.js` automatically handles **both** new inserts (`--upsert` default on) and existing row updates cleanly (which fires the D1 `video_language_catalog` and `search_text` triggers):
- **Category & Provenance (`category`, `category_source`)**: Always validated against `VALID_CATEGORIES` (`anime_drama`, `music`, `news`, `conversation`, `vlog`, `education`, `general`). Passing `--category` sets `category_source='manual'` on both new and existing rows; omitting `--category` preserves an existing non-general category or auto-classifies via `detectVideoCategory()` (`title`, `channel`, YouTube `categories`, `tags`).
- **Primary Spoken/Sung Language (`primary_language`)**: Set to `--lang` (or `--primary-lang`, unless `--keep-primary-lang` is passed) so recommendation discovery (`/api/recommended-videos`) never excludes covers or foreign-titled videos whose audio matches `--lang`.
- **Language Arrays, Tags, Metadata & Levels**: Merges `available_languages`, `ai_languages`, and `sub_languages`, hydrates missing `title`/`channel`/`duration_seconds`/`tags` via `yt-dlp`, automatically grades `levels[lang]` via `scoreVideoTranscript` (optional `--level` override, skip with `--no-grade`), checks YouTube oEmbed (`embed_blocked=0`), and writes `translation_meta`.

---

## 6. Verification Checklist (Automated in `verify_and_publish.js`)

- [ ] **Embeddability & Authenticity**: Video passed YouTube oEmbed HTTP `200` (`embed_blocked = 0`), and external text (if used) passed the phonetic authenticity gate ($\ge 0.40$).
- [ ] **Continuous Sections**: Aligned in adaptive 10s–22s sections with zero per-line slicing overlaps.
- [ ] **Flutter `subtitleWordRanges`**: **0 dropped cues** across 100% of segments.
- [ ] **Word Timing Health**: 0 collapsed words ($<0.10\text{s}$), 0 out-of-bounds words, 0 cue collisions.
- [ ] **Morphological Enrichment**: 100% of segments have language-appropriate `tokens` (Kuromoji Furigana `<rt>` ruby parts for `ja`, Pinyin for `zh`, romanization for `ko`, POS/lemmas for `en`, compounds for `vi`).
- [ ] **Dual Translations Verified**: Both target languages pass `translationsMatchLanguage()` script check, 0 empty/mirrored cues, numeric `quality: 100`, fresh `timestamp`, and **100% Flutter `matchesSubtitleSource`** on both native and AI tracks.
- [ ] **Complete D1 Catalog Metadata & R2 Sync**: Canonical R2 keys uploaded, `video_languages` updated with `category`, `category_source`, `primary_language`, `tags`, `levels`, `available_languages`, `ai_languages`, `sub_languages`, plus `translation_meta` (and `doc/subtitles-catalog.md` updated if tracking catalog upgrades).
