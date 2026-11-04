# Neon Postgres

This app uses a React/Vite frontend and a Next.js **Node.js** API. Database
credentials stay in the API process. The browser calls same-origin `/api/lead`;
Vite's development and preview servers proxy `/api` to `127.0.0.1:3000`.

On Vercel, the API uses `pg` with `attachDatabasePool` for Fluid compute.
Locally, the API uses `@neondatabase/serverless` Pool over secure WebSockets for
Neon URLs because TCP 5432 did not complete SSL negotiation on this machine.
WebSockets preserve interactive transactions and the transaction-scoped advisory
lock; a one-shot HTTP query driver would not preserve that flow. Local Compose
URLs retain `pg` over TCP. Use Neon's pooled
`DATABASE_URL` at runtime. Migrations prefer `DATABASE_URL_UNPOOLED` when Neon
provides it, otherwise use `DATABASE_URL`. Do not disable certificate validation.
The process reuses one small pool, and allows ten seconds for a cold compute.
Driver guidance: <https://neon.com/docs/serverless/serverless-driver>.

## Provision and run

From the repository root:

```sh
npx neon@latest init -y --org-id org-green-silence-67766516 --project-id curly-dust-15361413 --branch production --services postgres
npx neon@latest deploy
npm run migrate
npm run build
npm run start:api
# In a second terminal:
npm run start:web
# In a third terminal:
npm run test:neon
```

Open <http://127.0.0.1:4173>. `dev:api`, `start:api`, `migrate`, and `test:neon`
load the root `.env`, followed by `.env.local`. Existing shell environment
variables take precedence. Keep these files private and out of Git. Never
prefix the database URL with `VITE_` or `NEXT_PUBLIC_`.
The local API uses `API_PORT` (default 3000), independently of Compose's `PORT`.
For local preview, `.env` must also contain
`ALLOWED_ORIGINS=http://127.0.0.1:4173,http://localhost:4173,http://127.0.0.1:5173,http://localhost:5173`
because the frontend proxy and API listen on different ports. `start:api` runs
Next.js's generated standalone server after a successful build.

`test:neon` requires Playwright Chromium (`npx playwright install chromium` if
absent). It submits the real browser form, reads back the committed Neon row
and attribution, checks a browser retry, races eight API submissions, and checks
invalid input. It uses a unique synthetic name and unused phone and deletes only
its own rows in a `finally` block. This check does not run the destructive Compose
outage suite against the production branch.
Alternatively, set `PLAYWRIGHT_CHANNEL=chrome` or `PLAYWRIGHT_CHANNEL=msedge`
to use an installed Chrome or Edge browser.

The Vite site and Next.js API are now hosted on Vercel; see [vercel.md](vercel.md).
Local startup and database verification alone do not publish a site.
