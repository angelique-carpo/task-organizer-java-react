# DayPlan

A simple web application for planning daily activities and tracking important tasks.

Built as the final project of the SEV & Athens University of Economics and Business (AUEB) training program.

## Purpose

The goal of this project was to practice full-stack development:

* connecting a React frontend with a Spring Boot backend
* implementing REST API communication
* performing CRUD operations
* managing application state
* designing a simple and usable UI

## Features

* Add daily plans with title, description and due date
* Edit existing plans
* Delete plans
* Mark plans as completed
* Monthly calendar view
* Clean and minimal UI

## Technologies Used

### Frontend
* React
* CSS


### Backend
* Spring Boot
* Java
* REST API
* JPA / Hibernate

### Database
* H2 (embedded)

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

1. Run Backend

From the backend folder:

mvnw spring-boot:run

The Spring Boot server starts at:
[http://localhost:8080](http://localhost:8080)

2. Install Frontend Dependencies

From the frontend folder:

npm install

3. Run Frontend

npm start

The application starts at:
[http://localhost:3000](http://localhost:3000)

## Deployment

This project runs locally using:

* Spring Boot backend server
* React development server

The backend provides REST endpoints and the frontend consumes them via HTTP requests.

## Future Improvements

Planned improvements for next iterations:

* Backend validation for fields (title, description, dates)
*  Global error handling
* Separation of React components (TaskList, TaskItem, TaskForm)
* Environment variables for API URLs
* Loading and error states in UI
* Authentication (JWT)
* Deployment to cloud environment

## Author
Final project developed as part of the SEV & AUEB training program.
