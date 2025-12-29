# Blog Post API

A RESTful API for a blog post application built with Node.js, Express, and MongoDB. Features user authentication, blog CRUD operations, and image uploads.

## Features

- User authentication (signup, login, logout)
- JWT-based authorization with HTTP-only cookies
- Blog post CRUD operations
- Image upload support for blog posts
- Password hashing with bcryptjs
- MongoDB database integration
- CORS enabled for frontend integration
- Input validation and error handling

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Multer
- **CORS**: cors middleware

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Blog-Post
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MONGODB_URL=mongodb://localhost:27017/blogpost
JWT_SECRET=your_jwt_secret_here
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Start the server:
```bash
node server.js
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

### Authentication Routes

#### POST /auth/signup
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /auth/login
Authenticate a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /auth/logout
Logout the current user.

**Response:**
```json
{
  "message": "Logout successful"
}
```

#### GET /auth/me
Get current user information. Requires authentication.

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2023-12-01T00:00:00.000Z",
  "updatedAt": "2023-12-01T00:00:00.000Z"
}
```

### Blog Routes

#### GET /blogs
Get all blog posts. Public route, shows author information.

**Response:**
```json
[
  {
    "_id": "blog_id",
    "title": "Sample Blog",
    "content": "Blog content here",
    "imagePath": "uploads/image.jpg",
    "author": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2023-12-01T00:00:00.000Z",
    "updatedAt": "2023-12-01T00:00:00.000Z"
  }
]
```

#### GET /blogs/:id
Get a specific blog post by ID. Public route.

**Response:** Same as individual blog object above.

#### POST /blogs
Create a new blog post. Requires authentication.

**Request Body (form-data):**
- title: Blog title
- content: Blog content
- image: Image file (optional, max 5MB, jpeg/jpg/png/gif only)

**Response:**
```json
{
  "message": "Blog created successfully",
  "blog": {
    "_id": "blog_id",
    "title": "New Blog",
    "content": "Blog content",
    "imagePath": "uploads/image.jpg",
    "author": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

#### PUT /blogs/:id
Update an existing blog post. Requires authentication and ownership.

**Request Body (form-data):**
- title: Updated title (optional)
- content: Updated content (optional)
- image: New image file (optional)

**Response:**
```json
{
  "message": "Blog updated successfully",
  "blog": {
    "_id": "blog_id",
    "title": "Updated Blog",
    "content": "Updated content",
    "imagePath": "uploads/new-image.jpg",
    "author": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

#### DELETE /blogs/:id
Delete a blog post. Requires authentication and ownership.

**Response:**
```json
{
  "message": "Blog deleted successfully"
}
```

### Home Route

#### GET /
Welcome message.

**Response:**
```
Welcome to the Blog Post API
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid credentials or missing token)
- 403: Forbidden (not authorized to perform action)
- 404: Not Found
- 500: Internal Server Error

Error response format:
```json
{
  "message": "Error description"
}
```

## Authentication

The API uses JWT tokens stored in HTTP-only cookies for authentication. Include the token in requests to protected routes by logging in first.

## File Upload

Blog posts support image uploads with the following constraints:
- Maximum file size: 5MB
- Allowed formats: JPEG, JPG, PNG, GIF
- Images are stored in the `uploads/` directory

## Project Structure

```
Blog-Post/
├── src/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── blogController.js  # Blog CRUD operations
│   ├── middleware/
│   │   └── auth.js            # Authentication middleware
│   ├── models/
│   │   ├── User.js            # User model
│   │   └── Blog.js            # Blog model
│   └── routes/
│       └── routes.js          # API routes
├── uploads/                   # Uploaded images
├── .env                       # Environment variables
├── package.json               # Dependencies and scripts
├── server.js                  # Server entry point
└── README.md                  # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
