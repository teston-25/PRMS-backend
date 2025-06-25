[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.0+-green.svg)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

A comprehensive RESTful API for healthcare data management, providing secure patient record management, appointment scheduling, and medical history tracking with role-based access control .

## 🏥 Features

### Core Healthcare Management
- **Patient Management** - Complete CRUD operations with demographic tracking 
- **Appointment Scheduling** - Status-based appointment workflow management  
- **Medical History** - Comprehensive diagnosis and treatment record keeping  
- **User Authentication** - JWT-based authentication with password reset functionality 

### Security & Compliance
- **Role-Based Access Control** - Four-tier permission system (admin, staff, doctor, user) 
- **Rate Limiting** - API protection with configurable request limits
- **Audit Logging** - Comprehensive activity tracking for compliance  
- **Data Validation** - Mongoose schema validation with custom error handling 

### Developer Experience
- **Interactive API Documentation** - Swagger UI at `/api-docs` endpoint  
- **Comprehensive Error Handling** - Centralized error processing  
- **Request Logging** - Morgan middleware for HTTP request tracking  

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 4.0+
- npm or yarn package manager

### Installation

1. **Clone the repository**
   bash
   git clone https://github.com/testoInstall dependencies cd PRMS-backend
2. **Install dependencies**
   bash
   npm install

3. **Environment Configuration**
   Create a `config.env` file in the root directory:
   env
   DATABASE=mongodb+srv://username:<PASSWORD>@cluster.mongodb.net/prms
   DATABASE_PASSWORD=your_database_password
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=90dStart the serverly@prms.com
   PORT=5000

4. **Start the server**
   bash
   # Development mode
   npm start
   
   # Production mode  
   npm run start:prod
   
The server will start on `http://localhost:5000` with database connection established .

## 📚 API Documentation

Access the interactive Swagger documentation at: `http://localhost:5000/api-docs`

### Core API Endpoints

| Endpoint | Method | Description | Access Level |
|----------|--------|-------------|--------------|
| `/api/auth/signin` | POST | User authentication | Public |
| `/api/patient` | GET/POST | Patient management | Admin, Staff |
| `/api/appointments` | GET/POST | Appointment scheduling | All authenticated |
| `/api/profile/me` | GET/PATCH | User profile management | All authenticated |
| `/api/reports/summary` | GET | System analytics | Admin, Staff, Doctor |

## 🏗️ Architecture

### Technology Stack
- **Runtime**: Node.js with Express.js framework 
- **Database**: MongoDB with Mongoose ODM  
- **Authentication**: JWT tokens with bcrypt password hashing  
- **Documentation**: Swagger UI with OpenAPI specification  

### Project Structure
PRMS-backend/
├── controllers/          # Business logic handlers
├── models/              # Mongoose data models  
├── routes/              # API route definitions
├── middleware/          # Custom middleware functions
├── utils/               # Utility functions and helpers
├── app.js              # Express application setup
├── server.js           # Server entry point
User Modelon        # Project dependencies
`

### Data ModelPatient Model* - Healthcare staff with role-based permissions
- **PatAppointment Modelt demographics with virtual age calculation 
- *History Modell** - Scheduling with status workflow management
-AuditLog Model - Medical records with audit trail integration
- **AuditLog Model** - System activity tracking for compliance

## 🔐 Security Features

nodejs.org (https://nodejs.org/)
Node.js — Run JavaScript Everywhere
Node.js® is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.

### Authentication & Authorization
- JWT-based stateless authentication
- Role-based access control matrix
- Password reset with email verification
- Account activation/deactivation controls

### API Protection
- Rate limiting: 100 requests/hour for general API, 10 requests/hour for authentication 
- Request validation and sanitization
- CORS configuration for cross-origin requests
- Comprehensive audit logging for all state changes

## 🧪 Development

### Available Scripts
npm start          # Start production server
npm run start:prod # Start with production environment variables
### Development Tools
- nodemon - Auto-restart server during development  
- morgan - HTTP request logging in development mode
- dotenv - Environment variable management

## 📊 Role-Based Access Control

| Role | Patient Mgmt | Appointments | Medical History | User Mgmt | Reports |
|------|:------------:|:------------:|:---------------:|:---------:|:-------:|
| Admin | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| Staff | ✅ Full | ✅ Full | ✅ CRUD | ✅ Limited | ✅ View |
| Doctor | ✅ View | ✅ Assigned | ✅ CRUD | ❌ None | ✅ View |
| User | ✅ Own Profile | ✅ Own Only | ❌ None | ❌ None | ❌ None |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request
   

   
