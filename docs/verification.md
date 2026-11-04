> 19 October Neon update: the production build, local production API, real browser
> form submissions, Neon persistence/attribution, retries, and concurrency now pass.
> See [Neon verification](../evidence/neon-verification.md). Compose and public
> hosting checks remain separate and unrun in this setup.
>
> 19 October, selected Club full-site update: frontend typecheck/build and actual
> browser checks are now complete for this visual iteration. See
> [coffee-club-site.md](coffee-club-site.md) for current evidence and limits.
> Backend success, Compose persistence, public hosting and Lighthouse remain open.
> The dated matrix below records earlier work, not a claim that all checks ran again.

# Acceptance evidence

No check is marked passed until executed. Use synthetic data; do not publish PII.

## Executed on 18 October 2026

| Check | Result and boundary |
| --- | --- |
| TypeScript source syntax, relative imports and JSON | Passed for 15 sources using an existing local TypeScript toolchain; not `tsc` |
| JavaScript and PowerShell syntax; CSS parsing | Passed; no application dependencies installed |
| `docker compose config --quiet` | Passed with a temporary configuration-only password; stack not built |
| Nginx configuration | `nginx -t` passed on cached 1.27 Alpine; intended 1.28 image untested |
| PostgreSQL migration and concurrency | Cached PostgreSQL 17, isolated disposable container: 16 concurrent locked inserts → one row; expired window → second row. Direct SQL only |
| Representative visual comparison | Notice and photo compositions captured at 390×844 and 1440×900; selected notice. Fonts loaded; no observed horizontal overflow in these previews |

Screenshots: [comparison](design.md). Machine-readable delivery asset manifest:
[assets.json](../evidence/assets.json). Offline check record:
[offline-checks.txt](../evidence/offline-checks.txt).

These results do not establish API, real Radix, form, full-page responsiveness,
performance or production readiness. No Lighthouse score is claimed.

## Pending after dependency installation

19 October refresh: source/JS/PowerShell/CSS syntax and Compose configuration
passed again. Browser preview captures were refreshed. Container rerun could not
start because the Docker Desktop Linux engine pipe was absent; earlier results
are retained as dated evidence, not a current stack health claim.

- [ ] Belarus phone normalisation; invalid/foreign rejection.
- [ ] Applications typecheck/build with committed lockfile.
- [ ] Database readiness via health; API 201/200/400/503.
- [ ] Concurrent requests/instances/retries yield one lead within ten minutes.
- [ ] Expired window accepts; different phones independent.
- [ ] First attribution survives reload and reaches database.
- [ ] Form pending/success/error, retry retains values, keyboard focus.
- [ ] Compose clean start and persistence after restart.
- [ ] 390/768/1440 screenshots, no overflow, reduced motion.
- [ ] Public same-origin form creates actual database record.
- [ ] Mobile Lighthouse on that public deployment with actual conditions.

Submission: live URL, repo, incremental commits, genuine AI evidence,
mobile Lighthouse and concise README. Telegram optional/deferred.

`npm test`, `npm run typecheck`, `npm run build`, `npm run test:integration`,
`npm run test:browser`, and `scripts/verify-persistence.ps1` are the prepared
verification sequence. Integration tests interrupt the local database and use
only their marked synthetic fixtures. Public checks stay deferred separately.
