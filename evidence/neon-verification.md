# Neon setup verification — 19 October 2026

Project: `curly-dust-15361413`, organization: `org-green-silence-67766516`,
branch: `production` (`br-soft-haze-b4po0qv5`). Only Postgres was requested.

## Provisioning

`npx neon@latest` was used after the requested global installation failed.
`init` created `neon.ts`, installed `@neon/config` and `@neon/env`, installed
the Neon agent plugin, and wrote the ignored `.neon` context. Setup used the
bundled Node 24.19 runtime because the system Node 22.14 cannot run Neon's
skill installer. Browser sign-in completed successfully.

```text
Auth complete (profile DEFAULT)
→ Applying to branch production (br-soft-haze-b4po0qv5)
Utilized services: Postgres
No changes — branch production already matches the policy.
Pulled 3 Neon variables into .env
  Postgres        DATABASE_URL, DATABASE_URL_UNPOOLED
  Branch          NEON_BRANCH
```

Runtime uses the pooled URL; migrations use the direct URL. Both URLs require
TLS. Credentials are confined to ignored env files, and were not copied into
this report. The browser uses `/api` and receives no database credentials.

## Migration

Created a temporary normal child branch, `kvarta-migration-check-20261019`
(`br-lively-flower-b4rdor94`), with a one-day expiry. Applied migration
`001_leads.sql` there, then ran it again to prove it is idempotent. Both passed.
Applied the same migration to production:

```text
> npm run migrate
Applied migration 001_leads.sql
Database migrations up to date.
```

Deleted the temporary branch. A subsequent branch listing confirmed:
`Temporary migration branch remaining: false`. Root `.env` and `.neon`
remain pinned to production.

## Build and running app

Final `npm run build` exited **0**, after installing the Neon dependencies and
adding the driver and API error-code logging:

```text
vite v7.3.1 building client environment for production...
✓ 226 modules transformed.
✓ built in 1.65s
▲ Next.js 16.4.2 (Turbopack)
✓ Compiled successfully in 300ms
Finished TypeScript in 1652ms ...
✓ Generating static pages using 5 workers (3/3) in 739ms
Route (app)
┌ ○ /_not-found
├ ƒ /api/health
└ ƒ /api/lead
```

`npm run start:api` starts the generated production standalone server at
`http://127.0.0.1:3000`; `npm run start:web` serves the built frontend at
`http://127.0.0.1:4173`. The API's port is independent of Compose's `PORT`.
The local frontend origins were added to `ALLOWED_ORIGINS` in `.env`.

## End-to-end proof

Executed in headless installed Microsoft Edge through Playwright:

```powershell
$env:PLAYWRIGHT_CHANNEL='msedge'
npm run test:neon
```

Final run exited **0**:

```text
PASS /api/health -> HTTP 200 (Next.js -> Neon Postgres)
PASS browser form -> HTTP 201 -> success UI -> exact row + attribution read back from Neon
PASS browser retry -> HTTP 200 duplicate -> duplicate success UI
Concurrent submission statuses: 201, 200, 200, 200, 200, 200, 200, 200
PASS 8 concurrent submissions -> 1 HTTP 201 + 7 HTTP 200 -> exactly 1 Neon row
PASS invalid phone -> HTTP 400
PASS synthetic fixture cleanup -> 0 rows remaining
```

The browser submitted the actual form through the Vite proxy and production
Next.js handler. An independent database client verified the stored normalized
phone, interest, and original UTM/landing attribution. Fixtures used a unique
synthetic name and an unused phone. Every completed attempt cleaned up its own
rows. No existing enquiries were modified.

`npm test` also passed **3/3**; `npm run typecheck` and `git diff --check` passed.

## Failures, recovery, and limits

- Global `npm i -g neon@latest` failed with `ENOTDIR` in the existing shared
  npm cache. Used `npx neon@latest` with a separate ignored project cache.
  Downloads also had transient timeouts.
- Initial `init` stopped at the Node 22.20 minimum for the skill installer.
  Retried with bundled Node 24 and `--agent codex`; setup completed. The first
  attempt also installed the Neon plugin for other detected editors.
- npm warned about the existing lockfile during Neon dependency installation;
  installation completed and updated the lockfile. Final build and checks passed.
- An eager connection guard in the initial code change broke build-time route
  collection without env vars. Initialization is now lazy; final builds pass
  without needing database credentials at build time.
- Direct TCP database connections timed out on both Node 22 and 24. All three
  IPv4 endpoints accepted TCP but did not answer the Postgres SSL request.
  Neon URLs now use the official WebSocket driver over secure HTTPS transport,
  preserving interactive transactions. Compose URLs retain the existing `pg`
  driver. No certificate validation was disabled.
- Initial browser submission returned 403 until local frontend origins were
  configured. The initial `next start` command also warned about standalone
  output; the root startup command now runs the generated standalone server.
- Two early concurrency runs produced one 201 and seven 503 responses. A
  targeted direct-driver run, targeted HTTP run, and the final complete browser
  run passed. Error-code logging was added, but the earlier transient failures
  were not conclusively diagnosed; the final success is a local test result,
  not a reliability or sustained-load guarantee.
- Temporary-branch deletion failed twice with API connectivity errors and a
  Node 24 native assertion. Retried under system Node 22 with IPv4-only DNS
  selection; deletion succeeded and absence was independently confirmed.
- Root `npm audit` reports three unresolved dependency advisories: high in
  `vite` and `sharp`, low in `esbuild`. No unrelated dependency upgrade was
  applied as part of database setup.

No public web hosting was provisioned. Compose outage tests, WAN testing,
Lighthouse, and sustained load tests were not run. The existing unrelated
frontend edit was preserved. See [startup instructions](../docs/neon.md).
