#!/usr/bin/env python3
"""
Voca Unified Ultra Acoustic Aligner (scripts/ultra_align.py)
------------------------------------------------------------
Canonical acoustic forced-alignment pipeline:
- JA / EN / ZH / KO: Qwen/Qwen3-ASR-1.7B (MLX) + 17slever17/Qwen3-ForcedAligner-Ultra (MPS / CPU)
- VI (Vietnamese):   vinai/PhoWhisper-medium ASR + nguyenvulebinh/wav2vec2-base-vietnamese-250h
                     CTC Viterbi forced aligner + Vietnamese phonetic matcher (đ->d, digraphs)

Modes:
  --mode=auto        : Auto-selects refine-only / lrc / lyrics / asr based on inputs.
  --mode=asr         : General spoken videos (transcribes + segments natural clauses).
  --mode=refine-only : Preserves existing refined official cues 100% (ZERO ASR text changes).
  --mode=lyrics      : Ingests authentic lyrics (--lyrics-file or 'auto' via LRCLIB), runs
                       coarse ASR for vocal section discovery + phonetic authenticity gate,
                       then runs continuous section forced alignment.
  --mode=lrc         : Uses human-timed .lrc timestamps + coarse ASR histogram peak offset
                       for section bounds, then runs continuous section forced alignment.

Outputs a candidate AI transcript JSON for verification & publishing via:
  node scripts/verify_and_publish.js --video-id=<ID> --lang=<LANG> ...
"""

import argparse
import difflib
import gzip
import json
import os
import re
import shutil
import subprocess
import sys
import time
import unicodedata
import urllib.parse
import urllib.request

import numpy as np
import soundfile as sf
import torch

# Optional phonetic libraries for authenticity gate & coarse matching
try:
    import pykakasi
    _kks = pykakasi.kakasi()
except ImportError:
    _kks = None

try:
    import jaconv
except ImportError:
    jaconv = None

try:
    import pypinyin
except ImportError:
    pypinyin = None

MIN_WORD_DUR = 0.12
LEAD_IN = 0.15
POST_PAD = 0.30
GAP_CLEAR = 0.45

LANG_NAME_MAP = {
    "ja": "Japanese",
    "zh": "Chinese",
    "ko": "Korean",
    "en": "English",
    "vi": "Vietnamese",
}


def resolve_binary(name, extra_candidates=None):
    found = shutil.which(name)
    if found:
        return found
    venv_bin = os.path.join(os.path.dirname(sys.executable), name)
    if os.path.isfile(venv_bin) and os.access(venv_bin, os.X_OK):
        return venv_bin
    for path in (extra_candidates or []):
        if os.path.isfile(path) and os.access(path, os.X_OK):
            return path
    raise RuntimeError(f"Required binary '{name}' not found on PATH or in Python venv ({os.path.dirname(sys.executable)})")


def normalize_align(text):
    """Exact mirror of Flutter's _normalizeAlign() in player_state.dart."""
    out = []
    for ch in text or "":
        cp = ord(ch)
        if 0xFF01 <= cp <= 0xFF5E:
            cp -= 0xFEE0
            ch = chr(cp)
        if cp <= 0x7F:
            if 0x41 <= cp <= 0x5A:
                cp += 0x20
                ch = chr(cp)
            if (0x30 <= cp <= 0x39) or (0x61 <= cp <= 0x7A):
                out.append(ch)
            continue
        cat = unicodedata.category(ch)
        if not (ch.isspace() or cat.startswith("P") or cat.startswith("S")):
            out.append(ch.lower())
    return "".join(out)


def clean_for_align(text):
    return re.sub(r"[「」『』？?！!（）\(\)\[\]、。…~\-—\"'’`]+", " ", text or "").strip()


def _normalize_vi_phonetics(clean_text):
    """Normalizes Vietnamese text for phonetic ASR/lyric matching (preserves đ->d and syllable equivalences)."""
    s = (clean_text or "").lower().replace("đ", "d").replace("ð", "d")
    s = "".join(ch for ch in unicodedata.normalize("NFKD", s) if not unicodedata.combining(ch))
    s = re.sub(r"[^a-z0-9]+", "", s)
    # Normalize common orthographic equivalents (c/q->k, ngh->ng, gh->g, ph->f, y->i)
    s = s.replace("ngh", "ng").replace("gh", "g").replace("ph", "f").replace("qu", "kw")
    s = s.replace("c", "k").replace("q", "k").replace("y", "i")
    return s


def normalize_phonetics(text, lang="ja"):
    clean = re.sub(r"[\s、。！？!?,.~…「」『』\(\)\[\]\"'’]+", "", text or "")
    if not clean:
        return ""
    if lang == "ja":
        if _kks:
            hira = "".join(item["hira"] for item in _kks.convert(clean)).lower()
            if jaconv:
                hira = jaconv.kata2hira(hira)
            return hira
        return clean.lower()
    if lang == "zh":
        if pypinyin:
            p = pypinyin.pinyin(clean, style=pypinyin.Style.NORMAL)
            return "".join(x[0] for x in p if x and x[0]).lower()
        return clean.lower()
    if lang == "ko":
        return "".join(c for c in unicodedata.normalize("NFD", clean) if not unicodedata.combining(c)).lower()
    if lang == "vi":
        return _normalize_vi_phonetics(clean)
    norm = unicodedata.normalize("NFKD", clean.replace("đ", "d").replace("Đ", "D"))
    return re.sub(r"[^a-z0-9]+", "", norm.lower())


def download_audio(video_id, out_wav):
    if os.path.exists(out_wav) and os.path.getsize(out_wav) > 10000:
        print(f"[{video_id}] Reusing cached audio: {out_wav}")
        return out_wav

    yt_dlp = resolve_binary("yt-dlp", ["/tmp/voca_whisper/bin/yt-dlp"])
    ffmpeg = resolve_binary("ffmpeg", ["/Users/huyphan/.gemini/antigravity/bin/ffmpeg"])

    os.makedirs(os.path.dirname(out_wav) or "/tmp", exist_ok=True)
    raw_template = f"/tmp/voca_raw_{video_id}.%(ext)s"
    print(f"[{video_id}] Downloading audio stream via yt-dlp...")

    attempts = [
        [yt_dlp, "--extractor-args", "youtube:player_client=android", "-f", "18/bestaudio/best",
         "-x", "--audio-format", "wav", "--ffmpeg-location", ffmpeg, "-o", raw_template,
         f"https://www.youtube.com/watch?v={video_id}"],
        [yt_dlp, "-x", "--audio-format", "wav", "--ffmpeg-location", ffmpeg, "-o", raw_template,
         f"https://www.youtube.com/watch?v={video_id}"],
    ]
    downloaded = False
    for cmd in attempts:
        try:
            subprocess.check_call(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            downloaded = True
            break
        except Exception:
            continue

    if not downloaded:
        raise RuntimeError(f"[{video_id}] Failed to download audio via yt-dlp")

    raw_files = [os.path.join("/tmp", f) for f in os.listdir("/tmp") if f.startswith(f"voca_raw_{video_id}.")]
    if not raw_files:
        raise RuntimeError(f"[{video_id}] Downloaded audio file not found")

    subprocess.check_call(
        [ffmpeg, "-y", "-i", raw_files[0], "-ar", "16000", "-ac", "1", out_wav],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    for rf in raw_files:
        try:
            os.remove(rf)
        except OSError:
            pass
    return out_wav


def fetch_r2_native_cues(video_id, lang):
    out_path = f"/tmp/voca_r2_{video_id}_{lang}.json"
    cmd = f'npx -y wrangler@4.166.0 r2 object get linguatube-transcripts/transcripts/{video_id}/{lang}.json --file="{out_path}" --remote'
    subprocess.check_call(cmd, shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    with open(out_path, "rb") as f:
        raw = f.read()
    if raw[:2] == b"\x1f\x8b":
        raw = gzip.decompress(raw)
    return json.loads(raw.decode("utf-8"))


def parse_lrc_text(raw_text):
    lrc_cues = []
    plain_lines = []
    header_re = re.compile(
        r"^\[(?:ti|ar|al|by|offset|length:|(?:intro|verse|pre-?chorus|post-?chorus|chorus|bridge|outro|hook|refrain|interlude|solo|instrumental|break|spoken|narrator|speaker)\b[^\]]*)\]",
        re.I,
    )
    for raw in raw_text.splitlines():
        line = raw.strip()
        if not line:
            continue
        m = re.match(r"^\[(\d+):(\d+(?:\.\d+)?)\]\s*(.*)$", line)
        if m:
            t = int(m.group(1)) * 60 + float(m.group(2))
            txt = m.group(3).strip()
            if txt and not header_re.match(txt):
                lrc_cues.append({"start": t, "text": txt})
                plain_lines.append(txt)
        else:
            cleaned = re.sub(r"^\[\d+:\d+(?:\.\d+)?\]\s*", "", line).strip()
            if cleaned and not header_re.match(cleaned) and not re.match(r"^\[(ti|ar|al|by|offset|length):", cleaned, re.I):
                plain_lines.append(cleaned)
    return lrc_cues, plain_lines


def fetch_lrclib(query, lang, duration=None):
    url = f"https://lrclib.net/api/search?q={urllib.parse.quote(query)}"
    req = urllib.request.Request(url, headers={"User-Agent": "Voca-UltraAlign/3.0"})
    with urllib.request.urlopen(req, timeout=12) as resp:
        items = json.loads(resp.read().decode("utf-8"))
    if not isinstance(items, list) or not items:
        return [], []

    def script_ok(txt):
        if lang == "ja":
            return bool(re.search(r"[\u3040-\u30ff]", txt))
        if lang == "zh":
            return bool(re.search(r"[\u4e00-\u9fff]", txt)) and not bool(re.search(r"[\u3040-\u30ff]", txt))
        if lang == "ko":
            return bool(re.search(r"[\uac00-\ud7af]", txt))
        return True

    candidates = [x for x in items if (x.get("syncedLyrics") or x.get("plainLyrics")) and script_ok(x.get("syncedLyrics") or x.get("plainLyrics") or "")]
    if not candidates:
        candidates = [x for x in items if x.get("syncedLyrics") or x.get("plainLyrics")]
    if not candidates:
        return [], []

    if duration:
        candidates.sort(key=lambda x: abs((x.get("duration") or duration) - duration))

    best = candidates[0]
    raw = best.get("syncedLyrics") or best.get("plainLyrics") or ""
    print(f"[LRCLIB] Matched: {best.get('trackName')} - {best.get('artistName')} ({best.get('duration')}s)")
    return parse_lrc_text(raw)


def _project_punctuation_onto_words(words, full_text):
    """Restores sentence/clause punctuation from ASR text onto word tokens."""
    if not words or not full_text:
        return words

    # Build list of (norm_char, raw_idx) for non-punct characters in full_text
    text_chars = []
    for idx, ch in enumerate(full_text):
        nc = normalize_align(ch)
        if nc:
            for sub_ch in nc:
                text_chars.append((sub_ch, idx))

    if not text_chars:
        return words

    punct_keep = PUNCT_END_SET | PUNCT_CLAUSE_SET | {"…", ".", ",", "?", "!"}
    t_pos = 0
    n_tc = len(text_chars)

    for w in words:
        w_norm = normalize_align(w["text"])
        if not w_norm:
            continue
        # Find w_norm at or shortly after t_pos (bounded lookahead so one mismatch never drifts)
        found_end = None
        for offset in range(0, min(64, n_tc - t_pos - len(w_norm) + 1)):
            probe = "".join(text_chars[t_pos + offset + k][0] for k in range(len(w_norm)))
            if probe == w_norm:
                found_end = text_chars[t_pos + offset + len(w_norm) - 1][1]
                t_pos = t_pos + offset + len(w_norm)
                break
        if found_end is not None:
            trail = []
            j = found_end + 1
            while j < len(full_text) and full_text[j] in punct_keep and full_text[j] != "\n":
                trail.append(full_text[j])
                j += 1
            if trail:
                w["text"] = w["text"] + "".join(trail)
    return words


def run_coarse_asr_vi(audio_wav, model_name="vinai/PhoWhisper-medium"):
    """Runs dedicated Vietnamese ASR (VinAI PhoWhisper via CTranslate2 int8) and emits coarse word stream."""
    import gc
    from faster_whisper import WhisperModel
    from huggingface_hub import snapshot_download

    if os.path.isdir(model_name):
        ct2_dir = model_name
    else:
        slug = re.sub(r"[^a-zA-Z0-9._-]+", "_", model_name)
        ct2_dir = os.path.expanduser(f"~/.cache/huggingface/hub/{slug}-ct2-int8")
        if model_name == "vinai/PhoWhisper-medium":
            legacy_dir = os.path.expanduser("~/.cache/huggingface/hub/phowhisper-medium-ct2-int8")
            if os.path.isfile(os.path.join(legacy_dir, "model.bin")):
                ct2_dir = legacy_dir

        if not os.path.isfile(os.path.join(ct2_dir, "model.bin")):
            print(f"[Coarse ASR - VI] Preparing CTranslate2 int8 model from {model_name}...")
            src_dir = snapshot_download(model_name)
            converter = resolve_binary("ct2-transformers-converter")
            os.makedirs(ct2_dir, exist_ok=True)
            copy_candidates = [
                f for f in [
                    "preprocessor_config.json", "tokenizer_config.json", "vocab.json",
                    "merges.txt", "normalizer.json", "added_tokens.json", "special_tokens_map.json",
                ]
                if os.path.exists(os.path.join(src_dir, f))
            ]
            cmd = [converter, "--model", src_dir, "--output_dir", ct2_dir, "--quantization", "int8", "--force"]
            if copy_candidates:
                cmd += ["--copy_files", *copy_candidates]
            subprocess.check_call(cmd)
            tok_src = os.path.join(src_dir, "tokenizer.json")
            if os.path.exists(tok_src):
                shutil.copy2(tok_src, os.path.join(ct2_dir, "tokenizer.json"))

    print(f"[Coarse ASR - VI] Running {model_name} (CTranslate2 int8, faster-whisper)...")
    audio_arr, _ = sf.read(audio_wav, dtype="float32")
    model = WhisperModel(ct2_dir, device="cpu", compute_type="int8")
    segs_iter, _info = model.transcribe(
        audio_arr,
        language="vi",
        beam_size=2,
        word_timestamps=True,
        condition_on_previous_text=False,
        vad_filter=True,
        no_speech_threshold=0.6,
        log_prob_threshold=-1.0,
        compression_ratio_threshold=2.0,
    )

    words = []
    seg_count = 0
    for seg in segs_iter:
        seg_dur = max(0.0, float(seg.end) - float(seg.start))
        raw_txt = (seg.text or "").strip()
        # Filter Whisper hallucinations on sub-second SFX/noise bursts
        if seg_dur < 0.35 and len(raw_txt.split()) >= 4:
            continue
        seg_count += 1
        if getattr(seg, "words", None):
            for w in seg.words:
                txt = (w.word or "").strip()
                if not txt:
                    continue
                phon = normalize_phonetics(txt, "vi")
                if not phon:
                    continue
                ws = float(w.start)
                we = max(ws + 0.05, float(w.end))
                words.append({"text": txt, "phon": phon, "start": round(ws, 3), "end": round(we, 3)})
        else:
            toks = [t for t in raw_txt.split() if t.strip()]
            if toks:
                dur = max(0.4, seg_dur)
                step = dur / len(toks)
                for k, t in enumerate(toks):
                    phon = normalize_phonetics(t, "vi")
                    if phon:
                        ws = round(float(seg.start) + k * step, 3)
                        we = round(float(seg.start) + (k + 1) * step, 3)
                        words.append({"text": t, "phon": phon, "start": ws, "end": max(ws + 0.05, we)})

    del model
    gc.collect()
    print(f"[Coarse ASR - VI] Transcribed {seg_count} segments -> {len(words)} coarse VI words.")
    return words


def run_coarse_asr(audio_wav, lang, model_name="auto", context=""):
    import gc
    resolved_model = model_name
    if not resolved_model or resolved_model == "auto":
        resolved_model = "vinai/PhoWhisper-medium" if lang == "vi" else "Qwen/Qwen3-ASR-1.7B"

    if lang == "vi" and not resolved_model.startswith("Qwen/"):
        return run_coarse_asr_vi(audio_wav, model_name=resolved_model)

    import mlx_qwen3_asr
    asr_lang = LANG_NAME_MAP.get(lang, lang) if lang == "vi" else lang
    print(f"[Coarse ASR] Running {resolved_model} (lang={asr_lang}) on Apple Silicon MLX...")
    res = mlx_qwen3_asr.transcribe(
        audio_wav,
        model=resolved_model,
        language=asr_lang,
        context=context or "",
        return_timestamps=True,
        return_chunks=True,
    )
    raw_segs = res.get("segments", []) if isinstance(res, dict) else (getattr(res, "segments", None) or [])
    full_text = (res.get("text", "") if isinstance(res, dict) else getattr(res, "text", "")) or ""
    words = []
    for seg in raw_segs:
        seg_words = seg.get("words") if isinstance(seg, dict) else getattr(seg, "words", None)
        seg_start = float(seg.get("start", 0.0) if isinstance(seg, dict) else getattr(seg, "start", 0.0))
        seg_end = float(seg.get("end", 0.0) if isinstance(seg, dict) else getattr(seg, "end", 0.0))
        seg_text = (seg.get("text", "") if isinstance(seg, dict) else getattr(seg, "text", "")) or ""
        if seg_words:
            for w in seg_words:
                txt = ((w.get("word") or w.get("text") or "") if isinstance(w, dict) else (getattr(w, "word", None) or getattr(w, "text", None) or "")).strip()
                if txt:
                    words.append({
                        "text": txt,
                        "phon": normalize_phonetics(txt, lang),
                        "start": float(w.get("start", seg_start) if isinstance(w, dict) else getattr(w, "start", seg_start)),
                        "end": float(w.get("end", seg_end) if isinstance(w, dict) else getattr(w, "end", seg_end)),
                    })
        else:
            txt = seg_text.strip()
            if txt:
                words.append({
                    "text": txt,
                    "phon": normalize_phonetics(txt, lang),
                    "start": seg_start,
                    "end": seg_end,
                })
    words = [w for w in words if w["phon"]]
    _project_punctuation_onto_words(words, full_text)
    gc.collect()
    return words


def verify_lyrics_authenticity(lyric_lines, coarse_words, lang, min_score=0.40):
    """
    Phonetic authenticity gate: compares ingested lyrics against coarse ASR output
    to prevent aligning hallucinated or wrong-song lyrics onto audio.
    """
    if not coarse_words or not lyric_lines:
        return 0.0
    asr_phon = "".join(w["phon"] for w in coarse_words)
    lyr_phon = "".join(normalize_phonetics(l, lang) for l in lyric_lines)
    if not asr_phon or not lyr_phon:
        return 0.0

    # Sample up to 12 evenly spaced lines and compute best fuzzy substring hit in ASR stream
    step = max(1, len(lyric_lines) // 12)
    sample_lines = [normalize_phonetics(lyric_lines[i], lang) for i in range(0, len(lyric_lines), step)]
    sample_lines = [s for s in sample_lines if len(s) >= 4]
    if not sample_lines:
        return 1.0

    line_scores = []
    for needle in sample_lines:
        nlen = len(needle)
        best = 0.0
        # Coarse sliding window with stride nlen // 3 for speed
        stride = max(2, nlen // 3)
        for pos in range(0, max(1, len(asr_phon) - nlen + 1), stride):
            chunk = asr_phon[pos:pos + int(nlen * 1.3)]
            r = difflib.SequenceMatcher(None, needle, chunk).ratio()
            if r > best:
                best = r
                if best >= 0.85:
                    break
        line_scores.append(best)

    avg_score = sum(line_scores) / len(line_scores)
    print(f"[Authenticity Gate] Phonetic lyric-to-audio score: {avg_score:.3f} (threshold: {min_score:.2f}, samples: {len(line_scores)})")
    if avg_score < min_score:
        raise RuntimeError(
            f"LYRICS AUTHENTICITY CHECK FAILED (score={avg_score:.3f} < {min_score:.2f}). "
            f"The provided lyrics do NOT match the audio vocals! Fetch the authentic lyrics "
            f"(e.g. official video description / Uta-Net / exact cover version) or pass --skip-auth-check if intentional."
        )
    return avg_score


def coarse_match_windows(lyric_lines, coarse_words, lang, total_sec):
    """Monotonic phonetic matching of lyric lines onto coarse ASR word stream."""
    windows = []
    cur = 0
    n = len(coarse_words)
    for line in lyric_lines:
        target = normalize_phonetics(line, lang)
        if not target or cur >= n:
            prev_end = windows[-1]["end"] if windows else 0.0
            windows.append({"start": prev_end, "end": min(total_sec, prev_end + 3.0), "text": line})
            continue

        best_score = -1.0
        best_span = (cur, min(n - 1, cur + 2))
        search_end = min(n, cur + 28)
        L = len(target)

        for s in range(cur, search_end):
            acc = ""
            for e in range(s, min(n, s + 18)):
                acc += coarse_words[e]["phon"]
                ratio = difflib.SequenceMatcher(None, target, acc).ratio()
                first_ok = acc[0] == target[0]
                last_ok = acc[-1] == target[-1]
                edge_pen = (0.0 if first_ok else 0.12) + (0.0 if last_ok else 0.08)
                len_diff = abs(len(acc) - L) / max(1, L)
                len_pen = 0.25 * len_diff if len_diff > 0.3 else 0.0
                score = ratio - edge_pen - len_pen
                if score > best_score:
                    best_score = score
                    best_span = (s, e)
                    if ratio >= 0.96 and first_ok and last_ok:
                        break
            if best_score >= 0.93:
                break

        t_s = max(0.0, coarse_words[best_span[0]]["start"] - 0.25)
        t_e = min(total_sec, coarse_words[best_span[1]]["end"] + 0.35)
        windows.append({"start": round(t_s, 3), "end": round(t_e, 3), "text": line})
        cur = min(n - 1, best_span[1] + 1)
    return windows


def apply_lrc_peak_offset(lrc_cues, coarse_words, lang, total_sec):
    """Computes 0.5s histogram mode offset between studio LRC and YouTube audio."""
    offsets = []
    for cue in lrc_cues[:25]:
        needle = normalize_phonetics(cue["text"], lang)
        if len(needle) < 4:
            continue
        best_r, best_t = 0.0, None
        for i in range(len(coarse_words)):
            acc = ""
            for j in range(i, min(len(coarse_words), i + 10)):
                acc += coarse_words[j]["phon"]
                if abs(len(acc) - len(needle)) <= max(3, len(needle) * 0.4):
                    r = difflib.SequenceMatcher(None, needle, acc).ratio()
                    if r > best_r:
                        best_r = r
                        best_t = coarse_words[i]["start"]
        if best_r >= 0.65 and best_t is not None:
            offsets.append(best_t - cue["start"])

    offset = 0.0
    if offsets:
        bins = {}
        for o in offsets:
            b = round(o * 2) / 2
            bins[b] = bins.get(b, 0) + 1
        best_bin = max(bins, key=bins.get)
        cluster = [o for o in offsets if abs(o - best_bin) <= 0.6]
        offset = sum(cluster) / len(cluster)
    print(f"[LRC Offset] Computed histogram peak offset: {offset:+.2f}s ({len(offsets)} anchor lines)")

    windows = []
    for i, cue in enumerate(lrc_cues):
        s = max(0.0, cue["start"] + offset)
        if i < len(lrc_cues) - 1:
            nxt_s = max(s + 0.8, lrc_cues[i + 1]["start"] + offset)
            # Cap single LRC line vocal window at 4.8s so instrumental breaks create genuine gaps!
            e = min(total_sec, nxt_s, s + 4.8)
        else:
            e = min(total_sec, s + 4.8)
        windows.append({"start": round(s, 3), "end": round(e, 3), "text": cue["text"]})
    return windows


PUNCT_END_SET = set(["。", "！", "？", "!", "?", "…", "\n", ";", "；"])
PUNCT_CLAUSE_SET = set(["、", ",", "，", ":", "："])
SPACE_DELIMITED_LANGS = set(["en", "vi", "ko"])


def strip_overlapping_adlibs(text):
    """Strips faint parenthetical backing vocals and trailing hums that can cause CTC lag."""
    s = re.sub(r"\s*\"?\s+\bAy$", '"', text or "")
    s = re.sub(r",\s*\b(?:mm|hm|uh)\b", "", s, flags=re.I)
    s = re.sub(r"\s*[\(\[（](?:oh|ooh|ah|aah|uh|mm|hm|yeah|hey|ay|over|insane|i'm insane|leave a [^\)\]）]+)[\)\]）]", "", s, flags=re.I)
    return s.strip()


def chunk_asr_clauses(coarse_words, lang, total_sec):
    """
    Segments coarse ASR word stream into natural, readable clauses (1.5s-5.0s)
    for general spoken videos (podcasts, vlogs, lessons, interviews, anime, news)
    or songs without external transcripts.
    """
    use_space = lang in SPACE_DELIMITED_LANGS
    max_chars = 72 if use_space else 28
    windows = []
    cur = []

    def join_tokens(w_list):
        if not use_space:
            return "".join(w["text"] for w in w_list).strip()
        out = []
        for w in w_list:
            t = w["text"].strip()
            if not t:
                continue
            if out and re.match(r"^[,.;:!?'\")]", t):
                out[-1] = out[-1] + t
            else:
                out.append(t)
        return " ".join(out).strip()

    def flush(w_list):
        if not w_list:
            return
        txt = join_tokens(w_list)
        if not txt or not normalize_align(txt):
            return
        s = max(0.0, float(w_list[0]["start"]))
        e = min(total_sec, max(s + 0.6, float(w_list[-1]["end"])))
        windows.append({"start": round(s, 3), "end": round(e, 3), "text": txt})

    for w in coarse_words:
        t = (w.get("text") or "").strip()
        if not t:
            continue
        w_s = float(w["start"])
        if cur:
            prev_e = float(cur[-1]["end"])
            gap = w_s - prev_e
            cur_dur = prev_e - float(cur[0]["start"])
            cur_txt = join_tokens(cur)
            prev_tok = cur[-1]["text"].strip()

            end_punct = any(p in prev_tok for p in PUNCT_END_SET) or (prev_tok.endswith(".") and not re.search(r"\b(?:Mr|Mrs|Ms|Dr|St|vs|etc)\.$", prev_tok, re.I))
            clause_punct = any(p in prev_tok for p in PUNCT_CLAUSE_SET) and (len(cur_txt) >= (28 if use_space else 12) or cur_dur >= 1.8)
            pause_split = gap >= 0.55
            short_end_tok = (not use_space) and len(t) <= 3 and any(p in t for p in PUNCT_END_SET) and gap < 0.35 and len(cur_txt) < int(max_chars * 1.35)
            len_split = (not short_end_tok) and ((len(cur_txt) >= max_chars and gap >= 0.08) or len(cur_txt) >= int(max_chars * 1.25))
            dur_split = (not short_end_tok) and ((cur_dur >= 3.8 and gap >= 0.18) or cur_dur >= 5.2)

            if end_punct or clause_punct or pause_split or len_split or dur_split:
                flush(cur)
                cur = []
        cur.append(w)

    flush(cur)
    lines = [w["text"] for w in windows]
    print(f"[ASR Chunker] Segmented {len(coarse_words)} ASR tokens into {len(windows)} natural subtitle cues.")
    return lines, windows


def cluster_continuous_sections(cue_windows, total_sec, max_sec_dur=None, split_gap=1.6):
    """
    Groups cues into continuous ~10s-28s musical sections (Invariant 1).
    Splits at genuine vocal pauses (>= split_gap), or at the best breath boundary
    once span exceeds max_sec_dur so a 4-minute song never collapses into 1 giant block.
    """
    if not cue_windows:
        return []
    # Adaptive section duration: tighten automatically on slow/sparse delivery so CTC never stretches across long pauses
    if max_sec_dur is None or max_sec_dur <= 0:
        total_span = max(1.0, cue_windows[-1]["end"] - cue_windows[0]["start"])
        avg_interval = total_span / max(1, len(cue_windows))
        max_sec_dur = 16.0 if avg_interval >= 3.8 else 22.0
    sections = []
    sec_start_idx = 0
    for i in range(len(cue_windows) - 1):
        cur_end = cue_windows[i]["end"]
        nxt_start = cue_windows[i + 1]["start"]
        gap = nxt_start - cur_end
        span = cur_end - cue_windows[sec_start_idx]["start"]
        if (gap >= split_gap and span >= 5.0) or (span >= max_sec_dur and i > sec_start_idx):
            t_s = max(0.0, cue_windows[sec_start_idx]["start"] - 0.5)
            pad_end = min(1.5, max(0.35, gap * 0.45)) if gap > 0 else 0.35
            t_e = min(total_sec, cur_end + pad_end)
            sections.append((sec_start_idx, i + 1, t_s, t_e))
            sec_start_idx = i + 1

    t_s = max(0.0, cue_windows[sec_start_idx]["start"] - 0.5)
    t_e = min(total_sec, cue_windows[-1]["end"] + 3.5)
    sections.append((sec_start_idx, len(cue_windows), t_s, t_e))
    return sections


def _map_section_words_to_cues(abs_words, lyric_lines, c_start, c_end, cue_words_map):
    """Maps continuous aligned word stream back to individual cues using Flutter's normalize_align."""
    w_ptr = 0
    for c_idx in range(c_start, c_end):
        target_norm = normalize_align(lyric_lines[c_idx])
        matched = []
        acc = ""
        while w_ptr < len(abs_words) and len(acc) < len(target_norm):
            cand = abs_words[w_ptr]
            cand_norm = normalize_align(cand["text"])
            need = len(target_norm) - len(acc)
            if cand_norm and len(cand_norm) > need and target_norm.startswith(acc + cand_norm[:need]):
                # Aligner merged a token across the space-joined cue boundary; split cleanly.
                raw_txt = cand["text"]
                taken_norm = 0
                split_raw_idx = 0
                for r_i, ch in enumerate(raw_txt):
                    cn = normalize_align(ch)
                    if taken_norm + len(cn) > need:
                        break
                    taken_norm += len(cn)
                    split_raw_idx = r_i + 1
                    if taken_norm == need:
                        break
                left_txt = raw_txt[:split_raw_idx].strip()
                right_txt = raw_txt[split_raw_idx:].strip()
                if left_txt and right_txt and normalize_align(left_txt) == cand_norm[:need]:
                    frac = need / len(cand_norm)
                    split_t = round(cand["start"] + (cand["end"] - cand["start"]) * frac, 3)
                    left_word = {"word": left_txt, "text": left_txt, "start": cand["start"], "end": split_t}
                    right_word = {"word": right_txt, "text": right_txt, "start": split_t, "end": cand["end"]}
                    matched.append(left_word)
                    acc += normalize_align(left_txt)
                    abs_words[w_ptr] = right_word
                    continue
            matched.append(cand)
            acc += cand_norm
            w_ptr += 1
        cue_words_map[c_idx] = matched
        if acc != target_norm:
            print(f"    WARNING: Cue {c_idx + 1} norm mismatch ('{acc}' != '{target_norm}')")


def _viterbi_ctc_align(log_probs, token_seqs, blank_id):
    """
    Runs vectorized NumPy CTC Viterbi forced alignment over emission log-probabilities.
    Returns list of (start_frame, end_frame_exclusive) for each token in token_seqs.
    """
    T = log_probs.shape[0]
    targets = [blank_id]
    word_state_ranges = []
    for seq in token_seqs:
        w_start = len(targets)
        for ch_id in seq:
            targets.append(ch_id)
            targets.append(blank_id)
        w_end = len(targets) - 2  # last non-blank state for this word
        word_state_ranges.append((w_start, w_end))

    S = len(targets)
    if S <= 1 or T == 0:
        return [(0, max(1, T)) for _ in token_seqs]

    # Minimum frames needed if every non-blank transition uses 1 frame
    min_req = sum(len(s) for s in token_seqs)
    if T < min_req:
        spans = []
        total_chars = max(1, min_req)
        cur = 0
        for seq in token_seqs:
            span_f = max(1, int(round(T * len(seq) / total_chars)))
            spans.append((min(T - 1, cur), min(T, cur + span_f)))
            cur = min(T - 1, cur + span_f)
        return spans

    t_arr = np.asarray(targets, dtype=np.int32)
    skip_mask = np.zeros(S, dtype=bool)
    for s in range(2, S):
        if t_arr[s] != blank_id and t_arr[s] != t_arr[s - 2]:
            skip_mask[s] = True

    neg_inf = -1e9
    dp = np.full(S, neg_inf, dtype=np.float32)
    dp[0] = log_probs[0, t_arr[0]]
    if S > 1:
        dp[1] = log_probs[0, t_arr[1]]

    backptr = np.zeros((T, S), dtype=np.uint8)
    for t in range(1, T):
        emit = log_probs[t, t_arr]
        stay = dp.copy()
        best = stay
        choice = np.zeros(S, dtype=np.uint8)

        step1 = np.empty(S, dtype=np.float32)
        step1[0] = neg_inf
        step1[1:] = dp[:-1]
        m1 = step1 > best
        best = np.where(m1, step1, best)
        choice = np.where(m1, 1, choice)

        if S > 2:
            step2 = np.full(S, neg_inf, dtype=np.float32)
            step2[2:] = np.where(skip_mask[2:], dp[:-2], neg_inf)
            m2 = step2 > best
            best = np.where(m2, step2, best)
            choice = np.where(m2, 2, choice)

        dp = best + emit
        backptr[t] = choice

    # Backtrack from final blank or final char state
    s = (S - 1) if (S == 1 or dp[S - 1] >= dp[S - 2]) else (S - 2)
    path = np.empty(T, dtype=np.int32)
    for t in range(T - 1, -1, -1):
        path[t] = s
        s -= int(backptr[t, s])

    spans = []
    for w_start, w_end in word_state_ranges:
        frames = np.where((path >= w_start) & (path <= w_end))[0]
        if len(frames) > 0:
            spans.append((int(frames[0]), int(frames[-1]) + 1))
        else:
            prev_e = spans[-1][1] if spans else 0
            spans.append((min(T - 1, prev_e), min(T, prev_e + 1)))
    return spans


def _align_sections_ctc(audio, sr, lyric_lines, sections, model_name, build_section_tokens, label="CTC Aligner"):
    """Shared HuggingFace Wav2Vec2ForCTC section forced-alignment engine using vectorized Viterbi DP."""
    import gc
    from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor

    device = "mps" if torch.backends.mps.is_available() else "cpu"
    print(f"[{label}] Loading {model_name} on {device}...")
    processor = Wav2Vec2Processor.from_pretrained(model_name)
    model = Wav2Vec2ForCTC.from_pretrained(model_name).to(device)
    model.eval()

    vocab = processor.tokenizer.get_vocab()
    ctx = {"vocab": vocab, "processor": processor}

    cue_words_map = {}
    for s_idx, (c_start, c_end, t_start, t_end) in enumerate(sections):
        raw_words, token_seqs, blank_id = build_section_tokens(lyric_lines, c_start, c_end, ctx)
        if not raw_words or not token_seqs:
            continue

        a_s = int(t_start * sr)
        a_e = min(len(audio), int(t_end * sr))
        slice_audio = audio[a_s:a_e].astype(np.float32)
        slice_dur = len(slice_audio) / sr

        print(f"  Section {s_idx + 1}/{len(sections)} (Cues {c_start + 1}..{c_end}): [{t_start:.2f}s - {t_end:.2f}s]")
        inputs = processor(slice_audio, sampling_rate=sr, return_tensors="pt", padding=False)
        with torch.no_grad():
            logits = model(inputs.input_values.to(device)).logits[0]
            log_probs = torch.log_softmax(logits.float(), dim=-1).cpu().numpy()

        T = log_probs.shape[0]
        frame_sec = slice_dur / max(1, T)
        spans = _viterbi_ctc_align(log_probs, token_seqs, blank_id)

        abs_words = [
            {
                "word": w,
                "text": w,
                "start": round(t_start + fs * frame_sec, 3),
                "end": round(t_start + fe * frame_sec, 3),
            }
            for w, (fs, fe) in zip(raw_words, spans)
        ]
        _map_section_words_to_cues(abs_words, lyric_lines, c_start, c_end, cue_words_map)

    del model, processor
    gc.collect()
    if torch.backends.mps.is_available():
        torch.mps.empty_cache()
    return cue_words_map


def align_sections_vi_ctc(audio, sr, lyric_lines, sections, model_name="nguyenvulebinh/wav2vec2-base-vietnamese-250h"):
    """Acoustic CTC forced alignment for Vietnamese using wav2vec2-base-vietnamese-250h."""
    def build_vi(lines, c_start, c_end, ctx):
        vocab = ctx["vocab"]
        proc = ctx["processor"]
        blank_id = proc.tokenizer.pad_token_id
        unk_id = vocab.get("<unk>", proc.tokenizer.unk_token_id)

        sec_text = " ".join(clean_for_align(l) for l in lines[c_start:c_end] if clean_for_align(l))
        raw_words = [w for w in sec_text.split() if normalize_align(w)]
        token_seqs = []
        for raw_w in raw_words:
            s = unicodedata.normalize("NFC", raw_w).lower()
            ids = []
            for ch in s:
                if ch in vocab and vocab[ch] not in (blank_id, vocab.get("|")):
                    ids.append(vocab[ch])
                elif ch.isalnum():
                    base = "".join(c for c in unicodedata.normalize("NFKD", ch.replace("đ", "d")) if not unicodedata.combining(c))
                    if base and base in vocab:
                        ids.append(vocab[base])
                    elif unk_id is not None:
                        ids.append(unk_id)
            token_seqs.append(ids or ([unk_id] if unk_id is not None else [blank_id]))
        return raw_words, token_seqs, blank_id

    return _align_sections_ctc(audio, sr, lyric_lines, sections, model_name, build_vi, label="VI CTC Aligner")


def align_sections_ja_karaoke(audio, sr, lyric_lines, sections, model_name="NextFire/mms-300m-ForcedAligner-karaoke-ja-Latn"):
    """Singing-specialized Japanese CTC forced alignment using MMS-300M fine-tuned on karaoke timings."""
    try:
        import nagisa
    except ImportError:
        nagisa = None

    def to_sung_romaji(word, pos):
        if pos == "助詞":
            if word == "は":
                return "wa"
            if word == "へ":
                return "e"
            if word == "を":
                return "o"
        if _kks:
            rom = "".join(it["hepburn"] for it in _kks.convert(word)).lower()
        else:
            rom = word.lower()
        return re.sub(r"[^a-z']+", "", rom)

    def build_ja(lines, c_start, c_end, ctx):
        vocab = ctx["vocab"]
        proc = ctx["processor"]
        blank_id = vocab.get("[PAD]", proc.tokenizer.pad_token_id)
        unk_id = vocab.get("[UNK]", proc.tokenizer.unk_token_id)

        raw_words = []
        token_seqs = []
        for ci in range(c_start, c_end):
            cleaned = clean_for_align(lines[ci])
            if not cleaned:
                continue
            if nagisa is not None:
                tag = nagisa.tagging(cleaned)
                pairs = list(zip(tag.words, tag.postags))
                expected_norm = normalize_align(cleaned)
                if normalize_align("".join(w for w, _ in pairs)) != expected_norm:
                    tag2 = nagisa.tagging(cleaned + "。")
                    pairs2 = [(w, p) for w, p in zip(tag2.words, tag2.postags) if w != "。"]
                    if normalize_align("".join(w for w, _ in pairs2)) == expected_norm:
                        pairs = pairs2
                    elif _kks is not None:
                        pairs = [(it["orig"], "") for it in _kks.convert(cleaned)]
                    else:
                        pairs = [(w, "") for w in cleaned.split()]
            elif _kks is not None:
                pairs = [(it["orig"], "") for it in _kks.convert(cleaned)]
            else:
                pairs = [(w, "") for w in cleaned.split()]

            for w, pos in pairs:
                wc = w.strip()
                if not wc or not normalize_align(wc):
                    continue
                rom = to_sung_romaji(wc, pos)
                ids = [vocab[c] for c in rom if c in vocab]
                if not ids:
                    ids = [unk_id] if unk_id is not None else [blank_id]
                raw_words.append(wc)
                token_seqs.append(ids)
        return raw_words, token_seqs, blank_id

    return _align_sections_ctc(audio, sr, lyric_lines, sections, model_name, build_ja, label="JA Karaoke CTC Aligner")


def align_sections_ultra(audio, sr, lyric_lines, sections, lang):
    from qwen_fa_ultra import LocalBoundaryAligner

    device = "mps" if torch.backends.mps.is_available() else "cpu"
    lang_name = LANG_NAME_MAP.get(lang, "Japanese")
    print(f"[Ultra Aligner] Loading 17slever17/Qwen3-ForcedAligner-Ultra on {device} (language={lang_name})...")
    aligner = LocalBoundaryAligner.from_pretrained(
        "17slever17/Qwen3-ForcedAligner-Ultra",
        device=device,
        dtype=torch.float32,
    )

    cue_words_map = {}
    for s_idx, (c_start, c_end, t_start, t_end) in enumerate(sections):
        c_lines = lyric_lines[c_start:c_end]
        clean_lines = [clean_for_align(l) for l in c_lines]
        sec_text = " ".join(l for l in clean_lines if l)
        if not sec_text:
            continue

        a_s = int(t_start * sr)
        a_e = min(len(audio), int(t_end * sr))
        slice_audio = audio[a_s:a_e]

        print(f"  Section {s_idx + 1}/{len(sections)} (Cues {c_start + 1}..{c_end}): [{t_start:.2f}s - {t_end:.2f}s]")
        res = aligner.align((slice_audio, sr), sec_text, language=lang_name)
        aligned_items = res[0]

        abs_words = []
        for item in aligned_items:
            w = item.text.strip()
            if not w:
                continue
            abs_words.append({
                "word": w,
                "text": w,
                "start": round(t_start + item.start_time, 3),
                "end": round(t_start + item.end_time, 3),
            })

        _map_section_words_to_cues(abs_words, lyric_lines, c_start, c_end, cue_words_map)

    return cue_words_map


def apply_timing_invariants(lyric_lines, cue_words_map, orig_segs=None, preserve_orig_bounds=False):
    """
    Applies production timing invariants:
    - Staccato repeated token redistribution (2x/3x/4x consecutive identical words)
    - Hard word duration floor >= 0.12s (borrowing from adjacent long words, not cascading drift)
    - Gentle midpoint inter-cue reconciliation (no blind forward pushing!)
    - Strict Flutter subtitleWordRanges containment & zero cue collisions
    - No destructive 5.0s max_dur truncation!
    """
    # 1. Per-cue staccato redistribution & word duration floor
    for idx in range(len(lyric_lines)):
        words = cue_words_map.get(idx, [])
        if not words:
            continue

        # Redistribute runs of >=2 identical consecutive words (e.g. ない ない ない, 分かってよ 分かってよ)
        i = 0
        while i < len(words):
            j = i + 1
            while j < len(words) and words[j]["text"] == words[i]["text"]:
                j += 1
            run_len = j - i
            if run_len >= 2:
                span_start = words[i]["start"]
                span_end = words[j - 1]["end"]
                total_span = span_end - span_start
                min_needed = run_len * MIN_WORD_DUR
                if total_span >= min_needed:
                    step = total_span / run_len
                    for k in range(run_len):
                        ws = span_start + k * step
                        we = span_start + (k + 1) * step - (0.01 if k < run_len - 1 else 0.0)
                        words[i + k]["start"] = round(ws, 3)
                        words[i + k]["end"] = round(max(ws + MIN_WORD_DUR, we), 3)
            i = j

        # Enforce hard floor >= MIN_WORD_DUR by borrowing from adjacent long words first
        for i in range(len(words)):
            dur = words[i]["end"] - words[i]["start"]
            if dur < MIN_WORD_DUR:
                needed = MIN_WORD_DUR - dur
                # Borrow from previous long word if available
                if i > 0:
                    prev_dur = words[i - 1]["end"] - words[i - 1]["start"]
                    if prev_dur > 0.28:
                        borrow = min(needed * 0.5, prev_dur - 0.18)
                        words[i - 1]["end"] = round(words[i - 1]["end"] - borrow, 3)
                        words[i]["start"] = round(words[i]["start"] - borrow, 3)
                        needed = max(0.0, MIN_WORD_DUR - (words[i]["end"] - words[i]["start"]))
                # Expand into gap before next word or borrow from next long word
                if needed > 0:
                    if i < len(words) - 1:
                        gap = words[i + 1]["start"] - words[i]["end"]
                        take = min(needed, max(0.0, gap))
                        words[i]["end"] = round(words[i]["end"] + take, 3)
                        needed = max(0.0, MIN_WORD_DUR - (words[i]["end"] - words[i]["start"]))
                        if needed > 0:
                            nxt_dur = words[i + 1]["end"] - words[i + 1]["start"]
                            if nxt_dur > 0.28:
                                borrow = min(needed, nxt_dur - 0.18)
                                words[i]["end"] = round(words[i]["end"] + borrow, 3)
                                words[i + 1]["start"] = round(words[i + 1]["start"] + borrow, 3)
                            else:
                                words[i]["end"] = round(words[i]["start"] + MIN_WORD_DUR, 3)
                    else:
                        words[i]["end"] = round(words[i]["end"] + needed, 3)

        # Ensure internal monotonicity within cue
        for i in range(1, len(words)):
            if words[i]["start"] < words[i - 1]["end"]:
                words[i]["start"] = words[i - 1]["end"]
            if words[i]["end"] < words[i]["start"] + MIN_WORD_DUR:
                words[i]["end"] = round(words[i]["start"] + MIN_WORD_DUR, 3)

    # 2. Gentle inter-cue word overlap reconciliation (guarantee >= 0.02s separation so midpoint split never collides)
    for i in range(len(lyric_lines) - 1):
        cw = cue_words_map.get(i, [])
        nw = cue_words_map.get(i + 1, [])
        if not cw or not nw:
            continue
        if nw[0]["start"] < cw[-1]["end"] + 0.02:
            cur_dur = cw[-1]["end"] - cw[-1]["start"]
            if cur_dur > MIN_WORD_DUR + 0.04 and nw[0]["start"] >= cw[-1]["start"] + MIN_WORD_DUR + 0.02:
                # Trim tail of previous cue's held vowel
                cw[-1]["end"] = round(nw[0]["start"] - 0.02, 3)
            else:
                split = round(cw[-1]["end"] + 0.02, 3)
                nw[0]["start"] = split
                if nw[0]["end"] < split + MIN_WORD_DUR:
                    nw[0]["end"] = round(split + MIN_WORD_DUR, 3)
                for k in range(1, len(nw)):
                    if nw[k]["start"] < nw[k - 1]["end"]:
                        nw[k]["start"] = nw[k - 1]["end"]
                    if nw[k]["end"] < nw[k]["start"] + MIN_WORD_DUR:
                        nw[k]["end"] = round(nw[k]["start"] + MIN_WORD_DUR, 3)

    # 3. Compute zero-collision monotonic cue boundaries enclosing all words
    segments = []
    all_words = []
    for i, text in enumerate(lyric_lines):
        words = cue_words_map.get(i, [])
        tokens = orig_segs[i].get("tokens", []) if (orig_segs and i < len(orig_segs)) else []
        if not words:
            s = orig_segs[i]["start"] if (orig_segs and i < len(orig_segs)) else round(i * 3.0, 2)
            d = orig_segs[i]["duration"] if (orig_segs and i < len(orig_segs)) else 2.5
            segments.append({"start": round(s, 2), "duration": round(d, 2), "text": text, "wordTimings": [], "tokens": tokens})
            continue

        v_start = words[0]["start"]
        v_end = words[-1]["end"]

        if preserve_orig_bounds and orig_segs and i < len(orig_segs):
            # Stay close to original human boundaries when they already cleanly enclose the words
            orig_s = orig_segs[i]["start"]
            orig_e = orig_s + orig_segs[i]["duration"]
            c_start = orig_s if (orig_s <= v_start and v_start - orig_s <= 0.45) else max(0.0, round(v_start - LEAD_IN, 2))
            c_end = orig_e if (orig_e >= v_end and orig_e - v_end <= 0.65) else round(v_end + POST_PAD, 2)
        else:
            c_start = max(0.0, round(v_start - LEAD_IN, 2))
            c_end = round(v_end + POST_PAD, 2)

        segments.append({
            "start": round(c_start, 2),
            "end": round(c_end, 2),
            "text": text,
            "wordTimings": words,
            "tokens": tokens,
        })
        all_words.extend(words)

    # Enforce strict monotonic non-overlapping boundaries across all cues
    for i in range(len(segments)):
        c = segments[i]
        w = c["wordTimings"]
        if not w:
            c["duration"] = round(max(0.4, c.get("end", c["start"] + c.get("duration", 2.0)) - c["start"]), 2)
            c.pop("end", None)
            continue
        v_start = w[0]["start"]
        v_end = w[-1]["end"]

        if i < len(segments) - 1 and segments[i + 1]["wordTimings"]:
            nxt_v_start = segments[i + 1]["wordTimings"][0]["start"]
            gap = nxt_v_start - v_end
            if gap >= GAP_CLEAR:
                c["end"] = min(c["end"], round(v_end + POST_PAD, 3))
                segments[i + 1]["start"] = max(c["end"], round(nxt_v_start - LEAD_IN, 3))
            else:
                # Exact midpoint between v_end and nxt_v_start guarantees v_end <= split <= nxt_v_start with 0 collision
                split = round((v_end + nxt_v_start) / 2.0, 3)
                c["end"] = split
                segments[i + 1]["start"] = split

        # Hard containment guarantee for Flutter subtitleWordRanges (only adjust if strictly outside)
        if c["start"] > v_start:
            c["start"] = round(max(0.0, v_start), 3)
        if c["end"] < v_end:
            c["end"] = round(v_end, 3)
        c["start"] = round(c["start"], 3)
        c["duration"] = round(c["end"] - c["start"], 3)
        c.pop("end", None)

    return segments, all_words


def main():
    parser = argparse.ArgumentParser(description="Voca Unified Ultra Acoustic Aligner (Music & Broad Videos)")
    parser.add_argument("--video-id", required=True, help="YouTube video ID")
    parser.add_argument("--lang", default="ja", help="Source language code (ja, zh, ko, en, vi)")
    parser.add_argument("--mode", choices=["auto", "refine-only", "asr", "lyrics", "lrc"], default="auto",
                        help="Alignment mode: auto (default), refine-only (zero-ASR existing cues), asr (transcribe & chunk general videos), lyrics (plain lyrics), lrc (timed LRC)")
    parser.add_argument("--source-cues", help="Path to existing refined JSON cues (or 'r2' to fetch native track from R2)")
    parser.add_argument("--lyrics-file", help="Path to authentic lyrics/LRC file (or 'auto' for LRCLIB)")
    parser.add_argument("--title", default="", help="Video/song title (used for LRCLIB search)")
    parser.add_argument("--artist", default="", help="Channel/artist name (used for LRCLIB search)")
    parser.add_argument("--asr-model", default="auto", help="ASR model ('auto' selects vinai/PhoWhisper-medium for vi, Qwen/Qwen3-ASR-1.7B otherwise)")
    parser.add_argument("--vi-aligner-model", default="nguyenvulebinh/wav2vec2-base-vietnamese-250h", help="Vietnamese CTC forced-aligner model")
    parser.add_argument("--ja-aligner", choices=["auto", "ultra", "karaoke"], default="auto",
                        help="Japanese forced aligner backend: auto (karaoke CTC for lyrics/lrc or --music, Ultra for speech), ultra, karaoke")
    parser.add_argument("--music", action="store_true", help="Hint that input is a music track (enables JA singing-specialized karaoke CTC aligner in auto mode)")
    parser.add_argument("--context", default="", help="Optional space-separated domain/character vocabulary context for Qwen3-ASR")
    parser.add_argument("--min-auth-score", type=float, default=0.40, help="Min phonetic authenticity score (0-1)")
    parser.add_argument("--skip-auth-check", action="store_true", help="Skip phonetic authenticity gate")
    parser.add_argument("--strip-adlibs", action="store_true", help="Strip faint parenthetical backing ad-libs (oh, ooh, mm) before alignment")
    parser.add_argument("--max-sec-dur", type=float, default=0.0, help="Max continuous section duration in seconds (0 = adaptive 16-22s)")
    parser.add_argument("--out", help="Output path (default: server/transcripts_cache/{videoId}_{lang}.ai.json)")
    args = parser.parse_args()

    video_id = args.video_id
    lang = args.lang
    out_path = args.out or os.path.join("server", "transcripts_cache", f"{video_id}_{lang}.ai.json")

    wav_path = f"/tmp/{video_id}_16k.wav"
    download_audio(video_id, wav_path)
    audio, sr = sf.read(wav_path)
    total_sec = len(audio) / sr
    print(f"[{video_id}] Audio ready: {total_sec:.2f}s @ {sr}Hz")

    orig_segs = None
    lyric_lines = []
    cue_windows = []
    effective_mode = args.mode

    if effective_mode == "auto":
        if args.source_cues:
            effective_mode = "refine-only"
        elif args.lyrics_file and args.lyrics_file != "auto" and os.path.exists(args.lyrics_file):
            with open(args.lyrics_file, "r", encoding="utf-8") as f:
                lrc_c, _ = parse_lrc_text(f.read())
            effective_mode = "lrc" if lrc_c else "lyrics"
        elif args.lyrics_file == "auto" or args.title:
            effective_mode = "lrc"
        else:
            effective_mode = "asr"
        print(f"[{video_id}] Auto-selected mode: {effective_mode}")

    if effective_mode == "refine-only":
        if args.source_cues == "r2" or not args.source_cues:
            data = fetch_r2_native_cues(video_id, lang)
        else:
            with open(args.source_cues, "r", encoding="utf-8") as f:
                data = json.load(f)
        orig_segs = data if isinstance(data, list) else data.get("segments", [])
        if not orig_segs:
            raise RuntimeError(f"[{video_id}] No segments found in source cues")
        lyric_lines = [strip_overlapping_adlibs(s["text"]) if args.strip_adlibs else s["text"] for s in orig_segs]
        cue_windows = [{"start": float(s["start"]), "end": float(s["start"]) + float(s["duration"]), "text": lyric_lines[i]} for i, s in enumerate(orig_segs)]
        print(f"[{video_id}] Mode=refine-only: loaded {len(orig_segs)} official refined cues (ZERO ASR text mutation).")

    elif effective_mode == "asr":
        coarse_words = run_coarse_asr(wav_path, lang, model_name=args.asr_model, context=args.context)
        if not coarse_words:
            raise RuntimeError(f"[{video_id}] ASR produced 0 words for {wav_path}")
        lyric_lines, cue_windows = chunk_asr_clauses(coarse_words, lang, total_sec)

    elif effective_mode in ("lyrics", "lrc"):
        lrc_cues, plain_lines = [], []
        if args.lyrics_file and args.lyrics_file != "auto":
            with open(args.lyrics_file, "r", encoding="utf-8") as f:
                lrc_cues, plain_lines = parse_lrc_text(f.read())
        else:
            q = f"{args.title} {args.artist}".strip() or video_id
            lrc_cues, plain_lines = fetch_lrclib(q, lang, duration=total_sec)

        if args.strip_adlibs:
            lrc_cues = [{"start": c["start"], "text": strip_overlapping_adlibs(c["text"])} for c in lrc_cues if strip_overlapping_adlibs(c["text"])]
            plain_lines = [strip_overlapping_adlibs(l) for l in plain_lines if strip_overlapping_adlibs(l)]

        lyric_lines = [c["text"] for c in lrc_cues] if (effective_mode == "lrc" and lrc_cues) else plain_lines
        coarse_words = run_coarse_asr(wav_path, lang, model_name=args.asr_model, context=args.context)

        if not lyric_lines:
            if args.mode == "auto":
                print(f"[{video_id}] No external lyrics found; falling back to mode=asr clause chunking.")
                effective_mode = "asr"
                lyric_lines, cue_windows = chunk_asr_clauses(coarse_words, lang, total_sec)
            else:
                raise RuntimeError(f"[{video_id}] No authentic lyrics available. Provide --lyrics-file or use --mode=asr.")
        else:
            if not args.skip_auth_check:
                try:
                    verify_lyrics_authenticity(lyric_lines, coarse_words, lang, min_score=args.min_auth_score)
                except RuntimeError:
                    if args.mode == "auto":
                        print(f"[{video_id}] External lyrics failed authenticity check; falling back to mode=asr.")
                        effective_mode = "asr"
                        lyric_lines, cue_windows = chunk_asr_clauses(coarse_words, lang, total_sec)
                    else:
                        raise

            if effective_mode in ("lyrics", "lrc"):
                if effective_mode == "lrc" and lrc_cues:
                    cue_windows = apply_lrc_peak_offset(lrc_cues, coarse_words, lang, total_sec)
                else:
                    cue_windows = coarse_match_windows(lyric_lines, coarse_words, lang, total_sec)

    sections = cluster_continuous_sections(cue_windows, total_sec, max_sec_dur=args.max_sec_dur)
    print(f"[{video_id}] Clustered {len(lyric_lines)} cues into {len(sections)} continuous sections.")

    if lang == "vi":
        cue_words_map = align_sections_vi_ctc(audio, sr, lyric_lines, sections, model_name=args.vi_aligner_model)
        provider_name = "phowhisper_vi_wav2vec2_ctc"
    elif lang == "ja" and (args.ja_aligner == "karaoke" or (args.ja_aligner == "auto" and (args.music or effective_mode in ("lyrics", "lrc")))):
        cue_words_map = align_sections_ja_karaoke(audio, sr, lyric_lines, sections)
        provider_name = "mms_karaoke_ja_ctc"
    else:
        cue_words_map = align_sections_ultra(audio, sr, lyric_lines, sections, lang)
        provider_name = "qwen3_fa_ultra_localhead"

    segments, all_words = apply_timing_invariants(
        lyric_lines,
        cue_words_map,
        orig_segs=orig_segs,
        preserve_orig_bounds=(effective_mode == "refine-only"),
    )

    payload = {
        "videoId": video_id,
        "language": lang,
        "source": "ai",
        "provider": provider_name,
        "timestamp": int(time.time() * 1000),
        "segments": segments,
        "wordTimings": all_words,
    }

    os.makedirs(os.path.dirname(out_path) or ".", exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"[{video_id}] Wrote aligned AI track -> {out_path} ({len(segments)} cues, {len(all_words)} words)")


if __name__ == "__main__":
    main()
