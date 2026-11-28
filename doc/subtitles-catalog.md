# LinguaTube Subtitles Catalog & Upgrade Tracker (doc/subtitles-catalog.md)

This document tracks the subtitle status, acoustic alignment methods, and dual-language translation coverage for all videos in the LinguaTube catalog across Cloudflare D1 (`video_languages`) and Cloudflare R2 storage.

> [!IMPORTANT]
> **Rule for Future AI Agents**: Load and consult this catalog before performing subtitle upgrades, translations, or acoustic re-alignment. When upgrading any video, update Cloudflare R2 (`transcripts/` and `translations/`), sync D1 (`sub_languages = '["ja","vi","en"]'`), and **update this tracking document**.

---

## 1. Catalog Summary & Key Metrics

- **Total Catalog Videos in D1**: 259
- **Videos with Dual Subtitles (`>= 2` sub_languages)**: **161** (62% of catalog)
  - 🎬 **Doraemon TV Episodes**: 29 active upgraded (5 unavailable episodes removed from D1)
  - 🍿 **Doraemon Feature Movies**: 2 upgraded (full 100+ min on-device Qwen3-ASR 1.7B)
  - 🌟 **Doraemon Specials & Short Movies**: 6 upgraded (20–40 min on-device Qwen3-ASR 1.7B)
  - 🎵 **Music & Synchronized Songs**: 72 dual-sub (`89` total music in D1)
  - 🇯🇵 **Japanese Curated (Education / Vlog / Podcast)**: 28 upgraded
  - 🌏 **Multi-Language Curated (EN / ZH / KO / VI)**: 10+ upgraded
- **Pending Doraemon Videos Requiring Upgrade**: **3 in D1** (16s bumper & 9h Vietnamese dub)

---

## 2. Doraemon Franchise Tracking

### 2.1. Upgraded Theatrical Feature Movies (2 Movies)

Transcribed 100% on-device on Apple Silicon Metal GPU with Qwen3-ASR 1.7B, tokenized with Kuromoji, and dual localized into Vietnamese and English.

| Video ID | Title | Duration | Level | Sub Languages | Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `fB5wx0c1TiY` | 映画ドラえもん のび太の南極カチコチ大冒険 | 100:54 | JLPT N4 | `["ja","vi","en"]` | ✅ Upgraded |
| `Kc5SzceuWgk` | 映画ドラえもん 新・のび太の日本誕生 | 103:55 | JLPT N4 | `["ja","vi","en"]` | ✅ Upgraded |

### 2.2. Upgraded Short Movies & Specials (6 Movies)

Medium-length 20–40 minute standalone short movies and specials. 100% transcribed with Qwen3-ASR 1.7B on Apple Silicon Metal GPU with Kuromoji tokens & dual subtitles.

| Video ID | Title | Duration | Level | Sub Languages | Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `uCVIqo-2Rdk` | Doraemon MOVIE Japan 1 | 27:14 | JLPT N4 | `["ja","vi","en"]` | ✅ Upgraded |
| `rTp5lZK2lYk` | Doraemon Short Movie) Doraemon ra đời | 31:01 | JLPT N4 | `["ja","vi","en"]` | ✅ Upgraded |
| `bI6krB42BzY` | Doraemon The Short Movie 2001 - Cố Lên! Jaian!! | 26:41 | JLPT N4 | `["ja","vi","en"]` | ✅ Upgraded |
| `itaDdEcyaOE` | Dorami The Short Movie 1991 - Băng cướp nhí | 39:55 | JLPT N4 | `["ja","vi","en"]` | ✅ Upgraded |
| `aXc7NJ3B39Q` | Mèo Máy Doremon - Chuyến Tàu Tốc Hành và Vương Quốc Bánh Kẹo | 32:56 | JLPT N4 | `["ja","vi","en"]` | ✅ Upgraded |
| `kQDwd-fLfVs` | Tác giả doraemon " Tôi Là Fujiko F  Fujio " | 20:04 | JLPT N4 | `["ja","vi","en"]` | ✅ Upgraded |

### 2.3. Upgraded Episodic TV Episodes (29 Active Episodes)

Standard 8–13 minute TV anime episodes. Each includes word-level Furigana tokens and character-voiced Vietnamese & English subtitles in R2.

| # | Video ID | Episode / Title | Duration | Level | Sub Languages |
| :-: | :--- | :--- | :---: | :---: | :---: |
| 1 | `Ndfm5pBqBlw` | 夏だ！一番 ドラえもん祭り 特別映像まとめ | 7:43 | JLPT N4 | `["ja","vi","en"]` |
| 2 | `1ELQB1P2Hbg` | 大山版ドラえもん　第1225話　あまえんぼシール | 10:50 | JLPT N4 | `["ja","vi","en"]` |
| 3 | `LrAIN23aETQ` | 大山版ドラえもん　第1249話　リトマス人生試験紙 | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 4 | `41ULuYPLJ24` | 大山版ドラえもん　第1367話　プラネタリウム式3D | 8:57 | JLPT N4 | `["ja","vi","en"]` |
| 5 | `djoOc9HgvE0` | 大山版ドラえもん　第1412話　ウキウキプール | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 6 | `UUtCLFtlytU` | 大山版ドラえもん　第1413話　持ち主を探せ! | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 7 | `dZzkxgw1jGo` | 大山版ドラえもん　第1415話　のび犬のび太 | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 8 | `Dolye8l8eNg` | 大山版ドラえもん　第1417話　弟はのび太くん | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 9 | `BBo8n1G6ffc` | 大山版ドラえもん　第1418話　ミイちゃんが行方不明 | 8:51 | JLPT N4 | `["ja","vi","en"]` |
| 10 | `dkSrAgtYemc` | 大山版ドラえもん　第1419話　プライドクスグリン | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 11 | `nhntwk6eCv8` | 大山版ドラえもん　第1420話　カードテレビ電話 | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 12 | `hIHIEVUB5Kg` | 大山版ドラえもん　第1430話　危機一髪ヘルメット | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 13 | `lP-5QyXL3Vw` | 大山版ドラえもん　第1434話　雪だるまドラ太郎 | 8:09 | JLPT N4 | `["ja","vi","en"]` |
| 14 | `qlIbYWeKhHg` | 大山版ドラえもん　第1443話　カードテレビ電話 | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 15 | `3e-0vtDIrCM` | 大山版ドラえもん　第1451話　のび太は一寸法師 | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 16 | `1XB1w-JkrIs` | 大山版ドラえもん　第1457話　水泳やり直し計画 | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 17 | `BDMYxkPLn2A` | 大山版ドラえもん　第1458話　バルーンシューズ | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 18 | `hr8prYx4CXA` | 大山版ドラえもん　第1459話　そこだけスポット | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 19 | `NJbvpLU0lZ0` | 大山版ドラえもん　第1460話　格闘家バッテリー | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 20 | `d-ILmsxyxfM` | 大山版ドラえもん　第1461話　のび太彗星 | 8:57 | JLPT N4 | `["ja","vi","en"]` |
| 21 | `CIXndPzZ5hc` | 大山版ドラえもん　第1462話　アマイワト | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 22 | `4BrXnbaNPQw` | 大山版ドラえもん　第1472話　ボクを止めるのび太 | 8:58 | JLPT N4 | `["ja","vi","en"]` |
| 23 | `KtvdnQLJaCw` | 大山版ドラえもん　第744B話　のび太のガリバー旅行 | 7:10 | JLPT N4 | `["ja","vi","en"]` |
| 24 | `UXLSfO5w3rE` | 第0814話　「メッセージ大砲」 | 12:43 | JLPT N4 | `["ja","vi","en"]` |
| 25 | `bWf5pCxwr00` | 第0815話　「ネンドロイド」 | 12:44 | JLPT N4 | `["ja","vi","en"]` |
| 26 | `0sCKyE3VNho` | 第0816話　「シズメバチの巣」 | 12:44 | JLPT N4 | `["ja","vi","en"]` |
| 27 | `sD1RjebDGQI` | 第0834話　「しゅっちょう口目」 | 12:44 | JLPT N4 | `["ja","vi","en"]` |
| 28 | `TBjJPjibGWE` | 第0835話　「箱庭シリーズ」 | 12:44 | JLPT N4 | `["ja","vi","en"]` |
| 29 | `sn7hPV_pNdQ` | 第0836話　「バショーおうぎ」 | 12:44 | JLPT N4 | `["ja","vi","en"]` |

### 2.4. Doraemon Videos Pending Upgrade (3 Videos)

| Video ID | Title | Duration | Current Sub | Target Action |
| :--- | :--- | :---: | :---: | :--- |
| `wNylndnHlpI` | Doraemon (1973) - Offer Credits (Start - Audio) | 0:16 | `["ja"]` | ⏳ Non-standard (short snippet) |
| `OiGgkXJr9ns` | Doraemon - 9 Tiếng Cười Liên Tục | Trọn Bộ Tập Dài #1 | S13 | 557:29 | `[]` | ⏳ Non-standard (Vietnamese dub compilation) |
| `ojI9fg35rX0` | Phim song ngữ Việt Nhật - Doremon - Tên trộm đêm Giáng sinh. | 35:26 | `["ja"]` | ⏳ Non-standard (Vietnamese dub compilation) |

---

## 3. Music & Synchronized Songs (35 Tracks)

Acoustically aligned at the millisecond level using Apple Silicon Metal GPU Qwen3-ASR and LRCLIB peak offset alignment.

### 3.1. Qwen3-ForcedAligner-Ultra + Local Boundary Alignment (37 Music Videos)

The following 37 core music tracks have been upgraded to **Qwen3-ForcedAligner-Ultra** (`17slever17/Qwen3-ForcedAligner-Ultra` with `LocalBoundaryAligner` on Metal GPU `mps`). Authentic lyrics were retrieved from verified official web sources and video descriptions to guarantee 100% lyric fidelity:

| Video ID | Title / Artist | Lang | Cues | Words | Acoustic Status |
| :--- | :--- | :---: | :---: | :---: | :--- |
| `IpFX2vq8HKw` | yung kai - blue (official music video) | en | 24 | 199 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `BzE1mX4Px0I` | Selena Gomez & The Scene - Who Says | en | 80 | 524 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `igIfiqqVHtA` | Taylor Swift - Enchanted (Taylor's Version) (Lyric Video) | en | 55 | 389 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `AgFeZr5ptV8` | Taylor Swift - 22 | en | 70 | 415 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `8xg3vE8Ie_E` | Taylor Swift - Love Story | en | 52 | 403 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `VuNIsY6JdUw` | Taylor Swift - You Belong With Me | en | 62 | 429 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `nfWlot6h_JM` | Taylor Swift - Shake It Off | en | 69 | 618 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `-CmadmM5cOk` | Taylor Swift - Style | en | 49 | 387 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `IdneKLhsWOQ` | Taylor Swift - Wildest Dreams | en | 59 | 387 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `3tmd-ClpJxA` | Taylor Swift - Look What You Made Me Do | en | 69 | 569 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `-BjZmE2gtdo` | Taylor Swift - Lover (Official Music Video) | en | 33 | 273 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `b1kbLwvqugk` | Taylor Swift - Anti-Hero (Official Music Video) | en | 61 | 366 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `ic8j13piAhQ` | Taylor Swift - Cruel Summer (Official Audio) | en | 59 | 497 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `K-a8s8OLBSE` | Taylor Swift - cardigan | en | 56 | 353 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `e-ORhEE9VVg` | Taylor Swift - Blank Space | en | 82 | 574 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `n89SKAymNfA` | RADWIMPS - Nandemonaiya (movie ver.) | ja | 44 | 422 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `Opp9nqiN5m0` | Aimer - カタオモイ / THE FIRST TAKE | ja | 43 | 315 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `ZRtdQ81jPUQ` | YOASOBI - アイドル (Idol) | ja | 76 | 465 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `knUMag0Iu0g` | 米津玄師 - Orion | ja | 53 | 302 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `EQ94zflNqn4` | RADWIMPS - 愛にできることはまだあるかい | ja | 49 | 401 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `GfS1_DEvsVg` | レミオロメン - 3月9日 | ja | 84 | 225 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `SAtVrwS86pE` | Novelbright - 透明 | ja | 52 | 238 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `vMnFnDqvRg4` | 宵シグレ - EDEN | ja | 47 | 205 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `rghnNC1lRXc` | 星街すいせい - GHOST | ja | 68 | 171 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `MD-RIcD_OFQ` | RADWIMPS - なんでもないや (上白石萌音) | ja | 44 | 422 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `k10wNKkWfKM` | 傘村トータ - さよなら、僕のヒーロー | ja | 113 | 377 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `KWfcqJFutqw` | 傘村トータ - 僕が夢を捨てて大人になるまで | ja | 33 | 227 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `ylLOn6KXzAc` | Aimer - Ref:rain | ja | 51 | 341 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `vULntXmZRuw` | Phineas and Ferb Opening (JP) | ja | 22 | 111 | ✅ Ultra Local Boundary (0 collapsed, 0 collisions) |
| `BZRT37f8zZY` | Đại Lộ Mặt Trời (Heather JP Cover) | ja | 41 | 245 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `48dZqMeIQ7U` | 薛之謙 - 跳樓機 (森森鈴蘭 Cover) | zh | 48 | 484 | ✅ Ultra Local Boundary (0 collapsed, 0 collisions) |
| `id3tzhaC5EY` | 升温 | zh | 63 | 451 | ✅ Ultra Local Boundary (0 collapsed, 0 collisions) |
| `yCEMu2KnEF8` | Khách Mời 嘉宾 (Duet) | zh | 161 | 1058 | ✅ Ultra Local Boundary (0 collapsed, 0 collisions) |
| `xDxW42EhksI` | Phép Màu (奇跡) - Heather JP Cover | ja | 37 | 183 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `SX_ViT4Ra7k` | 米津玄師 Kenshi Yonezu - Lemon (Official MV) | ja | 43 | 311 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `QjrkrVmC-8M` | Mrs. GREEN APPLE「ライラック」Official Music Video | ja | 82 | 427 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `LmZD-TU96q4` | 米津玄師 Kenshi Yonezu - IRIS OUT | ja | 49 | 235 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `pyDCubgU57g` | 蒼のワルツ - Eve MV | ja | 36 | 325 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `ZGp_x1O2-e0` | Aiobahn +81『INTERNET ANGEL』Official Music Video│TVアニメ『NEEDY GIRL OVERDOSE』アニメMV | ja | 78 | 497 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `5QhwXoy8CT8` | KOKIA - Spirits | ja | 30 | 235 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `OBiTTOc7-Sw` | 恋泥棒。 /『ユイカ』【こはならむ】 | ja | 37 | 333 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `kImpWphugRY` | No.1 / 西野カナ (Kobasolo & Lefty Hand Cream) | ja | 52 | 339 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `TXzfQ0cP1P0` | 【初音ミク】恋愛裁判 Love Trial | ja | 43 | 255 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `8dqNwVUofxo` | ふたりごと / RADWIMPS (コバソロ & 春茶) | ja | 68 | 526 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `clU8c2fpk2s` | Lemon / 米津玄師 (コバソロ & 春茶) | ja | 37 | 311 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `OIBODIPC_8Y` | YOASOBI「勇者」 Official Music Video | ja | 70 | 409 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `impSuIygMiQ` | LiSA×Uru - 再会 / THE FIRST TAKE | ja | 48 | 302 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `Qp3b-RXtz4w` | 【Ado】うっせぇわ | ja | 53 | 334 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `5qMhIBHHRA4` | 7co - nekojarashi | ja | 43 | 230 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `-tKVN2mAKRI` | DAOKO × 米津玄師『打上花火』MUSIC VIDEO | ja | 44 | 253 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `PgCc3OMrS8c` | 今はいいんだよ。 / MIMI【Covered by Kotoha】 | ja | 35 | 245 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `ydwWBIgNzEc` | 無理に笑わなくて良いよ cover. 鹿乃 | ja | 27 | 207 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `p0JFc5giu9U` | Yamano Satoko - ドラえもんのうた | ja | 22 | 134 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `ptiK8U4WlSc` | Fujii Kaze - Michi Teyu Ku (満ちてゆく) | ja | 32 | 218 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `1aXRcZaOtFw` | 会いたい《想见你想见你想见你》/ cover 鹿乃 | ja | 48 | 299 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `yX7c7-j0X_0` | ReoNa - ANIMA (SAO Alicization War of Underworld Part.2 OP) | ja | 53 | 265 | ✅ MMS JA Karaoke CTC (`NextFire`) + Curated VI/EN (0 collapsed, 0 collisions) |
| `t2mQxEtNgA0` | Mili - Bulbel / ENDER LILIES | en | 44 | 262 | ✅ Ultra Local Boundary + Official VI/JA (0 collapsed, 0 collisions) |
| `BXB26PzV31k` | Mori Calliope - end of a life | en | 112 | 716 | ✅ Ultra Local Boundary + Curated VI/JA (0 collapsed, 0 collisions) |
| `dQw4w9WgXcQ` | Rick Astley - Never Gonna Give You Up | en | 64 | 369 | ✅ Ultra Local Boundary (0 collapsed, 0 collisions) |
| `RvIlfvCNUew` | AmaLee - I Say Yes | en | 48 | 306 | ✅ Ultra Local Boundary + Curated VI/JA (0 collapsed, 0 collisions) |
| `9eL4Scy4-Ys` | Đạt G - Ác Mộng Đẹp | vi | 47 | 469 | ✅ PhoWhisper + wav2vec2 VI CTC + Curated EN/JA (0 collapsed, 0 collisions) |

| Video ID | Song / Artist | Lang | Duration | Sub Languages |
| :--- | :--- | :---: | :---: | :---: |
| `mWRsgZuwf_8` | Imagine Dragons - Demons (Official Music Video) | en | 3:57 | `["en","vi","ja"]` |
| `68wFpO8oeM4` | Love Trial (English Cover)【JubyPhonic】恋愛裁判 | en | 4:05 | `["en","vi","ja"]` |
| `kJQP7kiw5Fk` | Luis Fonsi - Despacito ft. Daddy Yankee | en | 4:42 | `["en","vi","ja"]` |
| `dQw4w9WgXcQ` | Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster) | en | 3:34 | `["en","vi","ja"]` |
| `BXB26PzV31k` | [MV] end of a life - Calliope Mori (Original Song) | en | 4:44 | `["en","vi","ja"]` |
| `Opp9nqiN5m0` | Aimer - カタオモイ / THE FIRST TAKE | ja | 4:17 | `["ja","vi","en"]` |
| `-tKVN2mAKRI` | DAOKO × 米津玄師『打上花火』MUSIC VIDEO | ja | 4:53 | `["ja","vi","en"]` |
| `rghnNC1lRXc` | GHOST (Piano Version) - 星街すいせい【Roca Rourin】COVER | ja | 4:00 | `["ja","vi","en"]` |
| `MD-RIcD_OFQ` | Japanese soft song • Nandemonaiya - Mone Kamishiraishi (Mitsuha) | Lyrics Video | ja | 6:00 | `["ja","vi","en"]` |
| `impSuIygMiQ` | LiSA×Uru - 再会 (produced by Ayase) / THE FIRST TAKE | ja | 4:45 | `["ja","vi","en"]` |
| `n89SKAymNfA` | Nandemonaiya - movie ver. | ja | 5:45 | `["ja","vi","en"]` |
| `kImpWphugRY` | No.1/西野カナ『掟上今日子の備忘録』主題歌（Full Cover by Kobasolo & Lefty Hand Cream） | ja | 3:49 | `["ja","vi","en"]` |
| `SAtVrwS86pE` | Novelbright - 透明 [Official Music Video] | ja | 3:12 | `["ja","vi","en"]` |
| `xDxW42EhksI` | Phép Màu (奇跡) - MAYDAYs ft. Minh Tốc | Cover Tiếng Nhật by Heather | ja | 4:16 | `["ja","vi","en"]` |
| `EQ94zflNqn4` | RADWIMPS - 愛にできることはまだあるかい [Official Music Video] | ja | 6:44 | `["ja","vi","en"]` |
| `ZRtdQ81jPUQ` | YOASOBI「アイドル」 Official Music Video | ja | 3:46 | `["ja","vi","en"]` |
| `OIBODIPC_8Y` | YOASOBI「勇者」 Official Music Video／TVアニメ『葬送のフリーレン』オープニングテーマ | ja | 3:24 | `["ja","vi","en"]` |
| `5qMhIBHHRA4` | You and I Are Polar Opposites Season 2 - Opening FULL "nekojarashi" by 7co (Lyrics) | ja | 2:48 | `["ja","vi","en"]` |
| `Qp3b-RXtz4w` | 【Ado】うっせぇわ | ja | 3:09 | `["ja","vi","en"]` |
| `TXzfQ0cP1P0` | 【初音ミク】 恋愛裁判 Love Trial 【オリジナルMV】 | ja | 3:42 | `["ja","vi","en"]` |
| `clU8c2fpk2s` | 【女性が歌う】Lemon/米津玄師(Full Covered by コバソロ & 春茶) | ja | 4:32 | `["ja","vi","en"]` |
| `8dqNwVUofxo` | 【女性が歌う】ふたりごと/RADWIMPS(Covered by コバソロ & 春茶) | ja | 4:26 | `["ja","vi","en"]` |
| `k10wNKkWfKM` | さよなら、僕のヒーロー/傘村トータ  -cover- 【Cereus】 | ja | 6:16 | `["ja","vi","en"]` |
| `knUMag0Iu0g` | オリオン (Orion – Acoustic Arrange) Sangatsu no Lion | ver. Marie☆FD | ja | 4:49 | `["ja","vi","en"]` |
| `PgCc3OMrS8c` | 今はいいんだよ。 / MIMI【Covered by Kotoha】 | ja | 2:28 | `["ja","vi","en"]` |
| `OBiTTOc7-Sw` | 恋泥棒。 /『ユイカ』【こはならむ】 | ja | 3:50 | `["ja","vi","en"]` |
| `ydwWBIgNzEc` | 無理に笑わなくて良いよ cover. 鹿乃 | ja | 1:52 | `["ja","vi","en"]` |
| `SX_ViT4Ra7k` | 米津玄師  Kenshi Yonezu  - Lemon | ja | 4:35 | `["ja","vi","en"]` |
| `QjrkrVmC-8M` | Mrs. GREEN APPLE「ライラック」Official Music Video | ja | 5:03 | `["ja","vi","en"]` |
| `LmZD-TU96q4` | 米津玄師 Kenshi Yonezu - IRIS OUT | ja | 2:33 | `["ja","vi","en"]` |
| `pyDCubgU57g` | 蒼のワルツ - Eve MV | ja | 4:48 | `["ja","vi","en"]` |
| `ZGp_x1O2-e0` | Aiobahn +81『INTERNET ANGEL』Official Music Video│TVアニメ『NEEDY GIRL OVERDOSE』アニメMV | ja | 4:19 | `["ja","vi","en"]` |
| `p0JFc5giu9U` | Yamano Satoko ドラえもんのうた Doraemon no uta Lyrics | ja | 2:59 | `["ja","vi","en"]` |
| `ptiK8U4WlSc` | Fujii Kaze - Michi Teyu Ku (Overflowing) / Official Video | ja | 6:02 | `["ja","vi","en"]` |
| `ylLOn6KXzAc` | 【Ref:rain】色づく世界の明日から【AMV/MAD】 | ja | 4:50 | `["ja","vi","en"]` |
| `5QhwXoy8CT8` | 【Spirits】-『如果這是無法反抗的命運的話 我會為了你而活下去』 | ja | 4:51 | `["ja","vi","en"]` |
| `KWfcqJFutqw` | 【六周年】『 僕が夢を捨てて大人になるまで / 傘村トータ 』【納納】 cover | ja | 3:37 | `["ja","vi","en"]` |
| `vMnFnDqvRg4` | EDEN | ja | 3:21 | `["ja","vi","en"]` |
| `BZRT37f8zZY` | Đại Lộ Mặt Trời (太陽の大通り) - Chillies ft. Morisaki Win | Full Cover Tiếng Nhật by Heather | ja | 4:13 | `["ja","vi","en"]` |
| `GfS1_DEvsVg` | レミオロメン 『3月9日』 Full cover by Lefty Hand Cream | ja | 4:29 | `["ja","vi","en"]` |
| `yX7c7-j0X_0` | ReoNa - ANIMA (Sword Art Online : Alicization - War of Underworld Part.2 OP) Lyrics [Kan/Rom/Eng] | ja | 4:29 | `["ja","vi","en"]` |
| `9bZkp7q19f0` | PSY - GANGNAM STYLE(강남스타일) M/V | ko | 4:12 | `["ko","vi","en"]` |
| `XyzaMpAVm3s` | [MV] DAVICHI(다비치) - This Love(이 사랑) l Descendants of the Sun 태양의 후예 OST | ko | 3:49 | `["ko","vi","en"]` |
| `CL13X-8o4h0` | BẮC BLING (BẮC NINH) | OFFICIAL MV | HOÀ MINZY ft NS XUÂN HINH x MASEW x TUẤN CRY | vi | 4:19 | `["vi","en","ja"]` |
| `8sVtL0o-v7U` | HIEUTHUHAI - Người Im Lặng Gặp Người Hay Nói (prod. by Kewtiie) l Official Music Video | vi | 5:23 | `["vi","en","ja"]` |
| `9eL4Scy4-Ys` | Ác Mộng Đẹp - Đạt G | Chapter 3: Đẹp | Album "Ác Mộng Đẹp" | vi | 5:02 | `["vi","en","ja"]` |
| `48dZqMeIQ7U` | 【歌回剪輯】LBI利比 - 跳樓機 | 森森鈴蘭 Cover | | zh | 3:17 | `["zh","vi","en"]` |
| `ALzAAAWTr1A` | 跳樓機 Jumping Machine - Kobo Kanaeru【Vtuber歌回精華】 | zh | 3:21 | `["zh","vi","en"]` |
| `WjhU0mBaol0` | [Vietsub + Kara] Muốn gặp anh (想见你) & Someday or one day - Từ Vi & Triệu Thần Lâm | zh | 3:35 | `["zh","vi","en"]` |

---

## 4. Curated Japanese Education, Podcasts & Vlogs (28 Videos)

Batch-updated with Qwen3-ASR acoustic alignment and dual subtitles for natural listening practice.

| Video ID | Title | Category | Duration | Level | Sub Languages |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `Kc5SzceuWgk` | Doraemon the Movie: Nobita and the Birth of Japan (2016) *(1,946 cues, Ultra + Curated VI/EN)* | anime_drama | 103:55 | JLPT N4 | `["ja","vi","en"]` |
| `9jkZLT9HSL8` | Movie - SPY×FAMILY CODE: White [Việt sub] *(1,823 cues, Ultra + Verified VI/EN)* | anime_drama | 110:00 | JLPT N4 | `["ja","vi","en"]` |
| `V6vVYel8KyE` | Movie - Đại Chiến Người Khổng Lồ: Lần Tấn Công Cuối Cùng [Việt sub] *(2,405 cues, Ultra + Verified VI/EN)* | anime_drama | 144:10 | JLPT N4 | `["ja","vi","en"]` |
| `7JUTF_faWKE` | 【Special Premiere】Frieren: Beyond Journey's End - Episode 01～04 [English Sub] *(1,604 cues, Ultra + Verified VI/EN)* | anime_drama | 102:30 | JLPT N4 | `["ja","vi","en"]` |
| `0Z_BWOEZgVY` | Frieren: Beyond Journey's End - Episode 05 [English Sub] *(400 cues, Ultra + Verified VI/EN)* | anime_drama | 24:30 | JLPT N4 | `["ja","vi","en"]` |
| `3mdePwWGNvU` | Frieren: Beyond Journey's End - Episode 06 [English Sub] *(456 cues, Ultra + Verified VI/EN)* | anime_drama | 24:30 | JLPT N4 | `["ja","vi","en"]` |
| `83kleurzdAQ` | Frieren: Beyond Journey's End - Episode 07 [English Sub] *(407 cues, Ultra + Verified VI/EN)* | anime_drama | 24:31 | JLPT N4 | `["ja","vi","en"]` |
| `Tz47jQTM7Xw` | NAGASAKI 1945 アンゼラスの鐘 [Raw Anime] (Movie - 2005) | anime_drama | 77:05 | JLPT N4 | `["ja","vi","en"]` |
| `vULntXmZRuw` | Phineas and Ferb - Opening Theme (Japanese) | anime_drama | 0:57 | JLPT N4 | `["ja","vi","en"]` |
| `ufNTZZ2zX2E` | ため口で話す / Casual talk in Japanese - Feeling behind in life-【日本語リスニング】 | conversation | 14:25 | JLPT N4 | `["ja","vi","en"]` |
| `r-AqwakzKCA` | 新年に乾杯！今年の目標やチャンネルの方針、いけちゃんの本名など雑談とウーバーイーツ | conversation | 23:35 | JLPT N4 | `["ja","vi","en"]` |
| `-x5KQXpb3zU` | 日本人は雨の日、何して過ごす？☔ 梅雨のお話｜やさしい日本語Podcast | conversation | 9:31 | JLPT N4 | `["ja","vi","en"]` |
| `SmxSCZzV7j0` | 自然な日本語ってなに？ Japanese Listening Practice N3・N2向け Ep.622 | conversation | 24:20 | JLPT N4 | `["ja","vi","en"]` |
| `hZ5OBji7_dw` | 1 Hour Easy Japanese Listening 🇯🇵 | Learn N5 Grammar Naturally | education | 63:48 | JLPT N4 | `["ja","vi","en"]` |
| `45hezvxF6Hs` | Can you understand my Japanese? / N5 & N4 Japanese Listening Practice! #132 | education | 25:00 | JLPT N4 | `["ja","vi","en"]` |
| `u1J_ffYil9Q` | Do You Need N1 Grammar in Everyday Japanese?  | Learn Japanese with Bae | education | 1:51 | JLPT N4 | `["ja","vi","en"]` |
| `J_1p8pCcFPU` | EP017 (N2-N1)| Natural Japanese Speaking Style | 自然な話し方 | education | 15:41 | JLPT N4 | `["ja","vi","en"]` |
| `AQdI1o2D32I` | Fuku (Wipe) and Fuku (Blow) | Complete Beginner Comprehensible Input | education | 5:49 | JLPT N4 | `["ja","vi","en"]` |
| `OlZx_o60qAs` | Japanese Podcast for beginners / Ep1 Self-introduction (Genki 1 level) | education | 5:08 | JLPT N5 | `["ja","vi","en"]` |
| `qtGGWRp3x0A` | 【N4-N3】30Mins Easy Japanese Conversation with @am_japanese / "Hobbies" | education | 35:48 | JLPT N4 | `["ja","vi","en"]` |
| `lXcXkOa5LAU` | 【N5】Easy Japanese Conversation Podcast with @OkkeiJapanese | education | 13:39 | JLPT N4 | `["ja","vi","en"]` |
| `5ZeHtRKHl7Y` | 東京Vlog／Tokyo Vlog 【飲食店やホテルの会話】 | education | 13:20 | JLPT N4 | `["ja","vi","en"]` |
| `ROQByxjyXK4` | 🇯🇵🎮Learn Japanese with Video Games (Fast Food Simulator EP01) Beginner Japanese Comprehensible Input | education | 18:28 | JLPT N5 | `["ja","vi","en"]` |
| `wiQAOCBnn-c` | SURPRISING Her with Fluent Japanese on OmeTV | general | 18:22 | JLPT N4 | `["ja","vi","en"]` |
| `mI2v6iatf6Y` | 【Everyday Japanese Listening】My ideal house🏡 | general | 14:10 | JLPT N4 | `["ja","vi","en"]` |
| `0PZF2dKtgBA` | 【#みんなのギモン】「流行が始まった｣発表も  真夏にインフルエンザなぜ？ | news | 6:11 | JLPT N4 | `["ja","vi","en"]` |
| `mRhTIGH37U4` | 11月前半お疲れ様会🕯️ | vlog | 62:12 | JLPT N4 | `["ja","vi","en"]` |
| `C3oPjuudXas` | Japanese Listening Practice | Supermarket and Christmas in Japan | vlog | 18:02 | JLPT N4 | `["ja","vi","en"]` |
| `kIDaXEnkjmk` | 【日本語散歩Vlog♯7】留学するか悩んでいる人に伝えたいこと | vlog | 17:30 | JLPT N4 | `["ja","vi","en"]` |
| `FTdgoQYoeG0` | ゆる晩酌Vlog / お酒飲みながら恋愛トーク🍺 | vlog | 49:43 | JLPT N4 | `["ja","vi","en"]` |
| `HWdaevrnCnQ` | 乗り放題きっぷで四国一周！お得に旅する3日間【バースデイきっぷ】 | vlog | 71:42 | JLPT N4 | `["ja","vi","en"]` |
| `iny_YVuvdo4` | 個人的に受け取らないこと Japanese Listening Practice N2・N1 level | vlog | 41:40 | JLPT N4 | `["ja","vi","en"]` |
| `FerhHlgUn7U` | 傷つくことについて Japanese Listening Practice N3・N2 level | vlog | 14:49 | JLPT N4 | `["ja","vi","en"]` |
| `uQXSk38j4bo` | 折りたたみ歴6年のマニアが、iPhone DuoとGalaxy Z Fold8を100点満点で比較してみた | vlog | 29:54 | JLPT N4 | `["ja","vi","en"]` |

---

## 5. Other Languages Curated (10 Videos)

| Video ID | Title | Lang | Category | Duration | Sub Languages |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `I_tRSrPru94` | How to introduce yourself: Easy English Conversations 💬 Episode 1 | en | conversation | 2:37 | `["en","vi","ja"]` |
| `WavqmloAmF0` | Learn Vietnamese with TVO | Listening for Beginner: Shopping at the Market | vi | conversation | 3:45 | `["vi","en","ja"]` |
| `dGiQaabX3_o` | What Happened Before History? Human Origins | en | education | 9:39 | `["en","ja"]` |
| `egHz3jy-6dw` | Easy Chinese listening (TOCFL A1-A2) Quick hotel room tour| Natural Travel Taiwanese Mandarin | zh | education | 7:11 | `["en","zh"]` |
| `rbLlUXT72C4` | HSK1 | 我的家 My Home | Comprehensible Input Stories HSK1 Practice Bundle 1/4 | Beginner Chinese | zh | education | 3:30 | `["zh","vi","en"]` |
| `-moW9jvvMr4` | A Simple Way to Break a Bad Habit | Judson Brewer | TED | en | general | 9:24 | `["ja","en","ko","zh"]` |
| `KPFVuGJ4WII` | [고화질] 보기만 해도 행복해지는 조합 ✨아이유X박보검✨이 부르는 산골 소년🌱의 사랑 이야기 |  KBS 250310 방송 | ko | general | 4:37 | `["ja","zh","ko","en"]` |
| `1-Fo8McCD9w` | 《塞尔达传说：时之笛》为什么是神作？ | zh | general | 12:59 | `["en","zh"]` |
| `AahlwmSyqgY` | 小米 18 Fold 评测：折痕非常惊喜，小米史上最佳 | zh | general | 14:42 | `["zh","en"]` |
| `IGEj-oDKyw8` | If You’re a BEGINNER, WATCH THIS! | Comprehensible Korean Input at a Convenience Store | ko | vlog | 9:33 | `["ko","vi","en"]` |

---

## 6. How Future Agents Should Upgrade a Video

To upgrade any video from single-language to pristine dual subtitles:

1. **Acoustic Transcription on Device (Zero Cloud Costs)**:
   ```bash
   /tmp/voca_whisper/bin/python3 scripts/qwen_process_video.py --video-id="<VIDEO_ID>" --lang="ja" --model="Qwen/Qwen3-ASR-1.7B" --out-cues="/tmp/cues_<VIDEO_ID>.json"
   ```

2. **Kuromoji Enrichment & Initial Ingestion**:
   ```bash
   node scripts/enrich_and_upload.js --video-id="<VIDEO_ID>" --cues="/tmp/cues_<VIDEO_ID>.json" --lang="ja" --category="anime_drama"
   ```

3. **LLM Dual Subtitle Localization (Character-voiced VI & EN)**:
   Generate `ja-vi.json` and `ja-en.json` with proper tone and format, then upload:
   ```bash
   node scripts/upload_localized_subtitles.mjs <VIDEO_ID> /tmp/localized_<VIDEO_ID>_ja_vi.json /tmp/localized_<VIDEO_ID>_ja_en.json
   ```

4. **Update Cloudflare D1 Catalog Registry**:
   ```bash
   npx wrangler d1 execute linguatube-vocab --remote -y --command="UPDATE video_languages SET sub_languages = '["ja","vi","en"]', updated_at = strftime('%s','now') WHERE video_id = '<VIDEO_ID>';"
   ```

5. **Sync This Document**:
   Move the video into the appropriate table in `doc/subtitles-catalog.md`.
