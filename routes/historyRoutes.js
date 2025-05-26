const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const protect = require('../middleware/protect');

router
  .get('/patients/:id/history', protect, historyController.getMedicalHistory)
  .post('/patients/:id/history', protect, historyController.addMedicalHistory);
router
  .patch('/history/:id', protect, historyController.updateMedicalHistory)
  .delete('/history/:id', protect, historyController.deleteMedicalHistory);

module.exports = router;
