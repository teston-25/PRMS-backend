const express = require('express');
const router = express.Router();
const protect = require('./../middleware/protect');

const patientController = require('../controllers/patientController');

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: API for managing patients
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

router
  .route('/')
  .get(protect, patientController.getPatients)
  .post(protect, patientController.addPatient);
router
  .route('/:id')
  .get(protect, patientController.getSinglePatient)
  .patch(protect, patientController.updatePatient)
  .delete(protect, patientController.deletePatient);
router.route('/patients/search').get(patientController.searchPatients);

module.exports = router;
