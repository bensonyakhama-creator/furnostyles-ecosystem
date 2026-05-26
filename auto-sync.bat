@echo off
cd /d "C:\Users\Administrator\Desktop\FURNOSTYLES WEBSITE ECOSYSTEM"

echo Checking changes...
git status

echo Adding files...
git add .

echo Committing changes...
git commit -m "Auto website update"

echo Pushing to GitHub...
git push

echo Done. Cloudflare will deploy automatically.
pause
