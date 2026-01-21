
Write-Host "Installing skills to Antigravity Global Directory..."

$sourcePath = Join-Path $PSScriptRoot "skills"
$destPath = Join-Path $env:USERPROFILE ".gemini\antigravity"

if (-not (Test-Path $sourcePath)) {
    Write-Error "Skills folder not found in current directory: $sourcePath"
    exit 1
}

if (-not (Test-Path $destPath)) {
    New-Item -ItemType Directory -Force -Path $destPath | Out-Null
}

try {
    Copy-Item -Path $sourcePath -Destination $destPath -Recurse -Force
    Write-Host "Successfully installed skills to: $destPath"
    Write-Host "You can now use these skills on this computer."
}
catch {
    Write-Error "Failed to install skills. Error: $_"
}
