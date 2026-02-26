# DayPlan

DayPlan is a simple full-stack web application for organizing daily activities and tracking important tasks.

It was developed as the final project of the SEV & Athens University of Economics and Business (AUEB) training program.

The application demonstrates basic full-stack development concepts using a React frontend and a Spring Boot backend.

## Purpose

The goal of this project was to practice full-stack development:

* connecting a React frontend with a Spring Boot backend
* implementing REST API communication
* performing CRUD operations
* managing application state
* applying basic validation
* designing a simple and usable UI

## Features

* Add daily plans with title, description and due date
* Edit existing plans
* Delete plans
* Mark plans as completed
* Monthly calendar view
* Form validation (title & due date required)
* Prevention of past dates
* Loading and error feedback in UI
* Success messages after actions
* Clean and minimal UI

## Technologies Used

### Frontend
* React
* CSS
* Fetch API


### Backend
* Spring Boot
* Java
* REST API
* JPA / Hibernate
* Bean Validation

### Database
* H2 (embedded database for development)

## Project Structure
task-organizer-backend/
├─ controller
├─ service
├─ repository
└─ model

task-organizer-frontend/
├─ components
├─ App.js
└─ App.css

## Build & Run the Project Locally

### 1. Run Backend

From the backend folder:

mvnw spring-boot:run

The Spring Boot server starts at:
[http://localhost:8080](http://localhost:8080)

### 2. Install Frontend Dependencies

From the frontend folder:

npm install

### 3. Run Frontend

npm start

The application starts at:
[http://localhost:3000](http://localhost:3000)

## Deployment

The backend exposes REST endpoints for task management.  
The React frontend communicates with the backend using HTTP requests and updates the UI accordingly.

Environment variables are used for configuring the API base URL.

## Future Improvements

Planned improvements for extending the project:

* Authentication (JWT)
* Role-based access
* Persistent database (PostgreSQL/MySQL)
* Deployment to cloud environment
* Improved UI styling
* Mobile responsiveness

## Author
Final project developed as part of the SEV & AUEB training program.
