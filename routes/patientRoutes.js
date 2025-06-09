const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect);
router
  .route('/')
  .get(restrictTo('admin', 'staff'), patientController.getPatients)
  .post(restrictTo('admin', 'staff'), patientController.addPatient);
router
  .route('/:id')
  .get(
    restrictTo('admin', 'staff', 'doctor', 'user'),
    patientController.getSinglePatient
  )
  .patch(restrictTo('admin', 'staff'), patientController.updatePatient)
  .delete(restrictTo('admin', 'staff'), patientController.deletePatient);
router
  .route('/patients/search')
  .get(restrictTo('admin', 'staff'), patientController.searchPatients);

module.exports = router;
