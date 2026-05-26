# Auto-sync script for Furnostyles Ecosystem
# Watches for file changes and automatically commits/pushes to GitHub

$watchPath = "c:\Users\Administrator\Desktop\FURNOSTYLES WEBSITE ECOSYSTEM"
$gitPath = "git"

Write-Host "Starting auto-sync for Furnostyles Ecosystem..." -ForegroundColor Green
Write-Host "Watching: $watchPath" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow

# Function to check and sync changes
function Sync-Changes {
    $status = & $gitPath -C $watchPath status --porcelain
    
    if ($status) {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Changes detected, syncing..." -ForegroundColor Yellow
        
        # Add all changes
        & $gitPath -C $watchPath add -A 2>&1 | Out-Null
        
        # Commit with timestamp
        $commitMsg = "Auto-sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        & $gitPath -C $watchPath commit -m $commitMsg 2>&1 | Out-Null
        
        # Push to GitHub
        & $gitPath -C $watchPath push origin main 2>&1 | Out-Null
        
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Synced successfully!" -ForegroundColor Green
    }
}

# Initial sync
Sync-Changes

# Watch for changes every 30 seconds
while ($true) {
    Start-Sleep -Seconds 30
    Sync-Changes
}
