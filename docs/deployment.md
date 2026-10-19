# Running and deployment

## Local Compose

Dependency installation was handed to the human on 18 October. The interrupted
download did not produce a lockfile. First run `npm install` at the repository
root, then commit `package-lock.json`; Docker builds and CI intentionally use
`npm ci` and require that real generated lockfile. No substitute lock was invented.
On Windows, `./scripts/start-local.ps1` performs this install, creates a random
local `.env` if absent, runs checks/builds and starts Compose. It has not been run.

Copy `.env.example` to `.env`, replace the password with a random URL-safe hex
string, then `docker compose up --build -d`. Open http://localhost:8080.
Only Nginx publishes a port. API starts migrations after PostgreSQL is healthy.
`docker compose down` preserves the named database volume. Do not use `down -v`
unless intentionally deleting all local applications. Health: `/api/health`.
For another hostname, add its origin as `SITE_ORIGIN` in `.env`.

After startup, run `npm run test:integration`, `npx playwright install chromium`,
then `npm run test:browser`. Submit a synthetic application and run
`./scripts/verify-persistence.ps1`. These runtime checks are prepared but unrun.
Integration tests stop/start the local database and delete their own synthetic
fixtures; run them only against this local disposable demonstration environment.

## Public deployment (deferred by human on 18 October 2026)

Public publication and public Lighthouse have not been performed. Create a Neon
database and use the pooled TLS connection string as secret `DATABASE_URL` for
the API Vercel project (root `apps/api`, framework Next.js). Run migrations once
with that secret in the environment: `npm run migrate` from the repo root.
Set `ALLOWED_ORIGINS` to the public frontend origin (no trailing slash).

Create a second Vercel project rooted at `apps/web` (Vite). Install from workspace
lockfile; build `npm run build -w @kvarta/web` from repo root. Replace the API
destination in `apps/web/vercel.json` with the actual API origin. Keep the `/api`
rewrite before SPA fallback. Set an absolute HTTPS `og:image` and canonical URL
in `apps/web/index.html` once the final frontend origin exists. Test a real public
submission and its database record before marking deployment complete.

Vercel replaces Nginx publicly. Compose remains the complete self-contained local
package. Demo is fictional and noncommercial within Hobby personal-use scope.
No persistent SQLite/filesystem storage is used on serverless instances.

## Manager inspection

Run locally through `docker compose exec db psql -U kvarta -d kvarta`.
Treat results as private: they contain contact details.

```sql
BEGIN READ ONLY;
SELECT id, created_at, name, phone, interest, product, comment,
       attribution->>'utm_source' AS source,
       attribution->>'utm_campaign' AS campaign,
       attribution->>'utm_content' AS ad,
       attribution->>'landingUrl' AS landing,
       attribution->>'referrer' AS referrer,
       attribution->>'submissionUrl' AS submitted_from,
       attribution - 'landingUrl' - 'referrer' - 'submissionUrl' AS all_ad_ids
FROM leads ORDER BY created_at DESC LIMIT 50;
COMMIT;
```

Use a dedicated read-only DB role and agreed retention policy for a real client.
This assignment has no admin UI or real fulfilment.
