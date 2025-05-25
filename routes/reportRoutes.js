const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();
const protect = require('../middleware/protect');

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

router.get('/summary', protect, reportController.getSummaryReport);
router.get(
  '/appointments-by-date',
  protect,
  reportController.getAppointmentsByDateRange
);
router.get(
  '/frequent-diagnoses',
  protect,
  reportController.getFrequentDiagnoses
);

module.exports = router;
