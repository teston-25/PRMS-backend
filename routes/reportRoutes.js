const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();
const protect = require('../middleware/protect');

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
