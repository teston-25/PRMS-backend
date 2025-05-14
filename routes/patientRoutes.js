const express = require('express');
const router = express.Router();

const {
  getPatients,
  addPatient,
  getSinglePatient,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController');

router.route('/').get(getPatients).post(addPatient);
router
  .route('/:id')
  .get(getSinglePatient)
  .patch(updatePatient)
  .delete(deletePatient);

module.exports = router;
