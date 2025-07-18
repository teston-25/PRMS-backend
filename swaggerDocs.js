// AI based documentation for current working api

// ##################################################   authRoute ###############################################

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints for signup and signin
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: securePassword123
 *               role:
 *                 type: string
 *                 enum: [admin, doctor, receptionist]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 */

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Send a password reset token to the user's email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Token sent to email
 *       404:
 *         description: No user with that email
 *       500:
 *         description: Error sending email
 */

/**
 * @swagger
 * /api/auth/reset-password/{token}:
 *   patch:
 *     summary: Reset the user's password using the token sent via email
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Password reset token from email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: newPassword789
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Token is invalid or expired
 */

// ##################################################   appointmentRoute  ###############################################

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Scheduling and retrieving appointments
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all appointments
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Add a new appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patient
 *               - date
 *               - doctor
 *               - reason
 *             properties:
 *               patient:
 *                 type: object
 *                 description: Patient information
 *                 properties:
 *                   fullName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               doctor:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment created
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/appointments/patient/{id}:
 *   get:
 *     summary: Get appointments by patient ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of appointments for the patient
 *       404:
 *         description: Patient or appointments not found
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Get a specific appointment by ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment by ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Appointment ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Appointment deleted
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /api/appointments/{id}:
 *   patch:
 *     summary: Update an appointment (reschedule, notes, etc.)
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               doctor:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /api/appointments/today:
 *   get:
 *     summary: Get today's appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of today's appointments
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/appointments/by-date:
 *   get:
 *     summary: Get appointments for a specific date
 *     tags: [Appointments]
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Date to filter appointments (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of appointments on the specified date
 *       400:
 *         description: Invalid or missing date query
 */

/**
 * @swagger
 * /api/appointments/my-appointments:
 *   get:
 *     summary: Get appointments assigned to the logged-in doctor/staff
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of appointments for the current user
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/appointments/{id}/status:
 *   patch:
 *     summary: Update appointment status (Doctor/Staff only for their own appointments)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID to update status for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, completed, cancelled]
 *     responses:
 *       200:
 *         description: Appointment status updated successfully
 *       403:
 *         description: Not authorized to update this appointment
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * /api/appointments/today/my:
 *   get:
 *     summary: Get today's appointments assigned to the logged-in user
 *     description: Retrieves up to 10 appointments scheduled for today for the currently authenticated user (doctor or staff).
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of today's appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: object
 *                   properties:
 *                     appointments:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: No appointments for you today
 *       401:
 *         description: Unauthorized – missing or invalid token
 */

// ##################################################   historyRoutes  ###############################################

/**
 * @swagger
 * tags:
 *   name: Medical History
 *   description: 'Operations related to patient medical history'
 */

/**
 * @swagger
 * /api/patients/{id}/history:
 *   get:
 *     summary: Get all medical history for a patient
 *     tags: [Medical History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: A list of medical history entries
 *       404:
 *         description: No history found
 */

/**
 * @swagger
 * /api/patients/{id}/history:
 *   post:
 *     summary: Add a medical history record for a patient
 *     tags: [Medical History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diagnosis:
 *                 type: string
 *               treatment:
 *                 type: string
 *               medication:
 *                 type: array
 *                 items:
 *                   type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: History entry created
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/history/{id}:
 *   patch:
 *     summary: Update a specific medical history record
 *     tags: [Medical History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medical History ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diagnosis:
 *                 type: string
 *               treatment:
 *                 type: string
 *               medication:
 *                 type: array
 *                 items:
 *                   type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: History record updated
 *       404:
 *         description: Record not found
 */

/**
 * @swagger
 * /api/history/{id}:
 *   delete:
 *     summary: Delete a medical history record
 *     tags: [Medical History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Medical History ID
 *     responses:
 *       204:
 *         description: Record deleted successfully
 *       404:
 *         description: Record not found
 */

// ##################################################   patientRoute  ###############################################

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: CRUD and information about patients
 */

/**
 * @swagger
 * /patient:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: A list of all patients
 */

/**
 * @swagger
 * /api/patient/{id}:
 *   get:
 *     summary: Get a single patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient found
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * /api/patient:
 *   post:
 *     summary: Add a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phone
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *               dob:
 *                 type: string
 *                 format: date
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Patient created
 *       400:
 *         description: Invalid input
 */
/**
 * @swagger
 * /api/patient/{id}:
 *   patch:
 *     summary: Update a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Patient updated
 *       404:
 *         description: Patient not found
 */
/**
 * @swagger
 * /api/patient/{id}:
 *   delete:
 *     summary: Delete a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       204:
 *         description: Patient deleted
 *       404:
 *         description: Patient not found
 */
/**
 * @swagger
 * /api/search/{query}:
 *   get:
 *     summary: get a patient by name, email or phone
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient name, email or phone
 *     responses:
 *       200:
 *         description: Patient Found
 *       404:
 *         description: Patient not found
 */

// ##################################################   profileRoute  ###############################################

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: API for accessing and updating user profiles
 */

/**
 * @swagger
 * /api/profile/me:
 *   get:
 *     summary: Get current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved profile
 *       401:
 *         description: Unauthorized (missing or invalid token)
 */

/**
 * @swagger
 * /api/profile/me:
 *   patch:
 *     summary: Update current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/profile/change-password:
 *   patch:
 *     summary: Change current user's password
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: currentPassword123
 *               newPassword:
 *                 type: string
 *                 example: newSecurePassword456
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Please provide current and new password
 *       401:
 *         description: Your current password is incorrect
 */

// ##################################################   reportRoute  ###############################################

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description:   Endpoints for generating audit and analytics reports
 */

/**
 * @swagger
 * /api/reports/summary:
 *   get:
 *     tags:
 *       - Reports
 *     summary: Get summary report of total patients and appointments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Summary data with totals and recent appointments
 */

/**
 * @swagger
 * /api/reports/appointments-by-date:
 *   get:
 *     tags:
 *       - Reports
 *     summary: Get appointments within a specific date range
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Appointments found in the specified date range
 *       400:
 *         description: Missing or invalid date parameters
 *       404:
 *         description: No appointments found in that date range
 */

/**
 * @swagger
 * /api/reports/frequent-diagnoses:
 *   get:
 *     tags:
 *       - Reports
 *     summary: Get most frequent diagnoses from patient histories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of top diagnoses with occurrence counts
 *       404:
 *         description: No diagnosis data found
 */

// ##################################################   adminUser  ###############################################

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 5f8d0d55b54764421b7156da
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: john@example.com
 *         role:
 *           type: string
 *           enum: [admin, staff, doctor, user]
 *           example: user
 *         active:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-01-01T00:00:00.000Z
 *     UserUpdate:
 *       type: object
 *       properties:
 *         role:
 *           type: string
 *           enum: [admin, staff, doctor, user]
 *           example: doctor
 *           description: New user role (optional)
 *         active:
 *           type: boolean
 *           example: false
 *           description: Account status (optional)
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user role and/or status
 *     description: |
 *       Update user properties (role and/or active status).
 *       Requires admin privileges.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *           examples:
 *             roleUpdate:
 *               summary: Update role only
 *               value:
 *                 role: doctor
 *             statusUpdate:
 *               summary: Update status only
 *               value:
 *                 active: false
 *             bothUpdate:
 *               summary: Update both role and status
 *               value:
 *                 role: staff
 *                 active: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User role and status updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       403:
 *         description: Forbidden (insufficient permissions)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get user details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 *
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [admin, staff, doctor, user]
 *         description: Filter by role
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: error
 *         message:
 *           type: string
 *           example: Invalid role specified
 *         stack:
 *           type: string
 *           example: Error: Invalid role...
 */

// ##################################################   Invoices  ###############################################

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Dental clinic invoice management
 */

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Get all invoices
 *     description: Retrieve a list of all invoices (accessible to authenticated users)
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/invoices:
 *   post:
 *     summary: Create a new invoice
 *     description: Create a new invoice (doctor role required)
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvoiceInput'
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (doctor role required)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/invoices/{id}/pay:
 *   patch:
 *     summary: Mark invoice as paid
 *     description: Update invoice payment status (staff role required)
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The invoice ID
 *     responses:
 *       200:
 *         description: Invoice marked as paid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (staff role required)
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal server error
 */

// ##################################################   audit log  ###############################################

/**
 * @swagger
 * tags:
 *   name: Audit Logs
 *   description: Access to audit logs (admin only)
 */

/**
 * @swagger
 * /api/audit-logs:
 *   get:
 *     summary: Get the latest audit logs
 *     description: Retrieve up to the 100 most recent audit logs. Only accessible by admin users.
 *     tags: [Audit Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of audit logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 42
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       action:
 *                         type: string
 *                         example: Create Patient
 *                       user:
 *                         type: string
 *                         example: 60f1c2e8f14d0c001c9e4d8a
 *                       targetType:
 *                         type: string
 *                         example: Patient
 *                       targetId:
 *                         type: string
 *                         example: 65fc1b4a03f8a9d4723f3a12
 *                       details:
 *                         type: object
 *                         example: { patientName: "John Doe" }
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-06-01T14:48:00.000Z
 *       401:
 *         description: Unauthorized - no token provided
 *       403:
 *         description: Forbidden - not an admin
 */
