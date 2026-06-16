#!/usr/bin/env pwsh

# deploy_staging.ps1
# Builds the Flutter web app and deploys strictly to the staging alias.

Write-Host "Building Flutter Web App..." -ForegroundColor Cyan
flutter build web

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Deployment aborted." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "Deploying to Firebase Staging (hilmost-staging)..." -ForegroundColor Cyan
cd ../../
firebase deploy --only hosting:hilmost-staging

Write-Host "Staging Deployment Complete!" -ForegroundColor Green
