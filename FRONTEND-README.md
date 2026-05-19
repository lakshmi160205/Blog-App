# Blog App - Frontend Documentation

A comprehensive React-based frontend for a full-stack MERN blog application with role-based access control, article management, and user interactions.

## 📋 Deployed Links

- **Frontend Deployed URL**: `https://blog-app-iota-orcin.vercel.app`
- **Backend API URL**: `http://localhost:4000`

---

## 🚀 Project Setup & Installation

### 1. Create Vite React Project

```bash
# Create a new Vite project
npm create vite@latest 

# Install dependencies
npm install
```

### 2. Install Required Dependencies

```bash
# Core dependencies
npm install react react-dom react-router-dom axios zustand react-hook-form react-hot-toast tailwindcss

# Tailwind CSS setup
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Additional dev dependencies
npm install -D @vitejs/plugin-react eslint
```

### 3. Package Configuration

Your `package.json` should include:

```json
{
  "name": "blog-app-frontend",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.13.1",
    "axios": "^1.13.6",
    "zustand": "^5.0.11",
    "react-hook-form": "^7.71.2",
    "react-hot-toast": "^2.6.0",
    "tailwindcss": "^4.2.1"
  }
}
```

### 4. Running the Application

```bash
# Development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint the code
npm lint
```

---

## 📁 Folder Structure

```
frontend/
├── public/                          # Static files
├── src/
│   ├── components/                  # React components
│   │   ├── AddArticle.jsx          # Component for viewing single article (internal)
│   │   ├── AdminDashboard.jsx      # Admin panel for managing users and articles
│   │   ├── ArticleByID.jsx         # Display full article details with comments
│   │   ├── Articles.jsx            # List of articles (internal)
│   │   ├── AuthorArticles.jsx      # Author's articles list
│   │   ├── AuthorDashboard.jsx     # Author profile & dashboard
│   │   ├── AuthorProfile.jsx       # Author profile with sub-routes
│   │   ├── EditArticleForm.jsx     # Form to edit existing articles
│   │   ├── ErrorBoundary.jsx       # Error handling component
│   │   ├── Footer.jsx              # Footer component
│   │   ├── Header.jsx              # Navigation header
│   │   ├── Home.jsx                # Landing page
│   │   ├── Login.jsx               # User/Author/Admin login page
│   │   ├── ProtectedRoute.jsx      # Route protection by role
│   │   ├── Register.jsx            # User/Author registration page
│   │   ├── RootLayout.jsx          # Main layout wrapper
│   │   ├── Unauthorized.jsx        # 403 error page
│   │   ├── UserDashboard.jsx       # User profile & dashboard
│   │   ├── UserProfile.jsx         # User profile page
│   │   ├── WriteArticle.jsx        # Form to create new articles
│   │   └── config/
│   │       └── baseAPI.js          # Axios base URL configuration
│   ├── store/
│   │   └── authStore.js            # Zustand auth state management
│   ├── styles/
│   │   └── common.js               # Shared Tailwind CSS styles
│   ├── assets/                      # Images and media files
│   ├── App.jsx                      # Main app router configuration
│   ├── index.css                    # Global styles
│   ├── main.jsx                     # React entry point
│   └── vite.config.js              # Vite configuration
├── eslint.config.js                # ESLint configuration
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
└── README.md                        # Project overview
```

---

## 🔑 Key Features & Navigation Flow

### 1. **Home Page** (`/`)
   - **Description**: Landing page with featured content and call-to-action buttons
   - **Actions**:
     - `Get Started` button → Redirects to `/register` (if not logged in) or `/user-profile` / `/author-profile` (if logged in)
     - `Explore Articles` button → Redirects to login or user dashboard
   - **Unauthenticated Users**: Can view home page and navigate to login/register

### 2. **User Registration** (`/register`)
   - **Description**: User and Author registration form with Cloudinary image upload
   - **User Input Fields**:
     - Email, Password, First Name, Last Name
     - Profile Image Upload (optional)
     - Role Selection (USER or AUTHOR)
   - **On Success**: Stores user data in MongoDB, redirects to `/login`
   - **Backend Action**: Calls `POST /user-api/users` or `POST /author-api/users` based on role

### 3. **User Login** (`/login`)
   - **Description**: Authentication page for all user roles
   - **Input Fields**: Email, Password, Role dropdown
   - **On Success**: 
     - JWT token stored in httpOnly cookie
     - Zustand auth store updates
     - Redirects based on role:
       - `USER` → `/user-profile`
       - `AUTHOR` → `/author-profile`
       - `ADMIN` → `/admin-profile`
   - **Backend Action**: Calls `POST /common-api/login`

---

## 👥 User Role-Specific Pages

### **USER Dashboard** (`/user-profile`)
   - **Description**: User dashboard to read articles and add comments
   - **Features**:
     - View all active articles from all authors
     - Click on any article → Navigate to `/article/:id`
     - Leave comments on articles
     - View profile information
   - **Backend Actions**:
     - Fetches articles: `GET /user-api/articles`
     - Add comments: `PUT /user-api/articles` (sends articleId and comment)
   - **Protected Route**: Only accessible by users with `USER` role

### **AUTHOR Dashboard** (`/author-profile`)
   - **Description**: Author workspace for article management
   - **Sub-Routes**:
     - `/author-profile/articles` → List of author's all articles (active & soft-deleted)
     - `/author-profile/write-article` → Form to create new article
   - **Features**:
     - Create new articles: Button → `/write-article`
     - View own articles: Shows all articles (including soft-deleted)
     - Edit article: Click edit → `/author-profile/write-article/:id` (Edit mode)
     - Soft delete/restore articles
     - View comments on articles
   - **Backend Actions**:
     - Create article: `POST /author-api/articles`
     - Fetch author articles: `GET /author-api/articles/:authorId`
     - Edit article: `PUT /author-api/articles`
     - Soft delete: `PUT /author-api/articles/:id` (isArticleActive flag)
   - **Protected Route**: Only accessible by users with `AUTHOR` role

### **ADMIN Dashboard** (`/admin-profile`)
   - **Description**: Admin control panel for platform management
   - **Features**:
     - View all users with status (active/blocked)
     - Block/unblock users
     - View all articles (including inactive ones)
     - Activate/deactivate articles
     - View platform statistics
   - **Backend Actions**:
     - Get all users: `GET /admin-api/users`
     - Block user: `PUT /admin-api/users/block/:userId`
     - Unblock user: `PUT /admin-api/users/unblock/:userId`
     - Get all articles: `GET /admin-api/articles`
     - Deactivate article: `PUT /admin-api/articles/:id`
     - Activate article: `PUT /admin-api/articles/:id`
   - **Protected Route**: Only accessible by users with `ADMIN` role

---

## 📄 Article-Related Pages

### **Write/Edit Article Form** (`/author-profile/write-article`)
   - **Description**: Form to create new or edit existing articles
   - **Input Fields**:
     - Title, Category, Content (Rich text)
     - Author ID (auto-filled from logged-in user)
   - **Actions**:
     - Submit → Creates/updates article and redirects to `/author-profile/articles`
     - Cancel → Returns to article list
   - **Backend Actions**:
     - Create: `POST /author-api/articles`
     - Edit: `PUT /author-api/articles`

### **View Article by ID** (`/article/:id`)
   - **Description**: Full article view with comment section
   - **Content Displayed**:
     - Article title, content, category, creation date
     - Author information
     - Comments from all users who commented
   - **User Actions**:
     - Add comment (visible to all users) → `PUT /user-api/articles`
     - Back button → Returns to dashboard
   - **Backend Action**: Fetches article with populated comments: `GET /user-api/articles/:id`

### **Author's Articles List** (`/author-profile/articles`)
   - **Description**: Author's dashboard showing all their articles
   - **Features**:
     - Display all articles (active & soft-deleted)
     - Edit button → Opens edit form
     - Delete button → Soft deletes article
     - Restore button → Restores soft-deleted article
   - **Backend Action**: Fetches articles: `GET /author-api/articles/:authorId`

---

## 🔐 Protected Routes & Access Control

### **ProtectedRoute Component** (`ProtectedRoute.jsx`)
   - Checks if user is authenticated via Zustand store
   - Validates user role against allowed roles
   - **If Unauthorized**: Redirects to `/unauthorized` (403 page)
   - **If Authenticated & Authorized**: Renders component
   - **If Not Authenticated**: Redirects to `/login`

---

## 🛠️ State Management

### **Zustand Auth Store** (`store/authStore.js`)

**State Variables**:
- `currentUser` → Stores logged-in user object
- `isAuthenticated` → Boolean flag for auth status
- `loading` → Tracks API call status
- `error` → Stores error messages

**Methods**:
- `login(credentials)` → Authenticates user via `POST /common-api/login`
- `logout()` → Clears auth state via `GET /common-api/logout`
- `checkAuth()` → Verifies auth on page refresh via `GET /common-api/check-auth`
- `changePassword(oldPwd, newPwd)` → Updates password

---

## 🌐 API Configuration

### **Base API Setup** (`src/components/config/baseAPI.js`)

```javascript
const BASE_URL = "http://localhost:4000"; 
// Or use deployed backend URL
// const BASE_URL = "https://your-backend-url.com";

export default BASE_URL;
```

**All API calls use this base URL with Axios**

---

## 🎨 Styling

### **Tailwind CSS**
- Global styles defined in `index.css`
- Component-specific styles in `styles/common.js`
- Responsive design with Tailwind utility classes

### **Common CSS Classes**:
- `pageBackground`, `pageWrapper` → Layout containers
- `primaryBtn`, `secondaryBtn` → Button styles
- `articleCardClass`, `articleGrid` → Article display styles
- `headingClass`, `bodyText` → Typography styles

---

## 🔄 Component Navigation Summary

| Page | Route | Role | Redirect From | Redirect To |
|------|-------|------|---------------|------------|
| Home | `/` | Public | - | `/register`, `/login`, or dashboard |
| Register | `/register` | Public | Home | `/login` |
| Login | `/login` | Public | Home or nav | Dashboard based on role |
| User Dashboard | `/user-profile` | USER | Login | `/article/:id` |
| Author Dashboard | `/author-profile` | AUTHOR | Login | `/author-profile/write-article`, `/author-profile/articles` |
| Admin Dashboard | `/admin-profile` | ADMIN | Login | - |
| Write Article | `/author-profile/write-article` | AUTHOR | Author Dashboard | `/author-profile/articles` |
| View Article | `/article/:id` | USER/AUTHOR | Dashboard | - |
| Unauthorized | `/unauthorized` | Any | Protected Routes | `/login` |

---

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React** | UI library |
| **Vite** | Fast build tool and dev server |
| **React Router** | Client-side routing |
| **Zustand** | State management |
| **Axios** | HTTP client for API calls |
| **React Hook Form** | Form validation and management |
| **React Hot Toast** | Notifications/toast messages |
| **Tailwind CSS** | Utility-first CSS framework |
| **JavaScript ES6+** | JavaScript runtime |

---

## 🚀 Deployment Guide

### **Deploy to Vercel** (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to `vercel.com` and sign in with GitHub
   - Import your repository
   - Set build command: `npm run build`
   - Set output directory: `dist`

3. **Environment Variables**
   - Add in Vercel dashboard:
     ```
     VITE_API_URL=<your-backend-deployed-url>
     ```

4. **Update base API URL** in `src/components/config/baseAPI.js`:
   ```javascript
   const BASE_URL = process.env.VITE_API_URL || "http://localhost:4000";
   ```

5. **Deploy** → Vercel automatically builds and deploys on push

### **Deploy to Vercel**

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy using Vercel**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Ensure backend CORS includes frontend URL |
| 401 Unauthorized | Check token in cookies, re-login |
| Article not loading | Verify article ID in URL |
| Image upload fails | Check Cloudinary configuration in backend |
| Protected routes redirect | Verify user role matches allowed roles |

---

## 📝 Notes

- All API requests include `withCredentials: true` for cookie-based authentication
- JWT tokens are stored in httpOnly cookies for security
- User roles: `USER`, `AUTHOR`, `ADMIN`
- Articles have `isArticleActive` flag for soft delete functionality
- Comments are populated with user email and first name for privacy

---

## 📞 Support

For issues or questions:
1. Check backend logs: `npm run dev` in backend folder
2. Check browser console for errors
3. Verify API configuration in `baseAPI.js`
4. Ensure backend is running and accessible

---

**Last Updated**: May 2026
**Version**: 1.0.0
