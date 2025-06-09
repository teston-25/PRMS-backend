const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect);

router
  .route('/patients/:id/history')
  .get(historyController.getMedicalHistory)
  .post(
    restrictTo('doctor', 'staff', 'admin'),
    historyController.addMedicalHistory
  );
router
  .patch(
    '/history/:id',
    restrictTo('doctor', 'staff', 'admin'),
    historyController.updateMedicalHistory
  )
  .delete(
    '/history/:id',
    restrictTo('staff', 'admin'),
    historyController.deleteMedicalHistory
  );

module.exports = router;
