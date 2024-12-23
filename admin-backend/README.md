# Elimu Admin Backend API Documentation

## Base URLs
```
# Admin Backend
https://elimu-admin-backend.onrender.com/api

# Instructor Backend
https://elimu-instructor-bc.onrender.com/api
```

## Students Endpoints (Admin Backend)

### Get All Students
- **Method:** GET
- **Endpoint:** `/students`
- **Query Parameters:** Optional filters
- **Response:** List of all students
- **Example Response:**
```json
[
  {
    "_id": "string",
    "fullName": "string",
    "email": "string",
    "dateOfBirth": "string",
    "enrolledCourses": number,
    "status": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

### Get Single Student
- **Method:** GET
- **Endpoint:** `/students/:id`
- **Response:** Single student details
- **Example Response:**
```json
{
  "_id": "string",
  "fullName": "string",
  "email": "string",
  "dateOfBirth": "string",
  "enrolledCourses": number,
  "status": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Create Student
- **Method:** POST
- **Endpoint:** `/students`
- **Body:**
```json
{
  "fullName": "string",
  "email": "string",
  "dateOfBirth": "string (optional)",
  "enrolledCourses": "number (optional)",
  "status": "string (optional, defaults to 'Active')"
}
```

### Update Student
- **Method:** PUT
- **Endpoint:** `/students/:id`
- **Body:**
```json
{
  "fullName": "string (optional)",
  "email": "string (optional)",
  "dateOfBirth": "string (optional)",
  "enrolledCourses": "number (optional)",
  "status": "string (optional)"
}
```

### Delete Student
- **Method:** DELETE
- **Endpoint:** `/students/:id`

## Courses Endpoints (Instructor Backend)

### Get All Courses
- **Method:** GET
- **Endpoint:** `https://elimu-instructor-bc.onrender.com/api/courses`
- **Response:** List of all courses
- **Example Response:**
```json
[
  {
    "_id": "string",
    "name": "string",
    "instructor": "string",
    "description": "string",
    "price": "string",
    "status": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

### Get Single Course
- **Method:** GET
- **Endpoint:** `/courses/:id`
- **Response:** Single course details

### Create Course
- **Method:** POST
- **Endpoint:** `/courses`
- **Body:**
```json
{
  "name": "string",
  "instructor": "string",
  "description": "string",
  "price": "string",
  "status": "string"
}
```

### Update Course
- **Method:** PUT
- **Endpoint:** `/courses/:id`
- **Body:** Same as Create Course (all fields optional)

### Delete Course
- **Method:** DELETE
- **Endpoint:** `/courses/:id`

## Authentication Endpoints

### Login
- **Method:** POST
- **Endpoint:** `/auth/login`
- **Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response:**
```json
{
  "access_token": "string",
  "user": {
    "_id": "string",
    "email": "string",
    "fullName": "string"
  }
}
```

### Register
- **Method:** POST
- **Endpoint:** `/auth/register`
- **Body:**
```json
{
  "email": "string",
  "password": "string",
  "fullName": "string"
}
```

## Response Formats

### Success Response
```json
{
  "data": {}, // Requested data
  "message": "Success message"
}
```

### Error Response
```json
{
  "statusCode": number,
  "message": "Error message",
  "error": "Error type"
}
```

## Authentication
All endpoints except `/auth/login` and `/auth/register` require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Environment Variables
```env
# Server Configuration
PORT=3002
NODE_ENV=development

# Database Configuration
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,https://elimu-admin-dashboard.onrender.com

# API Configuration
API_PREFIX=/api
```

## Data Models

### Student Model
```typescript
{
  fullName: string;          // required
  email: string;            // required, unique
  dateOfBirth?: string;     // optional
  enrolledCourses: number;  // default: 0
  status: string;          // default: 'Active'
  lastLogin?: Date;        // optional
  createdAt: Date;         // auto-generated
  updatedAt: Date;         // auto-generated
}
```

### Course Model
```typescript
{
  name: string;           // required
  instructor: string;     // required
  description: string;    // required
  price: string;         // required
  status: string;        // required
  createdAt: Date;       // auto-generated
  updatedAt: Date;       // auto-generated
}
```

## Development Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with the required environment variables
4. Start the development server:
```bash
npm run start:dev
```

## Production Deployment

The API is deployed on Render.com. To deploy:

1. Push changes to the main branch
2. Render will automatically build and deploy the changes
3. Monitor the deployment in the Render dashboard

## API Status
You can check the API status at:
```
https://elimu-admin-backend.onrender.com/api/health
```

Would you like me to add any additional information or make any changes?