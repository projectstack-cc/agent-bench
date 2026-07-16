@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

:: Obsidian Scraper Launcher
:: =========================
:: Drag this .bat into the same folder as obsidian_scraper.py, or edit PATH below

echo.
echo  ============================================
echo   OBSIDIAN SCRAPER AGENT - WINDOWS LAUNCHER
echo  ============================================
echo.

:: --- CONFIGURE THESE IF NEEDED ---
set "SOURCE_DIR=C:\Users\scook\.dev"
set "VAULT_DIR=C:\Users\scook\OneDrive\Documents\Obsidian Vault"
set "SCRIPT_DIR=%~dp0"

:: --- CHECK PYTHON ---
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found in PATH.
    echo.
    echo Install Python from https://python.org
    echo During install, CHECK "Add Python to PATH"
    echo.
    pause
    exit /b 1
)

echo [OK] Python detected.
python --version
echo.

:: --- VERIFY PATHS ---
if not exist "%SOURCE_DIR%" (
    echo [ERROR] Source not found: %SOURCE_DIR%
    pause
    exit /b 1
)

echo [OK] Source:  %SOURCE_DIR%
echo [OK] Vault:   %VAULT_DIR%
echo.

:: --- MENU ---
:MENU
echo  Choose mode:
echo   1. PREVIEW  (dry run - see what would copy)
echo   2. EXECUTE  (actually copy files)
echo   3. EXIT
echo.
set /p choice="Enter 1, 2, or 3: "

if "%choice%"=="1" goto PREVIEW
if "%choice%"=="2" goto EXECUTE
if "%choice%"=="3" goto END

echo Invalid choice. Try again.
echo.
goto MENU

:PREVIEW
echo.
echo  ============================================
echo   RUNNING PREVIEW (dry run)
echo  ============================================
echo.
python "%SCRIPT_DIR%obsidian_scraper.py" --source "%SOURCE_DIR%" --vault "%VAULT_DIR%"
echo.
pause
goto END

:EXECUTE
echo.
echo  ============================================
echo   WARNING: ABOUT TO COPY FILES
echo  ============================================
echo.
echo  This will COPY .md files from:
echo    %SOURCE_DIR%
echo  To:
echo    %VAULT_DIR%
echo.
echo  Source files will NOT be modified.
echo.
set /p confirm="Type YES to proceed: "
if /I not "%confirm%"=="YES" (
    echo Cancelled.
    pause
    goto END
)

echo.
python "%SCRIPT_DIR%obsidian_scraper.py" --source "%SOURCE_DIR%" --vault "%VAULT_DIR%" --execute
echo.
pause
goto END

:END
endlocal
