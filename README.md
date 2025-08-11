# Quote Management System

<a href="#" target="_blank"><img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" /></a>
<a href="#" target="_blank"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /></a>
<a href="#" target="_blank"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /></a>
<a href="#" target="_blank"><img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" /></a>
<a href="#" target="_blank"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" /></a>

![CI](https://github.com/difunk/NESTJS-APP/actions/workflows/ci.yml/badge.svg)

## About This Project

This project is a full-stack quote management system built for learning purposes. It demonstrates modern web development practices using NestJS for the backend and React for the frontend, featuring JWT authentication, TypeORM database integration, and RESTful API design.

It's a hands-on exploration of backend development with NestJS, database management with TypeORM, authentication strategies, and frontend-backend integration. 🚀

## Tech Stack

<ul>
  <li>NestJS - Backend framework</li>
  <li>React - Frontend library</li>
  <li>TypeScript - Type-safe development</li>
  <li>TypeORM - Database ORM</li>
  <li>SQLite - Database</li>
  <li>JWT - Authentication</li>
  <li>Vite - Frontend build tool</li>
  <li>Jest - Testing framework</li>
</ul>

## Features

<ul>
  <li>User authentication with JWT tokens</li>
  <li>CRUD operations for quotes and users</li>
  <li>Protected admin routes</li>
  <li>Database migrations with TypeORM</li>
  <li>RESTful API design</li>
  <li>Responsive React frontend</li>
  <li>Automated testing with Jest</li>
  <li>CI/CD pipeline with GitHub Actions</li>
</ul>

## Project Structure

- `src/`: NestJS backend application
  - `auth/`: Authentication module with JWT strategy
  - `users/`: User management module
  - `quotes/`: Quote management module
  - `migrations/`: Database migration files
- `quote-react-app/`: React frontend application
  - `src/components/`: React components
  - `src/types/`: TypeScript type definitions

## Setup

### Prerequisites

<ul>
<li><a href="https://git-scm.com/" rel="nofollow">Git</a></li>
<li><a href="https://nodejs.org/en" rel="nofollow">Node.js</a></li>
<li><a href="https://www.npmjs.com/" rel="nofollow">npm</a></li>
</ul>

### Installation

**Backend:**

```bash
npm install
```

**Frontend:**

```bash
cd quote-react-app
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
JWT_SECRET=your_secret_key_here
DB_TYPE=sqlite
DB_NAME=database.sqlite
```

### Database Setup

Run migrations to set up the database:

```bash
npm run migration:run
```

### Launch Project

**Start Backend (Development):**

```bash
npm run start:dev
```

**Start Frontend (Development):**

```bash
cd quote-react-app
npm run dev
```

The backend will be available at `http://localhost:3232` and the frontend at `http://localhost:5173`.

## API Endpoints

- `GET /quotes` - Get all quotes
- `GET /quotes/random` - Get random quote(s)
- `POST /quotes` - Create new quote (protected)
- `POST /auth/login` - User login
- `POST /users` - Register new user
- `GET /users` - Get all users (protected)

## Testing

Run tests for the backend:

```bash
npm test
```

## License

MIT
