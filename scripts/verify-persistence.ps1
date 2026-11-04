$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
$before = docker compose exec -T db psql -U kvarta -d kvarta -t -A -c 'SELECT count(*) FROM leads'
if ($LASTEXITCODE -ne 0) { throw 'Cannot inspect local database' }
if ([int]$before.Trim() -lt 1) { throw 'Submit a synthetic local application first; an empty database is insufficient persistence evidence.' }
$snapshotQuery = "SELECT md5(coalesce(string_agg(row_to_json(leads)::text, ',' ORDER BY id), '')) FROM leads"
$snapshotBefore = docker compose exec -T db psql -U kvarta -d kvarta -t -A -c $snapshotQuery
if ($LASTEXITCODE -ne 0) { throw 'Cannot fingerprint local applications' }
docker compose down
if ($LASTEXITCODE -ne 0) { throw 'Compose down failed' }
docker compose up -d --wait
if ($LASTEXITCODE -ne 0) { throw 'Compose restart failed' }
$after = docker compose exec -T db psql -U kvarta -d kvarta -t -A -c 'SELECT count(*) FROM leads'
if ($LASTEXITCODE -ne 0 -or $before.Trim() -ne $after.Trim()) { throw 'Persistence check failed' }
$snapshotAfter = docker compose exec -T db psql -U kvarta -d kvarta -t -A -c $snapshotQuery
if ($LASTEXITCODE -ne 0 -or $snapshotBefore.Trim() -ne $snapshotAfter.Trim()) { throw 'Application contents changed across restart' }
Write-Output "PASS: $($after.Trim()) application(s) survived container recreation without deleting the named volume."
