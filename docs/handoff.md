# Local handoff · 19 October 2026

Source is prepared for local continuation. The human requested handling dependency
downloads and postponing publication. No further installs, image pulls or public
deployment were performed after that instruction.

Docker Desktop's Linux engine was unavailable at the 19 October final refresh.
Earlier isolated SQL/Nginx results remain dated 18 October; they were not rerun.

## Continue locally

1. Run `./scripts/start-local.ps1` from the repository root in PowerShell. It
   downloads npm packages, generates the real lockfile, checks/builds both apps,
   then builds/starts Compose. Docker may need to download its base images.
2. Fix any actual type/build/runtime failures before calling the app verified.
   Commit `package-lock.json`; Docker/CI intentionally require it.
3. Run the prepared integration and browser checks in the README, then the
   persistence check after creating a synthetic lead. Keep synthetic evidence;
   do not commit contact details or `.env`.
4. Inspect the full page at 390, 768 and 1440 px, keyboard navigation and real
   Radix radio controls. The saved previews cover only a representative section.
5. Link results in the relevant open issues. Enable CI push/PR triggers after
   the lockfile is committed; currently checks run manually only.

## Later submission

- [ ] Public frontend/API + Neon, same-origin form and real database record.
- [ ] Absolute social-image URL and canonical URL for the final public origin.
- [ ] Mobile Lighthouse report from that same public deployment; report actual score.
- [ ] Replace provisional status/verification notes with executed results.
- [ ] Refresh visible AI-session evidence or attach genuine key screenshots.
- [ ] Send one message containing live URL, repository URL, AI log, Lighthouse,
      and the concise README. Deadline: 19 October 2026, 18:00 Minsk/Moscow.

No live URL or Lighthouse report exists yet. Hosting instructions and placeholder
Vercel routing are in [deployment.md](deployment.md). Telegram is optional and
has not been implemented.
