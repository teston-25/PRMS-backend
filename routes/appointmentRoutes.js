const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');
const protect = require('./../middleware/protect');

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

router
  .route('/')
  .get(protect, appointmentsController.getAppointments)
  .post(protect, appointmentsController.addAppointment);
router.get(
  '/patient/:id',
  protect,
  appointmentsController.getAppointmentsByPatient
);
router
  .route('/today')
  .get(protect, appointmentsController.getTodayAppointments);
router
  .route('/:id')
  .patch(protect, appointmentsController.updateAppointment)
  .delete(protect, appointmentsController.deleteAppointment);
router
  .route('/by-date')
  .get(protect, appointmentsController.getAppointmentsByDate);

module.exports = router;
