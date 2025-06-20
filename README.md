# Fitness Microservice Spring Boot Application

## Overview

This project is a **microservices-based fitness tracking application** built using Spring Boot, React, RabbitMQ, and Keycloak for authentication. The system is designed with several independent services to handle user management, activity tracking, AI-powered fitness recommendations, and configuration management. It also includes API Gateway and Service Discovery for robust and scalable deployment.

---

## Architecture

**Main Components:**

- **User Service:** Manages user data and validation.
- **Activity Service:** Handles tracking and management of user fitness activities. Publishes activity data to RabbitMQ.
- **AI Service:** Consumes activity data from RabbitMQ, analyzes it using AI (Gemini API), and generates recommendations, suggestions, and safety guidelines for users.
- **Config Server:** Centralized configuration management for all microservices.
- **Eureka Server:** Service discovery for dynamic registration and lookup of microservices.
- **Frontend:** React-based SPA for user interaction, authentication, and display of activity data and AI recommendations.

**Supporting Technologies:**

- **RabbitMQ:** Message broker for asynchronous communication between Activity Service and AI Service.
- **Keycloak:** Open-source identity and access management for authentication and authorization.
- **Gemini API:** Used by AI Service for generating fitness recommendations.

---

## Features

- **User Authentication and Authorization** using OAuth2 via Keycloak.
- **Activity Tracking:** Log and manage fitness activities (type, duration, calories, etc.).
- **AI-Driven Recommendations:** Receive personalized analyses, improvements, and safety tips for logged activities.
- **Service Discovery** via Eureka.
- **Centralized Configuration** via Spring Cloud Config.
- **Frontend SPA:** Responsive React app with protected routes, login/logout, activity forms, and detailed feedback.

---

## Microservices Details

### 1. User Service
Handles user data, authentication integration, and user validation.

### 2. Activity Service
- Receives activity logs from users.
- Validates users.
- Saves activity data.
- Publishes activity to RabbitMQ for AI processing.

### 3. AI Service
- Subscribes to RabbitMQ activity queue.
- Generates analysis and recommendations using Gemini API.
- Returns structured feedback (analysis, improvements, suggestions, safety guidelines).

### 4. Config Server
- Centralizes configuration for all services.

### 5. Eureka Server
- Registers and discovers all services.

### 6. Frontend (React)
- Authenticates with Keycloak.
- Allows users to log and view activities.
- Displays AI-generated recommendations per activity.

---

## Local Development & Running

### Prerequisites

- Java 17+
- Node.js and npm (for frontend)
- Docker

### Running Keycloak (Authentication Server)

```sh
docker run -p 8080:8080 \
  -e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
  -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:26.2.5 start-dev
```

> See full Keycloak Docker guide: [Keycloak Getting Started](https://www.keycloak.org/getting-started/getting-started-docker)

### Running RabbitMQ (Message Broker)

```sh
docker run -it --rm --name rabbitmq \
  -p 5672:5672 -p 15672:15672 \
  rabbitmq:4-management
```
- Management UI: http://localhost:15672 (default user/pass: guest/guest)

### Starting the Microservices

1. **Config Server**  
   `cd configserver`  
   `./mvnw spring-boot:run`

2. **Eureka Server**  
   `cd eureka`  
   `./mvnw spring-boot:run`

3. **User Service**  
   `cd userservice`  
   `./mvnw spring-boot:run`

4. **Activity Service**  
   `cd activityservice`  
   `./mvnw spring-boot:run`

5. **AI Service**  
   `cd aiservice`  
   `./mvnw spring-boot:run`

6. **Frontend**  
   `cd fitness-app-frontend`  
   `npm install`  
   `npm start`

> Ensure all services point to correct config server and Eureka server URLs in their configs.

---

## Configuration

- **Environment variables** and `application.yml` files are used for all service configurations.  
- Update Gemini API URL/Key in AI Service configs.
- Configure RabbitMQ connection for Activity & AI Services.
- Set Keycloak client/realm in User Service and Frontend.

---

## Key Endpoints

- **Frontend:** http://localhost:3000/
- **Keycloak:** http://localhost:8080/
- **RabbitMQ UI:** http://localhost:15672/
- **Eureka Dashboard:** http://localhost:8761/

---

## Example API Flow

1. **User logs in** (via Keycloak in Frontend)
2. **User logs activity** (sent to Activity Service)
3. **Activity Service** validates user and saves activity, then publishes to RabbitMQ.
4. **AI Service** consumes activity, analyzes it with Gemini, and stores recommendation.
5. **Frontend** fetches and displays analysis, improvements, suggestions, safety.

---

## Project Structure

```
Fitness_Microservice_sb/
├── activityservice/
├── aiservice/
├── configserver/
├── eureka/
├── userservice/
├── fitness-app-frontend/
```

---

## Frontend UX

- **Login/Logout** with Keycloak.
- **Activity Form** for adding activities.
- **Activity List** shows all logged activities.
- **Activity Detail** displays AI-powered recommendations, improvements, and safety tips.

---

## Contributing

1. Fork the repository.
2. Make changes in a feature branch.
3. Submit a PR with clear description.

---

## License

[MIT License](LICENSE)

---

## Credits

- Spring Boot, Spring Cloud
- React
- Keycloak
- RabbitMQ
- Gemini API

---
