const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect, restrictTo('admin', 'staff', 'doctor'));
router.get('/summary', reportController.getSummaryReport);
router.get(
  '/appointments-by-date',
  reportController.getAppointmentsByDateRange
);
router.get('/frequent-diagnoses', reportController.getFrequentDiagnoses);

module.exports = router;
