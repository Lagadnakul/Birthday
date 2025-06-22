@echo off
echo 🎉 Mansi's Birthday App - Quick Actions 🎉
echo =========================================
echo.
echo Choose an action:
echo 1. Open Live Site (GitHub Pages)
echo 2. Open Local Development
echo 3. Test Page (Deployment verification)
echo 4. Build for Production
echo 5. Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo Opening live site...
    start "" "https://lagadnakul.github.io/Birthday/"
) else if "%choice%"=="2" (
    echo Opening local development...
    start "" "http://localhost:5173"
) else if "%choice%"=="3" (
    echo Opening test page...
    start "" "https://lagadnakul.github.io/Birthday/test.html"
) else if "%choice%"=="4" (
    echo Building for production...
    npm run build
    echo Build complete! Check dist/ folder
    pause
) else if "%choice%"=="5" (
    echo Goodbye! 👋
    exit
) else (
    echo Invalid choice!
    pause
    goto start
)

echo.
echo 🎂 Happy Birthday Mansi! 💖
pause
