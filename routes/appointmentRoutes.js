const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');
const protect = require('./../middleware/protect');

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: API for managing patient appointments
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

router
  .route('/')
  .get(protect, appointmentsController.getAppointments)
  .post(protect, appointmentsController.addAppointment);

router.get(
  '/patient/:id',
  protect,
  appointmentsController.getAppointmentsByPatient
);

router.delete('/:id', protect, appointmentsController.deleteAppointment);

module.exports = router;
