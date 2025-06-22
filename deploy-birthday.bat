@echo off
title 🎂 Birthday App - GitHub Deployment

echo.
echo 🎉 ===============================================
echo    Happy Birthday Mansi - Deployment Script
echo 🎉 ===============================================
echo.

echo ⚡ Building Birthday App...
call npm run build-only
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo 📝 Staging all changes...
git add .
if %errorlevel% neq 0 (
    echo ❌ Git add failed!
    pause
    exit /b 1
)

echo 💬 Committing changes...
git commit -m "🎂 Update Birthday App - %date% %time%"
if %errorlevel% neq 0 (
    echo ⚠️ Nothing new to commit
)

echo 🚀 Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ❌ Push failed! Make sure you've set up the remote repository.
    echo.
    echo 📋 To set up a new repository, run these commands:
    echo    1. Create a new repository on GitHub named "birthday"
    echo    2. git remote add origin https://github.com/YOUR_USERNAME/birthday.git
    echo    3. git push -u origin main
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ 🎉 Deployment completed successfully! 🎉
echo.
echo 🌐 Your Birthday App will be available at:
echo    https://YOUR_USERNAME.github.io/birthday/
echo.
echo ⏱️ It may take a few minutes for changes to appear online.
echo 💖 Share this link with friends to spread birthday joy!
echo.
pause
