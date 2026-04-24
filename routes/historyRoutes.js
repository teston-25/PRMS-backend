const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect);

router
  .route('/:patientId')
  .get(historyController.getMedicalHistory)
  .post(
    restrictTo('doctor', 'staff', 'admin'),
    historyController.addMedicalHistory,
  );
router
  .patch(
    '/:historyId',
    restrictTo('doctor', 'staff', 'admin'),
    historyController.updateMedicalHistory,
  )
  .delete(
    '/:historyId',
    restrictTo('staff', 'admin'),
    historyController.deleteMedicalHistory,
  );

module.exports = router;
