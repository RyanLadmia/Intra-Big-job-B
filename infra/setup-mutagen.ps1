# Mutagen setup script for backend container
Write-Host "Setting up Mutagen synchronization for backend container..." -ForegroundColor Cyan

# Check if Mutagen is installed
try {
    $mutagenVersion = (mutagen version)
    Write-Host "Mutagen found: $mutagenVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Mutagen not found. Please install Mutagen 0.18.1 from https://mutagen.io/" -ForegroundColor Red
    exit 1
}

# Stop any existing synchronization
Write-Host "Terminating any existing backend synchronization..." -ForegroundColor Yellow
mutagen sync terminate backend-sync 2>$null

# Restart Docker containers
Write-Host "Restarting Docker containers..." -ForegroundColor Yellow
docker-compose down
docker-compose up -d

# Wait for backend container to be ready
Write-Host "Waiting for backend container to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check if backend container is running
$backendContainer = docker ps --filter "name=infra-backend-1" --format "{{.Names}}"
if ([string]::IsNullOrEmpty($backendContainer)) {
    Write-Host "ERROR: Backend container 'infra-backend-1' not found. Check your Docker setup." -ForegroundColor Red
    exit 1
}

Write-Host "Backend container '$backendContainer' is running." -ForegroundColor Green

# Start Mutagen synchronization
$projectDir = (Get-Item $PSScriptRoot).Parent.FullName
$backendDir = Join-Path $projectDir "backend"

Write-Host "Starting Mutagen synchronization..." -ForegroundColor Green
mutagen sync create --name=backend-sync `
    --default-file-mode=0644 `
    --default-directory-mode=0755 `
    --symlink-mode=portable `
    --ignore=/vendor `
    --ignore=/var `
    --ignore=/config/jwt `
    --ignore=/.git `
    --ignore=/.idea `
    --ignore=/.vscode `
    --ignore=/.env.local `
    --ignore="**/*.log" `
    $backendDir "docker://infra-backend-1/var/www/symfony"

# Check status
Write-Host "Checking synchronization status..." -ForegroundColor Cyan
Start-Sleep -Seconds 2
mutagen sync list

Write-Host "`nSetup Complete!" -ForegroundColor Green
Write-Host "Your backend files should now be synchronizing with the container." -ForegroundColor Green
Write-Host "For more information on managing Mutagen, see the MUTAGEN_README.md" -ForegroundColor Cyan 