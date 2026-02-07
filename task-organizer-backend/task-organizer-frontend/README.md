# DayPlan

A simple web application for planning daily activities and tracking important tasks.
Built as the final project of the SEV & Athens University of Economics and Business (AUEB) training program.

## Purpose

The goal of this project was to practice full-stack development:
-connect React frontend with Spring Boot backend
-implement REST API communication
-perform CRUD operations
-manage application state
-design a simple and usable UI

## Features

-Add daily plans with title, description and due date
-Edit existing plans
-Delete plans
-Mark plans as completed
-Monthly calendar view
-Clean and minimal UI

## Technologies Used

### Frontend
-React
-CSS

### Backend
-Spring Boot
-Java
-REST API
-JPA / Hibernate

### Database
-H2 (embedded)

## Project Structure
task-organizer-backend/
-> controller
-> service
-> repository
-> model

task-organizer-frontend/
-> components
-> App.js
-> App.css

## Available Scripts

In the project directory, you can run:

### `Run backend`

From the backend folder:
_mvnw spring-boot:run_
Runs the Spring Boot server in development mode.
Open http://localhost:8080 to access the API.

The server will restart automatically when changes are made.

### `npm install`

From the frontend folder:
_npm install_
Installs the required dependencies for the React application.

### `npm start`

From the frontend folder:
_npm start_
Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload when you make changes.
