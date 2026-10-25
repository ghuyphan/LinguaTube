# Cloudflare backend optimization — implementation record

Date: 25 October 2026. Status: implemented and validated locally; not deployed. The [original plan](cloudflare-functions-plan-2026-10-25.md) and [baseline evidence](cloudflare-functions-validation-2026-10-25.md) remain available for comparison.

## Scope

This implements the authorized backend work outside Gemini's dictionary/tokenizer changes. No edits were made by this implementation to `providers/dictionary-apis.js`, `services/dict.service.js`, `utils/dict-parsers.js`, `utils/tokenizer.js`, dictionary frontend components or POS utilities. Their concurrent changes remain in the workspace. Transcript-specific assertions in the shared backend-security test were updated while preserving dictionary assertions.

No frontend request/response redesign, Supabase schema change, dependency addition, release/version bump, commit, remote migration or deployment was performed. Functions were regenerated through the build script only.

## Changes and evidence

| Baseline finding | Implemented behavior | Local evidence |
| --- | --- | --- |
| 1. Untrusted duration and pricing | Cheap input validation precedes metadata work; only new paid AI requests fetch a fresh server duration, enforce the tier cap and use a shared price function | Malformed duration returns 400 without charge or provider POST; an actual 1,800-second anonymous video fails the 600-second cap despite a short D1 hint; price boundaries covered |
| 2. Refresh cancels shared work | Refresh joins an active job before CAPTCHA/credit checks; the service also joins on races | Existing job survives, response is 202, zero replacement submissions or charges |
| 3. Empty native-language list hides captions | Treat an empty metadata list as unknown and attempt native discovery; only advertise persisted transcript languages | Seeded empty list still fetches and returns native captions |
| 4. Retried Gladia creation duplicates bills | Persist intent before one POST; correlate metadata and callbacks; uncertain acceptance cannot trigger replacement creation or automatic age expiry | Lost accepted response produces one charge/POST, then metadata GET recovers the same provider ID with no second POST |
| 5. Incorrect anonymous balance display | Pass the bound environment/context to diamond lookup | Cached transcript and diamond-status routes both report zero when the authoritative balance is zero |
| 6. Translation cache-miss race | Register exact-input promise before the first cache read; preserve owner cleanup and bounded map | Two simultaneous requests plus a cache follow-up make one translation provider call |
| 7. Partial save truncates translations | Merge over full canonical source cues, reject unknown cues, retain CAS/mutex protection | Updating one of three cues leaves all three cues and unrelated translations intact |
| 8. Probe budget looks like an empty catalog | Distinguish incomplete verification and propagate retryable discovery errors; retain bounded eligible candidate scanning | Ten exhausted legacy probes do not conceal a later existing transcript as an empty success |
| 9. Token initialization blocks transcripts | Persist/return clean cues first and schedule optional bounded enrichment; conditional publication preserves newer R2 content | Cached Japanese cues return before the deliberately stalled dictionary download is released |

Finding 9 is addressed at transcript callers. Tokenizer initialization, cancellation, token quality and the tokenization endpoints themselves remain Gemini's scope. The three-second enrichment timeout bounds the caller's wait, not the underlying tokenizer network requests. Timed-out enrichment does not overwrite R2; later reads can retry.

Additional work removes duplicate trusted-duration fetches, deduplicates overlapping YouTube verification, adds persisted poll spacing/backoff and honors bounded Retry-After. Negative no-transcript observations have a seven-day lifetime, refreshed only on a new observation. Empty native metadata updates preserve discovered languages. No production speedup percentage is claimed.

## Validation

Subsequent [all-route edge-case testing](cloudflare-edge-cases-2026-10-25.md) expands this historical run to the current 193-test backend suite and native-fetch runtime contracts. It also fixes unsupported redirect options that the original fetch-mocked fixture could not detect. The counts and evidence below describe the original implementation validation.

All runs used supported Node 22.23.4. External services were controlled fixtures, without live API credits or production credentials.

| Check | Result |
| --- | --- |
| Default backend suite (`tests/*.test.mjs`) | 153 passed, zero failed |
| D1 credit/refund and Gladia recovery integration suites | 16 passed, zero failed |
| Workerd regression suite with actual local D1/R2/KV bindings | Nine scenarios passed (ten TAP tests including the parent), zero failed |
| ESLint and locale consistency checks | Passed |
| Functions build | 25 entry points bundled, zero failed |

The Workers suite uses Miniflare 4.20260730.0/workerd 1.20260730.1, compatibility date 2024-12-20 with `nodejs_compat`. Its [corrected-behavior evidence JSON](cloudflare-functions-implementation-2026-10-25.json) records source hashes, responses, database states and outbound call counts. See [development instructions](../development-guide.md#validating-and-deploying-the-transcript-optimizations-25-october-2026) for rerunning it with an external Miniflare installation. The historical mock reproductions are intentionally preserved as baseline evidence and are not expected to pass against corrected source.

These tests establish local correctness under the stated faults. They do not establish production schema state, regional behavior, actual provider billing or measured live latency. Gemini may continue editing its modules after the captured source hashes.

## Deployment prerequisite and recovery

1. Apply [the additive D1 migration](../../db/migrations/d1/20261025_gladia_submission_state.sql) to the intended target before activating the updated bundle. It adds submission intent/timing and polling due-time columns plus an index; existing jobs default to `legacy`.
2. Verify the new fields/index, then deploy the generated Functions through the existing release workflow. This implementation has performed neither remote step.
3. Confirm native/cache reads, a new AI request and its callback/poll completion. Keep the existing internal reconciliation scheduler active; it also processes due accepted or uncertain jobs in bounded batches.
4. Inspect unresolved intent with [the read-only audit](../../db/operations/gladia-submission-audit.sql). Provider absence or multiple metadata matches leave the job pending for investigation. Do not infer a refund or send another paid submission from an empty listing.

New `submitting`, `uncertain` and `accepted` jobs are deliberately not cancelled merely by the old fifteen-minute age rule. An uncertainty that cannot be resolved by callback or metadata needs operator/provider evidence. Rollback must preserve these rows and credit ledgers; reverting to old creation/expiry behavior for unresolved jobs risks duplicating work or refunding an accepted submission.
