# PRMS Backend

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)  
[![Express](https://img.shields.io/badge/Express-5.1.0-blue.svg)](https://expressjs.com/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-4.0+-green.svg)](https://mongodb.com/)  
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

A comprehensive RESTful API for healthcare data management, providing secure patient record management, appointment scheduling, medical history tracking, and invoicing with role-based access control.

---

## 🏥 Features

### Core Healthcare Management

- **Patient Management** — Complete CRUD operations with demographic tracking and virtual age calculation
- **Appointment Scheduling** — Status-based workflow (pending → confirmed → completed/cancelled) with daily limits
- **Medical History** — Diagnosis, treatment, and medication record keeping per patient
- **Invoicing** — Service-based billing tied to medical history records
- **User Authentication** — JWT-based authentication with password reset via email

### Security & Compliance

- **Role-Based Access Control** — Four-tier permission system (admin, staff, doctor, user)
- **Rate Limiting** — API protection with configurable request limits
- **Audit Logging** — Activity tracking for all state-changing operations
- **Data Validation** — Mongoose schema validation with custom error messages

### Developer Experience

- **Interactive API Documentation** — Swagger UI at `/api-docs`
- **Centralized Error Handling** — Consistent error responses in dev and production
- **Request Logging** — Morgan middleware for HTTP request tracking

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB 4.0+ (or a MongoDB Atlas cluster)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/teston-25/PRMS-backend.git
   cd PRMS-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `config.env` file in the root directory:

   ```env
   DATABASE=mongodb+srv://username:<PASSWORD>@cluster.mongodb.net/prms
   DATABASE_PASSWORD=your_database_password
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=90d
   PORT=5000
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=your_email_app_password
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the server**

   ```bash
   # Development mode
   npm start

   # Production mode
   npm run start:prod
   ```

The server will start on `http://localhost:5000` with database connection established.

---

## ⚙️ Environment Variables

| Variable            | Required | Description                                                   |
| ------------------- | -------- | ------------------------------------------------------------- |
| `DATABASE`          | Yes      | MongoDB connection string (use `<PASSWORD>` as placeholder)   |
| `DATABASE_PASSWORD` | Yes      | MongoDB password (replaces `<PASSWORD>` in connection string) |
| `JWT_SECRET`        | Yes      | Secret key for signing JWT tokens                             |
| `JWT_EXPIRES_IN`    | Yes      | Token expiration duration (e.g., `90d`, `1d`)                 |
| `PORT`              | No       | Server port (defaults to `5000`)                              |
| `EMAIL_USERNAME`    | Yes      | Gmail address for sending password reset emails               |
| `EMAIL_PASSWORD`    | Yes      | Gmail app password for nodemailer                             |
| `FRONTEND_URL`      | Yes      | Frontend URL used in password reset links                     |

---

## 📚 API Documentation

Access the interactive Swagger documentation at: `http://localhost:5000/api-docs`

### Authentication

| Endpoint                          | Method | Description                  | Access |
| --------------------------------- | ------ | ---------------------------- | ------ |
| `/api/auth/signup`                | POST   | Register a new user          | Public |
| `/api/auth/signin`                | POST   | Login and receive JWT token  | Public |
| `/api/auth/forgot-password`       | POST   | Request password reset email | Public |
| `/api/auth/reset-password/:token` | PATCH  | Reset password with token    | Public |

### Patients

| Endpoint              | Method | Description              | Access                     |
| --------------------- | ------ | ------------------------ | -------------------------- |
| `/api/patient`        | GET    | List all patients        | Admin, Staff               |
| `/api/patient`        | POST   | Register a new patient   | Admin, Staff               |
| `/api/patient/:id`    | GET    | Get a single patient     | Admin, Staff, Doctor, User |
| `/api/patient/:id`    | PATCH  | Update patient details   | Admin, Staff               |
| `/api/patient/:id`    | DELETE | Delete a patient         | Admin, Staff               |
| `/api/patient/search` | GET    | Search patients by query | Admin, Staff               |

### Appointments

| Endpoint                            | Method | Description                    | Access             |
| ----------------------------------- | ------ | ------------------------------ | ------------------ |
| `/api/appointments`                 | GET    | List all appointments          | Admin, Staff       |
| `/api/appointments`                 | POST   | Create an appointment          | Admin, Staff       |
| `/api/appointments/today`           | GET    | Get today's appointments       | Admin, Staff       |
| `/api/appointments/by-date`         | GET    | Get appointments by date range | Admin, Staff       |
| `/api/appointments/:id`             | GET    | Get appointment by ID          | Admin, Staff       |
| `/api/appointments/:id`             | PATCH  | Update an appointment          | Admin, Staff       |
| `/api/appointments/:id`             | DELETE | Delete an appointment          | Admin, Staff       |
| `/api/appointments/:id/status`      | PATCH  | Update appointment status      | Doctor, Staff      |
| `/api/appointments/my-appointments` | GET    | Get my assigned appointments   | Doctor, Staff      |
| `/api/appointments/today/my`        | GET    | Get my today's appointments    | Doctor, Staff      |
| `/api/appointments/patient/:id`     | GET    | Get appointments by patient    | Admin, Staff, User |

### Medical History

| Endpoint                    | Method | Description                   | Access               |
| --------------------------- | ------ | ----------------------------- | -------------------- |
| `/api/patients/:id/history` | GET    | Get patient's medical history | All authenticated    |
| `/api/patients/:id/history` | POST   | Add medical history entry     | Doctor, Staff, Admin |
| `/api/history/:id`          | PATCH  | Update a history entry        | Doctor, Staff, Admin |
| `/api/history/:id`          | DELETE | Delete a history entry        | Staff, Admin         |

### Invoices

| Endpoint                | Method | Description          | Access       |
| ----------------------- | ------ | -------------------- | ------------ |
| `/api/invoices`         | GET    | List invoices        | Admin, Staff |
| `/api/invoices`         | POST   | Create an invoice    | Doctor       |
| `/api/invoices/:id/pay` | PATCH  | Mark invoice as paid | Staff        |

### User Management

| Endpoint         | Method | Description             | Access       |
| ---------------- | ------ | ----------------------- | ------------ |
| `/api/users`     | GET    | List all users          | Admin, Staff |
| `/api/users/:id` | GET    | Get user by ID          | Admin, Staff |
| `/api/users/:id` | PATCH  | Update user role/status | Admin        |
| `/api/users/:id` | DELETE | Delete a user           | Admin        |

### Profile

| Endpoint          | Method | Description                   | Access            |
| ----------------- | ------ | ----------------------------- | ----------------- |
| `/api/profile/me` | GET    | Get current user's profile    | All authenticated |
| `/api/profile/me` | PATCH  | Update current user's profile | All authenticated |

### Reports

| Endpoint                            | Method | Description                  | Access               |
| ----------------------------------- | ------ | ---------------------------- | -------------------- |
| `/api/reports/summary`              | GET    | System summary statistics    | Admin, Staff, Doctor |
| `/api/reports/appointments-by-date` | GET    | Appointments grouped by date | Admin, Staff, Doctor |
| `/api/reports/frequent-diagnoses`   | GET    | Most frequent diagnoses      | Admin, Staff, Doctor |

### Audit Logs

| Endpoint          | Method | Description                       | Access |
| ----------------- | ------ | --------------------------------- | ------ |
| `/api/audit-logs` | GET    | View recent audit logs (last 100) | Admin  |

---

## 🏗️ Architecture

### Technology Stack

- **Runtime**: Node.js with Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Email**: Nodemailer with Gmail SMTP
- **Documentation**: Swagger UI with OpenAPI specification

### Project Structure

```
PRMS-backend/
├── controllers/          # Request handlers (business logic)
│   ├── authController.js
│   ├── patientController.js
│   ├── appointmentsController.js
│   ├── historyController.js
│   ├── invoiceController.js
│   ├── profileController.js
│   ├── reportController.js
│   ├── userController.js
│   └── errorController.js
├── models/               # Mongoose schemas and models
│   ├── userModel.js
│   ├── patientsModel.js
│   ├── appointmentsModel.js
│   ├── historyModel.js
│   ├── invoiceModel.js
│   └── auditLogModel.js
├── routes/               # API route definitions
│   ├── authRoutes.js
│   ├── patientRoutes.js
│   ├── appointmentRoutes.js
│   ├── historyRoutes.js
│   ├── invoiceRoutes.js
│   ├── profileRoutes.js
│   ├── reportRoutes.js
│   ├── userRoutes.js
│   └── auditRoutes.js
├── middleware/            # Custom middleware
│   ├── protect.js        # JWT auth & role-based access
│   ├── catchAsync.js     # Async error wrapper
│   └── rateLimiter.js    # Rate limiting config
├── utils/                # Utility functions
│   ├── appError.js       # Custom error class
│   ├── tokenGen.js       # JWT token generator
│   ├── emailSender.js    # Nodemailer email utility
│   ├── emailVerify.js    # Email verification
│   ├── logAction.js      # Audit log helper
│   ├── swagger.js        # Swagger/OpenAPI config
│   └── date.js           # Date utilities
├── app.js                # Express app setup & middleware
├── server.js             # Server entry point & DB connection
├── config.env            # Environment variables (not committed)
└── package.json          # Project dependencies & scripts
```

### Data Models

- **User** — Healthcare staff and patients with role-based permissions (`admin`, `staff`, `doctor`, `user`)
- **Patient** — Patient demographics with virtual age calculation and appointment references
- **Appointment** — Scheduling with status workflow (`pending` → `confirmed` → `completed`/`cancelled`)
- **History** — Medical records (diagnosis, treatment, medications) linked to patients
- **Invoice** — Billing records tied to medical history with service line items
- **AuditLog** — System activity tracking with polymorphic target references

---

## 🔐 Security Features

### Authentication & Authorization

- JWT-based stateless authentication
- Role-based access control on every endpoint
- Password hashing with bcrypt (salt rounds: 12)
- Password reset via email with time-limited tokens (10 minutes)
- Account activation/deactivation controls

### API Protection

- Rate limiting: 100 requests/hour for general API, 10 requests/hour for authentication
- CORS configuration restricted to allowed origins
- Centralized validation error handling
- Comprehensive audit logging for all state-changing operations

---

## 📊 Role-Based Access Control

| Role   | Patient Mgmt | Appointments  | Medical History |     Invoices     | User Mgmt | Reports | Audit Logs |
| ------ | :----------: | :-----------: | :-------------: | :--------------: | :-------: | :-----: | :--------: |
| Admin  |  Full CRUD   |   Full CRUD   |    Full CRUD    |       View       | Full CRUD |  View   |    View    |
| Staff  |  Full CRUD   |   Full CRUD   |      CRUD       | View + Mark Paid |   View    |  View   |     —      |
| Doctor |     View     | Assigned Only |      CRUD       |      Create      |     —     |  View   |     —      |
| User   | Own Profile  |   Own Only    |        —        |        —         |     —     |    —    |     —      |

---

## 🧪 Development

### Available Scripts

```bash
npm start            # Start server with node
npm run start:prod   # Start with NODE_ENV=production
npm test             # Run test suite (requires jest + supertest)
```

### Development Tools

- **nodemon** — Auto-restart server on file changes
- **morgan** — HTTP request logging in development mode
- **dotenv** — Environment variable management from `config.env`
- **swagger-ui-express** — Interactive API documentation

---

## 📝 API Response Format

### Success Response

```json
{
  "status": "success",
  "message": "Operation description",
  "data": {}
}
```

### Error Response

```json
{
  "status": "fail",
  "message": "Human-readable error description"
}
```

### Validation Error

```json
{
  "status": "fail",
  "message": "Invalid input data. [field-specific details]"
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.
