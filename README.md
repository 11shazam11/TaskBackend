# WEBALAR Backend

## Project Overview

This is the backend for the WEBALAR task management application. It provides APIs for user authentication, task management, and logging.

## Technologies Used

*   Node.js
*   Express.js
*   MongoDB (or the database used)
*   JWT (JSON Web Tokens) for authentication
*   Socket.IO (for real-time updates)

## Setup Instructions

### Prerequisites

*   Node.js and npm (Node Package Manager) installed
*   MongoDB (or the database used) installed and running

### Dependencies

1.  Navigate to the `Backend` directory in your terminal.
2.  Run `npm install` to install the required dependencies.

### Environment Variables

Create a `.env` file in the `Backend` directory with the following variables:

```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

*   `PORT`: The port the server will listen on (e.g., 3000).
*   `MONGODB_URI`: The connection string for your MongoDB database.
*   `JWT_SECRET`: A secret key for signing JWTs.

## API Documentation

### Authentication

*   **POST `/api/user/register`**: Registers a new user.
    *   Request Body:
        ```json
        {
          "name": "username",
          "email": "user@example.com",
          "password": "password"
        }
        ```
    *   Response (Success - 201 Created):
        ```json
        {
          "success": true,
          "message": "User registered successfully",
          "token": "your_jwt_token"
        }
        ```
    *   Response (Error - 400 Bad Request):
        ```json
        {
          "success": false,
          "message": "Error message"
        }
        ```
*   **POST `/api/user/login`**: Logs in an existing user.
    *   Request Body:
        ```json
        {
          "email": "user@example.com",
          "password": "password"
        }
        ```
    *   Response (Success - 200 OK):
        ```json
        {
          "success": true,
          "message": "Login successful",
          "token": "your_jwt_token"
        }
        ```
    *   Response (Error - 401 Unauthorized):
        ```json
        {
          "success": false,
          "message": "Invalid credentials"
        }
        ```

### Tasks

*   **GET `/api/task/alltasks`**: Retrieves all tasks for the authenticated user.
    *   Authentication: Requires a valid JWT in the `Authorization` header (e.g., `Bearer your_jwt_token`).
    *   Response (Success - 200 OK):
        ```json
        {
          "success": true,
          "data": [
            {
              "_id": "task_id",
              "title": "Task title",
              "description": "Task description",
              "status": "todo" | "ongoing" | "completed",
              "assignedTo": "user_id"
            }
          ]
        }
        ```
    *   Response (Error - 401 Unauthorized):
        ```json
        {
          "success": false,
          "message": "Unauthorized"
        }
        ```
*   **PUT `/api/task/update/:taskId`**: Updates the status of a task.
    *   Authentication: Requires a valid JWT in the `Authorization` header.
    *   Request Body:
        ```json
        {
          "taskId": "task_id",
          "newStatus": "todo" | "ongoing" | "completed"
        }
        ```
    *   Response (Success - 200 OK):
        ```json
        {
          "success": true,
          "message": "Task status updated successfully",
          "data": {
            "_id": "task_id",
            "title": "Task title",
            "description": "Task description",
            "status": "todo" | "ongoing" | "completed",
            "assignedTo": "user_id"
          }
        }
        ```
    *   Response (Error - 400 Bad Request):
        ```json
        {
          "success": false,
          "message": "Error message"
        }
        ```
*   **GET `/api/task/logs`**: Retrieves task logs.
    *   Authentication: Requires a valid JWT in the `Authorization` header.
    *   Response (Success - 200 OK):
        ```json
        {
          "success": true,
          "data": [
            {
              "_id": "log_id",
              "taskTitle": "Task title",
              "userName": "user name",
              "oldStatus": "old status",
              "newStatus": "new status",
              "timestamp": "timestamp"
            }
          ]
        }
        ```
    *   Response (Error - 401 Unauthorized):
        ```json
        {
          "success": false,
          "message": "Unauthorized"
        }
        ```

## Database Schema (MongoDB)

*   **Users Collection:**
    *   `_id`: (ObjectId) - Unique user identifier.
    *   `name`: (String) - User's username.
    *   `email`: (String) - User's email address.
    *   `password`: (String) - Hashed user password.
*   **Tasks Collection:**
    *   `_id`: (ObjectId) - Unique task identifier.
    *   `title`: (String) - Task title.
    *   `description`: (String) - Task description.
    *   `status`: (String) - Task status ("todo", "ongoing", "completed").
    *   `assignedTo`: (ObjectId) - Reference to the user who is assigned to the task.
*   **Logs Collection:**
    *   `_id`: (ObjectId) - Unique log identifier.
    *   `taskTitle`: (String) - Task title.
    *   `userName`: (String) - User's name.
    *   `oldStatus`: (String) - Old status of the task.
    *   `newStatus`: (String) - New status of the task.
    *   `timestamp`: (Date) - Timestamp of the log entry.

## Code Structure and Organization

*   `server.js`: Entry point of the application.
*   `src/`: Contains the source code.
    *   `index.js`: Initializes the Express app and connects to the database.
    *   `Config/`: Configuration files (e.g., database connection, JWT settings).
    *   `Features/`: Contains feature-specific code.
        *   `Tasks/`: Task-related controllers, repositories, routes, and schema.
        *   `Users/`: User-related controllers, repositories, routes, and schema.
    *   `Middlewares/`: Middleware functions (e.g., authentication, error handling).

## Testing Procedures

*   **Unit Tests:** (To be implemented) -  Test individual functions and modules.
*   **Integration Tests:** (To be implemented) - Test the interaction between different modules and components.
*   **API Tests:** (To be implemented) - Test the API endpoints using tools like Postman or Jest.

## Deployment Instructions

1.  **Build the application:** (If applicable, e.g., for a compiled language).
2.  **Configure environment variables:** Set up the necessary environment variables on the deployment server.
3.  **Deploy the application:** Deploy the application to a platform like Heroku, AWS, or a similar service.
4.  **Configure the database:** Ensure the application can connect to the MongoDB database.

## Contribution Guidelines

1.  **Fork the repository.**
2.  **Create a new branch for your feature or bug fix.**
3.  **Make your changes and commit them.**
4.  **Submit a pull request.**
