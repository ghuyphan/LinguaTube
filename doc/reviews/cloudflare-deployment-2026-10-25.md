# Cloudflare production deployment preparation — 25 October 2026

The user authorized committing, pushing and deploying the backend improvements. This is the pre-push verification record; deployment completion is verified against the resulting Cloudflare Pages check, followed by production smoke tests.

## Exact commit scope

Gemini's uncommitted dictionary providers, parsers, tokenizer, dictionary frontend/POS changes and added dictionary tests are excluded. Transcript-only hunks in the shared security test are included. They remain untouched in the original workspace. An isolated checkout of the staged index was tested independently, so this commit does not depend on those concurrent changes.

The candidate passed **191 backend tests**, **359 native-fetch Workers edge scenarios**, the **nine optimization regressions**, **16 D1/Gladia integration tests**, and lint/locale checks. The earlier workspace's 193-test result included two additional Gemini dictionary tests. [Candidate source fingerprints and schema verification](cloudflare-deployment-validation-2026-10-25.json) record the source being shipped. The existing review reports describe their earlier workspace snapshots; their fingerprints and counts are historical.

## Production prerequisite applied

Cloudflare project `lingua-tube` deploys production from `main` using `npm run build`. Its production `VOCAB_DB` binding matches database `linguatube-vocab` in `wrangler.toml`. The pre-existing credit-recovery columns, anonymous-credit balances and Gladia callback inbox were present.

Applied `db/migrations/d1/20261025_gladia_submission_state.sql` remotely before pushing. Verified all three columns (`submission_state`, `submission_started_at`, `next_provider_check_at`) and `idx_ai_jobs_provider_due`. Existing rows default to legacy behavior. No balances or job contents were manually altered. No Supabase migration, release/version bump or dependency update is part of this deployment.

## Verification after push

Confirm that Cloudflare Pages reports success for the pushed commit on the production environment, that GitHub CI passes for the same revision, and that `https://voca.study` serves the deployment. Check malformed transcript requests, JSON-object validation, version ETag behavior, metadata/category reads and safe cached/no-cost API paths. Do not generate a paid AI transcript simply to smoke-test deployment.

Authoritative deployment status: [repository checks](https://github.com/ghuyphan/LinguaTube/commits/main/) and [Cloudflare Pages project](https://dash.cloudflare.com/947c1bafe1c62cde209700741848b90d/pages/view/lingua-tube). Keep uncertain Gladia submissions and financial ledgers intact; an empty provider listing never authorizes resubmission/refund. Operational secret/scheduler configuration remains managed separately from this source commit.
