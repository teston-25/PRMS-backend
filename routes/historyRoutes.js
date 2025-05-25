const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const protect = require('../middleware/protect');

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

router
  .get('/patients/:id/history', protect, historyController.getMedicalHistory)
  .post('/patients/:id/history', protect, historyController.addMedicalHistory);
router
  .patch('/history/:id', protect, historyController.updateMedicalHistory)
  .delete('/history/:id', protect, historyController.deleteMedicalHistory);

module.exports = router;
