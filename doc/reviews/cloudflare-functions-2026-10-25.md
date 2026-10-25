# Cloudflare Functions review — 25 October 2026

> Historical baseline evidence. The authorized backend fixes are now implemented locally; see the [implementation and final validation record](cloudflare-functions-implementation-2026-10-25.md). Statements below about open findings or unchanged source describe the earlier review, not the current workspace.


Reviewed revision: `79b9d0e`. Scope: all 61 JavaScript source files in `functions-src/` (11,722 lines), including all 25 API route files and their internal modules. This is a source review with local mocked reproductions; findings remain open. No application source, generated functions, configuration, schema, release metadata or deployed resources were changed.

Rechecked on 25 October 2026 against the same revision. All nine mocked scenarios still reproduce. See the [updated implementation and optimization plan](cloudflare-functions-plan-2026-10-25.md) for scope, order, acceptance criteria and the additional integration-test result.

Subsequent [runtime validation](cloudflare-functions-validation-2026-10-25.md) reproduced all nine scenarios in local workerd with D1/R2 bindings, on Node 22. This supersedes the earlier mock-only evidence level while retaining the live-provider/production limitations. The reviewed revision's default suite passed all 137 tests on Node 22.

## Findings

### 1. [P1] Client metadata can bypass AI duration limits and credit pricing

Locations: [`video-info.js:253`](../../functions-src/api/video-info.js#L253), [`video-validator.js:273`](../../functions-src/middlewares/video-validator.js#L273), [`transcript.service.js:215`](../../functions-src/services/transcript.service.js#L215).

Anonymous `POST /api/video-info` can populate `duration_seconds` for a new video. `startAIJob` treats this value as authoritative and skips its own YouTube duration lookup. The earlier route validator does scrape YouTube, but combines its result with the unvalidated request `duration` through `Math.max`. A nonnumeric string makes that result `NaN`, causing the limit comparison to be skipped. A YouTube lookup outage also leaves the client/D1 values trusted.

Reproduction: seed D1 through the real backfill handler with 30 seconds, mock YouTube reporting 1,800 seconds, then submit `preferAI: true`, `duration: "not-a-number"` and a valid mocked Turnstile result. The real transcript handler returns HTTP 202, submits one Gladia job and charges one anonymous diamond despite a 600-second tier cap. No live provider was called.

Suggested fix: distinguish client hints from verified duration; carry one validated server duration into the spending path, reject malformed duration fields, and fail closed when authoritative verification is unavailable. Use the same verified value for the cap and credit price.

### 2. [P1] Force refresh can cancel another learner's paid transcription

Location: [`transcript.service.js:273`](../../functions-src/services/transcript.service.js#L273).

Active jobs are looked up globally by video/language. The force-refresh branch marks the matching job `SUPERSEDED` and starts refund recovery without checking its owner, before reserving and charging the replacement. A different anonymous requester can therefore terminate another learner's active job even when the requester's own charge fails. The already-submitted upstream transcription also continues consuming provider resources.

Reproduction: an active job belonging to `victim-user` becomes `failed / SUPERSEDED` when an unrelated anonymous caller invokes force refresh; the replacement subsequently fails with `INSUFFICIENT_DIAMONDS`. Endpoint callers still need a valid CAPTCHA, but this supplies no job ownership authorization.

Suggested fix: join existing active work for ordinary callers. Restrict cancellation to an explicit authorized operation, and do not cancel another owner's work to prepare a replacement that has not been funded.

### 3. [P1] Metadata discovery can permanently suppress native-caption fetching

Location: [`transcript.js:375`](../../functions-src/api/transcript.js#L375).

An empty `availableLanguages` list plus a title or duration is treated as confirmed absence of native captions. Both the metadata GET route and the anonymous duration-backfill POST route create exactly such rows before any caption discovery. With no transcript in R2, an ordinary native request then returns `NO_NATIVE / KNOWN_NO_LANGS` without consulting Supadata. Learners can be directed toward paid AI generation even though native captions have never been checked. Unlike the separate negative cache, this branch has no expiry check.

Reproduction: a metadata-only D1 row with `available_languages: '[]'`, title and duration produces HTTP 200 with `NO_NATIVE`; the mocked native provider receives zero requests.

Suggested fix: reserve an explicit negative-discovery state for an authoritative provider result. An unknown language list must continue to caption discovery. Keep negative results bounded by a freshness policy.

### 4. [P1] Ambiguous Gladia submission failures can create duplicate paid jobs

Location: [`gladia.js:43`](../../functions-src/providers/gladia.js#L43).

The provider retries the creation POST after network errors, malformed responses and server errors, without an upstream idempotency identity. If Gladia accepts the first job but the response is lost, the retry can create a second transcription. The service only tracks the returned provider ID; callbacks from the other job can subsequently fail identity matching. The local D1 reservation prevents concurrent local reservations but cannot make two upstream POSTs idempotent.

Reproduction: a mock provider records acceptance of the first POST and drops its response; the implementation submits the identical creation payload again and returns the second provider job ID. This confirms duplicate submissions under an ambiguous result, not actual production double billing.

Recheck clarification: [Gladia's retry guidance](https://support.gladia.io/article/understanding-the-transcription-process-breakdown) explicitly says duplicate successful submissions are billed separately and currently have no provider deduplication. A matching `custom_metadata` object is not an idempotency mechanism.

Suggested fix: persist a submission identity and outcome, retain uncertain submissions for reconciliation, and recover an authenticated provider acceptance/completion event before authorizing another submission. Do not assume an invented idempotency header or metadata field prevents duplicate billing. Production duplicate charges were not inspected.

### 5. [P2] Transcript responses advertise a fabricated anonymous diamond balance

Location: [`transcript.js:174`](../../functions-src/api/transcript.js#L174).

The initial `getDiamonds(clientId, user)` call omits `env` and context. Anonymous balance lookup consequently takes the no-database fallback of three diamonds, even though D1 is bound. Cached transcript responses, polling and early errors can all advertise the wrong balance and enable `whisperAvailable` for an exhausted learner. The later charge path still consults D1, so this is incorrect availability/status rather than a demonstrated free-spending bypass.

Reproduction: with zero persisted anonymous diamonds, a cached transcript response reports three diamonds and `whisperAvailable: true`, while the real `/api/diamonds` handler reports zero for the same client.

Suggested fix: pass `env` and the real request context to the initial balance read and use persisted charge/regeneration results when constructing subsequent responses.

### 6. [P2] Dual-subtitle stampede registration happens after asynchronous cache misses

Locations: [`dual-subtitles.js:139`](../../functions-src/api/dual-subtitles.js#L139), [`dual-subtitles.js:244`](../../functions-src/api/dual-subtitles.js#L244).

Requests check the in-flight map before awaiting R2, authentication and rate-limit initialization. The promise is registered only after those awaits, without another ownership check. Two simultaneous misses both pass the original check and create separate upstream translations; the second also replaces the first map entry. This violates the repository's warm-isolate deduplication invariant.

Reproduction: synchronize two identical R2 misses in one module instance. Both handlers return HTTP 200 and the mocked translation provider receives two calls.

Suggested fix: install an owned in-flight promise before asynchronous miss work, or atomically recheck/register after cache lookup. Release only the promise owned by the current operation and handle its rejection even when there are no followers.

### 7. [P2] A shorter translation checkpoint deletes previously cached cues

Location: [`translation-cache.js:174`](../../functions-src/utils/translation-cache.js#L174).

The merge reads existing translations but constructs `finalSegments` only from the incoming array. Cues absent from that array disappear from the replacement R2 object. ETag protection prevents a conflicting write but does not preserve data omitted by this merge. A smaller checkpoint, an older transcript version, or a live request for a small cue set can shrink a complete cache shared by all learners; quality is then measured against the shortened array.

Reproduction: an existing three-cue object followed by a save containing only its middle cue produces a one-cue R2 object.

Recheck clarification: the current web caller in `SubtitleService.checkAndPersistDualSubtitles` sends all cues, including untranslated ones. This is a server-side protection gap for shorter, stale or alternate-client payloads; the reproduction does not establish truncation on every normal web checkpoint.

Suggested fix: validate checkpoints against a canonical transcript/version and preserve the complete canonical cue set while merging translations. Reject unrelated or truncated source arrays instead of treating them as replacement authority.

### 8. [P2] Recommendation probe exhaustion can be returned as an empty catalog

Location: [`video-info-db.js:771`](../../functions-src/data/video-info-db.js#L771).

After ten R2 probes, further legacy candidates are silently skipped. If the SQL page has fewer than 200 rows, `exhausted` is true and the final scan-budget guard does not throw. The result can be HTTP 200 with no videos and `hasMore: false`, despite unverified rows containing valid transcripts. This conflicts with the explicit invariant that incomplete discovery due to a budget breach returns 503.

Reproduction: eleven legacy rows advertise English but lack `sub_languages`. The first ten R2 keys are absent and the eleventh exists. Only ten probes run; the helper returns zero videos and `hasMore: false` without signaling incomplete discovery.

Suggested fix: track probe-budget incompleteness separately from SQL exhaustion. If candidates needed for a complete result remain unverified, report the existing retryable retrieval failure rather than an authoritative empty catalog.

### 9. [P2] Japanese transcript enrichment bypasses the tokenizer's timeout fallback

Locations: [`tokenizer.js:63`](../../functions-src/utils/tokenizer.js#L63), [`tokenizer.js:582`](../../functions-src/utils/tokenizer.js#L582).

`tokenizeJapanese` has a two-second initialization race, but `enrichSegmentsWithTokens` first awaits the same builder without a deadline. Dictionary fetches and body reads also have no explicit timeout. A stalled CDN request can therefore prevent enrichment from ever reaching the bounded fallback. This affects synchronous R2 transcript self-healing and Gladia ingestion; the ingestion deadline is checked only after enrichment resolves.

Reproduction: mock dictionary downloads as never-settling requests. Enrichment remains pending after 2.2 seconds, with twelve downloads started and no fallback output.

Suggested fix: bound dictionary headers/body reads and the pre-initialization await, then use `Intl.Segmenter` within the caller's remaining budget. Ensure a failed initialization can be retried without leaving shared work permanently pending.

## Verification and limits

- `npm run test:backend`: **137 passed, zero failures**.
- `npm run lint`: **passed**, including locale consistency checks and backend ESLint.
- [Mocked reproduction script](cloudflare-functions-2026-10-25.repro.mjs): **nine confirmed scenarios**, with all outbound fetches intercepted. Run from the repository root with `node doc/reviews/cloudflare-functions-2026-10-25.repro.mjs`.
- Recheck: `node --test tests/d1-recovery.integration.mjs tests/gladia-recovery.integration.mjs` produced **12 passed, one failed**. The failing D1 replay test assumes `jobs[0]` wins a concurrent depletion race. Eight additional isolated SQLite runs each admitted exactly three charges; replaying an actual successful charge succeeded without another deduction. One run selected jobs 1–3 rather than job 0. Record this as an unstable test assumption to correct, not evidence of overspending. These integration files are outside the default `tests/*.test.mjs` glob.
- Tests and reproductions ran on the installed Node **25.2.1**. The repository declares Node `>=20.11 <23`; these runs do not establish behavior on every supported Node version or in the deployed Workers runtime.
- Read `wrangler.toml` and the route-only esbuild entry-point pipeline; retrieved current Cloudflare best practices and `@cloudflare/workers-types` **5.20261025.1**. No local Wrangler schema was installed, so this was not a Wrangler schema-validation run.
- Did not execute builds because application source was unchanged, as required by repository build-hygiene instructions.
- Did not inspect production secrets, query production databases, deploy, charge live providers, or validate whether deployed PostgreSQL/D1 migrations match the checked-in files. Database transaction/RLS implementation is a separate audit boundary; local migration definitions were consulted only for relevant call/trigger contracts.

Existing green tests do not cover the cross-endpoint and interleaving scenarios above. The reproductions assert current defective behavior so each case should become a regression test with its expectation reversed when fixed.

Review references: [Cloudflare Workers best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/), [Supabase JWT verification](https://supabase.com/docs/guides/auth/jwts). Findings are based on the checked-in code and isolated local executions, not a claim about observed production incidents.

## Complete source coverage

Every file below was read. A checked item records review coverage; it does not certify that the module has no defects.

### api (25 files)

- [x] [functions-src/api/_middleware.js](../../functions-src/api/_middleware.js)
- [x] [functions-src/api/diamonds.js](../../functions-src/api/diamonds.js)
- [x] [functions-src/api/dict.js](../../functions-src/api/dict.js)
- [x] [functions-src/api/dual-subtitles.js](../../functions-src/api/dual-subtitles.js)
- [x] [functions-src/api/geo.js](../../functions-src/api/geo.js)
- [x] [functions-src/api/gladia-webhook.js](../../functions-src/api/gladia-webhook.js)
- [x] [functions-src/api/heal-levels.js](../../functions-src/api/heal-levels.js)
- [x] [functions-src/api/internal/reconcile.js](../../functions-src/api/internal/reconcile.js)
- [x] [functions-src/api/kanji.js](../../functions-src/api/kanji.js)
- [x] [functions-src/api/leaderboard.js](../../functions-src/api/leaderboard.js)
- [x] [functions-src/api/payment/check-status.js](../../functions-src/api/payment/check-status.js)
- [x] [functions-src/api/payment/create-order.js](../../functions-src/api/payment/create-order.js)
- [x] [functions-src/api/payment/revenuecat-webhook.js](../../functions-src/api/payment/revenuecat-webhook.js)
- [x] [functions-src/api/payment/webhook.js](../../functions-src/api/payment/webhook.js)
- [x] [functions-src/api/recommended-videos.js](../../functions-src/api/recommended-videos.js)
- [x] [functions-src/api/tokenize/[lang].js](../../functions-src/api/tokenize/[lang].js)
- [x] [functions-src/api/tokenize-batch/[lang].js](../../functions-src/api/tokenize-batch/[lang].js)
- [x] [functions-src/api/transcript.js](../../functions-src/api/transcript.js)
- [x] [functions-src/api/translate/[[path]].js](../../functions-src/api/translate/[[path]].js)
- [x] [functions-src/api/translate/batch.js](../../functions-src/api/translate/batch.js)
- [x] [functions-src/api/tts.js](../../functions-src/api/tts.js)
- [x] [functions-src/api/version.js](../../functions-src/api/version.js)
- [x] [functions-src/api/video-category.js](../../functions-src/api/video-category.js)
- [x] [functions-src/api/video-info.js](../../functions-src/api/video-info.js)
- [x] [functions-src/api/video-level.js](../../functions-src/api/video-level.js)

### middlewares (4 files)

- [x] [functions-src/middlewares/auth.js](../../functions-src/middlewares/auth.js)
- [x] [functions-src/middlewares/bot-defense.js](../../functions-src/middlewares/bot-defense.js)
- [x] [functions-src/middlewares/rate-limiter.js](../../functions-src/middlewares/rate-limiter.js)
- [x] [functions-src/middlewares/video-validator.js](../../functions-src/middlewares/video-validator.js)

### providers (5 files)

- [x] [functions-src/providers/dictionary-apis.js](../../functions-src/providers/dictionary-apis.js)
- [x] [functions-src/providers/gladia.js](../../functions-src/providers/gladia.js)
- [x] [functions-src/providers/lingva.js](../../functions-src/providers/lingva.js)
- [x] [functions-src/providers/payos.js](../../functions-src/providers/payos.js)
- [x] [functions-src/providers/supadata.js](../../functions-src/providers/supadata.js)

### services (10 files)

- [x] [functions-src/services/category.service.js](../../functions-src/services/category.service.js)
- [x] [functions-src/services/diamond.service.js](../../functions-src/services/diamond.service.js)
- [x] [functions-src/services/dict.service.js](../../functions-src/services/dict.service.js)
- [x] [functions-src/services/gladia-recovery.js](../../functions-src/services/gladia-recovery.js)
- [x] [functions-src/services/recommendation.service.js](../../functions-src/services/recommendation.service.js)
- [x] [functions-src/services/refund-recovery.js](../../functions-src/services/refund-recovery.js)
- [x] [functions-src/services/revenuecat-recovery.js](../../functions-src/services/revenuecat-recovery.js)
- [x] [functions-src/services/supabase-rest.js](../../functions-src/services/supabase-rest.js)
- [x] [functions-src/services/transcript.service.js](../../functions-src/services/transcript.service.js)
- [x] [functions-src/services/turnstile.service.js](../../functions-src/services/turnstile.service.js)

### data (4 files)

- [x] [functions-src/data/anonymous-credits.js](../../functions-src/data/anonymous-credits.js)
- [x] [functions-src/data/transcript-db.js](../../functions-src/data/transcript-db.js)
- [x] [functions-src/data/transcript-r2.js](../../functions-src/data/transcript-r2.js)
- [x] [functions-src/data/video-info-db.js](../../functions-src/data/video-info-db.js)

### utils (13 files)

- [x] [functions-src/utils/api-key-rotator.js](../../functions-src/utils/api-key-rotator.js)
- [x] [functions-src/utils/cache-manager.js](../../functions-src/utils/cache-manager.js)
- [x] [functions-src/utils/dict-parsers.js](../../functions-src/utils/dict-parsers.js)
- [x] [functions-src/utils/edge-tts.js](../../functions-src/utils/edge-tts.js)
- [x] [functions-src/utils/japanese-romaji.js](../../functions-src/utils/japanese-romaji.js)
- [x] [functions-src/utils/level-estimator.js](../../functions-src/utils/level-estimator.js)
- [x] [functions-src/utils/response-body.js](../../functions-src/utils/response-body.js)
- [x] [functions-src/utils/secret-auth.js](../../functions-src/utils/secret-auth.js)
- [x] [functions-src/utils/svix-verifier.js](../../functions-src/utils/svix-verifier.js)
- [x] [functions-src/utils/tokenizer.js](../../functions-src/utils/tokenizer.js)
- [x] [functions-src/utils/transcript-utils.js](../../functions-src/utils/transcript-utils.js)
- [x] [functions-src/utils/translation-cache.js](../../functions-src/utils/translation-cache.js)
- [x] [functions-src/utils/utils.js](../../functions-src/utils/utils.js)
