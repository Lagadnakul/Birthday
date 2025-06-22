@echo off
echo 🎉 Building Birthday App...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo ✅ Build successful!
echo 🚀 Starting preview server...
call npm run preview

pause
