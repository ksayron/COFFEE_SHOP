$ErrorActionPreference = 'Stop'
$repo = 'ksayron/COFFEE_SHOP'
New-Item -ItemType Directory -Force .local | Out-Null
function GhJson($path, $data) {
  $file = Join-Path (Get-Location) '.local/gh-payload.json'
  $data | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath $file -Encoding utf8
  $result = gh api $path --method POST --input $file
  if ($LASTEXITCODE -ne 0) { throw "GitHub failed: $path" }
  return ($result | ConvertFrom-Json)
}
$existingLabels = gh label list -R $repo --limit 100 --json name | ConvertFrom-Json
if ($LASTEXITCODE -ne 0) { throw 'Cannot inspect labels' }
$groups = @{
  status = @('todo','in-progress','review','done')
  priority = @('p0','p1','p2')
  type = @('feature','docs','spike','bug','tech-debt')
  scope = @('frontend','backend','infrastructure','design','qa','docs')
}
foreach ($group in $groups.Keys) {
  foreach ($value in $groups[$group]) {
    $label = "${group}:$value"
    if ($label -notin $existingLabels.name) {
      gh label create -R $repo $label --color '356457' --description "$group / $value" --force
      if ($LASTEXITCODE -ne 0) { throw "Label failed: $label" }
    }
  }
}
$phases = @('M0 — Delivery setup','M1 — Runnable foundation','M2 — Visual direction','M3 — Landing and leads','M4 — Verification','M5 — Submission')
$milestones = @(gh api "repos/$repo/milestones?state=all" | ConvertFrom-Json)
foreach ($phase in $phases) {
  if ($phase -notin $milestones.title) {
    $milestones += GhJson "repos/$repo/milestones" @{title=$phase; due_on='2026-10-19T15:00:00Z'}
  }
}
$items = @(
  @{phase=0; title='Adapt GitHub runbook and initialise repository'; type='docs'; scope='docs'; deps=@(); acceptance='Project-specific runbook and bootstrap main exist; all ten linked issues have status, priority, type, scope and milestone; no unrelated board references.'; deliver='Runbook, roadmap, milestones, labels and incremental PR workflow.'},
  @{phase=1; title='Bootstrap React SPA, Next API and shared validation'; type='feature'; scope='infrastructure'; deps=@(0); acceptance='npm ci, shared validation tests, typecheck and both production builds pass; health endpoint responds.'; deliver='Pinned workspace packages, lockfile, API health, shared schema and CI.'},
  @{phase=1; title='Package Nginx, API and PostgreSQL in Compose'; type='feature'; scope='infrastructure'; deps=@(1); acceptance='One documented command starts all services and migrations; only Nginx public; persisted leads survive restart.'; deliver='Dockerfiles, Compose health dependencies, migrations, persistent volume and run instructions.'},
  @{phase=1; title='Establish Vercel and Neon deployment'; type='feature'; scope='infrastructure'; deps=@(1); acceptance='Public SPA loads; same-origin API call reaches a real persistent database; deployment settings and nginx exception documented.'; deliver='Separate Vercel SPA/API projects, external rewrite, Neon connection and verified live URL.'},
  @{phase=2; title='Document references, copy and image provenance'; type='docs'; scope='design'; deps=@(0); acceptance='Approved sources and all client facts recorded; delivered assets have original/generated/licensed provenance; no borrowed founder identities or contacts.'; deliver='Design direction, Russian copy, source/provenance register and optimised imagery.'},
  @{phase=2; title='Compare two representative previews'; type='spike'; scope='design'; deps=@(1,4); acceptance='Both treatments show the same hero, product and application action at mobile and desktop; inspected evidence and composition choice recorded.'; deliver='Two small previews, viewport screenshots and rationale within the approved reference direction.'},
  @{phase=3; title='Build responsive landing and enquiry flow'; type='feature'; scope='frontend'; deps=@(5); acceptance='All supplied products, prices, founders, freshness, delivery and pickup present; actions preselect interest/product; usable form pending, inline validation, success and recoverable failure.'; deliver='Custom responsive React landing with Radix controls, metadata and social image.'},
  @{phase=3; title='Implement persistent leads, attribution and deduplication'; type='feature'; scope='backend'; deps=@(1,2); acceptance='201 new, 200 duplicate, 400 invalid, 503 unavailable; concurrent per-phone rolling 10-minute dedup works across API instances; first attribution saved with committed lead; integration checks pass.'; deliver='POST /api/lead, bounded inputs, parameterised SQL, transaction advisory lock, first-touch capture and inspection SQL.'},
  @{phase=4; title='Verify browser behaviour, accessibility and public deployment'; type='feature'; scope='qa'; deps=@(2,3,6,7); acceptance='390/768/1440 screenshots and no overflow; keyboard/reduced motion; real public form record; retries, reload attribution and storage failure verified with retained inputs.'; deliver='Repeatable integration/browser checks and evidence with explicit coverage limits.'},
  @{phase=5; title='Capture Lighthouse and assemble honest handoff'; type='docs'; scope='docs'; deps=@(8); acceptance='Live URL, repo, authentic AI evidence and public mobile Lighthouse ready; concise README explains ownership, actual corrections, choices, assumptions and unfinished work.'; deliver='Lighthouse report, screenshots, handoff message and final README; actual scores reported, 90+ performance target.'}
)
$issues = @(gh issue list -R $repo --state all --limit 100 --json number,title,url | ConvertFrom-Json)
$created = @()
foreach ($item in $items) {
  $issue = $issues | Where-Object title -eq $item.title | Select-Object -First 1
  if (-not $issue) {
    $deps = if ($item.deps.Count) { ($item.deps | ForEach-Object { '- #' + $created[$_].number + ' ' + $created[$_].url }) -join "`n" } else { 'None.' }
    $body = @"
## Summary
$($item.title) for the fictional Kvarta roastery assignment.

## Current state
Bootstrap documentation exists on main. No application or acceptance checks existed when this backlog was created.

## Deliverables
$($item.deliver)

## Acceptance criteria
$($item.acceptance)

## Dependencies
$deps

## Relevant documentation
- [Approved brief](https://github.com/$repo/blob/main/docs/brief.md)
- [Workflow](https://github.com/$repo/blob/main/github.md)
- [Verification](https://github.com/$repo/blob/main/docs/verification.md)

## Explicit exclusions
No cart, payment, admin, fabricated business contacts, unlicensed reference photographs or heavy animation. Telegram deferred. Do not claim unchecked acceptance.
"@
    $milestone = $milestones | Where-Object title -eq $phases[$item.phase] | Select-Object -First 1
    $issue = GhJson "repos/$repo/issues" @{title=$item.title; body=$body; milestone=$milestone.number; labels=@('status:todo','priority:p0',"type:$($item.type)","scope:$($item.scope)")}
  }
  $created += $issue
  Write-Output "#$($issue.number) $($item.title)"
}
$created | Select-Object number,title,url,html_url | ConvertTo-Json | Set-Content .local/backlog.json -Encoding utf8
$lines = @('', '## GitHub backlog', '')
foreach ($issue in $created) {
  $url = if ($issue.html_url) { $issue.html_url } else { $issue.url }
  $lines += "- [#$($issue.number) $($issue.title)]($url)"
}
Add-Content docs/roadmap.md ($lines -join "`n") -Encoding utf8
