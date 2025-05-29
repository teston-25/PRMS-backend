const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { protect, restrictTo } = require('../middleware/protect');

router.use(protect, restrictTo('admin', 'staff'));
router
  .route('/')
  .get(patientController.getPatients)
  .post(patientController.addPatient);
router
  .route('/:id')
  .get(patientController.getSinglePatient)
  .patch(patientController.updatePatient)
  .delete(patientController.deletePatient);
router.route('/patients/search').get(patientController.searchPatients);

module.exports = router;
