# Full Stack Web Application

This project is a full-stack web application consisting of a React frontend (`dashboard/`) and a Node.js + Express backend (`backend/`). The backend serves APIs, and the frontend consumes them.

---

## 📁 Folder Structure
project-root/
├── backend/
│   ├── .env               # Environment variables (not committed)
│   ├── package.json       # Backend dependencies and scripts
│   ├── index.js           # Entry point of Express server
│   ├── config/            # DB config, JWT config, etc.
│   ├── controllers/       # Route handler functions
│   ├── models/            # Mongoose/Sequelize models (DB schemas)
│   ├── routes/            # Express route definitions
│   ├── middlewares/       # Auth middleware, error handling, etc.
│   ├── utils/             # Utility/helper functions
│   └── services/          # External service logic (e.g., payment, mail)
│
├── dashboard/
│   ├── .env               # Frontend environment variables (not committed)
│   ├── package.json       # Frontend dependencies and scripts
│   ├── public/            # Static assets (index.html, icons, etc.)
│   ├── src/
│   │   ├── index.js       # Entry point
│   │   ├── App.js         # Root component
│   │   ├── assets/        # Images, fonts, logos, etc.
│   │   ├── components/    # Reusable UI components (Button, Navbar, etc.)
│   │   ├── pages/         # Page components (Home, Dashboard, Login, etc.)
│   │   ├── services/      # API logic (axios functions, etc.)
│   │   ├── hooks/         # Custom React hooks (optional)
│   │   ├── context/       # Global state providers (AuthContext, etc.)
│   │   └── styles/        # CSS or Tailwind config (optional)
│
├── .gitignore             # Ignore .env, node_modules, build folders, etc.
├── README.md              # Project overview and setup guide


---

## 🛠️ Tech Stack

| Layer    | Tech                     |
|----------|--------------------------|
| Frontend | React, Axios             |
| Backend  | Node.js, Express         |
| DB       | MySQL     |
| Styling  | Tailwind CSS |
| Auth     | JWT                      |
| Config   | Dotenv                   |

---

## ✅ Getting Started

### 🔧 Backend Setup

```bash
# Go to backend folder
cd backend

# Install dependencies
npm install
```
```bash
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```
```bash
npm run dev
# OR
node index.js
```
```bash
# Go to dashboard folder
cd ../dashboard

# Install dependencies
npm install
```
```bash
REACT_APP_API_URL=http://localhost:5000/api

```

```bash
npm start

```

```bash
# Ignore environment files
*.env

```
