# Blog App Project

A full-stack MERN blog application with role-based access, protected routes, Cloudinary image uploads, and admin management.

## Features

- Role-based authentication: `USER`, `AUTHOR`, `ADMIN`
- Registration and login for all users
- JWT-based authentication stored in `httpOnly` cookies
- Author dashboard
  - Create articles
  - Edit articles
  - Soft delete / restore articles
  - View own articles
- User dashboard
  - View active articles
  - Read article details
  - Add comments to articles
- Admin dashboard
  - View all users
  - Block / unblock users
  - View all articles
  - Activate / deactivate articles
  - Dashboard statistics
- Cloudinary profile image uploads for user and author registration
- Protected API routes with role validation
- MongoDB data models for users and articles

## Tech Stack

- Backend
  - Node.js
  - Express
  - MongoDB / Mongoose
  - JSON Web Tokens
  - bcryptjs
  - Cloudinary
  - Multer
  - cookie-parser
  - cors

- Frontend
  - React
  - Vite
  - Tailwind CSS
  - Axios
  - Zustand
  - React Router
  - react-hook-form
  - react-hot-toast

## Project Structure

- `backend/`
  - `server.js`
  - `models/`
  - `APIs/`
  - `middlewares/`
  - `config/`
  - `services/`
- `frontend/`
  - `src/`
  - `components/`
  - `store/`
  - `styles/`
  - `assets/`

## Setup

### Backend

1. Open terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   DB_URL=<your-mongodb-connection-string>
   PORT=4000
   JWT_SECRET=<your-jwt-secret>
   CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<cloudinary-api-key>
   CLOUDINARY_API_SECRET=<cloudinary-api-secret>
   ```
4. Start the server:
   ```bash
   node server.js
   ```

### Frontend

1. Open terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth / Common
- `POST /common-api/login`
- `GET /common-api/logout`
- `PUT /common-api/change-password`
- `GET /common-api/check-auth`

### User
- `POST /user-api/users`
- `GET /user-api/articles`
- `PUT /user-api/articles`
- `GET /user-api/article/:id`

### Author
- `POST /author-api/users`
- `POST /author-api/articles`
- `GET /author-api/articles/:authorId`
- `PUT /author-api/articles`
- `PATCH /author-api/articles/:id/status`

### Admin
- `GET /admin-api/articles`
- `GET /admin-api/users`
- `PUT /admin-api/users/block/:userId`
- `PUT /admin-api/users/unblock/:userId`
- `PUT /admin-api/articles/activate/:articleId`
- `PUT /admin-api/articles/deactivate/:articleId`
- `GET /admin-api/dashboard/stats`

## Notes

- The backend uses cookie-based JWT authentication, so requests from the frontend must include credentials.
- Frontend CORS is configured for:
  - `http://localhost:5173`
  - `https://blog-app-project-eight.vercel.app`

## Recommended Workflow

1. Register a user, author, or admin
2. Login
3. Use the correct role-specific routes
4. Manage articles and comments from UI dashboards
5. Admin can manage users and content globally

## Contributions

Feel free to extend this project with:
- better validation
- pagination
- article categories and tags
- search and filter
- UI improvements
- deployment scripts
