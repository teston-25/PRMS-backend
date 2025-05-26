const express = require('express');
const router = express.Router();
const protect = require('./../middleware/protect');

const patientController = require('../controllers/patientController');

router
  .route('/')
  .get(protect, patientController.getPatients)
  .post(protect, patientController.addPatient);
router
  .route('/:id')
  .get(protect, patientController.getSinglePatient)
  .patch(protect, patientController.updatePatient)
  .delete(protect, patientController.deletePatient);
router.route('/patients/search').get(patientController.searchPatients);

module.exports = router;
