# Vercel deployment

Team: `ksayronin-soft` (Hobby). Node.js: 24.x. No paid upgrade or add-on was enabled.

| App | Project | Root | Public URL |
| --- | --- | --- | --- |
| Vite frontend | `coffee_shop` | `apps/web` | https://coffeeshop-sooty.vercel.app |
| Next.js API | `coffee-shop-api` | `apps/api` | https://coffee-shop-api-olive.vercel.app/api/health |

Both projects include shared workspace sources outside their app root. Their
install command is `cd ../.. && npm ci`; build command is `npm run build` from
the respective app directory. Frontend output is `dist`. API runs Node.js on
Fluid compute in `iad1` and attaches its `pg` pool to Vercel's suspension lifecycle.
See [Vercel's pool guidance](https://vercel.com/kb/guide/efficiently-manage-database-connection-pools-with-fluid-compute).

## Production environment

Only the API project has these production variables:

- `DATABASE_URL`: sensitive secret containing the existing Neon pooled TLS URL.
- `ALLOWED_ORIGINS`: `https://coffeeshop-sooty.vercel.app,https://coffeeshop-ksayronin-soft.vercel.app`.

The API normalizes Neon's `sslmode=require` to `verify-full` for `pg`.
Migrations were applied to Neon before deployment. The frontend calls `/api`,
which Vercel rewrites to the API project. Do not expose the DB URL through
`VITE_` or `NEXT_PUBLIC_` variables. Preview deployments have no production DB
secret configured; configure a separate Neon branch before testing API previews.

`.vercelignore` excludes env files, `.local`, `.neon`, `.vercel`, local builds,
dependencies, and evidence from uploads. `vercel link` created an ignored
`.env.local` containing a local Vercel OIDC token; it is not part of the site.

## Redeploy

Run from the repository root, after building/testing the desired working tree:

```sh
npx --yes vercel@64.5.0 login
npx --yes vercel@64.5.0 deploy --project coffee-shop-api --scope ksayronin-soft --prod --yes
npx --yes vercel@64.5.0 deploy --project coffee_shop --scope ksayronin-soft --prod --yes
```

CLI deployment uploads the current local source, including uncommitted changes.
The published source was based on Git HEAD `42d573a` plus the current working
tree. Commit and push the app, lockfile, and configuration before relying on
Git deployments. The frontend is connected to `ksayron/COFFEE_SHOP`, production
branch `main`. The companion API currently uses CLI deployment and is not
connected to Git; its redeploy command is shown above.

The lockfile was repaired with npm-generated Rollup 4.64.10 platform entries
after the first Linux frontend build reported a missing Linux binary. Existing
dependency versions were preserved. Keep those cross-platform entries in Git.

## Phone field

Belarus numbers display as `+375 29 123 45 67` with automatic spaces, a 17-character
display limit, and nine national digits (12 including country code). Domestic
pastes such as `8 (029) 123-45-67` are converted without truncating the last digit.
National-only entry adds `+375` on blur. Explicit foreign numbers remain foreign
and are rejected by validation. Cursor edits and deletion across generated
spaces work; the API still receives the normalized E.164 value.

## Checks

```powershell
$env:TEST_BASE_URL='https://coffeeshop-sooty.vercel.app'
$env:PLAYWRIGHT_CHANNEL='msedge'
node node_modules/@playwright/test/cli.js test tests/browser/phone-input.spec.ts

$env:TEST_ALLOW_REMOTE=$env:TEST_BASE_URL
$env:NODE_OPTIONS='--dns-result-order=ipv4first --no-network-family-autoselection'
npm run test:neon
```

The Neon verifier retries only independent DB verification reads and idempotent
fixture cleanup, never the app's POST requests. It saves an ignored exact fixture
record until cleanup succeeds, so an interrupted run can be recovered safely.
For local VPN/DNS issues, optional `PLAYWRIGHT_HOST_RULES` passes a verified
Chromium host resolver rule; never hard-code an old CDN IP into app configuration.

Current execution evidence is recorded in [vercel-verification.md](../evidence/vercel-verification.md).
Public Lighthouse and sustained-load testing were not performed.
