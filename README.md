# Simple Survey API

This is the backend API for the **Simple Survey** application built using **Node.js**, **Express**, and **PostgreSQL**. It handles the creation, storage, and retrieval of survey questions, user responses, and uploaded certificate files.

---

## 🧠 Project Overview

This API serves:
- Dynamic survey questions with optional choices
- File uploads (certificates)
- User responses to the survey

The system is designed with extensibility and flexibility in mind.

---

## 📁 Project Structure

```
simple-survey-api/
├── config/            # Database configuration (Sequelize)
│   └── db.js
├── models/            # Sequelize models
│   ├── index.js       # Associations
│   ├── User.js
│   ├── Question.js
│   ├── Option.js
│   ├── Response.js
│   └── Certificate.js
├── routes/            # API route handlers
├── controllers/       # Business logic (optional structure)
├── tests/             # Automated test files
├── .env               # Environment variables
├── seed.js            # Seed initial questions and options
├── ERD.png            # Entity Relationship Diagram
├── sky_survey_db.sql  # PostgreSQL database schema
├── postman_collection.json # Postman collection for testing
├── package.json       # Node dependencies and scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL (Make sure it's running locally or accessible remotely)

### Environment Variables
Create a `.env` file in the root directory:

```env
DB_NAME=sky_survey_db
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
NODE_ENV=development
```

### Install dependencies
```bash
npm install
```

### Database Setup
1. Create the database:
   ```bash
   createdb sky_survey_db
   ```

2. Run migrations (if using Sequelize CLI), or let Sequelize auto sync models:
   ```bash
   node seed.js
   ```
   This will seed the survey questions and options.

### Start the server
```bash
npm start
```

Server will be running on: `http://localhost:5000`

---

## 🧪 Testing
```bash
npm test
```
Runs automated tests using your configured test environment.

---

## 📬 API Endpoints (Examples)
- `GET /questions` - Fetch all questions
- `POST /responses` - Submit a user response
- `POST /certificates` - Upload certificates (PDF)

Refer to the Postman collection: `postman_collection.json`

---

## 🧩 ERD Diagram
See `ERD.png` for the full Entity Relationship Diagram.

---

## 🌐 Deployment

This API has been deployed using [Render](https://render.com/).

Visit the deployed frontend client:
👉 **[https://simple-survey-client.onrender.com/](https://simple-survey-client.onrender.com/)**

Ensure you set environment variables on Render just as you would in your `.env` file.

---

## 👤 Author
**Sammy Obonyo Barasa**

---

## 📝 License
This project is for educational and demonstration purposes only.

