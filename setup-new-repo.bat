@echo off
title 🎂 Birthday App - New Repository Setup

echo.
echo 🎉 ===================================================
echo    BIRTHDAY APP - NEW GITHUB REPOSITORY SETUP
echo 🎉 ===================================================
echo.
echo 📋 FOLLOW THESE STEPS TO CREATE YOUR NEW REPOSITORY:
echo.
echo 🌐 STEP 1: Create New Repository on GitHub
echo    1. Go to: https://github.com/new
echo    2. Repository name: birthday
echo    3. Description: 🎂 Happy Birthday Mansi! Beautiful interactive birthday surprise with 3D animations
echo    4. Set to Public (so friends can access it)
echo    5. DO NOT initialize with README, .gitignore, or license (we have those already)
echo    6. Click "Create repository"
echo.
echo 🔗 STEP 2: Copy the repository URL
echo    After creating, GitHub will show you a URL like:
echo    https://github.com/YOUR_USERNAME/birthday.git
echo.
echo ⚠️  STEP 3: Come back here and run the next command
echo    Press any key when you've created the repository...
pause >nul

echo.
echo 📝 Enter your GitHub username:
set /p USERNAME="GitHub Username: "

echo.
echo 🔗 Setting up remote repository...
git remote add origin https://github.com/%USERNAME%/birthday.git

echo.
echo 🚀 Pushing to GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ❌ Push failed! This might happen if:
    echo    1. Repository doesn't exist yet
    echo    2. Wrong username
    echo    3. Authentication issues
    echo.
    echo 🔧 Manual setup commands:
    echo    git remote add origin https://github.com/%USERNAME%/birthday.git
    echo    git push -u origin main
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ 🎉 SUCCESS! Repository created and code pushed!
echo.
echo 🌐 Your Birthday App URLs:
echo    📁 Repository: https://github.com/%USERNAME%/birthday
echo    🌍 Live Site:  https://%USERNAME%.github.io/birthday/
echo.
echo 📋 FINAL STEPS:
echo    1. Go to: https://github.com/%USERNAME%/birthday/settings/pages
echo    2. Under "Source", select "GitHub Actions"
echo    3. The site will be live in 2-5 minutes!
echo.
echo 💖 Share this link with friends:
echo    https://%USERNAME%.github.io/birthday/
echo.
echo 🎂 Happy Birthday Mansi! 🎉
pause
