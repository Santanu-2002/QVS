# Task Management Application

A full stack task management app built with React.js and Node.js. Users can register, log in, and manage their tasks with full CRUD support and status filtering.

---

## Tech Stack

**Frontend**
- React.js
- React Router DOM
- Context API
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- bcryptjs

---

## Features

- Register and login with JWT authentication
- Dashboard showing all tasks with status
- Create, update, and delete tasks
- Filter tasks by status — Pending, In Progress, Completed
- Responsive UI

---

## Project Structure

```
task-track/
├── client/         # React frontend
└── server/         # Node.js backend
```

---

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas account (or use the provided URI)

---

### Backend Setup

```bash
cd server
npm install
npm start
```

Server runs on `http://localhost:5000`

The `.env` file is already included with the MongoDB URI and JWT secret.

---

### Frontend Setup

Open a new terminal:

```bash
cd client
npm install
npm start
```

App runs on `http://localhost:3000`

The frontend proxies API requests to `http://localhost:5000` automatically.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks?status=Pending` | Filter tasks by status |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

All task routes require a valid JWT token in the `Authorization` header.

---

## Cautions

- JWT token is stored in localStorage
- All task routes are protected and require the user to be logged in
- Tasks belong to the logged in user only
- Status values are fixed: `Pending`, `In Progress`, `Completed`
- I have used my own MongoDB Atlas cluster for the database. To test with your own database, replace the `MONGO_URI` value in `server/.env` with your own MongoDB Atlas connection string
