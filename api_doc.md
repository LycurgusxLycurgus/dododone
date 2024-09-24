# DodoDone API Documentation

## Introduction

Welcome to the DodoDone API documentation. This API allows you to manage tasks and retrieve analytics for your task management system. The API is built using NestJS and follows RESTful principles.

## Base URL

All API requests should be made to:

```
http://localhost:3000
```

## Authentication

The DodoDone API uses JWT (JSON Web Token) for authentication. To access protected endpoints, you need to include the JWT token in the Authorization header of your requests.

### Obtaining a Token

To obtain a token, make a POST request to the `/auth/login` endpoint with your credentials.

Example:

```http
POST /auth/login
Content-Type: application/json

{
    "username": "test",
    "password": "password"
}
```

The response will include an `access_token` which you should use for subsequent authenticated requests.

### Using the Token

For authenticated requests, include the token in the Authorization header:

```
Authorization: Bearer <your_access_token>
```

## Endpoints

### Authentication

#### Login

Authenticates a user and returns a JWT token.

- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth required**: No
- **Headers**: 
  - Content-Type: application/json
- **Body**:

```json
{
    "username": "test",
    "password": "password"
}
```

- **Success Response**:
  - **Code**: 200
  - **Content**: 
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

### Tasks

#### Create Task

Creates a new task.

- **URL**: `/tasks`
- **Method**: `POST`
- **Auth required**: Yes
- **Headers**: 
  - Content-Type: application/json
  - Authorization: Bearer <your_access_token>
- **Body**:

```json
{
    "title": "Sample Task",
    "description": "This is a sample task.",
    "dueDate": "2023-12-31"
}
```

- **Success Response**:
  - **Code**: 201
  - **Content**: Returns the created task object

#### Get All Tasks

Retrieves all tasks for the authenticated user.

- **URL**: `/tasks`
- **Method**: `GET`
- **Auth required**: Yes
- **Headers**: 
  - Authorization: Bearer <your_access_token>

- **Success Response**:
  - **Code**: 200
  - **Content**: An array of task objects

#### Update Task

Updates an existing task.

- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Auth required**: Yes
- **Headers**: 
  - Content-Type: application/json
  - Authorization: Bearer <your_access_token>
- **URL Parameters**: 
  - `id`: The ID of the task to update
- **Body**:

```json
{
    "title": "Updated Task Title",
    "completed": true
}
```

- **Success Response**:
  - **Code**: 200
  - **Content**: Returns the updated task object

#### Delete Task

Deletes a task.

- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Auth required**: Yes
- **Headers**: 
  - Authorization: Bearer <your_access_token>
- **URL Parameters**: 
  - `id`: The ID of the task to delete

- **Success Response**:
  - **Code**: 204 (No Content)

### Analytics

#### Get Completion Rate

Retrieves the task completion rate.

- **URL**: `/analytics/completion-rate`
- **Method**: `GET`
- **Auth required**: Yes
- **Headers**: 
  - Authorization: Bearer <your_access_token>

- **Success Response**:
  - **Code**: 200
  - **Content**: A number representing the completion rate percentage

#### Get Overdue Tasks

Retrieves the number of overdue tasks.

- **URL**: `/analytics/overdue-tasks`
- **Method**: `GET`
- **Auth required**: Yes
- **Headers**: 
  - Authorization: Bearer <your_access_token>

- **Success Response**:
  - **Code**: 200
  - **Content**: A number representing the count of overdue tasks

#### Get Total Tasks

Retrieves the total number of tasks.

- **URL**: `/analytics/total-tasks`
- **Method**: `GET`
- **Auth required**: Yes
- **Headers**: 
  - Authorization: Bearer <your_access_token>

- **Success Response**:
  - **Code**: 200
  - **Content**: A number representing the total count of tasks

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests. In case of an error, the response will include a JSON object with an `error` field describing the issue.

Common error codes:

- `400 Bad Request`: The request was invalid or cannot be served.
- `401 Unauthorized`: The request requires authentication.
- `403 Forbidden`: The server understood the request but refuses to authorize it.
- `404 Not Found`: The requested resource could not be found.
- `500 Internal Server Error`: The server encountered an unexpected condition that prevented it from fulfilling the request.

Example error response:

```json
{
  "error": "Invalid credentials"
}
```

## Rate Limiting

Currently, there are no rate limits implemented for this API. However, please use the API responsibly and avoid sending an excessive number of requests in a short period.

## Changelog

### Version 1.0.0 (Current)

- Initial release of the DodoDone API
- Implemented authentication, task management, and analytics endpoints

## Code Examples

### JavaScript (Fetch API)

Here's an example of how to create a new task using the Fetch API:

```javascript
const createTask = async (token, taskData) => {
  try {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(taskData)
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    const createdTask = await response.json();
    console.log('Task created:', createdTask);
    return createdTask;
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

// Usage
const token = 'your_access_token_here';
const newTask = {
  title: 'New Task',
  description: 'This is a new task',
  dueDate: '2024-12-31'
};

createTask(token, newTask);
```

## Conclusion

This documentation covers the basic functionality of the DodoDone API. For any questions or issues, please contact the API support team. Happy coding!