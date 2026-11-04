# Run manually when dependency downloads are available. Not executed by Codex.
$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
if (-not (Test-Path -LiteralPath 'package-lock.json')) {
  npm install
  if ($LASTEXITCODE -ne 0) { throw 'npm install failed. Fix the download and retry; no lockfile was fabricated.' }
} else {
  npm ci
  if ($LASTEXITCODE -ne 0) { throw 'npm ci failed' }
}
if (-not (Test-Path -LiteralPath '.env')) {
  $bytes = New-Object byte[] 24
  [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
  $password = ([BitConverter]::ToString($bytes)).Replace('-', '').ToLowerInvariant()
  "POSTGRES_PASSWORD=$password`nPORT=8080" | Set-Content -LiteralPath '.env' -Encoding utf8
}
$env:NEXT_TELEMETRY_DISABLED='1'
npm test
if ($LASTEXITCODE -ne 0) { throw 'Shared validation tests failed' }
npm run typecheck
if ($LASTEXITCODE -ne 0) { throw 'Typecheck failed' }
npm run build
if ($LASTEXITCODE -ne 0) { throw 'Production build failed' }
docker compose up --build -d --wait
if ($LASTEXITCODE -ne 0) { throw 'Compose did not become healthy; inspect docker compose logs' }
Write-Output 'Open http://localhost:8080. Commit the generated package-lock.json after checking it.'
