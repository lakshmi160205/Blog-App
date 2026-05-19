# Blog App - Backend API Documentation

A complete Node.js + Express + MongoDB backend for a full-stack MERN blog application with JWT authentication, role-based access control, Cloudinary image uploads, and article management.

## 📋 Deployed Links

- **Backend API URL**: `http://localhost:4000` (Development)
- **Deployed Backend URL**: `https://blog-app-8h16.onrender.com` (Add your actual deployment URL here)
- **Frontend URL**: `https://blog-app-iota-orcin.vercel.app/`

---

## Project Setup & Installation
# Initialize npm project (creates package.json)
npm init -y

# Update package.json type to ES6 modules
# (Add "type": "module" to package.json)
```

### 2. Install Dependencies

```bash
# Core dependencies
npm install express mongoose dotenv

# Authentication & Security
npm install jsonwebtoken bcryptjs cookie-parser cors

# File Upload
npm install multer cloudinary

# Development (optional)
npm install --save-dev nodemon
```

### 3. Package Configuration

Your `package.json` should look like:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "Blog App Backend API",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^5.2.1",
    "mongoose": "^9.2.4",
    "dotenv": "^17.3.1",
    "jsonwebtoken": "^9.0.3",
    "bcryptjs": "^3.0.3",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "multer": "^2.1.1",
    "cloudinary": "^2.9.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### 4. Environment Setup

Create a `.env` file in the root directory:

```bash
# Server Configuration
PORT=4000

# Database
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/blog-app?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 5. Running the Application

```bash
# Development mode (with auto-reload using nodemon)
npm run dev

# Production mode
npm start

# Server starts on http://localhost:4000
```

---

## 📁 Folder Structure

```
backend/
├── APIs/                            # Route handlers and controllers
│   ├── UserAPI.js                  # User registration, articles list, comments
│   ├── AuthorAPI.js                # Author registration, article CRUD operations
│   ├── AdminAPI.js                 # Admin user/article management, statistics
│   └── CommonAPI.js                # Login, logout, change password, auth check
├── config/                          # Configuration files
│   ├── cloudinary.js               # Cloudinary connection setup
│   ├── cloudinaryUpload.js         # Helper function for uploading to Cloudinary
│   └── multer.js                   # Multer configuration for file upload to memory
├── middlewares/                     # Custom middleware functions
│   ├── verifyToken.js              # JWT token verification and role validation
│   └── checkAuthor.js              # Author-specific authorization (optional)
├── models/                          # MongoDB Mongoose schemas
│   ├── UserModel.js                # User schema (USER, AUTHOR, ADMIN)
│   └── ArticleModel.js             # Article schema with references
├── services/                        # Business logic functions
│   └── authService.js              # User registration and authentication logic
├── .env                            # Environment variables (not in git)
├── .gitignore                      # Git ignore file
├── authorreq.http                  # HTTP test requests for author endpoints
├── userreq.http                    # HTTP test requests for user endpoints
├── package.json                    # Dependencies and scripts
├── server.js                       # Main server entry point
└── README.md                       # Project documentation
```

---

## 🔧 Configuration Files

### **Server Configuration** (`server.js`)

```javascript
// Main server setup
- Creates Express app
- Configures CORS with frontend URLs
- Sets up middleware (JSON parser, cookie parser)
- Connects routes (user, author, admin, common APIs)
- Connects to MongoDB
- Starts HTTP server on PORT
```

**CORS Configuration**:
```javascript
origin: [
  "http://localhost:5173",  // Frontend development
  "https://blog-app-iota-orcin.vercel.app"  // Production
]
```

### **Cloudinary Configuration** (`config/cloudinary.js`)

```javascript
// Initializes Cloudinary with API credentials
// Used for uploading profile images and article images
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

### **Multer Configuration** (`config/multer.js`)

```javascript
// Configures file upload handling
// Stores files in memory (not disk) before uploading to Cloudinary
const upload = multer({
  storage: memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Only allow image uploads
  }
});
```

---

## 🔐 Authentication & Middleware

### **JWT Token Verification** (`middlewares/verifyToken.js`)

```javascript
// Middleware that:
// 1. Extracts JWT from cookies
// 2. Verifies token signature
// 3. Checks user role (USER, AUTHOR, ADMIN)
// 4. Attaches user info to req.user
// 5. Rejects unauthorized requests

// Usage: verifyToken("AUTHOR") or verifyToken("USER", "ADMIN")
```

---

## 📡 API Endpoints

### **Base URL**: `http://localhost:4000`

---

## 🔓 **PUBLIC ENDPOINTS** (No Authentication Required)

---

### **1. USER REGISTRATION**
**Endpoint**: `POST /user-api/users`

**Description**: Register a new regular user account with profile image

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "profileImageUrl": [File object - multipart form data]
}
```

**Response (201 Created)**:
```json
{
  "message": "user created",
  "payload": {
    "_id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "profileImageUrl": "https://cloudinary-url...",
    "isActive": true
  }
}
```

**Backend Actions**:
1. Receives multipart form data with file
2. Uploads image to Cloudinary (if provided)
3. Hashes password with bcryptjs
4. Saves user to MongoDB with role "USER"
5. Returns user object

---

### **2. AUTHOR REGISTRATION**
**Endpoint**: `POST /author-api/users`

**Description**: Register a new author account with profile image

**Request Body**:
```json
{
  "email": "author@example.com",
  "password": "password123",
  "firstName": "Jane",
  "lastName": "Writer",
  "profileImageUrl": [File object - multipart form data]
}
```

**Response (201 Created)**:
```json
{
  "message": "user created",
  "payload": {
    "_id": "author_id",
    "email": "author@example.com",
    "firstName": "Jane",
    "lastName": "Writer",
    "role": "AUTHOR",
    "profileImageUrl": "https://cloudinary-url...",
    "isActive": true
  }
}
```

**Backend Actions**:
1. Same as user registration
2. Role set to "AUTHOR" instead of "USER"

---

### **3. LOGIN**
**Endpoint**: `POST /common-api/login`

**Description**: Authenticate user/author/admin and receive JWT token in httpOnly cookie

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "USER" // or "AUTHOR" or "ADMIN"
}
```

**Response (200 OK)**:
```json
{
  "message": "login success",
  "payload": {
    "_id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "role": "USER",
    "profileImageUrl": "https://..."
  }
}
```

**Cookies Set**:
```
Set-Cookie: token=<JWT_TOKEN>; HttpOnly; Secure; SameSite=None; Path=/
```

**Backend Actions**:
1. Finds user by email in database
2. Compares provided password with hashed password
3. If match → generates JWT token with user ID and role
4. Sets token in httpOnly cookie
5. Returns user data (without password)
6. If no match → 401 Unauthorized error

---

---

## 🔒 **PROTECTED ENDPOINTS** (Require Authentication)

---

## **USER ENDPOINTS**

---

### **4. GET ALL ACTIVE ARTICLES**
**Endpoint**: `GET /user-api/articles`

**Authentication**: Required (USER role)

**Description**: Fetch all active articles from all authors

**Request**:
```
Headers: Cookie: token=<JWT_TOKEN>
```

**Response (200 OK)**:
```json
{
  "message": "all articles",
  "payload": [
    {
      "_id": "article_id",
      "title": "How to Learn React",
      "category": "Technology",
      "content": "Article content...",
      "author": {
        "_id": "author_id",
        "firstName": "Jane",
        "email": "jane@example.com"
      },
      "isArticleActive": true,
      "createdAt": "2024-05-19T10:30:00Z",
      "comments": [
        {
          "_id": "comment_id",
          "user": {
            "_id": "user_id",
            "email": "user@example.com",
            "firstName": "John"
          },
          "comment": "Great article!",
          "createdAt": "2024-05-19T11:00:00Z"
        }
      ]
    }
  ]
}
```

**Backend Actions**:
1. Verifies JWT token
2. Checks role is "USER"
3. Queries MongoDB for articles with `isArticleActive: true`
4. Populates author and comment user data
5. Returns article list

---

### **5. ADD COMMENT TO ARTICLE**
**Endpoint**: `PUT /user-api/articles`

**Authentication**: Required (USER role)

**Description**: Add a comment to an active article

**Request Body**:
```json
{
  "articleId": "article_id",
  "comment": "This is a great article!"
}
```

**Response (200 OK)**:
```json
{
  "message": "comment added successfully",
  "payload": {
    "_id": "article_id",
    "title": "How to Learn React",
    "comments": [
      {
        "_id": "comment_id",
        "user": {
          "_id": "user_id",
          "email": "user@example.com",
          "firstName": "John"
        },
        "comment": "This is a great article!",
        "createdAt": "2024-05-19T11:05:00Z"
      }
    ]
  }
}
```

**Backend Actions**:
1. Verifies JWT token and user role
2. Finds article by ID and checks if active
3. Adds comment with user ID, comment text, and timestamp
4. Returns updated article with all comments
5. If article not found → 404 error

---

---

## **AUTHOR ENDPOINTS**

---

### **6. CREATE NEW ARTICLE**
**Endpoint**: `POST /author-api/articles`

**Authentication**: Required (AUTHOR role)

**Description**: Create a new article (automatically published as active)

**Request Body**:
```json
{
  "title": "My First Article",
  "category": "Technology",
  "content": "Detailed article content...",
  "author": "author_id"
}
```

**Response (201 Created)**:
```json
{
  "message": "article created",
  "payload": {
    "_id": "article_id",
    "title": "My First Article",
    "category": "Technology",
    "content": "Detailed article content...",
    "author": "author_id",
    "isArticleActive": true,
    "createdAt": "2024-05-19T10:00:00Z",
    "updatedAt": "2024-05-19T10:00:00Z",
    "comments": []
  }
}
```

**Backend Actions**:
1. Verifies JWT token and AUTHOR role
2. Creates new Article document
3. Sets `isArticleActive: true`
4. Saves to MongoDB
5. Returns created article

---

### **7. GET AUTHOR'S ARTICLES**
**Endpoint**: `GET /author-api/articles/:authorId`

**Authentication**: Required (AUTHOR role)

**Description**: Get all articles by a specific author (including soft-deleted)

**URL Parameters**:
```
authorId = Author's MongoDB _id
```

**Response (200 OK)**:
```json
{
  "message": "articles",
  "payload": [
    {
      "_id": "article_id",
      "title": "Article 1",
      "author": {
        "_id": "author_id",
        "firstName": "Jane",
        "email": "jane@example.com"
      },
      "isArticleActive": true,
      "comments": [...]
    },
    {
      "_id": "article_id_2",
      "title": "Article 2 (Deleted)",
      "author": { ... },
      "isArticleActive": false,
      "comments": []
    }
  ]
}
```

**Backend Actions**:
1. Verifies JWT token and AUTHOR role
2. Queries all articles by authorId
3. Returns both active and inactive articles
4. Populates author and comment data
5. Sorted by creation date

---

### **8. EDIT ARTICLE**
**Endpoint**: `PUT /author-api/articles`

**Authentication**: Required (AUTHOR role)

**Description**: Update an existing article (only author can edit their own)

**Request Body**:
```json
{
  "articleId": "article_id",
  "title": "Updated Title",
  "category": "Technology",
  "content": "Updated content..."
}
```

**Response (200 OK)**:
```json
{
  "message": "article updated successfully",
  "payload": {
    "_id": "article_id",
    "title": "Updated Title",
    "category": "Technology",
    "content": "Updated content...",
    "author": "author_id",
    "isArticleActive": true,
    "updatedAt": "2024-05-19T11:00:00Z"
  }
}
```

**Backend Actions**:
1. Verifies JWT token and AUTHOR role
2. Finds article by ID
3. Checks if logged-in author is the article owner
4. Updates only title, category, and content fields
5. Saves updated article
6. If author mismatch → 403 Forbidden error

---

### **9. SOFT DELETE ARTICLE**
**Endpoint**: `PUT /author-api/articles/:articleId`

**Authentication**: Required (AUTHOR role)

**Description**: Soft delete an article (sets `isArticleActive` to false)

**Response (200 OK)**:
```json
{
  "message": "article deleted successfully",
  "payload": {
    "_id": "article_id",
    "isArticleActive": false
  }
}
```

**Backend Actions**:
1. Verifies AUTHOR role
2. Finds article by ID
3. Sets `isArticleActive = false`
4. Article hidden from user view but not deleted from database

---

### **10. RESTORE ARTICLE**
**Endpoint**: `PUT /author-api/articles/:articleId/restore`

**Authentication**: Required (AUTHOR role)

**Description**: Restore a soft-deleted article

**Response (200 OK)**:
```json
{
  "message": "article restored successfully",
  "payload": {
    "_id": "article_id",
    "isArticleActive": true
  }
}
```

---

---

## **ADMIN ENDPOINTS**

---

### **11. GET ALL USERS**
**Endpoint**: `GET /admin-api/users`

**Authentication**: Required (ADMIN role)

**Description**: Retrieve all users (USER, AUTHOR, ADMIN) with their status

**Response (200 OK)**:
```json
{
  "message": "All users retrieved successfully",
  "payload": [
    {
      "_id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "isActive": true,
      "createdAt": "2024-05-19T09:00:00Z"
    },
    {
      "_id": "author_id",
      "email": "author@example.com",
      "firstName": "Jane",
      "role": "AUTHOR",
      "isActive": true,
      "createdAt": "2024-05-19T09:30:00Z"
    }
  ]
}
```

**Backend Actions**:
1. Verifies JWT token and ADMIN role
2. Queries all users from database
3. Excludes password field for security
4. Returns all users sorted by creation date

---

### **12. BLOCK USER**
**Endpoint**: `PUT /admin-api/users/block/:userId`

**Authentication**: Required (ADMIN role)

**Description**: Block a user (prevent login and article access)

**URL Parameters**:
```
userId = User's MongoDB _id
```

**Response (200 OK)**:
```json
{
  "message": "User blocked successfully",
  "payload": {
    "_id": "user_id",
    "email": "user@example.com",
    "isActive": false
  }
}
```

**Backend Actions**:
1. Verifies ADMIN role
2. Prevents admin from blocking themselves
3. Sets `isActive = false` for user
4. Blocked users cannot log in or access protected routes

---

### **13. UNBLOCK USER**
**Endpoint**: `PUT /admin-api/users/unblock/:userId`

**Authentication**: Required (ADMIN role)

**Description**: Unblock a previously blocked user

**Response (200 OK)**:
```json
{
  "message": "User unblocked successfully",
  "payload": {
    "_id": "user_id",
    "email": "user@example.com",
    "isActive": true
  }
}
```

**Backend Actions**:
1. Verifies ADMIN role
2. Sets `isActive = true`
3. User can now log in and access features

---

### **14. GET ALL ARTICLES**
**Endpoint**: `GET /admin-api/articles`

**Authentication**: Required (ADMIN role)

**Description**: Get all articles (active and inactive) with author and comment details

**Response (200 OK)**:
```json
{
  "message": "All articles retrieved successfully",
  "payload": [
    {
      "_id": "article_id",
      "title": "Article Title",
      "category": "Technology",
      "author": {
        "_id": "author_id",
        "firstName": "Jane",
        "email": "jane@example.com",
        "isActive": true
      },
      "isArticleActive": true,
      "createdAt": "2024-05-19T10:00:00Z",
      "comments": [...]
    },
    {
      "_id": "article_id_2",
      "title": "Inactive Article",
      "isArticleActive": false,
      "comments": []
    }
  ]
}
```

**Backend Actions**:
1. Verifies ADMIN role
2. Queries all articles (active and inactive)
3. Populates author and comment user data
4. Sorted by creation date (newest first)

---

### **15. DEACTIVATE ARTICLE**
**Endpoint**: `PUT /admin-api/articles/:articleId`

**Authentication**: Required (ADMIN role)

**Description**: Deactivate an article (admin can deactivate any article)

**Response (200 OK)**:
```json
{
  "message": "Article deactivated successfully",
  "payload": {
    "_id": "article_id",
    "isArticleActive": false
  }
}
```

**Backend Actions**:
1. Verifies ADMIN role
2. Finds article by ID
3. Sets `isArticleActive = false`
4. Article no longer visible to users

---

### **16. ACTIVATE ARTICLE**
**Endpoint**: `PUT /admin-api/articles/:articleId/activate`

**Authentication**: Required (ADMIN role)

**Description**: Reactivate a deactivated article

**Response (200 OK)**:
```json
{
  "message": "Article activated successfully",
  "payload": {
    "_id": "article_id",
    "isArticleActive": true
  }
}
```

---

---

## **COMMON ENDPOINTS**

---

### **17. LOGOUT**
**Endpoint**: `GET /common-api/logout`

**Authentication**: Not required (works for all users)

**Description**: Clear authentication cookie and log out user

**Response (200 OK)**:
```json
{
  "message": "Logged out successfully"
}
```

**Cookies Cleared**:
```
Set-Cookie: token=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0
```

**Backend Actions**:
1. Clears `token` cookie
2. Frontend should clear Zustand auth store
3. User redirected to home or login page

---

### **18. CHANGE PASSWORD**
**Endpoint**: `PUT /common-api/change-password`

**Authentication**: Required (Any role - USER, AUTHOR, ADMIN)

**Description**: Change password for any authenticated user

**Request Body**:
```json
{
  "email": "user@example.com",
  "role": "USER",
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword456"
}
```

**Response (200 OK)**:
```json
{
  "message": "Password changed successfully"
}
```

**Backend Actions**:
1. Verifies JWT token
2. Finds user by email
3. Compares current password with database hash
4. Ensures new password is different from current
5. Hashes new password with bcryptjs
6. Saves updated password
7. If password incorrect → 401 Unauthorized
8. If same as current → 400 Bad Request

---

### **19. CHECK AUTH (Page Refresh)**
**Endpoint**: `GET /common-api/check-auth`

**Authentication**: Required (Any role)

**Description**: Verify if user is still authenticated (used on page refresh)

**Response (200 OK)**:
```json
{
  "message": "authenticated",
  "payload": {
    "_id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "role": "USER",
    "profileImageUrl": "..."
  }
}
```

**Backend Actions**:
1. Verifies JWT token from cookie
2. If valid → returns user data
3. If invalid/expired → 401 Unauthorized
4. Frontend uses this to restore auth state on page reload

---

---

## 📊 Data Models

### **User Model** (`models/UserModel.js`)

```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: "USER" | "AUTHOR" | "ADMIN",
  profileImageUrl: String (Cloudinary URL),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

---

### **Article Model** (`models/ArticleModel.js`)

```javascript
{
  _id: ObjectId,
  title: String,
  category: String,
  content: String,
  author: ObjectId (Reference to User),
  isArticleActive: Boolean (default: true),
  comments: [
    {
      _id: ObjectId,
      user: ObjectId (Reference to User),
      comment: String,
      createdAt: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔄 Authentication Flow

```
1. User Registration
   ↓
   POST /user-api/users or POST /author-api/users
   ↓
   Upload image to Cloudinary
   ↓
   Hash password with bcryptjs
   ↓
   Save user to MongoDB
   ↓
   Return user object

2. User Login
   ↓
   POST /common-api/login
   ↓
   Find user by email
   ↓
   Compare password
   ↓
   Generate JWT token
   ↓
   Set httpOnly cookie
   ↓
   Return user data

3. Protected Route Access
   ↓
   Client sends request with cookie
   ↓
   Middleware extracts JWT from cookie
   ↓
   Verify token signature
   ↓
   Check user role
   ↓
   Attach user to req.user
   ↓
   Process request or reject

4. Logout
   ↓
   GET /common-api/logout
   ↓
   Clear token cookie
   ↓
   Frontend clears auth state
```

---

## 🚀 Deployment Guide

### **Deploy to Heroku / Railway / Render**

1. **Prepare for Deployment**
   ```bash
   # Ensure you have a .env file with all secrets
   # Add to .gitignore:
   # .env
   # node_modules/
   ```

2. **Set Environment Variables** on hosting platform:
   - `PORT`
   - `DB_URL`
   - `JWT_SECRET`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`

3. **Deploy to Railway**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   railway up
   ```

4. **Update CORS** in `server.js`:
   ```javascript
   origin: [
     "http://localhost:5173",
     "https://your-frontend-url.com",
     "https://your-backend-url.com"  // If frontend needs to access
   ]
   ```

5. **Test Deployed API**
   ```bash
   curl https://your-backend-url.com/health
   ```

---

## 🛡️ Security Best Practices

| Security Feature | Implementation |
|------------------|-----------------|
| **Password Hashing** | bcryptjs with salt rounds: 10 |
| **JWT Tokens** | Signed with SECRET, stored in httpOnly cookies |
| **CORS** | Whitelisted frontend URLs only |
| **Cookie Security** | httpOnly, Secure, SameSite=None |
| **Role-Based Access** | Middleware validates role for protected routes |
| **SQL Injection** | Using MongoDB with Mongoose (no SQL injection risk) |
| **Password Validation** | Prevents same password change |
| **Admin Protection** | Admin cannot block themselves |

---

## 📝 Testing the API

### **Using HTTP Files** (VS Code REST Client extension)

Create `test.http` file:

```http
### Login
POST http://localhost:4000/common-api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "USER"
}

###  Get all articles
GET http://localhost:4000/user-api/articles
Authorization: Bearer YOUR_JWT_TOKEN

### Create article
POST http://localhost:4000/author-api/articles
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Test Article",
  "category": "Technology",
  "content": "Test content",
  "author": "author_id"
}
```

### **Using Postman**

1. Create new collection
2. Set base URL to `http://localhost:4000`
3. For protected endpoints, add cookie or Authorization header
4. Import `authorreq.http` and `userreq.http` files

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Token expired or invalid - user needs to login again |
| CORS error | Frontend URL not in CORS whitelist in server.js |
| Cloudinary upload fails | Check API credentials and file size limit |
| MongoDB connection fails | Verify DB_URL and network access in MongoDB Atlas |
| Token not setting in cookie | Check cookie domain and secure/sameSite flags |
| Author can't edit article | Verify article author ID matches logged-in user ID |

---

## 📞 Support

For issues or questions:
1. Check server logs: `npm run dev`
2. Verify environment variables in `.env`
3. Test API endpoints with provided HTTP files
4. Check MongoDB Atlas for data validation
5. Review CORS and cookie settings

---

**Last Updated**: May 2026
**Version**: 1.0.0
**License**: ISC
