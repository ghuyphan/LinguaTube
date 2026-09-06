# Developer & Operations Guide

This guide details how to set up, develop, test, debug, and deploy **Voca** (formerly LinguaTube).

---

## 1. Prerequisites & Environment Setup

### 1.1. System Requirements
- **Node.js**: `v20.11` to `<23.0` (Recommended: Node 20 or 22 LTS). Check `.nvmrc` (`20`).
- **npm**: `v10+`
- **Operating System**: macOS, Linux, or Windows (WSL recommended on Windows).

```bash
# Verify Node.js version
node -v  # e.g., v20.18.0
```

### 1.2. Repository Setup
```bash
# Clone the repository
git clone https://github.com/ghuyphan/LinguaTube.git
cd lingua-tube

# Install dependencies
npm install
```

---

## 2. Environment Variables & Configuration

### 2.1. Local Cloudflare Pages Variables (`.dev.vars`)
Copy the template to create your local `.dev.vars` file:
```bash
cp .dev.vars.example .dev.vars
```

Configure the following variables in `.dev.vars`:
```ini
# Gladia API Key (https://gladia.io) - Required for AI transcription
GLADIA_API_KEY="your_gladia_api_key"

# Cloudflare Turnstile Secret Key (https://developers.cloudflare.com/turnstile)
# For local testing, Cloudflare provides an always-passing secret key:
TURNSTILE_SECRET_KEY="1x00000000000000000000000000000000BB"

# Supadata API Keys (https://supadata.ai) - Multiple keys supported for rotation
SUPADATA_API_KEY="your_primary_key"
SUPADATA_API_KEY_2="your_secondary_key"
SUPADATA_API_KEY_3="your_tertiary_key"

# PocketBase backend instance URL
POCKETHOST_URL="https://voca.pockethost.io"

# Google OAuth Client ID (for web authentication)
GOOGLE_CLIENT_ID="your_google_client_id.apps.googleusercontent.com"

# Optional: YouTube cookies for inner-tube client authentication
YOUTUBE_COOKIE=""
```

### 2.2. Frontend Environment Configuration
Located in `src/environments/environment.ts`:
- `turnstileSiteKey`: Turnstile public site key.
- `pocketbaseUrl`: `https://voca.pockethost.io`
- `api`: Centralized dictionary, translation, and transcript endpoint mappings.

---

## 3. Running the Application Locally

### 3.1. Standard Local Development (Frontend + Express Server)
The standard workflow uses the dual-server script:
```bash
npm run dev
```
This concurrently executes:
1. **Express Local Server** on `http://localhost:3001` (`server/server.js`):
   - Integrates `youtubei.js` (Innertube) to fetch real YouTube timed-text tracks directly in local dev!
   - Saves transcripts locally in `server/transcripts_cache/` for instant subsequent replays.
   - Provides mock/live Gladia AI generation, local dual subtitles, local batch translation, and batch tokenization.
2. **Angular Development Server** on `http://localhost:4200` with proxy routing via `proxy.conf.json`.

Open your browser at:
👉 **`http://localhost:4200`**

### 3.2. Cloudflare Pages Local Preview (`wrangler`)
To test actual Cloudflare Pages Functions against D1 and KV locally:
```bash
# First build functions
npm run build:functions

# Run Cloudflare Pages emulation with Wrangler
npx wrangler pages dev dist/lingua-tube/browser --compatibility-date=2024-12-20
```

---

## 4. Build Pipelines & Scripts Reference

| Script | Command | Action |
| :--- | :--- | :--- |
| `start` | `npm run start` | Runs Angular CLI with `proxy.conf.json` proxy |
| `server` | `npm run server` | Starts local Express server (`server/server.js`) |
| `dev` | `npm run dev` | Runs both `server` and `start` concurrently |
| `build:functions` | `npm run build:functions` | Bundles `functions-src/` into `functions/` using esbuild |
| `build` | `npm run build` | Runs `build:functions` and `ng build` for production |
| `lint` | `npm run lint` | Lints TypeScript and HTML templates with ESLint 9 |
| `lint:fix` | `npm run lint:fix` | Automatically fixes autofixable ESLint errors |
| `test:backend` | `npm run test:backend` | Runs backend security & validation tests via `node --test` |
| `test:ci` | `npm run test:ci` | Runs both backend tests and Angular Karma CI tests |
| `test` | `npm run test` | Runs Angular unit test suite in Karma |

### 4.1. Data Pipelines (`scripts/`)
- `node scripts/merge-translations.js [ja|ko|zh|en|all]`:
  Merges JSON grammar translation chunks from `scripts/grammar-chunks/output/` into TypeScript files in `src/app/data/translations/`.
- `node scripts/generate-translations.js`:
  Executes batch translations for grammar definitions across target languages.

---

## 5. Testing & Code Quality Assurance

### 5.1. Backend Security Tests
```bash
npm run test:backend
```
Verifies:
- Script and title language detection algorithms.
- Supported language whitelist (`ja`, `ko`, `zh`, `en`).
- SSRF defense preventing malicious host redirections for Gladia polling.

### 5.2. Linting
```bash
npm run lint
```
Enforces strict typing, component selector prefixes, and template accessibility rules.

---

## 6. Cloudflare Deployment Architecture

### 6.1. Build Configuration in Cloudflare Pages
- **Framework Preset**: None (Custom)
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist/lingua-tube/browser`
- **Node.js Version**: Set environment variable `NODE_VERSION=20`

### 6.2. Resource Bindings in Cloudflare Dashboard
Under **Settings $\rightarrow$ Functions**:
1. **D1 Database**:
   - Variable name: `VOCAB_DB`
   - Database: `linguatube-vocab` (`35b6faad-cba0-4ad0-8033-f55799d061aa`)
2. **R2 Bucket**:
   - Variable name: `TRANSCRIPT_STORAGE`
   - Bucket: `linguatube-transcripts`
3. **KV Namespace**:
   - Variable name: `TRANSCRIPT_CACHE`
   - Namespace ID: `e4ccbf86e2654f31be92af593b912eb8`

### 6.3. Secret Variables in Cloudflare Dashboard
Under **Settings $\rightarrow$ Environment Variables**:
- `GLADIA_API_KEY`: Production API key from Gladia.
- `TURNSTILE_SECRET_KEY`: Production secret key from Cloudflare Turnstile.
- `SUPADATA_API_KEY`, `SUPADATA_API_KEY_2`, `SUPADATA_API_KEY_3`: Production keys for Supadata.
- `GOOGLE_CLIENT_ID`: Google OAuth Web Client ID.
- `POCKETHOST_URL`: `https://voca.pockethost.io`

---

## 7. Common Troubleshooting & FAQs

### Q: I edited a backend function, but my changes aren't taking effect in production!
**Cause**: You may have edited `functions/` directly, or forgot to run the build script.  
**Fix**: Edit in `functions-src/` and run `npm run build:functions`.

### Q: AI transcription fails with `CAPTCHA_FAILED` locally.
**Cause**: The Turnstile widget was not rendered or an invalid secret key is configured.  
**Fix**: Ensure `TURNSTILE_SECRET_KEY="1x00000000000000000000000000000000BB"` in `.dev.vars`.

### Q: Japanese Furigana shows no readings for Kanji tokens.
**Cause**: The Kuromoji IPAdic dictionary failed to load from CDN.  
**Fix**: Ensure you have an active internet connection so `cdnLoader` can fetch `@patdx/kuromoji` buffers from `cdn.jsdelivr.net`.
