@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

:: CEO Prompt Assembler Launcher
:: ==============================
:: Drop this .bat in the same folder as ceo.py, or edit SCRIPT_DIR below.

echo.
echo  ============================================
echo   CEO PROMPT ASSEMBLER - WINDOWS LAUNCHER
echo  ============================================
echo.

:: --- CONFIG ---
set "SCRIPT_DIR=%~dp0"

:: --- CHECK PYTHON ---
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found in PATH.
    echo Install from https://python.org and check "Add Python to PATH"
    pause
    exit /b 1
)

echo [OK] Python detected.
python --version
echo.

:: --- MENU ---
:MENU
echo  Choose action:
echo   1. List agents
echo   2. List projects
echo   3. Build prompt (manual)
echo   4. Build prompt + copy to clipboard
echo   5. Exit
echo.
set /p choice="Enter 1-5: "

if "%choice%"=="1" goto LIST_AGENTS
if "%choice%"=="2" goto LIST_PROJECTS
if "%choice%"=="3" goto BUILD_PROMPT
if "%choice%"=="4" goto BUILD_AND_COPY
if "%choice%"=="5" goto END

echo Invalid choice.
goto MENU

:LIST_AGENTS
echo.
python "%SCRIPT_DIR%ceo.py" --list-agents
echo.
pause
goto MENU

:LIST_PROJECTS
echo.
python "%SCRIPT_DIR%ceo.py" --list-projects
echo.
pause
goto MENU

:BUILD_PROMPT
echo.
set /p task="Task: "
set /p agent="Agent: "
set /p project="Project (press Enter for general): "
if "!project!"=="" set "project=general"

echo.
python "%SCRIPT_DIR%ceo.py" -t "!task!" -a "!agent!" -p "!project!"
echo.
pause
goto MENU

:BUILD_AND_COPY
echo.
set /p task="Task: "
set /p agent="Agent: "
set /p project="Project (press Enter for general): "
if "!project!"=="" set "project=general"

echo.
python "%SCRIPT_DIR%ceo.py" -t "!task!" -a "!agent!" -p "!project!" --copy
echo.
pause
goto MENU

:END
endlocal
