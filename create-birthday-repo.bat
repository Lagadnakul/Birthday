@echo off
title 🎂 Birthday Repository Setup - Lagadnakul

echo.
echo 🎉 =================================================
echo    BIRTHDAY APP - REPOSITORY SETUP FOR LAGADNAKUL
echo 🎉 =================================================
echo.

echo 🌐 STEP 1: Go to GitHub and create repository
echo    URL: https://github.com/new
echo    Repository name: birthday
echo    Description: 🎂 Happy Birthday Mansi! Beautiful interactive birthday surprise
echo    Visibility: Public
echo    DON'T initialize with README, .gitignore, or license
echo.
echo 📋 Repository URL will be: https://github.com/Lagadnakul/birthday
echo 🌍 Live site will be: https://lagadnakul.github.io/birthday/
echo.
echo ⏸️  Press any key after you've created the repository on GitHub...
pause >nul

echo.
echo 🔗 Adding GitHub remote...
git remote add origin https://github.com/Lagadnakul/birthday.git

echo.
echo 🚀 Pushing to GitHub...
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ❌ Push failed! Please check:
    echo    1. Repository exists: https://github.com/Lagadnakul/birthday
    echo    2. You're logged into GitHub
    echo    3. Repository is public
    echo.
    echo 🔧 Try these commands manually:
    echo    git remote add origin https://github.com/Lagadnakul/birthday.git
    echo    git push -u origin main
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ 🎉 Repository created and code pushed successfully!
echo.
echo 📋 FINAL STEP - Enable GitHub Pages:
echo    1. Go to: https://github.com/Lagadnakul/birthday/settings/pages
echo    2. Under "Source", select "GitHub Actions"
echo    3. Save the settings
echo.
echo 🌐 Your Birthday App URLs:
echo    📁 Repository: https://github.com/Lagadnakul/birthday
echo    🌍 Live Site:  https://lagadnakul.github.io/birthday/
echo.
echo 💖 Share this link with friends: https://lagadnakul.github.io/birthday/
echo.
echo 🎂 Happy Birthday Mansi! 🎉
echo.
echo Opening GitHub repository and settings pages...
start https://github.com/Lagadnakul/birthday
timeout /t 3 /nobreak >nul
start https://github.com/Lagadnakul/birthday/settings/pages
echo.
pause
