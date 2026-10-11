@echo off
title StepSnap - Free Scribe Alternative
cd /d "%~dp0"

:: Ensure Node.js is in PATH if not already present
where node >nul 2>nul
if %errorlevel% neq 0 (
    set "PATH=C:\Users\Natasha Khandar\nodejs;C:\Users\Natasha Khandar\AppData\Roaming\npm;%PATH%"
)

cls
echo ============================================================
echo           StepSnap -- Free Scribe Alternative
echo ============================================================
echo.
echo   [1/2] Launching server on http://localhost:3000 ...
echo   [2/2] Opening default browser ...
echo.
echo   Press Ctrl+C anytime to stop the server.
echo ============================================================
echo.

:: Open browser after 2 seconds in background
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"

:: Start the Next.js development server
npm run dev

pause