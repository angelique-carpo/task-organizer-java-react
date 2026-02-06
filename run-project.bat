@echo off
echo Starting Task Organizer project...

echo.
echo Starting BACKEND...
start cmd /k "cd task-organizer-backend && mvnw spring-boot:run"

echo.
echo Starting FRONTEND...
start cmd /k "cd task-organizer-backend/task-organizer-frontend && npm start"

echo.
echo Project started!
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000