#!/usr/bin/env pwsh

# deploy_prod.ps1
# Builds the Flutter web app and deploys to the production alias (hilmost.net).

Write-Host "Building Flutter Web App for Production..." -ForegroundColor Cyan
flutter build web

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Deployment aborted." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Deploying to Firebase Production (hilmost-toolbox)..." -ForegroundColor Cyan
cd ../../
firebase deploy --only hosting:hilmost-toolbox

Write-Host "Production Deployment Complete!" -ForegroundColor Green
