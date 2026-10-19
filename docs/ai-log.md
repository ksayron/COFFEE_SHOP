# Genuine AI work record

Contemporaneous decisions/corrections, not a fabricated transcript. The full
Codex chat is primary session evidence; export/share evidence at handoff.

## 18 October 2026 · setup

- Human supplied facts, architecture, approval gate and selected references.
- Human approved Florets + Jolene / Zerno atmosphere and full implementation.
- Human approved Vercel/Neon public hosting with local Nginx Compose.
- AI chose Design Taste Frontend within that direction, with minimal motion.
- AI found a copied unrelated project runbook and replaced it.
- Docker engine was stopped at first check; Compose verification pending.
- No fabricated people, reviews, business contacts or asset permissions.

## Implementation observations

- Intermittent DNS/timeouts interrupted npm, GitHub and Docker downloads. Retried
  bounded requests and used the cache; did not bypass dependency compatibility checks.
- A concurrent rerun of the GitHub bootstrap hit existing labels. Added `--force`
  for idempotent label creation and verified all ten real issues afterwards.
- The first npm resolution reported `react-dom@undefined` after a failed registry
  fetch. This was a download failure, not evidence of a true peer incompatibility.
- System fontTools lacked the optional Brotli module. Font preparation now uses
  Node's built-in Brotli encoder as a fallback, without changing global Python packages.
- AI generated two original fictional workshop images; human-supplied facts remain
  the source of truth. No generated faces or invented testimonials were introduced.
- Human deferred public deployment after setup: local Docker is the current target.

## Offline continuation and actual corrections

- Human requested handling dependency downloads. AI stopped npm and Docker pulls;
  offline lockfile generation also lacked cached metadata. No lockfile was fabricated.
- Removed Lighthouse from application dependencies; it is an on-demand audit tool,
  not needed inside either production image. Public audit remains deferred.
- Representative previews were server-rendered with an already-installed local
  React/TypeScript toolchain; no new packages were downloaded for these captures.
- Preview server crashed when a missing file was read after headers were sent.
  AI reproduced the crash, moved the file read before `writeHead`, and recaptured.
- While reviewing Nginx, AI caught that a location-level `add_header` would replace
  inherited security headers. Switched caching to `expires`, then validated syntax
  with cached Nginx 1.27. The intended 1.28 image is not yet downloaded.
- Font optical-size axis was fixed at display size 48 to reduce Literata from
  265,516 to 93,912 bytes. An attempted second subsetting hit a fontTools glyph
  error; already-subset WOFF2 files now skip duplicate glyph subsetting. Font
  loaded successfully in the browser; comparison screenshots were refreshed.
- Actual isolated PostgreSQL 17 check: migration ran; 16 concurrent locked inserts
  produced one row; expired rolling window admitted another. This is not an API test.
- Actual source checks: TypeScript parsing/local imports/JSON, JavaScript and
  PowerShell syntax, CSS parsing, Compose config and Nginx syntax passed.
- Full typecheck, project builds, real form/browser tests, Compose persistence and
  Lighthouse are still unrun. All affected GitHub acceptance remains open.

Visible session export: `evidence/ai-session.md` and `.jsonl`, generated from this
conversation's actual public messages; excludes internal instructions/reasoning.

## 19 October · final local handoff

- Resumed without dependency downloads. Source, JS/PowerShell/CSS syntax and
  Compose configuration passed again; no project lockfile or node_modules exists.
- Found a partial screenshot captured before the viewport finished repainting.
  Replaced it and inspected the saved artifact; recorded actual DOM viewport
  measurements separately from the in-app browser's PNG capture dimensions.
- Container rerun failed because Docker Desktop's Linux engine was stopped.
  Kept the successful 18 October checks explicitly dated; did not claim a rerun.
- Increased small link/choice/remove touch targets to 44 px in the source.
  Full SPA and real radio interactions still require the prepared browser checks.
