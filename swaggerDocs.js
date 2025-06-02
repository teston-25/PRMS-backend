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
 * /auth/signup:
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
 * /auth/signin:
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
 * /auth/forgot-password:
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
 * /auth/reset-password/{token}:
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
 * /appointments:
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
 * /appointments:
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
 * /appointments/patient/{id}:
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
 * /appointments/{id}:
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
 * /appointments/{id}:
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
 * /appointments/today:
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
 * /appointments/by-date:
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

// ##################################################   billRoutes  ###############################################

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
 * /patient/{id}:
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
 * /patient:
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
 * /patient/{id}:
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
 * /patient/{id}:
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
 * /search/{query}:
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
 * /profile/me:
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
 * /profile/me:
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
 * /profile/change-password:
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
 *   description: User and role management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /users/{id}/role:
 *   patch:
 *     summary: Change user role
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 example: staff
 *     responses:
 *       200:
 *         description: Role updated
 */

/**
 * @swagger
 * /users/{id}/status:
 *   patch:
 *     summary: Activate or deactivate a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - active
 *             properties:
 *               active:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: User status updated
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted
 */
