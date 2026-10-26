# Diamond enforcement hardening — 2026-10-26

## Behavior and compatibility

New paid transcription jobs now require a fresh, finite, positive YouTube duration. Stored metadata, incomplete caption lengths, client duration, and the previous 300-second default cannot authorize a price or tier limit. Unverifiable length returns the existing HTTP 400 `VIDEO_DURATION_UNAVAILABLE` before reservation or charge. Duration requests retain the existing six-second/body-size bounds and reject redirects rather than following an unverified origin.

Existing prices remain: up to 600 seconds costs one diamond, up to 1,200 costs two, up to 2,100 costs three, and longer permitted videos cost four. Guest/free/pro/premium duration caps remain 600/600/1,200/2,700 seconds. The authenticated server profile determines the tier and charge owner. Request-supplied tier, account, price and balance fields cannot override them.

Cached AI transcripts and active jobs are joined before paid duration verification; polling and refresh retain the existing job ID. Charge acknowledgements require boolean success and a nonnegative safe integer balance; a supplied ledger state must be `charged`. Rejected, unavailable, lost or malformed acknowledgements cannot authorize a Gladia POST. Existing failure/refund recovery cancels or refunds the same job-keyed operation, including a late charge after an ambiguous response.

Submission intent is acquired with one conditional D1 update returning the job ID. It requires a queued job, confirmed charge, no refund, and no previous submission intent. An unacknowledged claim or storage failure prevents submission. A retried request joins the original job; it cannot send an untracked replacement POST. Existing provider-acceptance ambiguity continues to use callback/provider reconciliation, not another creation request.

Refund confirmation requires strict boolean success and a terminal PostgreSQL ledger state (`refunded`, `cancelled`, or `account_deleted`); guest recovery uses its atomic D1 ledger transition. D1 confirmation also requires the caller still owns the refund lease. Failed or ambiguous acknowledgements remain recoverable. No recovery/financial history is deleted.

The initial enforcement pass changed no UI. The subsequently authorized mobile price-quote follow-up adds skeleton/retry states and removes the optimistic balance deduction; web frontend code, pricing policy and assets remain unchanged. Both passes are uncommitted and undeployed.

## Database verification and rollout

No new schema migration is required. Local tests verify the existing service-only financial RPCs, private PostgreSQL ledgers, protected profile fields/RLS, and atomic D1 charge/refund triggers. They reject invalid amounts, mismatched account/amount replays, and direct client writes to balance/subscription fields. Ordinary authenticated profile-name updates remain allowed.

Before release, an authorized operator must:

1. Confirm the shared PostgreSQL database has the existing atomic diamond, payment-event, regeneration/access-state and reliable-credit-operation migrations. Relevant source identities are `20260916_atomic_diamond_rpcs`, `20261023_payment_event_transactions`, `20261023_atomic_diamond_regeneration`, `20261023_access_state`, and `20261023_reliable_credit_operations`. Preserve subsequent billing/reward migrations and their ledgers. Confirm the profile protection trigger from the schema/security-hardening source is enabled.
2. Confirm D1 contains the base schema plus `20261023_credit_recovery`, `20261024_gladia_inbox`, and `20261025_gladia_submission_state`. Apply only missing prerequisite migrations in order before releasing dependent callers; do not replay already-applied additive migrations.
3. Execute `db/operations/diamond-authority-audit.sql` using an approved PostgreSQL SQL console. Require all five RPC signatures, safe definer owners/search paths, service-role execution and no anonymous/authenticated execution. Private credit/grant tables must have RLS and no client privileges/permissive policies. Inspect profile policies and the enabled guard together; profile UPDATE grants alone do not indicate a bypass. Compare installed function definitions to the reviewed source.
4. Execute `db/operations/diamond-recovery-audit.d1.sql` through an approved read-only D1 query path. Verify credit triggers and required columns/indexes; investigate mismatched amounts or confirmations without terminal ledger records. Preserve legacy ambiguity. Neither audit mutates balances or calls financial RPCs.
5. Build `functions/` from reviewed `functions-src/` with `npm run build:functions`. Record the deployed revision and compare it with the reviewed source revision/build fingerprint; local tests alone do not attest deployment. Release only through the existing authorized deployment workflow.
6. After release, monitor `VIDEO_DURATION_UNAVAILABLE`, `VIDEO_TOO_LONG`, charge RPC failures, refund attempts/backlog age, and jobs stuck in pending-charge or uncertain-submission states. Alert on sustained changes; avoid logging tokens, provider payloads or signed result URLs. Roll back application code if necessary while retaining additive schema and all ledgers.

Production Cloudflare revision, PostgreSQL grants/function definitions, and D1 schema were **not remotely attested** in this work. The scripts are prepared read-only checks, not evidence of a hosted deployment. No production credentials, paid provider requests, database migrations or deployments were used.

## Validation

Run with Node 22 (the supported runtime), externally installed PGlite/Miniflare modules, and no production bindings:

```sh
SKIP_LIVE_E2E=1 npm run test:backend
VOCA_PGLITE_MODULE=/absolute/path/to/@electric-sql/pglite/dist/index.js \
VOCA_MINIFLARE_MODULE=/absolute/path/to/miniflare/dist/src/index.js \
node --test tests/*.integration.mjs
npm run lint
npm run build:functions
```

The endpoint regression suite exercises the actual `/api/transcript` handler with isolated SQLite and fault-injected providers. It covers missing/timed-out/unavailable YouTube duration with forged client hints and stale metadata, exact pricing/tier boundaries, livestreams, forged account/pricing fields, cached reuse, concurrent requests, refresh/polling, malformed/lost charge acknowledgements, database failure after charging, and concurrent refund authorization. Ledger suites cover depletion, owner/amount mismatches, cancellation before a late charge, repeated refunds, expired/replaced leases, and lost refund confirmations. Existing workerd suites execute actual D1/R2 bindings and provider submission ambiguity.

Embedded PostgreSQL uses a single connection and does not reproduce production multi-connection lock contention. SQLite/workerd fixtures and local role tests do not certify hosted policies, provider availability, or deployed versions. No live paid-provider end-to-end result is claimed.

Final local results: **193 backend tests passed**, **436 integration tests passed**, with zero failures/skips. Backend lint passed and all **25 function bundles** built successfully. Both audit SQL scripts executed against local fixtures. The backend diff contains only backend source, tests, audit SQL and documentation. No Flutter files were edited by this task; unrelated existing/concurrent mobile edits were preserved.

## Mobile quote follow-up

The additive `quoteOnly: true` mode on `/api/transcript` returns verified `cost`, `diamonds`, `maxDiamonds`, `canGenerate` and `reason`, plus duration/tier cap when verification is needed. It requires `preferAI: true`, rejects polling identities, uses a separate 60/120/180/240-per-hour guest/free/pro/premium quota and returns `Cache-Control: no-store`. It never reserves or charges a new job, calls CAPTCHA or submits Gladia work. Cached AI transcripts/active jobs quote zero; duration failures return no estimated price.

New mobile submissions send `expectedDiamondCost`. The server compares this optional integer (0–4) against freshly verified pricing before reservation; a difference returns HTTP 409 `DIAMOND_PRICE_CHANGED`. Legacy callers can omit it. The mobile sheet re-quotes after CAPTCHA, requires a new confirmation when the price changes, and synchronizes balances only from acknowledged server responses. Deploy the backend first; mobile must not estimate prices if the quote contract is unavailable. No new migration is needed. The mobile contract and UI tests are documented in the sibling Flutter project's `doc/diamond-price-quotes-2026-10-26.md`.
