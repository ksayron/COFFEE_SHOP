# Running and deployment

> 19 October 2026: Neon Postgres is now linked to project
> `curly-dust-15361413`, branch `production`. The migration, production build,
> and local browser → Next.js → Neon verification passed. Use [neon.md](neon.md)
> for the current Neon startup commands and [verification evidence](../evidence/neon-verification.md)
> for executed results. The public [frontend](https://coffeeshop-sooty.vercel.app)
> and [API health](https://coffee-shop-api-olive.vercel.app/api/health) are now
> deployed on Vercel. See [Vercel setup](vercel.md).

## Local Compose

The repository now has a real generated lockfile validated by Vercel's Linux
`npm ci`. Run `npm ci` from the root and commit `package-lock.json` with the app.
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

## Public deployment (19 October 2026)

Vercel team `ksayronin-soft` hosts `coffee_shop` (Vite, root `apps/web`) and
`coffee-shop-api` (Next.js, root `apps/api`). Production Postgres is the existing
Neon project `curly-dust-15361413`, branch `production`. Its pooled connection
string is a production secret on the API project; no DB credentials are sent
to the frontend. `ALLOWED_ORIGINS` includes the public frontend aliases.

Both projects install from the workspace lockfile and build from their app root.
The frontend's `/api` rewrite targets `coffee-shop-api-olive.vercel.app`; canonical
and social image URLs use `coffeeshop-sooty.vercel.app`. Deployment instructions
and validation are in [vercel.md](vercel.md). Public Lighthouse has not been run.

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
