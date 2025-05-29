const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect, restrictTo('admin', 'staff'));
router
  .get('/patients/:id/history', historyController.getMedicalHistory)
  .post('/patients/:id/history', historyController.addMedicalHistory);
router
  .patch('/history/:id', historyController.updateMedicalHistory)
  .delete('/history/:id', historyController.deleteMedicalHistory);

module.exports = router;
