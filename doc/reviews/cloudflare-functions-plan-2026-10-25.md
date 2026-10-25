# Cloudflare Functions implementation and optimization plan

Updated: 25 October 2026. Baseline: `79b9d0e`.

Status: authorized backend implementation completed locally, excluding Gemini’s dictionary/tokenizer internals. The [implementation record](cloudflare-functions-implementation-2026-10-25.md) gives final behavior, validation and the required D1 deployment prerequisite. The plan below is retained as the original acceptance baseline; no deployment has been performed.

Validation update: [all nine scenarios also reproduce in local workerd](cloudflare-functions-validation-2026-10-25.md), using D1/R2 bindings for both reviewed HEAD and a captured workspace snapshot. The reviewed default suite passes 137/137 under Node 22; the additional recovery integration run passes 13/13. Gemini is independently editing dictionary/tokenizer modules; preserve that work and validate against a fresh snapshot before implementing overlapping tokenizer changes. The production/provider limitations below still apply.

## Scope and compatibility

This is backend work. Keep the existing Angular and Flutter request/response contracts, routes, token fields, language-mismatch handling and playback behavior. No frontend redesign, app-store release, Supabase schema change or subscription/credit policy change is currently planned.

The core correctness changes can use the existing data structures. Durable Gladia submission/retry tracking is expected to need a small **D1 migration**, so the complete plan is not exclusively JavaScript changes. Token quality/version metadata can be additive in existing R2 JSON objects. Exact storage changes must be finalized alongside the implementation and documented before deployment.

Retain transactional credit operations, the existing job/refund ledgers, Turnstile verification, the active-job unique constraint, ingestion leases, conditional R2 writes and the KV write budget. Ordinary force refresh should join existing active work; introducing a user-visible cancellation feature is outside this plan.

## Recheck results and corrections

| Check | Result | Meaning |
| --- | --- | --- |
| All nine mocked review scenarios | Reproduced again | Findings remain open |
| Default backend suite | 137 passed, zero failed | Existing default baseline remains green |
| Lint and locale checks | Passed | No new lint or translation failures |
| Additional D1/Gladia integration suite | 12 passed, one failed | Replay test assumes the first input job wins a race |
| Eight isolated SQLite depletion/replay runs | Three successful charges per run; replay of a confirmed winner always succeeded; balance remained zero | The observed integration failure is a test selection assumption, not demonstrated overcharging |
| Current web translation save caller | Sends the complete cue list | Finding 7 concerns the server accepting shorter/stale/alternate-client payloads |
| Production resources and provider billing | Not inspected | No claim about actual incidents or production speed |

Runs used the installed Node 25.2.1. Final implementation must also be validated on a supported Node version and the Workers runtime; the repository declares Node `>=20.11 <23`.

## 1. Fix correctness and prevent unnecessary provider work

Address findings **1, 2, 3, 5, 6, 7 and 8** first.

- **Duration and price:** validate request types, resolve one trusted server duration only when a new AI submission is needed, and pass that value through validation, the tier cap and credit pricing. Treat current D1 duration rows as hints because existing writers accept client input and inferred subtitle endpoints. Fail closed when a new paid operation cannot be verified. Use one cost function with explicit boundary tests.
- **Request ordering:** perform cheap input, identity and quota checks first; serve valid cached results or join active work before scraping YouTube for a new AI job. Do not add stale balance/tier caching to obtain this speedup. Rate limits still apply to the appropriate operation.
- **Existing jobs:** ordinary refresh joins the globally active video/language job. An unrelated request must never fail/refund that job, including when the new request has no credits.
- **Native captions:** an unknown language list must reach the native provider. Use a confirmed, fresh negative result to suppress discovery; honor negative-cache age in the lookup instead of depending on an unused cleanup helper. Metadata enrichment must not erase discovered native languages.
- **Diamond status:** pass the real environment/context to balance reads and construct status from the confirmed balance after charging. Financial mutation authority stays in existing atomic operations.
- **Translation concurrency:** acquire an owned in-flight promise before asynchronous miss work and release only that owner. Validate exact input identity so unrelated cue sets cannot share results. Preserve positional results, provider order, deadlines and shared quotas.
- **Translation persistence:** validate incoming cues against the canonical transcript where available; merge compatible translations while preserving the full cue set. When canonical data is unavailable, reject incompatible replacements or serve them without publishing globally. Keep ETag retries and the existing local write mutex.
- **Recommendations:** track incomplete R2 verification separately from SQL exhaustion. Preserve the fixed candidate window and existing scan/probe limits; return a retryable failure when required discovery is incomplete.

Acceptance: convert the corresponding review scenarios into regression tests that assert the corrected behavior. A cache hit should not scrape YouTube for spending validation; concurrent identical translation misses should perform one upstream operation within a warm isolate. Cross-isolate deduplication must not be claimed from an in-memory promise map.

## 2. Make Gladia submission and recovery safe and cheaper

Address finding **4**, then optimize the existing recovery flow.

- Persist the submission attempt before calling the provider. Separate definite rejection, confirmed acceptance and an uncertain response. Keep externally visible job states compatible with current clients.
- Reconcile uncertain submissions through authenticated provider events or documented lookup capabilities; verify correlation and account ownership before associating a provider ID. If neither proves the outcome, preserve uncertainty rather than declaring success or immediately submitting again.
- Retry only after classifying the failure and considering any recorded acceptance. Respect provider backoff. A stable local operation ID supports correlation but cannot make upstream creation exactly once.
- Finalize a D1 migration for submission outcome/timing and provider-check scheduling. Apply it before deploying code that requires it; retain legacy-row behavior and the existing financial/refund ledgers. Avoid automatically expiring an unresolved accepted/uncertain submission into replacement work without an explicit reconciliation policy.
- Prefer authenticated completion notifications and retain bounded polling as recovery. Persist a next-check time/backoff so sequential browser polls do not each cause a new Gladia GET after the ingestion lease is released. Polling remains available when notifications are delayed or unavailable.
- Review use of `callback_url`, which is still documented but deprecated. Move to `callback` and `callback_config` with compatibility fixtures. Deprecation alone is not proof current callbacks are broken. See [Gladia's request contract](https://docs.gladia.io/api-reference/v2/pre-recorded/init).
- Separate durable transcript availability from optional morphological enrichment: publish cleaned provider results using the existing job/lease and conditional-write guards, then enrich within a bounded recoverable path. Late enrichment must preserve job metadata and must never overwrite a newer transcript.

Gladia documents separate billing for repeated successful submissions and no automatic deduplication. Metadata is for correlation, not prevention of duplicate jobs. See [Gladia's retry guidance](https://support.gladia.io/article/understanding-the-transcription-process-breakdown).

Optional experiment, after correctness: probable-language hints may reduce language-discovery work. Use trustworthy spoken-language evidence; do not force the selected learning language, since Voca deliberately supports detecting a different spoken language and mixed-language videos. Compare accuracy as well as latency before enabling. See [Gladia's language guidance](https://support.gladia.io/article/optimizing-transcription-performance-by-specifying-probable-lang-w7bcwpdc0q5yyllhyfdc70zf).

Acceptance: simulate response loss after acceptance, duplicate/late notifications, missing callbacks, a tab closing, provider 429s, expired leases and storage outages. Every case must preserve financial reconciliation and avoid automatic duplicate submission under uncertainty. Existing accepted work is resumed rather than replaced to make it appear faster.

## 3. Optimize tokenization while preserving learning quality

Address finding **9** and measure the following changes.

- **Bound Japanese startup:** apply time/size limits to dictionary headers and bodies, and a deadline to the shared initialization path. Reuse one builder per warm isolate, reset failed initialization, and allow fallback without leaving a permanently pending promise. Deduplicate startup/fallback decisions across the batch.
- **Remove per-cue overhead:** reuse `Intl.Segmenter` instances by language and reuse loaded NLP modules. Clear timeout handles on successful initialization instead of leaving a two-second timer per Japanese cue.
- **Deduplicate exact text:** tokenize repeated cue text once per operation and restore outputs in the original order. Add a bounded cache by language, exact text, engine/version and quality. Retain exact-input hashing; do not regress to delimiter concatenation or a 32-bit key.
- **Bound resource use:** cap aggregate text work and cached bytes, not just entry counts. Process batches with a bounded working set; `Promise.all` does not parallelize CPU-heavy JavaScript. Choose limits using representative real subtitle sizes and supported client batches rather than lowering them arbitrarily.
- **Reuse stored tokens:** avoid re-tokenizing complete current-version R2 transcripts. Mark fallback/version internally so a temporary lightweight Japanese result does not permanently suppress richer furigana/lemma enrichment. Existing tokens remain readable by current clients.
- **Shorten the response path:** return valid cached cues promptly and perform optional enrichment through the guarded bounded recovery path. `waitUntil` alone is not durable retry storage; a retryable enrichment marker or subsequent-read repair must survive interruption.

Keep Kuromoji for rich Japanese analysis, contextual Chinese pinyin, Korean particle handling and English lemmatization. An engine replacement or a blanket switch to lightweight segmentation would change learner-visible quality and is not part of the initial optimization.

Cloudflare documents a 128 MB isolate memory limit and a bounded post-response lifetime. Measure the whole isolate footprint, including loaded dictionaries and caches; moving work to `waitUntil` does not remove CPU/memory limits. See [Workers limits](https://developers.cloudflare.com/workers/platform/limits/).

Acceptance: cold/warm Japanese, stalled/failed dictionary fetches, simultaneous requests, repeated texts, multilingual/emoji inputs and an 800-cue batch. Maintain token/ruby/lemma correctness and positional output; ensure fallback work completes within its configured budget and can later recover richer tokens.

## 4. Verify improvements, update documentation and prepare delivery

Measure before and after with the same fixtures. Record cold/warm p50/p95 wall time, Workers CPU and peak memory, cache hit rate, dictionary loads, provider submissions/status GETs, duplicate work, and KV/D1/R2 operations. Mocked Node timings are not production performance measurements; no percentage speedup is promised before runtime measurements.

Fix the integration replay test by selecting an operation whose initial charge actually succeeded, then assert replay does not deduct again. Keep the separate assertion that a new uncharged job fails at zero balance. Include the D1/Gladia integration suites explicitly; the default backend glob currently omits them.

Required final checks: supported Node runtime, backend regressions and integration tests, lint, Workers-compatible runtime checks, stalled-upstream tests, request/response compatibility fixtures and token-quality fixtures. Do not treat the extra integration suite as green until its failure is resolved.

When implementation changes `functions-src/`, regenerate with `npm run build:functions` as required. Synchronize `doc/backend-api.md`, `doc/map.md`, relevant feature/technology/storage documents, and applicable README/agent guidance; mirror any `AGENTS.md` edits in `doc/agents.md`. Keep version/release metadata untouched without an explicit release request. Batch delivery to avoid repeated CI builds. No build, migration or deployment is part of this planning update.

## Delivery order

| Order | Deliverable | Runtime scope | Gate |
| --- | --- | --- | --- |
| 1 | Correct validation, job sharing, discovery, balances and caches | Cloudflare Functions | Regression scenarios assert fixed behavior |
| 2 | Safe Gladia submission/recovery and fewer status requests | Functions plus expected D1 migration | Ambiguity/replay/outage tests; schema deployed before dependent code |
| 3 | Bounded tokenizer startup, reusable tokens and lower batch overhead | Functions plus additive internal R2 metadata | Quality and resource benchmarks |
| 4 | Runtime verification, synchronized docs and one reviewable delivery | Tests/docs/generated functions | Supported runtime and compatibility checks pass |

Frontend and mobile code changes are not expected for these deliverables. If a later experiment requires new client behavior, identify it as a separate scope change rather than silently expanding this backend plan.

## All-route edge-case follow-up

The [completed edge-case matrix](cloudflare-edge-cases-2026-10-25.md) expands coverage to every API module and native workerd fetch behavior. Malformed-body and unsupported redirect-mode defects found by that suite were fixed locally. Deployment still requires the documented D1 migration; Gemini’s dictionary/tokenizer implementation remains separate.
