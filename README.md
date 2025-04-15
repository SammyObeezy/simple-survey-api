# Simple Survey API

This is the backend API for the **Simple Survey** application built using **Node.js**, **Express**, and **PostgreSQL**. It handles the creation, storage, and retrieval of survey questions, user responses, and uploaded certificate files.

---

## 🧠 Project Overview

This API serves:
- Dynamic survey questions with optional choices
- File uploads (certificates)
- User responses to the survey
- Pagination and filtering of survey responses
- Certificate file downloads

The system is designed with extensibility and flexibility in mind.

---

## 📁 Project Structure

```
simple-survey-api/
├── config/                              # Database configuration (Sequelize)
│   └── db.js
├── models/                              # Sequelize models
│   ├── index.js                         # Associations
│   ├── User.js
│   ├── Question.js
│   ├── Option.js
│   ├── Response.js
│   └── Certificate.js
├── routes/                              # API route handlers
├── controllers/                         # Business logic (optional structure)
├── tests/                               # Automated test files
├── uploads/                             # Uploaded certificate files
├── .env                                 # Environment variables
├── seed.js                              # Seed initial questions and options
├── ERD.png                              # Entity Relationship Diagram
├── sky_survey_db.sql                    # PostgreSQL database schema
├── Sky_survey.postman_collection.json   # Postman collection for testing
├── package.json                         # Node dependencies and scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL (Make sure it's running locally or accessible remotely)

### Environment Variables
Create a .env file in the root directory:

env
DB_NAME=sky_survey_db
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres
NODE_ENV=development

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

Server will be running on: http://localhost:5000

---

## 🧪 Testing

```bash
npm test
```

Runs automated tests using your configured test environment.

---

## 📬 API Endpoints

### 1. Get All Questions
- **URL**: /api/questions
- **Method**: GET
- **Response Format** (XML-like structure):

```xml
<questions>
  <question name="full_name" type="short_text" required="yes">
    <text>What is your full name?</text>
    <description>[Surname] [First Name] [Other Names]</description>
  </question>
  <question name="email_address" type="email" required="yes">
    <text>What is your email address?</text>
    <description/>
  </question>
  <question name="description" type="long_text" required="yes">
    <text>Tell us a bit more about yourself</text>
    <description/>
  </question>
  <question name="gender" type="choice" required="yes">
    <text>What is your gender?</text>
    <description/>
    <options multiple="no">
      <option value="MALE">Male</option>
      <option value="FEMALE">Female</option>
      <option value="OTHER">Other</option>
    </options>
  </question>
  <question name="programming_stack" type="choice" required="yes">
    <text>What programming stack are you familiar with?</text>
    <description>You can select multiple</description>
    <options multiple="yes">
      <option value="REACT">React JS</option>
      <option value="ANGULAR">Angular JS</option>
      <option value="VUE">Vue JS</option>
      <option value="SQL">SQL</option>
      <option value="POSTGRES">Postgres</option>
      <option value="MYSQL">MySQL</option>
      <option value="MSSQL">Microsoft SQL Server</option>
      <option value="Java">Java</option>
      <option value="PHP">PHP</option>
      <option value="GO">Go</option>
      <option value="RUST">Rust</option>
    </options>
  </question>
  <question name="certificates" type="file" required="yes">
    <text>Upload any of your certificates?</text>
    <description>You can upload multiple (.pdf)</description>
    <file_properties format=".pdf" max_file_size="1" max_file_size_unit="mb" multiple="yes"/>
  </question>
</questions>
```

---

### 2. Submit Responses
- **URL**: /api/questions/responses
- **Method**: PUT
- **Body**: multipart/form-data (with certificates as file inputs)

**Example JSON Response**:

```xml
<question_response>
  <full_name>Jane Doe</full_name>
  <email_address>janedoe@gmail.com</email_address>
  <description>I am an experienced FrontEnd Engineer with over 6 years experience.</description>
  <gender>MALE</gender>
  <programming_stack>REACT,VUE</programming_stack>
  <certificates>
    <certificate>Adobe Certification 19-08-2023.pdf</certificate>
    <certificate>Figma Fundamentals 19-08-2023.pdf</certificate>
  </certificates>
  <date_responded>2023-09-23 12:30:12</date_responded>
</question_response>
```

---

### 3. Get All Responses
- **URL**: /api/questions/responses
- **Method**: GET
- **Query Params**:
  - page - page number
  - email_address - filter responses by email

**Example Response**:

```xml
<question_responses current_page="1" last_page="1" page_size="10" total_count="2">
  <question_response>
    <response_id>1</response_id>
    <full_name>John Doe</full_name>
    <email_address>johndoe@gmail.com</email_address>
    <description>I am an experienced FullStack Engineer with over 2 years experience.</description>
    <gender>MALE</gender>
    <programming_stack>REACT,JAVA,SQL,POSTGRES</programming_stack>
    <certificates>
      <certificate id="1">Oracle Java Certification 19-08-2023.pdf</certificate>
      <certificate id="2">Oracle SQL Certification 19-08-2023.pdf</certificate>
    </certificates>
    <date_responded>2023-09-21 12:30:12</date_responded>
  </question_response>
  <question_response>
    <response_id>2</response_id>
    <full_name>Jane Doe</full_name>
    <email_address>janedoe@gmail.com</email_address>
    <description>I am an experienced FrontEnd Engineer with over 6 years experience.</description>
    <gender>MALE</gender>
    <programming_stack>REACT,VUE</programming_stack>
    <certificates>
      <certificate id="3">Adobe Certification 19-08-2023.pdf</certificate>
      <certificate id="4">Figma Fundamentals 19-08-2023.pdf</certificate>
    </certificates>
    <date_responded>2023-09-23 12:30:12</date_responded>
  </question_response>
</question_responses>
```

---

### 4. Download Certificate by ID
- **URL**: /api/questions/responses/certificates/{id}
- **Method**: GET
- **Description**: Downloads a specific certificate PDF by its ID

---

## 📂 Postman Collection
A full Postman collection is included: postman_collection.json

It documents:
- All endpoints
- Sample requests and responses
- File uploads via form-data
- Filtering and pagination features

---

## 🧩 ERD Diagram
See ERD.png for the full Entity Relationship Diagram.

---

## 🌐 Deployment

This API has been deployed using [Render](https://render.com/).

Visit the deployed backend server:
👉 **[https://simple-survey-api-1.onrender.com](https://simple-survey-api-1.onrender.com)**

Ensure you set environment variables on Render just as you would in your .env file.

---

## 👤 Author
**Sammy Obonyo Barasa**

---

## 📝 License
This project is for educational and demonstration purposes only.

