# Кварта · GitHub delivery runbook

## Canonical context

- Repository: `ksayron/COFFEE_SHOP`, https://github.com/ksayron/COFFEE_SHOP
- Workspace: `D:\Projects\COFFEE_LANDING`; default branch: `main`.
- React/TypeScript/Vite + Radix Primitives; Nginx SPA and API proxy;
  Next.js Node Route Handlers + PostgreSQL through `pg`.
- One Docker Compose locally. Public portfolio demo: Vercel SPA/API projects + Neon.
- Approved design: neighbourhood workshop; Florets + Jolene; Zerno atmosphere only.
- Deadline: 19 October 2026, 18:00 Minsk/Moscow.

Use explicit `-R ksayron/COFFEE_SHOP` on every GitHub command supporting it.
For `gh api`, use `repos/ksayron/COFFEE_SHOP/...`; never another repository or board.
There is no project board. Milestones track phases. Branch protection is not
asserted; verify settings before claiming it.

## Labels and milestones

Every issue has one status, one priority, one type, and relevant scopes.

- Status: `status:todo`, `status:in-progress`, `status:review`, `status:done`.
- Priority: `priority:p0` required, `priority:p1` quality, `priority:p2` optional.
- Type: `type:feature`, `type:docs`, `type:spike`, `type:bug`, `type:tech-debt`.
- Scope: `scope:frontend`, `scope:backend`, `scope:infrastructure`, `scope:design`,
  `scope:qa`, `scope:docs`.
- Optional `blocked` flag requires a comment naming the external condition.

Phases: M0 Delivery setup; M1 Runnable foundation; M2 Visual direction;
M3 Landing and leads; M4 Verification; M5 Submission.

## Issue body

Use Summary (outcome), Current state (verified), Deliverables, Acceptance criteria
(observable), Dependencies (actual issue links), Relevant documentation, Explicit exclusions.
Do not invent dependency numbers, test results, asset rights or completion evidence.

## Workflow

1. Establish `main` with one bootstrap documentation commit.
2. Thereafter use short-lived `feat/<issue>-<slug>`, `fix/<issue>-<slug>`, or
   `docs/<issue>-<slug>` branches from current `main`.
3. Set `status:in-progress`, removing other status labels.
4. Make incremental commits; record actual AI decisions/corrections in `docs/ai-log.md`.
5. Open a PR describing behaviour, checks and limits, with `Closes #<issue>`.
6. Attach every created PR to the Codex chat; set issue `status:review`.
7. Link acceptance evidence before merge/closure. Only then set `status:done`.
8. Externally blocked acceptance stays open with an honest explanation.

Current handoff exception: the human deferred public deployment and requested
handling dependency downloads themselves. Keep the dependent implementation as
incremental phase commits in one draft integration PR while runtime verification
is unavailable. Do not merge/close those issues or claim a lockfile/build result.
Automatic CI is temporarily manual-only until the human-generated lockfile is
committed. Re-enable push/PR checks after the first successful install.

Required checks: types/build; PostgreSQL integration for concurrent rolling-window
deduplication; browser form states and attribution; 390/768/1440 screenshots;
Compose persistence; actual public form record; public mobile Lighthouse.
See `docs/verification.md`. Do not close an issue merely because code exists.

```powershell
gh repo view ksayron/COFFEE_SHOP
gh issue list -R ksayron/COFFEE_SHOP --state all --limit 100
gh issue edit -R ksayron/COFFEE_SHOP 1 --add-label 'status:in-progress' --remove-label 'status:todo'
gh pr create -R ksayron/COFFEE_SHOP --base main --head docs/1-setup --title 'Document setup' --body-file .local/pr.md
```

Use UTF-8 body files for multiline issues/PRs/comments. Never commit credentials,
database URLs or full leads. `.env*` and `.local/` are ignored. No board reuse,
cart, payments, admin UI, invented reviews/contacts or unlicensed photography.
