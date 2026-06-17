@echo off
setlocal

cd /d "%~dp0"

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo npm.cmd was not found. Install Node.js first.
  pause
  exit /b 1
)

if not exist node_modules (
  echo node_modules was not found.
  echo Run npm install first, then run this file again.
  pause
  exit /b 1
)

echo Starting Feiya Studio local site...
echo URL: http://127.0.0.1:5173/
echo.

start "" "http://127.0.0.1:5173/"
call npm.cmd run dev -- --host 127.0.0.1 --port 5173

pause
