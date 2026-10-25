# Cloudflare finding validation — 25 October 2026

> Historical baseline evidence. The authorized backend fixes are now implemented locally; see the [implementation and final validation record](cloudflare-functions-implementation-2026-10-25.md). Statements below about open findings or unchanged source describe the earlier review, not the current workspace.


## Result

**All nine reported scenarios reproduce in local `workerd` with D1, R2 and KV bindings.** They reproduce in both an isolated copy of reviewed revision `79b9d0e` and a captured workspace copy containing Gemini's concurrent dictionary/tokenizer edits. The application modules were imported unchanged into a test-only Worker entry point.

This validates the local application behavior under the stated fault conditions. It does not establish that a production incident occurred, that the deployed schema matches the repository, or that live provider billing was observed.

## Environment and isolation

- Node **22.23.4**, within the repository's supported range.
- Miniflare **4.20260730.0**, powered by workerd **1.20260730.1**.
- Compatibility date **2024-12-20** and `nodejs_compat`, matching `wrangler.toml`.
- Actual local D1 queries and triggers initialized from checked-in `db/schema.sql`, `20261023_credit_recovery.sql` and `20261024_gladia_inbox.sql`.
- Local R2 objects and conditional writes through runtime bindings, plus local KV. No fake database adapter or fake R2 implementation is used in these tests.
- The real API middleware and handlers run for transcript, metadata, diamond-status and dual-subtitle cases. Translation merge and recommendation cases also invoke their actual internal helpers against the bindings.
- External YouTube, CAPTCHA, Supadata, Gladia, translation and dictionary responses are controlled test fixtures. Unrecognized network calls are blocked. No production credentials or live provider calls are used.
- Application source is bundled into a temporary test fixture. `functions/`, dependencies, release files and deployed resources were not modified by this validation work.

Miniflare uses the Workers runtime locally, with storage emulation. It does not reproduce regional D1 replication, all production limits, actual upstream latency or service availability. See [Miniflare's runtime and bindings documentation](https://github.com/cloudflare/workers-sdk/blob/main/packages/miniflare/README.md).

## Evidence by finding

| Review finding | Runtime observation | Control or independent check | Verdict |
| --- | --- | --- | --- |
| 1. Duration enforcement/pricing | Real metadata handler stores 30 seconds; controlled YouTube response reports 1,800. A malformed duration hint gets HTTP 202; D1 records one charged diamond and a processing job, with anonymous balance reduced from 3 to 2. | The same request with a numeric duration is rejected with HTTP 400 under the 600-second cap. | Confirmed validation/spending-path defect |
| 2. Cross-owner force refresh | Caller has a real zero-credit D1 balance. Another owner's processing job becomes `failed / SUPERSEDED`; replacement fails with `INSUFFICIENT_DIAMONDS`. No new Gladia submission occurs. | Without force refresh, the existing job remains processing and is joined. Victim refund intent remains pending when the controlled Supabase response is unavailable. | Confirmed cancellation/authorization-order defect |
| 3. Unknown native languages | Real metadata backfill creates the unknown-language row. Transcript handler returns `NO_NATIVE` without calling the caption provider. | Force refresh reaches the available controlled native captions and returns `source: native`. | Confirmed metadata/discovery defect |
| 4. Ambiguous Gladia retry | Controlled provider accepts a creation request and loses its response. The handler issues two POSTs; D1 retains one job with the second provider ID and one credit charge. | Provider's official guidance independently states repeated accepted jobs are separately billed and have no automatic deduplication. Actual live billing was not tested. | Duplicate client submissions confirmed; production financial impact remains conditional |
| 5. Diamond status | Cached transcript reports 3 diamonds; dedicated status handler reads the same persisted client balance as 0. | Both requests use the same client identity and real local D1 state. | Confirmed status inconsistency |
| 6. Translation stampede | Two simultaneous identical requests make two upstream translation calls, while real R2 caching/persistence runs. | A subsequent request hits the stored cache and adds no provider calls. | Confirmed warm-isolate deduplication race |
| 7. Short translation save | Real R2 object shrinks from 3 cues to 1 after a subset save. | Full-list save preserves all 3 cues and existing translations. The current normal web checkpoint sends a full list. | Confirmed subset/stale-client data-loss path; not every normal web save |
| 8. Discovery budget | A legacy language row with a real R2 transcript is omitted; result is empty with `hasMore: false`. | Marking that row's verified `sub_languages` yields the video. The object is present throughout. | Confirmed incomplete-discovery result |
| 9. Japanese initialization | Cached Japanese transcript request remains unsettled after 2.5 seconds with 12 dictionary downloads stalled. | Releasing those downloads as explicit failures allows fallback tokenization and an HTTP 200 response. | Confirmed pre-initialization bypass of the fallback deadline |

For Gladia behavior, see [official retry and duplicate-billing guidance](https://support.gladia.io/article/understanding-the-transcription-process-breakdown). The network fault is injected locally; no paid job was created to demonstrate it.

## Test results

| Run | Result |
| --- | --- |
| Reviewed revision, nine workerd scenarios | All 9 reproduced; test runner reports 10 passed including the parent test |
| Captured workspace, same workerd scenarios | All 9 reproduced; 10 passed including the parent test |
| Reviewed revision, default backend suite on Node 22 | **137 passed, zero failed** |
| D1/Gladia recovery integration suite on Node 22 | **13 passed, zero failed** in this run |
| Concurrent working-tree default suite | 136 passed, one Jotoba POS assertion differed during Gemini edits |

The earlier concurrent-depletion test can still be order-sensitive: a passing run does not resolve its assumption that input job 0 necessarily wins. The [plan](cloudflare-functions-plan-2026-10-25.md) retains the test correction. Similarly, the in-progress dictionary assertion is recorded separately and was not changed here.

These evidence tests deliberately assert the reported defective behavior. A passing evidence test means **reproduced**, not **fixed**. When implementation starts, turn each applicable case into a regression test that asserts correct behavior.

## Reproducibility and artifacts

- [Runtime test runner](../../tests/cloudflare-review-validation.integration.mjs)
- [Test-only Worker entry point](../../tests/fixtures/cloudflare-review.worker.js)
- [Source fingerprints and raw results](cloudflare-functions-validation-2026-10-25.json)
- [Original review](cloudflare-functions-2026-10-25.md)
- [Implementation and optimization plan](cloudflare-functions-plan-2026-10-25.md)

The runtime dependency is optional and installed outside the repository. The test is skipped without `VOCA_MINIFLARE_MODULE`; a skipped run is not validation. To reproduce on the current workspace with the same tools:

```bash
npm install --prefix /tmp/voca-cf-runtime-validation --no-package-lock --no-save miniflare@4.20260730.0 node@22.23.4
VOCA_MINIFLARE_MODULE=/tmp/voca-cf-runtime-validation/node_modules/miniflare/dist/src/index.js VOCA_VALIDATION_OUTPUT=/tmp/voca-cf-runtime-validation/evidence.json /tmp/voca-cf-runtime-validation/node_modules/node/bin/node --test tests/cloudflare-review-validation.integration.mjs
```

Set `VOCA_SOURCE_ROOT` to a separate source snapshot to validate that snapshot instead. The runner fingerprints source files before and after bundling, rejecting a source change during compilation. The archived results contain the fingerprints of the reviewed revision and the captured workspace; the four differing source files match Gemini's concurrent dictionary/tokenizer edits.

No changes were made to Gemini's files. This validation added tests and evidence, not application fixes or optimizations.
