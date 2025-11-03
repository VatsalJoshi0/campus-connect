@echo off
REM Event Networking App - Deployment Script for Windows
REM This script automates the deployment process

echo.
echo ========================================
echo   Event Networking App Deployment
echo ========================================
echo.

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)
echo [OK] Node.js is installed

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    pause
    exit /b 1
)
echo [OK] npm is installed

echo.
echo [INFO] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed successfully

echo.
echo [INFO] Running tests...
call npm test -- --passWithNoTests
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Tests failed or not configured
)

echo.
echo [INFO] Building application for production...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)
echo [OK] Build completed successfully

REM Create deployment info
echo. > build\deployment-info.txt
echo Deployment Date: %date% %time% >> build\deployment-info.txt
echo Version: 1.0.0 >> build\deployment-info.txt
echo Environment: production >> build\deployment-info.txt

echo [OK] Deployment info created

echo.
echo ========================================
echo   Select Deployment Target
echo ========================================
echo.
echo 1) GitHub Pages
echo 2) Netlify (manual)
echo 3) Vercel (manual)
echo 4) Local test (serve build folder)
echo 5) Skip deployment
echo.
set /p choice="Enter choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo [INFO] Deploying to GitHub Pages...
    call npm run deploy
    if %ERRORLEVEL% EQU 0 (
        echo [OK] Deployed to GitHub Pages successfully
    ) else (
        echo [ERROR] GitHub Pages deployment failed
    )
) else if "%choice%"=="2" (
    echo.
    echo [INFO] For Netlify deployment:
    echo 1. Install Netlify CLI: npm install -g netlify-cli
    echo 2. Run: netlify deploy --prod --dir=build
) else if "%choice%"=="3" (
    echo.
    echo [INFO] For Vercel deployment:
    echo 1. Install Vercel CLI: npm install -g vercel
    echo 2. Run: vercel --prod
) else if "%choice%"=="4" (
    echo.
    echo [INFO] Starting local server on port 5000...
    echo Press Ctrl+C to stop the server
    call npx serve -s build -p 5000
) else if "%choice%"=="5" (
    echo.
    echo [INFO] Skipping deployment
) else (
    echo.
    echo [ERROR] Invalid choice
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo [OK] Build folder is ready at: .\build
echo [INFO] You can deploy the build folder to any static hosting service
echo.

REM Create deployment checklist
(
echo ========================================
echo   Pre-Deployment Checklist
echo ========================================
echo.
echo [OK] Dependencies installed
echo [OK] Build completed successfully
echo [OK] Deployment info created
echo.
echo ========================================
echo   Next Steps
echo ========================================
echo.
echo 1. Test the build locally: npx serve -s build
echo 2. Configure environment variables on hosting platform
echo 3. Set up custom domain (if needed^)
echo 4. Configure SSL certificate
echo 5. Set up analytics tracking
echo 6. Configure error monitoring
echo 7. Set up CI/CD pipeline (optional^)
echo.
echo ========================================
echo   Important URLs
echo ========================================
echo.
echo Development: http://localhost:3000/campus-connect
echo Production: [Your production URL]
echo.
echo ========================================
echo   Hosting Options
echo ========================================
echo.
echo - GitHub Pages: https://pages.github.com/
echo - Netlify: https://www.netlify.com/
echo - Vercel: https://vercel.com/
echo - AWS S3: https://aws.amazon.com/s3/
echo - Firebase: https://firebase.google.com/docs/hosting
echo.
) > DEPLOYMENT_CHECKLIST.txt

echo [OK] Deployment checklist created: DEPLOYMENT_CHECKLIST.txt
echo.
pause
