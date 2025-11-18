# Math Learning System - Quick Deploy Script (PowerShell)
# =========================================================

Write-Host "🚀 Starting deployment..." -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "frontend") -or -not (Test-Path "backend")) {
    Write-Host "❌ Error: Must run from project root directory" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Step 1: Building Frontend" -ForegroundColor Blue
Set-Location frontend
npm install
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend built successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend build failed" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "📦 Step 2: Building Backend" -ForegroundColor Blue
Set-Location backend
npm install
npx prisma generate
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Backend built successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Backend build failed" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "🎉 Build completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Configure production environment variables"
Write-Host "2. Deploy frontend/dist to your hosting"
Write-Host "3. Deploy backend to your server"
Write-Host "4. Run database migrations: cd backend; npx prisma migrate deploy"
Write-Host "5. Seed production data: cd backend; npm run prisma:seed"
Write-Host ""
Write-Host "For detailed instructions, see DEPLOYMENT_READY.md"


